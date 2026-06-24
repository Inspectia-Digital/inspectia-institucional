# Reubicación de los 7 puntos según la imagen

Detecté las 7 marcas negras en la imagen adjunta y las mapeo a los labels existentes según la zona de la planta.

## Nuevas coordenadas

| # | Label | left | top |
|---|---|---|---|
| 1 | Recepción de mercadería | 15.4% | 70.8% |
| 2 | Línea de producción (A, robot) | 27.6% | 37.0% |
| 3 | Línea de producción (B, cinta) | 36.8% | 57.7% |
| 4 | Almacenamiento (A, fondo) | 50.2% | 20.6% |
| 5 | Almacenamiento (B, derecha) | 69.8% | 51.0% |
| 6 | Armado y despacho | 78.3% | 68.8% |
| 7 | Visión global de planta | 61.7% | 71.9% |

## Implementación

Único cambio: actualizar el array `{ left, top, label }` en `src/components/site/Hero.tsx`. El JSX del hotspot (pulse cyan + tooltip) queda intacto.
