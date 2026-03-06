export function resolveInitialLanguageMode({ forcedLocale, storedMode, systemMode }) {
  if (forcedLocale) return forcedLocale;
  if (storedMode) return storedMode;
  return systemMode;
}
