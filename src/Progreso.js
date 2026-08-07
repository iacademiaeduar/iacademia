import React from 'react';
import { CONTENIDO_EDUCATIVO } from './ContenidoEducativo';
import { calcularXP, calcularNivel, tituloNivel, calcularPromedioGeneral, calcularPctMateria, contarEjerciciosCompletados, definirLogros } from './gamificacion';

export default function Progreso({ usuario }) {
  const anio = usuario?.anio_inscripcion || usuario?.anio_escolar || 3;
  const progreso = usuario?.progreso;
  const xp = calcularXP(progreso);
  const { nivel, faltan, pct: pctNivel } = calcularNivel(xp);
  const promedio = calcularPromedioGeneral(anio, progreso);
  const ejercicios = contarEjerciciosCompletados(progreso, anio);
  const racha = usuario?.racha_dias || 0;
  const logros = definirLogros(usuario);
  const logrosObtenidos = logros.filter(l => l.obtenido).length;

  const materias = Object.entries(CONTENIDO_EDUCATIVO)
    .filter(([, m]) => m.años[anio])
    .map(([id, m]) => ({ id, nombre: m.nombre, emoji: m.emoji, bar: m.bar, pct: calcularPctMateria(id, anio, progreso) }));

  return (
    <div className="flex flex-col gap-4">

      {/* Nivel */}
      <div className="bg-purple-600 rounded-xl p-4 text-white flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
          <div className="text-center">
            <div className="text-xs font-medium opacity-80">Nivel</div>
            <div className="text-2xl font-bold leading-none">{nivel}</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold">{tituloNivel(nivel)}</div>
          <div className="text-purple-200 text-xs mt-0.5 mb-2">{xp} XP · faltan {faltan} XP para Nivel {nivel + 1}</div>
          <div className="h-2 bg-purple-500 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{width: pctNivel+'%'}}></div>
          </div>
        </div>
        <div className="text-3xl">⭐</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[{n:ejercicios,l:'Ejercicios'},{n:promedio+'%',l:'Promedio'},{n:racha,l:'Días racha'},{n:logrosObtenidos,l:'Logros'}].map((s,i)=>(
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
            <div className="text-xl font-semibold text-gray-800">{s.n}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Progreso por materia */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Progreso por materia</div>
          <div className="flex flex-col gap-2.5">
            {materias.map((m) => (
              <div key={m.id} className="flex items-center gap-2">
                <span className="text-sm w-5">{m.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">{m.nombre}</span>
                    <span className="text-xs font-medium text-gray-500">{m.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${m.bar} rounded-full`} style={{width: m.pct+'%'}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Racha + Logros */}
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
            <div className="text-3xl">🔥</div>
            <div>
              <div className="text-sm font-semibold text-gray-800">{racha} día{racha === 1 ? '' : 's'} seguidos</div>
              <div className="text-xs text-gray-400">Entrá todos los días para no perder la racha</div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Logros</div>
            <div className="flex flex-col gap-2">
              {logros.slice(0, 6).map((l) => (
                <div key={l.id} className={`flex items-center gap-2.5 p-2 rounded-lg ${l.obtenido ? 'bg-gray-50' : 'opacity-40'}`}>
                  <span className="text-lg">{l.obtenido ? l.emoji : '🔒'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-700 truncate">{l.nombre}</div>
                    <div className="text-xs text-gray-400 truncate">{l.desc}</div>
                  </div>
                  {l.obtenido && <span className="text-emerald-500 text-sm flex-shrink-0">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
