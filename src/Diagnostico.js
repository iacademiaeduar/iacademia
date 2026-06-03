import React, { useState } from 'react';

const PASOS = [
  'bienvenida',
  'anio_escolar',
  'estilo',
  'lectura',
  'atencion',
  'colores',
  'comprension',
  'resultado'
];

const COLORES_TEST = [
  { id: 1, fondo: '#E8F5E9', texto: '#2E7D32', pregunta: '¿Qué color ves en el círculo grande?', opciones: ['Verde', 'Rojo', 'Gris', 'No distingo'], correcta: 0 },
  { id: 2, fondo: '#FFEBEE', texto: '#C62828', pregunta: '¿Qué color predomina en este fondo?', opciones: ['Verde', 'Rojo', 'Azul', 'No distingo'], correcta: 1 },
  { id: 3, fondo: '#E3F2FD', texto: '#1565C0', pregunta: '¿Qué color ves aquí?', opciones: ['Azul', 'Verde', 'Gris', 'No distingo'], correcta: 0 },
];

export default function Diagnostico({ onComplete }) {
  const [paso, setPaso] = useState(0);
  const [datos, setDatos] = useState({
    anio_escolar: null,
    estilo_aprendizaje: null,
    posible_dislexia: false,
    posible_tdah: false,
    posible_daltonismo: false,
    dificultad_comprension: false,
    adaptaciones: []
  });
  const [colorIdx, setColorIdx] = useState(0);
  const [erroresColor, setErroresColor] = useState(0);
  const [lecturaSel, setLecturaSel] = useState([]);
  const [atencionSel, setAtencionSel] = useState([]);

  const siguiente = (nuevosDatos) => {
    const datosActualizados = { ...datos, ...nuevosDatos };
    setDatos(datosActualizados);
    setPaso(p => p + 1);
  };

  const calcularAdaptaciones = (d) => {
    const adaptaciones = [];
    if (d.posible_dislexia) adaptaciones.push('fuente_grande', 'espaciado_extra', 'audio_texto');
    if (d.posible_tdah) adaptaciones.push('sesiones_cortas', 'mas_pausas', 'gamificacion_extra');
    if (d.posible_daltonismo) adaptaciones.push('modo_alto_contraste');
    if (d.dificultad_comprension) adaptaciones.push('explicaciones_simples', 'mas_ejemplos');
    return adaptaciones;
  };

  const pantalla = PASOS[paso];

  if (pantalla === 'bienvenida') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm text-center">
        <div className="text-5xl mb-4">🎓</div>
        <h1 className="text-2xl font-semibold text-purple-700 mb-2">¡Bienvenido a iAcademia!</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Antes de empezar, vamos a hacerte algunas preguntas cortas para personalizar tu experiencia de aprendizaje. Esto nos ayuda a adaptar el contenido a tus necesidades únicas.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[{emoji:'🧠', txt:'Detectamos tu estilo de aprendizaje'},{emoji:'👁️', txt:'Adaptamos colores y texto'},{emoji:'⚡', txt:'Personalizamos tu ritmo'}].map((i,idx)=>(
            <div key={idx} className="bg-purple-50 rounded-xl p-3">
              <div className="text-2xl mb-1">{i.emoji}</div>
              <div className="text-xs text-purple-700">{i.txt}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setPaso(1)}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
          Empezar diagnóstico →
        </button>
        <p className="text-xs text-gray-400 mt-3">Tarda aproximadamente 3 minutos</p>
      </div>
    </div>
  );

  if (pantalla === 'anio_escolar') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-6">Paso 1 de 6</div>
        <div className="text-3xl mb-3">📚</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">¿En qué año estás?</h2>
        <p className="text-sm text-gray-500 mb-6">Esto nos ayuda a darte el contenido del nivel correcto.</p>
        <div className="grid grid-cols-2 gap-3">
          {['1° año', '2° año', '3° año', '4° año', '5° año', '6° año'].map((a, i) => (
            <button key={i} onClick={() => siguiente({ anio_escolar: i + 1 })}
              className="p-4 border border-gray-200 rounded-xl text-left hover:border-purple-400 hover:bg-purple-50 transition-colors">
              <div className="font-medium text-gray-800">{a}</div>
              <div className="text-xs text-gray-400">Secundaria</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (pantalla === 'estilo') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-6">Paso 2 de 6</div>
        <div className="text-3xl mb-3">🧠</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">¿Cómo aprendés mejor?</h2>
        <p className="text-sm text-gray-500 mb-6">Elegí la opción que más se parezca a vos.</p>
        <div className="flex flex-col gap-3">
          {[
            { id: 'visual', emoji: '👁️', titulo: 'Con imágenes y diagramas', desc: 'Entiendo mejor cuando veo esquemas, mapas o gráficos' },
            { id: 'auditivo', emoji: '🎧', titulo: 'Escuchando explicaciones', desc: 'Me queda mejor cuando alguien me lo explica en voz alta' },
            { id: 'lectura', emoji: '📖', titulo: 'Leyendo y escribiendo', desc: 'Aprendo mejor cuando leo y tomo notas' },
            { id: 'practico', emoji: '✋', titulo: 'Practicando y haciendo', desc: 'Entiendo cuando puedo resolver ejercicios yo mismo' },
          ].map(e => (
            <button key={e.id} onClick={() => siguiente({ estilo_aprendizaje: e.id })}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors text-left">
              <span className="text-2xl">{e.emoji}</span>
              <div>
                <div className="font-medium text-gray-800">{e.titulo}</div>
                <div className="text-xs text-gray-400 mt-0.5">{e.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (pantalla === 'lectura') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-6">Paso 3 de 6</div>
        <div className="text-3xl mb-3">📝</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Sobre la lectura</h2>
        <p className="text-sm text-gray-500 mb-6">Marcá todo lo que se aplique a vos.</p>
        <div className="flex flex-col gap-2 mb-6">
          {[
            'A veces confundo letras parecidas (b/d, p/q)',
            'Me cuesta leer en voz alta',
            'Las palabras parecen moverse o borrarse',
            'Necesito releer varias veces para entender',
            'Me canso mucho leyendo',
            'Ninguna de las anteriores',
          ].map((op, i) => (
            <button key={i} onClick={() => {
              if (op === 'Ninguna de las anteriores') {
                setLecturaSel([]);
              } else {
                setLecturaSel(prev =>
                  prev.includes(i) ? prev.filter(x => x !== i) : [...prev.filter(x => x !== 5), i]
                );
              }
            }}
              className={`flex items-center gap-3 p-3 border rounded-xl text-left text-sm transition-colors ${lecturaSel.includes(i) ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${lecturaSel.includes(i) ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}>
                {lecturaSel.includes(i) && <span className="text-white text-xs">✓</span>}
              </div>
              {op}
            </button>
          ))}
        </div>
        <button onClick={() => siguiente({ posible_dislexia: lecturaSel.length >= 2 })}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
          Continuar →
        </button>
      </div>
    </div>
  );

  if (pantalla === 'atencion') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-6">Paso 4 de 6</div>
        <div className="text-3xl mb-3">⚡</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Sobre tu atención</h2>
        <p className="text-sm text-gray-500 mb-6">Marcá todo lo que se aplique a vos.</p>
        <div className="flex flex-col gap-2 mb-6">
          {[
            'Me cuesta mantener la atención por mucho tiempo',
            'Me distraigo fácilmente con cualquier cosa',
            'Empiezo tareas pero me cuesta terminarlas',
            'A veces actúo sin pensar primero',
            'Necesito moverme o hacer algo mientras estudio',
            'Ninguna de las anteriores',
          ].map((op, i) => (
            <button key={i} onClick={() => {
              if (op === 'Ninguna de las anteriores') {
                setAtencionSel([]);
              } else {
                setAtencionSel(prev =>
                  prev.includes(i) ? prev.filter(x => x !== i) : [...prev.filter(x => x !== 5), i]
                );
              }
            }}
              className={`flex items-center gap-3 p-3 border rounded-xl text-left text-sm transition-colors ${atencionSel.includes(i) ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${atencionSel.includes(i) ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}>
                {atencionSel.includes(i) && <span className="text-white text-xs">✓</span>}
              </div>
              {op}
            </button>
          ))}
        </div>
        <button onClick={() => siguiente({ posible_tdah: atencionSel.length >= 3 })}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
          Continuar →
        </button>
      </div>
    </div>
  );

  if (pantalla === 'colores') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-6">Paso 5 de 6</div>
        <div className="text-3xl mb-3">🎨</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Test de colores</h2>
        <p className="text-sm text-gray-500 mb-6">Respondé según lo que ves. No hay respuestas incorrectas.</p>
        <div className="rounded-xl p-8 mb-6 flex items-center justify-center" style={{ background: COLORES_TEST[colorIdx].fondo }}>
          <div className="w-24 h-24 rounded-full" style={{ background: COLORES_TEST[colorIdx].texto }}></div>
        </div>
        <p className="text-sm font-medium text-gray-700 mb-4">{COLORES_TEST[colorIdx].pregunta}</p>
        <div className="grid grid-cols-2 gap-2">
          {COLORES_TEST[colorIdx].opciones.map((op, i) => (
            <button key={i} onClick={() => {
              const esError = i !== COLORES_TEST[colorIdx].correcta;
              const nuevosErrores = erroresColor + (esError ? 1 : 0);
              if (colorIdx < COLORES_TEST.length - 1) {
                setColorIdx(colorIdx + 1);
                setErroresColor(nuevosErrores);
              } else {
                siguiente({ posible_daltonismo: nuevosErrores >= 2 });
              }
            }}
              className="p-3 border border-gray-200 rounded-xl text-sm hover:border-purple-400 hover:bg-purple-50 transition-colors">
              {op}
            </button>
          ))}
        </div>
        <div className="flex gap-1 mt-4 justify-center">
          {COLORES_TEST.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i <= colorIdx ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (pantalla === 'comprension') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-6">Paso 6 de 6</div>
        <div className="text-3xl mb-3">💭</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Mini evaluación de comprensión</h2>
        <p className="text-sm text-gray-500 mb-4">Leé el siguiente texto y respondé la pregunta.</p>
        <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-700 leading-relaxed border border-gray-200">
          "El agua es fundamental para la vida. Cubre el 71% de la superficie terrestre y es el componente principal de los seres vivos. Sin agua, ningún organismo podría sobrevivir más de pocos días."
        </div>
        <p className="text-sm font-medium text-gray-700 mb-4">¿Cuál es la idea principal del texto?</p>
        <div className="flex flex-col gap-2">
          {[
            { txt: 'El agua cubre el 71% de la Tierra', correcta: false },
            { txt: 'El agua es esencial para la vida', correcta: true },
            { txt: 'Los organismos viven pocos días', correcta: false },
            { txt: 'La Tierra tiene mucha agua', correcta: false },
          ].map((op, i) => (
            <button key={i} onClick={() => siguiente({ dificultad_comprension: !op.correcta })}
              className="p-3 border border-gray-200 rounded-xl text-sm text-left hover:border-purple-400 hover:bg-purple-50 transition-colors">
              {op.txt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (pantalla === 'resultado') {
    const adaptaciones = calcularAdaptaciones(datos);
    const datosFinales = { ...datos, adaptaciones };
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg shadow-sm text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">¡Diagnóstico completo!</h2>
          <p className="text-sm text-gray-500 mb-6">Tu perfil de aprendizaje está listo. iAcademia se va a adaptar a vos.</p>

          <div className="flex flex-col gap-3 mb-6 text-left">
            <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-3">
              <span className="text-xl">📚</span>
              <div>
                <div className="text-xs text-gray-400">Año escolar</div>
                <div className="text-sm font-medium text-gray-800">{datos.anio_escolar}° año secundaria</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-3">
              <span className="text-xl">🧠</span>
              <div>
                <div className="text-xs text-gray-400">Estilo de aprendizaje</div>
                <div className="text-sm font-medium text-gray-800 capitalize">{datos.estilo_aprendizaje}</div>
              </div>
            </div>
            {adaptaciones.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                <div className="text-xs text-amber-600 font-medium mb-2">✓ Adaptaciones activadas para vos:</div>
                <div className="flex flex-wrap gap-1">
                  {adaptaciones.map((a, i) => (
                    <span key={i} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      {a.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {adaptaciones.length === 0 && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-sm text-emerald-700">
                ✓ No se detectaron dificultades específicas. ¡Perfil estándar activado!
              </div>
            )}
          </div>

          <button onClick={() => onComplete(datosFinales)}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors text-base">
            Ir a mi panel de estudio →
          </button>
        </div>
      </div>
    );
  }

  return null;
}