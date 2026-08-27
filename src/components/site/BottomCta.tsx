import { MessageCircle } from "lucide-react";
import { CtaPair } from "@/components/site/CtaPair";
import { WHATSAPP_URL } from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";

/**
 * Banda de cierre (§11.10). Se repite al pie de todas las páginas con el mismo copy: es
 * el único cierre del sitio, no uno por vertical. Reemplaza los seis BottomCta.tsx que
 * había —uno por landing— con el mismo contenido escrito seis veces.
 *
 * Lo que había que contar de la demo —veinte minutos, con datos de una planta parecida a
 * la tuya, sin presentación— se dice acá al lado del botón, y por eso /demo no necesita
 * ser una página: es una redirección al calendario (§7.10).
 */
export function BottomCta({
  title = "Veinte minutos y te mostramos tu propia línea medida",
  lead = "Elegís el horario y hablás con alguien que entiende de planta. Sin presentación de PowerPoint. Si preferís arrancar solo, creá la cuenta y probá el plan gratuito hoy.",
  module,
  industry,
}: {
  title?: string;
  lead?: string;
  module?: string;
  industry?: string;
}) {
  return (
    <section className="bg-brand-deep px-5 py-24 md:px-8">
      <div className="mx-auto flex max-w-[var(--content-max)] flex-col items-center text-center">
        <h2 className="max-w-[18ch] text-[28px] leading-tight text-on-brand md:text-[var(--text-section)]">
          {title}
        </h2>
        <p className="mt-5 max-w-[var(--lead-max)] text-on-brand-secondary">{lead}</p>

        <CtaPair surface="brand" module={module} industry={industry} className="mt-9 max-w-md" />

        {WHATSAPP_URL && (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => pushEvent("whatsapp_click", { source_page: sourcePage() })}
            className="mt-6 inline-flex items-center gap-2 text-sm text-on-brand-secondary transition-colors duration-[160ms] hover:text-on-brand"
          >
            <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
            Escribinos por WhatsApp
          </a>
        )}
      </div>
    </section>
  );
}
