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

## Lunar node: mean vs true

**Current decision:** the **mean North Node** is computed via Meeus'
formula (chapter 47 of _Astronomical Algorithms_).

**Implication:** maximum deviation from the true node is ~1.5°. Less than
the width of an HD gate (5.6°). For the vast majority of charts this doesn't
affect the gate, but **for charts whose node falls near a gate boundary** it
could differ from reference apps that use the true node.

**When we revisit:** if validation against external sources (ihdschool,
MyBodyGraph) reveals discrepancies in North/South Node activations. We'd
then compute the true node from the Moon's instantaneous orbit.

## Features already identified for future phases

- **Phase 5 (planned):** **transits** view over a saved bodygraph.
- **Advanced composite:** beyond the combined visual, compute relationship
  dynamics (electromagnetic channels, dominance, compromise, companionship).
- **Textual interpretations** of type, authority, profile, centers, channels.
  Written from scratch or from free sources — never copied from Jovian
  Archive.
- **Optional cloud sync** (keeping local-only as the default).
- **Multi-language activation**: the architecture is already multi-language
  ready; English translation pending once there's traction.

## Bodygraph polish remaining (Phase 3)

Phase 1.3 shipped a *functional* bodygraph with HD-standard colours, classic
shapes, striped mixed channels, gate numbers moved outside the centres, and
deduplicated gate labels. What remains for Phase 3 to reach Rave-style
fidelity:

- **Per-gate canonical positions on each centre's perimeter.** Today every
  gate is placed at whichever channel encounters it first. The standard
  layout has each gate at a fixed position (e.g. gate 10 on the left side
  of G regardless of which channel it serves). This requires hand-defined
  (x,y) for all 64 gates plus a switch from centre-to-centre channel
  routing to gate-to-gate routing.
- **Half-channel coloring** (matching how Rave actually paints channels):
  each half of a channel rendered by its near-gate's activation state
  (white = Personality, red = Design) rather than the current single colour
  per whole channel.
- **Mixed gate marker** rendered as half-red/half-white circle (today both
  channel halves are striped, but the gate marker itself is uniform navy).
- **Heart triangle orientation:** currently `triangle-up` (apex at top);
  classical layout has the apex pointing left-down toward G.
- **Centre identifier inside G** (just the letter "G", as in classical
  bodygraphs). No other centres are labelled.
- **Optional decorative human silhouette** behind the bodygraph (purely
  aesthetic, common in Rave-style apps).

## Known tech debt

- Files from the first commit ended up with macOS permissions that prevent
  the AI assistant's tools from modifying them. Current workaround: delete
  and recreate. Root cause not yet investigated.
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
