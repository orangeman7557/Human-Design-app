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
        'The Generator’s strategy. Instead of setting out to initiate from the head, the design asks you to **wait until there is something to respond to**: a proposal, a question, an opportunity that appears. Life presents the material; the body responds.',
        'The response arises in the [Sacral center](center:sacral) as a **gut reaction**, prior to reasoning: an impulse to move toward or to pull away. A yes or a no. Trusting that bodily yes or no, instead of talking yourself into it, is what leads to satisfaction; forcing action where there is no response leads to frustration.'
      ]
    },
    'respond-then-inform': {
      title: 'Respond, Then Inform',
      paragraphs: [
        'The Manifesting Generator’s strategy, combining the two strategies of responding and informing. First of all, like any Generator, it responds — that is, it **waits for the sacral response**, the body’s yes or no to something concrete; it does not initiate from the mind.',
        'Once it has that response and is about to act, it **informs those who will be affected** before setting off. Because of its ability to manifest quickly, letting people know reduces friction with the environment and stops its speed from generating resistance. Skipping either of the two steps — responding and informing — is the usual source of its exhaustion.'
      ]
    },
    'inform-before-acting': {
      title: 'Inform Before Acting',
      paragraphs: [
        'The Manifestor’s strategy. Because its energy initiates and makes an impact without warning, the design asks it to **let the people it is going to affect know before setting off**. This is not about asking permission or justifying itself: it is simply communicating what it is about to do.',
        'The effect is very practical: informing dissolves much of the resistance it meets when it acts by surprise. In fact, informing can even bring it allies who smooth the way. Doing it brings peace to those around it; skipping it provokes the anger and opposition that, without it noticing, end up obstructing its own movement.'
      ]
    },
    'wait-for-invitation': {
      title: 'Wait for the Invitation',
      paragraphs: [
        'The Projector’s strategy. For the important things — a job, a relationship, a big commitment — the design asks it to **wait to be recognized and invited** instead of offering itself unasked.',
        'This is not passivity: the Projector keeps living and preparing, but saves its wisdom for those who value it and ask for it. **The right invitation opens the door** for its gift to be well received; insisting without one usually brings resistance, bitterness and rejection. Recognition and success are the sign that the wait was worth it.'
      ]
    },
    'wait-lunar-cycle': {
      title: 'Wait a Lunar Cycle',
      paragraphs: [
        'The Reflector’s strategy. Before an important decision, the design asks it to **let a full lunar cycle pass** — about 28 days — instead of settling things all at once.',
        'During that time, the Reflector **talks it over, samples different environments and observes how its perception of the matter changes** day by day. Because its chart is completely open, it needs that journey to tell what is its own from what it is merely reflecting. Clarity comes by accumulation, by seeing the matter from different perspectives, not by impulse.'
      ]
    }
  },

  // ── Authority (the value "i") ────────────────────────────────────────────
  authority: {
    emotional: {
      title: 'Emotional Authority',
      paragraphs: [
        'The most widespread authority. Whoever has it has a **defined [Solar Plexus](center:solarPlexus)**, which works in waves: mood rises and falls over time, not because of the facts of the moment. The golden rule is clear: **there is no truth in the now**.',
        'To decide well, the design asks you to **wait until you have ridden out the emotional wave** — sleep on it, let time pass, come back to the matter in different moods — before committing. Clarity is not an instant flash, but what remains once the emotion has settled. Haste is its main enemy.'
      ]
    },
    sacral: {
      title: 'Sacral Authority',
      paragraphs: [
        'The authority of most Generators. It lives in the **[Sacral center](center:sacral)**, which responds **in the moment** with a sound or a gut impulse — a kind of "uh-huh" of attraction or an "mm-mm" of rejection — to something concrete: the body *says* yes or no.',
        'It is an **immediate, bodily** authority: it doesn’t reason, it reacts. It works best with yes/no questions and clouds over when the mind tries to argue the decision. Learning to catch and trust that instant response from the belly is the central practice for whoever has it.'
      ]
    },
    splenic: {
      title: 'Splenic Authority',
      paragraphs: [
        'It lives in the **[Spleen](center:spleen)**, the oldest center of awareness, tied to survival, health and instinct. It speaks **in the present and only once**: a sudden, quiet, spontaneous knowing, with no repetition and no argument.',
        'It is the most **subtle and fleeting** authority: it doesn’t insist or argue, so it is easy to overlook or to rationalize away afterwards. Whoever has it learns to **trust that first instinctive impulse** — that calm bodily "yes" or "no" — the instant it appears, because it usually doesn’t speak twice.'
      ]
    },
    ego: {
      title: 'Ego Authority',
      paragraphs: [
        'It lives in the **[Heart center (Ego)](center:heart)**, the engine of willpower and desire. Here the right decision is recognized through an honest question: **do I really want this? what’s in it for me?** This is not selfishness, but honoring what you actually want.',
        'It is an authority of **will and impulse**, not of prolonged reflection. It works when the person listens to what they truly desire and is able to commit to it; it gets lost when they accept things out of duty or pressure that their heart doesn’t back.'
      ]
    },
    'self-projected': {
      title: 'Self-Projected Authority',
      paragraphs: [
        'Particular to certain Projectors. Truth arrives through the **voice**: by talking the matter through out loud, the person **hears themselves** and recognizes what is consistent with their identity and their direction.',
        'What matters is not the listener’s opinion, but the act of **expressing and hearing yourself**. So it helps to be surrounded by trusted people who let you talk without steering you, and to pay attention to the tone and the words that come out: the guidance is there, more than in the reasoning.'
      ]
    },
    mental: {
      title: 'Mental/Environmental Authority',
      paragraphs: [
        'Also called environmental authority or "sounding board", particular to some Projectors with no inner centers defined for deciding. There is no fixed inner bodily authority: clarity doesn’t arrive from within all at once, **clarity comes from dialogue**.',
        'The practice consists of **talking the matter through with trusted people and in the right environment**, not so they decide for you, but so you can hear yourself think out loud. The right place and company are part of the method here: the decision settles gradually, with time and conversation.'
      ]
    },
    lunar: {
      title: 'Lunar Authority',
      paragraphs: [
        'The Reflector’s authority, the only type with no defined center at all. With no fixed inner source, the guide is **time**: a full lunar cycle, about 28 days, before important decisions.',
        'Over that cycle, the person **samples different states, environments and conversations**, and observes how their perception of the matter evolves. Clarity comes through **maturation** and an accumulation of perspectives, not through impulse: what still resonates after the whole cycle is what can be trusted.'
      ]
    }
  },

  // ── Profile (the six lines) ──────────────────────────────────────────────
  profile: {
    '1': {
      title: 'Line 1 — The Foundation',
      paragraphs: [
        'The first line seeks **security through knowledge**. It needs to investigate, to understand the fundamentals and to know the ground beneath it is solid before acting; without that base, it feels uneasy.',
        'It is an **introspective, studious** energy: it goes deep until it feels expert, and that solidity reassures others. Its challenge is not to wait indefinitely to know "everything" before taking the step.'
      ]
    },
    '2': {
      title: 'Line 2 — Natural Talent',
      paragraphs: [
        'The second line has **natural gifts** it exercises almost effortlessly, often without being fully aware of them. It needs **time alone** for that talent to ripen at its own pace.',
        'Its dynamic is to be **called from outside**: others see in it something the person themselves can’t quite name, and invite them to bring it out. The balance lies between respecting its need for retreat and answering those calls when they are the right ones.'
      ]
    },
    '3': {
      title: 'Line 3 — Trial and Error',
      paragraphs: [
        'The third line learns **by trying**: through direct contact with life, through attempts, discoveries and stumbles too. Every "mistake" is information, not failure.',
        'It is an **experimental, resilient** energy: it discovers what works by ruling out what doesn’t. Its wisdom is very practical, and it is essential that it doesn’t read its stumbles as personal flaws, but as the very method it is designed to learn by.'
      ]
    },
    '4': {
      title: 'Line 4 — The Network',
      paragraphs: [
        'The fourth line works through **bonds and community**. Opportunities — work, love, changes — usually reach it through people it already knows, not through strangers or cold outreach.',
        'It is a **warm, relational** energy that needs solidity in its attachments. Its classic practical advice is not to let go of one base — a job, a situation — until the next is secured through its network: transitions work better for it that way.'
      ]
    },
    '5': {
      title: 'Line 5 — Projection',
      paragraphs: [
        'The fifth line lives under a **field of projection**: others place expectations on it, hoping for practical solutions. They do so because they see it as someone able to fix things, almost in the manner of a saviour.',
        'That gives it influence and a natural role of **useful leadership**, but it also exposes it and demands a lot: if it doesn’t deliver what was projected, the same force can turn against it. Its challenge is to manage its **reputation** well and to clarify others’ expectations as far as possible, taking care to promise only what it can genuinely deliver.'
      ]
    },
    '6': {
      title: 'Line 6 — The Role Model',
      paragraphs: [
        'The sixth line goes through **three life phases**: (1) until around the age of 30 it lives like a line 3, trying, stumbling and even collapsing; then (2) it lives a second stage in which it withdraws energetically to observe and process — the "on the roof" stage; and (3) from around 50 onwards it emerges as an **example and a point of reference**.',
        'Its underlying orientation is **objectivity and maturity**: it aspires to live by what it considers right and true, and to become a model for others. Understanding which phase it is in helps it not to judge itself: the observation of the middle stage is not disconnection, but preparation.'
      ]
    }
  },

  // ── Definition (the value "i") ───────────────────────────────────────────
  definition: {
    'no-definition': {
      title: 'No Definition',
      paragraphs: [
        'Unique to the Reflector: **no center is defined**, the whole bodygraph stays open. There is no fixed energy of its own; instead, the person takes in, amplifies and reflects the energy of those around them.',
        'This makes them **extraordinarily sensitive to their environment**: who they are with and where they are changes their experience completely. Their wisdom is born precisely from that total openness, as long as they learn not to confuse what they are merely reflecting with what is their own.'
      ]
    },
    single: {
      title: 'Single Definition',
      paragraphs: [
        'All the defined centers are **connected in a single block**. Energy flows internally without interruption, which gives a sense of **self-sufficiency**: the person has access to their own consistency without depending on others to "complete" them.',
        'Their challenge tends to be the opposite of the split definitions’: because they work well on their own, they can become self-absorbed or find it hard to open up to outside influence. Recognizing when it is worth stepping out of their own bubble is part of their learning.'
      ]
    },
    split: {
      title: 'Split Definition',
      paragraphs: [
        'The defined centers form **two separate groups**, with no channel joining them internally. The person usually experiences a **search for connection**: something to bridge their two parts.',
        'That bridge often arrives through other people — whose energy completes the missing channel — or through planetary transits that activate the in-between gate. This split is not a lack: it is about understanding that there is company and there are environments that make them feel integrated, and that this happens naturally.'
      ]
    },
    'triple-split': {
      title: 'Triple Split Definition',
      paragraphs: [
        'The defined centers are spread across **three separate groups**. The internal wiring is more complex and the person often needs **more variety of stimulation and of people** to feel their inner parts connect.',
        'They usually do well in diverse environments and with a certain amount of movement; too much stillness can leave them feeling that something isn’t quite coming together. Knowing this structure helps them not to read that need for variety as scatteredness.'
      ]
    },
    'quad-split': {
      title: 'Quadruple Split Definition',
      paragraphs: [
        'The rarest: the defined centers form **four separate groups**. It is a highly fragmented wiring that, paradoxically, usually calls for **more structure, space and calm** in order to integrate.',
        'Far from being a problem, it describes a very particular way of processing life. The person benefits from **giving themselves time** and from not pressuring themselves to resolve everything at once: their many parts settle at their own pace.'
      ]
    }
  },

  // ── Center (the chip "i"): each of the nine centers ──────────────────────
  center: {
    head: {
      title: 'Head',
      fn: 'A center of **mental pressure**: the force that pushes us to think, to question and to be inspired. It generates the questions and the curiosity, but it doesn’t answer them — that is the [Ajna](center:ajna)’s job.',
      defined: '**Defined**, it brings a constant way of being inspired and of feeling the pressure to understand.',
      open: '**Undefined**, it amplifies other people’s questions and mental restlessness: here it is wise not to be dragged into resolving doubts that aren’t really your own and don’t matter for your own life.'
    },
    ajna: {
      title: 'Ajna',
      fn: 'The center of the **mind and conceptualisation**: it processes information, forms ideas and gives structure to what we think, working with the pressure arriving from the [Head](center:head).',
      defined: '**Defined**, it gives a fixed and reliable way of thinking, with stable opinions and certainties.',
      open: '**Undefined**, it offers a **flexible, open** mind, able to see many perspectives; its trap is the pressure to appear certain or to cling to a borrowed certainty. Its gift is not needing to always have a fixed answer.'
    },
    throat: {
      title: 'Throat',
      fn: 'The center of **communication and manifestation**: where energy turns into voice and into action. Everything that is expressed or made real passes through here.',
      defined: '**Defined**, it gives a consistent voice and way of expressing oneself.',
      open: '**Undefined**, it adapts its way of communicating to the company and can feel the **pressure to speak in order to be noticed**; its learning is to wait for the right moment instead of forcing words.'
    },
    g: {
      title: 'G',
      fn: 'The center of **identity, love and direction**: the sense of who you are and where your life is heading. It is also tied to the feeling of being in the right place.',
      defined: '**Defined**, it brings a stable sense of identity and direction.',
      open: '**Undefined**, it lives a more **fluid, changing** identity that finds its direction through the right environments and people; the key here is **place**: being in the right spot orients everything else.'
    },
    heart: {
      title: 'Heart (Ego)',
      fn: 'The center of **willpower, ego and self-worth**, tied to the material world and to the ability to commit and keep promises. It is a motor that works in pulses of willpower, not continuously.',
      defined: '**Defined**, it gives a consistent will and the capacity to sustain what is promised.',
      open: '**Undefined** — most people — it **doesn’t need to prove its worth** or measure its willpower; its trap is over-promising in order to prove itself. Here you learn that your worth doesn’t depend on your achievements.'
    },
    sacral: {
      title: 'Sacral',
      fn: 'The great **motor of life force, work and sexuality**: the generative source of the system. It defines Generators and Manifesting Generators, and it is the key to how they manage energy.',
      defined: '**Defined**, it offers a **sustainable, renewable** working energy, meant to be spent on the right things and healthily used up each day.',
      open: '**Undefined**, it doesn’t have that constant energy: here it is vital to **recognize when enough is enough** and not to be dragged along by other people’s pace to the point of exhaustion.'
    },
    spleen: {
      title: 'Spleen',
      fn: 'The center of **instinct, intuition and survival**, tied to the immune system, health and the sense of wellbeing in the present. It speaks quietly, in the now, and only once.',
      defined: '**Defined**, it gives a constant intuition and sense of health.',
      open: '**Undefined**, it **amplifies other people’s fears** and tends to hold on to what isn’t good for it — relationships, habits, situations — out of fear of letting go; its learning is not to decide from fear and to discover what actually suits its body.'
    },
    solarPlexus: {
      title: 'Solar Plexus',
      fn: 'The center of **emotions, feelings and moods**, which works in **waves** that rise and fall over time. When it is defined, it sets an emotional authority: **there is no truth in the moment**.',
      defined: '**Defined**, it lives its own emotional waves and needs time to reach clarity.',
      open: '**Undefined**, it **absorbs and amplifies the emotions of its surroundings** — it picks up the mood of a room — and tends to avoid confrontation; its challenge is not to take ownership of moods it has actually picked up from outside.'
    },
    root: {
      title: 'Root',
      fn: 'A center of **pressure and adrenaline**: the drive that gets us moving and the stress that urges us to act in order to be free of that pressure. It gives the pulse to get things started.',
      defined: '**Defined**, it brings a constant way of handling pressure and stress.',
      open: '**Undefined**, it **amplifies hurry** and the feeling of having to get pending things off its plate as soon as possible; its learning is not to be pushed into rushed decisions just to relieve a pressure that is, in large part, borrowed.'
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
    1: { theme: 'Creative Expression', text: 'Gate 1 is the energy of **creating from one’s own identity**: an original expression that imitates no one. At its best it inspires others; in its shadow, it withdraws into melancholy when it can’t find a way out into the world.' },
    2: { theme: 'Receptive Direction', text: 'Gate 2 is **receptive direction**: knowing where to go without forcing it, letting the course emerge instead of imposing it. Its gift is a natural orientation that gives movement meaning; its shadow, feeling lost when it tries to steer by sheer will.' },
    3: { theme: 'Order in the New', text: 'Gate 3 is the energy of **bringing order to the new**: starting something out of the chaos of the beginning, when there is no form yet. Its gift is knowing how to initiate and structure what is starting; its shadow, the frustration and the block when it wants to go faster than the process allows.' },
    4: { theme: 'Mental Answers', text: 'Gate 4 is the mind that **looks for answers and formulas** to open questions. Its gift is conceptualising logical solutions; its shadow, the pressure to have an answer already, mistaking a hypothesis for a certainty.' },
    5: { theme: 'Fixed Rhythms', text: 'Gate 5 is **fixed rhythms and habits**: the energy that sustains steady routines and a beat of its own. Its gift is the reliability of a natural rhythm that anchors the day; its shadow, the anxiety when that rhythm is broken.' },
    6: { theme: 'Intimacy and Friction', text: 'Gate 6 regulates **intimacy and emotional friction**: when to open and when to close, the boundary of the intimate. Its gift is an emotionality that creates deep closeness; its shadow, conflict and reactivity when that boundary is managed from the emotion of the moment.' },
    7: { theme: 'Leadership and Direction', text: 'Gate 7 is the **guiding role toward the future**: the capacity to give direction and to lead, often from the background. Its gift is a natural authority others want to follow; its shadow, the need to control the course or to impose itself.' },
    8: { theme: 'Contribution', text: 'Gate 8 is **contribution**: bringing something of one’s own that makes a difference and giving voice to what matters. Its gift is an authentic expression that invites others to join; its shadow, contributing in search of recognition and being left empty.' },
    9: { theme: 'Focus on Detail', text: 'Gate 9 is the energy of **focus and concentration** on the details needed to carry something through. Its gift is a sustained attention that completes; its shadow, getting lost in the small or scattering.' },
    10: { theme: 'Self-love', text: 'Gate 10 is **self-love and fidelity to oneself**: behaving in accordance with who one is. Its gift is an authenticity that doesn’t betray itself; its shadow, self-criticism or contorting oneself to fit in.' },
    11: { theme: 'Ideas', text: 'Gate 11 is the mind **full of ideas** to share and to give meaning to experience. Its gift is a stimulating conceptual richness; its shadow, the pressure to turn every idea into action, when ideas are there to be shared rather than executed.' },
    12: { theme: 'Cautious Expression', text: 'Gate 12 is **cautious expression**: speaking when the mood and the moment are right. Its gift is a word that moves and touches at exactly the right instant; its shadow, speaking out of tune or staying silent out of reticence.' },
    13: { theme: 'Listening', text: 'Gate 13 is **listening and memory**: gathering other people’s stories and secrets and giving them meaning. Its gift is an ear that invites trust and orients; its shadow, carrying what others deposit.' },
    14: { theme: 'Power for Resources', text: 'Gate 14 is the **energy to generate and direct resources**: the drive that gives power to one’s own work. Its gift is a generating force that prospers; its shadow, working without a why or without values to guide it.' },
    15: { theme: 'Love of Diversity', text: 'Gate 15 is the **love of humanity and its extremes**: an attraction to the diversity of rhythms and ways of living. Its gift is welcoming what is different and finding the right flow; its shadow, an erratic rhythm or judging other people’s pace.' },
    16: { theme: 'Enthusiasm and Skill', text: 'Gate 16 is **enthusiasm and skill**: the talent that is expressed and refined through practice. Its gift is a contagious enthusiasm and mastery; its shadow, empty enthusiasm with no depth or preparation.' },
    17: { theme: 'Opinions', text: 'Gate 17 is the mind that **forms opinions** and anticipates in order to organize. Its gift is useful opinions that give structure; its shadow, presenting as facts what are only views.' },
    18: { theme: 'Correction', text: 'Gate 18 is the instinct to **correct and improve** what has gone crooked. Its gift is a sharp eye that perfects and protects; its shadow, incessant criticism and perfectionism.' },
    19: { theme: 'Sensitivity to Needs', text: 'Gate 19 is **sensitivity to needs**: sensing what people and the community need, materially and emotionally too. Its gift is a fine attunement to what is missing; its shadow, excessive neediness or hypersensitivity.' },
    20: { theme: 'The Now', text: 'Gate 20 is **the now**: awareness and expression of the present moment. Its gift is a spontaneous, on-target action in the instant; its shadow, busyness or speaking without presence.' },
    21: { theme: 'Control', text: 'Gate 21 is the **will to control** one’s own resources and territory. Its gift is a legitimate authority over what is its own; its shadow, wanting to control everything or feeling controlled.' },
    22: { theme: 'Grace', text: 'Gate 22 is **grace and emotional openness**: the social charm that knows how to listen and open up. Its gift is an emotionality that attracts and connects; its shadow, withdrawal when the mood isn’t there.' },
    23: { theme: 'Assimilation', text: 'Gate 23 is **assimilation**: translating individual knowing into something simple and understandable. Its gift is making the complex clear, those "clicks" others get; its shadow, speaking at the wrong time and not being understood.' },
    24: { theme: 'Rationalization', text: 'Gate 24 is the mind that **returns again and again to a thought** until it makes sense of it. Its gift is the revelation born of revisiting; its shadow, the obsessive loop there is no way out of.' },
    25: { theme: 'Universal Love', text: 'Gate 25 is **innocence and universal love**: a pure loving that expects nothing in return. Its gift is a clean, selfless devotion; its shadow, losing that innocence through wounding or through ego.' },
    26: { theme: 'Persuasive Transmission', text: 'Gate 26 is **persuasive transmission**: the will to communicate and add value, to "sell" an idea. Its gift is a power of conviction that moves people; its shadow, manipulation and half-truths.' },
    27: { theme: 'Care', text: 'Gate 27 is **care and nourishment**: the energy of taking charge and supporting others. Its gift is a care that genuinely nourishes; its shadow, over-protecting or giving until exhausted.' },
    28: { theme: 'The Search for Meaning', text: 'Gate 28 is the **search for meaning**: the game of risking oneself for something worthwhile. Its gift is finding a purpose worth fighting for; its shadow, struggle for struggle’s sake and the fear of a meaningless life.' },
    29: { theme: 'Commitment', text: 'Gate 29 is **commitment**: the energy to say yes and persevere to the end. Its gift is a devotion that delivers what it starts; its shadow, over-committing or saying yes where it shouldn’t have.' },
    30: { theme: 'Desire', text: 'Gate 30 is **desire and longing**: the fire of expectation that drives one to live experiences. Its gift is a passion that fuels life; its shadow, being consumed by cravings that are never satisfied.' },
    31: { theme: 'Leadership Through the Voice', text: 'Gate 31 is **leadership through the voice**: the influence of the one who speaks for a group and represents it. Its gift is a leadership others choose to follow; its shadow, leading without a real mandate or out of mere ambition.' },
    32: { theme: 'Continuity', text: 'Gate 32 is the instinct for **continuity**: sniffing out what endures and what must be adapted to last. Its gift is an instinct for lasting value; its shadow, a fear of failure and of change that paralyses.' },
    33: { theme: 'Retreat and the Telling', text: 'Gate 33 is **retreat and the telling**: withdrawing in order to later recount what was lived. Its gift is a wisdom shared after reflection; its shadow, not honoring the need to withdraw, or telling too much or too little.' },
    34: { theme: 'Power', text: 'Gate 34 is **raw power**: an independent force, always busy doing. Its gift is an enormous productive potency; its shadow, busyness for its own sake, setting off without having responded.' },
    35: { theme: 'Hunger for Experience', text: 'Gate 35 is the **hunger for experience and progress**: the drive to try everything and move forward. Its gift is an appetite for living that pushes onward; its shadow, the restlessness of never being satisfied.' },
    36: { theme: 'Crisis and the New', text: 'Gate 36 is **emotional crisis and the new**: the swing that leads to unprecedented experiences. Its gift is growing through emotional intensity; its shadow, throwing itself into drama or crisis unprepared.' },
    37: { theme: 'Friendship and Agreements', text: 'Gate 37 is **friendship and community**: the warmth that unites through pacts and agreements. Its gift is an affection that creates family and belonging; its shadow, dependency or broken agreements.' },
    38: { theme: 'Struggle with Meaning', text: 'Gate 38 is the **struggle for what is worthwhile**: the tenacity to stand up for a cause. Its gift is a perseverance with purpose; its shadow, fighting for the sake of fighting, or stubbornness.' },
    39: { theme: 'Provocation', text: 'Gate 39 is **provocation**: stirring other people’s emotion to bring out what really matters. Its gift is provoking in order to reveal spirit; its shadow, gratuitous provocation or moodiness.' },
    40: { theme: 'Giving and Rest', text: 'Gate 40 is **giving and solitude**: working and providing in order to then withdraw and recover. Its gift is a generosity that also knows how to rest; its shadow, overwork without pause, or refusing to give.' },
    41: { theme: 'The Imagination That Starts Desire', text: 'Gate 41 is the **imagination that starts desire**: the beginning of every new experience, dreamt before it is lived. Its gift is a fantasy that opens new experiences; its shadow, an imagination disconnected from reality, or the pressure of an unsatisfied longing.' },
    42: { theme: 'Completion', text: 'Gate 42 is **completion**: the energy to close cycles and carry things through to the end. Its gift is the ability to finish what was started; its shadow, starting without finishing, or the fear of endings.' },
    43: { theme: 'Mental Intuition', text: 'Gate 43 is **mental intuition**: an individual knowing that arrives as a flash, ahead of everyone else. Its gift is an original, revealing idea; its shadow, insisting on saying it at the wrong time and not being understood.' },
    44: { theme: 'The Instinct for the Past', text: 'Gate 44 is the **instinct that reads the past**: an alertness for recognizing patterns, people and opportunities. Its gift is a nose for people and timing; its shadow, the fear that the past will repeat itself.' },
    45: { theme: 'The Voice of Resources', text: 'Gate 45 is the **voice that gathers and distributes resources**: the "I have" of whoever administers what is shared. Its gift is a generous stewardship that looks after the group; its shadow, hoarding or a sense of entitlement.' },
    46: { theme: 'Love of the Body', text: 'Gate 46 is **love of the body and being well**: the determination to inhabit the body and to be in the right place. Its gift is a serendipity that puts one in the right spot at the right moment; its shadow, neglecting or forcing the body.' },
    47: { theme: 'Mental Realization', text: 'Gate 47 is **realization**: the mental pressure to make sense of confusion until the "aha" arrives. Its gift is resolving the confusing into clear understanding; its shadow, getting trapped in a sense of oppression or meaninglessness.' },
    48: { theme: 'Depth', text: 'Gate 48 is **depth**: a well of talent and wisdom to draw solutions from. Its gift is a depth that supplies what is missing; its shadow, the fear of not being enough or not being ready.' },
    49: { theme: 'Principles', text: 'Gate 49 is **principles and revolution**: accepting or rejecting according to deep values. Its gift is transforming bonds from clear principles; its shadow, rigid rejection or revolution without sensitivity.' },
    50: { theme: 'Values', text: 'Gate 50 is **values and responsibility**: the guardianship of the norms that protect the group’s wellbeing. Its gift is a keeping of values that supports others; its shadow, over-responsibility and the fear of failing the group.' },
    51: { theme: 'Impulse and Shock', text: 'Gate 51 is the **impulse to be first**: the initiative that shakes and awakens. Its gift is a courage that wakes others up; its shadow, competitiveness or recklessness.' },
    52: { theme: 'Stillness and Focus', text: 'Gate 52 is **stillness and concentration**: the pressure to stop in order to focus and see the whole. Its gift is a calm that makes concentration possible; its shadow, inertia or the restlessness of not knowing how to be still.' },
    53: { theme: 'Beginnings', text: 'Gate 53 is **beginnings**: the pressure and the energy to start new cycles. Its gift is the drive to get the new under way; its shadow, starting without pause and never completing.' },
    54: { theme: 'Ambition', text: 'Gate 54 is **ambition**: the drive to rise, materially and spiritually. Its gift is an ambition that elevates; its shadow, chasing advancement for other people’s approval, or overstepping.' },
    55: { theme: 'Abundance of Spirit', text: 'Gate 55 is **spirit and emotional abundance**: the richness of moods and of faith. Its gift is an emotional depth and a faith that sustain; its shadow, letting melancholy or the swing of mood make the decisions.' },
    56: { theme: 'The Stimulating Story', text: 'Gate 56 is the **story that stimulates**: telling ideas and experiences that hook people. Its gift is a captivating narration that opens horizons; its shadow, embellishing too much, or wandering attention.' },
    57: { theme: 'Intuition in the Now', text: 'Gate 57 is **sharp intuition in the now**: an instinctive clarity that penetrates the present. Its gift is a subtle, unerring knowing in the instant; its shadow, a fear of the future that paralyses.' },
    58: { theme: 'Vitality and Improvement', text: 'Gate 58 is **vitality and the joy of living**: the energy that pushes to make things better. Its gift is a vital delight that fuels correction; its shadow, restlessness or criticism without joy.' },
    59: { theme: 'Intimacy', text: 'Gate 59 is **intimacy**: the energy to break barriers and create a bond, sexual too. Its gift is the power to generate closeness and union; its shadow, putting up walls or intruding on intimacy.' },
    60: { theme: 'Accepting the Limit', text: 'Gate 60 is **accepting the limit**: turning restriction into the seed of the new. Its gift is transforming limits into possibility; its shadow, getting stuck in limitation and melancholy.' },
    61: { theme: 'Inner Truth', text: 'Gate 61 is **inner truth and mystery**: the pressure to know what cannot be fully known. Its gift is an inspiration that seeks the bottom of things; its shadow, the mental pressure of wanting to know it all.' },
    62: { theme: 'Detail and Order', text: 'Gate 62 is **detail and organization**: naming and ordering things in order to express them precisely. Its gift is a clear, orderly expression; its shadow, getting lost in detail or over-explaining.' },
    63: { theme: 'Doubt', text: 'Gate 63 is **doubt**: the pressure that pushes to question and verify. Its gift is a healthy doubt that puts things to the test; its shadow, corrosive suspicion and anxiety.' },
    64: { theme: 'Fertile Confusion', text: 'Gate 64 is the **confusion that seeks meaning**: a pressure of unprocessed images striving to arrange themselves. Its gift is a richness of images that ends in understanding; its shadow, the overwhelm of trying to resolve the confusion too soon.' }
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
        'Instead of setting out to initiate from your head, your design asks you to **wait until there is something to respond to**: a proposal, a question, an opportunity that appears. Life presents the material; your body responds.',
        'The response arises in your [Sacral center](center:sacral) as a **gut reaction**, prior to reasoning: an impulse to move toward or to pull away. A yes or a no. Trusting that bodily yes or no, instead of talking yourself into it, is what leads you to satisfaction; forcing action where there is no response leads you to frustration.'
      ],
      'respond-then-inform': [
        'It combines the two strategies of responding and informing. First of all, like any Generator, you respond — that is, you **wait for the sacral response**, your body’s yes or no to something concrete; you don’t initiate from the mind.',
        'Once you have that response and are about to act, you **inform those who will be affected** before setting off. Because of your ability to manifest quickly, letting people know reduces friction with your surroundings and stops your speed from generating resistance. Skipping either of the two steps — responding and informing — is the usual source of your exhaustion.'
      ],
      'inform-before-acting': [
        'Because your energy initiates and makes an impact without warning, your design asks you to **let the people you are going to affect know before setting off**. This is not about asking permission or justifying yourself: it is simply communicating what you are about to do.',
        'The effect is very practical: informing dissolves much of the resistance you meet when you act by surprise. In fact, informing can even bring you allies who smooth the way. Doing it brings peace around you; skipping it provokes the anger and opposition that, without you noticing, end up obstructing your own movement.'
      ],
      'wait-for-invitation': [
        'For the important things — a job, a relationship, a big commitment — your design asks you to **wait to be recognized and invited** instead of offering yourself unasked.',
        'This is not passivity: you keep living and preparing, but you save your wisdom for those who value it and ask for it. **The right invitation opens the door** for your gift to be well received; insisting without one usually brings you resistance, bitterness and rejection. Recognition and success are the sign that the wait was worth it.'
      ],
      'wait-lunar-cycle': [
        'Before an important decision, your design asks you to **let a full lunar cycle pass** — about 28 days — instead of settling things all at once.',
        'During that time, **you talk it over, sample different environments and observe how your perception of the matter changes** day by day. Because your chart is completely open, you need that journey to tell what is yours from what you are merely reflecting. Clarity comes to you by accumulation, by seeing the matter from different perspectives, not by impulse.'
      ]
    },
    authority: {
      emotional: [
        'You have a **defined [Solar Plexus](center:solarPlexus)**, which works in waves: your mood rises and falls over time, not because of the facts of the moment. Your golden rule is clear: **there is no truth in the now**.',
        'To decide well, your design asks you to **wait until you have ridden out the emotional wave** — sleep on it, let time pass, come back to the matter in different moods — before committing. Your clarity is not an instant flash, but what remains once the emotion has settled. Haste is your main enemy.'
      ],
      sacral: [
        'Your authority lives in the **[Sacral center](center:sacral)**, which responds **in the moment** with a sound or a gut impulse — a kind of "uh-huh" of attraction or an "mm-mm" of rejection — to something concrete: the body *says* yes or no.',
        'It is an **immediate, bodily** authority: it doesn’t reason, it reacts. It works best with yes/no questions and clouds over when your mind tries to argue the decision. Learning to catch and trust that instant response from the belly is your central practice.'
      ],
      splenic: [
        'Your authority lives in the **[Spleen](center:spleen)**, the oldest center of awareness, tied to survival, health and instinct. It speaks **in the present and only once**: a sudden, quiet, spontaneous knowing, with no repetition and no argument.',
        'It is the most **subtle and fleeting** authority: it doesn’t insist or argue, so it is easy to overlook or to rationalize away afterwards. Your practice is to **trust that first instinctive impulse** — that calm bodily "yes" or "no" — the instant it appears, because it usually doesn’t speak twice.'
      ],
      ego: [
        'Your authority lives in the **[Heart center (Ego)](center:heart)**, the engine of willpower and desire. Here you recognize the right decision through an honest question: **do I really want this? what’s in it for me?** This is not selfishness, it is honoring what you actually want.',
        'It is an authority of **will and impulse**, not of prolonged reflection. It works when you listen to what you truly desire and are able to commit to it; it gets lost when you accept things out of duty or pressure that your heart doesn’t back.'
      ],
      'self-projected': [
        'Your truth arrives through the **voice**: by talking the matter through out loud, **you hear yourself** and recognize what is consistent with your identity and your direction.',
        'What matters is not the listener’s opinion, but the act of **expressing and hearing yourself**. So it helps you to be surrounded by trusted people who let you talk without steering you, and to pay attention to the tone and the words that come out: your guidance is there, more than in the reasoning.'
      ],
      mental: [
        'Also called environmental authority or "sounding board". You don’t have a fixed inner bodily authority: your clarity doesn’t arrive from within all at once, **your clarity comes from dialogue**.',
        'Your practice consists of **talking the matter through with trusted people and in the right environment**, not so they decide for you, but so you can hear yourself think out loud. The right place and company are part of the method here: the decision settles gradually, with time and conversation.'
      ],
      lunar: [
        'As a Reflector you have no defined center, so there is no fixed inner source in you: your guide is **time**, a full lunar cycle — about 28 days — before important decisions.',
        'Over that cycle, **you sample different states, environments and conversations**, and observe how your perception of the matter evolves. Your clarity comes through **maturation** and an accumulation of perspectives, not through impulse: what still resonates after the whole cycle is what can be trusted.'
      ]
    },
    profile: {
      '1': [
        'You seek **security through knowledge**. You need to investigate, to understand the fundamentals and to know the ground beneath you is solid before acting; without that base, you feel uneasy.',
        'It is an **introspective, studious** energy: you go deep until you feel expert, and that solidity reassures others. Your challenge is not to wait indefinitely to know "everything" before taking the step.'
      ],
      '2': [
        'You have **natural gifts** that you exercise almost effortlessly, often without being fully aware of them. You need **time alone** for that talent to ripen at your own pace.',
        'Your dynamic is to be **called from outside**: others see in you something you can’t quite name yourself, and invite you to bring it out. Your balance lies between respecting your need for retreat and answering those calls when they are the right ones.'
      ],
      '3': [
        'You learn **by trying**: through direct contact with life, through attempts, discoveries and stumbles too. Every "mistake" is information, not failure.',
        'It is an **experimental, resilient** energy: you discover what works by ruling out what doesn’t. Your wisdom is very practical, and it is essential that you don’t read your stumbles as personal flaws, but as the very method you are designed to learn by.'
      ],
      '4': [
        'You work through **bonds and community**. Opportunities — work, love, changes — usually reach you through people you already know, not through strangers or cold outreach.',
        'It is a **warm, relational** energy that needs solidity in its attachments. The classic practical advice for you is not to let go of one base — a job, a situation — until the next is secured through your network: transitions work better for you that way.'
      ],
      '5': [
        'You live under a **field of projection**: others place expectations on you, hoping for practical solutions. They do so because they see you as someone able to fix things, almost in the manner of a saviour.',
        'That gives you influence and a natural role of **useful leadership**, but it also exposes you and demands a lot: if you don’t deliver what was projected, the same force can turn against you. Your challenge is to manage your **reputation** well and to clarify others’ expectations as far as possible, taking care to promise only what you can genuinely deliver.'
      ],
      '6': [
        'You go through **three life phases**: (1) until around the age of 30 you live like line 3, trying, stumbling and even collapsing; then (2) you live a second stage in which you withdraw energetically to observe and process — the "on the roof" stage; and (3) from around 50 onwards you emerge as an **example and a point of reference**.',
        'Your underlying orientation is **objectivity and maturity**: you aspire to live by what you consider right and true, and to become a model for others. Understanding which phase you are in helps you not to judge yourself: the observation of the middle stage is not disconnection, but preparation.'
      ]
    },
    definition: {
      'no-definition': [
        '**No center is defined**, your whole bodygraph stays open. You don’t have a fixed energy of your own; instead, you take in, amplify and reflect the energy of those around you.',
        'This makes you **extraordinarily sensitive to your environment**: who you are with and where you are changes your experience completely. Your wisdom is born precisely from that total openness, as long as you learn not to confuse what you are merely reflecting with what is yours.'
      ],
      single: [
        'All your defined centers are **connected in a single block**. Your energy flows internally without interruption, which gives you a sense of **self-sufficiency**: you have access to your own consistency without depending on others to "complete" you.',
        'Your challenge tends to be the opposite of the split definitions’: because you work well on your own, you can become self-absorbed or find it hard to open up to outside influence. Recognizing when it is worth stepping out of your own bubble is part of your learning.'
      ],
      split: [
        'Your defined centers form **two separate groups**, with no channel joining them internally. That is why you usually experience a **search for connection**: something to bridge your two parts.',
        'That bridge often arrives through other people — whose energy completes the channel you are missing — or through planetary transits that activate the in-between gate. This split is not a lack: it is about understanding that there is company and there are environments that make you feel integrated, and that this happens naturally.'
      ],
      'triple-split': [
        'Your defined centers are spread across **three separate groups**. Your internal wiring is more complex and you often need **more variety of stimulation and of people** to feel your inner parts connect.',
        'You usually do well in diverse environments and with a certain amount of movement; too much stillness can leave you feeling that something isn’t quite coming together. Knowing this structure helps you not to read that need for variety as scatteredness.'
      ],
      'quad-split': [
        'The rarest: your defined centers form **four separate groups**. It is a highly fragmented wiring that, paradoxically, usually calls for **more structure, space and calm** in order to integrate.',
        'Far from being a problem, it describes a very particular way of processing life. You benefit from **giving yourself time** and from not pressuring yourself to resolve everything at once: your many parts settle at their own pace.'
      ]
    },
    center: {
      head: {
        defined: 'This is one of your **defined** centers: you have a constant way of being inspired and of feeling the pressure to understand.',
        open: 'This is one of your **open** centers: you amplify other people’s questions and mental restlessness, and it is wise not to be dragged into resolving doubts that aren’t really yours and don’t matter for your life.'
      },
      ajna: {
        defined: 'This is one of your **defined** centers: you have a fixed and reliable way of thinking, with stable opinions and certainties.',
        open: 'This is one of your **open** centers: your mind is flexible, able to see many perspectives; your trap is the pressure to appear certain or to cling to a borrowed certainty, and your gift is not needing to always have a fixed answer.'
      },
      throat: {
        defined: 'This is one of your **defined** centers: you have a consistent voice and way of expressing yourself.',
        open: 'This is one of your **open** centers: you adapt your way of communicating to the company and may feel the pressure to speak in order to be noticed; your learning is to wait for the right moment instead of forcing words.'
      },
      g: {
        defined: 'This is one of your **defined** centers: you have a stable sense of identity and direction.',
        open: 'This is one of your **open** centers: your identity is more fluid and changing, and it finds its direction through the right environments and people; your key is **place**: being in the right spot orients everything else.'
      },
      heart: {
        defined: 'This is one of your **defined** centers: you have a consistent will and the capacity to sustain what you promise.',
        open: 'This is one of your **open** centers (as in most people): you don’t need to prove your worth or measure your willpower, and your trap is over-promising to prove yourself. Here you learn that your worth doesn’t depend on your achievements.'
      },
      sacral: {
        defined: 'This is one of your **defined** centers: you have a sustainable, renewable working energy, meant to be spent fully on the right things and healthily used up each day.',
        open: 'This is one of your **open** centers: you don’t have that constant energy, so it is vital for you to recognize when enough is enough and not to be dragged along by other people’s pace to the point of exhaustion.'
      },
      spleen: {
        defined: 'This is one of your **defined** centers: you have a constant intuition and sense of health.',
        open: 'This is one of your **open** centers: you amplify other people’s fears and tend to hold on to what isn’t good for you — relationships, habits, situations — out of fear of letting go; your learning is not to decide from fear and to discover what actually suits your body.'
      },
      solarPlexus: {
        defined: 'This is one of your **defined** centers: you live your own emotional waves and need time to reach clarity.',
        open: 'This is one of your **open** centers: you absorb and amplify the emotions around you — you pick up the mood of a room — and tend to avoid confrontation; your challenge is not to take ownership of moods you have actually picked up from outside.'
      },
      root: {
        defined: 'This is one of your **defined** centers: you have a constant way of handling pressure and stress.',
        open: 'This is one of your **open** centers: you amplify hurry and the feeling of having to get pending things off your plate as soon as possible; your learning is not to be pushed into rushed decisions just to relieve a pressure that is, in large part, borrowed.'
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
    '1-8': { name: 'Channel of Inspiration', essence: 'the creativity of one’s own identity, which needs a voice in order to inspire others by being a role model.' },
    '2-14': { name: 'Channel of the Beat', essence: 'an inner direction that orients where to aim one’s life force and resources.' },
    '3-60': { name: 'Channel of Mutation', essence: 'the pulse of change, turning limitation into the beginning of something new.' },
    '4-63': { name: 'Channel of Logic', essence: 'the mind that starts from doubt to look for answers and formulas that resolve it.' },
    '5-15': { name: 'Channel of Rhythm', essence: 'a natural rhythm of one’s own that, open to diversity, tunes in to the flow of life.' },
    '6-59': { name: 'Channel of Intimacy', essence: 'the energy of breaking barriers and creating a bond, managing when to open up and when to close.' },
    '7-31': { name: 'Channel of Leadership', essence: 'the guiding role that gives direction to the future and finds the voice to lead a group.' },
    '9-52': { name: 'Channel of Concentration', essence: 'the stillness that allows energy to be focused on detail until something is carried through.' },
    '10-20': { name: 'Channel of Awakening', essence: 'self-love expressed in the present, being true to oneself here and now.' },
    '10-34': { name: 'Channel of Exploration', essence: 'the strength to act on one’s own convictions, being true to oneself.' },
    '10-57': { name: 'Channel of Survival', essence: 'intuition in the service of wellbeing and of the right way to inhabit the body.' },
    '11-56': { name: 'Channel of Curiosity', essence: 'the mind full of ideas that seeks to tell them as stories that stimulate and give meaning.' },
    '12-22': { name: 'Channel of Openness', essence: 'the emotional expression that opens up and moves people when the mood and the moment are right.' },
    '13-33': { name: 'Channel of the Prodigal', essence: 'gathering what has been lived and, after retreat, sharing it as a witness for others.' },
    '16-48': { name: 'Channel of Talent', essence: 'the deep talent that, with enthusiasm and practice, ripens into mastery.' },
    '17-62': { name: 'Channel of Acceptance', essence: 'opinions that arrange themselves into data and detail in order to organize and anticipate.' },
    '18-58': { name: 'Channel of Judgement', essence: 'the vitality that pushes to correct and perfect what has gone crooked.' },
    '19-49': { name: 'Channel of Synthesis', essence: 'the sensitivity to needs that decides bonds from deep principles.' },
    '20-34': { name: 'Channel of Charisma', essence: 'power that turns into action in the present, thinking and doing without delay.' },
    '20-57': { name: 'Channel of the Brain Wave', essence: 'the sharp intuition that catches and voices the sure knowing of the instant.' },
    '21-45': { name: 'Channel of Money', essence: 'the will to control resources and the voice that administers them for the group.' },
    '23-43': { name: 'Channel of Structuring', essence: 'individual knowing translated into clear ideas others can understand.' },
    '24-61': { name: 'Channel of Awareness', essence: 'the pressure to know the mystery, turning it over until it reveals its meaning.' },
    '25-51': { name: 'Channel of Initiation', essence: 'the impulse that initiates and shakes, moved by a pure love that awakens the spirit.' },
    '26-44': { name: 'Channel of Surrender', essence: 'the instinct that reads the past and transmits it with the power to convince.' },
    '27-50': { name: 'Channel of Preservation', essence: 'the care that sustains others, guided by the values that protect the group.' },
    '28-38': { name: 'Channel of Struggle', essence: 'the tenacity to fight and take risks for a life worth living.' },
    '29-46': { name: 'Channel of Discovery', essence: 'committed devotion that, put into the body, thrives where others fail.' },
    '30-41': { name: 'Channel of Recognition', essence: 'the imagination and longing that kindle the desire to live new experiences.' },
    '32-54': { name: 'Channel of Transformation', essence: 'the ambition to rise, guided by an instinct for what endures.' },
    '34-57': { name: 'Channel of Power', essence: 'raw strength in the service of instinct, a power that is presence in the moment.' },
    '35-36': { name: 'Channel of Transience', essence: 'the hunger for experience that, through emotional ups and downs, pushes to try everything and move on.' },
    '37-40': { name: 'Channel of Community', essence: 'the warmth that creates community through agreements, giving of itself and knowing when to withdraw and recover.' },
    '39-55': { name: 'Channel of Emotion', essence: 'the provocation that stirs the mood and its abundance in order to bring spirit to the surface.' },
    '42-53': { name: 'Channel of Maturation', essence: 'the energy of cycles: starting and carrying through to the end in order to mature with experience.' },
    '47-64': { name: 'Channel of Abstraction', essence: 'the pressure of confused images striving to arrange themselves until understanding arrives.' }
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
