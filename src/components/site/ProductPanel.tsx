import { cn } from "@/lib/utils";

/**
 * El panel del producto: una pantalla de InspectIA dibujada con componentes.
 *
 * Existe porque las páginas de funcionalidad tienen que mostrar el producto en la primera
 * pantalla y **no hay captura para cada una**. Las cinco capturas que hay
 * (`MODULE_SHOTS`, `APP_SHOT`) son tableros de módulo a 1680px: entran en una sección a lo
 * ancho, no en media columna de hero, y ninguna muestra el recorte puntual que vende cada
 * funcionalidad.
 *
 * **Por qué con componentes y no una imagen** (guía de funcionalidades 12/11/2026 §3.11):
 * escala sin pesar, se traduce, el dato se corrige editando una línea de contenido, y un
 * lector de pantalla lee la tabla como tabla. Una imagen de 500 KB por hero haría lo
 * contrario de lo que el sitio viene a cuidar.
 *
 * **Son datos inventados y lo dice el panel.** El rótulo «Datos de ejemplo» va en la barra
 * de arriba, siempre, y no es una formalidad: una captura con datos de un tenant real
 * publica su producción. Las personas, clientes y proveedores de los paneles son genéricos
 * a propósito.
 *
 * ## Qué respeta de los lineamientos
 *
 * - **Sin sombra.** Es la única diferencia a ojo con la referencia HTML del 11/11, que la
 *   tiene porque se dibujó con las reglas de la aplicación y no con las de la web.
 * - **Los colores de estado viven acá adentro y en ningún otro lugar de la página.** Es la
 *   excepción que los lineamientos permiten: "si aparecen, es adentro de una captura del
 *   producto".
 * - **Nada en mayúscula**, tampoco las etiquetas de los indicadores. La referencia las
 *   tiene en versales; acá van en tipo oración.
 */

/* ---------- Los datos ---------- */

type PillTone = "ok" | "warn" | "stop" | "info" | "neutral";

export type PanelPill = { text: string; tone: PillTone };

/**
 * Una celda de tabla: el texto, o una pastilla en su lugar.
 *
 * Varios paneles necesitan una fila que diga «Cubierto», «Sin dato» o «A revisar» en la
 * columna donde las demás filas traen un número. Escribir esas palabras como texto suelto
 * las haría leer como un valor más; la pastilla dice que es un estado, con el mismo
 * vocabulario que ya usan las filas y las barras.
 */
export type PanelCell = string | PanelPill;

export type PanelBlock =
  /** Fila de 2 a 5 indicadores. `suffix` es el "/ 42" chico al lado del número. */
  | { kind: "stats"; items: { label: string; value: string; suffix?: string }[] }
  /** Lista de filas, con un encabezado de grupo opcional cuando el panel tiene tramos. */
  | {
      kind: "rows";
      group?: string;
      items: { name: string; detail?: string; value?: string; pill?: PanelPill }[];
    }
  /** Tabla. La primera columna es texto; el resto, números alineados a la derecha. */
  | { kind: "table"; head: string[]; rows: PanelCell[][] }
  /** Barras horizontales. `pct` es contra la barra más larga, no contra el total, y puede
   *  pasar de 100 —una carga de máquina del 112 %—: el relleno se recorta, el número no. */
  | {
      kind: "bars";
      items: { label: string; value: string; pct: number; pill?: PanelPill }[];
    }
  /** Una conversación. La usa la página del conector MCP: lo que se vende ahí es que se
   *  pregunta en palabras, y eso no se muestra con una tabla. */
  | { kind: "chat"; items: { role: "ask" | "answer"; text: string }[] };

export type ProductPanelData = {
  /** Lo que diría el título de la pantalla. Va en la barra teal. */
  title: string;
  blocks: PanelBlock[];
  /** Una línea de 12px al pie, para decir de dónde sale el dato. */
  foot?: string;
  /**
   * La variante oscura, para la pantalla de planta: un andon se mira de lejos y en un
   * taller con luz dura, y ahí el blanco es el fondo equivocado. Es la única superficie
   * oscura que puede aparecer en el hero, y por eso la página del andon no lleva la banda
   * `related` en teal profundo: seguiría habiendo una sola.
   */
  tone?: "dark";
};

/* ---------- El marco ---------- */

/**
 * El marco de captura de los lineamientos (§Imagen): fondo `--grey-050`, borde de 1px,
 * radio 14 y 10px de aire alrededor. Lo usan el panel y las capturas reales, así que el
 * día que el marco cambie no quedan dos marcos distintos en la misma página.
 */
