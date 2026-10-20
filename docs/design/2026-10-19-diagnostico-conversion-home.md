# Diagnóstico de conversión — home

**Fecha:** 19/10/2026 · **Medido sobre:** producción (`inspectia.ai`), commit `5213ffb`, revisión `inspectia-institucional-00039-kdw`.
**Método:** medición directa del DOM publicado a 375px y 1024px. Lo que acá se afirma está medido, no inferido.

---

## La restricción que ordena el diagnóstico

**No hay tráfico todavía.** No hubo lanzamiento, no hay canal activo, y las cuentas que existen
llegaron por relación y sin gasto de adquisición. Eso tiene dos consecuencias para este documento:

1. **No hay embudo que analizar.** No se puede decir "la home convierte al 1,2 % y el cuello está
   en el paso 2". Esto es un diagnóstico heurístico sobre el recorrido, no un análisis de datos.
   Cualquiera que prometa lo segundo está inventando.
2. **El criterio de priorización no es "qué sube la conversión", es "qué nos deja listos para
   cuando llegue el primer tráfico pago o de outbound".** Y todo tiene que ser ejecutable por una
   persona, sin presupuesto.

A quién le habla la página, entonces: **a un gerente de planta que no sabe que esta categoría
existe.** No está comparando InspectIA contra Efficast; no sabe que se puede medir una línea sin
comprar hardware. La mayor parte del trabajo de la home es crear conciencia del problema, no ganar
una comparación.

---

## Lo medido

| Dato | Desktop (1024px) | Mobile (375px) |
|---|---|---|
| Alto total | 11.127px | 15.017px |
| Pantallas de scroll | 14,5 | 18,5 |
| Secciones (`<section>` con título) | 13 | 13 |
| Superficie de conversión | navbar sticky + 3 pares de CTA | navbar sticky + barra fija inferior + 3 pares |

Profundidad de los hitos, en % del alto de la página (mobile):

| % | Bloque |
|---|---|
| 0 % | Hero + CTA |
| 5 % | "Confían en nosotros" (marquee de 17 logos) |
| 7 % | "Una sola plataforma para toda tu operación" — **2.178px, el bloque más largo** |
| 21 % | **"Lo que no se mide, se paga igual"** ← el problema |
| 28 % | "De la planilla a la IA" — 1.988px |
| **31 %** | **"Conectamos el PLC o el sensor que ya tenés"** ← la diferenciación |
| 42 % | "¿Desde dónde lo mirás?" |
| 46 % | "Sumale IA" |
| 48 % | "Y hasta un 50 % con Kit 4.0" |
| 51 % | "Todo lo que el proyecto necesita, en un solo proveedor" — 1.601px |
| 62 % | Calculadora de ROI — 1.329px |
| 71 % | "Vos conocés la planta" |
| **74 %** | **El precio publicado** |
| 78 % | FAQ |
| 84 % | CTA de cierre |

**Lo que no está roto** (lo digo porque es fácil asumir que sí): la navbar es sticky y lleva
*Empezar gratis* permanentemente; en mobile hay además una barra fija inferior con los dos CTA. La
superficie de conversión está cubierta a cualquier altura de scroll. No hay desierto de CTA.

---

## Los seis hallazgos, por impacto

### 1. La narrativa está invertida para quien no conoce la categoría

El orden actual es: **prueba social (5 %) → solución (7 %) → problema (21 %)**.

Al visitante se le muestra una grilla de siete módulos y un plano de planta **antes** de haberle
dado un motivo para querer nada de eso. 2.178px de catálogo —el bloque más largo de la página— caen
sobre alguien que todavía no sabe que tiene un problema con nombre.

Y lo irónico es que **el bloque del problema es el mejor copy de la página**:

> *El defecto que se descubre tarde* — "La pieza mala sigue en el proceso hasta que alguien la ve, y
> a veces la ve el cliente."
> *La parada que nadie clasifica* — "La línea se frena varias veces por turno y el motivo queda en
> la memoria del supervisor."
> *El inventario que no cuadra* — "El sistema dice que está y en el rack no está."

