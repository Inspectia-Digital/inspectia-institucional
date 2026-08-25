import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { MODULES } from "@/content/modules";
import { USE_CASES, publishedIndustries } from "@/content/solutions";
import { pageHead } from "@/lib/seo";

const TITLE = "Soluciones por industria y por problema · InspectIA";
const DESCRIPTION =
  "Manufactura y logística, por industria y por caso de uso: scrap, paradas de máquina, inventario descuadrado, recepción y prevención de accidentes.";

/**
 * Hub de soluciones (§7.5). Acá vuelven a existir manufactura y logística, ahora como
 * agrupación de industrias y no como dos productos separados.
 */
export const Route = createFileRoute("/soluciones/")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/soluciones" }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const industries = publishedIndustries();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Soluciones"
        title="El problema primero. El módulo después."
        lead="Entrá por tu industria o por lo que te duele hoy. Los módulos que resuelven cada cosa aparecen abajo, no antes."
      />

      {/* --- Por industria --- */}
      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Por industria</p>
          <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Cada planta se rompe por un lado distinto.
          </h2>

          {/* TODO(equipo): las cards de industria llevan foto arriba a 16:10 (§11.5).
              Falta la fotografía propia de planta (§15.9); hasta entonces van sin foto.
              Las otras cuatro industrias entran cuando tengan un problema y un dato
              propios: sin eso la card no entra a la grilla. */}
          <ul className="mt-12 grid gap-6 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {industries.map((i) => (
              <li key={i.slug} className="min-w-0">
                <Link
                  to="/soluciones/$industria"
                  params={{ industria: i.slug }}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line p-6 transition-[border-color,box-shadow] duration-[160ms] hover:border-line-brand hover:shadow-[var(--shadow-sm)]"
                >
                  <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{i.name}</h3>
                  <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                    {i.pain}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
                    Ver la industria
                    <ArrowRight
                      className="size-4 transition-transform duration-[160ms] group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Por caso de uso --- */}
      <section className="bg-surface-sunken px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Por caso de uso</p>
          <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Empezá por lo que te está costando plata.
          </h2>

          <ul className="mt-12 grid gap-6 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {USE_CASES.map((u) => (
              <li key={u.slug} className="min-w-0">
                <Link
                  to="/soluciones/casos-de-uso/$caso"
                  params={{ caso: u.slug }}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-surface p-6"
                >
                  {/* El dolor va en primera persona, como lo dice el cliente. */}
                  <p className="text-[length:var(--text-lead)] font-medium leading-snug text-ink">
                    «{u.pain}»
                  </p>
                  <p className="mt-4 text-sm text-ink-secondary">
                    {u.modules
                      .map((k) => MODULES.find((m) => m.key === k)?.name)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
                    Cómo se resuelve
                    <ArrowRight
                      className="size-4 transition-transform duration-[160ms] group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CoverageMatrix />
    </SiteLayout>
  );
}

/**
 * Industria en las filas, módulo en las columnas, un punto donde aplica.
 *
 * Es la sección que hace visible la idea de plataforma —se ve de un vistazo que un
 * módulo sirve en varias industrias y que una industria usa varios módulos— y de paso
 * hace casi todo el enlazado interno hacia las páginas hijas.
 */
function CoverageMatrix() {
  const industries = publishedIndustries();

  return (
    <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">Qué aplica dónde</p>
        <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          Un módulo sirve en varias industrias. Una industria usa varios módulos.
        </h2>

        {/* La tabla es más ancha que 375px por definición: desplaza dentro de su propio
            contenedor y nunca hace scrollear el documento. */}
        <div className="mt-12 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <caption className="sr-only">Módulos de InspectIA que aplican a cada industria</caption>
            <thead>
              <tr>
                <th scope="col" className="w-56 pb-4 pr-4 text-sm font-medium text-ink-secondary">
                  Industria
                </th>
                {MODULES.map((m) => (
                  <th
                    key={m.key}
                    scope="col"
                    className="pb-4 text-center align-bottom text-xs font-medium text-ink-secondary"
                  >
                    <span className="metric block text-brand">{m.number}</span>
                    <span className="mt-1 block leading-tight">{m.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {industries.map((i) => (
                <tr key={i.slug} className="border-t border-line">
                  <th scope="row" className="py-4 pr-4 text-[15px] font-medium text-ink">
                    <Link
                      to="/soluciones/$industria"
                      params={{ industria: i.slug }}
                      className="hover:text-brand hover:underline hover:underline-offset-4"
                    >
                      {i.name}
                    </Link>
                  </th>
                  {MODULES.map((m) => {
                    const applies = i.modules.includes(m.key);
                    return (
                      <td key={m.key} className="py-4 text-center">
                        {applies ? (
                          <>
                            <span
                              aria-hidden
                              className="inline-block size-2.5 rounded-full bg-action"
                            />
                            <span className="sr-only">
                              {m.name} aplica a {i.name}
                            </span>
                          </>
                        ) : (
                          <span className="text-ink-muted" aria-label="no aplica">
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
