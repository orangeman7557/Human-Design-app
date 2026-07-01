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

Last updated: 2026-07-01.

> Latest change (2026-07-01, «Sobre esta carta» en puertas/canales): **vuelve el
> ángulo «Sobre esta carta» a los drawers de puertas y canales, con prompt según el
> estado.** Antes (decisión de Fase 6.D) solo aparecía «Info general» salvo que el
> elemento estuviera activo. Ahora la sección «Saber más usando IA» ofrece **ambos
> ángulos para cualquier puerta y canal**, y el prompt de «Sobre esta carta» dice
> **cómo está el elemento en la carta**: una puerta como *forma parte de un canal
> completo* / *colgante* / *inactiva*; un canal como *completo* / *medio canal* /
> *inactivo*. Implementado exportando `gateState` y añadiendo `channelState` en
> `content/index.js`, y reconstruyendo los prompts `gate`/`channel` en `prompts.js`
> (`gateChartSubject`/`channelChartSubject`). De paso, confirmado que el **nombre
> del PDF ya coincidía con el del PNG** (misma base, extensión `.pdf`): no requería
> cambio. Verificado: 16/16 tests + navegador (casos completo/colgante/inactiva y
> completo/medio/ninguno).
>
> Previo (2026-07-01, informe en 2ª persona): **reescritura del informe
> a segunda persona tras la lectura del autor.** Las secciones personalizadas
> (Tu tipo, Tu estrategia, Tu autoridad, Tu perfil, Tu definición y el estado de
> los centros) reutilizaban los textos generales que alimentan los drawers de la
> «i» —escritos en 3ª persona impersonal a propósito (la carta puede ser de otra
> persona)—, lo que producía un choque de voz tras los *lead-in* en 2ª persona
> («Tu estrategia es…» → «**La estrategia del Manifestador.** Como **su** energía…»)
> y dejaba el estado de cada centro sin contexto. Solución: el informe estrena
> **cuerpos propios en 2ª persona** (conversión fiel, mismo significado) en un
> espacio nuevo `report.{type,strategy,authority,profile,definition,center}` de
> `es.js`; los bloques compartidos y los drawers **siguen impersonales** (sin
> regresión). `report.js` los consume vía `getReportBody`/`getReportProfile`;
> `getCenterReport` devuelve el estado en 2ª persona con contexto («Es uno de tus
> centros **definidos/abiertos**: …»). El `fn` del centro (qué *es* el centro)
> sigue siendo general. Verificado: 16/16 tests + navegador (informe en 2ª persona
> y coherente; drawers intactos). Backlog: añadida la mejora de **etiquetas de
> centros sobre el bodygraph** (o línea que una chip↔figura).
>
> Previo (2026-06-30, informe en PDF): **botón para descargar el informe
> en PDF.** Nuevo botón «PDF» (píldora dorada) en la cabecera del informe, arriba
> a la derecha junto a la ✕. Genera un PDF (oscuro, con los tokens de la app) con
> una **portada** —cabecera con nombre + fecha·lugar **centrados**, las tarjetas
> de datos (tipo, estrategia, autoridad, perfil, definición, centros) y el
> **bodygraph**— seguida del **informe como texto** seleccionable (títulos en oro,
> negrita/cursiva, subtítulos «Tú eres un…», tarjetas de centros con etiqueta
> definido/abierto). **Sin** la sección «Saber más»/handoff (queda solo en el
> overlay, no en el documento). Implementación: nuevo `src/lib/hd/report-pdf.js`
> que maqueta con **jsPDF** (importado de forma diferida para no pesar en el
> arranque; `compress: true`); la portada reutiliza la captura `html-to-image` con
> un modo **`summaryOnly`** que recorta hasta el bodygraph (descarta
> canales/puertas/activaciones, que van como texto) y una clase **`pdf-shot`** que
> fuerza el **layout de escritorio también en móvil** (un PDF es un documento, no
> la pantalla del móvil). `jspdf` añadido a `dependencies` (instalado en el
> checkout principal). Verificado: 16/16 tests + navegador (portada centrada e
> idéntica en móvil y escritorio, informe de 6 páginas sin «Saber más», ~360 KB
> con portada).
>
> Previo (2026-06-30, ajustes 2): **más pulido del informe + fix de
> overflow.** (1) **Tipos**: un subtítulo «Tú eres un X» marca el salto del
> colectivo a tu tipo concreto (la transición se entendía mal). (2) **Centros**:
> recorrido en el **orden canónico** del bodygraph (cabeza, ajna … sacral, raíz),
> no definidos-primero; se mantiene el diseño en pastillas. (3) **Enlaces entre
> secciones**: nuevo tipo de enlace `section:` que hace scroll dentro del informe
> (en «Vivir tu diseño», estrategia/autoridad enlazan a sus secciones; además
> enlazadas las menciones cruzadas en hormigas→tipos, condicionamiento→
> experimento, colectivo→intro, experimento→estrategia/autoridad). (4) **Prompt
> final**: cajetín más alto por defecto (`min-height: 5rem`) y el prompt abierto
> acaba en «…sobre...». (5) **Botón de informe**: tooltip `data-tip="Informe"`
> (como descargar/exportar). (6) **Bug de scroll horizontal en móvil**: lo
> causaba la **tabla de Activaciones** (intrínsecamente más ancha que 375px por
> la columna Peso, preexistente), no la cabecera ni el informe; se envuelve en un
> contenedor con scroll horizontal propio (`.acts-scroll`) para que no empuje el
> ancho de la página (en escritorio no se nota). Anotada en BACKLOG la **revisión
> de textos de toda la app** pendiente. Verificado: 16/16 tests + navegador
> (overflow 0, subtítulo, orden de centros, scroll de enlaces, prompt) sin
> errores. Commit a main.
>
> Previo (2026-06-30, pulido del informe): **ajustes de UX y contenido
> tras revisar el informe.** (1) **Bug de cabecera**: el nombre largo de la carta
> se trunca con «…» (h1 `flex`+ellipsis) sin desplazar ni pisar los botones de la
> derecha; en la exportación PNG el título se centra como antes. (2) **Drawers de
> centro**: título en forma corta («Garganta», no «Centro de la Garganta»; el
> eyebrow ya pone «Centro»). (3) **Informe**: botón icono-solo; título principal
> **«Conoce tu diseño»**; títulos de sección en **dorado** (mejor jerarquía,
> menos «ladrillo»); menos negrita (1-2 por sección en el texto propio).
> Reestructura del índice/secciones: las hormigas se integran como párrafo de
> «Qué es Human Design» (con presentación y referencia a los tipos); «Un
> experimento vital» (título «Human Design como experimento vital») va el
> segundo, sin entrar aún en centros; «La carta»→«Bodygraph» (menciona también
> las puertas); colectivo+tipo → **«Tu tipo: X»**; condicionamiento+centros →
> **«Tus centros y tus condicionamientos»** (enlace al desacondicionamiento + los
> nueve centros como **tarjetas con chip** y estado real); «Tu definición: split»
> muestra la variante; «En la práctica»→**«Vivir tu diseño»** arranca con un
> claim sobre estrategia+autoridad; la autoridad arranca con «tu manera correcta
> de tomar decisiones». (4) **«Saber más»** (antes «Tu IA»): handoff igual que en
> los drawers, solo ángulo «Sobre esta carta», con el **prompt visible por
> defecto** (editable/ocultable) y prefijado con lo esencial de la carta en
> primera persona y abierto («…Me gustaría saber más sobre »). (5) **Botones de
> cabecera**: el botón de informe pasa a forma **cuadrada-redondeada dorada**
> (igual que descargar/exportar, menos tipos de botón) y se coloca **junto al
> nombre** (no a la derecha; nombre + botón en un `.title-wrap`, truncado «…»
> intacto en escritorio y móvil); **«Guardar carta» pasa a icono en móvil** para
> ocupar menos. Verificado: 16/16 tests + navegador (truncado, drawer corto,
> informe completo, tarjetas, enlaces, handoff, cabecera en escritorio/móvil) sin
> errores. Commit a main.
>
> Previo (2026-06-30): **Fase 7 — Informe inicial construido y
> verificado (pendiente la revisión de textos del autor) + enriquecimiento de
> puertas/canales (Fase 6.D follow-up).** (1) **Puertas/canales con contenido
> propio**: las 64 puertas estrenan una "esencia" de 2-3 frases (tema del
> hexagrama de dominio público + función del centro + don/sombra), en voz
> neutra, en `content/es.js` (`gate`, con `theme` para componer canales).
> `getGateInfo`/`getChannelInfo` añaden una **coda personalizada de 3 estados**
> según la carta: puerta *completa* (en canal), *colgante* (activa sin su otra
> mitad → se completa de forma puntual con personas o tránsitos) o *inactiva*;
> el canal, *completo* / *medio canal* / *ninguno*. Cierra la deuda de BACKLOG
> "Gate & channel info text is too thin". (2) **Informe inicial (Fase 7)**:
> overlay `InitialReport.svelte` abierto por un botón **«Informe»** junto al
> nombre de la carta; capa de ensamblaje `src/lib/hd/report.js` (`buildReport`)
> que arma ~13 secciones desde el chart — Parte A general (qué es HD + analogía
> de las hormigas + bodygraph/centros + condicionamiento + desacondicionamiento),
> Parte B personalizada (tipo + lugar en el colectivo, estrategia,
> autoridad=decisiones, energía/trampa/señales por tipo, perfil, definición,
> recorrido de los 9 centros con su estado real) y Parte C (handoff de carta
> completa: «Abrir IA» / «Copiar prompt»). Reutiliza la biblioteca de Fase 6 +
> bloques nuevos `report`/`typeReport` en `es.js`; los enlaces internos abren
> los drawers de elemento. Arquitectura **híbrida** (estático determinista +
> handoff). (3) **Split de centros**: cada centro en `es.js` pasa de
> `paragraphs` a `{ fn, defined, open }` para que el informe muestre solo el
> estado de la carta; `getElementInfo` recompone función+ambos estados para el
> chip "i" (sin regresión). (4) `renderInline` extraído a `src/lib/markup.js`
> (compartido por `ElementInfo` y el informe). Verificado: 16/16 tests y en
> navegador (chip de centro, informe completo, enlaces internos, handoff) sin
> errores de consola. Spec en `docs/informe-inicial.md`. Pendiente solo la
> **revisión de textos del autor** (64 esencias + bloques del informe) y,
> opcional, el bump a 0.2.0. Versión sigue 0.1.1. Falta el commit a main de
> este lote.
>
> Previo (2026-06-24): **Estabilización post-MVP: tests del núcleo,
> diálogos propios, autocompletado por prefijo, flecha y «ciudad, país».**
> (1) **Tests del núcleo de cálculo** — primera suite automatizada con
> `vitest` (instalado en el checkout principal; `npm test`). Congela las dos
> cartas de referencia: **Reflector** (1984-01-30 01:00 Madrid) y la **del
> autor** (1984-03-13 09:30 Madrid) —
> tipo/estrategia/autoridad/perfil/definición, centros y las 26 activaciones
> (gate.line)— más un **guard del bug del nodo lunar** (el nodo Sur de diseño
> del Reflector debe quedar en puerta 5, no 26) y límites de `longitudeToGate`
> y `cityCountry`. 16 tests, 2 ficheros. (2) **Diálogos nativos → propios**:
> `dialog.svelte.js` (controlador basado en promesas) + `Dialog.svelte` (host
> único en el layout) con fallback nativo; cableado en guardar (carta) y
> renombrar/borrar/importar (home). (3) **Autocompletado**: de Nominatim a
> **Photon** para typeahead real por prefijo («madr»→Madrid, «stuttg»→
> Stuttgart) y solo asentamientos (fuera regiones/condados y labels
> duplicados). El revert previo de Photon fue por enviar `lang=es`→**HTTP
> 400**; ahora se omite (CORS `*` verificado). El fichero `nominatim.js` se
> renombró a **`geocoder.js`** (imports/comentarios/docs al día). (4)
> **Flecha de volver**: el glifo «←» descentrado pasa a **SVG centrado por
> flexbox** (a juego con compartir/descargar; dx=dy=0 en móvil). (5) **Retry
> ~8× del efecto de cálculo**: ya estaba resuelto (el cálculo se movió de un
> `$effect` a `onMount`); sin cambios. (6) **«Ciudad, país»**: helper
> compartido `cityCountry` en `src/lib/geo/place.js` — el subtítulo de la
> carta ya recortaba a ciudad+país, pero la **lista de cartas guardadas**
> mostraba el label completo con la región; ahora ambos muestran **ciudad +
> país** (sin región/condado). (7) **Docs sincronizados** con todo lo
> anterior: `CLAUDE.md`, `README.md`, `TASKS.md` y `BACKLOG.md` (geocoder →
> Photon, tests automatizados, diálogos propios, roadmap renumerado a
> Fase 7 informe inicial / 8 composite / 9 tránsitos / 10 sync). Commits a
> `main`. Versión sigue 0.1.1.
>
> Previo (2026-06-22): **Pulido de Fase 6 (validado) + roadmap.**
> (1) **Bug de la «i» arreglado**: en móvil la «i» se quedaba colgada al
> cambiar de elemento (centro→canal/puerta) y la de canal/puerta no salía al
> tocarla; raíz en que los chips de canal/puerta solo hacían `pin()` sin tocar
> el reveal y en que el reveal del centro se toggleaba aparte de la selección.
> Ahora el reveal va **acoplado a la selección** (`revealForPinned`) y
> canal/puerta pasan por `onChipClick`; el toque de centro en el SVG también
> limpia reveals. (2) **«i» de concepto** movida de la esquina del cajetín a
> junto al título (como en canales/puertas/activaciones); corregido además el
> **line-shift** al revelar la «i» inline (`.dot-side` a altura 0, el punto
> desborda sin empujar la línea). (3) **Prompts reescritos** a un formato
> limpio y uniforme («En el marco de Human Design, ¿me explicas en detalle…?» /
> «…para un Generador, perfil 3/5, autoridad…, ¿…?»); **planetas** ganan ángulo
> «sobre esta carta» con sus dos activaciones. (4) **Ejemplo de activación**
> (30.3 en el Sol) añadido al texto explicativo. (5) **Footer** reducido a solo
> «acerca de» (sin subrayar); la versión y los términos de licencia pasan al
> **modal «Acerca de»** (retoques de copia). (6) **Roadmap**: nueva
> **Fase 7 — Informe inicial**; composite/tránsitos/sync → 8/9/10. Anotado en
> BACKLOG: **mejorar los textos de puertas/canales** (hoy demasiado escuetos).
> Commit a main de este lote. 0.2.0.
>
> Previo (2026-06-18): **Fase 6.F construida (ventana «Acerca de») +
> ajustes; para cerrar la fase solo queda tu revisión de textos.** (1)
> **«acerca de»**: el footer queda como `v{version} · source-available · free
> for noncommercial use · acerca de` (discreto, mismo tamaño/color de antes,
> «acerca de» en minúsculas y subrayado; los términos de licencia se quedan en
> inglés como tecnicismos). El enlace abre una **ventana modal ligera**
> (`src/lib/components/About.svelte`, home y carta), sin narrativa: *Creado por
> orangeman7557*, *Hecho con asistencia de IA*, *Proyecto independiente ·
> source-available (PolyForm Noncommercial 1.0.0)*, *Free for noncommercial
> use*, y disclaimers mínimos (sin afiliación, marcas de sus titulares,
> contenido divulgativo que **no sustituye asesoramiento profesional** — más
> por el mercado de EE. UU.). **«Reportar un fallo» desactivado** y, junto con
> **donar / invitar a un café**, queda pendiente en BACKLOG. *Bug corregido al
> construirlo:* el `footer` tenía `opacity: 0.6`,
> que creaba contexto de apilamiento y pintaba el modal semitransparente y
> atrapado bajo la página → ahora el footer se atenúa por **color**, no por
> opacity (en home y carta). (2) **Activaciones por defecto: 5 en vez de 3**,
> para que se vean los **Nodos** sin desplegar. (3) **Pasada a los textos**:
> suavizadas las referencias al **I Ching en puertas y canales** (el hexagrama
> sigue apareciendo, pero como apunte —«le corresponde el hexagrama N»— y no
> como «raíz / secuencia del rey Wen / dominio público / punto de partida»), y
> reducido el relleno de la info generada; el resto del núcleo se revisó y
> está correcto. **Pendiente del autor:** la revisión a fondo de todos los
> textos (6.B–6.E) y, si procede, el **bump a 0.2.0** (la versión sigue en
> 0.1.1; no la he subido porque marca «Fase 6 estable»). Falta el commit a
> main de este lote.
>
> Previo (2026-06-18): **Fase 6.E construida y verificada (escritorio
> + móvil); revisión de textos por el autor pendiente.** Info de la tabla
> **Activaciones**, mismo patrón: «i» de concepto en el título; «i» en las
> cabeceras **Personality / Design** y en la nueva cabecera **Peso**; «i» en
> cada **planeta** (13 fichas propias); y cada **activación es un botón que
> abre el drawer de su puerta** (reusa 6.D) — así se accede a cada activación
> sin un «i» por celda. **Peso por planeta:** última columna **«Peso»**
> discreta (más pequeña, atenuada, con leve gradiente por nivel) + tooltip e
> «i» en su cabecera. Los pesos son **provisionales (pendientes de tu
> revisión)**: lo único firme en HD es **Sol+Tierra ≈ 70 %**, así que los
> niveles (alto = Sol/Tierra, medio = Nodos, bajo = el resto) son una
> ordenación razonable, no una tabla oficial — el «i»/tooltip lo aclaran. La
> columna Peso va fijada con `min-width` para no descuadrar la tabla al
> desplegar «Mostrar más». Contenido nuevo en `es.js` (`concept.activation`,
> `activationCol`, `planet`, `promptLabels.planet`, `activationWeight`) +
> `prompts.js`; helper `getActivationWeight`. Además: **footer traducido al
> español** (estaba en inglés — bug) en home y carta. Y **6.F replanteada**:
> en lugar de un disclaimer suelto, un enlace **«Acerca de»** en el footer
> que abrirá una ventana con los disclaimers, el «Hecho con asistencia de IA»
> y quizás autor / donar / reportar bugs (anotado en BACKLOG). Falta el
> commit a main de este lote. 0.2.0.
>
> Previo (2026-06-18): **Drawers anidados + índice completo de
> puertas/canales + enlaces en el texto (sobre 6.C/6.D); verificado en
> escritorio y móvil; revisión de textos por el autor aún pendiente.**
> (1) **Logo de Claude corregido** a la ráfaga real (antes era la «A» de
> Anthropic); y el botón «Abrir IA» recupera el icono de «salir de la app»
> como guía **delante**, mostrando el logo de la IA elegida **después** del
> nombre. (2) **Drawers anidados**: el panel pasa de un único `infoData` a
> una **pila** `infoStack` en `chart/+page.svelte`; abrir desde un
> chip/título inicia una pila nueva, un **enlace dentro del texto** hace
> push, una **flecha «atrás» junto a la ✕** hace pop (Escape también) y la ✕
> vacía la pila. Una sola instancia de `ElementInfo` pinta la cima; el reset
> por `elementKey` intercambia el contenido y resetea el scroll. (3)
> **Enlaces en el texto**: markup `[label](kind:key)` en el contenido →
> `renderInline` lo pinta como **subrayado sutil** (`.ilink`) y delega el
> clic para navegar. La info generada de puertas/canales emite enlaces a su
> **centro** y a sus **puertas**; pasada manual de enlaces cruzados (nombres
> de **centros** y **tipos**, p. ej. «garganta») en los textos del núcleo de
> `es.js` —el resto de menciones quedan para la revisión de textos del
> autor; el markup es trivial de extender. (4) **Índice completo**: el «i»
> de concepto de **«Canales completos»** y **«Puertas colgantes»** abre un
> panel con la **lista clicable de los 36 canales / 64 puertas**
> (`getConceptInfo` adjunta `list`; `ElementInfo` la pinta como chips) —
> **así queda resuelto el problema abierto de 6.D** (alcanzar cualquier
> puerta/canal, no solo los activos). (5) **Fix de correctitud**: el ángulo
> «Sobre esta carta» de puerta/canal solo aparece si el elemento está
> **activo** en la carta (`activeGates`/`activeChannels`); los inactivos
> alcanzados por el índice muestran solo «Info general». (6) **Tres ajustes
> de layout sin salto**: los chips de **centro definido** ya no ensanchan al
> activarse (se quitó el `font-weight: 600`); la **tabla de activaciones**
> fija la 1ª columna con `min-width: 8.5rem` (en auto-layout, porque el
> `<main>` es shrink-to-fit y `table-layout: fixed` la colapsa) para que
> «Mostrar más» no desplace las columnas; y la **«i» de los títulos** de
> sección vive en un hueco fijo siempre presente. (7) Anotado en BACKLOG:
> sustituir los **diálogos nativos** (guardar/renombrar nombre, borrar,
> importar) por uno propio que encaje con la estética, con fallback. Commits
> previos `2cc1a7d` y `01c56c6`; este cierra el lote. 0.2.0.
>
> Previo (2026-06-17): **Fases 6.C y 6.D construidas y verificadas
> en navegador (escritorio + móvil); falta la revisión de textos/UX por el
> autor.** Commit del código `2cc1a7d` (+ corrección posterior del logo de
> Claude). **6.C — handoff polish:** los iconos de IA pasan a ser
> **logotipos de marca reales** (Claude = ráfaga de Anthropic, ChatGPT =
> flor de OpenAI, Perplexity), renderizados con `currentColor` en el botón
> de IA preferida y en el selector; orden confirmado Claude · ChatGPT ·
> Perplexity (uso nominativo, ya aprobado). El `icon` (path SVG, viewBox
> 0 0 24 24) vive en cada entrada de `AIS` en `ai/handoff.js`. **6.D —
> puertas y canales vía handoff:** info mínima **generada al vuelo** desde
> hechos mecánicos (centro de cada puerta vía `CENTER_BY_GATE`, extremos de
> cada canal) + la **raíz I Ching** (nombre del hexagrama del rey Wen por
> puerta, edición Wilhelm/Vogelmann en español; tabla `iching` de 64
> nombres en `content/es.js`); la profundidad se delega al prompt para la
> IA. Nuevos helpers `getGateInfo` / `getChannelInfo` / `getIchingName` en
> `content/index.js`; `prompts.js` extendido con kinds `gate`/`channel`
> (ambos ángulos, impersonales) + concepto `gate`/`channel`; conceptos
> `channel` y `gate` añadidos a `es.js`. Cableada la «i» a los chips de
> **canales completos** y **puertas colgantes** y a los **títulos de
> sección** (concepto), reutilizando la maquinaria de «una sola i a la vez»:
> cada sección se envuelve en `<div class="info-zone" role="presentation">`
> con `cardOver`/`cardClick`/`clearReveal` e ids `channels`/`gates`; cada
> chip va en `.cc-wrap` con `data-inner-key="channel:g-g"`/`"gate:g"` y la
> «i» como `.dot-slot` (mismo patrón que los centros); la «i» del concepto
> va inline en el `<h2>` (`.dot-h2`, con `line-height: 1.35` que reserva su
> altura para no provocar saltos). `openInfoFor` resuelve `gate`/`channel`
> con los nuevos generadores. **Pendiente del autor:** revisar los textos
> (6.B, 6.C y 6.D, en especial los nombres de hexagramas) y validar la UX.
> **Decisión de diseño registrada en BACKLOG (§ 6.D):** para el problema
> abierto de 6.D (llegar a CUALQUIER puerta/canal, no solo los activos de la
> carta) se recomienda **enlaces en el texto que abren drawers anidados**,
> resueltos como **una sola pila de contenido en el mismo drawer + flecha
> «atrás» junto a la ✕** (no drawers visualmente apilados). Sin implementar
> aún. 0.2.0.
>
> Previo (2026-06-17): **Fase 6.B construida, validada (UX) y
> mergeada a `main`** — solo queda la **revisión en detalle de los textos**
> por el autor. Implementado y verificado en escritorio + móvil: contenido
> propio (en `content/es.js`, con `**negrita**`/`*cursiva*`, enfoque en
> gestión de energía y toma de decisiones) para los 6 conceptos
> (Tipo/Estrategia/Autoridad/Perfil/Definición/Centros) + 4 tipos + 5
> estrategias + 7 autoridades + 6 líneas de perfil + 5 definiciones + 9
> centros; `prompts.js` extendido a todos los kinds + `concept`. Dos niveles
> de «i»: la del **cajetín** explica el concepto; la del **valor/chip**, el
> elemento concreto (el perfil se compone al vuelo de sus dos líneas).
> Refinamientos: **una sola «i» a la vez** (cuerpo→concepto, elemento
> interior→su «i»); la «i» del valor es **inline tras el texto** (tras la 2ª
> línea si envuelve), sin reservar hueco ni provocar saltos; **todos** los
> chips de Tipo tienen «i» (los no-propios solo «Info general»); aire
> constante título↔texto en el drawer; **memoria del ángulo**
> «Sobre esta carta»/«Info general» con primera línea explicativa en su
> desplegable; copia con fallback (la API y `execCommand` están bloqueadas
> en el iframe del preview, pero funciona en la app real); «i» un poco más
> pequeña (17px) y pegada a la esquina del cajetín. Commits `656dc2d`,
> `042abfd`, `0c29888`, `177d7af`. Detalle en BACKLOG (§ 6.B). 0.2.0.
>
> Previo (2026-06-17): **Fase 6.A cerrada** tras varias rondas de
> refinamiento del panel (validadas en escritorio y móvil). Sobre el cierre
> previo: (1) el prompt tiene **dos ángulos** mediante un selector de texto
> en línea junto a «Saber más usando IA» — «Sobre esta carta» / «Info
> general» — con desplegable flotante hacia arriba; (2) los prompts son
> **impersonales** («Para un Generador con autoridad Sacral y perfil 3/5…»)
> porque la carta puede ser de otra persona; (3) menú reordenado: «Abrir
> IA» primero, «Copiar prompt» después (con feedback verde «Copiado»);
> (4) el texto editable se muestra/oculta con un toggle sutil «Ver/editar
> prompt»; ambos botones usan ese texto; (5) IAs en orden Claude, ChatGPT,
> Perplexity; (6) info a tres párrafos con tope de altura + ascensor propio
> (la sección IA queda siempre visible); (7) la «i» aparece por hover
> (escritorio) / tap (táctil). Diseño final documentado en BACKLOG
> (§ «6.A as built»).
>
> **Pendiente 6.B** (otra sesión): redactar contenido (3 párrafos + 2
> prompts general/carta) para los 4 tipos restantes, 5 estrategias, 7
> autoridades, 6 líneas de perfil, 5 definiciones y 9 centros; cablear la
> «i» a los cajetines de Estrategia/Autoridad/Perfil/Definición y a los
> chips de Centros (extender `content/es.js` y `prompts.js` con esos kinds
> y el cableado en `chart/+page.svelte`). Decisión a tomar: para elementos
> que no son de la carta (p. ej. otro tipo), el ángulo «esta carta» no
> aplica → solo «Info general».
>
> Previo (2026-06-16): **Fase 6.A completada y validada** —
> andamiaje del handoff a IA + info de elementos, con piloto en el Tipo.
> Nuevos: módulo de contenido `src/lib/hd/content/` (es, i18n-ready),
> generador de prompts `src/lib/hd/prompts.js`, handoff de IA
> `src/lib/ai/handoff.js`, y componentes `InfoDot.svelte` (la «i») +
> `ElementInfo.svelte` (panel reutilizable). En la página de carta la «i»
> aparece por hover (escritorio) / tap (táctil) sobre el chip del tipo o
> su cajetín, y abre el panel con info general (dos párrafos) + menú
> «Saber más usando IA»: «Copiar prompt» (copia directa, texto editable) y
> «Abrir IA» (deep-link ChatGPT/Claude/Perplexity con preferida recordada
> en localStorage; Gemini → copiar). La «i» solo sale donde hay contenido:
> hoy solo el Tipo **Generator** (el resto llega en 6.B). El icono de cada
> IA es un glifo genérico provisional (logos reales en 6.C). Verificado en
> escritorio y móvil. Siguiente: **6.B** (contenido del núcleo). 0.2.0.
>
> Previo (2026-06-15): **diseño de la UX del panel de Fase 6
> aprobado** (mockup v3, validado por el usuario). La «i» de información
> (cursiva, blanca, tres estados: discreta al seleccionar, realzada en
> hover, marcada al pulsar) aparece sobre el elemento seleccionado —
> superpuesta al chip o arriba a la derecha del cajetín — y abre un panel
> reutilizable (bottom-sheet en móvil / lateral en escritorio) con
> información general en dos párrafos y, al pie, un menú «Saber más» de
> dos botones en fila: «Copiar prompt» (despliega el prompt personalizado
> + botón copiar) y «Abrir IA» (selector ChatGPT/Claude/Perplexity que
> recuerda la preferida y luego muestra su icono+nombre; nota final para
> otras IA). Sin disclaimer visible (se cumple, no se rotula). Anotada
> además la exploración futura de info general vs. específica. Detalle en
> BACKLOG (§ Phase 6 plan, "UX approved 2026-06-15"). Siguiente sesión:
> arrancar **6.A** (andamiaje + piloto con el Tipo Generator). Sin código
> todavía.
>
> Previo (2026-06-13): plan de la **Fase 6** (handoff a IA + info
> de elementos) acordado y registrado — sin empezar a implementar
> todavía. UX: panel reutilizable (bottom-sheet en móvil / lateral en
> escritorio) abierto por un único "ⓘ Saber más" contextual, no un icono
> por chip, conservando el resaltado actual al pinchar. Handoff sin API
> (coste y clave expuesta lo descartan): "Copiar prompt" siempre +
> deep-links opcionales (ChatGPT/Claude/Perplexity; Gemini cae a copiar);
> recordar la IA preferida. Texto propio solo para el núcleo (~35 piezas:
> tipos, estrategias, autoridades, líneas de perfil, definiciones,
> centros); las 64 puertas y 36 canales se delegan a la IA del usuario.
> Legal verificado: los hechos del sistema no son copyrightables, la
> expresión oficial sí, las marcas admiten uso nominativo → redacción
> 100% propia + I Ching de dominio público + disclaimer de no-afiliación.
> Multi-idioma desde el diseño. Sub-fases 6.A-6.E (piloto con los Tipos).
> Detalle completo en BACKLOG. Versión objetivo 0.2.0.
>
> Previo (2026-06-13, tarde): pasada de estabilización post-MVP.
> Arreglado el bug del circuito de integración (los canales 20-34/10-34/
> 10-20 que comparten el tronco Q→Q2 se cortaban al hacer hover sobre una
> chip de canal: el color opaco de atenuado pintaba encima del canal
> destacado; ahora se pinta primero lo atenuado y después lo destacado —
> commit `196e9ea`, validado por el usuario). Mejora del slider de hora
> desconocida: al marcar la casilla arranca en la hora ya escrita
> (redondeada a la media hora) y al desmarcar conserva la hora del slider.
> Pruebas manuales (timezones extremas, fechas límite, errores
> controlados, guardado/renombrado/borrado, export PNG/JSON, móvil 375px):
> sin incidencias nuevas salvo lo anotado en BACKLOG (retry ~8× del efecto
> de cálculo, autocomplete que cuela regiones/condados, mensaje de error
> mixto ES/EN).
>
> Previo (2026-06-13): roadmap reordenado — la antigua Fase 9
> (handoff a IA) pasa a ser la **Fase 6** y amplía su alcance: además de
> los prompts para la IA del usuario incluirá información textual básica
> de cada elemento (tipo, autoridad, perfil, centros, canales), siempre
> que sea legalmente viable sin incurrir en plagio; el guardado en línea
> pasa de Fase 6 a **Fase 9**. Backlog depurado: mejoras visuales ya
> hechas o descartadas eliminadas (solo queda ajustar la flecha ← de
> volver en móvil) y retirada la deuda de permisos macOS.
>
> Previo (2026-06-13): tabla de activaciones plegada por defecto —
> solo Sol, Tierra y Luna visibles; botón sutil "Mostrar más ▾ / Mostrar
> menos ▴" bajo la tabla despliega los 13 cuerpos. Nota: el PNG
> compartido/descargado captura la tabla en el estado en que esté.
> Infra: los worktrees de sesión ya no instalan `node_modules` propio
> (~244 MB cada uno) — resuelven desde el checkout principal y
> `vite.config.js` lo permite en `server.fs.allow`; worktrees y ramas
> viejas purgadas (~980 MB recuperados). Regla en CLAUDE.md §4.
>
> Previo (2026-06-12, post-MVP batch **v0.1.1**): etiqueta git
> `v0.1.0` en el commit del cierre del MVP; versión del footer leída de
> package.json (fuente única vía Vite define); enlace sutil "Borrar
> formulario" bajo el CTA; campo nombre sin placeholder; al abrir una
> carta guardada se usa el nombre guardado/renombrado; cabeceras
> Personality/Design con circulito de color a la derecha + tooltip
> (nacimiento vs 88° de arco solar ≈ 88 días antes); chip de tipo activo
> con salto de línea (Manifesting Generator desbordaba en escritorio);
> bodygraph en dos pasadas de pintado (las mitades grises ya no tapan el
> tramo común de 20-34/10-34 cuando la 57 está indefinida); puertas
> inactivas legibles en Raíz definida (arena claro sobre marrón).
> Política de versiones acordada: patch para arreglos, minor para fases
> nuevas (Fase 6 → 0.2.0), 1.0.0 cuando se considere estable.
>
> Previo (2026-06-12): **MVP cerrado y validado en producción.**
> Últimos retoques tras la validación de Fase 5: título y subtítulo
> centrados en el PNG exportado, orden de la lista de centros (Sacral
> tras Bazo y Plexo Solar), y fecha/hora del formulario centradas en
> móvil mediante overlay propio (Android Chrome ignora `text-align` y
> todos los pseudo-elementos del widget nativo; el valor nativo se pinta
> transparente y un span centrado muestra el valor — el picker nativo
> sigue abriéndose igual). El cierre acumuló además (2026-06-11): nodo
> verdadero (bug GRAVE de cálculo), tooltips táctiles, tap en centros
> del SVG, chip seleccionada destacada + atenuado, PNG arreglado en
> escritorio y móvil (`nombre carta YYYY-MM-DD-HHMM-ciudad.png`),
> tipografía de cabecera, atajo oculto en el punto final del subtítulo,
> formulario móvil centrado, botones compartir/descargar en la esquina
> del bodygraph y conservación de datos al volver. Siguiente:
> estabilización (pruebas con cartas reales) y, cuando toquen, las
> mejoras menores de BACKLOG ("Possible improvements"). URL corta /
> dominio propio: comentado 2026-06-12, aplazado por decisión del
> usuario.

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
- **Phase 1.3 — SVG bodygraph visualization.** Functional bodygraph above
  the textual chart data. 9 centres as geometric shapes (triangles, diamond,
  rects), filled when defined, outlined when open. All 36 channels drawn as
  lines gate-to-gate. Colour coding: Personality=white, Design=pink-red,
  Both=pink-red, inactive=muted gray. Active gates marked with a circle.
  Three new files: `src/lib/hd/bodygraph-geometry.js`,
  `src/lib/components/Bodygraph.svelte`, edit to `src/routes/chart/+page.svelte`.

