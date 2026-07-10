import { Cpu, Plug, Repeat } from "lucide-react";

const CARDS = [
  {
    icon: Cpu,
    title: "Agnóstico al Hardware",
    desc: "Nos integramos a sus cámaras de seguridad actuales, utilizamos dispositivos móviles estándar o desplegamos drones autónomos sin instalaciones intrusivas.",
  },
  {
    icon: Plug,
    title: "Integración API WMS",
    desc: "Conectores nativos con Cygnus WMS, SAP y sistemas propietarios para conciliación sin intervención humana.",
  },
  {
    icon: Repeat,
    title: "Modelo RaaS / SaaS",
    desc: "Evite el CapEx prohibitivo. Acceda a robótica e IA como un servicio operativo mensual.",
  },
];

export function DifferentiatorsBento() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          ¿Por qué los líderes logísticos eligen InspectIA OS?
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
                {c.title}
              </h3>
              <p className="mt-3 text-slate-300 leading-relaxed">{c.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
