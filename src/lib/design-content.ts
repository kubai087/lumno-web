import { EXTENSION_STRINGS } from "../components/design/extension/strings";
import { getExtensionLocale, type ExtensionLocale, type SupportedLocale } from "./locales";

/*
 * Copy for /design, the gallery of Lumno's interface components.
 *
 * Page copy (title, filters, card names, SEO) ships in every site language.
 * Text inside the components is the extension's own UI, so it follows the
 * language the extension shows that visitor (getExtensionLocale) and is taken
 * from lumno-extension/_locales wherever the extension already has the string.
 */

/** Filters by kind of component, so each card belongs to exactly one. */
export const DESIGN_CATEGORIES = ["controls", "overlays", "feedback", "interactions", "patterns"] as const;
export type DesignCategory = (typeof DESIGN_CATEGORIES)[number];

export const DESIGN_CARD_IDS = [
  "button",
  "switch",
  "checkbox",
  "segmented",
  "slider",
  "input",
  "shortcutRecorder",
  "tabs",
  "choiceCards",
  "select",
  "bookmarkMenu",
  "contextMenu",
  "tooltip",
  "popconfirm",
  "toast",
  "updateNotice",
  "featureHint",
  "commandBar",
  "siteSearch",
  "scopeMenu",
  "selection",
  "tabSwitcher",
  "dock",
  "dragFolder",
  "folderColor",
  "dragGap",
  "dragPage",
  "accordion",
  "refresh",
  "modeSwitch",
  "numberKeys",
] as const;
export type DesignCardId = (typeof DESIGN_CARD_IDS)[number];

export type DesignPageContent = {
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** The page's one-line statement. */
  title: string;
  lead: string;
  filtersLabel: string;
  filters: Record<"all" | DesignCategory, string>;
  /** One line under each section title. */
  sections: Record<DesignCategory, string>;
  /** The page's own light / dark switch. */
  theme: { label: string; light: string; dark: string };
  /** The replay button on cards that play a demo. */
  replay: string;
  /** The hero's second collaborator cursor: the visitor. */
  cursorYou: string;
  cards: Record<DesignCardId, string>;
};

