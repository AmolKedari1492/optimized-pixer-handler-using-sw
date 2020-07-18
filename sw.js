const cacheName = ["my-sw-app"];
const STATIC_ASSETS = [
    '/',
    '/css/app.css',
    '/js/app.js',
    '/index.html'
];

self.addEventListener("install", e => {
    console.log('sw install');
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(STATIC_ASSETS);
        })
    )
});


self.addEventListener('activate', e => {
    console.log('sw activate');
    e.waitUntil(
        caches.keys().then(keys => {
            keys.map(key => {
                if (cacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            })
        }).catch(error => console.error(error))
    )
});

self.addEventListener('fetch', e => {
    console.log('sw fetch')
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request).then(res => {
                return caches.open(cacheName).then(cache => {
                    cache.put(e.request, res.clone());
                    return res;
                });
            })
        })
    )
})

