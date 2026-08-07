import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import TutorIA from './TutorIA';
import Materias from './Materias';
import Progreso from './Progreso';
import Logros from './Logros';
import Diagnostico from './Diagnostico';
import PanelTutor from './PanelTutor';
import { calcularXP, calcularNivel, tituloNivel, calcularPromedioGeneral, contarEjerciciosCompletados, calcularPctMateria } from './gamificacion';
import { CONTENIDO_EDUCATIVO } from './ContenidoEducativo';

const MATERIAS = Object.entries(CONTENIDO_EDUCATIVO).map(([id, m]) => ({
  id, nombre: m.nombre, emoji: m.emoji, color: m.color, text: m.text, bar: m.bar,
}));
const ID_POR_NOMBRE = Object.fromEntries(Object.entries(CONTENIDO_EDUCATIVO).map(([id, m]) => [m.nombre, id]));

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [pantalla, setPantalla] = useState('login');
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [navActivo, setNavActivo] = useState('inicio');
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const snap = await getDoc(doc(db, 'usuarios', fbUser.uid));
        const data = snap.data();
        if (data) {
          setUsuario(data);
          setPantalla(data.diagnostico_completo ? 'dashboard' : 'diagnostico');
        } else {
          setUsuario({ uid: fbUser.uid });
          setPantalla('diagnostico');
        }
      } else {
        setUsuario(null);
        setPantalla('login');
      }
      setCargandoSesion(false);
    });
    return unsub;
  }, []);

  const rachaActualizada = useRef(false);
  useEffect(() => {
    if (rachaActualizada.current || !usuario?.uid || pantalla !== 'dashboard') return;
    rachaActualizada.current = true;
    const hoy = new Date().toISOString().slice(0, 10);
    if (usuario.ultima_actividad === hoy) return;
    const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const nuevaRacha = usuario.ultima_actividad === ayer ? (usuario.racha_dias || 0) + 1 : 1;
    const cambios = { racha_dias: nuevaRacha, ultima_actividad: hoy };
    setUsuario(prev => ({ ...prev, ...cambios }));
    updateDoc(doc(db, 'usuarios', usuario.uid), cambios).catch(e => console.error('Error actualizando racha:', e));
  }, [usuario, pantalla]);

  const registrar = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'usuarios', res.user.uid), {
        uid: res.user.uid, nombre, email,
        anio_escolar: 1, nivel_xp: 0, racha_dias: 0,
        materias_activas: MATERIAS.map(m => m.id),
        diagnostico_completo: false,
        fecha_registro: new Date()
      });
      setUsuario({ uid: res.user.uid, nombre, diagnostico_completo: false });
      setPantalla('diagnostico');
    } catch(e) { setError('Error: ' + e.message); }
  };

  const login = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, 'usuarios', res.user.uid));
      const data = snap.data();
      setUsuario(data);
      if (data?.diagnostico_completo) {
        setPantalla('dashboard');
      } else {
        setPantalla('diagnostico');
      }
    } catch(e) { setError('Email o contraseña incorrectos'); }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    setUsuario(null);
    setPantalla('login');
    setTab('login');
  };

  if (cargandoSesion) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-3xl animate-pulse">🎓</div>
    </div>
  );

  if (pantalla === 'diagnostico') return (
    <Diagnostico onComplete={async (datosFinales) => {
      setUsuario(prev => ({ ...prev, ...datosFinales, diagnostico_completo: true }));
      try {
        await setDoc(doc(db, 'usuarios', usuario.uid), {
          ...datosFinales,
          diagnostico_completo: true,
        }, { merge: true });
      } catch(e) {
        console.error('Error guardando diagnóstico:', e);
      }
      setPantalla('dashboard');
    }} />
  );

  if (pantalla === 'dashboard') {
    const anio = usuario?.anio_inscripcion || usuario?.anio_escolar || 3;
    const xp = calcularXP(usuario?.progreso);
    const { nivel, faltan, pct: pctNivel } = calcularNivel(xp);
    const promedio = calcularPromedioGeneral(anio, usuario?.progreso);
    const ejerciciosCompletados = contarEjerciciosCompletados(usuario?.progreso, anio);
    return (
      <div className="flex h-screen bg-gray-50 font-sans text-sm overflow-hidden">
        <div className="w-48 bg-white border-r border-gray-100 flex flex-col p-3 flex-shrink-0">
          <div className="flex items-center gap-2 px-2 mb-5 mt-1">
            <span className="text-xl">🎓</span>
            <span className="font-semibold text-purple-700 text-base">iAcademia</span>
          </div>
          {[
            {id:'inicio', icon:'🏠', label:'Inicio'},
            {id:'tutor', icon:'🤖', label:'Tutor IA'},
            {id:'materias', icon:'📚', label:'Mis materias'},
            {id:'progreso', icon:'📈', label:'Mi progreso'},
            {id:'logros', icon:'🏆', label:'Logros'},
            {id:'tutor_panel', icon:'👨‍👩‍👧', label:'Panel tutor'},
          ].map(n => (
            <button key={n.id} onClick={() => setNavActivo(n.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 text-left transition-colors ${navActivo === n.id ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}>
              <span>{n.icon}</span>{n.label}
            </button>
          ))}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <button onClick={cerrarSesion} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-50 w-full">
              <span>🚪</span>Salir
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center justify-between">
            <span className="font-medium text-gray-800">
              Buenos días, {usuario?.nombre || usuario?.nombre_completo} 👋
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">🔥 {usuario?.racha_dias || 0} día{(usuario?.racha_dias || 0) === 1 ? '' : 's'} seguidos</span>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-xs">
                {(usuario?.nombre || usuario?.nombre_completo || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {navActivo === 'inicio' && (
              <div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
  {n: usuario?.materias_base?.length || usuario?.materias_activas?.length || 6, l:'Materias activas'},
  {n: promedio+'%', l:'Progreso promedio'},
  {n: ejerciciosCompletados, l:'Ejercicios completados'}
].map((s,i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-gray-100">
                      <div className="text-2xl font-semibold text-gray-800">{s.n}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Mis materias</div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {(usuario?.materias_base?.length > 0
  ? usuario.materias_base.map((nombre) => {
      const id = ID_POR_NOMBRE[nombre];
      if (!id) return { id: nombre, nombre, emoji: '📚', color: 'bg-gray-100', text: 'text-gray-500', bar: 'bg-gray-400', pct: 0, unidad: 'Sin contenido aún' };
      return {
        id, nombre, emoji: CONTENIDO_EDUCATIVO[id].emoji, color: CONTENIDO_EDUCATIVO[id].color,
        text: CONTENIDO_EDUCATIVO[id].text, bar: CONTENIDO_EDUCATIVO[id].bar,
        pct: calcularPctMateria(id, anio, usuario?.progreso),
        unidad: CONTENIDO_EDUCATIVO[id].años[anio]?.titulo || 'Sin contenido aún',
      };
    })
  : MATERIAS.map(m => ({ ...m, pct: calcularPctMateria(m.id, anio, usuario?.progreso), unidad: CONTENIDO_EDUCATIVO[m.id]?.años[anio]?.titulo || '' }))
).map(m => (
  <div key={m.id || m.nombre} className="bg-white border border-gray-100 rounded-xl p-3 cursor-pointer hover:border-purple-200 transition-colors">
    <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center mb-2`}>{m.emoji}</div>
    <div className="font-medium text-gray-800 text-xs mb-0.5">{m.nombre}</div>
    <div className="text-xs text-gray-400 mb-2">{m.unidad}</div>
    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${m.bar} rounded-full`} style={{width: m.pct+'%'}}></div>
    </div>
    <div className={`text-xs mt-1 font-medium ${m.text}`}>{m.pct}%</div>
  </div>
))}
                </div>
                <div className="bg-purple-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">Nivel {nivel} — {tituloNivel(nivel)}</div>
                      <div className="text-purple-200 text-xs mt-0.5">{xp} XP · faltan {faltan} XP para Nivel {nivel + 1}</div>
                    </div>
                    <div className="text-3xl">⭐</div>
                  </div>
                  <div className="h-2 bg-purple-500 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{width: pctNivel+'%'}}></div>
                  </div>
                  <div className="text-xs text-purple-200 mt-1 text-right">{pctNivel}%</div>
                </div>
              </div>
            )}
            {navActivo === 'tutor' && <TutorIA usuario={usuario} />}
            {navActivo === 'materias' && <Materias usuario={usuario} onProgresoActualizado={(materiaId, prog) => {
              setUsuario(prev => ({ ...prev, progreso: { ...prev?.progreso, [materiaId]: prog } }));
            }} />}
            {navActivo === 'progreso' && <Progreso usuario={usuario} />}
            {navActivo === 'logros' && <Logros usuario={usuario} />}
            {navActivo === 'tutor_panel' && <PanelTutor usuario={usuario} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-sm shadow-sm">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🎓</div>
          <h1 className="text-xl font-semibold text-purple-700">iAcademia</h1>
          <p className="text-xs text-gray-400 mt-1">Tu tutor personalizado para la secundaria</p>
        </div>
        <div className="flex bg-gray-50 rounded-lg p-1 gap-1 mb-5">
          {['login','registro'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${tab === t ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400'}`}>
              {t === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          ))}
        </div>
        {tab === 'registro' && (
          <input placeholder="Nombre completo" value={nombre} onChange={e => setNombre(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-purple-400"/>
        )}
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-purple-400"/>
        <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 outline-none focus:border-purple-400"/>
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <button onClick={tab === 'login' ? login : registrar}
          className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          {tab === 'login' ? 'Entrar a iAcademia' : 'Comenzar mi educación'}
        </button>{process.env.NODE_ENV === 'development' && (
  <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
    <button onClick={() => { setUsuario({uid:'test', nombre:'Test'}); setPantalla('diagnostico'); }}
      className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg text-xs">
      🧪 Ir directo al diagnóstico (test)
    </button>
    <button onClick={() => { setUsuario({uid:'test', nombre:'Test'}); setPantalla('dashboard'); }}
      className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg text-xs">
      🧪 Ir directo al dashboard (test)
    </button>
  </div>
)}
      </div>
    </div>
  );
}