/// <reference types="@sveltejs/kit" />
// Phase L (installability): a minimal service worker so the app is installable
// (PWA "Install" prompt / add-to-home-screen) and works offline in a basic way.
// Strategy: precache the built app shell + static files on install; serve
// immutable build/static assets cache-first; navigations network-first with a
// cached-shell fallback so the app still opens with no network. Same-origin
// only — third-party calls (e.g. the Photon geocoder) are never intercepted.

import { build, files, version } from '$service-worker';

const CACHE = `hd-cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(ASSETS);
      // The SPA entry shell isn't in build/files; fetch it so offline
      // navigations have something to fall back to. Non-fatal if it fails.
      try {
        await cache.add('/');
      } catch {
        // ignore — install must still succeed
      }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) {
        if (key !== CACHE) await caches.delete(key);
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // leave cross-origin alone

  // Immutable build/static assets: cache-first.
  if (ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
    return;
  }

  // Navigations: network-first (fresh content online), cached shell offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(CACHE);
          const fallback = (await cache.match('/')) || (await cache.match(request));
          return fallback || Response.error();
        }
      })()
    );
  }
});
