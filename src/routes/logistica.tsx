import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LogisticaLanding } from "@/components/logistica/LogisticaLanding";

export const Route = createFileRoute("/logistica")({
  head: () => ({
    meta: [
      { title: "Supply Chain & Logística — InspectIA OS" },
      {
        name: "description",
        content:
          "Plataforma de visión artificial para Supply Chain: recepción, control de stock con drones, picking móvil y armado de pedidos. Cero puntos ciegos, integración nativa con Cygnus y SAP.",
      },
      { property: "og:title", content: "Supply Chain & Logística — InspectIA OS" },
      {
        property: "og:description",
        content:
          "Orqueste su almacén con IA de extremo a extremo. Inbound, storage y outbound conectados a su WMS en tiempo real.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LogisticaPage,
});

function LogisticaPage() {
  return (
    <div className="min-h-screen bg-[#041A1B] text-white font-[Poppins]">
      <Navbar />
      <main>
        <LogisticaLanding />
      </main>
      <Footer />
    </div>
  );
}
