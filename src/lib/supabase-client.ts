import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { normalizeAuthReturnPath } from "./auth-return-path.js";

export { normalizeAuthReturnPath } from "./auth-return-path.js";

const DEFAULT_SUPABASE_URL = "https://krpyocaoeqfwpepnsthc.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_mDUxTyAulyytM1LAnDYx-g_uoBOXBnp";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;

  const projectUrl = String(import.meta.env.PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
  const publishableKey = String(
    import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_PUBLISHABLE_KEY,
  ).trim();

  browserClient = createClient(projectUrl, publishableKey, {
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: "lumno-web-auth-v1",
    },
  });

  return browserClient;
}

export function rememberAuthReturnPath(path: string): void {
  if (typeof window === "undefined") return;
  const value = normalizeAuthReturnPath(path);
  window.sessionStorage.setItem("lumno-auth-return-path", value);
}

export function consumeAuthReturnPath(): string {
  if (typeof window === "undefined") return "/account/";
  const stored = window.sessionStorage.getItem("lumno-auth-return-path") || "/account/";
  window.sessionStorage.removeItem("lumno-auth-return-path");
  return normalizeAuthReturnPath(stored);
}
