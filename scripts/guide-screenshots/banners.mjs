// Crops each help-center group's banner from one of the extension's built-in wallpapers
// and records its size and average colour (painted while the image loads).
// Usage: node scripts/guide-screenshots/banners.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const REPO = path.resolve(import.meta.dirname, "../..");
const WALLPAPERS = path.join(
  path.resolve(process.env.LUMNO_EXTENSION_DIR || path.join(REPO, "../lumno-extension")),
  "assets/wallpapers",
);
const target = path.join(REPO, "public/assets/guides/banners");
const manifestPath = path.join(REPO, "src/content/guides/banners.json");
// 2000px covers the 1000px column at 2x.
const WIDTH = 2000;

// `focus` is where the band sits, from 0 (top) to 1 (bottom), framed on the horizon and
// subject rather than sliced through the foreground. "About Lumno" opens on the store
// artwork's meadow (P1); every other page gets its own wallpaper so no strip repeats.
const RATIO = 5;
const P1 = ["settings-bg-light-monet-newtab", 0.8];
const BANNERS = {
  "what-is-lumno": P1,
  limitations: P1,
  "use-cases": P1,
  faq: P1,
  install: ["lumno-newtab-monet-field-white", 0.86],
  "keyboard-shortcuts": ["lumno-newtab-white-risograph-collage", 0.84],
  sync: ["lumno-newtab-seurat-coast-white", 0.62],
  "search-tabs-bookmarks-history": ["lumno-newtab-seurat-park-white", 0.86],
  "site-search": ["lumno-newtab-monet-lily-pond-white", 1],
  "tab-switcher": ["lumno-newtab-seurat-coast-white", 1],
  "newtab-wallpaper": ["lumno-newtab-white-shanshui", 0.94],
  "newtab-bookmarks-shortcuts": ["lumno-newtab-white-shanshui-bamboo-bridge", 0.86],
  "newtab-frequent-sites": ["lumno-newtab-monet-coastal-white", 0.86],
  "newtab-clock-zen": ["lumno-newtab-white-3d-observatory", 0.7],
  "newtab-other-extensions": ["lumno-newtab-impressionist-orchard-white", 0.8],
  "arc-command-bar": ["lumno-newtab-pointillist-lakeside-white", 0.88],
  "browser-compatibility": ["lumno-newtab-white-linocut-topographic", 0.8],
  "privacy-data": ["lumno-newtab-seurat-riverside-white", 0.86],
  privacy: ["lumno-newtab-seurat-riverside-white", 0.86],
  "security-open-source": ["lumno-newtab-white-shanshui-bamboo-bridge", 1],
  "ratings-reviews": ["lumno-newtab-white-3d-architecture", 0.92],
};

fs.mkdirSync(target, { recursive: true });
const manifest = {};
for (const [name, [wallpaper, focus]] of Object.entries(BANNERS)) {
  const source = sharp(path.join(WALLPAPERS, `${wallpaper}.webp`));
  const { width, height } = await source.metadata();
  const bandHeight = Math.round(width / RATIO);
  const top = Math.round((height - bandHeight) * focus);
  const band = source.extract({ left: 0, top, width, height: bandHeight }).resize({ width: WIDTH });
  const output = path.join(target, `${name}.webp`);
  const info = await band.clone().webp({ quality: 80, effort: 6 }).toFile(output);
  const { dominant } = await sharp(output).stats();
  const color = `#${[dominant.r, dominant.g, dominant.b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
  manifest[name] = { width: info.width, height: info.height, color };
  console.log(`banners/${name}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB ${color}`);
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
