# Tasks

Source of truth for project progress. Any session resuming this project
(another window, another day, another assistant) **must read this file first**
to understand where we are.

It is the project's responsibility — and the AI assistant's responsibility —
to keep this file up to date with every meaningful change. If you finish a
sub-iteration, advance a status. If you uncover new tech debt, write it down
(here for cross-session continuity, in `BACKLOG.md` for the long view).

Statuses:
- ✅ done
- 🟡 in progress / partially done
- ⬜ pending

The deeper context (technical trade-offs, future ideas, deferred decisions)
lives in [`BACKLOG.md`](./BACKLOG.md).

Last updated: 2026-05-17.

---

## ✅ Done

- **Phase 0 — Infrastructure.** GitHub repo
  (`orangeman7557/human-design-chart-app`) connected to Cloudflare Workers
  Builds. Auto-deploy on every push to `main`. Live at
  `https://human-design-chart-app.orangeman7557.workers.dev/`. Stack:
  SvelteKit + adapter-cloudflare, SPA mode (`ssr=false`), dark theme base.
- **Phase 1.1 — Astronomical calculation + textual chart output.** Birth-data
  form (date/time + manual lat/long/timezone at first), 13-body computation
  via `astronomy-engine`, gate/line mapping, derivation of type, strategy,
  authority, profile, definition, defined centers and active gates. Result
  page in text. Validated against orangeman7557's known chart and a second
  reference chart — both match expected values exactly.
- **Phase 1.2 — City autocomplete + automatic timezone.** Nominatim-backed
  city search with debounce and abort. `tz-lookup` resolves the IANA
  timezone from coordinates. Form no longer asks the user for lat/long or
  timezone. Client-side dedup + ranking surfaces the right city when names
  collide (e.g. Cuenca, Spain vs Cuenca, Ecuador). Country preference
  dominant over OSM class so the preferred-country city wins even when it
  comes back from Nominatim as a `boundary` entry.
- **Infrastructure maintenance (alongside Phase 1.2).** Fixed a latent data
  bug in `src/lib/hd/constants.js`: gate 11 belongs to Ajna, not Throat
  (does not change orangeman7557's chart because his channel 11-56 is
  incomplete, but it would have placed gate 11 in the wrong centre in the
  visual bodygraph and broken Ajna definition for other charts). Bumped
  Wrangler to v4 and Node to v22 (build env variable `NODE_VERSION=22` on
  Cloudflare + `.nvmrc` + `engines.node` in `package.json`).

## ⬜ Next up

- **Phase 1.3 — SVG bodygraph visualization.** Functional, classic-faithful
  style. Reference for later polish: Richard Beaumont's "Rave" app. Closes
  Phase 1. Decisions already taken with the user:
  - Bodygraph above the textual data on the chart page.
  - Personality vs Design colour-coded for dark theme: white for
    Personality, red for Design, mixed when both.
  - Geometry: approximately-correct gate positions for the first cut; pixel
    polish belongs in Phase 3.
  - Three new files expected: `src/lib/hd/bodygraph-geometry.js`,
    `src/lib/components/Bodygraph.svelte`, plus the integration edit on
    `src/routes/chart/+page.svelte`.

## ⬜ Pending

- **Phase 2 — Local persistence + chart list.** IndexedDB via Dexie.js.
  Save / list / rename / delete charts. Export/import all charts to a single
  JSON file. Only metadata kept per chart: name.
- **Phase 3 — Visual polish + unknown-birth-time handling.** Final visual
  pass on the bodygraph (faithful classic, Rave-like). Dark theme finalised
  (typography, palette). "Unknown hour" mode: chart at local noon with
  visual disclaimers + a slider to scrub the hour and see which large
  markers (type, authority, profile) shift.
- **Phase 4 — Composite chart + share as image.** Select two saved charts
  and render a combined bodygraph (visual overlay distinguishing each
  person). PNG export button for sharing. Closes the MVP.
- **Closure — Stabilisation + optional Play Store packaging.** Hands-on
  testing against several real charts. Bug-fixing. Optional: package as a
  Trusted Web Activity (TWA) for Google Play (one-time $25 developer fee).
- **Phase 5 (future) — Transits.** View live transits over a saved chart.

---

## Useful pointers

- Live URL: <https://human-design-chart-app.orangeman7557.workers.dev/>
- Repo: <https://github.com/orangeman7557/human-design-chart-app>
- Validation case: orangeman7557's own chart, hard-coded as pre-fill in
  `src/routes/+page.svelte` for quick smoke-testing.
- Decisions log + accepted trade-offs: [`BACKLOG.md`](./BACKLOG.md).
- Authorship + AI assistance disclosure: [`README.md`](./README.md).

## Working agreements for the AI assistant

- **Update this file with every meaningful change.** A new feature shipped,
  a sub-iteration completed, a bug fix landed, a decision taken — all of
  it should be reflected here before the conversation ends.
- **Read this file (and `BACKLOG.md`) at the start of every session.**
  Including the user's own messages may not be enough to reconstruct state;
  this file is the canonical record across conversations.
- **Refresh the `Last updated` date** above whenever you edit this file.
- **Prefer terse, factual entries.** Long descriptions belong in commit
  messages and code comments.
