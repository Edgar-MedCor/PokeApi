const CACHE_NAME = "mi-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js"
  
  // NO pongas archivos dentro de src o public aquí; solo rutas accesibles desde la raíz
];

// Instalar y cachear archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Interceptar peticiones y servir desde cache si no hay internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
