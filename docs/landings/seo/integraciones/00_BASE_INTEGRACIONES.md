# Integraciones — base para las páginas por sistema

**Fecha:** 19/11/2026 · **Estado:** borrador, falta material de cada sistema
**Verificado contra:** backend `oee-lite-backend` en `917ac73` (19/11/2026): `docs/INTEGRACIONES.md`, `docs/GUIA_INTEGRADORES.md`, `app/routers/scans.py`, `app/core/auth_m2m.py`, `app/routers/importaciones.py`, `app/core/teramot.py`, `app/core/asistencia/proveedores.py`, `scripts/plc_green_mills_transform.py`. Lo planificado sale de `PRD_INTEGRACIONES_ERP` y `RELEVAMIENTO_INTEGRACIONES` (19/11/2026, en el Project).

**Qué se decidió (Estanislao, 19/11/2026):**
- Una página por sistema integrable, más la página de integraciones con muchos logos.
- Cada página es un caso: explica cómo nos integramos con ese sistema y cómo interactúan los dos, con lo que dice el código.

**Regla técnica de estas páginas:** cada página dice por qué vía se conecta el sistema y qué parte describe código existente y qué parte el PRD de integraciones. Qué se publica lo decide Estanislao.

**Brief SEO que manda:** `03_marketing/07-investigacion/02_briefs_no_code/2026-11-19_BRIEF_SEO_INTEGRACIONES_Y_CUMPLIMIENTO.md` y su relevamiento detallado (`2026-11-19_RELEVAMIENTO_INTEGRACIONES_DETALLE_SEO.md`).

---

## 1. Qué funciona hoy (verificado en el código)

Hay cuatro vías de entrada y ninguna de salida hacia sistemas de gestión.

### Vía A — Ingesta de planta (equipos que mandan eventos)

- **Qué es:** cualquier equipo que pueda hacer un POST por HTTPS manda cada pieza, ciclo o lote a `POST /api/lite/scans`. Puede ser un gateway que lee un PLC, un ESP32 con un sensor o la terminal de planta.
- **Credencial:** una por estación (`X-Device-Key`). La crea la gerencia en Automatización, se ve una sola vez y vence a los 365 días.
- **Reglas:**
  - cada evento trae un `event_id` estable, así que reenviarlo no duplica;
  - los eventos llegan en orden;
  - se aceptan hasta 7 días hacia atrás;
  - trae unidades buenas y rechazadas.
- **Qué no hace:** InspectIA no lee el PLC. Lo lee un gateway del lado de la planta: Node-RED, Kepware, Ignition Edge u otro. La lógica de qué señal es una pieza depende de cada PLC; hoy es un transformador por cliente (`scripts/plc_green_mills_transform.py`).
- **Caso real:** Green Mills (Provisiones Integrales). Armadora de pan con un PLC Siemens LOGO! leído por Node-RED. Se hizo ingeniería inversa de las señales y la lógica de conteo (bandejas de 5 y de 4 panes) quedó validada contra logs reales. Después el PLC no reportaba bien y el PRD lo reemplaza por un sensor de contacto con ESP32. [CONFIRMAR: estado actual en planta]

### Vía B — Lectura del almacén de datos del cliente (Teramot)

- **Qué es:** Teramot arma el almacén de datos del cliente con sus sistemas. InspectIA lo lee por API, sólo lectura.
- **Qué alimenta:** Reportes de gestión, ventas, stock, el reporte de canal para marcas, la venta de referencia de Abastecimiento y el maestro de productos.
- **Frecuencia:** los reportes se refrescan a las 9 y a las 13; el maestro, cada 12 horas.
- **Caso real:** Sitecno y Motorola, con el ERP Keys, VTEX y Mercado Libre.

### Vía C — Reloj de asistencia (CrossChex Cloud)

- Trae las fichadas cada 5 minutos. No duplica y no guarda biometría.
- Es el único reloj construido. El contrato «traer fichadas por rango» está hecho para sumar otros.
- [CONFIRMAR: qué cliente lo usa]

### Vía D — Planillas

- Plan de producción, catálogo de productos y padrón de personal, por CSV o Excel con plantilla.
- Es la vía de hoy para cualquier ERP sin conector.

### Salidas

- **Asistente de IA (MCP):** Claude o ChatGPT consultan las métricas, sólo lectura.
- **Mails:** partes de turno, avisos.
- **No hay API pública ni webhooks.** Hoy no vuelve nada a un ERP ni a un WMS.

## 2. Qué está diseñado (PRD de integraciones, 19/11/2026)

- Contrato de intercambio propio, para entrada y salida, por API, archivo o webhook.
- Marco de conectores. El primero es **Odoo**, de ida y vuelta: maestros, plan, stock y pedidos entran; producción, scrap, lotes, consumos y paradas vuelven.
- Perfiles declarados para Finnegans, DUX, Contabilium, Bind y BPS.
- Canal de planta propio: el edge de InspectIA lee OPC UA, Modbus TCP, Sparkplug B, el historiador o una tabla SQL. El primer caso es Cerámica Quilmes, con Proficy iFIX y un PLC Modicon Quantum.
- WMS y trazabilidad sobre el contrato, con mapeo a GS1 EPCIS 2.0.

## 3. Cómo se integra cada categoría, hoy y con el diseño nuevo

