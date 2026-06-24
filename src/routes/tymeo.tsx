import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { TymeoLanding } from "@/components/tymeo/TymeoLanding";

export const Route = createFileRoute("/tymeo")({
  head: () => ({
    meta: [
      { title: "TYMEO OEE — Productividad en tiempo real | InspectIA" },
      {
        name: "description",
        content:
          "Mide el OEE de tu planta en tiempo real. Empieza gratis con formularios móviles o escala a integración PLC en menos de 15 días.",
      },
      {
        property: "og:title",
        content: "TYMEO OEE — Productividad en tiempo real | InspectIA",
      },
      {
        property: "og:description",
        content:
          "Olvida las planillas. TYMEO expone cuellos de botella ocultos al instante. Asset-light, time-to-value < 15 días.",
      },
    ],
  }),
  component: TymeoPage,
});

function TymeoPage() {
  return (
    <div className="min-h-screen bg-[#041A1B] text-white font-[Poppins]">
      <Navbar />
      <main className="pt-8 pb-12">
        <TymeoLanding />
      </main>
      <Footer />
    </div>
  );
}
