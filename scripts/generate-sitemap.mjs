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
  { loc: "/soluciones/casos", priority: "0.6", changefreq: "monthly" },
  { loc: "/roi", priority: "0.9", changefreq: "monthly" },
  { loc: "/partners", priority: "0.7", changefreq: "monthly" },
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
const robots = `User-agent: *
Allow: /
Disallow: /demo
Disallow: /legales
Disallow: /privacidad

Sitemap: ${SITE_URL}/sitemap.xml
`;

await writeFile(join(ROOT, "public", "sitemap.xml"), sitemap, "utf8");
await writeFile(join(ROOT, "public", "robots.txt"), robots, "utf8");

console.log(`sitemap.xml: ${urls.length} URLs sobre ${SITE_URL}`);
console.log("robots.txt: listo");
