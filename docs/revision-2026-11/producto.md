# Revisión de producto y estrategia

## 1. Nota: 7/10
Producto sorprendentemente completo y bien razonado para un proyecto personal: cálculo validado, bilingüe, privado por diseño, instalable, con licencia y política de privacidad cuidadas. Lo que falta no es funcionalidad sino el "cierre": decidir qué NO se hará (fases 8-10), aceptar que Play Store cuesta más que 25 USD en tiempo, y reducir el coste de proceso para que el proyecto sobreviva sin el autor.

## 2. Fortalezas
- Arquitectura sin backend de datos: no hay base de datos de usuarios, el RGPD queda casi vacío de obligaciones (privacy en.js:375-386; BACKLOG:1895).
- Coste recurrente casi nulo: Cloudflare Workers + KV gratis; solo el dominio (wrangler.jsonc:1-30).
- Postura IP ya pensada: texto propio, I Ching de dominio público, handoff a la IA del usuario en vez de alojar texto (BACKLOG:1195-1215).
- Aviso de no afiliación ya existe (en.js:297, es.js:308).
- Tests de cálculo y de paridad de catálogos; las cruces se validan contra la efeméride.
- Barra de seguridad/privacidad revisada (auditoría 2026-08-10, cabeceras, noindex).

## 3. Hallazgos

**PRO-1 — Play Store: el cuello de botella es el requisito de testers, no los 25 USD.** Verificado hoy: cuentas personales creadas tras 13-nov-2023 necesitan cerrar prueba con ≥12 testers opt-in continuos 14 días y luego solicitar acceso a producción (revisión ~7 días; puede exigir más pruebas si hay poco "engagement"). Con ~7 amigos no llega. Impacto alto; esfuerzo L (reclutar 5+ personas más y mantener actividad, 3-4 semanas de calendario); propuesta: no empezar Fase P hasta tener 12 testers reales (familia, comunidad HD, Reddit) o descartarla; confianza alta (fuente oficial, §5).

**PRO-2 — Datos públicos del desarrollador en Play.** Cuenta personal exige nombre legal y dirección verificados; Google muestra al menos nombre legal y país, correo (las páginas de ayuda son inconsistentes). Para una app de nicho esotérico, el autor deja de ser "orangeman7557". Impacto medio; esfuerzo S; propuesta: decidir conscientemente antes de pagar; confianza media.

**PRO-3 — Fase P bloqueada técnicamente y obligación continua.** Falta `assetlinks.json` y `screenshots` en el manifest (TASKS:78). Además Play exige target API 36 desde 31-ago-2026 en actualizaciones; el TWA hay que reconstruir y resubir cada vez que suba el nivel (anual). Es mantenimiento recurrente que contradice "sin mantenimiento activo". Impacto medio; esfuerzo M inicial + S/año; confianza media-alta.

**PRO-4 — "Terminado sin autor" no está definido.** Qué se rompe a 6 meses: dominio (renovación anual, único coste, sin aviso si caduca la tarjeta); `tz-lookup` sin mantenimiento (estable, datos de zonas envejecen); Photon público puede cambiar límites o desaparecer (la ciudad deja de autocompletar; la app no funciona sin ciudad); Web3Forms; deprecaciones de Workers (compatibility_date 2025-05-15) y de dependencias (`legacy-peer-deps`, BACKLOG ~1830). Impacto alto; esfuerzo S-M; propuesta: ver barra de "terminado" abajo; confianza alta.

**PRO-5 — Fallback de geocodificación inexistente.** Es el único punto crítico externo. Propuesta mínima: permitir introducir coordenadas/zona manualmente o un segundo proveedor; evitaría el "app rota" si Photon cae. Impacto alto, esfuerzo M, confianza media.

**PRO-6 — Riesgo IP bien tratado pero con huecos de procedimiento.** Ver §6. Lo no documentado: procedencia de los 192 nombres de cruces ("material publicado" sin fuente concreta, TASKS/CLAUDE §6) y la política de qué hacer ante una reclamación. Impacto medio; esfuerzo S (nota en repo + plan de retirada); confianza media.