## ✅ Phase 1.4 — Bodygraph visual accuracy (completada 2026-05-19)

Subtareas completadas:

- ✅ **1.4.A Centre sizes** — Centros reducidos ~25-30%. Head r45→32,
  Ajna r40→28, Throat 130×85→95×65, G r60→45, Heart r40→30,
  Sacral 130×85→95×65, Spleen r55→40, SolarPlexus r55→40,
  Root 130×80→95×58. Puertas reescaladas hacia sus centroides.
- ✅ **1.4.B Personality color** — Personality = blanco `#eaeaee`;
  inactivo = muy tenue `#252535` (antes ambos eran el mismo blanco).
- ✅ **1.4.C Canales paralelos** — 10 grupos (2-4 canales/grupo).
  Offset perpendicular ±N×4.5 px basado en dirección media del grupo.
  Sin cruces detectados (verificado analíticamente).
- ✅ **1.4.D Stroke width** — 6 px → 3.5 px; linecap butt → round.
- ✅ **1.4.E Centros indefinidos** — Fill `#101116` → `#181823`,
  stroke `#3a3a42` → `#46465a`. Centros más legibles y delimitados.
- ✅ **1.4.F Heart position** — Centroide y:325 → y:305 (se alínea con
  el hueco Throat↔G). Puertas Heart desplazadas −20 px en y.
