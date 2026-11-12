# Funcionalidad — Parte de producción digital

**URL:** `/plataforma/produccion/parte-de-produccion` · **Módulo:** Producción · **Voz:** la del sitio (voseo) · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Búsquedas que cubre:** parte de producción · registro de producción · parte de producción por turno.
**Validación SEO (Google Trends, 5 años, mundo en español, 12/11/2026):** «parte de producción» 22 y «registro de producción» 10 contra 46 de «plan de producción»; «parte diario de producción» 0 y «reporte de producción» 2. Se ancla en «parte de producción» y se usa «registro de producción» en la descripción y en el cuerpo.
**Verificado en el código** (`oee-lite-backend/app/routers/registro_manual.py`, `core/oee_manual.py`, `core/parte_turno.py`, 12/11/2026): sin hardware, la parada se informa cuando pasa y la producción y la calidad se cargan una vez, al cerrar cada orden; el cierre calcula el OEE y queda congelado (corregir crea una revisión vinculada); al cerrar la última orden del turno, o cuando el turno vence con órdenes abiertas, sale un mail a gerencia por línea con órdenes cerradas, producido contra esperado, OEE, minutos de paradas no planificadas, pérdida de ritmo, el dato a revisar y el link al parte completo. Un parte por línea y día: no se duplica.
**No se pisa con** `10_monitoreo-automatico-de-oee` (dato de la máquina) ni con `11_registro-de-paradas` (la parada en sí). Esta página es para quien hoy llena una planilla de papel.

## SEO

- **seoTitle:** Parte de producción digital por turno, sin planillas
- **seoDescription:** Registro de producción sin papel: el supervisor carga cada orden al cerrarla y al terminar el turno el parte llega por mail, con el OEE ya calculado.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Producción · Parte de producción

**h1:** Parte de producción digital: el turno cerrado, sin pasar planillas

**lead:** El supervisor anota las paradas cuando pasan y, al cerrar cada orden, lo producido y lo rechazado. No hace falta ningún sensor. Cuando termina el turno, el parte llega por mail a la gerencia con el OEE ya calculado.

**heroPanel — «Parte del turno mañana · Línea 2 · datos de ejemplo»:**
- Órdenes cerradas 4 · Producido 11.840 de 12.600 u (94 %) · OEE 71,2 % · Paradas no planificadas 38 min · Pérdida de ritmo 22 min
- Fila ámbar: «Dato a revisar: la orden 1184 dio 128 % de rendimiento»

**problem:**
- El parte en papel se pasa a una planilla al otro día, si se pasa.
- Cada supervisor lo llena a su manera y los turnos no se pueden comparar.
- Cuando la gerencia ve el número, ya pasaron dos días y nadie se acuerda qué pasó.
- Un error de tipeo infla la producción y nadie se da cuenta.

**does:**
1. **Paradas en el momento** — La parada se anota cuando pasa, con su motivo. Queda en el mismo historial que las paradas que detecta una máquina.
2. **Cierre por orden** — Al terminar cada orden se cargan las unidades producidas y las defectuosas. El OEE se calcula en ese momento y el cierre no se puede tocar después: si hay que corregir, se hace una revisión que queda vinculada.
3. **El parte llega solo** — Al cerrar la última orden del turno, o cuando el turno termina con órdenes abiertas, la gerencia recibe el parte por mail: producido contra esperado, OEE, minutos de paradas y pérdida de ritmo.
4. **Lo raro, marcado** — Si una orden da un rendimiento imposible, el parte lo avisa como dato a revisar. No lo borra ni lo esconde.

**doesNote:** Cuando la planta suma sensores o conecta el PLC, el mismo parte se arma con el dato de la máquina. Ver [monitoreo automático de OEE](/plataforma/produccion/monitoreo-automatico-de-oee).

**see — «Qué ves en InspectIA»** (sin captura: `ProductPanel` «Parte del turno mañana · Línea 2 · datos de ejemplo», con las órdenes del parte):
- Las órdenes cerradas del turno y las que quedaron abiertas.
- Lo producido contra lo esperado, orden por orden.
- El OEE del turno con sus tres factores.
- Los minutos de paradas no planificadas y de pérdida de ritmo.
- El dato a revisar, si hay uno, sin sacarlo de la cuenta.
- Panel, filas Orden · Producto · Producido · Esperado · OEE: 1181 · Galletitas 200 g · 3.200 · 3.300 · 74 % · 1182 · Galletitas 200 g · 3.150 · 3.300 · 71 % · 1183 · Galletitas 500 g · 2.640 · 3.000 · 66 % · 1184 · Galletitas 500 g · 2.850 · 3.000 · pastilla ámbar «A revisar». Pie: «4 órdenes cerradas · ninguna abierta».

**related (banda teal):**
- **Registro de paradas** — Motivos, paradas planificadas y dónde se pierde el tiempo. → `/plataforma/produccion/registro-de-paradas-de-maquina`
- **Plan de producción** — El esperado del parte sale del plan. → `/plataforma/produccion/plan-de-produccion`
- **Cómo calcular el OEE** — La cuenta que hace el parte, con un ejemplo. → `/guias/como-calcular-el-oee`

**faq:**
- **¿Necesito sensores?** — No. El parte se arma con lo que carga el supervisor. Si después se suman sensores, se reemplaza la carga por el dato de la máquina.
- **¿Quién recibe el parte?** — Los usuarios con rol de gerencia. Llega uno por línea y por día.
- **¿Qué pasa si me equivoqué al cargar?** — El cierre queda como se cargó y se corrige con una revisión que lo referencia. Así se sabe qué se cambió.
- **¿Y si el turno termina con órdenes abiertas?** — El parte sale igual y dice cuántas quedaron sin cerrar.

**links:** Módulo [Producción](/plataforma/produccion) · Guía [motivos de parada](/guias/motivos-de-parada)