**PRO-7 — Privacidad: la política omite datos que sí viajan.** El enlace compartido lleva nombre y datos de nacimiento en la query (BACKLOG:1895, "no mencionado en /privacy", aceptado 2026-07-22) pero la política dice "no compartimos datos". Viaja por Referer (mitigado), logs de Cloudflare, previews de mensajería e historial. Hay una cookie (bóveda), tratada. Impacto medio; esfuerzo S; propuesta: una frase en `privacy` ("el enlace compartido contiene los datos de nacimiento; quien lo recibe y los servicios por los que pase pueden verlos"). Para un particular, RGPD: no hay base de datos que proteger, pero la mención al compartir es lo que exige transparencia; confianza alta.

**PRO-8 — Data Safety de Play sería honesta pero delicada.** Datos de nacimiento son "personal info" tratada en el dispositivo; Photon recibe texto; Web3Forms recibe correo opcional. Declarable sin problema; confianza media (no verifiqué el formulario actual).

**PRO-9 — Retención casi nula por diseño, y está bien.** Los guardados (IndexedDB + cookie + backup por correo) ya dan motivo para volver a consultar. Mecanismos baratos que encajan: enlace "añadir a pantalla de inicio", recordatorio del backup. Los que no encajan: notificaciones push, cuentas, correo recurrente (coste, RGPD, mantenimiento). Fase 9 (tránsitos) es el único "motivo para volver" real pero cuesta mantenimiento y pantallas. Impacto bajo; confianza media.

**PRO-10 — Proceso de trabajo con más documentación que producto.** CLAUDE.md manda leer TASKS (1.200 líneas) y BACKLOG (2.000) en cada sesión, regla "toca más de dos archivos → confirma", worktrees + staging. Es sostenible para un autor que trabaja con IA a diario; **no** para "desaparezco seis meses". Propuesta: congelar TASKS/BACKLOG como archivo histórico (`docs/archivo/`), crear un `MANTENIMIENTO.md` de 1 página (qué renovar, dónde, cómo desplegar, qué se rompe primero) y dejar CLAUDE.md en ~150 líneas. Impacto medio; esfuerzo S; confianza alta.

**PRO-11 — Coste del bilingüe asumido.** Dos catálogos escritos "desde el significado" (CLAUDE §4) y test de paridad: mantenimiento bajo mientras no cambien textos. Un tercer idioma duplica la revisión humana; propuesta: congelar en dos. Impacto bajo.

## 4. Hoja de ruta
| Fase | Valor usuario | Valor autor | Esfuerzo | Mantenimiento | Veredicto |
|---|---|---|---|---|---|
| Estabilización / "cierre" (PRO-4, 5, 7, 10) | Alto (que siga funcionando) | Alto | S-M | Baja | **Hacer ya** |
| P — Play Store | Medio (descubribilidad, ya hay PWA) | Bajo-medio | L (testers) + anual | Media (API anual, datos públicos) | **Después / condicionada a 12 testers; si no, descartar** |
| 8 — Carta compuesta | Medio-alto (el uso social típico de HD) | Medio | M-L | Baja (lógica local) | **Recortar a versión mínima** (dos cartas guardadas, canales electromagnéticos/compañía) si se quiere una sola función más |
| 9 — Tránsitos | Medio (motivo de retorno) | Bajo | M | Baja (cálculo local) | **Después/opcional** |
| 10 — Guardado en línea | Medio | Negativo | L | **Alta** (cuentas, RGPD, coste) | **Descartar**: el backup por correo/cookie ya cubre; contradice "sin presupuesto y sin cuentas" |
| 11 — Distribución | Alto si hay interés | Medio | S-M por nivel | Baja | **Niveles 0-1 baratos (Search Console, páginas estáticas por puerta); resto solo si le motiva** |

Barra concreta de "terminado": (1) sin coste salvo dominio con renovación automática y tarjeta vigente; (2) cero dependencias de servicios sin alternativa (geocoder con fallback); (3) build reproducible y desplegable en <10 min desde el README; (4) documento de mantenimiento de 1 página; (5) textos legales y de no afiliación completos; (6) alerta mínima de caída (monitor gratuito). Distancia: aproximadamente 3-5 días de trabajo repartidos, sin funciones nuevas.

