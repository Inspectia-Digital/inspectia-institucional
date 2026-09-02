import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { RoiCalculator } from "@/components/roi/RoiCalculator";
import { ROI_MODELS, isRoiModule } from "@/lib/roi";
import type { ModuleKey } from "@/content/modules";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

const TITLE = "Calculadora de ROI para proyectos de planta · InspectIA";
const DESCRIPTION =
  "Calculá el retorno de medir tu producción, tu calidad o tu inventario. Sin registrarte, con los supuestos y el costo a la vista, y el informe en PDF si lo querés.";

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
        eyebrow="Calculadora de ROI"
        title="Cuánto te devuelve medir"
        lead="Elegí el módulo, poné los números de tu operación y mirá el retorno. No hace falta registrarse, los supuestos están a la vista y el costo de InspectIA entra en la cuenta."
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

          {/* Los cuatro sin modelo no aparecen como pestañas vacías: una pestaña que se
              abre en nada es peor que no tenerla. */}
          <p className="mt-16 max-w-[70ch] text-[13px] leading-[var(--leading-normal)] text-ink-muted">
            Sobrestock con drones, cámaras inteligentes, control de pedidos y el módulo Agente se
            cotizan según el alcance. Agendá una demo y los calculamos con tus números.
          </p>

          {/* TODO(fase 5): el modo consultor no está construido. En vez de simular un
              interruptor que no hace nada, el enlace al programa, que es donde se explica. */}
          <p className="mt-10 max-w-[70ch] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            ¿Sos consultor y querés armar propuestas con esta herramienta? Hay una versión que suma
            varios módulos y exporta con tu logo.
          </p>
          <Link
            to="/partners"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Conocer el programa de partners
            <Icon name="arrow-right" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
