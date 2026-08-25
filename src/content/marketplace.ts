import { PARTNER_LOGO } from "./assets";
import type { ModuleKey } from "./modules";

/**
 * Servicios de terceros que comercializamos alrededor de la plataforma (§7.4).
 *
 * Para el cliente es un solo proveedor en lugar de cinco; para InspectIA es ingreso
 * adicional y la razón por la que a un proveedor le conviene entrar antes que competir.
 *
 * **No son integraciones.** La integración es qué sistema soporta la plataforma y vive en
 * /plataforma/integraciones, sin precio ni CTA. Esto se contrata con nosotros (§11.6).
 *
 * TODO(equipo): falta el esquema comercial de cada servicio —reventa con margen, comisión
 * o derivación— y a quién se le factura. Hasta tenerlo, la ficha de servicio no se puede
 * escribir y la página muestra las categorías con los proveedores confirmados (§15.6).
 */

export type MarketplaceCategory = {
  key: string;
  name: string;
  /** Qué resuelve para el cliente. */
  solves: string;
  /** Con qué módulos se combina. */
  combinesWith: ModuleKey[];
  /** Proveedores confirmados. Vacío donde §7.4 dice "a confirmar". */
  providers: { name: string; logo?: string }[];
};

export const MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  {
    key: "hardware",
    name: "Hardware y sensórica",
    solves: "Cámaras, sensores, lectoras y la instalación en piso de planta.",
    combinesWith: ["control-de-calidad", "tymeo", "camaras-inteligentes"],
    providers: [
      { name: "Balluff", logo: PARTNER_LOGO.balluff },
      { name: "Tecnología BI", logo: PARTNER_LOGO["tecnologia-bi"] },
    ],
  },
  {
    key: "erp",
    name: "ERP",
    solves: "Implementación del ERP y del enlace con la planta, para no recargar el dato a mano.",
    combinesWith: ["tymeo", "recepcion"],
    providers: [],
  },
  {
    key: "wms",
    name: "WMS",
    solves: "Gestión de depósito que recibe lo que cuentan los módulos de stock y recepción.",
    combinesWith: ["recepcion", "stock-en-posiciones", "control-de-pedidos"],
    providers: [{ name: "Cygnus", logo: PARTNER_LOGO.cygnus }],
  },
  {
    key: "bots",
    name: "Bots y automatización",
    solves: "Tareas repetitivas de oficina y de piso, resueltas sin gente.",
    combinesWith: ["agente"],
    providers: [],
  },
  {
    key: "financiamiento",
    name: "Financiamiento",
    solves: "Descuento de cheques y capital de trabajo para financiar el proyecto.",
    combinesWith: [],
    providers: [],
  },
  {
    key: "datos",
    name: "Datos y analítica",
    solves: "Tableros de gestión y BI sobre los datos que la plataforma genera.",
    combinesWith: ["tymeo", "control-de-calidad", "stock-en-posiciones"],
    providers: [{ name: "Quantit Data", logo: PARTNER_LOGO.quantit }],
  },
];
