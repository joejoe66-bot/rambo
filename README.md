# RAMBO 網站（GitHub Pages 版）

由 https://dogrambo.blogspot.com 重新製作。16 章文字、圖片、旁述錄音（Narration / 旁述）及影片全部原文照搬，未有改動任何一個字。

## 檔案

```
index.html          首頁 + 目錄（由 build.js 產生）
chapter-1~16.html   每章一頁（由 build.js 產生）
sitemap.xml         網站地圖（由 build.js 產生）
build.js            產生網頁的程式
assets/content.js   全部 16 章內容（文字、圖片、錄音、影片）
assets/media/       旁述錄音和影片
assets/app.js       頁面程式（翻頁、放大相片）
assets/style.css    設計
.nojekyll           讓 GitHub Pages 直接發佈檔案
```

## 放上 GitHub Pages（約 5 分鐘）

1. 登入 https://github.com （沒有帳號就先免費註冊）。
2. 右上角 **+** → **New repository**。
   - Repository name 填：`rambo`（或任何名稱）
   - 選 **Public**
   - 按 **Create repository**
3. 在新 repository 頁面按 **uploading an existing file**。
4. 把解壓後 `rambo-site` 資料夾**裏面**的所有檔案和 `assets` 資料夾一齊拖進去（`index.html` 要在最外層），按 **Commit changes**。
5. 進入 **Settings** → 左邊 **Pages**：
   - Source 選 **Deploy from a branch**
   - Branch 選 **main**、資料夾 **/ (root)** → **Save**
6. 等 1–2 分鐘，網址會在同一頁顯示，例如：
   `https://你的帳號.github.io/rambo/`

## 注意

- 旁述錄音（26 段，`.m4a`）和影片（2 段，`.mp4`）已經下載到 `assets/media/`，由網站自己播放，不再依賴 Blogger。
- 相片目前仍然存放在 Google Blogger 的伺服器上，**請不要刪除原本的 Blogger 網誌**，否則相片會消失。

## 以後要改文字

全部內容都在 `assets/content.js`。改完之後要重新產生網頁：

```
node build.js
```

它會更新 `index.html`、`chapter-1.html` 至 `chapter-16.html` 和 `sitemap.xml`，再把全部檔案上傳即可（也可以叫 Claude 代你做）。

## Google 搜尋

- 每章都是獨立網頁（`chapter-N.html`），有標題和簡介，方便 Google 收錄。
- 網站地圖：https://joejoe66-bot.github.io/rambo/sitemap.xml ，在 Google Search Console 提交。
- Search Console 的驗證碼放在 `google-verification.txt`（只寫 content="…" 裏面那串字），然後執行 `node build.js`。
