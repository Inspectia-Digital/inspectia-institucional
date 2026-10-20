/**
 * Detalle funcional de cada módulo, para la página de `/plataforma/$modulo`.
 *
 * ## De dónde sale
 *
 * Del documento **«InspectIA — Visión funcional de la plataforma»** (artifact
 * `Cya9PtE9F1Axdykjau6M17`), extraído el 19/10/2026. Ese documento es, en sus propias
 * palabras, «la base única para escribir la web, las piezas comerciales, los posts y
 * cualquier material de comunicación», y describe la plataforma **en su versión de corto y
 * mediano plazo**: los siete módulos completos, se hayan construido o no.
 *
 * Esa última parte es una decisión tomada, no un descuido: los siete módulos se publican
 * igual, sin marca de estado. Mantenimiento y Energía no tienen todavía pantallas en la
 * aplicación y aun así llevan su detalle completo, porque lo que la web comunica es el
 * catálogo de producto. El criterio del propio documento —«los módulos en catálogo se
 * presentan como módulos, no como funcionalidad disponible hoy»— se cumple en cómo se
 * redacta la página, no escondiendo módulos.
 *
 * ## Por qué vive acá y no en `modules.ts`
 *
 * Porque se re-sincroniza. Cuando el documento cambie, esto se vuelve a generar entero y
 * `modules.ts` —que tiene contenido escrito a mano para la web, con sus decisiones de SEO
 * y de copy— no se toca. Dos fuentes con dos ritmos distintos, dos archivos.
 *
 * ## Qué se dejó afuera a propósito
 *
 * - **Las líneas «Con IA: …»** de cada módulo. La decisión ya estaba tomada en
 *   `modules.ts`: en la página de un módulo con precio de lista, la IA es un bloque que
 *   lleva a /ia y nada más. Detallar ahí qué hace el modelo es lo que confunde el precio
 *   publicado con el que se cotiza.
 * - **Las líneas «Plan gratuito: … Pago: …»**, que ya viven en `freeTier` y en
 *   `pricing.ts`. Un mismo dato en dos lugares se desincroniza.
 *
 * No editar a mano: regenerar desde el documento.
 */
import type { ModuleKey } from "@/content/modules";

export type ModuleDetail = {
  /** La pregunta que el módulo responde, en las palabras del cliente. Sin el "Responde:". */
  answers: string;
  /** El recorrido de punta a punta, en orden. Cinco a siete pasos. */
  howItWorks: string[];
  /** De qué partes está hecho el módulo: el detalle que un comprador pide antes de contratar. */
  components: { name: string; does: string }[];
  /** Qué se desbloquea al combinarlo con cada otro módulo. Sin las líneas de IA ni de precio. */
  worksWith: string[];
};

