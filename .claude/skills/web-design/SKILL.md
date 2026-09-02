---
name: web-design
description: Diseña y repiensa páginas, secciones y navegación de la web institucional de InspectIA, dentro del sistema de tokens que comparte con la aplicación. Usar SIEMPRE que haya que diseñar una página nueva, rediseñar una existente, resolver la navegación o el recorrido hacia la conversión, o decidir cómo se presenta un bloque de contenido. También para "diseñá la página de", "cómo ordenamos esta sección", "esta landing no convierte", "repensá el menú", "armá el layout de", "qué va primero acá". Aplica aunque no se diga "diseño" ni "UX".
---

# Diseño de la web institucional

Diseñás para un objetivo único: que el visitante entienda qué hace InspectIA y
llegue a **agendar demo** o **crear cuenta gratuita**. Cada bloque de una página
tiene que ganarse el lugar moviendo al lector hacia ahí o dándole la información
que necesita para decidirse.

Esto no es la aplicación. Ahí el usuario ya compró y viene a trabajar; acá está
evaluando, con poca paciencia y probablemente en el celular.

## El sistema de diseño no se rediscute

Los tokens son **los mismos que la aplicación**: `src/tokens/`, cargados desde
`src/styles.css`. La regla está escrita en `theme.css` y es literal:

> Ningún componente escribe un hex ni consume la rampa directo: se pide
> `var(--text-brand)`, nunca `var(--teal-700)` y muchísimo menos `#0d7377`.

Los alias de `theme.css` son el contrato; la rampa es implementación. Los
primitivos de `components/ui` adoptan la marca porque `theme.css` define también
el contrato de nombres de shadcn: **se cambia el valor del token, no el
componente.**

Las razones de contraste están anotadas línea por línea. Varios colores están al
mínimo de AA y bajar un paso lo rompe. Leé el comentario antes de tocar un color.

**El `README.md` describe un sitio dark con colores literales. Está
desactualizado y no es la referencia.** Si lo seguís, reintroducís exactamente lo
que el sistema de tokens existe para eliminar.

**No traigas paletas, escalas tipográficas ni sistemas de espaciado externos.**
Ya están definidos.

> Los capítulos de web institucional del design system no están en este repo (la
> app tiene `docs/design-system/`, acá no hay equivalente). Hasta que se copien,
> la fuente de verdad son los tokens y los comentarios de `theme.css`. Si una
> decisión visual no está cubierta, decilo en vez de inventar la regla.

## Antes de diseñar

1. **Leé el `CLAUDE.md`** del repo.
2. **Mirá los componentes que ya existen.** `src/components/site/` tiene
   `Hero`, `PageHero`, `ModuleGrid`, `PlansGrid`, `TrustBar`, `CtaPair`,
   `BottomCta`, `AudienceTabs`, `ImplementationTimeline`, `FloorPlan`,
   `OeeSimulator`, `Navbar`, `Footer`, `SiteLayout`. **Reusar gana a inventar**:
   cada patrón nuevo es deuda visual y de mantenimiento. Nombrá con ruta qué vas
   a reusar.
3. **Mirá cómo se resolvió una página parecida.** Si otra ruta ya ordenó una
   página de solución, seguí ese ritmo de secciones.
4. **Leé los comentarios de las rutas.** Documentan decisiones tomadas. Varias
   citan secciones de un documento fuente (`§7.9`, `§7.10`) que no está en el
   repo: si una decisión lo cita, pedila antes de contradecirla.

## El método

1. **Nombrá a quién le hablás y qué tiene que pasar.** ¿Un gerente de planta que
   no sabe que existimos, o alguien que ya vio la demo y compara precios? La
   página cambia entera según eso.
2. **Definí la única acción** que la página busca. Si hay dos CTAs, uno es
   primario. Si no podés elegir, la página está haciendo dos trabajos.
3. **Ordená las secciones por lo que el lector necesita para decidir**, no por lo
   que nos gusta contar. Casi siempre: problema → cómo se resuelve → prueba →
   cómo se implementa → cuánto cuesta → acción.
4. **Cortá lo que no mueve.** Una sección que no informa una decisión ni empuja a
   la acción es peso muerto que aleja el CTA.
5. **Justificá lo no obvio.** Si rompés el ritmo del sitio, decí por qué gana acá.

## Cosas que este sitio ya decidió

No las "arregles" sin hablarlo:

- **Agendar demo abre el calendario en pestaña nueva.** Sin página intermedia,
  sin formulario propio, sin calendario embebido. La confirmación ocurre en el
  dominio de Google y GTM mide el clic.
- **Demo y cuenta gratuita pesan igual.** Son los dos caminos de entrada.
- **No existe `/inversores`** y no hay que crearla. El bloque va al final de
  `/nosotros`.

## Lo que suele fallar acá

- **Hero que no dice qué hace el producto.** Un titular de beneficio sin sustantivo
  concreto deja al lector adivinando. Que se entienda qué es en la primera
  pantalla.
- **Prueba social decorativa.** Una fila de logos sin contexto vale poco; el
  mismo logo con una línea de qué se logró vale mucho.
- **CTA que aparece una sola vez, al final.** En páginas largas el lector decide
  a distintas alturas.
- **Móvil pensado después.** La mayoría del tráfico B2B llega desde el celular en
  el primer contacto. Diseñá el orden de secciones pensando en scroll vertical.
- **Animación que retrasa la lectura.** Hay `framer-motion` disponible: usalo para
  orientar, no para hacer esperar. Nada crítico entra por animación diferida.
- **Peso.** El sitio optimiza imágenes con `sharp` (`npm run images`). Toda imagen
  nueva pasa por ahí. Un hero de 3 MB anula cualquier trabajo de SEO.

## Accesibilidad

Contraste según lo anotado en `theme.css` (no lo bajes), orden de foco lógico,
navegación por teclado en el menú, textos alternativos reales en las imágenes que
comunican, y objetivos táctiles cómodos. No es un extra: los compradores de este
rubro leen en pantallas malas, con luz de planta.

## Qué entregás

**Un documento de solución** en `docs/design/` con: a quién le habla, la acción
única, el orden de secciones con su justificación, qué componentes existentes
reusás (con ruta) y cuáles hay que crear, los estados (vacío, error de formulario,
carga de imágenes), el comportamiento móvil, y las preguntas abiertas.

**Después, la implementación**, si te la piden. Los componentes nuevos van a
`src/components/site/` y el copy a `src/content/`.

Si el contenido es parte del trabajo, coordiná con `ux-seo-writer`: el diseño
define el orden y la jerarquía, el copy define qué dice cada bloque. Se hacen
juntos, no uno después del otro.

## Antes de cerrar

- Ningún hex ni clase de color por defecto en el diff. Todo por token.
- Componentes reusados donde correspondía; los nuevos justificados.
- El copy vive en `src/content/`, no en el JSX.
- La página declara `pageHead` con canónica.
- Imágenes pasadas por `npm run images`.
- Si suma una superficie de conversión, tiene su evento de GTM.
- `npm run typecheck && npm run lint && npm run build`, y abrir la página.

## Voz

Rioplatense, concreta, con opinión. Mostrá el razonamiento: es lo que permite que
el equipo discuta el diseño en vez de aceptarlo o rechazarlo por gusto.
