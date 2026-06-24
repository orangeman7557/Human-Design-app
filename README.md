# Human Design Chart App

A free, source-available PWA for calculating, saving, and consulting Human
Design charts. Free for any noncommercial use. See [License](#license).

## Status

**MVP complete and live in production.** From birth date, time, and place the
app computes a full Human Design chart and renders an interactive SVG
bodygraph alongside a textual summary: type, strategy, authority, profile,
definition, defined centres, complete channels, hanging gates, and the
planetary activations table. It also supports saving charts locally
(IndexedDB), JSON export/import, an "unknown birth time" mode, and sharing the
chart as a PNG.

Development continues beyond the MVP: the AI handoff with per-element
explanatory text (Phase 6) is built and in review, with a plain-language
first-timer report (Phase 7) next. [`TASKS.md`](./TASKS.md) is the canonical,
up-to-date project state; [`BACKLOG.md`](./BACKLOG.md) holds deferred
decisions and known debt.

The app ships a web manifest. Making it **installable** (add-to-home-screen,
and eventually a Play Store build via TWA) is a planned goal — it still needs
app icons and a minimal service worker. Full **offline** support is an
optional, not-yet-committed extra. See [`BACKLOG.md`](./BACKLOG.md).

## About authorship

This project is being implemented **with AI assistance**. All code, comments,
and documentation are produced collaboratively between
[orangeman7557](https://github.com/orangeman7557) (author and decision-maker)
and an AI coding assistant. The arrangement covers the entire codebase, so
AI-authored work is not flagged file-by-file.

## Stack

- **[SvelteKit](https://kit.svelte.dev/)** with `@sveltejs/adapter-cloudflare`
  — single-page app, statically hosted on Cloudflare Workers.
- **[astronomy-engine](https://github.com/cosinekitty/astronomy)** — pure-JS
  planetary positions, ±1 arcminute precision (more than enough for HD gates
  and lines; see `BACKLOG.md` for the trade-off accepted on the deeper HD
  variables).
- **[Luxon](https://moment.github.io/luxon/)** +
  **[tz-lookup](https://github.com/darkskyapp/tz-lookup)** — historical
  timezone-aware date handling.
- **[Photon](https://photon.komoot.io/)** — OpenStreetMap-based geocoder
  (typeahead) for birth-place autocomplete.
- **SVG** — bodygraph rendering (Phase 1.3).
- **[Dexie.js](https://dexie.org/)** over IndexedDB — local persistence
  (Phase 2).

## Hosting

[Cloudflare Workers](https://workers.cloudflare.com/) (the unified platform
that now also serves what used to be Cloudflare Pages). Free tier,
auto-deploys on every push to `main`.

Build settings expected in Cloudflare:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Environment variable: `NODE_VERSION=22`

## Local development (optional)

The project is designed to be developed without local tooling — code is
authored in this repository and Cloudflare builds and deploys on every push.
If you want to run it locally anyway:

```bash
npm install
npm run dev    # dev server
npm test       # calculation-core test suite (vitest)
```

Then open [http://localhost:5173](http://localhost:5173).

## License

[PolyForm Noncommercial License 1.0.0](./LICENSE).

The source code is publicly visible and free to read, fork, modify, run, and
share for any **noncommercial** purpose — personal use, study, research,
hobby projects, education, and use by charitable, public-research, public-safety,
health, environmental, or government organizations.

**Commercial use is not granted by this license** and requires explicit written
permission from the copyright holder. "Commercial" means anything intended for
or directed toward commercial advantage or monetary compensation (selling the
app, embedding it in a paid product, running it as a paid service, etc.).

For commercial licensing inquiries, contact
[orangeman7557@gmail.com](mailto:orangeman7557@gmail.com).

Third-party licenses for bundled dependencies are listed in [`NOTICE`](./NOTICE).

Note: PolyForm Noncommercial is a *source-available* license, not an
OSI-approved open-source license. The earlier AGPL-3.0 licensing was a
consequence of using Swiss Ephemeris (AGPL); now that the engine is
[astronomy-engine](https://github.com/cosinekitty/astronomy) (MIT), that
constraint no longer applies, and the license has been re-chosen on its own
merits.

## Phased plan

1. **Phase 0** — Project skeleton, hosting wired, auto-deploy.
2. **Phase 1** — Birth-data form, city autocomplete, astronomical
   calculation, textual chart output, SVG bodygraph.
3. **Phase 2** — Local persistence (IndexedDB), chart list, export/import
   to file.
4. **Phase 3** — Visual polish (classic-faithful style).
5. **Phase 4** — "Unknown birth time" handling.
6. **Phase 5** — Share chart as a PNG. *(MVP closes here.)*
7. **Phase 6** — AI handoff + per-element explanatory text *(built; pending
   the author's text review)*.
8. **Phase 7 (next)** — Initial report: a plain-language HD primer for
   first-timers.
9. **Phase 8 (planned)** — Composite chart.
10. **Phase 9 (planned)** — Transits.
11. **Phase 10 (planned)** — Optional online sync.

Live status in [`TASKS.md`](./TASKS.md); deferred decisions and known debt in
[`BACKLOG.md`](./BACKLOG.md).
