import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("homepage places the onboarding browser skeleton directly below the hero copy", () => {
  const source = readSource("src/pages/index.astro");

  assert.match(
    source,
    /<div class="hero-copy">[\s\S]*?<p>\{content\.heroDescription\}<\/p>[\s\S]*?<div class="hero-actions">[\s\S]*?class="hero-open-source-note"[\s\S]*?<\/div>\s*<HeroSafariDemo/,
  );
  assert.match(source, /ariaLabel=\{content\.heroDemoAria\}/);
  assert.match(source, /locale=\{uiLocale\}/);
  assert.match(source, /client:load/);
});

test("homepage hero exposes install and community actions below the subtitle", () => {
  const source = readSource("src/pages/index.astro");
  const installTooltip = readSource("src/components/home/HeroInstallTooltip.tsx");
  const communityDialog = readSource("src/components/home/CommunityQrDialog.tsx");
  const content = readSource("src/lib/home-content.ts");

  assert.match(
    source,
    /<p>\{content\.heroDescription\}<\/p>[\s\S]*?<div class="hero-actions">[\s\S]*?content\.heroInstallLabel[\s\S]*?content\.heroCommunityLabel/,
  );
  assert.match(source, /<HeroInstallTooltip[\s\S]*?href=\{CHROME_STORE_URL\}[\s\S]*?client:load/);
  assert.match(installTooltip, /<TooltipTrigger asChild>[\s\S]*?<SettingsButton[\s\S]*?variant="primary"/);
  assert.match(source, /<CommunityQrDialog[\s\S]*?triggerLabel=\{content\.heroCommunityLabel\}[\s\S]*?triggerVariant="hero"[\s\S]*?client:load/);
  assert.match(communityDialog, /<SettingsButton[\s\S]*?variant="secondary"/);
  assert.match(installTooltip, /className="hero-install-butterfly"[\s\S]*?src="\/assets\/lumno-selection-mark\.png"[\s\S]*?alt=""/);
  assert.doesNotMatch(installTooltip, /iconClass=|ri-arrow-right-up-line/);
  assert.doesNotMatch(communityDialog, /iconClass=|ri-feedback-line/);
  assert.match(installTooltip, /href=\{href\}[\s\S]*?data-analytics-label="home_hero_install"/);
  assert.match(communityDialog, /data-analytics-event="open_community_qrcode"[\s\S]*?data-analytics-label="home_hero_community"/);
  assert.match(communityDialog, /hero-community-button/);
  assert.match(source, /\.hero-actions-button \{[\s\S]*?padding: 8px 16px;[\s\S]*?font-size: 14px;/);
  assert.match(source, /\.hero-actions-button \{[\s\S]*?padding: 7px 14px;[\s\S]*?font-size: 13px;/);
  assert.match(content, /heroInstallLabel: "通过 Chrome 商店安装"/);
  assert.match(content, /heroCommunityLabel: "反馈 and 功能许愿"/);
  assert.match(content, /heroCommunityAria: "打开 Lumno 反馈与功能许愿二维码"/);
  assert.doesNotMatch(content, /heroReviewLabel|heroReviewAria/);
});

test("homepage community CTA opens an accessible QR-code dialog", () => {
  const source = readSource("src/pages/index.astro");
  const communityDialog = readSource("src/components/home/CommunityQrDialog.tsx");
  const dialog = readSource("src/components/ui/dialog.tsx");

  assert.match(source, /import "\.\.\/styles\/globals\.css"/);
  assert.match(communityDialog, /<Dialog>[\s\S]*?<DialogTrigger asChild>[\s\S]*?<DialogContent/);
  assert.match(communityDialog, /<DialogTitle>\{title\}<\/DialogTitle>/);
  assert.match(communityDialog, /closeLabel=\{closeLabel\}/);
  assert.match(communityDialog, /width="866"[\s\S]*?height="1280"/);
  assert.match(dialog, /data-open:animate-in[\s\S]*?data-open:zoom-in-95/);
  assert.match(dialog, /data-closed:animate-out[\s\S]*?data-closed:zoom-out-95/);
  assert.match(dialog, /motion-reduce:animate-none/);
  assert.doesNotMatch(source, /id="community-qrcode-modal"|const openModal|qrcode-modal-panel/);
});

test("homepage footer reuses the shared community dialog", () => {
  const source = readSource("src/pages/index.astro");

  assert.match(source, /<CommunityQrDialog[\s\S]*?triggerLabel=\{content\.footerFeedback\}[\s\S]*?triggerVariant="footer"/);
  assert.match(source, /externalHref=\{uiLocale === "zh-CN" \? undefined : COMMUNITY_LINKS\.discordUrl\}/);
});

test("homepage install tooltip communicates broad Chromium browser support", () => {
  const source = readSource("src/pages/index.astro");
  const installTooltip = readSource("src/components/home/HeroInstallTooltip.tsx");
  const installTooltipStyles = readSource("src/components/home/hero-install-tooltip.css");
  const sharedTooltip = readSource("src/components/ui/tooltip.tsx");
  const sharedTooltipStyles = readSource("src/components/ui/tooltip.css");
  const content = readSource("src/lib/home-content.ts");

  assert.match(source, /tooltipLabel=\{content\.heroBrowserTooltipLabel\}/);
  assert.match(installTooltip, /<TooltipProvider delayDuration=\{180\}/);
  assert.match(installTooltip, /<TooltipTrigger asChild>/);
  assert.match(installTooltip, /side="bottom"[\s\S]*?align="start"/);
  assert.match(installTooltip, /name: "Chrome"/);
  assert.match(installTooltip, /name: "Edge"/);
  assert.match(installTooltip, /name: "Perplexity Comet"/);
  assert.match(installTooltip, /name: "Dia"/);
  assert.match(installTooltip, /name: "Brave"/);
  assert.match(installTooltip, /name: "Opera"/);
  assert.doesNotMatch(installTooltip, /name: "Helium"/);
  assert.match(installTooltip, /className="hero-browser-tooltip-more"[\s\S]*?…/);
  assert.match(installTooltip, /assets\/browser-logos\/chrome\.webp/);
  assert.match(installTooltip, /assets\/browser-logos\/dia\.webp/);
  assert.match(
    installTooltipStyles,
    /\.hero-browser-tooltip-logo img\s*\{[\s\S]*?border-radius:\s*6px/,
  );
  assert.doesNotMatch(installTooltip, /className="hero-browser-tooltip"/);
  assert.doesNotMatch(installTooltipStyles, /\.hero-browser-tooltip\s*\{/);
  assert.doesNotMatch(installTooltipStyles, /background:\s*#fff|box-shadow:/);
  assert.match(sharedTooltip, /className=\{cn\(\s*"lumno-tooltip-content"/);
  assert.doesNotMatch(sharedTooltip, /bg-foreground|text-background|TooltipPrimitive\.Arrow/);
  assert.match(sharedTooltipStyles, /--lumno-tooltip-bg-top:\s*#ffffff/);
  assert.match(sharedTooltipStyles, /--lumno-tooltip-bg-bottom:\s*#f7f9fc/);
  assert.match(sharedTooltipStyles, /--lumno-tooltip-text:\s*#556070/);
  assert.match(sharedTooltipStyles, /border-radius:\s*10px/);
  assert.match(sharedTooltipStyles, /0 16px 36px rgba\(17, 24, 39, 0\.08\)/);
  assert.doesNotMatch(installTooltip, /function (Chrome|Edge|Comet|Brave|Opera|Helium)Logo/);
  assert.match(content, /支持所有 Chromium 内核浏览器/);
  assert.match(content, /支援所有 Chromium 核心瀏覽器/);
  assert.match(content, /Works with all Chromium-based browsers/);
});

test("homepage hero underlines GPL-3.0 as the new-tab license link", () => {
  const source = readSource("src/pages/index.astro");
  const content = readSource("src/lib/home-content.ts");

  assert.match(source, /const GITHUB_LICENSE_URL = `\$\{GITHUB_URL\}\/blob\/main\/LICENSE`/);
  assert.match(
    source,
    /<div class="hero-actions">[\s\S]*?<\/div>\s*<p class="hero-open-source-note">/,
  );
  assert.match(
    source,
    /<a[\s\S]*?class="hero-license-link"[\s\S]*?href=\{GITHUB_LICENSE_URL\}[\s\S]*?target="_blank"[\s\S]*?rel="noreferrer noopener"/,
  );
  assert.match(source, /aria-label=\{content\.heroLicenseAria\}/);
  assert.match(source, /data-analytics-event="open_github_license"/);
  assert.match(source, /\.hero-license-link \{[\s\S]*?text-decoration:\s*underline;/);
  assert.match(content, /heroOpenSourceNote: "基于 GPL-3\.0 开源"/);
  assert.match(content, /heroLicenseLabel: "GPL-3\.0"/);
  assert.doesNotMatch(content, /隐私边界透明|隱私界線透明|transparent privacy boundaries/);
});

test("hero demo restores the dithered background behind the search overlay", () => {
  const component = readSource("src/components/home/HeroSafariDemo.tsx");
  const styles = readSource("src/components/home/hero-safari-demo.css");

  assert.match(component, /BookmarkFocusDemo key=\{animationKey\} model=\{model\}/);
  assert.doesNotMatch(component, /components\/ui\/safari|<Safari/);
  assert.match(component, /<DitherShader/);
  assert.match(component, /src="\/assets\/settings-bg-light-monet-newtab\.webp"/);
  assert.match(styles, /\.hero-safari-dither/);
  assert.doesNotMatch(component, /BrowserWindow|browser-window/);
  assert.doesNotMatch(styles, /browser-window|browser-bar|browser-address/);
  assert.match(styles, /background: url\("\/assets\/settings-bg-light-monet-newtab\.webp"\)/);
});

test("dither rendering is throttled and paints a single low-resolution buffer", () => {
  const dither = readSource("src/components/home/DitherShader.tsx");
  const styles = readSource("src/components/home/hero-safari-demo.css");

  assert.match(dither, /RESIZE_RENDER_DELAY_MS = 90/);
  assert.match(dither, /ResizeObserver/);
  assert.match(dither, /requestAnimationFrame\(flushRender\)/);
  assert.match(dither, /context\.putImageData\(outputData, 0, 0\)/);
  assert.doesNotMatch(dither, /setDimensions|fillRect\(/);
  assert.match(styles, /image-rendering: pixelated/);
});

test("hero demo keeps the background free of browser chrome and page blocks", () => {
  const component = readSource(
    "src/components/home/onboarding-source/bookmark-focus-demo.tsx",
  );
  const styles = readSource("src/components/home/hero-safari-demo.css");
  assert.doesNotMatch(component, /BrowserWindow|BrowserBar|SurfaceRail|browser-page-skeleton|browser-page-row/);
  assert.doesNotMatch(styles, /browser-window|browser-bar|browser-page-skeleton|browser-page-row|browser-page-hero-media/);
  assert.match(component, /<OverlayPanel activeIndex=\{activeIndex\} model=\{model\} \/>/);
});

test("hero demo exposes three replayable plugin-consistent search scenes", () => {
  const component = readSource("src/components/home/HeroSafariDemo.tsx");
  const onboardingComponent = readSource(
    "src/components/home/onboarding-source/bookmark-focus-demo.tsx",
  );
  const siteSearchComponent = readSource(
    "src/components/home/onboarding-source/site-search-demo.tsx",
  );
  const styles = readSource("src/components/home/hero-safari-demo.css");
  const switcherStyles =
    styles.match(/\.hero-demo-page-switcher \{[\s\S]*?\n\}/)?.[0] || "";
  const providerSource = readSource("src/lib/lumno-search-providers.ts");
  const homepage = readSource("src/pages/index.astro");

  assert.match(component, /BookmarkFocusDemo key=\{animationKey\} model=\{model\}/);
  assert.match(component, /SiteSearchDemoSurface model=\{siteSearchDemoModel\}/);
  assert.match(component, /id: "browser-search"/);
  assert.match(component, /id: "site-search"/);
  assert.match(component, /id: "commands"/);
  assert.match(component, /label: "搜全部"/);
  assert.match(component, /label: "搜站内"/);
  assert.match(component, /label: "搜站內"/);
  assert.match(component, /label: "下指令"/);
  assert.match(component, /label: "Search All"/);
  assert.match(component, /label: "Search Sites"/);
  assert.match(component, /label: "Run Commands"/);
  assert.match(component, /label: "打指令"/);
  assert.match(component, /query: "lumno"/);
  assert.match(component, /triggerQuery: "github"/);
  assert.match(component, /promptQuery: "lumno extension"/);
  assert.match(component, /scopeMenu: createScopeMenu/);
  assert.match(component, /active: provider\.key === "gh"/);
  assert.match(component, /id: `provider:\$\{provider\.key\}`/);
  assert.match(component, /providerItems\.filter\(isSearchEngine\)/);
  assert.match(component, /providerItems\.filter\(isAiProvider\)/);
  assert.match(providerSource, /assets\/data\/site-search\.json/);
  assert.match(providerSource, /assets\/images\/site-search/);
  assert.match(homepage, /await getLumnoBuiltinSiteSearchProviders\(\)/);
  assert.match(homepage, /builtinSiteSearchProviders=\{builtinSiteSearchProviders\}/);
  assert.match(component, /type: "commandOpenTabs"/);
  assert.match(component, /sourceTagKind: "open-tab"/);
  assert.match(component, /actionTagLabel: "切换"/);
  assert.doesNotMatch(component, /setInterval/);
  assert.match(component, /hero-demo-page-switcher/);
  assert.match(component, /aria-pressed=\{index === sceneIndex\}/);
  assert.match(component, /setReplayKey\(\(currentKey\) => currentKey \+ 1\)/);
  assert.match(component, /HERO_INTRO_SEQUENCE = \[/);
  assert.match(component, /\{ id: "site-search", durationMs: 7_200 \}/);
  assert.match(component, /\{ id: "commands", durationMs: 5_200 \}/);
  assert.match(component, /\{ id: "browser-search", durationMs: 6_200 \}/);
  assert.match(component, /setIsAutoPlaying\(false\)/);
  assert.match(component, /data-auto-playing=\{isAutoPlaying \? "true" : "false"\}/);
  assert.match(component, /AnimatePresence custom=\{sceneDirection\} mode="wait"/);
  assert.match(component, /exit=\{reducedMotion \? undefined : "exit"\}/);
  assert.match(component, /filter: "blur\(7px\)"/);
  assert.match(component, /duration: 0\.2/);
  assert.match(component, /duration: 0\.32/);
  assert.match(component, /highlightBg: "rgb\(236, 236, 237\)"/);
  assert.match(component, /highlightBg: "rgb\(223, 238, 249\)"/);
  assert.match(component, /highlightBg: "rgb\(228, 237, 250\)"/);
  assert.equal((component.match(/theme: LUMNO_THEME/g) || []).length, 6);
  assert.equal((component.match(/theme: CHROME_THEME/g) || []).length, 3);
  assert.match(styles, /--x-ov-hover-bg: rgba\(200, 208, 218, 0\.45\);/);
  assert.match(component, /brandAccentRgb: \[36, 41, 46\]/);
  assert.match(component, /accentRgb: \[156, 159, 161\]/);
  assert.match(component, /hoverLeadMs: isBrowserSearch \? 1040 : 0/);
  assert.match(component, /hoverStartMs: 3200/);
  assert.match(component, /hoverStepMs: isBrowserSearch \? 1600 : 0/);
  assert.match(component, /hoverWrapStepMs: isBrowserSearch \? 1600 : 0/);
  assert.match(component, /data-cursor-mode=\{[\s\S]*?isSiteSearch \? "site-search"/);
  assert.match(
    component,
    /_x_extension_onboarding_overlay_demo_2026_unique_/,
  );
  assert.match(onboardingComponent, /const stepMs = 1040 \/ Math\.max/);
  assert.match(onboardingComponent, /data-row-state=\{active \? 'active' : undefined\}/);
  assert.match(onboardingComponent, /x-ov-action-tag__key/);
  assert.match(onboardingComponent, /if \(model\.hoverStepMs <= 0\)/);
  assert.match(onboardingComponent, /model\.sceneId/);
  assert.match(onboardingComponent, /theme\?\.highlightBg \|\| 'var\(--x-ov-hover-bg, #f3f4f6\)'/);
  assert.match(siteSearchComponent, /x-lumno-search-input-mode__menu _x_extension_menu_surface_2024_unique_/);
  assert.match(siteSearchComponent, /role="menuitemradio"/);
  assert.match(siteSearchComponent, /aria-checked=\{item\.active \? 'true' : 'false'\}/);
  assert.match(siteSearchComponent, /data-mode-menu-open="true"/);
  assert.match(siteSearchComponent, /content\.scrollTop = maxScroll \* scrollProgress/);
  assert.match(siteSearchComponent, /window\.requestAnimationFrame\(animateScroll\)/);
  assert.match(styles, /onboarding-overlay-input-shell-expand 980ms/);
  assert.match(styles, /onboarding-overlay-results-reveal 980ms/);
  assert.match(styles, /onboarding-cursor-type 2600ms/);
  assert.match(styles, /onboarding-cursor-hover-loop 9600ms/);
  assert.match(styles, /site-search-demo-tab-hint-cycle 1120ms/);
  assert.match(styles, /site-search-demo-mode-prefix[\s\S]*?height: 32px;/);
  assert.match(styles, /site-search-demo-mode-prefix[\s\S]*?border-radius: 10px;/);
  assert.match(styles, /site-search-demo-mode-prefix[\s\S]*?background: rgba\(var\(--site-search-demo-brand-accent-rgb/);
  assert.match(styles, /site-search-demo-mode-prefix__chevron[\s\S]*?margin-left: 4px;/);
  assert.match(styles, /site-search-demo-mode-prefix__icon[\s\S]*?width: 15px;[\s\S]*?height: 15px;/);
  assert.match(styles, /--site-search-demo-mode-padding: 176px;/);
  assert.match(styles, /site-search-demo-prefix-press 320ms/);
  assert.match(styles, /site-search-demo-scope-menu-open 420ms/);
  assert.match(styles, /height: min\(220px, 36vh\);/);
  assert.match(styles, /onboarding-cursor-site-search-open 6600ms/);
  assert.match(styles, /\.site-search-demo-stack \{[\s\S]*?top: 18%;/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.lumno-overlay-panel \{[\s\S]*?top: 7%;[\s\S]*?\.site-search-demo-stack \{[\s\S]*?top: 7%;/);
  assert.match(component, /data-scene-direction=\{sceneDirection\}/);
  assert.match(component, /hero-demo-page-indicator/);
  assert.match(component, /x: direction === "forward" \? 42 : -42/);
  assert.match(styles, /transform: translate3d\(calc\(var\(--hero-demo-scene-index, 0\) \* 100%\)/);
  assert.match(styles, /var\(--green-soft, #e9f2e8\) 68%/);
  assert.match(styles, /background: #fffdf8;/);
  assert.doesNotMatch(switcherStyles, /backdrop-filter/);
  assert.match(styles, /hero-demo-page-button:focus-visible/);
  assert.match(homepage, /height: clamp\(300px, calc\(100svh - 470px\), 620px\);/);
  assert.match(homepage, /height: clamp\(220px, calc\(100svh - 530px\), 440px\);/);
  assert.match(
    styles,
    /@media \(max-width: 760px\)[\s\S]*?\.hero-demo-page-switcher \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);[\s\S]*?transform: none;/,
  );
  assert.match(styles, /\.hero-demo-page-button \{[\s\S]*?min-height: 44px;/);
  assert.match(
    styles,
    /\.lumno-overlay-result\[data-active="true"\][\s\S]*?box-shadow: none;/,
  );
  assert.match(
    styles,
    /\.site-search-demo-result\[data-active="true"\][\s\S]*?box-shadow: none;/,
  );
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});
