import { NextResponse } from "next/server";
import { mkdir, open, readFile, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { bookingSchema } from "@/lib/validations/booking";
import { bookingStorageDir } from "@/lib/server/booking-storage";
export const runtime = "nodejs";
const reply = (body: object, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== new URL(request.url).origin &&
    origin !== process.env.NEXT_PUBLIC_SITE_URL
  )
    return reply({ error: "Request origin is not permitted." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "Expected a JSON request." }, 415);
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Missing request." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 16000) {
        await reader.cancel();
        return reply({ error: "Your request is too large." }, 413);
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ error: "Your request could not be read." }, 400);
  }
  const result = bookingSchema.safeParse(raw);
  if (!result.success)
    return reply(
      { error: "Please check the highlighted details and contact consent." },
      400,
    );
  const directory = bookingStorageDir();
  if (!directory)
    return reply(
      {
        error:
          "Online requests are currently unavailable. Please call 7094341480. Your request has not been sent.",
      },
      503,
    );
  let lock: string | undefined;
  try {
    await mkdir(directory, { recursive: true, mode: 0o700 });
    const rates = join(directory, "rate-limits");
    await mkdir(rates, { recursive: true, mode: 0o700 });
    const network =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const key = createHash("sha256").update(network).digest("hex");
    lock = join(rates, key + ".lock");
    const handle = await open(
      /* turbopackIgnore: true */ lock,
      "wx",
      0o600,
    ).catch(() => null);
    if (!handle) {
      lock = undefined;
      return reply({ error: "Please wait a moment and try again." }, 429);
    }
    await handle.close();
    const rateFile = join(rates, key + ".json");
    let timestamps: number[] = [];
    try {
      timestamps = JSON.parse(await readFile(rateFile, "utf8"));
    } catch {}
    const now = Date.now();
    timestamps = timestamps.filter((t) => t > now - 3600000);
    if (timestamps.length >= 3)
      return reply(
        {
          error:
            "You have sent three requests recently. Please call us or try again in an hour.",
        },
        429,
      );
    const id = randomUUID();
    const file = await open(join(directory, id + ".json"), "wx", 0o600);
    try {
      await file.writeFile(
        JSON.stringify(
          {
            id,
            status: "pending",
            createdAt: new Date().toISOString(),
            request: result.data,
          },
          null,
          2,
        ),
      );
      await file.sync();
    } finally {
      await file.close();
    }
    await writeFile(rateFile, JSON.stringify([...timestamps, now]), {
      mode: 0o600,
    });
    return reply({ id, status: "pending" }, 201);
  } catch {
    return reply(
      {
        error:
          "We could not save your request. Please try again or call 7094341480.",
      },
      503,
    );
  } finally {
    if (lock) await unlink(lock).catch(() => {});
  }
}
