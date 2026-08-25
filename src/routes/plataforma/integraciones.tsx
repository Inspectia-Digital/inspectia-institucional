import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

const TITLE = "Con qué se conecta la plataforma · InspectIA";
const DESCRIPTION =
  "Los sistemas con los que InspectIA se integra: ERP, WMS, PLC y sensórica industrial.";

export const Route = createFileRoute("/plataforma/integraciones")({
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
        eyebrow="Integraciones"
        title="Con qué se conecta la plataforma"
        lead="Qué ERP, WMS, PLC y sensórica soporta InspectIA. Es información técnica: acá no hay nada que contratar."
      />
      {/* TODO(fase): Fase 2. Las cuatro tiras de logos por grupo —ERP, WMS, PLC y sensórica, cámaras— en escala de grises, sin card, sin precio y sin CTA (§11.6). */}
    </SiteLayout>
  );
}
