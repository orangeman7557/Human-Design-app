// Prompt builder — Phase 6.A (pilot) + 6.B (core kinds).
//
// Turns an element + the user's chart into ready-made prompts the user takes
// to their own AI. The app never calls an AI; it only composes the text. Each
// element offers two angles:
//   - general: the concept in the abstract (always available).
//   - chart:   the element read alongside the rest of the chart.
//
// Prompts are impersonal ("Para un Generador con autoridad…") on purpose: the
// chart on screen may belong to someone else (saved charts), so we never
// phrase them in the first person.
//
// `chart` is null when the angle doesn't apply (most concept prompts: the
// concept is abstract, so there's nothing chart-specific to ask — the
// exception is the centres concept, which reads the chart's defined/undefined
// mix).

import { getPromptLabels, getIchingName, DEFAULT_LANG } from './content/index.js';
import { CENTER_BY_GATE } from './constants.js';

const NO_ASSUME = 'No asumas conocimiento previo del sistema.';

/** Impersonal descriptor of the chart, e.g. "un Generador con autoridad Sacral y perfil 3/5". */
function who(L, chart) {
  const type = L.type[chart.type] ?? chart.type;
  const authority = L.authority[chart.authority] ?? chart.authority;
  return `un ${type} con autoridad ${authority} y perfil ${chart.profile}`;
}

/**
 * @param {string} kind   'concept' | 'type' | 'strategy' | 'authority' | 'profile' | 'definition' | 'center'
 * @param {string} key    element key (for 'concept', the category name; for 'profile', the "3/5" string)
 * @param {any} chart      computed chart (type, authority, strategy, profile, definedCenters…)
 * @param {string} [lang]
 * @returns {{ general: string, chart: string | null }}
 */
export function buildPrompts(kind, key, chart, lang = DEFAULT_LANG) {
  const L = getPromptLabels(lang);

  if (kind === 'concept') {
    return conceptPrompts(L, key, chart);
  }

  if (kind === 'type') {
    const type = L.type[key] ?? key;
    const isOwn = key === chart.type;
    const strategy = isOwn ? L.strategy[chart.strategy] ?? chart.strategy : null;
    const authority = L.authority[chart.authority] ?? chart.authority;
    return {
      general:
        `Explícame de forma sencilla y práctica qué es el tipo ${type} en ` +
        `Diseño Humano: cómo funciona su energía, su estrategia` +
        (strategy ? ` (${strategy})` : '') +
        ` y qué señales indican que va por buen camino. ${NO_ASSUME}`,
      // The "Sobre esta carta" angle only makes sense for the chart's own
      // type; for the other type chips there's nothing chart-specific to read.
      chart: isOwn
        ? `Para un ${type} con autoridad ${authority} y perfil ${chart.profile}, ` +
          `explícame cómo se combinan estos rasgos y cómo se viven en el día a ` +
          `día. ${NO_ASSUME}`
        : null
    };
  }

  if (kind === 'strategy') {
    const s = L.strategy[key] ?? key;
    return {
      general:
        `Explícame de forma sencilla y práctica en qué consiste la estrategia ` +
        `de «${s}» en Diseño Humano: cómo se aplica en el día a día y qué ` +
        `señales indican que se está siguiendo bien. ${NO_ASSUME}`,
      chart:
        `Para ${who(L, chart)}, cuya estrategia es «${s}», explícame cómo ` +
        `llevarla a la práctica en las decisiones cotidianas. ${NO_ASSUME}`
    };
  }

  if (kind === 'authority') {
    const a = L.authority[key] ?? key;
    return {
      general:
        `Explícame de forma sencilla y práctica qué es la autoridad ${a} en ` +
        `Diseño Humano y cómo se usa para tomar decisiones fiables. ${NO_ASSUME}`,
      chart:
        `Para ${who(L, chart)}, explícame cómo tomar decisiones usando su ` +
        `autoridad ${a} en el día a día. ${NO_ASSUME}`
    };
  }

  if (kind === 'profile') {
    // key is the "3/5" string.
    const [a, b] = String(key).split('/');
    return {
      general:
        `Explícame de forma sencilla y práctica qué significa el perfil ${key} ` +
        `en Diseño Humano (líneas ${a} y ${b}): cómo se manifiesta y qué tener ` +
        `en cuenta. ${NO_ASSUME}`,
      chart:
        `Para ${who(L, chart)}, explícame cómo se combina su perfil ${key} con ` +
        `su tipo y su autoridad en el día a día. ${NO_ASSUME}`
    };
  }

  if (kind === 'definition') {
    const d = L.definition[key] ?? key;
    return {
      general:
        `Explícame de forma sencilla y práctica qué es una ${d} en Diseño ` +
        `Humano y qué implica para la energía y las relaciones de una ` +
        `persona. ${NO_ASSUME}`,
      chart:
        `Para ${who(L, chart)} con ${d}, explícame qué significa en la ` +
        `práctica para cómo conecta su energía y qué entornos o compañías le ` +
        `complementan. ${NO_ASSUME}`
    };
  }

  if (kind === 'center') {
    const c = L.center[key] ?? key;
    const defined = chart.definedCenters?.includes(key);
    return {
      general:
        `Explícame de forma sencilla y práctica qué es el centro «${c}» en ` +
        `Diseño Humano: qué función tiene y qué diferencia hay entre tenerlo ` +
        `definido o indefinido. ${NO_ASSUME}`,
      chart:
        `En esta carta, el centro «${c}» está ${defined ? 'definido' : 'indefinido (abierto)'}. ` +
        `Explícame de forma práctica qué implica eso para la gestión de la ` +
        `energía y la toma de decisiones. ${NO_ASSUME}`
    };
  }

  if (kind === 'gate') {
    const g = Number(key);
    const center = L.center[CENTER_BY_GATE[g]] ?? '';
    const name = getIchingName(g, lang);
    const root = name ? `, cuya raíz es el hexagrama ${g} «${name}» del I Ching` : '';
    // The "Sobre esta carta" angle only applies when the gate is actually
    // active — gates reached through the full index may not be.
    const active = chart?.activeGates?.includes(g);
    return {
      general:
        `Explícame de forma sencilla y práctica qué significa la puerta ${g} en ` +
        `Diseño Humano${center ? ` (en el centro ${center})` : ''}${root}: qué tema ` +
        `o energía representa y cómo se manifiesta. ${NO_ASSUME}`,
      chart: active
        ? `En esta carta, la puerta ${g} está activa. Para ${who(L, chart)}, ` +
          `explícame qué aporta esta puerta y cómo se vive en el día a día. ${NO_ASSUME}`
        : null
    };
  }

  if (kind === 'channel') {
    const [a, b] = String(key).split('-').map(Number);
    const ca = L.center[CENTER_BY_GATE[a]] ?? '';
    const cb = L.center[CENTER_BY_GATE[b]] ?? '';
    // Likewise: only offer the chart angle when this channel is complete in
    // the chart (reachable-but-inactive channels come via the full index).
    const active = chart?.activeChannels?.some(
      ([x, y]) => (x === a && y === b) || (x === b && y === a)
    );
    return {
      general:
        `Explícame de forma sencilla y práctica qué significa el canal ${a}-${b} en ` +
        `Diseño Humano, que une los centros ${ca} y ${cb} (puertas ${a} y ${b}): qué ` +
        `energía aporta y cómo se manifiesta. ${NO_ASSUME}`,
      chart: active
        ? `En esta carta, el canal ${a}-${b} está completo y define los centros ${ca} y ` +
          `${cb}. Para ${who(L, chart)}, explícame qué aporta este canal y cómo se vive ` +
          `en el día a día. ${NO_ASSUME}`
        : null
    };
  }

  return { general: '', chart: null };
}

