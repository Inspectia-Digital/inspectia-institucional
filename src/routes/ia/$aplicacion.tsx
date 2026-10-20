import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { IA_APPLICATIONS } from "@/content/ia";
import { IA_PAGE_SOURCES, MODULE_BY_KEY } from "@/content/modules";
import { breadcrumbJsonLd, faqJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

/**
 * Una aplicación de IA con página propia.
 *
 * Las cinco que tienen página son las que vienen de una URL de `/plataforma` que ya estaba
 * indexada: drones, cámaras, recepción, pedidos y agente. Su contenido es el que estaba
 * publicado y vive en `IA_PAGE_SOURCES`, con la forma de `PlatformModule` porque esta
 * plantilla renderiza exactamente lo mismo que la de módulo.
 *
 * **Dos cosas que esta plantilla no muestra, a diferencia de la de módulo:** el precio y
 * el plan gratuito. Son proyectos que se cotizan, y un bloque de precio acá rompería la
 * única regla que sostiene toda la separación entre /precios y /ia.
 *
 * La acción es "Pedí un diagnóstico" y no "Empezar gratis": no hay plan gratuito que
 * empezar, y mandar al alta a quien viene buscando un proyecto de visión artificial lo
 * deja en una pantalla que no responde lo que vino a preguntar.
 */
export const Route = createFileRoute("/ia/$aplicacion")({
  loader: ({ params }) => {
    const app = IA_APPLICATIONS.find((a) => a.id === params.aplicacion && a.hasPage);
    if (!app) throw notFound();
    return { id: app.id };
  },
  head: ({ loaderData }) => {
    const app = loaderData && IA_APPLICATIONS.find((a) => a.id === loaderData.id);
    if (!app) return {};
    const src = app.source ? IA_PAGE_SOURCES.find((m) => m.key === app.source) : undefined;
    const breadcrumb = breadcrumbJsonLd([
      { name: "IA", path: "/ia" },
      { name: app.title, path: `/ia/${app.id}` },
    ]);
    return pageHead({
      title: siteTitle(src?.seoTitle ?? app.title),
      description: src?.seoDescription ?? `${app.problem} ${app.how}`,
      path: `/ia/${app.id}`,
      jsonLd: src?.faq
        ? { "@context": "https://schema.org", "@graph": [breadcrumb, faqJsonLd(src.faq)] }
        : breadcrumb,
    });
  },
  component: AppPage,
});

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1000px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function AppPage() {
  const { id } = Route.useLoaderData();
  const app = IA_APPLICATIONS.find((a) => a.id === id)!;
  const src = app.source ? IA_PAGE_SOURCES.find((m) => m.key === app.source) : undefined;
  const modulo = app.module ? MODULE_BY_KEY.get(app.module) : undefined;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Aplicación de IA"
        title={src?.h1 ?? app.title}
        lead={src?.lead ?? app.how}
        cta={false}
      >
        <p className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            to="/ia"
            hash="diagnostico"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-white px-8 text-[15px] font-semibold text-brand-deep transition-colors duration-[160ms] hover:bg-teal-050 active:translate-y-px"
          >
            Pedí un diagnóstico
          </Link>
          <Link
            to="/kit-4-0"
            className="text-[15px] font-semibold text-on-brand underline underline-offset-4 decoration-[var(--accent-on-brand)] hover:decoration-2"
          >
            Hasta un 50 % de descuento con Kit 4.0
          </Link>
        </p>
      </PageHero>

      {/* Las cuatro preguntas que siguen siempre, antes del contenido largo: quien llega
          desde /ia ya las leyó, y quien llega desde una búsqueda las necesita acá. */}
      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <dl className="grid gap-8 min-[1000px]:grid-cols-4">
            <Dato term="El problema" desc={app.problem} />
            <Dato term="Cómo funciona" desc={app.how} />
            <Dato term="Qué necesita tu planta" desc={app.needs} />
            <Dato term="Qué medís después" desc={app.measures} />
          </dl>
        </div>
      </section>

      {src?.problem && (
        <section className={`bg-surface ${SECTION}`}>
          <div className={CONTAINER}>
            <h2 className={`max-w-[24ch] ${H2}`}>Cuándo aparece este problema</h2>
            <ul className="mt-10 max-w-[var(--read-max)] space-y-3">
              {src.problem.map((line) => (
                <li
                  key={line}
                  className="flex gap-2.5 text-[15px] leading-[var(--leading-normal)] text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--status-stop)]"
                  />
                  <span className="min-w-0">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {src?.does && (
        <section className={`bg-surface ${SECTION}`}>
          <div className={CONTAINER}>
            <h2 className={`max-w-[24ch] ${H2}`}>{src.doesTitle ?? "Qué hace"}</h2>
            <ul className="mt-12 grid gap-8 min-[1000px]:grid-cols-2">
              {src.does.map((d) => (
                <li key={d.title} className="min-w-0">
                  <h3 className="text-[length:var(--text-card)] leading-snug text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                    {d.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Cómo se contrata</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Como proyecto, no como plan. Arranca con un diagnóstico sin cargo donde definimos el
            problema y cómo se va a medir el resultado, y sigue con un piloto antes de cualquier
            puesta en producción.
          </p>
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              to="/ia"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Ver cómo es un proyecto
              <Icon name="arrow-right" />
            </Link>
            {modulo && (
              <Link
                to="/plataforma/$modulo"
                params={{ modulo: modulo.key }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
              >
                Se integra con {modulo.name}
                <Icon name="arrow-right" />
              </Link>
            )}
          </p>
        </div>
      </section>

      {src?.faq && (
        <section className={`bg-surface ${SECTION}`}>
          <div className="mx-auto max-w-[50rem]">
            <h2 className={H2}>{src.faqTitle ?? `Preguntas sobre ${app.title}`}</h2>
            <Accordion
              type="single"
              collapsible
              defaultValue="ia-faq-0"
              className="mt-10 border-t border-line"
            >
              {src.faq.map((item, i) => (
                <AccordionItem key={item.q} value={`ia-faq-${i}`} className="border-line">
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
    </SiteLayout>
  );
}

function Dato({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[13px] font-medium text-ink-secondary">{term}</dt>
      <dd className="mt-1 text-[15px] leading-[var(--leading-normal)] text-ink">{desc}</dd>
    </div>
  );
}
