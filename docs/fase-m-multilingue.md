# Fase M — Multiidioma

Cómo está montado el multiidioma de la app y **qué hay que tocar para añadir un
idioma nuevo** (respuesta corta: sus dos ficheros de textos y una línea en una
constante; nada más).

Estado: **turnos 1 (estructura) y 2 (traducción) cerrados**. La app funciona en
inglés y español; queda solo el cuerpo legal de `/privacy` (ver §5).

---

## 1. La idea en una frase

El idioma vive en la **URL** (`/en/…`, `/es/…`). Todo lo demás —el menú de
idiomas, el matcher de rutas, los `hreflang`, el sitemap, las páginas que se
prerenderizan, el fallback offline— se **deriva de una única lista de idiomas**.

---

## 2. Piezas

| Fichero | Papel |
|---|---|
| `src/lib/i18n/locales.js` | **Fuente única de la verdad**: la lista `LOCALES`. Datos planos (sin runes) para que también lo pueda importar el Worker. |
| `src/lib/i18n/index.svelte.js` | Motor: locale activo (`$state`), `getLocale()`, `setLocale()`, y `t(clave, params, locale?)`. |
| `src/lib/i18n/ui/<código>.js` | **Textos de chrome** de la app (botones, etiquetas, errores, diálogos, aria). `es.js` es el catálogo de referencia. |
| `src/lib/hd/content/<código>.js` | **Contenido de Diseño Humano** (conceptos, 64 puertas, canales, informe, prompts, etiquetas de display). |
| `src/params/locale.js` | Matcher de ruta: solo enrutan idiomas que existen. |
| `src/routes/[lang=locale]/…` | Todas las páginas cuelgan del segmento de idioma. |
| `src/hooks.server.js` | Worker: negocia `/`, redirige enlaces antiguos, OG por carta e idioma, `<html lang>`. |
| `src/lib/components/LangSwitch.svelte` | El tag "EN/ES" arriba a la derecha y su menú. |

### Rutas

- **No hay contenido en la raíz.** `/` no tiene página: el Worker la **negocia**
  (cookie `hdl` → `Accept-Language` → idioma por defecto) y redirige a `/<lang>`.
- Páginas prerenderizadas: `/en`, `/es`, `/en/privacy`, `/es/privacy`.
- `/<lang>/chart` es SPA pura (se calcula en cliente), como siempre.
- **Enlaces antiguos** (previos a la Fase M) siguen funcionando: `/chart?…` →
  `/es/chart?…` (todos los compartidos eran españoles) y `/privacy` → negociado.

### Dos vocabularios de contenido (no confundirlos)

En `content/<lang>.js` conviven dos juegos de etiquetas y **no** son
intercambiables:

- `promptLabels` → redactadas para **incrustarse en frases de prompt**:
  minúsculas y con artículos (`"responder"`, `"el Sol"`).
- `labels` → **etiquetas de display** para la UI (tarjetas, chips, columnas):
  mayúscula inicial y sin artículos (`"Responder"`, `"Sol"`).

La página de carta usa `getDisplayLabels()`. Usar `getPromptLabels()` ahí
rompe la presentación (se detectó y corrigió durante la Fase M).

---

## 3. ⚠️ La regla de oro del SSR

El locale activo es un `$state` **de módulo**, es decir **compartido**. En
cliente es correcto (hay un solo usuario), pero **el prerender construye las
páginas en paralelo**, así que ese estado puede "sangrar" de una página a otra.

Por eso:

- En **páginas prerenderizadas** (home, privacy) el idioma se toma del
  **parámetro de ruta** (`$page.params.lang`) y se pasa explícito:
  `const tr = (k, p) => t(k, p, lang)`. Nunca `t()` a secas.
- En **páginas y componentes de cliente** (chart, modales, diálogos) `t()` sin
  locale explícito es correcto y suficiente.

Si algún día una página nueva se prerenderiza, **debe** usar el patrón `tr`.

---

## 4. Añadir un idioma nuevo (p. ej. francés)

Idealmente son **3 ficheros y una línea**:

1. **Registrar el idioma** en `src/lib/i18n/locales.js`:
   ```js
   { code: 'fr', label: 'Français', htmlLang: 'fr', ogLocale: 'fr_FR' }
   ```
   `label` va **en su propio idioma** (endónimo), nunca traducido.

