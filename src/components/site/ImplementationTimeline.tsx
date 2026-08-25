import { cn } from "@/lib/utils";

/**
 * Timeline de implementación (§11.8). Seis etapas, 5 a 15 días en total.
 *
 * Es nuevo: `tymeo/Implementation.tsx` no era esto —era un bloque de dos tarjetas sobre
 * quién instala el hardware— y sigue existiendo para lo suyo.
 *
 * Arriba de este bloque va el plan gratuito, que no tiene implementación: se usa el mismo
 * día. El proyecto de instalación entra recién cuando querés automatizar la captura.
 */

type Stage = {
  n: string;
  title: string;
  duration: string;
  /** La única etapa que no se puede prometer. Va en ámbar y dice "Variable" en serio. */
  variable?: boolean;
  deliverables: string[];
};

const STAGES: Stage[] = [
  {
    n: "01",
    title: "Kickoff",
    duration: "1 día · 1 reunión",
    deliverables: [
      "Relevamiento de la planta",
      "Definición de líneas y alcance del piloto",
      "Roles y responsables",
    ],
  },
  {
    n: "02",
    title: "Configuración base",
    duration: "1 día",
    deliverables: [
      "Estructura de planta, líneas y estaciones",
      "Turnos y reglas de asignación",
      "Productos, motivos de parada y personal",
      "Credenciales de dispositivos",
    ],
  },
  {
    n: "03",
    title: "Conectividad",
    duration: "Variable",
    variable: true,
    deliverables: [
      "Simple con terminales Android de mano",
      "Más tiempo si hay que instalar PLC o sensores",
      "InspectIA puede encargarse punta a punta",
    ],
  },
  {
    n: "04",
    title: "Plan piloto y validación",
    duration: "2 días",
    deliverables: [
      "Carga y activación del primer plan",
      "48 horas de producción real en ambiente de test",
      "Checklist de puesta en marcha",
    ],
  },
  {
    n: "05",
    title: "Puesta en producción",
    duration: "1 día",
    deliverables: [
      "Corte de test a producción",
      "Eventos reales apuntando a producción",
      "Validación final con el equipo del cliente",
    ],
  },
  {
    n: "06",
    title: "Soporte",
    duration: "Continuo",
    deliverables: [
      "Traspaso al uso diario",
      "Guía de resolución de problemas",
      "Soporte post implementación",
    ],
  },
];

export function ImplementationTimeline({
  /** La home lleva la versión corta —seis pasos, sin entregables— y la página de módulo
   *  la larga. */
  detailed = false,
}: {
  detailed?: boolean;
}) {
  return (
    <div>
      <p className="metric text-[32px] font-light leading-none text-ink">5–15 días</p>
      <p className="mt-2 text-xs uppercase tracking-[var(--tracking-caps)] text-ink-secondary">
        Tiempo total estimado
      </p>

      {/* Riel horizontal en desktop, vertical en mobile. Sin scroll horizontal. */}
      <ol
        className={cn(
          "relative mt-10 grid gap-8",
          "min-[1100px]:grid-cols-6 min-[1100px]:gap-6",
          // La línea de 1px a la altura del centro de los nodos. Sólo en el riel horizontal.
          "min-[1100px]:before:absolute min-[1100px]:before:left-4 min-[1100px]:before:right-4",
          "min-[1100px]:before:top-4 min-[1100px]:before:h-px min-[1100px]:before:bg-line-strong",
        )}
      >
        {STAGES.map((s, i) => (
          <li
            key={s.n}
            className="relative min-w-0 animate-rise-in pl-12 min-[1100px]:pl-0"
            // Escalonado de 60ms entre hermanos, izquierda a derecha, una sola vez.
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* En mobile el riel gira a vertical y la línea va a la izquierda. */}
            <span
              aria-hidden
              className={cn(
                "absolute left-[15px] top-8 h-[calc(100%+2rem)] w-px bg-line-strong min-[1100px]:hidden",
                i === STAGES.length - 1 && "hidden",
              )}
            />
            <span
              className={cn(
                "metric absolute left-0 top-0 grid size-8 place-items-center rounded-full",
                "border border-line-strong bg-surface text-xs font-semibold text-ink",
                "min-[1100px]:relative min-[1100px]:mb-4",
              )}
            >
              {s.n}
            </span>

            <p className="text-[15px] font-semibold leading-snug text-ink">{s.title}</p>
            <p
              className={cn(
                "metric mt-1 text-[13px]",
                s.variable ? "text-[var(--status-warn)]" : "text-brand",
              )}
            >
              {s.duration}
            </p>

            {detailed && (
              <ul className="mt-3 space-y-1.5">
                {s.deliverables.map((d) => (
                  <li key={d} className="text-[13px] leading-snug text-ink-secondary">
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
