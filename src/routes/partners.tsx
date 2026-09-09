import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { DEMO_URL, PARTNER_SIGNUP_URL } from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { breadcrumbJsonLd, faqJsonLd, pageHead } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

const TITLE = "Programa para consultores industriales · InspectIA";
const DESCRIPTION =
  "Si asesorás fábricas o centros de distribución, InspectIA OS es la parte de tu recomendación que se ejecuta. Nosotros implementamos, vos acompañás.";

/**
 * Programa para consultores (§7.8). Una página: sin portal, sin login y sin directorio.
 *
 * Un consultor con cartera industrial multiplica alcance sin costo de venta, y llega con
 * confianza ya construida.
 *
 * **El programa es de alta libre**, decidido el 8 de septiembre de 2026: el que quiere
 * entra y se da de alta. Hasta entonces la página pedía una postulación de cuatro campos
 * y el equipo contestaba, y ese formulario se sacó entero —prometer "te escribimos
 * nosotros" al lado de un botón que crea la cuenta es contradecirse en la misma pantalla—.
 * Si el modelo vuelve a cambiar, esto cambia primero.
 *
 * **Un solo botón primario en toda la página**, no el par: quien llega acá no viene a
 * elegir entre dos caminos, viene a entender el programa y entrar. Agendar demo queda
 * como enlace de texto, para el que prefiere charlar antes.
 */
export const Route = createFileRoute("/partners")({
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/partners",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [breadcrumbJsonLd([{ name: "Partners", path: "/partners" }]), faqJsonLd(FAQ)],
      },
    }),
  component: Page,
});

const PAIN = [
  {
    title: "Recomendás y no podés ejecutar",
    body: "Detectás dónde se pierde eficiencia, pero implementar la solución requiere hardware, software y presencia en planta que tu estudio no ofrece.",
  },
  {
    title: "No tenés con qué mostrar el número",
    body: "La mejora se argumenta en el informe y el cliente pide el retorno. Armar ese cálculo a mano lleva días y queda en una planilla.",
  },
  {
    title: "Y cuando se ejecuta, no participás",
    body: "El proveedor entra, implementa y se queda con la relación. Tu trabajo quedó en el diagnóstico.",
  },
];

const HOW = [
  {
    n: "01",
    title: "Te registrás y te capacitamos",
    body: "Una capacitación sobre los ocho módulos: qué resuelve cada uno, qué necesita y en qué caso conviene. Sin costo y sin exclusividad.",
  },
  {
    n: "02",
    title: "Presentás la propuesta con los números",
    body: "Usás la calculadora de ROI en modo consultor: sumás los módulos que apliquen, editás los supuestos con los datos reales de tu cliente y exportás el informe con tu logo. La propuesta se arma en una reunión, no en una semana.",
  },
  {
    n: "03",
    title: "Nosotros implementamos, vos acompañás",
    body: "Relevamiento, instalación, conexión y soporte los hacemos nosotros. Vos seguís siendo el asesor del cliente, que es donde está tu valor.",
  },
];

// TODO(equipo): la línea de comisión no se puede publicar sin el porcentaje definido, ni
// como "comisión por proyecto cerrado" a secas: un consultor lee eso y asume un número
// que después no coincide. Quedan cuatro beneficios hasta que el equipo decida si el
// porcentaje se publica o si se acuerda al ingresar.
const GAINS = [
  "Derivaciones: cuando un cliente nuestro pide un consultor, te lo pasamos.",
  "La calculadora de ROI en modo consultor, con tu logo en el informe.",
  "Capacitación en los ocho módulos y en cómo se presentan.",
  "Acompañamiento en la primera reunión técnica, si querés que estemos.",
];

const EXPECTED = [
  "Cartera industrial real: plantas o centros de distribución, no intención de conseguirlos.",
  "Presencia en la reunión con el cliente. La plataforma se explica mejor con alguien que conoce la planta.",
  "Criterio para no vender lo que no aplica. Si un módulo no le sirve a ese cliente, preferimos que lo digas.",
];

// TODO(equipo): la pregunta sobre exclusividad territorial está sacada a propósito. Afirmar
// que no hay exclusividad es una decisión comercial con consecuencias —un consultor que
// trae un cliente grande va a preguntar— y no está confirmada. Con la confirmación se
// agrega y quedan cinco.
const FAQ = [
  {
    q: "¿Tengo que vender yo el software?",
    a: "No. Vos detectás la necesidad y presentás la solución como parte de tu recomendación; la venta, la implementación y el soporte los hacemos nosotros. Si preferís llevar la relación comercial vos, también se puede: se acuerda al ingresar.",
  },
  {
    q: "¿Qué pasa si mi cliente ya es cliente de InspectIA?",
    a: "Te lo decimos de entrada, antes de que armes una propuesta. Y si nos llega un cliente que necesita un consultor en tu industria, te lo derivamos.",
  },
  {
    q: "¿Necesito conocimientos técnicos de visión artificial o de IoT?",
    a: "No. Lo que hace falta es entender el proceso de tu cliente y saber qué módulo aplica. La parte técnica la resolvemos nosotros en el relevamiento.",
  },
  {
    q: "¿Tiene costo entrar al programa?",
    a: "No. La capacitación y el acceso a la calculadora en modo consultor no se cobran.",
  },
  {
    q: "¿Hay que postularse y esperar aprobación?",
    a: "No. Creás la cuenta, elegís «consultor» en la primera pantalla y ya estás adentro, con la capacitación y la calculadora en modo consultor disponibles. No hay formulario, no hay evaluación y no hay espera.",
  },
];

