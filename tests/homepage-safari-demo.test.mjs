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
    /<div class="hero-copy">[\s\S]*?<p class="hero-description">[\s\S]*?<CopyLines text=\{content\.heroDescription\} \/>[\s\S]*?<div class="hero-actions">[\s\S]*?<\/div>\s*<\/div>\s*<div class="hero-demo-slot">\s*<HeroSafariDemo/,
  );
  assert.match(source, /ariaLabel=\{content\.heroDemoAria\}/);
  assert.match(source, /locale=\{uiLocale\}/);
  assert.match(source, /client:load/);
});

test("homepage opens with a full-screen Search All demo and can settle early on click or scroll", () => {
  const source = readSource("src/pages/index.astro");
  const component = readSource("src/components/home/HeroSafariDemo.tsx");
  const styles = readSource("src/components/home/hero-safari-demo.css");
  const dither = readSource("src/components/home/DitherShader.tsx");

  assert.match(source, /<body data-home-intro="pending" data-locale=\{uiLocale\} data-script=\{localeScript\}>/);
  assert.match(component, /const HERO_INTRO_SEQUENCE = \[\s*\{ id: "browser-search"/);
  assert.match(component, /copy\.scenes\.findIndex\(\(item\) => item\.id === "browser-search"\)/);
  assert.match(component, /target\.classList\.contains\("lumno-overlay-results"\)/);
  assert.match(component, /event\.animationName !== "onboarding-overlay-results-reveal"/);
  assert.match(component, /onAnimationEndCapture=\{handleDemoAnimationEnd\}/);
  assert.doesNotMatch(component, /onAnimationStartCapture=\{handleDemoAnimationStart\}/);
  assert.match(component, /document\.body\.dataset\.homeIntro = introState/);
  assert.match(component, /introState === "complete" && previousIntroState !== "complete"/);
  assert.match(component, /const syncHomeIntroTargetGeometry = useCallback/);
  assert.match(component, /document\.body\.dataset\.homeIntro === "complete"[\s\S]*?return null;/);
  assert.match(component, /introResultsSignaledRef\.current = true;\s*syncHomeIntroTargetGeometry\(\)/);
  assert.match(component, /document\.body\.dataset\.homeIntro !== "pending"[\s\S]*?!isBrowserSearch/);
  assert.match(component, /const toDocumentHomeIntroRect = \([\s\S]*?scrollY: number[\s\S]*?\};/);
  assert.match(component, /const syncHomeIntroTargetGeometry = useCallback\(\s*\(\{ preserveDocumentPosition = false \}[^)]*\) => \{[\s\S]*?const viewportTargetRect = toHomeIntroRect\(slot\.getBoundingClientRect\(\)\);[\s\S]*?preserveDocumentPosition[\s\S]*?toDocumentHomeIntroRect\(viewportTargetRect, window\.scrollX, window\.scrollY\)/);
  assert.match(component, /const completeHomeIntroForScroll = useCallback\(\(\) => \{[\s\S]*?syncHomeIntroTargetGeometry\(\{ preserveDocumentPosition: true \}\);[\s\S]*?completeHomeIntro\(\);/);
  assert.match(component, /const introScrollSkipRequestedRef = useRef\(false\)/);
  assert.match(component, /if \(introScrollSkipRequestedRef\.current\) \{\s*return;\s*\}[\s\S]*?introScrollSkipRequestedRef\.current = true;/);
  assert.match(component, /if \(window\.scrollY > 1\) \{\s*completeHomeIntroForScroll\(\);/);
  assert.match(component, /window\.addEventListener\("scroll", handleHomeIntroScroll, \{ passive: true \}\)/);
  assert.match(component, /window\.removeEventListener\("scroll", handleHomeIntroScroll\)/);
  assert.match(component, /const handleHomeIntroSkip = useCallback\(\(\) => \{[\s\S]*?document\.body\.dataset\.homeIntro !== "pending"[\s\S]*?revealHomeIntro\(\)/);
  // The reveal waits for fonts and a stable card, never the window load event (images and third-party scripts).
  assert.doesNotMatch(component, /addEventListener\("load"/);
  // Before hydration the intro paints the artwork from the server HTML, with the demo hidden and its CSS paused.
  assert.match(styles, /html\[data-home-intro-js\] \.hero-safari-demo\[data-home-intro="pending"\]:not\(\[data-intro-ready\]\) \.hero-safari-visual \{[\s\S]*?visibility: visible;/);
  assert.match(styles, /:not\(\[data-intro-ready\]\) \.hero-safari-screen \*,[\s\S]*?animation-play-state: paused !important;/);
  assert.match(source, /--hero-intro-art-height/);
  assert.match(source, /<link rel="preload" as="image" href="\/assets\/settings-bg-light-monet-newtab\.webp"/);
  // The intro replays only after the homepage has gone unseen for a while; refreshes inside that window skip it.
  assert.match(source, /const HOME_INTRO_QUIET_MS = 30 \* 60 \* 1000;/);
  assert.match(source, /playHomeIntro = forced \|\| Date\.now\(\) - seenAt > HOME_INTRO_QUIET_MS;\s*localStorage\.setItem\(HOME_INTRO_SEEN_KEY, String\(Date\.now\(\)\)\);/);
  assert.doesNotMatch(source, /navigation\.type === "reload"/);
  assert.match(component, /window\.addEventListener\("wheel", handleWheel, \{ passive: true \}\)/);
  assert.match(component, /window\.addEventListener\("keydown", handleKeyDown\)/);
  assert.match(component, /className="hero-intro-skip-hint"[\s\S]*?onClick=\{handleHomeIntroSkip\}[\s\S]*?\{siteCopy\.skipIntroLabel\}/);
  assert.match(component, /skipIntroLabel: "点击任意处跳过"/);
  assert.match(component, /skipIntroLabel: "Click anywhere to skip"/);
  assert.match(component, /className="hero-safari-visual home-media"\s*onClick=\{handleHomeIntroSkip\}/);
  assert.match(component, /const HOME_INTRO_MOVE_MS = 1_240/);
  assert.match(component, /HOME_INTRO_COMPLETION_FALLBACK_MS = HOME_INTRO_MOVE_MS \+ 240/);
  assert.match(component, /const visualRef = useRef<HTMLDivElement>\(null\)/);
  assert.match(component, /const sourceWidth = window\.innerWidth/);
  assert.match(component, /const sourceHeight = window\.innerHeight/);
  assert.match(component, /const viewportTargetRect = toHomeIntroRect\(slot\.getBoundingClientRect\(\)\)/);
  assert.match(component, /visual\.style\.setProperty\("--hero-intro-target-left"/);
  assert.match(component, /HOME_INTRO_STABLE_FRAME_COUNT = 8/);
  assert.match(component, /await document\.fonts\?\.ready/);
  assert.match(component, /introResizeObserverRef\.current = new ResizeObserver/);
  assert.match(component, /stableFrameCount < HOME_INTRO_STABLE_FRAME_COUNT/);
  assert.match(component, /const maskKeyframes: Keyframe\[\] = \[\]/);
  assert.match(component, /const contentKeyframes: Keyframe\[\] = \[\]/);
  assert.match(component, /const contentTranslateX = -\(targetRect\.left \* progress\) \/ scaleX/);
  assert.match(component, /const maskAnimation = visual\.animate\(maskKeyframes, timing\)/);
  assert.match(component, /const contentAnimation = content\.animate\(contentKeyframes, timing\)/);
  assert.match(component, /getPropertyValue\("--home-radius-xl"\)[\s\S]*?const radiusAnimation = visual\.animate\([\s\S]*?borderRadius: "0px"[\s\S]*?borderRadius: settledRadius/);
  assert.match(component, /maskAnimation\.onfinish = \(\) => reconcileHomeIntroEnd\(\)/);
  assert.doesNotMatch(component, /handleHomeIntroMaskAnimationEnd/);
  assert.doesNotMatch(component, /--hero-intro-switcher-/);
  assert.equal((component.match(/<DitherShader/g) || []).length, 1);
  assert.match(component, /className="hero-safari-dither--continuous"/);
  assert.match(component, /--hero-intro-source-width/);
  assert.match(component, /--hero-intro-source-height/);
  assert.match(source, /\.hero-demo-slot \{[\s\S]*?height: max\(300px, calc\(100svh - 500px\)\);/);
  assert.match(component, /const HOME_INTRO_DESKTOP_SCALE_MAX = 1\.32/);
  assert.match(component, /const HOME_INTRO_MOBILE_SCALE_MIN = 0\.94/);
  assert.match(component, /const HOME_INTRO_MOBILE_SCALE_MAX = 1\.02/);
  assert.match(component, /demoHeight \* \(mobile \? 0\.24 : 0\.26\)/);
  assert.match(styles, /\.hero-safari-demo \{[\s\S]*?position: relative;[\s\S]*?overflow: visible;/);
  assert.match(styles, /\.hero-safari-visual \{[\s\S]*?filter: none;/);
  assert.doesNotMatch(styles, /drop-shadow\(0 28px 50px/);
  assert.match(styles, /\.hero-safari-demo\[data-home-intro="pending"\] \.hero-safari-visual,[\s\S]*?position: fixed;[\s\S]*?width: var\(--hero-intro-target-width/);
  assert.match(styles, /\.hero-safari-demo\[data-home-intro="pending"\] \.hero-safari-visual \{[\s\S]*?scale\([\s\S]*?--hero-intro-mask-scale-x/);
  assert.match(styles, /\.hero-safari-demo\[data-home-intro="pending"\] \.hero-safari-mask-content,[\s\S]*?--hero-intro-content-scale-x/);
  assert.match(styles, /\.hero-safari-demo\[data-home-intro="complete"\] \.hero-safari-mask-content \{[\s\S]*?--hero-intro-target-left/);
  assert.doesNotMatch(styles, /hero-demo-mask-shrink|will-change:\s*clip-path/);
  assert.doesNotMatch(styles, /@keyframes hero-demo-window-settle/);
  assert.match(styles, /@keyframes hero-demo-stage-settle[\s\S]*?transform: var\(--hero-intro-stage-transform, none\);[\s\S]*?transform: none;/);
  assert.doesNotMatch(
    styles.match(/@keyframes hero-demo-stage-settle[\s\S]*?\n\}/)?.[0] || "",
    /scale\([^)]*,[^)]*\)/,
  );
  assert.match(styles, /\.hero-safari-demo\[data-home-intro="pending"\] \.hero-demo-page-switcher,[\s\S]*?visibility: hidden;[\s\S]*?opacity: 0;/);
  assert.match(styles, /\.hero-safari-demo\[data-home-intro="complete"\] \.hero-demo-page-switcher \{[\s\S]*?hero-demo-switcher-enter 240ms/);
  assert.doesNotMatch(styles, /hero-demo-switcher-settle|--hero-intro-switcher-/);
  assert.match(styles, /\.hero-safari-demo\[data-home-intro="pending"\] \.hero-safari-mask-content,[\s\S]*?width: var\(--hero-intro-source-width, 100%\);[\s\S]*?height: var\(--hero-intro-source-height, 100%\);/);
  assert.doesNotMatch(styles, /hero-intro-dither-out|hero-settled-dither-in|hero-safari-dither--intro|hero-safari-dither--settled/);
  assert.match(dither, /const workWidth = Math\.max\(1, Math\.ceil\(width \/ baseCellSize\)\)/);
  assert.match(dither, /data-dither-grid-size=\{gridSize\}/);
  assert.match(dither, /introSourceDimensionsRef = useRef/);
  assert.match(dither, /introState === "pending" \|\| introState === "revealing"/);
  assert.match(dither, /introState === "complete" && introSourceDimensionsRef\.current/);
  assert.doesNotMatch(dither, /MAX_DITHER_WIDTH|qualityScale/);
  assert.match(readSource("src/styles/site.css"), /html \{[\s\S]*?scrollbar-gutter: stable;/);
  assert.doesNotMatch(styles, /hero-safari-enter/);
  assert.doesNotMatch(source, /hero-copy-in/);
});

test("homepage hero exposes install and community actions below the subtitle", () => {
  const source = readSource("src/pages/index.astro");
  const installTooltip = readSource("src/components/home/HeroInstallTooltip.tsx");
  const communityDialog = readSource("src/components/home/CommunityQrDialog.tsx");
  const content = readSource("src/lib/home-content.ts");

  assert.match(
    source,
    /<p class="hero-description">[\s\S]*?<CopyLines text=\{content\.heroDescription\} \/>[\s\S]*?<div class="hero-actions">[\s\S]*?content\.heroInstallLabel[\s\S]*?content\.heroCommunityLabel/,
  );
  // The tooltip only matters on hover, so it hydrates once the page is idle instead of competing with the demo.
  assert.match(source, /<HeroInstallTooltip[^/]*?href=\{CHROME_STORE_URL\}[^/]*?client:idle/);
  assert.match(installTooltip, /<TooltipTrigger asChild>[\s\S]*?<SettingsButton[\s\S]*?variant="primary"/);
  assert.match(installTooltip, /<SettingsButton[\s\S]*?\{label\}[\s\S]*?\{HERO_BUTTERFLY_MARK\}/);
  assert.match(source, /<CommunityQrDialog[\s\S]*?triggerLabel=\{content\.heroCommunityLabel\}[\s\S]*?triggerVariant="hero"/);
  // The QR triggers are static HTML; the dialog loads on first use (src/scripts/community-qr.ts).
  assert.doesNotMatch(source, /<CommunityQrDialog\b[^>]*?client:/);
  assert.match(communityDialog, /<SettingsButton[\s\S]*?variant="secondary"/);
  assert.match(installTooltip, /const HERO_BUTTERFLY_MARK = \([\s\S]*?className="hero-install-butterfly"/);
  assert.match(installTooltip, /className="hero-install-butterfly-wing hero-install-butterfly-wing-back"/);
  assert.match(installTooltip, /className="hero-install-butterfly-wing hero-install-butterfly-wing-front"/);
  assert.match(installTooltip, /attributeName="d"[\s\S]*?dur="2800ms"[\s\S]*?repeatCount="indefinite"/);
  assert.match(installTooltip, /<animateTransform[\s\S]*?type="rotate"/);
  assert.doesNotMatch(installTooltip, /lumno-selection-mark\.png/);
  assert.doesNotMatch(installTooltip, /iconClass=|ri-arrow-right-up-line/);
  assert.doesNotMatch(communityDialog, /iconClass=|ri-feedback-line/);
  // The closing CTA reuses both buttons under its own analytics labels; the hero keeps the defaults.
  assert.match(installTooltip, /analyticsLabel = "home_hero_install"[\s\S]*?href=\{href\}[\s\S]*?data-analytics-label=\{analyticsLabel\}/);
  assert.match(communityDialog, /analyticsLabel = "home_hero_community"[\s\S]*?data-analytics-event="open_community_qrcode"[\s\S]*?data-analytics-label=\{analyticsLabel\}/);
  assert.match(source, /<FinalCta[\s\S]*?<HeroInstallTooltip[\s\S]*?id="final-install-primary"[\s\S]*?analyticsLabel="home_final_install"[\s\S]*?<CommunityQrDialog[\s\S]*?analyticsLabel="home_final_community"/);
  assert.match(communityDialog, /hero-community-button/);
  assert.match(source, /\.hero-actions-button \{[\s\S]*?padding: 8px 16px;[\s\S]*?font-size: 14px;/);
  assert.match(source, /\.hero-actions-button \{[\s\S]*?padding: 7px 14px;[\s\S]*?font-size: 13px;/);
  assert.match(content, /heroInstallLabel: "免费添加到 Chrome"/);
  assert.match(content, /heroCommunityLabel: "反馈 & 功能许愿"/);
  assert.match(content, /heroCommunityAria: "打开 Lumno 反馈与功能许愿二维码"/);
  assert.doesNotMatch(content, /heroReviewLabel|heroReviewAria/);
});

test("homepage community CTA opens an accessible QR-code dialog", () => {
  const source = readSource("src/pages/index.astro");
  const communityDialog = readSource("src/components/home/CommunityQrDialog.tsx");
  const dialog = readSource("src/components/ui/dialog.tsx");

  assert.match(source, /import "\.\.\/styles\/globals\.css"/);
  const panel = readSource("src/components/home/CommunityQrDialogPanel.tsx");
  const dialogRoot = readSource("src/components/home/community-qr-dialog-root.tsx");
  const triggerScript = readSource("src/scripts/community-qr.ts");

  assert.match(panel, /export function CommunityQrDialogPanel\([\s\S]*?<DialogContent/);
  assert.match(panel, /<DialogTitle>\{title\}<\/DialogTitle>/);
  assert.match(panel, /closeLabel=\{closeLabel\}/);
  assert.match(panel, /width="866"[\s\S]*?height="1280"/);
  assert.doesNotMatch(panel, /from "[^"]*SettingsKit"/, "the lazily loaded dialog must not pull the settings kit stylesheet onto every page");
  assert.match(communityDialog, /aria-haspopup="dialog"[\s\S]*?\{\.\.\.dialogAttributes\}/);
  assert.match(dialogRoot, /<Dialog open=\{open\} onOpenChange=\{setOpen\}>[\s\S]*?<CommunityQrDialogPanel/);
  assert.match(triggerScript, /\[data-community-qr-trigger\]/);
  assert.match(triggerScript, /import\("\.\.\/components\/home\/community-qr-dialog-root"\)/);
  assert.match(dialog, /data-open:animate-in[\s\S]*?data-open:zoom-in-95/);
  assert.match(dialog, /data-closed:animate-out[\s\S]*?data-closed:zoom-out-95/);
  assert.match(dialog, /motion-reduce:animate-none/);
  assert.match(
    readSource("src/styles/site.css"),
    /body\[data-scroll-locked\] \{[\s\S]*?--removed-body-scroll-bar-size: 0px !important;[\s\S]*?margin-right: 0 !important;/,
  );
  assert.doesNotMatch(source, /id="community-qrcode-modal"|const openModal|qrcode-modal-panel/);
});

test("homepage footer reuses the shared community dialog", () => {
  const source = readSource("src/components/site/PageFooter.astro");

  assert.match(readSource("src/pages/index.astro"), /<PageFooter locale=\{uiLocale\} routeLanguageMap=\{routeLanguageMap\} \/>/);
  assert.match(source, /<SiteFooter[\s\S]*?feedback=\{\{[\s\S]*?label: content\.footerFeedback/);
  assert.match(
    readSource("src/components/home/sections/SiteFooter.astro"),
    /<CommunityQrDialog[\s\S]*?triggerLabel=\{feedback\.label\}[\s\S]*?triggerVariant="footer"/,
  );
  // Chinese locales open the WeChat QR; every other locale links to Discord (lib/community.ts).
  assert.match(source, /externalHref: getCommunityExternalHref\(locale\)/);
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
  assert.match(
    installTooltipStyles,
    /\.hero-install-butterfly\s*\{[\s\S]*?width:\s*18px;[\s\S]*?height:\s*18px;[\s\S]*?flex:\s*0 0 18px;[\s\S]*?margin-inline-end:\s*-6px;[\s\S]*?color:\s*#f4f7fb;[\s\S]*?contain:\s*layout size style;/,
  );
  assert.match(installTooltipStyles, /\.hero-install-butterfly-wing-back\s*\{[\s\S]*?opacity:\s*0\.38;/);
  assert.match(installTooltipStyles, /\.hero-install-butterfly-wing-front\s*\{[\s\S]*?opacity:\s*0\.86;/);
  assert.match(installTooltipStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(installTooltipStyles, /(?:sepia|saturate|hue-rotate)\(/);
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
  assert.match(content, /基于 GPL-3\.0 开源，支持大多数 Chromium 内核浏览器/);
  assert.match(content, /以 GPL-3\.0 授權開源，支援大多數 Chromium 核心瀏覽器/);
  assert.match(content, /Open source under GPL-3\.0\. Works in most Chromium-based browsers\./);
});

test("homepage moves the open-source note into the install tooltip", () => {
  const source = readSource("src/pages/index.astro");
  const content = readSource("src/lib/home-content.ts");

  assert.match(source, /tooltipLabel=\{content\.heroBrowserTooltipLabel\}/);
  assert.doesNotMatch(source, /GITHUB_LICENSE_URL|hero-open-source-note|hero-license-link/);
  assert.doesNotMatch(content, /heroOpenSourceNote|heroLicenseLabel|heroLicenseAria/);
  assert.match(
    content,
    /heroBrowserTooltipLabel: "基于 GPL-3\.0 开源，支持大多数 Chromium 内核浏览器"/,
  );
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
  assert.match(styles, /background:\s*url\("\/assets\/settings-bg-light-monet-newtab\.webp"\) center \/ cover no-repeat,\s*var\(--hero-art-placeholder, none\)/);
  // The dithered canvas fades in over that plain painting once drawn.
  assert.match(styles, /\.hero-safari-dither\[data-dither-ready\] canvas \{\s*opacity: 1;/);
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
  const onboardingStyles = readSource(
    "src/components/home/onboarding-source/suggestions-view.css",
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
  // Three browser-page followups per extension language (zh-CN, zh-TW, en, ja).
  assert.equal((component.match(/type: "browserPage"/g) || []).length, 12);
  assert.match(component, /query: "扩展"/);
  assert.match(component, /query: "历史记录"/);
  assert.match(component, /query: "下载记录"/);
  assert.match(component, /query: "擴充功能"/);
  assert.match(component, /query: "歷史紀錄"/);
  assert.match(component, /query: "下載紀錄"/);
  assert.match(component, /query: "extensions"/);
  assert.match(component, /query: "history"/);
  assert.match(component, /query: "downloads"/);
  assert.match(component, /title: "打开 Google Chrome：chrome:\/\/extensions\/"/);
  assert.match(component, /title: "開啟 Google Chrome：chrome:\/\/history"/);
  assert.match(component, /title: "Open Google Chrome: chrome:\/\/downloads"/);
  assert.match(component, /url: "chrome:\/\/extensions\/"/);
  assert.match(component, /url: "chrome:\/\/history"/);
  assert.match(component, /url: "chrome:\/\/downloads"/);
  assert.match(component, /browserPageIconClass: "ri-puzzle-fill"/);
  assert.match(component, /browserPageIconClass: "ri-history-fill"/);
  assert.match(component, /browserPageIconClass: "ri-download-fill"/);
  assert.doesNotMatch(component, /CHROME_BROWSER_FAVICON|chrome\.webp/);
  assert.match(component, /actionTagLabel: "新开"/);
  assert.match(component, /actionTagLabel: "新開"/);
  assert.match(component, /actionTagLabel: "New Tab"/);
  assert.match(component, /COMMAND_BROWSER_PAGE_START_MS = 4_680/);
  assert.match(component, /COMMAND_BROWSER_PAGE_HOLD_MS = 1_800/);
  assert.match(component, /presentation: "complete"/);
  assert.match(component, /setPhaseIndex\(index \+ 1\)/);
  assert.match(component, /data-command-demo-phase=\{phaseId\}/);
  assert.match(component, /userHasSelectedSceneRef\.current = true/);
  assert.match(component, /if \(userHasSelectedSceneRef\.current\) \{[\s\S]*?setIsAutoPlaying\(false\)/);
  assert.match(styles, /\.bookmark-focus-demo-phase \{[\s\S]*?position: absolute;[\s\S]*?inset: 0;/);
  assert.match(styles, /\.lumno-overlay-panel\[data-presentation="complete"\][\s\S]*?animation: none;/);
  assert.match(styles, /#_x_extension_onboarding_overlay_demo_2026_unique_\[data-presentation="complete"\] \.lumno-overlay-result \{[\s\S]*?visibility: visible;[\s\S]*?animation: none;/);
  assert.match(component, /sourceTagKind: "open-tab"/);
  assert.match(component, /actionTagLabel: "切换"/);
  assert.doesNotMatch(component, /setInterval/);
  assert.match(component, /hero-demo-page-switcher/);
  assert.match(component, /<SettingsTabs[\s\S]*?className="lumno-settings-kit hero-demo-page-switcher"/);
  assert.match(component, /value=\{copy\.scenes\[sceneIndex\]\.id\}/);
  assert.match(component, /setReplayKey\(\(currentKey\) => currentKey \+ 1\)/);
  assert.match(component, /HERO_INTRO_SEQUENCE = \[/);
  assert.match(component, /\{ id: "site-search", durationMs: 7_200 \}/);
  assert.match(component, /\{ id: "commands", durationMs: 10_280 \}/);
  assert.match(component, /\{ id: "browser-search", durationMs: 5_680 \}/);
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
  assert.equal((component.match(/theme: LUMNO_THEME/g) || []).length, 8);
  assert.equal((component.match(/theme: CHROME_THEME/g) || []).length, 4);
  assert.match(styles, /--x-ov-hover-bg: rgba\(200, 208, 218, 0\.45\);/);
  assert.match(component, /brandAccentRgb: \[36, 41, 46\]/);
  assert.match(component, /accentRgb: \[156, 159, 161\]/);
  assert.match(component, /hoverLeadMs: 0/);
  assert.match(component, /const SEARCH_RESULT_CURSOR_DELAY_MS = 1_120/);
  assert.match(component, /const SEARCH_RESULT_CURSOR_DURATION_MS = 2_600/);
  assert.match(component, /const SEARCH_RESULT_HIGHLIGHT_LAG_MS = 120/);
  assert.match(component, /hoverStartMs: SEARCH_RESULT_HIGHLIGHT_START_MS/);
  assert.match(component, /hoverStepMs: 0/);
  assert.match(component, /hoverWrapStepMs: 0/);
  assert.match(component, /scene\.id !== "commands" \? \(/);
  assert.match(component, /data-cursor-mode=\{mode\}/);
  assert.match(component, /mode=\{isBrowserSearch \? "search-result" : "site-search"\}/);
  assert.match(component, /CURSOR_TIP_OFFSET_X = 5/);
  assert.match(component, /CURSOR_TIP_OFFSET_Y = 5/);
  assert.match(component, /--\$\{name\}-cursor-left/);
  assert.match(component, /--\$\{name\}-cursor-top/);
  assert.doesNotMatch(component, /lumno-overlay-query-text|lumno-overlay-query-caret|queryTrackingFrame|trackQueryCaret/);
  assert.match(component, /const stageScaleX = stageRect\.width \/ Math\.max\(stage\.offsetWidth, 1\)/);
  assert.match(component, /const stageScaleY = stageRect\.height \/ Math\.max\(stage\.offsetHeight, 1\)/);
  assert.match(component, /renderedLeft \/ Math\.max\(stageScaleX, Number\.EPSILON\)/);
  assert.match(component, /renderedTop \/ Math\.max\(stageScaleY, Number\.EPSILON\)/);
  assert.match(component, /document\.addEventListener\("lumno:home-intro-complete", scheduleCursorSync\)/);
  assert.match(component, /document\.removeEventListener\("lumno:home-intro-complete", scheduleCursorSync\)/);
  assert.match(component, /"search-result",[\s\S]*?data-demo-index="0"/);
  assert.match(component, /"site-search-tag",[\s\S]*?data-demo-cursor-target="site-search-tag"/);
  assert.match(component, /"site-search-menu",[\s\S]*?data-demo-cursor-target="site-search-menu"/);
  assert.match(
    component,
    /_x_extension_onboarding_overlay_demo_2026_unique_/,
  );
  assert.match(onboardingComponent, /const stepMs = 1040 \/ Math\.max/);
  assert.match(onboardingComponent, /BROWSER_INTERNAL_URL_PATTERN/);
  assert.match(onboardingComponent, /hasBrowserPageIcon/);
  assert.match(onboardingComponent, /x-ov-suggestion-favicon--browser-page-icon/);
  assert.match(onboardingComponent, /data-fallback-icon-name=\{/);
  assert.match(onboardingComponent, /data-object-fit="contain"/);
  assert.match(onboardingComponent, /model\.presentation === 'complete'/);
  assert.match(onboardingComponent, /className="x-ov-close-other-tabs"/);
  assert.match(onboardingComponent, /ri-brush-2-line ri-size-16/);
  assert.match(component, /closeOtherTabsLabel: "关闭其他标签页"/);
  assert.match(component, /closeOtherTabsLabel: "關閉其他分頁"/);
  assert.match(component, /closeOtherTabsLabel: "Close other tabs"/);
  assert.match(styles, /\.lumno-overlay-panel \.x-lumno-search-input__field \{[\s\S]*?padding-right: 92px;/);
  assert.doesNotMatch(onboardingComponent, /'googleSuggest',\s*'browserPage'/);
  assert.match(onboardingStyles, /\.x-ov-suggestion-favicon--browser-page-icon \{[\s\S]*?color: #1a73e8;/);
  assert.match(onboardingStyles, /\.x-ov-close-other-tabs \.ri-icon \{[\s\S]*?font-size: 16px;/);
  assert.match(onboardingComponent, /data-row-state=\{active \? 'active' : undefined\}/);
  assert.match(onboardingComponent, /x-ov-action-tag__label/);
  assert.match(onboardingComponent, /if \(model\.hoverStepMs <= 0\)/);
  assert.match(onboardingComponent, /model\.sceneId/);
  assert.match(onboardingComponent, /theme\?\.highlightBg \|\| 'var\(--x-ov-hover-bg, #f3f4f6\)'/);
  assert.match(siteSearchComponent, /x-lumno-search-input-mode__menu _x_extension_menu_surface_2024_unique_/);
  assert.match(siteSearchComponent, /role="menuitemradio"/);
  assert.match(siteSearchComponent, /aria-checked=\{item\.active \? 'true' : 'false'\}/);
  assert.match(siteSearchComponent, /data-mode-menu-open="true"/);
  assert.match(siteSearchComponent, /data-demo-cursor-target="site-search-tag"/);
  assert.match(siteSearchComponent, /data-demo-cursor-target="site-search-menu"/);
  assert.match(siteSearchComponent, /content\.scrollTop = maxScroll \* scrollProgress/);
  assert.match(siteSearchComponent, /window\.requestAnimationFrame\(animateScroll\)/);
  assert.match(styles, /onboarding-overlay-input-shell-expand 980ms/);
  assert.match(styles, /onboarding-overlay-results-reveal 980ms/);
  assert.match(component, /--search-result-cursor-delay/);
  assert.match(component, /--search-result-cursor-duration/);
  assert.match(styles, /onboarding-cursor-type[\s\S]*?--search-result-cursor-duration/);
  assert.match(styles, /\[data-cursor-mode="search-result"\][\s\S]*?--search-result-cursor-delay/);
  assert.match(styles, /--search-result-cursor-left/);
  assert.match(styles, /--search-result-cursor-top/);
  // The input point is measured from the drawn field, like the result point.
  assert.match(component, /"search-result-input",\s*stage\.querySelector\("\.lumno-overlay-query"\)/);
  assert.match(styles, /var\(--search-result-input-cursor-left, 29%\)/);
  assert.match(styles, /var\(--search-result-input-cursor-top, 22%\)/);
  assert.doesNotMatch(styles, /--search-result-input-cursor-(left|top):/);
  assert.match(styles, /--search-result-input-cursor-travel: 48px;/);
  assert.match(styles, /62%,\s*72%[\s\S]*?--search-result-input-cursor-travel/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.cursor-layer \{[\s\S]*?--search-result-input-cursor-travel: 36px;/);
  assert.doesNotMatch(styles, /onboarding-cursor-type-mobile/);
  assert.doesNotMatch(styles, /onboarding-cursor-hover-loop/);
  assert.doesNotMatch(styles, /onboarding-command-cursor-hide/);
  assert.match(styles, /site-search-demo-tab-hint-cycle 1120ms/);
  assert.match(styles, /site-search-demo-mode-prefix[\s\S]*?height: 32px;/);
  assert.match(styles, /site-search-demo-mode-prefix[\s\S]*?gap: 6px;/);
  assert.match(styles, /site-search-demo-mode-prefix[\s\S]*?border-radius: 10px;/);
  assert.match(styles, /site-search-demo-mode-prefix[\s\S]*?background: rgba\(var\(--site-search-demo-brand-accent-rgb/);
  assert.doesNotMatch(styles, /\.site-search-demo-mode-prefix__chevron\s*\{[^}]*margin-left:/);
  assert.match(siteSearchComponent, /<button[\s\S]*?className="x-lumno-search-input-mode__prefix site-search-demo-mode-prefix"[\s\S]*?type="button"/);
  assert.match(siteSearchComponent, /const prefixWidth = Math\.ceil\(prefix\.offsetWidth\)/);
  assert.match(siteSearchComponent, /basePadding \+ prefixWidth \+ prefixGap/);
  assert.match(styles, /site-search-demo-mode-prefix[\s\S]*?padding: 0 6px;/);
  assert.match(styles, /site-search-demo-mode-prefix__icon[\s\S]*?width: 20px;[\s\S]*?height: 20px;/);
  assert.match(styles, /site-search-demo-prefix-enter 180ms cubic-bezier\(0\.16, 1, 0\.3, 1\)/);
  assert.match(styles, /site-search-demo-prefix-icon-pop 180ms linear/);
  assert.match(styles, /translateY\(-50%\) translateX\(-4px\) scaleX\(0\.92\)/);
  assert.doesNotMatch(styles, /site-search-demo-prefix-press|site-search-demo-prefix-click-ring/);
  assert.match(styles, /site-search-demo-scope-menu-open 420ms/);
  assert.match(styles, /height: min\(220px, 36vh\);/);
  assert.match(styles, /onboarding-cursor-site-search-open 6600ms/);
  assert.match(styles, /--site-search-tag-cursor-left/);
  assert.match(styles, /--site-search-tag-cursor-top/);
  assert.match(styles, /--site-search-menu-cursor-left/);
  assert.match(styles, /--site-search-menu-cursor-top/);
  assert.match(styles, /\.site-search-demo-stack \{[\s\S]*?top: 18%;/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.lumno-overlay-panel \{[\s\S]*?top: 16px;[\s\S]*?\.site-search-demo-stack \{[\s\S]*?top: 16px;/);
  assert.match(component, /data-scene-direction=\{sceneDirection\}/);
  assert.match(component, /x: direction === "forward" \? 42 : -42/);
  assert.doesNotMatch(component, /hero-demo-page-indicator/);
  assert.doesNotMatch(styles, /hero-demo-page-indicator/);
  assert.doesNotMatch(switcherStyles, /backdrop-filter/);
  assert.match(styles, /hero-demo-page-button:focus-visible/);
  assert.match(homepage, /height: max\(300px, calc\(100svh - 500px\)\);/);
  assert.match(homepage, /\.hero-demo-slot \{\s*height: 320px;\s*max-height: none;/);
  assert.match(
    styles,
    /@media \(max-width: 760px\)[\s\S]*?\.lumno-settings-tabs\.hero-demo-page-switcher \{[\s\S]*?top: calc\(100% \+ 16px\);[\s\S]*?width: max-content;[\s\S]*?max-width: calc\(100vw - 32px\);/,
  );
  // Touch screens get an invisible 44px-tall hit area around the 30px tabs.
  assert.match(
    styles,
    /@media \(pointer: coarse\)[\s\S]*?\.hero-demo-page-button::after \{[\s\S]*?inset: -7px -2px;/,
  );
  // Phones share the AI intent demo's compact tab bar; tabs keep a 76px minimum width.
  assert.match(styles, /\.hero-demo-page-switcher \.hero-demo-page-button \{[\s\S]*?min-height: 30px;/);
  assert.match(
    styles,
    /@media \(max-width: 760px\)[\s\S]*?\.hero-demo-page-switcher \.hero-demo-page-button \{[\s\S]*?min-width: 76px;/,
  );
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
