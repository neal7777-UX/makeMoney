# 🔐 Google 登入配置指南

本指南將教您如何在 Supabase 中配置 Google OAuth 登入功能。

---

## 📋 配置步驟

### 1️⃣ 啟用 Email 登入（郵箱密碼登入）

#### 在 Supabase Dashboard 中：

1. 訪問您的 Supabase 專案：
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT_ID
   ```

2. 在左側菜單點擊 **「Authentication」**

3. 點擊 **「Providers」** 標籤

4. 找到 **「Email」** provider

5. 確保已啟用：
   - ✅ **Enable Email provider**
   - ✅ **Confirm email**（可選，如果希望用戶驗證郵箱）

6. 點擊 **「Save」**

---

### 2️⃣ 啟用 Google 登入

#### 步驟 A：在 Supabase Dashboard 中獲取回調 URL

1. 在 **Authentication** → **Providers** 中

2. 找到 **「Google」** provider

3. 複製 **「Callback URL (for OAuth)」**，格式類似：
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

#### 步驟 B：在 Google Cloud Console 創建 OAuth 憑證

1. 訪問 [Google Cloud Console](https://console.cloud.google.com/)

2. 創建新專案或選擇現有專案

3. 在左側菜單點擊 **「APIs & Services」** → **「Credentials」**

4. 點擊 **「+ CREATE CREDENTIALS」** → **「OAuth client ID」**

5. 如果是第一次，需要先配置 **「OAuth consent screen」**：
   - User Type: 選擇 **「External」**
   - App name: `休閒風個人記帳本`
   - User support email: 您的郵箱
   - Developer contact email: 您的郵箱
   - 點擊 **「SAVE AND CONTINUE」**
   - Scopes: 不需要添加，直接 **「SAVE AND CONTINUE」**
   - Test users: 可以添加測試用戶（可選）
   - 點擊 **「BACK TO DASHBOARD」**

6. 返回 **「Credentials」** 頁面

7. 再次點擊 **「+ CREATE CREDENTIALS」** → **「OAuth client ID」**

8. 配置 OAuth client：
   - Application type: **「Web application」**
   - Name: `休閒風個人記帳本`
   
   - **Authorized JavaScript origins**（添加以下兩個）:
     ```
     https://YOUR_PROJECT_ID.supabase.co
     http://localhost:8080
     ```
     ⚠️ 如果使用 GitHub Pages，也要添加：
     ```
     https://YOUR_USERNAME.github.io
     ```
   
   - **Authorized redirect URIs**（添加 Supabase 回調 URL）:
     ```
     https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
     ```

9. 點擊 **「CREATE」**

10. 複製生成的：
    - **Client ID**
    - **Client Secret**

#### 步驟 C：在 Supabase 中配置 Google Provider

1. 返回 Supabase Dashboard

2. **Authentication** → **Providers** → **「Google」**

3. 啟用 Google provider：
   - ✅ **Enable Google provider**

4. 填入從 Google Cloud Console 獲取的：
   - **Client ID (for OAuth)**: 貼上您的 Client ID
   - **Client Secret (for OAuth)**: 貼上您的 Client Secret

5. 可選配置：
   - **Skip nonce check**: 通常不需要勾選
   - **Allowed Client IDs**: 留空即可

6. 點擊 **「Save」**

---

## 🧪 測試登入功能

### 測試郵箱登入

1. 打開應用程式

2. 點擊 **「註冊」** 標籤

3. 輸入測試郵箱和密碼（至少 6 個字符）

4. 點擊 **「註冊」**

5. 檢查郵箱（如果啟用了郵箱驗證）

6. 返回應用，用剛註冊的郵箱登入

### 測試 Google 登入

1. 打開應用程式

2. 點擊 **「使用 Google 帳號登入」** 按鈕

3. 會跳轉到 Google 登入頁面

4. 選擇您的 Google 帳號

5. 授權後會自動跳回應用程式

6. 登入成功！

---

## 🔒 更新數據庫安全策略（重要！）

由於現在使用真實用戶認證（不再是匿名用戶），需要更新 Row Level Security (RLS) 策略。

### 在 Supabase SQL Editor 中執行：

```sql
-- ============================================
-- 更新 RLS 策略以支持真實用戶
-- ============================================

-- 1. 刪除舊的策略（如果存在）
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.expenses;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.installments;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON public.assets;

