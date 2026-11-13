# Revisión de TEXTOS — HDchart 1.5.7

## 1. Nota del frente: 7,5 / 10
- **Español: 7 / 10** · **Inglés: 8,5 / 10**

Veredicto: no es un problema grave ni general. La falta de fluidez se concentra en los **bloques de referencia más antiguos** (tipos, conceptos, estrategia, autoridad): ahí hay sinónimos emparejados, calcos e incisos encadenados. Además hay un puñado de **muletillas de texto generado** repartidas por todo el pack. Puertas, canales, cruces y el informe en 2ª persona son lo más natural. Basta con un retoque dirigido: no hace falta reescribir.

## 2. Fortalezas
- Las puertas, canales y cruces (`gate.*.more`, `channel.*.more`, `crossEssence`) tienen un tono cercano y concreto, con frases cortas («Cuando la tienes activa, la gente te cuenta cosas», gate 13).
- El informe abre con honestidad y claridad: «No se considera ciencia —conviene decirlo claro— sino un marco simbólico» (`report.intro`). La analogía de las hormigas funciona.
- El chrome (`ui/es.js`) es casi todo limpio, con una voz propia y simpática (about, bug).
- La capitalización se aplica bien: sentence case en español y Title Case en inglés.
- El inglés está escrito desde el significado, no calcado.

## 3. Patrones de falta de fluidez en español

**TXT-1 · Sinónimos emparejados y redundancia** (frecuente en tipos, conceptos y report; esfuerzo S–M)
- `content/es.js` type.generator (l.1081): «alrededor del **~37%**… Su energía generadora y constructora… es continuada y abundante» → «alrededor del **37 %**… Bien alineado, su energía de trabajo es constante y abundante».
- type.generator (l.1082-1083): «desde la mente y lo racional», «desde el pensamiento y la razón» → «desde la cabeza».
- concept.bodygraph (l.29): «una energía consistente, propia y constante» → «una energía propia y constante».
- report.collective.intro (l.2064): «necesita de todos los diferentes tipos de persona» → «necesita a todos los tipos».
- gate 48 (l.1885): «un pozo de profundidad» → «un pozo».

**TXT-2 · Calcos del inglés y anglicismos** (puntual a frecuente; S)
- authority.emotional (l.1165) y report.authority: «dormir sobre ello» → «consultarlo con la almohada».
- report.leadIn.authority (l.2078): «navegar las decisiones tomadas» → «sostener las decisiones ya tomadas».
- strategy.respond-then-inform (l.1132) y typeReport MG (l.2294): «no inicia por mente» / «inicias por mente» → «no arranca desde la cabeza».
- `ui/es.js` about.donateIntro: «Si encuentras la app útil» → «Si la app te resulta útil».
- `ui/es.js` bug.kindAria «Tipo de reporte», bug.subjectPrefix «reportes», privacy.l2 «Formulario para reportar fallos» → «aviso», «notificar fallos». En la misma línea: «Info general» → «General» y «Email» → «Correo».

**TXT-3 · Muletillas de texto generado** (sistémico pero leve frase a frase; se nota al leer el informe seguido; M)
Recuento en `content/es.js`: «de verdad» ×50, «en lugar de/en vez de» ×32, «conviene» ×29, «No es X, es Y» ≥21, «precisamente» ×9.
- crossEssence 'of Contagion' (l.182): «Contagio aquí no es enfermedad, es lo que se transmite…»; 'of Planning' (l.188): «No es control, es estructura…»; signal.generator (l.981): «No es euforia ni entusiasmo constante — es una hondura tranquila». Reescritura: alternar con frases afirmativas («Contagio, aquí, es lo que se transmite sin proponérselo»).
- report.purpose (l.2091 y 2095): «Y conviene decir algo antes de seguir…» y «Y aquí algo importante en lo que conviene insistir…». Son tres arranques con «Y» seguidos (más leadIn.purpose) y dos «conviene». Propuesta: «Antes de seguir, un aviso:…» y «Lo importante:…».

**TXT-4 · Ecos y repeticiones cercanas** (frecuente; S–M)
- gate 25 (l.1702): «Cuando el mundo te devuelve un golpe, puedes endurecerte de golpe… después de un golpe» → «…puedes endurecerte de repente… después de una herida».
- channel 2-14 (l.2410): «una dirección interior que orienta hacia dónde dirigir la energía» → «un sentido interior que marca hacia dónde llevar la energía».
- type.reflector (l.1115): «Cuando vive alineado…, viviendo en el lugar…, aparecen en él… el síntoma que aparece en él» → «Cuando vive alineado, en el lugar y con la gente adecuados, aparecen la *sorpresa* y el *deleite*; si no, la *decepción*».
- report.collective.intro (l.2064): «funciona precisamente porque… funciona porque…», con el mismo giro que en `ants`.
- Fórmula «Cuando la tienes activa, tienes…» en 18 de 64 puertas → «Cuando la tienes activa, cuentas con…».

**TXT-5 · Sintaxis forzada: incisos, gerundios y régimen** (frecuente en bloques de referencia; M)
- type.manifesting-generator (l.1089): «Una variante del Generador —los Generadores Manifestantes suponen un ~33%…, y junto al resto de Generadores, cerca del 70 %—: un Generador Manifestante tiene…». Mejor partirla: «Es una variante del Generador. Supone cerca del 33 % de la población (con los demás Generadores, casi el 70 %).»
- report.conditioning (l.2049): «manteniendo especial atención en dejar de compararte» → «prestando especial atención a no compararte».
- authority.sacral (l.1172): «captar y confiar en esa respuesta» → «captar esa respuesta y confiar en ella».
- report.intro (l.2028): «cómo tomas decisiones bien» → «cómo tomar buenas decisiones».

