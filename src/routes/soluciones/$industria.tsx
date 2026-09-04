import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { MODULES } from "@/content/modules";
import { INDUSTRIES, USE_CASES } from "@/content/solutions";
import { useSolutionViewEvent } from "@/lib/useViewEvents";
import { breadcrumbJsonLd, faqJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

/**
 * Página de industria (§7.5).
 *
 * Sólo se sirven las publicadas: ninguna entra sin al menos un problema propio de ese
 * rubro. Una página de industria sin nada propio es la misma página genérica repetida
 * siete veces, que es exactamente lo que tenía la web anterior con /manufactura.
 */
export const Route = createFileRoute("/soluciones/$industria")({
  loader: ({ params }) => {
    const industry = INDUSTRIES.find((i) => i.slug === params.industria && i.published);
    if (!industry) throw notFound();
    return { slug: industry.slug };
  },
  head: ({ loaderData }) => {
    const i = loaderData && INDUSTRIES.find((x) => x.slug === loaderData.slug);
    if (!i) return {};
    const breadcrumb = breadcrumbJsonLd([
      { name: "Soluciones", path: "/soluciones" },
      { name: i.name, path: `/soluciones/${i.slug}` },
    ]);
    return pageHead({
      title: siteTitle(i.seoTitle ?? i.name),
      description: i.seoDescription ?? i.pain,
      path: `/soluciones/${i.slug}`,
      // Un solo bloque con las dos entidades, y no dos scripts compitiendo por describir
      // la misma página. Mismo criterio que la página de módulo.
      jsonLd: i.faq
        ? { "@context": "https://schema.org", "@graph": [breadcrumb, faqJsonLd(i.faq)] }
        : breadcrumb,
    });
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useLoaderData();
  const industry = INDUSTRIES.find((i) => i.slug === slug)!;
  useSolutionViewEvent({ industry: industry.slug });

  // Ordenados por impacto, que es el orden en que están declarados.
  const modules = industry.modules
    .map((k) => MODULES.find((m) => m.key === k))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  // Los casos de uso que resuelven los módulos de esta industria. Es la otra mitad del
  // cruce: sin esto, las páginas de caso de uso enlazan acá y no reciben nada de vuelta.
  const cases = USE_CASES.filter((u) => u.modules.some((k) => industry.modules.includes(k)));

  /**
   * Alternancia de fondo, calculada sobre las secciones que **esta** industria renderiza.
   *
   * Estaba cableada, y como casi todas las secciones son opcionales, alcanzaba con que una
   * faltara para que dos bloques consecutivos quedaran del mismo color y se leyeran como
   * uno solo. Pasaba en las cuatro páginas con `proof` en null, que son mayoría.
   */
  const bands = [
    industry.problems?.length ? "problems" : null,
    "modules",
    industry.proof ? "proof" : null,
    industry.context ? "context" : null,
    industry.faq?.length ? "faq" : null,
    cases.length > 0 ? "cases" : null,
  ].filter(Boolean);

  const band = (name: string) =>
    bands.indexOf(name) % 2 === 0 ? "bg-surface" : "bg-surface-sunken";

  return (
    <SiteLayout industry={industry.slug}>
      <PageHero
        eyebrow="Soluciones"
        title={industry.h1 ?? industry.name}
        lead={industry.seoDescription ?? industry.pain}
      />

      {industry.problems && industry.problems.length > 0 && (
        <section className={`${band("problems")} px-5 py-[var(--section-pad-md)] md:px-8`}>
          <div className="mx-auto max-w-[var(--content-max)]">
            <p className="eyebrow">El problema</p>
            <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
              Lo que pasa en una planta de este rubro
            </h2>
            <ul className="mt-12 max-w-[var(--read-max)] space-y-6">
              {industry.problems.map((p) => (
                <li
                  key={p}
                  className="text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={`${band("modules")} px-5 py-[var(--section-pad-md)] md:px-8`}>
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Los módulos que aplican</p>
          <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Por dónde conviene empezar
          </h2>
          <ModuleGrid modules={modules} className="mt-12" />
        </div>
      </section>

      {industry.proof && (
        <section className={`${band("proof")} px-5 py-[var(--section-pad-md)] md:px-8`}>
          <div className="mx-auto max-w-[var(--content-max)]">
            <h2 className="eyebrow">El número</h2>
            <p className="metric mt-4 text-[length:var(--text-data)] font-light leading-none text-ink">
              {industry.proof.value}
            </p>
            <p className="mt-3 text-sm text-ink-secondary">{industry.proof.caption}</p>
          </div>
        </section>
      )}

      {industry.context && (
        <section className={`${band("context")} px-5 py-[var(--section-pad-md)] md:px-8`}>
          <div className="mx-auto max-w-[var(--content-max)]">
            <h2 className="eyebrow">Normativa y particularidades</h2>
            <p className="mt-4 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
              {industry.context}
            </p>
          </div>
        </section>
      )}

      {industry.faq && industry.faq.length > 0 && (
        <section className={`${band("faq")} px-5 py-[var(--section-pad-md)] md:px-8`}>
          {/* Más angosto que el resto de la página, como en la página de módulo: una
              respuesta de cuatro líneas a 1200px de ancho no se lee, se barre. */}
          <div className="mx-auto max-w-[50rem]">
            <h2 className="text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
              {industry.faqTitle ?? `Preguntas sobre ${industry.name.toLowerCase()}`}
            </h2>

            <Accordion
              type="single"
              collapsible
              defaultValue="ind-faq-0"
              className="mt-10 border-t border-line"
            >
              {industry.faq.map((item, i) => (
                <AccordionItem key={item.q} value={`ind-faq-${i}`} className="border-line">
                  <AccordionTrigger className="py-5 text-left text-[17px] font-medium text-ink hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <section className={`${band("cases")} px-5 py-[var(--section-pad-md)] md:px-8`}>
          <div className="mx-auto max-w-[var(--content-max)]">
            <p className="eyebrow">Por problema</p>
            <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
              Los problemas que resuelven estos módulos
            </h2>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {cases.map((u) => (
                <li key={u.slug} className="min-w-0">
                  <Link
                    to="/soluciones/casos-de-uso/$caso"
                    params={{ caso: u.slug }}
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline hover:underline-offset-4"
                  >
                    {u.name}
                    <Icon name="arrow-right" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* TODO(fase 3): el caso de cliente de este rubro. Bloqueado por la aprobación de
          nombres y cifras. Sin caso anonimizado ni placeholder. */}
    </SiteLayout>
  );
}
