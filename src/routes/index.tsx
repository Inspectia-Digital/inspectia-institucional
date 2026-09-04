import { createFileRoute, Link } from "@tanstack/react-router";
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
import { Icon } from "@/components/icons/Icon";

const TITLE = "Software de OEE, calidad e inventario para plantas · InspectIA";
const DESCRIPTION =
  "Ocho módulos sobre la operación que ya tenés: OEE, calidad, recepción, inventario y pedidos. De la reunión de arranque a producción, entre 1 y 10 días.";

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
      {/* 02 · Las cinco familias juntas y en desplazamiento, por pedido explícito. Es la
          fila única que tenía la web anterior, y contradice a §11.10 en los dos puntos
          que ese apartado fija: ver la cabecera de TrustBar. */}
      <TrustBar family="todas" marquee />
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
          Una sola plataforma para gobernar toda tu operación.
        </h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Contratás sólo los módulos que usás. Los datos se cargan una sola vez, mismos usuarios,
          mismo tablero. Podés contratar cuando quieras desde el Marketplace.
        </p>

        {/* El plano no entra en un teléfono. Mide 640px de ancho mínimo porque abajo de
            eso el render isométrico deja de leerse, así que en 375 quedaba un dibujo
            recortado que hay que arrastrar y donde no se distingue nada. La grilla de
            abajo cuenta lo mismo —los ocho módulos— y en mobile lo cuenta mejor. */}
        <div className="mt-12 hidden min-[720px]:block">
          <FloorPlan />
        </div>

        <ModuleGrid className="mt-16" />

        <Link
          to="/plataforma"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          Ver cómo funciona la plataforma
          <Icon name="arrow-right" />
        </Link>
      </div>
    </section>
  );
}
