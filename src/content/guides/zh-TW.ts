import type { GuideLocaleContent } from "../../lib/guides";

/** 繁體中文說明中心：用台灣慣用語寫，不是簡體的逐字轉換。 */
const content: GuideLocaleContent = {
  ui: {
    navLabel: "說明中心",
    navTitle: "Lumno 說明中心",
    groups: {
      about: "認識 Lumno",
      quickstart: "快速上手",
      trust: "相容性與安全",
    },
    sections: {
      setup: "安裝與設定",
      "command-bar": "命令列",
      "new-tab": "新分頁",
      more: "更多功能",
      scenarios: "依情境",
    },
    navToggle: "目錄",
    updatedLabel: "{date}更新",
    tocLabel: "本頁內容",
    faqTitle: "常見問題",
    previousLabel: "上一篇",
    nextLabel: "下一篇",
    homeCardLabel: "官網",
    homeCardTitle: "回到 Lumno 首頁",
    zoomLabel: "查看大圖",
    closeLabel: "關閉",
    privacyLabel: "隱私權政策",
    searchPlaceholder: "搜尋說明",
    searchLabel: "搜尋說明中心",
    searchEmpty: "找不到相關內容",
    stuckText: "仍未解決？歡迎加入使用者群組提問，作者也在群組裡。",
    stuckPrimary: "加入使用者群組",
    stuckSecondary: "提交 Issue",
  },
  pages: {
    "what-is-lumno": {
      pageTitle: "Lumno 是什麼：開源的瀏覽器命令列與新分頁擴充功能｜Lumno 說明中心",
      pageDescription:
        "Lumno 是免費開源的瀏覽器擴充功能，在任何網頁按 ⌘⇧K 叫出命令列，搜尋分頁、書籤和瀏覽紀錄，直接在網站內搜尋或問 AI，還有可自訂的新分頁。支援 Chrome、Edge、Dia 等 Chromium 瀏覽器。",
      keywords: ["Lumno", "瀏覽器命令列", "Chrome 命令列擴充功能", "聚焦搜尋", "新分頁擴充功能", "Arc 命令列"],
      title: "Lumno 是什麼",
      navTitle: "Lumno 是什麼",
      faq: [
        { question: "Lumno 要付費嗎？", answer: "不需要。Lumno 以 GPL-3.0 授權開源，所有功能免費使用，也不需要註冊帳號。" },
        {
          question: "Lumno 支援哪些瀏覽器？",
          answer: "支援 Chrome、Edge、Dia、Brave、Arc、Vivaldi 等 Chromium 核心的瀏覽器，暫不支援 Safari。詳見「瀏覽器相容性」。",
        },
      ],
    },
    limitations: {
      pageTitle: "Lumno 做不到的事：功能邊界與已知限制｜Lumno 說明中心",
      pageDescription:
        "Lumno 是擴充功能，不是瀏覽器：在 chrome:// 等受限頁面無法叫出命令列；暫不支援 Safari，Dia 中無法使用新分頁。安裝前可以先了解這些限制。",
      keywords: ["Lumno 限制", "Chrome 擴充功能受限頁面", "Arc 側邊欄替代", "Dia 新分頁"],
      title: "Lumno 做不到的事",
      navTitle: "Lumno 做不到的事",
    },
    "use-cases": {
      pageTitle: "Lumno 適合誰：分頁太多、從 Arc 搬家、開發與寫作｜Lumno 說明中心",
      pageDescription:
        "Lumno 最能幫上忙的情境：分頁開了幾十個、從 Arc 換到 Chrome 或 Dia、常查文件和 GitHub 的開發者、需要找回資料的研究和寫作、習慣問 AI，以及想要安靜新分頁的人。",
      keywords: ["Lumno 使用情境", "分頁太多", "Arc 替代", "開發者瀏覽器擴充功能", "快速問 AI"],
      title: "使用情境",
      navTitle: "使用情境",
    },
    faq: {
      pageTitle: "Lumno 常見問題：快速鍵、受限頁面、新分頁與資料同步｜Lumno 說明中心",
      pageDescription:
        "Lumno 的常見問題：預設快速鍵和修改方式、快速鍵沒有反應怎麼辦、能否搭配其他新分頁擴充功能、支援哪些瀏覽器、設定如何同步，以及是否上傳瀏覽資料。",
      keywords: ["Lumno 常見問題", "Lumno FAQ", "Chrome 擴充功能快速鍵沒反應", "新分頁擴充功能衝突", "Lumno 免費嗎"],
      title: "常見問題",
      navTitle: "常見問題",
    },
    install: {
      pageTitle: "安裝 Lumno：從 Chrome 線上應用程式商店或 Edge 附加元件安裝｜Lumno 說明中心",
      pageDescription:
        "在 Chrome、Dia、Brave、Arc 中從 Chrome 線上應用程式商店安裝 Lumno，在 Edge 中從 Microsoft Edge 附加元件安裝。安裝後會開啟歡迎頁，按 ⌘⇧K 即可開始使用。",
      keywords: ["安裝 Lumno", "Lumno Chrome 線上應用程式商店", "Lumno Edge 附加元件", "安裝 Chrome 擴充功能"],
      title: "安裝 Lumno",
      navTitle: "安裝 Lumno",
      faq: [
        { question: "需要註冊帳號嗎？", answer: "不需要。Lumno 沒有帳號系統，安裝後即可使用。" },
        {
          question: "要怎麼移除？",
          answer: "在 chrome://extensions（Edge 為 edge://extensions）找到 Lumno，按「移除」。移除後，擴充功能存在這台電腦上的設定和圖片也會一併刪除。",
        },
      ],
    },
    "keyboard-shortcuts": {
      pageTitle: "Lumno 快速鍵：預設快速鍵、修改方式與命令列按鍵｜Lumno 說明中心",
      pageDescription:
        "Lumno 預設用 ⌘⇧K（Windows 為 Ctrl+Shift+K）叫出命令列，用 ⌥Q 開啟最近分頁切換器。可以在 chrome://extensions/shortcuts 修改，也能改成 ⌘T。附命令列與切換器裡的所有按鍵。",
      keywords: ["Lumno 快速鍵", "修改 Chrome 擴充功能快速鍵", "chrome://extensions/shortcuts", "⌘T 命令列"],
      title: "快速鍵",
      navTitle: "快速鍵",
      faq: [
        {
          question: "按下快速鍵沒有反應怎麼辦？",
          answer:
            "先確認目前不是 chrome:// 設定頁或擴充功能商店這類受限頁面，再到 chrome://extensions/shortcuts 檢查是否被其他擴充功能佔用。在 Dia 中，請把範圍改成「全域」。",
        },
      ],
    },
    sync: {
      pageTitle: "同步設定：用瀏覽器同步和 WebDAV 在多台電腦間同步 Lumno｜Lumno 說明中心",
      pageDescription:
        "Lumno 的設定會跟著瀏覽器內建的同步走；開啟 WebDAV 同步後，上傳的捷徑圖示和自訂桌布也能同步，支援堅果雲、NAS 和自架伺服器。附堅果雲的填寫方式。",
      keywords: ["Lumno 同步", "WebDAV 同步", "堅果雲 WebDAV", "Chrome 擴充功能同步設定", "新分頁同步"],
      title: "同步設定",
      navTitle: "同步設定",
      faq: [
        { question: "同步需要註冊 Lumno 帳號嗎？", answer: "不需要。Lumno 沒有帳號和伺服器，設定透過瀏覽器內建的同步傳遞；圖示和桌布可以透過你自己的 WebDAV 同步。" },
        { question: "Chrome 和 Firefox 之間能同步嗎？", answer: "可以，請使用 WebDAV。兩個瀏覽器連線到同一個 WebDAV 伺服器和目錄，即使在同一台電腦上同時開啟也能同步。" },
      ],
    },
    "search-tabs-bookmarks-history": {
      pageTitle: "搜尋已開啟的分頁、書籤和瀏覽紀錄｜Lumno 說明中心",
      pageDescription:
        "在任何網頁按 ⌘⇧K（Windows 為 Ctrl+Shift+K）叫出 Lumno，在同一個搜尋框裡找到已開啟的分頁、書籤、瀏覽紀錄和常用網站，也可以只搜尋已開啟的分頁。",
      keywords: ["Chrome 分頁搜尋", "書籤搜尋擴充功能", "瀏覽紀錄搜尋", "搜尋已開啟分頁", "Chrome 聚焦搜尋"],
      title: "搜尋分頁、書籤和瀏覽紀錄",
      navTitle: "搜尋分頁、書籤和瀏覽紀錄",
      faq: [
        {
          question: "Lumno 會上傳我的瀏覽紀錄或書籤嗎？",
          answer:
            "不會。分頁、書籤和瀏覽紀錄都在瀏覽器本機搜尋，Lumno 不收集這些資料。輸入時，內容會傳送到目前搜尋引擎的建議服務來顯示搜尋建議，和在網址列輸入時一樣。",
        },
        { question: "搜尋結果可以在新分頁開啟嗎？", answer: "可以。在 Lumno 設定中可以選擇在目前分頁、目前分頁的左側或右側，或分頁列最後開啟。" },
      ],
    },
    "site-search": {
      pageTitle: "站內搜尋：輸入簡稱按 Tab，直接在 GitHub、YouTube、維基百科中搜尋｜Lumno 說明中心",
      pageDescription:
        "Lumno 內建 46 個搜尋入口：輸入 gh、yt、zw 等簡稱後按 Tab，就能直接在 GitHub、YouTube、維基百科中搜尋，也能把問題直接送給 ChatGPT、Gemini、DeepSeek。附簡稱列表。",
      keywords: ["Chrome 站內搜尋", "Tab 鍵站內搜尋", "瀏覽器搜尋捷徑", "快速搜尋 GitHub", "快速問 ChatGPT", "自訂搜尋引擎"],
      title: "站內搜尋和問 AI",
      navTitle: "站內搜尋和問 AI",
      faq: [
        {
          question: "支援哪些網站？",
          answer: "內建 46 個：11 個搜尋引擎、11 個 AI 和 AI 搜尋（例如 ChatGPT、Gemini、DeepSeek、Perplexity），以及 GitHub、YouTube、維基百科等 24 個網站。也可以加入自訂網站。",
        },
        { question: "站內搜尋會經過 Lumno 的伺服器嗎？", answer: "不會。Lumno 沒有自己的伺服器，按 Enter 後會直接開啟目標網站的搜尋網址。" },
      ],
    },
    "tab-switcher": {
      pageTitle: "最近分頁切換器：按 ⌥Q 在最近的分頁之間切換｜Lumno 說明中心",
      pageDescription:
        "按 ⌥Q（Windows 為 Alt+Q）開啟 Lumno 的最近分頁切換器，分頁依最近使用的順序排列並顯示預覽。按住 ⌥ 連按 Q 選擇，放開即可切換。",
      keywords: ["Chrome 分頁切換", "最近分頁", "瀏覽器 Alt Tab", "Arc Ctrl Tab"],
      title: "切換最近的分頁",
      navTitle: "切換最近的分頁",
    },
    "newtab-wallpaper": {
      pageTitle: "新分頁桌布：內建名畫、Bing 每日桌布、本機圖片和濾鏡｜Lumno 說明中心",
      pageDescription:
        "在 Lumno 新分頁的外觀設定中更換桌布：內建名畫與插畫、Bing 每日桌布、精選攝影、本機圖片或圖片連結，還能調整遮罩和濾鏡，深色、淺色模式分開設定。",
      keywords: ["新分頁桌布", "Chrome 新分頁背景", "Bing 每日桌布", "新分頁擴充功能"],
      title: "更換桌布",
      navTitle: "更換桌布",
    },
    "newtab-bookmarks-shortcuts": {
      pageTitle: "新分頁的捷徑和書籤：新增網站、三種書籤版面｜Lumno 說明中心",
      pageDescription: "在 Lumno 新分頁加入常用網站的捷徑、自訂圖示，並以多層資料夾、多層級列表或頂端書籤列三種版面瀏覽書籤。",
      keywords: ["新分頁捷徑", "新分頁書籤", "Chrome 書籤列", "書籤資料夾"],
      title: "捷徑和書籤",
      navTitle: "捷徑和書籤",
    },
    "newtab-frequent-sites": {
      pageTitle: "常用網站和追劇卡片：釘選網站，自動記住看到哪一集｜Lumno 說明中心",
      pageDescription:
        "Lumno 新分頁底端顯示最常或最近瀏覽的網站，最多可以釘選 3 張卡片；釘選劇集或連載小說後，卡片會自動更新到最新一集或一章。",
      keywords: ["新分頁常用網站", "追劇進度", "連載小說進度", "釘選網站"],
      title: "常用網站和追劇卡片",
      navTitle: "常用網站和追劇卡片",
    },
    "newtab-clock-zen": {
      pageTitle: "時鐘、每日名句和 Zen 模式：讓新分頁只留搜尋框｜Lumno 說明中心",
      pageDescription: "在 Lumno 新分頁顯示時鐘和每日名句（文學或詩詞），或在搜尋框輸入 /zen 進入 Zen 模式，只留下搜尋框。",
      keywords: ["新分頁時鐘", "每日一句", "極簡新分頁", "Zen 模式"],
      title: "時鐘、名句和 Zen 模式",
      navTitle: "時鐘、名句和 Zen 模式",
    },
    "newtab-other-extensions": {
      pageTitle: "搭配其他新分頁擴充功能：保留 Momentum 等起始頁，只用 Lumno 命令列｜Lumno 說明中心",
      pageDescription:
        "想繼續使用其他新分頁擴充功能，同時使用 Lumno 的命令列：讓另一個擴充功能更晚啟用即可接管新分頁。瀏覽器詢問是否保留變更時請選擇保留，選擇還原會停用整個擴充功能。",
      keywords: ["新分頁擴充功能衝突", "Chrome 新分頁被擴充功能接管", "只用 Lumno 命令列", "Momentum", "Infinity 新分頁"],
      title: "搭配其他新分頁擴充功能",
      navTitle: "搭配其他新分頁擴充功能",
    },
    "selection-actions": {
      pageTitle: "選字快捷操作：選取文字，讓 AI 解釋、翻譯或摘要｜Lumno 說明中心",
      pageDescription:
        "在網頁上選取文字後，Lumno 會依照內容提供解答、翻譯、解釋、總結、研究或計算等 AI 操作。Lumno 先在本機判斷文字是否需要協助，不會每次選字都跳出。",
      keywords: ["選字翻譯", "選字 AI", "選取文字 AI 解釋", "瀏覽器選字擴充功能", "選字摘要"],
      title: "選字快捷操作",
      navTitle: "選字快捷操作",
    },
    "auto-pip": {
      pageTitle: "影片自動子母畫面：切換分頁時影片自動以小視窗播放｜Lumno 說明中心",
      pageDescription:
        "在網頁上看影片時切換到其他分頁，影片會自動進入子母畫面小視窗繼續播放，切回來時自動收起。說明觸發條件、不會觸發的網站和開關位置。",
      keywords: ["自動子母畫面", "Chrome 子母畫面擴充功能", "切換分頁影片小視窗", "Arc 自動子母畫面", "影片浮動視窗"],
      title: "影片自動子母畫面",
      navTitle: "影片自動子母畫面",
    },
    "web-clip": {
      pageTitle: "網頁剪裁：把網頁的一部分放進浮動視窗對照查看｜Lumno 說明中心",
      pageDescription:
        "網頁剪裁可以把表格、程式碼或圖表等網頁內容放進浮動視窗，切換分頁時也一直顯示。說明如何開啟、選取內容、使用浮動視窗，以及有哪些限制。",
      keywords: ["網頁剪裁", "文件子母畫面", "網頁 浮動視窗", "Chrome 擴充功能 子母畫面", "網頁 對照查看"],
      title: "網頁剪裁",
      navTitle: "網頁剪裁",
    },
    "arc-command-bar": {
      pageTitle: "從 Arc 搬到 Chrome、Dia 或 Edge：命令列與快速鍵對照｜Lumno 說明中心",
      pageDescription:
        "從 Arc 換到 Chrome、Dia 或 Edge 後，用 Lumno 找回 Arc 式命令列：按 ⌘⇧K 搜尋分頁、書籤和瀏覽紀錄，也能改成 ⌘T；按 ⌥Q 切換最近的分頁。附 Arc 快速鍵對照表。",
      keywords: ["Arc 命令列替代", "Arc 瀏覽器替代", "Arc 搬到 Chrome", "Dia 命令列", "Arc 快速鍵"],
      title: "從 Arc 搬家",
      navTitle: "從 Arc 搬家",
      faq: [
        { question: "Lumno 和 Arc 有什麼關係？", answer: "Lumno 是獨立的開源專案，互動參考了 Arc，和 Arc、The Browser Company 沒有關係。" },
      ],
    },
    "browser-compatibility": {
      pageTitle: "瀏覽器相容性：Chrome、Edge、Dia、Brave、Firefox 與 Safari｜Lumno 說明中心",
      pageDescription:
        "Lumno 在 Chrome、Edge、Brave、Arc、Vivaldi 等 Chromium 瀏覽器中可以使用全部功能；Dia 無法使用新分頁；Firefox 版有部分限制；暫不支援 Safari 和手機瀏覽器。",
      keywords: ["Lumno 相容性", "Dia 擴充功能", "Edge 擴充功能", "Firefox 版", "Chromium 擴充功能"],
      title: "瀏覽器相容性",
      navTitle: "瀏覽器相容性",
    },
    "privacy-data": {
      pageTitle: "隱私與資料：Lumno 在本機處理資料，不收集使用資訊｜Lumno 說明中心",
      pageDescription:
        "Lumno 沒有帳號和伺服器，分頁、書籤和瀏覽紀錄只在本機處理，不收集使用資料。本文說明哪些請求會離開你的電腦，以及瀏覽器同步和 WebDAV 同步的範圍。",
      keywords: ["Lumno 隱私", "瀏覽器擴充功能隱私", "Chrome 擴充功能資料", "WebDAV 同步"],
      title: "隱私與資料",
      navTitle: "隱私與資料",
    },
    "security-open-source": {
      pageTitle: "安全與開源：GPL-3.0 原始碼、權限用途與 Manifest V3｜Lumno 說明中心",
      pageDescription: "Lumno 以 GPL-3.0 授權開源，原始碼公開在 GitHub；採用 Manifest V3，不執行遠端程式碼。本文列出每項瀏覽器權限的用途。",
      keywords: ["Lumno 開源", "Lumno 安全", "Chrome 擴充功能權限", "Manifest V3"],
      title: "安全與開源",
      navTitle: "安全與開源",
    },
    "ratings-reviews": {
      pageTitle: "評分與評測：Chrome 線上應用程式商店評分和少數派報導｜Lumno 說明中心",
      pageDescription: "Lumno 在 Chrome 線上應用程式商店的評分與評論，以及少數派對 Lumno 的介紹文章。",
      keywords: ["Lumno 評價", "Lumno 評分", "少數派 Lumno", "Chrome 命令列擴充功能推薦"],
      title: "評分與評測",
      navTitle: "評分與評測",
    },
  },
};

export default content;
