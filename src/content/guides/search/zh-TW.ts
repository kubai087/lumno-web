import type { GuideSearchAliases } from "../../../lib/guide-search-index";

// 使用者會怎麼搜尋：口語說法、同義詞、常見問句。只寫進 search-index.json，不顯示在頁面上。
// 比對是整串子字串比對，所以把常見說法原樣寫進來（如「怎麼改快速鍵」「換桌布」「我的最愛」），也收常見的大陸用語。
export default {
  "what-is-lumno": {
    "": ["這個擴充功能是做什麼的？瀏覽器擴充功能、外掛、插件、Chrome 擴充功能有什麼用？"],
    "command-bar": [
      "怎麼叫出浮層、搜尋框、搜尋列、彈出視窗？",
      "像 Spotlight、Raycast 一樣的瀏覽器搜尋浮層",
      "Arc、Zen 那樣按 Cmd T、⌘T 開啟命令面板",
    ],
    "new-tab": ["新分頁、新標籤頁、起始頁、首頁長什麼樣子？"],
    strengths: ["要錢嗎？收費嗎？免費嗎？", "需要註冊帳號、登入嗎？", "和其他擴充功能有什麼不同、優點？"],
  },
  limitations: {
    "": ["不能做什麼？有哪些缺點、不足、限制？"],
    "restricted-pages": [
      "為什麼有些網頁叫不出命令列？快速鍵在設定頁沒反應",
      "chrome:// 頁面、擴充功能商店、應用程式商店裡叫不出浮層",
      "PDF 裡不能用、本機檔案不能用",
    ],
    "outside-browser": ["能搜尋電腦上的檔案、應用程式嗎？能取代 Spotlight、Raycast、Alfred 嗎？"],
    browsers: ["支援 Safari 嗎？支援手機嗎？iPhone、Android 能用嗎？"],
    widgets: ["新分頁有天氣、待辦、便利貼、行事曆、小工具嗎？"],
    data: ["有雲端同步、雲端帳號嗎？換電腦怎麼辦？"],
  },
  "use-cases": {
    "": ["適合什麼人？有哪些用法、使用情境、技巧？"],
    "many-tabs": ["分頁太多找不到怎麼辦？標籤頁太多、tab 太多"],
    "from-arc": ["Arc 瀏覽器停止更新怎麼辦？Arc 替代品"],
    developers: ["工程師、開發者怎麼用？查文件、搜 GitHub、搜 npm、搜 MDN"],
    research: ["寫論文、查資料、找以前看過的文章"],
    ai: ["怎麼快速問 AI？問 ChatGPT、問 Gemini、問 DeepSeek"],
    "quiet-new-tab": ["想要簡潔、極簡、乾淨的新分頁"],
    series: ["追劇、看小說怎麼記住看到第幾集、第幾章？"],
  },
  faq: {
    "": ["常見問題、問題整理、說明、疑問"],
    using: [
      "快速鍵沒反應怎麼辦？快捷鍵沒反應、按了沒用、叫不出來",
      "命令列打不開、浮層不出來、跳不出來",
      "命令列顏色不對、深色淺色不一致、暗黑模式不對",
    ],
    "new-tab": [
      "怎麼關掉這個擴充功能的新分頁？新分頁怎麼換回 Chrome 預設、恢復預設、換回原本的",
      "新分頁網址列顯示擴充功能網址、chrome-extension 網址怎麼辦？",
    ],
    compatibility: ["支援什麼瀏覽器？Edge、Brave、Dia、Safari 能用嗎？"],
    data: ["會不會上傳資料、偷資料？安全嗎？", "同步不了、怎麼同步設定？"],
  },
  install: {
    "": ["怎麼安裝？在哪裡下載？下載連結"],
    store: ["Chrome 線上應用程式商店、Google 商店、Edge 商店在哪裡下載？裝不起來怎麼辦？"],
    "after-install": ["裝好之後要做什麼？安裝後跳出的歡迎頁、導覽頁", "Chrome 詢問要不要保留變更、保留新分頁，選錯了怎麼辦？"],
    try: ["裝好之後怎麼用？第一次怎麼開啟？入門、上手"],
    "file-access": ["本機 PDF、本機 HTML 檔案裡怎麼用？允許存取檔案網址在哪裡？"],
  },
  "keyboard-shortcuts": {
    "": ["快速鍵、快捷鍵、熱鍵、鍵盤快速鍵、組合鍵、按鍵一覽"],
    defaults: ["預設快速鍵是什麼？用什麼鍵開啟？Cmd Shift K、Ctrl Shift K"],
    change: [
      "怎麼改快速鍵？怎麼修改快捷鍵、熱鍵？在哪裡設定快速鍵？自訂快速鍵",
      "能把快速鍵改成 ⌘T、Cmd T、Ctrl T 嗎？像 Arc 一樣按 Cmd T",
      "快速鍵衝突、被佔用、沒作用怎麼辦？",
      "Dia 裡快速鍵沒反應，改成全域",
    ],
    "command-bar-keys": ["命令列裡有哪些按鍵？Enter、Tab、Esc、方向鍵是做什麼的？"],
    "switcher-keys": ["切換器裡怎麼用鍵盤？Alt Q、Option Q 怎麼用？"],
  },
  sync: {
    "": ["同步不了怎麼辦？怎麼同步？備份設定、換電腦、轉移設定、多台電腦"],
    "browser-sync": ["用 Chrome 帳號、Google 帳號同步設定"],
    webdav: ["WebDAV 怎麼設定？同步圖示、同步桌布、同步上傳的圖片"],
    jianguoyun: ["堅果雲、坚果云怎麼填？伺服器位址、應用程式密碼在哪裡？"],
    "second-device": ["新電腦怎麼同步？同步衝突怎麼辦？"],
    "not-synced": ["書籤、瀏覽紀錄、分頁會同步嗎？"],
    export: ["怎麼匯出設定、匯入設定？備份設定檔"],
  },
  "search-tabs-bookmarks-history": {
    "": ["怎麼搜尋書籤、我的最愛、收藏、瀏覽紀錄、歷史紀錄、瀏覽記錄、分頁？找回以前看過的網頁"],
    open: ["怎麼叫出搜尋框、浮層、搜尋列？"],
    results: ["搜尋結果裡的已開啟、書籤、紀錄是什麼意思？搜尋建議、排序"],
    "open-tabs": ["只搜尋已經開啟的分頁、只搜 tab", "只搜書籤、只搜我的最愛、只搜瀏覽紀錄"],
  },
  "site-search": {
    "": ["站內搜尋怎麼用？直接在網站裡搜尋、搜尋引擎、換搜尋引擎、預設搜尋引擎"],
    how: ["輸入簡稱按 Tab 是什麼？怎麼直接在 GitHub、YouTube、維基百科裡搜尋"],
    shortcuts: ["網站簡稱、縮寫有哪些？關鍵字列表"],
    ai: ["怎麼直接問 ChatGPT、Gemini、Perplexity、DeepSeek？AI 搜尋、問 AI"],
    "scope-panel": ["按兩下 Tab 出現的是什麼？搜尋範圍、切換搜尋引擎"],
    custom: ["怎麼新增自訂搜尋引擎、自己的網站？聚合搜尋、多個網站一起搜"],
  },
  "tab-switcher": {
    "": ["分頁切換器、切換分頁、tab 切換、最近的分頁、上一個分頁、來回切換"],
    open: ["Alt Q、Option Q、⌥Q 是什麼？"],
    switch: ["像 Ctrl Tab、Cmd Tab 一樣切換分頁"],
    shortcut: ["怎麼改切換器的快速鍵？"],
  },
  "newtab-wallpaper": {
    "": ["怎麼換桌布？換背景、背景圖、壁紙、新分頁背景、主題"],
    open: ["外觀設定在哪裡？桌布設定在哪裡？"],
    sources: [
      "怎麼用自己的圖片、照片當桌布？上傳桌布、本機桌布",
      "Bing 桌布、每日桌布、每天自動換桌布",
      "網路圖片、圖片連結當桌布",
    ],
    "dark-mode": ["深色模式、暗黑模式、夜間模式用另一張桌布"],
    effects: ["桌布太花、看不清搜尋框怎麼辦？模糊、毛玻璃、遮罩、濾鏡"],
    sync: ["桌布能同步到別台電腦嗎？"],
  },
  "newtab-bookmarks-shortcuts": {
    "": ["新分頁的捷徑、常用網站圖示、書籤列、我的最愛"],
    shortcuts: [
      "怎麼新增捷徑、新增網站、新增圖示？怎麼刪除、編輯捷徑",
      "捷徑圖示怎麼換、上傳圖示、自訂圖示",
      "圖示放大效果、Dock 效果怎麼關？",
    ],
    bookmarks: ["新分頁怎麼顯示書籤、我的最愛？書籤列放頂部、書籤版面、資料夾顏色"],
  },
  "newtab-frequent-sites": {
    "": ["新分頁底部的網站卡片、常去的網站、最近造訪、最常造訪"],
    frequent: ["怎麼隱藏底部的常用網站？顯示幾行"],
    pin: ["怎麼固定、置頂網站卡片？"],
    progress: ["追劇進度、看到第幾集、小說看到第幾章、自動記錄進度"],
  },
  "newtab-clock-zen": {
    "": ["新分頁時鐘、時間、日期、名言、名句、詩詞"],
    clock: ["怎麼顯示時鐘、顯示時間、顯示秒數？"],
    quote: ["怎麼顯示每日一句、名言佳句？換一句"],
    zen: ["專注模式、極簡模式、只留搜尋框、/zen 怎麼退出"],
  },
  "newtab-other-extensions": {
    "": [
      "怎麼關掉這個擴充功能的新分頁？不想用這個新分頁、只用命令列",
      "新分頁怎麼換回 Chrome 預設？恢復預設新分頁、換回 Google 首頁",
      "和 Momentum、Infinity、其他新分頁擴充功能衝突怎麼辦？",
    ],
    "keep-changes": ["Chrome 詢問是否保留變更選錯了、擴充功能被停用了怎麼辦？"],
    "back-to-lumno": ["怎麼重新用回這個擴充功能的新分頁？"],
  },
  "selection-actions": {
    "": ["選字、劃詞、選取文字、反白文字、選字翻譯、AI 翻譯、AI 解釋、AI 摘要"],
    smart: ["為什麼選取文字沒有出現按鈕？選字按鈕不出現"],
    how: ["選字快捷操作怎麼開啟？實驗室功能在哪裡？"],
    provider: ["選字用哪個 AI？換成 ChatGPT、Gemini、DeepSeek"],
  },
  "web-clip": {
    "": ["網頁剪裁、網頁剪輯、擷取網頁、裁切網頁、網頁小視窗、浮動視窗、置頂小視窗、/clip"],
    enable: ["網頁剪裁怎麼開啟？在哪裡打開"],
    how: ["怎麼把網頁的一部分放到小視窗裡？"],
    limits: ["網頁剪裁不能用怎麼辦？"],
  },
  "auto-pip": {
    "": ["影片子母畫面、畫中畫、小視窗播放、浮動播放、影片小窗、PiP"],
    when: ["切換分頁時影片自動變成小視窗"],
    excluded: ["為什麼有的影片不會進入子母畫面？子母畫面沒反應"],
    toggle: ["怎麼關掉自動子母畫面？不想要影片小視窗"],
  },
  "arc-command-bar": {
    "": ["Arc 瀏覽器替代、Arc 停止更新、從 Arc 換到 Chrome、Arc 使用者"],
    mapping: ["Arc 快速鍵對照、Arc 的 Cmd T、Ctrl Tab、Cmd Shift C"],
    steps: ["怎麼設定成和 Arc 一樣？把快速鍵改成 Cmd T"],
    limits: ["側邊欄、垂直分頁、Spaces、分割畫面能用嗎？"],
  },
  "browser-compatibility": {
    "": ["支援哪些瀏覽器？能在什麼瀏覽器用？相容嗎"],
    support: ["Edge、Brave、Opera、Vivaldi、Google 瀏覽器能用嗎？"],
    dia: ["Dia 瀏覽器新分頁不能用、Dia 快速鍵沒反應"],
    firefox: ["火狐、Firefox、Zen 瀏覽器能用嗎？"],
    safari: ["Safari 能用嗎？蘋果瀏覽器、Mac 內建瀏覽器"],
    languages: ["怎麼改語言？切換中文、英文、簡體、日文介面"],
  },
  privacy: {
    "": ["隱私、資料安全、會不會收集資料、會不會上傳瀏覽紀錄、偷資料"],
  },
  "security-open-source": {
    "": ["安全嗎？可信嗎？是不是病毒、惡意程式？開源嗎？原始碼在哪裡？"],
    "open-source": ["GitHub 位址、原始碼、開源授權、回報 bug、提 issue"],
    permissions: ["為什麼要讀取所有網站資料的權限？權限說明"],
  },
  "ratings-reviews": {
    "": ["評價如何？好用嗎？評分、口碑、評測、推薦"],
    press: ["少數派文章、媒體報導"],
    community: ["怎麼回報問題、提建議？社群、聯絡作者"],
  },
} satisfies GuideSearchAliases;