/* Los tres botones que abren el alta de partner comparten el mismo evento. Antes la
   página emitía `partner_apply` desde el formulario de postulación; con el formulario
   fuera, el camino de partners quedó sin medición y la conversión del canal iba a
   quedarse en cero sin que nadie lo notara. */
const medirAlta = () => pushEvent("partner_signup_start", { source_page: sourcePage() });

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function Page() {
  return (
    <SiteLayout bottomCta={false}>
      <PageHero
        eyebrow="Programa para consultores"
        title="Vos conocés la planta. Nosotros ponemos la plataforma."
        lead="Si asesorás a fábricas o a centros de distribución, InspectIA OS es la parte de tu recomendación que se ejecuta. Vos diagnosticás y acompañás; nosotros instalamos, conectamos y sostenemos el servicio. Y cuando un cliente nuestro necesita un consultor, te lo derivamos."
        cta={false}
      >
        <p className="mt-9">
          <a
            href={PARTNER_SIGNUP_URL}
            rel="nofollow"
            onClick={medirAlta}
            className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-white px-8 text-[15px] font-semibold text-brand-deep transition-colors duration-[160ms] hover:bg-teal-050 active:translate-y-px"
          >
            Crear mi cuenta de partner
          </a>
        </p>
      </PageHero>

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>El informe termina y el proyecto no arranca</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Es lo que pasa casi siempre: el diagnóstico está bien hecho, la planta está de acuerdo,
            y después hay que conseguir proveedores, coordinar la instalación y sostener el
            servicio. Ahí el proyecto se cae o se estira un año.
          </p>
          <ul className="mt-12 grid gap-8 min-[720px]:grid-cols-3">
            {PAIN.map((p) => (
              <li key={p.title} className="min-w-0">
                <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Tres pasos, y el segundo es el que cambia todo</h2>
          <ol className="mt-12 grid gap-8 min-[720px]:grid-cols-3">
            {HOW.map((s) => (
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
        <div className={`${CONTAINER} grid gap-12 min-[900px]:grid-cols-2`}>
          <div className="min-w-0">
            <h2 className={H2}>Qué te llevás</h2>
            <ul className="mt-8 space-y-3">
              {GAINS.map((g) => (
                <li key={g} className="flex gap-3 text-[15px] leading-snug text-ink">
                  <Icon name="included" className="mt-0.5 text-[var(--status-ok)]" />
                  <span className="min-w-0">{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h2 className={H2}>Con qué funciona mejor</h2>
            <p className="mt-6 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              Entrar no tiene requisitos: creás la cuenta y ya está. Pero el programa rinde en un
              caso concreto, y decirlo de entrada evita que alguien pierda el tiempo.
            </p>
            <ul className="mt-6 space-y-3">
              {EXPECTED.map((e) => (
                <li
                  key={e}
                  className="text-[15px] leading-[var(--leading-normal)] text-ink-secondary"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TODO(equipo): "Quiénes ya están" no se renderiza. Miebach, Auren y Antea Group
          figuran como candidatos y no como partners confirmados, y publicar el nombre de
          una consultora sin su acuerdo es un problema legal antes que comercial. */}

      {/* Antes acá vivía un formulario de postulación de cuatro campos: se dejaban los
          datos y el equipo contestaba. El programa dejó de funcionar así —quien quiere
          entra y se da de alta— y un formulario que promete "te escribimos nosotros"
          contradice de frente el botón de arriba. Se fue entero; el alta es el camino. */}
      <section className={`bg-surface-sunken ${SECTION}`} id="empezar">
        <div className="mx-auto max-w-[50rem]">
          <h2 className={H2}>Cómo se entra</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Creás la cuenta y elegís «consultor» en la primera pantalla. No hay postulación, no hay
            aprobación y no hay costo: desde ahí ya tenés la capacitación y la calculadora en modo
            consultor.
          </p>
          <p className="mt-9">
            <a
              href={PARTNER_SIGNUP_URL}
              rel="nofollow"
              onClick={medirAlta}
              className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px"
            >
              Crear mi cuenta de partner
            </a>
          </p>
        </div>
      </section>

      <section className={`bg-surface ${SECTION}`}>
        <div className="mx-auto max-w-[50rem]">
          <h2 className={H2}>Preguntas sobre el programa</h2>
          <Accordion
            type="single"
            collapsible
            defaultValue="partner-faq-0"
            className="mt-10 border-t border-line"
          >
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`partner-faq-${i}`} className="border-line">
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

      {/* Cierre propio: esta página le habla a otra audiencia que el resto del sitio. */}
      <section className="bg-brand-deep px-5 py-24 md:px-8">
        <div className="mx-auto flex max-w-[var(--content-max)] flex-col items-center text-center">
          <h2 className="max-w-[18ch] text-[28px] leading-tight text-on-brand md:text-[var(--text-section)]">
            Empezá hoy y miralo por dentro
          </h2>
          <p className="mt-5 max-w-[var(--lead-max)] text-on-brand-secondary">
            La cuenta se crea en un minuto y no tiene costo. Si preferís entender el producto antes,
            agendá media hora y lo vemos con los clientes que tengas en mente.
          </p>
          <p className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <a
              href={PARTNER_SIGNUP_URL}
              rel="nofollow"
              onClick={medirAlta}
              className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-white px-8 text-[15px] font-semibold text-brand-deep transition-colors duration-[160ms] hover:bg-teal-050 active:translate-y-px"
            >
              Crear mi cuenta de partner
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[15px] text-on-brand-secondary underline-offset-4 transition-colors duration-[160ms] hover:text-on-brand hover:underline"
            >
              Agendar demo
            </a>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
