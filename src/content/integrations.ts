import type { BrandLogoKey } from "./brand-logos";
import type { ProductPanelData } from "@/components/site/ProductPanel";

/**
 * El catálogo de integraciones: qué sistemas se conectan, en qué categoría y cuáles tienen
 * página propia.
 *
 * ## Qué cambió el 20/11/2026
 *
 * Antes esto era una lista de cuatro grupos con cinco nombres, para una sola página en
 * `/plataforma/integraciones`. Ahora es el catálogo del que salen seis páginas —el hub,
 * cuatro categorías y una por sistema— y la URL se mudó a `/integraciones`, con 301 desde
 * la anterior.
 *
 * **Agregar un sistema es editar datos.** Un nombre en `SYSTEMS` aparece en el hub y en la
 * grilla de su categoría sin tocar una línea de código. Si además trae `page`, gana su
 * propia URL `/integraciones/<slug>` con la misma plantilla que las demás.
 *
 * ## Los logos
 *
 * La regla anterior decía que una integración **no lleva logo** para que no se confundiera
 * con un servicio del marketplace, que sí se contrata. Esa regla se cambió el 20/11/2026
 * (ver la sección «Prueba social y logos de sistemas» de `docs/design/web-visual-rules.md`):
 * las integraciones llevan logo, en un tono y a un alto, y lo que las distingue de un
 * servicio sigue siendo que no tienen precio, ni ficha, ni botón de contratar.
 *
 * `logo` toma un glifo monocromo de `brand-logos.ts` —generado de `simple-icons`, CC0—.
 * Los demás van con el nombre en texto hasta que haya un SVG, que es lo que la regla pide.
 *
 * **BPS y Cygnus tienen su logo en el repo y van en texto igual.** Los dos archivos de
 * `public/img/partners/` son wordmarks en mapa de bits: al lado de nueve glifos monocromos
 * se leen como un error de maquetado, y además repiten el nombre que la grilla ya escribe
 * en texto a su derecha. Un símbolo acompaña a un nombre; un nombre dibujado, no. Vuelven
 * en cuanto haya un SVG de símbolo.
 *
 * **Un logo equivocado es peor que el nombre solo.** Katana quedó sin logo aunque
 * `simple-icons` tenga un slug `katana`: ese icono es el Katana de Foundry, software de
 * iluminación 3D, y no el Katana MRP de esta lista.
 */

/* ---------------------------------------------------------------------------------------
 * Tipos
 * ------------------------------------------------------------------------------------ */

export type IntegrationCategory = "erp" | "scada-plc" | "wms" | "trazabilidad";

/**
 * En qué estado está la integración con ese sistema.
 *
 * Sale de la tabla §3 de `docs/landings/seo/integraciones/00_BASE_INTEGRACIONES.md`, que
 * separa lo que funciona hoy de lo que está diseñado. La página lo dice arriba, antes de
 * cualquier promesa: una integración «por proyecto» que se presenta como disponible es
 * una expectativa que se rompe en la primera reunión técnica.
 */
export type IntegrationStatus = "disponible" | "en-construccion" | "por-proyecto";

export const STATUS_LABEL: Record<IntegrationStatus, string> = {
  disponible: "Disponible",
  "en-construccion": "En construcción",
  "por-proyecto": "Por proyecto",
};

/** Un lado de la grilla «quién es dueño de qué». */
export type OwnerSide = { title: string; items: string[] };

/**
 * Un bloque del cuerpo de una página de integración.
 *
 * Mismo criterio que los bloques de una guía (`guides.ts`): el orden importa y cada página
 * tiene una forma distinta —el hub reparte, una categoría compara, un sistema narra un
 * día— así que con campos fijos alguna quedaría con huecos y otra sin dónde poner lo suyo.
 *
 * `body` admite las dos marcas en línea de `RichText`: `**negrita**` y `[texto](/ruta)`.
 */
export type IntegrationBlock =
  /** La franja tintada con columnas. Es la única superficie de color del cuerpo. */
  | { kind: "band"; items: { title: string; body: string }[] }
  /** Quién es dueño de qué, a dos columnas, con una línea de cierre opcional. */
  | {
      kind: "pair";
      eyebrow?: string;
      title: string;
      left: OwnerSide;
      right: OwnerSide;
      note?: string;
    }
  | { kind: "table"; eyebrow?: string; title: string; head: string[]; rows: string[][] }
  /** Grilla con línea superior. Con `to`, el ítem lleva enlace con flecha. */
  | {
      kind: "grid";
      eyebrow?: string;
      title: string;
      items: { title: string; body: string; to?: string; linkLabel?: string }[];
    }
  /** Pasos numerados, con la línea de 2 px. Sin `title` en el ítem, sólo el número. */
  | { kind: "steps"; eyebrow?: string; title: string; items: { title?: string; body: string }[] }
  /** Un bloque suelto con línea superior: un párrafo, una lista, o los dos. */
  | { kind: "note"; title: string; body?: string; items?: string[] }
  /** La grilla de logos de una o varias categorías. Se arma de `SYSTEMS`. */
  | { kind: "systems"; title: string; categories: IntegrationCategory[]; grouped?: boolean };

export type IntegrationPage = {
  /** El segmento de URL dentro de `/integraciones`. */
  slug: string;
  /** Nombre corto: miga de pan, enlaces y `ItemList` del hub. */
  name: string;
  eyebrow: string;
  h1: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  status?: IntegrationStatus;
  /** El panel del producto del hero. Sólo las páginas de sistema lo traen. */
  heroPanel?: ProductPanelData;
  blocks: IntegrationBlock[];
  faq: { q: string; a: string }[];
  /** El único CTA de la página: una conversación, no una cuenta. */
  cta: { title: string; origin: string };
  /** A dónde sigue el lector. Cada destino tiene que resolver. */
  links: { label: string; to: string }[];
  /** La categoría a la que pertenece, para la miga de pan de una página de sistema. */
  category?: IntegrationCategory;
};

export type IntegrationSystem = {
  name: string;
  category: IntegrationCategory;
  /** Un glifo de `brand-logos.ts`. Sin esto, el sistema va con el nombre en texto. */
  logo?: BrandLogoKey;
  /** El slug de su página, cuando tiene una. */
  page?: string;
};

/* ---------------------------------------------------------------------------------------
 * Los sistemas
 * ------------------------------------------------------------------------------------ */

/**
 * Todos los sistemas del hub, en el orden en que los lista el contenido de dirección.
 *
 * La lista sale de `01_hub_integraciones.md`. Los que tienen `page` son los dos que ya
 * tienen material escrito; el resto espera el suyo (§5 y §6 de `00_BASE_INTEGRACIONES.md`).
 */
