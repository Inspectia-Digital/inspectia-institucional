import { Link } from "@tanstack/react-router";
import { Calculator, ArrowRight } from "lucide-react";

export function ImpactBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="relative bg-[#084749] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-[#17ccd3]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#17ccd3]">
              Impacto en Logística Inversa
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              La logística inversa cuesta hasta{" "}
              <span className="text-[#17ccd3]">3× más</span> que un envío
              original. Inspeccione el 100% de su salida y elimine este costo
              oculto hoy.
            </h2>
          </div>

          <Link
            to="/roi"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/40 text-[#17ccd3] font-semibold py-3 px-6 hover:bg-[#17ccd3]/25 transition whitespace-nowrap"
          >
            <Calculator className="h-4 w-4" />
            Simular Ahorro en Logística
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
