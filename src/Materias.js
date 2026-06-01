import React, { useState } from 'react';

const CONTENIDO = {
  matematica: {
    nombre: 'Matemática', emoji: '🧮', color: 'bg-purple-100', text: 'text-purple-700', bar: 'bg-purple-600',
    unidades: [
      {
        id: 1, titulo: 'Números y operaciones', pct: 100, completa: true,
        temas: [
          { id: 1, titulo: 'Números enteros', completo: true },
          { id: 2, titulo: 'Números racionales', completo: true },
          { id: 3, titulo: 'Potencias y raíces', completo: true },
        ]
      },
      {
        id: 2, titulo: 'Álgebra básica', pct: 100, completa: true,
        temas: [
          { id: 1, titulo: 'Expresiones algebraicas', completo: true },
          { id: 2, titulo: 'Ecuaciones lineales', completo: true },
        ]
      },
      {
        id: 3, titulo: 'Ecuaciones cuadráticas', pct: 60, completa: false,
        temas: [
          { id: 1, titulo: '¿Qué es una ecuación cuadrática?', completo: true },
          { id: 2, titulo: 'Fórmula resolvente', completo: true },
          { id: 3, titulo: 'Factoreo de trinomios', completo: false, activo: true },
          { id: 4, titulo: 'Gráfica de parábola', completo: false, bloqueado: true },
          { id: 5, titulo: 'Problemas aplicados', completo: false, bloqueado: true },
        ]
      },
      {
        id: 4, titulo: 'Sistemas de ecuaciones', pct: 0, completa: false, bloqueado: true,
        temas: []
      },
      {
        id: 5, titulo: 'Funciones', pct: 0, completa: false, bloqueado: true,
        temas: []
      },
    ]
  },
  lengua: {
    nombre: 'Lengua y Literatura', emoji: '📖', color: 'bg-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-600',
    unidades: [
      { id: 1, titulo: 'Comprensión lectora', pct: 100, completa: true, temas: [
        { id: 1, titulo: 'Tipos de texto', completo: true },
        { id: 2, titulo: 'Idea principal', completo: true },
      ]},
      { id: 2, titulo: 'Narrativa', pct: 70, completa: false, temas: [
        { id: 1, titulo: 'El cuento', completo: true },
        { id: 2, titulo: 'El narrador', completo: false, activo: true },
        { id: 3, titulo: 'Recursos literarios', completo: false, bloqueado: true },
      ]},
      { id: 3, titulo: 'Gramática', pct: 0, completa: false, bloqueado: true, temas: [] },
    ]
  },
  biologia: {
    nombre: 'Biología', emoji: '🔬', color: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-600',
    unidades: [
      { id: 1, titulo: 'La célula', pct: 21, completa: false, temas: [
        { id: 1, titulo: 'Célula procariota y eucariota', completo: true },
        { id: 2, titulo: 'Orgánulos celulares', completo: false, activo: true },
        { id: 3, titulo: 'División celular', completo: false, bloqueado: true },
      ]},
      { id: 2, titulo: 'Genética', pct: 0, completa: false, bloqueado: true, temas: [] },
    ]
  },
  historia: {
    nombre: 'Historia', emoji: '🗺️', color: 'bg-amber-100', text: 'text-amber-700', bar: 'bg-amber-600',
    unidades: [
      { id: 1, titulo: 'Primera Guerra Mundial', pct: 80, completa: false, temas: [
        { id: 1, titulo: 'Causas del conflicto', completo: true },
        { id: 2, titulo: 'Los bloques de alianzas', completo: true },
        { id: 3, titulo: 'El armisticio', completo: false, activo: true },
      ]},
      { id: 2, titulo: 'Entreguerras', pct: 0, completa: false, bloqueado: true, temas: [] },
    ]
  },
  geografia: {
    nombre: 'Geografía', emoji: '🌍', color: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-600',
    unidades: [
      { id: 1, titulo: 'América del Sur', pct: 15, completa: false, temas: [
        { id: 1, titulo: 'Relieve y climas', completo: true },
        { id: 2, titulo: 'Recursos naturales', completo: false, activo: true },
      ]},
    ]
  },
  ingles: {
    nombre: 'Inglés', emoji: '🗣️', color: 'bg-orange-100', text: 'text-orange-700', bar: 'bg-orange-600',
    unidades: [
      { id: 1, titulo: 'Grammar', pct: 40, completa: false, temas: [
        { id: 1, titulo: 'Present tenses', completo: true },
        { id: 2, titulo: 'Conditionals', completo: false, activo: true },
        { id: 3, titulo: 'Passive voice', completo: false, bloqueado: true },
      ]},
    ]
  },
};

