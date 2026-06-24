import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { MoatBento } from "@/components/site/MoatBento";
import { AudienceTabs } from "@/components/site/AudienceTabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InspectIA — Inteligencia Artificial Industrial" },
      {
        name: "description",
        content:
          "Plataforma de visión artificial, drones autónomos y sensores para control de calidad, OEE e inventarios. Integración nativa con PLC, WMS, ERP, MES y TMS.",
      },
      { property: "og:title", content: "InspectIA — Inteligencia Artificial Industrial" },
      {
        property: "og:description",
        content:
          "Resultados a partir de los 15 días. Repago menor a 6 meses para fábricas y operaciones logísticas.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <MoatBento />
        <AudienceTabs />
      </main>
    </div>
  );
}
