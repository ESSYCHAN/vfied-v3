const VERSION = 'vfied-v1';
const ASSETS = [
  '/', '/index.html',
  '/src/style.css',
  // Add your built files if using Vite preview/build
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  // Cache-first for same-origin GETs
  if (request.method === 'GET' && new URL(request.url).origin === location.origin) {
    e.respondWith(
      caches.match(request).then(cached =>
        cached || fetch(request).then(resp => {
          const copy = resp.clone();
          caches.open(VERSION).then(c => c.put(request, copy));
          return resp;
        }).catch(() => cached) // offline fallback
      )
    );
  }
});
