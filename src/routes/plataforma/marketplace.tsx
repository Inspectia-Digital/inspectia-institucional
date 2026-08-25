import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

const TITLE = "Todo lo que el proyecto necesita, en un solo proveedor · InspectIA";
const DESCRIPTION =
  "Servicios de terceros que InspectIA comercializa alrededor de la plataforma, en seis categorías.";

export const Route = createFileRoute("/plataforma/marketplace")({
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
        eyebrow="Marketplace"
        title="Todo lo que el proyecto necesita, en un solo proveedor"
        lead="Cámaras y sensores, ERP, WMS, bots, financiamiento y analítica. Son servicios de terceros que comercializamos nosotros: los contratás con InspectIA y no tenés que coordinar cinco proveedores."
      />
      {/* TODO(fase): Fase 2. Filtro por categoría, grilla de fichas y ficha de servicio. El CTA de esta página no es el par de siempre: son 'Pedir una cotización' y 'Quiero ofrecer mi servicio' (§8). Bloqueado hasta tener el esquema comercial de cada servicio (§15.6). */}
    </SiteLayout>
  );
}
