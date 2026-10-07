/**
 * Keyboard shortcuts shown on the homepage. Both spellings are rendered and CSS picks one from
 * `html[data-platform]`, so static HTML and React hydration never disagree.
 */
export interface PlatformKey {
  mac: string;
  other: string;
}

export type ShortcutKey = string | PlatformKey;

export const MOD_KEY: PlatformKey = { mac: "⌘", other: "Ctrl" };
export const SHIFT_KEY: PlatformKey = { mac: "⇧", other: "Shift" };

export const COMMAND_BAR_SHORTCUT: readonly ShortcutKey[] = [MOD_KEY, SHIFT_KEY, "K"];
export const NEW_TAB_SHORTCUT: readonly ShortcutKey[] = [MOD_KEY, "T"];

export const shortcutKeyId = (key: ShortcutKey) => (typeof key === "string" ? key : key.mac);
