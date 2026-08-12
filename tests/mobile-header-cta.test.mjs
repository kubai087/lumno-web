import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

const headerPages = [["onboarding", "src/pages/onboarding/index.astro", 36]];

test("mobile header feedback CTA matches the icon-only buttons", () => {
  for (const [label, file, size] of headerPages) {
    const source = fs.readFileSync(path.join(workspaceRoot, file), "utf8");

    assert.match(
      source,
      new RegExp(
        String.raw`\.actions \.pill-btn\s*\{[\s\S]*?width:\s*${size}px;[\s\S]*?min-width:\s*${size}px;[\s\S]*?max-width:\s*${size}px;[\s\S]*?height:\s*${size}px;[\s\S]*?flex:\s*0 0 ${size}px;[\s\S]*?padding:\s*0;[\s\S]*?gap:\s*0;`,
      ),
      `${label} mobile header buttons should share fixed icon-only sizing`,
    );

    assert.match(
      source,
      /\.actions \.pill-btn span\s*\{[\s\S]*?display:\s*none;/,
      `${label} mobile header button labels should be hidden`,
    );

    assert.doesNotMatch(
      source,
      /\.actions \.pill-btn\.pill-btn-dark\s*\{[\s\S]*?(width:\s*auto|aspect-ratio:\s*auto|padding:\s*0 12px)/,
      `${label} mobile feedback CTA should not override the icon-only sizing`,
    );

    assert.doesNotMatch(
      source,
      /\.actions \.pill-btn\.pill-btn-dark span\s*\{[\s\S]*?display:\s*inline-block;/,
      `${label} mobile feedback CTA should not restore its text label`,
    );
  }
});

test("homepage top bar uses a secondary language icon and install menu", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");
  const languageMenu = fs.readFileSync(
    path.join(workspaceRoot, "src/components/onboarding/LanguageMenu.tsx"),
    "utf8",
  );

  assert.match(
    source,
    /<header class="top-nav">[\s\S]*?<LanguageMenu[\s\S]*?iconOnly[\s\S]*?<InstallMenu[\s\S]*?client:load/,
    "the homepage should compose the shared language control and hydrated install menu",
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
  assert.match(source, /label: chromeLabel[\s\S]*labelSuffix: chromeVersionTag[\s\S]*meta: <SettingsBadge tone="accent">/);
  assert.match(source, /label: edgeLabel[\s\S]*labelSuffix: edgeVersionTag/);
  assert.match(source, /iconClass: "ri-chrome-fill[\s\S]*iconClass: "ri-edge-new-fill/);
  assert.match(source, /analyticsEvent: "open_chrome_web_store"[\s\S]*analyticsEvent: "open_edge_addons"/);
  assert.match(styles, /\.install-menu \.lumno-settings-select-menu\s*\{[\s\S]*?width:\s*min\(360px,\s*calc\(100vw - 48px\)\);[\s\S]*?padding:\s*6px;/);
  assert.match(styles, /\.install-menu \.lumno-settings-select-option\s*\{[\s\S]*?min-height:\s*42px;[\s\S]*?padding:\s*8px 10px;[\s\S]*?font-size:\s*14px;/);
  assert.match(styles, /\.lumno-settings-badge-accent\s*\{[\s\S]*?background:\s*[\s\S]*?linear-gradient[\s\S]*?animation:\s*install-menu-recommendation-shine/);
  assert.doesNotMatch(styles, /\.lumno-settings-badge-accent\s*\{[\s\S]*?border:/);
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation:\s*none;/);
});

test("homepage nav install appears only after the hero primary CTA has passed", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");
  const heroInstall = fs.readFileSync(
    path.join(workspaceRoot, "src/components/home/HeroInstallTooltip.tsx"),
    "utf8",
  );

  assert.match(heroInstall, /id="hero-install-primary"[\s\S]*?variant="primary"/);
  assert.match(source, /<div class="top-nav-install-slot">[\s\S]*?<InstallMenu/);
  assert.match(
    source,
    /const hasNavOverlap = window\.scrollY > 0 && titleTop < navBottom - 1;[\s\S]*?"has-nav-overlap", hasNavOverlap[\s\S]*?"has-nav-install",[\s\S]*?hasNavOverlap && heroInstallBottom <= navBottom/,
  );
  assert.match(
    source,
    /\.top-nav-install-slot\s*\{[\s\S]*?grid-template-columns:\s*0fr;[\s\S]*?margin-left:\s*calc\(var\(--top-nav-action-gap\) \* -1\);[\s\S]*?overflow:\s*clip;[\s\S]*?border-radius:\s*999px;[\s\S]*?clip-path:\s*inset\(0 round 999px\);[\s\S]*?opacity:\s*0;[\s\S]*?visibility:\s*hidden;[\s\S]*?transition:[\s\S]*?margin-left 240ms/,
  );
  assert.match(
    source,
    /\.top-nav\s*\{[^}]*?border-radius:\s*999px;[^}]*?overflow:\s*clip;/,
    "the navbar pill should clip the primary control while it enters from outside",
  );
  assert.match(
    source,
    /\.top-nav:has\(\.lumno-settings-select\[data-open="true"\]\)\s*\{[^}]*?overflow:\s*visible;/,
    "open navbar menus should escape the entrance mask",
  );
  assert.match(
    source,
    /\.top-nav-install-slot \.top-nav-install\s*\{[\s\S]*?opacity:\s*0;[\s\S]*?translate:\s*calc\(100% \+ 8px\) 0;[\s\S]*?transition:/,
  );
  assert.match(
    source,
    /body\.has-nav-install \.top-nav-install-slot\s*\{[\s\S]*?grid-template-columns:\s*1fr;[\s\S]*?margin-left:\s*0;[\s\S]*?opacity:\s*1;[\s\S]*?visibility:\s*visible;/,
  );
  assert.match(
    source,
    /body\.has-nav-install \.top-nav-install-slot \.top-nav-install\s*\{[\s\S]*?translate:\s*0 0;/,
  );
  assert.doesNotMatch(
    source,
    /\.top-nav-install-slot\s*\{[^}]*transform:\s*translateY/,
    "the nav install control should enter horizontally without vertical motion",
  );
});

test("homepage navbar text never drops below fourteen pixels", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");
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
    /\.install-menu \.lumno-settings-badge\s*\{[\s\S]*?font-size:\s*12px;[\s\S]*?\.install-menu \.lumno-settings-badge-accent\s*\{[\s\S]*?font-size:\s*14px;/,
    "store versions should be smaller while the recommendation remains fourteen pixels",
  );
});

test("language menu keeps the shared runtime hooks when hydrated", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");
  const languageMenu = fs.readFileSync(
    path.join(workspaceRoot, "src/components/onboarding/LanguageMenu.tsx"),
    "utf8",
  );
  const settingsKit = fs.readFileSync(
    path.join(workspaceRoot, "src/components/extension-settings/SettingsKit.tsx"),
    "utf8",
  );
  const runtime = fs.readFileSync(path.join(workspaceRoot, "src/scripts/language-runtime.ts"), "utf8");

  assert.match(source, /<LanguageMenu[\s\S]*?iconOnly[\s\S]*?client:load/);
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
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");

  assert.match(source, /--content-width:\s*1360px;/, "the homepage should define one shared content width");
  assert.doesNotMatch(source, /--nav-width:/, "the navbar should not keep a separate width token");
  assert.match(
    source,
    /\.top-nav\s*\{[\s\S]*?width:\s*min\(calc\(100% - 48px\),\s*var\(--content-width\)\);/,
    "the navbar should use the same width token and desktop gutters as the content",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.top-nav\s*\{[\s\S]*?width:\s*min\(calc\(100% - 32px\),\s*var\(--content-width\)\);/,
    "the navbar should keep the same mobile gutters as the content",
  );
  assert.match(
    source,
    /\.top-nav-actions\s*\{[\s\S]*?--top-nav-action-gap:\s*8px;[\s\S]*?margin-right:\s*2\.5px;/,
    "the desktop install control should keep a right outer gap equal to its vertical gap",
  );
  assert.match(
    source,
    /body:not\(\.has-nav-install\) \.top-nav-actions\s*\{[\s\S]*?margin-right:\s*1px;/,
    "the language control should keep equal right and vertical spacing without the primary control",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.top-nav-actions\s*\{[\s\S]*?--top-nav-action-gap:\s*6px;[\s\S]*?margin-right:\s*3px;/,
    "the mobile install control should keep the same balanced right outer gap",
  );
  assert.match(
    source,
    /@media \(max-width:\s*360px\)[\s\S]*?\.top-nav-actions\s*\{[\s\S]*?--top-nav-action-gap:\s*4px;[\s\S]*?margin-right:\s*0;/,
    "the hidden primary slot should cancel the narrow-screen action gap too",
  );
  assert.match(
    source,
    /body\[data-home-intro="pending"\] \.top-nav,[\s\S]*?visibility: hidden;[\s\S]*?body\[data-home-intro="revealing"\] \.top-nav[\s\S]*?transition-delay: 120ms;/,
    "the navbar should stay out of the immersive opening and reveal during the settle transition",
  );
  assert.match(
    source,
    /\.top-nav\s*\{[\s\S]*?contain:\s*layout;/,
    "the fixed navbar should isolate its layout from content below",
  );
});

test("homepage navbar animates in the community action and reuses the CTA dialog", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");
  const ghostLinks = fs.readFileSync(
    path.join(workspaceRoot, "src/components/navigation/HomeNavGhostLinks.tsx"),
    "utf8",
  );
  const ghostLinkStyles = fs.readFileSync(
    path.join(workspaceRoot, "src/components/navigation/home-nav-ghost-links.css"),
    "utf8",
  );
  const communityDialog = fs.readFileSync(
    path.join(workspaceRoot, "src/components/home/CommunityQrDialog.tsx"),
    "utf8",
  );
  const content = fs.readFileSync(path.join(workspaceRoot, "src/lib/home-content.ts"), "utf8");

  assert.match(source, /<HomeNavGhostLinks[\s\S]*releaseHref=\{releaseHref\}[\s\S]*repositoryHref=\{GITHUB_URL\}[\s\S]*repositoryIssueHref=\{GITHUB_ISSUE_URL\}[\s\S]*repositoryPullRequestHref=\{GITHUB_PULL_REQUEST_URL\}[\s\S]*contactXHref=\{COMMUNITY_LINKS\.xUrl\}[\s\S]*contactXiaohongshuHref=\{COMMUNITY_LINKS\.xiaohongshuUrl\}[\s\S]*repositoryHomeLabel=\{content\.navRepositoryHome\}[\s\S]*communityLabel=\{content\.navCommunity\}[\s\S]*contactLabel=\{content\.navContact\}[\s\S]*contactMenuLabel=\{content\.navContactMenuAria\}[\s\S]*contactXLabel=\{content\.navContactX\}[\s\S]*contactXiaohongshuLabel=\{content\.navContactXiaohongshu\}[\s\S]*panelTitle=\{content\.qrcodeTitle\}[\s\S]*qrImageSrc=\{COMMUNITY_LINKS\.wechatQrImagePath\}/);
  assert.match(source, /<nav class="top-nav-actions"[\s\S]*?<HomeNavGhostLinks[\s\S]*?client:load[\s\S]*?<LanguageMenu/);
  assert.match(content, /navCommunity: "反馈&功能许愿"/);
  assert.match(content, /navContact: "联系作者"/);
  assert.match(content, /navContactMenuAria: "打开作者主页"/);
  assert.match(content, /navContactX: "X"/);
  assert.match(content, /navContactXiaohongshu: "小红书"/);
  assert.match(content, /navRepositoryMenuAria: "打开代码仓库操作"/);
  assert.match(content, /navRepositoryHome: "访问仓库"/);
  assert.match(content, /navRepositoryIssue: "提 Issue"/);
  assert.match(content, /navRepositoryPullRequest: "提 PR"/);
  assert.match(content, /heroCommunityLabel: "反馈 & 功能许愿"/);
  assert.doesNotMatch(content, /heroCommunityLabel: "[^"]*\band\b/);
  assert.doesNotMatch(content, /navSupportOpenSource/);
  assert.equal((ghostLinks.match(/<SettingsButton\b/g) || []).length, 3, "repository, links, and community actions should keep their dedicated button branches");
  assert.match(ghostLinks, /variant="ghost"/);
  assert.match(ghostLinks, /className="top-nav-ghost-button"/);
  assert.match(ghostLinks, /\{link\.label\}\s*<\/SettingsButton>/);
  assert.match(ghostLinks, /value: "community"[\s\S]*communityAction: "community"[\s\S]*requiresPrimary: true,[\s\S]*value: "release"[\s\S]*value: "repository"[\s\S]*value: "contact"/);
  assert.match(ghostLinks, /className="top-nav-repository-group"[\s\S]*href=\{link\.href!\}[\s\S]*triggerMode="icon"[\s\S]*triggerIconClass="ri-arrow-down-s-line"[\s\S]*items=\{repositoryActionItems\}/);
  assert.match(ghostLinks, /value: "repository-issue"[\s\S]*href: repositoryIssueHref[\s\S]*value: "repository-pull-request"[\s\S]*href: repositoryPullRequestHref/);
  assert.match(ghostLinks, /if \(link\.value === "repository"\) \{[\s\S]*children: mobileRepositoryActionItems,[\s\S]*if \(link\.value === "contact"\) \{[\s\S]*children: contactActionItems,/);
  assert.match(ghostLinks, /value: "repository-home"[\s\S]*label: repositoryHomeLabel[\s\S]*href: repositoryHref/);
  assert.match(ghostLinkStyles, /\.top-nav-repository-toggle\s*\{[\s\S]*?width:\s*28px;[\s\S]*?background:\s*transparent;[\s\S]*?font-size:\s*16px;/);
  assert.match(ghostLinkStyles, /\.top-nav-repository-dropdown\s*\{[\s\S]*?min-width:\s*164px;/);
  assert.match(ghostLinks, /value: "contact-x"[\s\S]*href: contactXHref[\s\S]*value: "contact-xiaohongshu"[\s\S]*href: contactXiaohongshuHref/);
  assert.match(ghostLinks, /className="top-nav-contact-menu"[\s\S]*triggerVariant="ghost"[\s\S]*triggerLabel=\{contactLabel\}[\s\S]*items=\{contactActionItems\}/);
  assert.match(ghostLinkStyles, /\.top-nav-contact-dropdown\s*\{[\s\S]*?min-width:\s*176px;/);
  assert.match(ghostLinkStyles, /\.top-nav-more-option \.lumno-settings-select-option-expand-icon\s*\{[\s\S]*?font-size:\s*18px;[\s\S]*?\.top-nav-more-option\[data-expanded="true"\] \.lumno-settings-select-option-expand-icon\s*\{[\s\S]*?transform:\s*rotate\(90deg\);/);
  assert.match(ghostLinkStyles, /\.top-nav-more-dropdown \.top-nav-more-option\[data-depth="1"\]\s*\{[\s\S]*?padding-left:\s*38px;/);
  assert.match(
    ghostLinkStyles,
    /\.top-nav-repository-group\s*\{[\s\S]*?gap:\s*2px;[\s\S]*?\.top-nav-repository-group > \.top-nav-ghost-button\s*\{[\s\S]*?border-radius:\s*17px 8px 8px 17px;[\s\S]*?\.top-nav-repository-toggle\s*\{[\s\S]*?height:\s*34px;[\s\S]*?border-radius:\s*8px 17px 17px 8px;/,
    "repository link and menu should align as one split control with a narrow seam",
  );
  assert.match(ghostLinks, /const visibleLinks = links\.filter\(\(link\) => !link\.requiresPrimary \|\| showPrimaryNavigation\);/);
  assert.match(ghostLinks, /document\.body\.classList\.contains\("has-nav-install"\)/);
  assert.match(ghostLinks, /new MutationObserver\(updatePrimaryNavigation\)/);
  assert.match(ghostLinks, /import \{ CommunityQrDialogPanel \} from "\.\.\/home\/CommunityQrDialog"/);
  assert.match(ghostLinks, /<Dialog[\s\S]*?open=\{activeCommunityAction === "community"\}[\s\S]*?<DialogTrigger asChild>[\s\S]*?<CommunityQrDialogPanel/);
  assert.match(communityDialog, /export function CommunityQrDialogPanel\([\s\S]*?<DialogContent[\s\S]*?<DialogTitle>\{title\}<\/DialogTitle>/);
  assert.match(ghostLinks, /<SettingsSelect[\s\S]*triggerMode="icon"[\s\S]*triggerIconClass="ri-menu-line"/);
  assert.match(ghostLinks, /menuRole="menu"[\s\S]*optionRole="menuitem"/);
  assert.match(ghostLinks, /showSelected=\{false\}/);
  assert.match(ghostLinks, /className="top-nav-community-slot"[\s\S]*?data-visible=\{showPrimaryNavigation \? "true" : "false"\}/);
  assert.match(ghostLinkStyles, /\.top-nav-community-slot\s*\{[\s\S]*?grid-template-columns:\s*0fr;[\s\S]*?overflow:\s*clip;[\s\S]*?transition:[\s\S]*?grid-template-columns 300ms/);
  assert.match(ghostLinkStyles, /\.top-nav-community-slot\[data-visible="true"\]\s*\{[\s\S]*?grid-template-columns:\s*1fr;[\s\S]*?opacity:\s*1;[\s\S]*?visibility:\s*visible;/);
  assert.match(ghostLinkStyles, /\.top-nav-community-slot \.top-nav-ghost-button\s*\{[\s\S]*?translate:\s*-14px 0;[\s\S]*?\.top-nav-community-slot\[data-visible="true"\] \.top-nav-ghost-button\s*\{[\s\S]*?translate:\s*0 0;/);
  assert.doesNotMatch(ghostLinkStyles, /top-nav-community-popover/);

  assert.match(
    source,
    /\.top-nav\s*\{[\s\S]*?left:\s*0;[\s\S]*?right:\s*var\(--removed-body-scroll-bar-size, 0px\);[\s\S]*?width:\s*min\(calc\(100% - 48px - var\(--removed-body-scroll-bar-size, 0px\)\), var\(--content-width\)\);[\s\S]*?margin-inline:\s*auto;[\s\S]*?\.top-nav-ghost-links\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?left:\s*50%;[\s\S]*?transform:\s*translate\(-50%, -50%\);/,
    "desktop ghost links should be centered against the full navbar",
  );
  assert.match(
    source,
    /\.top-nav-more-menu\s*\{[\s\S]*?display:\s*none;[\s\S]*?@media \(max-width:\s*760px\)[\s\S]*?\.top-nav-ghost-links\s*\{[\s\S]*?display:\s*none;[\s\S]*?\.top-nav-more-menu\s*\{[\s\S]*?display:\s*block;/,
    "mobile should replace the centered links with the overflow menu",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.top-nav-more-menu\s*\{[\s\S]*?position:\s*static;[\s\S]*?\.top-nav-more-dropdown\s*\{[\s\S]*?left:\s*0;[\s\S]*?right:\s*0;[\s\S]*?width:\s*auto;[\s\S]*?transform-origin:\s*top center;/,
    "the mobile menu should span the navbar and open directly underneath it",
  );
  assert.match(source, /\.top-nav-more-dropdown\s*\{[^}]*background:\s*var\(--lumno-menu-bg,\s*#fff\);/);
  assert.doesNotMatch(source, /\.top-nav-more-dropdown\s*\{[^}]*backdrop-filter:/);
  assert.match(
    source,
    /@media \(min-width:\s*761px\) and \(max-width:\s*840px\)[\s\S]*?body\.has-nav-install \.top-nav-ghost-links\s*\{[\s\S]*?display:\s*none;[\s\S]*?body\.has-nav-install \.top-nav-more-menu\s*\{[\s\S]*?display:\s*block;/,
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
    /body\.has-nav-overlap \.top-nav\s*\{[\s\S]*?min-height:\s*58px;[\s\S]*?padding:\s*6px 8px;[\s\S]*?transform:\s*translateY\(-10px\);[\s\S]*?background:\s*rgba\(255, 255, 255, 0\.84\);[\s\S]*?box-shadow:/,
    "the overlap state should add a roomier floating surface and move it closer to the viewport top",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?body\.has-nav-overlap \.top-nav\s*\{[\s\S]*?transform:\s*translateY\(-7px\);/,
    "the mobile overlap state should move closer to the safe-area edge without touching it",
  );
  assert.match(source, /\.top-nav\s*\{[\s\S]*?transition:[\s\S]*?transform 220ms[\s\S]*?background-color 180ms/);
  assert.match(source, /const heroTitle = document\.getElementById\("hero-title"\);/);
  assert.match(source, /window\.scrollY > 0 && titleTop < navBottom - 1/);
  assert.match(source, /classList\.toggle\("has-nav-overlap"/);
});

test("mobile release feedback CTA matches the icon-only social buttons", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/release/index.astro"), "utf8");

  assert.match(
    source,
    /\.social-btn-icon\s*\{[\s\S]*?width:\s*36px;[\s\S]*?min-width:\s*36px;[\s\S]*?padding:\s*0;/,
    "release mobile icon buttons should keep fixed sizing",
  );

  assert.match(
    source,
    /\.social-btn-discord\s*\{[\s\S]*?width:\s*36px;[\s\S]*?min-width:\s*36px;[\s\S]*?max-width:\s*36px;[\s\S]*?padding:\s*0;[\s\S]*?gap:\s*0;/,
    "release mobile feedback CTA should use the same icon-only sizing",
  );

  assert.match(
    source,
    /\.social-btn-discord span\s*\{[\s\S]*?display:\s*none;/,
    "release mobile feedback CTA should hide its text label",
  );
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
