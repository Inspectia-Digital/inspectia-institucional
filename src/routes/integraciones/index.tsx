import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import {
  ARROW_LINK_WRAP,
  Crumbs,
  Faq,
  RequestCta,
  SectionBlock,
  cols,
} from "@/components/site/featureSections";
import { IntegrationBlocks } from "@/components/site/integrationSections";
import { HUB, SYSTEMS } from "@/content/integrations";
import { SITE_URL } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

/**
 * El hub de integraciones: `/integraciones`.
 *
 * ## Por qué dejó de estar bajo `/plataforma`
 *
 * Estaba en `/plataforma/integraciones` y era una página sola con cuatro grupos de
 * nombres. Ahora es la cabeza de una sección con seis páginas, y la URL corta es la que
 * corresponde a una sección: `/integraciones/erp` y `/integraciones/odoo` no son partes de
 * la plataforma, son la respuesta a «¿se integra con lo que tengo?». La URL anterior sale
 * en 301 desde `http-policy.ts`, en un solo salto.
 *
 * ## Qué hace esta página y qué no
 *
 * Reparte. La intención específica —«odoo OEE», «iFIX OPC UA»— vive en la página de cada
 * sistema; acá se ancla la genérica por categoría («wms», «scada») y se muestra la lista
 * entera, que es la pregunta que trae el visitante técnico. Por eso el bloque de logos es
 * largo a propósito: la respuesta a «¿está el mío?» se contesta viéndolo.
 *
 * El hero es `PageHero` y no el hero de funcionalidad: no hay un panel de producto que
 * mostrar, y con `PageHero` la única superficie de teal profundo de la página es el hero.
 */
export const Route = createFileRoute("/integraciones/")({
  head: () =>
    pageHead({
      title: siteTitle(HUB.seoTitle),
      description: HUB.seoDescription,
      path: "/integraciones",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([{ name: "Integraciones", path: "/integraciones" }]),
          /* `SoftwareApplication` y no `Service`: lo que esta página describe es la
             plataforma vista desde su capacidad de conectarse, y `featureList` es donde
             entra la lista de vías de entrada y salida. */
          {
            "@type": "SoftwareApplication",
            name: "InspectIA",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Manufacturing Operations Management",
            operatingSystem: "Web",
            url: `${SITE_URL}/integraciones`,
            description: HUB.seoDescription,
            featureList: [
              "Integración con ERP por API, archivo o tabla intermedia",
              "Lectura de SCADA y PLC por OPC UA, Modbus TCP y MQTT, en sólo lectura",
              "Intercambio con WMS de centro de distribución",
              "Eventos de trazabilidad en el estándar GS1 EPCIS 2.0",
            ],
            provider: { "@type": "Organization", name: "InspectIA", url: SITE_URL },
          },
          /* La lista de sistemas, legible por una máquina.
             Cada sistema va con su nombre; `url` sólo donde hay página. Un `ListItem` con
             una URL inventada sería un enlace roto declarado en el dato estructurado, y un
             sistema omitido por no tener página dejaría la lista a 2 de 56 ítems — que es
             justamente la información que esta página aporta a un motor de respuesta. */
          {
            "@type": "ItemList",
            name: "Sistemas que se integran con InspectIA",
            numberOfItems: SYSTEMS.length,
            itemListElement: SYSTEMS.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              ...(s.page ? { url: `${SITE_URL}/integraciones/${s.page}` } : {}),
            })),
          },
          faqJsonLd(HUB.faq),
        ],
      },
    }),
  component: HubPage,
});

function HubPage() {
  return (
    <SiteLayout bottomCta={false}>
      <PageHero eyebrow={HUB.eyebrow} title={HUB.h1} lead={HUB.lead} cta={false} />

      <Crumbs trail={[{ label: "Inicio", to: "/" }]} name="Integraciones" />

      <IntegrationBlocks blocks={HUB.blocks} />

      <Faq title="Preguntas sobre las integraciones" items={HUB.faq} />

      <SectionBlock eyebrow="Seguir leyendo" title="Los módulos que reciben el dato">
        <ul className={cn("mt-12 grid gap-x-6 gap-y-9", cols(HUB.links.length))}>
          {HUB.links.map((l) => (
            <li key={l.to} className="min-w-0 border-t border-line pt-5">
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                className={cn(
                  ARROW_LINK_WRAP,
                  "text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)]",
                )}
              >
                {l.label} <Icon name="arrow-right" className="inline align-[-0.1em]" />
              </Link>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* Un solo CTA, y es una conversación: no hay nada que contratar en esta sección.
          «Empezar gratis» acá mandaría a crear una cuenta para después descubrir que la
          integración del sistema que tiene se cotiza. */}
      <section className="px-5 pb-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <div className="grid items-center gap-8 rounded-[14px] bg-brand-subtle px-8 py-12 md:px-12 md:py-14 min-[1000px]:grid-cols-2 min-[1000px]:gap-14">
            <h2 className="max-w-[24ch] text-[28px] leading-tight text-brand-deep md:text-[length:var(--text-section)]">
              {HUB.cta.title}
            </h2>
            <div className="min-w-0">
              <p className="text-base leading-[var(--leading-normal)] text-ink-secondary">
                La mayoría de las integraciones nuevas sale de un caso concreto. Contanos con qué
                sistema trabajás y con qué versión, y lo revisamos con ingeniería.
              </p>
              <RequestCta
                origin={HUB.cta.origin}
                label="Contanos qué sistema usás"
                className="mt-7"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
