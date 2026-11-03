# Las capturas que necesita el sitio

> 3 de noviembre de 2026. Relevado contra el repo del sitio y contra
> `oee-lite/src/modules/`, no de memoria.

> **Estado, mismo día.** Las seis capturas de producto —B1 y A1 a A5— **ya están
> publicadas**. Llegaron a `assets-src/app/` como bocetos con datos de demostración
> (Panificadora El Trigal, ninguna cuenta real), se encodearon y están en la home y en las
> cinco páginas de módulo. El patrón "una captura por módulo" que se propone más abajo
> quedó implementado. Sigue abierto todo lo del pie: las siete fotos de rubro, las tres de
> Campo y la imagen de compartido.

Catorce capturas de producto, más seis fotos y una imagen de compartido que no son
capturas. Abajo está cada una con dónde cae, qué pantalla hay que mostrar y a qué medida.

---

## Antes que nada: dos módulos no se pueden capturar

**Mantenimiento y Energía no existen en la aplicación.** `oee-lite/src/modules/` tiene
`calidad`, `canales`, `hub`, `oee`, `reportes`, `stock`, `tareas` y `trazabilidad`: no hay
carpeta de mantenimiento ni de energía, así que no hay pantalla que fotografiar.

Las dos páginas del catálogo igual existen y se visitan. La salida no es dibujar un mockup
—eso es prometer una pantalla que no hay— sino **dejar esas dos páginas sin captura** y que
el bloque "Qué hace" siga a una columna, que es como está hoy y funciona. Cuando el módulo
exista, entra la captura y la página no cambia de forma.

Son cinco módulos capturables, no siete.

## Y una propuesta de diseño, porque el patrón actual no cierra

El comentario de `src/routes/plataforma/$modulo.tsx:272` deja planteado un zigzag —texto y
captura alternados— para el bloque "Qué hace". Cada módulo tiene **cuatro** entradas ahí:
el zigzag literal pide 4 × 5 = **veinte capturas**, y cada una tendría que mostrar
exactamente una afirmación ("las paradas quedan con su motivo") sin repetirse con las otras
tres del mismo módulo. No es realizable y, peor, un zigzag a medio llenar se lee como roto.

**Propongo cambiar el patrón: una captura por módulo**, a lo ancho de la columna, justo
debajo del H2 "Qué hace", y los cuatro puntos quedan como la lista numerada que ya están.
La captura muestra el módulo entero; la lista explica. Cinco capturas en vez de veinte, y
la página no depende de que estén las cuatro para no verse incompleta.

**Implementado el 3/11**, al publicar las capturas. El comentario de la ruta quedó
actualizado con el porqué. Si preferís otra cosa, es un solo bloque y se revierte.

---

## Las reglas que valen para todas

1. **Datos de demostración, nunca de un cliente.** Es la que más importa: una captura del
   tablero de un tenant real publica su producción, sus paradas y sus defectos en la home.
   Si la única cuenta con datos presentables es real, se maquillan nombres y números
   **antes** de sacar la captura, no después.
2. **Sin cromo del navegador**, sin cursor, sin notificaciones del sistema, sin la barra de
   tareas. Sólo la aplicación.
3. **Ventana ancha y zoom al 100 %.** Una captura tomada en una ventana angosta trae el
   layout móvil de la app y se lee como otro producto.
4. **Toda imagen pasa por `npm run images`.** Original a `assets-src/`, entrada en
   `scripts/optimize-images.mjs`, y la ruta en `src/content/assets.ts`. Nada consume
   `public/img` con un string suelto.
5. **PNG como original**, sin comprimir. El script hace el WebP y las variantes.

---

## Tanda A · Las cinco de las páginas de módulo

Caen en `/plataforma/<modulo>`, en el bloque "Qué hace". **16:10 o 3:2 apaisada, 1920px de
ancho** (mínimo 1600). Los nombres de pantalla salen del listado de archivos de `oee-lite`;
no las abrí, así que tomalos como la candidata y cambiala si otra muestra mejor el módulo.

