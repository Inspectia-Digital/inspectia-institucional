import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { OutboundLanding } from "@/components/outbound/OutboundLanding";

export const Route = createFileRoute("/outbound")({
  head: () => ({
    meta: [
      { title: "Control de Armado de Pedidos (Outbound) — InspectIA" },
      {
        name: "description",
        content:
          "Visión artificial para mesas de empaque: Canal Verde/Rojo, auditoría anti-reclamos y conciliación nativa con Cygnus, SAP y TMS. Cero errores en despacho.",
      },
      {
        property: "og:title",
        content: "Control de Armado de Pedidos (Outbound) — InspectIA",
      },
      {
        property: "og:description",
        content:
          "Automatice la validación de sus despachos y elimine reclamos por faltantes con visión artificial en tiempo real.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OutboundPage,
});

function OutboundPage() {
  return (
    <div className="min-h-screen bg-[#041A1B] text-white font-[Poppins]">
      <Navbar />
      <main>
        <OutboundLanding />
      </main>
      <Footer />
    </div>
  );
}
