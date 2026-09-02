# Reglas visuales — web institucional

La web y la aplicación **no comparten reglas**. Son dos superficies con trabajos distintos y eso es
deliberado: la app tiene que desaparecer detrás del dato, la web tiene que convencer en treinta
segundos.

| | Web | Aplicación |
| --- | --- | --- |
| Tipografía | **Poppins** | Inter |
| Escala | Grande, con aire | Densa, 14px de base |
| Color de fondo | Teal profundo y blanco alternados | Blanco y gris muy claro |
| Radio | 12px | 6px |
| Movimiento | Entradas al hacer scroll | Sólo respuesta a una acción |
| Foto | A sangre, protagonista | Casi ninguna |

Lo único que comparten es la paleta y el criterio de estado. Un botón de la web **no** tiene que
parecerse a un botón de la app.

---

## Tipografía

Poppins es geométrica y abierta: necesita aire y se rompe si se aprieta. Y es **más ancha que Inter**:
cualquier cálculo de cuántos caracteres entran por línea tiene que hacerse con Poppins, no con la
fuente de la app.

### El titular del hero se mide en `cqw`, no en px

La regla del hero es **máximo tres líneas**, y un tamaño fijo no puede cumplirla: el ancho de la
columna es un porcentaje continuo del viewport, así que un `font-size` en px sólo da tres líneas en
el ancho exacto donde se midió. Con 48px fijos el titular actual daba cuatro líneas en 1280 —el ancho
de notebook más común— y tres sólo a partir de 1366.

La solución es que el tamaño escale **con la columna**, no con la pantalla: si la proporción
tamaño/ancho es constante, los caracteres por línea son constantes y el conteo de líneas no cambia
nunca.

```css
.hero-col { container-type: inline-size; }
h1 { font-size: clamp(26px, 6.25cqw, 56px); text-wrap: balance; }
```

`6.25cqw` sale de la medición: 48px en una columna de 768px. El techo de 56px evita que el titular
crezca sin control en monitores anchos; el piso de 26px, que se vuelva ilegible en mobile.
Verificado en 3 líneas de 860px a 1600px de viewport.

**Al agregar un titular nuevo**, no se elige un tamaño: se verifica el conteo de líneas en 1280 y en
1100, no sólo al ancho de diseño. Si un titular no entra en tres líneas con este `clamp`, es
demasiado largo para un hero.

> **Trampa a evitar.** `tokens/base.css` declara la familia de `h1`–`h6` y un selector de elemento le
> gana a la herencia del `body`. Una página de marca que sólo declara
> `body{font-family:var(--font-brand)}` **renderiza los títulos en Inter sin avisar**. Ya está
> corregido en el origen —los headings ahora heredan— pero toda página de marca debe declarar
> `font-family:var(--font-brand)` en `h1,h2,h3` de todas formas, para no depender de eso.

| Uso | Tamaño / peso | Notas |
| --- | --- | --- |
| Título de hero | `clamp(26px, 6.25cqw, 56px)` / 600 / `-0.03em` / 1.06 | Ver abajo: el tamaño se ata al ancho de su columna, no al viewport |
| Título de sección | 40px / 600 / `-0.02em` / 1.12 | |
| Título de card | 22px / 600 | |
| Lead | 20px / 400 / 1.55 | Máximo 60 caracteres por línea |
| Cuerpo | 16px / 400 / 1.6 | Ancho máximo 640px |
| Eyebrow | 12px / 600 / mayúsculas / `0.1em` | Es la firma tipográfica de la marca |
| Número de módulo | 14px / 600 mono | `01`–`05`, con cero adelante |
| Dato de prueba | 48px / 300 mono tabular | Peso liviano: el número grande y liviano lee más caro |

**Nunca** más de un peso 600 por bloque. **Nunca** texto en mayúsculas más largo que tres palabras.

### Las grillas van en CSS, nunca en `style` inline

Un `grid-template-columns` puesto en un atributo `style` **le gana por especificidad a cualquier media
query**, así que la grilla no colapsa nunca y el bug es invisible en desktop. Pasó en esta misma
página con las cinco grillas y con el alto de la foto del hero: los breakpoints estaban escritos y no
hacían nada.

Dos reglas que se derivan de eso:

- **Toda definición de grilla y todo alto de imagen viven en una clase**, no inline.
- **Todo item de grid lleva `min-width:0`.** Sin eso un item nunca baja de su `min-content` y empuja
  el documento: la columna del newsletter del footer, sola, pedía 896px dentro de un contenedor de
  845 y generaba scroll horizontal.

## Ritmo vertical

Base 8px. Las secciones respiran mucho más que en la app.

- Padding de sección: **120px** arriba y abajo en desktop (≥1100px), **72px** en tablet (<1100px),
  **56px** en mobile (<720px).
- Colapso de grillas: en **<1100px** el hero pasa a una columna con la foto apilada a 300px, y
  módulos y verticales a una columna; el footer baja de cinco a tres con el newsletter a lo ancho.
  En **<720px** los pilares pasan a una columna, el footer a dos y el padding lateral a 20px.
