Lumno 为 Chromium 浏览器而生，也有 Firefox 版。下面是在各个浏览器里能用到哪些。

## 一览 {#support}

| 浏览器 | 命令栏 | 新标签页 | 去哪里装 |
| --- | --- | --- | --- |
| Google Chrome | 支持 | 支持 | Chrome 应用商店 |
| Microsoft Edge | 支持 | 支持 | Edge 加载项 |
| Brave、Arc、Vivaldi、Opera | 支持 | 支持 | Chrome 应用商店 |
| Dia | 支持 | 暂不可用 | Chrome 应用商店 |
| Firefox、Zen 等 | 部分支持 | 支持 | 见下文 |
| Safari | 不支持 | 不支持 | — |

手机和平板上的浏览器暂时都不支持。

## Dia {#dia}

Dia 限制了扩展接管新标签页，所以 Lumno 的新标签页在 Dia 里用不了，命令栏一切正常。

按快捷键没反应的话，打开扩展快捷键页，把 Lumno 这一项右边的范围从「在 Dia 中」改成「全局」。

## Firefox {#firefox}

Firefox 版还没上架 Firefox 附加组件商店，上架后会在这个网站放出安装入口。它适用于 Firefox 140 及以上，也能用在 Zen、LibreWolf、Floorp 这些基于 Firefox 的浏览器里。

Firefox 的扩展接口和 Chromium 不太一样，所以有几处用不了：

| 功能 | 在 Firefox 里 |
| --- | --- |
| 视频自动画中画 | 用不了，Firefox 不允许扩展让网页视频进入画中画 |
| 网页剪裁 | 用不了，Firefox 不支持文档画中画 |
| 在 `about:` 页面和附加组件网站唤出命令栏 | 用不了 |
| 从快捷方式或命令栏打开 `about:` 页面 | 用不了 |
| 在本地 `file://` 页面唤出命令栏 | 用不了 |
| 网站图标 | 没去过的网站，可能先显示一个占位图标 |

Firefox 自己占用了 `⌘ ⇧ K`，所以 Firefox 版在 macOS 上默认用 `⌃ ⇧ K`，在 Windows 和 Linux 上默认用 `Alt + K`，`Alt + Q` 不变。

## Safari {#safari}

Safari 的扩展体系和 Chromium 差别很大，Lumno 暂时没有 Safari 版。在 Mac 上想要类似的全局搜索，可以试试 [Raycast](https://www.raycast.com/) 或 [Alfred](https://www.alfredapp.com/)。

## 界面语言 {#languages}

扩展支持简体中文、繁体中文、英文和日文，默认跟着浏览器语言走，也可以在设置里换。
