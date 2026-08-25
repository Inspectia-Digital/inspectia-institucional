import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { RoiSimulator } from "@/components/roi/RoiSimulator";

const TITLE = "Calculá el retorno de tu operación · InspectIA";
const DESCRIPTION =
  "Proyectá el ahorro y el tiempo de repago de cada módulo con los números de tu planta. El resultado se ve completo, sin registrarte.";

/**
 * Calculadora de ROI (§7.7). Es el activo de conversión del sitio y la herramienta de
 * venta de los consultores.
 *
 * TODO(etapa 5): falta lo que hace a esta página lo que tiene que ser.
 *  - Sacar el gate: hoy la matriz aparece borrosa detrás de un botón "Calcular". El
 *    resultado completo tiene que verse sin registrarse. Lo único que pide email es el
 *    informe en PDF, y el formulario va debajo del resultado, nunca encima.
 *  - Extraer los cuatro modelos a funciones puras, para que la home pueda usar la
 *    variante mini con los mismos números.
 *  - Formato es-AR: hoy los importes salen con punto decimal.
 *  - Pestaña sincronizada con la URL (/roi?modulo=tymeo) para poder linkear desde cada
 *    página de módulo.
 *  Mientras tanto la página conserva el simulador tal cual, con la piel anterior.
 */
export const Route = createFileRoute("/roi")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RoiPage,
});

function RoiPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Calculadora"
        title="Calculá el retorno con los números de tu planta"
        lead="Elegí el módulo, movés los parámetros de tu operación y el resultado se actualiza solo. Cada modelo muestra sus supuestos y el costo de InspectIA a la vista."
        cta={false}
      />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <RoiSimulator />
        </div>
      </section>
    </SiteLayout>
  );
}
