import type { LegalClause } from "./legal";

/**
 * Política de privacidad.
 *
 * 🟡 **Versión provisoria, escrita por desarrollo y sin firma de legal.**
 *
 * Vive en su propio archivo y no junto a los términos a propósito: los términos vienen
 * firmados y llevan un cartel rojo de "no se toca una palabra", y esto es exactamente lo
 * contrario —un texto que hay que revisar y corregir—. Meterlos en el mismo archivo
 * invita a tratarlos igual, y son cosas distintas.
 *
 * Existe porque el sitio no puede publicarse sin ella: hay dos formularios que piden
 * datos personales y el pie enlaza a esta página desde todas las demás. Una página vacía
 * enlazada en todo el sitio es exposición, no un hueco de contenido.
 *
 * Lo que tiene a favor es que **no describe nada que no haga el código**: cada afirmación
 * sale de leer `lib/gtm.ts`, `lib/mailto.ts`, los dos formularios y el banner de cookies.
 * Un texto genérico bajado de una plantilla habría dicho que usamos cookies propias y de
 * terceros para "mejorar la experiencia", que acá directamente es falso.
 *
 * Lo que deliberadamente **no** dice, y no se agrega sin que infraestructura lo firme:
 * proveedor de nube, país de los servidores, cifrado, certificaciones, plazos concretos
 * de retención y política de backups. Un compromiso de seguridad escrito de más es peor
 * que uno ausente, porque pasa a ser exigible.
 *
 * Cuando se conecte un CRM hay que volver acá: cambia el destino de los formularios y
 * aparece un tercero que hoy no existe. Son las cláusulas 02, 03 y 04.
 */

/** Fecha de esta versión. Se cambia cada vez que cambia el tratamiento, no cada deploy. */
export const PRIVACY_UPDATED = "4 de septiembre de 2026";

export const PRIVACY_INTRO: string[] = [
  "Esta política explica qué datos personales recoge el sitio inspectia.ai, con qué finalidad, con quién se comparten y cómo ejercer los derechos que la ley reconoce sobre ellos. Alcanza al sitio web; el uso de la aplicación se rige además por los Términos y Condiciones y por el contrato de servicios que corresponda a cada implementación.",
  "El responsable del tratamiento es InspectIA, CUIT 30-71939896-7, con domicilio en La Pampa 2208, Ciudad Autónoma de Buenos Aires, República Argentina. Por cualquier consulta sobre esta política o sobre tus datos, escribinos a contacto@inspectia.ai.",
];

