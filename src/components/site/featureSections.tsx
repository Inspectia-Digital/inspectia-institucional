import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaPair } from "@/components/site/CtaPair";
import { CLOSE_TITLE, CLOSE_LEAD } from "@/components/site/BottomCta";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";
import { pushEvent, sourcePage } from "@/lib/analytics";

/**
 * Las secciones de una página de funcionalidad, sueltas y compartidas.
 *
 * Estaban adentro de la ruta `$modulo_.$funcionalidad.tsx`, que era el único lugar que las
 * usaba. Dejaron de serlo: la página del conector MCP vive en `/ia/` y usa el mismo diseño
 * en su versión corta (hero con panel, tres bloques, franja, preguntas y cierre). Con las
 * secciones acá, las dos páginas comparten una sola plantilla de verdad y no dos copias
 * que se van separando con cada cambio — que es exactamente lo que la guía pide cuando
 * dice "que la plantilla sea una sola".
 */

/* ---------- Columnas ----------
   Las clases van literales y completas porque Tailwind lee el código fuente: una clase
   armada con una plantilla (`grid-cols-${n}`) no existe en el CSS compilado y la grilla se
   queda a una columna. Por eso es un mapa y no una interpolación. */

/** La grilla general: una columna en celular, dos en el rango medio, N en el alto. */
const GRID: Record<number, string> = {
  1: "",
  2: "min-[640px]:grid-cols-2",
  3: "min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3",
  4: "min-[640px]:grid-cols-2 min-[1000px]:grid-cols-4",
  5: "min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3",
};

export const cols = (n: number) => GRID[n] ?? GRID[3];

/** Dos columnas fijas, para «El problema». */
export const GRID_2 = GRID[2];

/** La banda de `related` cuenta distinto: sus bloques llevan 28px de relleno y un cuerpo
 *  de dos líneas, así que cuatro en fila a 1120px quedan en 250px cada uno y se aprietan.
 *  Con cuatro van 2x2. */
const BAND_GRID: Record<number, string> = {
  1: "",
  2: "min-[1000px]:grid-cols-2",
  3: "min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3",
  4: "min-[640px]:grid-cols-2",
};

/* ---------- Enlaces ---------- */

/** El enlace con flecha de los lineamientos: teal, 15px / 500, termina en una flecha.
 *  Es de una línea, así que sirve para etiquetas cortas. Para un título entero va
 *  `ARROW_LINK_WRAP`: con `nowrap`, un enlace de 403px rompe la página a 390. */
export const ARROW_LINK =
  "inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-semibold " +
  "text-brand transition-colors duration-[160ms] hover:text-[var(--text-link-hover)] " +
  "hover:underline hover:underline-offset-4";

/** El mismo enlace cuando el texto es un título y tiene que cortarse en varias líneas.
 *  Sin flex: así la flecha queda detrás de la última palabra y no colgada en un renglón
 *  propio. */
export const ARROW_LINK_WRAP =
  "text-brand transition-colors duration-[160ms] hover:text-[var(--text-link-hover)] " +
  "hover:underline hover:underline-offset-4";

/* ---------- Envoltorio de sección ---------- */

export const H2_SECTION = "text-[28px] leading-tight text-ink md:text-[length:var(--text-section)]";

