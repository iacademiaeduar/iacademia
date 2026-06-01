import React from 'react';

const MATERIAS = [
  { nombre: 'Matemática', emoji: '🧮', bar: 'bg-purple-500', pct: 48 },
  { nombre: 'Lengua y Literatura', emoji: '📖', bar: 'bg-emerald-500', pct: 62 },
  { nombre: 'Biología', emoji: '🔬', bar: 'bg-green-500', pct: 21 },
  { nombre: 'Historia', emoji: '🗺️', bar: 'bg-amber-500', pct: 35 },
  { nombre: 'Geografía', emoji: '🌍', bar: 'bg-blue-500', pct: 15 },
  { nombre: 'Inglés', emoji: '🗣️', bar: 'bg-orange-500', pct: 40 },
];

const LOGROS = [
  { emoji: '🔥', nombre: 'Racha de 7 días', desc: 'Estudiaste 7 días seguidos', obtenido: true, nuevo: true },
  { emoji: '🚀', nombre: 'Primer ejercicio', desc: 'Completaste tu primer ejercicio', obtenido: true },
  { emoji: '⭐', nombre: 'Maestro de Lengua', desc: 'Superaste el 60% en Lengua', obtenido: true },
  { emoji: '🏆', nombre: 'Racha de 30 días', desc: 'Estudiá 30 días seguidos', obtenido: false },
  { emoji: '💯', nombre: '100% en una materia', desc: 'Completá todas las unidades', obtenido: false },
  { emoji: '🧠', nombre: 'Nivel 5', desc: 'Alcanzá el nivel 5', obtenido: false },
];

const ACTIVIDAD = [
  [0,1,2,3,2,1,0],
  [1,2,3,4,3,2,1],
  [2,3,4,3,2,3,2],
  [3,4,3,4,3,4,3],
  [2,3,4,4,3,4,4],
];

const COLORES = ['bg-gray-100','bg-purple-200','bg-purple-300','bg-purple-400','bg-purple-600'];

export default function Progreso({ usuario }) {
  return (
    <div className="flex flex-col gap-4">

      {/* Nivel */}
      <div className="bg-purple-600 rounded-xl p-4 text-white flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
          <div className="text-center">
            <div className="text-xs font-medium opacity-80">Nivel</div>
            <div className="text-2xl font-bold leading-none">4</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold">Estudiante Avanzado</div>
          <div className="text-purple-200 text-xs mt-0.5 mb-2">1.240 XP · faltan 260 XP para Nivel 5</div>
          <div className="h-2 bg-purple-500 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{width:'82%'}}></div>
          </div>
        </div>
        <div className="text-3xl">⭐</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[{n:'47',l:'Ejercicios'},{n:'38%',l:'Promedio'},{n:'7',l:'Días racha'},{n:'3',l:'Logros'}].map((s,i)=>(
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
            {MATERIAS.map((m,i) => (
              <div key={i} className="flex items-center gap-2">
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

        {/* Calendario + Logros */}
        <div className="flex flex-col gap-3">
          {/* Calendario */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Actividad — últimas 5 semanas</div>
            <div className="grid gap-1" style={{gridTemplateColumns:'repeat(7,1fr)'}}>
              {ACTIVIDAD.flat().map((v,i) => (
                <div key={i} className={`h-5 rounded-sm ${COLORES[v]}`}></div>
              ))}
            </div>
            <div className="flex gap-2 mt-1.5">
              {['L','M','X','J','V','S','D'].map(d => (
                <div key={d} className="flex-1 text-center text-xs text-gray-300">{d}</div>
              ))}
            </div>
          </div>

          {/* Logros */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Logros</div>
            <div className="flex flex-col gap-2">
              {LOGROS.map((l,i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-lg ${l.obtenido ? 'bg-gray-50' : 'opacity-40'}`}>
                  <span className="text-lg">{l.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-700 truncate">{l.nombre}</div>
                    <div className="text-xs text-gray-400 truncate">{l.desc}</div>
                  </div>
                  {l.nuevo && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Nuevo</span>}
                  {l.obtenido && !l.nuevo && <span className="text-emerald-500 text-sm flex-shrink-0">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}