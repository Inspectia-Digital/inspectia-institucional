import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Cpu, Gauge, Camera } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center rounded-full border border-[#17ccd3]/30 bg-[#17ccd3]/10 px-4 py-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
          Soluciones de Manufactura InspectIA OS
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
          Producción continua y{" "}
          <span className="bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent">
            cero defectos
          </span>
          . Su fábrica en piloto automático.
        </h1>

        <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Unifique la medición del rendimiento (OEE) y el control de calidad
          milimétrico en una sola plataforma. Integramos IA y sensores de
          borde directamente a sus PLCs para detectar fallas al instante y
          erradicar los cuellos de botella.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17ccd3] px-6 py-3 text-sm font-bold text-[#041A1B] shadow-[0_0_40px_rgba(23,204,211,0.4)] hover:brightness-110 transition"
          >
            Hablar con un Experto 4.0 <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/roi"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            <Calculator className="h-4 w-4" /> Calcular ROI de mi Planta
          </Link>
        </div>
      </div>

      {/* Isometric blueprint visual */}
      <div className="relative mt-14 md:mt-20">
        <div className="absolute inset-0 blur-3xl bg-[#17ccd3]/15 rounded-full" />
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#084749]/60 to-[#041A1B]/60 backdrop-blur-xl p-6 md:p-10 overflow-hidden">
          {/* Blueprint grid */}
          <svg
            viewBox="0 0 1200 480"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern id="mfg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(23,204,211,0.08)" strokeWidth="1" />
              </pattern>
              <linearGradient id="mfg-belt" x1="0" x2="1">
                <stop offset="0" stopColor="#17ccd3" stopOpacity="0" />
                <stop offset="0.5" stopColor="#17ccd3" stopOpacity="0.8" />
                <stop offset="1" stopColor="#17ccd3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="1200" height="480" fill="url(#mfg-grid)" />

            {/* Isometric conveyor line */}
            <g transform="translate(60,180)">
              <polygon points="0,80 900,80 980,120 80,120" fill="#0a2f31" stroke="rgba(255,255,255,0.12)" />
              <polygon points="0,80 80,40 980,40 900,80" fill="#0d3a3d" stroke="rgba(255,255,255,0.12)" />
              <polygon points="900,80 980,40 980,120" fill="#062527" stroke="rgba(255,255,255,0.12)" />

              {/* Products on belt */}
              {[100, 260, 420, 580, 740].map((x, i) => (
                <g key={i}>
                  <rect x={x} y={50} width="50" height="30" fill="#17ccd3" fillOpacity="0.15" stroke="#17ccd3" strokeOpacity="0.6" />
                  <rect x={x + 8} y={42} width="42" height="8" fill="#17ccd3" fillOpacity="0.25" stroke="#17ccd3" strokeOpacity="0.6" />
                </g>
              ))}

              {/* Flow line */}
              <line x1="0" y1="100" x2="900" y2="100" stroke="url(#mfg-belt)" strokeWidth="2" strokeDasharray="6 6">
                <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite" />
              </line>
            </g>

            {/* Vision inspection station */}
            <g transform="translate(260,60)">
              <line x1="60" y1="120" x2="60" y2="200" stroke="#17ccd3" strokeOpacity="0.5" strokeDasharray="4 4" />
              <rect x="10" y="60" width="100" height="60" rx="8" fill="#084749" stroke="#17ccd3" strokeOpacity="0.8" />
              <circle cx="60" cy="90" r="16" fill="#041A1B" stroke="#17ccd3" />
              <circle cx="60" cy="90" r="6" fill="#17ccd3">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <text x="60" y="45" textAnchor="middle" fill="#17ccd3" fontSize="11" fontFamily="monospace" fontWeight="700">
                VISION QC
              </text>
            </g>

            {/* OEE operator panel */}
            <g transform="translate(820,60)">
              <line x1="60" y1="120" x2="60" y2="200" stroke="#17ccd3" strokeOpacity="0.5" strokeDasharray="4 4" />
              <rect x="0" y="40" width="140" height="90" rx="10" fill="#084749" stroke="#17ccd3" strokeOpacity="0.8" />
              <rect x="12" y="55" width="116" height="8" rx="2" fill="#17ccd3" fillOpacity="0.6" />
              <rect x="12" y="70" width="80" height="6" rx="2" fill="#17ccd3" fillOpacity="0.35" />
              <rect x="12" y="82" width="100" height="6" rx="2" fill="#17ccd3" fillOpacity="0.35" />
              <text x="70" y="115" textAnchor="middle" fill="#7ef7fc" fontSize="14" fontFamily="monospace" fontWeight="700">
                OEE 92%
              </text>
              <text x="70" y="28" textAnchor="middle" fill="#17ccd3" fontSize="11" fontFamily="monospace" fontWeight="700">
                TYMEO PANEL
              </text>
            </g>

            {/* Node dots on line */}
            {[320, 880].map((x, i) => (
              <circle key={i} cx={x} cy="260" r="8" fill="#17ccd3">
                <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite" />
              </circle>
            ))}
          </svg>

          {/* Bottom chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono uppercase tracking-widest">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#041A1B]/60 px-3 py-1.5 text-slate-300">
              <Camera className="h-3.5 w-3.5 text-[#17ccd3]" /> Deep Learning QC
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#041A1B]/60 px-3 py-1.5 text-slate-300">
              <Cpu className="h-3.5 w-3.5 text-[#17ccd3]" /> PLC Siemens / AB
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#041A1B]/60 px-3 py-1.5 text-slate-300">
              <Gauge className="h-3.5 w-3.5 text-[#17ccd3]" /> OEE en tiempo real
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
