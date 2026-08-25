import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente de la web anterior (§9). El contenido de calidad se muda al módulo.
// La ruta se conserva sólo para no perder el enlace: el contenido vive en el destino.
export const Route = createFileRoute("/manufactura")({
  beforeLoad: () => {
    throw redirect({
      to: "/plataforma/$modulo",
      params: { modulo: "control-de-calidad" },
      statusCode: 301,
    });
  },
});