2. **Crear `src/lib/i18n/ui/fr.js`** copiando `ui/es.js` (el catálogo de
   referencia, siempre completo) y traduciendo. Registrarlo en el objeto
   `CATALOGS` de `index.svelte.js` (dos líneas: el import y la entrada).

3. **Crear `src/lib/hd/content/fr.js`** con el mismo patrón que `en.js`:
   un *deep merge* de traducciones sobre la base española, para que **cualquier
   clave sin traducir siga mostrando algo**. Registrarlo en `LANGS` en
   `content/index.js` (dos líneas).

Y ya. **No hay que tocar** rutas, matcher, menú de idiomas, `hreflang` de la
home, entradas de prerender ni el fallback offline del service worker: todo eso
se deriva de `LOCALES`.

Lo único **manual** que queda fuera de esa derivación:

- `static/sitemap.xml` (es un fichero estático: añadir las 2 URLs del idioma).
- `static/manifest.webmanifest` (una PWA instalada tiene un solo nombre; hoy
  está en inglés — decisión consciente, no se genera por idioma).

### Detalles con trampa al traducir

- **Acrónimos de tipo**: siguen el orden de palabras del idioma. Español `GM`
  (Generador Manifestante), inglés `MG`. Están en `ui/<lang>.js` → `types.abbr`.
- **Formato de fecha**: `DateField` es día-primero salvo **en-US**, que pasa a
  mes-primero (se decide con `navigator.language`, no con el idioma de la app:
  Reino Unido, Australia y Canadá siguen en día-primero).
- **Voz**: el informe inicial habla en 2ª persona; todo lo demás es impersonal
  ("esta carta", nunca "tu carta"). Los títulos van en *sentence case*.
- **I Ching (⚠️ legal)**: los nombres de hexagrama en inglés **no** pueden
  reutilizar la traducción Wilhelm/Baynes (tiene copyright). Usar redacción
  propia o la de Legge (1882, dominio público) — igual que se hizo en español.

---

## 5. Turno 2 — traducción (cerrado)

Hecho:

- **Andamios movidos del código al pack.** Todo el texto conectivo que estaba
  incrustado en `prompts.js`, `report.js` y `content/index.js` vive ahora en el
  pack como plantillas (`promptTemplates`, `drawer`, `reportShell`) con
  marcadores `{…}`, porque es texto **atado a la gramática** (artículos, género,
  orden de palabras). Ya no queda español en el código de `lib/hd/`.
- **Contenido traducido al inglés**: conceptos, 5 tipos, 5 estrategias, 7
  autoridades, 6 líneas de perfil, 5 definiciones, 9 centros, 13 planetas, 36
  canales, 64 puertas, 64 nombres de hexagrama, el informe inicial completo y el
  bloque práctico por tipo. **875 hojas de texto, 96 % traducidas**; el 4 %
  restante son palabras idénticas en ambos idiomas (Reflector, Ajna, Sacral,
  Venus…) y valores neutros (`tier`).
- **Chrome de los componentes de prosa**: `ElementInfo`, `InitialReport` (índice
  incluido), `About`, `ReportBug`, `StorageInfo` y la portada del PDF.
- **Test de paridad** (`src/lib/i18n/catalog.test.js`): vigila que los catálogos
  de chrome tengan las mismas claves en todos los idiomas, que los packs de
  contenido resuelvan todas, que el inglés no sea un *fallback* masivo, y la
  negociación de la raíz.

### Pendiente (única pieza)

- **El cuerpo de `routes/[lang=locale]/privacy/+page.svelte`** sigue en español.
  Se dejó a propósito: es texto **legal** (RGPD, normativa española y europea) y
  merece una redacción revisada por el autor, no una traducción automática. El
  resto de la página (enlaces, canonical, hreflang) ya es por idioma.

### Nota de estilo heredada

El título de autoridad del informe usa `promptLabels` (minúscula: "Your
authority: emotional (Solar plexus)"), igual que en español ("Tu autoridad:
emocional (Plexo solar)"). Es coherente con el original; si algún día se quiere
en mayúscula, hay que cambiarlo **en los dos idiomas** a la vez.
