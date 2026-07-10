import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-16 pb-16 md:pt-24 md:pb-20">
      <div className="text-center max-w-5xl mx-auto">
        <span className="inline-block rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/30 px-3 py-1 text-xs font-semibold text-[#17ccd3] uppercase tracking-wider">
          Soluciones Logísticas InspectIA OS
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl mx-auto">
          Visibilidad perfecta de{" "}
          <span
            className="bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent"
            style={{ textShadow: "0 0 40px rgba(23,204,211,0.35)" }}
          >
            extremo a extremo
          </span>
          . Cero puntos ciegos en su almacén.
        </h1>
        <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Conecte el flujo físico de su mercadería con su WMS en tiempo real.
          Desde la descarga en el andén hasta el sellado de la caja, nuestra
          plataforma de visión artificial orquesta su inventario sin
          fricciones.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a
            href="#especialista"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
          >
            Hablar con un Especialista
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/roi"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white font-semibold py-3 px-6 hover:bg-white/5 transition"
          >
            <Calculator className="h-4 w-4" />
            Calcular ROI Logístico
          </Link>
        </div>
      </div>

      {/* Blueprint visual */}
      <div className="relative mt-14 md:mt-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[380px] w-[80%] rounded-full bg-[#17ccd3]/15 blur-3xl" />
        </div>

        <div className="relative rounded-3xl border border-white/10 bg-[#084749]/40 backdrop-blur-xl p-4 md:p-6 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-2 pb-3 text-[10px] uppercase tracking-widest text-[#17ccd3]/80">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CD BLUEPRINT · LIVE
            </span>
            <span className="hidden sm:inline">Nodos IA: 12 · Flujos: 3</span>
          </div>

          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-gradient-to-b from-[#04292a] to-[#031a1b]">
            <svg
              viewBox="0 0 1200 500"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="hubGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#17ccd3" strokeOpacity="0.08" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="floorGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0a2a2b" />
                  <stop offset="100%" stopColor="#020a0b" />
                </linearGradient>
              </defs>

              {/* 3D floor */}
              <polygon points="0,500 1200,500 1000,180 200,180" fill="url(#floorGrad)" />
              <polygon points="0,500 1200,500 1000,180 200,180" fill="url(#hubGrid)" opacity="0.6" />

              {/* Aisles / racks — perspective columns */}
              {[0, 1, 2, 3, 4].map((i) => {
                const t = i / 4;
                const topX = 260 + t * 680;
                const botX = 100 + t * 1000;
                return (
                  <g key={i}>
                    <line x1={botX} y1="500" x2={topX} y2="200" stroke="#17ccd3" strokeOpacity="0.25" strokeWidth="1" />
                    {/* Racks */}
                    {[0.15, 0.35, 0.6, 0.85].map((p, j) => {
                      const x = botX + (topX - botX) * p;
                      const y = 500 + (200 - 500) * p;
                      const s = 1 - p * 0.7;
                      return (
                        <rect
                          key={j}
                          x={x - 20 * s}
                          y={y - 30 * s}
                          width={40 * s}
                          height={30 * s}
                          fill="#084749"
                          stroke="#17ccd3"
                          strokeOpacity="0.3"
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Flow lines */}
              <path d="M 100 460 Q 400 460 600 340 T 1100 220" stroke="#17ccd3" strokeWidth="2" fill="none" strokeDasharray="6 6">
                <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.6s" repeatCount="indefinite" />
              </path>
              <path d="M 120 300 Q 500 320 700 260 T 1080 320" stroke="#7ef7fc" strokeOpacity="0.55" strokeWidth="1.5" fill="none" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
              </path>

              {/* Nodes */}
              {[
                { x: 100, y: 460, label: "IN" },
                { x: 420, y: 400, label: "REC" },
                { x: 620, y: 340, label: "PICK" },
                { x: 820, y: 280, label: "PACK" },
                { x: 1080, y: 220, label: "OUT" },
              ].map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r="18" fill="#17ccd3" opacity="0.15" />
                  <circle cx={n.x} cy={n.y} r="8" fill="#17ccd3">
                    <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                  </circle>
                  <text x={n.x} y={n.y - 26} textAnchor="middle" fill="#17ccd3" fontSize="11" fontWeight="700">
                    {n.label}
                  </text>
                </g>
              ))}

              {/* Drone */}
              <g transform="translate(700 140)">
                <line x1="-14" y1="-8" x2="14" y2="8" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="-14" y1="8" x2="14" y2="-8" stroke="#cbd5e1" strokeWidth="2" />
                {[[-14, -8], [14, -8], [-14, 8], [14, 8]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="6" fill="none" stroke="#17ccd3" strokeOpacity="0.6" strokeDasharray="2 2">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${x} ${y}`} to={`360 ${x} ${y}`} dur="0.4s" repeatCount="indefinite" />
                  </circle>
                ))}
                <rect x="-9" y="-5" width="18" height="10" rx="2" fill="#0f172a" stroke="#94a3b8" />
              </g>
            </svg>

            {/* Corner brackets */}
            <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-[#17ccd3]" />
            <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-[#17ccd3]" />
            <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#17ccd3]" />
            <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#17ccd3]" />

            {/* Legend chips */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {["INBOUND", "STORAGE", "OUTBOUND"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[#041A1B]/70 border border-[#17ccd3]/30 px-2.5 py-0.5 text-[10px] font-mono text-[#17ccd3]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
