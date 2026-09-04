import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { LegalBody, LegalUpdated } from "@/components/site/LegalBody";
import { PRIVACY_CLAUSES, PRIVACY_INTRO, PRIVACY_UPDATED } from "@/content/privacy";
import { pageHead } from "@/lib/seo";

/**
 * Política de privacidad.
 *
 * 🟡 **Versión provisoria: la escribió desarrollo y falta que legales la revise.** El
 * texto vive en `content/privacy.ts` y ahí está anotado qué afirma y qué evita afirmar.
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
 *   Los dos primeros van por `mailto:` a contacto@inspectia.ai (`lib/mailto.ts`); el
 *   tercero no se renderiza. Cuando haya CRM, el destino —cuál, en qué país, cuánto
 *   tiempo guarda— entra en la política, que es lo que hoy la cláusula 02 declara.
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
      <PageHero eyebrow="Legales" title="Política de privacidad" cta={false} />

      <LegalBody>
        <LegalUpdated date={PRIVACY_UPDATED} />

        {PRIVACY_INTRO.map((p) => (
          <p key={p}>{p}</p>
        ))}

        {PRIVACY_CLAUSES.map((c) => (
          <section key={c.n}>
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
