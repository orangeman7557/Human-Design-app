# Human Design Chart App

PWA gratuita y open-source para calcular, guardar y consultar cartas de Human Design.

## Estado

En desarrollo. Fase 0 (infraestructura y esqueleto) en curso.

## Stack

- **SvelteKit** (modo SPA, static adapter) — framework
- **swisseph-wasm** — cálculo astronómico (Swiss Ephemeris compilado a WebAssembly)
- **SVG** — renderizado del bodygraph
- **Dexie.js** sobre IndexedDB — almacenamiento local en el navegador
- **Nominatim** (OpenStreetMap) — autocomplete de ciudades
- **tz-lookup** — zona horaria histórica por coordenadas

## Hosting

[Cloudflare Pages](https://pages.cloudflare.com/), gratis, auto-deploy en cada push a `main`.

Configuración esperada en Cloudflare Pages:

- Build command: `npm run build`
- Build output directory: `build`
- Node version: 20

## Desarrollo local (opcional)

Pensado para uso sin tener que tocar el código, pero si quieres correrlo en local:

```bash
npm install
npm run dev
```

Y abrir [http://localhost:5173](http://localhost:5173).

## Licencia

[AGPL-3.0-or-later](./LICENSE). El uso de Swiss Ephemeris en modo libre obliga a esta licencia. Cualquier distribución (incluida la versión web pública) debe ofrecer el código fuente.

## Plan en fases

1. **Fase 0** — Esqueleto y deploy automático.
2. **Fase 1** — Formulario de datos de nacimiento, autocomplete de ciudad, cálculo astronómico, bodygraph funcional.
3. **Fase 2** — Guardado local, lista de cartas, export/import a fichero.
4. **Fase 3** — Pulido visual (estilo clásico fiel) y modo "hora desconocida".
5. **Fase 4** — Composite (comparativa visual de dos cartas) + exportar a imagen.
6. **Cierre** — Estabilización + opcional empaquetado TWA para Google Play.
