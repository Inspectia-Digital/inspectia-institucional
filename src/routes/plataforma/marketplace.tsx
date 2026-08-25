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

const TITLE = "Marketplace de servicios industriales · InspectIA";
const DESCRIPTION =
  "Cámaras y sensores, ERP, WMS, bots, financiamiento y analítica. Servicios de terceros que contratás con InspectIA en vez de coordinar cinco proveedores.";

/**
 * Marketplace (§7.4).
 *
 * Los CTA de esta página no son el par de siempre: acá se pide una cotización o se ofrece
 * un servicio (§8). Por eso la banda de cierre estándar queda apagada.
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
        lead="Cámaras y sensores, ERP, WMS, bots, financiamiento y analítica. Son servicios de terceros que comercializamos nosotros: los contratás con InspectIA y no tenés que coordinar cinco proveedores."
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
                  <span className="inline-flex h-6 w-fit items-center rounded-[var(--radius-pill)] bg-brand-subtle px-3 text-xs font-medium text-action-soft-text">
                    {c.name}
                  </span>

                  <p className="mt-4 text-[15px] leading-[var(--leading-normal)] text-ink">
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
                    <p className="mt-5 text-[13px] text-ink-muted">
                      Estamos sumando proveedores en esta categoría.
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
                    rel="noopener noreferrer"
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

          {/* TODO(equipo): la ficha por servicio —qué incluye, cómo se contrata y a quién
              se le factura— entra cuando esté definido el esquema comercial (§15.6). */}
        </div>
      </section>

      {/* Captación de oferta, separada de la grilla. Es el otro lado del marketplace. */}
      <section className="bg-surface-sunken px-5 py-16 md:px-8">
        <div className="mx-auto flex max-w-[var(--content-max)] flex-col gap-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
          <div className="min-w-0 max-w-[52ch]">
            <p className="eyebrow">Para proveedores</p>
            <p className="mt-3 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
              Si vendés hardware, software o servicios a plantas y depósitos, tus clientes ya están
              del otro lado de esta plataforma.
            </p>
          </div>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushEvent("marketplace_lead", {
                service: "alta de proveedor",
                category: "oferta",
                direction: "oferta",
              })
            }
            className="inline-flex h-[52px] shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-action px-8 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px"
          >
            Quiero ofrecer mi servicio
          </a>
        </div>
      </section>

      <section className="bg-surface px-5 py-16 md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <Link
            to="/plataforma/integraciones"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver con qué sistemas se integra la plataforma
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
