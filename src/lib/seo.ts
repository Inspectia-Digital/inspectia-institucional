import { SITE_URL } from "@/content/site";

/**
 * El `head` de una página.
 *
 * Cada ruta repetía los mismos cinco meta a mano —title, description, og:title,
 * og:description, og:type— y ninguna declaraba canónica. Cinco líneas copiadas quince
 * veces es donde se cuelan las páginas con el título de otra.
 *
 * El título se escribe a mano en cada página: la forma es `Beneficio o término · InspectIA`
 * y hasta 60 caracteres, que es lo que Google muestra antes de cortar.
 */
/**
 * Imagen de compartido por defecto: el render del plano recortado a 1200×630. Es el activo
 * más reconocible que hay y lo que se ve al pegar el enlace en LinkedIn o WhatsApp, que en
 * este rubro es por donde circula. Se genera con `npm run images`.
 */
const OG_IMAGE = "/img/og/inspectia-og.jpg";

export function pageHead(opts: {
  title: string;
  description: string;
  /** Ruta absoluta desde la raíz, empezando con "/". */
  path: string;
  /** Sin indexar: legales, privacidad y todo lo que compite con las páginas que sí importan. */
  noindex?: boolean;
  /** Datos estructurados propios de la página (FAQPage, Article). */
  jsonLd?: unknown;
  /** Ruta a una imagen propia de la página. Por omisión, el plano de planta. */
  image?: string;
}) {
  // La raíz conserva la barra: el sitemap declara SITE_URL + "/" y una canónica sin ella
  // apunta, en los papeles, a otra URL. Dos formas de la misma página es exactamente lo
  // que la canónica existe para evitar.
  const canonical = `${SITE_URL}${opts.path}`;

  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      // Absoluta y no relativa: los rastreadores de compartido no resuelven rutas.
      { property: "og:image", content: `${SITE_URL}${opts.image ?? OG_IMAGE}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: `${SITE_URL}${opts.image ?? OG_IMAGE}` },
      ...(opts.noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: canonical }],
    ...(opts.jsonLd
      ? {
          scripts: [{ type: "application/ld+json", children: JSON.stringify(opts.jsonLd) }],
        }
      : {}),
  };
}

/**
 * `término · InspectIA`, con el tope de 60 caracteres que Google muestra antes de cortar.
 *
 * Cuando el término propio ya llega al límite, **el sufijo de marca se cae antes que el
 * término**: lo que hace que alguien encuentre la página es el término, y un título
 * cortado a la mitad por "· Inspec…" es peor que uno sin marca.
 */
export const siteTitle = (term: string) => {
  const withBrand = `${term} · InspectIA`;
  return withBrand.length <= 60 ? withBrand : term;
};

/** Preguntas y respuestas, con el marcado que Google usa para el acordeón del resultado. */
export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/**
 * Organization, en la home.
 *
 * Sin `foundingDate`, `address` ni perfiles sociales: son datos que no tengo confirmados,
 * y un dato estructurado equivocado es peor que uno ausente porque queda asociado a la
 * entidad en el grafo de Google.
 */
export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InspectIA",
  url: SITE_URL,
  description:
    "Plataforma de inteligencia operativa industrial: OEE, control de calidad, recepción, inventario y control de pedidos, sobre la infraestructura que la planta ya tiene.",
});

/** Migas, para que el resultado de búsqueda muestre la jerarquía y no la URL cruda. */
export const breadcrumbJsonLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: `${SITE_URL}${t.path}`,
  })),
});
