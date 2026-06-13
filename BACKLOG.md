# Backlog

Deliberately deferred decisions and candidate improvements. Not an ordered
roadmap — just a list of things we know exist and will want to tackle at
some point.

> Note: this project is being implemented with AI assistance. All code,
> comments, and documentation are produced collaboratively between orangeman7557 (the
> author and decision-maker) and an AI coding assistant.

## Decision log — License change (AGPL-3.0 → PolyForm Noncommercial 1.0.0)

**Date:** 2026-05-17.

**What changed:** the project's license moved from AGPL-3.0-or-later to
[PolyForm Noncommercial 1.0.0](./LICENSE). The previous third-party attribution
(astronomy-engine, MIT) is now recorded explicitly in [`NOTICE`](./NOTICE).

**Why:** AGPL was inherited from the original plan to use Swiss Ephemeris,
whose copyleft license forced the whole derived work to be AGPL. Since
Phase 1.1 the engine is `astronomy-engine` (MIT), so the AGPL obligation
disappeared and the licensing decision became free again. The author
re-chose on its merits: source-available so the calculation stays auditable,
noncommercial so the author retains the optionality of monetising later
without competing against a clone of the same code.

**Consequences accepted:**

- This is no longer "open source" in the strict OSI sense. It is
  source-available. GitHub will not show the green license badge; it will
  show "Other" or "View license".
- Public/forks/mirrors that present the project as "open source" should be
  corrected in language: it is *source-available, noncommercial-only*.
- The author is currently the sole copyright holder. **Any future external
  contribution requires a CLA (Contributor License Agreement)** before merge,
  or the author loses the ability to relicense or grant commercial
  exemptions. Until a CLA is in place, do not accept third-party PRs that
  add or modify code.
- Past releases (none yet tagged) would remain under the previous license
  forever once published. Since no release was tagged under AGPL, this is
  moot for now.
- Commercial exemptions can be granted case-by-case in writing by the
  author. There is no public mechanism for this yet; if the project gains
  traction, consider a "commercial license" page with a contact route.
- "Noncommercial" boundaries can be ambiguous in edge cases. The PolyForm
  text defines it precisely; the author is the one who enforces it.

**Files touched in this change:**
`LICENSE`, `NOTICE` (new), `README.md`, `package.json`, `BACKLOG.md`.

## Known bugs & pre-MVP tasks (updated 2026-06-13)

Open:

- **Compute effect retries ~8× on error.** When `computeChart` throws,
  the effect in `src/routes/chart/+page.svelte` re-runs and re-throws
  the same error about eight times (console noise only; the user-facing
  error message shows fine). Found in the 2026-06-13 QA pass.

Fixed in the 2026-06-13 batch:

- ✅ **Integration-circuit channels painted over highlighted halves on
  hover.** The opaque-`dimColor` dimming (commit `dcb09e9`) kept the
  single inactive→active two-pass z-order, so on the shared integration
  trunk (Q→Q2) a dimmed channel's opaque half painted over a highlighted
  channel's stretch, breaking its line on hover. Fixed by wrapping the
  two passes in an outer dim-first/kept-last loop (commit `196e9ea`);
  the non-dimmed view is unchanged. Repro was 19/11/1984, 12:00, Madrid.

Fixed in the 2026-06-11 batch:

- ✅ **GRAVE — chart calculation error** (1984-01-30, 01:00, Madrid gave
  Projector instead of Reflector). Root cause: the mean lunar node — see
  "Lunar node: mean vs true" below, now resolved.
- ✅ **Tooltips unreachable on touch.** `[data-tip]` was `:hover`-only;
  now a tap toggles them (global `.tip-open` class; buttons excluded —
  there the tap is the action itself).
- ✅ **Touch interaction round:** tapping a centre on the bodygraph SVG
  now pins the highlight (it was mouse-only); the pinned/hovered channel
  or gate chip now shows its own selected style; on mobile the save
  button sits at title height with share/download below, level with the
  date-place line.

Fixed in the second 2026-06-11 batch (Phase 5 close):

