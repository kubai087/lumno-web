import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("homepage toolbar exposes Chrome and Edge install options", () => {
  const source = readSource("src/pages/index.astro");
  const menuSource = readSource("src/components/navigation/InstallMenu.tsx");

  assert.match(source, /<InstallMenu[\s\S]*chromeUrl=\{CHROME_STORE_URL\}[\s\S]*edgeUrl=\{EDGE_STORE_URL\}/);
  assert.match(source, /chromeVersion=\{chromeStoreVersion\}/);
  assert.match(source, /edgeVersion=\{edgeStoreVersion\}/);
  assert.match(source, /chromeLabel=\{content\.installChromeStoreLabel\}/);
  assert.match(source, /edgeLabel=\{content\.installEdgeStoreLabel\}/);
  assert.match(source, /await getStoreVersions\(/);
  assert.match(source, /chromeRecommendation=\{content\.installChromeRecommendation\}/);
  assert.match(menuSource, /menuRole="menu"/);
  assert.match(menuSource, /optionRole="menuitem"/);
  assert.match(menuSource, /label: chromeLabel/);
  assert.match(menuSource, /label: edgeLabel/);
  assert.match(menuSource, /iconClass: "ri-chrome-fill/);
  assert.match(menuSource, /iconClass: "ri-edge-new-fill/);
  assert.match(menuSource, /href: chromeUrl/);
  assert.match(menuSource, /href: edgeUrl/);
  assert.match(menuSource, /<SettingsBadge>\{chromeVersionTag\}<\/SettingsBadge>/);
  assert.match(menuSource, /<SettingsBadge>\{edgeVersionTag\}<\/SettingsBadge>/);
  assert.match(
    menuSource,
    /<SettingsBadge tone="accent">\{chromeRecommendation\}<\/SettingsBadge>[\s\S]*<SettingsBadge>\{chromeVersionTag\}<\/SettingsBadge>/,
  );
  const menuStyles = readSource("src/components/navigation/install-menu.css");
  assert.match(
    menuStyles,
    /\.install-menu \.lumno-settings-badge-accent\s*\{[\s\S]*border:\s*1px solid #bfdbfe;[\s\S]*border-radius:\s*8px;[\s\S]*background:\s*#eef6ff;[\s\S]*color:\s*#1e3a8a;/,
  );
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

  assert.match(source, /installChromeRecommendation: "推荐 · 更新更快"/);
  assert.match(source, /installChromeRecommendation: "推薦 · 更新更快"/);
  assert.match(source, /installChromeRecommendation: "Recommended · Faster updates"/);
});

test("store versions fall back to the live Chrome and Edge stores", () => {
  const source = readSource("src/lib/store-versions.ts");

  assert.match(source, /clients2\.google\.com\/service\/update2\/crx/);
  assert.match(source, /microsoftedge\.microsoft\.com/);
  assert.match(source, /Promise\.all\(\[/);
  assert.match(source, /local development and ordinary static builds fall back to the live stores/);
});

test("homepage is a product narrative while onboarding remains a separate route", () => {
  const source = readSource("src/pages/index.astro");

  assert.match(source, /id="features"/);
  assert.match(source, /id="workflow"/);
  assert.match(source, /id="trust"/);
  assert.match(source, /class="section faq-section"/);
  assert.match(source, /const onboardingHref = buildLocalizedPath\(uiLocale, "\/onboarding\/"\);/);
  assert.match(source, /href=\{onboardingHref\}/);
  assert.doesNotMatch(source, /chrome:\/\/extensions\/shortcuts/);
});

test("homepage uses the standard favicon set and a plain page background", () => {
  const source = readSource("src/pages/index.astro");

  assert.match(source, /href="\/favicon\.ico" sizes="any"/);
  assert.match(source, /type="image\/png" href="\/favicon\.png"/);
  assert.match(source, /rel="apple-touch-icon" href="\/apple-touch-icon\.png"/);
  assert.doesNotMatch(source, /background-image:\s*url\("\/assets\/settings-bg-light-monet-newtab\.webp"\)/);
});
