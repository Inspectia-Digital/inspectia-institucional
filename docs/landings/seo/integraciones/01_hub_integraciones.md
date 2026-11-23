# Hub — Integraciones

**URL:** `/integraciones`. Hoy existe `/plataforma/integraciones` (`src/routes/plataforma/integraciones.tsx`, contenido en `src/content/integrations.ts`): pasa a ser 301 a `/integraciones`.
**Voz:** la del sitio (voseo). **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`.
**Fuente técnica:** `00_BASE_INTEGRACIONES.md` (código, 19/11/2026) y el relevamiento `03_marketing/07-investigacion/02_briefs_no_code/2026-11-19_RELEVAMIENTO_INTEGRACIONES_DETALLE_SEO.md`.
**Búsquedas que cubre:** integración ERP producción · software de producción integrado con ERP · OEE desde SCADA · conectar PLC a la nube · integraciones InspectIA.
**Qué parte describe código existente y qué parte el PRD de integraciones (19/11/2026):**
- Existe: la lectura de equipos de planta con buffer, idempotencia y 7 días hacia atrás (`POST /api/lite/scans`).
- Es del PRD: el formato propio por API y archivo (INT-1, INT-2), la devolución al ERP (INT-5) y el equipo de planta que lee OPC UA y Modbus (INT-9).

**Validación SEO (Google Trends, 5 años, 19/11/2026):**
- «integración erp» 2, «integración sap» 4, «integración odoo» 1, «integración tango» 0: se busca poco con la palabra «integración».
- Los nombres de los sistemas sí tienen volumen. En Argentina: Odoo 53, Xubio 51, Finnegans 33, Contabilium 20, Bejerman 13. En México: CONTPAQi 56, Odoo 39.
- Las categorías también: «wms» 37, «scada» 30, «gs1» 27.
- El hub se ancla en las categorías y deriva a una página por sistema, que es donde está la intención específica («odoo OEE», «iFIX OEE»).

## SEO
- **seoTitle:** Integraciones: InspectIA con tu ERP, SCADA, PLC y WMS
- **seoDescription:** InspectIA toma datos de tu ERP, tu SCADA, tu PLC o tu WMS y les devuelve lo que pasó en la planta. Cómo es cada integración, sistema por sistema.
- **Schema:** SoftwareApplication + ItemList (un ítem por sistema, con su URL) + BreadcrumbList

## Contenido

**eyebrow:** Integraciones

**h1:** Integraciones con tu ERP, tu SCADA y tu depósito

**lead:** InspectIA trabaja con lo que la planta ya tiene. Toma los productos, las recetas y los planes del ERP; lee las máquinas desde el SCADA o el PLC, sin tocar su programa; y devuelve lo que pasó en la planta: producción real, lotes, consumos y paradas.

**Cómo se reparten los datos (banda teal-050, tres columnas):**
- **Tu ERP manda en el plan.** Productos, listas de materiales, órdenes de producción, pedidos y compras se cargan en el ERP y entran solos a InspectIA.
- **Tus máquinas mandan en el dato.** Estado, contadores, velocidad y alarmas salen del SCADA o del PLC, siempre en sólo lectura.
- **InspectIA manda en la ejecución.** Lo producido, el scrap, el lote, el consumo por lote y cada parada con su causa vuelven al ERP.

**Grilla de logos, en cuatro grupos (cada logo enlaza a su página si existe; si no, el nombre en texto):**
- **ERP:** Odoo · Tango Gestión · Finnegans GO · SAP Business One · Bejerman · DUX Software · Contabilium · Xubio · Colppy · Contagram · BPS Digital · devFactory · La Pyme · TOTVS Protheus · Dynamics 365 Business Central · CONTPAQi · Bind ERP · Alegra · Siigo · Defontana · Katana · MRPeasy
- **SCADA y PLC:** Proficy iFIX · Proficy CIMPLICITY · Proficy Historian · AVEVA InTouch · AVEVA Historian · AVEVA Plant SCADA · AVEVA Edge · Siemens WinCC · Rockwell FactoryTalk · Ignition · Elipse E3 · Movicon.NExT · Weintek · Siemens S7 y LOGO! · Schneider Modicon · Kepware · Node-RED · OPC UA · Modbus TCP · MQTT
- **WMS:** Cygnus · Mecalux Easy WMS · DigipWMS · Plexor · Aurora WMS · Dettron · Logiwa · Odoo Inventario
- **Trazabilidad, datos y asistencia:** GS1 / EPCIS 2.0 · GS1 TrazAR · TRAZAL · Trazalog · Teramot · CrossChex Cloud

**Cómo se conecta, por tipo de sistema (cuatro bloques con línea superior, cada uno enlaza a su categoría):**
1. **ERP** — Por la API del ERP, desde la nube. Si el ERP no tiene API, por archivo o por una tabla intermedia. Si no tiene módulo de producción, la producción vuelve como movimientos de stock. → `/integraciones/erp`
2. **SCADA y PLC** — Un equipo en la red de planta lee el SCADA o el PLC por OPC UA, Modbus TCP o MQTT, en sólo lectura, y manda los eventos cifrados a la nube. Si se corta Internet, los guarda y los manda después. → `/integraciones/scada-plc`
3. **WMS** — InspectIA es el depósito de la planta y el WMS es el centro de distribución. El producto terminado pasa con su lote y su vencimiento. → `/integraciones/wms`
4. **Trazabilidad** — InspectIA aporta lo que pasa adentro de la planta: qué lotes de materia prima se transformaron en qué lote de producto. En el estándar GS1 EPCIS 2.0 cuando el otro sistema lo usa. → `/integraciones/trazabilidad`

**Si tu sistema no está (bloque con línea superior):** InspectIA recibe y entrega datos con un formato propio y documentado, por API o por archivo. Cualquier sistema que pueda leer o escribir ese formato se conecta sin un conector específico.

**faq:**
- **¿Hace falta tocar el PLC o el SCADA?** — No. Se lee en sólo lectura: no se cambia el programa del PLC ni la configuración del SCADA.
- **¿Qué pasa si se corta Internet?** — El equipo de planta guarda los eventos y los manda cuando vuelve la conexión. InspectIA acepta eventos de hasta 7 días hacia atrás y no los duplica si llegan dos veces.
- **¿Quién es dueño de cada dato?** — El ERP, de los productos, las recetas, los planes y los pedidos. InspectIA, de lo que pasa en planta. Cada dato tiene un solo dueño y el otro sistema lo refleja.
- **¿Y si tengo un ERP sin módulo de producción?** — La producción vuelve como movimientos de stock: entra el producto terminado y sale la materia prima consumida.
- **¿Mi sistema no está en la lista?** — Se conecta con el formato de intercambio de InspectIA, por API o por archivo.

**CTA:** «¿Usás otro sistema? Contanos y armamos la integración» → contacto con origen `integraciones`.

**links:** Módulos [Producción](/plataforma/produccion) · [Stock](/plataforma/stock) · [Trazabilidad](/plataforma/trazabilidad) · Funcionalidad [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee)
