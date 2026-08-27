import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { FloorPlan } from "@/components/site/FloorPlan";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { AudienceTabs } from "@/components/site/AudienceTabs";
import {
  CostOfNotMeasuring,
  Faq,
  HomeRoi,
  HOME_FAQ,
  MarketplaceTeaser,
  PartnersBand,
  StartFree,
} from "@/components/home/sections";
import { faqJsonLd, organizationJsonLd, pageHead } from "@/lib/seo";

const TITLE = "Software de OEE, calidad e inventario para plantas · InspectIA";
const DESCRIPTION =
  "Ocho módulos sobre la operación que ya tenés: OEE, calidad, recepción, inventario y pedidos. De la reunión de arranque a producción, entre 5 y 15 días.";

/**
 * Home (§7.1). Una idea por sección, y cada sección con su página de destino: la home
 * muestra la punta, no el contenido.
 */
export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/",
      // Los dos en un solo grafo: Google acepta un @graph con varias entidades y así no
      // hay dos bloques de JSON-LD compitiendo por describir la misma página.
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [organizationJsonLd(), faqJsonLd(HOME_FAQ)],
      },
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
      {/* 06 */}
      <AudienceTabs />

      {/* TODO(fase 3): 07 · Caso destacado. Un caso a sangre con foto y tres números,
          rotando entre manufactura y logística. Bloqueado por la aprobación de nombres y
          cifras de cliente (§15.7). */}

      {/* 08 */}
      <MarketplaceTeaser />
      {/* 09 */}
      <HomeRoi />
      {/* 10 */}
      <PartnersBand />
      {/* 11 · Precios queda fuera del aire hasta tener el precio de todos los módulos
          (SHOW_PRICING). El copy aprobado, para cuando se destrabe:
          "TYMEO arranca gratis y el plan con hardware cuesta USD 35 por planta y mes.
           Los demás módulos se cotizan según el alcance." */}
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

        <Link
          to="/plataforma"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          Ver cómo funciona la plataforma
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
