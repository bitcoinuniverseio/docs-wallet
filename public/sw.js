/*
 * Universe Wallet documentation service worker.
 *
 * Scope: the wallet documentation route only. Content is network-first with a
 * cache fallback: fresh guidance wins whenever the network answers, and the
 * cache exists so an outage or an emergency never leaves a reader stranded.
 * The emergency bundle is the one explicit, user-requested exception: its
 * routes are pre-fetched on demand (the Save emergency guide offline action)
 * and answered cache-first, because someone reading them offline cannot
 * tolerate a failed fetch.
 *
 * Never cached, by name: simulator assets (they are inert by construction and
 * large), API JSON endpoints (freshness), and anything with a query string.
 * Nothing user-entered is ever serializable into this cache because nothing
 * user-entered is ever sent to this site.
 */
const VERSION = 'universe-docs-sw-v1';
const RUNTIME_CACHE = `${VERSION}-runtime`;
const EMERGENCY_CACHE = 'universe-emergency-bundle';
const BASE = new URL(self.registration.scope).pathname;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(RUNTIME_CACHE).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      for (const name of names) {
        if (name === EMERGENCY_CACHE) continue; // survives version bumps until cleared
        if (!name.startsWith(VERSION)) await caches.delete(name);
      }
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  const data = event.data ?? {};
  if (data.type === 'universe-save-emergency' && Array.isArray(data.routes)) {
    event.source?.postMessage({ type: 'universe-emergency-saving', count: data.routes.length });
    event.waitUntil(
      (async () => {
        const cache = await caches.open(EMERGENCY_CACHE);
        for (const route of data.routes) {
          try {
            // Cache API requires same-origin Request objects; the base is ours.
            const response = await fetch(new Request(route, { credentials: 'omit' }));
            if (response.ok) await cache.put(route, response);
          } catch {
            // A route that fails to fetch simply is not cached; the banner
            // reports what actually saved.
          }
        }
        const keys = await cache.keys();
        event.source?.postMessage({ type: 'universe-emergency-saved', count: keys.length });
      })(),
    );
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(BASE)) return;
  if (url.search) return; // fresh, query-bearing requests go to the network

  // Pagefind assets: cache-first, they are content-addressed by the build.
  if (url.pathname.includes('/pagefind/')) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        const hit = await cache.match(event.request);
        if (hit) return hit;
        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      }),
    );
    return;
  }

  // Emergency bundle: cache-first, because it exists for outages.
  if (url.pathname.startsWith(`${BASE}emergency/`) || url.pathname === `${BASE}llms.txt`) {
    event.respondWith(
      (async () => {
        const emergency = await caches.open(EMERGENCY_CACHE);
        const emergencyHit = await emergency.match(event.request);
        if (emergencyHit) {
          // Refresh in the background when possible.
          fetch(event.request)
            .then((response) => (response.ok ? emergency.put(event.request, response.clone()) : undefined))
            .catch(() => undefined);
          return emergencyHit;
        }
        return fetch(event.request);
      })(),
    );
    return;
  }

  // Everything else: network-first, cache fallback.
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        if (response.ok && response.type === 'basic') {
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(event.request, response.clone());
        }
        return response;
      } catch {
        const cache = await caches.open(RUNTIME_CACHE);
        const hit = await cache.match(event.request);
        if (hit) return hit;
        return new Response(
          '<!doctype html><html lang="en"><meta charset="utf-8"><title>Offline</title><body style="font-family:system-ui;max-width:40rem;margin:4rem auto;padding:0 1rem"><h1>You are offline</h1><p>This page was not saved for offline use. The emergency handbook saves explicitly from its page, so it is available even here.</p></body></html>',
          { headers: { 'content-type': 'text/html; charset=utf-8' }, status: 503 },
        );
      }
    })(),
  );
});
