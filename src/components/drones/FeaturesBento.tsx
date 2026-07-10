import { Compass, ShieldOff, Plug } from "lucide-react";

export function FeaturesBento() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Inteligencia aérea diseñada para el almacén.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1 — Full width */}
        <div className="md:col-span-2 bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl md:text-3xl font-bold text-white">
              Navegación Visual Autónoma (Sin GPS)
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Nuestros drones no dependen de señales GPS externas. Utilizan
              cámaras y sensores láser (LiDAR/SLAM) para mapear el depósito en
              3D y navegar pasillos estrechos de forma 100% segura.
            </p>
          </div>

          {/* SVG SLAM map */}
          <svg
            viewBox="0 0 400 220"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid */}
            <defs>
              <pattern id="slamGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#17ccd3" strokeOpacity="0.12" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="400" height="220" fill="url(#slamGrid)" />

            {/* Aisle walls */}
            <rect x="40" y="40" width="60" height="140" fill="#084749" stroke="#17ccd3" strokeOpacity="0.4" />
            <rect x="300" y="40" width="60" height="140" fill="#084749" stroke="#17ccd3" strokeOpacity="0.4" />

            {/* Drone path */}
            <path
              d="M 130 180 Q 130 110 200 110 T 270 40"
              stroke="#17ccd3"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
            </path>

            {/* Drone icon */}
            <g transform="translate(200 110)">
              <circle r="18" fill="#17ccd3" opacity="0.15" />
              <circle r="5" fill="#17ccd3" />
            </g>

            {/* LiDAR beams */}
            {[-60, -30, 0, 30, 60].map((angle) => (
              <line
                key={angle}
                x1="200"
                y1="110"
                x2={200 + 90 * Math.cos((angle * Math.PI) / 180)}
                y2={110 + 90 * Math.sin((angle * Math.PI) / 180)}
                stroke="#17ccd3"
                strokeOpacity="0.5"
                strokeWidth="1"
              />
            ))}

            <text x="20" y="20" fill="#17ccd3" fontSize="9" fontWeight="700" opacity="0.7">
              SLAM MAP · 3D
            </text>
          </svg>
        </div>

        {/* Card 2 */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <ShieldOff className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
            Cero Trabajo en Altura
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Erradique el riesgo de accidentes laborales. No vuelva a subir a un
            operario en un elevador tijera para buscar un pallet perdido.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <Plug className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
            Conciliación Cygnus/SAP
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            El dron asocia la etiqueta de la ubicación física con la del
            contenedor. Si detecta posiciones vacías o pallets equivocados,
            levanta la alerta al WMS.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Cygnus", "SAP", "Otros WMS"].map((t) => (
              <span key={t} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/80">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
