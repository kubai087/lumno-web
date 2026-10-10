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
  // Help-center languages hand off at the help center's banner; the rest at the document head.
  assert.match(source, /<SitePage[\s\S]*?basePath="\/privacy\/"[\s\S]*?analyticsScope="privacy"\s*navHandoff=\{inHelpCenter \? "\.guide__banner" : "\.doc__head"\}/);
  assert.match(readSource("src/layouts/SitePage.astro"), /<SiteHeader\s+locale=\{locale\}/);
  assert.doesNotMatch(source, /OptionsFeedbackSupportLink/);
});

test("privacy is a plain document with a header, a contents list, and the policy", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");

  assert.match(source, /<nav class="doc__toc" aria-label=\{content\.tocLabel\}>/);
  assert.match(source, /<a href=\{`#\$\{section\.id\}`\}>\s*<span class="doc__num" aria-hidden="true">\{section\.number\}<\/span>/);
  assert.match(source, /<h1><span>\{content\.title\}<\/span><\/h1>/);
  assert.match(source, /<time datetime=\{PRIVACY_LAST_UPDATED\}>\{displayLastUpdated\}<\/time>/);
  assert.match(source, /<Fragment set:html=\{policyHtml\} \/>/);
  // No marketing chrome on a legal document.
  assert.doesNotMatch(source, /home-sheet|page-hero|home-h2|data-reveal|SettingsButton/);
  // Section anchors stay stable across languages.
  const sectionIds = contentSource.match(/export const PRIVACY_SECTION_IDS = \[([\s\S]*?)\] as const;/)?.[1];
  assert.equal((sectionIds.match(/"[a-z][a-z-]+"/g) || []).length, 15);
  assert.match(source, /sectionTitles\.length !== PRIVACY_SECTION_IDS\.length/);
  assert.match(source, /return `<h2 id="\$\{id\}"><span class="doc__num" aria-hidden="true">\$\{number\}<\/span>/);
  assert.match(contentSource, /tocLabel: "目录"/);
  assert.match(contentSource, /tocLabel: "目錄"/);
  assert.match(contentSource, /tocLabel: "On this page"/);
});

test("site pages hand the top bar over like the homepage", () => {
  const header = readSource("src/components/site/SiteHeader.astro");
  const layout = readSource("src/layouts/SitePage.astro");

  // Clear at the top, scrolls away with the page's opening, returns as glass once it has left the screen.
  assert.match(header, /data-nav-surface=\{keepInstall \? "hero" : undefined\}/);
  assert.match(header, /const shouldSurface = window\.scrollY > 0 && handoff\.getBoundingClientRect\(\)\.bottom <= 0;/);
  assert.match(layout, /<SiteHeader[\s\S]*?handoff=\{navHandoff\}[\s\S]*?keepInstall/);
  // The clear state must win over the install-keeping pages' glass state.
  assert.match(header, /\.top-nav\[data-nav-surface="hero"\],\s*body\.has-nav-install \.top-nav\[data-nav-surface="hero"\] \{\s*position: absolute;/);
  // Phones: the restored clear bar rests where it first loaded.
  assert.match(header, /@media \(max-width: 760px\) \{\s*\/\*[^*]*\*\/\s*\.top-nav\[data-nav-surface="hero"\],\s*body\.has-nav-install \.top-nav\[data-nav-surface="hero"\] \{\s*top: max\(10px, env\(safe-area-inset-top\)\);/);
});

test("privacy document stays readable on narrow screens", () => {
  const source = readSource("src/pages/privacy/index.astro");

  assert.match(source, /const tableFrame = inHelpCenter \? "guide-table" : "doc__table";/);
  assert.match(source, /replaceAll\("<table>", `<div class="\$\{tableFrame\}"><table>`\)/);
  assert.match(source, /\.doc__table \{[\s\S]*?overflow-x: auto;/);
  assert.match(source, /\.doc__body ul \{[\s\S]*?list-style: disc;/);
  assert.match(source, /@media \(max-width: 900px\) \{[\s\S]*?\.doc \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);[\s\S]*?\.doc__toc \{[\s\S]*?position: static;/);
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
