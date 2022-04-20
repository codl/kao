"use strict";
let cache_prefix = "kao-";
let version = "2022-04-21.11";

self.addEventListener('install', function(e){
    console.log("installing sw", version);
    self.skipWaiting();
    e.waitUntil(
        caches.open(cache_prefix + version).then(function(c){
            return c.addAll(
                ['.', 'kao.js', 'main.css'].map(e => e+"?v="+version)
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request, {ignoreSearch:true}).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log("activating sw", version);
    event.waitUntil(
        Promise.all([
            caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheName.startsWith(cache_prefix) && cacheName != cache_prefix + version) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            }),
            self.clients.matchAll({includeUncontrolled:true}).then(clients => {
                for(let client of clients){
                    client.postMessage(["new-version", version]);
                }
            })
        ])
    );
});
