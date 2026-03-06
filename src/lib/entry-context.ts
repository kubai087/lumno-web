export const EXTENSION_ENTRY_VALUES = ["ext", "extension"] as const;
export const EXTENSION_ENTRY_KEYS = ["entry", "source", "reason", "version", "updated", "upgrade", "install", "from", "context"] as const;

export function formatVersionToken(raw: string): string {
  const value = String(raw || "").trim();
  if (!value) return "";
  return /^v/i.test(value) ? value : `v${value}`;
}

export function buildEntryContextConfig(latestVersion?: string) {
  return {
    extensionEntryKeys: [...EXTENSION_ENTRY_KEYS],
    extensionEntryValues: [...EXTENSION_ENTRY_VALUES],
    latestVersion: formatVersionToken(latestVersion || ""),
  };
}
