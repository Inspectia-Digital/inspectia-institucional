# Funcionalidad — Monitoreo automático de OEE

**URL:** `/plataforma/produccion/monitoreo-automatico-de-oee` · **Módulo:** Producción · **Voz:** la del sitio (voseo)
**Búsquedas que cubre** (Search Console, 16 meses): monitoreo automático de oee (186 impresiones, posición 2,8) · sistemas de control y adquisición de datos con oee (293, 18,9) · proveedor de sistemas scada con oee (223, 40,8) · oee scada · monitoreo oee · oee en tiempo real.

## SEO

- **seoTitle:** Monitoreo automático de OEE conectado al PLC
- **seoDescription:** El OEE de cada línea se calcula solo con el dato del PLC, el SCADA o un sensor. Sin carga manual, mismo precio que el plan manual. Andando en 1 a 10 días.
- **Schema:** Service + FAQPage + BreadcrumbList (Inicio › Plataforma › Producción › Monitoreo automático de OEE)

## Contenido

**eyebrow:** Producción · Monitoreo automático

**h1:** Monitoreo automático de OEE, con el dato que ya sale de la máquina

**lead:** Conectamos el PLC de la línea, o sumamos un sensor si la máquina no tiene, y el OEE se calcula solo mientras el turno corre. Nadie carga nada: las unidades, las paradas y la velocidad salen de la señal de la máquina. Cuesta lo mismo que el plan con carga manual; la integración se cotiza una sola vez.

**problem:**
- El OEE se calcula al día siguiente, con lo que el operario anotó.
- Las microparadas no quedan en ningún lado porque nadie las anota.
- El número de producción de cada turno depende de quién lo cargó.
- Tenés un PLC o un SCADA con los datos, pero nadie los convierte en un indicador.

**does:**
1. **¿De dónde sale el dato?** — De donde ya esté: el PLC de la línea, el SCADA, otro sistema de la planta, o un sensor o una lectora que se suma en el puesto. Se elige máquina por máquina: la nueva puede ir por PLC y la vieja por sensor.
2. **El OEE mientras pasa** — Disponibilidad, rendimiento y calidad de cada línea, y el OEE que resulta de las tres, actualizados durante el turno. Si la línea se frena, se ve en el momento y no en el parte de mañana.
3. **Las paradas se detectan solas** — Cuando la señal se corta, la parada queda registrada con su hora de inicio y de fin. El operario sólo le pone el motivo, con dos toques desde el puesto. Las microparadas también cuentan.
4. **Mismo precio, carga manual o automática** — El plan no sube por conectar la máquina. Podés arrancar gratis con una línea cargada a mano y automatizarla cuando quieras.

**capture:** Manual (plan gratuito, una línea) → Automático (PLC, sensor o lectora) → IA (visión sobre la línea, como proyecto aparte).

**related:**
- Registro de paradas de máquina → `/plataforma/produccion/registro-de-paradas-de-maquina`
- Calidad: el rechazo entra solo al indicador → `/plataforma/calidad`
- Energía: cuánta energía cuesta cada unidad → `/plataforma/energia`

**faq:**
- **¿Se conecta con mi SCADA?** — Sí. Si el SCADA ya tiene el dato de la línea, se toma de ahí y no hace falta instalar nada en la máquina.
- **¿Qué necesito para que el OEE sea automático?** — Que el dato exista en algún lado: un PLC, un SCADA u otro sistema de la planta. Si la máquina no tiene nada, se suma un sensor en el punto de conteo. Se define en el relevamiento, máquina por máquina.
- **¿Sirve con máquinas viejas?** — Sí. Si no tienen PLC, se agrega un sensor que cuenta las unidades y detecta cuándo la línea se frena.
- **¿Cuánto tarda?** — Entre 1 y 10 días desde la reunión de arranque: relevamiento, configuración de la planta, conectividad, dos días de piloto y la puesta en producción.
- **¿Conectar la máquina me sube de plan?** — No. El precio publicado es el mismo para carga manual que para PLC o sensor. Lo único que se cotiza aparte es la integración, una sola vez.
- **¿Puedo usar el programa Kit 4.0?** — Sí. Somos proveedores habilitados y el programa cubre hasta el 50 % del proyecto. → `/kit-4-0`

**links:** Guía [cómo calcular el OEE](/guias/como-calcular-el-oee) · Módulo [Producción](/plataforma/produccion) · Simulador `/simulador`
