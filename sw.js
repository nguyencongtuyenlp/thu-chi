/* Service Worker — cache app shell để chạy offline (PWA) */
const CACHE = "thuchi-v5";
const ASSETS = [
  "./", "./index.html", "./config.js", "./manifest.webmanifest", "./icon.svg",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(ASSETS.map((a) => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Không cache các lời gọi API Supabase (cần dữ liệu mới nhất)
  if (url.hostname.endsWith("supabase.co")) return;

  // Same-origin: network-first, fallback cache (offline)
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req)
        .then((res) => { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return res; })
        .catch(() => caches.match(req).then((m) => m || caches.match("./index.html")))
    );
    return;
  }

  // Cross-origin (CDN): cache-first
  e.respondWith(caches.match(req).then((m) => m || fetch(req)));
});