export const MODULE_DETAIL: Partial<Record<ModuleKey, ModuleDetail>> = {
  produccion: {
    answers: "¿cuánto produje contra lo que podía producir, dónde lo perdí y por qué?",
    howItWorks: [
      "Se carga la línea, sus turnos y el ritmo ideal de cada producto.",
      "Se arma el plan del día: órdenes con producto y cantidad, a mano, por Excel, desde el sistema de gestión o desde el Planeamiento de Stock.",
      "Durante el turno entra el dato: la máquina envía cada unidad o ciclo, o el supervisor declara producidas, defectuosas y paradas al cerrar.",
      "Las paradas se detectan solas y se clasifican por motivo, planificado o no.",
      "El sistema calcula disponibilidad, rendimiento, calidad y OEE, y lo compara contra el plan.",
      "Al terminar el turno sale el parte por mail o WhatsApp con qué se cumplió, dónde se perdió y qué hacer.",
    ],
    components: [
      { name: "Modelo de planta", does: "Líneas, estaciones, máquinas, turnos y calendario" },
      {
        name: "Productos y recetas",
        does: "Ritmo ideal por producto y estación, recetas con su rendimiento",
      },
      {
        name: "Planes y órdenes",
        does: "Secuencia del día por línea, reordenable, con cierre y motivo de desvío",
      },
      {
        name: "Operación",
        does: "La pantalla del supervisor: dotación, plan del día, paradas, cierre; con modo planta para tablet",
      },
      {
        name: "Pantalla de piso",
        does: "Monitor en la línea con el estado en vivo, el avance contra el plan y las paradas abiertas",
      },
      {
        name: "Terminal de piso",
        does: "El operario inicia sesión con su legajo y registra en qué estación trabaja",
      },
      {
        name: "Paradas",
        does: "Detección automática, clasificación por motivo, paradas planificadas y recurrentes",
      },
      {
        name: "Control de plan contra real",
        does: "Umbrales de aviso y autorización cuando lo producido se aleja de lo esperado",
      },
      {
        name: "Tablero",
        does: "OEE, cascada de pérdidas, Pareto de paradas, cuello de botella, rendimiento por producto, operario y máquina",
      },
      {
        name: "Vista del mes",
        does: "Comparación entre plantas y líneas contra objetivo y mes anterior",
      },
      {
        name: "Parte de turno",
        does: "Resumen automático con recomendaciones, por mail y WhatsApp",
      },
      {
        name: "Alertas en vivo",
        does: "Aviso cuando una línea para, va lenta o se aleja del plan",
      },
    ],
    worksWith: [
      "Calidad: el rechazo entra solo en el OEE, sin cargarlo dos veces.",
      "Stock: el consumo se descuenta contra la orden y el terminado ingresa al stock.",
      "Trazabilidad: lo producido arma el lote del día.",
      "Mantenimiento: la parada abre la orden de trabajo y el preventivo corre por horas reales.",
      "Energía: el consumo se divide por lo producido.",
      "Tareas: la dotación de la línea aparece en la vista del día de cada persona.",
    ],
  },

  calidad: {
    answers: "¿qué rechacé, por qué, dónde, y se hacen los controles que planificamos?",
    howItWorks: [
      "La empresa arma su catálogo de defectos y define a qué productos o categorías aplica cada uno.",
      "Arma sus planes de inspección: qué se controla, sobre qué producto o línea, cada cuánto (por turno, cada N horas, por orden, por lote) y con qué muestra.",
      "En cada turno el sistema muestra los controles pendientes, a tiempo o vencidos, y guía la carga.",
      "El inspector registra lo controlado, lo rechazado y lo reprocesado, con valores medidos y foto.",
      "Un valor fuera de límite no frena la carga: dispara una alerta y, si corresponde, bloquea el lote en Trazabilidad.",
      "El tablero muestra la tasa de rechazo, el Pareto y el cumplimiento de los planes.",
    ],
    components: [
      {
        name: "Catálogo de defectos",
        does: "Defectos propios con código y alcance por producto o categoría",
      },
      {
        name: "Inspecciones",
        does: "Individual o por sesión con varios productos; inspeccionadas, rechazadas y reprocesadas; una foto por inspección",
      },
      {
        name: "Planes de inspección",
        does: "Ítems numéricos, sí/no, de selección, de texto o de defecto, con límites y frecuencias",
      },
      {
        name: "Pendientes del turno",
        does: "Qué control toca, cuál está vencido y cuál se hizo fuera de término",
      },
      {
        name: "Control estadístico",
        does: "Gráficos de control por ítem numérico, con promedio, desvío y alerta de deriva",
      },
      {
        name: "No conformidades",
        does: "Registro de la no conformidad, su causa, la acción correctiva y su cierre",
      },
      {
        name: "Tablero",
        does: "Tasa de rechazo, Pareto de defectos, cumplimiento por plan y línea, ítems fuera de límite",
      },
      { name: "Exportaciones", does: "Excel de inspecciones y cumplimiento; PDF del tablero" },
    ],
    worksWith: [
      "Producción: el rechazo impacta la calidad del OEE en la línea y la orden.",
      "Trazabilidad: el control queda asociado al lote; un rechazo puede bloquearlo.",
      "Stock: la inspección de recepción libera o rechaza la mercadería que entra.",
      "Tareas: un control pendiente aparece como tarea del inspector.",
    ],
  },

  stock: {
    answers: "¿qué tengo, dónde está, cuánto me dura y qué tengo que producir o comprar?",
    howItWorks: [
      "Se carga el maestro de productos por tipo: materia prima, insumo, intermedio y terminado; a mano, por planilla o sincronizado con el sistema de gestión.",
      "Se arman las ubicaciones: depósitos, zonas y posiciones (incluidas cámaras de frío), con su capacidad.",
      "El control de recepción revisa lo que llega contra la orden de compra y el remito: cantidades, lote y vencimiento del proveedor, estado de la mercadería y foto. Lo recibido queda en cuarentena, liberado o rechazado, y se ubica.",
      "Los movimientos registran el consumo de materias primas e insumos contra la orden, por lote y primero lo que vence primero; el ingreso de intermedios y terminados con el lote del día; las transferencias entre ubicaciones y los ajustes con motivo.",
      "Se declara el origen del stock de cada planta: cargado en InspectIA o traído del sistema del cliente.",
      "El sistema calcula la cobertura en días y, con objetivos por reglas, propone qué producir (carga el plan en Producción) y qué comprar (arma los pedidos).",
      "El control de salida registra lo despachado contra lo pedido, con su lote.",
    ],
    components: [
      {
        name: "Maestro de productos",
        does: "Tipo (materia prima, insumo, intermedio, terminado), categoría, atributos, unidad, vida útil, reemplazos y si se fabrica o se compra",
      },
      {
        name: "Ubicaciones",
        does: "Depósitos, zonas y posiciones con capacidad, dibujados sobre el plano de planta",
      },
      {
        name: "Control de recepción",
        does: "Lo que llega contra la orden de compra y el remito: diferencias, lote y vencimiento del proveedor, estado, foto; cuarentena, liberación o rechazo",
      },
      {
        name: "Stock por producto, tipo y ubicación",
        does: "Qué hay de cada materia prima, insumo, intermedio y terminado, y dónde está",
      },
      {
        name: "Stock por lote y vencimiento",
        does: "Cada existencia con su lote y vencimiento; qué vence primero y qué está bloqueado",
      },
      {
        name: "Movimientos",
        does: "Consumo contra orden por lote, ingreso de lo producido, transferencias, ajustes y bajas, con responsable y motivo",
      },
      {
        name: "Origen del stock",
        does: "Formulario o integración, con frescura visible y lista de lo que no mapea",
      },
      {
        name: "Inventario cíclico",
        does: "Conteos programados por ubicación o producto, con la diferencia en el momento",
      },
      {
        name: "Cobertura",
        does: "Días de stock según el uso real; se acaba pronto, cubierto o sobrestock",
      },
      {
        name: "Objetivos por reglas",
        does: "Cantidad, mínimo o días de cobertura por producto, categoría o atributo",
      },
      {
        name: "Planeamiento de producción",
        does: "Cuánto producir para llegar al objetivo, redondeado a recetas, cargado como plan",
      },
      {
        name: "Abastecimiento",
        does: "Cuánto comprar, pedidos con proveedor, orden de compra, llegada estimada e ingresos parciales",
      },
      {
        name: "Control de salida",
        does: "Lo despachado contra lo pedido, con lote, patente y transportista",
      },
      {
        name: "Foto diaria",
        does: "Historia del stock día por día: quiebres fechados y cobertura semana a semana",
      },
    ],
    worksWith: [
      "Trazabilidad: cada existencia lleva su lote. Trazabilidad encadena el lote de materia prima o insumo recibido con el intermedio y el terminado que lo consumieron, y con el despacho que lo llevó al cliente.",
      "Producción: el planeamiento carga el plan; la orden descuenta materias primas e insumos e ingresa intermedios y terminados.",
      "Calidad: el control de recepción libera o rechaza lo que entra; un rechazo en línea bloquea el lote en stock.",
      "Reportes de gestión: la cobertura y los quiebres se cruzan con las ventas.",
    ],
  },

  trazabilidad: {
    answers:
      "¿de qué lote salió cada producto, con qué se hizo, en qué condiciones, a dónde fue y cuándo vence?",
    howItWorks: [
      "Cada recepción de materia prima queda con su lote de proveedor.",
      "Cada día de producción genera el lote del día por planta, con su vencimiento según la vida útil del producto.",
      "Lo producido se reparte por destino: terminado por marca, comercializable con falla, merma; y se concilia contra lo que se produjo.",
      "Se registran las condiciones de producción del lote: temperaturas, tiempos, parámetros, operarios y controles de calidad.",
      "El lote se libera o se bloquea; al cerrar, sus números quedan congelados.",
      "Ante un problema, el recall muestra qué lotes de materia prima entraron y a qué clientes llegaron, en un clic.",
    ],
    components: [
      {
        name: "Lote del día",
        does: "Un lote por planta y fecha, con código y vencimiento automáticos",
      },
      {
        name: "Control por marca y destino",
        does: "Reparto de lo producido y conciliación contra lo esperado, con umbral de autorización",
      },
      {
        name: "Genealogía",
        does: "Qué lotes de insumo entraron en cada lote de terminado, y a qué pedido salió",
      },
      {
        name: "Condiciones de producción",
        does: "Parámetros del proceso asociados al lote, cargados o leídos de la máquina; incluye calculadoras de proceso como la de hielo de amasado",
      },
      {
        name: "Condiciones de producción: calculadora de hielo de amasado",
        does: "Cuánta agua y hielo cargar para llegar a la temperatura de masa, con registro por amasada",
      },
      {
        name: "Bloqueo y liberación",
        does: "Estado del lote: en cuarentena, liberado, bloqueado, con quién y por qué",
      },
      {
        name: "Vencimientos",
        does: "Lotes vencidos, por vencer y vigentes, con el aviso en Inicio",
      },
      {
        name: "Recall",
        does: "La cadena completa de un lote, hacia atrás y hacia adelante, exportable",
      },
      {
        name: "Certificados por lote",
        does: "Documento del lote con sus controles, listo para entregar al cliente",
      },
    ],
    worksWith: [
      "Producción: lo producido, los objetivos por marca y la dotación llegan solos al lote.",
      "Stock: cada movimiento lleva su lote; el despacho cierra la cadena.",
      "Calidad: los controles quedan en el lote; un rechazo lo bloquea.",
      "Tareas: el control del lote aparece en la vista del día de quienes lo hacen.",
    ],
  },

  tareas: {
    answers: "¿dónde está cada persona cuando no está en una línea, y se hizo lo que se pidió?",
    howItWorks: [
      "Se arma el catálogo por planta: áreas y tareas, con turno y unidad de medida si tienen objetivo.",
      "Se asignan tareas a personas, sueltas o como asignaciones fijas que se repiten por día de la semana.",
      "Cada persona ve su día en la vista unificada: sus tareas y lo que le asignaron otros módulos.",
      "El supervisor marca cada tarea como completada, con el resultado obtenido y la evidencia: foto o valor medido.",
      "El supervisor ve qué quedó sin hacer y reasigna; los conflictos avisan, no bloquean.",
      "El tablero mide cumplimiento por tarea, área y persona.",
    ],
    components: [
      {
        name: "Catálogo de áreas y tareas",
        does: "Por planta, con turno, unidad y objetivo opcional",
      },
      { name: "Nómina y roles", does: "Las personas de cada planta y sus puestos" },
      {
        name: "Asignaciones",
        does: "Sueltas o fijas, generadas 14 días hacia adelante respetando feriados",
      },
      {
        name: "Vista del día",
        does: "Cada persona con todo lo que tiene asignado, de todos los módulos",
      },
      { name: "Evidencia", does: "Foto o valor medido que carga el supervisor al cerrar la tarea" },
      {
        name: "Avisos al supervisor",
        does: "Lo pendiente y lo vencido le llega al supervisor por mail o WhatsApp",
      },
      {
        name: "Matriz de habilidades",
        does: "Quién sabe hacer qué, para asignar y cubrir puestos",
      },
      {
        name: "Cobertura de turno",
        does: "Qué puestos quedan sin cubrir antes de que arranque el turno",
      },
      { name: "Presentismo", does: "Ingreso y egreso desde el fichero de la planta" },
      {
        name: "Tablero",
        does: "Asignaciones, % completado, cumplimiento del objetivo y horas por persona",
      },
    ],
    worksWith: [
      "Producción: la dotación de cada línea aparece en la vista del día; una parada puede abrir una tarea.",
      "Mantenimiento: la orden de trabajo asignada a un operario es una tarea más.",
      "Calidad y Trazabilidad: los controles pendientes llegan como tareas a quien los hace.",
    ],
  },

  mantenimiento: {
    answers:
      "¿qué máquinas fallan, cuánto tardamos en arreglarlas y el preventivo se hace cuando corresponde?",
    howItWorks: [
      "Se cargan los activos: máquinas, equipos e instalaciones, con su ubicación en la planta y su ficha.",
      "Se arma el plan preventivo de cada activo: qué se hace, cada cuántas horas, ciclos o días, y con qué checklist.",
      "Las horas de uso llegan de Producción, de un sensor de encendido o de la carga manual, y el preventivo vence cuando corresponde.",
      "Una falla abre una orden de trabajo: a mano, desde la parada de la línea o desde un aviso por WhatsApp.",
      "El técnico, propio o externo, registra qué hizo, cuánto tardó y qué repuestos usó.",
      "El tablero muestra disponibilidad, tiempo medio entre fallas y tiempo medio de reparación por activo.",
    ],
    components: [
      {
        name: "Registro de activos",
        does: "Ficha de cada equipo, con ubicación, documentos, fotos e historial",
      },
      {
        name: "Plan preventivo",
        does: "Rutinas por horas reales, ciclos o calendario, con checklist",
      },
      {
        name: "Órdenes de trabajo",
        does: "Correctivas y preventivas, con estado, responsable, tiempos y evidencia",
      },
      {
        name: "Solicitudes de mantenimiento",
        does: "Cualquier persona reporta una falla desde el celular o WhatsApp",
      },
      {
        name: "Detección por reglas",
        does: "Reglas configurables sobre paradas, ritmo, microparadas, horas de marcha o variables de máquina (ej.: tres paradas por la misma causa en un turno, ritmo 15% abajo del estándar). Al cumplirse, abren una solicitud u orden y avisan al responsable",
      },
      { name: "Repuestos", does: "Stock de repuestos por activo, con punto de reposición" },
      {
        name: "Técnicos externos",
        does: "Proveedores que reciben y cierran órdenes sin ser usuarios de la empresa",
      },
      {
        name: "Indicadores",
        does: "Disponibilidad, tiempo medio entre fallas, tiempo medio de reparación, cumplimiento del preventivo",
      },
      { name: "Costos", does: "Mano de obra y repuestos por activo y por orden" },
    ],
    worksWith: [
      "Producción: la parada abre la orden de trabajo y las horas de uso alimentan el preventivo.",
      "Tareas: la orden asignada a un operario aparece en su día.",
      "Stock: los repuestos se descuentan del stock al cerrar la orden.",
      "Energía: un consumo anómalo de un equipo dispara una revisión.",
    ],
  },

  energia: {
    answers:
      "¿cuánta energía cuesta cada unidad que produzco, y dónde se va la que no produce nada?",
    howItWorks: [
      "Se cargan los servicios de la planta: electricidad, gas, agua, vapor o aire comprimido.",
      "El consumo entra de tres maneras, de menor a mayor detalle: la factura del servicio, la carga manual de lecturas o los medidores conectados por línea o máquina.",
      "El sistema reparte el consumo por línea y por producto según lo producido, y separa el consumo en vacío: el de la planta parada.",
      "Muestra los picos de demanda y el costo energético por unidad producida.",
      "Avisa cuando un equipo consume fuera de lo normal.",
    ],
    components: [
      { name: "Servicios y medidores", does: "Qué se mide, dónde y con qué equipo" },
      {
        name: "Carga de facturas",
        does: "Consumo y costo del período, cargados o leídos de la factura",
      },
      { name: "Lecturas", does: "Manuales o automáticas, por medidor" },
      {
        name: "Consumo por unidad",
        does: "Energía y costo por unidad producida, por línea y producto",
      },
      { name: "Consumo en vacío", does: "Lo que se consume con la planta o la línea parada" },
      { name: "Picos de demanda", does: "Cuándo se concentra el consumo y cuánto cuesta" },
      { name: "Tablero", does: "Evolución, comparación entre plantas y líneas, consumo anómalo" },
    ],
    worksWith: [
      "Producción: el consumo se divide por lo producido de verdad.",
      "Mantenimiento: un equipo que consume de más abre una revisión.",
    ],
  },
};
