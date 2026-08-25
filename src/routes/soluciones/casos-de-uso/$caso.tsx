import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { MODULES } from "@/content/modules";
import { USE_CASES } from "@/content/solutions";
import { useSolutionViewEvent } from "@/lib/useViewEvents";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

/**
 * Página de caso de uso (§7.5). Más corta que la de industria: el problema, cómo se
 * resuelve con uno o dos módulos, el número y el caso.
 *
 * Son las que van a rankear: la gente busca el problema, no el producto.
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
      title: `${u.name} · InspectIA`,
      description: `«${u.pain}». Cómo se resuelve con InspectIA, con qué módulos y qué cambia.`,
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

  return (
    <SiteLayout>
      <PageHero eyebrow="Caso de uso" title={useCase.name} lead={`«${useCase.pain}»`} />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Cómo se resuelve</p>
          <ModuleGrid modules={modules} className="mt-12" />
        </div>
      </section>

      {/* TODO(fase 3): el número del caso y la calculadora embebida de ese módulo. */}
    </SiteLayout>
  );
}
