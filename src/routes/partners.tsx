import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

const TITLE = "Vos conocés la planta. Nosotros ponemos la plataforma. · InspectIA";
const DESCRIPTION =
  "Programa de partners de InspectIA para consultores de plantas y centros de distribución.";

export const Route = createFileRoute("/partners")({
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
        eyebrow="Programa para consultores"
        title="Vos conocés la planta. Nosotros ponemos la plataforma."
        lead="Si asesorás a fábricas o centros de distribución, InspectIA OS es la parte de tu recomendación que se ejecuta. Vos diagnosticás y acompañás; nosotros instalamos, conectamos y sostenemos el servicio."
        cta={false}
      />
      {/* TODO(fase): Fase 3. Cómo funciona, qué ganás, qué esperamos, quiénes ya están y el formulario de postulación de cuatro campos. Bloqueado hasta definir comisión, exclusividad y certificación (§15.5). */}
    </SiteLayout>
  );
}
