/**
 * Genera `src/content/brand-logos.ts` con los logos de marca que trae `simple-icons`.
 *
 * ## Por qué un generador y no el paquete en el bundle
 *
 * `simple-icons` son 3.472 iconos. Importarlo desde una página del sitio mete el barril
 * entero en el grafo del bundler, que es el mismo problema que ya tuvo el léxico de
 * iconos con `lucide-react` (ver `src/components/icons/build-icons.mjs`: 1.689 módulos y
 * 659 kB en el chunk compartido). Acá se copian **los nueve que se usan** a un archivo de
 * contenido y el paquete queda como dependencia de desarrollo.
 *
 * ## Por qué `simple-icons` y no los SVG de cada marca
 *
 * Los archivos de `simple-icons` son CC0 y todos vienen normalizados a un `viewBox` de
 * 24×24 y un solo `path` monocromo. Eso es exactamente lo que la grilla de integraciones
 * necesita: un tono, un alto, sin animación. Bajar el SVG oficial de cada marca daría
 * veinte archivos con veinte cajas, veinte paletas y veinte licencias distintas.
 *
 * El `path` se guarda y se dibuja con `fill="currentColor"`, así que el tono sale de una
 * clase del tema y no de un color escrito en el activo.
 *
 * ## La lista se verifica, no se adivina
 *
 * El script falla si un slug no existe en la versión instalada. Eso es lo que detectó que
 * `katana` **no es** Katana MRP: el icono de ese slug es el Katana de Foundry, software de
 * iluminación 3D. Un logo equivocado al lado del nombre de un ERP es peor que el nombre
 * solo, así que Katana quedó sin logo. La verificación es contra el título y la fuente que
 * declara el paquete, y está anotada en la tabla de abajo.
 *
 * Se corre con: npm run logos
 */
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as simpleIcons from "simple-icons";
import prettier from "prettier";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Qué logo se copia y para qué sistema del catálogo de integraciones.
 *
 * `nota` dice qué se verificó en el paquete: va al archivo generado para que el próximo
 * que lea la lista no tenga que volver a comprobar que «Ignition» es de Inductive
 * Automation ni que un slug plausible era de otra empresa.
 */
const LOGOS = [
  { slug: "odoo", nota: "Odoo. Sirve para el ERP y para Odoo Inventario." },
  { slug: "sap", nota: "SAP. Para SAP Business One." },
  { slug: "siemens", nota: "Siemens. Para WinCC y para los S7 y LOGO!." },
  { slug: "rockwellautomation", nota: "Rockwell Automation. Para FactoryTalk." },
  { slug: "schneiderelectric", nota: "Schneider Electric. Para los Modicon." },
  { slug: "inductiveautomation", nota: "Inductive Automation, que es quien hace Ignition." },
  { slug: "totvs", nota: "TOTVS. Para Protheus." },
  { slug: "mqtt", nota: "MQTT, el protocolo." },
  { slug: "nodered", nota: "Node-RED." },
];

/** `rockwellautomation` → `siRockwellautomation`, que es como el paquete exporta. */
const exportName = (slug) => `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;

const faltan = LOGOS.filter((l) => !(exportName(l.slug) in simpleIcons));
if (faltan.length > 0) {
  console.error(`Slugs que no existen en simple-icons: ${faltan.map((l) => l.slug).join(", ")}`);
  process.exit(1);
}

const entradas = LOGOS.map((l) => {
  const icon = simpleIcons[exportName(l.slug)];
  return { ...l, title: icon.title, path: icon.path };
});

const version = JSON.parse(
  await (
    await import("node:fs/promises")
  ).readFile(join(ROOT, "node_modules", "simple-icons", "package.json"), "utf8"),
).version;

const out = `/**
 * Logos de marca de los sistemas integrables.
 *
 * **Generado desde \`scripts/build-brand-logos.mjs\`. No editar a mano:** se agrega el slug
 * a la lista de ese script y se corre \`npm run logos\`.
 *
 * Origen: \`simple-icons\` ${version}, licencia CC0. Cada entrada es un \`path\` sobre un
 * \`viewBox\` de 24×24, monocromo, que se dibuja con \`fill="currentColor"\`: el tono sale de
 * una clase del tema y no de un color guardado en el activo.
 *
 * **El nombre del logo no es el nombre del sistema.** «Ignition» se dibuja con el logo de
 * Inductive Automation, que es quien lo hace. Lo que cada uno representa está en \`title\`.
 *
 * Los sistemas sin logo acá se muestran con el nombre en texto, que es lo que pide la
 * regla de logos de los lineamientos.
 */

export type BrandLogo = {
  /** El nombre de la marca dueña del logo, tal como lo declara el paquete. */
  title: string;
  /** El \`d\` del único \`path\`, sobre un viewBox de 24×24. */
  path: string;
};

export const BRAND_LOGOS = {
${entradas
  .map(
    (e) => `  // ${e.nota}
  "${e.slug}": {
    title: ${JSON.stringify(e.title)},
    path: ${JSON.stringify(e.path)},
  },`,
  )
  .join("\n")}
} satisfies Record<string, BrandLogo>;

export type BrandLogoKey = keyof typeof BRAND_LOGOS;
`;

await writeFile(
  join(ROOT, "src", "content", "brand-logos.ts"),
  await prettier.format(out, {
    filepath: "brand-logos.ts",
    ...(await prettier.resolveConfig(ROOT)),
  }),
  "utf8",
);

console.log(`brand-logos.ts: ${entradas.length} logos de simple-icons ${version}`);
