
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [

];

self.addEventListener('install', function(event){
    console.log('Installing sw...');
     event.waitUntil(
         caches.open(CACHE_NAME)
           .then(function(cache) {
             console.log('Opened cache');
             return cache.addAll(urlsToCache);
           })
       );
    
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

// self.addEventListener('fetch', function(event){
    // console.log('Fetch event fired');
    // console.log(event);

    // event.respondWith(
        // caches.match(event.request)
          // .then(function(response) {
            // // Cache hit - return response
            // if (response) {
              // return response;
            // }
            // return fetch(event.request);
          // }
        // )
      // );
    
// });

// self.addEventListener('message',function(e){
    // self.postMessage('Hello from worker<- ' + e.data);
// });

// self.addEventListener('notificationclose', function (event) {
    
  // debugger;
  // var notification = event.notification;
    // var data = notification.data;
    // console.log(data);
  // }
// );

// self.addEventListener('notificationclick', function (event) {

  // debugger;
  // var notification = event.notification;
  // var action = event.action;

  // if(action === 'close'){
    // notification.close();
  // }
  // else{
    // clients.openWindow('http://www.google.com');
  // }

// });

// self.addEventListener('push', function (e) {
  // debugger;
  // var title = e.data.text();
    // e.waitUntil(self.registration.showNotification(title));
    
// });