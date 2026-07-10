import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { RecepcionLanding } from "@/components/recepcion/RecepcionLanding";

export const Route = createFileRoute("/recepcion")({
  head: () => ({
    meta: [
      { title: "Software de Recepción con IA — InspectIA" },
      {
        name: "description",
        content:
          "Audite el ingreso de mercadería en segundos. IA de visión que cuenta y valida unidades con 99.9% de precisión y concilia automáticamente contra su WMS.",
      },
      {
        property: "og:title",
        content: "Software de Recepción con IA — InspectIA",
      },
      {
        property: "og:description",
        content:
          "Erradique errores de proveedores y cuellos de botella en el dock. Conciliación nativa con Cygnus WMS, SAP y otros ERPs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecepcionPage,
});

function RecepcionPage() {
  return (
    <div className="min-h-screen bg-[#041A1B] text-white font-[Poppins]">
      <Navbar />
      <main>
        <RecepcionLanding />
      </main>
      <Footer />
    </div>
  );
}
