/**
 * InspectIA Campo — el micrositio de la vertical agropecuaria.
 *
 * ## Qué es y qué no
 *
 * Es **otro producto, para otro comprador**: campos de agricultura, ganadería y feedlot,
 * y los canales que les venden (cooperativas, asesores, administradores). No es un módulo
 * más del catálogo industrial, y la página está armada para que eso se note antes de leer
 * una palabra: chrome propio, paleta verde y ninguna entrada en el menú de Soluciones.
 *
 * El texto es el del plan `docs/InspectIA Campo/2026-10-16_PLAN_MICROSITIO_CAMPO.md`
 * (DIR-044, borrador 2 del 16/10/2026), que lo fija en menos de 200 palabras y cinco
 * bloques a propósito.
 *
 * ## Las cuatro restricciones, que son duras
 *
 * El plan §1 las deja escritas y valen para cualquier cambio futuro de esta página:
 *
 * 1. **Sin precios.** Ninguno, ni "desde". El micrositio capta contacto, no vende.
 * 2. **Sin datos reales de ningún campo**, el piloto incluido. Las capturas van con datos
 *    de ejemplo y sin nombre de campo.
 * 3. **Sin nombrar al socio de infraestructura**, por ahora.
 * 4. **Sin nombres de clientes.**
 *
 * Por eso esta página no lleva la barra de logos, ni la grilla de precios, ni el bloque de
 * prueba social que usa el resto del sitio: no es una decisión de diseño, es que no hay
 * nada publicable para poner ahí.
 */

export const CAMPO = {
  /** El nombre se escribe siempre con la marca adelante. */
  name: "InspectIA Campo",

  hero: {
    h1: "Sabé qué pasa en tu campo sin tener que llamar a nadie.",
    lead: "Agua, cercos, clima, hacienda, insumos y personal en una sola pantalla, con avisos por WhatsApp.",
    /** Los tres perfiles acordados con el socio. No se agregan otros sin acuerdo. */
    perfiles: ["Agricultura", "Ganadería", "Feedlot"],
  },

  /** Bloque 2: seis tarjetas, una línea cada una. */
  capacidades: [
    {
      name: "Agua",
      body: "El nivel de cada tanque y aguada, y cuántos días te quedan.",
      icon: "droplets",
    },
    {
      name: "Cercos",
      body: "Qué cerco se cayó y qué potreros quedaron sin protección.",
      icon: "fence",
    },
    {
      name: "Clima",
      body: "Lluvia, viento y pronóstico para decidir cuándo fumigar o prender la bomba.",
      icon: "cloud-sun",
    },
    {
      name: "Hacienda",
      body: "Cabezas por potrero, traslados, nacimientos, compras y ventas.",
      icon: "tag",
    },
    {
      name: "Insumos",
      body: "Gasoil y agroquímicos: lo que entra, lo que se usa y lo que falta.",
      icon: "package",
    },
    {
      name: "Personal",
      body: "Tareas asignadas y avisos que le llegan al encargado por WhatsApp.",
      icon: "users",
    },
  ],

  /** Bloque 3: los tres tipos de campo. */
  perfiles: [
    {
      name: "Agricultura",
      body: "Lotes, clima, pulverizaciones e insumos.",
      foto: "lote sembrado",
    },
    {
      name: "Ganadería",
      body: "Aguadas, cercos, potreros y rotación de hacienda.",
      foto: "hacienda en potrero",
    },
    // El plan marca el alcance de feedlot como "[verificar]". Hasta que se confirme, la
    // línea dice lo mínimo que se sabe cierto y no promete corrales ni raciones.
    { name: "Feedlot", body: "Corrales, hacienda e insumos del día.", foto: "corrales de feedlot" },
  ],

  /** Bloque 4: cómo se empieza. */
  pasos: [
    "Cargás desde el celular, con formularios simples.",
    "Sumás sensores y conectividad donde hace falta, con equipos de cualquier marca.",
    "El sistema te avisa solo cuando algo se sale de lo normal.",
  ],

  /**
   * El gancho de Kit 4.0 queda apagado.
   *
   * El plan §5 lo deja condicionado: desde la Res. 343/2026 el Kit 4.0 alcanza a cualquier
   * MiPyME, pero **el catálogo no tiene kits agro** y la mayor parte del ticket típico
   * —conectividad, cámaras, seguridad— probablemente no encuadra. Publicar "hasta un 50 %
   * de descuento" sin saber qué kits confirma el portal es prometer una plata que después
   * hay que desdecir.
   *
   * Se enciende cuando se complete el `[DATO A COMPLETAR]` del plan §5.
   */
  kit40: "a-confirmar",

  cierre: {
    h2: "Hablemos",
    lead: "Contanos cómo es tu campo y te mostramos el sistema funcionando.",
    /** La segunda audiencia: canales. Va como línea y no como bloque aparte. */
    canales: "¿Sos cooperativa, asesor o administrás campos? También queremos hablar con vos.",
  },

  seo: {
    title: "Gestión del campo en un solo tablero",
    description:
      "Agua, cercos, clima, hacienda, insumos y personal de tu campo en una sola pantalla, con avisos por WhatsApp. Para agricultura, ganadería y feedlot.",
  },
} as const;

/** Las provincias, para el formulario. Orden alfabético, sin CABA (no hay campos). */
export const PROVINCIAS = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
] as const;
