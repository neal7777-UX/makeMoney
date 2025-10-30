# 產品需求文檔 (PRD) - 休閒風個人記帳本

## 1. 概覽 (Overview)

### 項目描述

**產品名稱**  
休閒風個人記帳本 (Casual Finance Tracker)

**目標**  
提供一個視覺舒適、易於操作的網頁介面，用於記錄日常開支，並自動計算信用卡分期攤提，同時追蹤總資產。

**技術棧**  
- HTML
- JavaScript (ES Module)
- Tailwind CSS (用於樣式)
- Firebase Firestore (用於數據持久化)

**預期交付物**  
一個可獨立運行的單一 `index.html` 檔案。

---

## 2. 目標用戶 (Target Audience)

- 需要簡單、視覺化介面來追蹤個人或家庭財務的人士
- 需要追蹤複雜分期付款計畫的用戶

---

## 3. 功能需求 (Functional Requirements)

### 3.1. 視覺與介面設計 (UI/UX Design)

**風格 (Style)**  
採用休閒舒適風格 (Casual/Relaxed Theme)，使用柔和的色調（如藍綠色系）和較大的圓角設計。

**背景**  
網頁背景應使用輕微的紋理或柔和的顏色組合，以營造休閒氛圍。

**佈局**  
採用響應式三欄或兩欄佈局（響應式設計），區分「資產總覽」與「操作/紀錄」。

---

### 3.2. 核心功能：每日花費記錄 (Daily Expense Tracking)

**輸入欄位**
- 日期
- 金額
- 類別（下拉選單）
- 項目描述（自由輸入）

**類別**  
必須包含至少：
- 餐飲
- 交通
- 娛樂
- 購物
- 其他

**儲存**  
數據需即時寫入 Firestore 的 `expenses` 集合。

---

### 3.3. 進階功能：信用卡分期追蹤 (Credit Card Installment Tracking)

> 這是本應用程式的關鍵功能。

**輸入欄位 (新增計畫時)**
- 總額 (Total Amount)
- 總期數 (Total Periods)
- 分期開始月份 (YYYY-MM) (用於計算攤提起始點)
- 類別 (Category) (新增要求，與日常花費類別對應)
- 項目描述 (Item Description)

**自動計算**  
程式需根據「總額」、「期數」和「開始月份」，自動計算出每月應攤還的固定金額。

**月度攤提**  
在當前月份的支出計算中，如果該月在分期計畫的支付期間內（例如，從 2025/10 開始分 12 期，則 2025/10 到 2026/9 都需計入當月支出），則自動將每月攤還金額計入「本月支出預覽」的分期攤提總額中。

**紀錄顯示**  
分期攤提的金額需在「近期交易紀錄」中顯示為一筆獨立的分期支付項目。

**儲存**  
每個分期計畫存為一筆獨立文件於 Firestore 的 `installments` 集合。

---

### 3.4. 總資產追蹤 (Total Asset Tracking)

**顯示**  
獨立顯示當前總資產金額（貨幣格式化）。

**更新**  
提供一個輸入欄位和按鈕，讓用戶可以手動輸入並覆蓋更新總資產的數值。

**儲存**  
總資產儲存在 Firestore 中一個固定的 `assets` 文件內。

---

### 3.5. 數據持久化與即時性

- 所有資料（資產、支出、分期）必須使用 **Firebase Firestore** 儲存
- 必須使用 Firestore 的 `onSnapshot` (即時監聽) 來載入和更新所有數據（資產、月度總覽、交易清單），確保資料的即時性

---

## 4. 非功能需求 (Non-Functional Requirements)

**性能**  
由於是單頁面應用 (SPA)，響應時間應迅速。數據讀取主要依賴網路延遲。

**部署**  
最終產物為單一 `index.html` 檔案，易於部署至任何靜態網站伺服器。

**安全性**  
使用 Firebase 認證機制（匿名登入/Custom Token）來確保數據路徑的隔離（使用 `artifacts/{appId}/users/{userId}/...` 的結構）。

---

## 5. 數據結構 (Data Structure)

### Firestore 集合結構

```
artifacts/{appId}/users/{userId}/
  ├── expenses/          # 每日支出記錄
  ├── installments/      # 信用卡分期計畫
  └── assets/            # 總資產記錄
```

### Expenses 文件結構
```javascript
{
  date: "YYYY-MM-DD",
  amount: Number,
  category: String,
  description: String,
  timestamp: Timestamp
}
```

### Installments 文件結構
```javascript
{
  totalAmount: Number,
  periods: Number,
  startMonth: "YYYY-MM",
  category: String,
  description: String,
  monthlyPayment: Number,  // 自動計算
  timestamp: Timestamp
}
```

### Assets 文件結構
```javascript
{
  totalAssets: Number,
  lastUpdated: Timestamp
}
```

---

## 6. 使用者介面組件 (UI Components)

### 主要區塊
1. **資產總覽區**
   - 總資產顯示
   - 總資產更新輸入框和按鈕

2. **本月支出預覽區**
   - 本月一般支出總額
   - 本月分期攤提總額
   - 本月總支出

3. **操作區**
   - 新增日常支出表單
   - 新增分期計畫表單

4. **交易紀錄區**
   - 近期交易清單（包含一般支出和分期攤提項目）
   - 支援篩選和排序

---

## 7. 開發優先級 (Development Priorities)

### P0 (必須實現)
- Firebase Firestore 連接與認證
- 每日花費記錄功能
- 信用卡分期追蹤與自動攤提計算
- 總資產追蹤
- 即時數據同步

### P1 (重要)
- 響應式設計
- 休閒風視覺設計
- 數據驗證和錯誤處理

### P2 (可選)
- 數據導出功能
- 圖表視覺化
- 多用戶支援