Eso es exactamente el trabajo de conciencia de problema que la etapa necesita, escrito en el idioma
de la planta. Está enterrado al 21 %, detrás del catálogo.

**Recomendación:** subir "Lo que no se mide, se paga igual" a inmediatamente después del hero, y
bajar "Una sola plataforma" detrás. El lector se reconoce primero, y recién entonces el catálogo
tiene sentido: deja de ser una lista de features y pasa a ser la respuesta a lo que acaba de leer.
Es un reordenamiento de secciones en `src/routes/index.tsx` — no hay copy nuevo que escribir.

### 2. La diferenciación de la etapa no está en el hero

El hero dice: **"Medí y controlá toda la operación de tu planta."**

Eso lo puede firmar cualquier MES del mercado, Efficast incluido. Es una capacidad, no una posición.

La frase que **sí** nos distingue está al 31 % de la página:

> "Conectamos el PLC o el sensor que ya tenés, o uno nuevo y barato."

Ese es el eje del mensaje de esta etapa — *no me compres hardware, usá el PLC que tenés* — y es
justamente la objeción que frena a una planta que nunca midió: cree que esto arranca con una compra
de capital. Está a 4.621px de donde se decide si seguir leyendo.

**Recomendación:** llevar el hardware-agnóstico al hero, como bajada o como tercera línea. Pesa más
que la lista de siete módulos que hoy ocupa ese lugar. Es una línea de copy en `src/content/`.

### 3. "Confían en nosotros" mezcla cinco cosas distintas y diluye las tres que importan

17 logos en un marquee de 68 segundos, en escala de grises al 70 %, al 5 % de la página. Son:

- **Clientes de planta:** Springwall, Las Marías, Molens · Green Mills
- **Fabricantes de hardware:** Motorola, Balluff
- **Consultoras:** Miebach, Auren, Antea Group, Tecnología BI, Teksis, BPS, Cygnus, ARNx
- **Programas:** Google for Startups, Emprelatam
- **Partners / matriz:** Quantit Data, Sitecno

Bajo un título que dice "Confían en nosotros", eso afirma que Motorola y Google confían en
InspectIA. Un gerente de planta hace una de dos cosas: no lo cree, o no le importa. En ambos casos
**los tres clientes reales —que son la prueba que sí mueve— quedan diluidos entre catorce logos que
no son clientes.**

El propio skill de diseño de este repo lo dice: *"una fila de logos sin contexto vale poco; el mismo
logo con una línea de qué se logró vale mucho."*

**Recomendación:** partirlo. Tres logos de planta bajo "Clientes", cada uno con una línea de qué
mide ("Las Marías · N líneas medidas desde …"). El resto, si va, va en `/nosotros` bajo "Partners y
ecosistema", que es lo que efectivamente son. Esto necesita un dato tuyo por cliente, no diseño.

### 4. El precio publicado, que es ventaja competitiva, está al 74 %

Efficast no publica precios. Nosotros sí, módulo por módulo, y eso es a la vez un diferencial de
posicionamiento y un filtro de leads que ahorra reuniones. Hoy aparece pasado el 74 % de un
documento de 15.000px.

**Recomendación:** una línea de precio en el hero o en el bloque inmediatamente siguiente —"desde
USD X por módulo, publicado"— enlazando a la sección completa. No mover la sección; adelantar el
dato.

### 5. La primera pantalla no muestra el producto

Medido a 375px: el fold (812px) contiene eyebrow, h1, bajada, lista de módulos, dos botones y la
banda de Kit 4.0. **Todo texto sobre el verde de marca. Ni una imagen de la aplicación.**

Para un producto que se contrata solo, sin vendedor, "¿qué me queda en la pantalla después de
comprar?" es la objeción central, y la home no la responde en ningún lado. `APP_SHOT` sigue en
`null` y el hero está esperándola: el layout de dos columnas ya está escrito y se activa solo
cuando cargues la captura.

