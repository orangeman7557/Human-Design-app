// Spanish content for HD elements — Phase 6.A (pilot) + 6.B (core content).
//
// Own wording only: mechanical facts of the system plus public-domain roots
// (classic I Ching, general chakra/astrology concepts), never copied from
// Jovian Archive. One module per language so the app is multi-language ready
// (see ./index.js).
//
// Two content levels, mirrored in the UI:
//   - `concept`: what a whole category is (the card/cajetín "i" — what is a
//     Type, a Strategy, an Authority, a Profile, a Definition, the Centres).
//   - the per-element kinds (`type`, `strategy`, `authority`, `profile`,
//     `definition`, `center`): the concrete element (the chip/value "i").
//
// Bold (**…**) marks the most relevant idea, roughly once per one or two
// paragraphs (rendered by ElementInfo). Tone: informative, practical, with
// extra weight on energy management and decision-making, and an introspective,
// self-discovery angle for readers new to Human Design.

export default {
  // ── Concept level (the card / cajetín "i"): what each category is. ──
  concept: {
    type: {
      title: 'Los tipos',
      paragraphs: [
        'El **tipo** es la primera y más importante distinción de tu carta: describe cómo está diseñada tu energía para interactuar con el mundo. Hay cinco —[Generador](type:generator), [Generador Manifestante](type:manifesting-generator), [Proyector](type:projector), [Manifestador](type:manifestor) y [Reflector](type:reflector)— y se determinan por qué centros están definidos y cómo se conectan con la [Garganta](center:throat).',
        'Conocer el tipo importa sobre todo por una razón práctica: cada uno tiene una forma propia y sana de **gestionar su energía y tomar decisiones**. Vivir según el diseño propio —en lugar de imitar a otros tipos— es lo que el sistema asocia con menos resistencia y desgaste.',
        'No es una etiqueta de personalidad ni un horóscopo, sino una descripción mecánica de cómo funciona tu energía. El valor está en usarlo como espejo: observar si tu manera de moverte por la vida coincide con la que tu carta sugiere.'
      ]
    },
    strategy: {
      title: 'La estrategia',
      paragraphs: [
        'La **estrategia** es la forma correcta en que cada tipo debe actuar para vivir alineado. Responde a una pregunta muy concreta: ¿cómo me comprometo con algo —un trabajo, una relación, una decisión— sin forzar la situación? Cada tipo tiene la suya.',
        'Las cinco son: el Generador *responde* a lo que la vida le presenta; el Generador Manifestante *responde y luego informa*; el Manifestador *informa antes de actuar*; el Proyector *espera la invitación*; y el Reflector *espera un ciclo lunar*. Todas comparten una misma idea: **dejar de iniciar desde la mente** y confiar en la señal del propio cuerpo y de la vida, nunca decidir desde la mente.',
        '**Seguir la estrategia es, en la práctica, el experimento central del Diseño Humano**. El sistema sugiere observar la diferencia entre las decisiones tomadas a favor de la estrategia y las tomadas en contra, y usar esa experiencia —no la teoría— como guía.'
      ]
    },
    authority: {
      title: 'La autoridad',
      paragraphs: [
        'La **autoridad** indica desde dónde tomar una decisión de forma fiable: qué parte de ti tiene la última palabra. En Diseño Humano la mente sirve para procesar información y aconsejar a otros, pero **no es de fiar para decidir sobre la propia vida**; la autoridad nace siempre de una fuente más corporal.',
        'Hay siete: emocional (Plexo solar), sacral, esplénica (Bazo), del ego (Corazón), autoproyectada (G), mental/ambiental y lunar. Se determinan por jerarquía según los centros definidos. Algunas operan **en el momento** (la sacral y la esplénica) y otras necesitan **tiempo** (la emocional, que pide esperar a recorrer la onda emocional antes de tener claridad).',
        'La autoridad es la herramienta más práctica de la carta: convierte la estrategia en un método concreto de decisión cotidiana. Antes de un sí o un no importante, indica a qué señal interna conviene atender.'
      ]
    },
    profile: {
      title: 'El perfil',
      paragraphs: [
        'El **perfil** describe el "cómo" de tu camino: el estilo con el que aprendes, te relacionas y cumples tu propósito. Se compone de dos números (por ejemplo 3/5), tomados de las líneas 1 a 6 del I Ching: la primera viene de tu Sol/Tierra de *personalidad* y la segunda, de tu Sol/Tierra de *diseño*.',
        'Cada línea aporta un matiz: 1- cimiento e investigación, 2- talento natural, 3- ensayo y error, 4- vínculos y red, 5- proyección y liderazgo práctico, 6- ejemplo y madurez. La combinación de las **dos líneas** describe una manera reconocible de moverse por la vida —más interna o más relacional, más experimental o más sólida.',
        'Mientras el tipo y la autoridad responden a *cómo decidir*, el perfil responde a *cómo se despliega tu experiencia*. Es una de las capas más reveladoras para el autoconocimiento, porque suele describir patrones que ya reconoces en tu historia. De los dos números/líneas, el primero se vive de manera más consciente, y el segundo, más inconsciente. La línea inconsciente resulta, en general, más visible para los demás que para uno mismo.'
      ]
    },
    definition: {
      title: 'La definición',
      paragraphs: [
        'La **definición** describe cómo están conectados entre sí tus centros definidos: si forman un único bloque de energía o varios grupos separados. Habla de la consistencia interna —qué partes de ti están siempre "encendidas" y enlazadas— y de cómo se integra esa energía.',
        'Las variantes son: sin definición ([Reflector](type:reflector), ningún centro definido), única (todo conectado en un grupo), split (dos grupos), triple split (tres) y cuádruple split (cuatro). Una definición única tiende a sentirse **autosuficiente**; las divididas suelen experimentar una **búsqueda de conexión**, a menudo a través de otras personas o de puertas concretas que tienden el puente entre los grupos.',
        'En la práctica, la definición ayuda a entender qué tipo de compañía o entornos te completan. No es mejor ni peor tener más o menos divisiones: cada una describe una forma distinta de funcionar y de relacionarte.'
      ]
    },
    center: {
      title: 'Los centros',
      paragraphs: [
        'Los **centros** son los nueve focos de energía del bodygraph, cada uno ligado a una función concreta —pensar, comunicar, sentir, intuir, querer, actuar—. Heredan la idea de los chakras, pero aquí lo decisivo es si cada centro está **definido** o **indefinido** (abierto).',
        'Un centro **definido** funciona de forma fija y fiable: es una energía consistente que aportas siempre, tuya y constante. Un centro **indefinido** no es un defecto: es una zona abierta donde recibes y amplificas la energía de los demás y del entorno; es donde más aprendes, pero también donde es fácil dejarse condicionar y confundir lo ajeno con lo propio.',
        'Mirar tus centros es una de las claves más prácticas para la **gestión de la energía**: los definidos marcan lo que ofreces de manera estable, y los indefinidos, dónde conviene no tomar decisiones desde una presión prestada. En tu carta, los centros coloreados están definidos y los que se ven vacíos están abiertos.'
      ]
    },
    channel: {
      title: 'Los canales',
      paragraphs: [
        'Los **canales** son las 36 conexiones del bodygraph: cada uno une dos puertas situadas en centros distintos. Un canal **completo** —con sus dos puertas activas— enlaza esos dos centros, los define y crea una corriente de energía estable y fiable entre ellos.',
        'Los canales son los que, en conjunto, determinan tu **tipo, tu definición y qué centros están definidos**. Por eso son la columna vertebral mecánica de la carta: no describen un rasgo aislado, sino una forma constante en que dos áreas de tu energía trabajan juntas.',
        'Cada canal combina los temas de sus dos puertas (y de sus hexagramas del I Ching). Para una lectura detallada de un canal concreto, puedes utilizar la opción de "saber más usando IA".'
      ]
    },
    gate: {
      title: 'Las puertas',
      paragraphs: [
        'Las **puertas** son las 64 activaciones posibles del bodygraph, una por cada hexagrama del I Ching. Cada puerta vive en un centro concreto y aporta un matiz específico de energía o carácter; al nacer, tus planetas "encienden" un conjunto de ellas.',
        'Una puerta activa que no encuentra a su pareja —la del otro extremo de su canal— queda **colgante**: aporta su tema pero busca completarse, a menudo a través de otra persona que tenga la puerta complementaria. Cuando las dos puertas de un canal están activas, el canal se forma y define sus dos centros.',
        'Para profundizar en una puerta concreta —su matiz, su hexagrama del I Ching y cómo se vive— puedes utilizar la opción de "saber más usando IA".'
      ]
    },
    activation: {
      title: 'Las activaciones',
      paragraphs: [
        'Las **activaciones** son las posiciones de los planetas en tu nacimiento, traducidas a puertas y líneas del Diseño Humano. Cada cuerpo "enciende" una puerta concreta (y su línea), y el conjunto de todas ellas es lo que construye tu carta: centros, canales, tipo, autoridad y perfil.',
        'Se calculan en **dos momentos**, de ahí las dos columnas: *Personality* usa la posición en el instante del nacimiento (lo consciente); *Design* usa la de unos 88 días antes —88° de arco solar— (lo inconsciente). Por eso tienes dos activaciones por planeta.',
        'Cada activación se escribe como **puerta.línea**: la puerta (de la 1 a la 64) y, dentro de ella, la línea (de la 1 a la 6). Por ejemplo, un **30.3 en el Sol** quiere decir que el Sol activa la **puerta 30 en su línea 3** —el tema de la puerta 30 leído con el matiz que aporta la línea 3—. Es la unidad básica con la que se construye toda la carta.',
        'No todas pesan igual: el **Sol y la Tierra** concentran la mayor parte del significado y el resto matiza; la columna *Peso* resume esa influencia relativa. Toca una activación para abrir la puerta correspondiente. Y para ver las líneas, consulta las posibles líneas en el [perfil](concept:profile).'
      ]
    }
  },

  // ── Type (the chip "i"): each concrete type. ──
  type: {
    generator: {
      title: 'Generator',
      paragraphs: [
        'Tipo mayoritario: alrededor del **37 % de la población**. Su rasgo definitorio es el [centro Sacral](center:sacral) definido, la fuente de energía vital del sistema, generativa y de carácter renovable.',
        'Opera por respuesta: **reacciona a lo que la vida le presenta** en lugar de iniciar desde la mente. Comprometer su energía con lo correcto produce satisfacción; forzarla donde no corresponde, frustración.',
        'En la práctica, el Sacral responde antes que la mente: ante algo concreto —una propuesta, una pregunta, una situación— surge una reacción visceral de atracción o rechazo. **Seguir esa señal del cuerpo**, en vez de razonar la decisión, es lo que mantiene su energía bien empleada.'
      ]
    },
    'manifesting-generator': {
      title: 'Manifesting Generator',
      paragraphs: [
        'Una variante del [Generador](type:generator) —los Manifesting Generators suponen un 33 % de la población, y junto al resto de Generadores, cerca del 70 %—: un MG tiene el [Sacral](center:sacral) definido, y además, tiene el Sacral conectado, directa o indirectamente, con la [Garganta](center:throat). Eso le da la energía generadora del Generador y también capacidad de manifestar y materializar con rapidez.',
        'Su estrategia es **responder y luego informar**: primero espera la respuesta sacral —el sí o el no del cuerpo— y, una vez lo tiene, avisa a quienes se verán afectados antes de lanzarse. Tiende a ser polifacético, veloz y no lineal: salta pasos, hace varias cosas a la vez y a veces tiene que volver atrás a rematar lo que se saltó.',
        'La clave para gestionar su energía es no dispersarse iniciando sin respuesta: cuando se compromete con lo que de verdad le enciende, avanza muy rápido; cuando fuerza por mente, acumula frustración y trabajo a medias.'
      ]
    },
    projector: {
      title: 'Projector',
      paragraphs: [
        'Cerca del **20 % de la población**. No tiene el [Sacral](center:sacral) definido, así que **no está diseñado para un trabajo constante** ni para sostener la misma energía que un [Generador](type:generator). Su don es otro: ver a los demás con enorme profundidad y saber guiar y orientar la energía ajena.',
        'Su estrategia es **esperar la invitación** para lo importante —el trabajo, el amor, el lugar donde vivir—. El Proyector necesita ser reconocido e invitado para que su sabiduría sea bien recibida; cuando se ofrece sin que se lo pidan, suele encontrar resistencia. Reconocimiento y éxito, frente a amargura, marcan si va por buen camino.',
        'En la gestión de la energía, su tarea es **descansar y dosificarse**: no compite en resistencia física, sino en penetración y maestría. Dormir y soltar antes de quedar agotado, y elegir bien a quién entregar su atención, es lo que sostiene su bienestar.'
      ]
    },
    manifestor: {
      title: 'Manifestor',
      paragraphs: [
        'Alrededor del **9 % de la población**, es el tipo más independiente. Tiene un centro motor conectado a la [Garganta](center:throat), pero **el [Sacral](center:sacral) no está definido**, así que su energía no es constante: llega a impulsos, para iniciar y poner cosas en marcha, y luego necesita reposo.',
        'Su estrategia es **informar antes de actuar**. No se trata de pedir permiso, sino de avisar a quienes su impacto va a alcanzar: al hacerlo, reduce la resistencia y el rechazo que de otro modo encuentra a su alrededor. Hacerlo bien trae paz; no hacerlo, enfado y oposición.',
        'El Manifestador está aquí para **iniciar e impactar**, no para ejecutar de forma sostenida. Gestionar su energía pasa por respetar sus ciclos de empuje y descanso, y por proteger su autonomía sin aislarse de quienes le rodean.'
      ]
    },
    reflector: {
      title: 'Reflector',
      paragraphs: [
        'El tipo más raro: apenas el **1 % de la población**. No tiene **ningún centro definido**: todo su bodygraph está abierto. Eso lo convierte en un espejo extraordinariamente sensible de la gente y los lugares que lo rodean, capaz de percibir la salud de una comunidad.',
        'Como muestrea constantemente la energía ajena, **el entorno y las compañías le afectan muchísimo**: con quién y dónde está cambia profundamente su experiencia. Su estrategia es **esperar un ciclo lunar** —unos 28 días— antes de las decisiones importantes, dejando que el asunto se vea desde muchos ángulos antes de cerrarlo.',
        'Su mayor cuidado en la gestión de la energía es elegir bien los entornos y no identificarse con lo que solo está reflejando. Sorpresa y deleite, frente a decepción, son las señales de que vive en el lugar y con la gente adecuados.'
      ]
    }
  },

  // ── Strategy (the value "i"): each concrete strategy. ──
  strategy: {
    respond: {
      title: 'Responder',
      paragraphs: [
        'La estrategia del Generador. En lugar de salir a iniciar desde la cabeza, el diseño pide **esperar a tener algo a lo que responder**: una propuesta, una pregunta, una oportunidad que aparece. La vida presenta el material; el cuerpo responde.',
        'La respuesta surge en el centro Sacral como una **reacción visceral**, anterior al razonamiento: un impulso de acercarse o de apartarse. Confiar en ese sí o no del cuerpo, en vez de convencerse mentalmente, es lo que lleva a la satisfacción; forzar la acción donde no hay respuesta conduce a la frustración.'
      ]
    },
    'respond-then-inform': {
      title: 'Responder y luego informar',
      paragraphs: [
        'La estrategia del Generador Manifestante: una combinación de las dos primeras. Ante todo, como cualquier Generador, **espera la respuesta sacral** —el sí o el no del cuerpo ante algo concreto—; no inicia por mente.',
        'Una vez tiene esa respuesta y va a actuar, **informa a quienes se verán afectados** antes de lanzarse. Por su capacidad de manifestar con rapidez, avisar reduce la fricción con el entorno y evita que su velocidad genere resistencia. Saltarse cualquiera de los dos pasos —responder e informar— es la fuente habitual de su desgaste.'
      ]
    },
    'inform-before-acting': {
      title: 'Informar antes de actuar',
      paragraphs: [
        'La estrategia del Manifestador. Como su energía inicia e impacta sin avisar, el diseño pide **informar a las personas afectadas antes de ponerse en marcha**. No es pedir permiso ni justificarse: es comunicar lo que se va a hacer.',
        'El efecto es muy práctico: **informar disuelve gran parte de la resistencia** que el Manifestador encuentra cuando actúa por sorpresa. Hacerlo trae paz a su alrededor; omitirlo provoca enfado y oposición que, sin saberlo, acaban dificultando su propio movimiento.'
      ]
    },
    'wait-for-invitation': {
      title: 'Esperar la invitación',
      paragraphs: [
        'La estrategia del Proyector. Para las cosas importantes —un trabajo, una relación, un compromiso grande— el diseño pide **esperar a ser reconocido e invitado** en lugar de ofrecerse sin que nadie lo pida.',
        'No es pasividad: el Proyector sigue viviendo y preparándose, pero reserva su sabiduría para quien la valora y la solicita. **La invitación correcta abre la puerta** a que su don sea bien recibido; insistir sin ella suele traer resistencia y amargura. Reconocimiento y éxito son la señal de que la espera ha valido la pena.'
      ]
    },
    'wait-lunar-cycle': {
      title: 'Esperar un ciclo lunar',
      paragraphs: [
        'La estrategia del Reflector. Antes de una decisión importante, el diseño pide **dejar pasar un ciclo lunar completo** —unos 28 días— en lugar de resolver de golpe.',
        'Durante ese tiempo, el Reflector **conversa, muestrea distintos entornos y observa cómo cambia su percepción** del asunto día a día. Como su carta está completamente abierta, necesita ese recorrido para distinguir lo que es suyo de lo que solo está reflejando. La claridad llega por acumulación, no por impulso.'
      ]
    }
  },

  // ── Authority (the value "i"): each concrete inner authority. ──
  authority: {
    emotional: {
      title: 'Autoridad emocional',
      paragraphs: [
        'La autoridad más extendida. Quien la tiene posee el **[Plexo solar](center:solarPlexus) definido**, que funciona en ondas: el ánimo sube y baja con el tiempo, no por los hechos del momento. La regla de oro es clara: **no hay verdad en el ahora**.',
        'Para decidir bien, el diseño pide **esperar a recorrer la onda emocional** —dormir sobre ello, dejar pasar el tiempo, volver al asunto en distintos ánimos— antes de comprometerse. La claridad no es un destello instantáneo, sino lo que queda cuando la emoción se ha asentado. La prisa es su principal enemiga.'
      ]
    },
    sacral: {
      title: 'Autoridad sacral',
      paragraphs: [
        'La autoridad de la mayoría de Generadores. Reside en el **[centro Sacral](center:sacral)**, que responde **en el momento** con un sonido o un impulso visceral —una especie de "ajá" de atracción o un "mmm-mmm" de rechazo— ante algo concreto.',
        'Es una autoridad **inmediata y corporal**: no razona, reacciona. Funciona mejor con preguntas de sí/no y se nubla cuando la mente intenta argumentar la decisión. Aprender a captar y confiar en esa respuesta instantánea del vientre es la práctica central de quien la tiene.'
      ]
    },
    splenic: {
      title: 'Autoridad esplénica',
      paragraphs: [
        'Reside en el **[Bazo](center:spleen)**, el centro más antiguo de la conciencia, ligado a la supervivencia, la salud y el instinto. Habla **en el presente y una sola vez**: un saber súbito, callado y espontáneo, sin repetición ni discurso.',
        'Es la autoridad más **sutil y fugaz**: no insiste ni argumenta, por lo que es fácil pasarla por alto o racionalizarla después. Quien la tiene aprende a **fiarse de ese primer impulso instintivo** —ese "sí" o "no" tranquilo del cuerpo— en el instante en que aparece, porque no suele volver a hablar.'
      ]
    },
    ego: {
      title: 'Autoridad del ego',
      paragraphs: [
        'Reside en el **[centro del Corazón (Ego)](center:heart)**, el motor de la voluntad y el deseo. Aquí la decisión correcta se reconoce con una pregunta sincera: **¿lo quiero de verdad?, ¿qué hay en esto para mí?** No se trata de egoísmo, sino de honrar el propio querer.',
        'Es una autoridad de **voluntad e impulso**, no de reflexión prolongada. Funciona cuando la persona escucha lo que realmente desea y es capaz de comprometerse con ello; se pierde cuando acepta cosas por deber o presión que su corazón no respalda.'
      ]
    },
    'self-projected': {
      title: 'Autoridad autoproyectada',
      paragraphs: [
        'Propia de ciertos Proyectores. La verdad llega a través de la **voz**: al hablar del asunto en voz alta, la persona **se oye a sí misma** y reconoce qué es coherente con su identidad y su dirección.',
        'Lo decisivo no es la opinión de quien escucha, sino el acto de **expresar y escucharse**. Por eso conviene rodearse de personas de confianza que dejen hablar sin influir, y prestar atención al tono y a las palabras que salen: ahí, más que en el razonamiento, está la guía.'
      ]
    },
    mental: {
      title: 'Autoridad mental',
      paragraphs: [
        'También llamada autoridad ambiental o "caja de resonancia", propia de algunos Proyectores sin centros internos definidos para decidir. **No hay una autoridad corporal interna**: la claridad no surge de dentro de golpe, sino del diálogo.',
        'La práctica consiste en **hablar el asunto con personas de confianza y en el entorno adecuado**, no para que decidan por ti, sino para escucharte pensar en voz alta. El lugar y la compañía correctos son aquí parte del método: la decisión se va decantando con el tiempo y la conversación.'
      ]
    },
    lunar: {
      title: 'Autoridad lunar',
      paragraphs: [
        'La autoridad del Reflector, el único tipo sin ningún centro definido. Al no haber una fuente interna fija, la guía es el **tiempo**: un ciclo lunar completo, unos 28 días, antes de las decisiones importantes.',
        'Durante ese ciclo, la persona **muestrea distintos estados, entornos y conversaciones**, y observa cómo evoluciona su percepción del asunto. La claridad llega por **maduración**, no por impulso: lo que sigue resonando tras recorrer el ciclo entero es lo fiable.'
      ]
    }
  },

  // ── Profile (the profile-value "i"): each of the six lines. ──
  profile: {
    '1': {
      title: 'Línea 1 — el cimiento',
      paragraphs: [
        'La primera línea busca **seguridad a través del conocimiento**. Necesita investigar, comprender los fundamentos y saber que el suelo que pisa es firme antes de actuar; sin esa base, siente inquietud.',
        'Es una energía **introspectiva y de estudio**: profundiza hasta sentirse experta, y esa solidez tranquiliza a los demás. Su reto es no quedarse esperando indefinidamente a saberlo "todo" antes de dar el paso.'
      ]
    },
    '2': {
      title: 'Línea 2 — el talento natural',
      paragraphs: [
        'La segunda línea tiene **dones naturales** que ejerce casi sin esfuerzo, a menudo sin ser plenamente consciente de ellos. Necesita **tiempo a solas** para que ese talento madure a su ritmo.',
        'Su dinámica es la de ser **llamada desde fuera**: los demás ven en ella algo que la propia persona no termina de nombrar, y la invitan a sacarlo. El equilibrio está entre respetar su necesidad de retiro y responder a esas llamadas cuando son las correctas.'
      ]
    },
    '3': {
      title: 'Línea 3 — el ensayo y error',
      paragraphs: [
        'La tercera línea aprende **probando**: por contacto directo con la vida, a base de intentos, descubrimientos y también tropiezos. Cada "error" es información, no fracaso.',
        'Es una energía **experimental y resiliente**: descubre lo que funciona descartando lo que no. Su sabiduría es muy práctica, siempre que no lea sus traspiés como defectos personales, sino como el método mismo por el que está diseñada para aprender.'
      ]
    },
    '4': {
      title: 'Línea 4 — la red',
      paragraphs: [
        'La cuarta línea funciona a través de los **vínculos y la comunidad**. Las oportunidades —trabajo, amor, cambios— suelen llegarle por personas que ya conoce, no por desconocidos ni por salir a buscar en frío.',
        'Es una energía **cálida y relacional**, que necesita solidez en sus afectos. Su consejo práctico clásico es no soltar una base —un empleo, una situación— hasta tener la siguiente asegurada a través de su red: las transiciones le funcionan mejor de mano en mano.'
      ]
    },
    '5': {
      title: 'Línea 5 — la proyección',
      paragraphs: [
        'La quinta línea vive bajo un **campo de proyección**: los demás depositan en ella expectativas, esperando soluciones prácticas. Se la ve como alguien capaz de resolver, casi a la manera de un salvador.',
        'Eso le da influencia y un papel natural de **liderazgo útil**, pero también la expone: si no cumple lo proyectado, la misma fuerza puede volverse en su contra. Su reto es gestionar bien su **reputación** y prometer solo lo que de verdad puede entregar.'
      ]
    },
    '6': {
      title: 'Línea 6 — el modelo',
      paragraphs: [
        'La sexta línea recorre **tres fases vitales**. Hasta cerca de los 30 vive como una tercera línea, probando y tropezando; luego se retira a observar —"sobre el tejado"— durante una segunda etapa; y a partir de los 50, aproximadamente, emerge como **ejemplo y referente**.',
        'Su orientación de fondo es la **objetividad y la madurez**: aspira a vivir según lo que considera correcto y a convertirse en modelo para otros. Entender en qué fase está ayuda a no juzgarse: la observación de la etapa media no es desconexión, sino preparación.'
      ]
    }
  },

  // ── Definition (the value "i"): each concrete definition. ──
  definition: {
    'no-definition': {
      title: 'Sin definición',
      paragraphs: [
        'Exclusiva del Reflector: **ningún centro está definido**, todo el bodygraph permanece abierto. No hay energía fija propia; en su lugar, la persona toma, amplifica y refleja la energía de quienes la rodean.',
        'Esto la hace **extraordinariamente sensible al entorno**: con quién y dónde está cambia por completo su experiencia. Su sabiduría nace precisamente de esa apertura total, siempre que aprenda a no confundir lo que solo refleja con lo que es suyo.'
      ]
    },
    single: {
      title: 'Definición única',
      paragraphs: [
        'Todos los centros definidos están **conectados en un solo bloque**. La energía fluye internamente sin interrupciones, lo que da una sensación de **autosuficiencia**: la persona accede a su propia consistencia sin depender de otros para "completarse".',
        'Su reto suele ser el opuesto al de las definiciones divididas: como funciona bien por sí sola, puede **ensimismarse o costarle abrirse** a la influencia ajena. Reconocer cuándo conviene salir de la propia burbuja es parte de su aprendizaje.'
      ]
    },
    split: {
      title: 'Definición split',
      paragraphs: [
        'Los centros definidos forman **dos grupos separados**, sin un canal que los una por dentro. La persona suele experimentar una **búsqueda de conexión**: algo que tienda el puente entre sus dos partes.',
        'Ese puente llega a menudo a través de **otras personas** —cuya energía completa el canal que falta— o de tránsitos que activan la puerta intermedia. No es una carencia: entender qué une sus dos grupos ayuda a elegir mejor las compañías y entornos que la hacen sentir integrada.'
      ]
    },
    'triple-split': {
      title: 'Definición triple split',
      paragraphs: [
        'Los centros definidos se reparten en **tres grupos** separados. El cableado interno es más complejo y, con frecuencia, la persona necesita **más variedad de estímulos y de gente** para sentir que sus partes se conectan.',
        'Suele funcionar bien en entornos diversos y con cierto movimiento; la quietud excesiva puede dejarle la sensación de que algo no termina de juntarse. Conocer esta estructura ayuda a no interpretar esa necesidad de variedad como dispersión.'
      ]
    },
    'quad-split': {
      title: 'Definición cuádruple split',
      paragraphs: [
        'La más infrecuente: los centros definidos forman **cuatro grupos** separados. Es un cableado muy fragmentado que, paradójicamente, suele pedir **más estructura, espacio y calma** para integrarse.',
        'Lejos de ser un problema, describe una manera muy particular de procesar la vida. La persona se beneficia de **darse tiempo** y de no presionarse para resolverlo todo de golpe: sus muchas partes se ordenan a su propio ritmo.'
      ]
    }
  },

  // ── Centre (the chip "i"): each of the nine centres. ──
  // Split into function (`fn`) + the two states (`defined` / `open`) so the
  // report can show only the state the chart has, while the chip "i" shows the
  // function plus both states (getElementInfo reassembles them) — Phase 7.
  center: {
    head: {
      title: 'Cabeza',
      fn: 'Es un centro de **presión mental**: la fuerza que nos empuja a pensar, preguntar e inspirarnos. Genera las preguntas y la curiosidad, pero no las responde —eso es tarea del [Ajna](center:ajna)—.',
      defined: '**Definido**, aporta una forma constante de inspirarse y de sentir la presión por entender.',
      open: '**Indefinido**, amplifica las preguntas y la inquietud mental de los demás: aquí conviene no dejarse arrastrar a resolver dudas que en realidad no son tuyas ni importan para tu vida.'
    },
    ajna: {
      title: 'Ajna',
      fn: 'Es el centro de la **mente y la conceptualización**: procesa la información, forma ideas y da estructura a lo que pensamos, trabajando con la presión que le llega de la [Cabeza](center:head).',
      defined: '**Definido**, da una manera fija y fiable de pensar, con opiniones y certezas estables.',
      open: '**Indefinido**, ofrece una mente **flexible y abierta**, capaz de ver muchas perspectivas; su trampa es la presión por aparentar seguridad o aferrarse a una certeza prestada. Su don es no necesitar tener siempre una respuesta fija.'
    },
    throat: {
      title: 'Garganta',
      fn: 'Es el centro de la **comunicación y la manifestación**: donde la energía se convierte en voz y en acción. Todo lo que se expresa o se materializa pasa por aquí.',
      defined: '**Definido**, da una voz y una forma de expresarse consistentes.',
      open: '**Indefinido**, adapta su manera de comunicar según la compañía y puede sentir la **presión por hablar para llamar la atención**; su aprendizaje es esperar el momento adecuado en lugar de forzar la palabra.'
    },
    g: {
      title: 'G',
      fn: 'Es el centro de la **identidad, el amor y la dirección**: el sentido de quién eres y hacia dónde va tu vida. Está ligado también a la sensación de estar en el lugar correcto.',
      defined: '**Definido**, aporta un sentido estable de identidad y rumbo.',
      open: '**Indefinido**, vive una identidad más **fluida y cambiante**, que encuentra su dirección a través de los entornos y las personas adecuadas; la clave aquí es el **lugar**: estar en el sitio correcto orienta todo lo demás.'
    },
    heart: {
      title: 'Corazón (Ego)',
      fn: 'Es el centro de la **voluntad, el ego y la autoestima**, ligado al mundo material y a la capacidad de comprometerse y cumplir promesas. Es un motor que funciona a pulsos de fuerza de voluntad, no de forma continua.',
      defined: '**Definido**, da una voluntad consistente y la capacidad de sostener lo que se promete.',
      open: '**Indefinido** —la mayoría—, **no necesita demostrar su valía** ni medir su fuerza de voluntad; su trampa es prometer de más para probarse. Aquí se aprende que el valor propio no depende de los logros.'
    },
    sacral: {
      title: 'Sacral',
      fn: 'Es el gran **motor de energía vital, trabajo y sexualidad**: la fuente generativa del sistema. Define a Generadores y Generadores Manifestantes, y es la clave de su forma de gestionar la energía.',
      defined: '**Definido**, ofrece una energía de trabajo **sostenible y renovable**, pensada para emplearse en lo correcto y agotarse sanamente cada día.',
      open: '**Indefinido**, no dispone de esa energía constante: aquí es vital **reconocer cuándo es suficiente** y no dejarse arrastrar por el ritmo de los demás hasta el agotamiento.'
    },
    spleen: {
      title: 'Bazo',
      fn: 'Es el centro del **instinto, la intuición y la supervivencia**, ligado al sistema inmune, la salud y la sensación de bienestar en el presente. Habla bajo, en el ahora y una sola vez.',
      defined: '**Definido**, da una intuición y una sensación de salud constantes.',
      open: '**Indefinido**, **amplifica los miedos** ajenos y tiende a aferrarse a lo que no le conviene —relaciones, hábitos, situaciones— por temor a soltar; su aprendizaje es no decidir desde el miedo y descubrir qué le sienta bien al cuerpo.'
    },
    solarPlexus: {
      title: 'Plexo solar',
      fn: 'Es el centro de las **emociones, los sentimientos y los estados de ánimo**, que funciona en **ondas** que suben y bajan con el tiempo. Cuando está definido, marca una autoridad emocional: **no hay verdad en el momento**.',
      defined: '**Definido**, vive sus propias olas emocionales y necesita tiempo para tener claridad.',
      open: '**Indefinido**, **absorbe y amplifica las emociones del entorno** —capta el ambiente de una sala— y tiende a evitar la confrontación; su reto es no apropiarse de estados de ánimo que en realidad ha recogido de fuera.'
    },
    root: {
      title: 'Raíz',
      fn: 'Es un centro de **presión y adrenalina**: el empuje que nos pone en marcha y el estrés que nos urge a actuar para liberarnos de esa presión. Da el pulso para arrancar las cosas.',
      defined: '**Definido**, aporta una forma constante de manejar la presión y el estrés.',
      open: '**Indefinido**, **amplifica la prisa** y la sensación de tener que quitarse cuanto antes lo pendiente de encima; su aprendizaje es no dejarse empujar a decisiones apresuradas solo para aliviar una presión que, en buena parte, es prestada.'
    }
  },

  // ── Activations (Phase 6.E): the table's column headers and planets. ──
  activationCol: {
    personality: {
      title: 'Personality (consciente)',
      paragraphs: [
        'La columna **Personality** (personalidad) representa lo **consciente**: lo que reconoces como "tú", tu mente y tu personalidad. Se calcula con la posición de los planetas en el **instante exacto del nacimiento**.',
        'Es la parte de la carta con la que te identificas y de la que sueles ser consciente. En el bodygraph se pinta en blanco.'
      ]
    },
    design: {
      title: 'Design (inconsciente)',
      paragraphs: [
        'La columna **Design** (diseño) representa lo **inconsciente**: el cuerpo, lo heredado, lo que opera sin que lo controles y que otros ven en ti antes que tú. Se calcula unos **88 días antes del nacimiento** (88° de arco solar).',
        'Es la parte más corporal y menos accesible a la mente; suele expresarse de forma automática. En el bodygraph se pinta en rojo.'
      ]
    },
    weight: {
      title: 'Peso de la activación',
      paragraphs: [
        'No todas las activaciones influyen por igual. La enseñanza más extendida en Diseño Humano sitúa al **Sol y la Tierra** como lo más determinante —se les suele atribuir en torno al **70 %** del significado de la carta—; los **Nodos** describen sobre todo el entorno y la dirección de vida; y el resto de planetas **matizan**.',
        'La columna *Peso* resume esa influencia relativa de forma orientativa (**alto / medio / bajo**). Es una guía aproximada, no una cifra oficial del sistema: úsala para saber por dónde empezar a leer la carta —siempre por el Sol y la Tierra—.'
      ]
    }
  },

  // Each of the 13 bodies (Phase 6.E). Own-voice keynotes from general,
  // public-domain astrological/HD associations.
  planet: {
    sun: {
      title: 'Sol',
      paragraphs: [
        'El **Sol** es la activación más importante de la carta: marca tu **expresión esencial**, la energía que irradias y el propósito que encarnas. Junto con la Tierra, concentra la mayor parte del significado (~70 %).',
        'Su puerta de personalidad suele leerse como la nota dominante de quién eres de forma consciente.'
      ]
    },
    earth: {
      title: 'Tierra',
      paragraphs: [
        'La **Tierra** equilibra al Sol: es lo que te **arraiga y estabiliza**, el suelo sobre el que se sostiene tu propósito. Forma con el Sol el eje más determinante de la carta.',
        'Aporta el contrapeso práctico a la energía solar: lo que necesitas para mantenerte centrado.'
      ]
    },
    moon: {
      title: 'Luna',
      paragraphs: [
        'La **Luna** señala lo que te **impulsa y mantiene en marcha**: el motor de la continuidad en el día a día. En el Reflector cobra un papel central, al recorrer su ciclo de unos 28 días.',
        'Habla de aquello que sostiene tu movimiento cuando el entusiasmo inicial ya pasó.'
      ]
    },
    northNode: {
      title: 'Nodo Norte',
      paragraphs: [
        'El **Nodo Norte** describe la **dirección y el entorno** hacia los que se orienta la segunda parte de la vida (de forma aproximada, a partir de la madurez). Marca hacia dónde vas.',
        'No es un rasgo de carácter sino un **contexto**: el escenario donde tu energía se despliega mejor.'
      ]
    },
    southNode: {
      title: 'Nodo Sur',
      paragraphs: [
        'El **Nodo Sur** describe el **entorno** de la primera parte de la vida: el escenario del que partes. Con el Nodo Norte forma el eje de tu trayectoria.',
        'Habla del "de dónde vienes" en términos de ambiente y dirección, más que de personalidad.'
      ]
    },
    mercury: {
      title: 'Mercurio',
      paragraphs: [
        'Mercurio rige la **comunicación y el pensamiento**: lo que necesitas expresar y compartir, y cómo conectas ideas con los demás.',
        'Matiza la manera en que hablas y transmites.'
      ]
    },
    venus: {
      title: 'Venus',
      paragraphs: [
        'Venus se asocia a los **valores, los afectos y el sentido de lo correcto**: lo que aprecias, cómo amas y qué consideras justo o bello.',
        'Aporta el tono de tus vínculos y de tu moral personal.'
      ]
    },
    mars: {
      title: 'Marte',
      paragraphs: [
        'Marte representa la **energía, el impulso y la inmadurez** que se va puliendo con los años: el empuje, a veces desordenado, sobre todo en la juventud.',
        'Habla de cómo canalizas la fuerza y la acción.'
      ]
    },
    jupiter: {
      title: 'Júpiter',
      paragraphs: [
        'Júpiter se asocia a la **expansión, la ley y la abundancia**: los principios que te benefician y dónde encuentras crecimiento.',
        'Aporta el sentido de protección y de lo que te hace prosperar.'
      ]
    },
    saturn: {
      title: 'Saturno',
      paragraphs: [
        'Saturno es la **disciplina y el límite**: el "juez" que exige rigor, corrige y marca lo que aprendes a base de constancia.',
        'Señala dónde la madurez llega a través del esfuerzo y la responsabilidad.'
      ]
    },
    uranus: {
      title: 'Urano',
      paragraphs: [
        'Urano representa lo **singular y lo inusual**: tu originalidad y aquello en lo que sigues un camino propio, fuera de lo convencional.',
        'Se asocia también al cambio, la ciencia y lo inesperado.'
      ]
    },
    neptune: {
      title: 'Neptuno',
      paragraphs: [
        'Neptuno se asocia a lo **espiritual, lo sutil y la ilusión**: la niebla que envuelve lo que aún no se ve con claridad, y la apertura a lo trascendente.',
        'Aporta sensibilidad e imaginación; a veces, una confusión que se despeja con el tiempo.'
      ]
    },
    pluto: {
      title: 'Plutón',
      paragraphs: [
        'Plutón es la **verdad y la transformación**: lo que se remueve en profundidad, los procesos psicológicos y los cambios que rehacen desde dentro.',
        'Señala dónde la vida te confronta con lo esencial para transformarte.'
      ]
    }
  },

  // Relative weight of each activation (Phase 6.E). PROVISIONAL — pending the
  // author's review. The only firm figure in HD is Sun+Earth ≈ 70%; the rest
  // is a defensible ordering (Nodes = environment/direction → medium), not an
  // official per-planet table. `tier` drives styling; `label` is shown.
  activationWeight: {
    sun: { tier: 'high', label: 'alto' },
    earth: { tier: 'high', label: 'alto' },
    moon: { tier: 'low', label: 'bajo' },
    northNode: { tier: 'mid', label: 'medio' },
    southNode: { tier: 'mid', label: 'medio' },
    mercury: { tier: 'low', label: 'bajo' },
    venus: { tier: 'low', label: 'bajo' },
    mars: { tier: 'low', label: 'bajo' },
    jupiter: { tier: 'low', label: 'bajo' },
    saturn: { tier: 'low', label: 'bajo' },
    uranus: { tier: 'low', label: 'bajo' },
    neptune: { tier: 'low', label: 'bajo' },
    pluto: { tier: 'low', label: 'bajo' }
  },

  // Gate essences (Phase 7). Own wording from the public-domain I Ching
  // hexagram theme + the gate's centre function, with a gift/shadow polarity.
  // Written neutrally (about the energy, not "you"), so it reads right whether
  // the gate is active or not; getGateInfo appends a personalised state coda.
  // `theme` is a short noun phrase used to compose channel descriptions.
  gate: {
    1: { theme: 'la expresión creativa', text: 'En el [centro G](center:g), la puerta 1 es la energía de **crear desde la propia identidad**: una expresión original que no imita a nadie. En su mejor versión inspira a los demás; en su sombra, se repliega en la melancolía cuando no encuentra cómo salir al mundo.' },
    2: { theme: 'la dirección receptiva', text: 'En el [centro G](center:g), la puerta 2 es la **dirección receptiva**: saber hacia dónde ir sin forzarlo, dejando que el rumbo emerja en vez de imponerlo. Su don es una orientación natural que da sentido al movimiento; su sombra, sentirse perdido cuando intenta dirigir desde la pura voluntad.' },
    3: { theme: 'el orden en lo nuevo', text: 'En el [centro Sacral](center:sacral), la puerta 3 es la energía de **poner orden en lo nuevo**: arrancar algo desde el caos del comienzo, cuando aún no hay forma. Su don es saber iniciar y estructurar lo que empieza; su sombra, la frustración y el bloqueo cuando se quiere ir más rápido de lo que el proceso permite.' },
    4: { theme: 'las respuestas mentales', text: 'En el [centro Ajna](center:ajna), la puerta 4 es la mente que **busca respuestas y fórmulas** ante las preguntas abiertas. Su don es conceptualizar soluciones lógicas; su sombra, la presión por tener ya una respuesta, confundiendo una hipótesis con una certeza.' },
    5: { theme: 'los ritmos fijos', text: 'En el [centro Sacral](center:sacral), la puerta 5 son los **ritmos y los hábitos fijos**: la energía que sostiene rutinas constantes y un compás propio. Su don es la fiabilidad de un ritmo natural que ancla el día; su sombra, la ansiedad cuando ese ritmo se rompe.' },
    6: { theme: 'la intimidad y la fricción', text: 'En el [centro del Plexo solar](center:solarPlexus), la puerta 6 regula la **intimidad y la fricción emocional**: cuándo abrirse y cuándo cerrarse, la frontera de lo íntimo. Su don es una emocionalidad que crea cercanía profunda; su sombra, el conflicto y la reactividad cuando esa frontera se gestiona desde la emoción del momento.' },
    7: { theme: 'el liderazgo y la dirección', text: 'En el [centro G](center:g), la puerta 7 es el **papel de guía hacia el futuro**: la capacidad de dar dirección y liderar, a menudo desde un segundo plano. Su don es una autoridad natural que otros quieren seguir; su sombra, la necesidad de controlar el rumbo o de imponerse.' },
    8: { theme: 'la contribución', text: 'En el [centro de la Garganta](center:throat), la puerta 8 es la **contribución**: aportar algo propio que marque una diferencia y dar voz a lo que importa. Su don es una expresión auténtica que invita a otros a sumarse; su sombra, contribuir buscando reconocimiento y quedarse en lo vacío.' },
    9: { theme: 'el foco en el detalle', text: 'En el [centro Sacral](center:sacral), la puerta 9 es la energía del **foco y la concentración** en los detalles que hacen falta para llevar algo a término. Su don es una atención sostenida que completa; su sombra, perderse en lo pequeño o dispersarse.' },
    10: { theme: 'el amor propio', text: 'En el [centro G](center:g), la puerta 10 es el **amor propio y la fidelidad a uno mismo**: comportarse de acuerdo con lo que se es. Su don es una autenticidad que no se traiciona; su sombra, la autocrítica o contorsionarse para encajar.' },
    11: { theme: 'las ideas', text: 'En el [centro Ajna](center:ajna), la puerta 11 es la mente **llena de ideas** para compartir y dar sentido a la experiencia. Su don es una riqueza conceptual estimulante; su sombra, la presión por llevar cada idea a la acción, cuando las ideas están para compartirse más que para ejecutarse.' },
    12: { theme: 'la expresión cauta', text: 'En el [centro de la Garganta](center:throat), la puerta 12 es la **expresión cauta**: hablar cuando el ánimo y el momento son los adecuados. Su don es una palabra que emociona y conmueve en su instante justo; su sombra, hablar fuera de tono o callar por reparo.' },
    13: { theme: 'la escucha', text: 'En el [centro G](center:g), la puerta 13 es la **escucha y la memoria**: recoger las historias y los secretos de los demás y darles sentido. Su don es un oído que invita a confiar y orienta; su sombra, cargar con lo que otros depositan.' },
    14: { theme: 'el poder para los recursos', text: 'En el [centro Sacral](center:sacral), la puerta 14 es la **energía para generar y dirigir recursos**: el empuje que da poder al trabajo propio. Su don es una fuerza generadora que prospera; su sombra, trabajar sin un porqué o sin valores que la guíen.' },
    15: { theme: 'el amor a la diversidad', text: 'En el [centro G](center:g), la puerta 15 es el **amor a la humanidad y a sus extremos**: una atracción por la diversidad de ritmos y formas de vivir. Su don es acoger lo distinto y encontrar el flujo adecuado; su sombra, un ritmo errático o juzgar el ritmo ajeno.' },
    16: { theme: 'el entusiasmo y la destreza', text: 'En el [centro de la Garganta](center:throat), la puerta 16 es el **entusiasmo y la destreza**: el talento que se expresa y se afina con la práctica. Su don es un entusiasmo contagioso y la maestría; su sombra, el entusiasmo vacío sin fondo ni preparación.' },
    17: { theme: 'las opiniones', text: 'En el [centro Ajna](center:ajna), la puerta 17 es la mente que **forma opiniones** y se anticipa para organizar. Su don son opiniones útiles que estructuran; su sombra, presentar como hechos lo que son solo pareceres.' },
    18: { theme: 'la corrección', text: 'En el [Bazo](center:spleen), la puerta 18 es el instinto de **corregir y mejorar** lo que se ha torcido. Su don es una mirada aguda que perfecciona y protege; su sombra, la crítica incesante y el perfeccionismo.' },
    19: { theme: 'la sensibilidad a las necesidades', text: 'En el [centro Raíz](center:root), la puerta 19 es la **sensibilidad a las necesidades**: captar lo que la gente y la comunidad necesitan, también lo material y afectivo. Su don es una fina sintonía con lo que hace falta; su sombra, la necesidad excesiva o la hipersensibilidad.' },
    20: { theme: 'el ahora', text: 'En el [centro de la Garganta](center:throat), la puerta 20 es el **ahora**: la conciencia y la expresión del momento presente. Su don es una acción espontánea y certera en el instante; su sombra, el ajetreo o el hablar sin presencia.' },
    21: { theme: 'el control', text: 'En el [centro del Corazón](center:heart), la puerta 21 es la **voluntad de controlar** los propios recursos y el propio territorio. Su don es una autoridad legítima sobre lo que es suyo; su sombra, querer controlarlo todo o sentirse controlado.' },
    22: { theme: 'la gracia', text: 'En el [centro del Plexo solar](center:solarPlexus), la puerta 22 es la **gracia y la apertura emocional**: el encanto social que sabe escuchar y abrirse. Su don es una emocionalidad que atrae y conecta; su sombra, el retraimiento cuando el ánimo no acompaña.' },
    23: { theme: 'la asimilación', text: 'En el [centro de la Garganta](center:throat), la puerta 23 es la **asimilación**: traducir un saber individual a algo simple y comprensible. Su don es hacer claro lo complejo, esos "clics" que otros entienden; su sombra, hablar a destiempo y no ser comprendido.' },
    24: { theme: 'la racionalización', text: 'En el [centro Ajna](center:ajna), la puerta 24 es la mente que **vuelve una y otra vez sobre un pensamiento** hasta darle sentido. Su don es la revelación que nace de revisar; su sombra, el bucle obsesivo del que no se sale.' },
    25: { theme: 'el amor universal', text: 'En el [centro G](center:g), la puerta 25 es la **inocencia y el amor universal**: un querer puro que no espera nada a cambio. Su don es una entrega limpia y desinteresada; su sombra, perder esa inocencia por herida o por ego.' },
    26: { theme: 'la transmisión persuasiva', text: 'En el [centro del Corazón](center:heart), la puerta 26 es la **transmisión persuasiva**: la voluntad de comunicar y poner en valor, de "vender" una idea. Su don es un poder de convicción que mueve; su sombra, la manipulación y las medias verdades.' },
    27: { theme: 'el cuidado', text: 'En el [centro Sacral](center:sacral), la puerta 27 es el **cuidado y la nutrición**: la energía de hacerse cargo y sostener a otros. Su don es un cuidado que nutre de verdad; su sombra, sobreproteger o darse hasta agotarse.' },
    28: { theme: 'la búsqueda de sentido', text: 'En el [Bazo](center:spleen), la puerta 28 es la **búsqueda de sentido**: el juego de arriesgarse por algo que merezca la pena. Su don es encontrar un propósito por el que valga la pena luchar; su sombra, la lucha por la lucha y el miedo a una vida sin sentido.' },
    29: { theme: 'el compromiso', text: 'En el [centro Sacral](center:sacral), la puerta 29 es el **compromiso**: la energía de decir sí y perseverar hasta el final. Su don es una entrega que cumple lo que empieza; su sombra, comprometerse en exceso o decir sí donde no tocaba.' },
    30: { theme: 'el deseo', text: 'En el [centro del Plexo solar](center:solarPlexus), la puerta 30 es el **deseo y el anhelo**: el fuego de las expectativas que impulsa a vivir experiencias. Su don es una pasión que da combustible a la vida; su sombra, dejarse consumir por ansias que no se sacian.' },
    31: { theme: 'el liderazgo por la voz', text: 'En el [centro de la Garganta](center:throat), la puerta 31 es el **liderazgo por la voz**: la influencia de quien habla por un grupo y lo representa. Su don es un liderazgo que otros eligen seguir; su sombra, liderar sin mandato real o por mera ambición.' },
    32: { theme: 'la continuidad', text: 'En el [Bazo](center:spleen), la puerta 32 es el instinto de **continuidad**: olfatear qué perdura y qué hay que adaptar para que dure. Su don es un instinto para el valor duradero; su sombra, el miedo al fracaso y al cambio que paraliza.' },
    33: { theme: 'el retiro y el relato', text: 'En el [centro de la Garganta](center:throat), la puerta 33 es el **retiro y el relato**: apartarse para luego contar lo vivido. Su don es una sabiduría que se comparte tras la reflexión; su sombra, no honrar la necesidad de retirarse, o contar de más o de menos.' },
    34: { theme: 'el poder', text: 'En el [centro Sacral](center:sacral), la puerta 34 es el **poder puro**: la fuerza independiente y ocupada de hacer. Su don es una potencia productiva enorme; su sombra, el ajetreo por el ajetreo, ponerse en marcha sin haber respondido.' },
    35: { theme: 'el ansia de experiencia', text: 'En el [centro de la Garganta](center:throat), la puerta 35 es el **ansia de experiencia y de progreso**: el impulso de probarlo todo y avanzar. Su don es un hambre de vivir que empuja hacia adelante; su sombra, la inquietud de nunca quedar satisfecho.' },
    36: { theme: 'la crisis y lo nuevo', text: 'En el [centro del Plexo solar](center:solarPlexus), la puerta 36 es la **crisis emocional y lo nuevo**: el vaivén que lleva a experiencias inéditas. Su don es crecer a través de la intensidad emocional; su sombra, lanzarse al drama o a la crisis sin estar preparado.' },
    37: { theme: 'la amistad y los pactos', text: 'En el [centro del Plexo solar](center:solarPlexus), la puerta 37 es la **amistad y la comunidad**: la calidez que une a través de pactos y acuerdos. Su don es un afecto que crea familia y pertenencia; su sombra, la dependencia o los pactos rotos.' },
    38: { theme: 'la lucha con sentido', text: 'En el [centro Raíz](center:root), la puerta 38 es la **lucha por lo que vale la pena**: la tenacidad de plantar cara por una causa. Su don es una perseverancia con propósito; su sombra, pelear por pelear o la cabezonería.' },
    39: { theme: 'la provocación', text: 'En el [centro Raíz](center:root), la puerta 39 es la **provocación**: remover la emoción ajena para sacar a la luz lo que de verdad importa. Su don es provocar para revelar el espíritu; su sombra, la provocación gratuita o el malhumor.' },
    40: { theme: 'la entrega y el descanso', text: 'En el [centro del Corazón](center:heart), la puerta 40 es la **entrega y la soledad**: trabajar y proveer para luego retirarse a reponerse. Su don es una generosidad que sabe también descansar; su sombra, el exceso de trabajo sin pausa, o negarse a dar.' },
    41: { theme: 'la imaginación que inicia el deseo', text: 'En el [centro Raíz](center:root), la puerta 41 es la **imaginación que inicia el deseo**: el comienzo de toda nueva experiencia, soñada antes de vivirse. Su don es una fantasía que abre experiencias nuevas; su sombra, una imaginación desconectada de la realidad o la presión de un anhelo no saciado.' },
    42: { theme: 'la culminación', text: 'En el [centro Sacral](center:sacral), la puerta 42 es la **culminación**: la energía de cerrar ciclos y llevar las cosas hasta el final. Su don es la capacidad de completar lo empezado; su sombra, empezar sin terminar o el miedo a los finales.' },
    43: { theme: 'la intuición mental', text: 'En el [centro Ajna](center:ajna), la puerta 43 es la **intuición mental**: un saber individual que llega como un fogonazo, adelantado a los demás. Su don es una idea original y reveladora; su sombra, empeñarse en decirla a destiempo y que no la entiendan.' },
    44: { theme: 'el instinto del pasado', text: 'En el [Bazo](center:spleen), la puerta 44 es el **instinto que lee el pasado**: una alerta para reconocer patrones, personas y oportunidades. Su don es un olfato para la gente y el momento; su sombra, el miedo a que el pasado se repita.' },
    45: { theme: 'la voz de los recursos', text: 'En el [centro de la Garganta](center:throat), la puerta 45 es la **voz que reúne y reparte los recursos**: el "yo tengo" de quien administra lo común. Su don es una administración generosa que cuida del grupo; su sombra, el acaparamiento o el sentirse con derecho a todo.' },
    46: { theme: 'el amor al cuerpo', text: 'En el [centro G](center:g), la puerta 46 es el **amor al cuerpo y el buen estar**: la determinación de habitar el cuerpo y de estar en el lugar correcto. Su don es una serendipia que pone en el sitio justo en el momento justo; su sombra, descuidar o forzar el cuerpo.' },
    47: { theme: 'la realización mental', text: 'En el [centro Ajna](center:ajna), la puerta 47 es la **realización**: la presión mental por dar sentido a la confusión hasta que llega el "ajá". Su don es resolver lo confuso en una comprensión clara; su sombra, quedarse atrapado en la sensación de opresión o sinsentido.' },
    48: { theme: 'la profundidad', text: 'En el [Bazo](center:spleen), la puerta 48 es la **profundidad**: un pozo de talento y sabiduría del que sacar soluciones. Su don es una hondura que aporta lo que falta; su sombra, el miedo a no ser suficiente o a no estar listo.' },
    49: { theme: 'los principios', text: 'En el [centro del Plexo solar](center:solarPlexus), la puerta 49 son los **principios y la revolución**: aceptar o rechazar según valores profundos. Su don es transformar los vínculos desde principios claros; su sombra, el rechazo rígido o la revolución sin sensibilidad.' },
    50: { theme: 'los valores', text: 'En el [Bazo](center:spleen), la puerta 50 son los **valores y la responsabilidad**: el cuidado de las normas que protegen el bienestar del grupo. Su don es una guarda de valores que sostiene a los demás; su sombra, la sobre-responsabilidad y el miedo a fallar al grupo.' },
    51: { theme: 'el impulso y el choque', text: 'En el [centro del Corazón](center:heart), la puerta 51 es el **impulso de ser el primero**: la iniciativa que sacude y despierta. Su don es un coraje que espabila a otros; su sombra, la competitividad o la temeridad.' },
    52: { theme: 'la quietud y el foco', text: 'En el [centro Raíz](center:root), la puerta 52 es la **quietud y la concentración**: la presión de parar para enfocar y ver el conjunto. Su don es una calma que permite concentrarse; su sombra, la inercia o la inquietud de no saber estarse quieto.' },
    53: { theme: 'los comienzos', text: 'En el [centro Raíz](center:root), la puerta 53 son los **comienzos**: la presión y la energía para iniciar nuevos ciclos. Su don es el empuje para arrancar lo nuevo; su sombra, empezar sin descanso sin llegar a completar.' },
    54: { theme: 'la ambición', text: 'En el [centro Raíz](center:root), la puerta 54 es la **ambición**: el impulso de ascender, en lo material y en lo espiritual. Su don es una ambición que eleva; su sombra, perseguir el ascenso por la aprobación ajena o pasarse de la raya.' },
    55: { theme: 'la abundancia del ánimo', text: 'En el [centro del Plexo solar](center:solarPlexus), la puerta 55 es el **espíritu y la abundancia emocional**: la riqueza de los estados de ánimo y la fe. Su don es una hondura emocional y una fe que sostienen; su sombra, dejar que la melancolía o el vaivén del ánimo decidan.' },
    56: { theme: 'el relato estimulante', text: 'En el [centro de la Garganta](center:throat), la puerta 56 es el **relato que estimula**: contar ideas y experiencias que enganchan. Su don es una narración cautivadora que abre horizontes; su sombra, adornar de más o la atención que divaga.' },
    57: { theme: 'la intuición en el ahora', text: 'En el [Bazo](center:spleen), la puerta 57 es la **intuición aguda en el ahora**: una claridad instintiva que penetra el presente. Su don es un saber sutil y certero en el instante; su sombra, el miedo al futuro que paraliza.' },
    58: { theme: 'la vitalidad y la mejora', text: 'En el [centro Raíz](center:root), la puerta 58 es la **vitalidad y la alegría de vivir**: la energía que empuja a mejorar las cosas. Su don es un gozo vital que impulsa la corrección; su sombra, la inquietud o la crítica sin alegría.' },
    59: { theme: 'la intimidad', text: 'En el [centro Sacral](center:sacral), la puerta 59 es la **intimidad**: la energía para romper barreras y crear vínculo, también sexual. Su don es el poder de generar cercanía y unión; su sombra, levantar muros o invadir en la intimidad.' },
    60: { theme: 'la aceptación del límite', text: 'En el [centro Raíz](center:root), la puerta 60 es la **aceptación del límite**: convertir la restricción en semilla de lo nuevo. Su don es transformar los límites en posibilidad; su sombra, quedarse atascado en la limitación y la melancolía.' },
    61: { theme: 'la verdad interior', text: 'En el [centro de la Cabeza](center:head), la puerta 61 es la **verdad interior y el misterio**: la presión por conocer lo que no se puede saber del todo. Su don es una inspiración que busca el fondo de las cosas; su sombra, la presión mental de querer saberlo todo.' },
    62: { theme: 'el detalle y el orden', text: 'En el [centro de la Garganta](center:throat), la puerta 62 es el **detalle y la organización**: poner nombre y orden a las cosas para expresarlas con precisión. Su don es una expresión clara y ordenada; su sombra, perderse en el detalle o explicarse de más.' },
    63: { theme: 'la duda', text: 'En el [centro de la Cabeza](center:head), la puerta 63 es la **duda**: la presión que empuja a cuestionar y verificar. Su don es una duda sana que pone a prueba; su sombra, la sospecha que corroe y la ansiedad.' },
    64: { theme: 'la confusión fértil', text: 'En el [centro de la Cabeza](center:head), la puerta 64 es la **confusión que busca sentido**: una presión de imágenes sin procesar que pugnan por ordenarse. Su don es una riqueza de imágenes que acaba en comprensión; su sombra, el agobio de querer resolver la confusión antes de tiempo.' }
  },

  // Initial report (Phase 7). General-frame sections (Parte A) + the shared
  // collective comparison + short connective lead-ins for the personalised
  // sections. The per-element substance (type, strategy, authority, profile,
  // definition, centres) is reused from the blocks above; buildReport (report.js)
  // assembles everything in order.
  report: {
    intro: {
      title: 'Qué es Human Design',
      paragraphs: [
        'Human Design es un sistema de autoconocimiento que combina astrología, el *I Ching*, el árbol de la vida cabalístico, los chakras y algo de lenguaje físico-cuántico. A partir de tu fecha, hora y lugar de nacimiento genera una "carta" (el gráfico o [*bodygraph*](section:chart)) que describe cómo está diseñada tu energía: cómo tomas decisiones bien, cómo gastas y recuperas energía, y cómo interactúas mejor con el mundo. No se considera ciencia —conviene decirlo claro— sino un marco simbólico; su valor está en si te resulta útil como espejo, no en que sea demostrable.'
      ]
    },
    ants: {
      title: 'La analogía de las hormigas',
      paragraphs: [
        'Se podría decir que los humanos nos parecemos a las hormigas. En un hormiguero no hay una "hormiga genérica": hay exploradoras que salen a rastrear, soldados construidas para defender, obreras que mantienen el nido y una reina cuya función es otra por completo. Ninguna es mejor; cada una está hecha para una forma de operar distinta, y el hormiguero funciona precisamente porque no son todas iguales. Pedirle a una exploradora que haga el trabajo de una soldado es agotarla en algo para lo que no está diseñada.',
        'Con las personas pasa algo parecido: tenemos maneras distintas de actuar y de relacionarnos en función de nuestra propia energía y diseño. El error habitual es suponer que todos deberíamos rendir, decidir o arrancar igual. El Diseño Humano propone lo contrario, y a esas diferentes maneras las llama [tipos](section:type). Lo valioso del marco es esa mirada: **deja de medirte con la vara de otro diseño**.'
      ]
    },
    chart: {
      title: 'El bodygraph',
      paragraphs: [
        'Tu carta se dibuja en un esquema gráfico del cuerpo llamado **bodygraph**: las nueve formas geométricas son los centros y las líneas que los conectan son los canales, que van de una puerta a otra (hay 64 puertas). Cada centro gobierna una función concreta —pensar, comunicar, sentir, querer, actuar, intuir— y, en conjunto, dibujan cómo circula tu energía.',
        'Lo que hace única a tu carta es cuáles de esos centros, canales y puertas están activos: los centros coloreados están definidos y los que se ven vacíos, abiertos. De esa combinación salen tu tipo, tu autoridad y tu forma de funcionar, y es lo que iremos desgranando a continuación.'
      ]
    },
    conditioning: {
      title: 'Definido, indefinido y el condicionamiento',
      paragraphs: [
        'Un centro definido funciona de forma fija y fiable: es una energía tuya, constante, que aportas siempre y no depende de quién tengas al lado. Un centro indefinido (abierto) no es un defecto: es una zona donde no tienes esa energía fija y, en cambio, absorbes y amplificas la de los demás y la del entorno.',
        'A todo lo que nos aparta de vivir según nuestro diseño, el Diseño Humano lo llama **condicionamiento**: las capas que acumulamos —por educación, cultura, miedos o lo que se espera de nosotros— y que nos llevan a actuar como en realidad no somos. Tus centros abiertos son la vía de entrada principal de estos condicionamientos. Reconocerlo es el primer paso del [desacondicionamiento](section:experiment) del que hablábamos antes: ir soltando lo prestado para volver a ti, manteniendo especial atención en dejar de compararte con cómo funcionan otras personas y otros diseños.'
      ]
    },
    experiment: {
      title: 'Human Design como experimento vital',
      paragraphs: [
        'El Diseño Humano no se presenta necesariamente como una verdad en la que creer ciegamente, sino como un **experimento para probar**: en lugar de adoptarlo como dogma, la propuesta es que vivas según tu diseño y observes, en tu propia vida, si las cosas fluyen mejor.',
        'El experimento es fácil de enunciar (aunque lleve su tiempo ponerlo en práctica): **tomar tus decisiones según [tu estrategia](section:strategy) y [tu autoridad](section:authority)** —las dos herramientas que verás más adelante— en vez de dejarte llevar por lo que se espera de ti, por la prisa, por la cabeza o por los mecanismos y patrones que llevas aplicando toda tu vida. Poco a poco, esto te devuelve a tu manera natural de funcionar. A este proceso se le llama **desacondicionamiento**, y es, en el fondo, de lo que va todo lo demás.'
      ]
    },
    collective: {
      title: 'Tu lugar en el colectivo',
      paragraphs: [
        'Como en [el símil de las hormigas](section:intro), los tipos de Diseño Humano describen **las maneras distintas de estar diseñado para usar la energía**. Ninguno es mejor, y el conjunto funciona precisamente porque no todos somos iguales. Igual que el hormiguero funciona porque todos los tipos existen, el colectivo humano necesita de todos los diferentes tipos de persona.',
        '**Generadores (~37%) y Generadores Manifestantes (~33%)**: suponen cerca del 70% de la población. Son los constructores, con energía vital sostenida cuando hacen lo que de verdad les enciende. Son el motor que mueve el mundo humano.',
        '**Proyectores (~20%)**: no tienen esa energía constante; su don es ver, guiar y orientar a los demás. Brillan cuando se les reconoce e invita, no forzándose al ritmo de un Generador.',
        '**Manifestadores (~9%)**: son los iniciadores, capaces de arrancar cosas de la nada y causar un impacto que inicia cosas, sin esperar a nadie. Su clave es informar a quienes su acción salpica y gestionar su energía inconstante.',
        '**Reflectores (~1%)**: los más infrecuentes, son un espejo del entorno que muestrea la salud del grupo y del lugar en que vive.',
        'El error más común es medirse con el diseño de otro: que un Proyector se exija la resistencia de un Generador, o que un Generador se frustre por no iniciar como un Manifestador.'
      ]
    },
    // Short connective lead-ins prepended to the reused content of each
    // personalised section.
    leadIn: {
      strategy: 'Tu estrategia es tu forma natural e ideal de actuar y comprometerte con las cosas sin forzarlas.',
      authority: 'Tu autoridad es tu manera correcta de **tomar decisiones** en la vida, de acuerdo con tu diseño y no contra él. Si la estrategia te dice *cuándo* actuar, la autoridad te dice *cómo decidir* cada sí y cada no. La mente sirve para informarte, navegar las decisiones tomadas y aconsejar a otros, pero **la mente no es de fiar para decidir** sobre tu propia vida: las decisiones deben tomarse desde una fuente más corporal y fiable. Esto es la *autoridad*.',
      definition: 'La definición describe cómo se agrupan entre sí tus centros definidos: si forman un solo bloque o varios grupos separados.',
      practice: 'Si te tuvieras que quedar con una sola cosa de todo Human Design, que sea esta: **vivir tu diseño es, sobre todo, entrar en acción según [tu estrategia](section:strategy) y decidir desde [tu autoridad](section:authority)**. Lo demás matiza y afina; pero estas dos cosas son lo que de verdad cambia el día a día de tu vida.',
      centers: 'Veamos cómo queda cada uno de los nueve centros en tu carta:'
    },

    // ── Second-person bodies for the personalised report sections (text pass,
    // 2026-06-30). The report reads in "tú"; the drawer "i" keeps the general,
    // impersonal voice (the chart may be someone else's — Phase 6), so these
    // live here, separate from the shared type/strategy/authority/profile/
    // definition/center blocks. Faithful conversions of those: same meaning,
    // second person, without the "La estrategia del X." style openers (the
    // section title + lead-in already set the frame). ──
    type: {
      generator: [
        'Eres el tipo mayoritario, Generador *puro*, que sois alrededor del **37 % de la población**. Tu rasgo definitorio es el [centro Sacral](center:sacral) definido: la fuente de energía vital del sistema, generativa y de carácter renovable. Tu energía generadora y constructora, cuando estás bien alineado, es continuada y abundante.',
        'Operas por respuesta: **reaccionas a lo que la vida te presenta** en lugar de iniciar desde la mente y lo racional. Cuando comprometes tu energía con lo correcto, aparece la *satisfacción*; si no te escuchas bien y fuerzas tu energía donde no toca, aparece la *frustración*.',
        'En la práctica, tu centro Sacral responde antes que tu mente: ante algo concreto —una propuesta, una pregunta, una situación— surge una reacción visceral de atracción o rechazo. **Seguir esa señal del cuerpo**, en vez de decidir desde el pensamiento y la razón, es lo que mantiene tu energía bien empleada.'
      ],
      'manifesting-generator': [
        'Eres un tipo concreto de [Generador](type:generator) —los Generadores Manifestantes sois un 33 % de la población, y junto al resto de Generadores, sumáis cerca del 70 %—: tienes el [Sacral](center:sacral) definido, y lo que te diferencia de otros Generadores es que tienes el Sacral conectado, directa o indirectamente, con la [Garganta](center:throat). Eso te da la energía generadora propia de los Generadores y, además, capacidad de manifestar y materializar con rapidez.',
        'Tu estrategia es **responder y luego informar**: primero esperas la respuesta sacral —el sí o el no del cuerpo— y, una vez la tienes, avisas a quienes se verán afectados antes de lanzarte. Tiendes a ser polifacético, veloz y no lineal: saltas pasos, haces varias cosas a la vez y a veces vuelves atrás a rematar lo que te saltaste.',
        'La clave para gestionar tu energía es no dispersarte iniciando sin haber escuchado la respuesta de tu cuerpo: cuando te comprometes con lo que de verdad te enciende (cuando tu cuerpo dice sí), avanzas rápido y sientes *satisfacción* y con *paz*; pero cuando fuerzas empujado por la mente y las ideas, acumulas *frustración*, *enfado* y trabajo a medias.'
      ],
      projector: [
        'Los Proyectores sois cerca del **20 % de la población**. No tienes el [Sacral](center:sacral) definido, así que **no estás diseñado para un trabajo constante** ni para sostener la misma energía que un [Generador](type:generator), así que cuidado con intentar rendir de manera continuada y sin descanso. Tu don es otro: ver a los demás con enorme profundidad y saber guiar y orientar la energía ajena.',
        'Tu estrategia es **esperar la invitación** para lo importante —el trabajo, el amor, el lugar donde vivir—. Necesitas ser invitado para que tu sabiduría y esfuerzo sean bien recibidos; cuando te ofreces o te metes sin que te lo pidan, lo normal es que encuentres resistencia y rechazo. Cuando en tu vida aparecen el *reconocimiento* y el *éxito*, son la pista de que vas por buen camino. En cambio, el síntoma que aparece cuando no estás viviendo alineado: la *amargura*.',
        'En la gestión de tu energía, tu tarea es **descansar y dosificarte**: no compites en resistencia física, sino en profundidad y maestría. Tu bienestar se fundamenta en dormir y soltar antes de quedar agotado, y elegir bien a quién entregas tu atención y esfuerzo: aprender a decir que sí o que no cuando toca (porque no toda invitación significa que tengas que decir que sí).'
      ],
      manifestor: [
        'Eres el tipo más independiente, alrededor del **9 % de la población**. Tienes al menos un centro motor (Corazón, Plexo solar, Bazo) conectado a la [Garganta](center:throat), pero el [Sacral](center:sacral) sin definir, así que tu energía no es constante: llega a impulsos, que utilizas para iniciar y poner cosas en marcha, y luego necesitas reposo, bastante reposo.',
        'Tu estrategia es **informar antes de actuar**. No se trata de pedir permiso, sino de avisar a quienes tu impacto va a alcanzar: al hacerlo, reduces la resistencia y el rechazo que de otro modo encuentras a tu alrededor. Actuar de manera alineada con tu estrategia te trae *paz*; y si no lo haces, sientes oposición y crece en ti el *enfado*.',
        'Estás aquí para **iniciar e impactar**, no para ejecutar de forma sostenida. Gestionar tu energía pasa por respetar tus ciclos de empuje y descanso, y por proteger tu autonomía sin aislarte de quienes te rodean.'
      ],
      reflector: [
        'Eres el tipo más infrecuente: los Reflectores sois apenas el **1 % de la población**. No tienes ningún centro definido: todo tu bodygraph está abierto. Eso te convierte en un espejo extraordinariamente sensible de la gente y los lugares que te rodean, capaz de percibir la salud de una comunidad.',
        'Como muestreas constantemente la energía ajena, **el entorno y las compañías te afectan muchísimo**: con quién y dónde estás cambia profundamente tu experiencia. Tu estrategia es **esperar un ciclo lunar** —unos 28 días— antes de las decisiones importantes, dejando que el asunto se vea desde muchos ángulos antes de cerrarlo.',
        'Tu mayor cuidado en la gestión de la energía es elegir bien los entornos y no identificarte con lo que solo estás reflejando. Cuando vives alineado con tu diseño, viviendo en el lugar y con las personas adecuadas, aparecen en ti la *sorpresa* y el *deleite*. Si por el contrario no vives alineado, el síntoma que aparece en ti es la *decepción*.'
      ]
    },
    strategy: {
      respond: [
        'En lugar de salir a iniciar desde la cabeza, tu diseño te pide **esperar a tener algo a lo que responder**: una propuesta, una pregunta, una oportunidad que aparece. La vida presenta el material; tu cuerpo responde.',
        'La respuesta surge en tu [centro Sacral](center:sacral) como una **reacción visceral**, anterior al razonamiento: un impulso de acercarte o de apartarte. Un sí o un no. Confiar en ese sí o no del cuerpo, en vez de convencerte mentalmente, es lo que te lleva a la satisfacción; forzar la acción donde no hay respuesta te conduce a la frustración.'
      ],
      'respond-then-inform': [
        'Combina las dos estrategias de responder e informar. Ante todo, como cualquier Generador, respondes, es decir: **esperas la respuesta sacral** —el sí o el no del cuerpo ante algo concreto—; no inicias por mente.',
        'Una vez tienes esa respuesta y vas a actuar, **informas a quienes se verán afectados** antes de lanzarte. Por tu capacidad de manifestar con rapidez, avisar reduce la fricción con el entorno y evita que tu velocidad genere resistencia. Saltarte cualquiera de los dos pasos —responder e informar— es la fuente habitual de tu desgaste.'
      ],
      'inform-before-acting': [
        'Como tu energía inicia e impacta sin avisar, tu diseño te pide **informar a las personas a las que vas a afectar antes de ponerte en marcha**. No se trata de pedir permiso ni justificarte: es simplemente comunicar lo que vas a hacer.',
        'El efecto es muy práctico: informar disuelve gran parte de la resistencia que encuentras cuando actúas por sorpresa. De hecho, informar incluso puede traerte aliados que facilitan el camino. Hacerlo te trae paz alrededor; omitirlo provoca el enfado y la oposición que, sin darte cuenta, acaban dificultando tu propio movimiento.'
      ],
      'wait-for-invitation': [
        'Para las cosas importantes —un trabajo, una relación, un compromiso grande— tu diseño te pide **esperar a ser reconocido e invitado** en lugar de ofrecerte sin que nadie lo pida.',
        'No es pasividad: sigues viviendo y preparándote, pero reservas tu sabiduría para quien la valora y la solicita. **La invitación correcta abre la puerta** a que tu don sea bien recibido; insistir sin ella suele traerte resistencia, amargura y rechazo. El reconocimiento y el éxito son la señal de que la espera ha valido la pena.'
      ],
      'wait-lunar-cycle': [
        'Antes de una decisión importante, tu diseño te pide **dejar pasar un ciclo lunar completo** —unos 28 días— en lugar de resolver de golpe.',
        'Durante ese tiempo, **conversas, muestreas distintos entornos y observas cómo cambia tu percepción** del asunto día a día. Como tu carta está completamente abierta, necesitas ese recorrido para distinguir lo que es tuyo de lo que solo estás reflejando. La claridad te llega por acumulación, por ver el asunto desde diferentes perspectivas, no por impulso.'
      ]
    },
    authority: {
      emotional: [
        'Tienes el **[Plexo solar](center:solarPlexus) definido**, que funciona en ondas: tu ánimo sube y baja con el tiempo, no por los hechos del momento. Tu regla de oro es clara: **no hay verdad en el ahora**.',
        'Para decidir bien, tu diseño te pide **esperar a recorrer la onda emocional** —dormir sobre ello, dejar pasar el tiempo, volver al asunto en distintos ánimos— antes de comprometerte. Tu claridad no es un destello instantáneo, sino lo que queda cuando la emoción se ha asentado. La prisa es tu principal enemiga.'
      ],
      sacral: [
        'Tu autoridad reside en el **[centro Sacral](center:sacral)**, que responde **en el momento** con un sonido o un impulso visceral —una especie de "ajá" de atracción o un "mmm-mmm" de rechazo— ante algo concreto: el cuerpo *dice* sí o no.',
        'Es una autoridad **inmediata y corporal**: no razona, reacciona. Funciona mejor con preguntas de sí/no y se nubla cuando tu mente intenta argumentar la decisión. Aprender a captar y confiar en esa respuesta instantánea del vientre es tu práctica central.'
      ],
      splenic: [
        'Tu autoridad reside en el **[Bazo](center:spleen)**, el centro más antiguo de la conciencia, ligado a la supervivencia, la salud y el instinto. Habla **en el presente y una sola vez**: un saber súbito, callado y espontáneo, sin repetición ni discurso.',
        'Es la autoridad más **sutil y fugaz**: no insiste ni argumenta, así que es fácil pasarla por alto o racionalizarla después. Tu práctica es **fiarte de ese primer impulso instintivo** —ese "sí" o "no" tranquilo del cuerpo— en el instante en que aparece, porque no suele volver a hablar.'
      ],
      ego: [
        'Tu autoridad reside en el **[centro del Corazón (Ego)](center:heart)**, el motor de la voluntad y el deseo. Aquí reconoces la decisión correcta con una pregunta sincera: **¿lo quiero de verdad?, ¿qué hay en esto para mí?** No es egoísmo, es honrar tu propio querer.',
        'Es una autoridad de **voluntad e impulso**, no de reflexión prolongada. Funciona cuando escuchas lo que de verdad deseas y eres capaz de comprometerte con ello; se pierde cuando aceptas cosas por deber o presión que tu corazón no respalda.'
      ],
      'self-projected': [
        'Tu verdad llega a través de la **voz**: al hablar del asunto en voz alta, **te oyes a ti mismo** y reconoces qué es coherente con tu identidad y tu dirección.',
        'Lo decisivo no es la opinión de quien escucha, sino el acto de **expresar y escucharte**. Por eso te conviene rodearte de personas de confianza que te dejen hablar sin influir, y prestar atención al tono y a las palabras que te salen: ahí, más que en el razonamiento, está tu guía.'
      ],
      mental: [
        'Llamada también autoridad ambiental o "caja de resonancia". No tienes una autoridad corporal interna fija: tu claridad no surge de dentro de golpe, **tu claridad surge del diálogo**.',
        'Tu práctica consiste en **hablar el asunto con personas de confianza y en el entorno adecuado**, no para que decidan por ti, sino para escucharte pensar en voz alta. El lugar y la compañía correctos son aquí parte del método: la decisión se va decantando con el tiempo y la conversación.'
      ],
      lunar: [
        'Como Reflector, no tienes ningún centro definido, así que no hay en ti una fuente interna fija: tu guía es el **tiempo**, un ciclo lunar completo —unos 28 días— antes de las decisiones importantes.',
        'Durante ese ciclo, **muestreas distintos estados, entornos y conversaciones**, y observas cómo evoluciona tu percepción del asunto. Tu claridad llega por **maduración** y acumulación de perspectivas, no por impulso: lo que sigue resonando tras recorrer el ciclo entero es lo fiable.'
      ]
    },
    // Second-person line bodies; the report composes the profile from two of
    // these (the line titles are reused from the shared `profile` block).
    profile: {
      '1': [
        'Buscas **seguridad a través del conocimiento**. Necesitas investigar, comprender los fundamentos y saber que el suelo que pisas es firme antes de actuar; sin esa base, te sientes inquieto.',
        'Es una energía **introspectiva y de estudio**: profundizas hasta sentirte experto, y esa solidez tranquiliza a los demás. Tu reto es no quedarte esperando indefinidamente a saberlo "todo" antes de dar el paso.'
      ],
      '2': [
        'Tienes **dones naturales** que ejerces casi sin esfuerzo, a menudo sin ser plenamente consciente de ellos. Necesitas **tiempo a solas** para que ese talento madure a tu ritmo.',
        'Tu dinámica es la de ser **llamado desde fuera**: los demás ven en ti algo que tú no terminas de nombrar, y te invitan a sacarlo. Tu equilibrio está entre respetar tu necesidad de retiro y responder a esas llamadas cuando son las correctas.'
      ],
      '3': [
        'Aprendes **probando**: por contacto directo con la vida, a base de intentos, descubrimientos y también tropiezos. Cada "error" es información, no fracaso.',
        'Es una energía **experimental y resiliente**: descubres lo que funciona descartando lo que no. Tu sabiduría es muy práctica, y resulta esencial que no leas tus traspiés como defectos personales, sino como el método mismo por el que estás diseñado para aprender.'
      ],
      '4': [
        'Funcionas a través de los **vínculos y la comunidad**. Las oportunidades —trabajo, amor, cambios— suelen llegarte por personas que ya conoces, no por desconocidos ni por salir a buscar en frío.',
        'Es una energía **cálida y relacional**, que necesita solidez en sus afectos. El consejo práctico clásico para ti es no soltar una base —un empleo, una situación— hasta tener la siguiente asegurada a través de tu red: las transiciones te funcionan mejor así.'
      ],
      '5': [
        'Vives bajo un **campo de proyección**: los demás depositan en ti expectativas, esperando soluciones prácticas. Lo hacen porque te ven como alguien capaz de resolver, casi a la manera de un salvador.',
        'Eso te da influencia y un papel natural de **liderazgo útil**, pero también te expone y exige: si no cumples lo proyectado, la misma fuerza puede volverse en tu contra. Tu reto es gestionar bien tu **reputación** y aclarar en lo posible las expectativas de los demás, poniendo cuidado en prometer solo lo que de verdad puedes entregar.'
      ],
      '6': [
        'Recorres **tres fases vitales**: (1) hasta cerca de los 30 años, vives como la línea 3, probando, tropezando y hasta colapsando; luego (2) vives una segunda etapa donde te retiras energéticamente a observar y procesar —etapa "sobre el tejado"—; y a partir de los 50, aproximadamente, emerges como **ejemplo y referente**.',
        'Tu orientación de fondo es la **objetividad y la madurez**: aspiras a vivir según lo que consideras correcto y verdadero, y a convertirte en modelo para otros. Entender en qué fase estás te ayuda a no juzgarte: la observación de la etapa media no es desconexión, sino preparación.'
      ]
    },
    definition: {
      'no-definition': [
        '**Ningún centro está definido**, todo tu bodygraph permanece abierto. No tienes una energía fija propia; en su lugar, tomas, amplificas y reflejas la energía de quienes te rodean.',
        'Esto te hace **extraordinariamente sensible al entorno**: con quién y dónde estás cambia por completo tu experiencia. Tu sabiduría nace precisamente de esa apertura total, siempre que aprendas a no confundir lo que solo reflejas con lo que es tuyo.'
      ],
      single: [
        'Todos tus centros definidos están **conectados en un solo bloque**. Tu energía fluye internamente sin interrupciones, lo que te da una sensación de **autosuficiencia**: accedes a tu propia consistencia sin depender de otros para "completarte".',
        'Tu reto suele ser el opuesto al de las definiciones divididas: como funcionas bien por ti mismo, puedes ensimismarte o costarte abrirte a la influencia ajena. Reconocer cuándo te conviene salir de tu propia burbuja es parte de tu aprendizaje.'
      ],
      split: [
        'Tus centros definidos forman **dos grupos separados**, sin un canal que los una por dentro. Por eso sueles experimentar una **búsqueda de conexión**: algo que tienda el puente entre tus dos partes.',
        'Ese puente te llega a menudo a través de otras personas —cuya energía completa el canal que te falta— o de tránsitos planetarios que activan la puerta intermedia. Esta separación/split no es una carencia: se trata de entender que hay compañías y entornos que te hacen sentir integrado, y esto sucede de manera natural.'
      ],
      'triple-split': [
        'Tus centros definidos se reparten en **tres grupos** separados. Tu cableado interno es más complejo y, con frecuencia, necesitas **más variedad de estímulos y de gente** para sentir que tus partes internas se conectan.',
        'Sueles funcionar bien en entornos diversos y con cierto movimiento; la quietud excesiva puede dejarte la sensación de que algo no termina de juntarse. Conocer esta estructura te ayuda a no interpretar esa necesidad de variedad como dispersión.'
      ],
      'quad-split': [
        'La más infrecuente: tus centros definidos forman **cuatro grupos** separados. Es un cableado muy fragmentado que, paradójicamente, suele pedir **más estructura, espacio y calma** para integrarse.',
        'Lejos de ser un problema, describe una manera muy particular de procesar la vida. Te beneficias de **darte tiempo** y de no presionarte para resolverlo todo de golpe: tus muchas partes se ordenan a su propio ritmo.'
      ]
    },
    // Second-person state lines for the centre walk-through (the report shows the
    // shared `fn` plus one of these). Framed so it's clear it's *your* chart.
    center: {
      head: {
        defined: 'Es uno de tus centros **definidos**: tienes una forma constante de inspirarte y de sentir la presión por entender.',
        open: 'Es uno de tus centros **abiertos**: amplificas las preguntas y la inquietud mental de los demás, y te conviene no dejarte arrastrar a resolver dudas que en realidad no son tuyas ni importan para tu vida.'
      },
      ajna: {
        defined: 'Es uno de tus centros **definidos**: tienes una manera fija y fiable de pensar, con opiniones y certezas estables.',
        open: 'Es uno de tus centros **abiertos**: tu mente es flexible, capaz de ver muchas perspectivas; tu trampa es la presión por aparentar seguridad o aferrarte a una certeza prestada, y tu don, no necesitar tener siempre una respuesta fija.'
      },
      throat: {
        defined: 'Es uno de tus centros **definidos**: tienes una voz y una forma de expresarte consistentes.',
        open: 'Es uno de tus centros **abiertos**: adaptas tu manera de comunicar según la compañía y puedes sentir la presión por hablar para llamar la atención; tu aprendizaje es esperar el momento adecuado en lugar de forzar la palabra.'
      },
      g: {
        defined: 'Es uno de tus centros **definidos**: tienes un sentido estable de identidad y rumbo.',
        open: 'Es uno de tus centros **abiertos**: tu identidad es más fluida y cambiante, y encuentra su dirección a través de los entornos y las personas adecuadas; tu clave es el **lugar**: estar en el sitio correcto orienta todo lo demás.'
      },
      heart: {
        defined: 'Es uno de tus centros **definidos**: tienes una voluntad consistente y la capacidad de sostener lo que prometes.',
        open: 'Es uno de tus centros **abiertos** (como en la mayoría de la gente): no necesitas demostrar tu valía ni medir tu fuerza de voluntad, y tu trampa es prometer de más para probarte. Aquí aprendes que tu valor no depende de tus logros.'
      },
      sacral: {
        defined: 'Es uno de tus centros **definidos**: tienes una energía de trabajo sostenible y renovable, pensada para emplearse a fondo en lo correcto y agotarse sanamente cada día.',
        open: 'Es uno de tus centros **abiertos**: no dispones de esa energía constante, así que para ti es vital reconocer cuándo es suficiente y no dejarte arrastrar por el ritmo de los demás hasta el agotamiento.'
      },
      spleen: {
        defined: 'Es uno de tus centros **definidos**: tienes una intuición y una sensación de salud constantes.',
        open: 'Es uno de tus centros **abiertos**: amplificas los miedos ajenos y tiendes a aferrarte a lo que no te conviene —relaciones, hábitos, situaciones— por temor a soltar; tu aprendizaje es no decidir desde el miedo y descubrir qué le sienta bien a tu cuerpo.'
      },
      solarPlexus: {
        defined: 'Es uno de tus centros **definidos**: vives tus propias olas emocionales y necesitas tiempo para tener claridad.',
        open: 'Es uno de tus centros **abiertos**: absorbes y amplificas las emociones del entorno —captas el ambiente de una sala— y tiendes a evitar la confrontación; tu reto es no apropiarte de estados de ánimo que en realidad has recogido de fuera.'
      },
      root: {
        defined: 'Es uno de tus centros **definidos**: tienes una forma constante de manejar la presión y el estrés.',
        open: 'Es uno de tus centros **abiertos**: amplificas la prisa y la sensación de tener que quitarte cuanto antes lo pendiente de encima; tu aprendizaje es no dejarte empujar a decisiones apresuradas solo para aliviar una presión que, en buena parte, es prestada.'
      }
    }
  },

  // Per-type practical block for the report (Phase 7): energy management, the
  // type's classic trap (its not-self), and the signpost feelings.
  typeReport: {
    generator: {
      energia: '**Gestión de tu energía** — Tienes el [centro Sacral](center:sacral) definido: una energía de trabajo **sostenible y renovable**, hecha para emplearse a fondo cada día en lo correcto y vaciarse sanamente al llegar la noche. La clave no es ahorrarla, sino **gastarla en aquello a lo que tu cuerpo responde de verdad**: entonces el cansancio es satisfactorio y al día siguiente la carga vuelve. Forzarte en lo que no te enciende te agota sin saciar.',
      trampa: '**La trampa de tu tipo** — Tu mayor desgaste viene de **iniciar desde la mente** en vez de esperar a tener algo a lo que responder: decir que sí por obligación, por lógica o por miedo a perder la oportunidad. Cuando te metes en algo que tu energía no respaldaba, aparece la frustración —la señal clásica del Generador que vive contra su diseño— y la sensación de estar atascado en cosas que no terminan de llenar.',
      senales: '**Señales de que vas por buen camino** — Tu brújula es la **satisfacción frente a la frustración**. Si al final del día sientes un cansancio a gusto y la sensación de haber empleado bien tu energía, vas bien encaminado. Si lo que predomina es la frustración y el hartazgo, suele ser señal de que te has comprometido con cosas a las que tu cuerpo no había dicho que sí.'
    },
    'manifesting-generator': {
      energia: '**Gestión de tu energía** — Como Generador, tienes el [Sacral](center:sacral) definido: energía de trabajo **sostenible y renovable**. Pero está conectada con la [Garganta](center:throat), lo que te hace **rápido, polifacético y no lineal**: saltas pasos, haces varias cosas a la vez y avanzas a gran velocidad cuando algo te enciende de verdad. Rindes al máximo si primero esperas la **respuesta del cuerpo** y luego **informas** a quienes te rodean antes de lanzarte.',
      trampa: '**La trampa de tu tipo** — **Dispersarte**: comprometerte con demasiadas cosas a las que tu cuerpo no había dicho que sí, o saltarte el aviso a los demás y chocar con su resistencia. Cuando inicias por mente en vez de responder, acumulas frustración —y a menudo algo de enfado— y proyectos a medio terminar.',
      senales: '**Señales de que vas por buen camino** — La **satisfacción**, y una cierta paz alrededor, frente a la frustración y el enfado. Si avanzas rápido en lo que te enciende y dejas las cosas rematadas, vas bien; si te notas disperso y rodeado de fricción, suele ser que dijiste que sí donde el cuerpo no acompañaba, o que no informaste.'
    },
    projector: {
      energia: '**Gestión de tu energía** — No tienes el [Sacral](center:sacral) definido, así que **no estás diseñado para un trabajo constante** ni para sostener el ritmo de un Generador: tu energía es irregular y se agota antes. Tampoco estás diseñado para iniciar desde cero —a diferencia del Manifestador, no tienes ningún motor conectado a la [Garganta](center:throat)—. Es por esto que tu don no está en la resistencia ni en la iniciación, tu don está en **ver, guiar y orientar** allí donde se te invita. Gestionarte bien pasa por **descansar y dosificarte** —dormir y soltar antes de quedar agotado— y por reservar tu atención para quien de verdad la valora: **saber cuándo decir sí y cuándo decir no**.',
      trampa: '**La trampa de tu tipo** — **Forzarte al ritmo de los demás** y **ofrecer tu visión y esfuerzo sin que nadie te lo pida**. Trabajar hasta el agotamiento para demostrar tu valía, o insistir sin ser invitado, trae resistencia, rechazo y amargura —la señal del Proyector que vive contra su diseño—.',
      senales: '**Señales de que vas por buen camino** — El **reconocimiento y el éxito** frente a la amargura. Cuando se te ve, se te invita y tu visión es bien recibida, vas por buen camino; cuando te sientes invisible, agotado y resentido, suele ser señal de que te ofreces donde no te han llamado o de que te exiges una energía que no tienes.'
    },
    manifestor: {
      energia: '**Gestión de tu energía** — Tienes un motor conectado a la [Garganta](center:throat) pero el [Sacral](center:sacral) sin definir: tu energía **no es constante, llega a impulsos** para iniciar y poner cosas en marcha, y luego necesita reposo. Estás hecho para **arrancar e impactar**, no para ejecutar de forma sostenida. Gestionarte bien es respetar esos ciclos de empuje y descanso (a veces bastante descanso), y proteger tu autonomía sin aislarte.',
      trampa: '**La trampa de tu tipo** — Actuar por sorpresa **sin informar** a quienes tu impacto va a alcanzar: eso provoca resistencia, oposición y enfado alrededor, que acaba poniéndote las cosas más difíciles. La otra gran trampa es **exigirte una constancia** que no es tuya, hasta quemarte, sin aceptar tu gran necesidad de reposo.',
      senales: '**Señales de que vas por buen camino** — La **paz** frente al enfado. Cuando informas y te mueves con libertad, encuentras calma a tu alrededor; cuando todo se llena de resistencia y conflicto, suele ser señal de que actuaste sin avisar o de que estás forzando un ritmo continuo que no te corresponde.'
    },
    reflector: {
      energia: '**Gestión de tu energía** — No tienes **ningún centro definido**: muestreas constantemente la energía de la gente y los lugares, así que **el entorno te afecta muchísimo** y tu energía varía mucho de un día a otro. Lo más importante para ti es **elegir bien dónde estás y con quién**, y no exigirte una constancia que no es propia de tu diseño. Para las decisiones importantes, date un **ciclo lunar** —unos 28 días— antes de cerrarlas.',
      trampa: '**La trampa de tu tipo** — Decidir con prisa, quedarte en entornos que no te sientan bien e **identificarte con lo que solo estás reflejando**: tomar por tuyos estados de ánimo o presiones que en realidad son del grupo. **Forzarte a ser siempre igual** va contra tu naturaleza cambiante.',
      senales: '**Señales de que vas por buen camino** — La **sorpresa y el deleite** frente a la decepción. Cuando los entornos y las compañías son los correctos, la vida te sorprende gratamente; cuando predomina la decepción, suele ser señal de que estás en el lugar o con la gente equivocados, o de que has decidido demasiado rápido.'
    }
  },

  // Public-domain root of each gate: its King Wen hexagram name (gate N ↔
  // hexagram N). Names follow the classic Wilhelm/Vogelmann Spanish edition.
  // Used as the I Ching anchor in the gate/channel info (Phase 6.D).
  iching: {
    1: 'Lo Creativo',
    2: 'Lo Receptivo',
    3: 'La Dificultad Inicial',
    4: 'La Necedad Juvenil',
    5: 'La Espera',
    6: 'El Conflicto',
    7: 'El Ejército',
    8: 'La Solidaridad',
    9: 'La Fuerza Domesticadora de lo Pequeño',
    10: 'El Porte',
    11: 'La Paz',
    12: 'El Estancamiento',
    13: 'La Comunidad con los Hombres',
    14: 'La Posesión de lo Grande',
    15: 'La Modestia',
    16: 'El Entusiasmo',
    17: 'El Seguimiento',
    18: 'El Trabajo en lo Echado a Perder',
    19: 'El Acercamiento',
    20: 'La Contemplación',
    21: 'La Mordedura Tajante',
    22: 'La Gracia',
    23: 'La Desintegración',
    24: 'El Retorno',
    25: 'La Inocencia',
    26: 'La Fuerza Domesticadora de lo Grande',
    27: 'La Nutrición',
    28: 'La Preponderancia de lo Grande',
    29: 'Lo Abismal (el Agua)',
    30: 'Lo Adherente (el Fuego)',
    31: 'El Influjo',
    32: 'La Duración',
    33: 'La Retirada',
    34: 'El Poder de lo Grande',
    35: 'El Progreso',
    36: 'El Oscurecimiento de la Luz',
    37: 'La Familia',
    38: 'El Antagonismo',
    39: 'El Impedimento',
    40: 'La Liberación',
    41: 'La Merma',
    42: 'El Aumento',
    43: 'El Desbordamiento',
    44: 'El Ir al Encuentro',
    45: 'La Reunión',
    46: 'La Subida',
    47: 'La Desazón',
    48: 'El Pozo',
    49: 'La Revolución',
    50: 'El Caldero',
    51: 'Lo Suscitativo (la Conmoción)',
    52: 'El Aquietamiento (la Montaña)',
    53: 'La Evolución',
    54: 'La Muchacha que se Casa',
    55: 'La Plenitud',
    56: 'El Andariego',
    57: 'Lo Suave (el Viento)',
    58: 'Lo Sereno (el Lago)',
    59: 'La Disolución',
    60: 'La Restricción',
    61: 'La Verdad Interior',
    62: 'La Preponderancia de lo Pequeño',
    63: 'Después de la Consumación',
    64: 'Antes de la Consumación'
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
      emotional: 'emocional (Plexo solar)',
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
    },
    definition: {
      'no-definition': 'sin definición',
      single: 'definición única',
      split: 'definición split',
      'triple-split': 'definición triple split',
      'quad-split': 'definición cuádruple split'
    },
    center: {
      head: 'Cabeza',
      ajna: 'Ajna',
      throat: 'Garganta',
      g: 'G',
      heart: 'Corazón (Ego)',
      sacral: 'Sacral',
      spleen: 'Bazo',
      solarPlexus: 'Plexo solar',
      root: 'Raíz'
    },
    planet: {
      sun: 'el Sol',
      earth: 'la Tierra',
      moon: 'la Luna',
      northNode: 'el Nodo Norte',
      southNode: 'el Nodo Sur',
      mercury: 'Mercurio',
      venus: 'Venus',
      mars: 'Marte',
      jupiter: 'Júpiter',
      saturn: 'Saturno',
      uranus: 'Urano',
      neptune: 'Neptuno',
      pluto: 'Plutón'
    }
  }
};
