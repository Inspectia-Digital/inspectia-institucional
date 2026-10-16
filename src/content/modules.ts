import type { IconConcept } from "@/components/icons/inspectia-icons";

/**
 * El catálogo de módulos de InspectIA, en un solo lugar.
 *
 * De acá comen el mega-menú, la grilla de la home, el plano de planta interactivo, las
 * páginas de módulo y la matriz de industria por módulo de /soluciones. Escribir el
 * catálogo en cinco archivos distintos es cómo terminan desincronizados.
 *
 * **Son siete módulos al frente y cinco páginas que siguen vivas detrás.** El catálogo
 * comercial de septiembre de 2026 (`Comercial/Definiciones/05` y `06`) reemplazó los ocho
 * módulos anteriores por siete —Producción, Calidad, Stock, Trazabilidad, Tareas,
 * Mantenimiento, Energía— y sacó del precio de lista todo lo que necesita un modelo para
 * capturar el dato: inspección por visión, conteo por visión, drones, lectura de
 * documentos, predictivo. Eso no desaparece: pasa a cotizarse como proyecto.
 *
 * Mientras tanto, las cinco páginas de lo que salió del frente —drones, cámaras,
 * recepción, pedidos y agente— **siguen publicadas y siguen indexables**, con
 * `frontstage: false`. No están en el menú ni en la grilla ni en el plano. Se mudan a
 * `/ia/{aplicación}` con su 301 cuando esa sección exista, en una sola operación: dejarlas
 * ahora apuntando a un destino provisorio obligaría a cambiarles el 301 dos veces, y una
 * cadena de redirecciones sobre la misma URL diluye justo lo que la redirección conserva.
 *
 * Regla que atraviesa todo el sitio (§6): **la web describe la solución y nada más**.
 * No hay ni va a haber un campo de estado. Ningún módulo se marca como disponible, en
 * desarrollo, próximamente, beta ni lista de espera, ni acá ni en el menú ni en las cards.
 * Qué está habilitado para cada cliente lo informa la aplicación cuando entra.
 */
