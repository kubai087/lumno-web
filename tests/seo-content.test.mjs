import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("homepage keeps a crawlable entry to the full feature SEO page", () => {
  const source = readSource("src/pages/index.astro");

  assert.doesNotMatch(source, /data-seo-content/);
  assert.doesNotMatch(source, /buildFAQPageSchema\(/);
  assert.match(source, /featuresHref/);
  assert.match(source, /href=\{featuresHref\}/);
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
  assert.match(contentSource, /Lumno 是 Arc 浏览器替代品吗/);
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
});

test("social metadata uses one default Open Graph image candidate", () => {
  const source = readSource("src/components/SeoHead.astro");

  assert.doesNotMatch(source, /DEFAULT_SOCIAL_SQUARE_IMAGE/);
  assert.match(source, /squareImage = ""/);
  assert.match(source, /property="og:image:secure_url"/);
  assert.match(source, /name="twitter:url"/);
});

test("robots policy allows AI answer crawlers by default with an opt-out", () => {
  const source = readSource("src/pages/robots.txt.ts");

  assert.match(source, /PUBLIC_ALLOW_AI_CRAWLERS/);
  assert.match(source, /"GPTBot"/);
  assert.match(source, /"PerplexityBot"/);
  assert.match(source, /const aiCrawlerRule = allowAiCrawlers \? "Allow: \/" : "Disallow: \/";/);
});

test("llms.txt endpoint summarizes Lumno for answer engines", () => {
  const source = readSource("src/pages/llms.txt.ts");

  assert.match(source, /Lumno/);
  assert.match(source, /browser command bar/);
  assert.match(source, /tab search/);
  assert.match(source, /bookmark search/);
  assert.match(source, /site search/);
});

test("sitemap exposes localized features pages", () => {
  const source = readSource("src/pages/sitemap.xml.ts");

  assert.match(source, /featuresLastmod/);
  assert.match(source, /buildLocalizedPath\(locale, "\/features\/"\)/);
  assert.match(source, /priority: "0.85"/);
});
