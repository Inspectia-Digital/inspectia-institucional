# Guía de diseño — páginas de funcionalidad

**Fecha:** 12/11/2026 · **Para:** sesión de Claude Code del repo `inspectia-institucional` · **De:** dirección
**Vale para:** las cinco funcionalidades publicadas en `2348f86` y todas las que vengan. La plantilla es una sola: `src/routes/plataforma/$modulo_.$funcionalidad.tsx`.
**Referencia visual:** `../2026-11-11_REFERENCIA_control-de-acceso-facial.html`. Abrirla a 1440 px y a 390 px antes de empezar y compararla con la página publicada al terminar.

---

## 1. Qué está mal hoy

La página publicada es una columna de texto de 680 px con eyebrow + título + lista, repetida ocho veces. El contenido es el correcto; la forma no deja ver el producto ni la estructura.

| Sección | Diseño | Publicado hoy |
|---|---|---|
| Hero | Fondo blanco, dos columnas: texto a la izquierda, panel del producto a la derecha | Banda teal oscuro a todo el ancho, una columna, sin producto |
| Qué incluye | Cuatro columnas con ícono | Dos columnas de texto |
| ¿Ya tenés algo instalado? | Franja teal claro con enlace de acción | Párrafo suelto entre líneas |
| Cómo funciona | Pasos en columnas, número arriba, línea teal de 2 px | Lista vertical angosta |
| Qué ves | Lista corta + panel o captura del producto | No existe |
| Del ingreso a la línea | Banda teal oscuro con tres bloques enlazados | Dos enlaces de texto |
| Para quién | Chips de industrias | No existe |
| Condiciones | Tres bloques en grilla con etiqueta | Dos líneas de texto; **falta la promoción de tres meses** |
| Cierre | Panel de cierre con los dos botones | Texto centrado sobre blanco |

## 2. Cómo se resuelve con los lineamientos del sitio

El diseño se hizo con el design system de la aplicación; el sitio tiene reglas propias (`docs/design/web-visual-rules.md`). Se mantiene **la estructura del diseño** y se aplica **el tratamiento de la web**:

| Regla de la web | Cómo se aplica acá |
|---|---|
| Fondo blanco | Todas las secciones sobre blanco, separadas por espacio |
| Una sola superficie teal profundo | Es la banda «Del ingreso a la línea». El hero **no** es oscuro en esta plantilla |
| Sin cards ni sombras | Los bloques en grilla llevan línea de 1 px arriba, sin caja ni sombra. Los paneles del producto siguen la regla de capturas: fondo `--grey-050`, borde `--grey-200`, radio 14, sin sombra |
| Colores de estado sólo adentro del producto | Las pastillas verde, ámbar y azul viven sólo dentro de los paneles |
| Nada en mayúscula | Las etiquetas de los paneles van en tipo oración |

**Excepción decidida:** las páginas de funcionalidad usan un hero propio, claro y a dos columnas (`FeatureHero`), y no `PageHero`. Es lo que hace que la página muestre el producto en la primera pantalla. `PageHero` no se toca: módulos, industrias y el resto siguen igual.

## 3. Estructura y especificación, sección por sección

Contenedor `--content-max` (1120 px), padding lateral 32 / 20 px, entre secciones `--section-pad` (112 / 72 / 56). Rangos de grilla: ≥ 1000 px, 640–1000 px, < 640 px; toda grilla colapsa a una columna debajo de 640 y todo ítem lleva `min-width: 0`. Grillas en clases, nunca en `style`.

### 3.1 Hero — `FeatureHero` (nuevo)

