Lumno 主要針對 Chromium 瀏覽器設計，同時提供 Firefox 版。下表列出各瀏覽器中可用的功能。

## 支援情況 {#support}

| 瀏覽器 | 命令列 | 新分頁 | 安裝管道 |
| --- | --- | --- | --- |
| Google Chrome | 支援 | 支援 | Chrome 線上應用程式商店 |
| Microsoft Edge | 支援 | 支援 | Edge 附加元件 |
| Brave、Arc、Vivaldi、Opera | 支援 | 支援 | Chrome 線上應用程式商店 |
| Dia | 支援 | 暫不可用 | Chrome 線上應用程式商店 |
| Firefox、Zen 等 | 部分支援 | 支援 | 見下文 |
| Safari | 不支援 | 不支援 | — |

暫不支援手機和平板上的瀏覽器。

## Dia {#dia}

Dia 限制了擴充功能接管新分頁，因此 Lumno 的新分頁在 Dia 中無法使用，命令列則可以正常使用。

如果按下快速鍵沒有反應，請開啟擴充功能快速鍵頁面，將 Lumno 對應項目右側的範圍從「在 Dia 中」改為「全域」。

## Firefox {#firefox}

Firefox 版尚未在 Firefox 附加元件商店上架，上架後將在本網站提供安裝入口。它適用於 Firefox 140 以上版本，也可以在 Zen、LibreWolf、Floorp 等以 Firefox 為基礎的瀏覽器中使用。

由於 Firefox 的擴充功能介面與 Chromium 有所不同，以下功能無法使用：

| 功能 | 在 Firefox 中 |
| --- | --- |
| 影片自動子母畫面 | 無法使用，Firefox 不允許擴充功能讓網頁影片進入子母畫面 |
| 網頁剪裁 | 無法使用，Firefox 不支援文件子母畫面 |
| 在 `about:` 頁面和附加元件網站叫出命令列 | 無法使用 |
| 從捷徑或命令列開啟 `about:` 頁面 | 無法使用 |
| 在本機 `file://` 頁面叫出命令列 | 無法使用 |
| 網站圖示 | 未造訪過的網站可能會先顯示預留圖示 |

Firefox 本身佔用了 `⌘ ⇧ K`，因此 Firefox 版在 macOS 上預設使用 `⌃ ⇧ K`，在 Windows 和 Linux 上預設使用 `Alt + K`；`Alt + Q` 保持不變。

## Safari {#safari}

Safari 的擴充功能架構與 Chromium 差異較大，Lumno 暫時沒有 Safari 版。如果想在 Mac 上使用類似的全域搜尋，可以試試 [Raycast](https://www.raycast.com/) 或 [Alfred](https://www.alfredapp.com/)。

## 介面語言 {#languages}

擴充功能介面支援繁體中文、簡體中文、英文和日文，預設跟隨瀏覽器語言，也可以在設定中更改。