const PAGE: Record<SupportedLocale, DesignPageContent> = {
  "zh-CN": {
    navLabel: "设计",
    seoTitle: "Lumno 界面组件：控件、菜单与交互",
    seoDescription:
      "Lumno 浏览器扩展里的控件、菜单、反馈与交互，按扩展的真实样式还原，每一个都能直接在网页上点击、输入和拖动体验。",
    keywords: ["Lumno 组件", "界面组件", "微交互", "命令栏", "新标签页", "浏览器扩展设计"],
    title: "Lumno 的每个组件，都从零做起",
    lead: "为了更好的体验，也出于作者的兴趣，Lumno 没有用任何现成的组件库。下面的组件都按扩展的真实样式还原，可以直接上手试。",
    filtersLabel: "按组件类型筛选",
    filters: { all: "全部", controls: "基础控件", overlays: "菜单与浮层", feedback: "反馈", interactions: "交互", patterns: "交互范式" },
    sections: {
      controls: "设置页和面板里的开关、按钮与输入。",
      overlays: "从按钮、书签和右键展开的菜单与提示。",
      feedback: "保存、确认、更新和新功能时的提示方式。",
      interactions: "命令栏与新标签页里的整套操作。",
      patterns: "拖拽、展开、联动与键盘：同一套做法，在各处复用。",
    },
    theme: { label: "深浅色模式", light: "浅色", dark: "深色" },
    replay: "重新演示",
    cursorYou: "你",
    cards: {
      button: "按钮",
      switch: "开关",
      checkbox: "复选框",
      segmented: "分段控件",
      slider: "滑块",
      input: "输入框",
      shortcutRecorder: "快捷键列表",
      tabs: "标签栏",
      choiceCards: "选择卡片",
      select: "下拉菜单",
      bookmarkMenu: "书签菜单",
      contextMenu: "右键菜单",
      tooltip: "提示气泡",
      popconfirm: "二次确认",
      toast: "轻提示",
      updateNotice: "更新提示",
      featureHint: "新功能提示",
      commandBar: "命令栏",
      siteSearch: "站内搜索",
      scopeMenu: "搜索范围面板",
      selection: "划词工具栏",
      tabSwitcher: "标签切换器",
      dock: "快捷方式栏",
      dragFolder: "拖拽建文件夹",
      folderColor: "文件夹颜色",
      dragGap: "拖拽让位",
      dragPage: "拖到翻页",
      accordion: "折叠面板",
      refresh: "刷新与反馈",
      modeSwitch: "折叠切换",
      numberKeys: "数字直达",
    },
  },
  "zh-TW": {
    navLabel: "設計",
    seoTitle: "Lumno 介面元件：控制項、選單與互動",
    seoDescription:
      "Lumno 瀏覽器擴充功能裡的控制項、選單、回饋與互動，依擴充功能的實際樣式重現，每一個都能直接在網頁上點按、輸入和拖曳體驗。",
    keywords: ["Lumno 元件", "介面元件", "微互動", "命令列", "新分頁", "瀏覽器擴充功能設計"],
    title: "Lumno 的每個元件，都從零做起",
    lead: "為了更好的體驗，也出於作者的興趣，Lumno 沒有使用任何現成的元件庫。下面的元件都依擴充功能的實際樣式重現，可以直接動手試。",
    filtersLabel: "依元件類型篩選",
    filters: { all: "全部", controls: "基礎控制項", overlays: "選單與浮層", feedback: "回饋", interactions: "互動", patterns: "互動範式" },
    sections: {
      controls: "設定頁與面板裡的開關、按鈕與輸入框。",
      overlays: "從按鈕、書籤和右鍵展開的選單與提示。",
      feedback: "儲存、確認、更新與新功能時的提示方式。",
      interactions: "命令列與新分頁裡的完整操作。",
      patterns: "拖曳、展開、連動與鍵盤：同一套做法，在各處沿用。",
    },
    theme: { label: "深淺色模式", light: "淺色", dark: "深色" },
    replay: "重新示範",
    cursorYou: "你",
    cards: {
      button: "按鈕",
      switch: "開關",
      checkbox: "核取方塊",
      segmented: "分段控制",
      slider: "滑桿",
      input: "輸入框",
      shortcutRecorder: "快速鍵列表",
      tabs: "分頁標籤",
      choiceCards: "選擇卡片",
      select: "下拉選單",
      bookmarkMenu: "書籤選單",
      contextMenu: "右鍵選單",
      tooltip: "提示泡泡",
      popconfirm: "再次確認",
      toast: "輕提示",
      updateNotice: "更新提示",
      featureHint: "新功能提示",
      commandBar: "命令列",
      siteSearch: "站內搜尋",
      scopeMenu: "搜尋範圍面板",
      selection: "選字工具列",
      tabSwitcher: "分頁切換器",
      dock: "捷徑列",
      dragFolder: "拖曳建立資料夾",
      folderColor: "資料夾顏色",
      dragGap: "拖曳讓位",
      dragPage: "拖到翻頁",
      accordion: "摺疊面板",
      refresh: "重新整理與回饋",
      modeSwitch: "摺疊切換",
      numberKeys: "數字直達",
    },
  },
  en: {
    navLabel: "Design",
    seoTitle: "Lumno Components: Controls, Menus and Interactions",
    seoDescription:
      "The controls, menus, feedback and interactions inside the Lumno browser extension, rebuilt to its exact styles. Click, type and drag to try each one.",
    keywords: ["Lumno components", "UI components", "micro-interactions", "command bar", "new tab", "browser extension design"],
    title: "Every Lumno component, built from scratch",
    lead: "For a better experience, and for the love of the craft, Lumno uses no off-the-shelf component library. Everything below matches the extension exactly and works right here.",
    filtersLabel: "Filter by kind of component",
    filters: { all: "All", controls: "Controls", overlays: "Menus & overlays", feedback: "Feedback", interactions: "Interactions", patterns: "Patterns" },
    sections: {
      controls: "Switches, buttons and fields from the settings and panels.",
      overlays: "Menus and tips that open from buttons, bookmarks and right-clicks.",
      feedback: "How Lumno confirms, saves, updates and tells you what’s new.",
      interactions: "Whole flows from the command bar and the new tab.",
      patterns: "Dragging, disclosure, linked feedback and the keyboard: one way of doing each, used everywhere.",
    },
    theme: { label: "Appearance", light: "Light", dark: "Dark" },
    replay: "Replay",
    cursorYou: "You",
    cards: {
      button: "Buttons",
      switch: "Switch",
      checkbox: "Checkbox",
      segmented: "Segmented control",
      slider: "Slider",
      input: "Text field",
      shortcutRecorder: "Shortcut list",
      tabs: "Tabs",
      choiceCards: "Choice cards",
      select: "Select menu",
      bookmarkMenu: "Bookmark menu",
      contextMenu: "Context menu",
      tooltip: "Tooltip",
      popconfirm: "Confirm popover",
      toast: "Toast",
      updateNotice: "Update notice",
      featureHint: "Feature tip",
      commandBar: "Command bar",
      siteSearch: "Site search",
      scopeMenu: "Search scope menu",
      selection: "Selection toolbar",
      tabSwitcher: "Tab switcher",
      dock: "Shortcut dock",
      dragFolder: "Drag to group",
      folderColor: "Folder color",
      dragGap: "Make room on drag",
      dragPage: "Drag to turn the page",
      accordion: "Disclosure panel",
      refresh: "Refresh and result",
      modeSwitch: "Folding switch",
      numberKeys: "Number keys",
    },
  },
  ja: {
    navLabel: "デザイン",
    seoTitle: "Lumno のインターフェース部品：コントロール、メニュー、インタラクション",
    seoDescription:
      "Lumno ブラウザ拡張機能のコントロール、メニュー、フィードバック、インタラクションを、拡張機能そのままのスタイルで再現。クリック、入力、ドラッグでそのまま試せます。",
    keywords: ["Lumno コンポーネント", "UI コンポーネント", "インタラクション", "コマンドバー", "新しいタブ", "ブラウザ拡張機能 デザイン"],
    title: "Lumno の部品は、すべてゼロから",
    lead: "より快適に使えるように、そして作者の楽しみとして、Lumno は既存のコンポーネントライブラリを使っていません。下の部品は拡張機能と同じスタイルで、そのまま試せます。",
    filtersLabel: "部品の種類で絞り込む",
    filters: { all: "すべて", controls: "基本コントロール", overlays: "メニューとオーバーレイ", feedback: "フィードバック", interactions: "インタラクション", patterns: "操作パターン" },
    sections: {
      controls: "設定画面やパネルのスイッチ、ボタン、入力欄。",
      overlays: "ボタンやブックマーク、右クリックから開くメニューとヒント。",
      feedback: "保存や確認、更新、新機能を知らせる方法。",
      interactions: "コマンドバーと新しいタブでの一連の操作。",
      patterns: "ドラッグ、開閉、連動、キーボード。同じやり方をどこでも使います。",
    },
    theme: { label: "テーマ", light: "ライト", dark: "ダーク" },
    replay: "もう一度再生",
    cursorYou: "あなた",
    cards: {
      button: "ボタン",
      switch: "スイッチ",
      checkbox: "チェックボックス",
      segmented: "セグメントコントロール",
      slider: "スライダー",
      input: "テキスト入力",
      shortcutRecorder: "ショートカット一覧",
      tabs: "タブ",
      choiceCards: "選択カード",
      select: "セレクトメニュー",
      bookmarkMenu: "ブックマークメニュー",
      contextMenu: "右クリックメニュー",
      tooltip: "ツールチップ",
      popconfirm: "確認ポップオーバー",
      toast: "トースト",
      updateNotice: "更新のお知らせ",
      featureHint: "新機能のヒント",
      commandBar: "コマンドバー",
      siteSearch: "サイト内検索",
      scopeMenu: "検索範囲パネル",
      selection: "選択テキストのツールバー",
      tabSwitcher: "タブ切り替え",
      dock: "ショートカットドック",
      dragFolder: "ドラッグでフォルダ作成",
      folderColor: "フォルダの色",
      dragGap: "ドラッグで場所を空ける",
      dragPage: "ドラッグでページ送り",
      accordion: "折りたたみパネル",
      refresh: "更新と結果",
      modeSwitch: "折りたたみ切り替え",
      numberKeys: "数字キーで移動",
    },
  },
  ko: {
    navLabel: "디자인",
    seoTitle: "Lumno 인터페이스 컴포넌트: 컨트롤, 메뉴, 인터랙션",
    seoDescription:
      "Lumno 브라우저 확장 프로그램의 컨트롤, 메뉴, 피드백, 인터랙션을 실제 스타일 그대로 재현했습니다. 클릭하고, 입력하고, 드래그하며 직접 써 보세요.",
    keywords: ["Lumno 컴포넌트", "UI 컴포넌트", "인터랙션", "명령 바", "새 탭", "브라우저 확장 프로그램 디자인"],
    title: "Lumno의 모든 컴포넌트는 처음부터 직접",
    lead: "더 나은 경험을 위해, 그리고 만드는 즐거움을 위해 Lumno는 기존 컴포넌트 라이브러리를 쓰지 않습니다. 아래 컴포넌트는 확장 프로그램과 같은 스타일이며, 여기서 바로 써 볼 수 있습니다.",
    filtersLabel: "컴포넌트 종류별로 보기",
    filters: { all: "전체", controls: "기본 컨트롤", overlays: "메뉴와 오버레이", feedback: "피드백", interactions: "인터랙션", patterns: "인터랙션 패턴" },
    sections: {
      controls: "설정 화면과 패널의 스위치, 버튼, 입력 필드.",
      overlays: "버튼, 북마크, 오른쪽 클릭에서 열리는 메뉴와 안내.",
      feedback: "저장, 확인, 업데이트, 새 기능을 알리는 방식.",
      interactions: "명령 바와 새 탭의 전체 흐름.",
      patterns: "드래그, 펼치기, 연동 피드백, 키보드. 한 가지 방식을 어디서나 씁니다.",
    },
    theme: { label: "테마", light: "라이트", dark: "다크" },
    replay: "다시 재생",
    cursorYou: "나",
    cards: {
      button: "버튼",
      switch: "스위치",
      checkbox: "체크박스",
      segmented: "세그먼트 컨트롤",
      slider: "슬라이더",
      input: "입력 필드",
      shortcutRecorder: "단축키 목록",
      tabs: "탭",
      choiceCards: "선택 카드",
      select: "선택 메뉴",
      bookmarkMenu: "북마크 메뉴",
      contextMenu: "오른쪽 클릭 메뉴",
      tooltip: "툴팁",
      popconfirm: "확인 팝오버",
      toast: "토스트",
      updateNotice: "업데이트 알림",
      featureHint: "새 기능 안내",
      commandBar: "명령 바",
      siteSearch: "사이트 내 검색",
      scopeMenu: "검색 범위 패널",
      selection: "텍스트 선택 도구 모음",
      tabSwitcher: "탭 전환기",
      dock: "바로가기 독",
      dragFolder: "드래그로 폴더 만들기",
      folderColor: "폴더 색상",
      dragGap: "드래그하면 자리 비우기",
      dragPage: "드래그로 페이지 넘기기",
      accordion: "접이식 패널",
      refresh: "새로고침과 결과",
      modeSwitch: "접히는 전환",
      numberKeys: "숫자 키 이동",
    },
  },
  de: {
    navLabel: "Design",
    seoTitle: "Lumno-Komponenten: Bedienelemente, Menüs und Interaktionen",
    seoDescription:
      "Die Bedienelemente, Menüs, Rückmeldungen und Interaktionen der Lumno-Browsererweiterung, genau in ihrem Stil nachgebaut. Klicken, tippen und ziehen Sie, um jede auszuprobieren.",
    keywords: ["Lumno Komponenten", "UI-Komponenten", "Mikrointeraktionen", "Befehlsleiste", "Neuer Tab", "Design von Browser-Erweiterungen"],
    title: "Jede Lumno-Komponente, von Grund auf gebaut",
    lead: "Für ein besseres Erlebnis und aus Freude am Handwerk nutzt Lumno keine fertige Komponentenbibliothek. Alles unten entspricht genau der Erweiterung und funktioniert direkt hier.",
    filtersLabel: "Nach Art der Komponente filtern",
    filters: { all: "Alle", controls: "Bedienelemente", overlays: "Menüs & Overlays", feedback: "Feedback", interactions: "Interaktionen", patterns: "Muster" },
    sections: {
      controls: "Schalter, Schaltflächen und Felder aus Einstellungen und Panels.",
      overlays: "Menüs und Hinweise, die sich über Schaltflächen, Lesezeichen und Rechtsklick öffnen.",
      feedback: "Wie Lumno nachfragt und Speichern, Updates und Neues meldet.",
      interactions: "Ganze Abläufe aus Befehlsleiste und neuem Tab.",
      patterns: "Ziehen, Aufklappen, verknüpftes Feedback und Tastatur: je ein Weg, überall gleich.",
    },
    theme: { label: "Darstellung", light: "Hell", dark: "Dunkel" },
    replay: "Erneut abspielen",
    cursorYou: "Du",
    cards: {
      button: "Schaltflächen",
      switch: "Schalter",
      checkbox: "Kontrollkästchen",
      segmented: "Segmentauswahl",
      slider: "Schieberegler",
      input: "Eingabefeld",
      shortcutRecorder: "Tastenkürzel-Liste",
      tabs: "Tabs",
      choiceCards: "Auswahlkarten",
      select: "Auswahlmenü",
      bookmarkMenu: "Lesezeichenmenü",
      contextMenu: "Kontextmenü",
      tooltip: "Tooltip",
      popconfirm: "Bestätigungs-Popover",
      toast: "Toast",
      updateNotice: "Update-Hinweis",
      featureHint: "Funktionshinweis",
      commandBar: "Befehlsleiste",
      siteSearch: "Seitensuche",
      scopeMenu: "Suchbereich-Menü",
      selection: "Auswahl-Werkzeugleiste",
      tabSwitcher: "Tab-Umschalter",
      dock: "Shortcut-Dock",
      dragFolder: "Zum Gruppieren ziehen",
      folderColor: "Ordnerfarbe",
      dragGap: "Platz beim Ziehen",
      dragPage: "Zum Blättern ziehen",
      accordion: "Aufklappbereich",
      refresh: "Aktualisieren und Ergebnis",
      modeSwitch: "Faltbarer Umschalter",
      numberKeys: "Zifferntasten",
    },
  },
  fr: {
    navLabel: "Design",
    seoTitle: "Composants Lumno : commandes, menus et interactions",
    seoDescription:
      "Les commandes, menus, retours et interactions de l’extension Lumno, reproduits à l’identique. Cliquez, tapez et faites glisser pour les essayer.",
    keywords: ["composants Lumno", "composants d’interface", "micro-interactions", "barre de commande", "nouvel onglet", "design d’extension de navigateur"],
    title: "Chaque composant de Lumno, construit de zéro",
    lead: "Pour une meilleure expérience, et par goût du travail bien fait, Lumno n’utilise aucune bibliothèque de composants existante. Tout ce qui suit est identique à l’extension et fonctionne ici même.",
    filtersLabel: "Filtrer par type de composant",
    filters: { all: "Tout", controls: "Commandes", overlays: "Menus et calques", feedback: "Retours", interactions: "Interactions", patterns: "Modèles" },
    sections: {
      controls: "Interrupteurs, boutons et champs des réglages et des panneaux.",
      overlays: "Menus et astuces qui s’ouvrent depuis un bouton, un favori ou un clic droit.",
      feedback: "Comment Lumno demande confirmation et signale un enregistrement, une mise à jour ou une nouveauté.",
      interactions: "Des parcours complets de la barre de commande et du nouvel onglet.",
      patterns: "Glisser, déplier, retours liés et clavier : une seule façon de faire, partout.",
    },
    theme: { label: "Apparence", light: "Clair", dark: "Sombre" },
    replay: "Rejouer",
    cursorYou: "Vous",
    cards: {
      button: "Boutons",
      switch: "Interrupteur",
      checkbox: "Case à cocher",
      segmented: "Contrôle segmenté",
      slider: "Curseur",
      input: "Champ de texte",
      shortcutRecorder: "Liste des raccourcis",
      tabs: "Onglets",
      choiceCards: "Cartes de choix",
      select: "Menu de sélection",
      bookmarkMenu: "Menu des favoris",
      contextMenu: "Menu contextuel",
      tooltip: "Info-bulle",
      popconfirm: "Popover de confirmation",
      toast: "Toast",
      updateNotice: "Avis de mise à jour",
      featureHint: "Astuce nouveauté",
      commandBar: "Barre de commande",
      siteSearch: "Recherche par site",
      scopeMenu: "Menu de portée de recherche",
      selection: "Barre d’outils de sélection",
      tabSwitcher: "Sélecteur d’onglets",
      dock: "Dock de raccourcis",
      dragFolder: "Glisser pour grouper",
      folderColor: "Couleur de dossier",
      dragGap: "Faire de la place",
      dragPage: "Glisser pour tourner la page",
      accordion: "Panneau dépliable",
      refresh: "Actualiser et résultat",
      modeSwitch: "Sélecteur repliable",
      numberKeys: "Touches numériques",
    },
  },
  es: {
    navLabel: "Diseño",
    seoTitle: "Componentes de Lumno: controles, menús e interacciones",
    seoDescription:
      "Los controles, menús, avisos e interacciones de la extensión Lumno, recreados con su estilo exacto. Haz clic, escribe y arrastra para probar cada uno.",
    keywords: ["componentes de Lumno", "componentes de interfaz", "microinteracciones", "barra de comandos", "nueva pestaña", "diseño de extensiones de navegador"],
    title: "Cada componente de Lumno, hecho desde cero",
    lead: "Para ofrecer una mejor experiencia, y por puro gusto por el oficio, Lumno no usa ninguna biblioteca de componentes existente. Todo lo de abajo es idéntico a la extensión y funciona aquí mismo.",
    filtersLabel: "Filtrar por tipo de componente",
    filters: { all: "Todos", controls: "Controles", overlays: "Menús y capas", feedback: "Avisos", interactions: "Interacciones", patterns: "Patrones" },
    sections: {
      controls: "Interruptores, botones y campos de los ajustes y paneles.",
      overlays: "Menús y avisos que se abren desde botones, marcadores y clic derecho.",
      feedback: "Cómo Lumno pide confirmación y avisa de lo guardado, lo actualizado o lo nuevo.",
      interactions: "Flujos completos de la barra de comandos y la nueva pestaña.",
      patterns: "Arrastrar, desplegar, respuestas enlazadas y teclado: una sola forma de hacerlo, en todas partes.",
    },
    theme: { label: "Apariencia", light: "Claro", dark: "Oscuro" },
    replay: "Reproducir de nuevo",
    cursorYou: "Tú",
    cards: {
      button: "Botones",
      switch: "Interruptor",
      checkbox: "Casilla",
      segmented: "Control segmentado",
      slider: "Deslizador",
      input: "Campo de texto",
      shortcutRecorder: "Lista de atajos",
      tabs: "Pestañas",
      choiceCards: "Tarjetas de selección",
      select: "Menú de selección",
      bookmarkMenu: "Menú de marcadores",
      contextMenu: "Menú contextual",
      tooltip: "Información emergente",
      popconfirm: "Confirmación emergente",
      toast: "Toast",
      updateNotice: "Aviso de actualización",
      featureHint: "Aviso de novedad",
      commandBar: "Barra de comandos",
      siteSearch: "Búsqueda en sitios",
      scopeMenu: "Menú de ámbito de búsqueda",
      selection: "Barra de selección de texto",
      tabSwitcher: "Selector de pestañas",
      dock: "Dock de accesos directos",
      dragFolder: "Arrastrar para agrupar",
      folderColor: "Color de carpeta",
      dragGap: "Hacer sitio al arrastrar",
      dragPage: "Arrastrar para pasar página",
      accordion: "Panel desplegable",
      refresh: "Actualizar y resultado",
      modeSwitch: "Selector plegable",
      numberKeys: "Teclas numéricas",
    },
  },
  "pt-BR": {
    navLabel: "Design",
    seoTitle: "Componentes do Lumno: controles, menus e interações",
    seoDescription:
      "Os controles, menus, avisos e interações da extensão Lumno, recriados com o estilo exato dela. Clique, digite e arraste para experimentar cada um.",
    keywords: ["componentes do Lumno", "componentes de interface", "microinterações", "barra de comandos", "nova aba", "design de extensões de navegador"],
    title: "Cada componente do Lumno, feito do zero",
    lead: "Para uma experiência melhor, e por puro gosto pelo ofício, o Lumno não usa nenhuma biblioteca de componentes pronta. Tudo abaixo é idêntico à extensão e funciona aqui mesmo.",
    filtersLabel: "Filtrar por tipo de componente",
    filters: { all: "Todos", controls: "Controles", overlays: "Menus e sobreposições", feedback: "Avisos", interactions: "Interações", patterns: "Padrões" },
    sections: {
      controls: "Interruptores, botões e campos das configurações e painéis.",
      overlays: "Menus e dicas que abrem a partir de botões, favoritos e clique direito.",
      feedback: "Como o Lumno pede confirmação e avisa sobre o que foi salvo, atualizado ou é novo.",
      interactions: "Fluxos completos da barra de comandos e da nova aba.",
      patterns: "Arrastar, expandir, respostas ligadas e teclado: um só jeito de fazer, em todo lugar.",
    },
    theme: { label: "Aparência", light: "Claro", dark: "Escuro" },
    replay: "Reproduzir de novo",
    cursorYou: "Você",
    cards: {
      button: "Botões",
      switch: "Interruptor",
      checkbox: "Caixa de seleção",
      segmented: "Controle segmentado",
      slider: "Controle deslizante",
      input: "Campo de texto",
      shortcutRecorder: "Lista de atalhos",
      tabs: "Abas",
      choiceCards: "Cartões de escolha",
      select: "Menu de seleção",
      bookmarkMenu: "Menu de favoritos",
      contextMenu: "Menu de contexto",
      tooltip: "Dica",
      popconfirm: "Confirmação",
      toast: "Toast",
      updateNotice: "Aviso de atualização",
      featureHint: "Dica de novidade",
      commandBar: "Barra de comandos",
      siteSearch: "Pesquisa em sites",
      scopeMenu: "Menu de escopo da pesquisa",
      selection: "Barra de seleção de texto",
      tabSwitcher: "Alternador de abas",
      dock: "Dock de atalhos",
      dragFolder: "Arrastar para agrupar",
      folderColor: "Cor da pasta",
      dragGap: "Abrir espaço ao arrastar",
      dragPage: "Arrastar para virar a página",
      accordion: "Painel recolhível",
      refresh: "Atualizar e resultado",
      modeSwitch: "Seletor recolhível",
      numberKeys: "Teclas numéricas",
    },
  },
  ru: {
    navLabel: "Дизайн",
    seoTitle: "Компоненты Lumno: элементы управления, меню и взаимодействия",
    seoDescription:
      "Элементы управления, меню, уведомления и взаимодействия расширения Lumno — в точности как в самом расширении. Нажимайте, вводите и перетаскивайте, чтобы попробовать каждый.",
    keywords: ["компоненты Lumno", "компоненты интерфейса", "микровзаимодействия", "командная строка", "новая вкладка", "дизайн браузерного расширения"],
    title: "Каждый компонент Lumno сделан с нуля",
    lead: "Ради удобства и из любви к ремеслу Lumno не использует готовых библиотек компонентов. Всё ниже в точности как в расширении и работает прямо здесь.",
    filtersLabel: "Фильтр по типу компонента",
    filters: { all: "Все", controls: "Элементы управления", overlays: "Меню и всплывающие окна", feedback: "Уведомления", interactions: "Взаимодействия", patterns: "Приёмы" },
    sections: {
      controls: "Переключатели, кнопки и поля из настроек и панелей.",
      overlays: "Меню и подсказки, которые открываются кнопкой, из закладок и правым кликом.",
      feedback: "Как Lumno просит подтверждения и сообщает о сохранении, обновлении и новинках.",
      interactions: "Целые сценарии из командной строки и новой вкладки.",
      patterns: "Перетаскивание, раскрытие, связанный отклик и клавиатура: один способ, везде одинаково.",
    },
    theme: { label: "Оформление", light: "Светлое", dark: "Тёмное" },
    replay: "Повторить",
    cursorYou: "Вы",
    cards: {
      button: "Кнопки",
      switch: "Переключатель",
      checkbox: "Флажок",
      segmented: "Сегментированный выбор",
      slider: "Ползунок",
      input: "Поле ввода",
      shortcutRecorder: "Список сочетаний клавиш",
      tabs: "Вкладки",
      choiceCards: "Карточки выбора",
      select: "Выпадающее меню",
      bookmarkMenu: "Меню закладок",
      contextMenu: "Контекстное меню",
      tooltip: "Подсказка",
      popconfirm: "Подтверждение",
      toast: "Всплывающее уведомление",
      updateNotice: "Уведомление об обновлении",
      featureHint: "Подсказка о новинке",
      commandBar: "Командная строка",
      siteSearch: "Поиск по сайтам",
      scopeMenu: "Панель области поиска",
      selection: "Панель для выделенного текста",
      tabSwitcher: "Переключатель вкладок",
      dock: "Панель ярлыков",
      dragFolder: "Перетащить в папку",
      folderColor: "Цвет папки",
      dragGap: "Место при перетаскивании",
      dragPage: "Перетащить на другую страницу",
      accordion: "Раскрывающаяся панель",
      refresh: "Обновление и результат",
      modeSwitch: "Складной переключатель",
      numberKeys: "Цифровые клавиши",
    },
  },
};

