# Informe inicial (Fase 7) + enriquecimiento de textos de puertas/canales

> Documento de definición e implementación. **Estado:** construido y verificado
> (2026-06-30) — puertas/canales con esencia + codas de 3 estados, split de
> centros, e informe (`src/lib/hd/report.js` + `InitialReport.svelte`, botón
> «Informe» en la página de carta). Verificado: 16/16 tests + navegador, sin
> errores. **Pendiente:** la revisión de los textos por el autor (64 esencias +
> bloques del informe) y, opcional, el bump a 0.2.0. No toca el motor de cálculo.
>
> **Nota (2026-06-30):** tras una pasada de revisión, la estructura de secciones
> (orden, títulos, hormigas integradas en «Qué es Human Design», centros como
> tarjetas, cierre «Saber más» tipo drawer) se ajustó respecto a la propuesta de
> abajo; **`report.js` + `InitialReport.svelte` son la fuente canónica** del
> resultado final. La estructura A/B/C de más abajo refleja la definición inicial.

Son dos workstreams **independientes** (no se bloquean entre sí).

---

## Workstream 1 — Textos de puertas y canales (enriquecimiento de Fase 6)

Hoy `getGateInfo` / `getChannelInfo` (`src/lib/hd/content/index.js`) se generan al
vuelo y solo dan hechos mecánicos (centro, extremos del canal) + nombre del
hexagrama del I Ching + delegación al prompt de IA. Están "vacíos" de contenido
propio.

**Decisiones:**
- **Profundidad:** esencia acotada — **2-3 frases por puerta** (esencia + don/sombra).
  Los **36 canales se componen** a partir de las esencias de sus dos puertas
  (la infraestructura de `getChannelInfo` ya existe).
- **Producción:** la IA redacta borradores desde el **tema del hexagrama**
  (I Ching, dominio público) + la **mecánica HD**; el autor revisa voz y exactitud.
- **Guardarraíl legal:** redacción original desde raíces de dominio público +
  hechos mecánicos. **Nunca** parafrasear de cerca a Jovian Archive. (No es
  asesoría legal; la app es de uso no comercial, lo que reduce el riesgo.)
- **Apalancamiento:** la inversión real son **64 "esencias" de puerta**; los
  canales se enriquecen casi gratis.
- **Modelo de estado (Opción B, 3 estados):** esencia neutra compartida (tema +
  don/sombra de la energía, redactada sin dar por hecho que la tienes) + una
  **coda generada** según la carta: *completa* (en canal completo), *colgante*
  (activa sin su otra mitad) o *inactiva* (no la tienes). La coda sale de
  `activeGates` / `activeChannels`; no es texto a mano. Los canales heredan la
  misma lógica (completo / medio canal con una puerta tuya / ninguna).
- **Exactitud (puerta colgante):** se completa **de forma temporal** a través de
  **otra persona** (con la puerta complementaria) o de un **tránsito planetario**
  — NO a través de lugares (el lugar condiciona en general, pero no completa un
  canal). Redactar la coda colgante sin sugerir que es solo «en personas».
- **Hecho (2026-06-29):** las 64 esencias (+ `theme`) están en `es.js`;
  `getGateInfo` / `getChannelInfo` generan las codas de 3 estados; verificado
  (node + 16/16 tests + panel en navegador). Pendiente: revisión del autor de
  los textos de las esencias.

---

## Workstream 2 — Informe inicial (Fase 7)

Para quien no sabe nada de HD: un informe **ojeable** que dé una primera impresión
útil de la carta.

**Arquitectura: híbrida.**
- **Informe estático ensamblado en la app** (determinista, offline, control
  editorial total) +
- **Botón de handoff** (reusa Fase 6) al final, que compone un prompt de la
  **carta completa** y lo lleva a la IA del usuario para la lectura personalizada
  que sintetiza la combinación concreta.

**Objetivo de extensión:** ~3-4 hojas A4.

