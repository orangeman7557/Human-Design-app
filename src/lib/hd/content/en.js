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
      'inform-before-acting': 'Inform before acting',
      respond: 'Respond',
      'respond-then-inform': 'Respond, then inform',
      'wait-for-invitation': 'Wait for the invitation',
      'wait-lunar-cycle': 'Wait a lunar cycle'
    },
    authority: {
      emotional: 'Emotional (Solar plexus)',
      sacral: 'Sacral',
      splenic: 'Splenic (Spleen)',
      ego: 'Ego (Heart)',
      'self-projected': 'Self-projected (G–Throat)',
      mental: 'Mental/environmental',
      lunar: 'Lunar'
    },
    definition: {
      'no-definition': 'No definition',
      single: 'Single definition',
      split: 'Split definition',
      'triple-split': 'Triple split definition',
      'quad-split': 'Quadruple split definition'
    },
    center: {
      head: 'Head',
      ajna: 'Ajna',
      throat: 'Throat',
      g: 'G',
      heart: 'Heart',
      sacral: 'Sacral',
      spleen: 'Spleen',
      solarPlexus: 'Solar plexus',
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
      emotional: 'emotional (Solar plexus)',
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
      solarPlexus: 'Solar plexus',
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

  // ── Element-drawer scaffolding ───────────────────────────────────────────
  drawer: {
    factCenter: 'Center',
    factCenters: 'Centers',
    factChannel: 'Channel',
    factChannels: 'Channels',
    factGate: 'Gate',
    factGates: 'Gates',
    factHarmonic: 'Harmonic gate',
    factHarmonics: 'Harmonic gates',
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

  // ── Initial-report scaffolding (second person) ───────────────────────────
  reportShell: {
    typeTitle: 'Your type: {type}',
    typeSubhead: 'You are a {type}',
    centersTitle: 'Your centers and your conditioning',
    strategyTitle: 'Your strategy: {strategy}',
    authorityTitle: 'Your authority: {authority}',
    profileTitle: 'Your {profile} profile',
    definitionTitle: 'Your definition: {definition}',
    definitionTitleNone: 'Your definition',
    definitionPrefix: '^Definition\\s+',
    practiceTitle: 'Living your design',
    profileHeading: 'Profile {profile}',
    profileIntro:
      'Your {profile} profile combines two lines: the {a}, conscious, and the {b}, unconscious. Each adds its own nuance, and together they describe your way of learning, relating and unfolding your purpose.',
    closingPrompt:
      'According to Human Design I am a {type}, with a {profile} profile, {authority} authority, the "{strategy}" strategy and {definition}; my defined centers are: {centers}. I would like to know more about...',
    noCenters: 'none'
  },

  // ── Concept level (what each category is) ────────────────────────────────
  concept: {
    bodygraph: {
      title: 'The bodygraph',
      paragraphs: [
        'The **bodygraph** is the diagram of the body on which the chart is drawn: the nine geometric shapes are the [centers](concept:center) and the lines connecting them are the [channels](concept:channel), which run from one gate to another. Each center governs a specific function and, together, they map how energy flows.',
        'What makes every chart unique is which of those [centers](concept:center), [channels](concept:channel) and [gates](concept:gate) are active: type, authority and a person’s way of working all come out of that combination.',
        'The key distinction is whether each center is **defined** or **undefined** (open). A **defined** center — colored in on the bodygraph — works in a fixed, reliable way: a consistent energy, one’s own and constant. An **undefined** center — shown empty — is not a flaw: it is an open area where the energy of others and of the environment is taken in and amplified; it is where most is learned, but also where it is easy to be conditioned and to mistake what is borrowed for what is one’s own.'
      ]
    },
    type: {
      title: 'The types',
      paragraphs: [
        '**Type** is the first and most important distinction in a chart: it describes how a person’s energy is designed to interact with the world. There are five — [Generator](type:generator), [Manifesting Generator](type:manifesting-generator), [Projector](type:projector), [Manifestor](type:manifestor) and [Reflector](type:reflector) — and they are determined by which centers are defined and how they connect to the [Throat](center:throat).',
        'Knowing your type matters above all for one practical reason: each one has its own healthy way of **managing energy and making decisions**. Living according to your own design — instead of imitating other types — is what the system associates with less resistance and less wear.',
        'It is not a personality label or a horoscope, but a mechanical description of how each person’s energy works. The value is in using it as a mirror: noticing whether your own way of moving through life matches the one the chart suggests.'
      ]
    },
    strategy: {
      title: 'Strategy',
      paragraphs: [
        '**Strategy** is the correct way for each type to act in order to live in alignment. It answers a very concrete question: how do you commit to something — a job, a relationship, a decision — without forcing the situation? Each type has its own.',
        'The five are: the Generator *responds* to what life puts in front of them; the Manifesting Generator *responds and then informs*; the Manifestor *informs before acting*; the Projector *waits for the invitation*; and the Reflector *waits a lunar cycle*. They all share one idea: **stop initiating from the mind** and trust the signal of your own body and of life.',
        '**Following your strategy is, in practice, the central experiment of Human Design.** The system suggests observing the difference between decisions made in line with your strategy and those made against it, and using that experience — not the theory — as your guide.'
      ]
    },
    authority: {
      title: 'Authority',
      paragraphs: [
        '**Authority** tells you where to make a decision from reliably: which part of you has the final word. In Human Design the mind is there to process information and advise others, but **the mind is not to be trusted for decisions about your own life**; authority always comes from a more bodily source.',
        'There are seven: emotional (Solar plexus), sacral, splenic (Spleen), ego (Heart), self-projected (G), mental/environmental and lunar. They are determined by a hierarchy based on the defined centers. Some operate **in the moment** (sacral and splenic) and others need **time** (emotional, which asks you to ride out the emotional wave before clarity arrives).',
        'Authority is the most practical tool in the chart: it turns strategy into a concrete method for everyday decisions. Before an important yes or no, it tells you which inner signal to listen to.'
      ]
    },
    profile: {
      title: 'The profile',
      paragraphs: [
        'The **profile** describes the "how" of each person’s path: the style in which they learn, relate and fulfill their purpose. It is made of two numbers (3/5, for example), taken from lines 1 to 6 of the I Ching: the first comes from the Sun/Earth of *personality* and the second from the Sun/Earth of *design*.',
        'Each line adds a nuance: 1- foundation and research, 2- natural talent, 3- trial and error, 4- bonds and network, 5- projection and practical leadership, 6- example and maturity. The combination of the **two lines** describes a recognizable way of moving through life — more inward or more relational, more experimental or more solid.',
        'While type and authority answer *how to decide*, the profile answers *how experience unfolds*. It is one of the most revealing layers for self-knowledge, because it usually describes patterns a person already recognizes in their own history. Of the two lines, the first is lived more consciously and the second more unconsciously. The unconscious line is generally more visible to others than to oneself.'
      ]
    },
    definition: {
      title: 'Definition',
      paragraphs: [
        '**Definition** describes how the defined centers of a chart are connected to each other: whether they form a single block of energy or several separate groups. It speaks of inner consistency — which parts of a person are always "switched on" and linked — and of how that energy is integrated.',
        'The variants are: no definition ([Reflector](type:reflector), no center defined), single (everything connected in one group), split (two groups), triple split (three) and quadruple split (four). Single definition tends to feel **self-sufficient**; split definitions usually experience a **search for connection**, often through other people or through specific gates that bridge the groups.',
        'In practice, definition helps you understand what kind of company or environment completes you. Having more or fewer splits is neither better nor worse: each describes a different way of functioning and of relating.'
      ]
    },
    center: {
      title: 'The centers',
      paragraphs: [
        'The **centers** are the nine energy hubs of the bodygraph, each tied to a specific function. They inherit the idea of the chakras, but here what matters is whether each center is **defined** or **undefined** (open). The nine centers and their functions are:'
      ],
      after: [
        'A **defined** center works in a fixed, reliable way: a consistent energy that is always contributed, one’s own and constant. An **undefined** center is not a flaw: it is an open area where the energy of others and of the environment is taken in and amplified; it is where most is learned, but also where it is easy to be conditioned and to mistake what is borrowed for what is one’s own.',
        'Looking at the centers is one of the most practical keys to **managing energy**: the defined ones mark what you offer steadily, and the undefined ones mark where it is wise not to make decisions under borrowed pressure.'
      ]
    },
    channel: {
      title: 'The channels',
      paragraphs: [
        'The **channels** are the 36 connections of the bodygraph: each joins two gates sitting in different centers. A **complete** channel — with both of its gates active — links those two centers, defines them, and creates a steady, reliable current of energy between them.',
        'Taken together, the channels are what determine **type, definition and which centers are defined**. That makes them the mechanical backbone of the chart: they don’t describe an isolated trait, but a constant way in which two areas of energy work together.',
        'Each channel combines the themes of its two gates (and of their I Ching hexagrams). For a detailed reading of a specific channel, you can use the "learn more using AI" option.'
      ]
    },
    gate: {
      title: 'The gates',
      paragraphs: [
        'The **gates** are the 64 possible activations of the bodygraph, one for each I Ching hexagram. Each gate lives in a specific center and adds a particular nuance of energy or character; at birth, the planets "switch on" a set of them.',
        'An active gate that doesn’t find its partner — the one at the other end of its channel — is left **hanging**: it contributes its theme but seeks completion, often through another person who has the complementary gate. When both gates of a channel are active, the channel forms and defines its two centers.',
        'To go deeper into a specific gate — its nuance, its I Ching hexagram and how it is lived — you can use the "learn more using AI" option.'
      ]
    },
    activation: {
      title: 'The activations',
      paragraphs: [
        '**Activations** are the positions of the planets at the moment of birth, translated into Human Design gates and lines. Each body "switches on" a specific gate (and its line), and the set of all of them is what builds the chart: centers, channels, type, authority and profile.',
        'They are calculated at **two moments**, hence the two columns: *Personality* uses the position at the instant of birth (the conscious side); *Design* uses the position about 88 days earlier — 88° of solar arc — (the unconscious side). That is why there are two activations per planet.',
        'Each activation is written as **gate.line**: the gate (1 to 64) and, within it, the line (1 to 6). For example, a **30.3 on the Sun** means the Sun activates **gate 30 in its line 3** — the theme of gate 30 read with the nuance line 3 brings. It is the basic unit the whole chart is built from.',
        'They don’t all carry the same weight: the **Sun and Earth** concentrate most of the meaning and the rest add nuance; the *Weight* column summarizes that relative influence. Tap an activation to open the corresponding gate. And to see the lines, look at the possible lines in the [profile](concept:profile).'
      ]
    }
  },

  // ── Type (the chip "i") ──────────────────────────────────────────────────
  type: {
    generator: {
      title: 'Generator',
      paragraphs: [
        'The majority type, the *pure* Generator: around **37% of the population**. Its defining feature is the defined [Sacral center](center:sacral): the life-force engine of the system, generative and renewable in character. Its generating, building energy, when well aligned, is sustained and abundant.',
        'It operates by responding: it **reacts to what life puts in front of it** instead of initiating from the mind and from reasoning. When it commits its energy to the right thing, *satisfaction* appears; if it doesn’t listen well and forces its energy where it doesn’t belong, *frustration* appears.',
        'In practice, its Sacral center responds before its mind does: faced with something concrete — a proposal, a question, a situation — a gut reaction of attraction or rejection arises. **Following that bodily signal**, rather than deciding from thought and reason, is what keeps its energy well spent.'
      ]
    },
    'manifesting-generator': {
      title: 'Manifesting Generator',
      paragraphs: [
        'A variant of the [Generator](type:generator) — Manifesting Generators are about 33% of the population, and together with the other Generators, close to 70%: an MG has a defined [Sacral](center:sacral), and what sets it apart from other Generators is that its Sacral is connected, directly or indirectly, to the [Throat](center:throat). That gives it the generating energy typical of Generators plus the ability to manifest and make things happen quickly.',
        'Its strategy is to **respond and then inform**: first it waits for the sacral response — the body’s yes or no — and, once it has it, it lets those who will be affected know before setting off. It tends to be multi-talented, fast and non-linear: it skips steps, does several things at once, and sometimes doubles back to finish what it skipped.',
        'The key to managing its energy is not to scatter itself by initiating without having listened to its body’s response: when it commits to what genuinely lights it up (when its body says yes), it moves fast and feels *satisfaction* and *peace*; but when it forces things driven by the mind and by ideas, it accumulates *frustration*, *anger* and half-finished work.'
      ]
    },
    projector: {
      title: 'Projector',
      paragraphs: [
        'Close to **20% of the population**. It does not have a defined [Sacral](center:sacral), so it is **not designed for constant work** nor to sustain the same energy as a [Generator](type:generator): it must be careful about trying to perform continuously and without rest. Its gift is a different one: seeing others with enormous depth and knowing how to guide and direct other people’s energy.',
        'Its strategy is to **wait for the invitation** for the important things — work, love, where to live. It needs to be recognized and invited for its wisdom and its effort to be well received; when it offers itself or steps in unasked, it usually meets resistance and rejection. When *recognition* and *success* show up in its life, they are the clue that it is on the right track. The symptom that appears when it isn’t living in alignment is *bitterness*.',
        'In managing its energy, its task is to **rest and pace itself**: it doesn’t compete on physical stamina, but on depth and mastery. Its wellbeing rests on sleeping and letting go before it is exhausted, and on choosing carefully who it gives its attention and effort to: learning to say yes or no when it matters (because not every invitation means it has to say yes).'
      ]
    },
    manifestor: {
      title: 'Manifestor',
      paragraphs: [
        'The most independent type, around **9% of the population**. It has at least one motor center (Heart, Solar plexus, Spleen) connected to the [Throat](center:throat), but an undefined [Sacral](center:sacral), so its energy is not constant: it comes in bursts, which it uses to initiate and set things in motion, and then it needs rest — quite a lot of rest.',
        'Its strategy is to **inform before acting**. This is not about asking permission, but about letting those its impact will reach know: doing so reduces the resistance and rejection it otherwise meets around it. Acting in line with its strategy brings it *peace*; failing to do so brings opposition and a growing *anger*.',
        'The Manifestor is here to **initiate and make an impact**, not to execute in a sustained way. Managing its energy means respecting its cycles of push and rest, and protecting its autonomy without isolating itself from the people around it.'
      ]
    },
    reflector: {
      title: 'Reflector',
      paragraphs: [
        'The rarest type: barely **1% of the population**. It has no defined center at all: its whole bodygraph is open. That makes it an extraordinarily sensitive mirror of the people and places around it, able to sense the health of a community.',
        'Because it constantly samples other people’s energy, **the environment and the company affect it enormously**: who it is with and where it is changes its experience profoundly. Its strategy is to **wait a lunar cycle** — about 28 days — before important decisions, letting the matter be seen from many angles before settling it.',
        'Its greatest care in managing energy is choosing environments well and not identifying with what it is merely reflecting. When it lives in alignment with its design, in the right place and with the right people, *surprise* and *delight* appear. If it doesn’t live in alignment, the symptom that shows up is *disappointment*.'
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
      title: 'Respond, then inform',
      paragraphs: [
        'The Manifesting Generator’s strategy, combining the two strategies of responding and informing. First of all, like any Generator, it responds — that is, it **waits for the sacral response**, the body’s yes or no to something concrete; it does not initiate from the mind.',
        'Once it has that response and is about to act, it **informs those who will be affected** before setting off. Because of its ability to manifest quickly, letting people know reduces friction with the environment and stops its speed from generating resistance. Skipping either of the two steps — responding and informing — is the usual source of its exhaustion.'
      ]
    },
    'inform-before-acting': {
      title: 'Inform before acting',
      paragraphs: [
        'The Manifestor’s strategy. Because its energy initiates and makes an impact without warning, the design asks it to **let the people it is going to affect know before setting off**. This is not about asking permission or justifying itself: it is simply communicating what it is about to do.',
        'The effect is very practical: informing dissolves much of the resistance it meets when it acts by surprise. In fact, informing can even bring it allies who smooth the way. Doing it brings peace to those around it; skipping it provokes the anger and opposition that, without it noticing, end up obstructing its own movement.'
      ]
    },
    'wait-for-invitation': {
      title: 'Wait for the invitation',
      paragraphs: [
        'The Projector’s strategy. For the important things — a job, a relationship, a big commitment — the design asks it to **wait to be recognized and invited** instead of offering itself unasked.',
        'This is not passivity: the Projector keeps living and preparing, but saves its wisdom for those who value it and ask for it. **The right invitation opens the door** for its gift to be well received; insisting without one usually brings resistance, bitterness and rejection. Recognition and success are the sign that the wait was worth it.'
      ]
    },
    'wait-lunar-cycle': {
      title: 'Wait a lunar cycle',
      paragraphs: [
        'The Reflector’s strategy. Before an important decision, the design asks it to **let a full lunar cycle pass** — about 28 days — instead of settling things all at once.',
        'During that time, the Reflector **talks it over, samples different environments and observes how its perception of the matter changes** day by day. Because its chart is completely open, it needs that journey to tell what is its own from what it is merely reflecting. Clarity comes by accumulation, by seeing the matter from different perspectives, not by impulse.'
      ]
    }
  },

  // ── Authority (the value "i") ────────────────────────────────────────────
  authority: {
    emotional: {
      title: 'Emotional authority',
      paragraphs: [
        'The most widespread authority. Whoever has it has a **defined [Solar plexus](center:solarPlexus)**, which works in waves: mood rises and falls over time, not because of the facts of the moment. The golden rule is clear: **there is no truth in the now**.',
        'To decide well, the design asks you to **wait until you have ridden out the emotional wave** — sleep on it, let time pass, come back to the matter in different moods — before committing. Clarity is not an instant flash, but what remains once the emotion has settled. Haste is its main enemy.'
      ]
    },
    sacral: {
      title: 'Sacral authority',
      paragraphs: [
        'The authority of most Generators. It lives in the **[Sacral center](center:sacral)**, which responds **in the moment** with a sound or a gut impulse — a kind of "uh-huh" of attraction or an "mm-mm" of rejection — to something concrete: the body *says* yes or no.',
        'It is an **immediate, bodily** authority: it doesn’t reason, it reacts. It works best with yes/no questions and clouds over when the mind tries to argue the decision. Learning to catch and trust that instant response from the belly is the central practice for whoever has it.'
      ]
    },
    splenic: {
      title: 'Splenic authority',
      paragraphs: [
        'It lives in the **[Spleen](center:spleen)**, the oldest center of awareness, tied to survival, health and instinct. It speaks **in the present and only once**: a sudden, quiet, spontaneous knowing, with no repetition and no argument.',
        'It is the most **subtle and fleeting** authority: it doesn’t insist or argue, so it is easy to overlook or to rationalize away afterwards. Whoever has it learns to **trust that first instinctive impulse** — that calm bodily "yes" or "no" — the instant it appears, because it usually doesn’t speak twice.'
      ]
    },
    ego: {
      title: 'Ego authority',
      paragraphs: [
        'It lives in the **[Heart center (Ego)](center:heart)**, the engine of willpower and desire. Here the right decision is recognized through an honest question: **do I really want this? what’s in it for me?** This is not selfishness, but honoring what you actually want.',
        'It is an authority of **will and impulse**, not of prolonged reflection. It works when the person listens to what they truly desire and is able to commit to it; it gets lost when they accept things out of duty or pressure that their heart doesn’t back.'
      ]
    },
    'self-projected': {
      title: 'Self-projected authority',
      paragraphs: [
        'Particular to certain Projectors. Truth arrives through the **voice**: by talking the matter through out loud, the person **hears themselves** and recognizes what is consistent with their identity and their direction.',
        'What matters is not the listener’s opinion, but the act of **expressing and hearing yourself**. So it helps to be surrounded by trusted people who let you talk without steering you, and to pay attention to the tone and the words that come out: the guidance is there, more than in the reasoning.'
      ]
    },
    mental: {
      title: 'Mental/environmental authority',
      paragraphs: [
        'Also called environmental authority or "sounding board", particular to some Projectors with no inner centers defined for deciding. There is no fixed inner bodily authority: clarity doesn’t arrive from within all at once, **clarity comes from dialogue**.',
        'The practice consists of **talking the matter through with trusted people and in the right environment**, not so they decide for you, but so you can hear yourself think out loud. The right place and company are part of the method here: the decision settles gradually, with time and conversation.'
      ]
    },
    lunar: {
      title: 'Lunar authority',
      paragraphs: [
        'The Reflector’s authority, the only type with no defined center at all. With no fixed inner source, the guide is **time**: a full lunar cycle, about 28 days, before important decisions.',
        'Over that cycle, the person **samples different states, environments and conversations**, and observes how their perception of the matter evolves. Clarity comes through **maturation** and an accumulation of perspectives, not through impulse: what still resonates after the whole cycle is what can be trusted.'
      ]
    }
  },

  // ── Profile (the six lines) ──────────────────────────────────────────────
  profile: {
    '1': {
      title: 'Line 1 — the foundation',
      paragraphs: [
        'The first line seeks **security through knowledge**. It needs to investigate, to understand the fundamentals and to know the ground beneath it is solid before acting; without that base, it feels uneasy.',
        'It is an **introspective, studious** energy: it goes deep until it feels expert, and that solidity reassures others. Its challenge is not to wait indefinitely to know "everything" before taking the step.'
      ]
    },
    '2': {
      title: 'Line 2 — natural talent',
      paragraphs: [
        'The second line has **natural gifts** it exercises almost effortlessly, often without being fully aware of them. It needs **time alone** for that talent to ripen at its own pace.',
        'Its dynamic is to be **called from outside**: others see in it something the person themselves can’t quite name, and invite them to bring it out. The balance lies between respecting its need for retreat and answering those calls when they are the right ones.'
      ]
    },
    '3': {
      title: 'Line 3 — trial and error',
      paragraphs: [
        'The third line learns **by trying**: through direct contact with life, through attempts, discoveries and stumbles too. Every "mistake" is information, not failure.',
        'It is an **experimental, resilient** energy: it discovers what works by ruling out what doesn’t. Its wisdom is very practical, and it is essential that it doesn’t read its stumbles as personal flaws, but as the very method it is designed to learn by.'
      ]
    },
    '4': {
      title: 'Line 4 — the network',
      paragraphs: [
        'The fourth line works through **bonds and community**. Opportunities — work, love, changes — usually reach it through people it already knows, not through strangers or cold outreach.',
        'It is a **warm, relational** energy that needs solidity in its attachments. Its classic practical advice is not to let go of one base — a job, a situation — until the next is secured through its network: transitions work better for it that way.'
      ]
    },
    '5': {
      title: 'Line 5 — projection',
      paragraphs: [
        'The fifth line lives under a **field of projection**: others place expectations on it, hoping for practical solutions. They do so because they see it as someone able to fix things, almost in the manner of a saviour.',
        'That gives it influence and a natural role of **useful leadership**, but it also exposes it and demands a lot: if it doesn’t deliver what was projected, the same force can turn against it. Its challenge is to manage its **reputation** well and to clarify others’ expectations as far as possible, taking care to promise only what it can genuinely deliver.'
      ]
    },
    '6': {
      title: 'Line 6 — the role model',
      paragraphs: [
        'The sixth line goes through **three life phases**: (1) until around the age of 30 it lives like a line 3, trying, stumbling and even collapsing; then (2) it lives a second stage in which it withdraws energetically to observe and process — the "on the roof" stage; and (3) from around 50 onwards it emerges as an **example and a point of reference**.',
        'Its underlying orientation is **objectivity and maturity**: it aspires to live by what it considers right and true, and to become a model for others. Understanding which phase it is in helps it not to judge itself: the observation of the middle stage is not disconnection, but preparation.'
      ]
    }
  },

  // ── Definition (the value "i") ───────────────────────────────────────────
  definition: {
    'no-definition': {
      title: 'No definition',
      paragraphs: [
        'Unique to the Reflector: **no center is defined**, the whole bodygraph stays open. There is no fixed energy of its own; instead, the person takes in, amplifies and reflects the energy of those around them.',
        'This makes them **extraordinarily sensitive to their environment**: who they are with and where they are changes their experience completely. Their wisdom is born precisely from that total openness, as long as they learn not to confuse what they are merely reflecting with what is their own.'
      ]
    },
    single: {
      title: 'Single definition',
      paragraphs: [
        'All the defined centers are **connected in a single block**. Energy flows internally without interruption, which gives a sense of **self-sufficiency**: the person has access to their own consistency without depending on others to "complete" them.',
        'Their challenge tends to be the opposite of the split definitions’: because they work well on their own, they can become self-absorbed or find it hard to open up to outside influence. Recognizing when it is worth stepping out of their own bubble is part of their learning.'
      ]
    },
    split: {
      title: 'Split definition',
      paragraphs: [
        'The defined centers form **two separate groups**, with no channel joining them internally. The person usually experiences a **search for connection**: something to bridge their two parts.',
        'That bridge often arrives through other people — whose energy completes the missing channel — or through planetary transits that activate the in-between gate. This split is not a lack: it is about understanding that there is company and there are environments that make them feel integrated, and that this happens naturally.'
      ]
    },
    'triple-split': {
      title: 'Triple split definition',
      paragraphs: [
        'The defined centers are spread across **three separate groups**. The internal wiring is more complex and the person often needs **more variety of stimulation and of people** to feel their inner parts connect.',
        'They usually do well in diverse environments and with a certain amount of movement; too much stillness can leave them feeling that something isn’t quite coming together. Knowing this structure helps them not to read that need for variety as scatteredness.'
      ]
    },
    'quad-split': {
      title: 'Quadruple split definition',
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
      title: 'Solar plexus',
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
      title: 'Personality (conscious)',
      paragraphs: [
        'The **Personality** column represents the **conscious** side: what the person recognizes as "me", their mind and their personality. It is calculated from the position of the planets at the **exact instant of birth**.',
        'It is the part of the chart you identify with and are usually aware of. On the bodygraph it is drawn in white.'
      ]
    },
    design: {
      title: 'Design (unconscious)',
      paragraphs: [
        'The **Design** column represents the **unconscious** side: the body, what is inherited, what operates without conscious control and what others usually see before you do. It is calculated about **88 days before birth** (88° of solar arc).',
        'It is the more bodily part, less accessible to the mind; it tends to express itself automatically. On the bodygraph it is drawn in red.'
      ]
    },
    weight: {
      title: 'Weight of the activation',
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
    1: { theme: 'creative expression', text: 'Gate 1 is the energy of **creating from one’s own identity**: an original expression that imitates no one. At its best it inspires others; in its shadow, it withdraws into melancholy when it can’t find a way out into the world.' },
    2: { theme: 'receptive direction', text: 'Gate 2 is **receptive direction**: knowing where to go without forcing it, letting the course emerge instead of imposing it. Its gift is a natural orientation that gives movement meaning; its shadow, feeling lost when it tries to steer by sheer will.' },
    3: { theme: 'order in the new', text: 'Gate 3 is the energy of **bringing order to the new**: starting something out of the chaos of the beginning, when there is no form yet. Its gift is knowing how to initiate and structure what is starting; its shadow, the frustration and the block when it wants to go faster than the process allows.' },
    4: { theme: 'mental answers', text: 'Gate 4 is the mind that **looks for answers and formulas** to open questions. Its gift is conceptualising logical solutions; its shadow, the pressure to have an answer already, mistaking a hypothesis for a certainty.' },
    5: { theme: 'fixed rhythms', text: 'Gate 5 is **fixed rhythms and habits**: the energy that sustains steady routines and a beat of its own. Its gift is the reliability of a natural rhythm that anchors the day; its shadow, the anxiety when that rhythm is broken.' },
    6: { theme: 'intimacy and friction', text: 'Gate 6 regulates **intimacy and emotional friction**: when to open and when to close, the boundary of the intimate. Its gift is an emotionality that creates deep closeness; its shadow, conflict and reactivity when that boundary is managed from the emotion of the moment.' },
    7: { theme: 'leadership and direction', text: 'Gate 7 is the **guiding role toward the future**: the capacity to give direction and to lead, often from the background. Its gift is a natural authority others want to follow; its shadow, the need to control the course or to impose itself.' },
    8: { theme: 'contribution', text: 'Gate 8 is **contribution**: bringing something of one’s own that makes a difference and giving voice to what matters. Its gift is an authentic expression that invites others to join; its shadow, contributing in search of recognition and being left empty.' },
    9: { theme: 'focus on detail', text: 'Gate 9 is the energy of **focus and concentration** on the details needed to carry something through. Its gift is a sustained attention that completes; its shadow, getting lost in the small or scattering.' },
    10: { theme: 'self-love', text: 'Gate 10 is **self-love and fidelity to oneself**: behaving in accordance with who one is. Its gift is an authenticity that doesn’t betray itself; its shadow, self-criticism or contorting oneself to fit in.' },
    11: { theme: 'ideas', text: 'Gate 11 is the mind **full of ideas** to share and to give meaning to experience. Its gift is a stimulating conceptual richness; its shadow, the pressure to turn every idea into action, when ideas are there to be shared rather than executed.' },
    12: { theme: 'cautious expression', text: 'Gate 12 is **cautious expression**: speaking when the mood and the moment are right. Its gift is a word that moves and touches at exactly the right instant; its shadow, speaking out of tune or staying silent out of reticence.' },
    13: { theme: 'listening', text: 'Gate 13 is **listening and memory**: gathering other people’s stories and secrets and giving them meaning. Its gift is an ear that invites trust and orients; its shadow, carrying what others deposit.' },
    14: { theme: 'power for resources', text: 'Gate 14 is the **energy to generate and direct resources**: the drive that gives power to one’s own work. Its gift is a generating force that prospers; its shadow, working without a why or without values to guide it.' },
    15: { theme: 'love of diversity', text: 'Gate 15 is the **love of humanity and its extremes**: an attraction to the diversity of rhythms and ways of living. Its gift is welcoming what is different and finding the right flow; its shadow, an erratic rhythm or judging other people’s pace.' },
    16: { theme: 'enthusiasm and skill', text: 'Gate 16 is **enthusiasm and skill**: the talent that is expressed and refined through practice. Its gift is a contagious enthusiasm and mastery; its shadow, empty enthusiasm with no depth or preparation.' },
    17: { theme: 'opinions', text: 'Gate 17 is the mind that **forms opinions** and anticipates in order to organize. Its gift is useful opinions that give structure; its shadow, presenting as facts what are only views.' },
    18: { theme: 'correction', text: 'Gate 18 is the instinct to **correct and improve** what has gone crooked. Its gift is a sharp eye that perfects and protects; its shadow, incessant criticism and perfectionism.' },
    19: { theme: 'sensitivity to needs', text: 'Gate 19 is **sensitivity to needs**: sensing what people and the community need, materially and emotionally too. Its gift is a fine attunement to what is missing; its shadow, excessive neediness or hypersensitivity.' },
    20: { theme: 'the now', text: 'Gate 20 is **the now**: awareness and expression of the present moment. Its gift is a spontaneous, on-target action in the instant; its shadow, busyness or speaking without presence.' },
    21: { theme: 'control', text: 'Gate 21 is the **will to control** one’s own resources and territory. Its gift is a legitimate authority over what is its own; its shadow, wanting to control everything or feeling controlled.' },
    22: { theme: 'grace', text: 'Gate 22 is **grace and emotional openness**: the social charm that knows how to listen and open up. Its gift is an emotionality that attracts and connects; its shadow, withdrawal when the mood isn’t there.' },
    23: { theme: 'assimilation', text: 'Gate 23 is **assimilation**: translating individual knowing into something simple and understandable. Its gift is making the complex clear, those "clicks" others get; its shadow, speaking at the wrong time and not being understood.' },
    24: { theme: 'rationalization', text: 'Gate 24 is the mind that **returns again and again to a thought** until it makes sense of it. Its gift is the revelation born of revisiting; its shadow, the obsessive loop there is no way out of.' },
    25: { theme: 'universal love', text: 'Gate 25 is **innocence and universal love**: a pure loving that expects nothing in return. Its gift is a clean, selfless devotion; its shadow, losing that innocence through wounding or through ego.' },
    26: { theme: 'persuasive transmission', text: 'Gate 26 is **persuasive transmission**: the will to communicate and add value, to "sell" an idea. Its gift is a power of conviction that moves people; its shadow, manipulation and half-truths.' },
    27: { theme: 'care', text: 'Gate 27 is **care and nourishment**: the energy of taking charge and supporting others. Its gift is a care that genuinely nourishes; its shadow, over-protecting or giving until exhausted.' },
    28: { theme: 'the search for meaning', text: 'Gate 28 is the **search for meaning**: the game of risking oneself for something worthwhile. Its gift is finding a purpose worth fighting for; its shadow, struggle for struggle’s sake and the fear of a meaningless life.' },
    29: { theme: 'commitment', text: 'Gate 29 is **commitment**: the energy to say yes and persevere to the end. Its gift is a devotion that delivers what it starts; its shadow, over-committing or saying yes where it shouldn’t have.' },
    30: { theme: 'desire', text: 'Gate 30 is **desire and longing**: the fire of expectation that drives one to live experiences. Its gift is a passion that fuels life; its shadow, being consumed by cravings that are never satisfied.' },
    31: { theme: 'leadership through the voice', text: 'Gate 31 is **leadership through the voice**: the influence of the one who speaks for a group and represents it. Its gift is a leadership others choose to follow; its shadow, leading without a real mandate or out of mere ambition.' },
    32: { theme: 'continuity', text: 'Gate 32 is the instinct for **continuity**: sniffing out what endures and what must be adapted to last. Its gift is an instinct for lasting value; its shadow, a fear of failure and of change that paralyses.' },
    33: { theme: 'retreat and the telling', text: 'Gate 33 is **retreat and the telling**: withdrawing in order to later recount what was lived. Its gift is a wisdom shared after reflection; its shadow, not honoring the need to withdraw, or telling too much or too little.' },
    34: { theme: 'power', text: 'Gate 34 is **raw power**: an independent force, always busy doing. Its gift is an enormous productive potency; its shadow, busyness for its own sake, setting off without having responded.' },
    35: { theme: 'hunger for experience', text: 'Gate 35 is the **hunger for experience and progress**: the drive to try everything and move forward. Its gift is an appetite for living that pushes onward; its shadow, the restlessness of never being satisfied.' },
    36: { theme: 'crisis and the new', text: 'Gate 36 is **emotional crisis and the new**: the swing that leads to unprecedented experiences. Its gift is growing through emotional intensity; its shadow, throwing itself into drama or crisis unprepared.' },
    37: { theme: 'friendship and agreements', text: 'Gate 37 is **friendship and community**: the warmth that unites through pacts and agreements. Its gift is an affection that creates family and belonging; its shadow, dependency or broken agreements.' },
    38: { theme: 'struggle with meaning', text: 'Gate 38 is the **struggle for what is worthwhile**: the tenacity to stand up for a cause. Its gift is a perseverance with purpose; its shadow, fighting for the sake of fighting, or stubbornness.' },
    39: { theme: 'provocation', text: 'Gate 39 is **provocation**: stirring other people’s emotion to bring out what really matters. Its gift is provoking in order to reveal spirit; its shadow, gratuitous provocation or moodiness.' },
    40: { theme: 'giving and rest', text: 'Gate 40 is **giving and solitude**: working and providing in order to then withdraw and recover. Its gift is a generosity that also knows how to rest; its shadow, overwork without pause, or refusing to give.' },
    41: { theme: 'the imagination that starts desire', text: 'Gate 41 is the **imagination that starts desire**: the beginning of every new experience, dreamt before it is lived. Its gift is a fantasy that opens new experiences; its shadow, an imagination disconnected from reality, or the pressure of an unsatisfied longing.' },
    42: { theme: 'completion', text: 'Gate 42 is **completion**: the energy to close cycles and carry things through to the end. Its gift is the ability to finish what was started; its shadow, starting without finishing, or the fear of endings.' },
    43: { theme: 'mental intuition', text: 'Gate 43 is **mental intuition**: an individual knowing that arrives as a flash, ahead of everyone else. Its gift is an original, revealing idea; its shadow, insisting on saying it at the wrong time and not being understood.' },
    44: { theme: 'the instinct for the past', text: 'Gate 44 is the **instinct that reads the past**: an alertness for recognizing patterns, people and opportunities. Its gift is a nose for people and timing; its shadow, the fear that the past will repeat itself.' },
    45: { theme: 'the voice of resources', text: 'Gate 45 is the **voice that gathers and distributes resources**: the "I have" of whoever administers what is shared. Its gift is a generous stewardship that looks after the group; its shadow, hoarding or a sense of entitlement.' },
    46: { theme: 'love of the body', text: 'Gate 46 is **love of the body and being well**: the determination to inhabit the body and to be in the right place. Its gift is a serendipity that puts one in the right spot at the right moment; its shadow, neglecting or forcing the body.' },
    47: { theme: 'mental realization', text: 'Gate 47 is **realization**: the mental pressure to make sense of confusion until the "aha" arrives. Its gift is resolving the confusing into clear understanding; its shadow, getting trapped in a sense of oppression or meaninglessness.' },
    48: { theme: 'depth', text: 'Gate 48 is **depth**: a well of talent and wisdom to draw solutions from. Its gift is a depth that supplies what is missing; its shadow, the fear of not being enough or not being ready.' },
    49: { theme: 'principles', text: 'Gate 49 is **principles and revolution**: accepting or rejecting according to deep values. Its gift is transforming bonds from clear principles; its shadow, rigid rejection or revolution without sensitivity.' },
    50: { theme: 'values', text: 'Gate 50 is **values and responsibility**: the guardianship of the norms that protect the group’s wellbeing. Its gift is a keeping of values that supports others; its shadow, over-responsibility and the fear of failing the group.' },
    51: { theme: 'impulse and shock', text: 'Gate 51 is the **impulse to be first**: the initiative that shakes and awakens. Its gift is a courage that wakes others up; its shadow, competitiveness or recklessness.' },
    52: { theme: 'stillness and focus', text: 'Gate 52 is **stillness and concentration**: the pressure to stop in order to focus and see the whole. Its gift is a calm that makes concentration possible; its shadow, inertia or the restlessness of not knowing how to be still.' },
    53: { theme: 'beginnings', text: 'Gate 53 is **beginnings**: the pressure and the energy to start new cycles. Its gift is the drive to get the new under way; its shadow, starting without pause and never completing.' },
    54: { theme: 'ambition', text: 'Gate 54 is **ambition**: the drive to rise, materially and spiritually. Its gift is an ambition that elevates; its shadow, chasing advancement for other people’s approval, or overstepping.' },
    55: { theme: 'abundance of spirit', text: 'Gate 55 is **spirit and emotional abundance**: the richness of moods and of faith. Its gift is an emotional depth and a faith that sustain; its shadow, letting melancholy or the swing of mood make the decisions.' },
    56: { theme: 'the stimulating story', text: 'Gate 56 is the **story that stimulates**: telling ideas and experiences that hook people. Its gift is a captivating narration that opens horizons; its shadow, embellishing too much, or wandering attention.' },
    57: { theme: 'intuition in the now', text: 'Gate 57 is **sharp intuition in the now**: an instinctive clarity that penetrates the present. Its gift is a subtle, unerring knowing in the instant; its shadow, a fear of the future that paralyses.' },
    58: { theme: 'vitality and improvement', text: 'Gate 58 is **vitality and the joy of living**: the energy that pushes to make things better. Its gift is a vital delight that fuels correction; its shadow, restlessness or criticism without joy.' },
    59: { theme: 'intimacy', text: 'Gate 59 is **intimacy**: the energy to break barriers and create a bond, sexual too. Its gift is the power to generate closeness and union; its shadow, putting up walls or intruding on intimacy.' },
    60: { theme: 'accepting the limit', text: 'Gate 60 is **accepting the limit**: turning restriction into the seed of the new. Its gift is transforming limits into possibility; its shadow, getting stuck in limitation and melancholy.' },
    61: { theme: 'inner truth', text: 'Gate 61 is **inner truth and mystery**: the pressure to know what cannot be fully known. Its gift is an inspiration that seeks the bottom of things; its shadow, the mental pressure of wanting to know it all.' },
    62: { theme: 'detail and order', text: 'Gate 62 is **detail and organization**: naming and ordering things in order to express them precisely. Its gift is a clear, orderly expression; its shadow, getting lost in detail or over-explaining.' },
    63: { theme: 'doubt', text: 'Gate 63 is **doubt**: the pressure that pushes to question and verify. Its gift is a healthy doubt that puts things to the test; its shadow, corrosive suspicion and anxiety.' },
    64: { theme: 'fertile confusion', text: 'Gate 64 is the **confusion that seeks meaning**: a pressure of unprocessed images striving to arrange themselves. Its gift is a richness of images that ends in understanding; its shadow, the overwhelm of trying to resolve the confusion too soon.' }
  },

  // ── Initial report (second person, addressed to the chart's owner) ───────
  report: {
    intro: {
      title: 'What Human Design is',
      paragraphs: [
        'Human Design is a self-knowledge system that combines astrology, the *I Ching*, the kabbalistic tree of life, the chakras and a little quantum-physics language. From your date, time and place of birth it generates a "chart" (the diagram, or [*bodygraph*](section:chart)) describing how your energy is designed: how you make good decisions, how you spend and recover energy, and how you best interact with the world. It is not considered science — worth saying plainly — but a symbolic framework; its value lies in whether you find it useful as a mirror, not in it being provable.'
      ]
    },
    ants: {
      title: 'The ant analogy',
      paragraphs: [
        'In a way, we can use ants as a simile: in an ant colony there is no "generic ant" — there are scouts that go out to explore, soldiers built to defend, workers that maintain the nest, and a queen whose function is something else entirely. None is better; each is made to operate in a different way, and the colony works precisely because they are not all the same. Asking a scout to do a soldier’s job is to exhaust it doing something it wasn’t designed for.',
        'Something similar happens with people: we have different ways of acting and relating depending on our own energy and design. The usual mistake is to assume we should all perform, decide or get started in the same way. Human Design proposes the opposite, and it calls those different ways [types](section:type). The valuable thing about the framework is exactly that shift in view: **stop measuring yourself by another design’s yardstick**.'
      ]
    },
    chart: {
      title: 'The bodygraph',
      paragraphs: [
        'Your chart is drawn on a diagram of the body called the **bodygraph**: the nine geometric shapes are the centers and the lines connecting them are the channels, which run from one gate to another (there are 64 gates). Each center governs a specific function and, together, they map how your energy flows.',
        'What makes your chart unique is which of those centers, channels and gates are active: the colored centers are defined and the ones that look empty are open. Your type, your authority and your way of functioning all come out of that combination, and that is what we will unpack next.'
      ]
    },
    conditioning: {
      title: 'Defined, undefined and conditioning',
      paragraphs: [
        'A defined center works in a fixed, reliable way: it is an energy of yours, constant, that you always contribute and that doesn’t depend on who is beside you. An undefined (open) center is not a flaw: it is an area where you don’t have that fixed energy and where, instead, you absorb and amplify other people’s and the environment’s.',
        'Human Design calls everything that pulls us away from living according to our design **conditioning**: the layers we accumulate — through upbringing, culture, fears or what is expected of us — that lead us to act as we are not. Your open centers are the main entry point for that conditioning. Recognizing it is the first step of the [deconditioning](section:experiment) we mentioned earlier: gradually letting go of what is borrowed in order to come back to yourself, paying particular attention to no longer comparing yourself with how other people and other designs work.'
      ]
    },
    experiment: {
      title: 'Human Design as a life experiment',
      paragraphs: [
        'Human Design isn’t necessarily presented as a truth to believe blindly, but as an **experiment to try**: rather than adopting it as dogma, the proposal is that you live according to your design and observe, in your own life, whether things flow better.',
        'The experiment is easy to state (even if it takes time to put into practice): **make your decisions according to [your strategy](section:strategy) and [your authority](section:authority)** — the two tools you’ll see further on — instead of being carried along by what is expected of you, by haste, by your head, or by the mechanisms and patterns you have been applying all your life. Little by little, this returns you to your natural way of functioning. That process is called **deconditioning**, and it is, at bottom, what everything else is about.'
      ]
    },
    collective: {
      title: 'Your place in the collective',
      intro:
        'As in [the ant simile](section:intro), the Human Design types describe **the different ways of being designed to use energy**. None is better, and the whole works precisely because we are not all the same. Just as the colony works because every role exists, the human collective needs all the different kinds of person.',
      bullets: [
        '**Generators (~37%) and Manifesting Generators (~33%)**: together they are close to 70% of the population. They are the builders, with sustained life-force energy when they do what genuinely lights them up. They are the engine that moves the human world.',
        '**Projectors (~20%)**: they don’t have that constant energy; their gift is to see, guide and direct others. They shine when they are recognized and invited, not by forcing themselves to a Generator’s pace.',
        '**Manifestors (~9%)**: they are the initiators, able to start things from nothing and make an impact without waiting for anyone. Their key is informing those their action splashes onto, and managing their inconstant energy.',
        '**Reflectors (~1%)**: the rarest, a mirror of their surroundings that samples the health of the group and of the place they live in.'
      ],
      outro:
        'The most common mistake is measuring yourself against someone else’s design: a Projector demanding a Generator’s stamina of themselves, or a Generator getting frustrated for not initiating like a Manifestor.'
    },
    leadIn: {
      strategy: 'Your strategy is your natural, ideal way of acting and committing to things without forcing them.',
      authority: 'Your authority is your correct way of making life decisions, in accordance with your design and not against it. If strategy tells you *how and when to act*, **authority tells you how and when to decide** each yes and each no. The mind is there to inform you, to navigate decisions already made and to advise others, but **the mind is not to be trusted for deciding** about your own life: decisions should be made from a more bodily, more reliable source. That is *authority*.',
      definition: 'Definition describes how your defined centers group together: whether they form a single block or several separate groups.',
      practice: 'If you had to keep just one thing from all of Human Design, let it be this: **living your design is, above all, taking action according to [your strategy](section:strategy) and deciding from [your authority](section:authority)**. Everything else nuances and fine-tunes; but these two are what really changes your day-to-day life.',
      centers: 'The nine centers in your chart:'
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
        'You are the most independent type, around **9% of the population**. You have at least one motor center (Heart, Solar plexus, Spleen) connected to the [Throat](center:throat), but an undefined [Sacral](center:sacral), so your energy is not constant: it comes in bursts, which you use to initiate and set things in motion, and then you need rest — quite a lot of rest.',
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
        'You have a **defined [Solar plexus](center:solarPlexus)**, which works in waves: your mood rises and falls over time, not because of the facts of the moment. Your golden rule is clear: **there is no truth in the now**.',
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
        '**Managing your energy** — You have a defined [Sacral center](center:sacral): a **sustainable, renewable** working energy, made to be spent fully each day on the right things and healthily emptied by nightfall. The key is not to save it, but to **spend it on what your body genuinely responds to**: then the tiredness is satisfying and the next day the charge comes back. Forcing yourself into what doesn’t light you up drains you without filling you.',
      trampa:
        '**Your type’s trap** — Your greatest wear comes from **initiating from the mind** instead of waiting for something to respond to: saying yes out of obligation, out of logic, or out of fear of missing the opportunity. When you get into something your energy hadn’t backed, frustration appears — the classic signal of a Generator living against their design — along with the feeling of being stuck in things that never quite fulfill.',
      senales:
        '**Signs that you are on the right track** — Your compass is **satisfaction versus frustration**. If at the end of the day you feel a good tiredness and the sense of having spent your energy well, you are on track. If what dominates is frustration and weariness, it usually signals that you committed to things your body hadn’t said yes to.'
    },
    'manifesting-generator': {
      energia:
        '**Managing your energy** — As a Generator, you have a defined [Sacral](center:sacral): a **sustainable, renewable** working energy. But it is connected to the [Throat](center:throat), which makes you **fast, many-sided and non-linear**: you skip steps, do several things at once and move at great speed when something genuinely lights you up. You perform at your best if you first wait for your **body’s response** and then **inform** those around you before setting off.',
      trampa:
        '**Your type’s trap** — **Scattering yourself**: committing to too many things your body hadn’t said yes to, or skipping the heads-up to others and running into their resistance. When you initiate from the mind instead of responding, you accumulate frustration — and often some anger — and half-finished projects.',
      senales:
        '**Signs that you are on the right track** — **Satisfaction**, and a certain peace around you, versus frustration and anger. If you move fast on what lights you up and leave things finished, you are on track; if you feel scattered and surrounded by friction, it usually means you said yes where the body wasn’t on board, or that you didn’t inform.'
    },
    projector: {
      energia:
        '**Managing your energy** — You don’t have a defined [Sacral](center:sacral), so **you are not designed for constant work** nor to sustain a Generator’s pace: your energy is irregular and runs out sooner. Nor are you designed to initiate from scratch — unlike the Manifestor, you have no motor connected to the [Throat](center:throat). That is why your gift lies neither in stamina nor in initiation; your gift is to **see, guide and direct** where you are invited. Managing yourself well means **resting and pacing yourself** — sleeping and letting go before you are exhausted — and saving your attention for those who genuinely value it: **knowing when to say yes and when to say no**.',
      trampa:
        '**Your type’s trap** — **Forcing yourself to other people’s pace** and **offering your vision and effort unasked**. Working to exhaustion to prove your worth, or insisting without being invited, brings resistance, rejection and bitterness — the signal of a Projector living against their design.',
      senales:
        '**Signs that you are on the right track** — **Recognition and success** versus bitterness. When you are seen, invited, and your vision is well received, you are on track; when you feel invisible, exhausted and resentful, it usually signals that you are offering yourself where you weren’t called, or demanding of yourself an energy you don’t have.'
    },
    manifestor: {
      energia:
        '**Managing your energy** — You have a motor connected to the [Throat](center:throat) but an undefined [Sacral](center:sacral): your energy is **not constant, it comes in bursts** to initiate and set things in motion, and then it needs rest. You are made to **start things and make an impact**, not to execute in a sustained way. Managing yourself well means respecting those cycles of push and rest (sometimes quite a lot of rest), and protecting your autonomy without isolating yourself.',
      trampa:
        '**Your type’s trap** — Acting by surprise **without informing** those your impact will reach: that provokes resistance, opposition and anger around you, which ends up making things harder for you. The other big trap is **demanding of yourself a consistency** that isn’t yours, to the point of burning out, without accepting your great need for rest.',
      senales:
        '**Signs that you are on the right track** — **Peace** versus anger. When you inform and move freely, you find calm around you; when everything fills with resistance and conflict, it usually signals that you acted without warning or that you are forcing a continuous pace that isn’t yours.'
    },
    reflector: {
      energia:
        '**Managing your energy** — You have **no defined center**: you constantly sample the energy of people and places, so **the environment affects you enormously** and your energy varies a great deal from one day to the next. The most important thing for you is to **choose well where you are and who you are with**, and not to demand of yourself a consistency that isn’t native to your design. For important decisions, give yourself a **lunar cycle** — about 28 days — before settling them.',
      trampa:
        '**Your type’s trap** — Deciding in a hurry, staying in environments that don’t suit you, and **identifying with what you are merely reflecting**: taking as your own the moods or pressures that actually belong to the group. **Forcing yourself to always be the same** goes against your changing nature.',
      senales:
        '**Signs that you are on the right track** — **Surprise and delight** versus disappointment. When the environments and the company are right, life surprises you pleasantly; when disappointment dominates, it usually signals that you are in the wrong place or with the wrong people, or that you decided too quickly.'
    }
  },

  // ── I Ching hexagram names ──────────────────────────────────────────────
  // LEGAL: these are OWN plain-sense renderings of the King Wen hexagram names,
  // deliberately NOT the Wilhelm/Baynes English (still under copyright). Where a
  // hexagram is conventionally rendered several ways, the wording chosen here is
  // descriptive of the classical Chinese title rather than a translation of any
  // one edition. Same rule as the Spanish list, which follows Wilhelm/Vogelmann.
  iching: {
    1: 'The creative force',
    2: 'The receptive field',
    3: 'Difficulty at the start',
    4: 'Inexperience',
    5: 'Waiting',
    6: 'Conflict',
    7: 'The army',
    8: 'Holding together',
    9: 'Taming by the small',
    10: 'Treading',
    11: 'Peace',
    12: 'Standstill',
    13: 'Fellowship',
    14: 'Great holdings',
    15: 'Modesty',
    16: 'Enthusiasm',
    17: 'Following',
    18: 'Repairing what was spoiled',
    19: 'Drawing near',
    20: 'Contemplation',
    21: 'Biting through',
    22: 'Grace',
    23: 'Falling apart',
    24: 'The return',
    25: 'Innocence',
    26: 'Taming by the great',
    27: 'Nourishment',
    28: 'Excess of the great',
    29: 'The abyss (water)',
    30: 'The clinging (fire)',
    31: 'Influence',
    32: 'Duration',
    33: 'Retreat',
    34: 'The power of the great',
    35: 'Progress',
    36: 'The darkening of the light',
    37: 'The family',
    38: 'Opposition',
    39: 'Obstruction',
    40: 'Release',
    41: 'Decrease',
    42: 'Increase',
    43: 'Breakthrough',
    44: 'Coming to meet',
    45: 'Gathering together',
    46: 'Pushing upward',
    47: 'Oppression',
    48: 'The well',
    49: 'Revolution',
    50: 'The cauldron',
    51: 'The arousing (shock)',
    52: 'Keeping still (the mountain)',
    53: 'Gradual development',
    54: 'The marrying maiden',
    55: 'Abundance',
    56: 'The wanderer',
    57: 'The gentle (wind)',
    58: 'The joyous (lake)',
    59: 'Dispersion',
    60: 'Limitation',
    61: 'Inner truth',
    62: 'Excess of the small',
    63: 'After completion',
    64: 'Before completion'
  },

  // ── The 36 channels: own-voice name + essence ───────────────────────────
  channel: {
    '1-8': { name: 'channel of inspiration', essence: 'the creativity of one’s own identity, which needs a voice in order to inspire others by being a role model.' },
    '2-14': { name: 'channel of the beat', essence: 'an inner direction that orients where to aim one’s life force and resources.' },
    '3-60': { name: 'channel of mutation', essence: 'the pulse of change, turning limitation into the beginning of something new.' },
    '4-63': { name: 'channel of logic', essence: 'the mind that starts from doubt to look for answers and formulas that resolve it.' },
    '5-15': { name: 'channel of rhythm', essence: 'a natural rhythm of one’s own that, open to diversity, tunes in to the flow of life.' },
    '6-59': { name: 'channel of intimacy', essence: 'the energy of breaking barriers and creating a bond, managing when to open up and when to close.' },
    '7-31': { name: 'channel of leadership', essence: 'the guiding role that gives direction to the future and finds the voice to lead a group.' },
    '9-52': { name: 'channel of concentration', essence: 'the stillness that allows energy to be focused on detail until something is carried through.' },
    '10-20': { name: 'channel of awakening', essence: 'self-love expressed in the present, being true to oneself here and now.' },
    '10-34': { name: 'channel of exploration', essence: 'the strength to act on one’s own convictions, being true to oneself.' },
    '10-57': { name: 'channel of survival', essence: 'intuition in the service of wellbeing and of the right way to inhabit the body.' },
    '11-56': { name: 'channel of curiosity', essence: 'the mind full of ideas that seeks to tell them as stories that stimulate and give meaning.' },
    '12-22': { name: 'channel of openness', essence: 'the emotional expression that opens up and moves people when the mood and the moment are right.' },
    '13-33': { name: 'channel of the prodigal', essence: 'gathering what has been lived and, after retreat, sharing it as a witness for others.' },
    '16-48': { name: 'channel of talent', essence: 'the deep talent that, with enthusiasm and practice, ripens into mastery.' },
    '17-62': { name: 'channel of acceptance', essence: 'opinions that arrange themselves into data and detail in order to organize and anticipate.' },
    '18-58': { name: 'channel of judgement', essence: 'the vitality that pushes to correct and perfect what has gone crooked.' },
    '19-49': { name: 'channel of synthesis', essence: 'the sensitivity to needs that decides bonds from deep principles.' },
    '20-34': { name: 'channel of charisma', essence: 'power that turns into action in the present, thinking and doing without delay.' },
    '20-57': { name: 'channel of the brain wave', essence: 'the sharp intuition that catches and voices the sure knowing of the instant.' },
    '21-45': { name: 'channel of money', essence: 'the will to control resources and the voice that administers them for the group.' },
    '23-43': { name: 'channel of structuring', essence: 'individual knowing translated into clear ideas others can understand.' },
    '24-61': { name: 'channel of awareness', essence: 'the pressure to know the mystery, turning it over until it reveals its meaning.' },
    '25-51': { name: 'channel of initiation', essence: 'the impulse that initiates and shakes, moved by a pure love that awakens the spirit.' },
    '26-44': { name: 'channel of surrender', essence: 'the instinct that reads the past and transmits it with the power to convince.' },
    '27-50': { name: 'channel of preservation', essence: 'the care that sustains others, guided by the values that protect the group.' },
    '28-38': { name: 'channel of struggle', essence: 'the tenacity to fight and take risks for a life worth living.' },
    '29-46': { name: 'channel of discovery', essence: 'committed devotion that, put into the body, thrives where others fail.' },
    '30-41': { name: 'channel of recognition', essence: 'the imagination and longing that kindle the desire to live new experiences.' },
    '32-54': { name: 'channel of transformation', essence: 'the ambition to rise, guided by an instinct for what endures.' },
    '34-57': { name: 'channel of power', essence: 'raw strength in the service of instinct, a power that is presence in the moment.' },
    '35-36': { name: 'channel of transience', essence: 'the hunger for experience that, through emotional ups and downs, pushes to try everything and move on.' },
    '37-40': { name: 'channel of community', essence: 'the warmth that creates community through agreements, giving of itself and knowing when to withdraw and recover.' },
    '39-55': { name: 'channel of emotion', essence: 'the provocation that stirs the mood and its abundance in order to bring spirit to the surface.' },
    '42-53': { name: 'channel of maturation', essence: 'the energy of cycles: starting and carrying through to the end in order to mature with experience.' },
    '47-64': { name: 'channel of abstraction', essence: 'the pressure of confused images striving to arrange themselves until understanding arrives.' }
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
      heading: 'The five types in the human collective',
      items: {
        generator: { label: 'Generator', note: 'builds with sustained energy', pct: '~37%' },
        'manifesting-generator': { label: 'Manifesting Generator', note: 'builds fast and many-sided', pct: '~33%' },
        projector: { label: 'Projector', note: 'sees, guides and directs others’ energy', pct: '~20%' },
        manifestor: { label: 'Manifestor', note: 'initiates and makes an impact independently', pct: '~9%' },
        reflector: { label: 'Reflector', note: 'reflects and samples the environment', pct: '~1%' }
      }
    },
    strategy: {
      heading: 'The five strategies',
      items: {
        respond: { label: 'Respond', note: 'the Generator’s' },
        'respond-then-inform': { label: 'Respond, then inform', note: 'the Manifesting Generator’s' },
        'inform-before-acting': { label: 'Inform before acting', note: 'the Manifestor’s' },
        'wait-for-invitation': { label: 'Wait for the invitation', note: 'the Projector’s' },
        'wait-lunar-cycle': { label: 'Wait a lunar cycle', note: 'the Reflector’s' }
      }
    },
    authority: {
      heading: 'The seven authorities',
      items: {
        emotional: { label: 'Emotional', note: 'clarity over time, riding out the emotional wave' },
        sacral: { label: 'Sacral', note: 'the gut yes or no of the moment' },
        splenic: { label: 'Splenic', note: 'the instinct that speaks only once' },
        ego: { label: 'Ego', note: 'what you genuinely want' },
        'self-projected': { label: 'Self-projected', note: 'hearing yourself speak out loud to recognize yourself' },
        mental: { label: 'Mental/environmental', note: 'the clarity that comes from dialogue' },
        lunar: { label: 'Lunar', note: 'a lunar cycle of perspective' }
      }
    },
    definition: {
      heading: 'The five definitions',
      items: {
        'no-definition': { label: 'No definition', note: 'no center defined (Reflector)' },
        single: { label: 'Single', note: 'everything connected in one block' },
        split: { label: 'Split', note: 'two separate groups' },
        'triple-split': { label: 'Triple split', note: 'three separate groups' },
        'quad-split': { label: 'Quadruple split', note: 'four separate groups' }
      }
    },
    profile: {
      heading: 'The six lines',
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
