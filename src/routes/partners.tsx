import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { partnersByFamily } from "@/content/partners";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const TITLE = "Programa de partners para consultores · InspectIA";
const DESCRIPTION =
  "Si asesorás fábricas o centros de distribución, InspectIA OS es la parte de tu recomendación que se ejecuta. Vos diagnosticás; nosotros instalamos y sostenemos.";

/** Programa para consultores (§7.8). Una página, sin portal ni directorio en esta etapa. */
export const Route = createFileRoute("/partners")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/partners" }),
  component: Page,
});

const HOW = [
  {
    n: "01",
    title: "Te registrás y te capacitamos",
    body: "Una sesión para conocer los módulos, qué necesita cada uno y cómo se implementa.",
  },
  {
    n: "02",
    title: "Presentás la solución con el ROI a tu nombre",
    body: "Armás la propuesta con la calculadora, con los números de la planta de tu cliente.",
  },
  {
    n: "03",
    title: "Nosotros implementamos y vos acompañás",
    body: "La instalación, la conexión y el soporte corren por nuestra cuenta. La relación con el cliente sigue siendo tuya.",
  },
];

const GAINS = [
  "Comisión por proyecto cerrado",
  "Derivaciones: cuando un cliente nuestro necesita un consultor, te lo pasamos",
  "La calculadora de ROI y el kit comercial, a tu nombre",
  "Capacitación y certificación",
  "Acompañamiento en la primera reunión técnica",
];

const EXPECTED = [
  "Que conozcas la operación de tus clientes, no nuestro producto: eso lo enseñamos nosotros",
  "Que la primera propuesta la armemos juntos",
  "Que lo que se promete en la propuesta sea lo que el módulo hace",
];

function Page() {
  const partners = partnersByFamily("partner");

  return (
    <SiteLayout bottomCta={false}>
      <PageHero
        eyebrow="Programa para consultores"
        title="Vos conocés la planta. Nosotros ponemos la plataforma."
        lead="Si asesorás a fábricas o centros de distribución, InspectIA OS es la parte de tu recomendación que se ejecuta. Vos diagnosticás y acompañás; nosotros instalamos, conectamos y sostenemos el servicio. Y cuando un cliente nuestro necesita un consultor, te lo derivamos."
        cta={false}
      />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Cómo funciona</p>
          <ol className="mt-10 grid gap-8 min-[720px]:grid-cols-3">
            {HOW.map((s) => (
              <li key={s.n} className="min-w-0">
                <span className="metric text-sm font-semibold text-brand">{s.n}</span>
                <h2 className="mt-4 text-[length:var(--text-card)] leading-snug text-ink">
                  {s.title}
                </h2>
                <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface-sunken px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto grid max-w-[var(--content-max)] gap-12 min-[900px]:grid-cols-2">
          <div className="min-w-0">
            <p className="eyebrow">Qué ganás</p>
            <ul className="mt-6 space-y-3">
              {GAINS.map((g) => (
                <li key={g} className="flex gap-3 text-[15px] leading-snug text-ink">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-[var(--status-ok)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="min-w-0">{g}</span>
                </li>
              ))}
            </ul>
            {/* TODO(equipo): el porcentaje de comisión, si hay exclusividad territorial y
                si la certificación tiene niveles. Sin eso la lista describe el programa
                pero no lo cierra (§15.5). */}
            <p className="mt-6 max-w-[52ch] text-[13px] text-ink-muted">
              Las condiciones concretas —comisión y alcance— las conversamos en la primera reunión,
              según el tipo de proyecto.
            </p>
          </div>

          <div className="min-w-0">
            <p className="eyebrow">Qué esperamos</p>
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

            {partners.length > 0 && (
              <div className="mt-10 border-t border-line pt-8">
                <p className="eyebrow">Quiénes ya están</p>
                <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-5">
                  {partners.map((p) => (
                    <li key={p.slug} className="min-w-0">
                      <img
                        src={p.logo}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="h-8 w-auto opacity-60 grayscale"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[50rem]">
          <p className="eyebrow">Postulate</p>
          <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Cuatro datos y te escribimos.
          </h2>
          <ApplicationForm />
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

/**
 * Cuatro campos y nada más (§11.12): nombre y apellido o razón social, especialidad, mail
 * y teléfono. Ningún formulario del sitio supera los cuatro.
 */
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
      // TODO(equipo): sin CRM definido la postulación termina acá (§15.8).
      console.info("Postulación de partner", data);
      pushEvent("partner_apply", {
        specialty: data.especialidad,
        source_page: sourcePage(),
      });
      setSent(true);
    } catch {
      setFailed(true);
    }
  };

  // La confirmación reemplaza el formulario en la misma card, sin navegar.
  if (sent) {
    return (
      <div className="mt-10 rounded-[var(--radius-lg)] border border-line bg-surface-sunken p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--status-ok)]">
            <Check className="size-4 text-white" strokeWidth={2.5} aria-hidden />
          </span>
          <div>
            <p className="text-lg font-semibold text-ink">Recibido.</p>
            <p className="mt-2 max-w-[52ch] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              Te escribimos en los próximos días hábiles para coordinar la primera conversación.
            </p>
          </div>
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
        <Field label="Correo" error={errors.email?.message}>
          <input {...register("email")} type="email" autoComplete="email" className={INPUT} />
        </Field>
        <Field label="Teléfono" error={errors.telefono?.message}>
          <input {...register("telefono")} type="tel" autoComplete="tel" className={INPUT} />
        </Field>
      </div>

      {failed && (
        <p className="mt-4 text-[13px] text-[var(--status-stop)]">
          No pudimos enviarlo. Probá de nuevo; no perdiste lo que escribiste.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "mt-6 h-[52px] w-full rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white",
          "transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px",
          "disabled:bg-[var(--action-disabled-bg)] disabled:text-[var(--action-disabled-text)]",
          "min-[720px]:w-auto",
        )}
      >
        {isSubmitting ? "Enviando…" : "Postularme al programa"}
      </button>

      <p className="mt-4 text-[13px] text-ink-secondary">
        Te escribimos en los próximos días hábiles. No hay formulario largo después: la siguiente
        conversación es una llamada.
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
