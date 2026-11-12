import { Link } from "@tanstack/react-router";

/**
 * Las dos marcas en línea que admite el contenido de una guía: `**negrita**` y
 * `[etiqueta](/ruta)`.
 *
 * **Por qué no un renderizador de Markdown.** Una guía necesita poner una palabra en
 * negrita y enlazar a su funcionalidad, y nada más: los encabezados, las tablas, las listas
 * y las fórmulas ya son bloques tipados en `content/guides.ts`, donde se ven en el diff y
 * no se pueden escribir mal. Sumar una librería de Markdown traería, junto con esas dos
 * marcas, la posibilidad de meter HTML arbitrario y encabezados sueltos en un campo de
 * texto, que es exactamente lo que el modelo de bloques existe para evitar —además de unos
 * 30 kB de JavaScript en una página cuyo trabajo es que un buscador lea texto—.
 *
 * Es a propósito que no admita énfasis, código, imágenes ni listas en línea. Si una guía
 * las necesita, el que tiene que crecer es el modelo de bloques.
 *
 * **Los enlaces internos van por `Link`** y no por una etiqueta `a`: con `a` cada enlace
 * de una guía a su funcionalidad recargaría la página entera, y el enlazado interno entre
 * guías, funcionalidades y módulos es justamente lo que estas páginas vienen a hacer.
 */
const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(INLINE)) {
    const at = m.index;
    if (at > last) nodes.push(text.slice(last, at));

    if (m[1] !== undefined) {
      nodes.push(
        <strong key={at} className="font-semibold text-ink">
          {m[1]}
        </strong>,
      );
    } else {
      const label = m[2];
      const href = m[3];
      const className =
        "text-brand underline decoration-from-font underline-offset-2 hover:no-underline";

      nodes.push(
        href.startsWith("/") ? (
          <Link key={at} to={href} className={className}>
            {label}
          </Link>
        ) : (
          // Hacia afuera, en pestaña nueva: una guía es contenido de lectura y no
          // conviene sacar al lector del sitio en la misma pestaña.
          <a key={at} href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {label}
          </a>
        ),
      );
    }

    last = at + m[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));

  return <>{nodes}</>;
}
