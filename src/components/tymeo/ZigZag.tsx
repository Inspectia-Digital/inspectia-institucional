import { ClipboardList, Cpu, BarChart3, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeInSection } from "./FadeInSection";

function TabletMock() {
  return (
    <div className="rounded-3xl bg-[#084749] border border-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">
        Línea 02 · Operario
      </p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { l: "Mantenimiento", i: Wrench },
          { l: "Falta de Material", i: ArrowRight },
          { l: "Cambio de Formato", i: Cpu },
          { l: "Calidad", i: CheckCircle2 },
        ].map(({ l, i: Icon }) => (
          <div
            key={l}
            className="flex flex-col items-start gap-2 rounded-2xl bg-[#041A1B] border border-white/10 p-4"
          >
            <Icon className="h-5 w-5 text-[#17ccd3]" />
            <span className="text-sm text-white font-medium">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlueprintMock() {
  return (
    <div className="rounded-3xl bg-[#020d0e] border border-[#17ccd3]/20 p-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #17ccd320 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <svg viewBox="0 0 320 200" className="relative w-full h-56">
        <line x1="40" y1="100" x2="160" y2="60" stroke="#17ccd3" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="40" y1="100" x2="160" y2="140" stroke="#17ccd3" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="160" y1="60" x2="280" y2="100" stroke="#17ccd3" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="160" y1="140" x2="280" y2="100" stroke="#17ccd3" strokeWidth="1.5" strokeDasharray="4 4" />
        {[
          { x: 40, y: 100, l: "PLC" },
          { x: 160, y: 60, l: "Edge" },
          { x: 160, y: 140, l: "Sensor" },
          { x: 280, y: 100, l: "Cloud" },
        ].map((n) => (
          <g key={n.l}>
            <circle cx={n.x} cy={n.y} r="22" fill="#084749" stroke="#17ccd3" strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="6" fill="#17ccd3" />
            <text x={n.x} y={n.y + 38} textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace">
              {n.l}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function DashboardMock() {
  const bars = [60, 80, 45, 90, 70, 55, 85, 75];
  return (
    <div className="rounded-3xl bg-[#084749] border border-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">
            OEE Tiempo real
          </p>
          <p className="font-mono text-[#17ccd3] text-3xl font-bold">88.5%</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Δ vs ayer</p>
          <p className="font-mono text-emerald-400 text-sm">+3.2%</p>
        </div>
      </div>
      <div className="flex items-end gap-2 h-32 mt-4 border-b border-white/10 pb-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t ${
              h < 50 ? "bg-red-400/80" : "bg-[#17ccd3]"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { l: "Disponib.", v: "94%" },
          { l: "Rendim.", v: "92%" },
          { l: "Calidad", v: "99%" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl bg-[#041A1B] border border-white/10 p-2 text-center">
            <p className="text-[10px] text-slate-500 uppercase">{k.l}</p>
            <p className="font-mono text-[#17ccd3] text-sm font-bold">{k.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Captura ágil en el piso de planta.",
    body: "Reemplace el papel al instante. Interfaz diseñada para que el operario declare inicios de orden, fin de lote y motivos de parada con dos clics.",
    Visual: TabletMock,
  },
  {
    n: "02",
    icon: Cpu,
    title: "Mapeo ciberfísico en milisegundos.",
    body: "Cuando esté listo para la verdad absoluta, conectamos sus máquinas. Sensores de borde miden tiempos de ciclo y paradas automáticas sin intervención humana.",
    Visual: BlueprintMock,
  },
  {
    n: "03",
    icon: BarChart3,
    title: "Dashboards que dictan rentabilidad.",
    body: "Disponibilidad, Rendimiento y Calidad (OEE) calculados al segundo. Pase de reaccionar a prevenir.",
    Visual: DashboardMock,
  },
];

export function ZigZag() {
  return (
    <section className="py-20 md:py-24 space-y-20 md:space-y-28">
      {STEPS.map((s, i) => {
        const reverse = i % 2 === 1;
        const Visual = s.Visual;
        const Icon = s.icon;
        return (
          <FadeInSection key={s.n}>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={reverse ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#17ccd3]/10 border border-[#17ccd3]/40 text-[#17ccd3] font-mono text-sm">
                    {s.n}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[#17ccd3] text-xs font-semibold uppercase tracking-wider">
                    <Icon className="h-4 w-4" />
                    Paso {s.n}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {s.title}
                </h3>
                <p className="mt-4 text-slate-400 leading-relaxed max-w-lg">
                  {s.body}
                </p>
              </div>
              <div className={reverse ? "lg:order-1" : ""}>
                <Visual />
              </div>
            </div>
          </FadeInSection>
        );
      })}
    </section>
  );
}
