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
import { RichText } from "@/components/site/RichText";
import { MODULES } from "@/content/modules";
import { INDUSTRIES } from "@/content/solutions";
import { GUIDE_BY_SLUG, updatedLabel, type GuideBlock } from "@/content/guides";
import { useGuideViewEvent } from "@/lib/useViewEvents";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

/**
 * Plantilla de las guías: `/guias/<tema>`.
 *
 * Es el nivel informativo del modelo de contenido. Acá llega quien busca **cómo se hace**,
 * no quien busca el software, y eso cambia tres cosas respecto de cualquier otra página
 * del sitio:
 *
 * 1. **El hero no lleva los botones.** `cta={false}`. Lo primero que tiene que leerse es
 *    la respuesta, no "Empezar gratis": quien buscó "cómo calcular el OEE" no vino a
 *    comprar, y un par de botones antes de la respuesta es el motivo por el que se vuelve
 *    al buscador. La conversión está abajo, en el bloque del producto, después de haber
 *    respondido.
 * 2. **La respuesta va completa en el primer párrafo**, como bajada del hero, para que se
 *    pueda leer sola fuera de la página.
 * 3. **La fecha es visible.** Una guía sin fecha no se sabe si sigue valiendo.
 *
 * El cuerpo sale de un arreglo de bloques tipados (ver `content/guides.ts`) porque una
 * guía necesita tablas, fórmulas y listas en un orden propio, y ninguna de las ocho tiene
 * la misma forma que otra.
 */
