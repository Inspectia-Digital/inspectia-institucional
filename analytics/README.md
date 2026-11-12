# Medición

## Cómo importar el contenedor

`gtm-inspectia-eventos.json` trae el disparador, las variables y la etiqueta de GA4 que
hacen falta para capturar los doce eventos que el sitio empuja al `dataLayer`. **No toca
las etiquetas de HubSpot ni de LinkedIn**, que quedaron para más adelante.

1. En Tag Manager, contenedor `GTM-M7KDBXZX` → **Admin → Import Container**.
2. Elegir el archivo, **crear un espacio de trabajo nuevo** y opción **Merge**, no
   Overwrite. Overwrite borra las tres etiquetas que ya están.
3. Revisar los cambios que propone antes de publicar. Tienen que ser 16 altas y ninguna
   baja ni modificación.
4. Probar con el modo de vista previa contra el sitio antes de publicar la versión.

## Qué trae

- **Un disparador**, no doce. `CE - eventos del sitio` es un evento personalizado con una
  expresión regular que matchea los doce nombres. Sumar un evento nuevo es agregarlo a esa
  expresión, no crear un disparador más.
- **Una etiqueta de GA4**, no doce. `GA4 - evento del sitio` toma el nombre del evento de
  la variable `{{Event}}`, así que sirve para los doce y para los que vengan.
- **Catorce variables de capa de datos**, una por parámetro. GA4 ignora las que no vengan
  en un evento dado, así que no hace falta una etiqueta por evento.

La etiqueta usa `measurementIdOverride` con el identificador de GA4 en lugar de referenciar
la etiqueta de Google que ya existe. Es a propósito: así el archivo se importa sin depender
de identificadores internos del contenedor, que cambian entre cuentas.

## Los dos pasos que no están en el archivo

El archivo configura Tag Manager. Estos dos van en GA4 y sin ellos la medición queda a
medias:

1. **Marcar como eventos clave** los cuatro de conversión: `demo_scheduled_click`,
   `signup_start`, `roi_report_download` y `partner_signup_start`.
2. **Registrar los parámetros como dimensiones personalizadas** (Admin → Definiciones
   personalizadas). Sin este paso los eventos llegan pero los parámetros no se pueden usar
   en ningún informe, que es el error más común de una implementación de GA4. Los que más
   valen: `source_page`, `module`, `industry`, `plan`, `guide` y `feature`.

## Agregar un parámetro nuevo

Son tres pasos y los tres hacen falta; saltear el tercero es la forma más común de
terminar con un informe vacío y la sensación de que la medición no anda.

1. **El código** lo declara en `src/lib/analytics.ts` y lo empuja al `dataLayer`.
2. **Tag Manager** necesita una variable `DLV - <parámetro>` y una fila en la tabla de
   parámetros de la etiqueta `GA4 - evento del sitio`. Las dos cosas están en el JSON de
   esta carpeta: alcanza con reimportarlo en Merge.
3. **GA4** necesita la dimensión personalizada, con el ámbito de evento y el nombre del
   parámetro escrito igual. **Sólo cuenta desde que se crea**: no rellena hacia atrás, así
   que el dato de los días anteriores se pierde aunque el evento haya estado llegando.

El nombre del evento es otra cosa: ése sí hay que agregarlo a la expresión regular del
disparador, y el chequeo `npm run check:events` rompe el build si el código y el
disparador dejan de coincidir. Un parámetro nuevo no toca el disparador.

## Dos parámetros que no se mapean, y por qué

`roi_calculate` manda `inputs` y `pricing_plan_click` manda `addons_selected`. Los dos son
estructuras —un objeto y un arreglo— y GA4 sólo acepta texto o números como parámetro de
evento. Quedan fuera del mapeo a propósito: llegan al `dataLayer` y sirven para depurar en
el modo de vista previa, pero no viajan a GA4.

Si en algún momento hacen falta en un informe, la solución es aplanarlos en el código
—`addons_selected` como texto separado por comas, y de `inputs` los dos o tres valores que
de verdad importen— y no armar una variable JavaScript en Tag Manager que los serialice.

## Consentimiento

El sitio carga el Consent Mode v2 con todo denegado **antes** que el contenedor, y el
banner actualiza las señales cuando la persona elige. La etiqueta de GA4 lo respeta sola.

Las de HubSpot y LinkedIn **no**: una es HTML personalizado y la otra una plantilla, y a
las dos hay que configurarles el consentimiento etiqueta por etiqueta. Mientras sigan sin
configurar, conviene tenerlas **pausadas**: si el contenedor entra al sitio nuevo con las
dos activas, cargan igual y dejan cookies antes de que nadie consienta nada.

## Los doce eventos

| Evento | Cuándo | Parámetros |
| --- | --- | --- |
| `demo_scheduled_click` | Clic al enlace del calendario | `source_page`, `module`, `industry`, `audience` |
| `signup_start` | Clic en «Empezar gratis» | `source_page`, `module`, `plan` |
| `roi_report_download` | Envío del formulario del informe | `module`, `roi_pct`, `payback_months`, `is_consultant` |
| `partner_signup_start` | Clic en «Crear mi cuenta de partner» | `source_page` |
| `roi_calculate` | Primer cambio que produce resultado | `module`, `inputs` |
| `module_view` | Página de módulo, al 25 % de scroll | `module` |
| `floorplan_module_open` | Punto del plano, una vez por sesión | `module` |
| `solution_view` | Página de industria, guía o funcionalidad | `industry`, `guide`, `feature`, `use_case` |
| `pricing_plan_click` | Clic en un plan | `plan`, `addons_selected`, `price_shown` |
| `marketplace_lead` | Consulta por un servicio | `service`, `category`, `direction` |
| `whatsapp_click` | Clic en el enlace de WhatsApp | `source_page` |
| `newsletter_signup` | Alta de novedades | `source_page` |

El mapa vive tipado en `src/lib/analytics.ts`. Un evento mal escrito no falla en ningún
lado, simplemente no se mide, y eso se descubre tres meses después.
