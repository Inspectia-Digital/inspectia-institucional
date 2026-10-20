# Inventario de imágenes y la regla de medida de texto

**Fecha:** 19/10/2026 · **Medido sobre:** el sitio corriendo en local, 13 rutas a 1440px de ancho.
Insumo para el design system de la web institucional, que se arma aparte.

---

## Lo primero: los dos temas son el mismo tema

El sitio tiene **82 bloques de texto que cortan antes del 62 % del ancho útil y no tienen nada a la
derecha**. Y tiene **cero capturas de producto, cero fotos y cero diagramas**: las 24 imágenes que
hay son 17 logos, un render isométrico y la marca.

La mitad derecha vacía y las imágenes que faltan son la misma superficie. Casi todos los lugares
donde hoy el texto deja un hueco son lugares donde una imagen tendría que estar.

---

## Parte 1 · La regla de medida

### Qué se midió

Un bloque cuenta como infractor cuando ocupa menos del 62 % del ancho de su contenedor **y** no hay
ningún elemento a su derecha en la misma banda vertical. Una tarjeta dentro de una grilla de tres no
cuenta: tiene hermanas al lado y el ancho está ocupado.

| Ruta | Casos | Peor caso | Píxeles vacíos |
|---|---|---|---|
| `/` | 13 | 32 % | 8.138 |
| `/plataforma/produccion` | 9 | 38 % | 5.425 |
| `/plataforma/calidad` | 8 | 40 % | 4.680 |
| `/plataforma/stock` | 8 | 40 % | 4.680 |
| `/plataforma` | 7 | 32 % | 4.461 |
| `/ia` | 7 | 23 % | 4.604 |
| `/nosotros` | 7 | 32 % | 4.557 |
| `/precios` | 5 | 32 % | 3.341 |
| `/kit-4-0` | 5 | 32 % | 3.301 |
| `/roi` | 5 | 38 % | 3.630 |
| `/partners` | 5 | 32 % | 3.586 |
| `/contacto` | 2 | 40 % | 1.320 |
| `/soluciones/manufactura` | 1 | 40 % | 720 |
| **Total** | **82** | **23 %** | — |

### Por qué pasa

`--lead-max: 60ch` contra `--content-max: 1200px`. Sesenta caracteres al cuerpo del lead miden
~600px: exactamente la mitad del contenedor. **No es un bug de nadie, es la combinación de dos
decisiones correctas por separado** — una medida de lectura corta (bien) y un contenedor ancho
(bien) — que juntas dejan 600px de nada.

### La regla que propongo

> **Un bloque de texto no corta a la mitad de su contenedor.** O el contenedor se angosta con él, o
> la mitad libre lleva algo. Si corta igual, el motivo va escrito en el código.

Tres maneras de cumplirla, en orden de preferencia:

1. **Poner algo a la derecha.** Es la mejor cuando el bloque abre una sección: una captura, un
   diagrama, un dato. Es la opción que se cruza con la Parte 2.
2. **Angostar el contenedor.** Para secciones de puro texto (legales, partes de `/nosotros`), un
   contenedor de lectura de ~820px en vez de 1200 hace que el texto llene su caja y el aire quede
   repartido a los dos lados en vez de todo junto a la derecha.
3. **Subir la medida.** De 60ch a 72–75ch el lead pasa de ~600 a ~740px. Alivia pero no resuelve:
   sigue habiendo 460px vacíos, y 75ch es el techo de lo cómodo para leer.

**Lo que NO haría:** estirar el texto a todo el ancho. A 1200px una línea de cuerpo tiene ~120
caracteres y el ojo pierde el renglón al volver. La medida corta es correcta; lo que está mal es la
caja que la rodea.

> Si "sin justificación" quería decir texto justificado a ambos márgenes, esto cambia: en pantalla
> el justificado abre ríos blancos entre palabras porque el navegador no silabea bien en castellano.
> Lo diría antes de aplicarlo.

---

## Parte 2 · Inventario de imágenes

### Qué hay hoy

| Tipo | Archivos | Peso |
|---|---|---|
| Logos de partners y clientes | 17 | ~300 kB |
| Render isométrico de planta (2 tamaños) | 2 | 129 kB |
| Marca (lockup, isotipo) | 4 | ~40 kB |
| Imagen de compartido (OG) | 1 | ~60 kB |
| **Capturas de producto** | **0** | — |
| **Fotografía propia** | **0** | — |
| **Diagramas** | **0** | — |

Todo el sitio se sostiene en un render y una fila de logos.

### A · Capturas de producto — la familia que más falta

Es la objeción central de un producto que se contrata sin vendedor: *qué me queda en la pantalla
después de comprar*. Hoy no se responde en ninguna página.

| # | Dónde | Qué capturar | Formato | Cuántas |
|---|---|---|---|---|
| A1 | Hero de la home | El tablero principal con datos de demo | 4:3 o 3:2, ~1100px | 1 |
| A2 | Páginas de módulo, "Qué hace" | Zigzag texto/captura — el TODO ya está escrito en `$modulo.tsx` | 16:10, ~900px | 3 por módulo |
| A3 | `/plataforma` | El menú con los módulos contratados, para mostrar que es una sola app | 16:10 | 1 |
| A4 | `/ia/$aplicacion` | El resultado de cada aplicación (detección marcada sobre la imagen, conteo) | 4:3 | 1 × 5 páginas |
| A5 | `/plataforma/integraciones` | La pantalla de origen de datos con el mapeo de columnas | 16:10 | 1 |

