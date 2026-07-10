import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* LEFT */}
        <div>
          <span className="inline-block rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/30 px-3 py-1 text-xs font-semibold tracking-wider text-[#17ccd3] uppercase">
            Inbound & Recepción
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
            Audite el ingreso de mercadería{" "}
            <span
              className="text-[#17ccd3]"
              style={{ textShadow: "0 0 30px rgba(23,204,211,0.55)" }}
            >
              en segundos
            </span>
            , sin frenar su andén.
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-xl leading-relaxed">
            Erradique los errores de proveedores y el cuello de botella en los
            docks. Nuestra IA cuenta y valida unidades con precisión del 99.9%,
            conciliando automáticamente contra el ASN de su WMS.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
            >
              Agendar Demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#planes"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white font-semibold py-3 px-6 hover:bg-white/5 transition"
            >
              Ver Opciones de Despliegue
            </a>
          </div>
        </div>

        {/* RIGHT — simulated camera feed */}
        <div className="relative">
          <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#041A1B] border border-white/5">
              {/* Scanlines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(23,204,211,0.15) 3px, rgba(23,204,211,0.15) 4px)",
                }}
              />

              {/* HUD top */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#17ccd3]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  LIVE · DOCK 03
                </span>
                <span>REC · 00:12</span>
              </div>

              {/* Corner brackets */}
              {[
                "top-6 left-6 border-l-2 border-t-2",
                "top-6 right-6 border-r-2 border-t-2",
                "bottom-16 left-6 border-l-2 border-b-2",
                "bottom-16 right-6 border-r-2 border-b-2",
              ].map((c) => (
                <div
                  key={c}
                  className={`absolute h-4 w-4 border-[#17ccd3] ${c}`}
                />
              ))}

              {/* Pallet with boxes */}
              <div className="absolute inset-0 flex items-end justify-center pb-20">
                <div className="relative">
                  {/* Boxes grid */}
                  <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="relative h-10 w-12 rounded-sm border border-[#17ccd3]/60 bg-gradient-to-br from-[#0a5a5c] to-[#084749]"
                      >
                        <div className="absolute inset-1 border border-[#17ccd3]/30 rounded-[2px]" />
                      </div>
                    ))}
                  </div>
                  {/* Bounding boxes overlay */}
                  <div className="absolute -inset-2 border-2 border-[#17ccd3] rounded-md animate-pulse" />
                  <div className="absolute -top-6 left-0 text-[10px] font-mono text-[#17ccd3] bg-[#041A1B]/80 px-1.5 py-0.5 rounded">
                    PALLET · 120u · 99.9%
                  </div>
                  {/* Pallet base */}
                  <div className="mt-1 h-2 w-full bg-[#17ccd3]/40 rounded-sm" />
                </div>
              </div>

              {/* Bottom match chip */}
              <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-[#17ccd3]/60 bg-[#17ccd3]/15 backdrop-blur px-3 py-2 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-[#17ccd3]">
                  <span className="h-2 w-2 rounded-full bg-[#17ccd3] shadow-[0_0_8px_#17ccd3]" />
                  MATCH WMS: 120/120 UNIDADES
                </span>
                <span className="font-bold text-[#17ccd3]">APROBADO</span>
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 -z-10 bg-[#17ccd3]/10 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
