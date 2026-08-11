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
  assert.match(source, /iconClass: "ri-chrome-fill[\s\S]*iconClass: "ri-edge-new-fill/);
  assert.match(source, /analyticsEvent: "open_chrome_web_store"[\s\S]*analyticsEvent: "open_edge_addons"/);
  assert.match(styles, /\.install-menu \.lumno-settings-select-menu\s*\{[\s\S]*?width:\s*min\(360px,\s*calc\(100vw - 48px\)\);[\s\S]*?padding:\s*6px;/);
  assert.match(styles, /\.install-menu \.lumno-settings-select-option\s*\{[\s\S]*?min-height:\s*42px;[\s\S]*?padding:\s*8px 10px;[\s\S]*?font-size:\s*14px;/);
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
    /\.install-menu \.lumno-settings-badge\s*\{[\s\S]*?font-size:\s*14px;/,
    "store recommendation and version badges should render at fourteen pixels",
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

test("homepage navbar matches the content width and renders without an entrance animation", () => {
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
    /\.top-nav-actions\s*\{[\s\S]*?margin-right:\s*2\.5px;/,
    "the desktop install control should keep a right outer gap equal to its vertical gap",
  );
  assert.match(
    source,
    /@media \(max-width:\s*760px\)[\s\S]*?\.top-nav-actions\s*\{[\s\S]*?margin-right:\s*3px;/,
    "the mobile install control should keep the same balanced right outer gap",
  );
  assert.doesNotMatch(source, /top-nav-enter/, "the navbar should render immediately without an entrance animation");
  assert.match(
    source,
    /\.top-nav\s*\{[\s\S]*?contain:\s*layout;/,
    "the fixed navbar should isolate its layout from content below",
  );
});

test("homepage navbar centers four ghost actions and moves them into a mobile overflow menu", () => {
  const source = fs.readFileSync(path.join(workspaceRoot, "src/pages/index.astro"), "utf8");
  const ghostLinks = fs.readFileSync(
    path.join(workspaceRoot, "src/components/navigation/HomeNavGhostLinks.tsx"),
    "utf8",
  );
  const ghostLinkStyles = fs.readFileSync(
    path.join(workspaceRoot, "src/components/navigation/home-nav-ghost-links.css"),
    "utf8",
  );
  const content = fs.readFileSync(path.join(workspaceRoot, "src/lib/home-content.ts"), "utf8");

  assert.match(source, /<HomeNavGhostLinks[\s\S]*releaseHref=\{releaseHref\}[\s\S]*repositoryHref=\{GITHUB_URL\}[\s\S]*feedbackLabel=\{content\.navFeedback\}[\s\S]*featureRequestLabel=\{content\.navFeatureRequest\}[\s\S]*qrImageSrc=\{COMMUNITY_LINKS\.wechatQrImagePath\}/);
  assert.match(source, /<nav class="top-nav-actions"[\s\S]*?<HomeNavGhostLinks[\s\S]*?client:load[\s\S]*?<LanguageMenu/);
  assert.match(content, /navFeedback: "反馈"/);
  assert.match(content, /navFeatureRequest: "功能许愿"/);
  assert.doesNotMatch(content, /navSupportOpenSource/);
  assert.equal((ghostLinks.match(/<SettingsButton\b/g) || []).length, 2, "links and community actions should each share one mapped button branch");
  assert.match(ghostLinks, /variant="ghost"/);
  assert.match(ghostLinks, /className="top-nav-ghost-button"/);
  assert.match(ghostLinks, /\{link\.label\}\s*<\/SettingsButton>/);
  assert.match(ghostLinks, /value: "feedback"[\s\S]*communityAction: "feedback"[\s\S]*value: "repository"[\s\S]*value: "feature-request"/);
  assert.match(ghostLinks, /role="dialog"/);
  assert.match(ghostLinks, /aria-haspopup="dialog"/);
  assert.match(ghostLinks, /document\.addEventListener\("pointerdown"/);
  assert.match(ghostLinks, /event\.key === "Escape"/);
  assert.match(ghostLinks, /<SettingsSelect[\s\S]*triggerMode="icon"[\s\S]*triggerIconClass="ri-menu-line"/);
  assert.match(ghostLinks, /menuRole="menu"[\s\S]*optionRole="menuitem"/);
  assert.match(ghostLinks, /showSelected=\{false\}/);
  assert.match(ghostLinkStyles, /\.top-nav-community-popover\s*\{[\s\S]*?width:\s*264px;[\s\S]*?height:\s*min\(422px,[\s\S]*?backdrop-filter:\s*blur\(18px\) saturate\(135%\);/);
  assert.match(ghostLinkStyles, /\.top-nav-community-popover-header h2\s*\{[\s\S]*?font-size:\s*14px;[\s\S]*?font-weight:\s*700;/);
  assert.match(ghostLinkStyles, /\.top-nav-community-qr-image\s*\{[\s\S]*?max-height:\s*min\(360px,/);

  assert.match(
    source,
    /\.top-nav-ghost-links\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?left:\s*50%;[\s\S]*?transform:\s*translate\(-50%, -50%\);/,
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
    /body\.has-nav-overlap \.top-nav\s*\{[\s\S]*?background:\s*rgba\(255, 255, 255, 0\.84\);[\s\S]*?box-shadow:/,
    "the overlap state should add the floating surface",
  );
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
