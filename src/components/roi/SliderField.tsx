import { useEffect, useId, useState } from "react";
import { Slider } from "@/components/ui/slider";
import type { RoiField } from "@/lib/roi";

type ControlProps = {
  field: RoiField;
  value: number;
  onChange: (value: number) => void;
};

/**
 * Un parámetro de la calculadora.
 *
 * Despacha a uno de dos controles según el campo. Son dos componentes y no una rama
 * adentro de uno: cada uno tiene sus propios hooks, y una rama que corta antes de un
 * `useState` los llamaría en distinto orden entre renders.
 */
export function SliderField(props: ControlProps) {
  // Un campo que se elige de una lista no tiene rango que arrastrar: el plan es una
  // decisión entre dos, no un continuo.
  return props.field.options ? <SelectControl {...props} /> : <SliderControl {...props} />;
}

function SelectControl({ field, value, onChange }: ControlProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-medium text-ink-secondary">
        {field.label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-11 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface px-3 text-[15px] text-ink outline-none focus:border-line-brand"
      >
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Help text={field.help} />
    </div>
  );
}

/**
 * Slider más el valor editable a mano al lado (§11.7).
 *
 * El campo de texto es el que permite cargar un número exacto —nadie acierta 74.000
 * unidades arrastrando— y el slider es el que permite explorar. Los dos escriben el
 * mismo valor.
 */
function SliderControl({ field, value, onChange }: ControlProps) {
  const id = useId();
  const step = field.step ?? 1;
  const decimals = step < 1 ? Math.max(0, -Math.floor(Math.log10(step))) : 0;

  // El texto se edita como string y no como número: escribir "1" para llegar a "1500"
  // pasa por valores intermedios que, si se normalizan en cada tecla, hacen saltar el
  // cursor y bloquean la edición.
  const [draft, setDraft] = useState(() => value.toFixed(decimals));
  useEffect(() => setDraft(value.toFixed(decimals)), [value, decimals]);

  const commit = (raw: string) => {
    const n = Number(raw.replace(",", "."));
    onChange(Number.isNaN(n) ? field.min : n);
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-ink-secondary">
          {field.label}
        </label>

        <div className="relative shrink-0">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            value={draft}
            min={field.min}
            max={field.max}
            step={step}
            onChange={(e) => {
              setDraft(e.target.value);
              if (e.target.value !== "" && e.target.value !== "-") commit(e.target.value);
            }}
            onBlur={(e) => commit(e.target.value)}
            className={[
              "metric h-11 w-36 rounded-[var(--radius-md)] border border-line-strong bg-surface",
              "pl-3 text-right text-[15px] text-ink outline-none",
              field.unit ? "pr-14" : "pr-3",
              "focus:border-line-brand",
              // Las flechitas del input numérico compiten con el slider y no aportan.
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            ].join(" ")}
          />
          {/* La unidad va dentro del campo, no al lado: al lado se lee como otro dato. */}
          {field.unit && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-ink-muted">
              {field.unit}
            </span>
          )}
        </div>
      </div>

      <Slider
        value={[value]}
        min={field.min}
        max={field.max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        aria-label={field.label}
        className="mt-3 [&_[role=slider]]:border-action [&_[role=slider]]:bg-action [&_[data-orientation=horizontal]>span]:bg-action"
      />

      <Help text={field.help} />
    </div>
  );
}

function Help({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="mt-2 text-[13px] text-ink-muted">{text}</p>;
}
