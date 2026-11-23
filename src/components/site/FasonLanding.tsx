import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FeatureHero } from "@/components/site/FeatureHero";
import {
  ARROW_LINK_WRAP,
  Crumbs,
  Faq,
  RelatedBand,
  RequestCta,
  SectionBlock,
  Steps,
  GRID_2,
  cols,
} from "@/components/site/featureSections";
import type { FasonPage } from "@/content/fason";
import { breadcrumbJsonLd, faqJsonLd, pageHead, serviceJsonLd, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

/**
 * La plantilla de las dos páginas de fasón.
 *
 * Son dos rutas estáticas —`/soluciones/produccion-a-fason` y
 * `/soluciones/control-de-fasoneros`— con un solo componente: le hablan a los dos lados de
 * la misma relación y comparten la forma entera. Los dos archivos de ruta existen para que
 * cada URL sea literal y le gane a `$industria`; el cuerpo vive acá.
 *
 * Sigue el orden de la guía de funcionalidades: hero con panel, miga, el problema, qué
 * hace, la franja de lo que no se comparte, cómo se arma, la banda de relacionadas,
 * preguntas, seguir leyendo y el cierre.
 *
 * **Una sola superficie de teal profundo:** la banda de relacionadas. El hero es claro, la
 * franja de lo que no se comparte es teal lavado y el cierre también.
 */
export const fasonHead = (p: FasonPage) => {
  const path = p.path;

  return pageHead({
    title: siteTitle(p.seoTitle),
    description: p.seoDescription,
    path,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumbJsonLd([
          { name: "Soluciones", path: "/soluciones" },
          { name: p.name, path },
        ]),
        serviceJsonLd({
          name: p.name,
          path,
          description: p.seoDescription,
          features: p.does.map((d) => d.title),
        }),
        faqJsonLd(p.faq),
      ],
    },
  });
};

export function FasonLanding({ page: p }: { page: FasonPage }) {
  return (
    <SiteLayout bottomCta={false} requestOrigin={p.requestOrigin}>
      <FeatureHero
        eyebrow={p.eyebrow}
        title={p.h1}
        lead={p.lead}
        panel={p.heroPanel}
        requestOrigin={p.requestOrigin}
        secondary={{ label: "Ver cómo funciona", hash: "como-funciona" }}
      />

      <Crumbs trail={[{ label: "Soluciones", to: "/soluciones" }]} name={p.name} />

      <SectionBlock eyebrow="El problema" title="Si algo de esto te suena, es esto">
        <ul className={cn("mt-12 grid gap-x-12 gap-y-7", GRID_2)}>
          {p.problem.map((item) => (
            <li
              key={item}
              className="min-w-0 border-t border-line pt-5 text-base leading-[var(--leading-normal)] text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock id="como-funciona" eyebrow={p.doesEyebrow} title={p.doesTitle}>
        <Steps items={p.does} />
      </SectionBlock>

      {/* Lo que no se comparte. Es el bloque que decide si una fábrica acepta, así que va
          antes de cualquier otra cosa que se le pueda sumar, y sobre superficie tintada
          para que no se lea como un párrafo más. */}
      <section className="px-5 md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <div className="rounded-[14px] border border-teal-100 bg-brand-subtle px-7 py-8 md:px-9">
            <h2 className="text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
              {p.guard.title}
            </h2>
            <p className="mt-2 max-w-[var(--read-max)] text-base leading-[var(--leading-normal)] text-ink-secondary">
              {p.guard.body}
            </p>
          </div>
        </div>
      </section>

      {p.steps && (
        <SectionBlock eyebrow={p.steps.eyebrow} title={p.steps.title}>
          <Steps items={p.steps.items} />
        </SectionBlock>
      )}

      <RelatedBand
        eyebrow={p.relatedEyebrow}
        title={p.relatedTitle}
        items={p.related}
        tone="deep"
      />

      <Faq title={`Preguntas sobre ${p.name.toLowerCase()}`} items={p.faq} />

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

      {/* El cierre con un solo CTA: mientras el reporte de fasón se esté construyendo, lo
          que se ofrece es una conversación y no una cuenta. */}
      <section className="px-5 pb-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <div className="grid items-center gap-8 rounded-[14px] bg-brand-subtle px-8 py-12 md:px-12 md:py-14 min-[1000px]:grid-cols-2 min-[1000px]:gap-14">
            <h2 className="max-w-[20ch] text-[28px] leading-tight text-brand-deep md:text-[length:var(--text-section)]">
              {p.band.title}
            </h2>
            <div className="min-w-0">
              <p className="text-base leading-[var(--leading-normal)] text-ink-secondary">
                {p.band.body}
              </p>
              <RequestCta origin={p.requestOrigin} label={p.band.linkLabel} className="mt-7" />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
