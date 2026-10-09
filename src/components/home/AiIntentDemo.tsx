import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import type { SupportedLocale } from "@/lib/locales";
import { LUMNO_SITE_SEARCH_ICON_ROOT } from "@/lib/lumno-search-providers";

import { SettingsTabs } from "../extension-settings/SettingsKit";
import "./ai-intent-demo.css";

const TOOLBAR_FALLBACK_ACTIONS = ["explain", "search", "translate"] as const;

type Action = "ask" | "explain" | "search" | "translate";
type DemoPhase =
  | "idle"
  | "selecting"
  | "mark"
  | "toolbar"
  | "press"
  | "sending"
  | "flying"
  | "landing"
  | "sent"
  | "clearing";

/**
 * Each scenario selects a different kind of text from the same page. The primary
 * actions are what lumno-extension's own classifier (src/shared/selection-intent.js)
 * returns for these exact strings, so the demo never shows a guess the product
 * would not make.
 */
const SCENARIO_ACTIONS: readonly Action[] = ["ask", "explain", "translate"];

/** How long each phase holds before the next one; selecting advances itself. */
const PHASE_DELAYS: Partial<Record<DemoPhase, number>> = {
  idle: 760,
  mark: 680,
  toolbar: 900,
  press: 160,
  // The toolbar folds into the status pill, which stays long enough to read.
  sending: 640,
  flying: 720,
  landing: 380,
  sent: 1_500,
  clearing: 460,
};
const NEXT_PHASE: Partial<Record<DemoPhase, DemoPhase>> = {
  idle: "selecting",
  mark: "toolbar",
  toolbar: "press",
  sending: "flying",
  flying: "landing",
  landing: "sent",
  sent: "clearing",
};
const SELECT_DURATION_MS = 900;
const SELECT_TICK_MS = 30;
const MARK_DELAY_MS = 280;
const MAX_TABS = 3;
/** Half of the 14px favicon; the tab's inline padding comes from its --tab-pad. */
const TAB_ICON_HALF = 7;
/** Half of the 26px spinner dot the status pill folds into while it travels. */
const DOT_HALF = 13;
const IN_FLIGHT_PHASES = new Set<DemoPhase>(["flying", "landing"]);

interface Segment {
  text: string;
  scenario?: number;
}

interface DemoCopy {
  actionLabels: Record<Action, string>;
  groupLabel: string;
  kicker: string;
  kinds: [string, string, string];
  pageTitle: string;
  provider: { key: string; name: string };
  scenariosLabel: string;
  segments: Segment[];
  sendingLabel: string;
  toolbarLabel: string;
  useLumnoLabel: string;
}

/*
 * The article is per page language. Toolbar labels, the tab group and the status pill
 * are the extension's own UI, so languages it doesn't ship (getExtensionLocale) show
 * them in English, as installed users would see them.
 */
