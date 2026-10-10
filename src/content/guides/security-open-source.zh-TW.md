Lumno 的每一行程式碼都是公開的，擴充功能做了什麼、沒做什麼，任何人都看得到。

## 開源 {#open-source}

- 原始碼：[github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- 授權：GPL-3.0
- 發現問題：歡迎在 GitHub 提 Issue

商店裡的每個版本都由同一份原始碼打包，改了什麼可以在[近期更新](/zh-tw/release/)和 GitHub Releases 裡查到。

## 安全設計 {#design}

- Manifest V3：瀏覽器不允許 Manifest V3 擴充功能下載並執行遠端程式碼，Lumno 的所有程式碼都在審核過的安裝套件裡。
- 沒有伺服器：沒有帳號系統，也沒有任何存放你資料的地方。
- 只申請需要的權限，不申請選用權限。
- WebDAV 的應用程式密碼只存在本機，不會跟著瀏覽器同步出去。

## 每項權限用來做什麼 {#permissions}

| 權限 | 用途 |
| --- | --- |
| `tabs`、`tabGroups` | 搜尋、切換和還原分頁，擷取切換器裡的預覽 |
| `history` | 在本機搜尋瀏覽紀錄 |
| `bookmarks` | 搜尋、顯示和管理書籤 |
| `topSites` | 在新分頁顯示常用網站 |
| `storage`、`unlimitedStorage` | 儲存設定、圖示和桌布 |
| `alarms` | 定期檢查 WebDAV 同步狀態 |
| `search` | 把查詢交給瀏覽器預設的搜尋引擎 |
| `favicon` | 顯示網站圖示 |
| `scripting` 與所有網站的存取權限 | 在網頁上顯示命令列、回應快速鍵，以及反白文字操作和子母畫面 |

存取所有網站的權限，只用來在網頁上顯示命令列這些功能。Lumno 不會大量讀取或上傳網頁內容。
