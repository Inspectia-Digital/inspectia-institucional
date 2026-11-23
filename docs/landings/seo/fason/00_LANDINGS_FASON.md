# Landings — Fábricas que fasonan y marcas que mandan a fasonar

**Fecha:** 20/11/2026 · **Copia del Project:** `claude/2026-11-20_LANDINGS_FASON.md`
**Voz:** la del sitio (voseo) · **Diseño:** `../02_GUIA_DISENO_FUNCIONALIDADES.md`

**Fuentes técnicas:**
- Brief y análisis «Marca que fasona» (16/10/2026, en el Project): casos A–D, DIR-045 a DIR-051, cambios de producto.
- Prototipo «Reporte de fasón» (16/10/2026): bloques, niveles por bloque y lista de lo que nunca se comparte.
- Código verificado en sesiones anteriores (12 y 19/11/2026):
  - pedidos de cliente con renglones y fecha de entrega, y pedidos abiertos con lo que falta entregar (`routers/pedidos_cliente.py`);
  - plan desde pedidos (`core/planeamientos.py`);
  - objetivo por marca en cada orden (`ObjetivoMarcaOrden`, `core/resumen_plan.py`);
  - marca en trazabilidad (`MarcaTrazabilidad`);
  - trazabilidad por lote hacia atrás y hacia adelante, con rutas, remitos e informe para descargar;
  - control de salida teórico contra real por pedido (`routers/stock.py`);
  - compartición entre empresas (`ComparticionMarca`), construida para Sitecno → Motorola.

**[VERIFICAR EN REPO] antes de publicar cada afirmación:**
- si `ComparticionMarca` ya tiene el tipo de vínculo «fasón» (DIR-047) y el reporte de fasón construido, o sólo el de canal;
- si existe el menú «Proveedores» en la cuenta de la marca;
- stock de insumos de la marca en consignación (en el análisis figura «para después»);
- publicación con aprobación de la fábrica.

**Términos por país:**
- Argentina: fasón, fasonero, fasonar.
- México, Centroamérica y Perú: maquila, maquilador.
- España: fabricación por contrato, fabricación para terceros.
- Consumo masivo: co-packer o copacker.
- Cada página se ancla en «fasón» (Argentina) y usa los otros términos en el cuerpo y en las preguntas frecuentes.