- ✅ **1.4.G Marcador Both** — Split circle: semiciclo superior blanco
  (Personality), inferior rojo (Design). Número en navy sobre el split.
- **1.4.H** — Eliminada (etiqueta "G" diferida a pulido visual Fase 3).
- ✅ **1.4.I Borde definidos** — Stroke de centros definidos `'#c8a832'`
  (ámbar dorado), stroke-width 2. Antes era mismo color que el fill.
- ✅ **1.4.J Puertas Head** — Puertas 64/61/63 estaban en y:78, fuera
  del triángulo (borde en y:71). Corregidas a y:68. Verificado.
- ✅ **1.4.K Routing diagonal** — Verificado analíticamente: ningún
  canal diagonal Throat↔Spleen o Throat↔SolarPlexus se cruza con otro.
  Los pares paralelos están resueltos por 1.4.C.

## ✅ Geometry rebase + bodygraph polish (2026-05-21)

- ✅ ViewBox `380×620` → `1058×1630` (dimensiones del referencial).
- ✅ Centros: vértices explícitos del referencial (triángulos no equiláteros).
  Heart cambia de `triangle-left` a `triangle-up`.
- ✅ Las 64 posiciones de puertas desde el referencial; ajuste fino posterior
  de coordenadas en múltiples centros (segunda pasada del referencial).
