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
    }
  },

  // ── Prompt templates (grammar-bound connective text) ─────────────────────
  promptTemplates: {
    frame: 'In the framework of Human Design',
    ask: '{frame}, can you explain {subject} in detail?',
    askChart: '{frame}, for {who}, can you explain {subject} in detail?',
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
      planet: 'what {name} represents'
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
      activation: 'what planetary activations are'
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
    ichingNamed: 'Its root is hexagram {g} of the I Ching, "{name}".',
    ichingPlain: 'It corresponds to hexagram {g} of the I Ching.',
    deeper: 'For a deeper reading, you can use the "learn more using AI" option.',
    gateComplete:
      'In this chart, gate {g} is active and forms part of a complete channel: an energy contributed steadily and in an integrated way.',
    gateHanging:
      'In this chart, gate {g} is active but hanging: its theme is present, and its other half is only completed occasionally — with certain people or during certain transits.',
    gateInactive:
      'In this chart, gate {g} is not active: it is an energy recognized and received from others and from the environment, rather than a constant of one’s own.',
    channelTitle: '{a}-{b}: {name}',
    channelTitlePlain: 'Channel {a}-{b}',
    channelIs: 'This is the **{name}**: {essence}',
    channelPair:
      'It brings together "{ta}" ([gate {a}](gate:{a})) and "{tb}" ([gate {b}](gate:{b})), which are best read together to grasp its character.',
    channelBoth:
      'With both of its gates active, the channel is complete: it defines the two centers it connects and creates a steady current of energy between them.',
    channelComplete:
      'In this chart, channel {a}-{b} is complete: a current contributed steadily and in an integrated way.',
    channelHalf:
      'In this chart, one of the two gates of channel {a}-{b} is active ([gate {on}](gate:{on})) but not the other ([gate {off}](gate:{off})): a half channel that is completed occasionally, with someone who has the missing gate or during certain transits.',
    channelNone:
      'In this chart, neither of the two gates of channel {a}-{b} is active: a current found mostly in other people.',
    profileTitle: 'Profile {profile}',
    profileIntro:
      'Profile {profile} combines two lines: the {a}, conscious, and the {b}, unconscious. Each adds its own nuance, and together they describe a way of learning, of relating and of unfolding one’s purpose.'
  },

  reportShell: {
    typeTitle: 'Your Type: {type}',
    typeSubhead: 'You are a {type}',
    centersTitle: 'Your Centers and Your Conditioning',
    strategyTitle: 'Your Strategy: {strategy}',
    authorityTitle: 'Your Authority: {authority}',
    profileTitle: 'Your {profile} Profile',
    definitionTitle: 'Your Definition: {definition}',
    definitionTitleNone: 'Your Definition',
    definitionPrefix: '^Definition\\s+',
    practiceTitle: 'Living Your Design',
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
        '**Type** is the first and most important thing a chart tells you: how a person\u2019s energy is built to meet the world. There are five — [Generator](type:generator), [Manifesting Generator](type:manifesting-generator), [Projector](type:projector), [Manifestor](type:manifestor) and [Reflector](type:reflector) — decided by which centers are defined and how they connect to the [Throat](center:throat).',
        'Type matters for one very practical reason: each one has its own healthy way of **spending energy and making decisions**. Living by your own design instead of copying another type is what the system links to less friction and less exhaustion.',
        'It is not a personality label or a horoscope. It is a mechanical description of how energy works in a given person. Use it as a mirror: notice whether the way you move through life matches the way the chart says you are built.'
      ]
    },
    strategy: {
      title: 'Strategy',
      paragraphs: [
        '**Strategy** is how each type is meant to engage with life. It answers a very concrete question: how do you commit to something — a job, a relationship, a decision — without forcing it? Each type has its own answer.',
        'The five: a Generator *responds* to what life puts in front of them; a Manifesting Generator *responds, then informs*; a Manifestor *informs before acting*; a Projector *waits for the invitation*; a Reflector *waits a lunar cycle*. They all point the same way: **stop initiating from your head** and trust the signal your body and your life are already giving you.',
        '**Following your strategy is the central experiment of Human Design.** Watch the difference between the decisions you make with it and the ones you make against it, and let that experience — not the theory — be your guide.'
      ]
    },
    authority: {
      title: 'Authority',
      paragraphs: [
        '**Authority** is where a reliable decision comes from — which part of you gets the last word. In Human Design the mind is there to take in information and advise other people, but **it is not to be trusted for decisions about your own life**. Authority always comes from somewhere more bodily.',
        'There are seven: emotional (Solar Plexus), sacral, splenic (Spleen), ego (Heart), self-projected (G), mental/environmental and lunar. Which one you have follows a hierarchy based on your defined centers. Some work **in the moment** (sacral and splenic); others need **time** — emotional authority asks you to ride out the wave before clarity shows up.',
        'Authority is the most practical thing in the chart. It turns strategy into something you can actually use: before an important yes or no, it tells you which inner signal to listen for.'
      ]
    },
    profile: {
      title: 'The Profile',
      paragraphs: [
        'The **profile** is the "how" of your path: the way you learn, relate and grow into what you are here for. It is two numbers — 3/5, for instance — taken from lines 1 to 6 of the I Ching. The first comes from the Sun/Earth of *personality*, the second from the Sun/Earth of *design*.',
        'Each line brings its own flavor: 1- foundation and research, 2- natural talent, 3- trial and error, 4- bonds and network, 5- projection and practical leadership, 6- example and maturity. Put **two lines** together and you get a recognizable way of moving through life — more inward or more relational, more experimental or more solid.',
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
        'The **centers** are the nine energy hubs of the bodygraph, each tied to a particular function. The idea comes from the chakras, but here what matters is whether a center is **defined** or **undefined** (open). The nine centers and what they do:'
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
        'Each channel blends the themes of its two gates (and of their I Ching hexagrams). For a close reading of a particular channel, use the "learn more using AI" option.'
      ]
    },
    gate: {
      title: 'The Gates',
      paragraphs: [
        'The **gates** are the 64 possible activations of the bodygraph, one per I Ching hexagram. Each lives in a specific center and adds its own flavor of energy or character. At birth, the planets switch on a set of them.',
        'An active gate whose partner — the gate at the other end of its channel — is missing is left **hanging**. Its theme is there, but it looks to be completed, often through someone who carries the other half. When both gates are active the channel forms and defines its two centers.',
        'To go deeper into a particular gate — its flavor, its hexagram, how it plays out — use the "learn more using AI" option.'
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
    }
  },

  // ── Type (the chip "i") ──────────────────────────────────────────────────
  type: {
    generator: {
      title: 'Generator',
      paragraphs: [
        'The most common type, and the *pure* Generator: around **37% of people**. What defines it is a defined [Sacral Center](center:sacral) — the life-force engine of the system, generative and renewable. Well aligned, that building energy is steady and plentiful.',
        'A Generator works by responding. It **reacts to what life puts in front of it** rather than starting things from the head. Commit that energy to the right thing and *satisfaction* shows up; push it where it does not belong and *frustration* does instead.',
        'In practice the Sacral answers before the mind does. Faced with something concrete — a proposal, a question, a situation — there is a gut pull toward it or away from it. **Trusting that signal**, rather than reasoning your way to an answer, is what keeps the energy well spent.'
      ]
    },
    'manifesting-generator': {
      title: 'Manifesting Generator',
      paragraphs: [
        'A variant of the [Generator](type:generator) — about 33% of people, which puts all Generators together at close to 70%. An MG has a defined [Sacral](center:sacral) like any Generator, but its Sacral connects, directly or not, to the [Throat](center:throat). That adds the ability to make things happen fast.',
        'The strategy is to **respond and then inform**: wait for the sacral answer — the body\u2019s yes or no — and, once you have it, tell the people it will affect before you set off. MGs tend to be many-sided, quick and non-linear: skipping steps, running several things at once, and doubling back later to finish what was skipped.',
        'The trick is not to scatter. Starting things the body never said yes to is what drains an MG. When the yes is real, it moves fast and feels *satisfaction* and *peace*; when the mind pushes instead, what piles up is *frustration*, *anger* and half-finished work.'
      ]
    },
    projector: {
      title: 'Projector',
      paragraphs: [
        'Around **20% of people**. With no defined [Sacral](center:sacral), a Projector is **not built for constant work** and cannot hold a [Generator](type:generator)\u2019s pace — so beware of trying to keep going without rest. The gift lies elsewhere: seeing other people with real depth, and knowing how to guide their energy.',
        'The strategy is to **wait for the invitation** on the things that matter — work, love, where to live. Recognition is what lets the insight land; offering it unasked usually meets resistance. When *recognition* and *success* turn up, that is the sign of being on track. When things are off, the tell is *bitterness*.',
        'Managing the energy means **resting and pacing**: the competition is not stamina, it is depth and mastery. Sleep and let go before you are empty, and choose carefully who gets your attention — learning to say yes or no when it counts, because not every invitation deserves a yes.'
      ]
    },
    manifestor: {
      title: 'Manifestor',
      paragraphs: [
        'The most independent type, around **9% of people**. At least one motor center (Heart, Solar Plexus, Spleen) connects to the [Throat](center:throat), but the [Sacral](center:sacral) is undefined — so the energy is not constant. It arrives in bursts, good for starting things, and then it needs rest. Quite a lot of rest.',
        'The strategy is to **inform before acting**. Not asking permission — simply telling the people your impact will reach. It takes most of the resistance out of the room. Acting in line with it brings *peace*; skipping it brings opposition, and *anger* builds.',
        'A Manifestor is here to **start things and make an impact**, not to keep them running. Managing the energy means respecting the cycle of push and rest, and protecting your independence without cutting yourself off.'
      ]
    },
    reflector: {
      title: 'Reflector',
      paragraphs: [
        'The rarest type: barely **1% of people**. No center is defined — the whole bodygraph is open. That makes a Reflector an unusually sensitive mirror of the people and places around them, able to read the health of a community.',
        'Because they are constantly sampling other people\u2019s energy, **surroundings matter enormously**: who they are with and where they are changes the experience completely. The strategy is to **wait a lunar cycle** — about 28 days — before big decisions, letting the thing be seen from every angle first.',
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
        'The defined centers fall into **two separate groups**, with no channel joining them inside. What usually follows is a **pull toward connection**: something to bridge the two halves.',
        'That bridge tends to arrive through other people — whose energy completes the missing channel — or through transits that switch on the gate in between. The split is not a shortfall. It simply means certain company and certain places make a person feel whole, and that happens naturally.'
      ]
    },
    'triple-split': {
      title: 'Triple Split Definition',
      paragraphs: [
        'The defined centers fall into **three separate groups**. The wiring is more intricate, and it usually takes **more variety — of people, of input** — for the parts to feel joined up.',
        'Diverse surroundings and a certain amount of movement suit this definition well; too much stillness can leave the sense that something has not quite come together. Knowing the structure helps: that need for variety is not scatteredness.'
      ]
    },
    'quad-split': {
      title: 'Quadruple Split Definition',
      paragraphs: [
        'The rarest of them: the defined centers fall into **four separate groups**. It is a highly fragmented wiring which, oddly enough, tends to ask for **more structure, space and calm** in order to come together.',
        'Far from a problem, it describes a very particular way of processing life. What helps is **taking time** and not forcing everything into place at once: the many parts settle at their own pace.'
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
      defined: '**Defined**, it offers a **renewable** working energy, meant to be spent fully on the right things and emptied out healthily each day.',
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
    1: { theme: 'Creative Expression', text: '**Creating out of who you are** — an expression that copies no one. At its best it inspires; at its worst it turns inward into melancholy when it cannot find a way out into the world.' },
    2: { theme: 'Receptive Direction', text: '**Knowing where to go without forcing it** — letting the course surface instead of imposing one. Its gift is a natural sense of direction that gives movement meaning; its shadow, feeling lost whenever it tries to steer by willpower alone.' },
    3: { theme: 'Order in the New', text: '**Making order out of a beginning**, back when there is still no shape to hold on to. Its gift is knowing how to get something started and give it structure; its shadow, the frustration and the stalling that come from wanting to move faster than the thing allows.' },
    4: { theme: 'Mental Answers', text: '**The mind reaching for an answer** to a question left open. Its gift is working out solutions that hold together logically; its shadow, the pressure to have the answer already, and mistaking a hypothesis for a certainty.' },
    5: { theme: 'Fixed Rhythms', text: '**Rhythm and habit** — the energy that keeps a routine and a pace of its own. Its gift is the reliability of a rhythm that anchors the day; its shadow, the anxiety when that rhythm breaks.' },
    6: { theme: 'Intimacy and Friction', text: '**The border of closeness**: when to open and when to shut. Its gift is an emotional life that creates real intimacy; its shadow, conflict and reactivity when that border is drawn by whatever mood is passing through.' },
    7: { theme: 'Leadership and Direction', text: '**Guiding toward what comes next**, often from the back rather than the front. Its gift is a natural authority people choose to follow; its shadow, the urge to control the course, or to take it by force.' },
    8: { theme: 'Contribution', text: '**Bringing something of your own** that makes a difference, and giving a voice to what matters. Its gift is an authenticity others want to join; its shadow, contributing for the recognition and coming away empty.' },
    9: { theme: 'Focus on Detail', text: '**Narrowing in** on the details that get something finished. Its gift is an attention that sees things through; its shadow, disappearing into the small stuff, or scattering.' },
    10: { theme: 'Self-love', text: '**Being true to yourself** — behaving as who you actually are. Its gift is an authenticity that does not sell itself out; its shadow, self-criticism, or bending out of shape to fit in.' },
    11: { theme: 'Ideas', text: '**A mind full of ideas**, there to be shared and to make sense of experience. Its gift is a conceptual richness that sparks things in other people; its shadow, the pressure to act on every idea, when ideas are for sharing more than for doing.' },
    12: { theme: 'Cautious Expression', text: '**Speaking when the mood and the moment are right.** Its gift is a word that lands and moves people at exactly the right instant; its shadow, speaking out of tune, or holding back out of caution.' },
    13: { theme: 'Listening', text: '**Listening and remembering** — taking in other people\u2019s stories and secrets and making sense of them. Its gift is an ear that invites trust; its shadow, carrying what others put down.' },
    14: { theme: 'Power for Resources', text: '**Fuel for work and resources** — the drive that gives someone\u2019s own effort real power. Its gift is a generative force that multiplies; its shadow, working hard with no reason behind it and no values steering it.' },
    15: { theme: 'Love of Diversity', text: '**A love of people in all their extremes** — an attraction to different rhythms and different ways of living. Its gift is making room for what is unlike itself; its shadow, an erratic rhythm, or judging everyone else\u2019s.' },
    16: { theme: 'Enthusiasm and Skill', text: '**Enthusiasm and skill** — talent that shows itself and sharpens with practice. Its gift is an enthusiasm that catches, and mastery at the end of it; its shadow, enthusiasm with nothing underneath.' },
    17: { theme: 'Opinions', text: '**The mind forming opinions**, running ahead in order to organize. Its gift is opinions that give things a shape; its shadow, presenting a point of view as a fact.' },
    18: { theme: 'Correction', text: '**The instinct to fix what has gone crooked.** Its gift is a sharp eye that improves and protects; its shadow, criticism that never stops, and perfectionism.' },
    19: { theme: 'Sensitivity to Needs', text: '**Picking up what people need**, materially and emotionally. Its gift is a fine ear for what is missing; its shadow, neediness of its own, or a sensitivity turned raw.' },
    20: { theme: 'The Now', text: '**The present moment** — awareness and expression in the same breath. Its gift is action that is spontaneous and exactly right; its shadow, busyness, or talking without being there.' },
    21: { theme: 'Control', text: '**The will to run your own territory** and your own resources. Its gift is a legitimate authority over what is yours; its shadow, wanting to control everything, or feeling controlled.' },
    22: { theme: 'Grace', text: '**Charm and emotional openness** — knowing how to listen and how to let someone in. Its gift is an emotional presence that draws people; its shadow, closing up when the mood is not there.' },
    23: { theme: 'Assimilation', text: '**Turning what you know into something simple.** Its gift is making the complicated clear — the moment it clicks for someone else; its shadow, saying it at the wrong time and not being understood.' },
    24: { theme: 'Rationalization', text: '**The mind circling back** to the same thought until it yields. Its gift is the insight that only comes from going over it again; its shadow, the loop with no way out.' },
    25: { theme: 'Universal Love', text: '**Innocence, and love that wants nothing back.** Its gift is a clean, unconditional devotion; its shadow, losing that innocence to hurt or to ego.' },
    26: { theme: 'Persuasive Transmission', text: '**Making the case** — the will to communicate something and give it worth. Its gift is a power of persuasion that moves people; its shadow, manipulation and half-truths.' },
    27: { theme: 'Care', text: '**Taking care of others** and holding them up. Its gift is a care that genuinely nourishes; its shadow, smothering, or giving until there is nothing left.' },
    28: { theme: 'The Search for Meaning', text: '**Betting on something worth it** — the search for a life with meaning in it. Its gift is finding a purpose worth the fight; its shadow, fighting for its own sake, and the fear of a life that means nothing.' },
    29: { theme: 'Commitment', text: '**Saying yes and seeing it through.** Its gift is a persistence that finishes what it starts; its shadow, saying yes too often, or where it never should have.' },
    30: { theme: 'Desire', text: '**Desire and longing** — the fire of wanting that drives a life of experience. Its gift is a passion that fuels everything; its shadow, being eaten by cravings that never settle.' },
    31: { theme: 'Leadership Through the Voice', text: '**Speaking for a group** and standing for it. Its gift is leadership other people elect to follow; its shadow, leading without a real mandate, or out of plain ambition.' },
    32: { theme: 'Continuity', text: '**An instinct for what will last** — and for what has to change in order to. Its gift is a nose for lasting value; its shadow, a fear of failure and of change that freezes everything.' },
    33: { theme: 'Retreat and the Telling', text: '**Stepping away, then telling it back.** Its gift is a wisdom shared after time to reflect on it; its shadow, not honoring the need to withdraw — or telling too much, or too little.' },
    34: { theme: 'Power', text: '**Raw power** — an independent force that is always busy. Its gift is enormous productive capacity; its shadow, busyness for its own sake, and moving before anything was answered.' },
    35: { theme: 'Hunger for Experience', text: '**Wanting to have done everything** and to keep moving. Its gift is an appetite for life that pushes forward; its shadow, the restlessness of never arriving.' },
    36: { theme: 'Crisis and the New', text: '**Emotional upheaval, and what it opens.** Its gift is growth through intensity; its shadow, diving into drama or crisis unprepared.' },
    37: { theme: 'Friendship and Agreements', text: '**Warmth that builds a family** — the bonds and agreements that hold a group together. Its gift is an affection that creates belonging; its shadow, dependency, or agreements quietly broken.' },
    38: { theme: 'Struggle with Meaning', text: '**Standing up for something that matters.** Its gift is persistence with a purpose behind it; its shadow, fighting for the sake of it, or sheer stubbornness.' },
    39: { theme: 'Provocation', text: '**Poking at the mood** to get at what is really going on. Its gift is provocation that brings spirit to the surface; its shadow, needling for nothing, or plain moodiness.' },
    40: { theme: 'Giving and Rest', text: '**Providing, then withdrawing to recover.** Its gift is a generosity that also knows how to stop; its shadow, working without pause — or refusing to give at all.' },
    41: { theme: 'The Imagination That Starts Desire', text: '**The daydream that starts everything** — every new experience is imagined before it is lived. Its gift is a fantasy that opens doors; its shadow, imagination cut loose from reality, or the ache of a want with nowhere to go.' },
    42: { theme: 'Completion', text: '**Finishing what was begun** and closing the cycle. Its gift is the capacity to see things through to the end; its shadow, starting without finishing, or a fear of endings.' },
    43: { theme: 'Mental Intuition', text: '**Knowing something before anyone else does**, and all at once. Its gift is an original insight that changes the picture; its shadow, insisting on saying it at the wrong moment and being met with blank faces.' },
    44: { theme: 'The Instinct for the Past', text: '**Reading what has happened before** — patterns, people, timing. Its gift is a nose for who and when; its shadow, the fear that the past is about to repeat.' },
    45: { theme: 'The Voice of Resources', text: '**The voice that gathers and shares out** what belongs to everyone. Its gift is stewardship that takes care of the group; its shadow, hoarding, or a sense of entitlement.' },
    46: { theme: 'Love of the Body', text: '**Being at home in a body**, and in the right place. Its gift is the knack of being where you need to be when you need to be there; its shadow, neglecting the body, or driving it too hard.' },
    47: { theme: 'Mental Realization', text: '**The push to make sense of confusion** until it finally clicks. Its gift is turning a mess into understanding; its shadow, getting stuck in the feeling that none of it means anything.' },
    48: { theme: 'Depth', text: '**A well to draw from** — depth of talent and of knowing. Its gift is having what the situation was missing; its shadow, the fear of not being enough, or not being ready.' },
    49: { theme: 'Principles', text: '**Principles, and revolution when they are crossed** — the yes or no that decides who belongs. Its gift is transforming relationships from a clear place; its shadow, rejection turned rigid, or upheaval without care.' },
    50: { theme: 'Values', text: '**Guarding what keeps a group well** — the values and the rules underneath it. Its gift is a keeper of values other people rest on; its shadow, over-responsibility, and the fear of letting everyone down.' },
    51: { theme: 'Impulse and Shock', text: '**Going first** — the jolt that wakes everyone up. Its gift is a courage that shakes others into motion; its shadow, competitiveness, or plain recklessness.' },
    52: { theme: 'Stillness and Focus', text: '**Stopping in order to see the whole.** Its gift is a calm that makes concentration possible; its shadow, inertia — or the restlessness of not being able to sit still.' },
    53: { theme: 'Beginnings', text: '**Starting new cycles** — the pressure and the fuel to begin. Its gift is the push that gets new things moving; its shadow, beginning endlessly and completing nothing.' },
    54: { theme: 'Ambition', text: '**The drive to rise**, materially and spiritually. Its gift is an ambition that lifts everything with it; its shadow, chasing the climb for someone else\u2019s approval, or overreaching.' },
    55: { theme: 'Abundance of Spirit', text: '**Emotional richness, and faith.** Its gift is a depth of feeling and a faith that carries; its shadow, letting melancholy or the swing of a mood make the decisions.' },
    56: { theme: 'The Stimulating Story', text: '**The story that holds a room** — ideas and experience told so they land. Its gift is a telling that opens horizons; its shadow, embellishing, or losing the thread.' },
    57: { theme: 'Intuition in the Now', text: '**Instinct that cuts straight through the present.** Its gift is a quiet, unerring knowing in the instant; its shadow, a fear of the future that stops everything.' },
    58: { theme: 'Vitality and Improvement', text: '**The joy of being alive**, and the push to make things better. Its gift is a vitality that fuels improvement; its shadow, restlessness, or criticism with the joy taken out of it.' },
    59: { theme: 'Intimacy', text: '**Getting through someone\u2019s defenses** to make a real bond, sexual included. Its gift is the power to create closeness; its shadow, building walls — or walking straight through someone else\u2019s.' },
    60: { theme: 'Accepting the Limit', text: '**Taking the limit as a starting point.** Its gift is turning constraint into possibility; its shadow, getting stuck in the limit and sinking with it.' },
    61: { theme: 'Inner Truth', text: '**The pressure to know the unknowable.** Its gift is an inspiration that goes looking for the bottom of things; its shadow, the mental strain of needing to know it all.' },
    62: { theme: 'Detail and Order', text: '**Naming things and putting them in order**, so they can be said precisely. Its gift is a clear, well-ordered way of explaining; its shadow, drowning in detail, or over-explaining.' },
    63: { theme: 'Doubt', text: '**The pressure to question and check.** Its gift is a healthy doubt that tests things properly; its shadow, suspicion that corrodes, and anxiety.' },
    64: { theme: 'Fertile Confusion', text: '**A press of half-processed images** looking for a way to arrange themselves. Its gift is a richness of imagery that finally resolves into understanding; its shadow, the overwhelm of trying to force it before it is ready.' }
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
      centers: 'Here are the nine centers in your chart:'
    },

    type: {
      generator: [
        'You are the majority type, a *pure* Generator — around **37% of the population**. Your defining feature is the defined [Sacral center](center:sacral): the life-force engine of the system, generative and renewable in character. Your generating, building energy, when you are well aligned, is sustained and abundant.',
        'You operate by responding: **you react to what life puts in front of you** instead of initiating from the mind and from reasoning. When you commit your energy to the right thing, *satisfaction* appears; if you don’t listen to yourself well and force your energy where it doesn’t belong, *frustration* appears.',
        'In practice, your Sacral center responds before your mind does: faced with something concrete — a proposal, a question, a situation — a gut reaction of attraction or rejection arises. **Following that bodily signal**, rather than deciding from thought and reason, is what keeps your energy well spent.'
      ],
      'manifesting-generator': [
        'You are a specific kind of [Generator](type:generator) — Manifesting Generators are 33% of the population, and together with the other Generators you add up to close to 70%: you have a defined [Sacral](center:sacral), and what sets you apart from other Generators is that your Sacral is connected, directly or indirectly, to the [Throat](center:throat). That gives you the generating energy typical of Generators plus the ability to manifest and make things happen quickly.',
        'Your strategy is to **respond and then inform**: first you wait for the sacral response — your body’s yes or no — and, once you have it, you let those who will be affected know before setting off. You tend to be multi-talented, fast and non-linear: you skip steps, do several things at once, and sometimes double back to finish what you skipped.',
        'The key to managing your energy is not to scatter yourself by initiating without having listened to your body’s response: when you commit to what genuinely lights you up (when your body says yes), you move fast and feel *satisfaction* and *peace*; but when you force things driven by the mind and by ideas, you accumulate *frustration*, *anger* and half-finished work.'
      ],
      projector: [
        'Projectors are close to **20% of the population**. You don’t have a defined [Sacral](center:sacral), so **you are not designed for constant work** nor to sustain the same energy as a [Generator](type:generator); so be careful about trying to perform continuously and without rest. Your gift is a different one: seeing others with enormous depth and knowing how to guide and direct other people’s energy.',
        'Your strategy is to **wait for the invitation** for the important things — work, love, where to live. You need to be invited for your wisdom and your effort to be well received; when you offer yourself or step in unasked, you will usually meet resistance and rejection. When *recognition* and *success* show up in your life, they are the clue that you are on the right track. The symptom that appears when you are not living in alignment is *bitterness*.',
        'In managing your energy, your task is to **rest and pace yourself**: you don’t compete on physical stamina, but on depth and mastery. Your wellbeing rests on sleeping and letting go before you are exhausted, and on choosing carefully who you give your attention and effort to: learning to say yes or no when it matters (because not every invitation means you have to say yes).'
      ],
      manifestor: [
        'You are the most independent type, around **9% of the population**. You have at least one motor center (Heart, Solar Plexus, Spleen) connected to the [Throat](center:throat), but an undefined [Sacral](center:sacral), so your energy is not constant: it comes in bursts, which you use to initiate and set things in motion, and then you need rest — quite a lot of rest.',
        'Your strategy is to **inform before acting**. This is not about asking permission, but about letting those your impact will reach know: by doing so, you reduce the resistance and rejection you otherwise meet around you. Acting in line with your strategy brings you *peace*; if you don’t, you feel opposition and *anger* grows in you.',
        'You are here to **initiate and make an impact**, not to execute in a sustained way. Managing your energy means respecting your cycles of push and rest, and protecting your autonomy without isolating yourself from those around you.'
      ],
      reflector: [
        'You are the rarest type: Reflectors are barely **1% of the population**. You have no defined center at all: your whole bodygraph is open. That makes you an extraordinarily sensitive mirror of the people and places around you, able to sense the health of a community.',
        'Because you constantly sample other people’s energy, **the environment and the company affect you enormously**: who you are with and where you are changes your experience profoundly. Your strategy is to **wait a lunar cycle** — about 28 days — before important decisions, letting the matter be seen from many angles before settling it.',
        'Your greatest care in managing energy is choosing environments well and not identifying with what you are merely reflecting. When you live in alignment with your design, in the right place and with the right people, *surprise* and *delight* appear in you. If you don’t live in alignment, the symptom that shows up in you is *disappointment*.'
      ]
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
        'Before an important decision, your design asks you to **let a full lunar cycle pass** — around 28 days — instead of settling it in one go.',
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
        'As a Reflector you have no defined center, so there is no fixed inner source to consult. Your guide is **time**: a full lunar cycle, around 28 days, before anything important.',
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
        'Your defined centers fall into **two separate groups**, with no channel joining them inside. What usually follows is a **pull toward connection**: something to bridge your two halves.',
        'That bridge tends to arrive through other people — whose energy completes the channel you are missing — or through transits that switch on the gate in between. It is not a shortfall. Certain company and certain places simply make you feel whole, and that happens naturally.'
      ],
      'triple-split': [
        'Your defined centers fall into **three separate groups**. Your wiring is more intricate, and it usually takes **more variety — of people, of input** — for your parts to feel joined up.',
        'Diverse surroundings and a certain amount of movement suit you; too much stillness can leave you feeling something has not quite come together. Knowing this helps: that need for variety is not scatteredness.'
      ],
      'quad-split': [
        'The rarest of them: your defined centers fall into **four separate groups**. It is a highly fragmented wiring which, oddly enough, tends to ask for **more structure, space and calm** in order to come together.',
        'Far from a problem, it describes a very particular way of processing life. What helps you is **taking time** and not forcing everything into place at once: your many parts settle at their own pace.'
      ]
    },
    center: {
      head: {
        defined: 'One of your **defined** centers: you have a steady way of finding inspiration and of feeling the pressure to understand.',
        open: 'One of your **open** centers: you amplify other people\u2019s questions and mental restlessness. Try not to get dragged into solving doubts that were never yours and do not matter for your life.'
      },
      ajna: {
        defined: 'One of your **defined** centers: you have a fixed, dependable way of thinking, with stable opinions and certainties.',
        open: 'One of your **open** centers: your mind is flexible and can hold many perspectives at once. Your trap is the pressure to look certain, or clinging to a borrowed certainty; your gift is not needing a fixed answer at all.'
      },
      throat: {
        defined: 'One of your **defined** centers: you have a consistent voice and a consistent way of expressing yourself.',
        open: 'One of your **open** centers: your way of speaking shifts with the company, and you can feel the pressure to talk just to be noticed. Your lesson is waiting for the right moment instead of forcing words out.'
      },
      g: {
        defined: 'One of your **defined** centers: you have a steady sense of identity and direction.',
        open: 'One of your **open** centers: your identity is more fluid and shifting, and it finds its direction through the right places and the right people. **Place** is your key — being somewhere that fits orients everything else.'
      },
      heart: {
        defined: 'One of your **defined** centers: you have a consistent will and the capacity to hold to what you promise.',
        open: 'One of your **open** centers, as it is for most people: you have nothing to prove and no willpower to measure. Your trap is over-promising in order to prove it anyway. Here you learn that your worth does not depend on your achievements.'
      },
      sacral: {
        defined: 'One of your **defined** centers: you have a renewable working energy, meant to be spent fully on the right things and emptied out healthily each day.',
        open: 'One of your **open** centers: that constant energy simply is not there, so it matters that you know when enough is enough and do not let other people\u2019s pace carry you to exhaustion.'
      },
      spleen: {
        defined: 'One of your **defined** centers: you have a constant intuition and a steady sense of health.',
        open: 'One of your **open** centers: you amplify other people\u2019s fears and tend to hold on to what is not good for you — relationships, habits, situations — out of fear of letting go. Your lesson is not deciding from fear, and learning what actually agrees with your body.'
      },
      solarPlexus: {
        defined: 'One of your **defined** centers: you run your own emotional waves and need time before clarity arrives.',
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
        '**Managing your energy** — You have a defined [Sacral Center](center:sacral): a **renewable** working energy, built to be spent fully each day on the right things and emptied out healthily by bedtime. The point is not to conserve it — it is to **spend it on what your body actually responds to**. Then the tiredness feels good and the charge comes back tomorrow. Push through things that do not light you up and it drains you without ever satisfying you.',
      trampa:
        '**The trap for your type** — What wears you down is **starting from your head** instead of waiting for something to respond to: saying yes out of obligation, out of logic, or out of fear of missing out. Get into something your energy never backed and frustration turns up — the classic Generator signal — along with the sense of being stuck in things that never quite land.',
      senales:
        '**Signs you are on track** — Your compass is **satisfaction versus frustration**. End the day pleasantly tired, with the sense that your energy went somewhere real, and you are on track. If frustration and weariness are what you mostly feel, you have probably said yes to things your body did not.'
    },
    'manifesting-generator': {
      energia:
        '**Managing your energy** — Like any Generator you have a defined [Sacral](center:sacral): a **renewable** working energy. But yours connects to the [Throat](center:throat), which makes you **fast, many-sided and non-linear**. You skip steps, run several things at once, and move quickly when something genuinely grabs you. You are at your best when you wait for your **body\u2019s answer** first, then **tell** the people around you before you set off.',
      trampa:
        '**The trap for your type** — **Scattering.** Taking on too much your body never said yes to, or skipping the heads-up and running straight into other people\u2019s resistance. Start from the head instead of responding and you collect frustration, a bit of anger, and a trail of half-finished projects.',
      senales:
        '**Signs you are on track** — **Satisfaction**, and a certain calm around you, versus frustration and friction. Moving fast on what lights you up and actually finishing things means you are on track. Feeling scattered and meeting resistance everywhere usually means you said yes without your body, or you forgot to tell people.'
    },
    projector: {
      energia:
        '**Managing your energy** — With no defined [Sacral](center:sacral) you are **not built for constant work**, and you cannot hold a Generator\u2019s pace: your energy is uneven and runs out sooner. You are not built to start from scratch either — unlike a Manifestor, you have no motor wired to the [Throat](center:throat). Your gift is neither stamina nor initiation. It is to **see, guide and direct**, where you are invited to. So: **rest and pace yourself** — sleep and let go before you are empty — and save your attention for people who value it. **Know when to say yes and when to say no.**',
      trampa:
        '**The trap for your type** — **Keeping up with everyone else**, and **offering your insight where nobody asked for it**. Working yourself flat to prove your worth, or pushing in without an invitation, brings resistance, rejection and bitterness — the signal of a Projector living against their design.',
      senales:
        '**Signs you are on track** — **Recognition and success**, versus bitterness. Being seen, being invited, having your view actually land: that is the track. Feeling invisible, drained and resentful usually means you are offering yourself where you were not called, or demanding an energy you do not have.'
    },
    manifestor: {
      energia:
        '**Managing your energy** — You have a motor wired to the [Throat](center:throat) but an undefined [Sacral](center:sacral): your energy is **not constant, it comes in bursts** for starting things, and then it needs rest. You are made to **get things moving and make an impact**, not to keep them running. So respect the cycle of push and rest — sometimes a lot of rest — and protect your independence without cutting yourself off.',
      trampa:
        '**The trap for your type** — Moving without **telling** the people your impact will reach. That is what fills the room with resistance and anger, and it ends up making everything harder for you. The other trap is **demanding a consistency that is not yours**, right up to burnout, instead of accepting how much rest you actually need.',
      senales:
        '**Signs you are on track** — **Peace**, versus anger. Inform people and move freely and things go quiet around you. When everything turns into friction and conflict, you probably moved without warning, or you are forcing a steady pace that was never yours.'
    },
    reflector: {
      energia:
        '**Managing your energy** — With **no defined center**, you are constantly sampling the energy of people and places. **Your surroundings affect you enormously** and your energy swings a lot from day to day. The single most important thing for you is **choosing where you are and who you are with** — and not demanding a consistency your design does not have. For the big decisions, give yourself a **lunar cycle**, about 28 days.',
      trampa:
        '**The trap for your type** — Deciding in a hurry, staying in places that do not suit you, and **taking what you are reflecting for your own**: moods and pressures that actually belong to the group. **Forcing yourself to be the same every day** goes against how you work.',
      senales:
        '**Signs you are on track** — **Surprise and delight**, versus disappointment. Get the place and the people right and life keeps surprising you pleasantly. When disappointment is the main note, you are usually somewhere wrong, with the wrong people, or you decided too fast.'
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
    '1-8': { name: 'Channel of Inspiration', essence: 'a creative identity that needs a voice, and inspires others by example rather than by argument.' },
    '2-14': { name: 'Channel of the Beat', essence: 'an inner compass for where to point one\u2019s life force and one\u2019s resources.' },
    '3-60': { name: 'Channel of Mutation', essence: 'the pulse of change, turning a limit into the start of something new.' },
    '4-63': { name: 'Channel of Logic', essence: 'a mind that begins in doubt and works its way toward answers that hold up.' },
    '5-15': { name: 'Channel of Rhythm', essence: 'a natural rhythm of one\u2019s own that, kept open to difference, falls in step with life.' },
    '6-59': { name: 'Channel of Intimacy', essence: 'the power to break through barriers and form a bond, and the sense of when to open and when to close.' },
    '7-31': { name: 'Channel of Leadership', essence: 'the one who gives a group its direction, and finds the voice to lead it there.' },
    '9-52': { name: 'Channel of Concentration', essence: 'the stillness that lets attention narrow onto detail until the work is finished.' },
    '10-20': { name: 'Channel of Awakening', essence: 'self-love expressed in the present — being who you are, right now.' },
    '10-34': { name: 'Channel of Exploration', essence: 'the strength to act on your own convictions and stay true to yourself.' },
    '10-57': { name: 'Channel of Survival', essence: 'instinct in the service of wellbeing, and of the right way to live in a body.' },
    '11-56': { name: 'Channel of Curiosity', essence: 'a mind full of ideas looking for stories to carry them.' },
    '12-22': { name: 'Channel of Openness', essence: 'an emotional expression that opens up and moves people, when the mood and the moment are right.' },
    '13-33': { name: 'Channel of the Prodigal', essence: 'gathering what has been lived and, after time away, telling it back as a witness.' },
    '16-48': { name: 'Channel of Talent', essence: 'deep talent that turns into mastery through enthusiasm and repetition.' },
    '17-62': { name: 'Channel of Acceptance', essence: 'opinions ordered into facts and detail, so things can be organized and anticipated.' },
    '18-58': { name: 'Channel of Judgment', essence: 'the vitality that pushes to fix and improve whatever has gone crooked.' },
    '19-49': { name: 'Channel of Synthesis', essence: 'a sensitivity to what people need, and bonds decided by deep principles.' },
    '20-34': { name: 'Channel of Charisma', essence: 'power turned straight into action — thinking and doing without a gap between them.' },
    '20-57': { name: 'Channel of the Brain Wave', essence: 'a sharp intuition that catches the knowing of the instant and says it out loud.' },
    '21-45': { name: 'Channel of Money', essence: 'the will to control resources, and the voice that shares them out for the group.' },
    '23-43': { name: 'Channel of Structuring', essence: 'individual knowing turned into ideas other people can actually follow.' },
    '24-61': { name: 'Channel of Awareness', essence: 'the pressure to know the unknowable, turning it over until it gives up its meaning.' },
    '25-51': { name: 'Channel of Initiation', essence: 'the shock that starts things, driven by a love that asks for nothing back.' },
    '26-44': { name: 'Channel of Surrender', essence: 'an instinct that reads the past, and the power of persuasion to pass it on.' },
    '27-50': { name: 'Channel of Preservation', essence: 'care that holds others up, guided by the values that keep a group safe.' },
    '28-38': { name: 'Channel of Struggle', essence: 'the stubbornness to fight and take risks for a life worth having.' },
    '29-46': { name: 'Channel of Discovery', essence: 'wholehearted commitment that, put into the body, thrives where others give up.' },
    '30-41': { name: 'Channel of Recognition', essence: 'the imagination and longing that light the appetite for new experience.' },
    '32-54': { name: 'Channel of Transformation', essence: 'ambition to rise, steered by an instinct for what will last.' },
    '34-57': { name: 'Channel of Power', essence: 'raw strength at the service of instinct — power as sheer presence.' },
    '35-36': { name: 'Channel of Transience', essence: 'a hunger for experience that, through emotional highs and lows, keeps moving on to the next thing.' },
    '37-40': { name: 'Channel of Community', essence: 'the warmth that builds community through agreements — giving freely, and knowing when to step away and recover.' },
    '39-55': { name: 'Channel of Emotion', essence: 'provocation that stirs the mood, to bring spirit up to the surface.' },
    '42-53': { name: 'Channel of Maturation', essence: 'the energy of cycles: starting things and carrying them through, and ripening in the process.' },
    '47-64': { name: 'Channel of Abstraction', essence: 'a press of half-formed images working themselves into sense.' }
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
  }
};

export default deepMerge(es, overrides);