export function PanelFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-line bg-surface-sunken p-2.5",
        // Sin esto el contenido de una celda ancha estira el marco y aparece scroll
        // horizontal en la página, que es el síntoma que los lineamientos nombran.
        "min-w-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------- El panel ---------- */

/* Sobre fondo claro la pastilla es texto de color sobre relleno lavado; sobre el panel
   oscuro se invierte, porque un relleno lavado sobre teal profundo se lee como un parche
   blanco. Las dos combinaciones pasan AA: 5,63 / 5,41 / 5,87 / 5,46. */
const PILL: Record<PillTone, string> = {
  ok: "bg-status-ok-bg text-status-ok-strong",
  warn: "bg-status-warn-bg text-status-warn-strong",
  stop: "bg-status-stop-bg text-status-stop-strong",
  info: "bg-status-info-bg text-status-info-strong",
  neutral: "bg-[var(--grey-150)] text-[var(--grey-700)]",
};

const PILL_DARK: Record<PillTone, string> = {
  ok: "bg-status-ok-strong text-green-100",
  warn: "bg-status-warn-strong text-amber-100",
  stop: "bg-status-stop-strong text-red-100",
  info: "bg-status-info-strong text-blue-100",
  neutral: "bg-white/14 text-on-brand",
};

type Ctx = { dark: boolean };

export function ProductPanel({ data, className }: { data: ProductPanelData; className?: string }) {
  const dark = data.tone === "dark";
  const ctx: Ctx = { dark };

  return (
    <PanelFrame className={className}>
      <div
        className={cn(
          "min-w-0 overflow-hidden rounded-[10px]",
          dark ? "bg-brand-deep" : "bg-surface",
        )}
      >
        {/* La barra de arriba. 44px de alto fijo: es el alto de la barra de título de la
            aplicación, y lo que la hace leerse como una ventana y no como una card. */}
        <div
          className={cn(
            "flex h-11 items-center justify-between gap-3 px-4",
            dark ? "bg-white/10" : "bg-teal-800",
          )}
        >
          <span className="min-w-0 truncate text-sm font-semibold text-on-brand">{data.title}</span>
          <span className={cn("shrink-0 text-xs", dark ? "text-teal-300" : "text-teal-200")}>
            Datos de ejemplo
          </span>
        </div>

        <div className={cn("divide-y", dark ? "divide-line-on-brand" : "divide-line")}>
          {data.blocks.map((block, i) => (
            <Block key={i} block={block} ctx={ctx} />
          ))}
        </div>

        {data.foot && (
          <p
            className={cn(
              "border-t px-4 py-3 text-xs",
              dark ? "border-line-on-brand text-on-brand-secondary" : "border-line text-ink-muted",
            )}
          >
            {data.foot}
          </p>
        )}
      </div>
    </PanelFrame>
  );
}

function Pill({ pill, ctx }: { pill: PanelPill; ctx: Ctx }) {
  return (
    <span
      className={cn(
        "rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-semibold",
        (ctx.dark ? PILL_DARK : PILL)[pill.tone],
      )}
    >
      {pill.text}
    </span>
  );
}