/** Concept-level prompts (the card "i"). Only `center` has a chart angle. */
function conceptPrompts(L, key, chart) {
  switch (key) {
    case 'type':
      return {
        general:
          `Explícame de forma sencilla y práctica qué son los tipos en Diseño ` +
          `Humano (Generador, Generador Manifestante, Proyector, Manifestador y ` +
          `Reflector), en qué se diferencian y por qué el tipo es la base de cómo ` +
          `cada persona gestiona su energía y toma decisiones. ${NO_ASSUME}`,
        chart: null
      };
    case 'strategy':
      return {
        general:
          `Explícame de forma sencilla y práctica qué es la estrategia en Diseño ` +
          `Humano, por qué cada tipo tiene la suya y cuáles son las cinco. ` +
          `${NO_ASSUME}`,
        chart: null
      };
    case 'authority':
      return {
        general:
          `Explícame de forma sencilla y práctica qué es la autoridad en Diseño ` +
          `Humano, qué papel cumple frente a la mente al tomar decisiones, y ` +
          `cuáles son las distintas autoridades. ${NO_ASSUME}`,
        chart: null
      };
    case 'profile':
      return {
        general:
          `Explícame de forma sencilla y práctica qué es el perfil en Diseño ` +
          `Humano, cómo se forma a partir de dos líneas (de la 1 a la 6) y qué ` +
          `aporta cada línea. ${NO_ASSUME}`,
        chart: null
      };
    case 'definition':
      return {
        general:
          `Explícame de forma sencilla y práctica qué es la definición en Diseño ` +
          `Humano (sin definición, única, split, triple y cuádruple split) y qué ` +
          `dice sobre cómo se conecta la energía de una persona. ${NO_ASSUME}`,
        chart: null
      };
    case 'channel':
      return {
        general:
          `Explícame de forma sencilla y práctica qué son los canales en Diseño ` +
          `Humano, cómo se forman al activarse sus dos puertas, qué significa que un ` +
          `canal esté completo y cómo definen los centros. ${NO_ASSUME}`,
        chart: null
      };
    case 'gate':
      return {
        general:
          `Explícame de forma sencilla y práctica qué son las puertas en Diseño ` +
          `Humano, su relación con los 64 hexagramas del I Ching, y la diferencia ` +
          `entre una puerta que completa un canal y una puerta «colgante». ${NO_ASSUME}`,
        chart: null
      };
    case 'center': {
      const defined = (chart?.definedCenters ?? [])
        .map((c) => L.center[c] ?? c)
        .join(', ');
      return {
        general:
          `Explícame de forma sencilla y práctica qué son los nueve centros en ` +
          `Diseño Humano y la diferencia entre un centro definido y uno ` +
          `indefinido (abierto). ${NO_ASSUME}`,
        chart:
          `En esta carta están definidos estos centros: ${defined || 'ninguno'}; ` +
          `el resto están abiertos. Explícame de forma práctica qué implica esta ` +
          `combinación de centros definidos e indefinidos para la gestión de la ` +
          `energía y la toma de decisiones. ${NO_ASSUME}`
      };
    }
    default:
      return { general: '', chart: null };
  }
}
