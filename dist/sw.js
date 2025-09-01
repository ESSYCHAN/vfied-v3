// VFIED Service Worker - Enhanced for Mobile PWA
const VERSION = 'vfied-v9';  // Bump for new icons
const CACHE_NAME = `vfied-${VERSION}`;

const STATIC_CACHE_FILES = [
  '/',
  '/index.html',
  '/src/main.js',
  '/src/style.css',
  '/manifest.json',
  // Add icon files
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/favicon.ico',
  // Data files
  '/data/local_lists.json',
  '/data/travel_lists.json',
  '/data/events.json'
];

const API_CACHE_PATTERNS = [
  '/v1/recommend',
  '/v1/quick_decision',
  '/v1/events',
  '/v1/travel',
  '/health'
];

// Cache duration for API responses (5 minutes)
const API_CACHE_DURATION = 5 * 60 * 1000;

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log(`🔧 SW ${VERSION} installing...`);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Try to cache files, but don't fail install if some are missing
        return Promise.allSettled(
          STATIC_CACHE_FILES.map(url => 
            cache.add(url).catch(err => 
              console.warn(`Failed to cache ${url}:`, err)
            )
          )
        );
      })
      .then(() => {
        console.log(`✅ SW ${VERSION} installed`);
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log(`🚀 SW ${VERSION} activating...`);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith('vfied-') && cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log(`🗑️ Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log(`✅ SW ${VERSION} activated`);
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - smart caching strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // API requests - network first with timeout, cache fallback
  if (API_CACHE_PATTERNS.some(pattern => url.pathname.includes(pattern))) {
    event.respondWith(
      Promise.race([
        fetch(event.request),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 3000)
        )
      ])
      .then(response => {
        if (response.ok) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(response => {
          if (response) {
            console.log(`📦 API from cache: ${url.pathname}`);
            return response;
          }
          // Return offline API response
          return new Response(
            JSON.stringify({ 
              success: false, 
              offline: true,
              message: 'Currently offline - showing cached data' 
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        });
      })
    );
    return;
  }
  
  // Static resources - cache first
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Return cached version and update in background
          fetch(event.request).then(fetchResponse => {
            if (fetchResponse.ok) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, fetchResponse);
              });
            }
          });
          return response;
        }
        
        // Not in cache, fetch from network
        return fetch(event.request).then(response => {
          if (response.ok && url.origin === self.location.origin) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Offline fallbacks
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
        
        if (event.request.headers.get('accept')?.includes('image')) {
          return caches.match('/icons/icon-192.png');
        }
        
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-decisions') {
    event.waitUntil(
      // Sync any offline decisions when back online
      fetch('/v1/analytics/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          offline_decisions: [] // Get from IndexedDB
        })
      })
    );
  }
});

// Handle push notifications (future feature)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Time to decide what to eat!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('VFIED', options)
  );
});