# Capturas del producto para el sitio (assets-src/app)

3 de noviembre de 2026. Responde a `03_marketing/01-web/2026-11-03-capturas-que-necesita-el-sitio.md`.

**Son bocetos con datos de demostración, no capturas de la app.** La empresa (Panificadora El Trigal), las plantas, las personas y los números son inventados y no salen de ningún tenant. Las pantallas se parecen a la app pero no son copias exactas: están dibujadas para que se lean bien en la web. Usan el design system de InspectIA: teal 800/950, cian de acento, Inter y JetBrains Mono para cifras. No tienen cromo de navegador ni cursor. Los originales son PNG sin comprimir; el WebP y las variantes los genera `npm run images`.

| Archivo | Para | Medida | Qué muestra |
|---|---|---|---|
| `tablero.png` | B1 · `APP_SHOT`, columna derecha de la home | 2400×1600 (3:2) | Inicio: OEE de la planta y sus tres componentes, tendencia de 28 días contra el objetivo y OEE por línea. Letra grande, pensada para verse a ~520 px |
| `produccion.png` | A1 · `/plataforma/produccion` | 1920×1200 (16:10) | Línea en vivo: OEE del turno, disponibilidad, rendimiento y calidad, unidades cada 15 min contra el ritmo ideal (con una parada y un tramo lento), estado de estaciones y lo que pasó en el turno |
| `calidad.png` | A2 · `/plataforma/calidad` | 1920×1200 | Pareto de defectos con rechazo y retrabajo separados y la curva acumulada, por línea, e inspecciones del día |
| `stock.png` | A3 · `/plataforma/stock` | 1920×1200 | Stock por producto con cobertura en días (marca de 7 días), una diferencia de conteo marcada (Manteca −28 kg) y qué pedir hoy |
| `trazabilidad.png` | A4 · `/plataforma/trazabilidad` | 1920×1200 | Lote 2026-1103-N: genealogía (materia prima → intermedio → terminado → despachos), vencimiento, conciliación y controles. Un insumo aparece «sin lote cargado», como pasa en la realidad |
| `tareas.png` | A5 · `/plataforma/tareas` | 1920×1200 | Cobertura del turno de mañana armada el día anterior: puestos por área con quién está asignado, dos sin cubrir, sugerencia de reemplazo y disponibles |

La B1 es el tablero de Inicio, no el de Producción, así que no se repite con A1.

## Alt sugeridos

- `tablero.png`: «Tablero de InspectIA con el OEE de la planta, su evolución en el último mes y el OEE de cada línea»
- `produccion.png`: «Tablero de una línea en vivo: OEE del turno, sus tres componentes y las unidades producidas cada 15 minutos»
- `calidad.png`: «Pareto de defectos con rechazo y retrabajo separados, y calidad por línea»
- `stock.png`: «Stock por producto con días de cobertura y una diferencia de conteo marcada»
- `trazabilidad.png`: «Lote con su genealogía, desde la materia prima hasta los despachos, y su vencimiento»
- `tareas.png`: «Cobertura del turno: quién está asignado a cada puesto y qué puestos faltan cubrir»

## Para publicarlas (lo hace Code)

1. Una entrada por archivo en `scripts/optimize-images.mjs`, `npm run images -- app`.
2. `APP_SHOT` en `src/content/assets.ts` con `tablero` y su alt.
3. Las cinco de módulo según el patrón «una captura por módulo debajo de "Qué hace"» que propone el relevamiento, si dirección lo aprueba (ver la respuesta en el chat de diseño).

Mantenimiento y Energía siguen sin captura, como dice el relevamiento.