const COPY: Record<SupportedLocale, DemoCopy> = {
  "zh-CN": {
    actionLabels: {
      ask: "解答",
      explain: "解释",
      search: "调研",
      translate: "翻译",
    },
    groupLabel: "AI 查询",
    kicker: "光学小科普",
    kinds: ["问句", "术语", "外文"],
    pageTitle: "一束阳光的旅程",
    provider: { key: "ds", name: "DeepSeek" },
    scenariosLabel: "选中不同的文字",
    segments: [
      { text: "为什么天空是蓝色的？", scenario: 0 },
      { text: "阳光穿过大气层时，会被空气分子向四面八方散射，波长越短，散射越强——这就是" },
      { text: "瑞利散射", scenario: 1 },
      { text: "。英文教材里这样写：" },
      { text: "Blue light scatters more because its wavelength is shorter.", scenario: 2 },
    ],
    sendingLabel: "正在后台打开…",
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
    groupLabel: "AI 查詢",
    kicker: "光學小科普",
    kinds: ["問句", "術語", "外文"],
    pageTitle: "一束陽光的旅程",
    provider: { key: "gpt", name: "ChatGPT" },
    scenariosLabel: "選取不同的文字",
    segments: [
      { text: "為什麼天空是藍色的？", scenario: 0 },
      { text: "陽光穿過大氣層時，會被空氣分子往四面八方散射，波長越短，散射越強——這就是" },
      { text: "瑞利散射", scenario: 1 },
      { text: "。英文教科書這樣寫：" },
      { text: "Blue light scatters more because its wavelength is shorter.", scenario: 2 },
    ],
    sendingLabel: "正在背景開啟…",
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
    groupLabel: "AI Search",
    kicker: "Optics, briefly",
    kinds: ["Question", "Term", "Foreign text"],
    pageTitle: "A sunbeam’s short trip",
    provider: { key: "gpt", name: "ChatGPT" },
    scenariosLabel: "Select different text",
    segments: [
      { text: "Why is the sky blue?", scenario: 0 },
      { text: " Sunlight scatters off air molecules, and shorter wavelengths scatter the most — an effect called " },
      { text: "Rayleigh scattering", scenario: 1 },
      { text: ". A Japanese textbook puts it this way: " },
      { text: "青い光は波長が短いため、赤い光よりも強く散乱されます。", scenario: 2 },
    ],
    sendingLabel: "Opening in the background…",
    toolbarLabel: "Lumno actions for the selected text",
    useLumnoLabel: "Use Lumno with selected text",
  },
  ja: {
    actionLabels: {
      ask: "回答",
      explain: "説明",
      search: "調査",
      translate: "翻訳",
    },
    groupLabel: "AI 検索",
    kicker: "光の豆知識",
    kinds: ["質問", "用語", "外国語"],
    pageTitle: "ひと筋の太陽光の旅",
    provider: { key: "gpt", name: "ChatGPT" },
    scenariosLabel: "選択するテキストを切り替え",
    segments: [
      { text: "なぜ空は青いのでしょう？", scenario: 0 },
      { text: "太陽の光は大気を通るとき空気の分子にぶつかって四方に散らばり、波長が短いほど強く散乱されます。これを" },
      { text: "レイリー散乱", scenario: 1 },
      { text: "と呼びます。英語の教科書にはこう書かれています：" },
      { text: "Blue light scatters more because its wavelength is shorter.", scenario: 2 },
    ],
    sendingLabel: "バックグラウンドで開いています…",
    toolbarLabel: "選択したテキストへの Lumno の操作",
    useLumnoLabel: "選択したテキストを Lumno で処理",
  },
  ko: {
    actionLabels: {
      ask: "Answer",
      explain: "Explain",
      search: "Research",
      translate: "Translate",
    },
    groupLabel: "AI Search",
    kicker: "1분 광학 상식",
    kinds: ["질문", "용어", "외국어"],
    pageTitle: "햇빛 한 줄기의 짧은 여행",
    provider: { key: "gpt", name: "ChatGPT" },
    scenariosLabel: "선택할 텍스트 바꾸기",
    segments: [
      { text: "하늘은 왜 파란색일까요?", scenario: 0 },
      { text: " 햇빛은 대기를 지나며 공기 분자에 부딪혀 사방으로 흩어지는데, 파장이 짧을수록 더 많이 흩어집니다. 이를 레일리 산란(" },
      { text: "Rayleigh scattering", scenario: 1 },
      { text: ")이라고 합니다. 일본어 교과서에는 이렇게 나옵니다: " },
      { text: "青い光は波長が短いため、赤い光よりも強く散乱されます。", scenario: 2 },
    ],
    sendingLabel: "Opening in the background…",
    toolbarLabel: "선택한 텍스트에 쓸 수 있는 Lumno 작업",
    useLumnoLabel: "선택한 텍스트를 Lumno로 처리",
  },
  de: {
    actionLabels: {
      ask: "Answer",
      explain: "Explain",
      search: "Research",
      translate: "Translate",
    },
    groupLabel: "AI Search",
    kicker: "Optik, kurz erklärt",
    kinds: ["Frage", "Fachbegriff", "Fremdsprache"],
    pageTitle: "Die kurze Reise eines Sonnenstrahls",
    provider: { key: "gpt", name: "ChatGPT" },
    scenariosLabel: "Anderen Text markieren",
    segments: [
      { text: "Warum ist der Himmel blau?", scenario: 0 },
      { text: " Luftmoleküle streuen das Sonnenlicht in alle Richtungen, kurze Wellenlängen am stärksten. Man nennt das " },
      { text: "Rayleigh-Streuung", scenario: 1 },
      { text: ". In einem japanischen Schulbuch heißt es: " },
      { text: "青い光は波長が短いため、赤い光よりも強く散乱されます。", scenario: 2 },
    ],
    sendingLabel: "Opening in the background…",
    toolbarLabel: "Lumno-Aktionen für den markierten Text",
    useLumnoLabel: "Markierten Text mit Lumno verwenden",
  },
  fr: {
    actionLabels: {
      ask: "Answer",
      explain: "Explain",
      search: "Research",
      translate: "Translate",
    },
    groupLabel: "AI Search",
    kicker: "L’optique en bref",
    kinds: ["Question", "Terme", "Langue étrangère"],
    pageTitle: "Le court voyage d’un rayon de soleil",
    provider: { key: "gpt", name: "ChatGPT" },
    scenariosLabel: "Sélectionner un autre texte",
    segments: [
      { text: "Pourquoi le ciel est-il bleu\\u00A0?", scenario: 0 },
      { text: " Les molécules de l’air dispersent la lumière du soleil dans toutes les directions, d’autant plus que la longueur d’onde est courte. C’est la " },
      { text: "diffusion Rayleigh", scenario: 1 },
      { text: ". Un manuel japonais l’explique ainsi\\u00A0: " },
      { text: "青い光は波長が短いため、赤い光よりも強く散乱されます。", scenario: 2 },
    ],
    sendingLabel: "Opening in the background…",
    toolbarLabel: "Actions Lumno pour le texte sélectionné",
    useLumnoLabel: "Utiliser Lumno avec le texte sélectionné",
  },
  es: {
    actionLabels: {
      ask: "Answer",
      explain: "Explain",
      search: "Research",
      translate: "Translate",
    },
    groupLabel: "AI Search",
    kicker: "Óptica en pocas palabras",
    kinds: ["Pregunta", "Término", "Idioma extranjero"],
    pageTitle: "El breve viaje de un rayo de sol",
    provider: { key: "gpt", name: "ChatGPT" },
    scenariosLabel: "Seleccionar otro texto",
    segments: [
      { text: "¿Por qué el cielo es azul?", scenario: 0 },
      { text: " Las moléculas del aire dispersan la luz del sol en todas direcciones, y cuanto más corta es la longitud de onda, más se dispersa. Es la " },
      { text: "dispersión de Rayleigh", scenario: 1 },
      { text: ". Un libro de texto japonés lo explica así: " },
      { text: "青い光は波長が短いため、赤い光よりも強く散乱されます。", scenario: 2 },
    ],
    sendingLabel: "Opening in the background…",
    toolbarLabel: "Acciones de Lumno para el texto seleccionado",
    useLumnoLabel: "Usar Lumno con el texto seleccionado",
  },
  "pt-BR": {
    actionLabels: {
      ask: "Answer",
      explain: "Explain",
      search: "Research",
      translate: "Translate",
    },
    groupLabel: "AI Search",
    kicker: "Óptica em poucas palavras",
    kinds: ["Pergunta", "Termo", "Idioma estrangeiro"],
    pageTitle: "A curta viagem de um raio de sol",
    provider: { key: "gpt", name: "ChatGPT" },
    scenariosLabel: "Selecionar outro trecho",
    segments: [
      { text: "Por que o céu é azul?", scenario: 0 },
      { text: " As moléculas do ar espalham a luz do sol em todas as direções, e quanto menor o comprimento de onda, maior o espalhamento. É o chamado " },
      { text: "espalhamento Rayleigh", scenario: 1 },
      { text: ". Um livro didático japonês explica assim: " },
      { text: "青い光は波長が短いため、赤い光よりも強く散乱されます。", scenario: 2 },
    ],
    sendingLabel: "Opening in the background…",
    toolbarLabel: "Ações do Lumno para o texto selecionado",
    useLumnoLabel: "Usar o Lumno com o texto selecionado",
  },
  ru: {
    actionLabels: {
      ask: "Answer",
      explain: "Explain",
      search: "Research",
      translate: "Translate",
    },
    groupLabel: "AI Search",
    kicker: "Оптика в двух словах",
    kinds: ["Вопрос", "Термин", "Иностранный текст"],
    pageTitle: "Короткий путь солнечного луча",
    provider: { key: "ds", name: "DeepSeek" },
    scenariosLabel: "Выделить другой текст",
    segments: [
      { text: "Почему небо голубое?", scenario: 0 },
      { text: " Молекулы воздуха рассеивают солнечный свет во все стороны, и чем короче длина волны, тем сильнее рассеяние. Это называют рэлеевским рассеянием (англ. " },
      { text: "Rayleigh scattering", scenario: 1 },
      { text: "). В японском учебнике сказано так: " },
      { text: "青い光は波長が短いため、赤い光よりも強く散乱されます。", scenario: 2 },
    ],
    sendingLabel: "Opening in the background…",
    toolbarLabel: "Действия Lumno для выделенного текста",
    useLumnoLabel: "Обработать выделенный текст в Lumno",
  },
};

