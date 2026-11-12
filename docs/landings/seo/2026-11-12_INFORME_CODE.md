# Informe de la tanda — funcionalidades, andon, costos y conector MCP

**Fecha:** 12/11/2026 · **De:** sesión de Claude Code · **Para:** dirección
**Fuentes:** `00_BRIEF_SEO_WEB.md`, `02_GUIA_DISENO_FUNCIONALIDADES.md` y los archivos `10_` a `1B_`.
**Estado:** commiteado y **publicado** en `main`, que despliega directo a Cloud Run.

---

## 1. Qué quedó publicado

### Rutas nuevas (7)

| Ruta | Archivo | Estado |
|---|---|---|
| `/plataforma/produccion/mrp-y-escenarios` | `16_` | Completa |
| `/plataforma/produccion/plan-de-produccion` | `17_` | Completa |
| `/plataforma/produccion/parte-de-produccion` | `18_` | Completa |
| `/plataforma/mantenimiento/mantenimiento-por-horas-de-uso` | `19_` | Completa |
| `/plataforma/produccion/andon-digital` | `1A_` | **A pedido** (planificada) |
| `/plataforma/produccion/costo-por-unidad` | `1B_` | **A pedido** (parcial) |
| `/ia/conecta-claude-y-chatgpt` | `15_` | **A pedido** |

Las cinco anteriores (`10_` a `14_`) se rehicieron con la guía de diseño en el pase del
mismo día. **Las doce usan la misma plantilla**: las secciones viven en
`src/components/site/featureSections.tsx` y las consumen tanto
`routes/plataforma/$modulo_.$funcionalidad.tsx` como la página del conector. Una
funcionalidad nueva se agrega escribiendo contenido en `src/content/features.ts` y nada
más.

### Las páginas «a pedido»

`status: "a-pedido"` más `requestOrigin` en `features.ts` cambian tres cosas y ninguna más:
el hero muestra un botón único «Quiero conocerlo» en vez del `CtaPair`, la barra fija de
celular muestra ese mismo botón, y la franja pasa a ser el cierre de la página. **Ninguna
de las tres muestra «Empezar gratis»** fuera del botón del encabezado del sitio, que es
chrome de navegación y no un CTA de la página. El día que la funcionalidad exista, se
borran los dos campos y la página vuelve al CTA estándar.

El origen viaja como parámetro a `/contacto` (`?origen=andon`, `costos`, `mcp`) **y como
evento** (`feature_request_click`, ver §6). **`/contacto` no tiene formulario** —ninguno de
los que existen tiene destino configurado—, así que el parámetro no prellena nada: separa
en GA4 de qué página salió la consulta. Cuando el formulario exista, el campo ya está
validado en la ruta.

### La segunda tanda de contenido (12/11, tarde)

Entró la actualización de los archivos `10_` a `1B_` y con ella se cerraron **los cinco
`TODO(copy)`**: no queda ninguno en `features.ts`.

- **«Qué ves» en las once funcionalidades.** Las cuatro con captura (`10_` a `13_`)
  recuperaron su lista de viñetas al lado de la imagen. Las seis nuevas no tienen captura,
  así que llevan un `ProductPanel` con la tabla que describe cada archivo.
- **Dos H1 nuevos**, los que no entraban en tres líneas: `19_` «Mantenimiento preventivo
  por horas reales de uso» y `1B_` «Costo de producción por unidad, con datos de planta».
- **WMS (`13_`):** el tercer paso es «El conteo, contra el sistema» y el indicador del hero
  pasó a «Diferencias de conteo hoy 1 · 38 productos contados».
- **Asistencia (`14_`):** la banda «Del ingreso a la línea» tiene su tercer bloque, «Costo
  por unidad», que ahora sí tiene destino.
- Las pastillas de los paneles nuevos usan los alias `-strong`. La gris (`neutral`) no los
  necesita: `--grey-700` sobre `--grey-150` da **7,51:1**.

## 2. Enlaces que se sacaron

| Archivo | Enlace | Por qué |
|---|---|---|
| `16_` | `/blog/planificacion-de-la-produccion` | No existe y no está en esta tanda. El propio archivo lo marca «(cuando exista)». La página queda con el enlace al módulo Producción |

`1B_` menciona `/blog/como-calcular-el-costo-unitario` en la nota de validación SEO, como
candidato para el blog. No es un enlace del contenido, así que no había nada que sacar.

