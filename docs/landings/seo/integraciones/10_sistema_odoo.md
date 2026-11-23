# Sistema — Odoo

**URL:** `/integraciones/odoo` · **Categoría:** ERP · **Voz:** la del sitio · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Fuente técnica:** PRD de integraciones (19/11/2026): DEC-B (Odoo es el primer conector), DEC-E (versiones 19+ y 16–18), DEC-F (paradas a Odoo), §7.4 (mapeo de modelos) y H4 a H11. Relevamiento detallado §1 «Odoo». Estado en el código: el conector todavía no existe (INT-4 e INT-5). Hoy, plan y productos entran por planilla (`app/routers/importaciones.py`).
**Búsquedas que cubre:** odoo OEE · odoo control de producción · odoo manufactura planta · integrar odoo con producción · odoo paradas de máquina · odoo api.
**Validación SEO (Trends, 5 años, 19/11/2026):**
- «odoo» 53 en Argentina y 39 en México. Las relacionadas son de marca y de producto (odoo argentina, odoo erp, odoo 17, odoo 18). «odoo api» aparece en Argentina (23) y en España (40).
- «odoo mrp» 1, «odoo producción» 0, «odoo manufactura» 0.
- En la SERP de «integración Odoo OEE producción» compite Teeptrak con artículos sobre cómo calcular el OEE con Odoo, en español y en otros idiomas.
- El título combina Odoo con OEE y producción, que es lo que trabaja la competencia; la API va en las preguntas frecuentes.

## SEO
- **seoTitle:** Odoo y OEE: la producción real de tu planta vuelve a Odoo
- **seoDescription:** Las órdenes de fabricación de Odoo entran a InspectIA y vuelven con lo producido, el scrap, el lote, los consumos por lote y las paradas. Odoo 16 a 19.
- **Schema:** Service + FAQPage + BreadcrumbList (Integraciones › ERP › Odoo)

## Contenido

**eyebrow:** Integraciones · ERP · Odoo

**h1:** InspectIA y Odoo: la producción real vuelve sola a tu Odoo

**lead:** Odoo planifica: tiene los productos, las listas de materiales y las órdenes de fabricación. InspectIA mide lo que pasa en la línea: cuánto se produjo, cuánto se descartó, qué lote salió, qué lote de materia prima se consumió y cuánto tiempo estuvo parada cada máquina. Conectados, la orden nace en Odoo y vuelve cerrada con lo que pasó de verdad.

**heroPanel — «Orden WH/MO/00012 · datos de ejemplo»:**
- Filas: Origen Odoo · Producto Galletitas 200 g · Plan 4.800 u · Producido 4.620 u · Scrap 85 u · Lote PT-2611-014 · pastilla verde «Enviado a Odoo»
- Pie: «Consumos por lote enviados: Harina 000 · lote H-1029 · 1.150 kg»

**Quién es dueño de qué (dos columnas):**
- **Odoo:** productos, listas de materiales, centros de trabajo, órdenes de fabricación, stock, pedidos de venta y compras.
- **InspectIA:** lo producido por orden, el scrap, el lote del terminado, el consumo por lote y las paradas con su causa.
- Lo que viene de Odoo se ve en InspectIA con la etiqueta «Odoo» y se corrige en Odoo.

**Qué toma InspectIA de Odoo (tabla, dato → modelo de Odoo):**
| Dato | Modelo de Odoo |
|---|---|
| Productos: materia prima, intermedio, terminado, con unidad y control de lote | `product.product` |
| Listas de materiales | `mrp.bom`, `mrp.bom.line` |
| Centros de trabajo, asociados a líneas o máquinas | `mrp.workcenter` |
| Órdenes de fabricación confirmadas, con cantidad, fechas y receta | `mrp.production` |
| Stock por ubicación y lote | `stock.quant`, `stock.location`, `stock.lot` |
| Pedidos de venta | `sale.order` |
| Pedidos de compra | `purchase.order` |

**Qué le devuelve InspectIA a Odoo:**
| Dato | Dónde queda en Odoo |
|---|---|
| Producción por orden, parcial o total, buena y scrap | En la orden de fabricación (`mrp.production`) y sus movimientos de stock |
| Lote del producto terminado | En la orden, como lote producido |
| Consumo de materia prima por lote | En los movimientos de consumo de la orden |
| Paradas con causa | En la productividad del centro de trabajo, con su tipo de pérdida (`mrp.workcenter.productivity`, `mrp.workcenter.productivity.loss`) |

