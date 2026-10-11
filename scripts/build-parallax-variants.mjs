/*
 * The new tab parallax shows fifteen 1280x800 renders per locale on cards
 * 480px wide (224px on phones), so a slow connection spent most of the
 * section's time on pixels nobody sees. This writes 960w and 480w copies next
 * to each render for `srcset`, plus a 32px preview per render, inlined into
 * the page so the stage reads as screenshots before the real ones arrive.
 *
 * Rerun after replacing any public/assets/feature-newtab/<locale>/parallax-*.webp:
 *   node scripts/build-parallax-variants.mjs
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const LOCALES = ["zh-CN", "zh-TW", "en"];
const COUNT = 15;
const WIDTHS = [480, 960];
const PREVIEW_WIDTH = 32;

const previews = {};
for (const locale of LOCALES) {
  previews[locale] = [];
  for (let index = 1; index <= COUNT; index += 1) {
    const name = `parallax-${String(index).padStart(2, "0")}`;
    const source = path.join(root, "public/assets/feature-newtab", locale, `${name}.webp`);
    for (const width of WIDTHS) {
      await sharp(source)
        .resize(width)
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(path.dirname(source), `${name}-${width}.webp`));
    }
    const preview = await sharp(source).resize(PREVIEW_WIDTH).webp({ quality: 50, effort: 6 }).toBuffer();
    previews[locale].push(`data:image/webp;base64,${preview.toString("base64")}`);
  }
}

fs.writeFileSync(
  path.join(root, "src/assets/parallax-previews.json"),
  `${JSON.stringify(previews, null, 2)}\n`,
);
console.log(`Wrote ${LOCALES.length * COUNT} renders at ${WIDTHS.join("w, ")}w plus previews`);
