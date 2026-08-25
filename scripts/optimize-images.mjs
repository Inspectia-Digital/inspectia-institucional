// Reencoda los originales de assets-src/ a WebP en public/img.
// Los originales viven fuera de public/ a propósito: ahí adentro el servidor estático
// los publicaría, y el plano pesa 2 MB.
// Los logos llegaron del storage de Lovable a resolución de imprenta —bps venía en
// 3509x2481 para mostrarse a 40px de alto— así que acá se bajan a tamaño de pantalla.
// Correr con: npm run images
import { copyFile, mkdir, readdir, stat, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(ROOT, "assets-src");
const OUT = join(ROOT, "public", "img");

// Nombres normalizados a kebab-case: los originales venían como Antea_Group.png,
// balluff_png.png, sitecno_sa_logo.jpeg.
const LOGOS = {
  "Antea_Group.png": "antea-group",
  "auren.png": "auren",
  "balluff_png.png": "balluff",
  "bps.jpeg": "bps",
  "cygnus.jpg": "cygnus",
  "emprelatam.png": "emprelatam",
  "establecimiento-las-marias.jpg": "las-marias",
  "google-for-startups.jpg": "google-for-startups",
  "logo-arnx.png": "arnx",
  "miebach_logo.jpeg": "miebach",
  "molens-greenmills.png": "molens-greenmills",
  "motorola.jpg": "motorola",
  "quantitdata_logo.jpg": "quantit",
  "sitecno_sa_logo.jpeg": "sitecno",
  "springwall.png": "springwall",
  "tecnologia-bi.png": "tecnologia-bi",
};

// Los logos se muestran a 40px de alto como máximo; 160 cubre pantallas 4x.
const LOGO_MAX_HEIGHT = 160;

// El plano se muestra hasta 1200px de ancho. 1920 da margen para 1.6x; la variante
// de 960 es la que sirve el srcset en mobile.
const PLANT_WIDTHS = [1920, 960];

const kb = (n) => `${Math.round(n / 1024)} kB`;

async function sizeOf(path) {
  return (await stat(path)).size;
}

async function optimizeLogos() {
  const dir = join(RAW, "partners");
  const files = await readdir(dir);
  await mkdir(join(OUT, "partners"), { recursive: true });

  for (const file of files.sort()) {
    const slug = LOGOS[file];
    if (!slug) {
      console.warn(`  sin mapear, se saltea: ${file}`);
      continue;
    }
    const from = join(dir, file);
    const to = join(OUT, "partners", `${slug}.webp`);

    // withoutEnlargement: varios ya vienen chicos y agrandarlos sólo los ensucia.
    const resized = () =>
      sharp(from).resize({ height: LOGO_MAX_HEIGHT, fit: "inside", withoutEnlargement: true });

    // Un logo plano —arte vectorizado o PNG de paleta indexada— comprime mejor sin
    // pérdida: tecnologia-bi.png salía un 15% más pesado en WebP lossy que el original.
    // Se codifican las dos y gana la más liviana.
    const candidates = [
      { path: `${to}.lossy`, encode: () => resized().webp({ quality: 90 }) },
      { path: `${to}.lossless`, encode: () => resized().webp({ lossless: true, effort: 6 }) },
    ];
    for (const c of candidates) await c.encode().toFile(c.path);

    const sized = await Promise.all(
      candidates.map(async (c) => ({ ...c, size: await sizeOf(c.path) })),
    );
    const winner = sized.reduce((a, b) => (b.size < a.size ? b : a));
    // copyFile y no sharp(): reencodear el ganador lo pasaría otra vez por el
    // codificador con pérdida y arruinaría justo lo que se acaba de elegir.
    await copyFile(winner.path, to);
    for (const c of candidates) await unlink(c.path);

    const mode = winner.path.endsWith(".lossless") ? "sin pérdida" : "con pérdida";
    console.log(
      `  ${file} ${kb(await sizeOf(from))} → ${slug}.webp ${kb(await sizeOf(to))} (${mode})`,
    );
  }
}

async function optimizePlant() {
  const from = join(RAW, "plant", "fabrica-logistica.png");
  await mkdir(join(OUT, "plant"), { recursive: true });

  for (const width of PLANT_WIDTHS) {
    const suffix = width === PLANT_WIDTHS[0] ? "" : `-${width}`;
    const to = join(OUT, "plant", `fabrica-logistica${suffix}.webp`);
    await sharp(from).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(to);
    console.log(
      `  fabrica-logistica.png ${kb(await sizeOf(from))} → fabrica-logistica${suffix}.webp ${kb(await sizeOf(to))}`,
    );
  }
}

console.log("Logos:");
await optimizeLogos();
console.log("Plano de planta:");
await optimizePlant();
console.log("Listo.");
