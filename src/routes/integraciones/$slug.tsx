import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { FeatureHero } from "@/components/site/FeatureHero";
import {
  ARROW_LINK_WRAP,
  Crumbs,
  Faq,
  RequestCta,
  SectionBlock,
  cols,
} from "@/components/site/featureSections";
import { IntegrationBlocks } from "@/components/site/integrationSections";
import { INTEGRATION_PAGE_BY_SLUG, STATUS_LABEL, categoryPageOf } from "@/content/integrations";
import { breadcrumbJsonLd, faqJsonLd, pageHead, serviceJsonLd, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

/**
 * Las páginas que cuelgan de `/integraciones`: las cuatro categorías y una por sistema.
 *
 * ## Una sola ruta dinámica para los dos tipos de página
 *
 * `/integraciones/erp` es una categoría y `/integraciones/odoo` es un sistema, y las dos
 * viven en el mismo segmento. Se resuelven de un solo mapa del catálogo
 * (`INTEGRATION_PAGE_BY_SLUG`): el `loader` busca el slug y, si no está, devuelve 404.
 *
 * La alternativa era declarar las cuatro categorías como rutas estáticas —en TanStack una
 * estática le gana a la dinámica, así que funcionaría— y dejar la dinámica para los
 * sistemas. Se descartó porque deja la misma plantilla repetida en cinco archivos y, con
 * eso, agregar una categoría volvería a ser escribir código. Con el mapa, una categoría o
 * un sistema nuevo es una entrada en `integrations.ts` y nada más.
 *
 * ## Dos heros, y no es un capricho
 *
 * Una categoría no tiene panel de producto que mostrar, así que usa `PageHero` y su única
 * superficie de teal profundo es el hero. Una página de sistema sí trae panel —la orden de
 * Odoo, los tags de iFIX— y entonces usa el hero claro a dos columnas de las páginas de
 * funcionalidad, que es lo que hace que el producto se vea en la primera pantalla.
 */
export const Route = createFileRoute("/integraciones/$slug")({
  loader: ({ params }) => {
    const page = INTEGRATION_PAGE_BY_SLUG.get(params.slug);
    if (!page) throw notFound();
    return { slug: page.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && INTEGRATION_PAGE_BY_SLUG.get(loaderData.slug);
    if (!p) return {};

    const path = `/integraciones/${p.slug}`;
    const parent = p.category ? categoryPageOf(p.category) : undefined;

    return pageHead({
      title: siteTitle(p.seoTitle),
      description: p.seoDescription,
      path,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          /* Integraciones › Categoría › Sistema. La categoría sólo aparece en una página
             de sistema: en una de categoría, ella misma es la hoja. */
          breadcrumbJsonLd([
            { name: "Integraciones", path: "/integraciones" },
            ...(parent ? [{ name: parent.name, path: `/integraciones/${parent.slug}` }] : []),
            { name: p.name, path },
          ]),
          serviceJsonLd({
            name: `integración con ${p.name}`,
            path,
            description: p.seoDescription,
            /* Las capacidades que declara son los títulos de los bloques con grilla y
               pasos, que es lo que la página promete hacer. Un `hasOfferCatalog` armado
               con los títulos de las tablas diría cosas como «Qué viaja». */
            features: p.blocks
              .flatMap((b) =>
                b.kind === "grid" || b.kind === "steps" ? b.items.map((i) => i.title ?? "") : [],
              )
              .filter(Boolean),
          }),
          faqJsonLd(p.faq),
        ],
      },
    });
  },
  component: IntegrationPage,
});

function IntegrationPage() {
  const { slug } = Route.useLoaderData();
  const p = INTEGRATION_PAGE_BY_SLUG.get(slug)!;
  const parent = p.category ? categoryPageOf(p.category) : undefined;

  return (
    <SiteLayout bottomCta={false} requestOrigin={p.cta.origin}>
      {p.heroPanel ? (
        <FeatureHero
          eyebrow={p.eyebrow}
          title={p.h1}
          lead={p.lead}
          panel={p.heroPanel}
          status={p.status ? STATUS_LABEL[p.status] : undefined}
          requestOrigin={p.cta.origin}
          secondary={{ label: "Ver cómo se conecta", hash: "como-se-conecta" }}
        />
      ) : (
        <PageHero eyebrow={p.eyebrow} title={p.h1} lead={p.lead} cta={false} />
      )}

      <Crumbs
        trail={[
          { label: "Integraciones", to: "/integraciones" },
          ...(parent ? [{ label: parent.name, to: `/integraciones/${parent.slug}` }] : []),
        ]}
        name={p.name}
      />

      <div id="como-se-conecta">
        <IntegrationBlocks blocks={p.blocks} />
      </div>

      <Faq title={`Preguntas sobre ${p.name}`} items={p.faq} />

      <SectionBlock eyebrow="Seguir leyendo" title="A dónde sigue">
        <ul className={cn("mt-12 grid gap-x-6 gap-y-9", cols(p.links.length))}>
          {p.links.map((l) => (
            <li key={l.to} className="min-w-0 border-t border-line pt-5">
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                className={cn(
                  ARROW_LINK_WRAP,
                  "text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)]",
                )}
              >
                {l.label} <Icon name="arrow-right" className="inline align-[-0.1em]" />
              </Link>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* El cierre, con un solo CTA. Ninguna de estas páginas se contrata sola: una
          integración por proyecto se releva antes de cotizarla, y la de Odoo está en
          construcción. */}
      <section className="px-5 pb-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <div className="grid items-center gap-8 rounded-[14px] bg-brand-subtle px-8 py-12 md:px-12 md:py-14 min-[1000px]:grid-cols-2 min-[1000px]:gap-14">
            <h2 className="max-w-[24ch] text-[28px] leading-tight text-brand-deep md:text-[length:var(--text-section)]">
              {p.cta.title}
            </h2>
            <div className="min-w-0">
              <p className="text-base leading-[var(--leading-normal)] text-ink-secondary">
                Contanos qué sistema tenés, con qué versión y quién lo implementó. Con eso sale el
                relevamiento, y de ahí el alcance.
              </p>
              <RequestCta origin={p.cta.origin} className="mt-7" />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
