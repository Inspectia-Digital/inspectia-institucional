import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { DEMO_URL } from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { CONTACT_EMAIL, mailField, openMailDraft } from "@/lib/mailto";
import { breadcrumbJsonLd, faqJsonLd, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

const TITLE = "Programa para consultores industriales · InspectIA";
const DESCRIPTION =
  "Si asesorás fábricas o centros de distribución, InspectIA OS es la parte de tu recomendación que se ejecuta. Nosotros implementamos, vos acompañás.";

/**
 * Programa para consultores (§7.8). Una página: sin portal, sin login y sin directorio.
 *
 * Un consultor con cartera industrial multiplica alcance sin costo de venta, y llega con
 * confianza ya construida. Una postulación vale más que un lead.
 *
 * **Un solo botón primario en toda la página**, no el par: quien llega acá no viene a
 * crear una cuenta ni a agendar una demo comercial, viene a evaluar una alianza.
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
];

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
            href="#postularme"
            className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-white px-8 text-[15px] font-semibold text-brand-deep transition-colors duration-[160ms] hover:bg-teal-050 active:translate-y-px"
          >
            Postularme al programa
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
            <h2 className={H2}>Qué esperamos de vos</h2>
            <p className="mt-6 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              El programa es abierto pero no es automático: preferimos pocos consultores que
              entiendan el producto antes que muchos que lo nombren.
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

      <section className={`bg-surface-sunken ${SECTION}`} id="postularme">
        <div className="mx-auto max-w-[50rem]">
          <h2 className={H2}>Postularme al programa</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Cuatro datos y te escribimos nosotros. Si tenés cartera industrial, la conversación es
            corta.
          </p>
          <ApplicationForm />
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
            Charlemos y vemos si encaja
          </h2>
          <p className="mt-5 max-w-[var(--lead-max)] text-on-brand-secondary">
            Media hora para entender qué clientes tenés y qué módulos les servirían. Si no tiene
            sentido, te lo decimos ahí.
          </p>
          <p className="mt-9 flex flex-wrap items-center justify-center gap-6">
            <a
              href="#postularme"
              className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-white px-8 text-[15px] font-semibold text-brand-deep transition-colors duration-[160ms] hover:bg-teal-050 active:translate-y-px"
            >
              Postularme al programa
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

/* ---------- Formulario de postulación ---------- */

const schema = z.object({
  nombre: z.string().trim().min(3, "Poné al menos 3 caracteres").max(120),
  especialidad: z.string().trim().min(2, "Contanos en qué te especializás").max(120),
  email: z.string().trim().email("Revisá el correo").max(255),
  telefono: z
    .string()
    .trim()
    .regex(/^[0-9+\s()-]{6,25}$/, "Revisá el teléfono"),
});

type FormData = z.infer<typeof schema>;

/** Cuatro campos y nada más (§11.12). Ningún formulario del sitio supera los cuatro. */
function ApplicationForm() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setFailed(false);
    try {
      // Por el correo del visitante hasta que haya CRM. El porqué, en lib/mailto.
      const abrio = openMailDraft("Postulación al programa de partners", [
        mailField("Nombre o razón social", data.nombre),
        mailField("Especialidad", data.especialidad),
        mailField("Mail", data.email),
        mailField("Teléfono", data.telefono),
      ]);
      if (!abrio) throw new Error("sin ventana");

      pushEvent("partner_apply", { specialty: data.especialidad, source_page: sourcePage() });
      setSent(true);
    } catch {
      setFailed(true);
    }
  };

  /* La confirmación reemplaza el formulario en la misma card, sin navegar.
     No dice "recibido": el correo se abrió y todavía falta enviarlo. */
  if (sent) {
    return (
      <div className="mt-10 rounded-[var(--radius-lg)] border border-line bg-surface p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--status-ok)]">
            <Icon name="included" className="text-white" />
          </span>
          <p className="max-w-[52ch] text-[15px] leading-[var(--leading-normal)] text-ink">
            Se abrió tu correo con la postulación escrita. Dale enviar y te escribimos para
            coordinar una charla. Si no se abrió, mandanos los mismos datos a{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-brand underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10" noValidate>
      <div className="grid gap-4 min-[720px]:grid-cols-2">
        <Field label="Nombre y apellido o razón social" error={errors.nombre?.message}>
          <input {...register("nombre")} autoComplete="name" className={INPUT} />
        </Field>
        <Field label="Especialidad" error={errors.especialidad?.message}>
          <input {...register("especialidad")} className={INPUT} />
        </Field>
        <Field label="Mail" error={errors.email?.message}>
          <input {...register("email")} type="email" autoComplete="email" className={INPUT} />
        </Field>
        <Field label="Teléfono" error={errors.telefono?.message}>
          <input {...register("telefono")} type="tel" autoComplete="tel" className={INPUT} />
        </Field>
      </div>

      {failed && (
        <p className="mt-4 text-[13px] text-[var(--status-stop)]">
          No pudimos abrir tu correo. Mandanos los datos a {CONTACT_EMAIL}; no perdiste lo que
          escribiste.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "mt-6 h-[52px] w-full rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white",
          "transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px",
          "disabled:bg-[var(--action-disabled-bg)] disabled:text-[var(--action-disabled-text)]",
        )}
      >
        {isSubmitting ? "Abriendo tu correo…" : "Postularme al programa"}
      </button>

      {/* TODO(equipo): el documento propone "Te contestamos en 48 horas hábiles", pero eso
          es un compromiso de tiempo que nadie confirmó. Hasta entonces, la versión que no
          promete un plazo. */}
      <p className="mt-4 text-[13px] text-ink-secondary">
        Te escribimos para coordinar una charla.
      </p>
    </form>
  );
}

// Sin placeholder como etiqueta: al escribir desaparece y el campo queda sin nombre.
const INPUT =
  "h-[52px] w-full rounded-[var(--radius-md)] border border-line-strong bg-surface px-3.5 text-[15px] text-ink outline-none focus:border-line-brand";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[13px] font-medium text-ink-secondary">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-[13px] text-[var(--status-stop)]">{error}</span>}
    </label>
  );
}
