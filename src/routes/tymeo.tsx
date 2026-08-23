import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { TymeoLanding } from "@/components/tymeo/TymeoLanding";
import { FAQ_ITEMS } from "@/components/tymeo/Faq";

const TITLE = "Planes TYMEO — Toda tu planta en un solo lugar | InspectIA";
const DESCRIPTION =
  "OEE en tiempo real, turnos, paradas, personal y producción en una sola plataforma. Empezá gratis sin hardware y sumá sensores cuando estés listo.";

export const Route = createFileRoute("/tymeo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
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
