/*
 * Centerlines of the Remix Icon line glyphs used in sheet cells, split into
 * the parts each icon is made of, with a hover entrance for every part.
 *
 * Remix line icons are filled outlines of 2-unit-wide strokes, so drawing the
 * outline itself traces both edges of every line. These are the strokes the
 * outlines were made from: stroked at the listed width they cover the same
 * area as the fill, which lets the hover animation build the icon from its
 * parts and hand back to the untouched original glyph at the end.
 *
 * Straight and circular parts are exact (derived from the outline geometry);
 * the freeform curves (the GitHub cat) come from offsetting one edge of the
 * band by 1 unit, simplified to within 0.02 units.
 *
 * Stroke defaults: width 2, round join, butt cap. Coordinates are in the
 * 24-unit icon grid; `at` and `dur` are milliseconds from hover start.
 */
type Point = readonly [number, number];

export type HomeCellIconMotion =
  /** The line grows from its first point to its last. */
  | { type: "draw"; at: number; dur: number }
  /** Scales up from `origin` (default: the part's own centre) with a small overshoot. */
  | { type: "pop"; at: number; dur: number; origin?: Point; peak?: number }
  /** Moves in by `from` (grid units) and settles with a small overshoot. */
  | { type: "slide"; at: number; dur: number; from: Point }
  /** Turns in by `rotate` degrees around `origin`. */
  | { type: "swing"; at: number; dur: number; origin: Point; rotate: number }
  /** Turns in by `rotate` degrees around `origin`, then swings back and forth before settling. */
  | { type: "wag"; at: number; dur: number; origin: Point; rotate: number };

export interface HomeCellIconPart {
  d: string;
  motion: HomeCellIconMotion;
  width?: number;
  join?: "round" | "miter" | "bevel";
  cap?: "butt" | "round";
  miterLimit?: number;
}

// The screenshot frame's dots, from the bottom-left corner round to the top-right.
const SCREENSHOT_DOTS = [
  "M4 21V19", "M4 17V15", "M4 13V11", "M4 9V7", "M4 5V3",
  "M7 4H9", "M11 4H13", "M15 4H17", "M19 4H21", "M20 7V9",
];

const PIN_HEAD_ENTER = { type: "slide", at: 0, dur: 440, from: [3, -3] } as const;
const PIP_ARROW_ENTER = { type: "slide", at: 160, dur: 420, from: [-3, -3] } as const;

