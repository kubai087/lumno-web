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
// Screenshots show the extension in the language it speaks to that reader; it ships zh-CN, zh-TW, en and ja.
const shotLocale = (locale) => (["zh-CN", "zh-TW", "en", "ja"].includes(locale) ? locale : "en");
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
        assert.ok(screenshots[`${shotLocale(locale)}/${name}`], `${shotLocale(locale)}/${name} is in screenshots.json`);
        assert.ok(fs.existsSync(path.join(workspaceRoot, `public/assets/guides/${shotLocale(locale)}/${name}.webp`)), `${shotLocale(locale)}/${name}.webp`);
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
  // Plain text rows (no icons); the current page sits on a soft grey pill.
  assert.doesNotMatch(shell, /GUIDE_ICONS/);
  assert.match(readSource("src/styles/guides.css"), /\.guide-nav a\[aria-current="page"\] \{\s*background: var\(--guide-row-current\);/);
  assert.match(article, /<kbd class="home-kbd">/);
  assert.match(article, /data-guide-zoom/);
  assert.match(shell, /lightbox\.showModal\(\)/);
  assert.match(article, /class="guide__pager"/);
  // Search: the index is built at build time and fetched on first focus.
  assert.match(shell, /data-guide-search data-index=\{searchIndexHref\}/);
  assert.match(shell, /const searchIndexHref = `\$\{buildLocalizedPath\(locale, "\/help\/"\)\}search-index\.json`;/);
  assert.match(shell, /input\.addEventListener\("focus", \(\) => load\(\)\.then\(render\)\)/);
  assert.match(readSource("src/pages/help/search-index.json.ts"), /buildGuideSearchIndex\(DEFAULT_LOCALE\)/);
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
  assert.ok(!fs.existsSync(path.join(workspaceRoot, "src/pages/help/index.astro")));
  assert.match(guidesSource, /slug === "privacy" \? "\/privacy\/" : `\/help\/\$\{slug\}\/`/);
  assert.match(readSource("astro.config.mjs"), /"\/help": "\/help\/what-is-lumno\/",\s*"\/guides": "\/help\/what-is-lumno\/"/);
  // It started at /guides/: every old page redirects to its /help/ address.
  for (const route of ["src/pages/guides/[slug]/index.html.ts", "src/pages/[locale]/guides/[slug]/index.html.ts"]) {
    assert.match(readSource(route), /quietRedirectPage\(target, new URL\(target, site\)\.href\)/, route);
  }
  assert.match(readSource("src/pages/sitemap.xml.ts"), /\.\.\.guideUrls,/);
  assert.match(readSource("src/pages/llms.txt.ts"), /## Help Center/);
  assert.match(readSource("src/components/site/PageFooter.astro"), /getGuideContent\(locale\)\.ui\.navLabel, href: getGuidePath\(locale\)/);
});

test("the privacy policy keeps its URL and reads inside the help center", () => {
  const privacy = readSource("src/pages/privacy/index.astro");
  assert.match(navSource, /"privacy-data", "privacy", "security-open-source"/);
  assert.match(guidesSource, /slug === "privacy" \? "\/privacy\/"/);
  assert.match(privacy, /<GuideShell\s+locale=\{uiLocale\}\s+current="privacy"/);
  assert.match(readSource("src/lib/guide-search-index.ts"), /title: ui\.privacyLabel/);
});

