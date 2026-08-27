import { fmtMoney, fmtMonths, fmtNum, paybackMonths, roiPct, type RoiModel } from "./types";

/**
 * Recepción de mercadería: menos gente en el muelle y menos error de ingreso, más el
 * capital que se libera al acortar el lead time.
 */
export const recepcionModel: RoiModel = {
  module: "recepcion",
  label: "Recepción de mercadería",
  intro: "Cuánto se libera al acortar la descarga y dejar de recontar lo que ya entró mal cargado.",

  fields: [
    {
      key: "volumenDiario",
      label: "Unidades recibidas por día",
      min: 1000,
      max: 500000,
      step: 1000,
      unit: "u/día",
      primary: true,
    },
    { key: "valorUnitario", label: "Valor de la unidad", min: 1, max: 1000, unit: "USD" },
    { key: "tasaError", label: "Error de ingreso actual", min: 0, max: 20, step: 0.1, unit: "%" },
    {
      key: "ftesActuales",
      label: "Operarios en recepción hoy",
      min: 1,
      max: 100,
      unit: "personas",
      primary: true,
    },
    {
      key: "ftesInspectia",
      label: "Operarios con InspectIA",
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
    { key: "porcentajeConteo", label: "Mercadería que se cuenta", min: 0, max: 100, unit: "%" },
    { key: "leadTimeActual", label: "Lead time de recepción hoy", min: 1, max: 168, unit: "h" },
    {
      key: "inversionInicial",
      label: "Instalación y hardware (una vez)",
      help: "Si ya tenés una cotización de instalación, ponela acá.",
      min: 0,
      max: 500000,
      step: 1000,
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
    volumenDiario: 74000,
    valorUnitario: 50,
    tasaError: 2.5,
    ftesActuales: 24,
    ftesInspectia: 15,
    costoFte: 2500,
    porcentajeConteo: 80,
    leadTimeActual: 48,
    inversionInicial: 70000,
    saasMensual: 800,
  },

  // Con InspectIA no puede hacer falta más gente que sin InspectIA.
  normalize: (v, changed) => {
    const next = { ...v };
    if (changed === "ftesActuales" && next.ftesActuales <= next.ftesInspectia) {
      next.ftesInspectia = Math.max(1, next.ftesActuales - 1);
    }
    if (changed === "ftesInspectia" && next.ftesInspectia >= next.ftesActuales) {
      next.ftesActuales = Math.min(100, next.ftesInspectia + 1);
    }
    return next;
  },

  compute: (v) => {
    const volumenAnual = v.volumenDiario * 360;
    const ahorroLaboral = (v.ftesActuales - v.ftesInspectia) * v.costoFte * 13;
    // Sólo se cuenta el error por encima del 1%: por debajo de eso no se le atribuye
    // la mejora al sistema, se le atribuye al ruido.
    const ahorroErrores =
      v.tasaError > 1 ? volumenAnual * v.valorUnitario * ((v.tasaError - 1) / 100) : 0;
    const ahorroOperativo = ahorroLaboral + ahorroErrores;
    const costoSaasAnual = v.saasMensual * 12;
    const ahorroNeto = ahorroOperativo - costoSaasAnual;

    const leadTimeEsperado = v.leadTimeActual - v.leadTimeActual * (v.porcentajeConteo / 100) * 0.4;
    // Mercadería parada esperando ser ingresada: es plata inmovilizada.
    const wipActual = v.volumenDiario * v.valorUnitario * (v.leadTimeActual / 24);
    const wipProyectado = v.volumenDiario * v.valorUnitario * (leadTimeEsperado / 24);
    const capitalLiberado = wipActual - wipProyectado;

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
          value: fmtMoney(capitalLiberado),
          caption: "de capital que deja de estar inmovilizado",
        },
      ],
      assumptions: [
        { label: "Volumen anual", value: `${fmtNum(volumenAnual)} u` },
        { label: "Ahorro por menos personal", value: fmtMoney(ahorroLaboral) },
        { label: "Ahorro por menos error de ingreso", value: fmtMoney(ahorroErrores) },
        { label: "Costo anual de InspectIA", value: fmtMoney(costoSaasAnual) },
        { label: "Inversión inicial", value: fmtMoney(v.inversionInicial) },
        {
          label: "Lead time proyectado",
          value: `${fmtNum(leadTimeEsperado)} h, contra ${fmtNum(v.leadTimeActual)} h`,
        },
      ],
      roiPct: roiPct(ahorroNeto, v.inversionInicial),
      paybackMonths: paybackMonths(v.inversionInicial, ahorroNeto),
    };
  },
};
