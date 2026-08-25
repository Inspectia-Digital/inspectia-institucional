import { createFileRoute, redirect } from "@tanstack/react-router";

// Redirección permanente (§9). Logística deja de ser un producto y pasa a ser una
// industria: es la mitad del reordenamiento del sitio, no un cambio de URL.
export const Route = createFileRoute("/logistica")({
  beforeLoad: () => {
    throw redirect({
      to: "/soluciones/$industria",
      params: { industria: "logistica" },
      statusCode: 301,
    });
  },
});
