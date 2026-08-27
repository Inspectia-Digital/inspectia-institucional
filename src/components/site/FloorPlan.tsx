import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PLANT_PLAN } from "@/content/assets";
import { PLOTTED_MODULES, type ModuleKey } from "@/content/modules";
import { pushEventOncePerSession } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Plano de planta interactivo (§11.3). Es el activo más distintivo del sitio.
 *
 * Sale del Hero, donde estaba mezclado con el titular y los CTA, y pasa a ser el bloque
 * 03 de la home. Se conserva lo que ya funcionaba —coordenadas en porcentaje, hover con
 * fijado por clic, colocación configurable del modal— y cambia la piel y el
 * comportamiento accesible.
 *
 * **La relación del marco es la del render (1920x1079, 16:9) y no la 40:21 del documento.**
 * Las coordenadas están calibradas contra el encuadre propio de la imagen; forzar otra
 * relación con object-cover recorta el dibujo y despega los ocho puntos de su lugar.
 *
 * Los puntos son HTML sobre la imagen, no están pintados en el render: por eso pueden
 * atenuarse, pulsar y responder al foco.
 */

/** El punto abre con 200ms de retardo para no disparar al pasar de largo, y cierra con
 *  300ms de gracia para poder cruzar el hueco entre el punto y el modal. */
const OPEN_DELAY = 200;
const CLOSE_DELAY = 300;

export function FloorPlan() {
  const [active, setActive] = useState<ModuleKey | null>(null);
  const [pinned, setPinned] = useState<ModuleKey | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = pinned ?? active;

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  useEffect(() => clearTimers, []);

  const show = useCallback((key: ModuleKey, immediate = false) => {
    clearTimers();
    const run = () => {
      setActive(key);
      // Una vez por módulo y por sesión: el hover dispara solo, y sin esto un visitante
      // que pasa el mouse por el plano manda veinte eventos del mismo módulo.
      pushEventOncePerSession("floorplan_module_open", { module: key }, key);
    };
    if (immediate) run();
    else openTimer.current = setTimeout(run, OPEN_DELAY);
  }, []);

  const hide = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY);
  }, []);

  // Esc cierra el modal fijado, como cualquier superficie superpuesta del sitio.
  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPinned(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned]);

  return (
    <div>
      {/* En mobile el plano se arrastra en horizontal dentro de su contenedor. Nunca
          hace scrollear el documento. */}
      <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <div
          className="relative min-w-[40rem] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-sunken"
          style={{ aspectRatio: `${PLANT_PLAN.width} / ${PLANT_PLAN.height}` }}
        >
          <img
            src={PLANT_PLAN.src}
            srcSet={`${PLANT_PLAN.src960} 960w, ${PLANT_PLAN.src} 1920w`}
            sizes="(max-width: 1100px) 100vw, 1200px"
            width={PLANT_PLAN.width}
            height={PLANT_PLAN.height}
            alt={PLANT_PLAN.alt}
            /* Es el archivo más pesado del sitio y el bloque vive bajo el pliegue: no
               tiene por qué competir con el hero por el ancho de banda. */
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />

          {/* Capa de cierre cuando hay un modal fijado por clic. */}
          {pinned && (
            <button
              type="button"
              aria-label="Cerrar"
              className="absolute inset-0 z-10 cursor-default"
              onClick={() => setPinned(null)}
            />
          )}

          {PLOTTED_MODULES.map((m) => {
            const isOpen = open === m.key;
            // Con uno activo, los otros bajan a 55%: el que mira sabe dónde está parado.
            const dimmed = open !== null && !isOpen;

            return (
              <div
                key={m.key}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: m.hotspot.left, top: m.hotspot.top }}
                onMouseEnter={() => show(m.key)}
                onMouseLeave={hide}
              >
                <button
                  type="button"
                  aria-label={`${m.name}: ${m.promise}`}
                  aria-expanded={isOpen}
                  // El foco por teclado abre igual que el hover. Sin esto el plano existe
                  // sólo para quien usa mouse.
                  onFocus={() => show(m.key, true)}
                  onBlur={hide}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPinned(pinned === m.key ? null : m.key);
                  }}
                  className={cn(
                    "relative grid size-10 place-items-center rounded-full border",
                    "border-[var(--border-brand)] bg-[rgba(13,115,119,0.12)] backdrop-blur-[2px]",
                    "transition-opacity duration-200",
                    dimmed ? "opacity-55" : "opacity-100",
                  )}
                >
                  {/* Anillo de pulso sólo en el activo. */}
                  {isOpen && (
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full border border-[var(--border-brand)]"
                      style={{ animationDuration: "800ms" }}
                    />
                  )}
                  <m.icon className="size-5 text-brand" strokeWidth={1.5} aria-hidden />
                </button>

                {isOpen && (
                  <ModuleCard
                    module={m}
                    onMouseEnter={() => show(m.key, true)}
                    onMouseLeave={hide}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pista de arrastre, sólo donde el plano no entra entero. */}
      <p className="mt-3 text-center text-xs text-ink-muted md:hidden">
        Deslizá el plano para verlo completo, o tocá un punto.
      </p>
    </div>
  );
}

function ModuleCard({
  module: m,
  onMouseEnter,
  onMouseLeave,
}: {
  module: (typeof PLOTTED_MODULES)[number];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const { side, align } = m.hotspot;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute z-30 w-80 animate-rise-in rounded-[var(--radius-lg)] border border-line",
        "bg-surface p-5 text-left shadow-[var(--shadow-md)]",
        // Se coloca del lado con más espacio y nunca tapa su propio punto.
        side === "top" ? "bottom-full mb-3" : "top-full mt-3",
        align === "right" ? "right-0" : align === "left" ? "left-0" : "left-1/2 -translate-x-1/2",
      )}
    >
      <p className="text-lg font-semibold leading-snug text-ink">{m.name}</p>
      <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
        {m.summary}
      </p>
      <p className="mt-3 text-[13px] text-ink-muted">
        <span className="font-medium text-ink-secondary">Qué necesita:</span> {m.needs}
      </p>
      {/* Sin precio, sin estado y sin captura: la tarjeta orienta, la página vende. */}
      <Link
        to="/plataforma/$modulo"
        params={{ modulo: m.slug }}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
      >
        Ver el módulo
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
