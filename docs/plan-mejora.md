# Plan de mejora — revisión global de la 1.5.7

Sale de la revisión global del 2026-11-13 (seis frentes: código, rigor de Diseño Humano, diseño/UX, textos, marketing, producto). Los informes completos, con la evidencia de cada hallazgo, están en [`revision-2026-11/`](./revision-2026-11/).

**Este fichero es la lista de trabajo.** Se trabaja de arriba abajo, una pieza por turno. Al cerrar una pieza se marca `[x]` y se anota la versión o el commit; no hace falta leer los informes salvo para la pieza que se esté haciendo.

## Cómo leerlo

- **Esfuerzo:** S = horas · M = 1–3 días · L = una semana o más.
- **✔ verificado:** comprobado en el código o en vivo durante la síntesis. Lo que no lleva ✔ es lo que informó el revisor: **confirmarlo antes de arreglarlo**.
- **⚠ discrepa:** choca con una decisión que el autor ya tomó a propósito; no se hace sin que él lo reabra.
- El ID remite al informe del frente: `COD` → `codigo.md`, `HD` → `hd.md`, `UX` → `ux.md`, `TXT` → `textos.md`, `MKT` → `marketing.md`, `PRO` → `producto.md`.

## Notas de partida

| Frente | Nota | Resumen |
|---|---|---|
| Rigor HD | 8 | Cálculo y doctrina correctos; falla cómo entra la hora y que no se muestra la incertidumbre |
| Diseño y UX | 7,5 | Visual 8,5 · accesibilidad 6 |
| Textos | 7,5 | Español 7 · inglés 8,5; rigidez localizada |
| Código | 7 | Núcleo testeado; un 500 evitable, ficheros enormes, cero aviso de errores |
| Producto | 7 | Completo; falta decidir qué no se hará |
| Marketing | 5 | SEO técnico correcto; sitio invisible |

## Decisiones pendientes del autor

- [x] **Play Store (Fase P):** ¿aparcar? Cuenta personal nueva = 12 testers durante 14 días seguidos, nombre legal público, reconstrucción anual. Recomendación: aparcar. — **resuelta: aparcada** (autor, 2026-11-13).
- [ ] **Guardado en línea (Fase 10):** ¿descartar? Recomendación: sí.
- [ ] **PRO-7 y UX-4** (las dos marcadas ⚠): ¿se reabren?
- [ ] **Textos en español:** confirmar el método (mecánico primero; luego tipo/estrategia/autoridad en tandas de un bloque).

---

## 1. Ahora — barato y de alto valor

