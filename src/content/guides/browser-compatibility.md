Lumno 主要面向 Chromium 浏览器，同时提供 Firefox 版。下表列出各浏览器中可用的功能。

## 支持情况 {#support}

| 浏览器 | 命令栏 | 新标签页 | 安装渠道 |
| --- | --- | --- | --- |
| Google Chrome | 支持 | 支持 | Chrome 应用商店 |
| Microsoft Edge | 支持 | 支持 | Edge 加载项 |
| Brave、[Arc](https://arc.net/)、Vivaldi、Opera | 支持 | 支持 | Chrome 应用商店 |
| Dia | 支持 | 暂不可用 | Chrome 应用商店 |
| Firefox、[Zen](https://zen-browser.app/) 等 | 部分支持 | 支持 | 见下文 |
| Safari | 不支持 | 不支持 | — |

暂不支持手机和平板上的浏览器。

## Dia {#dia}

Dia 限制了扩展接管新标签页，因此 Lumno 的新标签页在 Dia 中无法使用，命令栏则可以正常使用。

如果按下快捷键没有反应，请打开扩展快捷键页面，将 Lumno 对应项右侧的范围从「在 Dia 中」改为「全局」。

## Firefox {#firefox}

Firefox 版尚未在 Firefox 附加组件商店上架，上架后将在本网站提供安装入口。它适用于 Firefox 140 及以上版本，也可以在 Zen、LibreWolf、Floorp 等基于 Firefox 的浏览器中使用。

由于 Firefox 的扩展接口与 Chromium 有所不同，以下功能无法使用：

| 功能 | 在 Firefox 中 |
| --- | --- |
| 视频自动画中画 | 不可用，Firefox 不允许扩展让网页视频进入画中画 |
| 网页剪裁 | 不可用，Firefox 不支持文档画中画 |
| 在 `about:` 页面和附加组件网站唤出命令栏 | 不可用 |
| 从快捷方式或命令栏打开 `about:` 页面 | 不可用 |
| 在本地 `file://` 页面唤出命令栏 | 不可用 |
| 网站图标 | 未访问过的网站可能会先显示占位图标 |

Firefox 自身占用了 `⌘ ⇧ K`，因此 Firefox 版在 macOS 上默认使用 `⌃ ⇧ K`，在 Windows 和 Linux 上默认使用 `Alt + K`；`Alt + Q` 保持不变。

## Safari {#safari}

Safari 的扩展体系与 Chromium 差异较大，Lumno 暂时没有 Safari 版。如果想在 Mac 上使用类似的全局搜索，可以试试 [Raycast](https://www.raycast.com/) 或 [Alfred](https://www.alfredapp.com/)。

## 界面语言 {#languages}

扩展界面支持简体中文、繁体中文、英文和日文，默认跟随浏览器语言，也可以在设置中更改。
