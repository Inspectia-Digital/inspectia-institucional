
# Ajuste de hotspots en el hero

## Cambios

1. **Reubicar los 6 puntos existentes**: desplazar todos ~3% hacia arriba y ~2% hacia la izquierda para corregir el offset reportado.

   | Zona | Antes (left, top) | Después (left, top) |
   |---|---|---|
   | Recepción | 38%, 60% | 36%, 57% |
   | Línea producción A | 47%, 32% | 45%, 29% |
   | Línea producción B | 52%, 52% | 50%, 49% |
   | Estanterías A | 66%, 28% | 64%, 25% |
   | Estanterías B | 76%, 38% | 74%, 35% |
   | Armado y despacho | 82%, 50% | 80%, 47% |

2. **Agregar 7º punto "Cámara general / Visión global"** en la pared inferior interior, al centro, con vista panorámica de la planta → `left: 55%, top: 72%`.

   - Mismo estilo cyan `#17ccd3` con `animate-ping`, glow y tooltip.
   - Label sugerido: **"Visión global de planta"** (ajustable).

## Implementación

Único archivo a tocar: `src/components/site/Hero.tsx`. Solo se modifica el array de objetos `{ left, top, label }`; el JSX del hotspot queda igual.

## Iteración

Después de aplicar, revisamos en preview y volvemos a calibrar si hace falta un nudge fino en alguno.