export const SYSTEMS: IntegrationSystem[] = [
  /* ---------- ERP ---------- */
  { name: "Odoo", category: "erp", logo: "odoo", page: "odoo" },
  { name: "Tango Gestión", category: "erp" },
  { name: "Finnegans GO", category: "erp" },
  { name: "SAP Business One", category: "erp", logo: "sap" },
  { name: "Bejerman", category: "erp" },
  { name: "DUX Software", category: "erp" },
  { name: "Contabilium", category: "erp" },
  { name: "Xubio", category: "erp" },
  { name: "Colppy", category: "erp" },
  { name: "Contagram", category: "erp" },
  { name: "BPS Digital", category: "erp" },
  { name: "devFactory", category: "erp" },
  { name: "La Pyme", category: "erp" },
  { name: "TOTVS Protheus", category: "erp", logo: "totvs" },
  { name: "Dynamics 365 Business Central", category: "erp" },
  { name: "CONTPAQi", category: "erp" },
  { name: "Bind ERP", category: "erp" },
  { name: "Alegra", category: "erp" },
  { name: "Siigo", category: "erp" },
  { name: "Defontana", category: "erp" },
  // Sin logo a propósito: el slug `katana` de simple-icons es el Katana de Foundry.
  { name: "Katana", category: "erp" },
  { name: "MRPeasy", category: "erp" },

  /* ---------- SCADA y PLC ---------- */
  { name: "Proficy iFIX", category: "scada-plc", page: "ifix" },
  { name: "Proficy CIMPLICITY", category: "scada-plc" },
  { name: "Proficy Historian", category: "scada-plc" },
  { name: "AVEVA InTouch", category: "scada-plc" },
  { name: "AVEVA Historian", category: "scada-plc" },
  { name: "AVEVA Plant SCADA", category: "scada-plc" },
  { name: "AVEVA Edge", category: "scada-plc" },
  { name: "Siemens WinCC", category: "scada-plc", logo: "siemens" },
  { name: "Rockwell FactoryTalk", category: "scada-plc", logo: "rockwellautomation" },
  { name: "Ignition", category: "scada-plc", logo: "inductiveautomation" },
  { name: "Elipse E3", category: "scada-plc" },
  { name: "Movicon.NExT", category: "scada-plc" },
  { name: "Weintek", category: "scada-plc" },
  { name: "Siemens S7 y LOGO!", category: "scada-plc", logo: "siemens" },
  { name: "Schneider Modicon", category: "scada-plc", logo: "schneiderelectric" },
  { name: "Kepware", category: "scada-plc" },
  { name: "Node-RED", category: "scada-plc", logo: "nodered" },
  { name: "OPC UA", category: "scada-plc" },
  { name: "Modbus TCP", category: "scada-plc" },
  { name: "MQTT", category: "scada-plc", logo: "mqtt" },

  /* ---------- WMS ---------- */
  { name: "Cygnus", category: "wms" },
  { name: "Mecalux Easy WMS", category: "wms" },
  { name: "DigipWMS", category: "wms" },
  { name: "Plexor", category: "wms" },
  { name: "Aurora WMS", category: "wms" },
  { name: "Dettron", category: "wms" },
  { name: "Logiwa", category: "wms" },
  { name: "Odoo Inventario", category: "wms", logo: "odoo" },

  /* ---------- Trazabilidad, datos y asistencia ---------- */
  { name: "GS1 / EPCIS 2.0", category: "trazabilidad" },
  { name: "GS1 TrazAR", category: "trazabilidad" },
  { name: "TRAZAL", category: "trazabilidad" },
  { name: "Trazalog", category: "trazabilidad" },
  { name: "Teramot", category: "trazabilidad" },
  { name: "CrossChex Cloud", category: "trazabilidad" },
];

export const systemsOf = (category: IntegrationCategory) =>
  SYSTEMS.filter((s) => s.category === category);

/** Los sistemas con página propia, para el `ItemList` del hub y para el sitemap. */
export const systemsWithPage = () => SYSTEMS.filter((s) => s.page);

/* ---------------------------------------------------------------------------------------
 * El hub
 * ------------------------------------------------------------------------------------ */

const CATEGORY_LABEL: Record<IntegrationCategory, string> = {
  erp: "ERP",
  "scada-plc": "SCADA y PLC",
  wms: "WMS",
  trazabilidad: "Trazabilidad, datos y asistencia",
};

export const categoryLabel = (c: IntegrationCategory) => CATEGORY_LABEL[c];