**Fuentes de cada sección:** `[TIENES]` lo aporta el autor · `[REUSA]` sale de la
biblioteca de Fase 6 ya escrita en `es.js` · `[NUEVO]` hay que redactarlo.

### Parte A · El marco *(general, no depende de la carta)*
- **A1 · Qué es Human Design** — `[TIENES]` (ver texto fuente abajo)
- **A2 · La carta: el bodygraph y los 9 centros** — `[REUSA concept.center + intro corta NUEVA]`
- **A3 · Definido, indefinido y el condicionamiento** — `[REUSA lógica de centros + encuadre NUEVO]`
- **A4 · HD como experimento de desacondicionamiento** — `[NUEVO corto]`

### Parte B · Tu carta *(personalizado)*
- **B1 · Tu tipo y tu lugar en el colectivo** *(nuclear)* — `[REUSA type + bloque comparativo de los 5 tipos NUEVO, compartido]`
- **B2 · Tu estrategia** — `[REUSA strategy]`
- **B3 · Tu autoridad: cómo tomar decisiones** *(autoridad = mecanismo de decisión; distinta de la estrategia)* — `[REUSA authority + encuadre]`
- **B4 · Gestión de tu energía** — `[NUEVO por tipo]`
- **B5 · La trampa de tu tipo (errores habituales)** *(el "no-yo")* — `[NUEVO por tipo]`
- **B6 · Señales de que vas por buen camino** — `[NUEVO por tipo, muy corto]`
- **B7 · Tu perfil** *(breve)* — `[REUSA getProfileInfo]`
- **B8 · Tu definición** *(breve: única / split / etc. + qué implica)* — `[REUSA concept.definition + variante de la carta]`
- **B9 · Tus centros, uno a uno** *(cierra la Parte B; recorre definidos e indefinidos)* — `[REUSA center]`

### Parte C · Seguir explorando
- **C1 · Lectura personalizada con tu IA** (handoff Fase 6, prompt de carta completa)
- **C2 · Explora tu carta interactiva** (centros / canales / puertas con su "i")

**Contenido nuevo a redactar (acotado):** A2 (intro corta), A3 y A4 (encuadres),
el bloque comparativo de tipos de B1 (uno solo, reutilizable), y un
`typeReport[tipo] = { energía, trampa, señales }` (5 tipos × 3 bloques breves).
Lo personalizado se ensambla con datos que la carta ya expone
(`type`, `strategy`, `authority`, `profile`, `definition`, `definedCenters`).

---

## Notas de redacción (2026-06-29)

- **"bodygraph":** se usa la palabra, en minúscula, como término genérico del
  gráfico. Lo registrado por Jovian Archive es el compuesto «Rave BodyGraph™»
  (y «Rave Mandala™»); evitar ese compuesto y cualquier implicación de afiliación
  oficial. Uso no comercial → riesgo bajo. (No es asesoría legal.)
