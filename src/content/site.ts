/**
 * Destinos y constantes del sitio. Un solo lugar: antes el enlace de la demo estaba en
 * lib/links.ts como TODO y LeadForm.tsx repetía otro placeholder por su cuenta, así que
 * ninguno de los dos apuntaba a nada.
 */

/**
 * Origen canónico del sitio. Lo consumen el sitemap, el robots.txt y las canónicas.
 *
 * Sale del entorno para que el preview y producción no se declaren la misma URL —dos
 * dominios que dicen ser canónicos del mismo contenido es contenido duplicado—.
 *
 * TODO(equipo): confirmar el dominio definitivo. inspectia.ai sale de que la aplicación
 * vive en app.inspectia.ai, pero no está escrito en ninguna parte del documento.
 */
export const SITE_URL: string =
  // `import.meta.env` no existe cuando el script del sitemap importa este archivo desde
  // Node a secas; el encadenamiento opcional lo deja caer en el valor por omisión.
  (import.meta.env?.VITE_SITE_URL ?? "https://inspectia.ai").replace(/\/+$/, "");

/**
 * Agendar tiene que ser un clic. El botón abre el calendario de InspectIA en pestaña
 * nueva: sin página intermedia, sin formulario propio y sin calendario embebido (§7.10).
 *
 * Consecuencia asumida: la confirmación ocurre en el dominio de Google, así que lo que
 * mide GTM es el clic, y la asistencia real se concilia después contra la agenda.
 */
export const DEMO_URL = "https://calendar.app.google/d7qzAWBDus9R3JsB9";

/** Alta de cuenta con plan gratuito. Pesa igual que la demo: son los dos caminos de
 *  compra, no un botón principal y un secundario (§8).
 *  TODO(equipo): confirmar la URL definitiva del registro. */
export const SIGNUP_URL = "https://app.inspectia.ai/registro";

/** Ingresar a la aplicación. Enlace de texto, nunca botón. */
export const APP_URL = "https://app.inspectia.ai";

/** TODO(equipo): falta el número. Va debajo del par de botones en la banda de cierre. */
export const WHATSAPP_URL: string | null = null;

/**
 * Contacto del pie. §11.12 pide teléfono, mail y LinkedIn como enlaces reales y no como
 * texto plano. El footer anterior tenía un enlace a linkedin.com a secas, así que los
 * tres entran como pendientes: lo que es null no se renderiza, en vez de publicar un
 * enlace que no lleva a ninguna parte.
 */
export const CONTACT = {
  /** TODO(equipo): teléfono comercial. */
  phone: null as string | null,
  /** TODO(equipo): casilla comercial. */
  email: null as string | null,
  /** TODO(equipo): URL de la página de empresa en LinkedIn. */
  linkedin: null as string | null,
};

/**
 * Precios no se publica hasta tener el precio de todos los módulos (§7.6): con uno solo
 * publicado la promesa de transparencia se rompe sola. La sección se construye y queda
 * fuera del aire; mientras tanto la entrada comercial es el plan gratuito.
 */
export const SHOW_PRICING = false;

/**
 * Recursos entra completo, con las pillar pages escritas, o no entra (§7.11). Un hub con
 * tres artículos y cuatro categorías vacías resta credibilidad.
 */
export const SHOW_RESOURCES = false;
