import React, { useState } from 'react';
import { definirLogros } from './gamificacion';

const CATEGORIAS = ['todos','constancia','materias','ejercicios','nivel','inicio'];

export default function Logros({ usuario }) {
  const [filtro, setFiltro] = useState('todos');
  const [soloObtenidos, setSoloObtenidos] = useState(false);

  const LOGROS = definirLogros(usuario);

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
              <span className={`text-xs font-semibold ${l.obtenido ? 'text-amber-600' : 'text-gray-400'}`}>+{l.xp} XP</span>
            </div>
            <div className={`font-medium text-sm mb-1 ${l.obtenido ? 'text-gray-800' : 'text-gray-400'}`}>{l.nombre}</div>
            <div className="text-xs text-gray-400 leading-relaxed mb-2">{l.desc}</div>
            {l.obtenido ? (
              <div className="text-xs text-emerald-600 font-medium">✓ Completado</div>
            ) : (
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
