import { Check, ArrowRight } from "lucide-react";

type Plan = {
  name: string;
  badge: string;
  desc: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Recepción Mobile",
    badge: "Despliegue Inmediato",
    desc: "Ideal para recepciones a nivel de piso. El operario utiliza la cámara de un celular o tablet para capturar el pallet. La IA cuenta las unidades en la foto y valida contra sistema.",
    features: [
      "App móvil (iOS / Android)",
      "Cero infraestructura física",
      "Integración WMS / ERP",
      "Time-to-Value < 7 días",
    ],
    cta: "Consultar Despliegue",
  },
  {
    name: "Recepción Continua",
    badge: "Alto Volumen",
    desc: "Automatización total. Lectura óptica sobre cintas transportadoras. El operario induce la carga, la IA cuenta a alta velocidad y frena la cinta ante discrepancias.",
    features: [
      "Cámaras de alta velocidad",
      "Integración a cinta transportadora",
      "Conteo continuo sin cuellos de botella",
      "Reducción masiva de FTEs",
    ],
    cta: "Agendar Demo Técnica",
    highlight: true,
  },
];

export function DeploymentPlans() {
  return (
    <section id="planes" className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Opciones de despliegue adaptadas a su volumen.
        </h2>
        <p className="mt-4 text-slate-400">
          Desde una app móvil hasta cintas transportadoras con visión continua.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-3xl p-8 md:p-10 backdrop-blur-xl transition ${
              p.highlight
                ? "bg-[#084749]/60 border-2 border-[#17ccd3] shadow-[0_0_60px_rgba(23,204,211,0.25)] md:scale-[1.02]"
                : "bg-[#084749]/40 border border-white/10"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#17ccd3] text-[#041A1B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {p.badge}
              </span>
            )}
            {!p.highlight && (
              <span className="inline-block self-start rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/30 px-3 py-1 text-xs font-semibold text-[#17ccd3] uppercase tracking-wider">
                {p.badge}
              </span>
            )}

            <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white">
              {p.name}
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed">{p.desc}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                  <Check className="h-4 w-4 text-[#17ccd3] mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#demo"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3 px-6 font-bold transition ${
                p.highlight
                  ? "bg-[#17ccd3] text-[#041A1B] hover:bg-[#17ccd3]/90 shadow-[0_0_30px_rgba(23,204,211,0.4)]"
                  : "border border-[#17ccd3]/40 text-[#17ccd3] hover:bg-[#17ccd3]/10"
              }`}
            >
              {p.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
