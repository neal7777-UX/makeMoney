# 手機 APP 轉換指南 📱

本指南將幫助您將記帳網頁應用轉換為手機 APP。我們提供多種方案，從最簡單到最專業。

---

## 🎯 方案一：PWA (Progressive Web App) - 推薦 ⭐

**最簡單快速的方法，無需額外開發**

### 優點：
- ✅ 無需應用商店審核
- ✅ 跨平台（iOS、Android、桌面）
- ✅ 可以安裝到手機主畫面
- ✅ 支持離線使用
- ✅ 自動更新
- ✅ 零額外成本

### 步驟：

#### 1. 準備應用圖標

您需要準備兩個圖標文件：
- `icon-192.png` - 192x192 像素
- `icon-512.png` - 512x512 像素

**圖標製作工具：**
- 在線工具：https://www.favicon-generator.org/
- 在線工具：https://realfavicongenerator.net/
- Photoshop / Canva / Figma

**圖標設計建議：**
- 使用 💰 或 📊 等記帳相關圖標
- 背景使用品牌色（teal/青色）
- 保持簡潔，辨識度高

#### 2. 部署到 HTTPS 服務器

PWA 必須在 HTTPS 環境下運行（本地 localhost 也可以）。

**推薦部署方案：**
- **GitHub Pages**（已配置）- 免費 HTTPS
- **Netlify** - 免費 HTTPS，自動部署
- **Vercel** - 免費 HTTPS，自動部署
- **Firebase Hosting** - 免費 HTTPS

#### 3. 上傳文件

確保以下文件在同一目錄：
```
/
├── index-supabase.html
├── manifest.json
├── service-worker.js
├── icon-192.png
└── icon-512.png
```

#### 4. 安裝到手機

**Android（Chrome）：**
1. 打開 Chrome 瀏覽器
2. 訪問您的網站
3. 點擊右上角「⋯」選單
4. 選擇「安裝應用程式」或「Add to Home screen」
5. 確認安裝

**iOS（Safari）：**
1. 打開 Safari 瀏覽器
2. 訪問您的網站
3. 點擊底部分享按鈕「□↑」
4. 選擇「加入主畫面」
5. 自訂名稱後確認

**桌面（Chrome/Edge）：**
1. 訪問網站
2. 點擊地址欄右側的「安裝」圖標
3. 確認安裝

---

## 🚀 方案二：Capacitor（原生 APP 包裝）

**將網頁包裝成真正的原生 APP，可以上架應用商店**

### 優點：
- ✅ 可以上架到 App Store / Google Play
- ✅ 訪問原生功能（相機、通知、文件等）
- ✅ 更好的性能體驗
- ✅ 原生 UI 體驗

### 步驟：

#### 1. 安裝 Capacitor

```bash
# 全局安裝 Capacitor CLI
npm install -g @capacitor/cli

# 在項目目錄初始化 Capacitor
cd "D:\AI學習庫\記帳軟體"
npx cap init
```

**填寫信息：**
- App ID: `com.yourname.financeTracker` （例如：`com.example.financeTracker`）
- App Name: `休閒風個人記帳本`
- Web Dir: `./` （當前目錄）

#### 2. 添加平台

```bash
# 添加 iOS 平台（需要 Mac）
npx cap add ios

# 添加 Android 平台（需要 Android Studio）
npx cap add android
```

#### 3. 同步文件

```bash
# 將網頁文件同步到原生項目
npx cap sync
```

#### 4. 配置

編輯 `capacitor.config.json`：
```json
{
  "appId": "com.yourname.financeTracker",
  "appName": "休閒風個人記帳本",
  "webDir": ".",
  "server": {
    "url": "https://your-domain.com",
    "cleartext": false
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#e0f2f1"
    }
  }
}
```

#### 5. 編譯和打包

**Android：**
```bash
# 打開 Android Studio
npx cap open android

# 在 Android Studio 中：
# 1. 等待 Gradle 同步完成
# 2. 點擊 "Build" -> "Build Bundle(s) / APK(s)"
# 3. 選擇 "Build APK(s)"
# 4. 生成的 APK 在 app/build/outputs/apk/
```

**iOS（需要 Mac）：**
```bash
# 打開 Xcode
npx cap open ios

# 在 Xcode 中：
# 1. 選擇目標設備或模擬器
# 2. 點擊 "Run" 按鈕
# 3. 或選擇 "Product" -> "Archive" 生成 IPA
```

#### 6. 上架應用商店

