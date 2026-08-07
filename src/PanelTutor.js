import React from 'react';

export default function PanelTutor({ usuario }) {
  const alumno = usuario?.nombre || usuario?.nombre_completo || 'El alumno';
  const materias = usuario?.materias_base || [];
  const adaptaciones = usuario?.adaptaciones || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">👨‍👩‍👧</span>
          <div>
            <div className="font-bold text-blue-800">Panel del responsable</div>
            <div className="text-xs text-blue-600">Seguimiento académico de {alumno}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          {n: materias.length || 0, l:'Materias activas', emoji:'📚'},
          {n:'0%', l:'Progreso promedio', emoji:'📈'},
          {n:'0', l:'Días de racha', emoji:'🔥'},
        ].map((s,i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
            <div className="text-xl mb-1">{s.emoji}</div>
            <div className="text-xl font-bold text-gray-800">{s.n}</div>
            <div className="text-xs text-gray-400">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Materias inscriptas</div>
        <div className="flex flex-col gap-2">
          {materias.length > 0 ? materias.map((m, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50">
              <span className="text-sm">📖</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{m}</div>
                <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{width:'0%'}}></div>
                </div>
              </div>
              <span className="text-xs text-gray-400">0%</span>
            </div>
          )) : (
            <div className="text-xs text-gray-400 text-center py-4">Sin materias registradas aún</div>
          )}
        </div>
      </div>

      {adaptaciones.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <div className="text-xs font-bold text-amber-700 mb-2">⚡ Adaptaciones pedagógicas activas</div>
          <div className="flex flex-wrap gap-1.5">
            {adaptaciones.map((a, i) => (
              <span key={i} className="text-xs bg-white border border-amber-200 text-amber-700 px-2 py-1 rounded-full">{a}</span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Frecuencia de reportes</div>
        <div className="flex gap-2">
          {['Diario','Semanal','Mensual'].map((f,i) => (
            <button key={i}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all
                ${usuario?.tutor?.frecuencia === f.toLowerCase()
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-gray-200 text-gray-500 hover:border-purple-300'}`}>
              {f}
            </button>
          ))}
        </div>
        {usuario?.tutor?.email && (
          <div className="mt-3 text-xs text-gray-500">
            📧 Reportes enviados a <strong>{usuario.tutor.email}</strong>
          </div>
        )}
      </div>
    </div>
  );
}