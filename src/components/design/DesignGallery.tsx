import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { type DesignCardId, type DesignCategory, type DesignDemoCopy, type DesignPageContent } from "../../lib/design-content";
import type { HomeContent } from "../../lib/home-content";
import { CommandBarCard, ScopeMenuCard, SelectionCard, SiteSearchCard } from "./CommandCards";
import {
  ButtonCard,
  CheckboxCard,
  ChoiceCardsCard,
  InputCard,
  SegmentedCard,
  SelectCard,
  ShortcutRecorderCard,
  SliderCard,
  SwitchCard,
  TabsCard,
} from "./ControlCards";
import { FeatureHintCard, PopconfirmCard, ToastCard, TooltipCard, UpdateNoticeCard } from "./FeedbackCards";
import { ContextMenuCard, DragFolderCard, TabSwitcherCard } from "./InteractionCards";
import { BookmarkMenuCard, DockCard, FolderColorCard } from "./NewTabCards";
import { DesignThemeContext, useDesignTheme, useThemeState } from "./theme";
import { AccordionCard, DragGapCard, DragPageCard, ModeSwitchCard, NumberKeysCard, RefreshCard } from "./PatternCards";
import { ExtensionStringsContext, type ExtensionStrings } from "./ext-strings";
import { ThemeToggle } from "./ThemeToggle";
import { DemoCard } from "./demo";
import { useSegmentedIndicator } from "./extension/segmented-indicator";
import "../home/newtab/newtab-scene.css";
import "./extension/tokens.css";
import "./extension/menu-surface.css";
import "./extension/switch.css";
import "./extension/custom-select.css";
import "./extension/checkbox.css";
import "./extension/choice-card.css";
import "./extension/info-button.css";
import "./extension/link-button.css";
import "./extension/range-slider.css";
import "./extension/tooltip.css";
import "./extension/toast.css";
import "./extension/busy.css";
import "./extension/feature-hints.css";
import "./extension/options.css";
import "./extension/webdav-options.css";
import "./extension/cursor-tooltip.css";
import "./extension/search-input.css";
import "./extension/suggestions-view.css";
import "./extension/selection-quick-actions.css";
import "./extension/tab-switcher.css";
import "./extension/newtab.css";
import "./extension/shortcut-dialog.css";
import "./extension/folder-color-picker.css";
import "./extension/glass-style.css";
import "./design-gallery.css";

/*
 * /design: the extension's components, each live in its own card, in one
 * titled section per kind; the extension's settings tabs show one section.
 */

type Filter = "all" | DesignCategory;

type CardSpec = {
  id: DesignCardId;
  category: DesignCategory;
  /** Width on the 12-column grid: a third, half, two thirds or the whole row (design-gallery.css). */
  w: "s" | "m" | "l" | "xl";
  /** The shot's height: room for the component at rest and for what it opens. */
  h: number;
  /** A shorter shot on phones, where the component scales down or sheds a column. */
  phone?: number;
  /** New tab pieces sit on one of the extension's wallpapers, light and dark, as they do in the new tab. */
  wallpaper?: [light: string, dark: string];
  render: () => ReactNode;
};

const WALLPAPERS = "/assets/feature-newtab/wallpapers";

// 全部, in rows that fill the twelve columns at one height each: the most striking pieces first.
const FEATURED: DesignCardId[] = [
  "commandBar",
  "accordion",
  "scopeMenu",
  "selection",
  "tabSwitcher",
  "bookmarkMenu",
  "contextMenu",
  "folderColor",
  "numberKeys",
  "refresh",
  "dragPage",
  "dock",
  "siteSearch",
  "updateNotice",
  "dragGap",
  "dragFolder",
  "featureHint",
  "tooltip",
  "modeSwitch",
  "button",
  "choiceCards",
  "switch",
  "shortcutRecorder",
  "segmented",
  "slider",
  "popconfirm",
  "select",
  "tabs",
  "toast",
  "input",
  "checkbox",
];


// Grid rows are 4px; a card spans its shot and the gap under it (24px, 16px on phones).
const rowsFor = (stage: number, gap: number) => Math.ceil((stage + gap) / 4);

export interface DesignGalleryProps {
  page: Pick<DesignPageContent, "filters" | "filtersLabel" | "cards" | "sections" | "theme" | "replay">;
  demo: DesignDemoCopy;
  commandBar: HomeContent["commandBar"];
  searchPlaceholder: string;
  version: string;
  /** The latest release's title: the update notice's text, as the extension shows it. */
  releaseTitle: string;
  /** The extension's own strings in the language it shows this visitor (extension/strings.ts). */
  extensionStrings: ExtensionStrings;
  /** Chinese visitors: the WebDAV form suggests Jianguoyun, as the extension does. */
  zh: boolean;
  releaseHref: string;
}

