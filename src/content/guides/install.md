Lumno 完全免费，无需注册，从扩展商店安装后即可使用。

## 从商店安装 {#store}

| 浏览器 | 安装渠道 |
| --- | --- |
| Chrome、Dia、Brave、[Arc](https://arc.net/)、Vivaldi、Opera | [Chrome 应用商店](https://chromewebstore.google.com/detail/nggfkkbmogmadfoikakkfegkoilfcfao) |
| Microsoft Edge | [Microsoft Edge 加载项](https://microsoftedge.microsoft.com/addons/detail/pfbklkaefmfamjpibfiapaiihlddhchc) |
| Firefox、[Zen](https://zen-browser.app/)、LibreWolf、Floorp | [Firefox 附加组件](https://addons.mozilla.org/firefox/addon/lumno-command-bar-new-tab/) |

打开商店页面，点击「添加至 Chrome」「获取」或「添加到 Firefox」，然后在弹出的对话框中确认即可。Edge 用户也可以直接从 Chrome 应用商店安装。

## 安装之后 {#after-install}

浏览器会自动打开 Lumno 的欢迎页，介绍主要功能。

![Lumno 欢迎页，左侧是“让浏览器的常用网站一搜即达”的标语和功能说明，右侧是 Lumno 字标和田野插画](onboarding "安装后打开的欢迎页")

第一次打开新标签页时，Chrome 可能会询问是否保留扩展对新标签页的修改，请选择保留。如果选择恢复原来的设置，Chrome 会停用整个 Lumno，命令栏也会一起失效。如果想继续使用其他新标签页扩展，请参阅[搭配其他新标签页扩展](../newtab-other-extensions/)。

## 开始使用命令栏 {#try}

打开任意网页，按下 `⌘ ⇧ K`，即可唤出命令栏。输入几个字，可以搜索已打开的标签页和书签；按 `Esc` 关闭。Firefox 版的默认快捷键是 `⌃ ⇧ K | Alt + K`。

如果按下快捷键没有反应，请参阅[快捷键](../keyboard-shortcuts/)中的排查方法。

## 工具栏弹窗 {#toolbar-popup}

点击浏览器工具栏中的 Lumno 图标，会打开一个小弹窗。如果工具栏中没有 Lumno 图标，可以先点击拼图形状的扩展按钮，把 Lumno 固定到工具栏。

- 弹窗上方显示当前网页的标题和地址。内容被截断时，将鼠标停在上面即可看到完整内容。
- 页面操作：「添加快捷方式」会把当前网页加入新标签页的快捷方式；还可以「复制链接」或「打开命令栏」。在 Lumno 设置中开启[网页剪裁](../web-clip/)后，也可以从这里剪裁网页；网页中有视频时，可以开启画中画，并设置[自动画中画](../auto-pip/)。
- 展开「快速设置」，可以切换主题、「跟随网页配色」和「默认显示已打开的标签页」。
- 底部显示版本号和 WebDAV 同步状态，还可以前往设置、设置快捷键、反馈和更新日志。

## 在本地文件中使用 {#file-access}

如果想在电脑上的 PDF、HTML 文件中唤出命令栏，需要先打开 `chrome://extensions`，进入 Lumno 的详情页，开启「允许访问文件网址」，然后刷新该文件页面。Firefox 不允许扩展访问本地文件，因此 Firefox 版无法在这类页面中唤出命令栏。
