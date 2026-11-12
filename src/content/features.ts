import type { ModuleKey } from "./modules";

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
 * **Por qué los campos son los de `modules.ts`.** No por economía de tipos: una
 * funcionalidad es un recorte de un módulo, así que si la forma fuera distinta la plantilla
 * tendría que ser otra y las dos se irían separando con cada cambio. Con la misma forma, la
 * vista reutiliza los componentes de la página de módulo.
 */

export type Feature = {
  /** Segmento de URL, dentro del módulo. Es el término de búsqueda. */
  slug: string;
  /** El módulo padre. De acá salen la miga de pan y el bloque «Funcionalidades». */
  module: ModuleKey;
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
  /** Lo que pasa hoy, en las palabras del cliente. */
  problem: string[];
  /** Cuatro bloques. Los títulos van como la pregunta del lector donde corresponde. */
  does: { title: string; body: string }[];
  /** Un párrafo después de `does`, cuando hace falta precisar algo que no es una
   *  capacidad más (hoy sólo paradas, con las programadas y el calendario). */
  doesNote?: string;
  /** Cómo se toma el dato: manual, automático, IA. En orden de entrada. */
  capture?: string;
  /** Módulos, funcionalidades o guías que se suman. */
  related?: { label: string; to: string }[];
  /** El título del bloque de `related`. Sin esto, "Con qué se combina". */
  relatedTitle?: string;
  faq: { q: string; a: string }[];
  /** Guía y módulo de destino, al pie. */
  links: { label: string; to: string }[];

  /* ---------- Bloques que hoy tiene una sola funcionalidad ----------
     Opcionales, y la sección no se renderiza donde no están. Control de asistencia vende
     un proyecto con equipo incluido, no una pantalla, y eso necesita decir qué trae la
     caja. Meterlo en `does` lo mezclaría con las capacidades del software. */

  /** Qué incluye el proyecto: equipo, instalación, configuración, sistema. */
  includesBlock?: { title: string; items: { title: string; body: string }[] };
  /** Franja de una sola idea, entre secciones. */
  band?: { title: string; body: string };
  /** Condiciones comerciales, como lista. Sin precios propios: salen de `pricing.ts`. */
  conditions?: { label: string; to?: string }[];
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
    capture:
      "Manual (plan gratuito, una línea) → Automático (PLC, sensor o lectora) → IA (visión sobre la línea, como proyecto aparte).",
    related: [
      {
        label: "Registro de paradas de máquina",
        to: "/plataforma/produccion/registro-de-paradas-de-maquina",
      },
      { label: "Calidad: el rechazo entra solo al indicador", to: "/plataforma/calidad" },
      { label: "Energía: cuánta energía cuesta cada unidad", to: "/plataforma/energia" },
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
    capture:
      "Manual desde la pantalla del puesto (plan gratuito, una línea) → Automático con la señal del PLC o de un sensor.",
    related: [
      {
        label: "Monitoreo automático de OEE",
        to: "/plataforma/produccion/monitoreo-automatico-de-oee",
      },
      { label: "Mantenimiento", to: "/plataforma/mantenimiento" },
      { label: "Industria textil", to: "/soluciones/textil" },
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
    capture:
      "Manual: el lote se carga en el puesto, con la orden (plan gratuito, una línea) → Automático: lectura de etiquetas y conexión con la línea.",
    related: [
      {
        label: "Con Stock, el retiro es completo: de la recepción al pedido, lote por lote",
        to: "/plataforma/stock",
      },
      { label: "Calidad: los resultados quedan pegados al lote", to: "/plataforma/calidad" },
      { label: "Industria de alimentos y bebidas", to: "/soluciones/alimentos" },
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
        title: "Conteo cíclico sin parar",
        body: "Se cuentan algunas posiciones por día, en los huecos de la operación, y la diferencia contra el sistema aparece en el momento.",
      },
      {
        title: "Con un celular",
        body: "El operario trabaja con un Android común. No hay terminales que comprar para empezar.",
      },
    ],
    capture:
      "Manual con el celular (plan gratuito, cinco posiciones) → Automático con lectoras y etiquetas → IA: recepción con cámara en el muelle e inventario con drones en las posiciones altas.",
    related: [
      {
        label: "Producción: el consumo se descuenta solo contra la orden",
        to: "/plataforma/produccion",
      },
      {
        label: "Trazabilidad: el lote seguido de la recepción al pedido",
        to: "/plataforma/trazabilidad",
      },
      { label: "Recepción con cámara", to: "/ia/recepcion" },
      { label: "Inventario con drones", to: "/ia/inventario-con-drones" },
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
     única con `includesBlock`, `band`, `conditions` y `cta` propios.

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
        },
        {
          title: "La instalación",
          body: "La montamos en el ingreso y la conectamos a la red. Opcional: la vinculamos con la puerta o el molinete para habilitar el paso.",
        },
        {
          title: "La configuración",
          body: "Cargamos el padrón, los horarios y las licencias, y la probamos con tu gente antes de irnos.",
        },
        {
          title: "El sistema",
          body: "InspectIA, con asistencia, tareas y reportes.",
        },
      ],
    },
    band: {
      title: "¿Ya tenés algo instalado?",
      body: "Trabajamos con lo que hay. Si ya tenés reloj, terminal, control de acceso o sistema de sueldos, nos conectamos, lo integramos a InspectIA y coordinamos con tu proveedor lo que haga falta. Por ejemplo, un reloj que trabaja con CrossChex se conecta sin cambiar el equipo. Sumamos equipo sólo donde falta.",
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
    relatedTitle: "Del ingreso a la línea",
    related: [
      {
        label: "Tareas y asistencia: estaciones y tareas del turno, sobre quién está presente",
        to: "/plataforma/tareas",
      },
      {
        label: "Producción: unidades por hora por persona, en cada estación",
        to: "/plataforma/produccion",
      },
    ],
    conditions: [
      { label: "Plan gratuito: reportes de asistencia incluidos, con el fichero conectado." },
      { label: "Kit 4.0: hasta 50 % del proyecto.", to: "/kit-4-0" },
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
