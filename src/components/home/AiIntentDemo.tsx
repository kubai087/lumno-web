import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import type { SupportedLocale } from "@/lib/locales";

import "./ai-intent-demo.css";

const TOOLBAR_FALLBACK_ACTIONS = ["explain", "search", "translate"] as const;

type Action = "ask" | "explain" | "search" | "translate";
type DemoPhase = "idle" | "selecting" | "mark" | "toolbar" | "sending";

interface DemoCopy {
  actionLabels: Record<Action, string>;
  bodyAfter: string;
  bodyBefore: string;
  sendingLabel: string;
  selection: string;
  toolbarLabel: string;
  useLumnoLabel: string;
}

const COPY: Record<SupportedLocale, DemoCopy> = {
  "zh-CN": {
    actionLabels: {
      ask: "解答",
      explain: "解释",
      search: "调研",
      translate: "翻译",
    },
    bodyAfter: "那些暂时没有结论的时刻，并不是停滞，而是思绪正在悄悄长出新的方向。",
    bodyBefore: "我们总以为，理解是抵达某个确定的答案；后来才发现，",
    sendingLabel: "正在后台打开…",
    selection: "真正的阅读，是在仍未明白的时候，允许自己与问题同行。",
    toolbarLabel: "所选文字的 Lumno 快捷操作",
    useLumnoLabel: "使用 Lumno 处理所选文字",
  },
  "zh-TW": {
    actionLabels: {
      ask: "解答",
      explain: "解釋",
      search: "研究",
      translate: "翻譯",
    },
    bodyAfter: "那些暫時沒有結論的時刻，並不是停滯，而是思緒正在悄悄長出新的方向。",
    bodyBefore: "我們總以為，理解是抵達某個確定的答案；後來才發現，",
    sendingLabel: "正在背景開啟…",
    selection: "真正的閱讀，是在仍未明白的時候，允許自己與問題同行。",
    toolbarLabel: "所選文字的 Lumno 快捷操作",
    useLumnoLabel: "使用 Lumno 處理所選文字",
  },
  en: {
    actionLabels: {
      ask: "Answer",
      explain: "Explain",
      search: "Research",
      translate: "Translate",
    },
    bodyAfter: "An unfinished thought is not a pause; it is where a new direction quietly takes shape.",
    bodyBefore: "Perhaps understanding does not begin when an answer arrives, but when",
    sendingLabel: "Opening in the background…",
    selection: "we learn to stay with a question long enough for it to change us.",
    toolbarLabel: "Lumno actions for the selected text",
    useLumnoLabel: "Use Lumno with selected text",
  },
};

const ACTION_ICONS: Record<Action, string> = {
  ask: "ri-sparkling-2-fill",
  explain: "ri-lightbulb-line",
  search: "ri-search-line",
  translate: "ri-translate",
};

/** Keep the demo's action order aligned with the extension's selection toolbar. */
function getToolbarActions(primary: Action): Action[] {
  return [primary, ...TOOLBAR_FALLBACK_ACTIONS]
    .filter((action, index, actions): action is Action => actions.indexOf(action) === index)
    .slice(0, 3);
}

function DemoCursor() {
  return (
    <span aria-hidden="true" className="ai-intent-demo__cursor">
      <span className="ai-intent-demo__cursor-cap ai-intent-demo__cursor-cap--top" />
      <span className="ai-intent-demo__cursor-stem" />
      <span className="ai-intent-demo__cursor-cap ai-intent-demo__cursor-cap--bottom" />
    </span>
  );
}

interface AiIntentDemoProps {
  locale: SupportedLocale;
}

