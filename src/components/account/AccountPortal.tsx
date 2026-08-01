import { useEffect, useMemo, useState } from "react";
import type { OAuthAuthorizationDetails, Provider, User } from "@supabase/supabase-js";
import {
  getSupabaseBrowserClient,
  rememberAuthReturnPath,
} from "../../lib/supabase-client";

type Locale = "zh-CN" | "zh-TW" | "en";
type BusyAction = "google" | "github" | "send-code" | "verify-code" | "sign-out" | "approve" | "deny" | "";

type Copy = {
  title: string;
  subtitle: string;
  google: string;
  googleSoon: string;
  github: string;
  recommended: string;
  emailBeta: string;
  emailLabel: string;
  emailPlaceholder: string;
  sendCode: string;
  codeLabel: string;
  codePlaceholder: string;
  verifyCode: string;
  codeSent: string;
  privacyPrefix: string;
  privacyLink: string;
  privacySuffix: string;
  checking: string;
  signedIn: string;
  connectedAs: string;
  signOut: string;
  backHome: string;
  authorizeTitle: string;
  authorizeBody: string;
  authorizeRequestedBy: string;
  authorizePermissions: string;
  authorizeContinue: string;
  authorizeDeny: string;
  invalidAuthorization: string;
  sessionVerified: string;
  retry: string;
  genericError: string;
  providerUnavailable: string;
  invalidEmail: string;
  invalidCode: string;
};