- ✅ **Desktop image download rendered wrong.** Root cause: html-to-image
  copies the live node's computed margin into the clone, so `<main>`'s
  desktop `margin: 0 auto` centring became a ~190px left shift that pushed
  the content off-canvas and clipped it. The clone now gets `margin: 0`, a
  small uniform 12px padding (mobile side margins were a huge 48px), and a
  height recomputed without the footer band (the old bottom gap). PNG file
  name is now `nombre carta YYYY-MM-DD-HHMM-ciudad.png` (city = label up
  to the first comma).
- ✅ **Chart header typography.** Date-time-place subtitle left-aligns
  with the title text on both breakpoints; title↔subtitle gap tightened.
- ✅ **Form pre-fill removed.** The form starts empty; clicking the final
  period of the home tagline (hidden shortcut) pre-fills the author's
  smoke-test data.
- ✅ **Mobile form centring.** Labels, field text and the unknown-time
  checkbox centred on mobile; the checkbox sits below the time field
  there (top-right of the field label on desktop, as before).

## Possible improvements (not scheduled, not part of Phase 5)

- **Place search should match partial names.** Not about prefixes per se:
  the finder must work when the user hasn't typed the full city name —
  "mad" should surface Madrid, "barce" Barcelona, "dusse" Düsseldorf.
  Today the full name is needed. Related groundwork in "Known tech debt"
  (Nominatim `/search` is geared toward full-form geocoding; a Photon
  attempt was reverted).
- **Mobile date field: allow typing the numbers.** Besides the calendar
  picker, some users find typing the digits more comfortable than
  scrolling years in the calendar.
- **Birth-place error messages placement.** Shown below the field they
  look cramped; consider showing them to the right of the "Lugar de
  nacimiento" label instead.