- **Fondo** blanco. Dos columnas ≥ 1000 px (texto `1fr`, panel `1fr`, `gap` 56 px, `align-items: center`); en el rango medio y en celular, el panel baja debajo del texto.
- **Texto:** eyebrow (14 px / 600 / `--text-brand`) · H1 con el tamaño de título principal del sitio, tres líneas como máximo, color `--teal-900` · lead (`--lead-max`, `--text-secondary`) · `CtaPair` en su variante sobre fondo claro · una línea de 14 px `--text-secondary` debajo de los botones, si el contenido trae `heroNote`.
- **Panel del producto** (`ProductPanel`, ver 3.11) con los datos de ejemplo de la sección 4. Rótulo «Datos de ejemplo» visible.
- **Miga de pan** debajo del hero, como hoy.

### 3.2 El problema

- Título de sección + grilla de **dos columnas** ≥ 640 px. Cada ítem: línea de 1 px `--grey-200` arriba, 20 px de aire, texto de 16 px `--text-primary`.
- Reemplaza la lista de párrafos a tamaño lead, que hoy ocupa una pantalla entera.

### 3.3 Qué incluye (opcional, `includesBlock`)

- Grilla de **cuatro columnas** ≥ 1000 px, dos en el rango medio, una en celular. Gap 24 px.
- Cada ítem: línea arriba, ícono Lucide de 24 px trazo 1.5 en `--text-brand`, título de bloque (19 px / 600), cuerpo de 16 px `--text-secondary`.
- Íconos: equipo `scan-face`, instalación `wrench`, configuración `users`, sistema `layout-dashboard`. En futuras funcionalidades, uno por ítem del léxico de íconos del sitio.

### 3.4 Franja (opcional, `band`)

- Bloque a lo ancho del contenedor, fondo `--surface-brand-subtle` (`--teal-050`), borde 1 px `--teal-100`, radio 14, padding 28 / 32 px.
- Dos columnas ≥ 1000 px: título de bloque + cuerpo a la izquierda; a la derecha un **enlace con flecha** («Contanos qué tenés →») a `/contacto`. En celular, el enlace va debajo.
- No es una card: es la única superficie tintada de la página, y la regla de un botón principal por sección se cumple porque lleva enlace, no botón.

### 3.5 Cómo funciona

- Grilla de **tantas columnas como pasos** (3 o 4) ≥ 1000 px; dos en el rango medio; una en celular.
- Cada paso: línea de **2 px `--teal-650`** arriba, número `01` en `.metric` 14 px `--text-brand`, título de bloque, cuerpo de 16 px.
- `doesNote`, si existe, va debajo de la grilla, a 680 px, con la línea izquierda que tiene hoy.

### 3.6 Qué ves en InspectIA (nuevo, `see`)

- Dos columnas ≥ 1000 px: a la izquierda título de sección + lista de 3 a 5 ítems con «→» en `--text-brand`; a la derecha la **captura real** si existe, o un `ProductPanel` con la tabla de la sección 4.
- Capturas disponibles hoy en `public/img/app/`: `inspectia-tablero-oee` (monitoreo automático de OEE), `inspectia-software-oee-produccion` (registro de paradas), `inspectia-trazabilidad-lotes` (trazabilidad alimentaria), `inspectia-control-de-stock-inventario` (WMS para fábricas), `inspectia-asignacion-tareas-turno` (control de asistencia). Enmarcadas según la regla de imagen.

### 3.7 Cómo se toma el dato (`capture`)

- Pasa de párrafo a **tres bloques en fila** (manual · automático · IA), con línea arriba y una etiqueta de 14 px / 600 `--text-brand` en cada uno. Si una funcionalidad no tiene nivel IA, van dos.
- Requiere que `capture` deje de ser un string: ver sección 5.

### 3.8 Del ingreso a la línea — la banda teal (`related`)

- **La única superficie `--surface-brand-deep` de la página.** Padding de sección completo.
- Eyebrow `--accent-on-brand-subtle`, título de sección blanco, lead opcional al 78 %.
- Grilla de **tres columnas** ≥ 1000 px. Cada ítem es un **enlace completo**: fondo `--surface-on-brand`, borde 1 px `--border-on-brand`, radio 12, padding 28 px; título de bloque blanco + cuerpo al 78 %. Hover: el borde pasa a `--cyan-400`, sin elevar.
- `related` necesita título y cuerpo por ítem (sección 5).

