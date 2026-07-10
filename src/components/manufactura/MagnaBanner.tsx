import { Link } from "@tanstack/react-router";
import { Calculator, ArrowRight } from "lucide-react";

export function MagnaBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="rounded-3xl bg-[#084749] border border-white/10 overflow-hidden">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-8 md:p-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
              Caso Magna Seating
            </span>
            <p className="mt-4 text-2xl md:text-3xl font-bold text-white leading-tight">
              Control de{" "}
              <span className="bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent">
                70 tipos de fallas
              </span>{" "}
              en menos de 1 minuto.
            </p>
            <p className="mt-3 text-slate-300">
              Inspección multivariable sobre asientos automotrices con
              descarte automático vía PLC.
            </p>
          </div>
          <div className="p-8 md:p-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
              Impacto Operativo
            </span>
            <p className="mt-4 text-2xl md:text-3xl font-bold text-white leading-tight">
              Reducción radical de{" "}
              <span className="bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent">
                downtime
              </span>{" "}
              y aumento de productividad.
            </p>
            <p className="mt-3 text-slate-300">
              Datos objetivos en tiempo real que convierten paradas invisibles
              en decisiones de gerencia.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#041A1B]/40">
          <p className="text-sm text-slate-300 text-center sm:text-left">
            Proyecte estos números sobre <span className="text-white font-semibold">su propia planta</span>.
          </p>
          <Link
            to="/roi"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] px-5 py-2.5 text-sm font-bold text-[#041A1B] hover:brightness-110 transition"
          >
            <Calculator className="h-4 w-4" /> Simular ROI de Manufactura
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
