import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente de la web anterior (§9). Se renombra: "outbound" no lo busca nadie en español.
// La ruta se conserva sólo para no perder el enlace: el contenido vive en el destino.
export const Route = createFileRoute("/outbound")({
  beforeLoad: () => {
    throw redirect({
      to: "/ia/$aplicacion",
      params: { aplicacion: "control-de-pedidos" },
      statusCode: 301,
    });
  },
});
