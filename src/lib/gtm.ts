/**
 * Contenedor de Google Tag Manager.
 *
 * El ID viene de una variable de entorno y no del código: el repositorio es público, y
 * además el contenedor de pruebas y el de producción no son el mismo. Vite sólo expone al
 * cliente las variables con prefijo VITE_.
 *
 * Sin la variable seteada no se inyecta nada. La página funciona igual y el dataLayer
 * acumula los eventos en memoria sin que nadie los lea, que es exactamente lo que
 * corresponde en un entorno sin medición.
 *
 * TODO(equipo): falta el ID del contenedor. Poner VITE_GTM_ID en el entorno de producción.
 */
export const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

/**
 * Consent Mode v2, con todo denegado hasta que la persona elija.
 *
 * Va **antes** del script del contenedor, y ese orden no es un detalle de estilo: si el
 * contenedor carga primero, las etiquetas disparan con el consentimiento por defecto de
 * Google —que es "concedido"— y para cuando el banner aparece ya se mandó el primer hit.
 */
const CONSENT_DEFAULTS = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update: 500
});
`.trim();

const containerScript = (id: string) =>
  `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');
`.trim();

/** Los `scripts` del head de la ruta raíz. Vacío si no hay contenedor configurado. */
export function gtmHeadScripts() {
  if (!GTM_ID) return [];
  return [{ children: CONSENT_DEFAULTS }, { children: containerScript(GTM_ID) }];
}

declare global {
  interface Window {
    /** La define el script de consentimiento del head. */
    gtag?: (...args: unknown[]) => void;
  }
}

export type ConsentChoice = "granted" | "denied";

/**
 * Actualiza el consentimiento de las categorías que se pueden rechazar.
 *
 * Va por `gtag` y no por un push a mano al dataLayer: el shim empuja el objeto
 * `arguments`, y GTM lee las señales de consentimiento de esa forma en particular.
 */
export function updateConsent(choice: ConsentChoice) {
  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });
}
