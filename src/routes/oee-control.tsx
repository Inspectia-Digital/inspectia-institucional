import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente del WordPress que servía inspectia.ai hasta la migración.
// Era la página más pesada del sitio anterior y la más reciente: la que más tenía
// para perder si esto no estuviera.
// La ruta existe sólo para trasladar el posicionamiento: el contenido vive en el destino.
export const Route = createFileRoute("/oee-control")({
  beforeLoad: () => {
    throw redirect({
      to: "/plataforma/$modulo",
      params: { modulo: "tymeo" },
      statusCode: 301,
    });
  },
});
