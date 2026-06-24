import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { RoiSimulator } from "@/components/roi/RoiSimulator";

export const Route = createFileRoute("/roi")({
  head: () => ({
    meta: [
      { title: "Simulador de ROI — InspectIA" },
      {
        name: "description",
        content:
          "Central de Simulación Financiera de InspectIA. Calculá el ROI y tiempo de repago de los módulos de visión artificial, OEE, drones y control de stock.",
      },
      { property: "og:title", content: "Simulador de ROI — InspectIA" },
      {
        property: "og:description",
        content:
          "Proyectá el retorno de inversión y el tiempo de repago de InspectIA OS en minutos.",
      },
    ],
  }),
  component: RoiPage,
});

function RoiPage() {
  return (
    <div className="min-h-screen bg-[#041A1B] text-white font-[Poppins]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-12 pb-24">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Simulador de Impacto Financiero y ROI
          </h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Seleccione el módulo que desea evaluar y proyecte el retorno de
            inversión (ROI) estimado y el tiempo de repago de InspectIA OS
            basado en las métricas reales de su operación.
          </p>
        </header>

        <RoiSimulator />
      </main>
    </div>
  );
}