-- 2. 為 expenses 表創建新策略
CREATE POLICY "Users can view their own expenses"
ON public.expenses FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own expenses"
ON public.expenses FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses"
ON public.expenses FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses"
ON public.expenses FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 3. 為 installments 表創建新策略
CREATE POLICY "Users can view their own installments"
ON public.installments FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own installments"
ON public.installments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own installments"
ON public.installments FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own installments"
ON public.installments FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 4. 為 assets 表創建新策略
CREATE POLICY "Users can view their own assets"
ON public.assets FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assets"
ON public.assets FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assets"
ON public.assets FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assets"
ON public.assets FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
```

---

## ⚙️ 可選配置

### 1. 禁用郵箱驗證（開發階段）

如果想要快速測試，可以暫時禁用郵箱驗證：

1. **Authentication** → **Settings** → **Auth Settings**

2. 找到 **「Enable email confirmations」**

3. ❌ 取消勾選

4. 點擊 **「Save」**

⚠️ **生產環境建議啟用郵箱驗證以提高安全性！**

### 2. 配置郵件模板

1. **Authentication** → **Email Templates**

2. 可以自定義：
   - Confirm signup（註冊確認）
   - Invite user（邀請用戶）
   - Magic Link（魔法鏈接）
   - Reset password（重置密碼）

3. 修改模板內容，添加您的品牌元素

### 3. 設置 Site URL

1. **Authentication** → **URL Configuration**

2. 設置 **「Site URL」**：
   ```
   https://YOUR_USERNAME.github.io/makeMoney/index-supabase.html
   ```
   或本地測試：
   ```
   http://localhost:8080
   ```

3. 設置 **「Redirect URLs」**（允許的重定向 URL）:
   ```
   https://YOUR_USERNAME.github.io/makeMoney/**
   http://localhost:8080/**
   ```

---

## 🚨 常見問題

### Q1: Google 登入後顯示 "redirect_uri_mismatch" 錯誤

**A:** 檢查：
1. Google Cloud Console 中的 **Authorized redirect URIs** 是否正確
2. 確保包含完整的 Supabase 回調 URL
3. 確保 URL 格式正確（https://）

### Q2: 註冊後無法登入

**A:** 檢查：
1. 是否啟用了郵箱驗證？檢查郵箱是否有驗證郵件
2. Supabase Dashboard → **Authentication** → **Users** 查看用戶狀態
3. 確認 RLS 策略已正確配置

### Q3: Google 登入按鈕點擊後沒反應

**A:** 檢查：
1. 瀏覽器控制台是否有錯誤
2. Supabase Client ID 和 Secret 是否正確
3. Google OAuth 同意屏幕是否已發布（不需要完全驗證，測試模式即可）

### Q4: 本地測試 Google 登入失敗

**A:** 
1. 使用本地服務器（如 `python -m http.server 8080`）
2. 在 Google Cloud Console 添加 `http://localhost:8080` 到 Authorized origins
3. 確保使用 `http://localhost:8080` 而不是 `file://`

### Q5: 如何讓 Google OAuth 應用通過驗證？

**A:** 
- 測試階段不需要通過 Google 驗證
- 只要將 Google OAuth 同意屏幕保持在 "Testing" 模式
- 添加測試用戶即可使用
- 如需正式發布，需要提交 Google 審核（可能需要隱私政策等）

---

## 📝 安全建議

### 生產環境必做：

1. ✅ 啟用郵箱驗證
2. ✅ 設置強密碼策略
3. ✅ 正確配置 RLS 策略
4. ✅ 限制 Redirect URLs
5. ✅ 定期檢查用戶活動日誌

### 數據隔離：

- ✅ 每個用戶只能看到自己的數據
- ✅ user_id 使用 Supabase 的 `auth.uid()`
- ✅ 所有表都啟用了 RLS

---

## 🎉 完成！

現在您的應用已經支持：
- ✅ 郵箱密碼登入
- ✅ Google 快速登入
- ✅ 用戶註冊
- ✅ 安全的數據隔離

每個用戶都有自己獨立的記帳數據，互不干擾！

---

## 📞 需要幫助？

如果遇到問題：
1. 查看 Supabase Dashboard → **Logs** → **Auth Logs**
2. 查看瀏覽器開發者工具控制台
3. 參考 [Supabase Auth 文檔](https://supabase.com/docs/guides/auth)
4. 參考 [Google OAuth 文檔](https://developers.google.com/identity/protocols/oauth2)

祝您使用愉快！🚀

