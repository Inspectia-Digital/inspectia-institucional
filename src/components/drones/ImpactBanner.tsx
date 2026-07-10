import { Link } from "@tanstack/react-router";
import { Calculator, ArrowRight } from "lucide-react";

export function ImpactBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="relative bg-[#084749] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-[#17ccd3]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#17ccd3]">
              Impacto Logístico
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Reduzca el tiempo de conteo cíclico de{" "}
              <span className="text-[#17ccd3]">semanas a horas</span>. Libere
              el capital de trabajo atrapado en stock fantasma.
            </h2>
          </div>

          <Link
            to="/roi"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/40 text-[#17ccd3] font-semibold py-3 px-6 hover:bg-[#17ccd3]/25 transition whitespace-nowrap"
          >
            <Calculator className="h-4 w-4" />
            Simular ROI Logístico
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
