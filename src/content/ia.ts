import type { ModuleKey } from "./modules";

/**
 * Las aplicaciones de IA, que es lo que sale del precio de lista y se cotiza.
 *
 * **La línea que separa un módulo de una aplicación de IA es el costo, no el marketing**
 * (doc 05 §2). Un módulo cuesta lo mismo con carga manual que con el PLC conectado,
 * porque una vez conectado el costo marginal es el mismo. Un modelo que mira cada unidad
 * producida tiene costo por evento y crece con la producción, que es justo la variable
 * que un precio de lista no mira. Por eso acá no hay precios, ni rangos, ni "desde".
 *
 * **En las páginas de módulo no se detalla qué hace la IA.** Allá hay un bloque que trae
 * para acá y nada más. Mezclar las dos cosas en la página de un módulo con precio
 * publicado es lo que hace que el visitante no sepa qué está comprando.
 *
 * Las que tienen `slug` tienen además página propia, porque vienen de una página de módulo
 * que ya existía y estaba indexada. Las otras viven sólo como sección de /ia: una página
 * por aplicación sin nada más que decir que lo que ya dice la sección es una página que
 * compite con la suya.
 */

export type IaApplication = {
  /** Ancla de la sección en /ia, y segmento de URL cuando tiene página propia. */
  id: string;
  title: string;
  /** El problema, en la voz del cliente. */
  problem: string;
  /** Cómo funciona, sin hablar de modelos ni de entrenamiento. */
  how: string;
  /** Qué tiene que tener la planta. Es la pregunta que sigue siempre. */
  needs: string;
  /** Qué se puede medir después, que es lo que justifica el proyecto. */
  measures: string;
  /** El módulo con el que se integra, cuando hay uno. */
  module?: ModuleKey;
  /** Si tiene página propia bajo /ia/{id}. Sólo las que vienen de una URL indexada. */
  hasPage?: boolean;
  /** De qué entrada de `IA_PAGE_SOURCES` sale el contenido largo de esa página. */
  source?: ModuleKey;
};

