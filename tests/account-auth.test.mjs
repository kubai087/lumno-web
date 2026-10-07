import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { normalizeAuthReturnPath } from "../src/lib/auth-return-path.js";

const workspaceRoot = path.resolve(import.meta.dirname, "..");

function readSource(file) {
  return fs.readFileSync(path.join(workspaceRoot, file), "utf8");
}

test("account portal exposes Google and GitHub identity linking without email OTP", () => {
  const source = readSource("src/components/account/AccountPortal.tsx");
  const callbackSource = readSource("src/components/account/AuthCallback.tsx");
  const clientSource = readSource("src/lib/supabase-client.ts");

  assert.match(source, /使用 Google 继续/);
  assert.match(source, /使用 GitHub 继续/);
  assert.match(source, /如果两者使用同一个已验证邮箱，系统会自动合并到同一账号/);
  assert.match(source, /signInWithOAuth/);
  assert.match(source, /continueWithProvider\("google"\)/);
  assert.match(source, /busy === "google"/);
  assert.doesNotMatch(source, /googleSoon|aria-disabled="true"/);
  assert.doesNotMatch(source, /signInWithOtp|verifyOtp|InputOTP|auth-email|邮箱验证码登录/);
  assert.match(source, /providers\.includes\("github"\)/);
  assert.match(source, /supabase\.functions\.invoke\("delete-account"/);
  assert.match(source, /getOAuthCaptchaToken\(RECAPTCHA_SITE_KEY, RECAPTCHA_ACTION\)/);
  assert.match(source, /supabase\.functions\.invoke\("signup-captcha"/);
  assert.match(source, /captchaData\?\.ok !== true/);
  assert.match(source, /deleteConfirmation !== "DELETE"/);
  assert.match(source, /step_up_access_token: proofAccessToken/);
  assert.match(source, /headers: \{ Authorization: `Bearer \$\{primaryAccessToken\}` \}/);
  assert.match(source, /getSupabaseDeleteStepUpClient\(\)\.auth\.signInWithOAuth/);
  assert.doesNotMatch(source, /MAINLAND_NOTICE_STORAGE_KEY|mainland_cross_border|ensureMainlandConsent/);
  assert.match(callbackSource, /exchangeCodeForSession/);
  assert.match(callbackSource, /isDeleteStepUpPending\(\)/);
  assert.match(callbackSource, /clearDeleteStepUp\(\)/);
  assert.match(callbackSource, /consumeDeleteStepUpReturnPath\(\)/);
  assert.match(clientSource, /export function clearDeleteStepUp\(\)/);
  assert.doesNotMatch(callbackSource, /unlinkIdentity|provider_locked/);
  assert.doesNotMatch(clientSource, /lumno-auth-provider-choice-v1/);
});

test("OAuth CAPTCHA is loaded on demand and bound to a server-verified action", () => {
  const portalSource = readSource("src/components/account/AccountPortal.tsx");
  const captchaSource = readSource("src/lib/recaptcha.ts");
  const workflowSource = readSource(".github/workflows/deploy-pages.yml");

  assert.match(portalSource, /const RECAPTCHA_ACTION = "lumno_oauth"/);
  assert.match(portalSource, /PUBLIC_RECAPTCHA_SITE_KEY/);
  assert.match(captchaSource, /let loader: Promise<RecaptchaApi> \| null = null/);
  assert.match(captchaSource, /recaptcha\.execute\(siteKey, \{ action \}\)/);
  assert.match(captchaSource, /document\.head\.append\(script\)/);
  assert.doesNotMatch(readSource("src/layouts/AuthLayout.astro"), /recaptcha\/api\.js/,
    "third-party CAPTCHA code should load only after a sign-in click");
  assert.match(workflowSource, /PUBLIC_RECAPTCHA_SITE_KEY: \$\{\{ secrets\.PUBLIC_RECAPTCHA_SITE_KEY \}\}/);
  assert.match(workflowSource, /Validate OAuth protection configuration/);
  assert.match(workflowSource, /PUBLIC_RECAPTCHA_SITE_KEY is required before deploying/);
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
  assert.match(authorizeSource, /useState<string \| null>\(null\)/);
  assert.match(authorizeSource, /authorizationId === null/);
  assert.match(authorizeSource, /正在确认登录请求/);
  assert.doesNotMatch(authorizeSource, /useMemo/);
});

test("Lumno extension authorization resumes from the account route and returns automatically", () => {
  const source = readSource("src/components/account/AccountPortal.tsx");

  assert.match(source, /window\.location\.search[\s\S]*get\("authorization_id"\)/);
  assert.match(source, /768d478e-811f-4085-a3be-62609b9184fc/);
  assert.match(source, /1279a56a-4c1d-495d-8a57-13e77d1b2d53/);
  assert.match(source, /isLumnoExtensionAuthorization\(data\)/);
  assert.match(
    source,
    /isLumnoExtensionAuthorization\(data\)[\s\S]*approveAuthorization\([\s\S]*skipBrowserRedirect: true[\s\S]*window\.location\.assign\(approval\.data\.redirect_url\)/,
  );
  assert.match(source, /const userId = user\?\.id \|\| ""/);
  assert.match(source, /\[authorizationId, copy, supabase, userId\]/);
  assert.doesNotMatch(source, /\[authorizationId, copy, supabase, user\]/);
});

test("sensitive auth layout does not load site analytics or SEO scripts", () => {
  const source = readSource("src/layouts/AuthLayout.astro");

  assert.doesNotMatch(source, /SeoHead/);
  assert.doesNotMatch(source, /googletagmanager|google-analytics|VibeLoft/i);
  assert.match(source, /noindex, nofollow, noarchive/);
  assert.match(source, /strict-origin/);
});

test("privacy policy documents the no-backend sync model", () => {
  const source = [
    readSource("src/content/privacy-policy.md"),
    readSource("src/content/privacy-policy.zh-TW.md"),
    readSource("src/content/privacy-policy.en.md"),
  ].join("\n");

  // Accounts, cloud sync, and usage metrics were removed in 0.9.40; sync is the browser's or the user's own WebDAV.
  assert.match(source, /0\.9\.40 起不再提供 Lumno 账号、云端同步或产品使用统计/);
  assert.match(source, /Since version 0\.9\.40, Lumno has offered no Lumno account, cloud sync, or product usage metrics/);
  assert.match(source, /应用密码只保存在当前设备/);
  assert.match(source, /the app password stays on the current device/);
  assert.match(source, /WebDAV 不提供端到端加密/);
  assert.match(source, /WebDAV is not end-to-end encrypted/);
  assert.match(source, /暂停同步、删除连接或卸载 Lumno 都不会删除服务器文件/);
  assert.doesNotMatch(source, /随机设备 ID|random device ID|默认关闭\*\*|off by default\*\*/);
  assert.doesNotMatch(source, /中国大陆单独告知|mainland-china-notice/);
});
