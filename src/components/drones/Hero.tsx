import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left */}
        <div>
          <span className="inline-block rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/30 px-3 py-1 text-xs font-semibold text-[#17ccd3] uppercase tracking-wider">
            Auditoría en Altura
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            <span
              className="bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent"
              style={{ textShadow: "0 0 40px rgba(23,204,211,0.35)" }}
            >
              Inventario exacto
            </span>{" "}
            en racks altos. Sin riesgos, sin frenar la operación.
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
            Automatice el conteo cíclico y audite el 100% de sus posiciones de
            sobrestock. Nuestros drones navegan sin GPS, leen códigos a gran
            altura y concilian cada pallet directamente con su WMS.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#agendar"
              className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
            >
              Agendar Vuelo de Prueba
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#planes"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white font-semibold py-3 px-6 hover:bg-white/5 transition"
            >
              <Play className="h-4 w-4" />
              Ver Opciones de Servicio
            </a>
          </div>
        </div>

        {/* Right — Drone visual */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-[420px] w-[420px] rounded-full bg-[#17ccd3]/25 blur-3xl" />
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-[#084749]/40 backdrop-blur-xl p-4 shadow-2xl overflow-hidden">
            {/* HUD */}
            <div className="flex items-center justify-between px-2 pb-3 text-[10px] uppercase tracking-widest text-[#17ccd3]/80">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                LIVE · DRONE 01
              </span>
              <span>ALT 8.4m · BAT 82%</span>
            </div>

            {/* Scene */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-black">
              {/* Scanlines */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(23,204,211,0.15) 0 1px, transparent 1px 4px)",
                }}
              />

              {/* Warehouse racks — perspective */}
              <svg
                viewBox="0 0 400 300"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Floor */}
                <polygon points="0,300 400,300 300,180 100,180" fill="#0a1a1b" />
                {/* Left rack */}
                <g fill="#1a1a1a" stroke="#2a2a2a">
                  <polygon points="0,60 100,110 100,240 0,290" />
                  <line x1="20" y1="70" x2="100" y2="150" />
                  <line x1="20" y1="130" x2="100" y2="190" />
                  <line x1="20" y1="200" x2="100" y2="230" />
                </g>
                {/* Right rack */}
                <g fill="#1a1a1a" stroke="#2a2a2a">
                  <polygon points="400,60 300,110 300,240 400,290" />
                  <line x1="380" y1="70" x2="300" y2="150" />
                  <line x1="380" y1="130" x2="300" y2="190" />
                  <line x1="380" y1="200" x2="300" y2="230" />
                </g>
                {/* Pallets left */}
                {[80, 145, 210].map((y, i) => (
                  <rect key={`pl${i}`} x="20" y={y} width="70" height="30" fill="#7a5a2e" opacity="0.7" />
                ))}
                {/* Pallets right */}
                {[80, 145, 210].map((y, i) => (
                  <rect key={`pr${i}`} x="310" y={y} width="70" height="30" fill="#7a5a2e" opacity="0.7" />
                ))}

                {/* Drone */}
                <g transform="translate(200 130)">
                  <circle r="55" fill="#17ccd3" opacity="0.08" />
                  {/* Arms */}
                  <line x1="-22" y1="-14" x2="22" y2="14" stroke="#cbd5e1" strokeWidth="3" />
                  <line x1="-22" y1="14" x2="22" y2="-14" stroke="#cbd5e1" strokeWidth="3" />
                  {/* Rotors */}
                  {[[-22, -14], [22, -14], [-22, 14], [22, 14]].map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="10" fill="none" stroke="#17ccd3" strokeOpacity="0.5" strokeDasharray="2 2">
                        <animateTransform attributeName="transform" type="rotate" from={`0 ${x} ${y}`} to={`360 ${x} ${y}`} dur="0.4s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={x} cy={y} r="3" fill="#0f172a" stroke="#94a3b8" />
                    </g>
                  ))}
                  {/* Body */}
                  <rect x="-14" y="-8" width="28" height="16" rx="3" fill="#0f172a" stroke="#94a3b8" />
                  {/* Camera */}
                  <circle cx="0" cy="8" r="4" fill="#17ccd3" />
                </g>

                {/* Scanning beam */}
                <line x1="200" y1="145" x2="325" y2="220" stroke="#17ccd3" strokeWidth="1" strokeDasharray="3 3" opacity="0.8">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
                </line>
              </svg>

              {/* Bounding box on barcode */}
              <div className="absolute right-[18%] bottom-[22%] w-24 h-14">
                <div className="absolute inset-0 border-2 border-[#17ccd3] rounded-sm animate-pulse" />
                <span className="absolute -top-1 -left-1 h-1.5 w-1.5 bg-[#17ccd3] rounded-full" />
                <span className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-[#17ccd3] rounded-full" />
                <span className="absolute -bottom-1 -left-1 h-1.5 w-1.5 bg-[#17ccd3] rounded-full" />
                <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 bg-[#17ccd3] rounded-full" />
                {/* Fake barcode */}
                <div className="absolute inset-1 flex items-end gap-[2px] p-1 bg-white/85 rounded-sm">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className="bg-black"
                      style={{
                        width: i % 3 === 0 ? 3 : 1,
                        height: "100%",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-[#17ccd3]" />
              <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-[#17ccd3]" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#17ccd3]" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#17ccd3]" />
            </div>

            {/* Chip */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-[#041A1B]/80 border border-[#17ccd3]/30 px-3 py-2">
              <span className="text-[11px] font-mono text-[#17ccd3]">
                BASE 64: DECODED
              </span>
              <span className="text-[11px] font-semibold text-emerald-300">
                WMS: UPDATED ✅
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