export function getDesignPageContent(locale: SupportedLocale): DesignPageContent {
  return PAGE[locale] || PAGE.en;
}

/** The extension's own interface strings the components show. */
export type DesignDemoCopy = {
  settings: {
    tabsLabel: string;
    general: string;
    appearance: string;
    labs: string;
    globalSection: string;
    motionTitle: string;
    motionDescription: string;
    updateTitle: string;
    updateDescription: string;
    themeTitle: string;
    themeDescription: string;
    themeSystem: string;
    themeLight: string;
    themeDark: string;
    languageTitle: string;
    languageDescription: string;
    languageSystem: string;
    timeSize: string;
    timeSizeReset: string;
    timeOpacity: string;
    timeOpacityReset: string;
    confirm: string;
    cancel: string;
    reset: string;
    appearanceSettings: string;
    changelog: string;
    openInNewTab: string;
    openInNewTabItems: [string, string, string, string];
    nameLabel: string;
    urlLabel: string;
    clear: string;
    tabSwitcher: string;
    recordPlaceholder: string;
    wallpaper: string;
    wallpaperNames: [string, string, string, string];
  };
  selection: {
    /** The page text; the middle part starts selected. */
    paragraph: [string, string, string];
    explain: string;
    search: string;
    translate: string;
    toolbarLabel: string;
    useLumnoLabel: string;
  };
  newtab: {
    folder: string;
    subfolder: string;
    folderColor: string;
    defaultColor: string;
    shortcutActions: string;
    openInNewTab: string;
    edit: string;
    remove: string;
    /** {shortcut} is the undo or redo key, as the extension's toasts write it. */
    removedUndo: string;
    removeUndone: string;
    stackHint: string;
    stackedUndo: string;
    stackUndone: string;
    recentTabs: string;
    closeTab: string;
    tabClosed: string;
  };
  /** The patterns section: the new tab's appearance panel, recent sites, shortcut dialog and search. */
  patterns: {
    pagePrev: string;
    pageNext: string;
    styleTitle: string;
    searchTitle: string;
    searchWidth: string;
    wallpaperTitle: string;
    modeSync: string;
    modeRow: string;
    modeLatest: string;
    modeMost: string;
    refresh: string;
    refreshing: string;
    refreshSuccess: string;
    releaseForNumbers: string;
  };
  feedback: {
    copyLink: string;
    removeHistory: string;
    closeOtherTabs: string;
    saveWallpaper: string;
    savingWallpaper: string;
    saved: string;
    clearRules: string;
    confirmClearRules: string;
    confirm: string;
    cancel: string;
    cleared: string;
    updateBadge: string;
    updateText: string;
    updateLink: string;
    updateClose: string;
    hintBadge: string;
    hintText: string;
    hintClose: string;
  };
};

