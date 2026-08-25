import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { FloorPlan } from "@/components/site/FloorPlan";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import {
  CostOfNotMeasuring,
  Faq,
  HOME_FAQ,
  MarketplaceTeaser,
  PartnersBand,
  StartFree,
} from "@/components/home/sections";

const TITLE = "Toda tu operación medida, en una sola plataforma · InspectIA";
const DESCRIPTION =
  "Ocho módulos sobre la operación que ya tenés: OEE, calidad, recepción, inventario y pedidos. De la reunión de arranque a producción, entre 5 y 15 días.";

/**
 * Home (§7.1). Una idea por sección, y cada sección con su página de destino: la home
 * muestra la punta, no el contenido.
 */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* 01 */}
      <Hero />
      {/* 02 · En la home va sólo la fila de clientes (§11.10). */}
      <TrustBar />
      {/* 03 · La sección más importante de la home. */}
      <Platform />
      {/* 04 */}
      <CostOfNotMeasuring />
      {/* 05 */}
      <StartFree />

      {/* TODO(fase 2/3): faltan tres bloques de §7.1.
          06 · Selector de perfil — site/AudienceTabs.tsx se repinta y pasa a cuatro
               pestañas con el dolor, los módulos, un dato y un CTA por perfil.
          07 · Caso destacado — bloqueado por la aprobación de nombres y cifras (§15.7).
          09 · ROI en la home — la variante mini depende de extraer los modelos de cálculo
               a funciones puras, que es la etapa siguiente. */}

      {/* 08 */}
      <MarketplaceTeaser />
      {/* 10 */}
      <PartnersBand />
      {/* 11 · Precios queda fuera del aire hasta tener el precio de todos los módulos. */}
      {/* 12 */}
      <Faq />
      {/* 13 · La banda de cierre la monta SiteLayout. */}
    </SiteLayout>
  );
}

/** Bloque 03: el plano interactivo arriba y la grilla de los ocho módulos abajo. */
function Platform() {
  return (
    <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">La plataforma</p>
        <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          Un módulo resuelve un problema. Juntos, gobiernan la operación.
        </h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Contratás sólo los módulos que usás. Comparten los mismos datos maestros, los mismos
          usuarios y el mismo tablero, así que el segundo módulo no es un proyecto nuevo: es una
          casilla que se habilita.
        </p>

        <div className="mt-12">
          <FloorPlan />
        </div>

        <ModuleGrid className="mt-16" />
      </div>
    </section>
  );
}
