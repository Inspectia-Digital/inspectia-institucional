import type { ModuleKey } from "./modules";

/**
 * Kit 4.0: los kits del programa para los que InspectIA es proveedor habilitado.
 *
 * **Es el gancho con menos competencia que tiene el sitio.** El relevamiento de octubre de
 * 2026 no encontró un solo proveedor del rubro con una página por kit: se nombra el
 * programa y se deja un formulario. Una página que diga "a este problema le corresponde
 * este kit" captura una búsqueda que hoy no contesta nadie.
 *
 * Tres reglas de redacción que no se negocian:
 *
 * 1. **Se dice "descuento".** Nunca "cofinanciamiento", nunca "ahorrá", nunca "te lo
 *    pagan". El programa reintegra una parte del proyecto y el que lo presenta es el
 *    cliente; cualquier otra palabra promete algo distinto de lo que pasa.
 * 2. **"Hasta un 50 %"**, siempre con el "hasta". El tope depende del kit y del
 *    cumplimiento, y publicar "50 %" a secas es una afirmación que no se sostiene.
 * 3. **No se publican plazos del trámite.** No hay un dato propio verificable y el
 *    programa los cambia. Una FAQ que diga "tarda X" envejece mal y nos deja mintiendo.
 *
 * TODO(equipo): **verificar los nombres oficiales contra el catálogo de
 * argentina.gob.ar antes de publicar.** Los de acá salen del brief del 16/10/2026, que a
 * su vez los tomó de la versión del 25/09/2026. Un nombre de kit equivocado en una página
 * que dice "somos proveedores habilitados" es el peor lugar donde tener un error.
 */

export type Kit = {
  /** Segmento de URL. La ruta es /kit-4-0/$kit. */
  slug: string;
  /** El código del programa, como lo nombra el catálogo oficial. */
  code: string;
  /** Nombre oficial del kit. */
  name: string;
  /** El problema en la voz del cliente, para la tabla de "qué kit te corresponde". */
  problem: string;
  /** Qué resuelve, en una línea. Es la bajada de la subpágina. */
  solves: string;
  /** Qué incluye el proyecto. Sin precios y sin plazos. */
  includes: string[];
  /** El módulo de InspectIA que se implementa. */
  module: ModuleKey;
  /** Si el kit además lleva un proyecto de IA, que se cotiza aparte. */
  needsAi?: boolean;
};

export const KITS: Kit[] = [
  {
    slug: "bas-02-monitoreo-de-produccion",
    code: "Bas-02",
    name: "Monitoreo y visualización de producción",
    problem: "No sé cuánto produce realmente cada línea ni por qué se frena.",
    solves:
      "Medir la producción de cada línea y el motivo de cada parada, con el dato saliendo de la máquina o cargado en el puesto.",
    includes: [
      "Relevamiento de las líneas y definición de qué se mide",
      "Implementación del módulo de Producción",
      "Conexión del PLC o del sensor donde se pueda tomar el dato",
      "Pantalla de piso y tableros por turno y por línea",
      "Capacitación del equipo de planta",
    ],
    module: "produccion",
  },
  {
    slug: "bas-03-planificacion",
    code: "Bas-03",
    name: "Planificación simple",
    problem: "El plan de producción se arma en una planilla y nadie sabe si se cumple.",
    solves:
      "Cargar el plan y compararlo contra lo que realmente se produjo, con las tareas del turno asignadas y cerradas.",
    includes: [
      "Modelo de planta, turnos y calendario",
      "Planes y órdenes de producción",
      "Asignación de tareas del turno con responsable y cierre",
      "Comparación de plan contra real, por línea y por turno",
    ],
    module: "produccion",
  },
  {
    slug: "bas-04-mantenimiento",
    code: "Bas-04",
    name: "Mantenimiento básico",
    problem: "La máquina se arregla cuando se rompe, y el preventivo va por almanaque.",
    solves:
      "Programar el preventivo por horas reales de máquina y tener el historial de cada activo en un solo lugar.",
    includes: [
      "Registro de activos de la planta",
      "Plan preventivo por horas de uso",
      "Órdenes de trabajo, historial y repuestos",
      "MTBF, MTTR y disponibilidad por máquina",
    ],
    module: "mantenimiento",
  },
  {
    slug: "bas-05-eficiencia-energetica",
    code: "Bas-05",
    name: "Eficiencia energética",
    problem: "La factura de energía sube y no sé qué parte de la planta la genera.",
    solves:
      "Saber cuánta energía cuesta cada unidad producida, cuánto se va en vacío y qué genera los picos de demanda.",
    includes: [
      "Relevamiento del consumo de la planta",
      "Implementación del módulo de Energía",
      "Medición por línea o por máquina donde se justifique",
      "Costo energético por producto y alerta de consumo en vacío",
    ],
    module: "energia",
  },
  {
    slug: "avz-01-mantenimiento-predictivo",
    code: "Avz-01",
    name: "Mantenimiento predictivo en equipos críticos",
    problem: "La máquina crítica falla sin aviso y para la línea entera.",
    solves:
      "Detectar la degradación de un equipo antes de la falla, con sensores de vibración o temperatura y un modelo entrenado sobre su historia.",
    includes: [
      "Definición de los equipos críticos y de qué se va a medir",
      "Instalación de los sensores en esos equipos",
      "Modelo de detección de degradación y su puesta en producción",
      "Integración con el módulo de Mantenimiento para que la orden se abra sola",
    ],
    module: "mantenimiento",
    needsAi: true,
  },
  {
    slug: "avz-02-vision-artificial-calidad",
    code: "Avz-02",
    name: "Visión artificial para control de calidad",
    problem: "El defecto se ve tarde, o depende del ojo de quien esté controlando.",
    solves:
      "Revisar cada pieza con una cámara sobre la línea, con un modelo entrenado con los defectos de tu producto.",
    includes: [
      "Relevamiento del punto de control, la cámara y la iluminación",
      "Entrenamiento del modelo con las piezas de tu planta",
      "Piloto en paralelo al control actual, para calibrar antes de dictar descartes",
      "Integración con el módulo de Calidad para que el rechazo impacte el indicador",
    ],
    module: "calidad",
    needsAi: true,
  },
  {
    slug: "avz-03-trazabilidad",
    code: "Avz-03",
    name: "Trazabilidad de lote y unidad",
    problem: "Reconstruir de dónde salió un producto me lleva días de remitos y planillas.",
    solves:
      "Atar cada producto a su lote y a las condiciones en que se fabricó, para poder recorrer el hilo en los dos sentidos.",
    includes: [
      "Definición del lote y de la genealogía para tu proceso",
      "Implementación del módulo de Trazabilidad",
      "Bloqueo, liberación y certificados por lote",
      "Procedimiento de recall acotado a los lotes afectados",
    ],
    module: "trazabilidad",
  },
];

export const KIT_BY_SLUG = new Map(KITS.map((k) => [k.slug, k]));

/** Sólo para lo que no puede usar un Link tipado: sitemap, JSON-LD, canónicas. */
export const kitPath = (k: Kit) => `/kit-4-0/${k.slug}`;
