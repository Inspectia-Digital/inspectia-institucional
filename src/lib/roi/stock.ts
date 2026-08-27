import { fmtMoney, fmtMonths, fmtNum, fmtPct, paybackMonths, roiPct, type RoiModel } from "./types";

/** La precisión que alcanza el conteo asistido. Es una constante del modelo y no un
 *  parámetro: no es algo que el visitante deba estimar. */
const PRECISION_LOGRADA = 99.9;

/**
 * Control de stock en posiciones: contar más rápido con la misma gente, y que lo contado
 * coincida con lo que dice el sistema.
 */
export const stockModel: RoiModel = {
  module: "stock-en-posiciones",
  label: "Control de stock",
  intro: "Cuánto rinde contar por posición desde el celular en vez de con planilla.",

  fields: [
    {
      key: "ftesActuales",
      label: "Operarios en conteo y picking",
      min: 1,
      max: 100,
      unit: "personas",
      primary: true,
    },
    {
      key: "costoFte",
      label: "Costo mensual por operario",
      min: 500,
      max: 5000,
      step: 50,
      unit: "USD",
    },
    {
      key: "ubicacionesTurno",
      label: "Posiciones controladas por turno",
      min: 100,
      max: 10000,
      step: 100,
      unit: "pos.",
      primary: true,
    },
    {
      key: "precisionActual",
      label: "Precisión de stock actual",
      min: 50,
      max: 99.8,
      step: 0.1,
      unit: "%",
    },
    {
      key: "mejoraVelocidad",
      label: "Mejora de velocidad esperada",
      min: 5,
      max: 200,
      step: 5,
      unit: "%",
      primary: true,
    },
    {
      key: "inversionInicial",
      label: "Instalación y hardware (una vez)",
      help: "Si ya tenés una cotización de instalación, ponela acá.",
      min: 0,
      max: 100000,
      step: 500,
      unit: "USD",
    },
    {
      // Sin precio publicado para este módulo: el valor es de referencia y se edita.
      key: "saasMensual",
      label: "Costo mensual estimado de InspectIA",
      help: "Este módulo se cotiza según el depósito. Ponés tu cotización o dejás el valor de referencia.",
      min: 100,
      max: 5000,
      step: 50,
      unit: "USD",
    },
  ],

  defaults: {
    ftesActuales: 8,
    costoFte: 1500,
    ubicacionesTurno: 1200,
    precisionActual: 85,
    mejoraVelocidad: 40,
    inversionInicial: 3000,
    saasMensual: 400,
  },

  compute: (v) => {
    const ubicacionesProyectadas = Math.round(v.ubicacionesTurno * (1 + v.mejoraVelocidad / 100));
    // Las horas que se liberan se expresan en equivalentes de persona, que es como lo
    // piensa quien arma el turno.
    const ftesLiberados = v.ftesActuales * (v.mejoraVelocidad / 100);
    const ahorroLaboral = ftesLiberados * v.costoFte * 13;
    const costoSaasAnual = v.saasMensual * 12;
    const ahorroNeto = ahorroLaboral - costoSaasAnual;

    return {
      headline: {
        value: fmtMoney(ahorroNeto),
        caption: "de ahorro neto por año, ya descontado InspectIA",
      },
      support: [
        {
          value: fmtMonths(paybackMonths(v.inversionInicial, ahorroNeto)),
          caption: "para recuperar la inversión",
        },
        {
          value: fmtNum(ubicacionesProyectadas),
          caption: `posiciones por turno, contra ${fmtNum(v.ubicacionesTurno)} hoy`,
        },
      ],
      assumptions: [
        {
          label: "Precisión proyectada",
          value: `${fmtPct(PRECISION_LOGRADA)}, contra ${fmtPct(v.precisionActual)} hoy`,
        },
        { label: "Horas liberadas", value: `${fmtNum(ftesLiberados)} equivalentes de persona` },
        { label: "Ahorro laboral anual", value: fmtMoney(ahorroLaboral) },
        { label: "Costo anual de InspectIA", value: fmtMoney(costoSaasAnual) },
        { label: "Inversión inicial", value: fmtMoney(v.inversionInicial) },
      ],
      roiPct: roiPct(ahorroNeto, v.inversionInicial),
      paybackMonths: paybackMonths(v.inversionInicial, ahorroNeto),
    };
  },
};
