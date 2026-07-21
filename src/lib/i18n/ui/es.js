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
    tagline: 'Calcula tu carta de Diseño Humano — gratis, sin registro.'
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
    importInvalid: '{n} descartada(s) por datos incompletos.',
    importBadFormat: 'El archivo no tiene el formato esperado.'
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
    errDownload: 'No se pudo descargar la imagen: {msg}',
    errPdf: 'No se pudo generar el PDF: {msg}',
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
    moreDefinition: 'Más información sobre esta definición',
    infoHint: 'Toca cualquier elemento de la carta para obtener más información (i)'
  },

  storage: {
    link: 'saber más',
    title: 'Cómo se guardan las cartas',
    p1: 'Las cartas guardadas viven en este dispositivo, dentro del almacenamiento del navegador. No hay cuentas ni nube: nadie más puede verlas.',
    p2: 'Para tener una copia manual, o para llevar las cartas a otro navegador o dispositivo, usa los botones de exportar e importar junto a esta nota.',
    p3a: 'Algunos navegadores limpian ese almacenamiento de vez en cuando — Safari en iPhone y iPad, por ejemplo, borra los datos de las webs que llevan unos días sin visitarse. Para que eso no se lleve las cartas, la app guarda una copia de seguridad en una ',
    p3b: 'cookie técnica propia',
    p3c: ' (sin rastreo ni terceros) y las restaura sola si el navegador las borra. La copia solo viaja, cifrada, al crearse o restaurarse, y el servidor no la almacena.',
    p4a: 'Lo que sí las borra del todo: ',
    p4b: 'limpiar las cookies o los datos de este sitio',
    p4c: ' en el navegador (desaparecen las cartas y su copia).'
  },

  bug: {
    link: 'notificar fallo',
    introBug: 'Describe el problema con tanto detalle como puedas. Cuanto más claro lo expliques, más probabilidad de que lo pueda entender y arreglar. (Los datos de tu dispositivo y navegador se incluyen solos, no hace falta que los escribas.)',
    introIdea: 'Describe la sugerencia con tanto detalle como puedas. Cuanto más claro lo expliques, más probabilidad de que lo pueda entender e implementar. (Los datos de tu dispositivo y navegador se incluyen solos, no hace falta que los escribas.)',
    labelBug: '¿Qué ha pasado?',
    phIdeaInput: 'Cuéntame :)',
    aria: 'Notificar un fallo o sugerencia',
    title: 'Notificar un fallo o enviar una sugerencia',
    thanks: '¡Gracias! Lo he recibido.',
    thanksNote: 'Le echaré un vistazo en cuanto pueda. No hay respuesta automática, así que no te preocupes si no recibes nada de vuelta.',
    close: 'Cerrar',
    what: '¿De qué se trata?',
    kindAria: 'Tipo de reporte',
    kindBug: 'Notificar un fallo/bug',
    kindIdea: 'Enviar una sugerencia/mensaje',
    phIdea: 'Escribe tu sugerencia',
    phBug: 'Qué hacías, qué esperabas, qué pasó, y cómo repetirlo si sabes cómo…',
    name: 'Nombre (opcional)',
    email: 'Email (opcional)',
    send: 'Enviar',
    sending: 'Enviando…',
    errEmpty: 'Cuéntame qué ha pasado antes de enviar.',
    errSend: 'No se pudo enviar. Inténtalo de nuevo en un momento.',
    errNet: 'Sin conexión o el envío falló. Inténtalo de nuevo en un momento.',
    subjectBug: 'Fallo',
    subjectIdea: 'Sugerencia',
    subjectPrefix: 'Human Design Chart · reportes'
  },

  about: {
    link: 'acerca de',
    aria: 'Acerca de',
    title: 'Acerca de',
    licenseA: 'Proyecto source-available, ',
    licenseB: 'gratis para uso no comercial',
    licenseC: '. (PolyForm Noncommercial 1.0.0)',
    madeA: 'App creada por Javi G.O. con asistencia de IA, sin ánimo de lucro y sin ánimo de nada, la creé porque me dio la gana, como buen ',
    madeType: 'Manifestador',
    madeB: ' que soy :)',
    wish: 'Ojalá que te sea útil, ¡y que vivas feliz con tu diseño, querido humano!',
    disclaimer: 'Proyecto independiente sin afiliación a ninguna organización. Cualquier marca es propiedad de sus respectivos titulares. Todo el contenido presentado es de carácter divulgativo y no sustituye al asesoramiento profesional.',
    coffee: 'Invítame a un café',
    loveBase: '¡Mándame amor!',
    loveMore: '¡Mándame <strong>MÁS</strong> amor!',
    thanks: [
      '¡Gracias! \u2764\ufe0f',
      '¡Lo recibo! \ud83d\udc9b',
      '¡Qué gusto! \ud83d\udc96',
      '¡¡Cuánto cariño!! \ud83d\udc97\ud83d\udc97',
      '¡¡Olé, olé, olé!! \u2764\ufe0f\ud83d\udc9b\ud83d\udc9c',
      '¡¡¡Voy a explotar!!! \ud83d\udca5\ud83d\udc96\ud83d\udca5'
    ],
    loveOne: 'amor recibido',
    loveMany: 'amores recibidos',
    senderOne: 'querido humano',
    senderMany: 'queridos humanos',
    fromWord: ' de '
  },

  // Element drawer chrome + the AI hand-off block at its foot.
  drawerUi: {
    back: 'Atrás',
    close: 'Cerrar'
  },
  ai: {
    heading: 'Saber más usando IA',
    angleChart: 'Sobre esta carta',
    angleGeneral: 'Info general',
    angleHint: 'Esta selección determina el prompt que se usa.',
    switchAi: 'Cambiar IA',
    openAi: 'Abrir IA',
    copyPrompt: 'Copiar prompt',
    copied: 'Copiado',
    showPrompt: 'Ver/editar el prompt',
    hidePrompt: 'Ocultar prompt',
    otherNote: 'Para otras IA, usa "Copiar prompt" y pégalo donde quieras.'
  },

  // Initial-report overlay + PDF chrome (the report's own text is content).
  reportUi: {
    eyebrow: 'Tu informe inicial personalizado',
    title: 'Conoce tu diseño',
    shareAria: 'Compartir enlace al informe',
    pdfAria: 'Descargar el informe en PDF',
    pdfBusy: 'Generando PDF…',
    toc: {
      intro: 'Qué es el Diseño Humano',
      experiment: 'Un experimento vital',
      chart: 'Bodygraph',
      type: 'Tu tipo',
      centers: 'Tus centros',
      strategy: 'Tu estrategia',
      authority: 'Tu autoridad',
      profile: 'Tu perfil',
      definition: 'Tu definición',
      practice: 'Vivir tu diseño'
    },
    sectionsAria: 'Secciones del informe',
    tagDefined: 'definido',
    tagOpen: 'indefinido',
    learnMore: 'Saber más',
    closingNote:
      'Este informe es una primera impresión. Para profundizar en lo que más te interese, lleva tu carta a tu IA: el prompt ya lleva tus datos esenciales; complétalo con lo que quieras explorar.',
    pdfDefined: 'DEFINIDO',
    pdfOpen: 'INDEFINIDO',
    showPrompt: 'Ver/editar el prompt',
    hidePrompt: 'Ocultar prompt'
  },

  // Small category label above an element drawer's title.
  privacy: {
    seoTitle: 'Privacidad · Human Design Chart',
    seoDesc:
      'Cómo trata tus datos la app de Human Design Chart: la carta se calcula en tu dispositivo, sin cuentas, sin analítica y sin venta de datos.',
    back: '← volver',
    home: 'inicio',
    title: 'Privacidad',
    lead: 'Esta app está pensada para funcionar en tu dispositivo. Tu carta se calcula en tu propio navegador y tus datos de nacimiento se guardan solo en tu equipo. Aquí te explicamos, en lenguaje llano, qué ocurre con tus datos.',
    h1: 'Lo que se queda en tu dispositivo',
    p1: 'Los datos que introduces (nombre, fecha, hora y lugar de nacimiento) y las cartas que guardas se almacenan **localmente en tu navegador** (mediante `sessionStorage` e `IndexedDB`). No se envían a ningún servidor para calcular la carta: todo el cálculo astronómico ocurre en tu propio dispositivo.',
    p2: 'Para que una limpieza automática del navegador no borre tus cartas guardadas (algunos navegadores, como Safari en iPhone o iPad, vacían el almacenamiento de las webs que llevan días sin visitarse), la app guarda además una copia de seguridad de esas cartas en una **cookie técnica propia**. Esa cookie vive también en tu navegador, contiene únicamente los datos de tus cartas guardadas y no se usa para identificarte ni para seguirte.',
    p3: 'Puedes borrarlos cuando quieras: elimina cada carta guardada desde la propia app, o borra los datos del sitio (incluidas las cookies) en los ajustes de tu navegador. Al hacerlo desaparecen por completo, copia de seguridad incluida.',
    h2: 'Lo que sale de tu dispositivo (y cuándo)',
    l1: '**Buscador de ciudad.** Cuando escribes el lugar de nacimiento, el texto que tecleas se envía a [Photon](https://photon.komoot.io/) (un servicio de komoot sobre OpenStreetMap) para ofrecerte sugerencias. Solo viaja ese texto; no se acompaña de tu fecha ni tu hora.',
    l2: '**Formulario para reportar fallos.** Si decides usarlo, se envía lo que escribas (y, opcionalmente, tu nombre y email) junto con datos técnicos de tu navegador, a través del servicio [Web3Forms](https://web3forms.com/), para que podamos leer tu mensaje. Esto solo ocurre si tú lo envías.',
    l3: '**Llevar tu carta a una IA.** Si usas la opción de consultar tu carta con una IA, la app abre el servicio de IA que elijas con un texto de tu carta ya preparado. A partir de ahí tus datos se rigen por la política de privacidad de ese servicio, no por esta.',
    l4: '**Copia de seguridad de tus cartas.** Al crearse o restaurarse la copia descrita arriba, tus cartas guardadas viajan cifradas hasta nuestro servidor, que las devuelve convertidas en la cookie y **no las almacena**: no hay ninguna base de datos ni registro de tus cartas en el servidor. Fuera de esos dos momentos, la cookie con tus cartas no se envía al navegar por la app.',
    h3: 'Alojamiento',
    p4: 'La app se sirve a través de **Cloudflare**. Como cualquier servidor web, su red puede registrar de forma temporal datos técnicos de la conexión (como la dirección IP) por seguridad y funcionamiento. No usamos esos registros para identificarte ni para seguirte.',
    h4: 'Lo que no hacemos',
    p5: 'No usamos cookies de seguimiento, ni analítica, ni publicidad — la única cookie de la app es la copia de seguridad técnica descrita arriba. No hay cuentas de usuario. No vendemos ni cedemos tus datos a terceros.',
    h5: 'Tus derechos',
    p6: 'Como los datos de tu carta viven en tu dispositivo, tienes el control directo: puedes consultarlos, modificarlos o borrarlos en cualquier momento desde la app. Conforme al Reglamento General de Protección de Datos (RGPD) y a la normativa española y europea, tienes derecho de acceso, rectificación, supresión, oposición y portabilidad sobre cualquier dato personal. Para ejercerlos, o para cualquier duda sobre privacidad, escríbenos con el botón **«notificar un fallo»** de aquí abajo.',
    controller: 'Responsable: Javi G.O., autor de la app.',
    updated: 'Última actualización: 7 de julio de 2026.'
  },

  category: {
    bodygraph: 'Bodygraph',
    centers: 'Centros',
    channels: 'Canales',
    gates: 'Puertas',
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
