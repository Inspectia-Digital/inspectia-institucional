import type { GuideBlock } from "./guides";

/**
 * El blog: `/blog` y `/blog/<slug>`.
 *
 * ## Qué va al blog y qué no
 *
 * El plan del blog (`docs/landings/seo/blog/00_PLAN_BLOG.md` §1) reparte por intención, no
 * por formato:
 *
 * - búsqueda **comercial** («software de…», «… + OEE», «integración con…») → landing;
 * - **procedimiento** permanente, con plantilla o descarga → guía (`/guias/`), en español
 *   neutro;
 * - **definición** («qué es…»), cálculo, normativa con fecha o explicación técnica → acá.
 *
 * Y una regla que ordena el resto: **una búsqueda, una página.** El artículo no compite con
 * la landing por el mismo término; la enlaza con el texto del término comercial.
 *
 * ## Esta tanda es sólo la infraestructura
 *
 * No hay artículos publicados. Lo que se construyó es la ruta, la plantilla de §7 y el
 * modelo de contenido, para que escribir el primero sea agregar una entrada acá.
 *
 * Por eso `/blog` **no está en el menú** y no entra al mapa del sitio mientras no haya
 * nada publicado: es la misma regla que ya usa `/soluciones/casos`, que devuelve 404
 * mientras no hay un caso aprobado. Un índice vacío declarado en el sitemap es una página
 * delgada ofrecida al rastreo, que es peor que no ofrecer nada. Las dos cosas se encienden
 * solas en el momento en que un artículo pasa a `published: true`.
 *
 * ## El borrador no se publica
 *
 * La entrada de abajo está en `published: false`. Eso significa tres cosas, y las tres se
 * verifican: no aparece en el índice, su URL devuelve 404 y no entra al sitemap ni a
 * `llms.txt`. Es un esqueleto para probar justamente eso —el título sale del plan, el
 * cuerpo dice qué va en cada bloque— y no contenido a medio escribir: ningún lector lo ve.
 * Cuando se escriba de verdad, se reemplaza el cuerpo y se pasa a `true`.
 */

export type BlogPost = {
  slug: string;
  /** Nombre corto para el índice y los enlaces. No es el H1. */
  title: string;
  /** El H1: la búsqueda, tal cual (§7 del plan). */
  h1: string;
  seoTitle: string;
  seoDescription: string;
  /**
   * La respuesta en dos o tres oraciones, que es el primer párrafo del artículo.
   *
   * Es lo que un buscador extrae para el fragmento destacado y lo que lee un asistente, así
   * que tiene que poder leerse solo, fuera de la página, sin que le falte nada.
   */
  answer: string;
  /** Fecha de publicación, en ISO (`AAAA-MM-DD`). */
  date: string;
  /** Fecha de la última revisión, cuando hubo una. Los de normativa la llevan siempre. */
  updated?: string;
  /**
   * La firma.
   *
   * Es la organización y no una persona mientras no haya una firma real en la página: un
   * `author` de tipo `Person` que no figura en el artículo es un dato estructurado que no
   * se puede verificar.
   */
  author: string;
  blocks: GuideBlock[];
  faq?: { q: string; a: string }[];
  /**
   * El bloque «Cómo lo resuelve InspectIA»: dos o tres líneas y el enlace a la landing,
   * con el texto del término comercial.
   */
  solution: { body: string; to: string; label: string };
  /** Falso mientras es borrador: no se publica, no se lista y no entra al sitemap. */
  published: boolean;
};

export const POSTS: BlogPost[] = [
  {
    slug: "plan-maestro-de-produccion",
    title: "Plan maestro de producción",
    h1: "Plan maestro de producción: qué es y cómo armarlo",
    seoTitle: "Plan maestro de producción: qué es y cómo armarlo",
    seoDescription:
      "Qué es un plan maestro de producción, qué datos necesita y cómo se arma, con un ejemplo de una línea. Artículo en preparación.",
    answer:
      "Esqueleto de prueba, sin escribir. La respuesta de dos o tres oraciones va acá y tiene que poder leerse sola, fuera de la página.",
    date: "2026-11-23",
    author: "InspectIA",
    blocks: [
      { kind: "h2", text: "Qué va en este bloque" },
      {
        kind: "p",
        text: "El cuerpo del artículo, con un ejemplo con números de planta y los H2 escritos como preguntas. Esta entrada está en borrador: no se publica, no se lista en el índice y su URL devuelve 404.",
      },
    ],
    solution: {
      body: "Acá van las dos o tres líneas que dicen qué hace InspectIA con esto, y el enlace a la landing con el texto del término comercial.",
      to: "/plataforma/produccion/plan-de-produccion",
      label: "plan de producción",
    },
    published: false,
  },
];

/** Los artículos que se publican, del más nuevo al más viejo. */
export const publishedPosts = () =>
  POSTS.filter((p) => p.published).sort((a, b) => b.date.localeCompare(a.date));

/**
 * El artículo de un slug, **sólo si está publicado**.
 *
 * El filtro va acá y no en la vista a propósito: con el mapa armado sobre `POSTS` entero,
 * cualquier plantilla nueva que lo use publicaría los borradores sin que nadie lo decida.
 */
export const POST_BY_SLUG = new Map(publishedPosts().map((p) => [p.slug, p]));

/* La fecha para mostrar sale de `updatedLabel`, en `guides.ts`, y no de un formateador
   propio: ese ya resuelve el problema de la zona horaria —sin `timeZone: "UTC"`, el
   11/11 se muestra como 10/11 en Buenos Aires y el HTML del servidor no coincide con el
   del cliente—. Un segundo formateador sería el mismo error esperando a que alguien lo
   escriba de nuevo. */
