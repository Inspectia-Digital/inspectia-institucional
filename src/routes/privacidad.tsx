import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { LegalBody, LegalUpdated } from "@/components/site/LegalBody";
import { pageHead } from "@/lib/seo";

/**
 * Política de privacidad.
 *
 * 🔴 **TODO(legales): el texto lo redacta y lo firma legales, no desarrollo.**
 *
 * Lo que sí corresponde documentar acá, porque es lo que un texto genérico no va a
 * tener y sale de mirar el código, es qué recoge el sitio hoy. Pasarle esta lista a
 * quien redacte:
 *
 * - **Google Tag Manager** (`lib/gtm.ts`), cargado sólo si `VITE_GTM_ID` está definido.
 * - **Google Analytics 4**, a través del contenedor.
 * - **Consent Mode v2** con todo denegado hasta que la persona elige en el banner. La
 *   elección se guarda en `localStorage`, en la clave `inspectia.consent`, y no viaja a
 *   ningún servidor nuestro.
 * - **Tres formularios**, y los campos que pide cada uno:
 *   1. Informe de ROI (`components/roi/LeadForm.tsx`).
 *   2. Postulación al programa de partners (`routes/partners.tsx`).
 *   3. Alta al newsletter (`components/site/Footer.tsx`).
 *
 *   TODO(equipo): ninguno de los tres tiene destino configurado todavía. Cuando lo
 *   tengan, el destino —qué CRM, en qué país, cuánto tiempo guarda— entra en este
 *   listado, porque es exactamente lo que la política tiene que declarar.
 *
 * Lo que **no** se declara acá hasta que infraestructura lo firme: proveedor de nube,
 * país de los servidores, cifrado, certificaciones, plazos de retención y backups.
 */
export const Route = createFileRoute("/privacidad")({
  head: () =>
    pageHead({
      title: "Política de privacidad · InspectIA",
      description: "Cómo InspectIA trata los datos que se recogen en este sitio.",
      path: "/privacidad",
      noindex: true,
    }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout bottomCta={false}>
      <PageHero title="Política de privacidad" cta={false} />
      <LegalBody>
        <LegalUpdated />
        {/* TODO(legales): acá va la política. */}
      </LegalBody>
    </SiteLayout>
  );
}
