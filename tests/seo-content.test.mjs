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

  for (const file of ["src/pages/onboarding/index.astro", "src/pages/release/index.astro"]) {
    const source = readSource(file);
    assert.doesNotMatch(source, /i18nTitleKey="page_title_ui"/, file);
    assert.match(source, /define:vars=\{\{[^\n]*pageTitleByLocale/, file);
    assert.match(source, /document\.title = pageTitleByLocale\[resolvedLocale\]/, file);
  }
});

test("public entry pages stay stable without overriding extension browser-language entry", () => {
  for (const file of ["src/pages/onboarding/index.astro", "src/pages/release/index.astro"]) {
    const source = readSource(file);
    assert.match(source, /!INITIAL_ENTRY_CONTEXT\.isExtensionEntry && !storedMode \? FALLBACK_LOCALE : null/, file);
    assert.match(source, /forcedLocale: initialForcedLocale/, file);
    assert.match(source, /shouldRedirect: \(\) => !INITIAL_ENTRY_CONTEXT\.isExtensionEntry/, file);
  }
});

test("homepage keeps a crawlable entry to the full feature SEO page", () => {
  const source = readSource("src/pages/index.astro");

  assert.doesNotMatch(source, /data-seo-summary/);
  assert.doesNotMatch(source, /data-seo-content/);
  assert.doesNotMatch(source, /buildFAQPageSchema\(/);
  assert.doesNotMatch(source, /buildItemListSchema\(/);
  assert.match(source, /featuresHref/);
  assert.match(source, /href=\{featuresHref\}/);
});

test("homepage keeps a localized crawlable entry to the privacy policy", () => {
  const source = readSource("src/pages/index.astro");
  const contentSource = readSource("src/lib/home-content.ts");

  assert.match(source, /const privacyHref = buildLocalizedPath\(uiLocale, "\/privacy\/"\);/);
  assert.match(source, /<footer class="site-legal-nav">/);
  assert.match(source, /href=\{privacyHref\}/);
  assert.match(contentSource, /footerPrivacy: "隐私政策"/);
  assert.match(contentSource, /footerPrivacy: "隱私權政策"/);
  assert.match(contentSource, /footerPrivacy: "Privacy"/);
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
  assert.match(source, /buildHowToSchema/);
  assert.match(source, /"@type": "HowTo"/);
  assert.match(source, /buildItemListSchema/);
  assert.match(source, /"@type": "ItemList"/);
});

test("onboarding page exposes shortcut setup as HowTo schema", () => {
  const source = readSource("src/pages/onboarding/index.astro");

  assert.match(source, /buildHowToSchema\(/);
  assert.match(source, /shortcutHowToName/);
  assert.match(source, /shortcutStepName1/);
  assert.match(source, /mainEntity: shortcutHowToSchema/);
});

test("release page exposes GitHub releases as an ItemList schema", () => {
  const source = readSource("src/pages/release/index.astro");

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
