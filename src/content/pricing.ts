import type { ModuleKey } from "./modules";

/**
 * La grilla de precios, tal como se publica.
 *
 * **Fuente: `Comercial/Definiciones/05`, con el texto de publicación del `06`.** Si una
 * cifra de acá no coincide con el 05, manda el 05.
 *
 * Reemplaza a los cuatro planes de TYMEO —Free, Start, Pro, Enterprise— que modelaban un
 * producto que ya no existe: un solo módulo con niveles por cantidad de plantas. Hoy el
 * precio es por módulo y por unidad de cobro, y el plan gratuito es un límite de cantidad
 * dentro de cada módulo, no un plan aparte.
 *
 * Las tres reglas que sostienen la página, y que se dicen explícitamente porque son
 * diferenciales que nadie más ofrece (doc 06 §1.4):
 *
 * 1. Los usuarios son ilimitados y no se cobran.
 * 2. La valorización de costos está incluida en todos los planes.
 * 3. La configuración nunca está bloqueada.
 *
 * Y la que define el posicionamiento (doc 06 §1.2): **el precio publicado vale para carga
 * manual y para captura automática por igual**. Conectar el PLC o el sensor que la planta
 * ya tiene no sube de plan; lo único que se cotiza, una vez, es la integración. En el
 * resto del mercado automatizar la captura siempre significa subir de plan, y es la
 * diferencia que más conviene dejar escrita.
 */

export type PriceUnit = "línea" | "planta" | "máquina";

export type ModulePrice = {
  /** La clave del módulo cuando tiene página propia. Los SKU que no son módulo van sin
   *  ella y la grilla los muestra sin enlace. */
  module?: ModuleKey;
  name: string;
  /** USD por mes, por la unidad de cobro. */
  usd: number;
  unit: PriceUnit;
  /** El límite del plan gratuito, o null cuando no tiene. Siempre de cantidad, nunca de
   *  funcionalidad: no existe la función premium y no hay que insinuar que existe. */
  free: string | null;
};

/**
 * La grilla, en el orden del doc 05.
 *
 * **El Bot de atención no se publica, por decisión de dirección del 16/10/2026.** Está en
 * la grilla del doc 05 a USD 50 por planta, pero el propio documento marca el problema en
 * su §2: "Falta definir la cuota… USD 50 por planta con conversaciones ilimitadas contra
 * un modelo es una posición abierta, y es el SKU más barato de la grilla". Publicarlo
 * convierte una posición interna sin resolver en un compromiso con cualquiera que lo lea.
 * Entra cuando la cuota esté definida.
 */
export const MODULE_PRICES: ModulePrice[] = [
  {
    module: "produccion",
    name: "Producción",
    usd: 135,
    unit: "línea",
    free: "1 línea, carga manual",
  },
  { module: "calidad", name: "Calidad", usd: 100, unit: "línea", free: "1 línea, carga manual" },
  { module: "stock", name: "Stock", usd: 100, unit: "planta", free: "5 posiciones" },
  { module: "tareas", name: "Tareas", usd: 100, unit: "planta", free: "1 área de tareas" },
  {
    module: "trazabilidad",
    name: "Trazabilidad",
    usd: 50,
    unit: "línea",
    free: "1 línea, carga manual",
  },
  {
    module: "mantenimiento",
    name: "Mantenimiento",
    usd: 50,
    unit: "máquina",
    free: "Tiempos entre mantenimientos",
  },
  {
    module: "energia",
    name: "Energía",
    usd: 50,
    unit: "planta",
    free: "Luz y gas cargados a mano",
  },
  // Sin `module`: no tiene página propia en /plataforma.
  { name: "Reportes de gestión", usd: 50, unit: "planta", free: null },
];

/** El precio de un módulo, para la página del módulo y para el modelo de ROI. */
export const priceOf = (key: ModuleKey) => MODULE_PRICES.find((p) => p.module === key);

/** Descuento por combo: puntos que baja el total por cada módulo que se suma, y el tope. */
export const COMBO_POINTS_PER_MODULE = 15;
export const COMBO_MAX_DISCOUNT = 50;

/**
 * La nota al pie de la grilla, textual del doc 06 §2.
 *
 * Es texto acordado con comercial y no copy de la web: no se reescribe por estilo. Cada
 * línea responde una objeción concreta que aparece mirando la tabla.
 */
export const PRICING_NOTE = [
  "Una línea es un punto de medición: puede ser una línea completa o una máquina suelta.",
  "Estos precios incluyen la carga manual y la conexión de los PLC y sensores que la planta ya tiene. La captura por visión artificial se cotiza aparte, porque depende del producto y del volumen.",
  "Los usuarios son ilimitados y no se cobran. La valorización de costos está incluida en todos los planes. La configuración nunca está bloqueada.",
  `Cada módulo adicional descuenta ${COMBO_POINTS_PER_MODULE} puntos sobre el total, hasta un ${COMBO_MAX_DISCOUNT} %.`,
  "Precios en dólares. En Argentina se factura en pesos al valor del dólar.",
];