export const Route = createFileRoute("/guias/$guia")({
  loader: ({ params }) => {
    const guide = GUIDE_BY_SLUG.get(params.guia);
    if (!guide) throw notFound();
    return { slug: guide.slug };
  },
  head: ({ loaderData }) => {
    const g = loaderData && GUIDE_BY_SLUG.get(loaderData.slug);
    if (!g) return {};

    const path = `/guias/${g.slug}`;

    return pageHead({
      title: siteTitle(g.seoTitle),
      description: g.seoDescription,
      path,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([
            { name: "Guías", path: "/guias" },
            { name: g.title, path },
          ]),
          articleJsonLd({
            headline: g.h1,
            description: g.seoDescription,
            path,
            updated: g.updated,
          }),
          ...(g.faq ? [faqJsonLd(g.faq)] : []),
        ],
      },
    });
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useLoaderData();
  const g = GUIDE_BY_SLUG.get(slug)!;
  useGuideViewEvent(g.slug);

  const modules = g.modules
    .map((k) => MODULES.find((m) => m.key === k))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const industry = g.worstIn && INDUSTRIES.find((i) => i.slug === g.worstIn!.slug && i.published);

  return (
    <SiteLayout>
      <PageHero eyebrow="Guía" title={g.h1} lead={g.answer} cta={false} />

      <nav aria-label="Ruta" className="px-5 pt-10 md:px-8">
        <ol className="mx-auto flex max-w-[var(--content-max)] flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
          <li>
            {/* `exact` para que el índice no se declare "página actual" estando en una
                guía: por omisión `Link` marca activo todo destino con el que la ruta
                empieza, y acá eso da dos elementos con `aria-current="page"` en una lista
                de dos. */}
            <Link
              to="/guias"
              activeOptions={{ exact: true }}
              className="text-ink-muted transition-colors duration-[160ms] hover:text-brand"
            >
              Guías
            </Link>
          </li>
          <li aria-hidden="true" className="text-line">
            /
          </li>
          <li aria-current="page" className="text-ink-secondary">
            {g.title}
          </li>
        </ol>
      </nav>

      {/* El cuerpo, a una sola columna y al ancho de lectura. Sin barra lateral y sin
          índice flotante: estas guías tienen cinco o seis encabezados, y un índice para
          cinco destinos ocupa más de lo que ahorra. */}
      <article className="px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="text-[13px] text-ink-muted">
            Actualizado el <time dateTime={g.updated}>{updatedLabel(g.updated)}</time>
          </p>

          <div className="mt-10 max-w-[var(--read-max)]">
            {g.blocks.map((b, i) => (
              <Block key={i} block={b} first={i === 0} />
            ))}
          </div>
        </div>
      </article>

      {g.faq && (
        <section className="px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[50rem]">
            <h2 className="text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
              Preguntas frecuentes
            </h2>
            <Accordion
              type="single"
              collapsible
              defaultValue="guia-faq-0"
              className="mt-10 border-t border-line"
            >
              {g.faq.map((item, i) => (
                <AccordionItem key={item.q} value={`guia-faq-${i}`} className="border-line">
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

      {/* El cierre con el producto. Va último y sin disfraz: la guía respondió, y acá se
          dice qué hace InspectIA con eso. Mezclarlo arriba sería escribir un folleto con
          forma de guía, que es lo que el lector detecta y abandona. */}
      <section className="border-t border-line px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Cómo lo resuelve InspectIA</p>
          <p className="mt-6 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
            <RichText text={g.closing} />
          </p>
          <ModuleGrid modules={modules} className="mt-12" />
        </div>
      </section>

      {industry && (
        <section className="px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[var(--content-max)]">
            <p className="eyebrow">Dónde más cuesta</p>
            <p className="mt-4 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
              {g.worstIn!.note}
            </p>
            <Link
              to="/soluciones/$industria"
              params={{ industria: industry.slug }}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Ver soluciones para {industry.name.toLowerCase()}
              <Icon name="arrow-right" />
            </Link>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

/* ---------- Los bloques del cuerpo ---------- */

/**
 * Un bloque de la guía.
 *
 * El `switch` es exhaustivo sobre `GuideBlock`: si alguien agrega una variante al tipo y
 * no la maneja acá, TypeScript lo marca en `exhaustivo`. Es la razón por la que esa
 * constante existe y no es código muerto.
 */
function Block({ block: b, first }: { block: GuideBlock; first: boolean }) {
  switch (b.kind) {
    case "h2":
      return (
        // Sin margen superior en el primero: el aire ya lo pone el contenedor.
        <h2 className={`${first ? "" : "mt-14 "}text-[22px] leading-snug text-ink md:text-[26px]`}>
          {b.text}
        </h2>
      );

    case "p":
      return (
        <p className="mt-5 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          <RichText text={b.text} />
        </p>
      );

    case "ul":
      return (
        <ul className="mt-6 space-y-4">
          {b.items.map((item) => (
            <li
              key={item}
              className="relative pl-5 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-line-brand"
            >
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="mt-6 space-y-4">
          {b.items.map((item, i) => (
            <li key={item} className="flex gap-4">
              <span className="metric shrink-0 pt-[0.15em] text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ol>
      );

    case "formula":
      /* La fórmula en su propio bloque, en texto y en la tipografía de datos.
         **Nunca como imagen** (§6 del brief): un PNG con una fórmula no lo lee un
         buscador, no lo lee un lector de pantalla y no se puede copiar para pegarlo en una
         planilla, que es exactamente lo que va a hacer quien llegó buscando esto. */
      return (
        <p className="metric mt-7 border-l-2 border-line-brand bg-brand-subtle px-5 py-4 text-[15px] leading-relaxed text-ink md:text-[17px]">
          {b.text}
        </p>
      );

    case "table":
      return (
        /* El contenedor con scroll horizontal no es una concesión: una tabla de tres
           columnas con texto en 390px no se puede comprimir sin volverse ilegible, y la
           alternativa —convertirla en una lista de pares— pierde justamente la
           comparación entre filas, que es para lo que la tabla está. */
        <div className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[15px]">
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="border-b border-line pb-3 pr-6 align-bottom font-semibold text-ink last:pr-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`border-b border-line py-3 pr-6 align-top leading-[var(--leading-normal)] last:pr-0 ${
                        i === 0 ? "font-medium text-ink" : "text-ink-secondary"
                      }`}
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default: {
      const exhaustivo: never = b;
      return exhaustivo;
    }
  }
}
