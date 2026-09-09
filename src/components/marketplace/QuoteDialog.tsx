import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, INPUT, TEXTAREA } from "@/components/site/FormField";
import { Icon } from "@/components/icons/Icon";
import { pushEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/mailto";
import { submitLead, type LeadResult } from "@/lib/submit-lead";
import { cn } from "@/lib/utils";

/**
 * Pedido de cotización de una categoría del marketplace.
 *
 * **Un formulario y no un `mailto:`.** El enlace de correo llega igual, pero deja el
 * pedido a merced de que la persona tenga cliente de correo configurado y de que después
 * apriete enviar; y del lado nuestro llega lo que haya escrito, sin forma. Con el
 * formulario el dato sale por Brevo desde el servidor, llega estructurado y la
 * confirmación es real.
 *
 * **Un diálogo y no una página aparte.** Son seis categorías: mandar a un formulario
 * propio por cada una obliga a seis rutas, o a una ruta con la categoría en la URL y un
 * ida y vuelta que pierde el contexto de la grilla. Acá la categoría ya está elegida y
 * viaja sola.
 *
 * El respaldo por `mailto:` sigue existiendo por debajo, en `submitLead`: si Brevo no está
 * configurado, o falla, se abre el correo con todo escrito. Por eso la confirmación tiene
 * dos versiones y no dice "listo" cuando el envío todavía depende de la persona.
 */

const schema = z.object({
  nombre: z.string().trim().min(3, "Poné al menos 3 caracteres").max(100),
  empresa: z.string().trim().min(2, "Poné el nombre de la empresa").max(120),
  email: z.string().trim().email("Revisá el correo").max(255),
  telefono: z
    .string()
    .trim()
    .regex(/^[0-9+\s()-]{6,25}$/, "Revisá el teléfono"),
  // Opcional a propósito: la categoría ya dice de qué se trata, y un campo obligatorio más
  // es una razón más para abandonar. Quien tenga algo puntual que decir lo escribe.
  necesidad: z.string().trim().max(600).optional(),
});

type FormData = z.infer<typeof schema>;

export function QuoteDialog({ category, categoryKey }: { category: string; categoryKey: string }) {
  const [open, setOpen] = useState(false);
  const [via, setVia] = useState<LeadResult | null>(null);
  const [fallo, setFallo] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  /* Al cerrar se limpia todo. Sin esto, quien pide una cotización de sensores y después
     abre la de ERP se encuentra la confirmación anterior en pantalla, sobre otra
     categoría. */
  const cambiar = (abierto: boolean) => {
    setOpen(abierto);
    if (!abierto) {
      setVia(null);
      setFallo(false);
      reset();
    }
  };

  const onSubmit = async (data: FormData) => {
    setFallo(false);
    try {
      const salida = await submitLead({
        form: "cotizacion",
        nombre: data.nombre,
        contexto: data.empresa,
        email: data.email,
        telefono: data.telefono,
        detalle: [
          `Categoría: ${category}`,
          ...(data.necesidad ? ["", "Qué necesita:", data.necesidad] : []),
        ],
      });
      setVia(salida);

      /* El evento se dispara acá y no al abrir el diálogo, que es donde estaba cuando
         esto era un enlace. Un clic en "pedir cotización" es intención; un envío completo
         es un lead, que es lo que el nombre del evento dice que mide. */
      pushEvent("marketplace_lead", {
        service: category,
        category: categoryKey,
        direction: "demanda",
      });
    } catch {
      // El mensaje aparece sin perder lo escrito: el formulario no se resetea.
      setFallo(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={cambiar}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          Pedir una cotización
          <Icon name="arrow-right" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="text-[length:var(--text-card)] leading-snug text-ink">
            Pedir una cotización
          </DialogTitle>
          {/* La categoría va en la descripción del diálogo y no en un campo: ya está
              elegida, y mostrarla como un selector invitaría a cambiarla justo cuando la
              persona acaba de decidirla. */}
          <DialogDescription className="text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            {category}
          </DialogDescription>
        </DialogHeader>

        {via ? (
          /* Dos confirmaciones, y la diferencia importa. Por el servidor el pedido ya
             llegó y "listo" es cierto; por el `mailto:` de respaldo el correo quedó
             abierto y todavía falta que la persona lo mande. La dirección va escrita en el
             segundo caso porque hay máquinas sin cliente de correo, donde no se abre nada
             y sin la dirección la persona queda sin salida. */
          <div className="flex items-start gap-3 pt-2">
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--status-ok)]">
              <Icon name="included" className="text-white" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-ink">
                {via === "enviado"
                  ? "Listo, recibimos tu pedido."
                  : "Se abrió tu correo con el pedido escrito."}
              </p>
              <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {via === "enviado" ? (
                  <>Te contestamos con el presupuesto y con qué proveedor lo resuelve.</>
                ) : (
                  <>
                    Dale enviar y te contestamos con el presupuesto. Si no se abrió, escribinos a{" "}
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
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="pt-2" noValidate>
            <div className="grid gap-4 min-[520px]:grid-cols-2">
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

            <div className="mt-4">
              <Field label="Qué necesitás (opcional)" error={errors.necesidad?.message}>
                <textarea
                  {...register("necesidad")}
                  rows={3}
                  className={TEXTAREA}
                  placeholder="Cuántas líneas, qué planta, para cuándo."
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
                "mt-6 h-[52px] w-full rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white",
                "transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px",
                "disabled:bg-[var(--action-disabled-bg)] disabled:text-[var(--action-disabled-text)]",
              )}
            >
              {isSubmitting ? "Enviando…" : "Pedir la cotización"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
