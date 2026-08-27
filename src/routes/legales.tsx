import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { LegalBody, LegalUpdated } from "@/components/site/LegalBody";
import { TERMS_CLAUSES, TERMS_INTRO, TERMS_UPDATED } from "@/content/legal";
import { pageHead } from "@/lib/seo";

/**
 * Términos y condiciones.
 *
 * El articulado vive en `content/legal.ts` y viene aprobado por legal: acá sólo se
 * maqueta. **No se edita una palabra del cuerpo desde esta ruta.**
 *
 * `noindex, follow`: no aporta a la búsqueda y diluye el sitio, pero los enlaces que
 * salen de acá siguen valiendo.
 */
export const Route = createFileRoute("/legales")({
  head: () =>
    pageHead({
      title: "Términos y condiciones · InspectIA",
      description: "Términos y condiciones de uso de los servicios de InspectIA.",
      path: "/legales",
      noindex: true,
    }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout bottomCta={false}>
      {/* El original arranca con "TÉRMINOS Y CONDICIONES – INSPECTIA" en mayúsculas
          porque es el título de un Word. En la web el titular va en tipo oración como
          el resto del sitio; el cuerpo de las cláusulas conserva su capitalización. */}
      <PageHero eyebrow="Legales" title="Términos y condiciones" cta={false} />

      <LegalBody>
        <LegalUpdated date={TERMS_UPDATED} />

        {TERMS_INTRO.map((p) => (
          <p key={p}>{p}</p>
        ))}

        {TERMS_CLAUSES.map((c) => (
          <section key={c.n}>
            {/* El número va dentro del h2 y no como contador de CSS: forma parte del
                texto legal, y una cláusula se cita por su número. */}
            <h2>
              {c.n}. {c.title}
            </h2>
            {c.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
      </LegalBody>
    </SiteLayout>
  );
}