**Cuántas de verdad:** A2 multiplica por módulo, pero **sólo cinco módulos existen en la app**
—Producción, Calidad, Stock, Tareas, Trazabilidad—. Mantenimiento y Energía no tienen ni carpeta en
el front ni routers en el backend, así que no hay nada que capturar. Total realista: **1 + 15 + 1 +
5 + 1 = 23 capturas.**

> **Datos de demostración, nunca de un cliente.** Una captura del tablero de un tenant real publica
> su producción, sus paradas y sus defectos. Si el único tablero con datos presentables es de una
> cuenta real, hay que cambiar nombres y números antes de capturar, no después.

**Costo: cero pesos, sólo tiempo.** Es la familia de mayor impacto por peso y la única que podés
hacer entero vos esta semana.

### B · Fotografía propia

| # | Dónde | Qué | Formato | Cuántas |
|---|---|---|---|---|
| B1 | Cards de industria en `/soluciones` | Foto de planta del rubro — el TODO cita §11.5 | 16:10 | 7 publicadas |
| B2 | Hero de cada página de industria | Una foto ancha del rubro | 21:9 | 7 |
| B3 | `/nosotros` | Equipo — hoy sin fotos por decisión tomada | 1:1 | — |
| B4 | Casos de cliente | Foto de la planta del caso | 16:9 | 1 por caso |

**Es la familia más cara y la menos urgente.** Requiere ir a una planta con permiso, o comprar
stock —y el stock de "fábrica genérica" se nota y envejece mal—. Mientras tanto las cards sin foto
funcionan: ya están resueltas así y no se ven rotas.

### C · Diagramas e ilustraciones

| # | Dónde | Qué explica | Quién lo hace |
|---|---|---|---|
| C1 | Home y páginas de módulo | **Cómo llega el dato**: PLC / sensor → plataforma → tablero. Hoy es sólo texto, y es justo la objeción del hero | SVG, lo puedo hacer yo |
| C2 | `/plataforma/integraciones` | Arquitectura: qué entra por API, qué por archivo, qué por el agente | SVG |
| C3 | `/plataforma` | Los módulos como piezas combinables, no como lista | SVG |
| C4 | `/kit-4-0` | El circuito del trámite y dónde entra InspectIA | SVG |
| C5 | Páginas de módulo | El plano isométrico recortado a la zona del módulo, con su punto | Ya existe el render; es recorte |

**Costo cero y los puedo producir yo**, en SVG, con los tokens del sistema — así escalan sin peso y
cambian de color solos en claro y oscuro. C1 es el de mayor valor: responde en una imagen lo que la
línea del hero dice en texto.

### D · Marca y compartido

| # | Dónde | Qué | Estado |
|---|---|---|---|
| D1 | Imagen de compartido (OG) | 1200×630 propia — **el TODO está en `__root.tsx`** | Hoy es el render recortado + lockup |
| D2 | OG por tipo de página | Una variante para módulo, IA y kit, con el nombre | A generar por script |
| D3 | Íconos de módulo | Ya existen como SVG | Hecho |

D2 lo genera el script con `sharp`, como ya hace el OG actual: es componer el lockup y un texto
sobre un fondo. **Cero trabajo manual por página.**

---

## Lo que yo haría, en orden

| Orden | Qué | Costo | Quién |
|---|---|---|---|
| 1 | **A1** — la captura del hero | 20 min | vos |
| 2 | **C1** — diagrama de cómo llega el dato | — | yo |
| 3 | **A2** — 15 capturas de los cinco módulos reales | una tarde | vos |
| 4 | **D2** — OG por tipo de página, por script | — | yo |
| 5 | **C2–C4** — los diagramas restantes | — | yo |
| 6 | **A4, A3, A5** — capturas de IA, plataforma e integraciones | — | vos |
| 7 | **B1–B2** — fotografía de planta | $ y permisos | diferido |

Todo lo que no dice "$" es gratis. Lo único que cuesta plata es la fotografía, que es lo último.

### Dos cosas técnicas que valen para todas

- **Toda imagen entra por `npm run images`.** El script reencoda a WebP y genera las variantes del
  `srcset`. Un PNG de 2 MB servido directo anula cualquier trabajo de performance.
- **El hueco de 23 capturas pesa.** A ~60 kB cada una son ~1,4 MB repartidos en 13 páginas, lo que
  está bien **si cada página carga sólo las suyas** y las de abajo del pliegue van con `loading="lazy"`.
  La única que va con `eager` es la del hero.

---

## Preguntas abiertas

1. **¿Mantenimiento y Energía qué son hoy?** Vendidos sin construir, o en construcción. De eso
   depende si llevan capturas, diagramas o nada.
2. **¿"Sin justificación" era sin motivo o texto justificado?** Lo leí como sin motivo.
3. **¿Hay una cuenta de demo con datos presentables**, o hay que armarla antes de capturar?
