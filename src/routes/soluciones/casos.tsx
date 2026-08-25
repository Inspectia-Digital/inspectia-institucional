import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { pageHead } from "@/lib/seo";

const TITLE = "Lo que cambió, con números · InspectIA";
const DESCRIPTION =
  "Casos de cliente de InspectIA en manufactura y logística, con los números de cada implementación.";

export const Route = createFileRoute("/soluciones/casos")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/soluciones/casos" }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Casos de cliente"
        title="Lo que cambió, con números"
        lead="Cada caso dice qué industria es, qué módulo se puso y qué se movió, con su período."
      />
      {/* TODO(fase): Fase 3. Grilla de cards de caso. Bloqueado hasta la aprobación de nombres y cifras (§15.7). */}
    </SiteLayout>
  );
}
