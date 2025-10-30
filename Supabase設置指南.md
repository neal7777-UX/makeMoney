# 🚀 Supabase 設置指南

本指南將教您如何設置 Supabase 數據庫來存儲記帳數據。

---

## 📋 步驟 1：創建 Supabase 帳號

1. 訪問 [Supabase.com](https://supabase.com/)
2. 點擊「Start your project」
3. 使用 GitHub 帳號登入（推薦）或註冊新帳號

---

## 🏗️ 步驟 2：創建新專案

1. 登入後，點擊「New Project」
2. 填寫專案資訊：
   - **Name**: `finance-tracker`（或您喜歡的名字）
   - **Database Password**: 設置一個強密碼（請記住！）
   - **Region**: 選擇 `Northeast Asia (Tokyo)` 或最近的區域
   - **Pricing Plan**: 選擇 **Free**（免費版足夠使用）
3. 點擊「Create new project」
4. 等待 1-2 分鐘，專案創建完成

---

## 🗄️ 步驟 3：創建數據表

### 3.1 創建 expenses 表（支出記錄）

1. 在左側菜單選擇「Table Editor」
2. 點擊「Create a new table」
3. 設置表格：
   - **Name**: `expenses`
   - **Description**: `日常支出記錄`
   - 勾選「Enable Row Level Security (RLS)」

4. 添加以下列（Columns）：

| Name | Type | Default Value | Primary | Required |
|------|------|---------------|---------|----------|
| id | uuid | gen_random_uuid() | ✅ | ✅ |
| created_at | timestamptz | now() | | ✅ |
| user_id | uuid | auth.uid() | | ✅ |
| date | date | | | ✅ |
| amount | numeric | | | ✅ |
| category | text | | | ✅ |
| description | text | | | |

5. 點擊「Save」

### 3.2 創建 installments 表（分期計畫）

1. 再次點擊「Create a new table」
2. 設置表格：
   - **Name**: `installments`
   - **Description**: `信用卡分期計畫`
   - 勾選「Enable Row Level Security (RLS)」

3. 添加以下列：

| Name | Type | Default Value | Primary | Required |
|------|------|---------------|---------|----------|
| id | uuid | gen_random_uuid() | ✅ | ✅ |
| created_at | timestamptz | now() | | ✅ |
| user_id | uuid | auth.uid() | | ✅ |
| total_amount | numeric | | | ✅ |
| periods | integer | | | ✅ |
| start_month | text | | | ✅ |
| category | text | | | ✅ |
| description | text | | | |
| monthly_payment | numeric | | | ✅ |

4. 點擊「Save」

### 3.3 創建 assets 表（總資產）

1. 再次點擊「Create a new table」
2. 設置表格：
   - **Name**: `assets`
   - **Description**: `總資產記錄`
   - 勾選「Enable Row Level Security (RLS)」

3. 添加以下列：

| Name | Type | Default Value | Primary | Required |
|------|------|---------------|---------|----------|
| id | uuid | gen_random_uuid() | ✅ | ✅ |
| created_at | timestamptz | now() | | ✅ |
| updated_at | timestamptz | now() | | ✅ |
| user_id | uuid | auth.uid() | | ✅ |
| total_assets | numeric | 0 | | ✅ |

4. 點擊「Save」

---

## 🔐 步驟 4：設置 Row Level Security (RLS) 策略

### 4.1 expenses 表策略

1. 在 Table Editor 中，選擇 `expenses` 表
2. 點擊右上角的「...」→「View policies」
3. 點擊「New Policy」
4. 選擇「Create a policy from scratch」
5. 創建以下策略：

**SELECT 策略（讀取）：**
```sql
Policy name: Users can view their own expenses
Target roles: authenticated
USING expression:
auth.uid() = user_id
```

**INSERT 策略（新增）：**
```sql
Policy name: Users can insert their own expenses
Target roles: authenticated
WITH CHECK expression:
auth.uid() = user_id
```

**UPDATE 策略（更新）：**
```sql
Policy name: Users can update their own expenses
Target roles: authenticated
USING expression:
auth.uid() = user_id
```

**DELETE 策略（刪除）：**
```sql
Policy name: Users can delete their own expenses
Target roles: authenticated
USING expression:
auth.uid() = user_id
```

### 4.2 installments 表策略

重複上述步驟，為 `installments` 表創建相同的策略（只需將 `expenses` 改為 `installments`）。

### 4.3 assets 表策略

重複上述步驟，為 `assets` 表創建相同的策略。

---

## 🔑 步驟 5：啟用匿名登入

1. 在左側菜單選擇「Authentication」
2. 點擊「Providers」標籤
3. 找到「Email」並點擊
4. 向下滾動找到「Enable anonymous sign-ins」
5. 勾選啟用
6. 點擊「Save」

---

## 📝 步驟 6：獲取 API 憑證

1. 在左側菜單選擇「Project Settings」（齒輪圖標）
2. 選擇「API」標籤
3. 複製以下資訊：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 💻 步驟 7：配置應用程式

將獲取的憑證填入 `index-supabase.html` 文件中：

```javascript
// 在文件開頭找到這兩行，替換成您的實際值
const SUPABASE_URL = 'https://xxxxx.supabase.co';  // 替換成您的 Project URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // 替換成您的 anon key
```

---

## ✅ 步驟 8：測試應用程式

1. 打開 `index-supabase.html`
2. 嘗試新增一筆支出
3. 重新整理頁面，確認數據仍然存在
4. 在 Supabase Dashboard 的 Table Editor 中查看數據

---

## 📊 SQL 快速設置（高級用戶）

如果您熟悉 SQL，可以直接執行以下腳本快速創建所有表：

```sql
-- 創建 expenses 表
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_id UUID REFERENCES auth.users DEFAULT auth.uid() NOT NULL,
  date DATE NOT NULL,
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  description TEXT
);

-- 創建 installments 表
CREATE TABLE installments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_id UUID REFERENCES auth.users DEFAULT auth.uid() NOT NULL,
  total_amount NUMERIC NOT NULL,
  periods INTEGER NOT NULL,
  start_month TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  monthly_payment NUMERIC NOT NULL
);

-- 創建 assets 表
CREATE TABLE assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_id UUID REFERENCES auth.users DEFAULT auth.uid() NOT NULL,
  total_assets NUMERIC DEFAULT 0 NOT NULL
);

-- 啟用 RLS
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- 創建策略
CREATE POLICY "Users can CRUD their own expenses" ON expenses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD their own installments" ON installments
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD their own assets" ON assets
  FOR ALL USING (auth.uid() = user_id);
```

在 SQL Editor 中執行（左側菜單 → SQL Editor → New query）

---

## 🎉 完成！

您的 Supabase 數據庫已設置完成！現在可以使用雲端存儲功能了。

### 優勢：
- ✅ 數據雲端備份
- ✅ 多設備同步
- ✅ 更安全的數據管理
- ✅ 免費版提供 500MB 數據庫空間
- ✅ 每月 2GB 數據傳輸

### 免費版限制：
- 500MB 數據庫空間（足夠記帳使用）
- 每月 2GB 數據傳輸
- 專案暫停政策：7 天未使用會暫停（再次訪問自動恢復）

---

## ❓ 常見問題

### Q1: 忘記數據庫密碼怎麼辦？
A: 在 Project Settings → Database 中可以重置密碼。

### Q2: 如何查看數據？
A: 在 Table Editor 中可以直接查看和編輯數據。

### Q3: 如何導出數據？
A: 在 Table Editor 中選擇表格，點擊「...」→「Export」。

### Q4: 免費版夠用嗎？
A: 對於個人記帳完全夠用！除非您有數百萬筆交易記錄。

---

需要幫助？查看 [Supabase 官方文檔](https://supabase.com/docs)

