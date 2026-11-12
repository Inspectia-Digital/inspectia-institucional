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
      "Trazabilidad de lote y control de caducidades son requisitos, no mejoras. Son un módulo propio, y el registro de lo que se produjo en cada turno queda disponible para la auditoría sin rearmarlo a mano.",
    modules: ["produccion", "calidad", "trazabilidad"],
    published: true,
  },
  {
    slug: "autopartista",
    name: "Autopartista y metalmecánica",
    h1: "Que la pieza que sale de tu planta no vuelva con penalización",
    pain: "Una pieza que sale mal llega al cliente y vuelve con penalización.",
    /* "control de calidad en autopartes" tiene 80 impresiones en posición 17,3 y el título
       anterior —"Software de calidad y OEE para autopartistas"— no contenía esa frase:
       decía "calidad" y "autopartistas" por separado. Ahora la lleva literal y al
       principio. La descripción ya nombraba el control del 100 % de la línea, así que se
       mantiene. */
    seoTitle: "Control de calidad en autopartes y OEE por línea",
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
    modules: ["calidad", "produccion", "control-de-pedidos"],
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
    modules: ["recepcion", "stock", "sobrestock-drones", "control-de-pedidos"],
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
    modules: ["calidad", "produccion"],
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
    modules: ["produccion", "calidad", "recepcion", "stock"],
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
    modules: ["calidad", "produccion"],
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
    modules: ["calidad", "produccion", "control-de-pedidos"],
    published: true,
  },
];

/* ---------- Los casos de uso se fueron a /guias ----------
 *
 * `UseCase` y `USE_CASES` vivían acá y se mudaron a `content/guides.ts` en noviembre de
 * 2026, con 301 desde `/soluciones/casos-de-uso/*`.
 *
 * **No fue un reordenamiento.** Esas cinco páginas ya rankeaban como guías —las
 * búsquedas que les traían impresiones eran "tasa de scrap", "paradas programadas",
 * "inventario descuadrado": gente buscando cómo se hace— y estaban publicadas bajo una
 * sección que promete producto. El título y la descripción prometían una solución y el
 * contenido explicaba un problema, y eso es lo que explica el CTR de cero con 574
 * impresiones en posición 8,6.
 *
 * El cuerpo de las cinco es el mismo. Lo que cambió es dónde viven y qué prometen.
 *
 * Si hace falta cruzar industrias con problemas, el cruce ahora se hace contra `GUIDES`
 * por su campo `modules`, igual que antes contra `USE_CASES`.
 */

export const publishedIndustries = () => INDUSTRIES.filter((i) => i.published);
