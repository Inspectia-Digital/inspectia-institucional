import { cn } from "@/lib/utils";
import { DEMO_URL, SIGNUP_URL } from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";

/**
 * Los dos botones primarios del sitio, juntos y del mismo peso.
 *
 * La regla vieja decía "un solo botón primario por sección". Se reemplaza: son dos —
 * empezar gratis y agendar demo— porque una demo agendada y una cuenta creada son la
 * misma conversión vista desde dos tipos de comprador. **Nunca un tercero**: si aparece
 * un tercer botón en una sección, algo hay que sacar (§10.5, §11 regla 1).
 *
 * Que la regla viva acá y no en la cabeza de quien escribe la próxima sección es lo que
 * evita que vuelva a haber tres. Todo lo demás de la página es enlace de texto.
 *
 * El más lleno va primero. Los dos miden lo mismo de alto y de ancho: la diferencia se
 * resuelve con el relleno, no con la jerarquía.
 */

type Surface = "white" | "brand";
type Size = "default" | "bar" | "mobile";

type CtaPairProps = {
  /** Sobre qué fondo se apoya. Cambia el relleno de los dos, no cuál es cuál. */
  surface?: Surface;
  size?: Size;
  /** El copy nombra el resultado que el visitante busca, no la mecánica. */
  signupLabel?: string;
  demoLabel?: string;
  /** Contexto para la medición. */
  module?: string;
  industry?: string;
  audience?: string;
  plan?: string;
  className?: string;
};

const HEIGHT: Record<Size, string> = {
  default: "h-[52px]",
  bar: "h-10",
  mobile: "h-12",
};

// Sin transición de opacidad: el hover cambia el color, no el alfa. Un fundido de
// opacidad sobre teal deja ver el fondo y ensucia el borde.
const SHARED =
  "inline-flex flex-1 items-center justify-center rounded-[var(--radius-md)] px-6 " +
  "text-[15px] font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform] duration-[160ms] " +
  "ease-[var(--ease-out)] active:translate-y-px";

const FILLED: Record<Surface, string> = {
  white: "bg-action text-white hover:bg-action-hover active:bg-action-active",
  brand: "bg-white text-brand-deep hover:bg-teal-050 active:bg-teal-100",
};

const SOFT: Record<Surface, string> = {
  white:
    "bg-action-soft text-action-soft-text border border-line-brand hover:bg-teal-100 active:bg-teal-200",
  // Sobre teal los dos nunca van blancos: se leerían como un solo bloque partido.
  brand: "bg-white/12 text-white border border-white/42 hover:bg-white/20 active:bg-white/28",
};

export function CtaPair({
  surface = "white",
  size = "default",
  signupLabel = "Empezar gratis",
  demoLabel = "Agendar demo",
  module,
  industry,
  audience,
  plan,
  className,
}: CtaPairProps) {
  const height = HEIGHT[size];

  return (
    <div
      className={cn(
        // Se apilan a ancho completo en mobile; en el resto van lado a lado y del mismo ancho.
        "flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3",
        className,
      )}
    >
      <a
        href={SIGNUP_URL}
        className={cn(SHARED, height, FILLED[surface])}
        onClick={() => pushEvent("signup_start", { source_page: sourcePage(), module, plan })}
      >
        {signupLabel}
      </a>

      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(SHARED, height, SOFT[surface])}
        onClick={() =>
          pushEvent("demo_scheduled_click", {
            source_page: sourcePage(),
            module,
            industry,
            audience,
          })
        }
      >
        {demoLabel}
      </a>
    </div>
  );
}
