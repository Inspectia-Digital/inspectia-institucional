import { useMemo, useState, type ReactNode } from "react";
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
 * Los dos lados del marketplace, en un solo diálogo.
 *
 * **Un formulario y no un `mailto:` ni la agenda.** El enlace de correo llega igual, pero
 * deja el pedido a merced de que la persona tenga cliente de correo configurado y de que
 * después apriete enviar; y del lado nuestro llega lo que haya escrito, sin forma. El
 * calendario es peor todavía para estas dos intenciones: quien quiere una cotización de
 * sensores ya sabe qué necesita y busca un precio, y quien quiere ofrecer un servicio
 * quiere contar qué hace —ninguno de los dos quiere dar media hora todavía—.
 *
 * **Un diálogo y no páginas aparte.** Son seis categorías más la captación de proveedores:
 * un formulario propio por cada una obliga a siete rutas, o a una ruta con la categoría en
 * la URL y un ida y vuelta que pierde el contexto de la grilla.
 *
 * **El disparador lo pone quien llama.** Del lado de la demanda es un enlace de texto al
 * pie de una tarjeta y del lado de la oferta un botón de 52px en su propia banda: son
 * distintos a propósito, y meter las dos variantes acá adentro sería un `if` de estilo
 * escondido en un componente de formulario.
 *
 * El respaldo por `mailto:` sigue existiendo por debajo, en `submitLead`: si Brevo no está
 * configurado, o falla, se abre el correo con todo escrito. Por eso la confirmación tiene
 * dos versiones y no dice "listo" cuando el envío todavía depende de la persona.
 */

/** Qué lado del marketplace habla. Decide los textos, el asunto y el evento. */
export type Direccion = "demanda" | "oferta";

/* Los textos de cada lado, juntos y no repartidos en condicionales por el JSX: así se leen
 * de corrido y se ve que el par está completo. */
const TEXTOS = {
  demanda: {
    titulo: "Pedir una cotización",
    envio: "Pedir la cotización",
    campo: "Qué necesitás (opcional)",
    pista: "Cuántas líneas, qué planta, para cuándo.",
    // La categoría ya dice de qué se trata; un campo obligatorio más es una razón más para
    // abandonar. Quien tenga algo puntual que decir lo escribe.
    obligatorio: false,
    etiquetaDetalle: "Qué necesita",
    okServidor: "Te contestamos con el presupuesto y con qué proveedor lo resuelve.",
    okCorreo: "Dale enviar y te contestamos con el presupuesto.",
  },
  oferta: {
    titulo: "Ofrecer mi servicio",
    envio: "Enviar",
    campo: "Qué ofrecés",
    pista: "Qué vendés o implementás, en qué zona y con qué tipo de planta trabajás.",
    // Acá sí es obligatorio: un alta de proveedor sin decir qué ofrece no se puede
    // responder, y contestar "¿qué hacen ustedes?" es perder el primer intercambio.
    obligatorio: true,
    etiquetaDetalle: "Qué ofrece",
    okServidor: "Te contestamos para ver cómo entrás al marketplace.",
    okCorreo: "Dale enviar y te contestamos para ver cómo entrás al marketplace.",
  },
} as const satisfies Record<Direccion, unknown>;

const FORM = { demanda: "cotizacion", oferta: "proveedor" } as const;

function esquemaDe(obligatorio: boolean) {
  return z.object({
    nombre: z.string().trim().min(3, "Poné al menos 3 caracteres").max(100),
    empresa: z.string().trim().min(2, "Poné el nombre de la empresa").max(120),
    email: z.string().trim().email("Revisá el correo").max(255),
    telefono: z
      .string()
      .trim()
      .regex(/^[0-9+\s()-]{6,25}$/, "Revisá el teléfono"),
    texto: obligatorio
      ? z.string().trim().min(10, "Contanos en una línea qué ofrecés").max(600)
      : z.string().trim().max(600).optional(),
  });
}

type FormData = z.infer<ReturnType<typeof esquemaDe>>;

type Props = {
  direccion: Direccion;
  /** Sólo del lado de la demanda: qué categoría se está cotizando. */
  categoria?: { nombre: string; key: string };
  /** Bajada del diálogo. Del lado de la demanda es el nombre de la categoría. */
  descripcion: string;
  /** El disparador, que lo arma quien llama. */
  children: ReactNode;
};

export function MarketplaceDialog({ direccion, categoria, descripcion, children }: Props) {
  const t = TEXTOS[direccion];
  const [open, setOpen] = useState(false);
  const [via, setVia] = useState<LeadResult | null>(null);
  const [fallo, setFallo] = useState(false);

  const resolver = useMemo(() => zodResolver(esquemaDe(t.obligatorio)), [t.obligatorio]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver });

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
        form: FORM[direccion],
        nombre: data.nombre,
        contexto: data.empresa,
        email: data.email,
        telefono: data.telefono,
        detalle: [
          ...(categoria ? [`Categoría: ${categoria.nombre}`] : []),
          ...(data.texto ? ["", `${t.etiquetaDetalle}:`, data.texto] : []),
        ],
      });
      setVia(salida);

      /* El evento se dispara acá y no al abrir el diálogo, que es donde estaba cuando
         esto era un enlace. Un clic es intención; un envío completo es un lead, que es lo
         que el nombre del evento dice que mide. */
      pushEvent("marketplace_lead", {
        service: categoria?.nombre ?? "alta de proveedor",
        category: categoria?.key ?? "oferta",
        direction: direccion,
      });
    } catch {
      // El mensaje aparece sin perder lo escrito: el formulario no se resetea.
      setFallo(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={cambiar}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="text-[length:var(--text-card)] leading-snug text-ink">
            {t.titulo}
          </DialogTitle>
          {/* Del lado de la demanda acá va la categoría, y no como un selector: ya está
              elegida, y mostrarla editable invitaría a cambiarla justo cuando la persona
              acaba de decidirla. */}
          <DialogDescription className="text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            {descripcion}
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
                  ? "Listo, recibimos tu mensaje."
                  : "Se abrió tu correo con el mensaje escrito."}
              </p>
              <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {via === "enviado" ? (
                  t.okServidor
                ) : (
                  <>
                    {t.okCorreo} Si no se abrió, escribinos a{" "}
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
              <Field label={t.campo} error={errors.texto?.message}>
                <textarea
                  {...register("texto")}
                  rows={3}
                  className={TEXTAREA}
                  placeholder={t.pista}
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
              {isSubmitting ? "Enviando…" : t.envio}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
