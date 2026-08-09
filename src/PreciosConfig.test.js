import { PRECIOS, calcularPrecioBase, calcularDescuentoOptativas, calcularResumen, calcularResumenApoyoEscolar } from './PreciosConfig';

describe('calcularPrecioBase', () => {
  test('año 1 es el precio base sin incremento', () => {
    expect(calcularPrecioBase(1)).toBe(6900);
  });

  test('año 2 aplica +13%', () => {
    expect(calcularPrecioBase(2)).toBe(7797);
  });

  test('año 3 aplica +13% compuesto (no simple)', () => {
    expect(calcularPrecioBase(3)).toBe(8811);
  });

  test('año undefined/0 cae al año 1 (anio || 1)', () => {
    expect(calcularPrecioBase(undefined)).toBe(6900);
    expect(calcularPrecioBase(0)).toBe(6900);
  });
});

describe('calcularDescuentoOptativas', () => {
  test.each([
    [0, 0],
    [1, 0],
    [3, 0],
    [4, 0.10],
    [5, 0.10],
    [6, 0.15],
    [7, 0.15],
    [8, 0.20],
    [12, 0.20],
  ])('%i optativas → %s de descuento', (cantidad, esperado) => {
    expect(calcularDescuentoOptativas(cantidad)).toBe(esperado);
  });
});

describe('calcularResumen', () => {
  test('sin optativas ni premium, el total es solo el precio base', () => {
    const r = calcularResumen(1, [], []);
    expect(r.precioBase).toBe(6900);
    expect(r.descPct).toBe(0);
    expect(r.precioOptDesc).toBe(0);
    expect(r.precioPremium).toBe(0);
    expect(r.total).toBe(6900);
    expect(r.totalAnual).toBe(6900 * 12);
  });

  test('4 optativas aplican 10% de descuento sobre el bruto de optativas, no sobre el total', () => {
    const r = calcularResumen(1, ['a', 'b', 'c', 'd'], []);
    expect(r.precioOptBruto).toBe(4 * PRECIOS.OPTATIVA_MENSUAL);
    expect(r.descPct).toBe(0.10);
    expect(r.precioOptDesc).toBe(Math.round(4 * PRECIOS.OPTATIVA_MENSUAL * 0.9));
    expect(r.total).toBe(6900 + r.precioOptDesc);
  });

  test('materias premium conocidas usan su precio propio, desconocidas caen al default de $3500', () => {
    const r = calcularResumen(1, [], ['medicina', 'id_que_no_existe']);
    expect(r.precioPremium).toBe(PRECIOS.PREMIUM.medicina + 3500);
  });

  test('totalAnualConDesc es 15% menos que totalAnual, redondeado', () => {
    const r = calcularResumen(1, [], []);
    expect(r.totalAnualConDesc).toBe(Math.round(r.totalAnual * 0.85));
    expect(r.totalAnualConDesc).toBeLessThan(r.totalAnual);
  });

  test('el total combina base + optativas con descuento + premium', () => {
    const r = calcularResumen(2, ['a', 'b', 'c', 'd', 'e', 'f'], ['derecho']);
    const precioBase = calcularPrecioBase(2);
    const descPct = calcularDescuentoOptativas(6);
    const precioOptDesc = Math.round(6 * PRECIOS.OPTATIVA_MENSUAL * (1 - descPct));
    expect(r.total).toBe(precioBase + precioOptDesc + PRECIOS.PREMIUM.derecho);
  });
});

describe('calcularResumenApoyoEscolar', () => {
  test('sin materias seleccionadas, el total es 0', () => {
    const r = calcularResumenApoyoEscolar([]);
    expect(r.cantidad).toBe(0);
    expect(r.total).toBe(0);
  });

  test('el total es cantidad × precio por materia, sin descuentos ni base', () => {
    const r = calcularResumenApoyoEscolar(['matematica', 'lengua', 'ingles']);
    expect(r.cantidad).toBe(3);
    expect(r.total).toBe(3 * PRECIOS.APOYO_ESCOLAR_MENSUAL);
  });

  test('totalAnualConDesc es 15% menos que totalAnual, redondeado', () => {
    const r = calcularResumenApoyoEscolar(['matematica', 'lengua']);
    expect(r.totalAnualConDesc).toBe(Math.round(r.totalAnual * 0.85));
  });
});
