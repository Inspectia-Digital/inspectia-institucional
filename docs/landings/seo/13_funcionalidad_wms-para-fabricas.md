# Funcionalidad — WMS para fábricas

**URL:** `/plataforma/stock/wms-para-fabricas` · **Módulo:** Stock · **Voz:** la del sitio (voseo)
**Búsquedas que cubre:** WMS para fábricas · WMS de producción · sistema de gestión de depósitos · gestión de depósito de planta. Sin datos en Search Console: hay que validar en Keyword Planner. En Google rankean WMS enterprise (Mecalux, Infor) y artículos.
**Se publica junto con** los cambios a Stock del archivo `01`. Antes no, porque la página de Stock hoy dice que el módulo no es un WMS.

## SEO

- **seoTitle:** WMS para fábricas: el depósito unido a la producción
- **seoDescription:** Un WMS pensado para planta: materia prima, consumo contra la orden y producto terminado en el mismo registro. Con un celular Android, sin parar el depósito.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Stock · WMS de planta

**h1:** WMS para fábricas: el depósito y la producción en el mismo registro

**lead:** Los WMS de mercado nacen para centros de distribución. En una fábrica el depósito alimenta la línea y la línea vuelve a llenar el depósito. Acá la materia prima que entra, lo que se consume contra cada orden, el producto terminado y el pedido que sale son el mismo registro, posición por posición.

**problem:**
- El depósito de materia prima y el de producto terminado viven en planillas distintas.
- Lo que se consume en la línea se descuenta a mano, al final del día o de la semana.
- El sistema dice que hay y en la posición no está.
- Un WMS de distribución resuelve el picking pero no sabe nada de la orden de producción.

**does:**
1. **¿Qué tiene que tener un WMS de planta?** — Posiciones, recepción, movimientos y pedidos, como cualquier WMS, y además el consumo contra la orden de producción y el ingreso del terminado. Es lo que no tiene uno de distribución.
2. **Del camión a la línea y de la línea al pedido** — Lo que baja del camión se recibe contra el remito y se guarda en su posición. Lo que se consume se descuenta contra la orden. El terminado ingresa sin doble carga y sale contra el pedido.
3. **El conteo, contra el sistema** — Lo contado se compara con lo que dice el sistema y la diferencia aparece en el momento. El ajuste queda con su motivo y con quién lo hizo.
4. **Con un celular** — El operario trabaja con un Android común. No hay terminales que comprar para empezar.

**capture:** Manual con el celular (plan gratuito, cinco posiciones) → Automático con lectoras y etiquetas → IA: recepción con cámara en el muelle e inventario con drones en las posiciones altas.

**see — «Qué ves en InspectIA»** (captura `inspectia-control-de-stock-inventario`):
- El stock de cada producto, lo que sale por día y cuántos días cubre.
- Los productos que no llegan al límite de cobertura, marcados.
- Las diferencias de conteo contra el sistema, con quién contó y cuándo, y el ajuste.
- Qué pedir hoy, según la demora de cada proveedor.

**related:**
- Producción: el consumo se descuenta solo contra la orden → `/plataforma/produccion`
- Trazabilidad: el lote seguido de la recepción al pedido → `/plataforma/trazabilidad`
- Recepción con cámara → `/ia/recepcion`
- Inventario con drones → `/ia/inventario-con-drones`

**faq:**
- **¿Reemplaza a mi WMS?** — No hace falta. Si ya tenés uno, trabaja contra él; si no, es el sistema del depósito de la planta.
- **¿Necesito lectoras o terminales?** — No para empezar: alcanza con un celular Android por operario.
- **¿Hay que etiquetar las posiciones?** — Tienen que poder identificarse. Si el depósito ya está etiquetado, se usa lo que hay; si no, el etiquetado es parte de la puesta en marcha.
- **¿Sirve para un depósito chico?** — Sí, y arranca bien ahí. El plan gratuito incluye cinco posiciones.

**links:** Guía [inventario que no cuadra](/guias/inventario-que-no-cuadra) · Módulo [Stock](/plataforma/stock)
