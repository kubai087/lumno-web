Lumno 是瀏覽器擴充功能，而不是獨立的瀏覽器，會受到瀏覽器本身的限制，有些功能目前無法實現。以下是已知的不足；如果你剛好需要這些功能，文中提到的其他工具可能更適合。

## 部分頁面無法叫出命令列 {#restricted-pages}

基於安全考量，瀏覽器不允許擴充功能在以下頁面中顯示內容：

- 以 `chrome://`、`edge://` 開頭的瀏覽器頁面
- Chrome 線上應用程式商店和 Edge 附加元件網站

在這些頁面上按下快速鍵時，Lumno 會依照設定中「在受限頁行為」選項的設定處理。

本機的 PDF、HTML 檔案（以 `file://` 開頭）可以使用命令列，但需要先在擴充功能詳細資料頁中開啟「允許存取檔案網址」。

## 瀏覽器以外的內容 {#outside-browser}

Lumno 只搜尋瀏覽器中的內容。如果想用一組快速鍵搜尋電腦上的應用程式、檔案和系統設定，可以試試 [Raycast](https://www.raycast.com/) 或 [Alfred](https://www.alfredapp.com/)（macOS）。

## 瀏覽器支援 {#browsers}

- 暫不支援 Safari，也不支援行動裝置上的瀏覽器。
- 在 Dia 中可以使用命令列，但無法使用新分頁。
- Firefox 版有幾項功能無法使用，詳見[瀏覽器相容性](../browser-compatibility/)。

## 新分頁小工具 {#widgets}

Lumno 的新分頁以簡潔為主，不提供天氣、待辦、便利貼等小工具。如果需要功能豐富的起始頁，可以試試 [Momentum](https://momentumdash.com/) 或 [Infinity 新分頁](https://www.infinitynewtab.com/)。

受瀏覽器限制，同一時間只能由一個擴充功能接管新分頁。你可以繼續使用這些擴充功能的新分頁，同時保留 Lumno 的命令列，詳見[搭配其他新分頁擴充功能](../newtab-other-extensions/)。

## 雲端同步 {#data}

Lumno 沒有伺服器，因此不提供雲端帳號。設定會透過瀏覽器內建的同步功能同步；如果想同時同步圖示和桌布，需要自行準備一個 WebDAV 服務（例如堅果雲或 NAS），詳見[同步設定](../sync/)。

瀏覽紀錄、書籤和已開啟的分頁不在 Lumno 的同步範圍內，仍由瀏覽器本身負責同步。
