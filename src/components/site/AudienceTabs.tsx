import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MODULES, type ModuleKey } from "@/content/modules";
import { cn } from "@/lib/utils";

/**
 * Selector de perfil (§7.1, bloque 06).
 *
 * El hero le habla al cliente industrial. Las otras tres audiencias —PyME, consultor e
 * inversor— se atienden acá y con páginas dedicadas, en vez de partir el mensaje
 * principal en cuatro.
 *
 * Cada perfil dice el dolor **en sus palabras**, qué módulos aplican, un dato con su
 * período y adónde ir. Los enlaces son de texto: los dos únicos botones de la home son
 * los primarios, y ya están en el hero, en el bloque de plan gratuito y en el cierre.
 */

type Profile = {
  key: string;
  tab: string;
  pain: string;
  body: string;
  modules: ModuleKey[];
  stat: { value: string; caption: string };
  link: { label: string; to: string };
};

const PROFILES: Profile[] = [
  {
    key: "produccion",
    tab: "Producción y calidad",
    pain: "Sé que pierdo plata en scrap y en paradas, pero no sé cuánta ni dónde",
    body: "Las paradas quedan clasificadas por causa y por turno, y el defecto se marca en la línea en vez de aparecer en el cierre del mes.",
    modules: ["tymeo", "control-de-calidad"],
    stat: { value: "70 tipos de falla", caption: "en menos de 1 minuto · planta autopartista" },
    link: { label: "Ver TYMEO", to: "tymeo" },
  },
  {
    key: "logistica",
    tab: "Logística e inventario",
    pain: "El sistema dice una cosa y el rack dice otra",
    body: "Se cuenta lo que entra, lo que está en posición y lo que sale, contra lo que dice el WMS, sin frenar la operación.",
    modules: ["recepcion", "stock-en-posiciones", "sobrestock-drones", "control-de-pedidos"],
    stat: { value: "De 24 a 15 operarios", caption: "en recepción · centro de distribución" },
    link: { label: "Ver recepción de mercadería", to: "recepcion" },
  },
  {
    key: "pyme",
    tab: "Dueño de PyME",
    pain: "¿Esto es para una empresa de mi tamaño?",
    body: "Creás la cuenta y ese mismo día estás midiendo, sin hardware, sin visita y sin cotización. El hardware entra después, si lo querés.",
    modules: ["tymeo"],
    stat: { value: "USD 35", caption: "por planta y mes, con plan gratuito sin hardware" },
    link: { label: "Ver los ocho módulos", to: "" },
  },
  {
    key: "consultor",
    tab: "Consultor",
    pain: "Necesito algo que pueda recomendar y que después alguien ejecute",
    body: "Vos diagnosticás y acompañás; nosotros instalamos, conectamos y sostenemos el servicio. Y armás la propuesta con la calculadora a tu nombre.",
    modules: [],
    stat: { value: "5–15 días", caption: "de la reunión de arranque a producción" },
    link: { label: "Ver el programa para consultores", to: "" },
  },
];

export function AudienceTabs() {
  const [active, setActive] = useState(PROFILES[0].key);
  const profile = PROFILES.find((p) => p.key === active)!;
  const modules = profile.modules
    .map((k) => MODULES.find((m) => m.key === k))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">Según quién sos</p>
        <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          El mismo sistema, mirado desde tu silla.
        </h2>

        {/* Las pestañas desplazan en horizontal en mobile en vez de apilarse: cuatro
            etiquetas apiladas ocupan media pantalla antes de decir nada. */}
        <div
          role="tablist"
          aria-label="Perfiles"
          className="mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0"
        >
          {PROFILES.map((p) => {
            const isActive = p.key === active;
            return (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(p.key)}
                className={cn(
                  "h-9 shrink-0 whitespace-nowrap rounded-[var(--radius-pill)] border px-4 text-sm font-medium",
                  "transition-colors duration-[160ms]",
                  isActive
                    ? "border-transparent bg-action text-white"
                    : "border-line-strong text-ink-secondary hover:text-ink",
                )}
              >
                {p.tab}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          // key: la entrada se vuelve a disparar al cambiar de perfil.
          key={profile.key}
          className="mt-10 grid animate-rise-in gap-10 rounded-[var(--radius-lg)] border border-line p-8 md:p-10 min-[900px]:grid-cols-[1fr_auto] min-[900px]:gap-16"
        >
          <div className="min-w-0">
            <p className="text-[length:var(--text-lead)] font-medium leading-snug text-ink">
              «{profile.pain}»
            </p>
            <p className="mt-4 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              {profile.body}
            </p>

            {modules.length > 0 && (
              <p className="mt-6 text-sm text-ink-secondary">
                <span className="font-medium text-ink">Módulos que aplican:</span>{" "}
                {modules.map((m) => m.name).join(" · ")}
              </p>
            )}

            {profile.key === "consultor" ? (
              <Link to="/partners" className={LINK}>
                {profile.link.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            ) : profile.link.to ? (
              <Link to="/plataforma/$modulo" params={{ modulo: profile.link.to }} className={LINK}>
                {profile.link.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            ) : (
              <Link to="/plataforma" className={LINK}>
                {profile.link.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>

          <div className="min-w-0 min-[900px]:w-56 min-[900px]:border-l min-[900px]:border-line min-[900px]:pl-10">
            <p className="metric text-[32px] font-light leading-none text-ink">
              {profile.stat.value}
            </p>
            <p className="mt-3 text-[13px] leading-snug text-ink-secondary">
              {profile.stat.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const LINK =
  "mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4";
