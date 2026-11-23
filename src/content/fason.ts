import type { ProductPanelData } from "@/components/site/ProductPanel";

/**
 * Las dos páginas de fasón: la de la fábrica que produce para otras marcas y la de la
 * marca que manda a fasonar.
 *
 * ## Por qué no son industrias
 *
 * `/soluciones/$industria` resuelve alimentos, autopartista, logística y las demás: una
 * industria es un rubro. Fasón no es un rubro, es una **relación comercial** —la misma
 * fábrica de alimentos puede producir para su marca y para tres ajenas— y las dos páginas
 * le hablan a los dos lados de esa relación. Meterlas en `solutions.ts` habría obligado a
 * la plantilla de industria a tener dos formas, y habría puesto «Producción a fasón» en la
 * grilla de rubros del hub, al lado de «Cosmética».
 *
 * Van como **rutas estáticas** bajo `/soluciones/`, que en el enrutador de TanStack le
 * ganan a `$industria`: el segmento literal se resuelve antes que el parámetro, así que
 * `/soluciones/produccion-a-fason` no cae nunca en la plantilla de industria.
 *
 * ## Las dos se publican «a pedido», y es una decisión del pase
 *
 * El contenido de dirección traía cuatro afirmaciones marcadas `[VERIFICAR EN REPO]`. Se
 * verificaron contra `oee-lite-backend` en `5c2126a` (23/11/2026) y el resultado es que el
 * reporte de fasón **todavía no está construido**:
 *
 * - `ComparticionMarca` (`app/models/domain.py:6501`) es la compartición de **canal**:
 *   venta, stock y reposiciones de una marca que vende por un canal. Su lista blanca de
 *   reportes es `venta_stock` y `ventas_empresa`, y no tiene tipo de vínculo «fasón»;
 * - las cuatro reglas de fasón del catálogo (`app/datos/catalogo_reglas_inicial.md:740` y
 *   siguientes) están en **estado borrador** y salen del «Prototipo de fasón»;
 * - no hay consignación de insumos de la marca: cero coincidencias de `consignacion` en
 *   `app/`;
 * - lo que la marca ve hoy son sus **canales** (`app/core/marcas.py:105`,
 *   `canales_de_la_marca`), no sus fábricas, y se resuelve en cada consulta: no hay paso
 *   de publicar con aprobación.
 *
 * Lo que sí está construido es la operación de la fábrica: pedidos de cliente con fecha de
 * entrega y renglones abiertos (`app/routers/pedidos_cliente.py`), plan desde pedidos,
 * objetivo por marca en la orden (`ObjetivoMarcaOrden`), marca en trazabilidad
 * (`MarcaTrazabilidad`, `ProductoMarca`), trazabilidad por lote y el **informe de
 * trazabilidad del pedido para el cliente**, que explícitamente no lleva operarios, costos
 * ni paradas (`app/core/informe_trazabilidad.py`).
 *
 * Con el reporte sin construir, publicar la página de la fábrica con «Empezar gratis»
 * prometería un producto de fasón que no existe. Así que las dos van con la convención que
 * el sitio ya tiene para eso (brief de SEO §3, como el andon y el costo por unidad): la
 * banda «Lo estamos habilitando con nuestros clientes» y un solo CTA, «Quiero conocerlo».
 * **Es un desvío del contenido, que pedía `CtaPair` en la de fábricas.** El día que el
 * reporte exista alcanza con sacar `status` y `requestOrigin` de la entrada.
 *
 * Lo que no se publica es lo que estaba marcado para verificar y no existe: la pregunta
 * del packaging en consignación, el bloque de insumos de la marca y la pregunta de
 * comparar fasoneros. Están anotadas en el informe del día.
 */

