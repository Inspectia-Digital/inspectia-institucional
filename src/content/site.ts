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

/**
 * Alta de cuenta con plan gratuito. Pesa igual que la demo: son los dos caminos de
 * compra, no un botón principal y un secundario (§8).
 *
 * **Apuntaba a `/registro` y esa ruta no existe.** El botón primario de todo el sitio
 * caía en la pantalla de 404 de la propia aplicación —"No encontramos esta página"—, que
 * es el peor lugar posible para mandar a alguien que acaba de decidir probar el producto.
 * Era un TODO sin confirmar desde el principio; ahora está comprobado que estaba mal.
 *
 * Va a la raíz porque **hoy no hay una URL de alta directa**. La aplicación recibe con una
 * portada que ofrece "Iniciar sesión o registrarse", y ese botón abre el login universal
 * de Auth0, que es donde efectivamente se crea la cuenta. Un clic más de lo ideal, pero
 * funciona, que es más de lo que se puede decir de lo anterior.
 *
 * TODO(app): la solución de verdad es una ruta `/registro` en la aplicación que vaya
 * derecho al alta —Auth0 lo soporta con `screen_hint=signup`—. No se puede armar esa URL
 * desde acá: el enlace de Auth0 lleva `state`, `nonce` y PKCE que genera el SDK de la
 * aplicación en el momento, así que escribirlo a mano en el sitio se rompe solo. Cuando
 * esa ruta exista, esta constante vuelve a apuntar ahí.
 */
export const SIGNUP_URL = "https://app.inspectia.ai/";

/** Ingresar a la aplicación. Enlace de texto, nunca botón. */
export const APP_URL = "https://app.inspectia.ai";

/**
 * WhatsApp. Va como enlace de texto debajo del par de botones en la banda de cierre.
 *
 * El número lleva un **9 que el teléfono de `CONTACT` no tiene**, y no es una errata: es
 * la misma línea, y WhatsApp exige ese 9 después del 54 para los móviles argentinos. Sin
 * él el enlace abre una conversación con un número que no existe. Que no lo "corrija"
 * nadie por hacerlo coincidir con el teléfono de arriba.
 *
 * `wa.me` es el formato corto oficial, y sin mensaje previo: un texto puesto por nosotros
 * en el campo de quien escribe es presuntuoso y lo primero que la persona borra.
 */
export const WHATSAPP_URL: string | null = "https://wa.me/5491134693537";

/**
 * Contacto del pie. §11.12 pide enlaces reales y no texto plano, así que lo que es null
 * simplemente no se renderiza, en vez de publicar un enlace que no lleva a ninguna parte.
 */
/**
 * Oficinas comerciales.
 *
 * **No confundir con el domicilio legal.** El de la cláusula 15 de los términos —La Pampa
 * 2208— es el domicilio fiscal de la sociedad y vive dentro del texto que firmó legal;
 * ése no se toca ni se reemplaza por éstos. Estas dos son las direcciones a las que
 * efectivamente va alguien que quiere visitarnos.
 *
 * Los campos van partidos y no como una línea sola porque el dato estructurado de
 * schema.org pide calle, localidad, provincia y código postal por separado, y armarlo
 * después parseando un string es la clase de cosa que se rompe con la primera dirección
 * que no siga el formato.
 */
export type Office = {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: "AR";
};

export const OFFICES: Office[] = [
  {
    street: "25 de Mayo 459, piso 9",
    locality: "Ciudad Autónoma de Buenos Aires",
    region: "Ciudad Autónoma de Buenos Aires",
    postalCode: "C1002ABI",
    country: "AR",
  },
  {
    street: "Av. Sucre 1627",
    locality: "San Isidro",
    region: "Provincia de Buenos Aires",
    postalCode: "B1642",
    country: "AR",
  },
];

/** Una línea, para mostrar. La provincia se omite cuando repite a la localidad:
 *  "Ciudad Autónoma de Buenos Aires, Ciudad Autónoma de Buenos Aires" no es una dirección,
 *  es un error de plantilla. */
export const officeLine = (o: Office) =>
  [o.street, o.locality, o.region === o.locality ? null : o.region, o.postalCode]
    .filter(Boolean)
    .join(", ");

export const CONTACT = {
  /** Confirmados por la cláusula 15 de los términos y condiciones, que es el documento
   *  donde legal los publicó. Antes de eso los dos eran null y el pie iba sin contacto. */
  phone: "+54 11 3469 3537" as string | null,
  email: "contacto@inspectia.ai" as string | null,
  /** La página de empresa, tomada del pie del WordPress que sirve inspectia.ai hoy: es la
   *  que la propia empresa venía publicando, no una que haya que adivinar. */
  linkedin: "https://www.linkedin.com/company/inspectia-ai/" as string | null,
};

/**
 * A dónde va el alta al newsletter.
 *
 * **Mientras sea null el formulario no se renderiza.** Un campo de correo que no manda
 * el dato a ninguna parte es peor que no tenerlo: alguien se suscribe, ve la
 * confirmación y nunca recibe nada.
 *
 * TODO(equipo): falta el destino —lista, CRM o webhook—. Es el mismo pendiente que
 * tienen el informe del ROI y la postulación de partners: los tres formularios del sitio
 * están hoy sin destino.
 */
export const NEWSLETTER_ENDPOINT: string | null = null;

/**
 * Precios no se publica hasta tener el precio de todos los módulos (§7.6): con uno solo
 * publicado la promesa de transparencia se rompe sola. La sección se construye y queda
 * fuera del aire; mientras tanto la entrada comercial es el plan gratuito.
 */
export const SHOW_PRICING = false;

/**
 * La sección de seguridad y datos de /plataforma.
 *
 * El texto afirma sólo lo que el producto ya hace —aislamiento por empresa, permisos por
 * planta y auditoría de accesos— y no dice nada sobre dónde viven los datos ni cómo se
 * cifran. Aun así queda apagada hasta que infraestructura la revise: en una venta grande,
 * cada frase de esa sección va derecho a legales.
 */
export const SHOW_SECURITY_SECTION = false;

/**
 * Recursos entra completo, con las pillar pages escritas, o no entra (§7.11). Un hub con
 * tres artículos y cuatro categorías vacías resta credibilidad.
 */
export const SHOW_RESOURCES = false;
