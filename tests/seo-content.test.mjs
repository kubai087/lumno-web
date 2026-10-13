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

test("homepage carries the FAQ schema now that the features page is retired", () => {
  const source = readSource("src/pages/index.astro");

  assert.doesNotMatch(source, /\/features\//);
  assert.doesNotMatch(readSource("src/components/site/PageFooter.astro"), /\/features\//);
  assert.match(source, /buildFAQPageSchema\(\{\s*items: (?:content\.)?faqItems/);
});

test("retired features routes redirect to the localized homepage", () => {
  const config = readSource("astro.config.mjs");

  assert.match(config, /"\/features": "\/"/);
  assert.match(config, /`\/\$\{segment\}\/features`, `\/\$\{segment\}\/`/);
});

test("homepage keeps a localized crawlable entry to the privacy policy", () => {
  const footer = readSource("src/components/site/PageFooter.astro");

  assert.match(footer, /\{ label: content\.footerPrivacy, href: buildLocalizedPath\(locale, "\/privacy\/"\) \}/);
  assert.match(readSource("src/pages/index.astro"), /<PageFooter locale=\{uiLocale\}/);
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
  // ChatGPT search and Claude search use their own crawlers, separate from GPTBot and ClaudeBot.
  assert.match(source, /"OAI-SearchBot"/);
  assert.match(source, /"Claude-SearchBot"/);
  assert.match(source, /"Perplexity-User"/);
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

test("sitemap exposes localized privacy pages", () => {
  const source = readSource("src/pages/sitemap.xml.ts");

  assert.match(source, /localizedPrivacyUrls/);
  assert.match(source, /buildLocalizedPath\(locale, "\/privacy\/"\)/);
  // Every locale's policy lives in src/content/, so the whole folder dates the pages.
  assert.match(source, /"src\/content\/"/);
});

test("language menus expose every locale as a crawlable link", () => {
  const menuSource = readSource("src/components/onboarding/LanguageMenu.tsx");
  assert.match(menuSource, /href: hrefs\[option\.value\]/);
  // Every page renders the shared header, whose language menu links each locale's version of the page.
  assert.match(readSource("src/components/site/SiteHeader.astro"), /<LanguageMenu[\s\S]*?hrefs=\{routeLanguageMap\}/);
  assert.match(readSource("src/pages/index.astro"), /<SiteHeader locale=\{uiLocale\} routeLanguageMap=\{routeLanguageMap\} handoff=/);
  assert.match(readSource("src/layouts/SitePage.astro"), /<SiteHeader\s+locale=\{locale\}\s+routeLanguageMap=\{routeLanguageMap\}/);
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
  assert.match(source, /banner_title_web: "Lumno 近期更新"/);
  assert.match(source, /bannerTitle: uiMessages\.banner_title_web/);
  assert.match(source, /banner_title_web: "Lumno Release Notes"/);
  assert.match(source, /!entryContext\.isExtensionEntry\s*\? getMessage\(resolvedLocale, "banner_title_web"\)/);
  assert.doesNotMatch(source, /\.banner-overlay \{[^}]*display: none;/);
});

test("homepage intro never hides content without JavaScript", () => {
  const source = readSource("src/pages/index.astro");
  // Only script sets the gate (now just for the once-a-day intro); every hiding rule sits behind it.
  assert.match(source, /document\.documentElement\.setAttribute\(playHomeIntro \? "data-home-intro-js" : "data-home-intro-skip", ""\)/);
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

test("IndexNow key file is served and deploys submit only changed sitemap URLs", () => {
  const script = readSource("scripts/submit-indexnow.mjs");
  const key = script.match(/const INDEXNOW_KEY = "([0-9a-f]{32})"/)?.[1];

  assert.ok(key, "IndexNow key constant");
  assert.equal(readSource(`public/${key}.txt`).trim(), key);
  assert.match(script, /previous\.get\(loc\) !== lastmod/);

  const workflow = readSource(".github/workflows/deploy-pages.yml");
  assert.match(workflow, /live-sitemap\.xml/);
  assert.match(workflow, /node scripts\/submit-indexnow\.mjs dist\/sitemap\.xml/);
  assert.match(workflow, /name: Notify IndexNow\n\s+# .*\n\s+continue-on-error: true/);
});

test("analytics tags landings from AI assistants for GEO reporting", () => {
  const source = readSource("src/components/SeoHead.astro");

  assert.match(source, /"ai_assistant_visit"/);
  assert.match(source, /window\.gtag\("set", "user_properties", \{ ai_source: aiSource \}\)/);
  assert.match(source, /document\.referrer/);
  assert.match(source, /get\("utm_source"\)/);
  for (const host of ["chatgpt", "perplexity", "gemini", "deepseek", "doubao"]) {
    assert.match(source, new RegExp(`\\["${host}",`), host);
  }
});

test("homepage shows search crawlers the settled page instead of the intro and scroll entrance", () => {
  const source = readSource("src/pages/index.astro");
  // Crawlers run JS with empty storage, so without this every crawl renders mid-intro with the copy hidden.
  assert.match(source, /const isSearchCrawler = \/googlebot\|google-inspectiontool\|bingbot[^\n]*\.test\(navigator\.userAgent\)/);
  assert.match(source, /let playHomeIntro = !isSearchCrawler;/);
  assert.match(source, /if \(isSearchCrawler\) document\.documentElement\.setAttribute\("data-crawler", ""\)/);
  // Speed tests should keep measuring what visitors see.
  assert.doesNotMatch(source, /const isSearchCrawler = [^\n]*lighthouse/i);

  const reveal = readSource("src/scripts/home-reveal.ts");
  assert.match(reveal, /&& !root\.hasAttribute\("data-crawler"\)/);

  // Google's renderer stretches the viewport, which would push a screen-tall hero's copy off its screenshot.
  assert.match(source, /html\[data-crawler\] \.hero-section \{\s*min-height: auto;/);

  // The New Tab heading fades in on view, which a crawler never scrolls to.
  const parallax = readSource("src/components/ui/hero-parallax.tsx");
  assert.match(parallax, /document\.documentElement\.hasAttribute\("data-crawler"\)\s*\|\| \(header/);
});
