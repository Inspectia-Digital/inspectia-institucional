/**
 * Genera public/sitemap.xml y public/robots.txt antes del build.
 *
 * Importa los módulos de contenido directamente —Node 24 quita los tipos solo— en vez de
 * repetir la lista de URLs. Una lista de rutas escrita a mano en un script se desincroniza
 * del sitio a la segunda página que alguien agrega, y nadie se entera hasta que Search
 * Console reporta 404 en el sitemap.
 *
 * Se corre con: npm run sitemap (y solo, en prebuild).
 */
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const { MODULES } = await import("../src/content/modules.ts");
const { INDUSTRIES } = await import("../src/content/solutions.ts");
const { FEATURES } = await import("../src/content/features.ts");
const { GUIDES } = await import("../src/content/guides.ts");
const { SHOW_PRICING, SHOW_RESOURCES, SITE_URL } = await import("../src/content/site.ts");
const { approvedCases } = await import("../src/content/cases.ts");
const { IA_APPLICATIONS } = await import("../src/content/ia.ts");
const { MCP } = await import("../src/content/mcp.ts");
const { KITS } = await import("../src/content/kit40.ts");
const { APP_SHOT, MODULE_SHOTS } = await import("../src/content/assets.ts");
const { CATEGORY_PAGES, SYSTEM_PAGES, HUB } = await import("../src/content/integrations.ts");
const { FASON_PAGES } = await import("../src/content/fason.ts");
const { publishedPosts } = await import("../src/content/blog.ts");

/**
 * Las capturas que se declaran con su página, por la extensión de imagen del sitemap.
 *
 * Sirve para que Google Imágenes las encuentre sin depender de rastrear el HTML y de que
 * el `srcset` no la confunda. Es un empujón chico —las imágenes del cuerpo se descubren
 * igual— pero el costo es una línea por URL.
 *
 * **Sólo se emite `image:loc`.** La extensión define además `image:title`, `image:caption`
 * y `image:license`, y Google dejó de usarlas en 2022: declararlas sería ruido que
 * aparenta metadata. El epígrafe y el texto alternativo viven en el HTML, que es donde se
 * leen.
 */
const imagenesDe = (loc) => {
  if (loc === "/") return [APP_SHOT.src];
  const m = loc.match(/^\/plataforma\/([a-z-]+)$/);
  const shot = m && MODULE_SHOTS[m[1]];
  return shot ? [shot.src] : [];
};

