
var CACHE_NAME = 'my-site-cache-v1';
var dataCacheName = 'weatherData-v1';

var urlsToCache = [
  './logo_italika1.png',
  './img/logo_italika.png',
  './index.html',
  './css/estilos_generales_adm.css',
  './css/reset.css',
  './css/menurefacciones.css',
  './css/mano.css',  
  './css/tablerodeconciliacion.css',  
  './css/jquery-ui.css',  
  './css/modalbox.css',  
  './css/datatables.min.css',  
  './css/font-roboto.css',  
  './css/font-awesome.css',  
  './js/menu.js', 
  './js/datatables.min.js' ,
  './js/jquery-ui.js' ,
  './js/jquery-ventana2.js' ,
  './js/jquery.min.js',
  './img/italika_bandera_mexico.png'
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
        if (key !== CACHE_NAME && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// self.addEventListener('fetch', function(e) {
//   console.log('[ServiceWorker] Fetch', e.request.url);
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://reqres.in/api/users?page=2';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    console.log('en sw.fetch() -> ' + dataUrl);
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          console.log('retorna caCHE -> '+ response);
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});