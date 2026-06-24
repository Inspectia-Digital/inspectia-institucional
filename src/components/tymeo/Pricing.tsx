import { Check } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
  ctaVariant: "cyan" | "ghost" | "outline";
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "Gratis",
    desc: "Digitalización inicial sin fricción.",
    features: [
      "Formularios móviles",
      "Registro manual de paradas",
      "Historial básico",
    ],
    cta: "Comenzar Gratis",
    href: "#crear-cuenta",
    ctaVariant: "ghost",
  },
  {
    name: "Pro",
    price: "SaaS Recurrente",
    desc: "OEE automatizado en tiempo real.",
    features: [
      "Todo lo de Starter",
      "Sensores IoT / Edge",
      "Integración PLC",
      "Dashboards en vivo",
      "Time-to-Value < 15 días",
    ],
    cta: "Agendar Demo",
    href: "#demo",
    highlight: true,
    ctaVariant: "cyan",
  },
  {
    name: "Enterprise",
    price: "A Medida",
    desc: "Orquestación profunda corporativa.",
    features: [
      "Todo lo de Pro",
      "Integraciones custom (SAP / WMS)",
      "Agentes IA dedicados",
      "Server dedicado",
    ],
    cta: "Contactar Ventas",
    href: "#contacto",
    ctaVariant: "outline",
  },
];

function ctaClass(v: Plan["ctaVariant"]) {
  if (v === "cyan")
    return "bg-[#17ccd3] text-[#041A1B] hover:bg-[#17ccd3]/90 shadow-[0_0_30px_rgba(23,204,211,0.4)]";
  if (v === "outline")
    return "border border-white/30 text-white hover:bg-white/5";
  return "border border-[#17ccd3]/40 text-[#17ccd3] hover:bg-[#17ccd3]/10";
}

export function Pricing() {
  return (
    <section className="py-20 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Escale la inteligencia de su planta a su propio ritmo.
        </h2>
        <p className="mt-4 text-slate-400">
          Empiece gratis. Pague solo cuando esté listo para automatizar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-3xl p-8 backdrop-blur-xl transition ${
              p.highlight
                ? "bg-[#084749]/60 border-2 border-[#17ccd3] shadow-[0_0_60px_rgba(23,204,211,0.25)] md:scale-105 z-10"
                : "bg-[#084749]/40 border border-white/10"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#17ccd3] text-[#041A1B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Recomendado
              </span>
            )}
            <p className="text-sm text-slate-400 uppercase tracking-wider">
              {p.name}
            </p>
            <p className="mt-3 text-3xl md:text-4xl font-bold text-white">
              {p.price}
            </p>
            <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                  <Check className="h-4 w-4 text-[#17ccd3] mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={p.href}
              className={`mt-8 inline-flex items-center justify-center rounded-full py-3 px-6 font-bold transition ${ctaClass(p.ctaVariant)}`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
