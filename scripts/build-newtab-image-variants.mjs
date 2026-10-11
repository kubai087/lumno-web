/*
 * The new tab section's renders are larger than most screens show them: the
 * parallax cards draw fifteen 1280x800 renders per locale 480px wide (224px
 * on phones), and the filter lab's 1600x1000 renders fill the content column
 * (about 360px wide on phones). This writes smaller copies next to each
 * render for `srcset`, plus a 32px preview per parallax render, inlined into
 * the page so the stage reads as screenshots before the real ones arrive.
 *
 * Rerun after replacing any render under public/assets/feature-newtab/:
 *   node scripts/build-newtab-image-variants.mjs
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const assets = path.join(root, "public/assets/feature-newtab");
const PARALLAX_LOCALES = ["zh-CN", "zh-TW", "en"];
const PARALLAX_COUNT = 15;
const PARALLAX_WIDTHS = [480, 960];
const FILTERS = ["none", "blur", "grain", "blocks", "halftone", "dither", "ascii", "crt"];
const FILTER_WIDTHS = [800, 1200];
const PREVIEW_WIDTH = 32;

async function writeVariants(source, widths) {
  const base = source.replace(/\.webp$/, "");
  for (const width of widths) {
    await sharp(source).resize(width).webp({ quality: 80, effort: 6 }).toFile(`${base}-${width}.webp`);
  }
}

const previews = {};
for (const locale of PARALLAX_LOCALES) {
  previews[locale] = [];
  for (let index = 1; index <= PARALLAX_COUNT; index += 1) {
    const source = path.join(assets, locale, `parallax-${String(index).padStart(2, "0")}.webp`);
    await writeVariants(source, PARALLAX_WIDTHS);
    const preview = await sharp(source).resize(PREVIEW_WIDTH).webp({ quality: 50, effort: 6 }).toBuffer();
    previews[locale].push(`data:image/webp;base64,${preview.toString("base64")}`);
  }
}
fs.writeFileSync(path.join(root, "src/assets/parallax-previews.json"), `${JSON.stringify(previews, null, 2)}\n`);

for (const id of FILTERS) {
  await writeVariants(path.join(assets, "fx", `fx-${id}.webp`), FILTER_WIDTHS);
}

console.log(
  `Wrote ${PARALLAX_LOCALES.length * PARALLAX_COUNT} parallax renders at ${PARALLAX_WIDTHS.join("w, ")}w plus previews, ` +
    `and ${FILTERS.length} filter renders at ${FILTER_WIDTHS.join("w, ")}w`,
);