**Validación SEO (20/11/2026):**
- **Google Trends: PENDIENTE.** Comparar por país (AR, MX, PE, ES): fasón, producción a fasón, fasonero, maquila, maquila de alimentos, fabricación por contrato, fabricación para terceros, copacker, marca blanca.
- **Resultados de Google hoy:**
  - Para «software para fasón» no aparece ningún producto. Lo que se encuentra es un proyecto de la Facultad de Ingeniería de la UNMdP que desarrolló un software de control de producción para el sector de producción por fasón (https://rinfi.fi.mdp.edu.ar/handle/123456789/1115). El término no tiene un competidor de software instalado.
  - Para «maquila» y «fabricación por contrato» compite Aptean, con páginas en español de software de fabricación por contrato para alimentos y bebidas (https://www.aptean.com/es/industries/food-and-beverage/contract-manufacturing).
  - MRPeasy tiene un artículo informativo sobre fabricación por contrato (https://www.mrpeasy.com/blog/es/fabricacion-por-contrato-y-por-encargo).
  - Conclusión: «fasón» es el término con menos competencia y es local. «Maquila» y «fabricación por contrato» entran como secundarios.

---

# Página 1 — Para fábricas que producen a fasón

**URL:** `/soluciones/produccion-a-fason`
**Búsquedas que cubre:** producción a fasón · software para fasón · fasonero · fabricación para terceros · maquila · co-packer · producir para varias marcas.

## SEO
- **seoTitle:** Producción a fasón: cada marca con sus pedidos y sus lotes
- **seoDescription:** Para fábricas que producen para otras marcas: pedidos y entregas por marca, lotes y trazabilidad separados, y un reporte para cada marca sin mostrar tu planta.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Soluciones · Producción a fasón

**h1:** Producción a fasón: cada marca con sus pedidos, sus lotes y su reporte

**lead:** Si producís para otras marcas, cada una quiere saber cómo viene su pedido, qué pasó con su lote y cuánto queda de su packaging. InspectIA separa todo por marca, desde el pedido hasta el despacho, y te deja mandarle a cada una un reporte armado por vos, sin que vea tu planta, tus costos ni a las otras marcas.

**heroPanel — «Pedidos por marca · semana 47 · datos de ejemplo»:**
- Marca A · 3 pedidos · 2 a tiempo · 1 en riesgo (pastilla ámbar «Insumo de la marca»)
- Marca B · 2 pedidos · a tiempo (verde)
- Marca C · 1 pedido · lote L-1007 retenido (ámbar)
- Pie: «Reporte a cada marca: al cierre del turno, con aprobación»

**problem:**
- Cada marca pide el avance por mail, por WhatsApp o en una visita, y cada una lo quiere en su formato.
- Las líneas pasan de una marca a otra en el mismo día y la producción de cada una se arma después, en una planilla.
- El packaging o la materia prima que manda la marca se mezcla con el propio, y la merma se discute sin datos.
- En un retiro de producto, juntar qué lote fue a qué cliente de esa marca lleva días.

**does:**
1. **Pedidos por marca** — Cada pedido entra con su marca, sus productos y su fecha de entrega. Ves qué falta entregar a cada una y lo planificás en la línea que corresponde.
2. **Producción y lote por marca** — Cada orden lleva la marca para la que se produce, aunque la línea cambie de marca en el mismo turno. El lote queda asociado a la marca desde que se abre.
3. **Calidad y liberación por lote** — Cada lote se libera, se retiene o se rechaza con su control, y la marca puede ver el estado de los suyos.
4. **Trazabilidad por marca** — Con el lote, ves qué materia prima se usó y a dónde se despachó, separado por marca. El informe se descarga listo para un retiro.
5. **Un reporte para cada marca** — Elegís qué ve cada marca y con qué detalle: pedidos, avance, calidad, trazabilidad, sus insumos. Lo publicás al cierre del turno, una vez por día o después de revisarlo.

**Lo que ninguna marca ve (banda teal-050):** tu OEE, tus paradas y sus causas, tu personal, tus costos y rendimientos, tu capacidad, las otras marcas, tus proveedores y tus controles de proceso internos. No es una opción que se apaga: esos datos no se pueden compartir.

**related (banda teal):**
- **Plan de producción desde pedidos** — Los pedidos de cada marca, programados por línea y día. → `/plataforma/produccion/plan-de-produccion`
- **Trazabilidad alimentaria** — Lote por lote, hacia atrás y hacia adelante. → `/plataforma/trazabilidad/trazabilidad-alimentaria`
- **Para las marcas** — Lo que ve la marca que te encarga la producción. → `/soluciones/control-de-fasoneros`

**faq:**
- **¿Una marca puede ver la producción de otra?** — No. Cada marca ve sólo lo que tiene su etiqueta, y sólo lo que vos decidiste compartir.
- **¿La marca ve mi OEE o mis costos?** — No. El OEE, las paradas, los costos, la capacidad y las otras marcas no se comparten en ningún nivel.
- **¿Quién decide qué se comparte?** — La fábrica. La marca puede pedir un reporte, pero lo configura y lo autoriza la fábrica, y se puede revocar.
- **¿La marca tiene que usar InspectIA?** — Para ver el reporte, sí, con su propia cuenta. Si no, seguís usando InspectIA para tu planta igual.
- **¿Sirve si hago maquila o fabricación por contrato?** — Sí: es el mismo modelo con otro nombre. Pedidos, lotes y trazabilidad por cliente.
- **¿Y si la marca me manda el packaging?** — [VERIFICAR EN REPO: stock de insumos de la marca en consignación. Si no existe, sacar la pregunta y el bloque de insumos del reporte.]

**CTA:** «Empezar gratis» + «Agendar demo» (`CtaPair`), con origen `fason-fabrica`.

**links:** Módulos [Producción](/plataforma/produccion) · [Stock](/plataforma/stock) · [Trazabilidad](/plataforma/trazabilidad) · Guía [retiro de lotes](/guias/retiro-de-lotes)

---

# Página 2 — Para marcas que mandan a fasonar

**URL:** `/soluciones/control-de-fasoneros`
**Búsquedas que cubre:** control de fasoneros · seguimiento de producción tercerizada · producir a fasón · control de calidad de maquila · fabricación por terceros control.

## SEO
- **seoTitle:** Control de fasoneros: pedidos, calidad y lotes de tu marca
- **seoDescription:** Si tu marca produce en fábricas de terceros: cómo vienen tus pedidos, el estado de cada lote, tus insumos en la fábrica y la trazabilidad, sin pedir planillas.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Soluciones · Marcas que fasonan

**h1:** Para marcas que fasonan: cómo vienen tus pedidos en cada fábrica

**lead:** Si tu marca produce en fábricas de terceros, el avance, la calidad y la trazabilidad están en la planta de otro. Cuando tu fasonero usa InspectIA, te comparte un reporte de lo tuyo: tus pedidos, tus lotes y tus insumos, al día y en tu cuenta.

**heroPanel — «Fábrica A · para tu marca · datos de ejemplo»:**
- Indicadores: Entregas a tiempo y completas 92 % · Pedidos en curso 4 · En riesgo 1 · Lotes retenidos 1
- Fila: Pedido 2211 · producido 80 % · liberado 65 % · entregado 40 % · comprometido 28/11 · proyectado 02/12 (pastilla ámbar «Insumo de la marca»)

**problem:**
- Te enterás del atraso cuando el pedido no llega.
- La calidad de cada lote la conocés por el certificado que mandan al final, si lo mandan.
- No sabés cuánto de tu packaging queda en la fábrica hasta que falta.
- En un retiro, la trazabilidad la tiene la fábrica y vos dependés de que responda rápido.

**Qué ves de cada fábrica (pasos o grilla):**
1. **Pedidos y entregas** — Cada pedido con lo producido, lo liberado por calidad y lo entregado. Fecha comprometida contra fecha proyectada y la categoría del atraso: insumo de la marca, capacidad, calidad o abastecimiento.
2. **Cómo viene** — Lo producido por semana para tu marca, contra lo planificado.
3. **Calidad de tus lotes** — Liberado, retenido o rechazado, con su certificado.
4. **Tus insumos en la fábrica** — Cuánto queda, para cuántos días alcanza y la merma contra lo acordado. [VERIFICAR EN REPO: consignación]
5. **Trazabilidad** — Buscás un lote y ves fechas, los insumos tuyos que se usaron y a dónde se despachó.

**Lo que no vas a ver (banda teal-050):** cómo funciona la planta de tu fasonero (OEE, paradas, personal, costos, capacidad) ni nada de las otras marcas para las que produce. Lo que ves lo elige la fábrica. Eso es lo que hace que una fábrica acepte compartir.

**Cómo se arma (pasos de 2 px):**
1. **Tu fasonero usa InspectIA** — Puede empezar con el plan gratuito y cargar la producción a mano en una tablet. No hace falta instalar nada en su planta.
2. **Te comparte tu reporte** — Elige qué bloques y con qué detalle, y si lo revisa antes de publicarlo.
3. **Lo ves en tu cuenta** — Con varias fábricas, cada una aparece por separado.

**related (banda teal):**
- **Para las fábricas** — Lo que ve y controla tu fasonero. → `/soluciones/produccion-a-fason`
- **Trazabilidad alimentaria** — Cómo se arma la trazabilidad lote por lote. → `/plataforma/trazabilidad/trazabilidad-alimentaria`
- **Retiro de lotes** — Qué hacer en un retiro de producto. → `/guias/retiro-de-lotes`

**faq:**
- **¿Mi fasonero tiene que usar InspectIA?** — Sí, el reporte sale de lo que la fábrica registra en InspectIA. Puede empezar gratis y con carga manual.
- **¿Puedo ver cómo trabaja la fábrica?** — No. Ves lo de tu marca: pedidos, lotes, calidad, insumos y trazabilidad. La operación de la planta es de la fábrica.
- **¿Puedo comparar mis fasoneros?** — Ves los indicadores de cada fábrica en tu cuenta, uno al lado del otro. [VERIFICAR: DIR-048 dice «sin benchmark identificable»; confirmar qué muestra la vista con varias fábricas.]
- **¿Sirve si trabajo con maquila o con un co-packer?** — Sí: es el mismo modelo.
- **¿Quién responde en un retiro?** — El titular del producto. Por eso conviene tener la trazabilidad por lote a mano, y no depender de un mail.

**CTA:** «Quiero conocerlo» → contacto con origen `fason-marca`.

**links:** Módulo [Trazabilidad](/plataforma/trazabilidad) · Página [producción a fasón](/soluciones/produccion-a-fason)