**Recomendación:** es lo más barato de alto impacto que hay pendiente, y depende de vos, no de
código. Una captura del tablero real.

### 6. Los tabs de audiencia están por debajo del mínimo táctil

Los cuatro controles de "¿Desde dónde lo mirás?" (*Producción y calidad*, *Logística e inventario*,
*Dueño o gerencia*, *Consultor*) miden **36px de alto**. El mínimo recomendado es 44px. Son
controles reales, no enlaces inline, y el lector los toca en un celular, probablemente en planta.

**Recomendación:** subir a 44px. Es un cambio de clase.

---

## Sobre la longitud

Pediste una web "más limpia, menos cargada". Bajamos el padding de sección y sacamos dos bloques de
cifras, y aun así: **13 secciones, 14,5 pantallas en desktop y 18,5 en mobile.**

El problema que queda ya no es el aire entre secciones —eso se corrigió— sino que **hay tres bloques
consecutivos que dicen la misma cosa**: "Sumale IA" (46 %), "Kit 4.0" (48 %) y "Todo lo que el
proyecto necesita, en un solo proveedor" (51 %). Los tres son variantes de *además hacemos más
cosas*. Juntos ocupan 2.312px y, puestos en fila, diluyen en vez de sumar: el lector que venía
siguiendo un argumento sobre medir su línea se encuentra con tres ofertas laterales seguidas.

**Recomendación:** fusionar los tres en un solo bloque de "el proyecto completo", con las tres
puertas como columnas. Ahorro estimado: ~1.200px, una sección menos (13 → 12) y dos encabezados
menos (13 → 11). Boceto en `2026-10-19-boceto-home.html`.

---

## Lo que yo haría primero

Ordenado por (impacto × facilidad), ejecutable por una persona y sin plata:

| # | Qué | Dónde | Depende de |
|---|---|---|---|
| 1 | Hardware-agnóstico al hero | `src/content/` | nada |
| 2 | Subir el bloque del problema arriba del catálogo | `src/routes/index.tsx` | nada |
| 3 | Partir la barra de logos: 3 clientes con contexto | `src/content/` | **un dato tuyo por cliente** |
| 4 | Fusionar IA + Kit 4.0 + proveedor único | `src/components/home/` | nada |
| 5 | Dato de precio adelantado al hero | `src/content/` | nada |
| 6 | Tabs a 44px | `AudienceTabs.tsx` | nada |
| 7 | Captura de la app | `assets.ts` | **la captura** |

Del 1 al 6 son míos y los puedo hacer en una pasada. El 3 y el 7 necesitan algo que solo vos tenés.

---

## Implementado el 19/10/2026 — y lo que midió de verdad

Se hicieron 1, 2, 4, 5 y 6. **El 3 (partir la barra de logos) quedó descartado por decisión de
Estanislao**: los 17 logos siguen como están.

### El render en el hero: probado y descartado

Se probó llevar el render isométrico al encabezado —recortado sobre la nave, apaisado en mobile y
vertical en la columna de desktop— y se sacó en la misma revisión, por dos motivos:

1. **El recorte no puede llevar los puntos de los módulos**, que es lo único que hace que ese dibujo
   informe algo. Un recorte que los incluya a los ocho es casi la imagen entera: Energía está al
   87 % del ancho, afuera de la nave, y Mantenimiento al 16 % del alto. Sin puntos queda una
   ilustración linda y muda.
2. **El hero quedaba cargadísimo**: siete bloques de texto más una imagen en la primera pantalla.

El plano con sus ocho puntos sigue donde siempre, en el bloque de la plataforma. **En su lugar va la
captura de la aplicación** (`APP_SHOT`), que responde la objeción que el render no respondía —qué te
queda en la pantalla después de comprar— y que es la más cara en un producto que se contrata sin
vendedor. El hueco está listo y documentado en `src/content/assets.ts`, con la etapa
`npm run images -- app` ya escrita; falta el archivo.

