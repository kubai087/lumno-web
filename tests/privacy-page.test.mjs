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
  const headerActions = source.match(
    /<nav class="privacy-header-actions"[\s\S]*?<\/nav>/,
  )?.[0];

  assert.ok(headerActions, "privacy header actions should exist");
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

test("privacy sidebar exposes the same four support contacts as options", () => {
  const source = readSource("src/pages/privacy/index.astro");
  const contentSource = readSource("src/lib/privacy-content.ts");
  const supportLinks = source.match(
    /<div class="privacy-aside-links">[\s\S]*?<\/div>/,
  )?.[0];

  assert.ok(supportLinks, "privacy support links should exist");
  assert.equal((supportLinks.match(/<a\b/g) || []).length, 4);
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
    assert.match(policy, /Resend/);
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
