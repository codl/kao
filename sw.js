"use strict";
var v = "1"

self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open('kao-v' + v).then(function(c){
            return c.addAll(['.', 'kao.js']);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {

    console.log("activating sw version " + v);
    event.waitUntil(
        caches.keys(function(cacheNames) {
            console.log(cacheNames);
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != 'kao-v' + v) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});