- [x] **COD-1** ✔ · S · Enlace compartido con fecha imposible da **error 500** (probado en vivo: `?d=19901399&la=…&lo=…`). `chartProfile` en `hooks.server.js` llama a `computeChart` sin capturar; `decodeBirth` solo valida dígitos. Capturar → `null`, validar mes/día, test con basura. — hecho 2026-11-13, pendiente de validación del autor
- [x] **HD-1** ✔ · M · La **hora desconocida** no sale del formulario: carta, guardado, enlace e informe la tratan como exacta. Guardar la marca, avisar en carta e informe, separar lo estable de lo variable («perfil 3/5 o 3/6»), añadir perfil y autoridad a las bandas del deslizador. — hecho 2026-11-13, pendiente de validación del autor
- [x] **HD-2a** ✔ · S · Se resolvió corrigiendo los desfases anteriores a 1970 de forma invisible (`localToUtc` en `timezone.js`) en vez de mostrar la zona y el desfase y dejar corregirlos. Quedan sin corregir Luxemburgo, Mónaco y zonas de África/Caribe, y falta cotejar con la base tz oficial las fechas de verano de Países Bajos 1916–1925, Islandia 1917–1946 y Dinamarca 1946–1948. — hecho 2026-11-13, pendiente de validación del autor
- [x] **UX-3** · S · **Objetivos táctiles** a 44 px sin cambiar el dibujo, empezando por la «i» (17×17), «¿Qué es el Diseño Humano?», «Hora desconocida» y el pie. (nota: no todos llegan a 44 px; las «i» quedan en 30–44) — hecho 2026-11-13, pendiente de validación del autor
- [x] **UX-1** · M · **Números de puerta** legibles en móvil (~6 px; contraste 2,5:1 sobre rojo, 1,3:1 sobre la Raíz): número claro con halo en centros oscuros o fuente de 8–9 px. (nota: contraste corregido en ámbar y rojo, tamaño de 17 a 19; siguen siendo pequeños) — hecho 2026-11-13, pendiente de validación del autor
- [ ] **MKT-1** · S · *(lo hace el autor)* Alta en **Search Console y Bing Webmaster**, enviar sitemap, pedir indexación de `/en` y `/es`.
- [x] **MKT-3** ✔ · S · En español, **título/H1/descripción con «Diseño Humano»** (hoy dicen «Human Design»). — hecho 2026-11-13, pendiente de validación del autor
- [x] **COD-9** ✔ · S–M · **Adelgazar la documentación de trabajo** (TASKS 1.206 líneas, BACKLOG 1.979): versión vigente corta + archivo; CLAUDE.md al día (no menciona `/api/stat`, `/stats`, `lib/analytics.js`) y sin mandar leerlo todo cada sesión. — hecho 2026-11-13, pendiente de validación del autor
- [x] **PRO-1** · S · Cerrar la decisión de Play Store (ver arriba). (Play Store aparcada) — hecho 2026-11-13, pendiente de validación del autor

## 2. Siguiente

**Rigor HD**
- [ ] **HD-D** · S · Detalle de la definición: qué centros forman cada grupo y qué puertas cerrarían la partición.
- [ ] **HD-3** · S–M · Aviso de «sensible a la hora»: recalcular a ±5 min y marcar lo que cambia (22,6 % de las cartas cambia alguna puerta o línea).
- [ ] **HD-4** ✔ · S · Horas ambiguas o inexistentes por cambio de hora: preguntar en vez de elegir en silencio.
- [ ] **HD-6** · S · Sustituir `tz-lookup` (2020) por una versión mantenida + test de ciudades fronterizas.
- [ ] **HD-5** · S · Limitar o avisar el rango de años del formulario (hoy 0001–9999).
- [ ] **HD-7** ✔ · S · Autoridad de Ego: distinguir manifestada y proyectada.

**Diseño y UX**
- [ ] **UX-2** · S · Microtexto y estados apagados hasta 4,5:1 de contraste.
- [ ] **UX-5** · M · Carta para novatos: frase en llano arriba, «En tu carta: definido/indefinido» al abrir un centro, encabezados claros en Activaciones.
- [ ] **UX-6** · S · Cabecera compacta fija (volver + ☰) y confirmación de guardado que no tape el título.
- [ ] **UX-8** · S · Ciudades en el idioma de la ruta y sin duplicar ciudad/provincia.
- [ ] **UX-4** ⚠ · S · Nombre accesible de la «i» («Información: Garganta») y marca en la chip del tipo propio. *(Abrir el drawer al primer toque discrepa de la decisión de la 1.5.5.)*
- [ ] **UX-7** · S · Errores del formulario en línea, no con la burbuja nativa.
- [ ] **UX-9** · S · No pintar «aún no hay cartas» hasta que responda la base de datos.
- [ ] **UX-10** · S · Regla global de movimiento reducido; auditar `outline: none`.