### 3.9 Para quién (nuevo, `industries`)

- Título de bloque + fila de **chips** pill: borde 1 px `--grey-300`, 14 px, padding 8 / 16. Cada chip enlaza a `/soluciones/<industria>`.
- Línea de 15 px `--text-secondary` debajo, si el contenido trae `industriesNote`.

### 3.10 Condiciones (`conditions`)

- Grilla de **tres columnas** ≥ 1000 px. Cada ítem: línea arriba, etiqueta de 14 px / 600 `--text-brand` («Plan gratuito», «Kit 4.0», «Lanzamiento»), título de bloque, cuerpo de 16 px, enlace con flecha si tiene destino.
- **Control de asistencia tiene tres condiciones**: la de tres meses sin cargo falta en lo publicado y está confirmada.

### 3.11 `ProductPanel` (nuevo, reutilizable)

- Marco de captura: fondo `--grey-050`, borde 1 px `--grey-200`, radio 14, 10 px de aire. Adentro, una superficie blanca con radio 10.
- **Barra superior** `--teal-800` de 44 px: título del panel a la izquierda (14 px / 600 blanco), «Datos de ejemplo» a la derecha (12 px `--teal-200`).
- **Bloques posibles**, en este orden: fila de 2 a 4 indicadores (etiqueta 11 px / 600 `--text-secondary`, valor `.metric` 26 px) · lista de filas (nombre 14 px / 500, detalle 12 px secundario, pastilla de estado a la derecha) · tabla (encabezado sobre `--grey-100`, valores en `.metric`, alineados a la derecha) · barras horizontales (relleno `--teal-650` sobre `--grey-150`, valor en `.metric`).
- Pastillas: verde `--green-100` / `--green-700`, ámbar `--amber-100` / `#8a5608`, azul `--blue-100` / `--blue-600`, gris `--grey-150` / `--grey-700`. Radio pill, 12 px / 600.
- Se construye con componentes, no como imagen: escala, se traduce y no pesa.
- El panel no tiene sombra: es la diferencia con la referencia HTML, que la tiene porque se hizo con las reglas de la aplicación.

### 3.12 Preguntas, seguir leyendo y cierre

- **Preguntas:** como hoy.
- **Seguir leyendo:** dos bloques en fila (guía · módulo), con línea arriba, título de bloque y enlace con flecha. No una lista de enlaces.
- **Cierre:** panel a lo ancho del contenedor, fondo `--surface-brand-subtle`, radio 14, padding 56 / 48 px; título de sección `--teal-900`, lead y `CtaPair` a la derecha ≥ 1000 px. Las funcionalidades sin `cta` propio usan el mismo panel con el texto del sitio. No usa teal oscuro porque esa superficie ya la tiene la banda 3.8.

### 3.13 Orden final

Hero → miga → El problema → Qué incluye* → Franja* → Cómo funciona → Qué ves → Cómo se toma el dato* → Del ingreso a la línea (banda) → Para quién* → Condiciones* → Preguntas → Seguir leyendo → Cierre. (*opcionales)

## 4. Datos de los paneles por funcionalidad

Todos rotulados «Datos de ejemplo». Las personas, clientes y proveedores son inventados y genéricos.

### Monitoreo automático de OEE
- **Hero — «Línea 2 · turno mañana»:** indicadores Disponibilidad 86,7 % · Rendimiento 89,7 % · Calidad 95,0 % · OEE 73,9 %. Filas: Línea 1 «81,2 %» pastilla verde «En marcha» · Línea 2 «73,9 %» verde «En marcha» · Línea 3 «—» ámbar «Parada · 12 min». Pie de 12 px: «Dato tomado del PLC».
- **Qué ves:** captura `inspectia-tablero-oee`.

