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
    /\.chip,\s*\.entry-link-btn,\s*\.entry-dot\s*\)\s*\{\s*corner-shape:\s*round\s*!important/,
    "release chips, buttons and timeline dots are capsules too",
  );
  assert.match(
    stylesheet,
    /\.lumno-settings-icon-button[\s\S]*?corner-shape:\s*round\s*!important/,
    "icon buttons should retain their circular silhouette",
  );
  assert.match(seoHead, /href="\/continuous-corners\.css"/);
  assert.match(authLayout, /href="\/continuous-corners\.css"/);
});

test("nested surfaces derive their inner radius from the outer surface", async () => {
  const settingsStyles = await readFile(settingsStylesPath, "utf8");
  const siteHeader = await readFile(siteHeaderPath, "utf8");

  assert.match(settingsStyles, /--lumno-settings-option-radius:\s*max\(/);
  assert.match(siteHeader, /--top-nav-more-option-radius:\s*max\(/);
});