export const IA_APPLICATIONS: IaApplication[] = [
  {
    id: "inspeccion-visual",
    title: "Inspección visual de defectos",
    problem: "El defecto se ve tarde, o depende del ojo de quien esté controlando.",
    how: "Una cámara sobre la línea revisa cada pieza, con un modelo entrenado con los defectos de tu producto y con lo que tu equipo de calidad marca como rechazo.",
    needs: "Una cámara y la iluminación adecuada en el punto de control.",
    measures: "Defectos por tipo y por turno, y rechazo antes del despacho.",
    module: "calidad",
  },
  {
    id: "conteo-por-vision",
    title: "Conteo de producción por visión",
    problem: "El conteo manual no cierra, o la máquina no tiene salida de datos.",
    how: "La cámara cuenta las unidades que salen y detecta cuándo la línea se frena, sin tocar la máquina ni intervenir el tablero.",
    needs: "Una cámara con vista a la salida de la línea.",
    measures: "Producción real y paradas, directo en el módulo de Producción.",
    module: "produccion",
  },
  {
    id: "recepcion",
    title: "Recepción y conteo de mercadería",
    problem: "La diferencia contra el remito aparece días después, cuando ya no se reclama.",
    how: "Se cuenta y se controla en el momento de la descarga, con foto y hora de cada bulto.",
    needs: "Una cámara o un celular en el muelle.",
    measures: "Diferencias por proveedor y tiempo de permanencia del camión.",
    module: "stock",
    hasPage: true,
    source: "recepcion",
  },
  {
    id: "control-de-pedidos",
    /* §5.7 del brief lista ocho aplicaciones y ésta no está, pero §4.7 manda
     * /plataforma/control-de-pedidos a /ia/control-de-pedidos. Sin la novena, esa
     * redirección no tiene destino y la URL queda en 404, que es el único resultado que
     * el brief prohíbe explícitamente. Entra, y queda anotada la diferencia. */
    title: "Control de pedidos por visión",
    problem: "El error de armado se descubre cuando el cliente recibe el pedido.",
    how: "Una cámara sobre la mesa de despacho compara lo que se armó contra lo que había que enviar, con el pedido todavía en la mesa.",
    needs: "Una cámara sobre el puesto de armado.",
    measures: "Errores de armado por turno y reclamos evitados.",
    module: "stock",
    hasPage: true,
    source: "control-de-pedidos",
  },
  {
    id: "inventario-con-drones",
    title: "Inventario con drones",
    problem: "Las posiciones altas no se cuentan nunca, o se cuentan una vez por año.",
    how: "Un dron recorre los pasillos sin piloto y sin GPS, lee las posiciones y marca dónde no coincide con el sistema.",
    needs: "Depósito con estanterías y pasillos libres en el horario de vuelo.",
    measures: "Exactitud de inventario por zona.",
    module: "stock",
    hasPage: true,
    source: "sobrestock-drones",
  },
  {
    id: "camaras-inteligentes",
    title: "Seguridad y EPP con las cámaras que ya tenés",
    problem: "Nadie puede estar mirando doce pantallas, así que en la práctica no se mira ninguna.",
    how: "El modelo detecta la falta de equipo de protección o el ingreso a una zona restringida y avisa mientras está pasando.",
    needs: "Las cámaras que ya están instaladas, con buena vista del sector.",
    measures: "Incidentes por zona y por turno.",
    hasPage: true,
    source: "camaras-inteligentes",
  },
  {
    id: "predictivo",
    title: "Mantenimiento predictivo",
    problem: "La máquina crítica falla sin aviso y para la línea entera.",
    how: "Sensores de vibración o temperatura y un modelo que detecta la degradación antes de la falla.",
    needs: "Sensores en los equipos críticos.",
    measures: "Paradas no programadas y disponibilidad por máquina.",
    module: "mantenimiento",
  },
  {
    id: "agentes",
    title: "Agentes y bots",
    problem: "Los informes se rearman a mano y las consultas pasan por una persona.",
    how: "Un agente responde preguntas de la operación y arma solo el informe que hoy alguien reconstruye todas las semanas.",
    needs: "InspectIA funcionando con tus datos: sin historia cargada no hay sobre qué trabajar.",
    measures: "Horas de armado de informes.",
    hasPage: true,
    source: "agente",
  },
  {
    id: "lectura-de-documentos",
    title: "Lectura de documentos",
    problem: "Facturas, remitos y planillas de papel se cargan a mano.",
    how: "El modelo lee el documento y carga el dato en el módulo que corresponda.",
    needs: "Los documentos en PDF o en foto.",
    measures: "Tiempo de carga y errores de transcripción.",
    module: "stock",
  },
];

export const IA_APP_BY_ID = new Map(IA_APPLICATIONS.map((a) => [a.id, a]));

/** Las que tienen página propia bajo /ia/{id}. Alimentan el enrutador y el sitemap. */
export const IA_PAGES = IA_APPLICATIONS.filter((a) => a.hasPage);

/** Sólo para lo que no puede usar un Link tipado: sitemap, JSON-LD, canónicas. */
export const iaPath = (a: IaApplication) => `/ia/${a.id}`;

/**
 * Cómo es un proyecto.
 *
 * El primer paso dice que el diagnóstico no tiene cargo, y eso no es una promesa nueva:
 * es lo que ya dicen las preguntas frecuentes de cinco módulos ("se define en el
 * relevamiento, que no tiene cargo"). Si alguna vez deja de ser así, hay que cambiarlo en
 * los seis lugares.
 */
export const IA_PROJECT_STEPS = [
  {
    n: "01",
    title: "Diagnóstico, sin cargo",
    body: "Definimos cuál es el problema y cómo se va a medir el resultado. Si no se puede medir, lo decimos antes de cotizar nada.",
  },
  {
    n: "02",
    title: "Piloto",
    body: "En una línea o en un punto de control, corriendo en paralelo a lo que hacés hoy. Ahí se calibra y se ve si el número cierra.",
  },
  {
    n: "03",
    title: "Pase a producción",
    body: "El modelo queda andando y conectado con el módulo de InspectIA que corresponde, así el resultado entra al mismo tablero que el resto.",
  },
  {
    n: "04",
    title: "Soporte y mejora",
    body: "El modelo se reentrena con tus datos a medida que aparecen casos nuevos. Un modelo que no se mantiene se degrada solo.",
  },
];
