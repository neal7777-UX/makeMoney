# 💰 休閒風個人記帳本 (Casual Finance Tracker)

一個簡單、美觀、易用的個人財務管理工具，採用休閒舒適的視覺設計風格。

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ 功能特色

### 📊 核心功能
- **總資產管理**：追蹤您的總資產變化
- **日常支出記錄**：快速記錄每日花費
- **信用卡分期追蹤**：自動計算分期攤提金額
- **本月支出預覽**：即時查看本月財務狀況
- **交易紀錄清單**：完整的歷史交易記錄
- **支出類型統計**：圓餅圖視覺化展示各類別支出占比

### 🎨 設計特點
- 🌊 休閒舒適的藍綠色系配色
- 🔄 響應式設計，支援手機、平板、桌面
- ✨ 玻璃擬態效果卡片設計
- 🎯 直覺的用戶介面
- 📱 單一 HTML 檔案，易於部署

### 💾 數據管理
- 使用瀏覽器 `localStorage` 本地存儲
- 數據持久化，關閉瀏覽器後不會丟失
- 無需伺服器，完全在本地運行
- 隱私安全，數據不上傳

## 🚀 快速開始

### 方式 1：直接使用
1. 下載 `index-local.html` 檔案
2. 用瀏覽器直接開啟（雙擊檔案）
3. 開始記帳！

### 方式 2：使用 Live Server（推薦開發時使用）
1. 安裝 VS Code 的 Live Server 擴展
2. 右鍵點擊 `index-local.html`
3. 選擇 "Open with Live Server"

### 方式 3：部署到網站
將 `index-local.html` 上傳到任何靜態網站託管服務：
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## 📖 使用說明

### 1. 設置總資產
在「總資產」卡片中輸入您當前的資產總額，點擊「更新總資產」。

### 2. 記錄日常支出
- 點擊「📝 新增日常支出」標籤
- 填寫日期、金額、類別、描述
- 點擊「新增支出」
- ✅ 自動從總資產扣除

### 3. 新增分期計畫
- 點擊「💳 新增分期計畫」標籤
- 填寫總額、期數、開始月份、類別、描述
- 點擊「新增分期計畫」
- ✅ 自動計算每月攤還金額
- ✅ 自動從總資產扣除總額

### 4. 查看統計
- **本月支出預覽**：查看本月一般支出和分期攤提
- **支出類型統計**：圓餅圖顯示各類別支出占比
- **近期交易紀錄**：查看最近 30 筆交易

## 🛠️ 技術棧

- **HTML5**：結構
- **Tailwind CSS**：樣式框架（CDN）
- **Vanilla JavaScript**：業務邏輯
- **Chart.js**：圓餅圖視覺化
- **localStorage**：本地數據存儲

## 📂 檔案結構

```
記帳軟體/
├── index-local.html      # 主要應用程式（本地版）
├── index.html            # Firebase 版本（需配置）
├── PRD.md                # 產品需求文檔
├── 使用說明.md           # 詳細使用說明
├── README.md             # 專案說明（本檔案）
└── .gitignore            # Git 忽略清單
```

## 💡 功能演示

### 測試範例
1. **設置總資產**：$100,000
2. **新增支出**：餐飲 $650
   - 總資產變為 $99,350
3. **新增分期**：購物 $12,000（分 12 期）
   - 總資產變為 $87,350
   - 本月分期攤提顯示 $1,000
4. **查看統計**：圓餅圖顯示各類別占比

## 🔧 數據管理

### 清除所有數據
在瀏覽器開發者工具控制台（F12）中執行：
```javascript
localStorage.clear();
```
然後重新整理頁面。

### 匯出數據
```javascript
// 複製所有數據到剪貼簿
const data = {
  expenses: localStorage.getItem('expenses'),
  installments: localStorage.getItem('installments'),
  totalAssets: localStorage.getItem('totalAssets')
};
console.log(JSON.stringify(data));
```

### 匯入數據
```javascript
// 從備份還原數據
const data = { /* 貼上備份的數據 */ };
localStorage.setItem('expenses', data.expenses);
localStorage.setItem('installments', data.installments);
localStorage.setItem('totalAssets', data.totalAssets);
location.reload();
```

## 🎯 開發計畫

### v1.0.0（當前版本）✅
- [x] 總資產管理
- [x] 日常支出記錄
- [x] 信用卡分期追蹤
- [x] 本月支出預覽
- [x] 交易紀錄清單
- [x] 支出類型統計圓餅圖
- [x] 自動扣除總資產

### v1.1.0（計畫中）
- [ ] 數據匯出/匯入功能
- [ ] 月度統計報表
- [ ] 預算設定與提醒
- [ ] 多幣別支援
- [ ] 深色模式

### v2.0.0（未來版本）
- [ ] 多裝置同步（Firebase）
- [ ] 收入記錄功能
- [ ] 投資組合追蹤
- [ ] 財務目標設定
- [ ] AI 智能分析

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

### 貢獻指南
1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📝 授權條款

本專案採用 [MIT License](LICENSE) 授權。

## 👨‍💻 作者

- **開發者**：您的名字
- **開發時間**：2025 年 10 月

## 📧 聯絡方式

如有問題或建議，歡迎聯絡：
- GitHub Issues: [提交 Issue](https://github.com/your-username/finance-tracker/issues)
- Email: your.email@example.com

## 🙏 致謝

- [Tailwind CSS](https://tailwindcss.com/) - 美觀的 CSS 框架
- [Chart.js](https://www.chartjs.org/) - 強大的圖表庫
- [Google Fonts](https://fonts.google.com/) - Noto Sans TC 字體

## 📸 截圖預覽

### 主介面
![主介面](screenshots/main-interface.png)

### 支出統計
![支出統計](screenshots/expense-chart.png)

---

⭐ 如果這個專案對您有幫助，請給我們一個星星！

**輕鬆管理，精彩生活** ✨

