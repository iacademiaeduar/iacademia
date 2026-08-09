// Datos estáticos del flujo de inscripción — separado de Diagnostico.js para no
// seguir engordando ese archivo (era un god-component de 1116 líneas, ver CLAUDE.md).

export const PROVINCIAS = ['Buenos Aires','CABA','Catamarca','Chaco','Chubut','Córdoba','Corrientes',
  'Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén',
  'Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe',
  'Santiago del Estero','Tierra del Fuego','Tucumán'];

export const MATERIAS_BASE = {
  primaria: {
    1:['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional'],
    2:['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional'],
    3:['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés'],
    4:['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés'],
    5:['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés','Ciudadanía y Convivencia'],
    6:['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés','Ciudadanía y Convivencia'],
    7:['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés','Ciudadanía y Convivencia','Primeros Auxilios'],
  },
  secundaria: {
    1:['Matemática','Lengua y Literatura','Biología','Historia','Geografía','Inglés','Educación Física','Arte','Tecnología','Educación Emocional'],
    2:['Matemática','Lengua y Literatura','Biología','Historia','Geografía','Inglés','Educación Física','Arte','Tecnología','Educación Emocional','Ciudadanía y Derecho'],
    3:['Matemática Avanzada','Lengua y Literatura','Física','Química','Historia Contemporánea','Geografía Global','Inglés','Educación Emocional','Tecnología y Sociedad','Ciudadanía y Derecho'],
    4:['Matemática Avanzada','Lengua y Literatura','Física','Química','Biología Molecular','Historia Global','Geografía Geopolítica','Inglés','Educación Emocional','Filosofía'],
    5:['Matemática Avanzada','Lengua y Literatura','Ciencias Naturales Integradas','Ciencias Sociales','Inglés','Filosofía Política y Ética','Tecnología y Cultura Digital','Derecho y Ciudadanía Global'],
    6:['Lengua, Comunicación y Cultura Global','Matemática Avanzada','Ciencias Naturales Aplicadas','Ciudadanía, Derecho y Ética','Economía del Mundo Actual','Proyecto Final Integrador'],
  }
};

export const OPTATIVAS = [
  {id:'robotica',nombre:'Robótica',emoji:'🤖',cat:'Tecnología',yr:1},
  {id:'programacion',nombre:'Programación',emoji:'⌨️',cat:'Tecnología',yr:1},
  {id:'ajedrez',nombre:'Ajedrez y Pensamiento Estratégico',emoji:'♟️',cat:'Estrategia',yr:1},
  {id:'musica',nombre:'Música y Producción Sonora',emoji:'🎵',cat:'Arte',yr:1},
  {id:'teatro',nombre:'Teatro y Expresión',emoji:'🎭',cat:'Arte',yr:1},
  {id:'cine',nombre:'Cine y Análisis Audiovisual',emoji:'🎬',cat:'Arte',yr:2},
  {id:'arte_digital',nombre:'Arte Digital y Animación',emoji:'🎨',cat:'Arte',yr:2},
  {id:'escritura',nombre:'Escritura Creativa',emoji:'✍️',cat:'Humanidades',yr:1},
  {id:'filosofia',nombre:'Filosofía del Futuro',emoji:'🤔',cat:'Humanidades',yr:3},
  {id:'psicologia',nombre:'Psicología Aplicada',emoji:'🧠',cat:'Humanidades',yr:3},
  {id:'astronomia',nombre:'Astronomía',emoji:'🔭',cat:'Ciencia',yr:2},
  {id:'neurociencia',nombre:'Neurociencia para la Vida',emoji:'🧬',cat:'Ciencia',yr:4},
  {id:'ecologia',nombre:'Ecología y Cambio Climático',emoji:'🌱',cat:'Ciencia',yr:1},
  {id:'finanzas',nombre:'Educación Financiera',emoji:'💰',cat:'Economía',yr:2},
  {id:'emprendimiento',nombre:'Emprendimiento Juvenil',emoji:'🚀',cat:'Economía',yr:3},
  {id:'videojuegos',nombre:'Diseño de Videojuegos',emoji:'🎮',cat:'Tecnología',yr:3},
  {id:'ciencia_datos',nombre:'Ciencia de Datos',emoji:'📊',cat:'Tecnología',yr:4},
  {id:'movimiento',nombre:'Movimiento Consciente y Salud',emoji:'🧘',cat:'Bienestar',yr:1},
  {id:'frances',nombre:'Francés',emoji:'🇫🇷',cat:'Idiomas',yr:1},
  {id:'portugues',nombre:'Portugués',emoji:'🇧🇷',cat:'Idiomas',yr:1},
  {id:'aleman',nombre:'Alemán',emoji:'🇩🇪',cat:'Idiomas',yr:2},
  {id:'japones',nombre:'Japonés',emoji:'🇯🇵',cat:'Idiomas',yr:2},
  {id:'mandarin',nombre:'Chino Mandarín',emoji:'🇨🇳',cat:'Idiomas',yr:2},
];