const DEMO: Record<ExtensionLocale, DesignDemoCopy> = {
  "zh-CN": {
    settings: {
      tabsLabel: "设置分类",
      general: "常规",
      appearance: "外观",
      labs: "实验室功能",
      globalSection: "全局",
      motionTitle: "动态效果",
      motionDescription: "如遇卡顿，或倾向于更利落的唤起方式，可关闭",
      updateTitle: "更新提示",
      updateDescription: "更新到新版本时显示新功能组件",
      themeTitle: "深浅色模式",
      themeDescription: "跟随系统或手动选择主题",
      themeSystem: "跟随系统",
      themeLight: "浅色",
      themeDark: "深色",
      languageTitle: "语言",
      languageDescription: "选择界面显示语言",
      languageSystem: "跟随浏览器语言",
      timeSize: "时间字号",
      timeSizeReset: "恢复默认字号",
      timeOpacity: "时间不透明度",
      timeOpacityReset: "恢复默认不透明度",
      confirm: "确认",
      cancel: "取消",
      reset: "恢复默认",
      appearanceSettings: "外观设置",
      changelog: "更新日志",
      openInNewTab: "在新标签页打开",
      openInNewTabItems: ["搜索结果", "快捷方式", "书签", "站点卡片"],
      nameLabel: "名称",
      urlLabel: "网址",
      clear: "清空",
      tabSwitcher: "标签切换器",
      recordPlaceholder: "按下快捷键",
      wallpaper: "壁纸",
      wallpaperNames: ["晨光果园", "雾蓝观星台", "白昼拼贴", "睡莲池"],
    },
    selection: {
      paragraph: ["", "量子纠缠", "是指两个粒子无论相隔多远，状态都会相互关联的现象。"],
      explain: "解释",
      search: "调研",
      translate: "翻译",
      toolbarLabel: "对选中文字执行 Lumno 操作",
      useLumnoLabel: "用 Lumno 处理选中文字",
    },
    newtab: {
      folder: "设计参考",
      subfolder: "图标",
      folderColor: "文件夹颜色",
      defaultColor: "默认颜色",
      shortcutActions: "快捷方式操作",
      openInNewTab: "在新标签页打开",
      edit: "编辑",
      remove: "移除",
      removedUndo: "已移除快捷方式 · 按 {shortcut} 撤回",
      removeUndone: "已恢复快捷方式",
      stackHint: "松手创建文件夹，存入书签栏",
      stackedUndo: "已创建文件夹 · 按 {shortcut} 撤回",
      stackUndone: "已撤销创建文件夹",
      recentTabs: "最近标签页",
      closeTab: "关闭标签页",
      tabClosed: "已关闭标签页",
    },
    patterns: {
      pagePrev: "上一页",
      pageNext: "下一页",
      styleTitle: "风格",
      searchTitle: "搜索框",
      searchWidth: "搜索框宽度",
      wallpaperTitle: "壁纸",
      modeSync: "深浅模式一致",
      modeRow: "模式",
      modeLatest: "最近访问",
      modeMost: "最常访问",
      refresh: "刷新",
      refreshing: "刷新中…",
      refreshSuccess: "获取成功",
      releaseForNumbers: "松开显示数字",
    },
    feedback: {
      copyLink: "复制链接",
      removeHistory: "移除该历史",
      closeOtherTabs: "关闭其他标签页",
      saveWallpaper: "保存壁纸",
      savingWallpaper: "正在保存壁纸…",
      saved: "已保存",
      clearRules: "清空隐藏规则",
      confirmClearRules: "确认清空隐藏规则？",
      confirm: "确认",
      cancel: "取消",
      cleared: "已清空",
      updateBadge: "已更新至 {version}",
      updateText: "查看本次更新",
      updateLink: "更新日志",
      updateClose: "关闭更新提示",
      hintBadge: "新功能",
      hintText: "新增精选壁纸：自然、城市、艺术等分类可每日自动更新，也能添加图片链接。",
      hintClose: "关闭新壁纸提示",
    },
  },
  "zh-TW": {
    settings: {
      tabsLabel: "設定分類",
      general: "一般",
      appearance: "外觀",
      labs: "實驗室功能",
      globalSection: "全域",
      motionTitle: "動態效果",
      motionDescription: "若畫面不順暢，或偏好更俐落的叫出方式，可關閉",
      updateTitle: "更新提示",
      updateDescription: "更新到新版本時顯示新功能元件",
      themeTitle: "深淺色模式",
      themeDescription: "跟隨系統或手動選擇主題",
      themeSystem: "跟隨系統",
      themeLight: "淺色",
      themeDark: "深色",
      languageTitle: "語言",
      languageDescription: "選擇介面顯示語言",
      languageSystem: "跟隨瀏覽器語言",
      timeSize: "時間字級",
      timeSizeReset: "還原預設字級",
      timeOpacity: "時間不透明度",
      timeOpacityReset: "還原預設不透明度",
      confirm: "確認",
      cancel: "取消",
      reset: "還原預設",
      appearanceSettings: "外觀設定",
      changelog: "更新日誌",
      openInNewTab: "在新分頁開啟",
      openInNewTabItems: ["搜尋結果", "捷徑", "書籤", "網站卡片"],
      nameLabel: "名稱",
      urlLabel: "網址",
      clear: "清除",
      tabSwitcher: "分頁切換器",
      recordPlaceholder: "按下快速鍵",
      wallpaper: "桌布",
      wallpaperNames: ["晨光果園", "霧藍觀星臺", "白晝拼貼", "睡蓮池"],
    },
    selection: {
      paragraph: ["", "量子糾纏", "是指兩個粒子無論相隔多遠，狀態都會彼此關聯的現象。"],
      explain: "解釋",
      search: "研究",
      translate: "翻譯",
      toolbarLabel: "對選取文字執行 Lumno 操作",
      useLumnoLabel: "用 Lumno 處理選取文字",
    },
    newtab: {
      folder: "設計參考",
      subfolder: "圖示",
      folderColor: "資料夾顏色",
      defaultColor: "預設顏色",
      shortcutActions: "捷徑操作",
      openInNewTab: "在新分頁開啟",
      edit: "編輯",
      remove: "移除",
      removedUndo: "已移除捷徑 · 按 {shortcut} 復原",
      removeUndone: "已還原捷徑",
      stackHint: "放開即建立資料夾，存入書籤列",
      stackedUndo: "已建立資料夾 · 按 {shortcut} 復原",
      stackUndone: "已取消建立資料夾",
      recentTabs: "最近分頁",
      closeTab: "關閉分頁",
      tabClosed: "已關閉分頁",
    },
    patterns: {
      pagePrev: "上一頁",
      pageNext: "下一頁",
      styleTitle: "風格",
      searchTitle: "搜尋框",
      searchWidth: "搜尋框寬度",
      wallpaperTitle: "桌布",
      modeSync: "深淺模式一致",
      modeRow: "模式",
      modeLatest: "最近瀏覽",
      modeMost: "最常瀏覽",
      refresh: "重新整理",
      refreshing: "重新整理中…",
      refreshSuccess: "取得成功",
      releaseForNumbers: "放開以顯示數字",
    },
    feedback: {
      copyLink: "複製連結",
      removeHistory: "移除這筆歷史",
      closeOtherTabs: "關閉其他分頁",
      saveWallpaper: "儲存桌布",
      savingWallpaper: "正在儲存桌布…",
      saved: "已儲存",
      clearRules: "清空隱藏規則",
      confirmClearRules: "確認清空隱藏規則？",
      confirm: "確認",
      cancel: "取消",
      cleared: "已清空",
      updateBadge: "已更新至 {version}",
      updateText: "查看本次更新",
      updateLink: "更新日誌",
      updateClose: "關閉更新提示",
      hintBadge: "新功能",
      hintText: "新增精選桌布：自然、城市、藝術等分類可每日自動更新，也能新增圖片連結。",
      hintClose: "關閉新桌布提示",
    },
  },
  en: {
    settings: {
      tabsLabel: "Settings sections",
      general: "General",
      appearance: "Appearance",
      labs: "Labs",
      globalSection: "Global",
      motionTitle: "Motion effects",
      motionDescription: "Turn this off if performance stutters or you prefer a snappier opening experience",
      updateTitle: "Update Prompts",
      updateDescription: "Show what's new after Lumno updates to a new version",
      themeTitle: "Theme mode",
      themeDescription: "Follow system or choose manually",
      themeSystem: "Follow system",
      themeLight: "Light",
      themeDark: "Dark",
      languageTitle: "Language",
      languageDescription: "Choose UI language",
      languageSystem: "Follow browser language",
      timeSize: "Time size",
      timeSizeReset: "Reset time size",
      timeOpacity: "Time opacity",
      timeOpacityReset: "Reset time opacity",
      confirm: "Confirm",
      cancel: "Cancel",
      reset: "Reset",
      appearanceSettings: "Appearance settings",
      changelog: "Changelog",
      openInNewTab: "Open in a new tab",
      openInNewTabItems: ["Search results", "Shortcuts", "Bookmarks", "Site cards"],
      nameLabel: "Name",
      urlLabel: "URL",
      clear: "Clear",
      tabSwitcher: "Tab switcher",
      recordPlaceholder: "Press shortcut",
      wallpaper: "Wallpaper",
      wallpaperNames: ["Orchard morning", "Misty observatory", "Daylight collage", "Lily pond"],
    },
    selection: {
      paragraph: ["", "Quantum entanglement", " links two particles so that measuring one instantly tells you about the other, however far apart they are."],
      explain: "Explain",
      search: "Research",
      translate: "Translate",
      toolbarLabel: "Lumno actions for the selected text",
      useLumnoLabel: "Use Lumno on the selected text",
    },
    newtab: {
      folder: "Design references",
      subfolder: "Icons",
      folderColor: "Folder color",
      defaultColor: "Default color",
      shortcutActions: "Shortcut actions",
      openInNewTab: "Open in new tab",
      edit: "Edit",
      remove: "Remove",
      removedUndo: "Shortcut removed · {shortcut} to undo",
      removeUndone: "Shortcut restored",
      stackHint: "Release to create a folder in the bookmarks bar",
      stackedUndo: "Folder created · {shortcut} to undo",
      stackUndone: "Folder creation undone",
      recentTabs: "Recent tabs",
      closeTab: "Close tab",
      tabClosed: "Tab closed",
    },
    patterns: {
      pagePrev: "Previous page",
      pageNext: "Next page",
      styleTitle: "Style",
      searchTitle: "Search box",
      searchWidth: "Search box width",
      wallpaperTitle: "Wallpaper",
      modeSync: "Match light and dark mode",
      modeRow: "Mode",
      modeLatest: "Show Recent",
      modeMost: "Show Most Visited",
      refresh: "Refresh",
      refreshing: "Refreshing…",
      refreshSuccess: "Icon acquired",
      releaseForNumbers: "Release to show numbers",
    },
    feedback: {
      copyLink: "Copy link",
      removeHistory: "Remove this history entry",
      closeOtherTabs: "Close other tabs",
      saveWallpaper: "Save wallpaper",
      savingWallpaper: "Saving wallpaper…",
      saved: "Saved",
      clearRules: "Clear hide rules",
      confirmClearRules: "Clear the hide rules?",
      confirm: "Confirm",
      cancel: "Cancel",
      cleared: "Cleared",
      updateBadge: "Updated to {version}",
      updateText: "See what changed in this update",
      updateLink: "Changelog",
      updateClose: "Dismiss update notice",
      hintBadge: "New",
      hintText: "New wallpapers: curated nature, city and art collections that can update daily, or add one by image link.",
      hintClose: "Dismiss new wallpapers tip",
    },
  },
  ja: {
    settings: {
      tabsLabel: "設定のカテゴリ",
      general: "一般",
      appearance: "外観",
      labs: "ラボ機能",
      globalSection: "全体",
      motionTitle: "アニメーション効果",
      motionDescription: "動作が重い場合や、より素早く表示したい場合はオフにできます",
      updateTitle: "更新のお知らせ",
      updateDescription: "新しいバージョンへの更新後に新機能のお知らせを表示します",
      themeTitle: "テーマ",
      themeDescription: "自動または手動でテーマを選択",
      themeSystem: "システムに従う",
      themeLight: "ライト",
      themeDark: "ダーク",
      languageTitle: "言語",
      languageDescription: "表示言語を選択",
      languageSystem: "ブラウザの言語に合わせる",
      timeSize: "時刻の文字サイズ",
      timeSizeReset: "時刻の文字サイズを初期値に戻す",
      timeOpacity: "時刻の不透明度",
      timeOpacityReset: "時刻の不透明度を初期値に戻す",
      confirm: "確定",
      cancel: "キャンセル",
      reset: "初期設定に戻す",
      appearanceSettings: "外観設定",
      changelog: "更新履歴",
      openInNewTab: "新しいタブで開く",
      openInNewTabItems: ["検索結果", "ショートカット", "ブックマーク", "サイトカード"],
      nameLabel: "名前",
      urlLabel: "URL",
      clear: "クリア",
      tabSwitcher: "タブ切り替え",
      recordPlaceholder: "キーを押す",
      wallpaper: "壁紙",
      wallpaperNames: ["朝の果樹園", "霧の天文台", "明るい貼り絵", "睡蓮池"],
    },
    selection: {
      paragraph: ["", "量子もつれ", "とは、2 つの粒子がどれほど離れていても、互いの状態が結びついている現象です。"],
      explain: "説明",
      search: "調査",
      translate: "翻訳",
      toolbarLabel: "選択したテキストへの Lumno 操作",
      useLumnoLabel: "選択したテキストを Lumno で処理",
    },
    newtab: {
      folder: "デザイン資料",
      subfolder: "アイコン",
      folderColor: "フォルダの色",
      defaultColor: "デフォルトの色",
      shortcutActions: "ショートカット操作",
      openInNewTab: "新しいタブで開く",
      edit: "編集",
      remove: "削除",
      removedUndo: "ショートカットを削除しました · {shortcut} で元に戻す",
      removeUndone: "ショートカットを復元しました",
      stackHint: "離すとブックマークバーにフォルダーを作成",
      stackedUndo: "フォルダーを作成しました · {shortcut} で元に戻す",
      stackUndone: "フォルダーの作成を取り消しました",
      recentTabs: "最近のタブ",
      closeTab: "タブを閉じる",
      tabClosed: "タブを閉じました",
    },
    patterns: {
      pagePrev: "前のページ",
      pageNext: "次のページ",
      styleTitle: "スタイル",
      searchTitle: "検索ボックス",
      searchWidth: "検索ボックスの幅",
      wallpaperTitle: "壁紙",
      modeSync: "ライト/ダークで同じ",
      modeRow: "モード",
      modeLatest: "最近のアクセス",
      modeMost: "よくアクセス",
      refresh: "更新",
      refreshing: "更新中…",
      refreshSuccess: "取得しました",
      releaseForNumbers: "離すと数字を表示",
    },
    feedback: {
      copyLink: "リンクをコピー",
      removeHistory: "この履歴を削除",
      closeOtherTabs: "他のタブを閉じる",
      saveWallpaper: "壁紙を保存",
      savingWallpaper: "壁紙を保存中…",
      saved: "保存しました",
      clearRules: "隠すルールを空にする",
      confirmClearRules: "隠すルールを空にしますか？",
      confirm: "確定",
      cancel: "キャンセル",
      cleared: "空にしました",
      updateBadge: "{version} に更新済み",
      updateText: "今回の更新内容を見る",
      updateLink: "更新履歴",
      updateClose: "更新通知を閉じる",
      hintBadge: "新機能",
      hintText: "厳選壁紙を追加：自然・都市・アートなどから毎日自動で更新でき、画像リンクからも追加できます。",
      hintClose: "新しい壁紙のヒントを閉じる",
    },
  },
};

export function getDesignDemoCopy(locale: SupportedLocale): DesignDemoCopy {
  return DEMO[getExtensionLocale(locale)] || DEMO.en;
}

/** The extension's own strings for the controls, in the language it shows this visitor. */
export function getDesignExtensionStrings(locale: SupportedLocale) {
  return EXTENSION_STRINGS[getExtensionLocale(locale)] || EXTENSION_STRINGS.en;
}
