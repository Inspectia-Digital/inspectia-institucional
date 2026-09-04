import type { IconConcept } from "@/components/icons/inspectia-icons";

/**
 * Los ocho módulos de InspectIA OS, en un solo lugar.
 *
 * De acá comen el mega-menú, la grilla de la home, el plano de planta interactivo, las
 * ocho páginas de módulo y la matriz de industria por módulo de /soluciones. Escribir los
 * ocho módulos en cinco archivos distintos es cómo terminan desincronizados.
 *
 * Regla que atraviesa todo el sitio (§6): **la web describe la solución y nada más**.
 * No hay ni va a haber un campo de estado. Ningún módulo se marca como disponible, en
 * desarrollo, próximamente, beta ni lista de espera, ni acá ni en el menú ni en las cards.
 * Qué está habilitado para cada cliente lo informa la aplicación cuando entra.
 */
export type ModuleKey =
  | "tymeo"
  | "control-de-calidad"
  | "recepcion"
  | "stock-en-posiciones"
  | "sobrestock-drones"
  | "camaras-inteligentes"
  | "control-de-pedidos"
  | "agente";

/** Un número siempre va con su unidad y su período. Sin eso no se publica (§10.1). */
export type ModuleProof = {
  value: string;
  /** Unidad y período. "en una planta autopartista", "por planta y mes". */
  caption: string;
};

/** Punto del módulo sobre la vista isométrica. Coordenadas en porcentaje y nunca en px:
 *  el marco es fluido y en px los puntos se despegan del dibujo al cambiar el ancho. */
export type ModuleHotspot = {
  left: string;
  top: string;
  /** De qué lado del punto se abre el modal, para que no se salga del marco. */
  side: "top" | "bottom";
  align: "left" | "center" | "right";
};

export type PlatformModule = {
  key: ModuleKey;
  /** 01–08, con cero adelante, en mono. */
  number: string;
  name: string;
  /** La promesa de una línea de §6. Tope de dos líneas en la card. */
  promise: string;
  /** Qué resuelve, dos líneas, para el modal del plano. Sin precio, sin captura. */
  summary: string;
  /** Qué hace falta para ponerlo a andar. Una línea. */
  needs: string;
  /** El dato que lo sostiene. null en los cuatro que el equipo todavía no definió:
   *  antes que publicar un número inventado, la sección no muestra número. */
  proof: ModuleProof | null;
  /** Concepto del léxico de iconos, no el componente. Guardar el glifo acá ataba un
   *  archivo de contenido a una librería de UI, y hacía que cambiar el icono de un
   *  módulo fuera tocar contenido. Ahora el glifo se resuelve en `components/icons`. */
  icon: IconConcept;
  /** Segmento de URL. La ruta es /plataforma/$modulo, así que el Link va tipado
   *  con params y no con un string armado a mano. */
  slug: string;
  hotspot: ModuleHotspot | null;
  /** En qué otros módulos se apoya (§7.2, punto 3). */
  buildsOn: ModuleKey[];
  /**
   * Módulos con los que se combina, para el caso en que ni la relación directa
   * (`buildsOn`) ni la inversa den resultado. Sin esto hay páginas que quedan sin una
   * sola salida a otro módulo, y son justamente las que más la necesitan.
   */
  pairsWith?: ModuleKey[];
  /** URL de la web anterior, para la redirección 301 (§9). */
  legacyPath?: string;

  /* ---------- Contenido largo de la página de módulo ----------
     Los seis son opcionales: donde un módulo no los tenga, la sección no se renderiza,
     igual que ya pasa con `proof` y con el modelo de ROI. Se van llenando de a uno. */

  /** El titular de la página. Distinto de `promise`: la promesa describe el módulo y
   *  sirve para las cards y la meta description; el h1 tiene que ganarse el scroll. */
  h1?: string;
  /** Bajada del hero. Más larga que `summary`, que es para el modal del plano. */
  lead?: string;
  /** Tres a cinco síntomas, en las palabras del cliente. Sin tecnología. */
  problem?: string[];
  /** Tres o cuatro capacidades. Un bloque, una capacidad. */
  does?: { title: string; body: string }[];
  /** Cinco preguntas. Alimenta faqJsonLd(). */
  faq?: { q: string; a: string }[];

  /** El nombre del módulo no es un término de búsqueda: nadie busca "TYMEO". Cuando
   *  existe, este campo es el que va al title. */
  seoTitle?: string;
  /** Meta description propia. Sin esto se usa `promise`. */
  seoDescription?: string;

  /* ---------- Encabezados que cambian de módulo a módulo ----------
     Van en los datos y no en la ruta: la plantilla sirve a los ocho, así que un H2
     escrito en el componente obligaría a un condicional por módulo adentro del JSX. */

  /** H2 de "Qué hace". */
  doesTitle?: string;
  /** H2 del acordeón de preguntas. Sin esto, "Preguntas sobre {name}". */
  faqTitle?: string;
  /** H2 y bajada de la sección de la calculadora. */
  roiTitle?: string;
  roiLead?: string;
  /** Ancla del enlace a la calculadora en el hero. Sin esto no hay enlace. */
  roiLinkLabel?: string;
  /** Encabezados del bloque de módulos relacionados. */
  relatedEyebrow?: string;
  relatedTitle?: string;
};

