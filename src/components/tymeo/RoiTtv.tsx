import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Map, Cpu, LayoutDashboard } from "lucide-react";

export function RoiTtv() {
  return (
    <section className="py-20 md:py-24 grid md:grid-cols-2 gap-6">
      {/* ROI Card */}
      <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col">
        <div className="rounded-2xl bg-[#17ccd3]/10 border border-[#17ccd3]/30 p-3 w-fit">
          <Calculator className="h-6 w-6 text-[#17ccd3]" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-white leading-snug">
          El impacto de mover la aguja.
        </h3>
        <p className="mt-3 text-slate-400 leading-relaxed flex-1">
          Vea cómo una reducción del{" "}
          <span className="text-[#17ccd3] font-mono">0.5%</span> en costos
          operativos genera retornos superiores al{" "}
          <span className="text-[#17ccd3] font-mono">1000%</span>.
        </p>
        <Link
          to="/roi"
          className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-[#17ccd3] text-[#17ccd3] hover:bg-[#17ccd3]/10 font-semibold py-3 px-6 transition"
        >
          Calcular el ROI de mi línea
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* TTV Card */}
      <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col">
        <div className="rounded-2xl bg-[#17ccd3]/10 border border-[#17ccd3]/30 p-3 w-fit">
          <LayoutDashboard className="h-6 w-6 text-[#17ccd3]" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-white leading-snug">
          Resultados en &lt; 15 días.
        </h3>
        <p className="mt-3 text-slate-400 leading-relaxed">
          Ecosistema asset-light: cero servidores propios, cero esperas.
        </p>

        <ol className="mt-8 grid grid-cols-3 gap-3 relative">
          <div className="absolute top-5 left-[12%] right-[12%] border-t border-dashed border-[#17ccd3]/40 -z-0" />
          {[
            { n: 1, l: "Mapeo Rápido", i: Map },
            { n: 2, l: "Set-up IoT", i: Cpu },
            { n: 3, l: "Tableros en Vivo", i: LayoutDashboard },
          ].map((s) => (
            <li key={s.n} className="relative flex flex-col items-center text-center z-10">
              <div className="h-10 w-10 rounded-full bg-[#041A1B] border-2 border-[#17ccd3] flex items-center justify-center font-mono text-[#17ccd3] text-sm font-bold">
                {s.n}
              </div>
              <p className="mt-3 text-xs text-white font-semibold">{s.l}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
