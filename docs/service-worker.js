// Mail-Check! 用の最小 Service Worker
// Chrome の PWA インストール条件を満たすためにのみ存在（オフラインキャッシュは行わない）
// バージョン: 'v2-no-cache-2026-05-24' (キャッシュ罠を完全除去)

self.addEventListener('install', (event) => {
  // 既存の SW を即座に上書きする
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // 過去にキャッシュ API を使った経緯があれば全消し（PWA 化時の名残）
  event.waitUntil((async () => {
    try {
      const names = await caches.keys();
      await Promise.all(names.map(n => caches.delete(n)));
    } catch(_) {}
    await self.clients.claim();
  })());
});

// ページ側から「SKIP_WAITING」を受けたら即座に新 SW へ切り替え
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// ネットワーク取得のみ（キャッシュなし）：
// 毎回最新を取りに行くのでアプリのデプロイ反映が早い
self.addEventListener('fetch', (event) => {
  // 何もせずデフォルトのネットワーク取得に任せる
});
