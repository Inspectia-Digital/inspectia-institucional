import type { ModuleKey } from "./modules";

/**
 * Las guías: el nivel informativo del modelo de contenido (brief de SEO del 11/11/2026).
 *
 * Acá llega quien busca **cómo se hace** —"cómo calcular el OEE", "motivos de parada"— y
 * no quien busca el software. Esa diferencia de intención es la que justifica que la guía
 * y la funcionalidad sean dos páginas y no una: la funcionalidad vende, la guía responde.
 * Cada una enlaza a la otra.
 *
 * ## Las cinco primeras eran casos de uso
 *
 * `/soluciones/casos-de-uso/*` se mudó acá con 301. No fue una decisión de orden: esas
 * cinco páginas ya rankeaban **como guías** —impresiones para "tasa de scrap", "paradas
 * programadas", "inventario descuadrado"— y estaban publicadas bajo una sección que
 * promete producto. El cuerpo es el mismo; cambian la URL, el título y la descripción, y
 * dos de ellas suman una sección que responde una búsqueda que ya traía impresiones.
 *
 * ## Español neutro, y es una decisión
 *
 * **Las guías no llevan voseo ni tuteo: van en construcciones impersonales.** El resto del
 * sitio vosea y eso no cambia. Acá no, porque España (2.507 impresiones) y México (1.373)
 * son más demanda que Argentina (758), y un "fijate cuánto te cuesta" en una guía de
 * cálculo le dice a un lector de Madrid que la página no fue escrita para él. El cuerpo de
 * la guía es el que viaja; el cierre con el producto puede sonar a nosotros.
 *
 * Si una guía nueva entra con voseo, está mal escrita para el lugar donde está.
 *
 * ## Por qué el cuerpo es un arreglo de bloques
 *
 * Una guía tiene tablas, fórmulas, listas numeradas y H2 escritos como preguntas, y el
 * orden importa. Con campos fijos —`body: string[]`— la tabla del OEE no tendría dónde
 * vivir, y con HTML en un string el contenido deja de ser contenido. El bloque es el
 * mínimo que soporta las tres guías nuevas sin obligar a ninguna a tener la forma de otra.
 *
 * **Las fórmulas van como bloque de texto y nunca como imagen** (§6 del brief): una
 * fórmula en un PNG no la lee un buscador, no la lee un lector de pantalla y no se puede
 * copiar.
 */

/**
 * Un bloque del cuerpo de una guía.
 *
 * `text` admite dos marcas en línea y nada más: `**negrita**` y `[etiqueta](/ruta)`. Es
 * deliberadamente poco —no es Markdown— porque el día que admita títulos, imágenes y
 * tablas en línea, el contenido vuelve a ser HTML en un string y se pierde el control de
 * cómo se ve. Lo renderiza `components/site/RichText`.
 */
export type GuideBlock =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  /** Una fórmula, en su propio bloque y en texto. */
  | { kind: "formula"; text: string };

export type Guide = {
  slug: string;
  /** Nombre corto: menú, pie e índice. No es el H1. */
  title: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  /**
   * La respuesta corta: dos o tres oraciones que responden la pregunta entera.
   *
   * Es el primer párrafo de la página y lo que un buscador puede extraer tal cual, así que
   * tiene que poder leerse solo, fuera de la página, sin que le falte nada.
   */
  answer: string;
  /**
   * Fecha del contenido, en ISO (`AAAA-MM-DD`).
   *
   * Se actualiza cuando el contenido cambia y no cuando se despliega el sitio: una fecha
   * que se mueve sola no informa nada y, declarada en `dateModified`, le miente al
   * buscador sobre la frescura de la página.
   *
   * **En ISO y no "11 de noviembre de 2026"** porque la misma fecha va a dos lados con
   * formatos distintos: el `Article` la necesita en ISO 8601 y la página la muestra en
   * castellano. Guardar la versión legible obligaría a parsear español para armar el ISO.
   */
  updated: string;
  blocks: GuideBlock[];
  /** Preguntas frecuentes. Donde están, la guía además declara `FAQPage`. */
  faq?: { q: string; a: string }[];
  /** El cierre: dos a cuatro líneas y un enlace a la funcionalidad o al módulo. */
  closing: string;
  /** Los módulos que lo resuelven, para la grilla del cierre. */
  modules: ModuleKey[];
  /** La industria donde el problema es más caro. Sólo las cinco migradas la tienen. */
  worstIn?: { slug: string; note: string };
  /**
   * El dolor en primera persona, para la card del hub de soluciones.
   *
   * Lo tienen las cinco que eran casos de uso, y se conserva tal cual estaba escrito:
   * «El sistema dice que está y en el rack no está» es mejor titular de card que cualquier
   * resumen de la guía, y era lo que esa sección de `/soluciones` ya usaba. Las tres guías
   * nuevas no lo tienen porque no describen un dolor sino un procedimiento, así que no
   * aparecen en ese hub.
   */
  pain?: string;
};

