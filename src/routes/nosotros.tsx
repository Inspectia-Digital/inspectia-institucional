import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { pageHead } from "@/lib/seo";

const TITLE = "Qué problema fundamos para resolver · InspectIA";
const DESCRIPTION =
  "El equipo de InspectIA, el respaldo científico, las plantas donde estamos hoy y el contacto para inversores.";

export const Route = createFileRoute("/nosotros")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/nosotros" }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Nosotros"
        title="Qué problema fundamos para resolver"
        lead="Medir lo que pasa en una planta no debería requerir cambiar las máquinas, el ERP ni la forma de trabajar."
      />
      {/* TODO(fase): Fase 3. Equipo con el respaldo científico explícito, en qué plantas estamos, respaldos y programas, prensa, y el bloque para inversores. */}
    </SiteLayout>
  );
}
