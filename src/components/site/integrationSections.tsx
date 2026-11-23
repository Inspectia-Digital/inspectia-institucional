import { Link } from "@tanstack/react-router";
import { RichText } from "@/components/site/RichText";
import {
  ARROW_LINK,
  H2_SECTION,
  SectionBlock,
  Steps,
  cols,
} from "@/components/site/featureSections";
import { BRAND_LOGOS } from "@/content/brand-logos";
import {
  categoryLabel,
  systemsOf,
  type IntegrationBlock,
  type IntegrationCategory,
  type IntegrationSystem,
} from "@/content/integrations";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

/**
 * Las secciones del cuerpo de una página de integración.
 *
 * Son seis páginas con seis formas distintas —el hub reparte, una categoría compara, un
 * sistema narra un día— así que el cuerpo es un arreglo de bloques tipados y no una lista
 * de campos fijos. El mismo criterio que usan las guías.
 *
 * Reusa lo que ya existe de las páginas de funcionalidad (`featureSections.tsx`): el
 * envoltorio de sección, los pasos con la línea de 2 px, el enlace con flecha y la grilla
 * de columnas. Lo propio de acá son tres piezas: la comparación a dos columnas, la tabla y
 * la grilla de logos.
 */
export function IntegrationBlocks({ blocks }: { blocks: IntegrationBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </>
  );
}

