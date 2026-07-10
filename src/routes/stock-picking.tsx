import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { StockLanding } from "@/components/stock/StockLanding";

export const Route = createFileRoute("/stock-picking")({
  head: () => ({
    meta: [
      { title: "App de Control de Stock y Picking con IA — InspectIA" },
      {
        name: "description",
        content:
          "Cuente el stock real con una foto. Visión artificial en el smartphone de cada operario: conteo oportunístico, precisión 99.9% y sincronización nativa con su WMS.",
      },
      {
        property: "og:title",
        content: "App de Control de Stock y Picking con IA — InspectIA",
      },
      {
        property: "og:description",
        content:
          "Erradique el descuadre de inventario con conteo por visión artificial e integración nativa con Cygnus, SAP y otros WMS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StockPickingPage,
});

function StockPickingPage() {
  return (
    <div className="min-h-screen bg-[#041A1B] text-white font-[Poppins]">
      <Navbar />
      <main>
        <StockLanding />
      </main>
      <Footer />
    </div>
  );
}
