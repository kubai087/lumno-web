import { useEffect, useMemo, useState } from "react";
import type { OAuthAuthorizationDetails, Provider, User } from "@supabase/supabase-js";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CircleAlertIcon,
  HomeIcon,
  LogOutIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  getSupabaseBrowserClient,
  rememberAuthReturnPath,
} from "../../lib/supabase-client";

type Locale = "zh-CN" | "zh-TW" | "en";
type BusyAction = "google" | "github" | "sign-out" | "delete-account" | "approve" | "deny" | "";

type Copy = {
  title: string;
  subtitle: string;
  google: string;
  github: string;
  recommended: string;
  providerRule: string;
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
  mainlandTitle: string;
  mainlandBody: string;
  mainlandCheck: string;
  mainlandLink: string;
  mainlandRequired: string;
  deleteTitle: string;
  deleteDescription: string;
  deleteOpen: string;
  deleteLabel: string;
  deletePlaceholder: string;
  deleteAction: string;
  deleteDone: string;
};

const COPY: Record<Locale, Copy> = {
  "zh-CN": {
    title: "登录 Lumno",
    subtitle: "在每台设备继续你的设置、快捷方式与自定义壁纸。",
    google: "使用 Google 继续",
    github: "使用 GitHub 继续",
    recommended: "推荐",
    providerRule: "Google 与 GitHub 都可以登录 Lumno；如果两者使用同一个已验证邮箱，系统会自动合并到同一账号。",
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
    mainlandTitle: "中国大陆用户单独告知",
    mainlandBody: "账号、同步配置和自定义壁纸将跨境传输至 Supabase 日本东京区域，并可能由登录与基础设施服务商处理。",
    mainlandCheck: "若我位于中国大陆，我已满 14 周岁，并单独同意上述跨境处理；未满 14 周岁请勿开启云功能。",
    mainlandLink: "查看接收方、数据类型与权利详情",
    mainlandRequired: "请先阅读并单独同意中国大陆跨境处理告知。",
    deleteTitle: "永久删除账号",
    deleteDescription: "删除云端配置、自定义媒体、账号关联统计和登录身份。本机配置与 Chrome 同步副本不会自动删除。",
    deleteOpen: "删除账号",
    deleteLabel: "输入 DELETE 以确认",
    deletePlaceholder: "DELETE",
    deleteAction: "永久删除",
    deleteDone: "账号和云端数据已删除。",
  },
  "zh-TW": {
    title: "登入 Lumno",
    subtitle: "在每台裝置延續你的設定、快捷方式與自訂桌布。",
    google: "使用 Google 繼續",
    github: "使用 GitHub 繼續",
    recommended: "推薦",
    providerRule: "Google 與 GitHub 都可以登入 Lumno；如果兩者使用同一個已驗證電子郵件，系統會自動合併至同一帳號。",
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
    mainlandTitle: "中國大陸使用者單獨告知",
    mainlandBody: "帳號、同步設定與自訂桌布將跨境傳輸至 Supabase 日本東京區域，並可能由登入與基礎設施服務商處理。",
    mainlandCheck: "若我位於中國大陸，我已滿 14 歲，並單獨同意上述跨境處理；未滿 14 歲請勿啟用雲端功能。",
    mainlandLink: "查看接收方、資料類型與權利詳情",
    mainlandRequired: "請先閱讀並單獨同意中國大陸跨境處理告知。",
    deleteTitle: "永久刪除帳號",
    deleteDescription: "刪除雲端設定、自訂媒體、帳號關聯統計與登入身分。本機設定與 Chrome 同步副本不會自動刪除。",
    deleteOpen: "刪除帳號",
    deleteLabel: "輸入 DELETE 以確認",
    deletePlaceholder: "DELETE",
    deleteAction: "永久刪除",
    deleteDone: "帳號與雲端資料已刪除。",
  },
  en: {
    title: "Sign in to Lumno",
    subtitle: "Keep your settings, shortcuts, and custom wallpapers with you on every device.",
    google: "Continue with Google",
    github: "Continue with GitHub",
    recommended: "Recommended",
    providerRule: "You can sign in with Google or GitHub. If both use the same verified email, they are automatically linked to one Lumno account.",
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
    mainlandTitle: "Notice for users in mainland China",
    mainlandBody: "Account data, synced settings, and custom wallpapers are transferred to Supabase's Tokyo region and may be handled by authentication and infrastructure providers.",
    mainlandCheck: "If I am in mainland China, I confirm that I am at least 14 and separately consent to this cross-border processing. Users under 14 must not enable cloud features.",
    mainlandLink: "View recipients, data categories, and rights",
    mainlandRequired: "Review and separately consent to the mainland China cross-border notice first.",
    deleteTitle: "Permanently delete account",
    deleteDescription: "Deletes cloud settings, custom media, account-linked analytics, and your login identity. Local settings and Chrome Sync copies are not automatically deleted.",
    deleteOpen: "Delete account",
    deleteLabel: "Type DELETE to confirm",
    deletePlaceholder: "DELETE",
    deleteAction: "Delete permanently",
    deleteDone: "Your account and cloud data were deleted.",
  },
};

