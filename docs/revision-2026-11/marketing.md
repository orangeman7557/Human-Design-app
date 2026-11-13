# Revisión MARKETING / SEO / DISTRIBUCIÓN — hdchart.app 1.5.7

## 1. Nota: 5/10
La base técnica es buena (prerender por idioma, canonical, hreflang, OG, JSON-LD, noindex en cartas compartidas) y el mensaje "gratis, sin registro" es claro. Pero hoy el sitio es invisible: 4 URLs indexables, ~220 palabras de texto en la home, ninguna medición de adquisición y el dominio no aparece en buscadores. Para un proyecto personal con 7 usuarios es razonable; para "listo para que lo usen otros" falta lo mínimo para ser encontrable y medible.

## 2. Fortalezas
- HTML prerenderizado correcto en `/en` y `/es`: title, description, canonical propio, hreflang en/es/x-default, OG completo (1200x630), twitter card, JSON-LD WebApplication gratis.
- Raíz → 307 a `/en` (negociación por idioma); `robots.txt` Allow + sitemap; sitemap con hreflang.
- Cartas compartidas con `x-robots-tag: noindex, nofollow` (verificado con curl en `/en/chart?d=x`) — bien para privacidad.
- Cabeceras de seguridad y HTTPS; PWA instalable.
- Dos ángulos reales que ninguna competidora combina: sin registro/sin email + datos solo en el dispositivo + enlace de carta legible por IA; bilingüe con contenido propio.
- Analítica propia sin cookies ni terceros, coherente con la política de privacidad.

## 3. Hallazgos

**MKT-1 — El dominio no está en ningún buscador / sin Search Console.** Qué: `site:hdchart.app` no devuelve ninguna página (WebSearch, 13-nov-2026); el motor usado es limitado, así que es indicio, no prueba. Evidencia: búsqueda; BACKLOG Fase 11 nivel 0 sigue ⬜. Impacto: alto. Esfuerzo: S. Propuesta: verificar dominio en Google Search Console (registro DNS en Cloudflare), enviar sitemap, "solicitar indexación" de `/en` y `/es`; lo mismo en Bing Webmaster (importa también para ChatGPT/Copilot). Confianza: media.

**MKT-2 — Contenido indexable casi nulo en la home.** Qué: el HTML prerenderizado tiene ~219 palabras; el "¿Qué es el Diseño Humano?" está tras un modal (WebFetch ve el encabezado sin cuerpo). La enciclopedia de `lib/hd/content` no se publica. Evidencia: `curl /en` + WebFetch; `WhatIsHD.svelte`; BACKLOG:696+. Impacto: alto. Esfuerzo: S–M. Propuesta: incluir en el HTML (visible o `<details>`) 300–400 palabras: qué es HD, qué calcula, privacidad, FAQ de 4–5 preguntas (con JSON-LD FAQPage opcional). Confianza: alta.

**MKT-3 — En español el keyword principal no está en title/H1.** Qué: title `Human Design Chart — calcula tu carta gratis, sin registro`; H1 "Human Design Chart" en ambos idiomas; ES busca "diseño humano" (ES `seo.description` usa "Human Design"). Evidencia: `ui/es.js:13-16`, curl `/es`. Impacto: medio. Esfuerzo: S. Propuesta: ES title "Carta de Diseño Humano gratis, sin registro — Human Design Chart"; descripción con "carta de Diseño Humano"; H1 ES "Calcula tu carta de Diseño Humano". Confianza: alta.

**MKT-4 — Sin medición de adquisición.** La analítica propia mide uso, no origen. Solución: MKT-1 + (opcional) Cloudflare Web Analytics. Impacto: medio. Esfuerzo: S. Confianza: alta.

**MKT-5 — Nivel 1 (páginas de referencia) es el único multiplicador, pero mal calibrado como "400-600 páginas".** Ver sección 5 del plan abajo. Impacto: alto (si se hace pequeño). Esfuerzo: M. Confianza: media.

