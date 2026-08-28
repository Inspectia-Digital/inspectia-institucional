/**
 * Redirecciones heredadas y cabeceras de respuesta, aplicadas en el servidor.
 *
 * **Por qué acá y no en `public/_redirects` y `public/_headers`.** Esos dos archivos los
 * lee la plataforma antes de que la petición llegue a la aplicación, y son la forma
 * canónica de hacerlo en Cloudflare Pages. Pero el despliegue real de este sitio los
 * ignora: probado contra el entorno publicado, `/sitemap_index.xml` devolvía 404 en vez de
 * redirigir, y de las seis cabeceras declaradas sólo llegaban tres —las que la plataforma
 * pone por su cuenta—. Un archivo que puede o no leerse según dónde se despliegue no sirve
 * para sostener el posicionamiento de quince URLs.
 *
 * Acá corre siempre, porque corre dentro de la aplicación. Y hay un segundo beneficio: se
 * resuelve **antes** que el enrutador, así que `/oee-control/` sale en un solo 301 en vez
 * de encadenar el 307 de normalización de barra final con el 301 de la ruta.
 */

/**
 * Las URLs que el WordPress anterior tenía indexadas.
 *
 * Las claves van **sin barra final**: `resolveLegacyRedirect` normaliza antes de buscar,
 * así que cada entrada cubre las dos formas. Es importante porque las que Google conoce
 * son justamente las que terminan en barra.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  // Páginas con equivalente directo.
  "/oee-control": "/plataforma/tymeo",
  "/calculadora-roi": "/roi",
  "/autopartista": "/soluciones/autopartista",
  "/alimentos-y-bebidas": "/soluciones/alimentos",

  // Las dos páginas de contacto del sitio anterior. La segunda era de la plantilla.
  "/contact": "/contacto",
  "/contact-page": "/contacto",

  // Páginas de demostración de la plantilla, sin contenido propio, indexadas por descuido.
  "/blog-page": "/",
  "/blog-post-title": "/",

  // Agradecimiento de formulario. Estaba indexable, que ya era un error en sí mismo.
  "/gracias": "/",

  // Los mapas del sitio de WordPress estuvieron declarados en Search Console durante
  // meses. Sin esto pasan a 404 el día del corte y Google reporta errores de rastreo
  // durante semanas sobre unas URLs que ya no controlamos.
  "/sitemap_index.xml": "/sitemap.xml",
  "/page-sitemap.xml": "/sitemap.xml",
  "/post-sitemap.xml": "/sitemap.xml",
  "/wpr_mega_menu-sitemap.xml": "/sitemap.xml",

  // Las tres industrias que el sitio anterior tenía publicadas. Los slugs no coinciden con
  // los del sitio nuevo, así que sin estas entradas las tres se perdían aunque las páginas
  // existan.
  "/cosmetica": "/soluciones/cosmetica",
  "/textil-y-moda": "/soluciones/textil",
  "/maquinaria": "/soluciones/maquinarias",

  // /simulador no figura acá a propósito: la URL se conserva tal cual, con su propia
  // página. Era la que más tráfico de búsqueda traía y el término se pierde si redirige.
};

/** Rutas de WordPress con hijos. El feed lo sigue pegando cualquier lector suscripto. */
const LEGACY_PREFIXES = ["/feed", "/wp-json"];

/**
 * Devuelve la respuesta de redirección si la ruta es una URL heredada, o null.
 *
 * Conserva la query: si alguien llega con parámetros de campaña a una URL vieja, esos
 * parámetros tienen que sobrevivir al salto o la visita se atribuye mal.
 */
export function resolveLegacyRedirect(url: URL): Response | null {
  // Sin barra final, salvo la raíz. Es lo que hace que una sola entrada cubra las dos
  // formas de cada URL.
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;

  const target =
    LEGACY_REDIRECTS[path] ??
    (LEGACY_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`)) ? "/" : undefined);

  if (!target) return null;

  return new Response(null, {
    status: 301,
    headers: { location: `${target}${url.search}` },
  });
}

/**
 * Cabeceras de seguridad.
 *
 * Falta la Content-Security-Policy, y falta a propósito: con el contenedor de etiquetas en
 * el encabezado hace falta un nonce por respuesta, y una CSP mal armada rompe la medición
 * sin avisar. El camino es publicarla primero en `Content-Security-Policy-Report-Only`,
 * mirar el informe una semana con el contenedor real cargado, y recién ahí exigirla.
 */
const SECURITY_HEADERS: Record<string, string> = {
  // El navegador no adivina el tipo de un archivo.
  "x-content-type-options": "nosniff",
  // Nadie nos mete en un iframe: es la defensa contra superponer nuestra página bajo otra
  // y cosechar los clics de "Empezar gratis".
  "x-frame-options": "SAMEORIGIN",
  // Hacia afuera viaja sólo el origen, y sólo si el destino es https.
  "referrer-policy": "strict-origin-when-cross-origin",
  // El sitio no usa cámara, micrófono, ubicación ni pagos. Declararlo apagado corta de
  // raíz que un script de terceros los pida.
  "permissions-policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  // Un año de HTTPS obligatorio. Sin preload: eso se pide una vez y no se revierte rápido.
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  // Aísla el sitio de otros orígenes que lo abran en una ventana emergente.
  "cross-origin-opener-policy": "same-origin",
};

/**
 * Rutas que además llevan la directiva por cabecera y no sólo por meta.
 *
 * El meta viaja en el HTML; la cabecera viaja siempre. Si algún día una de estas se sirve
 * como PDF o como texto plano, el meta no existe y la cabecera sí.
 */
const NOINDEX_PATHS = new Set(["/legales", "/privacidad"]);
const NOINDEX_FILES = new Set(["/sitemap.xml", "/robots.txt"]);

/** Aplica las cabeceras sobre la respuesta, sin pisar lo que la respuesta ya declare. */
export function withSecurityHeaders(response: Response, url: URL): Response {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(key)) headers.set(key, value);
  }

  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
  if (NOINDEX_PATHS.has(path)) headers.set("x-robots-tag", "noindex, follow");
  else if (NOINDEX_FILES.has(path)) headers.set("x-robots-tag", "noindex");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
