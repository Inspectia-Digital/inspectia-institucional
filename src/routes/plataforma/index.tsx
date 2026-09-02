import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { SHOW_SECURITY_SECTION } from "@/content/site";
import { pageHead } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

const TITLE = "Plataforma modular para plantas y depósitos · InspectIA";
const DESCRIPTION =
  "Ocho módulos sobre una sola base: la misma estructura de plantas y líneas, los mismos usuarios, el mismo tablero. Sumás un módulo y no hay nada que volver a cargar.";

/**
 * Pillar page de producto y destino del mega-menú (§7.2).
 *
 * Sin datos estructurados propios: el `Organization` de la home ya cubre la marca, y
 * `SoftwareApplication` va en /precios con su `offers`, que es la única página con precio.
 */
export const Route = createFileRoute("/plataforma/")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/plataforma" }),
  component: PlatformPage,
});

/** Las tres capas. Sin ilustración genérica de IA: lo que se explica es dónde se apoya la
 *  plataforma, que es el diferencial real. */
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

/** Los cinco niveles de la operación física. No es un esquema de datos. */
const HIERARCHY = [
  { level: "Empresa", example: "el grupo, si tenés más de una planta" },
  { level: "Planta", example: "la fábrica o el centro de distribución" },
  { level: "Línea", example: "la línea de producción o el sector del depósito" },
  { level: "Máquina o estación", example: "el puesto donde pasa algo que se puede medir" },
  { level: "Producto", example: "el SKU que se fabrica o se mueve" },
];

const SECURITY = [
  {
    title: "Cada empresa, separada",
    body: "Tu información está aislada de la de cualquier otro cliente. Nadie de afuera de tu empresa ve tus líneas, tus paradas ni tu producción.",
  },
  {
    title: "Permisos por planta y por persona",
    body: "Definís quién entra a qué. Un encargado de una planta no ve la otra, y un operario ve su puesto y nada más.",
  },
  {
    title: "Queda registro de quién accede",
    body: "Cada acceso y cada cambio quedan registrados, así que siempre se puede reconstruir quién hizo qué y cuándo.",
  },
];

/** Escritas por lugar y no por nombre de rol: el rol dentro del sistema no coincide con
 *  cómo se llama el puesto en cada empresa. */
