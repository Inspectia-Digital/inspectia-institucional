/**
 * La tarjeta de producto del encabezado: una vista del sistema con datos de ejemplo.
 *
 * ## Por qué existe, y por qué no es una captura
 *
 * Responde la objeción más cara de un producto que se contrata sin vendedor —qué me queda
 * en la pantalla después de comprar— y la responde hoy, sin esperar a que exista una
 * captura real. Cuando esa captura llegue, esto se reemplaza por una imagen en
 * `CaptureFrame` y el componente se va.
 *
 * ## Va en Inter y no en Poppins, a propósito
 *
 * Es la única excepción tipográfica de la web, y tiene motivo: **lo que se muestra como
 * producto habla con la voz del producto**. La aplicación es Inter; una vista del producto
 * en Poppins se lee como una ilustración de una app, no como la app. El marco —fondo claro,
 * borde fino, radio 14, 10px de aire— es el que el sistema reserva para capturas, y es lo
 * que avisa al lector que lo de adentro es otra superficie.
 *
 * Por el mismo motivo es el único lugar de la home donde aparece un color de estado: el
 * rojo de la parada sin clasificar es dato del producto, no decoración de la página.
 *
 * ## Los datos son de ejemplo y lo dicen
 *
 * "Datos de ejemplo" va en pantalla, no en un comentario. Publicar números de una planta
 * real —aunque sea la del piloto— es publicar su producción.
 */

/** Una fila del panel. El desvío es el único que lleva color. */
function Fila({
  label,
  valor,
  nota,
  desvio,
}: {
  label: string;
  valor: string;
  nota?: string;
  desvio?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 rounded-[6px] px-3 py-2.5 ${
        desvio ? "bg-[var(--red-100)]" : "bg-[var(--grey-050)]"
      }`}
    >
      <span className={desvio ? "text-[var(--red-700)]" : "text-ink"}>{label}</span>
      <span className="flex shrink-0 items-baseline gap-2">
        <span
          className={`font-semibold tabular-nums ${desvio ? "text-[var(--red-700)]" : "text-ink"}`}
        >
          {valor}
        </span>
        {nota && <span className="text-ink-muted">{nota}</span>}
      </span>
    </div>
  );
}

export function ProductCard() {
  return (
    <div className="rounded-[14px] border border-line bg-[var(--grey-050)] p-[10px]">
      {/* `font-sans` acá es Inter y no la marca: ver la cabecera. */}
      <div className="rounded-[8px] bg-surface p-5 font-[Inter,system-ui,sans-serif] text-[14px]">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-semibold text-ink">Planta Pilar · ahora</p>
          <p className="text-[13px] text-ink-muted">Datos de ejemplo</p>
        </div>

        <div className="mt-4 space-y-2">
          <Fila label="OEE línea 2 · turno tarde" valor="72,6 %" />
          <Fila label="Envasadora parada sin clasificar" valor="18 min" desvio />
          <Fila label="Harina 000 · cobertura" valor="4 días" />
        </div>

        <p className="mt-4 text-[13px] text-brand">
          Aviso enviado al supervisor por WhatsApp · hace 3 min
        </p>
      </div>
    </div>
  );
}
