// Spanish content for HD elements — Phase 6.A.
//
// Own wording only: mechanical facts of the system plus public-domain
// roots, never copied from Jovian Archive. One module per language so the
// app is multi-language ready (see ./index.js).
//
// Pilot scope: the Types. Only Generator is written (validated tone, mockup
// v3); the rest land in Phase 6.B. The info "i" shows up only where content
// exists, so unwritten elements simply have no panel yet.

export default {
  // Explanatory panel content, keyed by element kind → element key.
  type: {
    generator: {
      title: 'Generator',
      paragraphs: [
        'Tipo mayoritario: alrededor del 37 % de la población. Su rasgo definitorio es el centro Sacral definido, la fuente de energía vital del sistema, generativa y de carácter renovable.',
        'Opera por respuesta: reacciona a lo que la vida le presenta en lugar de iniciar desde la mente. Comprometer su energía con lo correcto produce satisfacción; forzarla donde no corresponde, frustración.',
        'En la práctica, el Sacral responde antes que la mente: ante algo concreto —una propuesta, una pregunta, una situación— surge una reacción visceral de atracción o rechazo. Seguir esa señal del cuerpo, en vez de razonar la decisión, es lo que mantiene su energía bien empleada.'
      ]
    }
  },

  // Natural-language labels used to build AI prompts. Kept separate from the
  // chart page's UI labels until i18n is unified (then both read from here).
  promptLabels: {
    type: {
      generator: 'Generador',
      'manifesting-generator': 'Generador Manifestante',
      projector: 'Proyector',
      manifestor: 'Manifestador',
      reflector: 'Reflector'
    },
    authority: {
      emotional: 'emocional (Plexo Solar)',
      sacral: 'Sacral',
      splenic: 'esplénica (Bazo)',
      ego: 'del Ego (Corazón)',
      'self-projected': 'autoproyectada (G–Garganta)',
      mental: 'mental',
      lunar: 'lunar'
    },
    strategy: {
      respond: 'responder',
      'respond-then-inform': 'responder y luego informar',
      'inform-before-acting': 'informar antes de actuar',
      'wait-for-invitation': 'esperar la invitación',
      'wait-lunar-cycle': 'esperar un ciclo lunar'
    }
  }
};
