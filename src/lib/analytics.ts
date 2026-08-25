/**
 * Todo pasa por GTM con dataLayer.push. Nombres en inglés y snake_case (§8).
 *
 * El mapa de eventos es un tipo y no un string suelto a propósito: un evento mal escrito
 * no falla en ningún lado, simplemente no se mide, y eso se descubre tres meses después
 * cuando alguien pregunta cuántas demos salieron de la home.
 */

/** Los cuatro que se marcan como conversión en GA4. */
type ConversionEvents = {
  /** Clic al enlace del calendario. La confirmación pasa en el dominio de Google, así que
   *  lo que se mide es el clic y la asistencia se concilia después contra la agenda. */
  demo_scheduled_click: {
    source_page: string;
    module?: string;
    industry?: string;
    audience?: string;
  };
  /** Clic en "Empezar gratis". El alta efectiva la confirma la aplicación. */
  signup_start: { source_page: string; module?: string; plan?: string };
  roi_report_download: {
    module: string;
    roi_pct: number;
    payback_months: number | null;
    is_consultant: boolean;
  };
  partner_apply: { specialty: string; source_page: string };
};

type EngagementEvents = {
  /** Primer cambio de parámetro que produce resultado. */
  roi_calculate: { module: string; inputs: Record<string, number> };
  /** Página de módulo, al 25% de scroll. */
  module_view: { module: string };
  /** Hover o tap en un punto del plano. Una vez por módulo y por sesión. */
  floorplan_module_open: { module: string };
  solution_view: { industry?: string; use_case?: string };
  pricing_plan_click: { plan: string; addons_selected: string[]; price_shown: number };
  marketplace_lead: { service: string; category: string; direction: string };
  whatsapp_click: { source_page: string };
  content_read: { cluster: string; slug: string };
  newsletter_signup: { source_page: string };
};

export type SiteEvents = ConversionEvents & EngagementEvents;

type DataLayerEntry = { event: string } & Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

/**
 * Empuja un evento al dataLayer.
 *
 * Silencioso en el servidor: el sitio renderiza en SSR y esto se llama desde handlers que
 * también corren en el primer render. Sin la guarda, cualquier componente que mida algo en
 * un efecto rompería el build de producción.
 */
export function pushEvent<K extends keyof SiteEvents>(event: K, params: SiteEvents[K]): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

/** La página desde donde se disparó, para el parámetro `source_page`. */
export function sourcePage(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

/**
 * Un evento que se manda una sola vez por sesión y por clave. `floorplan_module_open` se
 * dispara con el hover, así que sin esto un visitante que pasa el mouse por el plano
 * manda veinte eventos del mismo módulo y el número deja de significar nada.
 */
const alreadySent = new Set<string>();

export function pushEventOncePerSession<K extends keyof SiteEvents>(
  event: K,
  params: SiteEvents[K],
  key: string,
): void {
  const id = `${event}:${key}`;
  if (alreadySent.has(id)) return;
  alreadySent.add(id);
  pushEvent(event, params);
}