- ✅ Offsets perpendiculares de canales paralelos eliminados — con las
  coordenadas del referencial los canales ya están naturalmente separados.
- ✅ Circuito de integración (10-20, 10-57, 10-34, 20-34, 20-57, 34-57)
  trazado como polilíneas calculadas vía `proyectarSobreRecta`. Los quiebres
  Q y Q2 derivan de las coordenadas de las puertas, sin literales numéricos.
- ✅ Colores refinados: Personality blanco `#ffffff`, Design rosa-rojo
  `#e84672`, inactivo gris tenue `#606070`, marcador de puerta morado
  `#4a2060`, stroke-width canales 12 px.
- ✅ Puertas inactivas en centros definidos: texto en morado `#4a2060`
  (antes gris claro, ilegible sobre fondos de color).
- ✅ `.npmrc` con `legacy-peer-deps=true` — arregla build en Cloudflare.

## ✅ Phase 2 — Local persistence (completada 2026-06-10)

- IndexedDB via Dexie (`src/lib/db/charts.js`). Stores the birth input
  data only; the chart is recomputed on load, so saved records benefit
  from future calculation improvements.
- "Guardar carta" button on the chart page (native `prompt()` for the
  name). "Cartas guardadas" list on the home page: open / rename / delete
  (native dialogs — visual polish deferred).
