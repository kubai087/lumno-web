// @ts-nocheck
// Generated from lumno-extension/react-src/newtab/folder-color.ts by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.
export const DEFAULT_FOLDER_COLOR = '#5393FF';
export const MAX_SAVED_FOLDER_COLORS = 8;

export function normalizeSavedFolderColors(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const colors: string[] = [];
  for (const item of value) {
    const color = parseFolderColor(item);
    if (color && !colors.includes(color)) colors.push(color);
    if (colors.length === MAX_SAVED_FOLDER_COLORS) break;
  }
  return colors;
}

export function parseFolderColor(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  const hex = text.match(/^#?([\da-f]{3}|[\da-f]{6})$/i);
  if (hex) {
    const expanded = hex[1].length === 3
      ? hex[1].split('').map((digit) => digit + digit).join('') : hex[1];
    return `#${expanded.toUpperCase()}`;
  }
  const rgb = text.match(/^(?:rgb\(\s*)?(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*\))?$/i);
  if (!rgb || text.toLowerCase().startsWith('rgb(') !== text.endsWith(')')) return null;
  const channels = rgb.slice(1).map(Number);
  if (channels.some((channel) => channel > 255)) return null;
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

export function folderColorToRgb(color: string): string {
  return `rgb(${folderColorToChannels(color).join(', ')})`;
}

export function folderColorToChannels(color: string): [string, string, string] {
  const hex = parseFolderColor(color) || DEFAULT_FOLDER_COLOR;
  return [1, 3, 5].map((offset) => String(parseInt(hex.slice(offset, offset + 2), 16))) as [string, string, string];
}
