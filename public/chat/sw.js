const CACHE_NAME = "chatapp-sites-v1";
const APP_ROOT = "/chat/";
const APP_SHELL = "/chat/index.html";
const ASSETS = [
  APP_ROOT,
  APP_SHELL,
  "/chat/manifest-v5.json",
  "/chat/icons/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.mode === "navigate" && url.pathname.startsWith(APP_ROOT)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(APP_SHELL, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match(APP_SHELL)),
    );
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = {};
  }
  const notification = payload.notification || {};
  const data = payload.data || {};

  event.waitUntil(
    self.registration.showNotification(notification.title || "ChatApp", {
      body: notification.body || "Yeni mesaj",
      icon: "/chat/icons/icon.svg",
      badge: "/chat/icons/icon.svg",
      tag: data.chatId ? `chat-${data.chatId}` : undefined,
      data,
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((client) => client.url.includes(APP_ROOT));
      if (existing && "focus" in existing) return existing.focus();
      return self.clients.openWindow ? self.clients.openWindow(APP_SHELL) : undefined;
    }),
  );
});
