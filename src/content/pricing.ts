/**
 * Planes y add-ons de TYMEO, que es el modelo para los demás módulos: todos van a tener
 * algún plan gratuito (§7.6).
 *
 * Son datos y no un componente. La grilla que los muestra —cuatro cards de igual ancho,
 * el destacado marcado sólo con un pill sobre el borde superior, y el precio que cuenta
 * en 600ms al tildar un add-on— se construye en la fase 4 sobre esta tabla.
 *
 * **La página /precios no se publica hasta tener el precio de todos los módulos** (§7.6):
 * con uno solo publicado la promesa de transparencia se rompe sola. Mientras tanto,
 * SHOW_PRICING en content/site.ts la mantiene fuera del menú.
 *
 * TODO(equipo): falta el criterio de precio de los siete módulos que no son TYMEO —qué lo
 * define (líneas, posiciones, cámaras, plantas), el rango si se puede publicar y qué
 * incluye la puesta en marcha— y la comparación de costo total contra un integrador llave
 * en mano, que es el argumento más fuerte que hay y hoy no está en ninguna parte (§15.4).
 */

export const ADDON_PRICE_USD = 10;

export type Plan = {
  id: string;
  name: string;
  /** Para quién es, en una línea. */
  desc: string;
  /** USD por mes. 0 es gratis; null se cotiza. */
  base: number | null;
  priceNote: string;
  features: string[];
  /** Se tildan y suman ADDON_PRICE_USD cada uno. */
  addons: string[];
  cta: string;
  /** Un solo plan lleva la marca, y va con un pill sobre el borde: sin sombra, sin
   *  degradado y sin card más grande que las otras. */
  highlight?: boolean;
  tag?: string;
};

export const TYMEO_PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    desc: "Empezá a medir hoy, sin hardware.",
    base: 0,
    priceNote: "Gratis para siempre, sin tarjeta",
    features: [
      "1 planta",
      "1 línea",
      "1 usuario (Gerencia)",
      "Registro manual, por formulario",
      "Líneas, estaciones y máquinas",
      "Turnos, paradas y alertas",
      "Dashboard",
    ],
    addons: ["RRHH", "Planificación"],
    cta: "Empezar gratis",
  },
  {
    id: "start",
    name: "Start",
    desc: "Automatizado, con tu equipo completo.",
    base: 35,
    priceNote: "Por planta y por mes",
    features: [
      "1 planta",
      "3 líneas",
      "Usuarios ilimitados, todos los roles",
      "Registro automatizado (sensores, lectoras)",
      "Todo lo de Free",
      "RRHH incluido",
      "Planificación incluida",
      "Pantalla de piso (TV)",
      "Roles y accesos",
      "Auditoría y trazabilidad",
      "Identidad de marca propia",
    ],
    addons: [
      "Condiciones y energía",
      "Mantenimiento predictivo",
      "Lotes de producción",
      "Control de caducidades",
      "Recepción de materia prima",
    ],
    cta: "Hablar con ventas",
    highlight: true,
    tag: "Más elegido para arrancar con hardware",
  },
  {
    id: "pro",
    name: "Pro",
    desc: "Multi-planta y control avanzado.",
    base: 150,
    priceNote: "Por mes",
    features: [
      "Hasta 3 plantas",
      "Líneas ilimitadas",
      "Usuarios ilimitados",
      "Hasta 3 integraciones con sistemas externos",
      "Todo lo de Start",
      "Condiciones y energía",
      "Mantenimiento predictivo",
      "Lotes de producción",
      "Control de caducidades",
      "Recepción de materia prima",
    ],
    addons: [],
    cta: "Hablar con ventas",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "Sin límites, a la medida de tu operación.",
    base: null,
    priceNote: "A medida",
    features: [
      "Plantas ilimitadas",
      "Líneas ilimitadas",
      "Usuarios ilimitados",
      "Integraciones a medida",
      "Todo lo de Pro",
      "Acompañamiento dedicado",
    ],
    addons: [],
    cta: "Consultar",
  },
];

/**
 * Preguntas frecuentes de planes. Salen de la landing anterior de TYMEO, donde ya estaban
 * escritas y respondidas.
 */
export const PRICING_FAQ = [
  {
    q: "¿Qué pasa si me quedo corto de líneas?",
    a: "Subís de plan cuando lo necesites. Tu configuración y tus datos se mantienen: sólo se destraba el límite nuevo, no hay que migrar ni volver a cargar nada.",
  },
  {
    q: "¿Necesito instalar algo para usar el plan gratuito?",
    a: "No. En Free cargás los datos de producción a mano desde un formulario, así que podés empezar a medir tu OEE hoy mismo, sin hardware y sin instalación.",
  },
  {
    q: "¿La instalación en planta está incluida en el precio?",
    a: "No, es independiente del plan. La podés hacer con tu propio equipo siguiendo nuestra guía, o contratarla con nosotros, y en ese caso se cotiza según el hardware que tu planta necesite.",
  },
  {
    q: "¿Puedo tener más plantas o más usuarios?",
    a: "Sí. Start cubre una planta con usuarios ilimitados, Pro llega hasta tres plantas y Enterprise no tiene límite de plantas, líneas ni usuarios.",
  },
  {
    // TODO(equipo): **pendiente de confirmación.** Es una promesa contractual sobre
    // retención y exportación de datos. Si el producto no hace exactamente esto, la
    // respuesta se reescribe o la pregunta se saca. No ajustarla por cuenta propia.
    q: "¿Qué pasa con mis datos si dejo de pagar?",
    a: "Los datos que cargaste son tuyos y te los podés llevar exportados. La cuenta pasa a plan gratuito, así que la planta y la línea que estabas midiendo siguen funcionando: no se apaga nada.",
  },
];

/**
 * Qué define el precio de cada módulo que no es TYMEO.
 *
 * TODO(comercial): **los siete `basis` son una propuesta, no un dato confirmado.** Salen
 * de leer qué necesita cada módulo, no de una lista del equipo comercial. Hay que
 * validarlos antes de publicar, y falta además la columna de qué incluye la puesta en
 * marcha en cada caso, que no está definida. Es el pendiente que bloquea toda la página.
 */
export const MODULE_PRICING_BASIS: { module: string; basis: string }[] = [
  { module: "control-de-calidad", basis: "Cantidad de líneas y de puntos de inspección" },
  { module: "recepcion", basis: "Cantidad de posiciones de descarga" },
  { module: "stock-en-posiciones", basis: "Cantidad de posiciones del depósito" },
  { module: "sobrestock-drones", basis: "Superficie y cantidad de pasillos a relevar" },
  { module: "camaras-inteligentes", basis: "Cantidad de cámaras y de sectores a cubrir" },
  { module: "control-de-pedidos", basis: "Cantidad de puestos de despacho" },
  { module: "agente", basis: "Alcance del desarrollo a medida" },
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
        "El mismo día con el plan gratuito; entre 5 y 15 días con hardware",
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
      label: "Qué cuesta agregar una segunda línea o planta",
      values: [
        "Un plan más, o el mismo plan según el alcance",
        "Un proyecto nuevo",
        "Una licencia más",
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
