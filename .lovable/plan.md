# Plan: Carrusel marquee de logos en TrustBar

Reemplazar la fila de wordmarks de texto por un **marquee infinito** (auto-scroll horizontal en loop) con los 16 logotipos reales subidos. UBA y CONICET quedan fuera (no incluidos en el .rar).

## 1. Subir logos al CDN (Lovable Assets)

Subir los 16 archivos desde `/tmp/logos/` con `lovable-assets create --file ...` y guardar cada pointer en `src/assets/partners/<nombre>.asset.json`. Sin copiar los binarios al repo.

Archivos: `Antea_Group.png`, `auren.png`, `balluff_png.png`, `bps.jpg.jpeg`, `cygnus.jpg`, `emprelatam.png`, `establecimiento-las-marias.jpg`, `google-for-startups.jpg`, `logo-arnx.png`, `miebach_logo.jpeg`, `molens-greenmills.png` (combinado Molens + Green Mills), `motorola.jpg`, `quantitdata_logo.jpg`, `sitecno_sa_logo.jpeg`, `springwall.png`, `tecnologia-bi.png`.

## 2. Reescribir `src/components/site/TrustBar.tsx`

- Importar los 16 `.asset.json` y armar un array `{ name, url }`.
- Mantener el título "Confían en nosotros" (`text-slate-500`, centrado).
- **Marquee**: contenedor `overflow-hidden` + máscara lateral (CSS `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`) para fade en bordes.
- Track interno `flex w-max gap-16` que renderiza la lista **duplicada** (x2) para loop sin saltos.
- Animación `animate-marquee` con `transform: translateX(0 → -50%)`, duración ~40s, `linear infinite`. Pausa en `hover` (`hover:[animation-play-state:paused]`).
- Cada logo: `<img>` altura fija `h-10 md:h-12`, `w-auto object-contain`, `opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition`, con `alt={name}` y `loading="lazy"`.

## 3. Keyframes en `src/styles.css`

Agregar (Tailwind v4):

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@theme inline {
  --animate-marquee: marquee 40s linear infinite;
}
```

Esto habilita `className="animate-marquee"`. La pausa en hover usa el utility arbitrario `[animation-play-state:paused]`.

## 4. Accesibilidad / detalles

- Respetar `prefers-reduced-motion`: en ese caso, `animation: none` y permitir scroll horizontal manual (`overflow-x-auto`).
- `aria-label="Empresas y organizaciones que confían en InspectIA"` en la sección.
- Sin cambios en Hero, Navbar, ni rutas.

## Fuera de alcance

- UBA y CONICET (se incorporarán cuando lleguen los archivos).
- Click-through a sitios de partners.
