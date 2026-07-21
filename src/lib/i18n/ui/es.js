// Spanish UI chrome — Phase M.
//
// App "furniture" only (buttons, labels, field names, errors, dialog copy,
// tooltips, aria labels, section headings). The Human Design *content*
// (concepts, gates, channels, report, prompts, type names) lives in
// lib/hd/content, not here. Keys are dot-pathed and read via t('a.b.c'), with
// `{param}` interpolation.
//
// This is the reference catalog: it is always complete. ui/en.js mirrors its
// shape. A missing key falls back to English, then to the key itself.

export default {
  seo: {
    title: 'Human Design Chart — calcula tu carta gratis, sin registro',
    description:
      'Calcula tu carta de Human Design gratis y sin registro: tipo, estrategia, autoridad, perfil, centros y canales, con un bodygraph interactivo.'
  },

  lang: {
    menu: 'Idioma'
  },

  install: {
    aria: 'Instalar como app',
    iosTitle: 'Instalar como app',
    iosMessage:
      'Abre el menú de compartir del navegador y elige "Añadir a pantalla de inicio".',
    link: 'instalar como app'
  },

  home: {
    tagline: 'Calcula tu carta de Diseño Humano — gratis y sin registro.'
  },

  form: {
    name: 'Nombre',
    birthDate: 'Fecha de nacimiento',
    birthPlace: 'Lugar de nacimiento',
    birthTime: 'Hora local de nacimiento',
    approxHint: 'Elige una hora aproximada para calcular la carta:',
    estimatedHour: 'Hora estimada',
    calcTypesBusy: 'Calculando los tipos del día…',
    selectCity: 'Selecciona una ciudad',
    unknownTime: 'Hora desconocida',
    errInvalidDate: 'Revisa la fecha de nacimiento: no es una fecha válida.',
    errNoCity: 'Selecciona una ciudad de la lista de sugerencias.',
    calculating: 'Calculando…',
    calculate: 'Calcular carta',
    clearForm: 'Borrar formulario'
  },

  city: {
    placeholder: 'Madrid, Bogotá, Berlín, Nuevayol…',
    clear: 'Borrar lugar',
    confirmed: 'Lugar confirmado',
    searching: 'Buscando…',
    searchError: 'No se pudo buscar. Revisa tu conexión e inténtalo de nuevo.',
    noResults: 'Sin resultados',
    suggestions: 'Sugerencias de ciudad'
  },

  date: {
    group: 'Fecha de nacimiento',
    day: 'Día',
    month: 'Mes',
    year: 'Año',
    phDay: 'dd',
    phMonth: 'mm',
    phYear: 'aaaa'
  },

  saved: {
    heading: 'Cartas guardadas',
    empty: 'No hay cartas guardadas todavía.',
    rename: 'Renombrar',
    delete: 'Borrar',
    localNote: 'Las cartas se guardan en este dispositivo.',
    export: 'Exportar cartas',
    import: 'Importar cartas'
  },

  dialog: {
    ok: 'Aceptar',
    cancel: 'Cancelar',
    rename: { title: 'Renombrar carta', placeholder: 'Nombre de la carta', confirm: 'Guardar' },
    delete: {
      title: 'Borrar carta',
      message: '¿Borrar la carta "{name}"? Esta acción no se puede deshacer.',
      confirm: 'Borrar'
    },
    // Import result: parts joined with a space. "(s)" keeps it plural-agnostic.
    importImported: '{n} carta(s) importada(s).',
    importDuplicates: '{n} omitida(s) por estar ya guardada(s).',
    importInvalid: '{n} descartada(s) por datos incompletos.'
  },

  footer: {
    privacy: 'privacidad'
  },

  chart: {
    seoTitle: 'Tu carta · Human Design Chart',
    seoDesc:
      'Tu carta de Human Design: bodygraph interactivo con tipo, estrategia, autoridad, perfil, centros y canales.',
    untitled: 'Tu carta',
    noName: 'Sin nombre',
    noBirthData: 'No hay datos de nacimiento. Vuelve a la página inicial y rellena el formulario.',
    calculating: 'Calculando…',
    errorPrefix: 'Error: {msg}',
    backToForm: 'Volver al formulario',
    errImageGen: 'No se pudo generar la imagen.',
    errSave: 'No se pudo guardar: {msg}',
    errShare: 'No se pudo compartir el enlace: {msg}',
    // Header / actions
    back: 'Volver',
    report: 'Informe',
    reportAria: 'Informe inicial',
    save: 'Guardar carta',
    saveShort: 'Guardar',
    saved: 'Guardada ✓',
    savedAria: 'Carta guardada',
    dlgSaveTitle: 'Guardar carta',
    dlgSavePlaceholder: 'Nombre de la carta',
    dlgSaveConfirm: 'Guardar',
    shareSheetTitle: 'Carta de Human Design',
    shareFallbackTitle: 'Enlace de la carta',
    shareLink: 'Compartir enlace',
    shareLinkAria: 'Compartir enlace de la carta',
    shareCopied: 'Enlace copiado ✓',
    generatingImage: 'Generando imagen…',
    downloadImage: 'Descargar imagen',
    // Section headings
    hBodygraph: 'Bodygraph',
    hCenters: 'Centros',
    hChannels: 'Canales',
    hGates: 'Puertas',
    hHangingGates: 'Puertas colgantes',
    hangingTip: '{a} puertas en centros indefinidos\n{b} puertas en centros definidos',
    hActivations: 'Activaciones',
    definedCenters: 'Centros definidos',
    completeChannels: 'Canales completos',
    noneM: 'Ninguno',
    noneF: 'Ninguna',
    showMore: 'Mostrar más',
    showLess: 'Mostrar menos',
    // Activation columns + tooltips
    colPersonality: 'Personalidad',
    colDesign: 'Diseño',
    colWeight: 'Peso',
    tipPersonality: 'Se define en el momento del nacimiento',
    tipDesign: 'Se define 88° de arco solar antes\ndel nacimiento (~88 días)',
    tipWeight: 'Influencia relativa de la activación\n(el Sol y la Tierra pesan más)',
    // Info-dot concept labels ("what X is")
    whatBodygraph: 'Qué es el bodygraph',
    whatType: 'Qué es el tipo',
    whatStrategy: 'Qué es la estrategia',
    whatAuthority: 'Qué es la autoridad',
    whatProfile: 'Qué es el perfil',
    whatDefinition: 'Qué es la definición',
    whatCenters: 'Qué son los centros',
    whatChannels: 'Qué son los canales',
    whatGates: 'Qué son las puertas',
    whatActivations: 'Qué son las activaciones',
    whatPersonality: 'Qué es Personalidad',
    whatDesign: 'Qué es Diseño',
    whatWeight: 'Qué es el peso',
    // Info-dot value labels ("more about this X")
    moreStrategy: 'Más información sobre esta estrategia',
    moreAuthority: 'Más información sobre esta autoridad',
    moreProfile: 'Más información sobre este perfil',
    moreDefinition: 'Más información sobre esta definición'
  },

  // Small category label above an element drawer's title.
  category: {
    type: 'Tipo',
    strategy: 'Estrategia',
    authority: 'Autoridad',
    profile: 'Perfil',
    definition: 'Definición',
    center: 'Centro',
    channel: 'Canal',
    gate: 'Puerta',
    activationCol: 'Activaciones',
    planet: 'Planeta'
  },

  // Short type acronyms for the birth-time band. Language-dependent word order:
  // Spanish "GM" (Generador Manifestante), English "MG". Full type names come
  // from the content pack (promptLabels.type), translated in Phase M turn 2.
  types: {
    abbr: {
      generator: 'G',
      'manifesting-generator': 'GM',
      projector: 'P',
      manifestor: 'M',
      reflector: 'R'
    }
  }
};
