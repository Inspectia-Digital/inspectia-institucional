/**
 * Rutas de imagen del sitio.
 *
 * Los archivos viven en `public/img` y se generan con `npm run images` a partir de los
 * originales de `assets-src/`. Antes esto eran punteros `.asset.json` al storage de
 * Lovable, que sólo resolvían con `LOVABLE_PREVIEW_HOST` seteado y dejaban el dev local
 * sin imágenes.
 *
 * Al agregar una imagen: original a `assets-src/`, entrada en `scripts/optimize-images.mjs`,
 * `npm run images`, y la ruta acá. Nada consume `public/img` con un string suelto.
 */

/** Vista isométrica de planta y depósito — fondo del plano interactivo de la home. */
export const PLANT_PLAN = {
  /** 1920px de ancho. La relación es 16:9, la del render original. */
  src: "/img/plant/fabrica-logistica.webp",
  /** Variante para pantallas chicas, servida por srcset. */
  src960: "/img/plant/fabrica-logistica-960.webp",
  width: 1920,
  height: 1079,
  alt: "Vista isométrica de una planta y un centro de distribución, con los ocho módulos de InspectIA ubicados en su punto de la operación",
} as const;

export type PartnerSlug =
  | "antea-group"
  | "arnx"
  | "auren"
  | "balluff"
  | "bps"
  | "cygnus"
  | "emprelatam"
  | "google-for-startups"
  | "las-marias"
  | "miebach"
  | "molens-greenmills"
  | "motorola"
  | "quantit"
  | "sitecno"
  | "springwall"
  | "tecnologia-bi";

/** Logo de cada organización. El nombre visible y a qué familia pertenece viven en
 *  `partners.ts`: §11.10 pide que clientes, proveedores, integraciones y respaldos
 *  nunca compartan fila, así que la clasificación no puede ser sólo una lista de rutas. */
export const PARTNER_LOGO: Record<PartnerSlug, string> = {
  "antea-group": "/img/partners/antea-group.webp",
  arnx: "/img/partners/arnx.webp",
  auren: "/img/partners/auren.webp",
  balluff: "/img/partners/balluff.webp",
  bps: "/img/partners/bps.webp",
  cygnus: "/img/partners/cygnus.webp",
  emprelatam: "/img/partners/emprelatam.webp",
  "google-for-startups": "/img/partners/google-for-startups.webp",
  "las-marias": "/img/partners/las-marias.webp",
  miebach: "/img/partners/miebach.webp",
  "molens-greenmills": "/img/partners/molens-greenmills.webp",
  motorola: "/img/partners/motorola.webp",
  quantit: "/img/partners/quantit.webp",
  sitecno: "/img/partners/sitecno.webp",
  springwall: "/img/partners/springwall.webp",
  "tecnologia-bi": "/img/partners/tecnologia-bi.webp",
};
