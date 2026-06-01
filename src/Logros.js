import React, { useState } from 'react';

const LOGROS = [
  {
    id: 1, emoji: '🔥', nombre: 'Racha de 7 días', desc: 'Estudiaste 7 días seguidos sin parar',
    categoria: 'constancia', obtenido: true, nuevo: true, xp: 100,
    fecha: '01 Jun 2026'
  },
  {
    id: 2, emoji: '🚀', nombre: 'Primer ejercicio', desc: 'Completaste tu primer ejercicio en iAcademia',
    categoria: 'inicio', obtenido: true, xp: 50,
    fecha: '25 May 2026'
  },
  {
    id: 3, emoji: '⭐', nombre: 'Maestro de Lengua', desc: 'Superaste el 60% en Lengua y Literatura',
    categoria: 'materias', obtenido: true, xp: 200,
    fecha: '28 May 2026'
  },
  {
    id: 4, emoji: '🧮', nombre: 'Crack de Matemática', desc: 'Superaste el 50% en Matemática',
    categoria: 'materias', obtenido: false, xp: 200, progreso: 48, meta: 50
  },
  {
    id: 5, emoji: '🏆', nombre: 'Racha de 30 días', desc: 'Estudiá 30 días seguidos para obtenerlo',
    categoria: 'constancia', obtenido: false, xp: 500, progreso: 7, meta: 30
  },
  {
    id: 6, emoji: '💯', nombre: '100% en una materia', desc: 'Completá todas las unidades de una materia',
    categoria: 'materias', obtenido: false, xp: 300, progreso: 62, meta: 100
  },
  {
    id: 7, emoji: '🧠', nombre: 'Nivel 5', desc: 'Alcanzá el nivel 5 acumulando XP',
    categoria: 'nivel', obtenido: false, xp: 400, progreso: 1240, meta: 1500
  },
  {
    id: 8, emoji: '📚', nombre: 'Todas las materias', desc: 'Completá al menos una unidad en cada materia',
    categoria: 'materias', obtenido: false, xp: 250, progreso: 4, meta: 6
  },
  {
    id: 9, emoji: '⚡', nombre: '10 ejercicios seguidos', desc: 'Respondé 10 ejercicios sin errores',
    categoria: 'ejercicios', obtenido: false, xp: 150, progreso: 6, meta: 10
  },
];

const CATEGORIAS = ['todos','constancia','materias','ejercicios','nivel','inicio'];

export default function Logros() {
  const [filtro, setFiltro] = useState('todos');
  const [soloObtenidos, setSoloObtenidos] = useState(false);

  const filtrados = LOGROS.filter(l => {
    if (soloObtenidos && !l.obtenido) return false;
    if (filtro !== 'todos' && l.categoria !== filtro) return false;
    return true;
  });

  const totalXP = LOGROS.filter(l => l.obtenido).reduce((a, l) => a + l.xp, 0);
  const obtenidos = LOGROS.filter(l => l.obtenido).length;

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-amber-800 text-base">Mis Logros</div>
          <div className="text-xs text-amber-600 mt-0.5">{obtenidos} de {LOGROS.length} obtenidos · {totalXP} XP ganados</div>
        </div>
        <div className="flex gap-3">
          {[{n: obtenidos, l:'Obtenidos'},{n: LOGROS.length - obtenidos, l:'Pendientes'},{n: totalXP, l:'XP total'}].map((s,i)=>(
            <div key={i} className="text-center">
              <div className="text-xl font-bold text-amber-700">{s.n}</div>
              <div className="text-xs text-amber-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {CATEGORIAS.map(c => (
            <button key={c} onClick={() => setFiltro(c)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${filtro === c ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => setSoloObtenidos(!soloObtenidos)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${soloObtenidos ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-200'}`}>
          ✓ Solo obtenidos
        </button>
      </div>

      {/* Grid de logros */}
      <div className="grid grid-cols-3 gap-3">
        {filtrados.map(l => (
          <div key={l.id} className={`bg-white border rounded-xl p-4 transition-all ${l.obtenido ? 'border-amber-200' : 'border-gray-100 opacity-60'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${l.obtenido ? 'bg-amber-50' : 'bg-gray-100'}`}>
                {l.obtenido ? l.emoji : '🔒'}
              </div>
              <div className="flex flex-col items-end gap-1">
                {l.nuevo && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Nuevo</span>}
                <span className={`text-xs font-semibold ${l.obtenido ? 'text-amber-600' : 'text-gray-400'}`}>+{l.xp} XP</span>
              </div>
            </div>
            <div className={`font-medium text-sm mb-1 ${l.obtenido ? 'text-gray-800' : 'text-gray-400'}`}>{l.nombre}</div>
            <div className="text-xs text-gray-400 leading-relaxed mb-2">{l.desc}</div>
            {l.obtenido && l.fecha && (
              <div className="text-xs text-emerald-600 font-medium">✓ {l.fecha}</div>
            )}
            {!l.obtenido && l.progreso !== undefined && (
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progreso</span>
                  <span>{l.progreso}/{l.meta}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{width: Math.min(100, Math.round(l.progreso/l.meta*100))+'%'}}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}