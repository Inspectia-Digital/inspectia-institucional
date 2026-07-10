import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const METRICS = [
  { value: "24 → 15", label: "FTEs (Reducción de headcount)" },
  { value: "−40%", label: "Lead Time Dock-to-Stock" },
  { value: "+$240k", label: "USD en Capital Liberado" },
];

export function ExpoyerBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="relative bg-[#084749] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-[#17ccd3]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="lg:max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#17ccd3]">
              Caso de Éxito · Expoyer
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white leading-tight">
              El impacto real en una operación de alto volumen.
            </h2>
            <Link
              to="/roi"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#17ccd3]/40 text-[#17ccd3] font-semibold py-2.5 px-5 hover:bg-[#17ccd3]/10 transition"
            >
              Simular ROI para mi operación
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
            {METRICS.map((m) => (
              <div key={m.label} className="text-center lg:text-left">
                <p className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-[#17ccd3] leading-none">
                  {m.value}
                </p>
                <p className="mt-2 text-xs md:text-sm text-slate-300">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
