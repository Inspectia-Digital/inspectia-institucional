// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Destino del build, elegido por entorno.
 *
 * El repo se construye desde dos lados y cada uno necesita una salida distinta: Lovable
 * despliega a Cloudflare Workers, que es el destino por omisión del preset de Lovable, y
 * el contenedor de Cloud Run necesita un servidor Node de verdad —un `index.mjs` que
 * escuche en un puerto—, que es el preset `node-server`.
 *
 * Va por variable de entorno y no cableado a `node-server` justamente por eso: dejarlo
 * fijo rompería el despliegue de Lovable sin avisar. Sin la variable, todo queda como
 * estaba; el Dockerfile la setea.
 */
const preset = process.env.NITRO_PRESET;

/**
 * Configuración de Nitro para el contenedor de Cloud Run, que es producción.
 *
 * **Lo que hay que saber antes de tocar nada de acá: Nitro sirve `public/` en un
 * middleware global que corre ANTES del entry del servidor.** O sea que `src/server.ts` no
 * ve jamás una petición de `/favicon.ico`, `/sitemap.xml`, `/img/**` ni `/assets/**`: para
 * cuando le tocaría, el archivo ya se entregó. Verificado leyendo el build —el orden es
 * `[routeRuleMiddleware, ...globalMiddleware, rutas]`— y comprobado contra producción el 9
 * de septiembre de 2026, donde `/privacidad` traía las cabeceras y los archivos ninguna.
 *
 * De ahí sale todo lo de abajo: lo que tenga que aplicar a un archivo de `public/` va en
 * `routeRules`, que es lo único que corre antes que ese middleware. Un middleware propio
 * declarado en `handlers` NO sirve: se registra después del de estáticos, probado.
 *
 * **El cast es a la firma de Lovable, no a Nitro.** `@lovable.dev/vite-tanstack-config`
 * declara su campo `nitro` con tres claves —preset, output, cloudflare— y no reexporta el
 * tipo entero de Nitro. Las opciones llegan igual: comprobado sobre el build. Si el
 * paquete algún día amplía el tipo, el cast se borra y compila solo.
 */
const nitroConfig = {
  preset,

  /* Deja un .br y un .gz junto a cada archivo de `public/` y de `assets/`, y el servidor
   * entrega el que el cliente acepte. Sin esto el CSS viajaba en crudo: 101 kB medidos en
   * producción con `content-encoding` ausente, bloqueando el primer pintado en móvil.
   *
   * Cubre los estáticos y nada más. El HTML del renderizado en servidor se arma por
   * petición y no existe en el build, así que ése lo comprime `withCompression` en
   * `src/server.ts`. Hacen falta los dos. */
  compressPublicAssets: { gzip: true, brotli: true },

  routeRules: {
    /* Las dos cabeceras que sí significan algo en una respuesta que no es un documento.
     *
     * `withSecurityHeaders` pone seis y no llega hasta acá. De esas seis, cuatro
     * —x-frame-options, referrer-policy, permissions-policy y cross-origin-opener-policy—
     * sólo tienen efecto sobre un documento que el navegador navega: en un .webp o en un
     * .css las ignora, y copiarlas sería ruido que aparenta política.
     *
     * Las dos que quedan sí valen sobre un archivo: `nosniff` evita que el navegador
     * adivine el tipo —el caso feo es un archivo servido con el tipo equivocado que el
     * navegador decide interpretar como HTML— y HSTS conviene en toda respuesta, no sólo
     * en la primera que el visitante pide.
     *
     * Comprobado sobre el build: en las rutas SSR **no se duplican** —siguen saliendo una
     * sola vez, porque `withSecurityHeaders` las escribe con `set`— y la regla propia de
     * Nitro que cachea `/assets/**` un año sigue en pie: se fusionan, no se pisan. */
    "/**": {
      headers: {
        "x-content-type-options": "nosniff",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
      },
    },

    /* Los dos archivos los genera el prebuild y quedan en `public/`, así que caen del lado
     * de los estáticos y el `noindex` no puede vivir en `withSecurityHeaders`. Estuvo
     * declarado ahí, en un `NOINDEX_FILES`, y no se ejecutó una sola vez: el código se leía
     * bien, no fallaba, y la cabecera no salía. */
    "/sitemap.xml": { headers: { "x-robots-tag": "noindex" } },
    "/robots.txt": { headers: { "x-robots-tag": "noindex" } },
  },
} as { preset?: string };

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Sin preset queda todo como estaba, que es lo que necesita el build de Lovable a
  // Cloudflare: ahí Workers comprime en el borde y pone sus propias cabeceras, y esa
  // salida es una vista previa que no está indexada.
  ...(preset ? { nitro: nitroConfig } : {}),
});
