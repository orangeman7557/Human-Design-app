# Tasks

Source of truth for project progress. Any session resuming this project
(another window, another day, another assistant) should read this file
first to understand where we are.

Statuses:
- ✅ done
- 🟡 in progress / partially done
- ⬜ pending

The deeper context (technical trade-offs, future ideas, deferred decisions)
lives in [`BACKLOG.md`](./BACKLOG.md).

---

## ✅ Done

- **Phase 0 — Infrastructure.** GitHub repo (`orangeman7557/human-design-chart-app`)
  connected to Cloudflare Workers Builds. Auto-deploy on every push to `main`.
  Live at `https://human-design-chart-app.orangeman7557.workers.dev/`. Stack:
  SvelteKit + adapter-cloudflare, SPA mode, dark theme base.
- **Phase 1.1 — Astronomical calculation + textual chart output.** Birth-data
  form (date/time + manual lat/long/timezone), 13-body computation via
  `astronomy-engine`, gate/line mapping, derivation of type, strategy,
  authority, profile, definition, defined centers and active gates. Result
  page in text. Validated against orangeman7557's known chart and a second
  reference chart — both match expected values exactly.
- **Phase 1.2 — City autocomplete + automatic timezone.** Nominatim-backed
  city search with debounce and abort. `tz-lookup` resolves the IANA
  timezone from coordinates. Form no longer asks the user for lat/long or
  timezone. Client-side dedup + ranking surfaces the right city when names
  collide (e.g. Cuenca, Spain vs Cuenca, Ecuador).

## 🟡 In progress

- **Phase 1.3 — SVG bodygraph visualization.** Functional, classic-faithful
  style. Reference: Richard Beaumont's "Rave" app. Will replace (or
  supplement) the current text-only output on the chart page. Closes Phase 1.

## ⬜ Pending

- **Phase 2 — Local persistence + chart list.** IndexedDB via Dexie.js.
  Save / list / rename / delete charts. Export/import all charts to a single
  JSON file. Only metadata kept per chart: name.
- **Phase 3 — Visual polish + unknown-birth-time handling.** Final visual
  pass on the bodygraph (faithful classic). Dark theme finalized (typography,
  palette). "Unknown hour" mode: chart at local noon with visual disclaimers
  + a slider to scrub the hour and see which large markers (type, authority,
  profile) shift.
- **Phase 4 — Composite chart + share as image.** Select two saved charts
  and render a combined bodygraph (visual overlay distinguishing each
  person). PNG export button for sharing. Closes the MVP.
- **Closure — Stabilization + optional Play Store packaging.** Hands-on
  testing against several real charts. Bug-fixing. Optional: package as a
  Trusted Web Activity (TWA) for Google Play (one-time $25 developer fee).
- **Phase 5 (future) — Transits.** View live transits over a saved chart.

---

## Useful pointers

- Live URL: <https://human-design-chart-app.orangeman7557.workers.dev/>
- Repo: <https://github.com/orangeman7557/human-design-chart-app>
- Validation case: orangeman7557's own chart, hard-coded as pre-fill in
  `src/routes/+page.svelte` for quick smoke-testing.
- Decisions log + trade-offs: [`BACKLOG.md`](./BACKLOG.md).
- Authorship + AI assistance disclosure: [`README.md`](./README.md).
