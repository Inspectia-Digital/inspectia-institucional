import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { PlansGrid } from "@/components/site/PlansGrid";
import {
  ADDON_PRICE_USD,
  COST_COMPARISON,
  MODULE_PRICING_BASIS,
  PRICING_FAQ,
  TYMEO_PLANS,
} from "@/content/pricing";
import { MODULE_BY_KEY, type ModuleKey } from "@/content/modules";
import { SHOW_PRICING, SITE_URL } from "@/content/site";
import { faqJsonLd, pageHead } from "@/lib/seo";

const TITLE = "Precios de InspectIA: planes desde USD 0 · InspectIA";
const DESCRIPTION =
  "TYMEO arranca gratis y el plan con registro automatizado cuesta USD 35 por planta y mes, con usuarios ilimitados. Sin licencia perpetua ni cargo por puesto.";

/**
 * Precios (§7.6).
 *
 * La página está construida y **fuera del aire**. El motivo no es que falte diseño: es que
 * publicar el precio de un módulo de ocho rompe la promesa de la página. Un visitante que
 * entra a "Precios" y encuentra la tarifa de TYMEO y siete "consultar" concluye que la
 * transparencia era del título.
 *
 * SHOW_PRICING la saca del menú y del sitemap; acá devuelve 404 para que tampoco quede
 * accesible por URL directa ni indexable. Se enciende cambiando una constante.
 *
 * Es la única página del sitio donde `SoftwareApplication` corresponde, porque es la única
 * con precio: declararlo en la home o en /plataforma sin `offers` no aporta nada.
 */
export const Route = createFileRoute("/precios")({
  beforeLoad: () => {
    if (!SHOW_PRICING) throw notFound();
  },
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/precios",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            name: "TYMEO",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: `${SITE_URL}/plataforma/tymeo`,
            offers: TYMEO_PLANS.filter((p) => typeof p.base === "number").map((p) => ({
              "@type": "Offer",
              name: p.name,
              price: String(p.base),
              priceCurrency: "USD",
            })),
          },
          faqJsonLd(PRICING_FAQ),
        ],
      },
    }),
  component: Page,
});

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Precios"
        title="Empezá gratis y pagá por planta, no por persona"
        lead="Los precios están publicados porque no queremos que pidas una cotización para saber si esto entra en tu presupuesto. TYMEO arranca en cero y sin tarjeta; los planes con registro automatizado se pagan por planta y por mes, con usuarios ilimitados."
        cta={false}
      />

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          {/* Deja claro que la grilla es de un módulo y no de la plataforma entera, que
              es la confusión que esta página puede generar. */}
          <h2 className={`max-w-[24ch] ${H2}`}>TYMEO: medición de producción</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Estos son los planes del módulo de OEE y tiempos, que es el que casi todas las plantas
            usan primero.
          </p>

          <div className="mt-12">
            <PlansGrid />
          </div>

          <p className="mt-8 max-w-[60ch] text-[13px] leading-[var(--leading-normal)] text-ink-muted">
            Cada add-on suma USD {ADDON_PRICE_USD} por mes. En Pro vienen incluidos.
          </p>
          <p className="mt-3 max-w-[60ch] text-[13px] leading-[var(--leading-normal)] text-ink-muted">
            El precio es del software. Instalar sensores, PLC o terminales en la planta es un paso
            aparte: lo podés resolver con tu equipo siguiendo nuestra guía, o contratarlo con
            nosotros y se cotiza según lo que la planta necesite.
          </p>
        </div>
      </section>

      {/* Sin esta sección la página promete transparencia y la rompe en el segundo scroll. */}
      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Los otros módulos</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Cada uno se cotiza según el alcance, porque lo que define el precio cambia de módulo a
            módulo. Esto es lo que se mide en cada caso.
          </p>

          <div className="mt-12 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="pb-3 pr-6 text-[13px] font-medium text-ink-secondary">
                    Módulo
                  </th>
                  <th scope="col" className="pb-3 text-[13px] font-medium text-ink-secondary">
                    Qué define el precio
                  </th>
                </tr>
              </thead>
              <tbody>
                {MODULE_PRICING_BASIS.map((row) => (
                  <tr key={row.module} className="border-b border-line">
                    <th
                      scope="row"
                      className="py-4 pr-6 align-top text-[15px] font-medium text-ink"
                    >
                      {MODULE_BY_KEY.get(row.module as ModuleKey)?.name ?? row.module}
                    </th>
                    <td className="py-4 text-[15px] text-ink-secondary">{row.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TODO(comercial): validar los siete criterios, y agregar la columna de qué
              incluye la puesta en marcha, que hoy no está definida. */}
        </div>
      </section>

      <CostComparison />

      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className="mx-auto max-w-[50rem]">
          <p className="eyebrow">Antes de contratar</p>
          <h2 className={`mt-4 ${H2}`}>Preguntas de facturación</h2>

          <Accordion
            type="single"
            collapsible
            defaultValue="pricing-0"
            className="mt-10 border-t border-line"
          >
            {PRICING_FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`pricing-${i}`} className="border-line">
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
    </SiteLayout>
  );
}

/**
 * Contra la alternativa.
 *
 * En desktop es una tabla de tres columnas. En mobile se convierte en un bloque por
 * alternativa: la tabla de tres columnas en 375px no se lee ni con scroll horizontal.
 */
function CostComparison() {
  const { columns, rows } = COST_COMPARISON;

  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <h2 className={`max-w-[20ch] ${H2}`}>Contra la alternativa</h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Las dos formas habituales de resolver esto en una planta son un proyecto llave en mano con
          un integrador, o una licencia perpetua de software industrial. Estas son las diferencias
          que importan cuando se compara el costo de tres años y no el precio de la primera factura.
        </p>

        <div className="mt-12 hidden min-[900px]:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th
                  scope="col"
                  className="w-64 pb-3 pr-6 text-[13px] font-medium text-ink-secondary"
                >
                  {" "}
                </th>
                {columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`pb-3 pr-6 text-[15px] font-semibold ${i === 0 ? "text-brand" : "text-ink-secondary"}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-line align-top">
                  <th scope="row" className="py-4 pr-6 text-[15px] font-medium text-ink">
                    {r.label}
                  </th>
                  {r.values.map((v, i) => (
                    <td
                      key={v}
                      className={`py-4 pr-6 text-[15px] ${i === 0 ? "text-ink" : "text-ink-secondary"}`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 space-y-6 min-[900px]:hidden">
          {columns.map((c, col) => (
            <div key={c} className="min-w-0 rounded-[var(--radius-lg)] border border-line p-6">
              <h3
                className={`text-[length:var(--text-card)] leading-snug ${col === 0 ? "text-brand" : "text-ink"}`}
              >
                {c}
              </h3>
              <dl className="mt-4 space-y-3">
                {rows.map((r) => (
                  <div key={r.label} className="min-w-0">
                    <dt className="text-[13px] text-ink-secondary">{r.label}</dt>
                    <dd className="mt-0.5 text-[15px] text-ink">{r.values[col]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
