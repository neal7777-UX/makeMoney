// Service Worker for 休閒風個人記帳本 PWA
const CACHE_NAME = 'casual-finance-tracker-v1';

// 安装 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: 缓存已打开');
        // 只缓存主要HTML文件，其他资源按需缓存
        return cache.addAll(['./index-supabase.html', './manifest.json']);
      })
      .catch((error) => {
        console.error('Service Worker: 缓存安装失败', error);
      })
  );
  self.skipWaiting(); // 立即激活新的 Service Worker
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 删除旧版本的缓存
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 删除旧缓存', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // 立即控制所有页面
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  // 跳过 Supabase API 请求（必须实时获取）
  if (event.request.url.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果缓存中有，返回缓存
        if (response) {
          return response;
        }

        // 否则从网络获取
        return fetch(event.request).then((response) => {
          // 检查响应是否有效
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 克隆响应（因为响应只能使用一次）
          const responseToCache = response.clone();

          // 缓存响应
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // 网络失败时，如果是页面请求，返回离线页面
          if (event.request.destination === 'document') {
            return caches.match('./index-supabase.html');
          }
        });
      })
  );
});

