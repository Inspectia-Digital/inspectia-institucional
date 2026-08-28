import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente del WordPress que servía inspectia.ai hasta la migración.
// Equivalencia directa, y la página nueva es mejor.
// La ruta existe sólo para trasladar el posicionamiento: el contenido vive en el destino.
export const Route = createFileRoute("/calculadora-roi")({
  beforeLoad: () => {
    throw redirect({
      to: "/roi",
      statusCode: 301,
    });
  },
});
