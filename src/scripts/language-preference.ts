import { resolveInitialLanguageMode } from "../lib/language-preference.js";

type InitialLanguageModeInput = {
  forcedLocale?: string | null;
  storedMode?: string | null;
  systemMode?: string | null;
};

function getStoredLanguageMode(storageKey: string): string {
  try {
    return String(window.localStorage.getItem(storageKey) || "").trim();
  } catch (_error) {
    return "";
  }
}

function resolvePageInitialLanguageMode(input: InitialLanguageModeInput): string {
  return resolveInitialLanguageMode({
    forcedLocale: input.forcedLocale || "",
    storedMode: input.storedMode || "",
    systemMode: input.systemMode || "",
  });
}

window.__lumnoLanguagePreference = {
  getStoredLanguageMode,
  resolveInitialLanguageMode: resolvePageInitialLanguageMode,
};

window.dispatchEvent(new CustomEvent("lumno:language-preference-ready"));

declare global {
  interface Window {
    __lumnoLanguagePreference: {
      getStoredLanguageMode(storageKey: string): string;
      resolveInitialLanguageMode(input: InitialLanguageModeInput): string;
    };
  }
}
