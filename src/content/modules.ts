import {
  Bot,
  Cctv,
  Drone,
  Gauge,
  PackageCheck,
  ScanEye,
  Smartphone,
  Truck,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
  /** Segmento de URL. La ruta es /plataforma/$modulo, así que el Link va tipado
   *  con params y no con un string armado a mano. */
  slug: string;
  hotspot: ModuleHotspot | null;
  /** En qué otros módulos se apoya (§7.2, punto 3). */
  buildsOn: ModuleKey[];
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
};

export const MODULES: PlatformModule[] = [
  {
    key: "tymeo",
    number: "01",
    name: "TYMEO",
    promise:
      "OEE en tiempo real, paradas clasificadas y plan contra real, por turno, línea, puesto y operario.",
    summary:
      "Muestra qué está produciendo cada línea ahora y por qué se frenó. Las paradas quedan clasificadas, no anotadas en un cuaderno.",
    needs: "Nada al principio: se carga a mano. Los sensores y lectoras se suman después.",
    // El proof anterior era un precio, no una prueba, y en esta página convive con la
    // calculadora. El precio vive en la sección de planes, que es su lugar.
    proof: {
      value: "5 a 15 días",
      caption: "de la reunión de arranque a los datos corriendo en producción",
    },
    icon: Gauge,
    slug: "tymeo",
    hotspot: { left: "44.9%", top: "23.8%", side: "bottom", align: "center" },
    buildsOn: [],
    legacyPath: "/tymeo",

    h1: "Sabé qué te frena la línea, turno por turno",
    lead: "TYMEO mide el OEE de cada línea en tiempo real, detecta cuándo se frenó y te deja clasificar por qué. Con eso sabés qué máquina te cuesta plata, en qué turno y con qué producto. Empezás gratis cargando los datos a mano y automatizás la captura cuando quieras.",
    seoTitle: "Software de OEE en tiempo real, con plan gratis",
    seoDescription:
      "Medí el OEE de cada línea en tiempo real, con las paradas clasificadas y el plan contra real por turno, línea y operario. Empezá gratis, sin hardware.",

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
        a: "El plan gratuito, el mismo día. Con hardware para que la captura sea automática, entre 5 y 15 días desde la reunión de arranque: relevamiento, configuración de la planta, conectividad, dos días de piloto y la puesta en producción.",
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
    icon: ScanEye,
    slug: "control-de-calidad",
    hotspot: { left: "49.3%", top: "36.9%", side: "bottom", align: "center" },
    buildsOn: ["tymeo"],
    // La web anterior le daba a este módulo la página de la vertical entera.
    legacyPath: "/manufactura",
  },
  {
    key: "recepcion",
    number: "03",
    name: "Recepción de mercadería",
    promise: "La descarga y el control de lo que entra, medidos y sin planilla.",
    summary:
      "Cuenta y controla lo que baja del camión. Lo que entra queda registrado con hora y foto, y el depósito se entera solo.",
    needs: "Una cámara en el muelle de descarga.",
    proof: {
      value: "De 24 a 15 operarios",
      caption: "y lead time de 48 a 30 horas, en un centro de distribución",
    },
    icon: Truck,
    slug: "recepcion",
    hotspot: { left: "33.5%", top: "44.7%", side: "bottom", align: "center" },
    buildsOn: [],
    legacyPath: "/recepcion",
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
    icon: Smartphone,
    slug: "stock-en-posiciones",
    hotspot: { left: "69.5%", top: "32.7%", side: "bottom", align: "right" },
    buildsOn: [],
    legacyPath: "/stock-picking",
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
    icon: Drone,
    slug: "sobrestock-drones",
    hotspot: { left: "57.6%", top: "13.8%", side: "bottom", align: "center" },
    buildsOn: ["stock-en-posiciones"],
    legacyPath: "/drones",
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
    icon: Cctv,
    slug: "camaras-inteligentes",
    hotspot: { left: "64.7%", top: "45%", side: "bottom", align: "center" },
    buildsOn: [],
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
    icon: PackageCheck,
    slug: "control-de-pedidos",
    hotspot: { left: "76.1%", top: "44.5%", side: "top", align: "right" },
    buildsOn: ["stock-en-posiciones"],
    // Se renombra a propósito: "outbound" no lo busca nadie en español (§9).
    legacyPath: "/outbound",
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
    icon: Bot,
    slug: "agente",
    // TODO(equipo): falta ubicar el octavo punto sobre el render isométrico. Mientras
    // sea null el módulo aparece en la grilla de cards pero no en el plano.
    hotspot: null,
    buildsOn: ["tymeo", "control-de-calidad", "recepcion", "stock-en-posiciones"],
  },
];

export const MODULE_BY_KEY = new Map(MODULES.map((m) => [m.key, m]));

/** Los que tienen punto ubicado sobre el plano. */
export const PLOTTED_MODULES = MODULES.filter(
  (m): m is PlatformModule & { hotspot: ModuleHotspot } => m.hotspot !== null,
);

/** Sólo para lo que no puede usar un Link tipado: sitemap, JSON-LD, canónicas. */
export const modulePath = (m: PlatformModule) => `/plataforma/${m.slug}`;
