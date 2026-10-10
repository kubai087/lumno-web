Lumno 的所有程式碼都是公開的，擴充功能做了什麼、沒做什麼，任何人都可以查看。

## 開源 {#open-source}

- 原始碼：[github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- 授權：GPL-3.0
- 回報問題：歡迎在 GitHub 提交 Issue

商店中的每個版本都由同一份原始碼打包，每次的修改可以在[近期更新](/zh-tw/release/)和 GitHub Releases 中查看。

## 安全設計 {#design}

- Manifest V3：瀏覽器不允許 Manifest V3 擴充功能下載並執行遠端程式碼，Lumno 的所有程式碼都包含在經過審核的安裝套件中。
- 沒有伺服器：沒有帳號系統，也沒有任何存放你資料的地方。
- 只申請必要的權限，不申請選用權限。
- WebDAV 的應用程式密碼只保存在本機，不會透過瀏覽器同步。

## 權限用途 {#permissions}

| 權限 | 用途 |
| --- | --- |
| `tabs`、`tabGroups` | 搜尋、切換和還原分頁，擷取切換器中的預覽 |
| `history` | 在本機搜尋瀏覽紀錄 |
| `bookmarks` | 搜尋、顯示和管理書籤 |
| `topSites` | 在新分頁顯示常用網站 |
| `storage`、`unlimitedStorage` | 儲存設定、圖示和桌布 |
| `alarms` | 定期檢查 WebDAV 同步狀態 |
| `search` | 把搜尋內容交給瀏覽器預設的搜尋引擎 |
| `favicon` | 顯示網站圖示 |
| `scripting` 與所有網站的存取權限 | 在網頁上顯示命令列、回應快速鍵，以及提供反白文字操作和子母畫面 |

存取所有網站的權限僅用於在網頁上顯示命令列等功能。Lumno 不會大量讀取或上傳網頁內容。
