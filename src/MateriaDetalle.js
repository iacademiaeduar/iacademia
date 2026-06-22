import React from 'react';

const INFO_MATERIAS = {
  'Matemática': {
    emoji:'🧮', color:'bg-purple-100', text:'text-purple-700',
    tagline:'Pensá diferente. Resolvé todo.',
    descripcion:'Matemática en iAcademia no es memorizar fórmulas: es aprender a razonar, resolver problemas reales y desarrollar una mente analítica que te va a servir para toda la vida.',
    beneficios:['Mejora tu capacidad de razonamiento lógico','Base fundamental para tecnología, ingeniería y economía','Te entrena para tomar mejores decisiones','Desarrolla la perseverancia y el pensamiento sistemático'],
    contenido_año:{1:['Números naturales','Fracciones','Álgebra básica','Geometría','Estadística'],2:['Ecuaciones lineales','Funciones','Geometría avanzada','Proporcionalidad','Probabilidad'],3:['Ecuaciones cuadráticas','Sistemas','Trigonometría','Estadística descriptiva'],4:['Funciones exponenciales','Polinomios','Geometría analítica','Vectores'],5:['Cálculo introductorio','Combinatoria','Matrices','Modelado matemático'],6:['Cálculo diferencial e integral','Álgebra lineal','Probabilidad avanzada','Finanzas']},
    tutor:'Profe Marcos', tutor_desc:'Explica con ejemplos de la vida real. Siempre busca que entiendas el "por qué" antes del "cómo".',
    carrerasRelacionadas:['Ingeniería','Economía','Programación','Arquitectura','Medicina','Física'],
    curiosidad:'Las personas que estudian matemática tienen salarios hasta 20% más altos en el mercado laboral.',
  },
  'Matemática Avanzada': {
    emoji:'🧮', color:'bg-purple-100', text:'text-purple-700',
    tagline:'Elevá tu pensamiento al siguiente nivel.',
    descripcion:'Una continuación profunda que te prepara para los desafíos universitarios y profesionales más exigentes.',
    beneficios:['Acceso a las carreras más demandadas','Pensamiento abstracto de alto nivel','Base sólida para Física e Ingeniería','Ventaja en exámenes de ingreso universitario'],
    contenido_año:{3:['Ecuaciones cuadráticas','Sistemas','Trigonometría'],4:['Funciones avanzadas','Cálculo intro'],5:['Cálculo diferencial','Álgebra lineal'],6:['Cálculo integral','Estadística avanzada']},
    tutor:'Profe Marcos', tutor_desc:'Desafiante pero accesible. Te hace pensar hasta que llegás solo a la respuesta.',
    carrerasRelacionadas:['Ingeniería','Física','Economía','Programación'],
    curiosidad:'El cálculo fue inventado simultáneamente por Newton y Leibniz en el siglo XVII.',
  },
  'Lengua y Literatura': {
    emoji:'📖', color:'bg-emerald-100', text:'text-emerald-700',
    tagline:'Las palabras son tu herramienta más poderosa.',
    descripcion:'Aprendé a comunicarte con claridad, leer críticamente y escribir con impacto. En un mundo donde todo se comunica, quien domina las palabras domina su futuro.',
    beneficios:['Mejorá tu expresión oral y escrita','Desarrollá pensamiento crítico','Aprendé a argumentar y convencer','Habilidad clave para cualquier carrera'],
    contenido_año:{1:['Comprensión lectora','Tipos de texto','Narración','Ortografía','El cuento'],2:['Textos argumentativos','Análisis literario','La novela','Recursos literarios'],3:['Literatura latinoamericana','El ensayo','Oratoria','Escritura creativa'],4:['Literatura universal','Géneros periodísticos','Retórica'],5:['Literatura contemporánea','Análisis discursivo','Escritura académica'],6:['Literatura y sociedad','Escritura profesional','Portfolio literario']},
    tutor:'Profe Ana', tutor_desc:'Apasionada de la literatura, transforma cada texto en una aventura.',
    carrerasRelacionadas:['Comunicación','Derecho','Psicología','Periodismo','Docencia'],
    curiosidad:'Leer 20 minutos al día puede aumentar tu vocabulario en más de 1 millón de palabras por año.',
  },
  'Biología': {
    emoji:'🔬', color:'bg-green-100', text:'text-green-700',
    tagline:'Entendé la vida desde adentro.',
    descripcion:'Desde la célula más pequeña hasta los ecosistemas más complejos, Biología te conecta con el mundo vivo que te rodea y con tu propio cuerpo.',
    beneficios:['Comprensión del cuerpo humano','Base para medicina y biotecnología','Conciencia ambiental y ecológica','Habilidades científicas de observación'],
    contenido_año:{1:['La célula','Orgánulos','División celular','Seres vivos','Ecosistemas'],2:['Genética','ADN','Evolución','Sistemas del cuerpo','Ecología'],3:['Biología molecular','Biotecnología','Fisiología','Microbiología'],4:['Genética avanzada','Bioquímica','Inmunología','Neurobiología'],5:['Biología celular avanzada','Genómica','Metabolismo'],6:['Biología del desarrollo','Bioinformática','Bioética']},
    tutor:'Profe Laura', tutor_desc:'Científica de corazón. Hace que lo complejo sea fascinante con experimentos y ejemplos visuales.',
    carrerasRelacionadas:['Medicina','Veterinaria','Biotecnología','Farmacia','Ecología'],
    curiosidad:'Tu cuerpo tiene más bacterias que células propias. ¡Somos más microbio que humano!',
  },
  'Historia': {
    emoji:'🗺️', color:'bg-amber-100', text:'text-amber-700',
    tagline:'El pasado explica todo lo que vivimos hoy.',
    descripcion:'Historia no es memorizar fechas: es entender por qué el mundo es como es, cómo tomamos decisiones colectivas y qué podemos aprender de la humanidad.',
    beneficios:['Pensamiento crítico y contextual','Comprensión de la política actual','Formación ciudadana','Habilidad para analizar fuentes'],
    contenido_año:{1:['Prehistoria','Mesopotamia y Egipto','Grecia y Roma','Edad Media','Pueblos originarios'],2:['Renacimiento','Conquista','Revolución Francesa','Revolución Industrial'],3:['Argentina colonial','S. XIX latinoamericano','Primera Guerra Mundial'],4:['Segunda Guerra Mundial','Guerra Fría','Dictaduras latinoamericanas'],5:['Historia reciente Argentina','Globalización','Conflictos contemporáneos'],6:['Democracia','Memoria y verdad','Análisis de fuentes']},
    tutor:'Profe Roberto', tutor_desc:'Cuenta la historia como si fuera una novela de suspenso. Conecta siempre el pasado con el presente.',
    carrerasRelacionadas:['Derecho','Ciencias Políticas','Periodismo','Docencia','Relaciones Internacionales'],
    curiosidad:'El 90% de los conflictos actuales tienen raíces históricas de hace más de 100 años.',
  },
  'Geografía': {
    emoji:'🌍', color:'bg-blue-100', text:'text-blue-700',
    tagline:'El mundo es más grande de lo que imaginás.',
    descripcion:'Geografía te enseña a leer el mundo: sus paisajes, climas, recursos, poblaciones y los desafíos ambientales del siglo XXI.',
    beneficios:['Comprensión de problemas ambientales globales','Lectura crítica de mapas y datos','Conexión entre naturaleza y economía','Visión global para carreras internacionales'],
    contenido_año:{1:['Capas de la Tierra','Continentes','Climas','Argentina: regiones'],2:['Población mundial','Urbanización','Recursos naturales'],3:['Geopolítica básica','Globalización','Desarrollo sustentable'],4:['Geografía política','Migraciones','Cambio climático'],5:['Bloques económicos','Geopolítica de recursos'],6:['Geografía aplicada','Ciudades del futuro']},
    tutor:'Profe Valeria', tutor_desc:'Apasionada del medioambiente, conecta cada tema con la actualidad del planeta.',
    carrerasRelacionadas:['Arquitectura','Urbanismo','Ecología','Turismo','Relaciones Internacionales'],
    curiosidad:'El 71% de la Tierra está cubierto de agua pero solo el 3% es agua dulce accesible.',
  },
  'Inglés': {
    emoji:'🗣️', color:'bg-orange-100', text:'text-orange-700',
    tagline:'El idioma que abre todas las puertas.',
    descripcion:'Inglés es el idioma del trabajo, la tecnología, la ciencia y el entretenimiento global. Dominarlo es una de las inversiones más importantes en tu futuro.',
    beneficios:['Acceso al 80% del contenido de internet','Condición para trabajos bien remunerados','Posibilidad de estudiar en el exterior','Comunicación con personas de todo el mundo'],
    contenido_año:{1:['Vocabulario esencial','Present Simple','Rutinas diarias'],2:['Past Simple','Comparativos','Conversación cotidiana'],3:['Present Perfect','Condicionales','Textos académicos'],4:['Tiempos avanzados','Escritura formal','Debate'],5:['Inglés académico','Presentaciones orales','Certificaciones'],6:['Inglés profesional','Entrevistas de trabajo','Portfolio']},
    tutor:'Profe James', tutor_desc:'Enseña con música, series y situaciones reales. Su clase nunca se siente como estudiar.',
    carrerasRelacionadas:['Todas las carreras','Comercio Exterior','Turismo','Tecnología'],
    curiosidad:'El inglés es idioma oficial de 67 países. Es el idioma de Internet y de la ciencia.',
  },
  'Educación Física': {
    emoji:'⚽', color:'bg-lime-100', text:'text-lime-700',
    tagline:'Tu cuerpo es tu primer instrumento.',
    descripcion:'Mucho más que deporte: aprendé sobre salud, rendimiento físico, trabajo en equipo y el bienestar integral que te acompaña toda la vida.',
    beneficios:['Mejora de la salud física y mental','Disciplina y constancia','Trabajo en equipo','Reducción del estrés'],
    contenido_año:{1:['Deportes grupales','Coordinación','Salud y hábitos'],2:['Deportes individuales','Resistencia','Nutrición básica'],3:['Entrenamiento funcional','Salud mental','Biomecánica'],4:['Planificación del ejercicio','Rendimiento deportivo'],5:['Deporte y tecnología','Salud preventiva'],6:['Proyecto de vida activa','Bienestar integral']},
    tutor:'Profe Lucas', tutor_desc:'Energético y motivador. Conecta el movimiento con el bienestar mental.',
    carrerasRelacionadas:['Educación Física','Kinesiología','Nutrición','Medicina Deportiva'],
    curiosidad:'30 minutos de ejercicio diario mejoran la concentración y memoria hasta un 20%.',
  },
  'Arte': {
    emoji:'🎨', color:'bg-rose-100', text:'text-rose-700',
    tagline:'Expresá lo que las palabras no pueden decir.',
    descripcion:'Arte es el lenguaje universal de la humanidad. Desarrollá tu creatividad y capacidad de expresión a través de distintos lenguajes artísticos.',
    beneficios:['Desarrollo de creatividad','Expresión emocional saludable','Apreciación cultural','Base para diseño y comunicación'],
    contenido_año:{1:['Dibujo y color','Historia del arte'],2:['Pintura','Arte latinoamericano'],3:['Diseño gráfico','Arte contemporáneo'],4:['Cine y arte','Diseño visual'],5:['Arte y comunicación','Proyecto artístico'],6:['Portfolio profesional','Arte y emprendimiento']},
    tutor:'Profe Sofía', tutor_desc:'Artista y educadora. Hace que cada alumno descubra su propio estilo.',
    carrerasRelacionadas:['Diseño Gráfico','Arquitectura','Publicidad','Cine','Comunicación'],
    curiosidad:'Los estudiantes de arte tienen un 30% mejor rendimiento en matemática, según Harvard.',
  },
  'Tecnología': {
    emoji:'💻', color:'bg-cyan-100', text:'text-cyan-700',
    tagline:'Entendé el mundo que te rodea y creá el tuyo.',
    descripcion:'La tecnología ya no es opcional: es el idioma del siglo XXI. Aprendé a usarla, entenderla y crear con ella.',
    beneficios:['Habilidades digitales esenciales','Pensamiento computacional','Base para programación y emprendimiento','Comprensión crítica del impacto tecnológico'],
    contenido_año:{1:['Herramientas digitales','Internet seguro','Pensamiento computacional'],2:['Programación visual','Diseño digital','Seguridad digital'],3:['Python básico','Diseño web','IA y sociedad'],4:['Programación avanzada','Bases de datos','UX/UI'],5:['Desarrollo web','IA aplicada','Startup digital'],6:['Proyecto tecnológico final','Tecnología del futuro']},
    tutor:'Profe Nicolás', tutor_desc:'Desarrollador y educador. Sus clases se sienten como trabajar en una startup.',
    carrerasRelacionadas:['Programación','Ingeniería en Sistemas','Diseño UX','Ciberseguridad'],
    curiosidad:'El 65% de los empleos que existirán en 2030 aún no existen. Todos tendrán componente tecnológico.',
  },
  'Educación Emocional': {
    emoji:'❤️', color:'bg-pink-100', text:'text-pink-700',
    tagline:'La inteligencia más importante es la emocional.',
    descripcion:'Aprendé a conocerte, gestionar tus emociones y construir relaciones sanas. La resiliencia que necesitás para cualquier desafío de la vida.',
    beneficios:['Manejo del estrés y la ansiedad','Relaciones interpersonales más sanas','Autoconocimiento y autoestima','Fundamental para cualquier carrera'],
    contenido_año:{1:['Autoconocimiento','Emociones básicas','Empatía'],2:['Inteligencia emocional','Autoestima','Relaciones saludables'],3:['Mindfulness','Manejo del estrés','Resiliencia'],4:['Psicología básica','Motivación','Proyecto de vida'],5:['Inteligencia social','Negociación','Límites personales'],6:['Liderazgo consciente','Bienestar profesional']},
    tutor:'Profe Camila', tutor_desc:'Psicóloga y educadora. Crea un espacio seguro donde cada alumno puede ser auténtico.',
    carrerasRelacionadas:['Psicología','Trabajo Social','Educación','Recursos Humanos'],
    curiosidad:'El 80% del éxito personal y profesional depende de la inteligencia emocional, según Daniel Goleman.',
  },
  'Ciencias Naturales': {
    emoji:'🔬', color:'bg-teal-100', text:'text-teal-700',
    tagline:'Preguntá, observá, descubrí.',
    descripcion:'Desarrollá el pensamiento científico explorando el mundo natural: la materia, la energía, los seres vivos y el universo.',
    beneficios:['Pensamiento científico','Base para ciencias universitarias','Comprensión del mundo natural','Hábitos de análisis crítico'],
    contenido_año:{1:['Seres vivos','Materia y energía','Agua y ecosistemas'],2:['Célula y cuerpo humano','Mezclas','Clima'],3:['Física básica','Química intro','Biología animal']},
    tutor:'Profe Laura', tutor_desc:'Hace que cada clase sea un laboratorio de descubrimientos.',
    carrerasRelacionadas:['Medicina','Ingeniería','Biología','Química'],
    curiosidad:'El método científico fue formalizado hace 400 años pero la curiosidad humana es tan antigua como nuestra especie.',
  },
  'Ciencias Sociales': {
    emoji:'🌍', color:'bg-amber-100', text:'text-amber-700',
    tagline:'La sociedad también se aprende.',
    descripcion:'Entendé cómo funcionan las comunidades, las economías y las culturas.',
    beneficios:['Comprensión de la sociedad','Base para historia y geografía','Pensamiento crítico','Empatía intercultural'],
    contenido_año:{1:['Mi comunidad','La familia','El campo y la ciudad'],2:['Pueblos originarios','La Colonia','Argentina S.XIX'],3:['América Latina','Migraciones','Economía y trabajo']},
    tutor:'Profe Roberto', tutor_desc:'Conecta los temas con la realidad cotidiana para que sientas que la historia es tuya.',
    carrerasRelacionadas:['Historia','Geografía','Sociología','Trabajo Social'],
    curiosidad:'El 55% de la población mundial vive en ciudades. En 2050 será el 68%.',
  },
  'Física': {
    emoji:'⚛️', color:'bg-violet-100', text:'text-violet-700',
    tagline:'Las leyes del universo en tus manos.',
    descripcion:'Física explica desde cómo cae una manzana hasta cómo funciona un smartphone. Es la base de toda la tecnología moderna.',
    beneficios:['Comprensión del mundo físico','Base para ingeniería y tecnología','Razonamiento matemático aplicado','Habilidades de experimentación'],
    contenido_año:{3:['Cinemática','Leyes de Newton','Energía','Hidrostática','Calor'],4:['Electromagnetismo','Ondas','Óptica','Gravitación']},
    tutor:'Profe Andrés', tutor_desc:'Usa experimentos reales para que la física deje de ser abstracta.',
    carrerasRelacionadas:['Ingeniería','Física','Astronomía','Medicina'],
    curiosidad:'Tu smartphone usa física cuántica en cada procesador. Sin Física no habría tecnología moderna.',
  },
  'Química': {
    emoji:'🧪', color:'bg-yellow-100', text:'text-yellow-700',
    tagline:'Todo lo que ves está hecho de átomos.',
    descripcion:'Química es la ciencia de la materia y sus transformaciones. Desde el oxígeno que respirás hasta los medicamentos que te curan.',
    beneficios:['Comprensión de materiales','Base para medicina y farmacia','Habilidades de laboratorio','Pensamiento analítico'],
    contenido_año:{3:['Átomo','Enlace químico','Reacciones','Soluciones','Ácidos y bases'],4:['Química orgánica','Reacciones avanzadas','Química ambiental','Bioquímica intro']},
    tutor:'Profe Marina', tutor_desc:'Hace experimentos en cada clase. La química nunca fue tan emocionante.',
    carrerasRelacionadas:['Medicina','Farmacia','Ingeniería Química','Biotecnología'],
    curiosidad:'El cuerpo humano está compuesto por 60 elementos químicos. El oxígeno es el 65% de tu masa.',
  },
  'Filosofía': {
    emoji:'🤔', color:'bg-slate-100', text:'text-slate-700',
    tagline:'Pensá lo que nadie se anima a pensar.',
    descripcion:'Filosofía te entrena para hacer las preguntas correctas, cuestionar lo que se da por sentado y construir argumentos sólidos.',
    beneficios:['Pensamiento crítico y argumentación','Comprensión de grandes preguntas','Base para derecho y humanidades','Habilidad para debatir en profundidad'],
    contenido_año:{4:['Introducción a la filosofía','Ética y moral','Lógica','Grandes filósofos'],5:['Filosofía política','Existencialismo','Filosofía contemporánea'],6:['Ética aplicada','Filosofía y tecnología','Portfolio de ideas']},
    tutor:'Profe Elena', tutor_desc:'Socrática y apasionada. Nunca da respuestas directas sino que te guía para que las encontrés vos.',
    carrerasRelacionadas:['Derecho','Psicología','Política','Educación','Humanidades'],
    curiosidad:'Sócrates nunca escribió nada. Todo lo que sabemos de él lo escribieron sus alumnos.',
  },
  'Robótica': {
    emoji:'🤖', color:'bg-cyan-100', text:'text-cyan-700',
    tagline:'Construí máquinas que piensan y actúan.',
    descripcion:'Robótica combina programación, electrónica y mecánica para crear sistemas que interactúan con el mundo físico. Es la materia del futuro presente.',
    beneficios:['Base para ingeniería y tecnología','Pensamiento lógico y resolución de problemas','Experiencia con hardware real','Habilidad más demandada en la industria 4.0'],
    contenido:['Fundamentos de robótica','Programación de robots','Sensores y actuadores','Proyectos con Arduino','Robótica colaborativa'],
    tutor:'Profe Nicolás', tutor_desc:'Apasionado de la tecnología, hace que programar robots sea tan natural como jugar.',
    carrerasRelacionadas:['Ingeniería en Sistemas','Mecatrónica','Automatización'],
    curiosidad:'Para 2030 habrá más robots que personas en muchas fábricas. Quienes los programen tendrán trabajo garantizado.',
  },
  'Programación': {
    emoji:'⌨️', color:'bg-cyan-100', text:'text-cyan-700',
    tagline:'El superpoder del siglo XXI.',
    descripcion:'Programar es darle instrucciones a las computadoras para resolver problemas. Es la habilidad más valorada y mejor paga del mercado laboral actual.',
    beneficios:['Habilidad mejor paga del mercado','Trabajar desde cualquier parte del mundo','Crear tus propias apps','Base para IA y Data Science'],
    contenido:['Lógica de programación','Python básico y avanzado','Desarrollo web','Bases de datos','Proyecto de app propia'],
    tutor:'Profe Nicolás', tutor_desc:'Desarrollador con años de experiencia. Enseña con proyectos reales desde el primer día.',
    carrerasRelacionadas:['Ingeniería en Sistemas','Data Science','Desarrollo Web','Ciberseguridad'],
    curiosidad:'Un programador con 3 años de experiencia en Argentina gana más que el promedio de cualquier profesión universitaria.',
  },
  'Ajedrez y Pensamiento Estratégico': {
    emoji:'♟️', color:'bg-gray-100', text:'text-gray-700',
    tagline:'El juego que entrena mentes brillantes.',
    descripcion:'El ajedrez desarrolla concentración, pensamiento estratégico y capacidad de anticipar consecuencias. Usado por las mejores escuelas del mundo.',
    beneficios:['Mejora la concentración y memoria','Desarrolla pensamiento estratégico','Aumenta el rendimiento en matemática','Enseña a manejar la presión'],
    contenido:['Fundamentos del ajedrez','Aperturas clásicas','Táctica y estrategia','Finales','Análisis de partidas'],
    tutor:'Profe Marcos', tutor_desc:'Jugador competitivo y educador. Convierte cada partida en una lección de vida.',
    carrerasRelacionadas:['Cualquier carrera','Negocios','Ingeniería','Derecho'],
    curiosidad:'El 94% de los grandes maestros de ajedrez tienen coeficiente intelectual superior al promedio.',
  },
  'Música y Producción Sonora': {
    emoji:'🎵', color:'bg-purple-100', text:'text-purple-700',
    tagline:'El lenguaje universal que une al mundo.',
    descripcion:'Música no es solo tocar un instrumento: es entender el sonido, la emoción y la tecnología para crear experiencias únicas.',
    beneficios:['Creatividad y disciplina','Base para producción musical','Mejora matemática según estudios científicos','Expresión emocional saludable'],
    contenido:['Teoría musical','Producción digital','Composición','Historia de la música','Proyecto musical propio'],
    tutor:'Profe Sofía', tutor_desc:'Músico y productor. Enseña desde la teoría hasta los últimos DAWs del mercado.',
    carrerasRelacionadas:['Producción Musical','Comunicación','Cine','Marketing'],
    curiosidad:'Estudiar música aumenta el rendimiento académico general un 15% según Harvard.',
  },
  'Teatro y Expresión': {
    emoji:'🎭', color:'bg-rose-100', text:'text-rose-700',
    tagline:'Actuá tu vida con más intensidad.',
    descripcion:'Teatro desarrolla confianza, expresión corporal y la capacidad de ponerse en el lugar del otro. Habilidades clave para cualquier carrera.',
    beneficios:['Confianza y seguridad personal','Expresión verbal y corporal','Empatía y trabajo en equipo','Base para comunicación y liderazgo'],
    contenido:['Expresión corporal','Improvisación','Texto dramático','Producción teatral','Obra final'],
    tutor:'Profe Camila', tutor_desc:'Actriz y educadora. Transforma la timidez en fortaleza.',
    carrerasRelacionadas:['Comunicación','Educación','Psicología','Marketing'],
    curiosidad:'El 70% de los CEOs más exitosos tienen formación en teatro o improvisación.',
  },
  'Escritura Creativa': {
    emoji:'✍️', color:'bg-emerald-100', text:'text-emerald-700',
    tagline:'Tus historias pueden cambiar el mundo.',
    descripcion:'La escritura creativa es una de las habilidades más valoradas en la economía del conocimiento. Desde novelas hasta contenido digital, quien escribe bien tiene poder.',
    beneficios:['Expresión auténtica de ideas','Habilidad clave para marketing','Pensamiento narrativo','Base para periodismo y contenido digital'],
    contenido:['Narrativa y personajes','Géneros literarios','Escritura digital','Taller de escritura','Portfolio de obras'],
    tutor:'Profe Ana', tutor_desc:'Escritora y editora. Te ayuda a encontrar tu voz única.',
    carrerasRelacionadas:['Periodismo','Comunicación','Marketing','Guión'],
    curiosidad:'El mercado de contenidos digitales mueve más de 400 mil millones de dólares anuales.',
  },
  'Astronomía': {
    emoji:'🔭', color:'bg-indigo-100', text:'text-indigo-700',
    tagline:'El universo espera que lo descubras.',
    descripcion:'Astronomía te lleva más allá de la Tierra para entender el cosmos y el lugar de la humanidad en el universo.',
    beneficios:['Perspectiva única sobre la vida','Base para física e ingeniería espacial','Pensamiento científico avanzado','Conexión con preguntas profundas'],
    contenido:['Sistema solar','Estrellas y galaxias','Cosmología','Exploración espacial','Astrofísica intro'],
    tutor:'Profe Andrés', tutor_desc:'Físico y astrónomo. Hace que el universo quepa en una clase.',
    carrerasRelacionadas:['Física','Ingeniería Aeroespacial','Matemática','Ciencias'],
    curiosidad:'Hay más estrellas en el universo que granos de arena en todas las playas de la Tierra.',
  },
  'Educación Financiera': {
    emoji:'💰', color:'bg-emerald-100', text:'text-emerald-700',
    tagline:'El dinero es una herramienta. Aprendé a usarla.',
    descripcion:'La educación financiera es la habilidad que más impacta en la calidad de vida pero que menos se enseña. En iAcademia la enseñamos desde jóvenes.',
    beneficios:['Gestión inteligente del dinero','Base para inversiones','Comprensión del sistema financiero','Herramientas para emprender'],
    contenido:['Presupuesto personal','Ahorro e inversión','Sistema bancario','Emprendimiento financiero','Plan financiero propio'],
    tutor:'Profe Diego', tutor_desc:'Economista y emprendedor. Enseña con casos reales y simulaciones.',
    carrerasRelacionadas:['Administración','Economía','Contabilidad','Finanzas'],
    curiosidad:'El 80% de los argentinos no tiene educación financiera. Los que la tienen acumulan 3 veces más patrimonio.',
  },
  'Emprendimiento Juvenil': {
    emoji:'🚀', color:'bg-orange-100', text:'text-orange-700',
    tagline:'Tu idea puede ser el próximo gran negocio.',
    descripcion:'Emprendimiento te enseña a identificar oportunidades, crear soluciones y llevarlas al mercado.',
    beneficios:['Mentalidad de crecimiento','Habilidades para crear tu negocio','Liderazgo y gestión','Red de contactos desde joven'],
    contenido:['Ideación y validación','Modelo de negocios','Marketing básico','Pitch','Proyecto de startup propio'],
    tutor:'Profe Diego', tutor_desc:'Serial emprendedor con 3 startups fundadas. Enseña desde la experiencia real.',
    carrerasRelacionadas:['Administración','Marketing','Ingeniería','Diseño'],
    curiosidad:'El 90% de los unicornios fueron fundados por personas menores de 30 años.',
  },
  'Ecología y Cambio Climático': {
    emoji:'🌱', color:'bg-green-100', text:'text-green-700',
    tagline:'El planeta necesita que lo entiendas.',
    descripcion:'El cambio climático es el mayor desafío de nuestra generación. Esta materia te da herramientas para entenderlo y ser parte de la solución.',
    beneficios:['Comprensión de la crisis ambiental','Herramientas para actuar','Base para carreras ambientales','Conciencia sobre sustentabilidad'],
    contenido:['Ecosistemas y biodiversidad','Cambio climático','Energías renovables','Política ambiental','Proyecto de impacto'],
    tutor:'Profe Valeria', tutor_desc:'Bióloga y activista ambiental. Convierte la preocupación en acción.',
    carrerasRelacionadas:['Ecología','Ingeniería Ambiental','Biología','Derecho Ambiental'],
    curiosidad:'La generación actual será la última con oportunidad real de revertir el cambio climático según el IPCC.',
  },
  'Movimiento Consciente y Salud': {
    emoji:'🧘', color:'bg-teal-100', text:'text-teal-700',
    tagline:'Tu cuerpo y tu mente en armonía.',
    descripcion:'Yoga, mindfulness y movimiento consciente para desarrollar bienestar integral.',
    beneficios:['Reducción del estrés','Mejora de la concentración','Conexión cuerpo-mente','Hábitos de bienestar para toda la vida'],
    contenido:['Yoga básico','Meditación','Respiración consciente','Movimiento y emoción','Proyecto de bienestar'],
    tutor:'Profe Camila', tutor_desc:'Instructora certificada de yoga. Crea un espacio de paz y presencia.',
    carrerasRelacionadas:['Psicología','Nutrición','Educación Física','Medicina'],
    curiosidad:'8 semanas de mindfulness cambian físicamente la estructura del cerebro mejorando memoria y reduciendo estrés.',
  },
  'Debate y Oratoria': {
    emoji:'🎤', color:'bg-red-100', text:'text-red-700',
    tagline:'Tu voz es tu arma más poderosa.',
    descripcion:'La capacidad de hablar en público y debatir con claridad es una de las habilidades más valoradas en cualquier carrera.',
    beneficios:['Confianza para hablar en público','Argumentación persuasiva','Pensamiento rápido y crítico','Clave para liderazgo y política'],
    contenido:['Técnicas de oratoria','Argumentación','Debate formal','Presentaciones de impacto','Torneo final'],
    tutor:'Profe Ana', tutor_desc:'Oradora y debatista. Transforma la timidez en elocuencia.',
    carrerasRelacionadas:['Derecho','Política','Comunicación','Docencia'],
    curiosidad:'El miedo a hablar en público es el más común del mundo, superando al miedo a la muerte.',
  },
  'Diseño de Videojuegos': {
    emoji:'🎮', color:'bg-purple-100', text:'text-purple-700',
    tagline:'Creá los mundos que otros van a explorar.',
    descripcion:'La industria de los videojuegos mueve más dinero que el cine y la música juntos.',
    beneficios:['Acceso a industria billonaria','Combinación de arte y tecnología','Creatividad y lógica','Portfolio de proyectos reales'],
    contenido:['Diseño de juegos','Game engines','Narrativa interactiva','Arte y sonido','Tu primer videojuego'],
    tutor:'Profe Nicolás', tutor_desc:'Gamer y desarrollador. Hace que crear videojuegos sea tan divertido como jugarlos.',
    carrerasRelacionadas:['Diseño Digital','Programación','Animación','Narrativa'],
    curiosidad:'La industria global de videojuegos supera los 180.000 millones de dólares anuales.',
  },
  'Ciencia de Datos': {
    emoji:'📊', color:'bg-blue-100', text:'text-blue-700',
    tagline:'Los datos son el petróleo del siglo XXI.',
    descripcion:'La Ciencia de Datos te enseña a extraer conocimiento de grandes volúmenes de información.',
    beneficios:['Una de las carreras mejor pagas','Aplicable a cualquier industria','Base para IA','Pensamiento analítico avanzado'],
    contenido:['Estadística aplicada','Python para datos','Visualización','Machine Learning básico','Proyecto con datos reales'],
    tutor:'Profe Nicolás', tutor_desc:'Data scientist con experiencia en empresas top.',
    carrerasRelacionadas:['Data Science','Economía','Medicina','Ingeniería'],
    curiosidad:'Data Scientist fue elegido el trabajo más sexy del siglo XXI por Harvard Business Review.',
  },
  'Francés': {
    emoji:'🇫🇷', color:'bg-blue-100', text:'text-blue-700',
    tagline:'La lengua del arte, la cultura y la diplomacia.',
    descripcion:'El francés es idioma oficial de 29 países y abre puertas en Europa, África y organizaciones internacionales.',
    beneficios:['Idioma oficial de la ONU','Acceso a cultura y arte','Ventaja para becas en Europa','Perfil internacional completo'],
    contenido:['Fonética','Vocabulario cotidiano','Gramática básica','Conversación','Cultura francófona'],
    tutor:'Profe James', tutor_desc:'Políglota. Enseña idiomas como experiencias culturales.',
    carrerasRelacionadas:['Relaciones Internacionales','Diplomacia','Arte','Turismo'],
    curiosidad:'El francés es el idioma más estudiado del mundo después del inglés.',
  },
  'Portugués': {
    emoji:'🇧🇷', color:'bg-green-100', text:'text-green-700',
    tagline:'El idioma de nuestro vecino más grande.',
    descripcion:'Brasil es la mayor economía de América Latina. El portugués abre puertas en la región y en el mundo.',
    beneficios:['Acceso al mercado laboral brasileño','Ventaja en comercio exterior','Fácil para hispanohablantes','Base para otros idiomas romances'],
    contenido:['Pronunciación','Vocabulario esencial','Gramática básica','Conversación','Cultura brasileña'],
    tutor:'Profe James', tutor_desc:'Con experiencia viviendo en Brasil. Enseña el portugués real.',
    carrerasRelacionadas:['Comercio Exterior','Turismo','Negocios'],
    curiosidad:'El portugués es el 6to idioma más hablado del mundo con más de 250 millones de hablantes.',
  },
  'Alemán': {
    emoji:'🇩🇪', color:'bg-yellow-100', text:'text-yellow-700',
    tagline:'El idioma de la ingeniería y la filosofía.',
    descripcion:'Alemania es la mayor economía de Europa y líder en tecnología. El alemán abre puertas únicas en el mercado europeo.',
    beneficios:['Becas universitarias gratuitas en Alemania','Ventaja en industria tecnológica','Idioma de la filosofía y la ciencia','Perfil muy valorado laboralmente'],
    contenido:['Fonética alemana','Vocabulario básico','Gramática intro','Conversación','Cultura germanófona'],
    tutor:'Profe James', tutor_desc:'Con estudios en Alemania. Enseña desde la cultura y la practicidad.',
    carrerasRelacionadas:['Ingeniería','Medicina','Filosofía','Negocios internacionales'],
    curiosidad:'En Alemania la universidad es gratuita incluso para extranjeros. Saber alemán puede ahorrarte una fortuna.',
  },
  'Japonés': {
    emoji:'🇯🇵', color:'bg-red-100', text:'text-red-700',
    tagline:'La lengua de la tecnología y la tradición.',
    descripcion:'Japón es potencia tecnológica y cultural. El japonés abre puertas en anime, gaming, robótica y automoción.',
    beneficios:['Industria del entretenimiento japonés','Ventaja en tecnología y robótica','Cultura única y enriquecedora','Idioma valorado en Asia-Pacífico'],
    contenido:['Hiragana y Katakana','Vocabulario básico','Gramática intro','Cultura japonesa','Conversación'],
    tutor:'Profe James', tutor_desc:'Fascinado por la cultura japonesa. Enseña el idioma como una aventura.',
    carrerasRelacionadas:['Tecnología','Gaming','Animación','Turismo'],
    curiosidad:'Japón tiene la tercera economía más grande del mundo y es líder en robótica y automoción.',
  },
  'Chino Mandarín': {
    emoji:'🇨🇳', color:'bg-red-100', text:'text-red-700',
    tagline:'El idioma del futuro ya es el presente.',
    descripcion:'China es la segunda economía del mundo. El mandarín es el idioma con más hablantes nativos del planeta.',
    beneficios:['Acceso al mercado más grande del mundo','Habilidad rarísima y muy valorada','Ventaja en negocios internacionales','Comprensión de la cultura del siglo XXI'],
    contenido:['Sistema de escritura básico','Tones y pronunciación','Vocabulario esencial','Gramática básica','Cultura china'],
    tutor:'Profe James', tutor_desc:'Con experiencia en China. Enseña desde lo práctico y lo cultural.',
    carrerasRelacionadas:['Comercio Exterior','Diplomacia','Tecnología','Negocios'],
    curiosidad:'China tiene más de 1.400 millones de personas. Aprender mandarín te conecta con el 18% de la humanidad.',
  },
  'Filosofía del Futuro': {
    emoji:'🤔', color:'bg-slate-100', text:'text-slate-700',
    tagline:'Las preguntas del mañana necesitan mentes de hoy.',
    descripcion:'Filosofía enfocada en los grandes dilemas del siglo XXI: ética de la IA, transhumanismo y el futuro de la humanidad.',
    beneficios:['Pensamiento crítico sobre el futuro','Herramientas para debates éticos','Base para bioética y derecho digital','Perspectiva única en cualquier carrera'],
    contenido:['Filosofía y tecnología','Ética de la IA','Transhumanismo','Democracia digital','El futuro de la humanidad'],
    tutor:'Profe Elena', tutor_desc:'Filósofa especializada en ética digital. Hace urgentes las preguntas del futuro.',
    carrerasRelacionadas:['Filosofía','Derecho','Tecnología','Política'],
    curiosidad:'Las empresas tecnológicas más importantes contratan filósofos para resolver dilemas éticos.',
  },
  'Psicología Aplicada': {
    emoji:'🧠', color:'bg-pink-100', text:'text-pink-700',
    tagline:'Entenderte es el primer paso para entender a los demás.',
    descripcion:'Una introducción práctica a la psicología para comprender el comportamiento humano desde una perspectiva científica.',
    beneficios:['Autoconocimiento profundo','Comprensión de los demás','Base para psicología','Herramientas para relaciones más sanas'],
    contenido:['Fundamentos de psicología','Psicología del desarrollo','Conducta y emoción','Psicología social','Proyecto de autoconocimiento'],
    tutor:'Profe Camila', tutor_desc:'Psicóloga clínica. Enseña desde la teoría y la experiencia real.',
    carrerasRelacionadas:['Psicología','Medicina','Recursos Humanos','Educación'],
    curiosidad:'El 75% de los conflictos laborales tienen raíz psicológica. Entender personas es la habilidad más valiosa.',
  },
  'Neurociencia para la Vida': {
    emoji:'🧬', color:'bg-purple-100', text:'text-purple-700',
    tagline:'Entendé cómo funciona tu cerebro y cambiá tu vida.',
    descripcion:'La neurociencia explica cómo aprendemos, tomamos decisiones y podemos mejorar nuestro rendimiento mental.',
    beneficios:['Comprensión del propio cerebro','Técnicas de aprendizaje basadas en ciencia','Base para medicina','Herramientas de alto rendimiento'],
    contenido:['Estructura del cerebro','Neuroplasticidad','Memoria y aprendizaje','Emociones y cerebro','Optimización mental'],
    tutor:'Profe Laura', tutor_desc:'Bióloga especializada en neurociencia. Hace apasionante la ciencia del cerebro.',
    carrerasRelacionadas:['Medicina','Psicología','Educación','Investigación'],
    curiosidad:'El cerebro tiene 86 mil millones de neuronas. Cada vez que aprendés, creás nuevas conexiones.',
  },
  'Historia del Arte': {
    emoji:'🖼️', color:'bg-rose-100', text:'text-rose-700',
    tagline:'El arte es la memoria visual de la humanidad.',
    descripcion:'Un viaje fascinante desde las cuevas prehistóricas hasta el arte digital contemporáneo.',
    beneficios:['Cultura general y sensibilidad estética','Comprensión de la historia','Base para diseño y arquitectura','Análisis visual crítico'],
    contenido:['Arte prehistórico','Renacimiento y Barroco','Arte moderno','Arte contemporáneo','Arte digital'],
    tutor:'Profe Sofía', tutor_desc:'Historiadora del arte con visión contemporánea.',
    carrerasRelacionadas:['Diseño','Arquitectura','Comunicación','Turismo Cultural'],
    curiosidad:'"Salvator Mundi" de Da Vinci fue vendido por 450 millones de dólares, la obra más cara de la historia.',
  },
  'Cocina Saludable': {
    emoji:'🍳', color:'bg-orange-100', text:'text-orange-700',
    tagline:'Comés lo que sos. Elegí bien.',
    descripcion:'La alimentación saludable es una de las decisiones más importantes para tu bienestar.',
    beneficios:['Hábitos saludables para toda la vida','Comprensión de la nutrición','Habilidad práctica y creativa','Base para gastronomía'],
    contenido:['Nutrición básica','Técnicas de cocina saludable','Recetas prácticas','Alimentación consciente','Proyecto gastronómico'],
    tutor:'Profe Lucas', tutor_desc:'Chef y nutricionista. Hace que comer sano sea delicioso.',
    carrerasRelacionadas:['Gastronomía','Nutrición','Medicina','Emprendimiento'],
    curiosidad:'El 80% de las enfermedades crónicas modernas están relacionadas con la alimentación.',
  },
  'Educación Vial': {
    emoji:'🚦', color:'bg-yellow-100', text:'text-yellow-700',
    tagline:'Las reglas del camino salvan vidas.',
    descripcion:'Educación vial para todos los ciudadanos que comparten el espacio público.',
    beneficios:['Prevención de accidentes','Conocimiento de leyes de tránsito','Conducta responsable','Preparación para la licencia'],
    contenido:['Señales y normas','Seguridad del peatón','Primeros auxilios viales','Alcohol y drogas al volante','Proyecto comunitario'],
    tutor:'Profe Lucas', tutor_desc:'Instructor vial certificado. Enseña con casos reales.',
    carrerasRelacionadas:['Derecho','Ingeniería Vial','Seguridad'],
    curiosidad:'En Argentina mueren más de 7.000 personas por año en accidentes de tránsito. La mayoría son prevenibles.',
  },
  'Lengua de Señas (LSA)': {
    emoji:'👋', color:'bg-teal-100', text:'text-teal-700',
    tagline:'Comunicación sin barreras.',
    descripcion:'La LSA es el idioma natural de la comunidad sorda argentina. Aprenderla es un acto de inclusión.',
    beneficios:['Comunicación con la comunidad sorda','Habilidad única y valorada','Sensibilización hacia la diversidad','Base para trabajo social'],
    contenido:['Alfabeto y números','Vocabulario básico','Gramática de la LSA','Conversación','Cultura de la comunidad sorda'],
    tutor:'Profe Camila', tutor_desc:'Intérprete de LSA certificada. Enseña con respeto y pasión por la inclusión.',
    carrerasRelacionadas:['Trabajo Social','Educación Especial','Psicología','Medicina'],
    curiosidad:'Hay más de 100.000 personas sordas en Argentina que usan la LSA como idioma principal.',
  },
  'Lógica y Pensamiento Crítico': {
    emoji:'🧩', color:'bg-indigo-100', text:'text-indigo-700',
    tagline:'Pensá mejor. Decidí mejor. Viví mejor.',
    descripcion:'El pensamiento crítico es la herramienta más poderosa para navegar un mundo lleno de información y fake news.',
    beneficios:['Resistencia a la manipulación','Decisiones más inteligentes','Argumentación rigurosa','Habilidad transversal a todo'],
    contenido:['Lógica formal','Falacias y sesgos cognitivos','Pensamiento crítico aplicado','Detección de fake news','Proyecto de análisis'],
    tutor:'Profe Elena', tutor_desc:'Filósofa y lógica. Entrena mentes para pensar con rigor y claridad.',
    carrerasRelacionadas:['Cualquier carrera','Derecho','Filosofía','Ciencia','Periodismo'],
    curiosidad:'El 90% de las decisiones humanas son tomadas por sesgos cognitivos. La lógica es el antídoto.',
  },
  'Cultura Digital': {
    emoji:'📱', color:'bg-cyan-100', text:'text-cyan-700',
    tagline:'Navegá el mundo digital con inteligencia.',
    descripcion:'Vivimos en un mundo digital pero pocos lo entienden realmente. Esta materia te da herramientas para aprovecharlo.',
    beneficios:['Ciudadanía digital responsable','Comprensión de algoritmos','Creación de contenido de valor','Habilidades para el trabajo digital'],
    contenido:['Cultura de plataformas','Algoritmos y privacidad','Identidad digital','Creación de contenido','Economía de la atención'],
    tutor:'Profe Nicolás', tutor_desc:'Experto en cultura de internet. Desmitifica el mundo digital.',
    carrerasRelacionadas:['Marketing Digital','Comunicación','Periodismo','Diseño'],
    curiosidad:'El usuario promedio pasa más de 7 horas diarias conectado. Usarlo estratégicamente cambia tu vida.',
  },
};

