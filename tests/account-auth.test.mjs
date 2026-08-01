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
  assert.match(source, /signInWithOAuth/);
  assert.match(source, /signInWithOtp/);
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
  const source = readSource("src/pages/privacy/index.astro");

  assert.match(source, /账号信息 \/ Account information/);
  assert.match(source, /同步内容 \/ Synced content/);
  assert.match(source, /使用统计 \/ Usage metrics/);
  assert.match(source, /自定义壁纸存放在受访问控制的私有存储中/);
  assert.match(source, /不包含具体浏览网址、网页标题、书签内容或搜索词/);
});
