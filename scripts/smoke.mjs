import assert from "node:assert/strict";
const base = process.argv[2] || "http://127.0.0.1:3000";
const xml = await (await fetch(base + "/sitemap.xml")).text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
for (const path of paths) {
  const res = await fetch(base + path);
  assert.equal(res.status, 200, path);
  const html = await res.text();
  assert.match(html, /<h1[\s>]/, path + " heading");
}
// Next.js keeps status 200 when notFound() renders after streaming starts.
for (const path of ["/not-a-real-world", "/portfolio/project/not-real"]) {
  const res = await fetch(base + path);
  assert.ok([200, 404].includes(res.status), path);
  const html = await res.text();
  assert.match(html, /yet to be found/, path + " not-found content");
  assert.match(
    html,
    /<meta name="robots" content="noindex"\s*\/?>/,
    path + " noindex",
  );
}
const post = (body, extra = {}) =>
  fetch(base + "/api/commissions", {
    method: "POST",
    headers: { "content-type": "application/json", ...extra },
    body: JSON.stringify(body),
  });
assert.equal((await post({})).status, 400);
assert.equal(
  (await post({}, { origin: "https://untrusted.example" })).status,
  403,
);
assert.equal(
  (await fetch(base + "/api/commissions", { method: "POST", body: "invalid" }))
    .status,
  415,
);
assert.equal((await post({ concept: "x".repeat(25000) })).status, 413);
const demo = {
  type: "Vehicle Miniature",
  concept: "An imaginary woodland cottage for automated QA only.",
  dimensions: "",
  scale: "1:24",
  materials: "",
  colors: "",
  date: "",
  budget: "To be discussed",
  references: "https://example.com/reference",
  notes: "Synthetic test record",
  name: "QA Demo",
  email: "qa@example.com",
  phone: "",
  country: "Demo country",
  delivery: "Demo region",
  consent: true,
  website: "",
};
if (process.argv.includes("--storage")) {
  for (let i = 0; i < 3; i++) {
    const res = await post({ ...demo, notes: `Synthetic QA record ${i}` });
    assert.equal(res.status, 201);
    assert.ok((await res.json()).id);
  }
  assert.equal((await post(demo)).status, 429);
  console.log(
    "PASS: real persistence accepted 3 synthetic enquiries; rate limiter rejected the fourth.",
  );
} else assert.equal((await post(demo)).status, 503);
assert.equal((await post({ ...demo, consent: false })).status, 400);
assert.equal((await post({ ...demo, website: "spam.example" })).status, 400);
assert.equal(
  (await post({ ...demo, references: "javascript:alert(1)" })).status,
  400,
);
console.log(
  `PASS: ${paths.length} public routes, 404 handling, validation, consent, honeypot, body limit, origin protection, content type and service availability.`,
);
