import { useEffect, useRef } from "react";

type DitheringMode = "bayer" | "halftone" | "noise" | "crosshatch";
type ColorMode = "original" | "grayscale";

interface DitherShaderProps {
  className?: string;
  src: string;
  gridSize?: number;
  ditherMode?: DitheringMode;
  colorMode?: ColorMode;
  pixelRatio?: number;
  brightness?: number;
  contrast?: number;
  objectFit?: "cover" | "contain" | "fill" | "none";
  threshold?: number;
}

const BAYER_MATRIX_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const RESIZE_RENDER_DELAY_MS = 90;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const luminance = (red: number, green: number, blue: number) =>
  (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

/**
 * A small, dependency-free version of Aceternity's image dither treatment.
 * `colorMode="original"` quantizes each RGB channel independently, keeping
 * the source image's palette instead of converting it to black and white.
 */
export function DitherShader({
  className,
  src,
  gridSize = 4,
  ditherMode = "bayer",
  colorMode = "original",
  pixelRatio = 1,
  brightness = 0,
  contrast = 1,
  objectFit = "cover",
  threshold = 0.5,
}: DitherShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const resizeTimerRef = useRef<number | null>(null);
  const renderFrameRef = useRef<number | null>(null);
  const introSourceDimensionsRef = useRef<{ height: number; width: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    const image = new Image();
    image.decoding = "async";
    let sourceCanvas: HTMLCanvasElement | null = null;
    let sourceContext: CanvasRenderingContext2D | null = null;

    const render = () => {
      if (cancelled) return;

      const { width, height } = dimensionsRef.current;
      if (width < 1 || height < 1 || image.naturalWidth < 1 || image.naturalHeight < 1) {
        return;
      }

      const baseCellSize = Math.max(1, Math.floor(gridSize * pixelRatio));
      // Keep one canvas pixel equal to one fixed-size dither cell. Capping the
      // backing buffer would enlarge cells on wide screens and make the grain
      // visibly breathe while the intro window changes size.
      const workWidth = Math.max(1, Math.ceil(width / baseCellSize));
      const workHeight = Math.max(1, Math.ceil(height / baseCellSize));

      if (!sourceCanvas) {
        sourceCanvas = document.createElement("canvas");
      }
      if (sourceCanvas.width !== workWidth || sourceCanvas.height !== workHeight) {
        sourceCanvas.width = workWidth;
        sourceCanvas.height = workHeight;
        sourceContext = null;
      }
      sourceContext ||= sourceCanvas.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) return;

      sourceContext.setTransform(1, 0, 0, 1, 0, 0);
      sourceContext.imageSmoothingEnabled = true;
      sourceContext.clearRect(0, 0, workWidth, workHeight);

      const naturalWidth = image.naturalWidth || width;
      const naturalHeight = image.naturalHeight || height;
      let drawWidth = workWidth;
      let drawHeight = workHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (objectFit === "cover") {
        const scale = Math.max(workWidth / naturalWidth, workHeight / naturalHeight);
        drawWidth = Math.ceil(naturalWidth * scale);
        drawHeight = Math.ceil(naturalHeight * scale);
        offsetX = Math.floor((workWidth - drawWidth) / 2);
        offsetY = Math.floor((workHeight - drawHeight) / 2);
      } else if (objectFit === "contain") {
        const scale = Math.min(workWidth / naturalWidth, workHeight / naturalHeight);
        drawWidth = Math.ceil(naturalWidth * scale);
        drawHeight = Math.ceil(naturalHeight * scale);
        offsetX = Math.floor((workWidth - drawWidth) / 2);
        offsetY = Math.floor((workHeight - drawHeight) / 2);
      } else if (objectFit === "none") {
        drawWidth = naturalWidth;
        drawHeight = naturalHeight;
        offsetX = Math.floor((workWidth - drawWidth) / 2);
        offsetY = Math.floor((workHeight - drawHeight) / 2);
      }

      sourceContext.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      const sourceData = sourceContext.getImageData(0, 0, workWidth, workHeight).data;

      canvas.width = workWidth;
      canvas.height = workHeight;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.imageSmoothingEnabled = false;
      const outputData = context.createImageData(workWidth, workHeight);
      const outputPixels = outputData.data;
      const levels = 8;
      const colorStep = 255 / (levels - 1);
      const patternScale = 2;

      for (let y = 0; y < workHeight; y += 1) {
        for (let x = 0; x < workWidth; x += 1) {
          const sourceIndex = (y * workWidth + x) * 4;
          const outputIndex = sourceIndex;
          const alpha = sourceData[sourceIndex + 3];
          if (alpha < 10) continue;

          let red = sourceData[sourceIndex];
          let green = sourceData[sourceIndex + 1];
          let blue = sourceData[sourceIndex + 2];
          red = clamp((red - 128) * contrast + 128 + brightness * 255, 0, 255);
          green = clamp((green - 128) * contrast + 128 + brightness * 255, 0, 255);
          blue = clamp((blue - 128) * contrast + 128 + brightness * 255, 0, 255);

          const matrixValue = BAYER_MATRIX_4X4[y % 4][x % 4] / 16;
          let ditherThreshold = matrixValue;

          if (ditherMode === "halftone") {
            ditherThreshold =
              (Math.sin((x + y) / patternScale) + Math.sin((x - y) / patternScale) + 2) / 4;
          } else if (ditherMode === "noise") {
            const sampleX = x * baseCellSize;
            const sampleY = y * baseCellSize;
            const noise = Math.sin(sampleX * 12.9898 + sampleY * 78.233) * 43758.5453;
            ditherThreshold = noise - Math.floor(noise);
          } else if (ditherMode === "crosshatch") {
            const lineA = (x + y) % 2 < 1 ? 1 : 0;
            const lineB = (x - y + 4) % 2 < 1 ? 1 : 0;
            ditherThreshold = (lineA + lineB) / 2;
          }

          ditherThreshold = ditherThreshold * (1 - threshold) + threshold * 0.5;
          let outputRed = red;
          let outputGreen = green;
          let outputBlue = blue;

          if (colorMode === "grayscale") {
            const value = luminance(red, green, blue) < ditherThreshold ? 0 : 255;
            outputRed = value;
            outputGreen = value;
            outputBlue = value;
          } else {
            const ditherOffset = (ditherThreshold - 0.5) * 48;
            outputRed = Math.round(clamp(red + ditherOffset, 0, 255) / colorStep) * colorStep;
            outputGreen = Math.round(clamp(green + ditherOffset, 0, 255) / colorStep) * colorStep;
            outputBlue = Math.round(clamp(blue + ditherOffset, 0, 255) / colorStep) * colorStep;
          }

          outputPixels[outputIndex] = outputRed;
          outputPixels[outputIndex + 1] = outputGreen;
          outputPixels[outputIndex + 2] = outputBlue;
          outputPixels[outputIndex + 3] = 255;
        }
      }

      context.putImageData(outputData, 0, 0);
    };

    const flushRender = () => {
      renderFrameRef.current = null;
      render();
    };

    const scheduleRender = (delay: number) => {
      if (cancelled || renderFrameRef.current !== null) return;
      if (delay === 0 && resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
        resizeTimerRef.current = null;
      }
      if (resizeTimerRef.current !== null) return;

      if (delay > 0) {
        resizeTimerRef.current = window.setTimeout(() => {
          resizeTimerRef.current = null;
          renderFrameRef.current = window.requestAnimationFrame(flushRender);
        }, delay);
        return;
      }

      renderFrameRef.current = window.requestAnimationFrame(flushRender);
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextWidth = Math.floor(entry.contentRect.width);
      const nextHeight = Math.floor(entry.contentRect.height);
      if (nextWidth < 1 || nextHeight < 1) return;

      const demo = container.closest(".hero-safari-demo");
      const introState = demo?.getAttribute("data-home-intro");
      if (introState === "pending" || introState === "revealing") {
        introSourceDimensionsRef.current = { height: nextHeight, width: nextWidth };
      } else if (introState === "complete" && introSourceDimensionsRef.current) {
        const sourceDimensions = introSourceDimensionsRef.current;
        const keepsIntroSourceBuffer =
          dimensionsRef.current.width === sourceDimensions.width
          && dimensionsRef.current.height === sourceDimensions.height;
        introSourceDimensionsRef.current = null;
        if (keepsIntroSourceBuffer) {
          return;
        }
      }

      const current = dimensionsRef.current;
      if (current.width === nextWidth && current.height === nextHeight) return;
      dimensionsRef.current = { width: nextWidth, height: nextHeight };
      scheduleRender(RESIZE_RENDER_DELAY_MS);
    });

    image.onload = () => scheduleRender(0);
    image.src = src;
    if (image.complete && image.naturalWidth > 0) scheduleRender(0);
    resizeObserver.observe(container);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
        resizeTimerRef.current = null;
      }
      if (renderFrameRef.current !== null) {
        window.cancelAnimationFrame(renderFrameRef.current);
        renderFrameRef.current = null;
      }
      image.onload = null;
    };
  }, [brightness, colorMode, contrast, ditherMode, gridSize, objectFit, pixelRatio, src, threshold]);

  return (
    <div
      ref={containerRef}
      className={["hero-safari-dither", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      data-dither-grid-size={gridSize}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
