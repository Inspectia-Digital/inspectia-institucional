import { RichText } from "@/components/site/RichText";
import type { GuideBlock } from "@/content/guides";

/**
 * El cuerpo de una página de texto largo: guías y artículos del blog.
 *
 * Estaba adentro de la ruta `guias/$guia.tsx`, que era el único lugar que lo usaba.
 * Dejó de serlo: el blog (`/blog/$slug`) escribe con los mismos bloques —H2 escritos como
 * preguntas, tablas, listas, fórmulas— y la misma sintaxis en línea de `RichText`. Con el
 * renderizador acá, las dos plantillas comparten una sola y no dos copias que se separan
 * con cada cambio.
 *
 * El tipo sigue siendo `GuideBlock` y vive en `content/guides.ts`: es el vocabulario de
 * bloques del sitio, no algo propio de las guías. Moverlo de archivo sería renombrar por
 * renombrar.
 */
export function ProseBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Block key={i} block={b} first={i === 0} />
      ))}
    </>
  );
}

/**
 * Un bloque de la guía.
 *
 * El `switch` es exhaustivo sobre `GuideBlock`: si alguien agrega una variante al tipo y
 * no la maneja acá, TypeScript lo marca en `exhaustivo`. Es la razón por la que esa
 * constante existe y no es código muerto.
 */
function Block({ block: b, first }: { block: GuideBlock; first: boolean }) {
  switch (b.kind) {
    case "h2":
      return (
        // Sin margen superior en el primero: el aire ya lo pone el contenedor.
        <h2 className={`${first ? "" : "mt-14 "}text-[22px] leading-snug text-ink md:text-[26px]`}>
          {b.text}
        </h2>
      );

    case "p":
      return (
        <p className="mt-5 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          <RichText text={b.text} />
        </p>
      );

    case "ul":
      return (
        <ul className="mt-6 space-y-4">
          {b.items.map((item) => (
            <li
              key={item}
              className="relative pl-5 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-line-brand"
            >
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="mt-6 space-y-4">
          {b.items.map((item, i) => (
            <li key={item} className="flex gap-4">
              <span className="metric shrink-0 pt-[0.15em] text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ol>
      );

    case "formula":
      /* La fórmula en su propio bloque, en texto y en la tipografía de datos.
         **Nunca como imagen** (§6 del brief): un PNG con una fórmula no lo lee un
         buscador, no lo lee un lector de pantalla y no se puede copiar para pegarlo en una
         planilla, que es exactamente lo que va a hacer quien llegó buscando esto. */
      return (
        <p className="metric mt-7 border-l-2 border-line-brand bg-brand-subtle px-5 py-4 text-[15px] leading-relaxed text-ink md:text-[17px]">
          {b.text}
        </p>
      );

    case "table":
      return (
        /* El contenedor con scroll horizontal no es una concesión: una tabla de tres
           columnas con texto en 390px no se puede comprimir sin volverse ilegible, y la
           alternativa —convertirla en una lista de pares— pierde justamente la
           comparación entre filas, que es para lo que la tabla está. */
        <div className="mt-7 overflow-x-auto">
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
              {b.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`border-b border-line py-3 pr-6 align-top leading-[var(--leading-normal)] last:pr-0 ${
                        i === 0 ? "font-medium text-ink" : "text-ink-secondary"
                      }`}
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default: {
      const exhaustivo: never = b;
      return exhaustivo;
    }
  }
}
