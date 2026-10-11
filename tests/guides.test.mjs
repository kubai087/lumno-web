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
  const navList = readSource("src/components/guides/GuideNavList.astro");
  assert.match(shell, /<div class="guide-nav">\s*<GuideNavList locale=\{locale\} current=\{current\} \/>/);
  assert.match(navList, /aria-current=\{item === current \? "page" : undefined\}/);
  assert.match(navList, /guide-nav__list--nested/);
  // Phones open the same list as a sheet from the bottom bar, next to the outline.
  assert.match(shell, /data-guide-sheet-open="pages"[\s\S]*?data-guide-sheet-open="outline"/);
  assert.match(shell, /<div class="guide-nav guide-nav--sheet">\s*<GuideNavList/);
  // Plain text rows (no icons); the current page sits on a soft grey pill.
  assert.doesNotMatch(shell, /GUIDE_ICONS/);
  assert.match(readSource("src/styles/guides.css"), /\.guide-nav a\[aria-current="page"\] \{\s*background: var\(--guide-row-current\);/);
  assert.match(article, /<kbd class="home-kbd">/);
  assert.match(article, /data-guide-zoom/);
  assert.match(shell, /lightbox\.showModal\(\)/);
  assert.match(article, /class="guide__pager"/);
  // Search: the index is built at build time and fetched on first focus.
  assert.match(shell, /data-guide-search\s+data-index=\{searchIndexHref\}/);
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
  assert.match(navSource, /"browser-compatibility", "privacy", "security-open-source"/);
  // The old "privacy and data" page is the policy's opening summary now; every old address lands on the policy.
  assert.ok(!navKeys.includes("privacy-data"));
  assert.ok(!fs.existsSync(path.join(workspaceRoot, "src/content/guides/privacy-data.md")));
  const config = readSource("astro.config.mjs");
  assert.match(config, /"\/help\/privacy-data": "\/privacy\/",\s*"\/guides\/privacy-data": "\/privacy\/"/);
  assert.match(config, /\[`\/\$\{segment\}\/help\/privacy-data`, `\/\$\{segment\}\/privacy\/`\]/);
  assert.match(config, /\[`\/\$\{segment\}\/guides\/privacy-data`, `\/\$\{segment\}\/privacy\/`\]/);
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
  assert.match(shell, /if \(target && target\.matches\("a:not\(\[target\]\)"\)\) goTo\(target\.href\);/);
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

test("the page list stays in the sidebar on wide screens and moves to the bottom bar on phones", () => {
  const styles = readSource("src/styles/guides.css");
  assert.match(styles, /@media \(max-width: 959px\) \{[\s\S]*?\.guide-nav-frame \{\s*display: none;/);
  assert.match(styles, /@media \(max-width: 959px\) \{[\s\S]*?\.guide-dock__button--pages \{\s*display: flex;/);
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


test("search aliases, synonyms and eval sets cover the extension's four index languages and stay off the page", () => {
  const index = readSource("src/lib/guide-search-index.ts");
  for (const locale of ["zh-CN", "zh-TW", "ja", "en"]) {
    assert.ok(fs.existsSync(path.join(workspaceRoot, `src/content/guides/search/${locale}.ts`)), `aliases for ${locale}`);
    assert.match(index, new RegExp(`from "../content/guides/search/${locale}"`));
    assert.match(index, new RegExp(`from "../content/guides/search/synonyms/${locale}"`));
    assert.ok(JSON.parse(readSource(`src/content/guides/search/eval/${locale}.json`)).length >= 50, `eval set for ${locale}`);
  }
  assert.match(index, /\.\.\.withAliases\(slug, locale,/);
  assert.match(index, /withAliases\(\s*"privacy",/);
  assert.match(index, /which the page doesn't have/);
  assert.ok(fs.existsSync(path.join(workspaceRoot, "src/pages/[locale]/help/search-synonyms.json.ts")));
  assert.doesNotMatch(readSource("src/components/guides/GuideArticle.astro"), /content\/guides\/search/);
  // The eval set runs after every build and fails it when search gets worse.
  assert.match(JSON.parse(readSource("package.json")).scripts.build, /astro build && node scripts\/help-search-eval\.mjs/);
});

test("the search box runs the extension's matching rules and offers ways to ask when nothing matches", () => {
  const shell = readSource("src/components/guides/GuideShell.astro");
  assert.match(shell, /import searchLibSource from "\.\.\/\.\.\/scripts\/help-center-search\.js\?raw";/);
  assert.match(shell, /window\.LumnoHelpCenterSearch\.normalizeIndex\(data\)/);
  assert.match(shell, /search\.searchIndex\(index, query, \{ synonyms \}\)/);
  assert.match(shell, /<template data-guide-search-feedback>/);
  assert.match(shell, /community\.kind === "group" && \(\s*<button/);
  assert.match(shell, /if \(!query \|\| !index\) \{\s*results\.hidden = true;/);
  assert.doesNotMatch(shell, /review|rating/i);
});

test("help search: question words, synonyms, typos, aliases and recommended reading", async () => {
  await import("../src/scripts/help-center-search.js");
  const { searchIndex, getExactTerms } = globalThis.LumnoHelpCenterSearch;
  const index = [
    { title: "快捷键", href: "/help/keyboard-shortcuts/", sections: [{ id: "defaults", title: "默认快捷键" }, { id: "change", title: "修改快捷键", aliases: ["快捷键冲突"] }], text: "按下快捷键没有反应时……" },
    { title: "更换壁纸", href: "/help/newtab-wallpaper/", sections: [{ id: "sources", title: "壁纸来源" }, { id: "dark-mode", title: "为深色模式单独设置" }], text: "内置、本地和 Bing 壁纸" },
    { title: "Change the wallpaper", href: "/en/help/newtab-wallpaper/", sections: [{ id: "sources", title: "Wallpaper sources" }], text: "Use your own photo." },
  ];
  const synonyms = [["快捷键", "热键"], ["深色模式", "黑色主题"], ["没反应", "没有反应", "失灵"], ["我的最爱", "书签"]];
  const first = (query) => searchIndex(index, query, { synonyms })[0]?.url;
  assert.deepEqual(getExactTerms("怎么改快捷键", synonyms), ["改快捷键"]);
  assert.deepEqual(getExactTerms("我的最爱", synonyms), ["我的最爱"]);
  assert.equal(first("怎么改热键"), "/help/keyboard-shortcuts/#change");
  assert.equal(first("快捷键冲突"), "/help/keyboard-shortcuts/#change");
  assert.equal(first("快捷键失灵了"), "/help/keyboard-shortcuts/#defaults");
  assert.equal(first("怎么设置黑色主题"), "/help/newtab-wallpaper/#dark-mode");
  assert.match(first("wallpapper"), /^\/en\/help\/newtab-wallpaper\//);
  const pins = [{ title: "Pinned tabs", href: "/en/help/pins/", sections: [{ id: "intro", title: "About" }, { id: "pin", title: "Pin a tab" }], text: "" }];
  assert.equal(searchIndex(pins, "pinning")[0].url, "/en/help/pins/#pin");
  assert.equal(first("wallpapers sources"), "/en/help/newtab-wallpaper/#sources");
  assert.deepEqual(searchIndex(index, "壁纸来源都有哪些", { synonyms }).map((item) => [item.url, item.recommended]), [["/help/newtab-wallpaper/#sources", true]]);
  assert.deepEqual(searchIndex(index, "天气预报", { synonyms }), []);
});

test("keys are written once, in Mac form, and each reader sees their own platform's keys", () => {
  const article = readSource("src/components/guides/GuideArticle.astro");
  assert.match(article, /<span data-key-mac>\$\{escapeHtml\(key\)\}<\/span><span data-key-other>/);
  assert.match(article, /"⌘": "Ctrl"[\s\S]*?"⌥": "Alt"[\s\S]*?"⇧": "Shift"[\s\S]*?"↩": "Enter"/);
  assert.match(readSource("src/layouts/SitePage.astro"), /setAttribute\("data-platform"/);
  for (const slug of slugs) {
    for (const locale of locales) {
      const body = readSource(guideFile(slug, locale));
      // "⌘ ⇧ K (Ctrl + Shift + K on Windows)" would now read the Windows keys twice.
      assert.doesNotMatch(body, /[（(][^（）()\n]*Windows[^（）()\n]*`[^`]+`[^（）()\n]*[）)]|[（(][^（）()\n]*`[^`]+`[^（）()\n]*Windows[^（）()\n]*[）)]/, `${slug} (${locale})`);
    }
  }
  // In every language the shortcuts page covers each place keys work and names the click that does the same.
  for (const locale of locales) {
    const body = readSource(guideFile("keyboard-shortcuts", locale));
    for (const anchor of ["command-bar-keys", "newtab-keys", "switcher-keys", "web-clip-keys"]) {
      assert.match(body, new RegExp(`\\{#${anchor}\\}`), `keyboard-shortcuts (${locale}) #${anchor}`);
    }
    assert.match(body, /`⌘ ↩`/, `keyboard-shortcuts (${locale}) background open`);
  }
});
