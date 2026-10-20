import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, INPUT, TEXTAREA } from "@/components/site/FormField";
import { Icon } from "@/components/icons/Icon";
import { INDUSTRIES } from "@/content/solutions";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/mailto";
import { submitLead, type LeadResult } from "@/lib/submit-lead";
import { cn } from "@/lib/utils";

/**
 * Pedido de diagnóstico de un proyecto de IA.
 *
 * **Es el único formulario del sitio que pide algo más que datos de contacto**, y es a
 * propósito: un proyecto de IA no se cotiza sin saber qué proceso hay que resolver, y
 * preguntarlo acá ahorra el primer intercambio entero. El campo del proceso es el único
 * obligatorio además de los de contacto.
 *
 * La industria va como lista y no como texto libre porque es lo que decide quién atiende
 * el pedido, y "alimentos" escrito de seis formas distintas no se puede enrutar.
 *
 * Usa la misma tubería que el resto: `submitLead` intenta el servidor —que manda por
 * Brevo— y cae al `mailto:` si no está configurado o si falla. Por eso la confirmación
 * tiene dos versiones y no dice "listo" cuando el envío todavía depende de la persona.
 *
 * **Hoy el lead llega como correo, no a un CRM.** Si eso cambia, cambia en
 * `lib/lead-intake.ts` y este componente no se entera.
 */

const OTRA = "Otra";

const schema = z.object({
  nombre: z.string().trim().min(3, "Poné al menos 3 caracteres").max(100),
  empresa: z.string().trim().min(2, "Poné el nombre de la empresa").max(120),
  industria: z.string().trim().min(2, "Elegí una industria"),
  proceso: z.string().trim().min(15, "Contanos en una o dos líneas qué querés resolver").max(600),
  email: z.string().trim().email("Revisá el correo").max(255),
  telefono: z
    .string()
    .trim()
    .regex(/^[0-9+\s()-]{6,25}$/, "Revisá el teléfono"),
});

type FormData = z.infer<typeof schema>;

export function DiagnosticForm() {
  const [via, setVia] = useState<LeadResult | null>(null);
  const [fallo, setFallo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setFallo(false);
    try {
      const salida = await submitLead({
        form: "diagnostico",
        nombre: data.nombre,
        contexto: data.empresa,
        email: data.email,
        telefono: data.telefono,
        detalle: [`Industria: ${data.industria}`, "", "Qué quiere resolver:", data.proceso],
      });
      setVia(salida);
      pushEvent("ia_diagnostic_request", {
        source_page: sourcePage(),
        industry: data.industria,
      });
    } catch {
      setFallo(true);
    }
  };

  if (via) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--status-ok)]">
            <Icon name="included" className="text-white" />
          </span>
          <div>
            <p className="text-lg font-semibold text-ink">
              {via === "enviado"
                ? "Listo, recibimos tu pedido."
                : "Se abrió tu correo con el pedido escrito."}
            </p>
            <p className="mt-2 max-w-[52ch] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              {via === "enviado" ? (
                <>
                  Te vamos a escribir para coordinar el diagnóstico. Si tenés fotos del proceso o
                  del producto, traelas: es lo que más acorta la primera conversación.
                </>
              ) : (
                <>
                  Dale enviar y te escribimos para coordinar el diagnóstico. Si no se abrió,
                  escribinos a{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold text-brand underline underline-offset-4"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 min-[1000px]:grid-cols-2">
          <Field label="Nombre y apellido" error={errors.nombre?.message}>
            <input {...register("nombre")} autoComplete="name" className={INPUT} />
          </Field>
          <Field label="Empresa" error={errors.empresa?.message}>
            <input {...register("empresa")} autoComplete="organization" className={INPUT} />
          </Field>
          <Field label="Industria" error={errors.industria?.message}>
            <select {...register("industria")} className={INPUT} defaultValue="">
              <option value="" disabled>
                Elegí una
              </option>
              {INDUSTRIES.map((i) => (
                <option key={i.slug} value={i.name}>
                  {i.name}
                </option>
              ))}
              <option value={OTRA}>{OTRA}</option>
            </select>
          </Field>
          <Field label="Teléfono" error={errors.telefono?.message}>
            <input {...register("telefono")} type="tel" autoComplete="tel" className={INPUT} />
          </Field>
          <Field label="Correo" error={errors.email?.message}>
            <input {...register("email")} type="email" autoComplete="email" className={INPUT} />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Qué proceso querés resolver" error={errors.proceso?.message}>
            <textarea
              {...register("proceso")}
              rows={4}
              className={TEXTAREA}
              placeholder="Qué pasa hoy, dónde pasa y cómo se dan cuenta cuando sale mal."
            />
          </Field>
        </div>

        {fallo && (
          <p className="mt-4 text-[13px] text-[var(--status-stop)]">
            No pudimos enviarlo. Escribinos a {CONTACT_EMAIL}; no perdiste lo que escribiste.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "mt-6 h-12 rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white",
            "transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px",
            "disabled:bg-[var(--action-disabled-bg)] disabled:text-[var(--action-disabled-text)]",
          )}
        >
          {isSubmitting ? "Enviando…" : "Pedir el diagnóstico"}
        </button>

        <p className="mt-4 text-[13px] leading-[var(--leading-normal)] text-ink-muted">
          El diagnóstico no tiene cargo. Si el problema no se puede medir, te lo decimos antes de
          cotizar nada.
        </p>
      </form>
    </div>
  );
}
