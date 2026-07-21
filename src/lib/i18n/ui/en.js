// English UI chrome — Phase M. Mirrors the shape of ui/es.js (the reference
// catalog). English is the default locale, so this is also the fallback for any
// key missing from another language.

export default {
  seo: {
    title: 'Human Design Chart — calculate your chart free, no signup',
    description:
      'Calculate your Human Design chart free and without signing up: type, strategy, authority, profile, centres and channels, with an interactive bodygraph.'
  },

  lang: {
    menu: 'Language'
  },

  install: {
    aria: 'Install as app',
    iosTitle: 'Install as app',
    iosMessage: 'Open your browser’s share menu and choose "Add to Home Screen".',
    link: 'install as app'
  },

  home: {
    tagline: 'Calculate your Human Design chart — free, no signup.'
  },

  form: {
    name: 'Name',
    birthDate: 'Date of birth',
    birthPlace: 'Place of birth',
    birthTime: 'Local time of birth',
    approxHint: 'Pick an approximate time to calculate the chart:',
    estimatedHour: 'Estimated time',
    calcTypesBusy: 'Calculating the day’s types…',
    selectCity: 'Select a city',
    unknownTime: 'Unknown time',
    errInvalidDate: 'Check the date of birth: it is not a valid date.',
    errNoCity: 'Select a city from the suggestions.',
    calculating: 'Calculating…',
    calculate: 'Calculate chart',
    clearForm: 'Clear form'
  },

  city: {
    placeholder: 'Madrid, Bogotá, Berlin, New York…',
    clear: 'Clear place',
    confirmed: 'Place confirmed',
    searching: 'Searching…',
    searchError: 'Could not search. Check your connection and try again.',
    noResults: 'No results',
    suggestions: 'City suggestions'
  },

  date: {
    group: 'Date of birth',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    phDay: 'dd',
    phMonth: 'mm',
    phYear: 'yyyy'
  },

  saved: {
    heading: 'Saved charts',
    empty: 'No saved charts yet.',
    rename: 'Rename',
    delete: 'Delete',
    localNote: 'Charts are saved on this device.',
    export: 'Export charts',
    import: 'Import charts'
  },

  dialog: {
    ok: 'OK',
    cancel: 'Cancel',
    rename: { title: 'Rename chart', placeholder: 'Chart name', confirm: 'Save' },
    delete: {
      title: 'Delete chart',
      message: 'Delete the chart "{name}"? This cannot be undone.',
      confirm: 'Delete'
    },
    importImported: '{n} chart(s) imported.',
    importDuplicates: '{n} skipped (already saved).',
    importInvalid: '{n} discarded (incomplete data).'
  },

  footer: {
    privacy: 'privacy'
  },

  chart: {
    seoTitle: 'Your chart · Human Design Chart',
    seoDesc:
      'Your Human Design chart: interactive bodygraph with type, strategy, authority, profile, centres and channels.',
    untitled: 'Your chart',
    noName: 'Untitled',
    noBirthData: 'No birth data. Go back to the home page and fill in the form.',
    calculating: 'Calculating…',
    errorPrefix: 'Error: {msg}',
    backToForm: 'Back to the form',
    errImageGen: 'Could not generate the image.',
    errSave: 'Could not save: {msg}',
    errShare: 'Could not share the link: {msg}',
    back: 'Back',
    report: 'Report',
    reportAria: 'Initial report',
    save: 'Save chart',
    saveShort: 'Save',
    saved: 'Saved ✓',
    savedAria: 'Chart saved',
    dlgSaveTitle: 'Save chart',
    dlgSavePlaceholder: 'Chart name',
    dlgSaveConfirm: 'Save',
    shareSheetTitle: 'Human Design chart',
    shareFallbackTitle: 'Chart link',
    shareLink: 'Share link',
    shareLinkAria: 'Share chart link',
    shareCopied: 'Link copied ✓',
    generatingImage: 'Generating image…',
    downloadImage: 'Download image',
    hBodygraph: 'Bodygraph',
    hCenters: 'Centres',
    hChannels: 'Channels',
    hGates: 'Gates',
    hHangingGates: 'Hanging gates',
    hangingTip: '{a} gates in undefined centres\n{b} gates in defined centres',
    hActivations: 'Activations',
    definedCenters: 'Defined centres',
    completeChannels: 'Complete channels',
    noneM: 'None',
    noneF: 'None',
    showMore: 'Show more',
    showLess: 'Show less',
    colPersonality: 'Personality',
    colDesign: 'Design',
    colWeight: 'Weight',
    tipPersonality: 'Set at the moment of birth',
    tipDesign: 'Set 88° of solar arc before\nbirth (~88 days)',
    tipWeight: 'Relative influence of the activation\n(Sun and Earth weigh more)',
    whatBodygraph: 'What the bodygraph is',
    whatType: 'What type is',
    whatStrategy: 'What strategy is',
    whatAuthority: 'What authority is',
    whatProfile: 'What profile is',
    whatDefinition: 'What definition is',
    whatCenters: 'What the centres are',
    whatChannels: 'What channels are',
    whatGates: 'What gates are',
    whatActivations: 'What activations are',
    whatPersonality: 'What Personality is',
    whatDesign: 'What Design is',
    whatWeight: 'What weight is',
    moreStrategy: 'More about this strategy',
    moreAuthority: 'More about this authority',
    moreProfile: 'More about this profile',
    moreDefinition: 'More about this definition'
  },

  category: {
    type: 'Type',
    strategy: 'Strategy',
    authority: 'Authority',
    profile: 'Profile',
    definition: 'Definition',
    center: 'Centre',
    channel: 'Channel',
    gate: 'Gate',
    activationCol: 'Activations',
    planet: 'Planet'
  },

  types: {
    abbr: {
      generator: 'G',
      'manifesting-generator': 'MG',
      projector: 'P',
      manifestor: 'M',
      reflector: 'R'
    }
  }
};
