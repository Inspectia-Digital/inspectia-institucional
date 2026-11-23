import { createFileRoute } from "@tanstack/react-router";
import { FasonLanding, fasonHead } from "@/components/site/FasonLanding";
import { FASON_BY_SLUG } from "@/content/fason";

/**
 * `/soluciones/control-de-fasoneros`, para la marca que manda a fasonar.
 *
 * Es el otro lado de `/soluciones/produccion-a-fason` y comparte su plantilla. Ruta
 * estática por el mismo motivo: le gana a `$industria` y fasón no es un rubro.
 */
const PAGE = FASON_BY_SLUG.get("control-de-fasoneros")!;

export const Route = createFileRoute("/soluciones/control-de-fasoneros")({
  head: () => fasonHead(PAGE),
  component: () => <FasonLanding page={PAGE} />,
});
