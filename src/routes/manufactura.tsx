import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ManufacturaLanding } from "@/components/manufactura/ManufacturaLanding";

export const Route = createFileRoute("/manufactura")({
  head: () => ({
    meta: [
      { title: "Manufactura Inteligente — InspectIA OS" },
      {
        name: "description",
        content:
          "Suite de Manufactura 4.0: OEE en tiempo real e inspección de calidad por IA con integración nativa a PLCs Siemens y Allen Bradley. Cero scrap, cero downtime.",
      },
      { property: "og:title", content: "Manufactura Inteligente — InspectIA OS" },
      {
        property: "og:description",
        content:
          "Producción continua y cero defectos. Unifique OEE y control de calidad milimétrico en una sola plataforma conectada a su piso de planta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ManufacturaPage,
});

function ManufacturaPage() {
  return (
    <div className="min-h-screen bg-[#041A1B] text-white font-[Poppins]">
      <Navbar />
      <main>
        <ManufacturaLanding />
      </main>
      <Footer />
    </div>
  );
}
