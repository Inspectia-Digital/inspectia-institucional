import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CONSENT_STORAGE_KEY, GTM_ID, updateConsent, type ConsentChoice } from "@/lib/gtm";

/**
 * Banner de cookies con Consent Mode v2, desde el día uno (§8).
 *
 * Hecho a mano y sin librería a propósito: las plataformas de consentimiento pesan cientos
 * de kilobytes, bloquean el primer render y son justo lo que arruina el Core Web Vitals
 * que §9 pide cuidar. Acá hay dos botones y un `gtag('consent','update')`.
 *
 * Seguir sin cookies es tan fácil como aceptar —un clic, mismo peso visual—: un banner
 * donde negarse cuesta más que aceptar no es un consentimiento válido, y un rechazo
 * escondido en un enlace de 11px es un problema legal, no una optimización.
 *
 * El botón secundario dice "Seguir sin cookies" y no "Rechazar": nombra lo que pasa en
 * vez de nombrar una negación.
 */

/* La clave vive en lib/gtm porque el script del head también la lee, para restaurar el
   consentimiento antes de que arranque el contenedor. Duplicarla acá era una bomba de
   tiempo: cambiar una y no la otra rompe la restauración sin que falle nada visible. */
const STORAGE_KEY = CONSENT_STORAGE_KEY;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sin contenedor configurado no hay nada que consentir, así que no se muestra nada.
    if (!GTM_ID) return;
    /* El script del head ya restauró la concesión antes de cargar GTM, así que acá no
       hay que volver a aplicarla: alcanza con decidir si el banner se muestra. Se
       reaplica igual cuando lo guardado es "denied", que es barato y deja el estado
       explícito aunque el head no haya podido leer el almacenamiento. */
    let stored: ConsentChoice | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
    } catch {
      // Navegación privada estricta: no se puede leer. Se pregunta de nuevo.
    }
    if (stored === "denied") updateConsent("denied");
    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    updateConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Preferencias de cookies"
      // Por encima de la barra fija de CTA en mobile.
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface p-5 shadow-[var(--shadow-lg)] md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:rounded-[var(--radius-lg)] md:border"
    >
      <p className="text-[15px] leading-[var(--leading-normal)] text-ink">
        Usamos cookies para entender cómo se usa el sitio y mejorarlo. Podés aceptarlas o seguir sin
        ellas: el sitio funciona igual.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="h-11 flex-1 rounded-[var(--radius-md)] bg-action px-5 text-sm font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="h-11 flex-1 rounded-[var(--radius-md)] border border-line-strong px-5 text-sm font-semibold text-ink transition-colors duration-[160ms] hover:bg-surface-sunken"
        >
          Seguir sin cookies
        </button>
      </div>
      <Link
        to="/privacidad"
        className="mt-3 inline-block text-[13px] text-ink-secondary underline-offset-4 hover:underline"
      >
        Política de privacidad
      </Link>
    </div>
  );
}
