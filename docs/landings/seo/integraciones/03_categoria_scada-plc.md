# Categoría — SCADA y PLC

**URL:** `/integraciones/scada-plc` · **Voz:** la del sitio · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Fuente técnica (código, `oee-lite-backend` en `917ac73`, 19/11/2026):**
- **Entrada de eventos:** `POST /api/lite/scans` (`app/routers/scans.py`), con credencial por estación en `X-Device-Key` (`app/core/auth_m2m.py`). Cada evento trae un `event_id` estable (un reenvío no duplica), unidades procesadas y unidades rechazadas. Llegan en orden y se aceptan hasta 7 días hacia atrás.
- **Paradas:** se detectan por el tiempo entre eventos consecutivos de la misma orden, contra los umbrales de la estación y el producto (`clasificar_delta`, `app/core/oee_clasificacion.py`). Cada parada se crea como pendiente de motivo (`ParadaDetectada`, estado `PENDIENTE`).
- **Rendimiento:** contra el tiempo ideal del producto activo (`tiempo_ideal_seg × unidades_procesadas`, `app/core/oee_eventos.py`). **Calidad:** con las unidades rechazadas.
- **Lectura del PLC:** hoy la hace un gateway del lado de la planta, por ejemplo Node-RED, como en el caso Green Mills con un Siemens LOGO! (`scripts/plc_green_mills_transform.py`).
- **Del PRD (INT-9):** el equipo propio de InspectIA que lee OPC UA, Modbus TCP, MQTT/Sparkplug B, la REST de un historiador o una tabla SQL de alarmas, y la asociación de códigos de alarma con categorías de parada.

**Búsquedas que cubre:** OEE desde SCADA · conectar PLC a la nube · OPC UA OEE · Modbus a la nube · sacar datos del SCADA.
**Validación SEO (Trends, 19/11/2026):** «scada» 30 y «plc» 54, con relacionadas mayormente informativas y en inglés (system scada, scada plc, scada software, scada ignition). «opc ua» 1, «modbus tcp» 1, «mqtt» 7. En la SERP de «OEE WinCC» compiten Teeptrak y Fabrico con páginas por sistema. La categoría se ancla en «SCADA y PLC + OEE».

## SEO
- **seoTitle:** OEE desde tu SCADA o tu PLC, en sólo lectura
- **seoDescription:** Leemos estado, contadores y alarmas de tu SCADA o tu PLC por OPC UA, Modbus TCP o MQTT, sin tocar su programa, y calculamos el OEE y las paradas en vivo.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Integraciones · SCADA y PLC

**h1:** OEE desde tu SCADA o tu PLC, sin tocar su programa

**lead:** Si la máquina ya está automatizada, el dato está: en el SCADA, en el historiador o en el PLC. InspectIA lo lee en sólo lectura y lo convierte en OEE, paradas con su causa y producción por orden, sin cambiar una línea de programa ni una pantalla del SCADA.

**Qué se lee de cada máquina (tabla, señal → para qué la usa InspectIA):**
| Señal | Para qué |
|---|---|
| Contador de piezas buenas | Producción y rendimiento contra el tiempo ideal del producto |
| Contador de rechazo | Calidad |
| Estado: marcha, parada, falla, sin material | Disponibilidad y paradas |
| Código de alarma o de parada | La causa de la parada, asociada a una categoría |
| Velocidad real y nominal | Pérdida de ritmo |
| Orden o producto activo | A qué orden va cada pieza |
| Señal de vida | Distinguir máquina parada de dato caído |

**Cuatro formas de leer (bloques con línea superior):**
1. **OPC UA** — El equipo de planta se conecta al servidor OPC UA del SCADA o del PLC con un usuario de sólo lectura. Sirve para iFIX, WinCC, InTouch, FactoryTalk, Ignition, Elipse, Siemens S7-1500 y la mayoría de los equipos actuales.
2. **Modbus TCP** — Para PLCs sin OPC UA: Modicon, PLCs chicos. Sólo con funciones de lectura, en una red separada y con una única conexión.
3. **MQTT o Sparkplug B** — Si el SCADA o el HMI ya publican MQTT (Ignition, AVEVA Edge, Weintek), InspectIA recibe los datos sin un equipo extra.
4. **Historiador** — Proficy Historian o AVEVA Historian, por su API REST, para recuperar datos históricos.

**Cómo viaja el dato (pasos de 2 px):**
1. **El equipo lee** — Un equipo en la red de planta lee las señales cada pocos segundos. No escribe nada.
2. **Convierte en eventos** — Cada pieza o ciclo es un evento con su hora, sus unidades buenas y rechazadas, y un identificador único.
3. **Manda cifrado** — Los eventos van por HTTPS con una credencial por estación. Si se corta Internet, el equipo los guarda y los manda cuando vuelve, en orden. InspectIA acepta hasta 7 días hacia atrás y no duplica un evento que llega dos veces.
4. **InspectIA calcula** — Si entre dos eventos pasa más tiempo que el umbral del producto, se registra una parada pendiente de motivo. Si hay código de alarma, el motivo sale de la asociación con su categoría. El rendimiento se calcula contra el tiempo ideal del producto y la calidad, con los rechazos.

**Grilla de sistemas (logos que enlazan a su página):** Proficy iFIX · Proficy CIMPLICITY · Proficy Historian · AVEVA InTouch · AVEVA Historian · AVEVA Plant SCADA · AVEVA Edge · Siemens WinCC · Rockwell FactoryTalk · Ignition · Elipse E3 · Movicon.NExT · Weintek · Siemens S7 y LOGO! · Schneider Modicon · Kepware · Node-RED

**faq:**
- **¿Hay que tocar el PLC o el SCADA?** — No. Se lee en sólo lectura. Lo que puede hacer falta es habilitar el servidor OPC UA del SCADA, que en algunas versiones tiene licencia aparte.
- **¿Qué pasa si se corta Internet?** — El equipo guarda los eventos y los manda en orden cuando vuelve. InspectIA acepta hasta 7 días hacia atrás.
- **¿Se expone el PLC a Internet?** — No. El equipo de planta sale hacia la nube por HTTPS; nadie entra a la red de la planta desde afuera.
- **¿Qué necesito para empezar?** — La lista de variables (tags) de cada línea, que suele tener el integrador, y una salida a Internet para el equipo.
- **¿Y si mi integrador ya tiene un gateway?** — Si ya hay Kepware, Ignition Edge o Node-RED, InspectIA toma los datos de ahí.
- **¿Y si la máquina no tiene PLC?** — Un sensor de contacto con un ESP32 manda cada pieza por WiFi, o el operario carga la producción en una tablet. Ver [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee).

**CTA:** «¿Qué SCADA o PLC tenés? Contanos y relevamos las variables» → contacto con origen `integracion-scada`.

**links:** Hub [integraciones](/integraciones) · Funcionalidades [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee) · [registro de paradas](/plataforma/produccion/registro-de-paradas-de-maquina) · [andon digital](/plataforma/produccion/andon-digital) · Guía [cómo calcular el OEE](/guias/como-calcular-el-oee)
