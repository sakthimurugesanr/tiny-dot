import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { mediaImages, mediaVideos } from "../src/data/media.ts";
import { serviceOptions } from "../src/data/services.ts";
assert.equal(serviceOptions.length, 40);
assert.equal(new Set(serviceOptions).size, 40);
const base = process.argv[2] || "http://127.0.0.1:3000";
const storage = path.resolve(process.argv[3] || "private-data/bookings");
const network = "booking-qa-" + randomUUID();
const post = (body, headers = {}) =>
  fetch(base + "/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": network,
      ...headers,
    },
    body: JSON.stringify(body),
  });
const demo = {
  name: "QA Synthetic Request",
  phone: "0000000000",
  email: "qa@example.com",
  service: "Vehicle Miniature",
  date: "",
  time: "Any time",
  message:
    "Synthetic booking integration test. No customer or real appointment.",
  consent: true,
  website: "",
};
assert.equal((await post({})).status, 400);
assert.equal((await post({ ...demo, phone: "abc" })).status, 400);
assert.equal((await post({ ...demo, consent: false })).status, 400);
assert.equal((await post({ ...demo, website: "spam.example" })).status, 400);
assert.equal((await post({ ...demo, date: "2000-01-01" })).status, 400);
assert.equal(
  (await post(demo, { Origin: "https://untrusted.example" })).status,
  403,
);
assert.equal(
  (await fetch(base + "/api/bookings", { method: "POST", body: "invalid" }))
    .status,
  415,
);
assert.equal((await post({ ...demo, message: "x".repeat(17000) })).status, 413);
const ids = [];
try {
  for (let i = 0; i < 3; i++) {
    const service = ["Vehicle Miniature", "Wedding Miniatures", "3D Printing"][
      i
    ];
    const response = await post({
      ...demo,
      service,
      message: demo.message + " " + i,
    });
    assert.equal(response.status, 201);
    const result = await response.json();
    assert.equal(result.status, "pending");
    assert.ok(result.id);
    ids.push(result.id);
    const saved = JSON.parse(
      await fs.readFile(path.join(storage, result.id + ".json"), "utf8"),
    );
    assert.equal(saved.id, result.id);
    assert.equal(saved.status, "pending");
    assert.equal(saved.request.phone, demo.phone);
    assert.equal(saved.request.email, demo.email);
    assert.equal(saved.request.service, service);
  }
  assert.equal((await post(demo)).status, 429);
  const privateResponse = await fetch(
    base + "/private-data/bookings/" + ids[0] + ".json",
  );
  const privateText = await privateResponse.text();
  assert.ok(!privateText.includes("qa@example.com"));
  assert.equal(mediaImages.length, 20);
  assert.equal(mediaVideos.length, 10);
  assert.equal(new Set(mediaImages.map((x) => x.src)).size, 20);
  assert.equal(new Set(mediaVideos.map((x) => x.src)).size, 10);
  for (const item of [...mediaImages, ...mediaVideos]) {
    const res = await fetch(base + item.src, { method: "HEAD" });
    assert.equal(res.status, 200, item.src);
    assert.ok(Number(res.headers.get("content-length")) > 0, item.src);
  }
  for (const item of mediaVideos) {
    assert.equal(
      (await fetch(base + item.poster, { method: "HEAD" })).status,
      200,
      item.poster,
    );
  }
  console.log(
    "PASS: booking validation, consent, origin and body checks; 3 persisted pending requests; receipt verification; fourth request rate limited; private records not served; exactly 20 photos and 10 local video files with posters.",
  );
} finally {
  for (const id of ids) {
    const file = path.join(storage, id + ".json");
    const saved = JSON.parse(await fs.readFile(file, "utf8"));
    if (
      saved.request.name === "QA Synthetic Request" &&
      saved.request.email === "qa@example.com"
    )
      await fs.unlink(file);
  }
}
