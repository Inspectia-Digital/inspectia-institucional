import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { pageHead } from "@/lib/seo";

const TITLE = "Una plataforma, ocho módulos, un solo tablero · InspectIA";
const DESCRIPTION =
  "Los módulos de InspectIA comparten los datos maestros, los usuarios y el tablero. El segundo módulo no es un proyecto nuevo: es una casilla que se habilita.";

/** Pillar page de producto y destino del mega-menú (§7.2). */
export const Route = createFileRoute("/plataforma/")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/plataforma" }),
  component: PlatformPage,
});

/** Las tres capas de §7.2. Sin ilustración genérica de IA: lo que se explica es dónde se
 *  apoya la plataforma, que es el diferencial real. */
const LAYERS = [
  {
    title: "Lo que ya tenés",
    body: "Las cámaras de la planta, los sensores, el PLC de hace treinta años, el ERP que nadie va a cambiar y el WMS del depósito.",
  },
  {
    title: "La capa de InspectIA",
    body: "Se conecta a eso, interpreta lo que pasa y avisa cuando algo se sale de lo esperado.",
  },
  {
    title: "Lo que ves",
    body: "Tableros por línea y por turno, pantalla de piso, alertas y los informes que ya venías armando a mano.",
  },
];

function PlatformPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="InspectIA OS"
        title="Una plataforma, ocho módulos, un solo tablero"
        lead="Los módulos comparten los datos maestros de empresa, planta, línea, máquina y SKU, los usuarios y sus roles, y el mismo tablero. Contratás sólo los que usás."
      />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">La arquitectura</p>
          <h2 className="mt-4 max-w-[20ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Se apoya en lo que ya está instalado.
          </h2>

          <ol className="mt-12 grid gap-6 min-[720px]:grid-cols-3">
            {LAYERS.map((l, i) => (
              <li
                key={l.title}
                className="min-w-0 rounded-[var(--radius-lg)] border border-line p-6"
              >
                <span className="metric text-sm font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[length:var(--text-card)] leading-snug text-ink">
                  {l.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {l.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface-sunken px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Los módulos</p>
          <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Un módulo resuelve un problema. Juntos, gobiernan la operación.
          </h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Empezás por uno y sumás los que necesites, cuando los necesites.
          </p>
          <ModuleGrid className="mt-12" />
        </div>
      </section>

      {/* Servicio e integración nunca comparten grilla ni sección (§11.6): el servicio del
          marketplace se contrata con nosotros y lleva CTA; la integración no lleva ninguno. */}
      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto grid max-w-[var(--content-max)] gap-6 min-[720px]:grid-cols-2">
          <TeaserCard
            to="/plataforma/integraciones"
            eyebrow="Integraciones"
            title="Con qué se conecta"
            body="Qué ERP, WMS, PLC y sensórica soporta la plataforma. Es información técnica: no hay nada que contratar acá."
          />
          <TeaserCard
            to="/plataforma/marketplace"
            eyebrow="Marketplace"
            title="Todo lo que el proyecto necesita, en un solo proveedor"
            body="Cámaras y sensores, ERP, WMS, bots, financiamiento y analítica. Servicios de terceros que contratás con nosotros."
          />
        </div>
      </section>

      {/* TODO(equipo): faltan las secciones de seguridad y datos, y la de roles y accesos
          (§7.2, puntos 6 y 7). Se escriben con el equipo de producto: son afirmaciones
          sobre dónde viven los datos y quién accede, y no se redactan a ojo. */}
    </SiteLayout>
  );
}

function TeaserCard({
  to,
  eyebrow,
  title,
  body,
}: {
  to: "/plataforma/integraciones" | "/plataforma/marketplace";
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      to={to}
      className="group min-w-0 rounded-[var(--radius-lg)] border border-line p-8 transition-[border-color,box-shadow] duration-[160ms] hover:border-line-brand hover:shadow-[var(--shadow-sm)]"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="mt-4 text-[length:var(--text-card)] leading-snug text-ink">{title}</h3>
      <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">{body}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        Ver más
        <ArrowRight
          className="size-4 transition-transform duration-[160ms] group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}