**Todo lo demás resuelve.** Se verificaron los 26 destinos distintos que enlazan las doce
páginas: todos devuelven 200.

## 3. Lo que no coincide con lo que hace la app

Nada del contenido contradice al código: los seis archivos nuevos traen su línea
«Verificado en el código» con la ruta del módulo de backend, y la implementación se limitó
a maquetar ese texto. Dos observaciones que sí conviene registrar:

- **`1A_` (andon) y `1B_` (costo por unidad)** se publican sabiendo que no están
  terminadas. El aviso de la página lo dice y el CTA no ofrece contratarlas.
- **`/contacto` no tiene formulario con destino.** Es el final del recorrido de las tres
  páginas a pedido y hoy no recibe nada.

## 4. Capturas que faltan

- **Las seis funcionalidades nuevas no tienen captura.** Las cinco que hay
  (`public/img/app/`) son tableros de módulo y ninguna muestra un MRP, un plan de
  producción, un parte de turno ni un vencimiento de mantenimiento. Por eso el hero y la
  sección «Qué ves» de cada una llevan un `ProductPanel` dibujado con datos de ejemplo,
  rotulado como tal, que es lo que la guía §3.11 prevé para este caso.
- **Las capturas de módulo se dibujan a unos 520 px** en la sección «Qué ves», porque van
  al lado de la lista. Son archivos de 1680 px: a ese tamaño no se lee nada de la interfaz.
  Vale decidir si ahí no conviene un `ProductPanel` en vez de la captura.
- **`inspectia-tablero-oee.webp` trae una sombra pegada en el archivo**, que es lo que
  §Imagen de los lineamientos prohíbe. Se ve dentro del marco en la página de monitoreo.

## 5. Bugs que aparecieron en el camino

**`md:text-[var(--text-section)]` compilaba a `color`, no a `font-size`.** Tailwind no puede
decidir si un `var()` suelto es una longitud o un color, y elegía color: `40px` como color
es inválido, así que el título perdía su color y heredaba el del body, y además nunca
llegaba a 40 px en escritorio. Sobre blanco no se notaba porque el color heredado era el
que se quería; sobre la banda teal el H2 salía gris oscuro sobre verde oscuro. **Corregido
en las 40 apariciones del sitio** con `text-[length:…]`. Efecto visible: los títulos de
sección de todo el sitio pasan de 28 px a 40 px en escritorio, que es lo que los
lineamientos siempre dijeron.

**Un enlace con `whitespace-nowrap` rompía la página a 390 px.** El bloque «Seguir leyendo»
usa el título entero como texto del enlace, y «Motivos de parada: cómo armar la lista» mide
403 px: la página se iba 33 px al costado. Hay dos variantes de enlace con flecha, una de
una línea y otra que corta.

**Enlaces que se declaraban «página actual».** `Link` marca activo todo destino con el que
la ruta empieza, así que el enlace al módulo padre se anunciaba como página actual en la
misma página que la miga de pan. Corregido con `activeOptions={{ exact: true }}` en todos
los enlaces de la plantilla. **Quedan dos por página**, del encabezado y del pie, que son
anteriores a esta tanda y no se tocaron.

**Un importe se montaba sobre el indicador de al lado.** «$ 12.480.000» a 26 px mide 180 px
y la celda de indicador medía 104: en el hero del MRP el número se salía por la derecha. El
bloque de indicadores ahora mira el valor más largo que le toca y, si pasa de diez
caracteres, baja el cuerpo y pide columnas más anchas.

**«La guía y el módulo» encabezaba páginas sin guía.** Cuatro de las once no tienen guía
todavía, y MRP perdió la suya al sacarle el enlace al `/blog` inexistente: el lector bajaba
hasta ahí buscándola y encontraba un solo renglón que decía «Producción». El título ahora
mira los enlaces antes de prometerlos.

## 6. Chequeo de SEO, motores de respuesta y analítica

Medido sobre el build de producción, las **60 URLs del sitemap**.

### En verde

- **Metadatos:** las 60 con `title`, `description`, `canonical` correcta, `og:title`,
  `og:description`, `og:image` absoluta, `og:url`, `og:site_name`, `og:locale`,
  `twitter:card` y `twitter:image`. **Cero títulos o descripciones repetidos** entre
  páginas, que es el hallazgo que más veces aparece en un sitio de este tamaño.