const ACTION_ICONS: Record<Action, string> = {
  ask: "ri-sparkling-2-fill",
  explain: "ri-lightbulb-line",
  search: "ri-search-line",
  translate: "ri-translate",
};

const ARROW_PATH = "M8.5 6.5 L43.5 28.7 L29.3 33 L20.8 50 Z";
const TEXT_CURSOR_PHASES = new Set<DemoPhase>(["idle", "selecting"]);
const TOOLBAR_PHASES = new Set<DemoPhase>(["toolbar", "press"]);

/** Keep the demo's action order aligned with the extension's selection toolbar. */
function getToolbarActions(primary: Action): Action[] {
  return [primary, ...TOOLBAR_FALLBACK_ACTIONS]
    .filter((action, index, actions): action is Action => actions.indexOf(action) === index)
    .slice(0, 3);
}

/** One cursor for the whole loop: an I-beam while selecting, an arrow while clicking. */
function DemoCursor() {
  return (
    <span aria-hidden="true" className="ai-intent-demo__cursor">
      <span className="ai-intent-demo__caret">
        <span className="ai-intent-demo__caret-cap ai-intent-demo__caret-cap--top" />
        <span className="ai-intent-demo__caret-stem" />
        <span className="ai-intent-demo__caret-cap ai-intent-demo__caret-cap--bottom" />
      </span>
      {/* Same arrow as the hero demo cursor (HeroSafariDemo), drawn smaller. */}
      <svg className="ai-intent-demo__arrow" viewBox="0 0 48 58">
        <g transform="rotate(-6 8.5 6.5)" strokeLinecap="round" strokeLinejoin="round">
          <path d={ARROW_PATH} fill="none" stroke="#fff" strokeWidth="10" />
          <path d={ARROW_PATH} fill="#303030" stroke="#303030" strokeWidth="2" />
        </g>
      </svg>
    </span>
  );
}

