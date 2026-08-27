import { PARTNER_LOGO } from "./assets";

/**
 * Con qué sistemas se conecta la plataforma.
 *
 * **Una integración no es un servicio del marketplace** (§11.6). La integración es
 * información técnica —qué ERP, qué WMS, qué PLC soporta— y no lleva logo comercial, ni
 * precio, ni CTA, ni ficha. El servicio del marketplace se contrata con nosotros y lleva
 * las cuatro cosas. Nunca comparten grilla ni sección.
 *
 * Los nombres sin logo se muestran como texto en --grey-600, que es lo que pide §11.10
 * mientras un logo sea texto y no imagen.
 */

export type IntegrationGroup = {
  key: string;
  title: string;
  /** Qué resuelve conectarse con eso, en una línea. */
  note: string;
  items: { name: string; logo?: string }[];
};

export const INTEGRATION_GROUPS: IntegrationGroup[] = [
  {
    key: "erp",
    title: "ERP",
    note: "Para que lo que produce la planta llegue al sistema de gestión sin recargarlo a mano, y para que el plan de producción entre solo.",
    // TODO(equipo): confirmar la lista. SAP viene de la tira de la landing anterior; falta
    // saber con qué otros ERP hay integración andando hoy.
    items: [{ name: "SAP" }],
  },
  {
    key: "wms",
    title: "WMS",
    note: "El depósito recibe lo que cuentan los módulos de recepción y de stock, y devuelve lo que tiene que estar en cada posición.",
    items: [{ name: "Cygnus", logo: PARTNER_LOGO.cygnus }],
  },
  {
    key: "plc",
    title: "PLC y sensórica",
    note: "De donde sale el dato de la máquina, y por donde vuelve la orden de descartar una pieza.",
    items: [
      { name: "Siemens" },
      { name: "Allen-Bradley" },
      { name: "Balluff", logo: PARTNER_LOGO.balluff },
    ],
  },
  {
    key: "camaras",
    title: "Cámaras",
    note: "Las que ya están instaladas en la planta. No hace falta cambiarlas para empezar a usarlas.",
    // TODO(equipo): qué marcas y protocolos están soportados. Poner ONVIF, RTSP o marcas
    // concretas es una afirmación técnica y la define ingeniería, no la web.
    items: [],
  },
];
