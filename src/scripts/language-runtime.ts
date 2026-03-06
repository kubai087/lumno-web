type LanguageRuntimeOptions = {
  getSystemLocale: () => string;
  normalizeLanguageMode: (mode: string) => string;
  routeLanguageMap: Record<string, string>;
  languageStorageKey: string;
  forcedLocale?: string | null;
  shouldRedirect?: (normalizedMode: string) => boolean;
  applyResolvedLanguage: (normalizedMode: string) => void;
};

type ApplyLanguageModeOptions = {
  persist?: boolean;
};

function persistLanguageMode(storageKey: string, normalizedMode: string) {
  try {
    window.localStorage.setItem(storageKey, normalizedMode);
  } catch (_error) {
    // Ignore storage write errors (private mode / blocked storage).
  }
}

function setLanguageMenuOpen(open: boolean) {
  const languageMenu = document.getElementById("language-menu");
  const languageToggle = document.getElementById("language-toggle");
  if (!languageMenu || !languageToggle) return;
  languageMenu.setAttribute("data-open", open ? "true" : "false");
  languageToggle.setAttribute("aria-expanded", open ? "true" : "false");
}

function bindLanguageMenuInteractions(
  getSystemLocale: () => string,
  applyLanguageMode: (mode: string, options?: ApplyLanguageModeOptions) => void,
) {
  const initialLanguageMenu = document.getElementById("language-menu");
  if (initialLanguageMenu) {
    initialLanguageMenu.setAttribute("data-open", "false");
  }

  document.addEventListener("click", (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (!target) return;
    const languageToggle = target.closest("#language-toggle");
    const languageMenu = document.getElementById("language-menu");
    if (languageToggle) {
      event.stopPropagation();
      const expanded = languageToggle.getAttribute("aria-expanded") === "true";
      setLanguageMenuOpen(!expanded);
      return;
    }
    const languageOption = target.closest("#language-menu [data-lang-value]");
    if (languageOption) {
      const next = languageOption.getAttribute("data-lang-value") || getSystemLocale();
      applyLanguageMode(next, { persist: true });
      setLanguageMenuOpen(false);
      return;
    }
    const activeLanguageToggle = document.getElementById("language-toggle");
    if (!languageMenu || !activeLanguageToggle) return;
    if (!languageMenu.contains(target) && !activeLanguageToggle.contains(target)) {
      setLanguageMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setLanguageMenuOpen(false);
    }
  });
}

function createApplyLanguageMode(options: LanguageRuntimeOptions) {
  return (mode: string, applyOptions?: ApplyLanguageModeOptions) => {
    const normalizedMode = options.normalizeLanguageMode(mode);
    const targetPath = options.routeLanguageMap[normalizedMode];
    const currentPath = window.location.pathname;
    const shouldRedirect = options.shouldRedirect ? options.shouldRedirect(normalizedMode) : true;

    if (shouldRedirect && targetPath && currentPath !== targetPath) {
      if (applyOptions?.persist) {
        persistLanguageMode(options.languageStorageKey, normalizedMode);
      }
      const nextUrl = `${targetPath}${window.location.search}${window.location.hash}`;
      window.location.assign(nextUrl);
      return;
    }

    options.applyResolvedLanguage(normalizedMode);

    if (applyOptions?.persist) {
      persistLanguageMode(options.languageStorageKey, normalizedMode);
    }
  };
}

function getInitialLanguageMode(options: LanguageRuntimeOptions) {
  const storedMode = window.__lumnoLanguagePreference.getStoredLanguageMode(options.languageStorageKey);
  return window.__lumnoLanguagePreference.resolveInitialLanguageMode({
    forcedLocale: options.forcedLocale || "",
    storedMode,
    systemMode: options.getSystemLocale(),
  });
}

function setupLanguageRuntime(options: LanguageRuntimeOptions) {
  const applyLanguageMode = createApplyLanguageMode(options);
  bindLanguageMenuInteractions(options.getSystemLocale, applyLanguageMode);

  return {
    applyLanguageMode,
    getInitialLanguageMode: () => getInitialLanguageMode(options),
    setLanguageMenuOpen,
  };
}

window.__lumnoLanguageRuntime = {
  setupLanguageRuntime,
};

declare global {
  interface Window {
    __lumnoLanguageRuntime: {
      setupLanguageRuntime(options: LanguageRuntimeOptions): {
        applyLanguageMode(mode: string, options?: ApplyLanguageModeOptions): void;
        getInitialLanguageMode(): string;
        setLanguageMenuOpen(open: boolean): void;
      };
    };
  }
}
