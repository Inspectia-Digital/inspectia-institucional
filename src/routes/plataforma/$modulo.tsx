import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { MODULES, MODULE_BY_KEY, type ModuleKey } from "@/content/modules";

/**
 * Plantilla única de las ocho páginas de módulo (§7.3).
 *
 * El repo tenía ocho landings con estructuras distintas —cada vertical con su Hero, su
 * bento y su banda—; se consolidan acá. **Las ocho son iguales, sin excepciones**: no hay
 * variante para módulos menos maduros, ni chip de estado, ni lista de espera. Cada una
 * describe lo que la solución resuelve, en presente.
 *
 * Las secciones que dependen de datos que el equipo todavía no cerró —el bloque de
 * números de cuatro módulos, el plan gratuito de siete y la grilla de precios— entran en
 * la fase siguiente. Lo que falta no se rellena con un número inventado: no se muestra.
 */
export const Route = createFileRoute("/plataforma/$modulo")({
  loader: ({ params }) => {
    const module = MODULE_BY_KEY.get(params.modulo as ModuleKey);
    if (!module) throw notFound();
    return { key: module.key };
  },
  head: ({ loaderData }) => {
    const m = loaderData && MODULE_BY_KEY.get(loaderData.key);
    if (!m) return {};
    const title = `${m.name} · InspectIA`;
    return {
      meta: [
        { title },
        { name: "description", content: m.promise },
        { property: "og:title", content: title },
        { property: "og:description", content: m.promise },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { key } = Route.useLoaderData();
  const m = MODULE_BY_KEY.get(key)!;
  const related = MODULES.filter((o) => m.buildsOn.includes(o.key));

  return (
    <SiteLayout module={m.key}>
      <PageHero eyebrow={m.name} title={m.promise} lead={m.summary} module={m.key} />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="min-w-0">
              <p className="eyebrow">Qué necesita</p>
              <p className="mt-4 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
                {m.needs}
              </p>
            </div>

            {m.proof && (
              <div className="min-w-0">
                <p className="eyebrow">El número</p>
                <p className="metric mt-4 text-[length:var(--text-data)] font-light leading-none text-ink">
                  {m.proof.value}
                </p>
                {/* Todo dato lleva su período: sin eso el número no significa nada. */}
                <p className="mt-3 text-sm text-ink-secondary">{m.proof.caption}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface-sunken px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[var(--content-max)]">
            <p className="eyebrow">Se apoya en</p>
            <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
              Un módulo resuelve un problema. Juntos, gobiernan la operación.
            </h2>
            <ModuleGrid modules={related} className="mt-12" />
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
