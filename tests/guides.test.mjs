import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

const guidesSource = readSource("src/lib/guides.ts");
const navSource = guidesSource.slice(guidesSource.indexOf("export const GUIDE_NAV"), guidesSource.indexOf("] as const;"));
const navKeys = [...navSource.matchAll(/slugs: \[([^\]]*)\]/g)].flatMap(([, list]) => [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]));
// "privacy" is the privacy policy at /privacy/, shown in the help center's frame.
const slugs = navKeys.filter((key) => key !== "privacy");
const locales = JSON.parse(guidesSource.match(/GUIDE_LOCALES = (\[[^\]]*\])/)[1]);
const screenshots = JSON.parse(readSource("src/content/guides/screenshots.json"));
const banners = JSON.parse(readSource("src/content/guides/banners.json"));

function guideFile(slug, locale) {
  return `src/content/guides/${locale === "zh-CN" ? slug : `${slug}.${locale}`}.md`;
}

test("the help center groups pages into about, quick start and trust", () => {
  assert.deepEqual([...navSource.matchAll(/\bid: "(about|quickstart|trust)"/g)].map((match) => match[1]), ["about", "quickstart", "trust"]);
  // Quick start follows what someone does after installing.
  assert.ok(slugs.indexOf("install") < slugs.indexOf("search-tabs-bookmarks-history"));
  assert.ok(slugs.indexOf("search-tabs-bookmarks-history") < slugs.indexOf("newtab-wallpaper"));
  assert.equal(new Set(slugs).size, slugs.length, "each page appears once");
});

