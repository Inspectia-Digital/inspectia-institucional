import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left */}
        <div>
          <span className="inline-block rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/30 px-3 py-1 text-xs font-semibold text-[#17ccd3] uppercase tracking-wider">
            Outbound & Despachos
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            Armado de pedidos perfecto.{" "}
            <span
              className="bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent"
              style={{ textShadow: "0 0 40px rgba(23,204,211,0.35)" }}
            >
              Cero errores
            </span>
            , cero reclamos.
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
            Automatice la validación en sus mesas de empaque. Nuestra visión
            artificial compara físicamente los artículos en la mesa contra la
            orden del WMS. Si coincide, Canal Verde. Si falta algo, Canal Rojo
            instantáneo antes de sellar la caja.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
            >
              Ver Demo de Despacho
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#planes"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white font-semibold py-3 px-6 hover:bg-white/5 transition"
            >
              <Play className="h-4 w-4" />
              Opciones de Integración
            </a>
          </div>
        </div>

        {/* Right — Packing table top-down */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-[420px] w-[420px] rounded-full bg-[#17ccd3]/25 blur-3xl" />
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-[#084749]/40 backdrop-blur-xl p-4 shadow-2xl overflow-hidden">
            {/* HUD */}
            <div className="flex items-center justify-between px-2 pb-3 text-[10px] uppercase tracking-widest text-[#17ccd3]/80">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                LIVE · MESA 02
              </span>
              <span>CENITAL VIEW</span>
            </div>

            {/* Scene */}
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              style={{
                background:
                  "radial-gradient(ellipse at center, #1a2426 0%, #0a1516 70%)",
              }}
            >
              {/* Scanlines */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(23,204,211,0.15) 0 1px, transparent 1px 5px)",
                }}
              />

              {/* Packing table surface */}
              <div className="absolute inset-6 rounded-xl bg-gradient-to-b from-amber-900/40 to-amber-950/60 border border-amber-800/40" />

              {/* Cardboard box outline (below products) */}
              <div className="absolute left-[14%] top-[16%] right-[52%] bottom-[16%] rounded-md border-2 border-dashed border-amber-500/40 bg-amber-100/5" />

              {/* Products with bounding boxes */}
              {[
                { top: "22%", left: "18%", w: "22%", h: "26%", color: "from-rose-500/60 to-rose-700/60", label: "SKU-A11", delay: "0ms" },
                { top: "22%", left: "44%", w: "18%", h: "26%", color: "from-sky-500/60 to-sky-700/60", label: "SKU-B22", delay: "160ms" },
                { top: "56%", left: "18%", w: "20%", h: "26%", color: "from-emerald-500/60 to-emerald-700/60", label: "SKU-C33", delay: "320ms" },
                { top: "56%", left: "42%", w: "22%", h: "26%", color: "from-violet-500/60 to-violet-700/60", label: "SKU-D44", delay: "480ms" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="absolute"
                  style={{ top: p.top, left: p.left, width: p.w, height: p.h }}
                >
                  <div
                    className={`absolute inset-1 rounded-md bg-gradient-to-br ${p.color} shadow-inner`}
                  />
                  <div
                    className="absolute inset-0 rounded-md border-2 border-[#17ccd3] animate-pulse"
                    style={{ animationDelay: p.delay }}
                  />
                  <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 bg-[#17ccd3] rounded-full" />
                  <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 bg-[#17ccd3] rounded-full" />
                  <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 bg-[#17ccd3] rounded-full" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 bg-[#17ccd3] rounded-full" />
                  <span className="absolute -top-4 left-0 text-[9px] font-mono font-bold text-[#17ccd3] tracking-wider">
                    {p.label}
                  </span>
                </div>
              ))}

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-[#17ccd3]" />
              <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-[#17ccd3]" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#17ccd3]" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#17ccd3]" />

              {/* Floating banner */}
              <div className="absolute bottom-4 right-4 max-w-[62%] rounded-xl bg-[#084749]/90 backdrop-blur border border-emerald-400/40 px-3 py-2 shadow-lg">
                <p className="text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">
                  Orden WMS #4928
                </p>
                <p className="mt-0.5 text-[11px] text-white font-medium leading-tight">
                  <span className="font-bold">4/4 Unidades</span>
                </p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                  CANAL VERDE APROBADO ✅
                </span>
              </div>
            </div>

            {/* Chip */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-[#041A1B]/80 border border-[#17ccd3]/30 px-3 py-2">
              <span className="text-[11px] font-mono text-[#17ccd3]">
                MATCH IA · 4/4 SKUs
              </span>
              <span className="text-[11px] font-semibold text-emerald-300">
                WMS: RELEASED ✅
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