- Export all charts to one JSON file; import appends (no dedup).
- Fix found during testing: IndexedDB can't structured-clone Svelte 5
  `$state` proxies — records are saved via `$state.snapshot`.
- Validated by the user locally; merged to `main` and deployed.

## ✅ Phases 3-5 — Visual polish, unknown hour, share as image (MVP closed 2026-06-12)

- **Phase 3 — Visual polish.** Blocks:
  - ✅ **3.A** Summary above the bodygraph; bodygraph ~8% smaller; birth
    data line; chart title = chart name.
  - ✅ **3.B** Type as 5 always-visible chips, ordered by population share
    with the % shown small. (Authority/definition pattern deferred — BACKLOG.)
  - ✅ **3.C** Complete-channels and hanging-gates columns side by side;
    "Puertas activas" section removed; planet symbols in the activations
    table; icon export/import buttons on the home screen.
  - ✅ **3.D** Striped white/red "Both" channel halves; round joins fix the
    integration-polyline artifacts; inactive gate contrast raised;
    narrow-screen review (375px, no overflow).
  - ✅ **3.E** Layout + interaction round (2026-06-10):
    - Active type chip in solid amber (stronger highlight).
    - Four info cards overlay the upper-left of the bodygraph; centres
      list overlays the upper-right; hover/tap on a centre draws a
      temporary amber pointer line + outline marking it on the graph.
      On <680px both fall back to normal flow (cards grid, chips row).
    - Hanging-gates emphasis swapped: defined-centre gates in active
      style, undefined-centre ones in legible gray.
    - "Both" stripes at ~70% red / 30% white (dasharray 10/22).
    - Birth data line left-aligned with the title text.
    - Channel chips in active style, numbers only.
    - Hovering a channel/gate chip highlights its centre chip(s), dims
      the rest and highlights matching activations in the planets table.
    - Home: "Las cartas se guardan solo en este dispositivo" note;
      divider before "Cartas guardadas"; drag & drop reordering
      (HTML5 DnD, order persisted in a new `sortOrder` field — Dexie
      schema v2 with upgrade); chart type shown next to each saved name
      (denormalised `type` stored on save, lazily backfilled for older
      records).
  - ✅ **3.F** Docs closing pass — this update.