function Block({ block, ctx }: { block: PanelBlock; ctx: Ctx }) {
  const { dark } = ctx;
  const label = dark ? "text-on-brand-secondary" : "text-ink-secondary";
  const value = dark ? "text-on-brand" : "text-ink";

  switch (block.kind) {
    case "stats": {
      /* El valor manda sobre el ancho de la columna y sobre su cuerpo.
         «$ 12.480.000» a 26px mide 180px: en una celda de 104 se salía por la derecha y
         se montaba sobre el indicador de al lado. No alcanza con dejar que corte, porque
         un importe partido en dos renglones se lee como dos cifras. Así que el bloque con
         un valor largo baja el cuerpo y pide columnas más anchas, y `auto-fit` decide
         cuántas entran. */
      const largo = Math.max(...block.items.map((s) => s.value.length));
      const cuerpo = largo >= 10 ? "text-[20px]" : largo >= 8 ? "text-[22px]" : "text-[26px]";
      const minimo = largo >= 10 ? "140px" : "104px";
      return (
        /* `auto-fit` y no una cantidad fija de columnas: los paneles traen entre dos y
           cinco indicadores, y con `grid-cols-4` el de tres dejaba un hueco a la derecha
           que se leía como un dato que no cargó. */
        <div
          className="grid gap-x-4 gap-y-5 px-4 py-5"
          style={{ gridTemplateColumns: `repeat(auto-fit,minmax(${minimo},1fr))` }}
        >
          {block.items.map((s) => (
            <div key={s.label} className="min-w-0">
              <p className={cn("text-[11px] font-semibold leading-tight", label)}>{s.label}</p>
              <p className={cn("metric mt-1.5 leading-none", cuerpo, value)}>
                {s.value}
                {s.suffix && (
                  <span
                    className={cn(
                      "ml-1 text-sm font-normal",
                      dark ? "text-on-brand-secondary" : "text-ink-muted",
                    )}
                  >
                    {s.suffix}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      );
    }

    case "rows":
      return (
        <div className="px-4 py-4">
          {block.group && (
            <p className={cn("mb-2 text-[11px] font-semibold", label)}>{block.group}</p>
          )}
          <ul className={cn("divide-y", dark ? "divide-line-on-brand" : "divide-line")}>
            {block.items.map((r) => (
              <li key={r.name} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className={cn("truncate text-sm font-medium", value)}>{r.name}</p>
                  {r.detail && <p className={cn("truncate text-xs", label)}>{r.detail}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  {r.value && <span className={cn("metric text-sm", value)}>{r.value}</span>}
                  {r.pill && <Pill pill={r.pill} ctx={ctx} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        /* El scroll propio de la tabla. Una tabla de cinco columnas a 350px de ancho no se
           puede comprimir sin volverse ilegible, y convertirla en lista de pares pierde la
           comparación entre filas, que es para lo que la tabla está. El scroll queda
           adentro del panel y no en la página. */
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left">
            <thead>
              <tr className={dark ? "bg-white/8" : "bg-muted"}>
                {block.head.map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={cn(
                      "whitespace-nowrap px-3 py-2.5 text-[11px] font-semibold",
                      label,
                      i > 0 && "text-right",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={cn("divide-y", dark ? "divide-line-on-brand" : "divide-line")}>
              {block.rows.map((row, r) => (
                /* La clave es el índice y no la primera celda: una tabla puede repetir el
                   producto en dos renglones —el plan programa la misma galletita el lunes
                   y el martes— y ahí React dejaría de dibujar el segundo. */
                <tr key={r}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={cn(
                        "whitespace-nowrap px-3 py-2.5 text-sm",
                        i === 0 ? cn("font-medium", value) : cn("metric text-right", label),
                      )}
                    >
                      {typeof cell === "string" ? cell : <Pill pill={cell} ctx={ctx} />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "bars":
      return (
        <ul className="space-y-3.5 px-4 py-5">
          {block.items.map((b) => (
            <li key={b.label} className="min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <span className={cn("min-w-0 truncate text-sm", value)}>{b.label}</span>
                <span className="flex shrink-0 items-center gap-2.5">
                  <span className={cn("metric text-sm", value)}>{b.value}</span>
                  {b.pill && <Pill pill={b.pill} ctx={ctx} />}
                </span>
              </div>
              {/* La barra es decoración del número que está arriba, así que no necesita
                  rol de progressbar ni valor accesible: el dato ya está en texto.
                  El relleno se recorta en 100 y el número de arriba sigue diciendo 112 %:
                  una barra que se sale del riel se lee como un error de maquetado. */}
              <div
                aria-hidden="true"
                className={cn(
                  "mt-1.5 h-1.5 w-full overflow-hidden rounded-[var(--radius-pill)]",
                  dark ? "bg-white/16" : "bg-[var(--grey-150)]",
                )}
              >
                <div
                  className={cn(
                    "h-full rounded-[var(--radius-pill)]",
                    dark ? "bg-cyan-400" : "bg-teal-650",
                  )}
                  style={{ width: `${Math.min(Math.max(b.pct, 0), 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      );

    case "chat":
      return (
        <ul className="space-y-3 px-4 py-5">
          {block.items.map((c) => (
            <li
              key={c.text}
              className={cn("flex", c.role === "ask" ? "justify-end" : "justify-start")}
            >
              <span
                className={cn(
                  "max-w-[88%] rounded-[var(--radius-lg)] px-4 py-2.5 text-sm leading-[var(--leading-normal)]",
                  c.role === "ask"
                    ? "bg-muted text-ink"
                    : "border border-line bg-surface text-ink-secondary",
                )}
              >
                {c.text}
              </span>
            </li>
          ))}
        </ul>
      );
    default: {
      const exhaustivo: never = block;
      return exhaustivo;
    }
  }
}
