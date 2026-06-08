import React, { useState } from 'react';

// ── constantes ──────────────────────────────────────────────────────────────
const PROVINCIAS = ['Buenos Aires','CABA','Catamarca','Chaco','Chubut','Córdoba',
  'Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza',
  'Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz',
  'Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán'];

const COLORES_TEST = [
  { fondo:'#E8F5E9', circulo:'#2E7D32', pregunta:'¿Qué color ves en el círculo?', opciones:['Verde','Rojo','Gris','No distingo'], correcta:0 },
  { fondo:'#FFEBEE', circulo:'#C62828', pregunta:'¿Qué color predomina en el fondo?', opciones:['Verde','Rojo','Azul','No distingo'], correcta:1 },
  { fondo:'#E3F2FD', circulo:'#1565C0', pregunta:'¿Qué color ves en el círculo?', opciones:['Azul','Verde','Gris','No distingo'], correcta:0 },
];

const LOGICA_POOL = [
  { p:'¿Cuál número sigue? 2, 4, 6, 8, ___', ops:['9','10','11','12'], ok:1 },
  { p:'3 cajas con 4 pelotas cada una. ¿Total?', ops:['7','12','9','16'], ok:1 },
  { p:'¿Cuál NO pertenece? Perro, Gato, Mesa, Pájaro', ops:['Perro','Gato','Mesa','Pájaro'], ok:2 },
  { p:'Hoy es martes. ¿Qué día será en 3 días?', ops:['Jueves','Viernes','Miércoles','Sábado'], ok:1 },
  { p:'¿Cuál es el mayor? 0.5 · 1/2 · 0.49 · 0.51', ops:['0.5','1/2','0.49','0.51'], ok:3 },
  { p:'Ana > Juan > Pedro en dinero. ¿Quién tiene menos?', ops:['Ana','Juan','Pedro','Todos igual'], ok:2 },
  { p:'△ ○ △ ○ △ ___ ¿Qué sigue?', ops:['△','○','□','◇'], ok:1 },
  { p:'Libro $500. Pago $1000. ¿Vuelto?', ops:['$400','$500','$600','$1500'], ok:1 },
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

const PASOS_FLUJO = [
  'inicio',          // ¿quién completa?
  'aviso_legal',     // explicación + validación según edad
  'datos_alumno',    // ficha alumno
  'datos_tutor',     // ficha tutor/padre
  'aviso_cuestionario', // aviso: desde acá no se puede volver
  'estilo',
  'lectura',
  'atencion',
  'colores',
  'logica',
  'comprension',
  'plan',            // selección de plan
  'pago',            // datos de pago (visual)
  'bienvenida',      // fin
];

// ── componentes auxiliares ───────────────────────────────────────────────────
const Barra = ({ paso }) => {
  const total = PASOS_FLUJO.length - 1;
  const pct = Math.round((paso / total) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
      <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-300" style={{ width: pct + '%' }} />
    </div>
  );
};

const Btn = ({ onClick, children, outline }) => (
  <button onClick={onClick}
    className={`w-full py-3 rounded-xl font-medium transition-colors text-sm ${outline
      ? 'border border-purple-300 text-purple-700 hover:bg-purple-50'
      : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
    {children}
  </button>
);

const Campo = ({ label, children }) => (
  <div>
    <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
    {children}
  </div>
);

const Input = ({ placeholder, value, onChange, type = 'text' }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange}
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400" />
);

const Select = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange}
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400 bg-white">
    {children}
  </select>
);

const CheckOp = ({ label, checked, onClick }) => (
  <button onClick={onClick}
    className={`flex items-center gap-3 p-3 border rounded-xl text-left text-sm transition-colors w-full
      ${checked ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
      ${checked ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}>
      {checked && <span className="text-white text-xs font-bold">✓</span>}
    </div>
    {label}
  </button>
);

// ── componente principal ─────────────────────────────────────────────────────
export default function Diagnostico({ onComplete }) {
  const [paso, setPaso] = useState(0);
  const [quienCompleta, setQuienCompleta] = useState(null); // 'alumno' | 'tutor'
  const [validadoPorTutor, setValidadoPorTutor] = useState(false);
  const [logicaPregs] = useState(shuffle(LOGICA_POOL).slice(0, 4));
  const [logicaIdx, setLogicaIdx] = useState(0);
  const [logicaAciertos, setLogicaAciertos] = useState(0);
  const [logicaResp, setLogicaResp] = useState(null);
  const [colorIdx, setColorIdx] = useState(0);
  const [colorErrores, setColorErrores] = useState(0);
  const [lecturaSel, setLecturaSel] = useState([]);
  const [atencionSel, setAtencionSel] = useState([]);
  const [planSel, setPlanSel] = useState(null);
  const [metodoPago, setMetodoPago] = useState(null);

  const [alumno, setAlumno] = useState({
    nombre_completo: '', fecha_nacimiento: '', localidad: '', provincia: '',
    escuela: '', escuela_tipo: 'actual', turno: '', anio_escolar: null,
  });

  const [tutor, setTutor] = useState({
    nombre: '', relacion: '', email: '', telefono: '',
    frecuencia_reporte: 'semanal',
  });

  const [diag, setDiag] = useState({
    estilo_aprendizaje: null,
    posible_dislexia: false,
    posible_tdah: false,
    posible_daltonismo: false,
    dificultad_comprension: false,
    puntaje_logica: 0,
    adaptaciones: [],
  });

  const av = () => setPaso(p => p + 1);
  const volver = () => setPaso(p => p - 1);

  const calcAdaptaciones = (d) => {
    const a = [];
    if (d.posible_dislexia) a.push('fuente grande', 'audio texto');
    if (d.posible_tdah) a.push('sesiones cortas', 'más pausas');
    if (d.posible_daltonismo) a.push('alto contraste');
    if (d.dificultad_comprension) a.push('explicaciones simples');
    return a;
  };

  const toggleLectura = (i) => {
    if (i === 5) { setLecturaSel([]); return; }
    setLecturaSel(p => p.includes(i) ? p.filter(x => x !== i) : [...p.filter(x => x !== 5), i]);
  };

  const toggleAtencion = (i) => {
    if (i === 5) { setAtencionSel([]); return; }
    setAtencionSel(p => p.includes(i) ? p.filter(x => x !== i) : [...p.filter(x => x !== 5), i]);
  };

  // calcular edad en años
  const calcEdad = (fnac) => {
    if (!fnac) return null;
    const hoy = new Date();
    const nac = new Date(fnac);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  };

  const pantalla = PASOS_FLUJO[paso];

  // ── INICIO ──────────────────────────────────────────────────────────────────
  if (pantalla === 'inicio') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎓</div>
          <h1 className="text-2xl font-semibold text-purple-700 mb-1">Inscripción a iAcademia</h1>
          <p className="text-sm text-gray-400">Plataforma educativa para secundaria</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 text-sm text-amber-800">
          <div className="font-medium mb-1">⚠️ Importante antes de comenzar</div>
          <p className="text-xs leading-relaxed">Este formulario recopila información personal del alumno y del adulto responsable. Si el alumno es menor de 16 años, la inscripción puede ser completada por el propio alumno. Si tiene 16 años o más, se requerirá la validación del padre, madre o tutor legal.</p>
        </div>
        <p className="text-sm font-medium text-gray-700 mb-3">¿Quién está completando este formulario?</p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            { id: 'alumno', emoji: '🧑‍🎓', titulo: 'El alumno', desc: 'Soy el estudiante que se quiere inscribir' },
            { id: 'tutor', emoji: '👨‍👩‍👧', titulo: 'El padre, madre o tutor', desc: 'Estoy inscribiendo a mi hijo/a o tutelado/a' },
          ].map(op => (
            <button key={op.id} onClick={() => { setQuienCompleta(op.id); }}
              className={`flex items-center gap-4 p-4 border rounded-xl text-left transition-colors
                ${quienCompleta === op.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <span className="text-3xl">{op.emoji}</span>
              <div>
                <div className="font-medium text-gray-800">{op.titulo}</div>
                <div className="text-xs text-gray-400 mt-0.5">{op.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <Btn onClick={() => { if (!quienCompleta) { alert('Seleccioná quién completa el formulario'); return; } av(); }}>
          Comenzar inscripción →
        </Btn>
        <p className="text-xs text-gray-400 text-center mt-3">El proceso tarda aproximadamente 10 minutos</p>
      </div>
    </div>
  );

  // ── AVISO LEGAL ─────────────────────────────────────────────────────────────
  if (pantalla === 'aviso_legal') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <Barra paso={paso} />
        <div className="text-3xl mb-3">📋</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Sobre el proceso de inscripción</h2>
        <div className="flex flex-col gap-3 mb-6 text-sm text-gray-600">
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="font-medium text-purple-700 mb-2">📌 El formulario tiene dos partes:</div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex gap-2"><span className="text-purple-500 font-bold">1.</span><span><strong>Datos personales y del responsable</strong> — podés volver atrás hasta finalizar esta sección.</span></div>
              <div className="flex gap-2"><span className="text-purple-500 font-bold">2.</span><span><strong>Evaluación diagnóstica del alumno</strong> — una vez iniciada, no se puede volver atrás.</span></div>
            </div>
          </div>
          {quienCompleta === 'alumno' && (
            <div className="bg-blue-50 rounded-xl p-4 text-xs text-blue-800">
              <div className="font-medium mb-1">🧑‍🎓 Estás completando como alumno</div>
              Si tenés 16 años o más, tu padre, madre o tutor deberá validar la inscripción. Te pediremos sus datos y le enviaremos un mail para que confirme.
              Si tenés menos de 16 años, podés completar el proceso vos solo pero aun así cargaremos los datos del adulto responsable para los reportes de progreso.
            </div>
          )}
          {quienCompleta === 'tutor' && (
            <div className="bg-emerald-50 rounded-xl p-4 text-xs text-emerald-800">
              <div className="font-medium mb-1">👨‍👩‍👧 Estás completando como tutor/padre</div>
              Completarás los datos del alumno y luego los tuyos como responsable. Al finalizar recibirás un mail de confirmación con los reportes de progreso según la frecuencia que elijas.
            </div>
          )}
          <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 border border-gray-200">
            <div className="font-medium text-gray-700 mb-1">🔒 Privacidad y seguridad</div>
            Todos los datos son confidenciales y se utilizan únicamente para personalizar la experiencia educativa y enviar reportes al responsable. No compartimos información con terceros.
          </div>
        </div>
        <div className="flex gap-3">
          <Btn outline onClick={volver}>← Volver</Btn>
          <Btn onClick={av}>Entendido, continuar →</Btn>
        </div>
      </div>
    </div>
  );

  // ── DATOS ALUMNO ─────────────────────────────────────────────────────────────
  if (pantalla === 'datos_alumno') {
    const edad = calcEdad(alumno.fecha_nacimiento);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
          <Barra paso={paso} />
          <div className="text-3xl mb-2">👤</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Datos del alumno</h2>
          <p className="text-xs text-gray-400 mb-5">
            {quienCompleta === 'tutor' ? 'Completá los datos del estudiante que vas a inscribir.' : 'Completá tus datos personales.'}
          </p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Campo label="Nombre completo *">
                <Input placeholder="Ej: María García" value={alumno.nombre_completo}
                  onChange={e => setAlumno(p => ({ ...p, nombre_completo: e.target.value }))} />
              </Campo>
              <Campo label="Fecha de nacimiento *">
                <Input type="date" value={alumno.fecha_nacimiento}
                  onChange={e => setAlumno(p => ({ ...p, fecha_nacimiento: e.target.value }))} />
              </Campo>
            </div>
            {edad !== null && (
              <div className={`text-xs px-3 py-2 rounded-lg ${edad < 16 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                {edad < 16
                  ? `✓ Menor de 16 años (${edad} años) — no requiere validación adicional del tutor.`
                  : `⚠️ Mayor de 16 años (${edad} años) — se requerirá confirmación del adulto responsable por mail.`}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Campo label="Localidad *">
                <Input placeholder="Ej: Córdoba" value={alumno.localidad}
                  onChange={e => setAlumno(p => ({ ...p, localidad: e.target.value }))} />
              </Campo>
              <Campo label="Provincia *">
                <Select value={alumno.provincia} onChange={e => setAlumno(p => ({ ...p, provincia: e.target.value }))}>
                  <option value="">Seleccioná...</option>
                  {PROVINCIAS.map(pr => <option key={pr} value={pr}>{pr}</option>)}
                </Select>
              </Campo>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Campo label="Escuela">
                <Input placeholder="Nombre de la escuela" value={alumno.escuela}
                  onChange={e => setAlumno(p => ({ ...p, escuela: e.target.value }))} />
              </Campo>
              <Campo label="¿Actual o anterior?">
                <Select value={alumno.escuela_tipo} onChange={e => setAlumno(p => ({ ...p, escuela_tipo: e.target.value }))}>
                  <option value="actual">Escuela actual</option>
                  <option value="anterior">Escuela anterior</option>
                  <option value="ninguna">No asiste actualmente</option>
                </Select>
              </Campo>
            </div>
            <Campo label="Turno">
              <Select value={alumno.turno} onChange={e => setAlumno(p => ({ ...p, turno: e.target.value }))}>
                <option value="">Seleccioná...</option>
                <option value="manana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
                <option value="ninguno">No asiste</option>
              </Select>
            </Campo>
            <Campo label="¿En qué año estás? *">
              <div className="grid grid-cols-3 gap-2 mt-1">
                {['1°','2°','3°','4°','5°','6°'].map((a, i) => (
                  <button key={i} onClick={() => setAlumno(p => ({ ...p, anio_escolar: i + 1 }))}
                    className={`p-2 border rounded-lg text-sm font-medium transition-colors
                      ${alumno.anio_escolar === i + 1 ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    {a} año
                  </button>
                ))}
              </div>
            </Campo>
          </div>
          <div className="flex gap-3 mt-5">
            <Btn outline onClick={volver}>← Volver</Btn>
            <Btn onClick={() => {
              if (!alumno.nombre_completo || !alumno.fecha_nacimiento || !alumno.localidad || !alumno.anio_escolar) {
                alert('Completá los campos obligatorios (*)'); return;
              }
              av();
            }}>Continuar →</Btn>
          </div>
        </div>
      </div>
    );
  }

  // ── DATOS TUTOR ──────────────────────────────────────────────────────────────
  if (pantalla === 'datos_tutor') {
    const edad = calcEdad(alumno.fecha_nacimiento);
    const requiereValidacion = edad !== null && edad >= 16;
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
          <Barra paso={paso} />
          <div className="text-3xl mb-2">👨‍👩‍👧</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Datos del adulto responsable</h2>
          <p className="text-xs text-gray-400 mb-3">
            {quienCompleta === 'tutor' ? 'Completá tus datos como responsable del alumno.' : 'Completá los datos de tu padre, madre o tutor.'}
          </p>
          {requiereValidacion && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-xs text-amber-800">
              ⚠️ El alumno tiene {edad} años. Una vez completado el formulario, se enviará un mail al responsable para confirmar la inscripción.
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Campo label="Nombre completo *">
                <Input placeholder="Nombre del responsable" value={tutor.nombre}
                  onChange={e => setTutor(p => ({ ...p, nombre: e.target.value }))} />
              </Campo>
              <Campo label="Relación con el alumno *">
                <Select value={tutor.relacion} onChange={e => setTutor(p => ({ ...p, relacion: e.target.value }))}>
                  <option value="">Seleccioná...</option>
                  <option value="padre">Padre</option>
                  <option value="madre">Madre</option>
                  <option value="abuelo">Abuelo/a</option>
                  <option value="hermano">Hermano/a mayor</option>
                  <option value="tutor_legal">Tutor legal</option>
                  <option value="otro">Otro</option>
                </Select>
              </Campo>
            </div>
            <Campo label="Email del responsable *">
              <Input type="email" placeholder="email@ejemplo.com" value={tutor.email}
                onChange={e => setTutor(p => ({ ...p, email: e.target.value }))} />
            </Campo>
            <Campo label="Teléfono de contacto">
              <Input type="tel" placeholder="Ej: 351-1234567" value={tutor.telefono}
                onChange={e => setTutor(p => ({ ...p, telefono: e.target.value }))} />
            </Campo>
            <Campo label="Frecuencia de reportes de progreso">
              <div className="grid grid-cols-3 gap-2 mt-1">
                {[{ id:'diario', label:'📅 Diario' },{ id:'semanal', label:'📆 Semanal' },{ id:'mensual', label:'🗓️ Mensual' }].map(f => (
                  <button key={f.id} onClick={() => setTutor(p => ({ ...p, frecuencia_reporte: f.id }))}
                    className={`p-2.5 border rounded-xl text-xs font-medium transition-colors
                      ${tutor.frecuencia_reporte === f.id ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </Campo>
          </div>
          <div className="flex gap-3 mt-5">
            <Btn outline onClick={volver}>← Volver</Btn>
            <Btn onClick={() => {
              if (!tutor.nombre || !tutor.relacion || !tutor.email) {
                alert('Completá los campos obligatorios (*)'); return;
              }
              av();
            }}>Continuar →</Btn>
          </div>
        </div>
      </div>
    );
  }

  // ── AVISO CUESTIONARIO ───────────────────────────────────────────────────────
  if (pantalla === 'aviso_cuestionario') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm text-center">
        <Barra paso={paso} />
        <div className="text-5xl mb-4">🧠</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Evaluación diagnóstica</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          A continuación realizarás una evaluación corta que nos ayudará a personalizar tu experiencia de aprendizaje en iAcademia.
        </p>
        <div className="bg-purple-50 rounded-xl p-4 mb-5 text-left">
          <div className="text-xs font-medium text-purple-700 mb-2">La evaluación incluye:</div>
          <div className="flex flex-col gap-1.5 text-xs text-gray-600">
            {['Estilo de aprendizaje','Evaluación de lectura (dislexia)','Evaluación de atención (TDAH)','Test de percepción de colores (daltonismo)','Evaluación de lógica','Comprensión lectora'].map((it, i) => (
              <div key={i} className="flex items-center gap-2"><span className="text-purple-400">→</span>{it}</div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-6 text-xs text-amber-800 text-left">
          ⚠️ <strong>Atención:</strong> una vez que iniciés la evaluación diagnóstica no podrás volver atrás para modificar los datos anteriores. Si necesitás corregir algo, hacelo ahora.
        </div>
        <div className="flex flex-col gap-2">
          <Btn outline onClick={volver}>← Volver y revisar datos</Btn>
          <Btn onClick={av}>Iniciar evaluación →</Btn>
        </div>
        <p className="text-xs text-gray-400 mt-3">La evaluación tarda aproximadamente 3 minutos</p>
      </div>
    </div>
  );

  // ── ESTILO ───────────────────────────────────────────────────────────────────
  if (pantalla === 'estilo') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <Barra paso={paso} />
        <div className="text-3xl mb-3">🧠</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">¿Cómo aprendés mejor?</h2>
        <p className="text-sm text-gray-500 mb-5">Elegí la opción que más se parezca a vos.</p>
        <div className="flex flex-col gap-3">
          {[
            { id:'visual', emoji:'👁️', titulo:'Con imágenes y diagramas', desc:'Entiendo mejor con esquemas, mapas o gráficos' },
            { id:'auditivo', emoji:'🎧', titulo:'Escuchando explicaciones', desc:'Me queda mejor cuando alguien me lo explica' },
            { id:'lectura', emoji:'📖', titulo:'Leyendo y escribiendo', desc:'Aprendo mejor leyendo y tomando notas' },
            { id:'practico', emoji:'✋', titulo:'Practicando y haciendo', desc:'Entiendo resolviendo ejercicios yo mismo' },
          ].map(e => (
            <button key={e.id} onClick={() => { setDiag(p => ({ ...p, estilo_aprendizaje: e.id })); av(); }}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors text-left">
              <span className="text-2xl">{e.emoji}</span>
              <div>
                <div className="font-medium text-gray-800 text-sm">{e.titulo}</div>
                <div className="text-xs text-gray-400 mt-0.5">{e.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── LECTURA ──────────────────────────────────────────────────────────────────
  if (pantalla === 'lectura') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <Barra paso={paso} />
        <div className="text-3xl mb-3">📝</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Evaluación de lectura</h2>
        <p className="text-sm text-gray-500 mb-1">Marcá todo lo que se aplique al alumno.</p>
        <p className="text-xs text-purple-600 mb-4">Podés seleccionar más de una opción</p>
        <div className="flex flex-col gap-2 mb-5">
          {[
            'A veces confunde letras parecidas (b/d, p/q)',
            'Le cuesta leer en voz alta',
            'Las palabras parecen moverse o borrarse',
            'Necesita releer varias veces para entender',
            'Se cansa mucho leyendo',
            'Ninguna de las anteriores',
          ].map((op, i) => (
            <CheckOp key={i} label={op}
              checked={(i === 5 && lecturaSel.length === 0) || lecturaSel.includes(i)}
              onClick={() => toggleLectura(i)} />
          ))}
        </div>
        <Btn onClick={() => { setDiag(p => ({ ...p, posible_dislexia: lecturaSel.length >= 2 })); av(); }}>
          Continuar →
        </Btn>
      </div>
    </div>
  );

  // ── ATENCIÓN ─────────────────────────────────────────────────────────────────
  if (pantalla === 'atencion') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <Barra paso={paso} />
        <div className="text-3xl mb-3">⚡</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Evaluación de atención</h2>
        <p className="text-sm text-gray-500 mb-1">Marcá todo lo que se aplique al alumno.</p>
        <p className="text-xs text-purple-600 mb-4">Podés seleccionar más de una opción</p>
        <div className="flex flex-col gap-2 mb-5">
          {[
            'Le cuesta mantener la atención por mucho tiempo',
            'Se distrae fácilmente',
            'Empieza tareas pero le cuesta terminarlas',
            'A veces actúa sin pensar primero',
            'Necesita moverse mientras estudia',
            'Ninguna de las anteriores',
          ].map((op, i) => (
            <CheckOp key={i} label={op}
              checked={(i === 5 && atencionSel.length === 0) || atencionSel.includes(i)}
              onClick={() => toggleAtencion(i)} />
          ))}
        </div>
        <Btn onClick={() => { setDiag(p => ({ ...p, posible_tdah: atencionSel.length >= 3 })); av(); }}>
          Continuar →
        </Btn>
      </div>
    </div>
  );

  // ── COLORES ──────────────────────────────────────────────────────────────────
  if (pantalla === 'colores') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <Barra paso={paso} />
        <div className="text-3xl mb-3">🎨</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Test de percepción de colores</h2>
        <p className="text-sm text-gray-500 mb-5">Respondé según lo que ves. No hay respuestas incorrectas.</p>
        <div className="rounded-xl p-8 mb-4 flex items-center justify-center" style={{ background: COLORES_TEST[colorIdx].fondo }}>
          <div className="w-28 h-28 rounded-full" style={{ background: COLORES_TEST[colorIdx].circulo }} />
        </div>
        <p className="text-sm font-medium text-gray-700 mb-4">{COLORES_TEST[colorIdx].pregunta}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {COLORES_TEST[colorIdx].opciones.map((op, i) => (
            <button key={i} onClick={() => {
              const err = colorErrores + (i !== COLORES_TEST[colorIdx].correcta ? 1 : 0);
              if (colorIdx < COLORES_TEST.length - 1) { setColorIdx(colorIdx + 1); setColorErrores(err); }
              else { setDiag(p => ({ ...p, posible_daltonismo: err >= 2 })); av(); }
            }}
              className="p-3 border border-gray-200 rounded-xl text-sm font-medium hover:border-purple-400 hover:bg-purple-50 transition-colors">
              {op}
            </button>
          ))}
        </div>
        <div className="flex gap-1 justify-center">
          {COLORES_TEST.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i <= colorIdx ? 'bg-purple-500' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
    </div>
  );

  // ── LÓGICA ───────────────────────────────────────────────────────────────────
  if (pantalla === 'logica') {
    const preg = logicaPregs[logicaIdx];
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
          <Barra paso={paso} />
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">🧩</div>
            <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full font-medium">
              {logicaIdx + 1} / {logicaPregs.length}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Evaluación de lógica</h2>
          <p className="text-sm text-gray-500 mb-5">Respondé cada pregunta según tu criterio.</p>
          <div className="bg-purple-50 rounded-xl p-4 mb-5">
            <p className="text-sm font-medium text-gray-800 leading-relaxed">{preg.p}</p>
          </div>
          <div className="flex flex-col gap-2">
            {preg.ops.map((op, i) => (
              <button key={i} onClick={() => {
                if (logicaResp !== null) return;
                setLogicaResp(i);
                const aciertos = logicaAciertos + (i === preg.ok ? 1 : 0);
                setTimeout(() => {
                  setLogicaResp(null);
                  if (logicaIdx < logicaPregs.length - 1) {
                    setLogicaIdx(logicaIdx + 1);
                    setLogicaAciertos(aciertos);
                  } else {
                    setDiag(p => ({ ...p, puntaje_logica: aciertos }));
                    av();
                  }
                }, 700);
              }}
                className={`p-3 border rounded-xl text-sm text-left font-medium transition-colors
                  ${logicaResp === null ? 'border-gray-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700' :
                    i === preg.ok ? 'border-emerald-400 bg-emerald-50 text-emerald-700' :
                    logicaResp === i ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-100 text-gray-400'}`}>
                {op}
              </button>
            ))}
          </div>
          <div className="flex gap-1 justify-center mt-5">
            {logicaPregs.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i < logicaIdx ? 'bg-purple-500' : i === logicaIdx ? 'bg-purple-300' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── COMPRENSIÓN ──────────────────────────────────────────────────────────────
  if (pantalla === 'comprension') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <Barra paso={paso} />
        <div className="text-3xl mb-3">💭</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Comprensión lectora</h2>
        <p className="text-sm text-gray-500 mb-4">Leé el texto y respondé la pregunta.</p>
        <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
          "El agua es fundamental para la vida. Cubre el 71% de la superficie terrestre y es el componente principal de los seres vivos. Sin agua, ningún organismo podría sobrevivir más de pocos días."
        </div>
        <p className="text-sm font-medium text-gray-700 mb-4">¿Cuál es la idea principal del texto?</p>
        <div className="flex flex-col gap-2">
          {[
            { txt:'El agua cubre el 71% de la Tierra', ok:false },
            { txt:'El agua es esencial para la vida', ok:true },
            { txt:'Los organismos viven pocos días sin agua', ok:false },
            { txt:'La Tierra tiene mucha agua', ok:false },
          ].map((op, i) => (
            <button key={i} onClick={() => { setDiag(p => ({ ...p, dificultad_comprension: !op.ok })); av(); }}
              className="p-3 border border-gray-200 rounded-xl text-sm text-left hover:border-purple-400 hover:bg-purple-50 transition-colors">
              {op.txt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── PLAN ─────────────────────────────────────────────────────────────────────
  if (pantalla === 'plan') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <Barra paso={paso} />
        <div className="text-3xl mb-3">📦</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Elegí tu plan</h2>
        <p className="text-sm text-gray-400 mb-5">Podés empezar gratis y cambiar cuando quieras.</p>
        <div className="flex flex-col gap-3 mb-6">
          {[
            {
              id:'free', badge:'Gratis', color:'border-gray-200', badgeColor:'bg-gray-100 text-gray-600',
              titulo:'Plan Gratuito', precio:'$0', periodo:'para siempre',
              items:['Acceso a las 6 materias piloto','2 primeras unidades por materia','10 preguntas al tutor IA por día','5 ejercicios por día','Progreso y logros básicos'],
            },
            {
              id:'premium', badge:'Recomendado', color:'border-purple-400', badgeColor:'bg-purple-100 text-purple-700',
              titulo:'Plan Premium', precio:'$2.500', periodo:'por mes',
              items:['Todas las materias sin límites','Tutor IA ilimitado','Ejercicios ilimitados','Preparación para exámenes','Reportes detallados para el tutor','Materias avanzadas (Física, Química...)'],
            },
          ].map(pl => (
            <button key={pl.id} onClick={() => setPlanSel(pl.id)}
              className={`border-2 rounded-xl p-4 text-left transition-all ${planSel === pl.id ? pl.color + ' bg-purple-50' : 'border-gray-100 hover:border-gray-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-800">{pl.titulo}</div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pl.badgeColor}`}>{pl.badge}</span>
                  {planSel === pl.id && <span className="text-purple-500 font-bold">✓</span>}
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-bold text-gray-800">{pl.precio}</span>
                <span className="text-xs text-gray-400">{pl.periodo}</span>
              </div>
              <div className="flex flex-col gap-1">
                {pl.items.map((it, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-emerald-500">✓</span>{it}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
        <Btn onClick={() => { if (!planSel) { alert('Seleccioná un plan'); return; } av(); }}>
          Continuar →
        </Btn>
      </div>
    </div>
  );

  // ── PAGO ─────────────────────────────────────────────────────────────────────
  if (pantalla === 'pago') {
    if (planSel === 'free') {
      // plan gratis: salteamos pago
      setTimeout(av, 0);
      return null;
    }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
          <Barra paso={paso} />
          <div className="text-3xl mb-3">💳</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Método de pago</h2>
          <p className="text-sm text-gray-400 mb-5">Elegí cómo querés abonar el Plan Premium.</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { id:'tarjeta', emoji:'💳', label:'Tarjeta de crédito / débito' },
              { id:'mercadopago', emoji:'🔵', label:'MercadoPago' },
              { id:'transferencia', emoji:'🏦', label:'Transferencia bancaria' },
              { id:'efectivo', emoji:'💵', label:'Efectivo (Rapipago / Pago Fácil)' },
            ].map(m => (
              <button key={m.id} onClick={() => setMetodoPago(m.id)}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all text-center
                  ${metodoPago === m.id ? 'border-purple-400 bg-purple-50' : 'border-gray-100 hover:border-gray-200'}`}>
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs font-medium text-gray-700 leading-tight">{m.label}</span>
                {metodoPago === m.id && <span className="text-purple-500 text-xs font-bold">✓ Seleccionado</span>}
              </button>
            ))}
          </div>

          {metodoPago === 'tarjeta' && (
            <div className="flex flex-col gap-3 mb-5 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <Campo label="Número de tarjeta">
                <Input placeholder="0000 0000 0000 0000" />
              </Campo>
              <div className="grid grid-cols-2 gap-3">
                <Campo label="Vencimiento">
                  <Input placeholder="MM/AA" />
                </Campo>
                <Campo label="CVV">
                  <Input placeholder="123" />
                </Campo>
              </div>
              <Campo label="Nombre en la tarjeta">
                <Input placeholder="Como figura en la tarjeta" />
              </Campo>
            </div>
          )}

          {metodoPago === 'mercadopago' && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-sm text-blue-800 text-center">
              <div className="text-2xl mb-2">🔵</div>
              Al continuar serás redirigido a MercadoPago para completar el pago de forma segura.
            </div>
          )}

          {metodoPago === 'transferencia' && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5 text-xs text-gray-700 flex flex-col gap-1">
              <div className="font-medium text-gray-800 mb-1">Datos para transferencia:</div>
              <div><strong>CBU:</strong> 0000000000000000000000</div>
              <div><strong>Alias:</strong> IACADEMIA.EDU</div>
              <div><strong>Titular:</strong> iAcademia S.R.L.</div>
              <div className="text-gray-400 mt-1">Enviá el comprobante a pagos@iacademia.com.ar</div>
            </div>
          )}

          {metodoPago === 'efectivo' && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5 text-xs text-gray-700 text-center">
              <div className="text-2xl mb-2">💵</div>
              Al continuar te enviaremos un código de pago a tu email para abonar en cualquier Rapipago o Pago Fácil del país.
            </div>
          )}

          <div className="bg-purple-50 rounded-xl p-3 mb-5 flex items-center justify-between">
            <div className="text-sm text-gray-700">Plan Premium · mensual</div>
            <div className="font-bold text-purple-700 text-lg">$2.500 ARS</div>
          </div>

          <Btn onClick={() => { if (!metodoPago) { alert('Seleccioná un método de pago'); return; } av(); }}>
            Confirmar y finalizar →
          </Btn>
          <p className="text-xs text-gray-400 text-center mt-2">🔒 Pago seguro · Podés cancelar cuando quieras</p>
        </div>
      </div>
    );
  }

  // ── BIENVENIDA FINAL ─────────────────────────────────────────────────────────
  if (pantalla === 'bienvenida') {
    const adaptaciones = calcAdaptaciones(diag);
    const nivelLogica = diag.puntaje_logica >= 3 ? 'Alto' : diag.puntaje_logica >= 2 ? 'Medio' : 'Básico';
    const datosFinales = { ...alumno, tutor, ...diag, adaptaciones, plan: planSel, quien_completo: quienCompleta };
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">¡Bienvenido/a a iAcademia!</h2>
            <p className="text-sm text-gray-400">Tu inscripción está completa. Todo listo para empezar.</p>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-1">👤 Alumno</div>
                <div className="text-sm font-semibold text-gray-800">{alumno.nombre_completo}</div>
                <div className="text-xs text-gray-500">{alumno.anio_escolar}° año · {alumno.localidad}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-1">👨‍👩‍👧 Responsable</div>
                <div className="text-sm font-semibold text-gray-800">{tutor.nombre}</div>
                <div className="text-xs text-gray-500">Reportes {tutor.frecuencia_reporte}s</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-400 mb-1">Estilo</div>
                <div className="text-xs font-semibold text-gray-800 capitalize">{diag.estilo_aprendizaje}</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-400 mb-1">Lógica</div>
                <div className="text-xs font-semibold text-gray-800">{nivelLogica}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="text-xs text-gray-400 mb-1">Plan</div>
                <div className="text-xs font-semibold text-gray-800 capitalize">{planSel}</div>
              </div>
            </div>
            {adaptaciones.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                <div className="text-xs text-amber-700 font-medium mb-1.5">⚡ Adaptaciones activadas:</div>
                <div className="flex flex-wrap gap-1">
                  {adaptaciones.map((a, i) => (
                    <span key={i} className="text-xs bg-white border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-700">
              ✉️ Se envió un mail de confirmación a <strong>{tutor.email}</strong>
              {calcEdad(alumno.fecha_nacimiento) >= 16 && ' para validar la inscripción.'}
            </div>
          </div>

          <Btn onClick={() => onComplete({ ...datosFinales, diagnostico_completo: true })}>
            Ir a mi panel de estudio →
          </Btn>
        </div>
      </div>
    );
  }

  return null;
}