import { Link } from "@tanstack/react-router";
import { MODULE_PRICES, type ModulePrice } from "@/content/pricing";
import { SIGNUP_URL } from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";

/**
 * La grilla de precios por módulo.
 *
 * Reemplaza a `PlansGrid`, que mostraba los cuatro planes de TYMEO —Free, Start, Pro,
 * Enterprise— con add-ons que se tildaban. Ese producto ya no existe: hoy el precio es por
 * módulo y por unidad de cobro, y el plan gratuito es un límite de cantidad dentro de cada
 * módulo.
 *
 * **Una tabla y no ocho cards.** Con cuatro planes la card servía para comparar
 * prestaciones; con ocho filas de dos columnas de dato, la card obliga a recorrer ocho
 * bloques para responder "cuánto sale medir dos líneas". La tabla se lee en diagonal, que
 * es como se lee un precio.
 *
 * **El plan gratuito va en la misma fila que el pago** (doc 06 §1.3), no en una sección
 * aparte: lo que convence no es que haya un plan gratis, es ver cuánto cubre al lado de
 * cuánto cuesta el pago.
 */
export function PriceGrid() {
  return (
    // Ancho mínimo y scroll propio: en un celular la tabla no se puede comprimir sin que
    // las cifras se partan, y una página que scrollea en horizontal entera es peor.
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">
          Precio mensual y plan gratuito de cada módulo de InspectIA
        </caption>
        <thead>
          <tr className="border-b border-line-strong">
            <Th>Módulo</Th>
            <Th align="right">Precio</Th>
            <Th>Se cobra por</Th>
            <Th>Gratis para siempre</Th>
          </tr>
        </thead>
        <tbody>
          {MODULE_PRICES.map((p) => (
            <Row key={p.name} price={p} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "right" }) {
  return (
    <th
      scope="col"
      className={`pb-3 text-[13px] font-medium text-ink-secondary ${align === "right" ? "text-right" : ""}`}
    >
      {children}
    </th>
  );
}

function Row({ price }: { price: ModulePrice }) {
  return (
    <tr className="border-b border-line">
      <th scope="row" className="py-4 pr-4 align-top">
        {price.module ? (
          <Link
            to="/plataforma/$modulo"
            params={{ modulo: price.module }}
            className="text-[15px] font-semibold text-ink hover:text-brand hover:underline hover:underline-offset-4"
            onClick={() =>
              pushEvent("pricing_plan_click", {
                plan: price.name,
                addons_selected: [],
                price_shown: price.usd,
              })
            }
          >
            {price.name}
          </Link>
        ) : (
          // Sin página propia: se muestra igual, porque sacarlo de la grilla dejaría un
          // precio publicado del que el sitio no habla.
          <span className="text-[15px] font-semibold text-ink">{price.name}</span>
        )}
      </th>
      <td className="py-4 pr-4 text-right align-top">
        <span className="metric whitespace-nowrap text-[15px] font-semibold text-ink">
          USD {price.usd}
        </span>
      </td>
      <td className="py-4 pr-4 align-top text-[15px] text-ink-secondary">{price.unit}</td>
      <td className="py-4 align-top text-[15px] text-ink-secondary">
        {price.free ?? <span className="text-ink-muted">—</span>}
      </td>
    </tr>
  );
}

/**
 * La acción principal de la página de precios.
 *
 * "Empezar gratis", sin tarjeta y sin demo obligatoria (doc 06 §1.7). El contacto para
 * plantas grandes puede estar, nunca en lugar del precio.
 */
export function PriceGridCta() {
  return (
    <p className="mt-10">
      <a
        href={SIGNUP_URL}
        rel="nofollow"
        onClick={() => pushEvent("signup_start", { source_page: sourcePage(), plan: "gratuito" })}
        className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px"
      >
        Empezar gratis
      </a>
    </p>
  );
}
