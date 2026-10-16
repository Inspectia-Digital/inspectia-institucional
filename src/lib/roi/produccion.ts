import { priceOf } from "@/content/pricing";
import { fmtMoney, fmtMonths, fmtNum, fmtPct, paybackMonths, roiPct, type RoiModel } from "./types";

/**
 * TYMEO: cuánto vale cada punto de OEE.
 *
 * A diferencia de los otros tres, el resultado no es un número sino una matriz de
 * sensibilidad: cómo se mueve el retorno según la mejora de OEE que logres y el volumen
 * que tenga la línea. Una mejora de OEE es difícil de estimar de antemano, y mostrar un
 * solo escenario invita a discutir el supuesto en vez del negocio.
 *
 * **El costo sale del precio publicado y no de un slider.** Hubo un campo editable de
 * "costo mensual por línea" con 250 por defecto mientras la web publicaba otra cifra con
 * otra unidad, y después un selector de planes que ya no existe. Hoy el módulo cuesta lo
 * que dice la grilla, por línea y por mes, y el modelo lo lee de ahí: una sola fuente.
 *
 * **El costo escala con las líneas, y eso cambió el modelo.** Con los planes viejos el
 * abono era por planta, así que sumar líneas mejoraba el retorno hasta el límite del plan.
 * Producción se cobra por línea: el ahorro y el costo crecen juntos, y el retorno deja de
 * depender de cuántas líneas se midan. Es menos vistoso y es lo que cobramos.
 */

/** Escenarios alrededor de lo que el usuario cargó: un cuarto, la mitad, lo cargado,
 *  el doble y el cuádruple. */
const MEJORA_FACTORS = [0.25, 0.5, 1, 2, 4];
const VOLUMEN_FACTORS = [0.8, 0.9, 1, 1.1, 1.2];
const CENTER = 2;

/** El precio de lista del módulo, de `pricing.ts`, para que no haya dos fuentes. */
const PRECIO_LINEA = (() => {
  const p = priceOf("produccion");
  if (!p) throw new Error("Producción no tiene precio en pricing.ts");
  return p.usd;
})();

export const produccionModel: RoiModel = {
  module: "produccion",
  label: "Producción · OEE",
  intro:
    "Cuánto vale cada punto de OEE en tu línea, y cómo cambia el retorno si el volumen se mueve.",

  fields: [
    {
      key: "lineas",
      label: "Cuántas líneas querés medir",
      min: 1,
      max: 20,
      unit: "líneas",
      help: "Cada línea que medís suma su propio abono, así que el retorno no depende de cuántas midas.",
    },
    {
      key: "volumenMensual",
      label: "Producción mensual por línea",
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
    {
      key: "inversionInicial",
      label: "Instalación y hardware (una vez)",
      min: 0,
      max: 200000,
      step: 500,
      unit: "USD",
      // Arranca en 0 a propósito: no hay un rango típico publicable y poner uno inventado
      // es peor que no ponerlo. Con 0, el cálculo es el del software solo.
      help: "Si ya tenés una cotización de instalación, ponela acá.",
    },
  ],

  defaults: {
    lineas: 1,
    volumenMensual: 9000,
    costoUnitario: 50,
    mejoraEsperada: 0.2,
    inversionInicial: 0,
  },

  compute: (v) => {
    // Por línea y por mes: el abono acompaña a la cantidad de líneas medidas.
    const costoAnual = PRECIO_LINEA * v.lineas * 12;
    const mejoras = MEJORA_FACTORS.map((f) => v.mejoraEsperada * f);
    const volumenes = VOLUMEN_FACTORS.map((f) => Math.round(v.volumenMensual * f));

    const ahorroDe = (volumenMensual: number, mejora: number) =>
      v.lineas * volumenMensual * 12 * v.costoUnitario * (mejora / 100);

    const rows = volumenes.map((vol) => ({
      label: `${fmtNum(vol)} u/mes`,
      cells: mejoras.map((m) => roiPct(ahorroDe(vol, m), costoAnual)),
    }));

    const ahorroBase = ahorroDe(v.volumenMensual, v.mejoraEsperada);
    const netoAnual = ahorroBase - costoAnual;

    const notes: string[] = [];
    if (v.lineas === 1) {
      notes.push(
        "Una línea con carga manual es gratis para siempre, así que todo lo que recuperes ahí es ganancia. El cálculo de abajo toma el plan pago, que es el que deja conectar el PLC.",
      );
    }
    if (v.lineas > 1) {
      notes.push(
        `Cada módulo que sumes descuenta 15 puntos sobre el total, hasta un 50 %. El cálculo no lo aplica: toma ${fmtMoney(PRECIO_LINEA)} por línea sin descuento.`,
      );
    }

    return {
      headline: {
        value: fmtPct(roiPct(ahorroBase, costoAnual)),
        caption: "de retorno el primer año, en el escenario que cargaste",
      },
      support: [
        { value: fmtMoney(ahorroBase), caption: "de ahorro por año, con todas las líneas" },
        // El repago es lo que hace visible la instalación: sin mostrarlo, cargar una
        // cotización de hardware no cambiaba nada en pantalla.
        {
          value: fmtMonths(paybackMonths(v.inversionInicial + costoAnual, netoAnual)),
          caption: "para recuperar el abono y la instalación",
        },
      ],
      assumptions: [
        { label: "Líneas medidas", value: fmtNum(v.lineas) },
        {
          label: "Volumen anual",
          value: `${fmtNum(v.lineas * v.volumenMensual * 12)} u, en ${fmtNum(v.lineas)} ${v.lineas === 1 ? "línea" : "líneas"}`,
        },
        { label: "Mejora de OEE cargada", value: fmtPct(v.mejoraEsperada) },
        { label: "Precio del módulo", value: `${fmtMoney(PRECIO_LINEA)} por línea y mes` },
        { label: "Costo anual del abono", value: fmtMoney(costoAnual) },
        { label: "Instalación y hardware", value: fmtMoney(v.inversionInicial) },
      ],
      matrix: {
        rowLabel: "Volumen mensual por línea",
        columns: mejoras.map((m) => fmtPct(m)),
        rows,
        center: { row: CENTER, col: CENTER },
      },
      notes,
      roiPct: roiPct(ahorroBase, costoAnual),
      // La instalación entra en el repago aunque no entre en el ROI: con 0 el resultado es
      // idéntico al que daba el modelo anterior.
      paybackMonths: paybackMonths(v.inversionInicial + costoAnual, netoAnual),
    };
  },
};
