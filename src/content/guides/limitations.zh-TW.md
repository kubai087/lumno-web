Lumno 只是一個瀏覽器擴充功能，不是新的瀏覽器，受瀏覽器的限制，有些事還做不到。下面是目前已知的不足，如果你剛好需要這些功能，也許文中提到的其他工具會更適合。

## 有些頁面叫不出命令列 {#restricted-pages}

基於安全考量，瀏覽器不允許擴充功能在這些頁面上顯示內容：

- `chrome://`、`edge://` 開頭的瀏覽器頁面
- Chrome 線上應用程式商店和 Edge 附加元件網站

在這些頁面按下快速鍵，Lumno 會依設定裡「在受限頁行為」的選項處理。

本機的 PDF、HTML 檔案（`file://` 開頭）可以用，但要先在擴充功能詳細資料頁開啟「允許存取檔案網址」。

## 不在瀏覽器裡的東西 {#outside-browser}

Lumno 只搜尋瀏覽器裡的東西。想用一組快速鍵搜尋電腦上的應用程式、檔案和系統設定，可以試試 [Raycast](https://www.raycast.com/) 或 [Alfred](https://www.alfredapp.com/)（macOS）。

## 不支援的瀏覽器 {#browsers}

- 暫不支援 Safari，也不支援手機上的瀏覽器。
- 在 Dia 裡可以用命令列，但新分頁無法使用。
- Firefox 版有幾項功能無法使用，詳見[瀏覽器相容性](../browser-compatibility/)。

## 新分頁的小工具 {#widgets}

Lumno 的新分頁走簡潔路線，沒有天氣、待辦、便利貼這類小工具。想要功能豐富的起始頁，可以試試 [Momentum](https://momentumdash.com/) 或 [Infinity 新分頁](https://www.infinitynewtab.com/)。

受瀏覽器限制，同一時間只能有一個擴充功能接管新分頁。你可以繼續用它們的新分頁，同時保留 Lumno 的命令列。

## 雲端同步 {#data}

Lumno 沒有伺服器，所以沒有雲端帳號。設定會跟著瀏覽器內建的同步走；想連圖示和桌布一起同步，需要自己準備一個 WebDAV（例如堅果雲或 NAS），見[同步設定](../sync/)。

瀏覽紀錄、書籤和開著的分頁不在 Lumno 的同步範圍內，照舊由瀏覽器自己同步。
