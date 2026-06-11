import React, { useState } from 'react';

// ── DATOS BASE ───────────────────────────────────────────────────────────────
const PROVINCIAS = [
  'Buenos Aires','CABA','Catamarca','Chaco','Chubut','Córdoba','Corrientes',
  'Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones',
  'Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe',
  'Santiago del Estero','Tierra del Fuego','Tucumán'
];

// Materias base por nivel y año (del PDF)
const MATERIAS_BASE = {
  primaria: {
    1: ['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional'],
    2: ['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional'],
    3: ['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés'],
    4: ['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés'],
    5: ['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés','Ciudadanía y Convivencia'],
    6: ['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés','Ciudadanía y Convivencia'],
    7: ['Lengua y Literatura','Matemática','Ciencias Naturales','Ciencias Sociales','Educación Física','Arte','Tecnología','Educación Emocional','Inglés','Ciudadanía y Convivencia','Primeros Auxilios'],
  },
  secundaria: {
    1: ['Matemática','Lengua y Literatura','Biología','Historia','Geografía','Inglés','Educación Física','Arte','Tecnología','Educación Emocional'],
    2: ['Matemática','Lengua y Literatura','Biología','Historia','Geografía','Inglés','Educación Física','Arte','Tecnología','Educación Emocional','Ciudadanía y Derecho'],
    3: ['Matemática Avanzada','Lengua y Literatura','Física','Química','Historia Contemporánea','Geografía Global','Inglés','Educación Emocional','Tecnología y Sociedad','Ciudadanía y Derecho'],
    4: ['Matemática Avanzada','Lengua y Literatura','Física','Química','Biología Molecular','Historia Global','Geografía Geopolítica','Inglés','Educación Emocional','Filosofía'],
    5: ['Matemática Avanzada','Lengua y Literatura','Ciencias Naturales Integradas','Ciencias Sociales','Inglés','Filosofía Política y Ética','Tecnología y Cultura Digital','Derecho y Ciudadanía Global'],
    6: ['Lengua, Comunicación y Cultura Global','Matemática Avanzada','Ciencias Naturales Aplicadas','Ciudadanía, Derecho y Ética','Economía del Mundo Actual','Proyecto Final Integrador'],
  }
};

const OPTATIVAS = [
  {id:'robotica', nombre:'Robótica', emoji:'🤖', cat:'Tecnología'},
  {id:'programacion', nombre:'Programación', emoji:'⌨️', cat:'Tecnología'},
  {id:'ajedrez', nombre:'Ajedrez y Pensamiento Estratégico', emoji:'♟️', cat:'Estrategia'},
  {id:'musica', nombre:'Música y Producción Sonora', emoji:'🎵', cat:'Arte'},
  {id:'teatro', nombre:'Teatro y Expresión', emoji:'🎭', cat:'Arte'},
  {id:'cine', nombre:'Cine y Análisis Audiovisual', emoji:'🎬', cat:'Arte'},
  {id:'arte_digital', nombre:'Arte Digital y Animación', emoji:'🎨', cat:'Arte'},
  {id:'escritura', nombre:'Escritura Creativa', emoji:'✍️', cat:'Humanidades'},
  {id:'filosofia', nombre:'Filosofía del Futuro', emoji:'🤔', cat:'Humanidades'},
  {id:'psicologia', nombre:'Psicología Aplicada', emoji:'🧠', cat:'Humanidades'},
  {id:'astronomia', nombre:'Astronomía', emoji:'🔭', cat:'Ciencia'},
  {id:'neurociencia', nombre:'Neurociencia para la Vida', emoji:'🧬', cat:'Ciencia'},
  {id:'ecologia', nombre:'Ecología y Cambio Climático', emoji:'🌱', cat:'Ciencia'},
  {id:'finanzas', nombre:'Educación Financiera', emoji:'💰', cat:'Economía'},
  {id:'emprendimiento', nombre:'Emprendimiento Juvenil', emoji:'🚀', cat:'Economía'},
  {id:'videojuegos', nombre:'Diseño de Videojuegos', emoji:'🎮', cat:'Tecnología'},
  {id:'storytelling', nombre:'Storytelling y Narrativa Transmedia', emoji:'📱', cat:'Arte'},
  {id:'ciencia_datos', nombre:'Ciencia de Datos para Jóvenes', emoji:'📊', cat:'Tecnología'},
  {id:'movimiento', nombre:'Movimiento Consciente y Salud', emoji:'🧘', cat:'Bienestar'},
  {id:'frances', nombre:'Francés', emoji:'🇫🇷', cat:'Idiomas'},
  {id:'portugues', nombre:'Portugués', emoji:'🇧🇷', cat:'Idiomas'},
  {id:'aleman', nombre:'Alemán', emoji:'🇩🇪', cat:'Idiomas'},
  {id:'japones', nombre:'Japonés', emoji:'🇯🇵', cat:'Idiomas'},
  {id:'italiano', nombre:'Italiano', emoji:'🇮🇹', cat:'Idiomas'},
  {id:'mandarin', nombre:'Chino Mandarín', emoji:'🇨🇳', cat:'Idiomas'},
];

