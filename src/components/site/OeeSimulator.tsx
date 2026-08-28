import { useState } from "react";
import { SliderField } from "@/components/roi/SliderField";
import type { RoiField } from "@/lib/roi/types";
import { cn } from "@/lib/utils";

/**
 * Simulador de OEE.
 *
 * Reemplaza al que vivía en `/simulador` del sitio anterior, que era una de las páginas
 * con más tráfico de búsqueda: «simulador OEE» lo busca alguien que ya sabe qué es el
 * indicador y quiere calcularlo, no alguien que está averiguando. Redirigir esa URL a la
 * calculadora de ROI hubiera perdido el término.
 *
 * **La fórmula no es nuestra ni es opinable.** OEE = Disponibilidad × Rendimiento ×
 * Calidad es la definición estándar del indicador, y cada factor se calcula como lo
 * define el estándar. Acá no hay supuesto de negocio que discutir, que es justamente lo
 * que diferencia a este simulador de la calculadora de ROI.
 *
 * Se reutiliza `SliderField` para que los controles se vean y se manejen igual que en la
 * calculadora: es la misma persona la que va a usar las dos.
 */

const FIELDS: RoiField[] = [
  {
    key: "tiempoTurno",
    label: "Duración del turno",
    min: 4,
    max: 24,
    step: 1,
    unit: "h",
    help: "El tiempo total programado de producción, antes de descontar nada.",
  },
  {
    key: "paradas",
    label: "Tiempo de paradas",
    min: 0,
    max: 480,
    step: 5,
    unit: "min",
    help: "Averías, mantenimiento y cambios de formato. Todo lo que la línea no produjo.",
  },
  {
    key: "velocidadTeorica",
    label: "Velocidad teórica",
    min: 10,
    max: 5000,
    step: 10,
    unit: "u/h",
    help: "Lo que la máquina produce por hora a su máximo, según el fabricante.",
  },
  {
    key: "producidas",
    label: "Unidades producidas",
    min: 0,
    max: 50000,
    step: 50,
    unit: "u",
    help: "Todo lo que salió de la línea en el turno, buenas y defectuosas.",
  },
  {
    key: "defectuosas",
    label: "Unidades defectuosas",
    min: 0,
    max: 10000,
    step: 10,
    unit: "u",
    help: "Scrap y retrabajo. Lo que no se puede vender tal como salió.",
  },
];

const DEFAULTS: Record<string, number> = {
  tiempoTurno: 8,
  paradas: 60,
  velocidadTeorica: 600,
  producidas: 3200,
  defectuosas: 96,
};

/** Un factor no puede pasar del 100 %: si los datos cargados lo permiten, el dato está mal. */
const clamp = (n: number) => Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));

function computeOee(v: Record<string, number>) {
  const programado = v.tiempoTurno * 60;
  const operativo = Math.max(0, programado - v.paradas);

  const disponibilidad = clamp(programado > 0 ? operativo / programado : 0);
  // Producción teórica del tiempo que la línea sí estuvo andando, no del turno entero:
  // descontar las paradas dos veces es el error clásico del cálculo a mano.
  const teoricas = (operativo / 60) * v.velocidadTeorica;
  const rendimiento = clamp(teoricas > 0 ? v.producidas / teoricas : 0);
  const buenas = Math.max(0, v.producidas - v.defectuosas);
  const calidad = clamp(v.producidas > 0 ? buenas / v.producidas : 0);

  return {
    disponibilidad,
    rendimiento,
    calidad,
    oee: disponibilidad * rendimiento * calidad,
    buenas,
    operativo,
  };
}

/**
 * El espacio que va antes del signo de porcentaje es duro, como pide el formato es-AR.
 *
 * Va como escape y no como carácter literal: un espacio duro escrito de verdad es
 * indistinguible de uno normal al leer el código, y el linter lo rechaza justamente por
 * eso. La misma convención se usa en el resto del sitio.
 */
const NBSP = " ";

const pct = (n: number) =>
  `${new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(n * 100)}${NBSP}%`;

