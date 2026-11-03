/**
 * Rutas de imagen del sitio.
 *
 * Los archivos viven en `public/img` y se generan con `npm run images` a partir de los
 * originales de `assets-src/`. Antes esto eran punteros `.asset.json` al storage de
 * Lovable, que sólo resolvían con `LOVABLE_PREVIEW_HOST` seteado y dejaban el dev local
 * sin imágenes.
 *
 * Al agregar una imagen: original a `assets-src/`, entrada en `scripts/optimize-images.mjs`,
 * `npm run images`, y la ruta acá. Nada consume `public/img` con un string suelto.
 */

/** Vista isométrica de planta y depósito — fondo del plano interactivo de la home. */
export const PLANT_PLAN = {
  /** 1920px de ancho. La relación es 16:9, la del render original. */
  src: "/img/plant/fabrica-logistica.webp",
  /** Variante para pantallas chicas, servida por srcset. */
  src960: "/img/plant/fabrica-logistica-960.webp",
  width: 1920,
  height: 1079,
  alt: "Vista isométrica de una planta y un centro de distribución, con los ocho módulos de InspectIA ubicados en su punto de la operación",
} as const;

/**
 * Lockup de marca: isotipo hexagonal más logotipo.
 *
 * Dos versiones porque la marca vive sobre dos fondos: el teal del original sobre blanco,
 * y el blanco sobre el teal profundo del pie. La segunda se genera desde el alfa del
 * mismo archivo, así que es la misma marca y no un dibujo aparte.
 *
 * TODO(equipo): **falta el vector.** Los archivos entregados son PNG y el handoff de
 * iconos declara el isotipo como no vectorizado. A 96px de alto para usarse a 32 se ve
 * bien en pantallas 3x, pero un SVG pesaría menos y escalaría sin techo.
 */
/**
 * La captura de la aplicación que acompaña al encabezado de la home.
 *
 * **Mientras sea null, el hero va a una sola columna y a ancho completo**, que es mejor
 * que reservar el 40 % de la primera pantalla para un hueco: una columna de texto capada
 * esperando una imagen que no está se lee como un error de carga.
 *
 * ## Cómo publicarla
 *
 * 1. El archivo original va a `assets-src/app/tablero.png` (PNG, sin comprimir).
 * 2. `npm run images -- app` lo reencoda a `/img/app/tablero.webp` y su variante chica.
 * 3. Se completa este objeto con el `alt` y las medidas que imprime el script.
 *
 * ## Qué tiene que mostrar
 *
 * - **Un tablero, no un formulario ni una tabla.** Se dibuja a ~520px de ancho: lo que
 *   tiene que leerse a ese tamaño son gráficos y números grandes, no filas de texto.
 * - **Relación 4:3 o 3:2**, apaisada. Una captura de pantalla completa de 16:9 entra
 *   demasiado chica en la columna.
 * - **Datos de demostración, nunca de un cliente.** Una captura del tablero de un tenant
 *   real publica su producción, sus paradas y sus defectos en la home. Si el único
 *   tablero con datos lindos es el de una cuenta real, hay que maquillar los nombres y
 *   los números antes, no después.
 * - Sin barra del navegador, sin cursor, sin notificaciones del sistema operativo.
 *
 * El `alt` describe lo que se ve en el tablero —qué métricas, de qué— y no dice "captura
 * de pantalla": eso ya lo sabe quien usa un lector de pantalla por el contexto.
 */
export const APP_SHOT = {
  src: "/img/app/inspectia-tablero-oee.webp",
  /** Variante para pantallas chicas, servida por srcset. */
  src760: "/img/app/inspectia-tablero-oee-760.webp",
  width: 1100,
  height: 733,
  alt: "Tablero de InspectIA con el OEE de la planta, su evolución en el último mes y el OEE de cada línea",
} as const;

/**
 * Las capturas de las páginas de módulo.
 *
 * **Sólo cinco, y no es un pendiente: Mantenimiento y Energía no existen en la
 * aplicación.** `oee-lite/src/modules/` no tiene carpeta para ninguno de los dos, así que
 * no hay pantalla que capturar. Esas dos páginas van sin imagen y el bloque "Qué hace"
 * queda a una columna, que es como estaban las siete hasta ahora. El día que el módulo
 * exista entra su captura acá y la página no cambia de forma.
 *
 * Valen las mismas reglas que para `APP_SHOT`, con dos diferencias de medida: se dibujan
 * al ancho de la columna de contenido —1120px, no media columna— y la relación es **16:10**
 * apaisada, que es la de una ventana de aplicación entera. Los originales son 1920x1200.
 *
 * El `alt` dice qué se ve en cada tablero. No dice "captura de pantalla": el contexto ya
 * lo da.
 *
 * Cada una trae además:
 *
 * - **`caption`**, el epígrafe que se dibuja debajo. No repite el `alt`: el `alt` describe
 *   lo que se ve para quien no lo ve, y el epígrafe le dice a quien sí lo ve qué tiene que
 *   mirar. Un epígrafe es de lo poco que se lee incluso cuando no se lee el cuerpo, así
 *   que cada uno cuenta el caso concreto del tablero y no una línea de folleto.
 * - **`og`**, la tarjeta de compartido de esa página. No es la captura: es una composición
 *   de 1200x630 con la banda de marca, porque la captura es 16:10 y la tarjeta 1,91:1, y
 *   apuntar `og:image` al archivo directo deja que cada red la recorte por su cuenta.
 */
