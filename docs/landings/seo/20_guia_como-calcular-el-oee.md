# Guía — Cómo calcular el OEE

**URL:** `/guias/como-calcular-el-oee` · **Voz:** español neutro, sin voseo ni tuteo
**Búsquedas que cubre:** cómo calcular el OEE · cálculo de OEE · fórmula del OEE · calculadora OEE · cálculo de OEE en Excel · qué es el OEE en producción. En Search Console: software para cálculo de oee (352 impresiones, posición 3,6), calculadora oee (11), cálculo de oee en excel (5), oee excel (3), qué es oee en producción.
**Enlaza a:** `/plataforma/produccion` · `/plataforma/produccion/monitoreo-automatico-de-oee` · `/simulador`

## SEO

- **seoTitle:** Cómo calcular el OEE: fórmula y ejemplo paso a paso
- **seoDescription:** La fórmula del OEE con un ejemplo resuelto: disponibilidad, rendimiento y calidad de una línea, qué datos hacen falta y los errores más comunes al calcularlo.
- **Schema:** Article + FAQPage + BreadcrumbList (Inicio › Guías › Cómo calcular el OEE)

## Contenido

# Cómo calcular el OEE

El OEE (eficiencia general de los equipos) se calcula multiplicando tres factores de una línea en un período: **disponibilidad × rendimiento × calidad**. El resultado indica qué parte del tiempo planificado se usó para producir unidades buenas a la velocidad ideal. Un OEE de 60 % significa que se perdió el 40 % de la capacidad entre paradas, velocidad baja y unidades malas.

## ¿Qué datos hacen falta?

| Dato | Qué es | Ejemplo |
|---|---|---|
| Tiempo planificado | Lo que debía producir la línea, sin las paradas programadas | Turno de 8 h menos 30 min de almuerzo = 450 min |
| Tiempo de paradas no planificadas | Fallas, falta de material, atascos, esperas | 60 min |
| Ciclo ideal | El tiempo que la máquina tarda en hacer una unidad a su velocidad nominal | 1 unidad cada 1,5 s (40 por minuto) |
| Unidades producidas | Todo lo que salió de la línea | 14.000 |
| Unidades buenas | Lo que salió sin defecto y sin retrabajo | 13.300 |

## ¿Cómo se calcula cada factor?

**Disponibilidad** = tiempo de producción ÷ tiempo planificado
Tiempo de producción = 450 − 60 = 390 min. Disponibilidad = 390 ÷ 450 = **86,7 %**.

**Rendimiento** = (ciclo ideal × unidades producidas) ÷ tiempo de producción
A 40 unidades por minuto, en 390 minutos la línea podía hacer 15.600. Hizo 14.000. Rendimiento = 14.000 ÷ 15.600 = **89,7 %**.

**Calidad** = unidades buenas ÷ unidades producidas
Calidad = 13.300 ÷ 14.000 = **95 %**.

**OEE** = 86,7 % × 89,7 % × 95 % = **73,9 %**.

Comprobación por otro camino: a velocidad ideal, en 450 minutos se podían hacer 18.000 unidades buenas. Salieron 13.300. 13.300 ÷ 18.000 = 73,9 %. Los dos cálculos tienen que dar lo mismo.

## ¿Qué valor de OEE es bueno?

No hay un número que sirva para todas las plantas: depende del proceso, de la cantidad de cambios de formato y de cómo se define el tiempo planificado. Se suele citar el 85 % como referencia de clase mundial, pero lo útil es comparar la misma línea contra sí misma, turno a turno y mes a mes, y ver qué factor tira el número para abajo.

## ¿Cómo se calcula el OEE en Excel?

Con una fila por turno y una columna por dato de la tabla anterior, alcanza con cuatro fórmulas: disponibilidad, rendimiento, calidad y su producto. El problema no es la fórmula sino el dato: si los tiempos de parada y las unidades se cargan al final del turno, de memoria, el OEE sale mejor de lo que es. Las paradas cortas, de uno o dos minutos, casi nunca quedan anotadas y en un mes suman horas.

## Errores comunes al calcular el OEE

- **Contar las paradas programadas como pérdida de disponibilidad.** El almuerzo o el mantenimiento preventivo se restan del tiempo planificado, no de la disponibilidad.
- **Usar como ciclo ideal el promedio histórico.** El ciclo ideal es la velocidad nominal de la máquina; con el promedio, las pérdidas de velocidad desaparecen.
- **Contar el retrabajo como unidad buena.** Una unidad que vuelve a pasar por la línea no salió bien a la primera.
- **Calcular un OEE de planta promediando líneas distintas.** Conviene calcularlo por línea y mirar dónde está la pérdida.

## Preguntas frecuentes

- **¿Qué significa OEE?** — Overall Equipment Effectiveness, eficiencia general de los equipos. Mide qué parte de la capacidad de una línea se convirtió en producción buena.
- **¿Cada cuánto conviene calcularlo?** — Por turno como mínimo. Calculado una vez al mes, sirve para un informe pero no para corregir nada mientras pasa.
- **¿Se puede calcular sin sensores?** — Sí, con carga manual de paradas y unidades. Es exacto en la medida en que se cargue bien; con la señal de la máquina se suman las paradas cortas que nadie anota.

## Cómo lo resuelve InspectIA

InspectIA calcula el OEE de cada línea durante el turno, con carga manual desde el puesto o con el dato del PLC o de un sensor. Para probar el cálculo con números propios está el [simulador](/simulador); para tenerlo andando en la línea, [Producción](/plataforma/produccion) y el [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee).
