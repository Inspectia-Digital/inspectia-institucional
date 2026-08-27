import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { approvedCases } from "@/content/cases";
import { pageHead } from "@/lib/seo";

const TITLE = "Casos de cliente · InspectIA";
const DESCRIPTION =
  "Qué módulo se puso en cada planta, qué cambió y con qué números. Los datos son los que el cliente autorizó a publicar.";

/**
 * Casos de cliente (§7.5).
 *
 * **Con el arreglo vacío la ruta devuelve 404**, y no aparece en el menú, en el pie ni en
 * el sitemap. No una página con "pronto vas a ver nuestros casos": eso comunica que no
 * tenemos ninguno, que es peor que no tener la página.
 */
export const Route = createFileRoute("/soluciones/casos")({
  beforeLoad: () => {
    if (approvedCases().length === 0) throw notFound();
  },
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/soluciones/casos" }),
  component: Page,
});

function Page() {
  const cases = approvedCases();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Casos"
        title="Plantas que ya están midiendo"
        lead="Qué módulo se puso, qué cambió y con qué números. Los datos son los que el cliente autorizó a publicar."
      />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <ul className="grid gap-6 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {cases.map((c) => (
              <li key={c.slug} className="min-w-0">
                <Link
                  to="/soluciones/casos"
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line p-6 transition-[border-color,box-shadow] duration-[160ms] hover:border-line-brand hover:shadow-[var(--shadow-sm)]"
                >
                  {c.logo && (
                    <img
                      src={c.logo}
                      alt={c.customer}
                      loading="lazy"
                      className="h-7 w-auto opacity-60 grayscale"
                    />
                  )}
                  <h3 className="mt-4 text-[length:var(--text-card)] leading-snug text-ink">
                    {c.customer}
                  </h3>
                  <p className="mt-2 text-[13px] text-ink-secondary">{c.industry}</p>

                  {/* Un solo número en la card: el primero. Los tres van en la página. */}
                  {c.results[0] && (
                    <>
                      <p className="metric mt-6 text-[32px] font-light leading-none text-ink">
                        {c.results[0].value}
                      </p>
                      <p className="mt-2 text-[13px] text-ink-secondary">{c.results[0].caption}</p>
                    </>
                  )}

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
                    Leer el caso de {c.customer}
                    <ArrowRight className="size-4 shrink-0" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
