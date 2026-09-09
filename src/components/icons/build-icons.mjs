/**
 * Genera `inspectia-icons.ts` desde `icons.json`.
 *
 * El mapa no se edita a mano: se edita `icons.json` y se corre `npm run icons`. Es la
 * misma regla que trae el paquete original del design system, y existe para que el léxico
 * tenga una sola fuente.
 *
 * Valida además que todo glifo declarado exista en la versión de `lucide-react` que el
 * repo tiene instalada. El paquete se escribió contra la 0.469 y acá corre una más nueva:
 * sin esta comprobación, un glifo renombrado entre versiones se descubre en pantalla.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as lucide from "lucide-react";
import prettier from "prettier";

const HERE = dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(readFileSync(join(HERE, "icons.json"), "utf8"));

/** `scan-eye` → `ScanEye`, que es como `lucide-react` exporta cada glifo. */
const pascal = (s) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());

const glyphs = [...new Set(spec.groups.flatMap((g) => g.items.map((i) => i.lucide)))].sort();
const missing = glyphs.filter((g) => !(pascal(g) in lucide));

if (missing.length > 0) {
  console.error(`Glifos que no existen en lucide-react: ${missing.join(", ")}`);
  process.exit(1);
}

/* Se importan por nombre TODOS los glifos aprobados, no sólo los del léxico.
 *
 * Antes entraban sólo los del léxico y `Icon.tsx` resolvía el resto contra el mapa
 * `icons` de lucide-react. Ese mapa es el barril completo de la librería: arrastraba
 * 1689 módulos y dejaba el chunk compartido del sitio en 659 kB, cargado en cada página.
 * Medido con PageSpeed el 9 de septiembre de 2026: 342 kB de JavaScript sin usar, 2,9 s
 * de ejecución y 38 de rendimiento en móvil.
 *
 * Con el mapa estático el bundler puede podar: entran los aprobados y nada más. */
const used = [...new Set(glyphs.map(pascal))].sort();

const out = `/**
 * InspectIA — léxico de iconos.
 *
 * **Generado desde icons.json. No editar a mano:** editar el JSON y correr \`npm run icons\`.
 *
 * ICON mapea CONCEPTO DE NEGOCIO → glifo. Es la capa que hay que usar: si mañana un
 * concepto cambia de glifo, cambia acá y en ningún otro lado.
 */
import type { LucideIcon } from "lucide-react";
import {
${used.map((n) => `  ${n},`).join("\n")}
} from "lucide-react";

export const ICON = {
${spec.lexicon.map((e) => `  ${e.concept}: ${pascal(e.lucide)},`.padEnd(46) + ` // ${e.label}`).join("\n")}
} satisfies Record<string, LucideIcon>;

export type IconConcept = keyof typeof ICON;

/** Subconjunto aprobado de Lucide. Cualquier glifo fuera de esta lista se rechaza en review. */
export const ALLOWED_ICONS = [
${glyphs.map((g) => `  "${g}",`).join("\n")}
] as const;

export type AllowedIcon = (typeof ALLOWED_ICONS)[number];

/**
 * Nombre aprobado de Lucide → componente, resuelto en tiempo de compilación.
 *
 * Existe para que \`Icon\` no importe el mapa \`icons\` de lucide-react, que es la librería
 * entera. Generado: no se edita a mano.
 */
export const GLYPH = {
${glyphs.map((g) => `  "${g}": ${pascal(g)},`).join("\n")}
} satisfies Record<AllowedIcon, LucideIcon>;

/** Cuatro tamaños y ninguno más. No se acepta un número arbitrario, a propósito. */
export const ICON_SIZE = {
  meta: ${spec.sizes.meta},
  ui: ${spec.sizes.ui},
  empty: ${spec.sizes.empty},
  brand: ${spec.sizes.brand},
} as const;

export const ICON_STROKE = ${spec.strokeWidth};
`;

// Formateado con la configuración del repo: si no, el archivo generado es el único que
// el linter rechaza, y `npm run icons` dejaría el repo en rojo cada vez que se corre.
const formatted = await prettier.format(out, {
  ...(await prettier.resolveConfig(join(HERE, "inspectia-icons.ts"))),
  parser: "typescript",
});

writeFileSync(join(HERE, "inspectia-icons.ts"), formatted);
console.log(
  `inspectia-icons.ts: ${spec.lexicon.length} conceptos, ${glyphs.length} glifos aprobados, ` +
    `lucide ${spec.version}`,
);
