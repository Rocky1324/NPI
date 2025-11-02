// Service Worker for NPI Dashboard
// Provides offline functionality and performance improvements

const CACHE_VERSION = 'npi-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Files to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/home.html',
  '/cours.html',
  '/carte.html',
  '/timeline.html',
  '/comparaison.html',
  '/static.html',
  '/style-presentation.css',
  '/ux.js',
  '/guide.js',
  '/home.js',
  '/cours.js',
  '/carte.js',
  '/timeline.js',
  '/comparaison.js',
  '/data/npi-data.json',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Some assets failed to cache:', err);
        // Continue even if some assets fail (e.g., external CDNs)
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('npi-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (CDNs, fonts, etc.) - let browser handle them
  if (url.origin !== location.origin) {
    return;
  }

  // Strategy: Cache first, then network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('[SW] Serving from cache:', request.url);
        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(request)
        .then((networkResponse) => {
          // Don't cache non-successful responses
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Clone the response (can only be consumed once)
          const responseToCache = networkResponse.clone();

          // Cache the fetched resource dynamically
          caches.open(DYNAMIC_CACHE).then((cache) => {
            console.log('[SW] Caching dynamic asset:', request.url);
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch((err) => {
          console.warn('[SW] Fetch failed, offline?', err);
          // Could return a custom offline page here
          throw err;
        });
    })
  );
});

// Message event - allow clients to skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
