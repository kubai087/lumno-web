import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("homepage toolbar exposes Chrome and Edge install options", () => {
  const source = readSource("src/components/site/SiteHeader.astro");
  const menuSource = readSource("src/components/navigation/InstallMenu.tsx");

  assert.match(source, /<InstallMenu[\s\S]*chromeUrl=\{CHROME_STORE_URL\}[\s\S]*edgeUrl=\{EDGE_STORE_URL\}/);
  assert.match(source, /chromeVersion=\{chromeStoreVersion\}/);
  assert.match(source, /edgeVersion=\{edgeStoreVersion\}/);
  assert.match(source, /chromeLabel=\{content\.installChromeStoreLabel\}/);
  assert.match(source, /edgeLabel=\{content\.installEdgeStoreLabel\}/);
  assert.match(source, /await getSiteStoreVersions\(\)/);
  assert.match(readSource("src/lib/site-links.ts"), /return getStoreVersions\(\{/);
  assert.match(source, /chromeRecommendation=\{content\.installChromeRecommendation\}/);
  assert.match(menuSource, /menuRole="menu"/);
  assert.match(menuSource, /optionRole="menuitem"/);
  assert.match(menuSource, /label: chromeLabel/);
  assert.match(menuSource, /label: edgeLabel/);
  assert.match(menuSource, /iconClass: "ri-chrome-fill/);
  assert.match(menuSource, /iconClass: "ri-edge-new-fill/);
  assert.match(menuSource, /href: chromeUrl/);
  assert.match(menuSource, /href: edgeUrl/);
  assert.match(source, /chromeRecommendationNote=\{content\.installChromeRecommendationNote\}/);
  assert.match(
    menuSource,
    /label:\s*chromeLabel,[\s\S]*labelSuffix:\s*renderOptionDetail\(chromeVersionTag, chromeRecommendationNote\)[\s\S]*meta:\s*<SettingsBadge tone="accent">\{chromeRecommendation\}<\/SettingsBadge>/,
  );
  assert.match(menuSource, /labelSuffix:\s*renderOptionDetail\(edgeVersionTag\)/);
  const menuStyles = readSource("src/components/navigation/install-menu.css");
  assert.match(
    menuStyles,
    /\.install-menu \.lumno-settings-badge-accent\s*\{[\s\S]*border-radius:\s*8px;[\s\S]*linear-gradient[\s\S]*color:\s*#1e3a8a;[\s\S]*animation:\s*install-menu-recommendation-shine/,
  );
  assert.doesNotMatch(menuStyles, /\.install-menu \.lumno-settings-badge-accent\s*\{[\s\S]*border:/);
});

test("homepage install store names and recommendation are localized", () => {
  const source = readSource("src/lib/home-content.ts");

  for (const label of [
    "Chrome 应用商店",
    "Microsoft Edge 加载项",
    "Chrome 線上應用程式商店",
    "Microsoft Edge 附加元件",
    "Chrome Web Store",
    "Microsoft Edge Add-ons",
  ]) {
    assert.ok(source.includes(label), `missing localized store label: ${label}`);
  }

  assert.match(source, /installChromeRecommendation: "推荐",\s*installChromeRecommendationNote: "更新更快"/);
  assert.match(source, /installChromeRecommendation: "推薦",\s*installChromeRecommendationNote: "更新更快"/);
  assert.match(source, /installChromeRecommendation: "Recommended",\s*installChromeRecommendationNote: "Faster updates"/);
});

test("store versions fall back to the live Chrome and Edge stores", () => {
  const source = readSource("src/lib/store-versions.ts");

  assert.match(source, /clients2\.google\.com\/service\/update2\/crx/);
  assert.match(source, /microsoftedge\.microsoft\.com/);
  assert.match(source, /Promise\.all\(\[/);
  assert.match(source, /local development and ordinary static builds fall back to the live stores/);
});

test("homepage is a product narrative that leaves shortcut setup to the extension", () => {
  const source = readSource("src/pages/index.astro");

  // Landing-page story: capabilities → AI → new tab → extras → proof → trust → FAQ → CTA.
  const order = [
    "<CommandBarSection",
    '<section id="ai-intent"',
    '<section id="new-tab"',
    "<UtilitiesSection",
    "<ChromeReviewMarquee",
    "<OpenSourceSection",
    "<FaqSection",
    "<FinalCta",
    "<PageFooter",
  ].map((marker) => source.indexOf(marker));
  assert.ok(order.every((index) => index > 0), "every homepage section should render");
  assert.deepEqual([...order].sort((a, b) => a - b), order, "sections should keep the narrative order");

  assert.match(readSource("src/components/home/sections/CommandBarSection.astro"), /id="features"/);
  // The extension's own onboarding owns the shortcut-setup walkthrough; the homepage only mentions the URL in FAQ copy.
  assert.doesNotMatch(source, /chrome:\/\/extensions\/shortcuts/);
});

test("homepage uses the standard favicon set and a plain page background", () => {
  const source = readSource("src/pages/index.astro");

  // sizes="any" is for SVG; on an ICO it can make browsers pick it over the touch icon.
  assert.match(source, /href="\/favicon\.ico" sizes="16x16 32x32 48x48 64x64"/);
  assert.match(source, /type="image\/png" href="\/favicon\.png"/);
  assert.match(source, /rel="apple-touch-icon" href="\/apple-touch-icon\.png(?:\?v=\d+)?"/);
  assert.match(source, /rel="manifest" href="\/site\.webmanifest"/);
  assert.doesNotMatch(source, /background-image:\s*url\("\/assets\/settings-bg-light-monet-newtab\.webp"\)/);
});
