# Tab 4 — App de Control de Stock + rename Tab 3

Implementar el simulador de ROI para la app de picking/control manual en la Tab "Stock y Despachos" (renombrada a **"App de control de Stock"**), y renombrar la Tab 3 de "Recepción y Docks" a **"Software de recepción"**. Se reutiliza el patrón de `RecepcionCalculator.tsx` (glass + bloqueo + LeadForm) y los componentes compartidos de `shared.tsx`.

## 1. Nuevo componente `src/components/roi/StockCalculator.tsx`

Estructura paralela a `RecepcionCalculator.tsx`:
- Grid `lg:grid-cols-[40%_60%]` con tarjetas glass `bg-[#084749]/40`.
- Columna izquierda: header + 7 `SliderRow` (de `shared.tsx`).
- Columna derecha: bloqueo inicial con `calculosHabilitados` + botón "Calcular Impacto de App"; al desbloquear, Bloque A (impacto operativo) y Bloque B (impacto financiero) + insight dinámico.
- `LeadForm` debajo con `title="Descargá el Caso de Uso Logístico"` y `ctaLabel="Descargar Caso de Uso Logístico en PDF"`.

### Sliders (`useState`)
| State | min | max | step | default | suffix |
|---|---|---|---|---|---|
| ftesActuales | 1 | 100 | 1 | 8 | FTEs |
| costoFte | 500 | 5000 | 50 | 1500 | USD/mes |
| ubicacionesTurno | 100 | 10000 | 100 | 1200 | ubic. |
| precisionActual | 50 | 99 | 1 | 85 | % |
| mejoraVelocidad | 10 | 100 | 5 | 40 | % |
| inversionInicial | 500 | 20000 | 100 | 3000 | USD |
| saasMensual | 50 | 2000 | 50 | 400 | USD/mes |

### Cálculos (`useMemo`)
```text
precisionLograda          = 99.9                       // estático
incrementoPrecision       = 99.9 - precisionActual
ubicacionesProyectadas    = Math.round(ubicacionesTurno * (1 + mejoraVelocidad/100))
ftesAhorrados             = ftesActuales * (mejoraVelocidad/100)   // decimal, mostrar 1 decimal
ahorroLaboralAnual        = ftesAhorrados * costoFte * 13
costoSaasAnual            = saasMensual * 12
ahorroNetoAnual           = ahorroLaboralAnual - costoSaasAnual
roiOperativo              = ((ahorroNetoAnual - inversionInicial) / inversionInicial) * 100
paybackMeses              = Math.max(1, Math.ceil(inversionInicial / (ahorroNetoAnual / 12)))
                            // si ahorroNetoAnual <= 0 → mostrar "—"
```

## 2. Panel de resultados (columna derecha)

Cuando `calculosHabilitados === true`:

### Bloque A — Impacto Operativo (2 tarjetas)
Grid `md:grid-cols-2 gap-4`. Cada tarjeta: `bg-[#041A1B] border border-[#17ccd3]/30 rounded-2xl p-5`, ícono Lucide en pill cyan, título blanco, subtexto slate-400.

1. **Tarjeta 1** — ícono `Target`:
   - Título: `Precisión Elevada al 99.9%`
   - Subtexto: `Eliminación del descuadre de inventario. Mejora del {incrementoPrecision.toFixed(1)}%.`
2. **Tarjeta 2** — ícono `Gauge` (o `Zap`):
   - Título: `Velocidad de Auditoría`
   - Subtexto: `De {fmtNum(ubicacionesTurno)} a {fmtNum(ubicacionesProyectadas)} ubicaciones por turno.`

### Bloque B — Impacto Financiero (3 KpiCard)
Grid `md:grid-cols-3 gap-4` usando el `KpiCard` existente:
1. `Ahorro Laboral Neto Anual` → `fmtMoney(ahorroNetoAnual)`
2. `Tiempo de Repago` → `${paybackMeses} meses` (o `—`)
3. `ROI Operativo` → `${Math.round(roiOperativo)}%`

### Insight dinámico
Debajo de las métricas, párrafo pequeño en `bg-[#17ccd3]/5 border border-[#17ccd3]/20 rounded-xl p-4 text-sm text-slate-300`:

> "Al aumentar su velocidad un **{mejoraVelocidad}%**, InspectIA OS le permite reasignar el equivalente a **{ftesAhorrados.toFixed(1)} operarios** hacia tareas de valor agregado, sin incrementar su nómina."

### Bloqueado
Versión blur (`blur-sm opacity-60`) del contenido + botón central "Calcular Impacto de App" (mismo patrón que `RecepcionCalculator`).

## 3. Wiring en `src/components/roi/RoiSimulator.tsx`

- Importar `StockCalculator`.
- Tab `recepcion`: cambiar label de `Recepción y Docks` → **`Software de recepción`**.
- Tab `stock`: cambiar label de `Stock y Despachos` → **`App de control de Stock`**.
- En `TabsContent value="stock"`, reemplazar `<ComingSoonPanel />` por `<StockCalculator />`.

## 4. Reutilización
- `SliderRow`, `KpiCard`, `BreakdownRow`, `fmtMoney`, `fmtNum` → `src/components/roi/shared.tsx` sin cambios.
- `LeadForm` → ya acepta `title` y `ctaLabel`.
- Íconos: `Target`, `Gauge` (o `Zap`) de `lucide-react`.

## Fuera de alcance
- Cambios visuales en Calidad, TYMEO, Recepción, Hero, Navbar o Footer.
- Persistencia, PDF real, gráficos.
- Cambios en metadata SEO de `/roi`.
