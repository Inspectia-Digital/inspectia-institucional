import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { DiagnosticForm } from "@/components/ia/DiagnosticForm";
import { RoiCalculator } from "@/components/roi/RoiCalculator";
import { IA_APPLICATIONS, IA_PROJECT_STEPS } from "@/content/ia";
import { MODULE_BY_KEY } from "@/content/modules";
import { calidadModel } from "@/lib/roi/calidad";
import { pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

/**
 * La landing de IA.
 *
 * **Es la contracara de /precios.** Allá está todo lo que tiene precio publicado; acá,
 * todo lo que se cotiza. La línea que las separa es el costo y no el marketing: un módulo
 * cuesta lo mismo con carga manual que con el PLC conectado, y un modelo que mira cada
 * unidad producida tiene costo por evento. Por eso en esta página no hay un solo número
 * de precio, ni un rango, ni un "desde".
 *
 * **Las aplicaciones se ordenan por caso y no por módulo ni por plan.** Quien llega acá
 * tiene un problema —el defecto se ve tarde, la máquina no tiene salida de datos— y no
 * sabe de qué módulo es. Cada tarjeta responde las cuatro preguntas que siguen siempre, en
 * el mismo orden: qué problema, cómo funciona, qué necesita la planta, qué se puede medir
 * después.
 *
 * Las que tienen página propia la tienen porque vienen de una URL que ya estaba indexada.
 * Las demás viven sólo acá: una página por aplicación sin nada más que decir compite con
 * la sección que ya lo dice.
 */
export const Route = createFileRoute("/ia/")({
  head: () =>
    pageHead({
      // 36 caracteres antes del sufijo.
      title: siteTitle("IA y visión artificial para planta"),
      // 155 caracteres.
      description:
        "Inspección visual de defectos, conteo por visión, mantenimiento predictivo y agentes para tu planta. Proyectos con hasta un 50 % de descuento con Kit 4.0.",
      path: "/ia",
    }),
  component: Page,
});

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1000px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Inteligencia artificial"
        title="Que el sistema vea, cuente y avise solo"
        lead="Somos especialistas en visión artificial, modelos predictivos y agentes para planta. Partimos de un problema que se puede medir y lo resolvemos con el equipamiento que tenés o con el que te conviene sumar."
        cta={false}
      >
        <p className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href="#diagnostico"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-white px-8 text-[15px] font-semibold text-brand-deep transition-colors duration-[160ms] hover:bg-teal-050 active:translate-y-px"
          >
            Pedí un diagnóstico
          </a>
          <Link
            to="/kit-4-0"
            className="text-[15px] font-semibold text-on-brand underline underline-offset-4 decoration-[var(--accent-on-brand)] hover:decoration-2"
          >
            Hasta un 50 % de descuento con Kit 4.0
          </Link>
        </p>
      </PageHero>

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Aplicaciones</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Nueve problemas de planta que hoy resolvemos con modelos. Si el tuyo no está en la
            lista, sirve igual como referencia de qué hace falta para encararlo.
          </p>

          <ul className="mt-12 grid gap-10 min-[1000px]:grid-cols-2">
            {IA_APPLICATIONS.map((a) => (
              <li key={a.id} id={a.id} className="min-w-0 scroll-mt-28">
                <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{a.title}</h3>
                <dl className="mt-4 space-y-3">
                  <Linea term="El problema" desc={a.problem} />
                  <Linea term="Cómo funciona" desc={a.how} />
                  <Linea term="Qué necesita tu planta" desc={a.needs} />
                  <Linea term="Qué medís después" desc={a.measures} />
                </dl>

                <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {a.hasPage && (
                    <Link
                      to="/ia/$aplicacion"
                      params={{ aplicacion: a.id }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
                    >
                      Ver en detalle
                      <Icon name="arrow-right" />
                    </Link>
                  )}
                  {a.module && (
                    <Link
                      to="/plataforma/$modulo"
                      params={{ modulo: a.module }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
                    >
                      Se integra con {MODULE_BY_KEY.get(a.module)?.name}
                      <Icon name="arrow-right" />
                    </Link>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Cómo es un proyecto</h2>
          <ol className="mt-12 grid gap-8 min-[1000px]:grid-cols-4">
            {IA_PROJECT_STEPS.map((s) => (
              <li key={s.n} className="min-w-0">
                <span className="metric text-sm font-semibold text-brand">{s.n}</span>
                <h3 className="mt-4 text-[length:var(--text-card)] leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink">
            Trabajamos con el hardware que tenés o con el que te conviene sumar. No te vendemos un
            equipo cerrado.
          </p>
        </div>
      </section>

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Cuánto te rinde</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            El caso con el número más claro es el de calidad, porque el scrap se cuenta y se
            valoriza. Poné lo que produce tu línea y cuánto se va en rechazo. Sin registrarte y con
            los supuestos a la vista.
          </p>

          <div className="mt-12">
            {/* Sin el formulario del informe: el de esta página es el de diagnóstico, que
                está más abajo, y dos capturas de datos en la misma página compiten. */}
            <RoiCalculator model={calidadModel} showLeadForm={false} />
          </div>

          <p className="mt-8 text-[15px]">
            <Link
              to="/roi"
              className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Calcular para otro módulo
              <Icon name="arrow-right" />
            </Link>
          </p>
        </div>
      </section>

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[28ch] ${H2}`}>Hasta un 50 % de descuento con Kit 4.0</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Somos proveedores habilitados para todos los kits del programa. Te decimos cuál te
            corresponde y, mientras sale el trámite, empezás gratis con una línea.
          </p>
          <p className="mt-9">
            <Link
              to="/kit-4-0"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border border-line-brand bg-action-soft px-8 text-[15px] font-semibold text-action-soft-text transition-colors duration-[160ms] hover:bg-teal-100 active:translate-y-px"
            >
              Ver qué kit te corresponde
            </Link>
          </p>
        </div>
      </section>

      <section id="diagnostico" className={`scroll-mt-20 bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Contanos qué querés resolver</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            El diagnóstico define el problema y cómo se va a medir el resultado. No tiene cargo, y
            si el problema no se puede medir te lo decimos antes de cotizar nada.
          </p>

          <div className="mt-12 max-w-[50rem]">
            <DiagnosticForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Linea({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[13px] font-medium text-ink-secondary">{term}</dt>
      <dd className="mt-0.5 text-[15px] leading-[var(--leading-normal)] text-ink">{desc}</dd>
    </div>
  );
}
