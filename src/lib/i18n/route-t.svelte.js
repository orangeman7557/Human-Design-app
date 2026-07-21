// Route-bound translator (jul 2026, fixing a Phase M prerender leak).
//
// The active locale is a module-level `$state` — shared. On the client that is
// correct (one user, one language), but the prerenderer builds /en and /es
// CONCURRENTLY in the same process, so whichever page sets it last wins for
// everything that reads it. Route components already dodge this by passing
// `page.params.lang` explicitly to `t()`.
//
// The trap: a component does not have to *be* a page to be prerendered. The
// footer modals (About, ReportBug) and the saved-charts note (StorageInfo)
// render inside the prerendered home, so reading the shared locale baked the
// wrong language into the static HTML — `/es` shipped "report a bug · about"
// and "learn more". It self-corrected on hydration, which is why it only ever
// showed up in the build, never in dev; crawlers saw the broken version.
//
// So the rule is not "pages use tr, components use t" but "anything that can
// render during prerender must bind to the route". This helper is that binding
// in one place: `const tr = routeT()` and the component is safe wherever it is
// mounted. Falls back to the module locale on routes with no language segment.

import { page } from '$app/state';
import { t, getLocale } from './index.svelte.js';

/**
 * A `t()` bound to the current route's language.
 * @returns {(key: string, params?: Record<string, any>) => string}
 */
export function routeT() {
  return (key, params) => t(key, params, page.params?.lang ?? getLocale());
}

/** The current route's language code (module locale when there is no segment). */
export function routeLocale() {
  return page.params?.lang ?? getLocale();
}
