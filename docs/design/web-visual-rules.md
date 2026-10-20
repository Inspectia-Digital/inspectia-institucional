# Lineamientos de diseño — web institucional

Lineamientos generales para cualquier versión del sitio. **No definen la estructura de las páginas
ni sus secciones**: eso lo resuelve el proyecto de la web. Definen cómo se ve y cómo se siente.

**La idea en una línea:** clara, simple, liviana y fácil de leer. Fondo claro, mucho aire, poco
color, y el producto mostrado tal como es.

## La web y la app no comparten reglas

| | Web | Aplicación |
|---|---|---|
| Tipografía | Poppins | Inter |
| Escala | Grande, con aire | Densa, 14 px de base |
| Fondo | Blanco | Gris muy claro |
| Movimiento | Entrada suave al hacer scroll | Sólo respuesta a una acción |

Comparten la paleta, el logo y el criterio de estado.

## Color

- **El fondo es blanco.** Para separar bloques alcanza el espacio; si hace falta, una línea de
  1 px `--grey-200` (`#e6e6e6`).
- **El teal profundo (`--teal-900`, `#084749`) como superficie, con moderación**: una banda por
  página como máximo, para el momento de cierre o el de mayor énfasis. Alternar bandas oscuras y
  claras es lo que hace que una página se sienta cargada.
- **El teal de acción (`--teal-650`, `#0c8288`)** para el botón principal, los enlaces y las
  etiquetas de sección. Pasa AA con texto blanco (4.6:1).
- **El cian (`--cyan-400`)** sólo como acento puntual. Nunca de fondo ni en un botón.
- **Texto:** `--grey-900` para títulos y texto principal, `--grey-600` para secundario. Sobre teal
  profundo, blanco y blanco al 78% (nunca por debajo de 72%).
- **Sin degradados, sin glass, sin brillos ni glows.**
- **Los colores de estado** (rojo, ámbar, verde) no se usan en la página. Si aparecen, es adentro
  de una captura del producto.

## Tipografía

**Poppins** en 400, 500 y 600, números incluidos con numerales tabulares. Poppins es geométrica y
abierta: necesita aire y se rompe si se aprieta.

| Uso | Tamaño | Peso | Interlineado | Tracking |
|---|---|---|---|---|
| Título principal | `clamp(36px, 4.6vw, 56px)` | 600 | 1.06 | `-0.03em` |
| Título de sección | `clamp(28px, 3vw, 38px)` | 600 | 1.15 | `-0.02em` |
| Título de bloque | 19 px | 600 | 1.3 | `-0.01em` |
| Lead | `clamp(17px, 1.5vw, 20px)` | 400 | 1.55 | — |
| Cuerpo | 16 px | 400 | 1.65 | — |
| Etiqueta de sección | 14 px | 600, teal | — | — |
| Secundario, notas | 14 px | 400 | — | — |
| Número destacado | 40 px | 500, tabulares | 1 | `-0.02em` |

- **Nada en mayúscula**, tampoco las etiquetas de sección: van en tipo oración.
- **Un solo peso 600 por bloque.**
- **Largo de línea:** lead hasta 640 px, cuerpo hasta 680 px. Un párrafo más ancho no se lee.
- `text-wrap: balance` en títulos y `pretty` en párrafos.
- **Un título de página nunca pasa de tres líneas.** Si no entra, el tamaño se ata al ancho de su
  columna (`container-type: inline-size` + `cqw`), no al viewport: un tamaño fijo sólo cumple el
  máximo en el ancho donde se midió.

## Espacio

- **Base 8 px.** Contenido hasta **1120 px**, padding lateral 32 px (20 en celular).
- **Entre secciones 112 px** en escritorio, 72 en tablet, 56 en celular. Dos secciones seguidas no
  suman su padding.
- **Una idea por sección.** Si un bloque necesita dos títulos, son dos bloques.
- El aire es parte del diseño: ante la duda, más espacio y menos elementos.