export const PREMIUM_LIST = [
  {id:'ia_datos',nombre:'IA, Ciencia de Datos y Decisiones Estratégicas',emoji:'🤖'},
  {id:'derecho',nombre:'Introducción al Derecho y Pensamiento Jurídico',emoji:'⚖️'},
  {id:'contabilidad',nombre:'Contabilidad, Economía y Finanzas Personales',emoji:'📈'},
  {id:'psicologia_avanzada',nombre:'Psicología Aplicada al Comportamiento Humano',emoji:'🧠'},
  {id:'medicina',nombre:'Ciencias Médicas, Ética y Salud Pública',emoji:'🩺'},
  {id:'ingenieria',nombre:'Ingeniería, Robótica y Resolución de Problemas',emoji:'⚙️'},
  {id:'comunicacion',nombre:'Comunicación Estratégica y Marca Personal',emoji:'📣'},
  {id:'arquitectura',nombre:'Arquitectura, Diseño Industrial y Espacios del Futuro',emoji:'🏛️'},
  {id:'biotecnologia',nombre:'Biotecnología, Genética y Medicina Personalizada',emoji:'🔬'},
  {id:'fisica_moderna',nombre:'Física Moderna, Cuántica y Astrofísica Aplicada',emoji:'⚛️'},
];

export const COLORES_TEST = [
  {fondo:'#E8F5E9',circulo:'#2E7D32',preg:'¿Qué color ves en el círculo?',ops:['Verde','Rojo','Gris','No distingo'],ok:0},
  {fondo:'#FFEBEE',circulo:'#C62828',preg:'¿Qué color predomina en el fondo?',ops:['Verde','Rojo','Azul','No distingo'],ok:1},
  {fondo:'#E3F2FD',circulo:'#1565C0',preg:'¿Qué color ves en el círculo?',ops:['Azul','Verde','Gris','No distingo'],ok:0},
];

export const LOGICA_POOL = [
  {p:'¿Cuál número sigue? 2, 4, 6, 8, ___',ops:['9','10','11','12'],ok:1},
  {p:'3 cajas con 4 pelotas cada una. ¿Total?',ops:['7','12','9','16'],ok:1},
  {p:'¿Cuál NO pertenece? Perro, Gato, Mesa, Pájaro',ops:['Perro','Gato','Mesa','Pájaro'],ok:2},
  {p:'Hoy es martes. ¿Qué día será en 3 días?',ops:['Jueves','Viernes','Miércoles','Sábado'],ok:1},
  {p:'Ana > Juan > Pedro en dinero. ¿Quién tiene menos?',ops:['Ana','Juan','Pedro','Todos igual'],ok:2},
  {p:'△ ○ △ ○ △ ___ ¿Qué sigue?',ops:['△','○','□','◇'],ok:1},
  {p:'Libro $500. Pago $1000. ¿Vuelto?',ops:['$400','$500','$600','$1500'],ok:1},
  {p:'¿Cuál es el mayor? 0.5 · 1/2 · 0.49 · 0.51',ops:['0.5','1/2','0.49','0.51'],ok:3},
];

// "modalidad" se agregó después de "aviso_legal": decide si el resto del flujo
// pide materias_base+optativas+premium (completo) o solo un puñado de materias
// puntuales (apoyo_escolar). Ver Diagnostico.js.
export const PASOS = [
  'inicio','aviso_legal','modalidad',
  'datos_alumno','datos_tutor',
  'materias','checkout',
  'pago',
  'aviso_diagnostico','estilo','lectura','atencion','colores','logica','comprension',
  'bienvenida'
];

export const shuffle = arr => [...arr].sort(()=>Math.random()-0.5);
export const fmt = n => new Intl.NumberFormat('es-AR').format(n);
