import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { publishedPosts } from "@/content/blog";
import { updatedLabel } from "@/content/guides";
import { pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

const TITLE = "Blog: cómo se mide y se mejora una planta";
const DESCRIPTION =
  "Definiciones, cálculos y explicaciones técnicas de la operación de una planta: plan de producción, MRP, costos, mantenimiento y SCADA.";

/**
 * El índice del blog: `/blog`.
 *
 * **No está en el menú y no entra al mapa del sitio mientras no haya artículos
 * publicados** (ver el encabezado de `content/blog.ts`). Responde 200 igual, con el estado
 * vacío de abajo, para que el equipo pueda mirar la plantilla antes de escribir el primero.
 *
 * Es `noindex` mientras esté vacío, y por eso: un índice sin nada que indexar compite con
 * las páginas que sí tienen contenido por el presupuesto de rastreo del dominio, y queda
 * indexado como una página delgada que después hay que limpiar. Con el primer artículo
 * publicado, el `noindex` se cae solo.
 */
export const Route = createFileRoute("/blog/")({
  head: () => {
    const posts = publishedPosts();
    return pageHead({
      title: siteTitle(TITLE),
      description: DESCRIPTION,
      path: "/blog",
      noindex: posts.length === 0,
    });
  },
  component: BlogIndex,
});

function BlogIndex() {
  const posts = publishedPosts();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Cómo se mide y se mejora una planta"
        lead="Definiciones, cálculos y explicaciones técnicas. Lo que es un procedimiento con plantilla vive en las guías; lo que es un producto, en su página."
        cta={false}
      />

      <section className="px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          {posts.length === 0 ? (
            /* El estado vacío dice la verdad y ofrece la salida que sí tiene contenido.
               Sin «próximamente»: una promesa de fecha que no se cumple es peor que la
               ausencia. */
            <>
              <p className="max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
                Todavía no hay artículos publicados. Mientras tanto, las guías responden cómo se
                calcula el OEE, cómo se clasifican los motivos de parada y cómo se arma un retiro de
                lotes.
              </p>
              <Link
                to="/guias"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
              >
                Ver las guías
                <Icon name="arrow-right" />
              </Link>
            </>
          ) : (
            <ul className="grid gap-6 min-[1000px]:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug} className="min-w-0">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line p-6 transition-[border-color,box-shadow] duration-[160ms] hover:border-line-brand hover:shadow-[var(--shadow-sm)]"
                  >
                    <h2 className="text-[length:var(--text-card)] leading-snug text-ink">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                      {p.seoDescription}
                    </p>
                    <p className="mt-4 text-[13px] text-ink-muted">
                      <time dateTime={p.date}>{updatedLabel(p.date)}</time>
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
                      Leer
                      <Icon
                        name="arrow-right"
                        className="transition-transform duration-[160ms] group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