export const MODULES: PlatformModule[] = [
  {
    key: "tymeo",
    number: "01",
    name: "TYMEO",
    promise:
      "OEE en tiempo real, paradas clasificadas y plan contra real, por turno, línea, puesto y operario.",
    summary:
      "Muestra cómo está produciendo cada línea ahora y por qué se frenó. Las paradas quedan clasificadas, no anotadas en un cuaderno.",
    needs: "Nada al principio: se carga a mano. Los sensores y lectoras se suman después.",
    // El proof anterior era un precio, no una prueba, y en esta página convive con la
    // calculadora. El precio vive en la sección de planes, que es su lugar.
    proof: {
      value: "1 a 10 días",
      caption: "de la reunión de arranque a los datos corriendo en producción",
    },
    icon: "oee",
    slug: "tymeo",
    hotspot: { left: "44.9%", top: "23.8%", side: "bottom", align: "center" },
    buildsOn: [],
    legacyPath: "/tymeo",

    h1: "Sabé qué te frena la línea, turno por turno",
    lead: "TYMEO mide el OEE de cada línea en tiempo real, detecta cuándo se frenó y te deja clasificar por qué. Con eso sabés qué máquina te cuesta plata, en qué turno y con qué producto. Empezás gratis cargando los datos a mano y automatizás la captura cuando quieras.",
    seoTitle: "Software de OEE en tiempo real, con plan gratis",
    seoDescription:
      "Medí el OEE de cada línea en tiempo real, con las paradas clasificadas y el plan contra real por turno, línea y operario. Empezá gratis, sin hardware.",
    doesTitle: "Cuatro cosas, y las cuatro salen del mismo dato",
    faqTitle: "Preguntas sobre TYMEO",
    roiTitle: "Cuánto vale un punto de OEE en tu línea",
    roiLead:
      "Poné el volumen y el costo de tu línea, y elegí el plan. La matriz muestra cómo cambia el retorno según cuánto OEE recuperes, porque cuánto vas a recuperar es justamente lo que no se sabe de antemano. Sin registrarte y con los supuestos a la vista.",
    roiLinkLabel: "Calcular el retorno de tu línea",
    relatedEyebrow: "Se apoyan en TYMEO",
    relatedTitle: "Con el dato de producción ya cargado, estos suman solos",

    // El orden importa: la última es el argumento comercial central del producto.
    problem: [
      "El parte de producción se arma en una planilla, al día siguiente, y con lo que se acuerda el encargado.",
      "Sabés que la línea se frena, pero no cuántas veces ni por cuánto tiempo.",
      "Cuando no se llegó al plan, la discusión es sobre quién tuvo la culpa y no sobre qué pasó.",
      "Tenés el número de producción del mes, pero no podés compararlo entre turnos ni entre líneas.",
      "Comprar una máquina nueva parece la única salida, y no sabés si el problema es la máquina.",
    ],

    does: [
      {
        title: "OEE en tiempo real, no a fin de mes",
        body: "Ves la disponibilidad, el rendimiento y la calidad de cada línea mientras el turno está corriendo, y el OEE que resulta de las tres. Si algo se cae, te enterás cuando todavía se puede corregir.",
      },
      {
        title: "Las paradas quedan con su motivo",
        body: "La parada se detecta sola y el operario le pone la causa desde el puesto, con dos toques. Al final del mes tenés las paradas ordenadas por motivo, no una bolsa de minutos perdidos: ahí se ve cuál conviene atacar primero.",
      },
      {
        title: "Plan contra real, línea por línea",
        body: "Cargás lo que había que producir y lo comparás con lo que salió, con la desviación a la vista. La reunión de producción deja de arrancar discutiendo de qué número estamos hablando.",
      },
      {
        title: "Todo cruzable: turno, línea, puesto, producto y operario",
        body: "La misma información mirada por donde te haga falta. Es lo que permite descubrir que el problema no es la máquina sino el cambio de formato del turno noche.",
      },
    ],

    faq: [
      {
        q: "¿Cómo mide el OEE si mi máquina no tiene sensores?",
        a: "Al principio, con carga manual: el operario registra desde un formulario qué produjo y cuándo se frenó la línea, y TYMEO calcula el OEE con eso. Es exacto en la medida en que se cargue bien, y alcanza para tener el número y empezar a comparar turnos. Cuando querés que el dato se tome solo, se agrega un sensor o una lectora en el puesto.",
      },
      {
        q: "¿Los operarios lo van a usar?",
        a: "Es la pregunta correcta, porque si no lo usan no hay dato. La pantalla del puesto está pensada para eso: se maneja de pie y con guantes, muestra sólo lo del turno en curso y clasificar una parada son dos toques. No hay que escribir nada.",
      },
      {
        q: "¿Qué diferencia hay con un MES?",
        a: "Un MES gobierna la ejecución completa de la producción y es un proyecto de meses, con licencia por puesto. TYMEO resuelve una parte —medir, detectar paradas y comparar plan contra real— y arranca gratis en una línea. Si más adelante necesitás el resto, se suman los módulos que hagan falta sin migrar nada.",
      },
      {
        q: "¿Se conecta con mi ERP?",
        a: "Sí, y no es obligatorio. Podés usar TYMEO sin conectar nada y sumar la integración cuando quieras que el plan de producción entre solo o que la producción del turno vaya al sistema de gestión.",
      },
      {
        q: "¿Cuánto tarda en estar andando?",
        a: "El plan gratuito, el mismo día. Con hardware para que la captura sea automática, entre 1 y 10 días desde la reunión de arranque: relevamiento, configuración de la planta, conectividad, dos días de piloto y la puesta en producción.",
      },
    ],
  },
  {
    key: "control-de-calidad",
    number: "02",
    name: "Control de calidad",
    promise:
      "Visión artificial sobre la línea: detecta el defecto y dicta el rechazo al PLC, sin frenar la producción.",
    summary:
      "Mira cada pieza que pasa y marca la que sale mal. Si hay que descartarla, se lo indica a la máquina sin que nadie intervenga.",
    needs: "Una cámara sobre la línea y, si hay que descartar, conexión al PLC.",
    proof: {
      value: "70 tipos de falla",
      caption: "en menos de 1 minuto, en una planta autopartista",
    },
    icon: "visionInspection",
    slug: "control-de-calidad",
    hotspot: { left: "49.3%", top: "36.9%", side: "bottom", align: "center" },
    buildsOn: ["tymeo"],
    // La web anterior le daba a este módulo la página de la vertical entera.
    legacyPath: "/manufactura",

    h1: "Que no salga de la planta una pieza que no debería salir",
    lead: "Una cámara sobre la línea mira cada pieza que pasa y marca la que sale mal. Si hay que descartarla, se lo indica a la máquina sin que nadie intervenga. Inspecciona el 100 % de lo que produce la línea, no una muestra por lote.",
    // "en la línea" se recorta del seoTitle: el título completo daba 64 caracteres y
    // Google corta en 60. Se saca eso antes que "visión artificial", que es el término.
    seoTitle: "Control de calidad con visión artificial",
    seoDescription:
      "Inspección del 100 % de lo que produce la línea: la cámara detecta el defecto y le dicta el rechazo al PLC, sin frenar la producción. Sin muestreo.",
    doesTitle: "El 100 %, con el mismo criterio siempre",
    faqTitle: "Preguntas sobre control de calidad",
    roiTitle: "Cuánto te cuesta hoy el scrap",
    roiLead:
      "Poné cuánto produce la línea, qué porcentaje se va en rechazo y cuánto vale cada pieza. Sin registrarte y con los supuestos a la vista.",
    roiLinkLabel: "Calcular cuánto te cuesta el scrap",

    // El quinto instala por qué hace falta una máquina y no más gente, y va último.
    problem: [
      "El control es por muestreo, así que lo que no cae en la muestra sale como si estuviera bien.",
      "El criterio cambia según quién esté en la estación y qué hora del turno sea.",
      "El defecto se descubre en el armado, o en el cliente, cuando ya se agregó valor sobre una pieza que había que tirar.",
      "Hay una devolución cada tanto y nadie puede decir cuántas piezas del lote estaban igual.",
      "Poner una persona a mirar el 100 % no cierra por costo, y aun así se le escapan.",
    ],

    does: [
      {
        title: "Inspecciona todo lo que pasa, no una muestra",
        body: "Cada pieza que sale de la línea queda revisada, con el mismo criterio a las tres de la tarde y a las cuatro de la mañana. Deja de haber lotes sobre los que no sabés nada.",
      },
      {
        title: "Le dicta el rechazo a la máquina",
        body: "Cuando la pieza no pasa, InspectIA le da la orden al PLC y el descarte ocurre solo. La línea no se frena y no hace falta que alguien esté mirando la pantalla.",
      },
      {
        title: "Aprende tus defectos, no defectos genéricos",
        body: "El modelo se entrena con las piezas de tu planta y con lo que tu equipo de calidad considera un rechazo. En un caso autopartista llegó a 70 tipos de falla distintos.",
      },
      {
        title: "Queda el registro de cada pieza",
        body: "Con la foto y el momento. Cuando hay un reclamo podés reconstruir qué salió de la línea ese turno, en lugar de discutir sobre un lote entero.",
      },
    ],

    faq: [
      {
        q: "¿Detecta el defecto que tengo yo?",
        a: "Eso se responde con tus piezas, no con un folleto. El modelo se entrena con lo que produce tu línea y con lo que tu equipo de calidad marca como rechazo, así que el alcance depende de que el defecto se vea. En una planta autopartista llegamos a 70 tipos de falla distintos, controlados en menos de un minuto.",
      },
      {
        q: "¿Tengo que cambiar la línea o la maquinaria?",
        a: "No. Hace falta una cámara mirando el punto donde se ve el defecto y, si querés que el descarte sea automático, la conexión al PLC que ya tiene la máquina. La línea sigue funcionando como funciona hoy.",
      },
      {
        q: "¿Sirve la cámara que ya tengo?",
        a: "Depende de dónde esté y de qué tenga que verse: una cámara de seguridad casi nunca está en el ángulo ni con la iluminación que necesita una inspección. En el relevamiento se define qué se puede usar y qué hay que agregar, y si hace falta la cámara la conseguimos por el marketplace.",
      },
      {
        q: "¿Qué pasa con los falsos rechazos?",
        a: "Se miden y se ajustan. Al principio conviene correr la inspección en paralelo al control actual: comparás lo que marca el sistema con lo que decide tu equipo y se calibra sobre eso, antes de dejarlo dictando descartes.",
      },
      {
        q: "¿Frena la línea?",
        a: "No. La inspección corre al ritmo de la producción y el rechazo se dicta sobre la marcha. Si el sistema se cae, la línea sigue produciendo: lo que se pierde es la inspección, no la producción.",
      },
    ],
  },
  {
    key: "recepcion",
    number: "03",
    name: "Recepción de mercadería",
    promise: "La descarga y el control de lo que entra, medidos y sin planilla.",
    summary:
      "Cuenta y controla la mercadería entregada por los proveedores. Se integra con el pedido y devuelve el ingreso al WMS.",
    needs: "Una cámara en el muelle de descarga.",
    proof: {
      value: "De 24 a 15 operarios",
      caption: "y lead time de 48 a 30 horas, en un centro de distribución",
    },
    icon: "inbound",
    slug: "recepcion",
    hotspot: { left: "33.5%", top: "44.7%", side: "bottom", align: "center" },
    buildsOn: [],
    // Ni la relación directa ni la inversa dan resultado acá, así que sin esto la página
    // quedaría sin una sola salida a otro módulo.
    pairsWith: ["stock-en-posiciones", "control-de-pedidos"],
    legacyPath: "/recepcion",

    h1: "Descargá, controlá y cargá al sistema en un solo paso",
    lead: "Una cámara en el muelle cuenta y controla lo que baja del camión. Cada bulto queda registrado con hora y foto, y el depósito se entera solo: no hay planilla que llenar ni carga que rehacer después en el sistema.",
    seoTitle: "Software de recepción de mercadería en depósito",
    seoDescription:
      "Controlá lo que baja del camión sin planilla: cada bulto queda registrado con hora y foto, y el depósito se entera solo. De 24 a 15 operarios en el muelle.",
    doesTitle: "El control pasa a ocurrir mientras se descarga",
    faqTitle: "Preguntas sobre recepción de mercadería",
    roiTitle: "Cuánto te cuesta hoy el muelle",
    roiLead:
      "Poné cuánta gente tenés en la recepción, cuántas horas tarda hoy y cuánto movés por mes. Sin registrarte y con los supuestos a la vista.",
    roiLinkLabel: "Calcular cuánto te cuesta la recepción",
    relatedEyebrow: "Se combina con",
    relatedTitle: "En el depósito, estos tres se usan juntos",

    problem: [
      "El camión espera, y lo que se demora en el muelle se paga en flete o en penalización.",
      "Lo que entra se anota a mano en una planilla y después alguien lo vuelve a cargar en el sistema.",
      "La diferencia con el remito aparece días después, cuando ya no se puede reclamar.",
      "Cuando falta un bulto no hay con qué probar si llegó, así que la discusión con el proveedor se pierde sola.",
      "En los picos de recepción hay que poner más gente, y esa gente hace el mismo trabajo dos veces.",
    ],

    does: [
      {
        title: "Cuenta y controla en el momento de la descarga",
        body: "La cámara registra lo que baja del camión mientras baja. El control deja de ser un paso posterior que alguien tiene que hacer con una planilla en la mano.",
      },
      {
        title: "Compara contra el remito y marca la diferencia ahí mismo",
        body: "Si lo que llegó no coincide con lo que decía venir, aparece antes de que el camión se vaya. Ese es el único momento en que el reclamo al proveedor tiene fuerza.",
      },
      {
        title: "Cada bulto queda con foto y hora",
        body: "Cuando aparece un faltante o un daño, no hay que reconstruir nada: está registrado qué llegó, cuándo y en qué estado.",
      },
      {
        title: "El dato entra al sistema una sola vez",
        body: "Lo recibido se envía al WMS o al ERP sin recarga manual. Se elimina el doble trabajo, que es donde estaba la mitad del costo del muelle.",
      },
    ],

    faq: [
      {
        q: "¿Se conecta con mi WMS?",
        a: "Sí. Lo recibido se envía al sistema del depósito por API, así que no hay que recargarlo a mano. También podés usarlo sin conectar nada y sumar la integración después.",
      },
      {
        q: "¿Qué pasa con la mercadería que llega sin etiqueta o mal paletizada?",
        a: "Es el caso normal en recepción y por eso el control es por cámara y no por lectura de código. Lo que no se puede identificar queda marcado como excepción para que alguien lo resuelva, en lugar de trabar toda la descarga.",
      },
      {
        q: "¿Necesito cambiar cómo trabaja el muelle?",
        a: "No. La idea es que la descarga siga siendo la que es y el control ocurra mientras pasa. Lo que cambia es que deja de haber un segundo paso de carga al sistema.",
      },
      {
        q: "¿Cuántas cámaras hacen falta?",
        a: "Depende de cuántas posiciones de descarga tengas y de cómo entra la mercadería. Se define en el relevamiento, que no tiene cargo, y si hay que comprarlas las conseguimos por el marketplace.",
      },
      {
        // Dice cuándo el módulo no conviene. En una venta a PyME industrial, un proveedor
        // que descalifica su propio producto para un caso gana más de lo que pierde.
        q: "¿Sirve si recibo poco volumen?",
        a: "El ahorro grande está donde hay varios camiones por día y gente asignada al muelle. Con volumen bajo el retorno es más lento, y en ese caso conviene empezar por otro módulo: te lo decimos en la demo antes de venderte esto.",
      },
    ],
  },
  {
    key: "stock-en-posiciones",
    number: "04",
    name: "Control de stock en posiciones",
    promise: "Conteo por posición desde el celular, contra lo que dice el WMS.",
    summary:
      "El operario cuenta desde el celular, posición por posición, y la diferencia contra el sistema aparece en el momento.",
    needs: "Un celular Android por operario.",
    // TODO(equipo): falta el dato publicable (§15.1). Bloquea el bloque de números
    // de la página de módulo y su calculadora.
    proof: null,
    icon: "mobileCount",
    slug: "stock-en-posiciones",
    hotspot: { left: "69.5%", top: "32.7%", side: "bottom", align: "right" },
    buildsOn: [],
    legacyPath: "/stock-picking",

    h1: "Que el inventario del sistema sea el del depósito",
    lead: "El operario cuenta desde el celular, posición por posición, y la diferencia contra el sistema aparece en el momento. Se cuenta mientras el depósito sigue operando: no hace falta parar un fin de semana para tener el inventario al día.",
    seoTitle: "Control de stock por posición desde el celular",
    seoDescription:
      "Conteo cíclico por posición sin parar el depósito: el operario cuenta desde el celular y la diferencia contra el WMS aparece en el momento.",
    doesTitle: "Contar deja de ser un operativo",
    faqTitle: "Preguntas sobre control de stock",
    roiTitle: "Cuánto te cuesta hoy el inventario descuadrado",
    roiLead:
      "Poné cuántas posiciones tiene tu depósito, cada cuánto contás y cuánto vale el stock. Sin registrarte y con los supuestos a la vista.",
    roiLinkLabel: "Calcular cuánto te cuesta el descuadre",
    relatedEyebrow: "Se apoyan en este módulo",
    relatedTitle: "Con las posiciones controladas, estos suman solos",

    problem: [
      "El sistema dice que hay y en la posición no está, así que el pedido sale incompleto.",
      "Para tener el inventario al día hay que parar el depósito un fin de semana y contar todo.",
      "El conteo se hace en papel y después alguien lo pasa a una planilla, con los errores que eso trae.",
      "Cuando aparece la diferencia ya pasaron semanas y nadie puede decir en qué momento se generó.",
      "Se compra material que ya estaba en el depósito, porque el sistema decía que no.",
    ],

    does: [
      {
        title: "Conteo cíclico sin parar la operación",
        body: "Se cuentan algunas posiciones por día, en los huecos de la operación, en lugar de todo el depósito de una vez. El inventario se mantiene al día sin frenar nada.",
      },
      {
        title: "La diferencia aparece en el momento",
        body: "El operario cuenta la posición y ahí mismo ve si coincide con lo que dice el sistema. Cuando no coincide, se resuelve el mismo día y no tres semanas después.",
      },
      {
        title: "Desde el celular, sin papel",
        body: "Se cuenta en el pasillo con el teléfono en la mano y el dato ya queda cargado. No hay planilla que pasar después ni transcripción donde se pierda información.",
      },
      {
        title: "Contra lo que dice tu WMS",
        body: "El control se hace contra el sistema que ya usás, así que lo que se corrige se corrige donde estaba el error. No es un inventario paralelo.",
      },
    ],

    faq: [
      {
        q: "¿Necesito comprar lectoras o terminales?",
        a: "No. Se usa el celular Android del operario o uno común de gama baja. Es el módulo con el requisito más chico de todos: no hay hardware que comprar para empezar.",
      },
      {
        q: "¿Reemplaza a mi WMS?",
        a: "No, trabaja contra él. El WMS sigue siendo el sistema del depósito; lo que hace este módulo es controlar que lo que dice coincida con lo que hay en la posición, y marcar dónde no.",
      },
      {
        q: "¿Hay que etiquetar las posiciones?",
        a: "Las posiciones tienen que poder identificarse de alguna forma. Si el depósito ya está etiquetado, se usa lo que hay; si no, el etiquetado es parte de la puesta en marcha y se define en el relevamiento.",
      },
      {
        q: "¿Cuánto tiempo le lleva al operario?",
        a: "Contar una posición son segundos y se hace en los huecos del turno, no como tarea aparte. La idea es justamente dejar de asignar gente a contar.",
      },
      {
        q: "¿Sirve si tengo pocas posiciones?",
        a: "Sí, y arranca bien ahí: cuanto más chico el depósito, más rápido se ordena. El requisito es un celular, así que probarlo en un sector no tiene costo de hardware.",
      },
    ],
  },
  {
    key: "sobrestock-drones",
    number: "05",
    name: "Sobrestock con drones",
    promise: "Inventario aéreo de posiciones altas y cámaras de frío, sin subir a nadie.",
    summary:
      "Un dron recorre las posiciones altas y las cámaras de frío, y avisa dónde no coincide. Nadie tiene que subir a un rack a mirar.",
    needs: "Un dron y lugar para que despegue. No necesita GPS.",
    proof: { value: "USD 200", caption: "por mes y cliente final" },
    icon: "drone",
    slug: "sobrestock-drones",
    hotspot: { left: "57.6%", top: "13.8%", side: "bottom", align: "center" },
    buildsOn: ["stock-en-posiciones"],
    legacyPath: "/drones",

    h1: "Nadie más sube a contar posiciones en altura",
    lead: "Un dron recorre los pasillos, lee las etiquetas de las posiciones altas y avisa dónde no coincide con el sistema. Los hallazgos entran a tu WMS por API, sin planilla intermedia. No hace falta GPS ni cortar la operación.",
    // "en depósito" se recorta: el título completo daba 64 caracteres. Y el término es
    // "inventario con drones", no "Indrone": nadie busca la marca.
    seoTitle: "Inventario con drones, sin subir a nadie",
    seoDescription:
      "Un dron recorre las posiciones altas y las cámaras de frío y avisa dónde no coincide. Los hallazgos entran a tu WMS por API. Desde USD 200 por mes.",
    doesTitle: "El punto ciego del depósito deja de ser ciego",
    faqTitle: "Preguntas sobre inventario con drones",
    // Sin modelo propio: el enlace del hero va a la calculadora sin módulo.
    roiLinkLabel: "Calcular el retorno del inventario aéreo",

    // El quinto es el argumento de seguridad y va último para que quede resonando.
    problem: [
      "Las posiciones altas se cuentan una vez por año, o cuando aparece un problema grande.",
      "Para verificar una posición en altura hay que sacar un autoelevador y a alguien que suba.",
      "En cámara de frío nadie quiere estar el tiempo que lleva contar bien.",
      "Hay sobrestock arriba y se compra material que ya estaba, porque nadie lo vio.",
      "Un conteo en altura es un riesgo de accidente que no compensa el dato que devuelve.",
    ],

    // Ninguno habla de autonomía, sensores ni algoritmos de navegación: el dron no es el
    // producto, es la forma de tomar el dato. "Sin piloto y sin GPS" es toda la
    // especificación técnica que vale la pena, porque resuelve una objeción real.
    does: [
      {
        title: "Vuela solo por los pasillos",
        body: "Recorre el recorrido definido sin piloto y sin GPS, en interiores y en cámara de frío. No hace falta cortar la operación ni despejar el pasillo.",
      },
      {
        title: "Lee las posiciones altas",
        body: "Identifica qué hay en cada posición de los niveles a los que hoy nadie llega sin autoelevador, y detecta las que están vacías.",
      },
      {
        title: "Marca dónde no coincide con el sistema",
        body: "El resultado no es un video para que alguien mire: es la lista de posiciones donde lo que hay difiere de lo que dice el WMS.",
      },
      {
        title: "Los hallazgos entran a tu sistema por API",
        body: "Sin planilla intermedia y sin recarga manual. El conteo aéreo es otro dato de la plataforma, no un informe aparte que después hay que procesar.",
      },
    ],

    faq: [
      {
        q: "¿Hay que cortar la operación para que vuele?",
        a: "No. El vuelo se programa en los huecos del turno o en el cambio, y recorre pasillos sin necesidad de despejarlos. La idea es justamente dejar de hacer operativos de conteo.",
      },
      {
        q: "¿Funciona sin GPS y en cámara de frío?",
        a: "Sí. La navegación no depende de GPS, así que funciona en interiores, y está pensado para operar en cámara de frío, que es donde el conteo manual es más caro y más incómodo.",
      },
      {
        q: "¿Quién lo hace volar?",
        a: "Nadie: el recorrido es autónomo. Lo que necesita es un lugar de despegue y que el recorrido esté definido, y eso se hace una vez en la puesta en marcha.",
      },
      {
        q: "¿Reemplaza al conteo por celular?",
        a: "No, lo complementa. El conteo por celular resuelve lo que está al alcance de la mano; el dron resuelve las posiciones altas y las cámaras de frío, que es donde el conteo manual no se hace o se hace mal.",
      },
      {
        // TODO(equipo): escrita a propósito sin comprometerse. No está definido si el
        // equipo se vende, se alquila o va incluido, y contestarlo mal es una promesa
        // comercial. Cuando se defina, la respuesta se reescribe entera.
        q: "¿Qué pasa con el equipo, lo compro yo?",
        a: "Se define según el depósito y el alcance del recorrido. En la demo se ve qué conviene en tu caso.",
      },
    ],
  },
  {
    key: "camaras-inteligentes",
    number: "06",
    name: "Cámaras inteligentes",
    promise:
      "Las cámaras de seguridad que ya tenés, controlando la operación y previniendo accidentes.",
    summary:
      "Avisa de un acceso a una zona restringida, de alguien sin el equipo de protección puesto o de una maniobra riesgosa, mientras está pasando.",
    needs: "Las cámaras de seguridad que ya están instaladas.",
    proof: { value: "Menos de 2 segundos", caption: "entre el hecho y la alarma" },
    icon: "camera",
    slug: "camaras-inteligentes",
    hotspot: { left: "64.7%", top: "45%", side: "bottom", align: "center" },
    buildsOn: [],
    // Ningún módulo lo incluye en su buildsOn, así que sin esto la página quedaría sin
    // ninguna salida.
    pairsWith: ["control-de-calidad", "tymeo"],

    h1: "Las cámaras que ya tenés, mirando lo que importa",
    lead: "El CCTV de la planta deja de servir sólo para mirar grabaciones después de un problema. Avisa de un acceso a una zona restringida, de alguien sin el equipo de protección puesto o de una maniobra riesgosa, mientras está pasando. Sin cambiar una cámara ni tirar un cable nuevo.",
    seoTitle: "Cámaras de seguridad que controlan la operación",
    seoDescription:
      "Las cámaras que ya tenés instaladas, detectando accesos a zonas restringidas, falta de protección y maniobras riesgosas. Alarma en menos de 2 segundos.",
    doesTitle: "Mira siempre, y avisa cuando pasa",
    faqTitle: "Preguntas sobre cámaras inteligentes",
    relatedEyebrow: "Se combina con",
    relatedTitle: "Ya que hay cámaras mirando, también pueden mirar la línea",

    // El quinto es el argumento comercial: la inversión ya está hecha, falta usarla.
    problem: [
      "Hay cámaras en toda la planta y sólo se miran cuando ya pasó algo.",
      "Nadie puede estar mirando doce pantallas al mismo tiempo, así que en la práctica no se mira ninguna.",
      "Se sabe que en ciertos sectores no se usa la protección, pero no hay con qué mostrarlo ni cuándo corregirlo.",
      "El incidente aparece en el parte del día siguiente, cuando ya no se puede evitar.",
      "La inversión en el sistema de cámaras está hecha y no devuelve nada más que grabaciones.",
    ],

    // Las cuatro están escritas sobre el proceso y la seguridad de la persona, no sobre
    // el rendimiento individual. Es el único módulo del catálogo que puede leerse como
    // vigilancia del personal, y eso hace que un gerente lo descarte por conflicto
    // sindical antes de evaluarlo. No agregar nada sobre productividad por operario,
    // tiempos por persona ni presentismo, aunque técnicamente se pueda.
    does: [
      {
        title: "Avisa en el momento, no al día siguiente",
        body: "Cuando detecta algo que no corresponde, la alarma sale en menos de dos segundos. Es la diferencia entre corregir una maniobra y leerla en un informe.",
      },
      {
        title: "Zonas restringidas y equipo de protección",
        body: "Detecta el acceso a un sector donde no hay que estar y a quien está sin el equipo que corresponde. No es una foto para archivar: es un aviso a quien puede intervenir.",
      },
      {
        title: "Cómo se trabaja, no sólo qué se roba",
        body: "El mismo sistema sirve para ver cómo se está operando: si el proceso se cumple, si hay maniobras riesgosas, si un sector está trabado.",
      },
      {
        title: "Sobre las cámaras que ya están",
        body: "No hace falta cambiar el sistema de CCTV ni tirar cables nuevos. Lo que se agrega es el análisis, y corre sobre el video que ya se está grabando.",
      },
    ],

    faq: [
      {
        q: "¿Sirven las cámaras que tengo?",
        a: "En general sí, y es el punto de partida: el análisis corre sobre el video que el sistema ya está grabando. Lo que se revisa en el relevamiento es si el ángulo y la iluminación permiten ver lo que hace falta detectar en cada sector.",
      },
      {
        q: "¿Hay que cambiar el sistema de CCTV o tirar cables?",
        a: "No. Se conecta al sistema existente. Si en algún sector falta una cámara para cubrir un punto ciego, se agrega sólo esa.",
      },
      {
        // La más importante de la página. Ponerla por escrito con esta respuesta es lo
        // que permite que el proyecto pase una discusión interna que de otro modo lo mata.
        q: "¿Esto es para controlar a la gente?",
        a: "No, y está pensado a propósito para que no lo sea. Lo que se detecta son condiciones: un acceso a una zona restringida, la falta de un equipo de protección, una maniobra riesgosa. El objetivo es evitar el accidente, no medir a la persona.",
      },
      {
        // TODO(infra): techo bajo a propósito. No ampliar con dónde se procesa el video,
        // si se guarda, cuánto tiempo, si sale de la planta o si se anonimiza.
        q: "¿Qué pasa con las grabaciones y con la privacidad?",
        a: "El video sigue viviendo en tu sistema de CCTV, con las políticas que ya tenés. Lo que agrega InspectIA es el análisis y el aviso.",
      },
      {
        q: "¿Cuánto tarda en estar andando?",
        a: "Depende de cuántos sectores quieras cubrir y de qué haya que detectar en cada uno. Se define en el relevamiento, que no tiene cargo.",
      },
    ],
  },
  {
    key: "control-de-pedidos",
    number: "07",
    name: "Control de pedidos",
    promise: "Seguimiento del pedido desde el picking hasta el despacho.",
    summary:
      "Sigue el pedido desde que se arma hasta que sube al camión, y avisa si falta algo antes de que salga.",
    needs: "Una cámara sobre la mesa de despacho.",
    // TODO(equipo): falta el dato publicable (§15.1).
    proof: null,
    icon: "outbound",
    slug: "control-de-pedidos",
    hotspot: { left: "76.1%", top: "44.5%", side: "top", align: "right" },
    buildsOn: ["stock-en-posiciones"],
    // Se renombra a propósito: "outbound" no lo busca nadie en español (§9).
    legacyPath: "/outbound",

    h1: "Sabé dónde está cada pedido sin llamar a nadie",
    lead: "Una cámara sobre la mesa de despacho controla lo que se arma y lo compara con lo que había que enviar. Si falta algo o hay algo cambiado, aparece antes de que el pedido suba al camión. Y el estado queda a la vista de quien lo tiene que responder.",
    seoTitle: "Control de pedidos, del picking al despacho",
    seoDescription:
      "Seguí cada pedido desde que se arma hasta que sube al camión, y enterate de que falta algo antes de que salga, no cuando lo reclama el cliente.",
    doesTitle: "El error se encuentra antes de que salga",
    faqTitle: "Preguntas sobre control de pedidos",

    // El dolor de este módulo no es logístico, es comercial: el pedido que sale mal se
    // paga en un cliente enojado y en una nota de crédito.
    problem: [
      "El cliente llama para preguntar por su pedido y hay que ir a preguntarle a alguien del depósito.",
      "El error de armado se descubre cuando el cliente lo recibe, y ahí ya es una nota de crédito.",
      "No se sabe en qué etapa está un pedido: si se armó, si se controló, si está esperando el camión.",
      "El control de salida se hace por muestreo o cuando el pedido es importante, y el resto sale sin mirar.",
      "Cuando hay un reclamo no hay con qué demostrar qué se despachó.",
    ],

    does: [
      {
        title: "Controla el pedido contra lo que había que enviar",
        body: "La cámara mira lo que se armó y lo compara con el pedido. Si falta un ítem o hay uno cambiado, se avisa ahí, con el pedido todavía en la mesa.",
      },
      {
        title: "El estado, a la vista",
        body: "En qué etapa está cada pedido: armado, controlado, esperando despacho, despachado. Quien atiende al cliente lo mira en lugar de ir a preguntar al depósito.",
      },
      {
        title: "Queda el registro de lo que se despachó",
        body: "Con foto y hora. Cuando hay un reclamo se muestra qué salió, en lugar de discutir sin evidencia.",
      },
      {
        title: "Con lo que ya controlaste al recibir y al guardar",
        body: "Si además usás recepción y control de stock, el mismo dato acompaña al producto de punta a punta: lo que entró, dónde estaba y qué se despachó.",
      },
    ],

    faq: [
      {
        q: "¿Se conecta con mi sistema de gestión?",
        a: "Sí. El pedido a controlar sale del sistema que ya usás —ERP o WMS— y el resultado del control vuelve ahí. También se puede empezar sin conectar nada.",
      },
      {
        q: "¿Controla el 100 % de los pedidos?",
        a: "Sí, y esa es la diferencia con el control por muestreo: no hay pedidos que salgan sin mirar porque no había tiempo o porque no era un cliente importante.",
      },
      {
        q: "¿Frena el despacho?",
        a: "No. El control ocurre mientras se arma, no como un paso extra al final. Lo que se frena es el pedido que está mal, que es justamente el que no debería salir.",
      },
      {
        // Reconoce un límite real del módulo. Decir de entrada que depende de que el
        // producto se vea evita una implementación que después no funciona.
        q: "¿Sirve si armo pedidos muy distintos entre sí?",
        a: "Depende de que lo que hay que controlar se pueda ver. Cajas cerradas iguales y productos sueltos muy variados no son el mismo problema, y eso se define en el relevamiento antes de cualquier cotización.",
      },
      {
        q: "¿Necesito control de stock para usarlo?",
        a: "No, funciona solo. Pero si además tenés las posiciones controladas, el dato es más completo: se sabe de qué posición salió cada ítem del pedido.",
      },
    ],
  },
  {
    key: "agente",
    number: "08",
    name: "Agente",
    promise: "Agentes de IA a medida sobre los datos de tu operación.",
    summary:
      "Responde en palabras qué pasó en la planta o en el depósito, con los datos que los demás módulos ya vienen guardando.",
    needs: "Nada nuevo: se apoya en los módulos que ya tengas andando.",
    // TODO(equipo): falta el dato publicable (§15.1).
    proof: null,
    icon: "agent",
    slug: "agente",
    // TODO(equipo): falta ubicar el octavo punto sobre el render isométrico. Mientras
    // sea null el módulo aparece en la grilla de cards pero no en el plano.
    hotspot: null,
    buildsOn: ["tymeo", "control-de-calidad", "recepcion", "stock-en-posiciones"],

    /* El eje de toda la página: un agente sirve si tiene datos sobre los que trabajar.
       Llegamos a este módulo después de que la planta ya generó meses de datos con los
       otros; una consultora de IA llega antes que el dato y tiene que conseguirlo.
       Cada afirmación se apoya en eso. Ni una frase sobre modelos, entrenamiento, LLM,
       prompts ni capacidades genéricas de la IA. */
    h1: "Preguntale a tu operación en lugar de armar un reporte",
    lead: "Cuando la planta ya viene midiendo con los otros módulos, hay meses de datos de producción, paradas, calidad e inventario. Un agente trabaja sobre eso: responde en palabras lo que pasó, o se encarga del proceso puntual que ningún software estándar cubre.",
    seoTitle: "Agentes de IA sobre los datos de tu planta",
    seoDescription:
      "Preguntale a tu operación en lugar de armar un reporte. Agentes construidos sobre los datos que ya generan tus módulos de producción, calidad e inventario.",
    doesTitle: "Sobre los datos que ya tenés cargados",
    faqTitle: "Preguntas sobre el módulo Agente",
    relatedEyebrow: "Se apoya en",
    relatedTitle: "Cuantos más módulos midan, más hay para preguntar",

    // Cuatro y no cinco: los cuatro son reales y un quinto forzado se nota.
    problem: [
      "El dato está, pero para sacar una respuesta hay que pedirle un reporte a alguien y esperar.",
      "Todos los lunes se rearma el mismo informe a mano, con los mismos pasos.",
      "Hay un proceso propio de la planta que ningún sistema estándar cubre, y se resuelve con planillas y correos.",
      "Cuando la gerencia pregunta algo que no está en el tablero, la respuesta llega dos días después.",
    ],

    // Tres y no cuatro: tres capacidades concretas dicen más que cuatro donde la última
    // es de relleno.
    does: [
      {
        title: "Responde preguntas de la operación",
        body: "Qué línea tuvo más paradas el mes pasado y por qué motivo, qué turno produce mejor, qué producto genera más rechazo. En palabras, sin armar una consulta ni pedir un reporte.",
      },
      {
        title: "Arma solo el informe que hoy se rearma a mano",
        body: "Si todas las semanas alguien reconstruye el mismo tablero o el mismo correo, eso se automatiza sobre los datos que ya están en la plataforma.",
      },
      {
        title: "Cubre el proceso que ningún sistema estándar contempla",
        body: "Cada planta tiene uno o dos procesos propios que se resuelven con planillas porque no hay software que los haga. Ahí es donde un agente a medida se paga.",
      },
    ],

    faq: [
      {
        // Desaconseja empezar por acá, que es lo contrario de lo que hace una página de
        // producto y exactamente lo que le da credibilidad a un módulo de IA.
        q: "¿Puedo empezar por este módulo?",
        a: "En general no conviene. Un agente trabaja sobre datos, y si la planta todavía no viene midiendo no hay sobre qué trabajar. Lo normal es arrancar por el módulo que resuelve el problema concreto y llegar a este cuando ya hay meses de historia cargada.",
      },
      {
        q: "¿En qué se diferencia de contratar una consultora de IA?",
        a: "En el punto de partida. Cuando llegamos a este módulo, tus datos de producción, paradas, calidad o inventario ya están cargados y ordenados por los otros módulos. La mayor parte del trabajo y del costo de un proyecto de IA es justamente conseguir y ordenar ese dato.",
      },
      {
        q: "¿Qué le puedo preguntar?",
        a: "Lo que esté en los datos que tus módulos generan: producción, paradas y sus motivos, plan contra real, rechazos, inventario por posición, recepciones. Lo que no se está midiendo, no se puede responder.",
      },
      {
        q: "¿Se desarrolla a medida?",
        a: "Sí, y por eso se cotiza según el caso. Se define qué tiene que resolver, con qué datos y quién lo va a usar, antes de cualquier presupuesto.",
      },
      {
        // TODO(infra): la única respuesta de una línea del sitio, y tiene que quedar así.
        // Cualquier explicación sobre aislamiento, entrenamiento o procesamiento es un
        // compromiso que define infraestructura. Si quiere agregar precisión, la reescribe.
        q: "¿Mis datos se usan para entrenar algo que use otro cliente?",
        a: "No. Cada empresa ve y usa sólo su información.",
      },
    ],
  },
];

export const MODULE_BY_KEY = new Map(MODULES.map((m) => [m.key, m]));

/** Los que tienen punto ubicado sobre el plano. */
export const PLOTTED_MODULES = MODULES.filter(
  (m): m is PlatformModule & { hotspot: ModuleHotspot } => m.hotspot !== null,
);

/** Sólo para lo que no puede usar un Link tipado: sitemap, JSON-LD, canónicas. */
export const modulePath = (m: PlatformModule) => `/plataforma/${m.slug}`;
