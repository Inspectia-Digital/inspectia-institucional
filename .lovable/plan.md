# Plan: Trust bar — logos uniformes en gris

## Objetivo
Lograr el mismo efecto que la referencia (Firstbase): todos los logos en un tono gris uniforme, mismo tamaño visual, sin recuadros blancos. Y agrandar el título "Confían en nosotros".

## Cambios en `src/components/site/TrustBar.tsx`

### 1. Quitar la caja blanca
- Eliminar el contenedor `bg-white/95 border shadow rounded-3xl`. Los logos van directamente sobre el fondo oscuro de la sección (como en la referencia). Conservar el `mask-image` para el fade lateral del marquee.

### 2. Uniformar tamaño y color
- Cada `<img>`: misma altura fija (`h-8 md:h-10`), `w-auto`, `object-contain`. Mismo gap entre logos (`gap-12 md:gap-16`).
- Aplicar tratamiento monocromo gris:
  - `filter brightness-0 invert opacity-60` → fuerza todos los píxeles a blanco y los baja a ~gris claro (#9ca3af aprox), igual que la referencia.
  - `hover:opacity-100 transition-opacity` para un sutil realce al pasar el mouse.
- Esto neutraliza el problema de los logos con fondo (Springwall rojo, Quantit negro, Las Marías con marco): todos pasan a ser siluetas grises uniformes.

### 3. Agrandar el título
- Cambiar `text-xs md:text-sm text-slate-500` por `text-sm md:text-base text-muted-foreground` y dejar `mb-10` para separar.
- (Si se prefiere aún más grande, podemos ir a `text-base md:text-lg` — confirmar si querés ese tamaño en lugar del propuesto.)

## Fuera de alcance
- No se cambia la lista de partners ni el orden.
- No se toca la animación marquee ni el mask de fade.

## Nota técnica
El filtro `brightness-0 invert` es la técnica estándar para uniformar logos heterogéneos (PNGs con color, con fondo blanco, con marco) a un color sólido. Algunos logos muy detallados (Las Marías con texto fino, Molens con molino) pueden perder algo de detalle visual, pero ganan coherencia con el resto — exactamente el trade-off que hace la referencia.