**Cómo se conecta (pasos de 2 px):**
1. **Cargar la conexión** — URL de Odoo, base, usuario de integración y clave de API. InspectIA prueba la conexión, detecta la versión y muestra qué módulos tiene: Manufactura, Inventario, Ventas, Compras.
2. **Asociar** — Cada centro de trabajo con una línea, cada ubicación con un depósito o posición, y cada categoría de parada de InspectIA con un tipo de pérdida de Odoo.
3. **Elegir qué viaja** — Cada dato se activa por separado y en cada sentido. Los productos que ya estaban en InspectIA se vinculan por código; los que tienen el mismo código y distinta unidad quedan listados y no se pisan.
4. **Primera sincronización** — Desde ahí, InspectIA consulta los cambios de Odoo cada cierto tiempo y envía lo producido al cerrar cada producción.

**Un día con los dos conectados (pasos numerados, recorrido de un dato):**
1. **06:00** — En Odoo se confirma la orden WH/MO/00012: 4.800 paquetes de Galletitas 200 g en el centro de trabajo «Línea 1». En la siguiente sincronización aparece en InspectIA como plan de la Línea 1, con su receta.
2. **06:10 a 13:40** — La línea produce. El dato sale del sensor o de la carga del supervisor. Hay una parada de 18 minutos por cambio de formato, que el supervisor clasifica con su motivo.
3. **13:45** — El supervisor cierra la producción: 4.620 buenos, 85 de scrap, lote PT-2611-014, y se consumió harina del lote H-1029.
4. **13:46** — InspectIA envía el cierre a Odoo. La orden queda con lo producido, el lote y los consumos por lote. La parada queda registrada en el centro de trabajo con su tipo de pérdida. Si el envío se repite por un reintento, Odoo no lo cuenta dos veces.
5. **Si Odoo rechaza el envío** (por ejemplo, porque falta stock del lote declarado), el cierre en InspectIA queda hecho y la bitácora muestra el mensaje de Odoo en castellano, con la opción de reintentar.

**Qué tiene que tener la empresa (bloques con línea superior):**
- **Versión:** Odoo 16, 17, 18 o 19. Desde la 19 se usa la API JSON-2; de la 16 a la 18, JSON-RPC. InspectIA elige sola según la versión.
- **Plan:** en Odoo Online, el plan Custom, porque la API externa no está en los planes One App Free ni Standard. En Odoo.sh o en una instalación propia, acceso a la API.
- **Usuario de integración** con su clave de API. Las claves de Odoo duran como máximo 3 meses: InspectIA avisa antes de que venzan.
- **Módulos:** Manufactura e Inventario para órdenes y lotes; Ventas y Compras si se quieren traer pedidos.

**Odoo ya calcula OEE: ¿qué suma InspectIA? (bloque con línea superior):** Odoo calcula un OEE con los tiempos que se cargan a mano en sus órdenes de trabajo. InspectIA mide en la planta: con el operario en una tablet, con un sensor, desde el PLC o desde el SCADA. Detecta las paradas solas, separa lo planificado de lo que no y devuelve el resultado a Odoo. Odoo sigue siendo el sistema de gestión y recibe el dato real.

**faq:**
- **¿Funciona con Odoo Community?** — Sí, en instalación propia u Odoo.sh, con acceso a la API.
- **¿Qué API de Odoo usa?** — JSON-2 desde la versión 19 y JSON-RPC de la 16 a la 18. JSON-RPC está deprecada y Odoo la retira en la 22; InspectIA la tiene aislada para pasar a JSON-2 cuando el cliente actualice.
- **¿Puedo cerrar una orden en partes?** — Sí. Un cierre parcial se registra en Odoo y la orden sigue abierta.
- **¿Qué pasa si modifico o cancelo la orden en Odoo?** — Se actualiza o se cancela en InspectIA. Si ya tenía producción declarada, no se borra nada y queda un aviso.
- **¿Y un centro de trabajo que no asocié?** — Sus órdenes quedan en una bandeja «sin línea asignada», no se pierden.
- **¿Cada cuánto se sincroniza?** — [DATO A COMPLETAR: frecuencia por defecto; el PRD propone cada 15 minutos.] Lo producido sale al cerrar la producción.
- **¿Mis credenciales quedan guardadas?** — Cifradas, y nunca se muestran ni aparecen en la bitácora.

**CTA:** «¿Usás Odoo? Contanos tu versión y armamos la integración» → contacto con origen `integracion-odoo`.

**links:** Categoría [ERP](/integraciones/erp) · Hub [integraciones](/integraciones) · Funcionalidades [plan de producción](/plataforma/produccion/plan-de-produccion) · [parte de producción](/plataforma/produccion/parte-de-produccion) · [registro de paradas](/plataforma/produccion/registro-de-paradas-de-maquina) · [trazabilidad alimentaria](/plataforma/trazabilidad/trazabilidad-alimentaria)
