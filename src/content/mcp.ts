import type { ProductPanelData } from "@/components/site/ProductPanel";

/**
 * El conector MCP: InspectIA adentro de Claude y de ChatGPT.
 *
 * **Por qué vive en su propio archivo y no en `features.ts`.** Una funcionalidad cuelga de
 * un módulo —ése es el campo que arma la miga de pan, el bloque «Funcionalidades» y el
 * `isPartOf` del schema— y esto no cuelga de ninguno: es transversal a la plataforma y la
 * URL lo dice (`/ia/…`, no `/plataforma/<módulo>/…`). Forzarlo adentro de `FEATURES` lo
 * haría aparecer en el listado de un módulo que no le corresponde.
 *
 * **Por qué tampoco va en `ia.ts`.** Las aplicaciones de IA de ese catálogo son proyectos
 * que se cotizan, con su forma propia —problema, cómo funciona, qué necesita la planta,
 * qué se mide— y su página oscura. Esta es una página de producto con el diseño de las
 * funcionalidades en versión corta, que es lo que pide su archivo de contenido.
 *
 * **Descripción genérica, decidido el 12/11/2026:** no nombra módulos, ni permisos, ni
 * planes. Lo que se ofrece es una conversación, no una ficha técnica.
 */
export const MCP = {
  path: "/ia/conecta-claude-y-chatgpt",
  /** El valor de `origen` que viaja a `/contacto`. */
  origin: "mcp",

  seoTitle: "Conectá Claude o ChatGPT a los datos de tu planta",
  seoDescription:
    "Preguntale a tu asistente de IA cómo viene tu operación y recibí la respuesta con tus propios datos de InspectIA. Conocé el conector MCP.",

  name: "Claude y ChatGPT",
  eyebrow: "IA · Conector para asistentes",
  h1: "Preguntale a Claude o ChatGPT cómo viene tu planta",
  lead: "Conectá tu asistente de IA a InspectIA y consultá tu operación en palabras, con los mismos números que ves en la plataforma.",

  /* Dos burbujas y nada más. Sin logos de Claude ni de ChatGPT: son marcas de terceros y
     ponerlas acá insinúa un acuerdo que no existe. */
  heroPanel: {
    title: "Una consulta cualquiera",
    blocks: [
      {
        kind: "chat",
        items: [
          { role: "ask", text: "¿Qué línea rindió peor la semana pasada y por qué?" },
          {
            role: "answer",
            text: "La línea 2. Perdió casi seis horas por falta de envase, el triple que la semana anterior.",
          },
        ],
      },
    ],
  } satisfies ProductPanelData,

  does: [
    {
      title: "Preguntás en palabras",
      body: "Lo que hoy pedís como informe, lo preguntás como se lo preguntarías a alguien de la planta.",
    },
    {
      title: "Responde con tus datos",
      body: "El asistente consulta InspectIA y contesta con los números de tu empresa, no con una estimación.",
    },
    {
      title: "Analizás sin planillas",
      body: "Comparás períodos, cruzás información y armás tus propios análisis sin exportar nada.",
    },
  ],

  band: {
    title: "Lo estamos habilitando con nuestros clientes",
    body: "Contanos qué te gustaría preguntarle a tu planta y te mostramos cómo funciona.",
    linkLabel: "Quiero conocerlo",
  },

  faq: [
    {
      q: "¿Qué es un conector MCP?",
      a: "MCP (Model Context Protocol) es el estándar con el que los asistentes de IA se conectan a otros sistemas. El conector de InspectIA le permite a tu asistente consultar los datos de tu planta.",
    },
    { q: "¿Con qué asistentes funciona?", a: "Con Claude y con ChatGPT." },
    {
      q: "¿Necesito saber programar?",
      a: "No. El conector se agrega desde la configuración del asistente y se pregunta en palabras.",
    },
    {
      q: "¿Cómo empiezo?",
      a: "Escribinos y te mostramos cómo funciona con datos de una planta.",
    },
  ],

  cta: {
    title: "Mirá tu planta desde tu asistente de IA",
    lead: "Te mostramos el conector funcionando y vemos qué preguntas le harías vos.",
  },
} as const;
