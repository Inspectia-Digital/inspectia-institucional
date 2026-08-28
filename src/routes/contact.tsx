import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente del WordPress que servía inspectia.ai hasta la migración.
// La página de contacto del sitio anterior, ahora en castellano.
// La ruta existe sólo para trasladar el posicionamiento: el contenido vive en el destino.
export const Route = createFileRoute("/contact")({
  beforeLoad: () => {
    throw redirect({
      to: "/contacto",
      statusCode: 301,
    });
  },
});
