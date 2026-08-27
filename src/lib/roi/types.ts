import type { ModuleKey } from "@/content/modules";

/**
 * Modelos de ROI, separados de la interfaz.
 *
 * Antes la matemática vivía dentro de un `useMemo` mezclada con el JSX de cada
 * calculadora, así que la home no podía mostrar el mismo número sin duplicar la cuenta.
 * Acá son funciones puras: entran valores, sale un resultado, y las dos variantes —la
 * completa de /roi y la mini de la home— renderizan lo mismo.
 *
 * La forma del resultado es igual para los cuatro modelos, y por eso la interfaz es una
 * sola y no cuatro parecidas.
 */

/** Los valores van indexados por la `key` del campo. Uniforme para los cuatro modelos. */
export type RoiValues = Record<string, number>;

export type RoiField = {
  key: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  /** Unidad, dentro del campo. Todo número la lleva. */
  unit?: string;
  /** Los tres que aparecen en la variante mini. Tres y sólo tres por modelo. */
  primary?: boolean;
};

export type RoiFigure = {
  value: string;
  /** Unidad y período. Un número sin período no se publica. */
  caption: string;
};

/** Matriz de sensibilidad. Sólo TYMEO la usa: ahí el resultado no es un número sino
 *  cómo se mueve el retorno según dos variables a la vez. */
export type RoiMatrix = {
  rowLabel: string;
  columns: string[];
  rows: { label: string; cells: number[] }[];
  /** Fila y columna del escenario central, el que el usuario cargó. */
  center: { row: number; col: number };
};

export type RoiOutcome = {
  /** El número grande. */
  headline: RoiFigure;
  /** Dos cifras de apoyo. */
  support: RoiFigure[];
  /** Bases del cálculo. Siempre desplegadas y con el costo de InspectIA a la vista:
   *  un modelo que esconde sus supuestos no convence a nadie que sepa leer uno. */
  assumptions: { label: string; value: string }[];
  matrix?: RoiMatrix;
  /** Para el evento de medición y el informe. */
  roiPct: number;
  paybackMonths: number | null;
};

export type RoiModel = {
  module: ModuleKey;
  /** Etiqueta de la pestaña. */
  label: string;
  /** Qué mide este modelo, en una línea. */
  intro: string;
  fields: RoiField[];
  defaults: RoiValues;
  /**
   * Reglas cruzadas entre campos —el rendimiento esperado no puede ser menor que el
   * actual— aplicadas después de cada cambio. Sin esto el modelo devuelve ahorros
   * negativos y la página muestra un número absurdo.
   */
  normalize?: (values: RoiValues, changed: string) => RoiValues;
  compute: (values: RoiValues) => RoiOutcome;
};

/* ---------- Formato es-AR: coma decimal y punto de miles ---------- */

const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

export const fmtMoney = (n: number) => money.format(n);
export const fmtNum = (n: number) => number.format(n);

/** Los porcentajes chicos necesitan más decimales para no leerse todos como "0\u00A0%". */
export const fmtPct = (n: number) => {
  const decimals = Math.abs(n) < 0.1 ? 3 : Math.abs(n) < 1 ? 2 : Math.abs(n) < 10 ? 1 : 0;
  return `${new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n)}\u00A0%`;
};

export const fmtMonths = (n: number | null) =>
  n === null ? "No se repaga" : `${fmtNum(n)} ${n === 1 ? "mes" : "meses"}`;

/**
 * Meses hasta recuperar la inversión.
 *
 * Devuelve null y no un número grande cuando el ahorro no alcanza a cubrir el costo: el
 * código anterior devolvía 999 y la pantalla mostraba "999 meses", que se lee como un
 * dato y no como lo que es —que con esos parámetros el proyecto no se repaga—.
 */
export const paybackMonths = (investment: number, annualNet: number): number | null => {
  if (annualNet <= 0 || investment <= 0) return null;
  return Math.max(1, Math.ceil(investment / (annualNet / 12)));
};

export const roiPct = (gain: number, cost: number) => (cost > 0 ? ((gain - cost) / cost) * 100 : 0);
