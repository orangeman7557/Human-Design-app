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
    bodygraph: {
      title: 'El bodygraph',
      paragraphs: [
        'El **bodygraph** es el esquema gráfico del cuerpo sobre el que se dibuja la carta: las nueve formas geométricas son los [centros](concept:center) y las líneas que los conectan son los [canales](concept:channel), que van de una puerta a otra. Cada centro gobierna una función concreta y, en conjunto, dibujan cómo circula la energía.',
        'Lo que hace única a cada carta es cuáles de esos [centros](concept:center), [canales](concept:channel) y [puertas](concept:gate) están activos: de esa combinación salen el tipo, la autoridad y la forma de funcionar de la persona.',
        'La distinción clave es si cada centro está **definido** o **indefinido** (abierto). Un centro **definido** —coloreado en el bodygraph— funciona de forma fija y fiable: es una energía consistente, propia y constante. Un centro **indefinido** —que se ve vacío— no es un defecto: es una zona abierta donde se recibe y amplifica la energía de los demás y del entorno; es donde más se aprende, pero también donde es fácil dejarse condicionar y confundir lo ajeno con lo propio.'
      ]
    },
    type: {
      title: 'Los tipos',
      paragraphs: [
        'El **tipo** es la primera y más importante distinción de una carta: describe cómo está diseñada la energía de la persona para interactuar con el mundo. Hay cinco —[Generador](type:generator), [Generador Manifestante](type:manifesting-generator), [Proyector](type:projector), [Manifestador](type:manifestor) y [Reflector](type:reflector)— y se determinan por qué centros están definidos y cómo se conectan con la [Garganta](center:throat).',
        'Conocer el tipo importa sobre todo por una razón práctica: cada uno tiene una forma propia y sana de **gestionar su energía y tomar decisiones**. Vivir según el diseño propio —en lugar de imitar a otros tipos— es lo que el sistema asocia con menos resistencia y desgaste.',
        'No es una etiqueta de personalidad ni un horóscopo, sino una descripción mecánica de cómo funciona la energía de cada uno. El valor está en usarlo como espejo: observar si la manera propia de moverse por la vida coincide con la que la carta sugiere.'
      ]
    },
    strategy: {
      title: 'La estrategia',
      paragraphs: [
        'La **estrategia** es la forma correcta en que cada tipo debe actuar para vivir alineado. Responde a una pregunta muy concreta: ¿cómo comprometerse con algo —un trabajo, una relación, una decisión— sin forzar la situación? Cada tipo tiene la suya.',
        'Las cinco son: el Generador *responde* a lo que la vida le presenta; el Generador Manifestante *responde y luego informa*; el Manifestador *informa antes de actuar*; el Proyector *espera la invitación*; y el Reflector *espera un ciclo lunar*. Todas comparten una misma idea: **dejar de iniciar desde la mente** y confiar en la señal del propio cuerpo y de la vida.',
        '**Seguir la estrategia es, en la práctica, el experimento central del Diseño Humano**. El sistema sugiere observar la diferencia entre las decisiones tomadas a favor de la estrategia y las tomadas en contra, y usar esa experiencia —no la teoría— como guía.'
      ]
    },
    authority: {
      title: 'La autoridad',
      paragraphs: [
        'La **autoridad** indica desde dónde tomar una decisión de forma fiable: qué parte de uno tiene la última palabra. En Diseño Humano la mente sirve para procesar información y aconsejar a otros, pero **la mente no es de fiar para decidir sobre la propia vida**; la autoridad nace siempre de una fuente más corporal.',
        'Hay siete: emocional (Plexo solar), sacral, esplénica (Bazo), del ego (Corazón), autoproyectada (G), mental/ambiental y lunar. Se determinan por jerarquía según los centros definidos. Algunas operan **en el momento** (la sacral y la esplénica) y otras necesitan **tiempo** (la emocional, que pide esperar a recorrer la onda emocional antes de tener claridad).',
        'La autoridad es la herramienta más práctica de la carta: convierte la estrategia en un método concreto de decisión cotidiana. Antes de un sí o un no importante, indica a qué señal interna conviene atender.'
      ]
    },
    profile: {
      title: 'El perfil',
      paragraphs: [
        'El **perfil** describe el "cómo" del camino de cada uno: el estilo con el que una persona aprende, se relaciona y cumple su propósito. Se compone de dos números (por ejemplo 3/5), tomados de las líneas 1 a 6 del I Ching: la primera viene del Sol/Tierra de *personalidad* y la segunda, del Sol/Tierra de *diseño*.',
        'Cada línea aporta un matiz: 1- cimiento e investigación, 2- talento natural, 3- ensayo y error, 4- vínculos y red, 5- proyección y liderazgo práctico, 6- ejemplo y madurez. La combinación de las **dos líneas** describe una manera reconocible de moverse por la vida —más interna o más relacional, más experimental o más sólida.',
        'Mientras el tipo y la autoridad responden a *cómo decidir*, el perfil responde a *cómo se despliega la experiencia*. Es una de las capas más reveladoras para el autoconocimiento, porque suele describir patrones que uno ya reconoce en su propia historia. De las dos líneas, la primera se vive de manera más consciente, y la segunda, más inconsciente. La línea inconsciente resulta, en general, más visible para los demás que para uno mismo.'
      ]
    },
    definition: {
      title: 'La definición',
      paragraphs: [
        'La **definición** describe cómo están conectados entre sí los centros definidos de una carta: si forman un único bloque de energía o varios grupos separados. Habla de la consistencia interna —qué partes de la persona están siempre "encendidas" y enlazadas— y de cómo se integra esa energía.',
        'Las variantes son: sin definición ([Reflector](type:reflector), ningún centro definido), única (todo conectado en un grupo), split (dos grupos), triple split (tres) y cuádruple split (cuatro). Una definición única tiende a sentirse **autosuficiente**; las divididas suelen experimentar una **búsqueda de conexión**, a menudo a través de otras personas o de puertas concretas que tienden el puente entre los grupos.',
        'En la práctica, la definición ayuda a entender qué tipo de compañía o entornos completan a cada uno. No es mejor ni peor tener más o menos divisiones: cada una describe una forma distinta de funcionar y de relacionarse.'
      ]
    },
    center: {
      // The nine-centre list (chips with the chart's defined/open state) is
      // injected by getConceptInfo between `paragraphs` and `after`; the brief
      // per-centre descriptions live in `centerBrief` below.
      title: 'Los centros',
      paragraphs: [
        'Los **centros** son los nueve focos de energía del bodygraph, cada uno ligado a una función concreta. Heredan la idea de los chakras, pero aquí lo decisivo es si cada centro está **definido** o **indefinido** (abierto). Los nueve centros y sus funciones son:'
      ],
      after: [
        'Un centro **definido** funciona de forma fija y fiable: es una energía consistente que se aporta siempre, propia y constante. Un centro **indefinido** no es un defecto: es una zona abierta donde se recibe y amplifica la energía de los demás y del entorno; es donde más se aprende, pero también donde es fácil dejarse condicionar y confundir lo ajeno con lo propio.',
        'Mirar los centros es una de las claves más prácticas para la **gestión de la energía**: los definidos marcan lo que cada uno ofrece de manera estable, y los indefinidos, dónde conviene no tomar decisiones desde una presión prestada.'
      ]
    },
    channel: {
      title: 'Los canales',
      paragraphs: [
        'Los **canales** son las 36 conexiones del bodygraph: cada uno une dos puertas situadas en centros distintos. Un canal **completo** —con sus dos puertas activas— enlaza esos dos centros, los define y crea una corriente de energía estable y fiable entre ellos.',
        'Los canales son los que, en conjunto, determinan el **tipo, la definición y qué centros están definidos**. Por eso son la columna vertebral mecánica de la carta: no describen un rasgo aislado, sino una forma constante en que dos áreas de la energía trabajan juntas.',
        'Cada canal combina los temas de sus dos puertas (y de sus hexagramas del I Ching). Para una lectura detallada de un canal concreto, puedes utilizar la opción de "saber más usando IA".'
      ]
    },
    gate: {
      title: 'Las puertas',
      paragraphs: [
        'Las **puertas** son las 64 posiciones del bodygraph que un planeta puede encender, una por cada hexagrama del I Ching. Cada puerta vive en un centro concreto y aporta un matiz específico de energía o carácter; en el nacimiento, los planetas "encienden" un conjunto de ellas.',
        'Una puerta activa que no encuentra a su pareja —la del otro extremo de su canal— queda **colgante**: aporta su tema pero busca completarse, a menudo a través de otra persona que tenga la puerta complementaria. Cuando las dos puertas de un canal están activas, el canal se forma y define sus dos centros.',
        'Para profundizar en una puerta concreta —su matiz, su hexagrama del I Ching y cómo se vive— puedes utilizar la opción de "saber más usando IA".'
      ]
    },
    activation: {
      title: 'Las activaciones',
      paragraphs: [
        'Las **activaciones** son las posiciones de los planetas en el momento del nacimiento, traducidas a puertas y líneas del Diseño Humano. Cada cuerpo "enciende" una puerta concreta (y su línea), y el conjunto de todas ellas es lo que construye la carta: centros, canales, tipo, autoridad y perfil.',
        'Se calculan en **dos momentos**, de ahí las dos columnas: *Personalidad* usa la posición en el instante del nacimiento (lo consciente); *Diseño* usa la de unos 88 días antes —88° de arco solar— (lo inconsciente). Por eso hay dos activaciones por planeta.',
        'Cada activación se escribe como **puerta.línea**: la puerta (de la 1 a la 64) y, dentro de ella, la línea (de la 1 a la 6). Por ejemplo, un **30.3 en el Sol** quiere decir que el Sol activa la **puerta 30 en su línea 3** —el tema de la puerta 30 leído con el matiz que aporta la línea 3—. Es la unidad básica con la que se construye toda la carta.',
        'No todas pesan igual: el **Sol y la Tierra** concentran la mayor parte del significado y el resto matiza; la columna *Peso* resume esa influencia relativa. Toca una activación para abrir la puerta correspondiente. Y para ver las líneas, consulta las posibles líneas en el [perfil](concept:profile).'
      ]
    },
    signal: {
      title: 'Las señales',
      paragraphs: [
        'Las **señales** son la forma más práctica de comprobar sobre la marcha si una persona está viviendo según su diseño o contra él. No describen un rasgo de carácter: son un **estado que se nota**, y que cambia según cómo se esté decidiendo y actuando.',
        'Cada [tipo](concept:type) tiene su propio par. La **señal de alineamiento** aparece cuando se sigue [la estrategia](concept:strategy) y se decide desde [la autoridad](concept:authority); la **señal de desalineamiento** es lo que asoma cuando no. Para un [Generador](type:generator) el par es satisfacción y frustración; para un [Proyector](type:projector), éxito y amargura; para un [Manifestador](type:manifestor), paz y enfado; para un [Reflector](type:reflector), sorpresa y decepción.',
        'En Diseño Humano se las suele llamar la *firma* y el *tema del no-yo*. Aquí se nombran como señales porque es lo que son en la práctica: un aviso que se puede consultar en cualquier momento del día sin saber nada del sistema. Si predomina la de desalineamiento, lo que suele merecer la pena no es esforzarse más, sino revisar qué se decidió y cómo.'
      ]
    },
    cross: {
      title: 'La cruz de encarnación',
      paragraphs: [
        'La **cruz de encarnación** es el tema de fondo de una vida: la dirección general hacia la que apunta el diseño de una persona. Se la suele presentar como el "propósito", pero conviene tomarla con calma y ligereza — no se trata de intentar entenderla, aplicarla o forzarla. Si uno vive alineado con su diseño ([estrategia](concept:strategy) y [autoridad](concept:authority)), la cruz es un telón de fondo que se despliega de manera natural a lo largo de la vida.',
        'La componen **cuatro puertas**: las puertas sol-tierra de [Personalidad](activationCol:personality) y sol-tierra de [Diseño](activationCol:design). Son las [activaciones](concept:activation) de más peso de la carta —la literatura les atribuye la mayor parte de la impronta—, así que la cruz viene a resumir sus temas dominantes.',
        'Se llama «cruz» porque surge del **cruce de dos ejes**: el eje personalidad-diseño (consciente ↔ inconsciente) y el eje Sol-Tierra (lo que se expresa e impulsa ↔ lo que sostiene y estabiliza).',
        'El **ángulo** matiza hacia dónde se dirige esa energía:',
        { bullets: [
          '**Ángulo derecho** — geometría *personal*: el camino se recorre sobre todo a través de la propia experiencia.',
          '**Ángulo izquierdo** — geometría *transpersonal*: se cumple en relación con otros, a través de la gente que uno se cruza.',
          '**Yuxtaposición** — geometría *fija*: un papel muy concreto, sostenido con bastante independencia del entorno.'
        ] },
        'El ángulo se deduce directamente del [perfil](concept:profile) (por ejemplo, el perfil 1/3 es ángulo derecho, el perfil 5/2 es ángulo izquierdo, etc.). Los nombres vienen de la **geometría del mandala** —de la separación angular entre el Sol de Personalidad y el de Diseño, próxima a un ángulo recto en un caso y contigua en los otros—, no de ninguna cualidad mejor ni peor.'
      ]
    }
  },

  // ── Per-cross interpretation, keyed by the cross's NAME without its angle
  // prefix. Crosses that share a name share the same four gates (rotated), so
  // 16 right-angle texts cover all 64 right-angle crosses. Missing entries fall
  // back to the reading composed from the gate themes (see content/index.js).
  crossEssence: {
    'of the Sphinx': [
      'La esfinge es la figura que **guarda el camino y plantea el enigma**: no se mueve, pero orienta a quien pasa. Ese es el fondo de esta cruz, construida sobre la [puerta 1](gate:1) y la [puerta 2](gate:2) —la expresión de lo propio y la dirección— sostenidas por el [7](gate:7) y el [13](gate:13), el papel que se ocupa ante los demás y la capacidad de escuchar lo que traen.',
      'En la práctica se traduce en algo muy concreto: **estas personas dan dirección**. No tanto diciendo a otros lo que tienen que hacer como **siendo ellas mismas de una forma tan definida que el resto se orienta al verlas**. La dirección no se busca fuera; sale de dentro y luego se reconoce.',
      'El riesgo es querer dirigir a propósito, empujando. La esfinge no persigue a nadie: espera a que lleguen. Cuando la expresión propia es honesta y no se fuerza el papel, la orientación aparece sola.'
    ],
    'of Laws': [
      'Esta cruz mira **cómo se ordenan las cosas para que duren**. La [puerta 3](gate:3) trae el arranque difícil de todo lo nuevo y la [50](gate:50), los valores que sostienen a un grupo; debajo, el [60](gate:60) pone el límite y el [56](gate:56), el estímulo que empuja a salir de él.',
      'De ahí el nombre: lo que aquí se llama «ley» no es una norma impuesta, sino **el orden que hace que algo funcione y se pueda repetir**. Estas personas suelen tener buen olfato para lo que sostiene un proyecto, una familia o una comunidad — y para lo que la va a romper.',
      'La tensión propia está entre el límite y el impulso: **ordenar sin agarrotar**. Cuando se resuelve bien, lo que se construye se aguanta solo; cuando se resuelve mal, aparecen reglas por las reglas.'
    ],
    'of Explanation': [
      'Aquí lo central es **hacer comprensible lo que aún no lo es**. La [puerta 4](gate:4) es la respuesta que se ofrece a una duda y la [49](gate:49), el principio por el que algo se acepta o se rompe; el [23](gate:23) y el [43](gate:43) aportan la intuición singular y la capacidad de decirla en palabras que los demás puedan recibir.',
      'Por eso se llama de la explicación: no es tener razón, es **traducir**. Una idea que dentro se ve clarísima y fuera no se entiende, hasta que se encuentra la forma. Ese trabajo de encontrar la forma es el tema de vida.',
      'El desgaste típico llega al explicar antes de tiempo o a quien no ha preguntado — ahí la explicación suena a rareza. Con el momento adecuado, la misma frase abre una puerta.'
    ],
    'of Consciousness': [
      'Esta cruz trabaja con **el darse cuenta**. La [puerta 5](gate:5) marca el ritmo y la constancia, y la [35](gate:35), el apetito de experiencia nueva; por debajo, el [64](gate:64) llena la cabeza de imágenes sin ordenar y el [63](gate:63) las somete a duda.',
      'La combinación describe a alguien que **convierte lo vivido en comprensión**: acumula experiencias, las deja reposar en el ritmo propio y, con tiempo, saca de ahí una claridad que otros no ven. La consciencia no se piensa, se destila.',
      'La trampa es querer entenderlo todo ya, o romper el propio ritmo persiguiendo experiencias. La claridad llega tarde y llega sola; forzarla la enturbia.'
    ],
    'of Eden': [
      'El Edén es el paraíso **del que hay que salir**. Esa es la imagen exacta de esta cruz: la [puerta 36](gate:36) trae la crisis y lo aún no vivido, y la [6](gate:6), la fricción y la intimidad; debajo, el [11](gate:11) aporta las ideas y el [12](gate:12), la prudencia al expresarlas.',
      'Habla de una vida que **se hace a base de meterse en la experiencia**, incluida la que duele. No es una cruz de retiro contemplativo: lo suyo es el contacto, el roce con otros, la crisis que enseña algo que no se aprendía de otro modo.',
      'La clave práctica está en el ritmo. La [puerta 6](gate:6) abre y cierra, así que **no todo momento es momento**: entrar cuando toca evita convertir la experiencia en desgaste, y la prudencia del [12](gate:12) es aliada, no freno.'
    ],
    'of Contagion': [
      'Contagio aquí no es enfermedad, es **lo que se transmite sin proponérselo**. La [puerta 8](gate:8) aporta lo que uno tiene para contribuir y la [14](gate:14), los recursos para hacerlo; el [30](gate:30) pone el deseo ardiente y el [29](gate:29), la capacidad de comprometerse a fondo.',
      'De ahí una vida marcada por **el ejemplo**: estas personas mueven a otros por cómo se entregan a lo suyo, no por lo que predican. Cuando algo les prende de verdad, el entusiasmo se pega.',
      'El cuidado está en a qué se dice que sí. El [29](gate:29) se compromete con facilidad y el [30](gate:30) desea intensamente: **un sí dado en caliente puede costar años**. Elegir bien es aquí media vida.'
    ],
    'of Planning': [
      'Esta cruz organiza **para que la comunidad funcione**. La [puerta 9](gate:9) da el foco en el detalle y la [16](gate:16), el entusiasmo y la destreza; debajo, el [40](gate:40) aporta la voluntad de trabajar (y de retirarse a descansar) y el [37](gate:37), los acuerdos que mantienen unido al grupo.',
      'Lo que la define es la mirada larga: **ver los pasos que llevan de aquí a allí** y repartirlos. No es control, es estructura al servicio de algo compartido — el plan que hace posible que un grupo llegue a algún sitio.',
      'El punto delicado es el trato: el [40](gate:40) y el [37](gate:37) forman el canal de los pactos. **Un acuerdo aceptado sin ganas se cobra caro**, y el descanso no es opcional; sin él, la planificación se vuelve carga.'
    ],
    'of the Vessel of Love': [
      'Un receptáculo es **lo que contiene y sostiene**. Esta cruz reúne las cuatro puertas del amor: el [10](gate:10), amarse y comportarse como uno es; el [15](gate:15), el amor a la humanidad en toda su variedad; el [46](gate:46), el amor al cuerpo y a estar aquí; y el [25](gate:25), el amor universal e inocente.',
      'No habla de romanticismo, sino de **una forma de estar en el mundo que abre espacio**. Estas personas suelen ser el sitio donde otros se sienten aceptados sin tener que justificarse — y eso ocurre por lo que son, no por lo que hacen.',
      'La condición es que el amor empiece por dentro. Un receptáculo vacío no sostiene a nadie: **la [puerta 10](gate:10) exige ser fiel a uno mismo primero**, y de ahí sale lo demás.'
    ],
    'of Service': [
      'Esta cruz está hecha para **mejorar lo que hay**. La [puerta 17](gate:17) aporta la opinión y la [18](gate:18), el ojo para lo que falla; debajo, el [58](gate:58) trae la vitalidad y el gusto por vivir, y el [52](gate:52), la quietud para mirar sin moverse.',
      'Servir aquí significa **corregir con criterio**: ver el fallo, sí, pero al servicio de que la cosa funcione mejor para todos. Bien vivido, es una de las energías más útiles que existen; el grupo entero se beneficia.',
      'El filo es evidente: la misma puerta que perfecciona puede volverse crítica sin freno, sobre todo hacia dentro. **El [58](gate:58) recuerda para qué era todo esto** — la alegría. Si corregir deja de dar alegría, algo se ha torcido.'
    ],
    'of the Four Ways': [
      'La [puerta 19](gate:19) pide y se acerca, la [33](gate:33) se retira a digerir lo vivido, la [44](gate:44) reconoce patrones del pasado y la [24](gate:24) vuelve una y otra vez sobre la misma idea. Cuatro movimientos distintos: de ahí el nombre.',
      'Describe una vida que **avanza alternando**: acercarse y retirarse, entrar en el grupo y salir a procesarlo. No es incoherencia, es el método — se necesita el repliegue para que el acercamiento tenga algo que aportar.',
      'El error habitual es querer elegir un solo modo, normalmente el social, y sostenerlo. **Los cuatro caminos son cuatro, no uno**: negarse el retiro vacía el resto.'
    ],
    'of the Sleeping Phoenix': [
      'El fénix arde y renace; aquí está **dormido**, esperando el momento. La [puerta 20](gate:20) vive en el presente y la [34](gate:34) es pura potencia; debajo, el [55](gate:55) trae el espíritu y sus vaivenes de ánimo, y el [59](gate:59), la capacidad de romper barreras e intimar.',
      'Es una cruz de **fuerza contenida**: una energía enorme que no se gasta continuamente sino que espera y, cuando llega el momento, se despliega entera. Confundirla con lentitud es un error de lectura.',
      'La clave está en el estado de ánimo. El [55](gate:55) sube y baja, y **la vida cambia de color con él**; el trabajo no es corregirlo sino no decidir desde el punto bajo ni prometer desde el alto.'
    ],
    'of Tension': [
      'La [puerta 21](gate:21) quiere control sobre lo propio, la [48](gate:48) busca profundidad y teme no tenerla, la [38](gate:38) pelea por lo que merece la pena y la [39](gate:39) provoca para sacar lo que hay debajo. Cuatro energías en tensión — y esa tensión es el motivo.',
      'Suena incómodo y es lo contrario de un defecto: **es lo que empuja a mejorar**. Estas personas suelen tener una insatisfacción de fondo que las lleva a profundizar, a plantar cara y a no conformarse con lo superficial.',
      'El cuidado es dónde se descarga. Peleada contra la propia vida, la tensión agota; puesta al servicio de algo que valga la pena, **es una de las fuerzas más productivas de la carta**.'
    ],
    'of Rulership': [
      'La [puerta 22](gate:22) abre con gracia, la [47](gate:47) trata de dar sentido a lo confuso, la [26](gate:26) sabe contar lo que tiene valor y la [45](gate:45) reúne y administra lo de todos. El gobierno del que habla la cruz **es esto: administrar lo común**.',
      'No es mandar. Es **la autoridad que aparece cuando alguien reúne, ordena y reparte bien** — y la gracia social del [22](gate:22) es la que hace que se acepte de buen grado.',
      'El punto sensible está en el [26](gate:26), la puerta del embaucador: sabe presentar, y por eso puede exagerar. **La diferencia entre gobernar y manipular pasa por ahí**, y se juega en cada pequeña decisión.'
    ],
    'of the Unexpected': [
      'La [puerta 27](gate:27) cuida y alimenta, la [28](gate:28) se juega la vida buscándole sentido, la [41](gate:41) enciende la fantasía que arranca todo ciclo y la [31](gate:31) lleva la voz que otros siguen. Cuatro puertas que no encajan del todo: de ahí lo inesperado.',
      'Es una cruz de **giros**. La vida no sigue la línea prevista; llega por caminos que nadie había planeado, y en esos giros está lo bueno — la [28](gate:28) es la puerta que encuentra sentido justo donde parecía que no había.',
      'Vivida a la defensiva se siente como inestabilidad. Aceptada, se convierte en **una vida rica en experiencia y en capacidad de cuidar a otros** precisamente por lo vivido.'
    ],
    'of Maya': [
      'Maya es el nombre del **velo**: el mundo material tal y como se nos aparece, tan sólido y tan resbaladizo a la vez. La [puerta 32](gate:32) mide lo que va a durar y la [42](gate:42) cierra los ciclos; debajo, el [62](gate:62) ordena el detalle y el [61](gate:61) empuja hacia el misterio de fondo.',
      'La cruz describe a quien **se mueve dentro de la ilusión sin creérsela del todo**: buen ojo para lo práctico —lo que dura, lo que se termina, los nombres y los datos— y a la vez una pregunta que ningún dato responde.',
      'Ese doble filo es el tema. Quedarse solo en el detalle deja una vida seca; quedarse solo en el misterio, una vida sin suelo. **Maya se atraviesa usando las dos manos.**'
    ],
    'of Penetration': [
      'Penetrar es **atravesar la superficie**. La [puerta 51](gate:51) es el shock que despierta, la [57](gate:57) la intuición que oye lo que no se dice, la [54](gate:54) la ambición que empuja hacia arriba y la [53](gate:53) el impulso de empezar.',
      'Es una cruz de **iniciación**: el sobresalto que rompe la rutina de alguien y le hace ver algo que no veía. A menudo estas personas producen ese efecto sin pretenderlo, solo por cómo entran en una situación.',
      'Lo delicado es que el shock se recibe mal si llega por sorpresa. **La intuición del [57](gate:57) sabe cuándo y a quién**; escucharla convierte el golpe en despertar, ignorarla lo convierte en choque.'
    ],
    'of Defiance': [
      'Desafío aquí no es rebeldía porque sí. La [puerta 1](gate:1) y la [2](gate:2) traen la expresión propia y la dirección; debajo, el [4](gate:4) ofrece respuestas y el [49](gate:49) es el principio que rompe un pacto cuando ya no sirve.',
      'Es una cruz **transpersonal**: lo propio se afirma **frente a otros y con otros**. Estas personas suelen encontrarse discrepando —no por gusto, sino porque ven que algo no encaja— y esa discrepancia acaba siendo útil para el grupo.',
      'El filo está en desafiar por costumbre. El [49](gate:49) sabe cuándo un principio se ha roto de verdad; **si el desafío no nace de ahí, es solo ruido**.'
    ],
    'of Wishes': [
      'La [puerta 3](gate:3) es el arranque difícil de lo nuevo y la [50](gate:50), los valores que sostienen a un grupo; el [41](gate:41) enciende el deseo que abre todo ciclo y el [31](gate:31) le presta la voz que otros siguen.',
      'El deseo es aquí **el motor de lo colectivo**: lo que estas personas anhelan no se queda dentro, se convierte en algo que mueve a otros. De ahí «deseos», en plural — no un capricho, sino el impulso que arranca cosas.',
      'Cuidado con el [41](gate:41): fantasea mucho más de lo que se puede vivir. **La fantasía es el combustible, no el plan.**'
    ],
    'of Revolution': [
      'La [puerta 4](gate:4) da respuestas y la [49](gate:49) revisa los principios; el [8](gate:8) aporta lo que uno tiene que contribuir y el [14](gate:14), los recursos para sostenerlo.',
      'Revolución aquí es **cambiar las reglas del trato**, no derribar por derribar. El [49](gate:49) es la puerta del rechazo justificado: cuando un acuerdo deja de ser justo, algo tiene que reformularse — y estas personas son quienes lo formulan.',
      'Funciona cuando hay algo que ofrecer a cambio. **Rechazar sin propuesta agota a todos**, empezando por uno mismo.'
    ],
    'of Separation': [
      'La [puerta 5](gate:5) marca el ritmo y la [35](gate:35) busca experiencia nueva; el [47](gate:47) intenta dar sentido a lo confuso y el [22](gate:22) abre o cierra la puerta emocional a los demás.',
      'Separación no es soledad: es **la capacidad de distinguirse**, de no fundirse con el grupo. Estas personas aportan justamente eso — una mirada que no se ha contagiado del ambiente.',
      'El coste es sentirse aparte. El [22](gate:22) sabe cuándo abrirse; **usarlo bien convierte la separación en perspectiva y no en aislamiento**.'
    ],
    'of the Plane': [
      'La [puerta 6](gate:6) trae la fricción y la intimidad y la [36](gate:36), la crisis; el [15](gate:15) ama la variedad humana y el [10](gate:10) exige ser fiel a uno mismo.',
      'El «plano» es **el nivel en el que se vive**: esta cruz habla de subir el plano de las relaciones, de llevar el contacto con otros a algo más hondo que la superficie.',
      'Se juega en el ritmo del [6](gate:6). **Forzar intimidad cuando la puerta está cerrada baja el plano en vez de subirlo.**'
    ],
    'of Masks': [
      'La [puerta 7](gate:7) es el papel que se ocupa ante los demás y la [13](gate:13), la que escucha lo que traen; el [23](gate:23) aporta la voz singular y el [43](gate:43), la intuición que la alimenta.',
      'Las máscaras no son mentira: son **los papeles que uno asume según el sitio**. Esta cruz describe a quien cambia de máscara con soltura y, precisamente por eso, llega a gente muy distinta.',
      'El riesgo es perder el hilo de cuál es la propia. **Una máscara sirve mientras se sepa que es una máscara.**'
    ],
    'of Uncertainty': [
      'La [puerta 8](gate:8) aporta la contribución propia y la [14](gate:14), los recursos; el [55](gate:55) trae el espíritu y sus vaivenes y el [59](gate:59), la capacidad de romper barreras con otros.',
      'Incertidumbre aquí es **materia prima, no problema**: estas personas viven sin certezas fijas sobre su ánimo ni su rumbo, y esa apertura es lo que les permite crear algo genuinamente nuevo con otros.',
      'La trampa es exigirse constancia emocional. **El [55](gate:55) no se corrige; se acompaña.**'
    ],
    'of Identification': [
      'La [puerta 9](gate:9) enfoca el detalle y la [16](gate:16) pone entusiasmo y destreza; el [64](gate:64) llena la cabeza de imágenes y el [63](gate:63) las pone en duda.',
      'Identificar es **reconocer qué merece el esfuerzo** entre todo lo posible. Esta cruz da ojo para señalar, dentro del ruido colectivo, aquello que de verdad va a llevar a alguna parte.',
      'El desgaste llega al identificarse *con* lo que se señala. **Ver el patrón no obliga a cargar con él.**'
    ],
    'of Prevention': [
      'La [puerta 10](gate:10) es el comportamiento propio y la [15](gate:15), el amor a la variedad humana; el [18](gate:18) ve lo que falla y el [17](gate:17) lo convierte en opinión.',
      'Prevenir es **corregir antes de que el daño ocurra**. Estas personas detectan el fallo de un patrón colectivo cuando aún es pequeño, y su aportación es avisar a tiempo.',
      'Solo se recibe bien si se pide. **Corregir sin que nadie lo haya pedido convierte la prevención en reproche.**'
    ],
    'of Education': [
      'La [puerta 11](gate:11) trae las ideas y la [12](gate:12), la prudencia al decirlas; el [46](gate:46) ama el cuerpo y el estar aquí y el [25](gate:25) aporta la inocencia del amor universal.',
      'Educar aquí no es dar clase: es **transmitir de forma que el otro cambie**. Las ideas del [11](gate:11) solo educan cuando encuentran el momento del [12](gate:12) — y esta cruz vive en esa espera.',
      'Dicha a destiempo, la mejor idea suena a sermón. **El talento está en el cuándo, no en el qué.**'
    ],
    'of Upheaval': [
      'La [puerta 17](gate:17) da opiniones y la [18](gate:18), el ojo crítico; el [38](gate:38) pelea por lo que vale la pena y el [39](gate:39) provoca para sacar lo que hay debajo.',
      'Convulsión: esta cruz **remueve lo que estaba cómodo**. No por gusto, sino porque ve una estructura que no aguanta y no puede callarse. Es de las energías que empujan a un grupo a cambiar.',
      'El [39](gate:39) provoca sin proponérselo. **La diferencia entre sacudir y molestar está en si hay algo mejor detrás.**'
    ],
    'of Refinement': [
      'La [puerta 19](gate:19) se acerca y pide y la [33](gate:33) se retira a digerir; el [1](gate:1) y el [2](gate:2) ponen debajo la expresión propia y la dirección.',
      'Refinar es **pulir lo que ya existe** hasta que sirva de verdad. El [19](gate:19) percibe lo que la gente necesita y el [33](gate:33) lo procesa a solas: de ahí sale una sensibilidad muy fina para lo que le falta a un grupo.',
      'Necesita el retiro. **Sin la pausa del [33](gate:33), la sensibilidad del [19](gate:19) se vuelve sobrecarga.**'
    ],
    'of Duality': [
      'La [puerta 20](gate:20) vive en el presente y la [34](gate:34) es potencia pura; el [37](gate:37) aporta los pactos y el [40](gate:40), la voluntad y la necesidad de retirarse.',
      'Dualidad es **el dos**: esta cruz se cumple en la relación, en el emparejarse — con una persona, un socio, una causa. Lo que uno solo no puede, el par sí.',
      'El [40](gate:40) recuerda que el par se sostiene con descanso. **Un pacto sin retirada acaba en resentimiento.**'
    ],
    'of Endeavor': [
      'La [puerta 21](gate:21) quiere control sobre lo suyo y la [48](gate:48) busca profundidad; el [54](gate:54) empuja hacia arriba y el [53](gate:53) inicia.',
      'Empeño es **la energía de subir**: ambición puesta al servicio de construir algo con otros, ladrillo a ladrillo. El [54](gate:54) es la puerta del que quiere llegar más alto de donde partió.',
      'La ambición del [54](gate:54) necesita ser reconocida para prosperar. **Empujar sin alianza es escalar en solitario una pared que era de todos.**'
    ],
    'of Informing': [
      'La [puerta 22](gate:22) abre con gracia y la [47](gate:47) busca sentido; el [11](gate:11) trae las ideas y el [12](gate:12), el momento justo para decirlas.',
      'Informar aquí es **poner al día al otro**: la gracia social del [22](gate:22) al servicio de que la gente sepa lo que necesita saber. Suena menor y es de las cosas que más fricción evitan.',
      'El [12](gate:12) manda. **Informar a destiempo es tan inútil como no informar.**'
    ],
    'of Dedication': [
      'La [puerta 23](gate:23) aporta la voz singular y la [43](gate:43), la intuición que la alimenta; el [30](gate:30) pone el deseo ardiente y el [29](gate:29), la capacidad de comprometerse del todo.',
      'Dedicación es **entregarse a algo hasta el fondo**. Esta cruz no reparte: elige y se vuelca, y esa entrega es lo que otros acaban siguiendo.',
      'El [29](gate:29) dice que sí con facilidad. **Dedicarse a lo equivocado cuesta años**, así que aquí elegir bien es todo.'
    ],
    'of Incarnation': [
      'La [puerta 24](gate:24) vuelve una y otra vez sobre lo mismo y la [44](gate:44) reconoce patrones del pasado; el [13](gate:13) escucha y el [7](gate:7) ocupa un papel.',
      'Encarnación habla de **traer algo al mundo a través de la propia vida**: lo que estas personas han rumiado (24) y recordado (44) acaba tomando forma en el papel que ocupan ante otros.',
      'Requiere paciencia con la repetición. **El [24](gate:24) vuelve al mismo punto hasta que un día trae algo distinto**; cortar antes es quedarse sin el fruto.'
    ],
    'of Healing': [
      'La [puerta 25](gate:25) aporta el amor inocente y universal y la [46](gate:46), el amor al cuerpo; el [58](gate:58) trae la vitalidad y el [52](gate:52), la quietud.',
      'Sanar aquí es **devolver a alguien a su propia forma**, no arreglarlo. La combinación de inocencia (25) y presencia física (46) hace que estas personas sanen sobre todo por cómo están, no por lo que hacen.',
      'El [25](gate:25) es exigente: **pide amar sin condiciones ni preferencias**, y eso incluye a quien no lo devuelve. Ahí está el trabajo.'
    ],
    'of Confrontation': [
      'La [puerta 26](gate:26) sabe presentar lo que tiene valor y la [45](gate:45) reúne y administra lo común; el [6](gate:6) trae la fricción y el [36](gate:36), la crisis.',
      'Confrontar es **poner delante lo que se evitaba**. No es pelea: es la conversación difícil que un grupo necesita y nadie quiere abrir. Estas personas suelen abrirla.',
      'El [26](gate:26) puede exagerar para convencer. **Una confrontación honesta cambia algo; una manipulada solo gana la discusión.**'
    ],
    'of Alignment': [
      'La [puerta 27](gate:27) cuida y alimenta y la [28](gate:28) busca sentido jugándosela; el [19](gate:19) se acerca a pedir y el [33](gate:33) se retira a procesar.',
      'Alineamiento es **poner el cuidado donde de verdad importa**. Esta cruz mide, con el [28](gate:28), qué merece la pena — y dedica a eso el cuidado del [27](gate:27), en vez de repartirlo a ciegas.',
      'Cuidar de todo es no cuidar de nada. **El [28](gate:28) está aquí para elegir**, aunque elegir duela.'
    ],
    'of Industry': [
      'La [puerta 29](gate:29) se compromete y la [30](gate:30) desea intensamente; el [20](gate:20) vive en el presente y el [34](gate:34) aporta la potencia.',
      'Laboriosidad no es trabajar mucho: es **la capacidad de sostener un sí en el tiempo**. El [29](gate:29) se mete y aguanta, y eso, con la fuerza del [34](gate:34) detrás, saca proyectos adelante que otros abandonan.',
      'Todo depende de a qué se dijo que sí. **Un compromiso sostenido en lo equivocado es la definición del desgaste.**'
    ],
    'of the Alpha': [
      'La [puerta 31](gate:31) lleva la voz que otros siguen y la [41](gate:41) enciende el deseo inicial; el [24](gate:24) rumia y el [44](gate:44) reconoce patrones.',
      'Alfa es **el que va delante**. No por imponerse, sino porque su voz nombra lo que el grupo aún no sabía decir. Es una cruz de liderazgo, y el liderazgo aquí **se otorga, no se toma**.',
      'El [31](gate:31) solo funciona si hay quien lo siga de verdad. **Liderar sin mandato es hablar solo.**'
    ],
    'of Limitation': [
      'La [puerta 32](gate:32) mide lo que va a durar y la [42](gate:42) cierra ciclos; el [56](gate:56) estimula con historias y el [60](gate:60) pone el límite.',
      'Limitación aquí es **la buena noticia**: aceptar el marco es lo que permite que algo se termine y dure. El [60](gate:60) no recorta por gusto — recorta para que haya forma.',
      'La tentación es forzar el límite. **Lo que se estira más allá del [60](gate:60) no crece, se rompe.**'
    ],
    'of Migration': [
      'La [puerta 37](gate:37) teje los pactos y la [40](gate:40) aporta la voluntad y la retirada; el [5](gate:5) marca el ritmo y el [35](gate:35) busca experiencia nueva.',
      'Migrar es **moverse buscando algo mejor, en grupo**. Esta cruz describe a quien lleva a los suyos a otro sitio — un cambio de trabajo, de ciudad, de manera de hacer las cosas — y sostiene el vínculo durante el traslado.',
      'El [35](gate:35) se aburre y el [37](gate:37) se compromete. **La tensión entre irse y sostener el pacto es el tema de la vida.**'
    ],
    'of Individualism': [
      'La [puerta 38](gate:38) pelea por lo que vale la pena y la [39](gate:39) provoca; el [57](gate:57) intuye y el [51](gate:51) sacude.',
      'Individualismo aquí no es egoísmo: es **el derecho a ser diferente**, defendido a base de plantar cara. Estas personas sostienen su rareza y, al hacerlo, abren sitio para la de otros.',
      'La pelea del [38](gate:38) necesita causa. **Sin algo que merezca la pena, se convierte en pelearse con todo.**'
    ],
    'of Cycles': [
      'La [puerta 53](gate:53) inicia y la [54](gate:54) empuja hacia arriba; el [42](gate:42) cierra lo empezado y el [32](gate:32) juzga qué va a durar.',
      'Ciclos: esta cruz vive **el empezar y el terminar** como su materia. No se trata de sostener una sola cosa para siempre, sino de llevar cada ciclo hasta su final antes de abrir el siguiente.',
      'Lo que duele es dejar cosas a medias. **El [42](gate:42) pide cierre**, y saltarse el cierre deja una estela de cosas abiertas.'
    ],
    'of Spirit': [
      'La [puerta 55](gate:55) trae el espíritu y sus mareas y la [59](gate:59), la capacidad de intimar de verdad; el [9](gate:9) enfoca el detalle y el [16](gate:16) pone entusiasmo.',
      'Espíritu aquí es **el estado de ánimo como asunto serio**: esta cruz explora la libertad emocional y la lleva a sus relaciones. Es una de las energías más mutantes de la carta.',
      'No hay que arreglarlo. **La melancolía del [55](gate:55) no es un fallo**; decidir desde ella, sí.'
    ],
    'of Distraction': [
      'La [puerta 56](gate:56) estimula contando y la [60](gate:60) pone el límite; el [27](gate:27) cuida y el [28](gate:28) busca sentido.',
      'Distracción no es despiste: es **el arte de sacar a alguien de donde estaba metido**. Una historia, un desvío, una idea lateral — y de pronto se ve otra cosa. El [56](gate:56) es la puerta del narrador.',
      'Sin el [60](gate:60), la distracción se vuelve dispersión. **Un buen desvío tiene destino.**'
    ],
    'of the Clarion': [
      'La [puerta 51](gate:51) es el shock y la [57](gate:57) la intuición aguda; el [61](gate:61) presiona hacia el misterio y el [62](gate:62) ordena el detalle.',
      'El clarín **llama a formar**: un sonido que atraviesa el ruido y hace que la gente levante la cabeza. Esta cruz habla de decir algo que despierta, no de decir mucho.',
      'La intuición del [57](gate:57) es de un solo intento. **Repetir la llamada la convierte en ruido.**'
    ],
    'of Demands': [
      'La [puerta 52](gate:52) aporta la quietud y la [58](gate:58) la vitalidad; el [21](gate:21) quiere control sobre lo suyo y el [48](gate:48) busca profundidad.',
      'Exigencias: esta cruz **pide** — a los demás y a sí misma. Y suele estar en su derecho, porque el [48](gate:48) ve lo que falta de verdad. Bien puesta, es la energía que sube el listón de un grupo.',
      'Mal puesta, agota a todos. **El [52](gate:52) es el freno: exigir desde la quietud, no desde la prisa.**'
    ],
    'of Obscuration': [
      'La [puerta 61](gate:61) presiona hacia la verdad interior y la [62](gate:62) ordena los hechos; el [50](gate:50) sostiene los valores y el [3](gate:3) arranca lo nuevo.',
      'Oscurecimiento es **lo que aún no se ve**. Esta cruz vive con una pregunta de fondo que ningún dato resuelve, y su aportación es sostenerla en alto en vez de taparla con explicaciones.',
      'El [62](gate:62) tiende a llenar el hueco con detalles. **A veces lo honesto es decir que todavía está oscuro.**'
    ],
    'of Dominion': [
      'La [puerta 63](gate:63) duda y la [64](gate:64) se llena de imágenes sin ordenar; el [26](gate:26) sabe presentar y el [45](gate:45) reúne y administra.',
      'Dominio es **hacerse cargo**: la duda del [63](gate:63) puesta al servicio de comprobar antes de que otros carguen con un error. Es una cruz de responsabilidad, no de poder.',
      'La duda dirigida hacia dentro paraliza. **El [63](gate:63) está hecho para revisar lo de fuera**, no para desconfiar de uno mismo.'
    ],
    'of Self-expression': [
      'Un papel fijo: **decir lo propio**. La [puerta 1](gate:1) es la creatividad que necesita salir y la [2](gate:2) le da dirección; debajo, el [4](gate:4) y el [49](gate:49) aportan respuestas y principios.',
      'La yuxtaposición hace de esto algo **no negociable**: no es una vocación que se elige, es una necesidad. Callar lo propio aquí no ahorra conflictos, solo lo aplaza.'
    ],
    'of the Driver': [
      'La [puerta 2](gate:2) es la dirección misma —saber hacia dónde— con la [1](gate:1) detrás; el [49](gate:49) y el [4](gate:4) sostienen los principios y las respuestas.',
      'El conductor **no empuja, orienta**. Es un papel silencioso y fijo: estar donde hay que estar para que otros encuentren su rumbo. Buscar reconocimiento por ello suele estropearlo.'
    ],
    'of Mutation': [
      'La [puerta 3](gate:3) es el arranque caótico de lo nuevo y la [50](gate:50) los valores que lo contienen; el [41](gate:41) enciende el deseo y el [31](gate:31) le presta voz.',
      'Mutar es **traer lo que aún no existía**, con todo su desorden inicial. El papel es aguantar ese desorden el tiempo suficiente para que cuaje, sin apresurarlo ni abandonarlo.'
    ],
    'of Formulization': [
      'La [puerta 4](gate:4) formula respuestas y la [49](gate:49) revisa principios; el [8](gate:8) y el [14](gate:14) aportan la contribución y los recursos.',
      'Formular es **darle forma cerrada a una idea suelta**. Un papel de precisión: la fórmula sirve o no sirve. La tentación es formular antes de tener la respuesta entera.'
    ],
    'of Habits': [
      'La [puerta 5](gate:5) es el ritmo y la costumbre y la [35](gate:35) el apetito de cambio; el [47](gate:47) y el [22](gate:22) buscan sentido y abren la puerta a los demás.',
      'Los hábitos son aquí **el andamiaje de una vida**. El papel consiste en sostener un ritmo propio sin dejarse arrastrar por el de nadie. Romperlo por complacer sale caro.'
    ],
    'of Conflict': [
      'La [puerta 6](gate:6) es la fricción y la intimidad y la [36](gate:36) la crisis; el [15](gate:15) y el [10](gate:10) traen la variedad humana y la fidelidad a uno mismo.',
      'El conflicto aquí **es el trabajo, no el accidente**: estar en el roce sin huir ni enquistarse. El filo está en el ritmo del [6](gate:6): no todo momento es momento de entrar.'
    ],
    'of Interaction': [
      'La [puerta 7](gate:7) ocupa un papel ante otros y la [13](gate:13) escucha lo que traen; el [23](gate:23) y el [43](gate:43) ponen la voz singular y la intuición.',
      'Interactuar es **el papel en sí**: estar entre la gente, recogiendo y devolviendo. No es sociabilidad decorativa; es la función. El aislamiento aquí apaga la carta entera.'
    ],
    'of Contribution': [
      'La [puerta 8](gate:8) aporta lo que uno tiene que dar y la [14](gate:14) los recursos; el [55](gate:55) y el [59](gate:59) traen el espíritu y la intimidad.',
      'Contribuir es **poner lo propio al servicio de algo sin diluirse en ello**. El papel fijo consiste en aportar sin pedir permiso y sin necesitar aplauso.'
    ],
    'of Focus': [
      'La [puerta 9](gate:9) concentra en el detalle y la [16](gate:16) pone entusiasmo; el [64](gate:64) y el [63](gate:63) llenan de imágenes y dudas.',
      'Foco es **sostener la atención donde otros la pierden**. Es un papel de resistencia mental, y su desgaste llega al enfocarse en lo que no lo merecía.'
    ],
    'of Behavior': [
      'La [puerta 10](gate:10) es el comportamiento propio, la más personal de todas, con el [15](gate:15) al lado; el [18](gate:18) y el [17](gate:17) corrigen y opinan.',
      'El papel es **comportarse como uno es, sin ajustarse**. Suena fácil y es de lo más exigente: cualquier adaptación de más se paga por dentro.'
    ],
    'of Ideas': [
      'La [puerta 11](gate:11) es el almacén de ideas y la [12](gate:12) la prudencia al soltarlas; el [46](gate:46) y el [25](gate:25) traen el cuerpo y la inocencia.',
      'Tener ideas es aquí **una condición, no un logro**. El papel no es realizarlas todas —el [11](gate:11) no está hecho para eso— sino ofrecerlas a quien sí puede.'
    ],
    'of Articulation': [
      'La [puerta 12](gate:12) es la expresión medida y la [11](gate:11) le da material; el [25](gate:25) y el [46](gate:46) ponen el amor inocente y el cuerpo.',
      'Articular es **encontrar la forma exacta y el momento exacto**. El papel vive en la espera: dicho a destiempo, lo mismo pierde todo su valor.'
    ],
    'of Listening': [
      'La [puerta 13](gate:13) escucha y guarda lo que la gente cuenta, con el [7](gate:7) al lado; el [43](gate:43) y el [23](gate:23) ponen la intuición y la voz.',
      'Escuchar es aquí **un oficio**: la gente cuenta cosas a estas personas sin saber por qué. El papel se estropea al usar lo escuchado para otra cosa que no sea devolverlo bien.'
    ],
    'of Empowering': [
      'La [puerta 14](gate:14) es la abundancia de recursos y la [8](gate:8) la contribución; el [59](gate:59) y el [55](gate:55) traen la intimidad y el espíritu.',
      'Empoderar es **poner recursos donde alguien puede usarlos mejor que uno**. Papel de mecenas silencioso; el filo está en dárselos a quien no los va a mover.'
    ],
    'of Extremes': [
      'La [puerta 15](gate:15) contiene toda la variedad humana —del exceso a la escasez— con el [10](gate:10) al lado; el [17](gate:17) y el [18](gate:18) opinan y corrigen.',
      'El papel es **habitar los extremos sin normalizarse**. Estas personas tienen ritmos raros y esa rareza es la aportación: ensanchan lo que se considera humano.'
    ],
    'of Experimentation': [
      'La [puerta 16](gate:16) es el entusiasmo que se lanza y la [9](gate:9) el detalle; el [63](gate:63) y el [64](gate:64) dudan y acumulan imágenes.',
      'Experimentar es **probar antes de saber**. El papel pide lanzarse, y el error forma parte del método — pero el [16](gate:16) sin repetición se queda en un salto sin destreza.'
    ],
    'of Opinions': [
      'La [puerta 17](gate:17) formula opiniones y la [18](gate:18) ve lo que falla; el [38](gate:38) y el [39](gate:39) pelean y provocan.',
      'Opinar es aquí **el papel**, no un vicio. Lo delicado es que una opinión no es una verdad: sirve cuando se ofrece y estorba cuando se impone.'
    ],
    'of Correction': [
      'La [puerta 18](gate:18) detecta el fallo y la [17](gate:17) lo pone en palabras; el [39](gate:39) y el [38](gate:38) provocan y pelean.',
      'Corregir es **el oficio fijo**: ver lo mejorable antes que nadie. Bien dirigido, es un regalo para el grupo; dirigido a uno mismo sin freno, es corrosivo.'
    ],
    'of Need': [
      'La [puerta 19](gate:19) percibe lo que hace falta y la [33](gate:33) se retira a digerirlo; el [1](gate:1) y el [2](gate:2) aportan expresión y dirección.',
      'El papel es **notar la necesidad antes de que se diga**. Muy sensible, muy útil — y agotador si no se respeta el retiro del [33](gate:33).'
    ],
    'of the Now': [
      'La [puerta 20](gate:20) vive en el presente puro y la [34](gate:34) da la fuerza; el [37](gate:37) y el [40](gate:40) traen los pactos y la retirada.',
      'Estar en el ahora es **la función completa**: ni planificar de más ni rumiar el pasado. La independencia de la yuxtaposición aquí protege ese presente de las agendas ajenas.'
    ],
    'of Control': [
      'La [puerta 21](gate:21) quiere control sobre lo suyo —recursos, territorio— y la [48](gate:48) busca profundidad; el [54](gate:54) y el [53](gate:53) empujan e inician.',
      'El papel es **administrar lo propio sin que nadie lo administre por uno**. Extendido a lo ajeno, el mismo impulso se vuelve tiranía menor.'
    ],
    'of Grace': [
      'La [puerta 22](gate:22) abre y cierra la puerta emocional con gracia y la [47](gate:47) busca sentido; el [11](gate:11) y el [12](gate:12) traen ideas y prudencia.',
      'La gracia es **saber estar**: escuchar, abrirse, callar en el momento justo. Es un papel social muy fino, y depende por completo del estado de ánimo del día.'
    ],
    'of Assimilation': [
      'La [puerta 23](gate:23) traduce lo singular a algo comprensible y la [43](gate:43) lo intuye; el [30](gate:30) y el [29](gate:29) desean y se comprometen.',
      'Asimilar es **hacer digerible lo raro**. El papel se juega en el momento: la misma frase es genial o es incomprensible según cuándo se suelte.'
    ],
    'of Rationalization': [
      'La [puerta 24](gate:24) vuelve una y otra vez sobre lo mismo y la [44](gate:44) reconoce patrones; el [13](gate:13) y el [7](gate:7) escuchan y ocupan papel.',
      'Racionalizar es **darle sentido a lo que dolió**. Papel de rumia productiva; el filo es cuando la rumia se queda en bucle y no llega a conclusión.'
    ],
    'of Innocence': [
      'La [puerta 25](gate:25) es el amor universal sin preferencias y la [46](gate:46) el amor al cuerpo; el [58](gate:58) y el [52](gate:52) traen vitalidad y quietud.',
      'La inocencia aquí es **un papel duro**: amar sin condiciones incluye a quien no lo merece. No es ingenuidad; es una elección sostenida.'
    ],
    'of the Trickster': [
      'La [puerta 26](gate:26) sabe presentar lo que tiene valor y la [45](gate:45) reúne lo común; el [6](gate:6) y el [36](gate:36) traen fricción y crisis.',
      'El embaucador **vende, y hace falta que alguien venda**. El papel es legítimo mientras lo vendido sea real: el mismo talento, con la verdad estirada, es manipulación.'
    ],
    'of Caring': [
      'La [puerta 27](gate:27) cuida y alimenta y la [28](gate:28) busca sentido; el [19](gate:19) y el [33](gate:33) se acercan y se retiran.',
      'Cuidar es **la función fija**, y el aviso es antiguo: el [27](gate:27) cuida de otros con facilidad y de sí mismo con dificultad. Ahí está todo el aprendizaje.'
    ],
    'of Risks': [
      'La [puerta 28](gate:28) se juega la vida buscándole sentido y la [27](gate:27) cuida; el [33](gate:33) y el [19](gate:19) procesan y se acercan.',
      'Arriesgar es **el papel**: sin el riesgo no aparece el sentido. Lo que no vale es el riesgo por adrenalina — el [28](gate:28) pregunta siempre para qué.'
    ],
    'of Commitment': [
      'La [puerta 29](gate:29) dice que sí y aguanta hasta el final y la [30](gate:30) desea; el [20](gate:20) y el [34](gate:34) ponen presente y potencia.',
      'Comprometerse es **la función entera**. Por eso el sí importa tanto: aquí un compromiso no se abandona, así que un sí mal dado hipoteca años.'
    ],
    'of Fates': [
      'La [puerta 30](gate:30) es el deseo ardiente que marca una vida y la [29](gate:29) el compromiso; el [34](gate:34) y el [20](gate:20) traen fuerza y presente.',
      'Los destinos son aquí **lo que el deseo acaba construyendo**. Papel intenso: lo que se anhela de verdad termina ocurriendo, para bien y para mal.'
    ],
    'of Influence': [
      'La [puerta 31](gate:31) lleva la voz que otros siguen y la [41](gate:41) enciende el deseo; el [24](gate:24) y el [44](gate:44) rumian y reconocen patrones.',
      'Influir es **el papel fijo**, y viene con condición: el [31](gate:31) solo funciona si hay quien quiera seguir. Influencia tomada por la fuerza no es influencia.'
    ],
    'of Conservation': [
      'La [puerta 32](gate:32) mide qué va a durar y la [42](gate:42) cierra ciclos; el [56](gate:56) y el [60](gate:60) estimulan y limitan.',
      'Conservar es **proteger lo que merece sobrevivir**. Papel prudente y necesario; su sombra es el miedo al cambio disfrazado de sensatez.'
    ],
    'of Retreat': [
      'La [puerta 33](gate:33) se retira a digerir lo vivido y la [19](gate:19) percibe la necesidad; el [2](gate:2) y el [1](gate:1) dan dirección y expresión.',
      'Retirarse es aquí **una función, no una huida**. El material se cocina en el silencio, y lo que sale de ahí es lo que estas personas tienen para contar.'
    ],
    'of Power': [
      'La [puerta 34](gate:34) es potencia pura, la única que no se comunica sola, y la [20](gate:20) la trae al presente; el [40](gate:40) y el [37](gate:37) ponen voluntad y pactos.',
      'El poder aquí **no se explica, se usa**. Papel de fuerza disponible; la trampa es gastarla en lo que no responde a nada.'
    ],
    'of Experience': [
      'La [puerta 35](gate:35) quiere haberlo probado todo y la [5](gate:5) marca el ritmo; el [22](gate:22) y el [47](gate:47) abren y dan sentido.',
      'Experimentar la vida es **el papel**. La aportación llega después: alguien que ha estado en muchos sitios y puede contarlo. Sin el ritmo del [5](gate:5), la experiencia se vuelve fuga.'
    ],
    'of Crisis': [
      'La [puerta 36](gate:36) es la crisis y lo aún no vivido y la [6](gate:6) la fricción; el [10](gate:10) y el [15](gate:15) traen la fidelidad a uno mismo y la variedad.',
      'La crisis aquí **es el terreno**, no la excepción. El papel consiste en atravesarlas sin dramatizarlas, y en no meterse en la siguiente antes de digerir la anterior.'
    ],
    'of Bargains': [
      'La [puerta 37](gate:37) teje los pactos que sostienen a la familia y la [40](gate:40) aporta voluntad y retirada; el [5](gate:5) y el [35](gate:35) dan ritmo y experiencia.',
      'El pacto es **la función**: dar y recibir en términos claros. Y su regla es dura — un acuerdo que uno acepta sin querer se acaba cobrando.'
    ],
    'of Opposition': [
      'La [puerta 38](gate:38) pelea por lo que merece la pena y la [39](gate:39) provoca; el [57](gate:57) y el [51](gate:51) intuyen y sacuden.',
      'Oponerse es **el papel**, y no es negatividad: sin alguien que plante cara, muchas cosas malas pasan sin ruido. La condición es que la causa exista de verdad.'
    ],
    'of Provocation': [
      'La [puerta 39](gate:39) provoca para sacar lo que hay debajo y la [38](gate:38) pelea; el [51](gate:51) y el [57](gate:57) sacuden e intuyen.',
      'Provocar es **destapar**: una pregunta incómoda, un comentario a destiempo, y de pronto sale lo que se callaba. Útil cuando busca algo; cruel cuando solo busca reacción.'
    ],
    'of Denial': [
      'La [puerta 40](gate:40) es el que trabaja y luego se retira, y necesita ambas cosas; el [37](gate:37), el [35](gate:35) y el [5](gate:5) traen pactos, experiencia y ritmo.',
      'Negarse es aquí **una capacidad, no un defecto**: decir que no y retirarse a recuperar. El papel se rompe cuando la retirada se convierte en aislamiento permanente.'
    ],
    'of Fantasy': [
      'La [puerta 41](gate:41) enciende el deseo que abre todo ciclo y la [31](gate:31) le presta voz; el [44](gate:44) y el [24](gate:24) reconocen y rumian.',
      'La fantasía es **el arranque de todo lo que después existe**. Papel imaginativo; su límite es real: el [41](gate:41) imagina mucho más de lo que una vida puede contener.'
    ],
    'of Completion': [
      'La [puerta 42](gate:42) cierra lo que se empezó y la [32](gate:32) juzga qué va a durar; el [60](gate:60) y el [56](gate:56) limitan y estimulan.',
      'Completar es **el papel entero**. Poca gente termina; estas personas sí. El desgaste llega al meterse en ciclos que nunca debieron empezar.'
    ],
    'of Insight': [
      'La [puerta 43](gate:43) sabe algo de golpe y por dentro y la [23](gate:23) lo traduce; el [29](gate:29) y el [30](gate:30) comprometen y desean.',
      'La intuición aquí **llega entera y sin explicación**. El papel es sostenerla hasta encontrar cómo decirla; soltarla en bruto suele sonar a despropósito.'
    ],
    'of Alertness': [
      'La [puerta 44](gate:44) reconoce en el presente patrones del pasado y la [24](gate:24) rumia; el [7](gate:7) y el [13](gate:13) ocupan papel y escuchan.',
      'Estar alerta es **la función**: detectar el patrón que ya salió mal antes. Es un instinto, no un razonamiento, y funciona mejor cuando no se argumenta.'
    ],
    'of Possession': [
      'La [puerta 45](gate:45) reúne y administra lo de todos y la [26](gate:26) sabe presentarlo; el [36](gate:36) y el [6](gate:6) traen crisis y fricción.',
      'Poseer aquí es **hacerse cargo de lo común**, no acaparar. El papel es el de quien custodia los recursos del grupo — y la línea con la apropiación es fina.'
    ],
    'of Serendipity': [
      'La [puerta 46](gate:46) es el amor al cuerpo y el estar en el sitio justo, y la [25](gate:25) la inocencia; el [52](gate:52) y el [58](gate:58) traen quietud y vitalidad.',
      'La serendipia es **estar donde hay que estar sin haberlo planeado**. Papel afortunado, y su condición es física: cuidar el cuerpo es aquí cuidar la suerte.'
    ],
    'of Oppression': [
      'La [puerta 47](gate:47) se atasca intentando dar sentido a lo confuso y la [22](gate:22) abre; el [12](gate:12) y el [11](gate:11) miden e imaginan.',
      'Opresión es **la sensación de no encontrar la salida** mientras se procesa. El papel consiste en aguantarla sin forzar la conclusión: la comprensión llega sola, y llega tarde.'
    ],
    'of Depth': [
      'La [puerta 48](gate:48) busca profundidad y teme no tenerla, y la [21](gate:21) quiere control; el [53](gate:53) y el [54](gate:54) inician y empujan.',
      'La profundidad es **el papel**, y viene con su miedo pegado: la sensación de no saber bastante. Ese miedo es el motor, no una señal de que sea cierto.'
    ],
    'of Principles': [
      'La [puerta 49](gate:49) sostiene los principios y rompe cuando se violan, con el [4](gate:4) al lado; el [14](gate:14) y el [8](gate:8) traen recursos y contribución.',
      'Tener principios es aquí **una función social**: alguien tiene que marcar dónde está la línea. El filo es la rigidez — un principio que no se revisa nunca se convierte en dogma.'
    ],
    'of Values': [
      'La [puerta 50](gate:50) guarda los valores que sostienen a un grupo y la [3](gate:3) arranca lo nuevo; el [31](gate:31) y el [41](gate:41) dan voz y deseo.',
      'Custodiar valores es **el papel fijo**. No es moralismo: es notar cuándo un grupo se está saltando lo que lo mantenía en pie, y decirlo.'
    ],
    'of Shock': [
      'La [puerta 51](gate:51) sacude y despierta y la [57](gate:57) intuye; el [61](gate:61) y el [62](gate:62) presionan hacia el misterio y ordenan el detalle.',
      'El shock es **el papel**: producir el sobresalto que saca a alguien del piloto automático. Estas personas suelen provocarlo sin querer, solo por cómo entran.'
    ],
    'of Stillness': [
      'La [puerta 52](gate:52) se queda quieta para poder ver y la [58](gate:58) aporta vitalidad; el [21](gate:21) y el [48](gate:48) controlan y profundizan.',
      'La quietud es **una función activa**, no pasividad: quedarse el tiempo suficiente para que se vea lo que en movimiento no se ve. Cuesta en un entorno que premia la prisa.'
    ],
    'of Beginnings': [
      'La [puerta 53](gate:53) empieza cosas —esa es toda su energía— y la [54](gate:54) empuja hacia arriba; el [42](gate:42) y el [32](gate:32) cierran y evalúan.',
      'Empezar es **el papel**, y no incluye terminar. Entenderlo quita mucha culpa: la aportación es el arranque, y otros pueden llevarlo al final.'
    ],
    'of Ambition': [
      'La [puerta 54](gate:54) empuja hacia arriba desde abajo y la [53](gate:53) inicia; el [32](gate:32) y el [42](gate:42) miden y cierran.',
      'La ambición es **la función**, y tiene una regla: prospera cuando se la reconoce. Empujar sin alianza deja a estas personas subiendo solas una escalera muy larga.'
    ],
    'of Moods': [
      'La [puerta 55](gate:55) es el espíritu y su marea emocional, y la [59](gate:59) rompe barreras; el [9](gate:9) y el [16](gate:16) enfocan y entusiasman.',
      'Los estados de ánimo son aquí **el terreno de trabajo**, no un problema a resolver. El papel es vivirlos con honestidad, y la única regla práctica es no decidir desde el punto bajo.'
    ],
    'of Stimulation': [
      'La [puerta 56](gate:56) cuenta y estimula y la [60](gate:60) pone el límite; el [27](gate:27) y el [28](gate:28) cuidan y buscan sentido.',
      'Estimular es **el papel del narrador**: mantener despierta a la gente con lo que cuenta. Y su límite es el [60](gate:60) — sin él, el estímulo se vuelve ruido.'
    ],
    'of Intuition': [
      'La [puerta 57](gate:57) oye lo que no se dice y la [51](gate:51) sacude; el [62](gate:62) y el [61](gate:61) ordenan el detalle y presionan hacia el misterio.',
      'La intuición es aquí **el instrumento entero**. Funciona en el presente y una sola vez; razonarla después la borra. El papel consiste en fiarse de ese primer aviso.'
    ],
    'of Vitality': [
      'La [puerta 58](gate:58) es la alegría de estar vivo y la [52](gate:52) la quietud; el [48](gate:48) y el [21](gate:21) profundizan y controlan.',
      'La vitalidad es **el papel**, y no es optimismo: es una energía física que empuja a mejorar las cosas porque vivir da gusto. Cuando desaparece, algo se está corrigiendo de más.'
    ],
    'of Strategy': [
      'La [puerta 59](gate:59) rompe barreras para llegar a lo íntimo y la [55](gate:55) trae el espíritu; el [16](gate:16) y el [9](gate:9) entusiasman y enfocan.',
      'Estrategia aquí es **saber acercarse**: cómo se traspasa la distancia con otra persona. Papel íntimo y muy concreto; forzarlo cierra justo lo que buscaba abrir.'
    ],
    'of Limitation': [
      'La [puerta 60](gate:60) acepta el límite para que algo pueda tomar forma y la [56](gate:56) estimula; el [28](gate:28) y el [27](gate:27) buscan sentido y cuidan.',
      'El límite es **la función**, y es buena noticia: sin marco no hay forma. La sombra es la melancolía de lo que no cabe — real, y no razón para forzar el marco.'
    ],
    'of Thinking': [
      'La [puerta 61](gate:61) presiona hacia la verdad de fondo y la [62](gate:62) ordena los hechos; el [50](gate:50) y el [3](gate:3) sostienen valores y arrancan.',
      'Pensar es aquí **una presión, no un pasatiempo**: la [61](gate:61) empuja a saber sin garantizar respuesta. El papel es sostener la pregunta sin fabricar conclusiones para calmarla.'
    ],
    'of Detail': [
      'La [puerta 62](gate:62) nombra y ordena los detalles y la [61](gate:61) presiona hacia el misterio; el [3](gate:3) y el [50](gate:50) arrancan y sostienen valores.',
      'El detalle es **el papel**: poner nombre a las cosas para que se puedan manejar. Aportación enorme y poco reconocida; su sombra es perderse en lo pequeño y no ver el conjunto.'
    ],
    'of Doubts': [
      'La [puerta 63](gate:63) duda de todo lo que se le presenta y la [64](gate:64) acumula imágenes; el [26](gate:26) y el [45](gate:45) presentan y administran.',
      'Dudar es **la función**, y es valiosa: alguien tiene que preguntar si esto funciona de verdad. Dirigida hacia dentro paraliza; dirigida hacia fuera protege al grupo.'
    ],
    'of Confusion': [
      'La [puerta 64](gate:64) se llena de imágenes sin ordenar y la [63](gate:63) duda; el [45](gate:45) y el [26](gate:26) reúnen y presentan.',
      'La confusión es aquí **el estado normal de trabajo**, no un fallo: la mente recibe más material del que puede ordenar, y el orden llega solo, con el tiempo. Forzarlo es lo único que la empeora.'
    ]
  },

  // ── Incarnation-cross names (192 = 64 Sun gates x 3 angles), keyed
  // "<personality Sun gate>|<angle>". These are the standard Human Design cross
  // names, not our own coinage: names and short titles are not copyrightable,
  // the same footing already agreed for the channel names (2026-07-02). Every
  // row is checked against the engine's own gate quartets by
  // src/lib/hd/cross-names.test.js — a mistyped row cannot ship silently.
  crossName: {
    '1|right': 'Cruz de ángulo derecho de la Esfinge',
    '2|right': 'Cruz de ángulo derecho de la Esfinge',
    '7|right': 'Cruz de ángulo derecho de la Esfinge',
    '13|right': 'Cruz de ángulo derecho de la Esfinge',
    '1|juxtaposition': 'Cruz de yuxtaposición de la autoexpresión',
    '1|left': 'Cruz de ángulo izquierdo del desafío',
    '2|juxtaposition': 'Cruz de yuxtaposición del impulsor',
    '2|left': 'Cruz de ángulo izquierdo del desafío',
    '3|right': 'Cruz de ángulo derecho de las leyes',
    '3|juxtaposition': 'Cruz de yuxtaposición de la mutación',
    '3|left': 'Cruz de ángulo izquierdo de los deseos',
    '4|right': 'Cruz de ángulo derecho de la explicación',
    '4|juxtaposition': 'Cruz de yuxtaposición de la formulación',
    '4|left': 'Cruz de ángulo izquierdo de la revolución',
    '5|right': 'Cruz de ángulo derecho de la consciencia',
    '5|juxtaposition': 'Cruz de yuxtaposición de los hábitos',
    '5|left': 'Cruz de ángulo izquierdo de la separación',
    '6|right': 'Cruz de ángulo derecho del Edén',
    '6|juxtaposition': 'Cruz de yuxtaposición del conflicto',
    '6|left': 'Cruz de ángulo izquierdo del plano',
    '7|juxtaposition': 'Cruz de yuxtaposición de la interacción',
    '7|left': 'Cruz de ángulo izquierdo de las máscaras',
    '8|right': 'Cruz de ángulo derecho del contagio',
    '8|juxtaposition': 'Cruz de yuxtaposición de la contribución',
    '8|left': 'Cruz de ángulo izquierdo de la incertidumbre',
    '9|right': 'Cruz de ángulo derecho de la planificación',
    '9|juxtaposition': 'Cruz de yuxtaposición del enfoque',
    '9|left': 'Cruz de ángulo izquierdo de la identificación',
    '10|right': 'Cruz de ángulo derecho del receptáculo del amor',
    '10|juxtaposition': 'Cruz de yuxtaposición del comportamiento',
    '10|left': 'Cruz de ángulo izquierdo de la prevención',
    '11|right': 'Cruz de ángulo derecho del Edén',
    '11|juxtaposition': 'Cruz de yuxtaposición de las ideas',
    '11|left': 'Cruz de ángulo izquierdo de la educación',
    '12|right': 'Cruz de ángulo derecho del Edén',
    '12|juxtaposition': 'Cruz de yuxtaposición de la articulación',
    '12|left': 'Cruz de ángulo izquierdo de la educación',
    '13|juxtaposition': 'Cruz de yuxtaposición de la escucha',
    '13|left': 'Cruz de ángulo izquierdo de las máscaras',
    '14|right': 'Cruz de ángulo derecho del contagio',
    '14|juxtaposition': 'Cruz de yuxtaposición del empoderamiento',
    '14|left': 'Cruz de ángulo izquierdo de la incertidumbre',
    '15|right': 'Cruz de ángulo derecho del receptáculo del amor',
    '15|juxtaposition': 'Cruz de yuxtaposición de los extremos',
    '15|left': 'Cruz de ángulo izquierdo de la prevención',
    '16|right': 'Cruz de ángulo derecho de la planificación',
    '16|juxtaposition': 'Cruz de yuxtaposición de la experimentación',
    '16|left': 'Cruz de ángulo izquierdo de la identificación',
    '17|right': 'Cruz de ángulo derecho del servicio',
    '17|juxtaposition': 'Cruz de yuxtaposición de las opiniones',
    '17|left': 'Cruz de ángulo izquierdo de la agitación',
    '18|right': 'Cruz de ángulo derecho del servicio',
    '18|juxtaposition': 'Cruz de yuxtaposición de la corrección',
    '18|left': 'Cruz de ángulo izquierdo de la agitación',
    '19|right': 'Cruz de ángulo derecho de los cuatro caminos',
    '19|juxtaposition': 'Cruz de yuxtaposición de la necesidad',
    '19|left': 'Cruz de ángulo izquierdo del refinamiento',
    '20|right': 'Cruz de ángulo derecho del fénix durmiente',
    '20|juxtaposition': 'Cruz de yuxtaposición del ahora',
    '20|left': 'Cruz de ángulo izquierdo de la dualidad',
    '21|right': 'Cruz de ángulo derecho de la tensión',
    '21|juxtaposition': 'Cruz de yuxtaposición del control',
    '21|left': 'Cruz de ángulo izquierdo del empeño',
    '22|right': 'Cruz de ángulo derecho del gobierno',
    '22|juxtaposition': 'Cruz de yuxtaposición de la gracia',
    '22|left': 'Cruz de ángulo izquierdo de la información',
    '23|right': 'Cruz de ángulo derecho de la explicación',
    '23|juxtaposition': 'Cruz de yuxtaposición de la asimilación',
    '23|left': 'Cruz de ángulo izquierdo de la dedicación',
    '24|right': 'Cruz de ángulo derecho de los cuatro caminos',
    '24|juxtaposition': 'Cruz de yuxtaposición de la racionalización',
    '24|left': 'Cruz de ángulo izquierdo de la encarnación',
    '25|right': 'Cruz de ángulo derecho del receptáculo del amor',
    '25|juxtaposition': 'Cruz de yuxtaposición de la inocencia',
    '25|left': 'Cruz de ángulo izquierdo de la sanación',
    '26|right': 'Cruz de ángulo derecho del gobierno',
    '26|juxtaposition': 'Cruz de yuxtaposición del embaucador',
    '26|left': 'Cruz de ángulo izquierdo de la confrontación',
    '27|right': 'Cruz de ángulo derecho de lo inesperado',
    '27|juxtaposition': 'Cruz de yuxtaposición del cuidado',
    '27|left': 'Cruz de ángulo izquierdo de la alineación',
    '28|right': 'Cruz de ángulo derecho de lo inesperado',
    '28|juxtaposition': 'Cruz de yuxtaposición de los riesgos',
    '28|left': 'Cruz de ángulo izquierdo de la alineación',
    '29|right': 'Cruz de ángulo derecho del contagio',
    '29|juxtaposition': 'Cruz de yuxtaposición del compromiso',
    '29|left': 'Cruz de ángulo izquierdo de la laboriosidad',
    '30|right': 'Cruz de ángulo derecho del contagio',
    '30|juxtaposition': 'Cruz de yuxtaposición de los destinos',
    '30|left': 'Cruz de ángulo izquierdo de la laboriosidad',
    '31|right': 'Cruz de ángulo derecho de lo inesperado',
    '31|juxtaposition': 'Cruz de yuxtaposición de la influencia',
    '31|left': 'Cruz de ángulo izquierdo del Alfa',
    '32|right': 'Cruz de ángulo derecho de Maya',
    '32|juxtaposition': 'Cruz de yuxtaposición de la conservación',
    '32|left': 'Cruz de ángulo izquierdo de la limitación',
    '33|right': 'Cruz de ángulo derecho de los cuatro caminos',
    '33|juxtaposition': 'Cruz de yuxtaposición del retiro',
    '33|left': 'Cruz de ángulo izquierdo del refinamiento',
    '34|right': 'Cruz de ángulo derecho del fénix durmiente',
    '34|juxtaposition': 'Cruz de yuxtaposición del poder',
    '34|left': 'Cruz de ángulo izquierdo de la dualidad',
    '35|right': 'Cruz de ángulo derecho de la consciencia',
    '35|juxtaposition': 'Cruz de yuxtaposición de la experiencia',
    '35|left': 'Cruz de ángulo izquierdo de la separación',
    '36|right': 'Cruz de ángulo derecho del Edén',
    '36|juxtaposition': 'Cruz de yuxtaposición de la crisis',
    '36|left': 'Cruz de ángulo izquierdo del plano',
    '37|right': 'Cruz de ángulo derecho de la planificación',
    '37|juxtaposition': 'Cruz de yuxtaposición de los pactos',
    '37|left': 'Cruz de ángulo izquierdo de la migración',
    '38|right': 'Cruz de ángulo derecho de la tensión',
    '38|juxtaposition': 'Cruz de yuxtaposición de la oposición',
    '38|left': 'Cruz de ángulo izquierdo del individualismo',
    '39|right': 'Cruz de ángulo derecho de la tensión',
    '39|juxtaposition': 'Cruz de yuxtaposición de la provocación',
    '39|left': 'Cruz de ángulo izquierdo del individualismo',
    '40|right': 'Cruz de ángulo derecho de la planificación',
    '40|juxtaposition': 'Cruz de yuxtaposición de la negación',
    '40|left': 'Cruz de ángulo izquierdo de la migración',
    '41|right': 'Cruz de ángulo derecho de lo inesperado',
    '41|juxtaposition': 'Cruz de yuxtaposición de la fantasía',
    '41|left': 'Cruz de ángulo izquierdo del Alfa',
    '42|right': 'Cruz de ángulo derecho de Maya',
    '42|juxtaposition': 'Cruz de yuxtaposición de la culminación',
    '42|left': 'Cruz de ángulo izquierdo de la limitación',
    '43|right': 'Cruz de ángulo derecho de la explicación',
    '43|juxtaposition': 'Cruz de yuxtaposición de la perspicacia',
    '43|left': 'Cruz de ángulo izquierdo de la dedicación',
    '44|right': 'Cruz de ángulo derecho de los cuatro caminos',
    '44|juxtaposition': 'Cruz de yuxtaposición de la alerta',
    '44|left': 'Cruz de ángulo izquierdo de la encarnación',
    '45|right': 'Cruz de ángulo derecho del gobierno',
    '45|juxtaposition': 'Cruz de yuxtaposición de la posesión',
    '45|left': 'Cruz de ángulo izquierdo de la confrontación',
    '46|right': 'Cruz de ángulo derecho del receptáculo del amor',
    '46|juxtaposition': 'Cruz de yuxtaposición de la serendipia',
    '46|left': 'Cruz de ángulo izquierdo de la sanación',
    '47|right': 'Cruz de ángulo derecho del gobierno',
    '47|juxtaposition': 'Cruz de yuxtaposición de la opresión',
    '47|left': 'Cruz de ángulo izquierdo de la información',
    '48|right': 'Cruz de ángulo derecho de la tensión',
    '48|juxtaposition': 'Cruz de yuxtaposición de la profundidad',
    '48|left': 'Cruz de ángulo izquierdo del empeño',
    '49|right': 'Cruz de ángulo derecho de la explicación',
    '49|juxtaposition': 'Cruz de yuxtaposición de los principios',
    '49|left': 'Cruz de ángulo izquierdo de la revolución',
    '50|right': 'Cruz de ángulo derecho de las leyes',
    '50|juxtaposition': 'Cruz de yuxtaposición de los valores',
    '50|left': 'Cruz de ángulo izquierdo de los deseos',
    '51|right': 'Cruz de ángulo derecho de la penetración',
    '51|juxtaposition': 'Cruz de yuxtaposición de la conmoción',
    '51|left': 'Cruz de ángulo izquierdo del clarín',
    '52|right': 'Cruz de ángulo derecho del servicio',
    '52|juxtaposition': 'Cruz de yuxtaposición de la quietud',
    '52|left': 'Cruz de ángulo izquierdo de las exigencias',
    '53|right': 'Cruz de ángulo derecho de la penetración',
    '53|juxtaposition': 'Cruz de yuxtaposición de los comienzos',
    '53|left': 'Cruz de ángulo izquierdo de los ciclos',
    '54|right': 'Cruz de ángulo derecho de la penetración',
    '54|juxtaposition': 'Cruz de yuxtaposición de la ambición',
    '54|left': 'Cruz de ángulo izquierdo de los ciclos',
    '55|right': 'Cruz de ángulo derecho del fénix durmiente',
    '55|juxtaposition': 'Cruz de yuxtaposición de los estados de ánimo',
    '55|left': 'Cruz de ángulo izquierdo del espíritu',
    '56|right': 'Cruz de ángulo derecho de las leyes',
    '56|juxtaposition': 'Cruz de yuxtaposición del estímulo',
    '56|left': 'Cruz de ángulo izquierdo de la distracción',
    '57|right': 'Cruz de ángulo derecho de la penetración',
    '57|juxtaposition': 'Cruz de yuxtaposición de la intuición',
    '57|left': 'Cruz de ángulo izquierdo del clarín',
    '58|right': 'Cruz de ángulo derecho del servicio',
    '58|juxtaposition': 'Cruz de yuxtaposición de la vitalidad',
    '58|left': 'Cruz de ángulo izquierdo de las exigencias',
    '59|right': 'Cruz de ángulo derecho del fénix durmiente',
    '59|juxtaposition': 'Cruz de yuxtaposición de la estrategia',
    '59|left': 'Cruz de ángulo izquierdo del espíritu',
    '60|right': 'Cruz de ángulo derecho de las leyes',
    '60|juxtaposition': 'Cruz de yuxtaposición de la limitación',
    '60|left': 'Cruz de ángulo izquierdo de la distracción',
    '61|right': 'Cruz de ángulo derecho de Maya',
    '61|juxtaposition': 'Cruz de yuxtaposición del pensamiento',
    '61|left': 'Cruz de ángulo izquierdo del oscurecimiento',
    '62|right': 'Cruz de ángulo derecho de Maya',
    '62|juxtaposition': 'Cruz de yuxtaposición del detalle',
    '62|left': 'Cruz de ángulo izquierdo del oscurecimiento',
    '63|right': 'Cruz de ángulo derecho de la consciencia',
    '63|juxtaposition': 'Cruz de yuxtaposición de las dudas',
    '63|left': 'Cruz de ángulo izquierdo del dominio',
    '64|right': 'Cruz de ángulo derecho de la consciencia',
    '64|juxtaposition': 'Cruz de yuxtaposición de la confusión',
    '64|left': 'Cruz de ángulo izquierdo del dominio'
  },

  // ── Signals (the alignment / misalignment pair, one per type). Surfaced as a
  // summary field; canonically called the "signature" and the "not-self theme",
  // named here in plainer terms (see concept.signal). ──
  signal: {
    generator: {
      aligned: {
        name: 'Satisfacción',
        text: [
          'La **satisfacción** es la señal de que un Generador está usando bien su energía: un cansancio a gusto al final del día y la sensación de haber empleado la fuerza en algo que valía la pena. No es euforia ni entusiasmo constante — es una hondura tranquila que se nota sobre todo al parar.',
          'Aparece cuando el compromiso vino de una **respuesta del cuerpo** y no de un cálculo mental. Si se repite día tras día, suele ser buena señal de que la estrategia de [responder](strategy:respond) se está siguiendo de verdad.'
        ]
      },
      misaligned: {
        name: 'Frustración',
        text: [
          'La **frustración** es la señal de que un Generador se ha comprometido con algo a lo que su cuerpo no había dicho que sí: cosas que no terminan de arrancar, esfuerzo que no cunde, la sensación de estar atascado.',
          'No es un defecto de carácter ni una razón para insistir más fuerte; es información. Cuando predomina, lo que suele hacer falta es revisar a qué se dijo que sí y por qué, y volver a esperar algo a lo que responder.'
        ]
      }
    },
    'manifesting-generator': {
      aligned: {
        name: 'Satisfacción',
        text: [
          'La **satisfacción**, con algo de paz alrededor, es la señal de que un Generador Manifestante va bien encaminado: avanza rápido en lo que le enciende, se salta lo que no hace falta y deja las cosas rematadas.',
          'Aparece cuando el compromiso vino de una respuesta del cuerpo **y** se informó a quienes iba a alcanzar el movimiento. Las dos mitades cuentan: responder sin informar deja fricción alrededor aunque el trabajo sea el correcto.'
        ]
      },
      misaligned: {
        name: 'Frustración',
        text: [
          'La **frustración**, a menudo mezclada con enfado, es la señal de que un Generador Manifestante se ha dispersado: demasiados compromisos que el cuerpo no respaldaba, o movimientos hechos sin avisar que chocan con la resistencia de los demás.',
          'Suele verse como proyectos a medio terminar y mucha prisa sin avance real. Cuando predomina, conviene mirar dónde se dijo que sí de más y a quién no se informó.'
        ]
      }
    },
    projector: {
      aligned: {
        name: 'Éxito',
        text: [
          'El **éxito** es la señal del Proyector, y aquí no significa dinero ni estatus: significa **ser visto**. Se nota cuando la mirada propia es reconocida, cuando llega una invitación que encaja de verdad y cuando el esfuerzo va a parar a quien lo valora.',
          'Aparece al esperar el reconocimiento en vez de ofrecerse sin que nadie lo pida, y al dosificar la energía en lugar de forzarse al ritmo de un Generador.'
        ]
      },
      misaligned: {
        name: 'Amargura',
        text: [
          'La **amargura** es la señal de que un Proyector se está ofreciendo donde no se le ha llamado, o exigiéndose una energía que no tiene: sensación de ser invisible, de dar mucho y recibir poco, y agotamiento de fondo.',
          'Es la señal más fácil de confundir con un problema de los demás. Cuando predomina, suele indicar que hace falta descansar, retirar la energía de donde no se valora y esperar el reconocimiento en vez de perseguirlo.'
        ]
      }
    },
    manifestor: {
      aligned: {
        name: 'Paz',
        text: [
          'La **paz** es la señal del Manifestador: calma alrededor y libertad de movimiento. No es serenidad interior permanente — es la ausencia de resistencia, la sensación de poder iniciar sin que cada paso se convierta en un forcejeo.',
          'Aparece sobre todo al **informar antes de actuar**: avisar a quienes va a alcanzar el impacto es lo que desactiva la oposición antes de que llegue a formarse.'
        ]
      },
      misaligned: {
        name: 'Enfado',
        text: [
          'El **enfado** es la señal de que un Manifestador está encontrando resistencia: gente que se opone, permisos que no llegan, la sensación de tener que pelear cada movimiento.',
          'Casi siempre apunta a lo mismo: se actuó sin informar, o se está forzando una constancia que no es propia de este diseño. Cuando predomina, conviene mirar a quién no se avisó — y cuánto descanso se está saltando.'
        ]
      }
    },
    reflector: {
      aligned: {
        name: 'Sorpresa',
        text: [
          'La **sorpresa**, y un cierto deleite, es la señal del Reflector: la vida sorprende gratamente cuando el entorno y las compañías son los correctos. Es una señal más liviana que las demás, y por eso pide atenderla con cuidado.',
          'Aparece al elegir bien dónde se está y con quién, y al **darse el ciclo entero** antes de cerrar lo importante.'
        ]
      },
      misaligned: {
        name: 'Decepción',
        text: [
          'La **decepción** es la señal de que un Reflector está en el lugar equivocado, con la gente equivocada, o de que ha decidido demasiado rápido.',
          'Rara vez es un problema de las personas concretas: es cuestión de encaje, porque lo que un Reflector muestrea del entorno lo atraviesa entero. Cuando predomina, lo que más cambia las cosas es **cambiar de entorno**, no esforzarse más.'
        ]
      }
    }
  },

  // ── Incarnation cross: the angle only. The ~768 canonical cross names are a
  // separate content task; the drawer composes meaning from the four gates. ──
  cross: {
    right: {
      name: 'Cruz derecha',
      text: 'El **ángulo** de esta cruz es **derecho**, es decir, la vida se orienta desde una geometría **personal**: el camino se recorre sobre todo a través de la propia experiencia, y lo que a uno le toca se cumple viviendo lo suyo. Es, con diferencia, el ángulo más frecuente.'
    },
    left: {
      name: 'Cruz izquierda',
      text: 'El **ángulo** de esta cruz es **izquierdo**, es decir, la vida se orienta desde una geometría **transpersonal**: buena parte de lo importante llega a través de otras personas, y lo de uno se cumple en relación con ellas. Los encuentros no son un accesorio del camino, son el material con el que está hecho.'
    },
    juxtaposition: {
      name: 'Cruz de yuxtaposición',
      text: 'El **ángulo** de esta cruz es de **yuxtaposición**, es decir, la vida se orienta desde una geometría **fija**: un papel muy concreto, ni personal ni transpersonal, que se sostiene con bastante independencia de lo que pase alrededor. Corresponde a un solo perfil, el 4/1, y es el ángulo más raro.'
    }
  },

  // ── Type (the chip "i"): each concrete type. ──
  type: {
    generator: {
      title: 'Generador',
      paragraphs: [
        'Tipo mayoritario, Generador *puro*: alrededor del **~37% de la población**. Su rasgo definitorio es el [centro Sacral](center:sacral) definido: la fuente de energía vital del sistema, generativa y de carácter renovable. Su energía generadora y constructora, cuando está bien alineado, es continuada y abundante.',
        'Opera por respuesta: **reacciona a lo que la vida le presenta** en lugar de iniciar desde la mente y lo racional. Cuando compromete su energía con lo correcto, aparece la *satisfacción*; si no se escucha bien y fuerza su energía donde no toca, aparece la *frustración*.',
        'En la práctica, su centro Sacral responde antes que su mente: ante algo concreto —una propuesta, una pregunta, una situación— surge una reacción visceral de atracción o rechazo. **Seguir esa señal del cuerpo**, en vez de decidir desde el pensamiento y la razón, es lo que mantiene su energía bien empleada.'
      ]
    },
    'manifesting-generator': {
      title: 'Generador Manifestante',
      paragraphs: [
        'Una variante del [Generador](type:generator) —los Generadores Manifestantes suponen un ~33% de la población, y junto al resto de Generadores, cerca del 70 %—: un Generador Manifestante tiene el [Sacral](center:sacral) definido, y lo que lo diferencia de otros Generadores es que además tiene la [Garganta](center:throat) conectada a un centro motor. Eso le da la energía generadora propia de los Generadores y, además, capacidad de manifestar y materializar con rapidez.',
        'Su estrategia es **responder y luego informar**: primero espera la respuesta sacral —el sí o el no del cuerpo— y, una vez la tiene, avisa a quienes se verán afectados antes de lanzarse. Tiende a ser polifacético, veloz y no lineal: salta pasos, hace varias cosas a la vez y a veces vuelve atrás a rematar lo que se saltó.',
        'La clave para gestionar su energía es no dispersarse iniciando sin haber escuchado la respuesta de su cuerpo: cuando se compromete con lo que de verdad le enciende (cuando su cuerpo dice sí), avanza rápido y siente *satisfacción* y *paz*; pero cuando fuerza empujado por la mente y las ideas, acumula *frustración*, *enfado* y trabajo a medias.'
      ]
    },
    projector: {
      title: 'Proyector',
      paragraphs: [
        'Cerca del **~20% de la población**. No tiene el [Sacral](center:sacral) definido, así que **no está diseñado para un trabajo constante** ni para sostener la misma energía que un [Generador](type:generator): debe cuidarse de intentar rendir de manera continuada y sin descanso. Su don es otro: ver a los demás con enorme profundidad y saber guiar y orientar la energía ajena.',
        'Su estrategia es **esperar la invitación** para lo importante —el trabajo, el amor, el lugar donde vivir—. Necesita ser reconocido e invitado para que su sabiduría y su esfuerzo sean bien recibidos; cuando se ofrece o se mete sin que se lo pidan, lo normal es que encuentre resistencia y rechazo. Cuando en su vida aparecen el *reconocimiento* y el *éxito*, son la pista de que va por buen camino. En cambio, el síntoma que aparece cuando no vive alineado es la *amargura*.',
        'En la gestión de su energía, su tarea es **descansar y dosificarse**: no compite en resistencia física, sino en profundidad y maestría. Su bienestar se fundamenta en dormir y soltar antes de quedar agotado, y en elegir bien a quién entrega su atención y esfuerzo: aprender a decir que sí o que no cuando toca (porque no toda invitación significa que tenga que decir que sí).'
      ]
    },
    manifestor: {
      title: 'Manifestador',
      paragraphs: [
        'El tipo más independiente, alrededor del **~9% de la población**. Tiene al menos un centro motor (el Corazón o el Plexo solar) conectado a la [Garganta](center:throat), pero el [Sacral](center:sacral) sin definir, así que su energía no es constante: llega a impulsos, que utiliza para iniciar y poner cosas en marcha, y luego necesita reposo, bastante reposo.',
        'Su estrategia es **informar antes de actuar**. No se trata de pedir permiso, sino de avisar a quienes su impacto va a alcanzar: al hacerlo, reduce la resistencia y el rechazo que de otro modo encuentra a su alrededor. Actuar de manera alineada con su estrategia le trae *paz*; y si no lo hace, siente oposición y crece en él el *enfado*.',
        'El Manifestador está aquí para **iniciar e impactar**, no para ejecutar de forma sostenida. Gestionar su energía pasa por respetar sus ciclos de empuje y descanso, y por proteger su autonomía sin aislarse de quienes le rodean.'
      ]
    },
    reflector: {
      title: 'Reflector',
      paragraphs: [
        'El tipo más infrecuente: apenas el **~1% de la población**. No tiene ningún centro definido: todo su bodygraph está abierto. Eso lo convierte en un espejo extraordinariamente sensible de la gente y los lugares que lo rodean, capaz de percibir la salud de una comunidad.',
        'Como muestrea constantemente la energía ajena, **el entorno y las compañías le afectan muchísimo**: con quién y dónde está cambia profundamente su experiencia. Su estrategia es **esperar un ciclo lunar** —unos 28 días— antes de las decisiones importantes, dejando que el asunto se vea desde muchos ángulos antes de cerrarlo.',
        'Su mayor cuidado en la gestión de la energía es elegir bien los entornos y no identificarse con lo que solo está reflejando. Cuando vive alineado con su diseño, viviendo en el lugar y con las personas adecuadas, aparecen en él la *sorpresa* y el *deleite*. Si por el contrario no vive alineado, el síntoma que aparece en él es la *decepción*.'
      ]
    }
  },

  // ── Strategy (the value "i"): each concrete strategy. ──
  strategy: {
    respond: {
      title: 'Responder',
      paragraphs: [
        'La estrategia del Generador. En lugar de salir a iniciar desde la cabeza, el diseño pide **esperar a tener algo a lo que responder**: una propuesta, una pregunta, una oportunidad que aparece. La vida presenta el material; el cuerpo responde.',
        'La respuesta surge en el [centro Sacral](center:sacral) como una **reacción visceral**, anterior al razonamiento: un impulso de acercarse o de apartarse. Un sí o un no. Confiar en ese sí o no del cuerpo, en vez de convencerse mentalmente, es lo que lleva a la satisfacción; forzar la acción donde no hay respuesta conduce a la frustración.'
      ]
    },
    'respond-then-inform': {
      title: 'Responder y luego informar',
      paragraphs: [
        'La estrategia del Generador Manifestante, que combina las dos estrategias de responder e informar. Ante todo, como cualquier Generador, responde, es decir: **espera la respuesta sacral** —el sí o el no del cuerpo ante algo concreto—; no inicia por mente.',
        'Una vez tiene esa respuesta y va a actuar, **informa a quienes se verán afectados** antes de lanzarse. Por su capacidad de manifestar con rapidez, avisar reduce la fricción con el entorno y evita que su velocidad genere resistencia. Saltarse cualquiera de los dos pasos —responder e informar— es la fuente habitual de su desgaste.'
      ]
    },
    'inform-before-acting': {
      title: 'Informar antes de actuar',
      paragraphs: [
        'La estrategia del Manifestador. Como su energía inicia e impacta sin avisar, el diseño pide **informar a las personas a las que va a afectar antes de ponerse en marcha**. No se trata de pedir permiso ni justificarse: es simplemente comunicar lo que se va a hacer.',
        'El efecto es muy práctico: informar disuelve gran parte de la resistencia que encuentra cuando actúa por sorpresa. De hecho, informar incluso puede traerle aliados que facilitan el camino. Hacerlo trae paz a su alrededor; omitirlo provoca el enfado y la oposición que, sin darse cuenta, acaban dificultando su propio movimiento.'
      ]
    },
    'wait-for-invitation': {
      title: 'Esperar la invitación',
      paragraphs: [
        'La estrategia del Proyector. Para las cosas importantes —un trabajo, una relación, un compromiso grande— el diseño pide **esperar a ser reconocido e invitado** en lugar de ofrecerse sin que nadie lo pida.',
        'No es pasividad: el Proyector sigue viviendo y preparándose, pero reserva su sabiduría para quien la valora y la solicita. **La invitación correcta abre la puerta** a que su don sea bien recibido; insistir sin ella suele traer resistencia, amargura y rechazo. El reconocimiento y el éxito son la señal de que la espera ha valido la pena.'
      ]
    },
    'wait-lunar-cycle': {
      title: 'Esperar un ciclo lunar',
      paragraphs: [
        'La estrategia del Reflector. Antes de una decisión importante, el diseño pide **dejar pasar un ciclo lunar completo** —unos 28 días— en lugar de resolver de golpe.',
        'Durante ese tiempo, el Reflector **conversa, muestrea distintos entornos y observa cómo cambia su percepción** del asunto día a día. Como su carta está completamente abierta, necesita ese recorrido para distinguir lo que es suyo de lo que solo está reflejando. La claridad llega por acumulación, por ver el asunto desde diferentes perspectivas, no por impulso.'
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
        'La autoridad de la mayoría de Generadores. Reside en el **[centro Sacral](center:sacral)**, que responde **en el momento** con un sonido o un impulso visceral —una especie de "ajá" de atracción o un "mmm-mmm" de rechazo— ante algo concreto: el cuerpo *dice* sí o no.',
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
      title: 'Autoridad mental/ambiental',
      paragraphs: [
        'También llamada autoridad ambiental o "caja de resonancia", propia de algunos Proyectores sin centros internos definidos para decidir. No hay una autoridad corporal interna fija: la claridad no surge de dentro de golpe, **la claridad surge del diálogo**.',
        'La práctica consiste en **hablar el asunto con personas de confianza y en el entorno adecuado**, no para que decidan por uno, sino para escucharse pensar en voz alta. El lugar y la compañía correctos son aquí parte del método: la decisión se va decantando con el tiempo y la conversación.'
      ]
    },
    lunar: {
      title: 'Autoridad lunar',
      paragraphs: [
        'La autoridad del Reflector, el único tipo sin ningún centro definido. Al no haber una fuente interna fija, la guía es el **tiempo**: un ciclo lunar completo, unos 28 días, antes de las decisiones importantes.',
        'Durante ese ciclo, la persona **muestrea distintos estados, entornos y conversaciones**, y observa cómo evoluciona su percepción del asunto. La claridad llega por **maduración** y acumulación de perspectivas, no por impulso: lo que sigue resonando tras recorrer el ciclo entero es lo fiable.'
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
        'Es una energía **experimental y resiliente**: descubre lo que funciona descartando lo que no. Su sabiduría es muy práctica, y resulta esencial que no lea sus traspiés como defectos personales, sino como el método mismo por el que está diseñada para aprender.'
      ]
    },
    '4': {
      title: 'Línea 4 — la red',
      paragraphs: [
        'La cuarta línea funciona a través de los **vínculos y la comunidad**. Las oportunidades —trabajo, amor, cambios— suelen llegarle por personas que ya conoce, no por desconocidos ni por salir a buscar en frío.',
        'Es una energía **cálida y relacional**, que necesita solidez en sus afectos. Su consejo práctico clásico es no soltar una base —un empleo, una situación— hasta tener la siguiente asegurada a través de su red: las transiciones le funcionan mejor así.'
      ]
    },
    '5': {
      title: 'Línea 5 — la proyección',
      paragraphs: [
        'La quinta línea vive bajo un **campo de proyección**: los demás depositan en ella expectativas, esperando soluciones prácticas. Lo hacen porque la ven como alguien capaz de resolver, casi a la manera de un salvador.',
        'Eso le da influencia y un papel natural de **liderazgo útil**, pero también la expone y le exige: si no cumple lo proyectado, la misma fuerza puede volverse en su contra. Su reto es gestionar bien su **reputación** y aclarar en lo posible las expectativas de los demás, poniendo cuidado en prometer solo lo que de verdad puede entregar.'
      ]
    },
    '6': {
      title: 'Línea 6 — el modelo',
      paragraphs: [
        'La sexta línea recorre **tres fases vitales**: (1) hasta cerca de los 30 años, vive como una línea 3, probando, tropezando y hasta colapsando; luego (2) vive una segunda etapa donde se retira energéticamente a observar y procesar —etapa "sobre el tejado"—; y (3) a partir de los 50, aproximadamente, emerge como **ejemplo y referente**.',
        'Su orientación de fondo es la **objetividad y la madurez**: aspira a vivir según lo que considera correcto y verdadero, y a convertirse en modelo para otros. Entender en qué fase está ayuda a no juzgarse: la observación de la etapa media no es desconexión, sino preparación.'
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
        'Su reto suele ser el opuesto al de las definiciones divididas: como funciona bien por sí sola, puede ensimismarse o costarle abrirse a la influencia ajena. Reconocer cuándo conviene salir de la propia burbuja es parte de su aprendizaje.'
      ]
    },
    split: {
      title: 'Definición split',
      paragraphs: [
        'Los centros definidos forman **dos grupos separados**, sin un canal que los una por dentro. La persona suele experimentar una **búsqueda de conexión**: algo que tienda el puente entre sus dos partes.',
        'Ese puente llega a menudo a través de otras personas —cuya energía completa el canal que falta— o de tránsitos planetarios que activan la puerta intermedia. Esta separación (split) no es una carencia: se trata de entender que hay compañías y entornos que la hacen sentir integrada, y esto sucede de manera natural.'
      ]
    },
    'triple-split': {
      title: 'Definición triple split',
      paragraphs: [
        'Los centros definidos se reparten en **tres grupos** separados. El cableado interno es más complejo y, con frecuencia, la persona necesita **más variedad de estímulos y de gente** para sentir que sus partes internas se conectan.',
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
      fn: 'Es un centro de **presión mental**: la fuerza que empuja a pensar, preguntar e inspirarse. Genera las preguntas y la curiosidad, pero no las responde —eso es tarea del [Ajna](center:ajna)—.',
      defined: '**Definido**, aporta una forma constante de inspirarse y de sentir la presión por entender.',
      open: '**Indefinido**, amplifica las preguntas y la inquietud mental de los demás: aquí conviene no dejarse arrastrar a resolver dudas que en realidad no son propias ni importan para la propia vida.'
    },
    ajna: {
      title: 'Ajna',
      fn: 'Es el centro de la **mente y la conceptualización**: procesa la información, forma ideas y da estructura al pensamiento, trabajando con la presión que le llega de la [Cabeza](center:head).',
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
      fn: 'Es el centro de la **identidad, el amor y la dirección**: el sentido de quién se es y hacia dónde va la propia vida. Está ligado también a la sensación de estar en el lugar correcto.',
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
      fn: 'Es un centro de **presión y adrenalina**: el empuje que pone en marcha y el estrés que urge a actuar para liberarse de esa presión. Da el pulso para arrancar las cosas.',
      defined: '**Definido**, aporta una forma constante de manejar la presión y el estrés.',
      open: '**Indefinido**, **amplifica la prisa** y la sensación de tener que quitarse cuanto antes lo pendiente de encima; su aprendizaje es no dejarse empujar a decisiones apresuradas solo para aliviar una presión que, en buena parte, es prestada.'
    }
  },

  // ── Activations (Phase 6.E): the table's column headers and planets. ──
  activationCol: {
    personality: {
      title: 'Personalidad (consciente)',
      paragraphs: [
        'La columna **Personalidad** representa lo **consciente**: lo que la persona reconoce como "yo", su mente y su personalidad. Se calcula con la posición de los planetas en el **instante exacto del nacimiento**.',
        'Es la parte de la carta con la que uno se identifica y de la que suele ser consciente. En el bodygraph se pinta en blanco.'
      ]
    },
    design: {
      title: 'Diseño (inconsciente)',
      paragraphs: [
        'La columna **Diseño** representa lo **inconsciente**: el cuerpo, lo heredado, lo que opera sin control consciente y que otros suelen ver antes que uno mismo. Se calcula unos **88 días antes del nacimiento** (88° de arco solar).',
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
        'El **Sol** es la activación más importante de la carta: marca la **expresión esencial**, la energía que la persona irradia y el propósito que encarna. Junto con la Tierra, concentra la mayor parte del significado (~70%).',
        'Su puerta de personalidad suele leerse como la nota dominante de la identidad consciente.'
      ]
    },
    earth: {
      title: 'Tierra',
      paragraphs: [
        'La **Tierra** equilibra al Sol: es lo que **arraiga y estabiliza**, el suelo sobre el que se sostiene el propósito. Forma con el Sol el eje más determinante de la carta.',
        'Aporta el contrapeso práctico a la energía solar: lo que se necesita para mantenerse centrado.'
      ]
    },
    moon: {
      title: 'Luna',
      paragraphs: [
        'La **Luna** señala lo que **impulsa y mantiene en marcha**: el motor de la continuidad en el día a día. En el Reflector cobra un papel central, al recorrer su ciclo de unos 28 días.',
        'Habla de aquello que sostiene el movimiento cuando el entusiasmo inicial ya pasó.'
      ]
    },
    northNode: {
      title: 'Nodo Norte',
      paragraphs: [
        'El **Nodo Norte** describe la **dirección y el entorno** hacia los que se orienta la segunda parte de la vida (de forma aproximada, a partir de la madurez). Marca hacia dónde se dirige la vida.',
        'No es un rasgo de carácter sino un **contexto**: el escenario donde la energía se despliega mejor.'
      ]
    },
    southNode: {
      title: 'Nodo Sur',
      paragraphs: [
        'El **Nodo Sur** describe el **entorno** de la primera parte de la vida: el escenario del que se parte. Con el Nodo Norte forma el eje de la trayectoria vital.',
        'Habla del "de dónde se viene" en términos de ambiente y dirección, más que de personalidad.'
      ]
    },
    mercury: {
      title: 'Mercurio',
      paragraphs: [
        'Mercurio rige la **comunicación y el pensamiento**: lo que se necesita expresar y compartir, y cómo se conectan las ideas con los demás.',
        'Matiza la manera de hablar y transmitir.'
      ]
    },
    venus: {
      title: 'Venus',
      paragraphs: [
        'Venus se asocia a los **valores, los afectos y el sentido de lo correcto**: lo que se aprecia, la forma de amar y lo que se considera justo o bello.',
        'Aporta el tono de los vínculos y de la moral personal.'
      ]
    },
    mars: {
      title: 'Marte',
      paragraphs: [
        'Marte representa la **energía, el impulso y la inmadurez** que se va puliendo con los años: el empuje, a veces desordenado, sobre todo en la juventud.',
        'Habla de cómo se canaliza la fuerza y la acción.'
      ]
    },
    jupiter: {
      title: 'Júpiter',
      paragraphs: [
        'Júpiter se asocia a la **expansión, la ley y la abundancia**: los principios que benefician y dónde se encuentra el crecimiento.',
        'Aporta el sentido de protección y de lo que hace prosperar.'
      ]
    },
    saturn: {
      title: 'Saturno',
      paragraphs: [
        'Saturno es la **disciplina y el límite**: el "juez" que exige rigor, corrige y marca lo que se aprende a base de constancia.',
        'Señala dónde la madurez llega a través del esfuerzo y la responsabilidad.'
      ]
    },
    uranus: {
      title: 'Urano',
      paragraphs: [
        'Urano representa lo **singular y lo inusual**: la originalidad y aquello en lo que se sigue un camino propio, fuera de lo convencional.',
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
        'Señala dónde la vida confronta con lo esencial para transformar desde dentro.'
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
    1: { theme: 'la expresión creativa', text: 'La puerta 1 es la energía de **crear desde la propia identidad**: una expresión original que no imita a nadie. En su mejor versión inspira a los demás; en su sombra, se repliega en la melancolía cuando no encuentra cómo salir al mundo.' },
    2: { theme: 'la dirección receptiva', text: 'La puerta 2 es la **dirección receptiva**: saber hacia dónde ir sin forzarlo, dejando que el rumbo emerja en vez de imponerlo. Su don es una orientación natural que da sentido al movimiento; su sombra, sentirse perdido cuando intenta dirigir desde la pura voluntad.' },
    3: { theme: 'el orden en lo nuevo', text: 'La puerta 3 es la energía de **poner orden en lo nuevo**: arrancar algo desde el caos del comienzo, cuando aún no hay forma. Su don es saber iniciar y estructurar lo que empieza; su sombra, la frustración y el bloqueo cuando se quiere ir más rápido de lo que el proceso permite.' },
    4: { theme: 'las respuestas mentales', text: 'La puerta 4 es la mente que **busca respuestas y fórmulas** ante las preguntas abiertas. Su don es conceptualizar soluciones lógicas; su sombra, la presión por tener ya una respuesta, confundiendo una hipótesis con una certeza.' },
    5: { theme: 'los ritmos fijos', text: 'La puerta 5 son los **ritmos y los hábitos fijos**: la energía que sostiene rutinas constantes y un compás propio. Su don es la fiabilidad de un ritmo natural que ancla el día; su sombra, la ansiedad cuando ese ritmo se rompe.' },
    6: { theme: 'la intimidad y la fricción', text: 'La puerta 6 regula la **intimidad y la fricción emocional**: cuándo abrirse y cuándo cerrarse, la frontera de lo íntimo. Su don es una emocionalidad que crea cercanía profunda; su sombra, el conflicto y la reactividad cuando esa frontera se gestiona desde la emoción del momento.' },
    7: { theme: 'el liderazgo y la dirección', text: 'La puerta 7 es el **papel de guía hacia el futuro**: la capacidad de dar dirección y liderar, a menudo desde un segundo plano. Su don es una autoridad natural que otros quieren seguir; su sombra, la necesidad de controlar el rumbo o de imponerse.' },
    8: { theme: 'la contribución', text: 'La puerta 8 es la **contribución**: aportar algo propio que marque una diferencia y dar voz a lo que importa. Su don es una expresión auténtica que invita a otros a sumarse; su sombra, contribuir buscando reconocimiento y quedarse en lo vacío.' },
    9: { theme: 'el foco en el detalle', text: 'La puerta 9 es la energía del **foco y la concentración** en los detalles que hacen falta para llevar algo a término. Su don es una atención sostenida que completa; su sombra, perderse en lo pequeño o dispersarse.' },
    10: { theme: 'el amor propio', text: 'La puerta 10 es el **amor propio y la fidelidad a uno mismo**: comportarse de acuerdo con lo que se es. Su don es una autenticidad que no se traiciona; su sombra, la autocrítica o contorsionarse para encajar.' },
    11: { theme: 'las ideas', text: 'La puerta 11 es la mente **llena de ideas** para compartir y dar sentido a la experiencia. Su don es una riqueza conceptual estimulante; su sombra, la presión por llevar cada idea a la acción, cuando las ideas están para compartirse más que para ejecutarse.' },
    12: { theme: 'la expresión cauta', text: 'La puerta 12 es la **expresión cauta**: hablar cuando el ánimo y el momento son los adecuados. Su don es una palabra que emociona y conmueve en su instante justo; su sombra, hablar fuera de tono o callar por reparo.' },
    13: { theme: 'la escucha', text: 'La puerta 13 es la **escucha y la memoria**: recoger las historias y los secretos de los demás y darles sentido. Su don es un oído que invita a confiar y orienta; su sombra, cargar con lo que otros depositan.' },
    14: { theme: 'el poder para los recursos', text: 'La puerta 14 es la **energía para generar y dirigir recursos**: el empuje que da poder al trabajo propio. Su don es una fuerza generadora que prospera; su sombra, trabajar sin un porqué o sin valores que la guíen.' },
    15: { theme: 'el amor a la diversidad', text: 'La puerta 15 es el **amor a la humanidad y a sus extremos**: una atracción por la diversidad de ritmos y formas de vivir. Su don es acoger lo distinto y encontrar el flujo adecuado; su sombra, un ritmo errático o juzgar el ritmo ajeno.' },
    16: { theme: 'el entusiasmo y la destreza', text: 'La puerta 16 es el **entusiasmo y la destreza**: el talento que se expresa y se afina con la práctica. Su don es un entusiasmo contagioso y la maestría; su sombra, el entusiasmo vacío sin fondo ni preparación.' },
    17: { theme: 'las opiniones', text: 'La puerta 17 es la mente que **forma opiniones** y se anticipa para organizar. Su don son opiniones útiles que estructuran; su sombra, presentar como hechos lo que son solo pareceres.' },
    18: { theme: 'la corrección', text: 'La puerta 18 es el instinto de **corregir y mejorar** lo que se ha torcido. Su don es una mirada aguda que perfecciona y protege; su sombra, la crítica incesante y el perfeccionismo.' },
    19: { theme: 'la sensibilidad a las necesidades', text: 'La puerta 19 es la **sensibilidad a las necesidades**: captar lo que la gente y la comunidad necesitan, también lo material y afectivo. Su don es una fina sintonía con lo que hace falta; su sombra, la necesidad excesiva o la hipersensibilidad.' },
    20: { theme: 'el ahora', text: 'La puerta 20 es el **ahora**: la conciencia y la expresión del momento presente. Su don es una acción espontánea y certera en el instante; su sombra, el ajetreo o el hablar sin presencia.' },
    21: { theme: 'el control', text: 'La puerta 21 es la **voluntad de controlar** los propios recursos y el propio territorio. Su don es una autoridad legítima sobre lo que es suyo; su sombra, querer controlarlo todo o sentirse controlado.' },
    22: { theme: 'la gracia', text: 'La puerta 22 es la **gracia y la apertura emocional**: el encanto social que sabe escuchar y abrirse. Su don es una emocionalidad que atrae y conecta; su sombra, el retraimiento cuando el ánimo no acompaña.' },
    23: { theme: 'la asimilación', text: 'La puerta 23 es la **asimilación**: traducir un saber individual a algo simple y comprensible. Su don es hacer claro lo complejo, esos "clics" que otros entienden; su sombra, hablar a destiempo y no ser comprendido.' },
    24: { theme: 'la racionalización', text: 'La puerta 24 es la mente que **vuelve una y otra vez sobre un pensamiento** hasta darle sentido. Su don es la revelación que nace de revisar; su sombra, el bucle obsesivo del que no se sale.' },
    25: { theme: 'el amor universal', text: 'La puerta 25 es la **inocencia y el amor universal**: un querer puro que no espera nada a cambio. Su don es una entrega limpia y desinteresada; su sombra, perder esa inocencia por herida o por ego.' },
    26: { theme: 'la transmisión persuasiva', text: 'La puerta 26 es la **transmisión persuasiva**: la voluntad de comunicar y poner en valor, de "vender" una idea. Su don es un poder de convicción que mueve; su sombra, la manipulación y las medias verdades.' },
    27: { theme: 'el cuidado', text: 'La puerta 27 es el **cuidado y la nutrición**: la energía de hacerse cargo y sostener a otros. Su don es un cuidado que nutre de verdad; su sombra, sobreproteger o darse hasta agotarse.' },
    28: { theme: 'la búsqueda de sentido', text: 'La puerta 28 es la **búsqueda de sentido**: el juego de arriesgarse por algo que merezca la pena. Su don es encontrar un propósito por el que valga la pena luchar; su sombra, la lucha por la lucha y el miedo a una vida sin sentido.' },
    29: { theme: 'el compromiso', text: 'La puerta 29 es el **compromiso**: la energía de decir sí y perseverar hasta el final. Su don es una entrega que cumple lo que empieza; su sombra, comprometerse en exceso o decir sí donde no tocaba.' },
    30: { theme: 'el deseo', text: 'La puerta 30 es el **deseo y el anhelo**: el fuego de las expectativas que impulsa a vivir experiencias. Su don es una pasión que da combustible a la vida; su sombra, dejarse consumir por ansias que no se sacian.' },
    31: { theme: 'el liderazgo por la voz', text: 'La puerta 31 es el **liderazgo por la voz**: la influencia de quien habla por un grupo y lo representa. Su don es un liderazgo que otros eligen seguir; su sombra, liderar sin mandato real o por mera ambición.' },
    32: { theme: 'la continuidad', text: 'La puerta 32 es el instinto de **continuidad**: olfatear qué perdura y qué hay que adaptar para que dure. Su don es un instinto para el valor duradero; su sombra, el miedo al fracaso y al cambio que paraliza.' },
    33: { theme: 'el retiro y el relato', text: 'La puerta 33 es el **retiro y el relato**: apartarse para luego contar lo vivido. Su don es una sabiduría que se comparte tras la reflexión; su sombra, no honrar la necesidad de retirarse, o contar de más o de menos.' },
    34: { theme: 'el poder', text: 'La puerta 34 es el **poder puro**: la fuerza independiente, siempre atareada en hacer. Su don es una potencia productiva enorme; su sombra, el ajetreo por el ajetreo, ponerse en marcha sin haber respondido.' },
    35: { theme: 'el ansia de experiencia', text: 'La puerta 35 es el **ansia de experiencia y de progreso**: el impulso de probarlo todo y avanzar. Su don es un hambre de vivir que empuja hacia adelante; su sombra, la inquietud de nunca quedar satisfecho.' },
    36: { theme: 'la crisis y lo nuevo', text: 'La puerta 36 es la **crisis emocional y lo nuevo**: el vaivén que lleva a experiencias inéditas. Su don es crecer a través de la intensidad emocional; su sombra, lanzarse al drama o a la crisis sin estar preparado.' },
    37: { theme: 'la amistad y los pactos', text: 'La puerta 37 es la **amistad y la comunidad**: la calidez que une a través de pactos y acuerdos. Su don es un afecto que crea familia y pertenencia; su sombra, la dependencia o los pactos rotos.' },
    38: { theme: 'la lucha con sentido', text: 'La puerta 38 es la **lucha por lo que vale la pena**: la tenacidad de plantar cara por una causa. Su don es una perseverancia con propósito; su sombra, pelear por pelear o la cabezonería.' },
    39: { theme: 'la provocación', text: 'La puerta 39 es la **provocación**: remover la emoción ajena para sacar a la luz lo que de verdad importa. Su don es provocar para revelar el espíritu; su sombra, la provocación gratuita o el malhumor.' },
    40: { theme: 'la entrega y el descanso', text: 'La puerta 40 es la **entrega y la soledad**: trabajar y proveer para luego retirarse a reponerse. Su don es una generosidad que sabe también descansar; su sombra, el exceso de trabajo sin pausa, o negarse a dar.' },
    41: { theme: 'la imaginación que inicia el deseo', text: 'La puerta 41 es la **imaginación que inicia el deseo**: el comienzo de toda nueva experiencia, soñada antes de vivirse. Su don es una fantasía que abre experiencias nuevas; su sombra, una imaginación desconectada de la realidad o la presión de un anhelo no saciado.' },
    42: { theme: 'la culminación', text: 'La puerta 42 es la **culminación**: la energía de cerrar ciclos y llevar las cosas hasta el final. Su don es la capacidad de completar lo empezado; su sombra, empezar sin terminar o el miedo a los finales.' },
    43: { theme: 'la intuición mental', text: 'La puerta 43 es la **intuición mental**: un saber individual que llega como un fogonazo, adelantado a los demás. Su don es una idea original y reveladora; su sombra, empeñarse en decirla a destiempo y que no la entiendan.' },
    44: { theme: 'el instinto del pasado', text: 'La puerta 44 es el **instinto que lee el pasado**: una alerta para reconocer patrones, personas y oportunidades. Su don es un olfato para la gente y el momento; su sombra, el miedo a que el pasado se repita.' },
    45: { theme: 'la voz de los recursos', text: 'La puerta 45 es la **voz que reúne y reparte los recursos**: el "yo tengo" de quien administra lo común. Su don es una administración generosa que cuida del grupo; su sombra, el acaparamiento o el sentirse con derecho a todo.' },
    46: { theme: 'el amor al cuerpo', text: 'La puerta 46 es el **amor al cuerpo y el buen estar**: la determinación de habitar el cuerpo y de estar en el lugar correcto. Su don es una serendipia que pone en el sitio justo en el momento justo; su sombra, descuidar o forzar el cuerpo.' },
    47: { theme: 'la realización mental', text: 'La puerta 47 es la **realización**: la presión mental por dar sentido a la confusión hasta que llega el "ajá". Su don es resolver lo confuso en una comprensión clara; su sombra, quedarse atrapado en la sensación de opresión o sinsentido.' },
    48: { theme: 'la profundidad', text: 'La puerta 48 es la **profundidad**: un pozo de talento y sabiduría del que sacar soluciones. Su don es una hondura que aporta lo que falta; su sombra, el miedo a no ser suficiente o a no estar listo.' },
    49: { theme: 'los principios', text: 'La puerta 49 son los **principios y la revolución**: aceptar o rechazar según valores profundos. Su don es transformar los vínculos desde principios claros; su sombra, el rechazo rígido o la revolución sin sensibilidad.' },
    50: { theme: 'los valores', text: 'La puerta 50 son los **valores y la responsabilidad**: el cuidado de las normas que protegen el bienestar del grupo. Su don es una guarda de valores que sostiene a los demás; su sombra, la sobre-responsabilidad y el miedo a fallar al grupo.' },
    51: { theme: 'el impulso y el choque', text: 'La puerta 51 es el **impulso de ser el primero**: la iniciativa que sacude y despierta. Su don es un coraje que espabila a otros; su sombra, la competitividad o la temeridad.' },
    52: { theme: 'la quietud y el foco', text: 'La puerta 52 es la **quietud y la concentración**: la presión de parar para enfocar y ver el conjunto. Su don es una calma que permite concentrarse; su sombra, la inercia o la inquietud de no saber estarse quieto.' },
    53: { theme: 'los comienzos', text: 'La puerta 53 son los **comienzos**: la presión y la energía para iniciar nuevos ciclos. Su don es el empuje para arrancar lo nuevo; su sombra, empezar sin descanso sin llegar a completar.' },
    54: { theme: 'la ambición', text: 'La puerta 54 es la **ambición**: el impulso de ascender, en lo material y en lo espiritual. Su don es una ambición que eleva; su sombra, perseguir el ascenso por la aprobación ajena o pasarse de la raya.' },
    55: { theme: 'la abundancia del ánimo', text: 'La puerta 55 es el **espíritu y la abundancia emocional**: la riqueza de los estados de ánimo y la fe. Su don es una hondura emocional y una fe que sostienen; su sombra, dejar que la melancolía o el vaivén del ánimo decidan.' },
    56: { theme: 'el relato estimulante', text: 'La puerta 56 es el **relato que estimula**: contar ideas y experiencias que enganchan. Su don es una narración cautivadora que abre horizontes; su sombra, adornar de más o la atención que divaga.' },
    57: { theme: 'la intuición en el ahora', text: 'La puerta 57 es la **intuición aguda en el ahora**: una claridad instintiva que penetra el presente. Su don es un saber sutil y certero en el instante; su sombra, el miedo al futuro que paraliza.' },
    58: { theme: 'la vitalidad y la mejora', text: 'La puerta 58 es la **vitalidad y la alegría de vivir**: la energía que empuja a mejorar las cosas. Su don es un gozo vital que impulsa la corrección; su sombra, la inquietud o la crítica sin alegría.' },
    59: { theme: 'la intimidad', text: 'La puerta 59 es la **intimidad**: la energía para romper barreras y crear vínculo, también sexual. Su don es el poder de generar cercanía y unión; su sombra, levantar muros o invadir en la intimidad.' },
    60: { theme: 'la aceptación del límite', text: 'La puerta 60 es la **aceptación del límite**: convertir la restricción en semilla de lo nuevo. Su don es transformar los límites en posibilidad; su sombra, quedarse atascado en la limitación y la melancolía.' },
    61: { theme: 'la verdad interior', text: 'La puerta 61 es la **verdad interior y el misterio**: la presión por conocer lo que no se puede saber del todo. Su don es una inspiración que busca el fondo de las cosas; su sombra, la presión mental de querer saberlo todo.' },
    62: { theme: 'el detalle y el orden', text: 'La puerta 62 es el **detalle y la organización**: poner nombre y orden a las cosas para expresarlas con precisión. Su don es una expresión clara y ordenada; su sombra, perderse en el detalle o explicarse de más.' },
    63: { theme: 'la duda', text: 'La puerta 63 es la **duda**: la presión que empuja a cuestionar y verificar. Su don es una duda sana que pone a prueba; su sombra, la sospecha que corroe y la ansiedad.' },
    64: { theme: 'la confusión fértil', text: 'La puerta 64 es la **confusión que busca sentido**: una presión de imágenes sin procesar que pugnan por ordenarse. Su don es una riqueza de imágenes que acaba en comprensión; su sombra, el agobio de querer resolver la confusión antes de tiempo.' }
  },

  // Initial report (Phase 7). General-frame sections (Parte A) + the shared
  // collective comparison + short connective lead-ins for the personalised
  // sections. The per-element substance (type, strategy, authority, profile,
  // definition, centres) is reused from the blocks above; buildReport (report.js)
  // assembles everything in order.
  report: {
    intro: {
      title: 'Qué es el Diseño Humano',
      paragraphs: [
        'El Diseño Humano es un sistema de autoconocimiento que combina astrología, el *I Ching*, el árbol de la vida cabalístico, los chakras y algo de lenguaje físico-cuántico. A partir de tu fecha, hora y lugar de nacimiento genera una "carta" (el gráfico o [*bodygraph*](section:chart)) que describe cómo está diseñada tu energía: cómo tomas decisiones bien, cómo gastas y recuperas energía, y cómo interactúas mejor con el mundo. No se considera ciencia —conviene decirlo claro— sino un marco simbólico; su valor está en si te resulta útil como espejo, no en que sea demostrable.'
      ]
    },
    ants: {
      title: 'La analogía de las hormigas',
      paragraphs: [
        'En cierta forma, podemos usar a las hormigas como símil: en un hormiguero no hay una "hormiga genérica", hay exploradoras que salen a rastrear, soldados construidas para defender, obreras que mantienen el nido y una reina cuya función es otra por completo. Ninguna es mejor; cada una está hecha para una forma de operar distinta, y el hormiguero funciona precisamente porque no son todas iguales. Pedirle a una exploradora que haga el trabajo de una soldado es agotarla en algo para lo que no está diseñada.',
        'Con las personas pasa algo parecido: tenemos maneras distintas de actuar y de relacionarnos en función de nuestra propia energía y diseño. El error habitual es suponer que todos deberíamos rendir, decidir o arrancar igual. El Diseño Humano propone lo contrario, y a esas diferentes maneras las llama [tipos](section:type). Lo valioso del marco es esa mirada: **deja de medirte con la vara de otro diseño**.'
      ]
    },
    chart: {
      title: 'El bodygraph',
      paragraphs: [
        'Tu carta se dibuja en un esquema gráfico del cuerpo llamado **bodygraph**: las nueve formas geométricas son los centros y las líneas que los conectan son los canales, que van de una puerta a otra (hay 64 puertas). Cada centro gobierna una función concreta y, en conjunto, dibujan cómo circula tu energía.',
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
      title: 'El Diseño Humano como experimento vital',
      paragraphs: [
        'El Diseño Humano no se presenta necesariamente como una verdad en la que creer ciegamente, sino como un **experimento para probar**: en lugar de adoptarlo como dogma, la propuesta es que vivas según tu diseño y observes, en tu propia vida, si las cosas fluyen mejor.',
        'El experimento es fácil de enunciar (aunque lleve su tiempo ponerlo en práctica): **tomar tus decisiones según [tu estrategia](section:strategy) y [tu autoridad](section:authority)** —las dos herramientas que verás más adelante— en vez de dejarte llevar por lo que se espera de ti, por la prisa, por la cabeza o por los mecanismos y patrones que llevas aplicando toda tu vida. Poco a poco, esto te devuelve a tu manera natural de funcionar. A este proceso se le llama **desacondicionamiento**, y es, en el fondo, de lo que va todo lo demás.'
      ]
    },
    // The five type lines render as a bulleted list in the report (buildReport
    // composes intro + bullets + outro); the intro/outro stay as paragraphs.
    collective: {
      title: 'Tu lugar en el colectivo',
      intro:
        'Como en [el símil de las hormigas](section:intro), los tipos de Diseño Humano describen **las maneras distintas de estar diseñado para usar la energía**. Ninguno es mejor, y el conjunto funciona precisamente porque no todos somos iguales. Igual que el hormiguero funciona porque todos los tipos existen, el colectivo humano necesita de todos los diferentes tipos de persona.',
      bullets: [
        '**Generadores (~37%) y Generadores Manifestantes (~33%)**: suponen cerca del 70% de la población. Son los constructores, con energía vital sostenida cuando hacen lo que de verdad les enciende. Son el motor que mueve el mundo humano.',
        '**Proyectores (~20%)**: no tienen esa energía constante; su don es ver, guiar y orientar a los demás. Brillan cuando se les reconoce e invita, no forzándose al ritmo de un Generador.',
        '**Manifestadores (~9%)**: son los iniciadores, capaces de arrancar cosas de la nada y causar impacto, sin esperar a nadie. Su clave es informar a quienes su acción salpica y gestionar su energía inconstante.',
        '**Reflectores (~1%)**: los más infrecuentes, son un espejo del entorno: reflejan la salud del grupo y del lugar en que viven.'
      ],
      outro:
        'El error más común es medirse con el diseño de otro: que un Proyector se exija la resistencia de un Generador, o que un Generador se frustre por no iniciar como un Manifestador.'
    },
    // Short connective lead-ins prepended to the reused content of each
    // personalised section.
    leadIn: {
      strategy: 'Tu estrategia es tu forma natural e ideal de actuar y comprometerte con las cosas sin forzarlas.',
      authority: 'Tu autoridad es tu manera correcta de tomar decisiones en la vida, de acuerdo con tu diseño y no contra él. Si la estrategia te dice *cómo y cuándo actuar*, **la autoridad te dice cómo y cuándo decidir** cada sí y cada no. La mente sirve para informarte, navegar las decisiones tomadas y aconsejar a otros, pero **la mente no es de fiar para decidir** sobre tu propia vida: las decisiones deben tomarse desde una fuente más corporal y fiable. Esto es la *autoridad*.',
      definition: 'La definición describe cómo se agrupan entre sí tus centros definidos: si forman un solo bloque o varios grupos separados.',
      practice: 'Si te tuvieras que quedar con una sola cosa de todo el Diseño Humano, que sea esta: **vivir tu diseño es, sobre todo, entrar en acción según [tu estrategia](section:strategy) y decidir desde [tu autoridad](section:authority)**. Lo demás matiza y afina; pero estas dos cosas son lo que de verdad cambia el día a día de tu vida.',
      centers: 'Los nueve centros en tu carta:',
      purpose: 'Y para terminar, el telón de fondo: hacia dónde apunta tu diseño en el largo plazo.'
    },
    // Placed at the very end on purpose, and deliberately subordinated to
    // "Vivir tu diseño": the purpose is what happens *while* you follow your
    // strategy and authority, not a separate task to go and solve.
    purpose: {
      title: 'Tu propósito',
      paragraphs: [
        'Tu **cruz de encarnación** es el tema de fondo de tu vida: la dirección general hacia la que apunta tu diseño. La forman **cuatro puertas** —el Sol y la Tierra de tu Personalidad, y el Sol y la Tierra de tu Diseño—, que son las cuatro activaciones de más peso de tu carta.',
        'Y conviene decir algo antes de seguir: **la palabra «propósito» aquí engaña**. No es una misión que tengas que descubrir, ni algo que puedas forzar o acelerar. Es más bien el **tema de fondo** de tu vida, y **se despliega solo**. El Diseño Humano es explícito en esto: no vayas a buscarlo — céntrate en [tu estrategia](section:strategy) y [tu autoridad](section:authority), y el tema se irá viviendo por su cuenta.',
        'Mucha gente la reconoce mirando hacia atrás, no hacia delante. Así que léela con curiosidad, no como una tarea pendiente.'
      ],
      outro:
        'Y aquí está lo importante: **el propósito no se persigue, se cumple viviendo tu diseño**. No hay nada que hacer con esta cruz salvo reconocerla. Lo que de verdad cambia tu día a día es lo de la sección anterior —actuar según [tu estrategia](section:strategy) y decidir desde [tu autoridad](section:authority)—; si eso está en su sitio, el resto se ocupa solo.'
    },
    // Second-person bodies for the cross angle (the impersonal versions live in
    // the `cross` block, which feeds the drawer).
    crossAngle: {
      right: 'Tu cruz es de **ángulo derecho**: tu camino es **personal**. Lo tuyo se despliega sobre todo a través de tu propia experiencia — lo que vives, pruebas y atraviesas tú. Los demás importan, claro, pero el eje del recorrido eres tú.',
      left: 'Tu cruz es de **ángulo izquierdo**: tu camino es **transpersonal**. Buena parte de lo importante te va a llegar a través de otras personas, y lo tuyo se cumple en relación con ellas. Los encuentros no son un accesorio de tu vida: son el material con el que se construye.',
      juxtaposition: 'Tu cruz es de **yuxtaposición**: un destino **fijo y singular**. Ni personal ni transpersonal — un papel muy concreto, que sostienes con bastante independencia de lo que pase alrededor. Es el ángulo más raro, y corresponde solo al perfil 4/1.'
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
        'Eres el tipo mayoritario, Generador *puro*: los Generadores sois alrededor del **~37%** de la población. Tu rasgo definitorio es el [centro Sacral](center:sacral) definido: la fuente de energía vital del sistema, generativa y de carácter renovable. Tu energía generadora y constructora, cuando estás bien alineado, es continuada y abundante.',
        'Operas por respuesta: **reaccionas a lo que la vida te presenta** en lugar de iniciar desde la mente y lo racional. Cuando comprometes tu energía con lo correcto, aparece la *satisfacción*; si no te escuchas bien y fuerzas tu energía donde no toca, aparece la *frustración*.',
        'En la práctica, tu centro Sacral responde antes que tu mente: ante algo concreto —una propuesta, una pregunta, una situación— surge una reacción visceral de atracción o rechazo. **Seguir esa señal del cuerpo**, en vez de decidir desde el pensamiento y la razón, es lo que mantiene tu energía bien empleada.'
      ],
      'manifesting-generator': [
        'Eres un tipo concreto de [Generador](type:generator) —los Generadores Manifestantes sois un ~33% de la población, y junto al resto de Generadores, sumáis cerca del 70 %—: tienes el [Sacral](center:sacral) definido, y lo que te diferencia de otros Generadores es que además tienes la [Garganta](center:throat) conectada a un centro motor. Eso te da la energía generadora propia de los Generadores y, además, capacidad de manifestar y materializar con rapidez.',
        'Tu estrategia es **responder y luego informar**: primero esperas la respuesta sacral —el sí o el no del cuerpo— y, una vez la tienes, avisas a quienes se verán afectados antes de lanzarte. Tiendes a ser polifacético, veloz y no lineal: saltas pasos, haces varias cosas a la vez y a veces vuelves atrás a rematar lo que te saltaste.',
        'La clave para gestionar tu energía es no dispersarte iniciando sin haber escuchado la respuesta de tu cuerpo: cuando te comprometes con lo que de verdad te enciende (cuando tu cuerpo dice sí), avanzas rápido y sientes *satisfacción* y *paz*; pero cuando fuerzas empujado por la mente y las ideas, acumulas *frustración*, *enfado* y trabajo a medias.'
      ],
      projector: [
        'Los Proyectores sois cerca del **~20% de la población**. No tienes el [Sacral](center:sacral) definido, así que **no estás diseñado para un trabajo constante** ni para sostener la misma energía que un [Generador](type:generator); por eso, cuidado con intentar rendir de manera continuada y sin descanso. Tu don es otro: ver a los demás con enorme profundidad y saber guiar y orientar la energía ajena.',
        'Tu estrategia es **esperar la invitación** para lo importante —el trabajo, el amor, el lugar donde vivir—. Necesitas ser invitado para que tu sabiduría y esfuerzo sean bien recibidos; cuando te ofreces o te metes sin que te lo pidan, lo normal es que encuentres resistencia y rechazo. Cuando en tu vida aparecen el *reconocimiento* y el *éxito*, son la pista de que vas por buen camino. En cambio, el síntoma que aparece cuando no estás viviendo alineado es la *amargura*.',
        'Gestionar tu energía es, sobre todo, **descansar a tiempo**: no compites en resistencia física, sino en profundidad y maestría. Igual que el Manifestador, **el descanso es parte de tu método y no un premio** — dormir y soltar **antes** de quedar agotado, y retirarte cuando lo notas sin pedir permiso. Y elegir con cuidado a quién le das tu atención y tu esfuerzo: no toda invitación merece un sí. Todo esto se concreta más adelante, en [vivir tu diseño](section:practice).'
      ],
      manifestor: [
        'Eres el tipo más independiente, alrededor del **~9% de la población**. Tienes al menos un centro motor (el Corazón o el Plexo solar) conectado a la [Garganta](center:throat), pero el [Sacral](center:sacral) sin definir, así que tu energía no es constante: llega a impulsos, que utilizas para iniciar y poner cosas en marcha, y luego necesitas reposo, bastante reposo.',
        'Tu estrategia es **informar antes de actuar**. No se trata de pedir permiso, sino de avisar a quienes tu impacto va a alcanzar: al hacerlo, reduces la resistencia y el rechazo que de otro modo encuentras a tu alrededor. Actuar de manera alineada con tu estrategia te trae *paz*; y si no lo haces, sientes oposición y crece en ti el *enfado*.',
        'Estás aquí para **iniciar y generar impacto**, no para ejecutar de forma sostenida. Y de ahí sale lo más importante y lo que menos se dice: **el descanso no es tu recompensa, es tu método**. No estás diseñado para crear de forma continua. Hay quien sitúa la proporción sana de un Manifestador en torno a un **70-80% de reposo** frente al tiempo de iniciar — la cifra exacta importa menos que la idea: **la mayor parte de tu tiempo no deberías estar produciendo**. Tu impacto sale de pocos movimientos bien cargados, no de muchos a media potencia.',
        'En la práctica: **acuéstate cansado, no agotado**. Si esperas a quedarte sin nada para parar, el siguiente impulso llega tarde y flojo. Y no midas tu descanso con la vara de un Generador, porque a su lado siempre vas a parecer que haces poco — no es pereza, es tu diseño. Todo esto se concreta más adelante, en [vivir tu diseño](section:practice).'
      ],
      reflector: [
        'Eres el tipo más infrecuente: los Reflectores sois apenas el **~1% de la población**. No tienes ningún centro definido: todo tu bodygraph está abierto. Eso te convierte en un espejo extraordinariamente sensible de la gente y los lugares que te rodean, capaz de percibir la salud de una comunidad.',
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
        'Antes de una decisión importante, tu diseño te pide **dejar pasar un ciclo lunar completo** en lugar de resolver de golpe: no es demorarse por prudencia, es el tiempo que necesitas para que el asunto se te muestre desde todos sus ángulos.',
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
        'Como Reflector, no tienes ningún centro definido, así que no hay en ti una fuente interna fija que decida. Tu autoridad no está dentro: es el **tiempo**. Lo que en otros diseños resuelve el cuerpo, en el tuyo lo resuelve la claridad que se va posando a lo largo del ciclo.',
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
        'Recorres **tres fases vitales**: (1) hasta cerca de los 30 años, vives como la línea 3, probando, tropezando y hasta colapsando; luego (2) vives una segunda etapa donde te retiras energéticamente a observar y procesar —etapa "sobre el tejado"—; y (3) a partir de los 50, aproximadamente, emerges como **ejemplo y referente**.',
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
        'Tu reto suele ser el opuesto al de las definiciones divididas: como funcionas bien por ti mismo, puedes ensimismarte, y abrirte a la influencia ajena puede costarte. Reconocer cuándo te conviene salir de tu propia burbuja es parte de tu aprendizaje.'
      ],
      split: [
        'Tus centros definidos forman **dos grupos separados**, sin un canal que los una por dentro. Por eso sueles experimentar una **búsqueda de conexión**: algo que tienda el puente entre tus dos partes.',
        'Ese puente te llega a menudo a través de otras personas —cuya energía completa el canal que te falta— o de tránsitos planetarios que activan la puerta intermedia. Esta separación (split) no es una carencia: se trata de entender que hay compañías y entornos que te hacen sentir integrado, y esto sucede de manera natural.'
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
      senales: '**Señales de que vas por buen camino** — Tu brújula son tus dos señales: la de [alineamiento](signal:generator), la **satisfacción**, y la de [desalineamiento](signal:generator), la **frustración**. Si al final del día sientes un cansancio a gusto y la sensación de haber empleado bien tu energía, vas bien encaminado. Si lo que predomina es la frustración y el hartazgo, suele ser señal de que te has comprometido con cosas a las que tu cuerpo no había dicho que sí.'
    },
    'manifesting-generator': {
      energia: '**Gestión de tu energía** — Como Generador, tienes el [Sacral](center:sacral) definido: energía de trabajo **sostenible y renovable**. Pero está conectada con la [Garganta](center:throat), lo que te hace **rápido, polifacético y no lineal**: saltas pasos, haces varias cosas a la vez y avanzas a gran velocidad cuando algo te enciende de verdad. Rindes al máximo si primero esperas la **respuesta del cuerpo** y luego **informas** a quienes te rodean antes de lanzarte.',
      trampa: '**La trampa de tu tipo** — **Dispersarte**: comprometerte con demasiadas cosas a las que tu cuerpo no había dicho que sí, o saltarte el aviso a los demás y chocar con su resistencia. Cuando inicias por mente en vez de responder, acumulas frustración —y a menudo algo de enfado— y proyectos a medio terminar.',
      senales: '**Señales de que vas por buen camino** — Tu señal de [alineamiento](signal:manifesting-generator) es la **satisfacción**, con una cierta paz alrededor; la de [desalineamiento](signal:manifesting-generator), la **frustración**, a menudo con enfado. Si avanzas rápido en lo que te enciende y dejas las cosas rematadas, vas bien; si te notas disperso y rodeado de fricción, suele ser que dijiste que sí donde el cuerpo no acompañaba, o que no informaste.'
    },
    projector: {
      energia: [
        '**Gestión de tu energía** — Sin el [Sacral](center:sacral) definido **no estás diseñado para un trabajo constante** ni para sostener el ritmo de un Generador: tu energía es irregular y se agota antes. Tampoco para iniciar desde cero — no tienes ningún motor conectado a la [Garganta](center:throat).',
        'Tu don está en **ver, guiar y orientar** allí donde se te invita. Gestionarte bien pasa por **descansar y dosificarte** —dormir y soltar antes de quedar agotado— y por reservar tu atención para quien de verdad la valora.'
      ],
      trampa: '**La trampa de tu tipo** — **Forzarte al ritmo de los demás** y **ofrecer tu visión y esfuerzo sin que nadie te lo pida**. Trabajar hasta el agotamiento para demostrar tu valía, o insistir sin ser invitado, trae resistencia, rechazo y amargura —la señal del Proyector que vive contra su diseño—.',
      senales: '**Señales de que vas por buen camino** — Tu señal de [alineamiento](signal:projector) es el **éxito** —ser visto y reconocido—, y la de [desalineamiento](signal:projector), la **amargura**. Cuando se te ve, se te invita y tu visión es bien recibida, vas por buen camino; cuando te sientes invisible, agotado y resentido, suele ser señal de que te ofreces donde no te han llamado o de que te exiges una energía que no tienes.'
    },
    manifestor: {
      energia: [
        '**Gestión de tu energía** — Tienes un motor conectado a la [Garganta](center:throat) pero el [Sacral](center:sacral) sin definir: tu energía **no es constante, llega a impulsos** para iniciar, y luego se acaba. Estás hecho para arrancar e impactar, no para ejecutar de forma sostenida.',
        'Por eso **el descanso es parte de tu método**, no tu recompensa: la mayor parte de tu tiempo no deberías estar produciendo. Respeta los ciclos de empuje y reposo, y protege tu autonomía sin aislarte.'
      ],
      trampa: '**La trampa de tu tipo** — Actuar por sorpresa **sin informar** a quienes tu impacto va a alcanzar: eso provoca resistencia, oposición y enfado alrededor, que acaba poniéndote las cosas más difíciles. La otra gran trampa es **exigirte una constancia** que no es tuya, hasta quemarte, sin aceptar tu gran necesidad de reposo.',
      senales: '**Señales de que vas por buen camino** — Tu señal de [alineamiento](signal:manifestor) es la **paz**; la de [desalineamiento](signal:manifestor), el **enfado**. Cuando informas y te mueves con libertad, encuentras calma a tu alrededor; cuando todo se llena de resistencia y conflicto, suele ser señal de que actuaste sin avisar o de que estás forzando un ritmo continuo que no te corresponde.'
    },
    reflector: {
      energia: '**Gestión de tu energía** — No tienes **ningún centro definido**: muestreas constantemente la energía de la gente y los lugares, así que **el entorno te afecta muchísimo** y tu energía varía mucho de un día a otro. Lo más importante para ti es **elegir bien dónde estás y con quién**, y no exigirte una constancia que no es propia de tu diseño. Y no cierres en caliente lo que importa: date el ciclo entero.',
      trampa: '**La trampa de tu tipo** — Decidir con prisa, quedarte en entornos que no te sientan bien e **identificarte con lo que solo estás reflejando**: tomar por tuyos estados de ánimo o presiones que en realidad son del grupo. **Forzarte a ser siempre igual** va contra tu naturaleza cambiante.',
      senales: '**Señales de que vas por buen camino** — Tu señal de [alineamiento](signal:reflector) es la **sorpresa**, con su punto de deleite; la de [desalineamiento](signal:reflector), la **decepción**. Cuando los entornos y las compañías son los correctos, la vida te sorprende gratamente; cuando predomina la decepción, suele ser señal de que estás en el lugar o con la gente equivocados, o de que has decidido demasiado rápido.'
    }
  },

  // Public-domain root of each gate: its King Wen hexagram name (gate N ↔
  // hexagram N). Names follow the classic Wilhelm/Vogelmann Spanish edition,
  // with casing normalised to sentence case (only the first letter capitalised)
  // per the author's text review. Used as the I Ching anchor in the gate/channel
  // info (Phase 6.D).
  iching: {
    1: 'Lo creativo',
    2: 'Lo receptivo',
    3: 'La dificultad inicial',
    4: 'La necedad juvenil',
    5: 'La espera',
    6: 'El conflicto',
    7: 'El ejército',
    8: 'La solidaridad',
    9: 'La fuerza domesticadora de lo pequeño',
    10: 'El porte',
    11: 'La paz',
    12: 'El estancamiento',
    13: 'La comunidad con los hombres',
    14: 'La posesión de lo grande',
    15: 'La modestia',
    16: 'El entusiasmo',
    17: 'El seguimiento',
    18: 'El trabajo en lo echado a perder',
    19: 'El acercamiento',
    20: 'La contemplación',
    21: 'La mordedura tajante',
    22: 'La gracia',
    23: 'La desintegración',
    24: 'El retorno',
    25: 'La inocencia',
    26: 'La fuerza domesticadora de lo grande',
    27: 'La nutrición',
    28: 'La preponderancia de lo grande',
    29: 'Lo abismal (el agua)',
    30: 'Lo adherente (el fuego)',
    31: 'El influjo',
    32: 'La duración',
    33: 'La retirada',
    34: 'El poder de lo grande',
    35: 'El progreso',
    36: 'El oscurecimiento de la luz',
    37: 'La familia',
    38: 'El antagonismo',
    39: 'El impedimento',
    40: 'La liberación',
    41: 'La merma',
    42: 'El aumento',
    43: 'El desbordamiento',
    44: 'El ir al encuentro',
    45: 'La reunión',
    46: 'La subida',
    47: 'La desazón',
    48: 'El pozo',
    49: 'La revolución',
    50: 'El caldero',
    51: 'Lo suscitativo (la conmoción)',
    52: 'El aquietamiento (la montaña)',
    53: 'La evolución',
    54: 'La muchacha que se casa',
    55: 'La plenitud',
    56: 'El andariego',
    57: 'Lo suave (el viento)',
    58: 'Lo sereno (el lago)',
    59: 'La disolución',
    60: 'La restricción',
    61: 'La verdad interior',
    62: 'La preponderancia de lo pequeño',
    63: 'Después de la consumación',
    64: 'Antes de la consumación'
  },

  // Channel identity (Phase 7 text review). `name` is the channel's established
  // Spanish HD title (a short title — not copyrightable; same class of HD
  // nomenclature as the type/centre/authority names used elsewhere); where
  // sources diverge we favour the canonical HD name. `essence` is our own
  // one-line synthesis of the channel, built from its two gate themes + the
  // centres it joins (replaces the older "conviene leer juntas…" line). Keyed
  // minor-gate-first to match CHANNELS.
  channel: {
    '1-8': { name: 'canal de la inspiración', essence: 'la creatividad de la propia identidad que necesita una voz para inspirar a los demás siendo un modelo a seguir.' },
    '2-14': { name: 'canal del latido', essence: 'una dirección interior que orienta hacia dónde dirigir la energía vital y los recursos propios.' },
    '3-60': { name: 'canal de la mutación', essence: 'el pulso del cambio, que transforma la limitación en el comienzo de algo nuevo.' },
    '4-63': { name: 'canal de la lógica', essence: 'la mente que parte de la duda para buscar respuestas y fórmulas que la resuelvan.' },
    '5-15': { name: 'canal del ritmo', essence: 'un ritmo natural propio que, abierto a la diversidad, sintoniza con el flujo de la vida.' },
    '6-59': { name: 'canal de la intimidad', essence: 'la energía de romper barreras y crear vínculo, gestionando cuándo abrirse y cuándo cerrarse.' },
    '7-31': { name: 'canal del liderazgo', essence: 'el papel de guía que da dirección al futuro y encuentra la voz para liderar a un grupo.' },
    '9-52': { name: 'canal de la concentración', essence: 'la quietud que permite concentrar la energía en el detalle hasta llevar algo a término.' },
    '10-20': { name: 'canal del despertar', essence: 'el amor propio que se expresa en el presente, siendo fiel a uno mismo aquí y ahora.' },
    '10-34': { name: 'canal de la exploración', essence: 'la fuerza de actuar según las propias convicciones, siendo fiel a uno mismo.' },
    '10-57': { name: 'canal de la supervivencia', essence: 'la intuición al servicio del bienestar y de la forma correcta de habitar el cuerpo.' },
    '11-56': { name: 'canal de la curiosidad', essence: 'la mente llena de ideas que busca contarlas en relatos que estimulan y dan sentido.' },
    '12-22': { name: 'canal de la apertura', essence: 'la expresión emocional que se abre y conmueve cuando el ánimo y el momento son los justos.' },
    '13-33': { name: 'canal del pródigo', essence: 'recoger lo vivido y, tras el retiro, compartirlo como testigo para los demás.' },
    '16-48': { name: 'canal del talento', essence: 'el talento profundo que, con entusiasmo y práctica, madura hasta la maestría.' },
    '17-62': { name: 'canal de la aceptación', essence: 'las opiniones que se ordenan en datos y detalles para organizar y anticiparse.' },
    '18-58': { name: 'canal del juicio', essence: 'la vitalidad que empuja a corregir y perfeccionar lo que se ha torcido.' },
    '19-49': { name: 'canal de la síntesis', essence: 'la sensibilidad a las necesidades que decide los vínculos desde principios profundos.' },
    '20-34': { name: 'canal del carisma', essence: 'el poder que se vuelve acción en el presente, pensando y haciendo sin demora.' },
    '20-57': { name: 'canal de la onda cerebral', essence: 'la intuición aguda que capta y expresa el saber certero del instante.' },
    '21-45': { name: 'canal del dinero', essence: 'la voluntad de controlar los recursos y la voz que los administra para el grupo.' },
    '23-43': { name: 'canal de la estructuración', essence: 'el saber individual que se traduce en ideas claras y comprensibles para los demás.' },
    '24-61': { name: 'canal de la conciencia', essence: 'la presión por conocer el misterio, dándole vueltas hasta que revela su sentido.' },
    '25-51': { name: 'canal de la iniciación', essence: 'el impulso que inicia y sacude, movido por un amor puro que despierta el espíritu.' },
    '26-44': { name: 'canal de la entrega', essence: 'el instinto que lee el pasado y lo transmite con poder de convicción.' },
    '27-50': { name: 'canal de la preservación', essence: 'el cuidado que sostiene a otros guiado por los valores que protegen al grupo.' },
    '28-38': { name: 'canal de la lucha', essence: 'la tenacidad de luchar y arriesgarse por una vida que merezca la pena.' },
    '29-46': { name: 'canal del descubrimiento', essence: 'la entrega comprometida que, puesta en el cuerpo, prospera donde otros fracasan.' },
    '30-41': { name: 'canal del reconocimiento', essence: 'la imaginación y el anhelo que encienden el deseo de vivir nuevas experiencias.' },
    '32-54': { name: 'canal de la transformación', essence: 'la ambición de ascender guiada por el instinto de lo que perdura.' },
    '34-57': { name: 'canal del poder', essence: 'la fuerza pura al servicio del instinto, un poder que es presencia en el momento.' },
    '35-36': { name: 'canal de la transitoriedad', essence: 'el hambre de experiencia que, entre altibajos emocionales, empuja a probarlo todo y progresar.' },
    '37-40': { name: 'canal de la comunidad', essence: 'la calidez que crea comunidad mediante pactos, dándose y sabiendo también retirarse a reponerse.' },
    '39-55': { name: 'canal de la emoción', essence: 'la provocación que remueve el ánimo y su abundancia para hacer aflorar el espíritu.' },
    '42-53': { name: 'canal de la maduración', essence: 'la energía de los ciclos: iniciar y llevar hasta el final para madurar con la experiencia.' },
    '47-64': { name: 'canal de la abstracción', essence: 'la presión de imágenes confusas que pugna por ordenarse hasta llegar a la comprensión.' }
  },

  // One-line function of each centre, for the nine-centre chip list in the
  // "Los centros" concept drawer (text audit, jul 2026). Keyed by centre.
  centerBrief: {
    head: 'la inspiración y las preguntas',
    ajna: 'el pensamiento',
    throat: 'la comunicación y la acción',
    g: 'la identidad y la dirección',
    heart: 'la voluntad',
    spleen: 'el instinto',
    solarPlexus: 'las emociones',
    sacral: 'la energía vital',
    root: 'la presión y el empuje'
  },

  // Closed-set index appended to each value drawer (text audit, jul 2026): the
  // full set of possibilities for the element's category, one line per option
  // (chip label + keynote), each clickable for its detail. The current
  // element(s) are highlighted by getElementInfo/getProfileInfo.
  relatedIndex: {
    type: {
      heading: 'Los cinco tipos en el colectivo humano',
      items: {
        generator: { label: 'Generador', note: 'construye con energía sostenida', pct: '~37%' },
        'manifesting-generator': { label: 'Generador Manifestante', note: 'construye rápido y polifacético', pct: '~33%' },
        projector: { label: 'Proyector', note: 've, guía y orienta la energía ajena', pct: '~20%' },
        manifestor: { label: 'Manifestador', note: 'inicia e impacta con independencia', pct: '~9%' },
        reflector: { label: 'Reflector', note: 'refleja y muestrea el entorno', pct: '~1%' }
      }
    },
    strategy: {
      heading: 'Las cinco estrategias',
      items: {
        respond: { label: 'Responder', note: 'la del Generador' },
        'respond-then-inform': { label: 'Responder y luego informar', note: 'la del Generador Manifestante' },
        'inform-before-acting': { label: 'Informar antes de actuar', note: 'la del Manifestador' },
        'wait-for-invitation': { label: 'Esperar la invitación', note: 'la del Proyector' },
        'wait-lunar-cycle': { label: 'Esperar un ciclo lunar', note: 'la del Reflector' }
      }
    },
    authority: {
      heading: 'Las siete autoridades',
      items: {
        emotional: { label: 'Emocional', note: 'claridad con tiempo, recorriendo la onda emocional' },
        sacral: { label: 'Sacral', note: 'el sí o el no visceral del momento' },
        splenic: { label: 'Esplénica', note: 'el instinto que habla una sola vez' },
        ego: { label: 'Del ego', note: 'lo que de verdad se quiere' },
        'self-projected': { label: 'Autoproyectada', note: 'oírse hablar en voz alta para reconocerse' },
        mental: { label: 'Mental/ambiental', note: 'la claridad que surge del diálogo' },
        lunar: { label: 'Lunar', note: 'un ciclo lunar de perspectiva' }
      }
    },
    definition: {
      heading: 'Las cinco definiciones',
      items: {
        'no-definition': { label: 'Sin definición', note: 'ningún centro definido (Reflector)' },
        single: { label: 'Única', note: 'todo conectado en un solo bloque' },
        split: { label: 'Split', note: 'dos grupos separados' },
        'triple-split': { label: 'Triple split', note: 'tres grupos separados' },
        'quad-split': { label: 'Cuádruple split', note: 'cuatro grupos separados' }
      }
    },
    profile: {
      heading: 'Las seis líneas',
      items: {
        '1': { label: 'Línea 1', note: 'el cimiento: investigar y asentar la base' },
        '2': { label: 'Línea 2', note: 'el talento natural que otros llaman desde fuera' },
        '3': { label: 'Línea 3', note: 'el ensayo y error: aprender probando' },
        '4': { label: 'Línea 4', note: 'la red: las oportunidades llegan por los vínculos' },
        '5': { label: 'Línea 5', note: 'la proyección: expectativas y liderazgo práctico' },
        '6': { label: 'Línea 6', note: 'el modelo: tres fases hacia el ejemplo' }
      }
    }
  },

  // Natural-language labels used to build AI prompts. Kept separate from the
  // chart page's UI labels until i18n is unified (then both read from here).
  //
  // i18n note (jul 2026): the Manifesting Generator abbreviates as **GM** in
  // Spanish ("Generador Manifestante"), not "MG". When adding languages, use
  // each language's own word order for the acronym.
  // Display labels (Phase M). Distinct from `promptLabels` below on purpose:
  // those are written to be embedded inside prompt sentences (lower-case, with
  // articles — "estrategia responder", "el Sol"), while these are the labels the
  // UI shows in cards, chips and table columns (sentence case, no articles).
  // The chart page reads these; they translate with the rest of the content.
  labels: {
    type: {
      generator: 'Generador',
      'manifesting-generator': 'Generador Manifestante',
      projector: 'Proyector',
      manifestor: 'Manifestador',
      reflector: 'Reflector'
    },
    strategy: {
      'inform-before-acting': 'Informar antes de actuar',
      respond: 'Responder',
      'respond-then-inform': 'Responder y luego informar',
      'wait-for-invitation': 'Esperar la invitación',
      'wait-lunar-cycle': 'Esperar un ciclo lunar'
    },
    // Same quality-(centre) order as the drawers and prompts (text audit, jul 2026).
    authority: {
      emotional: 'Emocional (Plexo solar)',
      sacral: 'Sacral',
      splenic: 'Esplénica (Bazo)',
      ego: 'Ego (Corazón)',
      'self-projected': 'Autoproyectada (G-Garganta)',
      mental: 'Mental/ambiental',
      lunar: 'Lunar'
    },
    definition: {
      'no-definition': 'Sin definición',
      single: 'Definición única',
      split: 'Definición split',
      'triple-split': 'Definición triple split',
      'quad-split': 'Definición cuádruple split'
    },
    center: {
      head: 'Cabeza',
      ajna: 'Ajna',
      throat: 'Garganta',
      g: 'G',
      heart: 'Corazón',
      sacral: 'Sacral',
      spleen: 'Bazo',
      solarPlexus: 'Plexo solar',
      root: 'Raíz'
    },
    planet: {
      sun: 'Sol',
      earth: 'Tierra',
      moon: 'Luna',
      northNode: 'Nodo Norte',
      southNode: 'Nodo Sur',
      mercury: 'Mercurio',
      venus: 'Venus',
      mars: 'Marte',
      jupiter: 'Júpiter',
      saturn: 'Saturno',
      uranus: 'Urano',
      neptune: 'Neptuno',
      pluto: 'Plutón'
    },
    // Short type names for tight spots (the signal-pair drawer title). Only the
    // Manifesting Generator actually shortens; the acronym follows the
    // language's word order — Spanish GM, English MG.
    typeShort: {
      generator: 'Generador',
      'manifesting-generator': 'GM',
      projector: 'Proyector',
      manifestor: 'Manifestador',
      reflector: 'Reflector'
    },
    // The two polarities of the signals card (the values themselves are per
    // type and live in the `signal` block).
    signal: {
      aligned: 'Alineamiento',
      misaligned: 'Desalineamiento'
    },
    cross: {
      right: 'Cruz de ángulo derecho',
      left: 'Cruz de ángulo izquierdo',
      juxtaposition: 'Cruz de yuxtaposición'
    }
  },

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
      mental: 'mental/ambiental',
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
    },
    // Lower-case: the prompt template reads "la {name} formada por…".
    cross: {
      right: 'cruz de ángulo derecho',
      left: 'cruz de ángulo izquierdo',
      juxtaposition: 'cruz de yuxtaposición'
    }
  },

  // ── Scaffolding (Phase M) ────────────────────────────────────────────────
  // The connective tissue that used to be hard-coded in prompts.js, report.js
  // and content/index.js. It lives here because it is language-grammar-bound
  // (articles, gender, word order), so a new language translates it like any
  // other text instead of touching code. `{…}` are filled by the callers.

  promptTemplates: {
    frame: 'En el marco del Diseño Humano',
    ask: '{frame}, ¿me explicas en detalle {subject}?',
    askChart: '{frame}, para {who}, ¿me explicas en detalle {subject}?',
    who: 'un {type}, perfil {profile}, autoridad {authority}, {definition}, centros definidos {centers}',
    none: 'ninguno',
    side: { personality: 'Personalidad', design: 'Diseño' },
    activation: '{planet} en {side} (línea {line})',
    activationJoin: ' y ',
    gate: {
      subject: 'la puerta {g}',
      by: ' está activada por {acts} y',
      complete: ', que en esta carta{by} forma parte de un canal completo',
      hanging: ', que en esta carta{by} está colgante (sin la otra mitad de su canal)',
      inactive: ', que en esta carta no está activa'
    },
    channel: {
      subject: 'el canal {a}-{b}',
      complete: ', que en esta carta está completo (define sus dos centros)',
      half: ', del que en esta carta solo está activa una de sus dos puertas (medio canal)',
      none: ', que en esta carta no está activo'
    },
    subject: {
      type: 'el tipo {name}',
      strategy: 'la estrategia de "{name}"',
      authority: 'la autoridad {name}',
      profileLine: 'la línea {n} del perfil',
      profile: 'el perfil {n}',
      definition: 'la {name}',
      // "sin definición" doesn't read as "la sin definición"; phrased apart.
      noDefinition: 'qué significa no tener definición (una carta sin definición)',
      center: 'el centro "{name}"',
      planet: 'qué representa {name}',
      signal:
        'las dos señales del tipo {type} —"{aligned}" como señal de alineamiento (la firma) y "{misaligned}" como señal de desalineamiento (el tema del no-yo)— y cómo distinguirlas en el día a día',
      cross: 'la {name} formada por las puertas {gates}'
    },
    planetChart:
      '{frame}, para {who}, ¿me explicas en detalle qué representa {name} y qué aportan sus dos activaciones en esta carta: {pg}.{pl} (consciente, Personalidad) y {dg}.{dl} (inconsciente, Diseño)?',
    activationCol: {
      personality:
        'la parte consciente (Personalidad) de una carta, calculada en el momento del nacimiento',
      design:
        'la parte inconsciente (Diseño) de una carta, calculada unos 88 días antes del nacimiento',
      weight: 'el peso o influencia relativa de cada activación planetaria'
    },
    concept: {
      bodygraph: 'qué es el bodygraph de Diseño Humano y cómo se lee',
      bodygraphChart: 'cómo se lee este bodygraph en concreto',
      centerGeneral:
        'qué son los nueve centros y qué diferencia hay entre tenerlos definidos o indefinidos',
      centerChart: 'qué implica la combinación de centros definidos e indefinidos de esta carta',
      type: 'qué son los tipos',
      strategy: 'qué es la estrategia',
      authority: 'qué es la autoridad',
      profile: 'qué es el perfil',
      definition: 'qué es la definición',
      channel: 'qué son los canales',
      gate: 'qué son las puertas',
      activation: 'qué son las activaciones planetarias',
      signal:
        'qué son la señal de alineamiento y la señal de desalineamiento de cada tipo (la firma y el tema del no-yo)',
      cross: 'qué es la cruz de encarnación y cómo se lee'
    }
  },

  // Element drawers: composed titles, schematic-fact labels and chart-state
  // codas. Impersonal by rule ("esta carta", never "tu carta").
  drawer: {
    factCenter: 'Centro',
    factCenters: 'Centros',
    factChannel: 'Canal',
    factChannels: 'Canales',
    factGate: 'Puerta',
    factGates: 'Puertas',
    factHarmonic: 'Puerta armónica',
    factHarmonics: 'Puertas armónicas',
    tipHarmonic: 'puerta que completa el canal',
    tipHarmonics: 'puertas que completan sus canales',
    sidePersonality: 'Personalidad',
    sideDesign: 'Diseño',
    gateTitle: 'Puerta {g}: {theme}',
    gateTitlePlain: 'Puerta {g}',
    gateFallback: 'La puerta {g}.',
    ichingNamed: 'Su raíz es el hexagrama {g} del I Ching, "{name}".',
    ichingPlain: 'Le corresponde el hexagrama {g} del I Ching.',
    deeper: 'Para una lectura más a fondo, puedes utilizar la opción de "saber más usando IA".',
    gateComplete:
      'En esta carta, la puerta {g} está activa y forma parte de un canal completo: es una energía que se aporta de forma estable e integrada.',
    gateHanging:
      'En esta carta, la puerta {g} está activa pero colgante: su tema está presente, y su otra mitad solo se completa de forma puntual, con ciertas personas o en ciertos tránsitos.',
    gateInactive:
      'En esta carta, la puerta {g} no está activa: es una energía que se reconoce y se recibe de los demás y del entorno, más que una constante propia.',
    channelTitle: '{a}-{b}: {name}',
    channelTitlePlain: 'Canal {a}-{b}',
    channelIs: 'Es el **{name}**: {essence}',
    channelPair:
      'Reúne "{ta}" ([puerta {a}](gate:{a})) y "{tb}" ([puerta {b}](gate:{b})), que conviene leer juntas para captar su carácter.',
    channelBoth:
      'Con sus dos puertas activas, el canal queda completo: define los dos centros que conecta y crea una corriente de energía estable entre ellos.',
    channelComplete:
      'En esta carta, el canal {a}-{b} está completo: es una corriente que se aporta de forma estable e integrada.',
    channelHalf:
      'En esta carta, del canal {a}-{b} está activa una de sus dos puertas (la [puerta {on}](gate:{on})) pero no la otra (la [puerta {off}](gate:{off})): es un medio canal que se completa de forma puntual, con quien tenga la puerta que falta o en ciertos tránsitos.',
    channelNone:
      'En esta carta, ninguna de las dos puertas del canal {a}-{b} está activa: es una corriente que se encuentra sobre todo en los demás.',
    profileTitle: 'Perfil {profile}',
    profileIntro:
      'El perfil {profile} combina dos líneas: la {a}, consciente, y la {b}, inconsciente. Cada una aporta su matiz, y juntas describen una forma de aprender, de relacionarse y de desplegar el propósito.',
    // One drawer per PAIR, not per polarity: what is useful is never one signal
    // on its own but which of the two is winning. The type disambiguates the
    // Generator and MG pairs, which share the same two words.
    signalTitle: '{aligned}/{misaligned} ({type})',
    signalPairNote:
      'Las dos se leen juntas: lo útil no es cada una por separado, sino **cuál de las dos predomina** en una temporada.',
    signalCanonical:
      'En Diseño Humano, la señal de alineamiento se llama la *firma* y la de desalineamiento, el *tema del no-yo*.',
    signalIndexHeading: 'Las señales de los cinco tipos',
    // Prepended to every definition drawer: the "Definición" card label was
    // merged into the Centres card (2026-07-22), so the concept-level framing
    // that its own "i" used to carry now travels with each concrete definition.
    definitionIntro:
      'La **definición** describe cómo se agrupan entre sí los centros definidos de una carta: si forman un único bloque de energía o varios grupos separados. Habla de la consistencia interna —qué partes están siempre "encendidas" y enlazadas— y de cómo se integra esa energía.',
    angleTag: { right: 'Der', left: 'Izq', juxtaposition: 'Yux' },
    crossIndexHeading: 'Las 192 cruces, por cuartos del mandala',
    crossIndexCols: { sun: 'Sol', name: 'Cruz', angle: 'Áng.' },
    // Own wording, drawn from several sources: the four quarters divide the
    // wheel into 16 gates each and name the register a life's theme plays in.
    quarter: [
      { title: 'Cuarto de la Iniciación', note: 'El arranque: la chispa, la idea que aún no tiene forma. El propósito se busca a través de la **mente**.' },
      { title: 'Cuarto de la Civilización', note: 'Dar forma y construir lo que sirve a todos. El propósito se busca a través de la **forma**.' },
      { title: 'Cuarto de la Dualidad', note: 'El encuentro con el otro y lo que sale de ahí. El propósito se busca a través del **vínculo**.' },
      { title: 'Cuarto de la Mutación', note: 'La transformación y el cierre de lo viejo. El propósito se busca a través del **cambio**.' }
    ],
    crossTitle: '{name}',
    factCrossPersonality: 'Personalidad',
    factCrossDesign: 'Diseño',
    bodySun: 'sol',
    bodyEarth: 'tierra',
    crossReading:
      'En esta cruz concreta, el eje consciente cruza «{tpSun}» ([puerta {pSun}](gate:{pSun})) con «{tpEarth}» ([puerta {pEarth}](gate:{pEarth})): es el tema que la persona reconoce como suyo y el que va empujando a lo largo de la vida. Debajo, el eje inconsciente aporta «{tdSun}» ([puerta {dSun}](gate:{dSun})) sostenido por «{tdEarth}» ([puerta {dEarth}](gate:{dEarth})) — el suelo desde el que se hace todo eso, casi siempre más visible para los demás que para uno mismo.',
    crossFourGates:
      'Lo que da a cada cruz su carácter propio son sus **cuatro puertas**: el Sol y la Tierra de Personalidad —lo consciente, lo que uno reconoce como suyo— y el Sol y la Tierra de Diseño —lo inconsciente, el suelo desde el que actúa—. Son las activaciones de más peso de la carta, y **hay que leerlas juntas**: el sentido está en la combinación, no en cada puerta por separado.',
    crossGatesJoin: ' | '
  },

  // Initial-report assembly: section titles and the closing hand-off prompt.
  // Second person by rule — the report is addressed to the chart's owner.
  reportShell: {
    typeTitle: 'Tu tipo: {type}',
    typeSubhead: 'Tú eres un [{type}](type:{typeKey})',
    centersTitle: 'Tus centros y tus condicionamientos',
    strategyTitle: 'Tu estrategia: {strategy}',
    authorityTitle: 'Tu autoridad: {authority}',
    profileTitle: 'Tu perfil {profile}',
    definitionTitle: 'Tu definición: {definition}',
    definitionTitleNone: 'Tu definición',
    // Stripped from the definition's full title so it isn't repeated.
    definitionPrefix: '^Definición\\s+',
    practiceTitle: 'Vivir tu diseño',
    purposeTitle: 'Tu propósito',
    purposeSubhead: '[{name}](cross:{angle}) ({gates})',
    profileHeading: 'Perfil {profile}',
    profileIntro:
      'Tu perfil {profile} combina dos líneas: la {a}, consciente, y la {b}, inconsciente. Cada una aporta su matiz, y juntas describen tu forma de aprender, relacionarte y desplegar tu propósito.',
    closingPrompt:
      'Según el Diseño Humano soy un {type}, con perfil {profile}, autoridad {authority}, estrategia "{strategy}" y {definition}; tengo definidos los centros: {centers}. Me gustaría saber más sobre...',
    noCenters: 'ninguno'
  }
};
