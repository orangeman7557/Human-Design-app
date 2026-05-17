# Backlog

Deliberately deferred decisions and candidate improvements. Not an ordered
roadmap — just a list of things we know exist and will want to tackle at
some point.

> Note: this project is being implemented with AI assistance. All code,
> comments, and documentation are produced collaboratively between orangeman7557 (the
> author and decision-maker) and an AI coding assistant.

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

## Known tech debt

- Files from the first commit ended up with macOS permissions that prevent
  the AI assistant's tools from modifying them. Current workaround: delete
  and recreate. Root cause not yet investigated.
- A handful of older source files still carry Spanish code comments from
  Phase 0/1.1. They get translated to English as they're touched.
- The Nominatim integration uses the public endpoint without an explicit
  User-Agent. For low traffic this is fine; if the app grows, we should
  switch to a self-identifying header or a self-hosted Nominatim mirror.
- `src/lib/geo/nominatim.js` is misnamed: it now backs onto Photon
  (better at autocomplete) rather than Nominatim. Rename to `geocoder.js`
  in a cleanup pass.
