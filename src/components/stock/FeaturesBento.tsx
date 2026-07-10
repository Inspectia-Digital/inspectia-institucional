import { Scan, Eye, Plug } from "lucide-react";

export function FeaturesBento() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Más que un escáner. Un auditor de inventario en su bolsillo.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1 — Full width */}
        <div className="md:col-span-2 bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
              <Scan className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl md:text-3xl font-bold text-white">
              Conteo Oportunístico Inteligente
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Aproveche cada recorrido de picking. El operario toma una foto de
              la ubicación y la IA actualiza el stock real en segundo plano,
              erradicando los descuadres sin necesidad de frenar el depósito
              para conteos cíclicos.
            </p>
          </div>

          {/* SVG flow */}
          <svg
            viewBox="0 0 400 180"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="arrowStock"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 z" fill="#17ccd3" />
              </marker>
            </defs>
            {/* Nodes */}
            <g>
              <rect x="10" y="65" width="90" height="50" rx="10" fill="#084749" stroke="#17ccd3" strokeOpacity="0.4" />
              <text x="55" y="87" textAnchor="middle" fill="#17ccd3" fontSize="10" fontWeight="700">PICKING</text>
              <text x="55" y="102" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Recorrido</text>
            </g>
            <g>
              <rect x="155" y="65" width="90" height="50" rx="10" fill="#084749" stroke="#17ccd3" strokeOpacity="0.4" />
              <text x="200" y="87" textAnchor="middle" fill="#17ccd3" fontSize="10" fontWeight="700">FOTO IA</text>
              <text x="200" y="102" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Conteo visión</text>
            </g>
            <g>
              <rect x="300" y="65" width="90" height="50" rx="10" fill="#084749" stroke="#17ccd3" strokeOpacity="0.4" />
              <text x="345" y="87" textAnchor="middle" fill="#17ccd3" fontSize="10" fontWeight="700">WMS</text>
              <text x="345" y="102" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">Update stock</text>
            </g>
            {/* Lines */}
            <line x1="100" y1="90" x2="155" y2="90" stroke="#17ccd3" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowStock)">
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="245" y1="90" x2="300" y2="90" stroke="#17ccd3" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowStock)">
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>

        {/* Card 2 */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
            Validación Física, no solo digital
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Un escáner láser lee un código, pero no sabe si faltan cajas.
            Nuestra IA cuenta físicamente los bultos para garantizar precisión
            del <span className="text-[#17ccd3] font-semibold">99.9%</span>.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <Plug className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
            Integración Nativa API
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Sincronización en tiempo real con Cygnus, SAP y los principales
            WMS.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Cygnus", "SAP", "Otros WMS"].map((t) => (
              <span key={t} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/80">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Canal Verde — Aprobación automática
            </div>
            <div className="flex items-center gap-2 text-red-300">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Canal Rojo — Alerta de discrepancia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
