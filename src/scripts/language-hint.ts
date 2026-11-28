import {
  LANGUAGE_HINT_STATE_KEY,
  markHintDeclined,
  markHintShown,
  mayShowHint,
  pickHintLocale,
  toSiteLocale,
  type LanguageHintState,
} from "../lib/language-hint.ts";
import type { SupportedLocale } from "../lib/locales.ts";

/*
 * Drives the language suggestion (components/LanguageHint.astro).
 *
 * It stays out of the way:
 * - Nothing shows when the browser lists the page's language anywhere among
 *   the reader's languages, when the reader has already picked a language in
 *   the language menu, in a frame, for crawlers, or in an automated browser.
 * - It appears a moment after the page (after the homepage intro, where one
 *   plays), in the bottom corner, and never takes focus.
 * - Shown and left alone, it waits a day before showing again; turned down
 *   ("Not now", the close button or Escape) it waits 7 days, then 30, and after
 *   the third time it stops offering that language.
 * - Without localStorage it cannot keep count, so it shows nothing.
 *
 * Switching saves the language the way the language menu does, so later pages
 * open in it.
 */

/** The language menu's saved choice (see the language runtime). */
const CHOICE_KEY = "_x_extension_language_2024_unique_";
const DELAY = 1500;
const LEAVE_MS = 220;

/** In each language: the offer, the switch, turning it down, closing. */
const TEXT: Record<SupportedLocale, [string, string, string, string]> = {
  "zh-CN": ["本页面有简体中文版本", "切换到简体中文", "暂不切换", "关闭"],
  "zh-TW": ["本頁面有繁體中文版本", "切換到繁體中文", "暫不切換", "關閉"],
  en: ["This page is available in English.", "Switch to English", "Not now", "Close"],
  ja: ["このページは日本語でもご覧いただけます。", "日本語に切り替える", "今はしない", "閉じる"],
  ko: ["이 페이지는 한국어로도 볼 수 있습니다.", "한국어로 전환", "나중에", "닫기"],
  de: ["Diese Seite gibt es auch auf Deutsch.", "Auf Deutsch wechseln", "Jetzt nicht", "Schließen"],
  fr: ["Cette page est disponible en français.", "Passer en français", "Pas maintenant", "Fermer"],
  es: ["Esta página está disponible en español.", "Cambiar a español", "Ahora no", "Cerrar"],
  "pt-BR": ["Esta página está disponível em português.", "Mudar para português", "Agora não", "Fechar"],
  ru: ["Эта страница доступна на русском языке.", "Перейти на русский", "Не сейчас", "Закрыть"],
};

const storage = (() => {
  try {
    const probe = "__lumno";
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch (_error) {
    return null;
  }
})();

function readState(): LanguageHintState | null {
  try {
    return JSON.parse(storage?.getItem(LANGUAGE_HINT_STATE_KEY) || "null");
  } catch (_error) {
    return null;
  }
}

function writeState(state: LanguageHintState) {
  try {
    storage?.setItem(LANGUAGE_HINT_STATE_KEY, JSON.stringify(state));
  } catch (_error) {
    // Full or blocked storage.
  }
}

/** This page's other languages, from its hreflang links, with the path of each. */
function alternates(): Map<SupportedLocale, string> {
  const paths = new Map<SupportedLocale, string>();
  document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
    if (link.hreflang === "x-default") return;
    const locale = toSiteLocale(link.hreflang);
    if (!locale || paths.has(locale)) return;
    try {
      paths.set(locale, new URL(link.href, window.location.href).pathname);
    } catch (_error) {}
  });
  return paths;
}

function hasSavedChoice(): boolean {
  const saved = String(storage?.getItem(CHOICE_KEY) || "").trim().toLowerCase();
  return Boolean(saved) && saved !== "system";
}

function show(target: SupportedLocale, path: string) {
  const template = document.getElementById("lang-hint-template") as HTMLTemplateElement | null;
  const card = template?.content.firstElementChild?.cloneNode(true) as HTMLElement | undefined;
  if (!card) return;

  const [offer, go, stay, close] = TEXT[target];
  const state = markHintShown(readState(), target, Date.now());
  writeState(state);

  card.lang = target;
  card.setAttribute("aria-label", offer);
  card.querySelector(".lang-hint__text")!.textContent = offer;
  const link = card.querySelector<HTMLAnchorElement>("[data-lang-hint-go]")!;
  link.textContent = go;
  link.href = `${path}${window.location.search}${window.location.hash}`;
  link.hreflang = target;
  const stayButton = card.querySelector<HTMLButtonElement>("[data-lang-hint-stay]")!;
  stayButton.textContent = stay;
  const closeButton = card.querySelector<HTMLButtonElement>("[data-lang-hint-close]")!;
  closeButton.setAttribute("aria-label", close);
  closeButton.title = close;

  let gone = false;
  const leave = () => {
    if (gone) return;
    gone = true;
    document.removeEventListener("keydown", onKey);
    card.dataset.leaving = "";
    delete document.body.dataset.langHint;
    window.setTimeout(() => card.remove(), LEAVE_MS);
  };
  const decline = () => {
    writeState(markHintDeclined(readState() || state, target, Date.now()));
    leave();
  };
  // Escape closes an open menu or dialog first; only a bare Escape reaches the card.
  const onKey = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || event.defaultPrevented) return;
    if (document.querySelector('dialog[open], [aria-expanded="true"], [aria-modal="true"]')) return;
    decline();
  };

  link.addEventListener("click", () => {
    try {
      storage?.setItem(CHOICE_KEY, target);
      // A new card starts from scratch if the reader comes back to this language.
      storage?.removeItem(LANGUAGE_HINT_STATE_KEY);
    } catch (_error) {}
    leave();
  });
  stayButton.addEventListener("click", decline);
  closeButton.addEventListener("click", decline);
  document.addEventListener("keydown", onKey);

  document.body.dataset.langHint = target;
  document.body.append(card);
}

function start() {
  if (!storage || window.top !== window || navigator.webdriver) return;
  if (document.documentElement.hasAttribute("data-crawler") || hasSavedChoice()) return;
  const page = toSiteLocale(document.documentElement.lang);
  if (!page) return;
  const paths = alternates();
  const browserTags = navigator.languages?.length ? navigator.languages : [navigator.language];
  const target = pickHintLocale(page, browserTags, [...paths.keys()]);
  const path = target && paths.get(target);
  if (!target || !path || !mayShowHint(readState(), target, Date.now())) return;
  show(target, path);
}

/** The homepage hides everything else while its intro plays; wait for it to finish. */
function afterIntro(callback: () => void) {
  const introDone = () =>
    !document.documentElement.hasAttribute("data-home-intro-js") || document.body.dataset.homeIntro === "complete";
  if (introDone()) {
    callback();
    return;
  }
  const observer = new MutationObserver(() => {
    if (!introDone()) return;
    observer.disconnect();
    callback();
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ["data-home-intro"] });
  // The page drops the intro altogether when the demo never loads.
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-home-intro-js"] });
}

afterIntro(() => window.setTimeout(start, DELAY));