export const HOME_CELL_ICON_PARTS = {
  // Web clip: the selection marches round the frame, then the camera, then the shutter.
  "screenshot-2-line": [
    ...SCREENSHOT_DOTS.map((d, index): HomeCellIconPart => ({
      d,
      motion: { type: "pop", at: index * 40, dur: 240, peak: 1.4 },
    })),
    { d: "M8 12H11.202L12.535 10H15.465L16.798 12H20V20H8Z", motion: { type: "draw", at: 160, dur: 440 } },
    { d: "M14 15A1 1 0 1 1 14 17A1 1 0 1 1 14 15Z", motion: { type: "pop", at: 520, dur: 320, peak: 1.5 } },
  ],
  // Auto PiP: the screen draws, the arrow pushes into the corner, the small window opens there.
  "picture-in-picture-2-line": [
    { d: "M21 11V4H3V20H10", motion: { type: "draw", at: 0, dur: 460 } },
    { d: "M6 7L9 10", motion: PIP_ARROW_ENTER },
    { d: "M10 11V8.914L7.914 11Z", join: "miter", motion: PIP_ARROW_ENTER },
    { d: "M13 14H21V20H13Z", motion: { type: "pop", at: 300, dur: 420, origin: [13, 14], peak: 1.08 } },
  ],
  // Link preview: the eye draws open round its outline, then the pupil pops in.
  "eye-line": [
    {
      d: "M2.202 12C3.131 7.414 7.186 4 12 4C16.814 4 20.869 7.414 21.798 12C20.869 16.586 16.814 20 12 20C7.186 20 3.131 16.586 2.202 12Z",
      motion: { type: "draw", at: 0, dur: 520 },
    },
    { d: "M12 8.5A3.5 3.5 0 1 1 12 15.5A3.5 3.5 0 1 1 12 8.5Z", motion: { type: "pop", at: 320, dur: 380, peak: 1.3 } },
  ],
  // Tab switcher: each arrow's shaft draws toward its head, which then pops in; the second follows the first.
  "arrow-left-right-line": [
    { d: "M20 7H4.414", motion: { type: "draw", at: 0, dur: 320 } },
    {
      d: "M8.657 2.757L4.414 7L8.657 11.243",
      join: "miter",
      motion: { type: "pop", at: 240, dur: 360, origin: [4.414, 7], peak: 1.25 },
    },
    { d: "M4 17H19.586", motion: { type: "draw", at: 200, dur: 320 } },
    {
      d: "M15.343 12.757L19.586 17L15.343 21.243",
      join: "miter",
      motion: { type: "pop", at: 440, dur: 360, origin: [19.586, 17], peak: 1.25 },
    },
  ],
  // Watch progress: the play button pops, the list fills in line by line.
  "play-list-2-line": [
    { d: "M3 5.304L8.113 8.5L3 11.696Z", join: "miter", motion: { type: "pop", at: 0, dur: 380, peak: 1.3 } },
    { d: "M12 5H22", motion: { type: "draw", at: 160, dur: 340 } },
    { d: "M12 12H22", motion: { type: "draw", at: 240, dur: 340 } },
    { d: "M2 19H22", motion: { type: "draw", at: 320, dur: 340 } },
  ],
  // WebDAV sync: the cloud draws, its inner arc spins round into place like a sync arrow.
  "cloud-line": [
    {
      d: "M17 10A5 5 0 0 1 22 15A5 5 0 0 1 17 20H7A5 5 0 0 1 2 15A5 5 0 0 1 6.1 10.08A6 6 0 1 1 17.99 9.29",
      motion: { type: "draw", at: 0, dur: 560 },
    },
    {
      d: "M12.255 13.418A5 5 0 0 1 17 10",
      motion: { type: "swing", at: 260, dur: 600, origin: [17, 15], rotate: -180 },
    },
  ],
  // Pinned tabs: the pin head drops in from the top right, then the needle goes in.
  "pushpin-line": [
    { d: "M13.12 2.397L21.605 10.882", motion: PIN_HEAD_ENTER },
    {
      d: "M14.534 3.811L9.371 8.975L5.013 9.847L14.156 18.989L15.027 14.632L20.191 9.468Z",
      join: "miter",
      miterLimit: 1.5,
      motion: PIN_HEAD_ENTER,
    },
    { d: "M8.878 15.125L3.928 20.075", motion: { type: "draw", at: 300, dur: 280 } },
  ],
  // Languages: 文 is written stroke by stroke (dot, bar, left fall, right fall), A rises beside it.
  "translate-2": [
    { d: "M9 2V5", motion: { type: "draw", at: 0, dur: 160 } },
    { d: "M2 5H16", motion: { type: "draw", at: 100, dur: 220 } },
    {
      d: "M13.2 5L12.971 6C12.232 8.091 11.114 9.986 9.706 11.589L8.295 13.014C6.63 14.503 4.674 15.638 2.531 16.309",
      motion: { type: "draw", at: 220, dur: 320 },
    },
    {
      d: "M5.887 8C6.539 9.309 7.351 10.516 8.295 11.59L8.99 12.31L9.706 13.013C10.527 13.749 11.42 14.398 12.372 14.947",
      motion: { type: "draw", at: 360, dur: 300 },
    },
    { d: "M13.178 21L17.5 10.193L21.823 21", join: "bevel", motion: { type: "slide", at: 300, dur: 420, from: [0, 4] } },
    { d: "M14.8 17H20.2", motion: { type: "draw", at: 560, dur: 200 } },
  ],
  // Local search: both sides of the shield draw down from the top together, then the check.
  "shield-check-line": [
    {
      d: "M12 2.024L4 3.802V13.789C4 15.46 4.835 17.02 6.226 17.95L12 21.798",
      cap: "round",
      motion: { type: "draw", at: 0, dur: 520 },
    },
    {
      d: "M12 2.024L20 3.802V13.789C20 15.46 19.165 17.02 17.774 17.95L12 21.798",
      cap: "round",
      motion: { type: "draw", at: 0, dur: 520 },
    },
    { d: "M7.967 11.05L11.502 14.585L17.16 8.929", join: "miter", motion: { type: "draw", at: 400, dur: 320 } },
  ],
  // Open source: the cat draws from foot to foot round its head, then wags its tail.
  "github-line": [
    {
      d: "M8.35 21.1L8.63 21.12L8.85 21.06L9.03 20.92L9.12 20.73L9.14 17.35L9.17 16.9L9.29 16.39L9.46 15.93L9.67 15.38L8.59 15.06L7.84 14.84L7.18 14.56L6.61 14.22L6.12 13.83L5.71 13.37L5.36 12.83L5.09 12.2L4.88 11.47L4.77 10.84L4.71 10.14L4.71 9.41L4.77 8.81L4.88 8.32L5.05 7.86L5.29 7.36L5.56 6.94L5.73 6.11L5.65 5.62L5.63 5.14L5.68 4.62L5.81 4.06L5.99 3.53L6.28 3.5L6.8 3.57L7.43 3.77L8.11 4.08L8.78 4.47L9.54 4.6L10.75 4.39L12 4.31L13.25 4.39L14.46 4.6L15.22 4.47L16.16 3.94L16.94 3.63L17.54 3.51L18.01 3.53L18.22 4.13L18.34 4.75L18.37 5.44L18.27 6.11L18.44 6.94L18.75 7.42L18.98 7.92L19.16 8.46L19.26 8.96L19.3 9.48L19.29 10.14L19.23 10.84L19.13 11.47L18.92 12.2L18.64 12.83L18.3 13.37L17.89 13.82L17.4 14.22L16.83 14.56L16.17 14.84L15.42 15.06L14.48 15.34L14.7 16.32L14.8 16.77L14.85 17.26L14.84 20.12L14.89 20.83L15.06 21.03L15.31 21.12L15.62 21.11",
      cap: "round",
      join: "miter",
      miterLimit: 2,
      motion: { type: "draw", at: 0, dur: 620 },
    },
    {
      d: "M9.14 18.13L8.07 18.14L7.59 18.15L7.14 18.1L6.77 17.99L6.44 17.82L5.98 17.41L5.12 16.37L4.71 15.93L4.27 15.58L3.84 15.37",
      cap: "round",
      motion: { type: "wag", at: 380, dur: 560, origin: [9.14, 18.13], rotate: 35 },
    },
  ],
  // Opt-in: the switch draws, then its knob slides across to off, the default.
  "toggle-line": [
    { d: "M8 6H16A6 6 0 0 1 16 18H8A6 6 0 0 1 8 6Z", motion: { type: "draw", at: 0, dur: 520 } },
    {
      d: "M8 10.5A1.5 1.5 0 1 1 8 13.5A1.5 1.5 0 1 1 8 10.5Z",
      width: 3,
      motion: { type: "slide", at: 240, dur: 520, from: [8, 0] },
    },
  ],
} satisfies Record<string, HomeCellIconPart[]>;
