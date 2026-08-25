import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { GTM_ID, updateConsent, type ConsentChoice } from "@/lib/gtm";

/**
 * Banner de cookies con Consent Mode v2, desde el día uno (§8).
 *
 * Hecho a mano y sin librería a propósito: las plataformas de consentimiento pesan cientos
 * de kilobytes, bloquean el primer render y son justo lo que arruina el Core Web Vitals
 * que §9 pide cuidar. Acá hay dos botones y un `gtag('consent','update')`.
 *
 * Rechazar es tan fácil como aceptar —un clic, mismo peso visual—: un banner donde
 * rechazar cuesta más que aceptar no es un consentimiento válido.
 */

const STORAGE_KEY = "inspectia.consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sin contenedor configurado no hay nada que consentir, así que no se muestra nada.
    if (!GTM_ID) return;
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
    if (stored) updateConsent(stored);
    else setVisible(true);
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
        Usamos cookies para entender cómo se navega el sitio. Podés rechazarlas y la web funciona
        igual.
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
          Rechazar
        </button>
      </div>
      <Link
        to="/privacidad"
        className="mt-3 inline-block text-[13px] text-ink-secondary underline-offset-4 hover:underline"
      >
        Cómo tratamos los datos
      </Link>
    </div>
  );
}
