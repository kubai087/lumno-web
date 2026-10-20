import { useEffect, useId, useRef } from "react";
import { applyFolderColor, folderSvg, playFolderOpen, setFolderOpen } from "../home/newtab/folder-icon";

/*
 * React twins of the new tab scenes' SceneFolderIcon / SceneFavicon: the
 * extension's folder icon with its open morph, and brand favicons inlined for
 * Safari sharpness (AGENTS.md), with ids prefixed per copy.
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The folder SVG is ~17KB, so it is built in the browser; the span keeps its size until then. */
export function FolderIcon({ open = false, color, className, plain = false }: { open?: boolean; color?: string; className?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ready = useRef(false);

  useEffect(() => {
    const icon = ref.current;
    if (!icon || ready.current) return;
    icon.innerHTML = folderSvg(`dg-${id}`);
    setFolderOpen(icon, open);
    ready.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const icon = ref.current;
    if (!icon || !ready.current) return;
    if (prefersReducedMotion()) setFolderOpen(icon, open);
    else playFolderOpen(icon, open);
  }, [open]);

  useEffect(() => {
    if (ref.current && ready.current && color) applyFolderColor(ref.current, color);
  }, [color]);

  // `plain` drops the homepage scene's sizing, for the extension's own icon slots.
  return <span ref={ref} className={[plain ? "" : "nts-folder", className].filter(Boolean).join(" ")} aria-hidden="true" />;
}

const favicons = import.meta.glob<string>("../../assets/home-favicons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Single-color black marks; dark mode turns them white, as the extension does with monochrome favicons.
const MONO_FAVICONS = new Set(["apple", "github", "nextjs", "vercel", "medium", "openai"]);

export function Favicon({ icon }: { icon: string }) {
  const prefix = `${useId().replace(/[^a-zA-Z0-9_-]/g, "")}-${icon}-`;
  const raw = favicons[`../../assets/home-favicons/${icon}.svg`];
  if (!raw) throw new Error(`Unknown favicon: ${icon}`);
  const ids = [...raw.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const svg = ids.reduce(
    (markup, svgId) =>
      markup
        .replaceAll(`id="${svgId}"`, `id="${prefix}${svgId}"`)
        .replaceAll(`url(#${svgId})`, `url(#${prefix}${svgId})`)
        .replaceAll(`href="#${svgId}"`, `href="#${prefix}${svgId}"`),
    raw.replace("<svg ", '<svg aria-hidden="true" focusable="false" shape-rendering="geometricPrecision" '),
  );
  return <span className="nts-fav" data-mono={MONO_FAVICONS.has(icon) ? "" : undefined} dangerouslySetInnerHTML={{ __html: svg }} />;
}
