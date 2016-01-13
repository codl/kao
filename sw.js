"use strict";
var v = "kao-v3"

self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open(v).then(function(c){
            return c.addAll(['.', 'kao.js', 'main.css']);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(Math.random(), event.request.method, event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log("activating sw", v);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != v) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});
