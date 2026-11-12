# Funcionalidad — MRP y escenarios de producción

**URL:** `/plataforma/produccion/mrp-y-escenarios` · **Módulo:** Producción · **Voz:** la del sitio (voseo) · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Búsquedas que cubre:** MRP · sistema MRP · software MRP · MRP para pymes · cálculo de necesidades de materiales · capacidad de producción.
**Validación SEO (Google Trends, 5 años, mundo en español, 12/11/2026):** «mrp» es el término dominante y en México y España sus consultas relacionadas son de producto (qué es mrp, sistema mrp, erp mrp, mrp software, mrp producción). «simulación de producción», «cálculo de materia prima» y «planificación de materiales» dan 0: por eso la página se ancla en MRP y no en «escenarios». «capacidad de producción» tiene volumen (29 contra 46 de «plan de producción») y entra como secundaria. La SERP de «software MRP pymes» es comercial (Capterra, comparasoftware, MRPeasy): hay intención de compra.
**Verificado en el código** (`oee-lite-backend/app/core/escenarios.py`, 12/11/2026): un escenario es un plan hipotético de cantidades por producto, en unidades o en recetas, para un período; puede partir de los pedidos abiertos; calcula por material la necesidad, lo disponible, el faltante, lo que hay que pedir, el sobrante y su costo; calcula la carga de horas por familia de máquinas contra las horas disponibles, la sobrecarga, las máquinas necesarias y los operarios por turno; muestra cómo queda el stock; se aprueba uno por planta y período y queda la foto; genera los pedidos de compra. **No crea órdenes ni secuencia la producción contra la capacidad.**
**No se pisa con** `17_funcionalidad_plan-de-produccion.md`: el escenario analiza qué pasaría; el plan es lo que se va a producir.

## SEO

- **seoTitle:** MRP y escenarios de producción: materiales, máquinas y costos
- **seoDescription:** Cálculo de necesidades de materiales con tus recetas y tu stock, más la capacidad de producción: horas de máquina, operarios, costo de compras y stock final.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Producción · MRP y escenarios

**h1:** MRP y escenarios: todo lo que hace falta para producir lo que querés

**lead:** El cálculo de necesidades de materiales de un MRP, con la capacidad de producción al lado. Cargás cuánto querés producir de cada producto en un período, o partís de los pedidos abiertos, y ves todo lo que implica: la materia prima que falta y cuánto cuesta comprarla, las horas de máquina contra las que tenés, los operarios por turno y cómo queda el stock. Comparás escenarios antes de comprometerte.

**heroPanel — «Escenario diciembre · datos de ejemplo»:**
- Indicadores: Productos 6 · Materiales a pedir 3 · Costo de compras $ 12.480.000 · Operarios por turno 14
- Barras de carga por familia de máquinas: Hornos 112 % (pastilla ámbar «Sobrecarga») · Amasadoras 81 % · Envasadoras 74 %
- Filas de materiales: Harina 000 · necesita 42.000 kg · disponible 30.500 · pedir 11.500 · Envase 200 g · pedir 8.000 u · Azúcar · cubierto (pastilla verde)

**problem:**
- Para saber si se puede tomar un pedido grande hay que armar una planilla que nadie más entiende.
- La materia prima se pide cuando ya falta, porque nadie calculó cuánto hacía falta.
- No se sabe si las máquinas dan abasto hasta que la producción ya está atrasada.
- Cada alternativa de plan es una planilla nueva, y comparar dos lleva una tarde.

**does:**
1. **¿Cuánta materia prima necesito?** — Con la receta de cada producto se calcula la necesidad de cada material, se descuenta lo disponible y lo comprometido, y queda lo que falta, lo que hay que pedir y lo que sobra.
2. **¿Las máquinas dan abasto?** — Horas necesarias contra horas disponibles por familia de máquinas, con el calendario y los turnos de la planta. La sobrecarga se ve antes de que pase, con las máquinas que harían falta.
3. **Operarios, costos y stock** — Cuántos operarios por turno pide el escenario, cuánto cuesta lo que hay que comprar y cómo queda el stock al final del período.
4. **Compará y aprobá** — Copiás un escenario, cambiás cantidades y comparás. El que se aprueba queda guardado tal como se aprobó, y desde ahí se generan los pedidos de compra.

**doesNote:** Un escenario no crea órdenes de producción: sirve para decidir. Lo que se va a producir se arma en el [plan de producción](/plataforma/produccion/plan-de-produccion).

**see — «Qué ves en InspectIA»** (sin captura: `ProductPanel` «Materiales · escenario diciembre · datos de ejemplo»):
- Por material: lo que necesita el escenario, lo disponible, lo que falta, lo que hay que pedir y lo que sobra.
- Por familia de máquinas: horas necesarias contra horas disponibles, y dónde hay sobrecarga.
- Los operarios por turno y las máquinas que harían falta.
- El costo de lo que hay que comprar y cómo queda el stock al final del período.
- Panel, tabla Material · Necesita · Disponible · Pedir · Costo: Harina 000 · 42.000 kg · 30.500 · 11.500 · $ 5.175.000 · Manteca · 6.200 kg · 4.100 · 2.100 · $ 4.410.000 · Envase 200 g · 210.000 u · 202.000 · 8.000 · $ 2.895.000 · Azúcar · 9.800 kg · 12.000 · — · pastilla verde «Cubierto». Pie: «Total a comprar $ 12.480.000».

**related (banda teal):**
- **Plan de producción desde pedidos** — Lo aprobado pasa a órdenes, por línea y fecha. → `/plataforma/produccion/plan-de-produccion`
- **Stock** — El disponible de cada material sale del depósito. → `/plataforma/stock`
- **Parte de producción digital** — Lo que cada línea produjo de verdad, turno por turno. → `/plataforma/produccion/parte-de-produccion`

**faq:**
- **¿Es un MRP?** — Hace el cálculo de necesidades de materiales de un MRP a partir de las recetas, el stock y lo comprometido, y le suma la carga de máquinas y los operarios. No programa la producción contra la capacidad: eso se hace en el plan.
- **¿Puedo cargar las cantidades en recetas?** — Sí, en unidades o en recetas. Si se cargan recetas, el rinde de cada una queda fijo en el escenario.
- **¿Puedo partir de los pedidos de clientes?** — Sí. Los pedidos abiertos, con lo que falta entregar, se suman al escenario.
- **¿Qué necesito tener cargado?** — Los productos con su receta y los materiales con su stock. Para los costos, el costo de cada material; para la carga, las máquinas y sus turnos. Lo que falte, el escenario lo marca.

**links:** Guía [planificación de la producción](/blog/planificacion-de-la-produccion) (cuando exista) · Módulo [Producción](/plataforma/produccion)
