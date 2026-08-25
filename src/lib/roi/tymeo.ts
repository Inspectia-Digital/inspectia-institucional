import { fmtMoney, fmtNum, fmtPct, paybackMonths, roiPct, type RoiModel } from "./types";

/**
 * TYMEO: cuánto vale cada punto de OEE.
 *
 * A diferencia de los otros tres, el resultado no es un número sino una matriz de
 * sensibilidad: cómo se mueve el retorno según la mejora de OEE que logres y el volumen
 * que tenga la línea. Una mejora de OEE es difícil de estimar de antemano, y mostrar un
 * solo escenario invita a discutir el supuesto en vez del negocio.
 */

/** Escenarios alrededor de lo que el usuario cargó: un cuarto, la mitad, lo cargado,
 *  el doble y el cuádruple. */
const MEJORA_FACTORS = [0.25, 0.5, 1, 2, 4];
const VOLUMEN_FACTORS = [0.8, 0.9, 1, 1.1, 1.2];
const CENTER = 2;

export const tymeoModel: RoiModel = {
  module: "tymeo",
  label: "TYMEO · OEE",
  intro:
    "Cuánto vale cada punto de OEE en tu línea, y cómo cambia el retorno si el volumen se mueve.",

  fields: [
    {
      key: "volumenMensual",
      label: "Producción mensual de la línea",
      min: 1000,
      max: 200000,
      step: 1000,
      unit: "u/mes",
      primary: true,
    },
    {
      key: "costoUnitario",
      label: "Costo de producción por unidad",
      min: 1,
      max: 1000,
      unit: "USD",
      primary: true,
    },
    {
      key: "mejoraEsperada",
      label: "Mejora de OEE esperada",
      min: 0.05,
      max: 5,
      step: 0.05,
      unit: "%",
      primary: true,
    },
    // TODO(equipo): §7.6 dice que TYMEO Start cuesta USD 35 por planta y mes, y este
    // modelo viene usando USD 250 por línea y mes. Puede que sean cosas distintas —el
    // plan de software contra el despliegue completo— pero hoy la web dice las dos.
    // Se deja editable y a la vista hasta que el equipo defina cuál corresponde acá.
    {
      key: "costoMensual",
      label: "Costo mensual de InspectIA por línea",
      min: 35,
      max: 2000,
      step: 5,
      unit: "USD",
    },
  ],

  defaults: {
    volumenMensual: 9000,
    costoUnitario: 50,
    mejoraEsperada: 0.2,
    costoMensual: 250,
  },

  compute: (v) => {
    const costoAnual = v.costoMensual * 12;
    const mejoras = MEJORA_FACTORS.map((f) => v.mejoraEsperada * f);
    const volumenes = VOLUMEN_FACTORS.map((f) => Math.round(v.volumenMensual * f));

    const cellRoi = (volumen: number, mejora: number) => {
      const ahorroAnual = volumen * 12 * v.costoUnitario * (mejora / 100);
      return roiPct(ahorroAnual, costoAnual);
    };

    const rows = volumenes.map((vol) => ({
      label: `${fmtNum(vol)} u/mes`,
      cells: mejoras.map((m) => cellRoi(vol, m)),
    }));

    // El escenario que el usuario cargó: volumen y mejora tal cual los puso.
    const ahorroBase = v.volumenMensual * 12 * v.costoUnitario * (v.mejoraEsperada / 100);
    const roiBase = roiPct(ahorroBase, costoAnual);

    return {
      headline: {
        value: fmtPct(roiBase),
        caption: "de retorno el primer año, en el escenario que cargaste",
      },
      support: [
        { value: fmtMoney(ahorroBase), caption: "de ahorro por año y por línea" },
        { value: fmtMoney(costoAnual), caption: "de costo anual de InspectIA por línea" },
      ],
      assumptions: [
        { label: "Volumen anual de la línea", value: `${fmtNum(v.volumenMensual * 12)} u` },
        { label: "Mejora de OEE cargada", value: fmtPct(v.mejoraEsperada) },
        { label: "Costo anual de InspectIA por línea", value: fmtMoney(costoAnual) },
      ],
      matrix: {
        rowLabel: "Volumen mensual",
        columns: mejoras.map((m) => fmtPct(m)),
        rows,
        center: { row: CENTER, col: CENTER },
      },
      roiPct: roiBase,
      paybackMonths: paybackMonths(costoAnual, ahorroBase - costoAnual),
    };
  },
};