**Google Play Store：**
1. 註冊開發者帳號（一次性費用 $25）
2. 創建應用
3. 上傳 APK/AAB
4. 填寫應用信息
5. 提交審核

**Apple App Store：**
1. 註冊 Apple Developer 帳號（年費 $99）
2. 在 Xcode 中創建 Archive
3. 上傳到 App Store Connect
4. 填寫應用信息
5. 提交審核

---

## 📦 方案三：Cordova / PhoneGap

類似 Capacitor，但較舊的技術。

```bash
# 安裝 Cordova
npm install -g cordova

# 創建項目
cordova create finance-tracker com.example.financeTracker "記帳本"

# 添加平台
cd finance-tracker
cordova platform add android
cordova platform add ios

# 構建
cordova build android
cordova build ios
```

---

## 🎨 圖標生成腳本

創建一個簡單的圖標生成說明：

### 使用在線工具：

1. **RealFaviconGenerator**
   - 訪問：https://realfavicongenerator.net/
   - 上傳您的圖標圖片（建議 1024x1024）
   - 自動生成所有尺寸的圖標
   - 下載並替換項目中的圖標文件

2. **App Icon Generator**
   - 訪問：https://www.appicon.co/
   - 上傳圖標
   - 選擇平台（iOS、Android、PWA）
   - 下載生成的圖標包

### 手動生成：

使用 Photoshop 或任何圖像編輯軟件：
1. 創建 512x512 的圖片
2. 導出為 PNG（透明背景）
3. 使用在線工具縮放為 192x192

---

## 🔧 進階配置

### PWA 更新通知

Service Worker 已經配置了自動更新檢測。當有新版本時，會提示用戶更新。

### 離線功能

當前配置支持：
- ✅ 基本頁面緩存
- ✅ 離線查看已載入的數據
- ⚠️ 新增數據需要聯網（Supabase API）

### 推送通知（可選）

如需要推送通知功能，需要：
1. 配置 Web Push API
2. 在 Supabase 中設置通知服務
3. 請求用戶通知權限

---

## 📋 檢查清單

### PWA 配置檢查：
- [ ] `manifest.json` 文件存在
- [ ] `service-worker.js` 文件存在
- [ ] `icon-192.png` 和 `icon-512.png` 已準備
- [ ] 網站部署在 HTTPS
- [ ] Service Worker 已註冊（檢查瀏覽器控制台）

### 測試步驟：
1. [ ] 在手機瀏覽器訪問網站
2. [ ] 檢查是否有「加入主畫面」提示
3. [ ] 安裝後測試離線功能
4. [ ] 測試所有功能是否正常

---

## 🆘 常見問題

### Q: PWA 安裝後無法離線使用？
A: 檢查 Service Worker 是否正常註冊，確保所有文件路徑正確。

### Q: iOS 無法安裝 PWA？
A: 確保使用 Safari 瀏覽器，iOS 15+ 才完全支持 PWA。

### Q: 圖標不顯示？
A: 檢查圖標文件路徑和格式，確保是 PNG 格式。

### Q: 如何更新已安裝的 PWA？
A: 更新網站後，Service Worker 會自動檢測並提示更新。

### Q: Capacitor 編譯失敗？
A: 
- Android：檢查 Android Studio 和 SDK 是否正確安裝
- iOS：確保在 Mac 上運行，Xcode 已正確配置

---

## 🎯 推薦方案選擇

**如果您的目標是：**

1. **快速上線，個人使用** → 選擇 **PWA**
2. **想要上架應用商店** → 選擇 **Capacitor**
3. **需要原生功能（相機、GPS等）** → 選擇 **Capacitor**
4. **預算有限，免費方案** → 選擇 **PWA**

---

## 📚 相關資源

- **PWA 文檔**：https://web.dev/progressive-web-apps/
- **Capacitor 文檔**：https://capacitorjs.com/docs
- **Google Play 發布指南**：https://support.google.com/googleplay/android-developer
- **Apple App Store 指南**：https://developer.apple.com/app-store/review/

---

## 💡 下一步建議

1. **先試試 PWA** - 最簡單，立即可用
2. **準備圖標** - 使用推薦的在線工具生成
3. **部署到 HTTPS** - 使用 GitHub Pages 或其他服務
4. **測試安裝** - 在手機上測試安裝和功能
5. **考慮上架** - 如果需要，再考慮 Capacitor 方案

---

**祝您轉換順利！如有問題，隨時詢問。** 🚀

