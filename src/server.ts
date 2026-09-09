import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  resolveCanonicalHost,
  resolveLegacyRedirect,
  resolveTrailingSlash,
  withCompression,
  withSecurityHeaders,
} from "./lib/http-policy";
import { LEAD_ENDPOINT, handleLeadPost } from "./lib/lead-intake";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    // Primero de todo: el sitio responde por `inspectia.ai` y por `www.inspectia.ai`, y
    // sólo el ápice es el canónico. Va antes que las heredadas para que
    // `www.inspectia.ai/oee-control/` salga en un solo salto al destino final, y no
    // encadene el cambio de dominio con el de la ruta.
    const host = resolveCanonicalHost(url);
    if (host) return host;

    // Antes del enrutador: así una URL del WordPress anterior sale en un solo 301, en vez
    // de encadenar el 307 de normalización de barra final con el 301 de la ruta.
    const legacy = resolveLegacyRedirect(url);
    if (legacy) return legacy;

    // Después de las heredadas: una URL vieja con barra ya se resolvió arriba en un solo
    // salto, y lo que llega acá es cualquier otra con barra de más.
    const slash = resolveTrailingSlash(url);
    if (slash) return slash;

    // Los formularios del sitio. Va acá y no en una ruta del enrutador porque necesita la
    // clave de Brevo, que sólo existe del lado del servidor: en una ruta de la aplicación
    // terminaría dentro del JavaScript servido.
    if (url.pathname === LEAD_ENDPOINT) {
      return withCompression(withSecurityHeaders(await handleLeadPost(request, env), url), request);
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      // La compresión va por fuera de todo: el manejador de estáticos de Nitro corre
      // dentro del entry, así que el CSS y el JavaScript pasan por esta misma línea.
      return withCompression(
        withSecurityHeaders(await normalizeCatastrophicSsrResponse(response), url),
        request,
      );
    } catch (error) {
      console.error(error);
      return withCompression(
        withSecurityHeaders(
          new Response(renderErrorPage(), {
            status: 500,
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
          url,
        ),
        request,
      );
    }
  },
};
