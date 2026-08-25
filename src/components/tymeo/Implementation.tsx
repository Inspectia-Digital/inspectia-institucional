import { Cpu } from "lucide-react";

const PATHS = [
  {
    n: "01",
    t: "Lo hacés vos",
    d: "Tu propio equipo técnico instala y conecta el hardware, siguiendo nuestra guía de implementación.",
  },
  {
    n: "02",
    t: "Lo hacemos nosotros",
    d: "Nos encargamos de la instalación completa. Se cotiza aparte, según lo que tu planta necesite.",
  },
];

export function Implementation() {
  return (
    <section id="implementacion" className="py-16 md:py-20 scroll-mt-24">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-3xl border border-white/10 bg-[#084749]/40 backdrop-blur-xl p-8 md:p-12">
        <div>
          <div className="rounded-2xl bg-[#17ccd3]/10 border border-[#17ccd3]/30 p-3 w-fit">
            <Cpu className="h-6 w-6 text-[#17ccd3]" />
          </div>
          <h2 className="mt-5 text-2xl md:text-3xl font-bold text-white leading-snug">
            El precio del plan es solo del software.
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Instalar sensores, PLC o terminales en tu planta es un paso aparte — no está incluido en
            ningún plan, y no hace falta resolverlo antes de empezar.
          </p>
        </div>

        <div className="space-y-4">
          {PATHS.map((p) => (
            <div
              key={p.n}
              className="flex gap-4 rounded-2xl border border-white/10 bg-[#041A1B]/70 p-5"
            >
              <span className="font-mono text-sm font-bold text-[#17ccd3] shrink-0">{p.n}</span>
              <div>
                <p className="font-semibold text-white">{p.t}</p>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
