import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { DEMO_URL } from "@/lib/links";

type Plan = {
  id: string;
  name: string;
  desc: string;
  base: number | null; // null = a medida
  priceNote: string;
  features: string[];
  addons: string[];
  cta: string;
  href: string;
  highlight?: boolean;
  tag?: string;
  ctaVariant: "cyan" | "ghost" | "outline";
};

const ADDON_PRICE = 10;

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    desc: "Empezá a medir hoy, sin hardware.",
    base: 0,
    priceNote: "Para siempre, sin tarjeta",
    features: [
      "1 planta",
      "1 línea",
      "1 usuario (Gerencia)",
      "Registro manual, por formulario",
      "Líneas, estaciones y máquinas",
      "Turnos, paradas y alertas",
      "Dashboard",
    ],
    addons: ["RRHH", "Planificación"],
    cta: "Empezar gratis",
    href: "#planes",
    ctaVariant: "ghost",
  },
  {
    id: "start",
    name: "Start",
    desc: "Automatizado, con tu equipo completo.",
    base: 35,
    priceNote: "Por planta",
    features: [
      "1 planta",
      "3 líneas",
      "Usuarios ilimitados, todos los roles",
      "Registro automatizado (sensores, lectoras)",
      "Todo lo de Free",
      "RRHH incluido",
      "Planificación incluida",
      "Pantalla de piso (TV)",
      "Roles y accesos (RBAC)",
      "Auditoría y trazabilidad",
      "Identidad de marca propia",
    ],
    addons: [
      "Condiciones y energía",
      "Mantenimiento predictivo",
      "Lotes de producción",
      "Control de caducidades",
      "Recepción de materia prima",
    ],
    cta: "Hablar con ventas",
    href: DEMO_URL,
    highlight: true,
    tag: "Más elegido para arrancar con hardware",
    ctaVariant: "cyan",
  },
  {
    id: "pro",
    name: "Pro",
    desc: "Multi-planta y control de calidad avanzado.",
    base: 150,
    priceNote: "Por planta",
    features: [
      "Hasta 3 plantas",
      "Líneas ilimitadas",
      "Usuarios ilimitados",
      "Hasta 3 integraciones con sistemas externos",
      "Todo lo de Start",
      "Condiciones y energía",
      "Mantenimiento predictivo",
      "Lotes de producción",
      "Control de caducidades",
      "Recepción de materia prima",
    ],
    addons: [],
    cta: "Hablar con ventas",
    href: DEMO_URL,
    ctaVariant: "outline",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "Sin límites, a la medida de tu operación.",
    base: null,
    priceNote: "Consultanos tu caso",
    features: [
      "Plantas ilimitadas",
      "Líneas ilimitadas",
      "Usuarios ilimitados",
      "Integraciones a medida",
      "Todo lo de Pro",
      "Acompañamiento dedicado",
    ],
    addons: [],
    cta: "Consultar",
    href: DEMO_URL,
    ctaVariant: "outline",
  },
];

function ctaClass(v: Plan["ctaVariant"]) {
  if (v === "cyan")
    return "bg-[#17ccd3] text-[#041A1B] hover:bg-[#17ccd3]/90 shadow-[0_0_30px_rgba(23,204,211,0.4)]";
  if (v === "outline") return "border border-white/30 text-white hover:bg-white/5";
  return "border border-[#17ccd3]/40 text-[#17ccd3] hover:bg-[#17ccd3]/10";
}

function PlanCard({ plan }: { plan: Plan }) {
  const [selected, setSelected] = useState<string[]>([]);
  const addonTotal = selected.length * ADDON_PRICE;
  const total = plan.base === null ? null : plan.base + addonTotal;

  const priceLabel =
    total === null ? "A medida" : total === 0 ? "Gratis" : `USD ${total}`;

  const note =
    plan.id === "free" && addonTotal > 0
      ? "Requiere método de pago para los add-ons"
      : plan.priceNote;

  const isExternal = plan.href.startsWith("http");

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-7 backdrop-blur-xl transition ${
        plan.highlight
          ? "bg-[#084749]/60 border-2 border-[#17ccd3] shadow-[0_0_60px_rgba(23,204,211,0.25)] xl:scale-[1.03] z-10"
          : "bg-[#084749]/40 border border-white/10"
      }`}
    >
      {plan.tag && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#17ccd3] text-[#041A1B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          {plan.tag}
        </span>
      )}
      <p className="text-sm text-slate-400 uppercase tracking-wider">{plan.name}</p>
      <p className="mt-1 text-sm text-slate-400">{plan.desc}</p>
      <p className="mt-4 text-3xl md:text-4xl font-bold text-white">
        {priceLabel}
        {total !== null && total > 0 && (
          <span className="text-base font-medium text-slate-400">/mes</span>
        )}
      </p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>

      <ul className="mt-6 space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
            <Check className="h-4 w-4 text-[#17ccd3] mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {plan.addons.length > 0 && (
        <div className="mt-6 rounded-2xl border border-[#17ccd3]/20 bg-[#041A1B]/60 p-4">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
            Add-ons opcionales
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Tildá los que te interesan y mirá el precio actualizarse.
          </p>
          <div className="mt-3 space-y-2">
            {plan.addons.map((a) => {
              const checked = selected.includes(a);
              return (
                <label
                  key={a}
                  className="flex cursor-pointer items-center gap-3 text-sm text-slate-300 hover:text-white transition"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setSelected((prev) =>
                        checked ? prev.filter((x) => x !== a) : [...prev, a],
                      )
                    }
                    className="h-4 w-4 shrink-0 accent-[#17ccd3]"
                  />
                  <span className="flex-1">{a}</span>
                  <span className="font-mono text-[11px] font-semibold text-[#17ccd3] whitespace-nowrap">
                    +USD {ADDON_PRICE}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <a
        href={plan.href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={`mt-7 inline-flex items-center justify-center rounded-full py-3 px-6 font-bold transition ${ctaClass(plan.ctaVariant)}`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export function PlansAddons() {
  return (
    <section id="planes" className="py-20 md:py-24 scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
          Elegí tu punto de partida
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
          Un plan para cada etapa de tu planta
        </h2>
        <p className="mt-4 text-slate-400">
          Subís de plan cuando tu operación lo necesita — no antes. Todos los
          planes corren sobre la misma plataforma, sin migraciones. Cada add-on
          suma{" "}
          <span className="text-[#17ccd3] font-mono font-semibold">
            USD {ADDON_PRICE}/mes
          </span>
          .
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-start">
        {PLANS.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Plus className="h-3.5 w-3.5 text-[#17ccd3]" />
        Los add-ons se contratan aparte, sin cambiar de plan.
      </p>
    </section>
  );
}
