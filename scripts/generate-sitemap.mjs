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
const { INDUSTRIES, USE_CASES } = await import("../src/content/solutions.ts");
const { SHOW_PRICING, SHOW_RESOURCES, SITE_URL } = await import("../src/content/site.ts");
const { approvedCases } = await import("../src/content/cases.ts");

/** prioridad: qué tan cerca de la compra está la página, no cuánto nos gusta. */
const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/plataforma", priority: "0.9", changefreq: "monthly" },
  ...MODULES.map((m) => ({
    loc: `/plataforma/${m.slug}`,
    priority: "0.9",
    changefreq: "monthly",
  })),
  { loc: "/plataforma/integraciones", priority: "0.6", changefreq: "monthly" },
  { loc: "/plataforma/marketplace", priority: "0.7", changefreq: "monthly" },
  { loc: "/soluciones", priority: "0.8", changefreq: "monthly" },
  // Sólo las industrias publicadas: las otras cuatro no tienen todavía un problema ni un
  // dato propios, y una página vacía indexada es peor que ninguna página.
  ...INDUSTRIES.filter((i) => i.published).map((i) => ({
    loc: `/soluciones/${i.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  ...USE_CASES.map((u) => ({
    loc: `/soluciones/casos-de-uso/${u.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  // La página devuelve 404 mientras no haya un caso aprobado para publicar, así que
  // tampoco se declara: una URL en el sitemap que responde 404 es un error de rastreo.
  ...(approvedCases().length > 0
    ? [{ loc: "/soluciones/casos", priority: "0.6", changefreq: "monthly" }]
    : []),
  { loc: "/roi", priority: "0.9", changefreq: "monthly" },
  { loc: "/partners", priority: "0.7", changefreq: "monthly" },
  { loc: "/contacto", priority: "0.6", changefreq: "yearly" },
  { loc: "/nosotros", priority: "0.5", changefreq: "yearly" },
  // Las que están detrás de un flag no entran hasta que se publiquen.
  ...(SHOW_PRICING ? [{ loc: "/precios", priority: "0.9", changefreq: "monthly" }] : []),
  ...(SHOW_RESOURCES ? [{ loc: "/recursos", priority: "0.7", changefreq: "weekly" }] : []),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
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

await writeFile(join(ROOT, "public", "sitemap.xml"), sitemap, "utf8");
await writeFile(join(ROOT, "public", "robots.txt"), robots, "utf8");

console.log(`sitemap.xml: ${urls.length} URLs sobre ${SITE_URL}`);
console.log("robots.txt: listo");