/** La fecha de esta tanda de contenido. Una sola constante mientras sea la misma para
 *  todas: cuando una guía se actualice sola, se le pone la suya. */
const TANDA = "2026-11-11";

export const GUIDES: Guide[] = [
  /* ===================== Las tres nuevas ===================== */

  {
    slug: "como-calcular-el-oee",
    title: "Cómo calcular el OEE",
    h1: "Cómo calcular el OEE",
    seoTitle: "Cómo calcular el OEE: fórmula y ejemplo paso a paso",
    seoDescription:
      "La fórmula del OEE con un ejemplo resuelto: disponibilidad, rendimiento y calidad de una línea, qué datos hacen falta y los errores más comunes al calcularlo.",
    answer:
      "El OEE (eficiencia general de los equipos) se calcula multiplicando tres factores de una línea en un período: disponibilidad × rendimiento × calidad. El resultado indica qué parte del tiempo planificado se usó para producir unidades buenas a la velocidad ideal. Un OEE de 60 % significa que se perdió el 40 % de la capacidad entre paradas, velocidad baja y unidades malas.",
    updated: TANDA,
    blocks: [
      { kind: "h2", text: "¿Qué datos hacen falta?" },
      {
        kind: "table",
        head: ["Dato", "Qué es", "Ejemplo"],
        rows: [
          [
            "Tiempo planificado",
            "Lo que debía producir la línea, sin las paradas programadas",
            "Turno de 8 h menos 30 min de almuerzo = 450 min",
          ],
          [
            "Tiempo de paradas no planificadas",
            "Fallas, falta de material, atascos, esperas",
            "60 min",
          ],
          [
            "Ciclo ideal",
            "El tiempo que la máquina tarda en hacer una unidad a su velocidad nominal",
            "1 unidad cada 1,5 s (40 por minuto)",
          ],
          ["Unidades producidas", "Todo lo que salió de la línea", "14.000"],
          ["Unidades buenas", "Lo que salió sin defecto y sin retrabajo", "13.300"],
        ],
      },

      { kind: "h2", text: "¿Cómo se calcula cada factor?" },
      { kind: "formula", text: "Disponibilidad = tiempo de producción ÷ tiempo planificado" },
      {
        kind: "p",
        text: "Tiempo de producción = 450 − 60 = 390 min. Disponibilidad = 390 ÷ 450 = **86,7 %**.",
      },
      {
        kind: "formula",
        text: "Rendimiento = (ciclo ideal × unidades producidas) ÷ tiempo de producción",
      },
      {
        kind: "p",
        text: "A 40 unidades por minuto, en 390 minutos la línea podía hacer 15.600. Hizo 14.000. Rendimiento = 14.000 ÷ 15.600 = **89,7 %**.",
      },
      { kind: "formula", text: "Calidad = unidades buenas ÷ unidades producidas" },
      { kind: "p", text: "Calidad = 13.300 ÷ 14.000 = **95 %**." },
      { kind: "formula", text: "OEE = 86,7 % × 89,7 % × 95 % = 73,9 %" },
      {
        kind: "p",
        text: "Comprobación por otro camino: a velocidad ideal, en 450 minutos se podían hacer 18.000 unidades buenas. Salieron 13.300. 13.300 ÷ 18.000 = 73,9 %. Los dos cálculos tienen que dar lo mismo.",
      },

      { kind: "h2", text: "¿Qué valor de OEE es bueno?" },
      {
        kind: "p",
        text: "No hay un número que sirva para todas las plantas: depende del proceso, de la cantidad de cambios de formato y de cómo se define el tiempo planificado. Se suele citar el 85 % como referencia de clase mundial, pero lo útil es comparar la misma línea contra sí misma, turno a turno y mes a mes, y ver qué factor tira el número para abajo.",
      },

      { kind: "h2", text: "¿Cómo se calcula el OEE en Excel?" },
      {
        kind: "p",
        text: "Con una fila por turno y una columna por dato de la tabla anterior, alcanza con cuatro fórmulas: disponibilidad, rendimiento, calidad y su producto. El problema no es la fórmula sino el dato: si los tiempos de parada y las unidades se cargan al final del turno, de memoria, el OEE sale mejor de lo que es. Las paradas cortas, de uno o dos minutos, casi nunca quedan anotadas y en un mes suman horas.",
      },

      { kind: "h2", text: "Errores comunes al calcular el OEE" },
      {
        kind: "ul",
        items: [
          "**Contar las paradas programadas como pérdida de disponibilidad.** El almuerzo o el mantenimiento preventivo se restan del tiempo planificado, no de la disponibilidad.",
          "**Usar como ciclo ideal el promedio histórico.** El ciclo ideal es la velocidad nominal de la máquina; con el promedio, las pérdidas de velocidad desaparecen.",
          "**Contar el retrabajo como unidad buena.** Una unidad que vuelve a pasar por la línea no salió bien a la primera.",
          "**Calcular un OEE de planta promediando líneas distintas.** Conviene calcularlo por línea y mirar dónde está la pérdida.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué significa OEE?",
        a: "Overall Equipment Effectiveness, eficiencia general de los equipos. Mide qué parte de la capacidad de una línea se convirtió en producción buena.",
      },
      {
        q: "¿Cada cuánto conviene calcularlo?",
        a: "Por turno como mínimo. Calculado una vez al mes, sirve para un informe pero no para corregir nada mientras pasa.",
      },
      {
        q: "¿Se puede calcular sin sensores?",
        a: "Sí, con carga manual de paradas y unidades. Es exacto en la medida en que se cargue bien; con la señal de la máquina se suman las paradas cortas que nadie anota.",
      },
    ],
    closing:
      "InspectIA calcula el OEE de cada línea durante el turno, con carga manual desde el puesto o con el dato del PLC o de un sensor. Para probar el cálculo con números propios está el [simulador](/simulador); para tenerlo andando en la línea, [Producción](/plataforma/produccion) y el [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee).",
    modules: ["produccion"],
  },

  {
    slug: "motivos-de-parada",
    title: "Motivos de parada",
    h1: "Motivos de parada: cómo armar una lista que se use",
    seoTitle: "Motivos de parada de máquina: cómo armar la lista",
    seoDescription:
      "Cómo armar una lista de motivos de parada que los operarios usen: cuántos motivos, cómo agruparlos y un ejemplo para una línea de envasado.",
    answer:
      "Una lista de motivos de parada sirve si cumple dos condiciones: el operario elige el motivo en segundos y el resultado permite decidir qué atacar. Para eso conviene una lista corta, de menos de diez motivos por línea, agrupada en pocas familias y revisada cada mes según dónde se concentra el tiempo perdido.",
    updated: TANDA,
    blocks: [
      { kind: "h2", text: "¿Por qué una lista corta?" },
      {
        kind: "p",
        text: "Con cuarenta opciones, el operario elige la primera o «otros». El registro queda completo y no dice nada. Con siete u ocho motivos bien elegidos, la elección es rápida y el tiempo perdido queda repartido en categorías que alguien puede resolver.",
      },

      { kind: "h2", text: "¿Cómo se agrupan?" },
      { kind: "p", text: "Una forma práctica es separar por quién tiene que resolverlo:" },
      {
        kind: "table",
        head: ["Familia", "Ejemplos", "Quién lo resuelve"],
        rows: [
          ["Falla de equipo", "Falla mecánica, falla eléctrica, atasco", "Mantenimiento"],
          [
            "Material",
            "Falta de materia prima, falta de envase, material fuera de especificación",
            "Abastecimiento o Calidad",
          ],
          ["Operación", "Cambio de formato, ajuste, espera de operario", "Producción"],
          ["Calidad", "Parada por control, producto retenido", "Calidad"],
          ["Externa", "Corte de energía, falta de aire comprimido", "Planta o servicios"],
          [
            "Programada",
            "Almuerzo, limpieza, mantenimiento preventivo",
            "Se planifica, no se elimina",
          ],
        ],
      },
      {
        kind: "p",
        text: "Las paradas programadas se registran aparte: no son una pérdida que haya que eliminar sino un tiempo que se puede acortar.",
      },

      { kind: "h2", text: "Ejemplo: línea de envasado" },
      {
        kind: "ol",
        items: [
          "Falta de envase",
          "Atasco en llenadora",
          "Falla en tapadora",
          "Cambio de formato",
          "Ajuste de peso o volumen",
          "Espera de material de la etapa anterior",
          "Control de calidad",
          "Otros (con nota obligatoria)",
        ],
      },
      {
        kind: "p",
        text: "«Otros» queda como último recurso y con nota. Si a fin de mes concentra mucho tiempo, es señal de que falta un motivo en la lista.",
      },

      { kind: "h2", text: "¿Cada cuánto se revisa?" },
      {
        kind: "p",
        text: "Una vez por mes, con las paradas ordenadas por tiempo perdido. El motivo que concentra más tiempo se abre en subcausas (por ejemplo, «falla en tapadora» en cabezal, alimentación de tapas o sensor), y los que nunca se usan se eliminan.",
      },

      { kind: "h2", text: "Errores comunes" },
      {
        kind: "ul",
        items: [
          "**Mezclar síntomas con causas.** «Máquina parada» no es un motivo.",
          "**Usar la misma lista para todas las líneas.** Cada línea tiene sus máquinas y sus problemas.",
          "**Pedir motivo para cada microparada.** Las paradas de pocos segundos conviene contarlas y mirarlas en grupo, sin pedirle al operario que las clasifique una por una.",
        ],
      },
    ],
    closing:
      "En InspectIA la lista de motivos se define por línea y el operario la usa desde la pantalla del puesto, con dos toques. Las paradas quedan ordenadas por tiempo perdido, por línea, turno y producto. Más detalle en el [registro de paradas de máquina](/plataforma/produccion/registro-de-paradas-de-maquina).",
    modules: ["produccion"],
  },

  {
    slug: "retiro-de-lotes",
    title: "Retiro de lotes",
    h1: "Retiro de lotes: cómo acotarlo a lo que de verdad está afectado",
    seoTitle: "Retiro de lotes en alimentos: cómo acotarlo y hacerlo rápido",
    seoDescription:
      "Qué datos hacen falta para retirar sólo los lotes afectados: trazabilidad hacia atrás y hacia adelante, bloqueo de lotes y el informe que hay que tener listo.",
    answer:
      "Un retiro de lotes se puede acotar cuando cada lote de producto terminado está atado a los lotes de materia prima que lo formaron y a los clientes que lo recibieron. Con ese vínculo, ante un problema se identifica qué se fabricó con el insumo afectado y a quién se despachó. Sin él, la única salida segura es retirar todo lo que pudo haber estado en contacto.",
    updated: TANDA,
    blocks: [
      { kind: "h2", text: "¿Qué es la trazabilidad hacia atrás y hacia adelante?" },
      {
        kind: "ul",
        items: [
          "**Hacia atrás:** desde un lote de producto terminado se llega a la materia prima, el proveedor, la línea, el turno y las condiciones en que se fabricó. Es lo que se usa ante un reclamo.",
          "**Hacia adelante:** desde un lote de materia prima se llega a todos los lotes de producto en que se usó y a los clientes que los recibieron. Es lo que se usa para decidir qué retirar.",
        ],
      },
      { kind: "p", text: "Las dos salen del mismo registro, recorrido en sentidos opuestos." },

      { kind: "h2", text: "¿Qué datos hacen falta?" },
      {
        kind: "table",
        head: ["Momento", "Dato que se registra"],
        rows: [
          ["Recepción", "Lote del proveedor, cantidad, fecha, certificado"],
          [
            "Producción",
            "Qué lotes de materia prima entraron a cada orden, línea, turno y parámetros de proceso",
          ],
          ["Control de calidad", "Resultados por lote, aprobaciones y rechazos"],
          ["Depósito", "Posición y movimientos de cada lote"],
          ["Despacho", "Qué lote salió en cada pedido y a qué cliente"],
        ],
      },
      {
        kind: "p",
        text: "Si falta un eslabón, el hilo se corta ahí. El más frecuente es la producción: se sabe qué entró al depósito y qué salió, pero no qué lote de insumo se usó en cada orden.",
      },

      { kind: "h2", text: "Pasos ante un problema" },
      {
        kind: "ol",
        items: [
          "**Identificar el lote de origen** del problema (un insumo, una corrida, un turno).",
          "**Bloquear** ese lote y los que dependen de él, para que no se sigan despachando.",
          "**Recorrer hacia adelante** hasta los lotes de producto terminado y los clientes.",
          "**Armar el informe** con lo afectado, lo despachado y lo que queda en depósito.",
          "**Retirar sólo lo afectado** y liberar el resto cuando el análisis lo respalde, dejando registrado quién lo decidió y por qué.",
        ],
      },

      { kind: "h2", text: "¿Cuánto tiempo debería llevar?" },
      {
        kind: "p",
        text: "Depende de dónde viva el dato. Si hay que juntar remitos, planillas y partes de producción, el informe de un lote puede llevar días. Si el vínculo entre lotes está registrado en el momento, la consulta es inmediata y el tiempo se va en decidir, no en buscar.",
      },
    ],
    faq: [
      {
        q: "¿Qué es un lote?",
        a: "Un conjunto de unidades producidas o recibidas en condiciones homogéneas, identificado con un código que permite seguirlo.",
      },
      {
        q: "¿Hace falta código de barras?",
        a: "No para empezar: el lote se puede cargar en el puesto, con la orden. Las etiquetas y lectoras reducen errores y aceleran la carga.",
      },
      {
        q: "¿Qué es FEFO?",
        a: "First expired, first out: despachar primero lo que vence primero. Reduce el producto vencido en depósito.",
      },
    ],
    closing:
      "InspectIA ata cada lote a su materia prima, a sus condiciones de fabricación y a sus despachos, y permite bloquearlo y liberarlo con responsable. El informe de un lote sale de una consulta. Más detalle en [trazabilidad alimentaria](/plataforma/trazabilidad/trazabilidad-alimentaria).",
    modules: ["trazabilidad", "stock"],
  },

  /* ===================== Las cinco que eran casos de uso =====================
     El cuerpo es el de `/soluciones/casos-de-uso/*`, con dos cambios de forma: los tres
     párrafos quedan bajo un H2 escrito como pregunta —la plantilla de guía lo pide, y un
     muro de tres párrafos sin encabezado no se puede citar por partes— y el cierre pasa a
     ser el bloque «Cómo lo resuelve InspectIA» en lugar de una sección de solución.

     Los H2 y los cierres se escribieron acá: el brief manda el cuerpo y los metadatos, no
     los encabezados. Scrap y paradas suman además la sección que el brief indica. */

  {
    slug: "como-reducir-el-scrap",
    pain: "Me entero del defecto cuando el lote ya salió",
    title: "Cómo reducir el scrap",
    h1: "Cómo reducir el scrap cuando el defecto se detecta tarde",
    seoTitle: "Scrap en producción: cómo calcularlo y reducirlo",
    seoDescription:
      "Qué es el scrap, cómo calcular la tasa de scrap de una línea y qué datos registrar para bajarla, con un ejemplo.",
    answer:
      "El scrap no baja controlando más fuerte al final de la línea. Baja cuando el defecto se detecta en el momento en que se produce, porque ahí todavía se puede corregir la causa en lugar de descartar la consecuencia.",
    updated: TANDA,
    blocks: [
      { kind: "h2", text: "¿Por qué el muestreo deja pasar scrap?" },
      {
        kind: "p",
        text: "El control por muestreo funciona sobre un supuesto: que lo que pasa en la muestra representa al lote. En una línea que produce miles de piezas por turno, ese supuesto se rompe seguido, y lo que se rompe con él es la confianza en el número de calidad.",
      },
      {
        kind: "p",
        text: "Cuando el defecto se descubre en el armado, o en el cliente, ya se agregó valor sobre una pieza que había que tirar. El costo real no es el material: es el tiempo de máquina, la mano de obra, el flete y —si llegó al cliente— la penalización y la nota de crédito.",
      },
      {
        kind: "p",
        text: "Y hay un costo que no se contabiliza nunca: nadie sabe qué proporción del lote estaba igual. Ante un reclamo se bloquea más producto del necesario, porque no hay registro de qué salió realmente de la línea ese turno.",
      },

      { kind: "h2", text: "¿Cómo se calcula la tasa de scrap?" },
      {
        kind: "p",
        text: "La tasa de scrap es la proporción de unidades que se descartan sobre el total producido en un período:",
      },
      { kind: "formula", text: "Tasa de scrap = unidades descartadas ÷ unidades producidas × 100" },
      {
        kind: "p",
        text: "Por ejemplo, si una línea produjo 12.000 unidades en el turno y 360 terminaron descartadas, la tasa de scrap es 360 ÷ 12.000 × 100 = 3 %. El retrabajo se cuenta aparte: son unidades que no se tiran, pero vuelven a pasar por la línea y consumen tiempo. Para que el número sirva, cada descarte tiene que quedar registrado con su motivo, el turno y el producto; si no, se sabe cuánto se pierde pero no dónde.",
      },
    ],
    closing:
      "En InspectIA una cámara sobre la línea inspecciona el 100 % de lo que pasa, con el mismo criterio en todos los turnos, y le dicta el rechazo al PLC sin frenar la producción. Cada descarte queda registrado con su motivo, su turno y su producto. Más detalle en [Calidad](/plataforma/calidad).",
    modules: ["calidad"],
    worstIn: {
      slug: "autopartista",
      note: "En autopartes el defecto no se paga en scrap: se paga en penalización del cliente.",
    },
  },

  {
    slug: "como-reducir-las-paradas-de-maquina",
    pain: "No sé qué máquina me frena",
    title: "Cómo reducir las paradas de máquina",
    h1: "Cómo saber qué máquina frena la línea y cuánto cuesta",
    seoTitle: "Cómo reducir las paradas de máquina en planta",
    seoDescription:
      "Paradas programadas y no planificadas: cómo registrarlas, ordenarlas por motivo y atacar primero la que más tiempo cuesta.",
    answer:
      "Toda planta sabe que la línea se frena. Lo que casi ninguna tiene es cuántas veces, por cuánto tiempo y por qué motivo, y sin eso no hay nada que priorizar.",
    updated: TANDA,
    blocks: [
      { kind: "h2", text: "¿Por qué el registro de paradas subestima la pérdida?" },
      {
        kind: "p",
        text: "El parte de producción se arma al día siguiente, en una planilla, con lo que recuerda el encargado. Las paradas cortas —las que suman más al final del mes— no llegan a anotarse, así que el registro subestima justamente lo que más cuesta.",
      },
      {
        kind: "p",
        text: "Sin la causa anotada, la conversación de la reunión de producción es sobre quién tuvo la culpa y no sobre qué pasó. Y la misma parada vuelve el mes siguiente, porque nunca se identificó como recurrente.",
      },
      {
        kind: "p",
        text: "Lo que se pierde no es sólo tiempo de máquina: es capacidad que se compensa con horas extra o con una máquina nueva que quizás no hacía falta. Antes de invertir en capacidad conviene saber cuánta se está perdiendo.",
      },

      { kind: "h2", text: "¿Qué diferencia hay entre una parada programada y una no planificada?" },
      {
        kind: "p",
        text: "Una parada programada estaba prevista antes de que empezara el turno: el almuerzo, una limpieza, un mantenimiento preventivo o un cambio de formato planificado. Una parada no planificada aparece durante el turno sin estar en el plan: una falla, falta de material, un atasco o la espera de un operario. Conviene registrarlas por separado, porque se atacan distinto: las programadas se acortan (por ejemplo, reduciendo el tiempo de cambio de formato) y las no planificadas se eliminan buscando su causa. El indicador de disponibilidad del OEE suele medirse sobre el tiempo planificado de producción, así que las programadas no lo bajan y las no planificadas sí.",
      },
    ],
    closing:
      "En InspectIA la parada se detecta sola y el operario le pone la causa desde el puesto con dos toques. A fin de mes están ordenadas por motivo y por tiempo perdido, y ahí se ve cuál conviene atacar primero. Más detalle en el [registro de paradas de máquina](/plataforma/produccion/registro-de-paradas-de-maquina), y para armar la lista de causas está la guía de [motivos de parada](/guias/motivos-de-parada).",
    modules: ["produccion"],
    worstIn: {
      slug: "alimentos",
      note: "En alimentos, cada cambio de formato y cada limpieza es una parada programada que nadie está midiendo.",
    },
  },

  {
    slug: "inventario-que-no-cuadra",
    pain: "El sistema dice que está y en el rack no está",
    title: "Inventario que no cuadra",
    h1: "Cómo cuadrar el inventario sin parar el depósito",
    seoTitle: "Inventario que no cuadra: por qué pasa y cómo cuadrarlo",
    seoDescription:
      "Las causas más comunes de un inventario descuadrado y cómo cuadrarlo con conteo cíclico, sin parar el depósito.",
    answer:
      "El inventario no se ordena con un conteo general una vez por año. Se ordena contando algunas posiciones por día, mientras el depósito opera, y resolviendo la diferencia el mismo día en que aparece.",
    updated: TANDA,
    blocks: [
      { kind: "h2", text: "¿Por qué el conteo anual no alcanza?" },
      {
        kind: "p",
        text: "El conteo general tiene dos problemas: obliga a parar la operación un fin de semana, y para cuando termina ya vuelve a estar desactualizado. Es una foto de un depósito que se mueve todos los días.",
      },
      {
        kind: "p",
        text: "Mientras la diferencia no se detecta, se paga en otro lado: pedidos que salen incompletos, compras de material que ya estaba, y horas de gente buscando algo que el sistema dice que está.",
      },
      {
        kind: "p",
        text: "Y cuando la diferencia aparece semanas después, ya no se puede saber en qué momento se generó. Sin eso no hay causa que corregir: sólo un ajuste de sistema que va a tener que repetirse.",
      },
    ],
    closing:
      "En InspectIA el operario cuenta por posición desde el celular y la diferencia contra el sistema aparece en el momento. Para las posiciones altas y las cámaras de frío, donde el conteo manual no se hace, va el dron. Más detalle en [WMS para fábricas](/plataforma/stock/wms-para-fabricas) y en [Stock](/plataforma/stock).",
    modules: ["stock", "sobrestock-drones"],
    worstIn: {
      slug: "logistica",
      note: "En un centro de distribución, el descuadre se paga en el pedido que sale incompleto.",
    },
  },

  {
    slug: "como-acelerar-la-recepcion-de-mercaderia",
    pain: "El camión espera y la planilla se llena a mano",
    title: "Cómo acelerar la recepción",
    h1: "Cómo acelerar la recepción sin poner más gente",
    seoTitle: "Cómo acelerar la recepción de mercadería en depósito",
    seoDescription:
      "Qué frena la recepción en el muelle y cómo controlar lo que baja del camión sin planillas ni doble carga.",
    answer:
      "La recepción se acelera de una sola forma: que el control ocurra mientras se descarga y que el dato entre al sistema una vez. Sumar gente al muelle acelera un poco y duplica el trabajo administrativo.",
    updated: TANDA,
    blocks: [
      { kind: "h2", text: "¿Qué frena la recepción en el muelle?" },
      {
        kind: "p",
        text: "Hoy el circuito tiene tres pasos donde debería haber uno: se descarga, se anota en una planilla, y después alguien carga esa planilla en el sistema. Cada paso agrega tiempo y agrega la posibilidad de un error de transcripción.",
      },
      {
        kind: "p",
        text: "Mientras eso pasa, el camión espera. Lo que se demora en el muelle se paga en flete, en penalización del proveedor de transporte o en horas de gente que no puede hacer otra cosa.",
      },
      {
        kind: "p",
        text: "Y la diferencia contra el remito aparece días después, cuando el camión ya se fue. Ese es el único momento en que el reclamo al proveedor tenía fuerza, y se perdió.",
      },
    ],
    closing:
      "En InspectIA una cámara en el muelle cuenta y controla mientras se descarga, compara contra el remito ahí mismo, y envía lo recibido al WMS sin recarga manual. Más detalle en [Recepción con cámara](/ia/recepcion).",
    modules: ["recepcion"],
    worstIn: {
      slug: "logistica",
      note: "En un centro de distribución la recepción es el cuello de botella de toda la operación.",
    },
  },

  {
    slug: "prevenir-accidentes-en-planta-con-camaras",
    pain: "Me entero del incidente por el parte del día siguiente",
    title: "Prevenir accidentes con cámaras",
    h1: "Cómo enterarse del riesgo antes del accidente",
    seoTitle: "Prevenir accidentes en planta con las cámaras que ya hay",
    seoDescription:
      "Cómo usar las cámaras de seguridad existentes para detectar situaciones de riesgo y avisar en el momento.",
    answer:
      "Casi toda planta tiene cámaras y casi ninguna las usa para prevenir: se miran después, para entender qué pasó. El cambio es que avisen mientras está pasando.",
    updated: TANDA,
    blocks: [
      /* Los tres párrafos están escritos sobre condiciones de riesgo y no sobre conducta
         individual, y eso no es un detalle de estilo: es la única guía que podría leerse
         como vigilancia del personal. Si alguien la reescribe, el eje se mantiene. */
      { kind: "h2", text: "¿Por qué las cámaras que ya están no previenen nada?" },
      {
        kind: "p",
        text: "El sistema de CCTV está instalado, amortizado y grabando. Pero nadie puede mirar doce pantallas al mismo tiempo, así que en la práctica no se mira ninguna hasta que hay un incidente que investigar.",
      },
      {
        kind: "p",
        text: "Se sabe en qué sectores no se usa la protección y qué maniobras son riesgosas. Lo que falta no es el diagnóstico: es el aviso en el momento en que ocurre, a alguien que pueda intervenir.",
      },
      {
        kind: "p",
        text: "El incidente que aparece en el parte del día siguiente ya costó. Y el que no llegó a incidente —la maniobra que salió bien esta vez— no queda registrado en ninguna parte, así que no se corrige.",
      },
    ],
    closing:
      "En InspectIA el análisis corre sobre el video que ya se está grabando y la alarma sale en menos de dos segundos. No hace falta cambiar una cámara ni tirar un cable nuevo. Más detalle en [Cámaras inteligentes](/ia/camaras-inteligentes).",
    modules: ["camaras-inteligentes"],
    worstIn: {
      slug: "logistica",
      note: "En un depósito, el tránsito de autoelevadores es donde el riesgo es más constante.",
    },
  },
];

export const GUIDE_BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

/**
 * Las guías que describen un problema, no un procedimiento: las cinco que eran casos de
 * uso. Son las que van al menú, al pie y al hub de soluciones.
 *
 * Se filtran por `pain` y no por una lista de slugs escrita a mano: el campo existe
 * justamente porque esas cinco tienen el dolor en primera persona y las otras no, así que
 * es la misma distinción y no hay dos listas que se puedan desincronizar. Una guía nueva
 * que describa un problema entra sola a los tres lugares con sólo escribirle el `pain`.
 */
export const problemGuides = () => GUIDES.filter((g) => g.pain);

/**
 * La fecha de `updated`, para mostrar.
 *
 * **`timeZone: "UTC"` no es opcional.** `new Date("2026-11-11")` es medianoche UTC, y
 * formateada en la zona de Buenos Aires —tres horas atrás— da el 10 de noviembre. El
 * servidor renderiza en UTC y el navegador del visitante en la suya, así que sin esto la
 * misma guía mostraría una fecha distinta según quién la mire, y el HTML del servidor no
 * coincidiría con el del cliente.
 */
export const updatedLabel = (iso: string) =>
  new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
