import React, { useState, useCallback } from 'react';
import MateriaDetalle from './MateriaDetalle';
import { calcularPrecioBase, calcularResumen, calcularResumenApoyoEscolar, PRECIOS } from './PreciosConfig';
import { CONTENIDO_EDUCATIVO } from './ContenidoEducativo';
import {
  PROVINCIAS, MATERIAS_BASE, OPTATIVAS, PREMIUM_LIST,
  COLORES_TEST, LOGICA_POOL, PASOS, shuffle, fmt,
} from './diagnosticoData';
import { Barra, Btn, Inp, Sel, Check, wrap, card } from './diagnosticoUI';

// Materias que un alumno de "Apoyo Escolar" puede elegir — solo las que tienen
// tutor IA con contenido real (las 6 de ContenidoEducativo.js), no toda la lista
// de materias_base de la escuela tradicional.
const MATERIAS_APOYO = Object.entries(CONTENIDO_EDUCATIVO).map(([id, m]) => ({ id, nombre: m.nombre, emoji: m.emoji }));

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function Diagnostico({onComplete}) {
  const [paso, setPaso] = useState(0);
  const [quienCompleta, setQuienCompleta] = useState(null);
  const [logicaPregs] = useState(() => shuffle(LOGICA_POOL).slice(0,4));
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
  const [materiaDetalle, setMateriaDetalle] = useState(null);
  const [tipoDetalle, setTipoDetalle] = useState(null);
  const [apoyoEscolarSel, setApoyoEscolarSel] = useState([]);
  const [mostrarGraciasPorHoras, setMostrarGraciasPorHoras] = useState(false);

  const [alumno, setAlumno] = useState({
    nombre:'',fecha_nacimiento:'',localidad:'',provincia:'',
    escuela:'',escuela_tipo:'actual',
    nivel:'secundaria',anio_escolar:null,anio_inscripcion:null,
    situacion_academica:'en_curso',materias_adeuda:'',
    modalidad:null, // 'completo' | 'apoyo_escolar' | 'por_horas'
  });

  const [tutor, setTutor] = useState({
    nombre:'',relacion:'',email:'',telefono:'',frecuencia:'semanal',
  });

  const [diag, setDiag] = useState({
    estilo:null,dislexia:false,tdah:false,daltonismo:false,
    comprension:false,puntaje_logica:0,
  });

  const av = () => setTimeout(() => setPaso(p=>p+1), 10);
const volver = () => setTimeout(() => setPaso(p=>p-1), 10);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const handler = (e) => {
      if (e.key === 'ArrowRight') setTimeout(() => setPaso(p => Math.min(p+1, PASOS.length-1)), 50);
      if (e.key === 'ArrowLeft') setTimeout(() => setPaso(p => Math.max(p-1, 0)), 50);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const calcEdad = useCallback(fnac => {
    if(!fnac) return null;
    const hoy=new Date(); const nac=new Date(fnac);
    if(nac>hoy) return -1;
    let e=hoy.getFullYear()-nac.getFullYear();
    if(hoy.getMonth()-nac.getMonth()<0||
       (hoy.getMonth()===nac.getMonth()&&hoy.getDate()<nac.getDate())) e--;
    return e;
  },[]);

  const edadInfo = useCallback(edad => {
    if(edad===-1) return {tipo:'error',msg:'Fecha de nacimiento inválida.'};
    if(edad<5) return {tipo:'error',msg:'La edad ingresada no es válida para inscripción.'};
    if(edad<=14) return {tipo:'warn',msg:`⚠️ ${edad} años — se requerirá confirmación del adulto responsable por correo electrónico.`};
    if(edad<=17) return {tipo:'info',msg:`✓ ${edad} años — es obligatorio registrar los datos del adulto responsable.`};
    return {tipo:'ok',msg:`✓ ${edad} años — podés completar la inscripción de forma autónoma.`};
  },[]);

  const toggleLectura = i => {
    if(i===5){setLecturaSel([]);return;}
    setLecturaSel(p=>p.includes(i)?p.filter(x=>x!==i):[...p.filter(x=>x!==5),i]);
  };
  const toggleAtencion = i => {
    if(i===5){setAtencionSel([]);return;}
    setAtencionSel(p=>p.includes(i)?p.filter(x=>x!==i):[...p.filter(x=>x!==5),i]);
  };
  const toggleOpt = useCallback(id => {
    setOptativasSel(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  },[]);
  const togglePrem = useCallback(id => {
    setPremiumSel(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  },[]);
  const toggleApoyoEscolar = useCallback(id => {
    setApoyoEscolarSel(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  },[]);

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
  const eInfo = edad!==null ? edadInfo(edad) : null;
  const requiereTutor = edad!==null && edad<=17 && edad>=0;
  const grades = alumno.nivel==='primaria'
    ? ['1°','2°','3°','4°','5°','6°','7°']
    : ['1°','2°','3°','4°','5°','6°'];
  const materiasBase = (alumno.anio_inscripcion||alumno.anio_escolar)&&alumno.nivel
    ? (MATERIAS_BASE[alumno.nivel]?.[alumno.anio_inscripcion||alumno.anio_escolar]||[])
    : [];
  const resumen = alumno.modalidad === 'apoyo_escolar'
    ? calcularResumenApoyoEscolar(apoyoEscolarSel)
    : calcularResumen(alumno.anio_escolar||1, optativasSel, premiumSel);

  if (mostrarGraciasPorHoras) return wrap(card(
    <>
      <div className="text-5xl text-center mb-4">⏱️</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">¡Ya casi!</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        La modalidad <strong>Por Horas</strong> (consultas puntuales y preparación de exámenes)
        todavía la estamos armando. Mientras tanto podés inscribirte con Plan Completo o Apoyo Escolar.
      </p>
      <Btn outline onClick={()=>setMostrarGraciasPorHoras(false)}>← Elegir otra modalidad</Btn>
    </>
  ));

    if(pantalla==='inicio') return wrap(card(
    <>
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🎓</div>
        <h1 className="text-2xl font-bold text-purple-700 mb-1">Inscripción a iAcademia</h1>
        <p className="text-sm text-gray-400">Plataforma educativa personalizada con Inteligencia Artificial</p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-xs text-amber-800 leading-relaxed">
        <div className="font-bold mb-1">⚠️ Información importante</div>
        <p>Si el alumno tiene <strong>menos de 16 años</strong>, necesita la presencia o autorización de un adulto responsable. Si tiene <strong>16 años o más</strong>, puede completar la inscripción de forma autónoma. En todos los casos solicitamos los datos del adulto responsable para el seguimiento académico.</p>
      </div>
      <p className="text-sm font-semibold text-gray-700 mb-3">¿Quién está realizando esta inscripción?</p>
      <div className="flex flex-col gap-3 mb-6">
        {[
          {id:'alumno',emoji:'🧑‍🎓',titulo:'El alumno/a',desc:'Soy el estudiante que desea inscribirse'},
          {id:'tutor',emoji:'👨‍👩‍👧',titulo:'El padre, madre o tutor/a',desc:'Estoy inscribiendo a mi hijo/a o tutelado/a'},
        ].map(op=>(
          <button key={op.id} onClick={()=>setQuienCompleta(op.id)}
            className={`flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all
              ${quienCompleta===op.id?'border-purple-500 bg-purple-50 shadow-md':'border-gray-100 hover:border-gray-200'}`}>
            <span className="text-3xl">{op.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">{op.titulo}</div>
              <div className="text-xs text-gray-400 mt-0.5">{op.desc}</div>
            </div>
            {quienCompleta===op.id&&<span className="text-purple-500 text-xl font-bold">✓</span>}
          </button>
        ))}
      </div>
      <Btn onClick={()=>{if(!quienCompleta){alert('Seleccioná quién completa el formulario');return;}av();}}>
        Comenzar inscripción →
      </Btn>
      <p className="text-xs text-gray-400 text-center mt-3">⏱ El proceso completo tarda aproximadamente 10-15 minutos</p>
    </>
  ));

  // AVISO LEGAL
  if(pantalla==='aviso_legal') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-3">📋</div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Cómo funciona el proceso</h2>
      <div className="flex flex-col gap-3 mb-6">
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="font-semibold text-purple-700 text-sm mb-2">📌 El proceso tiene dos etapas:</div>
          <div className="flex flex-col gap-2 text-xs text-gray-600">
            <div className="flex gap-2"><span className="text-purple-500 font-bold flex-shrink-0">1.</span>
              <span><strong>Datos personales, materias y pago</strong> — podés volver atrás hasta completar el pago.</span></div>
            <div className="flex gap-2"><span className="text-purple-500 font-bold flex-shrink-0">2.</span>
              <span><strong>Evaluación diagnóstica</strong> — se realiza luego del pago. Una vez iniciada no se puede volver atrás.</span></div>
          </div>
        </div>
        <div className={`rounded-xl p-4 text-xs leading-relaxed ${quienCompleta==='alumno'?'bg-blue-50 text-blue-800':'bg-emerald-50 text-emerald-800'}`}>
          {quienCompleta==='alumno'
            ?<><div className="font-bold mb-1">🧑‍🎓 Completando como alumno</div>Si tenés menos de 16 años, necesitás tener a tu padre, madre o tutor presente. De igual manera solicitaremos sus datos para el seguimiento.</>
            :<><div className="font-bold mb-1">👨‍👩‍👧 Completando como responsable</div>Completarás los datos del alumno y luego los tuyos. Recibirás reportes automáticos de progreso según la frecuencia que elijas.</>}
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 border border-gray-100">
          <div className="font-semibold text-gray-700 mb-1">🔒 Privacidad y confidencialidad</div>
          Todos los datos son estrictamente confidenciales y se usan exclusivamente para personalizar la experiencia educativa. iAcademia no comparte información con terceros.
        </div>
      </div>
      
      <div className="flex gap-3">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={av}>Entendido, continuar →</Btn>
      </div>
    </>
  ));

  // MODALIDAD
  if(pantalla==='modalidad') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-3">🎯</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">¿Qué buscás con iAcademia?</h2>
      <p className="text-sm text-gray-500 mb-5">Elegí la modalidad que mejor se adapta a tu situación.</p>
      <div className="flex flex-col gap-3 mb-2">
        {[
          {id:'completo',emoji:'🎓',titulo:'Plan Completo',desc:'Reemplaza la escuela. Currículum completo del año, todas las materias obligatorias, tutor IA en cada una.'},
          {id:'apoyo_escolar',emoji:'📚',titulo:'Apoyo Escolar',desc:'Complementa tu escuela actual. Elegís puntualmente las materias en las que necesitás ayuda — la IA detecta dónde te trabás.'},
          {id:'por_horas',emoji:'⏱️',titulo:'Por Horas',desc:'Consultas puntuales y preparación de exámenes. Todavía estamos armando esta modalidad.'},
        ].map(m=>(
          <button key={m.id} onClick={()=>setAlumno(p=>({...p,modalidad:m.id}))}
            className={`flex items-start gap-3 p-4 border-2 rounded-xl text-left transition-all
              ${alumno.modalidad===m.id?'border-purple-500 bg-purple-50 shadow-md':'border-gray-100 hover:border-gray-200'}`}>
            <span className="text-2xl">{m.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-sm">{m.titulo}</div>
              <div className="text-xs text-gray-400 mt-0.5">{m.desc}</div>
            </div>
            {alumno.modalidad===m.id&&<span className="text-purple-500 text-lg font-bold">✓</span>}
          </button>
        ))}
      </div>
      <div className="flex gap-3 mt-3">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={()=>{
          if(!alumno.modalidad){alert('Elegí una modalidad para continuar');return;}
          if(alumno.modalidad==='por_horas'){setMostrarGraciasPorHoras(true);return;}
          av();
        }}>Continuar →</Btn>
      </div>
    </>
  ));

  // DATOS ALUMNO
  if(pantalla==='datos_alumno') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-2">👤</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Datos del alumno/a</h2>
      <p className="text-xs text-gray-400 mb-5">
        {quienCompleta==='tutor'?'Completá los datos del estudiante que vas a inscribir.':'Completá tus datos personales.'}
      </p>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Nombre completo" placeholder="Nombre y apellido" required value={alumno.nombre}
            onChange={e=>setAlumno(p=>({...p,nombre:e.target.value}))}/>
          <Inp label="Fecha de nacimiento" type="date" required value={alumno.fecha_nacimiento}
            onChange={e=>setAlumno(p=>({...p,fecha_nacimiento:e.target.value}))}/>
        </div>

        {eInfo&&(
          <div className={`text-xs px-3 py-2 rounded-lg font-medium ${
            eInfo.tipo==='error'?'bg-red-50 text-red-700':
            eInfo.tipo==='warn'?'bg-amber-50 text-amber-700':
            'bg-emerald-50 text-emerald-700'}`}>
            {eInfo.msg}
          </div>
        )}
        {eInfo?.tipo==='error'&&<p className="text-xs text-red-500">Corregí la fecha para continuar.</p>}

        <div className="grid grid-cols-2 gap-3">
          <Inp label="Localidad" required placeholder="Ej: Córdoba" value={alumno.localidad}
            onChange={e=>setAlumno(p=>({...p,localidad:e.target.value}))}/>
          <Sel label="Provincia" required value={alumno.provincia}
            onChange={e=>setAlumno(p=>({...p,provincia:e.target.value}))}>
            <option value="">Seleccioná...</option>
            {PROVINCIAS.map(pr=><option key={pr}>{pr}</option>)}
          </Sel>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Inp label="Escuela" placeholder="Nombre de la escuela" value={alumno.escuela}
            onChange={e=>setAlumno(p=>({...p,escuela:e.target.value}))}/>
          <Sel label="¿Actual o anterior?" value={alumno.escuela_tipo}
            onChange={e=>setAlumno(p=>({...p,escuela_tipo:e.target.value}))}>
            <option value="actual">Escuela actual</option>
            <option value="anterior">Escuela anterior</option>
            <option value="ninguna">No asiste actualmente</option>
          </Sel>
        </div>
        
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Nivel educativo <span className="text-red-400">*</span></label>
          <div className="grid grid-cols-2 gap-2">
            {[{id:'primaria',label:'🏫 Primaria'},{id:'secundaria',label:'🎓 Secundaria'}].map(n=>(
              <button key={n.id} onClick={()=>setAlumno(p=>({...p,nivel:n.id,anio_escolar:null}))}
                className={`p-3 border rounded-xl text-sm font-semibold transition-all
                  ${alumno.nivel===n.id?'border-purple-500 bg-purple-50 text-purple-700':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {n.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Año cursado o actualmente en curso <span className="text-red-400">*</span></label>
          <div className="grid grid-cols-4 gap-2">
            {grades.map((g,i)=>(
              <button key={i} onClick={()=>setAlumno(p=>({...p,anio_escolar:i+1, anio_inscripcion: p.anio_inscripcion || i+1}))}
                className={`p-2 border rounded-lg text-sm font-semibold transition-all
                  ${alumno.anio_escolar===i+1?'border-purple-500 bg-purple-50 text-purple-700':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Me inscribo en <span className="text-red-400">*</span></label>
          <p className="text-xs text-gray-400 mb-2">Generalmente es el año siguiente al cursado, salvo que repitas o tengas previas.</p>
          <div className="grid grid-cols-4 gap-2">
            {grades.map((g,i)=>(
              <button key={i} onClick={()=>setAlumno(p=>({...p,anio_inscripcion:i+1}))}
                className={`p-2 border rounded-lg text-sm font-semibold transition-all
                  ${alumno.anio_inscripcion===i+1?'border-emerald-500 bg-emerald-50 text-emerald-700':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
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

        {(alumno.situacion_academica==='con_previas'||alumno.situacion_academica==='repitente')&&(
          <Inp label="¿Qué materias adeuda o necesita reforzar?"
            placeholder="Ej: Matemática, Historia..."
            value={alumno.materias_adeuda}
            onChange={e=>setAlumno(p=>({...p,materias_adeuda:e.target.value}))}/>
        )}
      </div>

      <div className="flex gap-3 mt-5">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={()=>{
          if(!alumno.nombre||!alumno.fecha_nacimiento||!alumno.localidad||!alumno.anio_escolar||!alumno.anio_inscripcion){
            alert('Completá los campos obligatorios (*)');return;
          }
          if(eInfo?.tipo==='error'){alert('Corregí la fecha de nacimiento.');return;}
          av();
        }}>Continuar →</Btn>
      </div>
    </>
  ));

  // DATOS TUTOR
  if(pantalla==='datos_tutor') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-2">👨‍👩‍👧</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Adulto responsable</h2>
      <p className="text-xs text-gray-400 mb-4">
        {quienCompleta==='tutor'?'Completá tus datos como responsable del alumno.':'Completá los datos de tu padre, madre o tutor/a.'}
      </p>
      {requiereTutor&&edad<=14&&(
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-xs text-amber-800">
          ⚠️ El alumno tiene {edad} años. Se enviará un correo al responsable para confirmar la inscripción.
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Inp label="Nombre completo" required placeholder="Nombre del responsable" value={tutor.nombre}
            onChange={e=>setTutor(p=>({...p,nombre:e.target.value}))}/>
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
          onChange={e=>setTutor(p=>({...p,email:e.target.value}))}/>
        <Inp label="Teléfono de contacto" type="tel" placeholder="Ej: 351-1234567" value={tutor.telefono}
          onChange={e=>setTutor(p=>({...p,telefono:e.target.value}))}/>
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">Frecuencia de reportes de progreso</label>
          <div className="grid grid-cols-3 gap-2">
            {[{id:'diario',l:'📅 Diario'},{id:'semanal',l:'📆 Semanal'},{id:'mensual',l:'🗓️ Mensual'}].map(f=>(
              <button key={f.id} onClick={()=>setTutor(p=>({...p,frecuencia:f.id}))}
                className={`p-2.5 border rounded-xl text-xs font-semibold transition-all
                  ${tutor.frecuencia===f.id?'border-purple-500 bg-purple-50 text-purple-700':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {f.l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={()=>{
          if(!tutor.nombre||!tutor.relacion||!tutor.email){alert('Completá los campos obligatorios (*)');return;}
          av();
        }}>Continuar →</Btn>
      </div>
    </>
  ));

  // MATERIAS — Apoyo Escolar: elección simple de materias puntuales, sin base/optativas/premium.
  if(pantalla==='materias' && alumno.modalidad==='apoyo_escolar') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-2">📚</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">¿En qué materias necesitás apoyo?</h2>
      <p className="text-xs text-gray-400 mb-5">Elegí una o más. Podés sumar o sacar materias después desde el panel.</p>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {MATERIAS_APOYO.map(m=>{
          const sel=apoyoEscolarSel.includes(m.id);
          return (
            <button key={m.id} onClick={()=>toggleApoyoEscolar(m.id)}
              className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 text-left transition-all
                ${sel?'border-purple-400 bg-purple-50':'border-gray-200 hover:border-purple-200'}`}>
              <span className="text-lg">{m.emoji}</span>
              <span className={`text-xs font-medium flex-1 ${sel?'text-purple-700':'text-gray-600'}`}>{m.nombre}</span>
              {sel&&<span className="text-purple-500 text-xs">✓</span>}
            </button>
          );
        })}
      </div>
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-5 flex items-center justify-between">
        <div className="text-xs text-gray-600">
          <span className="font-semibold text-gray-800">{resumen.cantidad}</span> materia{resumen.cantidad===1?'':'s'} — ${fmt(PRECIOS.APOYO_ESCOLAR_MENSUAL)}/mes c/u
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-purple-700">${fmt(resumen.total)}<span className="text-xs font-normal text-gray-400">/mes</span></div>
        </div>
      </div>
      <div className="flex gap-3">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={()=>{if(apoyoEscolarSel.length===0){alert('Elegí al menos una materia');return;}av();}}>Ver resumen y pagar →</Btn>
      </div>
    </>
  ));

  // MATERIAS — Plan Completo
  if(pantalla==='materias') return wrap(
    <div className="bg-white rounded-2xl border border-gray-100 p-7 w-full max-w-3xl shadow-xl">
      <Barra paso={paso}/>
      <div className="text-3xl mb-2">📚</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Selección de materias</h2>
      <p className="text-xs text-gray-400 mb-5">
        Las materias base son obligatorias según tu año. Sumá optativas y premium según tu interés.
      </p>

      {/* BASE */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">✓ Obligatorias</span>
          <span className="text-sm font-bold text-gray-700">
            Materias base — {alumno.nivel==='primaria'?'Primaria':'Secundaria'} {alumno.anio_escolar}° año
          </span>
          <span className="ml-auto text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
            ${fmt(calcularPrecioBase(alumno.anio_escolar))}/mes
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {materiasBase.map(m=>(
            <button key={m} onClick={()=>{setMateriaDetalle({nombre: m, id: m});setTipoDetalle('base');}}
  className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 hover:border-emerald-400 transition-all text-left w-full">
  <span className="text-emerald-500 text-xs">✓</span>
  <span className="text-xs font-medium text-emerald-700 flex-1">{m}</span>
  <span className="text-xs text-emerald-400">ver →</span>
</button>
))}
</div>
      </div>

      {/* OPTATIVAS */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Elegí libremente</span>
          <span className="text-sm font-bold text-gray-700">Materias optativas</span>
          <span className="ml-auto text-xs text-gray-400">{optativasSel.length} seleccionadas</span>
        </div>

        {/* Banner descuento dentro de optativas */}
        {optativasSel.length>0&&(
          <div className={`mb-3 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2
            ${optativasSel.length>=8?'bg-green-50 text-green-700':
              optativasSel.length>=6?'bg-emerald-50 text-emerald-700':
              optativasSel.length>=4?'bg-blue-50 text-blue-700':
              'bg-gray-50 text-gray-500'}`}>
            {optativasSel.length>=8?'🎉 −20% aplicado (8+ optativas)':
             optativasSel.length>=6?'🎊 −15% aplicado (6+ optativas)':
             optativasSel.length>=4?'✨ −10% aplicado (4+ optativas)':
             `Agregá ${4-optativasSel.length} más para obtener 10% de descuento`}
          </div>
        )}

        {['Tecnología','Arte','Humanidades','Ciencia','Economía','Bienestar','Idiomas','Estrategia'].map(cat=>{
          const items=OPTATIVAS.filter(o=>o.cat===cat);
          if(!items.length) return null;
          return (
            <div key={cat} className="mb-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{cat}</div>
              <div className="grid grid-cols-3 gap-1.5">
                {items.map(m=>{
                  const sel=optativasSel.includes(m.id);
                  const bloqueada=alumno.anio_escolar&&m.yr>alumno.anio_escolar;
                  return (
                    <button key={m.id}
                      onClick={()=>!bloqueada&&toggleOpt(m.id)}
                      style={{transition:'transform 150ms'}}
                      onMouseDown={e=>!bloqueada&&(e.currentTarget.style.transform='scale(0.97)')}
                      onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
                      className={`flex items-center gap-2 border rounded-xl px-2.5 py-2 text-left transition-all
                        ${bloqueada?'border-gray-100 opacity-55 cursor-not-allowed':
                          sel?'border-purple-400 bg-purple-50':'border-gray-200 hover:border-purple-200'}`}>
                      <span className="text-sm">{m.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <span onClick={e=>{e.stopPropagation();setMateriaDetalle(m);setTipoDetalle('optativa');}}
                          className="text-xs text-gray-400 hover:text-purple-500 block mb-0.5 cursor-pointer">ver info →</span>
                        <span className={`text-xs font-medium leading-tight block truncate
                          ${sel?'text-purple-700':'text-gray-600'}`}>{m.nombre}</span>
                        {bloqueada&&<span className="text-xs text-gray-400">Desde {m.yr}° año</span>}
                        
                      </div>
                      {sel&&<span className="text-purple-500 text-xs flex-shrink-0" style={{opacity:sel?1:0,transition:'opacity 200ms'}}>✓</span>}
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
          {PREMIUM_LIST.map(m=>{
            const sel=premiumSel.includes(m.id);
            const precio=PRECIOS.PREMIUM[m.id]||3500;
            return (
              <button key={m.id} onClick={()=>togglePrem(m.id)}
                style={{transition:'transform 150ms'}}
                onMouseDown={e=>e.currentTarget.style.transform='scale(0.97)'}
                onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
                className={`flex items-center gap-3 border rounded-xl px-3 py-2.5 text-left transition-all
                  ${sel?'border-amber-400 bg-amber-50':'border-gray-200 hover:border-amber-200'}`}>
                <span className="text-lg">{m.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-medium leading-tight block ${sel?'text-amber-700':'text-gray-600'}`}>{m.nombre}</span>
                  <span className="text-xs text-gray-400">${fmt(precio)}/mes</span>
                </div>
                <span onClick={e=>{e.stopPropagation();setMateriaDetalle(m);setTipoDetalle('premium');}}
                  className="text-xs text-amber-400 hover:text-amber-600 flex-shrink-0 cursor-pointer">ver →</span>
                {sel&&<span className="text-amber-500 text-xs font-bold flex-shrink-0">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resumen inferior */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-5 flex items-center justify-between">
        <div className="text-xs text-gray-600">
          <span className="font-semibold text-gray-800">{materiasBase.length + optativasSel.length + premiumSel.length}</span> materias seleccionadas
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-purple-700">${fmt(resumen.total)}<span className="text-xs font-normal text-gray-400">/mes</span></div>
          <div className="text-xs text-gray-400">≈ ${fmt(resumen.totalAnual)}/año</div>
        </div>
      </div>

      <div className="flex gap-3">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={av}>Ver resumen y pagar →</Btn>{materiaDetalle && (
        <MateriaDetalle
          materia={materiaDetalle}
          tipo={tipoDetalle}
          anioActual={alumno.anio_inscripcion||alumno.anio_escolar}
          seleccionada={tipoDetalle==='optativa'?optativasSel.includes(materiaDetalle?.id):premiumSel.includes(materiaDetalle?.id)}
          onAgregar={tipoDetalle==='optativa'?()=>toggleOpt(materiaDetalle.id):tipoDetalle==='premium'?()=>togglePrem(materiaDetalle.id):null}
          onClose={()=>setMateriaDetalle(null)}
        />
      )} 
      </div>
    </div>
  );

  // CHECKOUT — Apoyo Escolar
  if(pantalla==='checkout' && alumno.modalidad==='apoyo_escolar') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">🧾</div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Resumen de tu plan de Apoyo Escolar</h2>
          <p className="text-xs text-gray-400">Revisá los detalles antes de continuar al pago</p>
        </div>
      </div>
      <div className="mb-4">
        {apoyoEscolarSel.map(id=>{
          const m=MATERIAS_APOYO.find(x=>x.id===id);
          return m?(
            <div key={id} className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <div className="flex items-center gap-2"><span>{m.emoji}</span><span className="text-xs text-gray-700">{m.nombre}</span></div>
              <span className="text-xs text-gray-500">${fmt(PRECIOS.APOYO_ESCOLAR_MENSUAL)}</span>
            </div>
          ):null;
        })}
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-gray-800">Total mensual</span>
          <span className="text-2xl font-bold text-purple-700">${fmt(resumen.total)}</span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Proyección anual</span>
          <span>${fmt(resumen.totalAnual)}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <Btn outline onClick={()=>setPaso(PASOS.indexOf('materias'))}>✏️ Editar materias</Btn>
        <Btn onClick={av}>Continuar al pago →</Btn>
      </div>
    </>
  ));

  // CHECKOUT — Plan Completo
  if(pantalla==='checkout') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">🧾</div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Resumen de tu plan</h2>
          <p className="text-xs text-gray-400">Revisá los detalles antes de continuar al pago</p>
        </div>
      </div>

      {/* Base */}
      <div className="mb-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <div>
            <div className="text-sm font-semibold text-gray-800">Plan base — {alumno.nivel} {alumno.anio_escolar}° año</div>
            <div className="text-xs text-gray-400">{materiasBase.length} materias obligatorias incluidas</div>
          </div>
          <div className="text-sm font-bold text-gray-800">${fmt(resumen.precioBase)}</div>
        </div>
      </div>

      {/* Optativas */}
      {optativasSel.length>0&&(
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Materias optativas</div>
          {optativasSel.map(id=>{
            const m=OPTATIVAS.find(o=>o.id===id);
            return m?(
              <div key={id} className="flex justify-between items-center py-1.5">
                <div className="flex items-center gap-2">
                  <span>{m.emoji}</span>
                  <span className="text-xs text-gray-700">{m.nombre}</span>
                </div>
                <span className="text-xs text-gray-500">${fmt(PRECIOS.OPTATIVA_MENSUAL)}</span>
              </div>
            ):null;
          })}
          {resumen.descPct>0&&(
            <div className="flex justify-between items-center py-1.5 text-emerald-600">
              <span className="text-xs font-medium">Descuento por volumen ({Math.round(resumen.descPct*100)}%)</span>
              <span className="text-xs font-bold">−${fmt(resumen.precioOptBruto-resumen.precioOptDesc)}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-1.5 border-t border-gray-100 mt-1">
            <span className="text-xs font-semibold text-gray-600">Subtotal optativas</span>
            <div className="text-right">
              {resumen.descPct>0&&<span className="text-xs text-gray-400 line-through mr-2">${fmt(resumen.precioOptBruto)}</span>}
              <span className="text-sm font-bold text-gray-800">${fmt(resumen.precioOptDesc)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Premium */}
      {premiumSel.length>0&&(
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Materias premium</div>
          {premiumSel.map(id=>{
            const m=PREMIUM_LIST.find(p=>p.id===id);
            const precio=PRECIOS.PREMIUM[id]||3500;
            return m?(
              <div key={id} className="flex justify-between items-center py-1.5">
                <div className="flex items-center gap-2">
                  <span>{m.emoji}</span>
                  <span className="text-xs text-gray-700">{m.nombre}</span>
                </div>
                <span className="text-xs text-gray-500">${fmt(precio)}</span>
              </div>
            ):null;
          })}
          <div className="flex justify-between items-center py-1.5 border-t border-gray-100 mt-1">
            <span className="text-xs font-semibold text-gray-600">Subtotal premium</span>
            <span className="text-sm font-bold text-gray-800">${fmt(resumen.precioPremium)}</span>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-gray-800">Total mensual</span>
          <span className="text-2xl font-bold text-purple-700">${fmt(resumen.total)}</span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Proyección anual</span>
          <span>${fmt(resumen.totalAnual)}</span>
        </div>
        <div className="mt-2 pt-2 border-t border-purple-200">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs font-semibold text-purple-700">🎁 Pago anual — ahorrás 15%</div>
              <div className="text-xs text-gray-400">En lugar de ${fmt(resumen.totalAnual)}</div>
            </div>
            <span className="text-sm font-bold text-purple-700">${fmt(resumen.totalAnualConDesc)}/año</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Btn outline onClick={()=>setPaso(PASOS.indexOf('materias'))}>✏️ Editar selección</Btn>
        <Btn onClick={av}>Continuar al pago →</Btn>
      </div>
    </>
  ));

  // PAGO
  if(pantalla==='pago') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-3">💳</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Método de pago</h2>
      <p className="text-sm text-gray-400 mb-5">Elegí cómo querés abonar tu suscripción a iAcademia.</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          {id:'tarjeta',emoji:'💳',label:'Tarjeta crédito / débito'},
          {id:'mercadopago',emoji:'🔵',label:'MercadoPago'},
          {id:'transferencia',emoji:'🏦',label:'Transferencia bancaria'},
          {id:'efectivo',emoji:'💵',label:'Rapipago / Pago Fácil'},
        ].map(m=>(
          <button key={m.id} onClick={()=>setMetodoPago(m.id)}
            className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all text-center
              ${metodoPago===m.id?'border-purple-400 bg-purple-50 shadow-md':'border-gray-100 hover:border-gray-200'}`}>
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-xs font-semibold text-gray-700 leading-tight">{m.label}</span>
            {metodoPago===m.id&&<span className="text-purple-500 text-xs font-bold">✓ Seleccionado</span>}
          </button>
        ))}
      </div>

      {metodoPago==='tarjeta'&&(
        <div className="flex flex-col gap-2 mb-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Inp label="Número de tarjeta" placeholder="0000 0000 0000 0000" value="" onChange={()=>{}}/>
          <div className="grid grid-cols-2 gap-3">
            <Inp label="Vencimiento" placeholder="MM/AA" value="" onChange={()=>{}}/>
            <Inp label="CVV" placeholder="123" value="" onChange={()=>{}}/>
          </div>
          <Inp label="Nombre en la tarjeta" placeholder="Como figura en la tarjeta" value="" onChange={()=>{}}/>
        </div>
      )}
      {metodoPago==='mercadopago'&&(
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4 text-sm text-blue-800 text-center">
          <div className="text-2xl mb-1">🔵</div>
          Al confirmar serás redirigido a MercadoPago para completar el pago de forma segura.
        </div>
      )}
      {metodoPago==='transferencia'&&(
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-xs text-gray-700 flex flex-col gap-1">
          <div className="font-bold text-gray-800 mb-1">Datos para transferencia:</div>
          <div><strong>CBU:</strong> 0000000000000000000000</div>
          <div><strong>Alias:</strong> IACADEMIA.EDU</div>
          <div><strong>Titular:</strong> iAcademia</div>
          <div className="text-gray-400 mt-1">Enviá el comprobante a pagos@iacademia.com.ar</div>
        </div>
      )}
      {metodoPago==='efectivo'&&(
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-xs text-gray-700 text-center">
          <div className="text-2xl mb-1">💵</div>
          Te enviaremos un código de pago a tu email para abonar en cualquier Rapipago o Pago Fácil.
        </div>
      )}

      <div className="bg-purple-50 rounded-xl p-3 mb-5 flex items-center justify-between">
        <div className="text-sm text-gray-700">Total mensual</div>
        <div className="font-bold text-purple-700 text-lg">${fmt(resumen.total)} <span className="text-xs font-normal text-gray-400">ARS</span></div>
      </div>

      <div className="flex gap-3">
        <Btn outline onClick={volver}>← Volver</Btn>
        <Btn onClick={()=>{if(!metodoPago){alert('Seleccioná un método de pago');return;}av();}}>
          Confirmar pago →
        </Btn>
      </div>
      <p className="text-xs text-gray-400 text-center mt-2">🔒 Pago seguro · Podés cancelar tu suscripción cuando quieras</p>
    </>
  ));

  // AVISO DIAGNÓSTICO
  if(pantalla==='aviso_diagnostico') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-5xl text-center mb-4">✅</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">¡Pago confirmado!</h2>
      <p className="text-sm text-gray-500 text-center mb-5">Ahora realizarás la evaluación diagnóstica.</p>

      {/* Banner fijo — autoría del diagnóstico */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 flex gap-3">
        <span className="text-2xl flex-shrink-0">🧑‍🎓</span>
        <div>
          <div className="font-bold text-blue-800 text-sm mb-1">Este diagnóstico debe ser completado por el alumno</div>
          <p className="text-xs text-blue-700 leading-relaxed">El objetivo es conocer tu perfil de aprendizaje, intereses y fortalezas para personalizar tu experiencia educativa. Pedile a un adulto que te acompañe si lo necesitás, pero las respuestas deben ser tuyas.</p>
        </div>
      </div>

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
        ⚠️ <strong>Importante:</strong> una vez que iniciés la evaluación no podrás volver atrás a modificar los datos anteriores.
      </div>
      <div className="flex flex-col gap-2">
        <Btn outline onClick={volver}>← Volver y revisar datos</Btn>
        <Btn onClick={av}>Iniciar evaluación diagnóstica →</Btn>
      </div>
      <p className="text-xs text-gray-400 text-center mt-3">⏱ Tarda aproximadamente 3-4 minutos</p>
    </>
  ));

  // ESTILO
  if(pantalla==='estilo') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-3">🧠</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">¿Cómo aprendés mejor?</h2>
      <p className="text-sm text-gray-500 mb-5">Elegí la opción que más se parezca a vos.</p>
      <div className="flex flex-col gap-3">
        {[
          {id:'visual',emoji:'👁️',titulo:'Con imágenes y diagramas',desc:'Entiendo mejor con esquemas, mapas o gráficos'},
          {id:'auditivo',emoji:'🎧',titulo:'Escuchando explicaciones',desc:'Me queda mejor cuando alguien me lo explica'},
          {id:'lectura',emoji:'📖',titulo:'Leyendo y escribiendo',desc:'Aprendo mejor leyendo y tomando notas'},
          {id:'practico',emoji:'✋',titulo:'Practicando y resolviendo',desc:'Entiendo cuando resuelvo ejercicios yo mismo'},
        ].map(e=>(
          <button key={e.id} onClick={()=>{setDiag(p=>({...p,estilo:e.id}));av();}}
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
  if(pantalla==='lectura') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-3">📝</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Evaluación de lectura</h2>
      <p className="text-sm text-gray-500 mb-1">Marcá todo lo que aplique al alumno.</p>
      <p className="text-xs text-purple-600 mb-4">Podés seleccionar más de una opción</p>
      <div className="flex flex-col gap-2 mb-5">
        {['A veces confunde letras parecidas (b/d, p/q)','Le cuesta leer en voz alta','Las palabras parecen moverse o borrarse','Necesita releer varias veces para entender','Se cansa mucho leyendo','Ninguna de las anteriores'].map((op,i)=>(
          <Check key={i} label={op}
            checked={(i===5&&lecturaSel.length===0)||lecturaSel.includes(i)}
            onClick={()=>toggleLectura(i)}/>
        ))}
      </div>
      <Btn onClick={()=>{setDiag(p=>({...p,dislexia:lecturaSel.length>=2}));av();}}>Continuar →</Btn>
    </>
  ));

  // ATENCIÓN
  if(pantalla==='atencion') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-3">⚡</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Evaluación de atención</h2>
      <p className="text-sm text-gray-500 mb-1">Marcá todo lo que aplique al alumno.</p>
      <p className="text-xs text-purple-600 mb-4">Podés seleccionar más de una opción</p>
      <div className="flex flex-col gap-2 mb-5">
        {['Le cuesta mantener la atención por mucho tiempo','Se distrae fácilmente','Empieza tareas pero le cuesta terminarlas','A veces actúa sin pensar primero','Necesita moverse mientras estudia','Ninguna de las anteriores'].map((op,i)=>(
          <Check key={i} label={op}
            checked={(i===5&&atencionSel.length===0)||atencionSel.includes(i)}
            onClick={()=>toggleAtencion(i)}/>
        ))}
      </div>
      <Btn onClick={()=>{setDiag(p=>({...p,tdah:atencionSel.length>=3}));av();}}>Continuar →</Btn>
    </>
  ));

  // COLORES
  if(pantalla==='colores') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-3">🎨</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Test de percepción visual</h2>
      <p className="text-sm text-gray-500 mb-5">Respondé según lo que ves. No hay respuestas incorrectas.</p>
      <div className="rounded-xl p-8 mb-4 flex items-center justify-center" style={{background:COLORES_TEST[colorIdx].fondo}}>
        <div className="w-28 h-28 rounded-full" style={{background:COLORES_TEST[colorIdx].circulo}}/>
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
          <div key={i} className={`w-2 h-2 rounded-full ${i<=colorIdx?'bg-purple-500':'bg-gray-200'}`}/>
        ))}
      </div>
    </>
  ));

  // LÓGICA
  if(pantalla==='logica'){
    const preg=logicaPregs[logicaIdx];
    return wrap(card(
      <>
        <Barra paso={paso}/>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">🧩</div>
          <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full font-semibold">{logicaIdx+1}/{logicaPregs.length}</div>
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
            <div key={i} className={`w-2 h-2 rounded-full ${i<logicaIdx?'bg-purple-500':i===logicaIdx?'bg-purple-300':'bg-gray-200'}`}/>
          ))}
        </div>
      </>
    ));
  }

  // COMPRENSIÓN
  if(pantalla==='comprension') return wrap(card(
    <>
      <Barra paso={paso}/>
      <div className="text-3xl mb-3">💭</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Comprensión lectora</h2>
      <p className="text-sm text-gray-500 mb-4">Leé el texto y respondé la pregunta.</p>
      <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
        "El agua es fundamental para la vida. Cubre el 71% de la superficie terrestre y es el componente principal de los seres vivos. Sin agua, ningún organismo podría sobrevivir más de pocos días."
      </div>
      <p className="text-sm font-semibold text-gray-700 mb-4">¿Cuál es la idea principal del texto?</p>
      <div className="flex flex-col gap-2">
        {[
          {txt:'El agua cubre el 71% de la Tierra',ok:false},
          {txt:'El agua es esencial para la vida',ok:true},
          {txt:'Los organismos viven pocos días sin agua',ok:false},
          {txt:'La Tierra tiene mucha agua',ok:false},
        ].map((op,i)=>(
          <button key={i} onClick={()=>{setDiag(p=>({...p,comprension:!op.ok}));av();}}
            className="p-3 border border-gray-200 rounded-xl text-sm text-left font-medium hover:border-purple-400 hover:bg-purple-50 transition-all">
            {op.txt}
          </button>
        ))}
      </div>
    </>
  ));

  // BIENVENIDA
  if(pantalla==='bienvenida'){
    const adaptaciones=calcAdaptaciones();
    const nivelLogica=diag.puntaje_logica>=3?'Alto':diag.puntaje_logica>=2?'Medio':'Básico';
    const esApoyoEscolar = alumno.modalidad === 'apoyo_escolar';
    const datosFinales={
      ...alumno,tutor,...diag,adaptaciones,
      quien_completo:quienCompleta,
      materias_base: esApoyoEscolar ? [] : materiasBase,
      materias_optativas: esApoyoEscolar ? [] : optativasSel,
      materias_premium: esApoyoEscolar ? [] : premiumSel,
      materias_apoyo_escolar: esApoyoEscolar ? apoyoEscolarSel : [],
      metodo_pago:metodoPago,
      plan_mensual:resumen.total,
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
              <div className="text-xs text-gray-400 mb-0.5">Plan</div>
              <div className="text-xs font-bold text-purple-700">${fmt(resumen.total)}/mes</div>
            </div>
          </div>
          {adaptaciones.length>0&&(
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
              <div className="text-xs text-amber-700 font-bold mb-1.5">⚡ Adaptaciones activadas:</div>
              <div className="flex flex-wrap gap-1">
                {adaptaciones.map((a,i)=>(
                  <span key={i} className="text-xs bg-white border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          )}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-700">
            ✉️ Se envió confirmación a <strong>{tutor.email}</strong>
          </div>
        </div>
        <button onClick={()=>onComplete(datosFinales)}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors text-base shadow-lg">
          Comenzar mi educación →
        </button>
      </>
    ));
  }
}