## 5. Recomendación sobre Google Play
Requisitos verificados hoy (13-nov-2026):
- Cuenta personal tras 13-nov-2023: ≥12 testers opt-in, 14 días continuos, luego "Apply for production"; revisión normalmente ≤7 días ([Play Console Help](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)).
- Target API: desde 31-ago-2026, nuevas apps y actualizaciones deben apuntar a Android 16 (API 36) ([Play Console Help](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en-EN)).
- Verificación: nombre legal y dirección verificados; Google muestra al menos nombre legal y país y correo de contacto ([ayuda](https://support.google.com/googleplay/android-developer/answer/10841920?hl=en)); páginas inconsistentes en el detalle.
- Políticas: Google admite TWA para PWAs; el riesgo es "funcionalidad mínima"/envoltorio sin valor (fuentes de terceros, no texto oficial). La app tiene valor propio (offline, cálculo, guardados), riesgo bajo-medio. Riesgo adicional: contenido "astrología/esoterismo" no está prohibido, pero hay que evitar afirmaciones médicas (el disclaimer ya existe) y marcas en nombre/ficha ("Human Design Chart" es descriptivo; evitar "Rave", "BodyGraph™" en el título).
- Data Safety y clasificación de contenido: formularios; no los verifiqué.

Veredicto: **no merece la pena ahora.** La PWA ya es instalable (iOS y Android), el único beneficio es descubribilidad en Play, que para una app de nicho sin marketing será mínima; el coste real es el reclutamiento de 12 testers, datos personales públicos y reconstrucciones anuales por API. Reconsiderar solo si aparecen ≥12 usuarios dispuestos y se quiere visibilidad; mientras, publicar la PWA y poner el botón de instalar.

## 6. Semáforo de riesgo legal (no soy abogado)
- **Nombre "Human Design Chart" / dominio hdchart.app:** BAJO. Uso nominativo/descriptivo; no encontré registro de "Human Design" solo como marca (sí Jovian lo reivindica en compuestos; no verificado en USPTO). Mitiga: aviso de no afiliación; no mitiga una reclamación de plataforma (Play/Apple son sensibles a marcas).
- **"Rave BodyGraph™"/"Rave Mandala™":** MEDIO-BAJO. Jovian declara registro en su web; el repo ya lo anota (BACKLOG:1204). Mitiga: no usar "Rave BodyGraph" como nombre ni en la ficha; la app dice "bodygraph" (término genérico en la comunidad). Sugerencia: CLAUDE.md:197 llama "estilo Rave clásico"; en textos públicos mejor "bodygraph".
- **Estilo visual del bodygraph:** BAJO (hechos/sistema no protegibles; dibujo propio SVG; la expresión concreta puede tener derechos, pero la geometría funcional es difícil de proteger).
- **192 nombres de cruces:** MEDIO-BAJO. Nombres cortos y de uso comunitario; hechos, pero sin fuente documentada. Mitiga: texto interpretativo propio; documentar procedencia; plan de retirada.
- **Textos propios (64 puertas, informe):** BAJO si de verdad son originales; prudente revisar muestra de coincidencias con material de Jovian.
- **Propinas + licencia no comercial:** BAJO-MEDIO. Aceptar propinas voluntarias sin contraprestación suele considerarse no comercial, pero la ambigüedad existe; mitiga: no condicionar funciones a propina; no anuncios. El copyright es del autor, la licencia obliga a terceros, no a él.
- **Exposición por tienda:** MEDIO. Play multiplica visibilidad y la superficie de reclamaciones de marca/DMCA; otro argumento contra Fase P.
- **RGPD:** BAJO (ver PRO-7).

## 7. No verificado
- Registros exactos de marca en USPTO/EUIPO (solo declaraciones de Jovian vía búsqueda).
- Texto oficial de las políticas de Play sobre webview/TWA, Data Safety y datos públicos exactos del perfil personal.
- Si una segunda app o una cuenta con una app ya publicada tiene exención del requisito de testers (fuentes contradictorias).
- Estado actual de límites de Photon y fiabilidad de Web3Forms.
- Origen concreto de los 192 nombres de cruces (el repo solo dice "material publicado").
- No leí TASKS.md ni BACKLOG.md enteros; la hoja de ruta se construyó de BACKLOG:1805-1860, CLAUDE.md §6 y la auditoría de TASKS:70-78.
