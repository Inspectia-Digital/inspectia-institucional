# Funcionalidad — Andon digital: pantalla de producción en planta

**Estado: PLANIFICADA, a pedido.** El modo pantalla todavía no existe en la app (verificado el 12/11/2026). Lo que muestra ya existe: la vista «Todas las líneas» (`oee-lite-backend/app/core/tablero_planta.py`). Falta el modo de pantalla completa con refresco automático. La página se publica con el aviso «Lo activamos con cada cliente» y el CTA «Quiero conocerlo» (formulario de contacto con origen `andon`), como la página de MCP. Cuando el modo exista, se cambia el aviso por el CTA estándar (`CtaPair`).

**URL:** `/plataforma/produccion/andon-digital` · **Módulo:** Producción · **Voz:** la del sitio (voseo) · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Búsquedas que cubre:** andon · andon digital · sistema andon · pantalla de producción · tablero de producción en tiempo real.
**Validación SEO (Google Trends, 5 años, 12/11/2026):** «andon» 55 contra 10 de «plan de producción» en el mundo en español, y 14 contra 14 en México (en Argentina y España casi no se busca). Las relacionadas en México son «qué es andon», «andon lean», «andon lean manufacturing», «andon system». «pantalla de producción» y «tablero de producción» dan 0: nadie lo busca así. La SERP de «pantalla andon producción» tiene competidores directos de OEE (Teeptrak, Pulsar, Fabrico) que lo venden como «modo TV» o «andon digital». Se ancla en «andon digital» y se usa «pantalla de planta» en el cuerpo.
**Qué muestra (lo que ya existe en «Todas las líneas»):** cada línea con su modo y su fuente de datos, producido contra plan, OEE (declarado o medido), tiempo perdido, último dato y estado; el OEE de la planta compuesto con los tiempos de las líneas, nunca promediado; dónde se pierde el tiempo, por estación y con el origen de la parada; hasta tres acciones sugeridas.

## SEO

- **seoTitle:** Andon digital: el estado de cada línea en una pantalla de planta
- **seoDescription:** Una pantalla en la planta con cada línea en vivo: producido contra plan, OEE, paradas y tiempo perdido. Sin tableros a mano ni luces aparte.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Producción · Andon digital

**h1:** Andon digital: cómo viene cada línea, a la vista de toda la planta

**lead:** Una pantalla en la planta muestra cada línea en vivo: cuánto lleva producido contra el plan, el OEE, si está parada y cuánto tiempo se perdió en el turno. El que pasa por la línea sabe en segundos si va bien o hay que actuar.

**heroPanel — «Planta Norte · turno tarde · datos de ejemplo» (fondo teal-900 a pantalla completa, letra grande):**
- Línea 1 · 8.420 / 9.000 u · OEE 78 % · pastilla verde «Produciendo»
- Línea 2 · 3.110 / 6.000 u · OEE 52 % · pastilla roja «Parada · 14 min · Atasco en envasadora»
- Línea 3 · 5.980 / 6.400 u · OEE 74 % · pastilla verde «Produciendo»
- Pie: «OEE de la planta 68 % · Último dato hace 1 min»

**problem:**
- El pizarrón de la línea se actualiza a mano, cuando alguien se acuerda.
- La luz roja avisa que algo pasa, pero no dice qué ni hace cuánto.
- El operario no sabe si el turno va bien hasta que termina.
- Cada línea muestra su número a su manera y nadie puede comparar.

**does:**
1. **Cada línea, en vivo** — Producido contra plan, OEE y estado de cada línea en una sola pantalla. El dato sale de la máquina o de lo que carga el supervisor, y la pantalla dice cuál es.
2. **La parada, con su motivo** — Cuando una línea para, la pantalla lo muestra con el tiempo que lleva y el motivo, si ya se cargó.
3. **El OEE de la planta, bien calculado** — Se arma con los tiempos y las unidades de cada línea, no con el promedio de los porcentajes. Las líneas sin dato no entran y se dice cuántas son.
4. **Dónde se pierde** — Las estaciones que más tiempo perdieron en el turno, para saber dónde poner a la gente.

**doesNote:** Se ve en cualquier televisor con navegador. No hace falta instalar nada en la planta más allá de la pantalla.

**see — «Qué ves en la pantalla»** (sin captura: `ProductPanel` «Dónde se pierde · turno tarde · datos de ejemplo»):
- Cada línea con su estado, lo producido contra el plan y su OEE.
- La parada en curso, con el tiempo que lleva y su motivo.
- El OEE de la planta y la hora del último dato.
- Las estaciones que más tiempo perdieron en el turno.
- Panel, filas Estación · Línea · Tiempo perdido · Origen: Envasadora · Línea 2 · 38 min · detectada · Horno · Línea 1 · 22 min · declarada · Llenadora · Línea 3 · 15 min · detectada.

**related (banda teal):**
- **Monitoreo automático de OEE** — El dato de la máquina que alimenta la pantalla. → `/plataforma/produccion/monitoreo-automatico-de-oee`
- **Registro de paradas** — Los motivos que aparecen en la pantalla. → `/plataforma/produccion/registro-de-paradas-de-maquina`
- **Parte de producción digital** — Si no hay sensores, la pantalla toma lo que carga el supervisor. → `/plataforma/produccion/parte-de-produccion`

**faq:**
- **¿Qué es un andon?** — Es una señal visual que avisa en el momento cuando una línea tiene un problema. Viene del sistema de producción de Toyota y del lean manufacturing. El andon digital reemplaza la luz y el pizarrón por una pantalla con el dato real de cada línea.
- **¿Qué pantalla necesito?** — Cualquier televisor o monitor con navegador.
- **¿Necesito sensores en las máquinas?** — No. Con sensores o el PLC conectado, el dato es automático. Sin ellos, la pantalla muestra lo que carga el supervisor y lo indica.
- **¿Cómo lo activo?** — Lo estamos habilitando con cada cliente. Dejanos tus datos y lo vemos para tu planta.

**links:** Módulo [Producción](/plataforma/produccion) · Guía [cómo calcular el OEE](/guias/como-calcular-el-oee)
