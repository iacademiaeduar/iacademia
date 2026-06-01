import React, { useState } from 'react';

const PROFES = {
  matematica: { nombre: 'Profe Marcos', emoji: '🧮', color: 'bg-purple-100', text: 'text-purple-700', saludo: '¡Hola! Soy Marcos, tu profe de Matemática. ¿En qué tema necesitás ayuda hoy?' },
  lengua: { nombre: 'Profe Ana', emoji: '📖', color: 'bg-emerald-100', text: 'text-emerald-700', saludo: '¡Hola! Soy Ana, tu profe de Lengua y Literatura. ¿Arrancamos?' },
  biologia: { nombre: 'Profe Laura', emoji: '🔬', color: 'bg-green-100', text: 'text-green-700', saludo: '¡Hola! Soy Laura, tu profe de Biología. ¿Qué tema vemos hoy?' },
  historia: { nombre: 'Profe Roberto', emoji: '🗺️', color: 'bg-amber-100', text: 'text-amber-700', saludo: '¡Hola! Soy Roberto, tu profe de Historia. ¿Por dónde empezamos?' },
  geografia: { nombre: 'Profe Valeria', emoji: '🌍', color: 'bg-blue-100', text: 'text-blue-700', saludo: '¡Hola! Soy Valeria, tu profe de Geografía. ¿Qué región exploramos hoy?' },
  ingles: { nombre: 'Profe James', emoji: '🗣️', color: 'bg-orange-100', text: 'text-orange-700', saludo: "Hey! I'm James, your English teacher. What shall we practice today?" },
};

const MATERIAS_LIST = [
  { id: 'matematica', nombre: 'Matemática' },
  { id: 'lengua', nombre: 'Lengua' },
  { id: 'biologia', nombre: 'Biología' },
  { id: 'historia', nombre: 'Historia' },
  { id: 'geografia', nombre: 'Geografía' },
  { id: 'ingles', nombre: 'Inglés' },
];

export default function TutorIA({ usuario }) {
  const [materiaActiva, setMateriaActiva] = useState('matematica');
  const [mensajes, setMensajes] = useState([
    { rol: 'tutor', texto: PROFES['matematica'].saludo }
  ]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);

  const cambiarMateria = (id) => {
    setMateriaActiva(id);
    setMensajes([{ rol: 'tutor', texto: PROFES[id].saludo }]);
  };

  const enviar = async () => {
    if (!input.trim() || cargando) return;
    const pregunta = input.trim();
    setInput('');
    const nuevosMensajes = [...mensajes, { rol: 'alumno', texto: pregunta }];
    setMensajes(nuevosMensajes);
    setCargando(true);

    try {
      const historial = nuevosMensajes.map(m => ({
        role: m.rol === 'alumno' ? 'user' : 'assistant',
        content: m.texto
      }));

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `Sos ${PROFES[materiaActiva].nombre}, el tutor de ${materiaActiva} de iAcademia, plataforma educativa para secundaria argentina (13-18 años). Respondé siempre en español, de forma clara, amigable y con ejemplos concretos adaptados a estudiantes argentinos. Usá un tono cercano, como un profe que realmente quiere que el alumno entienda. Respondé de forma concisa pero completa.`,
          messages: historial
        })
      });

      const data = await res.json();
      const respuesta = data.content?.[0]?.text || 'No pude responder, intentá de nuevo.';
      setMensajes([...nuevosMensajes, { rol: 'tutor', texto: respuesta }]);
    } catch (e) {
      setMensajes([...nuevosMensajes, { rol: 'tutor', texto: 'Para activar el tutor real necesitás conectar la API de Anthropic.' }]);
    }
    setCargando(false);
  };

  const profe = PROFES[materiaActiva];

  return (
    <div className="flex flex-col h-full">
      {/* Selector de materias */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {MATERIAS_LIST.map(m => (
          <button key={m.id} onClick={() => cambiarMateria(m.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${materiaActiva === m.id ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-purple-300'}`}>
            {PROFES[m.id].emoji} {m.nombre}
          </button>
        ))}
      </div>

      {/* Panel del tutor */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Header del profe */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <div className={`w-10 h-10 rounded-full ${profe.color} flex items-center justify-center text-xl`}>
            {profe.emoji}
          </div>
          <div>
            <div className={`font-medium text-sm ${profe.text}`}>{profe.nombre}</div>
            <div className="text-xs text-gray-400">Tutor de {MATERIAS_LIST.find(m=>m.id===materiaActiva)?.nombre}</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-xs text-gray-400">En línea</span>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {mensajes.map((m, i) => (
            <div key={i} className={`flex ${m.rol === 'alumno' ? 'justify-end' : 'justify-start'}`}>
              {m.rol === 'tutor' && (
                <div className={`w-7 h-7 rounded-full ${profe.color} flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-0.5`}>
                  {profe.emoji}
                </div>
              )}
              <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-xl text-sm leading-relaxed ${
                m.rol === 'alumno'
                  ? 'bg-purple-600 text-white rounded-br-sm'
                  : 'bg-gray-50 text-gray-800 rounded-bl-sm'
              }`}>
                {m.texto}
              </div>
            </div>
          ))}
          {cargando && (
            <div className="flex justify-start">
              <div className={`w-7 h-7 rounded-full ${profe.color} flex items-center justify-center text-sm mr-2`}>
                {profe.emoji}
              </div>
              <div className="bg-gray-50 px-3 py-2 rounded-xl rounded-bl-sm text-sm text-gray-400">
                Escribiendo...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100 flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && enviar()}
            placeholder={`Preguntale algo al ${profe.nombre}...`}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400"
          />
          <button onClick={enviar} disabled={cargando}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}