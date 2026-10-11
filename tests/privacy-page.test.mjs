import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

const POLICY_FILES = [
  "src/content/privacy-policy.md",
  "src/content/privacy-policy.zh-TW.md",
  "src/content/privacy-policy.en.md",
];

test("privacy page is built on the shared site shell", () => {
  const source = readSource("src/pages/privacy/index.astro");

  assert.match(source, /import SitePage from "\.\.\/\.\.\/layouts\/SitePage\.astro"/);
  // The policy reads inside the help center, so the top bar hands off at its banner.
  assert.match(source, /<SitePage[\s\S]*?basePath="\/privacy\/"[\s\S]*?analyticsScope="privacy"\s*navHandoff="\.guide__banner"/);
  assert.match(readSource("src/layouts/SitePage.astro"), /<SiteHeader\s+locale=\{locale\}/);
  assert.doesNotMatch(source, /OptionsFeedbackSupportLink/);
});

test("privacy reads inside the help center in every language", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");

  // Every language has a help center, so the policy reads inside its own language's sidebar.
  assert.match(source, /<GuideShell\s+locale=\{uiLocale\}\s+current="privacy"\s+title=\{content\.title\}/);
  assert.match(source, /updated=\{PRIVACY_LAST_UPDATED\}/);
  assert.match(source, /<Fragment set:html=\{policyHtml\} \/>/);
  // The old standalone layout is gone, and so is marketing chrome.
  assert.doesNotMatch(source, /class="doc"|doc__toc|<style/);
  assert.doesNotMatch(source, /home-sheet|page-hero|home-h2|data-reveal|SettingsButton/);
  // Section anchors stay stable across languages.
  const sectionIds = contentSource.match(/export const PRIVACY_SECTION_IDS = \[([\s\S]*?)\] as const;/)?.[1];
  assert.equal((sectionIds.match(/"[a-z][a-z-]+"/g) || []).length, 15);
  assert.match(source, /sectionTitles\.length !== PRIVACY_SECTION_IDS\.length/);
  assert.match(source, /return `<h2 id="\$\{id\}"><span class="doc__num" aria-hidden="true">\$\{number\}<\/span>/);
});

test("a plain-language summary opens the policy in every language", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");

  // Unnumbered, ahead of section 1, and first in the outline.
  assert.match(source, /`<h2 id="summary">\$\{headingContent\}<\/h2>\\n`/);
  assert.match(source, /marked\.parse\(content\.summarySource[\s\S]*?\+\s*marked\.parse\(content\.policySource/);
  assert.match(source, /sections=\{\[\{ id: "summary", title: summaryTitle \}, \.\.\.sections/);
  assert.match(readSource("src/lib/guide-search-index.ts"), /toSearchText\(`\$\{privacy\.summarySource\}\\n\$\{privacy\.policySource\}`\)/);
  assert.equal((contentSource.match(/summarySource: privacySummary\w+,/g) || []).length, 10);

  for (const suffix of ["", ".zh-TW", ".en", ".ja", ".ko", ".de", ".fr", ".es", ".pt-BR", ".ru"]) {
    const file = `src/content/privacy-summary${suffix}.md`;
    const summary = readSource(file);
    // One heading, no numbered sections, and the requests table.
    assert.equal((summary.match(/^## /gm) || []).length, 1, file);
    assert.doesNotMatch(summary, /^## \d/m, file);
    assert.match(summary, /\| --- \| --- \| --- \|/, file);
    assert.match(summary, /Favicon\.is/, file);
    assert.match(summary, /WebDAV/, file);
  }
});

test("site pages hand the top bar over like the homepage", () => {
  const header = readSource("src/components/site/SiteHeader.astro");
  const layout = readSource("src/layouts/SitePage.astro");

  // Clear at the top, scrolls away with the page's opening, returns as glass once it has left the screen.
  assert.match(header, /data-nav-surface=\{keepInstall \? "hero" : undefined\}/);
  assert.match(header, /const shouldSurface = !returningToTop && window\.scrollY > 0 && handoff\.getBoundingClientRect\(\)\.bottom <= 0;/);
  assert.match(layout, /<SiteHeader[\s\S]*?handoff=\{navHandoff\}[\s\S]*?keepInstall/);
  // The clear state must win over the install-keeping pages' glass state.
  assert.match(header, /\.top-nav\[data-nav-surface="hero"\],\s*body\.has-nav-install \.top-nav\[data-nav-surface="hero"\] \{\s*position: absolute;/);
  // Phones: the restored clear bar rests where it first loaded.
  assert.match(header, /@media \(max-width: 760px\) \{\s*\/\*[^*]*\*\/\s*\.top-nav\[data-nav-surface="hero"\],\s*body\.has-nav-install \.top-nav\[data-nav-surface="hero"\] \{\s*top: max\(10px, env\(safe-area-inset-top\)\);/);
});

test("privacy document stays readable on narrow screens", () => {
  const source = readSource("src/pages/privacy/index.astro");

  // Wide tables scroll inside the help center's table frame.
  assert.match(source, /replaceAll\("<table>", '<div class="guide-table"><table>'\)/);
  assert.match(readSource("src/styles/guides.css"), /\.guide-table \{[\s\S]*?overflow-x: auto;/);
});

test("privacy uses branded search copy and page-appropriate structured data", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");

  assert.match(contentSource, /pageTitle: "Lumno Privacy Policy \| Local Data, Browser Sync & WebDAV"/);
  assert.doesNotMatch(source, /buildSoftwareApplicationSchema/);
  assert.match(source, /buildWebPageSchema\(/);
  assert.match(source, /dateModified: PRIVACY_LAST_UPDATED/);
  assert.match(source, /buildBreadcrumbListSchema\(/);
});

test("privacy policy has the same fifteen standard sections in every language", () => {
  const [zhCn, zhTw, en] = POLICY_FILES.map(readSource);
  const headings = (policy) => Array.from(policy.matchAll(/^## (\d+)\. /gm), (match) => Number(match[1]));
  const expected = Array.from({ length: 15 }, (_, index) => index + 1);

  for (const policy of [zhCn, zhTw, en]) {
    assert.deepEqual(headings(policy), expected);
  }
  assert.match(zhCn, /## 1\. 适用范围与我们的身份/);
  assert.match(zhTw, /## 1\. 適用範圍與我們的身分/);
  assert.match(en, /## 1\. Scope and Who We Are/);
  assert.match(zhCn, /## 13\. Chrome 应用商店用户数据政策/);
  assert.match(en, /## 13\. Chrome Web Store User Data Policy/);
  assert.match(zhCn, /## 15\. 联系我们/);
  assert.match(zhTw, /## 15\. 聯絡我們/);
  assert.match(en, /## 15\. Contact Us/);
});

test("privacy policy discloses all material data paths and maintenance-sensitive facts", () => {
  for (const file of POLICY_FILES) {
    const policy = readSource(file);
    assert.match(policy, /0\.9\.58/, file);
    assert.match(policy, /VibeLoft/, file);
    assert.match(policy, /Google Analytics/, file);
    assert.match(policy, /WebDAV/, file);
    assert.match(policy, /`chrome\.storage\.sync`/, file);
    assert.match(policy, /v1\.hitokoto\.cn/, file);
    assert.match(policy, /www\.bing\.com/, file);
    assert.match(policy, /picsum\.photos/, file);
    // Requests the extension makes on its own: update notices and the community links.
    assert.match(policy, /api\.github\.com/, file);
    assert.match(policy, /community-links\.json/, file);
    // Sogou suggestions are served from a Tencent host; name the real recipient.
    assert.match(policy, /sor\.html5\.qq\.com/, file);
    // No Lumno backend since 0.9.40: no hosted accounts, cloud store, or telemetry to disclose.
    assert.doesNotMatch(policy, /Supabase|reCAPTCHA|Resend|`identity`/, file);
    for (const permission of ["tabs", "tabGroups", "history", "bookmarks", "topSites", "storage", "unlimitedStorage", "alarms", "search", "favicon", "scripting"]) {
      assert.match(policy, new RegExp(`\`${permission}\``), `${file} should explain ${permission}`);
    }
    assert.match(policy, /Chrome Web Store User Data Policy/, file);
    assert.match(policy, /Limited Use/, file);
    assert.match(policy, /i@kubai\.design/, file);
  }
});

test("privacy maintenance baseline maps policy claims to implementation", () => {
  const maintenance = readSource("docs/privacy-policy-maintenance.md");

  assert.match(maintenance, /manifest\.json/);
  assert.match(maintenance, /webdav-sync\.js/);
  assert.match(maintenance, /update-notice\.js/);
  assert.match(maintenance, /chrome-web-store-data-disclosure\.md/);
  assert.match(maintenance, /SeoHead\.astro/);
  assert.match(maintenance, /Chrome Web Store Privacy practices/);
});

test("privacy localized routes reuse the canonical page", () => {
  const route = readSource("src/pages/[locale]/privacy/index.astro");

  assert.match(route, /buildLocalizedPath\(locale, "\/privacy\/"\)/);
  assert.match(route, /buildRouteLanguageMap\("\/privacy\/"\)/);
});