- **Phase 4 — Unknown birth time mode** (2026-06-10, validated).
  Form order now date → place → time. "Hora desconocida"
  checkbox disables the time field and reveals a 0-24h slider (30-min
  steps); scrubbing computes and shows the resulting type for that hour
  (debounced) and writes the hour into the disabled time field, which is
  what "Calcular carta" uses. Unchecking restores manual entry; changing
  date/place recomputes the preview.
- **Phase 5 — Share as image** (2026-06-11, validated 2026-06-12).
  Share/download buttons on the chart page capture the **whole chart
  view** (summary, bodygraph, centres, channels, gates, activations) to
  PNG via `html-to-image` — native share sheet on touch, download on
  desktop. Export-only layout centres the title and birth line in the
  image. File name: `nombre carta YYYY-MM-DD-HHMM-ciudad.png`. All
  pre-MVP items landed 2026-06-11 (PNG capture fixed on desktop and
  mobile, header typography, pre-fill removed behind a hidden shortcut,
  centred mobile form). **The MVP is closed.**

## ⬜ Pending

- **Stabilisation pass (post-MVP).** 🟡 Ongoing. Landed 2026-06-24: an
  automated `vitest` safety net for the calculation core, themed in-app
  dialogs (replacing native prompt/confirm/alert), prefix autocomplete via
  Photon (drops regions/counties too), the centred back-arrow, and the
  "city, country" place label everywhere. Still open: hands-on testing
  against real charts, optional TWA packaging for Google Play, and the
  remaining BACKLOG "Possible improvements".
