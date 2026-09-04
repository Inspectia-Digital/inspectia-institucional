import { PARTNER_LOGO, type PartnerSlug } from "./assets";

/**
 * Las cuatro familias de organizaciones que hoy conviven mezcladas en una sola fila de
 * logos. §11.10 pide que nunca compartan fila, y §11.6 que un servicio del marketplace
 * y una integración técnica no compartan grilla: el servicio se contrata con nosotros y
 * lleva precio y CTA, la integración no lleva ninguno de los dos.
 *
 * La home dejó de respetar esa separación: muestra las cinco familias juntas y en
 * movimiento, por pedido explícito. La clasificación se mantiene igual porque el resto
 * del sitio sí la usa, y porque el día que la fila vuelva a separarse el dato ya está.
 */
export type PartnerFamily =
  /** Usa InspectIA en su operación. */
  | "cliente"
  /** Servicio de tercero que comercializamos nosotros (§7.4). */
  | "marketplace"
  /** Sistema con el que la plataforma se integra. Sin logo comercial ni precio (§11.6). */
  | "integracion"
  /** Programa, aceleradora o respaldo institucional. */
  | "respaldo"
  /** Consultora del programa de partners (§7.8). */
  | "partner"
  /** Pendiente de confirmar con el equipo. No se publica hasta tener familia. */
  | "sin-clasificar";

export type Partner = {
  slug: PartnerSlug;
  /** Nombre tal como se lee en el `alt`. */
  name: string;
  family: PartnerFamily;
  logo: string;
};

const partner = (slug: PartnerSlug, name: string, family: PartnerFamily): Partner => ({
  slug,
  name,
  family,
  logo: PARTNER_LOGO[slug],
});

export const PARTNERS: Partner[] = [
  // Clientes. §15.7 deja pendiente la aprobación de nombre y cifras de Springwall,
  // Green Mills y Las Marías para publicarlos como caso; el logo ya está en la web actual.
  partner("springwall", "Springwall", "cliente"),
  partner("las-marias", "Establecimiento Las Marías", "cliente"),
  partner("molens-greenmills", "Molens · Green Mills", "cliente"),
  partner("motorola", "Motorola", "cliente"),

  // Servicios del marketplace, según la tabla de categorías de §7.4.
  partner("balluff", "Balluff", "marketplace"), // hardware y sensórica
  partner("tecnologia-bi", "Tecnología BI", "marketplace"), // hardware y sensórica
  partner("cygnus", "Cygnus", "marketplace"), // WMS
  partner("quantit", "Quantit Data", "marketplace"), // datos y analítica

  // Consultoras del programa de partners (§7.8, "quiénes ya están").
  partner("miebach", "Miebach", "partner"),
  partner("auren", "Auren", "partner"),
  partner("antea-group", "Antea Group", "partner"),

  // Respaldos institucionales (§7.9).
  partner("google-for-startups", "Google for Startups", "respaldo"),
  partner("emprelatam", "Emprelatam", "respaldo"),
  partner("arnx", "ARNx", "respaldo"),

  // TODO(equipo): confirmar familia. BPS y Sitecno vienen de la fila única de la web
  // anterior, donde clientes, partners y respaldos estaban mezclados, y el documento no
  // los ubica en ninguna categoría. Con la fila de la home mostrando `todas` vuelven a
  // verse, que es exactamente donde estaban antes; sigue faltando saber qué son.
  partner("bps", "BPS", "sin-clasificar"),
  partner("sitecno", "Sitecno", "sin-clasificar"),
];

export const partnersByFamily = (family: PartnerFamily): Partner[] =>
  PARTNERS.filter((p) => p.family === family);
