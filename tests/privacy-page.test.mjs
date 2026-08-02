import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("privacy header matches the release shell with one primary website CTA", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");
  const headerStyles = source.match(/\.privacy-header \{[\s\S]*?\n\s*\}/)?.[0];
  const headerActions = source.match(
    /<nav class="privacy-header-actions"[\s\S]*?<\/nav>/,
  )?.[0];

  assert.ok(headerActions, "privacy header actions should exist");
  assert.ok(headerStyles, "privacy header styles should exist");
  assert.match(headerStyles, /background: #ffffff/);
  assert.doesNotMatch(headerStyles, /rgba\(|backdrop-filter|color-mix/);
  assert.equal(
    (headerActions.match(/<a\b/g) || []).length,
    1,
    "privacy header should expose one action",
  );
  assert.match(headerActions, /class="privacy-header-cta"/);
  assert.match(headerActions, /content\.officialSiteLabel/);
  assert.doesNotMatch(headerActions, /\/release\//);
  assert.match(source, /src="\/resource_commited\/logo\.png"/);
  assert.match(contentSource, /officialSiteLabel: "访问官网"/);
  assert.match(contentSource, /officialSiteLabel: "Visit website"/);
});

test("privacy sidebar omits the retired document, developer, and product metadata", () => {
  const source = readSource("src/pages/privacy/index.astro");

  assert.doesNotMatch(source, /privacy-aside-label|privacy-aside-status/);
  assert.doesNotMatch(source, /<dt>Developer<\/dt>|<dt>Applies to<\/dt>/);
  assert.match(source, /<dt>\{content\.lastUpdatedLabel\}<\/dt>/);
});

test("privacy article opens with a title and a semantic quote", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");

  assert.match(source, /<h2 class="privacy-doc-title">\{content\.articleTitle\}<\/h2>/);
  assert.match(
    source,
    /<blockquote class="privacy-doc-intro">[\s\S]*?content\.intro[\s\S]*?<\/blockquote>/,
  );
  assert.match(contentSource, /articleTitle: "隐私政策"/);
  assert.match(contentSource, /articleTitle: "隱私權政策"/);
  assert.match(contentSource, /articleTitle: "Privacy Policy"/);
});

test("privacy hero uses natural Chinese copy and a localized update date", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");

  assert.match(source, /<section class="privacy-hero" aria-labelledby="privacy-title">/);
  assert.doesNotMatch(source, /privacy-banner/);
  assert.match(contentSource, /heroTitle: "Lumno 如何处理你的数据"/);
  assert.match(
    contentSource,
    /heroLead: "这份政策说明哪些信息只留在本机、登录后会同步什么、哪些统计需要你主动开启，以及如何关闭同步或删除数据。"/,
  );
  assert.doesNotMatch(contentSource, /清楚说明，才是真正尊重/);
  assert.match(source, /new Intl\.DateTimeFormat\(uiLocale/);
  assert.match(source, /\{content\.effectiveLabel\}\{displayLastUpdated\}/);
});

test("privacy sidebar exposes the same four support contacts as options", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const supportLinkSource = readSource("src/components/privacy/OptionsFeedbackSupportLink.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");
  const supportLinks = source.match(
    /<div class="privacy-aside-links">[\s\S]*?<\/div>/,
  )?.[0];

  assert.ok(supportLinks, "privacy support links should exist");
  assert.equal((supportLinks.match(/<OptionsFeedbackSupportLink\b/g) || []).length, 4);
  assert.match(supportLinks, /content\.communityLabel/);
  assert.match(supportLinks, /content\.reviewLabel/);
  assert.match(supportLinks, /content\.issueLabel/);
  assert.match(supportLinks, /content\.authorLabel/);
  assert.match(source, /communityIconClass = communityUsesDiscord \? "ri-discord-fill" : "ri-wechat-line"/);
  assert.match(supportLinks, /ri-star-line/);
  assert.match(supportLinks, /ri-github-line/);
  assert.match(supportLinks, /ri-twitter-x-line/);
  assert.match(contentSource, /communityLabel: "加入反馈群"/);
  assert.match(contentSource, /communityLabel: "Join Discord"/);

  assert.match(supportLinkSource, /class="_x_extension_feedback_support_link_2026_unique_"/);
  assert.match(supportLinkSource, /data-feedback-support=\{feedbackKey\}/);
  assert.match(supportLinkSource, /ri-icon ri-size-20/);
  assert.match(supportLinkSource, /ri-icon ri-size-14 ri-external-link-line/);
  assert.match(supportLinkSource, /min-height: 30px/);
  assert.match(supportLinkSource, /padding: 6px 10px/);
  assert.match(supportLinkSource, /border-radius: 999px/);
  assert.match(supportLinkSource, /background: rgba\(15, 23, 42, 0\.045\)/);
  assert.match(supportLinkSource, /color: #111827/);
  assert.match(supportLinkSource, /outline: 2px solid rgba\(59, 130, 246, 0\.65\)/);
  assert.match(supportLinkSource, /transition: background-color 160ms ease, color 160ms ease/);
});

test("privacy desktop layout keeps navigation in a separate left rail", () => {
  const source = readSource("src/pages/privacy/index.astro");

  assert.match(source, /--privacy-shell-gutter: 12px;/);
  assert.match(source, /\.privacy-header-inner \{[\s\S]*?padding: 12px var\(--privacy-shell-gutter\);/);
  assert.match(source, /@media \(max-width: 760px\) \{[\s\S]*?\.privacy-header-inner \{[\s\S]*?padding: 14px var\(--privacy-shell-gutter\);/);
  assert.match(source, /\.privacy-main \{[\s\S]*?padding: 30px var\(--privacy-shell-gutter\) max\(72px, var\(--safe-area-bottom\)\);/);
  assert.match(source, /\.privacy-layout \{[\s\S]*?width: 100%;[\s\S]*?margin-left: 0;[\s\S]*?transform: none;/);
  assert.match(
    source,
    /grid-template-columns: minmax\(180px, 230px\) minmax\(0, 1fr\);/,
  );
  assert.match(source, /\.privacy-aside \{[\s\S]*?grid-column: 1;[\s\S]*?justify-self: start;[\s\S]*?max-width: 230px;/);
  assert.match(source, /\.privacy-paper \{[\s\S]*?grid-column: 2;[\s\S]*?justify-self: center;[\s\S]*?max-width: 780px;/);
  assert.match(source, /@media \(max-width: 760px\) \{[\s\S]*?\.privacy-layout \{[\s\S]*?width: 100%;[\s\S]*?margin-left: 0;[\s\S]*?transform: none;[\s\S]*?grid-template-columns: 1fr;/);
  assert.doesNotMatch(source, /width: calc\(100vw - 48px\)/);
  assert.doesNotMatch(source, /grid-template-columns: minmax\(170px, 1fr\) minmax\(0, 3\.12fr\) minmax\(170px, 1fr\)/);
});

test("privacy support hover backgrounds stay inside the sidebar clipping edge", () => {
  const source = readSource("src/pages/privacy/index.astro");

  assert.match(source, /\.privacy-aside \{[\s\S]*?width: 100%;[\s\S]*?max-width: 230px;[\s\S]*?margin-left: 0;[\s\S]*?padding-left: 0;/);
  assert.match(source, /\.privacy-aside-links \{[\s\S]*?margin-left: 0;/);
  assert.match(source, /@media \(max-width: 760px\) \{[\s\S]*?\.privacy-aside \{[\s\S]*?width: 100%;[\s\S]*?max-width: none;[\s\S]*?margin-left: 0;/);
});

test("privacy policy does not duplicate contacts in an eleventh section", () => {
  const policy = readSource("src/content/privacy-policy.md");

  assert.doesNotMatch(policy, /## 11\. Contact \/ 联系方式/);
});

test("privacy policy has complete localized Markdown sources", () => {
  const zhCn = readSource("src/content/privacy-policy.md");
  const zhTw = readSource("src/content/privacy-policy.zh-TW.md");
  const en = readSource("src/content/privacy-policy.en.md");

  assert.match(zhCn, /## 1\. 适用范围与负责人/);
  assert.match(zhTw, /## 1\. 適用範圍與負責人/);
  assert.match(en, /## 1\. Scope and Controller/);
  assert.match(zhCn, /## 10\. 数据转移限制、Chrome Limited Use 与政策变更/);
  assert.match(zhTw, /## 10\. 資料移轉限制、Chrome Limited Use 與政策變更/);
  assert.match(en, /## 10\. Transfer Restrictions, Chrome Limited Use, and Policy Changes/);
});

test("privacy policy discloses all material data paths and maintenance-sensitive facts", () => {
  const policies = [
    readSource("src/content/privacy-policy.md"),
    readSource("src/content/privacy-policy.zh-TW.md"),
    readSource("src/content/privacy-policy.en.md"),
  ];

  for (const policy of policies) {
    assert.match(policy, /0\.9\.30/);
    assert.match(policy, /VibeLoft/);
    assert.match(policy, /Google Analytics/);
    assert.match(policy, /Supabase/);
    assert.doesNotMatch(policy, /Resend/);
    assert.match(policy, /verified (?:email|邮箱|電子郵件)|已验证邮箱|已驗證電子郵件/i);
    assert.match(policy, /24 (?:个月|個月|months)/);
    assert.match(policy, /`tabGroups`/);
    assert.match(policy, /`alarms`/);
    assert.match(policy, /`favicon`/);
    assert.match(policy, /Chrome Web Store User Data Policy/);
  }
});

test("privacy maintenance baseline maps policy claims to implementation", () => {
  const maintenance = readSource("docs/privacy-policy-maintenance.md");

  assert.match(maintenance, /manifest\.json/);
  assert.match(maintenance, /cloud-sync-schema\.js/);
  assert.match(maintenance, /delete-account\/index\.ts/);
  assert.match(maintenance, /SeoHead\.astro/);
  assert.match(maintenance, /Chrome Web Store Privacy practices/);
});

test("privacy localized routes reuse the canonical page", () => {
  const route = readSource("src/pages/[locale]/privacy/index.astro");

  assert.match(route, /buildLocalizedPath\(locale, "\/privacy\/"\)/);
  assert.match(route, /buildRouteLanguageMap\("\/privacy\/"\)/);
});

test("privacy exposes a localized scrollspy table of contents with stable anchors", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");
  const sectionIds = source.match(/const PRIVACY_SECTION_IDS = \[([\s\S]*?)\] as const;/)?.[1];

  assert.ok(sectionIds, "privacy section IDs should be declared");
  assert.equal((sectionIds.match(/"[a-z][a-z-]+"/g) || []).length, 10);
  assert.match(source, /<nav class="privacy-toc" aria-label=\{content\.tocLabel\}>/);
  assert.match(source, /data-privacy-toc-link/);
  assert.match(source, /data-privacy-section/);
  assert.match(source, /aria-current", "location"/);
  assert.match(source, /window\.history\.replaceState\(/);
  assert.match(source, /window\.requestAnimationFrame\(/);
  assert.match(source, /__lumnoPrivacyAutoAnchor/);
  assert.match(source, /navigationEntry\.type === "reload"/);
  assert.match(source, /window\.history\.scrollRestoration = "manual"/);
  assert.match(source, /clearAutoAnchorState\(\)/);
  assert.match(source, /const initialSectionId = window\.location\.hash\.slice\(1\)/);
  assert.match(source, /tocLinksById\.has\(initialSectionId\)/);
  assert.match(source, /setActiveSection\(initialSectionId, false\)/);
  assert.match(contentSource, /tocLabel: "目录"/);
  assert.match(contentSource, /tocLabel: "目錄"/);
  assert.match(contentSource, /tocLabel: "On this page"/);
});

test("privacy hides the table of contents on mobile", () => {
  const source = readSource("src/pages/privacy/index.astro");

  assert.match(
    source,
    /@media \(max-width: 760px\) \{[\s\S]*?\.privacy-toc \{[\s\S]*?display: none;/,
  );
});