const INFO_PREMIUM = {
  ia_datos: {
    emoji:'🤖', color:'bg-violet-100', text:'text-violet-700',
    tagline:'La carrera más demandada y mejor paga del siglo XXI.',
    descripcion:'La Inteligencia Artificial y la Ciencia de Datos están redefiniendo absolutamente todos los sectores de la economía global. Desde medicina hasta finanzas, desde educación hasta entretenimiento — todo pasa por datos e inteligencia artificial. Esta materia te da las herramientas reales para ser protagonista de esa revolución, no solo espectador.',
    beneficios:[
      'Una de las 3 habilidades mejor pagas del mercado laboral global',
      'Trabajar en cualquier industria: salud, finanzas, tecnología, educación',
      'Comprensión profunda de cómo funciona la IA que usás todos los días',
      'Capacidad de crear soluciones que impactan millones de personas',
      'Base sólida para Machine Learning, Deep Learning y más',
    ],
    contenido:[
      'Fundamentos de Inteligencia Artificial',
      'Python para ciencia de datos desde cero',
      'Análisis y visualización de datos reales',
      'Machine Learning: modelos predictivos',
      'Redes neuronales e introducción al Deep Learning',
      'IA generativa: cómo funcionan ChatGPT y similares',
      'Ética en IA: sesgos, privacidad y responsabilidad',
      'Proyecto final: solución de IA aplicada a un problema real',
    ],
    diferenciadores:[
      '🛠️ Acceso a herramientas profesionales: Python, Jupyter, TensorFlow',
      '📊 Proyectos con datasets reales del mundo actual',
      '🎓 Certificación reconocida por empresas del sector tech',
      '👥 Mentoría personalizada con profesionales de la industria',
      '🔗 Red de contactos con el ecosistema tech argentino',
    ],
    carrerasRelacionadas:['Data Science','Machine Learning Engineer','Analista de Datos','Investigación en IA','Fintech','Salud Digital'],
    mercado:'⚡ Los Data Scientists son los profesionales más demandados del mundo. En Argentina, un especialista junior gana desde $600.000/mes. Senior: más de $2.000.000. La demanda supera ampliamente la oferta.',
  },
  derecho: {
    emoji:'⚖️', color:'bg-blue-100', text:'text-blue-700',
    tagline:'El pensamiento que construye sociedades más justas.',
    descripcion:'El derecho no es solo para abogados: es el sistema que organiza la convivencia humana. Entender cómo funcionan las leyes, los derechos y las instituciones te da poder en cualquier ámbito de la vida. Esta materia te introduce al pensamiento jurídico más riguroso y te prepara para defender tus derechos y los de los demás.',
    beneficios:[
      'Base sólida para abogacía, notariado o ciencias políticas',
      'Herramientas para defender tus derechos en cualquier situación cotidiana',
      'Pensamiento lógico-jurídico que se aplica a cualquier carrera',
      'Comprensión del sistema legal que rige tu vida todos los días',
      'Capacidad de analizar contratos, normativas y situaciones legales',
    ],
    contenido:[
      'Introducción al sistema jurídico argentino',
      'Derecho constitucional y derechos fundamentales',
      'Derecho civil: contratos, familia y propiedad',
      'Derecho penal: delitos, penas y proceso judicial',
      'Derecho del consumidor: tus derechos como ciudadano',
      'Derecho laboral: derechos y obligaciones en el trabajo',
      'Derecho digital: privacidad, datos y tecnología',
      'Proyecto: resolución de casos reales con argumentación jurídica',
    ],
    diferenciadores:[
      '⚖️ Análisis de casos reales de la jurisprudencia argentina',
      '🎭 Simulaciones de juicios con roles de juez, fiscal y defensor',
      '📚 Acceso a jurisprudencia comentada por especialistas',
      '👨‍⚖️ Mentoría con abogados y jueces en ejercicio',
      '🏛️ Visitas virtuales a tribunales y organismos del Estado',
    ],
    carrerasRelacionadas:['Abogacía','Notariado','Relaciones Laborales','Ciencias Políticas','Compliance','Mediación'],
    mercado:'⚡ Los abogados especializados en derecho digital, ambiental y corporativo son los más demandados hoy. Con esta base, llegás a la universidad con ventaja real.',
  },
  contabilidad: {
    emoji:'📈', color:'bg-emerald-100', text:'text-emerald-700',
    tagline:'Quien entiende el dinero, entiende el poder.',
    descripcion:'Las finanzas personales, la contabilidad y la economía son las tres habilidades que más impactan en la calidad de vida de cualquier persona — y sin embargo casi no se enseñan en las escuelas tradicionales. En iAcademia te las enseñamos desde jóvenes, con casos reales, herramientas profesionales y proyectos que podés aplicar desde el primer día.',
    beneficios:[
      'Habilidades financieras que impactan en tu vida personal y profesional',
      'Base sólida para negocios, emprendimiento y administración',
      'Comprensión del sistema económico y financiero argentino y global',
      'Capacidad de gestionar tu propio dinero sin depender de nadie',
      'Herramientas para crear y administrar un negocio propio',
    ],
    contenido:[
      'Contabilidad básica: activos, pasivos y estados financieros',
      'Presupuesto personal y familiar',
      'Inversiones para jóvenes: acciones, bonos y crypto intro',
      'Economía argentina: inflación, dólar y contexto macro',
      'Gestión financiera de un negocio o emprendimiento',
      'Impuestos y obligaciones legales básicas',
      'Finanzas digitales: billeteras virtuales y pagos online',
      'Proyecto: plan financiero personal y empresarial propio',
    ],
    diferenciadores:[
      '📊 Casos reales de empresas argentinas analizados en profundidad',
      '💻 Simulador de inversiones con dinero virtual',
      '🚀 Proyecto de negocio con mentores emprendedores',
      '🛠️ Herramientas contables profesionales desde el primer día',
      '🤝 Red de contactos con el ecosistema emprendedor',
    ],
    carrerasRelacionadas:['Contabilidad','Administración de Empresas','Economía','Finanzas','Emprendimiento','Comercio Exterior'],
    mercado:'⚡ Los profesionales con habilidades financieras sólidas tienen 40% más de chances de fundar un negocio exitoso y 60% más de estabilidad económica a largo plazo.',
  },
  psicologia_avanzada: {
    emoji:'🧠', color:'bg-pink-100', text:'text-pink-700',
    tagline:'La ciencia más poderosa para entender lo humano.',
    descripcion:'La psicología es la ciencia del comportamiento humano y los procesos mentales. No hay carrera ni actividad humana que no se beneficie de entender cómo piensan, sienten y actúan las personas. Esta materia te da un viaje profundo por la psicología aplicada: desde la neurociencia hasta las terapias modernas.',
    beneficios:[
      'Comprensión profunda del comportamiento humano en cualquier contexto',
      'Herramientas para relaciones interpersonales más sanas y productivas',
      'Base sólida para estudiar psicología, medicina o recursos humanos',
      'Autoconocimiento que transforma genuinamente tu vida personal',
      'Habilidades de escucha activa, empatía y resolución de conflictos',
    ],
    contenido:[
      'Fundamentos de neurociencia y comportamiento',
      'Psicología del desarrollo: de la infancia a la adultez',
      'Psicopatología básica: ansiedad, depresión y más',
      'Psicología social: cómo los grupos influyen en el individuo',
      'Principales terapias: cognitivo-conductual, gestalt, mindfulness',
      'Psicología del trabajo y las organizaciones',
      'Psicología positiva y bienestar',
      'Proyecto: investigación psicológica aplicada',
    ],
    diferenciadores:[
      '📋 Análisis de casos clínicos reales (debidamente anonimizados)',
      '🔬 Herramientas de autoconocimiento y tests psicológicos',
      '🎭 Simulaciones de entrevistas y procesos terapéuticos',
      '👨‍⚕️ Mentoría con psicólogos en ejercicio activo',
      '📚 Acceso a los papers más relevantes de psicología actual',
    ],
    carrerasRelacionadas:['Psicología','Medicina','Recursos Humanos','Educación','Coaching','Neurociencia','Trabajo Social'],
    mercado:'⚡ La salud mental es la mayor demanda insatisfecha del siglo XXI. Los psicólogos son los profesionales más buscados en Argentina y el mundo. La pandemia aceleró esta tendencia exponencialmente.',
  },
  medicina: {
    emoji:'🩺', color:'bg-red-100', text:'text-red-700',
    tagline:'La vocación más noble, la carrera más desafiante.',
    descripcion:'Medicina es mucho más que curar enfermedades: es comprender la vida humana en su totalidad, desde la célula hasta la sociedad. Esta materia te da una introducción rigurosa y apasionante a las ciencias médicas, preparándote con ventaja real para el ingreso a la carrera de medicina y para cualquier área de la salud.',
    beneficios:[
      'Ventaja significativa en el ingreso universitario a medicina',
      'Comprensión del cuerpo humano a nivel avanzado antes de la facultad',
      'Base sólida para enfermería, kinesiología, farmacia y odontología',
      'Perspectiva ética sobre la salud, la vida y la muerte',
      'Comprensión de las tecnologías médicas que definirán el futuro',
    ],
    contenido:[
      'Anatomía y fisiología humana avanzada',
      'Fisiopatología: cómo se producen las enfermedades',
      'Farmacología introductoria: medicamentos y su acción',
      'Salud pública y epidemiología básica',
      'Bioética médica: dilemas en la práctica clínica',
      'Tecnología médica: IA, robótica y medicina del futuro',
      'Primeros auxilios avanzados y emergencias',
      'Simulaciones clínicas: anamnesis y diagnóstico básico',
    ],
    diferenciadores:[
      '🏥 Acceso a simuladores médicos de alta fidelidad',
      '📋 Casos clínicos reales comentados por médicos',
      '👨‍⚕️ Mentoría directa con médicos en ejercicio',
      '🎓 Preparación específica para el ingreso a medicina',
      '🔬 Laboratorio virtual de anatomía y fisiología',
    ],
    carrerasRelacionadas:['Medicina','Enfermería','Kinesiología','Farmacia','Odontología','Biotecnología','Nutrición'],
    mercado:'⚡ Medicina es la carrera con mayor retorno de inversión en Argentina. Los médicos especializados tienen demanda garantizada. Esta materia te pone 2 años adelante de tus compañeros al ingresar a la facultad.',
  },
  ingenieria: {
    emoji:'⚙️', color:'bg-orange-100', text:'text-orange-700',
    tagline:'Construí el mundo que querés ver.',
    descripcion:'La ingeniería es la disciplina que convierte el conocimiento científico en soluciones reales que cambian el mundo. Puentes, smartphones, cohetes, hospitales — todo fue diseñado por ingenieros. Esta materia te introduce a la mentalidad y las herramientas del ingeniero moderno: robótica, electrónica, programación y diseño de sistemas.',
    beneficios:[
      'Una de las carreras mejor pagas y más demandadas del mercado',
      'Habilidades para resolver cualquier tipo de problema complejo',
      'Base sólida para todas las ramas de la ingeniería',
      'Pensamiento sistémico aplicable en cualquier contexto',
      'Experiencia real con hardware, software y proyectos concretos',
    ],
    contenido:[
      'Pensamiento de ingeniería y resolución de problemas',
      'Física aplicada: electricidad, mecánica y termodinámica',
      'Electrónica básica: circuitos y componentes',
      'Robótica y automatización: diseño y programación',
      'Diseño de sistemas: del problema a la solución',
      'Programación para ingenieros: Python y C++',
      'Ingeniería y sustentabilidad: soluciones para el planeta',
      'Proyecto final: diseño y construcción de un sistema real',
    ],
    diferenciadores:[
      '🤖 Kits de robótica Arduino y Raspberry Pi incluidos',
      '🏗️ Proyectos con hardware real desde el primer módulo',
      '👨‍🔧 Mentoría con ingenieros de empresas líderes de Argentina',
      '🏆 Preparación para olimpiadas nacionales de ciencia y tecnología',
      '🔧 Laboratorio virtual de simulación de circuitos y sistemas',
    ],
    carrerasRelacionadas:['Ingeniería Civil','Ingeniería en Sistemas','Ingeniería Electrónica','Mecatrónica','Ingeniería Industrial','Arquitectura'],
    mercado:'⚡ Los ingenieros son los profesionales con mayor demanda laboral en Argentina y el mundo. Se estima un déficit de 80.000 ingenieros en el país para 2030. El salario inicial supera el promedio nacional en un 150%.',
  },
  comunicacion: {
    emoji:'📣', color:'bg-yellow-100', text:'text-yellow-700',
    tagline:'En la era de la información, quien comunica bien tiene poder.',
    descripcion:'La comunicación estratégica es la habilidad transversal más valiosa del siglo XXI. No importa la carrera que elijas: si sabés comunicar, liderar narrativas y construir una marca personal, tenés una ventaja enorme. Esta materia te enseña desde la oratoria hasta el marketing digital, pasando por el storytelling y las relaciones públicas.',
    beneficios:[
      'Habilidades de comunicación avanzadas aplicables a cualquier carrera',
      'Construcción de una marca personal potente y auténtica',
      'Herramientas de marketing digital y gestión de redes sociales',
      'Capacidad de influir, persuadir y liderar con las palabras',
      'Dominio del storytelling para conectar emocionalmente',
    ],
    contenido:[
      'Fundamentos de comunicación estratégica',
      'Storytelling y narrativa transmedia',
      'Marca personal: construcción y gestión digital',
      'Marketing de contenidos y redes sociales',
      'Oratoria avanzada y hablar en público',
      'Relaciones públicas y manejo de crisis',
      'Comunicación no verbal y lenguaje corporal',
      'Proyecto: campaña de comunicación real propia',
    ],
    diferenciadores:[
      '🎙️ Creación de contenido real para plataformas actuales',
      '📱 Portfolio de comunicación con proyectos publicados',
      '🎯 Mentoría con comunicadores y periodistas profesionales',
      '📊 Acceso a herramientas de análisis y métricas digitales',
      '🤝 Red de contactos con el ecosistema de medios argentinos',
    ],
    carrerasRelacionadas:['Comunicación Social','Periodismo','Marketing','Publicidad','Relaciones Públicas','Política','Recursos Humanos'],
    mercado:'⚡ Los comunicadores estratégicos con habilidades digitales son el perfil más buscado por empresas de todos los rubros. El marketing digital y el content creation son las áreas con mayor crecimiento laboral de la última década.',
  },
  arquitectura: {
    emoji:'🏛️', color:'bg-stone-100', text:'text-stone-700',
    tagline:'Diseñá los espacios donde vive la humanidad.',
    descripcion:'Arquitectura y diseño industrial son las disciplinas que dan forma al mundo físico que habitamos. Desde la silla donde te sentás hasta la ciudad donde vivís, todo fue diseñado. Esta materia te introduce al pensamiento proyectual, las herramientas digitales de diseño y la comprensión de los materiales y espacios.',
    beneficios:[
      'Base sólida para arquitectura, diseño industrial y diseño de interiores',
      'Desarrollo de la visión espacial y la sensibilidad estética',
      'Dominio de herramientas de diseño asistido por computadora (CAD)',
      'Comprensión de materiales, estructuras y sustentabilidad',
      'Portfolio de proyectos que diferencia en el ingreso universitario',
    ],
    contenido:[
      'Fundamentos del diseño: forma, espacio y función',
      'Geometría descriptiva y representación técnica',
      'Historia de la arquitectura: de las pirámides al siglo XXI',
      'Diseño industrial: objetos que resuelven problemas',
      'CAD y modelado 3D: AutoCAD, SketchUp y Revit básico',
      'Materiales y sistemas constructivos',
      'Arquitectura sustentable y ciudades del futuro',
      'Proyecto final: diseño completo de un espacio real',
    ],
    diferenciadores:[
      '💻 Licencias de software CAD profesional incluidas',
      '🏛️ Visitas virtuales a obras icónicas del mundo',
      '👷 Mentoría con arquitectos y diseñadores industriales en ejercicio',
      '📐 Feedback profesional en cada entrega de proyecto',
      '🖨️ Acceso a modelado 3D e impresión virtual',
    ],
    carrerasRelacionadas:['Arquitectura','Diseño Industrial','Diseño de Interiores','Ingeniería Civil','Urbanismo','Diseño Gráfico'],
    mercado:'⚡ Los arquitectos que dominan el diseño digital, la sustentabilidad y la impresión 3D son los más buscados. El mercado inmobiliario y la construcción crecen sostenidamente en Argentina y el mundo.',
  },
  biotecnologia: {
    emoji:'🔬', color:'bg-green-100', text:'text-green-700',
    tagline:'Reprogramá la naturaleza para mejorar la vida humana.',
    descripcion:'Biotecnología y genética son las fronteras más emocionantes y disruptivas de la ciencia moderna. CRISPR que cura enfermedades genéticas, terapias que personalizan el tratamiento del cáncer, alimentos diseñados para el futuro — todo esto es biotecnología. Esta materia te pone en la vanguardia de la revolución científica más importante de nuestra era.',
    beneficios:[
      'Una de las carreras científicas más innovadoras e impactantes del mundo',
      'Comprensión de las tecnologías que definirán la medicina del siglo XXI',
      'Base sólida para medicina, farmacia, agronomía y bioquímica',
      'Perspectiva ética sobre la manipulación genética y sus límites',
      'Acceso a la industria con mayor inversión en I+D del mundo',
    ],
    contenido:[
      'Fundamentos de biotecnología: historia e impacto',
      'Ingeniería genética: modificación del ADN',
      'CRISPR-Cas9: la tijera molecular que cambia todo',
      'Bioinformática: datos al servicio de la biología',
      'Biotecnología aplicada: medicina, agricultura y ambiente',
      'Medicina personalizada y farmacogenómica',
      'Bioética: límites y responsabilidades de la ciencia',
      'Proyecto: diseño de una solución biotecnológica real',
    ],
    diferenciadores:[
      '🔬 Acceso a simuladores de laboratorio de alta fidelidad',
      '📋 Casos de aplicación real comentados por investigadores',
      '👨‍🔬 Mentoría con científicos de CONICET y universidades',
      '🏛️ Conexión con laboratorios universitarios argentinos',
      '📚 Acceso a papers científicos recientes comentados',
    ],
    carrerasRelacionadas:['Biotecnología','Medicina','Farmacia','Bioquímica','Agronomía','Ingeniería Genética'],
    mercado:'⚡ El mercado de la biotecnología crece al 15% anual. Es la industria con mayor inversión en investigación y desarrollo del mundo. Argentina tiene una tradición científica sólida en este campo.',
  },
  fisica_moderna: {
    emoji:'⚛️', color:'bg-indigo-100', text:'text-indigo-700',
    tagline:'La realidad es más extraña y fascinante de lo que imaginás.',
    descripcion:'La física moderna — cuántica, relatividad, astrofísica — es la aventura intelectual más grande que existe y la base de toda la tecnología avanzada que usamos hoy. Los chips de tu smartphone, los láser, los GPS, la resonancia magnética: todo se basa en física moderna. Esta materia te lleva a los límites del conocimiento humano.',
    beneficios:[
      'Comprensión de la física que impulsa toda la tecnología del futuro',
      'Base sólida para computación cuántica, energía y astrofísica',
      'Pensamiento matemático y abstracto de altísimo nivel',
      'Perspectiva única e irreemplazable sobre la naturaleza de la realidad',
      'Preparación para las carreras más desafiantes e innovadoras',
    ],
    contenido:[
      'Mecánica cuántica: el mundo de lo muy pequeño',
      'Relatividad especial y general: Einstein explicado',
      'Astrofísica y cosmología: origen y destino del universo',
      'Física de partículas: los ladrillos fundamentales de la realidad',
      'Computación cuántica: el futuro de la informática',
      'Energía del futuro: fusión nuclear y más',
      'El futuro de la física: horizontes abiertos',
      'Proyecto: investigación en un tema de física de vanguardia',
    ],
    diferenciadores:[
      '💻 Simuladores de mecánica cuántica interactivos',
      '🔭 Acceso a datos reales de telescopios espaciales',
      '👨‍🔬 Mentoría con físicos e investigadores del CONICET',
      '🏆 Preparación específica para olimpiadas de física',
      '📡 Conexión con proyectos de investigación universitaria',
    ],
    carrerasRelacionadas:['Física','Ingeniería','Astronomía','Computación Cuántica','Investigación Científica','Astrofísica'],
    mercado:'⚡ Los físicos trabajan en las industrias más innovadoras: fintech, inteligencia artificial, energía y exploración espacial. Son el perfil más versátil del mercado: un físico puede trabajar literalmente en cualquier industria.',
  },
};


