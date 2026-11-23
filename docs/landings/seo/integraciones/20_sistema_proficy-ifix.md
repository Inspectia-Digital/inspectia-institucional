# Sistema — Proficy iFIX

**URL:** `/integraciones/ifix` · **Categoría:** SCADA y PLC · **Voz:** la del sitio · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Fuente técnica:**
- **PRD de integraciones (19/11/2026), §7.6:** perfiles `edge-opcua-client` (vía preferida para iFIX), `edge-modbus-tcp` (plan B), `sql-table-pull` (alarmas por Alarm ODBC) y `historian-rest-pull`; mapeo de tags a señales.
- **Relevamiento §2 «Proficy iFIX».**
- **Código (`917ac73`):** la entrada de eventos (`POST /api/lite/scans`), la detección de paradas por tiempo entre eventos y el cálculo de rendimiento y calidad, iguales a los de la categoría SCADA. El equipo que lee OPC UA y la asociación de alarmas con categorías son del PRD (INT-9).
- **Primer caso del PRD:** Cerámica Quilmes (iFIX, implementador Tecnet, PLC Schneider Modicon Quantum con NOE 771).
**Búsquedas que cubre:** iFIX OEE · iFIX OPC UA · sacar datos de iFIX · Proficy iFIX integración nube · OEE desde SCADA.
**Validación SEO (Trends, 19/11/2026):** «ifix» 11 contra 30 de «scada», con ruido de reparación de celulares. La SERP de «OEE + SCADA» por sistema la trabajan Teeptrak y Fabrico (WinCC, TIA Portal). Long tail técnico: se ancla en «iFIX OEE» e «iFIX OPC UA».

## SEO
- **seoTitle:** Proficy iFIX y OEE: datos del SCADA a la nube por OPC UA
- **seoDescription:** Leemos tu iFIX en sólo lectura por su servidor OPC UA: estado, contadores y alarmas de cada máquina se convierten en OEE y paradas con causa.
- **Schema:** Service + FAQPage + BreadcrumbList (Integraciones › SCADA y PLC › Proficy iFIX)

## Contenido

**eyebrow:** Integraciones · SCADA · Proficy iFIX

**h1:** InspectIA y Proficy iFIX: el OEE de cada línea, sin tocar el SCADA

**lead:** iFIX ya ve cada máquina: si está en marcha, cuántas piezas lleva, qué alarma saltó. InspectIA lee esos datos del servidor OPC UA de iFIX, en sólo lectura, y los convierte en OEE, paradas con su causa y producción por orden, sin cambiar pantallas, scripts ni el programa del PLC.

**heroPanel — «Horno 2 · desde iFIX · datos de ejemplo»:**
- Filas de señales: `HORNO2.ESTADO` → Estado · Marcha · `HORNO2.CONT_OK` → Piezas buenas · 18.420 · `HORNO2.CONT_RECH` → Rechazo · 312 · `HORNO2.ALARMA` → Código 14 · «Falta de material»
- Pie: «Leído por OPC UA · sólo lectura · último dato hace 3 s»

**Quién hace qué (dos columnas):**
- **iFIX sigue a cargo de:** el control de la planta, las pantallas del operador, las alarmas y el historial del SCADA.
- **InspectIA suma:** OEE por línea, turno y orden; paradas con su causa; producción contra plan; reportes y avisos fuera de la sala de control.

**Qué toma InspectIA de iFIX (tabla, tag → señal de InspectIA):**
| Qué hay en iFIX | Qué es en InspectIA |
|---|---|
| Tag de estado (entero o bits de marcha, parada, falla, sin material, mantenimiento) | Estado de máquina: disponibilidad y paradas |
| Contador de piezas buenas (acumulativo) | Producción y rendimiento contra el tiempo ideal del producto |
| Contador de rechazo | Calidad |
| Velocidad real y nominal | Pérdida de ritmo |
| Código de alarma activa, o alarmas en la base SQL por Alarm ODBC | Causa de la parada, asociada a una categoría |
| Orden, producto o receta activa | A qué orden va cada pieza |
| Señal de vida | Distinguir máquina parada de dato caído |

