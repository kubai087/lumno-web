import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { normalizeAuthReturnPath } from "../src/lib/auth-return-path.js";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("account portal prioritizes Google and GitHub while keeping email in preview", () => {
  const source = readSource("src/components/account/AccountPortal.tsx");

  assert.match(source, /使用 Google 继续/);
  assert.match(source, /使用 GitHub 继续/);
  assert.match(source, /邮箱验证码登录（内测）/);
  assert.match(source, /auth-email-disclosure/);
  assert.match(source, /CollapsibleTrigger/);
  assert.match(source, /InputOTP/);
  assert.match(source, /REGEXP_ONLY_DIGITS/);
  assert.match(source, /setResendIn\(30\)/);
  assert.match(source, /FieldError/);
  assert.match(source, /signInWithOAuth/);
  assert.match(source, /continueWithProvider\("google"\)/);
  assert.match(source, /busy === "google"/);
  assert.doesNotMatch(source, /googleSoon|aria-disabled="true"/);
  assert.match(source, /signInWithOtp/);
  assert.match(source, /providers\.includes\("github"\)/);
  assert.match(source, /supabase\.functions\.invoke\("delete-account"/);
  assert.match(source, /deleteConfirmation !== "DELETE"/);
  assert.match(source, /MAINLAND_NOTICE_STORAGE_KEY/);
  assert.match(source, /mainland_cross_border_consented_at/);
  assert.match(source, /ensureMainlandConsent\(\)/);
});

test("web auth components use Lumno semantic tokens", () => {
  const source = readSource("src/styles/globals.css");
  const config = readSource("components.json");

  assert.match(config, /"style": "radix-nova"/);
  assert.match(source, /--primary: #3f624d/);
  assert.match(source, /--ring: #3a8fc7/);
  assert.match(source, /--font-sans: "Open Sans"/);
  assert.doesNotMatch(source, /Geist/);
});

test("auth routes use PKCE and never allow an external post-login return URL", () => {
  const source = readSource("src/lib/supabase-client.ts");

  assert.match(source, /flowType: "pkce"/);
  assert.equal(normalizeAuthReturnPath("/account/"), "/account/");
  assert.equal(normalizeAuthReturnPath("/en/account/"), "/en/account/");
  assert.equal(
    normalizeAuthReturnPath("/oauth/authorize/?authorization_id=known"),
    "/oauth/authorize/?authorization_id=known",
  );
  assert.equal(normalizeAuthReturnPath("https://evil.example"), "/account/");
  assert.equal(normalizeAuthReturnPath("//evil.example"), "/account/");
  assert.equal(normalizeAuthReturnPath("/untrusted/path"), "/account/");
});

test("extension consent uses a registered authorization request and an explicit decision", () => {
  const source = readSource("src/components/account/AccountPortal.tsx");
  const authorizeSource = readSource("src/components/account/OAuthAuthorizePortal.tsx");

  assert.match(source, /getAuthorizationDetails/);
  assert.match(source, /approveAuthorization/);
  assert.match(source, /denyAuthorization/);
  assert.match(source, /skipBrowserRedirect: true/);
  assert.match(source, /authorizationDetails\?\.scope/);
  assert.match(source, /requestedScopes\.map/);
  assert.match(authorizeSource, /登录请求无效/);
});

test("sensitive auth layout does not load site analytics or SEO scripts", () => {
  const source = readSource("src/layouts/AuthLayout.astro");

  assert.doesNotMatch(source, /SeoHead/);
  assert.doesNotMatch(source, /googletagmanager|google-analytics|VibeLoft/i);
  assert.match(source, /noindex, nofollow, noarchive/);
  assert.match(source, /strict-origin/);
});

test("privacy policy documents account, private sync media, and bounded metrics", () => {
  const source = [
    readSource("src/pages/privacy/index.astro"),
    readSource("src/content/privacy-policy.md"),
    readSource("src/content/privacy-policy.zh-TW.md"),
    readSource("src/content/privacy-policy.en.md"),
  ].join("\n");

  assert.match(source, /随机设备 ID/);
  assert.match(source, /自定义快捷方式、搜索提供商和黑名单规则可能包含/);
  assert.match(source, /扩展内产品使用统计\*\*默认关闭\*\*/);
  assert.match(source, /random device ID/);
  assert.match(source, /Custom shortcuts, search providers, and blocklist rules may contain/);
  assert.match(source, /product usage metrics are \*\*off by default\*\*/);
  assert.match(source, /自定义媒体存放在受访问控制的私有存储中/);
  assert.match(source, /不上传具体网址、域名、路径、搜索词/);
  assert.match(source, /同一时间只有你选定的一套远端同步会接收新写入/);
  assert.match(source, /中国大陆不满 14 周岁的用户不得自行开启/);
  assert.match(source, /mainland-china-notice/);
});
