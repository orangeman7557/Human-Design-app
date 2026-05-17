# Human Design Chart App

A free, source-available PWA for calculating, saving, and consulting Human
Design charts. Free for any noncommercial use. See [License](#license).

## Status

In active development. Phase 1 covers the birth-data form, city autocomplete,
astronomical calculation, and textual chart output. Visual bodygraph
rendering and chart management features come in subsequent phases — see
[`BACKLOG.md`](./BACKLOG.md).

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
- **[Nominatim](https://nominatim.openstreetmap.org/)** — free OpenStreetMap
  geocoder for birth-place autocomplete.
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
- Environment variable: `NODE_VERSION=20`

## Local development (optional)

The project is designed to be developed without local tooling — code is
authored in this repository and Cloudflare builds and deploys on every push.
If you want to run it locally anyway:

```bash
npm install
npm run dev
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
4. **Phase 3** — Visual polish (classic-faithful style) and "unknown
   birth time" handling.
5. **Phase 4** — Composite chart and PNG sharing.
6. **Phase 5 (planned)** — Transits.

Details and deferred decisions in [`BACKLOG.md`](./BACKLOG.md).
