// Turns the captures from capture.mjs into the guides' WebP images and records
// their sizes so the pages reserve space for them (no layout shift).
// Usage: node scripts/guide-screenshots/convert.mjs <locale>
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const REPO = path.resolve(import.meta.dirname, "../..");
const locale = process.argv[2] || "zh-CN";
const source = path.join(os.tmpdir(), "lumno-guide-shots", locale);
const target = path.join(REPO, "public/assets/guides", locale);
const manifestPath = path.join(REPO, "src/content/guides/screenshots.json");
// Twice the 720px reading column, for sharp text on high-density screens.
const WIDTH = 1440;

fs.mkdirSync(target, { recursive: true });
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
for (const file of fs.readdirSync(source).filter((name) => name.endsWith(".png")).sort()) {
  const name = path.basename(file, ".png");
  const output = path.join(target, `${name}.webp`);
  const info = await sharp(path.join(source, file)).resize({ width: WIDTH }).webp({ quality: 82, effort: 6 }).toFile(output);
  manifest[`${locale}/${name}`] = [info.width, info.height];
  console.log(`${locale}/${name}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
}
const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
