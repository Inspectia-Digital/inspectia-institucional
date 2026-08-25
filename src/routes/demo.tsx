import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEMO_URL } from "@/content/site";

/**
 * /demo no renderiza nada: redirige al calendario de InspectIA (§7.10).
 *
 * Agendar tiene que ser un clic, así que los botones del sitio van directo al calendario.
 * Esta ruta existe sólo para tener una URL propia que usar en campañas y poder medirla.
 *
 * `href` y no `to`: el destino es externo y el redirect tipado del router sólo conoce las
 * rutas del sitio.
 */
export const Route = createFileRoute("/demo")({
  beforeLoad: () => {
    throw redirect({ href: DEMO_URL, statusCode: 302 });
  },
});