- **Phase 6 — AI handoff + element info** (plan validated 2026-06-13,
  panel UX approved 2026-06-15 — mockup v3; full detail in BACKLOG). 6.A
  done 2026-06-16, 6.B–6.E done 2026-06-17/18 and 6.F (the "Acerca de" footer
  modal) built 2026-06-18. **Phase 6 is functionally complete**; only the
  author's detailed **text review (6.B–6.E)** and an optional **version bump
  to 0.2.0** remain before declaring it closed (version still 0.1.1).
  Lightweight, no-API AI integration: from any element, build a
  ready-made, chart-personalised prompt the user takes to **their own** AI
  — the AI never runs inside the app. Plus a small core of original in-app
  text. Key decisions:
  - UX (6.A as built — full detail in BACKLOG): an "i" appears on the
    selected element (hover on desktop / tap on touch, on a chip or its
    card) and opens a reusable info panel (drawer on desktop / bottom sheet
    on mobile) with the element's info (capped height + own scroll) and a
    "Saber más usando IA" section: an inline angle selector "Sobre esta
    carta"/"Info general", "Abrir IA" + "Copiar prompt", and a "Ver/editar
    prompt" toggle for the editable text. Prompts are impersonal (the chart
    may belong to someone else).
  - Handoff: "Copy prompt" (always) + optional deep links (ChatGPT,
    Claude, Perplexity; Gemini falls back to copy); remember preferred AI.
    No API/backend (cost + key exposure rule it out); BYOK deferred.
  - Content: own text only for the core (~35 pieces — types, strategies,
    authorities, profile lines, definitions, centres). 64 gates + 36
    channels delegate to the user's AI (minimal own info + "go deeper").
  - Legal: facts aren't copyrightable, official expression is, trademarks
    allow nominative use; 100% own wording + public-domain I Ching. No
    visible disclaimer (comply without stating it). Not legal advice.
  - Multi-language ready from the start (content + prompt templates
    i18n-keyed).
  - Sub-phases (renumbered 2026-06-17: old 6.E → 6.F; new 6.E = activations
    info): 6.A ✅ scaffolding + pilot (Type element) → 6.B ✅ core content
    (built, UX validated on desktop + mobile and **merged to main**
    2026-06-17 — concept "i" on the six cards + specific "i" on each
    value/chip, all kinds + prompts written, bold/italic, one "i" at a time,
    inline value "i" with no layout shift, drawer air, angle memory; **only
    open item: author's detailed review of the texts**) → 6.C ✅ handoff
    polish (real brand logos for Claude/ChatGPT/Perplexity, order confirmed;
    built 2026-06-17, text/UX review pending) → 6.D ✅ gates/channels
    via handoff (minimal generated info — centre + I Ching root — + "i" on
    the channel/gate chips and on the "Canales completos"/"Puertas
    colgantes" titles; built 2026-06-17, text/UX review pending; the "list
    ALL gates/channels" open problem **resolved 2026-06-18** via nested
    drawers + a clickable index in the concept panels + in-text links) →
    6.E ✅ activations info (concept + Personality/Design/Peso headers +
    per-planet "i" + clickable activations + provisional per-planet weight
    column; built 2026-06-18, text/UX review pending) → 6.F ✅ "Acerca de"
    footer modal (`About.svelte`: disclaimers + AI-assistance note + author +
    license + report-a-bug; built 2026-06-18). Phase 6 functionally complete;
    pending only the author's text review + an optional bump to 0.2.0.
- **Phase 7 — Initial report (HD primer for first-timers).** 🟡 **Built and
  verified 2026-06-30; pending the author's text review.** An "Informe" button
  next to the chart name opens a full-screen overlay (`InitialReport.svelte`)
  whose sections are assembled by `report.js` (`buildReport`) from the chart:
  Part A (what HD is + the ant analogy + the bodygraph/centres + conditioning +
  de-conditioning), Part B personalised (type + place in the collective,
  strategy, authority = decision-making, per-type energy/trap/signposts,
  profile, definition, a walk through the nine centres in their actual state)
  and Part C (a whole-chart AI handoff: "Abrir IA" / "Copiar prompt"). Hybrid
  by design: a deterministic static report + the Phase 6 handoff for depth.
  Reuses the Phase 6 content library + new `report`/`typeReport` blocks in
  `es.js`; centres were split into `{ fn, defined, open }` so the report shows
  only the chart's state (the chip "i" still shows both); `renderInline`
  extracted to `src/lib/markup.js`; in-text links open the element drawers.
  Verified: 16/16 tests + browser (centre chip, full report, links, handoff),
  no console errors. Done alongside (Phase 6.D follow-up): the **64 gate
  essences + 3-state codas** for gates/channels. Full spec in
  `docs/informe-inicial.md`. (Added 2026-06-22; built 2026-06-30 — composite/
  transits/sync stay at 8/9/10.)
- **Phase 8 — Composite chart.** Two saved charts rendered as a combined
  bodygraph (visual overlay distinguishing each person).
- **Phase 9 — Transits.** View live transits over a saved chart.
- **Phase 10 — Online sync.** Optional cloud persistence of saved charts
  (local-only stays the default).

---

## Useful pointers

- Live URL: <https://human-design-chart-app.orangeman7557.workers.dev/>
- Repo: <https://github.com/orangeman7557/human-design-chart-app>
- Validation case: orangeman7557's own chart — hidden shortcut: clicking
  the final period of the home tagline pre-fills the form
  (`fillAuthorData` in `src/routes/+page.svelte`).
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
