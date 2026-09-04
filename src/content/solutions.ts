import type { ModuleKey } from "./modules";

/**
 * Soluciones: la industria es la unidad de entrada y el caso de uso el filtro que la
 * cruza. Acá vuelven a existir manufactura y logística, ahora como agrupación de
 * industrias y no como dos productos separados (§7.5).
 *
 * **Regla que no se negocia:** ninguna página de industria se publica sin al menos un
 * problema propio de ese rubro. Siete páginas iguales con el nombre cambiado son peores
 * que tres bien escritas: Google las lee como contenido duplicado y el visitante se da
 * cuenta en el primer párrafo.
 */

export type Industry = {
  slug: string;
  /** Etiqueta del menú y de la card. */
  name: string;
  /** Titular de la página. Distinto del `name`. */
  h1?: string;
  /** El dolor propio de esa industria, en una línea. Es el lead y el texto de la card. */
  pain: string;
  /** Tres a cinco problemas propios del rubro. Sin esto la página no se publica. */
  problems?: string[];
  /** El dato de esa industria, con su período. null donde no hay uno aprobado. */
  proof?: { value: string; caption: string } | null;
  /** Normativa o particularidad, cuando aplica. Un párrafo. */
  context?: string;
  /**
   * Preguntas propias del rubro, con la respuesta. Alimenta el acordeón y el `FAQPage`.
   *
   * Opcional como todo lo demás: donde no hay preguntas reales, la sección no se
   * renderiza. Una FAQ inventada para llenar la página es peor que ninguna, porque el
   * marcado la publica en el resultado de búsqueda tal cual está escrita.
   */
  faq?: { q: string; a: string }[];
  /** H2 del acordeón. Sin esto, "Preguntas sobre {name}", que no funciona con todos los
   *  nombres: "Preguntas sobre farmacéutica" no es una frase. */
  faqTitle?: string;
  /** Los módulos que aplican, ordenados por impacto. */
  modules: ModuleKey[];
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "autopartista",
    name: "Autopartista y metalmecánica",
    h1: "Que la pieza que sale de tu planta no vuelva con penalización",
    pain: "Una pieza que sale mal llega al cliente y vuelve con penalización.",
    seoTitle: "Software de calidad y OEE para autopartistas",
    seoDescription:
      "En autopartes el defecto no se paga en scrap: se paga en penalización del cliente. Control del 100 % de la línea, registrado, con el rechazo dictado al PLC.",
    problems: [
      "El cliente detecta el defecto y la penalización llega con el reclamo.",
      "El control por muestreo deja lotes enteros sobre los que no se sabe nada.",
      "Cuando hay un reclamo no hay con qué demostrar qué salió de la línea ese turno.",
      "La auditoría del cliente pide trazabilidad y se responde con planillas armadas a mano.",
      "No se llega al programa de entrega y no se puede explicar en qué se perdió el tiempo.",
    ],
    proof: {
      value: "70 tipos de falla",
      caption: "controlados en menos de 1 minuto, en una planta autopartista",
    },
    modules: ["control-de-calidad", "tymeo", "control-de-pedidos"],
    published: true,
  },
  {
    slug: "alimentos",
    name: "Alimentos y bebidas",
    h1: "Que la merma y el vencimiento no se descubran cuando el lote ya salió",
    pain: "La merma y las caducidades se descubren cuando el lote ya salió.",
    seoTitle: "Software de producción y trazabilidad para alimentos",
    seoDescription:
      "En alimentos el problema no es sólo producir: es el lote, la fecha y la merma. Medí la línea en tiempo real y tené la trazabilidad sin rearmarla a mano.",
    problems: [
      "La merma se calcula al cierre del mes y ya no se puede actuar sobre ella.",
      "El control de vencimientos y de lotes se lleva en planillas paralelas al sistema.",
      "Los cambios de formato y las limpiezas paran la línea y nadie tiene el tiempo real que llevan.",
      "Un desvío de calidad obliga a bloquear más producto del que hacía falta, porque no se sabe exactamente qué lote.",
    ],
    // TODO(equipo): falta el dato de esta industria. Hay clientes en el rubro y ninguno
    // aprobado para publicar. Con null la sección no se renderiza, que es preferible a un
    // porcentaje de merma "del sector" sacado de un informe genérico.
    proof: null,
    context:
      "Trazabilidad de lote y control de caducidades son requisitos, no mejoras. TYMEO tiene los dos como add-on, y el registro de lo que se produjo en cada turno queda disponible para la auditoría sin rearmarlo a mano.",
    modules: ["tymeo", "control-de-calidad", "recepcion"],
    published: true,
  },
  {
    slug: "logistica",
    name: "Logística y centros de distribución",
    h1: "Que el sistema y el depósito digan lo mismo",
    pain: "El sistema dice una cosa y el rack dice otra.",
    seoTitle: "Software de control de depósito: recepción, stock y pedidos",
    seoDescription:
      "El costo del depósito está en la gente y en el tiempo: la recepción que traba, el conteo que obliga a parar, el pedido que sale mal. Cuatro módulos para eso.",
    problems: [
      "La recepción es el cuello de botella y en los picos hay que poner más gente.",
      "Para tener el inventario al día hay que parar el depósito un fin de semana.",
      "Las posiciones altas y las cámaras de frío se cuentan una vez por año.",
      "El error de armado se descubre cuando el cliente recibe el pedido.",
      "El cliente llama por su pedido y hay que ir a preguntarle a alguien.",
    ],
    proof: {
      value: "De 24 a 15 operarios",
      caption: "y lead time de 48 a 30 horas, en un centro de distribución",
    },
    modules: ["recepcion", "stock-en-posiciones", "sobrestock-drones", "control-de-pedidos"],
    published: true,
  },

  // Las tres que siguen se publican con el contenido portado del WordPress anterior, donde
  // ya estaban online e indexadas. Se traen porque la migración las dejaba sin destino: son
  // tres páginas con posicionamiento propio, y redirigirlas al hub genérico las tira.
  //
  // TODO(equipo): **el texto es una adaptación, no una redacción nueva.** Los problemas
  // salen de las viñetas del sitio anterior, pasadas de sintagma a oración y al voseo del
  // resto del sitio; los titulares son los H2 de esas páginas. Falta la pasada de contenido
  // propio, y sobre todo un dato por rubro: las tres van con `proof: null`.
  {
    slug: "textil",
    name: "Textil y moda",
    h1: "Que una falla no arruine el lote entero",
    pain: "Una falla chica arruina el lote completo, y se descubre cuando el cliente lo devuelve.",
    seoTitle: "Control de calidad para la industria textil",
    seoDescription:
      "En textil una falla chica arruina el lote entero y vuelve como devolución. Visión artificial sobre corte, confección y terminación, a la velocidad de la línea.",
    problems: [
      "Hay variaciones de color y de textura entre piezas del mismo lote.",
      "Las fallas de costura, terminación y dobladillo se detectan cuando la prenda ya está armada.",
      "El error de etiquetado o de presentación final llega al cliente.",
      "A medida que sube el volumen, revisar cada prenda o cada rollo deja de ser posible.",
    ],
    context:
      "El control se hace sobre los puntos críticos del proceso —corte, confección, estampado, acabado y packaging— y no sólo sobre la prenda terminada, que es donde el retrabajo ya cuesta el doble.",
    modules: ["control-de-calidad", "tymeo"],
    published: true,
  },
  /**
   * Farmacéutica.
   *
   * Escrita sobre una reunión con un laboratorio multinacional del país, así que los cinco
   * problemas son los que dijo el cliente y no los que uno supondría del rubro: la
   * comprimidora que se anota en papel, el logbook, el acondicionamiento que nadie mide,
   * el fraccionamiento con etiquetas de balanza y el excipiente compartido entre productos.
   *
   * **Techo deliberado en lo que la página afirma.** El rubro tiene dos temas donde una
   * frase de más es un problema comercial y legal:
   *
   * 1. **Validación del sistema.** Un sistema computarizado que toca registros de
   *    producción en pharma cae bajo normativa —trazabilidad de registros, control de
   *    accesos, control de cambios—. Acá no se afirma nada de eso: se dice qué queda
   *    registrado y se remite el alcance al relevamiento. No agregar cumplimiento, validación
   *    ni referencias a normas concretas sin que legal las firme.
   * 2. **Genealogía de lote.** Seguir el lote de materia prima hasta el producto terminado
   *    es lo que el cliente más pidió y es justamente lo que está en desarrollo, no
   *    publicado. Lo que la página promete es lo que la demo mostró: el parte de producción
   *    atado a la orden y al turno, con estaciones, máquinas, operarios y paradas. Nada
   *    dice que la trazabilidad de materia prima esté resuelta, y no puede decirlo hasta
   *    que lo esté.
   *
   * Los módulos cambiaron respecto del marcador anterior —que era una suposición sobre una
   * página sin contenido— y salen de lo que el cliente puso arriba de la mesa.
   */
  {
    slug: "farmaceutica",
    name: "Farmacéutica",
    h1: "Que el parte de cada lote no haya que armarlo a mano",
    pain: "Todo tiene que quedar registrado, y casi todo se registra a mano.",
    seoTitle: "Software de producción para laboratorios farmacéuticos",
    // 148 caracteres. Es además la bajada del hero, así que tiene que leerse como texto y
    // no como una descripción escrita para el buscador.
    seoDescription:
      "En un laboratorio todo queda registrado, y casi todo se registra a mano. Medí la línea en tiempo real y tené el parte de cada lote atado a su orden.",
    problems: [
      "La producción se anota en papel al pie de la comprimidora, y el informe se arma al día siguiente en una planilla.",
      "Las paradas se escriben a mano en el logbook, con la hora que el operario recuerda al final del turno.",
      "Acondicionamiento —blisteado y estuchado— no se mide, así que la mitad del proceso queda afuera del número de productividad.",
      "El fraccionamiento se resuelve con las etiquetas de la balanza, y ese paso no queda en ningún registro digital.",
      "Un mismo excipiente entra en varios productos, así que la compra de insumos no se puede calcular producto por producto.",
    ],
    // TODO(equipo): no hay dato del rubro. Hay una oportunidad abierta y ningún cliente
    // implementado, así que no hay número propio; y un porcentaje "del sector" sacado de un
    // informe no es una prueba, es relleno.
    proof: null,
    context:
      "La trazabilidad del proceso es un requisito y no una mejora, y hoy se sostiene en registros escritos a mano. Lo que queda registrado con InspectIA es lo que pasó en la línea: cada turno atado a su orden de producción, con las estaciones, las máquinas, los operarios asignados y cada parada con su motivo. Es el mismo parte que hoy se arma entre el logbook y una planilla, generado solo. Qué exige la normativa que aplica a tu planta, y qué parte de eso cubre la plataforma, se define en el relevamiento.",
    faqTitle: "Las preguntas que hace un laboratorio",
    faq: [
      {
        q: "Hoy trabajamos con papel y Excel. ¿Sirve igual?",
        a: "Es el punto de partida más común. Todos los módulos tienen modalidad manual: se crea la cuenta y se carga desde un formulario, sin integrar nada y sin proyecto de implementación. Con eso ya se genera historial y se pueden comparar turnos y líneas. La captura automática —sensores, lectoras, conexión a los PLC— se suma después, sobre lo mismo que ya se estaba usando.",
      },
      {
        q: "Tenemos plantas en más de un país. ¿Sirve para todas?",
        a: "Sí. Es una aplicación web, así que no hay una instalación por planta ni por país. La estructura se carga como es —plantas, líneas, estaciones y máquinas, cada una con su personal y sus turnos— y los tableros se miran por planta o consolidados.",
      },
      {
        q: "¿Se integra con los equipos del laboratorio de control de calidad?",
        a: "Depende de que el equipo exponga sus resultados de alguna forma: un archivo, una base de datos o una API. Cuando los expone, se integran y quedan asociados a la orden de producción, que es donde tienen que estar para servir de algo. Qué equipos se pueden conectar se releva antes de cotizar, no después.",
      },
      {
        q: "¿Reemplaza al ERP o al sistema que ya tenemos?",
        a: "No. La idea es completar los huecos y no reemplazar lo que funciona. Si hay un ERP o un WMS, InspectIA se integra y toma de ahí lo que ya está cargado; donde no hay nada, lo cubre. En un laboratorio eso suele significar que la gestión sigue donde está y lo que se suma es lo que hoy no existe: el registro de lo que pasa en la planta.",
      },
    ],
    modules: ["tymeo", "control-de-calidad", "recepcion", "stock-en-posiciones"],
    published: true,
  },
  {
    slug: "cosmetica",
    name: "Cosmética",
    h1: "Tu imagen es tu producto",
    pain: "El envase, la etiqueta y la presentación son el producto: una falla visual llega al consumidor como una falla de la marca.",
    seoTitle: "Control de calidad de envases y etiquetas",
    seoDescription:
      "En cosmética el envase es el producto. Visión artificial sobre envase, etiqueta y presentación final, en líneas de alta rotación y con muchos formatos.",
    problems: [
      "Una falla en el envase, la etiqueta o la presentación llega al consumidor y se lee como una falla de la marca.",
      "La inspección visual depende de qué tan cansado esté el operario al final del turno.",
      "Con muchos formatos y líneas de alta rotación, controlar todo a ojo no escala.",
      "El retrabajo por un defecto estético para la línea y no estaba en el programa.",
      "El retailer exige un nivel de control que hoy no se puede demostrar con registros.",
    ],
    context:
      "En líneas auditadas por grandes retailers o distribuidores, lo que se pide no es sólo que el control exista: es poder mostrar el registro de qué se controló y cuándo.",
    modules: ["control-de-calidad", "tymeo"],
    published: true,
  },
  {
    slug: "maquinarias",
    name: "Maquinarias e insumos industriales",
    h1: "Cada pieza cuenta",
    pain: "El poro, la grieta o la rebaba que no se ve a simple vista vuelve como pieza rechazada.",
    seoTitle: "Inspección de piezas metálicas con visión artificial",
    seoDescription:
      "Poros, grietas, rebabas y golpes en piezas metálicas, ensamblajes y componentes de precisión, detectados en la línea y con registro visual para auditoría.",
    problems: [
      "Hay defectos que no se ven a simple vista: poros, grietas, rebabas, golpes.",
      "El cliente rechaza piezas por errores de terminación superficial.",
      "El resultado de la inspección cambia según qué operario la haga.",
      "No se puede escalar la producción sin resignar control.",
      "No quedan registros visuales para responder una auditoría.",
    ],
    context:
      "En piezas de precisión el defecto no siempre es estético: hay fallas que afectan la funcionalidad o la seguridad del conjunto, y ésas conviene detectarlas en la línea y no en el cliente.",
    // El contenido portado es todo de control visual, así que el módulo de calidad va
    // primero aunque la clasificación anterior no lo incluía.
    modules: ["control-de-calidad", "tymeo", "control-de-pedidos"],
    published: true,
  },
];

