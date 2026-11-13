# Revisión UX / diseño / accesibilidad — hdchart.app v1.5.7

Revisado en el navegador integrado sobre producción: móvil 375x812 (principal) y una pasada en escritorio (panel pequeño 800x600). Datos inventados (17/05/1990, Lisboa); carta de prueba creada y borrada. Nota: el formulario venía rellenado de un uso previo, así que la "primera visita" real (formulario vacío) la vi solo después de «Borrar formulario».

## 1. Nota del frente: 7,5/10
- Diseño visual: 8,5/10
- Accesibilidad: 6/10

Producto muy cuidado: formulario limpio, bodygraph claro, drawers y menú bien resueltos, hay hint de onboarding. Las deudas están en la accesibilidad de detalle (contraste de microtexto y números de puertas, objetivos táctiles pequeños, nombres accesibles) y en cierta densidad/jerga en la carta para un novato.

## 2. Fortalezas
- Home de un vistazo: título, promesa ("gratis, sin registro"), 4 campos y un CTA ámbar dominante; no hay nada que distraiga.
- Bodygraph legible en móvil (335 px de ancho): al elegir un centro/canal/puerta se atenúa el resto y se resaltan las chips relacionadas (feedback excelente, verificado con «Garganta»).
- Drawer inferior con grabber, cierre con ✕/Escape y `role="dialog" aria-modal`; menú ☰ con `aria-haspopup`/`aria-expanded` y filas de 36 px, con punto rosa que guía hacia el «Informe inicial».
- Banner de bienvenida que dice exactamente por dónde empezar («Informe inicial») y es descartable; informe con navegación por chips de sección y tono llano.
- Bodygraph con `role="img"` + `aria-label`, 64 puertas con `tabindex` (teclado), `:focus-visible` definido en 8 ficheros, diálogos propios con confirmación clara al borrar («No se puede deshacer»), dos idiomas con cambio sin pérdida de datos.

## 3. Hallazgos