- Entre el título de sección y su contenido: **48px**.
- Entre eyebrow y título: **16px**.
- Grilla de 12 columnas, gutter de 24px, contenido máximo **1200px**, hero hasta 1320px.
- La columna de texto del hero se lleva **el 64% del ancho**, no la mitad: con un titular largo, una
  columna al 50% se va a cuatro líneas.

## Color

Dos fondos y nada más, alternados para marcar el ritmo: **teal profundo `#084749`** y **blanco**.
El gris `--grey-050` se usa para una tercera sección si hacen falta tres seguidas sin teal.

- **El teal profundo es la superficie de marca.** Hero, banda de CTA y footer.
- Sobre teal, el texto secundario va en **blanco al 72%** — que da 6.25:1 y pasa AA— y **nunca en
  gris ni por debajo de .72**. Blanco al 62% (5.07:1) es el piso, y sólo para etiquetas en mayúscula.
  Todo lo que baje de ahí falla AA sobre `#084749`: al 55% da 4.33 y al 32% da 2.45.
- El teal medio `#129fa5` **no se usa como color de texto en ningún fondo**: da 3.25:1 sobre teal
  profundo y 3.22:1 sobre blanco. Es un color de relleno, no de texto. Para un acento de texto sobre
  teal va el cian `#17ccd3` (5.29:1); **sobre blanco va `--teal-700` `#0d7377`** (5.62:1).
- **El eyebrow de marca va en `--teal-700`.** Es el elemento más repetido de la página y en 12px
  necesita el contraste más alto de la paleta, no el más vistoso. `--teal-650` (4.60:1) es el mínimo
  aceptable; `--teal-600` (4.37:1) ya falla.
- **El cian `#17ccd3` sólo como acento**: número de módulo activo, subrayado de un dato, punto de
  estado en vivo. Nunca como fondo de un bloque grande ni como color de un botón primario.
- **El cian no se usa como texto chico sobre una card translúcida**: da 4.47:1, apenas por debajo del
  piso. Ahí va `--teal-300` `#5fd9de`, que da 5.26:1.
- **Sin degradados.** Ni de marca, ni de imagen, ni de texto.
- Los colores de estado se usan sólo si hay un dato real de producto en pantalla (una demo, un
  indicador en vivo). No decoran.

## Superficie y profundidad

- Cards con **1px de borde** y radio **12px**. Sin sombra en reposo.
- Hover de card clickeable: borde en teal + elevación mínima.
- Sobre teal profundo, las cards se definen con `rgba(255,255,255,.08)` de relleno y
  `rgba(255,255,255,.14)` de borde. No con sombra.
- Nada de glass, blur decorativo ni bordes iluminados.

## Botones

| Variante | Uso | Aspecto |
| --- | --- | --- |
| Primario | Agendar demo | Relleno teal de acción, texto blanco, 52px de alto, radio 8px |
| Primario sobre teal | Agendar demo en el hero | Relleno blanco, texto teal profundo |
| Secundario | Calcular ROI | Borde de 1px, fondo transparente |
| Texto | Enlaces dentro de contenido | Subrayado al hover, con desplazamiento |

Un solo botón primario por sección. Los CTA se escriben como el resultado que el visitante busca, no
como la mecánica: "Solicitar visita sin cargo a la planta" es mejor que "Enviar formulario".

## Imagen

- Fotografía real de planta y logística, de temperatura fría. A sangre en el hero y en las secciones
  de vertical.
- La vista isométrica de fábrica y centro logístico que ya tiene el sitio es un activo propio y vale
  mantenerla: es lo más distintivo de la página.
- **Sin ilustración genérica de IA**, sin cerebros, sin nodos, sin render 3D de stock.
- Las capturas de producto van con marco mínimo, radio 12px y borde de 1px. Nunca en un mockup de
  notebook flotando en perspectiva.

## Movimiento

- Entrada al entrar en viewport: fundido + 12px hacia arriba, 400ms, una sola vez.
- Escalonado de 60ms entre hermanos de una grilla.
- Contadores de datos de prueba: 800ms, una sola vez.
- Nada de parallax, nada que se mueva en loop, nada que siga al mouse.
- Respetar `prefers-reduced-motion`: quedan sólo los fundidos.

## Prueba social

Los logos de clientes y partners van en escala de grises al 60% de opacidad, a altura óptica
homogénea —no a ancho igual— y sobre fondo blanco. Una sola fila, sin carrusel automático: un
carrusel que se mueve solo obliga a esperar para leer.

Mientras sean **texto** en lugar de imagen, el gris tiene que pasar AA igual: `--grey-400` da 2.33:1
y es ilegible. Van en `--grey-600` (5.63:1). La regla de "grises al 60%" aplica a la opacidad de una
imagen, no al color de un texto.

## Lo que la web no debe hacer

- **No prometer lo que el producto no hace todavía.** Los módulos en catálogo se presentan como
  módulos, no como funcionalidad disponible hoy.
- **No usar la palabra "revolucionario"** ni equivalentes. La marca argumenta con números.
- **No pedir datos antes de dar algo.** El calculador de ROI se usa sin registrarse.
- **No emoji.**
