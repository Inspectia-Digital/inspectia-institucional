import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MODULES, type PlatformModule } from "@/content/modules";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

/**
 * Grilla de cards de módulo (§11.4).
 *
 * Prohibido en esta card, y conviene que quede escrito: chip de estado, borde izquierdo
 * de color, teñir la tarjeta, precio, captura de producto y badge de "nuevo". La card
 * dice qué resuelve el módulo y enlaza. Nada más.
 *
 * Sin agrupar por industria: los ocho van en una lista plana, que es el punto de que el
 * visitante entienda que hay una plataforma.
 */
export function ModuleGrid({
  modules = MODULES,
  className,
}: {
  modules?: PlatformModule[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-6",
        // Colapsa a 2 en 1100 y a 1 en 720, como el resto de las grillas del sitio.
        "grid-cols-1 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-4",
        className,
      )}
    >
      {modules.map((m) => (
        <li key={m.key} className="min-w-0">
          <Link
            to="/plataforma/$modulo"
            params={{ modulo: m.slug }}
            // Toda la card es clickeable, no sólo el enlace del pie.
            className={cn(
              "group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6",
              "transition-[border-color,box-shadow] duration-[160ms] ease-[var(--ease-out)]",
              "hover:border-line-brand hover:shadow-[var(--shadow-sm)]",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="metric text-sm font-semibold text-brand">{m.number}</span>
              <Icon name={m.icon} size="empty" className="text-brand" />
            </div>

            <h3 className="mt-5 text-[length:var(--text-card)] leading-snug text-ink">{m.name}</h3>
            {/* Tope de dos líneas: la card lista, la página explica. */}
            <p className="mt-3 line-clamp-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              {m.promise}
            </p>

            {/* mt-auto lo ancla abajo, para que las cards de una fila terminen parejas. */}
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
              Ver el módulo
              <ArrowRight
                className="size-4 transition-transform duration-[160ms] group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
