import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

// The homepage composes the shared site header (markup and nav styles) and the site base styles.
function readHomeShell() {
  return [
    "src/pages/index.astro",
    "src/components/site/SiteHeader.astro",
    "src/styles/site.css",
  ]
    .map((file) => fs.readFileSync(path.join(workspaceRoot, file), "utf8"))
    .join("\n");
}

test("homepage top bar uses a secondary language icon and install menu", () => {
  const source = readHomeShell();
  const languageMenu = fs.readFileSync(
    path.join(workspaceRoot, "src/components/onboarding/LanguageMenu.tsx"),
    "utf8",
  );

  assert.match(
    source,
    /<header\s+class="top-nav"[\s\S]*?<LanguageMenu[\s\S]*?iconOnly[\s\S]*?<InstallMenu/,
    "the homepage should compose the shared language control and install menu",
  );
  assert.match(
    languageMenu,
    /<SettingsSelect[\s\S]*?triggerMode=\{iconOnly \? "icon" : "default"\}[\s\S]*?menuPlacement=\{placement\}/,
    "the language control should use the shared settings select menu",
  );
  assert.doesNotMatch(source, /\.lang-menu\s*\{/);
  assert.doesNotMatch(source, /\.lang-option\s*\{/);
  assert.doesNotMatch(source, /\.install-menu-menu\s*\{/);
  assert.doesNotMatch(source, /\.install-menu-option\s*\{/);
});

test("homepage install menu keeps the primary trigger and ordered store links", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/components/navigation/InstallMenu.tsx"), "utf8");
  const styles = fs.readFileSync(path.join(workspaceRoot, "src/components/navigation/install-menu.css"), "utf8");

  assert.match(source, /<SettingsSelect[\s\S]*optionRole="menuitem"[\s\S]*triggerVariant="primary"/);
  assert.match(source, /label: chromeLabel[\s\S]*label: edgeLabel/);
  assert.match(source, /label: chromeLabel[\s\S]*labelSuffix: renderOptionDetail\(chromeVersionTag[\s\S]*meta: <SettingsBadge tone="accent">/);
  assert.match(source, /label: edgeLabel[\s\S]*labelSuffix: renderOptionDetail\(edgeVersionTag\)/);
  assert.match(source, /iconClass: "ri-chrome-fill[\s\S]*iconClass: "ri-edge-new-fill/);
  assert.match(source, /analyticsEvent: "open_chrome_web_store"[\s\S]*analyticsEvent: "open_edge_addons"/);
  assert.match(styles, /\.install-menu \.lumno-settings-select-menu\s*\{[\s\S]*?width:\s*min\(312px,\s*calc\(100vw - 48px\)\);[\s\S]*?padding:\s*6px;/);
  assert.match(styles, /\.install-menu \.lumno-settings-select-option\s*\{[\s\S]*?padding:\s*8px 10px 8px 8px;[\s\S]*?font-size:\s*14px;/);
  assert.match(styles, /\.lumno-settings-badge-accent\s*\{[\s\S]*?background:\s*[\s\S]*?linear-gradient[\s\S]*?animation:\s*install-menu-recommendation-shine/);
  assert.doesNotMatch(styles, /\.lumno-settings-badge-accent\s*\{[\s\S]*?border:/);
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation:\s*none;/);
});

test("homepage glass navigation enters after the hero primary CTA has scrolled away", () => {
  const source = readHomeShell();
  const heroInstall = fs.readFileSync(
    path.join(workspaceRoot, "src/components/home/HeroInstallTooltip.tsx"),
    "utf8",
  );

  assert.match(heroInstall, /id = "hero-install-primary"[\s\S]*?id=\{id\}[\s\S]*?variant="primary"/);
  // The homepage hands its hero install button over to the shared bar.
  assert.match(source, /<SiteHeader locale=\{uiLocale\} routeLanguageMap=\{routeLanguageMap\} handoff="#hero-install-primary" \/>/);
  assert.match(source, /keepInstall \? !topNav\.hasAttribute\("data-nav-surface"\) : body\.classList\.contains\("has-nav-install"\)/);
  assert.match(source, /<div class="top-nav-install-slot">[\s\S]*?<InstallMenu/);
  assert.match(
    source,
    /const shouldSurface = !returningToTop && window\.scrollY > 0 && handoff\.getBoundingClientRect\(\)\.bottom <= 0;[\s\S]*?if \(!isSurfaced\(\)\) enterNav\(\);/,
  );
  assert.match(
    source,
    /\.top-nav-install-slot\s*\{[\s\S]*?grid-template-columns:\s*0fr;[\s\S]*?margin-left:\s*calc\(var\(--top-nav-action-gap\) \* -1\);[\s\S]*?overflow:\s*clip;[\s\S]*?border-radius:\s*var\(--home-radius-pill\);[\s\S]*?clip-path:\s*inset\(0 round var\(--home-radius-pill\)\);[\s\S]*?opacity:\s*0;[\s\S]*?visibility:\s*hidden;/,
  );
  assert.match(
    source,
    /\.top-nav\s*\{[^}]*?border-radius:\s*var\(--home-radius-pill\);[^}]*?overflow:\s*clip;/,
    "the navbar pill should clip the primary control while it enters from outside",
  );
  assert.match(
    source,
    /\.top-nav:has\(\.lumno-settings-select\[data-open="true"\]\)\s*\{[^}]*?overflow:\s*visible;/,
    "open navbar menus should escape the entrance mask",
  );
  assert.match(
    source,
    /\.top-nav-install-slot \.top-nav-install\s*\{\s*white-space:\s*nowrap;\s*\}/,
  );
  assert.match(
    source,
    /body\.has-nav-install \.top-nav-install-slot\s*\{[\s\S]*?grid-template-columns:\s*1fr;[\s\S]*?margin-left:\s*0;[\s\S]*?opacity:\s*1;[\s\S]*?visibility:\s*visible;/,
  );
  assert.doesNotMatch(
    source,
    /\.top-nav-install-slot\s*\{[^}]*transition:/,
    "the primary control should not animate independently of the floating navigation",
  );
});

test("homepage navbar text never drops below fourteen pixels", () => {
  const source = readHomeShell();
  const installMenuStyles = fs.readFileSync(
    path.join(workspaceRoot, "src/components/navigation/install-menu.css"),
    "utf8",
  );

  assert.match(
    source,
    /\.top-nav-ghost-button\s*\{[\s\S]*?font-size:\s*14px;/,
    "desktop navbar links should render at fourteen pixels",
  );
  assert.match(
    source,
    /\.top-nav \.lumno-settings-select-option,\s*\.top-nav-install\s*\{\s*font-size:\s*14px;/,
    "navbar triggers and menu options should render at fourteen pixels",
  );
  assert.match(
    installMenuStyles,
    /\.install-menu-option-detail\s*\{[\s\S]*?font-size:\s*12px;[\s\S]*?\.install-menu \.lumno-settings-badge-accent\s*\{[\s\S]*?font-size:\s*12px;/,
    "store versions and the recommendation pill should sit below the fourteen-pixel store names",
  );
});

test("language menu keeps the shared runtime hooks when hydrated", () => {
  const source = readHomeShell();
  const languageMenu = fs.readFileSync(
    path.join(workspaceRoot, "src/components/onboarding/LanguageMenu.tsx"),
    "utf8",
  );
  const settingsKit = fs.readFileSync(
    path.join(workspaceRoot, "src/components/extension-settings/SettingsKit.tsx"),
    "utf8",
  );
  const runtime = fs.readFileSync(path.join(workspaceRoot, "src/scripts/language-runtime.ts"), "utf8");

  assert.match(source, /<LanguageMenu[\s\S]*?iconOnly/);
  // The header renders without hydrating; the static select runtime takes the hydrated side of the handshake.
  const selectRuntime = fs.readFileSync(path.join(workspaceRoot, "src/scripts/settings-select-runtime.ts"), "utf8");
  assert.match(settingsKit, /data-open-state-event=\{openStateEvent\}/);
  assert.match(selectRuntime, /root\.dataset\.hydrated = "true"/);
  assert.match(languageMenu, /id="language-toggle"/);
  assert.match(languageMenu, /menuId="language-menu"/);
  assert.match(languageMenu, /openStateEvent="lumno:language-menu-state"/);
  assert.match(languageMenu, /i18n:/);
  assert.match(settingsKit, /"data-lang-value": item\.i18n \? item\.value : undefined/);
  assert.match(settingsKit, /aria-controls=\{menuId\}/);
  assert.match(settingsKit, /event\.stopPropagation\(\)/);
  assert.match(settingsKit, /data-hydrated/);
  assert.match(runtime, /languageMenu\?\.setAttribute\("aria-hidden"/);
  assert.match(runtime, /data-hydrated/);
  assert.match(runtime, /lumno:language-menu-state/);
});

test("homepage navbar matches the content width and reveals after the hero intro", () => {
  const source = readHomeShell();

  const homeStyles = fs.readFileSync(path.join(workspaceRoot, "src/styles/home.css"), "utf8");
  assert.match(homeStyles, /--home-section-width:\s*1360px;/, "the homepage should define one shared content width");
  assert.match(homeStyles, /--home-gutter:\s*24px;/, "the homepage should define one desktop gutter");
  assert.match(
    homeStyles,
    /@media \(max-width:\s*760px\)\s*\{\s*:root\s*\{[\s\S]*?--home-gutter:\s*16px;/,
    "the gutter should tighten on phones for every column at once",
  );
  assert.doesNotMatch(source, /--nav-width:|--content-width:/, "the navbar should not keep a separate width token");
  assert.match(
    source,
    /\.top-nav\s*\{[^}]*?width:\s*min\(\s*calc\(100% - var\(--home-gutter\) \* 2 - var\(--removed-body-scroll-bar-size, 0px\)\),\s*var\(--home-section-width\)\s*\);/,
    "the navbar should use the same width token and gutters as the content",
  );
  assert.match(
    source,
    /\.hero-section\s*\{[^}]*?width:\s*var\(--home-column\);/,
    "the hero should sit on the shared content column",
  );
  assert.match(
    source,
    /\.top-nav-actions\s*\{[\s\S]*?--top-nav-action-gap:\s*8px;[\s\S]*?margin-right:\s*-1px;/,
    "the desktop install control should keep a right outer gap equal to its vertical gap",
  );
  assert.match(
    source,
    /body:not\(\.has-nav-install\) \.top-nav-actions\s*\{[\s\S]*?margin-right:\s*1px;/,
    "the language control should keep equal right and vertical spacing without the primary control",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.top-nav-actions\s*\{[\s\S]*?--top-nav-action-gap:\s*6px;[\s\S]*?margin-right:\s*2px;[\s\S]*?body:not\(\.has-nav-install\) \.top-nav-actions\s*\{\s*margin-right:\s*4px;/,
    "on mobile the last header button should keep the same right gap as above and below it, with or without the install button",
  );
  assert.match(
    source,
    /@media \(max-width:\s*360px\)[\s\S]*?\.top-nav-actions\s*\{\s*--top-nav-action-gap:\s*4px;\s*gap:\s*4px;\s*\}/,
    "the narrowest screens should tighten the action gap but keep the mobile right gap",
  );
  assert.match(
    source,
    /body\[data-home-intro="pending"\] \.top-nav,[\s\S]*?visibility: hidden;[\s\S]*?body\[data-home-intro="revealing"\] \.top-nav[\s\S]*?transition-delay: 80ms;/,
    "the navbar should stay out of the immersive opening and reveal during the settle transition",
  );
  assert.match(
    source,
    /\.top-nav\s*\{[\s\S]*?contain:\s*layout;/,
    "the fixed navbar should isolate its layout from content below",
  );
  assert.match(
    source,
    /html\s*\{[\s\S]*?overscroll-behavior-y:\s*none;/,
    "the homepage should disable top overscroll bounce so rapid return-to-top does not flash the navbar",
  );
});

test("homepage navbar animates in the community action and opens the community panel", () => {
  const source = readHomeShell();
  const ghostLinks = fs.readFileSync(
    path.join(workspaceRoot, "src/components/navigation/HomeNavGhostLinks.tsx"),
    "utf8",
  );
  const ghostLinkStyles = fs.readFileSync(
    path.join(workspaceRoot, "src/components/navigation/home-nav-ghost-links.css"),
    "utf8",
  );
  const content = fs.readFileSync(path.join(workspaceRoot, "src/lib/home-content.ts"), "utf8");

  // Four entries: community, release notes, the help center and the author's profiles. GitHub lives in the panel and footer.
  assert.match(source, /<HomeNavGhostLinks[\s\S]*releaseHref=\{releaseHref\}[\s\S]*helpHref=\{helpHref\}[\s\S]*communityLabel=\{content\.community\.label\}[\s\S]*communityPanel=\{getCommunityPanel\(locale\)\}/);
  assert.match(source, /<nav class="top-nav-actions"[\s\S]*?<HomeNavGhostLinks[\s\S]*?<LanguageMenu/);
  // No header island hydrates: pages without other islands ship no React.
  assert.doesNotMatch(source.slice(source.indexOf('<header'), source.indexOf('</header>')), /client:/);
  assert.match(source, /enhanceSettingsSelect/);
  assert.match(content, /label: "反馈与功能许愿"/);
  assert.doesNotMatch(content, /navRepository|navContact|footerFeedback|qrcodeTitle|navSupportOpenSource/);
  assert.doesNotMatch(ghostLinks, /repository|Discord/i);
  assert.match(ghostLinks, /value: "community"[\s\S]*analyticsLabel: "home_header_community"[\s\S]*value: "release"[\s\S]*value: "help"[\s\S]*value: "contact"/);
  assert.equal((ghostLinks.match(/<SettingsButton\b/g) || []).length, 2, "the community button and the plain links");
  // Contact: a menu when there are several profiles (Chinese: Xiaohongshu, then X), a direct link to X otherwise.
  assert.match(ghostLinks, /link\.value === "contact" && !link\.href \? \([\s\S]*?className="top-nav-contact-menu"[\s\S]*?triggerVariant="ghost"[\s\S]*?items=\{contactMenuItems\}/);
  assert.match(source, /community\.kind === "group"[\s\S]*?COMMUNITY_LINKS\.xiaohongshuUrl[\s\S]*?\{ value: "author_x", label: "X", href: COMMUNITY_LINKS\.xUrl/);
  assert.match(ghostLinkStyles, /\.top-nav-contact-dropdown\s*\{[\s\S]*?min-width:\s*176px;/);
  assert.match(ghostLinks, /variant="ghost"/);
  assert.match(ghostLinks, /className="top-nav-ghost-button"/);
  assert.match(ghostLinks, /\{link\.label\}\s*<\/SettingsButton>/);
  // The community entry waits for the glass pill; SiteHeader's script reveals every data-nav-primary-only entry.
  assert.match(ghostLinks, /"nav-primary-only": ""/);
  assert.match(source, /document\.body\.classList\.contains\("has-nav-install"\)/);
  assert.match(source, /new MutationObserver\(syncPrimaryNavigation\)/);
  assert.match(source, /import "\.\.\/\.\.\/scripts\/community-panel"/);
  assert.match(ghostLinks, /import \{ communityTriggerAttributes \} from "\.\.\/home\/CommunityPanel"/);
  assert.match(ghostLinks, /"community-return-focus": "#top-nav-more-toggle"/);
  assert.match(ghostLinks, /<SettingsSelect[\s\S]*triggerMode="icon"[\s\S]*triggerIconClass="ri-menu-line"/);
  assert.match(ghostLinks, /menuRole="menu"[\s\S]*optionRole="menuitem"/);
  assert.match(ghostLinks, /showSelected=\{false\}/);
  assert.match(ghostLinks, /className="top-nav-community-slot"[\s\S]*?data-nav-primary-only=""[\s\S]*?data-visible="false"/);
  assert.match(ghostLinkStyles, /\.top-nav-community-slot\s*\{[\s\S]*?grid-template-columns:\s*0fr;[\s\S]*?overflow:\s*clip;[\s\S]*?pointer-events:\s*none;/);
  assert.match(ghostLinkStyles, /\.top-nav-community-slot\[data-visible="true"\]\s*\{[\s\S]*?grid-template-columns:\s*1fr;[\s\S]*?opacity:\s*1;[\s\S]*?visibility:\s*visible;/);
  assert.doesNotMatch(ghostLinkStyles, /\.top-nav-community-slot\s*\{[^}]*transition:/);
  assert.doesNotMatch(ghostLinkStyles, /\.top-nav-community-slot \.top-nav-ghost-button\s*\{/);
  assert.doesNotMatch(ghostLinkStyles, /top-nav-community-popover|top-nav-repository/);

  assert.match(
    source,
    /\.top-nav\s*\{[\s\S]*?left:\s*0;[\s\S]*?right:\s*var\(--removed-body-scroll-bar-size, 0px\);[\s\S]*?width:\s*min\(\s*calc\(100% - var\(--home-gutter\) \* 2 - var\(--removed-body-scroll-bar-size, 0px\)\),\s*var\(--home-section-width\)\s*\);[\s\S]*?margin-inline:\s*auto;[\s\S]*?\.top-nav-ghost-links\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?left:\s*50%;[\s\S]*?transform:\s*translate\(-50%, -50%\);/,
    "desktop ghost links should be centered against the full navbar",
  );
  assert.match(
    source,
    /\.top-nav-more-menu\s*\{[\s\S]*?display:\s*none;[\s\S]*?@media \(max-width:\s*760px\)[\s\S]*?\.top-nav-ghost-links\s*\{[\s\S]*?display:\s*none;[\s\S]*?\.top-nav-more-menu\s*\{[\s\S]*?display:\s*block;/,
    "mobile should replace the centered links with the overflow menu",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.top-nav-more-menu\s*\{[\s\S]*?position:\s*static;[\s\S]*?\.top-nav-more-dropdown[^{]*\{[\s\S]*?left:\s*0;[\s\S]*?right:\s*0;[\s\S]*?width:\s*auto;[\s\S]*?transform-origin:\s*top center;/,
    "the mobile menu should span the navbar and open directly underneath it",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.top-nav \.lang-control,\s*\.top-nav \.lang-select,\s*\.top-nav \.install-menu\s*\{\s*position:\s*static;[\s\S]*?\.top-nav-more-dropdown,\s*\.top-nav \.lang-control \.lumno-settings-select-menu,\s*\.top-nav \.install-menu \.lumno-settings-select-menu\s*\{/,
    "the language and install menus should open as the same full-width sheet as the overflow menu",
  );
  assert.match(source, /\.top-nav-more-dropdown[^{]*\{[^}]*background:\s*var\(--lumno-menu-bg,\s*#fff\);/);
  assert.doesNotMatch(source, /\.top-nav-more-dropdown[^{]*\{[^}]*backdrop-filter:/);
  assert.match(
    source,
    /@media \(min-width:\s*761px\) and \(max-width:\s*900px\)[\s\S]*?body\.has-nav-install \.top-nav-ghost-links\s*\{[\s\S]*?display:\s*none;[\s\S]*?body\.has-nav-install \.top-nav-more-menu\s*\{[\s\S]*?display:\s*block;/,
    "the primary install state should collapse the centered links before they overlap the right actions",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.top-nav-more-option\s*\{[\s\S]*?min-height:\s*50px;[\s\S]*?padding:\s*13px 15px;/,
    "mobile menu rows should expose generous touch targets",
  );

  assert.match(
    source,
    /\.top-nav\s*\{[\s\S]*?border:\s*1px solid transparent;[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none;/,
    "the navbar should be visually clear before it overlaps the title",
  );
  assert.match(
    source,
    /\.top-nav\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?top:\s*18px;[\s\S]*?min-height:\s*58px;[\s\S]*?padding:\s*6px 8px;[\s\S]*?body\.has-nav-install \.top-nav\s*\{[\s\S]*?position:\s*fixed;[\s\S]*?top:\s*6px;[\s\S]*?background:\s*rgba\(255, 255, 255, 0\.84\);[\s\S]*?backdrop-filter:\s*blur\(18px\);[\s\S]*?body\.has-nav-install:not\(\.is-nav-install-settled\) \.top-nav\s*\{[\s\S]*?animation:\s*top-nav-surface-enter 320ms ease-out/,
    "the initial header should scroll away before the fixed glass surface appears",
  );
  assert.match(
    source,
    /@keyframes top-nav-surface-enter\s*\{[\s\S]*?from\s*\{[\s\S]*?transform:\s*translateY\(-24px\);[\s\S]*?filter:\s*blur\(8px\);[\s\S]*?to\s*\{[\s\S]*?transform:\s*translateY\(0\);[\s\S]*?filter:\s*blur\(0\);/,
    "the glass navigation should descend from above while resolving its blur",
  );
  assert.doesNotMatch(source, /top-nav-surface-enter\s*\{[\s\S]*?62%/);
  assert.doesNotMatch(source, /top-nav-surface-enter 320ms cubic-bezier/);
  assert.match(
    source,
    /if \(navExitTimeout\) \{[\s\S]*?window\.clearTimeout\(navExitTimeout\);[\s\S]*?navExitTimeout = 0;[\s\S]*?body\.classList\.remove\("is-nav-install-exiting"\);[\s\S]*?body\.classList\.add\("is-nav-install-settled"\);[\s\S]*?return;/,
    "rapidly returning below the CTA should cancel the exit and preserve the settled floating navigation without replaying entry",
  );
  assert.match(source, /body\.classList\.add\("is-nav-install-exiting"\);[\s\S]*?window\.setTimeout\(finishNavExit, 120\)/);
  assert.match(
    source,
    /const finishNavExit = \(\) => \{[\s\S]*?topNav\.dataset\.navSurface = "hero";[\s\S]*?body\.classList\.remove\("has-nav-install", "is-nav-install-settled"\)/,
    "returning to the hero header should clear the glass surface before removing the fixed-nav state",
  );
  assert.match(
    source,
    /const enterNav = \(\) => \{[\s\S]*?topNav\.removeAttribute\("data-nav-surface"\);[\s\S]*?body\.classList\.add\("has-nav-install"\)/,
    "entering the fixed navigation should restore the glass surface state",
  );
  assert.match(
    source,
    /body\.has-nav-install\.is-nav-install-exiting \.top-nav\s*\{[\s\S]*?animation:\s*top-nav-surface-exit 120ms cubic-bezier\(0\.4, 0, 1, 1\) both;[\s\S]*?@keyframes top-nav-surface-exit\s*\{[\s\S]*?transform:\s*translateY\(-28px\);[\s\S]*?filter:\s*blur\(8px\);/,
    "scrolling back up should quickly ease the fixed navigation out before restoring the hero header",
  );
  assert.match(source, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?body\.has-nav-install \.top-nav\s*\{[\s\S]*?animation:\s*none;/);
  assert.match(
    source,
    /\.top-nav\[data-nav-surface="hero"\]\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none;[\s\S]*?transition:\s*none;/,
    "the restored hero header should not retain glass navigation visuals or transitions",
  );
  assert.doesNotMatch(source, /has-nav-overlap/);
});

test("release page uses the shared site top bar", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/release/index.astro"), "utf8");

  assert.match(source, /<SiteHeader locale=\{uiLocale\} routeLanguageMap=\{routeLanguageMap\} analyticsScope="release" handoff="\.top-banner" keepInstall \/>/);
  assert.match(source, /<body class="has-nav-install is-nav-install-settled"/);
  // The old header, floating language control and QR modal are replaced by the shared bar.
  assert.doesNotMatch(source, /class="header"|class="social-btn|class="lang-control"|id="community-qrcode-modal"/);
  // Content clears the fixed bar.
  assert.match(source, /main \{\s*line-height: normal;\s*padding: calc\(var\(--release-header-offset\) \+ 30px\) 24px 60px;/);
  // Tailwind's preflight arrives with the bar; the notes keep their own bullets and line height.
  assert.match(source, /\.accordion-list \{[\s\S]*?list-style: disc;/);
});

test("mobile release banner cannot expand wider than the viewport", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/release/index.astro"), "utf8");

  assert.match(
    source,
    /\.top-banner\s*\{[^}]*width:\s*100%;[^}]*max-width:\s*100%;/,
    "release banner should have an explicit content-width constraint",
  );

  assert.match(
    source,
    /@media \(max-width:\s*767px\)\s*\{[\s\S]*?\.top-banner\s*\{[^}]*min-height:\s*0;/,
    "release mobile banner should not let min-height and aspect-ratio force a wider box",
  );
});

test("community entries lead Chinese readers to the WeChat group and everyone else to GitHub and X", () => {
  const panel = fs.readFileSync(path.join(workspaceRoot, "src/lib/community-panel.ts"), "utf8");
  const content = fs.readFileSync(path.join(workspaceRoot, "src/lib/home-content.ts"), "utf8");
  // Chinese: the group QR, then the author's Xiaohongshu before X, then a quiet GitHub issue link.
  assert.match(panel, /if \(community\.kind === "group"\)[\s\S]*?qr: \{ src: COMMUNITY_LINKS\.wechatQrImagePath[\s\S]*?icon: "xiaohongshu"[\s\S]*?icon: "x"[\s\S]*?note: \{ label: community\.issueNote, href: GITHUB_ISSUE_URL/);
  // Everyone else: GitHub, then X. No Discord on the site.
  assert.match(panel, /icon: "github"[\s\S]*?icon: "x"/);
  assert.equal((content.match(/kind: "group",/g) || []).length, 2, "zh-CN and zh-TW");
  assert.equal((content.match(/kind: "open",/g) || []).length, 8);
  assert.doesNotMatch(content, /Discord/);
  // The extension keeps its own channel list until it moves to the same model.
  const payload = fs.readFileSync(path.join(workspaceRoot, "src/pages/community-links.json.ts"), "utf8");
  assert.match(payload, /SUPPORTED_UI_LANGUAGES\.map\(\(locale\) => \[locale, getCommunityChannel\(locale\)\]\)/);
});

test("bar links to the open page glide back to the top, and the bar morphs between pages", () => {
  const header = fs.readFileSync(path.join(workspaceRoot, "src/components/site/SiteHeader.astro"), "utf8");
  // Same page: no reload; the pill retracts and the page glides up from at most a screen down.
  assert.match(header, /if \(!link \|\| link\.target === "_blank" \|\| !samePath\(link\.href\)\) return;[\s\S]*?event\.preventDefault\(\);[\s\S]*?returnToTop\(\);/);
  assert.match(header, /returningToTop = true;\s*if \(isSurfaced\(\) && !body\.classList\.contains\("is-nav-install-exiting"\)\) exitNav\(\);/);
  assert.match(header, /window\.scrollTo\(\{ top: window\.innerHeight, behavior: "instant" \}\)[\s\S]*?window\.scrollTo\(\{ top: 0, behavior: "smooth" \}\)/);
  assert.match(header, /const shouldSurface = !returningToTop && window\.scrollY > 0/);
  // Across pages: the page swaps at once and only the bar morphs.
  assert.match(header, /@view-transition \{\s*navigation: auto;\s*\}[\s\S]*?\.top-nav \{\s*view-transition-name: site-nav;/);
  assert.match(header, /::view-transition-old\(root\),\s*::view-transition-new\(root\) \{\s*animation: none;/);
  assert.match(header, /@media \(prefers-reduced-motion: reduce\) \{\s*@view-transition \{\s*navigation: none;/);
});


test("opening a dialog never shifts the page, release notes included", () => {
  // The release page doesn't load site.css, so it repeats the rule that cancels the dialog's scrollbar compensation.
  for (const file of ["src/styles/site.css", "src/pages/release/index.astro"]) {
    const source = fs.readFileSync(path.join(workspaceRoot, file), "utf8");
    assert.match(source, /html body\[data-scroll-locked\] \{\s*--removed-body-scroll-bar-size: 0px !important;\s*margin-right: 0 !important;/, file);
  }
});

test("the homepage's release popover shows where the release stands in each store", () => {
  const popover = fs.readFileSync(path.join(workspaceRoot, "src/components/home/ReleasePopover.astro"), "utf8");
  const release = fs.readFileSync(path.join(workspaceRoot, "src/pages/release/index.astro"), "utf8");
  // One status rule and one set of labels for both places.
  for (const source of [popover, release]) {
    assert.match(source, /import \{ FIREFOX_FIRST_RELEASE, STORE_STATUS_LABELS, getStoreStatus \} from "\.\.\/\.\.\/lib\/store-status";/);
  }
  assert.doesNotMatch(release, /function getStoreStatus|function compareVersion/);
  assert.match(popover, /class="release-popover-stores"[\s\S]*?store\.status === "published"[\s\S]*?storeLabels\.published[\s\S]*?storeLabels\.reviewing/);
});
