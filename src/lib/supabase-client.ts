import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { normalizeAuthReturnPath } from "./auth-return-path.js";

export { normalizeAuthReturnPath } from "./auth-return-path.js";

const DEFAULT_SUPABASE_URL = "https://krpyocaoeqfwpepnsthc.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_mDUxTyAulyytM1LAnDYx-g_uoBOXBnp";

let browserClient: SupabaseClient | null = null;
let deleteStepUpClient: SupabaseClient | null = null;
const DELETE_STEP_UP_PENDING_KEY = "lumno-delete-step-up-pending";
const DELETE_STEP_UP_RETURN_KEY = "lumno-delete-step-up-return";

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

export function getSupabaseDeleteStepUpClient(): SupabaseClient {
  if (deleteStepUpClient) return deleteStepUpClient;
  const projectUrl = String(import.meta.env.PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
  const publishableKey = String(
    import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_PUBLISHABLE_KEY,
  ).trim();
  deleteStepUpClient = createClient(projectUrl, publishableKey, {
    auth: {
      flowType: "pkce",
      persistSession: true,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey: "lumno-web-delete-step-up-v1",
    },
  });
  return deleteStepUpClient;
}

export function rememberDeleteStepUp(returnPath: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(DELETE_STEP_UP_PENDING_KEY, "1");
  window.sessionStorage.setItem(DELETE_STEP_UP_RETURN_KEY, normalizeAuthReturnPath(returnPath));
}

export function isDeleteStepUpPending(): boolean {
  return typeof window !== "undefined" &&
    window.sessionStorage.getItem(DELETE_STEP_UP_PENDING_KEY) === "1";
}

export function clearDeleteStepUp(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(DELETE_STEP_UP_PENDING_KEY);
  window.sessionStorage.removeItem(DELETE_STEP_UP_RETURN_KEY);
}

export function consumeDeleteStepUpReturnPath(): string {
  if (typeof window === "undefined") return "/account/";
  const stored = normalizeAuthReturnPath(
    window.sessionStorage.getItem(DELETE_STEP_UP_RETURN_KEY) || "/account/",
  );
  window.sessionStorage.removeItem(DELETE_STEP_UP_PENDING_KEY);
  window.sessionStorage.removeItem(DELETE_STEP_UP_RETURN_KEY);
  return stored;
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
