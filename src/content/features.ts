import type { ModuleKey } from "./modules";
import type { ProductPanelData } from "@/components/site/ProductPanel";
import type { IconConcept, AllowedIcon } from "@/components/icons/inspectia-icons";
/* Con extension .ts a proposito: generate-sitemap.mjs importa este archivo con node
   pelado, que borra los imports de tipo pero resuelve los de valor, y sin la extension no
   los encuentra. Es la misma convencion que usa ese script para sus propios imports. */
import { APP_SHOT, MODULE_SHOTS } from "./assets.ts";

/**
 * Las páginas de funcionalidad: el nivel intermedio del modelo de contenido.
 *
 * Tres niveles por tema (brief de SEO del 11/11/2026, §1):
 *
 * - **Pilar** — la página del módulo, `/plataforma/<módulo>`, para la búsqueda de
 *   categoría ("software de OEE").
 * - **Funcionalidad** — esto, `/plataforma/<módulo>/<búsqueda>`, para la búsqueda
 *   comercial concreta ("monitoreo automático de OEE"). **El slug es la búsqueda**, no un
 *   nombre lindo: es lo único que justifica que la página exista aparte del módulo.
 * - **Guía** — `/guias/<tema>`, para la búsqueda informativa ("cómo calcular el OEE").
 *
 * La diferencia entre una funcionalidad y una guía no es de profundidad sino de intención:
 * acá llega quien busca el software, a la guía quien busca cómo se hace. Por eso cada
 * funcionalidad enlaza a su guía y cada guía a su funcionalidad, y por eso ninguna de las
 * dos repite el contenido de la otra.
 *
 * ## La forma de los campos cambió el 12/11/2026
 *
 * La primera versión reusaba la forma de `modules.ts`: listas de strings y pares
 * `{label, to}`. Alcanzaba para una columna de texto, que es lo que la página era, y no
 * alcanza para lo que la guía de diseño de funcionalidades pide: un panel de producto en
 * el hero, tres bloques de captura del dato, una banda de enlaces con cuerpo propio y
 * condiciones con etiqueta. Los campos que cambiaron de forma están marcados abajo.
 *
 * El criterio para llenarlos es el de la guía §5: **el copy sale de los archivos `1x_` de
 * `docs/landings/seo/`, y lo que no está ahí queda vacío.** No se completa a ojo. Los
 * huecos que quedaron están anotados con TODO y van en la respuesta del pase, no
 * escondidos en el archivo.
 */

/** Una captura real del producto, lista para un `srcset` de dos pasos. */
export type FeatureShot = {
  src: string;
  /** La variante chica y su ancho real, que es lo que el `srcset` necesita declarar. */
  small: string;
  smallWidth: number;
  width: number;
  height: number;
  alt: string;
  /** El epígrafe. Dice qué mirar; el `alt` describe lo que se ve. */
  caption?: string;
};

/* Las capturas viven en `assets.ts` con dos formas distintas —la de la home trae su
   variante de 760px y las de módulo la de 1120— porque se dibujan a anchos distintos.
   Normalizarlas acá y no en la vista evita que la plantilla tenga que saber de cuál de
   los dos catálogos salió la imagen que le toca. */
const moduleShot = (key: string): FeatureShot => {
  const s = MODULE_SHOTS[key];
  return {
    src: s.src,
    small: s.src1120,
    smallWidth: 1120,
    width: s.width,
    height: s.height,
    alt: s.alt,
    caption: s.caption,
  };
};

export type Feature = {
  /** Segmento de URL, dentro del módulo. Es el término de búsqueda. */
  slug: string;
  /** El módulo padre. De acá salen la miga de pan y el bloque «Funcionalidades». */
  module: ModuleKey;
  /**
   * Funcionalidad planificada o parcial.
   *
   * Se publica igual —posiciona algo que se construye cuando un cliente lo pide— pero
   * **no lleva «Empezar gratis»**: ofrecer una cuenta gratuita para usar algo que
   * todavía no está es la forma más rápida de que esa cuenta se dé de baja el mismo
   * día. En su lugar va un botón único con su origen. El día que la funcionalidad
   * exista, alcanza con sacar estos dos campos.
   */
  status?: "a-pedido";
  /** El valor de `origen` que viaja a `/contacto`. Va junto con `status`. */
  requestOrigin?: string;
  /** Nombre corto. Etiqueta del enlace en la página del módulo y en la miga de pan. */
  name: string;
  /** Una línea para el bloque «Funcionalidades» del módulo. */
  blurb: string;
  /** "Módulo · funcionalidad". */
  eyebrow: string;
  h1: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;

  /** El panel del producto del hero. Datos de ejemplo, siempre rotulados como tales. */
  heroPanel?: ProductPanelData;
  /** La línea de 14px debajo de los botones del hero. */
  heroNote?: string;

  /** Lo que pasa hoy, en las palabras del cliente. */
  problem: string[];
  /** Cuatro bloques. Los títulos van como la pregunta del lector donde corresponde. */
  does: { title: string; body: string }[];
  /** Un párrafo después de `does`, cuando hace falta precisar algo que no es una
   *  capacidad más (hoy sólo paradas, con las programadas y el calendario). */
  doesNote?: string;

  /** Qué se ve adentro de la aplicación: la lista y la captura, o un panel dibujado. */
  see?: {
    /** Sin esto, el título de la sección es el nombre del bloque. */
    title?: string;
    /** De 3 a 5. Donde falta el copy, la sección queda con la captura sola. */
    items?: string[];
    shot?: FeatureShot;
    panel?: ProductPanelData;
  };

  /** Cómo se toma el dato, en orden de entrada. Era un string; son tres bloques. */
  capture?: { level: "Manual" | "Automático" | "IA"; body: string }[];

  /** Módulos, funcionalidades o guías que se suman. Era `{label, to}`. */
  related?: { title: string; body?: string; to: string }[];
  /** La etiqueta de sección de la banda de `related`. Sin esto, "Con qué se combina". */
  relatedTitle?: string;
  /** El H2 de la banda. Sin esto, "Lo que se le suma". Va aparte de `relatedTitle`
   *  porque son dos textos distintos: la etiqueta nombra el bloque y el título dice
   *  qué pasa. En la referencia del 11/11 son «Del ingreso a la línea» y «La fichada se
   *  vuelve asignación». */
  relatedHeading?: string;
  /** Un lead para la banda, cuando los tres bloques necesitan una idea que los una. */
  relatedLead?: string;

  /** Slugs de `solutions.ts`. La vista descarta los que no estén publicados. */
  industries?: string[];
  industriesNote?: string;

  faq: { q: string; a: string }[];
  /** Guía y módulo de destino, al pie. */
  links: { label: string; to: string }[];

  /* ---------- Bloques que hoy tiene una sola funcionalidad ----------
     Opcionales, y la sección no se renderiza donde no están. Control de asistencia vende
     un proyecto con equipo incluido, no una pantalla, y eso necesita decir qué trae la
     caja. Meterlo en `does` lo mezclaría con las capacidades del software. */

  /** Qué incluye el proyecto: equipo, instalación, configuración, sistema.
   *  `icon` es un nombre del set aprobado de `inspectia-icons.ts`, no de Lucide a secas. */
  includesBlock?: {
    title: string;
    items: { title: string; body: string; icon: IconConcept | AllowedIcon }[];
  };
  /** Franja de una sola idea, con su acción. Con `to` es un enlace con flecha; con
   *  `origin` es el botón «Quiero conocerlo», y entonces la franja cierra la página en
   *  lugar de ir entre secciones. */
  band?: {
    title: string;
    body: string;
    linkLabel: string;
    to?: string;
    origin?: string;
  };
  /** Condiciones comerciales. Sin precios propios: salen de `pricing.ts`.
   *  Era `{label, to}`; ahora etiqueta + título + cuerpo, que es lo que la grilla pide. */
  conditions?: { tag: string; title: string; body: string; to?: string }[];
  /** Cierre propio, cuando el CTA del sitio no es el que corresponde. */
  cta?: { title: string; lead: string; demoLabel?: string };
};