/** prioridad: qué tan cerca de la compra está la página, no cuánto nos gusta. */
const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/plataforma", priority: "0.9", changefreq: "monthly" },
  ...MODULES.map((m) => ({
    loc: `/plataforma/${m.slug}`,
    priority: "0.9",
    changefreq: "monthly",
  })),
  /* Las funcionalidades, un nivel abajo de su módulo. Prioridad igual a la del módulo
     (0.9) y no menor: la búsqueda que atacan —"monitoreo automático de OEE"— es más
     específica que la de categoría, así que está más cerca de la compra, no más lejos. */
  ...FEATURES.map((f) => ({
    // El slug del módulo y no su clave: hoy coinciden en los cuatro módulos con
    // funcionalidad, y el día que uno se renombre sin tocar la clave —ya pasó tres veces
    // con el catálogo de octubre— esta línea seguiría generando la URL vieja.
    loc: `/plataforma/${MODULES.find((m) => m.key === f.module).slug}/${f.slug}`,
    priority: "0.9",
    changefreq: "monthly",
  })),
  /* Integraciones, que dejó de colgar de /plataforma (noviembre de 2026).
     La URL vieja sale del mapa y entran las seis nuevas; el 301 lo pone `http-policy.ts`.

     0.8 en el hub y en las categorías, y no 0.6 como tenía la página anterior: «¿se
     integra con mi ERP?» es una objeción de compra, no una curiosidad técnica, y las
     páginas por sistema atacan la intención más específica que hay en esta sección
     («odoo OEE»), así que van con la misma prioridad que una funcionalidad. */
  { loc: "/integraciones", priority: "0.8", changefreq: "monthly" },
  ...CATEGORY_PAGES.map((p) => ({
    loc: `/integraciones/${p.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  ...SYSTEM_PAGES.map((p) => ({
    loc: `/integraciones/${p.slug}`,
    priority: "0.9",
    changefreq: "monthly",
  })),
  { loc: "/plataforma/marketplace", priority: "0.7", changefreq: "monthly" },
  { loc: "/soluciones", priority: "0.8", changefreq: "monthly" },
  // Sólo las industrias publicadas: las otras cuatro no tienen todavía un problema ni un
  // dato propios, y una página vacía indexada es peor que ninguna página.
  ...INDUSTRIES.filter((i) => i.published).map((i) => ({
    loc: `/soluciones/${i.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  /* Las dos de fasón. Van con la prioridad de una industria porque son lo mismo para la
     búsqueda —una entrada por cómo trabaja la planta— aunque no sean un rubro. */
  ...FASON_PAGES.map((p) => ({
    loc: p.path,
    priority: "0.8",
    changefreq: "monthly",
  })),
  /* Las guías. Los cinco casos de uso estaban acá bajo /soluciones/casos-de-uso y se
     fueron a /guias: las URLs viejas salen del mapa y entran las nuevas, que es la mitad
     del trabajo de una mudanza con 301 —la otra mitad la hace `http-policy.ts`—.

     0.7 y no 0.8: una guía responde una pregunta y no vende nada, así que está un paso
     más lejos de la compra que una página de industria. */
  { loc: "/guias", priority: "0.6", changefreq: "monthly" },
  ...GUIDES.map((g) => ({
    loc: `/guias/${g.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    /* El único `lastmod` del mapa, y a propósito.
       Es el campo que un buscador sí mira para decidir si vale la pena volver, pero sólo
       mientras sea cierto: declarar la fecha del despliegue en las 60 URLs haría que todo
       el sitio se "actualizara" cada vez que alguien toca un color, y un `lastmod` que
       miente se deja de leer para el dominio entero. Las guías son las únicas páginas con
       una fecha de contenido real —la misma que muestran y que va al `Article`— así que
       son las únicas que lo declaran. */
    lastmod: g.updated,
  })),
  // La página devuelve 404 mientras no haya un caso aprobado para publicar, así que
  // tampoco se declara: una URL en el sitemap que responde 404 es un error de rastreo.
  ...(approvedCases().length > 0
    ? [{ loc: "/soluciones/casos", priority: "0.6", changefreq: "monthly" }]
    : []),
  /* El blog entra con el primer artículo publicado y no antes.
     Un índice vacío declarado en el mapa es una página delgada ofrecida al rastreo, y el
     borrador no se declara nunca: su URL devuelve 404. Es la misma regla que ya usa
     /soluciones/casos. Se enciende solo. */
  ...(publishedPosts().length > 0
    ? [
        { loc: "/blog", priority: "0.6", changefreq: "weekly" },
        ...publishedPosts().map((p) => ({
          loc: `/blog/${p.slug}`,
          priority: "0.7",
          changefreq: "monthly",
          lastmod: p.updated ?? p.date,
        })),
      ]
    : []),
  { loc: "/simulador", priority: "0.8", changefreq: "monthly" },
  { loc: "/roi", priority: "0.9", changefreq: "monthly" },

  // IA y Kit 4.0 salen de sus módulos de contenido: una aplicación o un kit nuevo entra
  // al mapa del sitio sin que nadie se acuerde de agregarlo acá.
  { loc: "/ia", priority: "0.9", changefreq: "monthly" },
  ...IA_APPLICATIONS.filter((a) => a.hasPage).map((a) => ({
    loc: `/ia/${a.id}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
  // El conector MCP no es una aplicación del catálogo de IA —no se cotiza como proyecto—
  // así que entra por su propio contenido.
  { loc: MCP.path, priority: "0.7", changefreq: "monthly" },
  { loc: "/kit-4-0", priority: "0.9", changefreq: "monthly" },
  ...KITS.map((k) => ({
    loc: `/kit-4-0/${k.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
  { loc: "/partners", priority: "0.7", changefreq: "monthly" },
  { loc: "/contacto", priority: "0.6", changefreq: "yearly" },
  { loc: "/nosotros", priority: "0.5", changefreq: "yearly" },
  // Las que están detrás de un flag no entran hasta que se publiquen.
  ...(SHOW_PRICING ? [{ loc: "/precios", priority: "0.9", changefreq: "monthly" }] : []),
  ...(SHOW_RESOURCES ? [{ loc: "/recursos", priority: "0.7", changefreq: "weekly" }] : []),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>${
      u.lastmod
        ? `
    <lastmod>${u.lastmod}</lastmod>`
        : ""
    }
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${imagenesDe(u.loc)
      .map((src) => `\n    <image:image><image:loc>${SITE_URL}${src}</image:loc></image:image>`)
      .join("")}
  </url>`,
  )
  .join("\n")}
</urlset>
`;

// /demo redirige al calendario de Google y /legales y /privacidad no aportan a la
// búsqueda, así que se excluyen de la exploración en vez de gastar presupuesto de rastreo.
/**
 * robots.txt.
 *
 * **Legales y privacidad NO van en Disallow**, aunque no queramos que se indexen. Las
 * dos cosas se pisan: un Disallow impide el rastreo, y sin rastreo el buscador nunca lee
 * el `noindex` de la página. Como el pie las enlaza desde todo el sitio, el resultado de
 * combinarlas es el peor de los dos mundos —la URL igual aparece indexada, sin título ni
 * descripción, porque el buscador la conoce por el enlace pero tiene prohibido abrirla—.
 * Con el meta `noindex` alcanza, y para que funcione hay que dejar entrar al robot.
 *
 * /demo sí va en Disallow y es el caso opuesto: es una redirección 302 al calendario, no
 * devuelve HTML, así que no hay dónde poner un meta. Tampoco está enlazada desde ninguna
 * página, así que no corre el riesgo de quedar indexada por referencia.
 *
 * **Los rastreadores de IA entran, y es una decisión tomada** (agosto de 2026): no hay
 * bloques para GPTBot, ClaudeBot, PerplexityBot, CCBot ni Google-Extended. El comprador
 * industrial cada vez más le pregunta a un asistente por proveedores antes de buscar en
 * Google, y un sitio que esos bots no pueden leer no aparece en esa respuesta. El costo
 * asumido es que el contenido se use para entrenar. Si alguien va a revertirlo, que sea
 * a propósito y no "por las dudas".
 */
const robots = `User-agent: *
Allow: /
Disallow: /demo

Sitemap: ${SITE_URL}/sitemap.xml
`;

/**
 * llms.txt.
 *
 * Es el índice del sitio para un asistente: markdown plano, una línea por página y una
 * descripción de qué responde cada una. No reemplaza al sitemap —ese le habla a un
 * rastreador y lleva prioridad y frecuencia— sino que resuelve el otro problema: un
 * modelo que llega con una pregunta concreta tiene que poder elegir **una** página sin
 * rastrear sesenta.
 *
 * **Ningún motor documenta hoy que lo lea**, y se publica igual por dos motivos: cuesta
 * una línea por URL y se genera del mismo contenido que el resto, así que no se
 * desincroniza; y la sección de integraciones y la de fasón son justamente las que un
 * comprador industrial pregunta a un asistente antes de buscar en Google.
 *
 * Se arma de los módulos de contenido, nunca a mano: una lista escrita a mano se separa
 * del sitio en la segunda página que alguien agrega.
 */
const seccion = (titulo, items) =>
  items.length === 0 ? "" : `\n## ${titulo}\n\n${items.join("\n")}\n`;

const linea = (nombre, loc, nota) => `- [${nombre}](${SITE_URL}${loc}): ${nota}`;

const llms = `# InspectIA

> Plataforma SaaS que mide y mejora la operación de una fábrica: OEE y producción,
> calidad, stock, trazabilidad, tareas, energía y mantenimiento. Funciona sobre la
> infraestructura que la planta ya tiene —el PLC, el SCADA, el ERP, las cámaras— y se
> puede empezar con carga manual, sin hardware. Multi-planta, en español, para pymes
> industriales de América Latina y España.

Los precios y los planes de cada módulo están en la página del módulo. Lo que se cotiza
por proyecto lo dice la página que lo ofrece.
${seccion("Plataforma", [
  linea(
    "Cómo funciona la plataforma",
    "/plataforma",
    "Los ocho módulos sobre una sola base de plantas, líneas y usuarios.",
  ),
  ...MODULES.map((m) => linea(m.name, `/plataforma/${m.slug}`, m.promise)),
])}${seccion(
  "Funcionalidades",
  FEATURES.map((f) =>
    linea(f.name, `/plataforma/${MODULES.find((m) => m.key === f.module).slug}/${f.slug}`, f.blurb),
  ),
)}${seccion("Integraciones", [
  linea(
    HUB.name,
    "/integraciones",
    "Con qué ERP, SCADA, PLC, WMS y sistemas de trazabilidad trabaja, sistema por sistema.",
  ),
  ...CATEGORY_PAGES.map((p) => linea(p.name, `/integraciones/${p.slug}`, p.seoDescription)),
  ...SYSTEM_PAGES.map((p) => linea(p.name, `/integraciones/${p.slug}`, p.seoDescription)),
])}${seccion("Soluciones", [
  linea("Por industria y por problema", "/soluciones", "Qué módulos usa cada rubro."),
  ...INDUSTRIES.filter((i) => i.published).map((i) =>
    linea(i.name, `/soluciones/${i.slug}`, i.pain),
  ),
  ...FASON_PAGES.map((p) => linea(p.name, p.path, p.seoDescription)),
])}${seccion("Guías", [
  linea("Índice de guías", "/guias", "Cómo se hace cada cosa, en español neutro."),
  ...GUIDES.map((g) => linea(g.title, `/guias/${g.slug}`, g.seoDescription)),
])}${seccion(
  "Blog",
  publishedPosts().length > 0
    ? [
        linea("Índice del blog", "/blog", "Definiciones, cálculos y explicaciones técnicas."),
        ...publishedPosts().map((p) => linea(p.title, `/blog/${p.slug}`, p.seoDescription)),
      ]
    : [],
)}${seccion("Herramientas y contacto", [
  linea(
    "Simulador de OEE",
    "/simulador",
    "Calcular el OEE de una línea con datos propios, sin registrarse.",
  ),
  linea(
    "Calculadora de retorno",
    "/roi",
    "Cuánto se recupera de medir producción, calidad o inventario.",
  ),
  linea(
    "Asistentes de IA",
    MCP.path,
    "Conectar Claude o ChatGPT a los datos de la planta, en sólo lectura.",
  ),
  linea("Contacto", "/contacto", "Pedir una demostración o contar qué sistema se usa."),
  linea("Quiénes somos", "/nosotros", "La empresa, el equipo y los socios."),
])}`;

await writeFile(join(ROOT, "public", "sitemap.xml"), sitemap, "utf8");
await writeFile(join(ROOT, "public", "robots.txt"), robots, "utf8");
await writeFile(join(ROOT, "public", "llms.txt"), llms, "utf8");

console.log(`sitemap.xml: ${urls.length} URLs sobre ${SITE_URL}`);
console.log("robots.txt: listo");
console.log(`llms.txt: ${llms.split("\n").filter((l) => l.startsWith("- [")).length} páginas`);
