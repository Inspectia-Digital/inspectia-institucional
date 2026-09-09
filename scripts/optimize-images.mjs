// Reencoda los originales de assets-src/ a WebP en public/img.
// Los originales viven fuera de public/ a propósito: ahí adentro el servidor estático
// los publicaría, y el plano pesa 2 MB.
// Los logos llegaron del storage de Lovable a resolución de imprenta —bps venía en
// 3509x2481 para mostrarse a 48px de alto— así que acá se bajan a tamaño de pantalla.
// Correr con: npm run images
import { copyFile, mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(ROOT, "assets-src");
const OUT = join(ROOT, "public", "img");

/* Un argumento corre una sola etapa: `npm run images -- favicon`. Sin esto, cambiar el
 * favicon obliga a reescribir los treinta y pico de archivos que genera el resto, y el
 * diff deja de decir qué cambió de verdad. Sin argumento corre todo, como siempre. */
const etapas = process.argv.slice(2);
const corre = (nombre) => etapas.length === 0 || etapas.includes(nombre);

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

// Los logos se muestran a 48px de alto como máximo; 192 cubre pantallas 4x.
const LOGO_MAX_HEIGHT = 192;

/**
 * Recorte del margen de cada logo.
 *
 * Los archivos llegaron con márgenes que no tienen nada que ver entre sí: cygnus.jpg es
 * un cuadrado de 200x200 donde la marca ocupa 45px de alto —el 23 %— y balluff llega
 * recortado al pixel. Igualar la altura del **archivo**, que es lo que hace la fila de
 * logos, entonces no iguala nada: la marca de Cygnus se dibujaba a 11px mientras la de
 * Balluff se dibujaba a 48. Recortando el margen, la altura del archivo pasa a ser la
 * altura de la marca y la fila queda pareja de verdad.
 *
 * **Sólo se recorta cuando el borde es blanco o transparente.** Springwall y Quantit
 * vienen como una placa de color con el logotipo adentro, y ahí el margen es parte del
 * diseño de la marca: recortarlo deja el texto pegado al filo de la placa. Esos dos se
 * dejan como están y quedan pendientes de un archivo con fondo transparente, que es la
 * solución de verdad.
 */
async function borderIsBlank(from) {
  const { data, info } = await sharp(from)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  const at = (x, y) => {
    const i = (y * w + x) * channels;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };
  // Cuatro esquinas y el punto medio de cada lado. Con las esquinas solas, un logotipo
  // que toca el borde por el medio se leería igual como "margen blanco".
  const edge = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
    [w >> 1, 0],
    [w >> 1, h - 1],
    [0, h >> 1],
    [w - 1, h >> 1],
  ].map(([x, y]) => at(x, y));

  const transparent = edge.every((p) => p[3] < 16);
  const white = edge.every((p) => p[3] > 240 && p[0] > 244 && p[1] > 244 && p[2] > 244);
  return transparent || white;
}

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

    const trim = await borderIsBlank(from);

    // withoutEnlargement: varios ya vienen chicos y agrandarlos sólo los ensucia.
    const resized = () => {
      const img = sharp(from);
      // El umbral de 12 tolera el borde sucio de los JPEG, donde el "blanco" del margen
      // ronda 250 y no 255.
      return (trim ? img.trim({ threshold: 12 }) : img).resize({
        height: LOGO_MAX_HEIGHT,
        fit: "inside",
        withoutEnlargement: true,
      });
    };

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
    const meta = await sharp(to).metadata();
    console.log(
      `  ${file} ${kb(await sizeOf(from))} → ${slug}.webp ${kb(await sizeOf(to))} ` +
        `${meta.width}x${meta.height} (${mode}${trim ? ", recortado" : ", sin recortar"})`,
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

/**
 * Lockup de marca.
 *
 * Hasta ahora la barra y el pie escribían "InspectIA" con tipografía, porque no había
 * archivo. El design system lo trae —isotipo hexagonal más logotipo— pero **sólo en PNG**:
 * el propio handoff de iconos declara el isotipo como no vectorizado. Un PNG a 3x del
 * tamaño de uso se ve bien en cualquier pantalla, así que sirve mientras tanto; el SVG
 * sigue pendiente y es lo que hace falta para escalar sin techo.
 *
 * La versión en blanco se genera **desde el alfa del propio archivo**, no se dibuja: el
 * lockup es de un solo color, así que teñir su silueta da exactamente la misma marca
 * invertida, que es el tratamiento que muestran las guías de la marca.
 */
const LOCKUP_HEIGHT = 96; // se usa a 32px; 96 cubre pantallas 3x

async function optimizeBrand() {
  const from = join(RAW, "brand", "lockup.png");
  await mkdir(join(OUT, "brand"), { recursive: true });

  const base = () =>
    sharp(from).trim().resize({ height: LOCKUP_HEIGHT, fit: "inside", withoutEnlargement: false });

  const to = join(OUT, "brand", "lockup.webp");
  await base().webp({ lossless: true, effort: 6 }).toFile(to);
  console.log(`  lockup.png → brand/lockup.webp ${kb(await sizeOf(to))}`);

  // Blanco sobre teal: se conserva el alfa y se reemplaza el color por blanco puro.
  const neg = join(OUT, "brand", "lockup-blanco.webp");
  const { data, info } = await base().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += info.channels) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .webp({ lossless: true, effort: 6 })
    .toFile(neg);
  console.log(`  lockup.png → brand/lockup-blanco.webp ${kb(await sizeOf(neg))}`);

  // Isotipo solo, para el favicon y para donde no entra el lockup completo.
  const iso = join(OUT, "brand", "isotipo.webp");
  await sharp(join(RAW, "brand", "isotipo-small.png"))
    .trim()
    .resize({ height: 192, fit: "inside" })
    .webp({ lossless: true, effort: 6 })
    .toFile(iso);
  console.log(`  isotipo-small.png → brand/isotipo.webp ${kb(await sizeOf(iso))}`);

  /* PNG del lockup, para lo que no entiende WebP.
   *
   * Todo el sitio sirve WebP y está bien, pero hay dos consumidores afuera que no lo
   * soportan de forma confiable y necesitan una URL pública y estable:
   *
   * - **Los clientes de correo.** Outlook y varios clientes de escritorio no muestran
   *   WebP, así que un logo en las plantillas de Auth0 —verificación de correo,
   *   bienvenida, recuperación de contraseña— llega roto para una parte de la gente.
   * - **Paneles de terceros** que piden una URL de logotipo y la validan por extensión.
   *
   * Fondo transparente y 240px de alto: entra bien en la cabecera de un correo a 2x y en
   * el encabezado del login universal.
   */
  const png = join(OUT, "brand", "lockup.png");
  await sharp(from)
    .trim()
    .resize({ height: 240, fit: "inside", withoutEnlargement: false })
    .png({ compressionLevel: 9, palette: true })
    .toFile(png);
  console.log(`  lockup.png → brand/lockup.png ${kb(await sizeOf(png))}`);
}