## Superficies

- **Sin cards por defecto.** El texto va suelto, separado por espacio o por una línea fina arriba.
  Una card se justifica sólo cuando agrupa algo que se puede tocar como unidad.
- **Sin sombras.** Tampoco en hover: el hover cambia color, no eleva.
- **Radios:** 8 px en botones, 14 px en el marco de una captura, pill en chips.
- **No se anidan contenedores.** Nada de caja adentro de caja.

## Botones y enlaces

| Variante | Uso | Aspecto |
|---|---|---|
| **Principal** | La acción que importa en esa sección | Fondo `--teal-650`, texto blanco, 48 px de alto, radio 8, Poppins 500 15 px |
| **Secundario** | Una alternativa | Fondo blanco, borde 1 px `--grey-300`, texto `--grey-900` |
| **Sobre teal** | Principal dentro de la banda oscura | Fondo blanco, texto `--teal-900` |
| **Enlace con flecha** | Cualquier otra acción | Texto `--teal-650`, 15 px / 500, termina en " →" |

- **Un solo botón principal por sección.** Si hay tres acciones, una es botón y las otras son
  enlaces.
- Hover: principal a `--teal-700`; secundario con borde y texto en teal. 160 ms.
- Foco siempre visible: anillo de 2 px en `--teal-650`.

## Imagen

- **El producto se muestra con capturas reales**, enmarcadas simple: fondo `--grey-050`, borde
  1 px `--grey-200`, radio 14, 10 px de aire alrededor.
- **Sin sombra, sin perspectiva, sin mockup de notebook o celular flotando.**
- **Una imagen por sección** como máximo.
- La fotografía, si se usa, es real de planta, de temperatura fría. Nunca ilustración genérica de
  IA, render 3D de stock ni cerebros o redes de nodos.
- **El hexágono** de la marca, si aparece, una vez por página y nunca como trama de fondo.

## Prueba social

Logos en **escala de grises al 60% de opacidad**, a **altura óptica homogénea** (no a ancho igual),
en una sola fila y sin carrusel automático: un carrusel que se mueve solo obliga a esperar para leer.

## Iconos

Si se usan, **Lucide con trazo 1.5**, el mismo set que la app, a 20 o 24 px, del color del texto
que acompañan. Nunca emoji ni glifos de texto como icono.

## Movimiento

- Entrada en viewport: fundido + 12 px hacia arriba, 400 ms, una sola vez; 60 ms de escalonado
  entre elementos hermanos.
- Transiciones de color: 160 ms, `cubic-bezier(.2,.7,.2,1)`.
- **Nada de parallax, nada en loop, nada que siga al mouse.**
- Con `prefers-reduced-motion`, sólo el fundido.

## Responsive

- Tres rangos: **≥ 1000 px**, **640–1000 px**, **< 640 px**. Toda grilla de más de una columna
  colapsa en el rango medio.
- **Las grillas se definen en clases, nunca en `style` inline**: un `grid-template-columns` inline
  le gana a la media query y la grilla no colapsa nunca.
- **Todo ítem de grid lleva `min-width: 0`**: sin eso no baja de su contenido y genera scroll
  horizontal.
- En celular el menú se reduce a la acción principal.

## Accesibilidad

- Contraste de texto 4.5:1 como mínimo, también sobre la banda teal.
- Objetivos táctiles de 44 px en celular.
- El estado nunca depende sólo del color.

## Cómo saber si una página cumple

- [ ] Fondo blanco; como máximo una superficie teal profundo.
- [ ] Nada en mayúscula; un solo 600 por bloque.
- [ ] Ninguna sombra, ningún degradado, ningún glass.
- [ ] Ninguna caja adentro de otra.
- [ ] Un botón principal por sección.
- [ ] Imágenes con el marco simple, una por sección.
- [ ] Texto con su largo de línea máximo.
- [ ] Las grillas colapsan en 640–1000 px sin scroll horizontal.