- **Un solo H1 por página** en las 60. Ninguna saltea un nivel de encabezado salvo
  `/plataforma/marketplace`, que va de H1 a H3.
- **Datos estructurados:** 52 de 60 declaran schema y los 60 bloques parsean.
  `Organization` en la home, `SoftwareApplication` con ofertas en los módulos y en precios,
  `Service` + `FAQPage` + `BreadcrumbList` en las doce funcionalidades, `Article` en las
  ocho guías, `ItemList` en el índice de guías.
- **Imágenes:** ninguna sin `alt`. 1,7 MB en 49 archivos, la más pesada 140 kB, todas
  `.webp`. El JS del cliente son 37 archivos; el más grande, 437 kB sin comprimir.
- **Una URL inexistente responde 404** —no 200 con una página de error, que es el modo
  clásico de llenar el índice de basura— y además lleva `noindex`.
- **`robots.txt` deja pasar a todos los rastreadores**, incluidos los de las IA
  generativas (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). Para un sitio que quiere
  ser citado en respuestas, es la postura correcta y conviene no «ordenarla» con reglas por
  agente sin querer bloquear nada.
- **Las 6 redirecciones de casos de uso siguen en 301**, de un solo salto, con destino 200.
- **Cero scroll horizontal, cero sombras en el cuerpo, una superficie de teal profundo como
  máximo** por página, y **todos los H1 en tres líneas o menos** a 1440 y a 390 px.

### Lo que se corrigió

Los seis hallazgos del chequeo están arreglados y vueltos a medir.

| Qué | Cómo quedó |
|---|---|
| **Tres `seoTitle` de más de 60 caracteres** | 47, 51 y 57. El término de búsqueda se queda entero y adelante; lo que se recortó es la enumeración de atrás, que el buscador cortaba igual. Corregido también en los archivos `16_`, `1A_` y `1B_`, que son la fuente |
| **Cuatro `description` de más de 160** | 149, 146, 157 y 150. Ídem en `18_` y `19_` |
| **`/soluciones` sin un solo enlace entrante** | «Todas las industrias» en el pie, con la misma forma que «Todas las guías». Ahora la enlazan las 59 páginas restantes |
| **`/plataforma/marketplace` saltaba de H1 a H3** | Un H2 para lectores de pantalla sobre el catálogo. Ninguna de las 60 páginas saltea un nivel |
| **El sitemap no declaraba `lastmod`** | Lo declaran **las ocho guías y nada más**, con su fecha de contenido real. Poner la fecha del despliegue en las 60 haría que el sitio entero se «actualizara» cada vez que alguien toca un color, y un `lastmod` que miente se deja de leer para el dominio entero |
| **34 logos de partners sin medidas** | Las medidas reales de cada archivo, leídas con `sharp`, en `PARTNER_LOGO_SIZE`. Cero imágenes sin medida en la home |

Y la que estaba en la lista de motores de respuesta: **`/nosotros` declara `AboutPage` con
la organización como `mainEntity`.** Hasta acá la entidad existía sólo en la home, así que
la página que explica quién es la empresa no decía de quién hablaba.

El único aviso que queda del barrido es que `/contacto` tiene un título de 20 caracteres
—«Contacto · InspectIA»—, que está bien así.

### Motores de respuesta (IA generativas)

Lo que ya rinde: respuesta completa en el primer párrafo de cada guía, `FAQPage` en 20
páginas, encabezados escritos como la pregunta del lector («¿Cuánta materia prima
necesito?»), fechas visibles en las guías y `Article` con `dateModified` real y no la del
build. Eso es lo que hace que un pasaje se pueda citar solo.

Queda una sola cosa por decidir: **no hay `llms.txt`.** Es una convención propuesta,
**ningún motor grande documentó que la use**, y por eso no la agregué por mi cuenta. Cuesta
un archivo; la decisión es si vale publicar algo que hoy nadie lee.

### Analítica

Dos agujeros encontrados y **cerrados en esta tanda**:

- **El botón «Quiero conocerlo» no medía nada.** Es la única acción comercial de las tres
  páginas a pedido —no tienen «Empezar gratis»— y el clic es además lo último medible,
  porque `/contacto` no tiene formulario con destino. Se agregó
  **`feature_request_click { source_page, feature }`** al contrato y al disparador de GTM.
  Los dos parámetros ya estaban cableados en la etiqueta, así que el contenedor no necesita
  nada más. Marcarlo como evento clave en GA4 es decisión tuya.