export const HUB: IntegrationPage = {
  slug: "",
  name: "Integraciones",
  eyebrow: "Integraciones",
  h1: "Integraciones con tu ERP, tu SCADA y tu depósito",
  lead: "InspectIA trabaja con lo que la planta ya tiene. Toma los productos, las recetas y los planes del ERP; lee las máquinas desde el SCADA o el PLC, sin tocar su programa; y devuelve lo que pasó en la planta: producción real, lotes, consumos y paradas.",
  seoTitle: "Integraciones: InspectIA con tu ERP, SCADA, PLC y WMS",
  seoDescription:
    "InspectIA toma datos de tu ERP, tu SCADA, tu PLC o tu WMS y les devuelve lo que pasó en la planta. Cómo es cada integración, sistema por sistema.",
  blocks: [
    {
      kind: "band",
      items: [
        {
          title: "Tu ERP manda en el plan.",
          body: "Productos, listas de materiales, órdenes de producción, pedidos y compras se cargan en el ERP y entran solos a InspectIA.",
        },
        {
          title: "Tus máquinas mandan en el dato.",
          body: "Estado, contadores, velocidad y alarmas salen del SCADA o del PLC, siempre en sólo lectura.",
        },
        {
          title: "InspectIA manda en la ejecución.",
          body: "Lo producido, el scrap, el lote, el consumo por lote y cada parada con su causa vuelven al ERP.",
        },
      ],
    },
    {
      kind: "systems",
      title: "Con qué sistemas trabaja",
      categories: ["erp", "scada-plc", "wms", "trazabilidad"],
      grouped: true,
    },
    {
      kind: "grid",
      eyebrow: "Cómo se conecta",
      title: "Cómo se conecta, por tipo de sistema",
      items: [
        {
          title: "ERP",
          body: "Por la API del ERP, desde la nube. Si el ERP no tiene API, por archivo o por una tabla intermedia. Si no tiene módulo de producción, la producción vuelve como movimientos de stock.",
          to: "/integraciones/erp",
          linkLabel: "Ver la integración con ERP",
        },
        {
          title: "SCADA y PLC",
          body: "Un equipo en la red de planta lee el SCADA o el PLC por OPC UA, Modbus TCP o MQTT, en sólo lectura, y manda los eventos cifrados a la nube. Si se corta Internet, los guarda y los manda después.",
          to: "/integraciones/scada-plc",
          linkLabel: "Ver la integración con SCADA y PLC",
        },
        {
          title: "WMS",
          body: "InspectIA es el depósito de la planta y el WMS es el centro de distribución. El producto terminado pasa con su lote y su vencimiento.",
          to: "/integraciones/wms",
          linkLabel: "Ver la integración con WMS",
        },
        {
          title: "Trazabilidad",
          body: "InspectIA aporta lo que pasa adentro de la planta: qué lotes de materia prima se transformaron en qué lote de producto. En el estándar GS1 EPCIS 2.0 cuando el otro sistema lo usa.",
          to: "/integraciones/trazabilidad",
          linkLabel: "Ver la integración de trazabilidad",
        },
      ],
    },
    {
      kind: "note",
      title: "Si tu sistema no está",
      body: "InspectIA recibe y entrega datos con un formato propio y documentado, por API o por archivo. Cualquier sistema que pueda leer o escribir ese formato se conecta sin un conector específico.",
    },
  ],
  faq: [
    {
      q: "¿Hace falta tocar el PLC o el SCADA?",
      a: "No. Se lee en sólo lectura: no se cambia el programa del PLC ni la configuración del SCADA.",
    },
    {
      q: "¿Qué pasa si se corta Internet?",
      a: "El equipo de planta guarda los eventos y los manda cuando vuelve la conexión. InspectIA acepta eventos de hasta 7 días hacia atrás y no los duplica si llegan dos veces.",
    },
    {
      q: "¿Quién es dueño de cada dato?",
      a: "El ERP, de los productos, las recetas, los planes y los pedidos. InspectIA, de lo que pasa en planta. Cada dato tiene un solo dueño y el otro sistema lo refleja.",
    },
    {
      q: "¿Y si tengo un ERP sin módulo de producción?",
      a: "La producción vuelve como movimientos de stock: entra el producto terminado y sale la materia prima consumida.",
    },
    {
      q: "¿Mi sistema no está en la lista?",
      a: "Se conecta con el formato de intercambio de InspectIA, por API o por archivo.",
    },
  ],
  cta: { title: "¿Usás otro sistema? Contanos y armamos la integración", origin: "integraciones" },
  links: [
    { label: "Producción", to: "/plataforma/produccion" },
    { label: "Stock", to: "/plataforma/stock" },
    { label: "Trazabilidad", to: "/plataforma/trazabilidad" },
    {
      label: "Monitoreo automático de OEE",
      to: "/plataforma/produccion/monitoreo-automatico-de-oee",
    },
  ],
};

/* ---------------------------------------------------------------------------------------
 * Las categorías
 * ------------------------------------------------------------------------------------ */

