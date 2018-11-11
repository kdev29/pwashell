
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/WebIncidencias/logo_italika1.png',
  '/WebIncidencias/img/logo_italika.png',
  '/WebIncidencias/index.html',
  '/WebIncidencias/css/estilos_generales_adm.css',
  '/WebIncidencias/css/reset.css',
  '/WebIncidencias/css/menurefacciones.css',
  '/WebIncidencias/css/mano.css',  
  '/WebIncidencias/css/tablerodeconciliacion.css',  
  '/WebIncidencias/css/jquery-ui.css',  
  '/WebIncidencias/css/modalbox.css',  
  '/WebIncidencias/css/datatables.min.css',  
  '/WebIncidencias/css/font-roboto.css',  
  '/WebIncidencias/css/font-awesome.css',  
  '/WebIncidencias/js/menu.js', 
  '/WebIncidencias/js/datatables.min.js' ,
  '/WebIncidencias/js/jquery-ui.js' ,
  '/WebIncidencias/js/jquery-ventana2.js' ,
  '/WebIncidencias/js/jquery.min.js',
  '/WebIncidencias/img/italika_bandera_mexico.png'
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