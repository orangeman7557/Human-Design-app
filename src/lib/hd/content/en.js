// English Human Design content — Phase M.
//
// Built as a DEEP MERGE of English overrides on top of the Spanish base (es.js),
// so every key always resolves: English where translated, Spanish where not yet.
// Adding English content is purely filling `overrides` below — no code changes.
//
// Own wording only (mechanical facts + public-domain roots), never copied from
// Jovian Archive — same rule as es.js. NOTE: the I Ching hexagram names
// (`iching`) must NOT reuse the Wilhelm/Baynes English (still under copyright);
// use own phrasing or the public-domain Legge (1882).
//
// British spelling ("center", "recognize") to match the app's English SEO copy.

import es from './es.js';

/** Recursively merge `over` onto a deep clone of `base` (arrays replaced whole). */
function deepMerge(base, over) {
  if (Array.isArray(base) || Array.isArray(over)) return over ?? base;
  if (base && over && typeof base === 'object' && typeof over === 'object') {
    const out = { ...base };
    for (const k of Object.keys(over)) out[k] = deepMerge(base[k], over[k]);
    return out;
  }
  return over === undefined ? base : over;
}

const overrides = {
  // ── Display labels (UI: cards, chips, table columns) ────────────────────
  labels: {
    type: {
      generator: 'Generator',
      'manifesting-generator': 'Manifesting Generator',
      projector: 'Projector',
      manifestor: 'Manifestor',
      reflector: 'Reflector'
    },
    strategy: {
      'inform-before-acting': 'Inform Before Acting',
      respond: 'Respond',
      'respond-then-inform': 'Respond, Then Inform',
      'wait-for-invitation': 'Wait for the Invitation',
      'wait-lunar-cycle': 'Wait a Lunar Cycle'
    },
    authority: {
      emotional: 'Emotional (Solar Plexus)',
      sacral: 'Sacral',
      splenic: 'Splenic (Spleen)',
      ego: 'Ego (Heart)',
      'self-projected': 'Self-Projected (G–Throat)',
      mental: 'Mental/Environmental',
      lunar: 'Lunar'
    },
    definition: {
      'no-definition': 'No Definition',
      single: 'Single Definition',
      split: 'Split Definition',
      'triple-split': 'Triple Split Definition',
      'quad-split': 'Quadruple Split Definition'
    },
    center: {
      head: 'Head',
      ajna: 'Ajna',
      throat: 'Throat',
      g: 'G',
      heart: 'Heart',
      sacral: 'Sacral',
      spleen: 'Spleen',
      solarPlexus: 'Solar Plexus',
      root: 'Root'
    },
    planet: {
      sun: 'Sun',
      earth: 'Earth',
      moon: 'Moon',
      northNode: 'North Node',
      southNode: 'South Node',
      mercury: 'Mercury',
      venus: 'Venus',
      mars: 'Mars',
      jupiter: 'Jupiter',
      saturn: 'Saturn',
      uranus: 'Uranus',
      neptune: 'Neptune',
      pluto: 'Pluto'
    },
    typeShort: {
      generator: 'Generator',
      'manifesting-generator': 'MG',
      projector: 'Projector',
      manifestor: 'Manifestor',
      reflector: 'Reflector'
    },
    signal: {
      aligned: 'Alignment',
      misaligned: 'Misalignment'
    },
    cross: {
      right: 'Right Angle Cross',
      left: 'Left Angle Cross',
      juxtaposition: 'Juxtaposition Cross'
    }
  },

  // ── Prompt vocabulary (lower-case, with articles — for prompt sentences) ──
  promptLabels: {
    type: {
      generator: 'Generator',
      'manifesting-generator': 'Manifesting Generator',
      projector: 'Projector',
      manifestor: 'Manifestor',
      reflector: 'Reflector'
    },
    authority: {
      emotional: 'emotional (Solar Plexus)',
      sacral: 'sacral',
      splenic: 'splenic (Spleen)',
      ego: 'ego (Heart)',
      'self-projected': 'self-projected (G–Throat)',
      mental: 'mental/environmental',
      lunar: 'lunar'
    },
    strategy: {
      respond: 'respond',
      'respond-then-inform': 'respond, then inform',
      'inform-before-acting': 'inform before acting',
      'wait-for-invitation': 'wait for the invitation',
      'wait-lunar-cycle': 'wait a lunar cycle'
    },
    definition: {
      'no-definition': 'no definition',
      single: 'single definition',
      split: 'split definition',
      'triple-split': 'triple split definition',
      'quad-split': 'quadruple split definition'
    },
    center: {
      head: 'Head',
      ajna: 'Ajna',
      throat: 'Throat',
      g: 'G',
      heart: 'Heart (Ego)',
      sacral: 'Sacral',
      spleen: 'Spleen',
      solarPlexus: 'Solar Plexus',
      root: 'Root'
    },
    planet: {
      sun: 'the Sun',
      earth: 'the Earth',
      moon: 'the Moon',
      northNode: 'the North Node',
      southNode: 'the South Node',
      mercury: 'Mercury',
      venus: 'Venus',
      mars: 'Mars',
      jupiter: 'Jupiter',
      saturn: 'Saturn',
      uranus: 'Uranus',
      neptune: 'Neptune',
      pluto: 'Pluto'
    },
    // Lower-case: the prompt template reads "the {name} formed by…".
    cross: {
      right: 'right angle cross',
      left: 'left angle cross',
      juxtaposition: 'juxtaposition cross'
    }
  },

  // ── Prompt templates (grammar-bound connective text) ─────────────────────
  promptTemplates: {
    frame: 'In the framework of Human Design',
    ask: '{frame}, can you explain {subject} in detail?',
    askChart: '{frame}, for {who}, can you explain {subject} in detail?',
    // Appended to chart-angle prompts (and the report handoff): the shareable
    // link on its own — an AI that fetches it gets the full profile as JSON.
    chartLink: '\n\n{url}',
    who: 'a {type} with a {profile} profile, {authority} authority, {definition}, and these defined centers: {centers}',
    none: 'none',
    side: { personality: 'Personality', design: 'Design' },
    activation: '{planet} in {side} (line {line})',
    activationJoin: ' and ',
    gate: {
      subject: 'gate {g}',
      by: ' is activated by {acts} and',
      complete: ', which in this chart{by} forms part of a complete channel',
      hanging: ', which in this chart{by} is hanging (missing the other half of its channel)',
      inactive: ', which is not active in this chart'
    },
    channel: {
      subject: 'channel {a}-{b}',
      complete: ', which in this chart is complete (it defines both of its centers)',
      half: ', of which only one of its two gates is active in this chart (a half channel)',
      none: ', which is not active in this chart'
    },
    subject: {
      type: 'the {name} type',
      strategy: 'the "{name}" strategy',
      authority: '{name} authority',
      profileLine: 'line {n} of the profile',
      profile: 'the {n} profile',
      definition: '{name}',
      noDefinition: 'what it means to have no definition (a chart with no definition)',
      center: 'the "{name}" center',
      planet: 'what {name} represents',
      signal:
        'the two signals of the {type} type — "{aligned}" as the alignment signal (the signature) and "{misaligned}" as the misalignment signal (the not-self theme) — and how to tell them apart day to day',
      cross: 'the {name} formed by gates {gates}'
    },
    planetChart:
      '{frame}, for {who}, can you explain in detail what {name} represents and what its two activations contribute in this chart: {pg}.{pl} (conscious, Personality) and {dg}.{dl} (unconscious, Design)?',
    activationCol: {
      personality: 'the conscious side (Personality) of a chart, calculated at the moment of birth',
      design: 'the unconscious side (Design) of a chart, calculated about 88 days before birth',
      weight: 'the relative weight or influence of each planetary activation'
    },
    concept: {
      bodygraph: 'what the Human Design bodygraph is and how to read it',
      bodygraphChart: 'how to read this particular bodygraph',
      centerGeneral:
        'what the nine centers are and what difference it makes to have them defined or undefined',
      centerChart: 'what the combination of defined and undefined centers in this chart implies',
      type: 'what the types are',
      strategy: 'what strategy is',
      authority: 'what authority is',
      profile: 'what the profile is',
      definition: 'what definition is',
      channel: 'what channels are',
      gate: 'what gates are',
      activation: 'what planetary activations are',
      signal:
        'what the alignment signal and the misalignment signal of each type are (the signature and the not-self theme)',
      cross: 'what the incarnation cross is and how to read it'
    }
  },

  drawer: {
    factCenter: 'Center',
    factCenters: 'Centers',
    factChannel: 'Channel',
    factChannels: 'Channels',
    factGate: 'Gate',
    factGates: 'Gates',
    factHarmonic: 'Harmonic Gate',
    factHarmonics: 'Harmonic Gates',
    tipHarmonic: 'the gate that completes the channel',
    tipHarmonics: 'the gates that complete its channels',
    sidePersonality: 'Personality',
    sideDesign: 'Design',
    gateTitle: 'Gate {g}: {theme}',
    gateTitlePlain: 'Gate {g}',
    gateFallback: 'Gate {g}.',
    ichingNamed: 'Its root is hexagram {g} of the [I Ching](concept:iching), "{name}".',
    ichingPlain: 'It corresponds to hexagram {g} of the [I Ching](concept:iching).',
    deeper: 'For a deeper reading, you can use the "learn more using AI" option.',
    gateComplete:
      'In your chart, gate {g} is active and forms part of a complete channel: an energy you contribute steadily and in an integrated way.',
    gateHanging:
      'In your chart, gate {g} is active but hanging: its theme is present in you, and its other half is only completed occasionally — with certain people or during certain transits.',
    gateInactive:
      'In your chart, gate {g} is not active: it is an energy you recognize and receive from others and from the environment, rather than a constant of your own.',
    channelTitle: '{a}-{b}: {name}',
    channelTitlePlain: 'Channel {a}-{b}',
    channelIs: 'This is the **{name}**: {essence}',
    channelPair:
      'It brings together "{ta}" ([gate {a}](gate:{a})) and "{tb}" ([gate {b}](gate:{b})), which are best read together to grasp its character.',
    channelBoth:
      'With both of its gates active, the channel is complete: it defines the two centers it connects and creates a steady current of energy between them.',
    channelComplete:
      'In your chart, channel {a}-{b} is complete: a current you contribute steadily and in an integrated way.',
    channelHalf:
      'In your chart, you have one of the two gates of channel {a}-{b} active ([gate {on}](gate:{on})) but not the other ([gate {off}](gate:{off})): a half channel that is completed occasionally, with someone who has the missing gate or during certain transits.',
    channelNone:
      'In your chart, neither of the two gates of channel {a}-{b} is active: a current you find mostly in other people.',
    profileTitle: 'Profile {profile}',
    profileIntro:
      'Profile {profile} combines two lines: the {a}, conscious, and the {b}, unconscious. Each adds its own nuance, and together they describe a way of learning, of relating and of unfolding one’s purpose.',
    signalTitle: '{aligned}/{misaligned} ({type})',
    signalPairNote:
      'The two are read together: what matters is never one of them on its own, but **which of the two is winning** at the moment.',
    signalCanonical:
      'Human Design calls the alignment signal your *signature*, and the misalignment one your *not-self theme*.',
    signalIndexHeading: 'The Signals of the Five Types',
    definitionIntro:
      '**Definition** describes how a chart’s defined centers group together: whether they form one single block of energy or several separate ones. It speaks to inner consistency — which parts are always "on" and linked — and to how that energy integrates.',
    angleTag: { right: 'R', left: 'L', juxtaposition: 'Jux' },
    crossIndexHeading: 'All 192 crosses, by quarter of the mandala',
    crossIndexCols: { sun: 'Sun', name: 'Cross', angle: 'Ang.' },
    quarter: [
      { title: 'Quarter of Initiation', short: 'of Initiation', note: 'The start: the spark, the idea with no shape yet. Purpose is sought through the **mind**.' },
      { title: 'Quarter of Civilization', short: 'of Civilization', note: 'Giving form and building what serves everyone. Purpose is sought through **form**.' },
      { title: 'Quarter of Duality', short: 'of Duality', note: 'Meeting the other, and what comes of it. Purpose is sought through **bonding**.' },
      { title: 'Quarter of Mutation', short: 'of Mutation', note: 'Transformation, and the ending of the old. Purpose is sought through **change**.' }
    ],
    crossTitle: '{name}',
    factCrossPersonality: 'Personality',
    factCrossDesign: 'Design',
    bodySun: 'sun',
    bodyEarth: 'earth',
    crossReading:
      'In this particular cross, the conscious axis crosses "{tpSun}" ([gate {pSun}](gate:{pSun})) with "{tpEarth}" ([gate {pEarth}](gate:{pEarth})): the theme a person recognises as their own and keeps pushing at over a lifetime. Underneath, the unconscious axis brings "{tdSun}" ([gate {dSun}](gate:{dSun})) held up by "{tdEarth}" ([gate {dEarth}](gate:{dEarth})) — the ground all of that is done from, and usually clearer to other people than to the person themselves.',
    crossFourGates:
      'What gives each cross its own character is its **four gates**: the Personality Sun and Earth — the conscious side, what a person recognises as their own — and the Design Sun and Earth — the unconscious side, the ground they act from. They are the heaviest activations in the chart, and they have to be **read together**: the meaning is in the combination, not in any one gate.',
    crossCombination: 'This cross belongs to the [Quarter {quarter}](concept:quarter) and combines gates **{gates}**:',
    definitionGroupsLead: 'In your case, the groups are:',
    crossGatesJoin: ' | '
  },

  reportShell: {
    typeTitle: 'Your Type: {type}',
    typeSubhead: 'You are a [{type}](type:{typeKey})',
    centersTitle: 'Your Centers and Your Conditioning',
    strategyTitle: 'Your Strategy: {strategy}',
    authorityTitle: 'Your Authority: {authority}',
    profileTitle: 'Your {profile} Profile',
    definitionTitle: 'Your Definition: {definition}',
    definitionTitleNone: 'Your Definition',
    definitionPrefix: '^Definition\\s+',
    practiceTitle: 'Living Your Design',
    signalsTitle: 'Your Signals',
    signalsBulletHead: '**[Signals](signal:{type}) of whether you are on track**:',
    signalAligned: 'Alignment',
    signalMisaligned: 'Misalignment',
    definitionGroupsLead:
      'Your definition is **{label}**: your defined centers fall into **{n} groups**, with no channel joining them inside:',
    definitionGroupJoin: ' · ',
    purposeTitle: 'Your Purpose',
    purposeSubhead: '[{name}](cross:{angle}) ({gates})',
    profileHeading: 'Profile {profile}',
    profileIntro:
      'Your {profile} profile combines two lines: the {a}, conscious, and the {b}, unconscious. Each adds its own nuance, and together they describe your way of learning, relating and unfolding your purpose.',
    closingPrompt:
      'According to Human Design I am a {type}, with a {profile} profile, {authority} authority, the "{strategy}" strategy and {definition}; my defined centers are: {centers}. I would like to know more about...',
    noCenters: 'none'
  },

  concept: {
    bodygraph: {
      title: 'The Bodygraph',
      paragraphs: [
        'The **bodygraph** is the body diagram a chart is drawn on. The nine shapes are the [centers](concept:center); the lines joining them are the [channels](concept:channel), each running from one gate to another. Every center governs a particular function, and together they map how energy moves.',
        'What makes each chart unique is which of those [centers](concept:center), [channels](concept:channel) and [gates](concept:gate) are switched on. Type, authority and a person\u2019s whole way of working fall out of that combination.',
        'The key distinction is whether a center is **defined** or **undefined** (open). A **defined** center — colored in — works the same way every day: a consistent energy, always there. An **undefined** center — shown empty — is not a flaw. It is an open area that takes in and amplifies the energy of other people and of the surroundings. It is where you learn the most, and also where it is easiest to be conditioned and to mistake what is borrowed for what is yours.'
      ]
    },
    type: {
      title: 'The Types',
      paragraphs: [
        '**Type** is the first and most important thing a chart tells you: how a person\u2019s energy is built to meet the world. There are five, decided by which centers are defined and how they connect to the [Throat](center:throat).',
        'Type matters for one very practical reason: each one has its own healthy way of **spending energy and making decisions**. Living by your own design instead of copying another type is what the system links to less friction and less exhaustion.',
        'It is not a personality label or a horoscope. It is a mechanical description of how energy works in a given person. Use it as a mirror: notice whether the way you move through life matches the way the chart says you are built.'
      ]
    },
    strategy: {
      title: 'Strategy',
      paragraphs: [
        '**Strategy** is how each type is meant to engage with life. It answers a very concrete question: how do you commit to something — a job, a relationship, a decision — without forcing it? Each type has its own answer.',
        'Every strategy points the same way: **stop initiating from your head** and trust the signal your body and your life are already giving you.',
        '**Following your strategy is the central experiment of Human Design.** Watch the difference between the decisions you make with it and the ones you make against it, and let that experience — not the theory — be your guide.'
      ]
    },
    authority: {
      title: 'Authority',
      paragraphs: [
        '**Authority** is where a reliable decision comes from — which part of you gets the last word. In Human Design the mind is there to take in information and advise other people, but **it is not to be trusted for decisions about your own life**. Authority always comes from somewhere more bodily.',
        'Which one you have follows a hierarchy based on your defined centers. Some work **in the moment** (sacral and splenic); others need **time** — emotional authority asks you to ride out the wave before clarity shows up.',
        'Authority is the most practical thing in the chart. It turns strategy into something you can actually use: before an important yes or no, it tells you which inner signal to listen for.'
      ]
    },
    profile: {
      title: 'The Profile',
      paragraphs: [
        'The **profile** is the "how" of your path: the way you learn, relate and grow into what you are here for. It is two numbers — 3/5, for instance — taken from lines 1 to 6 of the [I Ching](concept:iching). The first comes from the Sun/Earth of *personality*, the second from the Sun/Earth of *design*.',
        'Put the **two lines** together and you get a recognizable way of moving through life — more inward or more relational, more experimental or more solid.',
        'Type and authority answer *how to decide*. The profile answers *how your experience unfolds*. It tends to be the layer people recognize fastest, because it describes patterns already visible in their own history. Of the two lines, you live the first consciously and the second unconsciously — and other people usually see that second one more clearly than you do.'
      ]
    },
    definition: {
      title: 'Definition',
      paragraphs: [
        '**Definition** describes how your defined centers connect to each other: whether they form one block of energy or several separate groups. It is about inner consistency — which parts of you are always switched on and wired together.',
        'The variants: no definition ([Reflector](type:reflector), nothing defined), single (all one group), split (two groups), triple split (three) and quadruple split (four). Single definition tends to feel **self-sufficient**; the split ones usually bring a **search for connection**, often through other people, or through the particular gates that bridge the gap.',
        'In practice, definition tells you what kind of company and surroundings complete you. More splits is not worse, and fewer is not better: each describes a different way of working and of relating.'
      ]
    },
    center: {
      title: 'The Centers',
      paragraphs: [
        'The **centers** are the nine energy hubs of the bodygraph, each tied to a particular function. The idea comes from the chakras, but here what matters is whether a center is **defined** or **undefined** (open). In the list below, the centers **defined in your chart** are highlighted; here are the nine and what they do:'
      ],
      after: [
        'A **defined** center works the same way every day: a consistent energy you always bring, your own and reliable. An **undefined** center is not a flaw. It is an open area that takes in and amplifies the energy of other people and of the surroundings. It is where you learn the most, and also where it is easiest to be conditioned and to mistake what is borrowed for what is yours.',
        'Reading the centers is one of the most practical things you can do for **managing your energy**: the defined ones show what you reliably offer, and the undefined ones show where it pays not to decide under borrowed pressure.'
      ]
    },
    channel: {
      title: 'The Channels',
      paragraphs: [
        'The **channels** are the 36 connections of the bodygraph. Each one joins two gates sitting in different centers. When both of its gates are active the channel is **complete**: it links those two centers, defines them, and creates a steady, dependable current between them.',
        'Between them, the channels decide **your type, your definition and which centers are defined**. That makes them the mechanical backbone of the chart: a channel is not an isolated trait but a constant way two areas of your energy work together.',
        'Each channel blends the themes of its two gates (and of their [I Ching](concept:iching) hexagrams). In the list below, the channels **complete in your chart** are highlighted.'
      ]
    },
    gate: {
      title: 'The Gates',
      paragraphs: [
        'The **gates** are the 64 positions of the bodygraph a planet can switch on, one per [I Ching](concept:iching) hexagram. Each lives in a specific center and adds its own flavor of energy or character. At birth, the planets switch on a set of them.',
        'An active gate whose partner — the gate at the other end of its channel — is missing is left **hanging**. Its theme is there, but it looks to be completed, often through someone who carries the other half. When both gates are active the channel forms and defines its two centers.',
        'In the list below, the gates **active in your chart** are highlighted.'
      ]
    },
    iching: {
      title: 'The I Ching',
      paragraphs: [
        'The **I Ching** (or *Book of Changes*) is an ancient Chinese text — more than two thousand years old — used both as a book of wisdom and as an oracle. At its core are **64 figures** called *hexagrams*, each describing an archetypal life situation and how it tends to change.',
        'Each **hexagram** is built from **six stacked lines**, either solid (yang) or broken (yin). There are exactly 64 possible combinations of those six lines, and tradition gives each one a name and a meaning: the creative, waiting, conflict, peace, and so on.',
        'Human Design borrows that structure: the **64 gates** of the bodygraph map one-to-one onto the **64 hexagrams**, and each gate inherits the theme of its hexagram. The **six lines** of each hexagram are also what give the lines of the [profile](concept:profile) (1 through 6).',
        'Here the I Ching is used only as a **symbolic source** for those themes — the reservoir of meaning the gates draw on — not as a method of divination. It is one of the traditions Human Design combines, alongside astrology, the chakras, and the kabbalistic tree of life.'
      ]
    },
    quarter: {
      title: 'The Quarters of the Mandala',
      paragraphs: [
        'The **64 gates** are arranged in a circle — the *mandala* of Human Design — and that circle is divided into **four quarters** of 16 gates each. Each quarter describes a **different way a life’s purpose unfolds**, and it sits as a backdrop to the incarnation crosses that fall within it.',
        'Each chart’s [incarnation cross](concept:cross) belongs to one of these quarters (its Personality Sun gate decides which), and that quarter colours the **overall tone** in which the purpose is lived.'
      ]
    },
    activation: {
      title: 'The Activations',
      paragraphs: [
        '**Activations** are the positions of the planets at your birth, translated into Human Design gates and lines. Each body switches on one gate (and one line within it), and the whole set is what builds the chart: centers, channels, type, authority and profile.',
        'They are worked out at **two moments**, which is why there are two columns. *Personality* uses the position at the instant of birth — the conscious side. *Design* uses the position about 88 days earlier, 88\u00b0 of solar arc — the unconscious side. Hence two activations per planet.',
        'Each one is written **gate.line**: the gate (1 to 64) and, inside it, the line (1 to 6). A **30.3 on the Sun** means the Sun switches on **gate 30 in its line 3** — the theme of gate 30, read with the flavor line 3 brings. That is the basic unit the whole chart is built from.',
        'They do not all count equally: the **Sun and Earth** carry most of the meaning and the rest add nuance, which is what the *Weight* column summarizes. Tap an activation to open its gate, and see the [profile](concept:profile) for what the lines mean.'
      ]
    },
    signal: {
      title: 'The Signals',
      paragraphs: [
        'The **signals** are the quickest way to check, on any given day, whether someone is living with their design or against it. They do not describe a personality trait. They are a **state you can feel**, and it shifts with how you have been deciding and acting.',
        'Every [type](concept:type) has its own pair. The **alignment signal** shows up when you follow [your strategy](concept:strategy) and decide from [your authority](concept:authority); the **misalignment signal** is what surfaces when you do not.',
        'Human Design usually calls these the *signature* and the *not-self theme*. They are named as signals here because that is what they do: give you something you can check at any hour of the day without knowing anything about the system. When the misalignment one is winning, the answer is rarely to try harder — it is to look at what got decided, and how.'
      ]
    },
    cross: {
      title: 'The Incarnation Cross',
      paragraphs: [
        'The **incarnation cross** is the background theme of a life — the general direction a design points in. It usually gets introduced as your "purpose", but take it gently and lightly: it is not something to work out, apply or force. Live in step with your design ([strategy](concept:strategy) and [authority](concept:authority)) and the cross unfolds by itself over a lifetime.',
        'It is made of **four gates**: the sun-earth pair of [Personality](activationCol:personality) and the sun-earth pair of [Design](activationCol:design). These are the heaviest [activations](concept:activation) in the chart — most of the imprint is attributed to them — so the cross is essentially a summary of their dominant themes.',
        'It is called a "cross" because it comes from **two axes crossing**: the personality-design axis (conscious ↔ unconscious) and the Sun-Earth axis (what gets expressed and driven ↔ what holds and steadies it).',
        'The **angle** says where that energy is aimed:',
        { bullets: [
          '**Right angle** — a *personal* geometry: the path is walked mostly through your own experience.',
          '**Left angle** — a *transpersonal* one: it is fulfilled through other people, through whoever you cross paths with.',
          '**Juxtaposition** — a *fixed* geometry: a very specific role, held fairly independently of the surroundings.'
        ] },
        'The angle follows directly from the [profile](concept:profile) — a 1/3 profile is right angle, a 5/2 is left angle, and so on. The names come from the **geometry of the mandala**: how far apart the Personality Sun and the Design Sun sit, close to a right angle in one case and adjacent in the others. Neither is better than the other.'
      ]
    }
  },

  // ── Type (the chip "i") ──────────────────────────────────────────────────
  type: {
    generator: {
      title: 'Generator',
      paragraphs: [
        'The most common type, and the *pure* Generator: around **37% of people**. What defines it is a defined [Sacral Center](center:sacral) — the life-force engine of the system, generative and renewable. Well aligned, that building energy is steady and plentiful.',
        'A Generator works by [responding](strategy:respond). It **reacts to what life puts in front of it** rather than starting things from the head. Commit that energy to the right thing and *satisfaction* shows up; push it where it does not belong and *frustration* does instead.',
        'In practice the Sacral answers before the mind does. Faced with something concrete — a proposal, a question, a situation — there is a gut pull toward it or away from it. **Trusting that signal**, rather than reasoning your way to an answer, is what keeps the energy well spent.'
      ]
    },
    'manifesting-generator': {
      title: 'Manifesting Generator',
      paragraphs: [
        'A variant of the [Generator](type:generator) — about 33% of people, which puts all Generators together at close to 70%. A Manifesting Generator has a defined [Sacral](center:sacral) like any Generator, but it also has the [Throat](center:throat) connected to a motor center. That adds the ability to make things happen fast.',
        'The strategy is to [**respond and then inform**](strategy:respond-then-inform): wait for the sacral answer — the body\u2019s yes or no — and, once you have it, tell the people it will affect before you set off. MGs tend to be many-sided, quick and non-linear: skipping steps, running several things at once, and doubling back later to finish what was skipped.',
        'The trick is not to scatter. Starting things the body never said yes to is what drains an MG. When the yes is real, it moves fast and feels *satisfaction* and *peace*; when the mind pushes instead, what piles up is *frustration*, *anger* and half-finished work.'
      ]
    },
    projector: {
      title: 'Projector',
      paragraphs: [
        'Around **20% of people**. With no defined [Sacral](center:sacral), a Projector is **not built for constant work** and cannot hold a [Generator](type:generator)\u2019s pace — so beware of trying to keep going without rest. The gift lies elsewhere: seeing other people with real depth, and knowing how to guide their energy.',
        'The strategy is to [**wait for the invitation**](strategy:wait-for-invitation) on the things that matter — work, love, where to live. Recognition is what lets the insight land; offering it unasked usually meets resistance. When *recognition* and *success* turn up, that is the sign of being on track. When things are off, the tell is *bitterness*.',
        'Managing the energy means **resting and pacing**: the competition is not stamina, it is depth and mastery. Sleep and let go before you are empty, and choose carefully who gets your attention — learning to say yes or no when it counts, because not every invitation deserves a yes.'
      ]
    },
    manifestor: {
      title: 'Manifestor',
      paragraphs: [
        'The most independent type, around **9% of people**. At least one motor center (the Heart or the Solar Plexus) connects to the [Throat](center:throat), but the [Sacral](center:sacral) is undefined — so the energy is not constant. It arrives in bursts, good for starting things, and then it needs rest. Quite a lot of rest.',
        'The strategy is to [**inform before acting**](strategy:inform-before-acting). Not asking permission — simply telling the people your impact will reach. It takes most of the resistance out of the room. Acting in line with it brings *peace*; skipping it brings opposition, and *anger* builds.',
        'A Manifestor is here to **start things and make an impact**, not to keep them running. Managing the energy means respecting the cycle of push and rest, and protecting your independence without cutting yourself off.'
      ]
    },
    reflector: {
      title: 'Reflector',
      paragraphs: [
        'The rarest type: barely **1% of people**. No center is defined — the whole bodygraph is open. That makes a Reflector an unusually sensitive mirror of the people and places around them, able to read the health of a community.',
        'Because they are constantly sampling other people\u2019s energy, **surroundings matter enormously**: who they are with and where they are changes the experience completely. The strategy is to [**wait a lunar cycle**](strategy:wait-lunar-cycle) — about 28 days — before big decisions, letting the thing be seen from every angle first.',
        'The main care is choosing environments well and not mistaking what is being reflected for what is theirs. In the right place with the right people, *surprise* and *delight* show up. When things are off, the tell is *disappointment*.'
      ]
    }
  },

  // ── Strategy (the value "i") ─────────────────────────────────────────────
  strategy: {
    respond: {
      title: 'Respond',
      paragraphs: [
        'The Generator\u2019s strategy. Rather than setting out from the head, the design calls for **waiting until there is something to respond to**: a proposal, a question, an opening that appears. Life puts the material on the table; the body answers.',
        'The answer comes from the [Sacral Center](center:sacral) as a **gut reaction**, before any reasoning: a pull toward something, or away from it. A yes or a no. Trusting that answer rather than talking oneself into a decision is what leads to satisfaction. Forcing action where no answer came leads to frustration.'
      ]
    },
    'respond-then-inform': {
      title: 'Respond, Then Inform',
      paragraphs: [
        'The Manifesting Generator\u2019s strategy, and it is both things at once. First, like any Generator: **wait for the sacral answer** — the body\u2019s yes or no to something concrete. Never start from the mind.',
        'Then, once the answer is there and action is about to begin, **tell the people it will affect** before setting off. An MG makes things happen fast, and a word in advance takes the friction out of that speed. Skipping either step — the answer or the heads-up — is what usually leaves an MG worn out.'
      ]
    },
    'inform-before-acting': {
      title: 'Inform Before Acting',
      paragraphs: [
        'The Manifestor\u2019s strategy. Manifestor energy starts things and lands with impact, often without warning, so the design calls for **telling the people it will reach before setting off**. This is not asking permission, and it is not justifying anything. It is simply saying what is about to happen.',
        'The effect is very practical: informing dissolves most of the resistance that acting by surprise provokes. It can even bring allies who smooth the way. Doing it brings peace to the room; skipping it stirs up the anger and opposition that end up making the Manifestor\u2019s own path harder.'
      ]
    },
    'wait-for-invitation': {
      title: 'Wait for the Invitation',
      paragraphs: [
        'The Projector\u2019s strategy. For the things that matter — a job, a relationship, a real commitment — the design calls for **waiting to be recognized and invited** rather than offering unasked.',
        'This is not passivity. A Projector keeps living and preparing, but saves that insight for people who value it and ask for it. **The right invitation is what lets the gift land**; pushing without one usually brings resistance, rejection and bitterness. Recognition and success are the sign that the wait was worth it.'
      ]
    },
    'wait-lunar-cycle': {
      title: 'Wait a Lunar Cycle',
      paragraphs: [
        'The Reflector\u2019s strategy. Before an important decision, the design calls for **letting a full lunar cycle pass** — around 28 days — instead of settling things in one go.',
        'Over that time a Reflector **talks it through, samples different environments, and watches how the view of it shifts** from day to day. With a completely open chart, that journey is what separates what is theirs from what they are simply reflecting. Clarity arrives by accumulation, from seeing the thing from many angles — never on impulse.'
      ]
    }
  },

  // ── Authority (the value "i") ────────────────────────────────────────────
  authority: {
    emotional: {
      title: 'Emotional Authority',
      paragraphs: [
        'The most common authority. It belongs to anyone with a **defined [Solar Plexus](center:solarPlexus)**, which works in waves: mood rises and falls over time, not because of what is happening right now. Hence the golden rule: **there is no truth in the moment**.',
        'Deciding well means **riding the wave out first** — sleeping on it, letting time pass, coming back to the question in a different mood — before committing. Clarity here is not a flash of insight; it is what is left once the emotion has settled. Haste is the enemy.'
      ]
    },
    sacral: {
      title: 'Sacral Authority',
      paragraphs: [
        'The authority of most Generators. It lives in the **[Sacral Center](center:sacral)**, which answers **in the moment** with a sound or a gut movement — a rising "uh-huh" of yes, a flat "mm-mm" of no — to something concrete. The body speaks first.',
        'It is **immediate and physical**: it does not reason, it reacts. It works best with yes/no questions and clouds over as soon as the mind starts building a case. Learning to catch that first answer from the belly, and to trust it, is the whole practice.'
      ]
    },
    splenic: {
      title: 'Splenic Authority',
      paragraphs: [
        'This one lives in the **[Spleen](center:spleen)**, the oldest center of awareness, tied to survival, health and instinct. It speaks **in the present, and only once**: a sudden, quiet knowing, with no repetition and no argument to back it up.',
        'It is the **subtlest and most fleeting** of the authorities. It does not insist, so it is easy to miss in the moment or explain away afterwards. The practice is to **trust that first instinctive nudge** — the calm yes or no of the body — the instant it appears, because it rarely comes back.'
      ]
    },
    ego: {
      title: 'Ego Authority',
      paragraphs: [
        'This one lives in the **[Heart Center (Ego)](center:heart)**, the engine of willpower and desire. Here the right decision is found through an honest question: **do I actually want this? what is in it for me?** Not selfishness — simply taking one\u2019s own wanting seriously.',
        'It is an authority of **will and impulse**, not of long reflection. It works when a person listens to what they truly want and can commit to it. It goes wrong when they take things on out of duty or pressure, with the heart not behind it.'
      ]
    },
    'self-projected': {
      title: 'Self-Projected Authority',
      paragraphs: [
        'Particular to certain Projectors. The truth arrives through the **voice**: talking the thing through out loud, and **hearing oneself** say it, is what reveals whether it fits one\u2019s identity and direction.',
        'What matters is not what the listener thinks. It is the act of **saying it and listening back**. So it helps to be around trusted people who let the talking happen without steering it, and to pay attention to the tone and the words that come out — the guidance is there, not in the reasoning.'
      ]
    },
    mental: {
      title: 'Mental/Environmental Authority',
      paragraphs: [
        'Also called environmental authority, or the "sounding board". It belongs to some Projectors with no inner center defined for deciding. There is no fixed bodily authority to consult, so clarity does not arrive from inside in one piece — **it comes out of conversation**.',
        'The practice is to **talk things through with trusted people, in the right surroundings** — not so they decide, but so the thinking can happen out loud. Place and company are part of the method here: the decision settles gradually, with time and talking.'
      ]
    },
    lunar: {
      title: 'Lunar Authority',
      paragraphs: [
        'The Reflector\u2019s authority, and the only one belonging to a type with no defined center at all. With no fixed inner source to consult, the guide is **time**: a full lunar cycle, around 28 days, before anything important.',
        'Across that cycle a Reflector **passes through different states, places and conversations**, watching how the view of the question changes. Clarity comes by **ripening**, from perspectives piling up rather than from impulse. Whatever still rings true after the whole cycle is what can be trusted.'
      ]
    }
  },

  // ── Profile (the six lines) ──────────────────────────────────────────────
  profile: {
    '1': {
      title: 'Line 1 — The Foundation',
      paragraphs: [
        'The first line looks for **security through knowledge**. It needs to dig in, understand the fundamentals and know the ground is solid before it moves; without that footing it feels uneasy.',
        'This is **studious, inward-looking** energy. It goes deep until it feels expert, and that solidity reassures everyone else. The catch is waiting forever to know "enough" before taking the step.'
      ]
    },
    '2': {
      title: 'Line 2 — Natural Talent',
      paragraphs: [
        'The second line comes with **gifts that take no effort**, often without quite noticing they are there. It needs **time alone** for that talent to ripen at its own speed.',
        'The pattern is being **called out from outside**: other people spot something the person themselves cannot name, and ask for it. The balance sits between honoring the need to withdraw and answering the calls that are worth answering.'
      ]
    },
    '3': {
      title: 'Line 3 — Trial and Error',
      paragraphs: [
        'The third line learns **by trying**: hands on, through attempts, discoveries and plenty of stumbles. Every "mistake" is information, not failure.',
        'This is **experimental, resilient** energy: it finds what works by ruling out what does not. The wisdom that comes out of it is thoroughly practical — and the key is not reading the stumbles as personal flaws, because they are the method itself.'
      ]
    },
    '4': {
      title: 'Line 4 — The Network',
      paragraphs: [
        'The fourth line moves through **relationships and community**. Opportunities — work, love, big changes — tend to arrive through people already known, not through strangers or cold approaches.',
        'This is **warm, relational** energy that needs solid ground in its bonds. The classic advice: do not let go of one footing — a job, a situation — until the next one is secured through the network. Transitions work better that way.'
      ]
    },
    '5': {
      title: 'Line 5 — Projection',
      paragraphs: [
        'The fifth line lives under a **field of projection**: other people load it with expectations and look to it for practical answers. They do it because they see someone who can fix things — almost a rescuer.',
        'That brings influence and a natural role of **useful leadership**, but it also exposes: fail to deliver what was projected and the same force turns around. The work is managing **reputation** carefully, setting expectations straight where possible, and promising only what can genuinely be delivered.'
      ]
    },
    '6': {
      title: 'Line 6 — The Role Model',
      paragraphs: [
        'The sixth line moves through **three phases of life**. Until around thirty it lives like a line 3 — trying, stumbling, sometimes crashing. Then comes a stretch of stepping back to watch and process, the "on the roof" years. From roughly fifty onward it emerges as an **example other people look to**.',
        'The underlying pull is toward **objectivity and maturity**: living by what it holds to be right and true, and becoming a model for others. Knowing which phase is in play saves a lot of self-judgement — the middle stretch is not disconnection, it is preparation.'
      ]
    }
  },

  // ── Definition (the value "i") ───────────────────────────────────────────
  definition: {
    'no-definition': {
      title: 'No Definition',
      paragraphs: [
        'Unique to the Reflector: **no center is defined**, and the whole bodygraph stays open. There is no fixed energy of one\u2019s own. Instead, the energy of everyone around is taken in, amplified and reflected back.',
        'That makes a Reflector **extraordinarily sensitive to their surroundings**: who they are with and where they are changes the experience completely. The wisdom comes from exactly that openness — as long as what is being reflected is not mistaken for what is theirs.'
      ]
    },
    single: {
      title: 'Single Definition',
      paragraphs: [
        'Every defined center is **connected in one block**. Energy flows inside without a break, which gives a sense of **self-sufficiency**: there is no need for anyone else to complete the picture.',
        'The challenge is the mirror image of the split definitions\u2019: working well alone makes it easy to turn inward, and harder to let outside influence in. Noticing when it is worth stepping out of one\u2019s own bubble is part of the learning.'
      ]
    },
    split: {
      title: 'Split Definition',
      paragraphs: [
        'The defined centers fall into **two separate groups**, with no channel joining them inside.',
        'Someone with a split definition usually feels a **pull toward connection**: something to bridge the two halves. That bridge tends to arrive through other people — whose energy completes the missing channel — or through transits that switch on the gate in between. The split is not a shortfall. It simply means certain company and certain places make a person feel whole, and that happens naturally.'
      ]
    },
    'triple-split': {
      title: 'Triple Split Definition',
      paragraphs: [
        'The defined centers fall into **three separate groups**.',
        'The wiring is more intricate, and it usually takes **more variety — of people, of input** — for someone with this definition to feel joined up. Diverse surroundings and a certain amount of movement suit it well; too much stillness can leave the sense that something has not quite come together. Knowing the structure helps: that need for variety is not scatteredness.'
      ]
    },
    'quad-split': {
      title: 'Quadruple Split Definition',
      paragraphs: [
        'The rarest of them: the defined centers fall into **four separate groups**.',
        'It is a highly fragmented wiring which, oddly enough, tends to ask for **more structure, space and calm** in order to come together. Far from a problem, it describes a very particular way of processing life. What helps is **taking time** and not forcing everything into place at once: the many parts settle at their own pace.'
      ]
    }
  },

  // ── Center (the chip "i"): each of the nine centers ──────────────────────
  center: {
    head: {
      title: 'Head',
      fn: 'A center of **mental pressure**: the push to think, to question, to be inspired. It produces the questions and the curiosity, but it does not answer them — that is the [Ajna](center:ajna)\u2019s job.',
      defined: '**Defined**, it brings a steady way of finding inspiration and of feeling the pressure to understand.',
      open: '**Undefined**, it amplifies other people\u2019s questions and mental restlessness. The lesson here is not to get dragged into solving doubts that were never one\u2019s own and do not matter for one\u2019s own life.'
    },
    ajna: {
      title: 'Ajna',
      fn: 'The center of **mind and concept**: it processes information, forms ideas and gives shape to thinking, working with the pressure arriving from the [Head](center:head).',
      defined: '**Defined**, it gives a fixed, dependable way of thinking, with stable opinions and certainties.',
      open: '**Undefined**, it makes for a **flexible mind** that can hold many perspectives at once. Its trap is the pressure to look certain, or clinging to a borrowed certainty. Its gift is not needing a fixed answer at all.'
    },
    throat: {
      title: 'Throat',
      fn: 'The center of **communication and manifestation**: where energy turns into voice and into action. Everything that gets said or made passes through here.',
      defined: '**Defined**, it gives a consistent voice and a consistent way of expressing things.',
      open: '**Undefined**, it shifts its way of speaking with the company, and can feel the **pressure to talk just to be noticed**. The lesson is waiting for the right moment rather than forcing words out.'
    },
    g: {
      title: 'G',
      fn: 'The center of **identity, love and direction**: the sense of who someone is and where their life is going. It is also tied to the feeling of being in the right place.',
      defined: '**Defined**, it brings a steady sense of identity and direction.',
      open: '**Undefined**, identity is more **fluid and shifting**, finding its direction through the right places and the right people. **Place** is the key here: being somewhere that fits orients everything else.'
    },
    heart: {
      title: 'Heart (Ego)',
      fn: 'The center of **willpower, ego and self-worth**, tied to the material world and to keeping promises. It is a motor that fires in bursts of will, not continuously.',
      defined: '**Defined**, it gives a consistent will and the capacity to hold to what was promised.',
      open: '**Undefined** — which is most people — there is **nothing to prove** and no willpower to measure. The trap is over-promising in order to prove it anyway. The lesson here is that worth does not depend on achievements.'
    },
    sacral: {
      title: 'Sacral',
      fn: 'The great **motor of life force, work and sexuality**: the generative source of the system. It defines Generators and Manifesting Generators, and it sets how they handle energy.',
      defined: '**Defined**, it gives a **renewable** working energy — meant to be spent fully on the right things and run right down by the end of the day.',
      open: '**Undefined**, that constant energy simply is not there. What matters here is **knowing when enough is enough**, and not being carried along by other people\u2019s pace to the point of exhaustion.'
    },
    spleen: {
      title: 'Spleen',
      fn: 'The center of **instinct, intuition and survival**, tied to the immune system, to health and to the sense of being well right now. It speaks quietly, in the present, and only once.',
      defined: '**Defined**, it gives a constant intuition and a steady sense of health.',
      open: '**Undefined**, it **amplifies other people\u2019s fears** and tends to hold on to what is not good for it — relationships, habits, situations — out of fear of letting go. The lesson is not deciding from fear, and learning what actually agrees with the body.'
    },
    solarPlexus: {
      title: 'Solar Plexus',
      fn: 'The center of **emotion, feeling and mood**, which moves in **waves** that rise and fall over time. When it is defined it sets an emotional authority: **there is no truth in the moment**.',
      defined: '**Defined**, it runs its own emotional waves and needs time before clarity arrives.',
      open: '**Undefined**, it **soaks up and amplifies the emotions in the room** — it reads the mood of a place instantly — and tends to avoid confrontation. The challenge is not taking ownership of moods picked up from outside.'
    },
    root: {
      title: 'Root',
      fn: 'A center of **pressure and adrenaline**: the drive that gets things moving, and the stress that pushes for action to be rid of the pressure. It sets the pulse for starting.',
      defined: '**Defined**, it brings a steady way of handling pressure and stress.',
      open: '**Undefined**, it **amplifies the rush** and the urge to clear the to-do list as fast as possible. The lesson is not being pushed into hasty decisions just to relieve a pressure that is largely borrowed.'
    }
  },

  // ── Activations: the table's column headers ──────────────────────────────
  activationCol: {
    personality: {
      title: 'Personality (Conscious)',
      paragraphs: [
        'The **Personality** column represents the **conscious** side: what the person recognizes as "me", their mind and their personality. It is calculated from the position of the planets at the **exact instant of birth**.',
        'It is the part of the chart you identify with and are usually aware of. On the bodygraph it is drawn in white.'
      ]
    },
    design: {
      title: 'Design (Unconscious)',
      paragraphs: [
        'The **Design** column represents the **unconscious** side: the body, what is inherited, what operates without conscious control and what others usually see before you do. It is calculated about **88 days before birth** (88° of solar arc).',
        'It is the more bodily part, less accessible to the mind; it tends to express itself automatically. On the bodygraph it is drawn in red.'
      ]
    },
    weight: {
      title: 'Weight of the Activation',
      paragraphs: [
        'Not all activations carry the same influence. The most widespread teaching in Human Design places the **Sun and Earth** as the most decisive — they are usually credited with around **70%** of the chart’s meaning; the **Nodes** describe above all the environment and life direction; and the remaining planets **add nuance**.',
        'The *Weight* column summarizes that relative influence as a rough guide (**high / medium / low**). It is an approximation, not an official figure of the system: use it to know where to start reading the chart — always with the Sun and the Earth.'
      ]
    }
  },

  // ── The 13 bodies ────────────────────────────────────────────────────────
  planet: {
    sun: {
      title: 'Sun',
      paragraphs: [
        'The **Sun** is the most important activation in the chart: it marks the **essential expression**, the energy a person radiates and the purpose they embody. Together with the Earth it concentrates most of the meaning (~70%).',
        'Its personality gate is usually read as the dominant note of the conscious identity.'
      ]
    },
    earth: {
      title: 'Earth',
      paragraphs: [
        'The **Earth** balances the Sun: it is what **grounds and stabilizes**, the floor on which the purpose rests. With the Sun it forms the most decisive axis of the chart.',
        'It provides the practical counterweight to the solar energy: what is needed to stay centerd.'
      ]
    },
    moon: {
      title: 'Moon',
      paragraphs: [
        'The **Moon** points to what **drives and keeps things going**: the engine of continuity day to day. For the Reflector it takes on a central role, as it travels its cycle of about 28 days.',
        'It speaks of what sustains movement once the initial enthusiasm has passed.'
      ]
    },
    northNode: {
      title: 'North Node',
      paragraphs: [
        'The **North Node** describes the **direction and environment** the second half of life orients toward (roughly, from maturity onwards). It marks where life is heading.',
        'It is not a character trait but a **context**: the setting in which the energy unfolds best.'
      ]
    },
    southNode: {
      title: 'South Node',
      paragraphs: [
        'The **South Node** describes the **environment** of the first half of life: the setting you start from. With the North Node it forms the axis of the life trajectory.',
        'It speaks of "where you come from" in terms of environment and direction, rather than personality.'
      ]
    },
    mercury: {
      title: 'Mercury',
      paragraphs: [
        'Mercury governs **communication and thinking**: what needs to be expressed and shared, and how ideas connect with others.',
        'It nuances the way of speaking and getting things across.'
      ]
    },
    venus: {
      title: 'Venus',
      paragraphs: [
        'Venus is associated with **values, affections and the sense of what is right**: what is cherished, the way of loving and what is considered fair or beautiful.',
        'It sets the tone of relationships and of personal morality.'
      ]
    },
    mars: {
      title: 'Mars',
      paragraphs: [
        'Mars represents **energy, drive and the immaturity** that gets polished over the years: the push, sometimes unruly, especially in youth.',
        'It speaks of how force and action are channelled.'
      ]
    },
    jupiter: {
      title: 'Jupiter',
      paragraphs: [
        'Jupiter is associated with **expansion, law and abundance**: the principles that benefit and where growth is found.',
        'It brings the sense of protection and of what makes things prosper.'
      ]
    },
    saturn: {
      title: 'Saturn',
      paragraphs: [
        'Saturn is **discipline and limit**: the "judge" that demands rigour, corrects, and marks what is learned through perseverance.',
        'It points to where maturity arrives through effort and responsibility.'
      ]
    },
    uranus: {
      title: 'Uranus',
      paragraphs: [
        'Uranus represents the **singular and the unusual**: originality, and the areas where a path of one’s own is followed, outside convention.',
        'It is also associated with change, science and the unexpected.'
      ]
    },
    neptune: {
      title: 'Neptune',
      paragraphs: [
        'Neptune is associated with the **spiritual, the subtle and illusion**: the fog around what is not yet seen clearly, and openness to the transcendent.',
        'It brings sensitivity and imagination; sometimes a confusion that clears with time.'
      ]
    },
    pluto: {
      title: 'Pluto',
      paragraphs: [
        'Pluto is **truth and transformation**: what is stirred at depth, psychological processes and the changes that remake a person from within.',
        'It marks where life confronts you with the essential in order to transform from the inside.'
      ]
    }
  },

  // ── The 64 gates: short theme + own-voice essence with a gift/shadow polarity ──
  gate: {
    1: {
      theme: 'Creative Expression',
      text: '**Creating out of who you are** — an expression that copies no one. At its best it inspires; at its worst it turns inward into melancholy when it cannot find a way out into the world.',
      more: [
        'When you carry it, something of yours needs a way out: a way of doing, saying or seeing that is not quite like anyone else\'s. It does not arrive on demand or because you sat down to look for it — it comes on its own schedule, and when it comes it wants room.',
        'The hard part is the waiting. With no outlet, that energy turns inward and becomes melancholy. That is not a flaw in you; it is the cost of carrying something original. Give it a way out, however small, rather than forcing it into existence.'
      ]
    },
    2: {
      theme: 'Receptive Direction',
      text: '**Knowing where to go without forcing it** — letting the course surface instead of imposing one. Its gift is a natural sense of direction that gives movement meaning; its shadow, feeling lost whenever it tries to steer by willpower alone.',
      more: [
        'When you carry it, you tend to know which way to go before you can say why. It is not a plan, it is a compass: you sense which direction makes sense and which does not, with the reasons arriving later, if at all.',
        'The usual mistake is steering by willpower, picking the course with your head. That is when you get lost. Your direction works when you let it surface and trust it, not when you impose it.'
      ]
    },
    3: {
      theme: 'Order in the New',
      text: '**Making order out of a beginning**, back when there is still no shape to hold on to. Its gift is knowing how to get something started and give it structure; its shadow, the frustration and the stalling that come from wanting to move faster than the thing allows.',
      more: [
        'When you carry it, your ground is the start: that stretch where something new exists but has no shape yet. You know how to move inside the initial mess and give it a structure it did not have, however slow and untidy the process is.',
        'The difficulty is pacing. This energy pushes for things to set *now*, and new things do not set now. When you stall or get frustrated, it is almost always because you are asking the process for a speed it does not have.'
      ]
    },
    4: {
      theme: 'Mental Answers',
      text: '**The mind reaching for an answer** to a question left open. Its gift is working out solutions that hold together logically; its shadow, the pressure to have the answer already, and mistaking a hypothesis for a certainty.',
      more: [
        'When you carry it, your mind manufactures answers: put an open question in front of it and it starts producing hypotheses, formulas, possible explanations. It is a genuinely useful engine for everyone else, because it offers ways out where others only see the problem.',
        'The risk is mistaking a hypothesis for a certainty. The pressure to have the answer *already* makes you grab the first one that sounds right. What you have are *possible* answers: worth a great deal as a proposal, very little as a verdict.'
      ]
    },
    5: {
      theme: 'Fixed Rhythms',
      text: '**Rhythm and habit** — the energy that keeps a routine and a pace of its own. Its gift is the reliability of a rhythm that anchors the day; its shadow, the anxiety when that rhythm breaks.',
      more: [
        'When you carry it, you need a rhythm of your own: habits, hours, small rituals that give the day its shape. It is not rigidity or fussiness; it is how your energy stays steady and available.',
        'Which is why having your rhythm broken hits you so hard. When the day gets knocked out of shape, a restlessness shows up that is hard to explain to anyone who does not work this way. Protecting your rhythm is not a whim, it is maintenance.'
      ]
    },
    6: {
      theme: 'Intimacy and Friction',
      text: '**The border of closeness**: when to open and when to shut. Its gift is an emotional life that creates real intimacy; its shadow, conflict and reactivity when that border is drawn by whatever mood is passing through.',
      more: [
        'When you carry it, you are managing one very specific border: when you open to someone and when you close. That door does not sit in the same place all the time — it moves with your emotional weather, which is why on a single day you can want closeness and then not be able to stand anyone.',
        'Conflict comes from deciding that border in the heat of the moment. Opening or closing on the emotion of the day creates friction around you. Giving it time before you open or close is what turns this energy into real closeness rather than collision.'
      ]
    },
    7: {
      theme: 'Leadership and Direction',
      text: '**Guiding toward what comes next**, often from the back rather than the front. Its gift is a natural authority people choose to follow; its shadow, the urge to control the course, or to take it by force.',
      more: [
        'When you carry it, you tend to end up giving the group direction whether or not you set out to. You see where it would be good to go and you point at it, often from the second row and without needing to hold the title.',
        'Its shadow is grabbing the wheel. This energy has authority when it is granted, not when it is taken: pushing to lead usually achieves the opposite, and people stop following.'
      ]
    },
    8: {
      theme: 'Contribution',
      text: '**Bringing something of your own** that makes a difference, and giving a voice to what matters. Its gift is an authenticity others want to join; its shadow, contributing for the recognition and coming away empty.',
      more: [
        'When you carry it, contributing something of your own — and having it register — matters to you. This is not about being seen: it is about giving voice to what you think is worth it, in a way that invites others in.',
        'It hollows out when recognition becomes the motive. Contributing to be noticed leaves an empty feeling even when it goes well. What sustains this energy is that the contribution genuinely matters to you, applauded or not.'
      ]
    },
    9: {
      theme: 'Focus on Detail',
      text: '**Narrowing in** on the details that get something finished. Its gift is an attention that sees things through; its shadow, disappearing into the small stuff, or scattering.',
      more: [
        'When you carry it, you have an uncommon power of concentration: you can hold your attention on the detail that has to be right for something to actually get finished. It is quiet, practical energy — the kind that completes what others leave at 90%.',
        'Its flip side is getting lost in small things. The same focus that finishes can trap you in an irrelevant detail for hours. It is worth lifting your eyes now and then to check that the detail still serves the whole.'
      ]
    },
    10: {
      theme: 'Self-love',
      text: '**Being true to yourself** — behaving as who you actually are. Its gift is an authenticity that does not sell itself out; its shadow, self-criticism, or bending out of shape to fit in.',
      more: [
        'When you carry it, there is a demand running underneath: behave in line with who you are. It is not a nice idea, it is nearly physical — when you betray yourself to fit in, your body knows before your head does.',
        'Its shadow has two faces: contorting yourself to please, or flipping to the other side and beating yourself up for falling short. Neither is self-love. This energy holds when you treat yourself with the same decency you would show anyone else.'
      ]
    },
    11: {
      theme: 'Ideas',
      text: '**A mind full of ideas**, there to be shared and to make sense of experience. Its gift is a conceptual richness that sparks things in other people; its shadow, the pressure to act on every idea, when ideas are for sharing more than for doing.',
      more: [
        'When you carry it, your head fills with ideas: images, connections, ways of framing what is happening. It is a real richness, and much of its point is to be **shared** — ideas are stimulation for others, not a work plan for you.',
        'The usual drain is believing every idea must be executed. That is where the pressure starts: you pile up mental projects going nowhere and end up feeling in debt to yourself. Ideas are for thinking and telling; very few of them ask for action.'
      ]
    },
    12: {
      theme: 'Cautious Expression',
      text: '**Speaking when the mood and the moment are right.** Its gift is a word that lands and moves people at exactly the right instant; its shadow, speaking out of tune, or holding back out of caution.',
      more: [
        'When you carry it, your words depend heavily on timing. There are days when what comes out has a depth that moves whoever hears it, and days when it simply is not there — and forcing it does not work.',
        'The caution this energy brings is not shyness: it is a sense of the right moment. Speaking out of time takes the shine off what you had to say. Waiting for the moment when the mood is with you is what makes it land.'
      ]
    },
    13: {
      theme: 'Listening',
      text: '**Listening and remembering** — taking in other people\u2019s stories and secrets and making sense of them. Its gift is an ear that invites trust; its shadow, carrying what others put down.',
      more: [
        'When you carry it, people tell you things. Without setting out to, you end up being the place where others leave their stories and sometimes their secrets, and you have a good ear for finding the sense in them and handing it back.',
        'The weight comes from keeping everything you are handed. Listening does not oblige you to carry. Learning to receive without holding on is what keeps this energy a gift rather than a load.'
      ]
    },
    14: {
      theme: 'Power for Resources',
      text: '**Fuel for work and resources** — the drive that gives someone\u2019s own effort real power. Its gift is a generative force that multiplies; its shadow, working hard with no reason behind it and no values steering it.',
      more: [
        'When you carry it, you have a drive that generates resources and can sustain your own work with real force. It is energy that prospers, and it tends to pull others along in its wake.',
        'The question that orders it is not *how much* but *what for*. With no direction you care about, this drive gets spent accumulating for its own sake and ends up feeling empty. With a reason behind it, it is one of the most fertile energies in the chart.'
      ]
    },
    15: {
      theme: 'Love of Diversity',
      text: '**A love of people in all their extremes** — an attraction to different rhythms and different ways of living. Its gift is making room for what is unlike itself; its shadow, an erratic rhythm, or judging everyone else\u2019s.',
      more: [
        'When you carry it, human variety draws you: different rhythms, ways of living unlike your own, people who fall outside the average. You have room for what is different without needing to tame it.',
        'Your own rhythm, though, is anything but regular: you can swing from intense stretches to periods of almost nothing. That is not inconsistency, it is your beat. What is worth watching is judging other people\'s rhythm by yours.'
      ]
    },
    16: {
      theme: 'Enthusiasm and Skill',
      text: '**Enthusiasm and skill** — talent that shows itself and sharpens with practice. Its gift is an enthusiasm that catches, and mastery at the end of it; its shadow, enthusiasm with nothing underneath.',
      more: [
        'When you carry it, enthusiasm is your fuel: when something grabs you, you throw yourself in and learn fast, and that enthusiasm is catching for whoever is nearby.',
        'Its shadow is enthusiasm with nothing under it — leaping at something on the high and finding out the craft was missing. This energy is at its best when the impulse turns into repeated practice: that is where talent becomes real skill.'
      ]
    },
    17: {
      theme: 'Opinions',
      text: '**The mind forming opinions**, running ahead in order to organize. Its gift is opinions that give things a shape; its shadow, presenting a point of view as a fact.',
      more: [
        'When you carry it, your mind forms opinions readily: it spots a pattern, gets ahead of it and proposes how something ought to be organised. Used well, it is energy that structures and saves everyone else work.',
        'Trouble starts when a view is presented as a fact. An opinion offered as an opinion opens a conversation; offered as truth, it invites resistance. The only difference is in how you say it.'
      ]
    },
    18: {
      theme: 'Correction',
      text: '**The instinct to fix what has gone crooked.** Its gift is a sharp eye that improves and protects; its shadow, criticism that never stops, and perfectionism.',
      more: [
        'When you carry it, you spot what has gone crooked before anyone else: the flaw in the plan, the crack in the argument, the thing that has been quietly degrading while no one looked. It is protective energy, even when it does not come across that way.',
        'Its shadow is never switching off. Correcting around the clock — and above all correcting yourself — turns a gift into attrition. The knack is choosing what deserves the correction: not everything improvable needs improving today.'
      ]
    },
    19: {
      theme: 'Sensitivity to Needs',
      text: '**Picking up what people need**, materially and emotionally. Its gift is a fine ear for what is missing; its shadow, neediness of its own, or a sensitivity turned raw.',
      more: [
        'When you carry it, you pick up what people need before they ask: the practical support, the bit of affection, whatever is missing for someone to be all right. It is a very fine sensitivity and very useful to any group.',
        'The cost is that you feel your own needs at full volume too, and telling yours from other people\'s can be hard. Naming what you need — instead of waiting to be read — is what keeps this energy from turning into demand.'
      ]
    },
    20: {
      theme: 'The Now',
      text: '**The present moment** — awareness and expression in the same breath. Its gift is action that is spontaneous and exactly right; its shadow, busyness, or talking without being there.',
      more: [
        'When you carry it, you live pressed right up against the present: you perceive and act in the moment, without the detour of thinking it through first. When you are genuinely present, what comes out is on target.',
        'Its flip side is busyness: doing and talking on autopilot, filling the moment instead of inhabiting it. The difference between the two is not speed, it is whether you are actually there when you act.'
      ]
    },
    21: {
      theme: 'Control',
      text: '**The will to run your own territory** and your own resources. Its gift is a legitimate authority over what is yours; its shadow, wanting to control everything, or feeling controlled.',
      more: [
        'When you carry it, you need to run your own affairs: your time, your money, your space, your way of doing things. It is not a hunger for power over anyone; it is that being decided for sits very badly with you.',
        'It bends in two directions: trying to control what is not yours to control, or living with the sense of being controlled. Marking out what your territory actually is — and letting the rest go — is what turns this into healthy authority.'
      ]
    },
    22: {
      theme: 'Grace',
      text: '**Charm and emotional openness** — knowing how to listen and how to let someone in. Its gift is an emotional presence that draws people; its shadow, closing up when the mood is not there.',
      more: [
        'When you carry it, you have an emotional openness that draws people in: you listen well, you make room, and you create a climate where people open up. The charm is not put on, and it works.',
        'It depends on mood, and that has to be accepted. When the feeling is not there, the move is to withdraw, not to fake availability. Forcing grace when it is absent leaves a grimace.'
      ]
    },
    23: {
      theme: 'Assimilation',
      text: '**Turning what you know into something simple.** Its gift is making the complicated clear — the moment it clicks for someone else; its shadow, saying it at the wrong time and not being understood.',
      more: [
        'When you carry it, you can take something only you see clearly and put it into plain words. When you get it right, there is that *click* where everyone suddenly understands.',
        'And when the timing is off, the very same thing sounds like eccentricity. It is not that you are wrong: you arrived before there was a question. Almost all of this energy\'s effectiveness is in the when.'
      ]
    },
    24: {
      theme: 'Rationalization',
      text: '**The mind circling back** to the same thought until it yields. Its gift is the insight that only comes from going over it again; its shadow, the loop with no way out.',
      more: [
        'When you carry it, your mind returns to the same thing again and again. It circles, wanders off, comes back — and on one of those passes, unannounced, the understanding that would not come simply arrives.',
        'The drain comes from demanding a conclusion on every pass. This process does not speed up: chewing things over is how it works. Letting it run without forcing yourself to close the matter is what lets the clarity show up.'
      ]
    },
    25: {
      theme: 'Universal Love',
      text: '**Innocence, and love that wants nothing back.** Its gift is a clean, unconditional devotion; its shadow, losing that innocence to hurt or to ego.',
      more: [
        'When you carry it, you have access to a kind of love that does not discriminate: a love of life itself, not of what life hands you. It can turn up with strangers, with animals, with anything.',
        'The hard part is that the same innocence is exposed. When the world hits back, you can harden all at once so as never to feel it again. Recovering that openness after a blow is this energy\'s long work.'
      ]
    },
    26: {
      theme: 'Persuasive Transmission',
      text: '**Making the case** — the will to communicate something and give it worth. Its gift is a power of persuasion that moves people; its shadow, manipulation and half-truths.',
      more: [
        'When you carry it, you know how to sell what is worth selling: to present, to persuade, to put something — yours or someone else\'s — in front of the people who should see it. It is pure willpower channelled into words.',
        'The edge is the stretched truth. This energy can exaggerate without noticing, and that is where trust breaks. It persuades just as well telling it straight; it simply takes more effort.'
      ]
    },
    27: {
      theme: 'Care',
      text: '**Taking care of others** and holding them up. Its gift is a care that genuinely nourishes; its shadow, smothering, or giving until there is nothing left.',
      more: [
        'When you carry it, caring comes naturally: feeding, holding, taking charge of whoever needs it. It is nourishing and very concrete energy — actually taking responsibility, not just saying you care.',
        'Its limit is your own. You are so good at caring that you can end up with nothing left, and then feel guilty for stopping. Caring for yourself takes nothing from anyone: it is what makes carrying on possible.'
      ]
    },
    28: {
      theme: 'The Search for Meaning',
      text: '**Betting on something worth it** — the search for a life with meaning in it. Its gift is finding a purpose worth the fight; its shadow, fighting for its own sake, and the fear of a life that means nothing.',
      more: [
        'When you carry it, living for its own sake is not enough: you need what you do to mean something. That search takes you into intense experiences, including the frightening ones.',
        'Underneath this energy is a wrestle with meaninglessness, and it does not resolve once and for all. It is worth telling apart the risk that teaches from the risk that only wears you out: the first gives you meaning, the second just leaves you tired.'
      ]
    },
    29: {
      theme: 'Commitment',
      text: '**Saying yes and seeing it through.** Its gift is a persistence that finishes what it starts; its shadow, saying yes too often, or where it never should have.',
      more: [
        'When you carry it, your capacity to commit is enormous: when you say yes, you go all the way in and see it through even when the road turns bad.',
        'Which is exactly why the yes is the delicate part. This energy says yes easily, and then you spend years holding up what you accepted in two seconds. Before you commit, check the yes came from your body and not from momentum.'
      ]
    },
    30: {
      theme: 'Desire',
      text: '**Desire and longing** — the fire of wanting that drives a life of experience. Its gift is a passion that fuels everything; its shadow, being eaten by cravings that never settle.',
      more: [
        'When you carry it, desire moves you: there are things that burn in you and that you want to live. That intensity is what takes you into experiences you would otherwise never touch.',
        'It is also what burns. The longing can turn insatiable, or leave you stuck in the fantasy of what has not arrived yet. Feeling the desire without automatically obeying it is what makes it liveable.'
      ]
    },
    31: {
      theme: 'Leadership Through the Voice',
      text: '**Speaking for a group** and standing for it. Its gift is leadership other people elect to follow; its shadow, leading without a real mandate, or out of plain ambition.',
      more: [
        'When you carry it, you speak and the group listens: you have a voice that naturally moves to the front and proposes where to go. It is leadership by word, not by rank.',
        'Its condition is the same as any healthy leadership: that people want to hear you. When the voice imposes itself without being asked for, it stops guiding and starts ordering — and the group backs away.'
      ]
    },
    32: {
      theme: 'Continuity',
      text: '**An instinct for what will last** — and for what has to change in order to. Its gift is a nose for lasting value; its shadow, a fear of failure and of change that freezes everything.',
      more: [
        'When you carry it, you have an unusual nose for what will last and what will not. It is conservative instinct in the good sense: it protects what deserves to be sustained from being wrecked.',
        'Its shadow is fear of failure, which can freeze you before you start. Caution informs well and decides badly: use it to calibrate the pace, not to avoid moving.'
      ]
    },
    33: {
      theme: 'Retreat and the Telling',
      text: '**Stepping away, then telling it back.** Its gift is a wisdom shared after time to reflect on it; its shadow, not honoring the need to withdraw — or telling too much, or too little.',
      more: [
        'When you carry it, you need to withdraw in order to digest what you have lived — and what you can later tell comes out of that retreat. You are one of the people who turn experience into a story with a point.',
        'The retreat is part of the process, not an escape. Without it, experience piles up unsorted and you never get anything clear out of it. And what you have not digested yet is better left untold for now.'
      ]
    },
    34: {
      theme: 'Power',
      text: '**Raw power** — an independent force that is always busy. Its gift is enormous productive capacity; its shadow, busyness for its own sake, and moving before anything was answered.',
      more: [
        'When you carry it, you have notable physical power: when something genuinely moves you, you produce a force that looks excessive to other people. It is the purest energy of the [Sacral](center:sacral).',
        'It is also solitary energy: it works when you are busy with what is yours, not when you lend it to what is not. Being busy is not the same as being well spent.'
      ]
    },
    35: {
      theme: 'Hunger for Experience',
      text: '**Wanting to have done everything** and to keep moving. Its gift is an appetite for life that pushes forward; its shadow, the restlessness of never arriving.',
      more: [
        'When you carry it, you want to try everything: the new calls you and repeating the familiar bores you senseless. You collect experiences at a rate that makes other people dizzy.',
        'The sediment comes afterwards. This energy is off looking for the next experience before it has taken anything from the last, which can leave a sense of having lived a lot and learned little. Stopping to look back is what turns experience into wisdom.'
      ]
    },
    36: {
      theme: 'Crisis and the New',
      text: '**Emotional upheaval, and what it opens.** Its gift is growth through intensity; its shadow, diving into drama or crisis unprepared.',
      more: [
        'When you carry it, life keeps putting you into crisis and unexplored ground — and that is precisely where you learn what cannot be learned any other way.',
        'The wear comes from going into everything indiscriminately, or diving at the new out of sheer emotional restlessness. Experience teaches when it arrives in its own time; chased desperately, it only exhausts.'
      ]
    },
    37: {
      theme: 'Friendship and Agreements',
      text: '**Warmth that builds a family** — the bonds and agreements that hold a group together. Its gift is an affection that creates belonging; its shadow, dependency, or agreements quietly broken.',
      more: [
        'When you carry it, agreements matter to you: loyalty, the explicit bargain, knowing who has committed to what. It is the energy of family and of tribe, in the broadest sense.',
        'Be careful with bargains accepted half-heartedly to keep the peace. Those always come back with interest. An agreement only holds if you actually wanted to sign it.'
      ]
    },
    38: {
      theme: 'Struggle with Meaning',
      text: '**Standing up for something that matters.** Its gift is persistence with a purpose behind it; its shadow, fighting for the sake of it, or sheer stubbornness.',
      more: [
        'When you carry it, your capacity to stand your ground is enormous: when something is worth it, you hold on through difficulty far past what looks reasonable.',
        'The key question is always what you are fighting for. The same energy poured into a battle that does not matter turns into stubbornness and pure attrition. Choosing the fight well is half of it.'
      ]
    },
    39: {
      theme: 'Provocation',
      text: '**Poking at the mood** to get at what is really going on. Its gift is provocation that brings spirit to the surface; its shadow, needling for nothing, or plain moodiness.',
      more: [
        'When you carry it, you provoke: without meaning to, your presence pushes people to move something, to react, to release whatever they had stuck.',
        'It is an uncomfortable and often valuable role. Its shadow is provoking for its own sake, or doing it out of your own bad mood. Provoking so something comes unstuck is not the same as needling.'
      ]
    },
    40: {
      theme: 'Giving and Rest',
      text: '**Providing, then withdrawing to recover.** Its gift is a generosity that also knows how to stop; its shadow, working without pause — or refusing to give at all.',
      more: [
        'When you carry it, you have a will to work and an equally clear right to rest: you give what is yours, and then you need to withdraw and recover. The two go together.',
        'The usual wear is giving more than was agreed and ending up feeling nobody gives back. This energy works on a fair exchange: what you put in against what you get, with the rest included in the deal.'
      ]
    },
    41: {
      theme: 'The Imagination That Starts Desire',
      text: '**The daydream that starts everything** — every new experience is imagined before it is lived. Its gift is a fantasy that opens doors; its shadow, imagination cut loose from reality, or the ache of a want with nowhere to go.',
      more: [
        'When you carry it, you are the start of everything that has not happened yet: the fantasy, the daydream, the \'what if\' that sets a new desire going. It is the system\'s initial spark.',
        'Its pressure is wanting something different and not knowing what. That restlessness does not always have to be resolved by acting: often it is just imagination looking for a way out.'
      ]
    },
    42: {
      theme: 'Completion',
      text: '**Finishing what was begun** and closing the cycle. Its gift is the capacity to see things through to the end; its shadow, starting without finishing, or a fear of endings.',
      more: [
        'When you carry it, your part is to close: to take processes already under way through to the end and finish them properly. You have staying power for exactly the last stretch, the one that most often gets stuck.',
        'Its difficulty is getting into cycles that were never yours and then not being able to leave until they are done. Before you go in, look at whether you actually wanted to: once inside, walking away half-finished will cost you.'
      ]
    },
    43: {
      theme: 'Mental Intuition',
      text: '**Knowing something before anyone else does**, and all at once. Its gift is an original insight that changes the picture; its shadow, insisting on saying it at the wrong moment and being met with blank faces.',
      more: [
        'When you carry it, understanding arrives suddenly and hard to explain: you know something all at once, without the logical path to back it up. It is a singular way of knowing, and it usually runs ahead.',
        'The problem is translation. What is crystal clear inside can sound outlandish outside if you drop it unprepared. Finding the words and the moment is what turns this insight into something others can use.'
      ]
    },
    44: {
      theme: 'The Instinct for the Past',
      text: '**Reading what has happened before** — patterns, people, timing. Its gift is a nose for who and when; its shadow, the fear that the past is about to repeat.',
      more: [
        'When you carry it, you smell people\'s past: you sense what someone is about, whether they can be trusted, what history they bring. It is a fast instinct, and it is usually right.',
        'Its shadow is the fear it drags along: it can flag patterns that no longer exist and make you suspicious with no present cause. Listen to the warning, but check it against what is actually in front of you today.'
      ]
    },
    45: {
      theme: 'The Voice of Resources',
      text: '**The voice that gathers and shares out** what belongs to everyone. Its gift is stewardship that takes care of the group; its shadow, hoarding, or a sense of entitlement.',
      more: [
        'When you carry it, you have a voice for the material and the shared: you know how to talk about resources, to distribute and administer what belongs to everyone. It is natural authority over the common pot.',
        'It bends when that authority turns into ownership, or when things are administered without consulting the group. What sustains this energy is that the distribution be *felt* as fair, not merely be efficient.'
      ]
    },
    46: {
      theme: 'Love of the Body',
      text: '**Being at home in a body**, and in the right place. Its gift is the knack of being where you need to be when you need to be there; its shadow, neglecting the body, or driving it too hard.',
      more: [
        'When you carry it, you have a good relationship with being here: you like your body, the physical, the experience of being alive. And you tend to have the luck of being in the right place at the right time.',
        'That luck is not pure chance: it depends heavily on whether you are at ease in your own body. Mistreat or despise it and the sense of being where you should be goes with it.'
      ]
    },
    47: {
      theme: 'Mental Realization',
      text: '**The push to make sense of confusion** until it finally clicks. Its gift is turning a mess into understanding; its shadow, getting stuck in the feeling that none of it means anything.',
      more: [
        'When you carry it, your mind works with disordered material: memories, loose images, pieces of experience that do not fit together yet. And at some point, on its own, it finds the sense.',
        'In the meantime the feeling is confusion, and that is normal. The pressure to make sense of it *now* is the one thing that makes the process worse. Understanding here arrives late and arrives by itself.'
      ]
    },
    48: {
      theme: 'Depth',
      text: '**A well to draw from** — depth of talent and of knowing. Its gift is having what the situation was missing; its shadow, the fear of not being enough, or not being ready.',
      more: [
        'When you carry it, you have a well of depth to draw on when it is needed: a knowing that is not theoretical but sits in the instinct.',
        'Its constant companion is the feeling of not knowing enough. That feeling is nearly always false, and it is what keeps pushing you deeper. Do not wait to feel ready, because that feeling is not coming.'
      ]
    },
    49: {
      theme: 'Principles',
      text: '**Principles, and revolution when they are crossed** — the yes or no that decides who belongs. Its gift is transforming relationships from a clear place; its shadow, rejection turned rigid, or upheaval without care.',
      more: [
        'When you carry it, your principles are clear to you and you notice at once when someone crosses them. It is the energy that decides what is acceptable and what breaks a bond.',
        'Its shadow is the abrupt break: cutting all at once when tension has built up without any warning given. Saying where your line is, in time, prevents most of those breaks.'
      ]
    },
    50: {
      theme: 'Values',
      text: '**Guarding what keeps a group well** — the values and the rules underneath it. Its gift is a keeper of values other people rest on; its shadow, over-responsibility, and the fear of letting everyone down.',
      more: [
        'When you carry it, you hold the group\'s values: you sense what keeps a family or a team healthy, and also what is rotting it. There is something of the guardian in this energy.',
        'The weight is feeling responsible for everyone. This energy can take on the care of an entire group until it is spent. Your responsibility is the values, not carrying the consequences single-handed.'
      ]
    },
    51: {
      theme: 'Impulse and Shock',
      text: '**Going first** — the jolt that wakes everyone up. Its gift is a courage that shakes others into motion; its shadow, competitiveness, or plain recklessness.',
      more: [
        'When you carry it, you have the nerve to go where others do not, and a particular relationship with shock: life\'s blows rearrange you rather than sink you.',
        'Its flip side is competitiveness and collision for its own sake. This energy wakes people up — you and them — when there is a point behind it; without one, it just leaves people shaken for no reason.'
      ]
    },
    52: {
      theme: 'Stillness and Focus',
      text: '**Stopping in order to see the whole.** Its gift is a calm that makes concentration possible; its shadow, inertia — or the restlessness of not being able to sit still.',
      more: [
        'When you carry it, you know how to sit still. That stillness is not passivity: it is what lets you concentrate and see in detail what would escape you in motion.',
        'Tension shows up when your body wants to stop and you make it carry on, or the other way round. This energy runs in cycles of stillness and movement; forcing the wrong one is what makes it uncomfortable.'
      ]
    },
    53: {
      theme: 'Beginnings',
      text: '**Starting new cycles** — the pressure and the fuel to begin. Its gift is the push that gets new things moving; its shadow, beginning endlessly and completing nothing.',
      more: [
        'When you carry it, you start things: you feel the pressure to begin new cycles, and you feel it almost physically when something has stayed the same for too long.',
        'Starting does not oblige you to finish — the ending is not always yours. What is worth checking is whether you are beginning something that genuinely wants to begin, or just because you cannot bear the stillness.'
      ]
    },
    54: {
      theme: 'Ambition',
      text: '**The drive to rise**, materially and spiritually. Its gift is an ambition that lifts everything with it; its shadow, chasing the climb for someone else\u2019s approval, or overreaching.',
      more: [
        'When you carry it, you have ambition and an appetite to rise: to improve your position, your circumstances, your place in things. It is a powerful engine of transformation.',
        'It bends when the climb becomes the only aim and you forget why you wanted to climb. And much of this ascent depends on being recognised by others, which is not fully in your hands.'
      ]
    },
    55: {
      theme: 'Abundance of Spirit',
      text: '**Emotional richness, and faith.** Its gift is a depth of feeling and a faith that carries; its shadow, letting melancholy or the swing of a mood make the decisions.',
      more: [
        'When you carry it, your mood has a very wide range: you go from fullness to emptiness with no clear outside cause, and that swing is yours, not a problem to be solved.',
        'The long lesson is to stop justifying each state and to stop deciding at the extremes. The mood will drop and it will come back up. What you decide in the meantime is what is worth watching.'
      ]
    },
    56: {
      theme: 'The Stimulating Story',
      text: '**The story that holds a room** — ideas and experience told so they land. Its gift is a telling that opens horizons; its shadow, embellishing, or losing the thread.',
      more: [
        'When you carry it, you know how to tell a story: you hold people with words, you keep them awake, you turn what you have lived into something worth hearing.',
        'Its shadow is telling for the sake of telling. Stimulation with nothing underneath becomes noise, and it shows. What gives a story its weight is having actually lived what you are telling.'
      ]
    },
    57: {
      theme: 'Intuition in the Now',
      text: '**Instinct that cuts straight through the present.** Its gift is a quiet, unerring knowing in the instant; its shadow, a fear of the future that stops everything.',
      more: [
        'When you carry it, you have a very fine ear for the present: you sense the danger or the health of a situation instantly, and you are almost always right.',
        'It is a warning that sounds **once**. Start analysing it and it is gone. Which is why this energy asks you to trust the first signal, even when you cannot justify it.'
      ]
    },
    58: {
      theme: 'Vitality and Improvement',
      text: '**The joy of being alive**, and the push to make things better. Its gift is a vitality that fuels improvement; its shadow, restlessness, or criticism with the joy taken out of it.',
      more: [
        'When you carry it, there is a background joy at being alive, and out of it comes a push to improve what is around you: what works badly bothers you and you want it fixed.',
        'When that joy goes missing, it usually means you are correcting too much — yourself or everyone else. The vitality comes first; the improvement comes out of it, not the other way round.'
      ]
    },
    59: {
      theme: 'Intimacy',
      text: '**Getting through someone\u2019s defenses** to make a real bond, sexual included. Its gift is the power to create closeness; its shadow, building walls — or walking straight through someone else\u2019s.',
      more: [
        'When you carry it, you know how to cross the distance to another person: you break through barriers and reach intimacy with an ease others find hard.',
        'Its care is the other person\'s pace. This energy can move closer faster than the other can hold, and forcing intimacy closes exactly what you were trying to open.'
      ]
    },
    60: {
      theme: 'Accepting the Limit',
      text: '**Taking the limit as a starting point.** Its gift is turning constraint into possibility; its shadow, getting stuck in the limit and sinking with it.',
      more: [
        'When you carry it, you live with limits: what there is, what cannot be, the concrete restriction. And out of accepting it comes mutation — something new that only appears inside the frame.',
        'Its feeling is a melancholy for what does not fit, and it is real. It does not need fixing, and the frame does not need forcing. Nearly everything this energy produces is born precisely from having accepted the limit.'
      ]
    },
    61: {
      theme: 'Inner Truth',
      text: '**The pressure to know the unknowable.** Its gift is an inspiration that goes looking for the bottom of things; its shadow, the mental strain of needing to know it all.',
      more: [
        'When you carry it, there is a pressure to know: to understand the bottom of things, the final why. It is not light curiosity, it is a restlessness that pushes.',
        'And it guarantees no answer. That is the hard part: the pressure exists whether or not a conclusion does. Holding the question without manufacturing an answer to calm yourself is exactly what this energy asks.'
      ]
    },
    62: {
      theme: 'Detail and Order',
      text: '**Naming things and putting them in order**, so they can be said precisely. Its gift is a clear, well-ordered way of explaining; its shadow, drowning in detail, or over-explaining.',
      more: [
        'When you carry it, you bring order: you name things, you classify, you give structure to detail so it can be handled. It is an enormous and fairly unrecognised contribution.',
        'Its risk is the detail hiding the whole. When you find yourself arguing over a triviality, it is usually a sign to look up and check what the matter was actually about.'
      ]
    },
    63: {
      theme: 'Doubt',
      text: '**The pressure to question and check.** Its gift is a healthy doubt that tests things properly; its shadow, suspicion that corrodes, and anxiety.',
      more: [
        'When you carry it, you doubt whatever is put in front of you: you look for the flaw, the crack, the thing that does not add up. It is an invaluable filter — someone has to ask whether this really works.',
        'Turned inward, though, it paralyses: doubting yourself without pause protects nothing. This doubt earns its keep applied outward, not when it becomes self-criticism.'
      ]
    },
    64: {
      theme: 'Fertile Confusion',
      text: '**A press of half-processed images** looking for a way to arrange themselves. Its gift is a richness of imagery that finally resolves into understanding; its shadow, the overwhelm of trying to force it before it is ready.',
      more: [
        'When you carry it, your head fills with unsorted images: fragments, memories, loose scenes that do not mean anything yet. It is raw material waiting to set.',
        'That state of confusion is **normal here**, not a fault. The order comes on its own, in its own time, and nearly always once you have stopped pushing for it. Forcing it is the one thing that makes it worse.'
      ]
    },
  },

  // ── Initial report (second person, addressed to the chart's owner) ───────
  report: {
    intro: {
      title: 'What Human Design Is',
      paragraphs: [
        'Human Design is a system for getting to know yourself. It borrows from astrology, the *I Ching*, the kabbalistic tree of life, the chakras, and a little quantum-physics vocabulary. Give it your date, time and place of birth and it draws a "chart" — the [*bodygraph*](section:chart) — describing how your energy is wired: how you make good decisions, how you spend and recover energy, and how you work best with the world around you. It isn\u2019t science, and that\u2019s worth saying plainly. It\u2019s a symbolic framework, and its worth lies in whether you find it useful as a mirror, not in whether it can be proven.'
      ]
    },
    ants: {
      title: 'The Ant Analogy',
      paragraphs: [
        'Think of an ant colony. There is no such thing as a generic ant: there are scouts that go out and explore, soldiers built to defend, workers that keep the nest running, and a queen doing something else entirely. None of them is better than the others. Each is built to work in a particular way, and the colony runs precisely because they are not all the same. Ask a scout to do a soldier\u2019s job and you will wear it out doing something it was never built for.',
        'People are not so different. We each have our own way of acting and relating, shaped by how our energy is put together. The common mistake is assuming we should all perform, decide and get started the same way. Human Design says the opposite, and it calls those different ways [types](section:type). That shift in perspective is the useful part: **stop measuring yourself against someone else\u2019s design.**'
      ]
    },
    chart: {
      title: 'The Bodygraph',
      paragraphs: [
        'Your chart is drawn on a diagram of the body called the **bodygraph**. The nine shapes are the centers; the lines joining them are the channels, each running from one gate to another (there are 64 gates). Every center governs a particular function, and together they show how your energy moves.',
        'What makes the chart yours is which of those centers, channels and gates are switched on: colored centers are defined, empty ones are open. Your type, your authority and the way you work all fall out of that combination — and that is what the rest of this report unpacks.'
      ]
    },
    conditioning: {
      title: 'Defined, Undefined, and Conditioning',
      paragraphs: [
        'A defined center works the same way every day. It is an energy of your own: consistent, always there, and it does not change depending on who is in the room. An undefined (open) center is not a flaw — it simply means you do not carry that energy yourself. Instead you pick it up from the people and places around you, and amplify it.',
        'Human Design has a word for everything that pulls you away from living as you are built: **conditioning**. These are the layers we take on from upbringing, culture, fear, or what others expect of us, and that end up making us act like someone we are not. Your open centers are the main door it comes in through. Noticing that is the first step of the [deconditioning](section:experiment) mentioned earlier: letting go of what was borrowed until you are back to yourself — and above all, dropping the habit of measuring yourself against how other people work.'
      ]
    },
    experiment: {
      title: 'Human Design as an Experiment',
      paragraphs: [
        'Human Design is not asking you to believe it. It is asking you to **try it**. Rather than taking it as doctrine, the invitation is to live according to your design and watch what happens in your own life — whether things run with less friction.',
        'The experiment is simple to describe, even if it takes a while to live: **make your decisions with [your strategy](section:strategy) and [your authority](section:authority)** — the two tools coming up — instead of going along with what is expected of you, or with haste, or with your head, or with the patterns you have been running for years. Bit by bit it brings you back to your natural way of working. That process is called **deconditioning**, and everything else here is in service of it.'
      ]
    },
    collective: {
      title: 'Your Place in the Collective',
      intro:
        'Back to [the ants](section:intro). The Human Design types describe **the different ways a person can be built to use energy**. No type is better than another, and the whole thing works precisely because we are not all alike — a world of nothing but Generators, or nothing but Projectors, would not work at all.',
      bullets: [
        '**Generators (~37%) and Manifesting Generators (~33%)** — together, close to 70% of everyone. They are the builders, with life-force energy that keeps going when they are doing what genuinely lights them up. They are the engine of the human world.',
        '**Projectors (~20%)** — no constant energy of that kind. Their gift is seeing, guiding and directing other people. They shine when they are recognized and invited, not when they are pushing themselves to keep a Generator\u2019s pace.',
        '**Manifestors (~9%)** — the initiators. They start things from nothing and make an impact without waiting for anyone. Their job is to tell the people their actions will touch, and to manage energy that comes and goes.',
        '**Reflectors (~1%)** — the rarest of all. A mirror for their surroundings, sampling the health of the group and of the place they live in.'
      ],
      outro:
        'The most common mistake is holding yourself to someone else\u2019s design: a Projector demanding a Generator\u2019s stamina of themselves, or a Generator frustrated that they do not launch things like a Manifestor.'
    },
    leadIn: {
      strategy: 'Your strategy is your natural way of getting involved in things — of committing to them without forcing them.',
      authority: 'Your authority is how you are built to make decisions. If strategy tells you *how and when to act*, **authority tells you how and when to decide** — every yes and every no. Your mind is good at gathering information, working through a decision already made, and advising other people. But **your mind is not a reliable place to decide from** when it comes to your own life. Those decisions belong to something more bodily. That is *authority*.',
      definition: 'Definition describes how your defined centers group together: one connected block, or several separate ones.',
      practice: 'If you take one thing away from all of Human Design, take this: **living your design means acting on [your strategy](section:strategy) and deciding from [your authority](section:authority)**. Everything else adds nuance. These two are what actually change your day.',
      centers: 'Here are the nine centers in your chart:',
      purpose: 'And to close, the backdrop: where your design points over the long run.'
    },
    purpose: {
      title: 'Your Purpose',
      paragraphs: [
        'Your **incarnation cross** is the background theme of your life — the general direction your design points in. It is made of **four gates**: your Personality Sun and Earth, and your Design Sun and Earth. Those are the four heaviest activations in your chart.',
        'One thing before we go on: **the word "purpose" is misleading here**. It is not a mission you have to discover, and it is not something you can force or hurry. It is the **background theme** of your life, and **it unfolds on its own**. Human Design is explicit about this: do not go looking for it — put your attention on [your strategy](section:strategy) and [your authority](section:authority), and the theme lives itself out.',
        'Most people recognize it looking back, not looking forward. So read it with curiosity, not as something still to be done.'
      ],
      outro:
        'And here is the part that matters: **you do not chase your purpose, you fulfill it by living your design**. There is nothing to *do* with this cross except recognize it. What actually changes your day is the previous section — acting on [your strategy](section:strategy) and deciding from [your authority](section:authority). Get that right and the rest takes care of itself.'
    },
    crossAngle: {
      right: 'Yours is a **right angle** cross: your path is **personal**. It unfolds mostly through your own experience — what you live, try and get through yourself. Other people matter, of course, but you are the axis of the journey.',
      left: 'Yours is a **left angle** cross: your path is **transpersonal**. Much of what matters will reach you through other people, and what is yours gets fulfilled in relationship with them. The encounters are not incidental to your life — they are the material it is built from.',
      juxtaposition: 'Yours is a **juxtaposition** cross: a **fixed, singular** fate. Neither personal nor transpersonal — a very specific role you hold fairly independently of what goes on around you. It is the rarest angle, and it belongs to the 4/1 profile alone.'
    },

    type: {
      generator: [
        'You carry your **own engine**. That is the short version: a working energy that spends itself over the day and refills overnight, built to be poured into whatever genuinely grabs you. You are also the most common type — roughly **a third of people** are pure Generators.',
        'That engine is a defined [Sacral Center](center:sacral), the life-force of the whole system. It is not a stop-start energy: it is steady, and it pays off when it is aimed at something concrete that pulls you, rather than spread across obligations that leave you cold. Which is why your way of getting things right is not planning it all out from your head, but **reacting to what life puts in front of you**.',
        'In practice your body speaks before your mind catches up: something concrete turns up — a proposal, a question, a situation — and there is a pull toward it, or an almost physical push away. That reaction is more reliable than any reasoning you do afterwards. How to use it day to day is in [your strategy](section:strategy); how to tell whether you are getting it right, in [your signals](section:signals).'
      ],
      'manifesting-generator': [
        'You are a [Generator](type:generator) with a shortcut. You have the same **working engine** they do, plus a direct line from that engine to action: when something lights you up, you do not just have energy for it — you **start fast and make it real**. There are a lot of you, close to a third of the population.',
        'The mechanics are that direct line: a defined [Sacral](center:sacral) — the engine — with your [Throat](center:throat) wired to a motor — the outlet. Hence the way you move: **many-sided, quick and non-linear**. You skip steps, run several things at once, and double back later to finish what you left. It is not disorder or a lack of staying power; it is how you get there sooner.',
        'Your particular way of wearing yourself out is the opposite one: throwing yourself at something that was never yours and ending up with several things half-done. When to start — and who is worth telling first — is in [your strategy](section:strategy); whether you are on track or scattered, in [your signals](section:signals).'
      ],
      projector: [
        'The first thing worth knowing is that **you are not built for the pace most people run at**. You carry no constant working engine, so competing on hours and stamina is a race that was never yours — and measuring yourself by that yardstick is the source of nearly all your exhaustion. Projectors are close to **one in five people**.',
        'What you do have is different, and it is considerable: **you see people with unusual depth**. You catch how someone works, where they are wasting their energy and what would help — often before they see it themselves. Your [Sacral](center:sacral) is undefined, and that same openness is what lets you read others from the inside. Guiding and directing is your real contribution.',
        'The condition is that the seeing be **asked for**: offered unbidden it meets resistance; received when you are called on, it changes people. How to handle that is in [your strategy](section:strategy), and whether it is working, in [your signals](section:signals). One thing is not negotiable: **rest is part of your method**, not a prize — sleep and let go *before* you are empty.'
      ],
      manifestor: [
        'You are built to **start things**: to set in motion what would not have got going without you. You are the most independent of all the types, and one of the least common — around **one person in ten**.',
        'Your energy **arrives in bursts**, not in a steady stream. A motor is wired to your [Throat](center:throat), and that is exactly what lets you set off on your own without waiting for anyone; but your [Sacral](center:sacral) is undefined, so there is no source refilling itself each day. You push hard, and then you need to stop. Quite a lot.',
        'Hence the most important thing, and the one least often said plainly: **rest is not your reward, it is your method**. You are not designed to produce continuously; your impact comes from a few well-charged moves, not many at half power. In practice: **go to bed tired, not empty**, and do not measure your rest against a Generator — next to one you will always look like you are doing very little, and that is not laziness, it is your design.',
        'And because what you do reaches other people whether you like it or not, there is a specific way of moving that keeps you from hitting them head-on: it is in [your strategy](section:strategy). Whether it is working, [your signals](section:signals) will tell you.'
      ],
      reflector: [
        'You work in a way that is radically unlike everyone else: **you carry nothing fixed inside**. Not one defined center, the whole bodygraph open. You are by far the rarest type — barely **one person in a hundred**.',
        'Far from being a lack, that total openness is your instrument. Having no constant energy of your own, you **take in and amplify the energy of those around you**, and that makes you an extraordinarily fine mirror: you can feel how a group, a house or a place is doing, because you are literally living it from the inside. Sensing the health of a community is a gift almost nobody else has.',
        'The flip side is that **your surroundings and your company change you enormously**: who you are with and where you are alters your whole experience of a day. So choosing your places and your people is not one detail among others, it is the central one — and it is worth not mistaking what you are only reflecting for what is yours. On the big decisions you also run on your own, slower clock: that is in [your strategy](section:strategy), and in [your signals](section:signals), how to tell whether you are in the right place.'
      ],
    },
    strategy: {
      respond: [
        'Rather than setting out from your head, your design asks you to **wait until there is something to respond to**: a proposal, a question, an opening that appears. Life puts the material on the table; your body answers.',
        'The answer comes from your [Sacral Center](center:sacral) as a **gut reaction**, before any reasoning — a pull toward something, or away from it. A yes or a no. Trust that, rather than talking yourself into things, and you land in satisfaction. Force it where no answer came and you land in frustration.'
      ],
      'respond-then-inform': [
        'Yours is both strategies at once. First, like any Generator: **wait for the sacral answer** — your body\u2019s yes or no to something concrete. Never start from the mind.',
        'Then, once you have it and you are about to move, **tell the people it will affect**. You make things happen fast, and a word in advance takes the friction out of that speed. Skip either step — the answer or the heads-up — and that is usually where your exhaustion comes from.'
      ],
      'inform-before-acting': [
        'Your energy starts things and lands with impact, often without warning. So your design asks you to **tell the people you are about to affect before you set off**. Not permission, not an explanation. Just saying what is about to happen.',
        'The effect is very practical: informing dissolves most of the resistance that surprises provoke. It can even bring you allies. Do it and the room stays calm; skip it and you stir up the anger and opposition that end up making your own path harder.'
      ],
      'wait-for-invitation': [
        'For the things that matter — a job, a relationship, a real commitment — your design asks you to **wait to be recognized and invited** rather than offering yourself unasked.',
        'That is not passivity. You keep living and preparing, but you save what you see for people who value it and ask. **The right invitation is what lets your gift land**; pushing without one usually brings resistance, bitterness and rejection. Recognition and success are the sign the wait was worth it.'
      ],
      'wait-lunar-cycle': [
        'Before an important decision, your design asks you to **let a full lunar cycle pass** instead of settling it in one go: this is not caution or delay, it is the time you need for the matter to show you every one of its angles.',
        'Over that time you **talk it through, spend time in different places, and watch how your view of it shifts** day by day. Your chart is completely open, so that journey is what separates what is yours from what you are simply reflecting. Clarity arrives by accumulation, never on impulse.'
      ]
    },
    authority: {
      emotional: [
        'You have a **defined [Solar Plexus](center:solarPlexus)**, which works in waves: your mood rises and falls over time, not because of what is happening right now. Hence your golden rule: **there is no truth in the moment**.',
        'To decide well, **ride the wave out first** — sleep on it, let time pass, come back to the question in a different mood — before you commit. Your clarity is not a flash of insight; it is what is left once the emotion has settled. Haste is your enemy.'
      ],
      sacral: [
        'Your authority lives in your **[Sacral Center](center:sacral)**, which answers **in the moment** with a sound or a gut movement — a rising "uh-huh" of yes, a flat "mm-mm" of no — to something concrete. Your body speaks first.',
        'It is **immediate and physical**: it does not reason, it reacts. It works best with yes/no questions and clouds over the moment your mind starts building a case. Catching that first answer from the belly, and trusting it, is your whole practice.'
      ],
      splenic: [
        'Your authority lives in your **[Spleen](center:spleen)**, the oldest center of awareness, tied to survival, health and instinct. It speaks **in the present, and only once**: a sudden, quiet knowing, with no repetition and no argument behind it.',
        'It is the **subtlest and most fleeting** of them all. It does not insist, so it is easy to miss or to explain away afterwards. Your practice is to **trust that first nudge** — the calm yes or no of your body — the instant it shows up, because it rarely comes back.'
      ],
      ego: [
        'Your authority lives in your **[Heart Center (Ego)](center:heart)**, the engine of willpower and desire. Here you find the right decision with an honest question: **do I actually want this? what is in it for me?** That is not selfishness — it is taking your own wanting seriously.',
        'It is an authority of **will and impulse**, not of long reflection. It works when you listen to what you truly want and can commit to it. It goes wrong when you take things on out of duty or pressure, with your heart not behind it.'
      ],
      'self-projected': [
        'Your truth arrives through your **voice**. Talking something through out loud and **hearing yourself** say it is what shows you whether it fits who you are and where you are going.',
        'What matters is not what your listener thinks. It is the act of saying it and listening back. So surround yourself with people you trust who let you talk without steering you, and pay attention to your tone and to the words that come out — your guidance is there, not in the reasoning.'
      ],
      mental: [
        'Yours is also called environmental authority, or the "sounding board". You have no inner bodily authority to consult, so clarity does not arrive from inside in one piece — **it comes out of conversation**.',
        'Your practice is to **talk things through with people you trust, in surroundings that suit you** — not so they decide for you, but so you can think out loud. Place and company are part of the method: the decision settles gradually, with time and talking.'
      ],
      lunar: [
        'As a Reflector you have no defined center, so there is no fixed inner source to decide for you. Your authority is not inside you: it is **time**. What the body settles in other designs, in yours is settled by the clarity that gathers across the cycle.',
        'Across that cycle you **pass through different states, places and conversations**, watching how your view of the question changes. Your clarity comes by **ripening**, from perspectives piling up rather than from impulse. Whatever still rings true after the whole cycle is what you can trust.'
      ]
    },
    profile: {
      '1': [
        'You look for **security through knowledge**. You need to dig in, understand the fundamentals and know the ground is solid before you move; without that footing you feel uneasy.',
        'Yours is **studious, inward-looking** energy. You go deep until you feel expert, and that solidity reassures the people around you. The catch is waiting forever to know "enough" before taking the step.'
      ],
      '2': [
        'You have **gifts that take no effort**, often without quite noticing they are there. You need **time alone** for that talent to ripen at its own speed.',
        'Your pattern is being **called out from outside**: other people spot something you cannot quite name yourself, and ask you for it. Your balance sits between honoring your need to withdraw and answering the calls worth answering.'
      ],
      '3': [
        'You learn **by trying**: hands on, through attempts, discoveries and plenty of stumbles. Every "mistake" is information, not failure.',
        'Yours is **experimental, resilient** energy: you find what works by ruling out what does not. The wisdom that comes out of it is thoroughly practical — and the key is not to read your stumbles as personal flaws, because they are the method itself.'
      ],
      '4': [
        'You move through **relationships and community**. Opportunities — work, love, big changes — tend to reach you through people you already know, not through strangers or cold approaches.',
        'Yours is **warm, relational** energy that needs solid ground in its bonds. The classic advice for you: do not let go of one footing — a job, a situation — until the next is secured through your network. Transitions work better that way.'
      ],
      '5': [
        'You live under a **field of projection**: people load you with expectations and look to you for practical answers. They do it because they see someone who can fix things — almost a rescuer.',
        'That brings you influence and a natural role of **useful leadership**, but it also exposes you: fail to deliver what was projected and the same force turns around. Your work is managing your **reputation** carefully, setting expectations straight where you can, and promising only what you can genuinely deliver.'
      ],
      '6': [
        'You move through **three phases of life**. Until around thirty you live like a line 3 — trying, stumbling, sometimes crashing. Then comes a stretch of stepping back to watch and process, the "on the roof" years. From roughly fifty onward you emerge as an **example other people look to**.',
        'Your underlying pull is toward **objectivity and maturity**: living by what you hold to be right and true, and becoming a model for others. Knowing which phase you are in saves a lot of self-judgement — that middle stretch is not disconnection, it is preparation.'
      ]
    },
    definition: {
      'no-definition': [
        '**No center is defined**, and your whole bodygraph stays open. You have no fixed energy of your own. Instead you take in the energy of everyone around you, amplify it and reflect it back.',
        'That makes you **extraordinarily sensitive to your surroundings**: who you are with and where you are changes your experience completely. Your wisdom comes from exactly that openness — as long as you do not mistake what you are reflecting for what is yours.'
      ],
      single: [
        'Every one of your defined centers is **connected in a single block**. Your energy flows inside without a break, which gives you a sense of **self-sufficiency**: you do not need anyone else to complete the picture.',
        'Your challenge is the mirror image of the split definitions\u2019: working well on your own makes it easy to turn inward, and harder to let outside influence in. Noticing when it is worth stepping out of your own bubble is part of your learning.'
      ],
      split: [
        'What usually follows is a **pull toward connection**: something to bridge your two halves.',
        'That bridge tends to arrive through other people — whose energy completes the channel you are missing — or through transits that switch on the gate in between. It is not a shortfall. Certain company and certain places simply make you feel whole, and that happens naturally.'
      ],
      'triple-split': [
        'Your wiring is more intricate, and it usually takes **more variety — of people, of input** — for your parts to feel joined up.',
        'Diverse surroundings and a certain amount of movement suit you; too much stillness can leave you feeling something has not quite come together. Knowing this helps: that need for variety is not scatteredness.'
      ],
      'quad-split': [
        'The rarest of them: a highly fragmented wiring which, oddly enough, tends to ask for **more structure, space and calm** in order to come together.',
        'Far from a problem, it describes a very particular way of processing life. What helps you is **taking time** and not forcing everything into place at once: your many parts settle at their own pace.'
      ]
    },
    center: {
      head: {
        defined: 'One of your **defined** centers: inspiration reaches you in a consistent way, and so does the pressure to make sense of things.',
        open: 'One of your **open** centers: you amplify other people\u2019s questions and mental restlessness. Try not to get dragged into solving doubts that were never yours and do not matter for your life.'
      },
      ajna: {
        defined: 'One of your **defined** centers: you think in a fixed, dependable way, and your opinions and certainties hold still.',
        open: 'One of your **open** centers: your mind is flexible and can hold many perspectives at once. Your trap is the pressure to look certain, or clinging to a borrowed certainty; your gift is not needing a fixed answer at all.'
      },
      throat: {
        defined: 'One of your **defined** centers: your voice is consistent, and so is the way you express yourself.',
        open: 'One of your **open** centers: your way of speaking shifts with the company, and you can feel the pressure to talk just to be noticed. Your lesson is waiting for the right moment instead of forcing words out.'
      },
      g: {
        defined: 'One of your **defined** centers: you have a steady sense of identity and direction.',
        open: 'One of your **open** centers: your identity is more fluid and shifting, and it finds its direction through the right places and the right people. **Place** is your key — being somewhere that fits orients everything else.'
      },
      heart: {
        defined: 'One of your **defined** centers: your willpower is consistent, and you can hold to what you promise.',
        open: 'One of your **open** centers, as it is for most people: you have nothing to prove and no willpower to measure. Your trap is over-promising in order to prove it anyway. Here you learn that your worth does not depend on your achievements.'
      },
      sacral: {
        defined: 'One of your **defined** centers: a renewable working energy, meant to be spent fully on the right things and run right down by bedtime.',
        open: 'One of your **open** centers: that constant energy simply is not there, so it matters that you know when enough is enough and do not let other people\u2019s pace carry you to exhaustion.'
      },
      spleen: {
        defined: 'One of your **defined** centers: your intuition is always on, and so is your sense of what is good for you.',
        open: 'One of your **open** centers: you amplify other people\u2019s fears and tend to hold on to what is not good for you — relationships, habits, situations — out of fear of letting go. Your lesson is not deciding from fear, and learning what actually agrees with your body.'
      },
      solarPlexus: {
        defined: 'One of your **defined** centers: you have emotional waves of your own, and clarity only turns up once a wave has passed.',
        open: 'One of your **open** centers: you soak up and amplify the emotions in the room — you read the mood of a place instantly — and tend to avoid confrontation. Your challenge is not taking ownership of moods you picked up from outside.'
      },
      root: {
        defined: 'One of your **defined** centers: you have a steady way of handling pressure and stress.',
        open: 'One of your **open** centers: you amplify the rush and the urge to clear your to-do list as fast as possible. Your lesson is not being pushed into hasty decisions just to relieve a pressure that is largely borrowed.'
      }
    }
  },

  // ── Per-type practical block for the report ──────────────────────────────
  typeReport: {
    generator: {
      energia:
        '**Managing your energy** — You have a defined [Sacral Center](center:sacral): a **renewable** working energy, built to be spent fully each day on the right things and run right down by bedtime. The point is not to conserve it — it is to **spend it on what your body actually responds to**. Then the tiredness feels good and the charge comes back tomorrow. Push through things that do not light you up and it drains you without ever satisfying you.',
      trampa:
        '**The trap for your type** — What wears you down is **starting from your head** instead of waiting for something to respond to: saying yes out of obligation, out of logic, or out of fear of missing out. Get into something your energy never backed and frustration turns up — the classic Generator signal — along with the sense of being stuck in things that never quite land.',
      senales:
        'End the day pleasantly tired, with the sense that your energy went somewhere real, and you are on track. If frustration and weariness are what you mostly feel, you have probably said yes to things your body did not.'
    },
    'manifesting-generator': {
      energia:
        '**Managing your energy** — Like any Generator you have a defined [Sacral](center:sacral): a **renewable** working energy. But yours connects to the [Throat](center:throat), which makes you **fast, many-sided and non-linear**. You skip steps, run several things at once, and move quickly when something genuinely grabs you. You are at your best when you wait for your **body\u2019s answer** first, then **tell** the people around you before you set off.',
      trampa:
        '**The trap for your type** — **Scattering.** Taking on too much your body never said yes to, or skipping the heads-up and running straight into other people\u2019s resistance. Start from the head instead of responding and you collect frustration, a bit of anger, and a trail of half-finished projects.',
      senales:
        'Satisfaction usually comes with a certain calm; frustration, often with a bit of friction. Moving fast on what lights you up and actually finishing things means you are on track. Feeling scattered and meeting resistance everywhere usually means you said yes without your body, or you forgot to tell people.'
    },
    projector: {
      energia:
        [
        '**Managing your energy** — With no defined [Sacral](center:sacral) you are **not built for constant work**, and you cannot hold a Generator\u2019s pace: your energy is uneven and runs out sooner. Nor are you built to start from scratch — you have no motor wired to the [Throat](center:throat).',
        'Your gift is to **see, guide and direct**, where you are invited to. Managing it well means **resting and pacing yourself** — sleeping and letting go before you are empty — and saving your attention for those who genuinely value it.'
      ],
      trampa:
        '**The trap for your type** — **Keeping up with everyone else**, and **offering your insight where nobody asked for it**. Working yourself flat to prove your worth, or pushing in without an invitation, brings resistance, rejection and bitterness — the signal of a Projector living against their design.',
      senales:
        'Success, here, is being seen and recognized. Being seen, being invited, having your view actually land: that is the track. Feeling invisible, drained and resentful usually means you are offering yourself where you were not called, or demanding an energy you do not have.'
    },
    manifestor: {
      energia:
        [
        '**Managing your energy** — You have a motor wired to the [Throat](center:throat) but an undefined [Sacral](center:sacral): your energy is **not constant, it arrives in bursts** to start things, and then it runs out. You are built to start and land an impact, not to grind things out.',
        'So **rest is part of your method**, not your reward: most of your time should not be spent producing. Respect the cycles of push and rest, and protect your autonomy without cutting yourself off.'
      ],
      trampa:
        '**The trap for your type** — Moving without **telling** the people your impact will reach. That is what fills the room with resistance and anger, and it ends up making everything harder for you. The other trap is **demanding a consistency that is not yours**, right up to burnout, instead of accepting how much rest you actually need.',
      senales:
        'Inform people and move freely and things go quiet around you. When everything turns into friction and conflict, you probably moved without warning, or you are forcing a steady pace that was never yours.'
    },
    reflector: {
      energia:
        '**Managing your energy** — With **no defined center**, you are constantly sampling the energy of people and places. **Your surroundings affect you enormously** and your energy swings a lot from day to day. The single most important thing for you is **choosing where you are and who you are with** — and not demanding a consistency your design does not have. And do not close anything that matters while it is still hot: give it the whole cycle.',
      trampa:
        '**The trap for your type** — Deciding in a hurry, staying in places that do not suit you, and **taking what you are reflecting for your own**: moods and pressures that actually belong to the group. **Forcing yourself to be the same every day** goes against how you work.',
      senales:
        'Surprise comes with its bit of delight. Get the place and the people right and life keeps surprising you pleasantly. When disappointment is the main note, you are usually somewhere wrong, with the wrong people, or you decided too fast.'
    }
  },

  iching: {
    1: 'The Creative Force',
    2: 'The Receptive Field',
    3: 'Difficulty at the Start',
    4: 'Inexperience',
    5: 'Waiting',
    6: 'Conflict',
    7: 'The Army',
    8: 'Holding Together',
    9: 'Taming by the Small',
    10: 'Treading',
    11: 'Peace',
    12: 'Standstill',
    13: 'Fellowship',
    14: 'Great Holdings',
    15: 'Modesty',
    16: 'Enthusiasm',
    17: 'Following',
    18: 'Repairing What Was Spoiled',
    19: 'Drawing Near',
    20: 'Contemplation',
    21: 'Biting Through',
    22: 'Grace',
    23: 'Falling Apart',
    24: 'The Return',
    25: 'Innocence',
    26: 'Taming by the Great',
    27: 'Nourishment',
    28: 'Excess of the Great',
    29: 'The Abyss (Water)',
    30: 'The Clinging (Fire)',
    31: 'Influence',
    32: 'Duration',
    33: 'Retreat',
    34: 'The Power of the Great',
    35: 'Progress',
    36: 'The Darkening of the Light',
    37: 'The Family',
    38: 'Opposition',
    39: 'Obstruction',
    40: 'Release',
    41: 'Decrease',
    42: 'Increase',
    43: 'Breakthrough',
    44: 'Coming to Meet',
    45: 'Gathering Together',
    46: 'Pushing Upward',
    47: 'Oppression',
    48: 'The Well',
    49: 'Revolution',
    50: 'The Cauldron',
    51: 'The Arousing (Shock)',
    52: 'Keeping Still (the Mountain)',
    53: 'Gradual Development',
    54: 'The Marrying Maiden',
    55: 'Abundance',
    56: 'The Wanderer',
    57: 'The Gentle (Wind)',
    58: 'The Joyous (Lake)',
    59: 'Dispersion',
    60: 'Limitation',
    61: 'Inner Truth',
    62: 'Excess of the Small',
    63: 'After Completion',
    64: 'Before Completion'
  },

  channel: {
    '1-8': {
      name: 'Channel of Inspiration',
      essence: 'a creative identity that needs a voice, and inspires others by example rather than by argument.',
      more: [
        'When you have it complete, doing your own thing is not enough: it needs to be seen. This channel joins something original to a voice that carries it outward, which is why you tend to end up an example — not for what you preach, but for how you do what you do.',
        'The wear comes from forcing originality on demand, or expecting recognition straight away. What is yours surfaces at its own pace and finds its people over time; pushing usually spoils it.'
      ]
    },
    '2-14': {
      name: 'Channel of the Beat',
      essence: 'an inner compass for where to point one\u2019s life force and one\u2019s resources.',
      more: [
        'When you have it complete, direction and fuel sit in the same circuit: you know where your energy is going and you have plenty of force to take it there. It is one of the channels most tied to prosperity and resources.',
        'Its condition is not forcing the course with your head. Direction here is recognised, not calculated; decide the destination by argument and the fuel is still there but stops paying off.'
      ]
    },
    '3-60': {
      name: 'Channel of Mutation',
      essence: 'the pulse of change, turning a limit into the start of something new.',
      more: [
        'When you have it complete, your life runs on mutations: stretches where nothing moves, followed by abrupt jumps. That pulse is not you being erratic, it is literally how this channel works.',
        'The hard part is the waiting, which feels like being stuck. It is not: it is the part of the cycle where something is forming. Pushing during that phase is what produces the frustration, not the wait itself.'
      ]
    },
    '4-63': {
      name: 'Channel of Logic',
      essence: 'a mind that begins in doubt and works its way toward answers that hold up.',
      more: [
        'When you have it complete, you have a mind built to doubt and then hunt for the formula that settles the doubt. It is a continuous logical engine, and what it produces are hypotheses other people can use.',
        'Be careful about believing your own answers too soon. This channel pushes to close, and a hypothesis presented as certainty loses exactly what made it valuable. Offer it as what it is and it carries more weight.'
      ]
    },
    '5-15': {
      name: 'Channel of Rhythm',
      essence: 'a natural rhythm of one\u2019s own that, kept open to difference, falls in step with life.',
      more: [
        'When you have it complete, you have a strongly marked rhythm of your own and, at the same time, an openness to other people\'s. The combination is peculiar: you need your routines, but you cannot bear them being identical forever.',
        'Which is why your beat can look erratic from outside. It is not: it alternates consistency and variation. What genuinely throws you is having a rhythm imposed that is not yours.'
      ]
    },
    '6-59': {
      name: 'Channel of Intimacy',
      essence: 'the power to break through barriers and form a bond, and the sense of when to open and when to close.',
      more: [
        'When you have it complete, you have an uncommon capacity to create intimacy: you know how to close the distance and reach what is near, while also deciding when that door opens and closes.',
        'It is the channel most tied to intimacy, in the reproductive sense too. Its care is the other person\'s pace and your own emotional weather: moving close in the heat of the moment, or shutting suddenly, is what breaks what you were building.'
      ]
    },
    '7-31': {
      name: 'Channel of Leadership',
      essence: 'the one who gives a group its direction, and finds the voice to lead it there.',
      more: [
        'When you have it complete, you have voice and direction at once: you see where it would be good to go and you can say it so the group listens. It is the classic leadership circuit.',
        'And it depends entirely on being chosen. This leadership works when it is given; taken by force it becomes ordering, and people back away. Your authority is on loan from the group, and that is not a weakness.'
      ]
    },
    '9-52': {
      name: 'Channel of Concentration',
      essence: 'the stillness that lets attention narrow onto detail until the work is finished.',
      more: [
        'When you have it complete, your concentration is out of the ordinary: you can sit still and hold focus on detail far longer than most people manage.',
        'The price is that starting and stopping cost you. This channel needs to settle into its stillness to deliver, and once inside, interruptions pull you all the way out. Protect those stretches if you want the concentration to show up.'
      ]
    },
    '10-20': {
      name: 'Channel of Awakening',
      essence: 'self-love expressed in the present — being who you are, right now.',
      more: [
        'When you have it complete, there is a clear demand: **be yourself, and be it now**. This channel joins fidelity to who you are with expression in the present moment, leaving no room for rehearsal.',
        'Its difficulty is that it allows no posturing. Act the way you think you should instead of the way you are and it shows instantly, and it sits badly with you. The awakening here is very concrete: behaving as yourself in real time.'
      ]
    },
    '10-34': {
      name: 'Channel of Exploration',
      essence: 'the strength to act on your own convictions and stay true to yourself.',
      more: [
        'When you have it complete, you have the force to follow your own convictions: the power of the [Sacral](center:sacral) put to the service of being true to yourself. It is a deeply individual channel.',
        'And for that reason a solitary one. This energy delivers when you spend it on what is yours; lent to what is not, it turns into pointless activity and an odd kind of tiredness.'
      ]
    },
    '10-57': {
      name: 'Channel of Survival',
      essence: 'instinct in the service of wellbeing, and of the right way to live in a body.',
      more: [
        'When you have it complete, you have a finely tuned instinct for surviving as yourself: the ear of the [Spleen](center:spleen) warning you in the moment, joined to fidelity to who you are.',
        'The warning comes once and without arguments. Start reasoning about it and it is gone. Learning to trust that first impulse — especially when it says no — is this channel\'s work.'
      ]
    },
    '11-56': {
      name: 'Channel of Curiosity',
      essence: 'a mind full of ideas looking for stories to carry them.',
      more: [
        'When you have it complete, you are a storyteller: you gather ideas and turn them into narrative that stimulates whoever is listening. It is a channel of constant search for meaning through what gets told.',
        'Its trap is taking ideas as a plan. Here ideas are for sharing, not executing; turning them into personal obligations is the source of nearly all its wear.'
      ]
    },
    '12-22': {
      name: 'Channel of Openness',
      essence: 'an emotional expression that opens up and moves people, when the mood and the moment are right.',
      more: [
        'When you have it complete, your emotional expression has real reach: when the mood is with you, what you say touches people in a way others cannot manage.',
        'It depends on mood and that is not negotiable. There are moments to speak and moments to withdraw, and forcing the first when it is the second spoils the effect. Reading the moment is the whole technique here.'
      ]
    },
    '13-33': {
      name: 'Channel of the Prodigal',
      essence: 'gathering what has been lived and, after time away, telling it back as a witness.',
      more: [
        'When you have it complete, you gather what people tell you and, after withdrawing to digest it, hand it back turned into something meaningful. You are a kind of memory for the group.',
        'The retreat is not optional: without it, what you gather piles up unsorted. And one thing is worth minding — not everything confided to you is there to be told, even though you have the gift for telling.'
      ]
    },
    '16-48': {
      name: 'Channel of Talent',
      essence: 'deep talent that turns into mastery through enthusiasm and repetition.',
      more: [
        'When you have it complete, talent and enthusiasm sit on top of a well of depth: when something grabs you, you do not just leap in, you end up genuinely good at it.',
        'The usual obstacle is the feeling of not being ready, which here is essentially permanent. It is not going away. This channel\'s mastery is built by practising, not by waiting to feel prepared.'
      ]
    },
    '17-62': {
      name: 'Channel of Acceptance',
      essence: 'opinions ordered into facts and detail, so things can be organized and anticipated.',
      more: [
        'When you have it complete, you organise: you form opinions and back them with ordered detail, which makes them very convincing and very useful for structuring anything.',
        'Its shadow is presenting as fact what is still a view, however well argued. The same opinion offered as an opinion opens a debate; offered as truth, it closes doors.'
      ]
    },
    '18-58': {
      name: 'Channel of Judgment',
      essence: 'the vitality that pushes to fix and improve whatever has gone crooked.',
      more: [
        'When you have it complete, a background joy translates into an appetite for making things better: you see what is failing and you want it fixed, which can benefit everyone around you.',
        'The limit is continuous correction. When the criticism does not stop — outward or inward — the joy feeding it disappears, and that is the moment to stop: the vitality comes first.'
      ]
    },
    '19-49': {
      name: 'Channel of Synthesis',
      essence: 'a sensitivity to what people need, and bonds decided by deep principles.',
      more: [
        'When you have it complete, you have a very fine sensitivity to what people need and to the principles that hold a bond together. You notice immediately when something in an agreement has broken.',
        'Its risk is the abrupt break. Tension builds silently and one day you cut all at once. Saying in time what you need and where your line is prevents most of those ruptures.'
      ]
    },
    '20-34': {
      name: 'Channel of Charisma',
      essence: 'power turned straight into action — thinking and doing without a gap between them.',
      more: [
        'When you have it complete, you have charisma in the most literal sense: energy converted into action and presence in the moment. When you are busy with what is yours, people notice.',
        'It is not energy to display or to lend to just anything. Charisma here is a side effect of doing what is actually yours; chase it directly and it goes out.'
      ]
    },
    '20-57': {
      name: 'Channel of the Brain Wave',
      essence: 'a sharp intuition that catches the knowing of the instant and says it out loud.',
      more: [
        'When you have it complete, you have intuition in real time: you perceive and act in the same instant, without passing through reasoning. It is one of the fastest circuits in the chart.',
        'Its demand is presence. This sharpness only works if you are genuinely here; distracted, the warning goes unnoticed. And since it comes once, analysing it afterwards will not bring it back.'
      ]
    },
    '21-45': {
      name: 'Channel of Money',
      essence: 'the will to control resources, and the voice that shares them out for the group.',
      more: [
        'When you have it complete, you have authority over material things: you know how to administer resources and also how to claim control of what is yours. It is the channel most tied to money and management.',
        'Its tension is between controlling and sharing. Administering what is common well means consulting the group; administering it as though it were yours generates exactly the resistance you wanted to avoid.'
      ]
    },
    '23-43': {
      name: 'Channel of Structuring',
      essence: 'individual knowing turned into ideas other people can actually follow.',
      more: [
        'When you have it complete, you have singular insights and the ability to translate them into words others understand. It is the channel of *genius* — and equally of being misunderstood.',
        'It all comes down to timing. The same thing said in time produces a click; said out of time it sounds like eccentricity. It is not that you are wrong: you arrived before the question existed.'
      ]
    },
    '24-61': {
      name: 'Channel of Awareness',
      essence: 'the pressure to know the unknowable, turning it over until it gives up its meaning.',
      more: [
        'When you have it complete, your mind hunts for the bottom of things and returns to the same question over and over until, unannounced, the understanding arrives.',
        'It is a mental pressure that guarantees no answer, and that is its hard point. Holding the question without manufacturing conclusions to calm yourself is exactly what this channel asks — and what almost nobody does.'
      ]
    },
    '25-51': {
      name: 'Channel of Initiation',
      essence: 'the shock that starts things, driven by a love that asks for nothing back.',
      more: [
        'When you have it complete, you have the nerve to go where others do not, and a singular relationship with shocks: they rearrange you rather than sink you. It is the classic channel of initiation.',
        'Its hard face is that the path tends to run through frights and losses. What is asked here is not to avoid them, but not to lose your innocence afterwards — which is the genuinely difficult part.'
      ]
    },
    '26-44': {
      name: 'Channel of Surrender',
      essence: 'an instinct that reads the past, and the power of persuasion to pass it on.',
      more: [
        'When you have it complete, you join a nose for people with the ability to persuade: you know who you are dealing with and you know how to put things to them. It is a very effective channel in business.',
        'Its edge is the stretched truth. The same skill that convinces can exaggerate without noticing, and there goes the trust that was your best asset. Telling it straight convinces just as well, it only takes more work.'
      ]
    },
    '27-50': {
      name: 'Channel of Preservation',
      essence: 'care that holds others up, guided by the values that keep a group safe.',
      more: [
        'When you have it complete, you care for people and hold the group\'s values at the same time: it is the circuit of nurturing and of responsibility toward others in its most concrete form.',
        'The weight is obvious: you can end up carrying everyone\'s wellbeing. Caring without emptying yourself requires a limit, and that limit does not make you a worse carer — it is what lets you keep being one.'
      ]
    },
    '28-38': {
      name: 'Channel of Struggle',
      essence: 'the stubbornness to fight and take risks for a life worth having.',
      more: [
        'When you have it complete, you have the staying power to fight for what you judge worth it, and a deep need for life to mean something.',
        'The question that orders everything is what you are fighting for. The same tenacity poured into a meaningless battle turns into sheer stubbornness and attrition. Here, choosing the fight well is literally choosing your life well.'
      ]
    },
    '29-46': {
      name: 'Channel of Discovery',
      essence: 'wholehearted commitment that, put into the body, thrives where others give up.',
      more: [
        'When you have it complete, you commit all the way in and tend to turn up in the right place at the right time. It is the channel of discovery: you get in, and the learning comes out of that.',
        'Its care is what you say yes to, because this channel says yes very easily and then holds on for years. And its luck depends on being at ease in your body: neglect it and the luck goes out.'
      ]
    },
    '30-41': {
      name: 'Channel of Recognition',
      essence: 'the imagination and longing that light the appetite for new experience.',
      more: [
        'When you have it complete, you hold the start of desire: the imagination that lights something new and the emotional intensity to chase it. It is the engine of everything that has not happened yet.',
        'Its tension is wanting something without knowing quite what. That pressure does not always call for action — often it is just imagination looking for a way out, and mistaking it for an order leads to experiences you did not want.'
      ]
    },
    '32-54': {
      name: 'Channel of Transformation',
      essence: 'ambition to rise, steered by an instinct for what will last.',
      more: [
        'When you have it complete, you have ambition and a good nose for what will last: you want to rise, and you can also tell what has legs from what does not.',
        'Its brake is fear of failure, which can freeze you before you start. And part of it is out of your hands: much of this ascent depends on someone recognising you. Preparing yourself, though, is entirely yours.'
      ]
    },
    '34-57': {
      name: 'Channel of Power',
      essence: 'raw strength at the service of instinct — power as sheer presence.',
      more: [
        'When you have it complete, power and instinct sit in the same circuit: force to act and a fine ear telling you when. It is a very powerful channel in practical terms.',
        'Its key is respecting the instinctive warning before spending the force. Act first and listen afterwards, and that same power gets spent in directions that were never yours.'
      ]
    },
    '35-36': {
      name: 'Channel of Transience',
      essence: 'a hunger for experience that, through emotional highs and lows, keeps moving on to the next thing.',
      more: [
        'When you have it complete, you hunt experience without pause: the new calls you, and so you pile up a lifetime\'s worth of living that would take others several. It is the channel of the transitory.',
        'Its wear is coming away with nothing settled. This circuit runs to the next experience before digesting the last, and that is where the sense of having lived a lot and learned little comes from. Stopping to look back is what changes it.'
      ]
    },
    '37-40': {
      name: 'Channel of Community',
      essence: 'the warmth that builds community through agreements — giving freely, and knowing when to step away and recover.',
      more: [
        'When you have it complete, you work by agreements: you give what is yours and expect the other side to hold up theirs. It is the channel of community and family, in its most practical sense.',
        'Everything depends on the bargain being explicit and genuinely wanted. An agreement accepted half-heartedly — or simply assumed — always comes back with interest. And rest is part of the deal, not a concession.'
      ]
    },
    '39-55': {
      name: 'Channel of Emotion',
      essence: 'provocation that stirs the mood, to bring spirit up to the surface.',
      more: [
        'When you have it complete, you have an enormous emotional range and the ability to provoke in others exactly what needs moving. It is a channel closely tied to spirit and to art.',
        'Its mood swing has no external cause and needs no explaining. What matters is not deciding at the extremes: neither in fullness nor in emptiness are you seeing the whole situation.'
      ]
    },
    '42-53': {
      name: 'Channel of Maturation',
      essence: 'the energy of cycles: starting things and carrying them through, and ripening in the process.',
      more: [
        'When you have it complete, you live in cycles: something begins, matures and closes, and you need to travel the whole arc to get the meaning out of it.',
        'The difficulty is that you cannot skip phases or step out halfway without paying for it. Before entering a cycle, look at whether you actually wanted to — because once inside, leaving it unfinished sits badly with you.'
      ]
    },
    '47-64': {
      name: 'Channel of Abstraction',
      essence: 'a press of half-formed images working themselves into sense.',
      more: [
        'When you have it complete, your mind works with disordered material — images, memories, scraps — until, on its own, it finds the sense. It is the channel of abstraction.',
        'The normal state here is confusion, and it is not a fault. Understanding arrives late and arrives by itself; the pressure to get it *now* is the only thing that muddies the process.'
      ]
    },
  },

  // Short keynote per center, shown next to the chips in the centers drawer.
  centerBrief: {
    head: 'inspiration and questions',
    ajna: 'thinking',
    throat: 'communication and action',
    g: 'identity and direction',
    heart: 'willpower',
    spleen: 'instinct',
    solarPlexus: 'emotions',
    sacral: 'life force',
    root: 'pressure and drive'
  },

  // Closed-set index appended to each value drawer.
  relatedIndex: {
    type: {
      heading: 'The Five Types in the Human Collective',
      items: {
        generator: { label: 'Generator', note: 'builds with sustained energy', pct: '~37%' },
        'manifesting-generator': { label: 'Manifesting Generator', note: 'builds fast and many-sided', pct: '~33%' },
        projector: { label: 'Projector', note: 'sees, guides and directs others’ energy', pct: '~20%' },
        manifestor: { label: 'Manifestor', note: 'initiates and makes an impact independently', pct: '~9%' },
        reflector: { label: 'Reflector', note: 'reflects and samples the environment', pct: '~1%' }
      }
    },
    strategy: {
      heading: 'The Five Strategies',
      items: {
        respond: { label: 'Respond', note: 'the Generator’s' },
        'respond-then-inform': { label: 'Respond, Then Inform', note: 'the Manifesting Generator’s' },
        'inform-before-acting': { label: 'Inform Before Acting', note: 'the Manifestor’s' },
        'wait-for-invitation': { label: 'Wait for the Invitation', note: 'the Projector’s' },
        'wait-lunar-cycle': { label: 'Wait a Lunar Cycle', note: 'the Reflector’s' }
      }
    },
    authority: {
      heading: 'The Seven Authorities',
      items: {
        emotional: { label: 'Emotional', note: 'clarity over time, riding out the emotional wave' },
        sacral: { label: 'Sacral', note: 'the gut yes or no of the moment' },
        splenic: { label: 'Splenic', note: 'the instinct that speaks only once' },
        ego: { label: 'Ego', note: 'what you genuinely want' },
        'self-projected': { label: 'Self-Projected', note: 'hearing yourself speak out loud to recognize yourself' },
        mental: { label: 'Mental/Environmental', note: 'the clarity that comes from dialogue' },
        lunar: { label: 'Lunar', note: 'a lunar cycle of perspective' }
      }
    },
    definition: {
      heading: 'The Five Definitions',
      items: {
        'no-definition': { label: 'No Definition', note: 'no center defined (Reflector)' },
        single: { label: 'Single', note: 'everything connected in one block' },
        split: { label: 'Split', note: 'two separate groups' },
        'triple-split': { label: 'Triple Split', note: 'three separate groups' },
        'quad-split': { label: 'Quadruple Split', note: 'four separate groups' }
      }
    },
    profile: {
      heading: 'The Six Lines',
      items: {
        '1': { label: 'Line 1', note: 'the foundation: research and settle the base' },
        '2': { label: 'Line 2', note: 'the natural talent others call out from outside' },
        '3': { label: 'Line 3', note: 'trial and error: learning by trying' },
        '4': { label: 'Line 4', note: 'the network: opportunities arrive through bonds' },
        '5': { label: 'Line 5', note: 'projection: expectations and practical leadership' },
        '6': { label: 'Line 6', note: 'the role model: three phases toward example' }
      }
    }
  },

  // Relative weight labels (tier drives styling and stays language-neutral).
  activationWeight: {
    sun: { tier: 'high', label: 'high' },
    earth: { tier: 'high', label: 'high' },
    moon: { tier: 'low', label: 'low' },
    northNode: { tier: 'mid', label: 'medium' },
    southNode: { tier: 'mid', label: 'medium' },
    mercury: { tier: 'low', label: 'low' },
    venus: { tier: 'low', label: 'low' },
    mars: { tier: 'low', label: 'low' },
    jupiter: { tier: 'low', label: 'low' },
    saturn: { tier: 'low', label: 'low' },
    uranus: { tier: 'low', label: 'low' },
    neptune: { tier: 'low', label: 'low' },
    pluto: { tier: 'low', label: 'low' }
  },

  crossEssence: {
    'of the Sphinx': [
      'The sphinx is the figure that **guards the road and poses the riddle**: it does not move, yet it orients whoever passes. That is the ground of this cross, built on [gate 1](gate:1) and [gate 2](gate:2) — self-expression and direction — held up by [7](gate:7) and [13](gate:13), the role you take in front of others and the capacity to hear what they bring.',
      'In practice it comes down to something concrete: **these people give direction**. Not so much by telling others what to do as by **being themselves so distinctly that everyone else gets their bearings from watching**. Direction is not looked for outside; it comes from within and is recognised afterwards.',
      'The risk is trying to direct on purpose, pushing. A sphinx chases nobody: it waits to be come to. When the self-expression is honest and the role is not forced, the orienting happens by itself.'
    ],
    'of Laws': [
      'This cross is about **how things get ordered so they last**. [Gate 3](gate:3) brings the hard start every new thing has, [50](gate:50) the values that hold a group together; underneath, [60](gate:60) sets the limit and [56](gate:56) is the restlessness that pushes past it.',
      'Hence the name: the "law" here is not an imposed rule but **the order that makes something work and repeat**. These people usually have a nose for what will hold a project, a family or a community together — and for what is going to break it.',
      'The tension is between limit and impulse: **ordering without seizing up**. Done well, what gets built stands on its own; done badly, you get rules for the sake of rules.'
    ],
    'of Explanation': [
      'The heart of this one is **making comprehensible what is not yet**. [Gate 4](gate:4) is the answer offered to a doubt, [49](gate:49) the principle on which something is accepted or overturned; [23](gate:23) and [43](gate:43) bring the singular insight and the knack of putting it in words other people can take in.',
      'That is why it is called explanation: it is not about being right, it is about **translating**. An idea that is perfectly clear inside and unintelligible outside, until the form is found. Finding that form is the life theme.',
      'The usual drain is explaining too early, or to someone who never asked — there the explanation just sounds odd. With the right timing, the same sentence opens a door.'
    ],
    'of Consciousness': [
      'This cross works with **noticing**. [Gate 5](gate:5) sets rhythm and consistency, [35](gate:35) the appetite for new experience; below, [64](gate:64) fills the head with unsorted images and [63](gate:63) puts them all in doubt.',
      'The combination describes someone who **turns what they have lived into understanding**: gathering experience, letting it settle at their own pace, and eventually drawing out a clarity others do not see. Consciousness here is not thought out, it is distilled.',
      'The trap is wanting to understand it all now, or breaking your own rhythm chasing experiences. The clarity comes late and comes by itself; forcing it only muddies it.'
    ],
    'of Eden': [
      'Eden is the paradise **you have to leave**. That is exactly the image here: [gate 36](gate:36) brings crisis and the not-yet-lived, [6](gate:6) friction and intimacy; underneath, [11](gate:11) supplies the ideas and [12](gate:12) the caution about voicing them.',
      'It describes a life **made by going into experience**, including the kind that hurts. This is not a cross of contemplative retreat: its material is contact, the rub of other people, the crisis that teaches what nothing else could.',
      'The practical key is timing. [Gate 6](gate:6) opens and closes, so **not every moment is the moment**: going in when it is open keeps experience from turning into wear, and the caution of [12](gate:12) is an ally, not a brake.'
    ],
    'of Contagion': [
      'Contagion here is not illness, it is **what spreads without being intended**. [Gate 8](gate:8) brings what you have to contribute and [14](gate:14) the resources to do it; [30](gate:30) supplies the burning desire and [29](gate:29) the capacity to commit all the way in.',
      'What follows is a life marked by **example**: these people move others by how they give themselves to their own thing, not by what they preach. When something really catches them, the enthusiasm is catching too.',
      'The care is in what gets a yes. [29](gate:29) commits easily and [30](gate:30) wants intensely: **a yes given in the heat of the moment can cost years**. Choosing well is half the life here.'
    ],
    'of Planning': [
      'This cross organises **so that the community works**. [Gate 9](gate:9) gives focus on detail and [16](gate:16) enthusiasm and skill; below, [40](gate:40) supplies the will to work — and to withdraw and rest — and [37](gate:37) the bargains that keep a group together.',
      'What defines it is the long view: **seeing the steps that lead from here to there**, and sharing them out. Not control — structure in service of something shared, the plan that makes it possible for a group to actually arrive somewhere.',
      'The delicate part is the deal: [40](gate:40) and [37](gate:37) form the channel of bargains. **An agreement accepted without real willingness charges interest**, and the rest is not optional; without it, planning turns into burden.'
    ],
    'of the Vessel of Love': [
      'A vessel is **what holds and carries**. This cross gathers the four gates of love: [10](gate:10), loving yourself and behaving as you are; [15](gate:15), love of humanity in all its variety; [46](gate:46), love of the body and of being here; and [25](gate:25), universal, innocent love.',
      'It is not about romance but about **a way of being in the world that makes room**. These people tend to be the place where others feel accepted without having to justify themselves — and that happens through who they are, not what they do.',
      'The condition is that the love starts inside. An empty vessel holds no one: **[gate 10](gate:10) asks for fidelity to yourself first**, and the rest follows from there.'
    ],
    'of Service': [
      'This cross is built to **improve what is there**. [Gate 17](gate:17) brings the opinion and [18](gate:18) the eye for what is off; below, [58](gate:58) brings vitality and the taste for living, and [52](gate:52) the stillness to look without moving.',
      'Service here means **correcting with judgement**: seeing the flaw, yes, but in service of the thing working better for everyone. Lived well it is one of the most useful energies going; the whole group benefits.',
      'The edge is obvious: the same gate that perfects can turn into relentless criticism, above all inward. **[58](gate:58) is the reminder of what it was all for** — joy. When correcting stops being joyful, something has gone crooked.'
    ],
    'of the Four Ways': [
      '[Gate 19](gate:19) asks and approaches, [33](gate:33) retreats to digest what happened, [44](gate:44) recognises patterns from the past and [24](gate:24) returns again and again to the same idea. Four different movements: hence the name.',
      'It describes a life that **moves by alternating**: approach and withdraw, join the group and step out to process it. That is not inconsistency, it is the method — the retreat is what gives the approach something to bring.',
      'The common mistake is picking one mode, usually the sociable one, and trying to hold it. **Four ways means four, not one**: denying yourself the retreat hollows out the rest.'
    ],
    'of the Sleeping Phoenix': [
      'The phoenix burns and is reborn; here it is **asleep**, waiting for its moment. [Gate 20](gate:20) lives in the present and [34](gate:34) is sheer power; below, [55](gate:55) brings spirit and its swings of mood, and [59](gate:59) the ability to break through barriers and be intimate.',
      'This is a cross of **held force**: an enormous energy that is not spent continuously but waits and then unfolds whole when the moment comes. Reading that as slowness is a misreading.',
      'The key is mood. [55](gate:55) rises and falls, and **life changes colour with it**; the work is not to correct that but to avoid deciding from the low point or promising from the high one.'
    ],
    'of Tension': [
      '[Gate 21](gate:21) wants control over its own domain, [48](gate:48) reaches for depth and fears not having it, [38](gate:38) fights for what is worth fighting for and [39](gate:39) provokes to bring out what is underneath. Four energies pulling — and that pull is the point.',
      'It sounds uncomfortable and it is the opposite of a flaw: **it is what drives improvement**. These people usually carry a background dissatisfaction that pushes them to go deeper, to stand their ground, and to refuse the superficial.',
      'The care is where it discharges. Turned against your own life, tension exhausts; put behind something worth doing, **it is one of the most productive forces in the chart**.'
    ],
    'of Rulership': [
      '[Gate 22](gate:22) opens with grace, [47](gate:47) tries to make sense of confusion, [26](gate:26) knows how to present what has value and [45](gate:45) gathers and administers what belongs to everyone. The rulership this cross means **is that: stewarding what is shared**.',
      'It is not about giving orders. It is **the authority that appears when someone gathers, orders and distributes well** — and the social grace of [22](gate:22) is what makes it welcome rather than resented.',
      'The sensitive point is [26](gate:26), the trickster gate: it knows how to pitch, which is exactly why it can overstate. **The line between ruling and manipulating runs through there**, and it is drawn in small decisions.'
    ],
    'of the Unexpected': [
      '[Gate 27](gate:27) cares and feeds, [28](gate:28) stakes its life on finding meaning, [41](gate:41) lights the fantasy that starts every cycle and [31](gate:31) carries the voice others follow. Four gates that do not quite fit together: hence the unexpected.',
      'This is a cross of **turns**. Life does not follow the plotted line; it arrives by routes nobody planned, and the good part is in those turns — [28](gate:28) is the gate that finds meaning precisely where there seemed to be none.',
      'Lived defensively it feels like instability. Accepted, it becomes **a life rich in experience, and rich in the capacity to look after other people** exactly because of what has been lived.'
    ],
    'of Maya': [
      'Maya is the name of the **veil**: the material world as it appears to us, at once so solid and so slippery. [Gate 32](gate:32) measures what will last and [42](gate:42) closes cycles; below, [62](gate:62) orders the detail and [61](gate:61) presses toward the mystery underneath.',
      'The cross describes someone who **moves inside the illusion without entirely buying it**: a good eye for the practical — what endures, what is finished, names and facts — and at the same time a question no fact answers.',
      'That double edge is the theme. Staying only in the detail makes for a dry life; staying only in the mystery, a life with no floor. **Maya is crossed using both hands.**'
    ],
    'of Penetration': [
      'To penetrate is **to go through the surface**. [Gate 51](gate:51) is the shock that wakes you, [57](gate:57) the intuition that hears what is not said, [54](gate:54) the ambition that drives upward and [53](gate:53) the urge to begin.',
      'This is a cross of **initiation**: the jolt that breaks someone out of their routine and makes them see what they were not seeing. These people often have that effect without meaning to, simply by how they enter a situation.',
      'The delicate part is that shock lands badly when it arrives by surprise. **The intuition of [57](gate:57) knows when, and for whom**; listening to it turns the blow into a waking-up, ignoring it turns it into a collision.'
    ],
    'of Defiance': [
      'Defiance here is not contrariness for its own sake. [Gate 1](gate:1) and [2](gate:2) bring self-expression and direction; below, [4](gate:4) offers answers and [49](gate:49) is the principle that breaks an agreement once it stops working.',
      'This is a **transpersonal** cross: what is yours gets asserted **in front of others and with them**. These people often find themselves dissenting — not for the pleasure of it, but because they can see something does not fit — and that dissent ends up serving the group.',
      'The edge is defying out of habit. [49](gate:49) knows when a principle has genuinely been broken; **defiance that does not come from there is just noise**.'
    ],
    'of Wishes': [
      '[Gate 3](gate:3) is the hard start of anything new and [50](gate:50) the values that hold a group; [41](gate:41) lights the desire that opens every cycle and [31](gate:31) lends it the voice others follow.',
      'Desire is the **engine of the collective** here: what these people long for does not stay inside, it turns into something that moves other people. Hence the plural — not a whim, but the impulse that starts things.',
      'Watch [41](gate:41): it fantasises far more than can be lived. **The fantasy is the fuel, not the plan.**'
    ],
    'of Revolution': [
      '[Gate 4](gate:4) gives answers and [49](gate:49) reviews the principles; [8](gate:8) brings what you have to contribute and [14](gate:14) the resources to sustain it.',
      'Revolution here is **changing the terms of the deal**, not tearing down for the sake of it. [49](gate:49) is the gate of justified refusal: when an agreement stops being fair, something has to be reformulated — and these are the people who formulate it.',
      'It works when there is something to offer instead. **Refusing with no proposal exhausts everyone**, starting with you.'
    ],
    'of Separation': [
      '[Gate 5](gate:5) sets the rhythm and [35](gate:35) reaches for new experience; [47](gate:47) tries to make sense of confusion and [22](gate:22) opens or closes the emotional door to others.',
      'Separation is not loneliness: it is **the capacity to stay distinct**, not to merge with the group. What these people contribute is exactly that — a view that has not caught the mood of the room.',
      'The cost is feeling apart. [22](gate:22) knows when to open; **using it well turns separation into perspective rather than isolation**.'
    ],
    'of the Plane': [
      '[Gate 6](gate:6) brings friction and intimacy and [36](gate:36) crisis; [15](gate:15) loves human variety and [10](gate:10) insists on being true to yourself.',
      'The plane is **the level things are lived at**: this cross is about raising the level of relationship, taking contact with others somewhere deeper than the surface.',
      'It turns on the rhythm of [6](gate:6). **Forcing intimacy while the gate is shut lowers the plane instead of raising it.**'
    ],
    'of Masks': [
      '[Gate 7](gate:7) is the role taken in front of others and [13](gate:13) the one that listens to what they bring; [23](gate:23) supplies the singular voice and [43](gate:43) the insight feeding it.',
      'Masks are not lies: they are **the roles you take depending on where you are**. This cross describes someone who changes mask easily and, precisely because of that, reaches very different people.',
      'The risk is losing track of which one is yours. **A mask works as long as you know it is one.**'
    ],
    'of Uncertainty': [
      '[Gate 8](gate:8) brings your contribution and [14](gate:14) the resources; [55](gate:55) brings spirit and its swings and [59](gate:59) the ability to break through barriers with others.',
      'Uncertainty here is **raw material, not a problem**: these people live without fixed certainties about their mood or their course, and that openness is what lets them make something genuinely new with others.',
      'The trap is demanding emotional consistency of yourself. **[55](gate:55) is not corrected; it is accompanied.**'
    ],
    'of Identification': [
      '[Gate 9](gate:9) focuses on detail and [16](gate:16) supplies enthusiasm and skill; [64](gate:64) fills the head with images and [63](gate:63) casts doubt on them.',
      'To identify is **to recognise what deserves the effort** among everything possible. This cross gives an eye for picking out, from the collective noise, what will actually go somewhere.',
      'The drain comes from identifying *with* what you point at. **Seeing the pattern does not oblige you to carry it.**'
    ],
    'of Prevention': [
      '[Gate 10](gate:10) is your own conduct and [15](gate:15) the love of human variety; [18](gate:18) spots what is off and [17](gate:17) turns it into an opinion.',
      'Prevention is **correcting before the harm lands**. These people catch the flaw in a collective pattern while it is still small, and their contribution is the timely warning.',
      'It only lands well when asked for. **Correcting unasked turns prevention into reproach.**'
    ],
    'of Education': [
      '[Gate 11](gate:11) brings the ideas and [12](gate:12) the caution about voicing them; [46](gate:46) loves the body and being here and [25](gate:25) brings the innocence of universal love.',
      'Education here is not teaching a class: it is **passing something on in a way that changes the other person**. The ideas of [11](gate:11) only educate when they meet the timing of [12](gate:12) — and this cross lives in that wait.',
      'Said at the wrong moment, the best idea sounds like a sermon. **The talent is in the when, not the what.**'
    ],
    'of Upheaval': [
      '[Gate 17](gate:17) gives opinions and [18](gate:18) the critical eye; [38](gate:38) fights for what is worth it and [39](gate:39) provokes to bring out what is underneath.',
      'Upheaval: this cross **stirs up what was comfortable**. Not for fun, but because it can see a structure that will not hold and cannot keep quiet about it. It is one of the energies that push a group to change.',
      '[39](gate:39) provokes without trying to. **The difference between shaking things up and simply being annoying is whether something better is behind it.**'
    ],
    'of Refinement': [
      '[Gate 19](gate:19) approaches and asks and [33](gate:33) withdraws to digest; [1](gate:1) and [2](gate:2) sit underneath as self-expression and direction.',
      'To refine is **to polish what already exists** until it genuinely serves. [19](gate:19) senses what people need and [33](gate:33) processes it alone: out of that comes a very fine sense for what a group is missing.',
      'It needs the retreat. **Without the pause of [33](gate:33), the sensitivity of [19](gate:19) becomes overload.**'
    ],
    'of Duality': [
      '[Gate 20](gate:20) lives in the present and [34](gate:34) is sheer power; [37](gate:37) brings the bargains and [40](gate:40) the will — and the need to withdraw.',
      'Duality is **the two**: this cross is fulfilled in relationship, in pairing up — with a person, a partner, a cause. What one alone cannot do, the pair can.',
      '[40](gate:40) is the reminder that a pair is held together by rest. **A bargain with no retreat ends in resentment.**'
    ],
    'of Endeavor': [
      '[Gate 21](gate:21) wants control of its own domain and [48](gate:48) reaches for depth; [54](gate:54) drives upward and [53](gate:53) begins.',
      'Endeavour is **the energy of climbing**: ambition put to work building something with others, brick by brick. [54](gate:54) is the gate of wanting to end up higher than you started.',
      'The ambition of [54](gate:54) needs recognition to prosper. **Pushing without an alliance is scaling a wall alone that belonged to everyone.**'
    ],
    'of Informing': [
      '[Gate 22](gate:22) opens with grace and [47](gate:47) looks for sense; [11](gate:11) brings the ideas and [12](gate:12) the right moment to say them.',
      'Informing here is **bringing the other person up to date**: the social grace of [22](gate:22) in service of people knowing what they need to know. It sounds minor and it is one of the great preventers of friction.',
      '[12](gate:12) is in charge. **Informing at the wrong moment is as useless as not informing.**'
    ],
    'of Dedication': [
      '[Gate 23](gate:23) supplies the singular voice and [43](gate:43) the insight feeding it; [30](gate:30) brings burning desire and [29](gate:29) the capacity to commit all the way.',
      'Dedication is **giving yourself to something completely**. This cross does not spread itself: it picks and pours in, and that pouring in is what others end up following.',
      '[29](gate:29) says yes easily. **Dedicating yourself to the wrong thing costs years**, so here choosing well is everything.'
    ],
    'of Incarnation': [
      '[Gate 24](gate:24) returns again and again to the same thing and [44](gate:44) recognises patterns from the past; [13](gate:13) listens and [7](gate:7) takes a role.',
      'Incarnation is about **bringing something into the world through your own life**: what these people have chewed over (24) and remembered (44) eventually takes shape in the role they hold in front of others.',
      'It asks patience with repetition. **[24](gate:24) comes back to the same point until one day it brings something different**; cutting it short leaves you without the fruit.'
    ],
    'of Healing': [
      '[Gate 25](gate:25) brings innocent, universal love and [46](gate:46) love of the body; [58](gate:58) brings vitality and [52](gate:52) stillness.',
      'Healing here is **returning someone to their own shape**, not fixing them. Innocence (25) plus physical presence (46) means these people heal mostly through how they are, not what they do.',
      '[25](gate:25) is demanding: **it asks for love without conditions or favourites**, including toward those who do not return it. That is the work.'
    ],
    'of Confrontation': [
      '[Gate 26](gate:26) knows how to present what has value and [45](gate:45) gathers and stewards what is shared; [6](gate:6) brings friction and [36](gate:36) crisis.',
      'To confront is **to put in front of people what was being avoided**. Not a fight: the difficult conversation a group needs and nobody wants to open. These people tend to open it.',
      '[26](gate:26) can overstate to win you over. **An honest confrontation changes something; a manipulated one only wins the argument.**'
    ],
    'of Alignment': [
      '[Gate 27](gate:27) cares and feeds and [28](gate:28) hunts for meaning at some risk; [19](gate:19) approaches to ask and [33](gate:33) withdraws to process.',
      'Alignment is **putting the caring where it actually matters**. With [28](gate:28) this cross weighs what is worth it — and spends the care of [27](gate:27) there, instead of scattering it blindly.',
      'Caring for everything is caring for nothing. **[28](gate:28) is here to choose**, even when choosing hurts.'
    ],
    'of Industry': [
      '[Gate 29](gate:29) commits and [30](gate:30) wants intensely; [20](gate:20) lives in the present and [34](gate:34) supplies the power.',
      'Industry is not working a lot: it is **the capacity to hold a yes over time**. [29](gate:29) gets in and stays in, and with the force of [34](gate:34) behind it that carries through projects other people abandon.',
      'Everything depends on what got the yes. **A commitment sustained in the wrong place is the definition of burnout.**'
    ],
    'of the Alpha': [
      '[Gate 31](gate:31) carries the voice others follow and [41](gate:41) lights the first desire; [24](gate:24) chews things over and [44](gate:44) recognises patterns.',
      'Alpha is **the one who goes first**. Not by imposing, but because their voice names what the group could not yet say. This is a cross of leadership, and leadership here **is granted, not taken**.',
      '[31](gate:31) only works if there are people genuinely following. **Leading without a mandate is talking to yourself.**'
    ],
    'left:of Limitation': [
      '[Gate 32](gate:32) judges what will last and [42](gate:42) closes cycles; [56](gate:56) stimulates with stories and [60](gate:60) sets the limit.',
      'Limitation here is **the good news**: accepting the frame is what lets something finish and endure. [60](gate:60) does not cut back for the pleasure of it — it cuts back so there is a shape.',
      'The temptation is to force the limit. **What gets stretched past [60](gate:60) does not grow, it breaks.**'
    ],
    'of Migration': [
      '[Gate 37](gate:37) weaves the bargains and [40](gate:40) brings will and withdrawal; [5](gate:5) sets the rhythm and [35](gate:35) reaches for new experience.',
      'To migrate is **to move toward something better, together**. This cross describes someone who takes their people somewhere else — a new job, a new city, a new way of doing things — and holds the bond through the move.',
      '[35](gate:35) gets bored and [37](gate:37) commits. **The pull between leaving and keeping the bargain is the life theme.**'
    ],
    'of Individualism': [
      '[Gate 38](gate:38) fights for what is worth fighting for and [39](gate:39) provokes; [57](gate:57) intuits and [51](gate:51) shocks.',
      'Individualism here is not selfishness: it is **the right to be different**, defended by standing your ground. These people hold on to their own oddness and, in doing so, make room for everyone else.',
      'The fight of [38](gate:38) needs a cause. **Without something worth it, it turns into fighting everything.**'
    ],
    'of Cycles': [
      '[Gate 53](gate:53) begins and [54](gate:54) drives upward; [42](gate:42) closes what was started and [32](gate:32) judges what will last.',
      'Cycles: this cross lives **beginnings and endings** as its material. It is not about holding one single thing forever, but about taking each cycle all the way to its end before opening the next.',
      'What hurts is leaving things half done. **[42](gate:42) asks for closure**, and skipping it leaves a wake of open loops.'
    ],
    'of Spirit': [
      '[Gate 55](gate:55) brings spirit and its tides and [59](gate:59) the capacity for real intimacy; [9](gate:9) focuses on detail and [16](gate:16) supplies enthusiasm.',
      'Spirit here means **mood taken seriously**: this cross explores emotional freedom and carries it into its relationships. It is one of the most mutative energies in the chart.',
      'There is nothing to fix. **The melancholy of [55](gate:55) is not a fault**; deciding from inside it is.'
    ],
    'of Distraction': [
      '[Gate 56](gate:56) stimulates by telling and [60](gate:60) sets the limit; [27](gate:27) cares and [28](gate:28) hunts for meaning.',
      'Distraction is not absent-mindedness: it is **the art of pulling someone out of where they were stuck**. A story, a detour, a sideways idea — and suddenly something else is visible. [56](gate:56) is the storyteller gate.',
      'Without [60](gate:60), distraction becomes scatter. **A good detour has a destination.**'
    ],
    'of the Clarion': [
      '[Gate 51](gate:51) is the shock and [57](gate:57) the sharp intuition; [61](gate:61) presses toward mystery and [62](gate:62) orders the detail.',
      'A clarion **calls people to form up**: a sound that cuts through noise and makes heads lift. This cross is about saying something that wakes people, not about saying a lot.',
      'The intuition of [57](gate:57) gets one shot. **Repeating the call turns it into noise.**'
    ],
    'of Demands': [
      '[Gate 52](gate:52) brings stillness and [58](gate:58) vitality; [21](gate:21) wants control of its own domain and [48](gate:48) reaches for depth.',
      'Demands: this cross **asks** — of others and of itself. And it is usually within its rights, because [48](gate:48) genuinely sees what is missing. Well placed, it is the energy that raises a group standard.',
      'Badly placed, it wears everyone out. **[52](gate:52) is the brake: demand from stillness, not from hurry.**'
    ],
    'of Obscuration': [
      '[Gate 61](gate:61) presses toward inner truth and [62](gate:62) orders the facts; [50](gate:50) upholds the values and [3](gate:3) starts the new.',
      'Obscuration is **what cannot be seen yet**. This cross lives with a background question no fact resolves, and its contribution is to hold it up rather than paper over it with explanations.',
      '[62](gate:62) tends to fill the gap with detail. **Sometimes the honest thing is to say it is still dark.**'
    ],
    'of Dominion': [
      '[Gate 63](gate:63) doubts and [64](gate:64) fills with unsorted images; [26](gate:26) knows how to present and [45](gate:45) gathers and stewards.',
      'Dominion is **taking charge**: the doubt of [63](gate:63) put to work checking things before other people carry an error. It is a cross of responsibility, not of power.',
      'Doubt turned inward paralyses. **[63](gate:63) is built to audit what is outside**, not to distrust yourself.'
    ],
    'of Self-expression': [
      'A fixed role: **saying what is yours**. [Gate 1](gate:1) is creativity that has to come out and [2](gate:2) gives it direction; underneath, [4](gate:4) and [49](gate:49) supply answers and principles.',
      'Juxtaposition makes this **non-negotiable**: it is not a calling you pick, it is a need. Keeping quiet here does not avoid conflict, it only postpones it.'
    ],
    'of the Driver': [
      '[Gate 2](gate:2) is direction itself — knowing which way — with [1](gate:1) behind it; [49](gate:49) and [4](gate:4) hold the principles and answers.',
      'The driver **does not push, it steers**. A quiet, fixed role: being where you need to be so others can find their bearings. Looking for credit for it usually spoils it.'
    ],
    'of Mutation': [
      '[Gate 3](gate:3) is the chaotic start of anything new and [50](gate:50) the values that contain it; [41](gate:41) lights the desire and [31](gate:31) lends it a voice.',
      'To mutate is **to bring in what did not exist yet**, mess and all. The role is to bear that mess long enough for it to set, without rushing it or abandoning it.'
    ],
    'of Formulization': [
      '[Gate 4](gate:4) formulates answers and [49](gate:49) reviews principles; [8](gate:8) and [14](gate:14) bring the contribution and the resources.',
      'To formulate is **to give a loose idea a closed shape**. A role of precision: the formula works or it does not. The temptation is formulating before the answer is whole.'
    ],
    'of Habits': [
      '[Gate 5](gate:5) is rhythm and habit and [35](gate:35) the appetite for change; [47](gate:47) and [22](gate:22) look for sense and open the door to others.',
      'Habits are **the scaffolding of a life** here. The role is holding a rhythm of your own without being dragged into anyone else. Breaking it to please costs a lot.'
    ],
    'of Conflict': [
      '[Gate 6](gate:6) is friction and intimacy and [36](gate:36) crisis; [15](gate:15) and [10](gate:10) bring human variety and fidelity to yourself.',
      'Conflict here **is the work, not the accident**: staying in the rub without fleeing it or getting stuck in it. The edge is the rhythm of [6](gate:6) — not every moment is the moment to go in.'
    ],
    'of Interaction': [
      '[Gate 7](gate:7) takes a role in front of others and [13](gate:13) listens to what they bring; [23](gate:23) and [43](gate:43) supply the singular voice and the insight.',
      'Interacting **is the role itself**: being among people, taking in and giving back. Not decorative sociability — the function. Isolation switches the whole chart off.'
    ],
    'of Contribution': [
      '[Gate 8](gate:8) brings what you have to give and [14](gate:14) the resources; [55](gate:55) and [59](gate:59) bring spirit and intimacy.',
      'To contribute is **to put what is yours in service of something without dissolving into it**. The fixed role is to give without asking permission and without needing applause.'
    ],
    'of Focus': [
      '[Gate 9](gate:9) concentrates on detail and [16](gate:16) supplies enthusiasm; [64](gate:64) and [63](gate:63) fill with images and doubts.',
      'Focus is **holding attention where others lose it**. A role of mental stamina, and its drain is having focused on something that did not deserve it.'
    ],
    'of Behavior': [
      '[Gate 10](gate:10) is your own conduct, the most personal gate of all, with [15](gate:15) alongside; [18](gate:18) and [17](gate:17) correct and opine.',
      'The role is **behaving as you are, without adjusting**. It sounds easy and it is among the most demanding: every extra adaptation gets paid for inside.'
    ],
    'of Ideas': [
      '[Gate 11](gate:11) is the storehouse of ideas and [12](gate:12) the caution about releasing them; [46](gate:46) and [25](gate:25) bring the body and innocence.',
      'Having ideas is **a condition here, not an achievement**. The role is not to realise them all — [11](gate:11) is not built for that — but to offer them to whoever can.'
    ],
    'of Articulation': [
      '[Gate 12](gate:12) is measured expression and [11](gate:11) gives it material; [25](gate:25) and [46](gate:46) bring innocent love and the body.',
      'To articulate is **finding the exact form and the exact moment**. The role lives in the wait: said at the wrong time, the same thing loses all its value.'
    ],
    'of Listening': [
      '[Gate 13](gate:13) listens and keeps what people tell it, with [7](gate:7) alongside; [43](gate:43) and [23](gate:23) supply the insight and the voice.',
      'Listening is **a craft** here: people tell these ones things without knowing why. The role is spoiled by using what was heard for anything other than giving it back well.'
    ],
    'of Empowering': [
      '[Gate 14](gate:14) is abundance of resources and [8](gate:8) the contribution; [59](gate:59) and [55](gate:55) bring intimacy and spirit.',
      'To empower is **putting resources where someone can use them better than you can**. A quiet patron role; the edge is giving them to someone who will not move them.'
    ],
    'of Extremes': [
      '[Gate 15](gate:15) holds the whole range of human variety — from excess to scarcity — with [10](gate:10) alongside; [17](gate:17) and [18](gate:18) opine and correct.',
      'The role is **living at the extremes without normalising**. These people keep odd rhythms, and the oddness is the contribution: they widen what counts as human.'
    ],
    'of Experimentation': [
      '[Gate 16](gate:16) is the enthusiasm that leaps and [9](gate:9) the detail; [63](gate:63) and [64](gate:64) doubt and gather images.',
      'To experiment is **trying before knowing**. The role asks you to leap, and error is part of the method — but [16](gate:16) without repetition stays a jump with no skill behind it.'
    ],
    'of Opinions': [
      '[Gate 17](gate:17) forms opinions and [18](gate:18) sees what is off; [38](gate:38) and [39](gate:39) fight and provoke.',
      'Having opinions is **the role**, not a vice. The delicate part is that an opinion is not a truth: it helps when offered and gets in the way when imposed.'
    ],
    'of Correction': [
      '[Gate 18](gate:18) spots the flaw and [17](gate:17) puts it into words; [39](gate:39) and [38](gate:38) provoke and fight.',
      'Correcting is **the fixed craft**: seeing what could be better before anyone else. Well aimed it is a gift to the group; aimed inward without a brake it corrodes.'
    ],
    'of Need': [
      '[Gate 19](gate:19) senses what is missing and [33](gate:33) retreats to digest it; [1](gate:1) and [2](gate:2) bring expression and direction.',
      'The role is **noticing the need before it is spoken**. Very sensitive, very useful — and exhausting if the retreat of [33](gate:33) is not respected.'
    ],
    'of the Now': [
      '[Gate 20](gate:20) lives in the pure present and [34](gate:34) supplies the force; [37](gate:37) and [40](gate:40) bring bargains and withdrawal.',
      'Being in the now is **the whole function**: no over-planning, no chewing the past. The independence of juxtaposition here protects that present from other people\'s agendas.'
    ],
    'of Control': [
      '[Gate 21](gate:21) wants control over its own — resources, territory — and [48](gate:48) reaches for depth; [54](gate:54) and [53](gate:53) drive and begin.',
      'The role is **running your own affairs without anyone running them for you**. Extended to other people\'s, the same impulse turns into petty tyranny.'
    ],
    'of Grace': [
      '[Gate 22](gate:22) opens and closes the emotional door with grace and [47](gate:47) looks for sense; [11](gate:11) and [12](gate:12) bring ideas and caution.',
      'Grace is **knowing how to be**: listening, opening up, staying quiet at the right moment. A very fine social role, and it depends entirely on the mood of the day.'
    ],
    'of Assimilation': [
      '[Gate 23](gate:23) translates the singular into something comprehensible and [43](gate:43) intuits it; [30](gate:30) and [29](gate:29) desire and commit.',
      'To assimilate is **making the strange digestible**. The role turns on timing: the same sentence is brilliant or unintelligible depending on when it lands.'
    ],
    'of Rationalization': [
      '[Gate 24](gate:24) returns again and again to the same thing and [44](gate:44) recognises patterns; [13](gate:13) and [7](gate:7) listen and take a role.',
      'To rationalise is **making sense of what hurt**. A role of productive chewing; the edge is when the chewing loops and never reaches a conclusion.'
    ],
    'of Innocence': [
      '[Gate 25](gate:25) is universal love with no favourites and [46](gate:46) love of the body; [58](gate:58) and [52](gate:52) bring vitality and stillness.',
      'Innocence here is **a hard role**: loving without conditions includes those who do not deserve it. It is not naivety; it is a sustained choice.'
    ],
    'of the Trickster': [
      '[Gate 26](gate:26) knows how to present what has value and [45](gate:45) gathers what is shared; [6](gate:6) and [36](gate:36) bring friction and crisis.',
      'The trickster **sells, and somebody has to sell**. The role is legitimate as long as what is sold is real: the same talent, with the truth stretched, is manipulation.'
    ],
    'of Caring': [
      '[Gate 27](gate:27) cares and feeds and [28](gate:28) hunts for meaning; [19](gate:19) and [33](gate:33) approach and withdraw.',
      'Caring is **the fixed function**, and the warning is an old one: [27](gate:27) looks after others easily and itself with difficulty. That is where the whole lesson sits.'
    ],
    'of Risks': [
      '[Gate 28](gate:28) stakes its life on finding meaning and [27](gate:27) cares; [33](gate:33) and [19](gate:19) process and approach.',
      'Risking **is the role**: without the risk the meaning does not show up. What does not count is risk for the adrenaline — [28](gate:28) always asks what for.'
    ],
    'of Commitment': [
      '[Gate 29](gate:29) says yes and stays to the end and [30](gate:30) desires; [20](gate:20) and [34](gate:34) bring the present and the power.',
      'Committing is **the entire function**. That is why the yes matters so much: here a commitment does not get abandoned, so a yes given badly mortgages years.'
    ],
    'of Fates': [
      '[Gate 30](gate:30) is the burning desire that marks a life and [29](gate:29) the commitment; [34](gate:34) and [20](gate:20) bring force and the present.',
      'Fates here are **what desire ends up building**. An intense role: what is genuinely longed for tends to happen, for better and for worse.'
    ],
    'of Influence': [
      '[Gate 31](gate:31) carries the voice others follow and [41](gate:41) lights the desire; [24](gate:24) and [44](gate:44) chew over and recognise patterns.',
      'Influencing is **the fixed role**, and it comes with a condition: [31](gate:31) only works if someone wants to follow. Influence taken by force is not influence.'
    ],
    'of Conservation': [
      '[Gate 32](gate:32) judges what will last and [42](gate:42) closes cycles; [56](gate:56) and [60](gate:60) stimulate and limit.',
      'Conserving is **protecting what deserves to survive**. A prudent, necessary role; its shadow is fear of change dressed up as good sense.'
    ],
    'of Retreat': [
      '[Gate 33](gate:33) withdraws to digest what happened and [19](gate:19) senses the need; [2](gate:2) and [1](gate:1) give direction and expression.',
      'Retreating here is **a function, not an escape**. The material cooks in the silence, and what comes out of it is what these people have to tell.'
    ],
    'of Power': [
      '[Gate 34](gate:34) is sheer power, the one gate that cannot express itself alone, and [20](gate:20) brings it into the present; [40](gate:40) and [37](gate:37) supply will and bargains.',
      'Power here **is not explained, it is used**. A role of available force; the trap is spending it on what responded to nothing.'
    ],
    'of Experience': [
      '[Gate 35](gate:35) wants to have tried everything and [5](gate:5) sets the rhythm; [22](gate:22) and [47](gate:47) open and make sense.',
      'Living experience **is the role**. The contribution comes afterwards: someone who has been to many places and can tell you about it. Without the rhythm of [5](gate:5), experience turns into flight.'
    ],
    'of Crisis': [
      '[Gate 36](gate:36) is crisis and the not-yet-lived and [6](gate:6) friction; [10](gate:10) and [15](gate:15) bring fidelity to yourself and human variety.',
      'Crisis here **is the terrain**, not the exception. The role is getting through them without dramatising, and not walking into the next before digesting the last.'
    ],
    'of Bargains': [
      '[Gate 37](gate:37) weaves the bargains that hold a family together and [40](gate:40) brings will and withdrawal; [5](gate:5) and [35](gate:35) give rhythm and experience.',
      'The bargain is **the function**: give and take on clear terms. And its rule is hard — an agreement accepted unwillingly always collects.'
    ],
    'of Opposition': [
      '[Gate 38](gate:38) fights for what is worth it and [39](gate:39) provokes; [57](gate:57) and [51](gate:51) intuit and shock.',
      'Opposing is **the role**, and it is not negativity: without someone standing their ground, a lot of bad things happen quietly. The condition is that the cause is real.'
    ],
    'of Provocation': [
      '[Gate 39](gate:39) provokes to bring out what is underneath and [38](gate:38) fights; [51](gate:51) and [57](gate:57) shock and intuit.',
      'To provoke is **to uncover**: an uncomfortable question, a badly timed remark, and suddenly what was unsaid is out. Useful when it is after something; cruel when it only wants a reaction.'
    ],
    'of Denial': [
      '[Gate 40](gate:40) is the one who works and then withdraws, and needs both; [37](gate:37), [35](gate:35) and [5](gate:5) bring bargains, experience and rhythm.',
      'Refusing is **a capacity here, not a flaw**: saying no and pulling back to recover. The role breaks when the withdrawal becomes permanent isolation.'
    ],
    'of Fantasy': [
      '[Gate 41](gate:41) lights the desire that opens every cycle and [31](gate:31) lends it a voice; [44](gate:44) and [24](gate:24) recognise and chew over.',
      'Fantasy is **the start of everything that later exists**. An imaginative role, with a real limit: [41](gate:41) imagines far more than one life can hold.'
    ],
    'of Completion': [
      '[Gate 42](gate:42) closes what was started and [32](gate:32) judges what will last; [60](gate:60) and [56](gate:56) limit and stimulate.',
      'Completing is **the whole role**. Few people finish; these ones do. The drain comes from getting into cycles that should never have been started.'
    ],
    'of Insight': [
      '[Gate 43](gate:43) knows something all at once and from inside, and [23](gate:23) translates it; [29](gate:29) and [30](gate:30) commit and desire.',
      'Insight here **arrives whole and without explanation**. The role is holding it until you find how to say it; letting it out raw usually sounds absurd.'
    ],
    'of Alertness': [
      '[Gate 44](gate:44) recognises past patterns in the present and [24](gate:24) chews over; [7](gate:7) and [13](gate:13) take a role and listen.',
      'Alertness is **the function**: catching the pattern that already went wrong once. It is instinct, not reasoning, and it works better when it is not argued.'
    ],
    'of Possession': [
      '[Gate 45](gate:45) gathers and administers what belongs to everyone and [26](gate:26) knows how to present it; [36](gate:36) and [6](gate:6) bring crisis and friction.',
      'Possession here is **taking charge of what is shared**, not hoarding. The role is the one who keeps the group\'s resources — and the line with appropriation is thin.'
    ],
    'of Serendipity': [
      '[Gate 46](gate:46) is love of the body and being in the right place, and [25](gate:25) innocence; [52](gate:52) and [58](gate:58) bring stillness and vitality.',
      'Serendipity is **being where you need to be without having planned it**. A fortunate role, and its condition is physical: looking after the body here is looking after the luck.'
    ],
    'of Oppression': [
      '[Gate 47](gate:47) gets stuck trying to make sense of confusion and [22](gate:22) opens; [12](gate:12) and [11](gate:11) measure and imagine.',
      'Oppression is **the feeling of finding no way out** while the processing happens. The role is bearing it without forcing the conclusion: understanding arrives on its own, and it arrives late.'
    ],
    'of Depth': [
      '[Gate 48](gate:48) reaches for depth and fears not having it, and [21](gate:21) wants control; [53](gate:53) and [54](gate:54) begin and drive.',
      'Depth is **the role**, and it comes with its fear attached: the sense of not knowing enough. That fear is the engine, not evidence that it is true.'
    ],
    'of Principles': [
      '[Gate 49](gate:49) upholds principles and breaks when they are violated, with [4](gate:4) alongside; [14](gate:14) and [8](gate:8) bring resources and contribution.',
      'Having principles is **a social function** here: somebody has to mark where the line is. The edge is rigidity — a principle never revisited turns into dogma.'
    ],
    'of Values': [
      '[Gate 50](gate:50) keeps the values that hold a group and [3](gate:3) starts the new; [31](gate:31) and [41](gate:41) give voice and desire.',
      'Guarding values is **the fixed role**. Not moralising: noticing when a group is skipping what kept it standing, and saying so.'
    ],
    'of Shock': [
      '[Gate 51](gate:51) shocks and wakes and [57](gate:57) intuits; [61](gate:61) and [62](gate:62) press toward mystery and order the detail.',
      'Shock is **the role**: producing the jolt that gets someone off autopilot. These people usually cause it without meaning to, just by how they arrive.'
    ],
    'of Stillness': [
      '[Gate 52](gate:52) stays still in order to see and [58](gate:58) supplies vitality; [21](gate:21) and [48](gate:48) control and go deep.',
      'Stillness is **an active function**, not passivity: staying long enough for what movement hides to become visible. Costly in a world that rewards hurry.'
    ],
    'of Beginnings': [
      '[Gate 53](gate:53) starts things — that is its entire energy — and [54](gate:54) drives upward; [42](gate:42) and [32](gate:32) close and evaluate.',
      'Beginning is **the role**, and it does not include finishing. Understanding that removes a lot of guilt: the contribution is the start, and others can carry it to the end.'
    ],
    'of Ambition': [
      '[Gate 54](gate:54) drives upward from below and [53](gate:53) begins; [32](gate:32) and [42](gate:42) measure and close.',
      'Ambition is **the function**, and it has a rule: it prospers when it is recognised. Pushing without an alliance leaves these people climbing a very long ladder alone.'
    ],
    'of Moods': [
      '[Gate 55](gate:55) is spirit and its emotional tide, and [59](gate:59) breaks barriers; [9](gate:9) and [16](gate:16) focus and enthuse.',
      'Moods here are **the working terrain**, not a problem to solve. The role is living them honestly, and the one practical rule is not deciding from the low point.'
    ],
    'of Stimulation': [
      '[Gate 56](gate:56) tells and stimulates and [60](gate:60) sets the limit; [27](gate:27) and [28](gate:28) care and hunt for meaning.',
      'Stimulating is **the storyteller\'s role**: keeping people awake with what you tell them. And its limit is [60](gate:60) — without it, stimulation turns into noise.'
    ],
    'of Intuition': [
      '[Gate 57](gate:57) hears what is not said and [51](gate:51) shocks; [62](gate:62) and [61](gate:61) order the detail and press toward mystery.',
      'Intuition here **is the whole instrument**. It works in the present and only once; reasoning about it afterwards erases it. The role is trusting that first signal.'
    ],
    'of Vitality': [
      '[Gate 58](gate:58) is the joy of being alive and [52](gate:52) stillness; [48](gate:48) and [21](gate:21) go deep and control.',
      'Vitality is **the role**, and it is not optimism: a physical energy that pushes to improve things because living feels good. When it goes, something is being over-corrected.'
    ],
    'of Strategy': [
      '[Gate 59](gate:59) breaks through barriers to reach intimacy and [55](gate:55) brings spirit; [16](gate:16) and [9](gate:9) enthuse and focus.',
      'Strategy here is **knowing how to approach**: how the distance to another person gets crossed. An intimate, very concrete role; forcing it closes exactly what it meant to open.'
    ],
    'juxtaposition:of Limitation': [
      '[Gate 60](gate:60) accepts the limit so something can take shape and [56](gate:56) stimulates; [28](gate:28) and [27](gate:27) hunt for meaning and care.',
      'The limit is **the function**, and it is good news: no frame, no form. The shadow is melancholy about what does not fit — real, and not a reason to force the frame.'
    ],
    'of Thinking': [
      '[Gate 61](gate:61) presses toward the truth underneath and [62](gate:62) orders the facts; [50](gate:50) and [3](gate:3) hold values and start the new.',
      'Thinking here is **a pressure, not a pastime**: [61](gate:61) pushes to know without guaranteeing an answer. The role is holding the question without manufacturing conclusions to quiet it.'
    ],
    'of Detail': [
      '[Gate 62](gate:62) names and orders the details and [61](gate:61) presses toward mystery; [3](gate:3) and [50](gate:50) start and hold values.',
      'Detail is **the role**: naming things so they can be handled. An enormous and under-credited contribution; its shadow is getting lost in the small and missing the whole.'
    ],
    'of Doubts': [
      '[Gate 63](gate:63) doubts everything put in front of it and [64](gate:64) gathers images; [26](gate:26) and [45](gate:45) present and administer.',
      'Doubting is **the function**, and it is valuable: somebody has to ask whether this actually works. Aimed inward it paralyses; aimed outward it protects the group.'
    ],
    'of Confusion': [
      '[Gate 64](gate:64) fills with unsorted images and [63](gate:63) doubts; [45](gate:45) and [26](gate:26) gather and present.',
      'Confusion here is **the normal working state**, not a fault: the mind takes in more material than it can order, and the order arrives by itself, in time. Forcing it is the only thing that makes it worse.'
    ]
  },

  // English cross names. See es.js for the sourcing and the validation test.
  crossName: {
    '1|right': 'Right Angle Cross of the Sphinx',
    '2|right': 'Right Angle Cross of the Sphinx',
    '7|right': 'Right Angle Cross of the Sphinx',
    '13|right': 'Right Angle Cross of the Sphinx',
    '1|juxtaposition': 'Juxtaposition Cross of Self-expression',
    '1|left': 'Left Angle Cross of Defiance',
    '2|juxtaposition': 'Juxtaposition Cross of the Driver',
    '2|left': 'Left Angle Cross of Defiance',
    '3|right': 'Right Angle Cross of Laws',
    '3|juxtaposition': 'Juxtaposition Cross of Mutation',
    '3|left': 'Left Angle Cross of Wishes',
    '4|right': 'Right Angle Cross of Explanation',
    '4|juxtaposition': 'Juxtaposition Cross of Formulization',
    '4|left': 'Left Angle Cross of Revolution',
    '5|right': 'Right Angle Cross of Consciousness',
    '5|juxtaposition': 'Juxtaposition Cross of Habits',
    '5|left': 'Left Angle Cross of Separation',
    '6|right': 'Right Angle Cross of Eden',
    '6|juxtaposition': 'Juxtaposition Cross of Conflict',
    '6|left': 'Left Angle Cross of the Plane',
    '7|juxtaposition': 'Juxtaposition Cross of Interaction',
    '7|left': 'Left Angle Cross of Masks',
    '8|right': 'Right Angle Cross of Contagion',
    '8|juxtaposition': 'Juxtaposition Cross of Contribution',
    '8|left': 'Left Angle Cross of Uncertainty',
    '9|right': 'Right Angle Cross of Planning',
    '9|juxtaposition': 'Juxtaposition Cross of Focus',
    '9|left': 'Left Angle Cross of Identification',
    '10|right': 'Right Angle Cross of the Vessel of Love',
    '10|juxtaposition': 'Juxtaposition Cross of Behavior',
    '10|left': 'Left Angle Cross of Prevention',
    '11|right': 'Right Angle Cross of Eden',
    '11|juxtaposition': 'Juxtaposition Cross of Ideas',
    '11|left': 'Left Angle Cross of Education',
    '12|right': 'Right Angle Cross of Eden',
    '12|juxtaposition': 'Juxtaposition Cross of Articulation',
    '12|left': 'Left Angle Cross of Education',
    '13|juxtaposition': 'Juxtaposition Cross of Listening',
    '13|left': 'Left Angle Cross of Masks',
    '14|right': 'Right Angle Cross of Contagion',
    '14|juxtaposition': 'Juxtaposition Cross of Empowering',
    '14|left': 'Left Angle Cross of Uncertainty',
    '15|right': 'Right Angle Cross of the Vessel of Love',
    '15|juxtaposition': 'Juxtaposition Cross of Extremes',
    '15|left': 'Left Angle Cross of Prevention',
    '16|right': 'Right Angle Cross of Planning',
    '16|juxtaposition': 'Juxtaposition Cross of Experimentation',
    '16|left': 'Left Angle Cross of Identification',
    '17|right': 'Right Angle Cross of Service',
    '17|juxtaposition': 'Juxtaposition Cross of Opinions',
    '17|left': 'Left Angle Cross of Upheaval',
    '18|right': 'Right Angle Cross of Service',
    '18|juxtaposition': 'Juxtaposition Cross of Correction',
    '18|left': 'Left Angle Cross of Upheaval',
    '19|right': 'Right Angle Cross of the Four Ways',
    '19|juxtaposition': 'Juxtaposition Cross of Need',
    '19|left': 'Left Angle Cross of Refinement',
    '20|right': 'Right Angle Cross of the Sleeping Phoenix',
    '20|juxtaposition': 'Juxtaposition Cross of the Now',
    '20|left': 'Left Angle Cross of Duality',
    '21|right': 'Right Angle Cross of Tension',
    '21|juxtaposition': 'Juxtaposition Cross of Control',
    '21|left': 'Left Angle Cross of Endeavor',
    '22|right': 'Right Angle Cross of Rulership',
    '22|juxtaposition': 'Juxtaposition Cross of Grace',
    '22|left': 'Left Angle Cross of Informing',
    '23|right': 'Right Angle Cross of Explanation',
    '23|juxtaposition': 'Juxtaposition Cross of Assimilation',
    '23|left': 'Left Angle Cross of Dedication',
    '24|right': 'Right Angle Cross of the Four Ways',
    '24|juxtaposition': 'Juxtaposition Cross of Rationalization',
    '24|left': 'Left Angle Cross of Incarnation',
    '25|right': 'Right Angle Cross of the Vessel of Love',
    '25|juxtaposition': 'Juxtaposition Cross of Innocence',
    '25|left': 'Left Angle Cross of Healing',
    '26|right': 'Right Angle Cross of Rulership',
    '26|juxtaposition': 'Juxtaposition Cross of the Trickster',
    '26|left': 'Left Angle Cross of Confrontation',
    '27|right': 'Right Angle Cross of the Unexpected',
    '27|juxtaposition': 'Juxtaposition Cross of Caring',
    '27|left': 'Left Angle Cross of Alignment',
    '28|right': 'Right Angle Cross of the Unexpected',
    '28|juxtaposition': 'Juxtaposition Cross of Risks',
    '28|left': 'Left Angle Cross of Alignment',
    '29|right': 'Right Angle Cross of Contagion',
    '29|juxtaposition': 'Juxtaposition Cross of Commitment',
    '29|left': 'Left Angle Cross of Industry',
    '30|right': 'Right Angle Cross of Contagion',
    '30|juxtaposition': 'Juxtaposition Cross of Fates',
    '30|left': 'Left Angle Cross of Industry',
    '31|right': 'Right Angle Cross of the Unexpected',
    '31|juxtaposition': 'Juxtaposition Cross of Influence',
    '31|left': 'Left Angle Cross of the Alpha',
    '32|right': 'Right Angle Cross of Maya',
    '32|juxtaposition': 'Juxtaposition Cross of Conservation',
    '32|left': 'Left Angle Cross of Limitation',
    '33|right': 'Right Angle Cross of the Four Ways',
    '33|juxtaposition': 'Juxtaposition Cross of Retreat',
    '33|left': 'Left Angle Cross of Refinement',
    '34|right': 'Right Angle Cross of the Sleeping Phoenix',
    '34|juxtaposition': 'Juxtaposition Cross of Power',
    '34|left': 'Left Angle Cross of Duality',
    '35|right': 'Right Angle Cross of Consciousness',
    '35|juxtaposition': 'Juxtaposition Cross of Experience',
    '35|left': 'Left Angle Cross of Separation',
    '36|right': 'Right Angle Cross of Eden',
    '36|juxtaposition': 'Juxtaposition Cross of Crisis',
    '36|left': 'Left Angle Cross of the Plane',
    '37|right': 'Right Angle Cross of Planning',
    '37|juxtaposition': 'Juxtaposition Cross of Bargains',
    '37|left': 'Left Angle Cross of Migration',
    '38|right': 'Right Angle Cross of Tension',
    '38|juxtaposition': 'Juxtaposition Cross of Opposition',
    '38|left': 'Left Angle Cross of Individualism',
    '39|right': 'Right Angle Cross of Tension',
    '39|juxtaposition': 'Juxtaposition Cross of Provocation',
    '39|left': 'Left Angle Cross of Individualism',
    '40|right': 'Right Angle Cross of Planning',
    '40|juxtaposition': 'Juxtaposition Cross of Denial',
    '40|left': 'Left Angle Cross of Migration',
    '41|right': 'Right Angle Cross of the Unexpected',
    '41|juxtaposition': 'Juxtaposition Cross of Fantasy',
    '41|left': 'Left Angle Cross of the Alpha',
    '42|right': 'Right Angle Cross of Maya',
    '42|juxtaposition': 'Juxtaposition Cross of Completion',
    '42|left': 'Left Angle Cross of Limitation',
    '43|right': 'Right Angle Cross of Explanation',
    '43|juxtaposition': 'Juxtaposition Cross of Insight',
    '43|left': 'Left Angle Cross of Dedication',
    '44|right': 'Right Angle Cross of the Four Ways',
    '44|juxtaposition': 'Juxtaposition Cross of Alertness',
    '44|left': 'Left Angle Cross of Incarnation',
    '45|right': 'Right Angle Cross of Rulership',
    '45|juxtaposition': 'Juxtaposition Cross of Possession',
    '45|left': 'Left Angle Cross of Confrontation',
    '46|right': 'Right Angle Cross of the Vessel of Love',
    '46|juxtaposition': 'Juxtaposition Cross of Serendipity',
    '46|left': 'Left Angle Cross of Healing',
    '47|right': 'Right Angle Cross of Rulership',
    '47|juxtaposition': 'Juxtaposition Cross of Oppression',
    '47|left': 'Left Angle Cross of Informing',
    '48|right': 'Right Angle Cross of Tension',
    '48|juxtaposition': 'Juxtaposition Cross of Depth',
    '48|left': 'Left Angle Cross of Endeavor',
    '49|right': 'Right Angle Cross of Explanation',
    '49|juxtaposition': 'Juxtaposition Cross of Principles',
    '49|left': 'Left Angle Cross of Revolution',
    '50|right': 'Right Angle Cross of Laws',
    '50|juxtaposition': 'Juxtaposition Cross of Values',
    '50|left': 'Left Angle Cross of Wishes',
    '51|right': 'Right Angle Cross of Penetration',
    '51|juxtaposition': 'Juxtaposition Cross of Shock',
    '51|left': 'Left Angle Cross of the Clarion',
    '52|right': 'Right Angle Cross of Service',
    '52|juxtaposition': 'Juxtaposition Cross of Stillness',
    '52|left': 'Left Angle Cross of Demands',
    '53|right': 'Right Angle Cross of Penetration',
    '53|juxtaposition': 'Juxtaposition Cross of Beginnings',
    '53|left': 'Left Angle Cross of Cycles',
    '54|right': 'Right Angle Cross of Penetration',
    '54|juxtaposition': 'Juxtaposition Cross of Ambition',
    '54|left': 'Left Angle Cross of Cycles',
    '55|right': 'Right Angle Cross of the Sleeping Phoenix',
    '55|juxtaposition': 'Juxtaposition Cross of Moods',
    '55|left': 'Left Angle Cross of Spirit',
    '56|right': 'Right Angle Cross of Laws',
    '56|juxtaposition': 'Juxtaposition Cross of Stimulation',
    '56|left': 'Left Angle Cross of Distraction',
    '57|right': 'Right Angle Cross of Penetration',
    '57|juxtaposition': 'Juxtaposition Cross of Intuition',
    '57|left': 'Left Angle Cross of the Clarion',
    '58|right': 'Right Angle Cross of Service',
    '58|juxtaposition': 'Juxtaposition Cross of Vitality',
    '58|left': 'Left Angle Cross of Demands',
    '59|right': 'Right Angle Cross of the Sleeping Phoenix',
    '59|juxtaposition': 'Juxtaposition Cross of Strategy',
    '59|left': 'Left Angle Cross of Spirit',
    '60|right': 'Right Angle Cross of Laws',
    '60|juxtaposition': 'Juxtaposition Cross of Limitation',
    '60|left': 'Left Angle Cross of Distraction',
    '61|right': 'Right Angle Cross of Maya',
    '61|juxtaposition': 'Juxtaposition Cross of Thinking',
    '61|left': 'Left Angle Cross of Obscuration',
    '62|right': 'Right Angle Cross of Maya',
    '62|juxtaposition': 'Juxtaposition Cross of Detail',
    '62|left': 'Left Angle Cross of Obscuration',
    '63|right': 'Right Angle Cross of Consciousness',
    '63|juxtaposition': 'Juxtaposition Cross of Doubts',
    '63|left': 'Left Angle Cross of Dominion',
    '64|right': 'Right Angle Cross of Consciousness',
    '64|juxtaposition': 'Juxtaposition Cross of Confusion',
    '64|left': 'Left Angle Cross of Dominion'
  },

  signal: {
    generator: {
      aligned: {
        name: 'Satisfaction',
        text: [
          '**Satisfaction** is the sign that a Generator is spending their energy well: a good kind of tired at the end of the day, and the sense that the effort went somewhere worth going. It is not euphoria or constant enthusiasm — it is a quiet depth you notice most when you stop.',
          'It shows up when the commitment came from a **response in the body** rather than a calculation in the head. Day after day, it is a good sign the [respond](strategy:respond) strategy is actually being followed.'
        ]
      },
      misaligned: {
        name: 'Frustration',
        text: [
          '**Frustration** is the sign that a Generator has committed to something the body never said yes to: things that will not get going, effort that does not add up, the feeling of being stuck.',
          'It is not a character flaw, and it is not a reason to push harder. It is information. When it takes over, what usually helps is looking back at what got a yes and why, and going back to waiting for something to respond to.'
        ]
      }
    },
    'manifesting-generator': {
      aligned: {
        name: 'Satisfaction',
        text: [
          '**Satisfaction**, with some peace around it, is the sign that a Manifesting Generator is on track: moving fast on what lights them up, skipping what does not need doing, and finishing what they start.',
          'It shows up when the commitment came from a response in the body **and** the people in the path of the move were told about it. Both halves count: responding without informing leaves friction around you even when the work itself is right.'
        ]
      },
      misaligned: {
        name: 'Frustration',
        text: [
          '**Frustration**, often mixed with anger, is the sign that a Manifesting Generator has spread themselves thin: too many commitments the body did not back, or moves made without warning that run into everyone else’s resistance.',
          'It tends to look like half-finished projects and a lot of hurry with little progress. When it takes over, look at where the yeses piled up and who never got told.'
        ]
      }
    },
    projector: {
      aligned: {
        name: 'Success',
        text: [
          '**Success** is the Projector’s signal, and here it has nothing to do with money or status: it means **being seen**. You feel it when your way of seeing is recognized, when an invitation actually fits, and when your effort lands with someone who values it.',
          'It shows up when you wait for recognition instead of offering yourself unasked, and when you ration your energy instead of forcing yourself to keep a Generator’s pace.'
        ]
      },
      misaligned: {
        name: 'Bitterness',
        text: [
          '**Bitterness** is the sign that a Projector is offering themselves where they were not invited, or demanding an energy they do not have: feeling invisible, giving a lot and getting little back, and worn out underneath it.',
          'It is the easiest signal to mistake for other people’s problem. When it takes over, it usually means rest is overdue, energy needs pulling back from where it is not valued, and recognition is something to wait for rather than chase.'
        ]
      }
    },
    manifestor: {
      aligned: {
        name: 'Peace',
        text: [
          '**Peace** is the Manifestor’s signal: calm around you and room to move. It is not permanent inner serenity — it is the absence of resistance, the sense that you can start something without every step turning into a struggle.',
          'It shows up above all when you **inform before acting**: telling the people your impact will reach is what defuses opposition before it has a chance to form.'
        ]
      },
      misaligned: {
        name: 'Anger',
        text: [
          '**Anger** is the sign that a Manifestor is running into resistance: people pushing back, permissions that never come, the feeling of having to fight for every move.',
          'It nearly always points to the same two things: acting without informing, or forcing a steadiness this design was never built for. When it takes over, look at who did not get told — and at how much rest is being skipped.'
        ]
      }
    },
    reflector: {
      aligned: {
        name: 'Surprise',
        text: [
          '**Surprise**, with a certain delight in it, is the Reflector’s signal: life surprises you pleasantly when the places and the company are right. It is a lighter signal than the others, which is exactly why it is worth paying attention to.',
          'It shows up when you choose carefully where you are and who you are with, and when you **give yourself the whole cycle** before closing anything that matters.'
        ]
      },
      misaligned: {
        name: 'Disappointment',
        text: [
          '**Disappointment** is the sign that a Reflector is in the wrong place, with the wrong people, or has decided too fast.',
          'It is rarely about the particular individuals. It is about fit — what a Reflector samples from the environment goes right through them. When it takes over, changing the environment does far more than trying harder.'
        ]
      }
    }
  },

  cross: {
    right: {
      name: 'Right Angle Cross',
      text: 'The **angle** of this cross is a **right** one — meaning life is oriented by a **personal** geometry: the path is walked mostly through your own experience, and what is yours gets fulfilled by living it. It is by far the most common angle.'
    },
    left: {
      name: 'Left Angle Cross',
      text: 'The **angle** of this cross is a **left** one — meaning life is oriented by a **transpersonal** geometry: much of what matters arrives through other people, and what is yours gets fulfilled in relationship with them. The encounters are not incidental to the path, they are what it is made of.'
    },
    juxtaposition: {
      name: 'Juxtaposition Cross',
      text: 'The **angle** of this cross is a **juxtaposition** — meaning life is oriented by a **fixed** geometry: a very specific role, neither personal nor transpersonal, held fairly independently of what goes on around it. It belongs to a single profile, the 4/1, and is the rarest angle.'
    }
  }
};

export default deepMerge(es, overrides);