export const MODULE_SHOTS: Record<
  string,
  {
    src: string;
    src1120: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
    og: string;
  }
> = {
  produccion: {
    src: "/img/app/inspectia-software-oee-produccion.webp",
    src1120: "/img/app/inspectia-software-oee-produccion-1120.webp",
    width: 1680,
    height: 1050,
    alt: "Tablero de una línea en vivo: OEE del turno, sus tres componentes y las unidades producidas cada 15 minutos, con una parada y un tramo lento marcados",
    caption:
      "La línea de panes durante el turno de mañana. Cada barra son 15 minutos contra el ritmo ideal, y la parada por cambio de formato queda registrada con su motivo.",
    og: "/img/og/inspectia-software-oee-produccion-og.jpg",
  },
  calidad: {
    src: "/img/app/inspectia-control-de-calidad.webp",
    src1120: "/img/app/inspectia-control-de-calidad-1120.webp",
    width: 1680,
    height: 1050,
    alt: "Pareto de defectos con rechazo y retrabajo separados, la curva acumulada y la calidad de cada línea",
    caption:
      "Tres defectos explican el 74 % de las unidades con problema. El rechazo se descarta y el retrabajo se recupera, así que cada uno cuenta por separado.",
    og: "/img/og/inspectia-control-de-calidad-og.jpg",
  },
  stock: {
    src: "/img/app/inspectia-control-de-stock-inventario.webp",
    src1120: "/img/app/inspectia-control-de-stock-inventario-1120.webp",
    width: 1680,
    height: 1050,
    alt: "Stock por producto con los días de cobertura de cada uno y una diferencia de conteo marcada",
    caption:
      "Cuatro productos de 62 están abajo de los siete días de cobertura. La diferencia de la manteca apareció en el conteo de esta mañana, no en el inventario de fin de mes.",
    og: "/img/og/inspectia-control-de-stock-inventario-og.jpg",
  },
  trazabilidad: {
    src: "/img/app/inspectia-trazabilidad-lotes.webp",
    src1120: "/img/app/inspectia-trazabilidad-lotes-1120.webp",
    width: 1680,
    height: 1050,
    alt: "Un lote con su genealogía, de la materia prima a los despachos, su vencimiento y la conciliación de unidades",
    caption:
      "Un lote de pan lactal, de la harina al remito. La sal fina entró sin lote cargado y el sistema lo muestra en vez de rechazar la carga.",
    og: "/img/og/inspectia-trazabilidad-lotes-og.jpg",
  },
  tareas: {
    src: "/img/app/inspectia-asignacion-tareas-turno.webp",
    src1120: "/img/app/inspectia-asignacion-tareas-turno-1120.webp",
    width: 1680,
    height: 1050,
    alt: "La cobertura de un turno: quién está asignado a cada puesto, los puestos sin cubrir y quién está disponible",
    caption:
      "El turno de mañana, armado el día anterior. Quedan dos puestos sin cubrir, y para el operario que avisó que no viene el sistema propone a alguien que ya trabajó en ese puesto.",
    og: "/img/og/inspectia-asignacion-tareas-turno-og.jpg",
  },
};

export const LOCKUP = {
  /** Teal sobre fondos claros. */
  src: "/img/brand/lockup.webp",
  /** Blanco sobre el teal profundo. */
  white: "/img/brand/lockup-blanco.webp",
  width: 352,
  height: 96,
  alt: "InspectIA",
} as const;

/** Isotipo solo, para el favicon y donde no entra el lockup completo. */
export const ISOTIPO = "/img/brand/isotipo.webp";

export type PartnerSlug =
  | "antea-group"
  | "arnx"
  | "auren"
  | "balluff"
  | "bps"
  | "cygnus"
  | "emprelatam"
  | "google-for-startups"
  | "las-marias"
  | "miebach"
  | "molens-greenmills"
  | "motorola"
  | "quantit"
  | "sitecno"
  | "springwall"
  | "tecnologia-bi"
  | "teksis";

/** Logo de cada organización. El nombre visible y a qué familia pertenece viven en
 *  `partners.ts`: §11.10 pide que clientes, proveedores, integraciones y respaldos
 *  nunca compartan fila, así que la clasificación no puede ser sólo una lista de rutas. */
export const PARTNER_LOGO: Record<PartnerSlug, string> = {
  "antea-group": "/img/partners/antea-group.webp",
  arnx: "/img/partners/arnx.webp",
  auren: "/img/partners/auren.webp",
  balluff: "/img/partners/balluff.webp",
  bps: "/img/partners/bps.webp",
  cygnus: "/img/partners/cygnus.webp",
  emprelatam: "/img/partners/emprelatam.webp",
  "google-for-startups": "/img/partners/google-for-startups.webp",
  "las-marias": "/img/partners/las-marias.webp",
  miebach: "/img/partners/miebach.webp",
  "molens-greenmills": "/img/partners/molens-greenmills.webp",
  motorola: "/img/partners/motorola.webp",
  quantit: "/img/partners/quantit.webp",
  sitecno: "/img/partners/sitecno.webp",
  springwall: "/img/partners/springwall.webp",
  "tecnologia-bi": "/img/partners/tecnologia-bi.webp",
  teksis: "/img/partners/teksis.webp",
};
