import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { PriceGrid, PriceGridCta } from "@/components/site/PriceGrid";
import { PlanTiers } from "@/components/site/PlanTiers";
import {
  COST_COMPARISON,
  MODULE_PRICES,
  PRICING_FAQ,
  PRICING_NOTE,
  QUOTED_ITEMS,
} from "@/content/pricing";
import { SHOW_PRICING, SITE_URL } from "@/content/site";
import { faqJsonLd, pageHead } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

// 45 caracteres.
const TITLE = "Precios por módulo y plan gratuito · InspectIA";
// 154 caracteres.
const DESCRIPTION =
  "El precio de cada módulo, publicado, con su plan gratuito al lado. Conectar tus máquinas no sube de plan y los usuarios son ilimitados. Empezá gratis.";

/**
 * Precios.
 *
 * **Es la página que más define el posicionamiento** (doc 06 §1), porque es la prueba de
 * que esto se compra sin proyecto. Estuvo fuera del aire todo el tiempo que hubo un solo
 * módulo con precio: un visitante que entra a "Precios" y encuentra una tarifa y siete
 * "consultar" concluye que la transparencia era del título. Con la grilla completa del
 * catálogo de septiembre de 2026, el motivo desapareció y `SHOW_PRICING` pasó a true.
 *
 * El `beforeLoad` se conserva igual: si alguien vuelve a apagar la constante, la página
 * deja de ser accesible por URL directa y deja de ser indexable, no sólo desaparece del
 * menú.
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
            name: "InspectIA",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: `${SITE_URL}/plataforma`,
            offers: MODULE_PRICES.map((p) => ({
              "@type": "Offer",
              name: p.name,
              price: String(p.usd),
              priceCurrency: "USD",
              // La unidad de cobro es parte de la oferta: sin esto, "100" se lee como el
              // precio del módulo entero y no como el precio por línea o por planta.
              description: `Por ${p.unit} y por mes`,
            })),
          },
          faqJsonLd(PRICING_FAQ),
        ],
      },
    }),
  component: Page,
});

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1000px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Precios"
        title="El precio está publicado, módulo por módulo"
        lead="No hace falta pedir una cotización para saber si esto entra en tu presupuesto. Cada módulo tiene su precio, su plan gratuito y la opción de armarlo a medida; los usuarios son ilimitados y conectar las máquinas que ya tenés no te sube de plan."
        cta={false}
      />

      {/* Los tres planes antes de la grilla de módulos.

          La página explicaba el precio por módulo y dejaba el tercer plan sin nombre: lo
          que hoy es "A medida" vivía más abajo como "Lo que se cotiza", que se leía como
          una lista de extras y no como una forma de contratar. Mientras tanto la página de
          cada módulo ya mostraba tres planes, así que las dos se contradecían.

          Va arriba porque es el modelo comercial —cómo se contrata— y la grilla de abajo
          es el detalle —cuánto sale cada pieza—. */}
      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Tres maneras de contratarlo</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Las tres dan el producto completo. Lo que cambia es el volumen que entra y, en la
            tercera, todo lo que se arma alrededor.
          </p>

          <PlanTiers subject="la plataforma" className="mt-12" />
        </div>
      </section>

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Qué cuesta cada módulo</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Se suman de a uno, cuando el dato del anterior lo justifica. No hay paquete mínimo ni
            módulo obligatorio.
          </p>

          <div className="mt-12">
            <PriceGrid />
          </div>

          {/* Texto acordado con comercial, no copy de la web: cada línea responde una
              objeción que aparece mirando la tabla. No se reescribe por estilo. */}
          <ul className="mt-8 max-w-[var(--read-max)] space-y-2.5">
            {PRICING_NOTE.map((line) => (
              <li key={line} className="text-[13px] leading-[var(--leading-normal)] text-ink-muted">
                {line}
              </li>
            ))}
          </ul>

          <PriceGridCta />
        </div>
      </section>

      <Quoted />
      <CostComparison />

      <section className={`bg-surface ${SECTION}`}>
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
 * Lo que no tiene precio de lista.
 *
 * Va **debajo** de la grilla y no al lado: arriba compite con el precio publicado, que es
 * el argumento de la página. Sin cifras y sin "desde" (doc 06 §5).
 */
function Quoted() {
  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <h2 className={`max-w-[24ch] ${H2}`}>Qué incluye el plan a medida</h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Tres cosas quedan fuera del precio de lista, y las tres son opcionales: el producto
          funciona sin ninguna, cargando a mano. Cuando hacen falta, se cotizan juntas.
        </p>

        <ul className="mt-12 grid gap-8 min-[1000px]:grid-cols-3">
          {QUOTED_ITEMS.map((item) => (
            <li key={item.title} className="min-w-0">
              <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        {/* El gancho de Kit 4.0 va acá y el tope del combo queda en la nota al pie: dos
            "50 %" compitiendo en la misma pantalla se anulan. */}
        <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] leading-[var(--leading-normal)] text-ink">
          <span className="max-w-[48ch]">
            Somos proveedores de Kit 4.0: tu proyecto puede tener hasta un 50 % de descuento.
          </span>
          <Link
            to="/kit-4-0"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver qué kit te corresponde
            <Icon name="arrow-right" />
          </Link>
        </p>

        <p className="mt-4">
          <Link
            to="/ia"
            hash="diagnostico"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border border-line-brand bg-action-soft px-8 text-[15px] font-semibold text-action-soft-text transition-colors duration-[160ms] hover:bg-teal-100 active:translate-y-px"
          >
            Pedí un diagnóstico
          </Link>
        </p>
      </div>
    </section>
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

        <div className="mt-12 hidden min-[1000px]:block">
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

        <div className="mt-12 space-y-6 min-[1000px]:hidden">
          {columns.map((c, col) => (
            <div key={c} className="min-w-0 border-t border-line pt-5">
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