**UX-1 · Números de puerta ilegibles (tamaño y contraste) en el bodygraph**
- Qué: las 64 etiquetas de puerta se renderizan a ~6 px de alto en móvil. Los números morados (#4a2060) sobre centros definidos tienen contraste ≈3,5:1 sobre ámbar/marrón claro, ≈2,5:1 sobre rojo (Corazón/Sacral) y ≈1,3:1 sobre el marrón de la Raíz.
- Evidencia: móvil, /es/chart; `svg text` mediana 6 px (viewBox 1058 → escala 0,317); cálculo de luminancia con los tokens del CLAUDE.md. En la captura, los números de la Raíz se pierden.
- Impacto: alto; todos en móvil y quien tenga baja visión. Es lo que el usuario quiere leer.
- Esfuerzo: M.
- Propuesta: en centros oscuros/rojos usar número claro (#fff/#f0e6ff) con halo oscuro fino (`paint-order: stroke`), o subir la fuente a ≥8–9 px en móvil. Porqué: hoy los números solo se leen sobre amarillo/verde.
- Confianza: alta.

**UX-2 · Microtexto y estados deshabilitados bajo contraste AA**
- Qué: texto de chips inactivas (11,2 px) 4,14:1; «bajo» (peso de activación) 2,88:1; «medio» 4,37:1; «privacidad» en el pie 3,35:1; enlaces del pie del menú (grises muy tenues, 12,8 px) y el rótulo «Idioma» (9,9 px). `--text-muted` (#a0a0a8) en sí cumple (~7:1); el problema son los tonos aún más apagados que se aplican encima.
- Evidencia: cálculo de ratios sobre el DOM en /es y /es/chart, móvil.
- Impacto: medio; baja visión, sol directo en móvil.
- Esfuerzo: S.
- Propuesta: subir esos grises a ≥#8a8a94 sobre `--bg` (≥4,5:1) y dejar la atenuación fuerte solo para lo realmente "apagado" (chips no relacionadas con la selección, que sí pueden ser decorativas). Porqué: son enlaces funcionales (privacidad, fallo), no decoración.
- Confianza: alta.

**UX-3 · Objetivos táctiles por debajo de 44 px (y 24 px) en puntos clave**
- Qué: botón «i» del chip seleccionado 17x17; botón Idioma 35x20; «¿Qué es el Diseño Humano?» 180x21; «Hora desconocida» 15 px de alto; «Borrar formulario» 20; «saber más» 14; enlaces del pie 15; filtro de cartas 26x24 y buscador 24 de alto; renombrar/etiquetas 38x25; descargar/importar/enviar cartas 30x30; en la fila de guardadas, borrar (✕) 38x56 pegado a la tarjeta. Mi primer tap sobre la «i» de «Garganta» no abrió el drawer (falló el objetivo; desde JS sí abre).
- Evidencia: medidas `getBoundingClientRect` en móvil 375 px, /es y /es/chart.
- Impacto: alto en el flujo principal (la «i» es la puerta a los drawers); medio en el resto. Afecta a móvil y motricidad fina.
- Esfuerzo: S–M.
- Propuesta: ampliar el área táctil sin cambiar el dibujo (padding o `::after` de ≥44x44), empezando por la «i», el enlace «¿Qué es…?», «Hora desconocida» (que toda la fila sea la etiqueta) y los pies. Porqué: es la única vía de entrada a lo más valioso.
- Confianza: alta.

**UX-4 · «i» y chips: nombre accesible y descubribilidad**
- Qué: el botón «i» tiene `aria-label="Garganta"` (solo el nombre, no «Más información sobre Garganta»); el hint dice «pulsa en i» pero esa «i» solo aparece tras un primer toque en la chip (el novato ve dos pasos: tocar → «i» → drawer). Las chips de tipo (Generador/…/Reflector) parecen filtros pero son un indicador del tuyo, sin explicación.
- Evidencia: /es/chart móvil; DOM de `button` con `aria-label="Garganta"`; captura inicial.
- Impacto: medio; lectores de pantalla y novatos.
- Esfuerzo: S.
- Propuesta: `aria-label="Información: Garganta"`; considerar que el toque directo en una chip ya muestre el drawer (o mostrar la «i» siempre en las tarjetas principales). Añadir un matiz visual a la chip de tu tipo (check/«tu tipo»). Porqué: reduce un paso y evita la lectura "filtro".
- Confianza: media-alta.

**UX-5 · Densidad y jerga en la carta para un novato**
- Qué: encima del bodygraph hay 6 bloques seguidos (Tipo con 5 chips, Estrategia, Autoridad, Señales, Perfil, Cruz «8/14 | 30/29») antes de ver la imagen; abajo, chips numéricas «1-8», «13-33», «19-49»; tabla Activaciones sin cabecera visible ni explicación de «Personalidad/Diseño/Peso (alto/medio/bajo)». El drawer de «Centro» describe definido e indefinido pero no marca cuál es el de esta carta.
- Evidencia: /es/chart móvil (get_page_text y capturas); drawer «Garganta».
- Impacto: medio; novatos, que son el público declarado.
- Esfuerzo: M.
- Propuesta: la guía de «Informe inicial» ya existe: sacarla del banner descartable a un CTA fijo breve bajo el nombre la primera vez; en drawers de centro/puerta/canal anteponer «En tu carta: definido / indefinido»; aclarar encabezados de la tabla (Personalidad = consciente, Diseño = inconsciente). Porqué: la jerarquía hoy premia al que ya conoce el sistema.
- Confianza: media.

**UX-6 · El botón ☰ no es fijo y se pierde al hacer scroll**
- Qué: la carta es larga (~1790 px) y el menú (informe, guardar, compartir) está solo arriba; tras bajar al bodygraph hay que volver hasta arriba. Además «Carta guardada» se superpone al nombre de la carta mientras dura.
- Evidencia: móvil /es/chart; tras scroll el ☰ no estaba en pantalla; captura de «Carta guardada».
- Impacto: medio.
- Esfuerzo: S.
- Propuesta: cabecera `position: sticky` compacta (flecha + ☰) o un FAB. Mostrar el feedback de guardado como toast inferior. Porqué: lo más valioso (informe, guardar) queda a un scroll largo.
- Confianza: media.

**UX-7 · Validación de formulario nativa y sin contexto**
- Qué: campo vacío → burbuja nativa del navegador «Completa este campo», de a un campo, sin estilo ni mensaje propio; la ciudad sin resultados muestra «Sin resultados» en rojo pegado a la etiqueta siguiente (poco aire). Validación de fecha imposible (31/02) no verificada. En mi prueba, escribir «31021990» seguido dejó solo «31» en Día (¿no autoavanza?); puede ser artefacto del tipeo sintético: no verificado.
- Evidencia: /es móvil tras «Borrar formulario» + «Calcular carta».
- Impacto: medio-bajo.
- Esfuerzo: S.
- Propuesta: errores en línea con `aria-describedby` y `aria-invalid`, un resumen al enviar y autoavance entre día/mes/año. Porqué: es el único punto de abandono de la home.
- Confianza: media.

**UX-8 · Lugar con etiqueta en inglés en la UI en español**
- Qué: tras elegir ciudad aparece «Lisbon, Lisbon, Portugal» (y en la carta «Lisbon, Portugal») dentro de /es; incluso con la ciudad repetida (provincia = ciudad).
- Evidencia: /es y /es/chart, ambos viewports.
- Impacto: bajo-medio; hispanohablantes ven una mezcla de idiomas.
- Esfuerzo: S–M.
- Propuesta: pedir a Photon `lang=es` y deduplicar nombres idénticos ciudad/estado. Porqué: coherencia lingüística.
- Confianza: alta.

**UX-9 · Estado vacío con parpadeo y lista guardada fuera del primer pantallazo**
- Qué: al cargar `/en` el texto «No saved charts yet» aparece ~1 s antes de que llegue la lista real (IndexedDB asíncrono). La lista de guardadas queda bajo el pliegue; el visitante recurrente ve su formulario previo, no sus cartas.
- Evidencia: /en móvil, `get_page_text` inmediato frente a +1,5 s.
- Impacto: bajo-medio.
- Esfuerzo: S.
- Propuesta: estado de carga neutro (skeleton o nada) hasta resolver Dexie; si hay cartas, subir un acceso («Tus cartas (N)») junto al formulario. Porqué: evita la sensación de «perdí mis cartas».
- Confianza: alta.

**UX-10 · Movimiento y foco**
- Qué: `prefers-reduced-motion` solo se respeta en `chart/+page.svelte` y `About.svelte`; no vi comprobación en drawer, informe o diálogos. `outline: none` presente en 8 componentes; el botón enviar no mostró anillo al enfocarse por JS (no concluyente). La paleta atenuada del filtro (chips) deja aspecto «apagado» con focus ring bajo contraste: no verificado.
- Evidencia: grep en `src/` (solo lectura) y prueba de foco por script.
- Impacto: medio-bajo.
- Esfuerzo: S.
- Propuesta: regla global `@media (prefers-reduced-motion: reduce)` en `app.css` y auditar que cada `outline: none` tenga `:focus-visible` equivalente. Porqué: cobertura barata.
- Confianza: media.

## 4. Oportunidades
- Chip «tu tipo» con icono y color propio; resumen de 1 frase en lenguaje llano arriba («Eres Proyector: …») antes de las 6 tarjetas.
- Chips de canal/puerta con nombre corto («1-8 · Inspiración») en vez de solo números.
- Primera visita: tras «Calcular», un paso guiado de 3 toques sobre la carta (centro → «i» → informe).
- Modo contraste alto para bodygraph (ligado a UX-1).

## 5. Lo que no he podido revisar
- Fecha inválida (31/02), hora desconocida con slider, filtro de embudo y etiquetas, modales «acerca de/notificar fallo/agradecer» (sin tiempo/presupuesto; el de fallo no se debía enviar).
- Navegación completa por teclado/lector de pantalla (solo árbol de accesibilidad y atributos).
- Comportamiento en iPhone real, scroll del drawer en iOS y `prefers-reduced-motion` efectivo.
- Escritorio solo en panel de 800x600; no vi un monitor completo.
