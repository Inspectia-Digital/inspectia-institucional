# Categoría — WMS

**URL:** `/integraciones/wms` · **Voz:** la del sitio · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Fuente técnica:** PRD de integraciones §7.7 (INT-10): entidades `Recepcion` y `Despacho` del contrato, perfiles `wms-api` y `wms-middleware-o-archivo`. En el código hoy existen la recepción de materia prima con posición, el consumo contra la orden y el control de salida (teórico contra real por pedido, `app/routers/stock.py`). No hay hoy vía directa con un WMS externo.
**Búsquedas que cubre:** integrar WMS con planta · WMS de producción · WMS y fábrica · integración WMS ERP producción.
**Validación SEO (Trends, 19/11/2026):** «wms» 37 (contra 30 de «scada»). Página de categoría; el término «WMS para fábricas» ya tiene su propia página de funcionalidad (`/plataforma/stock/wms-para-fabricas`), que esta enlaza.

## SEO
- **seoTitle:** Integración con WMS: de la línea al centro de distribución
- **seoDescription:** InspectIA lleva el depósito de la planta y tu WMS el centro de distribución. El producto terminado pasa con lote, vencimiento y cantidad, sin recargarlo.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Integraciones · WMS

**h1:** Integración con tu WMS: el terminado llega al centro de distribución con su lote

**lead:** La planta y el centro de distribución tienen depósitos distintos. InspectIA lleva el de la planta: materia prima, consumo por lote, producto terminado. Tu WMS lleva el centro de distribución. Lo que sale de la línea llega al WMS con su lote, su vencimiento y su cantidad, listo para recibir.

**Quién lleva qué (dos columnas):**
- **InspectIA, en la planta:** recepción de materia prima con lote, posiciones, consumo contra la orden, ingreso del terminado, despacho.
- **El WMS, en el centro de distribución:** recepción, ubicación, preparación de pedidos y despacho a clientes.

**Qué viaja (tabla):**
| De InspectIA al WMS | Del WMS a InspectIA |
|---|---|
| Producto terminado con lote, vencimiento y cantidad, para su recepción | Stock por lote y ubicación del centro de distribución |
| Consumos de materia prima, si el WMS administra ese depósito | Confirmación de recepción |

**Tres formas de conectarse:**
1. **API del WMS** — DigipWMS, Dettron, Logiwa, Katana.
2. **Middleware del proveedor** — Cygnus, por Hermes AC.
3. **Archivo o tabla intermedia** — Mecalux Easy WMS y WMS instalados en servidor propio: CSV o XML por un directorio compartido.

**Un recorrido (pasos de 2 px):**
1. Cierra la orden en la línea: entran 1.200 cajas del lote PT-2611-014 al depósito de la planta.
2. Sale el despacho al centro de distribución con lote, vencimiento y cantidad.
3. El WMS recibe la recepción ya cargada y la confirma.
4. Si después hay un retiro de producto, la trazabilidad muestra en qué ubicación del centro de distribución está cada caja de ese lote.

**Grilla de sistemas:** Cygnus · Mecalux Easy WMS · DigipWMS · Plexor · Aurora WMS · Dettron · Logiwa · Odoo Inventario

**faq:**
- **¿InspectIA reemplaza a mi WMS?** — No en el centro de distribución. InspectIA lleva el depósito de la planta, que es donde un WMS de distribución no llega: el consumo contra la orden y el ingreso del terminado.
- **¿Qué pasa con el lote?** — Viaja con el producto, con el vencimiento. Así la trazabilidad sigue del otro lado.
- **¿Y si mi WMS no tiene API?** — Se intercambia un archivo con un formato acordado, por un directorio compartido.

**CTA:** «¿Qué WMS usás? Contanos y vemos la integración» → contacto con origen `integracion-wms`.

**links:** Hub [integraciones](/integraciones) · Funcionalidad [WMS para fábricas](/plataforma/stock/wms-para-fabricas) · Módulo [Trazabilidad](/plataforma/trazabilidad)
