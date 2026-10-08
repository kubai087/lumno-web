import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("public pages retain page-specific SEO titles after language initialization", () => {
  const homeSource = readSource("src/pages/index.astro");
  assert.doesNotMatch(homeSource, /i18nTitleKey=/);
  // The homepage renders every locale statically, so it must not rewrite the SEO title at runtime.
  assert.doesNotMatch(homeSource, /document\.title\s*=/);

  const release = readSource("src/pages/release/index.astro");
  assert.doesNotMatch(release, /i18nTitleKey="page_title_ui"/);
  assert.match(release, /define:vars=\{\{[^\n]*pageTitleByLocale/);
  assert.match(release, /document\.title = pageTitleByLocale\[resolvedLocale\]/);
  // The privacy policy is rendered per locale route, so its SEO title is final.
  for (const file of ["src/pages/privacy/index.astro", "src/layouts/SitePage.astro"]) {
    assert.doesNotMatch(readSource(file), /i18nTitleKey=|document\.title\s*=/, file);
  }
});

test("homepage keeps a crawlable entry to the full feature SEO page", () => {
  const source = readSource("src/pages/index.astro");

  assert.doesNotMatch(source, /data-seo-summary/);
  assert.doesNotMatch(source, /data-seo-content/);
  assert.doesNotMatch(source, /buildFAQPageSchema\(/);
  assert.doesNotMatch(source, /buildItemListSchema\(/);
  assert.match(source, /const featuresHref = buildLocalizedPath\(uiLocale, "\/features\/"\);/);
  assert.match(readSource("src/components/site/PageFooter.astro"), /\{ label: content\.footerFeatures, href: buildLocalizedPath\(locale, "\/features\/"\) \}/);
  assert.match(source, /link: featuresHref/);
});

test("homepage keeps a localized crawlable entry to the privacy policy", () => {
  const footer = readSource("src/components/site/PageFooter.astro");

  assert.match(footer, /\{ label: content\.footerPrivacy, href: buildLocalizedPath\(locale, "\/privacy\/"\) \}/);
  assert.match(readSource("src/pages/index.astro"), /<PageFooter locale=\{uiLocale\}/);
});

test("features page contains product-led searchable content and FAQ schema hooks", () => {
  const source = readSource("src/pages/features/index.astro");
  const contentSource = readSource("src/lib/features-content.ts");

  assert.match(source, /FEATURES_SEO_CONTENT/);
  assert.match(source, /buildFAQPageSchema\(/);
  assert.doesNotMatch(source, /mainEntity: faqSchema/);
  assert.match(source, /data-seo-content/);
  assert.match(contentSource, /标签页搜索/);
  assert.match(contentSource, /bookmark search/);
  assert.match(contentSource, /Arc migration/);
  assert.match(contentSource, /适合哪些用户/);
  assert.match(contentSource, /Developers and designers/);
  assert.match(contentSource, /Lumno 是 Arc 浏览器替代品吗/);
});

test("features hero install CTA is included in the conversion event funnel", () => {
  const source = readSource("src/pages/features/index.astro");

  assert.match(source, /data-analytics-event="open_chrome_web_store"/);
  assert.match(source, /data-analytics-category="conversion"/);
  assert.match(source, /data-analytics-label="features_hero_install"/);
});

test("localized features route reuses the canonical features page", () => {
  const source = readSource("src/pages/[locale]/features/index.astro");

  assert.match(source, /buildLocalizedPath\(locale, "\/features\/"\)/);
  assert.match(source, /buildRouteLanguageMap\("\/features\/"\)/);
});

test("shared SEO schema helpers support localized FAQ pages", () => {
  const source = readSource("src/lib/seo.ts");

  assert.match(source, /buildFAQPageSchema/);
  assert.match(source, /"@type": "FAQPage"/);
  assert.match(source, /acceptedAnswer/);
  assert.match(source, /inLanguage: language/);
  assert.doesNotMatch(source, /buildHowToSchema/);
  assert.match(source, /buildItemListSchema/);
  assert.match(source, /"@type": "ItemList"/);
});

test("release page exposes GitHub releases as an ItemList schema", () => {
  const source = readSource("src/pages/release/index.astro");

  assert.match(source, /\{ name: initialUi\.bannerTitle, path: seoPath \}/);
  assert.match(source, /<time class="entry-date" datetime=\{item\.date \|\| undefined\}>\{formatDate\(item\.date, uiLocale\)\}<\/time>/);
  assert.match(source, /<article class="entry" id=\{anchor\}>/);
  // Crawlers read localized labels without running the i18n script.
  assert.match(source, /\{initialUi\.featuresLabel\} \(\{localeContent\.features\.length\}\)/);
  assert.match(source, /\{initialUi\.githubPublished\}/);
  // The retired onboarding bundle no longer ships the shared icon font.
  assert.doesNotMatch(source, /\/onboarding\/assets\//);
  assert.match(source, /href="\/assets\/remixicon\.css"/);

  assert.match(source, /releaseItemListSchema/);
  assert.match(source, /buildItemListSchema\(/);
  assert.match(source, /type: "CreativeWork"/);
  assert.match(source, /datePublished/);
});

test("social metadata uses one default Open Graph image candidate", () => {
  const source = readSource("src/components/SeoHead.astro");

  assert.doesNotMatch(source, /DEFAULT_SOCIAL_SQUARE_IMAGE/);
  assert.match(source, /squareImage = ""/);
  assert.match(source, /property="og:image:secure_url"/);
  assert.match(source, /name="twitter:url"/);
});

test("Open Graph alternate locales use standard locale values and exclude the current locale", () => {
  const source = readSource("src/components/SeoHead.astro");

  assert.match(source, /getOpenGraphLocale/);
  assert.match(source, /normalizedCurrentHreflang/);
  assert.match(source, /item\.hreflang\.toLowerCase\(\) !== normalizedCurrentHreflang/);
  assert.match(source, /content=\{getOpenGraphLocale\(item\.hreflang\)\}/);
});

test("robots policy allows AI answer crawlers by default with an opt-out", () => {
  const source = readSource("src/pages/robots.txt.ts");

  assert.match(source, /PUBLIC_ALLOW_AI_CRAWLERS/);
  assert.match(source, /"GPTBot"/);
  assert.match(source, /"PerplexityBot"/);
  assert.match(source, /"Google-Extended"/);
  assert.match(source, /const aiCrawlerRule = allowAiCrawlers \? "Allow: \/" : "Disallow: \/";/);
});

test("llms.txt endpoint summarizes Lumno for answer engines", () => {
  const source = readSource("src/pages/llms.txt.ts");

  assert.match(source, /Lumno/);
  assert.match(source, /browser command bar/);
  assert.match(source, /tab search/);
  assert.match(source, /bookmark search/);
  assert.match(source, /site search/);
  assert.match(source, /Target Users/);
  assert.match(source, /Arc browser alternative/);
});

test("sitemap exposes localized features pages", () => {
  const source = readSource("src/pages/sitemap.xml.ts");

  assert.match(source, /featuresLastmod/);
  assert.match(source, /buildLocalizedPath\(locale, "\/features\/"\)/);
  assert.match(source, /priority: "0.85"/);
});

test("sitemap exposes localized privacy pages", () => {
  const source = readSource("src/pages/sitemap.xml.ts");

  assert.match(source, /localizedPrivacyUrls/);
  assert.match(source, /buildLocalizedPath\(locale, "\/privacy\/"\)/);
  assert.match(source, /src\/content\/privacy-policy\.zh-TW\.md/);
  assert.match(source, /src\/content\/privacy-policy\.en\.md/);
});

test("language menus expose every locale as a crawlable link", () => {
  const menuSource = readSource("src/components/onboarding/LanguageMenu.tsx");
  assert.match(menuSource, /href: hrefs\[option\.value\]/);
  // Every page renders the shared header, whose language menu links each locale's version of the page.
  assert.match(readSource("src/components/site/SiteHeader.astro"), /<LanguageMenu[\s\S]*?hrefs=\{routeLanguageMap\}/);
  assert.match(readSource("src/pages/index.astro"), /<SiteHeader locale=\{uiLocale\} routeLanguageMap=\{routeLanguageMap\} \/>/);
  assert.match(readSource("src/layouts/SitePage.astro"), /<SiteHeader locale=\{locale\} routeLanguageMap=\{routeLanguageMap\}/);
  assert.match(readSource("src/pages/release/index.astro"), /<SiteHeader locale=\{uiLocale\} routeLanguageMap=\{routeLanguageMap\}/);
  // Links stay links for crawlers; the runtime still handles persistence and navigation.
  assert.match(readSource("src/scripts/language-runtime.ts"), /event\.preventDefault\(\);\s*const next/);
});

test("localized pages link to same-locale routes", () => {
  const header = readSource("src/components/site/SiteHeader.astro");
  assert.match(header, /const homeHref = buildLocalizedPath\(locale, "\/"\);/);
  assert.match(header, /const releaseHref = buildLocalizedPath\(locale, "\/release\/"\);/);
  assert.match(header, /class="top-nav-brand"\s*href=\{homeHref\}/);
  assert.match(header, /releaseHref=\{releaseHref\}/);
});

test("release page keeps a descriptive h1 for web visitors", () => {
  const source = readSource("src/pages/release/index.astro");
  assert.match(source, /bannerTitle: "Lumno 更新日志"/);
  assert.match(source, /banner_title_web: "Lumno Release Notes"/);
  assert.match(source, /!entryContext\.isExtensionEntry\s*\? getMessage\(resolvedLocale, "banner_title_web"\)/);
  assert.doesNotMatch(source, /\.banner-overlay \{[^}]*display: none;/);
});

test("homepage intro never hides content without JavaScript", () => {
  const source = readSource("src/pages/index.astro");
  assert.match(source, /document\.documentElement\.setAttribute\("data-home-intro-js", ""\)/);
  assert.doesNotMatch(source, /^\s*body\[data-home-intro=/m);
});

test("deploy checkout keeps history for accurate sitemap lastmod", () => {
  assert.match(readSource(".github/workflows/deploy-pages.yml"), /fetch-depth: 0/);
  assert.match(readSource("src/pages/sitemap.xml.ts"), /execFileSync\("git", \["log"/);
});

test("homepage footer links every language version of the page", () => {
  const source = readSource("src/components/site/PageFooter.astro");
  const footer = readSource("src/components/home/sections/SiteFooter.astro");

  assert.match(source, /href: routeLanguageMap\[language\.code\]/);
  assert.match(footer, /hreflang=\{language\.code\}/);
  assert.match(footer, /aria-current=\{language\.current \? "page" : undefined\}/);
});

test("site-search icons are self-hosted for visitors who cannot reach GitHub raw files", () => {
  const providers = readSource("src/lib/lumno-search-providers.ts");

  assert.match(providers, /export const LUMNO_SITE_SEARCH_ICON_ROOT = "\/assets\/site-search";/);
  for (const key of ["gh", "gpt", "ds", "kimi", "yt", "tb", "jd", "xhs"]) {
    assert.ok(fs.existsSync(path.join(workspaceRoot, `public/assets/site-search/tile-${key}.png`)), key);
  }
});
