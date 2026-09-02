import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { RoiOutcome } from "@/lib/roi";
import { pushEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

/**
 * Lo único del ROI que pide datos (§7.7).
 *
 * El resultado se ve completo sin registrarse. Este formulario pide email a cambio del
 * informe en PDF —proyección a tres años, supuestos, comparación de escenarios— y va
 * **debajo del resultado, nunca encima**. Ningún velo sobre el número.
 *
 * Cuatro campos y ni uno más. El selector de país que tenía la versión anterior se fue:
 * era un quinto control y, además, listaba los países con banderas emoji.
 */

const schema = z.object({
  nombre: z.string().trim().min(3, "Poné al menos 3 caracteres").max(100),
  email: z.string().trim().email("Revisá el correo").max(255),
  telefono: z
    .string()
    .trim()
    .regex(/^[0-9+\s()-]{6,25}$/, "Revisá el teléfono"),
  empresa: z.string().trim().min(2, "Poné el nombre de la empresa").max(120),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "error";

export function LeadForm({ module, outcome }: { module: string; outcome: RoiOutcome }) {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    try {
      // TODO(equipo): sin CRM definido el lead termina acá. Es bloqueante: hoy alguien
      // deja sus datos y no llega a ninguna parte (§15.8).
      // Sin los datos de la persona. Lo que se carga en un formulario —nombre, empresa,
      // mail y teléfono— no va a la consola del navegador: lo lee cualquier extensión
      // instalada y lo levanta cualquier herramienta de grabación de sesión. Queda el
      // rastro de que el envío ocurrió, que es lo único que sirve para depurar sin
      // destino configurado.
      console.info("Lead de informe de ROI enviado", { module });

      pushEvent("roi_report_download", {
        module,
        roi_pct: Math.round(outcome.roiPct),
        payback_months: outcome.paybackMonths,
        is_consultant: false,
      });
      setSent(true);
    } catch {
      // El mensaje aparece sin perder lo escrito: el formulario no se resetea.
      setStatus("error");
    }
  };

  // Éxito: se reemplaza el formulario por la confirmación en la misma card, sin navegar.
  if (sent) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-line bg-surface-sunken p-8">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--status-ok)]">
            <Icon name="included" className="text-white" />
          </span>
          <div>
            <p className="text-lg font-semibold text-ink">Listo, te lo mandamos por correo.</p>
            <p className="mt-2 max-w-[52ch] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              El informe llega en los próximos minutos con los parámetros que cargaste, la
              proyección a tres años y los supuestos de cada cuenta.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-line p-8">
      <h3 className="text-[length:var(--text-card)] leading-snug text-ink">Llevate el informe</h3>
      <p className="mt-2 max-w-[70ch] text-[13px] leading-[var(--leading-normal)] text-ink-secondary">
        El PDF trae la proyección a tres años, los supuestos con los que se hizo la cuenta, la
        comparación de escenarios y el siguiente paso. Sirve para presentarlo internamente.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6" noValidate>
        <div className="grid gap-4 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-4">
          <Field label="Nombre y apellido" error={errors.nombre?.message}>
            <input {...register("nombre")} autoComplete="name" className={INPUT} />
          </Field>
          <Field label="Empresa" error={errors.empresa?.message}>
            <input {...register("empresa")} autoComplete="organization" className={INPUT} />
          </Field>
          <Field label="Correo" error={errors.email?.message}>
            <input {...register("email")} type="email" autoComplete="email" className={INPUT} />
          </Field>
          <Field label="Teléfono" error={errors.telefono?.message}>
            <input {...register("telefono")} type="tel" autoComplete="tel" className={INPUT} />
          </Field>
        </div>

        {status === "error" && (
          <p className="mt-4 text-[13px] text-[var(--status-stop)]">
            No pudimos enviarlo. Probá de nuevo en un momento; no perdiste lo que escribiste.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "mt-6 h-[52px] rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white",
            "transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px",
            "disabled:bg-[var(--action-disabled-bg)] disabled:text-[var(--action-disabled-text)]",
          )}
        >
          {isSubmitting ? "Enviando…" : "Descargar el informe"}
        </button>
      </form>
    </div>
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
