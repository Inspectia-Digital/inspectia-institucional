import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { LegalBody, LegalUpdated } from "@/components/site/LegalBody";
import { pageHead } from "@/lib/seo";

/**
 * Términos y condiciones.
 *
 * 🔴 **TODO(legales): el texto lo redacta y lo firma legales, no desarrollo.** Un
 * articulado generado no es un borrador: es un riesgo real, porque queda publicado con
 * la misma apariencia de validez que uno redactado. Lo que hay acá es la estructura —
 * hero, fecha de última actualización y contenedor de lectura con jerarquía de h2/h3—
 * lista para recibirlo.
 *
 * `noindex, follow`: no aportan a la búsqueda y diluyen el sitio, pero los enlaces que
 * salgan de acá siguen valiendo.
 */
export const Route = createFileRoute("/legales")({
  head: () =>
    pageHead({
      title: "Términos y condiciones · InspectIA",
      description: "Términos y condiciones de uso de InspectIA.",
      path: "/legales",
      noindex: true,
    }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout bottomCta={false}>
      <PageHero title="Términos y condiciones" cta={false} />
      <LegalBody>
        <LegalUpdated />
        {/* TODO(legales): acá va el articulado. */}
      </LegalBody>
    </SiteLayout>
  );
}