### Registro de paradas de máquina
- **Hero — «Paradas por motivo · octubre · Línea 2»:** barras Falta de envase 6 h 40 min · Atasco en llenadora 4 h 05 min · Cambio de formato 3 h 20 min · Ajuste de peso 1 h 15 min · Otros 35 min.
- **Qué ves:** captura `inspectia-software-oee-produccion`; si no muestra paradas, panel «Paradas del turno» con filas 06:42 Atasco en llenadora 7 min · 08:15 Cambio de formato 24 min · 09:03 «Sin motivo» pastilla ámbar 3 min.

### Trazabilidad alimentaria
- **Hero — «Lote PT-2611-014 · Galletitas 200 g»:** pastilla verde «Liberado». Tres grupos de filas: Materia prima (Harina 000 · lote H-1029 · Proveedor A; Azúcar · lote A-552 · Proveedor B) · Producción (Línea 1 · turno mañana · 11/11/2026; Control de calidad · Aprobado) · Despachos (Cliente A · 120 cajas; Cliente B · 80 cajas; Cliente C · 45 cajas).
- **Qué ves:** captura `inspectia-trazabilidad-lotes`.

### WMS para fábricas
- **Hero — «Movimientos de hoy · Depósito planta»:** filas Recepción · remito 4521 → A-03-2 · 08:10 · OP 1187 consumo ← A-03-2 · 09:30 · Terminado OP 1187 → B-01-1 · 13:45 · Pedido 3321 ← B-01-1 · 15:20. Indicador arriba: Diferencias de conteo hoy 1 · 38 productos contados.
- **Qué ves:** captura `inspectia-control-de-stock-inventario`.

### Control de asistencia
- **Hero:** el panel «Hoy · turno mañana» de la referencia HTML (presentes 38 / 42, tarde 3, entran después 4 y las cuatro filas).
- **Qué ves:** la tabla «Asistencia · octubre» de la referencia, o la captura `inspectia-asignacion-tareas-turno` si muestra asistencia.

## 5. Cambios en `features.ts`

| Campo | Cambio |
|---|---|
| `heroPanel` | Nuevo. Estructura de datos del `ProductPanel` del hero (título, indicadores, filas, barras, pie) |
| `see` | Nuevo. `{ title, items: string[], image?: assetKey, panel?: ProductPanelData }` |
| `capture` | De `string` a `{ level: "Manual" \| "Automático" \| "IA"; body: string }[]` |
| `related` | De `{ label, to }` a `{ title, body, to }`; `relatedTitle` y un `relatedLead` opcional |
| `industries` | Nuevo. Claves de `solutions.ts`, más `industriesNote` opcional |
| `conditions` | De `{ label, to }` a `{ tag, title, body, to? }` |
| `heroNote` | Nuevo, opcional. La línea bajo los botones del hero |

El copy de cada campo sale de los archivos `1x_` de esta carpeta. Lo que falte para los campos nuevos (cuerpos de `related`, `see.items`), tomarlo de esos archivos; si no está, dejarlo vacío y avisarlo, no inventarlo.

## 6. Cómo se sabe que salió bien

- Las cinco páginas siguen el orden de 3.13 y, a 1440 px, se parecen a la referencia HTML sección por sección, salvo las diferencias de la sección 2.
- En la primera pantalla de cada página se ve el panel del producto.
- Hay una sola superficie teal oscuro por página.
- Ninguna sombra en la página; las pastillas de color sólo dentro de los paneles.
- A 390 px: todo en una columna, el panel del hero debajo de los botones, sin scroll horizontal, la tabla con scroll propio.
- Control de asistencia muestra las tres condiciones.
- `npm run typecheck && npm run lint && npm run build` pasan.
- Captura de pantalla de cada página a 1440 y a 390 en la respuesta, para revisarlas sin abrir el sitio.

Al terminar, dejar en la respuesta qué componentes se crearon, qué cambió en `features.ts` y cualquier desvío de esta guía.
