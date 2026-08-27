import { SliderField } from "@/components/roi/SliderField";
import { LeadForm } from "@/components/roi/LeadForm";
import { useRoiModel } from "@/components/roi/useRoiModel";
import type { RoiMatrix, RoiModel } from "@/lib/roi";
import { cn } from "@/lib/utils";

/**
 * Variante completa de /roi (§11.7).
 *
 * **El resultado se ve siempre.** La versión anterior lo tapaba con un desenfoque y un
 * botón "Calcular matriz de ROI" con un candado: pedir un clic para ver el número que la
 * página promete es fricción sin contrapartida, y quien tiene que decidir una compra de
 * seis cifras no la tolera. Lo único que pide datos es el PDF, y va al final.
 *
 * Parámetros a la izquierda, resultado a la derecha y pegado al scrollear, supuestos
 * siempre desplegados con el costo de InspectIA a la vista.
 */
export function RoiCalculator({ model }: { model: RoiModel }) {
  const { values, set, outcome } = useRoiModel(model);

  return (
    <div>
      <div className="grid gap-8 min-[1100px]:grid-cols-[380px_1fr] min-[1100px]:gap-12">
        {/* --- Parámetros --- */}
        <div className="min-w-0 min-[1100px]:order-1 min-[1100px]:w-[380px]">
          <p className="eyebrow">Tu operación</p>
          <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            {model.intro}
          </p>
          <div className="mt-8 space-y-7">
            {model.fields.map((f) => (
              <SliderField
                key={f.key}
                field={f}
                value={values[f.key]}
                onChange={(v) => set(f.key, v)}
              />
            ))}
          </div>
        </div>

        {/* --- Resultado ---
            En mobile va arriba y pegado al tope: el número tiene que quedar visible
            mientras se mueve un slider, o nadie ve que se está moviendo. */}
        <div className="min-w-0 min-[1100px]:order-2">
          <div className="sticky top-[calc(var(--navbar-h)+1rem)]">
            <div className="rounded-[var(--radius-lg)] border border-line bg-surface-sunken p-8">
              <p className="eyebrow">Resultado</p>
              <p className="metric mt-4 text-[length:var(--text-data)] font-light leading-none text-ink">
                {outcome.headline.value}
              </p>
              <p className="mt-3 text-[15px] text-ink-secondary">{outcome.headline.caption}</p>

              <div className="mt-8 grid gap-6 min-[720px]:grid-cols-2">
                {outcome.support.map((s) => (
                  <div key={s.caption} className="min-w-0">
                    <p className="metric text-[length:var(--text-lead)] font-light leading-none text-ink">
                      {s.value}
                    </p>
                    <p className="mt-2 text-[13px] text-ink-secondary">{s.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Los supuestos no se pliegan. Un modelo que los esconde no se puede discutir,
                y lo que se compra acá es justamente la discusión. */}
            <div className="mt-6 rounded-[var(--radius-lg)] border border-line p-6">
              <p className="eyebrow">Bases del cálculo</p>
              <dl className="mt-4 space-y-3">
                {outcome.assumptions.map((a) => (
                  <div key={a.label} className="flex items-baseline justify-between gap-6">
                    <dt className="min-w-0 text-[13px] text-ink-secondary">{a.label}</dt>
                    <dd className="metric shrink-0 text-[13px] text-ink">{a.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {outcome.matrix && <SensitivityMatrix matrix={outcome.matrix} />}

      <div className="mt-16">
        <LeadForm module={model.module} outcome={outcome} />
      </div>
    </div>
  );
}

/** Cómo se mueve el retorno según dos variables a la vez. Sólo TYMEO la usa. */
function SensitivityMatrix({ matrix }: { matrix: RoiMatrix }) {
  const tone = (roi: number) =>
    roi < 0 ? "text-[var(--status-stop)]" : roi < 100 ? "text-[var(--status-warn)]" : "text-ink";

  return (
    <div className="mt-16">
      <p className="eyebrow">Si las cosas salen distinto</p>
      <h3 className="mt-3 max-w-[44ch] text-[length:var(--text-card)] leading-snug text-ink">
        Retorno del primer año según la mejora de OEE que logres y el volumen de la línea.
      </h3>

      {/* La tabla desplaza dentro de su contenedor y nunca hace scrollear el documento. */}
      <div className="mt-8 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <table className="w-full min-w-[44rem] border-collapse">
          <thead>
            <tr>
              <th
                scope="col"
                className="pb-3 pr-4 text-left text-[13px] font-medium text-ink-secondary"
              >
                {matrix.rowLabel}
              </th>
              {matrix.columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={cn(
                    "metric pb-3 text-right text-[13px] font-medium",
                    i === matrix.center.col ? "text-brand" : "text-ink-secondary",
                  )}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map((row, r) => (
              <tr key={row.label} className="border-t border-line">
                <th
                  scope="row"
                  className={cn(
                    "metric py-3 pr-4 text-left text-[13px] font-normal",
                    r === matrix.center.row ? "text-ink" : "text-ink-secondary",
                  )}
                >
                  {row.label}
                </th>
                {row.cells.map((roi, c) => {
                  const isCenter = r === matrix.center.row && c === matrix.center.col;
                  return (
                    <td
                      key={c}
                      className={cn(
                        "metric py-3 text-right text-[13px]",
                        tone(roi),
                        // El escenario cargado se marca con el fondo, no tiñendo el número:
                        // el color del valor ya significa otra cosa.
                        isCenter && "bg-brand-subtle font-semibold",
                      )}
                    >
                      {Math.round(roi)}&nbsp;%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