**TXT-6 · Puntuación de la raya y del %** (sistémico, automatizable; S)
- La raya aparece mezclada: estilo inglés con espacios « — » (95 veces) y raya española pegada (128). Ejemplos: crossEssence 'of Laws' (l.163) «una comunidad — y para lo que la va a romper»; report.type.generator (l.2114) «el tipo más común — alrededor de». Normativa española: «—y para lo que…».
- El porcentaje alterna «37%» (19) y «70 %» (2). La RAE pide «37 %».

**TXT-7 · Registro desigual en el chrome** (puntual; S)
- privacy usa «nosotros» («te explicamos», «podamos leer», «escríbenos»), mientras bug/about van en «yo» («Lo he recibido», «Cuéntame»). Conviene elegir uno.
- «Borrar carta» frente a «Eliminar etiqueta» (`saved.delete` / `labels.delete`).

## 4. Mapa por bloques

| Bloque | Estado | Comentario |
|---|---|---|
| `ui/es.js` (chrome) | Retoque ligero | TXT-2, TXT-7; lo demás está bien |
| home / whatHd / report Parte A | Bien – retoque ligero | **Es lo primero que lee un usuario nuevo** y está bien; solo TXT-3 y TXT-5 puntuales |
| report Parte B (type/authority/typeReport/purpose) | Retoque ligero | muletillas, «Y conviene…» |
| `type`, `strategy`, `authority` (drawers) | **A fondo** | lo más rígido: dobletes, calcos, incisos |
| `concept` | Retoque medio | redundancias, «split», voz (TXT-8) |
| `profile`, `center` | Retoque ligero | correctos, algo nominales |
| `signal`, `crossSummary` | Retoque ligero | rayas, «No es… es» |
| `gate`, `channel` | Bien | fórmula repetida; ecos puntuales |
| `crossEssence` | Bien | rayas y «No es… es» |
| `promptTemplates`, `drawer` | Bien | funcionales y correctos |

## 5. Otros hallazgos

**TXT-8 · Voz** (puntual; S). Los drawers de concepto deberían ser impersonales, pero en concept.center (l.78), concept.channel (l.90) y concept.gate (l.98) dicen «aparecen resaltados los … **en tu carta**» → «en esta carta». Aparte, el comentario de `drawer` (l.2924) dice «never "tu carta"», cuando las codas ya usan «En tu carta» según la regla de 2026-08: el comentario está desfasado.

**TXT-9 · Terminología** (puntual; S)
- «split / triple split / cuádruple split» en español (concept.definition l.68, definition l.1278). Que lo valide el revisor de HD frente a la forma de la comunidad hispana.
- «consciencia» (crossEssence) alterna con «conciencia» (authority.splenic).
- report.type.generator dice «un tercio de las personas son Generadores puros» y el drawer dice «~37 %».
- seo.title mezcla «Human Design Chart» y «Diseño Humano» (posible decisión SEO).

**TXT-10 · Inglés** (puntual; S). En general suena natural. Lo literal:
- `ui/en.js` about.thanks[1] «I receive it!» → «Got it!».
- loveMany «loves received» → «hearts received».
- `content/en.js` gate 34: «Being busy is not the same as being well spent» → «…as spending yourself well».
- gate 34: «you produce a force that looks excessive to other people» suena algo calcado.

**TXT-11 · Claridad para novatos** (puntual; S). La home y el informe se entienden bien. En la carta hay tooltips crípticos: `chart.tipDesign` «(88° de arco solar)» y `chart.hangingTip` «{a} puertas en centros indefinidos / {b}…» sin decir qué significa una puerta colgante. «bodygraph» aparece en el chrome sin glosa.

## 6. Método recomendado
1. **Leer prosa, no JS.** Un script que vuelque cada bloque a un .md («clave → texto») deja revisar en limpio. Luego se aplican los cambios por clave.
2. **Automatizar lo mecánico primero:** normalizar la raya (« — » → «—» con cierre) y «N %», con revisión del diff. Un grep de muletillas («de verdad», «conviene», «No es…, es», «en lugar de») da una lista de líneas para decidir caso a caso, sin eliminarlas todas.
3. **Orden por exposición:** (a) `ui/es.js`, una sesión de unas 2 h; (b) report Parte A + leadIn + typeReport; (c) type/strategy/authority/signal, el bloque «a fondo»; (d) concept, profile, center, definition; (e) crossSummary; (f) puertas, canales y crossEssence solo con el grep.
4. **Tandas** de un bloque o unas 150 líneas por sesión, leyendo **en voz alta** o en la propia app: los dobletes se oyen enseguida.
5. Si se usa IA, con una **hoja de estilo** corta (estos 7 patrones) y que **proponga diffs** por bloque, no que reescriba. Los cambios en español no obligan a tocar el inglés salvo si cambia el sentido; el test de paridad cubre las claves.

## 7. Lo que no he muestreado
- Muestreado: `ui/es.js` ≈100 % y unas 450 de 3.045 líneas de `content/es.js` (~15 %), más grep de patrones sobre el pack entero.
- No he visto: `crossName`, `iching`, `planet`, `activationCol`, `relatedIndex`, `promptLabels`, `reportShell`, `definition` (solo la l.1278), report strategy/profile/definition/center, 58 puertas, 33 canales, unas 100 cruces y 7 centros. Del inglés, la mayor parte de `ui/en.js`, la privacidad y casi todo `content/en.js`.
