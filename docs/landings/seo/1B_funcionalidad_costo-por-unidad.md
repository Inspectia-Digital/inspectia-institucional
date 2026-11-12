# Funcionalidad — Costo de producción por unidad

**Estado: PARCIAL, a pedido.** Verificado el 12/11/2026: los componentes ya se calculan, cada uno en su lugar, pero no hay una vista que los sume en un costo total por unidad. La página se publica con el aviso «Lo activamos con cada cliente» y el CTA «Quiero conocerlo» (formulario de contacto con origen `costos`). Cuando exista la vista total, se cambia por el CTA estándar (`CtaPair`).
- **Materiales:** el costo unitario de compra de cada material (`SkuPerfilCompra.costo_unitario`) ya valoriza las compras del escenario (`core/escenarios.py`).
- **Mano de obra:** horas-hombre por orden y por kilo, valorizadas con el valor hora vigente de cada categoría; costo por unidad por producto y período, ponderado por kilos y nunca promediado; «sin dato» si falta un valor, nunca cero (`core/mano_de_obra.py`, `core/costo_laboral.py`).
- **Energía:** consumo y costo neto por unidad producida, por mes y por servicio, con las facturas y la producción (`core/energia_mensual.py`).
- **Falta:** la suma de los tres por producto y los gastos indirectos.

**URL:** `/plataforma/produccion/costo-por-unidad` · **Módulo:** Producción · **Voz:** la del sitio (voseo) · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Búsquedas que cubre:** costo unitario · costo por unidad · costo de producción · costos de producción · costo de mano de obra.
**Validación SEO (Google Trends, 5 años, 12/11/2026):** «costo de mano de obra» 37, «costo unitario», «costo de producción» y «costos de producción» 29 cada uno, contra 10 de «plan de producción»: es el grupo con más volumen de toda la tanda. En México «costo unitario» supera a «plan de producción» (38 contra 14). La SERP es informativa (definiciones y fórmulas de MRPeasy, Cegid, ProjectManager) y la intención comercial aparece en «software de costos» (Siigo). Por eso la página da la fórmula en las preguntas frecuentes y se ancla en «costo por unidad». La cuenta paso a paso queda para una guía o un artículo del blog (`/blog/como-calcular-el-costo-unitario`, en la lista de candidatos).

## SEO

- **seoTitle:** Costo de producción por unidad: materiales y mano de obra
- **seoDescription:** Cuánto cuesta producir cada unidad de tus productos con lo que pasó en planta: materiales, horas-hombre valorizadas y energía por kilo, período por período.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Producción · Costo por unidad

**h1:** Costo de producción por unidad, con datos de planta

**lead:** Cuánto te cuesta producir cada kilo o cada unidad, armado con datos de la planta y no con estándares de una planilla: los materiales a su costo de compra, las horas-hombre de cada orden valorizadas con el valor hora de cada categoría y la energía que consumió la producción del mes.

**heroPanel — «Galletitas 200 g · octubre · datos de ejemplo»:**
- Filas: Materiales $ 812 por kg · Mano de obra 0,021 h-h por kg · $ 196 por kg · Energía 0,38 kWh por kg · $ 41 por kg
- Total $ 1.049 por kg · mes anterior $ 1.012 (pastilla ámbar «+3,7 %»)

**problem:**
- El costo del producto se calculó una vez, con estándares, y nadie lo actualizó.
- Las horas-hombre de cada producto no se miden, se reparten.
- La factura de luz se prorratea a ojo entre todo lo que se hizo en el mes.
- Cuando sube un insumo o se paga un aumento, no se sabe cuánto pega en cada producto.

**does:**
1. **Materiales** — El costo de compra de cada material, aplicado a la receta de cada producto.
2. **Mano de obra** — Las horas-hombre de cada orden, valorizadas con el valor hora vigente de cada categoría. Por producto se pondera por kilos producidos, no se promedia.
3. **Energía** — El consumo y el costo de la energía por kilo producido, mes a mes, con las facturas y la producción del mismo período.
4. **Sin ceros inventados** — Si falta un valor hora o un costo, el resultado dice «sin dato» en vez de mostrar cero. Así no aparece un producto más barato de lo que es.

**doesNote:** Los gastos indirectos (alquiler, administración, amortizaciones) no se calculan desde la planta. Si los tenés, se suman como un valor por kilo o por unidad.

**see — «Qué ves en InspectIA»** (sin captura: `ProductPanel` «Costo por kilo · octubre · datos de ejemplo»):
- El costo de cada producto separado en materiales, mano de obra y energía.
- La variación contra el mes anterior.
- Las horas-hombre por kilo de cada producto.
- Los productos a los que les falta un dato, marcados como «sin dato».
- Panel, tabla Producto · Materiales · Mano de obra · Energía · Total: Galletitas 200 g · $ 812 · $ 196 · $ 41 · $ 1.049 · Galletitas 500 g · $ 790 · $ 171 · $ 38 · $ 999 · Budín 300 g · $ 1.120 · $ 254 · $ 52 · $ 1.426 · Alfajor 50 g · $ 980 · pastilla gris «Sin dato» · $ 47 · —.

**related (banda teal):**
- **MRP y escenarios** — El costo de lo que hay que comprar para producir un plan. → `/plataforma/produccion/mrp-y-escenarios`
- **Parte de producción digital** — De ahí salen lo producido y las horas de cada orden. → `/plataforma/produccion/parte-de-produccion`
- **Energía** — Consumo y costo por servicio, con las facturas. → `/plataforma/energia`

**faq:**
- **¿Cómo se calcula el costo por unidad?** — Se suman los costos de producir en un período y se dividen por lo que se produjo. Acá se hace por componente: materiales según la receta, horas-hombre valorizadas por kilo y energía por kilo.
- **¿Es costo estándar o costo real?** — Real: sale de lo que se produjo, de las horas que se cargaron y de la energía que se facturó en el período.
- **¿Qué tengo que cargar?** — El costo de compra de los materiales, las categorías de mano de obra con su valor hora y las facturas de energía. Lo que falte se marca como «sin dato».
- **¿Cómo lo activo?** — Lo estamos habilitando con cada cliente. Dejanos tus datos y lo vemos con tu planta.

**links:** Módulo [Producción](/plataforma/produccion) · Módulo [Energía](/plataforma/energia)