**MKT-6 — Metadatos menores.** `og:image` único (sin imagen por idioma ni por elemento); JSON-LD con `priceCurrency: EUR` irrelevante; `offers` sin uso; autor con nombre propio en JSON-LD (decisión del autor, solo comprobar que lo quiere público). `x-default` apunta a `https://hdchart.app` que redirige 307 (aceptable, mejor 302 documentado o que x-default sea `/en`). Impacto: bajo. Esfuerzo: S. Confianza: media.

**MKT-7 — Sin página "enlace legible por IA" explicada.** El diferencial (pegar el enlace en ChatGPT) no tiene página pública que lo explique, ni capturas ni ejemplo. Es el único contenido que podría enlazarse/citarse. Impacto: medio. Esfuerzo: S. Propuesta: una página `/en/ai` y `/es/ia` de ~400 palabras con ejemplo de carta de demo. Confianza: media.

## 4. Comparativa (solo páginas públicas, 13-nov-2026)

| Sitio | Gratis | Registro/email | Idiomas | Referencia indexable | Punto débil |
|---|---|---|---|---|---|
| MyBodyGraph | cuenta gratis: cartas ilimitadas, 40.000 celebridades, diccionario | cuenta para crear carta | no indicado | no pública (dentro de la cuenta) | muro de cuenta; planes de pago |
| humandesignhd.com | carta sin cuenta | no | no indicado | 5 tipos + 12 perfiles; puertas/canales solo como resumen | upsell agresivo (informes 19,99–199 USD) |
| bodygraph.io | cálculo sin cuenta; biblioteca/transits con cuenta gratis | no para calcular | no indicado | /knowledge, /glossary, sin patrón por puerta | muchas funciones de pago (4,50–16,90/mes) |
| freehumandesignchart.com | carta gratis | probable email (ebook) | inglés | artículos sueltos (canales, tipos) | monetiza cursos; orientado a captar correo |
| GetHumanDesign | 15 cartas/semana, chat IA limitado | sí (Apple/Google/email) | 10+ | docs/KB | registro, límites |
| Jovian Archive (referencia oficial) | carta gratis (según fuentes) | cuenta; URL probada devolvió 404 | EN | — | no verificado |
| **hdchart.app** | todo, sin límites | **no** | **EN + ES** | **no** (4 URLs) | sin autoridad, sin contenido |

Dónde gana: sin registro ni email, privacidad real (todo local), bilingüe de verdad, informe y prompts para IA, calidad de textos, PWA offline, sin upsell. Dónde pierde: autoridad de dominio, contenido indexable, transits/compuesta/celebridades, descubribilidad, prueba social. Búsquedas: la primera página de "free human design chart" está llena de sitios con años (y spam); no puedo dar volúmenes.

## 5. Posicionamiento propuesto
Qué dice hoy: "Calcula tu carta de Diseño Humano — gratis, sin registro." Correcto pero genérico (lo dicen todos); falta lo propio.

- ES: **«Tu carta de Diseño Humano, gratis y solo tuya: sin registro, sin correo, sin que tus datos salgan de tu dispositivo. Y llévala a tu IA con un enlace.»**
- EN: **"Your Human Design chart, free and private: no signup, no email, your birth data never leaves your device. Then take it to your own AI with one link."**

Argumentos: (1) Sin cuenta ni correo; el cálculo ocurre en tu navegador. (2) Funciona offline y se instala como app. (3) Enlace/prompts listos para tu asistente de IA; informe en lenguaje llano en ES y EN.
Evitar afirmar "preciso" sin matices; sí "validado contra cartas de referencia" (hay tests).