export type UseCase = {
  slug: string;
  /** El nombre del caso. Es el ancla del enlace, donde el término de búsqueda sirve. */
  name: string;
  /** El dolor en primera persona. Es el titular de la card del hub, no de la página. */
  pain: string;
  /** Titular de la página: en tercera persona y con el término de búsqueda. */
  h1: string;
  seoTitle: string;
  seoDescription: string;
  /** Bajada del hero. */
  lead: string;
  /** Tres párrafos: el síntoma, por qué pasa, qué cuesta. */
  body: string[];
  /** Cómo se resuelve, en una línea, al pie del bloque de módulos. */
  solution: string;
  modules: ModuleKey[];
  /** La industria donde este problema es más caro, y por qué. */
  worstIn: { slug: string; note: string };
};

/**
 * Los cinco casos de uso cruzan industrias y son los que van a rankear: la gente busca el
 * problema, no el producto.
 *
 * Cortas a propósito, entre 400 y 500 palabras. Una página de caso de uso no explica el
 * producto —para eso está la página del módulo— sino que nombra el problema mejor que
 * nadie y pasa la posta. **Ninguna lleva un porcentaje del sector**: el único número que
 * puede aparecer acá es uno propio, y todavía no hay ninguno aprobado.
 */
export const USE_CASES: UseCase[] = [
  {
    slug: "scrap",
    name: "Reducir scrap y retrabajo",
    pain: "Me entero del defecto cuando el lote ya salió",
    h1: "Cómo reducir el scrap cuando el defecto se detecta tarde",
    seoTitle: "Cómo reducir el scrap y el retrabajo en producción",
    seoDescription:
      "El scrap no se reduce controlando más fuerte al final: se reduce detectando el defecto en la línea, en el momento en que se produce. Cómo se hace.",
    lead: "El scrap no baja controlando más fuerte al final de la línea. Baja cuando el defecto se detecta en el momento en que se produce, porque ahí todavía se puede corregir la causa en lugar de descartar la consecuencia.",
    body: [
      "El control por muestreo funciona sobre un supuesto: que lo que pasa en la muestra representa al lote. En una línea que produce miles de piezas por turno, ese supuesto se rompe seguido, y lo que se rompe con él es la confianza en el número de calidad.",
      "Cuando el defecto se descubre en el armado, o en el cliente, ya se agregó valor sobre una pieza que había que tirar. El costo real no es el material: es el tiempo de máquina, la mano de obra, el flete y —si llegó al cliente— la penalización y la nota de crédito.",
      "Y hay un costo que no se contabiliza nunca: nadie sabe qué proporción del lote estaba igual. Ante un reclamo se bloquea más producto del necesario, porque no hay registro de qué salió realmente de la línea ese turno.",
    ],
    solution:
      "Una cámara sobre la línea inspecciona el 100 % de lo que pasa, con el mismo criterio en todos los turnos, y le dicta el rechazo al PLC sin frenar la producción.",
    modules: ["control-de-calidad"],
    worstIn: {
      slug: "autopartista",
      note: "En autopartes el defecto no se paga en scrap: se paga en penalización del cliente.",
    },
  },
  {
    slug: "paradas",
    name: "Reducir paradas de máquina",
    pain: "No sé qué máquina me frena",
    h1: "Cómo saber qué máquina te frena y cuánto te cuesta",
    seoTitle: "Cómo reducir las paradas de máquina en planta",
    seoDescription:
      "Las paradas no se reducen sumando turnos: se reducen cuando cada parada queda con su motivo y se puede ver cuál conviene atacar primero.",
    lead: "Toda planta sabe que la línea se frena. Lo que casi ninguna tiene es cuántas veces, por cuánto tiempo y por qué motivo, y sin eso no hay nada que priorizar.",
    body: [
      "El parte de producción se arma al día siguiente, en una planilla, con lo que recuerda el encargado. Las paradas cortas —las que suman más al final del mes— no llegan a anotarse, así que el registro subestima justamente lo que más cuesta.",
      "Sin la causa anotada, la conversación de la reunión de producción es sobre quién tuvo la culpa y no sobre qué pasó. Y la misma parada vuelve el mes siguiente, porque nunca se identificó como recurrente.",
      "Lo que se pierde no es sólo tiempo de máquina: es capacidad que se compensa con horas extra o con una máquina nueva que quizás no hacía falta. Antes de invertir en capacidad conviene saber cuánta se está perdiendo.",
    ],
    solution:
      "La parada se detecta sola y el operario le pone la causa desde el puesto con dos toques. A fin de mes están ordenadas por motivo, y ahí se ve cuál conviene atacar primero.",
    modules: ["tymeo"],
    worstIn: {
      slug: "alimentos",
      note: "En alimentos, cada cambio de formato y cada limpieza es una parada programada que nadie está midiendo.",
    },
  },
  {
    slug: "inventario-descuadrado",
    name: "Inventario que no cuadra",
    pain: "El sistema dice que está y en el rack no está",
    h1: "Cómo cuadrar el inventario sin parar el depósito",
    seoTitle: "Inventario que no cuadra con el sistema: cómo resolverlo",
    seoDescription:
      "El inventario no se ordena con un conteo anual: se ordena contando algunas posiciones por día, sin frenar la operación, y resolviendo la diferencia el mismo día.",
    lead: "El inventario no se ordena con un conteo general una vez por año. Se ordena contando algunas posiciones por día, mientras el depósito opera, y resolviendo la diferencia el mismo día en que aparece.",
    body: [
      "El conteo general tiene dos problemas: obliga a parar la operación un fin de semana, y para cuando termina ya vuelve a estar desactualizado. Es una foto de un depósito que se mueve todos los días.",
      "Mientras la diferencia no se detecta, se paga en otro lado: pedidos que salen incompletos, compras de material que ya estaba, y horas de gente buscando algo que el sistema dice que está.",
      "Y cuando la diferencia aparece semanas después, ya no se puede saber en qué momento se generó. Sin eso no hay causa que corregir: sólo un ajuste de sistema que va a tener que repetirse.",
    ],
    solution:
      "El operario cuenta por posición desde el celular y la diferencia contra el sistema aparece en el momento. Para las posiciones altas y las cámaras de frío, donde el conteo manual no se hace, va el dron.",
    modules: ["stock-en-posiciones", "sobrestock-drones"],
    worstIn: {
      slug: "logistica",
      note: "En un centro de distribución, el descuadre se paga en el pedido que sale incompleto.",
    },
  },
  {
    slug: "recepcion",
    name: "Acelerar la recepción",
    pain: "El camión espera y la planilla se llena a mano",
    h1: "Cómo acelerar la recepción sin poner más gente",
    seoTitle: "Cómo acelerar la recepción de mercadería en depósito",
    seoDescription:
      "La recepción se acelera cuando el control ocurre mientras se descarga y el dato entra al sistema una sola vez, no cuando se suma gente al muelle.",
    lead: "La recepción se acelera de una sola forma: que el control ocurra mientras se descarga y que el dato entre al sistema una vez. Sumar gente al muelle acelera un poco y duplica el trabajo administrativo.",
    body: [
      "Hoy el circuito tiene tres pasos donde debería haber uno: se descarga, se anota en una planilla, y después alguien carga esa planilla en el sistema. Cada paso agrega tiempo y agrega la posibilidad de un error de transcripción.",
      "Mientras eso pasa, el camión espera. Lo que se demora en el muelle se paga en flete, en penalización del proveedor de transporte o en horas de gente que no puede hacer otra cosa.",
      "Y la diferencia contra el remito aparece días después, cuando el camión ya se fue. Ese es el único momento en que el reclamo al proveedor tenía fuerza, y se perdió.",
    ],
    solution:
      "Una cámara en el muelle cuenta y controla mientras se descarga, compara contra el remito ahí mismo, y envía lo recibido al WMS sin recarga manual.",
    modules: ["recepcion"],
    worstIn: {
      slug: "logistica",
      note: "En un centro de distribución la recepción es el cuello de botella de toda la operación.",
    },
  },
  {
    slug: "accidentes",
    name: "Prevenir accidentes",
    pain: "Me entero del incidente por el parte del día siguiente",
    h1: "Cómo enterarte del riesgo antes del accidente",
    seoTitle: "Cómo prevenir accidentes en planta con las cámaras que ya tenés",
    seoDescription:
      "Las cámaras de seguridad de la planta pueden avisar de un acceso a zona restringida o de la falta de protección en menos de 2 segundos, mientras está pasando.",
    lead: "Casi toda planta tiene cámaras y casi ninguna las usa para prevenir: se miran después, para entender qué pasó. El cambio es que avisen mientras está pasando.",
    // Los tres párrafos están escritos sobre condiciones de riesgo y no sobre conducta
    // individual. Es la única de las cinco que puede leerse como vigilancia del personal.
    body: [
      "El sistema de CCTV está instalado, amortizado y grabando. Pero nadie puede mirar doce pantallas al mismo tiempo, así que en la práctica no se mira ninguna hasta que hay un incidente que investigar.",
      "Se sabe en qué sectores no se usa la protección y qué maniobras son riesgosas. Lo que falta no es el diagnóstico: es el aviso en el momento en que ocurre, a alguien que pueda intervenir.",
      "El incidente que aparece en el parte del día siguiente ya costó. Y el que no llegó a incidente —la maniobra que salió bien esta vez— no queda registrado en ninguna parte, así que no se corrige.",
    ],
    solution:
      "El análisis corre sobre el video que ya se está grabando y la alarma sale en menos de dos segundos. No hace falta cambiar una cámara ni tirar un cable nuevo.",
    modules: ["camaras-inteligentes"],
    worstIn: {
      slug: "logistica",
      note: "En un depósito, el tránsito de autoelevadores es donde el riesgo es más constante.",
    },
  },
];

export const publishedIndustries = () => INDUSTRIES.filter((i) => i.published);