const COPY: Record<Locale, Copy> = {
  "zh-CN": {
    title: "登录 Lumno",
    subtitle: "在每台设备继续你的设置、快捷方式与自定义壁纸。",
    google: "使用 Google 继续",
    googleSoon: "即将支持",
    github: "使用 GitHub 继续",
    recommended: "推荐",
    emailBeta: "邮箱验证码登录（内测）",
    emailLabel: "邮箱",
    emailPlaceholder: "you@example.com",
    sendCode: "发送验证码",
    codeLabel: "验证码",
    codePlaceholder: "输入邮件中的 6 位验证码",
    verifyCode: "验证并登录",
    codeSent: "验证码已发送，请检查邮箱。",
    privacyPrefix: "继续即表示你已阅读并同意",
    privacyLink: "隐私政策",
    privacySuffix: "。",
    checking: "正在确认登录状态…",
    signedIn: "已登录",
    connectedAs: "当前账号",
    signOut: "退出登录",
    backHome: "返回 Lumno 首页",
    authorizeTitle: "继续登录 Lumno 插件",
    authorizeBody: "插件将获得你的基础账号信息，并使用你的身份同步 Lumno 配置与自定义壁纸。",
    authorizeRequestedBy: "申请方",
    authorizePermissions: "将共享",
    authorizeContinue: "允许并返回 Lumno",
    authorizeDeny: "取消",
    invalidAuthorization: "这次插件登录请求无效或已过期，请返回插件重新发起登录。",
    sessionVerified: "网页登录状态已验证",
    retry: "重试",
    genericError: "操作没有完成，请稍后重试。",
    providerUnavailable: "该登录方式尚未完成配置，请先使用其他方式。",
    invalidEmail: "请输入有效的邮箱地址。",
    invalidCode: "请输入邮件中的 6 位验证码。",
  },
  "zh-TW": {
    title: "登入 Lumno",
    subtitle: "在每台裝置延續你的設定、快捷方式與自訂桌布。",
    google: "使用 Google 繼續",
    googleSoon: "即將支援",
    github: "使用 GitHub 繼續",
    recommended: "推薦",
    emailBeta: "電子郵件驗證碼登入（內測）",
    emailLabel: "電子郵件",
    emailPlaceholder: "you@example.com",
    sendCode: "傳送驗證碼",
    codeLabel: "驗證碼",
    codePlaceholder: "輸入郵件中的 6 位驗證碼",
    verifyCode: "驗證並登入",
    codeSent: "驗證碼已傳送，請檢查電子郵件。",
    privacyPrefix: "繼續即表示你已閱讀並同意",
    privacyLink: "隱私權政策",
    privacySuffix: "。",
    checking: "正在確認登入狀態…",
    signedIn: "已登入",
    connectedAs: "目前帳號",
    signOut: "登出",
    backHome: "返回 Lumno 首頁",
    authorizeTitle: "繼續登入 Lumno 擴充功能",
    authorizeBody: "擴充功能將取得你的基本帳號資訊，並使用你的身分同步 Lumno 設定與自訂桌布。",
    authorizeRequestedBy: "申請方",
    authorizePermissions: "將分享",
    authorizeContinue: "允許並返回 Lumno",
    authorizeDeny: "取消",
    invalidAuthorization: "這次擴充功能登入請求無效或已過期，請返回擴充功能重新發起登入。",
    sessionVerified: "網頁登入狀態已驗證",
    retry: "重試",
    genericError: "操作未完成，請稍後再試。",
    providerUnavailable: "此登入方式尚未完成設定，請先使用其他方式。",
    invalidEmail: "請輸入有效的電子郵件地址。",
    invalidCode: "請輸入郵件中的 6 位驗證碼。",
  },
  en: {
    title: "Sign in to Lumno",
    subtitle: "Keep your settings, shortcuts, and custom wallpapers with you on every device.",
    google: "Continue with Google",
    googleSoon: "Coming soon",
    github: "Continue with GitHub",
    recommended: "Recommended",
    emailBeta: "Email code sign-in (preview)",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    sendCode: "Send code",
    codeLabel: "Verification code",
    codePlaceholder: "Enter the 6-digit code from your email",
    verifyCode: "Verify and sign in",
    codeSent: "We sent a verification code to your email.",
    privacyPrefix: "By continuing, you acknowledge the ",
    privacyLink: "Privacy Policy",
    privacySuffix: ".",
    checking: "Checking your sign-in status…",
    signedIn: "Signed in",
    connectedAs: "Current account",
    signOut: "Sign out",
    backHome: "Back to Lumno",
    authorizeTitle: "Continue to the Lumno extension",
    authorizeBody: "The extension will receive your basic account information and use your identity to sync Lumno settings and custom wallpapers.",
    authorizeRequestedBy: "Requested by",
    authorizePermissions: "Information shared",
    authorizeContinue: "Allow and return to Lumno",
    authorizeDeny: "Cancel",
    invalidAuthorization: "This extension sign-in request is invalid or has expired. Return to the extension and start again.",
    sessionVerified: "Web sign-in verified",
    retry: "Try again",
    genericError: "That action could not be completed. Please try again.",
    providerUnavailable: "This sign-in method is not configured yet. Please use another option.",
    invalidEmail: "Enter a valid email address.",
    invalidCode: "Enter the 6-digit code from your email.",
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getProvider(user: User): string {
  const provider = String(user.app_metadata?.provider || user.identities?.[0]?.provider || "email");
  if (provider === "github") return "GitHub";
  if (provider === "google") return "Google";
  return "Email";
}

function getDisplayName(user: User): string {
  const metadata = user.user_metadata || {};
  return String(metadata.full_name || metadata.name || metadata.user_name || user.email || "Lumno user");
}

function getAvatar(user: User): string {
  const metadata = user.user_metadata || {};
  return String(metadata.avatar_url || metadata.picture || "");
}

function formatAuthError(error: unknown, copy: Copy): string {
  const message = String((error as { message?: string } | null)?.message || error || "").toLowerCase();
  if (message.includes("provider") || message.includes("oauth")) return copy.providerUnavailable;
  if (message.includes("email") && message.includes("invalid")) return copy.invalidEmail;
  if (message.includes("token") || message.includes("otp") || message.includes("code")) return copy.invalidCode;
  return copy.genericError;
}

function getScopeLabel(scope: string, locale: Locale): string {
  const labels: Record<string, Record<Locale, string>> = {
    email: { "zh-CN": "邮箱地址", "zh-TW": "電子郵件地址", en: "Email address" },
    profile: { "zh-CN": "基础资料（名称与头像）", "zh-TW": "基本資料（名稱與頭像）", en: "Basic profile (name and avatar)" },
    openid: { "zh-CN": "账号身份标识", "zh-TW": "帳號身分識別", en: "Account identity" },
    phone: { "zh-CN": "手机号码", "zh-TW": "手機號碼", en: "Phone number" },
  };
  return labels[scope]?.[locale] || scope;
}

function LoadingMark() {
  return <span className="auth-spinner" aria-hidden="true" />;
}

export default function AccountPortal({
  locale = "zh-CN",
  authorizationId = "",
}: {
  locale?: Locale;
  authorizationId?: string;
}) {
  const copy = COPY[locale] || COPY["zh-CN"];
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState<BusyAction>("");
  const [emailExpanded, setEmailExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [authorizationReady, setAuthorizationReady] = useState(!authorizationId);
  const [authorizationDetails, setAuthorizationDetails] = useState<OAuthAuthorizationDetails | null>(null);

  useEffect(() => {
    let active = true;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user || null);
      setChecking(false);
    });

    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (!active) return;
      setUser(authError ? null : data.user);
      setChecking(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!authorizationId || !user) {
      setAuthorizationReady(!authorizationId);
      return;
    }
    let active = true;
    setAuthorizationReady(false);
    supabase.auth.oauth.getAuthorizationDetails(authorizationId).then(({ data, error: detailsError }) => {
      if (!active) return;
      if (detailsError || !data) {
        setError(copy.invalidAuthorization);
        setAuthorizationReady(true);
        return;
      }
      if ("redirect_url" in data) {
        window.location.assign(data.redirect_url);
        return;
      }
      setAuthorizationDetails(data);
      setAuthorizationReady(true);
    });
    return () => {
      active = false;
    };
  }, [authorizationId, copy, supabase, user]);

  function clearFeedback() {
    setNotice("");
    setError("");
  }

  async function continueWithProvider(provider: Extract<Provider, "google" | "github">) {
    clearFeedback();
    setBusy(provider);
    rememberAuthReturnPath(`${window.location.pathname}${window.location.search}`);
    const redirectTo = `${window.location.origin}/auth/callback/`;
    const { error: providerError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        queryParams: provider === "google" ? { prompt: "select_account" } : undefined,
      },
    });
    if (providerError) {
      setError(formatAuthError(providerError, copy));
      setBusy("");
    }
  }

  async function sendCode(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    clearFeedback();
    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError(copy.invalidEmail);
      return;
    }
    setBusy("send-code");
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: { shouldCreateUser: true },
    });
    setBusy("");
    if (otpError) {
      setError(formatAuthError(otpError, copy));
      return;
    }
    setCodeSent(true);
    setNotice(copy.codeSent);
  }

  async function verifyCode(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    clearFeedback();
    const token = code.replace(/\s+/g, "");
    if (!/^\d{6}$/.test(token)) {
      setError(copy.invalidCode);
      return;
    }
    setBusy("verify-code");
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token,
      type: "email",
    });
    setBusy("");
    if (verifyError) {
      setError(formatAuthError(verifyError, copy));
      return;
    }
    setCode("");
  }

  async function signOut() {
    clearFeedback();
    setBusy("sign-out");
    const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
    setBusy("");
    if (signOutError) setError(formatAuthError(signOutError, copy));
  }

  async function finishAuthorization(approved: boolean) {
    if (!authorizationId) return;
    clearFeedback();
    setBusy(approved ? "approve" : "deny");
    const response = approved
      ? await supabase.auth.oauth.approveAuthorization(authorizationId, { skipBrowserRedirect: true })
      : await supabase.auth.oauth.denyAuthorization(authorizationId, { skipBrowserRedirect: true });
    setBusy("");
    if (response.error) {
      setError(formatAuthError(response.error, copy));
      return;
    }
    const redirectUrl = response.data?.redirect_url;
    if (redirectUrl) window.location.assign(redirectUrl);
  }

  if (checking || (authorizationId && user && !authorizationReady)) {
    return (
      <section className="auth-card auth-card-loading" aria-live="polite">
        <LoadingMark />
        <p>{copy.checking}</p>
      </section>
    );
  }

  if (authorizationId && user && !authorizationDetails) {
    return (
      <section className="auth-card auth-card-loading" role="alert">
        <div className="auth-error-mark" aria-hidden="true"><i className="ri-close-line" /></div>
        <h1>{copy.authorizeTitle}</h1>
        <p>{error || copy.invalidAuthorization}</p>
        <a className="auth-button auth-button-primary" href="/account/">{copy.retry}</a>
      </section>
    );
  }

  if (user) {
    const avatar = getAvatar(user);
    const requestedScopes = authorizationDetails?.scope.split(/\s+/).filter(Boolean) || [];
    return (
      <section className="auth-card" aria-labelledby="account-status-title">
        <div className="auth-card-header auth-card-header-status">
          <div className="auth-success-mark" aria-hidden="true"><i className="ri-check-line" /></div>
          <div>
            <p className="auth-status-label">{authorizationId ? copy.sessionVerified : copy.signedIn}</p>
            <h1 id="account-status-title">{authorizationId ? copy.authorizeTitle : getDisplayName(user)}</h1>
          </div>
        </div>

        {authorizationId ? (
          <>
            <p className="auth-consent-copy">{copy.authorizeBody}</p>
            <div className="auth-consent-details">
              <span>{copy.authorizeRequestedBy}</span>
              <strong>{authorizationDetails?.client.name || "Lumno"}</strong>
              {requestedScopes.length ? (
                <div className="auth-consent-scopes">
                  <span>{copy.authorizePermissions}</span>
                  <ul>
                    {requestedScopes.map((scope) => (
                      <li key={scope}>
                        <span>{getScopeLabel(scope, locale)}</span>
                        <code>{scope}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </>
        ) : null}

        <div className="auth-account-row">
          <div className="auth-avatar" aria-hidden="true">
            {avatar ? <img src={avatar} alt="" referrerPolicy="no-referrer" /> : <i className="ri-user-3-line" />}
          </div>
          <div className="auth-account-copy">
            <span>{copy.connectedAs} · {getProvider(user)}</span>
            <strong>{user.email || getDisplayName(user)}</strong>
          </div>
          <span className="auth-connected-dot" aria-label={copy.signedIn} />
        </div>

        {error ? <p className="auth-feedback auth-feedback-error" role="alert">{error}</p> : null}

        {authorizationId ? (
          <div className="auth-actions auth-actions-stacked">
            <button className="auth-button auth-button-primary" type="button" onClick={() => finishAuthorization(true)} disabled={Boolean(busy)}>
              {busy === "approve" ? <LoadingMark /> : <i className="ri-arrow-right-line" aria-hidden="true" />}
              <span>{copy.authorizeContinue}</span>
            </button>
            <button className="auth-text-button" type="button" onClick={() => finishAuthorization(false)} disabled={Boolean(busy)}>
              {copy.authorizeDeny}
            </button>
          </div>
        ) : (
          <div className="auth-actions">
            <a className="auth-button auth-button-secondary" href="/">
              <i className="ri-home-5-line" aria-hidden="true" />
              <span>{copy.backHome}</span>
            </a>
            <button className="auth-button auth-button-quiet" type="button" onClick={signOut} disabled={Boolean(busy)}>
              {busy === "sign-out" ? <LoadingMark /> : <i className="ri-logout-box-r-line" aria-hidden="true" />}
              <span>{copy.signOut}</span>
            </button>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <div className="auth-card-header">
        <h1 id="auth-title">{copy.title}</h1>
        <p>{copy.subtitle}</p>
      </div>

      <div className="auth-provider-stack">
        <button className="auth-button auth-button-provider auth-button-github" type="button" onClick={() => continueWithProvider("github")} disabled={Boolean(busy)}>
          {busy === "github" ? <LoadingMark /> : <i className="ri-github-fill" aria-hidden="true" />}
          <span>{copy.github}</span>
          <small className="auth-provider-badge">{copy.recommended}</small>
          <i className="ri-arrow-right-up-line auth-button-tail" aria-hidden="true" />
        </button>
        <button className="auth-button auth-button-provider auth-button-google" type="button" disabled aria-disabled="true">
          <i className="ri-google-fill" aria-hidden="true" />
          <span>{copy.google}</span>
          <small className="auth-provider-soon">{copy.googleSoon}</small>
        </button>
      </div>

      <div className="auth-email-section" data-expanded={emailExpanded ? "true" : "false"}>
        <button className="auth-email-disclosure" type="button" aria-expanded={emailExpanded} onClick={() => setEmailExpanded((value) => !value)}>
          <span>{copy.emailBeta}</span>
          <i className="ri-arrow-down-s-line" aria-hidden="true" />
        </button>

        {emailExpanded ? (
          <div className="auth-email-panel">
            <form onSubmit={sendCode} className="auth-form" noValidate>
              <label htmlFor="lumno-auth-email">{copy.emailLabel}</label>
              <div className="auth-input-row">
                <input
                  id="lumno-auth-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  placeholder={copy.emailPlaceholder}
                  disabled={codeSent || Boolean(busy)}
                />
                <button className="auth-inline-button" type="submit" disabled={codeSent || Boolean(busy)}>
                  {busy === "send-code" ? <LoadingMark /> : copy.sendCode}
                </button>
              </div>
            </form>

            {codeSent ? (
              <form onSubmit={verifyCode} className="auth-form auth-code-form" noValidate>
                <label htmlFor="lumno-auth-code">{copy.codeLabel}</label>
                <input
                  id="lumno-auth-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(event) => setCode(event.currentTarget.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder={copy.codePlaceholder}
                  disabled={Boolean(busy)}
                />
                <button className="auth-button auth-button-primary" type="submit" disabled={Boolean(busy)}>
                  {busy === "verify-code" ? <LoadingMark /> : <i className="ri-shield-check-line" aria-hidden="true" />}
                  <span>{copy.verifyCode}</span>
                </button>
              </form>
            ) : null}
          </div>
        ) : null}
      </div>

      {notice ? <p className="auth-feedback auth-feedback-success" role="status">{notice}</p> : null}
      {error ? <p className="auth-feedback auth-feedback-error" role="alert">{error}</p> : null}

      <p className="auth-privacy-copy">
        {copy.privacyPrefix}<a href="/privacy/" target="_blank" rel="noreferrer">{copy.privacyLink}</a>{copy.privacySuffix}
      </p>
    </section>
  );
}
