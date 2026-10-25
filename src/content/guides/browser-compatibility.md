Lumno 主要面向 Chromium 浏览器，同时提供 Firefox 版。下表列出各浏览器中可用的功能。

## 支持情况 {#support}

| 浏览器 | 命令栏 | 新标签页 | 安装渠道 |
| --- | --- | --- | --- |
| Google Chrome | 支持 | 支持 | Chrome 应用商店 |
| Microsoft Edge | 支持 | 支持 | Edge 加载项 |
| Brave、[Arc](https://arc.net/)、Vivaldi、Opera | 支持 | 支持 | Chrome 应用商店 |
| Dia | 支持 | 暂不可用 | Chrome 应用商店 |
| Firefox、[Zen](https://zen-browser.app/) 等 | 部分支持 | 支持 | Firefox 附加组件 |
| Safari | 不支持 | 不支持 | — |

暂不支持手机和平板上的浏览器。如果你在手机上打开了本网站，且手机已登录 Google 账号，可以先点击安装；之后打开电脑上登录同一 Google 账号并开启同步的 Chrome，Lumno 会自动同步安装。

## Dia {#dia}

Dia 限制了扩展接管新标签页，因此 Lumno 的新标签页在 Dia 中无法使用，命令栏则可以正常使用。

想用 `⌘ T` 唤出命令栏时，由于 Dia 自己的快捷键优先，需要先在 Dia 中让出 `⌘ T`：

1. 打开 Dia 的 Settings → Shortcuts，把「New Tab」的快捷键从 `⌘ T` 改为其他按键。
2. 打开 `dia://extensions/shortcuts`，把 Lumno 的「Open command bar」改为 `⌘ T`。

![Dia 设置的 Shortcuts 页面，「New Tab」已从 ⌘T 改为其他按键](dia-newtab "第 1 步：在 Dia 的 Settings → Shortcuts 中给「New Tab」换一个按键")

![Dia 的扩展快捷键页面，Lumno 的「Open command bar」设为 ⌘T](dia-shortcuts "第 2 步：在 dia://extensions/shortcuts 中把「Open command bar」设为 ⌘T")

如果按下快捷键没有反应，请打开扩展快捷键页面，将 Lumno 对应项右侧的范围从「In Dia」改为「Global」。

## Firefox {#firefox}

Firefox 版已在 [Firefox 附加组件](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/)上架，适用于 Firefox 140 及以上版本，也可以在 Zen、LibreWolf、Floorp 等基于 Firefox 的浏览器中安装使用。

由于 Firefox 的扩展接口与 Chromium 有所不同，以下功能无法使用：

| 功能 | 在 Firefox 中 |
| --- | --- |
| 视频自动画中画 | 不可用，Firefox 不允许扩展让网页视频进入画中画 |
| 网页剪裁 | 不可用，Firefox 不支持文档画中画 |
| 在 `about:` 页面和附加组件网站唤出命令栏 | 不可用 |
| 从快捷方式或命令栏打开 `about:` 页面 | 不可用 |
| 在本地 `file://` 页面唤出命令栏 | 不可用 |
| 网站图标 | 未访问过的网站可能会先显示占位图标 |
| 新标签页的液态玻璃 | 只显示玻璃质感，边缘没有折射效果 |

Firefox 自身占用了 `⌘ ⇧ K`，因此 Firefox 版默认使用 `⌃ ⇧ K | Alt + K`；`⌥ Q` 保持不变。如需修改，打开 `about:addons`，点击右上角的齿轮按钮，选择「管理扩展快捷键」。

## Safari {#safari}

Safari 的扩展体系与 Chromium 差异较大，Lumno 暂时没有 Safari 版。如果想在 Mac 上使用类似的全局搜索，可以试试 [Raycast](https://www.raycast.com/) 或 [Alfred](https://www.alfredapp.com/)。

## 界面语言 {#languages}

扩展界面支持简体中文、繁体中文、英文和日文，默认跟随浏览器语言，也可以在设置中更改。