**Qué le envía InspectIA a iFIX:** nada. La lectura es sólo de ida.

**Cómo se conecta (pasos de 2 px):**
1. **Relevar con el implementador** — La versión de iFIX, si el servidor OPC UA está habilitado y la lista de tags de cada línea.
2. **Habilitar OPC UA** — El implementador activa el servidor OPC UA de iFIX y crea un usuario de sólo lectura. Según la versión, puede requerir licencia.
3. **Instalar el equipo de InspectIA** — Un equipo en la red de planta que lee iFIX y sale a Internet por HTTPS. Nadie entra a la red de planta desde afuera.
4. **Asociar tags** — Cada tag con su señal de InspectIA, y cada código de alarma con una categoría de parada.
5. **OEE en vivo** — Desde ahí, cada máquina aparece en el tablero con su OEE, sus paradas y su producción.

**Cómo viaja el dato, por dentro (bloque técnico, con línea superior):**
- El equipo lee los tags cada pocos segundos. Cuando sube el contador, arma un evento con la hora, las unidades buenas y las rechazadas, y un identificador único.
- Los eventos van a InspectIA por HTTPS, con una credencial por estación. Si se corta Internet, el equipo los guarda y los manda en orden cuando vuelve. InspectIA acepta hasta 7 días hacia atrás y no duplica un evento que llega dos veces.
- Si entre dos eventos de la misma orden pasa más tiempo que el umbral del producto, InspectIA registra una parada. Si en ese momento había una alarma activa, la causa sale de su asociación con una categoría; si no, queda pendiente para que el supervisor la clasifique.
- El rendimiento se calcula contra el tiempo ideal del producto activo y la calidad, con el contador de rechazo.

**Si no se puede usar OPC UA (bloque con línea superior):**
- **Plan B, el PLC directo:** si el PLC habla Modbus TCP (por ejemplo, un Modicon Quantum con NOE 771), el equipo lee los registros que indique el integrador, sólo con funciones de lectura, en una red separada y con una única conexión.
- **Históricos:** si hay Proficy Historian, su API REST sirve para recuperar datos de un período, por ejemplo después de un corte.

**Caso (bloque con línea superior):** Cerámica Quilmes. iFIX con implementación de Tecnet sobre PLC Schneider Modicon Quantum. Vía preferida: servidor OPC UA de iFIX con usuario de sólo lectura. Plan B: Modbus TCP contra la NOE 771 con el mapa de registros de Tecnet. Las cámaras del proyecto de calidad van directo al equipo de InspectIA; del SCADA se toma la señal de pieza o el lote para correlacionar.

**Qué tiene que tener la planta:**
- iFIX con el servidor OPC UA habilitado; lo confirma el implementador según la versión y la licencia.
- La lista de tags por línea.
- Un lugar en la red de planta para el equipo de InspectIA, con salida a Internet.

**faq:**
- **¿Hay que cambiar algo en iFIX?** — Sólo habilitar el servidor OPC UA y un usuario de lectura. No se tocan pantallas, scripts ni base de datos.
- **¿Se puede escribir en el PLC desde InspectIA?** — No. El usuario es de sólo lectura y el equipo no tiene funciones de escritura.
- **¿iFIX no puede mandar los datos por MQTT?** — iFIX 2023 tiene cliente MQTT, pero para traer datos al SCADA, no para sacarlos. Por eso la vía es OPC UA.
- **¿Qué pasa si se corta Internet?** — El equipo guarda los eventos y los manda cuando vuelve, hasta 7 días.
- **¿Funciona con CIMPLICITY o con Historian?** — Sí: CIMPLICITY también por OPC UA; Historian, por su API REST.

**CTA:** «¿Tenés iFIX? Contanos la versión y relevamos los tags con tu implementador» → contacto con origen `integracion-ifix`.

**links:** Categoría [SCADA y PLC](/integraciones/scada-plc) · Hub [integraciones](/integraciones) · Funcionalidades [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee) · [registro de paradas](/plataforma/produccion/registro-de-paradas-de-maquina) · [andon digital](/plataforma/produccion/andon-digital)
