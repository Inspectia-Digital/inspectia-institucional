import { createFileRoute } from "@tanstack/react-router";
import { FasonLanding, fasonHead } from "@/components/site/FasonLanding";
import { FASON_BY_SLUG } from "@/content/fason";

/**
 * `/soluciones/produccion-a-fason`, para la fábrica que produce para otras marcas.
 *
 * **Ruta estática y no una entrada de `$industria`.** Fasón no es un rubro: es una
 * relación comercial, y la misma planta de alimentos puede producir para su marca y para
 * tres ajenas. En el enrutador de TanStack un segmento literal le gana al parámetro, así
 * que esta URL no cae nunca en la plantilla de industria.
 *
 * El cuerpo vive en `FasonLanding`: esta página y la de las marcas comparten la forma
 * entera y le hablan a los dos lados de la misma relación.
 */
const PAGE = FASON_BY_SLUG.get("produccion-a-fason")!;

export const Route = createFileRoute("/soluciones/produccion-a-fason")({
  head: () => fasonHead(PAGE),
  component: () => <FasonLanding page={PAGE} />,
});