- ~~Unknown-hour slider should respect the current time~~ — done
  2026-06-13 (checking seeds the slider from the entered hour, rounded
  to the nearest half-hour; unchecking keeps the slider's hour).
- **Saved-chart list should show only "city, country".** The place label
  on each saved-chart chip currently includes the intermediate regions
  (province, autonomous community…); shorten it to city + country. The
  chart page header already does this trim — reuse it.
- **City autocomplete surfaces regions and counties as cities.**
  "Valencia" returns "Comunidad Valenciana, Comunidad Valenciana,
  España" (duplicated label) and "Valencia County, Nuevo México" among
  the suggestions. Filter or down-rank non-city entries and dedup
  labels.
- **Invalid-data error message mixes languages.** A chart with broken
  stored data shows "Fecha/hora inválida:" followed by Luxon's raw
  English message ("the zone … is not supported"). Nearly unreachable
  for real users; low priority.
- **Back arrow on the chart page (mobile).** The ← glyph looks small and
  off-centre inside its circle on the mobile version; fix the
  sizing/centring there.
- ~~Small, subtle clear-form button on the home screen~~ — done
  2026-06-12 (quiet "Borrar formulario" link under the CTA).
- **Estimated weight/influence per planetary activation.** Surface the
  commonly attributed relative weight of each activation (e.g. the Sun
  is said to weigh far more than any other body). Research the usual
  percentages before designing the UI.

## Astronomical precision (HD variables: color, tone, base)

**Current decision:** the app uses
[astronomy-engine](https://github.com/cosinekitty/astronomy) as its
astronomical engine. Precision: ±1 arcminute.

**Implication:** good enough to compute **gates** (5.6°) and **lines** (0.9°)
without error. Insufficient to reliably compute the **deeper HD variables**:

- Color (~9 arcminutes per unit) — usable, occasional errors.
- Tone (~1.9 arcminutes) — the ±1 arcmin error is already 53% of the unit
  width; would frequently fail near boundaries.
- Base (~22 arcseconds) — the ±1 arcmin error is almost 3× the base width.
  Unusable.

**When we revisit:** if HD variables (color/tone/base) ever enter scope.
While the app only covers the classic bodygraph, the technical cost isn't
worth it.

**Options when the time comes:**

1. Try a different Swiss Ephemeris wrapper that plays nicely with Vite
   (`sweph-wasm`, `@fusionstrings/swiss-eph`).
2. Fork `swisseph-wasm` and fix its WASM-path issue with Vite.
3. Move the astronomical computation to a small server (a Cloudflare Worker
   with a custom binding, or a Vercel Edge Function) that can use Swiss
   Ephemeris without browser bundling constraints.

## Lunar node: mean vs true — RESOLVED 2026-06-11

**Decision (2026-06-11):** switched from Meeus' mean node to the
**osculating true node** — the ascending node of the Moon's instantaneous
orbital plane, computed in `ephemeris.js` from `astronomy-engine`'s
`GeoMoonState` (position + velocity rotated to ecliptic of date, node
taken from the orbital angular momentum). Same value as Swiss Ephemeris
`TRUE_NODE`, which is what reference HD tools use.

**Why:** exactly the failure mode anticipated here. The mean node deviates
up to ~1.75° from the true node; for 1984-01-30, 01:00, Madrid that put
the design South Node 0.7° inside gate 26, creating a false 26-44 channel
(Projector instead of Reflector). With the true node it lands in gate 5
and the chart is correctly a Reflector. Re-validated against the author's
reference chart: same gates everywhere, and the personality node lines now
match the reference tool too (16.5/9.5 where the mean node gave .6).

## Features already identified for future phases

Roadmap renumbered 2026-06-10: 3 visual polish → 4 unknown hour →
5 PNG export (MVP closes) → 6 online sync → 7 composite → 8 transits.
Reordered 2026-06-13: AI handoff + element info moves up to Phase 6;
online sync moves down to Phase 9.

- **Phase 6 (planned):** AI handoff + basic element info. Ready-made
  prompts to take to the user's **own** AI assistant, plus in-app textual
  descriptions of type, authority, profile, centres and channels —
  written from scratch or from genuinely free sources, only if legally
  viable (no plagiarism, never copied from Jovian Archive).
- **Phase 7 (planned):** composite chart. **Advanced composite** beyond the
  combined visual: relationship dynamics (electromagnetic channels,
  dominance, compromise, companionship).
- **Phase 8 (planned):** **transits** view over a saved bodygraph.
- **Phase 9 (planned):** optional cloud sync (local-only stays the default).
- **Multi-language activation**: the architecture is already multi-language
  ready; English translation pending once there's traction.

## Dependency conflict: wrangler v4 vs adapter-cloudflare

`wrangler@^4.0.0` (proyecto) choca con el peer dep `wrangler@^3.28.4` que
declara `@sveltejs/adapter-cloudflare@4.9.0`. Cloudflare Workers Builds usa
`npm ci` (estricto) y falla sin workaround.

**Solución temporal (2026-05-21):** `.npmrc` con `legacy-peer-deps=true`.

**Solución permanente cuando proceda:** actualizar `@sveltejs/adapter-cloudflare`
a una versión que declare soporte explícito para wrangler v4, o bajar wrangler
a `^3.28.4`. Revisar el changelog de `@sveltejs/adapter-cloudflare` antes de
subir de versión.

## Known tech debt

- Channel **30-41** (half-channel edge case) still pending verification
  against a reference tool. Partial check 2026-06-13: the chart
  19/11/1984, 12:00, Madrid has 30-41 as a complete channel with Solar
  Plexus and Root defined and the channel painted — structurally
  consistent, but not yet contrasted with a reference chart.
- A handful of older source files still carry Spanish code comments from
  Phase 0/1.1. They get translated to English as they're touched.
- The Nominatim integration uses the public endpoint without an explicit
  User-Agent. For low traffic this is fine; if the app grows, we should
  switch to a self-identifying header or a self-hosted Nominatim mirror.
- City autocomplete uses Nominatim's `/search`, which is geared toward
  full-form geocoding rather than prefix autocomplete. Short prefixes
  ("cuen", "barc") don't always surface the obvious match. A first attempt
  at switching to Photon (komoot) failed in deployment and was reverted.
  Future work: investigate the Photon failure (possible CORS or response
  shape mismatch) or try a different autocomplete-friendly geocoder.
