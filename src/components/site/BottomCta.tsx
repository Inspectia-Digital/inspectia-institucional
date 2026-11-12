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
/* El copy del cierre del sitio, exportado porque hay una segunda forma de cierre que lo
   necesita: las páginas de funcionalidad cierran con un panel tintado en vez de esta
   banda (guía de funcionalidades §3.12) y las que no traen un cierre propio usan este
   mismo texto. Exportarlo es lo que evita tenerlo escrito dos veces y que una de las dos
   copias se quede vieja. */
export const CLOSE_TITLE = "Veinte minutos y te mostramos tu propia línea medida";
export const CLOSE_LEAD =
  "Elegís el horario y hablás con alguien que entiende de planta. Sin presentación de PowerPoint. Si preferís arrancar solo, creá la cuenta y probá el plan gratuito hoy.";

export function BottomCta({
  title = CLOSE_TITLE,
  lead = CLOSE_LEAD,
  module,
  industry,
  /** La etiqueta del botón de demo, donde lo que se agenda no es una demo.
   *  Control de asistencia agenda una visita técnica a la planta: hay que ver el ingreso
   *  y lo que ya está instalado antes de poder cotizar. */
  demoLabel,
}: {
  title?: string;
  lead?: string;
  module?: string;
  industry?: string;
  demoLabel?: string;
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
        <h2 className="max-w-[18ch] text-[28px] leading-tight text-ink md:text-[length:var(--text-section)]">
          {title}
        </h2>
        <p className="mt-5 max-w-[var(--lead-max)] text-ink-secondary">{lead}</p>

        <CtaPair
          module={module}
          industry={industry}
          {...(demoLabel ? { demoLabel } : {})}
          className="mt-9 max-w-md"
        />

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
