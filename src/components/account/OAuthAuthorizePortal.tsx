import { useMemo } from "react";
import AccountPortal from "./AccountPortal";

export default function OAuthAuthorizePortal() {
  const authorizationId = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("authorization_id") || "";
  }, []);

  if (!authorizationId) {
    return (
      <section className="auth-card auth-card-loading" role="alert">
        <div className="auth-error-mark" aria-hidden="true"><i className="ri-close-line" /></div>
        <h1>登录请求无效</h1>
        <p>请返回 Lumno 插件并重新发起登录。</p>
        <a className="auth-button auth-button-primary" href="/account/">前往账号中心</a>
      </section>
    );
  }

  return <AccountPortal authorizationId={authorizationId} />;
}
