# Tab 3 — Recepción y Docks (Simulador ROI)

Construir el módulo logístico replicando el patrón visual y técnico del módulo de Calidad (sliders + input numérico editable, panel bloqueado, métrica destacada, KPIs, desglose y LeadForm).

## 1. Nuevo componente `src/components/roi/RecepcionCalculator.tsx`

Estructura idéntica a `CalidadCalculator.tsx`:
- Reutiliza el `SliderRow` (input numérico cyan + slider bidireccional + sufijo) — se extrae a `src/components/roi/SliderRow.tsx` para compartirlo entre Calidad y Recepción sin duplicar código.
- Grid `lg:grid-cols-[40%_60%]` con tarjetas glassmorphism `bg-[#084749]/40`.
- Bloqueo inicial (`calculosHabilitados`) con botón "Calcular mi ROI Operativo".
- `LeadForm` debajo con copy "Descargar Reporte Logístico" (se agrega prop `title`/`subtitle` opcional al `LeadForm` para personalizar sin romper Calidad).

### Sliders (estado `useState`)
| State | min | max | step | default | suffix |
|---|---|---|---|---|---|
| volumenDiario | 1000 | 200000 | 1000 | 74000 | u/día |
| valorUnitario | 1 | 1000 | 1 | 50 | USD |
| tasaErrorActual | 0.1 | 15 | 0.1 | 2.5 | % |
| ftesActuales | 1 | 100 | 1 | 24 | FTE |
| costoFte | 500 | 5000 | 1 | 2500 | USD |
| porcentajeConteo | 10 | 100 | 1 | 80 | % |
| leadTimeActual | 1 | 168 | 1 | 48 | h |
| lineasInspectia | 1 | 20 | 1 | 4 | — |
| ftesInspectia | 1 | 50 | 1 | 15 | FTE |
| inversionInicial | 5000 | 250000 | 1000 | 70000 | USD |
| saasMensual | 200 | 10000 | 100 | 800 | USD |

Regla cruzada: `ftesInspectia < ftesActuales`. Handlers análogos a `handleActual/handleEsperado`:
- Si suben `ftesInspectia ≥ ftesActuales`, se eleva `ftesActuales` a `ftesInspectia + 1` (cap 100).
- Si bajan `ftesActuales ≤ ftesInspectia`, se baja `ftesInspectia` a `ftesActuales - 1` (mín 1).

### Cálculos (`useMemo`, 360 días)
```text
volumenAnual          = volumenDiario * 360
ahorroLaboralAnual    = (ftesActuales - ftesInspectia) * costoFte * 13
ahorroErroresAnual    = tasaErrorActual > 1
                        ? volumenAnual * valorUnitario * ((tasaErrorActual - 1) / 100)
                        : 0
ahorroOperativoAnual  = ahorroLaboralAnual + ahorroErroresAnual
costoSaasAnual        = saasMensual * 12
ahorroNetoAnual       = ahorroOperativoAnual - costoSaasAnual
roi                   = ((ahorroNetoAnual - inversionInicial) / inversionInicial) * 100
paybackMeses          = ahorroNetoAnual > 0
                        ? Math.ceil(inversionInicial / (ahorroNetoAnual / 12))
                        : 999
leadTimeEsperado      = leadTimeActual - (leadTimeActual * (porcentajeConteo/100) * 0.4)
wipActual             = volumenDiario * valorUnitario * (leadTimeActual / 24)
wipProyectado         = volumenDiario * valorUnitario * (leadTimeEsperado / 24)
capitalLiberado       = wipActual - wipProyectado
```

## 2. Panel de resultados (columna derecha)

Cuando `calculosHabilitados === true`:

1. **Trofeo superior** — tarjeta destacada (full width del panel):
   - Borde `border-[#17ccd3]` + glow `shadow-[0_0_40px_rgba(23,204,211,0.25)]`, fondo gradient cyan→teal sutil.
   - Título `💰 Capital de Trabajo Liberado (WIP)`.
   - Valor grande mono cyan: `fmtMoney(capitalLiberado)`.
   - Subtítulo: `Capital recuperado por la reducción del Lead Time a {leadTimeEsperado.toFixed(1)} horas.`
2. **Grilla 3 KPIs** (reutiliza `KpiCard` — se extrae a `src/components/roi/KpiCard.tsx`):
   - Ahorro Anual Neto → `fmtMoney(ahorroNetoAnual)`
   - Tiempo de Repago → `${paybackMeses} meses`
   - ROI Operativo → `${roi.toFixed(0)}%`
3. **Desglose** (mismo patrón `BreakdownRow`, también extraído):
   - Volumen anual, Ahorro laboral, Ahorro por errores, Costo SaaS anual, WIP actual, WIP proyectado, Lead Time esperado.

Cuando bloqueado: el trofeo + grilla se muestran con `blur-sm opacity-60` y botón central `Calcular mi ROI Operativo`.

## 3. Refactor de código compartido

Para evitar duplicación:
- Extraer `SliderRow`, `KpiCard`, `BreakdownRow`, `fmtMoney`, `fmtNum` a `src/components/roi/shared.tsx`.
- `CalidadCalculator.tsx` y nuevo `RecepcionCalculator.tsx` los importan.
- Esto es el único cambio en Calidad — sin tocar UI ni fórmulas.

## 4. Wiring en `RoiSimulator.tsx`

Reemplazar el `<ComingSoonPanel>` del `TabsContent value="recepcion"` por `<RecepcionCalculator />`. Las demás tabs (`tymeo`, `stock`) siguen con ComingSoon.

## 5. LeadForm — personalización mínima

Agregar dos props opcionales a `LeadForm`: `title?: string` y `ctaLabel?: string`, con los valores actuales como default. En Recepción pasar:
- `title="Descargá tu Reporte Logístico personalizado"`
- `ctaLabel="Descargar Reporte Logístico en PDF"`

## Fuera de alcance
- Cambios visuales en Calidad, Hero, Navbar o Footer.
- Tabs TYMEO y Stock (siguen "Próximamente").
- Persistencia o envío real del lead.
- Gráficos/visualizaciones adicionales (Lead Time barra comparativa, etc.).
