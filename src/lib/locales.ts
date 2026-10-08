export const DEFAULT_LOCALE = "zh-CN" as const;

/**
 * Every site language, in language-menu order.
 * - `segment`: the URL prefix (`/ja/…`); empty for the default route.
 * - `label`: the language's own name, shown in menus whatever the page language.
 * - `script`: "cjk" pages keep CJK line breaking and sans headings; "alphabetic"
 *   pages (Latin and Cyrillic) use the editorial serif for headings.
 * - `extensionLocale`: the language the extension itself shows these visitors. It
 *   ships zh-CN, zh-TW, en and ja; everyone else gets English, so illustrations of
 *   the extension's own UI use that language rather than promising a translation.
 */
export const LOCALE_CONFIG = [
  { code: "zh-CN", segment: "", label: "简体中文", ogLocale: "zh_CN", script: "cjk", extensionLocale: "zh-CN" },
  { code: "zh-TW", segment: "zh-tw", label: "繁體中文", ogLocale: "zh_TW", script: "cjk", extensionLocale: "zh-TW" },
  { code: "en", segment: "en", label: "English", ogLocale: "en_US", script: "alphabetic", extensionLocale: "en" },
  { code: "ja", segment: "ja", label: "日本語", ogLocale: "ja_JP", script: "cjk", extensionLocale: "ja" },
  { code: "ko", segment: "ko", label: "한국어", ogLocale: "ko_KR", script: "cjk", extensionLocale: "en" },
  { code: "de", segment: "de", label: "Deutsch", ogLocale: "de_DE", script: "alphabetic", extensionLocale: "en" },
  { code: "fr", segment: "fr", label: "Français", ogLocale: "fr_FR", script: "alphabetic", extensionLocale: "en" },
  { code: "es", segment: "es", label: "Español", ogLocale: "es_ES", script: "alphabetic", extensionLocale: "en" },
  { code: "pt-BR", segment: "pt-br", label: "Português (Brasil)", ogLocale: "pt_BR", script: "alphabetic", extensionLocale: "en" },
  { code: "ru", segment: "ru", label: "Русский", ogLocale: "ru_RU", script: "alphabetic", extensionLocale: "en" },
] as const;

export type SupportedLocale = (typeof LOCALE_CONFIG)[number]["code"];
export type ExtensionLocale = (typeof LOCALE_CONFIG)[number]["extensionLocale"];
export type LocaleScript = (typeof LOCALE_CONFIG)[number]["script"];

export const SUPPORTED_UI_LANGUAGES = LOCALE_CONFIG.map((item) => item.code) as SupportedLocale[];

/** Locales with their own renders of the extension (homepage parallax shots). */
const SCREENSHOT_LOCALES: readonly SupportedLocale[] = ["zh-CN", "zh-TW", "en"];

function getLocaleConfig(locale: SupportedLocale) {
  return LOCALE_CONFIG.find((item) => item.code === locale) || LOCALE_CONFIG[0];
}

export function getLocaleLabel(locale: SupportedLocale): string {
  return getLocaleConfig(locale).label;
}

export function getLocaleScript(locale: SupportedLocale): LocaleScript {
  return getLocaleConfig(locale).script;
}

export function getExtensionLocale(locale: SupportedLocale): ExtensionLocale {
  return getLocaleConfig(locale).extensionLocale;
}

export function getScreenshotLocale(locale: SupportedLocale): SupportedLocale {
  if (SCREENSHOT_LOCALES.includes(locale)) return locale;
  const extensionLocale = getExtensionLocale(locale);
  return SCREENSHOT_LOCALES.includes(extensionLocale) ? extensionLocale : "en";
}

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

/** Strips a locale prefix (`/pt-br/privacy/` → `/privacy/`). */
export function stripLocaleSegment(path: string): string {
  const segments = LOCALE_CONFIG.map((item) => item.segment).filter(Boolean);
  return path.replace(new RegExp(`^/(?:${segments.join("|")})(?=/)`, "i"), "") || "/";
}

/**
 * Maps any BCP 47 tag (navigator.language, a stored choice) to one of `codes`;
 * unknown languages get `fallback`. It references nothing outside itself, so
 * LocaleNormalizer.astro can inline its source for scripts that run before paint.
 */
export function normalizeLocaleTag(value: string, codes: readonly string[], fallback: string): string {
  const raw = String(value || "").trim().toLowerCase().replace(/_/g, "-");
  if (!raw) return fallback;
  if (raw === "zh" || raw.startsWith("zh-")) {
    return /^zh-(?:tw|hk|mo|hant)/.test(raw) || raw.includes("-hant") ? "zh-TW" : "zh-CN";
  }
  const exact = codes.find((code) => code.toLowerCase() === raw);
  if (exact) return exact;
  const base = raw.split("-")[0];
  return codes.find((code) => code.toLowerCase().split("-")[0] === base) || fallback;
}
