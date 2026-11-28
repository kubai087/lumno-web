import { SUPPORTED_UI_LANGUAGES, normalizeLocaleTag, type SupportedLocale } from "./locales.ts";

/*
 * The rules behind the language suggestion (components/LanguageHint.astro).
 * Pure functions, so tests can run them without a browser.
 */

export const LANGUAGE_HINT_STATE_KEY = "lumno:lang-hint";

const DAY = 24 * 60 * 60 * 1000;
/** Wait after the first and second "Not now"; the third stops offering that language. */
const DECLINE_COOLDOWNS = [7 * DAY, 30 * DAY];
/** Shown and left alone, the card waits this long, so moving between pages shows it once. */
const SHOWN_GAP = DAY;

export type LanguageHintState = {
  locale: SupportedLocale;
  declined: number;
  declinedAt?: number;
  shownAt?: number;
};

/** A browser or page language tag as a site locale, or null when the site doesn't have it. */
export function toSiteLocale(tag: string | null | undefined): SupportedLocale | null {
  const locale = normalizeLocaleTag(String(tag || ""), SUPPORTED_UI_LANGUAGES, "");
  return (locale as SupportedLocale) || null;
}

/**
 * The language to offer, or null. Nothing is offered when the reader's
 * browser lists the page's language anywhere among theirs; otherwise the
 * first of their languages that this page is available in.
 */
export function pickHintLocale(
  pageLocale: SupportedLocale,
  browserTags: readonly string[],
  available: ReadonlySet<SupportedLocale> | readonly SupportedLocale[],
): SupportedLocale | null {
  const readable = browserTags.map(toSiteLocale).filter((locale): locale is SupportedLocale => Boolean(locale));
  if (!readable.length || readable.includes(pageLocale)) return null;
  const offered = new Set(available);
  return readable.find((locale) => offered.has(locale)) || null;
}

/** Whether the card may show for `locale` now, given what was stored last time. */
export function mayShowHint(state: LanguageHintState | null, locale: SupportedLocale, now: number): boolean {
  if (!state || state.locale !== locale) return true;
  const declined = state.declined || 0;
  if (declined > DECLINE_COOLDOWNS.length) return false;
  if (declined && now < (state.declinedAt || 0) + DECLINE_COOLDOWNS[declined - 1]) return false;
  return !(state.shownAt && now < state.shownAt + SHOWN_GAP);
}

/** The stored state after the card shows. A different language starts a fresh count. */
export function markHintShown(state: LanguageHintState | null, locale: SupportedLocale, now: number): LanguageHintState {
  const base = state?.locale === locale ? state : { locale, declined: 0 };
  return { ...base, shownAt: now };
}

/** The stored state after the reader turns the card down. */
export function markHintDeclined(state: LanguageHintState | null, locale: SupportedLocale, now: number): LanguageHintState {
  const base = state?.locale === locale ? state : { locale, declined: 0 };
  return { ...base, declined: (base.declined || 0) + 1, declinedAt: now };
}