/**
 * Favicon.
 *
 * El sitio se publicó sin ninguno: `/favicon.ico` devolvía 404 y la pestaña salía en
 * blanco. Es lo primero que se ve de una marca en un navegador con veinte pestañas
 * abiertas.
 *
 * **Va el isotipo en blanco sobre una baldosa teal, y no el isotipo tal cual.** El
 * original es teal sobre transparencia con un 81 % de píxeles vacíos: a 16px eso queda
 * casi invisible sobre una pestaña oscura, y lo poco que se ve es un trazo fino. Una
 * baldosa sólida da masa y contraste sobre cualquier fondo, claro u oscuro, que es lo
 * único que importa a ese tamaño.
 *
 * El ICO se arma a mano porque sharp no lo escribe. El formato es un contenedor simple
 * —cabecera, un índice y los PNG adentro— y los navegadores actuales leen PNG dentro de
 * ICO sin problema. Se genera igual porque el navegador pide `/favicon.ico` por su cuenta
 * aunque el HTML declare otra cosa, y un 404 por visita es ruido que no hace falta.
 */
const FAVICON_TILE = "#0d7377";
const ICO_SIZES = [16, 32, 48];

/** Una baldosa cuadrada con el isotipo blanco centrado, al tamaño pedido. */
async function faviconTile(size) {
  const marca = await sharp(join(RAW, "brand", "isotipo-small.png"))
    .trim()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Se tiñe la silueta de blanco conservando el alfa, igual que el lockup del pie.
  for (let i = 0; i < marca.data.length; i += marca.info.channels) {
    marca.data[i] = 255;
    marca.data[i + 1] = 255;
    marca.data[i + 2] = 255;
  }

  // 72 % del lienzo: menos se pierde, más queda apretado contra el borde.
  const interior = Math.round(size * 0.72);
  const blanca = await sharp(marca.data, {
    raw: { width: marca.info.width, height: marca.info.height, channels: marca.info.channels },
  })
    .resize({ width: interior, height: interior, fit: "inside" })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: FAVICON_TILE },
  })
    .composite([{ input: blanca, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Empaqueta varios PNG en un .ico. Cabecera de 6 bytes + 16 por imagen + los datos. */
function packIco(pngs) {
  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // 1 = icono
  cabecera.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const indice = [];
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 significa 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // paleta
    e.writeUInt8(0, 3); // reservado
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por píxel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    indice.push(e);
    offset += data.length;
  }

  return Buffer.concat([cabecera, ...indice, ...pngs.map((p) => p.data)]);
}

async function optimizeFavicon() {
  const pngs = [];
  for (const size of ICO_SIZES) pngs.push({ size, data: await faviconTile(size) });

  const ico = join(ROOT, "public", "favicon.ico");
  await writeFile(ico, packIco(pngs));
  console.log(`  isotipo-small.png → favicon.ico ${ICO_SIZES.join("/")} ${kb(await sizeOf(ico))}`);

  /* 96 y no 32, que es lo que había.
   *
   * Google sólo acepta como favicon de resultados un cuadrado de 48px **o un múltiplo**,
   * y el 32 era el único tamaño que el HTML declaraba de forma explícita: el ICO va con
   * `sizes="any"`, que no dice nada aunque adentro lleve un 48. Comprobado el 9 de
   * septiembre de 2026 con el sitio ya indexado y rastreado a diario —el servicio de
   * favicons de Google devolvía 404 para el dominio—, así que el candidato con tamaño
   * declarado era uno que Google descarta por definición.
   *
   * 96 es múltiplo de 48 y de paso cubre pantallas de alta densidad. Los navegadores no
   * pierden nada: el ICO sigue trayendo 16, 32 y 48 exactos. */
  const png96 = join(ROOT, "public", "favicon-96.png");
  await writeFile(png96, await faviconTile(96));
  console.log(`  isotipo-small.png → favicon-96.png ${kb(await sizeOf(png96))}`);

  // 180px es el que pide iOS para la pantalla de inicio. Va opaco a propósito: iOS no
  // respeta la transparencia y la rellena de negro.
  const touch = join(ROOT, "public", "apple-touch-icon.png");
  await writeFile(touch, await faviconTile(180));
  console.log(`  isotipo-small.png → apple-touch-icon.png ${kb(await sizeOf(touch))}`);
}

if (corre("favicon")) {
  console.log("Favicon:");
  await optimizeFavicon();
}
if (corre("marca")) {
  console.log("Marca:");
  await optimizeBrand();
}
if (corre("logos")) {
  console.log("Logos:");
  await optimizeLogos();
}
if (corre("plano")) {
  console.log("Plano de planta:");
  await optimizePlant();
}

/**
 * Imagen de Open Graph.
 *
 * Es lo que se ve al compartir el sitio por LinkedIn y WhatsApp, que en este rubro es por
 * donde circula, y se ve del tamaño de una tarjeta. Antes era el recorte pelado del
 * render: bonito y mudo, sin una marca que dijera de quién es.
 *
 * Ahora lleva el lockup en blanco sobre una banda de teal profundo al pie. La banda no es
 * decoración: sobre el render claro un lockup blanco no tendría contraste, y el teal es
 * justamente la superficie de marca del sitio.
 *
 * El render es 16:9 y el formato de compartido es más apaisado, así que se recorta desde
 * el centro en lugar de deformarlo.
 */
async function optimizeOgImage() {
  const from = join(RAW, "plant", "fabrica-logistica.png");
  const to = join(OUT, "og", "inspectia-og.jpg");
  await mkdir(join(OUT, "og"), { recursive: true });

  const BAND = 132;
  const fondo = await sharp(from)
    .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
    .toBuffer();

  // El teal profundo del sistema, #084749.
  const banda = await sharp({
    create: { width: 1200, height: BAND, channels: 4, background: "#084749" },
  })
    .png()
    .toBuffer();

  const marca = await sharp(join(OUT, "brand", "lockup-blanco.webp"))
    .resize({ height: 56, fit: "inside" })
    .png()
    .toBuffer();

  // JPEG y no WebP: varias plataformas de mensajería todavía no previsualizan WebP.
  await sharp(fondo)
    .composite([
      { input: banda, top: 630 - BAND, left: 0 },
      { input: marca, top: 630 - BAND + 38, left: 64 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(to);

  console.log(`  fabrica-logistica.png → og/inspectia-og.jpg ${kb(await sizeOf(to))}`);
}

if (corre("og")) {
  console.log("Open Graph:");
  await optimizeOgImage();
}
console.log("Listo.");
