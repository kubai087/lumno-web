// @ts-nocheck
// Generated from lumno-extension/react-src/newtab/shortcut-dialog-helpers.ts by scripts/sync-extension-ui.mjs. Do not edit; rerun the script.
export const MODE_ADD = 'add';
export const MODE_EDIT = 'edit';
export const DEFAULT_CLOSE_DELAY_MS = 180;
export const DEFAULT_ID_PREFIX = '_x_extension_newtab_shortcut_dialog_2026_unique_';

export type ShortcutDialogMode = typeof MODE_ADD | typeof MODE_EDIT;

export interface ShortcutRecord {
  id?: string;
  title?: string;
  url?: string;
  iconDataUrl?: string;
  iconSource?: 'service' | 'favicon-is' | 'cache' | 'custom' | 'builtin';
  iconPlate?: IconPlateMode;
  iconPlateColor?: string;
}

// '' lets the artwork decide: see-through icons get a plate.
export type IconPlateMode = '' | 'on' | 'off';

export interface IconPlateAnalysis {
  transparent: boolean;
  accent: number[] | null;
  palette: number[][];
}

export interface IconPlateColors {
  light: string;
  dark: string;
  custom: boolean;
}

export interface IconPlateInput {
  mode?: string;
  color?: string;
  eligible?: boolean;
  analysis?: IconPlateAnalysis | null;
}

export function normalizeIconPlateMode(value: unknown): IconPlateMode {
  return value === 'on' || value === 'off' ? value : '';
}

// 'rgb(r, g, b)' or '#rrggbb' as '#RRGGBB'; '' for anything else.
export function cssColorToHex(value: string): string {
  const text = String(value || '').trim();
  if (/^#[\da-f]{6}$/i.test(text)) return text.toUpperCase();
  const match = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i.exec(text);
  if (!match) return '';
  return `#${match.slice(1).map((channel) => Math.min(255, Number(channel)).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

export function getIconPlateStyle(plate: IconPlateColors | null): Record<string, string> | undefined {
  return plate
    ? { '--x-nt-shortcut-icon-plate-light': plate.light, '--x-nt-shortcut-icon-plate-dark': plate.dark }
    : undefined;
}

export function normalizeMode(
  mode: unknown,
  shortcut?: ShortcutRecord | null
): ShortcutDialogMode {
  return mode === MODE_EDIT && shortcut ? MODE_EDIT : MODE_ADD;
}

export function clampEnterOffset(value: unknown, limit: unknown = 28): number {
  const raw = Number(value);
  const max = Number.isFinite(Number(limit)) ? Math.max(0, Number(limit)) : 28;
  if (!Number.isFinite(raw)) {
    return 0;
  }
  return Math.max(-max, Math.min(max, raw));
}

export function getEnterOffset(sourceCenter: unknown, targetCenter: unknown): number {
  const delta = Number(sourceCenter) - Number(targetCenter);
  if (!Number.isFinite(delta) || Math.abs(delta) < 4) {
    return 0;
  }
  const offset = clampEnterOffset(delta * 0.12, 28);
  if (Math.abs(offset) < 6) {
    return delta < 0 ? -6 : 6;
  }
  return offset;
}
