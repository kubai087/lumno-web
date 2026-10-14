這裡整理了官網和使用者群組中最常被問到的問題。每個回答都附有詳細說明的連結。

## 使用 {#using}

### 預設快速鍵是什麼？可以修改嗎？

在 Mac 上，預設快速鍵為 `⌘ ⇧ K | ⌘ ⇧ K`；在 Windows 和 Linux 上為 `Ctrl + Shift + K`。快速鍵可以在 `chrome://extensions/shortcuts` 中修改，詳見[快速鍵](../keyboard-shortcuts/#change)。Firefox 版的預設快速鍵不同，詳見[瀏覽器相容性](../browser-compatibility/#firefox)。

### 按下快速鍵沒有反應怎麼辦？

請先確認目前頁面不是 `chrome://` 設定頁、擴充功能商店這類受限頁面，再到 `chrome://extensions/shortcuts` 檢查快速鍵是否被其他擴充功能佔用。在 Dia 中，還需要把該項右側的範圍改為「全域」。

### 為什麼在有些頁面上打不開命令列？

瀏覽器不允許擴充功能在 `chrome://` 設定頁、擴充功能商店等受限頁面上執行。在這些頁面按下快速鍵時，Lumno 會依照設定中「在受限頁行為」選項的設定處理，預設會改為在新分頁中開啟搜尋。如果需要在本機 PDF 或 HTML 檔案中使用，請在擴充功能詳細資料頁中開啟「允許存取檔案網址」。詳見 [Lumno 做不到的事](../limitations/#restricted-pages)。

### 命令列的深淺色為什麼和系統不一致？

在「跟隨系統」模式下，命令列還會參考目前網頁的顏色。如果只想跟隨系統，請在 Lumno 設定的「外觀」中關閉「依網頁色彩自動變更主題色」。

### 從 Arc 換過來，還能使用熟悉的命令列嗎？

可以。Lumno 的互動參考了 [Arc](https://arc.net/)（與 Arc 官方沒有關聯），在 Dia、Chrome 和 Edge 中都可以隨時叫出命令列。把快速鍵改為 `⌘ T`，即可沿用 Arc 的操作習慣。詳見[從 Arc 搬家](../arc-command-bar/)。

## 新分頁 {#new-tab}

### 能只用命令列，繼續使用其他新分頁擴充功能嗎？

可以。保持 Lumno 開啟，再重新安裝或重新啟用原本的新分頁擴充功能，讓它重新接管新分頁即可，命令列不受影響。具體步驟見[搭配其他新分頁擴充功能](../newtab-other-extensions/)。

### 為什麼新分頁的網址列中顯示一串擴充功能網址？

這是因為開啟了「輸入框自動聚焦」：為了讓游標直接落在 Lumno 的搜尋框中，網址列會顯示擴充功能網址。在新分頁的外觀設定中關閉這一項，網址列就會恢復空白。

## 相容性 {#compatibility}

### 支援哪些瀏覽器？

支援 Chrome、Edge、Dia、Brave、Vivaldi 等 Chromium 核心的瀏覽器，以及 Firefox 140 以上版本和 Zen 等以 Firefox 為基礎的瀏覽器，暫不支援 Safari。在 Dia 中可以使用命令列，但新分頁暫時無法使用。詳見[瀏覽器相容性](../browser-compatibility/)。

### Firefox 版和 Chrome 版有什麼不同？

主要功能相同，只有幾處受 Firefox 的限制：無法使用網頁剪裁和影片自動子母畫面；不能在 `about:` 頁面、附加元件網站和本機檔案中叫出命令列；預設快速鍵改為 `⌃ ⇧ K | Alt + K`。詳見[瀏覽器相容性](../browser-compatibility/#firefox)。

### Zen、LibreWolf 等以 Firefox 為基礎的瀏覽器能用嗎？

可以。這些瀏覽器使用 Firefox 版，從 [Firefox 附加元件](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/)安裝即可，核心需要 Firefox 140 以上版本。

### Safari 和手機瀏覽器能用嗎？

目前不支援。Safari 的擴充功能架構與 Chromium 差異較大，Lumno 暫時沒有 Safari 版，也不支援手機和平板上的瀏覽器。如果你在手機上開啟了本網站，且手機已登入 Google 帳號，可以先點選安裝；之後開啟電腦上登入同一個 Google 帳號並開啟同步的 Chrome，Lumno 就會自動同步安裝。詳見[瀏覽器相容性](../browser-compatibility/#safari)。

## 資料與同步 {#data}

### 設定能在多台裝置之間同步嗎？

可以。設定預設透過瀏覽器帳號同步；開啟 WebDAV 同步（支援堅果雲和自架伺服器）後，還可以在不同瀏覽器之間同步圖示和桌布。詳見[同步設定](../sync/)。

### Lumno 會上傳我的瀏覽資料嗎？

不會。分頁、書籤和瀏覽紀錄都在本機搜尋。只有在進行網頁搜尋或向 AI 提問時，你輸入的內容才會傳送給你選擇的搜尋引擎或 AI 網站。詳見[隱私權政策](/zh-tw/privacy/)。

### Lumno 免費嗎？需要註冊嗎？

Lumno 完全免費，原始碼以 GPL-3.0 授權公開在 [GitHub](https://github.com/kubai087/lumno-extension) 上。Lumno 沒有帳號系統，安裝後即可使用，不必註冊。
