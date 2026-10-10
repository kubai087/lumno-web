Lumno 為 Chromium 瀏覽器而生，也有 Firefox 版。下面是在各個瀏覽器裡能用到哪些功能。

## 一覽 {#support}

| 瀏覽器 | 命令列 | 新分頁 | 去哪裡裝 |
| --- | --- | --- | --- |
| Google Chrome | 支援 | 支援 | Chrome 線上應用程式商店 |
| Microsoft Edge | 支援 | 支援 | Edge 附加元件 |
| Brave、Arc、Vivaldi、Opera | 支援 | 支援 | Chrome 線上應用程式商店 |
| Dia | 支援 | 暫不可用 | Chrome 線上應用程式商店 |
| Firefox、Zen 等 | 部分支援 | 支援 | 見下文 |
| Safari | 不支援 | 不支援 | — |

手機和平板上的瀏覽器暫時都不支援。

## Dia {#dia}

Dia 限制了擴充功能接管新分頁，所以 Lumno 的新分頁在 Dia 裡無法使用，命令列一切正常。

按快速鍵沒反應的話，開啟擴充功能快速鍵頁，把 Lumno 這一項右邊的範圍從「在 Dia 中」改成「全域」。

## Firefox {#firefox}

Firefox 版還沒上架 Firefox 附加元件商店，上架後會在這個網站放上安裝入口。它適用於 Firefox 140 以上版本，也能用在 Zen、LibreWolf、Floorp 這些以 Firefox 為基礎的瀏覽器裡。

Firefox 的擴充功能介面和 Chromium 不太一樣，所以有幾處無法使用：

| 功能 | 在 Firefox 裡 |
| --- | --- |
| 影片自動子母畫面 | 無法使用，Firefox 不允許擴充功能讓網頁影片進入子母畫面 |
| 網頁剪裁 | 無法使用，Firefox 不支援文件子母畫面 |
| 在 `about:` 頁面和附加元件網站叫出命令列 | 無法使用 |
| 從捷徑或命令列開啟 `about:` 頁面 | 無法使用 |
| 在本機 `file://` 頁面叫出命令列 | 無法使用 |
| 網站圖示 | 沒去過的網站，可能先顯示佔位圖示 |

Firefox 自己佔用了 `⌘ ⇧ K`，所以 Firefox 版在 macOS 上預設用 `⌃ ⇧ K`，在 Windows 和 Linux 上預設用 `Alt + K`，`Alt + Q` 不變。

## Safari {#safari}

Safari 的擴充功能架構和 Chromium 差異很大，Lumno 暫時沒有 Safari 版。想在 Mac 上有類似的全域搜尋，可以試試 [Raycast](https://www.raycast.com/) 或 [Alfred](https://www.alfredapp.com/)。

## 介面語言 {#languages}

擴充功能支援繁體中文、簡體中文、英文和日文，預設跟著瀏覽器語言，也可以在設定裡更換。
