import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { GUIDES } from "@/content/guides";
import { MODULES } from "@/content/modules";
import { SITE_URL } from "@/content/site";
import { breadcrumbJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

const TITLE = "Guías de producción, calidad y depósito";
const DESCRIPTION =
  "Cómo calcular el OEE, cómo armar la lista de motivos de parada, cómo acotar un retiro de lotes: las cuentas y los procedimientos, explicados con ejemplos.";

/**
 * El índice de guías.
 *
 * **No entra al menú principal** y es deliberado (§1.4 del brief): el valor de búsqueda
 * está en las ocho guías, no acá, y una sección más en la barra de navegación le compite
 * atención a Plataforma y a Soluciones, que son las que venden. El índice vive en el pie,
 * bajo Recursos, y lo que distribuye autoridad son los enlaces cruzados entre cada guía,
 * su funcionalidad y su módulo.
 *
 * Por eso tampoco tiene hero con botones: es una página de navegación, no de conversión.
 */
export const Route = createFileRoute("/guias/")({
  head: () =>
    pageHead({
      title: siteTitle(TITLE),
      description: DESCRIPTION,
      path: "/guias",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([{ name: "Guías", path: "/guias" }]),
          /* `ItemList` y no `Blog`: esto es un índice de ocho páginas, no una bitácora con
             entradas ordenadas por fecha. Declararlo como blog prometería una frecuencia
             de publicación que nadie se comprometió a sostener. */
          {
            "@type": "ItemList",
            name: TITLE,
            itemListElement: GUIDES.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: g.title,
              // Absoluta: un rastreador de datos estructurados no resuelve rutas relativas.
              url: `${SITE_URL}/guias/${g.slug}`,
            })),
          },
        ],
      },
    }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Guías"
        title="Las cuentas y los procedimientos, explicados"
        lead="Cómo se calcula el OEE, cómo se arma una lista de motivos de parada que los operarios usen, cómo se acota un retiro de lotes. Con las fórmulas, los ejemplos y los errores más comunes."
        cta={false}
      />

      <section className="px-5 py-[var(--section-pad-md)] md:px-8 min-[1000px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <ul className="grid gap-x-12 gap-y-10 min-[1000px]:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.slug} className="min-w-0 border-t border-line pt-6">
                <Link to="/guias/$guia" params={{ guia: g.slug }} className="group block">
                  <h2 className="text-[length:var(--text-card)] leading-snug text-ink">{g.h1}</h2>
                  <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                    {g.seoDescription}
                  </p>
                  <p className="mt-4 text-sm text-ink-muted">
                    {g.modules
                      .map((k) => MODULES.find((m) => m.key === k)?.name)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Leer la guía
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
    </SiteLayout>
  );
}
