const SAFE_ACCOUNT_PATHS = new Set([
  "/account/",
  "/en/account/",
  "/zh-tw/account/",
]);

export function normalizeAuthReturnPath(path) {
  const value = String(path || "").trim();
  if (!value.startsWith("/") || value.startsWith("//")) return "/account/";
  if (SAFE_ACCOUNT_PATHS.has(value) || value.startsWith("/oauth/authorize/")) return value;
  return "/account/";
}
