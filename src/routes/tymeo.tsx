import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente de la web anterior (§9). El contenido se reutiliza casi entero.
// La ruta se conserva sólo para no perder el enlace: el contenido vive en el destino.
export const Route = createFileRoute("/tymeo")({
  beforeLoad: () => {
    throw redirect({
      to: "/plataforma/$modulo",
      params: { modulo: "tymeo" },
      statusCode: 301,
    });
  },
});
