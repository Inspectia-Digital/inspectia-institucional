const OEE = 0.874;
const R = 90;
const ARC = Math.PI * R;

export function OeeGaugeCard() {
  return (
    <div className="relative mx-auto max-w-md rounded-3xl bg-[#084749]/60 backdrop-blur-xl border border-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-300 font-mono">
          Línea 1 · Turno mañana
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#17ccd3]/40 bg-[#17ccd3]/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#17ccd3] animate-pulse" />
          En vivo
        </span>
      </div>

      <div className="relative mt-6 flex flex-col items-center">
        <svg viewBox="0 0 220 130" className="w-full max-w-[260px]">
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="#ffffff18"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 20 110 A 90 90 0 0 1 200 110"
            fill="none"
            stroke="#17ccd3"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={ARC}
            strokeDashoffset={ARC * (1 - OEE)}
          />
          <g style={{ transformOrigin: "110px 110px", transform: `rotate(${-90 + OEE * 180}deg)` }}>
            <line x1="110" y1="110" x2="110" y2="38" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="110" cy="110" r="6" fill="#ffffff" />
          </g>
        </svg>
        <div className="-mt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">OEE</p>
          <p className="font-mono text-4xl font-bold text-[#17ccd3]">87.4%</p>
          <p className="mt-1 text-xs text-slate-400">Meta de planta: 78%</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { k: "Disponibilidad", v: "91%" },
          { k: "Rendimiento", v: "88%" },
          { k: "Calidad", v: "96%" },
        ].map((b) => (
          <div
            key={b.k}
            className="rounded-2xl bg-[#041A1B] border border-white/10 p-3 text-center"
          >
            <p className="text-[10px] uppercase tracking-wider text-slate-500">{b.k}</p>
            <p className="mt-1 font-mono text-lg font-bold text-white">{b.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
