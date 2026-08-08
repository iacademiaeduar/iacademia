import {
  contarTemasCompletados,
  contarEjerciciosCompletados,
  calcularXP,
  calcularNivel,
  tituloNivel,
  calcularPctMateria,
  calcularPromedioGeneral,
  definirLogros,
  XP_POR_TEMA,
  XP_POR_NIVEL,
} from './gamificacion';

describe('contarTemasCompletados', () => {
  test('progreso vacío o inexistente da 0', () => {
    expect(contarTemasCompletados(undefined)).toBe(0);
    expect(contarTemasCompletados(null)).toBe(0);
    expect(contarTemasCompletados({})).toBe(0);
  });

  test('suma completados de todas las materias', () => {
    const progreso = {
      matematica: { completados: ['1-1', '1-2'], desbloqueados: [] },
      lengua: { completados: ['1-1'], desbloqueados: [] },
    };
    expect(contarTemasCompletados(progreso)).toBe(3);
  });

  test('ignora materias sin campo completados', () => {
    const progreso = { matematica: { desbloqueados: ['1-2'] } };
    expect(contarTemasCompletados(progreso)).toBe(0);
  });
});

describe('calcularXP', () => {
  test('es contarTemasCompletados × XP_POR_TEMA', () => {
    const progreso = { matematica: { completados: ['1-1', '1-2', '1-3'] } };
    expect(calcularXP(progreso)).toBe(3 * XP_POR_TEMA);
  });

  test('sin progreso da 0 XP', () => {
    expect(calcularXP(undefined)).toBe(0);
  });
});

describe('calcularNivel', () => {
  test('0 XP es nivel 1, 0% de avance, faltan XP_POR_NIVEL', () => {
    expect(calcularNivel(0)).toEqual({ nivel: 1, xpEnNivel: 0, faltan: XP_POR_NIVEL, pct: 0 });
  });

  test('a mitad de camino del nivel 1', () => {
    const r = calcularNivel(250);
    expect(r.nivel).toBe(1);
    expect(r.xpEnNivel).toBe(250);
    expect(r.faltan).toBe(250);
    expect(r.pct).toBe(50);
  });

  test('cruzar exactamente XP_POR_NIVEL sube de nivel y resetea el contador', () => {
    const r = calcularNivel(XP_POR_NIVEL);
    expect(r.nivel).toBe(2);
    expect(r.xpEnNivel).toBe(0);
    expect(r.pct).toBe(0);
  });

  test('750 XP es nivel 2 a mitad de camino', () => {
    const r = calcularNivel(750);
    expect(r.nivel).toBe(2);
    expect(r.xpEnNivel).toBe(250);
    expect(r.pct).toBe(50);
  });
});

describe('tituloNivel', () => {
  test.each([
    [1, 'Estudiante Inicial'],
    [2, 'Estudiante Inicial'],
    [3, 'Estudiante Avanzado'],
    [5, 'Estudiante Avanzado'],
    [6, 'Estudiante Experto'],
    [10, 'Estudiante Experto'],
    [11, 'Maestro iAcademia'],
    [100, 'Maestro iAcademia'],
  ])('nivel %i → %s', (nivel, esperado) => {
    expect(tituloNivel(nivel)).toBe(esperado);
  });
});

describe('calcularPctMateria', () => {
  test('sin progreso da 0%', () => {
    expect(calcularPctMateria('matematica', 1, undefined)).toBe(0);
  });

  test('materia/año sin contenido da 0% (no explota)', () => {
    expect(calcularPctMateria('materia_inexistente', 1, {})).toBe(0);
  });

  test('matemática año 1 con 1 de 7 temas completados da 14%', () => {
    const progreso = { matematica: { completados: ['1-1'] } };
    expect(calcularPctMateria('matematica', 1, progreso)).toBe(14);
  });

  test('completar todos los temas de una unidad da 100% solo si son todos los temas de la materia', () => {
    // matemática año 3 tiene exactamente 2 temas en total (unidad 1: fórmula resolvente + trigonometría)
    const progreso = { matematica: { completados: ['1-1', '1-2'] } };
    expect(calcularPctMateria('matematica', 3, progreso)).toBe(100);
  });
});