export function AiIntentDemo({ locale }: AiIntentDemoProps) {
  const copy = COPY[locale];
  const actions = getToolbarActions("ask");
  const demoRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLSpanElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const cycleTimerRef = useRef<number | null>(null);
  const actionTimerRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [run, setRun] = useState(0);

  const replay = useCallback(() => {
    if (cycleTimerRef.current !== null) {
      window.clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
    if (actionTimerRef.current !== null) {
      window.clearTimeout(actionTimerRef.current);
      actionTimerRef.current = null;
    }
    setPhase("idle");
    setRun((current) => current + 1);
  }, []);

  useEffect(() => {
    const selectingTimer = window.setTimeout(() => setPhase("selecting"), 760);
    const markTimer = window.setTimeout(() => setPhase("mark"), 2_240);

    cycleTimerRef.current = window.setTimeout(() => {
      cycleTimerRef.current = null;
      replay();
    }, 14_000);

    return () => {
      window.clearTimeout(selectingTimer);
      window.clearTimeout(markTimer);
      if (cycleTimerRef.current !== null) {
        window.clearTimeout(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };
  }, [replay, run]);

  useLayoutEffect(() => {
    const demo = demoRef.current;
    const selection = selectionRef.current;
    const surface = surfaceRef.current;
    if (!demo || !selection || !surface) {
      return;
    }

    const updateGeometry = () => {
      const demoRect = demo.getBoundingClientRect();
      const selectionRects = Array.from(selection.getClientRects()).filter(
        (rect) => rect.width > 0 && rect.height > 0,
      );
      const firstRect = selectionRects[0];
      const lastRect = selectionRects.at(-1);
      if (!firstRect || !lastRect || demoRect.width <= 0) {
        return;
      }

      const entryLeft = lastRect.right - demoRect.left + 5;
      const surfaceWidth = surface.getBoundingClientRect().width || 18;
      const safeLeft = 10;
      const safeRight = demoRect.width - surfaceWidth - 10;
      const clampedLeft = Math.max(safeLeft, Math.min(entryLeft, Math.max(safeLeft, safeRight)));

      demo.style.setProperty("--interaction-x", `${clampedLeft}px`);
      demo.style.setProperty(
        "--interaction-y",
        `${Math.max(16, lastRect.top - demoRect.top - 5)}px`,
      );
      demo.style.setProperty("--cursor-start-x", `${firstRect.left - demoRect.left}px`);
      demo.style.setProperty(
        "--cursor-start-y",
        `${firstRect.top - demoRect.top + firstRect.height / 2}px`,
      );
      demo.style.setProperty("--cursor-end-x", `${lastRect.right - demoRect.left}px`);
      demo.style.setProperty(
        "--cursor-end-y",
        `${lastRect.top - demoRect.top + lastRect.height / 2}px`,
      );
    };

    const frame = window.requestAnimationFrame(updateGeometry);
    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(updateGeometry) : null;
    resizeObserver?.observe(demo);
    window.addEventListener("resize", updateGeometry);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [copy.selection, phase, run]);

  const openToolbar = () => {
    if (cycleTimerRef.current !== null) {
      window.clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
    setPhase("toolbar");
  };
  const sendAction = () => {
    setPhase("sending");
    actionTimerRef.current = window.setTimeout(replay, 780);
  };

  return (
    <div
      ref={demoRef}
      aria-label={copy.toolbarLabel}
      className="ai-intent-demo"
      data-phase={phase}
      key={run}
      role="group"
    >
      <div className="ai-intent-demo__wallpaper" aria-hidden="true" />
      <div className="ai-intent-demo__scrim" aria-hidden="true" />

      <article className="ai-intent-demo__article">
        <p className="ai-intent-demo__body">
          <span>{copy.bodyBefore}</span>
          <span ref={selectionRef} className="ai-intent-demo__selection">
            {copy.selection}
          </span>
          <span>{copy.bodyAfter}</span>
        </p>
      </article>

      <div className="ai-intent-demo__interaction" aria-live="polite">
        <div
          ref={surfaceRef}
          className="ai-intent-demo__surface"
          data-icon-only={phase === "toolbar" ? "false" : "true"}
        >
          <span aria-hidden="true" className="ai-intent-demo__material" />
          <div className="ai-intent-demo__content">
            <div
              className="ai-intent-demo__actions-viewport"
              hidden={phase !== "toolbar"}
            >
              <div
                aria-label={copy.toolbarLabel}
                className="ai-intent-demo__toolbar"
                role="toolbar"
                tabIndex={-1}
              >
                {actions.map((action) => (
                  <button key={action} onClick={sendAction} type="button">
                    <i aria-hidden="true" className={`ai-intent-demo__action-icon ${ACTION_ICONS[action]}`} />
                    <span className="ai-intent-demo__action-label">{copy.actionLabels[action]}</span>
                  </button>
                ))}
              </div>
            </div>
            <span
              aria-hidden="true"
              className="ai-intent-demo__primary-divider"
              hidden={phase !== "toolbar"}
            />
            <button
              aria-expanded={phase === "toolbar"}
              aria-label={copy.useLumnoLabel}
              className="ai-intent-demo__main"
              data-icon-only={phase === "toolbar" ? "false" : "true"}
              onClick={phase === "toolbar" ? replay : openToolbar}
              type="button"
            >
              <img alt="" src="/assets/lumno-selection-mark.png" />
            </button>
          </div>
        </div>
        <p className="ai-intent-demo__sending" role="status">
          {copy.sendingLabel}
        </p>
      </div>

      <DemoCursor />
    </div>
  );
}