- **La página del conector MCP no emitía su vista.** Era la única de las doce que no
  aparecía en ningún informe. Ahora emite `solution_view` con
  `feature: "conecta-claude-y-chatgpt"`, el mismo evento que las otras once.

Sigue pendiente, del lado de GA4 y GTM, y es tuyo:

1. **Importar `analytics/gtm-inspectia-eventos.json`** (modo *Merge*, espacio de trabajo
   nuevo). El archivo ya incluye el evento nuevo.
2. **Crear las dimensiones personalizadas `guide` y `feature`** con alcance de evento
   **antes** de publicar en GTM: no se rellenan hacia atrás, así que lo que entre antes de
   crearlas se pierde.
3. **Revisar los eventos clave**, que todavía listan `partner_apply`, retirado.

## 7. Cambios en el sistema de diseño

Cuatro, todos documentados en el archivo donde viven:

- **`--amber-800` y `--blue-700`** en la rampa, y los alias `--status-ok-strong`,
  `--status-warn-strong`, `--status-info-strong` y `--status-stop-strong`. Son el color del
  texto de una pastilla sobre su relleno lavado: los valores que había (`--green-600`,
  `--amber-700`, `--blue-600`, `--red-600`) dan entre 3,94:1 y 4,46:1 y el piso es 4,5:1.
  Los nuevos dan 5,4 a 5,9.
- **`--text-hero-split`**, el titular cuando comparte el hero con el panel. `--text-hero`
  está calibrado sobre una columna de 768 px y en media columna daba 33 px, más chico que
  un título de sección.
- **`serviceJsonLd` acepta no tener módulo.** El conector MCP no cuelga de ninguno.
- **Una celda de tabla del `ProductPanel` puede ser una pastilla** y no sólo texto. Varias
  tablas necesitan decir «Cubierto», «Sin dato» o «A revisar» en la columna donde las demás
  filas traen un número; como texto suelto se leía como un valor más.

## 8. Verificación

Medido sobre el build de producción, las doce páginas de funcionalidad a 1440 y a 390 px:

- Las 12 responden 200, con **un solo H1**, y `title`, `description` y `canonical` iguales
  a los del archivo de contenido.
- **Schema completo en las 12**: `BreadcrumbList` + `Service` + `FAQPage`, los tres parsean.
- **Bloque «Funcionalidades»**: Producción 7 de 7, Mantenimiento 1 de 1, Stock, Trazabilidad
  y Tareas 1 de 1 cada uno.
- **Los 24 casos (12 páginas × 2 anchos) con cero scroll horizontal** y **todos los H1 en
  tres líneas o menos**: los dos que no entraban se arreglaron con el copy nuevo.
- Los 26 destinos internos distintos devuelven 200.
- `sitemap.xml`: 60 URLs, con las 7 nuevas y sin ninguna de casos de uso.
- `npm run typecheck`, `lint`, `check:events` y `build` en verde. Lint: 0 errores y 8 avisos
  de `react-refresh`, 7 anteriores y 1 de `featureSections.tsx`, que exporta constantes al
  lado de componentes como ya hacen `BottomCta` y los primitivos de `components/ui`.

## 9. Lo que queda pendiente

Los seis hallazgos del chequeo están cerrados (§6). Lo que sigue abierto:

**De producto, para cuando haya:**

1. Las capturas de las seis funcionalidades nuevas, que hoy van con panel dibujado.
2. El formulario de `/contacto` con destino, que es donde termina el recorrido de las tres
   páginas a pedido. Mientras no exista, el clic en «Quiero conocerlo» es lo último que se
   mide.

**De contenido, tuyo:**

3. Decidir si `/plataforma/produccion/andon-digital` y `/plataforma/mantenimiento/mantenimiento-por-horas-de-uso`
   se anuncian en algún lado más que en la página de su módulo: hoy tienen un solo enlace
   entrante cada una.
4. Si vale publicar un `llms.txt`.

**Del lado de GA4 y GTM:** los tres puntos de §6, y es lo único que bloquea que los eventos
de las páginas nuevas lleguen a un informe.