/**
 * Lo que se nombra y no se cotiza en la página.
 *
 * **Sin precio y sin "desde"** (doc 06 §5). Un "desde USD X" en un proyecto que depende
 * del producto y del volumen es un número que después hay que desmentir, y desmentir un
 * precio propio cuesta más que no haberlo puesto.
 */
export const QUOTED_ITEMS = [
  {
    title: "Automatización de la captura",
    body: "Conectar el PLC, el sensor o la lectora que la planta ya tiene. No cambia el precio del módulo: se cotiza la integración, una sola vez.",
  },
  {
    title: "Proyectos de IA",
    body: "Inspección por visión, conteo sin tocar la máquina, predictivo, lectura de documentos. Se cotiza por proyecto, porque depende del producto, del volumen y de lo que ya haya instalado.",
  },
  {
    title: "Hardware e implementación",
    body: "Cámaras, sensores, terminales de piso y la puesta en marcha. Son opcionales: el producto funciona sin nada de esto, cargando a mano.",
  },
];

/**
 * Preguntas frecuentes de precios.
 *
 * Las cinco anteriores hablaban de Free, Start, Pro y Enterprise, que dejaron de existir
 * con el catálogo de septiembre de 2026. Estas responden las objeciones del modelo nuevo.
 */
export const PRICING_FAQ = [
  {
    q: "¿Conectar mis máquinas me sube de plan?",
    a: "No. El precio publicado vale igual para carga manual que para el PLC o el sensor que ya tenés conectado: una vez conectado, para nosotros cuesta lo mismo. Lo único que se cotiza es la integración, y se paga una sola vez.",
  },
  {
    q: "¿Qué incluye el plan gratuito?",
    a: "Un límite de cantidad, no de funciones. Una línea, cinco posiciones o un área de tareas según el módulo, con carga manual y sin vencimiento. No hay función premium escondida y la configuración nunca está bloqueada.",
  },
  {
    q: "¿Cuántos usuarios puedo tener?",
    a: "Los que quieras. Los usuarios son ilimitados y no se cobran, en el plan gratuito y en el pago. El precio se define por punto de medición —línea, planta o máquina—, no por gente que entra al sistema.",
  },
  {
    q: "¿Por qué la IA no tiene precio publicado?",
    a: "Porque su costo depende de cuánto produce la línea, y un precio de lista que no mira el volumen se rompe en el primer cliente grande. La IA no es un plan superior: es otra forma de que entre el dato, y se cotiza como proyecto.",
  },
  {
    q: "¿Qué pasa si sumo varios módulos?",
    a: `Cada módulo adicional descuenta ${COMBO_POINTS_PER_MODULE} puntos sobre el total, hasta un ${COMBO_MAX_DISCOUNT} %. No hay que contratar un paquete: se suman de a uno, cuando el dato del anterior lo justifica.`,
  },
  {
    // TODO(equipo): **pendiente de confirmación.** Es una promesa contractual sobre
    // retención y exportación de datos. Si el producto no hace exactamente esto, la
    // respuesta se reescribe o la pregunta se saca. No ajustarla por cuenta propia.
    q: "¿Qué pasa con mis datos si dejo de pagar?",
    a: "Los datos que cargaste son tuyos y te los podés llevar exportados. La cuenta pasa al plan gratuito, así que la línea que estabas midiendo sigue funcionando: no se apaga nada.",
  },
];

/**
 * Comparación de costo total contra las dos alternativas habituales.
 *
 * **Sin cifras y sin nombres de competidores, a propósito.** Un "un proyecto llave en mano
 * cuesta USD 80.000" sin fuente es justo el dato que nos deja mal parados si el comprador
 * tiene una cotización distinta en la mano. La comparación va por estructura de costo:
 * es igual de convincente y no es refutable.
 *
 * TODO(comercial): validar las cinco filas.
 */
export const COST_COMPARISON = {
  columns: ["InspectIA", "Integrador llave en mano", "Licencia perpetua"],
  rows: [
    {
      label: "Cuándo ves el primer dato",
      values: [
        "El mismo día con el plan gratuito; entre 1 y 10 días con hardware",
        "Al final del proyecto",
        "Después de la implementación",
      ],
    },
    {
      label: "Qué pasa si no funciona",
      values: [
        "Dejás de pagar la suscripción",
        "La inversión ya está hecha",
        "La licencia ya está pagada",
      ],
    },
    {
      label: "Quién paga las actualizaciones",
      values: ["Incluidas", "Se cotizan aparte", "Se cotizan aparte o se pagan por versión"],
    },
    {
      label: "Qué cuesta conectar las máquinas",
      values: [
        "La integración, una vez. El abono no cambia",
        "Parte del proyecto",
        "Suele requerir otro módulo licenciado",
      ],
    },
    {
      label: "Qué cuesta agregar un usuario",
      values: [
        "Nada: los usuarios son ilimitados",
        "Depende del alcance contratado",
        "Se paga por puesto",
      ],
    },
  ],
};
