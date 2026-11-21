import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/images/services", { recursive: true });
for (const [source, name] of [
  ["Bespoke handcraft work.jpg", "handcraft"],
  ["Home miniatures.jpg", "home"],
  ["School & college projects.jpg", "academic"],
  ["Vehicle miniatures.jpg", "vehicle"],
]) {
  await sharp("public/images/Plenty-of-possibility/" + source)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile("public/images/services/" + name + ".webp");
  console.log("Prepared " + name + ".webp");
}
