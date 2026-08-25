import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { RoiCalculator } from "@/components/roi/RoiCalculator";
import { ROI_MODELS, isRoiModule } from "@/lib/roi";
import type { ModuleKey } from "@/content/modules";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

const TITLE = "Calculá el retorno de tu operación · InspectIA";
const DESCRIPTION =
  "Proyectá el ahorro y el tiempo de repago de cada módulo con los números de tu planta. El resultado se ve completo, sin registrarte.";

/**
 * Calculadora de ROI (§7.7). Es el activo de conversión del sitio y la herramienta con la
 * que un consultor arma la propuesta.
 *
 * La pestaña vive en la URL —/roi?modulo=tymeo— para poder enlazar desde cada página de
 * módulo directo al modelo que le corresponde.
 *
 * TODO(fase 5): modo consultor —varios módulos a la vez, retorno combinado, supuestos
 * editables y PDF con logo propio— y la generación del PDF, que hoy no existe.
 */
export const Route = createFileRoute("/roi")({
  // `modulo` es opcional: /roi sin parámetro abre el primero, y los enlaces del sitio que
  // no apuntan a un módulo puntual no tienen que inventar uno. Un valor inválido se
  // descarta en vez de romper la página.
  validateSearch: (search: Record<string, unknown>): { modulo?: ModuleKey } => {
    const raw = typeof search.modulo === "string" ? search.modulo : "";
    return isRoiModule(raw) ? { modulo: raw } : {};
  },
  // Sin el parámetro en la canónica: /roi y /roi?modulo=tymeo son la misma página con
  // otra pestaña abierta, no dos documentos.
  head: () => pageHead({ title: TITLE, description: DESCRIPTION, path: "/roi" }),
  component: RoiPage,
});

function RoiPage() {
  const { modulo } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const model = ROI_MODELS.find((m) => m.module === modulo) ?? ROI_MODELS[0];

  return (
    <SiteLayout module={model.module}>
      <PageHero
        eyebrow="Calculadora"
        title="Calculá el retorno con los números de tu planta"
        lead="Movés los parámetros de tu operación y el resultado se actualiza solo. Cada modelo muestra sus supuestos y el costo de InspectIA a la vista. No hace falta registrarse."
        cta={false}
      />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          {/* Escritorio: pestañas con indicador de 2px en la activa.
              Mobile: un desplegable, porque cuatro pestañas no entran en 375px. */}
          <div className="border-b border-line">
            <div className="hidden gap-8 min-[720px]:flex" role="tablist">
              {ROI_MODELS.map((m) => {
                const active = m.module === model.module;
                return (
                  <Link
                    key={m.module}
                    to="/roi"
                    search={{ modulo: m.module }}
                    role="tab"
                    aria-selected={active}
                    className={cn(
                      "-mb-px border-b-2 pb-4 text-[15px] font-medium transition-colors duration-[160ms]",
                      active
                        ? "border-[var(--border-brand)] text-brand"
                        : "border-transparent text-ink-secondary hover:text-ink",
                    )}
                  >
                    {m.label}
                  </Link>
                );
              })}
            </div>

            <label className="block pb-4 min-[720px]:hidden">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-secondary">
                Módulo
              </span>
              <select
                value={model.module}
                onChange={(e) => navigate({ search: { modulo: e.target.value as ModuleKey } })}
                className="h-11 w-full rounded-[var(--radius-md)] border border-line-strong bg-surface px-3 text-[15px] text-ink"
              >
                {ROI_MODELS.map((m) => (
                  <option key={m.module} value={m.module}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-12">
            {/* key: al cambiar de módulo el estado arranca en los valores por omisión del
                modelo nuevo, en vez de arrastrar los del anterior. */}
            <RoiCalculator key={model.module} model={model} />
          </div>

          <p className="mt-16 max-w-[60ch] text-[13px] leading-[var(--leading-normal)] text-ink-muted">
            Faltan los modelos de control de pedidos, sobrestock con drones, cámaras inteligentes y
            agente. Esos cuatro se cotizan por alcance: escribinos y los calculamos con vos.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
