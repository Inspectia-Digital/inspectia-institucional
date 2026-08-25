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
    proof: { value: "USD 35", caption: "por planta y mes, con plan gratuito sin hardware" },
    icon: Gauge,
    slug: "tymeo",
    hotspot: { left: "44.9%", top: "23.8%", side: "bottom", align: "center" },
    buildsOn: [],
    legacyPath: "/tymeo",
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