export type FasonPage = {
  slug: string;
  /** La ruta completa. Va en el contenido y no armada con una plantilla en la vista: el
   *  `to` de un `Link` tipado no acepta un tipo de plantilla, y repetir el prefijo en cada
   *  lugar que enlaza es donde se cuela el que quedó viejo. */
  path: string;
  /** Nombre corto: miga de pan, enlaces y la card del hub de soluciones. */
  name: string;
  eyebrow: string;
  h1: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  /** El dolor en una línea, para la card de `/soluciones`. */
  pain: string;
  /** Mientras el reporte de fasón no esté construido. Ver el comentario de arriba. */
  status?: "a-pedido";
  requestOrigin: string;
  heroPanel: ProductPanelData;
  problem: string[];
  /** Qué hace, en pasos. El título de la sección viaja aparte porque las dos páginas lo
   *  dicen distinto: una enumera capacidades, la otra lo que ve la marca. */
  doesEyebrow: string;
  doesTitle: string;
  does: { title: string; body: string }[];
  /** La franja de lo que no se comparte. Es el bloque que hace que una fábrica acepte. */
  guard: { title: string; body: string };
  /** Cómo se arma, cuando la página lo explica. */
  steps?: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  related: { title: string; body: string; to: string }[];
  relatedEyebrow: string;
  relatedTitle: string;
  faq: { q: string; a: string }[];
  band: { title: string; body: string; linkLabel: string };
  links: { label: string; to: string }[];
};

