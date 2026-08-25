import type { ModuleKey } from "@/content/modules";
import { calidadModel } from "./calidad";
import { recepcionModel } from "./recepcion";
import { stockModel } from "./stock";
import { tymeoModel } from "./tymeo";
import type { RoiModel, RoiValues } from "./types";

export * from "./types";

/**
 * Los modelos que existen hoy, en el orden en que se muestran las pestañas.
 *
 * Faltan cuatro —pedidos, drones, cámaras y agente—. No se rellenan con una cuenta
 * inventada: un módulo sin modelo simplemente no tiene pestaña, y su página enlaza a la
 * calculadora de los que sí lo tienen.
 */
export const ROI_MODELS: RoiModel[] = [tymeoModel, calidadModel, recepcionModel, stockModel];

export const roiModelFor = (module: ModuleKey): RoiModel | undefined =>
  ROI_MODELS.find((m) => m.module === module);

export const isRoiModule = (value: string): value is ModuleKey =>
  ROI_MODELS.some((m) => m.module === value);

/** Aplica un cambio y deja que el modelo corrija las reglas cruzadas. */
export function applyChange(model: RoiModel, values: RoiValues, key: string, value: number) {
  const field = model.fields.find((f) => f.key === key);
  const clamped = field ? Math.min(field.max, Math.max(field.min, value)) : value;
  const next = { ...values, [key]: clamped };
  return model.normalize ? model.normalize(next, key) : next;
}
