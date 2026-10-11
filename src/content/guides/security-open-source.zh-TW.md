Lumno 的所有程式碼都是公開的，擴充功能做了什麼、沒做什麼，任何人都可以查看。

## 開源 {#open-source}

- 原始碼：[github.com/kubai087/lumno-extension](https://github.com/kubai087/lumno-extension)
- 授權：GPL-3.0
- 回報問題：歡迎在 GitHub 提交 Issue

商店中的每個版本都由同一份原始碼打包，每次的修改可以在[近期更新](/zh-tw/release/)和 GitHub Releases 中查看。

## 安全設計 {#design}

- Manifest V3：瀏覽器不允許 Manifest V3 擴充功能下載並執行遠端程式碼，Lumno 的所有程式碼都包含在經過審核的安裝套件中。
- 沒有伺服器：沒有帳號系統，也沒有任何存放你資料的地方。
- WebDAV 的應用程式密碼只保存在本機，不會透過瀏覽器同步。

## 權限 {#permissions}

Lumno 只申請必要的權限，不申請選用權限。存取所有網站的權限僅用於在網頁上顯示命令列等功能。Lumno 不會大量讀取或上傳網頁內容。

每項權限的具體用途請見[隱私權政策](/zh-tw/privacy/#permissions)。