export const PRIVACY_CLAUSES: LegalClause[] = [
  {
    n: "01",
    title: "Qué datos recogemos",
    paragraphs: [
      "Los que nos das vos. El sitio tiene dos formularios: el pedido del informe de retorno de inversión y la postulación al programa para consultores. El primero pide nombre y apellido, empresa, correo electrónico y teléfono, y adjunta los parámetros que hayas cargado en la calculadora. El segundo pide nombre o razón social, especialidad, correo electrónico y teléfono. Ningún formulario del sitio pide más de cuatro datos, y ninguno pide datos sensibles en los términos del artículo 2 de la Ley 25.326.",
      "Los de navegación. Si aceptás la medición en el aviso de cookies, recogemos a través de Google Analytics 4 información sobre cómo se usa el sitio: páginas vistas, origen de la visita, tipo de dispositivo y navegador, y qué acciones se realizan, por ejemplo un clic en agendar una demostración. Si no la aceptás, no se recoge nada de esto.",
      "También podés escribirnos directamente por correo, por teléfono o por WhatsApp. En ese caso los datos son los que decidas incluir en tu mensaje.",
    ],
  },
  {
    n: "02",
    title: "Cómo llegan esos datos hasta nosotros",
    paragraphs: [
      "Los formularios de este sitio no envían tus datos a un servidor nuestro ni a un servicio de terceros: abren tu propio programa de correo con el mensaje ya escrito, dirigido a contacto@inspectia.ai, y sos vos quien lo envía. Mientras no lo envíes, los datos no salen de tu computadora.",
      "Lo que recibimos, entonces, es un correo electrónico común, que queda en nuestra casilla junto con el resto de la correspondencia. El acceso a esa casilla está restringido al personal de InspectIA.",
    ],
  },
  {
    n: "03",
    title: "Para qué los usamos",
    paragraphs: [
      "Los datos de los formularios se usan para responderte: enviarte el informe que pediste, coordinar una conversación, evaluar una postulación al programa para consultores y, si corresponde, hacer el seguimiento comercial de esa conversación.",
      "Los datos de navegación se usan de forma agregada para entender qué contenido resulta útil y mejorar el sitio. No se usan para tomar decisiones automatizadas sobre personas ni para elaborar perfiles individuales.",
      "No usamos tus datos con una finalidad distinta de aquella para la que los diste, ni te enviamos comunicaciones comerciales masivas que no hayas pedido.",
    ],
  },
  {
    n: "04",
    title: "Con quién se comparten",
    paragraphs: [
      "No vendemos, alquilamos ni cedemos datos personales a terceros.",
      "El único tercero que interviene en el tratamiento es Google, a través de Google Tag Manager y Google Analytics 4, y sólo si aceptaste la medición. Google trata esos datos conforme a sus propias políticas, publicadas en policies.google.com.",
      "Podríamos tener que revelar información si una autoridad competente lo requiere en el marco de un proceso legal.",
    ],
  },
  {
    n: "05",
    title: "Cookies y almacenamiento en tu navegador",
    paragraphs: [
      "El sitio funciona sin cookies de medición. Al entrar por primera vez, si hay medición configurada, aparece un aviso donde podés aceptarla o rechazarla; hasta que elijas, el consentimiento está denegado por defecto y no se carga ninguna etiqueta de medición.",
      "Tu elección se guarda en el almacenamiento local de tu navegador, bajo la clave inspectia.consent. Ese dato no viaja a ningún servidor nuestro: sólo sirve para no volver a preguntarte en cada visita. Si borrás los datos del sitio en tu navegador, se te vuelve a preguntar.",
      "Si aceptás la medición, Google Analytics 4 instala sus propias cookies para distinguir visitas. Podés revocar tu elección en cualquier momento borrando los datos del sitio en tu navegador.",
    ],
  },
  {
    n: "06",
    title: "Cuánto tiempo los conservamos",
    paragraphs: [
      "La correspondencia que nos enviás se conserva mientras dure el intercambio o la relación comercial, y después durante el plazo en que pueda resultar necesaria para atender una consulta, un reclamo o una obligación legal. Podés pedirnos la supresión antes, como explica la cláusula 08.",
      "Los datos de navegación quedan sujetos al plazo de conservación configurado en la propiedad de Google Analytics.",
    ],
  },
  {
    n: "07",
    title: "Enlaces y servicios de terceros",
    paragraphs: [
      "Desde el sitio se puede pasar a servicios que no operamos nosotros: la agenda de Google donde se reservan las demostraciones, WhatsApp, LinkedIn y la aplicación de InspectIA. Cada uno tiene su propia política de privacidad, que es la que rige lo que pase ahí. Esta política cubre únicamente el sitio inspectia.ai.",
    ],
  },
  {
    n: "08",
    title: "Tus derechos",
    paragraphs: [
      "Podés pedirnos acceder a los datos personales que tengamos sobre vos, rectificarlos si son inexactos, actualizarlos y solicitar su supresión. Para hacerlo, escribinos a contacto@inspectia.ai desde la dirección con la que nos contactaste, o indicando cómo podemos verificar tu identidad.",
      // Las dos frases que siguen son fórmulas reglamentarias y van textuales: no se
      // reescriben ni se adaptan al tono del resto del sitio.
      "El titular de los datos personales tiene la facultad de ejercer el derecho de acceso al mismo en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326.",
      "LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.",
    ],
  },
  {
    n: "09",
    title: "Menores de edad",
    paragraphs: [
      "Este sitio se dirige a empresas y a personas que se contactan en el marco de su actividad profesional. No está destinado a menores de edad y no recogemos datos de ellos a sabiendas.",
    ],
  },
  {
    n: "10",
    title: "Cambios en esta política",
    paragraphs: [
      "Si cambia la forma en que tratamos los datos —por ejemplo, si los formularios pasan a enviarse a un sistema de gestión comercial en lugar de por correo—, actualizamos esta política y cambiamos la fecha que figura al comienzo. Conviene revisarla cada tanto.",
    ],
  },
];
