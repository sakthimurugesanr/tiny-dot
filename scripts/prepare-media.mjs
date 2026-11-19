import fs from "node:fs/promises";
import { spawn } from "node:child_process";
import sharp from "sharp";
import ffmpeg from "ffmpeg-static";
const sources = JSON.parse(
  await fs.readFile(new URL("./media-sources.json", import.meta.url), "utf8"),
);
const photoSelection = [
  [
    4,
    "green-bus-front",
    "Classic green bus",
    "vehicles",
    "Handmade green-and-white bus model, front view",
  ],
  [
    6,
    "green-bus-rear",
    "Details from every angle",
    "vehicles",
    "Rear details of a green-and-white miniature bus",
  ],
  [
    8,
    "bus-interior",
    "A closer look inside",
    "vehicles",
    "Miniature bus doorway and interior seating",
  ],
  [
    9,
    "portrait-sketching",
    "At the drawing table",
    "craft",
    "The maker working on a pencil portrait",
  ],
  [
    14,
    "modern-home",
    "A home in miniature",
    "architecture",
    "Contemporary miniature house with balcony details",
  ],
  [
    17,
    "home-lighting",
    "Windows that come alive",
    "architecture",
    "Handmade house model illuminated with miniature lights",
  ],
  [
    19,
    "home-evening",
    "An evening in miniature",
    "architecture",
    "Illuminated front elevation of a miniature house",
  ],
  [
    26,
    "blue-bus-front",
    "Blue line, small scale",
    "vehicles",
    "Blue-and-white handcrafted bus with working lights",
  ],
  [
    28,
    "blue-bus-side",
    "Every seat has a story",
    "vehicles",
    "Side view of a blue-and-white miniature bus",
  ],
  [
    31,
    "blue-bus-scale",
    "A world in your hands",
    "vehicles",
    "Hand-held blue bus model showing its miniature scale",
  ],
  [
    33,
    "vintage-bus",
    "A familiar silhouette",
    "vehicles",
    "Vintage green-and-white bus model with front grille details",
  ],
  [
    36,
    "vintage-bus-rear",
    "The finishing touches",
    "vehicles",
    "Rear view of a handmade vintage bus model",
  ],
  [
    37,
    "miniature-train",
    "A little railway journey",
    "vehicles",
    "Front view of a blue miniature train on outdoor track",
  ],
  [
    39,
    "train-carriages",
    "Made for the little journey",
    "vehicles",
    "Miniature locomotive and blue passenger carriages",
  ],
  [
    41,
    "temple-maker",
    "A place, carefully recreated",
    "architecture",
    "The maker holding an architectural temple model",
  ],
  [
    43,
    "temple-model",
    "Architecture in the details",
    "architecture",
    "Architectural miniature with columns and a stepped courtyard",
  ],
  [
    46,
    "om-sakthi-bus",
    "OM SAKTHI, in miniature",
    "vehicles",
    "Handcrafted OM SAKTHI bus model photographed outdoors",
  ],
  [
    48,
    "om-sakthi-profile",
    "Made to be looked at closely",
    "vehicles",
    "Side profile of the OM SAKTHI miniature bus",
  ],
  [
    51,
    "campus-model",
    "Big ideas, built small",
    "architecture",
    "The maker presenting a detailed building and landscape model",
  ],
  [
    52,
    "maker-and-bus",
    "The hands behind the details",
    "craft",
    "TINY DOT’S maker holding a finished miniature bus",
  ],
];
const videoSelection = [
  [0, "blue-bus-showcase", "A miniature bus, out in the world", "vehicles"],
  [4, "illuminated-home", "A home after dark", "architecture"],
  [
    10,
    "temple-presentation",
    "An architectural model, up close",
    "architecture",
  ],
  [18, "tiny-vehicle", "Small enough to hold", "vehicles"],
  [24, "classic-bus", "A classic bus in miniature", "vehicles"],
  [29, "landscape-diorama", "A little landscape taking shape", "craft"],
  [31, "vintage-bus-details", "Vintage bus details", "vehicles"],
  [33, "house-in-progress", "From structure to home", "architecture"],
  [37, "bus-body-making", "Making the miniature bus body", "craft"],
  [38, "at-the-workbench", "Small parts, patient hands", "craft"],
];
await fs.mkdir("qa/video-thumbs", { recursive: true });
await fs.mkdir("public/media/photos", { recursive: true });
await fs.mkdir("public/media/videos", { recursive: true });
await fs.mkdir("public/media/posters", { recursive: true });
const selectedImages = [];
for (const [, id, title, category, alt] of photoSelection) {
  const src = `/media/photos/${id}.webp`;
  const result = await sharp(
    sources.images.find((item) => item.id === id).original,
  )
    .rotate()
    .resize({
      width: 1440,
      height: 1440,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84 })
    .toFile("public" + src);
  selectedImages.push({
    id,
    src,
    title,
    category,
    alt,
    width: result.width,
    height: result.height,
  });
}
function run(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(ffmpeg, args, {
      windowsHide: true,
      stdio: ["ignore", "ignore", "pipe"],
    });
    let err = "";
    p.stderr.on("data", (d) => {
      err = (err + d).slice(-4000);
    });
    p.on("error", reject);
    p.on("close", (code) =>
      code === 0 ? resolve(err) : reject(new Error(err)),
    );
  });
}
const selectedVideos = [];
let next = 0;
async function worker() {
  while (next < videoSelection.length) {
    const n = next++;
    const [, id, title, category] = videoSelection[n];
    const src = `/media/videos/${id}.mp4`,
      poster = `/media/posters/${id}.webp`;
    await run([
      "-y",
      "-i",
      sources.videos.find((item) => item.id === id).original,
      "-vf",
      "scale=720:720:force_original_aspect_ratio=decrease:force_divisible_by=2",
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "28",
      "-threads",
      "2",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      "-movflags",
      "+faststart",
      "public" + src,
    ]);
    const jpg = `qa/video-thumbs/selected-${id}.jpg`;
    await run(["-y", "-ss", "1", "-i", "public" + src, "-frames:v", "1", jpg]);
    await sharp(jpg)
      .resize({ width: 640, height: 640, fit: "inside" })
      .webp({ quality: 80 })
      .toFile("public" + poster);
    selectedVideos[n] = { id, src, poster, title, category };
    console.log("Prepared video", n + 1, "of", videoSelection.length);
  }
}
await Promise.all([worker(), worker()]);
await fs.writeFile(
  "src/data/media.ts",
  `// Curated from the client-supplied Instagram posts and highlights.\nexport const mediaImages = ${JSON.stringify(selectedImages, null, 2)} as const;\nexport const mediaVideos = ${JSON.stringify(selectedVideos, null, 2)} as const;\nexport const mediaCategories = [{slug:"all",label:"All work"},{slug:"vehicles",label:"Vehicle miniatures"},{slug:"architecture",label:"Homes & architecture"},{slug:"craft",label:"Craft & making"}] as const;\n`,
);
await fs.writeFile("qa/media-selection.json", JSON.stringify(sources, null, 2));
console.log(
  "Curated exactly",
  selectedImages.length,
  "photos and",
  selectedVideos.length,
  "videos.",
);