export const CATEGORY_PAGES: IntegrationPage[] = [
  {
    slug: "erp",
    name: "ERP",
    eyebrow: "Integraciones · ERP",
    h1: "Integración con tu ERP: el plan entra solo y lo producido vuelve",
    lead: "El ERP sabe qué hay que producir; la planta sabe qué se produjo. InspectIA los une: toma del ERP los productos, las recetas, las órdenes y los pedidos, y le devuelve la producción real, el scrap, el lote y lo que se consumió de cada materia prima.",
    seoTitle: "Integración con ERP: el plan entra solo y la producción vuelve",
    seoDescription:
      "Conectá tu ERP con la planta: productos, recetas, órdenes y pedidos entran a InspectIA, y la producción real, los lotes y los consumos vuelven al ERP.",
    blocks: [
      {
        kind: "pair",
        eyebrow: "Quién manda en qué",
        title: "Quién es dueño de qué",
        left: {
          title: "El ERP",
          items: [
            "Productos, listas de materiales, órdenes de producción, pedidos de clientes, compras y stock de los depósitos que administra.",
          ],
        },
        right: {
          title: "InspectIA",
          items: [
            "Producción real por orden, scrap, lote producido, consumo de materia prima por lote, paradas con su causa.",
          ],
        },
        note: "Lo que maneja el ERP se ve en InspectIA con la etiqueta de su origen y se corrige en el ERP. Así no hay dos versiones del mismo dato.",
      },
      {
        kind: "table",
        title: "Qué viaja en cada sentido",
        head: ["Del ERP a InspectIA", "De InspectIA al ERP"],
        rows: [
          [
            "Productos: materia prima, intermedio y terminado, con unidad y control de lote",
            "Producción por orden, parcial o total",
          ],
          ["Listas de materiales", "Cantidad buena y scrap"],
          ["Centros de trabajo, asociados a líneas", "Lote del producto terminado"],
          ["Órdenes de producción confirmadas", "Consumo de materia prima por lote"],
          ["Stock por depósito, ubicación y lote", "Paradas con causa, si el ERP las registra"],
          ["Pedidos de clientes y órdenes de compra", ""],
        ],
      },
      {
        kind: "grid",
        eyebrow: "Formas de conectarse",
        title: "Tres formas de conectarse",
        items: [
          {
            title: "Por la API del ERP",
            body: "Desde la nube, con un usuario de integración. Odoo, Finnegans, SAP Business One, DUX, Contabilium, Bind, Katana y otros.",
          },
          {
            title: "Por archivo o tabla intermedia",
            body: "Para ERPs sin API o instalados en un servidor propio: Tango sin API habilitada, Bejerman, Contagram. Se acuerda un archivo o una vista y se intercambia con el mismo formato.",
          },
          {
            title: "Sin módulo de producción",
            body: "Si el ERP no registra producción (DUX, Contabilium, Alegra, Siigo), lo producido vuelve como movimientos de stock: entra el terminado y sale la materia prima.",
          },
        ],
      },
      {
        kind: "steps",
        eyebrow: "Cómo funciona",
        title: "Cómo funciona por dentro",
        items: [
          {
            title: "Conectar",
            body: "Se carga la credencial del ERP y se prueba la conexión. InspectIA detecta qué módulos tiene el ERP y muestra sólo lo que se puede sincronizar.",
          },
          {
            title: "Asociar",
            body: "Centros de trabajo con líneas, depósitos con depósitos, categorías de parada con las del ERP.",
          },
          {
            title: "Elegir qué viaja",
            body: "Cada dato se activa por separado y en cada sentido. Lo que ya estaba cargado en InspectIA se vincula por código; los conflictos quedan listados y no se pisan.",
          },
          {
            title: "Sincronizar",
            body: "El ERP se consulta cada cierto tiempo y lo producido sale cuando se cierra la producción. Reenviar no duplica nada. Cada intercambio queda en una bitácora con lo que entró, lo que salió y lo que falló.",
          },
        ],
      },
      { kind: "systems", title: "Los ERP de la lista", categories: ["erp"] },
    ],
    faq: [
      {
        q: "¿Tengo que cargar los productos dos veces?",
        a: "No. Entran del ERP. Si ya había productos en InspectIA, se vinculan por código.",
      },
      {
        q: "¿Qué pasa si cambian una orden en el ERP?",
        a: "Se actualiza en InspectIA. Si la orden ya tiene producción declarada, no se borra nada y queda un aviso.",
      },
      {
        q: "¿Y si el ERP rechaza lo que le mando?",
        a: "El cierre en InspectIA queda hecho y el envío queda «con error», con el mensaje del ERP. Se corrige y se reintenta.",
      },
      /* Falta la pregunta «¿Cada cuánto se sincroniza?». La respuesta del archivo de
         contenido traía un [DATO A COMPLETAR] —la frecuencia por defecto es la pregunta
         abierta 3 del PRD de integraciones— y una página no publica un dato a completar.
         Vuelve cuando dirección fije la frecuencia. */
      {
        q: "¿Y mientras no esté la integración?",
        a: "El plan y los productos se cargan por planilla, con una plantilla para descargar.",
      },
    ],
    cta: {
      title: "¿Usás otro ERP? Contanos cuál y armamos la integración",
      origin: "integracion-erp",
    },
    links: [
      { label: "Todas las integraciones", to: "/integraciones" },
      { label: "Plan de producción", to: "/plataforma/produccion/plan-de-produccion" },
      { label: "MRP y escenarios", to: "/plataforma/produccion/mrp-y-escenarios" },
      { label: "Stock", to: "/plataforma/stock" },
    ],
  },

  {
    slug: "scada-plc",
    name: "SCADA y PLC",
    eyebrow: "Integraciones · SCADA y PLC",
    h1: "OEE desde tu SCADA o tu PLC, sin tocar su programa",
    lead: "Si la máquina ya está automatizada, el dato está: en el SCADA, en el historiador o en el PLC. InspectIA lo lee en sólo lectura y lo convierte en OEE, paradas con su causa y producción por orden, sin cambiar una línea de programa ni una pantalla del SCADA.",
    seoTitle: "OEE desde tu SCADA o tu PLC, en sólo lectura",
    seoDescription:
      "Leemos estado, contadores y alarmas de tu SCADA o tu PLC por OPC UA, Modbus TCP o MQTT, sin tocar su programa, y calculamos el OEE y las paradas en vivo.",
    blocks: [
      {
        kind: "table",
        eyebrow: "Qué se lee",
        title: "Qué se lee de cada máquina",
        head: ["Señal", "Para qué"],
        rows: [
          [
            "Contador de piezas buenas",
            "Producción y rendimiento contra el tiempo ideal del producto",
          ],
          ["Contador de rechazo", "Calidad"],
          ["Estado: marcha, parada, falla, sin material", "Disponibilidad y paradas"],
          ["Código de alarma o de parada", "La causa de la parada, asociada a una categoría"],
          ["Velocidad real y nominal", "Pérdida de ritmo"],
          ["Orden o producto activo", "A qué orden va cada pieza"],
          ["Señal de vida", "Distinguir máquina parada de dato caído"],
        ],
      },
      {
        kind: "grid",
        eyebrow: "Formas de leer",
        title: "Cuatro formas de leer",
        items: [
          {
            title: "OPC UA",
            body: "El equipo de planta se conecta al servidor OPC UA del SCADA o del PLC con un usuario de sólo lectura. Sirve para iFIX, WinCC, InTouch, FactoryTalk, Ignition, Elipse, Siemens S7-1500 y la mayoría de los equipos actuales.",
          },
          {
            title: "Modbus TCP",
            body: "Para PLCs sin OPC UA: Modicon, PLCs chicos. Sólo con funciones de lectura, en una red separada y con una única conexión.",
          },
          {
            title: "MQTT o Sparkplug B",
            body: "Si el SCADA o el HMI ya publican MQTT (Ignition, AVEVA Edge, Weintek), InspectIA recibe los datos sin un equipo extra.",
          },
          {
            title: "Historiador",
            body: "Proficy Historian o AVEVA Historian, por su API REST, para recuperar datos históricos.",
          },
        ],
      },
      {
        kind: "steps",
        eyebrow: "Cómo viaja el dato",
        title: "Cómo viaja el dato",
        items: [
          {
            title: "El equipo lee",
            body: "Un equipo en la red de planta lee las señales cada pocos segundos. No escribe nada.",
          },
          {
            title: "Convierte en eventos",
            body: "Cada pieza o ciclo es un evento con su hora, sus unidades buenas y rechazadas, y un identificador único.",
          },
          {
            title: "Manda cifrado",
            body: "Los eventos van por HTTPS con una credencial por estación. Si se corta Internet, el equipo los guarda y los manda cuando vuelve, en orden. InspectIA acepta hasta 7 días hacia atrás y no duplica un evento que llega dos veces.",
          },
          {
            title: "InspectIA calcula",
            body: "Si entre dos eventos pasa más tiempo que el umbral del producto, se registra una parada pendiente de motivo. Si hay código de alarma, el motivo sale de la asociación con su categoría. El rendimiento se calcula contra el tiempo ideal del producto y la calidad, con los rechazos.",
          },
        ],
      },
      { kind: "systems", title: "Los sistemas de la lista", categories: ["scada-plc"] },
    ],
    faq: [
      {
        q: "¿Hay que tocar el PLC o el SCADA?",
        a: "No. Se lee en sólo lectura. Lo que puede hacer falta es habilitar el servidor OPC UA del SCADA, que en algunas versiones tiene licencia aparte.",
      },
      {
        q: "¿Qué pasa si se corta Internet?",
        a: "El equipo guarda los eventos y los manda en orden cuando vuelve. InspectIA acepta hasta 7 días hacia atrás.",
      },
      {
        q: "¿Se expone el PLC a Internet?",
        a: "No. El equipo de planta sale hacia la nube por HTTPS; nadie entra a la red de la planta desde afuera.",
      },
      {
        q: "¿Qué necesito para empezar?",
        a: "La lista de variables (tags) de cada línea, que suele tener el integrador, y una salida a Internet para el equipo.",
      },
      {
        q: "¿Y si mi integrador ya tiene un gateway?",
        a: "Si ya hay Kepware, Ignition Edge o Node-RED, InspectIA toma los datos de ahí.",
      },
      {
        q: "¿Y si la máquina no tiene PLC?",
        a: "Un sensor de contacto con un ESP32 manda cada pieza por WiFi, o el operario carga la producción en una tablet. Ver [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee).",
      },
    ],
    cta: {
      title: "¿Qué SCADA o PLC tenés? Contanos y relevamos las variables",
      origin: "integracion-scada",
    },
    links: [
      { label: "Todas las integraciones", to: "/integraciones" },
      {
        label: "Monitoreo automático de OEE",
        to: "/plataforma/produccion/monitoreo-automatico-de-oee",
      },
      { label: "Registro de paradas", to: "/plataforma/produccion/registro-de-paradas-de-maquina" },
      { label: "Andon digital", to: "/plataforma/produccion/andon-digital" },
      { label: "Cómo calcular el OEE", to: "/guias/como-calcular-el-oee" },
    ],
  },

  {
    slug: "wms",
    name: "WMS",
    eyebrow: "Integraciones · WMS",
    h1: "Integración con tu WMS: el terminado llega al centro de distribución con su lote",
    lead: "La planta y el centro de distribución tienen depósitos distintos. InspectIA lleva el de la planta: materia prima, consumo por lote, producto terminado. Tu WMS lleva el centro de distribución. Lo que sale de la línea llega al WMS con su lote, su vencimiento y su cantidad, listo para recibir.",
    seoTitle: "Integración con WMS: de la línea al centro de distribución",
    seoDescription:
      "InspectIA lleva el depósito de la planta y tu WMS el centro de distribución. El producto terminado pasa con lote, vencimiento y cantidad, sin recargarlo.",
    blocks: [
      {
        kind: "pair",
        eyebrow: "Quién lleva qué",
        title: "Quién lleva qué",
        left: {
          title: "InspectIA, en la planta",
          items: [
            "Recepción de materia prima con lote, posiciones, consumo contra la orden, ingreso del terminado, despacho.",
          ],
        },
        right: {
          title: "El WMS, en el centro de distribución",
          items: ["Recepción, ubicación, preparación de pedidos y despacho a clientes."],
        },
      },
      {
        kind: "table",
        title: "Qué viaja",
        head: ["De InspectIA al WMS", "Del WMS a InspectIA"],
        rows: [
          [
            "Producto terminado con lote, vencimiento y cantidad, para su recepción",
            "Stock por lote y ubicación del centro de distribución",
          ],
          [
            "Consumos de materia prima, si el WMS administra ese depósito",
            "Confirmación de recepción",
          ],
        ],
      },
      {
        kind: "grid",
        eyebrow: "Formas de conectarse",
        title: "Tres formas de conectarse",
        items: [
          { title: "API del WMS", body: "DigipWMS, Dettron, Logiwa, Katana." },
          { title: "Middleware del proveedor", body: "Cygnus, por Hermes AC." },
          {
            title: "Archivo o tabla intermedia",
            body: "Mecalux Easy WMS y WMS instalados en servidor propio: CSV o XML por un directorio compartido.",
          },
        ],
      },
      {
        kind: "steps",
        eyebrow: "Un recorrido",
        title: "Un recorrido",
        items: [
          {
            body: "Cierra la orden en la línea: entran 1.200 cajas del lote PT-2611-014 al depósito de la planta.",
          },
          { body: "Sale el despacho al centro de distribución con lote, vencimiento y cantidad." },
          { body: "El WMS recibe la recepción ya cargada y la confirma." },
          {
            body: "Si después hay un retiro de producto, la trazabilidad muestra en qué ubicación del centro de distribución está cada caja de ese lote.",
          },
        ],
      },
      { kind: "systems", title: "Los WMS de la lista", categories: ["wms"] },
    ],
    faq: [
      {
        q: "¿InspectIA reemplaza a mi WMS?",
        a: "No en el centro de distribución. InspectIA lleva el depósito de la planta, que es donde un WMS de distribución no llega: el consumo contra la orden y el ingreso del terminado.",
      },
      {
        q: "¿Qué pasa con el lote?",
        a: "Viaja con el producto, con el vencimiento. Así la trazabilidad sigue del otro lado.",
      },
      {
        q: "¿Y si mi WMS no tiene API?",
        a: "Se intercambia un archivo con un formato acordado, por un directorio compartido.",
      },
    ],
    cta: { title: "¿Qué WMS usás? Contanos y vemos la integración", origin: "integracion-wms" },
    links: [
      { label: "Todas las integraciones", to: "/integraciones" },
      { label: "WMS para fábricas", to: "/plataforma/stock/wms-para-fabricas" },
      { label: "Trazabilidad", to: "/plataforma/trazabilidad" },
    ],
  },

  {
    slug: "trazabilidad",
    name: "Trazabilidad",
    eyebrow: "Integraciones · Trazabilidad",
    h1: "Trazabilidad GS1: lo que pasa adentro de la planta, en el estándar",
    lead: "La trazabilidad se corta muchas veces en la planta: se sabe qué entró y qué salió, pero no qué lote de materia prima terminó en qué lote de producto. InspectIA registra ese paso y lo comparte con otros sistemas en el estándar de GS1, para que la cadena siga completa.",
    seoTitle: "Trazabilidad GS1: los eventos de tu planta en EPCIS 2.0",
    seoDescription:
      "InspectIA registra qué lotes de materia prima se transformaron en qué lote de producto, y lo comparte con el estándar GS1 EPCIS 2.0 con GTIN y GLN.",
    blocks: [
      {
        kind: "table",
        eyebrow: "Qué aporta",
        title: "Qué aporta InspectIA a la cadena",
        head: ["En la planta", "Evento"],
        rows: [
          ["Recepción de materia prima con su lote", "Evento de objeto, paso «recepción»"],
          [
            "Producción: qué lotes de materia prima generaron qué lote de producto, en qué línea y cuándo",
            "Evento de transformación",
          ],
          ["Movimiento entre depósitos", "Evento de objeto, paso «almacenamiento» o «transporte»"],
          ["Despacho a cliente con lote", "Evento de objeto, paso «envío»"],
        ],
      },
      {
        kind: "note",
        title: "Qué es EPCIS",
        body: "EPCIS es el estándar de GS1 para intercambiar eventos de trazabilidad: qué producto, dónde, cuándo y por qué. Desde la versión 2.0 se intercambia en JSON por API REST. Un sistema que lo usa puede recibir los eventos de InspectIA sin un desarrollo a medida.",
      },
      {
        kind: "note",
        title: "Identificadores",
        body: "GTIN para cada producto y GLN para cada lugar, cuando la empresa los tiene. Si no, se usan los códigos internos de InspectIA.",
      },
      { kind: "systems", title: "Los sistemas de la lista", categories: ["trazabilidad"] },
    ],
    faq: [
      {
        q: "¿Necesito códigos GS1 para usar la trazabilidad?",
        a: "No. La trazabilidad por lote funciona con los códigos internos. Los GTIN y GLN hacen falta para intercambiar eventos con otros sistemas en el estándar.",
      },
      {
        q: "¿Qué pasa en un retiro de producto?",
        a: "Con el lote del producto se ve hacia atrás qué lotes de materia prima se usaron y hacia adelante a qué clientes se despachó. Ver la guía de [retiro de lotes](/guias/retiro-de-lotes).",
      },
      {
        q: "¿El código de lote sirve para GS1?",
        a: "Sí. El código de lote de InspectIA tiene hasta 20 caracteres, sin caracteres ambiguos, que es lo que admite el identificador de lote de GS1 (AI 10). Entra tal cual en una etiqueta GS1-128. Hoy las etiquetas que imprime InspectIA son QR de posiciones y contenedores; no imprime GS1-128.",
      },
    ],
    cta: {
      title: "¿Trabajás con GS1 o con otro sistema de trazabilidad? Contanos",
      origin: "integracion-trazabilidad",
    },
    links: [
      { label: "Todas las integraciones", to: "/integraciones" },
      {
        label: "Trazabilidad alimentaria",
        to: "/plataforma/trazabilidad/trazabilidad-alimentaria",
      },
      { label: "Retiro de lotes", to: "/guias/retiro-de-lotes" },
    ],
  },
];

