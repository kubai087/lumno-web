import type { CSSProperties } from "react";

import "./new-tab-mock.css";

/*
 * The extension's new tab chrome (clock, search bar, shortcut row), drawn as DOM over a
 * wallpaper-only render so it stays sharp at any size and never picks up the wallpaper
 * filter. Geometry, colours and tints are measured from lumno-extension/newtab.html at a
 * 1440 × 900 viewport; the stylesheet scales them to the container width.
 */

type Shortcut = {
  title: string;
  icon: string;
  /** Tile colour the extension samples from the favicon. */
  tint: string;
};

const SHORTCUTS: Shortcut[] = [
  // The extension's GitHub favicon is a 32px bitmap; the site's glyph is the same mark as SVG.
  { title: "GitHub", icon: "/assets/site-search/glyph-gh.svg", tint: "rgb(237 238 238)" },
  { title: "Notion", icon: "/assets/feature-newtab/shortcuts/notion.png", tint: "rgb(231 231 231)" },
  { title: "Wikipedia", icon: "/assets/feature-newtab/shortcuts/wikipedia.png", tint: "rgb(240 240 240)" },
  { title: "Apple", icon: "/assets/feature-newtab/shortcuts/apple.png", tint: "rgb(235 235 236)" },
  { title: "ChatGPT", icon: "/assets/feature-newtab/shortcuts/chatgpt.png", tint: "rgb(212 238 232)" },
  { title: "Claude", icon: "/assets/feature-newtab/shortcuts/claude.png", tint: "rgb(249 234 229)" },
  { title: "Google", icon: "/assets/feature-newtab/shortcuts/google.png", tint: "rgb(221 233 253)" },
];

interface NewTabMockProps {
  placeholder: string;
  time?: string;
}

export function NewTabMock({ placeholder, time = "09:41" }: NewTabMockProps) {
  return (
    <div className="nt-mock" aria-hidden="true">
      <time className="nt-mock__time" dateTime={time}>
        {time}
      </time>
      <div className="nt-mock__search">
        <i className="ri-search-line nt-mock__search-icon" />
        <span className="nt-mock__placeholder">{placeholder}</span>
        <i className="ri-settings-line nt-mock__settings" />
      </div>
      <div className="nt-mock__shortcuts">
        {SHORTCUTS.map((shortcut) => (
          <span
            className="nt-mock__tile"
            key={shortcut.title}
            style={{ "--nt-mock-tint": shortcut.tint } as CSSProperties}
          >
            <img src={shortcut.icon} alt="" width={28} height={28} loading="lazy" decoding="async" draggable={false} />
          </span>
        ))}
      </div>
    </div>
  );
}
