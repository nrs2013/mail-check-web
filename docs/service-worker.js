// Mail-Check! 用の最小 Service Worker
// Chrome の PWA インストール条件を満たすためにのみ存在（オフラインキャッシュは行わない）
// 将来オフライン対応するなら fetch を hook して cache から返す処理を追加できる

self.addEventListener('install', (event) => {
  // 既存の SW を即座に上書きする
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// ネットワーク取得のみ（キャッシュなし）：
// 毎回最新を取りに行くのでアプリのデプロイ反映が早い
self.addEventListener('fetch', (event) => {
  // 何もせずデフォルトのネットワーク取得に任せる
});