test("moving between pages switches at once, then glides to the top", () => {
  const shell = readSource("src/components/guides/GuideShell.astro");
  const styles = readSource("src/styles/guides.css");

  assert.match(shell, /closest\("\.guide-nav a, \.guide__pager a:not\(\[data-guide-home\]\), \.guide-search__results a"\)/);
  // The first page's left card goes back to the website, as a normal page load.
  assert.match(readSource("src/components/guides/GuideArticle.astro"), /href: buildLocalizedPath\(locale, "\/"\), label: ui\.homeCardLabel, title: ui\.homeCardTitle/);
  assert.match(shell, /if \(target\) goTo\(target\.href\);/);
  // The old offset carries over, the new page starts there and scrolls up.
  assert.match(shell, /sessionStorage\.setItem\("lumno-guide-page-scroll"/);
  assert.match(shell, /window\.scrollTo\(\{ top: start, behavior: "instant" \}\);/);
  // The bar holds still through the swap (no morph, no drop-in); the site header retracts it while gliding up.
  assert.match(shell, /nav\.style\.viewTransitionName = "none";[\s\S]*?document\.body\.classList\.add\("has-nav-install", "is-nav-install-settled"\);[\s\S]*?document\.documentElement\.dataset\.navArrival = "glide";/);
  assert.match(readSource("src/components/site/SiteHeader.astro"), /if \(document\.documentElement\.dataset\.navArrival === "glide"\) \{[\s\S]*?returnToTop\(\);/);
  // The page list keeps its scroll position across pages.
  assert.match(shell, /sessionStorage\.getItem\("lumno-guide-nav-scroll"\)/);
  // No blank flash, no fade.
  assert.match(styles, /@view-transition \{\s*navigation: auto;\s*\}/);
  assert.match(styles, /::view-transition-new\(root\) \{\s*animation: none;/);
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

test("the header and every page point to help, and pages end with where to ask", () => {
  const header = readSource("src/components/site/SiteHeader.astro");
  const links = readSource("src/components/navigation/HomeNavGhostLinks.tsx");
  const shell = readSource("src/components/guides/GuideShell.astro");
  assert.match(header, /const helpHref = getGuidePath\(locale\);/);
  assert.match(links, /value: "help"/);
  assert.match(links, /analyticsEvent: "open_help_center"/);
  // Chinese pages offer the group (the community panel) and a quiet issue link; others GitHub and X.
  assert.match(shell, /<aside class="guide__stuck">[\s\S]*?community\.kind === "group"[\s\S]*?communityTriggerAttributes\(getCommunityPanel\(locale\)\)[\s\S]*?\{ui\.stuckPrimary\}[\s\S]*?community\.kind === "group" \? GITHUB_ISSUE_URL : COMMUNITY_LINKS\.xUrl[\s\S]*?\{ui\.stuckSecondary\}/);
  for (const locale of locales) assert.match(readSource(`src/content/guides/${locale}.ts`), /stuckText: "[^"]+",\n    stuckPrimary: "[^"]+",\n    stuckSecondary: "[^"]+"/, locale);
  assert.match(readSource("src/content/guides/zh-CN.ts"), /stuckPrimary: "加入用户群",\n    stuckSecondary: "提交 Issue"/);
});

test("the help center ships in every site language and switching language keeps the page", () => {
  assert.deepEqual(locales, ["zh-CN", "zh-TW", "en", "ja", "ko", "de", "fr", "es", "pt-BR", "ru"]);
  // Every language in the menu lands on the same page in that language.
  assert.match(guidesSource, /LOCALE_CONFIG\.map\(\(item\) => \[item\.code, getGuidePath\(item\.code, slug\)\]\)/);
  assert.match(readSource("src/components/guides/GuideArticle.astro"), /routeLanguageMap=\{buildGuideRouteLanguageMap\(slug\)\}/);
  // Languages the extension doesn't speak read their own text around the English captures.
  assert.match(guidesSource, /const shotLocale = getExtensionLocale\(locale\);/);
  for (const locale of ["ko", "de", "fr", "es", "pt-BR", "ru"]) {
    assert.doesNotMatch(readSource(guideFile("what-is-lumno", locale)), /Lumno is a free, open-source browser extension/, `${locale} is translated`);
  }
});

test("the page list scrolls to its last item without clipping it", () => {
  const styles = readSource("src/styles/guides.css");
  // The bottom fades only while more of the list waits below.
  assert.match(styles, /\.guide-nav \{[\s\S]*?scrollbar-width: none;[\s\S]*?mask-image: linear-gradient\(/);
  assert.match(styles, /\.guide-nav\[data-more\] \{\s*--guide-nav-fade-bottom: 48px;/);
  // No scrollbar: arrow buttons at the edges that have more beyond them.
  assert.match(readSource("src/components/guides/GuideShell.astro"), /class="guide-nav-step guide-nav-step--up" data-guide-nav-step="-1"[\s\S]*?class="guide-nav-step guide-nav-step--down" data-guide-nav-step="1"/);
  assert.match(styles, /\.guide-nav-frame\[data-above\] \.guide-nav-step--up,\s*\.guide-nav-frame\[data-below\] \.guide-nav-step--down \{\s*opacity: 1;/);
  assert.match(readSource("src/components/guides/GuideShell.astro"), /const below = nav\.scrollTop \+ nav\.clientHeight < nav\.scrollHeight - 1;[\s\S]*?nav\.toggleAttribute\("data-more", below\);/);
});

test("switching language keeps the reader's place", () => {
  const header = readSource("src/components/site/SiteHeader.astro");
  const restore = readSource("src/components/LanguageScrollRestore.astro");
  // Recorded before the language runtime navigates: the section being read and how far into it.
  assert.match(header, /closest\("#language-menu \[data-lang-value\], \.site-footer__languages a\[hreflang\]"\)[\s\S]*?sessionStorage\.setItem\(\s*"lumno-language-scroll"[\s\S]*?\},\s*true,\s*\);/);
  // Restored on the new page at the same section (ids are the same in every language), else the same share of the page.
  assert.match(restore, /anchors\.findIndex\(\(element\) => element\.id === saved\.anchor\)[\s\S]*?saved\.ratio \* maxScroll[\s\S]*?behavior: "instant"/);
  assert.match(readSource("src/layouts/SitePage.astro"), /<LanguageScrollRestore \/>/);
  assert.match(readSource("src/pages/index.astro"), /<PageFooter locale=\{uiLocale\} routeLanguageMap=\{routeLanguageMap\} \/>\n    <LanguageScrollRestore \/>/);
});

