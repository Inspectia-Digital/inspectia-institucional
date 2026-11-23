# Categoría — Trazabilidad (GS1 y EPCIS)

**URL:** `/integraciones/trazabilidad` · **Voz:** la del sitio · **Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`
**Fuente técnica:** PRD de integraciones §7.7: mapeo del contrato a GS1 EPCIS 2.0 (Recepción → ObjectEvent `receiving`; Declaración de producción + Consumo → TransformationEvent; Despacho → ObjectEvent `shipping`; transferencia → ObjectEvent `transporting`/`storing`). GTIN y GLN cuando el cliente los tiene; si no, los códigos internos. En el código hoy existen la trazabilidad por lote hacia atrás y hacia adelante y el informe para descargar (`app/core/informe_trazabilidad.py`, `app/core/linaje_lote.py`). No hay hoy intercambio EPCIS.
**Búsquedas que cubre:** trazabilidad GS1 software · EPCIS · software de trazabilidad integrado · etiqueta GS1-128 lote vencimiento.
**Validación SEO (Trends, 19/11/2026):** «gs1» 27 contra 37 de «wms»; «epcis» 0 y «trazabilidad de lotes» 0. Se ancla en «trazabilidad GS1» y se explica EPCIS en el cuerpo, porque nadie lo busca por la sigla.

## SEO
- **seoTitle:** Trazabilidad GS1: los eventos de tu planta en EPCIS 2.0
- **seoDescription:** InspectIA registra qué lotes de materia prima se transformaron en qué lote de producto, y lo comparte con el estándar GS1 EPCIS 2.0 con GTIN y GLN.
- **Schema:** Service + FAQPage + BreadcrumbList

## Contenido

**eyebrow:** Integraciones · Trazabilidad

**h1:** Trazabilidad GS1: lo que pasa adentro de la planta, en el estándar

**lead:** La trazabilidad se corta muchas veces en la planta: se sabe qué entró y qué salió, pero no qué lote de materia prima terminó en qué lote de producto. InspectIA registra ese paso y lo comparte con otros sistemas en el estándar de GS1, para que la cadena siga completa.

**Qué aporta InspectIA a la cadena (tabla, momento → evento EPCIS 2.0):**
| En la planta | Evento |
|---|---|
| Recepción de materia prima con su lote | Evento de objeto, paso «recepción» |
| Producción: qué lotes de materia prima generaron qué lote de producto, en qué línea y cuándo | Evento de transformación |
| Movimiento entre depósitos | Evento de objeto, paso «almacenamiento» o «transporte» |
| Despacho a cliente con lote | Evento de objeto, paso «envío» |

**Qué es EPCIS (bloque con línea superior):** EPCIS es el estándar de GS1 para intercambiar eventos de trazabilidad: qué producto, dónde, cuándo y por qué. Desde la versión 2.0 se intercambia en JSON por API REST. Un sistema que lo usa puede recibir los eventos de InspectIA sin un desarrollo a medida.

**Identificadores:** GTIN para cada producto y GLN para cada lugar, cuando la empresa los tiene. Si no, se usan los códigos internos de InspectIA.

**Grilla de sistemas:** GS1 / EPCIS 2.0 · GS1 TrazAR · TRAZAL · Trazalog · ANMAT (medicamentos y productos médicos)

**faq:**
- **¿Necesito códigos GS1 para usar la trazabilidad?** — No. La trazabilidad por lote funciona con los códigos internos. Los GTIN y GLN hacen falta para intercambiar eventos con otros sistemas en el estándar.
- **¿Qué pasa en un retiro de producto?** — Con el lote del producto se ve hacia atrás qué lotes de materia prima se usaron y hacia adelante a qué clientes se despachó. Ver la guía de [retiro de lotes](/guias/retiro-de-lotes).
- **¿El código de lote sirve para GS1?** — Sí. El código de lote de InspectIA tiene hasta 20 caracteres, sin caracteres ambiguos, que es lo que admite el identificador de lote de GS1 (AI 10). Entra tal cual en una etiqueta GS1-128. *(Verificado en `app/core/lotes.py`. Hoy las etiquetas que imprime InspectIA son QR de posiciones y contenedores, `app/core/stock_pt_etiquetas.py`; no imprime GS1-128.)*

**CTA:** «¿Trabajás con GS1 o con otro sistema de trazabilidad? Contanos» → contacto con origen `integracion-trazabilidad`.

**links:** Hub [integraciones](/integraciones) · Funcionalidad [trazabilidad alimentaria](/plataforma/trazabilidad/trazabilidad-alimentaria) · Guía [retiro de lotes](/guias/retiro-de-lotes)
