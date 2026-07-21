/// <reference types="@sveltejs/kit" />
// Phase L (installability): a minimal service worker so the app is installable
// (PWA "Install" prompt / add-to-home-screen) and works offline in a basic way.
// Strategy: precache the built app shell + static files on install; serve
// immutable build/static assets cache-first; navigations network-first with a
// cached-shell fallback so the app still opens with no network. Same-origin
// only — third-party calls (e.g. the Photon geocoder) are never intercepted.

import { build, files, version } from '$service-worker';
import { LOCALE_CODES, DEFAULT_LOCALE } from '$lib/i18n/locales.js';

const CACHE = `hd-cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(ASSETS);
      // The prerendered pages aren't in build/files; fetch them so offline
      // navigations have something to serve. One per language (Phase M).
      // Non-fatal if any fails.
      for (const page of ['/en', '/es', '/en/privacy', '/es/privacy']) {
        try {
          await cache.add(page);
        } catch {
          // ignore — install must still succeed
        }
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

  // Navigations: network-first (fresh content online). Offline, serve the
  // page itself if cached (the language homes and their /privacy); any other
  // URL falls back to the language home so its HTML never renders under a
  // foreign URL (e.g. /es/chart). The language is taken from the path's first
  // segment (Phase M), defaulting to the app default.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(CACHE);
          const cached = await cache.match(request);
          if (cached) return cached;
          const seg = url.pathname.split('/')[1];
          const lang = LOCALE_CODES.includes(seg) ? seg : DEFAULT_LOCALE;
          const home = `/${lang}`;
          if (url.pathname !== home) {
            const homeCached = await cache.match(home);
            return homeCached ?? Response.redirect(home, 303);
          }
          return Response.error();
        }
      })()
    );
  }
});
