# Funcionalidad — Mantenimiento preventivo por horas de uso

**URL:** `/plataforma/mantenimiento/mantenimiento-por-horas-de-uso` · **Módulo:** Mantenimiento · **Voz:** la del sitio (voseo) · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Búsquedas que cubre:** mantenimiento preventivo · software de mantenimiento · plan de mantenimiento preventivo · horómetro.
**Validación SEO (Google Trends, 5 años, mundo en español, 12/11/2026):** «mantenimiento preventivo» 61 (es mayormente informativa), «software de mantenimiento» 11, «horómetro» 6, «plan de mantenimiento preventivo» 4. En México «software de mantenimiento» supera a «plan de producción» (22 contra 14). El título combina el término comercial (software) con el de volumen (mantenimiento preventivo); «por horas de uso» es el diferencial, no la búsqueda.
**Verificado en el código** (`oee-lite-backend/app/core/mantenimiento_vencimientos.py` y `mantenimiento_intervenciones.py`, 12/11/2026): cada servicio vence por fecha (último hecho + N días) o por horas (último hecho + N horas de uso), lo que llegue primero; las horas salen de Producción (tiempo con producción de las estaciones del activo) o, si no hay, del horómetro cargado a mano; el vencimiento por horas se fecha proyectando el uso promedio; avisos por mail al responsable (interno o prestador); las intervenciones no se borran, se anulan con motivo; con Producción, registrar una intervención genera la parada en la estación (preventiva = planificada, correctiva = no planificada) o clasifica la que ya se había detectado.

## SEO

- **seoTitle:** Software de mantenimiento preventivo por horas de uso
- **seoDescription:** Cada servicio vence por fecha o por horas de uso, lo que llegue primero. Las horas salen de la producción o del horómetro, y avisa al responsable.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Mantenimiento · Por horas de uso

**h1:** Mantenimiento preventivo por horas reales de uso

**lead:** Definís cada servicio por días, por horas de uso o por las dos cosas, y vence lo que llegue primero. Las horas se cuentan solas con lo que la máquina produjo, o con el horómetro si lo cargás a mano. El responsable recibe el aviso antes de que venza.

**heroPanel — «Próximos vencimientos · datos de ejemplo»:**
- Filas: Envasadora 2 · Cambio de correas · cada 500 h · faltan 42 h · vence aprox. 18/11 · pastilla ámbar «Esta semana» · Horno túnel · Limpieza de quemadores · cada 90 días · vence 02/12 · gris «En fecha» · Compresor 1 · Service · cada 2.000 h o 180 días · vencido hace 3 días · rojo «Vencido»
- Pie: «Horas de Envasadora 2: de la producción»

**problem:**
- El plan de mantenimiento va por calendario, aunque la máquina haya trabajado el doble o la mitad.
- Las horas de cada equipo están en un horómetro que nadie anota.
- El aviso depende de que alguien se acuerde, y el service se hace cuando ya se rompió.
- La parada por mantenimiento no queda registrada y después se mezcla con las fallas.

**does:**
1. **Por fecha o por horas** — Cada servicio tiene su frecuencia en días, en horas de uso o en ambas. Vence lo que se cumpla primero.
2. **Las horas, del uso real** — Si la línea tiene Producción, las horas son el tiempo que la máquina estuvo produciendo. Si no, se cargan las lecturas del horómetro. Con el uso promedio, el sistema calcula qué día va a vencer.
3. **Aviso al responsable** — El mail le llega a quien hace el servicio, sea alguien de la planta o un prestador externo.
4. **La intervención, registrada** — Lo que se hizo queda con fecha y responsable, y no se borra: si hubo un error, se anula con el motivo. Con Producción, la preventiva cuenta como parada planificada y la correctiva como no planificada.

**see — «Qué ves en InspectIA»** (sin captura: `ProductPanel` «Envasadora 2 · datos de ejemplo»):
- Los próximos vencimientos de cada máquina, por fecha o por horas.
- De dónde salen las horas de cada una: de la producción o del horómetro.
- Lo vencido y lo que vence esta semana, separados.
- El historial de intervenciones de cada máquina, con fecha, tipo y responsable.
- Panel, arriba «Horas desde el último service 458 de 500 · de la producción»; filas Fecha · Intervención · Tipo · Responsable: 02/11 · Cambio de correas · pastilla gris «Preventiva» · Mantenimiento interno · 21/10 · Atasco de film · pastilla ámbar «Correctiva» · Mantenimiento interno · 04/09 · Service general · pastilla gris «Preventiva» · Prestador externo.

**related (banda teal):**
- **Registro de paradas** — La parada por mantenimiento queda clasificada sola. → `/plataforma/produccion/registro-de-paradas-de-maquina`
- **Monitoreo automático de OEE** — De ahí salen las horas de uso de cada máquina. → `/plataforma/produccion/monitoreo-automatico-de-oee`

**faq:**
- **¿Necesito Producción para usarlo?** — No. Sin Producción, las horas salen del horómetro que se carga a mano y las intervenciones se registran igual.
- **¿Puedo combinar días y horas?** — Sí. Un servicio puede vencer cada 2.000 horas o cada 180 días, lo que pase primero.
- **¿Cómo sabe cuándo va a vencer por horas?** — Proyecta con el uso promedio de la máquina desde el último service.
- **¿Sirve para prestadores externos?** — Sí. Cada servicio tiene su responsable, interno o externo, y el aviso le llega a esa persona.

**links:** Módulo [Mantenimiento](/plataforma/mantenimiento)