// Filled icons, as the options page's own tabs use.
const FILTER_ICONS: Record<Filter, string> = {
  all: "ri-apps-2-fill",
  controls: "ri-toggle-fill",
  overlays: "ri-stack-fill",
  feedback: "ri-notification-3-fill",
  interactions: "ri-cursor-fill",
  patterns: "ri-drag-move-2-fill",
};

/** The filters as options-page tabs (settings-navigation.tsx markup). */
function FilterTabs({ label, value, onChange, items }: { label: string; value: Filter; onChange: (value: Filter) => void; items: Array<{ value: Filter; label: string; iconClass: string }> }) {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  useSegmentedIndicator(indicatorRef, `${value}\u0002${items.map((item) => item.label).join("\u0001")}`);
  return (
    <div className="_x_extension_settings_tabs_2024_unique_" role="tablist" aria-label={label}>
      <span aria-hidden="true" className="_x_extension_tabs_indicator_2024_unique_" ref={indicatorRef} />
      {items.map((item) => (
        <button
          type="button"
          role="tab"
          aria-selected={item.value === value}
          className="_x_extension_settings_tab_button_2024_unique_"
          data-active={item.value === value ? "true" : "false"}
          onClick={() => onChange(item.value)}
          key={item.value}
        >
          <i aria-hidden="true" className={`_x_extension_tab_icon_2024_unique_ ri-icon ${item.iconClass}`} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function DesignGallery(props: DesignGalleryProps) {
  const theme = useThemeState();
  return (
    <DesignThemeContext.Provider value={theme}>
      <ExtensionStringsContext.Provider value={props.extensionStrings}>
        <Gallery {...props} />
      </ExtensionStringsContext.Provider>
    </DesignThemeContext.Provider>
  );
}

function Gallery({ page, demo, commandBar, version, releaseTitle, releaseHref, zh }: DesignGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const { resolved } = useDesignTheme();

  const { settings, newtab, feedback } = demo;
  // One section per kind, simple to complex; within a section, wide shots beside narrow ones.
  const cards: CardSpec[] = [
    { id: "button", category: "controls", w: "m", h: 380, render: () => <ButtonCard /> },
    { id: "switch", category: "controls", w: "m", h: 320, render: () => <SwitchCard /> },
    { id: "checkbox", category: "controls", w: "s", h: 380, render: () => <CheckboxCard /> },
    { id: "segmented", category: "controls", w: "m", h: 400, render: () => <SegmentedCard /> },
    { id: "tabs", category: "controls", w: "m", h: 340, render: () => <TabsCard /> },
    { id: "slider", category: "controls", w: "m", h: 400, render: () => <SliderCard /> },
    { id: "input", category: "controls", w: "l", h: 380, render: () => <InputCard zh={zh} /> },
    { id: "shortcutRecorder", category: "controls", w: "m", h: 320, render: () => <ShortcutRecorderCard /> },
    { id: "choiceCards", category: "controls", w: "m", h: 380, render: () => <ChoiceCardsCard /> },
    { id: "bookmarkMenu", category: "overlays", w: "l", h: 480, wallpaper: ["white-shanshui", "dark-shanshui-moonlit"], render: () => <BookmarkMenuCard folderTitle={newtab.folder} subfolderTitle={newtab.subfolder} /> },
    { id: "contextMenu", category: "overlays", w: "s", h: 480, render: () => <ContextMenuCard /> },
    { id: "select", category: "overlays", w: "m", h: 380, render: () => <SelectCard /> },
    { id: "tooltip", category: "overlays", w: "m", h: 440, render: () => <TooltipCard /> },
    { id: "featureHint", category: "feedback", w: "xl", h: 260, render: () => <FeatureHintCard copy={feedback} buttonLabel={settings.appearanceSettings} /> },
    { id: "toast", category: "feedback", w: "m", h: 340, render: () => <ToastCard copy={feedback} /> },
    { id: "popconfirm", category: "feedback", w: "m", h: 380, render: () => <PopconfirmCard /> },
    { id: "updateNotice", category: "feedback", w: "m", h: 400, render: () => <UpdateNoticeCard copy={feedback} version={version} title={releaseTitle} releaseHref={releaseHref} /> },
    { id: "commandBar", category: "interactions", w: "l", h: 480, phone: 400, render: () => <CommandBarCard content={commandBar} /> },
    { id: "selection", category: "interactions", w: "s", h: 500, phone: 320, render: () => <SelectionCard copy={demo.selection} /> },
    { id: "siteSearch", category: "interactions", w: "m", h: 400, phone: 300, render: () => <SiteSearchCard content={commandBar} /> },
    { id: "dock", category: "interactions", w: "m", h: 420, phone: 260, render: () => <DockCard /> },
    { id: "scopeMenu", category: "interactions", w: "l", h: 500, phone: 480, render: () => <ScopeMenuCard content={commandBar} /> },
    { id: "dragFolder", category: "interactions", w: "s", h: 380, phone: 300, render: () => <DragFolderCard /> },
    { id: "tabSwitcher", category: "interactions", w: "xl", h: 340, phone: 260, wallpaper: ["impressionist-orchard-white", "dark-shanshui-moonlit"], render: () => <TabSwitcherCard /> },
    { id: "folderColor", category: "interactions", w: "xl", h: 600, phone: 640, render: () => <FolderColorCard folderTitle={newtab.folder} /> },
    { id: "dragGap", category: "patterns", w: "l", h: 380, render: () => <DragGapCard copy={demo.patterns} /> },
    { id: "refresh", category: "patterns", w: "s", h: 460, phone: 260, render: () => <RefreshCard copy={demo.patterns} /> },
    { id: "modeSwitch", category: "patterns", w: "m", h: 440, render: () => <ModeSwitchCard copy={demo.patterns} /> },
    { id: "dragPage", category: "patterns", w: "m", h: 420, render: () => <DragPageCard copy={demo.patterns} title={newtab.folder} /> },
    { id: "numberKeys", category: "patterns", w: "l", h: 460, phone: 400, render: () => <NumberKeysCard copy={demo.patterns} query="design" /> },
    { id: "accordion", category: "patterns", w: "s", h: 480, phone: 520, wallpaper: ["monet-lily-pond-white", "dark-monet-lily-nocturne"], render: () => <AccordionCard /> },
  ];

  const filters: Filter[] = ["all", "controls", "overlays", "feedback", "interactions", "patterns"];
  // 全部 is one waterfall, the most striking pieces first; each tab shows its own kind under a heading.
  const featured = FEATURED.map((id) => cards.find((card) => card.id === id)).filter((card): card is CardSpec => Boolean(card));
  const shown = filter === "all" ? [...featured, ...cards.filter((card) => !FEATURED.includes(card.id))] : cards.filter((card) => card.category === filter);

  return (
    <div className="dg">
      {/* One bar in the options page's tab strip: the filters, a divider, then light / dark. */}
      <div className="dg-filters dg-ext" data-theme={resolved}>
        <div className="_x_extension_settings_tabs_frame_2026_unique_ dg-filterbar">
          <FilterTabs label={page.filtersLabel} value={filter} onChange={setFilter} items={filters.map((value) => ({ value, label: page.filters[value], iconClass: FILTER_ICONS[value] }))} />
          <span className="dg-filterbar__divider" aria-hidden="true" />
          <ThemeToggle label={page.theme.label} lightLabel={page.theme.light} darkLabel={page.theme.dark} />
        </div>
      </div>
      <section className="dg-section" aria-labelledby={filter === "all" ? undefined : "dg-section-title"} aria-label={filter === "all" ? page.filters.all : undefined}>
        {filter === "all" ? null : (
          <header className="dg-section__head">
            <h2 id="dg-section-title">{page.filters[filter]}</h2>
            <p>{page.sections[filter]}</p>
          </header>
        )}
        <div className="dg-grid">
          {shown.map((card) => (
              <DemoCard
                key={card.id}
                replayLabel={page.replay}
                render={({ demo, ref, playing }) => (
                  <article
                    ref={ref}
                    className="dg-card dg-ext lumno-settings-kit"
                    data-theme={resolved}
                    data-w={card.w}
                    data-wallpaper={card.wallpaper ? "" : undefined}
                    data-playing={playing}
                    aria-labelledby={`dg-card-${card.id}`}
                    style={
                      {
                        "--dg-stage": `${card.h}px`,
                        "--dg-rows": rowsFor(card.h, 24),
                        "--dg-stage-phone": `${card.phone ?? card.h}px`,
                        "--dg-rows-phone": rowsFor(card.phone ?? card.h, 16),
                        ...(card.wallpaper
                          ? {
                              "--dg-wall-light": `url("${WALLPAPERS}/${card.wallpaper[0]}.webp")`,
                              "--dg-wall-dark": `url("${WALLPAPERS}/${card.wallpaper[1]}.webp")`,
                            }
                          : {}),
                      } as CSSProperties
                    }
                  >
                    <div className="dg-card__stage">
                      <div className="dg-card__canvas">{card.render()}</div>
                      <div className="dg-card__caption">
                        <h3 className="dg-card__name" id={`dg-card-${card.id}`}>
                          {page.cards[card.id]}
                        </h3>
                        {demo}
                      </div>
                    </div>
                  </article>
                )}
              />
          ))}
        </div>
      </section>
    </div>
  );
}
