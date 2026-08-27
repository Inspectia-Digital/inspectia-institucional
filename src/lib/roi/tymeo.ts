import { TYMEO_PLANS } from "@/content/pricing";
import {
  fmtMoney,
  fmtMonths,
  fmtNum,
  fmtPct,
  paybackMonths,
  roiPct,
  type RoiModel,
  type RoiValues,
} from "./types";

/**
 * TYMEO: cuánto vale cada punto de OEE.
 *
 * A diferencia de los otros tres, el resultado no es un número sino una matriz de
 * sensibilidad: cómo se mueve el retorno según la mejora de OEE que logres y el volumen
 * que tenga la línea. Una mejora de OEE es difícil de estimar de antemano, y mostrar un
 * solo escenario invita a discutir el supuesto en vez del negocio.
 *
 * **El costo sale del plan elegido y no de un slider.** Antes había un campo editable de
 * "costo mensual por línea" con 250 por defecto, mientras la página de planes y la home
 * publicaban USD 35 por planta y mes: dos cifras distintas, con dos unidades distintas, a
 * la vista en la misma página. Ahora el visitante elige plan y el modelo calcula el costo,
 * que además es un dato que no tiene por qué saber de memoria.
 */

/** Escenarios alrededor de lo que el usuario cargó: un cuarto, la mitad, lo cargado,
 *  el doble y el cuádruple. */
const MEJORA_FACTORS = [0.25, 0.5, 1, 2, 4];
const VOLUMEN_FACTORS = [0.8, 0.9, 1, 1.1, 1.2];
const CENTER = 2;

/**
 * Los planes que se pueden calcular, con sus límites.
 *
 * El precio sale de `pricing.ts` para que no haya dos fuentes: si mañana cambia el precio
 * de Start, cambia acá solo. Los límites de líneas y plantas están en el texto de las
 * prestaciones de cada plan y no en un campo, así que se declaran acá con su origen.
 *
 * Free no entra: cuesta 0, y un retorno sobre inversión cero es una división por cero.
 * Enterprise tampoco: se cotiza, así que no tiene precio con el que calcular.
 */
const PLANS = [
  { id: "start", label: "Start", maxLineas: 3, maxPlantas: 1 },
  { id: "pro", label: "Pro", maxLineas: Infinity, maxPlantas: 3 },
].map((p) => {
  const base = TYMEO_PLANS.find((x) => x.id === p.id)?.base;
  if (typeof base !== "number") {
    throw new Error(`El plan "${p.id}" no tiene precio en pricing.ts`);
  }
  return { ...p, base };
});

const START = PLANS[0];
const PRO = PLANS[1];

/** Qué plan corresponde a una cantidad de líneas. Nunca baja de plan por su cuenta: si el
 *  visitante eligió Pro con una línea, es su decisión. */
const planForValues = (values: RoiValues) => {
  const chosen = PLANS.find((p) => p.base === values.plan) ?? START;
  if (values.lineas > chosen.maxLineas) {
    return PLANS.find((p) => values.lineas <= p.maxLineas) ?? PRO;
  }
  return chosen;
};

export const tymeoModel: RoiModel = {
  module: "tymeo",
  label: "TYMEO · OEE",
  intro:
    "Cuánto vale cada punto de OEE en tu línea, y cómo cambia el retorno si el volumen se mueve.",

  fields: [
    {
      key: "lineas",
      label: "Cuántas líneas querés medir",
      min: 1,
      max: 20,
      unit: "líneas",
      help: "El plan se paga por planta, así que sumar líneas mejora el retorno hasta el límite del plan.",
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
      key: "plan",
      label: "Plan",
      // min y max no se usan cuando hay opciones, pero mantienen el tipo del campo
      // uniforme y el recorte de `applyChange` inofensivo.
      min: START.base,
      max: PRO.base,
      options: PLANS.map((p) => ({ value: p.base, label: `${p.label} · USD ${p.base}/mes` })),
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
    plan: START.base,
    inversionInicial: 0,
  },

  // Que el visitante mueva el slider de líneas y vea el precio acomodarse solo es
  // exactamente lo que queremos que pase.
  normalize: (v) => ({ ...v, plan: planForValues(v).base }),

  compute: (v) => {
    const plan = planForValues(v);
    const costoAnual = plan.base * 12;
    const mejoras = MEJORA_FACTORS.map((f) => v.mejoraEsperada * f);
    const volumenes = VOLUMEN_FACTORS.map((f) => Math.round(v.volumenMensual * f));

    // El ahorro se multiplica por las líneas; el costo no, porque el plan es por planta.
    // Es el punto que hace que el modelo cierre.
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
        "Con una línea podés medir gratis: el plan Free no tiene costo, así que todo lo que recuperes es ganancia. El cálculo de acá abajo aplica cuando automatizás la captura.",
      );
    }
    // El aviso sale de la cantidad de líneas y no de comparar contra el plan elegido:
    // `normalize` ya subió el plan antes de que esto corra, así que compararlos daría
    // siempre igual y el aviso no aparecería nunca.
    if (v.lineas > START.maxLineas) {
      notes.push(
        `Con ${fmtNum(v.lineas)} líneas necesitás el plan ${plan.label}. Recalculado con ${fmtMoney(plan.base)} por mes.`,
      );
    }
    // TODO(equipo): falta el aviso de Enterprise ("con más de 3 plantas se cotiza a
    // medida"). No hay con qué dispararlo: el modelo tiene líneas y no plantas, y Pro no
    // tiene tope de líneas. Hace falta un campo de plantas, o definir cuántas líneas
    // implican una planta más.

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
          caption: "para recuperar el plan y la instalación",
        },
      ],
      assumptions: [
        { label: "Líneas medidas", value: fmtNum(v.lineas) },
        {
          label: "Volumen anual",
          value: `${fmtNum(v.lineas * v.volumenMensual * 12)} u, en ${fmtNum(v.lineas)} ${v.lineas === 1 ? "línea" : "líneas"}`,
        },
        { label: "Mejora de OEE cargada", value: fmtPct(v.mejoraEsperada) },
        { label: `Plan ${plan.label}`, value: `${fmtMoney(plan.base)} por planta y mes` },
        { label: "Costo anual del plan", value: fmtMoney(costoAnual) },
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
