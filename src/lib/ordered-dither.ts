/*
 * Ordered dithering for the homepage's paintings (DitherShader.tsx).
 *
 * The painting is drawn at one pixel per dither cell, then every channel is
 * snapped to eight levels after a nudge that depends on the pixel's place in a
 * 4×4 Bayer pattern. The colours stay the painting's own; only the gradients
 * turn into the regular grain. CSS scales the small canvas back up with
 * `image-rendering: pixelated`.
 *
 * A channel's output depends only on its value and its Bayer cell, so the
 * whole treatment is one 16 × 256 lookup table built once per setting.
 */

/** The 4×4 Bayer index matrix, row by row. */
const BAYER_4X4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const LEVELS_PER_CHANNEL = 8;
// At full grain the Bayer cells nudge a channel from -24 to +21 before it is snapped.
const NUDGE_PER_CELL = 3;
const NUDGE_CENTER = 8;
// Pixels this transparent are left empty rather than given a solid colour.
const MIN_ALPHA = 10;

export interface DitherTone {
  /** Added to every channel, as a share of full scale (0.01 is +2.55). */
  brightness: number;
  /** Stretches channels away from mid-grey (1 leaves them as they are). */
  contrast: number;
  /** How strongly the Bayer pattern shows, from 0 (flat bands) to 1. */
  grain: number;
}

/** Output channel for every (Bayer cell, input channel) pair, at `cell * 256 + value`. */
export function buildDitherTable({ brightness, contrast, grain }: DitherTone) {
  const table = new Uint8ClampedArray(16 * 256);
  const levelStep = 255 / (LEVELS_PER_CHANNEL - 1);
  for (let cell = 0; cell < 16; cell += 1) {
    const nudge = (cell * NUDGE_PER_CELL - NUDGE_CENTER * NUDGE_PER_CELL) * grain;
    for (let value = 0; value < 256; value += 1) {
      const toned = Math.min(255, Math.max(0, (value - 128) * contrast + 128 + brightness * 255));
      const nudged = Math.min(255, Math.max(0, toned + nudge));
      // The clamped array rounds the snapped level to a whole channel value.
      table[cell * 256 + value] = Math.round(nudged / levelStep) * levelStep;
    }
  }
  return table;
}

/** Where to draw a `sourceWidth × sourceHeight` image so it covers a `width × height` box, centred. */
function coverBox(sourceWidth: number, sourceHeight: number, width: number, height: number) {
  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = Math.ceil(sourceWidth * scale);
  const drawHeight = Math.ceil(sourceHeight * scale);
  return {
    x: Math.floor((width - drawWidth) / 2),
    y: Math.floor((height - drawHeight) / 2),
    width: drawWidth,
    height: drawHeight,
  };
}

/**
 * Paints `image` into `canvas` dithered for a `width × height` CSS box, one
 * canvas pixel per `cellSize` CSS pixels. Returns false when there is nothing to paint yet.
 */
export function paintDitheredImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  width: number,
  height: number,
  cellSize: number,
  table: Uint8ClampedArray,
) {
  if (width < 1 || height < 1 || image.naturalWidth < 1 || image.naturalHeight < 1) return false;
  // Cells stay a fixed size, so a wider box gets more of them rather than bigger ones and
  // the grain never "breathes" while the box resizes.
  const cell = Math.max(1, Math.floor(cellSize));
  const columns = Math.max(1, Math.ceil(width / cell));
  const rows = Math.max(1, Math.ceil(height / cell));

  canvas.width = columns;
  canvas.height = rows;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return false;
  const box = coverBox(image.naturalWidth, image.naturalHeight, columns, rows);
  context.drawImage(image, box.x, box.y, box.width, box.height);

  const frame = context.getImageData(0, 0, columns, rows);
  const pixels = frame.data;
  for (let y = 0; y < rows; y += 1) {
    const patternRow = (y & 3) * 4;
    let index = y * columns * 4;
    for (let x = 0; x < columns; x += 1, index += 4) {
      if (pixels[index + 3] < MIN_ALPHA) {
        pixels.fill(0, index, index + 4);
        continue;
      }
      const offset = BAYER_4X4[patternRow + (x & 3)] * 256;
      pixels[index] = table[offset + pixels[index]];
      pixels[index + 1] = table[offset + pixels[index + 1]];
      pixels[index + 2] = table[offset + pixels[index + 2]];
      pixels[index + 3] = 255;
    }
  }
  context.putImageData(frame, 0, 0);
  return true;
}
