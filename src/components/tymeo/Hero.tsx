import { ArrowRight, CheckCircle2, LayoutGrid } from "lucide-react";
import { OeeGaugeCard } from "./OeeGaugeCard";

export function Hero() {
  return (
    <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
      {/* LEFT: Copy */}
      <div>
        <span className="inline-block bg-[#17ccd3]/10 text-[#17ccd3] border border-[#17ccd3]/30 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
          Planes TYMEO · Módulo de InspectIA OS
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] max-w-xl">
          Todo lo que pasa en tu planta,{" "}
          <span className="bg-gradient-to-r from-[#17ccd3] to-emerald-300 bg-clip-text text-transparent">
            en un solo lugar
          </span>
          .
        </h1>
        <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
          OEE en tiempo real, turnos, paradas, personal y producción — sin planillas sueltas ni
          sistemas desconectados entre sí. Empezá gratis con un formulario, y sumá sensores cuando
          estés listo, sin cambiar de plataforma.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#planes"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
          >
            Empezar gratis
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#modulos"
            className="inline-flex items-center gap-2 rounded-full border border-slate-500 text-white font-semibold py-3 px-6 hover:bg-white/5 transition"
          >
            <LayoutGrid className="h-4 w-4" />
            Ver qué incluye cada plan
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
          <li className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#17ccd3]" />
            Sin tarjeta de crédito
          </li>
          <li className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#17ccd3]" />
            Implementación en días si necesitás hardware
          </li>
        </ul>
      </div>

      {/* RIGHT: Live OEE gauge */}
      <div className="relative">
        <div className="absolute -inset-10 bg-[#17ccd3]/20 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10">
          <OeeGaugeCard />
        </div>
      </div>
    </section>
  );
}
