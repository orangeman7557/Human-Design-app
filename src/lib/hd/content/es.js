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
        'El **tipo** es la primera y más importante distinción de tu carta: describe cómo está diseñada tu energía para interactuar con el mundo. Hay cinco —[Generador](type:generator), [Generador Manifestante](type:manifesting-generator), [Proyector](type:projector), [Manifestador](type:manifestor) y [Reflector](type:reflector)— y se determinan por qué centros están definidos y cómo se conectan con la [garganta](center:throat).',
        'Conocer el tipo importa sobre todo por una razón práctica: cada uno tiene una forma propia y sana de **gestionar su energía y tomar decisiones**. Vivir según el diseño propio —en lugar de imitar a otros tipos— es lo que el sistema asocia con menos resistencia y desgaste.',
        'No es una etiqueta de personalidad ni un horóscopo, sino una descripción mecánica de cómo funciona tu energía. El valor está en usarlo como espejo: observar si tu manera de moverte por la vida coincide con la que tu carta sugiere.'
      ]
    },
    strategy: {
      title: 'La estrategia',
      paragraphs: [
        'La **estrategia** es la forma correcta en que cada tipo entra en acción. Responde a una pregunta muy concreta: ¿cómo me comprometo con algo —un trabajo, una relación, una decisión— sin forzar la situación? Cada tipo tiene la suya.',
        'Las cinco son: el Generador **responde** a lo que la vida le presenta; el Generador Manifestante responde y luego informa; el Manifestador informa antes de actuar; el Proyector espera la invitación; y el Reflector espera un ciclo lunar. Todas comparten una misma idea: **dejar de iniciar desde la mente** y confiar en la señal del propio cuerpo y de la vida.',
        'Seguir la estrategia es, en la práctica, el experimento central del Diseño Humano. El sistema sugiere observar la diferencia entre las decisiones tomadas a favor de la estrategia y las tomadas en contra, y usar esa experiencia —no la teoría— como guía.'
      ]
    },
    authority: {
      title: 'La autoridad',
      paragraphs: [
        'La **autoridad** indica desde dónde tomar una decisión de forma fiable: qué parte de ti tiene la última palabra. En Diseño Humano la mente sirve para procesar información y aconsejar a otros, pero **no es de fiar para decidir sobre la propia vida**; la autoridad señala una fuente más corporal.',
        'Hay siete: emocional (Plexo Solar), sacral, esplénica (Bazo), del ego (Corazón), autoproyectada (G), mental y lunar. Se determinan por jerarquía según los centros definidos. Algunas operan **en el momento** (la sacral y la esplénica) y otras necesitan **tiempo** (la emocional, que pide esperar a recorrer la onda emocional antes de tener claridad).',
        'La autoridad es la herramienta más práctica de la carta: convierte la estrategia en un método concreto de decisión cotidiana. Antes de un sí o un no importante, indica a qué señal interna conviene atender.'
      ]
    },
    profile: {
      title: 'El perfil',
      paragraphs: [
        'El **perfil** describe el «cómo» de tu camino: el estilo con el que aprendes, te relacionas y cumples tu propósito. Se compone de dos números (por ejemplo 3/5), tomados de las líneas 1 a 6 del I Ching: la primera viene de tu Sol/Tierra de personalidad y la segunda, del de diseño.',
        'Cada línea aporta un matiz: 1 cimiento e investigación, 2 talento natural, 3 ensayo y error, 4 vínculos y red, 5 proyección y liderazgo práctico, 6 ejemplo y madurez. La combinación de las **dos líneas** describe una manera reconocible de moverse por la vida —más interna o más relacional, más experimental o más sólida.',
        'Mientras el tipo y la autoridad responden a *cómo decidir*, el perfil responde a *cómo se despliega tu experiencia*. Es una de las capas más reveladoras para el autoconocimiento, porque suele describir patrones que ya reconoces en tu historia.'
      ]
    },
    definition: {
      title: 'La definición',
      paragraphs: [
        'La **definición** describe cómo están conectados entre sí tus centros definidos: si forman un único bloque de energía o varios grupos separados. Habla de la consistencia interna —qué partes de ti están siempre «encendidas» y enlazadas— y de cómo se integra esa energía.',
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
        'Cada canal combina los temas de sus dos puertas (y de sus hexagramas del I Ching). Para una lectura detallada de un canal concreto, su panel ofrece un prompt listo para llevar a tu IA.'
      ]
    },
    gate: {
      title: 'Las puertas',
      paragraphs: [
        'Las **puertas** son las 64 activaciones posibles del bodygraph, una por cada hexagrama del I Ching. Cada puerta vive en un centro concreto y aporta un matiz específico de energía o carácter; al nacer, tus planetas «encienden» un conjunto de ellas.',
        'Una puerta activa que no encuentra a su pareja —la del otro extremo de su canal— queda **colgante**: aporta su tema pero busca completarse, a menudo a través de otra persona que tenga la puerta complementaria. Cuando las dos puertas de un canal están activas, el canal se forma y define sus dos centros.',
        'Para profundizar en una puerta concreta —su matiz, su hexagrama del I Ching y cómo se vive— su panel ofrece un prompt listo para tu IA.'
      ]
    },
    activation: {
      title: 'Las activaciones',
      paragraphs: [
        'Las **activaciones** son las posiciones de los planetas en tu nacimiento, traducidas a puertas y líneas del Diseño Humano. Cada cuerpo «enciende» una puerta concreta (y su línea), y el conjunto de todas ellas es lo que construye tu carta: centros, canales, tipo, autoridad y perfil.',
        'Se calculan en **dos momentos**, de ahí las dos columnas: *Personality* usa la posición en el instante del nacimiento (lo consciente); *Design* usa la de unos 88 días antes —88° de arco solar— (lo inconsciente). Por eso tienes dos activaciones por planeta.',
        'No todas pesan igual: el **Sol y la Tierra** concentran la mayor parte del significado y el resto matiza; la columna *Peso* resume esa influencia relativa. Toca una activación para abrir la puerta correspondiente.'
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
        'Una variante del [Generador](type:generator) (juntos rondan el **70 % de la población**): también tiene el [Sacral](center:sacral) definido, pero conectado —directa o indirectamente— con la [garganta](center:throat). Eso le da la energía generadora del Generador y, además, capacidad de manifestar y materializar con rapidez.',
        'Su estrategia es **responder y luego informar**: primero espera la respuesta sacral —el sí o el no del cuerpo— y, una vez lo tiene, avisa a quienes se verán afectados antes de lanzarse. Tiende a ser **polifacético, veloz y no lineal**: salta pasos, hace varias cosas a la vez y a veces tiene que volver atrás a rematar lo que se saltó.',
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
        'Alrededor del **9 % de la población**, es el tipo más independiente. Tiene un centro motor conectado a la [garganta](center:throat), pero **el [Sacral](center:sacral) no está definido**, así que su energía no es constante: llega a impulsos, para iniciar y poner cosas en marcha, y luego necesita reposo.',
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
        'La autoridad más extendida. Quien la tiene posee el **[Plexo Solar](center:solarPlexus) definido**, que funciona en ondas: el ánimo sube y baja con el tiempo, no por los hechos del momento. La regla de oro es clara: **no hay verdad en el ahora**.',
        'Para decidir bien, el diseño pide **esperar a recorrer la onda emocional** —dormir sobre ello, dejar pasar el tiempo, volver al asunto en distintos ánimos— antes de comprometerse. La claridad no es un destello instantáneo, sino lo que queda cuando la emoción se ha asentado. La prisa es su principal enemiga.'
      ]
    },
    sacral: {
      title: 'Autoridad sacral',
      paragraphs: [
        'La autoridad de la mayoría de Generadores. Reside en el **[centro Sacral](center:sacral)**, que responde **en el momento** con un sonido o un impulso visceral —una especie de «ajá» de atracción o un «mmm-mmm» de rechazo— ante algo concreto.',
        'Es una autoridad **inmediata y corporal**: no razona, reacciona. Funciona mejor con preguntas de sí/no y se nubla cuando la mente intenta argumentar la decisión. Aprender a captar y confiar en esa respuesta instantánea del vientre es la práctica central de quien la tiene.'
      ]
    },
    splenic: {
      title: 'Autoridad esplénica',
      paragraphs: [
        'Reside en el **[Bazo](center:spleen)**, el centro más antiguo de la conciencia, ligado a la supervivencia, la salud y el instinto. Habla **en el presente y una sola vez**: un saber súbito, callado y espontáneo, sin repetición ni discurso.',
        'Es la autoridad más **sutil y fugaz**: no insiste ni argumenta, por lo que es fácil pasarla por alto o racionalizarla después. Quien la tiene aprende a **fiarse de ese primer impulso instintivo** —ese «sí» o «no» tranquilo del cuerpo— en el instante en que aparece, porque no suele volver a hablar.'
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
        'También llamada autoridad ambiental o «caja de resonancia», propia de algunos Proyectores sin centros internos definidos para decidir. **No hay una autoridad corporal interna**: la claridad no surge de dentro de golpe, sino del diálogo.',
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
        'Es una energía **introspectiva y de estudio**: profundiza hasta sentirse experta, y esa solidez tranquiliza a los demás. Su reto es no quedarse esperando indefinidamente a saberlo «todo» antes de dar el paso.'
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
        'La tercera línea aprende **probando**: por contacto directo con la vida, a base de intentos, descubrimientos y también tropiezos. Cada «error» es información, no fracaso.',
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
        'La sexta línea recorre **tres fases vitales**. Hasta cerca de los 30 vive como una tercera línea, probando y tropezando; luego se retira a observar —«sobre el tejado»— durante una segunda etapa; y a partir de los 50, aproximadamente, emerge como **ejemplo y referente**.',
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
        'Todos los centros definidos están **conectados en un solo bloque**. La energía fluye internamente sin interrupciones, lo que da una sensación de **autosuficiencia**: la persona accede a su propia consistencia sin depender de otros para «completarse».',
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
  center: {
    head: {
      title: 'Centro de la Cabeza',
      paragraphs: [
        'Es un centro de **presión mental**: la fuerza que nos empuja a pensar, preguntar e inspirarnos. Genera las preguntas y la curiosidad, pero no las responde —eso es tarea del [Ajna](center:ajna)—.',
        '**Definido**, aporta una forma constante de inspirarse y de sentir la presión por entender. **Indefinido**, amplifica las preguntas y la inquietud mental de los demás: aquí conviene no dejarse arrastrar a resolver dudas que en realidad no son tuyas ni importan para tu vida.'
      ]
    },
    ajna: {
      title: 'Centro Ajna',
      paragraphs: [
        'Es el centro de la **mente y la conceptualización**: procesa la información, forma ideas y da estructura a lo que pensamos, trabajando con la presión que le llega de la [Cabeza](center:head).',
        '**Definido**, da una manera fija y fiable de pensar, con opiniones y certezas estables. **Indefinido**, ofrece una mente **flexible y abierta**, capaz de ver muchas perspectivas; su trampa es la presión por aparentar seguridad o aferrarse a una certeza prestada. Su don es no necesitar tener siempre una respuesta fija.'
      ]
    },
    throat: {
      title: 'Centro de la Garganta',
      paragraphs: [
        'Es el centro de la **comunicación y la manifestación**: donde la energía se convierte en voz y en acción. Todo lo que se expresa o se materializa pasa por aquí.',
        '**Definido**, da una voz y una forma de expresarse consistentes. **Indefinido**, adapta su manera de comunicar según la compañía y puede sentir la **presión por hablar para llamar la atención**; su aprendizaje es esperar el momento adecuado en lugar de forzar la palabra.'
      ]
    },
    g: {
      title: 'Centro G',
      paragraphs: [
        'Es el centro de la **identidad, el amor y la dirección**: el sentido de quién eres y hacia dónde va tu vida. Está ligado también a la sensación de estar en el lugar correcto.',
        '**Definido**, aporta un sentido estable de identidad y rumbo. **Indefinido**, vive una identidad más **fluida y cambiante**, que encuentra su dirección a través de los entornos y las personas adecuadas; la clave aquí es el **lugar**: estar en el sitio correcto orienta todo lo demás.'
      ]
    },
    heart: {
      title: 'Centro del Corazón (Ego)',
      paragraphs: [
        'Es el centro de la **voluntad, el ego y la autoestima**, ligado al mundo material y a la capacidad de comprometerse y cumplir promesas. Es un motor que funciona a pulsos de fuerza de voluntad, no de forma continua.',
        '**Definido**, da una voluntad consistente y la capacidad de sostener lo que se promete. **Indefinido** —la mayoría—, **no necesita demostrar su valía** ni medir su fuerza de voluntad; su trampa es prometer de más para probarse. Aquí se aprende que el valor propio no depende de los logros.'
      ]
    },
    sacral: {
      title: 'Centro Sacral',
      paragraphs: [
        'Es el gran **motor de energía vital, trabajo y sexualidad**: la fuente generativa del sistema. Define a Generadores y Generadores Manifestantes, y es la clave de su forma de gestionar la energía.',
        '**Definido**, ofrece una energía de trabajo **sostenible y renovable**, pensada para emplearse en lo correcto y agotarse sanamente cada día. **Indefinido**, no dispone de esa energía constante: aquí es vital **reconocer cuándo es suficiente** y no dejarse arrastrar por el ritmo de los demás hasta el agotamiento.'
      ]
    },
    spleen: {
      title: 'Centro del Bazo',
      paragraphs: [
        'Es el centro del **instinto, la intuición y la supervivencia**, ligado al sistema inmune, la salud y la sensación de bienestar en el presente. Habla bajo, en el ahora y una sola vez.',
        '**Definido**, da una intuición y una sensación de salud constantes. **Indefinido**, **amplifica los miedos** ajenos y tiende a aferrarse a lo que no le conviene —relaciones, hábitos, situaciones— por temor a soltar; su aprendizaje es no decidir desde el miedo y descubrir qué le sienta bien al cuerpo.'
      ]
    },
    solarPlexus: {
      title: 'Centro del Plexo Solar',
      paragraphs: [
        'Es el centro de las **emociones, los sentimientos y los estados de ánimo**, que funciona en **ondas** que suben y bajan con el tiempo. Cuando está definido, marca una autoridad emocional: **no hay verdad en el momento**.',
        '**Definido**, vive sus propias olas emocionales y necesita tiempo para tener claridad. **Indefinido**, **absorbe y amplifica las emociones del entorno** —capta el ambiente de una sala— y tiende a evitar la confrontación; su reto es no apropiarse de estados de ánimo que en realidad ha recogido de fuera.'
      ]
    },
    root: {
      title: 'Centro Raíz',
      paragraphs: [
        'Es un centro de **presión y adrenalina**: el empuje que nos pone en marcha y el estrés que nos urge a actuar para liberarnos de esa presión. Da el pulso para arrancar las cosas.',
        '**Definido**, aporta una forma constante de manejar la presión y el estrés. **Indefinido**, **amplifica la prisa** y la sensación de tener que quitarse cuanto antes lo pendiente de encima; su aprendizaje es no dejarse empujar a decisiones apresuradas solo para aliviar una presión que, en buena parte, es prestada.'
      ]
    }
  },

  // ── Activations (Phase 6.E): the table's column headers and planets. ──
  activationCol: {
    personality: {
      title: 'Personality (consciente)',
      paragraphs: [
        'La columna **Personality** representa lo **consciente**: lo que reconoces como «tú», tu mente y tu personalidad. Se calcula con la posición de los planetas en el **instante exacto del nacimiento**.',
        'Es la parte de la carta con la que te identificas y de la que sueles ser consciente. En el bodygraph se pinta en blanco.'
      ]
    },
    design: {
      title: 'Design (inconsciente)',
      paragraphs: [
        'La columna **Design** representa lo **inconsciente**: el cuerpo, lo heredado, lo que opera sin que lo controles y que otros ven en ti antes que tú. Se calcula unos **88 días antes del nacimiento** (88° de arco solar).',
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
        'El **Sol** es la activación más importante de la carta: marca tu **expresión esencial**, la energía que irradias y el propósito que encarnas. Con la Tierra concentra la mayor parte del significado (~70 %).',
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
        'Habla del «de dónde vienes» en términos de ambiente y dirección, más que de personalidad.'
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
        'Saturno es la **disciplina y el límite**: el «juez» que exige rigor, corrige y marca lo que aprendes a base de constancia.',
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
      solarPlexus: 'Plexo Solar',
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