## 5b. Crítica de la Fase 11
Orden: 0 → 1 → 2 → 3 → 4 está bien en espíritu, con ajustes:
- **Subir a Nivel 0 el texto de la home** (MKT-2/3): coste horas, ayuda ya.
- **Nivel 1 recortado.** Realismo: sitios con autoridad llevan años con páginas por puerta; un dominio nuevo sin backlinks tarda meses y probablemente no pase de la página 3 en consultas genéricas. La cola larga ("canal 34-57", "cruz de encarnación del edén") es más disputable, y con texto por IA/plantilla existe riesgo de contenido fino/duplicado entre idiomas. El objetivo de ≥500 palabras y 30-40% diferenciación es un listón inventado por blogs SEO, no una regla de Google; lo que importa es que la página aporte algo único. Recorte mínimo que merece la pena: **solo 5 tipos + 7 autoridades + 12 perfiles + 9 centros (≈33 páginas × 2 idiomas)** y **64 puertas** solo si las páginas componen esencia + centro + canales + líneas + enlaces cruzados. Dejar fuera canales y las 192 cruces hasta ver datos de Search Console. Cada página con CTA a la calculadora y enlaces internos. Plantilla única prerenderizada con `[lang=locale]` ya existente (reutiliza i18n); riesgo de sangrado de locale en prerender (regla de oro del CLAUDE.md). Publicar sitemap por tipo. Medir 8–12 semanas antes de ampliar.
- **Nivel 2:** con presupuesto cero y 7 usuarios, Product Hunt/Show HN rinden poco para una calculadora de nicho; omitir PH, hacer solo directorios gratuitos y AlternativeTo (backlinks).
- **Nivel 3:** es el canal con más sentido, pero con cuidado (autopromoción mal vista).
- **Añadir:** metadatos por idioma, una página explicando el enlace para IA, y registrar la app en directorios de PWA.
- **Nivel 5 (OG por carta/puerta del día):** ya hay OG por carta; es el mejor motor viral barato.

## 6. Instrumentación mínima
- Search Console + Bing Webmaster: gratis, sin script en el sitio (verificación DNS); **no cambian la política de privacidad**.
- Ya existe analítica propia (`src/lib/analytics.js`, `/api/stat`, `/stats` solo en staging): suficiente para uso. No añadir Google Analytics.
- Cloudflare Web Analytics (sin cookies, sin PII) añadiría referrers/países/páginas; es opcional y duplica parcialmente lo propio. Si se activa, actualizar `l5`/`p5` de la política (hoy dice "no third parties": Cloudflare ya es el host, pero hay que mencionarlo). Mi recomendación: no activarlo; añadir a la analítica propia un contador de `document.referrer` por dominio (sin guardar URL completa).

## 7. Canales y franqueza
Merecen la pena: (1) Search Console; (2) Discord/Reddit de HD con el ángulo "sin registro + enlace para IA"; (3) AlternativeTo y directorios PWA; (4) Play Store (Fase P, otro revisor). Pérdida de tiempo: Product Hunt/Show HN (público técnico, tema de nicho), campañas de pago, redes sociales propias, newsletters, backlinks comprados.

## Plan en 3 escalones
- **Mínimo (S, ~1 día):** Search Console + Bing + sitemap; texto indexable en home + FAQ (MKT-2); title/H1 ES (MKT-3); nuevo posicionamiento.
- **Si hay ganas (M, 1–3 días):** páginas de tipos/autoridades/perfiles/centros y 64 puertas en ES/EN; página del enlace para IA; AlternativeTo; un post útil en un foro de HD.
- **Solo si despega (L):** canales y cruces, OG por elemento, Play Store, contenido continuo, revisar Cloudflare Web Analytics.

## 8. No he podido comprobar
- Indexación real en Google/Bing (el buscador usado es limitado; `site:` sin resultados no es concluyente) ni posiciones, volúmenes o tráfico.
- Idiomas de MyBodyGraph, Jovian Archive (URL probada 404) y otras competidoras; si exigen correo en el flujo real (no creé cuentas).
- Uso real de Search Console, el sitemap en producción y el JSON-LD de `/es`.
- Contenido del modal "¿Qué es el HD?" (WebFetch no lo mostró; no verifiqué si está en el DOM prerenderizado).
