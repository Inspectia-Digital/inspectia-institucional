import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { MODULES } from "@/content/modules";
import { INDUSTRIES } from "@/content/solutions";

/**
 * Página de industria (§7.5).
 *
 * Sólo se sirven las publicadas: ninguna entra sin al menos un problema y un dato propios
 * de esa industria. Una página de industria sin nada propio es la misma página genérica
 * repetida siete veces, que es exactamente lo que tenía la web anterior con /manufactura.
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
    const title = `${i.name} · InspectIA`;
    return {
      meta: [
        { title },
        { name: "description", content: i.pain },
        { property: "og:title", content: title },
        { property: "og:description", content: i.pain },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useLoaderData();
  const industry = INDUSTRIES.find((i) => i.slug === slug)!;
  // Ordenados por impacto, que es el orden en que están declarados.
  const modules = industry.modules
    .map((k) => MODULES.find((m) => m.key === k))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <SiteLayout industry={industry.slug}>
      <PageHero eyebrow="Soluciones" title={industry.name} lead={industry.pain} />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Los módulos que aplican</p>
          <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Por dónde conviene empezar.
          </h2>
          <ModuleGrid modules={modules} className="mt-12" />
        </div>
      </section>

      {/* TODO(fase 3): los tres a cinco problemas propios de la industria, el caso de
          cliente y la normativa donde corresponda. Bloqueado por §15.7 y §15.9. */}
    </SiteLayout>
  );
}