export default function MateriaDetalle({ materia, tipo, onClose, onAgregar, seleccionada, anioActual }) {
  const info = tipo === 'premium'
    ? INFO_PREMIUM[materia?.id]
    : INFO_MATERIAS[materia?.nombre || materia];
console.log('PREMIUM CHECK:', tipo, materia?.id, !!INFO_PREMIUM[materia?.id]);
  if (!info) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center" onClick={e=>e.stopPropagation()}>
        <div className="text-4xl mb-3">📚</div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">{materia?.nombre || materia}</h2>
        <p className="text-sm text-gray-500 mb-4">Información detallada próximamente.</p>
        <button onClick={onClose} className="bg-purple-600 text-white px-6 py-2 rounded-xl text-sm font-semibold">Cerrar</button>
      </div>
    </div>
  );

  const nombreMateria = materia?.nombre || materia;
  const contenidoDelAnio = info.contenido_año?.[anioActual] || info.contenido || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div className={`${info.color} p-6 relative flex-shrink-0`}>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-60 rounded-full flex items-center justify-center text-gray-600 hover:bg-opacity-100 transition-all text-lg font-bold">
            ×
          </button>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{info.emoji}</div>
            <div className="flex-1 pr-8">
              <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${info.text} opacity-70`}>
                {tipo === 'premium' ? '⭐ Materia Premium' : tipo === 'base' ? '✓ Materia obligatoria' : '+ Materia optativa'}
              </div>
              <h2 className={`text-xl font-bold ${info.text} mb-1`}>{nombreMateria}</h2>
              <p className={`text-sm font-medium ${info.text} opacity-80 italic`}>"{info.tagline}"</p>
            </div>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto flex-1 p-6">

          {/* Descripción */}
          <p className="text-sm text-gray-600 leading-relaxed mb-5">{info.descripcion}</p>

          {/* Tutor */}
          {info.tutor && (
            <div className={`${info.color} rounded-xl p-3 mb-5 flex items-center gap-3`}>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                {info.emoji}
              </div>
              <div>
                <div className={`text-xs font-bold ${info.text}`}>Tu tutor: {info.tutor}</div>
                <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">{info.tutor_desc}</div>
              </div>
            </div>
          )}

          {/* Para qué sirve */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
              <span>✅</span> ¿Para qué te sirve?
            </h3>
            <div className="flex flex-col gap-1.5">
              {info.beneficios.map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`mt-0.5 flex-shrink-0 font-bold ${info.text}`}>→</span>
                  <span className="text-xs text-gray-600">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contenido del año */}
          {contenidoDelAnio.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
                <span>📋</span> Temas que vas a aprender {anioActual ? `en ${anioActual}° año` : ''}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {contenidoDelAnio.map((tema, i) => (
                  <span key={i} className={`text-xs px-2.5 py-1 rounded-full ${info.color} ${info.text} font-medium`}>
                    {tema}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Diferenciadores Premium */}
          {tipo === 'premium' && info.diferenciadores && (
            <div className="mb-5 bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h3 className="text-sm font-bold text-amber-800 mb-2">⭐ Experiencia exclusiva Premium</h3>
              <div className="flex flex-col gap-1.5">
                {info.diferenciadores.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-amber-500 flex-shrink-0 font-bold">✦</span>
                    <span className="text-xs text-amber-700">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mercado laboral / Curiosidad */}
          {(info.mercado || info.curiosidad) && (
            <div className="mb-5 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-700 mb-1">
                {info.mercado ? '📊 Mercado laboral' : '💡 ¿Sabías que...?'}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{info.mercado || info.curiosidad}</p>
            </div>
          )}

          {/* Carreras */}
          <div className="mb-2">
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
              <span>🎓</span> Carreras relacionadas
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {info.carrerasRelacionadas.map((c, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{c}</span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
            Cerrar
          </button>
          {onAgregar && tipo !== 'base' && (
            <button onClick={() => { onAgregar(); onClose(); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md
                ${seleccionada
                  ? 'bg-red-50 border-2 border-red-300 text-red-600 hover:bg-red-100'
                  : tipo === 'premium'
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
              {seleccionada
                ? '✕ Quitar de mi plan'
                : tipo === 'premium'
                  ? '⭐ Agregar a mi plan Premium'
                  : '+ Agregar a mi plan'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
