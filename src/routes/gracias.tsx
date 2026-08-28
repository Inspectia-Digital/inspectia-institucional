import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente del WordPress que servía inspectia.ai hasta la migración.
// Agradecimiento de formulario. Estaba indexable, que ya era un error en sí mismo.
// La ruta existe sólo para trasladar el posicionamiento: el contenido vive en el destino.
export const Route = createFileRoute("/gracias")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
      statusCode: 301,
    });
  },
});
