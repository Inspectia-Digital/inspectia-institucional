# Categoría — Integración con ERP

**URL:** `/integraciones/erp` · **Voz:** la del sitio · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Fuente técnica:** PRD de integraciones (19/11/2026), §7.1 a §7.5. En el código hoy existen la importación de plan y productos por planilla (`app/routers/importaciones.py`: `/plan/upload`, `/skus/upload`) y la lectura del almacén de datos del cliente por Teramot (`app/core/teramot.py`). El conector Odoo, el formato propio y la devolución son del PRD (INT-1 a INT-6).
**Búsquedas que cubre:** integrar ERP con producción · ERP y control de producción · conectar ERP con planta · software de producción integrado con ERP.
**Validación SEO (Trends, 19/11/2026):** «integración erp» 2; las búsquedas van por el nombre de cada ERP (Odoo 53, Xubio 51, Finnegans 33, Contabilium 20, Bejerman 13 en Argentina; CONTPAQi 56 y Odoo 39 en México). Esta página reúne la intención genérica y reparte hacia cada sistema.

## SEO
- **seoTitle:** Integración con ERP: el plan entra solo y la producción vuelve
- **seoDescription:** Conectá tu ERP con la planta: productos, recetas, órdenes y pedidos entran a InspectIA, y la producción real, los lotes y los consumos vuelven al ERP.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Integraciones · ERP

**h1:** Integración con tu ERP: el plan entra solo y lo producido vuelve

**lead:** El ERP sabe qué hay que producir; la planta sabe qué se produjo. InspectIA los une: toma del ERP los productos, las recetas, las órdenes y los pedidos, y le devuelve la producción real, el scrap, el lote y lo que se consumió de cada materia prima.

**Quién es dueño de qué (dos columnas):**
- **El ERP:** productos, listas de materiales, órdenes de producción, pedidos de clientes, compras y stock de los depósitos que administra.
- **InspectIA:** producción real por orden, scrap, lote producido, consumo de materia prima por lote, paradas con su causa.
- Lo que maneja el ERP se ve en InspectIA con la etiqueta de su origen y se corrige en el ERP. Así no hay dos versiones del mismo dato.

**Qué viaja en cada sentido (tabla):**
| Del ERP a InspectIA | De InspectIA al ERP |
|---|---|
| Productos: materia prima, intermedio y terminado, con unidad y control de lote | Producción por orden, parcial o total |
| Listas de materiales | Cantidad buena y scrap |
| Centros de trabajo, asociados a líneas | Lote del producto terminado |
| Órdenes de producción confirmadas | Consumo de materia prima por lote |
| Stock por depósito, ubicación y lote | Paradas con causa, si el ERP las registra |
| Pedidos de clientes y órdenes de compra | |

**Tres formas de conectarse (bloques con línea superior):**
1. **Por la API del ERP** — Desde la nube, con un usuario de integración. Odoo, Finnegans, SAP Business One, DUX, Contabilium, Bind, Katana y otros.
2. **Por archivo o tabla intermedia** — Para ERPs sin API o instalados en un servidor propio: Tango sin API habilitada, Bejerman, Contagram. Se acuerda un archivo o una vista y se intercambia con el mismo formato.
3. **Sin módulo de producción** — Si el ERP no registra producción (DUX, Contabilium, Alegra, Siigo), lo producido vuelve como movimientos de stock: entra el terminado y sale la materia prima.

**Cómo funciona por dentro (pasos de 2 px):**
1. **Conectar** — Se carga la credencial del ERP y se prueba la conexión. InspectIA detecta qué módulos tiene el ERP y muestra sólo lo que se puede sincronizar.
2. **Asociar** — Centros de trabajo con líneas, depósitos con depósitos, categorías de parada con las del ERP.
3. **Elegir qué viaja** — Cada dato se activa por separado y en cada sentido. Lo que ya estaba cargado en InspectIA se vincula por código; los conflictos quedan listados y no se pisan.
4. **Sincronizar** — El ERP se consulta cada cierto tiempo y lo producido sale cuando se cierra la producción. Reenviar no duplica nada. Cada intercambio queda en una bitácora con lo que entró, lo que salió y lo que falló.

**Grilla de sistemas (logos que enlazan a su página):** Odoo · Tango Gestión · Finnegans GO · SAP Business One · Bejerman · DUX Software · Contabilium · Xubio · Colppy · Contagram · BPS Digital · devFactory · TOTVS Protheus · Dynamics 365 Business Central · CONTPAQi · Bind ERP · Alegra · Siigo · Defontana · Katana · MRPeasy · La Pyme

**faq:**
- **¿Tengo que cargar los productos dos veces?** — No. Entran del ERP. Si ya había productos en InspectIA, se vinculan por código.
- **¿Qué pasa si cambian una orden en el ERP?** — Se actualiza en InspectIA. Si la orden ya tiene producción declarada, no se borra nada y queda un aviso.
- **¿Y si el ERP rechaza lo que le mando?** — El cierre en InspectIA queda hecho y el envío queda «con error», con el mensaje del ERP. Se corrige y se reintenta.
- **¿Cada cuánto se sincroniza?** — Lo que entra del ERP, cada cierto tiempo [DATO A COMPLETAR: frecuencia por defecto, pregunta abierta 3 del PRD]. Lo que sale, cuando se cierra la producción.
- **¿Y mientras no esté la integración?** — El plan y los productos se cargan por planilla, con una plantilla para descargar.

**CTA:** «¿Usás otro ERP? Contanos cuál y armamos la integración» → contacto con origen `integracion-erp`.

**links:** Hub [integraciones](/integraciones) · Funcionalidades [plan de producción](/plataforma/produccion/plan-de-produccion) · [MRP y escenarios](/plataforma/produccion/mrp-y-escenarios) · Módulo [Stock](/plataforma/stock)