export type ModuleKey =
  // Los siete del catálogo vigente.
  | "produccion"
  | "calidad"
  | "stock"
  | "trazabilidad"
  | "tareas"
  | "mantenimiento"
  | "energia"
  // Las cinco páginas que siguen vivas detrás, camino a /ia.
  | "recepcion"
  | "control-de-pedidos"
  | "sobrestock-drones"
  | "camaras-inteligentes"
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
  /**
   * Si está en el catálogo que el sitio muestra.
   *
   * `false` no es "deshabilitado": la página existe, responde 200 y entra al sitemap. Lo
   * único que cambia es que no aparece en el menú, en la grilla ni en el plano. Ver la
   * nota de arriba sobre por qué estas cinco esperan acá en vez de redirigir ya.
   */
  frontstage: boolean;
  /** 01–07 para los del frente, en mono. Los de atrás no llevan número. */
  number: string;
  name: string;
  /** La promesa de una línea. Tope de dos líneas en la card. */
  promise: string;
  /** Qué resuelve, dos líneas, para el modal del plano. Sin precio, sin captura. */
  summary: string;
  /** Qué hace falta para ponerlo a andar. Una línea. */
  needs: string;
  /** El dato que lo sostiene. null donde el equipo todavía no definió uno publicable:
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

  /* ---------- El catálogo comercial, tal como se publica ----------
     Texto del doc 06 §3. Las líneas "Con IA" de ese documento **no se copian acá**: en la
     página de módulo la IA es un bloque que lleva a /ia y nada más. Detallar qué hace el
     modelo dentro de la página de un módulo con precio de lista es exactamente lo que
     confunde el precio publicado con el que se cotiza. */

  /** Qué incluye, como lista de capacidades. */
  includes?: string[];
  /** Qué se desbloquea al combinarlo con otro módulo. Una o dos oraciones. */
  withOther?: string;
  /** Qué podés corregir con lo que el módulo te muestra. Tres acciones, en infinitivo
   *  conjugado a vos: es lo que separa medir de servir para algo. */
  adjusts?: string[];
  /** El límite del plan gratuito, tal cual se publica. Siempre de cantidad, nunca de
   *  funcionalidad: no existe la función premium y no hay que insinuar que existe. */
  freeTier?: string;

  /* ---------- Contenido largo de la página de módulo ----------
     Todos opcionales: donde un módulo no los tenga, la sección no se renderiza, igual que
     ya pasa con `proof` y con el modelo de ROI. Se van llenando de a uno. */

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

  /** El nombre del módulo no siempre es el término de búsqueda. Cuando existe, este campo
   *  es el que va al title. Tope de 47 caracteres: `pageHead` le suma " · InspectIA". */
  seoTitle?: string;
  /** Meta description propia. Sin esto se usa `promise`. */
  seoDescription?: string;

  /* ---------- Encabezados que cambian de módulo a módulo ----------
     Van en los datos y no en la ruta: la plantilla sirve a todos, así que un H2 escrito en
     el componente obligaría a un condicional por módulo adentro del JSX. */

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
  /* ===================================================================================
     Los siete del catálogo vigente
     =================================================================================== */
  {
    key: "produccion",
    frontstage: true,
    number: "01",
    name: "Producción",
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
    slug: "produccion",
    hotspot: { left: "44.9%", top: "23.8%", side: "bottom", align: "center" },
    buildsOn: [],
    legacyPath: "/tymeo",

    includes: [
      "Modelo de planta y productos",
      "Turnos y calendario",
      "Registro de paradas con su motivo",
      "OEE por línea, turno, producto y corrida",
      "Planes y órdenes de producción",
      "Pantalla de piso",
      "Tableros y alertas",
    ],
    withOther:
      "Con Calidad, el rechazo entra solo al indicador. Con Energía, sabés cuánta energía cuesta cada unidad.",
    adjusts: [
      "Corregís el turno mientras pasa.",
      "Atacás primero la parada que más tiempo te come.",
      "Ajustás el plan contra lo que de verdad se produce.",
    ],
    freeTier: "Una línea, con carga manual.",

    h1: "Sabé qué te frena la línea, turno por turno",
    // Se reescribe la bajada: decía "TYMEO mide el OEE…". El módulo ahora se llama
    // Producción y el nombre viejo no queda en ninguna parte del sitio.
    lead: "Medí el OEE de cada línea en tiempo real —cuánto de su capacidad está usando realmente—, detectá cuándo se frenó y clasificá por qué. Con eso sabés qué máquina te cuesta plata, en qué turno y con qué producto. Empezás gratis cargando los datos a mano y automatizás la captura cuando quieras.",
    seoTitle: "Software de OEE y control de producción",
    seoDescription:
      "Medí el OEE de cada línea en tiempo real, con las paradas clasificadas y el plan contra real por turno, línea y operario. Empezá gratis, sin hardware.",
    doesTitle: "Cuatro cosas, y las cuatro salen del mismo dato",
    faqTitle: "Preguntas sobre el módulo de Producción",
    roiTitle: "Cuánto vale un punto de OEE en tu línea",
    roiLead:
      "Poné el volumen y el costo de tu línea, y elegí el plan. La matriz muestra cómo cambia el retorno según cuánto OEE recuperes, porque cuánto vas a recuperar es justamente lo que no se sabe de antemano. Sin registrarte y con los supuestos a la vista.",
    roiLinkLabel: "Calcular el retorno de tu línea",
    relatedEyebrow: "Se apoyan en Producción",
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
        a: "Al principio, con carga manual: el operario registra desde un formulario qué produjo y cuándo se frenó la línea, y el OEE se calcula con eso. Es exacto en la medida en que se cargue bien, y alcanza para tener el número y empezar a comparar turnos. Cuando querés que el dato se tome solo, se conecta el PLC o se agrega una lectora en el puesto.",
      },
      {
        q: "¿Conectar la máquina me sube de plan?",
        a: "No, y es la diferencia con casi todo el resto del mercado. El precio publicado vale igual para carga manual que para el PLC o el sensor que la planta ya tiene conectados. Lo único que se cotiza aparte es la integración, una sola vez.",
      },
      {
        q: "¿Los operarios lo van a usar?",
        a: "Es la pregunta correcta, porque si no lo usan no hay dato. La pantalla del puesto está pensada para eso: se maneja de pie y con guantes, muestra sólo lo del turno en curso y clasificar una parada son dos toques. No hay que escribir nada.",
      },
      {
        q: "¿Se conecta con mi ERP?",
        a: "Sí, y no es obligatorio. Podés usarlo sin conectar nada y sumar la integración cuando quieras que el plan de producción entre solo o que la producción del turno vaya al sistema de gestión.",
      },
      {
        q: "¿Cuánto tarda en estar andando?",
        a: "El plan gratuito, el mismo día. Con hardware para que la captura sea automática, entre 1 y 10 días desde la reunión de arranque: relevamiento, configuración de la planta, conectividad, dos días de piloto y la puesta en producción.",
      },
    ],
  },
  {
    key: "calidad",
    frontstage: true,
    number: "02",
    name: "Calidad",
    /* La página se reescribió entera en octubre de 2026.
     *
     * Antes era "visión artificial sobre la línea": cámara, detección del defecto y
     * rechazo dictado al PLC. Eso es captura por IA y salió del precio de lista, así que
     * se cotiza y vive en /ia. Lo que queda acá es el módulo con precio publicado:
     * registrar el defecto donde pasa, con carga manual o automática, y que el impacto
     * llegue al indicador de producción sin cargarlo dos veces. El icono también cambia,
     * de `visionInspection` a `defect`, por la misma razón. */
    promise:
      "El defecto queda registrado donde pasa, y el rechazo impacta el indicador de producción sin cargarlo dos veces.",
    summary:
      "Registra el defecto en el puesto, con tu catálogo de fallas, y lo cruza con lo que produjo la línea.",
    needs: "Nada al principio: se carga desde una tablet o el celular en el puesto.",
    proof: {
      value: "70 tipos de falla",
      caption: "en el catálogo de defectos de una planta autopartista",
    },
    icon: "defect",
    slug: "calidad",
    hotspot: { left: "49.3%", top: "36.9%", side: "bottom", align: "center" },
    buildsOn: ["produccion"],
    // La web anterior le daba a este módulo la página de la vertical entera.
    legacyPath: "/manufactura",

    includes: [
      "Catálogo de defectos propio",
      "Planes de inspección y checklists",
      "Inspección por unidad, lote y muestra",
      "Rechazo y retrabajo separados",
      "Pareto de fallas",
      "Control estadístico de proceso",
      "Alerta de deriva",
    ],
    withOther: "Con Producción, el rechazo impacta el OEE automáticamente.",
    adjusts: [
      "Frenás un lote antes de que salga.",
      "Atacás el defecto que más se repite.",
      "Corregís el proceso cuando la medición se empieza a correr.",
    ],
    freeTier: "Una línea, con carga manual.",

    h1: "Que el defecto quede registrado donde pasa",
    lead: "El inspector carga la falla en el puesto, con tu catálogo de defectos y no con una lista genérica. El rechazo y el retrabajo quedan separados, el Pareto se arma solo y el impacto llega al indicador de producción sin que nadie lo vuelva a cargar.",
    seoTitle: "Control de calidad en planta",
    seoDescription:
      "Registrá el defecto en el puesto con tu propio catálogo de fallas, separá rechazo de retrabajo y que el impacto llegue solo al OEE. Empezá gratis.",
    doesTitle: "Del papel del puesto al indicador, sin escalas",
    faqTitle: "Preguntas sobre el módulo de Calidad",
    roiTitle: "Cuánto te cuesta hoy el scrap",
    roiLead:
      "Poné cuánto produce la línea, qué porcentaje se va en rechazo y cuánto vale cada pieza. Sin registrarte y con los supuestos a la vista.",
    roiLinkLabel: "Calcular cuánto te cuesta el scrap",

    problem: [
      "La falla se anota en un papel del puesto y se carga a una planilla al otro día, si alguien se acuerda.",
      "Cada inspector nombra el mismo defecto de una manera distinta, así que no se puede sumar.",
      "El rechazo y el retrabajo terminan en la misma bolsa, y son dos costos muy distintos.",
      "El Pareto de fallas se arma una vez por año, para una auditoría, y después no se mira.",
      "El proceso se va corriendo de a poco y se descubre cuando ya salió un lote entero mal.",
    ],

    does: [
      {
        title: "Tu catálogo de defectos, no una lista genérica",
        body: "Las fallas se nombran como las nombra tu planta, con el código que ya usás. Es lo que hace que dos turnos registren lo mismo de la misma forma y que el Pareto signifique algo.",
      },
      {
        title: "Rechazo y retrabajo, separados",
        body: "Una pieza que se tira y una que vuelve a pasar por la línea no cuestan lo mismo ni se corrigen igual. Quedan como dos cosas distintas desde el registro, no al final en una planilla.",
      },
      {
        title: "El impacto llega solo al indicador de producción",
        body: "Lo que se rechaza se descuenta del OEE de esa línea y ese turno sin que nadie lo cargue de nuevo. Deja de haber dos números de producción según a quién se le pregunte.",
      },
      {
        title: "Control estadístico y alerta de deriva",
        body: "Cuando la medición se empieza a correr dentro de la tolerancia, el sistema avisa antes de que aparezca el defecto. Es la diferencia entre corregir el proceso y descartar el lote.",
      },
    ],

    faq: [
      {
        q: "¿Necesito cámaras para usarlo?",
        a: "No. El módulo arranca con carga manual desde una tablet o el celular en el puesto, y ése es el plan gratuito. La inspección por visión artificial es otra forma de que entre el dato: se cotiza como proyecto, porque depende del producto y del volumen, y se puede sumar después sobre el mismo módulo.",
      },
      {
        q: "¿Puedo usar mi propio catálogo de defectos?",
        a: "Sí, y es la forma en que se configura: se carga el catálogo de tu planta con los nombres y códigos que ya usa el equipo de calidad. La configuración nunca está bloqueada, así que se amplía cuando aparece un defecto nuevo.",
      },
      {
        q: "¿Cómo se conecta con la producción?",
        a: "Si tenés el módulo de Producción, el rechazo se descuenta solo del OEE de esa línea, ese turno y ese producto. Si no lo tenés, Calidad funciona igual: lo que se pierde es el cruce automático.",
      },
      {
        q: "¿Sirve para una auditoría o una certificación?",
        a: "Queda el registro de cada inspección con su responsable, su momento y su resultado, que es lo que una auditoría pide poder reconstruir. Qué norma cubre y con qué alcance depende de tu proceso, y eso se revisa antes de prometer nada.",
      },
      {
        q: "¿Cuánto tarda en estar andando?",
        a: "El plan gratuito, el mismo día: se carga el catálogo de defectos y se empieza a registrar en una línea. Lo que lleva tiempo no es el software sino acordar internamente cómo se nombra cada falla.",
      },
    ],
  },
  {
    key: "stock",
    frontstage: true,
    number: "03",
    name: "Stock",
    /* Absorbe recepción y control de pedidos, que en el catálogo de septiembre de 2026
     * dejaron de ser módulos y pasaron a ser parte de éste. Las dos páginas viejas siguen
     * publicadas detrás —ver la nota del encabezado— y se mudan a /ia cuando esa sección
     * exista, porque lo que las justifica como página propia es la versión con cámara. */
    promise:
      "Qué entró, qué se consumió, qué se produjo y qué salió, contra qué orden y en qué posición.",
    summary:
      "Sigue el material de punta a punta: la recepción, la posición en el depósito, el consumo contra la orden y el pedido que sale.",
    needs: "Un celular Android por operario.",
    proof: null,
    icon: "warehouse",
    slug: "stock",
    hotspot: { left: "69.5%", top: "32.7%", side: "bottom", align: "right" },
    buildsOn: [],
    legacyPath: "/stock-picking",

    includes: [
      "Maestro de materiales",
      "Stock por posición",
      "Recepción de mercadería",
      "Control de pedidos",
      "Movimientos con responsable y motivo",
      "Lista de materiales",
      "Punto de reorden",
      "Inventario cíclico",
    ],
    withOther:
      "Con Producción, el consumo se descuenta solo contra la orden y el terminado ingresa sin doble carga.",
    adjusts: [
      "Reponés antes de quedarte sin material.",
      "Corregís la diferencia en el momento del conteo.",
      "Liberás espacio de lo que no se mueve.",
    ],
    freeTier: "Cinco posiciones.",

    h1: "Que el inventario del sistema sea el del depósito",
    lead: "El operario cuenta desde el celular, posición por posición, y la diferencia contra el sistema aparece en el momento. Lo que entra, lo que se consume contra cada orden y lo que sale quedan registrados con responsable y motivo. Se cuenta mientras el depósito sigue operando: no hace falta parar un fin de semana.",
    seoTitle: "Software de control de stock e inventario",
    seoDescription:
      "Conteo cíclico por posición sin parar el depósito, recepción, consumo contra la orden y control de pedidos. La diferencia aparece en el momento.",
    doesTitle: "Contar deja de ser un operativo",
    faqTitle: "Preguntas sobre el módulo de Stock",
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
        title: "De la recepción al despacho, con el mismo dato",
        body: "Lo que baja del camión, lo que se guarda, lo que se consume contra cada orden y lo que sale en un pedido son el mismo registro. No hay tres planillas que después hay que conciliar.",
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
        q: "¿La recepción y los pedidos entran acá?",
        a: "Sí, los dos son parte de este módulo: qué entró contra el remito y qué salió contra el pedido, con responsable y momento. Contarlo con una cámara en el muelle o en la mesa de despacho es otra forma de que entre ese dato, se cotiza como proyecto y se suma sobre el mismo módulo.",
      },
      {
        q: "¿Sirve si tengo pocas posiciones?",
        a: "Sí, y arranca bien ahí: cuanto más chico el depósito, más rápido se ordena. El requisito es un celular, así que probarlo en un sector no tiene costo de hardware.",
      },
    ],
  },
  {
    key: "trazabilidad",
    frontstage: true,
    number: "04",
    name: "Trazabilidad",
    promise:
      "De qué lote salió cada producto y en qué condiciones se fabricó, para adelante y para atrás.",
    summary:
      "Reconstruye la genealogía de un lote en los dos sentidos: de la materia prima al despacho y del reclamo al origen.",
    needs: "Nada al principio: el lote se carga en el puesto, con la orden.",
    // TODO(equipo): falta el dato publicable. El candidato natural es cuánto tarda hoy un
    // recall contra cuánto tarda con el módulo, pero no hay una medición propia.
    proof: null,
    icon: "traceability",
    slug: "trazabilidad",
    // Punto que liberó recepción al salir del frente. La zona es la de entrada de
    // material, que es donde arranca la genealogía de un lote.
    hotspot: { left: "33.5%", top: "44.7%", side: "bottom", align: "center" },
    buildsOn: ["produccion"],
    pairsWith: ["stock", "calidad"],

    includes: [
      "Lotes y genealogía",
      "Vencimientos y FEFO",
      "Condiciones de producción asociadas al lote",
      "Bloqueo y liberación",
      "Certificados por lote",
      "Recall",
    ],
    withOther: "Con Stock, el recall es completo: de la recepción al pedido, lote por lote.",
    adjusts: [
      "Bloqueás un lote sospechoso en el momento.",
      "Retirás sólo los lotes afectados.",
      "Despachás primero lo que vence primero.",
    ],
    freeTier: "Una línea, con carga manual.",

    h1: "Reconstruí un lote en minutos, no en tres días",
    lead: "Cada producto queda atado al lote del que salió y a las condiciones en que se fabricó. Cuando aparece un reclamo, sabés qué materia prima entró, en qué turno se produjo y a qué clientes se despachó, sin reconstruirlo con remitos y planillas.",
    seoTitle: "Trazabilidad de lotes en planta",
    seoDescription:
      "De qué lote salió cada producto y en qué condiciones se fabricó, para adelante y para atrás. Bloqueo, liberación, FEFO y recall por lote.",
    doesTitle: "Los dos sentidos del mismo hilo",
    faqTitle: "Preguntas sobre el módulo de Trazabilidad",

    problem: [
      "Cuando hay un reclamo, reconstruir de dónde salió ese producto lleva días de remitos y planillas.",
      "Ante la duda se retira todo lo que pueda estar afectado, porque no se puede acotar a los lotes que lo están.",
      "No queda registro de en qué condiciones se produjo cada lote, así que no se puede explicar qué pasó.",
      "El producto que vence primero queda atrás en la estantería y se despacha el que entró último.",
      "La auditoría pide la genealogía de un lote y hay que armarla a mano para esa visita.",
    ],

    does: [
      {
        title: "Genealogía para los dos lados",
        body: "Desde un lote de producto terminado llegás a la materia prima que lo formó, y desde un lote de materia prima llegás a todo lo que se fabricó con él. Es el mismo hilo recorrido en las dos direcciones.",
      },
      {
        title: "Las condiciones quedan pegadas al lote",
        body: "Qué línea, qué turno, qué parámetros de proceso y qué resultados de calidad. Cuando hay que explicar por qué ese lote salió distinto, el dato está, no hay que deducirlo.",
      },
      {
        title: "Bloqueo y liberación en el momento",
        body: "Un lote sospechoso se bloquea y deja de poder despacharse, con el responsable y el motivo registrados. Se libera cuando el análisis lo respalda, no cuando alguien avisa por teléfono.",
      },
      {
        title: "FEFO, y el recall acotado a lo que corresponde",
        body: "Se despacha primero lo que vence primero, y cuando hay que retirar algo se retira sólo lo afectado. La diferencia entre un recall de tres lotes y uno de un mes de producción es toda la diferencia.",
      },
    ],
  },
  {
    key: "tareas",
    frontstage: true,
    number: "05",
    name: "Tareas",
    promise: "La tarea de planta con responsable, plazo y evidencia, en cualquier área.",
    summary:
      "Quién tiene que hacer qué, en qué turno y con qué puesto cubierto, con la evidencia de que se hizo.",
    needs: "Nada: la nómina y los turnos se cargan y se empieza.",
    proof: null,
    icon: "tasks",
    slug: "tareas",
    // Punto que liberó cámaras inteligentes. Queda sobre el sector de operación, que es
    // donde la tarea se asigna y se cierra.
    hotspot: { left: "64.7%", top: "45%", side: "bottom", align: "center" },
    buildsOn: [],
    pairsWith: ["produccion", "mantenimiento"],

    includes: [
      "Nómina y roles por planta",
      "Asignación a turnos y estaciones",
      "Vista unificada del turno",
      "Rendimiento por operario con el dato de máquina",
      "Tareas fuera de línea",
      "Matriz de habilidades",
      "Cobertura de turno",
    ],
    withOther:
      "Con Producción y Mantenimiento, la máquina para y la tarea ya está abierta y asignada.",
    adjusts: [
      "Reasignás lo que quedó sin responsable.",
      "Cubrís un puesto antes de que arranque el turno.",
      "Cerrás lo pendiente antes del cambio de turno.",
    ],
    freeTier: "Un área de tareas.",

    h1: "Que cada tarea del turno tenga nombre y cierre",
    lead: "Quién está en cada puesto, qué tiene que hacer y qué quedó pendiente del turno anterior. La asignación se ve antes de que arranque el turno, no cuando falta alguien, y lo que se hizo queda con su evidencia.",
    seoTitle: "Gestión de tareas y turnos de planta",
    seoDescription:
      "Asigná las tareas del turno con responsable, plazo y evidencia. Cobertura de puestos, matriz de habilidades y lo pendiente a la vista antes de arrancar.",
    doesTitle: "El turno se arma antes de que empiece",
    faqTitle: "Preguntas sobre el módulo de Tareas",

    problem: [
      "El turno arranca y recién ahí se descubre que falta alguien en un puesto.",
      "Lo que quedó pendiente del turno anterior se transmite de palabra, si se transmite.",
      "Una tarea que no es de producción —una limpieza, un ensayo, un retrabajo— no queda registrada en ningún lado.",
      "No se sabe quién está habilitado para operar qué, así que se cubre con el que está disponible.",
      "Cuando hay que demostrar que una tarea se hizo, la evidencia es que alguien se acuerda.",
    ],

    does: [
      {
        title: "La cobertura del turno, antes del turno",
        body: "Qué puestos están cubiertos y cuáles no, con la nómina y los turnos ya cargados. El hueco se ve con tiempo de resolverlo, no cuando la línea tendría que estar andando.",
      },
      {
        title: "Quién puede operar qué",
        body: "La matriz de habilidades dice qué está habilitado a hacer cada persona. Cubrir un puesto deja de ser poner al que está libre y pasa a ser poner al que corresponde.",
      },
      {
        title: "Lo pendiente pasa de turno con nombre",
        body: "Lo que no se cerró queda abierto, asignado y visible para el turno que entra. El cambio de turno deja de depender de que alguien se acuerde de contarlo.",
      },
      {
        title: "También lo que no es producción",
        body: "Limpiezas, ensayos, retrabajos, pedidos de otra área. Son las tareas que hoy no están en ningún sistema y son las que más se pierden.",
      },
    ],
  },
  {
    key: "mantenimiento",
    frontstage: true,
    number: "06",
    name: "Mantenimiento",
    promise: "El preventivo corre por horas reales de máquina, no por calendario.",
    summary:
      "El plan preventivo se dispara con las horas que la máquina trabajó de verdad, y la orden se abre sola cuando para.",
    needs: "El registro de activos. Las horas salen de Producción si ya lo tenés.",
    proof: null,
    icon: "maintenance",
    slug: "mantenimiento",
    // Punto que liberó control de pedidos. Sobre el sector de máquinas.
    hotspot: { left: "76.1%", top: "44.5%", side: "top", align: "right" },
    buildsOn: ["produccion"],
    pairsWith: ["tareas"],

    includes: [
      "Registro de activos",
      "Plan preventivo",
      "Órdenes de trabajo e historial",
      "MTBF, MTTR y disponibilidad",
      "Repuestos",
      "Checklists de tarea",
    ],
    withOther:
      "Con Producción, la orden se abre sola cuando la máquina para: un CMMS necesita que alguien lo reporte.",
    adjusts: [
      "Programás el preventivo por horas reales de máquina.",
      "Atacás la máquina que más falla.",
      "Tenés el repuesto antes de que haga falta.",
    ],
    freeTier: "Tiempos entre mantenimientos.",

    h1: "Mantenimiento por horas de máquina, no por almanaque",
    lead: "El plan preventivo se dispara con las horas que la máquina trabajó de verdad. Cuando para, la orden de trabajo ya está abierta, con su historial y sus repuestos, sin que nadie tenga que reportarlo.",
    seoTitle: "Software de mantenimiento preventivo",
    seoDescription:
      "El preventivo corre por horas reales de máquina y la orden se abre sola cuando para. MTBF, MTTR, disponibilidad, repuestos e historial por activo.",
    doesTitle: "La diferencia con un CMMS está en quién avisa",
    faqTitle: "Preguntas sobre el módulo de Mantenimiento",

    problem: [
      "El preventivo está planificado por fecha, así que una máquina que trabajó el doble se mantiene igual que una que estuvo parada.",
      "La orden de trabajo se abre cuando alguien se acuerda de reportar que la máquina falló.",
      "No se sabe qué máquina falla más ni cuánto se tarda en volver a producir.",
      "El repuesto se pide cuando la máquina ya está parada, y ahí el plazo de entrega es lo que define la parada.",
      "El historial de una máquina está en la cabeza del que la atiende hace quince años.",
    ],

    does: [
      {
        title: "El disparador son las horas reales",
        body: "Si el módulo de Producción está midiendo, el preventivo se programa contra las horas que la máquina efectivamente trabajó. Una máquina que estuvo parada no consume plan.",
      },
      {
        title: "La orden se abre sola cuando para",
        body: "Es lo que separa esto de un CMMS: un CMMS espera que alguien cargue la falla. Acá la parada ya se detectó en producción y la orden de trabajo nace con ella.",
      },
      {
        title: "MTBF, MTTR y disponibilidad por activo",
        body: "Cuánto aguanta cada máquina entre fallas y cuánto se tarda en recuperarla. Con eso se decide dónde conviene invertir y qué conviene reemplazar.",
      },
      {
        title: "Repuestos atados al plan",
        body: "Qué repuesto consume cada tarea y cuándo va a hacer falta. El pedido se hace contra el plan y no contra la urgencia.",
      },
    ],
  },
  {
    key: "energia",
    frontstage: true,
    number: "07",
    name: "Energía",
    promise: "Cuánta energía cuesta cada unidad producida, no cuánta gasta la planta.",
    summary:
      "Divide el consumo por lo que realmente se produjo, y muestra lo que se va en vacío y en picos de demanda.",
    needs: "Nada al principio: luz y gas se cargan de la factura.",
    proof: null,
    icon: "energy",
    slug: "energia",
    // Punto que liberó drones. Queda en la zona alta del render, que es donde está la
    // acometida y los tableros.
    hotspot: { left: "57.6%", top: "13.8%", side: "bottom", align: "center" },
    buildsOn: [],
    pairsWith: ["produccion"],

    includes: [
      "Consumo de planta, por máquina y por línea",
      "Consumo por unidad producida",
      "Consumo en vacío",
      "Costo energético por producto",
      "Picos de demanda",
    ],
    withOther: "Con Producción, el kWh se divide por lo que realmente se produjo.",
    adjusts: [
      "Cortás el consumo en vacío.",
      "Corrés cargas fuera de los picos.",
      "Sabés qué producto te cuesta más energía.",
    ],
    freeTier: "Luz y gas cargados a mano.",

    h1: "Cuánta energía te cuesta cada unidad que producís",
    lead: "La factura dice cuánto gastó la planta. Lo que no dice es cuánto de eso se fue en producir y cuánto en máquinas encendidas sin trabajar. Dividido por lo que realmente salió, el kWh pasa a ser un costo por producto.",
    seoTitle: "Medición de consumo energético en planta",
    seoDescription:
      "Cuánta energía cuesta cada unidad producida, cuánto se va en vacío y qué producto consume más. Empezá cargando la factura, sin medidores nuevos.",
    doesTitle: "De la factura al costo por producto",
    faqTitle: "Preguntas sobre el módulo de Energía",

    problem: [
      "La factura llega a fin de mes y no se puede atribuir a ninguna línea ni a ningún producto.",
      "Se sabe que hay máquinas encendidas sin producir, pero no cuánto cuesta eso.",
      "Los picos de demanda se pagan caro y nadie sabe qué los genera.",
      "Al cotizar un producto, la energía entra como un porcentaje general y no como un costo medido.",
      "Se proponen inversiones en eficiencia sin una línea de base contra la cual compararlas.",
    ],

    does: [
      {
        title: "El consumo dividido por lo que se produjo",
        body: "Si el módulo de Producción está midiendo, el kWh se reparte contra las unidades que realmente salieron. Ahí aparece qué producto y qué línea consumen de más.",
      },
      {
        title: "Lo que se va en vacío",
        body: "Energía consumida con la máquina encendida y sin producir. Es el primer número que suele pagar el módulo, porque se corrige cambiando una rutina y no comprando nada.",
      },
      {
        title: "Picos de demanda, con su causa",
        body: "Cuándo se dispara la demanda y qué estaba pasando en la planta en ese momento. Correr una carga de horario es la medida más barata que existe.",
      },
      {
        title: "Empezás con la factura",
        body: "Se carga lo que pagás de luz y gas y ya tenés el costo por unidad. Los medidores por línea se suman después, cuando el número justifique la inversión.",
      },
    ],
  },

  /* ===================================================================================
     Las cinco que salieron del frente
     ...............................................................................
     Siguen publicadas, siguen indexables y siguen respondiendo 200. No están en el menú,
     ni en la grilla, ni en el plano. Su contenido queda tal como estaba: se reescribe
     cuando se mudan a /ia, no antes, para no tocar dos veces el mismo texto.
     =================================================================================== */
  {
    key: "recepcion",
    frontstage: false,
    number: "",
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
    hotspot: null,
    buildsOn: [],
    pairsWith: ["stock", "control-de-pedidos"],
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
    relatedTitle: "En el depósito, estos se usan juntos",

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
    key: "control-de-pedidos",
    frontstage: false,
    number: "",
    name: "Control de pedidos",
    promise: "Seguimiento del pedido desde el picking hasta el despacho.",
    summary:
      "Sigue el pedido desde que se arma hasta que sube al camión, y avisa si falta algo antes de que salga.",
    needs: "Una cámara sobre la mesa de despacho.",
    proof: null,
    icon: "outbound",
    slug: "control-de-pedidos",
    hotspot: null,
    buildsOn: ["stock"],
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
    key: "sobrestock-drones",
    frontstage: false,
    number: "",
    name: "Sobrestock con drones",
    promise: "Inventario aéreo de posiciones altas y cámaras de frío, sin subir a nadie.",
    summary:
      "Un dron recorre las posiciones altas y las cámaras de frío, y avisa dónde no coincide. Nadie tiene que subir a un rack a mirar.",
    needs: "Un dron y lugar para que despegue. No necesita GPS.",
    /* Sin número, a propósito y con urgencia.
     *
     * Acá había "USD 200 · por mes y cliente final" y **el precio estaba mal**. Se sacó el
     * 9 de septiembre de 2026 apenas se detectó, en producción.
     *
     * Dos cosas que dejó el episodio. La primera: un precio equivocado publicado no es un
     * dato desactualizado, es una oferta que alguien puede reclamar, así que se borra
     * antes de averiguar cuál era el correcto. La segunda: éste era el **único** `proof`
     * del sitio que publicaba un precio; los otros son datos operativos —días de
     * implementación, tipos de falla, segundos de alarma—. El comentario de Producción ya
     * decía que un precio no es una prueba y que su lugar es la sección de planes. Este
     * quedó afuera de esa limpieza.
     *
     * Cuando el equipo confirme el precio, va a planes, no acá. */
    proof: null,
    icon: "drone",
    slug: "sobrestock-drones",
    hotspot: null,
    buildsOn: ["stock"],
    legacyPath: "/drones",

    h1: "Nadie más sube a contar posiciones en altura",
    lead: "Un dron recorre los pasillos, lee las etiquetas de las posiciones altas y avisa dónde no coincide con el sistema. Los hallazgos entran a tu WMS por API, sin planilla intermedia. No hace falta GPS ni cortar la operación.",
    // "en depósito" se recorta: el título completo daba 64 caracteres. Y el término es
    // "inventario con drones", no "Indrone": nadie busca la marca.
    seoTitle: "Inventario con drones, sin subir a nadie",
    seoDescription:
      "Un dron recorre las posiciones altas y las cámaras de frío y avisa dónde no coincide. Los hallazgos entran a tu WMS por API, sin cortar la operación.",
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
    frontstage: false,
    number: "",
    name: "Cámaras inteligentes",
    promise:
      "Las cámaras de seguridad que ya tenés, controlando la operación y previniendo accidentes.",
    summary:
      "Avisa de un acceso a una zona restringida, de alguien sin el equipo de protección puesto o de una maniobra riesgosa, mientras está pasando.",
    needs: "Las cámaras de seguridad que ya están instaladas.",
    proof: { value: "Menos de 2 segundos", caption: "entre el hecho y la alarma" },
    icon: "camera",
    slug: "camaras-inteligentes",
    hotspot: null,
    buildsOn: [],
    // Ningún módulo lo incluye en su buildsOn, así que sin esto la página quedaría sin
    // ninguna salida.
    pairsWith: ["calidad", "produccion"],

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
    key: "agente",
    frontstage: false,
    number: "",
    name: "Agente",
    promise: "Agentes de IA a medida sobre los datos de tu operación.",
    summary:
      "Responde en palabras qué pasó en la planta o en el depósito, con los datos que los demás módulos ya vienen guardando.",
    needs: "Nada nuevo: se apoya en los módulos que ya tengas andando.",
    proof: null,
    icon: "agent",
    slug: "agente",
    hotspot: null,
    buildsOn: ["produccion", "calidad", "stock"],

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

/**
 * El catálogo que el sitio muestra: menú, grilla, plano y cualquier listado.
 *
 * `MODULES` sigue siendo todo lo que tiene página —lo necesitan el enrutador, el sitemap y
 * `MODULE_BY_KEY`—, así que un listado que recorra `MODULES` sin filtrar va a mostrar
 * también las cinco que salieron del frente. Para listar, esto.
 */
export const PLATFORM_MODULES = MODULES.filter((m) => m.frontstage);

export const MODULE_BY_KEY = new Map(MODULES.map((m) => [m.key, m]));

/** Los del frente que tienen punto ubicado sobre el plano. */
export const PLOTTED_MODULES = PLATFORM_MODULES.filter(
  (m): m is PlatformModule & { hotspot: ModuleHotspot } => m.hotspot !== null,
);

/** Sólo para lo que no puede usar un Link tipado: sitemap, JSON-LD, canónicas. */
export const modulePath = (m: PlatformModule) => `/plataforma/${m.slug}`;
