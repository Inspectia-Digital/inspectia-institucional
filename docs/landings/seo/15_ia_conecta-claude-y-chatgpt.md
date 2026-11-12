# Página — InspectIA en Claude y ChatGPT (MCP)

**URL:** `/ia/conecta-claude-y-chatgpt` · **Sección:** IA · **Voz:** la del sitio (voseo)
**Diseño:** `02_GUIA_DISENO_FUNCIONALIDADES.md`, versión corta: hero con panel de conversación, tres bloques, preguntas y cierre. Sin «Qué incluye», sin condiciones, sin «Cómo se toma el dato».
**Objetivo:** que quien llega quiera saber más y deje sus datos. **Decidido (12/11/2026):** descripción genérica, sin detallar módulos, permisos ni planes.
**Búsquedas que cubre:** conectar ChatGPT con datos de producción · Claude con datos de la empresa · IA para analizar la producción · MCP para industria.

## SEO

- **seoTitle:** Conectá Claude o ChatGPT a los datos de tu planta
- **seoDescription:** Preguntale a tu asistente de IA cómo viene tu operación y recibí la respuesta con tus propios datos de InspectIA. Conocé el conector MCP.
- **Schema:** Service + FAQPage + BreadcrumbList (Inicio › IA › Claude y ChatGPT)

## Contenido

**eyebrow:** IA · Conector para asistentes

**h1:** Preguntale a Claude o ChatGPT cómo viene tu planta

**lead:** Conectá tu asistente de IA a InspectIA y consultá tu operación en palabras, con los mismos números que ves en la plataforma.

**CTA del hero:** botón principal «Quiero conocerlo» → formulario de contacto con el origen `mcp`; enlace secundario «Ver cómo funciona» → ancla a los bloques.

**heroPanel (conversación, «Datos de ejemplo»):**
- **Pregunta:** ¿Qué línea rindió peor la semana pasada y por qué?
- **Respuesta:** La línea 2. Perdió casi seis horas por falta de envase, el triple que la semana anterior.
- Forma: dos burbujas dentro del marco de `ProductPanel` (pregunta a la derecha sobre `--grey-100`, respuesta a la izquierda sobre blanco con borde `--grey-200`). Sin logos de Claude ni de ChatGPT.

**does (tres bloques, en columnas):**
1. **Preguntás en palabras** — Lo que hoy pedís como informe, lo preguntás como se lo preguntarías a alguien de la planta.
2. **Responde con tus datos** — El asistente consulta InspectIA y contesta con los números de tu empresa, no con una estimación.
3. **Analizás sin planillas** — Comparás períodos, cruzás información y armás tus propios análisis sin exportar nada.

**Franja (`band`):**
- **Título:** Lo estamos habilitando con nuestros clientes
- **Cuerpo:** Contanos qué te gustaría preguntarle a tu planta y te mostramos cómo funciona.
- **Enlace:** «Quiero conocerlo →» al mismo formulario.

**faq:**
- **¿Qué es un conector MCP?** — MCP (Model Context Protocol) es el estándar con el que los asistentes de IA se conectan a otros sistemas. El conector de InspectIA le permite a tu asistente consultar los datos de tu planta.
- **¿Con qué asistentes funciona?** — Con Claude y con ChatGPT.
- **¿Necesito saber programar?** — No. El conector se agrega desde la configuración del asistente y se pregunta en palabras.
- **¿Cómo empiezo?** — Escribinos y te mostramos cómo funciona con datos de una planta.

**Cierre:** título «Mirá tu planta desde tu asistente de IA» · lead «Te mostramos el conector funcionando y vemos qué preguntas le harías vos.» · botón «Quiero conocerlo» → formulario con origen `mcp`.

## Enlaces que tiene que recibir

- `/ia` (índice de IA): una tarjeta más.
- `/plataforma/integraciones`: un bloque «Asistentes de IA».