const MAINLAND_NOTICE_VERSION = "2026-08-02";
const MAINLAND_NOTICE_STORAGE_KEY = "lumno-mainland-cross-border-consent-v1";

function getProvider(user: User): string {
  const providers = [
    user.app_metadata?.provider,
    ...(user.identities || []).map((identity) => identity.provider),
  ].map((provider) => String(provider || "").toLowerCase());
  if (providers.includes("github") && providers.includes("google")) return "Google + GitHub";
  if (providers.includes("github")) return "GitHub";
  if (providers.includes("google")) return "Google";
  return "Lumno";
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

function LoadingMark({ label }: { label: string }) {
  return <Spinner data-icon="inline-start" aria-label={label} />;
}

function AuthFeedback({
  message,
  tone,
}: {
  message: string;
  tone: "error" | "success";
}) {
  return (
    <Alert
      variant={tone === "error" ? "destructive" : "default"}
      role={tone === "error" ? "alert" : "status"}
    >
      {tone === "error" ? <CircleAlertIcon /> : <ShieldCheckIcon />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
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
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [authorizationReady, setAuthorizationReady] = useState(!authorizationId);
  const [authorizationDetails, setAuthorizationDetails] = useState<OAuthAuthorizationDetails | null>(null);
  const [mainlandConsentAccepted, setMainlandConsentAccepted] = useState(locale !== "zh-CN");
  const [deleteExpanded, setDeleteExpanded] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

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

  useEffect(() => {
    if (locale !== "zh-CN") return;
    setMainlandConsentAccepted(
      window.sessionStorage.getItem(MAINLAND_NOTICE_STORAGE_KEY) === MAINLAND_NOTICE_VERSION,
    );
  }, [locale]);

  useEffect(() => {
    if (!user || locale !== "zh-CN" || !mainlandConsentAccepted) return;
    const timestamp = new Date().toISOString();
    void supabase.from("lumno_consents").upsert({
      user_id: user.id,
      privacy_notice_version: MAINLAND_NOTICE_VERSION,
      mainland_cross_border_terms_version: MAINLAND_NOTICE_VERSION,
      mainland_cross_border_consented_at: timestamp,
      mainland_age_confirmation_version: MAINLAND_NOTICE_VERSION,
      mainland_age_confirmed_at: timestamp,
    }, { onConflict: "user_id" });
  }, [locale, mainlandConsentAccepted, supabase, user]);

  function clearFeedback() {
    setNotice("");
    setError("");
  }

  function ensureMainlandConsent(): boolean {
    if (locale !== "zh-CN" || mainlandConsentAccepted) return true;
    setError(copy.mainlandRequired);
    return false;
  }

  function updateMainlandConsent(accepted: boolean) {
    setMainlandConsentAccepted(accepted);
    if (accepted) {
      window.sessionStorage.setItem(MAINLAND_NOTICE_STORAGE_KEY, MAINLAND_NOTICE_VERSION);
      if (error === copy.mainlandRequired) setError("");
    } else {
      window.sessionStorage.removeItem(MAINLAND_NOTICE_STORAGE_KEY);
    }
  }

  async function continueWithProvider(provider: Extract<Provider, "google" | "github">) {
    clearFeedback();
    if (!ensureMainlandConsent()) return;
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
    if (approved && !ensureMainlandConsent()) return;
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

  async function deleteAccount() {
    clearFeedback();
    if (deleteConfirmation !== "DELETE") return;
    setBusy("delete-account");
    const { error: deleteError } = await supabase.functions.invoke("delete-account", {
      body: { confirmation: "DELETE" },
    });
    if (deleteError) {
      setBusy("");
      setError(formatAuthError(deleteError, copy));
      return;
    }
    await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
    setBusy("");
    setUser(null);
    setNotice(copy.deleteDone);
  }

  const generalError = error;
  const mainlandNotice = locale === "zh-CN" ? (
    <div className="auth-mainland-notice">
      <div>
        <strong>{copy.mainlandTitle}</strong>
        <p>{copy.mainlandBody}</p>
        <a href="/privacy/#mainland-china-notice" target="_blank" rel="noreferrer">
          {copy.mainlandLink}
        </a>
      </div>
      <label>
        <input
          type="checkbox"
          checked={mainlandConsentAccepted}
          onChange={(event) => updateMainlandConsent(event.currentTarget.checked)}
          disabled={Boolean(busy)}
        />
        <span>{copy.mainlandCheck}</span>
      </label>
    </div>
  ) : null;

  if (checking || (authorizationId && user && !authorizationReady)) {
    return (
      <Card className="auth-card" aria-live="polite">
        <CardContent className="flex min-h-64 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
          <LoadingMark label={copy.checking} />
          <p>{copy.checking}</p>
        </CardContent>
      </Card>
    );
  }

  if (authorizationId && user && !authorizationDetails) {
    return (
      <Card className="auth-card" role="alert">
        <CardHeader className="auth-card-header flex flex-col items-center text-center">
          <span className="auth-error-mark" aria-hidden="true">
            <CircleAlertIcon />
          </span>
          <CardTitle>
            <h1>{copy.authorizeTitle}</h1>
          </CardTitle>
          <CardDescription>{error || copy.invalidAuthorization}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button asChild size="auth">
            <a href="/account/">
              <RefreshCwIcon data-icon="inline-start" />
              {copy.retry}
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (user) {
    const avatar = getAvatar(user);
    const requestedScopes = authorizationDetails?.scope.split(/\s+/).filter(Boolean) || [];
    return (
      <Card className="auth-card" aria-labelledby="account-status-title">
        <CardHeader className="auth-card-header auth-card-header-status flex flex-row">
          <span className="auth-success-mark" aria-hidden="true">
            <CheckIcon />
          </span>
          <div className="min-w-0">
            <Badge variant="secondary" className="auth-status-label">
              {authorizationId ? copy.sessionVerified : copy.signedIn}
            </Badge>
            <CardTitle>
              <h1 id="account-status-title">
                {authorizationId ? copy.authorizeTitle : getDisplayName(user)}
              </h1>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="grid gap-5">
          {authorizationId ? (
            <div className="grid gap-4">
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
            </div>
          ) : null}

          <div className="auth-account-row">
            <Avatar size="lg" className="auth-avatar">
              {avatar ? (
                <AvatarImage src={avatar} alt="" referrerPolicy="no-referrer" />
              ) : null}
              <AvatarFallback>
                <UserIcon aria-hidden="true" />
              </AvatarFallback>
            </Avatar>
            <div className="auth-account-copy">
              <span>{copy.connectedAs} · {getProvider(user)}</span>
              <strong>{user.email || getDisplayName(user)}</strong>
            </div>
            <span className="auth-connected-dot" aria-label={copy.signedIn} />
          </div>

          {mainlandNotice}

          {!authorizationId ? (
            <div className="auth-danger-zone">
              <div>
                <strong>{copy.deleteTitle}</strong>
                <p>{copy.deleteDescription}</p>
              </div>
              {!deleteExpanded ? (
                <Button variant="outline" type="button" onClick={() => setDeleteExpanded(true)}>
                  <Trash2Icon data-icon="inline-start" />
                  {copy.deleteOpen}
                </Button>
              ) : (
                <Field data-invalid={Boolean(deleteConfirmation) && deleteConfirmation !== "DELETE"}>
                  <FieldLabel htmlFor="lumno-delete-confirmation">{copy.deleteLabel}</FieldLabel>
                  <div className="auth-input-row">
                    <Input
                      id="lumno-delete-confirmation"
                      value={deleteConfirmation}
                      onChange={(event) => setDeleteConfirmation(event.currentTarget.value)}
                      placeholder={copy.deletePlaceholder}
                      autoComplete="off"
                      disabled={Boolean(busy)}
                    />
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={deleteAccount}
                      disabled={Boolean(busy) || deleteConfirmation !== "DELETE"}
                    >
                      {busy === "delete-account" ? <LoadingMark label={copy.deleteAction} /> : <Trash2Icon data-icon="inline-start" />}
                      {copy.deleteAction}
                    </Button>
                  </div>
                </Field>
              )}
            </div>
          ) : null}

          {error ? <AuthFeedback message={error} tone="error" /> : null}
        </CardContent>

        <CardFooter className={authorizationId ? "grid gap-2" : "grid grid-cols-2 gap-2 max-[520px]:grid-cols-1"}>
          {authorizationId ? (
            <>
              <Button size="auth" type="button" onClick={() => finishAuthorization(true)} disabled={Boolean(busy)}>
                {busy === "approve" ? (
                  <LoadingMark label={copy.authorizeContinue} />
                ) : (
                  <ArrowRightIcon data-icon="inline-start" />
                )}
                {copy.authorizeContinue}
              </Button>
              <Button variant="ghost" type="button" onClick={() => finishAuthorization(false)} disabled={Boolean(busy)}>
                {copy.authorizeDeny}
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="secondary" size="auth">
                <a href="/">
                  <HomeIcon data-icon="inline-start" />
                  {copy.backHome}
                </a>
              </Button>
              <Button variant="outline" size="auth" type="button" onClick={signOut} disabled={Boolean(busy)}>
                {busy === "sign-out" ? (
                  <LoadingMark label={copy.signOut} />
                ) : (
                  <LogOutIcon data-icon="inline-start" />
                )}
                {copy.signOut}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="auth-card" aria-labelledby="auth-title">
      <CardHeader className="auth-card-header">
        <CardTitle>
          <h1 id="auth-title">{copy.title}</h1>
        </CardTitle>
        <CardDescription>{copy.subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5">
        {mainlandNotice}

        <div className="auth-provider-stack">
          <Button className="auth-button-provider auth-button-google" variant="outline" size="auth" type="button" onClick={() => continueWithProvider("google")} disabled={Boolean(busy)}>
            {busy === "google" ? (
              <LoadingMark label={copy.google} />
            ) : (
              <i className="ri-google-fill auth-provider-brand" data-icon="inline-start" aria-hidden="true" />
            )}
            <span>{copy.google}</span>
            <Badge className="auth-provider-badge" variant="secondary">{copy.recommended}</Badge>
            <ArrowUpRightIcon className="auth-button-tail" data-icon="inline-end" aria-hidden="true" />
          </Button>
          <Button className="auth-button-provider auth-button-github" variant="outline" size="auth" type="button" onClick={() => continueWithProvider("github")} disabled={Boolean(busy)}>
            {busy === "github" ? (
              <LoadingMark label={copy.github} />
            ) : (
              <i className="ri-github-fill auth-provider-brand" data-icon="inline-start" aria-hidden="true" />
            )}
            <span>{copy.github}</span>
            <ArrowUpRightIcon className="auth-button-tail" data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
        <p className="auth-provider-rule">{copy.providerRule}</p>

        {notice ? <AuthFeedback message={notice} tone="success" /> : null}
        {generalError ? <AuthFeedback message={generalError} tone="error" /> : null}
      </CardContent>

      <CardFooter className="justify-center text-center">
        <p className="auth-privacy-copy">
          {copy.privacyPrefix}<a href="/privacy/" target="_blank" rel="noreferrer">{copy.privacyLink}</a>{copy.privacySuffix}
        </p>
      </CardFooter>
    </Card>
  );
}