| # | Página | Qué tiene que mostrar | Pantalla candidata |
|---|---|---|---|
| A1 | `/plataforma/produccion` | El OEE de una línea en vivo, con sus tres componentes y la curva del turno. Números grandes, no filas de texto. | `TableroProduccionPage` |
| A2 | `/plataforma/calidad` | El tablero de calidad con el Pareto de defectos y rechazo y retrabajo separados. | `CalidadPage` |
| A3 | `/plataforma/stock` | Stock por producto con la cobertura en días y al menos una diferencia marcada. | `StockPorProductoPage` o `CoberturaPage` |
| A4 | `/plataforma/trazabilidad` | Un lote con su genealogía y su vencimiento. Es el módulo donde el árbol es el argumento. | `LotesPage` |
| A5 | `/plataforma/tareas` | La cobertura del turno antes del turno: quién está asignado a qué puesto. | `TareasPage` |

**No hacen falta:** `/plataforma/mantenimiento` y `/plataforma/energia`.

## Tanda B · La home

| # | Dónde | Estado |
|---|---|---|
| B1 | Encabezado de `/`, columna derecha | **La tenés.** Falta que entre al repo. |

El destino es `APP_SHOT` en `src/content/assets.ts`, que hoy está en `null`. Mientras siga
en `null` el encabezado va a una columna a ancho completo, que es a propósito: una columna
de texto capada esperando una imagen que no está se lee como un error de carga.

Para publicarla: el original a `assets-src/app/tablero.png`, `npm run images -- app`, y se
completa el objeto con el `alt` y las medidas que imprime el script. Lo hago yo cuando el
archivo esté.

Dos cosas de esta en particular: **se dibuja a ~520px de ancho**, así que necesita 1100px
mínimo y lo que tiene que leerse a ese tamaño son gráficos y números grandes, no una tabla.
Y **4:3 o 3:2** — una captura de pantalla completa en 16:9 entra demasiado chica en la
columna. Si la que tenés es el tablero de producción, conviene que A1 sea otra pantalla del
módulo (`SupervisorPage` o `VistaDelMesPage`) para no repetir la misma imagen dos veces.

## Tanda C · Las ocho de las páginas de rubro

`/soluciones/<rubro>` son siete páginas —alimentos, autopartista, logística, textil,
farmacéutica, cosmética, maquinarias— y hoy ninguna muestra el producto. **No necesitan una
captura propia cada una**: la misma captura de módulo sirve, elegida según qué le importa al
rubro. Lo que falta es el slot, que todavía no existe en la ruta.

Son cero capturas nuevas si reusamos las de la Tanda A. Lo dejo acá para que esté contado y
no aparezca después como sorpresa.

## Tanda D · Campo

| # | Dónde | Qué mostrar |
|---|---|---|
| D1 | `/campo`, bloque "Empezás con lo que tenés" | El tablero de campo: nivel de un par de aguadas con sus días restantes, y un aviso. |

Esta tiene dos frenos antes de la captura, y los dos son reales:

- **No hay slot.** `src/content/campo.ts` tiene el bloque `foto` del molino y nada más. Hay
  que construir dónde entra antes de que la imagen sirva de algo.
- **Sin datos reales de ningún campo, el piloto incluido** (plan §1, restricción 2). O sea
  que hace falta un campo de demostración cargado, sin nombre real.

**16:9, 1600px de ancho**, para que acompañe al marco del molino que ya está en 16:9.

---

## Lo que no son capturas

Van aparte porque pediste capturas, pero son los otros huecos de imagen del sitio y vale
tenerlos juntos.

| Qué | Dónde | Medida | Estado |
|---|---|---|---|
| 7 fotos de rubro | Cards de `/soluciones` | 16:10 | Faltan. Una por rubro. |
| 3 fotos de perfil de Campo | `/campo`, bloque de perfiles | — | Faltan: lote sembrado, hacienda en potrero, corrales de feedlot. Hoy se dibuja `[Foto · …]`. |
| Imagen de compartido | `__root.tsx:130`, para WhatsApp y LinkedIn | 1200×630 | Falta. **No conviene que sea una captura**: a ese tamaño y recortada por cada red, un tablero no se lee. Marca sobre fondo teal con una línea de texto. |
| Fotos del plantel | `/nosotros` | — | **Decidido que no van.** No es un pendiente. |

---

## Si hay que priorizar

**B1 primero** —ya la tenés y desbloquea el encabezado de la home a dos columnas, que es la
primera pantalla del sitio—, después **A1 a A5**, que son cinco páginas que hoy describen un
módulo sin mostrarlo nunca. Lo demás puede esperar.

Las siete fotos de rubro son el hueco más grande que queda después, pero son fotos de
stock o de planta y no dependen de la aplicación, así que corren por otro carril.
