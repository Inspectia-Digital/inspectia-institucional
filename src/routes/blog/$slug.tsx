import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ProseBlocks } from "@/components/site/ProseBlocks";
import { POST_BY_SLUG } from "@/content/blog";
import { updatedLabel } from "@/content/guides";
import { SITE_URL } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

/**
 * Plantilla de un artículo del blog: `/blog/<slug>`.
 *
 * Sigue la §7 del plan del blog: el H1 es la búsqueda tal cual, el primer párrafo responde
 * en dos o tres oraciones, el cuerpo lleva un ejemplo con números, el bloque «Cómo lo
 * resuelve InspectIA» cierra con el enlace a la landing, y la firma y la fecha están a la
 * vista.
 *
 * Comparte el renderizador del cuerpo con las guías (`ProseBlocks`): los dos formatos
 * escriben con los mismos bloques y la misma sintaxis en línea.
 *
 * **Un borrador no existe para el lector.** `POST_BY_SLUG` se arma sólo con los publicados,
 * así que la URL de un borrador cae en este `notFound()` y devuelve 404. No es una página
 * oculta con `noindex`: es una página que no está.
 */
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POST_BY_SLUG.get(params.slug);
    if (!post) throw notFound();
    return { slug: post.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && POST_BY_SLUG.get(loaderData.slug);
    if (!p) return {};

    const path = `/blog/${p.slug}`;

    return pageHead({
      title: siteTitle(p.seoTitle),
      description: p.seoDescription,
      path,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: p.title, path },
          ]),
          /* `BlogPosting` y no `Article`: las guías son procedimientos permanentes y esto
             es una entrada con fecha de publicación. El tipo más específico es el que
             corresponde cuando existe.

             `dateModified` sale de `updated` y cae en `date` cuando no hubo revisión: la
             fecha del despliegue haría que todos los artículos se "actualizaran" cada vez
             que alguien toca un color del sitio. */
          {
            "@type": "BlogPosting",
            headline: p.h1,
            description: p.seoDescription,
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
            datePublished: p.date,
            dateModified: p.updated ?? p.date,
            author: { "@type": "Organization", name: p.author, url: SITE_URL },
            publisher: { "@type": "Organization", name: "InspectIA", url: SITE_URL },
          },
          ...(p.faq ? [faqJsonLd(p.faq)] : []),
        ],
      },
    });
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useLoaderData();
  const p = POST_BY_SLUG.get(slug)!;

  return (
    <SiteLayout>
      {/* Sin los botones en el hero, igual que en una guía: quien buscó «qué es un plan
          maestro» no vino a comprar, y un par de botones antes de la respuesta es el
          motivo por el que se vuelve al buscador. */}
      <PageHero eyebrow="Blog" title={p.h1} lead={p.answer} cta={false} />

      <nav aria-label="Ruta" className="px-5 pt-10 md:px-8">
        <ol className="mx-auto flex max-w-[var(--content-max)] flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
          <li>
            <Link
              to="/blog"
              activeOptions={{ exact: true }}
              className="text-ink-muted transition-colors duration-[160ms] hover:text-brand"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="text-line">
            /
          </li>
          <li aria-current="page" className="text-ink-secondary">
            {p.title}
          </li>
        </ol>
      </nav>

      <article className="px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="text-[13px] text-ink-muted">
            {p.author} · <time dateTime={p.date}>{updatedLabel(p.date)}</time>
            {p.updated && (
              <>
                {" · Actualizado el "}
                <time dateTime={p.updated}>{updatedLabel(p.updated)}</time>
              </>
            )}
          </p>

          <div className="mt-10 max-w-[var(--read-max)]">
            <ProseBlocks blocks={p.blocks} />
          </div>
        </div>
      </article>

      {p.faq && (
        <section className="px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[50rem]">
            <h2 className="text-[28px] leading-tight text-ink md:text-[length:var(--text-section)]">
              Preguntas frecuentes
            </h2>
            <Accordion
              type="single"
              collapsible
              defaultValue="post-faq-0"
              className="mt-10 border-t border-line"
            >
              {p.faq.map((item, i) => (
                <AccordionItem key={item.q} value={`post-faq-${i}`} className="border-line">
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

      {/* El cierre con el producto, al final y sin disfraz. El ancla es el término
          comercial: es el enlace que convierte el artículo en parte del grupo. */}
      <section className="border-t border-line px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Cómo lo resuelve InspectIA</p>
          <p className="mt-6 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
            {p.solution.body}
          </p>
          <Link
            to={p.solution.to}
            activeOptions={{ exact: true }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            {p.solution.label}
            <Icon name="arrow-right" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
