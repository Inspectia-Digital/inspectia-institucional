import { MODULE_PRICES, type ModulePrice } from "@/content/pricing";

/**
 * Los tres planes, en la misma forma en la página de precios y en la de cada módulo.
 *
 * ## Por qué es un componente y no dos bloques parecidos
 *
 * Nació escrito a mano en la página de módulo y duplicado en /precios habría durado una
 * semana: la página de módulo ya decía tres planes mientras /precios seguía prometiendo
 * dos en su bajada. Dos lugares que describen el mismo modelo comercial se desincronizan
 * solos, y el precio es justo donde eso se nota.
 *
 * ## Por qué no hay grilla de tildes y cruces
 *
 * Porque los planes **no difieren en funcionalidad** — ver la cabecera de `PLAN_TIERS` en
 * `content/pricing.ts`. Una matriz de features tendría las mismas marcas en las tres
 * columnas, que no dice nada, o cruces que describen un producto que no existe y que el
 * visitante desmiente apenas crea la cuenta. Lo que cambia entre planes es la **cantidad
 * de la unidad de medida**, y eso es lo que dice cada columna.
 *
 * La frase de abajo no es un remate: sin ella, tres precios distintos se leen como tres
 * productos distintos.
 */

/** El plural de la unidad de cobro, para la frase de cierre. */
const plural = (unit: string) =>
  unit === "planta" ? "plantas" : unit === "máquina" ? "máquinas" : "líneas";

export function PlanTiers({
  /** El módulo que se está mirando. Sin esto, la tabla habla del catálogo entero. */
  price,
  /** El nombre que usa la frase de cierre: un módulo, o "la plataforma". */
  subject,
  className = "",
}: {
  price?: ModulePrice;
  subject: string;
  className?: string;
}) {
  const desde = Math.min(...MODULE_PRICES.map((p) => p.usd));

  const gratuito = price?.free ?? "Una línea, una planta o una máquina según el módulo.";
  const pagoPrecio = price ? `USD ${price.usd}` : `Desde USD ${desde}`;
  const pagoNota = price
    ? `Por ${price.unit} y por mes, con usuarios ilimitados.`
    : "Por módulo y por mes, con usuarios ilimitados.";
  /* Con un módulo a la vista la frase nombra su unidad —"cuántas líneas entran"—. Sin él
     no puede: cada módulo cobra por una cosa distinta, y "cuántas unidades entran" no
     significa nada para nadie. Ahí la frase cambia de forma en vez de usar un comodín. */
  const cierre = price
    ? `lo que cambia es cuántas ${plural(price.unit)} entran.`
    : "lo que cambia es cuánto de tu operación entra en cada uno.";

  return (
    <div className={className}>
      {/* Sin caja: tres planes enfrentados son texto comparable, no tres cosas que se
          tocan. La línea de arriba los separa y la del pago va en teal, que marca cuál es
          el de referencia sin encerrarlo en un recuadro. */}
      <dl className="grid gap-x-10 gap-y-8 min-[1000px]:grid-cols-3">
        <div className="min-w-0 border-t border-line pt-5">
          <dt className="text-[13px] font-medium text-ink-secondary">Gratuito</dt>
          <dd className="metric mt-2 text-[length:var(--text-lead)] font-light leading-none text-ink">
            USD 0
          </dd>
          <p className="mt-4 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            {gratuito} Sin tarjeta y sin vencimiento.
          </p>
        </div>

        <div className="min-w-0 border-t-2 border-line-brand pt-5">
          <dt className="text-[13px] font-medium text-ink-secondary">Pago</dt>
          <dd className="metric mt-2 text-[length:var(--text-lead)] font-light leading-none text-ink">
            {pagoPrecio}
          </dd>
          <p className="mt-4 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            {pagoNota}
          </p>
        </div>

        <div className="min-w-0 border-t border-line pt-5">
          <dt className="text-[13px] font-medium text-ink-secondary">A medida</dt>
          <dd className="metric mt-2 text-[length:var(--text-lead)] font-light leading-none text-ink">
            Cotizado
          </dd>
          <p className="mt-4 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            Implementación, proyectos de IA, hardware y desarrollos propios para tu operación.
          </p>
        </div>
      </dl>

      <p className="mt-8 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink">
        <strong className="font-semibold">
          Todo lo que hace {subject} está en los tres planes.
        </strong>{" "}
        No hay funciones reservadas para el plan pago: {cierre}
      </p>
    </div>
  );
}
