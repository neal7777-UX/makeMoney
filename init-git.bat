@echo off
chcp 65001 >nul
echo ====================================
echo   休閒風個人記帳本 - Git 初始化腳本
echo ====================================
echo.

echo [1/5] 初始化 Git 倉庫...
git init
if %errorlevel% neq 0 (
    echo ❌ Git 初始化失敗！請確認已安裝 Git。
    pause
    exit /b 1
)
echo ✅ Git 初始化成功
echo.

echo [2/5] 添加所有檔案...
git add .
if %errorlevel% neq 0 (
    echo ❌ 添加檔案失敗！
    pause
    exit /b 1
)
echo ✅ 檔案添加成功
echo.

echo [3/5] 檢查檔案狀態...
git status
echo.

echo [4/5] 提交變更...
git commit -m "🎉 初始提交：休閒風個人記帳本 v1.0.0"
if %errorlevel% neq 0 (
    echo ❌ 提交失敗！
    pause
    exit /b 1
)
echo ✅ 提交成功
echo.

echo [5/5] 完成本地 Git 設置
echo.
echo ====================================
echo   🎉 本地 Git 設置完成！
echo ====================================
echo.
echo 📝 接下來的步驟：
echo.
echo 1. 在 GitHub 上創建新倉庫：
echo    https://github.com/new
echo.
echo 2. 執行以下指令連接遠端倉庫（替換成您的資訊）：
echo    git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo ====================================
pause

