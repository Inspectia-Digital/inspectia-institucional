import { Link } from "@tanstack/react-router";
import { Trophy, ArrowRight } from "lucide-react";

export function ExpoyerBanner() {
  return (
    <section className="py-12 md:py-20">
      <div className="relative bg-[#084749] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-[#17ccd3]/25 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-[#17ccd3]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative grid md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/30 px-3 py-1 text-xs font-semibold text-[#17ccd3] uppercase tracking-wider">
              <Trophy className="h-3.5 w-3.5" />
              Caso de Éxito Logístico
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Caso Expoyer:{" "}
              <span className="text-[#17ccd3]">-40% de Lead Time</span> y
              reasignación de{" "}
              <span className="text-[#17ccd3]">9 FTEs</span> gracias a la
              automatización del flujo.
            </h2>

            <div className="mt-6 grid grid-cols-3 gap-4 max-w-xl">
              {[
                { k: "-40%", v: "Lead Time" },
                { k: "9", v: "FTEs reasignados" },
                { k: "24→15", v: "Headcount" },
              ].map((m) => (
                <div
                  key={m.v}
                  className="rounded-2xl bg-[#041A1B]/50 border border-white/10 p-4 text-center"
                >
                  <p className="text-xl md:text-2xl font-bold text-[#17ccd3]">
                    {m.k}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">
                    {m.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/roi"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/40 text-[#17ccd3] font-semibold py-3 px-6 hover:bg-[#17ccd3]/25 transition whitespace-nowrap"
          >
            Simular Mi Caso
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
