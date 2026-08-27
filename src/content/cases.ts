import type { ModuleKey } from "./modules";

/**
 * Casos de cliente.
 *
 * **El arreglo está vacío a propósito y la página no se publica.** Es el pendiente que
 * más le falta a todo el sitio: hay clientes con números fuertes y ninguno consta
 * aprobado para publicar. Un caso sin nombre y sin números no es prueba social —es un
 * párrafo más— y un caso con el nombre publicado sin autorización es un problema legal
 * antes que comercial.
 *
 * Lo que sí está listo es la maquinaria: publicar el primer caso es llenar un objeto y
 * poner `approved: true`, no diseñar una página.
 */

export type CustomerCase = {
  slug: string;
  /** Nombre del cliente. Si no está aprobado, este caso no existe todavía. */
  customer: string;
  logo?: string;
  /** Industria y tamaño de planta, para el que no conoce al cliente. */
  context: string;
  industry: string;
  /** La situación, en dos líneas. Sin adjetivos. */
  situation: string;
  modules: ModuleKey[];
  /** Exactamente tres. Cada uno con su unidad y su período. */
  results: { value: string; caption: string }[];
  /** Cita textual, con nombre y cargo. Opcional: sin cita el caso funciona igual. */
  quote?: { text: string; author: string; role: string };
  photo?: string;
  /** El candado. Sólo entra al sitio con esto en true, y sólo se pone en true con
   *  aprobación escrita del cliente. No es decorativo. */
  approved: boolean;
};

/*
 * ----------------------------------------------------------------------------
 * CÓMO SE ESCRIBE UN CASO
 *
 * Quien cargue el primero probablemente no sea quien leyó el documento de copy, así que
 * las reglas viven acá:
 *
 * 1. Tres números, ni dos ni cinco. Cada uno con su unidad y su período.
 * 2. La situación sin adjetivos. "La línea producía 9.000 unidades por mes con un rechazo
 *    del 4 %", no "enfrentaba serios desafíos de calidad".
 * 3. Sin superlativos nuestros. El elogio va en la cita del cliente o no va.
 * 4. Si el cliente no autorizó el nombre, el caso va con la industria y el tamaño
 *    —"autopartista, planta de 180 personas"—, el logo se omite y `customer` queda con esa
 *    descripción. Nunca un logo borroso ni un nombre a medias.
 * 5. La foto es de la planta real. Sin foto de stock industrial.
 *
 * TODO(equipo): candidatos con dato conocido y sin aprobación de publicación. No cargarlos
 * acá hasta tener la autorización por escrito del cliente:
 *   · Autopartista — 70 tipos de falla controlados en menos de 1 minuto
 *   · Centro de distribución — recepción de 24 a 15 operarios, lead time de 48 a 30 h
 * Otros clientes mencionados sin dato publicable: Springwall, Magna Seating, Green Mills,
 * Establecimiento Las Marías, Tinto Oeste, Expoyer, Ledesma.
 * ----------------------------------------------------------------------------
 */
export const CASES: CustomerCase[] = [];

export const approvedCases = () => CASES.filter((c) => c.approved);