function Block({ block: b }: { block: IntegrationBlock }) {
  switch (b.kind) {
    /* La franja tintada con columnas. Es la única superficie de color del cuerpo de la
       página: el teal profundo ya lo gastó el hero en el hub y en las categorías. */
    case "band":
      return (
        <section className="px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[var(--content-max)]">
            <ul
              className={cn(
                "grid gap-x-8 gap-y-7 rounded-[14px] border border-teal-100 bg-brand-subtle px-7 py-8 md:px-9",
                cols(b.items.length),
              )}
            >
              {b.items.map((item) => (
                <li key={item.title} className="min-w-0">
                  <h2 className="text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-base leading-[var(--leading-normal)] text-ink-secondary">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    /* Quién es dueño de qué. Dos columnas y no una tabla: lo que se compara no son valores
       de la misma magnitud sino dos responsabilidades, y una tabla de dos celdas sugiere
       que hay filas que se corresponden una a una. */
    case "pair":
      return (
        <SectionBlock eyebrow={b.eyebrow ?? "Quién hace qué"} title={b.title}>
          <div className="mt-12 grid gap-x-12 gap-y-9 min-[640px]:grid-cols-2">
            {[b.left, b.right].map((side) => (
              <div key={side.title} className="min-w-0 border-t border-line pt-5">
                <h3 className="text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
                  {side.title}
                </h3>
                <ul className="mt-3 space-y-3">
                  {side.items.map((item) => (
                    <li
                      key={item}
                      className="text-base leading-[var(--leading-normal)] text-ink-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {b.note && (
            <p className="mt-9 max-w-[var(--read-max)] border-l-2 border-line-brand pl-5 text-base leading-[var(--leading-normal)] text-ink">
              {b.note}
            </p>
          )}
        </SectionBlock>
      );

    case "table":
      return (
        <SectionBlock eyebrow={b.eyebrow ?? "Qué viaja"} title={b.title}>
          {/* El scroll propio no es una concesión: dos columnas de texto técnico no se
              comprimen a 390 px sin volverse ilegibles, y convertirlas en una lista de
              pares pierde la comparación entre filas, que es para lo que la tabla está. */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[15px]">
              <thead>
                <tr>
                  {b.head.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border-b border-line pb-3 pr-6 align-bottom font-semibold text-ink last:pr-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={cn(
                          "border-b border-line py-3 pr-6 align-top leading-[var(--leading-normal)] last:pr-0",
                          i === 0 ? "font-medium text-ink" : "text-ink-secondary",
                        )}
                      >
                        <RichText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>
      );

    case "grid":
      return (
        <SectionBlock eyebrow={b.eyebrow ?? "Cómo se conecta"} title={b.title}>
          <ul className={cn("mt-12 grid gap-x-6 gap-y-9", cols(b.items.length))}>
            {b.items.map((item) => (
              <li key={item.title} className="min-w-0 border-t border-line pt-5">
                <h3 className="text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-[var(--leading-normal)] text-ink-secondary">
                  <RichText text={item.body} />
                </p>
                {item.to && (
                  <Link
                    to={item.to}
                    activeOptions={{ exact: true }}
                    className={cn(ARROW_LINK, "mt-4")}
                  >
                    {item.linkLabel ?? "Ver más"}
                    <Icon name="arrow-right" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </SectionBlock>
      );

    case "steps":
      return (
        <SectionBlock eyebrow={b.eyebrow ?? "Cómo funciona"} title={b.title}>
          <Steps items={b.items} render={(body) => <RichText text={body} />} />
        </SectionBlock>
      );

    case "note":
      return (
        <section className="px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[var(--content-max)]">
            <div className="border-t border-line pt-6">
              <h2 className="max-w-[40ch] text-[22px] leading-snug text-ink md:text-[26px]">
                {b.title}
              </h2>
              {b.body && (
                <p className="mt-4 max-w-[var(--read-max)] text-base leading-[var(--leading-normal)] text-ink-secondary">
                  <RichText text={b.body} />
                </p>
              )}
              {b.items && (
                <ul className="mt-5 max-w-[var(--read-max)] space-y-4">
                  {b.items.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 text-base leading-[var(--leading-normal)] text-ink-secondary before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-line-brand"
                    >
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      );

    case "systems":
      return <SystemGrid title={b.title} categories={b.categories} grouped={b.grouped} />;

    default: {
      const exhaustivo: never = b;
      return exhaustivo;
    }
  }
}

/* ---------- La grilla de sistemas ---------- */

/**
 * Los sistemas de una o varias categorías, con su logo o con su nombre.
 *
 * **Un tono, un alto, sin animación**, que es lo que pide la regla de logos de los
 * lineamientos. Los glifos se dibujan con `currentColor` sobre la clase del tema, así que
 * el tono sale de un token y no de un color guardado en el activo.
 *
 * El sistema con página propia es un enlace; el que no la tiene es texto. No hay estado
 * intermedio ni «próximamente»: un enlace que no lleva a ningún lado es peor que un
 * nombre.
 */
export function SystemGrid({
  title,
  categories,
  grouped,
}: {
  title: string;
  categories: IntegrationCategory[];
  grouped?: boolean;
}) {
  const groups = grouped
    ? categories.map((c) => ({ key: c, label: categoryLabel(c), items: systemsOf(c) }))
    : [{ key: "todos", label: null, items: categories.flatMap((c) => systemsOf(c)) }];

  return (
    <section className="px-5 py-[var(--section-pad-md)] md:px-8">
      <div className="mx-auto max-w-[var(--content-max)]">
        <h2 className={cn("max-w-[28ch]", H2_SECTION)}>{title}</h2>

        <div className="mt-12 space-y-12">
          {groups.map((g) => (
            <div key={g.key} className="min-w-0">
              {g.label && <h3 className="text-sm font-semibold text-brand">{g.label}</h3>}
              <ul className={cn("flex flex-wrap items-center gap-x-8 gap-y-5", g.label && "mt-6")}>
                {g.items.map((s) => (
                  <li key={s.name} className="min-w-0">
                    <SystemItem system={s} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemItem({ system: s }: { system: IntegrationSystem }) {
  const body = <SystemMark system={s} />;

  if (!s.page) return body;

  return (
    <Link
      to="/integraciones/$slug"
      params={{ slug: s.page }}
      activeOptions={{ exact: true }}
      className="inline-flex items-center gap-2 transition-colors duration-[160ms] hover:text-brand"
      aria-label={`Integración con ${s.name}`}
    >
      {body}
      <Icon name="arrow-right" className="text-brand" />
    </Link>
  );
}

/** El logo, o el nombre en texto mientras no haya uno. */
function SystemMark({ system: s }: { system: IntegrationSystem }) {
  if (s.logo) {
    const logo = BRAND_LOGOS[s.logo];
    return (
      <span className="inline-flex items-center gap-2.5 text-logo">
        {/* `aria-hidden` y el nombre al lado en texto: el logo de Inductive Automation no
            dice «Ignition», así que la etiqueta accesible no puede ser la imagen. */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className="size-6 shrink-0"
          fill="currentColor"
        >
          <path d={logo.path} />
        </svg>
        <span className="text-[15px] font-medium">{s.name}</span>
      </span>
    );
  }

  // Mientras un logo sea texto y no imagen, va en --grey-600.
  return <span className="text-[15px] font-medium text-logo">{s.name}</span>;
}
