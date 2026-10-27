[Arc](https://arc.net/) 將於 2026 年 12 月 22 日停止服務，屆時 Mac 和 Windows 版 Arc 將無法開啟。離開 Arc 之前，先把資料搬出來，再挑一款新瀏覽器。Lumno 參考了 Arc 的多項互動，包括命令列、最近分頁切換、重新啟動後還原釘選分頁，以及影片自動子母畫面，在 Chrome、Dia、Edge 中安裝後即可繼續使用。

Lumno 是獨立的開源專案，與 Arc 及 The Browser Company 沒有任何關聯。

## Arc 停止服務時間表 {#timeline}

- **10 月 22 日**：Arc 宣布停止服務，無法再註冊新的 Arc 帳號。
- **11 月 23 日**：iOS 和 Android 版 Arc Search 關閉 AI 功能，也無法再登入和同步，但仍可當作一般瀏覽器使用。
- **12 月 15 日**：申請取得或刪除 Arc 帳號個人資料的最後一天。
- **12 月 22 日**：Mac 和 Windows 版 Arc 停止運作，所有帳號停用，帳號相關的個人資料會在 30 天內刪除。

停止服務後，存在這台電腦上的 Arc 資料也無法再開啟。完整說明見 Arc 官方的 [Arc Sunset: Key Dates and What to Expect](https://resources.arc.net/hc/en-us/articles/44412972248471)。

## 12 月 22 日前先匯出資料 {#export}

- **換到 Dia**：不需要匯出。安裝 Dia 後選擇從 Arc 匯入，Spaces、釘選分頁、資料夾、書籤、瀏覽紀錄、密碼和擴充功能都會一起帶過去，Spaces 會變成 Dia 的 Profiles。匯入期間請保留 Arc，詳見 [Move from Arc to Dia](https://resources.arc.net/hc/en-us/articles/44413129117591)。
- **換到其他瀏覽器**：在 Arc 的設定中開啟「Advanced」，選擇「Export Data」。Arc 會儲存一個 `Arc Data Export.md` 檔案，依 Space 列出最愛、釘選分頁和資料夾裡的連結。這是一份連結清單而不是書籤檔，需要在新瀏覽器中自行開啟或加入書籤，詳見 [How Do I Export My Data from Arc?](https://resources.arc.net/hc/en-us/articles/25583851606039)。

Easel 和 Boost 無法匯出，也不會匯入 Dia。

## 在 Arc 裡用過 Lumno？先帶走設定 {#lumno-settings}

Lumno 的設定儲存在目前的瀏覽器裡，Arc 停止服務後就無法取回。換瀏覽器之前，先在 Lumno 設定中[匯出設定](../sync/#export)，在新瀏覽器裝好 Lumno 後再匯入；也可以開啟 [WebDAV 同步](../sync/)，連圖示和桌布也會一起帶過去。

即使換到 Dia 時擴充功能會一起匯入，也建議先匯出一份。

## 選擇新瀏覽器 {#choose}

| 瀏覽器 | 和 Arc 的相似之處 | 搭配 Lumno |
| --- | --- | --- |
| Dia | 同一團隊開發，有側邊欄、釘選分頁和分頁切換器，可直接從 Arc 匯入 | 可使用命令列，新分頁暫不可用 |
| Chrome、Edge | 沒有側邊欄和 Spaces，擴充功能生態最完整 | 所有功能都可用 |
| [Zen Browser](https://zen-browser.app/) | 以 Firefox 為基礎，有側邊欄、工作區和分割畫面，與 Arc 十分相似 | 從 Firefox 附加元件安裝，部分功能受限 |
| [Vivaldi](https://vivaldi.com/) | 有側邊欄、工作區和分割畫面 | 所有功能都可用 |

各瀏覽器的支援情況見[瀏覽器相容性](../browser-compatibility/)。

## 操作對照 {#mapping}

| Arc | Lumno |
| --- | --- |
| `⌘ T` 開啟命令列 | `⌘ ⇧ K` 叫出命令列，也可以改為 `⌘ T` |
| 在命令列中切換到已開啟的分頁 | 選取標有「已開啟」的結果，按下 Enter 切換 |
| `⌃ Tab` 切換最近的分頁 | `⌥ Q` 開啟最近分頁切換器 |
| `⌘ ⇧ C` 複製目前網址 | 在擴充功能快速鍵頁面為「複製目前網頁連結」設定快速鍵 |
| 重新啟動後保留釘選分頁 | 在 Lumno 設定中開啟「重新啟動後還原釘選分頁」 |
| 切換分頁時影片自動進入子母畫面 | [影片自動子母畫面](../auto-pip/)，預設開啟 |
| 新分頁 | Lumno 新分頁（暫不支援 Dia） |

## 轉移步驟 {#steps}

1. [安裝 Lumno](../install/)：Chrome、Dia 使用者從 Chrome 線上應用程式商店安裝，Edge 使用者從 Edge 附加元件安裝。
2. 開啟 `chrome://extensions/shortcuts`，把「叫出聚焦搜尋視窗」改為 `⌘ T`，和 Arc、[Zen](https://zen-browser.app/) 中的操作一致，詳見[快速鍵](../keyboard-shortcuts/#change)。Dia 使用者需要先讓出 `⌘ T`，見下文。
3. 按 `⌘ T`，試著[搜尋分頁、書籤和瀏覽紀錄](../search-tabs-bookmarks-history/)。
4. 需要在最近幾個頁面之間來回切換時，按 `⌥ Q` 開啟[最近分頁切換器](../tab-switcher/)。

Dia 自己的快速鍵優先於擴充功能，因此在 Dia 中需要先開啟 Settings → Shortcuts，把「New Tab」的 `⌘ T` 改為其他按鍵，詳見[瀏覽器相容性](../browser-compatibility/#dia)。在 Dia 中按下快速鍵沒有反應時，請在擴充功能快速鍵頁面將範圍從「In Dia」改為「Global」。

## Lumno 無法提供的 Arc 功能 {#limits}

側邊欄、Spaces 和分割畫面需要瀏覽器本身支援，擴充功能無法實現。如果離不開這些功能，可以選擇上文的 Dia、Zen 或 Vivaldi。更多說明見 [Lumno 做不到的事](../limitations/)。
