# Ajustes a páginas existentes

## 1. Producción (`/plataforma/produccion`) — recuperar la demanda de OEE

Es la heredera de `/oee-control/`. Hoy tiene 93 impresiones en posición 16,9; la vieja tenía 3.206. Las búsquedas de OEE están en primera y segunda página con cero clics.

| Campo | Hoy | Nuevo |
|---|---|---|
| `seoTitle` | Software de OEE y control de producción | **Software de OEE: medí y calculá el OEE de cada línea** |
| `seoDescription` | Medí el OEE de cada línea en tiempo real, con las paradas clasificadas y el plan contra real por turno, línea y operario. Empezá gratis, sin hardware. | **Software para calcular el OEE en tiempo real, con carga manual o conectado al PLC. Paradas por motivo y plan contra real. Plan gratuito y precio publicado.** |

**Bloque nuevo «Funcionalidades»** (después de «does», antes de las preguntas):

- **Monitoreo automático de OEE** — El dato sale del PLC o de un sensor en la línea, sin carga manual. → `/plataforma/produccion/monitoreo-automatico-de-oee`
- **Registro de paradas de máquina** — Cada parada con su motivo, en dos toques desde el puesto. → `/plataforma/produccion/registro-de-paradas-de-maquina`

**Pregunta nueva en `faq`** (va primera; responde «software para cálculo de OEE»):

- **¿Cómo calcula el OEE?** — Multiplica disponibilidad, rendimiento y calidad de cada línea, con los datos del turno: cuánto tiempo estuvo produciendo, a qué velocidad contra la ideal y cuántas unidades salieron buenas. El cálculo se hace solo, por línea, turno, producto y corrida. Si querés ver la fórmula con un ejemplo, está en la guía [cómo calcular el OEE](/guias/como-calcular-el-oee).

## 2. Stock (`/plataforma/stock`) — se publica junto con la funcionalidad WMS

No publicar antes que `13_funcionalidad_wms-para-fabricas.md`: hoy la página dice que el módulo no es un WMS y la funcionalidad dice que sí.

- **Bloque `does`, título «Contra lo que dice tu WMS»** → reemplazar por:
  - **Título:** Funciona solo o contra tu WMS
  - **Cuerpo:** Si no tenés WMS, el módulo es el sistema del depósito de la planta: posiciones, movimientos, recepción y pedidos. Si ya tenés uno, el control se hace contra él y lo que se corrige se corrige donde estaba el error.
- **Pregunta «¿Reemplaza a mi WMS?»** → reemplazar por:
  - **Pregunta:** ¿Es un WMS?
  - **Respuesta:** Sí, uno pensado para el depósito de una fábrica: une la materia prima, el consumo contra la orden y el producto terminado en el mismo registro. Si ya usás un WMS, trabaja contra él y no hay que reemplazarlo. Más detalle en [WMS para fábricas](/plataforma/stock/wms-para-fabricas).
- **Bloque «Funcionalidades»:** WMS para fábricas → `/plataforma/stock/wms-para-fabricas`.

## 3. Trazabilidad (`/plataforma/trazabilidad`) y Tareas (`/plataforma/tareas`)

Sólo el bloque «Funcionalidades»:

- Trazabilidad → **Trazabilidad alimentaria** — Informe de un lote y retiro acotado para plantas de alimentos. → `/plataforma/trazabilidad/trazabilidad-alimentaria`
- Tareas → **Control de asistencia en planta** — La fichada cruzada con el horario y con el puesto. → `/plataforma/tareas/control-de-asistencia`

## 4. Casos de uso → guías

El cuerpo de cada página se mantiene. Cambian la URL (301, ver brief), el título, la descripción y, donde se indica, se suma una sección. Las guías van en español neutro: al mudarlas, pasar a construcciones impersonales los verbos en voseo del cuerpo.

| Hoy | Nueva URL | `seoTitle` | `seoDescription` |
|---|---|---|---|
| casos-de-uso/scrap | `/guias/como-reducir-el-scrap` | Scrap en producción: cómo calcularlo y reducirlo | Qué es el scrap, cómo calcular la tasa de scrap de una línea y qué datos registrar para bajarla, con un ejemplo. |
| casos-de-uso/paradas | `/guias/como-reducir-las-paradas-de-maquina` | Cómo reducir las paradas de máquina en planta | Paradas programadas y no planificadas: cómo registrarlas, ordenarlas por motivo y atacar primero la que más tiempo cuesta. |
| casos-de-uso/inventario-descuadrado | `/guias/inventario-que-no-cuadra` | Inventario que no cuadra: por qué pasa y cómo cuadrarlo | Las causas más comunes de un inventario descuadrado y cómo cuadrarlo con conteo cíclico, sin parar el depósito. |
| casos-de-uso/recepcion | `/guias/como-acelerar-la-recepcion-de-mercaderia` | Cómo acelerar la recepción de mercadería en depósito | Qué frena la recepción en el muelle y cómo controlar lo que baja del camión sin planillas ni doble carga. |
| casos-de-uso/accidentes | `/guias/prevenir-accidentes-en-planta-con-camaras` | Prevenir accidentes en planta con las cámaras que ya hay | Cómo usar las cámaras de seguridad existentes para detectar situaciones de riesgo y avisar en el momento. |

**Sección nueva en la guía de scrap** (las búsquedas «tasa de scrap», «cálculo de scrap» y «qué es scrap en calidad» ya traen impresiones):

> ## ¿Cómo se calcula la tasa de scrap?
>
> La tasa de scrap es la proporción de unidades que se descartan sobre el total producido en un período:
>
> **Tasa de scrap = unidades descartadas ÷ unidades producidas × 100**
>
> Por ejemplo, si una línea produjo 12.000 unidades en el turno y 360 terminaron descartadas, la tasa de scrap es 360 ÷ 12.000 × 100 = 3 %. El retrabajo se cuenta aparte: son unidades que no se tiran, pero vuelven a pasar por la línea y consumen tiempo. Para que el número sirva, cada descarte tiene que quedar registrado con su motivo, el turno y el producto; si no, se sabe cuánto se pierde pero no dónde.

**Sección nueva en la guía de paradas** («paradas programadas de la planta» y «reducción de paradas no planificadas» ya traen impresiones):

> ## ¿Qué diferencia hay entre una parada programada y una no planificada?
>
> Una parada programada estaba prevista antes de que empezara el turno: el almuerzo, una limpieza, un mantenimiento preventivo o un cambio de formato planificado. Una parada no planificada aparece durante el turno sin estar en el plan: una falla, falta de material, un atasco o la espera de un operario. Conviene registrarlas por separado, porque se atacan distinto: las programadas se acortan (por ejemplo, reduciendo el tiempo de cambio de formato) y las no planificadas se eliminan buscando su causa. El indicador de disponibilidad del OEE suele medirse sobre el tiempo planificado de producción, así que las programadas no lo bajan y las no planificadas sí.

## 5. Autopartista (`/soluciones/autopartista`)

«control de calidad en autopartes» tiene 80 impresiones en posición 17,3.

| Campo | Hoy | Nuevo |
|---|---|---|
| `seoTitle` | Software de calidad y OEE para autopartistas | **Control de calidad en autopartes y OEE por línea** |

La descripción se mantiene si ya nombra «control de calidad»; si no, sumar esas palabras al comienzo.
