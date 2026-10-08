export const DEFAULT_LOCALE = "zh-CN" as const;

export const LOCALE_CONFIG = [
  { code: "zh-CN", segment: "" },
  { code: "zh-TW", segment: "zh-tw" },
  { code: "en", segment: "en" },
] as const;

export type SupportedLocale = (typeof LOCALE_CONFIG)[number]["code"];

export const SUPPORTED_UI_LANGUAGES = LOCALE_CONFIG.map((item) => item.code) as SupportedLocale[];

function normalizeBasePath(basePath: string): string {
  const trimmed = String(basePath || "/").trim();
  if (!trimmed || trimmed === "/") return "/";
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function buildLocalizedPath(locale: SupportedLocale, basePath: string): string {
  const normalizedBasePath = normalizeBasePath(basePath);
  const config = LOCALE_CONFIG.find((item) => item.code === locale);
  if (!config || !config.segment) {
    return normalizedBasePath;
  }
  if (normalizedBasePath === "/") {
    return `/${config.segment}/`;
  }
  return `/${config.segment}${normalizedBasePath}`;
}

export function buildRouteLanguageMap(basePath: string): Record<SupportedLocale, string> {
  return Object.fromEntries(
    LOCALE_CONFIG.map((item) => [item.code, buildLocalizedPath(item.code, basePath)]),
  ) as Record<SupportedLocale, string>;
}

export function getNonDefaultLocales(): SupportedLocale[] {
  return SUPPORTED_UI_LANGUAGES.filter((locale) => locale !== DEFAULT_LOCALE);
}

export function resolveLocaleFromSegment(segment: string): SupportedLocale | null {
  const normalizedSegment = String(segment || "").trim().toLowerCase();
  const match = LOCALE_CONFIG.find((item) => item.segment === normalizedSegment);
  return match?.code || null;
}