**Textos**
- [ ] **TXT-A** (TXT-6) · S · Limpieza mecánica: raya española y «37 %».
- [ ] **TXT-B** (TXT-1, 2, 5) · M · Reescritura dirigida de `type`, `strategy`, `authority`: dobletes, calcos, incisos.
- [ ] **TXT-3** · M · Muletillas en todo el pack («de verdad» ×50, «conviene» ×29, «No es X, es Y»): lista por búsqueda y decidir caso a caso.
- [ ] **TXT-2 / TXT-7** · S · Chrome: «reporte», «Email», «Si encuentras la app útil»; unificar «yo»/«nosotros».
- [ ] **TXT-4, 8, 9, 10, 11** · S · Ecos, voz en `concept.*` («en tu carta»), «consciencia/conciencia», cuatro frases en inglés, tooltips crípticos.

**Marketing**
- [ ] **MKT-2** · S–M · 300–400 palabras visibles en la home + 4–5 preguntas frecuentes.
- [ ] **MKT-P** · S · Nuevo mensaje de la home (sin registro, sin correo, datos en el dispositivo, enlace para IA).
- [ ] **MKT-7** · S · Página que explique el enlace legible por IA, con carta de ejemplo.

**Código y robustez**
- [ ] **PRO-5** · M · Plan B si cae Photon: entrada manual de coordenadas/zona o segundo proveedor.
- [ ] **COD-5** · S · Contadores anónimos de error en la analítica propia.
- [ ] **COD-3** ✔ · S · Avisar cuando la copia en cookie se llena (~11 KB); medir el techo real.
- [ ] **COD-2** · S · Una única `validateBirth()` para importar, enlace, bóveda y formulario.
- [ ] **PRO-7** ⚠ · S · Frase en la política sobre los datos que viajan en el enlace compartido. *(Aceptado a propósito el 2026-07-22.)*

## 3. Más adelante — solo con ganas o con datos que lo pidan

- [ ] **MKT-5** · M · Páginas de referencia **recortadas**: tipos, autoridades, perfiles y centros (~33 por idioma); puertas solo si cada página compone esencia + centro + canales + enlaces. Medir 8–12 semanas antes de seguir.
- [ ] **Fase 9 — Tránsitos** · M · Único motivo real para volver a la app.
- [ ] **Fase 8 — Carta compuesta**, versión mínima · M–L.
- [ ] **HD-2b** · M · Lo que queda de HD-2: corregir de verdad las zonas pre-1970 aún sin corregir (Luxemburgo, Mónaco, África/Caribe) con tabla de excepciones o tiempo medio local, y cotejar con la base tz oficial NL 1916–1925, IS 1917–1946 y DK 1946–1948.
- [ ] **COD-4** ✔ · L · Trocear los ficheros gigantes (carta 2.785 líneas, home 2.296) de forma oportunista, al tocar cada zona.
- [ ] **COD-T** · M · Cinco tests de más red (ver `codigo.md`).
- [ ] **COD-6, 7, 8** · S–M · CSP en modo informe, control de origen en `/api/love`, mensaje «recarga para actualizar».
- [ ] **PRO-6** · S · Documentar la procedencia de los 192 nombres de cruces y un plan de retirada.
- [ ] **PRO-4** · S · `MANTENIMIENTO.md` de una página (dominio, despliegue, servicios de terceros).
- [ ] **HD-L** · L · Textos de las 384 líneas, circuitos, retornos.

## 4. Aparcado o descartado

- **Fase P — Play Store:** aparcada hasta tener 12 testers. Si se retoma: `assetlinks.json` (✔ no existe), capturas en el manifest, `start_url` sin redirección (COD-10).
- **Fase 10 — Guardado en línea:** descartada (cuentas, RGPD, mantenimiento).
- **Product Hunt, Show HN, anuncios, redes propias:** poco rendimiento para el nicho.
- **Variables, PHS, Quirón:** avanzado, en parte propietario, exige hora casi exacta.

*(Las dos primeras quedan así a falta de la confirmación del autor.)*

## Sin revisar

iPhone y Android físicos · lector de pantalla y navegación completa por teclado · modo hora desconocida en la interfaz · modales del pie · el 85 % del contenido en español y casi todo el inglés · zonas horarias en navegadores reales · indexación real en Google/Bing.
