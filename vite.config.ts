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

/* `compressPublicAssets` deja un .br y un .gz junto a cada archivo de `public/` y de
 * `assets/` en el build, y el servidor entrega el que el cliente acepte. Sin esto el CSS
 * viajaba en crudo: 101 kB medidos en producción el 9 de septiembre de 2026, con
 * `content-encoding` ausente, bloqueando el primer pintado en móvil.
 *
 * Cubre los estáticos y nada más. El HTML del renderizado en servidor se arma por petición
 * y no existe en el build, así que ése lo comprime `withCompression` en `src/server.ts`.
 * Hacen falta los dos.
 *
 * **El cast es a la firma de Lovable, no a Nitro.** `@lovable.dev/vite-tanstack-config`
 * declara su campo `nitro` con tres claves —preset, output, cloudflare— y no reexporta el
 * tipo entero de Nitro. Las opciones llegan igual: comprobado sobre el build. Si el
 * paquete algún día amplía el tipo, el cast se borra y compila solo. */
const nitroConfig = {
  preset,
  compressPublicAssets: { gzip: true, brotli: true },

  /* El `noindex` de los dos archivos generados **tiene que vivir acá y no en
   * `withSecurityHeaders`**, que es donde estuvo declarado y nunca se ejecutó.
   *
   * El middleware de estáticos de Nitro resuelve todo lo que existe en `public/` antes de
   * llegar al entry del servidor, así que `src/server.ts` no ve jamás una petición de
   * `/sitemap.xml` ni de `/robots.txt`: los genera el prebuild y quedan como archivos.
   * El síntoma es silencioso —el código está escrito, se lee bien y no corre— y costó una
   * afirmación falsa: se dio por puesta una cabecera que en producción no salía.
   * Comprobado el 9 de septiembre de 2026, `/privacidad` traía las cuatro cabeceras y los
   * dos archivos ninguna.
   *
   * `routeRules` sí corre antes que el middleware de estáticos, que es lo que hace falta.
   * Comprobado sobre el build: los dos archivos salen con la cabecera, `/favicon.ico`
   * sigue sin ella y `/privacidad` conserva su `noindex, follow` propio.
   *
   * Va sólo con preset, o sea en el contenedor de Cloud Run, que es producción. El build
   * de Lovable a Cloudflare no las lleva: es una vista previa y no está indexada. */
  routeRules: {
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
  /* `compressPublicAssets` deja un .br y un .gz junto a cada archivo de `public/` y de
   * `assets/` en el build, y el servidor sirve el que el cliente acepte. Va sólo con
   * preset porque en Cloudflare no hace falta: Workers comprime en el borde.
   *
   * Cubre los estáticos y nada más. El HTML del renderizado en servidor se arma por
   * petición y no existe en el build, así que ése lo comprime `withCompression` en
   * `src/server.ts`. Hacen falta los dos. */
  ...(preset ? { nitro: nitroConfig } : {}),
});
