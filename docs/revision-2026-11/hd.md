# Revisión: rigor de Diseño Humano

## 1. Nota del frente: 8/10
El núcleo es correcto: la rueda, los canales, los centros, la lógica de tipo/autoridad/definición/cruz y la efeméride (precisión de segundos de arco) aguantan una revisión experta. Los riesgos reales no están en el cálculo, sino en **lo que entra al cálculo** (hora desconocida, zonas horarias históricas, horas límite) y en que la app **presenta como seguro lo que no lo es**.

## 2. Fortalezas (verificadas)
- **Datos de referencia**: comprobados uno a uno contra el sistema estándar. La rueda de 64 puertas empieza en la 41 a 302° (2°00' Acuario), y de ahí sale, por ejemplo, la 17 a 3°52'30" Aries, que es correcto. También cuadran los 36 canales, las puertas de cada centro y los 4 motores (`constants.js:8-103`).
- **Efeméride**: la comparé con ejemplos de Meeus. El Sol (ej. 25.b, 1992-10-13) se desvía −4,9" y la Luna aparente (ej. 47.a, 1992-04-12) −2,6". El nodo es el verdadero osculante (273,54° frente a 274,40° del nodo medio, coherente). El Diseño se calcula a 88° de arco solar con Newton hasta 1e-7° y da 89–91 días, como se espera.
- **Lógica de la carta** (`chart.js:231-295`): la Garganta motorizada se detecta también por vía indirecta (BFS sobre el grafo de centros), el Generador manifestante sale bien y la jerarquía de autoridad (Plexo > Sacro > Bazo > Ego > Autoproyectada > Mental/Lunar) es la estándar. La autoproyectada sin comprobar la conexión G–Garganta es equivalente, porque no queda otra vía posible.
- **Cruz**: la tabla perfil→ángulo (`chart.js:160`) y `crossQuartet()` (−16/−15) cuadran con la geometría de los 88°. Lo comprobé analíticamente: 4/6 da −16 y 4/1 da −15. La yuxtaposición sale en ≈2,2 % de los nacimientos, así que «el ángulo más raro» es correcto. Los nombres que muestreé (1 derecha = Esfinge, 1 izquierda = Desafío, 1 yuxtaposición = Autoexpresión, 25 derecha = Receptáculo del amor, 3 izquierda = Deseos) son canónicos.
- **Doctrina del contenido** (muestreé 15 entradas): los porcentajes (37/33/20/9/1 %), las señales de los 5 tipos, la estrategia lunar (~28 días), las funciones del Bazo y del Corazón, los perfiles y la definición partida son correctos. Los 34 nombres de canal que no estaban señalados son estándar o alternativas aceptadas (6-59 Intimidad, 16-48 Talento).

## 3. Hallazgos

**HD-1. Una carta con «hora desconocida» se guarda, comparte e interpreta como si fuera exacta.**
- **Qué pasa**: `unknownTime` solo existe en el formulario (`+page.svelte:157`). La carta, el guardado, el enlace y el informe no reciben ninguna marca, y las bandas del deslizador solo muestran el **tipo**.
- **Evidencia**: un script sobre 300 días aleatorios entre 1950 y 2010, con 48 medias horas por día. Dentro de un mismo día cambia el **perfil el 100 % de los días**, los canales el 88 %, la definición el 52 %, el tipo el 42 %, la cruz el 35 % y la autoridad el 29 %.
- **Impacto**: alto. Afecta a todo el que no sabe su hora, que recibe un perfil, una cruz y quizá una autoridad presentados como hechos.
- **Esfuerzo**: M.
- **Propuesta**: guardar `timeUnknown` en la carta y en el enlace, y mostrar un aviso en la carta y en el informe. Calcular las 48 muestras y separar lo **estable** de lo **variable** (p. ej. «perfil 3/5 o 3/6»). Atenuar la Luna y sus activaciones. Añadir el perfil y la autoridad a las bandas del deslizador.
- **Confianza**: alta.

**HD-2. Zonas horarias anteriores a 1970 incorrectas en varias regiones (datos sin *backzone*).**
- **Qué pasa**: Luxon usa los datos de zona de ICU, que fusionan zonas anteriores a 1970.
- **Evidencia** (Node 24, tzdata 2026a, `tz.mjs`):
  - Ámsterdam, junio de 1935: la app usa +01:00 y lo real era +01:20 (20 min de error).
  - Reikiavik, 1960: la app usa +00:00 y lo real era −01:00 (1 h de error).
  - Oslo, Estocolmo y Copenhague antes de 1900: todas reciben +00:53, el tiempo medio de Berlín.
  - España antes de 1901: cualquier ciudad recibe el tiempo medio de Madrid (−00:14). Barcelona en 1890 queda desviada unos 23 min.
  - En el navegador es *sospecha*: Chrome y Safari incluyen ICU sin *backzone*, igual que Node.
- **Para medir el efecto**: ±5 min ya cambian alguna puerta o línea en el 22,6 % de las cartas (ver HD-3).
- **Impacto**: alto para las personas afectadas y medio en conjunto. Lo silencioso es lo grave: el usuario nunca ve qué desfase horario se aplicó.
- **Esfuerzo**: S para mostrarlo, M para corregirlo.
- **Propuesta**:
  1. Mostrar en el formulario y en la carta la zona y el desfase usados («Europe/Madrid, UTC+01:00») y permitir corregirlo a mano.
  2. Más adelante, añadir una pequeña tabla de excepciones anteriores a 1970 (Países Bajos, Islandia, etc.) o tiempo medio local calculado por longitud antes de la adopción del huso.
- **Confianza**: alta para Node, media para el navegador.

**HD-3. Ningún aviso cuando la carta está en el filo de una línea o puerta.**
- **Qué pasa**: la efeméride es precisa, pero la incertidumbre real está en la hora de nacimiento, y la app no la refleja.
- **Evidencia**: muestra de 1.500 nacimientos entre 1940 y 2010 (`sens.mjs`). Con ±5 min:
  - el 22,6 % cambia alguna puerta o línea;
  - el 2,0 % cambia de canales;
  - el 1,2 % cambia de perfil;
  - el 0,7 % cambia de definición;
  - el 0,5 % cambia de tipo.
- **Impacto**: medio.
- **Esfuerzo**: S-M.
- **Propuesta**: recalcular la carta a ±5 (o ±10) min y marcar con un punto discreto los elementos que cambian («sensible a la hora»), sobre todo el tipo, la autoridad, el perfil y la cruz.
- **Confianza**: alta.

**HD-4. Las horas ambiguas o inexistentes por el cambio de hora se resuelven en silencio.**
- **Evidencia**: en Madrid, 2024-10-27 02:30 y 1984-09-30 02:30 se resuelven a +01:00 (la segunda ocurrencia) sin preguntar. 2024-03-31 02:30, que no existe, pasa a 03:30 CEST sin aviso (`chart.js:61`).
- **Impacto**: bajo. Es raro, pero son 60 min de diferencia, como medio grado de Luna.
- **Esfuerzo**: S.
- **Propuesta**: detectar el caso comparando los desfases a ±1 h y preguntar «¿primera o segunda vez?» o «esa hora no existió».
- **Confianza**: alta.

**HD-5. El rango de fechas no tiene límites (año 0001–9999) y no se dice qué calendario se usa.**
- **Evidencia**: `DateField.svelte:52-57` acepta cualquier año de 4 dígitos. `computeChart` devuelve carta para el año 0100 y para el 9999 (ΔT extrapolado, tiempo medio local). Las fechas anteriores a la reforma gregoriana se toman en calendario gregoriano proléptico.
- **Impacto**: bajo (curiosos, figuras históricas).
- **Esfuerzo**: S.
- **Propuesta**: limitar a 1800–2100, o avisar fuera de 1900–2050.
- **Confianza**: alta.

**HD-6. `tz-lookup` 6.1.25 (2020) tiene fronteras desfasadas.**
- **Evidencia**: Ciudad Juárez (31.69, −106.42) devuelve `America/Ojinaga`, que va a la hora del Centro desde noviembre de 2022. Lo correcto sería `America/Ciudad_Juarez` (Montaña). Los nacimientos desde 2022 salen con 1 h de error.
- **Impacto**: bajo, pero indica que la dependencia no se mantiene.
- **Esfuerzo**: S.
- **Propuesta**: migrar a un *fork* mantenido (p. ej. `@photostructure/tz-lookup`) y añadir un test de ciudades fronterizas.
- **Confianza**: media sobre qué alternativa elegir.

**HD-7. La autoridad de Ego no distingue entre «manifestada» y «proyectada».**
- **Qué pasa**: el estándar las separa. Ego manifestada es Corazón–Garganta (21-45, Manifestadores) y Ego proyectada es Corazón–G (25-51, Proyectores). La app las une en `'ego'` (`chart.js:288`), y la práctica de decisión no es igual en las dos.
- **Impacto**: bajo.
- **Esfuerzo**: S, con dos claves de contenido.
- **Propuesta**: devolver `ego-manifested` o `ego-projected` según el canal que define el Corazón.
- **Confianza**: alta.

(Excluí 10-57/7-31, ya aceptados en BACKLOG.)

## 4. Huecos funcionales

| Función | Valor para un usuario medio | Esfuerzo | Veredicto |
|---|---|---|---|
| Detalle de la definición (qué centros forman cada grupo y qué puertas puente cerrarían la partición) | Alto: se explica solo y se calcula con datos que ya existen | S | Hacer |
| Indicador de incertidumbre (HD-1/HD-3) | Alto | S-M | Hacer (prioridad) |
| Textos de las 384 líneas | Alto, pero hay riesgo de *copyright* (los textos de Ra son propietarios; el I Ching es de dominio público) | L | Aplazar (redacción propia por fases) |
| Circuitos y grupos de canales | Medio | M | Aplazar |
| Tránsitos y puerta del día | Alto (recurrencia) | M | Hacer (ya es la Fase 9) |
| Carta de conexión/compuesta | Alto (parejas) | M | Hacer (ya es la Fase 8) |
| Variables/flechas, color-tono-base | Bajo para un usuario medio; exige una hora casi exacta (la base es ≈19") | S de cálculo, L de contenido | Aplazar |
| PHS/entorno/motivación | Bajo; es material avanzado y propietario | L | Descartar por ahora |
| Retornos (Saturno, Urano, Quirón) | Medio | M | Aplazar |
| Quirón como activación | Bajo | S | Descartar |

## 5. Lo que no he podido revisar
- La paridad exacta con MyBodyGraph/Jovian (no tenía acceso a la red). Me apoyé en Meeus y en los tests existentes.
- Los datos de zona reales de cada navegador (Safari/Chrome/Android) y del Worker.
- Las 192 interpretaciones de cruces, las 64 esencias y el informe completo: solo los muestreé.
- La geometría del bodygraph y su coherencia visual con los datos.
- La precisión de la efeméride para Plutón y los planetas exteriores, que no contrasté con una fuente externa.
