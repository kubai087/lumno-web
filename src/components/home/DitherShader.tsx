import { useEffect, useRef } from "react";
import { buildDitherTable, paintDitheredImage } from "@/lib/ordered-dither";
import { cn } from "@/lib/utils";

/*
 * A painting shown through an ordered dither (the treatment is in
 * lib/ordered-dither.ts). The canvas repaints when the image arrives and,
 * debounced, when the box changes size. The container keeps the plain painting
 * as its CSS background, and the canvas fades in over it once data-dither-ready
 * is set (hero-safari-demo.css).
 */

interface DitherShaderProps {
  src: string;
  className?: string;
  /** CSS pixels per dither cell. */
  cellSize?: number;
  brightness?: number;
  contrast?: number;
  /** How strongly the Bayer pattern shows, from 0 to 1. */
  grain?: number;
}

const RESIZE_DEBOUNCE_MS = 90;

interface Size {
  width: number;
  height: number;
}

const sameSize = (a: Size | null, b: Size | null) =>
  Boolean(a && b && a.width === b.width && a.height === b.height);

export function DitherShader({
  src,
  className,
  cellSize = 2,
  brightness = 0.01,
  contrast = 1.08,
  grain = 0.78,
}: DitherShaderProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const table = buildDitherTable({ brightness, contrast, grain });
    const image = new Image();
    image.decoding = "async";
    let size: Size = { width: 0, height: 0 };
    let disposed = false;
    let paintFrame = 0;
    let debounceTimer = 0;
    let releaseFrame = 0;

    const paint = () => {
      paintFrame = 0;
      if (disposed) return;
      if (paintDitheredImage(canvas, image, size.width, size.height, cellSize, table)) {
        host.dataset.ditherReady = "true";
      }
    };

    // One paint at a time: a pending frame wins, an immediate request cancels a debounce.
    const requestPaint = (delay: number) => {
      if (disposed || paintFrame) return;
      if (delay === 0) {
        window.clearTimeout(debounceTimer);
        debounceTimer = 0;
        paintFrame = window.requestAnimationFrame(paint);
        return;
      }
      if (debounceTimer) return;
      debounceTimer = window.setTimeout(() => {
        debounceTimer = 0;
        paintFrame = window.requestAnimationFrame(paint);
      }, delay);
    };

    // The homepage intro shrinks the hero from full screen to its resting size. The
    // canvas painted during the intro carries on through that handoff, scaled by CSS,
    // instead of repainting with a visibly different grain at the moment it settles.
    let introSize: Size | null = null;
    const keepsIntroPaint = (next: Size) => {
      const intro = host.closest(".hero-safari-demo")?.getAttribute("data-home-intro");
      if (intro === "pending" || intro === "revealing") {
        introSize = next;
        return false;
      }
      if (intro === "complete" && introSize) {
        const keep = sameSize(size, introSize);
        introSize = null;
        return keep;
      }
      return false;
    };
    // That allowance only covers the handoff: if the intro ends without a resize, drop it
    // a couple of frames later so a real resize afterwards (a rotated phone) still repaints.
    const onIntroComplete = () => {
      releaseFrame = window.requestAnimationFrame(() => {
        releaseFrame = window.requestAnimationFrame(() => {
          introSize = null;
        });
      });
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      const next = { width: Math.floor(entry.contentRect.width), height: Math.floor(entry.contentRect.height) };
      if (next.width < 1 || next.height < 1 || keepsIntroPaint(next) || sameSize(size, next)) return;
      size = next;
      requestPaint(RESIZE_DEBOUNCE_MS);
    });

    document.addEventListener("lumno:home-intro-complete", onIntroComplete);
    image.onload = () => requestPaint(0);
    image.src = src;
    if (image.complete && image.naturalWidth > 0) requestPaint(0);
    resizeObserver.observe(host);

    return () => {
      disposed = true;
      document.removeEventListener("lumno:home-intro-complete", onIntroComplete);
      resizeObserver.disconnect();
      window.clearTimeout(debounceTimer);
      window.cancelAnimationFrame(paintFrame);
      window.cancelAnimationFrame(releaseFrame);
      image.onload = null;
    };
  }, [src, cellSize, brightness, contrast, grain]);

  return (
    <div ref={hostRef} className={cn("hero-safari-dither", className)} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
