## Cambio
En `src/components/site/Hero.tsx`, reemplazar el color cyan `#17ccd3` por `#084749` únicamente en los puntos parpadeantes superpuestos sobre la imagen de la fábrica (líneas 189-190):

- El halo `animate-ping` pasa a `bg-[#084749]`.
- El punto central pasa a `bg-[#084749]` con shadow/glow recalculado en el mismo tono.

## Consideración
`#084749` es un verde-petróleo oscuro muy cercano al fondo Bento, por lo que el contraste sobre la imagen será notablemente menor que con el cyan neón actual. Para mantener visibilidad, ajustaré el `ring` exterior a `ring-white/70` y el glow a una sombra más amplia.

## Fuera de alcance
No se tocan los acentos cyan del resto de la sección (título gradiente, badges de las tarjetas, etc.), solo los 7 puntos sobre la imagen.