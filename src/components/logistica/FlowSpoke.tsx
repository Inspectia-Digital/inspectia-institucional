import { Link } from "@tanstack/react-router";
import { Truck, Boxes, PackageCheck, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Stage = {
  step: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  links: { label: string; to: string }[];
};

const STAGES: Stage[] = [
  {
    step: "01 · Inbound",
    icon: Truck,
    title: "Recepción de Mercadería",
    desc: "Auditoría automatizada en andenes y cintas. Validación contra ASN en milisegundos.",
    links: [{ label: "Ver solución de Recepción", to: "/recepcion" }],
  },
  {
    step: "02 · Storage",
    icon: Boxes,
    title: "Control de Stock en Piso y Altura",
    desc: "Conteo oportunístico con App Móvil y flotas de Drones Autónomos para sobrestock.",
    links: [
      { label: "App de Picking", to: "/stock-picking" },
      { label: "Drones Autónomos", to: "/drones" },
    ],
  },
  {
    step: "03 · Outbound",
    icon: PackageCheck,
    title: "Armado de Pedidos y Despacho",
    desc: "Validación óptica cenital. Canal Verde automático o Canal Rojo para evitar reclamos.",
    links: [{ label: "Ver solución de Armado", to: "/outbound" }],
  },
];

export function FlowSpoke() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Inteligencia inyectada en cada etapa del flujo.
        </h2>
        <p className="mt-4 text-slate-400">
          Un stack modular que cubre el viaje completo de su mercadería —
          desde el andén hasta la caja sellada.
        </p>
      </div>

      {/* Flow connector line (desktop) */}
      <div className="relative">
        <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#17ccd3]/40 to-transparent" />

        <div className="relative grid md:grid-cols-3 gap-6">
          {STAGES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="group relative flex flex-col rounded-3xl bg-[#084749]/40 backdrop-blur-xl border border-white/10 p-8 hover:border-[#17ccd3]/50 hover:shadow-[0_0_40px_rgba(23,204,211,0.18)] transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
                    {s.step}
                  </span>
                  <span className="inline-flex h-3 w-3 rounded-full bg-[#17ccd3] shadow-[0_0_12px_rgba(23,204,211,0.9)]" />
                </div>

                <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17ccd3]/15 border border-[#17ccd3]/30 text-[#17ccd3]">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-slate-300 leading-relaxed flex-1">
                  {s.desc}
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  {s.links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="group/link inline-flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#041A1B]/50 px-4 py-2.5 text-sm font-semibold text-[#17ccd3] hover:bg-[#17ccd3]/10 hover:border-[#17ccd3]/40 transition"
                    >
                      <span>{l.label}</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