/* ---------------------------------------------------------------------------------------
 * Las páginas de sistema
 * ------------------------------------------------------------------------------------ */

export const SYSTEM_PAGES: IntegrationPage[] = [
  {
    slug: "odoo",
    name: "Odoo",
    category: "erp",
    status: "en-construccion",
    eyebrow: "Integraciones · ERP · Odoo",
    h1: "InspectIA y Odoo: la producción real vuelve sola a tu Odoo",
    lead: "Odoo planifica: tiene los productos, las listas de materiales y las órdenes de fabricación. InspectIA mide lo que pasa en la línea: cuánto se produjo, cuánto se descartó, qué lote salió, qué lote de materia prima se consumió y cuánto tiempo estuvo parada cada máquina. Conectados, la orden nace en Odoo y vuelve cerrada con lo que pasó de verdad.",
    seoTitle: "Odoo y OEE: la producción real de tu planta vuelve a Odoo",
    seoDescription:
      "Las órdenes de fabricación de Odoo entran a InspectIA y vuelven con lo producido, el scrap, el lote, los consumos por lote y las paradas. Odoo 16 a 19.",
    heroPanel: {
      title: "Orden WH/MO/00012",
      blocks: [
        {
          kind: "rows",
          items: [
            { name: "Origen", value: "Odoo" },
            { name: "Producto", value: "Galletitas 200 g" },
            { name: "Plan", value: "4.800 u" },
            { name: "Producido", value: "4.620 u" },
            { name: "Scrap", value: "85 u" },
            {
              name: "Lote PT-2611-014",
              pill: { text: "Enviado a Odoo", tone: "ok" },
            },
          ],
        },
      ],
      foot: "Consumos por lote enviados: Harina 000 · lote H-1029 · 1.150 kg.",
    },
    blocks: [
      {
        kind: "pair",
        eyebrow: "Quién manda en qué",
        title: "Quién es dueño de qué",
        left: {
          title: "Odoo",
          items: [
            "Productos, listas de materiales, centros de trabajo, órdenes de fabricación, stock, pedidos de venta y compras.",
          ],
        },
        right: {
          title: "InspectIA",
          items: [
            "Lo producido por orden, el scrap, el lote del terminado, el consumo por lote y las paradas con su causa.",
          ],
        },
        note: "Lo que viene de Odoo se ve en InspectIA con la etiqueta «Odoo» y se corrige en Odoo.",
      },
      {
        kind: "table",
        eyebrow: "Qué entra",
        title: "Qué toma InspectIA de Odoo",
        head: ["Dato", "Modelo de Odoo"],
        rows: [
          [
            "Productos: materia prima, intermedio, terminado, con unidad y control de lote",
            "`product.product`",
          ],
          ["Listas de materiales", "`mrp.bom`, `mrp.bom.line`"],
          ["Centros de trabajo, asociados a líneas o máquinas", "`mrp.workcenter`"],
          ["Órdenes de fabricación confirmadas, con cantidad, fechas y receta", "`mrp.production`"],
          ["Stock por ubicación y lote", "`stock.quant`, `stock.location`, `stock.lot`"],
          ["Pedidos de venta", "`sale.order`"],
          ["Pedidos de compra", "`purchase.order`"],
        ],
      },
      {
        kind: "table",
        eyebrow: "Qué vuelve",
        title: "Qué le devuelve InspectIA a Odoo",
        head: ["Dato", "Dónde queda en Odoo"],
        rows: [
          [
            "Producción por orden, parcial o total, buena y scrap",
            "En la orden de fabricación (`mrp.production`) y sus movimientos de stock",
          ],
          ["Lote del producto terminado", "En la orden, como lote producido"],
          ["Consumo de materia prima por lote", "En los movimientos de consumo de la orden"],
          [
            "Paradas con causa",
            "En la productividad del centro de trabajo, con su tipo de pérdida (`mrp.workcenter.productivity`)",
          ],
        ],
      },
      {
        kind: "steps",
        eyebrow: "Cómo se conecta",
        title: "Cómo se conecta",
        items: [
          {
            title: "Cargar la conexión",
            body: "URL de Odoo, base, usuario de integración y clave de API. InspectIA prueba la conexión, detecta la versión y muestra qué módulos tiene: Manufactura, Inventario, Ventas, Compras.",
          },
          {
            title: "Asociar",
            body: "Cada centro de trabajo con una línea, cada ubicación con un depósito o posición, y cada categoría de parada de InspectIA con un tipo de pérdida de Odoo.",
          },
          {
            title: "Elegir qué viaja",
            body: "Cada dato se activa por separado y en cada sentido. Los productos que ya estaban en InspectIA se vinculan por código; los que tienen el mismo código y distinta unidad quedan listados y no se pisan.",
          },
          {
            title: "Primera sincronización",
            body: "Desde ahí, InspectIA consulta los cambios de Odoo cada cierto tiempo y envía lo producido al cerrar cada producción.",
          },
        ],
      },
      {
        kind: "steps",
        eyebrow: "Un día con los dos conectados",
        title: "Un día con los dos conectados",
        items: [
          {
            body: "**06:00** — En Odoo se confirma la orden WH/MO/00012: 4.800 paquetes de Galletitas 200 g en el centro de trabajo «Línea 1». En la siguiente sincronización aparece en InspectIA como plan de la Línea 1, con su receta.",
          },
          {
            body: "**06:10 a 13:40** — La línea produce. El dato sale del sensor o de la carga del supervisor. Hay una parada de 18 minutos por cambio de formato, que el supervisor clasifica con su motivo.",
          },
          {
            body: "**13:45** — El supervisor cierra la producción: 4.620 buenos, 85 de scrap, lote PT-2611-014, y se consumió harina del lote H-1029.",
          },
          {
            body: "**13:46** — InspectIA envía el cierre a Odoo. La orden queda con lo producido, el lote y los consumos por lote. La parada queda registrada en el centro de trabajo con su tipo de pérdida. Si el envío se repite por un reintento, Odoo no lo cuenta dos veces.",
          },
          {
            body: "**Si Odoo rechaza el envío** (por ejemplo, porque falta stock del lote declarado), el cierre en InspectIA queda hecho y la bitácora muestra el mensaje de Odoo en castellano, con la opción de reintentar.",
          },
        ],
      },
      {
        kind: "grid",
        eyebrow: "Requisitos",
        title: "Qué tiene que tener la empresa",
        items: [
          {
            title: "Versión",
            body: "Odoo 16, 17, 18 o 19. Desde la 19 se usa la API JSON-2; de la 16 a la 18, JSON-RPC. InspectIA elige sola según la versión.",
          },
          {
            title: "Plan",
            body: "En Odoo Online, el plan Custom, porque la API externa no está en los planes One App Free ni Standard. En Odoo.sh o en una instalación propia, acceso a la API.",
          },
          {
            title: "Usuario de integración",
            body: "Con su clave de API. Las claves de Odoo duran como máximo 3 meses: InspectIA avisa antes de que venzan.",
          },
          {
            title: "Módulos",
            body: "Manufactura e Inventario para órdenes y lotes; Ventas y Compras si se quieren traer pedidos.",
          },
        ],
      },
      {
        kind: "note",
        title: "Odoo ya calcula OEE: ¿qué suma InspectIA?",
        body: "Odoo calcula un OEE con los tiempos que se cargan a mano en sus órdenes de trabajo. InspectIA mide en la planta: con el operario en una tablet, con un sensor, desde el PLC o desde el SCADA. Detecta las paradas solas, separa lo planificado de lo que no y devuelve el resultado a Odoo. Odoo sigue siendo el sistema de gestión y recibe el dato real.",
      },
    ],
    faq: [
      {
        q: "¿Funciona con Odoo Community?",
        a: "Sí, en instalación propia u Odoo.sh, con acceso a la API.",
      },
      {
        q: "¿Qué API de Odoo usa?",
        a: "JSON-2 desde la versión 19 y JSON-RPC de la 16 a la 18. JSON-RPC está deprecada y Odoo la retira en la 22; InspectIA la tiene aislada para pasar a JSON-2 cuando el cliente actualice.",
      },
      {
        q: "¿Puedo cerrar una orden en partes?",
        a: "Sí. Un cierre parcial se registra en Odoo y la orden sigue abierta.",
      },
      {
        q: "¿Qué pasa si modifico o cancelo la orden en Odoo?",
        a: "Se actualiza o se cancela en InspectIA. Si ya tenía producción declarada, no se borra nada y queda un aviso.",
      },
      {
        q: "¿Y un centro de trabajo que no asocié?",
        a: "Sus órdenes quedan en una bandeja «sin línea asignada», no se pierden.",
      },
      /* Falta «¿Cada cuánto se sincroniza?»: su respuesta traía un [DATO A COMPLETAR] con
         la frecuencia por defecto, que es la pregunta abierta 3 del PRD. */
      {
        q: "¿Mis credenciales quedan guardadas?",
        a: "Cifradas, y nunca se muestran ni aparecen en la bitácora.",
      },
    ],
    cta: {
      title: "¿Usás Odoo? Contanos tu versión y armamos la integración",
      origin: "integracion-odoo",
    },
    links: [
      { label: "Integración con ERP", to: "/integraciones/erp" },
      { label: "Plan de producción", to: "/plataforma/produccion/plan-de-produccion" },
      { label: "Parte de producción", to: "/plataforma/produccion/parte-de-produccion" },
      { label: "Registro de paradas", to: "/plataforma/produccion/registro-de-paradas-de-maquina" },
      {
        label: "Trazabilidad alimentaria",
        to: "/plataforma/trazabilidad/trazabilidad-alimentaria",
      },
    ],
  },

  {
    slug: "ifix",
    name: "Proficy iFIX",
    category: "scada-plc",
    status: "por-proyecto",
    eyebrow: "Integraciones · SCADA · Proficy iFIX",
    h1: "InspectIA y Proficy iFIX: el OEE de cada línea, sin tocar el SCADA",
    lead: "iFIX ya ve cada máquina: si está en marcha, cuántas piezas lleva, qué alarma saltó. InspectIA lee esos datos del servidor OPC UA de iFIX, en sólo lectura, y los convierte en OEE, paradas con su causa y producción por orden, sin cambiar pantallas, scripts ni el programa del PLC.",
    seoTitle: "Proficy iFIX y OEE: datos del SCADA a la nube por OPC UA",
    seoDescription:
      "Leemos tu iFIX en sólo lectura por su servidor OPC UA: estado, contadores y alarmas de cada máquina se convierten en OEE y paradas con causa.",
    heroPanel: {
      title: "Horno 2 · desde iFIX",
      blocks: [
        {
          kind: "rows",
          items: [
            { name: "HORNO2.ESTADO", detail: "Estado", value: "Marcha" },
            { name: "HORNO2.CONT_OK", detail: "Piezas buenas", value: "18.420" },
            { name: "HORNO2.CONT_RECH", detail: "Rechazo", value: "312" },
            { name: "HORNO2.ALARMA", detail: "Código 14", value: "Falta de material" },
          ],
        },
      ],
      foot: "Leído por OPC UA · sólo lectura · último dato hace 3 s.",
    },
    blocks: [
      {
        kind: "pair",
        eyebrow: "Quién hace qué",
        title: "Quién hace qué",
        left: {
          title: "iFIX sigue a cargo de",
          items: [
            "El control de la planta, las pantallas del operador, las alarmas y el historial del SCADA.",
          ],
        },
        right: {
          title: "InspectIA suma",
          items: [
            "OEE por línea, turno y orden; paradas con su causa; producción contra plan; reportes y avisos fuera de la sala de control.",
          ],
        },
      },
      {
        kind: "table",
        eyebrow: "Qué se lee",
        title: "Qué toma InspectIA de iFIX",
        head: ["Qué hay en iFIX", "Qué es en InspectIA"],
        rows: [
          [
            "Tag de estado (entero o bits de marcha, parada, falla, sin material, mantenimiento)",
            "Estado de máquina: disponibilidad y paradas",
          ],
          [
            "Contador de piezas buenas (acumulativo)",
            "Producción y rendimiento contra el tiempo ideal del producto",
          ],
          ["Contador de rechazo", "Calidad"],
          ["Velocidad real y nominal", "Pérdida de ritmo"],
          [
            "Código de alarma activa, o alarmas en la base SQL por Alarm ODBC",
            "Causa de la parada, asociada a una categoría",
          ],
          ["Orden, producto o receta activa", "A qué orden va cada pieza"],
          ["Señal de vida", "Distinguir máquina parada de dato caído"],
        ],
      },
      {
        kind: "note",
        title: "Qué le envía InspectIA a iFIX",
        body: "Nada. La lectura es sólo de ida.",
      },
      {
        kind: "steps",
        eyebrow: "Cómo se conecta",
        title: "Cómo se conecta",
        items: [
          {
            title: "Relevar con el implementador",
            body: "La versión de iFIX, si el servidor OPC UA está habilitado y la lista de tags de cada línea.",
          },
          {
            title: "Habilitar OPC UA",
            body: "El implementador activa el servidor OPC UA de iFIX y crea un usuario de sólo lectura. Según la versión, puede requerir licencia.",
          },
          {
            title: "Instalar el equipo de InspectIA",
            body: "Un equipo en la red de planta que lee iFIX y sale a Internet por HTTPS. Nadie entra a la red de planta desde afuera.",
          },
          {
            title: "Asociar tags",
            body: "Cada tag con su señal de InspectIA, y cada código de alarma con una categoría de parada.",
          },
          {
            title: "OEE en vivo",
            body: "Desde ahí, cada máquina aparece en el tablero con su OEE, sus paradas y su producción.",
          },
        ],
      },
      {
        kind: "note",
        title: "Cómo viaja el dato, por dentro",
        items: [
          "El equipo lee los tags cada pocos segundos. Cuando sube el contador, arma un evento con la hora, las unidades buenas y las rechazadas, y un identificador único.",
          "Los eventos van a InspectIA por HTTPS, con una credencial por estación. Si se corta Internet, el equipo los guarda y los manda en orden cuando vuelve. InspectIA acepta hasta 7 días hacia atrás y no duplica un evento que llega dos veces.",
          "Si entre dos eventos de la misma orden pasa más tiempo que el umbral del producto, InspectIA registra una parada. Si en ese momento había una alarma activa, la causa sale de su asociación con una categoría; si no, queda pendiente para que el supervisor la clasifique.",
          "El rendimiento se calcula contra el tiempo ideal del producto activo y la calidad, con el contador de rechazo.",
        ],
      },
      {
        kind: "grid",
        eyebrow: "Si no se puede usar OPC UA",
        title: "Si no se puede usar OPC UA",
        items: [
          {
            title: "Plan B, el PLC directo",
            body: "Si el PLC habla Modbus TCP (por ejemplo, un Modicon Quantum con NOE 771), el equipo lee los registros que indique el integrador, sólo con funciones de lectura, en una red separada y con una única conexión.",
          },
          {
            title: "Históricos",
            body: "Si hay Proficy Historian, su API REST sirve para recuperar datos de un período, por ejemplo después de un corte.",
          },
        ],
      },
      {
        kind: "note",
        title: "Caso",
        body: "Cerámica Quilmes. iFIX con implementación de Tecnet sobre PLC Schneider Modicon Quantum. Vía preferida: servidor OPC UA de iFIX con usuario de sólo lectura. Plan B: Modbus TCP contra la NOE 771 con el mapa de registros de Tecnet. Las cámaras del proyecto de calidad van directo al equipo de InspectIA; del SCADA se toma la señal de pieza o el lote para correlacionar.",
      },
      {
        kind: "note",
        title: "Qué tiene que tener la planta",
        items: [
          "iFIX con el servidor OPC UA habilitado; lo confirma el implementador según la versión y la licencia.",
          "La lista de tags por línea.",
          "Un lugar en la red de planta para el equipo de InspectIA, con salida a Internet.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Hay que cambiar algo en iFIX?",
        a: "Sólo habilitar el servidor OPC UA y un usuario de lectura. No se tocan pantallas, scripts ni base de datos.",
      },
      {
        q: "¿Se puede escribir en el PLC desde InspectIA?",
        a: "No. El usuario es de sólo lectura y el equipo no tiene funciones de escritura.",
      },
      {
        q: "¿iFIX no puede mandar los datos por MQTT?",
        a: "iFIX 2023 tiene cliente MQTT, pero para traer datos al SCADA, no para sacarlos. Por eso la vía es OPC UA.",
      },
      {
        q: "¿Qué pasa si se corta Internet?",
        a: "El equipo guarda los eventos y los manda cuando vuelve, hasta 7 días.",
      },
      {
        q: "¿Funciona con CIMPLICITY o con Historian?",
        a: "Sí: CIMPLICITY también por OPC UA; Historian, por su API REST.",
      },
    ],
    cta: {
      title: "¿Tenés iFIX? Contanos la versión y relevamos los tags con tu implementador",
      origin: "integracion-ifix",
    },
    links: [
      { label: "Integración con SCADA y PLC", to: "/integraciones/scada-plc" },
      {
        label: "Monitoreo automático de OEE",
        to: "/plataforma/produccion/monitoreo-automatico-de-oee",
      },
      { label: "Registro de paradas", to: "/plataforma/produccion/registro-de-paradas-de-maquina" },
      { label: "Andon digital", to: "/plataforma/produccion/andon-digital" },
    ],
  },
];

/* ---------------------------------------------------------------------------------------
 * Resolución del segmento
 * ------------------------------------------------------------------------------------ */

/**
 * Las páginas que cuelgan de `/integraciones/<slug>`: las cuatro categorías y las de
 * sistema, en un solo mapa.
 *
 * **Por qué un solo mapa y una sola ruta dinámica.** Las categorías y los sistemas
 * comparten el segmento, y en el enrutador por archivos de TanStack dos rutas no pueden
 * reclamar el mismo nivel sin que una gane siempre. Con un mapa, el `loader` busca el slug
 * y decide: si no está, 404. La alternativa —cuatro rutas estáticas más una dinámica—
 * funciona (una estática le gana a la dinámica), pero deja la misma plantilla repetida en
 * cinco archivos, y agregar una categoría volvería a ser escribir código.
 */
export const INTEGRATION_PAGES: IntegrationPage[] = [...CATEGORY_PAGES, ...SYSTEM_PAGES];

export const INTEGRATION_PAGE_BY_SLUG = new Map(INTEGRATION_PAGES.map((p) => [p.slug, p]));

/** La categoría a la que pertenece una página de sistema, para la miga de pan. */
export const categoryPageOf = (c: IntegrationCategory) => CATEGORY_PAGES.find((p) => p.slug === c);
