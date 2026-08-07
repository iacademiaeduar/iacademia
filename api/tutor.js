// Proxy server-side a la API de Anthropic para el Tutor IA.
// La ANTHROPIC_API_KEY vive solo acá (variable de entorno en Vercel), nunca en el frontend.

const PROFES = {
  matematica: 'Marcos',
  lengua: 'Ana',
  biologia: 'Laura',
  historia: 'Roberto',
  geografia: 'Valeria',
  ingles: 'James',
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { materia, historial } = req.body || {};

  if (!PROFES[materia]) {
    res.status(400).json({ error: 'Materia inválida' });
    return;
  }
  if (!Array.isArray(historial) || historial.length === 0) {
    res.status(400).json({ error: 'Historial inválido' });
    return;
  }

  const mensajes = historial
    .filter(m => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
    .slice(-30)
    .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1000,
        system: `Sos Profe ${PROFES[materia]}, el tutor de ${materia} de iAcademia, plataforma educativa para secundaria argentina (13-18 años). Respondé siempre en español rioplatense, de forma clara, amigable y con ejemplos concretos adaptados a estudiantes argentinos. Usá un tono cercano, como un profe que realmente quiere que el alumno entienda. Respondé de forma concisa pero completa. Nunca resuelvas la tarea completa por el alumno: guialo para que llegue a la respuesta.`,
        messages: mensajes,
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      res.status(anthropicRes.status).json({ error: data?.error?.message || 'Error de la API de Anthropic' });
      return;
    }

    const texto = data.content?.[0]?.text || 'No pude responder, intentá de nuevo.';
    res.status(200).json({ texto });
  } catch (e) {
    res.status(502).json({ error: 'No se pudo conectar con el tutor IA' });
  }
};
