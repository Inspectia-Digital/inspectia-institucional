import { CheckCircle2, XCircle, Camera, Plug } from "lucide-react";

export function FeaturesBento() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Proteja sus márgenes y su marca en la última milla.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1 — Full width — Canal Verde / Rojo */}
        <div className="md:col-span-2 bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex gap-2">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/15 border border-red-400/40 text-red-300">
                <XCircle className="h-5 w-5" />
              </div>
            </div>
            <h3 className="mt-5 text-2xl md:text-3xl font-bold text-white">
              Sistema de Canal Verde y Rojo
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Erradique el doble control humano. Si la cámara detecta que la
              orden está completa, envía la señal de Canal Verde al WMS para
              imprimir la etiqueta. Si detecta discrepancias, bloquea la orden
              en Canal Rojo para revisión manual.
            </p>
          </div>

          {/* Traffic-signal visual */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Canal Verde
                </span>
              </div>
              <p className="mt-3 text-[11px] text-emerald-100/80 leading-relaxed">
                Orden completa → Impresión de etiqueta automática.
              </p>
              <div className="mt-3 h-1 rounded-full bg-emerald-400/70" />
            </div>
            <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.9)] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                  Canal Rojo
                </span>
              </div>
              <p className="mt-3 text-[11px] text-red-100/80 leading-relaxed">
                Discrepancia detectada → Bloqueo y revisión manual.
              </p>
              <div className="mt-3 h-1 rounded-full bg-red-500/70" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <Camera className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
            Auditoría Anti-Reclamos
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Cada orden empacada guarda un registro fotográfico/video en la
            nube. Si un cliente reclama un faltante, usted tiene la prueba
            visual irrefutable de lo que ingresó en la caja.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <Plug className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
            Conciliación Nativa API
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Conexión directa en milisegundos con Cygnus, SAP y su sistema de
            gestión de transporte (TMS) para no sumar ni un segundo de latencia
            al empaque.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Cygnus", "SAP", "TMS"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
