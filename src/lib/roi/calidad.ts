import { fmtMoney, fmtMonths, fmtNum, fmtPct, paybackMonths, roiPct, type RoiModel } from "./types";

/**
 * Control de calidad: lo que se deja de tirar más lo que se deja de mirar a ojo.
 *
 * La cuenta es la misma que tenía la calculadora anterior. Lo que cambia es que ahora es
 * una función pura y que el costo de InspectIA está a la vista en los supuestos.
 */
export const calidadModel: RoiModel = {
  module: "control-de-calidad",
  label: "Control de calidad",
  intro:
    "Cuánto scrap dejás de producir cuando el defecto se detecta en la línea y no al cierre del mes.",

  fields: [
    {
      key: "lineas",
      label: "Líneas de producción",
      min: 1,
      max: 20,
      unit: "líneas",
      primary: true,
    },
    {
      key: "unidadesHora",
      label: "Unidades por hora",
      min: 10,
      max: 5000,
      unit: "u/h",
      primary: true,
    },
    { key: "horasDia", label: "Horas de operación por día", min: 1, max: 24, unit: "h" },
    {
      key: "costoScrap",
      label: "Costo de la unidad descartada",
      min: 0.1,
      max: 500,
      step: 0.1,
      unit: "USD",
    },
    {
      key: "rendimientoActual",
      label: "Rendimiento actual",
      min: 50,
      max: 99.9,
      step: 0.1,
      unit: "%",
      primary: true,
    },
    {
      key: "rendimientoEsperado",
      label: "Rendimiento esperado",
      min: 50,
      max: 100,
      step: 0.1,
      unit: "%",
    },
    {
      key: "personas",
      label: "Personas dedicadas a control visual",
      min: 0,
      max: 50,
      unit: "personas",
    },
    {
      key: "costoPersona",
      label: "Costo mensual por persona",
      min: 100,
      max: 5000,
      step: 50,
      unit: "USD",
    },
    {
      key: "implementacion",
      label: "Inversión inicial por línea",
      min: 1000,
      max: 100000,
      step: 500,
      unit: "USD",
    },
  ],

  defaults: {
    lineas: 2,
    unidadesHora: 50,
    horasDia: 16,
    costoScrap: 5,
    rendimientoActual: 90,
    rendimientoEsperado: 99.5,
    personas: 4,
    costoPersona: 1500,
    implementacion: 15000,
  },

  // El esperado tiene que quedar por encima del actual, o el ahorro sale negativo.
  normalize: (v, changed) => {
    const next = { ...v };
    if (changed === "rendimientoActual" && next.rendimientoActual >= next.rendimientoEsperado) {
      next.rendimientoEsperado = Math.min(100, next.rendimientoActual + 0.1);
    }
    if (changed === "rendimientoEsperado" && next.rendimientoEsperado <= next.rendimientoActual) {
      next.rendimientoActual = Math.max(50, next.rendimientoEsperado - 0.1);
    }
    return next;
  },

  compute: (v) => {
    // 360 días: el año operativo que usa el modelo, no el calendario.
    const unidadesAnuales = v.lineas * v.unidadesHora * v.horasDia * 360;
    const scrapActual = unidadesAnuales * (1 - v.rendimientoActual / 100);
    const scrapEsperado = unidadesAnuales * (1 - v.rendimientoEsperado / 100);
    const ahorroScrap = (scrapActual - scrapEsperado) * v.costoScrap;
    // 13 sueldos: doce más el aguinaldo.
    const ahorroLaboral = v.personas * v.costoPersona * 13;
    const ahorroTotal = ahorroScrap + ahorroLaboral;
    const inversion = v.implementacion * v.lineas;

    return {
      headline: {
        value: fmtMoney(ahorroTotal),
        caption: "de ahorro por año, con estos parámetros",
      },
      support: [
        {
          value: fmtMonths(paybackMonths(inversion, ahorroTotal)),
          caption: "para recuperar la inversión",
        },
        {
          value: fmtNum(scrapActual - scrapEsperado),
          caption: "unidades por año que dejás de descartar",
        },
      ],
      assumptions: [
        { label: "Producción anual", value: `${fmtNum(unidadesAnuales)} u` },
        { label: "Ahorro por scrap evitado", value: fmtMoney(ahorroScrap) },
        { label: "Ahorro en control manual", value: fmtMoney(ahorroLaboral) },
        { label: "Inversión inicial de InspectIA", value: fmtMoney(inversion) },
        {
          label: "Mejora de rendimiento",
          value: fmtPct(v.rendimientoEsperado - v.rendimientoActual),
        },
      ],
      roiPct: roiPct(ahorroTotal, inversion),
      paybackMonths: paybackMonths(inversion, ahorroTotal),
    };
  },
};