const PREMIUM = [
  {id:'ia_datos', nombre:'IA, Ciencia de Datos y Decisiones Estratégicas', emoji:'🤖'},
  {id:'derecho', nombre:'Introducción al Derecho y Pensamiento Jurídico', emoji:'⚖️'},
  {id:'contabilidad', nombre:'Contabilidad, Economía y Finanzas Personales', emoji:'📈'},
  {id:'psicologia_avanzada', nombre:'Psicología Aplicada al Comportamiento Humano', emoji:'🧠'},
  {id:'medicina', nombre:'Ciencias Médicas, Ética y Salud Pública', emoji:'🩺'},
  {id:'ingenieria', nombre:'Ingeniería, Robótica y Resolución de Problemas', emoji:'⚙️'},
  {id:'comunicacion', nombre:'Comunicación Estratégica y Marca Personal', emoji:'📣'},
  {id:'arquitectura', nombre:'Arquitectura, Diseño Industrial y Espacios del Futuro', emoji:'🏛️'},
  {id:'biotecnologia', nombre:'Biotecnología, Genética y Medicina Personalizada', emoji:'🔬'},
  {id:'fisica_moderna', nombre:'Física Moderna, Cuántica y Astrofísica Aplicada', emoji:'⚛️'},
];

const COLORES_TEST = [
  {fondo:'#E8F5E9', circulo:'#2E7D32', preg:'¿Qué color ves en el círculo?', ops:['Verde','Rojo','Gris','No distingo'], ok:0},
  {fondo:'#FFEBEE', circulo:'#C62828', preg:'¿Qué color predomina en el fondo?', ops:['Verde','Rojo','Azul','No distingo'], ok:1},
  {fondo:'#E3F2FD', circulo:'#1565C0', preg:'¿Qué color ves en el círculo?', ops:['Azul','Verde','Gris','No distingo'], ok:0},
];

const LOGICA_POOL = [
  {p:'¿Cuál número sigue? 2, 4, 6, 8, ___', ops:['9','10','11','12'], ok:1},
  {p:'3 cajas con 4 pelotas cada una. ¿Total?', ops:['7','12','9','16'], ok:1},
  {p:'¿Cuál NO pertenece? Perro, Gato, Mesa, Pájaro', ops:['Perro','Gato','Mesa','Pájaro'], ok:2},
  {p:'Hoy es martes. ¿Qué día será en 3 días?', ops:['Jueves','Viernes','Miércoles','Sábado'], ok:1},
  {p:'Ana > Juan > Pedro en dinero. ¿Quién tiene menos?', ops:['Ana','Juan','Pedro','Todos igual'], ok:2},
  {p:'△ ○ △ ○ △ ___ ¿Qué sigue?', ops:['△','○','□','◇'], ok:1},
  {p:'Libro $500. Pago $1000. ¿Vuelto?', ops:['$400','$500','$600','$1500'], ok:1},
  {p:'¿Cuál es el mayor? 0.5 · 1/2 · 0.49 · 0.51', ops:['0.5','1/2','0.49','0.51'], ok:3},
];

const PASOS = [
  'inicio','aviso_legal','datos_alumno','datos_tutor',
  'materias',
  'pago',
  'aviso_diagnostico','estilo','lectura','atencion','colores','logica','comprension',
  'bienvenida'
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// ── COMPONENTES UI ───────────────────────────────────────────────────────────
const Barra = ({paso}) => (
  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
    <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
      style={{width: Math.round((paso/(PASOS.length-1))*100)+'%'}} />
  </div>
);

const Btn = ({onClick, children, outline, disabled}) => (
  <button onClick={onClick} disabled={disabled}
    className={`w-full py-3 rounded-xl font-semibold transition-all text-sm ${
      disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
      : outline ? 'border-2 border-purple-400 text-purple-700 hover:bg-purple-50'
      : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'}`}>
    {children}
  </button>
);

const Inp = ({label, placeholder, value, onChange, type='text', required}) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 mb-1 block">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400 bg-white transition-colors" />
  </div>
);

const Sel = ({label, value, onChange, children, required}) => (
  <div>
    {label && <label className="text-xs font-semibold text-gray-500 mb-1 block">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>}
    <select value={value} onChange={onChange}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400 bg-white">
      {children}
    </select>
  </div>
);

