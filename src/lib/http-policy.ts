import { SITE_URL } from "@/content/site";

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

/* ---------- Resolución de la ruta, sin construir respuestas ----------
   Están separadas de las tres funciones que sí devuelven una `Response` porque las
   necesitan dos consumidores: la redirección de ruta y la de dominio. Sin esto,
   `www.inspectia.ai/oee-control/` saldría en dos saltos —primero al ápice conservando la
   ruta vieja, después de la ruta vieja al destino— y una cadena de 301 diluye lo que la
   redirección vino a conservar. */

/** El destino heredado de una ruta, o null si no es una URL del WordPress anterior. */
function legacyTargetFor(pathname: string): string | null {
  // Sin barra final, salvo la raíz. Es lo que hace que una sola entrada cubra las dos
  // formas de cada URL, y las que Google conoce son justamente las que terminan en barra.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  return (
    LEGACY_REDIRECTS[path] ??
    (LEGACY_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`)) ? "/" : null)
  );
}

/** La ruta sin la barra final, o null si no había ninguna que sacar. */
function trimmedPathFor(pathname: string): string | null {
  if (pathname === "/" || !pathname.endsWith("/")) return null;
  return pathname.replace(/\/+$/, "");
}

/** La ruta definitiva de una URL: la heredada si la hay, si no la normalizada, si no la
 *  misma. Es lo que permite que el salto de dominio ya llegue al destino final. */
function finalPathFor(url: URL): string {
  return legacyTargetFor(url.pathname) ?? trimmedPathFor(url.pathname) ?? url.pathname;
}

/**
 * `www` al ápice, en 301.
 *
 * El sitio responde por los dos nombres: las dos formas están mapeadas en Cloud Run y
 * hasta hace poco `www` ni siquiera tenía certificado. Ahora lo tiene, y servir el mismo
 * contenido por dos dominios es contenido duplicado —lo que Google indexe en uno no suma
 * al otro—. La canónica ya declara el ápice y eso alcanza para que no se confunda, pero
 * una canónica es una sugerencia y un 301 es una instrucción: consolida la autoridad y
 * deja una sola forma viva.
 *
 * Va **antes que todo lo demás**, incluso antes de las heredadas: si alguien llega a
 * `www.inspectia.ai/oee-control/` tiene que salir en un solo salto al destino final del
 * ápice, y no encadenar el salto de dominio con el de la ruta. Por eso se conserva el
 * pathname completo y la query.
 *
 * El ápice sale de `SITE_URL` y no escrito a mano: si algún día cambia el dominio, cambia
 * en un solo lugar y esto lo sigue.
 */
export function resolveCanonicalHost(url: URL): Response | null {
  if (!url.hostname.startsWith("www.")) return null;

  const apex = new URL(SITE_URL);
  // Sólo redirige el `www` del propio dominio. Si el sitio se sirviera alguna vez desde
  // otro nombre —un preview, una prueba—, esto no tiene por qué opinar.
  if (url.hostname !== `www.${apex.hostname}`) return null;

  return new Response(null, {
    status: 301,
    headers: { location: `${apex.origin}${finalPathFor(url)}${url.search}` },
  });
}

/**
 * Normalización de la barra final, como 301 y no como el 307 del enrutador.
 *
 * El enrutador ya normaliza, pero con un 307, que es temporal: el buscador no consolida
 * la autoridad de la forma con barra en la sin barra, y la duplicación queda viva. Con la
 * migración eso pesa más que antes, porque las quince URLs heredadas terminan en barra.
 *
 * No toca la raíz ni nada que tenga extensión: `/sitemap.xml` no lleva barra y un archivo
 * estático tampoco.
 */
export function resolveTrailingSlash(url: URL): Response | null {
  const trimmed = trimmedPathFor(url.pathname);
  if (trimmed === null) return null;

  return new Response(null, {
    status: 301,
    headers: { location: `${trimmed}${url.search}` },
  });
}

/**
 * Devuelve la respuesta de redirección si la ruta es una URL heredada, o null.
 *
 * Conserva la query: si alguien llega con parámetros de campaña a una URL vieja, esos
 * parámetros tienen que sobrevivir al salto o la visita se atribuye mal.
 */
export function resolveLegacyRedirect(url: URL): Response | null {
  const target = legacyTargetFor(url.pathname);
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

/* ---------------------------------------------------------------------------------------
 * Compresión
 * ------------------------------------------------------------------------------------ */

/**
 * Qué se comprime. Todo lo que sea texto y nada más: un webp o un woff2 ya vienen
 * comprimidos y pasarlos por gzip sólo gasta CPU para dejarlos del mismo tamaño o peor.
 */
const COMPRESSIBLE = /^(?:text\/|application\/(?:json|javascript|xml|rss\+xml)|image\/svg\+xml)/;

/**
 * Comprime la respuesta con gzip.
 *
 * **Por qué existe.** El preset `node-server` de Nitro no comprime nada, y Cloud Run sin
 * balanceador delante tampoco: medido en producción el 9 de septiembre de 2026, la home
 * viajaba con 93 kB de HTML y 101 kB de CSS **en crudo**, con `content-encoding` ausente
 * en las dos. Casi 200 kB de texto que con gzip son unos 25. En un móvil de gama media
 * con red móvil eso es directamente el primer pintado: PageSpeed medía FCP, LCP y Speed
 * Index los tres en el mismo valor, que es la forma que tiene "no se pinta nada hasta que
 * termina de bajar el texto".
 *
 * Se envuelve la respuesta entera —no sólo el HTML— porque el manejador de archivos
 * estáticos de Nitro corre *dentro* del entry, así que el CSS y el JavaScript pasan por
 * acá también.
 *
 * **`CompressionStream` y no `node:zlib` a propósito:** el mismo `server.ts` se compila
 * para Cloudflare Workers, donde `node:zlib` no existe. `CompressionStream` es estándar
 * web y está en los dos. Cuesta el brotli —la especificación sólo define gzip y deflate—,
 * y brotli sobre gzip son unos 3 kB más en esta página: no vale romper el otro destino.
 * Los estáticos sí salen en brotli, precomprimidos en el build por `compressPublicAssets`,
 * y esos llegan acá con `content-encoding` ya puesto y se dejan pasar intactos.
 */
export function withCompression(response: Response, request: Request): Response {
  // Ya comprimida —un estático precomprimido del build—, sin cuerpo, o un código que por
  // definición no lo lleva.
  if (response.headers.has("content-encoding")) return response;
  if (!response.body) return response;
  if (response.status === 204 || response.status === 304) return response;

  if (!/\bgzip\b/i.test(request.headers.get("accept-encoding") ?? "")) return response;
  if (!COMPRESSIBLE.test(response.headers.get("content-type") ?? "")) return response;

  const headers = new Headers(response.headers);
  headers.set("content-encoding", "gzip");
  // El largo declarado es el del cuerpo sin comprimir: dejarlo puesto hace que el cliente
  // corte la lectura antes de tiempo y reciba la página a medias.
  headers.delete("content-length");

  // `Vary` sin duplicar: la misma URL responde distinto según lo que el cliente acepte, y
  // un intermediario que no lo sepa le sirve gzip a quien no lo pidió.
  const vary = headers.get("vary");
  if (!vary) headers.set("vary", "accept-encoding");
  else if (!/\baccept-encoding\b/i.test(vary)) headers.set("vary", `${vary}, accept-encoding`);

  return new Response(response.body.pipeThrough(new CompressionStream("gzip")), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
