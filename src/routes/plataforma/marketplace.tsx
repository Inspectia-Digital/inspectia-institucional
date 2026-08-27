import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { MARKETPLACE_CATEGORIES } from "@/content/marketplace";
import { MODULES } from "@/content/modules";
import { DEMO_URL } from "@/content/site";
import { pushEvent } from "@/lib/analytics";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const TITLE = "Marketplace de servicios para proyectos de planta · InspectIA";
const DESCRIPTION =
  "Cámaras y sensores, ERP, WMS, bots, financiamiento y analítica. Servicios de terceros que contratás con InspectIA, sin coordinar cinco proveedores.";

/**
 * Marketplace (§7.4).
 *
 * **La distinción que sostiene esta página:** el marketplace son servicios de terceros que
 * comercializamos, con precio y CTA. Las integraciones son información técnica, viven en
 * /plataforma/integraciones y no llevan ni precio ni CTA. Nunca comparten grilla, y en
 * esta página **no se usa "integrado" ni "integración" para describir un servicio**: si el
 * copy dice "ya integrado", el visitante entiende capacidad técnica y se pierde la
 * distinción que el resto del sitio construyó.
 *
 * Los CTA no son el par de siempre porque le hablan a dos audiencias opuestas, así que la
 * banda de cierre estándar queda apagada.
 *
 * Sin FAQPage y sin schema de producto: los servicios son de terceros y no tenemos precio
 * publicado de ninguno, así que declarar Product u Offer sería inventar datos estructurados.
 */
export const Route = createFileRoute("/plataforma/marketplace")({
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/plataforma/marketplace" }),
  component: Page,
});

const ALL = "todas";

function Page() {
  const [filter, setFilter] = useState(ALL);
  const shown =
    filter === ALL
      ? MARKETPLACE_CATEGORIES
      : MARKETPLACE_CATEGORIES.filter((c) => c.key === filter);

  return (
    <SiteLayout bottomCta={false}>
      <PageHero
        eyebrow="Marketplace"
        title="Todo lo que el proyecto necesita, en un solo proveedor"
        lead="Un proyecto de planta casi nunca es sólo software: hacen falta cámaras, sensores, un ERP que hable con la línea, un WMS que reciba los datos, a veces financiamiento. En el marketplace están los proveedores que ya trabajan sobre InspectIA, así que los contratás con nosotros y no tenés que coordinar cinco presupuestos."
        cta={false}
      />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          {/* Pills y no un desplegable: siete opciones se leen de un vistazo y elegir una
              es un clic, contra tres de un select. */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
            <FilterPill active={filter === ALL} onClick={() => setFilter(ALL)}>
              Todas
            </FilterPill>
            {MARKETPLACE_CATEGORIES.map((c) => (
              <FilterPill key={c.key} active={filter === c.key} onClick={() => setFilter(c.key)}>
                {c.name}
              </FilterPill>
            ))}
          </div>

          <ul className="mt-10 grid gap-6 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {shown.map((c) => {
              const modules = c.combinesWith
                .map((k) => MODULES.find((m) => m.key === k)?.name)
                .filter(Boolean);

              return (
                <li
                  key={c.key}
                  className="flex min-w-0 flex-col rounded-[var(--radius-lg)] border border-line p-6"
                >
                  <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{c.name}</h3>
                  <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink">
                    {c.solves}
                  </p>

                  {c.providers.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap items-center gap-6">
                      {c.providers.map((p) =>
                        p.logo ? (
                          <li key={p.name} className="min-w-0">
                            {/* En color: acá el proveedor es parte de lo que se vende. */}
                            <img
                              src={p.logo}
                              alt={p.name}
                              loading="lazy"
                              decoding="async"
                              className="h-7 w-auto"
                            />
                          </li>
                        ) : (
                          <li key={p.name} className="min-w-0 text-sm text-logo">
                            {p.name}
                          </li>
                        ),
                      )}
                    </ul>
                  ) : (
                    // La categoría vacía se muestra igual: define el alcance del
                    // marketplace, que es el argumento. Y la línea convierte el hueco en
                    // una captación en vez de un "próximamente".
                    <p className="mt-5 text-[13px] leading-[var(--leading-normal)] text-ink-muted">
                      Estamos cerrando los proveedores de esta categoría. Si necesitás uno,
                      escribinos y te lo buscamos.
                    </p>
                  )}

                  {modules.length > 0 && (
                    <p className="mt-5 text-[13px] text-ink-secondary">
                      <span className="font-medium text-ink">Se combina con:</span>{" "}
                      {modules.join(" · ")}
                    </p>
                  )}

                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() =>
                      pushEvent("marketplace_lead", {
                        service: c.name,
                        category: c.key,
                        direction: "demanda",
                      })
                    }
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
                  >
                    Pedir una cotización
                    <ArrowRight className="size-4" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* TODO(equipo): la ficha por servicio —qué incluye, con qué módulo se combina,
              cómo se contrata y a quién se le factura— entra cuando esté definido el
              esquema comercial de cada uno: reventa con margen, comisión o derivación. Sin
              eso no se puede escribir "cómo se contrata", que es la mitad de la ficha. */}
        </div>
      </section>

      {/* CTA del cliente. Un solo botón y no el par: quien está en esta página no viene a
          crear una cuenta gratis, viene a resolver un proyecto. */}
      <section className="bg-surface px-5 pb-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)] rounded-[var(--radius-lg)] border border-line p-8 md:p-10">
          <h2 className="max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            ¿No sabés cuál necesitás?
          </h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Contanos qué tiene que resolver el proyecto y te decimos qué hace falta, con qué
            proveedor y en qué orden. El relevamiento no tiene cargo.
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() =>
              pushEvent("demo_scheduled_click", { source_page: "/plataforma/marketplace" })
            }
            className="mt-8 inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px"
          >
            Agendar demo
          </a>
        </div>
      </section>

      {/* Captación de oferta. Le habla a otra audiencia, así que va en banda aparte y
          separada de la grilla: no puede parecer parte de la oferta al cliente. */}
      <section className="bg-surface-sunken px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="eyebrow">Para proveedores</p>
          <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Quiero ofrecer mi servicio
          </h2>
          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Si vendés hardware industrial, implementás ERP o WMS, o financiás capital de trabajo
            para PyMEs industriales, en el marketplace estás frente a plantas que ya están haciendo
            el proyecto. Contanos qué ofrecés.
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() =>
              pushEvent("marketplace_lead", {
                service: "alta de proveedor",
                category: "oferta",
                direction: "oferta",
              })
            }
            className="mt-8 inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] border border-line-brand bg-action-soft px-8 text-[15px] font-semibold text-action-soft-text transition-colors duration-[160ms] hover:bg-teal-100 active:translate-y-px"
          >
            Escribinos
          </a>
        </div>
      </section>

      {/* Al final y separado: es la aclaración que evita la confusión, no una salida
          principal. */}
      <section className="bg-surface px-5 py-16 md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <p className="max-w-[60ch] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            ¿Buscás con qué sistemas se conecta la plataforma? Eso está en integraciones.
          </p>
          <Link
            to="/plataforma/integraciones"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver las integraciones
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-9 shrink-0 whitespace-nowrap rounded-[var(--radius-pill)] border px-4 text-sm font-medium",
        "transition-colors duration-[160ms]",
        active
          ? "border-transparent bg-action text-white"
          : "border-line-strong text-ink-secondary hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