export const FASON_PAGES: FasonPage[] = [
  {
    slug: "produccion-a-fason",
    path: "/soluciones/produccion-a-fason",
    name: "Producción a fasón",
    pain: "Cada marca me pide el avance por su lado y en su formato.",
    status: "a-pedido",
    requestOrigin: "fason-fabrica",
    eyebrow: "Soluciones · Producción a fasón",
    h1: "Producción a fasón: cada marca con sus pedidos, sus lotes y su reporte",
    lead: "Si producís para otras marcas, cada una quiere saber cómo viene su pedido, qué pasó con su lote y cuánto queda de su packaging. InspectIA separa todo por marca, desde el pedido hasta el despacho, y te deja mandarle a cada una un reporte armado por vos, sin que vea tu planta, tus costos ni a las otras marcas.",
    seoTitle: "Producción a fasón: cada marca con sus pedidos y sus lotes",
    seoDescription:
      "Para fábricas que producen para otras marcas: pedidos y entregas por marca, lotes y trazabilidad separados, y un reporte para cada marca sin mostrar tu planta.",

    heroPanel: {
      title: "Pedidos por marca · semana 47",
      blocks: [
        {
          kind: "rows",
          items: [
            {
              name: "Marca A",
              detail: "3 pedidos · 2 a tiempo · 1 en riesgo",
              pill: { text: "Insumo de la marca", tone: "warn" },
            },
            { name: "Marca B", detail: "2 pedidos", pill: { text: "A tiempo", tone: "ok" } },
            {
              name: "Marca C",
              detail: "1 pedido",
              pill: { text: "Lote L-1007 retenido", tone: "warn" },
            },
          ],
        },
      ],
      foot: "Reporte a cada marca: al cierre del turno, con aprobación.",
    },

    problem: [
      "Cada marca pide el avance por mail, por WhatsApp o en una visita, y cada una lo quiere en su formato.",
      "Las líneas pasan de una marca a otra en el mismo día y la producción de cada una se arma después, en una planilla.",
      "El packaging o la materia prima que manda la marca se mezcla con el propio, y la merma se discute sin datos.",
      "En un retiro de producto, juntar qué lote fue a qué cliente de esa marca lleva días.",
    ],

    doesEyebrow: "Qué hace",
    doesTitle: "Cada marca, separada de punta a punta",
    does: [
      {
        title: "Pedidos por marca",
        body: "Cada pedido entra con su marca, sus productos y su fecha de entrega. Ves qué falta entregar a cada una y lo planificás en la línea que corresponde.",
      },
      {
        title: "Producción y lote por marca",
        body: "Cada orden lleva la marca para la que se produce, aunque la línea cambie de marca en el mismo turno. El lote queda asociado a la marca desde que se abre.",
      },
      {
        title: "Calidad y liberación por lote",
        body: "Cada lote se libera, se retiene o se rechaza con su control, y la marca puede ver el estado de los suyos.",
      },
      {
        title: "Trazabilidad por marca",
        body: "Con el lote, ves qué materia prima se usó y a dónde se despachó, separado por marca. El informe se descarga listo para un retiro.",
      },
      {
        /* Sin «sus insumos» en la enumeración: el stock de insumos de la marca en
           consignación no existe en el backend y el contenido pedía sacar el bloque de
           insumos del reporte si no estaba. */
        title: "Un reporte para cada marca",
        body: "Elegís qué ve cada marca y con qué detalle: pedidos, avance, calidad, trazabilidad. Lo publicás al cierre del turno, una vez por día o después de revisarlo.",
      },
    ],

    guard: {
      title: "Lo que ninguna marca ve",
      body: "Tu OEE, tus paradas y sus causas, tu personal, tus costos y rendimientos, tu capacidad, las otras marcas, tus proveedores y tus controles de proceso internos. No es una opción que se apaga: esos datos no se pueden compartir.",
    },

    relatedEyebrow: "Con qué se combina",
    relatedTitle: "Lo que se le suma",
    related: [
      {
        title: "Plan de producción desde pedidos",
        body: "Los pedidos de cada marca, programados por línea y día.",
        to: "/plataforma/produccion/plan-de-produccion",
      },
      {
        title: "Trazabilidad alimentaria",
        body: "Lote por lote, hacia atrás y hacia adelante.",
        to: "/plataforma/trazabilidad/trazabilidad-alimentaria",
      },
      {
        title: "Para las marcas",
        body: "Lo que ve la marca que te encarga la producción.",
        to: "/soluciones/control-de-fasoneros",
      },
    ],

    faq: [
      {
        q: "¿Una marca puede ver la producción de otra?",
        a: "No. Cada marca ve sólo lo que tiene su etiqueta, y sólo lo que vos decidiste compartir.",
      },
      {
        q: "¿La marca ve mi OEE o mis costos?",
        a: "No. El OEE, las paradas, los costos, la capacidad y las otras marcas no se comparten en ningún nivel.",
      },
      {
        q: "¿Quién decide qué se comparte?",
        a: "La fábrica. La marca puede pedir un reporte, pero lo configura y lo autoriza la fábrica, y se puede revocar.",
      },
      {
        q: "¿La marca tiene que usar InspectIA?",
        a: "Para ver el reporte, sí, con su propia cuenta. Si no, seguís usando InspectIA para tu planta igual.",
      },
      {
        q: "¿Sirve si hago maquila o fabricación por contrato?",
        a: "Sí: es el mismo modelo con otro nombre. Pedidos, lotes y trazabilidad por cliente.",
      },
      /* Falta «¿Y si la marca me manda el packaging?»: su respuesta era un
         [VERIFICAR EN REPO] sobre el stock de insumos de la marca en consignación, que no
         existe en el backend (cero coincidencias de `consignacion` en `app/`). El
         contenido indicaba sacar la pregunta si no estaba. */
    ],

    band: {
      title: "Lo estamos habilitando con nuestros clientes",
      body: "Dejanos tus datos y lo vemos para tu planta y tus marcas.",
      linkLabel: "Quiero conocerlo",
    },

    links: [
      { label: "Producción", to: "/plataforma/produccion" },
      { label: "Stock", to: "/plataforma/stock" },
      { label: "Trazabilidad", to: "/plataforma/trazabilidad" },
      { label: "Retiro de lotes", to: "/guias/retiro-de-lotes" },
    ],
  },

  {
    slug: "control-de-fasoneros",
    path: "/soluciones/control-de-fasoneros",
    name: "Control de fasoneros",
    pain: "Me entero del atraso cuando el pedido no llega.",
    status: "a-pedido",
    requestOrigin: "fason-marca",
    eyebrow: "Soluciones · Marcas que fasonan",
    h1: "Para marcas que fasonan: cómo vienen tus pedidos en cada fábrica",
    lead: "Si tu marca produce en fábricas de terceros, el avance, la calidad y la trazabilidad están en la planta de otro. Cuando tu fasonero usa InspectIA, te comparte un reporte de lo tuyo: tus pedidos, tus lotes y tus insumos, al día y en tu cuenta.",
    seoTitle: "Control de fasoneros: pedidos, calidad y lotes de tu marca",
    seoDescription:
      "Si tu marca produce en fábricas de terceros: cómo vienen tus pedidos, el estado de cada lote, tus insumos en la fábrica y la trazabilidad, sin pedir planillas.",

    heroPanel: {
      title: "Fábrica A · para tu marca",
      blocks: [
        {
          kind: "stats",
          items: [
            { label: "Entregas a tiempo y completas", value: "92 %" },
            { label: "Pedidos en curso", value: "4" },
            { label: "En riesgo", value: "1" },
            { label: "Lotes retenidos", value: "1" },
          ],
        },
        {
          kind: "rows",
          items: [
            {
              name: "Pedido 2211",
              detail: "producido 80 % · liberado 65 % · entregado 40 %",
              value: "28/11 → 02/12",
            },
          ],
        },
      ],
      foot: "Comprometido 28/11 · proyectado 02/12.",
    },

    problem: [
      "Te enterás del atraso cuando el pedido no llega.",
      "La calidad de cada lote la conocés por el certificado que mandan al final, si lo mandan.",
      "No sabés cuánto de tu packaging queda en la fábrica hasta que falta.",
      "En un retiro, la trazabilidad la tiene la fábrica y vos dependés de que responda rápido.",
    ],

    doesEyebrow: "Qué ves",
    doesTitle: "Qué ves de cada fábrica",
    does: [
      {
        title: "Pedidos y entregas",
        body: "Cada pedido con lo producido, lo liberado por calidad y lo entregado. Fecha comprometida contra fecha proyectada y la categoría del atraso: insumo de la marca, capacidad, calidad o abastecimiento.",
      },
      {
        title: "Cómo viene",
        body: "Lo producido por semana para tu marca, contra lo planificado.",
      },
      {
        title: "Calidad de tus lotes",
        body: "Liberado, retenido o rechazado, con su certificado.",
      },
      /* Falta «Tus insumos en la fábrica»: era un [VERIFICAR EN REPO] sobre la
         consignación, que no existe en el backend. */
      {
        title: "Trazabilidad",
        body: "Buscás un lote y ves fechas, los insumos tuyos que se usaron y a dónde se despachó.",
      },
    ],

    guard: {
      title: "Lo que no vas a ver",
      body: "Cómo funciona la planta de tu fasonero (OEE, paradas, personal, costos, capacidad) ni nada de las otras marcas para las que produce. Lo que ves lo elige la fábrica. Eso es lo que hace que una fábrica acepte compartir.",
    },

    steps: {
      eyebrow: "Cómo se arma",
      title: "Cómo se arma",
      items: [
        {
          title: "Tu fasonero usa InspectIA",
          body: "Puede empezar con el plan gratuito y cargar la producción a mano en una tablet. No hace falta instalar nada en su planta.",
        },
        {
          title: "Te comparte tu reporte",
          body: "Elige qué bloques y con qué detalle, y si lo revisa antes de publicarlo.",
        },
        {
          title: "Lo ves en tu cuenta",
          body: "Con varias fábricas, cada una aparece por separado.",
        },
      ],
    },

    relatedEyebrow: "Con qué se combina",
    relatedTitle: "Lo que se le suma",
    related: [
      {
        title: "Para las fábricas",
        body: "Lo que ve y controla tu fasonero.",
        to: "/soluciones/produccion-a-fason",
      },
      {
        title: "Trazabilidad alimentaria",
        body: "Cómo se arma la trazabilidad lote por lote.",
        to: "/plataforma/trazabilidad/trazabilidad-alimentaria",
      },
      {
        title: "Retiro de lotes",
        body: "Qué hacer en un retiro de producto.",
        to: "/guias/retiro-de-lotes",
      },
    ],

    faq: [
      {
        q: "¿Mi fasonero tiene que usar InspectIA?",
        a: "Sí, el reporte sale de lo que la fábrica registra en InspectIA. Puede empezar gratis y con carga manual.",
      },
      {
        q: "¿Puedo ver cómo trabaja la fábrica?",
        a: "No. Ves lo de tu marca: pedidos, lotes, calidad, insumos y trazabilidad. La operación de la planta es de la fábrica.",
      },
      /* Falta «¿Puedo comparar mis fasoneros?»: era un [VERIFICAR] sobre qué muestra la
         vista con varias fábricas, contra la decisión DIR-048 («sin benchmark
         identificable»). La vista no existe todavía. */
      {
        q: "¿Sirve si trabajo con maquila o con un co-packer?",
        a: "Sí: es el mismo modelo.",
      },
      {
        q: "¿Quién responde en un retiro?",
        a: "El titular del producto. Por eso conviene tener la trazabilidad por lote a mano, y no depender de un mail.",
      },
    ],

    band: {
      title: "Lo estamos habilitando con nuestros clientes",
      body: "Dejanos tus datos y lo vemos con tu marca y tus fábricas.",
      linkLabel: "Quiero conocerlo",
    },

    links: [
      { label: "Trazabilidad", to: "/plataforma/trazabilidad" },
      { label: "Producción a fasón", to: "/soluciones/produccion-a-fason" },
    ],
  },
];

export const FASON_BY_SLUG = new Map(FASON_PAGES.map((p) => [p.slug, p]));
