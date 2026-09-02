import { Icon } from "@/components/icons/Icon";
import { WHATSAPP_URL } from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";

/**
 * Botón flotante de WhatsApp.
 *
 * En la industria de la región WhatsApp no es un canal más: es por donde efectivamente se
 * consulta. Por eso vale un acceso permanente y no sólo el enlace de la banda de cierre,
 * que aparece una vez y al final de la página.
 *
 * **Es deliberadamente subordinado a los dos primarios.** La regla del sitio es dos
 * botones y nunca un tercero, y esto es un tercer llamado permanente: se compensa con la
 * forma. Círculo con ícono en la esquina, sin etiqueta y sin relleno de botón primario, o
 * sea la gramática de un acceso y no la de una acción principal. Si algún día alguien lo
 * convierte en una píldora con texto, vuelve a competir y hay que discutirlo de nuevo.
 *
 * **Va en el teal del sistema y no en el verde de WhatsApp.** El verde sería el único
 * color fuera de la paleta en todo el sitio, y ya tratamos así al ícono de LinkedIn del
 * pie: se dibuja en el color de la marca propia, no en el de la ajena. El glifo alcanza
 * para que se entienda qué es.
 *
 * Sobre la posición: abajo de 900px hay una barra fija con los dos primarios que mide
 * 76px, así que el botón se levanta por encima en vez de taparla. El banner de cookies
 * ocupa ese mismo borde con z-50 y le gana a propósito: mientras haya que consentir algo,
 * eso es lo primero.
 */
export function WhatsAppFab() {
  if (!WHATSAPP_URL) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label="Escribinos por WhatsApp"
      title="Escribinos por WhatsApp"
      onClick={() => pushEvent("whatsapp_click", { source_page: sourcePage() })}
      className={[
        "fixed z-30 grid size-14 place-items-center rounded-full",
        // El aro blanco al 20% es el que resuelve el único fondo donde el botón se
        // apagaba: el teal profundo del hero, del cierre y del pie. Sobre blanco —que es
        // la mayor parte del scroll— no se percibe, y sobre teal define el borde. Un
        // botón fijo cruza las dos superficies y no puede cambiar de color en el camino.
        "bg-action text-white shadow-[var(--shadow-lg)] ring-2 ring-white/20",
        "transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px",
        // Por encima de la barra fija de mobile; en escritorio esa barra no existe.
        "bottom-[92px] right-5 nav:bottom-6 nav:right-8",
      ].join(" ")}
    >
      <Icon name="whatsapp" size="brand" />
    </a>
  );
}
