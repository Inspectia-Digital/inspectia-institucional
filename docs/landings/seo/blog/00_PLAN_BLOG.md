# Plan del blog SEO — qué va al blog, qué va a guía y qué va a landing

**Fecha:** 20/11/2026 · **Copia del Project:** `claude/2026-11-20_PLAN_BLOG_SEO.md`
**Decisión previa:** el blog es contenido SEO puro, de artículos que posicionen. Va en `/blog/<slug>`.
**Fuentes:** Google Trends (corridas del 12 y el 19/11/2026: cinco años, mundo en español y por país), brief SEO de integraciones y cumplimiento (19/11/2026, secciones C y F), páginas de funcionalidades 16 a 1B, integraciones y fasón.

## 1. Criterio: la intención decide el formato

| Si la búsqueda es… | Formato | Ejemplo |
|---|---|---|
| Comercial: «software de…», «… + OEE», «integración con…» | **Landing** (funcionalidad, integración, fasón, producto) | `/plataforma/produccion/mrp-y-escenarios` |
| Procedimiento permanente, con plantilla o descarga | **Guía** (`/guias/`), español neutro | Cómo calcular el OEE |
| Definición («qué es…»), cálculo, normativa con fecha, explicación técnica o de rubro | **Blog** (`/blog/`) | Qué es un plan maestro de producción |

**Reglas:**
- **Una búsqueda, una página.** El artículo no compite con la landing por el mismo término; la enlaza.
- **Cada artículo enlaza a una landing**, con el texto del término comercial.
- **Nada se publica sin su línea de validación SEO** (regla del 12/11).

## 2. Artículos con señal medida

Índices relativos de Trends dentro de cada comparación: ordenan, no miden volumen absoluto.

| # | Artículo | Señal | Enlaza a |
|---|---|---|---|
| 1 | Plan maestro de producción: qué es y cómo armarlo | Relacionadas de «plan de producción»: «plan maestro» 100, «plan maestro de producción» 93. Comparado con «plan de producción» (46), marca 8 | Plan de producción |
| 2 | Qué es un plan de producción, con ejemplo | Relacionadas: «qué es plan de producción» 73, «qué es un plan de producción» 36, «plan de producción ejemplo» 26 | Plan de producción |
| 3 | Qué es un MRP y cuándo lo necesita una pyme | «que es mrp» es la primera relacionada en México; «mrp» tiene volumen en México, España y Argentina | MRP y escenarios |
| 4 | Capacidad de producción: cómo calcularla | 29, contra 46 de «plan de producción» | MRP y escenarios |
| 5 | Mantenimiento preventivo: tipos, plan y ejemplo | 61, búsqueda informativa | Mantenimiento por horas de uso |
| 6 | Cómo calcular el costo unitario de producción | 29; los resultados de Google son definiciones y fórmulas | Costo por unidad |
| 7 | Costo de mano de obra: cómo calcularlo por producto | 37, el más alto del grupo de costos | Costo por unidad |
| 8 | Qué es un andon y cómo se usa en una planta | «que es andon» es la primera relacionada en México | Andon digital |
| 9 | Qué es un SCADA y cómo sacar sus datos para medir el OEE | Relacionadas informativas: «what is scada», «scada plc», «scada software» | Categoría SCADA y PLC |

## 3. Artículos a medir antes de escribir

| # | Artículo | Por qué | Enlaza a |
|---|---|---|---|
| 10 | Qué es el fasón (y la maquila): cómo funciona y qué controlar | Los resultados para «fasón» son académicos e informativos, sin productos | Producción a fasón · Control de fasoneros |
| 11 | Cómo sacar datos de iFIX, WinCC o InTouch sin tocar el PLC | Guía 8 del brief SEO; cola larga técnica | Páginas de iFIX y SCADA |
| 12 | Odoo y la planta: qué resuelve Odoo y qué falta para medir la línea | Guía 9 del brief; Teeptrak trabaja OEE con Odoo | Página de Odoo |
| 13 | OPC UA, Modbus TCP y MQTT: cuál usar para leer una máquina | Bajo volumen en español («opc ua» 1, «mqtt» 7) | Categoría SCADA y PLC |

## 4. Normativa con fecha (se actualizan cuando cambia la norma)

| # | Artículo | Enlaza a |
|---|---|---|
| 14 | Decreto 697/2026: qué cambia para la pyme alimenticia | Hub de cumplimiento |
| 15 | Carnet de manipulador: ya no vence, ¿qué tiene que controlar la empresa? | Personal y cumplimiento |
| 16 | Octógonos: en qué está la derogación y qué no cambia | Tabla nutricional |

## 5. Por producto (sale de la medición por producto)

- **Búsqueda comercial con volumen** («software para fábrica de {producto}», «control de producción {producto}»): **landing** `/soluciones/{producto}`.
- **Búsqueda informativa** («proceso de producción de {producto}»): **blog**, «Proceso de producción de {producto}: dónde se pierde tiempo», con enlace a la landing del rubro.
- **Causas de parada por rubro** (envasado, panificación, cerámica, inyección de plásticos): blog, una por rubro, con enlace a «registro de paradas».

## 6. Lo que NO va al blog: va a guía (`/guias/`)

Existen: cómo calcular el OEE, motivos de parada, retiro de lotes. Pendientes: simulacro de retiro (con plantilla), registros BPM (checklist descargable), trazabilidad por lote para pymes, plantilla de OEE en Excel (lead magnet, con registro).

## 7. Plantilla de artículo

- **H1:** la búsqueda, tal cual.
- **Primer párrafo:** responde en dos o tres oraciones (fragmento destacado y asistentes de IA).
- **Cuerpo:** un ejemplo con números de planta. Sin cifras de clientes salvo un caso aprobado.
- **Bloque «Cómo lo resuelve InspectIA»:** dos o tres líneas con el enlace a la landing.
- **Preguntas frecuentes** con schema FAQPage.
- **Schema:** BlogPosting + FAQPage + BreadcrumbList; HowTo si es paso a paso.
- **Autor y fecha visibles.** Los de normativa llevan «actualizado el…».

## 8. Orden sugerido

1. Artículos 1, 2 y 3 (sostienen plan de producción y MRP).
2. Artículos 5, 6 y 7 (mantenimiento y costo por unidad).
3. Artículo 14 (Decreto 697).
4. Artículos 8 y 9.
5. El resto, después de medir.