const ROLES = [
  {
    title: "En el puesto",
    body: "Pantalla simple, pensada para usarse de pie y con guantes: qué se está produciendo, cuánto falta y por qué se paró la línea. Se toca poco y se lee de lejos.",
  },
  {
    title: "En el piso",
    body: "El supervisor y el encargado ven su turno completo: qué línea está atrasada, qué paradas se acumularon y qué hay que clasificar antes de cerrar el turno.",
  },
  {
    title: "En la oficina",
    body: "Producción y gerencia comparan turnos, líneas y plantas, y ven la tendencia del mes sin pedirle un informe a nadie.",
  },
];

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function PlatformPage() {
  return (
    <SiteLayout>
      {/* 01 */}
      <PageHero
        eyebrow="InspectIA OS"
        title="Una plataforma, ocho módulos, un solo tablero"
        lead="Cada módulo resuelve un problema distinto, pero todos corren sobre la misma base: la misma estructura de plantas y líneas, los mismos usuarios, el mismo tablero. Contratás sólo los que usás, y el que sumás mañana aparece adentro de lo que tu equipo ya está usando hoy."
      />

      {/* 02 */}
      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <p className="eyebrow">La arquitectura</p>
          <h2 className={`mt-4 max-w-[20ch] ${H2}`}>Se apoya en lo que ya está instalado</h2>

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

      {/* 03 */}
      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className={CONTAINER}>
          <p className="eyebrow">Una sola base</p>
          <h2 className={`mt-4 max-w-[20ch] ${H2}`}>Tu planta se carga una vez</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Al principio se define cómo está organizada tu operación: qué plantas tenés, qué líneas
            hay en cada una, qué máquinas y qué se produce. Esa estructura la usan todos los
            módulos. El día que sumás el segundo, no hay nada que volver a cargar.
          </p>

          {/* Sangría creciente y una línea guía a la izquierda: la jerarquía se ve sin
              diagrama. Sin íconos de base de datos y sin cajas con flechas: es la
              organización física de la planta, no un esquema de datos. */}
          <ol className="mt-12 max-w-[var(--read-max)]">
            {HIERARCHY.map((h, i) => (
              <li
                key={h.level}
                className="border-l border-line-strong py-3 pl-5"
                style={{ marginLeft: `${i * 1.5}rem` }}
              >
                <h3 className="text-[15px] font-semibold text-ink">{h.level}</h3>
                <p className="mt-0.5 text-[15px] text-ink-secondary">{h.example}</p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            Y sobre eso, lo que cambia todos los días: turnos, personal, motivos de parada y planes
            de producción. Se configuran una vez y valen para toda la plataforma.
          </p>
        </div>
      </section>

      {/* 04 */}
      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <p className="eyebrow">Los módulos</p>
          <h2 className={`mt-4 max-w-[24ch] ${H2}`}>
            Un módulo resuelve un problema. Juntos, gobiernan la operación.
          </h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Empezás por el que te resuelve algo hoy y sumás los demás cuando haga falta. Cada uno
            tiene su página, con qué hace, qué necesita para funcionar y cuánto se recupera.
          </p>
          <ModuleGrid className="mt-12" />
        </div>
      </section>

      {/* 05 · Servicio e integración nunca comparten grilla (§11.6): el servicio del
             marketplace se contrata con nosotros y lleva CTA; la integración no lleva
             ninguno. */}
      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className={`${CONTAINER} grid gap-6 min-[720px]:grid-cols-2`}>
          <TeaserCard
            to="/plataforma/integraciones"
            eyebrow="Integraciones"
            title="Con qué se conecta"
            body="Qué ERP, WMS, PLC y sensórica soporta la plataforma. Es información técnica: no hay nada que contratar acá."
            cta="Ver las integraciones"
          />
          <TeaserCard
            to="/plataforma/marketplace"
            eyebrow="Marketplace"
            title="Todo lo que el proyecto necesita, en un solo proveedor"
            body="Cámaras y sensores, ERP, WMS, bots, financiamiento y analítica. Servicios de terceros que contratás con nosotros."
            cta="Explorar el marketplace"
          />
        </div>
      </section>

      {/* 06 */}
      {SHOW_SECURITY_SECTION && (
        <section className={`bg-surface ${SECTION}`}>
          <div className={CONTAINER}>
            <p className="eyebrow">Seguridad y datos</p>
            <h2 className={`mt-4 max-w-[24ch] ${H2}`}>Los datos de tu planta son tuyos</h2>
            <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
              Cada empresa ve sólo su información. No hay datos cruzados entre clientes, ni tableros
              comparativos, ni nada que salga de tu operación sin que lo decidas.
            </p>
            <ul className="mt-12 grid gap-8 min-[720px]:grid-cols-3">
              {SECURITY.map((s) => (
                <li key={s.title} className="min-w-0">
                  <h3 className="text-[length:var(--text-card)] leading-snug text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                    {s.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 07 · Alterna contra la anterior, que puede estar oculta. */}
      <section
        className={`${SHOW_SECURITY_SECTION ? "bg-surface-sunken" : "bg-surface"} ${SECTION}`}
      >
        <div className={CONTAINER}>
          <p className="eyebrow">Roles y accesos</p>
          <h2 className={`mt-4 max-w-[24ch] ${H2}`}>Cada uno ve lo que necesita para su trabajo</h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Un operario no necesita el tablero de la gerencia, y la gerencia no necesita la pantalla
            de carga del puesto. Son vistas distintas de los mismos datos, y entran todos: los
            usuarios no se pagan por cabeza.
          </p>

          <ul className="mt-12 grid gap-8 min-[720px]:grid-cols-3">
            {ROLES.map((r) => (
              <li key={r.title} className="min-w-0">
                <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{r.title}</h3>
                <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {r.body}
                </p>
              </li>
            ))}
          </ul>

          {/* Verificado contra pricing.ts: Free trae un usuario y Start —el primero con
              registro automatizado— trae usuarios ilimitados. */}
          <p className="mt-10 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            Usuarios ilimitados desde el primer plan con hardware: si el dato lo carga la gente del
            piso, cobrarte por cada persona que lo carga no tiene sentido.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function TeaserCard({
  to,
  eyebrow,
  title,
  body,
  cta,
}: {
  to: "/plataforma/integraciones" | "/plataforma/marketplace";
  eyebrow: string;
  title: string;
  body: string;
  /** El ancla es la señal: estos son los dos enlaces que reparten autoridad hacia las
   *  páginas hijas, y "ver más" no le dice nada ni al lector ni a Google. */
  cta: string;
}) {
  return (
    <Link
      to={to}
      className="group min-w-0 rounded-[var(--radius-lg)] border border-line bg-surface p-8 transition-[border-color,box-shadow] duration-[160ms] hover:border-line-brand hover:shadow-[var(--shadow-sm)]"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-[length:var(--text-card)] leading-snug text-ink">{title}</h2>
      <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">{body}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        {cta}
        <Icon
          name="arrow-right"
          className="transition-transform duration-[160ms] group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
