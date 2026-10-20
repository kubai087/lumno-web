import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { DesignDemoCopy } from "../../lib/design-content";
import { useCardDemo } from "./demo";
import { Panel } from "./ControlCards";
import { useExtensionText } from "./ext-strings";
import { site } from "./NewTab";
import { Marked, OverlayInput, OverlayPanel, OverlayStage, OverlaySuggestions, SuggestionRow, useOverlayMode, useSiteTheme } from "./Overlay";

/*
 * The extension's feedback surfaces: shared/tooltip.css, shared/toast.css
 * (with its 240ms loading delay), the search input's popconfirm and the
 * update notice (shared/feature-hints.css, .x-lumno-feature-hint--update-notice).
 */

type Copy = DesignDemoCopy["feedback"];

/*
 * Tooltips on the command bar (shared/cursor-tooltip.js): the row under the
 * pointer shows its copy and remove-from-history actions, and each icon button
 * names itself in the extension's tooltip, as does the brush that closes other tabs.
 */
type TipTarget = "copy" | "remove" | "brush";
const TIP_SELECTOR: Record<TipTarget, string> = {
  copy: ".x-ov-suggestion-utility-button[aria-label]:not([aria-label=''])",
  remove: ".x-ov-suggestion-utility-slot:not([data-leading]) .x-ov-suggestion-utility-button",
  brush: ".x-ov-close-other-tabs",
};

