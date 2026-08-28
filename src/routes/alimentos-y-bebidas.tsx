import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente del WordPress que servía inspectia.ai hasta la migración.
// Equivalencia directa, con cambio de slug.
// La ruta existe sólo para trasladar el posicionamiento: el contenido vive en el destino.
export const Route = createFileRoute("/alimentos-y-bebidas")({
  beforeLoad: () => {
    throw redirect({
      to: "/soluciones/$industria",
      params: { industria: "alimentos" },
      statusCode: 301,
    });
  },
});
