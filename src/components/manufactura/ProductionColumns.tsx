import { Link } from "@tanstack/react-router";
import { Gauge, Camera, ArrowRight, Cog, Cpu } from "lucide-react";

export function ProductionColumns() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Inteligencia inyectada en el corazón de su línea.
        </h2>
        <p className="mt-4 text-slate-400">
          Dos módulos que atacan las dos métricas críticas de manufactura:
          <span className="text-white"> tiempo perdido</span> y{" "}
          <span className="text-white">calidad rechazada</span>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* TYMEO */}
        <Link
          to="/tymeo"
          className="group relative flex flex-col rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 hover:border-[#17ccd3]/50 hover:shadow-[0_0_50px_rgba(23,204,211,0.2)] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
              01 · Eficiencia & Productividad
            </span>
            <span className="inline-flex h-3 w-3 rounded-full bg-[#17ccd3] shadow-[0_0_12px_rgba(23,204,211,0.9)]" />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
              <Gauge className="h-8 w-8" />
            </div>
            <Cog className="h-7 w-7 text-[#17ccd3]/60 animate-spin-slow" />
          </div>

          <h3 className="mt-5 text-2xl md:text-3xl font-bold text-white">
            Suite TYMEO OEE
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed flex-1">
            Monitoreo de tiempos, disponibilidad y cuellos de botella en
            tiempo real. Capture datos desde el celular del operario o
            conectando sensores IoT a la máquina.
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-[#17ccd3]/40 bg-[#17ccd3]/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
              Repago en &lt; 15 días
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#17ccd3]">
              Explorar módulo de Productividad
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

        {/* QCaaS */}
        <a
          href="#calidad"
          className="group relative flex flex-col rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 hover:border-[#17ccd3]/50 hover:shadow-[0_0_50px_rgba(23,204,211,0.2)] transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
              02 · Calidad Automatizada
            </span>
            <span className="inline-flex h-3 w-3 rounded-full bg-[#17ccd3] shadow-[0_0_12px_rgba(23,204,211,0.9)]" />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
              <Camera className="h-8 w-8" />
            </div>
            <Cpu className="h-7 w-7 text-[#17ccd3]/60" />
          </div>

          <h3 className="mt-5 text-2xl md:text-3xl font-bold text-white">
            Inspección de Calidad IA
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed flex-1">
            Cámaras de alta velocidad y Deep Learning detectando anomalías
            milimétricas. Envía la orden física de descarte directo al
            autómata (PLC).
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-[#17ccd3]/40 bg-[#17ccd3]/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
              Tolerancia Cero Scrap
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#17ccd3]">
              Explorar módulo de Calidad
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
