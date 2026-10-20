# Handoff del rediseño de la home — análisis antes de implementar

**Fecha:** 20/10/2026 · **Fuente:** `docs/Inspectia home rediseño.zip` (`README.md`, `AJUSTES_DESIGN_SYSTEM.md`, 7 capturas).
**Qué es esto:** lo que habría que hacer, y qué de eso contradice decisiones ya tomadas. No implementé nada.

---

## 1. Las seis contradicciones que necesitan tu decisión

Son decisiones que tomaste vos en los últimos dos días y que el handoff revierte. Ninguna
está mal en sí misma — el boceto es coherente consigo mismo — pero no se pueden aplicar en
silencio.

### 1.1 El teal del hero

**Decidido el 19/10.** Te pregunté cuál de las tres bandas se quedaba con el teal y
elegiste el encabezado: *"el hero se queda con el teal, dale"*. Está implementado y es la
única superficie de marca de cada página.

**El handoff** pone el hero en **blanco** y la única banda `--teal-900` en el bloque 05,
"Cómo empezar". Lo confirmé en la captura `01-hero-logos.jpg`.

Las dos lecturas son defendibles: el hero en teal le da superficie de marca a lo primero
que se ve; el hero en blanco se alinea con *"el fondo es blanco"* de los lineamientos y
reserva el oscuro para el momento de mayor énfasis. **Pero son opuestas.**

### 1.2 La jerarquía de los botones

**Decidido el 19/10**, con tus palabras: Ingresar y Empezar gratis arriba, con *Empezar
gratis destacado*, y Agendar demo como CTA de cierre.

**El handoff** hace lo inverso: **"Pedí una demo" es el botón principal** en el header y en
el hero, y "Empezar gratis" queda secundario.

Es la diferencia entre un producto que se contrata solo y uno que se vende con reunión. Hoy
el sitio empuja el autoservicio; el boceto empuja la demo.

### 1.3 "Pedí una demo" deja de abrir el calendario

**Decisión documentada en el repo**, anterior a esta sesión: *"Agendar demo abre el
calendario en pestaña nueva. Sin página intermedia, sin formulario propio, sin calendario
embebido."* Verificado en `CtaPair.tsx`: `target="_blank"` al calendario.

**El handoff** dice: *"Todos los CTA de la página que dicen «Pedí una demo» bajan hasta
acá"* — al formulario del bloque 09.

Es un cambio de mecánica de conversión, no de diseño: hoy la persona elige horario y queda
agendada; con el cambio deja un teléfono y alguien la llama. **Agrega un paso.**

### 1.4 El precio sale del hero

**Decidido el 19/10:** *"ok con el precio a la vista"*. Está en el hero: "Desde USD 50 por
módulo, con plan gratuito en cada uno".

**El handoff** no tiene precio en el hero. Lo manda al bloque 08, como una de tres columnas
con enlace ("El precio está publicado → Ver precios").

El precio publicado es diferencial contra quien te hace pedir cotización. Bajarlo al 80 %
de la página lo devuelve a donde estaba antes del diagnóstico.

### 1.5 La línea de las máquinas se diluye

**Decidido el 19/10**, y el texto lo corregiste vos: *"Con las máquinas que ya tenés.
Conectamos el PLC o un sensor y obtenemos la información de la línea."* Va con filete
propio porque es la diferenciación de esta etapa.

**El handoff** la funde adentro del lead: *"Producción, calidad, stock, trazabilidad y
tareas en una sola pantalla. Empezás con las máquinas que ya tenés."*

Se pierde **"el PLC o un sensor"**, que es lo concreto. "Las máquinas que ya tenés" sin esa
segunda parte se lee como una frase amable; con ella es una afirmación técnica que el
comprador puede verificar.

### 1.6 El plano deja de ser interactivo

**Trabajo tuyo explícito:** pediste restaurar el punto de recepción, subir trazabilidad a
donde entra la materia prima, sacar energía afuera junto al camión, subir mantenimiento
arriba de la línea y centrar stock en el almacén. Cada punto está donde lo pediste.

**El handoff** lo vuelve *"imagen estática, sin loop ni parallax"* en marco 21:9, y dice
*"si tiene marcadores, cada uno lleva al módulo correspondiente"* — o sea, enlaces, no el
panel con la promesa de cada módulo.

Además afirma que *"el archivo de la isométrica no está en el design system"*. **Sí está en
este repo** (`/img/plant/fabrica-logistica.webp`, con su variante de 960 y los originales
en `assets-src/`). Ese bloqueante no existe.

---

## 2. Dos cosas que el handoff se contradice a sí mismo

No necesitan tu decisión sobre el producto, pero hay que resolverlas antes de implementar.

### 2.1 Mono o Poppins para los números

`AJUSTES_DESIGN_SYSTEM.md` §1 propone: *"la web usa Poppins tabular, la app usa Inter
tabular y Mono queda sólo para códigos. Hay que borrar del README la línea de Mono para
métricas."*

Y el `README.md` del mismo handoff, bloque 05: *"el número en JetBrains Mono 14px
`--cyan-400`"*.

Hoy la clase `.metric` del sitio usa `--font-mono`. Si gana la propuesta de AJUSTES, es un
cambio **de todo el sitio**, no de la home: los precios de módulo, el dato de prueba, los
números de paso y la captura de Campo.

### 2.2 Los íconos de módulo

El handoff propone siete glifos. Comparados con los que el sitio ya usa:

| Módulo | Hoy | Handoff | |
|---|---|---|---|
| Producción | `Gauge` | gauge | igual |
| Trazabilidad | `Route` | route | igual |
| Mantenimiento | `Wrench` | wrench | igual |
| Energía | `Zap` | zap | igual |
| Calidad | `CircleX` | scan-line | **distinto** |
| Stock | `Warehouse` | boxes | **distinto** |
| Tareas | `ListChecks` | clipboard-check | **distinto** |

