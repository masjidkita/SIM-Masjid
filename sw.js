const CACHE_NAME = 'sim-masjid-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Event Install: Menyimpan aset utama ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Event Fetch: Menyajikan data dari cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan dari cache jika ada, jika tidak lakukan request ke jaringan
        return response || fetch(event.request);
      })
  );
});

// Event Activate: Membersihkan cache lama jika ada pembaruan versi
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
