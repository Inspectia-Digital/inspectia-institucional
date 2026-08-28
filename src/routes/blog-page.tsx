import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente del WordPress que servía inspectia.ai hasta la migración.
// Página de demostración de la plantilla, sin contenido propio, indexada por descuido.
// La ruta existe sólo para trasladar el posicionamiento: el contenido vive en el destino.
export const Route = createFileRoute("/blog-page")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      statusCode: 301,
    });
  },
});
