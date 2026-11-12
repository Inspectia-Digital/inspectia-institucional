# Funcionalidad — Plan de producción desde los pedidos de clientes

**URL:** `/plataforma/produccion/plan-de-produccion` · **Módulo:** Producción · **Voz:** la del sitio (voseo) · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Búsquedas que cubre:** plan de producción · orden de producción · plan maestro de producción · plan de producción de una empresa.
**Validación SEO (Google Trends, 5 años, mundo en español, 12/11/2026):** «plan de producción» 46, «orden de producción» 17, «plan maestro de producción» 8, «planificación de la producción» 6, «programación de la producción» 2. Las relacionadas de «plan de producción» son mayormente informativas (qué es, ejemplo, plan maestro): la página responde eso en las preguntas frecuentes y la guía de planificación (próxima tanda) toma la parte educativa.
**Verificado en el código** (`oee-lite-backend/app/core/planeamientos.py` y `routers/pedidos_cliente.py`, 12/11/2026): los pedidos de cliente se cargan con sus renglones y fecha de entrega; los pedidos abiertos muestran lo que falta entregar; el planeamiento junta pedidos abiertos y renglones a mano, calcula el material y se aprueba; lo aprobado queda pendiente de programar y se programa por partes en una línea y una fecha, que genera el plan con sus órdenes de producción; lo ya programado se descuenta.

## SEO

- **seoTitle:** Plan de producción y órdenes desde los pedidos de clientes
- **seoDescription:** De los pedidos abiertos al plan aprobado y a las órdenes por línea y fecha, con el material calculado. Después, el plan contra lo que se produjo.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Producción · Plan de producción

**h1:** Plan de producción armado desde los pedidos de tus clientes

**lead:** Los pedidos de clientes entran con sus productos y sus fechas de entrega. Armás el plan con lo que falta entregar, ves el material que necesita, lo aprobás y lo programás por línea y fecha. Las órdenes salen del plan, y después lo comparás con lo que realmente se produjo.

**heroPanel — «Pendiente de programar · datos de ejemplo»:**
- Filas: Pedido 3321 · Cliente A · Galletitas 200 g · 4.800 u · entrega 20/11 · pastilla azul «Aprobado» · Pedido 3327 · Cliente B · Galletitas 500 g · 2.400 u · entrega 22/11 · azul «Aprobado» · Pedido 3330 · Cliente C · Budín 300 g · 1.200 u · entrega 25/11 · gris «Borrador»
- Pie: «Programado: 6.000 de 8.400 u»

**problem:**
- Los pedidos están en un mail o en el sistema de ventas, y el plan de producción en una planilla aparte.
- No se sabe qué parte de cada pedido ya se programó y qué falta.
- La orden llega a la línea sin saber si hay material para hacerla.
- Cuando el plan no se cumple, nadie puede decir qué pedido se atrasó.

**does:**
1. **¿Qué falta entregar?** — Los pedidos abiertos muestran, por producto, lo que falta entregar a cada cliente y para cuándo.
2. **Del pedido al plan** — El plan junta lo que elegís de los pedidos abiertos y lo que sumás a mano, y calcula el material que necesita antes de aprobarlo.
3. **Programado por línea y fecha** — Lo aprobado se programa por partes, en la línea y el día que corresponde, y de ahí salen las órdenes de producción. Lo que ya se programó deja de figurar como pendiente.
4. **Plan contra real** — Cada orden se compara con lo que se produjo, y la desviación queda a la vista por línea y por pedido.

**see — «Qué ves en InspectIA»** (sin captura: `ProductPanel` «Programación · semana 47 · datos de ejemplo»):
- Los pedidos abiertos, con lo que falta entregar a cada cliente y para cuándo.
- El plan con su material calculado, antes de aprobarlo.
- De cada renglón, cuánto ya se programó y cuánto queda pendiente.
- Las órdenes por línea y por día, y lo producido contra lo esperado.
- Panel, filas Día · Línea · Producto · Cantidad · Pedido: Lun 17 · Línea 1 · Galletitas 200 g · 2.400 u · 3321 · Mar 18 · Línea 1 · Galletitas 200 g · 1.200 u · 3321 · Mar 18 · Línea 2 · Galletitas 500 g · 2.400 u · 3327 · Jue 20 · Línea 3 · Budín 300 g · 1.200 u · pastilla gris «Pendiente». Pie: «Programado 6.000 de 8.400 u».

**related (banda teal):**
- **MRP y escenarios** — Antes de comprometerte, mirá qué implica: material, máquinas, operarios y costos. → `/plataforma/produccion/mrp-y-escenarios`
- **Monitoreo automático de OEE** — Lo producido de cada orden, con el dato de la máquina. → `/plataforma/produccion/monitoreo-automatico-de-oee`
- **WMS para fábricas** — El material que la orden consume se descuenta del depósito. → `/plataforma/stock/wms-para-fabricas`

**faq:**
- **¿Es un plan maestro de producción?** — Cumple ese papel: dice qué productos, cuánto y para cuándo, a partir de la demanda real de tus clientes. Lo que se programa por línea y día sale de ahí.
- **¿Los pedidos se cargan a mano?** — Sí, con su número, cliente, fecha de entrega y productos. Si están en tu ERP, se pueden traer con una integración.
- **¿El plan se arma solo?** — No: vos elegís qué pedidos entran y lo aprobás. El sistema calcula el material y lleva la cuenta de lo programado y lo pendiente.
- **¿Puedo programar un pedido en partes?** — Sí. Un renglón aprobado se puede repartir en varias líneas o días.
- **¿Qué pasa si no se cumple?** — Cada orden muestra lo producido contra lo esperado, y lo que no se hizo vuelve a figurar como pendiente si se cancela el plan.

**links:** Módulo [Producción](/plataforma/produccion) · MRP y escenarios `/plataforma/produccion/mrp-y-escenarios`
