import { CtaPair } from "@/components/site/CtaPair";
import { cn } from "@/lib/utils";

/**
 * Hero de página interna. El de la home es otro componente: lleva foto, tira de datos y
 * una grilla de dos columnas (§11.2).
 *
 * El titular se mide en cqw y no en px, y por eso la columna lleva `hero-col`
 * (container-type:inline-size). Sin ese contenedor el clamp no tiene contra qué resolver
 * y colapsa al mínimo.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  cta = true,
  module,
  industry,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  cta?: boolean;
  module?: string;
  industry?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("bg-brand-deep px-5 py-[var(--section-pad-md)] md:px-8", className)}>
      <div className="mx-auto max-w-[var(--content-max)]">
        <div className="hero-col max-w-[46rem]">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[var(--tracking-widest)] text-[var(--accent-on-brand)]">
              {eyebrow}
            </p>
          )}
          <h1
            className="mt-4 text-[length:var(--text-hero)] leading-[var(--leading-hero)] tracking-[var(--tracking-hero)] text-on-brand"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-on-brand-secondary">
              {lead}
            </p>
          )}
          {cta && (
            <CtaPair
              surface="brand"
              module={module}
              industry={industry}
              className="mt-9 max-w-md"
            />
          )}
          {/* Adentro de la columna: lo que va acá son enlaces de texto al lado de los dos
              botones, no un bloque aparte a lo ancho del hero. */}
          {children}
        </div>
      </div>
    </section>
  );
}
