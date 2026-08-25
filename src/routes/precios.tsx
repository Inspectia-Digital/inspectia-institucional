import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

const TITLE = "Lo que cuesta, sin pedir una cotización · InspectIA";
const DESCRIPTION =
  "Planes y precios de InspectIA. TYMEO arranca gratis; el plan con hardware desde USD 35 por planta y mes.";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Precios"
        title="Lo que cuesta, sin pedir una cotización"
        lead="TYMEO arranca gratis y el plan con hardware cuesta USD 35 por planta y mes."
      />
      {/* TODO(fase): Fase 4. La grilla de planes ya existe en tymeo/PlansAddons.tsx. La página NO se publica hasta tener el precio de todos los módulos: con uno solo publicado la promesa de transparencia se rompe sola (§7.6). SHOW_PRICING la mantiene fuera del menú. */}
    </SiteLayout>
  );
}