| Categoría | Hoy | Con el diseño nuevo | Estado para la página |
|---|---|---|---|
| SCADA y PLC (iFIX, WinCC, InTouch, Ignition, FactoryTalk, LOGO!, Modicon…) | Un gateway en la planta lee el PLC o el SCADA y manda los eventos por la vía A | El edge de InspectIA lee el SCADA directo, sólo lectura | **Por proyecto.** Funciona hoy con un gateway |
| ERP con API (Odoo, Finnegans, SAP B1, DUX…) | Planillas (vía D). Si el cliente tiene almacén de datos, Teramot (vía B) | Conector del ERP | Odoo: **en construcción**. Resto: **por proyecto** |
| ERP sin API (Tango on-premise, Bejerman, Contagram) | Planillas | Archivo o tabla intermedia con el contrato | **Por proyecto** |
| WMS (Cygnus, Mecalux, DigipWMS…) | No hay vía directa | Contrato: el terminado va a la recepción del WMS y el stock del centro de distribución vuelve | **Por proyecto** |
| Trazabilidad (GS1 TrazAR, EPCIS) | No hay vía directa | Contrato y EPCIS 2.0 | **Por proyecto** |
| Relojes de asistencia | CrossChex, funcionando | Otros relojes con el mismo contrato | CrossChex: **disponible** |
| Almacén de datos / BI | Teramot, funcionando | — | Teramot: **disponible** |

## 4. Plantilla de una página por sistema (el «caso»)

URL `/integraciones/<sistema>`. La voz es la del sitio y el diseño sigue `02_GUIA_DISENO_FUNCIONALIDADES.md`.

1. **Hero:** «InspectIA y <sistema>». Un párrafo: qué hace cada uno y qué gana la planta al conectarlos. Arriba, la etiqueta de estado.
2. **Quién hace qué:** dos columnas, «<sistema> sigue siendo dueño de…» e «InspectIA es dueño de…». Sale de la regla del PRD: el ERP es dueño de los maestros y del plan; InspectIA, de la ejecución.
3. **Qué toma InspectIA:** lista concreta, con los nombres que usa ese sistema (por ejemplo, en Odoo: `mrp.production`, órdenes de fabricación).
4. **Qué devuelve InspectIA:** lista concreta, o «nada por ahora» si es así.
5. **Cómo se conecta, paso a paso:** quién hace cada paso (el cliente, su integrador, InspectIA), qué credencial o licencia hace falta y dónde se configura.
6. **Un día con los dos conectados:** el recorrido de un dato. Por ejemplo, la orden nace en el ERP, se produce en la línea, el parte cierra y la producción vuelve al ERP. Es lo que hace a la página un caso y no una ficha.
7. **Qué tiene que tener el cliente:** versión, plan, licencia, acceso a la red.
8. **Estado y alternativa de hoy:** si no está construido, cómo se trabaja mientras tanto (planillas, gateway).
9. **Caso real**, si hay.
10. **Preguntas frecuentes.**
11. **Cierre:** un solo CTA. «Empezar gratis» si está disponible; «Quiero conocerlo», con el origen `integracion-<sistema>`, si es por proyecto.

**SEO:**
- `seoTitle` con el patrón «<Sistema> + OEE / producción / trazabilidad: integración con InspectIA», validado en Trends.
- Schema `Service` + `FAQPage` + `BreadcrumbList`.
- Cada página enlaza a su categoría y a las funcionalidades que alimenta.

## 5. Material que hace falta por sistema

Para escribir cada caso sin inventar:

1. Documentación de la API o de la vía de conexión, o el link oficial.
2. Qué objetos o tablas maneja: productos, órdenes, stock, lotes; en SCADA, tags y alarmas.
3. Versiones y planes que exponen la API, y licencias que hacen falta.
4. Si hay un cliente o prospecto con ese sistema, qué tiene y qué quiere conectar.
5. Para SCADA: protocolo (OPC UA, Modbus, MQTT), quién es el integrador y si el cliente acepta un equipo en la red de planta.
6. Logo oficial (SVG) o la página de prensa de la marca.

## 6. Archivos de esta carpeta

| Archivo | Página |
|---|---|
| `01_hub_integraciones.md` | `/integraciones` (301 desde `/plataforma/integraciones`) |
| `02_categoria_erp.md` | `/integraciones/erp` |
| `03_categoria_scada-plc.md` | `/integraciones/scada-plc` |
| `04_categoria_wms.md` | `/integraciones/wms` |
| `05_categoria_trazabilidad.md` | `/integraciones/trazabilidad` |
| `10_sistema_odoo.md` | `/integraciones/odoo` |
| `20_sistema_proficy-ifix.md` | `/integraciones/ifix` |

Numeración: 10–19 ERP, 20–39 SCADA y PLC, 40–49 WMS, 50–59 trazabilidad.

**Siguen**, a medida que llegue el material de cada sistema: Tango, Finnegans, SAP Business One, Bejerman, DUX, Contabilium y el resto de los ERP; WinCC, InTouch, Ignition, FactoryTalk, Modbus TCP, OPC UA, MQTT y el resto de SCADA y PLC; Cygnus y el resto de los WMS; GS1 TrazAR, TRAZAL y el resto de trazabilidad.

## 7. Datos técnicos a completar
- Frecuencia por defecto de la sincronización con ERP (pregunta abierta 3 del PRD; propuesta: cada 15 minutos).
- Estado actual de Green Mills: PLC con Node-RED, ESP32 o carga manual.
- Qué cliente usa CrossChex.
