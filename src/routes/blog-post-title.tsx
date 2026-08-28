import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente del WordPress que servía inspectia.ai hasta la migración.
// Ídem. El título era literalmente el marcador de posición del tema.
// La ruta existe sólo para trasladar el posicionamiento: el contenido vive en el destino.
export const Route = createFileRoute("/blog-post-title")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      statusCode: 301,
    });
  },
});
