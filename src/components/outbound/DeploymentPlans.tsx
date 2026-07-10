import { Check, ArrowRight } from "lucide-react";

type Plan = {
  name: string;
  badge: string;
  desc: string;
  features: string[];
  cta: string;
  variant: "ghost" | "primary" | "outline";
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Despacho Mobile",
    badge: "Baja Fricción",
    desc: "Validación por foto antes de sellar.",
    features: [
      "App móvil para el empacador",
      "Captura fotográfica final",
      "Validación IA en la nube",
      "Registro de evidencia",
    ],
    cta: "Probar App",
    variant: "ghost",
  },
  {
    name: "Mesa Inteligente",
    badge: "Más Elegido",
    desc: "Cámaras cenitales fijas para validación continua.",
    features: [
      "Hardware fijo cenital",
      "Sistema Canal Verde/Rojo en vivo",
      "Integración WMS directa",
      "Alertas visuales para el operario",
    ],
    cta: "Agendar Instalación",
    variant: "primary",
    highlight: true,
  },
  {
    name: "Clasificación Continua",
    badge: "High Volume",
    desc: "Control en movimiento sobre cintas y sorters.",
    features: [
      "Cámaras de alta velocidad",
      "Lectura en movimiento (in-motion)",
      "Desvío automático de cajas al retrabajo (PLC)",
      "Soporte 24/7",
    ],
    cta: "Contactar Ingeniería",
    variant: "outline",
  },
];

export function DeploymentPlans() {
  return (
    <section id="planes" className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Asegure su última milla, sin importar su volumen.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-3xl p-8 backdrop-blur-xl transition ${
              p.highlight
                ? "bg-[#084749]/60 border-2 border-[#17ccd3] shadow-[0_0_60px_rgba(23,204,211,0.25)] md:scale-[1.03] md:-my-2"
                : "bg-[#084749]/40 border border-white/10"
            }`}
          >
            {p.highlight ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#17ccd3] text-[#041A1B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                {p.badge}
              </span>
            ) : (
              <span className="inline-block self-start rounded-full bg-[#17ccd3]/15 border border-[#17ccd3]/30 px-3 py-1 text-xs font-semibold text-[#17ccd3] uppercase tracking-wider">
                {p.badge}
              </span>
            )}

            <h3 className="mt-4 text-2xl font-bold text-white">{p.name}</h3>
            <p className="mt-3 text-slate-300 leading-relaxed">{p.desc}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-slate-200"
                >
                  <Check className="h-4 w-4 text-[#17ccd3] mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contacto"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3 px-6 font-bold transition ${
                p.variant === "primary"
                  ? "bg-[#17ccd3] text-[#041A1B] hover:bg-[#17ccd3]/90 shadow-[0_0_30px_rgba(23,204,211,0.4)]"
                  : p.variant === "outline"
                  ? "border border-white/25 text-white hover:bg-white/5"
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
