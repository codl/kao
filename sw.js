"use strict";
let cache_prefix = "kao-";
let version = "kao-2022-04-20.1";

self.addEventListener('install', function(e){
    console.log("installing sw", version);
    e.waitUntil(
        caches.open(cache_prefix + version).then(function(c){
            return c.addAll(['.', 'kao.js', 'main.css']);
        }).then(function(){
            return self.skipWaiting();
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
    console.log("activating sw", version);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName.startsWith(cache_prefix) && cacheName != cache_prefix + version) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});
