// English UI chrome — Phase M. Mirrors the shape of ui/es.js (the reference
// catalog). English is the default locale, so this is also the fallback for any
// key missing from another language.

export default {
  seo: {
    title: 'Human Design Chart — Calculate Your Chart Free, No Signup',
    description:
      'Calculate your Human Design chart free and without signing up: type, strategy, authority, profile, centers and channels, with an interactive bodygraph.'
  },

  lang: {
    menu: 'Language'
  },

  install: {
    aria: 'Install as App',
    iosTitle: 'Install as App',
    iosMessage: 'Open your browser’s share menu and choose "Add to Home Screen".',
    link: 'install as app'
  },

  home: {
    tagline: 'Calculate your Human Design chart — free, no signup.'
  },

  form: {
    name: 'Name',
    birthDate: 'Date of Birth',
    birthPlace: 'Place of Birth',
    birthTime: 'Local Time of Birth',
    approxHint: 'Pick an approximate time to calculate the chart:',
    estimatedHour: 'Estimated Time',
    calcTypesBusy: 'Calculating the day’s types…',
    selectCity: 'Select a city',
    unknownTime: 'Unknown Time',
    errInvalidDate: 'Check the date of birth: it is not a valid date.',
    errNoCity: 'Select a city from the suggestions.',
    calculating: 'Calculating…',
    calculate: 'Calculate Chart',
    clearForm: 'Clear Form'
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
    group: 'Date of Birth',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    phDay: 'dd',
    phMonth: 'mm',
    phYear: 'yyyy'
  },

  saved: {
    heading: 'Saved Charts',
    empty: 'No saved charts yet.',
    rename: 'Rename',
    delete: 'Delete',
    localNote: 'Charts are saved on this device.',
    export: 'Export Charts',
    import: 'Import Charts'
  },

  dialog: {
    ok: 'OK',
    cancel: 'Cancel',
    rename: { title: 'Rename Chart', placeholder: 'Chart name', confirm: 'Save' },
    delete: {
      title: 'Delete Chart',
      message: 'Delete the chart "{name}"? This cannot be undone.',
      confirm: 'Delete'
    },
    importImported: '{n} chart(s) imported.',
    importDuplicates: '{n} skipped (already saved).',
    importInvalid: '{n} discarded (incomplete data).',
    importBadFormat: 'The file is not in the expected format.'
  },

  footer: {
    privacy: 'privacy'
  },

  chart: {
    seoTitle: 'Your chart · Human Design Chart',
    seoDesc:
      'Your Human Design chart: interactive bodygraph with type, strategy, authority, profile, centers and channels.',
    untitled: 'Your Chart',
    noName: 'Untitled',
    noBirthData: 'No birth data. Go back to the home page and fill in the form.',
    calculating: 'Calculating…',
    errorPrefix: 'Error: {msg}',
    backToForm: 'Back to the Form',
    errImageGen: 'Could not generate the image.',
    errImageTimeout: 'The image took too long to generate. Please try again.',
    errSave: 'Could not save: {msg}',
    errShare: 'Could not share the link: {msg}',
    errDownload: 'Could not download the image: {msg}',
    errPdf: 'Could not generate the PDF: {msg}',
    back: 'Back',
    report: 'Report',
    reportAria: 'Initial Report',
    save: 'Save Chart',
    saveShort: 'Save',
    saved: 'Saved ✓',
    savedAria: 'Chart Saved',
    dlgSaveTitle: 'Save Chart',
    dlgSavePlaceholder: 'Chart name',
    dlgSaveConfirm: 'Save',
    shareSheetTitle: 'Human Design Chart',
    shareFallbackTitle: 'Chart Link',
    shareLink: 'Share Link',
    shareLinkAria: 'Share Chart Link',
    shareCopied: 'Link copied ✓',
    generatingImage: 'Generating image…',
    downloadImage: 'Download Image',
    hBodygraph: 'Bodygraph',
    hCenters: 'Centers',
    hCross: 'Cross',
    hChannels: 'Channels',
    hGates: 'Gates',
    hHangingGates: 'Hanging Gates',
    hangingTip: '{a} gates in undefined centers\n{b} gates in defined centers',
    hActivations: 'Activations',
    definedCenters: 'Defined Centers',
    completeChannels: 'Complete Channels',
    noneM: 'None',
    noneF: 'None',
    showMore: 'Show More',
    showLess: 'Show Less',
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
    whatCenters: 'What the centers are',
    whatChannels: 'What channels are',
    whatGates: 'What gates are',
    whatActivations: 'What activations are',
    whatPersonality: 'What Personality is',
    whatDesign: 'What Design is',
    whatWeight: 'What weight is',
    whatSignals: 'What the signals are',
    showDefinition: 'Show the definition on the bodygraph',
    hideDefinition: 'Hide the definition on the bodygraph',
    whatCross: 'What the incarnation cross is',
    moreStrategy: 'More about this strategy',
    moreAuthority: 'More about this authority',
    moreProfile: 'More about this profile',
    moreDefinition: 'More about this definition',
    moreSignals: 'More about these signals',
    tipSignalAligned: 'Alignment signal',
    tipSignalMisaligned: 'Misalignment signal',
    moreCross: 'More about this incarnation cross',
    // Split around the info-dot glyph, which is rendered as the icon itself.
    infoHintA: 'Tap any element of the chart, then tap ',
    infoHintB: ' for more information'
  },

  storage: {
    link: 'learn more',
    title: 'How Charts Are Stored',
    p1: 'Saved charts live on this device, inside the browser’s storage. There are no accounts and no cloud: nobody else can see them.',
    p2: 'To keep a manual copy, or to move your charts to another browser or device, use the export and import buttons next to this note.',
    p3a: 'Some browsers clear that storage from time to time — Safari on iPhone and iPad, for example, deletes data from sites that haven’t been visited for a few days. So that this doesn’t take your charts with it, the app keeps a backup in a ',
    p3b: 'first-party technical cookie',
    p3c: ' (no tracking, no third parties) and restores them by itself if the browser deletes them. The backup only travels, encrypted, when it is created or restored, and the server does not store it.',
    p4a: 'What does delete them for good: ',
    p4b: 'clearing the cookies or the site data',
    p4c: ' in your browser (the charts and their backup both disappear).'
  },

  bug: {
    // Deliberately NOT a literal rendering of ui/es.js: the Spanish is chatty
    // and first-person, and translated word-for-word it came out stiff. Same
    // voice, English phrasing. Sentence case in the title (author, jul 2026):
    // it is a sentence, not a label.
    link: 'report a bug',
    introBug: 'The more detail the better — the clearer it is, the likelier I can reproduce it and fix it. (Your device and browser come attached automatically, so don\u2019t bother typing them.)',
    introIdea: 'Tell me what you have in mind, in as much detail as you like. The clearer it is, the likelier I can actually build it. (Your device and browser come attached automatically, so don\u2019t bother typing them.)',
    labelBug: 'What happened?',
    phIdeaInput: 'Tell me :)',
    aria: 'Report a bug or send a suggestion',
    title: 'Report a bug or Send a suggestion',
    thanks: 'Got it \u2014 thank you!',
    thanksNote: 'I\u2019ll look at it as soon as I can. There\u2019s no auto-reply, so don\u2019t worry if nothing comes back.',
    close: 'Close',
    what: 'What\u2019s this about?',
    kindAria: 'Report type',
    kindBug: 'Report a bug',
    kindIdea: 'Send a suggestion/message',
    phIdea: 'What\u2019s on your mind',
    phBug: 'What you were doing, what you expected, what actually happened \u2014 and how to trigger it again, if you know…',
    name: 'Name (optional)',
    email: 'Email (optional)',
    send: 'Send',
    sending: 'Sending…',
    errEmpty: 'Tell me what happened first.',
    errSend: 'That didn\u2019t send. Give it another go in a moment.',
    errNet: 'No connection, or the send failed. Try again in a moment.',
    subjectBug: 'Bug',
    subjectIdea: 'Suggestion',
    subjectPrefix: 'Human Design Chart \u00b7 reports'
  },

  about: {
    link: 'about',
    aria: 'About',
    title: 'About',
    licenseA: 'Source-available project, ',
    licenseB: 'free for non-commercial use',
    licenseC: '. (PolyForm Noncommercial 1.0.0)',
    // Not a literal rendering of the Spanish: that line's joke is a pun on
    // "sin ánimo de lucro" stretched to "sin ánimo de nada", which dies in
    // translation. This keeps the shrug, not the words.
    madeA: 'App made by Javi G.O., with a little help from AI. Non-profit — and non-anything-else, really: I built it because I felt like it, like the textbook ',
    madeType: 'Manifestor',
    madeB: ' I am :)',
    wish: 'I hope it serves you well, and may you live happily with your design, dear human!',
    disclaimer: 'An independent project with no affiliation to any organization. Any trademarks belong to their respective owners. All content presented is informational and does not replace professional advice.',
    coffee: 'Buy Me a Coffee',
    loveBase: 'Send Me Love!',
    loveMore: 'Send Me <strong>MORE</strong> Love!',
    thanks: [
      'Thank you! \u2764\ufe0f',
      'I receive it! \ud83d\udc9b',
      'What a treat! \ud83d\udc96',
      'So much affection!! \ud83d\udc97\ud83d\udc97',
      'Olé, olé, olé!! \u2764\ufe0f\ud83d\udc9b\ud83d\udc9c',
      'I’m going to burst!!! \ud83d\udca5\ud83d\udc96\ud83d\udca5'
    ],
    loveOne: 'love received',
    loveMany: 'loves received',
    senderOne: 'dear human',
    senderMany: 'dear humans',
    fromWord: ' from '
  },

  drawerUi: {
    back: 'Back',
    close: 'Close'
  },
  ai: {
    heading: 'Learn More Using AI',
    angleChart: 'About This Chart',
    angleGeneral: 'General Info',
    angleHint: 'This selection determines the prompt that is used.',
    switchAi: 'Change AI',
    openAi: 'Open AI',
    copyPrompt: 'Copy Prompt',
    copied: 'Copied',
    showPrompt: 'View/Edit the Prompt',
    hidePrompt: 'Hide Prompt',
    otherNote: 'For other AIs, use "Copy prompt" and paste it wherever you like.'
  },

  reportUi: {
    eyebrow: 'Your Personalized Initial Report',
    title: 'Get to Know Your Design',
    shareAria: 'Share a Link to the Report',
    pdfAria: 'Download the Report as PDF',
    pdfBusy: 'Generating PDF…',
    toc: {
      intro: 'What Human Design Is',
      experiment: 'A Life Experiment',
      chart: 'Bodygraph',
      type: 'Your Type',
      centers: 'Your Centers',
      strategy: 'Your Strategy',
      authority: 'Your Authority',
      profile: 'Your Profile',
      definition: 'Your Definition',
      practice: 'Living Your Design'
    },
    sectionsAria: 'Report Sections',
    tagDefined: 'Defined',
    tagOpen: 'Undefined',
    learnMore: 'Learn More',
    closingNote:
      'This report is a first impression. To go deeper into whatever interests you most, take your chart to your AI: the prompt already carries your essential data; complete it with whatever you want to explore.',
    pdfDefined: 'DEFINED',
    pdfOpen: 'UNDEFINED',
    showPrompt: 'View/Edit the Prompt',
    hidePrompt: 'Hide Prompt'
  },

  privacy: {
    seoTitle: 'Privacy · Human Design Chart',
    seoDesc:
      'How the Human Design Chart app handles your data: your chart is calculated on your device, with no accounts, no analytics and no data selling.',
    back: '← back',
    home: 'home',
    title: 'Privacy',
    lead: 'This app is built to run on your device. Your chart is calculated in your own browser, and your birth details are stored only on your machine. Below we explain, in plain language, what happens to your data.',
    h1: 'What Stays on Your Device',
    p1: 'The details you enter (name, date, time and place of birth) and the charts you save are stored **locally in your browser** (using `sessionStorage` and `IndexedDB`). They are not sent to any server to calculate the chart: all of the astronomical calculation happens on your own device.',
    p2: 'So that an automatic browser clean-up does not delete your saved charts (some browsers, such as Safari on iPhone and iPad, clear the storage of sites that have not been visited for a few days), the app also keeps a backup of those charts in a **first-party technical cookie**. That cookie also lives in your browser, contains only the data of your saved charts, and is not used to identify or track you.',
    p3: 'You can delete it all whenever you like: remove each saved chart from within the app, or clear this site’s data (including cookies) in your browser settings. Doing so removes everything, backup included.',
    h2: 'What Leaves Your Device (and When)',
    l1: '**City search.** When you type your place of birth, the text you type is sent to [Photon](https://photon.komoot.io/) (a komoot service built on OpenStreetMap) to offer you suggestions. Only that text is sent; it is not accompanied by your date or time of birth.',
    l2: '**Bug report form.** If you choose to use it, whatever you write (and, optionally, your name and email) is sent together with technical details about your browser, via the [Web3Forms](https://web3forms.com/) service, so that we can read your message. This only happens if you submit it.',
    l3: '**Taking your chart to an AI.** If you use the option to explore your chart with an AI, the app opens the AI service you choose with a text of your chart already prepared. From that point on, your data is governed by that service’s privacy policy, not by this one.',
    l4: '**Backup of your charts.** When the backup described above is created or restored, your saved charts travel encrypted to our server, which returns them converted into the cookie and **does not store them**: there is no database and no record of your charts on the server. Outside those two moments, the cookie holding your charts is not sent as you browse the app.',
    h3: 'Hosting',
    p4: 'The app is served through **Cloudflare**. Like any web server, its network may temporarily log technical connection data (such as the IP address) for security and operational purposes. We do not use those logs to identify or track you.',
    h4: 'What We Don’t Do',
    p5: 'We use no tracking cookies, no analytics and no advertising — the app’s only cookie is the technical backup described above. There are no user accounts. We do not sell or share your data with third parties.',
    h5: 'Your Rights',
    p6: 'Because your chart data lives on your device, you are in direct control: you can view, change or delete it at any time from within the app. Under the EU General Data Protection Regulation (GDPR) and Spanish data protection law, you have the right to access, rectify and erase your personal data, to object to and restrict its processing, and to data portability. To exercise those rights, or for any privacy question, write to us using the **“report a bug”** button below.',
    controller: 'Data controller: Javi G.O., the author of the app.',
    updated: 'Last updated: 7 July 2026.'
  },

  category: {
    bodygraph: 'Bodygraph',
    centers: 'Centers',
    channels: 'Channels',
    gates: 'Gates',
    type: 'Type',
    strategy: 'Strategy',
    authority: 'Authority',
    profile: 'Profile',
    definition: 'Definition',
    center: 'Center',
    channel: 'Channel',
    gate: 'Gate',
    activationCol: 'Activations',
    planet: 'Planet',
    signal: 'Alignment/misalignment signals',
    signals: 'Signals',
    cross: 'Incarnation Cross'
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
