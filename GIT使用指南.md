# 📦 GitHub 上傳指南

本指南將教您如何將「休閒風個人記帳本」專案上傳到 GitHub。

---

## 📋 前置準備

### 1. 安裝 Git
如果還沒有安裝 Git：

**Windows:**
- 下載並安裝 [Git for Windows](https://git-scm.com/download/win)
- 安裝時使用預設選項即可

**驗證安裝:**
```bash
git --version
```

### 2. 配置 Git（首次使用）
```bash
git config --global user.name "您的名字"
git config --global user.email "your.email@example.com"
```

### 3. 創建 GitHub 帳號
如果還沒有 GitHub 帳號：
- 訪問 [GitHub.com](https://github.com/)
- 點擊「Sign up」註冊帳號

---

## 🚀 上傳到 GitHub 的步驟

### 步驟 1：在 GitHub 上創建新倉庫

1. 登入 GitHub
2. 點擊右上角的 ➕ 圖標
3. 選擇「New repository」
4. 填寫倉庫資訊：
   - **Repository name**: `finance-tracker`（或您喜歡的名字）
   - **Description**: `休閒風個人記帳本 - 簡單美觀的財務管理工具`
   - **Public** 或 **Private**（建議選 Public）
   - ⚠️ **不要**勾選「Add a README file」（我們已經有了）
   - ⚠️ **不要**選擇 .gitignore 或 license（我們已經創建了）
5. 點擊「Create repository」

### 步驟 2：在本地初始化 Git

打開終端機（Terminal）或命令提示字元（CMD），導航到您的專案資料夾：

```bash
# 進入專案目錄
cd "D:\AI學習庫\記帳軟體"
```

初始化 Git 倉庫：

```bash
# 初始化 Git
git init

# 查看檔案狀態
git status
```

### 步驟 3：添加檔案到 Git

```bash
# 添加所有檔案
git add .

# 或者分別添加檔案
git add index-local.html
git add README.md
git add PRD.md
git add 使用說明.md
git add .gitignore
git add LICENSE

# 查看已添加的檔案
git status
```

### 步驟 4：提交變更

```bash
# 第一次提交
git commit -m "🎉 初始提交：休閒風個人記帳本 v1.0.0"
```

### 步驟 5：連接到 GitHub 遠端倉庫

將 `YOUR-USERNAME` 和 `YOUR-REPO-NAME` 替換為您的實際資訊：

```bash
# 添加遠端倉庫
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# 查看遠端倉庫
git remote -v
```

**範例:**
```bash
git remote add origin https://github.com/johndoe/finance-tracker.git
```

### 步驟 6：推送到 GitHub

```bash
# 推送到主分支
git branch -M main
git push -u origin main
```

如果要求輸入帳號密碼：
- **Username**: 您的 GitHub 用戶名
- **Password**: 使用 Personal Access Token（不是密碼）

---

## 🔑 創建 Personal Access Token（如需要）

如果 Git 要求輸入密碼，您需要創建一個 Personal Access Token：

1. 登入 GitHub
2. 點擊右上角頭像 → **Settings**
3. 左側選單最下方 → **Developer settings**
4. 左側選單 → **Personal access tokens** → **Tokens (classic)**
5. 點擊「Generate new token」→「Generate new token (classic)」
6. 填寫資訊：
   - **Note**: `Git 操作 Token`
   - **Expiration**: 選擇過期時間（建議 90 days）
   - **Scopes**: 勾選 `repo`（完整倉庫訪問權限）
7. 點擊「Generate token」
8. ⚠️ **立即複製 Token**（只顯示一次！）
9. 在 Git 推送時，使用此 Token 作為密碼

---

## ✅ 驗證上傳成功

1. 打開瀏覽器
2. 訪問您的 GitHub 倉庫頁面
3. 確認所有檔案都已上傳
4. 查看 README.md 是否正確顯示

---

## 📝 後續更新

當您修改程式碼後，使用以下命令更新到 GitHub：

```bash
# 1. 查看變更
git status

# 2. 添加變更的檔案
git add .

# 3. 提交變更
git commit -m "✨ 描述您的變更內容"

# 4. 推送到 GitHub
git push
```

### 提交訊息範例：
```bash
git commit -m "✨ 新增：支出類型統計圓餅圖"
git commit -m "🐛 修復：分期計畫顯示問題"
git commit -m "📝 更新：README 文檔"
git commit -m "🎨 優化：介面樣式調整"
git commit -m "♻️ 重構：數據處理邏輯"
```

---

## 🌟 進階：使用 GitHub Desktop（推薦新手）

如果不熟悉命令列，可以使用 GitHub Desktop：

1. 下載 [GitHub Desktop](https://desktop.github.com/)
2. 安裝並登入 GitHub 帳號
3. 選擇「Add Local Repository」
4. 選擇您的專案資料夾
5. 使用圖形介面進行提交和推送

---

## 📖 常用 Git 命令

```bash
# 查看狀態
git status

# 查看提交歷史
git log --oneline

# 查看遠端倉庫
git remote -v

# 拉取最新變更
git pull

# 查看分支
git branch

# 創建新分支
git checkout -b feature/new-feature

# 切換分支
git checkout main

# 合併分支
git merge feature/new-feature
```

---

## ❓ 常見問題

### Q1: 推送時提示 "Authentication failed"
**A:** 使用 Personal Access Token 而不是密碼。

### Q2: 推送時提示 "remote: Permission denied"
**A:** 檢查遠端倉庫 URL 是否正確，確認您有權限推送。

### Q3: 不小心提交了敏感資訊怎麼辦？
**A:** 
```bash
# 從 Git 歷史中移除檔案
git rm --cached 敏感檔案.txt
git commit -m "🔒 移除敏感資訊"
git push
```

### Q4: 如何忽略某些檔案？
**A:** 編輯 `.gitignore` 檔案，添加要忽略的檔案或資料夾。

### Q5: 想重新開始怎麼辦？
**A:** 
```bash
# 刪除 .git 資料夾
rm -rf .git

# 重新初始化
git init
```

---

## 🎓 學習資源

- [Git 官方文檔](https://git-scm.com/doc)
- [GitHub 指南](https://guides.github.com/)
- [Git 教學（中文）](https://gitbook.tw/)
- [互動式 Git 學習](https://learngitbranching.js.org/?locale=zh_TW)

---

## 📞 需要幫助？

如果遇到問題：
1. 閱讀錯誤訊息
2. 搜尋錯誤訊息（Google / Stack Overflow）
3. 查看 Git 文檔
4. 在專案 Issues 中提問

---

**祝您上傳順利！** 🎉

如果成功上傳，不要忘記：
- ⭐ 給自己的專案一個星星
- 📝 完善 README 文檔
- 🔗 分享給朋友

