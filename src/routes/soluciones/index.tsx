import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { MODULES } from "@/content/modules";
import { USE_CASES, publishedIndustries } from "@/content/solutions";
import { pageHead } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

const TITLE = "Soluciones por industria y por problema · InspectIA";
const DESCRIPTION =
  "Una autopartista y una planta de alimentos no tienen el mismo problema, pero se resuelven con las mismas piezas. Mirá qué módulos usa tu industria.";

/**
 * Hub de soluciones (§7.5).
 *
 * El valor de búsqueda de esta sección está en las hijas, no acá: el hub existe para
 * distribuir autoridad y para que el mega-menú tenga destino.
 */
export const Route = createFileRoute("/soluciones/")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/soluciones" }),
  component: SolutionsPage,
});

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function SolutionsPage() {
  const industries = publishedIndustries();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Soluciones"
        title="Los mismos módulos, tu industria"
        lead="Una autopartista y una planta de alimentos no tienen el mismo problema, pero se resuelven con las mismas piezas. Elegí tu industria y mirá qué módulos suele usar, o entrá por el problema que te trajo."
      />

      {/* --- Por industria --- */}
      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <p className="eyebrow">Por industria</p>
          <h2 className={`mt-4 ${H2}`}>Empezá por tu rubro</h2>

          {/* TODO(equipo): las cards de industria llevan foto arriba a 16:10 (§11.5).
              Falta la fotografía propia de planta; hasta entonces van sin foto. */}
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
                    Ver soluciones para {i.name.toLowerCase()}
                    <Icon
                      name="arrow-right"
                      className="transition-transform duration-[160ms] group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Las cuatro sin publicar no se muestran, ni en gris ni con "próximamente".
              Esta línea es honesta y capta el lead sin publicar una página vacía. */}
          <p className="mt-10 max-w-[var(--lead-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            Si tu industria no está en la lista, es porque todavía no tenemos un caso propio para
            mostrar. Escribinos y te contamos qué módulos aplican a tu proceso.
          </p>
        </div>
      </section>

      {/* --- Por caso de uso --- */}
      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className={CONTAINER}>
          <p className="eyebrow">Por caso de uso</p>
          <h2 className={`mt-4 ${H2}`}>O entrá por el problema</h2>

          <ul className="mt-12 grid gap-6 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {USE_CASES.map((u) => (
              <li key={u.slug} className="min-w-0">
                <Link
                  to="/soluciones/casos-de-uso/$caso"
                  params={{ caso: u.slug }}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-surface p-6"
                >
                  {/* El titular de la card es el dolor en primera persona; el nombre del
                      caso va como ancla, que es donde el término de búsqueda sirve. */}
                  <h3 className="text-[length:var(--text-lead)] font-medium leading-snug text-ink">
                    «{u.pain}»
                  </h3>
                  <p className="mt-4 text-sm text-ink-secondary">
                    {u.modules
                      .map((k) => MODULES.find((m) => m.key === k)?.name)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
                    {u.name}
                    <Icon
                      name="arrow-right"
                      className="transition-transform duration-[160ms] group-hover:translate-x-0.5"
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
 * Hace visible la idea de plataforma —se ve de un vistazo que un módulo sirve en varias
 * industrias— y de paso reparte autoridad hacia once páginas desde un solo bloque. El
 * punto se calcula del arreglo `modules` de cada industria: no está escrito a mano.
 */
function CoverageMatrix() {
  const industries = publishedIndustries();

  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <h2 className={`max-w-[24ch] ${H2}`}>Qué módulo usa cada industria</h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Las filas son industrias, las columnas son módulos. Donde hay un punto, es un módulo que
          ese rubro suele usar primero.
        </p>

        {/* Desde 1100 para arriba, la matriz. Por debajo no funciona —ocho columnas no
            entran— así que se reemplaza por una lista, no por scroll horizontal. */}
        <div className="mt-12 hidden min-[1100px]:block">
          <table className="w-full border-collapse text-left">
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
                    <Link
                      to="/plataforma/$modulo"
                      params={{ modulo: m.slug }}
                      className="mt-1 block leading-tight hover:text-brand hover:underline hover:underline-offset-4"
                    >
                      {m.name}
                    </Link>
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
                  {MODULES.map((m) => (
                    <td key={m.key} className="py-4 text-center">
                      {i.modules.includes(m.key) ? (
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
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-12 space-y-8 min-[1100px]:hidden">
          {industries.map((i) => (
            <li key={i.slug} className="min-w-0">
              <h3 className="text-[15px] font-semibold text-ink">
                <Link
                  to="/soluciones/$industria"
                  params={{ industria: i.slug }}
                  className="hover:text-brand hover:underline hover:underline-offset-4"
                >
                  {i.name}
                </Link>
              </h3>
              <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {i.modules
                  .map((k) => MODULES.find((m) => m.key === k)?.name)
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
