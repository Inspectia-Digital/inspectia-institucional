import { Link } from "@tanstack/react-router";
import { SliderField } from "@/components/roi/SliderField";
import { useRoiModel } from "@/components/roi/useRoiModel";
import type { RoiModel } from "@/lib/roi";
import { Icon } from "@/components/icons/Icon";

/**
 * Variante mini del ROI (§11.7), para la home y las páginas de industria y caso de uso.
 *
 * **Tres controles y sólo tres**: son los que el modelo marca como `primary`. El resto de
 * los parámetros usa su valor por omisión, y quien quiera tocarlos va a /roi. Una
 * calculadora de diez sliders en la mitad de la home no la usa nadie.
 *
 * Sin formulario. Acá no se pide nada.
 */
export function RoiMini({ model }: { model: RoiModel }) {
  const { values, set, outcome } = useRoiModel(model);
  const fields = model.fields.filter((f) => f.primary).slice(0, 3);

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8 md:p-10">
      <div className="grid gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-16">
        <div className="min-w-0 space-y-7">
          {fields.map((f) => (
            <SliderField
              key={f.key}
              field={f}
              value={values[f.key]}
              onChange={(v) => set(f.key, v)}
            />
          ))}
        </div>

        <div className="min-w-0">
          {/* Recalcula en vivo mientras se arrastra: el número que cambia solo es lo que
              hace que alguien mueva el segundo slider. */}
          <p className="metric text-[length:var(--text-data)] font-light leading-none text-ink">
            {outcome.headline.value}
          </p>
          <p className="mt-3 text-[15px] text-ink-secondary">{outcome.headline.caption}</p>

          <div className="mt-8 grid gap-6 min-[520px]:grid-cols-2">
            {outcome.support.map((s) => (
              <div key={s.caption} className="min-w-0">
                <p className="metric text-[length:var(--text-lead)] font-light leading-none text-ink">
                  {s.value}
                </p>
                <p className="mt-2 text-[13px] text-ink-secondary">{s.caption}</p>
              </div>
            ))}
          </div>

          <Link
            to="/roi"
            search={{ modulo: model.module }}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver el cálculo completo
            <Icon name="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
