import { ArrowRight, Play, Signal, BatteryFull, Wifi } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left */}
        <div>
          <span className="inline-block rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/30 px-3 py-1 text-xs font-semibold text-[#17ccd3] uppercase tracking-wider">
            Inventario & Picking
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            No escanee códigos. Cuente el{" "}
            <span
              className="bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent"
              style={{ textShadow: "0 0 40px rgba(23,204,211,0.35)" }}
            >
              stock real
            </span>{" "}
            con una simple foto.
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
            Transforme el smartphone de cada operario en un asistente de visión
            artificial. Cuente decenas de unidades en milisegundos, audite
            posiciones al paso (conteo oportunístico) y sincronice el
            inventario físico con su WMS sin frenar la operación.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#probar"
              className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
            >
              Probar App Gratis
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white font-semibold py-3 px-6 hover:bg-white/5 transition"
            >
              <Play className="h-4 w-4" />
              Agendar Demo Integrada
            </a>
          </div>
        </div>

        {/* Right — Phone Mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-[420px] w-[420px] rounded-full bg-[#17ccd3]/25 blur-3xl" />
          </div>

          <div className="relative w-[260px] sm:w-[280px] md:w-[300px] aspect-[9/19] rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-slate-900 to-black shadow-2xl p-2">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-b-2xl bg-black z-10" />

            {/* Screen */}
            <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-[#0a1a1b] flex flex-col">
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[9px] text-white/70">
                <span className="font-semibold">9:41</span>
                <div className="flex items-center gap-1">
                  <Signal className="h-2.5 w-2.5" />
                  <Wifi className="h-2.5 w-2.5" />
                  <BatteryFull className="h-3 w-3" />
                </div>
              </div>

              {/* App header */}
              <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-[#17ccd3] font-semibold">
                    InspectIA
                  </p>
                  <p className="text-[10px] text-white/80 font-medium">
                    Depósito · Rack B-04
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[8px] text-red-400 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Camera view */}
              <div className="relative flex-1 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] overflow-hidden">
                {/* Scanlines */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(23,204,211,0.15) 0 1px, transparent 1px 4px)",
                  }}
                />

                {/* Corner brackets */}
                <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-[#17ccd3]" />
                <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-[#17ccd3]" />
                <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-[#17ccd3]" />
                <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-[#17ccd3]" />

                {/* Pallet grid of boxes */}
                <div className="absolute inset-6 grid grid-cols-3 grid-rows-3 gap-1.5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="relative bg-gradient-to-br from-amber-900/60 to-amber-950/60 border border-amber-700/40 rounded-sm"
                    >
                      <div
                        className="absolute inset-0 border-2 border-[#17ccd3] rounded-sm animate-pulse"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                      {/* corner dots */}
                      <span className="absolute -top-0.5 -left-0.5 h-1 w-1 bg-[#17ccd3] rounded-full" />
                      <span className="absolute -top-0.5 -right-0.5 h-1 w-1 bg-[#17ccd3] rounded-full" />
                      <span className="absolute -bottom-0.5 -left-0.5 h-1 w-1 bg-[#17ccd3] rounded-full" />
                      <span className="absolute -bottom-0.5 -right-0.5 h-1 w-1 bg-[#17ccd3] rounded-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Popup */}
              <div className="p-3">
                <div className="bg-[#084749]/90 backdrop-blur border border-[#17ccd3]/40 rounded-2xl p-3">
                  <p className="text-[9px] uppercase tracking-wider text-[#17ccd3] font-semibold">
                    Resultado IA
                  </p>
                  <p className="mt-1 text-[11px] text-white font-medium leading-tight">
                    Conteo IA: <span className="font-bold">42 Unidades</span>
                    <br />
                    <span className="text-white/60">WMS Esperado: 42</span>
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                    MATCH EXACTO ✅
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
