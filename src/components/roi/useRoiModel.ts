import { useMemo, useRef, useState } from "react";
import { applyChange, type RoiModel, type RoiValues } from "@/lib/roi";
import { pushEvent } from "@/lib/analytics";

/**
 * Estado de una calculadora: los valores, el resultado y la medición.
 *
 * Lo comparten la variante completa de /roi y la mini de la home, así que las dos
 * muestran exactamente el mismo número a partir de los mismos parámetros.
 */
export function useRoiModel(model: RoiModel) {
  const [values, setValues] = useState<RoiValues>(model.defaults);
  const measured = useRef(false);

  const outcome = useMemo(() => model.compute(values), [model, values]);

  const set = (key: string, value: number) => {
    setValues((prev) => applyChange(model, prev, key, value));

    // `roi_calculate` es el primer cambio que produce resultado, no cada fotograma del
    // arrastre: un slider dispara decenas de eventos por segundo.
    if (!measured.current) {
      measured.current = true;
      pushEvent("roi_calculate", { module: model.module, inputs: values });
    }
  };

  return { values, set, outcome };
}