export function TooltipCard() {
  const t = useExtensionText();
  const mode = useOverlayMode();
  const hostRef = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<TipTarget | null>("remove");
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const tipText: Record<TipTarget, string> = {
    copy: t("search_copy_url_tooltip"),
    remove: t("search_remove_history_tooltip"),
    brush: t("overlay_close_other_tabs_tooltip"),
  };

  // The tooltip centres over the button it names, 8px above it, in the card's (unscaled) coordinates.
  useLayoutEffect(() => {
    const host = hostRef.current;
    const button = target ? host?.querySelector<HTMLElement>(TIP_SELECTOR[target]) : null;
    if (!host || !button || !target) {
      setTip(null);
      return;
    }
    const base = host.getBoundingClientRect();
    const scale = base.width / host.offsetWidth || 1;
    const rect = button.getBoundingClientRect();
    setTip({ x: (rect.left + rect.width / 2 - base.left) / scale, y: (rect.top - base.top) / scale, text: tipText[target] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, mode]);

  useCardDemo((timeline) => {
    (["copy", "remove", "brush", null, "remove"] as const).forEach((next, step) => timeline.at(400 + step * 800, () => setTarget(next)));
  });

  const pointAt = (element: EventTarget | null) => {
    if (!(element instanceof Element)) return;
    const found = (Object.keys(TIP_SELECTOR) as TipTarget[]).find((key) => element.closest(TIP_SELECTOR[key]));
    setTarget(found || null);
  };

  const github = { title: "kubai087/lumno-extension", url: "https://github.com/kubai087/lumno-extension" };
  return (
    <OverlayStage className="dg-ovl-stage--middle">
      <div className="dg-tip-host" ref={hostRef} data-theme={mode} onPointerOver={(event) => pointAt(event.target)} onPointerLeave={() => setTarget(null)}>
        <OverlayPanel>
          <OverlayInput value="lumno" placeholder={t("overlay_search_placeholder")} collapsed={false} />
          <OverlaySuggestions collapsed={false}>
            <TipRow title={github.title} url={github.url} />
          </OverlaySuggestions>
        </OverlayPanel>
        <span
          className="_x_extension_tooltip_2026_unique_ dg-tip"
          data-tooltip-kind="cursor"
          data-visible={tip ? "true" : "false"}
          role="tooltip"
          style={tip ? ({ left: tip.x, top: tip.y } as CSSProperties) : undefined}
        >
          {tip?.text}
        </span>
      </div>
    </OverlayStage>
  );
}

function TipRow({ title, url }: { title: string; url: string }) {
  const t = useExtensionText();
  const theme = useSiteTheme({ url, image: site("github").favicon });
  return (
    <SuggestionRow
      index={0}
      last
      theme={theme}
      active
      hovering
      favicon={site("github").favicon}
      title={<Marked text={title} mark="lumno" />}
      detail={<Marked text={url.replace("https://", "")} mark="lumno" />}
      detailKind="url"
      source="history"
      action={t("action_open_new_tab")}
    />
  );
}

type ToastState = { text: string; loading: boolean; tone?: "error" } | null;

/** One toast per card, at the top of its stage, like the extension's pinned toast. */
export function useToast() {
  const [toast, setToast] = useState<ToastState>(null);
  const [shown, setShown] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const later = (ms: number, run: () => void) => timers.current.push(window.setTimeout(run, ms));
  const clear = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };
  const show = (text: string, duration = 2200) => {
    setToast({ text, loading: false });
    setShown(true);
    later(duration, () => setShown(false));
  };
  // shared/toast.css (.x-lumno-toast), held inside the card rather than fixed to the window.
  const node: ReactNode = (
    <div className="x-lumno-toast dg-toast" data-show={shown ? "true" : "false"} data-tone={toast?.loading ? "loading" : undefined} role="status" aria-live="polite">
      {toast?.loading ? <span className="x-lumno-toast-spinner" aria-hidden="true" /> : null}
      {toast?.text}
    </div>
  );
  return { node, show, setToast, setShown, later, clear };
}

export function ToastCard({ copy }: { copy: Copy }) {
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  const save = () => {
    if (busy) return;
    toast.clear();
    toast.setShown(false);
    setBusy(true);
    // A task's toast waits 240ms, so quick saves only ever show their result.
    toast.later(240, () => {
      toast.setToast({ text: copy.savingWallpaper, loading: true });
      toast.setShown(true);
    });
    toast.later(1500, () => {
      setBusy(false);
      toast.show(copy.saved);
    });
  };

  useCardDemo((t) => t.at(400, save));

  return (
    <div className="dg-feedback">
      {toast.node}
      {/* shared/busy.css: after 240ms a spinner takes the label's place, keeping the button's width. */}
      <button
        type="button"
        className="_x_extension_shortcut_submit_2024_unique_ _x_extension_shortcut_submit_primary_2024_unique_ _x_extension_shortcut_save_2024_unique_ dg-busy-button"
        aria-busy={busy}
        onClick={save}
      >
        {/* shared/busy-label.tsx: the spinner is only there while busy. */}
        <span className="x-lumno-busy-label">{copy.saveWallpaper}</span>
        {busy ? <span className="x-lumno-spinner" aria-hidden="true" /> : null}
      </button>
    </div>
  );
}

/*
 * The blacklist tab's 全局禁用 group (options.html): its clear button, an icon
 * action with a tooltip, asks first in a popconfirm (popconfirm.tsx) and
 * confirms with a toast.
 */
export function PopconfirmCard() {
  const t = useExtensionText();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useCardDemo((timeline) => {
    timeline.at(0, () => setOpen(false));
    timeline.at(500, () => setOpen(true));
    timeline.at(2100, () => {
      setOpen(false);
      toast.clear();
      toast.show(t("toast_cleared"));
    });
    timeline.onStop(() => setOpen(false));
  });

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div className="dg-feedback">
      {toast.node}
      <Panel className="dg-ext-panel--top">
        <div className="_x_extension_shortcuts_section_2024_unique_">
          <div className="_x_extension_shortcut_group_2024_unique_">
            <div className="_x_extension_shortcut_group_header_2024_unique_">
              <div className="_x_extension_shortcut_group_title_2024_unique_ _x_extension_section_title_2024_unique_">{t("blacklist_group_custom")}</div>
              <div className="_x_extension_popconfirm_wrap_2024_unique_" ref={rootRef}>
                <button
                  type="button"
                  className="_x_extension_shortcut_group_action_2024_unique_ _x_extension_tooltip_host_2026_unique_"
                  aria-label={t("blacklist_clear")}
                  aria-expanded={open}
                  aria-haspopup="dialog"
                  onPointerEnter={() => setHover(true)}
                  onPointerLeave={() => setHover(false)}
                  onClick={() => {
                    setHover(false);
                    setOpen((value) => !value);
                  }}
                >
                  <i className="ri-icon ri-size-14 ri-delete-bin-4-line" aria-hidden="true" />
                </button>
                <span className="_x_extension_tooltip_2026_unique_ dg-ext-info__tooltip" data-tooltip-position="absolute" data-visible={hover && !open ? "true" : "false"} aria-hidden="true">
                  {t("blacklist_clear")}
                </span>
                <div className="_x_extension_popconfirm_2024_unique_" role="dialog" aria-label={t("confirm_clear_blacklist")} data-open={open ? "true" : "false"} aria-hidden={!open}>
                  <div className="_x_extension_popconfirm_text_2024_unique_">{t("confirm_clear_blacklist")}</div>
                  <div className="_x_extension_popconfirm_actions_2024_unique_">
                    <button type="button" className="_x_extension_shortcut_submit_2024_unique_ _x_extension_shortcut_secondary_2024_unique_" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                      {t("confirm_cancel")}
                    </button>
                    <button
                      type="button"
                      className="_x_extension_shortcut_submit_2024_unique_ _x_extension_shortcut_submit_primary_2024_unique_ _x_extension_shortcut_save_2024_unique_"
                      aria-busy="false"
                      tabIndex={open ? 0 : -1}
                      onClick={() => {
                        setOpen(false);
                        toast.clear();
                        toast.show(t("toast_cleared"));
                      }}
                    >
                      <span className="x-lumno-busy-label">{t("confirm_ok")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="_x_extension_setting_desc_2024_unique_ _x_extension_setting_desc_compact_2026_unique_">{t("blacklist_section_desc")}</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

type HintProps = { visible: boolean; onDismiss: () => void; closeLabel: string };

/** The close button every hint has (feature-hint-view.tsx). */
function HintClose({ visible, onDismiss, closeLabel }: HintProps) {
  return (
    <button type="button" aria-label={closeLabel} className="x-lumno-feature-hint__close" tabIndex={visible ? 0 : -1} onClick={onDismiss}>
      <i className="ri-icon ri-size-12 ri-close-line" aria-hidden="true" />
    </button>
  );
}

/** Dismissed, a hint comes back a moment later so the card is never empty. */
function useComesBack() {
  const [visible, setVisible] = useState(true);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const dismiss = () => {
    setVisible(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setVisible(true), 1600);
  };
  const toggle = () => {
    window.clearTimeout(timer.current);
    setVisible((value) => !value);
  };
  return { visible, dismiss, toggle };
}

/*
 * The update notice under the new tab's search bar (update-notice.js, the
 * "newtab" surface): butterfly badge with the version, the release's title,
 * the changelog link and close.
 */
export function UpdateNoticeCard({ copy, version, title, releaseHref }: { copy: Copy; version: string; title: string; releaseHref: string }) {
  const { visible, dismiss } = useComesBack();
  return (
    <div className="dg-feedback">
      <span
        className="x-lumno-feature-hint x-lumno-feature-hint--update-notice x-lumno-feature-hint--update-notice-newtab"
        role="note"
        data-arrow-side="top"
        data-arrow-align="center"
        data-width-mode="container"
        data-align-mode="auto"
        data-multiline="false"
        data-has-link="true"
        data-has-actions="false"
        data-rounded-arrow-tip="false"
        data-visible={visible ? "true" : "false"}
        aria-hidden={!visible}
      >
        <span aria-label={copy.updateBadge.replace("{version}", version)} className="x-lumno-feature-hint__badge">
          <span className="x-lumno-feature-hint__badge-icon" data-icon-type="text">
            🦋
          </span>
          <span className="x-lumno-feature-hint__badge-text">{copy.updateBadge.replace("{version}", version)}</span>
        </span>
        <span className="x-lumno-feature-hint__text">{title || copy.updateText}</span>
        <a className="x-lumno-feature-hint__link" href={releaseHref} title={copy.updateLink} tabIndex={visible ? 0 : -1}>
          <span className="x-lumno-feature-hint__link-text">{copy.updateLink}</span>
          <span className="x-lumno-feature-hint__link-icon">
            <i className="ri-icon ri-size-12 ri-arrow-right-line" aria-hidden="true" />
          </span>
        </a>
        <HintClose visible={visible} onDismiss={dismiss} closeLabel={copy.updateClose} />
      </span>
    </div>
  );
}

/*
 * The new wallpapers hint (feature-hints.js NEWTAB_WALLPAPER_SOURCES) beside
 * the new tab's appearance button it points at: one line, its arrow on the
 * right with a rounded tip, the asterisk badge with its light sweep. The
 * button toggles it too.
 */
export function FeatureHintCard({ copy, buttonLabel }: { copy: Copy; buttonLabel: string }) {
  const { visible, dismiss, toggle } = useComesBack();
  return (
    <div className="dg-feedback">
      <div className="dg-hint-row">
        <span
          className="x-lumno-feature-hint x-lumno-feature-hint--newtab-wallpaper"
          role="note"
          data-arrow-side="right"
          data-arrow-align="center"
          data-width-mode="content"
          data-align-mode="auto"
          data-multiline="false"
          data-has-link="false"
          data-has-actions="false"
          data-rounded-arrow-tip="true"
          data-visible={visible ? "true" : "false"}
          aria-hidden={!visible}
        >
          <span aria-hidden="true" className="x-lumno-feature-hint__arrow-tip" />
          <span aria-label={copy.hintBadge} className="x-lumno-feature-hint__badge">
            <span className="x-lumno-feature-hint__badge-icon">
              <i className="ri-icon ri-size-10 ri-asterisk" aria-hidden="true" />
            </span>
            <span className="x-lumno-feature-hint__badge-text">{copy.hintBadge}</span>
          </span>
          <span className="x-lumno-feature-hint__text">{copy.hintText}</span>
          <HintClose visible={visible} onDismiss={dismiss} closeLabel={copy.hintClose} />
        </span>
        <button type="button" className="dg-hint__target" aria-label={buttonLabel} title={buttonLabel} onClick={toggle}>
          <i className="ri-palette-line" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
