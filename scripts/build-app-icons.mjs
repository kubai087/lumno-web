// Renders the square, full-bleed app icon used for iOS "Add to Home Screen" and the PWA
// maskable icons (the manifest's "any" icons stay on the rounded favicon artwork).
// No rounded corners, so iOS and Android launchers can apply their own mask.
// Rerun after editing src/assets/app-icon.svg:
//   node scripts/build-app-icons.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const svg = await readFile(`${root}src/assets/app-icon.svg`);

const outputs = [
  ["public/apple-touch-icon.png", 180],
  ["public/assets/app-icon-192.png", 192],
  ["public/assets/app-icon-512.png", 512],
];

for (const [file, size] of outputs) {
  await sharp(svg, { density: (72 * size) / 48 })
    .resize(size, size)
    // Opaque PNGs: iOS fills transparent pixels with black.
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(`${root}${file}`);
  console.log(`${file} (${size}x${size})`);
}
