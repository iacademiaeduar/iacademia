// Configuración central de precios iAcademia
export const PRECIOS = {
  BASE_MENSUAL: 6900,
  INCREMENTO_POR_ANIO: 0.13, // +13% por año
  OPTATIVA_MENSUAL: 1800,
  PREMIUM: {
    ia_datos: 4500,
    derecho: 3500,
    contabilidad: 3500,
    psicologia_avanzada: 3800,
    medicina: 5000,
    ingenieria: 4200,
    comunicacion: 3500,
    arquitectura: 4000,
    biotecnologia: 5000,
    fisica_moderna: 4500,
  },
  DESCUENTOS_OPTATIVAS: {
    4: 0.10,
    6: 0.15,
    8: 0.20,
  }
};

export const calcularPrecioBase = (anio) => {
  return Math.round(PRECIOS.BASE_MENSUAL * Math.pow(1 + PRECIOS.INCREMENTO_POR_ANIO, (anio || 1) - 1));
};

export const calcularDescuentoOptativas = (cantidad) => {
  if (cantidad >= 8) return PRECIOS.DESCUENTOS_OPTATIVAS[8];
  if (cantidad >= 6) return PRECIOS.DESCUENTOS_OPTATIVAS[6];
  if (cantidad >= 4) return PRECIOS.DESCUENTOS_OPTATIVAS[4];
  return 0;
};

export const calcularResumen = (anio, optativasSel, premiumSel, OPTATIVAS, PREMIUM) => {
  const precioBase = calcularPrecioBase(anio);
  const descPct = calcularDescuentoOptativas(optativasSel.length);
  const precioOptBruto = optativasSel.length * PRECIOS.OPTATIVA_MENSUAL;
  const precioOptDesc = Math.round(precioOptBruto * (1 - descPct));
  const precioPremium = premiumSel.reduce((acc, id) => acc + (PRECIOS.PREMIUM[id] || 3500), 0);
  const total = precioBase + precioOptDesc + precioPremium;
  return {
    precioBase, descPct, precioOptBruto, precioOptDesc,
    precioPremium, total, totalAnual: total * 12,
    totalAnualConDesc: Math.round(total * 12 * 0.85),
  };
};