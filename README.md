# RAMBO 網站（GitHub Pages 版）

由 https://dogrambo.blogspot.com 重新製作。16 章文字、圖片、旁述錄音（Narration / 旁述）及影片全部原文照搬，未有改動任何一個字。

## 檔案

```
index.html          網站主頁
assets/content.js   全部 16 章內容（文字、圖片、錄音、影片）
assets/app.js       頁面程式（目錄、翻頁、放大相片）
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

- 圖片、錄音和影片目前仍然存放在 Google Blogger 的伺服器上（新網站直接播放它們）。
  **請不要刪除原本的 Blogger 網誌**，否則圖片和影音會消失。
- 如想完全獨立，可以把原檔下載後放入 `assets/media/`，再修改 `content.js` 的網址。

## 以後要改文字

全部內容都在 `assets/content.js`，用任何文字編輯器打開，直接修改引號內的文字即可。
