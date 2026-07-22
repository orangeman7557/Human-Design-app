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

Last updated: 2026-07-22.

> Latest change (2026-07-22, **corrección: el desarrollo del descanso iba en «Tu tipo», no en «Vivir tu diseño»**): el autor pidió desarrollar la gestión de la energía y el descanso en la sección **«Tu tipo»** del informe, y en la tanda anterior se escribió por error en `typeReport`, que es lo que alimenta la viñeta de **«Vivir tu diseño»**. Además faltaba la línea de cierre que remite a esa sección. Corregido:
> - **`report.type.manifestor`** (que es «Tu tipo») desarrolla ahora el descanso como **método y no recompensa**, con la proporción del **70-80%** que citan algunas fuentes y el «acuéstate cansado, no agotado», y **cierra remitiendo a [vivir tu diseño](section:practice)**. Igual en **`report.type.projector`**, con el mismo cierre.
> - **`typeReport` vuelve a su tamaño**: la viñeta de gestión de energía de Manifestador y Proyector se reduce y se parte en **dos párrafos dentro de la misma viñeta** (un ítem puede ser un array y ambos renderizadores lo maquetan con el mismo indentado), así que ya no repite lo que ahora dice «Tu tipo».
> - Los dos idiomas.
> **Verificado en navegador**: el desarrollo del descanso y el enlace a «vivir tu diseño» salen en «Tu tipo»; la viñeta de «Vivir tu diseño» queda corta y en dos párrafos indentados.
>
> Previo (2026-07-22, **el aviso inicial invita al informe y se retira solo**): el aviso de la "i" añade una segunda frase que **manda al botón «Informe»** a quien no conoce el sistema — es el mejor punto de entrada y hasta ahora no lo señalaba nada. Y deja de ser permanente: además de cerrarse con la ✕ o al abrir cualquier drawer, **se retira solo tras 5 visitas** a la página de carta (contador propio en localStorage, `hd:info-hint-views`; al pasar el tope se marca como visto para no volver a contar). La idea es que un aviso que no caduca acaba siendo mobiliario. Verificado en navegador: visible en las visitas 1-5, oculto en la 6.
>
> Previo (2026-07-22, **índice de las 192 cruces, esquema alineado y ajustes del informe**):
> **Esquema Sol/Tierra alineado** como pedía el autor: columnas de ancho fijo para etiqueta y cuerpo, así `sol`/`tierra` caen en la misma vertical en Personalidad y en Diseño, y los chips de puerta también. Espacio reducido al mínimo para que la "i" quepa justa. **En táctil la "i" ya no está siempre visible**: un toque en la etiqueta o en la palabra la revela, y el segundo toque abre el drawer — el mismo patrón de dos pasos de las tarjetas.
> **Índice completo de las 192 cruces** en el drawer general, agrupado por los **cuatro cuartos del mandala** con tres columnas (puerta del Sol · nombre + puertas · ángulo Der/Izq/Yux, R/L/Jux en inglés). Los cuartos se **derivan de `GATE_WHEEL`** (16 puertas cada uno desde la 13), y los cuartetos de puertas también: nueva `crossQuartet()` en `constants.js` que los calcula desde la rueda —Tierra a media vuelta, Sol de Diseño 16 posiciones atrás en ángulo derecho y 15 en los otros dos— con **test nuevo que la contrasta contra la efeméride en las 192**. Descripciones de cuarto de redacción propia.
> **Textos**: primer párrafo del drawer de cruz reescrito para ganar claridad (los tres ángulos); en el drawer general, enlace a *activaciones*, el aviso de tomarla «con calma y ligereza» con enlaces a estrategia y autoridad, y «las puertas sol-tierra» en vez de «el Sol y la Tierra».
> **Informe**: (1) **Manifestador** — la sección de tipo desarrolla ahora el descanso como **método, no recompensa**, con la proporción que citan algunas fuentes (70-80% de reposo) y el «acuéstate cansado, no agotado»; el **Proyector** abre con la misma idea. (2) **Enlaces de señales arreglados** — apuntaban a `signal:aligned`/`signal:misaligned`, claves que dejaron de existir cuando el drawer pasó a indexarse por tipo, así que **no llevaban a ningún sitio**; ahora apuntan al par del tipo. (3) **«Tu propósito»** avisa desde el principio de que **la palabra «propósito» engaña** y remite a estrategia y autoridad. (4) Los subtítulos del informe son ahora **enlaces**: «Tú eres un X» abre el drawer del tipo y el nombre de la cruz, el suyo.
> **BACKLOG**: anotada la mejora de **fijar abajo el bloque de «saber más usando IA»** (con su propio ascensor cuando se abre el prompt) y de permitir **ensanchar el drawer en escritorio recordando la preferencia**.
> **Verificado**: 39/39 tests (1 nuevo), build sin avisos nuevos, y en navegador — alineación exacta, índice con 192 filas y 4 cuartos.
> **Siguiente**: bump a **1.5.0** y merge a `main`.
>
> Previo (2026-07-22, **las 192 cruces con interpretación propia — proyecto cerrado**): completados los dos bloques que faltaban.
> **32 nombres de ángulo izquierdo** (cubren 64 cruces) y **64 de yuxtaposición** (64 cruces), en los dos idiomas. Con las 16 de ángulo derecho de la tanda anterior son **112 entradas por idioma que cubren las 192 cruces**. El inglés está escrito desde el significado, no traducido.
> **Enfoque por ángulo**, que es lo que las distingue: las de **ángulo izquierdo** se leen como geometría *transpersonal* —lo propio se cumple con otros y a través de otros—, y las de **yuxtaposición** como el *papel fijo* que da nombre a la cruz, sostenido con independencia del entorno. Cada entrada son 2-3 párrafos: qué significa el nombre anclado en sus cuatro puertas, cómo se traduce en una vida, y dónde está el filo.
> **El test ahora exige cobertura total**: `cross-names.test.js` comprueba las **192 combinaciones en ambos idiomas** (antes solo el ángulo derecho). Sigue vigilando además que ninguna clave quede huérfana. La caída elegante a la lectura compuesta permanece en el código como red, pero ya no se usa.
> **Verificado**: 38/38 tests, build sin avisos, drawer revisado en navegador con una carta de ángulo derecho distinta a la de referencia (Cruz de ángulo derecho de las leyes).
> **Siguiente**: bump a **1.5.0** y merge a `main`.
>
> Previo (2026-07-22, **interpretación propia por cruz — ángulo derecho completo (64/192)**): arranca el proyecto de redacción de las cruces.
> **Hallazgo estructural que reduce el trabajo un 40%**: las 192 cruces se reparten en **112 nombres únicos**, y los que comparten nombre **comparten las mismas cuatro puertas rotadas**. En concreto, **16 nombres cubren las 64 cruces de ángulo derecho** (4 claves cada uno), 32 cubren las 64 de izquierdo (2 cada uno) y 64 las de yuxtaposición (1 cada uno). Así que `crossEssence` se **indexa por nombre**, no por clave.
> **Escritas las 16 del ángulo derecho, en los dos idiomas** (Esfinge, Leyes, Explicación, Consciencia, Edén, Contagio, Planificación, Receptáculo del amor, Servicio, Cuatro caminos, Fénix durmiente, Tensión, Gobierno, lo Inesperado, Maya, Penetración). Cada una son **2-3 párrafos con valor interpretativo**: qué significa la imagen del nombre, cómo se traduce en una vida y dónde está el filo. Cubren **64 de las 192 cruces** y el ángulo más frecuente con diferencia. El inglés está **escrito desde el significado**, no traducido.
> **Clave neutra**: `crossEssence` se indexa por el **nombre inglés sin prefijo** (`'of Eden'`) en *todos* los idiomas, porque `en.js` hace deep-merge sobre `es.js` y con claves por idioma las españolas sobrevivían dentro del pack inglés. Con clave común, el merge sustituye limpio. **Dos tests nuevos** lo vigilan: que ninguna clave de ensayo quede huérfana (un texto que no se mostraría jamás) y que el ángulo derecho esté cubierto al 100% en ambos idiomas.
> **Caída elegante**: las cruces sin texto propio siguen mostrando la lectura compuesta de sus cuatro puertas, así que ninguna queda vacía mientras se completa el resto.
> **Ajustes de UI**: las seis "i" del esquema **solo aparecen al pasar por encima** (en táctil se quedan visibles, que no hay hover); huecos reducidos (`fact-label` 6,2→4,9rem, `fact-pre` 4,1→3,2rem, gap 0,45→0,3rem) — verificado que **ningún nombre de puerta se parte en dos líneas**; y fuera la frase que repetía lo ya dicho antes del esquema.
> **Verificado**: 38/38 tests, build sin avisos, drawer revisado en navegador.
> **Pendiente del proyecto**: **32 nombres de ángulo izquierdo** (64 cruces) y **64 de yuxtaposición** (64 cruces). Después de eso: bump a **1.5.0** y merge a `main`.
>
> Previo (2026-07-22, **el drawer de la cruz, reordenado**): ángulo breve → por qué se leen las cuatro puertas juntas → esquema → interpretación de esa cruz → handoff.
> **Los textos de ángulo se acortan** y dejan claro que hablan *solo* de la orientación, no de la cruz entera. El párrafo esquemático que repetía las puertas sale de arriba; en su lugar va una nota breve sobre por qué las cuatro se leen juntas (absorbe el antiguo `crossWeight`, que decía lo mismo más abajo).
> **Esquema alineado**: `fact-label` con ancho mínimo y `fact-pre` ajustado, así las filas de Diseño empiezan donde las de Personalidad (verificado: los cuatro chips en x=125) y «tierra» queda pegada a su chip. **Seis "i" nuevas** — Personalidad y Diseño abren su columna de activaciones, y cada «sol»/«tierra» abre su planeta (`fact-dot` en `ElementInfo`, reutilizando el `onnavigate` de los chips).
> **Concepto de la cruz**: los tres ángulos pasan a **viñetas** (ElementInfo estrena soporte de `bullets`, como ya tenía el informe), el «El ángulo se deduce del perfil» va en **párrafo propio**, y se añade el origen de los nombres — **confirmado por búsqueda: vienen de la geometría del mandala** (la separación angular entre el Sol de Personalidad y el de Diseño), no del hexagrama.
> **Interpretación por cruz — mecanismo listo, textos pendientes.** El drawer ya reserva su sitio (bloque `crossEssence`, misma clave que `crossName`) y **cae con elegancia** en la lectura compuesta de las cuatro puertas cuando una cruz no tiene texto propio, así que ninguna queda vacía. **Escribir las 192 interpretaciones —el «por qué se llama del Edén»— es un proyecto de redacción aparte**, no derivable de los datos: requiere conocer la imagen de cada nombre. Pendiente de decidir si se aborda por tandas.
> **Verificado**: 36/36 tests, build sin avisos, drawer revisado en navegador.
>
> Previo (2026-07-22, **cruz: lectura propia por cruz, esquema Sol/Tierra y varios pulidos**):
> **Cada cruz tiene ahora su lectura**, no solo la del ángulo. Se compone de las **esencias de sus cuatro puertas** —la misma técnica de los canales— separando el eje consciente (Personalidad) del inconsciente (Diseño), así que dos cruces del mismo ángulo ya leen distinto. **No son 192 textos escritos a mano**: eso sigue siendo un proyecto de redacción aparte; esto da especificidad real hoy y el handoff de IA cubre la profundidad.
> **Esquema del drawer**: las cuatro puertas pasan de dos listas planas a `Personalidad: sol (36) tema / tierra (6) tema` y `Diseño: …`. `ElementInfo` estrena un `pre` opcional por fila (ancho fijo, así los chips se alinean). **Título del drawer sin las puertas**, solo el nombre.
> **Concepto de la cruz**: añadido el párrafo de **por qué se llama «cruz»** (cruce de los ejes personalidad-diseño y Sol-Tierra) y el detalle de que el ángulo **sale del perfil** con ejemplos.
> **Pulidos**: el drawer general de señales ya **no destaca** el chip del tipo (parecía el drawer activo); los chips de índice **reaccionan al hover** en todos los drawers, incluido el de centros; y el glifo «i» del aviso móvil se centra con `vertical-align: middle` en vez del empujón de -2px que lo dejaba caído.
> **Nombres en español, contraste ampliado**: no existe lista completa publicada en español —solo entradas sueltas—, pero **los siete nombres que sí pude verificar coinciden** (Esfinge, Edén, Explicación, lo Inesperado, Penetración, Servicio, Consciencia, Tensión, Receptáculo del amor). Los ~105 restantes siguen siendo traducción propia con el prefijo ya corregido. Alineados también los textos de ángulo, que aún decían «cruz derecha».
> **Verificado**: 36/36 tests, build sin avisos, drawer revisado en navegador.
>
> Previo (2026-07-22, **nombres de cruz contrastados con el estándar en español**): revisión del autor sobre la tanda anterior, y tenía razón en desconfiar de mi traducción.
> **Dos errores reales encontrados al contrastar con la comunidad hispana**: el prefijo estándar no es «Cruz Derecha» sino **«Cruz de ángulo derecho»** (e izquierdo), y *The Vessel of Love* se dice **«del receptáculo del amor»**, no «de la vasija del amor». Corregidos los 192, más las etiquetas de ángulo de reserva y las del prompt.
> **Capitalización**: los nombres pasan a **sentence case** en español, como el resto del proyecto — «Cruz de ángulo derecho de la explicación» —, conservando mayúscula solo los **nombres propios de verdad**: Esfinge, Edén, Maya, Alfa. El inglés mantiene Title Case.
> **Convención nueva en CLAUDE.md §4, y vale para cualquier idioma futuro**: cuando un elemento tiene **nombre establecido** en la comunidad de Diseño Humano, se **contrasta cómo lo llama esa comunidad en ese idioma y se usa eso**, no una traducción propia por buena que suene. Es exactamente el fallo que se coló aquí.
> **Móvil**: la tarjeta de la cruz muestra el título completo **«Cruz de encarnación»** (cabe, porque ahí es de ancho completo); en escritorio sigue el corto «Cruz», que es lo que deja sitio a las cuatro puertas en la misma línea. Sincronizada la contra-regla de `pdf-shot`.
> **Verificado**: 36/36 tests (el validador de cruces sigue en verde con los marcadores nuevos) y build sin avisos.
>
> Previo (2026-07-22, **los 192 nombres de cruz, con validador**): la pieza que faltaba de la cruz de encarnación, resuelta por la vía búsqueda + validación acordada con el autor.
> **La clave que lo hizo seguro fue descubrir la estructura antes de buscar datos.** Enumerando cartas reales con el propio motor: la app produce **128 cuartetos distintos, exactamente 2 por puerta del Sol** — el de ángulo derecho por un lado, y uno compartido por izquierda y yuxtaposición. Es decir, **una cruz queda determinada por (puerta del Sol de Personalidad, ángulo)**, que son 64 × 3 = **192** combinaciones. Con eso, `computeChart` puede **regenerar el mapa completo (puerta, ángulo) → cuarteto desde la efeméride**, independientemente de cualquier tabla externa: 192 entradas, cero conflictos.
> **Validación**: las 192 filas obtenidas de material publicado se contrastaron una a una contra ese mapa. **192/192 correctas a la primera, cero discrepancias, cero ausencias.** Señal de confianza adicional: el motor reproduce por su cuenta cuartetos canónicos conocidos (`1|right → 1,2,7,13`, la *Cruz Derecha de la Esfinge*; `4|right → 4,49,23,43`, la *de la Explicación*).
> **El validador es ahora un test permanente** (`src/lib/hd/cross-names.test.js`, 4 casos): cobertura de las 192 en ambos idiomas, coherencia entre el ángulo del nombre y su clave, correspondencia con los cuartetos del motor y la geometría Sol↔Tierra, más el hecho estructural de que izquierda y yuxtaposición comparten cuarteto. **Una fila mal transcrita ya no puede colarse en silencio.**
> **Contenido**: bloque `crossName` (192 entradas por idioma, clave `"<puertaSol>|<ángulo>"`) con el **nombre completo** ya compuesto —«Cruz Derecha del Edén», «Right Angle Cross of Eden»—, evitando plantillas de artículos que se romperían en español. Los 111 nombres únicos se tradujeron al español desde el significado. Conectado en los cuatro sitios: tarjeta, título del drawer, subtítulo de «Tu propósito» y prompt de IA, todos con respaldo al ángulo si faltara una clave.
> **Legalidad, confirmada con el autor**: los nombres y títulos cortos **no son objeto de copyright** — el mismo criterio ya decidido para los nombres de canal (2026-07-02). El único matiz anotado es el derecho *sui generis* de base de datos de la UE, que afecta a volcar una compilación entera, no a usar los nombres.
> **Verificado**: **36/36 tests** (4 nuevos), build sin avisos, y en navegador — la carta de referencia sale como **«Cruz Derecha del Edén (36/6 | 11/12)»** en tarjeta, drawer, informe y prompt, y en inglés «Right Angle Cross of Laws»; consola limpia.
>
> Previo (2026-07-22, **«i» de definición y peso + tercera pasada de la traducción del informe**):
> **Las dos "i".** La de **definición** pasa al **lado izquierdo** del texto, inline en un hueco fijo: como la nota está alineada a la derecha, ese es el lado con sitio — a la derecha o tapaba el texto o se salía de la tarjeta. Verificado que al aparecer **no desplaza la nota** (0px) y que se queda dentro. La de **peso** deja de ser superíndice también en móvil y va **inline pegada a la etiqueta** (margen 0,05rem): medido, cabe y queda **9,6px dentro** del borde derecho de la tabla (lo que sobresale del scroller es el desplazamiento horizontal normal de la tabla).
> **Tooltip de Diseño** reordenado en los dos idiomas: «Se define ~88 días antes del nacimiento (88° de arco solar)» — el dato útil primero y el tecnicismo entre paréntesis.
> **Tercera pasada de traducción, y esta vez sobre el bloque que se había quedado fuera de las dos anteriores.** El autor señaló que el informe inglés suena a traducción; revisando, las dos pasadas de julio habían cubierto la Parte A, el colectivo, los drawers y `typeReport`, pero **no los cuerpos de `report.type`** — que son justamente la sección «You are a X», de las más leídas. Estaban llenos de calcos: *"generative and renewable in character"*, *"satisfaction appears"*, *"a gut reaction of attraction or rejection arises"*, *"the symptom that appears when you are not living in alignment is bitterness"*, *"not to execute in a sustained way"*, más un primer párrafo de GM de 60 palabras en una sola frase. **Los cinco tipos × 3 párrafos reescritos desde el significado**, con frases más cortas y sintaxis inglesa. Ejemplo: *"When you commit your energy to the right thing, satisfaction appears"* → *"Commit your energy where the answer was yes and you feel satisfaction. Force it where there was no answer and you get frustration instead."* Además, limpiados los calcos restantes de los **cuerpos de centro** del informe (*"emptied out healthily each day"* → *"run right down by bedtime"*, *"you run your own emotional waves"* → *"you have emotional waves of your own"*, y las cinco fórmulas *"you have a consistent X"*).
> **Verificado**: 32/32 tests, build sin avisos, informe inglés releído en navegador y consola limpia.
> **Abierto — nombres de cruz**: consultado con el autor. Legalmente **no hay problema** (los nombres son títulos cortos, mismo criterio ya decidido para los canales en 2026-07-02); el freno es **factual**, no legal: el asistente no puede reproducir de memoria 768 mapeos nombre↔cuarteto de puertas sin inventarlos, y ningún test lo detectaría. Pendiente de decidir la vía de obtención (lista aportada por el autor, o búsqueda web + **validación estructural** contra el propio `constants.js`, que puede comprobar mecánicamente que las cuatro puertas de cada fila forman pares Sol/Tierra opuestos y cazar así los errores de transcripción).
>
> Previo (2026-07-22, **la definición se comporta como el resto de elementos**): el ojo de mostrar/ocultar **se retira** — el autor lo descartó por UX — y la nota de definición pasa a funcionar **exactamente igual que los centros, canales y puertas**, que es lo que ya sabía hacer el usuario: en escritorio el *hover* resalta la definición en el bodygraph y saca su "i", y el clic sobre el texto **no hace nada**; en táctil el primer toque **resalta (ámbar) y muestra la "i"**, y solo la "i" abre el drawer. Reutiliza `onChipClick`/`revealForPinned`, la maquinaria que ya tenían los chips, en vez de un mecanismo propio.
> **La "i" pasa a superíndice flotante** (`.dot-slot`, como la de «Peso») en lugar del hueco reservado a la derecha: la nota está alineada a la derecha, así que un hueco propio la empujaba fuera de la tarjeta. Y **las dos se separan del texto**: la de la definición a `right: -13px` (pisaba 8px del último carácter, ahora 4) y la de «Peso» de -8 a -12px.
> **Título dentro del drawer de definición.** El nombre de la definición concreta deja de ir en negrita dentro del párrafo y pasa a ser un **subtítulo de verdad**: `ElementInfo` estrena soporte para `{ subhead }` en `paragraphs` —la misma forma que ya usaba el informe—, pintado en **ámbar y en su propia línea**. Así se ve el salto del encuadre general al elemento concreto. Verificado el orden: párrafo general → subtítulo ámbar → texto de la definición.
> **Limpieza**: retiradas las claves `showDefinition`/`hideDefinition` (ya sin uso) y la regla `.card.pointer`, huérfana desde que desapareció la tarjeta de definición — el build la cantó como *unused CSS selector*.
> **Verificado**: 32/32 tests, build **sin ningún aviso de CSS/JS**, y en navegador a 1280px y 375px — hover que resalta y saca la "i", clic en el texto que no abre nada, clic en la "i" que sí, la ruta táctil ejercitada forzando `pointer: coarse` (toque 1 resalta + "i", toque 2 sobre la "i" abre), superíndice dentro de la tarjeta y consola limpia.
>
> Previo (2026-07-22, **las señales pasan a leerse por parejas + ajustes de tarjetas**): segunda ronda de retoques del autor.
> **Un drawer por PAREJA, no por polaridad.** Desaparecen los drawers sueltos de alineamiento y desalineamiento: pulsar cualquiera de los dos valores abre **el mismo drawer**, el de la pareja, porque una señal por separado dice poco — lo que informa es **cuál de las dos predomina**. La clave del drawer pasa a ser el **tipo**, y el título lleva el tipo entre paréntesis para distinguir las dos parejas que comparten palabras: **«Satisfacción/Frustración (Generador)» vs «(GM)»** (etiqueta corta nueva `labels.typeShort`; el acrónimo sigue el orden de cada idioma — GM en español, MG en inglés). El rótulo de categoría pasa de «Señal» a **«Señales de alineamiento/desalineamiento»**. En la tabla, lo clicable es ahora **la pareja** (primera columna) y el tipo queda como nota, y la tabla aparece **también en el drawer general** de señales.
> **Tarjeta de señales**: etiqueta de vuelta a **«Señales»** (cabía en una línea, «Señales de alineamiento» partía en dos), **los dos iconos en gris** —ninguno en dorado: el drawer insiste en que la señal de desalineamiento es información y no un defecto, así que marcar una como «la buena» contradecía el texto— y **tooltip** en cada glifo con «señal de alineamiento» / «señal de desalineamiento».
> **Chip de tipo resaltado más contenido** (0,85 → 0,78rem, padding menor, `nowrap`): con eso **«Generador Manifestante» resaltado cabe en una sola línea** tanto en escritorio (donde antes partía en dos) como en móvil (donde empujaba los chips a una tercera fila). Verificado con una carta GM: 1 línea, tarjeta de 118px.
> **Definición.** En móvil la nota se muda a la **esquina superior derecha** de la tarjeta de Centros (los chips dejan ese hueco libre, así que no cuesta altura); en escritorio se queda abajo. Y estrena un **ojo de mostrar/ocultar** a su derecha: en táctil no hay hover, así que hasta ahora **la agrupación de la definición no se podía ver en el bodygraph de ninguna manera** desde el móvil. Además, el drawer específico de cada definición muestra ahora el **encuadre general y luego el nombre de la definición en negrita** al frente de su propio texto (misma forma que usa el perfil con sus dos líneas). El drawer general se mantiene aunque ya no se llegue a él desde la carta, porque hay textos que lo enlazan.
> **BACKLOG**: anotada la idea de poner el **icono del bicho** al final de los textos explicativos, discreto y abajo a la derecha, para quien quiera mandar feedback del texto.
> **Ancho de escritorio: decisión de no tocarlo** (autor). El análisis queda registrado: el freno no es `main` sino que los overlays cuelgan de `.graph`, así que ensanchar el contenedor solo añade margen vacío; y ensanchar el gráfico lo haría **más alto** (relación 1:1,54), que es justo lo que el 660px evitaba. Queda anotado que al autor no le convence que las tarjetas bajen tanto y queden pegadas al Bazo.
> **Verificado**: 32/32 tests, build sin avisos nuevos (los de `mouseover`/`focus` son previos), y en navegador a 1280px y 375px en ES y EN — apertura por pareja desde ambos valores, título con «(GM)», tabla con la pareja clicable navegando a las otras parejas, tooltips, nota de definición a 8px del borde superior en móvil, ojo alternando el resaltado, y consola limpia en pestaña nueva.
>
> Previo (2026-07-22, **ajustes sobre las señales y la cruz + la definición se funde en Centros**): repaso del autor sobre la tanda anterior.
> **Bug de markup, y era general.** El drawer de la cruz mostraba `[Personalidad](activationCol:personality)` en crudo. Causa: el regex de `renderInline` (`markup.js`) exigía `[a-z]+` para el *kind*, así que **cualquier kind en camelCase nunca casaba** — no era un fallo del texto nuevo sino una limitación latente del renderizador desde siempre. Ahora acepta mayúsculas. El PDF no estaba afectado (su `parseRuns` no restringe el kind).
> **Señales, de 5 líneas a 3.** Título «Señales de alineamiento», y cada polaridad en una sola línea con un glifo **⊕ / ⊖** (círculo con + / −, mismo trazo de 2px que los iconos de compartir/descargar) en vez de la palabra. Las palabras «Alineamiento»/«Desalineamiento» siguen ahí para lectores de pantalla y como `title`. **No van en verde/rojo a propósito**: los drawers insisten en que la señal de desalineamiento es *información*, no un defecto, y un rojo de peligro contradiría el texto — el alineado toma el ámbar de acento y el otro se queda apagado.
> **Cruz.** En la tarjeta la etiqueta pasa a ser solo **«Cruz»** (el drawer y la categoría conservan «Cruz de encarnación»), lo que deja sitio a las cuatro puertas **en la misma línea, ajustadas a la derecha**, y al nombre del ángulo con el ancho entero debajo. Antes las puertas se caían a una segunda línea en escritorio.
> **La definición se funde en Centros.** Desaparece su tarjeta y su etiqueta: el valor («Definición split») queda como **nota pequeña en el extremo inferior derecho de la tarjeta de Centros**, y al pulsarla abre su drawer directamente. Como la "i" de concepto desaparece con la etiqueta, **cada drawer de definición abre ahora con el encuadre general** que esa "i" llevaba (una plantilla `drawer.definitionIntro` que se antepone en `getElementInfo`, en vez de reescribir los 5 textos × 2 idiomas).
> **Drawer de señales**: estrena la tabla de **las señales de los cinco tipos**, con el de la carta destacado, reutilizando el mismo `related` que usan estrategia, autoridad y definición; los chips navegan al tipo.
> **Móvil.** (1) La etiqueta TIPO deja de comerse una fila entera: comparte línea con los primeros chips (el bloque más alto por encima del bodygraph, así que es donde estaba el ahorro). (2) La "i" de las etiquetas de tarjeta se pega al texto — margen a la mitad (0.18 → 0.09rem); el `letter-spacing` de la etiqueta ya dejaba aire de sobra. (3) **La "i" del bodygraph salía como superíndice**: el contenedor de altura 0 estiraba `.bg-title` a 0 (flex `stretch`), así que el `top:50%` del punto no tenía sobre qué centrarse; con `align-items: flex-start` la etiqueta conserva su altura y la "i" queda en línea (verificado: desplazamiento del centro = 0,0px).
> **Timeout de captura.** `toBlob` puede colgarse sin resolver ni rechazar (el cuelgue conocido en Chromium embebido): ahora va envuelto en un `Promise.race` de 30 s que **convierte el cuelgue silencioso en el `shareError` normal**, en vez de dejar los botones muertos hasta recargar. Nueva clave `chart.errImageTimeout` en los dos idiomas.
> **`pdf-shot` sincronizado** con las dos reglas móviles nuevas (`.type-card` en fila y la cruz a todo el ancho).
> **Verificado**: 32/32 tests, build sin avisos, y en navegador a 1280px y 375px en ES y EN — los tres enlaces del drawer de la cruz ya se renderizan, la tabla de los cinco tipos aparece, la nota de definición abre su drawer con el encuadre general delante, TIPO comparte línea con los chips, la "i" del bodygraph centrada, y consola limpia. **Medido**: la separación etiqueta→valor es idéntica (2,4px) en todas las tarjetas — el aire que se veía en Señales era que **el título nuevo no cabe en la columna de 192px y parte en dos líneas** (dato para la decisión pendiente sobre el ancho de la app).
> **Abierto**: si ampliar el ancho de escritorio (análisis entregado al autor; el freno no es `main`, sino que los overlays cuelgan de `.graph` y las alas del Bazo/Plexo dejan ~0 de holgura a la izquierda en la parte baja del stack).
>
> Previo (2026-07-22, **señales de alineamiento/desalineamiento + cruz de encarnación**): los dos datos que el análisis funcional de 2026-07-06 marcaba como los que faltaban (BACKLOG § "Functional gap analysis", ítems 1 y 2) ya están en la carta.
> **Señales.** La *firma* y el *tema del no-yo* se muestran como **una sola tarjeta con dos valores** —«Alineamiento: paz» / «Desalineamiento: enfado»—, cada uno con su propia "i", más la "i" de concepto de la tarjeta: tres drawers en el espacio de uno. Se llaman **señales** a propósito (decisión del autor): «firma» y «tema del no-yo» son jerga opaca para quien llega nuevo, así que el nombre canónico se menciona **dentro** del drawer, no en la tarjeta. No hay entrada propia por señal: `getSignalInfo(polaridad, chart)` la compone desde el **tipo** de la carta, igual que el perfil se compone desde sus dos líneas.
> **Cruz de encarnación.** Nuevo `chart.cross = { angle, gates }` en `chart.js`: las cuatro activaciones Sol/Tierra en el orden de la notación (`36/6 | 11/12`) y el ángulo, que sale de una **tabla por perfil** (1/3…4/6 → derecha, 4/1 → yuxtaposición, 5/1…6/3 → izquierda). **Sin los ~768 nombres canónicos** (decisión del autor: van en una tanda propia): la tarjeta muestra el ángulo, y el drawer **compone el significado desde las esencias de las cuatro puertas** —que ya existían— agrupadas en Personalidad/Diseño, más la nota de que son las activaciones de más peso. Es exactamente la técnica de los canales en la 6.D, y funciona: el drawer es útil sin la tabla.
> **Colocación** (dos iteraciones con el autor). La primera propuesta —Definición bajo Centros en escritorio pero dentro de la rejilla en móvil— obligaba a que la tarjeta **cambiara de contenedor entre breakpoints** (`.overlay.right` se va debajo del bodygraph en móvil), lo que pedía snippets duplicados o un `top` absoluto atado a la altura de Centros. El autor reordenó y **el problema desapareció**: Definición se queda con Centros en los dos breakpoints, y el orden móvil (Estrategia, Autoridad, Señales, Perfil, Cruz) **coincide con el orden del DOM** de la columna izquierda — una rejilla normal por filas, sin colocación explícita y sin divergencia entre orden visual y orden de lectura. Escritorio: izquierda = Tipo · Estrategia · Autoridad · **Señales** · Perfil · **Cruz**; derecha = Centros · **Definición**. Móvil: Tipo a lo ancho, 2×2, y la **cruz cerrando a todo el ancho** (`grid-column: 1/-1`), con las cuatro puertas a la derecha en la línea de la etiqueta —son clicables y abren su puerta— y el nombre debajo con el ancho entero.
> **`pdf-shot` sincronizado** (el fichero ya avisaba de que hay que hacerlo a mano): la contra-regla que devuelve `grid-column: auto` a la cruz está puesta, y **verificado a 375px** — con la clase aplicada la columna vuelve a ser flex absoluta de 192px y la cruz mide 192, no el ancho completo.
> **Informe.** (1) El último punto de «Vivir tu diseño» **nombra ahora los dos campos y enlaza a sus drawers** en los 5 tipos y los 2 idiomas, que era el solape que el BACKLOG anticipaba. (2) Sección nueva **«Tu propósito»**, colocada **después** de «Vivir tu diseño» y explícitamente subordinada a ella («el propósito no se persigue, se cumple viviendo tu diseño»). El BACKLOG la proponía tras el perfil; el autor la puso al final para que un recién llegado no se quede con «mi propósito» y se salte estrategia y autoridad. **El PDF no necesitó cambios**: la sección solo usa formas de párrafo ya soportadas (cadenas + un `subhead`).
> **Un fallo pillado en navegador, no en los tests**: la plantilla del drawer de señales decía `la "{otherName}"` y producía **«la "Enfado"»** — los nombres cambian de género (la paz, el enfado), así que el artículo se ha quitado. Y el subtítulo de la cruz en el informe salía en minúsculas en inglés («Right angle cross») porque se construía desde `promptLabels`; ahora usa las **etiquetas de display**, que respetan el Title Case inglés.
> **Verificado**: **32/32 tests** (2 nuevos: las cuatro puertas en orden de notación y el ángulo derivado del perfil, con el ancla 6/2 cubriendo el ángulo izquierdo — la yuxtaposición 4/1 queda sin carta de referencia a propósito), build sin avisos, paridad de catálogos, y en navegador a 1280px y 375px en **ES y EN** — colocación exacta en ambos breakpoints, los tres drawers nuevos abriendo con su contenido compuesto, el prompt de la cruz bien formado, el informe con la viñeta de señales enlazada y «Tu propósito» en el índice y en su sitio, y consola limpia. **No verificable aquí**: la portada del PDF, por el cuelgue conocido de `toBlob()` en Chromium embebido (BACKLOG § "Latent") — sin excepción en consola, y el renderizador no estrena formas.
> **Siguiente**: la **tabla de ~768 nombres de cruz**, ya como tanda propia.
>
> Previo (2026-07-22, **batería de testeo de usuario + lote de arreglos previo al 1.4 — versión 1.4.0**): repaso completo de la app como usuario (escritorio y móvil, español e inglés) antes de pasar a producción. Lo encontrado se clasificó con el autor y se arregló en dos commits.
> **El hallazgo gordo: fuga de idioma en el prerender.** El HTML estático de `/es` se publicaba con el chrome en inglés — pie "report a bug · privacidad · about", "learn more" en la nota de cartas guardadas. Causa: el locale es un `$state` **de módulo** y el prerender construye `/en` y `/es` **en paralelo**, así que cualquier componente que lo lea pierde la carrera. La regla de oro del SSR ya estaba documentada, pero decía *"páginas usan `tr`, componentes usan `t`"* — **y eso era falso**: `About`, `ReportBug` y `StorageInfo` son modales, pero sus **disparadores se pintan dentro de la home prerenderizada**. Se autocorregía al hidratar, por eso **nunca se veía en dev, solo en el build** — y los crawlers veían la versión rota. Fix: nuevo helper `routeT()` en `lib/i18n/route-t.svelte.js` que ata `t()` al idioma de la ruta; regla corregida en `docs/fase-m-multilingue.md` ("cualquier cosa que pueda renderizarse durante el prerender debe atarse a la ruta"). Verificado en el HTML compilado: **cero cruces en ambos sentidos**, incluidas las dos `/privacy`.
> **Más texto hardcodeado que llegaba al usuario equivocado**: errores de imagen/PDF de la página de carta (→ `chart.errDownload` / `chart.errPdf`), el error de importación de `db/charts.js` (ahora lanza un **código** y se traduce en el call site), el `aria-label="Language"` del selector, y los defaults en español de `report-pdf.js`, `InfoDot` y `Dialog` (→ idioma por defecto).
> **Dos errores factuales de contenido, en los dos idiomas**: el **Bazo aparecía como centro motor** y la lista de motores del Manifestador contradecía `MOTOR_CENTERS` (solo el Corazón y el Plexo solar pueden motorizar la Garganta); y la **definición de GM** decía "Sacral conectado a la Garganta" cuando `computeType` pide Sacral definido **+ Garganta motorizada por cualquier motor**.
> **Contenido español**: gramática rota ("que sois", "puedes ensimismarte o costarte abrirte", "del lugar en que vive"); el ciclo lunar del Reflector se decía **cuatro veces literalmente igual** y ahora cada sección lo dice a su manera; "Human Design" → **"Diseño Humano"** en todo el contenido (marca y SEO conservan el término inglés a propósito); porcentajes normalizados a `~37%`; "Ocultar prompt" en todos sitios; Cabeza/Ajna/Raíz dejan de deslizarse a 1ª persona del plural; "activaciones" deja de significar dos cosas distintas en dos drawers.
> **UX**: los drawers "i" eran **indescubribles** (solo hover, sin pista) → aviso de una sola vez, **solo en móvil**, en cajita con acento ámbar y cerrable, que desaparece para siempre al abrir el primer drawer; el cuerpo del drawer parecía terminar en el pliegue (macOS oculta las barras de scroll) → **degradado inferior** como pista; el enlace "Manifestador" de «Acerca de» pasa a **texto plano** (sigue funcionando, ya no se anuncia — huevo oculto a petición del autor); los errores de envío **se limpian al corregirlos** en vez de quedarse en rojo junto a un campo ya validado; los tooltips de la cabecera **se abren hacia abajo** (arriba los cortaba el borde del viewport); nombre de carta **limitado a 60 caracteres**; y `prompts.js` deja de asumir que existe una carta.
> **Ajustes posteriores del autor**: el selector de idioma pasa de `fixed` a `absolute` (pertenece a la parte de arriba de la página, no al viewport: se va al desplazar); "gratis y sin registro" → **"gratis, sin registro"**; y el modal de fallos en inglés **reescrito entero** porque sonaba a calco del español, con el título en sentence case ("Report a bug or Send a suggestion") — anotado en el catálogo que **no debe re-sincronizarse literalmente** con el español.
> **Retirado del BACKLOG**: la verificación pendiente del canal **30-41** (a petición del autor).
> **Lo que se decidió NO arreglar** queda anotado en BACKLOG § "QA review before 1.4" para no redescubrirlo: nombres de canal 10-57 y 7-31 a confirmar, lector masculino en español, comillas rectas, guardado duplicado, datos personales en la query del enlace compartido, y que `toBlob()` no tiene timeout.
> **Verificado**: 30/30 tests, build sin errores, cero cruces de idioma en el HTML prerenderizado, y en navegador — aviso solo en móvil, selector que se desplaza, error que se limpia al elegir ciudad, enlace de «Acerca de» indistinguible del texto, `maxlength=60`, y el modal inglés nuevo. **PNG, PDF y Escape confirmados por el autor** en navegador real. Commit + merge a **staging**. **Bump a 1.4.0.**
> **Siguiente**: **merge a producción (`main`)**.
>
> Previo (2026-07-21, **fix: sangría del segundo párrafo en las viñetas del perfil**): en "Tu perfil" del informe, cada línea se pintaba como una viñeta con su primer párrafo y el segundo caía **fuera** de la lista, volviendo al margen de la sección. Ahora **una viñeta por línea contiene todos sus párrafos**: un ítem de viñeta puede ser un array, y los dos renderizadores lo maquetan como varios párrafos que comparten la sangría del punto — `InitialReport.svelte` como varios `<p class="bpar">` dentro del mismo `<li>` (con su CSS de separación), y `report-pdf.js` como varios párrafos bajo un único punto dorado. Las viñetas de una sola cadena (los tres puntos de "Vivir tu diseño", los cinco tipos) siguen funcionando igual — el cambio es retrocompatible. Verificado en navegador midiendo el DOM: 2 viñetas × 2 párrafos, **mismo margen izquierdo (339px)** en español e inglés, sin párrafos sueltos fuera de la lista salvo la entradilla, que va aparte a propósito. 30/30 tests, build sin avisos, PDF regenerado en Node sin excepción, consola limpia en pestaña nueva. Commit + merge a **staging**.
>
> Previo (2026-07-21, **segunda pasada de calidad — traducción inglesa terminada**): reescrito lo que quedaba pegado al español: los drawers de **estrategia (5), autoridad (7), perfil (6), definición (5) y centros (9)**, sus **cuerpos en 2ª persona dentro del informe**, las **esencias de los 36 canales** y las **de las 64 puertas**. Con eso, a falta de la lectura del autor, no queda ningún bloque traducido literalmente.
> **Dos cosas que se arreglaron de paso.** (1) Los drawers habían derivado a **2ª persona** ("the design asks you to…") cuando por norma del proyecto son **impersonales** — el que mira puede estar viendo la carta de otra persona—; reescritos en impersonal, y el "tú" queda solo en el informe, que es donde toca. (2) Las esencias de puerta se componían como `Puerta N es …`, y al reescribirlas en inglés eso producía frases rotas ("Gate 36 is Emotional upheaval…"); ahora cada esencia **abre con su propia afirmación** y el prefijo forzado desaparece. Detectado en navegador, no en los tests.
> **Terminología:** se mantiene **"Complete Channels"** (decisión del autor). Y "Channel of Judgement" → **"Judgment"**, que se había quedado en británico.
> **Verificado**: 30/30 tests, build sin errores, **96 % del contenido traducido** (875 hojas; el 4 % restante son palabras idénticas en ambos idiomas), **cero claves ausentes**, sin residuos británicos ni "Solar plexus", y en navegador — informe inglés con los cuerpos nuevos, drawer de puerta bien formado, y **español sin cambios**; consola limpia en pestaña nueva. Commit + merge a **staging**.
>
> Previo (2026-07-21, **capitalización inglesa + primera pasada de calidad de la traducción**):
> (1) **Capitalización por idioma.** El *sentence case* pasa a ser lo que siempre fue: la norma **española**. El inglés adopta **Title Case** en nombres y encabezados — "Solar Plexus", "Complete Channels", "Wait for the Invitation", "Your Centers and Your Conditioning", "The Darkening of the Light" —, dejando en sentence case la prosa y los mensajes de error, y capitalizando los nombres propios de HD también dentro de frase. Aplicado a etiquetas, títulos de drawer, secciones del informe, temáticas de las 64 puertas, nombres de los 36 canales, los 64 hexagramas y el chrome de UI. **El español no se toca.** Regla recogida en CLAUDE.md §4, en `docs/fase-m-multilingue.md` y en la memoria del proyecto.
> (2) **Primera pasada de calidad de la traducción.** Reescritos **desde el significado** (no revisando contra el español): la Parte A del informe (intro, hormigas, bodygraph, condicionamiento, experimento), la comparación con el colectivo y sus entradillas, los diez drawers de concepto, los cinco drawers de tipo y el bloque práctico por tipo. El párrafo que señaló el autor pasa de "As in the ant simile, the Human Design types describe the different ways of being designed to use energy…" a **"Back to the ants. The Human Design types describe the different ways a person can be built to use energy. No type is better than another…"**. Frases más cortas, idioma natural, sin calcos de la sintaxis española.
> **Queda a propósito para una segunda pasada** (anotado en BACKLOG, ítem ahora 🟡): los cuerpos en 2ª persona de estrategia/autoridad/perfil/definición/centros dentro del informe, sus drawers, y las esencias de las 64 puertas y 36 canales — más cortas y formulaicas, se leen bien, pero siguen pegadas al español. Sigue abierta la decisión de "Complete Channels" vs "defined channels".
> (3) **Dos incidentes de proceso, documentados para no repetirlos.** Editando el pack inglés por script, dos anclajes mal elegidos destrozaron el fichero: buscar `  concept: {` casó primero con el `concept` **anidado** en `promptTemplates` y arrasó `drawer` y `reportShell`; y reemplazar hasta un comentario situado varios bloques más abajo se llevó `iching` y `channel`. Ambos restaurados desde git y recolocados. **Lo detectó el test de paridad** (avisó de un 19,6 % del contenido cayendo al español, frente al 4 % normal), que era exactamente para lo que se escribió. Procedimiento correcto anotado en `docs/fase-m-multilingue.md`.
> **Verificado**: 30/30 tests, build sin errores, 96 % del contenido traducido (el resto son palabras idénticas en ambos idiomas), y en navegador — carta e informe en inglés con Title Case y "Solar Plexus", drawer de puerta con título, canal y hexagrama capitalizados, y **español sin cambios** (sentence case, "Plexo solar", "indefinido"); consola limpia en pestaña nueva. Commit + merge a **staging**.
>
> Previo (2026-07-21, **lote de ajustes tras revisar el multiidioma en staging**): once encargos del autor, entre traducción, UI y bugs.
> **Traducción.** (1) Todo el inglés pasa de británico a **americano internacional** (`centers`, `recognize`, `organization`, `personalized`, `toward`…): ~150 sustituciones en `ui/en.js` y `content/en.js`, verificado que no queda residuo. (2) Revisada la **terminología HD central**: tipos, estrategias, autoridades, definiciones, centros, Personality/Design, hanging gates y bodygraph coinciden con el uso habitual. Quedan **dos decisiones abiertas anotadas en BACKLOG**: "Complete channels" (HD también dice "defined channels") y si los centros deberían ir en title case al estilo HD ("Solar Plexus") en vez del sentence case del proyecto. (3) El **título de categoría de los drawers** salía en español: los 22 atributos `data-info-cat` llevaban la etiqueta fija; ahora llevan la **clave** y la etiqueta se resuelve al renderizar. (4) **"Report a bug"**: traducidos el texto descriptivo (ambas variantes), el rótulo "¿Qué ha pasado?" y el placeholder. (5) El **informe** traduce ya el descriptor de centro, y en español pasa de "abierto" a **"indefinido"** (también en el PDF).
> **Selector de idioma.** Rediseñado: estética del badge de staging —pestaña fina colgando del borde superior— pero en **neutro**; alineado al **borde derecho del contenido** (no de la ventana) vía un `contentMax` por ruta; y **z-index 30**, por debajo de todos los overlays (drawers 40/60, informe 50, diálogos 70), así que ya no se queda por delante. Medido: 20px de alto, a 12px del borde del contenido, y **sin solapar el botón de guardar a 375px** (el tag ocupa 0-20px y el botón empieza en 26).
> **Bugs.** (6) **PDF, barras de centro rotas**: `barTop` se capturaba antes de pintar el texto, así que si la tarjeta partía de página la línea iba de una coordenada de la página anterior a otra de la nueva (se alargaba, se montaba o desaparecía). Ahora la barra se dibuja **por segmentos, uno por página**, con `setPage`. (7) **Flecha de volver**: tras cambiar de idioma, `history.back()` devolvía a la misma carta en el idioma anterior; ahora va siempre al **home del idioma actual**. (8) **Drawer abierto al cambiar de idioma**: el stack guardaba el contenido resuelto en el idioma previo; un efecto lo **re-resuelve** al cambiar `lang` (la ruta principal del bug queda además cerrada por el z-index, que impide pulsar el selector con un drawer abierto).
> **Informe.** (9) "Vivir tu diseño" muestra sus tres puntos (energía · trampa · señales) con **viñetas**, como los tipos. (10) El **perfil** marca con viñeta cada una de sus dos líneas. (11) BACKLOG: anotado que al añadir **firma/no-yo** habrá que reescribir la sección de señales para que no se repita, y que la **cruz de encarnación** obligará a reubicar algo en el informe.
> **Calidad de la traducción.** El autor señala que algunos párrafos suenan a traducción literal más que a inglés escrito. Anotado en BACKLOG como revisión pendiente, con el ejemplo aportado y el diagnóstico (calcos de la estructura española) — reconocido: el pase priorizó fidelidad sobre naturalidad, y la prioridad del proyecto es claridad y cercanía.
> **Verificado**: 30/30 tests, build sin avisos, PDF regenerado en Node (2 páginas, tarjetas partidas, sin excepción), y en navegador — selector a 12px del contenido y sin solapes a 1280px y 375px, con drawer abierto el clic lo recibe el **scrim** (no el selector), categoría "GATE"/"PUERTA" según idioma, modal de fallos en inglés, informe con 3+2 viñetas y `defined`/`undefined` · `definido`/`indefinido`, consola limpia. Commit + merge a **staging**.
>
> Previo (2026-07-21, **fix: el selector de idioma prerenderizaba el código equivocado**): detectado al revisar el despliegue de staging: en el HTML estático de `/es` el tag del selector salía como **"EN"** (se autocorregía al hidratar, pero el HTML servido —y lo que ve un buscador o alguien con JS lento— estaba mal). Causa: `LangSwitch.svelte` leía el idioma de `getLocale()`, el `$state` **de módulo**, y el prerender construye las páginas **en paralelo**, así que ese estado sangra entre páginas. Es exactamente la regla de oro del SSR ya documentada en `docs/fase-m-multilingue.md` §3, que se había aplicado a las páginas pero **no al propio selector**, que vive en el layout raíz y por tanto se prerenderiza en todas. Fix: `current` pasa a derivarse de `$page.params.lang`, con `getLocale()` solo como respaldo para rutas sin segmento de idioma (p. ej. la página de error). Verificado: prerender `/en` → "EN" y `/es` → "ES"; en navegador, menú con el idioma actual marcado y cambio ES→EN correcto (URL, tag y textos). 30/30 tests, build OK. Commit + merge a **staging**.
>
> Previo (2026-07-21, **Fase M · política de privacidad en inglés — FASE M CERRADA DEL TODO**): **la última pieza que quedaba en español ya está traducida.** La prosa de `/privacy` se ha movido al catálogo (`ui/<lang>.js` → `privacy`), así que un idioma nuevo la cubre sin tocar el componente, y la página se reescribe leyendo de ahí. La versión inglesa **no es traducción literal**: sigue las convenciones de una política inglesa de este tipo — voz consistente en "we", *data controller* en lugar de "responsable", los derechos del RGPD enumerados como se hace en inglés (*access, rectify, erase, object, restrict, portability*) y fecha en formato británico ("7 July 2026"). Dos detalles técnicos que dejaron aviso: (1) la página es **prerenderizada**, así que aplica la regla de oro del SSR (idioma del parámetro de ruta pasado explícito a `t()`); y (2) su prosa se inyecta con `{@html}`, de modo que `strong`, `code` y `a` **pierden el scope de Svelte** — el compilador lo cantó como "unused CSS selector" y hubo que pasarlos a `main :global(...)` o se quedaban sin estilo. El renderer es propio de la página (`md()`), no `$lib/markup.js`, porque ese convierte `[x](kind:key)` en enlaces internos y se tragaría `https:` como si fuera un tipo. Verificado: **30/30 tests**, build OK, prerender de `/en/privacy` y `/es/privacy` con su `lang`, enlaces externos con `rel="noopener noreferrer"`, `code`/`strong`/enlaces con estilo correcto, **cero español filtrado en la página inglesa**, español sin regresión y consola limpia. Commit + merge a **staging**.
>
> Previo (2026-07-21, **Fase M · turno 2 — traducción al inglés**): **la app entera funciona en inglés y en español.** Detalle en [`docs/fase-m-multilingue.md`](./docs/fase-m-multilingue.md).
> (1) **Andamios fuera del código.** Todo el texto conectivo que vivía incrustado en `prompts.js`, `report.js` y `content/index.js` (el marco "En el marco de Human Design…", las codas de estado de puertas y canales, los títulos compuestos, las etiquetas de las fichas, los títulos de sección del informe y el prompt de cierre) se ha movido al pack de contenido como **plantillas con marcadores `{…}`** (`promptTemplates`, `drawer`, `reportShell`). Es texto atado a la gramática (artículos, género, orden de palabras), así que traducirlo era imposible sin esto. **Ya no queda español en el código de `lib/hd/`.**
> (2) **Contenido traducido**: los 8 conceptos, 5 tipos, 5 estrategias, 7 autoridades, 6 líneas de perfil, 5 definiciones, 9 centros (función + ambos estados), 13 planetas, 36 canales, 64 puertas, 64 nombres de hexagrama, el informe inicial completo (marco, colectivo, y los cuerpos en 2ª persona de tipo/estrategia/autoridad/perfil/definición/centros) y el bloque práctico por tipo. Medido: **875 hojas de texto, 96 % traducidas**; el 4 % restante son palabras idénticas en ambos idiomas (Reflector, Ajna, Sacral, Venus…) y valores neutros (`tier`).
> (3) **Chrome de los componentes de prosa** que el turno 1 había dejado fuera: `ElementInfo` (drawer + bloque de IA), `InitialReport` (incluido el **índice** de secciones), `About`, `ReportBug`, `StorageInfo` y la portada del **PDF**. `report-pdf.js` recibe ahora sus rótulos por parámetro en vez de importar la app, para conservar su propiedad de ser testable en Node plano.
> (4) **Ojo legal**: los 64 nombres de hexagrama en inglés son **redacción propia descriptiva**, deliberadamente **no** la traducción Wilhelm/Baynes (con copyright), igual que el español sigue Wilhelm/Vogelmann.
> (5) **Test nuevo** (`src/lib/i18n/catalog.test.js`, 5 casos): paridad de claves entre catálogos de chrome, cobertura de los packs de contenido, guarda contra un *fallback* masivo al español, y la negociación de la raíz por cookie/`Accept-Language`.
> **Verificado**: **30/30 tests** (5 nuevos), build de producción OK, paridad de catálogos 226/226 claves, barrido sin español suelto en componentes ni rutas, y en navegador — carta EN con contenido y drawers en inglés (incluida la coda de estado y el I Ching), **informe EN completo con su índice**, modal "acerca de" EN, y **carta ES idéntica a antes** (sin regresión); consola limpia.
> **Pendiente a propósito**: el **cuerpo legal de `/privacy`** sigue en español — es texto RGPD y merece redacción revisada por el autor, no traducción automática (el resto de esa página ya es por idioma). Sin bump de versión todavía. Commit + merge a **staging**.
>
> Previo (2026-07-21, **Fase M · turno 1 — estructura multiidioma**): **la app es bilingüe de verdad: el idioma vive en la URL (`/en/…`, `/es/…`), hay selector propio, y la home y la página de carta hablan inglés.** Plan completo, regla de SSR y **checklist de "cómo añadir un idioma" en [`docs/fase-m-multilingue.md`](./docs/fase-m-multilingue.md)**.
> (1) **Motor i18n propio, sin dependencias**: `lib/i18n/locales.js` es la **fuente única de idiomas** (datos planos, sin runes, para que también la importe el Worker) y de ella se derivan el matcher de rutas, el menú del selector, los `hreflang`, las entradas de prerender y el fallback offline del SW; `lib/i18n/index.svelte.js` lleva el locale activo (`$state`) y `t(clave, params, locale?)`, con fallback al idioma por defecto y luego a la clave (nunca renderiza vacío).
> (2) **Rutas**: todas las páginas cuelgan de `src/routes/[lang=locale]/` con un matcher (`src/params/locale.js`) que solo enruta idiomas existentes; **la raíz no tiene contenido**: el Worker la negocia (cookie `hdl` → `Accept-Language` → default) y redirige a `/<lang>`. **Los enlaces antiguos siguen vivos**: `/chart?…` → `/es/chart?…` (todos los compartidos eran españoles) y `/privacy` → negociado. El idioma para construir URLs se lee del **parámetro de ruta**, no del estado de módulo.
> (3) **Selector**: `LangSwitch.svelte`, tag discreto arriba a la derecha con el idioma actual ("EN"/"ES") que despliega un **menú** con cada idioma **en su propio idioma** y el actual marcado (un toggle de dos letras es ambiguo). Al elegir, navega a la misma página en el otro idioma y guarda la preferencia en la cookie `hdl`.
> (4) **SEO por idioma**: canonical, `og:locale`, JSON-LD (`inLanguage`) y título/descripción propios por idioma; **hreflang cruzado + `x-default`** a la raíz negociadora; `<html lang>` correcto en el HTML prerenderizado (vía `transformPageChunk`) y en navegación cliente; sitemap con las 4 URLs y sus alternates; manifest en inglés; OG por-carta en el idioma del enlace compartido; SW precachea las 4 páginas y **cae al home del idioma** (no a `/`) sin red.
> (5) **Extracción de chrome a inglés**: home completa (formulario, errores, diálogos, cartas guardadas, footer, SEO) y **página de carta completa** (cabecera, botones, estados, secciones, columnas Personality/Design/Weight, tooltips), más `DateField`, `CityAutocomplete` y los diálogos. **`DateField` estrena orden de segmentos por locale: MM/DD solo para `en-US`** (Reino Unido, Australia y Canadá siguen en DD/MM), decidido con `navigator.language`. Photon recibe `lang=en` en inglés (acepta de/en/fr/it, **nunca `es`**) y el sesgo de país por homónimos pasa a depender del idioma.
> (6) **Deuda evitada / hallazgos**: los mapas de etiquetas en español que vivían **duplicados** en la página de carta se han movido al pack de contenido, así que se traducirán solos en el turno 2. Durante la verificación se detectó y corrigió una **regresión propia**: al principio se apuntaron a `promptLabels` (redactadas para frases de prompt: minúsculas y con artículos, "el Sol"), lo que descapitalizaba la carta en español; se añadió un bloque **`labels` de display** al pack y el español volvió a ser idéntico al original. Documentada también la **regla de SSR**: el prerender construye páginas en paralelo, así que en páginas prerenderizadas el idioma se pasa **explícito** a `t()`.
> **Verificado**: 25/25 tests, build de producción OK, 4 páginas prerenderizadas con su `lang` y enlaces internos correctos, `/` → `/es` negociado, home EN/ES, menú del selector y cambio en caliente (URL + textos + cookie + `html lang`), carta EN con chrome inglés y carta ES idéntica a antes, consola limpia.
> **Pendiente para el turno 2 (traducción)**: los ~600 textos de contenido (`content/en.js` → `overrides`), más los componentes de prosa que se dejaron a propósito sin extraer por ir pegados al contenido (About, ReportBug, StorageInfo, ElementInfo, InitialReport, cuerpo de `/privacy`) y los "andamios" en español aún en código (`content/index.js`, `report.js`, `prompts.js`) — moverlos al pack es lo que hará que el turno 2 sea **solo texto**. Ojo legal: los nombres de hexagrama en inglés **no** pueden reutilizar Wilhelm/Baynes. Sin bump de versión todavía. Commit + merge a **staging**.
>
> Previo (2026-07-07, botón «X» de borrado en el campo de lugar): **el campo de lugar estrena una X de borrado a la derecha (mismo slot que el check), visible mientras se edita.** El intento de sobrescritura al reenfocar (fix del rAF del 07-07) seguía sin funcionar en el dispositivo del autor, así que se añade una vía directa y fiable de limpiar el campo. `CityAutocomplete.svelte`: nuevo `<button class="clear-btn">` con icono X que se muestra cuando `focused && query.length > 0` (editando); cuando hay lugar confirmado y sin foco se muestra el **check** como antes (`{:else if value}`). Al pulsarla borra `query`/`value`/resultados y **mantiene el foco** (el `mousedown` se traga con `preventDefault` para que el clic no desenfoque antes de limpiar; `bind:this={inputEl}` para re-enfocar). Estilada en el mismo hueco derecho que el check (28×28, centrada, `right:0.5rem`, gris→texto en hover/focus-visible). Verificado en navegador: X aparece al editar (28×28 centrada) y oculta el check; clic → campo vacío y foco conservado; elegir resultado → check; confirmado+desenfocado → check; consola limpia, 25/25 tests. Con esto el autor puede limpiar y reescribir sin depender del sobrescrito por selección. Sin bump (sigue 1.3.0). Commit + merge a **staging**.
>
> Previo (2026-07-07, fix del pisado de hora al marcar «Hora desconocida»): **al marcar «Hora desconocida» con una hora ya puesta (p. ej. 09:30), el slider ya no salta a 12:00: conserva la hora, exacta si el slider lo permite o redondeada al medio-hora más cercano.** Causa raíz encontrada con logs en navegador (el seed leía `time="12:00"` pese a haber 09:30 escrito): el `$effect(() => { if (unknownTime) time = sliderTime })` **sobrescribe `time` con el valor por defecto del slider (12:00) en el instante en que `unknownTime` pasa a true**, y como el checkbox usaba `bind:checked`, ese efecto se disparaba **antes** del `onchange` que sembraba el slider → el seed leía ya "12:00" (y `timeEl` ya destruido, así que el fallback tampoco valía). Fix: checkbox pasa de `bind:checked` a **`checked={unknownTime}` + handler manual `toggleUnknownTime`** que **siembra `sliderVal` desde la hora ANTES de poner `unknownTime=true`**; así, cuando el efecto de sync corre, `sliderTime` ya refleja la hora sembrada y no la pisa. Verificado en navegador: 09:30→09:30 (exacta), 09:10→09:00, 09:20→09:30, 14:45→15:00, 23:59→23:30 (sin desbordar a 24h); consola limpia, captura del slider en 09:30, 25/25 tests. Cierra el bug reabierto de BACKLOG («Unknown-time checkbox resets the slider to 12:00»). Sin bump (sigue 1.3.0). Commit + merge a **staging**.
>
> Previo (2026-07-07, retoques del formulario: huecos del DateField + sobrescritura del campo de lugar): **dos ajustes finos de UX del formulario de la home.** (1) **Campo de fecha (`DateField.svelte`)**: el placeholder `mm`/`dd` no cabía (la caja de 2 cifras medía 26px pero el texto "mm" mide 27px, se salía) y el hueco tras la 1ª `/` (≈0px, "mm" pegado) era distinto del hueco tras la 2ª `/` (≈6px antes de "aaaa"). Arreglado ensanchando las cajas de día/mes de `2.6ch → 3.4ch` (ahora "mm" cabe con ~3.4px de holgura a cada lado) y ajustando la del año de `4.6ch → 4.1ch` para que su holgura iguale a la de las cortas → **los dos huecos quedan en ~3.4px** ("dd / mm / aaaa" parejo). Medido en navegador (cajas 34/34/41px, "mm" cabe, huecos 3.4 vs 3.5px). (2) **Campo de lugar (`select-on-focus.js`)**: al reenfocar un campo ya relleno, la primera tecla no sobrescribía la selección en el autocomplete de lugar (sí funcionaba en fecha/nombre) — el check desaparecía pero el texto no se reemplazaba, se añadía. Causa: para que el primer carácter se *añada* en vez de reemplazar, el cursor tuvo que colapsar **antes** de teclear (el reemplazo nativo de una selección viva es síncrono, previo a cualquier re-render); ese colapso lo provoca un re-render post-foco que reescribe el input (el `bind:value` de dos vías del autocomplete, que la fecha/nombre no tienen igual). Fix defensivo en la acción compartida: **re-afirma la selección en el `requestAnimationFrame` siguiente al foco**, solo si el campo sigue enfocado, su valor no ha cambiado y el cursor está colapsado — no-op cuando la selección ya se mantiene (verificado: clic real selecciona todo [0,8] y sigue seleccionado tras 2 frames, sin regresión). **No reproducible por script** en el preview (no emite foco/teclado *trusted*), pero el fix cubre el único mecanismo posible del síntoma; **confirmar en el dispositivo del autor**. Sin bump (sigue 1.3.0). Verificado: **25/25 tests**, consola limpia, capturas del campo de fecha. Commit + merge a **staging**.
>
> Previo (2026-07-07, revisión de docs + bump a 1.3.0): **repaso de mantenimiento de la documentación y subida de versión, sin cambios de código.** Revisados `TASKS.md`, `BACKLOG.md`, `README.md` y `CLAUDE.md` contra el estado real de la rama de staging: **los cuatro ya estaban al día** tras los lotes del 06-07 y del 07-07 — README/CLAUDE.md reflejan el estado «lanzado», la instalabilidad/offline reales y las Fases M/P nuevas; y **el BACKLOG ya cubre los tres campos de carta que el autor quiere añadir** (cruz de encarnación, *signature* y *not-self theme*) en «Functional gap analysis 2026-07-06», ítems 1 y 2, con la nota de que *signature*/*not-self* son constantes por tipo ya escritas en la prosa de tipo de `es.js` y la **cruz de encarnación es 100% derivable del chart ya calculado** (Sol/Tierra de Personalidad y Diseño + ángulo del perfil), sin astronomía nueva. Por eso no se añade contenido nuevo al backlog (evitar duplicado). Único cambio: **bump `1.2.0 → 1.3.0`** (minor; el conjunto acumulado desde 1.2.0 —bóveda de cookies con backup+restore, DateField propio, compartir informe— es de nivel «feature», como los bumps 1.1/1.2). Sin código nuevo → **25/25 tests** siguen pasando. Commit en la rama del worktree; **merge a staging** (fast-forward sobre el tip actual); el push y el merge a main quedan a cargo del autor.
>
> Previo (2026-07-07, bóveda de cookies para las cartas guardadas): **las cartas guardadas quedan protegidas del purge de almacenamiento de iOS: copia de seguridad automática en una cookie propia + restauración silenciosa, con nota "saber más" en la home y política de privacidad actualizada.** Contexto: WebKit/ITP borra todo el almacenamiento script-writable (IndexedDB incluido) tras ~7 días de uso de Safari sin visitar el sitio; la investigación (BACKLOG "iOS storage eviction", 2026-07-06/07) concluyó que `navigator.storage.persist()` no exime, que instalar en pantalla de inicio exime pero con almacenamiento aislado, y que la única vía web real son las **cookies puestas por el servidor** — el autor aceptó el cambio de política de privacidad. (1) **Bóveda**: nuevo `src/lib/db/backup.js` (formato de hilo: JSON compacto → deflate con `CompressionStream` y fallback plano → base64url; al decodificar filtra registros sin fecha/hora/zona) + endpoint nuevo `src/routes/api/backup/+server.js` — POST convierte el payload en cookies de primera parte (chunks `hdb1..hdb3` **HttpOnly con `Path=/api/backup`**, así las cartas *no* viajan en la navegación normal; marcador diminuto `hdb` en `Path=/` para detectar que hay copia sin llamada de red; `Max-Age` 400 días renovado en cada sync; POST vacío borra la bóveda; 413/400 ante payloads inválidos) y **el servidor no almacena nada** (sin KV, sin base de datos). (2) **Cableado** en `charts.js`: toda mutación (guardar/renombrar/borrar/reordenar/importar/backfill de tipo) programa un sync con debounce de 800 ms; `ensureBackupRestored()` — singleton por carga, disparado desde `+layout.svelte` al arrancar y esperado por `refreshList` en la home — **restaura la lista sola** si la BD local aparece vacía con marcador presente, y **siembra la copia a los usuarios pre-bóveda** (BD con cartas y sin marcador, sin esperar a una mutación); el primer guardado pide además `navigator.storage.persist()` (endurece Android/Chromium; inocuo en el resto). (3) **Nota + modal**: bajo "Las cartas se guardan solo en este dispositivo." va "Con copia de seguridad automática en este navegador. saber más" → nuevo `src/lib/components/StorageInfo.svelte` (patrón About: scrim + focus trap + Escape) con 5 párrafos sobrios: dónde viven las cartas, la cookie técnica y la restauración automática, qué sí las borra (limpiar cookies/datos del sitio), exportar/importar como copia manual, e instalar en iOS con su matiz de almacenamiento separado. El `.local-note` cambia `opacity` → color atenuado (la opacidad se heredaba al modal y lo hacía transparente). (4) **Privacidad**: párrafo de la cookie en "Lo que se queda en tu dispositivo", punto nuevo "Copia de seguridad de tus cartas" en "Lo que sale" (viaja cifrada solo al crear/restaurar la copia y no se almacena), "Lo que no hacemos" matiza que la única cookie es esa, y fecha al 7 de julio. **Decisión**: sin aviso por sesión al guardar en iOS (propuesto el 2026-07-06) — la restauración silenciosa lo vuelve ruido. Verificado: **25/25 tests** (3 nuevos: roundtrip del formato, descarte de registros inválidos, lista vacía), endpoint por curl (set/get/clear, payload de 5 KB partido en 2 cookies y reensamblado, 413/400), navegador — carta sembrada → marcador `hdb=1` creado solo (heal pre-bóveda) con el chunk invisible para JS, **`indexedDB.deleteDatabase` + reload → la carta vuelve sola** y abre/calcula bien (Manifestador), borrado por UI → bóveda vaciada sin resurrección tras reload, modal y nota correctos a 1000px y 375px sin overflow, `/privacy` con los textos nuevos, consola limpia (solo warnings de Dexie provocados por el `deleteDatabase` de la propia prueba), build de producción OK. Pendiente post-deploy: probarlo en un iPhone real (cookie Secure + restauración en Safari). Commit + merge a **staging**.
>
> Previo (2026-07-06, retoques del DateField + seleccionar-al-enfocar): **(1) Espaciado del campo de fecha**: los segmentos DD/MM/AAAA dejan de estirarse a lo ancho de la celda (`flex:1` → ancho por contenido, 2.6ch/4.6ch) y la fecha se lee compacta — "13 / 03 / 1984" — **a la izquierda en escritorio y centrada en móvil** (media query ≤520px), con las barras pegadas (padding 0.2rem). (2) **Sobrescribir campos rellenos**: nueva acción compartida `select-on-focus.js` — al enfocar un campo se selecciona todo su contenido, así teclear sobrescribe directamente lo que había. Aplicada al **nombre**, al **lugar** (CityAutocomplete) y a los **tres segmentos de la fecha** (con bonus: el auto-avance deja seleccionado el contenido del siguiente segmento, editar una fecha existente es reteclearla). El mouseup que sigue al clic que enfoca se traga (si no, Chrome/Safari colapsan la selección); uno posterior recoloca el cursor con normalidad (guarda de 400ms). La **hora se queda como está** (su picker nativo va bien en Android, decisión del autor). Verificado en navegador: capturas escritorio/móvil con la fecha compacta, selección al enfocar en los 4 campos, mouseup inmediato tragado y posterior libre, tecleo completo con auto-avance y retroceso intactos, consola limpia; 22/22 tests, build OK. Nota del entorno: los eventos `focus` confiables no se disparan en la pestaña oculta del preview (documento sin foco), verificado disparando el evento a mano — **probar la sensación real en dispositivo**. Commit en la rama del worktree; **merge a staging** ahora (2026-07-07), tras avanzar en paralelo la bóveda de cookies.
>
> Previo (2026-07-06, campo de fecha propio DD/MM/AAAA): **fuera el `type=date` nativo (en Android su selector obliga a scrollear ~100 años empezando por el año); la fecha ahora se teclea en orden día-mes-año.** Nuevo `DateField.svelte`: tres segmentos numéricos **DD / MM / AAAA** dentro de un contenedor con aspecto de campo único (mismos tokens/altura que el resto del form), aplicado en **todos los tamaños** (decisión del autor entre 3 opciones propuestas; la máscara de un solo campo y el toggle nativo/teclado se descartaron). Comportamiento: teclado numérico en móvil (`inputmode`), auto-avance al llenar un segmento, la tecla `/` salta al siguiente, retroceso en vacío vuelve al anterior, "3"→"03" al salir, autofill `bday-day/month/year`. Valida fechas imposibles (31/02 → borde rojo + error en español al calcular). Externamente binda el mismo ISO `YYYY-MM-DD`, así que restore, share-links y la banda de tipos no cambian; "Borrar formulario" lo remonta vía `{#key formEpoch}` (mismo patrón que CityAutocomplete, porque un tecleo a medias compone el mismo `''` que un valor borrado — pillado en verificación). De paso muere el hack del overlay transparente del campo fecha en móvil (el de hora se queda). Verificado en navegador: tecleo completo hasta la carta (13/03/1984 → subtítulo correcto), round-trip al volver atrás, borde rojo y error con 31/02, padding, navegación con retroceso, borrar formulario, banda de tipos y seed del slider intactos, layouts 375px y desktop, consola limpia; 22/22 tests, build OK. **Probar en Android/iOS reales tras deploy** (tipo de teclado, autofill). Commit + merge a **staging**.
>
> Previo (2026-07-06, KV de staging separada + fases nuevas M y P): **(1) Contadores de staging separados de producción** — sin namespace nuevo (su creación seguía bloqueada en el dashboard): `env.staging` en `wrangler.jsonc` define `LOVE_KEY_SUFFIX="-staging"` y `/api/love` lo añade a ambas keys, así staging usa `love-clicks-staging`/`love-senders-staging` dentro de la misma KV `hd-love` y no toca los contadores reales. No verificable en local (dev no tiene bindings) — **comprobar en staging.hdchart.app tras el deploy** (su contador debe arrancar de 0). **(2) Dos fases nuevas en el esquema** (CLAUDE.md §6 + README): **Fase M — Multilingüe**, la SIGUIENTE, con el **inglés como lo primero primerísimo** (el español queda como segundo idioma ya escrito); y **Fase P — Play Store** (tras M): empaquetar la PWA como TWA para Google Play; **Apple queda aparcada a propósito** (el autor no pagará los ~99 €/año salvo que la app demuestre recorrido). Letras como la Fase L para no renumerar las fases 8/9/10, referenciadas por todo el historial. BACKLOG: cerrada la entrada del split de KV (resuelta por sufijo de key) y resuelta la decisión abierta del audit 2026-06-15 sobre la fase de packaging. Verificado: 22/22 tests, build OK. Commit + merge a **staging**.
>
> Previo (2026-07-06, triaje + lote de saneamiento de bugs y mejoras): **triaje completo del backlog contra el código y lote de limpieza; quedan fuera a propósito los 5 mayores (bodygraph clicable completo, gate.line 64×6, PDF blanco, etiquetas de centros, peso por activación).** Triaje: dos "bugs" ya estaban resueltos y sin cerrar (las 6 descripciones de línea de perfil existen en `es.js`; los chips de canal/armónica en drawers de puerta y centro llegaron con el lote Fable) y tres entradas del bodygraph clicable estaban duplicadas — todo consolidado en BACKLOG. Lote implementado y verificado: (1) **iOS scroll bleed-through**: nueva acción compartida `scrollLock` (`scroll-lock.js`, body `position:fixed` con offset preservado, ref-counted para overlays apilados) aplicada a los 5 overlays (About, ReportBug, Dialog, InitialReport, ElementInfo) — módulo verificado en navegador; **confirmar en iPhone real tras deploy**. (2) **Título del PNG/PDF descentrado — causa raíz encontrada**: html-to-image copia el ancho computado de `.title-wrap` medido con el botón "Informe" aún dentro (el filtro solo lo quita del clon) → el título quedaba corrido a la izquierda; ahora `.capturing` oculta el chrome también en el DOM vivo. (3) **PDF, párrafo dorado final**: el header `hdchart.app` de `paintBg` dejaba su estilo (oro 8pt) como estado del documento y un salto de página a mitad de flujo pintaba el resto del párrafo en dorado; `paintBg` guarda/restaura fuente-tamaño-color. (4) **PDF, bullets**: la lista de los 5 tipos (`{bullets}`) se descartaba en silencio; ahora se maqueta con punto dorado e indentación. (5) **PDF, portada arriba**: la cover pasa de centrada verticalmente a alineada arriba (44pt, justo bajo el header). (6) **Slider hora desconocida**: el caso restante era la restauración nativa del navegador (repuebla el campo sin eventos → estado vacío con hora visible); `seedSliderFromTime` ahora lee el valor vivo del input como fallback y tolera horas sin cero inicial — ambos caminos verificados (09:00→18; campo restaurado 21:30→43). (7) **Clic en centro del bodygraph abre su drawer** (puertas pendientes a decisión del autor); verificado (Garganta). (8) **Senders del love counter**: segunda key `love-senders` en la MISMA KV `hd-love` (sin namespace nuevo), flag `hd:love-sent` en localStorage + `first:true` en el primer POST; la línea del About pasa a "1.234 amores recibidos de 56 queridos humanos." (consciente del singular) — verificado con API stubbeada, **comprobar contra la KV real tras deploy**. (9) **"que vivas feliz"** (fuera el "bien y") en el About. (10) **Mensaje de datos inválidos 100% español** en `chart.js` (nombra fecha/hora/zona guardadas). Diferidos con nota en BACKLOG: teclear la fecha en móvil (merece pasada propia, el form iOS es delicado) y la colocación del error de lugar (decisión de diseño pendiente: el mensaje largo no cabe junto al label a 375px). El link de instalar en Chrome Android queda como único bug abierto (necesita dispositivo + build desplegada). Verificado: 22/22 tests, build de producción OK, PDF regenerado en Node (sin dorado espurio, bullets presentes, cover a 44pt), consola limpia. Commit + merge a **staging**.
>
> Previo (2026-07-06, lote de ajustes: compartir informe · sello hdchart.app · diálogos móvil · «más amor»): **cinco retoques pedidos por el autor.** (1) **Botón compartir en el informe**: `InitialReport.svelte` gana un botón dorado (píldora, icono de compartir) **a la izquierda del de PDF** (nuevo prop `onshare`); llama a `shareReportLink` en `chart/+page.svelte`, que comparte el mismo enlace de `buildShareUrl` **más `&r=1`**; al llegar, `onMount` lee `r=1` y abre el informe directamente (`reportOpen = true`). (2) **Sello `hdchart.app`** discreto en dorado arriba del todo de las exportaciones: en el **PNG** es una línea `.export-brand` visible solo al capturar (`main.capturing:not(.pdf-shot)`); en el **PDF** es una cabecera **nativa** centrada en cada página (`paintBg` de `report-pdf.js`). (3) **Diálogos más arriba en móvil** (≤560px): `Dialog.svelte` (guardar/renombrar/borrar/importar) alinea el scrim a `flex-start` con scroll — el diálogo sale a ~24px del borde superior, así el teclado no lo tapa y se puede subir del todo; mismo ajuste en `ReportBug.svelte`. (4) **«¡Mándame amor!»**: el «más» de la etiqueta de repetición pasa a **«MÁS» en mayúscula, negrita y color oro** (vía `{@html}` + `:global(strong)`); los agradecimientos escalados van con **primera mayúscula y bien escritos** («¡Gracias! ❤️» … «¡¡Olé, olé, olé!! ❤️💛💜» … «¡¡¡Voy a explotar!!! 💥💖💥»). (5) **BACKLOG**: nueva mejora futura (no ahora) — PDF con **fondo blanco** en vez de modo oscuro (con nota de que el cover se captura de la vista oscura). Verificado en navegador (botón compartir → URL con `&r=1`; `r=1` abre el informe; `.export-brand` oculto/visible/oculto en normal/PNG/PDF; PDF generado sin errores en consola; diálogo de guardar a top 24px en móvil; «MÁS» 700/oro y «¡Gracias!»), 22/22 tests, consola limpia. Commit + merge a **staging**.
>
> Previo (2026-07-05, ajustes sobre el enlace compartible): **retoques tras revisión.** (1) El **icono de la app** en la home gana un **borde sutil** (`--border`, dorado en hover) para leerse como tile de app — sin él, al compartir su fondo el color de la página, parecía un glifo flotante. (2) **Fuera el tipo (`ty`) del enlace**: solo alimentaba el texto del preview y alargaba la URL sin aportar al cálculo; el preview conserva el nombre en el título y una descripción genérica. Se **mantiene la etiqueta de lugar (`p`)** porque **sí se muestra** en el subtítulo de la carta ("13/03/1984, 09:30 · Madrid, España") y en el nombre del PNG/PDF exportado. (3) **BACKLOG**: añadidas dos mejoras pedidas — sello `hdchart.app` en el PNG y el PDF descargados (footer), y un **botón compartir en el informe** (junto al de PDF) que comparta el enlace codificado con un flag para **abrir directo el informe** al llegar. Verificado en navegador (icono con marco, enlace sin `ty`, subtítulo con lugar, OG con nombre), build OK, consola limpia. Commit + merge a **staging**.
>
> Previo (2026-07-05, enlace compartible de carta + preview por-carta + cabecera móvil responsive + retoques): **el botón «compartir» de la carta pasa a compartir un enlace con los datos en la URL (no la imagen), el preview del enlace refleja la carta, y la cabecera del chart en móvil muestra texto en los botones según el espacio.** (1) **Enlace compartible**: nuevo `src/lib/hd/share-link.js` (encode/decode) — la URL es `/chart?n=…&d=YYYYMMDD&t=HHMM&la=…&lo=…&p=Ciudad,%20País&ty=tipo`. El lugar no se manda entero: viajan las **coordenadas** (que ya hacen falta para el cálculo) + una **etiqueta corta «Ciudad, País»** solo para mostrar; la **zona horaria no viaja**, se recupera de las coordenadas con `tz-lookup` al abrir (mismo resultado que al rellenar el formulario). El botón comparte con **share sheet nativo** en táctil y **copia al portapapeles** («Enlace copiado ✓») en escritorio; el botón de **descargar imagen se mantiene**. La carta se abre desde el enlace: `chart/+page.svelte` lee los params en `onMount` (con fallback a `sessionStorage`) y los reescribe en `sessionStorage` para que guardar/volver/restaurar funcionen igual. (2) **Preview/SEO por-carta**: nuevo `src/hooks.server.js` que, en el Worker de Cloudflare (visible para los scrapers, que no ejecutan JS), reescribe el `<head>` de `/chart` con meta **Open Graph/Twitter propias de la carta** (título con el nombre, descripción con el tipo) en vez del OG genérico de la app; marcador `<!--%og%-->` en `app.html`. La **imagen sigue siendo la og-image de marca** (una imagen por-carta exigiría renderizar el bodygraph en el edge — fuera de alcance). El hook lee los params a mano (no importa el decoder) para no arrastrar `tz-lookup` al Worker. (3) **Cabecera del chart en móvil responsive**: según el espacio (largo del nombre), los botones muestran **palabra en vez de icono**, colapsando en orden fijo — primero cae «Informe» (icono+texto → icono), luego «Guardar» (texto → disquete), y por último el **nombre con elipsis**. Se mide en JS (`fitHeader`, tres modos full/noInforme/icons) porque CSS no puede «quitar etiquetas antes de truncar el nombre»; escritorio intacto (lo lleva el media query). (4) **Home**: quitada la frase «Introduce tus datos de nacimiento.» del tagline; **icono de la app inline a la derecha del título**, clicable → mismo handler que «instalar como app». (5) **Notificar fallo**: la última frase de los datos del dispositivo va **entre paréntesis** y «Cuanto más claro, más fácil me será entenderlo y arreglarlo.» → «**Cuanto más claro lo expliques, más probabilidad de que lo pueda entender y arreglar.**» (la de sugerencia en paralelo, «…entender e implementar»). Versión sigue **1.1.0**. Verificado en navegador (enlace copiado con la URL correcta; carta cargada desde el enlace con el timezone recuperado de las coordenadas; OG inyectado server-side vía curl; cabecera full a 1000px y full/noInforme/icons a 375px con nombres corto/medio/largo; home con icono y sin la frase; textos del modal), **build de producción OK** (hook 2 kB, sin `tz-lookup`), consola limpia. Commit + merge a **staging**.
>
> Previo (2026-07-05, retoques del drawer de centros + título de tipos → producción): pequeños ajustes sobre el lote 1.1.0. En el **drawer general "Los centros"**: (1) los nueve centros se listan ahora en **orden de bodygraph con el Sacral en penúltimo lugar** (Cabeza, Ajna, Garganta, G, Corazón, Bazo, Plexo solar, **Sacral**, Raíz); (2) **sin paréntesis** en la función de cada uno; (3) **sin tooltip** definido/abierto en los chips; (4) tras los chips va la línea nueva *"Los centros definidos aparecen coloreados y los centros abiertos se ven vacíos."*; (5) se **revierte** el párrafo siguiente a *"Un centro definido funciona de forma fija y fiable… Un centro indefinido no es un defecto…"* (sin la mención al color, que ya la da la línea anterior); (6) *"Los nueve centros son:"* → *"Los nueve centros y sus funciones son:"*. Y en el **drawer general "Los tipos"**, la tabla-cierre cambia su título de *"Los cinco tipos"* a **"Los cinco tipos en el colectivo humano"**. Verificado en navegador (orden, sin paréntesis ni tooltip, textos nuevos, título de la tabla), 22/22 tests, build OK, consola limpia. Commit + merge a **staging** y a **producción (main)**.
>
> Previo (2026-07-05, auditoría de textos · segundo lote de ajustes + subida a 1.1.0): **los drawers de puerta/canal estrenan título con nombre y ficha dorada, los centros muestran su tabla de canales/puertas, los cierres de posibilidades pasan a tabla, y el informe gana bullets y encabezado destacado.** Detalle: (1) **Puertas y canales** — el título lleva el nombre ("Puerta 1: La expresión creativa", "1-8: Canal de la inspiración"); en la ficha esquemática los **chips van en dorado** (como centro definido), los **chips de centros salen inline**, se **quitan las comillas** de nombres de canal/puerta, la "i" de armónicas dice **"puerta que completa el canal"**, y las codas explicitan la puerta/canal y su estado ("En esta carta, la puerta 30 está activa pero colgante…"). (2) **Drawer de un centro** — añade al final su **tabla de canales y puertas** (chip + nombre), mismo estilo. (3) **Drawer general "Los canales"/"Las puertas"** — el índice completo sale como **"[chip] Nombre"** por línea. (4) **Drawer general "Los centros"** — los nueve como **"[chip] (descripción)"**, cada uno en dorado si está definido en la carta o en blanco si abierto (tooltip definido/abierto); "Los nueve centros son:" cierra el primer párrafo; el texto de definido/indefinido explicita el color en el bodygraph. (5) **Cierres de posibilidades** (tipos/estrategias/autoridades/perfiles/definiciones) ahora en **tabla sin bordes** (tipo: chip·frase·%; resto: chip·frase) y **añadidos también a los drawers generales**, no solo a los de valor. (6) **Planetas** — al final, chips de las puertas activadas en Personalidad y Diseño con su nombre. (7) **Tabla de activaciones** — el número de puerta abre la puerta y el de **línea abre la línea** (drawer de la línea 1-6). (8) **Prompts** — fuera el "de forma práctica y aterrizada". (9) **Informe** — índice con "Tu tipo/Tus centros/Tu estrategia/…"; en "Tu tipo" los cinco tipos como **bullets** y "Tú eres un X" como **píldora** destacada (no dorada como los títulos); "Los nueve centros en tu carta:"; frase de autoridad ajustada ("cómo y cuándo actuar/decidir", negrita movida a "la autoridad te dice"). (10) **GM** (no MG) en el drawer del Generador Manifestante + comentario y memoria sobre el orden del acrónimo por idioma. (11) autoridad **"mental" → "mental/ambiental"** en todos los sitios. (12) fuera el **corazón** del footer "acerca de". (13) **BACKLOG**: bodygraph clicable (centros y puertas, no canales) y textos por puerta.línea (64×6). Subida de versión **1.0.0 → 1.1.0**. Verificado en navegador (drawers de puerta 10/30, canal 10-57, centro G, concepto centros con estado, planeta Sol, tablas de tipos/estrategias, clic en línea → drawer de línea, informe con bullets y píldora, footer sin corazón, prompts sin el tono), 22/22 tests, build de producción OK, consola limpia. Commit + merge a **staging**.
>
> Previo (2026-07-04, post-lanzamiento · auditoría de textos con Fable — lote aprobado implementado): **toda la app pasa a español e impersonal, las puertas/canales estrenan ficha esquemática y los drawers de valor muestran el conjunto completo de posibilidades.** (1) **Correcciones del bloque A** de la auditoría en `content/es.js`: errata "y con paz" (MG), doble "así que" y frase cortada del Proyector, redundancia "nunca decidir desde la mente", repetición del Manifestador en el colectivo, "separación/split" → "(split)", puerta 34 reescrita. (2) **Todo en español**: tipos "Generador/Generador Manifestante/Proyector/Manifestador/Reflector" en chips de home y carta y títulos de drawers; columnas **Personalidad/Diseño** en la tabla (cabeceras, drawers, prompts; ajustada la traducción inline que quedaba). (3) **Voz impersonal** aplicada a los drawers de concepto (tipo/estrategia/autoridad/perfil/definición/centros/puertas/activaciones), columnas y 13 planetas — el informe inicial conserva el "tú"; además el drawer de centros **lista los 9 centros con enlaces** y se retira la enumeración incompleta de "funciones" (también en bodygraph e informe). (4) **Ficha esquemática en puertas y canales** (`content/index.js` `facts` + `ElementInfo`): Centro/Canal ("nombre")/Puerta armónica^i ("tema") en líneas propias con chips clicables alineados (plural en 10/20/34/57); la "i" en potencia lleva tooltip "completa el canal"; el canal muestra Centros y Puertas igual. Títulos de puerta ya siempre entre comillas. (5) **Esquema de posibilidades** al final de los drawers de valor (`relatedIndex` en es.js): las 6 líneas en el perfil (las propias destacadas y cada línea con drawer propio + prompt "la línea N del perfil"), las 5 estrategias, 7 autoridades, 5 definiciones y 5 tipos. (6) **Prompts**: el descriptor de carta añade la definición, el prompt de puerta nombra sus activaciones ("activada por Venus en Personalidad (línea 5)"), y todos cierran con "de forma práctica y aterrizada". (7) **UI**: tooltips de Personalidad/Diseño/Peso **arreglados** (abren hacia abajo dentro del scroller; los del borde derecho alineados a la derecha — bug de BACKLOG cerrado); la "i" de esas cabeceras va **inline a la derecha del texto+punto en escritorio** (slot fijo, sin mover columnas) y conserva el overlay en móvil; la "i" de los títulos se acerca al texto (margen 0.35→0.18rem); el botón del informe muestra **"Informe"** junto al icono en escritorio (solo icono en móvil); footer "notificar un fallo" → **"notificar fallo"**; tagline de la home "Calcula tu carta de Diseño Humano — gratis y sin registro. Introduce tus datos de nacimiento." y el SEO pierde la frase del dispositivo; etiquetas de autoridad unificadas a "Cualidad (Centro)" ("Emocional (Plexo solar)", "Esplénica (Bazo)"…). Verificado en navegador (drawers de puerta 30/10, canal 35-36, estrategia, perfil 1/3 y línea 2, concepto centros, informe, prompts generados, tooltips y cabeceras a 1280px y móvil, home), 22/22 tests, consola limpia. Commit + merge a **staging** (nuevo flujo: staging por defecto; main solo cuando el autor lo decida).
>
> Previo (2026-07-04, post-lanzamiento · retoques de la página de carta): **la carta estrena rótulo "Bodygraph" con su drawer, chips de tipo sin porcentajes y alineación móvil corregida.** (1) Nuevo **título "Bodygraph"** sobre el gráfico con su «i» de concepto y drawer propio (`concept.bodygraph` en `content/es.js`): contenido equivalente a la sección "El bodygraph" del informe inicial pero **impersonal**, más una explicación breve de centros **definidos** vs **indefinidos/abiertos**; en el texto, "centros", "canales" y "puertas" son **enlaces** a sus drawers (`[…](concept:center|channel|gate)`). En **escritorio** el rótulo va centrado encima del centro Cabeza (con un hueco nuevo sobre el gráfico); en **móvil** se coloca absolutamente en el **extremo superior izquierdo** de la zona del bodygraph (height:0, superpuesto a la esquina vacía) para no empujar el gráfico hacia abajo. Prompt de IA del nuevo concepto añadido en `prompts.js` (con ángulo "sobre esta carta"). (2) **Quitados los porcentajes** de población de los chips de tipo (dato + `<span class="pct">` + CSS). (3) **Alineación de los chips de tipo en móvil**: el chip marcado (más grande) descolocaba verticalmente su fila; `align-items: center` en `.type-list` los centra — verificado, los tres de la fila 2 comparten midY pese a la altura distinta. Verificado en navegador a 1000px y 375px (drawer abre, enlaces navegan a "Los centros" con botón atrás, sin porcentajes, alineación OK), 22/22 tests, consola limpia. Commit + merge a main.
>
> Previo (2026-07-03, post-lanzamiento · iOS confirmado + aire lateral en la home): **el betatester confirma en iPhone que el refuerzo del ancho funciona (sin overflow) y la home gana aire lateral.** Su pantallazo de confirmación parecía a sangre (campos tocando el borde), pero era un **pinch-zoom de ~110%** recortando los márgenes — medido contra su primer pantallazo, el padding real de 20px seguía intacto. Aun así el autor pidió más aire: `main` pasa de `1.25rem` a **`1.75rem` de padding lateral** (~28px por lado; campos y botón "Calcular carta" bajan a ~319px en un iPhone de 375, solo afecta por debajo del max-width). BACKLOG: la entrada reabierta del ancho iOS queda **cerrada como confirmada en dispositivo**. Verificado en Chrome local a 375px: campos y CTA alineados a 319px con 28px por lado, sin overflow horizontal. Commit + merge a main.
>
> Previo (2026-07-03, post-lanzamiento · retoques menores): **el rótulo del informe pasa a "Tu informe inicial personalizado" y el contador de amores únicos queda anotado como mejora futura.** (1) El eyebrow sobre "Conoce tu diseño" cambia de "Informe inicial" a **"Tu informe inicial personalizado"** en el overlay (`InitialReport.svelte`, también su `aria-label`) y en la cabecera del **PDF** (`report-pdf.js`), que replica el mismo rótulo. Verificado en navegador (overlay abierto con la carta del autor, PDF generado sin errores, consola limpia). (2) Nueva entrada en BACKLOG ("Possible improvements"): además del total de clics, llevar en KV un **contador de personas distintas** que han enviado amor (aprox. por dispositivo vía flag en `localStorage` + `first: true` en el primer POST; clave `love-senders`), pensado para consulta del autor y con redacción aprobada por si algún día se muestra — "Amores recibidos: 1.234 (de N humanos queridos)". Commit + merge a main.
>
> Previo (2026-07-03, post-lanzamiento · feedback del betatester en iOS): **refuerzo del ancho de los campos de la home en iOS, corazón en el "acerca de" del footer y bug nuevo de scroll anotado.** (1) El betatester seguía viendo los campos fecha/lugar/hora desbordando en iOS sobre la 1.0.0 desplegada; se comprobó que el fix de `min-width` del 2026-07-02 **sí está en la CSS en producción**, luego era insuficiente en iOS real. Refuerzo aplicado: `-webkit-appearance: none` + `box-sizing: border-box` + **altura uniforme 2.75rem (~44px, tap-target iOS)** en todos los campos de entrada (`+page.svelte`, `CityAutocomplete.svelte`) y `::-webkit-date-and-time-value { min-height }` para que fecha/hora vacíos no colapsen sin apariencia nativa. Verificado en Chrome local: 375px (4 campos a 335×44, sin overflow, overlays centrados OK) y desktop (valores nativos visibles, sin regresión). **Pendiente confirmación del betatester en dispositivo** (BACKLOG reabierto con nota). (2) El enlace "acerca de" del footer lleva ahora un **corazón** al final, gemelo del bichito de "notificar un fallo" (mismo tamaño/trazo/línea base, sin rotación). (3) Anotado en BACKLOG el bug nuevo del betatester: **en iOS, con el modal "acerca de" abierto, el scroll mueve la página de fondo** en vez del popup (scroll bleed-through; afecta probablemente a todos los overlays). Verificado: 22/22 tests, consola limpia. Commit + merge a main.
>
> Previo (2026-07-03, post-lanzamiento · primeras verificaciones en vivo): **la 1.0.0 está publicada y las dos primeras comprobaciones en producción pasan.** El autor hizo el push (auto-deploy OK) y confirmó en vivo: ✅ **contador KV** del «¡Mándame amor!» funcionando en `hdchart.app`, y ✅ **redirect `www.hdchart.app` → root** operativo (regla + registro DNS del 2026-07-03). **Sigue pendiente de verificar en vivo:** offline/redirect del service worker, cabeceras de seguridad en producción e iOS real. Nota: el tag `v1.0.0` no subió con GitHub Desktop (solo empuja tags creados desde el propio Desktop) — el autor lo sube con `git push origin --tags`.
>
> Previo (2026-07-03, **🚀 LANZAMIENTO 1.0.0** — Fase L · paso 7, cierre de la fase): **la app se publica oficialmente: versión 1.0.0, tag `v1.0.0` y push a main.** Antes del bump se **eliminó el atajo oculto de la home** (el punto final del subtítulo que rellenaba el formulario con los datos del autor): fuera `fillAuthorData`, el `<span>` clicable del tagline y su CSS de área de toque; el caso de validación sigue siendo la carta del autor, ahora a mano o vía los snapshots congelados de `chart.test.js` (CLAUDE.md §4, TASKS y BACKLOG actualizados en ese sentido). `package.json` pasa de 0.1.1 a **1.0.0** (el "Acerca de" lo muestra vía `__APP_VERSION__`). CLAUDE.md §6 marca la Fase L como **cerrada**. Verificado: el clic en el punto ya no rellena nada (formulario vacío tras el clic), "Acerca de" muestra v1.0.0, 22/22 tests, build de producción OK, consola limpia. Commit + merge a main + **tag `v1.0.0`** + push (el auto-deploy de Cloudflare publica). **Pendiente post-lanzamiento** (primera sesión tras el deploy): verificación en vivo — contador KV con el «Mándame amor», redirect `www` → root, offline/redirect del SW, cabeceras de seguridad, iOS real. Después: auditoría de textos con Fable (no bloqueante), mejoras de BACKLOG, y las fases 8 (compuesta), 9 (tránsitos) y 10 (nube), más TWA/Play si se decide.
>
> Previo (2026-07-03, Fase L · paso 5 tercera pasada — pirotecnia y agradecimientos exagerados): **la fiesta del corazón gana fuegos artificiales, destellos y una escalada más teatral.** Las etiquetas de agradecimiento pasan a llevar **exclamaciones y corazones que se exageran con el spree** («¡gracias! ❤️» → «¡lo recibo! 💛» → «¡qué gusto! 💖» → «¡¡cuánto cariño!! 💗💗» → «¡¡ole ole ole!! ❤️💛💜» → «¡¡¡voy a explotar!!! 💥💖💥», un paso cada 4 clics), y tras 4 s de calma el botón queda en **«¡Mándame más amor!»** (ya no vuelve al texto virgen). La fiesta tiene ahora **dos saltos de intensidad**: a los ~8 clics entran **fuegos artificiales** (cohete que sube desde el borde inferior y revienta en 18 chispas radiales con estela y **destello de luz** en el ápice) y a los ~16 se suman un segundo cohete por clic, **destellos sueltos** (glint radial blanco-cálido que se hincha y funde) y más confeti/emojis con duraciones ~25-50% más largas — la juerga se alarga sola si sigues pinchando (tope de elementos subido a ~220 para absorberlo). «Amores recibidos:» pierde la cursiva. Las tarjetas centran su contenido para que la etiqueta larga no las desequilibre al partir en dos líneas. **El autor añadió el registro DNS para `www`** (queda solo la verificación en vivo tras el deploy). Verificado en navegador: etiquetas por tramo (clic 1/9/18), cohetes y chispas presentes en el DOM en el nivel 2, destellos en el 3, «¡Mándame más amor!» tras la calma, sin cursiva, capturas del clímax y del reposo, consola limpia; 22/22 tests y build de producción OK. Commit a main. **Siguiente: bump a 1.0.0.**
>
> Previo (2026-07-03, Fase L · paso 5 segunda pasada — contador vivo y fiesta a pantalla completa): **el contador de amor queda activado y la animación pasa a modo fiesta total.** El autor creó el namespace KV **`hd-love`** (id `93a9c82535d44143bd16b10147ddde29`) y el binding `LOVE` queda **activo** en `wrangler.jsonc`; verificado de punta a punta en dev (el adapter emula KV en local vía miniflare: GET/POST reales, los clics agrupados llegan en un solo POST con la `n` exacta). Ajustes sobre la primera pasada: **iconos en dorado** (`--accent`); el contador sale del botón y pasa a la frase **«*Amores* recibidos: N»** bajo las dos tarjetas (mismo estilo que los créditos; el número hace *pop* con cada clic, se tiñe del color del corazón y **se queda coloreado**); la animación es ahora una **fiesta a pantalla completa** — capa `position: fixed` hermana del modal (su `transform` atraparía un fixed hijo): ~28 confetis disparados desde el corazón cruzando todo el viewport (3,6 s máx) + 5 emojis voladores (🌟⭐✨🌈🦄💫💖🎉, hasta 4,2 s; 🌠 descartado: en Apple es un cuadrado con marco) con tope de ~160 elementos vivos para que el clic compulsivo no pese; y el botón agradece con secuencia escalonada — «gracias» → «lo recibo» → «qué gusto» → «cuánto cariño» → «ole ole ole» → «voy a explotar» (un paso cada 4 clics para que se lea) y **vuelve a «¡Mándame amor!» tras 4 s de calma**. Endurecido el endpoint: `n` inválida o vacía **no suma nada** (antes un POST basura sumaba +1) y sigue el tope de 50 por petición. **Anotado del autor (mismo día):** regla de redirect `www` → root **creada en Cloudflare pero con aviso de posible config DNS pendiente — verificar en vivo tras el deploy** (junto con las comprobaciones post-deploy ya anotadas: offline/SW, cabeceras, iOS); y la **auditoría de textos con Fable NO bloquea la 1.0**. Verificado: 22/22 tests, build de producción OK, navegador — un POST exacto por ráfaga (5 clics → `{"n":5}`), clamps del endpoint (0/basura/999→+50), etiqueta que escala y vuelve, número coloreado persistente, fiesta capturada en pantalla, consola limpia. Commit a main. **Siguiente: bump a 1.0.0.**
>
> Previo (2026-07-03, Fase L · paso 5 apoyo/donaciones): **el modal «Acerca de» estrena la fila de apoyo: «¡Mándame amor!» + «Invítame a un café».** Dos tarjetas sobrias bajo el texto de créditos (`About.svelte`): la del **café** (icono de taza) enlaza a **Buy Me a Coffee** (`buymeacoffee.com/orangeman7557` — decisión del autor 2026-07-03, sustituye al Ko-fi previsto en el croquis); la del **corazón** rompe a propósito el minimalismo al pinchar — el corazón se rellena ciclando 6 colores vivos, hace *pop* (Web Animations API), suelta ~12 partículas de confeti (spans efímeros, sin librerías) y un **contador global de clics** sube como parte de la animación. Se puede pinchar en ráfaga: cada clic repite la fiesta, y los clics se agrupan (900 ms de calma) en un solo POST. El contador vive en **Cloudflare KV** vía el endpoint nuevo `/api/love` (`src/routes/api/love/+server.js` — GET lee, POST incrementa con tope de 50 por petición; primer endpoint de servidor de la app; el SW no intercepta `/api`). **Degradación limpia**: sin KV u offline el endpoint responde `count: null` y el contador se oculta — corazón y confeti funcionan igual (y con `prefers-reduced-motion` no hay animación pero sí cambio de color). **Pendiente para activar el contador en producción**: crear el namespace KV en el panel de Cloudflare y pegar su id en `wrangler.jsonc` (el binding queda comentado para no romper el deploy). Además, **texto del modal ajustado** (redacción del autor): «App creada por…», «la creé…», «Manifestador» (como la prosa del resto de la app) y el cierre «Ojalá que te sea útil, ¡y que vivas bien y feliz con tu diseño, querido humano!». Verificado: 22/22 tests, build de producción OK, y navegador — confeti/pop/contador en ráfaga, un solo POST agrupado (3 clics → n=3), contador oculto sin KV, enlace del café con `_blank` + `noopener`, consola limpia. Commit a main. De la Fase L quedan el redirect `www` (menor) y el bump a 1.0.0.
>
> Previo (2026-07-03, auditoría · segundo lote — cierre de la lista): **resueltos los 12 puntos restantes de la auditoría** (solo quedan pendientes el punto 8, excluido por decisión del autor, y el repaso de textos/prompts con Fable, que irá en sesión propia). (5) `importCharts` **valida y deduplica** (rechaza registros sin fecha/hora/zona, omite cartas ya guardadas; el diálogo informa de importadas/omitidas/descartadas). (6) el autocomplete **distingue "sin resultados" de "no se pudo buscar"** (fallo de Photon) y el geocoder descarta resultados sin coordenadas. (7) **gestión de foco en todos los overlays** — nueva acción compartida `focus-trap.js` (foco al abrir, ciclo de Tab, restauración al cerrar) aplicada a ElementInfo/InitialReport/About/ReportBug/Dialog — y el **autocomplete navegable por teclado** (flechas + Enter + Escape, con ARIA de combobox). (9) nombre de fichero PNG/PDF **saneado** (caracteres ilegales → guion). (10) los errores de compartir/descargar/PDF tienen **mensaje propio** (ya no salen como "No se pudo guardar:"). (11) la flecha de volver cae a la home si no hay historial y el estado de error de `/chart` enlaza "Volver al formulario". (12) la lista de cartas guardadas muestra la **fecha formateada** (13/03/1984, 09:30). (14) las instrucciones de instalar cubren **cualquier navegador iOS** (no solo Safari). (15) los dos ficheros backup **destrackeados** (+`.gitignore`). (16) **cabeceras de seguridad** base en `static/_headers` (nosniff, referrer-policy, frame, permissions) + filtro en `svelte.config.js` para que el SW no lo precachee (Cloudflare lo consume sin servirlo → habría roto la instalación del SW); la CSP completa queda diferida como tarea propia. (17) el SW **precachea `/privacy`** y las navegaciones offline a otras URLs **redirigen a `/`** (antes servía el HTML de la home bajo `/chart`). (18) revisado el descarte del prompt de instalación: el comportamiento actual es el correcto de plataforma, sin cambio. Verificado: 22/22 tests, build de producción (con `_headers` excluido del precache y presente en el deploy), y navegador — teclado del autocomplete elige Madrid, import valida/deduplica de verdad, fecha formateada, foco entra/vuelve en About y en el drawer de puerta, enlace de "Volver al formulario", sin errores de consola. **Pendiente de probar tras el deploy** (no verificable en dev): offline/redirect del SW, cabeceras en producción e iOS real. Commit a main.
>
> Previo (2026-07-03, auditoría completa + primer lote): **auditoría integral de la app registrada en BACKLOG ("Audit 2026-07-03") y resueltos sus 5 primeros puntos.** La auditoría (conceptual → bugs → mejoras) no encontró bugs graves nuevos; confirmó por código la causa de dos bugs ya registrados (el enlace de instalar no se renderizaba en `/chart`; los tooltips de la tabla los recorta el scroller `.acts-scroll`) y dejó ~17 items priorizados, incluido el **repaso de textos y prompts con Fable** pedido por el autor. **Decisión de voz registrada** (BACKLOG + CLAUDE.md §4): el informe inicial habla en 2ª persona (documento dirigido al dueño de la carta); el resto de la app es impersonal y el estado en pantalla se dice "esta carta" (excepción consciente: el prompt del informe, en 1ª persona). **Resuelto en este lote:** (1) tests — 6 anclas de regresión nuevas en `chart.test.js` que fijan Generator/MG/Projector y las autoridades sacral/esplénica/ego/autoproyectada/mental (con las 2 cartas validadas ya existentes quedan cubiertos los 5 tipos y las 7 autoridades; 22/22); (2) el footer de `/chart` estrena el enlace **"instalar como app"** (mismo handler que la home; cierra el bug de inconsistencia home↔carta); (3) **CLAUDE.md actualizado a la realidad** (§1 instalabilidad/offline construidos, §3 árbol completo, §4 regla de voz + cobertura real de tests, §6 resumen de Fase L y notas de revisión de textos cerradas); (4) las **codas de estado de puertas/canales pasan a impersonal** ("En esta carta…") en `content/index.js`; (5) la etiqueta de autoridad "Mental (sounding board)" → **"Mental (ambiental)"**. Verificado: 22/22 tests, build de producción OK, navegador sin errores (codas en los 3 estados de puerta + canal completo, enlace de instalar con `beforeinstallprompt` sintético). Commit a main.
>
> Previo (2026-07-03, ajustes menores de footer y privacidad): **el enlace "reportar un fallo" pasa a llamarse "notificar un fallo"** (footer de home/carta, título y toggle del modal en `ReportBug.svelte`, y la mención en `/privacy`); y **"acerca de" pasa a ser la última opción del footer** (antes iba en segunda posición) en ambas rutas — nuevo orden: notificar un fallo · privacidad · acerca de. Además, la página `/privacy` **ya no nombra servicios de IA concretos** (Claude/ChatGPT/Perplexity) en el punto "Llevar tu carta a una IA": queda genérico ("el servicio de IA que elijas"). Verificado en preview (snapshot de accesibilidad del footer y del modal). Commit a main.
>
> Previo (2026-07-03, Fase L · paso 6 política de privacidad): **la app estrena página de privacidad propia en `/privacy`.** Nueva ruta `src/routes/privacy/` (`+page.js` con `prerender = true` + `ssr = true`, como la home → HTML estático servido fuera del worker; `_routes.json` la excluye igual que `/`) y `+page.svelte` con la política en **lenguaje llano y con guiño al RGPD (España/UE)**. Redacción **a medida, no genérica**: cuenta la verdad de la app —cálculo 100% en el dispositivo (sessionStorage + IndexedDB, nada sale para calcular), y los tres puntos donde algo sí sale: buscador de ciudad → **Photon**, formulario de fallos → **Web3Forms** (solo si lo usas), handoff a IA (**Claude/ChatGPT/Perplexity**, rige su política), más los logs transitorios de **Cloudflare**— y lo que **no** hay (cookies, analítica, anuncios, cuentas, venta de datos). **Responsable**: «Javi G.O., autor de la app»; **contacto** por el formulario «reportar un fallo» (incrustado al pie de la propia página). Enlace **«privacidad»** (una palabra, estilo calcado) en el footer de home y carta; `/privacy` añadido a `sitemap.xml`. Verificado con build de producción: `/privacy` prerenderiza con `<title>`/`canonical`/`og:url` correctos y todo el contenido en el HTML (no un shell); el enlace aparece en la home prerenderizada; `_routes.json` la sirve como estático. Commit a main. Del croquis de la Fase L solo queda el paso 5 (Ko-fi, opcional) antes del bump a 1.0.0 (paso 7).
>
> Previo (2026-07-03, Fase L · paso 3 dominio propio): **la app estrena dominio propio `hdchart.app`.** Comprado en **Cloudflare Registrar** y conectado al Worker `human-design-chart-app` como **Custom Domain** (DNS + TLS automáticos; ya resuelve en vivo). En código, todas las URLs absolutas pasan del viejo `…workers.dev` a **`https://hdchart.app`**: `SITE_URL` en la home ([`src/routes/+page.svelte`](src/routes/+page.svelte) — arrastra canonical, Open Graph, Twitter Card y JSON-LD), el `<loc>` de [`static/sitemap.xml`](static/sitemap.xml) y la línea `Sitemap:` de [`static/robots.txt`](static/robots.txt). Elegido `hdchart.app` (root) como host canónico: corto y memorable, `.app` fuerza HTTPS (ya cubierto) y el nombre **no contiene la marca «Human Design»** (cierra el frente legal del naming; el término descriptivo vive en title/description, que es lo que Google muestra). **Pendiente menor**: añadir en Cloudflare un redirect `www.hdchart.app → root` (anotado en BACKLOG, paso 3). Verificado: sin referencias residuales a `workers.dev` en el repo; el dominio responde. Commit a main (el auto-deploy publica el código con las URLs nuevas).
>
> Previo (2026-07-03, Fase L · paso 4 reportar un fallo): **el enlace diferido "reportar un fallo" del footer estrena formulario, conectado a Web3Forms (sin backend, sin cuenta para quien reporta).** Nuevo componente `src/lib/components/ReportBug.svelte` — enlace en el footer (home y carta) «reportar un fallo» con un glifo de bicho detrás del texto, girado 45° hacia arriba-derecha; alineación del footer preservada (el enlace es un `<button>` inline-block normal, como el de «acerca de», no inline-flex). Abre un modal «Reportar un fallo o enviar una sugerencia» con: (1) selector «¿De qué se trata?» → «Reportar un fallo/bug» o «Enviar una sugerencia/mensaje» (cambia intro, etiqueta y placeholder del textarea; el texto explicativo va en una rejilla que apila ambas versiones para que el modal no cambie de alto al alternar); (2) descripción obligatoria; (3) nombre y email **opcionales**; (4) honeypot antispam; (5) estados enviando/éxito/error. **Auto-captura** enviada como campos ocultos (el usuario no los escribe): userAgent, idioma, resolución, tamaño de ventana, modo PWA vs navegador, versión de la app. POST a `https://api.web3forms.com/submit` con la `access_key` (pública, sin exponer el email del autor); el `subject` sale como «HD Chart · Fallo/Sugerencia». **Captura de pantalla descartada**: el test con adjunto devolvió 400 («You are trying to use a Pro feature») — los adjuntos son de pago en Web3Forms, así que el formulario queda **solo texto** (decisión del autor: no pagar Pro). Corregidos dos deslices del texto que pasó el autor: «el sugerencia» → «la sugerencia» y «Cuánto más» → «Cuanto más» (ortografía). Verificado en navegador: footer alineado y bug girado a la derecha, toggle, textos condicionales con alto fijo, validación de envío vacío, y **envíos de prueba reales → 200 `success: true`** (el autor confirmó que el email llega). Commit a main. Quedan del croquis los pasos 3 (dominio), 5 (Ko-fi, opcional), 6 (privacidad) y 7 (bump 1.0.0).
>
> Previo (2026-07-02, Fase L · paso 2 SEO/discovery): **la home se prerenderiza a HTML estático y estrena metadatos SEO completos.** (1) **Prerender selectivo**: nuevo `src/routes/+page.js` con `prerender = true` + `ssr = true` (sobrescribe el `ssr = false` global de `+layout.js`); la página de carta sigue SPA (su `+page.js` mantiene ssr/prerender en false). Ahora los crawlers y bots de IA reciben el contenido real de la home (h1, copy, formulario) en vez del shell vacío. (2) **`svelte:head` en la home** con title y description afinados, `canonical`, Open Graph (type/site_name/title/description/url/image 1200×630/locale), Twitter Card (`summary_large_image`) y JSON-LD `WebApplication` (gratis, autor Javi G.O.). (3) **Imagen de compartir** `static/og-image.png` (1200×630, glifo dorado + wordmark; generada con `sharp` desde un SVG y script desechado, como los iconos). (4) **`app.html`**: quitados el `<title>` y la `description` estáticos para no duplicarlos con el `svelte:head` prerenderizado; la carta estrena su propio `svelte:head` (título "Tu carta · Human Design Chart"). (5) **`static/robots.txt`** (allow all + sitemap) y **`static/sitemap.xml`** (solo la home; la carta es per-usuario, no indexable). Las URLs absolutas usan el dominio `workers.dev` actual → **actualizar `SITE_URL` (home) + robots + sitemap cuando aterrice el dominio propio (paso 3)**. El **paso 0 (revisión de textos)** queda marcado OK por el autor (pueden venir más tandas). Verificado: el build prerenderiza `/` con contenido real, un solo `<title>`/`description`, OG/canonical/JSON-LD válidos; `_routes.json` sirve `/` como estático y deja `/chart` en el worker; 16/16 tests; dev limpio sirve el head correcto. Commit a main.
>
> Previo (2026-07-02, sentence case en títulos): **preferencia de estilo del autor registrada para todo el proyecto — los títulos van en sentence case (solo la primera letra en mayúscula), nunca title case (estilo americano de capitalizar cada palabra).** Aplicado a los 36 nombres de canal de `es.js` («canal de la Inspiración» → «canal de la inspiración», etc.; van a media frase «Es el canal de la…», así que quedan en minúscula salvo nombres propios). Los títulos I Ching ya estaban en sentence case desde la pasada anterior. Verificado: 16/16 tests + render. Commit a main.
>
> Previo (2026-07-02, 3ª pasada — nombres+esencia de canal, «(3)» de línea 6, frase de canal completo): **enriquecidos los textos de canal y un par de retoques puntuales.** (1) **Línea 6**: añadido el marcador «(3)» a la tercera fase vital, en el informe (2ª persona, `report.profile['6']`) y en el perfil del cajón (3ª persona, `profile['6']`). (2) **Canales — nombre + esencia**: nuevo bloque de datos `channel` en `es.js` (36 entradas, clave puerta-menor-primero) con el **nombre establecido del canal en español** (títulos cortos, no protegibles; misma clase de nomenclatura HD —tipos/centros/autoridades— que ya usa la app; donde las fuentes divergían se favorece el nombre canónico HD; cruzadas dos listas ES + la nomenclatura inglesa) y una **esencia de redacción propia** (síntesis de los dos temas de puerta + los centros). `getChannelInfo` compone el 2º párrafo como «Es el **canal de X**. Reúne {tema a} ([puerta a]) y {tema b} ([puerta b]): {esencia}», sustituyendo al viejo «que conviene leer juntas para captar su carácter»; con *fallback* a la frase antigua si faltara el dato. (3) **Frase de canal completo**: el coda pasó de «…define sus dos centros y mantiene esa corriente estable entre ellos.» a «Tienes este canal completo en tu carta: conecta el centro X y el centro Y (solo nombres, sin enlace), manteniendo una corriente estable entre ellos.» Consulta legal previa resuelta: usar los nombres de canal es viable (títulos → no copyright; uso descriptivo no comercial). Verificado: 16/16 tests + navegador (cajón de canal 35-36 con nombre+esencia+coda; «(3)» en informe y perfil; clave de canal invertida resuelve bien; 36/36 con nombre). Commit a main.
>
> Previo (2026-07-02, 2ª pasada de revisión — sincronía 2ª/3ª persona + puertas + I Ching): **los textos del informe (2ª persona, ya revisados por el autor) pasan a ser la referencia y sus ediciones se propagan a los textos «i» en 3ª persona.** (1) **Sincronía type/strategy/authority/profile/definition**: comparados los bloques `report.*` (2ª persona) con los generales de `es.js` (3ª persona) y reincorporadas al 3ª persona todas las diferencias de contenido/énfasis que el autor había metido solo en el informe (p. ej. «Generador *puro*» y energía «continuada y abundante»; el matiz «responder e informar» del MG; «cuidado con rendir sin descanso», «su sabiduría y su esfuerzo», «decir sí o no cuando toca» en Proyector; itálicas en las emociones-señal *satisfacción*/*frustración*/*paz*/*amargura*/*reconocimiento*…; el enlace a `[centro Sacral]` que faltaba en «Responder»; «tránsitos planetarios» y el nuevo cierre de la definición *split*; etc.), **conservando los arranques propios del cajón** («La estrategia del Generador…», «La autoridad de la mayoría de…»). Sin tocar los textos del informe ni el bloque `center`. (2) **Puertas**: el 1er párrafo arranca directo en «La puerta N…» (se elimina el «En el [centro X], » del `text` de las 64 puertas en `es.js`) y el centro pasa a un **2º párrafo generado en `getGateInfo`** (`content/index.js`) junto a la **puerta armónica** —la que completa el canal— con su centro: «Está en el [centro X] y su puerta armónica (la puerta que completa su canal) es la [puerta Y (tema)], en el [centro Z].» Las 4 puertas del circuito de integración (10/20/34/57) van en **plural** (varias armónicas). La armónica se nombra por su **tema** (consistente con el drawer de canales). (3) **Títulos I Ching → sentence case** (solo la 1ª letra en mayúscula): «La Necedad Juvenil» → «La necedad juvenil» (64 títulos). Verificado: 16/16 tests + navegador (drawers de puerta/tipo/canal renderizan con negrita/itálica/enlaces correctos). Commit a main.
>
> Previo (2026-07-02, comillas «» → "" en todos los textos): **por
> preferencia del autor, todas las comillas angulares «» pasan a comillas rectas
> "".** Reemplazo global de 80 ocurrencias en 7 ficheros: el contenido de
> `content/es.js` (58), las plantillas compuestas de `content/index.js` (6),
> `report.js` (2) y los prompts de `prompts.js` (8), más las notas de UI
> "Copiar prompt" en `InitialReport.svelte`/`ElementInfo.svelte` (2+2) y
> "Añadir a pantalla de inicio" en la home (2). **Revierte la decisión (a) de la
> pasada anterior** (que devolvía a «» las comillas curvas de Word): ahora la
> convención del repo es la comilla recta ", que además ya usaban un par de
> puertas ("clics", "yo tengo"). Verificado: build de producción OK + 16/16
> tests + parse de los módulos de contenido. Commit a main.
>
> Previo (2026-07-02, primera pasada de revisión de textos del autor):
> **aplicada al código la primera tanda de ediciones del autor sobre los textos**
> (entregadas en el Word de dos columnas `revision-textos/`). De 598 filas, 108
> tocadas → **72 cambios sustantivos en `es.js`**, 4 en `content/index.js`
> (intros de perfil sin el «(de la personalidad)/(del diseño)»; frase de cierre
> del handoff de puerta/canal → «…puedes utilizar la opción de «saber más usando
> IA».») y 2 en `chart/+page.svelte`. **Tres decisiones al reincorporar:**
> (1) las **comillas curvas** que introdujo Word por autoformato se revierten
> a **«»** (convención del repo); las filas cuyo único cambio eran las comillas se
> dejaron intactas. (2) Renombrado global **«Plexo Solar» → «Plexo solar»** (el
> autor lo cambió hasta en el título del centro y las etiquetas) en toda la app
> —`es.js` (15) y `chart/+page.svelte` (2)— y **`[garganta]` → `[Garganta]`** en
> los 8 enlaces de etiqueta, para dejar el nombre del centro consistente. (3) Dos
> **instrucciones entre corchetes** resueltas como enlaces: *bodygraph* →
> `section:chart` en la intro del informe, y «perfil» → `concept:profile` en el
> concepto de activaciones (el resolvedor ya soporta la clave `concept:`).
> Verificado: 16/16 tests + navegador (informe renderiza con las ediciones, el
> enlace `section:chart` hace scroll a «El bodygraph», «Plexo solar» en el
> bodygraph, sin errores de consola). **Es una primera pasada**: la revisión de
> textos del autor sigue abierta (puede haber más tandas). Commit a main.
>
> Previo (2026-07-01, Fase L · instalabilidad construida): **iconos PWA,
> service worker, manifest e «instalar como app».** (1) **Marca/iconos**: icono propio
> (columna del bodygraph en oro sobre negro — triángulo equilátero, cuadrado y rombo con
> esquinas redondeadas, geometría iterada con el autor) en `static/favicon.svg` (maestro)
> + PNG generados (favicon-32, apple-touch-icon 180, icon-192/512, icon-maskable-512) vía
> `sharp`. (2) **Service worker** `src/service-worker.js` (SvelteKit lo registra solo):
> precache del shell + assets, cache-first para assets, network-first con fallback para
> navegaciones (activa «Instalar» + offline básico; no toca cross-origin). (3) **manifest**
> con `id` + array `icons`; **app.html** con favicon/apple-touch-icon + metas iOS. (4)
> **«instalar como app»**: enlace discreto arriba de la home (estilo «ver en navegador»,
> mismo tamaño/color del footer) — Chromium dispara el prompt nativo
> (`beforeinstallprompt` capturado en `src/lib/pwa/install.svelte.js`), iOS Safari muestra
> instrucciones de «Añadir a inicio», y se oculta si ya está instalada. (5) **Acerca de**:
> título en dorado, «gratis para uso no comercial» en negrita, crédito a «Javi G.O.».
> Verificado: build de producción compila el SW; iconos con dimensiones correctas;
> navegador sin errores; enlace e «Acerca de» correctos. **Nota**: el prompt real de
> instalar solo se activa en producción (HTTPS); en dev el SW no se registra a propósito.
>
> Previo (2026-07-01, Fase L registrada): **plan de lanzamiento (→ 1.0)
> registrado en el roadmap** (sin cambios de código). Nueva pseudo-fase de
> endurecimiento pre-1.0 antes de publicar: revisión de textos (gate de contenido) →
> instalabilidad (iconos + service worker + manifest) → SEO (prerender de la home,
> Open Graph, sitemap) → dominio propio (Cloudflare Registrar + Custom Domain) →
> «Reportar un fallo» vía **Web3Forms** → «Invítame a un café» vía **Ko-fi** (no
> bloqueante, puede ir tras 1.0) → política de privacidad → bump a **1.0.0**
> (lanzamiento web). Las tiendas van después y en fases aparte: **Google Play (TWA)**
> primero, **Apple App Store** opcional/más tarde. Decisiones fijadas hoy con el autor:
> feedback = Web3Forms, donaciones = Ko-fi (opcional), 1.0 = solo web. Detalle y
> croquis en BACKLOG («Phase L — Launch plan»).
>
> Previo (2026-07-01, «Sobre esta carta» en puertas/canales): **vuelve el
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
- **Phase L — Launch (→ 1.0).** 🟡 Pre-launch hardening pass that gates the 1.0
  release. **Step 0 (full-app text review) marked OK by the author 2026-07-02**
  (more passes may still come). **Step 1 (installability) done 2026-07-01** — own
  app icon, service worker, manifest icons, app.html iOS metas, and an "instalar
  como app" link. **Step 2 (SEO/discovery) done 2026-07-02** — home prerendered to
  static HTML (`+page.js`, ssr+prerender true; chart stays SPA), tuned
  title/description, canonical, Open Graph + Twitter Card + 1200×630 share image,
  robots.txt, sitemap.xml, and `WebApplication` JSON-LD. **Step 3 (custom domain)
  done 2026-07-03** — `hdchart.app` bought in Cloudflare Registrar and attached as a
  Worker Custom Domain (root = canonical host); `SITE_URL` + robots + sitemap now
  point at `https://hdchart.app`. `www → root` redirect: rule + DNS record for `www`
  created by the author 2026-07-03 — pending live verification after deploy.
  **Step 4 (report a bug) done 2026-07-03** — `ReportBug.svelte`: a footer link
  ("reportar un fallo" + a bug glyph) on both routes opens a form modal (bug/suggestion
  toggle, required description, optional name/email, honeypot) that POSTs to Web3Forms
  with the auto-captured device/OS/app context as hidden fields. **Text-only**: the
  screenshot attachment was dropped after a test returned 400 — attachments are a
  Web3Forms Pro (paid) feature and the author chose not to upgrade. Live test sends
  returned 200/`success: true` and the author confirmed the email arrives. Committed.
  **Step 6 (privacy policy) done 2026-07-03** — prerendered `/privacy` page
  (`src/routes/privacy/`), plain-language + RGPD (Spain/EU), tailored to what the
  app actually does (local-first; Photon / Web3Forms / AI handoff / Cloudflare logs;
  no cookies/analytics/accounts). Linked as "privacidad" in both footers; in sitemap.
  **Step 5 (support/donations) done 2026-07-03** — the About modal gets a support
  row: a "send love" heart (colour-cycling fill + a full-screen party — confetti
  across the viewport plus emoji flyers — via the Web Animations API, no
  libraries, with an escalating thank-you label sequence; a global click counter
  rendered as an "*Amores* recibidos: N" line, served by the new `/api/love`
  endpoint on Cloudflare KV; clicks batched client-side; the counter hides
  gracefully when KV is absent or offline) and "Invítame a un café" linking to
  **Buy Me a Coffee** (author's account; replaces the original Ko-fi plan).
  The KV namespace (`hd-love`) was created by the author the same day and the
  binding is live in `wrangler.jsonc`; verified end-to-end in dev (miniflare).
  Left: the `www` redirect **live verification** (rule created 2026-07-03 but the
  dashboard warned some DNS config may be missing), the post-deploy checks
  (SW offline/redirect, headers, real iOS), and the 1.0.0 bump (step 7).
  **The web launch is 1.0; the app stores are later, separate phases.**
  Ordered: (0) **full-app text review** — the content gate; (1) **installability** —
  app icons (192/512 + maskable), favicon, apple-touch-icon, a minimal service worker
  (fetch handler), complete manifest (icons array, screenshots); (2) **SEO** —
  prerender the home route only (chart page stays SPA), Open Graph + Twitter card +
  share image, tuned title/description, robots.txt, sitemap.xml, canonical, JSON-LD;
  (3) **custom domain** — Cloudflare Registrar (at-cost) attached as a Worker Custom
  Domain (auto TLS); (4) **report a bug** — wire the deferred "Reportar un fallo"
  (About modal) to **Web3Forms**; (5) **donations (non-blocking, may ship post-1.0)** —
  wire "Invítame a un café" to **Buy Me a Coffee** (originally Ko-fi; switched
  2026-07-03); (6) **privacy policy** page; (7) **bump to
  1.0.0**, tag, deploy. Decisions locked 2026-07-01: feedback = Web3Forms; donations =
  Buy Me a Coffee (optional; Ko-fi in the original plan); 1.0 = web-only. Full croquis +
  rationale in BACKLOG ("Phase L — Launch plan").
- **Google Play packaging (TWA) — after 1.0.** `assetlinks.json` on the domain +
  Bubblewrap/PWABuilder package + Google Play dev account (one-time $25) + store listing
  (screenshots, description, privacy policy). Needs Phase L installability + domain done.
- **Apple App Store packaging — optional, later.** WKWebView/Capacitor/PWABuilder-iOS
  package + Apple Developer Program ($99/yr) + a Mac with Xcode; must add native value to
  clear App Store review guideline 4.2 ("minimum functionality"). Lowest priority — iOS
  "Add to Home Screen" already covers most of the value once apple-touch-icons exist.
- **Phase 8 — Composite chart.** Two saved charts rendered as a combined
  bodygraph (visual overlay distinguishing each person).
- **Phase 9 — Transits.** View live transits over a saved chart.
- **Phase 10 — Online sync.** Optional cloud persistence of saved charts
  (local-only stays the default).
- **Phase 11 — Internationalization (i18n).** The UI and content are Spanish-only
  today (the content module `src/lib/hd/content/` was already built i18n-ready).
  Turning that into real multi-language means: (a) a locale routing scheme (path
  prefix per language, e.g. `/es`, `/en`) with translated UI + content per locale;
  (b) **multilingual SEO** — one URL per language, each declaring its own
  `<html lang>` / `og:locale` / JSON-LD `inLanguage`, cross-linked with `hreflang`
  alternates (home **and** `/privacy`), and a sitemap listing the alternates. Today
  everything hardcodes `es` (correct for the Spanish-first 1.0 launch); the domain
  `hdchart.app` is language-neutral, so no rework there. The pattern is additive:
  the current Spanish home becomes the `/es` variant and `/en` is added alongside.
  Full SEO rationale in BACKLOG ("Multilingual SEO — deferred to Phase 11 i18n").

---

## Useful pointers

- Live URL: <https://hdchart.app/> (also reachable at the old
  `human-design-chart-app.orangeman7557.workers.dev` Workers origin)
- Repo: <https://github.com/orangeman7557/human-design-chart-app>
- Validation case: orangeman7557's own chart (1984-03-13, 09:30, Madrid —
  Manifestor), entered by hand or via the frozen snapshots in
  `src/lib/hd/chart.test.js`. The hidden tagline shortcut that pre-filled
  it was removed at the 1.0.0 launch (2026-07-03).
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
