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
};

const INFO_PREMIUM = {
  ia_datos: {
    emoji:'🤖', color:'bg-violet-100', text:'text-violet-700',
    tagline:'La carrera del siglo XXI.',
    descripcion:'La Inteligencia Artificial y la Ciencia de Datos están redefiniendo todos los sectores. Aprendé a diseñar sistemas inteligentes, analizar grandes volúmenes de datos y tomar decisiones estratégicas.',
    beneficios:['Una de las habilidades mejor pagas del mercado global','Base para tecnología, salud, finanzas y más','Comprensión de cómo funciona la IA que usás','Herramientas para crear soluciones innovadoras'],
    contenido:['Fundamentos de IA y Machine Learning','Python para ciencia de datos','Visualización y análisis','Modelos predictivos','Ética en IA','Proyecto de IA aplicada'],
    diferenciadores:['Acceso a herramientas de IA reales','Proyectos con datasets actuales','Mentoría especializada','Certificación reconocida por empresas tech'],
    carrerasRelacionadas:['Data Science','Ingeniería en IA','Análisis de Negocio','Fintech'],
    mercado:'Los científicos de datos son los más demandados. En Argentina el salario promedio supera los $800.000/mes.',
  },
  derecho: {
    emoji:'⚖️', color:'bg-blue-100', text:'text-blue-700',
    tagline:'El pensamiento jurídico que transforma sociedades.',
    descripcion:'Una introducción profunda al derecho y el pensamiento jurídico. Aprendé a argumentar, interpretar y aplicar normas en situaciones complejas de la vida real.',
    beneficios:['Base sólida para estudiar abogacía','Herramientas para defender tus derechos','Pensamiento lógico-jurídico aplicable a todo','Comprensión del sistema legal cotidiano'],
    contenido:['Sistema jurídico argentino','Derecho constitucional','Derecho civil y contratos','Derecho penal básico','Derecho del consumidor','Derechos digitales','Proyecto jurídico real'],
    diferenciadores:['Análisis de casos reales argentinos','Simulaciones de juicios','Acceso a jurisprudencia comentada','Mentoría con profesionales del derecho'],
    carrerasRelacionadas:['Derecho','Notariado','Relaciones Laborales','Ciencias Políticas'],
    mercado:'Los abogados especializados en derecho digital son los más demandados en el mercado actual.',
  },
  contabilidad: {
    emoji:'📈', color:'bg-emerald-100', text:'text-emerald-700',
    tagline:'Quien entiende el dinero, entiende el poder.',
    descripcion:'Contabilidad, economía y finanzas personales: las herramientas para construir riqueza, gestionar negocios y tomar las mejores decisiones económicas.',
    beneficios:['Habilidades financieras para la vida','Base para negocios y emprendimiento','Comprensión del sistema financiero','Gestión independiente de tu dinero'],
    contenido:['Contabilidad básica','Economía personal','Inversiones para jóvenes','Gestión de un negocio','Impuestos','Finanzas digitales','Proyecto empresarial propio'],
    diferenciadores:['Casos reales de empresas argentinas','Simulador de inversiones','Proyecto con mentores','Herramientas contables profesionales'],
    carrerasRelacionadas:['Contabilidad','Administración','Economía','Finanzas','Emprendimiento'],
    mercado:'Los profesionales con habilidades financieras tienen 40% más de chances de fundar un negocio exitoso.',
  },
  psicologia_avanzada: {
    emoji:'🧠', color:'bg-pink-100', text:'text-pink-700',
    tagline:'Entendé lo que mueve a las personas.',
    descripcion:'Un viaje profundo por la psicología humana: cómo pensamos, sentimos, nos relacionamos y tomamos decisiones.',
    beneficios:['Comprensión del comportamiento humano','Herramientas para relaciones más sanas','Base para psicología y medicina','Autoconocimiento que transforma tu vida'],
    contenido:['Neurociencia y comportamiento','Psicología del desarrollo','Psicopatología básica','Psicología social','Terapias actuales','Psicología del trabajo','Investigación psicológica'],
    diferenciadores:['Casos clínicos reales anonimizados','Herramientas de autoconocimiento','Simulaciones de entrevistas','Mentoría con psicólogos en ejercicio'],
    carrerasRelacionadas:['Psicología','Medicina','Recursos Humanos','Educación','Coaching'],
    mercado:'La salud mental es la mayor demanda insatisfecha del siglo XXI. Los psicólogos son los más buscados.',
  },
  medicina: {
    emoji:'🩺', color:'bg-red-100', text:'text-red-700',
    tagline:'La ciencia más noble del mundo.',
    descripcion:'Una introducción rigurosa a las ciencias médicas: anatomía, fisiología, bioética y tecnologías médicas del futuro.',
    beneficios:['Ventaja significativa en el ingreso a medicina','Comprensión avanzada del cuerpo humano','Base para enfermería, kinesiología y farmacia','Perspectiva ética sobre la salud'],
    contenido:['Anatomía y fisiología avanzada','Fisiopatología básica','Farmacología intro','Salud pública','Bioética','Tecnología médica del futuro','Simulaciones clínicas'],
    diferenciadores:['Acceso a simuladores médicos','Casos clínicos comentados','Mentoría con médicos en ejercicio','Preparación para ingreso a medicina'],
    carrerasRelacionadas:['Medicina','Enfermería','Kinesiología','Farmacia','Biotecnología'],
    mercado:'Medicina es la carrera con mayor retorno de inversión en Argentina. Demanda garantizada.',
  },
  ingenieria: {
    emoji:'⚙️', color:'bg-orange-100', text:'text-orange-700',
    tagline:'Construí el mundo que querés ver.',
    descripcion:'La ingeniería convierte el conocimiento científico en soluciones reales. Robótica, electrónica, diseño de sistemas y resolución de problemas complejos.',
    beneficios:['Una de las carreras mejor pagas','Habilidades para resolver cualquier problema','Base para todas las ramas de ingeniería','Pensamiento sistémico universal'],
    contenido:['Pensamiento de ingeniería','Física aplicada','Electrónica básica','Robótica','Diseño de sistemas','Programación para ingenieros','Proyecto real'],
    diferenciadores:['Kits de robótica incluidos','Proyectos con hardware real','Mentoría con ingenieros líderes','Preparación para olimpiadas de ciencia'],
    carrerasRelacionadas:['Ingeniería Civil','Ingeniería en Sistemas','Electrónica','Mecatrónica'],
    mercado:'Los ingenieros son los más demandados en Argentina y el mundo. Escasean en todos los sectores.',
  },
  comunicacion: {
    emoji:'📣', color:'bg-yellow-100', text:'text-yellow-700',
    tagline:'Tu voz puede cambiar el mundo.',
    descripcion:'En la era de la información, quien sabe comunicar tiene poder. Estrategia, marca personal, storytelling y audiencias digitales.',
    beneficios:['Habilidades de comunicación avanzadas','Construcción de marca personal','Marketing digital y redes sociales','Capacidad de influir y liderar'],
    contenido:['Estrategia de comunicación','Storytelling','Marca personal digital','Marketing de contenidos','Oratoria avanzada','Relaciones públicas','Proyecto propio'],
    diferenciadores:['Creación de contenido real','Portfolio de comunicación','Mentoría con comunicadores profesionales','Análisis digital'],
    carrerasRelacionadas:['Comunicación','Periodismo','Marketing','Publicidad','Política'],
    mercado:'Los comunicadores estratégicos digitales son los perfiles más buscados por empresas de todos los rubros.',
  },
  arquitectura: {
    emoji:'🏛️', color:'bg-stone-100', text:'text-stone-700',
    tagline:'Diseñá los espacios donde vive la humanidad.',
    descripcion:'Arquitectura y diseño industrial son las disciplinas que dan forma al mundo físico. Aprendé a diseñar con propósito e impacto.',
    beneficios:['Base sólida para arquitectura y diseño','Desarrollo de visión espacial y estética','CAD y modelado 3D','Comprensión de materiales y estructuras'],
    contenido:['Fundamentos de diseño','Geometría descriptiva','Introducción a la arquitectura','Diseño industrial','CAD y modelado 3D','Materiales','Proyecto propio'],
    diferenciadores:['Software CAD incluido','Visitas virtuales a obras icónicas','Mentoría con arquitectos','Feedback profesional'],
    carrerasRelacionadas:['Arquitectura','Diseño Industrial','Diseño de Interiores','Ingeniería Civil'],
    mercado:'Los arquitectos que dominan el diseño digital y sustentabilidad son los más buscados hoy.',
  },
  biotecnologia: {
    emoji:'🔬', color:'bg-green-100', text:'text-green-700',
    tagline:'Reprogramá la naturaleza para mejorar la vida.',
    descripcion:'Biotecnología y genética son las fronteras más emocionantes de la ciencia. CRISPR, medicina personalizada y alimentos del futuro comienzan acá.',
    beneficios:['Una de las carreras más innovadoras','Comprensión de tecnologías del siglo XXI','Base para medicina y farmacia','Perspectiva ética sobre genética'],
    contenido:['Biotecnología aplicada','Ingeniería genética','CRISPR','Bioinformática básica','Bioética','Medicina personalizada','Proyecto biotecnológico'],
    diferenciadores:['Simuladores de laboratorio','Casos de aplicación real','Mentoría con investigadores','Conexión con laboratorios universitarios'],
    carrerasRelacionadas:['Biotecnología','Medicina','Farmacia','Bioquímica','Agronomía'],
    mercado:'El mercado de la biotecnología crece al 15% anual. Industria con mayor inversión en I+D.',
  },
  fisica_moderna: {
    emoji:'⚛️', color:'bg-indigo-100', text:'text-indigo-700',
    tagline:'La realidad es más extraña y fascinante de lo que imaginás.',
    descripcion:'Física cuántica, relatividad, astrofísica y los misterios del universo. La base de toda tecnología avanzada.',
    beneficios:['Comprensión de la física del futuro','Base para computación cuántica y energía','Pensamiento abstracto de alto nivel','Perspectiva única sobre la realidad'],
    contenido:['Mecánica cuántica básica','Relatividad','Astrofísica','Física de partículas','Computación cuántica intro','El futuro de la física','Proyecto de investigación'],
    diferenciadores:['Simuladores cuánticos','Datos de telescopios reales','Mentoría con físicos e investigadores','Preparación para olimpiadas'],
    carrerasRelacionadas:['Física','Ingeniería','Astronomía','Computación Cuántica','Investigación'],
    mercado:'Los físicos trabajan en las industrias más innovadoras: fintech, IA, energía y exploración espacial.',
  },
};

export default function MateriaDetalle({ materia, tipo, onClose, onAgregar, seleccionada, anioActual }) {
  const info = tipo === 'premium'
    ? INFO_PREMIUM[materia?.id]
    : INFO_MATERIAS[materia?.nombre || materia];

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