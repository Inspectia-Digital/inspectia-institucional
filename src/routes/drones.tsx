import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { DronesLanding } from "@/components/drones/DronesLanding";

export const Route = createFileRoute("/drones")({
  head: () => ({
    meta: [
      { title: "Control de Stock con Drones — InspectIA" },
      {
        name: "description",
        content:
          "Drones autónomos con navegación SLAM sin GPS para auditar racks altos, conciliar posiciones con su WMS y erradicar el trabajo en altura.",
      },
      { property: "og:title", content: "Control de Stock con Drones — InspectIA" },
      {
        property: "og:description",
        content:
          "Auditoría aérea del 100% de sus posiciones de sobrestock. Sin GPS, sin riesgos, sin frenar la operación.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DronesPage,
});

function DronesPage() {
  return (
    <div className="min-h-screen bg-[#041A1B] text-white font-[Poppins]">
      <Navbar />
      <main>
        <DronesLanding />
      </main>
      <Footer />
    </div>
  );
}
