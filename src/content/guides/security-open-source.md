Lumno 的全部代码都是公开的，扩展做了什么、没做什么，任何人都可以查看。

## 开源 {#open-source}

- 源码：[github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- 协议：GPL-3.0
- 反馈问题：欢迎在 GitHub 提交 Issue

商店中的每个版本都由同一份源码打包，每次的改动可以在[近期更新](/release/)和 GitHub Releases 中查看。

## 安全设计 {#design}

- Manifest V3：浏览器不允许 Manifest V3 扩展下载并运行远程代码，Lumno 的全部代码都包含在经过审核的安装包中。
- 没有服务器：没有账号系统，也没有任何存放你数据的地方。
- 只申请必要的权限，不申请可选权限。
- WebDAV 的应用密码只保存在本机，不会通过浏览器同步。

## 权限用途 {#permissions}

| 权限 | 用途 |
| --- | --- |
| `tabs`、`tabGroups` | 搜索、切换和恢复标签页，截取切换器中的预览 |
| `history` | 在本机搜索历史记录 |
| `bookmarks` | 搜索、显示和管理书签 |
| `topSites` | 在新标签页显示常用网站 |
| `storage`、`unlimitedStorage` | 保存设置、图标和壁纸 |
| `alarms` | 定期检查 WebDAV 同步状态 |
| `search` | 把搜索内容交给浏览器默认的搜索引擎 |
| `favicon` | 显示网站图标 |
| `scripting` 与所有网站的访问权限 | 在网页上显示命令栏、响应快捷键，以及实现划词操作和画中画 |

访问所有网站的权限仅用于在网页上显示命令栏等功能。Lumno 不会批量读取或上传网页内容。
