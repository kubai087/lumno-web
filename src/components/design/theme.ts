import { createContext, useContext, useEffect, useState } from "react";

/*
 * The page's light / dark mode, the extension's three choices. The head script
 * in pages/design/index.astro applies the saved one before first paint (as
 * html[data-design-theme]); this keeps it in step afterwards. Both the switch
 * beside the filters and the 深浅色模式 card drive it.
 */

export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "lumno-design-theme";

type ThemeState = { mode: ThemeMode; resolved: ResolvedTheme; setMode: (mode: ThemeMode) => void };

export const DesignThemeContext = createContext<ThemeState>({ mode: "system", resolved: "light", setMode: () => {} });

export const useDesignTheme = () => useContext(DesignThemeContext);

function readStoredMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Storage blocked: follow the system.
  }
  return "system";
}

/** Server and first client render are light; the saved mode takes over right after hydration. */
export function useThemeState(): ThemeState {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [systemDark, setSystemDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemDark(query.matches);
    sync();
    setModeState(readStoredMode());
    setReady(true);
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const resolved: ResolvedTheme = mode === "dark" || (mode === "system" && systemDark) ? "dark" : "light";

  useEffect(() => {
    if (ready) document.documentElement.dataset.designTheme = resolved;
  }, [ready, resolved]);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Not saved; the choice still holds for this visit.
    }
  };

  return { mode, resolved: ready ? resolved : "light", setMode };
}