test("every page has text, a body with anchored sections, and a banner", () => {
  for (const locale of locales) {
    const content = readSource(`src/content/guides/${locale}.ts`);
    for (const slug of slugs) {
      assert.match(content, new RegExp(`"?${slug}"?: \\{\\s*pageTitle:`), `${slug} (${locale}) page text`);
      const source = readSource(guideFile(slug, locale));
      const headings = [...source.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
      assert.ok(headings.length >= 2, `${slug} (${locale}) has sections`);
      for (const heading of headings) {
        assert.match(heading, /\{#[a-z0-9-]+\}$/, `${slug} (${locale}): "${heading}" needs an anchor`);
      }
      // The page adds the FAQ section itself.
      assert.doesNotMatch(source, /\{#faq\}/);
      // Links between pages are relative, so they work under every language prefix.
      for (const [, href] of source.matchAll(/\]\((\.\.\/[^)]+)\)/g)) {
        const target = href.replace(/^\.\.\//, "").split(/[/#]/)[0];
        assert.ok(slugs.includes(target), `${slug} (${locale}) links to unknown page ${href}`);
      }
    }
  }
  // Every page has a banner; "About Lumno" opens on the store artwork's meadow (P1).
  for (const slug of slugs) {
    assert.ok(banners[slug]?.width && banners[slug]?.height, `${slug} banner size`);
    assert.match(banners[slug].color, /^#[0-9a-f]{6}$/, `${slug} banner placeholder colour`);
    assert.ok(fs.existsSync(path.join(workspaceRoot, `public/assets/guides/banners/${slug}.webp`)), `${slug} banner file`);
  }
  const bannerScript = readSource("scripts/guide-screenshots/banners.mjs");
  assert.match(bannerScript, /const P1 = \["settings-bg-light-monet-newtab"/);
  for (const slug of ["what-is-lumno", "limitations", "use-cases"]) {
    assert.match(bannerScript, new RegExp(`"?${slug}"?: P1,`), `${slug} uses P1`);
  }
  assert.equal(slugs[0], "what-is-lumno");
});

test("screenshots are real captures that exist with recorded sizes", () => {
  let total = 0;
  for (const locale of locales) {
    for (const slug of slugs) {
      const source = readSource(guideFile(slug, locale));
      for (const [, alt, name] of source.matchAll(/!\[([^\]]+)\]\(([a-z0-9-]+) "([^"]+)"\)/g)) {
        total += 1;
        assert.ok(alt.length > 10, `${slug} (${locale}) ${name} has descriptive alt text`);
        assert.ok(screenshots[`${locale}/${name}`], `${locale}/${name} is in screenshots.json`);
        assert.ok(fs.existsSync(path.join(workspaceRoot, `public/assets/guides/${locale}/${name}.webp`)), `${locale}/${name}.webp`);
      }
    }
  }
  assert.ok(total >= 15);
});

test("pages carry article, FAQ and breadcrumb schema and limit hreflang to guide languages", () => {
  const article = readSource("src/components/guides/GuideArticle.astro");

  assert.match(article, /buildTechArticleSchema\(/);
  assert.match(article, /buildFAQPageSchema\(\{ items: faq/);
  assert.match(article, /buildBreadcrumbListSchema\(/);
  assert.match(article, /alternateLocales=\{GUIDE_LOCALES\}/);
  assert.match(article, /width="\$\{shot\.width\}" height="\$\{shot\.height\}"/);

  const layout = readSource("src/layouts/SitePage.astro");
  assert.match(layout, /alternateLocales\.map\(\(code\) => \[code, routeLanguageMap\[code\]\]\)/);
  // A saved language without this page must not send the visitor to another page.
  assert.match(layout, /if \(redirectLocales && !redirectLocales\.includes\(targetLocale\)\) return;/);
});

test("pages read like a wiki: search, sidebar, keycaps, zoomable screenshots, previous and next", () => {
  const article = readSource("src/components/guides/GuideArticle.astro");
  const shell = readSource("src/components/guides/GuideShell.astro");

  assert.match(article, /<GuideShell locale=\{locale\} current=\{slug\}/);
  assert.match(shell, /<details class="guide-nav" open>/);
  assert.match(shell, /aria-current=\{item === current \? "page" : undefined\}/);
  assert.match(shell, /guide-nav__list--nested/);
  assert.match(article, /<kbd class="home-kbd">/);
  assert.match(article, /data-guide-zoom/);
  assert.match(shell, /lightbox\.showModal\(\)/);
  assert.match(article, /class="guide__pager"/);
  // Search: the index is built at build time and fetched on first focus.
  assert.match(shell, /data-guide-search data-index=\{searchIndexHref\}/);
  assert.match(shell, /const searchIndexHref = `\$\{buildLocalizedPath\(locale, "\/guides\/"\)\}search-index\.json`;/);
  assert.match(shell, /input\.addEventListener\("focus", \(\) => load\(\)\.then\(render\)\)/);
  assert.match(readSource("src/pages/guides/search-index.json.ts"), /buildGuideSearchIndex\(DEFAULT_LOCALE\)/);
  // Store numbers come from the build, never typed into the text.
  assert.match(readSource("src/content/guides/ratings-reviews.md"), /\{\{chromeRating\}\}/);
  assert.match(article, /getChromeStoreReviews\(\)/);
});

test("guide text is static HTML, never inside a hydrated island", () => {
  const article = readSource("src/components/guides/GuideArticle.astro");
  assert.doesNotMatch(article, /client:(load|idle|visible|media|only)/);
  assert.match(article, /<Fragment set:html=\{bodyHtml\} \/>/);
  assert.match(article, /<h3>\{item\.question\}<\/h3>\s*<p>\{item\.answer\}<\/p>/);
});

test("the help center has no index page and is discoverable from the sitemap, llms.txt and footer", () => {
  assert.ok(!fs.existsSync(path.join(workspaceRoot, "src/pages/guides/index.astro")));
  assert.match(readSource("astro.config.mjs"), /"\/guides": "\/guides\/what-is-lumno\/"/);
  assert.match(readSource("src/pages/sitemap.xml.ts"), /\.\.\.guideUrls,/);
  assert.match(readSource("src/pages/llms.txt.ts"), /## Help Center/);
  assert.match(readSource("src/components/site/PageFooter.astro"), /getGuideContent\(locale\)\.ui\.navLabel, href: getGuidePath\(locale\)/);
});

test("the privacy policy keeps its URL and joins the help center in its languages", () => {
  const privacy = readSource("src/pages/privacy/index.astro");
  assert.match(navSource, /"privacy-data", "privacy", "security-open-source"/);
  assert.match(guidesSource, /slug === "privacy" \? "\/privacy\/"/);
  assert.match(privacy, /const inHelpCenter = isGuideLocale\(uiLocale\);/);
  assert.match(privacy, /<GuideShell[\s\S]*?current="privacy"/);
  // Other languages keep the standalone document.
  assert.match(privacy, /<div class="doc">/);
  assert.match(readSource("src/lib/guide-search-index.ts"), /title: ui\.privacyLabel/);
});

test("moving between pages switches at once, then glides to the top", () => {
  const shell = readSource("src/components/guides/GuideShell.astro");
  const styles = readSource("src/styles/guides.css");

  assert.match(shell, /closest\("\.guide-nav a, \.guide__pager a, \.guide-search__results a"\)/);
  assert.match(shell, /if \(target\) goTo\(target\.href\);/);
  // The old offset carries over, the new page starts there and scrolls up.
  assert.match(shell, /sessionStorage\.setItem\("lumno-guide-page-scroll"/);
  assert.match(shell, /behavior: "instant"[\s\S]*?window\.scrollTo\(\{ top: 0, behavior: "smooth" \}\)/);
  // The page list keeps its scroll position across pages.
  assert.match(shell, /sessionStorage\.getItem\("lumno-guide-nav-scroll"\)/);
  // No blank flash, no fade.
  assert.match(styles, /@view-transition \{\s*navigation: auto;\s*\}/);
  assert.match(styles, /::view-transition-new\(\*\) \{\s*animation: none;/);
  // Reduced motion: no glide.
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(shell, /prefers-reduced-motion: reduce/);
});

test("links carry their site's icon, saved on this site", () => {
  const article = readSource("src/components/guides/GuideArticle.astro");
  assert.match(article, /renderer\.link = function/);
  assert.match(article, /let src = "\/favicon\.png";/);
  assert.match(article, /\/assets\/guides\/favicons\/\$\{host\}\.png/);
  // Every external site the pages link to has a saved icon.
  for (const file of fs.readdirSync(path.join(workspaceRoot, "src/content/guides")).filter((name) => name.endsWith(".md"))) {
    for (const [, href] of readSource(`src/content/guides/${file}`).matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
      const host = new URL(href).hostname;
      assert.ok(fs.existsSync(path.join(workspaceRoot, `public/assets/guides/favicons/${host}.png`)), `${file}: icon for ${host}`);
    }
  }
});

test("the page list is always open on wide screens, folded only on phones", () => {
  const shell = readSource("src/components/guides/GuideShell.astro");
  assert.match(shell, /const fitNav = \(\) => \{\s*if \(nav\) nav\.open = !narrow\.matches;/);
  assert.match(shell, /narrow\.addEventListener\("change", fitNav\);/);
});

test("the header links to the help center in the languages that have it", () => {
  const header = readSource("src/components/site/SiteHeader.astro");
  const links = readSource("src/components/navigation/HomeNavGhostLinks.tsx");
  assert.match(header, /const helpHref = isGuideLocale\(locale\) \? getGuidePath\(locale\) : undefined;/);
  assert.match(links, /value: "help" as const/);
  assert.match(links, /analyticsEvent: "open_help_center"/);
});