export const FEATURES: Feature[] = [
  /* ---------- Producción ---------- */
  {
    slug: "monitoreo-automatico-de-oee",
    module: "produccion",
    name: "Monitoreo automático de OEE",
    blurb: "El dato sale del PLC o de un sensor en la línea, sin carga manual.",
    eyebrow: "Producción · Monitoreo automático",
    h1: "Monitoreo automático de OEE, con el dato que ya sale de la máquina",
    lead: "Conectamos el PLC de la línea, o sumamos un sensor si la máquina no tiene, y el OEE se calcula solo mientras el turno corre. Nadie carga nada: las unidades, las paradas y la velocidad salen de la señal de la máquina. Cuesta lo mismo que el plan con carga manual; la integración se cotiza una sola vez.",
    seoTitle: "Monitoreo automático de OEE conectado al PLC",
    seoDescription:
      "El OEE de cada línea se calcula solo con el dato del PLC, el SCADA o un sensor. Sin carga manual, mismo precio que el plan manual. Andando en 1 a 10 días.",

    heroPanel: {
      title: "Línea 2 · turno mañana",
      blocks: [
        {
          kind: "stats",
          items: [
            { label: "Disponibilidad", value: "86,7 %" },
            { label: "Rendimiento", value: "89,7 %" },
            { label: "Calidad", value: "95,0 %" },
            { label: "OEE", value: "73,9 %" },
          ],
        },
        {
          kind: "rows",
          items: [
            { name: "Línea 1", value: "81,2 %", pill: { text: "En marcha", tone: "ok" } },
            { name: "Línea 2", value: "73,9 %", pill: { text: "En marcha", tone: "ok" } },
            { name: "Línea 3", value: "—", pill: { text: "Parada · 12 min", tone: "warn" } },
          ],
        },
      ],
      foot: "Dato tomado del PLC.",
    },

    problem: [
      "El OEE se calcula al día siguiente, con lo que el operario anotó.",
      "Las microparadas no quedan en ningún lado porque nadie las anota.",
      "El número de producción de cada turno depende de quién lo cargó.",
      "Tenés un PLC o un SCADA con los datos, pero nadie los convierte en un indicador.",
    ],
    does: [
      {
        title: "¿De dónde sale el dato?",
        body: "De donde ya esté: el PLC de la línea, el SCADA, otro sistema de la planta, o un sensor o una lectora que se suma en el puesto. Se elige máquina por máquina: la nueva puede ir por PLC y la vieja por sensor.",
      },
      {
        title: "El OEE mientras pasa",
        body: "Disponibilidad, rendimiento y calidad de cada línea, y el OEE que resulta de las tres, actualizados durante el turno. Si la línea se frena, se ve en el momento y no en el parte de mañana.",
      },
      {
        title: "Las paradas se detectan solas",
        body: "Cuando la señal se corta, la parada queda registrada con su hora de inicio y de fin. El operario sólo le pone el motivo, con dos toques desde el puesto. Las microparadas también cuentan.",
      },
      {
        title: "Mismo precio, carga manual o automática",
        body: "El plan no sube por conectar la máquina. Podés arrancar gratis con una línea cargada a mano y automatizarla cuando quieras.",
      },
    ],

    see: {
      items: [
        "El OEE de la planta y sus tres factores, con cuánto subió o bajó contra el período anterior.",
        "El OEE día por día, contra el objetivo de la planta.",
        "Cada línea contra el objetivo, para ver cuál baja el promedio.",
        "La semana, el mes o el año, con un clic.",
      ],
      shot: { ...APP_SHOT, small: APP_SHOT.src760, smallWidth: 760 },
    },

    capture: [
      { level: "Manual", body: "Plan gratuito, una línea." },
      { level: "Automático", body: "PLC, sensor o lectora." },
      { level: "IA", body: "Visión sobre la línea, como proyecto aparte." },
    ],

    related: [
      {
        title: "Registro de paradas de máquina",
        to: "/plataforma/produccion/registro-de-paradas-de-maquina",
      },
      {
        title: "Calidad",
        body: "El rechazo entra solo al indicador.",
        to: "/plataforma/calidad",
      },
      {
        title: "Energía",
        body: "Cuánta energía cuesta cada unidad.",
        to: "/plataforma/energia",
      },
    ],

    faq: [
      {
        q: "¿Se conecta con mi SCADA?",
        a: "Sí. Si el SCADA ya tiene el dato de la línea, se toma de ahí y no hace falta instalar nada en la máquina.",
      },
      {
        q: "¿Qué necesito para que el OEE sea automático?",
        a: "Que el dato exista en algún lado: un PLC, un SCADA u otro sistema de la planta. Si la máquina no tiene nada, se suma un sensor en el punto de conteo. Se define en el relevamiento, máquina por máquina.",
      },
      {
        q: "¿Sirve con máquinas viejas?",
        a: "Sí. Si no tienen PLC, se agrega un sensor que cuenta las unidades y detecta cuándo la línea se frena.",
      },
      {
        q: "¿Cuánto tarda?",
        a: "Entre 1 y 10 días desde la reunión de arranque: relevamiento, configuración de la planta, conectividad, dos días de piloto y la puesta en producción.",
      },
      {
        q: "¿Conectar la máquina me sube de plan?",
        a: "No. El precio publicado es el mismo para carga manual que para PLC o sensor. Lo único que se cotiza aparte es la integración, una sola vez.",
      },
      {
        q: "¿Puedo usar el programa Kit 4.0?",
        a: "Sí. Somos proveedores habilitados y el programa cubre hasta el 50 % del proyecto.",
      },
    ],
    links: [
      { label: "Cómo calcular el OEE", to: "/guias/como-calcular-el-oee" },
      { label: "Producción", to: "/plataforma/produccion" },
      { label: "Simulador de OEE", to: "/simulador" },
    ],
  },

  {
    slug: "registro-de-paradas-de-maquina",
    module: "produccion",
    name: "Registro de paradas de máquina",
    blurb: "Cada parada con su motivo, en dos toques desde el puesto.",
    eyebrow: "Producción · Paradas",
    h1: "Registro de paradas de máquina: cada parada con su motivo",
    lead: "La parada se detecta sola, o se carga desde el puesto si la línea todavía no está conectada, y el operario le pone el motivo con dos toques. A fin de mes tenés las paradas ordenadas por el tiempo que costaron, por línea, turno y producto: ahí se ve cuál conviene atacar primero.",
    seoTitle: "Registro de paradas de máquina con su motivo",
    seoDescription:
      "Cada parada de la línea queda registrada con su duración y su motivo, en dos toques desde el puesto. Paradas ordenadas por tiempo perdido. Empezá gratis.",

    /* Los porcentajes de las barras son contra la más larga —6h40 = 400 minutos— y no
       contra el total. Es un Pareto de tiempo perdido: lo que tiene que leerse de un
       golpe es cuál conviene atacar primero, no qué parte del mes se perdió. */
    heroPanel: {
      title: "Paradas por motivo · octubre · Línea 2",
      blocks: [
        {
          kind: "bars",
          items: [
            { label: "Falta de envase", value: "6 h 40 min", pct: 100 },
            { label: "Atasco en llenadora", value: "4 h 05 min", pct: 61 },
            { label: "Cambio de formato", value: "3 h 20 min", pct: 50 },
            { label: "Ajuste de peso", value: "1 h 15 min", pct: 19 },
            { label: "Otros", value: "35 min", pct: 9 },
          ],
        },
      ],
    },

    problem: [
      "Las paradas se anotan en un cuaderno al final del turno, con lo que se acuerda el operario.",
      "Sabés que la línea se frena, pero no cuántas veces ni por cuánto tiempo.",
      "Las paradas cortas no las anota nadie y suman horas al mes.",
      "La reunión de producción discute de quién fue la culpa y no qué pasó.",
    ],
    does: [
      {
        title: "¿Cómo se registra una parada?",
        body: "Con la línea conectada, la parada se abre sola cuando la máquina se frena y se cierra cuando vuelve. Sin conexión, el operario la carga desde la pantalla del puesto. En los dos casos el motivo se elige de una lista corta, sin escribir.",
      },
      {
        title: "Una lista de motivos que se usa",
        body: "La lista la define la planta, por línea, y es corta a propósito: si tiene cuarenta opciones, el operario elige siempre la primera. En la guía de [motivos de parada](/guias/motivos-de-parada) hay un ejemplo para armarla.",
      },
      {
        title: "Ordenadas por lo que cuestan",
        body: "Las paradas se agrupan por motivo y se ordenan por tiempo perdido. La que más tiempo come queda arriba, por línea, turno, producto y operario.",
      },
      {
        title: "Conectadas con el resto",
        body: "Cada parada baja la disponibilidad del OEE de esa línea. Con Mantenimiento, la parada por falla puede convertirse en una orden de trabajo.",
      },
    ],
    doesNote:
      "Las paradas programadas —almuerzo, limpieza, mantenimiento planificado— se cargan en el calendario, como paradas únicas o recurrentes, y no cuentan contra la disponibilidad. Así el indicador separa lo que estaba previsto de lo que no.",

    /* La captura es la del módulo y no una propia: su epígrafe habla del cambio de
       formato registrado con su motivo, que es exactamente lo que esta página explica. */
    see: {
      items: [
        "Las unidades cada 15 minutos contra el ritmo ideal: a ritmo, lento o parada.",
        "Lo que pasó en el turno: cada parada con su hora, su motivo y cuánto duró.",
        "Cada estación con su estado y su rendimiento de la última hora.",
        "Lo producido contra el plan del turno.",
      ],
      shot: moduleShot("produccion"),
    },

    capture: [
      { level: "Manual", body: "Desde la pantalla del puesto. Plan gratuito, una línea." },
      { level: "Automático", body: "Con la señal del PLC o de un sensor." },
    ],

    related: [
      {
        title: "Monitoreo automático de OEE",
        to: "/plataforma/produccion/monitoreo-automatico-de-oee",
      },
      { title: "Mantenimiento", to: "/plataforma/mantenimiento" },
      { title: "Industria textil", to: "/soluciones/textil" },
    ],

    faq: [
      {
        q: "¿Los operarios lo van a usar?",
        a: "La pantalla del puesto se maneja de pie y con guantes, muestra sólo lo del turno en curso y clasificar una parada son dos toques. No hay que escribir nada.",
      },
      {
        q: "¿Necesito sensores?",
        a: "No para empezar. Las paradas se cargan desde el puesto y, cuando quieras que se detecten solas, se conecta el PLC o se suma un sensor.",
      },
      {
        q: "¿Cómo se cargan las paradas programadas?",
        a: "En el calendario, como paradas únicas (un mantenimiento puntual) o recurrentes (el almuerzo de todos los días). No cuentan contra la disponibilidad.",
      },
      {
        q: "¿Puedo definir mis propios motivos?",
        a: "Sí, por línea. Conviene empezar con pocos y abrir los que concentran más tiempo.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "El plan gratuito incluye una línea con carga manual. Los precios de los planes pagos están publicados.",
      },
    ],
    links: [
      {
        label: "Cómo reducir las paradas de máquina",
        to: "/guias/como-reducir-las-paradas-de-maquina",
      },
      { label: "Motivos de parada: cómo armar la lista", to: "/guias/motivos-de-parada" },
      { label: "Producción", to: "/plataforma/produccion" },
    ],
  },

  /* ---------- Trazabilidad ---------- */
  {
    slug: "trazabilidad-alimentaria",
    module: "trazabilidad",
    name: "Trazabilidad alimentaria",
    blurb: "Informe de un lote y retiro acotado para plantas de alimentos.",
    eyebrow: "Trazabilidad · Alimentos y bebidas",
    h1: "Software de trazabilidad alimentaria, lote por lote",
    lead: "Cada lote de producto terminado queda atado a la materia prima que lo formó, a las condiciones en que se fabricó y a los clientes que lo recibieron. Cuando llega un reclamo o una auditoría, el informe del lote sale en minutos y el retiro se acota a lo que de verdad está afectado.",
    seoTitle: "Software de trazabilidad alimentaria por lote",
    seoDescription:
      "De qué materia prima salió cada lote, en qué condiciones se fabricó y a quién se despachó. Informe de un lote en minutos y retiro acotado a lo afectado.",

    heroPanel: {
      title: "Lote PT-2611-014 · Galletitas 200 g",
      blocks: [
        {
          kind: "rows",
          items: [{ name: "Estado", pill: { text: "Liberado", tone: "ok" } }],
        },
        {
          kind: "rows",
          group: "Materia prima",
          items: [
            { name: "Harina 000", detail: "Lote H-1029 · Proveedor A" },
            { name: "Azúcar", detail: "Lote A-552 · Proveedor B" },
          ],
        },
        {
          kind: "rows",
          group: "Producción",
          items: [
            { name: "Línea 1 · turno mañana", detail: "11/11/2026" },
            { name: "Control de calidad", detail: "Aprobado" },
          ],
        },
        {
          kind: "rows",
          group: "Despachos",
          items: [
            { name: "Cliente A", value: "120 cajas" },
            { name: "Cliente B", value: "80 cajas" },
            { name: "Cliente C", value: "45 cajas" },
          ],
        },
      ],
    },

    problem: [
      "Para armar el informe de un lote hay que juntar remitos, planillas y partes de producción.",
      "Ante un reclamo se retira todo lo que pueda estar afectado, porque no se puede acotar.",
      "No queda registro de en qué condiciones se produjo cada lote.",
      "Lo que vence primero queda atrás y se despacha lo que entró último.",
    ],
    does: [
      {
        title: "¿Qué tiene el informe de un lote?",
        body: "La materia prima y sus lotes de origen, la línea, el turno y los parámetros con que se fabricó, los resultados de calidad, los certificados y los despachos. Hacia atrás y hacia adelante, desde cualquier punto de la cadena.",
      },
      {
        title: "Retiro acotado a lo afectado",
        body: "Desde un lote de materia prima con problemas se llega a todo lo que se fabricó con él y a quién se despachó. Se retiran esos lotes y no un mes de producción.",
      },
      {
        title: "Bloqueo y liberación con responsable",
        body: "Un lote sospechoso se bloquea y deja de poder despacharse. Se libera cuando el análisis lo respalda, con quién lo hizo y por qué.",
      },
      {
        title: "Vencimientos y FEFO",
        body: "Se despacha primero lo que vence primero, y los lotes por vencer quedan a la vista.",
      },
    ],

    see: {
      items: [
        "De dónde vino el lote: cada materia prima e insumo con su lote y su vencimiento.",
        "Adónde fue: cada ruta con su remito, la venta directa y lo que queda en depósito con su posición.",
        "La conciliación del lote: producido, despachado, en depósito y diferencia.",
        "Los controles del lote con su resultado, y el informe para descargar.",
      ],
      shot: moduleShot("trazabilidad"),
    },

    capture: [
      {
        level: "Manual",
        body: "El lote se carga en el puesto, con la orden. Plan gratuito, una línea.",
      },
      { level: "Automático", body: "Lectura de etiquetas y conexión con la línea." },
    ],

    related: [
      {
        title: "Stock",
        body: "Con Stock el retiro es completo: de la recepción al pedido, lote por lote.",
        to: "/plataforma/stock",
      },
      {
        title: "Calidad",
        body: "Los resultados quedan pegados al lote.",
        to: "/plataforma/calidad",
      },
      { title: "Alimentos y bebidas", to: "/soluciones/alimentos" },
    ],

    faq: [
      {
        q: "¿Sirve para una auditoría?",
        a: "Sí. La genealogía de un lote, con sus condiciones y certificados, se consulta en el momento en lugar de armarla para la visita.",
      },
      {
        q: "¿Necesito etiquetas o lectoras?",
        a: "No para empezar: el lote se carga en el puesto, con la orden. Las etiquetas y lectoras se suman cuando querés que la captura sea automática.",
      },
      {
        q: "¿Funciona con mi ERP?",
        a: "Sí, y no es obligatorio. Podés usarlo sin conectar nada y sumar la integración después.",
      },
      {
        q: "¿Puedo usar el programa Kit 4.0?",
        a: "Sí. La trazabilidad es uno de los kits del programa, que cubre hasta el 50 % del proyecto.",
      },
    ],
    links: [
      { label: "Retiro de lotes: cómo acotarlo", to: "/guias/retiro-de-lotes" },
      { label: "Trazabilidad", to: "/plataforma/trazabilidad" },
      { label: "Alimentos y bebidas", to: "/soluciones/alimentos" },
    ],
  },

  /* ---------- Stock ---------- */
  {
    slug: "wms-para-fabricas",
    module: "stock",
    name: "WMS para fábricas",
    blurb: "Posiciones, consumo contra la orden y producto terminado en el mismo registro.",
    eyebrow: "Stock · WMS de planta",
    h1: "WMS para fábricas: el depósito y la producción en el mismo registro",
    lead: "Los WMS de mercado nacen para centros de distribución. En una fábrica el depósito alimenta la línea y la línea vuelve a llenar el depósito. Acá la materia prima que entra, lo que se consume contra cada orden, el producto terminado y el pedido que sale son el mismo registro, posición por posición.",
    seoTitle: "WMS para fábricas: el depósito unido a la producción",
    seoDescription:
      "Un WMS pensado para planta: materia prima, consumo contra la orden y producto terminado en el mismo registro. Con un celular Android, sin parar el depósito.",

    /* El movimiento se cuenta en palabras y no con flechas. La guía los escribe con «→» y
       «←», que a 12px y sin contexto no se entienden solos, y los lineamientos descartan
       el glifo de texto como ícono. El dato es el mismo. */
    heroPanel: {
      title: "Movimientos de hoy · Depósito planta",
      blocks: [
        {
          kind: "stats",
          items: [
            { label: "Diferencias de conteo hoy", value: "1" },
            { label: "Productos contados", value: "38" },
          ],
        },
        {
          kind: "rows",
          items: [
            { name: "Recepción · remito 4521", detail: "Entra a A-03-2", value: "08:10" },
            { name: "OP 1187 · consumo", detail: "Sale de A-03-2", value: "09:30" },
            { name: "OP 1187 · terminado", detail: "Entra a B-01-1", value: "13:45" },
            { name: "Pedido 3321", detail: "Sale de B-01-1", value: "15:20" },
          ],
        },
      ],
    },

    problem: [
      "El depósito de materia prima y el de producto terminado viven en planillas distintas.",
      "Lo que se consume en la línea se descuenta a mano, al final del día o de la semana.",
      "El sistema dice que hay y en la posición no está.",
      "Un WMS de distribución resuelve el picking pero no sabe nada de la orden de producción.",
    ],
    does: [
      {
        title: "¿Qué tiene que tener un WMS de planta?",
        body: "Posiciones, recepción, movimientos y pedidos, como cualquier WMS, y además el consumo contra la orden de producción y el ingreso del terminado. Es lo que no tiene uno de distribución.",
      },
      {
        title: "Del camión a la línea y de la línea al pedido",
        body: "Lo que baja del camión se recibe contra el remito y se guarda en su posición. Lo que se consume se descuenta contra la orden. El terminado ingresa sin doble carga y sale contra el pedido.",
      },
      {
        title: "El conteo, contra el sistema",
        body: "Lo contado se compara con lo que dice el sistema y la diferencia aparece en el momento. El ajuste queda con su motivo y con quién lo hizo.",
      },
      {
        title: "Con un celular",
        body: "El operario trabaja con un Android común. No hay terminales que comprar para empezar.",
      },
    ],

    see: {
      items: [
        "El stock de cada producto, lo que sale por día y cuántos días cubre.",
        "Los productos que no llegan al límite de cobertura, marcados.",
        "Las diferencias de conteo contra el sistema, con quién contó y cuándo, y el ajuste.",
        "Qué pedir hoy, según la demora de cada proveedor.",
      ],
      shot: moduleShot("stock"),
    },

    capture: [
      { level: "Manual", body: "Con el celular. Plan gratuito, cinco posiciones." },
      { level: "Automático", body: "Con lectoras y etiquetas." },
      {
        level: "IA",
        body: "Recepción con cámara en el muelle e inventario con drones en las posiciones altas.",
      },
    ],

    related: [
      {
        title: "Producción",
        body: "El consumo se descuenta solo contra la orden.",
        to: "/plataforma/produccion",
      },
      {
        title: "Trazabilidad",
        body: "El lote seguido de la recepción al pedido.",
        to: "/plataforma/trazabilidad",
      },
      { title: "Recepción con cámara", to: "/ia/recepcion" },
      { title: "Inventario con drones", to: "/ia/inventario-con-drones" },
    ],

    faq: [
      {
        q: "¿Reemplaza a mi WMS?",
        a: "No hace falta. Si ya tenés uno, trabaja contra él; si no, es el sistema del depósito de la planta.",
      },
      {
        q: "¿Necesito lectoras o terminales?",
        a: "No para empezar: alcanza con un celular Android por operario.",
      },
      {
        q: "¿Hay que etiquetar las posiciones?",
        a: "Tienen que poder identificarse. Si el depósito ya está etiquetado, se usa lo que hay; si no, el etiquetado es parte de la puesta en marcha.",
      },
      {
        q: "¿Sirve para un depósito chico?",
        a: "Sí, y arranca bien ahí. El plan gratuito incluye cinco posiciones.",
      },
    ],
    links: [
      { label: "Inventario que no cuadra", to: "/guias/inventario-que-no-cuadra" },
      { label: "Stock", to: "/plataforma/stock" },
    ],
  },

  /* ---------- Tareas y asistencia ----------
     La única que vende un proyecto con equipo incluido y no una pantalla, así que es la
     única con `includesBlock`, `band`, `industries`, `conditions` y `cta` propios. Es
     también la que la referencia visual del 11/11 dibuja entera, así que es la única cuyos
     campos nuevos están completos.

     **Sobre el reconocimiento facial.** Hay un fallo de la Justicia porteña que suspendió
     exigirlo a empleados públicos y ordenó dar métodos alternativos. La página ofrece
     siempre tarjeta o PIN y en ningún lugar presenta lo facial como obligatorio: no es una
     precaución de redacción, es lo que el producto tiene que hacer. */
  {
    slug: "control-de-asistencia",
    module: "tareas",
    name: "Control de asistencia en planta",
    blurb: "La fichada cruzada con el horario y con el puesto.",
    eyebrow: "Tareas y asistencia · Asistencia",
    h1: "Control de asistencia en planta, conectado al turno",
    lead: "Instalamos la terminal, la configuramos con tu personal y tus horarios, y cada fichada llega a InspectIA: quién entró, a qué hora y en qué puesto está. Se ficha con el rostro, con tarjeta o con PIN.",
    seoTitle: "Control de asistencia en planta, con reconocimiento facial",
    seoDescription:
      "Terminal facial instalada y configurada, conectada a InspectIA: presentes contra esperados, llegadas tarde y personal por puesto. Tarjeta o PIN incluidos.",

    heroPanel: {
      title: "Hoy · turno mañana",
      blocks: [
        {
          kind: "stats",
          items: [
            { label: "Presentes", value: "38", suffix: "/ 42" },
            { label: "Llegaron tarde", value: "3" },
            { label: "Entran después", value: "4" },
          ],
        },
        {
          kind: "rows",
          items: [
            {
              name: "Sofía Ledesma",
              detail: "Amasado · línea 1",
              pill: { text: "Presente 05:52", tone: "ok" },
            },
            {
              name: "Diego Sosa",
              detail: "Envasado · línea 2",
              pill: { text: "Tarde 06:14 · 14 min", tone: "warn" },
            },
            {
              name: "Lucía Ferreyra",
              detail: "Control de calidad",
              pill: { text: "Entra a las 14:00", tone: "info" },
            },
            {
              name: "Martín Acosta",
              detail: "Depósito",
              pill: { text: "De licencia hasta 18/11", tone: "neutral" },
            },
          ],
        },
      ],
    },
    heroNote: "Equipo, instalación, configuración y sistema, con un solo responsable.",

    problem: [
      "La fichada se lleva en una planilla y el resumen del mes se arma a mano.",
      "No se sabe quién está presente en el turno hasta que alguien recorre la planta.",
      "El reloj que ya está instalado no se habla con ningún sistema.",
      "Las horas para liquidar se transcriben de un sistema a otro.",
    ],

    includesBlock: {
      title: "Todo incluido: equipo, instalación y sistema",
      items: [
        {
          title: "El equipo",
          body: "Terminal de reconocimiento facial, la que mejor se adapte a tu planta, con tarjeta o PIN para quien no ficha con el rostro.",
          icon: "scan-eye",
        },
        {
          title: "La instalación",
          body: "La montamos en el ingreso y la conectamos a la red. Opcional: la vinculamos con la puerta o el molinete para habilitar el paso.",
          icon: "maintenance",
        },
        {
          title: "La configuración",
          body: "Cargamos el padrón, los horarios y las licencias, y la probamos con tu gente antes de irnos.",
          icon: "users",
        },
        {
          title: "El sistema",
          body: "InspectIA, con asistencia, tareas y reportes.",
          icon: "layout-dashboard",
        },
      ],
    },

    band: {
      title: "¿Ya tenés algo instalado?",
      body: "Trabajamos con lo que hay. Si ya tenés reloj, terminal, control de acceso o sistema de sueldos, nos conectamos, lo integramos a InspectIA y coordinamos con tu proveedor lo que haga falta. Por ejemplo, un reloj que trabaja con CrossChex se conecta sin cambiar el equipo. Sumamos equipo sólo donde falta.",
      linkLabel: "Contanos qué tenés",
      to: "/contacto",
    },

    does: [
      {
        title: "Ficha",
        body: "La persona se para frente a la terminal, que la reconoce y registra la fichada. Si está conectada a la puerta, además le habilita el paso.",
      },
      {
        title: "Se cruza con su horario",
        body: "La fichada se compara con el horario de cada uno: presente, tarde o todavía no le toca entrar. Nadie figura ausente antes de su hora.",
      },
      {
        title: "El supervisor asigna",
        body: "El supervisor ve quién está en su turno y le asigna estación y tareas.",
      },
      {
        title: "Listo para liquidar",
        body: "Presentes, tardanzas, licencias, salidas sin fichar y horas del período, por persona, exportable a Excel.",
      },
    ],

    /* La única con la lista completa: la referencia del 11/11 la trae. Y la única que va
       con panel en vez de captura: `inspectia-asignacion-tareas-turno` muestra la
       cobertura de un turno —quién está en cada puesto—, no la asistencia del mes, que es
       de lo que habla esta sección. */
    see: {
      title: "La asistencia del día y la del mes, en el mismo lugar",
      items: [
        "Presentes contra esperados, en el momento.",
        "Llegadas tarde, salidas anticipadas y salidas sin fichar.",
        "El reporte del período para liquidar, exportable a Excel.",
        "El historial día por día de cada persona.",
      ],
      panel: {
        title: "Asistencia · octubre",
        blocks: [
          {
            kind: "table",
            head: ["Persona", "Presentes", "Tardanzas", "Licencias", "Horas fichadas"],
            rows: [
              ["Sofía Ledesma", "21 / 22", "0", "1", "176 h"],
              ["Diego Sosa", "22 / 22", "4", "0", "181 h"],
              ["Lucía Ferreyra", "20 / 22", "1", "2", "168 h"],
              ["Martín Acosta", "17 / 22", "0", "5", "142 h"],
            ],
          },
        ],
      },
    },

    relatedTitle: "Del ingreso a la línea",
    relatedHeading: "La fichada se vuelve asignación",
    relatedLead:
      "Quién está en cada estación, qué tareas tiene y cuánto tiempo pasó en su puesto. Sumá los módulos que necesites y el mismo dato rinde más.",
    related: [
      {
        title: "Tareas y asistencia",
        body: "Estaciones y tareas del turno, asignadas sobre quién está presente.",
        to: "/plataforma/tareas",
      },
      {
        title: "Producción",
        body: "Unidades por hora por persona, en cada estación.",
        to: "/plataforma/produccion",
      },
      {
        title: "Costo por unidad",
        body: "Las horas-hombre de cada orden, valorizadas con el valor hora de cada categoría.",
        to: "/plataforma/produccion/costo-por-unidad",
      },
    ],

    /* La referencia junta «Farmacéutica y cosmética» en un chip; en el sitio son dos
       industrias con página propia, así que son dos chips. Las etiquetas salen de
       `solutions.ts` y no se escriben acá: el nombre lo renombra el catálogo. */
    industries: [
      "alimentos",
      "autopartista",
      "textil",
      "farmaceutica",
      "cosmetica",
      "maquinarias",
      "logistica",
    ],
    industriesNote: "Funciona en una o en varias plantas: cada terminal se asigna a la suya.",

    conditions: [
      {
        tag: "Plan gratuito",
        title: "Reportes de asistencia incluidos",
        body: "Con el fichero conectado, la asistencia está en el plan gratuito.",
      },
      {
        tag: "Kit 4.0",
        title: "Hasta 50 % del proyecto",
        body: "Somos proveedores habilitados del programa Kit 4.0.",
        to: "/kit-4-0",
      },
      {
        tag: "Lanzamiento",
        title: "Tres meses sin cargo",
        body: "Los primeros tres meses del plan pago, para clientes nuevos.",
      },
    ],

    cta: {
      title: "Coordinemos una visita a tu planta",
      lead: "Vemos el ingreso, lo que ya tenés instalado y armamos la propuesta.",
      demoLabel: "Agendar una visita técnica",
    },

    faq: [
      {
        q: "¿Hay que fichar con el rostro?",
        a: "No. Cada persona puede fichar con el rostro, con tarjeta o con PIN.",
      },
      {
        q: "¿Funciona con casco, barbijo o lentes?",
        a: "Depende del equipo que elijamos; lo definimos en la visita técnica.",
      },
      {
        q: "¿Funciona si se corta internet?",
        a: "Depende del equipo que elijamos para tu planta; lo definimos en la visita técnica.",
      },
      {
        q: "¿Sirve para varias plantas?",
        a: "Sí. Cada terminal se asigna a una planta y los reportes se filtran por planta.",
      },
      {
        q: "¿Qué pasa con quien no ficha?",
        a: "Se marca «No ficha» y no figura en los reportes de asistencia.",
      },
      {
        q: "¿Se conecta con mi sistema de sueldos?",
        a: "Hoy exporta a Excel; otras integraciones, a pedido.",
      },
    ],
    links: [{ label: "Tareas y asistencia", to: "/plataforma/tareas" }],
  },

  /* ---------- Producción · tanda del 12/11/2026 ----------
     Cuatro funcionalidades que ya existen en la aplicación y dos que no del todo (andon y
     costo por unidad, con `status: "a-pedido"`). El copy sale de los archivos `16_` a `1B_`
     de `docs/landings/seo/`; los `blurb` son la primera oración del `lead` de cada archivo,
     porque esos archivos no traen un campo para el listado del módulo. */
  {
    slug: "mrp-y-escenarios",
    module: "produccion",
    name: "MRP y escenarios",
    blurb: "El cálculo de necesidades de materiales de un MRP, con la capacidad al lado.",
    eyebrow: "Producción · MRP y escenarios",
    h1: "MRP y escenarios: todo lo que hace falta para producir lo que querés",
    lead: "El cálculo de necesidades de materiales de un MRP, con la capacidad de producción al lado. Cargás cuánto querés producir de cada producto en un período, o partís de los pedidos abiertos, y ves todo lo que implica: la materia prima que falta y cuánto cuesta comprarla, las horas de máquina contra las que tenés, los operarios por turno y cómo queda el stock. Comparás escenarios antes de comprometerte.",
    seoTitle: "MRP y escenarios de producción: materiales, máquinas y costos",
    seoDescription:
      "Cálculo de necesidades de materiales con tus recetas y tu stock, más la capacidad de producción: horas de máquina, operarios, costo de compras y stock final.",

    heroPanel: {
      title: "Escenario diciembre",
      blocks: [
        {
          kind: "stats",
          items: [
            { label: "Productos", value: "6" },
            { label: "Materiales a pedir", value: "3" },
            { label: "Costo de compras", value: "$ 12.480.000" },
            { label: "Operarios por turno", value: "14" },
          ],
        },
        {
          kind: "bars",
          items: [
            {
              label: "Hornos",
              value: "112 %",
              pct: 112,
              pill: { text: "Sobrecarga", tone: "warn" },
            },
            { label: "Amasadoras", value: "81 %", pct: 81 },
            { label: "Envasadoras", value: "74 %", pct: 74 },
          ],
        },
        {
          kind: "rows",
          group: "Materiales",
          items: [
            {
              name: "Harina 000",
              detail: "Necesita 42.000 kg · disponible 30.500",
              value: "Pedir 11.500",
            },
            { name: "Envase 200 g", value: "Pedir 8.000 u" },
            { name: "Azúcar", pill: { text: "Cubierto", tone: "ok" } },
          ],
        },
      ],
    },

    problem: [
      "Para saber si se puede tomar un pedido grande hay que armar una planilla que nadie más entiende.",
      "La materia prima se pide cuando ya falta, porque nadie calculó cuánto hacía falta.",
      "No se sabe si las máquinas dan abasto hasta que la producción ya está atrasada.",
      "Cada alternativa de plan es una planilla nueva, y comparar dos lleva una tarde.",
    ],
    does: [
      {
        title: "¿Cuánta materia prima necesito?",
        body: "Con la receta de cada producto se calcula la necesidad de cada material, se descuenta lo disponible y lo comprometido, y queda lo que falta, lo que hay que pedir y lo que sobra.",
      },
      {
        title: "¿Las máquinas dan abasto?",
        body: "Horas necesarias contra horas disponibles por familia de máquinas, con el calendario y los turnos de la planta. La sobrecarga se ve antes de que pase, con las máquinas que harían falta.",
      },
      {
        title: "Operarios, costos y stock",
        body: "Cuántos operarios por turno pide el escenario, cuánto cuesta lo que hay que comprar y cómo queda el stock al final del período.",
      },
      {
        title: "Compará y aprobá",
        body: "Copiás un escenario, cambiás cantidades y comparás. El que se aprueba queda guardado tal como se aprobó, y desde ahí se generan los pedidos de compra.",
      },
    ],
    doesNote:
      "Un escenario no crea órdenes de producción: sirve para decidir. Lo que se va a producir se arma en el [plan de producción](/plataforma/produccion/plan-de-produccion).",

    see: {
      items: [
        "Por material: lo que necesita el escenario, lo disponible, lo que falta, lo que hay que pedir y lo que sobra.",
        "Por familia de máquinas: horas necesarias contra horas disponibles, y dónde hay sobrecarga.",
        "Los operarios por turno y las máquinas que harían falta.",
        "El costo de lo que hay que comprar y cómo queda el stock al final del período.",
      ],
      panel: {
        title: "Materiales · escenario diciembre",
        blocks: [
          {
            kind: "table",
            head: ["Material", "Necesita", "Disponible", "Pedir", "Costo"],
            rows: [
              ["Harina 000", "42.000 kg", "30.500", "11.500", "$ 5.175.000"],
              ["Manteca", "6.200 kg", "4.100", "2.100", "$ 4.410.000"],
              ["Envase 200 g", "210.000 u", "202.000", "8.000", "$ 2.895.000"],
              ["Azúcar", "9.800 kg", "12.000", "—", { text: "Cubierto", tone: "ok" }],
            ],
          },
        ],
        foot: "Total a comprar $ 12.480.000",
      },
    },

    related: [
      {
        title: "Plan de producción desde pedidos",
        body: "Lo aprobado pasa a órdenes, por línea y fecha.",
        to: "/plataforma/produccion/plan-de-produccion",
      },
      {
        title: "Stock",
        body: "El disponible de cada material sale del depósito.",
        to: "/plataforma/stock",
      },
      {
        title: "Parte de producción digital",
        body: "Lo que cada línea produjo de verdad, turno por turno.",
        to: "/plataforma/produccion/parte-de-produccion",
      },
    ],

    faq: [
      {
        q: "¿Es un MRP?",
        a: "Hace el cálculo de necesidades de materiales de un MRP a partir de las recetas, el stock y lo comprometido, y le suma la carga de máquinas y los operarios. No programa la producción contra la capacidad: eso se hace en el plan.",
      },
      {
        q: "¿Puedo cargar las cantidades en recetas?",
        a: "Sí, en unidades o en recetas. Si se cargan recetas, el rinde de cada una queda fijo en el escenario.",
      },
      {
        q: "¿Puedo partir de los pedidos de clientes?",
        a: "Sí. Los pedidos abiertos, con lo que falta entregar, se suman al escenario.",
      },
      {
        q: "¿Qué necesito tener cargado?",
        a: "Los productos con su receta y los materiales con su stock. Para los costos, el costo de cada material; para la carga, las máquinas y sus turnos. Lo que falte, el escenario lo marca.",
      },
    ],
    /* El archivo enlaza además una guía de planificación de la producción en `/blog/…`,
       que no existe y no está en esta tanda. Se saca el enlace en vez de publicar un 404. */
    links: [{ label: "Producción", to: "/plataforma/produccion" }],
  },

  {
    slug: "plan-de-produccion",
    module: "produccion",
    name: "Plan de producción",
    blurb: "Los pedidos de clientes entran con sus productos y sus fechas de entrega.",
    eyebrow: "Producción · Plan de producción",
    h1: "Plan de producción armado desde los pedidos de tus clientes",
    lead: "Los pedidos de clientes entran con sus productos y sus fechas de entrega. Armás el plan con lo que falta entregar, ves el material que necesita, lo aprobás y lo programás por línea y fecha. Las órdenes salen del plan, y después lo comparás con lo que realmente se produjo.",
    seoTitle: "Plan de producción y órdenes desde los pedidos de clientes",
    seoDescription:
      "De los pedidos abiertos al plan aprobado y a las órdenes por línea y fecha, con el material calculado. Después, el plan contra lo que se produjo.",

    heroPanel: {
      title: "Pendiente de programar",
      blocks: [
        {
          kind: "rows",
          items: [
            {
              name: "Pedido 3321 · Cliente A",
              detail: "Galletitas 200 g · 4.800 u · entrega 20/11",
              pill: { text: "Aprobado", tone: "info" },
            },
            {
              name: "Pedido 3327 · Cliente B",
              detail: "Galletitas 500 g · 2.400 u · entrega 22/11",
              pill: { text: "Aprobado", tone: "info" },
            },
            {
              name: "Pedido 3330 · Cliente C",
              detail: "Budín 300 g · 1.200 u · entrega 25/11",
              pill: { text: "Borrador", tone: "neutral" },
            },
          ],
        },
      ],
      foot: "Programado: 6.000 de 8.400 u.",
    },

    problem: [
      "Los pedidos están en un mail o en el sistema de ventas, y el plan de producción en una planilla aparte.",
      "No se sabe qué parte de cada pedido ya se programó y qué falta.",
      "La orden llega a la línea sin saber si hay material para hacerla.",
      "Cuando el plan no se cumple, nadie puede decir qué pedido se atrasó.",
    ],
    does: [
      {
        title: "¿Qué falta entregar?",
        body: "Los pedidos abiertos muestran, por producto, lo que falta entregar a cada cliente y para cuándo.",
      },
      {
        title: "Del pedido al plan",
        body: "El plan junta lo que elegís de los pedidos abiertos y lo que sumás a mano, y calcula el material que necesita antes de aprobarlo.",
      },
      {
        title: "Programado por línea y fecha",
        body: "Lo aprobado se programa por partes, en la línea y el día que corresponde, y de ahí salen las órdenes de producción. Lo que ya se programó deja de figurar como pendiente.",
      },
      {
        title: "Plan contra real",
        body: "Cada orden se compara con lo que se produjo, y la desviación queda a la vista por línea y por pedido.",
      },
    ],

    see: {
      items: [
        "Los pedidos abiertos, con lo que falta entregar a cada cliente y para cuándo.",
        "El plan con su material calculado, antes de aprobarlo.",
        "De cada renglón, cuánto ya se programó y cuánto queda pendiente.",
        "Las órdenes por línea y por día, y lo producido contra lo esperado.",
      ],
      panel: {
        title: "Programación · semana 47",
        blocks: [
          {
            kind: "table",
            head: ["Día", "Línea", "Producto", "Cantidad", "Pedido"],
            rows: [
              ["Lun 17", "Línea 1", "Galletitas 200 g", "2.400 u", "3321"],
              ["Mar 18", "Línea 1", "Galletitas 200 g", "1.200 u", "3321"],
              ["Mar 18", "Línea 2", "Galletitas 500 g", "2.400 u", "3327"],
              [
                "Jue 20",
                "Línea 3",
                "Budín 300 g",
                "1.200 u",
                { text: "Pendiente", tone: "neutral" },
              ],
            ],
          },
        ],
        foot: "Programado 6.000 de 8.400 u",
      },
    },

    related: [
      {
        title: "MRP y escenarios",
        body: "Antes de comprometerte, mirá qué implica: material, máquinas, operarios y costos.",
        to: "/plataforma/produccion/mrp-y-escenarios",
      },
      {
        title: "Monitoreo automático de OEE",
        body: "Lo producido de cada orden, con el dato de la máquina.",
        to: "/plataforma/produccion/monitoreo-automatico-de-oee",
      },
      {
        title: "WMS para fábricas",
        body: "El material que la orden consume se descuenta del depósito.",
        to: "/plataforma/stock/wms-para-fabricas",
      },
    ],

    faq: [
      {
        q: "¿Es un plan maestro de producción?",
        a: "Cumple ese papel: dice qué productos, cuánto y para cuándo, a partir de la demanda real de tus clientes. Lo que se programa por línea y día sale de ahí.",
      },
      {
        q: "¿Los pedidos se cargan a mano?",
        a: "Sí, con su número, cliente, fecha de entrega y productos. Si están en tu ERP, se pueden traer con una integración.",
      },
      {
        q: "¿El plan se arma solo?",
        a: "No: vos elegís qué pedidos entran y lo aprobás. El sistema calcula el material y lleva la cuenta de lo programado y lo pendiente.",
      },
      {
        q: "¿Puedo programar un pedido en partes?",
        a: "Sí. Un renglón aprobado se puede repartir en varias líneas o días.",
      },
      {
        q: "¿Qué pasa si no se cumple?",
        a: "Cada orden muestra lo producido contra lo esperado, y lo que no se hizo vuelve a figurar como pendiente si se cancela el plan.",
      },
    ],
    links: [
      { label: "Producción", to: "/plataforma/produccion" },
      { label: "MRP y escenarios", to: "/plataforma/produccion/mrp-y-escenarios" },
    ],
  },

  {
    slug: "parte-de-produccion",
    module: "produccion",
    name: "Parte de producción",
    blurb: "El supervisor anota las paradas cuando pasan y lo producido al cerrar cada orden.",
    eyebrow: "Producción · Parte de producción",
    h1: "Parte de producción digital: el turno cerrado, sin pasar planillas",
    lead: "El supervisor anota las paradas cuando pasan y, al cerrar cada orden, lo producido y lo rechazado. No hace falta ningún sensor. Cuando termina el turno, el parte llega por mail a la gerencia con el OEE ya calculado.",
    seoTitle: "Parte de producción digital por turno, sin planillas",
    seoDescription:
      "Registro de producción sin papel: el supervisor carga cada orden al cerrarla y al terminar el turno el parte llega por mail: producido contra plan, OEE, paradas y lo que hay que revisar.",

    heroPanel: {
      title: "Parte del turno mañana · Línea 2",
      blocks: [
        {
          kind: "stats",
          items: [
            { label: "Órdenes cerradas", value: "4" },
            { label: "Producido", value: "11.840", suffix: "/ 12.600 u" },
            { label: "OEE", value: "71,2 %" },
            { label: "Paradas no planificadas", value: "38 min" },
            { label: "Pérdida de ritmo", value: "22 min" },
          ],
        },
        {
          kind: "rows",
          items: [
            {
              name: "Dato a revisar",
              detail: "La orden 1184 dio 128 % de rendimiento",
              pill: { text: "Revisar", tone: "warn" },
            },
          ],
        },
      ],
    },

    problem: [
      "El parte en papel se pasa a una planilla al otro día, si se pasa.",
      "Cada supervisor lo llena a su manera y los turnos no se pueden comparar.",
      "Cuando la gerencia ve el número, ya pasaron dos días y nadie se acuerda qué pasó.",
      "Un error de tipeo infla la producción y nadie se da cuenta.",
    ],
    does: [
      {
        title: "Paradas en el momento",
        body: "La parada se anota cuando pasa, con su motivo. Queda en el mismo historial que las paradas que detecta una máquina.",
      },
      {
        title: "Cierre por orden",
        body: "Al terminar cada orden se cargan las unidades producidas y las defectuosas. El OEE se calcula en ese momento y el cierre no se puede tocar después: si hay que corregir, se hace una revisión que queda vinculada.",
      },
      {
        title: "El parte llega solo",
        body: "Al cerrar la última orden del turno, o cuando el turno termina con órdenes abiertas, la gerencia recibe el parte por mail: producido contra esperado, OEE, minutos de paradas y pérdida de ritmo.",
      },
      {
        title: "Lo raro, marcado",
        body: "Si una orden da un rendimiento imposible, el parte lo avisa como dato a revisar. No lo borra ni lo esconde.",
      },
    ],
    doesNote:
      "Cuando la planta suma sensores o conecta el PLC, el mismo parte se arma con el dato de la máquina. Ver [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee).",

    see: {
      items: [
        "Las órdenes cerradas del turno y las que quedaron abiertas.",
        "Lo producido contra lo esperado, orden por orden.",
        "El OEE del turno con sus tres factores.",
        "Los minutos de paradas no planificadas y de pérdida de ritmo.",
        "El dato a revisar, si hay uno, sin sacarlo de la cuenta.",
      ],
      panel: {
        /* El hero ya se llama «Parte del turno mañana · Línea 2». Dos paneles con el
           mismo nombre en la misma página se leen como el mismo dato dos veces; éste
           muestra las órdenes, así que lo dice. */
        title: "Órdenes del parte · turno mañana",
        blocks: [
          {
            kind: "table",
            head: ["Orden", "Producto", "Producido", "Esperado", "OEE"],
            rows: [
              ["1181", "Galletitas 200 g", "3.200", "3.300", "74 %"],
              ["1182", "Galletitas 200 g", "3.150", "3.300", "71 %"],
              ["1183", "Galletitas 500 g", "2.640", "3.000", "66 %"],
              ["1184", "Galletitas 500 g", "2.850", "3.000", { text: "A revisar", tone: "warn" }],
            ],
          },
        ],
        foot: "4 órdenes cerradas · ninguna abierta",
      },
    },

    related: [
      {
        title: "Registro de paradas",
        body: "Motivos, paradas planificadas y dónde se pierde el tiempo.",
        to: "/plataforma/produccion/registro-de-paradas-de-maquina",
      },
      {
        title: "Plan de producción",
        body: "El esperado del parte sale del plan.",
        to: "/plataforma/produccion/plan-de-produccion",
      },
      {
        title: "Cómo calcular el OEE",
        body: "La cuenta que hace el parte, con un ejemplo.",
        to: "/guias/como-calcular-el-oee",
      },
    ],

    faq: [
      {
        q: "¿Necesito sensores?",
        a: "No. El parte se arma con lo que carga el supervisor. Si después se suman sensores, se reemplaza la carga por el dato de la máquina.",
      },
      {
        q: "¿Quién recibe el parte?",
        a: "Los usuarios con rol de gerencia. Llega uno por línea y por día.",
      },
      {
        q: "¿Qué pasa si me equivoqué al cargar?",
        a: "El cierre queda como se cargó y se corrige con una revisión que lo referencia. Así se sabe qué se cambió.",
      },
      {
        q: "¿Y si el turno termina con órdenes abiertas?",
        a: "El parte sale igual y dice cuántas quedaron sin cerrar.",
      },
    ],
    links: [
      { label: "Producción", to: "/plataforma/produccion" },
      { label: "Motivos de parada", to: "/guias/motivos-de-parada" },
    ],
  },

  /* ---------- Mantenimiento ---------- */
  {
    slug: "mantenimiento-por-horas-de-uso",
    module: "mantenimiento",
    name: "Mantenimiento por horas de uso",
    blurb: "Cada servicio vence por días, por horas de uso o por las dos cosas.",
    eyebrow: "Mantenimiento · Por horas de uso",
    h1: "Mantenimiento preventivo por horas reales de uso",
    lead: "Definís cada servicio por días, por horas de uso o por las dos cosas, y vence lo que llegue primero. Las horas se cuentan solas con lo que la máquina produjo, o con el horómetro si lo cargás a mano. El responsable recibe el aviso antes de que venza.",
    seoTitle: "Software de mantenimiento preventivo por horas de uso",
    seoDescription:
      "Cada servicio vence por fecha o por horas de uso, lo que llegue primero. Las horas salen de la producción real o del horómetro, y el responsable recibe el aviso.",

    heroPanel: {
      title: "Próximos vencimientos",
      blocks: [
        {
          kind: "rows",
          items: [
            {
              name: "Envasadora 2 · Cambio de correas",
              detail: "Cada 500 h · faltan 42 h · vence aprox. 18/11",
              pill: { text: "Esta semana", tone: "warn" },
            },
            {
              name: "Horno túnel · Limpieza de quemadores",
              detail: "Cada 90 días · vence 02/12",
              pill: { text: "En fecha", tone: "neutral" },
            },
            {
              name: "Compresor 1 · Service",
              detail: "Cada 2.000 h o 180 días · vencido hace 3 días",
              pill: { text: "Vencido", tone: "stop" },
            },
          ],
        },
      ],
      foot: "Horas de Envasadora 2: de la producción.",
    },

    problem: [
      "El plan de mantenimiento va por calendario, aunque la máquina haya trabajado el doble o la mitad.",
      "Las horas de cada equipo están en un horómetro que nadie anota.",
      "El aviso depende de que alguien se acuerde, y el service se hace cuando ya se rompió.",
      "La parada por mantenimiento no queda registrada y después se mezcla con las fallas.",
    ],
    does: [
      {
        title: "Por fecha o por horas",
        body: "Cada servicio tiene su frecuencia en días, en horas de uso o en ambas. Vence lo que se cumpla primero.",
      },
      {
        title: "Las horas, del uso real",
        body: "Si la línea tiene Producción, las horas son el tiempo que la máquina estuvo produciendo. Si no, se cargan las lecturas del horómetro. Con el uso promedio, el sistema calcula qué día va a vencer.",
      },
      {
        title: "Aviso al responsable",
        body: "El mail le llega a quien hace el servicio, sea alguien de la planta o un prestador externo.",
      },
      {
        title: "La intervención, registrada",
        body: "Lo que se hizo queda con fecha y responsable, y no se borra: si hubo un error, se anula con el motivo. Con Producción, la preventiva cuenta como parada planificada y la correctiva como no planificada.",
      },
    ],

    see: {
      items: [
        "Los próximos vencimientos de cada máquina, por fecha o por horas.",
        "De dónde salen las horas de cada una: de la producción o del horómetro.",
        "Lo vencido y lo que vence esta semana, separados.",
        "El historial de intervenciones de cada máquina, con fecha, tipo y responsable.",
      ],
      panel: {
        title: "Envasadora 2",
        blocks: [
          {
            kind: "stats",
            items: [
              {
                label: "Horas desde el último service",
                value: "458",
                suffix: "de 500 · de la producción",
              },
            ],
          },
          {
            kind: "table",
            head: ["Fecha", "Intervención", "Tipo", "Responsable"],
            rows: [
              [
                "02/11",
                "Cambio de correas",
                { text: "Preventiva", tone: "neutral" },
                "Mantenimiento interno",
              ],
              [
                "21/10",
                "Atasco de film",
                { text: "Correctiva", tone: "warn" },
                "Mantenimiento interno",
              ],
              [
                "04/09",
                "Service general",
                { text: "Preventiva", tone: "neutral" },
                "Prestador externo",
              ],
            ],
          },
        ],
      },
    },

    related: [
      {
        title: "Registro de paradas",
        body: "La parada por mantenimiento queda clasificada sola.",
        to: "/plataforma/produccion/registro-de-paradas-de-maquina",
      },
      {
        title: "Monitoreo automático de OEE",
        body: "De ahí salen las horas de uso de cada máquina.",
        to: "/plataforma/produccion/monitoreo-automatico-de-oee",
      },
    ],

    faq: [
      {
        q: "¿Necesito Producción para usarlo?",
        a: "No. Sin Producción, las horas salen del horómetro que se carga a mano y las intervenciones se registran igual.",
      },
      {
        q: "¿Puedo combinar días y horas?",
        a: "Sí. Un servicio puede vencer cada 2.000 horas o cada 180 días, lo que pase primero.",
      },
      {
        q: "¿Cómo sabe cuándo va a vencer por horas?",
        a: "Proyecta con el uso promedio de la máquina desde el último service.",
      },
      {
        q: "¿Sirve para prestadores externos?",
        a: "Sí. Cada servicio tiene su responsable, interno o externo, y el aviso le llega a esa persona.",
      },
    ],
    links: [{ label: "Mantenimiento", to: "/plataforma/mantenimiento" }],
  },

  /* ---------- Las dos que todavía no se contratan solas ----------
     Se publican porque posicionan algo que se construye cuando un cliente lo pide, y por
     eso no llevan «Empezar gratis»: ofrecer una cuenta gratuita para usar algo que no está
     es la forma más rápida de que esa cuenta se dé de baja el mismo día. El día que la
     funcionalidad exista alcanza con sacar `status` y `requestOrigin`. */
  {
    slug: "andon-digital",
    module: "produccion",
    status: "a-pedido",
    requestOrigin: "andon",
    name: "Andon digital",
    blurb: "Una pantalla en la planta muestra cada línea en vivo.",
    eyebrow: "Producción · Andon digital",
    h1: "Andon digital: cómo viene cada línea, a la vista de toda la planta",
    lead: "Una pantalla en la planta muestra cada línea en vivo: cuánto lleva producido contra el plan, el OEE, si está parada y cuánto tiempo se perdió en el turno. El que pasa por la línea sabe en segundos si va bien o hay que actuar.",
    seoTitle: "Andon digital: el estado de cada línea en una pantalla de planta",
    seoDescription:
      "Una pantalla en la planta con cada línea en vivo: producido contra plan, OEE, paradas y tiempo perdido. Sin tableros a mano ni luces aparte.",

    /* El único panel oscuro del sitio, y con motivo: un andon se mira de lejos y en un
       taller con luz dura. Como ya gasta la superficie de teal profundo de la página, la
       banda de relacionadas de esta página va clara. */
    heroPanel: {
      title: "Planta Norte · turno tarde",
      tone: "dark",
      blocks: [
        {
          kind: "rows",
          items: [
            {
              name: "Línea 1",
              detail: "8.420 / 9.000 u · OEE 78 %",
              pill: { text: "Produciendo", tone: "ok" },
            },
            {
              name: "Línea 2",
              detail: "3.110 / 6.000 u · OEE 52 %",
              pill: { text: "Parada · 14 min · Atasco en envasadora", tone: "stop" },
            },
            {
              name: "Línea 3",
              detail: "5.980 / 6.400 u · OEE 74 %",
              pill: { text: "Produciendo", tone: "ok" },
            },
          ],
        },
      ],
      foot: "OEE de la planta 68 % · Último dato hace 1 min.",
    },

    problem: [
      "El pizarrón de la línea se actualiza a mano, cuando alguien se acuerda.",
      "La luz roja avisa que algo pasa, pero no dice qué ni hace cuánto.",
      "El operario no sabe si el turno va bien hasta que termina.",
      "Cada línea muestra su número a su manera y nadie puede comparar.",
    ],
    does: [
      {
        title: "Cada línea, en vivo",
        body: "Producido contra plan, OEE y estado de cada línea en una sola pantalla. El dato sale de la máquina o de lo que carga el supervisor, y la pantalla dice cuál es.",
      },
      {
        title: "La parada, con su motivo",
        body: "Cuando una línea para, la pantalla lo muestra con el tiempo que lleva y el motivo, si ya se cargó.",
      },
      {
        title: "El OEE de la planta, bien calculado",
        body: "Se arma con los tiempos y las unidades de cada línea, no con el promedio de los porcentajes. Las líneas sin dato no entran y se dice cuántas son.",
      },
      {
        title: "Dónde se pierde",
        body: "Las estaciones que más tiempo perdieron en el turno, para saber dónde poner a la gente.",
      },
    ],
    doesNote:
      "Se ve en cualquier televisor con navegador. No hace falta instalar nada en la planta más allá de la pantalla.",

    /* El título del bloque es «Qué ves en la pantalla» y no «en InspectIA»: acá lo que se
       mira es el televisor de la planta, no la aplicación. */
    see: {
      title: "Qué ves en la pantalla",
      items: [
        "Cada línea con su estado, lo producido contra el plan y su OEE.",
        "La parada en curso, con el tiempo que lleva y su motivo.",
        "El OEE de la planta y la hora del último dato.",
        "Las estaciones que más tiempo perdieron en el turno.",
      ],
      panel: {
        title: "Dónde se pierde · turno tarde",
        blocks: [
          {
            kind: "table",
            head: ["Estación", "Línea", "Tiempo perdido", "Origen"],
            rows: [
              ["Envasadora", "Línea 2", "38 min", "detectada"],
              ["Horno", "Línea 1", "22 min", "declarada"],
              ["Llenadora", "Línea 3", "15 min", "detectada"],
            ],
          },
        ],
      },
    },

    related: [
      {
        title: "Monitoreo automático de OEE",
        body: "El dato de la máquina que alimenta la pantalla.",
        to: "/plataforma/produccion/monitoreo-automatico-de-oee",
      },
      {
        title: "Registro de paradas",
        body: "Los motivos que aparecen en la pantalla.",
        to: "/plataforma/produccion/registro-de-paradas-de-maquina",
      },
      {
        title: "Parte de producción digital",
        body: "Si no hay sensores, la pantalla toma lo que carga el supervisor.",
        to: "/plataforma/produccion/parte-de-produccion",
      },
    ],

    band: {
      title: "Lo estamos habilitando con nuestros clientes",
      body: "Dejanos tus datos y lo vemos para tu planta.",
      linkLabel: "Quiero conocerlo",
      origin: "andon",
    },

    faq: [
      {
        q: "¿Qué es un andon?",
        a: "Es una señal visual que avisa en el momento cuando una línea tiene un problema. Viene del sistema de producción de Toyota y del lean manufacturing. El andon digital reemplaza la luz y el pizarrón por una pantalla con el dato real de cada línea.",
      },
      {
        q: "¿Qué pantalla necesito?",
        a: "Cualquier televisor o monitor con navegador.",
      },
      {
        q: "¿Necesito sensores en las máquinas?",
        a: "No. Con sensores o el PLC conectado, el dato es automático. Sin ellos, la pantalla muestra lo que carga el supervisor y lo indica.",
      },
      {
        q: "¿Cómo lo activo?",
        a: "Lo estamos habilitando con cada cliente. Dejanos tus datos y lo vemos para tu planta.",
      },
    ],
    links: [
      { label: "Producción", to: "/plataforma/produccion" },
      { label: "Cómo calcular el OEE", to: "/guias/como-calcular-el-oee" },
    ],
  },

  {
    slug: "costo-por-unidad",
    module: "produccion",
    status: "a-pedido",
    requestOrigin: "costos",
    name: "Costo por unidad",
    blurb: "Cuánto te cuesta producir cada kilo o cada unidad, con datos de la planta.",
    eyebrow: "Producción · Costo por unidad",
    h1: "Costo de producción por unidad, con datos de planta",
    lead: "Cuánto te cuesta producir cada kilo o cada unidad, armado con datos de la planta y no con estándares de una planilla: los materiales a su costo de compra, las horas-hombre de cada orden valorizadas con el valor hora de cada categoría y la energía que consumió la producción del mes.",
    seoTitle: "Costo de producción por unidad: materiales, mano de obra y energía",
    seoDescription:
      "Cuánto cuesta producir cada unidad de tus productos con lo que pasó en planta: materiales, horas-hombre valorizadas y energía por kilo, período por período.",

    heroPanel: {
      title: "Galletitas 200 g · octubre",
      blocks: [
        {
          kind: "rows",
          items: [
            { name: "Materiales", value: "$ 812 por kg" },
            { name: "Mano de obra", detail: "0,021 h-h por kg", value: "$ 196 por kg" },
            { name: "Energía", detail: "0,38 kWh por kg", value: "$ 41 por kg" },
          ],
        },
        {
          kind: "rows",
          items: [
            {
              name: "Total",
              detail: "Mes anterior $ 1.012",
              value: "$ 1.049 por kg",
              pill: { text: "+3,7 %", tone: "warn" },
            },
          ],
        },
      ],
    },

    problem: [
      "El costo del producto se calculó una vez, con estándares, y nadie lo actualizó.",
      "Las horas-hombre de cada producto no se miden, se reparten.",
      "La factura de luz se prorratea a ojo entre todo lo que se hizo en el mes.",
      "Cuando sube un insumo o se paga un aumento, no se sabe cuánto pega en cada producto.",
    ],
    does: [
      {
        title: "Materiales",
        body: "El costo de compra de cada material, aplicado a la receta de cada producto.",
      },
      {
        title: "Mano de obra",
        body: "Las horas-hombre de cada orden, valorizadas con el valor hora vigente de cada categoría. Por producto se pondera por kilos producidos, no se promedia.",
      },
      {
        title: "Energía",
        body: "El consumo y el costo de la energía por kilo producido, mes a mes, con las facturas y la producción del mismo período.",
      },
      {
        title: "Sin ceros inventados",
        body: "Si falta un valor hora o un costo, el resultado dice «sin dato» en vez de mostrar cero. Así no aparece un producto más barato de lo que es.",
      },
    ],
    doesNote:
      "Los gastos indirectos (alquiler, administración, amortizaciones) no se calculan desde la planta. Si los tenés, se suman como un valor por kilo o por unidad.",

    see: {
      items: [
        "El costo de cada producto separado en materiales, mano de obra y energía.",
        "La variación contra el mes anterior.",
        "Las horas-hombre por kilo de cada producto.",
        "Los productos a los que les falta un dato, marcados como «sin dato».",
      ],
      panel: {
        title: "Costo por kilo · octubre",
        blocks: [
          {
            kind: "table",
            head: ["Producto", "Materiales", "Mano de obra", "Energía", "Total"],
            rows: [
              ["Galletitas 200 g", "$ 812", "$ 196", "$ 41", "$ 1.049"],
              ["Galletitas 500 g", "$ 790", "$ 171", "$ 38", "$ 999"],
              ["Budín 300 g", "$ 1.120", "$ 254", "$ 52", "$ 1.426"],
              ["Alfajor 50 g", "$ 980", { text: "Sin dato", tone: "neutral" }, "$ 47", "—"],
            ],
          },
        ],
      },
    },

    related: [
      {
        title: "MRP y escenarios",
        body: "El costo de lo que hay que comprar para producir un plan.",
        to: "/plataforma/produccion/mrp-y-escenarios",
      },
      {
        title: "Parte de producción digital",
        body: "De ahí salen lo producido y las horas de cada orden.",
        to: "/plataforma/produccion/parte-de-produccion",
      },
      {
        title: "Energía",
        body: "Consumo y costo por servicio, con las facturas.",
        to: "/plataforma/energia",
      },
    ],

    band: {
      title: "Lo estamos habilitando con nuestros clientes",
      body: "Dejanos tus datos y lo vemos con tu planta.",
      linkLabel: "Quiero conocerlo",
      origin: "costos",
    },

    faq: [
      {
        q: "¿Cómo se calcula el costo por unidad?",
        a: "Se suman los costos de producir en un período y se dividen por lo que se produjo. Acá se hace por componente: materiales según la receta, horas-hombre valorizadas por kilo y energía por kilo.",
      },
      {
        q: "¿Es costo estándar o costo real?",
        a: "Real: sale de lo que se produjo, de las horas que se cargaron y de la energía que se facturó en el período.",
      },
      {
        q: "¿Qué tengo que cargar?",
        a: "El costo de compra de los materiales, las categorías de mano de obra con su valor hora y las facturas de energía. Lo que falte se marca como «sin dato».",
      },
      {
        q: "¿Cómo lo activo?",
        a: "Lo estamos habilitando con cada cliente. Dejanos tus datos y lo vemos con tu planta.",
      },
    ],
    links: [
      { label: "Producción", to: "/plataforma/produccion" },
      { label: "Energía", to: "/plataforma/energia" },
    ],
  },
];

/** Por slug, para el loader de la ruta. */
export const FEATURE_BY_SLUG = new Map(FEATURES.map((f) => [f.slug, f]));

/**
 * Las funcionalidades de un módulo, para el bloque «Funcionalidades» de su página.
 *
 * Devuelve un arreglo vacío donde el módulo no tiene ninguna, y la sección no se
 * renderiza: hoy cuatro de los siete módulos no tienen.
 */
export const featuresOf = (module: ModuleKey) => FEATURES.filter((f) => f.module === module);
