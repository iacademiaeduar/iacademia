// Cálculo de XP, nivel y logros a partir del progreso real del alumno.
// Todo se deriva de usuario.progreso (ver Materias.js) — nada hardcodeado.
import { CONTENIDO_EDUCATIVO, getContenidoMateria } from './ContenidoEducativo';

export const XP_POR_TEMA = 50;
export const XP_POR_NIVEL = 500;

const MATERIAS_IDS = Object.keys(CONTENIDO_EDUCATIVO);

export const contarTemasCompletados = (progreso) => {
  if (!progreso) return 0;
  return Object.values(progreso).reduce((acc, p) => acc + (p?.completados?.length || 0), 0);
};

export const contarEjerciciosCompletados = (progreso, anio) => {
  if (!progreso) return 0;
  let total = 0;
  for (const materiaId of Object.keys(progreso)) {
    const datos = getContenidoMateria(materiaId, anio);
    if (!datos) continue;
    for (const key of progreso[materiaId]?.completados || []) {
      const [uId, tId] = key.split('-').map(Number);
      const t = datos.unidades.find(u => u.id === uId)?.temas.find(t => t.id === tId);
      if (t) total += (t.ejercicios || []).length;
    }
  }
  return total;
};

export const calcularXP = (progreso) => contarTemasCompletados(progreso) * XP_POR_TEMA;

export const calcularNivel = (xp) => {
  const nivel = Math.floor(xp / XP_POR_NIVEL) + 1;
  const xpEnNivel = xp % XP_POR_NIVEL;
  return { nivel, xpEnNivel, faltan: XP_POR_NIVEL - xpEnNivel, pct: Math.round((xpEnNivel / XP_POR_NIVEL) * 100) };
};

const TITULOS_NIVEL = [
  { max: 2, titulo: 'Estudiante Inicial' },
  { max: 5, titulo: 'Estudiante Avanzado' },
  { max: 10, titulo: 'Estudiante Experto' },
  { max: Infinity, titulo: 'Maestro iAcademia' },
];
export const tituloNivel = (nivel) => TITULOS_NIVEL.find(t => nivel <= t.max)?.titulo || 'Estudiante';

// % de temas completados de una materia para el año del alumno.
export const calcularPctMateria = (materiaId, anio, progreso) => {
  const datos = getContenidoMateria(materiaId, anio);
  const temas = datos?.unidades.flatMap(u => u.temas) || [];
  if (!temas.length) return 0;
  const completados = progreso?.[materiaId]?.completados?.length || 0;
  return Math.round((completados / temas.length) * 100);
};

export const calcularPromedioGeneral = (anio, progreso) => {
  const ids = MATERIAS_IDS.filter(id => CONTENIDO_EDUCATIVO[id].años[anio]);
  if (!ids.length) return 0;
  const total = ids.reduce((acc, id) => acc + calcularPctMateria(id, anio, progreso), 0);
  return Math.round(total / ids.length);
};

// Definición de logros — todos derivados de datos reales del usuario, ninguno hardcodeado como "obtenido".
export const definirLogros = (usuario) => {
  const progreso = usuario?.progreso || {};
  const anio = usuario?.anio_inscripcion || usuario?.anio_escolar || 3;
  const xp = calcularXP(progreso);
  const { nivel } = calcularNivel(xp);
  const racha = usuario?.racha_dias || 0;
  const temasCompletados = contarTemasCompletados(progreso);
  const idsConContenido = MATERIAS_IDS.filter(id => CONTENIDO_EDUCATIVO[id].años[anio]);
  const pctPorMateria = Object.fromEntries(idsConContenido.map(id => [id, calcularPctMateria(id, anio, progreso)]));
  const materiasConAlgo = idsConContenido.filter(id => (progreso[id]?.completados?.length || 0) > 0).length;
  const maxPct = Math.max(0, ...Object.values(pctPorMateria));

  return [
    { id: 1, emoji: '🚀', nombre: 'Primer paso', desc: 'Completá tu primer tema en cualquier materia', categoria: 'inicio', xp: 50, obtenido: temasCompletados >= 1, progreso: Math.min(temasCompletados, 1), meta: 1 },
    { id: 2, emoji: '🔥', nombre: 'Racha de 7 días', desc: 'Estudiá 7 días seguidos', categoria: 'constancia', xp: 100, obtenido: racha >= 7, progreso: Math.min(racha, 7), meta: 7 },
    { id: 3, emoji: '🏆', nombre: 'Racha de 30 días', desc: 'Estudiá 30 días seguidos', categoria: 'constancia', xp: 500, obtenido: racha >= 30, progreso: Math.min(racha, 30), meta: 30 },
    { id: 4, emoji: '💯', nombre: '100% en una materia', desc: 'Completá todos los temas de una materia', categoria: 'materias', xp: 300, obtenido: maxPct >= 100, progreso: maxPct, meta: 100 },
    { id: 5, emoji: '📚', nombre: 'Todas las materias', desc: `Completá al menos un tema en cada una de las ${idsConContenido.length} materias`, categoria: 'materias', xp: 250, obtenido: materiasConAlgo >= idsConContenido.length, progreso: materiasConAlgo, meta: idsConContenido.length },
    { id: 6, emoji: '🧠', nombre: 'Nivel 5', desc: 'Alcanzá el nivel 5 acumulando XP', categoria: 'nivel', xp: 400, obtenido: nivel >= 5, progreso: Math.min(xp, 5 * XP_POR_NIVEL), meta: 5 * XP_POR_NIVEL },
    { id: 7, emoji: '⚡', nombre: '10 temas completados', desc: 'Completá 10 temas en total, en cualquier materia', categoria: 'ejercicios', xp: 150, obtenido: temasCompletados >= 10, progreso: Math.min(temasCompletados, 10), meta: 10 },
  ];
};