const EJERCICIOS = {
  'matematica-3-3': [
    { pregunta: 'Factoreá: x² + 7x + 12', opciones: ['(x+3)(x+5)', '(x+3)(x+4)', '(x+2)(x+6)', '(x+1)(x+12)'], correcta: 1, exp: 'Buscamos dos números que multiplicados den 12 y sumados den 7. Son 3 y 4.' },
    { pregunta: 'Raíces de x² − 5x + 6 = 0', opciones: ['x=2 y x=3', 'x=−2 y x=−3', 'x=1 y x=6', 'x=−1 y x=−6'], correcta: 0, exp: 'Factoreamos: (x−2)(x−3)=0. Las raíces son x=2 y x=3.' },
    { pregunta: 'Factoreá: x² + 9x + 20', opciones: ['(x+4)(x+5)', '(x+2)(x+10)', '(x+3)(x+7)', '(x+1)(x+20)'], correcta: 0, exp: 'Buscamos números que multiplicados den 20 y sumados den 9. Son 4 y 5.' },
  ]
};

export default function Materias() {
  const [materiaActiva, setMateriaActiva] = useState('matematica');
  const [unidadAbierta, setUnidadAbierta] = useState(3);
  const [temaActivo, setTemaActivo] = useState({unidad: 3, tema: 3});
  const [ejIdx, setEjIdx] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [vista, setVista] = useState('contenido');

  const materia = CONTENIDO[materiaActiva];
  const ejKey = `${materiaActiva}-${temaActivo.unidad}-${temaActivo.tema}`;
  const ejercicios = EJERCICIOS[ejKey] || [];
  const ej = ejercicios[ejIdx];

  const cambiarMateria = (id) => {
    setMateriaActiva(id);
    setUnidadAbierta(1);
    setTemaActivo({unidad:1, tema:1});
    setEjIdx(0);
    setRespuesta(null);
    setVista('contenido');
  };

  const responder = (idx) => {
    if (respuesta !== null) return;
    setRespuesta(idx);
  };

  const sigEj = () => {
    setEjIdx((ejIdx + 1) % ejercicios.length);
    setRespuesta(null);
  };

  return (
    <div className="flex gap-4 h-full">
      {/* Lista de materias */}
      <div className="w-44 flex-shrink-0 flex flex-col gap-1.5">
        {Object.entries(CONTENIDO).map(([id, m]) => (
          <button key={id} onClick={() => cambiarMateria(id)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-colors ${materiaActiva === id ? `${m.color} ${m.text}` : 'bg-white border border-gray-100 text-gray-500 hover:border-gray-200'}`}>
            <span className="text-base">{m.emoji}</span>
            <span className="leading-tight">{m.nombre}</span>
          </button>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0 gap-3">
        {/* Header materia */}
        <div className={`${materia.color} rounded-xl p-4 flex items-center justify-between`}>
          <div>
            <div className={`font-semibold text-base ${materia.text}`}>{materia.nombre}</div>
            <div className={`text-xs ${materia.text} opacity-70 mt-0.5`}>{materia.unidades.length} unidades</div>
          </div>
          <div className="text-3xl">{materia.emoji}</div>
        </div>

        {/* Unidades */}
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
                    <div className={`h-full ${materia.bar} rounded-full`} style={{width: u.pct+'%'}}></div>
                  </div>
                </div>
                <div className={`text-xs font-medium ${u.bloqueado ? 'text-gray-300' : materia.text}`}>{u.pct}%</div>
                {!u.bloqueado && <span className="text-gray-300 text-xs">{unidadAbierta === u.id ? '▲' : '▼'}</span>}
              </div>

              {unidadAbierta === u.id && u.temas.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                  {u.temas.map(t => (
                    <div key={t.id}
                      onClick={() => !t.bloqueado && (setTemaActivo({unidad: u.id, tema: t.id}), setVista('contenido'), setRespuesta(null), setEjIdx(0))}
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

      {/* Panel derecho: contenido + ejercicios */}
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

        {vista === 'contenido' && (
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1">
            <div className="font-medium text-gray-800 text-sm mb-3">Factoreo de trinomios</div>
            <div className="text-xs text-gray-600 leading-relaxed mb-3">
              El <strong>factoreo de trinomios</strong> permite resolver ecuaciones cuadráticas escribiéndolas como producto de dos binomios.
            </div>
            <div className="text-xs text-gray-600 leading-relaxed mb-3">
              Para factorear <strong>x² + 5x + 6</strong>, buscamos dos números que multiplicados den 6 y sumados den 5. Esos números son 2 y 3.
            </div>
            <div className="bg-purple-50 border-l-2 border-purple-400 rounded-r-lg p-3 font-mono text-sm text-purple-800 mb-3">
              x² + 5x + 6 = (x + 2)(x + 3)
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">
              Las soluciones son <strong>x = −2</strong> y <strong>x = −3</strong>.
            </div>
          </div>
        )}

        {vista === 'ejercicios' && ej && (
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium text-gray-800 text-sm">Ejercicio</div>
              <div className="text-xs text-gray-400">{ejIdx+1}/{ejercicios.length}</div>
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