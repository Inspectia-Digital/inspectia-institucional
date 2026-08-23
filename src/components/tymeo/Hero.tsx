import { ArrowRight, Cpu, Play, Wrench, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
      {/* LEFT: Copy */}
      <div>
        <span className="inline-block bg-[#17ccd3]/10 text-[#17ccd3] border border-[#17ccd3]/30 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
          Módulo de Productividad InspectIA OS
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] max-w-xl">
          El OEE de tu planta en{" "}
          <span className="bg-gradient-to-r from-[#17ccd3] to-emerald-300 bg-clip-text text-transparent">
            tiempo real
          </span>
          . Desde el celular hasta la máquina.
        </h1>
        <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
          Olvida las planillas. TYMEO expone tus cuellos de botella ocultos al
          instante. Empieza hoy mismo sin hardware, o escala a la integración
          total con tu PLC en menos de 15 días.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
          >
            Crear Cuenta Gratis
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-500 text-white font-semibold py-3 px-6 hover:bg-white/5 transition"
          >
            <Play className="h-4 w-4" />
            Agendar Demo Pro
          </a>
        </div>
      </div>

      {/* RIGHT: Visual mock */}
      <div className="relative min-h-[440px] md:min-h-[520px]">
        <div className="absolute -inset-10 bg-[#17ccd3]/20 blur-3xl rounded-full pointer-events-none" />

        {/* Tablet — Worker view */}
        <div className="relative z-10 mx-auto max-w-md rounded-3xl bg-[#084749] border border-white/10 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#17ccd3] animate-pulse" />
              <span className="text-xs text-slate-300 font-mono">
                Línea 03 · En curso
              </span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              Worker View
            </span>
          </div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
            Orden #A-2841
          </p>
          <p className="text-white font-semibold mb-4">Declarar motivo de parada</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "Mantenimiento", i: Wrench },
              { l: "Falta de Material", i: ArrowRight },
              { l: "Cambio de Formato", i: Cpu },
              { l: "Calidad", i: CheckCircle2 },
            ].map(({ l, i: Icon }) => (
              <button
                key={l}
                className="flex flex-col items-start gap-2 rounded-2xl bg-[#041A1B] border border-white/10 hover:border-[#17ccd3]/40 transition p-4 text-left"
              >
                <Icon className="h-5 w-5 text-[#17ccd3]" />
                <span className="text-sm text-white font-medium">{l}</span>
              </button>
            ))}
          </div>
          <button className="mt-4 w-full rounded-xl bg-[#17ccd3] text-[#041A1B] font-bold py-3 text-sm">
            Confirmar
          </button>
        </div>

        {/* Floating OEE dial */}
        <div className="absolute -top-2 -right-2 lg:-right-6 z-20 rounded-2xl bg-[#020d0e]/90 backdrop-blur-xl border border-[#17ccd3]/40 p-4 shadow-[0_0_40px_rgba(23,204,211,0.25)]">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="48"
              stroke="#ffffff15"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="48"
              stroke="#17ccd3"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 48}`}
              strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.885)}`}
              transform="rotate(-90 60 60)"
            />
            <text
              x="60"
              y="58"
              textAnchor="middle"
              fill="#17ccd3"
              fontSize="22"
              fontWeight="700"
              fontFamily="monospace"
            >
              88.5%
            </text>
            <text
              x="60"
              y="76"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10"
              letterSpacing="2"
            >
              OEE
            </text>
          </svg>
        </div>

        {/* Floating sensor node */}
        <div className="absolute bottom-2 -left-2 lg:-left-6 z-20 rounded-2xl bg-[#020d0e]/90 backdrop-blur-xl border border-white/10 p-4 flex items-center gap-3 shadow-xl">
          <div className="rounded-xl bg-[#17ccd3]/10 border border-[#17ccd3]/30 p-2">
            <Cpu className="h-5 w-5 text-[#17ccd3]" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              Sensor Edge
            </p>
            <p className="text-sm text-white font-mono">PLC-S7 · online</p>
          </div>
        </div>
      </div>
    </section>
  );
}
