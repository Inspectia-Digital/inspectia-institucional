# Tab 2 — TYMEO OEE (Matriz de Sensibilidad de ROI por Línea)

Matriz de sensibilidad 5×5 que demuestra cómo pequeñas mejoras de OEE generan retornos exponenciales. **Todos los cálculos son por 1 línea de producción** (se aclara en UI). Sin inversión inicial: el único costo es el SaaS mensual de la herramienta por línea.

## 1. Nuevo componente `src/components/roi/TymeoCalculator.tsx`

Estructura paralela a `RecepcionCalculator.tsx`:
- Grid `lg:grid-cols-[40%_60%]` con tarjetas glass `bg-[#084749]/40`.
- Aviso en el header de la columna izquierda: *"Cálculo unitario por 1 línea de producción."*
- Columna derecha con bloqueo inicial + botón `Calcular Matriz de ROI`.
- `LeadForm` debajo con `title="Descargá tu Matriz de Sensibilidad OEE"` y `ctaLabel="Descargar Matriz y Reporte de OEE en PDF"`.

### Sliders (estado `useState`)
| State | min | max | step | default | suffix |
|---|---|---|---|---|---|
| volumenMensual | 1000 | 200000 | 1000 | 9000 | u/mes |
| costoUnitario | 1 | 1000 | 1 | 50 | USD |
| mejoraEsperada | 0.05 | 5 | 0.05 | 0.20 | % |
| saasMensual | 50 | 2000 | 50 | 250 | USD/mes |

Sin slider de inversión inicial.

### Cálculos (`useMemo`)
```text
costoAnualInspectIA  = saasMensual * 12          // único costo (por línea)

// Eje X — mejora: el valor del usuario al centro, 2 abajo y 2 arriba
porcentajesMejora    = [
  mejoraEsperada * 0.25,
  mejoraEsperada * 0.5,
  mejoraEsperada,
  mejoraEsperada * 2,
  mejoraEsperada * 4,
]

// Eje Y — volumen: el valor del usuario al centro, ±10% y ±20%
escenariosVolumen    = [0.8, 0.9, 1.0, 1.1, 1.2]
                       .map(f => Math.round(volumenMensual * f))

calcularROI(volumen, mejora):
  ahorroAnual = (volumen * 12) * costoUnitario * (mejora / 100)
  return ((ahorroAnual - costoAnualInspectIA) / costoAnualInspectIA) * 100
```

La matriz se memoiza como `number[][]` (5 filas × 5 columnas) dependiendo de los 4 sliders. La fila central (índice 2) y la columna central (índice 2) corresponden a los valores ingresados por el usuario.

## 2. Panel de resultados (columna derecha)

Cuando `calculosHabilitados === true`:

1. **Encabezado**:
   - Título: `Matriz de Retorno de Inversión (1er Año, por línea)`.
   - Subtítulo: `Proyección del % de ROI según la mejora de OEE y el volumen mensual de la línea.`
2. **Tabla HTML** (scroll horizontal en mobile):
   - **Header**: primera celda `Volumen / Mejora`, luego 5 columnas con los `porcentajesMejora` formateados (`0.05%`, `0.10%`, `0.20%`, `0.40%`, `0.80%` por ejemplo, según el slider). La columna central recibe `bg-white/5 border-b-2 border-[#17ccd3]` para resaltar la mejora ingresada.
   - **Body**: map sobre `escenariosVolumen`. Cada fila empieza con `fmtNum(vol) + " u/mes"`.
     - La fila central (`vol === volumenMensual`, índice 2): `bg-white/5 border-l-2 border-[#17ccd3]`.
     - La **celda intersección** (fila central × columna central) recibe énfasis adicional: `ring-1 ring-[#17ccd3]/40`.
     - Celdas ROI: `${Math.round(roi)}%` con color condicional:
       - `roi < 0` → `text-red-400`
       - `0 ≤ roi < 100` → `text-yellow-400`
       - `roi ≥ 100` → `text-[#17ccd3] font-bold`
     - Mono font, alineación derecha.
3. **Pie** (`BreakdownRow`):
   - Costo anual InspectIA por línea → `fmtMoney(costoAnualInspectIA)`.
   - Volumen anual base por línea → `fmtNum(volumenMensual * 12)` u/año.

Cuando bloqueado: la tabla se muestra con `blur-sm opacity-60` y botón central `Calcular Matriz de ROI`.

## 3. Wiring en `RoiSimulator.tsx`

Reemplazar el `<ComingSoonPanel>` del `TabsContent value="tymeo"` por `<TymeoCalculator />`. La tab `stock` sigue con ComingSoon.

## 4. Reutilización
- `SliderRow`, `BreakdownRow`, `fmtMoney`, `fmtNum` → importados de `src/components/roi/shared.tsx` sin cambios.
- `LeadForm` → ya acepta `title` y `ctaLabel`.

## Fuera de alcance
- Cambios visuales en Calidad, Recepción, Hero, Navbar o Footer.
- Tab Stock (sigue "Próximamente").
- Persistencia, PDF real, gráficos adicionales.