describe('calcularPromedioGeneral', () => {
  test('sin progreso da 0%', () => {
    expect(calcularPromedioGeneral(1, undefined)).toBe(0);
  });

  test('con 1 tema completado en una sola materia de las 6, coincide con el promedio real observado en la app', () => {
    // Verificado manualmente en el navegador: matemática año1 1/7 temas -> 14%,
    // las otras 5 materias en 0% -> promedio (14+0+0+0+0+0)/6 = 2.33 -> redondea a 2.
    const progreso = { matematica: { completados: ['1-1'] } };
    expect(calcularPromedioGeneral(1, progreso)).toBe(2);
  });
});

describe('contarEjerciciosCompletados', () => {
  test('sin progreso da 0', () => {
    expect(contarEjerciciosCompletados(undefined, 1)).toBe(0);
  });

  test('cuenta los ejercicios reales del tema completado, no solo 1 por tema', () => {
    // "Números hasta 10.000" (matemática año1, unidad1-tema1) tiene 7 ejercicios.
    const progreso = { matematica: { completados: ['1-1'] } };
    expect(contarEjerciciosCompletados(progreso, 1)).toBe(7);
  });

  test('suma ejercicios de varios temas y materias', () => {
    const progreso = {
      matematica: { completados: ['1-1', '1-2'] }, // 7 + 4 ejercicios
      lengua: { completados: ['1-1'] }, // 4 ejercicios
    };
    expect(contarEjerciciosCompletados(progreso, 1)).toBe(7 + 4 + 4);
  });

  test('una clave de tema inexistente no rompe el cálculo', () => {
    const progreso = { matematica: { completados: ['99-99'] } };
    expect(contarEjerciciosCompletados(progreso, 1)).toBe(0);
  });
});

describe('definirLogros', () => {
  test('usuario nuevo (sin progreso) no tiene ningún logro obtenido', () => {
    const logros = definirLogros(undefined);
    expect(logros.every(l => l.obtenido === false)).toBe(true);
    expect(logros).toHaveLength(7);
  });

  test('completar un tema desbloquea "Primer paso" y solo ese', () => {
    const usuario = { anio_inscripcion: 1, progreso: { matematica: { completados: ['1-1'] } } };
    const logros = definirLogros(usuario);
    const primerPaso = logros.find(l => l.nombre === 'Primer paso');
    expect(primerPaso.obtenido).toBe(true);
    expect(logros.filter(l => l.obtenido)).toHaveLength(1);
  });

  test('racha de 7 días o más desbloquea el logro de racha de 7, no el de 30', () => {
    const usuario = { racha_dias: 7 };
    const logros = definirLogros(usuario);
    expect(logros.find(l => l.nombre === 'Racha de 7 días').obtenido).toBe(true);
    expect(logros.find(l => l.nombre === 'Racha de 30 días').obtenido).toBe(false);
  });

  test('completar el 100% de una materia desbloquea el logro de 100% pero no el de "todas las materias"', () => {
    // matemática año3 tiene 2 temas en total.
    const usuario = { anio_inscripcion: 3, progreso: { matematica: { completados: ['1-1', '1-2'] } } };
    const logros = definirLogros(usuario);
    expect(logros.find(l => l.nombre === '100% en una materia').obtenido).toBe(true);
    expect(logros.find(l => l.nombre === 'Todas las materias').obtenido).toBe(false);
  });

  test('tener progreso en las 6 materias desbloquea "Todas las materias" sin importar el %', () => {
    const usuario = {
      anio_inscripcion: 1,
      progreso: {
        matematica: { completados: ['1-1'] },
        lengua: { completados: ['1-1'] },
        biologia: { completados: ['1-1'] },
        historia: { completados: ['1-1'] },
        geografia: { completados: ['1-1'] },
        ingles: { completados: ['1-1'] },
      },
    };
    const logros = definirLogros(usuario);
    expect(logros.find(l => l.nombre === 'Todas las materias').obtenido).toBe(true);
  });

  test('40 temas completados alcanza nivel 5 y desbloquea el logro de nivel', () => {
    const completados = Array.from({ length: 40 }, (_, i) => `fake-${i}`);
    const usuario = { progreso: { matematica: { completados } } };
    const logros = definirLogros(usuario);
    expect(logros.find(l => l.nombre === 'Nivel 5').obtenido).toBe(true);
    expect(logros.find(l => l.nombre === '10 temas completados').obtenido).toBe(true);
  });
});
