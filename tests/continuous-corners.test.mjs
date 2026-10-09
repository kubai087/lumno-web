import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesheetPath = new URL("../public/continuous-corners.css", import.meta.url);
const seoHeadPath = new URL("../src/components/SeoHead.astro", import.meta.url);
const authLayoutPath = new URL("../src/layouts/AuthLayout.astro", import.meta.url);
const settingsStylesPath = new URL("../src/components/extension-settings/settings-kit.css", import.meta.url);
const siteHeaderPath = new URL("../src/components/site/SiteHeader.astro", import.meta.url);

test("all website surfaces load the continuous corner enhancement", async () => {
  const stylesheet = await readFile(stylesheetPath, "utf8");
  const seoHead = await readFile(seoHeadPath, "utf8");
  const authLayout = await readFile(authLayoutPath, "utf8");

  assert.match(stylesheet, /@supports \(corner-shape:\s*superellipse\(1\.25\)\)/);
  assert.match(stylesheet, /corner-shape:\s*var\(--lumno-corner-shape\)\s*!important/);
  assert.match(
    stylesheet,
    /\.top-nav[\s\S]*?\.lumno-settings-button:not\(\.lumno-settings-icon-button\)[\s\S]*?\.pill-btn[\s\S]*?corner-shape:\s*round\s*!important/,
    "capsule controls should keep their original round silhouette",
  );
  assert.match(
    stylesheet,
    /@property --lumno-corner-shape \{[\s\S]*?inherits: false;[\s\S]*?initial-value: superellipse\(1\.25\);/,
    "capsules opt out locally without leaking the round shape to their contents",
  );
  assert.match(
    stylesheet,
    /\.lumno-settings-icon-button[\s\S]*?corner-shape:\s*round\s*!important/,
    "icon buttons should retain their circular silhouette",
  );
  assert.match(seoHead, /href="\/continuous-corners\.css"/);
  // Every pill or circle radius declares the round shape next to it.
  const footer = await readFile(new URL("../src/components/home/sections/SiteFooter.astro", import.meta.url), "utf8");
  for (const match of footer.matchAll(/border-radius: (?:999px|var\(--home-radius-pill\)|50%);\s*\n\s*(\S+)/g)) {
    assert.equal(match[1], "--lumno-corner-shape:", "footer capsules should keep round ends");
  }
  assert.match(authLayout, /href="\/continuous-corners\.css"/);
});

test("nested surfaces derive their inner radius from the outer surface", async () => {
  const settingsStyles = await readFile(settingsStylesPath, "utf8");
  const siteHeader = await readFile(siteHeaderPath, "utf8");

  assert.match(settingsStyles, /--lumno-settings-option-radius:\s*max\(/);
  // The mobile header sheets are settings-kit menus: they only widen the padding and
  // inherit the kit's derived option radius.
  assert.match(siteHeader, /\.top-nav-more-dropdown,[^{]*\{\s*--lumno-settings-menu-padding:\s*10px;/);
  assert.doesNotMatch(siteHeader, /lumno-settings-select-option\s*\{[^}]*border-radius:/);
});