Su propia regla lo resuelve: *"Si la app ya usa otros glifos para estos módulos, ganan los
de la app y hay que corregir la home."* → **quedan los tres actuales** y se corrige la
tabla del handoff.

Un detalle de arquitectura: el repo no guarda glifos en el contenido, guarda **conceptos**
(`oee`, `defect`, `warehouse`) y los resuelve en `icons/`. Está documentado así para que
cambiar un ícono no sea tocar contenido. La tabla del handoff nombra glifos de Lucide
directo; al implementarla hay que traducirla a conceptos.

---

## 3. Lo que ya está hecho y coincide

Esto no es trabajo pendiente: el handoff pide lo que el sitio ya hace desde ayer.

| Regla del handoff | Estado |
|---|---|
| Contenido a 1120 px | ✅ |
| Secciones 112 / 72 / 56 px | ✅ |
| "Los paddings de secciones vecinas no se suman" | ✅ (medido: 112 exactos) |
| Botones de 48 px, radio 8 | ✅ |
| Sin sombras | ✅ (0 en superficies de página) |
| Cards sólo si son clickeables como unidad | ✅ (0 sin justificar) |
| Nada en mayúsculas | ✅ (0 en el sitio) |
| Lead 640 px, cuerpo 680 px | ✅ |
| `text-wrap: balance` / `pretty` | ✅ |
| Marco de captura: grey-050, borde, radio 14, 10 px | ✅ |
| Hover de card sólo por borde, sin elevación | ✅ |

Y dos preguntas abiertas del handoff ya tienen respuesta:

- *"Hay que definir a dónde se envía el lead (CRM o mail)"* → **Brevo, con respaldo a
  `mailto:`**. Está en `lib/submit-lead.ts` y `lib/lead-intake.ts`.
- *"La fórmula oficial de la calculadora de ROI"* → está en `lib/roi.ts`, con modelo por
  módulo. No hay que pedirla.

---

## 4. El trabajo real

Ordenado por tamaño.

| # | Qué | Tamaño | Nota |
|---|---|---|---|
| 1 | **Breakpoints a 1000 / 640** | Grande | 129 usos en tres cortes (1100/900/720). Las grillas van 1→2→3 columnas y el handoff define dos rangos: hay que decidir por grilla cuáles pasan a 1→3 y cuáles a 1→2. Ya estaba marcado como pendiente. |
| 2 | **Reordenar a 10 bloques** | Medio | Hoy son 12. Entran: tarjeta de producto en el hero, "Para tu rubro", la franja de tres columnas y el formulario. Salen: audiencias por rol, la línea de 6 etapas (va a "Cómo empezar"), el teaser de marketplace. |
| 3 | **Formulario en la home** | Medio | Hoy no hay. Mismo patrón que el de Campo, con Rubro y Cantidad de líneas. |
| 4 | **Header sticky con blur** | Chico | 68 px, blanco al 94 %, nav por anclas. Hoy el header es sticky pero sin blur ni anclas. |
| 5 | **Tarjeta de producto del hero** | Chico | Es la misma pieza que hice para Campo, con datos de planta. Va en **Inter**, no Poppins, por ser vista de producto. |
| 6 | **"Para tu rubro"** | Chico | 3 cards con foto 16:9. **Los rubros son provisorios y el handoff pide confirmarlos.** |
| 7 | **FAQ a 5 máximo, acordeón** | Chico | Hoy hay más y abren varias. El resto va a una página de FAQ que no existe. |
| 8 | **Footer a una línea** | Chico | Reemplaza las columnas actuales. |
| 9 | **Tokens `web.css`** | Chico | Los 10 tokens de AJUSTES §2. La mitad ya existen con otro nombre (`--content-max`, `--section-pad`…): conviene mapear, no duplicar. |
| 10 | **Componentes `web/`** | Medio | Los 11 de AJUSTES §3. Varios ya existen (`CtaPair`, `PageHero`, `ModuleGrid`, `Accordion`): hay que ver cuáles son nuevos de verdad. |

---

## 5. Lo que bloquea de verdad

De los cuatro bloqueantes que lista el handoff, **dos no lo son**:

- ~~El archivo de la isométrica~~ → está en el repo.
- ~~La fórmula del ROI~~ → está en `lib/roi.ts`.

Quedan dos, y uno más que el handoff no menciona:

1. **El vector del logo.** Sigue habiendo sólo PNG.
2. **Los logos de clientes con permiso de uso.** Hoy se muestran 17 sin que el handoff diga
   cuáles tienen permiso.
3. **Las tres fotos de rubro**, que además dependen de confirmar los rubros.

---

## 6. Lo que yo haría

Separar en dos tandas, porque la primera no necesita ninguna decisión tuya:

**Tanda A — lo que no contradice nada.** Breakpoints, header con blur y anclas, tarjeta de
producto en el hero, FAQ a cinco con acordeón, footer de una línea, tokens y componentes.
Es la mayor parte del trabajo y se puede empezar hoy.

**Tanda B — después de que decidas los seis puntos de §1.** El reordenamiento de bloques
depende de casi todos ellos: si el hero pierde el teal y gana la tarjeta de producto, y los
botones cambian de jerarquía, es otro hero.

De los seis, el que más me gustaría discutir es **1.3** (que la demo deje de abrir el
calendario). Los otros cinco son preferencias legítimas; ese agrega un paso entre la
intención y la reunión, y hoy el calendario cierra sin intervención de nadie.
