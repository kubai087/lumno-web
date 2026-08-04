import { useEffect, useState } from "react";
import {
  clearDeleteStepUp,
  consumeAuthReturnPath,
  consumeDeleteStepUpReturnPath,
  getSupabaseBrowserClient,
  getSupabaseDeleteStepUpClient,
  isDeleteStepUpPending,
} from "../../lib/supabase-client";

type CallbackState = "working" | "error";

export default function AuthCallback() {
  const [state, setState] = useState<CallbackState>("working");

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code") || "";
    const deleteStepUp = isDeleteStepUpPending();
    if (!code) {
      if (deleteStepUp) clearDeleteStepUp();
      setState("error");
      return;
    }

    const authClient = deleteStepUp ? getSupabaseDeleteStepUpClient() : getSupabaseBrowserClient();
    authClient.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (!active) return;
      if (error) {
        if (deleteStepUp) clearDeleteStepUp();
        setState("error");
        return;
      }
      const returnPath = deleteStepUp
        ? `${consumeDeleteStepUpReturnPath()}?delete_step_up=1`
        : consumeAuthReturnPath();
      window.location.replace(returnPath);
    }).catch(() => {
      if (!active) return;
      if (deleteStepUp) clearDeleteStepUp();
      setState("error");
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="auth-card auth-card-loading" aria-live="polite">
      {state === "working" ? (
        <>
          <span className="auth-spinner" aria-hidden="true" />
          <h1>正在完成登录</h1>
          <p>验证完成后会自动返回 Lumno。</p>
        </>
      ) : (
        <>
          <div className="auth-error-mark" aria-hidden="true"><i className="ri-close-line" /></div>
          <h1>登录没有完成</h1>
          <p>授权链接可能已过期，请返回登录页重新开始。</p>
          <a className="auth-button auth-button-primary" href="/account/">返回登录页</a>
        </>
      )}
    </section>
  );
}
