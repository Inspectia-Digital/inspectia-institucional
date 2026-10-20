import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field } from "@/components/site/FormField";
import { submitLead, type LeadResult } from "@/lib/submit-lead";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/mailto";
import { CAMPO, PROVINCIAS } from "@/content/campo";

/**
 * El formulario de contacto de InspectIA Campo.
 *
 * Pide lo que el plan §3 fija y nada más: nombre, campo o empresa, provincia, tipo y
 * teléfono. Cinco campos. Un formulario largo en una página de menos de 200 palabras
 * contradice la página entera.
 *
 * **El plan dice HubSpot con origen `web-campo`; el repo manda por Brevo con respaldo a
 * `mailto:`.** Se usa lo que existe (`submitLead`) en vez de construir una integración que
 * hoy no está: el lead llega igual y el día que haya CRM se cambia en `lib/lead-intake.ts`
 * sin tocar este componente. Queda anotado como diferencia con el plan.
 *
 * El correo se pide aunque el plan liste teléfono: es a dónde vuelve la respuesta cuando
 * el envío cae al respaldo de `mailto:`, y sin él un lead del respaldo no se puede
 * contestar.
 */

const schema = z.object({
  nombre: z.string().trim().min(3, "Poné al menos 3 caracteres").max(100),
  campo: z.string().trim().min(2, "Poné el nombre del campo o de la empresa").max(120),
  provincia: z.string().trim().min(2, "Elegí una provincia"),
  tipo: z.string().trim().min(2, "Elegí el tipo de campo"),
  telefono: z
    .string()
    .trim()
    .regex(/^[0-9+\s()-]{6,25}$/, "Revisá el teléfono"),
});

type FormData = z.infer<typeof schema>;

const INPUT =
  "h-11 w-full rounded-[var(--radius-md)] border border-line bg-surface px-3 text-[15px] text-ink";

export function CampoForm() {
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
        form: "campo",
        nombre: data.nombre,
        contexto: data.campo,
        telefono: data.telefono,
        detalle: [`Provincia: ${data.provincia}`, `Tipo de campo: ${data.tipo}`],
      });
      setVia(salida);
      pushEvent("campo_lead", {
        source_page: sourcePage(),
        tipo: data.tipo,
        provincia: data.provincia,
      });
    } catch {
      setFallo(true);
    }
  };

  /* La confirmación tiene dos versiones y no dice "listo" cuando el envío todavía depende
     de que la persona mande el correo: es el mismo criterio del resto de los formularios
     del sitio. */
  if (via) {
    return (
      <div className="border-t-2 border-line-brand pt-6">
        <p className="text-[length:var(--text-lead)] leading-snug text-ink">
          {via === "enviado" ? "Recibimos tu mensaje." : "Te abrimos el correo para enviarlo."}
        </p>
        <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
          {via === "enviado"
            ? "Te escribimos dentro de las próximas 24 horas hábiles."
            : `Si no se abrió, escribinos a ${CONTACT_EMAIL} y te contestamos igual.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 min-[1000px]:grid-cols-2">
        <Field label="Nombre y apellido" error={errors.nombre?.message}>
          <input {...register("nombre")} autoComplete="name" className={INPUT} />
        </Field>
        <Field label="Campo o empresa" error={errors.campo?.message}>
          <input {...register("campo")} autoComplete="organization" className={INPUT} />
        </Field>
        <Field label="Provincia" error={errors.provincia?.message}>
          <select {...register("provincia")} className={INPUT} defaultValue="">
            <option value="" disabled>
              Elegí una
            </option>
            {PROVINCIAS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tipo de campo" error={errors.tipo?.message}>
          <select {...register("tipo")} className={INPUT} defaultValue="">
            <option value="" disabled>
              Elegí uno
            </option>
            {CAMPO.hero.perfiles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
            <option value="Mixto">Mixto</option>
          </select>
        </Field>
        {/* El teléfono ocupa las dos columnas, como en el boceto. */}
        <div className="min-[640px]:col-span-2">
          <Field label="Teléfono" error={errors.telefono?.message}>
            <input {...register("telefono")} type="tel" autoComplete="tel" className={INPUT} />
          </Field>
        </div>
      </div>

      {fallo && (
        <p className="mt-4 text-[15px] text-ink">
          No pudimos enviarlo. Escribinos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-action px-7 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px disabled:opacity-60"
      >
        {isSubmitting ? "Enviando…" : "Pedí una demo"}
      </button>
    </form>
  );
}