interface SentTab {
  id: number;
  action: Action;
  scenario: number;
}

interface AiIntentDemoProps {
  locale: SupportedLocale;
}

export function AiIntentDemo({ locale }: AiIntentDemoProps) {
  const copy = COPY[locale];
  const demoRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLSpanElement>(null);
  const caretAnchorRef = useRef<HTMLSpanElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const markRef = useRef<HTMLButtonElement>(null);
  const latestTabRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const clickPointRef = useRef<{ x: number; y: number } | null>(null);
  const tabIdRef = useRef(0);

  const [scenario, setScenario] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [selected, setSelected] = useState(0);
  const [tabs, setTabs] = useState<SentTab[]>([]);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const primary = SCENARIO_ACTIONS[scenario];
  const actions = getToolbarActions(primary);
  const target = copy.segments.find((segment) => segment.scenario === scenario)?.text ?? "";
  const toolbarOpen = TOOLBAR_PHASES.has(phase);
  const latestTab = tabs.at(-1);
  const providerIcon = `${LUMNO_SITE_SEARCH_ICON_ROOT}/glyph-${copy.provider.key}.svg`;

  const send = useCallback(
    (action: Action) => {
      tabIdRef.current += 1;
      const id = tabIdRef.current;
      setTabs((current) => [...current, { id, action, scenario }].slice(-MAX_TABS));
      setPhase("sending");
    },
    [scenario],
  );

  const jumpTo = useCallback((next: number) => {
    setScenario(next);
    setSelected(0);
    setPhase("idle");
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  // Only run the timeline while the demo is on screen.
  useEffect(() => {
    const demo = demoRef.current;
    if (!demo || typeof IntersectionObserver !== "function") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(demo);
    return () => observer.disconnect();
  }, []);

  // Reduced motion: show each scenario's finished state instead of animating it.
  useEffect(() => {
    if (!reducedMotion) {
      return;
    }
    setSelected(target.length);
    setTabs([{ id: scenario + 1, action: primary, scenario }]);
    setPhase("sent");
  }, [primary, reducedMotion, scenario, target.length]);

  useEffect(() => {
    if (!visible || reducedMotion) {
      return;
    }

    if (phase === "selecting") {
      const step = Math.max(1, Math.ceil(target.length / (SELECT_DURATION_MS / SELECT_TICK_MS)));
      const timer =
        selected < target.length
          ? window.setTimeout(() => setSelected((count) => Math.min(target.length, count + step)), SELECT_TICK_MS)
          : window.setTimeout(() => setPhase("mark"), MARK_DELAY_MS);
      return () => window.clearTimeout(timer);
    }

    const delay = PHASE_DELAYS[phase];
    if (delay === undefined) {
      return;
    }
    const timer = window.setTimeout(() => {
      if (phase === "press") {
        send(primary);
      } else if (phase === "clearing") {
        const next = (scenario + 1) % SCENARIO_ACTIONS.length;
        // The group has faded out by now, so starting over doesn't pop tabs away.
        if (next === 0) {
          setTabs([]);
        }
        jumpTo(next);
      } else {
        const next = NEXT_PHASE[phase];
        if (next) {
          setPhase(next);
        }
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [jumpTo, phase, primary, reducedMotion, scenario, selected, send, target.length, visible]);

  useLayoutEffect(() => {
    const demo = demoRef.current;
    const frame = frameRef.current;
    if (!demo || !frame) {
      return;
    }

    const set = (name: string, value: number) =>
      demo.style.setProperty(name, `${Math.round(value * 10) / 10}px`);

    const updateGeometry = () => {
      const frameRect = frame.getBoundingClientRect();
      if (frameRect.width <= 0) {
        return;
      }
      const local = (rect: DOMRect) => ({
        left: rect.left - frameRect.left,
        top: rect.top - frameRect.top,
        right: rect.right - frameRect.left,
        bottom: rect.bottom - frameRect.top,
        x: rect.left - frameRect.left + rect.width / 2,
        y: rect.top - frameRect.top + rect.height / 2,
      });

      // The mark sits just under the end of the selection and the toolbar unfolds
      // leftwards from it, so it never moves and never covers the selected words.
      const lines = Array.from(selectedRef.current?.getClientRects() ?? []).filter(
        (rect) => rect.width > 0 && rect.height > 0,
      );
      const lastLine = lines.at(-1);
      const surface = surfaceRef.current;
      if (lastLine && surface) {
        const line = local(lastLine);
        const half = surface.offsetHeight / 2;
        const anchorX = Math.min(Math.max(line.right + 10, surface.offsetWidth + 14), frameRect.width - 14);
        let anchorY = line.bottom + half + 4;
        if (anchorY + half > frameRect.height - 12) {
          anchorY = line.top - half - 4;
        }
        set("--anchor-x", anchorX);
        set("--anchor-y", anchorY);
      }

      const primaryButton = primaryRef.current ? local(primaryRef.current.getBoundingClientRect()) : null;
      // The toolbar's material shrinks to exactly the status pill's width.
      if (statusRef.current && !IN_FLIGHT_PHASES.has(phase)) {
        set("--status-w", statusRef.current.offsetWidth);
      }

      const tabElement = latestTabRef.current;
      const tab = tabElement ? local(tabElement.getBoundingClientRect()) : null;
      if (tab && tabElement) {
        const tabPad = Number.parseFloat(getComputedStyle(tabElement).getPropertyValue("--tab-pad")) || 0;
        // The surface is anchored by its right edge; land the dot on the tab's icon slot.
        // The tab grows rightwards, so its left edge is already final.
        set("--fly-to-x", tab.left + tabPad + TAB_ICON_HALF + DOT_HALF);
        set("--fly-to-y", tab.y);
      }

      // Where the single cursor should be for this phase.
      let cursor: { x: number; y: number } | null = null;
      if (TEXT_CURSOR_PHASES.has(phase)) {
        const caret = caretAnchorRef.current ? local(caretAnchorRef.current.getBoundingClientRect()) : null;
        cursor = caret ? { x: caret.left, y: caret.y } : null;
      } else if (phase === "mark") {
        cursor = markRef.current ? local(markRef.current.getBoundingClientRect()) : null;
      } else if (TOOLBAR_PHASES.has(phase) && primaryButton) {
        cursor = { x: primaryButton.x, y: primaryButton.y };
        clickPointRef.current = cursor;
      } else {
        // After the click the cursor stays put; only the request (and the button with it) moves.
        cursor = clickPointRef.current;
      }
      if (cursor) {
        set("--cursor-x", cursor.x);
        set("--cursor-y", cursor.y);
      }
    };

    updateGeometry();
    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(updateGeometry) : null;
    resizeObserver?.observe(frame);
    return () => resizeObserver?.disconnect();
  }, [phase, scenario, selected, tabs]);

  return (
    <div
      ref={demoRef}
      className="ai-intent-demo"
      data-cursor={TEXT_CURSOR_PHASES.has(phase) ? "text" : "arrow"}
      data-phase={phase}
      data-scenario={scenario}
    >
      <div className="ai-intent-demo__stage home-media">
        <div className="ai-intent-demo__wallpaper" aria-hidden="true" />

        <div ref={frameRef} className="ai-intent-demo__window">
          <div className="ai-intent-demo__tabs" aria-hidden="true">
            <span className="ai-intent-demo__lights">
              <i />
              <i />
              <i />
            </span>
            <span className="ai-intent-demo__tab ai-intent-demo__tab--page">
              <i className="ri-article-line" />
              <span>{copy.pageTitle}</span>
            </span>
            {tabs.length > 0 && (
              <span
                className="ai-intent-demo__group"
                data-leaving={phase === "clearing" && scenario === SCENARIO_ACTIONS.length - 1 ? "true" : "false"}
                data-pending={tabs.length === 1 && phase === "sending" ? "true" : "false"}
              >
                <span className="ai-intent-demo__group-label">{copy.groupLabel}</span>
                {tabs.map((tab) => {
                  const isLatest = tab.id === latestTab?.id;
                  let state = "ready";
                  if (isLatest && phase === "sending") {
                    state = "reserved";
                  } else if (isLatest && phase === "flying") {
                    state = "opening";
                  } else if (isLatest && phase === "landing") {
                    state = "loading";
                  } else if (isLatest && phase === "sent") {
                    state = "landed";
                  }
                  return (
                    <span
                      key={tab.id}
                      ref={isLatest ? latestTabRef : undefined}
                      className="ai-intent-demo__tab ai-intent-demo__tab--ai"
                      data-state={state}
                    >
                      <span className="ai-intent-demo__tab-icon">
                        <span className="ai-intent-demo__spinner" />
                        <img src={providerIcon} alt="" loading="lazy" />
                      </span>
                      <span>{copy.provider.name}</span>
                    </span>
                  );
                })}
              </span>
            )}
          </div>

          <article className="ai-intent-demo__page">
            <p className="ai-intent-demo__kicker">{copy.kicker}</p>
            <p className="ai-intent-demo__title">{copy.pageTitle}</p>
            <p className="ai-intent-demo__body">
              {copy.segments.map((segment, index) =>
                segment.scenario === scenario ? (
                  <span key={index}>
                    <span ref={selectedRef} className="ai-intent-demo__selection">
                      {segment.text.slice(0, selected)}
                    </span>
                    <span ref={caretAnchorRef} className="ai-intent-demo__caret-anchor" />
                    {segment.text.slice(selected)}
                  </span>
                ) : (
                  <span key={index}>{segment.text}</span>
                ),
              )}
            </p>
          </article>

          <div className="ai-intent-demo__interaction">
            <div ref={surfaceRef} className="ai-intent-demo__surface">
              <span aria-hidden="true" className="ai-intent-demo__material" />
              <div className="ai-intent-demo__content">
                <div aria-label={copy.toolbarLabel} className="ai-intent-demo__toolbar" role="toolbar">
                  {actions.map((action, index) => (
                    <button
                      key={action}
                      ref={index === 0 ? primaryRef : undefined}
                      data-primary={index === 0 ? "true" : "false"}
                      onClick={() => send(action)}
                      tabIndex={toolbarOpen ? 0 : -1}
                      type="button"
                    >
                      <i aria-hidden="true" className={`ai-intent-demo__action-icon ${ACTION_ICONS[action]}`} />
                      <span className="ai-intent-demo__action-label">{copy.actionLabels[action]}</span>
                    </button>
                  ))}
                </div>
                <span aria-hidden="true" className="ai-intent-demo__primary-divider" />
                <button
                  ref={markRef}
                  aria-expanded={toolbarOpen}
                  aria-label={copy.useLumnoLabel}
                  className="ai-intent-demo__main"
                  onClick={() => setPhase(toolbarOpen ? "clearing" : "toolbar")}
                  tabIndex={phase === "mark" || toolbarOpen ? 0 : -1}
                  type="button"
                >
                  <img alt="" src="/assets/lumno-selection-mark.png" loading="lazy" />
                </button>
              </div>
              {/* The same surface carries the request: pill, then a dot that drops into the tab. */}
              <span ref={statusRef} className="ai-intent-demo__status" role="status">
                <span className="ai-intent-demo__spinner" />
                <span className="ai-intent-demo__status-label">{copy.sendingLabel}</span>
              </span>
            </div>
          </div>

          <DemoCursor />
        </div>
      </div>

      {/* One Lumno tab bar, like the hero's page switcher; the toolbar above already shows the action. */}
      <SettingsTabs
        ariaLabel={copy.scenariosLabel}
        className="lumno-settings-kit ai-intent-demo__scenarios"
        itemClassName="ai-intent-demo__scenario"
        items={SCENARIO_ACTIONS.map((action, index) => ({ value: action, label: copy.kinds[index] }))}
        onValueChange={(action) => jumpTo(SCENARIO_ACTIONS.indexOf(action))}
        value={SCENARIO_ACTIONS[scenario]}
      />
    </div>
  );
}
