import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getContenidoMateria, CONTENIDO_EDUCATIVO } from './ContenidoEducativo';

const claveTema = (unidadId, temaId) => `${unidadId}-${temaId}`;

// Apoyo Escolar: el alumno solo ve las materias puntuales que eligió al
// inscribirse, no las 6 por defecto (Plan Completo sí ve todas).
const materiasDisponiblesPara = (usuario) => {
  if (usuario?.modalidad === 'apoyo_escolar' && usuario?.materias_apoyo_escolar?.length) {
    return usuario.materias_apoyo_escolar.filter(id => CONTENIDO_EDUCATIVO[id]);
  }
  return Object.keys(CONTENIDO_EDUCATIVO);
};

export default function Materias({ usuario, onProgresoActualizado }) {
  const materiasDisponibles = materiasDisponiblesPara(usuario);
  const [materiaActiva, setMateriaActiva] = useState(() => materiasDisponibles[0] || 'matematica');
  const anio = usuario?.anio_inscripcion || usuario?.anio_escolar || 3;
  const contenidoActivo = getContenidoMateria(materiaActiva, anio);
  const [unidadAbierta, setUnidadAbierta] = useState(1);
  const [temaActivo, setTemaActivo] = useState({ unidad: 1, tema: 1 });
  const [ejIdx, setEjIdx] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [vista, setVista] = useState('contenido');
  const [progreso, setProgreso] = useState(usuario?.progreso || {});

  const materiaBase = contenidoActivo || CONTENIDO_EDUCATIVO[materiaActiva]?.años?.[anio] ?
   getContenidoMateria(materiaActiva, anio) :
   { ...CONTENIDO_EDUCATIVO[materiaActiva], unidades: CONTENIDO_EDUCATIVO[materiaActiva]?.años?.[1]?.unidades || [] };

  const progMateria = progreso[materiaActiva] || { completados: [], desbloqueados: [] };

  // Deriva unidades/temas con el progreso real superpuesto, sin mutar los datos importados.
  const unidades = materiaBase.unidades.map(u => {
    const temas = u.temas.map(t => {
      const key = claveTema(u.id, t.id);
      const desbloqueado = t.activo || progMateria.desbloqueados.includes(key);
      return { ...t, bloqueado: !desbloqueado, completo: progMateria.completados.includes(key) };
    });
    const unidadDesbloqueada = !u.bloqueado || temas.some(t => !t.bloqueado);
    const completa = temas.length > 0 && temas.every(t => t.completo);
    const pct = temas.length ? Math.round(100 * temas.filter(t => t.completo).length / temas.length) : u.pct;
    return { ...u, temas, bloqueado: !unidadDesbloqueada, completa, pct };
  });

  const materia = { ...materiaBase, unidades };

  const ejercicios = contenidoActivo?.unidades
    ?.find(u => u.id === temaActivo.unidad)
    ?.temas?.find(t => t.id === temaActivo.tema)
    ?.ejercicios || [];
  const ej = ejercicios[ejIdx];

  const persistirProgreso = async (nuevoProgMateria) => {
    setProgreso(p => ({ ...p, [materiaActiva]: nuevoProgMateria }));
    onProgresoActualizado?.(materiaActiva, nuevoProgMateria);
    if (!usuario?.uid) return;
    try {
      await updateDoc(doc(db, 'usuarios', usuario.uid), {
        [`progreso.${materiaActiva}`]: nuevoProgMateria,
      });
    } catch (e) {
      console.error('Error guardando progreso:', e);
    }
  };

  const cambiarMateria = (id) => {
    setMateriaActiva(id);
    setTemaActivo({ unidad: 1, tema: 1 });
    setEjIdx(0);
    setRespuesta(null);
    setUnidadAbierta(1);
    setVista('contenido');
  };

  const responder = (idx) => {
    if (respuesta !== null) return;
    setRespuesta(idx);
  };

  const sigEj = () => {
    if (ejIdx + 1 >= ejercicios.length) {
      const key = claveTema(temaActivo.unidad, temaActivo.tema);
      if (!progMateria.completados.includes(key)) {
        persistirProgreso({ ...progMateria, completados: [...progMateria.completados, key] });
      }
      setVista('completado');
    } else {
      setEjIdx(ejIdx + 1);
      setRespuesta(null);
    }
  };

  const continuarSiguienteTema = () => {
    const u = unidades.find(u => u.id === temaActivo.unidad);
    const temas = u?.temas || [];
    const idxActual = temas.findIndex(t => t.id === temaActivo.tema);
    const sigTema = temas[idxActual + 1];
    if (sigTema) {
      const key = claveTema(temaActivo.unidad, sigTema.id);
      const desbloqueados = progMateria.desbloqueados.includes(key) ? progMateria.desbloqueados : [...progMateria.desbloqueados, key];
      persistirProgreso({ ...progMateria, desbloqueados });
      setTemaActivo({ unidad: temaActivo.unidad, tema: sigTema.id });
      setVista('contenido'); setRespuesta(null); setEjIdx(0);
    } else {
      const idxU = unidades.findIndex(u => u.id === temaActivo.unidad);
      const sigU = unidades[idxU + 1];
      if (sigU) {
        const primerTema = sigU.temas[0];
        let desbloqueados = progMateria.desbloqueados;
        if (primerTema) {
          const key = claveTema(sigU.id, primerTema.id);
          if (!desbloqueados.includes(key)) desbloqueados = [...desbloqueados, key];
        }
        persistirProgreso({ ...progMateria, desbloqueados });
        setTemaActivo({ unidad: sigU.id, tema: primerTema?.id || 1 });
        setUnidadAbierta(sigU.id);
        setVista('contenido'); setRespuesta(null); setEjIdx(0);
      } else {
        setVista('contenido'); setRespuesta(null); setEjIdx(0);
      }
    }
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="w-44 flex-shrink-0 flex flex-col gap-1.5">
        {materiasDisponibles.map((id) => {
          const m = CONTENIDO_EDUCATIVO[id];
          return (
          <button key={id} onClick={() => cambiarMateria(id)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-colors ${materiaActiva === id ? `${m.color} ${m.text}` : 'bg-white border border-gray-100 text-gray-500 hover:border-gray-200'}`}>
            <span className="text-base">{m.emoji}</span>
            <span className="leading-tight">{m.nombre}</span>
          </button>
          );
        })}
      </div>

      <div className="flex-1 flex flex-col min-w-0 gap-3">
        <div className={`${materia.color} rounded-xl p-4 flex items-center justify-between`}>
          <div>
            <div className={`font-semibold text-base ${materia.text}`}>{materia.nombre}</div>
            <div className={`text-xs ${materia.text} opacity-70 mt-0.5`}>{materia.unidades.length} unidades</div>
          </div>
          <div className="text-3xl">{materia.emoji}</div>
        </div>

        <div className="flex flex-col gap-2">
          {materia.unidades.map(u => (
            <div key={u.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => !u.bloqueado && setUnidadAbierta(unidadAbierta === u.id ? null : u.id)}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${u.completa ? 'bg-emerald-100 text-emerald-700' : u.bloqueado ? 'bg-gray-100 text-gray-400' : `${materia.color} ${materia.text}`}`}>
                  {u.completa ? '✓' : u.bloqueado ? '🔒' : u.id}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${u.bloqueado ? 'text-gray-400' : 'text-gray-800'}`}>{u.titulo}</div>
                  <div className="h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden w-32">
                    <div className={`h-full ${materia.bar} rounded-full`} style={{ width: u.pct + '%' }}></div>
                  </div>
                </div>
                <div className={`text-xs font-medium ${u.bloqueado ? 'text-gray-300' : materia.text}`}>{u.pct}%</div>
                {!u.bloqueado && <span className="text-gray-300 text-xs">{unidadAbierta === u.id ? '▲' : '▼'}</span>}
              </div>

              {unidadAbierta === u.id && u.temas.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                  {u.temas.map(t => (
                    <div key={t.id}
                      onClick={() => !t.bloqueado && (setTemaActivo({ unidad: u.id, tema: t.id }), setVista('contenido'), setRespuesta(null), setEjIdx(0))}
                      className={`flex items-center gap-2 py-2 px-2 rounded-lg text-xs cursor-pointer transition-colors mb-0.5
                        ${temaActivo.unidad === u.id && temaActivo.tema === t.id ? `${materia.color} ${materia.text} font-medium` : t.bloqueado ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white'}`}>
                      <span>{t.completo ? '✅' : t.bloqueado ? '🔒' : t.activo ? '▶️' : '⭕'}</span>
                      {t.titulo}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-72 flex-shrink-0 flex flex-col gap-3">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setVista('contenido')}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${vista === 'contenido' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400'}`}>
            📖 Contenido
          </button>
          <button onClick={() => setVista('ejercicios')}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${vista === 'ejercicios' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400'}`}>
            ✏️ Ejercicios
          </button>
        </div>

        {vista === 'contenido' && (() => {
          const u = materia.unidades.find(u => u.id === temaActivo.unidad);
          const t = u?.temas.find(t => t.id === temaActivo.tema);
          if (!t) return (
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1 text-center text-gray-400 text-xs">
              <div className="text-3xl mb-2">📖</div>
              Seleccioná un tema para ver el contenido
            </div>
          );
          return (
            <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1 overflow-y-auto">
              <div className={`font-medium text-sm mb-3 ${materia.text}`}>{t.titulo}</div>
              <div className="text-xs text-gray-600 leading-relaxed mb-3">{t.contenido}</div>
              {t.formula && (
                <div className={`${materia.color} border-l-2 rounded-r-lg p-3 font-mono text-xs mb-3 whitespace-pre-line ${materia.text}`} style={{ borderColor: 'currentColor' }}>
                  {t.formula}
                </div>
              )}
              <button onClick={() => setVista('ejercicios')}
                className={`w-full py-2 rounded-lg text-xs font-medium text-white transition-colors ${materia.bar} hover:opacity-90 mt-2`}>
                Practicar ejercicios →
              </button>
            </div>
          );
        })()}

        {vista === 'ejercicios' && ej && (
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium text-gray-800 text-sm">Ejercicio</div>
              <div className="text-xs text-gray-400">{ejIdx + 1}/{ejercicios.length}</div>
            </div>
            <div className="text-sm text-gray-800 mb-4 leading-relaxed">{ej.pregunta}</div>
            <div className="flex flex-col gap-2 mb-3">
              {ej.opciones.map((op, i) => (
                <button key={i} onClick={() => responder(i)}
                  className={`text-left px-3 py-2 rounded-lg text-xs border transition-colors
                    ${respuesta === null ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50' :
                      i === ej.correcta ? 'border-emerald-400 bg-emerald-50 text-emerald-700 font-medium' :
                      respuesta === i ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-100 text-gray-400'}`}>
                  {op}
                </button>
              ))}
            </div>
            {respuesta !== null && (
              <div className={`text-xs p-2.5 rounded-lg mb-3 ${respuesta === ej.correcta ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                {respuesta === ej.correcta ? '✓ Correcto. ' : '✗ Incorrecto. '}{ej.exp}
              </div>
            )}
            {respuesta !== null && (
              <button onClick={sigEj} className="w-full bg-purple-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors">
                Siguiente ejercicio →
              </button>
            )}
          </div>
        )}
        {vista === 'completado' && (
          <div className="bg-white border border-gray-100 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-3">🎉</div>
            <div className="font-bold text-gray-800 text-lg mb-1">¡Tema completado!</div>
            <div className="text-xs text-gray-400 mb-4">Respondiste todos los ejercicios de este tema</div>
            <div className={`text-3xl font-bold ${materia.text} mb-4`}>
              {Math.round((ejercicios.filter((_,i) => i < ejercicios.length).length / ejercicios.length) * 100)}%
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button onClick={() => { setEjIdx(0); setRespuesta(null); setVista('ejercicios'); }}
                className="w-full py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50">
                🔄 Repasar ejercicios
              </button>
              <button onClick={continuarSiguienteTema}
                className={`w-full py-2 rounded-lg text-xs font-medium text-white ${materia.bar} hover:opacity-90`}>
                Continuar al siguiente tema →
              </button>
            </div>
          </div>
        )}
        {vista === 'ejercicios' && !ej && (
          <div className="bg-white border border-gray-100 rounded-xl p-4 text-center text-gray-400 text-xs flex-1">
            <div className="text-3xl mb-2">✏️</div>
            Seleccioná un tema activo para ver sus ejercicios
          </div>
        )}
      </div>
    </div>
  );
}