Hasta que llegue, el hero va a una sola columna a ancho completo, que es mejor que reservar media
pantalla para un vacío.

### Lo que midió

| Medido a 375px | Antes | **Ahora** |
|---|---|---|
| Secciones | 13 | **12** |
| Encabezados H2 | 13 | **11** |
| Alto total | 15.017px | **14.146px** |
| Pantallas de scroll | 18,5 | **17,4** |
| Bloques de texto en el hero | 6 | **6** (uno nuevo, uno quitado) |
| Primer CTA | 611px | **539px** |
| Línea de precio | 74 % de la página | **681–750px, dentro del fold** |

La fusión ahorró 1.060px (2.312 → 1.252) y el reordenamiento puso el bloque del problema en
posición 3. El hero creció 181px neto: entraron la línea de las máquinas y la de precio, y salió la
de Kit 4.0 (ver abajo).

**Conviene registrar que una proyección intermedia estaba mal.** Se estimó ~13.100px suponiendo que
el plano se mudaba al hero y le sacaba ~930px a la sección 3. Al quedarse el plano donde estaba, ese
ahorro nunca existió. El saldo real es 871px menos, no 1.900.

### Un recorte de contenido que hay que mirar

**La línea de Kit 4.0 salió del hero.** Era el séptimo bloque de texto de la primera pantalla y el
tercer ofrecimiento distinto (cuenta gratis, demo, descuento). Kit 4.0 quedó con su columna propia
en el bloque del proyecto completo, su entrada en el menú, su página y el pie.

No es una decisión obvia —un 50 % de descuento es un gancho fuerte y estaba ahí antes— así que
queda anotada para revertir en una línea si se decide que pesa más el gancho que el peso visual.

**Dos cosas que aparecieron al implementar y no estaban en el diagnóstico:**

- **Tres secciones blancas seguidas.** Logos, problema y plataforma son las tres `bg-surface`. No lo
  causó el reordenamiento —las tres ya eran blancas— pero sí lo puso a la vista, y es exactamente la
  queja de "espacios en blanco muy grandes": sin cambio de fondo, el ojo lee tres secciones como un
  solo bloque y el padding entre ellas pasa a leerse como hueco. Se corrigió el bloque del problema
  a hundido y, por lo mismo, el de consultores a blanco (estaba entre ROI y precios, las tres
  hundidas). El ritmo quedó alternando sin un solo choque.
- **La barra fija inferior de mobile se come 82px de cada pantalla.** La línea de precio entra en el
  fold de 812px pero queda parcialmente detrás de esa barra, que además duplica los CTA que ya
  están en la navbar sticky. No lo toqué porque es una decisión tuya, pero vale preguntarse si sigue
  haciendo falta.

## Lo que este documento NO puede decirte

- **Si la página convierte.** Sin tráfico no hay tasa. Lo de arriba son hipótesis fundadas en
  heurística y en el contexto de la etapa, no resultados.
- **Cuál de los seis cambios mueve más la aguja.** Se sabría con tráfico y una prueba A/B, y ninguna
  de las dos cosas existe hoy.
- **Si el mensaje es el correcto.** Eso lo valida una conversación de venta, no una auditoría de
  diseño. El primer outbound va a decir más sobre el hero que cualquier revisión.

Lo que sí se puede afirmar: **el día que llegue el primer tráfico, lo que hay hoy va a medir peor de
lo que podría**, porque el visitante se encuentra el catálogo antes que el problema, no ve el
producto, y la frase que nos distingue está a 4.600px del hero.

### Y una cosa que conviene resolver antes de traer tráfico

El evento `ia_diagnostic_request` está definido en el repo pero **el contenedor de GTM no está
importado**, así que hoy no dispara. Traer tráfico sobre una home sin medición es gastar la única
señal de aprendizaje que esta etapa puede comprar. Es gratis y lleva diez minutos.
