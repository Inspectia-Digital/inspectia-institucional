import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente del WordPress que servía inspectia.ai hasta la migración.
// Segunda página de contacto, de la plantilla del tema. Quedó indexada por descuido.
// La ruta existe sólo para trasladar el posicionamiento: el contenido vive en el destino.
export const Route = createFileRoute("/contact-page")({
  beforeLoad: () => {
    throw redirect({
      to: "/contacto",
      statusCode: 301,
    });
  },
});
