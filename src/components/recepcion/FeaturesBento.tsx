import { ShieldCheck, Database, Camera, Cable } from "lucide-react";

export function FeaturesBento() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          El fin del conteo manual ciego.
        </h2>
        <p className="mt-4 text-slate-400">
          Precisión, conciliación y velocidad — sin infraestructura invasiva.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1 - full width */}
        <div className="md:col-span-3 rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#17ccd3] font-semibold">
                Integración
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white">
                Conciliación Nativa API
              </h3>
              <p className="mt-3 text-slate-300 leading-relaxed">
                La cámara cruza el conteo físico en tiempo real con Cygnus WMS,
                SAP u otro ERP/WMS. Sin planillas, sin re-tipeo, sin sorpresas
                a fin de mes.
              </p>
            </div>

            {/* Inline SVG diagram */}
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <NodeIcon icon={<Camera className="h-6 w-6" />} label="Cámara IA" />
                <FlowLine />
                <NodeIcon icon={<Cable className="h-6 w-6" />} label="InspectIA OS" />
                <FlowLine />
                <NodeIcon icon={<Database className="h-6 w-6" />} label="WMS / SAP" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="md:col-span-2 rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-xl md:text-2xl font-bold text-white">
            Cero Discrepancias
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            La IA no se cansa. Elimina el error humano por fatiga en el último
            turno, garantizando la misma precisión a las 3 AM que en el primer
            pallet del día.
          </p>
        </div>

        {/* Card 3 - bar chart */}
        <div className="rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8">
          <h3 className="text-xl font-bold text-white">Lead Time Reducido</h3>
          <p className="mt-1 text-xs text-slate-400">Dock-to-Stock</p>

          <div className="mt-6 flex items-end justify-around gap-4 h-40">
            <BarCol label="Antes" value="48h" heightPct={100} color="bg-white/20" />
            <BarCol label="Con IA" value="30h" heightPct={62} color="bg-[#17ccd3]" glow />
          </div>
        </div>
      </div>
    </section>
  );
}

function NodeIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="h-14 w-14 rounded-2xl border border-[#17ccd3]/40 bg-[#17ccd3]/10 grid place-items-center text-[#17ccd3]">
        {icon}
      </div>
      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
        {label}
      </span>
    </div>
  );
}

function FlowLine() {
  return (
    <div className="flex-1 h-px bg-gradient-to-r from-[#17ccd3]/60 via-[#17ccd3]/40 to-[#17ccd3]/60 relative">
      <div className="absolute inset-y-0 left-0 w-8 bg-[#17ccd3] animate-pulse" />
    </div>
  );
}

function BarCol({
  label,
  value,
  heightPct,
  color,
  glow,
}: {
  label: string;
  value: string;
  heightPct: number;
  color: string;
  glow?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 h-full">
      <span className="text-sm font-mono font-bold text-white">{value}</span>
      <div className="w-full flex-1 flex items-end">
        <div
          className={`w-full rounded-t-md ${color} transition-all duration-700`}
          style={{
            height: `${heightPct}%`,
            boxShadow: glow ? "0 0 30px rgba(23,204,211,0.5)" : undefined,
          }}
        />
      </div>
      <span className="text-xs text-slate-400">{label}</span>
    </div>
  );
}
