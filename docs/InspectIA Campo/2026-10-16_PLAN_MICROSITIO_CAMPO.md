# Micrositio InspectIA Campo — propuesta

**Versión:** borrador 2 · 16/10/2026 · **Decisión:** DIR-044
**Fuentes:** `InspectIA Agro/2026-10-16-inspectia-campo.md` (reunión con TecBI), `InspectIA Agro/2026-10-13_BRIEF_MOCK_INSPECTIA_AGRO.md`, `InspectIA Agro/2026-10-14_MAPA_MOCK_A_INSPECTIA.md`, `Marketing/00-mensaje/`.

## 1. Lo definido

- **Nombre:** InspectIA Campo (se escribe con la marca InspectIA).
- **Para qué:** institucional y comercial. Le da presencia al producto frente a campos, canales (HDF, cooperativas, consultores) y socios, y capta contactos.
- **Para quién:** agricultura, ganadería y feedlot (los tres perfiles acordados con TecBI).
- **Restricciones:** sin precios · sin datos reales de ningún campo (ni del piloto) · sin nombrar al socio de infraestructura por ahora · sin nombres de clientes.

## 2. Direcciones web (recomendación)

| Qué | Dirección | Por qué |
|---|---|---|
| Micrositio | **inspectia.ai/campo** | Suma autoridad SEO al dominio principal en vez de repartirla; un solo sitio para mantener; Code lo agrega al mismo repo con su propio tema visual (`agro-theme`). Si mañana Campo necesita dominio propio, se redirige |
| Aplicación de Campo | **campo.inspectia.ai** | Sigue el patrón que ya existe: el dominio pelado es institucional y los subdominios son aplicaciones (`app.`, `dev.`). Es el mismo deploy que `app.inspectia.ai`: el host define la vertical (tema, glosario, catálogo), como ya prevé el brief del mock |
| Desarrollo de Campo | `dev.campo.inspectia.ai` `[a confirmar con Code]` | Mismo criterio que `dev.` de industria |

Lo que implica para Code: callbacks de Auth0, CORS y certificado para `campo.inspectia.ai`, y resolución de vertical por host. Va en un brief aparte, cuando la app de Campo salga del mock.

## 3. Estructura del micrositio (v2: limpia y liviana)

**Criterio:** una sola página, cinco bloques, menos de 200 palabras. Referencias: boosteragro.com (funciones en tarjetas de una línea) y siloreal.com (titular corto, tres pilares, contacto a la vista). Mucho aire, una foto de campo, una captura del producto con datos de ejemplo, íconos de línea. Tema `agro-theme`. Sin cifras, sin logos de clientes, sin FAQ, sin precios.

**1 · Encabezado**
- H1: *Sabé qué pasa en tu campo sin tener que llamar a nadie.*
- Bajada: *Agua, cercos, clima, hacienda, insumos y personal en una sola pantalla, con avisos por WhatsApp.*
- Etiqueta: Agricultura · Ganadería · Feedlot
- Botones: Pedí una demo · Escribinos por WhatsApp
- Imagen: captura de "Ahora en el campo" (datos de ejemplo, sin nombre de campo) sobre foto de campo.

**2 · Todo el campo, en una pantalla** (seis tarjetas con ícono)
- **Agua.** El nivel de cada tanque y aguada, y cuántos días te quedan.
- **Cercos.** Qué cerco se cayó y qué potreros quedaron sin protección.
- **Clima.** Lluvia, viento y pronóstico para decidir cuándo fumigar o prender la bomba.
- **Hacienda.** Cabezas por potrero, traslados, nacimientos, compras y ventas.
- **Insumos.** Gasoil y agroquímicos: lo que entra, lo que se usa y lo que falta.
- **Personal.** Tareas asignadas y avisos que le llegan al encargado por WhatsApp.

**3 · Armado para tu tipo de campo** (tres tarjetas)
- **Agricultura.** Lotes, clima, pulverizaciones e insumos.
- **Ganadería.** Aguadas, cercos, potreros y rotación de hacienda.
- **Feedlot.** Corrales, hacienda e insumos del día. `[verificar alcance del módulo feedlot]`

**4 · Empezás con lo que tenés** (tres pasos)
1. Cargás desde el celular, con formularios simples.
2. Sumás sensores y conectividad donde hace falta, con equipos de cualquier marca.
3. El sistema te avisa solo cuando algo se sale de lo normal.
- Línea Kit 4.0 (sólo si se confirman los kits): *Hasta un 50% de descuento en tu proyecto con Kit 4.0.*

**5 · Hablemos**
- Formulario: nombre · campo o empresa · provincia · tipo (agricultura / ganadería / feedlot) · teléfono → HubSpot, origen `web-campo`.
- Línea: *¿Sos cooperativa, asesor o administrás campos? También queremos hablar con vos.*

**Pie:** InspectIA Campo es parte de InspectIA (enlace a inspectia.ai) · WhatsApp · LinkedIn · privacidad.

**Folleto para HDF:** mismos bloques 1 a 4, en una carilla.

## 4. SEO (a validar)

Términos: software para campos ganaderos · gestión de feedlot · control de aguadas · monitoreo de cercos eléctricos · gestión de hacienda · tareas del personal de campo. Title propuesto: `Gestión del campo en un solo tablero · InspectIA Campo`.

## 5. Kit 4.0 en Campo

- **Aplica en principio:** desde el 01/09/2026 (Res. 343/2026) el Kit 4.0 alcanza a cualquier MiPyME "sin distinción de sector".
- **Condiciones:** certificado MiPyME vigente, dos años o más en la actividad y sin deuda fiscal ni previsional. Además, el proyecto tiene que encuadrar en un kit del catálogo vigente y guardar relación con la actividad de la empresa.
- **El límite:** el catálogo no tiene kits agro. Encuadran los genéricos: mantenimiento de maquinaria (Bas-04), energía (Bas-05), predictivo (Avz-01), trazabilidad (Avz-03, hacienda) y monitoreo (Bas-02, a validar fuera de producción). **Conectividad, cámaras y seguridad (la mayor parte del ticket de USD 50.000) probablemente no encuadran.**
- **Riesgo:** los campos empresa grandes pueden no ser MiPyME.
- **Propuesta:** usarlo en Campo con el mismo gancho ("hasta un 50% de descuento en tu proyecto") pero acotado a los kits que encuadren, y nunca sobre el total de la instalación. `[DATO A COMPLETAR]` qué kits confirma el portal de proveedores para actividad agropecuaria.

## 6. Pendiente

- Confirmar direcciones (§2).
- Confirmar kits de Kit 4.0 aplicables (§5).
- H1 definitivo.
- Capturas del mock con datos de ejemplo, sin nombre de campo.
- Verificar el nombre del campo piloto en el resumen de la reunión ("Las Nahuas" / 35.000 ha): no se publica, pero conviene corregirlo en el documento.
