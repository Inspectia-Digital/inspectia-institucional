import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { KITS } from "@/content/kit40";
import { MODULE_BY_KEY } from "@/content/modules";
import { priceOf } from "@/content/pricing";
import { breadcrumbJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

/**
 * Una página por kit.
 *
 * El término de búsqueda es el código —"Bas-02", "Avz-02"— porque es lo que el cliente
 * tiene adelante cuando mira el catálogo del programa y no sabe cuál le toca. Por eso el
 * código va en el title y en el h1, antes que el nombre oficial, que es largo y no lo
 * busca nadie así.
 *
 * Cada página dice las mismas cuatro cosas y en el mismo orden: qué resuelve, qué incluye
 * el proyecto, con qué módulo se implementa y cómo se empieza. Siete páginas que dicen lo
 * mismo con distinto relleno son siete páginas que Google trata como una.
 */
export const Route = createFileRoute("/kit-4-0/$kit")({
  loader: ({ params }) => {
    const kit = KITS.find((k) => k.slug === params.kit);
    if (!kit) throw notFound();
    return { slug: kit.slug };
  },
  head: ({ loaderData }) => {
    const k = loaderData && KITS.find((x) => x.slug === loaderData.slug);
    if (!k) return {};
    return pageHead({
      title: siteTitle(`Kit ${k.code}: ${k.short}`),
      description: k.seoDescription,
      path: `/kit-4-0/${k.slug}`,
      jsonLd: breadcrumbJsonLd([
        { name: "Kit 4.0", path: "/kit-4-0" },
        { name: `Kit ${k.code}`, path: `/kit-4-0/${k.slug}` },
      ]),
    });
  },
  component: KitPage,
});

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1000px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function KitPage() {
  const { slug } = Route.useLoaderData();
  const kit = KITS.find((k) => k.slug === slug)!;
  const modulo = MODULE_BY_KEY.get(kit.module);
  const price = priceOf(kit.module);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={`Kit 4.0 · ${kit.code}`}
        title={`${kit.name}, con hasta un 50 % de descuento`}
        lead={kit.solves}
        cta={false}
      />

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Qué resuelve</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            {kit.problem}
          </p>
          {modulo?.lead && (
            <p className="mt-4 max-w-[var(--lead-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              {modulo.lead}
            </p>
          )}
        </div>
      </section>

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Qué incluye el proyecto</h2>
          <ul className="mt-10 max-w-[var(--read-max)] space-y-2.5">
            {kit.includes.map((line) => (
              <li
                key={line}
                className="flex gap-2.5 text-[15px] leading-[var(--leading-normal)] text-ink"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--action-primary)]"
                />
                <span className="min-w-0">{line}</span>
              </li>
            ))}
          </ul>

          {kit.needsAi && (
            // Se dice acá y no en la letra chica: es la diferencia entre un kit que se
            // implementa con el precio de lista y uno que además lleva un proyecto.
            <p className="mt-8 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink">
              Este kit lleva un proyecto de IA, que se cotiza según el producto y el volumen.{" "}
              <Link
                to="/ia"
                className="font-semibold text-brand hover:underline hover:underline-offset-4"
              >
                Ver cómo es un proyecto de IA
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {modulo && (
        <section className={`bg-surface ${SECTION}`}>
          <div className={CONTAINER}>
            <h2 className={`max-w-[24ch] ${H2}`}>Con qué módulo se implementa</h2>
            <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
              {modulo.promise}
            </p>
            {price && (
              <p className="mt-4 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                Después del proyecto, el módulo cuesta USD {price.usd} por {price.unit} y por mes.
                {price.free ? ` Su plan gratuito cubre ${price.free.toLowerCase()}.` : ""}
              </p>
            )}
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                to="/plataforma/$modulo"
                params={{ modulo: kit.module }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
              >
                Ver {modulo.name}
                <Icon name="arrow-right" />
              </Link>
              <Link
                to="/kit-4-0"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
              >
                Ver los otros kits
                <Icon name="arrow-right" />
              </Link>
            </p>
          </div>
        </section>
      )}

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Cómo se empieza</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Contanos qué querés resolver y con qué contás hoy. De ahí sale el alcance del proyecto y
            la documentación para presentar el kit.
          </p>
          <p className="mt-9">
            <Link
              to="/ia"
              hash="diagnostico"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px"
            >
              Pedí un diagnóstico
            </Link>
          </p>
          <p className="mt-8 max-w-[var(--read-max)] text-[13px] leading-[var(--leading-normal)] text-ink-muted">
            El descuento se aplica al terminar el proyecto. Los topes y las condiciones son los del
            programa vigente y dependen del kit.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
