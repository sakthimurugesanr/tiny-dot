import { NextResponse } from "next/server";
import { mkdir, writeFile, readFile, open, unlink } from "node:fs/promises";
import { resolve, isAbsolute, join } from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { commissionSchema } from "@/lib/validations/commission";
export const runtime = "nodejs";
const fail = (error: string, status: number) =>
  NextResponse.json(
    { error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== new URL(request.url).origin &&
    origin !== process.env.NEXT_PUBLIC_SITE_URL
  )
    return fail("Request origin is not permitted.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return fail("Expected a JSON request.", 415);
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail("Missing request.", 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 24000) {
        await reader.cancel();
        return fail("The enquiry is too large.", 413);
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return fail("The request could not be read.", 400);
  }
  const parsed = commissionSchema.safeParse(raw);
  if (!parsed.success)
    return fail("Please check your request details and consent.", 400);
  const configured = process.env.COMMISSION_STORAGE_DIR;
  if (!configured || !isAbsolute(configured) || process.env.VERCEL)
    return fail(
      "The studio is not accepting online enquiries yet. Your request has not been sent.",
      503,
    );
  const dir = resolve(configured);
  if (dir.startsWith(resolve("public")))
    return fail("The enquiry service is not configured safely.", 503);
  let lock: string | undefined;
  try {
    await mkdir(dir, { recursive: true, mode: 0o700 });
    const rates = join(dir, "rate-limits");
    await mkdir(rates, { recursive: true, mode: 0o700 });
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "shared";
    const key = createHash("sha256").update(ip).digest("hex");
    lock = join(rates, key + ".lock");
    const handle = await open(
      /* turbopackIgnore: true */ lock,
      "wx",
      0o600,
    ).catch(() => null);
    if (!handle) {
      lock = undefined;
      return fail("Please wait a moment and try again.", 429);
    }
    await handle.close();
    const rateFile = join(rates, key + ".json");
    const now = Date.now();
    let recent: number[] = [];
    try {
      recent = JSON.parse(await readFile(rateFile, "utf8")) as number[];
    } catch {}
    recent = recent.filter((t) => t > now - 3600000);
    if (recent.length >= 3)
      return fail("Too many enquiries. Please try again in an hour.", 429);
    await writeFile(rateFile, JSON.stringify([...recent, now]), {
      mode: 0o600,
    });
    const id = randomUUID();
    const file = await open(join(dir, id + ".json"), "wx", 0o600);
    try {
      await file.writeFile(
        JSON.stringify(
          { id, createdAt: new Date().toISOString(), request: parsed.data },
          null,
          2,
        ),
      );
      await file.sync();
    } finally {
      await file.close();
    }
    return NextResponse.json(
      { id },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return fail(
      "The enquiry service is temporarily unavailable. Your request has not been confirmed.",
      503,
    );
  } finally {
    if (lock) await unlink(lock).catch(() => {});
  }
}