/**
 * Los tramos son los de referencia del propio indicador, no una escala nuestra: 85 % es
 * lo que la literatura de OEE llama clase mundial y 60 % el promedio de la industria.
 */
function tramo(oee: number) {
  if (oee >= 0.85) return { label: "Clase mundial", tone: "ok" as const };
  if (oee >= 0.6) return { label: "Por encima del promedio", tone: "ok" as const };
  if (oee >= 0.4) return { label: "Promedio de la industria", tone: "warn" as const };
  return { label: "Hay pérdidas grandes para recuperar", tone: "stop" as const };
}

export function OeeSimulator() {
  const [values, setValues] = useState<Record<string, number>>(DEFAULTS);
  const r = computeOee(values);
  const t = tramo(r.oee);

  return (
    <div className="grid gap-8 min-[1100px]:grid-cols-[380px_1fr] min-[1100px]:gap-12">
      <div className="min-w-0 min-[1100px]:w-[380px]">
        <p className="eyebrow">Los datos de tu turno</p>
        <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
          Cargá lo que pasó en un turno real. Si no tenés un dato a mano, dejá el que está y mirá
          cómo se mueve el resultado.
        </p>
        <div className="mt-8 space-y-7">
          {FIELDS.map((f) => (
            <SliderField
              key={f.key}
              field={f}
              value={values[f.key]}
              onChange={(v) => setValues((prev) => ({ ...prev, [f.key]: v }))}
            />
          ))}
        </div>
      </div>

      {/* En mobile el resultado va arriba de los controles: el número es lo que se viene
          a ver. En escritorio vuelve al orden del documento. */}
      <div className="order-first min-w-0 min-[1100px]:order-none">
        <div className="min-[1100px]:sticky min-[1100px]:top-[calc(var(--navbar-h)+1rem)]">
          <div className="rounded-[var(--radius-lg)] border border-line bg-surface-sunken p-8">
            <p className="eyebrow">Tu OEE</p>
            <p
              className={cn(
                "metric mt-4 text-[length:var(--text-data)] font-light leading-none",
                t.tone === "stop" && "text-[var(--status-stop)]",
                t.tone === "warn" && "text-[var(--status-warn)]",
                t.tone === "ok" && "text-ink",
              )}
            >
              {pct(r.oee)}
            </p>
            <p className="mt-3 text-[15px] text-ink-secondary">{t.label}</p>

            <dl className="mt-8 grid gap-6 min-[720px]:grid-cols-3">
              <Factor label="Disponibilidad" value={pct(r.disponibilidad)} />
              <Factor label="Rendimiento" value={pct(r.rendimiento)} />
              <Factor label="Calidad" value={pct(r.calidad)} />
            </dl>
          </div>

          <div className="mt-6 rounded-[var(--radius-lg)] border border-line p-6">
            <h2 className="eyebrow">Cómo sale la cuenta</h2>
            <dl className="mt-4 space-y-3">
              <Row
                label="Disponibilidad"
                value={`${r.operativo} de ${values.tiempoTurno * 60} min`}
              />
              <Row
                label="Rendimiento"
                value={`${values.producidas} de ${Math.round((r.operativo / 60) * values.velocidadTeorica)} u`}
              />
              <Row label="Calidad" value={`${r.buenas} de ${values.producidas} u`} />
            </dl>
            <p className="mt-4 text-[13px] leading-[var(--leading-normal)] text-ink-secondary">
              El OEE es el producto de los tres, no su promedio. Por eso tres factores buenos dan un
              resultado bastante peor que cualquiera de ellos por separado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Factor({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dd className="metric text-[length:var(--text-lead)] font-light leading-none text-ink">
        {value}
      </dd>
      <dt className="mt-2 text-[13px] text-ink-secondary">{label}</dt>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <dt className="min-w-0 text-[13px] text-ink-secondary">{label}</dt>
      <dd className="metric shrink-0 text-[13px] text-ink">{value}</dd>
    </div>
  );
}