- **Condicionamiento (A3):** explicarlo de forma amplia —lo que no vivimos en
  alineamiento con nuestro diseño, por educación, cultura o miedos—, con los
  centros abiertos como vía de entrada principal. (No solo "absorber energía
  ajena en centros abiertos".)
- **Voz del informe:** segunda persona ("tu carta"); enlaces internos clicables
  con la misma dinámica de los drawers (render de ElementInfo).

## Refactor de contenido de centros (habilita B9 y mejora los chips "i")

Hoy cada centro en `es.js` guarda `paragraphs: [función, "definido…/indefinido…"]`
con **los dos estados mezclados** en una cadena. Para que B8 muestre solo el
estado real de la carta, reestructurar cada centro a campos separados:
`{ función, definido, indefinido }`.

Beneficio: el informe y el chip "i" leen de **la misma fuente**, y el chip puede
volverse **consciente del estado** (resaltar el estado real en vez de mostrar
ambos genéricos). Es refactor de contenido, no de cálculo.

---

## Armazón (scaffold) — alcance técnico

- **A. Botón disparador** junto al nombre de la carta (icono de informe) en
  `src/routes/chart/+page.svelte`.
- **B. Ventana del informe** — componente nuevo (p. ej. `InitialReport.svelte`):
  overlay a pantalla completa con navegación por secciones (acordeón/toggles o
  índice + scroll; se decide al montar).
- **C. Capa de ensamblaje** — módulo pequeño que toma la carta calculada y produce
  las secciones en orden, eligiendo lo personalizado (tipo, perfil, centros
  definidos/indefinidos, estrategia, autoridad). Es el "pegamento"; reutiliza la
  biblioteca de textos.
- **D. Reutilizar el renderizador** de `ElementInfo.svelte` para `**negrita**` y los
  enlaces internos `[texto](kind:key)`. Decisión menor al montar: dentro del
  informe, ¿enlaces clicables (abren panel) o texto plano?
- Recomendación: **overlay sobre la página de carta** (reutiliza la carta ya
  calculada). Una ruta `/chart/report` obligaría a recalcular.
- **No** hace falta: tocar el cálculo, ni rutas nuevas (si es overlay).

**Diferido:** exportar el informe a **PDF** (se hará después; no empezar por ahí).

---

## Texto fuente para A1 (aportado por el autor, ajustable)

> El símil de las hormigas es lo que más valora el autor: conservar su claridad.
> El resto es conciso y sencillo; mejorable si aporta. El descargo de "no es
> ciencia" se mantiene (tono honesto). El bloque de "4 tipos" alimenta B1.

**Qué es Human Design**

Human Design es un sistema de autoconocimiento que combina astrología, el I Ching,
el árbol de la vida cabalístico, los chakras y algo de lenguaje físico-cuántico. A
partir de tu fecha, hora y lugar de nacimiento genera una "carta" (el gráfico/chart)
que describe cómo está diseñada tu energía: cómo tomas decisiones bien, cómo gastas
y recuperas energía, y cómo interactúas mejor con el mundo. No se considera ciencia
—conviene decirlo claro— sino un marco simbólico; su valor está en si te resulta
útil como espejo, no en que sea demostrable.

**La analogía de las hormigas**

En un hormiguero no hay una "hormiga genérica". Hay exploradoras que salen a
rastrear, soldados construidas para defender, obreras que mantienen el nido, y la
reina cuya función es otra por completo. Ninguna es mejor; cada una está construida
para una manera de operar distinta, y un hormiguero funciona precisamente porque no
son todas iguales. Pedirle a una exploradora que haga el trabajo de una soldado es
agotarla en algo para lo que no está diseñada.

El error humano es suponer que sí somos todos la misma hormiga: que la
productividad, el ritmo, la forma de decidir o de iniciar deberían ser iguales para
todos. Human Design propone justo lo contrario —que hay "tipos" energéticos con
mecánicas de funcionamiento distintas— y, evidentemente, en humanos esto es mucho
más complejo y matizado que en un hormiguero: no es casta fija ni función única,
sino patrones de cómo te relacionas con tu propia energía. Lo valioso del marco es
esa mirada energética: deja de medirte con la vara de otro diseño.

**Los 4 tipos principales (por encima)** *(alimenta B1)*

- Generators (~37%) y Manifesting Generators (~33%): el grueso de la población
  (~70% juntos). Son los "constructores", con energía vital sostenida disponible
  cuando hacen lo que de verdad les enciende.
- Projectors (~20%): no tienen esa energía sostenida; su don es ver, guiar y dirigir
  a los demás. Funcionan mejor cuando se les reconoce e invita, no forzándose al
  ritmo de un Generator.
- Manifestors (~9%): los iniciadores. Pueden arrancar cosas de la nada e impactar
  sin esperar a nadie; su clave es informar a quienes su acción salpica.
- Reflectors (~1%): los más infrecuentes. Espejo del entorno; muestrean la salud
  del colectivo que les rodea.
