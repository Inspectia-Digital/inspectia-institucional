import { CtaPair } from "@/components/site/CtaPair";
import { WHATSAPP_URL } from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { Icon } from "@/components/icons/Icon";

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
    /* Blanco, y no teal como hasta el 19/10/2026.

       Los lineamientos limitan el teal profundo a **una banda por página**, y la que se
       queda con ella es el encabezado: es la superficie de marca y lo primero que ve
       alguien que no conoce la empresa. Con el cierre también en teal, toda página
       empezaba y terminaba en oscuro con el medio alternando — que es exactamente lo que
       el documento llama "una página que se siente cargada".

       El cierre no pierde fuerza por ser blanco: lo que empuja ahí es el botón, que sigue
       siendo el único sólido de la sección. La línea de arriba lo separa del bloque
       anterior ahora que no hay cambio de fondo que lo haga. */
    <section className="border-t border-line bg-surface px-5 py-[var(--section-pad)] md:px-8">
      <div className="mx-auto flex max-w-[var(--content-max)] flex-col items-center text-center">
        <h2 className="max-w-[18ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          {title}
        </h2>
        <p className="mt-5 max-w-[var(--lead-max)] text-ink-secondary">{lead}</p>

        <CtaPair module={module} industry={industry} className="mt-9 max-w-md" />

        {WHATSAPP_URL && (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => pushEvent("whatsapp_click", { source_page: sourcePage() })}
            className="mt-6 inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors duration-[160ms] hover:text-brand"
          >
            <Icon name="whatsapp" />
            Escribinos por WhatsApp
          </a>
        )}
      </div>
    </section>
  );
}
