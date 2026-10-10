Arc 停止加入新功能後，不少使用者轉向了 Chrome、Dia 或 Edge。Lumno 參考了 Arc 的多項互動，包括命令列、最近分頁切換、重新啟動後還原釘選分頁，以及影片自動子母畫面，安裝後即可在這些瀏覽器中繼續使用。

Lumno 是獨立的開源專案，與 Arc 及 The Browser Company 沒有任何關聯。

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
2. 開啟 `chrome://extensions/shortcuts`，把「叫出聚焦搜尋視窗」改為 `⌘ T`，詳見[快速鍵](../keyboard-shortcuts/#change)。
3. 按 `⌘ T`，試著[搜尋分頁、書籤和瀏覽紀錄](../search-tabs-bookmarks-history/)。
4. 需要在最近幾個頁面之間來回切換時，按 `⌥ Q` 開啟[最近分頁切換器](../tab-switcher/)。

在 Dia 中按下快速鍵沒有反應時，請在擴充功能快速鍵頁面將範圍從「在 Dia 中」改為「全域」。

## Lumno 無法提供的 Arc 功能 {#limits}

側邊欄、Spaces 和分割畫面需要瀏覽器本身支援，擴充功能無法實現。如果離不開這些功能，可以試試 [Zen Browser](https://zen-browser.app/)，它是一款以 Firefox 為基礎、與 Arc 十分相似的瀏覽器；也可以試試 [Vivaldi](https://vivaldi.com/)，它同樣提供側邊欄、工作區和分割畫面。更多說明見 [Lumno 做不到的事](../limitations/)。
