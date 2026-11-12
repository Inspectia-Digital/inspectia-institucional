import { CtaPair } from "@/components/site/CtaPair";
import { ProductPanel, type ProductPanelData } from "@/components/site/ProductPanel";
import { RequestCta } from "@/components/site/featureSections";
import { Icon } from "@/components/icons/Icon";

/**
 * El hero de las páginas de funcionalidad: claro, a dos columnas, con el producto a la
 * derecha.
 *
 * ## Por qué no es `PageHero`
 *
 * `PageHero` es una banda de teal profundo a todo el ancho y a una sola columna. Sirve para
 * un módulo o una industria, donde lo que hay que hacer es presentar un tema. Una página de
 * funcionalidad llega desde una búsqueda comercial concreta —"monitoreo automático de
 * OEE"— y lo que tiene que resolver en la primera pantalla es otra cosa: mostrar que el
 * producto existe y qué se ve adentro. Un hero oscuro con tres párrafos no lo hace.
 *
 * Es la **excepción decidida** de la guía de funcionalidades (12/11/2026 §2), y es acotada:
 * `PageHero` no se toca y los módulos, las industrias y las guías siguen igual.
 *
 * ## Por qué esta página puede tener el hero claro
 *
 * Los lineamientos permiten **una** superficie de teal profundo por página. Acá esa
 * superficie es la banda de relacionadas, más abajo. Si el hero también fuera oscuro habría
 * dos, y la página empezaría y terminaría en oscuro con el medio alternando —que es
 * textualmente lo que el documento llama "una página que se siente cargada"—.
 *
 * El titular usa `--text-hero-split` y la columna lleva `hero-col`
 * (`container-type: inline-size`): el tamaño se ata al ancho de **su columna** y no al del
 * viewport, que es lo único que hace cumplir la regla de tres líneas en una columna que
 * mide la mitad de la página.
 */
export function FeatureHero({
  eyebrow,
  title,
  lead,
  /** La línea de 14px debajo de los botones. Sólo donde el contenido la trae. */
  note,
  panel,
  module,
  demoLabel,
  /** Cuando la funcionalidad todavía no se contrata sola: un solo botón, sin `CtaPair`. */
  requestOrigin,
  /** El enlace de texto al lado del botón único, para bajar a la explicación. */
  secondary,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  note?: string;
  panel?: ProductPanelData;
  module?: string;
  demoLabel?: string;
  requestOrigin?: string;
  secondary?: { label: string; hash: string };
}) {
  return (
    /* El relleno de abajo es corto a propósito: lo que sigue es la miga de pan, que es
       parte del encabezado y no una sección. Con el padding de sección completo quedaban
       112px de blanco entre el hero y una línea de 13px, y otros 112 hasta el problema. */
    <section className="bg-surface px-5 pb-10 pt-[var(--section-pad-md)] md:px-8 md:pb-12">
      <div
        className={
          "mx-auto grid max-w-[var(--content-max)] grid-cols-1 items-center gap-10 " +
          // Las dos columnas sólo en el rango alto. En 640–1000 el panel no entra al lado
          // de un titular de tres líneas sin que los dos queden ilegibles, así que baja.
          "min-[1000px]:grid-cols-2 min-[1000px]:gap-14"
        }
      >
        <div className="hero-col min-w-0">
          <p className="eyebrow">{eyebrow}</p>
          <h1
            className="mt-4 text-[length:var(--text-hero-split)] leading-[var(--leading-hero)] tracking-[var(--tracking-hero)] text-brand-deep"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h1>
          <p
            className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary"
            style={{ textWrap: "pretty" }}
          >
            {lead}
          </p>

          {requestOrigin ? (
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <RequestCta origin={requestOrigin} />
              {secondary && (
                <a
                  href={`#${secondary.hash}`}
                  className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand transition-colors duration-[160ms] hover:text-[var(--text-link-hover)] hover:underline hover:underline-offset-4"
                >
                  {secondary.label}
                  <Icon name="arrow-right" />
                </a>
              )}
            </div>
          ) : (
            <CtaPair
              surface="white"
              module={module}
              {...(demoLabel ? { demoLabel } : {})}
              className="mt-9 max-w-md"
            />
          )}

          {note && <p className="mt-4 text-sm text-ink-secondary">{note}</p>}
        </div>

        {/* El panel, segundo en el orden del documento: en celular queda debajo de los
            botones, que es lo que pide la guía. Sin `order` invertido en ningún rango —el
            orden visual y el del DOM son el mismo, y así el foco del teclado también. */}
        {panel && <ProductPanel data={panel} className="min-w-0" />}
      </div>
    </section>
  );
}
