import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente de la web anterior (§9).
// La ruta se conserva sólo para no perder el enlace: el contenido vive en el destino.
export const Route = createFileRoute("/recepcion")({
  beforeLoad: () => {
    throw redirect({
      to: "/ia/$aplicacion",
      params: { aplicacion: "recepcion" },
      statusCode: 301,
    });
  },
});