export function SectionBlock({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="px-5 py-[var(--section-pad-md)] md:px-8">
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={cn("mt-4 max-w-[28ch]", H2_SECTION)}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

/* ---------- Cómo funciona ---------- */

/**
 * Los pasos, en columnas. La línea de arriba es de 2px y teal: es lo único de la página
 * que marca una secuencia, y a 1px no se distinguía de la línea gris de las otras grillas.
 */
export function Steps({
  items,
  render,
}: {
  items: { title: string; body: string }[];
  render?: (body: string) => React.ReactNode;
}) {
  return (
    <ol className={cn("mt-12 grid gap-x-6 gap-y-9", cols(items.length))}>
      {items.map((item, i) => (
        <li key={item.title} className="min-w-0 border-t-2 border-teal-650 pt-5">
          <span className="metric text-sm font-semibold text-brand">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
            {item.title}
          </h3>
          <p className="mt-2 text-base leading-[var(--leading-normal)] text-ink-secondary">
            {render ? render(item.body) : item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- La franja ---------- */

/**
 * Una idea sola sobre superficie tintada, con un enlace de acción.
 *
 * No es una card: es la única superficie de color del cuerpo de la página, y la regla de
 * un solo botón principal por sección se cumple porque lleva enlace, no botón.
 */
export function Band({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: React.ReactNode;
}) {
  return (
    <section className="px-5 md:px-8">
      <div className="mx-auto max-w-[var(--content-max)]">
        <div className="grid items-center gap-6 rounded-[14px] border border-teal-100 bg-brand-subtle px-7 py-7 md:px-8 min-[1000px]:grid-cols-[1fr_auto] min-[1000px]:gap-10">
          <div className="min-w-0">
            <h2 className="text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
              {title}
            </h2>
            <p className="mt-2 max-w-[var(--read-max)] text-base leading-[var(--leading-normal)] text-ink-secondary">
              {body}
            </p>
          </div>
          {action}
        </div>
      </div>
    </section>
  );
}

/* ---------- La banda oscura de relacionadas ---------- */

/**
 * «Del ingreso a la línea» y sus equivalentes.
 *
 * **Es la única superficie de teal profundo de la página**, y por eso el hero es claro.
 * Cada bloque es un enlace completo y no un título con un enlace adentro: el destino es el
 * bloque entero, así que el área clickeable también.
 */
export function RelatedBand({
  eyebrow,
  title,
  lead,
  items,
  /**
   * `"light"` para las páginas que ya gastaron su superficie de teal profundo en otro
   * lado. Hoy pasa en una sola: el panel del andon es oscuro porque una pantalla de
   * planta se mira de lejos, y con la banda también oscura la página tendría dos.
   */
  tone = "deep",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  items: { title: string; body?: string; to: string }[];
  tone?: "deep" | "light";
}) {
  const deep = tone === "deep";

  return (
    <section
      className={cn(
        "px-5 py-[var(--section-pad-md)] md:px-8 min-[1000px]:py-[var(--section-pad)]",
        deep && "bg-brand-deep",
      )}
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <p
          className={cn(
            "text-sm font-semibold",
            deep ? "text-[var(--accent-on-brand-subtle)]" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
        <h2
          className={cn(
            "mt-4 max-w-[28ch] text-[28px] leading-tight md:text-[length:var(--text-section)]",
            deep ? "text-on-brand" : "text-ink",
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)]",
              deep ? "text-on-brand-secondary" : "text-ink-secondary",
            )}
          >
            {lead}
          </p>
        )}

        <ul className={cn("mt-12 grid gap-5", BAND_GRID[items.length] ?? BAND_GRID[3])}>
          {items.map((r) => (
            <li key={r.to} className="min-w-0">
              <Link
                to={r.to}
                activeOptions={{ exact: true }}
                className={cn(
                  "flex h-full flex-col rounded-[var(--radius-lg)] border p-7",
                  "transition-colors duration-[160ms]",
                  deep
                    ? "border-line-on-brand bg-on-brand-fill hover:border-cyan-400"
                    : "border-line bg-surface hover:border-line-brand",
                )}
              >
                <span
                  className={cn(
                    "text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)]",
                    deep ? "text-on-brand" : "text-ink",
                  )}
                >
                  {r.title}
                </span>
                {r.body && (
                  <span
                    className={cn(
                      "mt-2 text-[15px] leading-[var(--leading-normal)]",
                      deep ? "text-on-brand-secondary" : "text-ink-secondary",
                    )}
                  >
                    {r.body}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Preguntas ---------- */

export function Faq({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  return (
    <section id="preguntas" className="px-5 py-[var(--section-pad-md)] md:px-8">
      <div className="mx-auto max-w-[50rem]">
        <h2 className={H2_SECTION}>{title}</h2>
        <Accordion
          type="single"
          collapsible
          defaultValue="feat-faq-0"
          className="mt-10 border-t border-line"
        >
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`feat-faq-${i}`} className="border-line">
              <AccordionTrigger className="py-5 text-left text-[17px] font-medium text-ink hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------- El CTA de las páginas que todavía no se contratan solas ---------- */

/**
 * «Quiero conocerlo».
 *
 * Las funcionalidades planificadas o parciales se publican igual —posicionan algo que se
 * construye cuando un cliente lo pide— pero **no pueden llevar «Empezar gratis»**: ofrecer
 * crear una cuenta para usar algo que todavía no está es la forma más rápida de que esa
 * cuenta se dé de baja el mismo día.
 *
 * El origen viaja en la URL. Hoy `/contacto` no tiene formulario —ninguno de los que
 * existen tiene destino configurado— así que el parámetro no se prellena en ningún lado:
 * sirve para saber de qué página vino la consulta, que GA4 registra solo porque forma
 * parte de la ubicación de la página. Cuando el formulario exista, el campo ya está.
 */
export function RequestCta({
  origin,
  label = "Quiero conocerlo",
  className,
}: {
  origin: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      to="/contacto"
      search={{ origen: origin }}
      /* El origen viaja además en la URL, que es lo que deja el rastro en la vista de
         `/contacto`. El evento se manda igual: sin él, la única acción comercial de
         estas tres páginas no figura en ningún informe. */
      onClick={() =>
        pushEvent("feature_request_click", { source_page: sourcePage(), feature: origin })
      }
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] px-8",
        "text-[15px] font-semibold text-white transition-colors duration-[160ms]",
        "bg-action hover:bg-action-hover active:translate-y-px",
        className,
      )}
    >
      {label}
    </Link>
  );
}

/* ---------- El cierre ---------- */

/**
 * El cierre: un panel tintado, no la banda blanca del sitio ni otra banda oscura.
 *
 * Oscuro no puede ser porque esa superficie ya la gastó la banda de relacionadas, y blanco
 * liso después de una sección blanca no se distingue del cuerpo de la página. El panel
 * lavado separa sin sumar una segunda superficie fuerte.
 *
 * Donde la página no trae cierre propio va el copy del sitio, importado de `BottomCta`
 * para que no queden dos versiones del mismo texto.
 */
export function Close({
  title,
  lead,
  module,
  demoLabel,
  /** Cuando la página no se contrata sola: un botón en vez del par. */
  requestOrigin,
}: {
  title?: string;
  lead?: string;
  module?: string;
  demoLabel?: string;
  requestOrigin?: string;
}) {
  return (
    <section className="px-5 pb-[var(--section-pad-md)] md:px-8">
      <div className="mx-auto max-w-[var(--content-max)]">
        <div className="grid items-center gap-8 rounded-[14px] bg-brand-subtle px-8 py-12 md:px-12 md:py-14 min-[1000px]:grid-cols-2 min-[1000px]:gap-14">
          <h2
            className={cn(
              "max-w-[20ch] text-[28px] leading-tight text-brand-deep",
              "md:text-[length:var(--text-section)]",
            )}
          >
            {title ?? CLOSE_TITLE}
          </h2>
          <div className="min-w-0">
            <p className="text-base leading-[var(--leading-normal)] text-ink-secondary">
              {lead ?? CLOSE_LEAD}
            </p>
            {requestOrigin ? (
              <RequestCta origin={requestOrigin} className="mt-7" />
            ) : (
              <CtaPair
                module={module}
                {...(demoLabel ? { demoLabel } : {})}
                className="mt-7 max-w-md"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- La miga de pan, visible ---------- */

/**
 * La ruta hasta acá, como enlaces.
 *
 * No es decoración ni es sólo para el dato estructurado: una página de tercer nivel sin
 * salida hacia arriba deja al visitante que llegó de una búsqueda sin forma de ver el
 * módulo completo, que es donde está el precio.
 *
 * Va debajo del hero y no adentro: en el hero compite con el H1, que es lo único que tiene
 * que leerse en la primera pantalla.
 *
 * ## `activeOptions={{ exact: true }}` en los enlaces, y hace falta
 *
 * Por omisión `Link` marca un enlace como activo cuando la ruta actual **empieza** con su
 * destino, y le pone `aria-current="page"`. En una miga de pan eso significa que estando en
 * `/plataforma/produccion/monitoreo-automatico-de-oee` los tres elementos se declaran la
 * página actual: Plataforma, Producción y la funcionalidad. Un lector de pantalla anuncia
 * tres veces "página actual" en una lista de tres, que es exactamente lo contrario de lo
 * que la miga viene a comunicar. Con `exact` sólo coincide la hoja, y la hoja no es un
 * enlace.
 */
export function Crumbs({ trail, name }: { trail: { label: string; to: string }[]; name: string }) {
  const link = "text-ink-muted transition-colors duration-[160ms] hover:text-brand";

  return (
    <nav aria-label="Ruta" className="px-5 md:px-8">
      <ol className="mx-auto flex max-w-[var(--content-max)] flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
        {trail.map((t) => (
          <li key={t.to} className="flex items-center gap-2">
            <Link to={t.to} activeOptions={{ exact: true }} className={link}>
              {t.label}
            </Link>
            <span aria-hidden="true" className="text-line">
              /
            </span>
          </li>
        ))}
        {/* El último no es un enlace: es la página donde se está. */}
        <li aria-current="page" className="text-ink-secondary">
          {name}
        </li>
      </ol>
    </nav>
  );
}

/** El icono de flecha, para no importarlo en cada página que arma un enlace. */
export function ArrowIcon({ className }: { className?: string }) {
  return <Icon name="arrow-right" className={className} />;
}
