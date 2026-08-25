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
import { PRICING_FAQ } from "@/content/pricing";
import { SHOW_PRICING } from "@/content/site";
import { faqJsonLd, pageHead } from "@/lib/seo";

const TITLE = "Precios de InspectIA · desde USD 35 por planta";
const DESCRIPTION =
  "TYMEO arranca gratis y para siempre. El plan con registro automatizado cuesta USD 35 por planta y mes, con add-ons a USD 10.";

/**
 * Precios (§7.6).
 *
 * La página está construida y **fuera del aire**: con el precio de un solo módulo
 * publicado, la promesa de transparencia se rompe sola. SHOW_PRICING la saca del menú,
 * del sitemap y de la navegación; acá devuelve 404 para que tampoco quede accesible por
 * URL directa ni indexable.
 *
 * Se enciende cambiando una constante, el día que estén los ocho precios.
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
      jsonLd: faqJsonLd(PRICING_FAQ),
    }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Precios"
        title="Lo que cuesta, sin pedir una cotización"
        lead="TYMEO arranca gratis y para siempre. Cuando quieras automatizar la captura del dato, el plan con hardware cuesta USD 35 por planta y mes."
        cta={false}
      />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <PlansGrid />

          <p className="mt-10 max-w-[60ch] text-[13px] leading-[var(--leading-normal)] text-ink-muted">
            El precio es del software. Instalar sensores, PLC o terminales en la planta es un paso
            aparte: lo podés resolver con tu equipo siguiendo nuestra guía, o contratarlo con
            nosotros y se cotiza según lo que la planta necesite.
          </p>

          {/* TODO(equipo): faltan dos bloques de §7.6.
              1. La tabla con el criterio de precio de los siete módulos que no son TYMEO:
                 qué lo define —líneas, posiciones, cámaras, plantas—, el rango si se puede
                 publicar y qué incluye la puesta en marcha.
              2. La comparación de costo total contra la alternativa —integrador llave en
                 mano con licencia perpetua—, más qué pasa si dejás de pagar y de quién es
                 el hardware. Es el argumento más fuerte que hay y no está en ninguna parte
                 del sitio. */}
        </div>
      </section>

      <section className="bg-surface-sunken px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[50rem]">
          <p className="eyebrow">Antes de contratar</p>
          <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Preguntas de facturación
          </h2>

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
