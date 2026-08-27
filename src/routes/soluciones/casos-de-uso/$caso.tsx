import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { RoiMini } from "@/components/roi/RoiMini";
import { MODULES } from "@/content/modules";
import { INDUSTRIES, USE_CASES } from "@/content/solutions";
import { roiModelFor } from "@/lib/roi";
import { useSolutionViewEvent } from "@/lib/useViewEvents";
import { breadcrumbJsonLd, pageHead, siteTitle } from "@/lib/seo";

/**
 * Página de caso de uso (§7.5).
 *
 * Son las que van a rankear: la gente busca el problema, no el producto. Cortas a
 * propósito —cinco bloques— porque una página de caso de uso no explica el producto, sino
 * que nombra el problema mejor que nadie y pasa la posta.
 *
 * Cierra enlazando a la industria donde ese problema es más caro, y cada página de
 * industria enlaza de vuelta a los casos de sus módulos. Ese cruce es el cluster: sin él
 * son diez páginas sueltas.
 */
export const Route = createFileRoute("/soluciones/casos-de-uso/$caso")({
  loader: ({ params }) => {
    const useCase = USE_CASES.find((u) => u.slug === params.caso);
    if (!useCase) throw notFound();
    return { slug: useCase.slug };
  },
  head: ({ loaderData }) => {
    const u = loaderData && USE_CASES.find((x) => x.slug === loaderData.slug);
    if (!u) return {};
    return pageHead({
      title: siteTitle(u.seoTitle),
      description: u.seoDescription,
      path: `/soluciones/casos-de-uso/${u.slug}`,
      jsonLd: breadcrumbJsonLd([
        { name: "Soluciones", path: "/soluciones" },
        { name: u.name, path: `/soluciones/casos-de-uso/${u.slug}` },
      ]),
    });
  },
  component: UseCasePage,
});

function UseCasePage() {
  const { slug } = Route.useLoaderData();
  const useCase = USE_CASES.find((u) => u.slug === slug)!;
  useSolutionViewEvent({ use_case: useCase.slug });

  const modules = useCase.modules
    .map((k) => MODULES.find((m) => m.key === k))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  // La calculadora del módulo principal, si ese módulo tiene modelo. Prevenir accidentes
  // no tiene, así que el bloque no se renderiza.
  const roiModel = useCase.modules.map(roiModelFor).find(Boolean);
  const industry = INDUSTRIES.find((i) => i.slug === useCase.worstIn.slug && i.published);

  return (
    <SiteLayout>
      <PageHero eyebrow="Caso de uso" title={useCase.h1} lead={useCase.lead} />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <h2 className="eyebrow">El problema</h2>
          <div className="mt-8 max-w-[var(--read-max)] space-y-6">
            {useCase.body.map((p) => (
              <p
                key={p}
                className="text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-sunken px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Cómo se resuelve</p>
          <h2 className="mt-4 max-w-[30ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            {useCase.solution}
          </h2>
          <ModuleGrid modules={modules} className="mt-12" />
        </div>
      </section>

      {roiModel && (
        <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[var(--content-max)]">
            <p className="eyebrow">Cuánto te rinde</p>
            <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
              Poné los números de tu operación
            </h2>
            <div className="mt-12">
              <RoiMini model={roiModel} />
            </div>
          </div>
        </section>
      )}

      {industry && (
        <section className="bg-surface-sunken px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[var(--content-max)]">
            <p className="eyebrow">Dónde más cuesta</p>
            <p className="mt-4 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
              {useCase.worstIn.note}
            </p>
            <Link
              to="/soluciones/$industria"
              params={{ industria: industry.slug }}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Ver soluciones para {industry.name.toLowerCase()}
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>
      )}

      {/* TODO(equipo): un dato propio por caso de uso, cuando haya casos aprobados. Hoy
          las cinco páginas describen bien el problema y no tienen un solo número: es lo
          que las va a diferenciar de un artículo de blog cualquiera. */}
    </SiteLayout>
  );
}
