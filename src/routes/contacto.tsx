import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT, OFFICES, officeLine } from "@/content/site";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";
import type { IconConcept } from "@/components/icons/inspectia-icons";

const TITLE = "Contacto · InspectIA";
const DESCRIPTION =
  "Teléfono, correo y las dos oficinas de InspectIA. Y los dos caminos para empezar: agendar una demo de veinte minutos o crear la cuenta gratuita.";

/**
 * Contacto.
 *
 * La página existe por la migración: el WordPress anterior tenía dos páginas de contacto
 * indexadas —`/contact/` y `/contact-page/`— y el sitio nuevo no tenía ninguna, porque
 * convierte por demo agendada y por alta de cuenta. Redirigir «contacto InspectIA» a la
 * home era desperdiciar una búsqueda de marca con intención clara.
 *
 * **Sin formulario, a propósito.** Ninguno de los tres que ya existen tiene destino
 * configurado; sumar un cuarto que tampoco lo tenga es multiplicar el problema. Acá el
 * teléfono y el correo son enlaces reales que funcionan sin backend, y los dos botones
 * llevan a los dos caminos que sí están conectados.
 *
 * TODO(equipo): el copy de esta página lo escribí yo en la voz del sitio y no viene de un
 * documento aprobado, a diferencia del resto. Conviene que alguien lo lea antes de
 * publicar.
 */
export const Route = createFileRoute("/contacto")({
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/contacto",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [breadcrumbJsonLd([{ name: "Contacto", path: "/contacto" }])],
      },
    }),
  component: Page,
});

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function Page() {
  const hayContacto = CONTACT.phone || CONTACT.email || CONTACT.linkedin;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu planta"
        lead="Si querés ver la plataforma funcionando, lo más rápido es agendar veinte minutos: te la mostramos con datos de una planta parecida a la tuya. Y si preferís escribir primero, acá están el teléfono y el correo."
      />

      {hayContacto && (
        <section className={`bg-surface ${SECTION}`}>
          <div className={CONTAINER}>
            <h2 className={H2}>Por dónde escribirnos</h2>
            <ul className="mt-10 grid gap-8 min-[720px]:grid-cols-3">
              {CONTACT.phone && (
                <ContactCard
                  name="phone"
                  label="Teléfono"
                  value={CONTACT.phone}
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                />
              )}
              {CONTACT.email && (
                <ContactCard
                  name="email"
                  label="Correo"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                />
              )}
              {/* Se renderiza en cuanto CONTACT.linkedin deje de ser null. */}
              {CONTACT.linkedin && (
                <ContactCard
                  name="linkedin"
                  label="LinkedIn"
                  value="Nuestra página"
                  href={CONTACT.linkedin}
                  external
                />
              )}
            </ul>
          </div>
        </section>
      )}

      {OFFICES.length > 0 && (
        <section className={`bg-surface-sunken ${SECTION}`}>
          <div className={CONTAINER}>
            <h2 className={H2}>Dónde estamos</h2>
            <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
              Dos oficinas en Buenos Aires. La instalación en planta la hacemos nosotros, así que a
              tu fábrica vamos, esté donde esté.
            </p>

            {/* Direcciones, no enlaces a un mapa: sin la ubicación exacta confirmada, un
                enlace armado con la dirección puede caer en la cuadra de al lado. */}
            <address className="mt-10 grid gap-8 not-italic min-[720px]:grid-cols-2">
              {OFFICES.map((o) => (
                <div key={o.postalCode} className="flex min-w-0 gap-3">
                  <Icon name="map-pin" size="empty" className="mt-1 text-brand" />
                  <p className="min-w-0 text-[15px] leading-[var(--leading-normal)] text-ink">
                    {officeLine(o)}
                  </p>
                </div>
              ))}
            </address>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function ContactCard({
  name,
  label,
  value,
  href,
  external = false,
}: {
  /** Concepto del léxico de iconos, no el componente del glifo. */
  name: IconConcept;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li className="min-w-0">
      <p className="eyebrow">{label}</p>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-3 inline-flex min-h-11 items-center gap-2.5 text-[17px] text-brand hover:underline hover:underline-offset-4"
      >
        <Icon name={name} size="empty" />
        <span className="min-w-0 break-words">{value}</span>
      </a>
    </li>
  );
}
