import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { KITS } from "@/content/kit40";
import { MODULE_BY_KEY } from "@/content/modules";
import { SIGNUP_URL } from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { faqJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

/**
 * Kit 4.0.
 *
 * El relevamiento de competencia de octubre de 2026 no encontró un solo proveedor del
 * rubro con una página por kit: todos nombran el programa y dejan un formulario. Esta
 * página existe para contestar la pregunta que nadie contesta —"¿cuál me corresponde a
 * mí?"— y la tabla de abajo es la página entera: el problema en la voz del cliente, el
 * kit y el módulo que se implementa.
 *
 * Las reglas de redacción —"descuento" y nunca "cofinanciamiento", el "hasta" siempre
 * puesto, y ningún plazo del trámite— están en `content/kit40.ts`, con su motivo.
 */
const FAQ = [
  {
    q: "¿Quién puede pedir un Kit 4.0?",
    a: "Empresas registradas en el país que encaren un proyecto de tecnología para su planta. El que presenta el proyecto es el cliente, y nosotros entramos como proveedor habilitado: armamos el alcance, la cotización y la documentación técnica que el trámite pide.",
  },
  {
    q: "¿Qué cubre el descuento?",
    a: "El proyecto: software, hardware, integración e implementación, según lo que admita el kit que corresponda. El abono mensual del módulo no es parte del proyecto y se paga aparte, como cualquier suscripción.",
  },
  {
    q: "¿Tengo que esperar al trámite para empezar?",
    a: "No, y conviene no esperar. Podés arrancar hoy con el plan gratuito de una línea y llegar al proyecto con tus datos ya medidos, que es la mejor forma de definir el alcance: se sabe qué hace falta en lugar de estimarlo.",
  },
  {
    q: "¿Para cuáles kits son proveedores?",
    a: "Para todos los del programa. En esta página están los siete que corresponden a un módulo de InspectIA; los demás —gestión, comercio, administración— también los podemos presentar, aunque ahí el proyecto no sea nuestro producto.",
  },
];

export const Route = createFileRoute("/kit-4-0/")({
  head: () =>
    pageHead({
      // 47 caracteres antes del sufijo.
      title: siteTitle("Kit 4.0: hasta 50 % de descuento"),
      // 152 caracteres.
      description:
        "Somos proveedores habilitados de Kit 4.0. Te decimos qué kit le corresponde a tu problema de planta y armamos el proyecto, con hasta un 50 % de descuento.",
      path: "/kit-4-0",
      jsonLd: { "@context": "https://schema.org", "@graph": [faqJsonLd(FAQ)] },
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
        eyebrow="Kit 4.0"
        title="Hasta un 50 % de descuento en tu proyecto de planta"
        lead="Somos proveedores habilitados para todos los kits del programa. Te ayudamos a elegir el que corresponde a tu problema, armamos el proyecto y lo implementamos."
        cta={false}
      />

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Qué kit te corresponde</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Buscá el problema que más se parece al tuyo. Si ninguno encaja del todo, escribinos: el
            kit se elige por el proyecto, no al revés.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Problemas de planta y el kit del programa que les corresponde
              </caption>
              <thead>
                <tr className="border-b border-line-strong">
                  <th scope="col" className="pb-3 pr-6 text-[13px] font-medium text-ink-secondary">
                    Si tu problema es
                  </th>
                  <th scope="col" className="pb-3 pr-6 text-[13px] font-medium text-ink-secondary">
                    El kit
                  </th>
                  <th scope="col" className="pb-3 text-[13px] font-medium text-ink-secondary">
                    Lo implementamos con
                  </th>
                </tr>
              </thead>
              <tbody>
                {KITS.map((k) => (
                  <tr key={k.slug} className="border-b border-line align-top">
                    <th scope="row" className="py-4 pr-6 text-[15px] font-normal text-ink">
                      {k.problem}
                    </th>
                    <td className="py-4 pr-6">
                      <Link
                        to="/kit-4-0/$kit"
                        params={{ kit: k.slug }}
                        className="text-[15px] font-semibold text-brand hover:underline hover:underline-offset-4"
                      >
                        {k.code}
                      </Link>
                      <span className="mt-1 block text-[13px] text-ink-secondary">{k.name}</span>
                    </td>
                    <td className="py-4 text-[15px] text-ink-secondary">
                      <Link
                        to="/plataforma/$modulo"
                        params={{ modulo: k.module }}
                        className="hover:text-brand hover:underline hover:underline-offset-4"
                      >
                        {MODULE_BY_KEY.get(k.module)?.name ?? k.module}
                      </Link>
                      {k.needsAi && <span className="block text-[13px] text-ink-muted">+ IA</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Cómo se hace</h2>
          <ol className="mt-12 grid gap-8 min-[720px]:grid-cols-3">
            {[
              {
                n: "01",
                title: "Elegimos juntos el kit",
                body: "Partimos del problema que querés resolver y de lo que ya tenés instalado. De ahí sale cuál corresponde y qué alcance tiene el proyecto.",
              },
              {
                n: "02",
                title: "Presentás el proyecto con nosotros como proveedor",
                body: "Armamos la cotización y la documentación técnica que el trámite pide. El que presenta sos vos; nosotros ponemos la parte de proveedor.",
              },
              {
                n: "03",
                title: "Lo implementamos",
                body: "Relevamiento, instalación, puesta en marcha y capacitación del equipo de planta. Después queda el abono del módulo, como cualquier suscripción.",
              },
            ].map((s) => (
              <li key={s.n} className="min-w-0">
                <span className="metric text-sm font-semibold text-brand">{s.n}</span>
                <h3 className="mt-4 text-[length:var(--text-card)] leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Mientras sale el trámite</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Empezá gratis con una línea y llegá al proyecto con tus datos medidos. Es la diferencia
            entre definir el alcance con números propios y estimarlo.
          </p>
          <p className="mt-9">
            <a
              href={SIGNUP_URL}
              rel="nofollow"
              onClick={() =>
                pushEvent("signup_start", { source_page: sourcePage(), plan: "gratuito" })
              }
              className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px"
            >
              Empezar gratis
            </a>
          </p>

          {/* El "hasta" y el "al terminar" van en la letra chica y también arriba: el
              descuento no es un precio más bajo hoy, es un reintegro después. */}
          <p className="mt-8 max-w-[var(--read-max)] text-[13px] leading-[var(--leading-normal)] text-ink-muted">
            El descuento se aplica al terminar el proyecto. Los topes y las condiciones son los del
            programa vigente y dependen del kit.
          </p>
        </div>
      </section>

      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className="mx-auto max-w-[50rem]">
          <h2 className={H2}>Preguntas sobre Kit 4.0</h2>
          <Accordion
            type="single"
            collapsible
            defaultValue="kit-0"
            className="mt-10 border-t border-line"
          >
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`kit-${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-left text-[17px] font-medium text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-10">
            <Link
              to="/ia"
              hash="diagnostico"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Pedí un diagnóstico
              <Icon name="arrow-right" />
            </Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
