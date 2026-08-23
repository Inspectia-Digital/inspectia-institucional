import { Cable, Cpu, Microscope } from "lucide-react";

export function DifferentiatorsBento() {
  return (
    <section id="calidad" className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          El motor ciberfísico que la industria pesada exige.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full width */}
        <div className="md:col-span-2 rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
                <Cable className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl md:text-3xl font-bold text-white">
                Integración Nativa OT/IT (PLC & MES)
              </h3>
              <p className="mt-3 text-slate-300 leading-relaxed">
                No somos solo un tablero en la nube. Bajamos a la trinchera:
                nos conectamos en milisegundos a sus PLC (Siemens, Allen
                Bradley) para ejecutar descartes automáticos y sincronizamos
                con su ERP.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-2 md:min-w-[240px]">
              {[
                { label: "Siemens S7", status: "ONLINE" },
                { label: "Allen Bradley", status: "ONLINE" },
                { label: "MES / SAP", status: "SYNC" },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#041A1B]/60 px-4 py-2.5 font-mono text-xs"
                >
                  <span className="text-slate-300">{r.label}</span>
                  <span className="inline-flex items-center gap-1.5 text-[#17ccd3]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#17ccd3] animate-pulse" />
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <Cpu className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
            Hardware Agnóstico
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            No lo obligamos a comprar cámaras propietarias costosas. Corremos
            nuestros algoritmos sobre tecnología estándar o sensores de
            nuestros partners como Balluff.
          </p>
        </div>

        <div className="rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
            <Microscope className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
            Rigor Científico
          </h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Algoritmos propietarios que no son wrappers genéricos. Entrenados
            por PhDs e investigadores del Instituto Balseiro y CONICET.
          </p>
        </div>
      </div>
    </section>
  );
}