const Check = ({label, checked, onClick, sub}) => (
  <button onClick={onClick}
    className={`flex items-start gap-3 p-3 border rounded-xl text-left w-full transition-all
      ${checked ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
      ${checked ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}>
      {checked && <span className="text-white text-xs font-bold">✓</span>}
    </div>
    <div>
      <div className={`text-sm ${checked ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  </button>
);

// ── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function Diagnostico({onComplete}) {
  const [paso, setPaso] = useState(0);
  const [quienCompleta, setQuienCompleta] = useState(null);
  const [logicaPregs] = useState(shuffle(LOGICA_POOL).slice(0,4));
  const [logicaIdx, setLogicaIdx] = useState(0);
  const [logicaAciertos, setLogicaAciertos] = useState(0);
  const [logicaResp, setLogicaResp] = useState(null);
  const [colorIdx, setColorIdx] = useState(0);
  const [colorErrores, setColorErrores] = useState(0);
  const [lecturaSel, setLecturaSel] = useState([]);
  const [atencionSel, setAtencionSel] = useState([]);
  const [metodoPago, setMetodoPago] = useState(null);
  const [optativasSel, setOptativasSel] = useState([]);
  const [premiumSel, setPremiumSel] = useState([]);

  const [alumno, setAlumno] = useState({
    nombre:'', fecha_nacimiento:'', localidad:'', provincia:'',
    escuela:'', escuela_tipo:'actual', turno:'',
    nivel:'secundaria', anio_escolar:null, anio_inscripcion:null,
    situacion_academica:'en_curso', materias_adeuda:'',
  });

  const [tutor, setTutor] = useState({
    nombre:'', relacion:'', email:'', telefono:'', frecuencia:'semanal',
  });

  const [diag, setDiag] = useState({
    estilo:null, dislexia:false, tdah:false, daltonismo:false,
    comprension:false, puntaje_logica:0,
  });

  const av = () => setPaso(p => p+1);
  const volver = () => setPaso(p => p-1);

  const calcEdad = fnac => {
    if (!fnac) return null;
    const hoy = new Date(); const nac = new Date(fnac);
    let e = hoy.getFullYear()-nac.getFullYear();
    if (hoy.getMonth()-nac.getMonth() < 0 ||
       (hoy.getMonth()===nac.getMonth() && hoy.getDate()<nac.getDate())) e--;
    return e;
  };

  const toggleLectura = i => {
    if (i===5){setLecturaSel([]); return;}
    setLecturaSel(p => p.includes(i) ? p.filter(x=>x!==i) : [...p.filter(x=>x!==5),i]);
  };
  const toggleAtencion = i => {
    if (i===5){setAtencionSel([]); return;}
    setAtencionSel(p => p.includes(i) ? p.filter(x=>x!==i) : [...p.filter(x=>x!==5),i]);
  };
  const toggleOpt = id => setOptativasSel(p => p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const togglePrem = id => setPremiumSel(p => p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  const calcAdaptaciones = () => {
    const a=[];
    if(diag.dislexia) a.push('fuente grande','audio texto','espaciado extra');
    if(diag.tdah) a.push('sesiones cortas','más pausas','gamificación extra');
    if(diag.daltonismo) a.push('alto contraste');
    if(diag.comprension) a.push('explicaciones simples','más ejemplos');
    return a;
  };

  const pantalla = PASOS[paso];
  const edad = calcEdad(alumno.fecha_nacimiento);
  const esMenor16 = edad!==null && edad<16;
  const grades = alumno.nivel==='primaria'
    ? ['1°','2°','3°','4°','5°','6°','7°']
    : ['1°','2°','3°','4°','5°','6°'];
  const materiasBase = alumno.anio_escolar && alumno.nivel
    ? (MATERIAS_BASE[alumno.nivel]?.[alumno.anio_escolar] || [])
    : [];

  const wrap = children => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      {children}
    </div>
  );

  const card = (children, wide) => (
    <div className={`bg-white rounded-2xl border border-gray-100 p-7 w-full ${wide?'max-w-2xl':'max-w-lg'} shadow-xl`}>
      {children}
    </div>
  );

  // INICIO
  if (pantalla==='inicio') return wrap(card(
    <>
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🎓</div>
        <h1 className="text-2xl font-bold text-purple-700 mb-1">Inscripción a iAcademia</h1>
        <p className="text-sm text-gray-400">Plataforma educativa personalizada con Inteligencia Artificial</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-xs text-amber-800 leading-relaxed">
        <div className="font-bold mb-1">⚠️ Información importante sobre la inscripción</div>
        <p>Si el alumno tiene <strong>menos de 16 años</strong>, necesita la presencia o autorización de un adulto responsable. Si tiene <strong>16 años o más</strong>, puede completar la inscripción de forma autónoma. En todos los casos, solicitamos los datos del adulto responsable para el seguimiento académico.</p>
      </div>

      <p className="text-sm font-semibold text-gray-700 mb-3">¿Quién está realizando esta inscripción?</p>
      <div className="flex flex-col gap-3 mb-6">
        {[
          {id:'alumno', emoji:'🧑‍🎓', titulo:'El alumno/a', desc:'Soy el estudiante que desea inscribirse'},
          {id:'tutor', emoji:'👨‍👩‍👧', titulo:'El padre, madre o tutor/a', desc:'Estoy inscribiendo a mi hijo/a o tutelado/a'},
        ].map(op=>(
          <button key={op.id} onClick={()=>setQuienCompleta(op.id)}
            className={`flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all
              ${quienCompleta===op.id?'border-purple-500 bg-purple-50 shadow-md':'border-gray-100 hover:border-gray-200'}`}>
            <span className="text-3xl">{op.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">{op.titulo}</div>
              <div className="text-xs text-gray-400 mt-0.5">{op.desc}</div>
            </div>
            {quienCompleta===op.id && <span className="text-purple-500 text-xl font-bold">✓</span>}
          </button>
        ))}
      </div>
      <Btn onClick={()=>{if(!quienCompleta){alert('Seleccioná quién completa el formulario');return;} av();}}>
        Comenzar inscripción →
      </Btn>
      <p className="text-xs text-gray-400 text-center mt-3">⏱ El proceso completo tarda aproximadamente 10-15 minutos</p>
    </>
  ));

  // AVISO LEGAL
  if (pantalla==='aviso_legal') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-3">📋</div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Cómo funciona el proceso</h2>
      <div className="flex flex-col gap-3 mb-6">
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="font-semibold text-purple-700 text-sm mb-2">📌 El proceso tiene dos etapas:</div>
          <div className="flex flex-col gap-2 text-xs text-gray-600">
            <div className="flex gap-2">
              <span className="text-purple-500 font-bold flex-shrink-0">1.</span>
              <span><strong>Datos personales, selección de materias y pago</strong> — podés volver atrás en cualquier momento hasta completar el pago.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-purple-500 font-bold flex-shrink-0">2.</span>
              <span><strong>Evaluación diagnóstica del alumno</strong> — se realiza luego del pago. Una vez iniciada no se puede volver atrás. Personaliza toda la experiencia educativa.</span>
            </div>
          </div>
        </div>
        <div className={`rounded-xl p-4 text-xs leading-relaxed ${quienCompleta==='alumno'?'bg-blue-50 text-blue-800':'bg-emerald-50 text-emerald-800'}`}>
          {quienCompleta==='alumno'
            ? <><div className="font-bold mb-1">🧑‍🎓 Completando como alumno</div>Si tenés menos de 16 años, asegurate de tener a tu padre, madre o tutor presente o disponible para validar la inscripción. Igualmente solicitaremos sus datos para el seguimiento y reportes de progreso.</>
            : <><div className="font-bold mb-1">👨‍👩‍👧 Completando como responsable</div>Completarás los datos del alumno y luego los tuyos. Recibirás reportes automáticos de progreso según la frecuencia que elijas.</>}
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 border border-gray-100">
          <div className="font-semibold text-gray-700 mb-1">🔒 Privacidad y confidencialidad</div>
          Todos los datos son estrictamente confidenciales y se utilizan exclusivamente para personalizar la experiencia educativa y comunicar avances al adulto responsable. iAcademia no comparte información con terceros.
        </div>
      </div>
      <div className="flex gap-3">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={av}>Entendido, continuar →</Btn>
      </div>
    </>
  ));

  // DATOS ALUMNO
  if (pantalla==='datos_alumno') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-2">👤</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Datos del alumno/a</h2>
      <p className="text-xs text-gray-400 mb-5">
        {quienCompleta==='tutor'?'Completá los datos del estudiante que vas a inscribir.':'Completá tus datos personales.'}
      </p>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Nombre completo" placeholder="Nombre y apellido" required value={alumno.nombre}
            onChange={e=>setAlumno(p=>({...p,nombre:e.target.value}))} />
          <Inp label="Fecha de nacimiento" type="date" required value={alumno.fecha_nacimiento}
            onChange={e=>setAlumno(p=>({...p,fecha_nacimiento:e.target.value}))} />
        </div>

        {edad!==null && (
          <div className={`text-xs px-3 py-2 rounded-lg font-medium ${esMenor16?'bg-emerald-50 text-emerald-700':'bg-amber-50 text-amber-700'}`}>
            {esMenor16
              ? `✓ ${edad} años — menor de 16. Igualmente requerimos los datos del adulto responsable.`
              : `⚠️ ${edad} años — se requerirá confirmación del adulto responsable por correo electrónico.`}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Inp label="Localidad" required placeholder="Ej: Córdoba" value={alumno.localidad}
            onChange={e=>setAlumno(p=>({...p,localidad:e.target.value}))} />
          <Sel label="Provincia" required value={alumno.provincia}
            onChange={e=>setAlumno(p=>({...p,provincia:e.target.value}))}>
            <option value="">Seleccioná...</option>
            {PROVINCIAS.map(pr=><option key={pr}>{pr}</option>)}
          </Sel>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Inp label="Escuela" placeholder="Nombre de la escuela" value={alumno.escuela}
            onChange={e=>setAlumno(p=>({...p,escuela:e.target.value}))} />
          <Sel label="¿Actual o anterior?" value={alumno.escuela_tipo}
            onChange={e=>setAlumno(p=>({...p,escuela_tipo:e.target.value}))}>
            <option value="actual">Escuela actual</option>
            <option value="anterior">Escuela anterior</option>
            <option value="ninguna">No asiste actualmente</option>
          </Sel>
        </div>

        <Sel label="Turno" value={alumno.turno}
          onChange={e=>setAlumno(p=>({...p,turno:e.target.value}))}>
          <option value="">Seleccioná...</option>
          <option value="manana">Mañana</option>
          <option value="tarde">Tarde</option>
          <option value="noche">Noche</option>
          <option value="no_asiste">No asiste</option>
        </Sel>

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Nivel educativo <span className="text-red-400">*</span></label>
          <div className="grid grid-cols-2 gap-2">
            {[{id:'primaria',label:'🏫 Primaria'},{id:'secundaria',label:'🎓 Secundaria'}].map(n=>(
              <button key={n.id} onClick={()=>setAlumno(p=>({...p,nivel:n.id,anio_escolar:null}))}
                className={`p-3 border rounded-xl text-sm font-semibold transition-all ${alumno.nivel===n.id?'border-purple-500 bg-purple-50 text-purple-700':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {n.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Año cursado, en curso o a inscribir <span className="text-red-400">*</span></label>
          <div className="grid grid-cols-4 gap-2">
            {grades.map((g,i)=>(
              <button key={i} onClick={()=>setAlumno(p=>({...p,anio_escolar:i+1}))}
                className={`p-2 border rounded-lg text-sm font-semibold transition-all ${alumno.anio_escolar===i+1?'border-purple-500 bg-purple-50 text-purple-700':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <Sel label="Situación académica" value={alumno.situacion_academica}
          onChange={e=>setAlumno(p=>({...p,situacion_academica:e.target.value}))}>
          <option value="en_curso">Cursando actualmente</option>
          <option value="repitente">Repitente</option>
          <option value="con_previas">Con materias previas</option>
          <option value="abandono">Abandonó y quiere retomar</option>
          <option value="nunca_inicio">Nunca inició</option>
        </Sel>

        {(alumno.situacion_academica==='con_previas'||alumno.situacion_academica==='repitente') && (
          <Inp label="¿Qué materias adeuda o necesita reforzar?"
            placeholder="Ej: Matemática, Historia..."
            value={alumno.materias_adeuda}
            onChange={e=>setAlumno(p=>({...p,materias_adeuda:e.target.value}))} />
        )}
      </div>

      <div className="flex gap-3 mt-5">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={()=>{
          if(!alumno.nombre||!alumno.fecha_nacimiento||!alumno.localidad||!alumno.anio_escolar){
            alert('Completá los campos obligatorios (*)'); return;
          } av();
        }}>Continuar →</Btn>
      </div>
    </>
  ));

  // DATOS TUTOR
  if (pantalla==='datos_tutor') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-2">👨‍👩‍👧</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Adulto responsable</h2>
      <p className="text-xs text-gray-400 mb-4">
        {quienCompleta==='tutor'?'Completá tus datos como responsable del alumno.':'Completá los datos de tu padre, madre o tutor/a.'}
      </p>
      {!esMenor16 && edad!==null && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-xs text-amber-800">
          ⚠️ El alumno tiene {edad} años. Se enviará un correo al responsable para confirmar la inscripción.
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Nombre completo" required placeholder="Nombre del responsable" value={tutor.nombre}
            onChange={e=>setTutor(p=>({...p,nombre:e.target.value}))} />
          <Sel label="Relación con el alumno" required value={tutor.relacion}
            onChange={e=>setTutor(p=>({...p,relacion:e.target.value}))}>
            <option value="">Seleccioná...</option>
            <option value="padre">Padre</option>
            <option value="madre">Madre</option>
            <option value="abuelo">Abuelo/a</option>
            <option value="hermano">Hermano/a mayor</option>
            <option value="tutor_legal">Tutor/a legal</option>
            <option value="otro">Otro</option>
          </Sel>
        </div>
        <Inp label="Email del responsable" type="email" required placeholder="email@ejemplo.com" value={tutor.email}
          onChange={e=>setTutor(p=>({...p,email:e.target.value}))} />
        <Inp label="Teléfono de contacto" type="tel" placeholder="Ej: 351-1234567" value={tutor.telefono}
          onChange={e=>setTutor(p=>({...p,telefono:e.target.value}))} />
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Frecuencia de reportes de progreso</label>
          <div className="grid grid-cols-3 gap-2">
            {[{id:'diario',l:'📅 Diario'},{id:'semanal',l:'📆 Semanal'},{id:'mensual',l:'🗓️ Mensual'}].map(f=>(
              <button key={f.id} onClick={()=>setTutor(p=>({...p,frecuencia:f.id}))}
                className={`p-2.5 border rounded-xl text-xs font-semibold transition-all ${tutor.frecuencia===f.id?'border-purple-500 bg-purple-50 text-purple-700':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {f.l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={()=>{
          if(!tutor.nombre||!tutor.relacion||!tutor.email){alert('Completá los campos obligatorios (*)');return;} av();
        }}>Continuar →</Btn>
      </div>
    </>
  ));

  // MATERIAS
  if (pantalla==='materias') return wrap(
    <div className="bg-white rounded-2xl border border-gray-100 p-7 w-full max-w-3xl shadow-xl">
      <Barra paso={paso} />
      <div className="text-3xl mb-2">📚</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Selección de materias</h2>
      <p className="text-xs text-gray-400 mb-5">Las materias base son obligatorias según tu año. Podés sumar optativas y premium según tu interés.</p>

      {/* BASE */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">✓ Obligatorias</span>
          <span className="text-sm font-bold text-gray-700">Materias base — {alumno.nivel==='primaria'?'Primaria':'Secundaria'} {alumno.anio_escolar}° año</span>
        </div>
        {materiasBase.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {materiasBase.map(m=>(
              <div key={m} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                <span className="text-emerald-500 text-xs">✓</span>
                <span className="text-xs font-medium text-emerald-700">{m}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3">Seleccioná el nivel y año del alumno para ver las materias base.</div>
        )}
      </div>

      {/* OPTATIVAS */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Elegí libremente</span>
          <span className="text-sm font-bold text-gray-700">Materias optativas</span>
          <span className="text-xs text-gray-400 ml-auto">{optativasSel.length} seleccionadas</span>
        </div>
        {['Tecnología','Arte','Humanidades','Ciencia','Economía','Bienestar','Idiomas','Estrategia'].map(cat=>{
          const items = OPTATIVAS.filter(o=>o.cat===cat);
          if(!items.length) return null;
          return (
            <div key={cat} className="mb-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{cat}</div>
              <div className="grid grid-cols-3 gap-1.5">
                {items.map(m=>{
                  const sel=optativasSel.includes(m.id);
                  return (
                    <button key={m.id} onClick={()=>toggleOpt(m.id)}
                      className={`flex items-center gap-2 border rounded-xl px-2.5 py-2 text-left transition-all
                        ${sel?'border-purple-400 bg-purple-50':'border-gray-200 hover:border-purple-200'}`}>
                      <span className="text-sm">{m.emoji}</span>
                      <span className={`text-xs font-medium leading-tight ${sel?'text-purple-700':'text-gray-600'}`}>{m.nombre}</span>
                      {sel && <span className="ml-auto text-purple-500 text-xs flex-shrink-0">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* PREMIUM */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">⭐ Premium</span>
          <span className="text-sm font-bold text-gray-700">Materias premium — Alto impacto profesional</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PREMIUM.map(m=>{
            const sel=premiumSel.includes(m.id);
            return (
              <button key={m.id} onClick={()=>togglePrem(m.id)}
                className={`flex items-center gap-3 border rounded-xl px-3 py-2.5 text-left transition-all
                  ${sel?'border-amber-400 bg-amber-50':'border-gray-200 hover:border-amber-200'}`}>
                <span className="text-lg">{m.emoji}</span>
                <span className={`text-xs font-medium flex-1 leading-tight ${sel?'text-amber-700':'text-gray-600'}`}>{m.nombre}</span>
                <span className="text-xs text-amber-500 flex-shrink-0">⭐</span>
                {sel && <span className="text-amber-500 text-xs font-bold flex-shrink-0">✓</span>}
              </button>
            );
          })}
        </div>
        {premiumSel.length>0 && (
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
            ⭐ {premiumSel.length} materia{premiumSel.length>1?'s':''} premium seleccionada{premiumSel.length>1?'s':''}. Se activarán con el Plan Premium.
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={av}>Confirmar materias →</Btn>
      </div>
    </div>
  );

  // PAGO
  if (pantalla==='pago') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-3">💳</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Plan y método de pago</h2>
      <p className="text-sm text-gray-400 mb-5">Elegí cómo querés abonar tu suscripción a iAcademia.</p>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-purple-800">Plan iAcademia</div>
          <div className="text-2xl font-bold text-purple-700">$2.500 <span className="text-sm font-normal">ARS/mes</span></div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {['Todas las materias base y optativas','Tutor IA personalizado ilimitado','Diagnóstico adaptativo completo','Reportes de progreso al responsable',
            'Materias premium según selección','Acceso desde cualquier dispositivo'].map((it,i)=>(
            <div key={i} className="flex items-center gap-1.5 text-xs text-purple-700">
              <span className="text-emerald-500">✓</span>{it}
            </div>
          ))}
        </div>
        {premiumSel.length>0 && (
          <div className="mt-3 pt-3 border-t border-purple-200 text-xs text-purple-600">
            ⭐ Incluye {premiumSel.length} materia{premiumSel.length>1?'s':''} premium seleccionada{premiumSel.length>1?'s':''}.
          </div>
        )}
      </div>

      <p className="text-sm font-semibold text-gray-700 mb-3">Método de pago</p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          {id:'tarjeta', emoji:'💳', label:'Tarjeta crédito / débito'},
          {id:'mercadopago', emoji:'🔵', label:'MercadoPago'},
          {id:'transferencia', emoji:'🏦', label:'Transferencia bancaria'},
          {id:'efectivo', emoji:'💵', label:'Rapipago / Pago Fácil'},
        ].map(m=>(
          <button key={m.id} onClick={()=>setMetodoPago(m.id)}
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all text-center
              ${metodoPago===m.id?'border-purple-400 bg-purple-50 shadow-md':'border-gray-100 hover:border-gray-200'}`}>
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-xs font-semibold text-gray-700 leading-tight">{m.label}</span>
            {metodoPago===m.id && <span className="text-purple-500 text-xs font-bold">✓ Seleccionado</span>}
          </button>
        ))}
      </div>

      {metodoPago==='tarjeta' && (
        <div className="flex flex-col gap-2 mb-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Inp label="Número de tarjeta" placeholder="0000 0000 0000 0000" value="" onChange={()=>{}} />
          <div className="grid grid-cols-2 gap-3">
            <Inp label="Vencimiento" placeholder="MM/AA" value="" onChange={()=>{}} />
            <Inp label="CVV" placeholder="123" value="" onChange={()=>{}} />
          </div>
          <Inp label="Nombre en la tarjeta" placeholder="Como figura en la tarjeta" value="" onChange={()=>{}} />
        </div>
      )}
      {metodoPago==='mercadopago' && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4 text-sm text-blue-800 text-center">
          <div className="text-2xl mb-1">🔵</div>
          Al confirmar serás redirigido a MercadoPago para completar el pago de forma segura.
        </div>
      )}
      {metodoPago==='transferencia' && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-xs text-gray-700 flex flex-col gap-1">
          <div className="font-bold text-gray-800 mb-1">Datos para transferencia:</div>
          <div><strong>CBU:</strong> 0000000000000000000000</div>
          <div><strong>Alias:</strong> IACADEMIA.EDU</div>
          <div><strong>Titular:</strong> iAcademia</div>
          <div className="text-gray-400 mt-1">Enviá el comprobante a pagos@iacademia.com.ar</div>
        </div>
      )}
      {metodoPago==='efectivo' && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-xs text-gray-700 text-center">
          <div className="text-2xl mb-1">💵</div>
          Te enviaremos un código de pago a tu email para abonar en cualquier Rapipago o Pago Fácil del país.
        </div>
      )}

      <div className="flex gap-3">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={()=>{if(!metodoPago){alert('Seleccioná un método de pago');return;} av();}}>
          Confirmar pago y continuar →
        </Btn>
      </div>
      <p className="text-xs text-gray-400 text-center mt-2">🔒 Pago seguro · Podés cancelar tu suscripción cuando quieras</p>
    </>
  ));

  // AVISO DIAGNÓSTICO
  if (pantalla==='aviso_diagnostico') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-5xl text-center mb-4">🧠</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">¡Pago confirmado!</h2>
      <p className="text-sm text-gray-500 text-center leading-relaxed mb-5">
        Ahora realizarás la evaluación diagnóstica que personaliza toda tu experiencia en iAcademia.
      </p>
      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <div className="text-xs font-bold text-purple-700 mb-2">La evaluación incluye:</div>
        <div className="grid grid-cols-2 gap-1.5">
          {['Estilo de aprendizaje','Evaluación de lectura','Evaluación de atención','Test de percepción visual','Evaluación de lógica','Comprensión lectora'].map((it,i)=>(
            <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="text-purple-400">→</span>{it}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-6 text-xs text-amber-800">
        ⚠️ <strong>Importante:</strong> una vez que iniciés la evaluación no podrás volver atrás. Si necesitás corregir datos anteriores, hacelo ahora.
      </div>
      <div className="flex flex-col gap-2">
        <Btn outline onClick={volver}>← Volver y revisar datos</Btn>
        <Btn onClick={av}>Iniciar evaluación diagnóstica →</Btn>
      </div>
      <p className="text-xs text-gray-400 text-center mt-3">⏱ Tarda aproximadamente 3-4 minutos</p>
    </>
  ));

  // ESTILO
  if (pantalla==='estilo') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-3">🧠</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">¿Cómo aprendés mejor?</h2>
      <p className="text-sm text-gray-500 mb-5">Elegí la opción que más se parezca a vos.</p>
      <div className="flex flex-col gap-3">
        {[
          {id:'visual', emoji:'👁️', titulo:'Con imágenes y diagramas', desc:'Entiendo mejor con esquemas, mapas o gráficos'},
          {id:'auditivo', emoji:'🎧', titulo:'Escuchando explicaciones', desc:'Me queda mejor cuando alguien me lo explica'},
          {id:'lectura', emoji:'📖', titulo:'Leyendo y escribiendo', desc:'Aprendo mejor leyendo y tomando notas'},
          {id:'practico', emoji:'✋', titulo:'Practicando y resolviendo', desc:'Entiendo cuando resuelvo ejercicios yo mismo'},
        ].map(e=>(
          <button key={e.id} onClick={()=>{setDiag(p=>({...p,estilo:e.id})); av();}}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-left">
            <span className="text-2xl">{e.emoji}</span>
            <div>
              <div className="font-semibold text-gray-800 text-sm">{e.titulo}</div>
              <div className="text-xs text-gray-400 mt-0.5">{e.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </>
  ));

  // LECTURA
  if (pantalla==='lectura') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-3">📝</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Evaluación de lectura</h2>
      <p className="text-sm text-gray-500 mb-1">Marcá todo lo que aplique al alumno.</p>
      <p className="text-xs text-purple-600 mb-4">Podés seleccionar más de una opción</p>
      <div className="flex flex-col gap-2 mb-5">
        {['A veces confunde letras parecidas (b/d, p/q)','Le cuesta leer en voz alta','Las palabras parecen moverse o borrarse','Necesita releer varias veces para entender','Se cansa mucho leyendo','Ninguna de las anteriores'].map((op,i)=>(
          <Check key={i} label={op}
            checked={(i===5&&lecturaSel.length===0)||lecturaSel.includes(i)}
            onClick={()=>toggleLectura(i)} />
        ))}
      </div>
      <Btn onClick={()=>{setDiag(p=>({...p,dislexia:lecturaSel.length>=2})); av();}}>
        Continuar →
      </Btn>
    </>
  ));

  // ATENCIÓN
  if (pantalla==='atencion') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-3">⚡</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Evaluación de atención</h2>
      <p className="text-sm text-gray-500 mb-1">Marcá todo lo que aplique al alumno.</p>
      <p className="text-xs text-purple-600 mb-4">Podés seleccionar más de una opción</p>
      <div className="flex flex-col gap-2 mb-5">
        {['Le cuesta mantener la atención por mucho tiempo','Se distrae fácilmente','Empieza tareas pero le cuesta terminarlas','A veces actúa sin pensar primero','Necesita moverse mientras estudia','Ninguna de las anteriores'].map((op,i)=>(
          <Check key={i} label={op}
            checked={(i===5&&atencionSel.length===0)||atencionSel.includes(i)}
            onClick={()=>toggleAtencion(i)} />
        ))}
      </div>
      <Btn onClick={()=>{setDiag(p=>({...p,tdah:atencionSel.length>=3})); av();}}>
        Continuar →
      </Btn>
    </>
  ));

  // COLORES
  if (pantalla==='colores') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-3">🎨</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Test de percepción visual</h2>
      <p className="text-sm text-gray-500 mb-5">Respondé según lo que ves. No hay respuestas incorrectas.</p>
      <div className="rounded-xl p-8 mb-4 flex items-center justify-center" style={{background:COLORES_TEST[colorIdx].fondo}}>
        <div className="w-28 h-28 rounded-full" style={{background:COLORES_TEST[colorIdx].circulo}} />
      </div>
      <p className="text-sm font-semibold text-gray-700 mb-4">{COLORES_TEST[colorIdx].preg}</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {COLORES_TEST[colorIdx].ops.map((op,i)=>(
          <button key={i} onClick={()=>{
            const err=colorErrores+(i!==COLORES_TEST[colorIdx].ok?1:0);
            if(colorIdx<COLORES_TEST.length-1){setColorIdx(colorIdx+1);setColorErrores(err);}
            else{setDiag(p=>({...p,daltonismo:err>=2}));av();}
          }}
            className="p-3 border border-gray-200 rounded-xl text-sm font-semibold hover:border-purple-400 hover:bg-purple-50 transition-all">
            {op}
          </button>
        ))}
      </div>
      <div className="flex gap-1 justify-center">
        {COLORES_TEST.map((_,i)=>(
          <div key={i} className={`w-2 h-2 rounded-full ${i<=colorIdx?'bg-purple-500':'bg-gray-200'}`} />
        ))}
      </div>
    </>
  ));

  // LÓGICA
  if (pantalla==='logica') {
    const preg=logicaPregs[logicaIdx];
    return wrap(card(
      <>
        <Barra paso={paso} />
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">🧩</div>
          <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full font-semibold">{logicaIdx+1} / {logicaPregs.length}</div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Evaluación de lógica</h2>
        <div className="bg-purple-50 rounded-xl p-4 mb-5">
          <p className="text-sm font-semibold text-gray-800 leading-relaxed">{preg.p}</p>
        </div>
        <div className="flex flex-col gap-2">
          {preg.ops.map((op,i)=>(
            <button key={i} onClick={()=>{
              if(logicaResp!==null) return;
              setLogicaResp(i);
              const aciertos=logicaAciertos+(i===preg.ok?1:0);
              setTimeout(()=>{
                setLogicaResp(null);
                if(logicaIdx<logicaPregs.length-1){setLogicaIdx(logicaIdx+1);setLogicaAciertos(aciertos);}
                else{setDiag(p=>({...p,puntaje_logica:aciertos}));av();}
              },700);
            }}
              className={`p-3 border rounded-xl text-sm text-left font-semibold transition-all
                ${logicaResp===null?'border-gray-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700':
                  i===preg.ok?'border-emerald-400 bg-emerald-50 text-emerald-700':
                  logicaResp===i?'border-red-300 bg-red-50 text-red-600':'border-gray-100 text-gray-400'}`}>
              {op}
            </button>
          ))}
        </div>
        <div className="flex gap-1 justify-center mt-5">
          {logicaPregs.map((_,i)=>(
            <div key={i} className={`w-2 h-2 rounded-full ${i<logicaIdx?'bg-purple-500':i===logicaIdx?'bg-purple-300':'bg-gray-200'}`} />
          ))}
        </div>
      </>
    ));
  }

  // COMPRENSIÓN
  if (pantalla==='comprension') return wrap(card(
    <>
      <Barra paso={paso} />
      <div className="text-3xl mb-3">💭</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Comprensión lectora</h2>
      <p className="text-sm text-gray-500 mb-4">Leé el texto y respondé la pregunta.</p>
      <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
        "El agua es fundamental para la vida. Cubre el 71% de la superficie terrestre y es el componente principal de los seres vivos. Sin agua, ningún organismo podría sobrevivir más de pocos días."
      </div>
      <p className="text-sm font-semibold text-gray-700 mb-4">¿Cuál es la idea principal del texto?</p>
      <div className="flex flex-col gap-2">
        {[
          {txt:'El agua cubre el 71% de la Tierra', ok:false},
          {txt:'El agua es esencial para la vida', ok:true},
          {txt:'Los organismos viven pocos días sin agua', ok:false},
          {txt:'La Tierra tiene mucha agua', ok:false},
        ].map((op,i)=>(
          <button key={i} onClick={()=>{setDiag(p=>({...p,comprension:!op.ok})); av();}}
            className="p-3 border border-gray-200 rounded-xl text-sm text-left font-medium hover:border-purple-400 hover:bg-purple-50 transition-all">
            {op.txt}
          </button>
        ))}
      </div>
    </>
  ));

  // BIENVENIDA
  if (pantalla==='bienvenida') {
    const adaptaciones=calcAdaptaciones();
    const nivelLogica=diag.puntaje_logica>=3?'Alto':diag.puntaje_logica>=2?'Medio':'Básico';
    const datosFinales={
      ...alumno, tutor, ...diag, adaptaciones,
      quien_completo:quienCompleta,
      materias_base:materiasBase,
      materias_optativas:optativasSel,
      materias_premium:premiumSel,
      metodo_pago:metodoPago,
      diagnostico_completo:true,
    };
    return wrap(card(
      <>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">¡Bienvenido/a a iAcademia!</h2>
          <p className="text-sm text-gray-400">Tu inscripción y diagnóstico están completos. Todo listo para empezar.</p>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-purple-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">👤 Alumno/a</div>
              <div className="text-sm font-bold text-gray-800">{alumno.nombre}</div>
              <div className="text-xs text-gray-500">{alumno.anio_escolar}° {alumno.nivel} · {alumno.localidad}</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">👨‍👩‍👧 Responsable</div>
              <div className="text-sm font-bold text-gray-800">{tutor.nombre}</div>
              <div className="text-xs text-gray-500">Reportes {tutor.frecuencia}s</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400 mb-0.5">Estilo</div>
              <div className="text-xs font-bold text-gray-800 capitalize">{diag.estilo}</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400 mb-0.5">Lógica</div>
              <div className="text-xs font-bold text-gray-800">Nivel {nivelLogica}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <div className="text-xs text-gray-400 mb-0.5">Materias</div>
              <div className="text-xs font-bold text-gray-800">{materiasBase.length+optativasSel.length+premiumSel.length} elegidas</div>
            </div>
          </div>

          {adaptaciones.length>0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
              <div className="text-xs text-amber-700 font-bold mb-1.5">⚡ Adaptaciones activadas para vos:</div>
              <div className="flex flex-wrap gap-1">
                {adaptaciones.map((a,i)=>(
                  <span key={i} className="text-xs bg-white border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-700">
            ✉️ Se envió confirmación a <strong>{tutor.email}</strong>
            {!esMenor16 && ' para validar la inscripción.'}
          </div>
        </div>

        <button onClick={()=>onComplete(datosFinales)}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors text-base shadow-lg">
          Comenzar mi educación →
        </button>
      </>
    ));
  }

  return null;
}
