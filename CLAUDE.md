# CLAUDE.md — Web institucional de InspectIA

Sitio institucional y de captación. Su trabajo es explicar qué hace InspectIA y
llevar a dos acciones: **agendar una demo** y **crear una cuenta gratuita**. Todo
lo demás está subordinado a eso.

No confundir con la aplicación: `oee-lite-main` (app) y `oee-lite-backend-main`
(API) son otro producto y otro repo. Este sitio no consume esa API.

## ⚠️ El README no es documentación

**`README.md` es el prompt original de Lovable con el que se generó el sitio, y
está desactualizado en lo que más importa.** Describe un sitio "Dark Mode
Premium" con colores literales (`#041A1B`, `#084749`, `#17ccd3`, `text-slate-500`)
y clases sueltas (`rounded-3xl`, `bg-white/5`).

El sitio real **no es eso**: es tema claro y consume tokens, no hex. La auditoría
del código lo confirma — cero literales hexadecimales y cero clases de color por
defecto de Tailwind en `src/components` y `src/routes`.

Si seguís el README vas a reintroducir exactamente lo que el sistema de tokens
existe para eliminar. **Tratalo como historia.** La verdad visual está en
`src/tokens/`.

## Lovable

`AGENTS.md` trae la restricción y es real: **no reescribas historia publicada**
—nada de force push, rebase, amend ni squash sobre commits ya empujados—, porque
reescribe la historia del lado de Lovable y el usuario pierde su proyecto. Los
commits que empujás a la rama conectada sincronizan de vuelta a Lovable, así que
la rama tiene que quedar siempre en estado funcional.

## Stack

TanStack Start + TanStack Router (routing por archivos, SSR/prerender con nitro) ·
React · TypeScript · **Tailwind CSS 4** (vía `@tailwindcss/vite`, no v3 como la
app) · shadcn/ui sobre Radix · framer-motion · sharp para imágenes · Prettier +
ESLint.

```bash
npm run dev          # vite dev
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run format       # prettier --write .
npm run images       # optimiza y genera los OG con sharp
npm run sitemap      # regenera sitemap.xml y robots.txt (corre solo en prebuild)
npm run build
```

**No hay tests en este repo.** La verificación mínima antes de dar algo por
cerrado es `npm run typecheck && npm run lint && npm run build`, más abrir la
página. No inventes un setup de tests dentro de una tarea de contenido; si hace
falta, es trabajo propio.

## Routing

Routing **por archivos** de TanStack Start. Leé `src/routes/README.md`: tiene las
convenciones exactas.

- No crees `src/pages/`, `app/layout.tsx` ni `_app/` — son convenciones de Next o
  Remix y acá no aplican.
- El único layout raíz es `src/routes/__root.tsx`. Preservá su `<Outlet />`.
- Segmento dinámico con `$` pelado: `soluciones/$industria.tsx`.
- `routeTree.gen.ts` es generado. No lo edites a mano.

## El contenido vive en `src/content/`, no en los componentes

`site.ts`, `modules.ts`, `solutions.ts`, `cases.ts`, `partners.ts`,
`integrations.ts`, `pricing.ts`, `marketplace.ts`, `legal.ts`, `assets.ts`.

Es la decisión estructural más importante del repo y hay que sostenerla: el
sitemap se genera **importando esos módulos**, no repitiendo una lista de rutas.
Una lista escrita a mano en un script se desincroniza a la segunda página que
alguien agrega, y nadie se entera hasta que Search Console reporta 404.

**Copy nuevo va al módulo de contenido, no incrustado en el JSX.**

## SEO

`src/lib/seo.ts` es la única forma de declarar el `head` de una página. Toda ruta
llama a `pageHead({ title, description, path, jsonLd?, noindex?, image? })`.

Reglas que ya están decididas y no se rediscuten por página:

- **Título escrito a mano por página**, forma `Beneficio o término · InspectIA`,
  hasta 60 caracteres — lo que Google muestra antes de cortar.
- **Description con su largo contado.** Las rutas existentes anotan el conteo en
  un comentario; seguí esa práctica. Apuntá a ~155 caracteres.
- **Canónica siempre**, derivada de `SITE_URL + path`. La raíz conserva la barra:
  el sitemap declara `SITE_URL + "/"` y una canónica sin ella apunta, en los
  papeles, a otra URL.
- **`noindex` para lo que compite con las páginas que importan**: legales,
  privacidad, gracias.
- **JSON-LD por página** cuando aporta (`FAQPage`, `Article`, breadcrumbs).
  `Organization` ya está declarado en la home — **no lo dupliques**.
- Imagen de compartido por defecto: `/img/og/inspectia-og.jpg`, generada con
  `npm run images`.

**`SITE_URL` tiene un `TODO(equipo)` sin resolver** en `src/content/site.ts`: el
dominio definitivo no está confirmado. Canónicas, sitemap y robots dependen de
él. Si trabajás SEO acá, es lo primero que hay que cerrar.

## Sistema de diseño

Los tokens son **los mismos que la aplicación** (`src/tokens/`: `brand.css`,
`colors.css`, `typography.css`, `radius.css`, `spacing.css`, `motion.css`,
`elevation.css`, `theme.css`, `base.css`), cargados desde `src/styles.css`.

La regla, escrita en el propio `theme.css`: **ningún componente escribe un hex ni
consume la rampa directo.** Se pide `var(--text-brand)`, nunca `var(--teal-700)`
y muchísimo menos `#0d7377`. Los alias de `theme.css` son el contrato; la rampa
es implementación.

Los primitivos de `components/ui` adoptan la marca porque `theme.css` también
define el contrato de nombres de shadcn. **Se cambia el valor del token, no el
componente.**

Las razones de contraste están anotadas línea por línea en `theme.css`. Si vas a
cambiar un color, leé el comentario: varios están al mínimo de AA y bajar un paso
lo rompe.

> **Los capítulos de web institucional del design system no están en este repo.**
> La app tiene `docs/design-system/` con las reglas visuales y el checklist; acá
> no hay equivalente. Hasta que se copien, la fuente de verdad son los tokens y
> los comentarios de `theme.css`. Si tenés el documento, traelo a
> `docs/design-system/` — es el hueco más grande de este repo.

## Medición

Doce eventos que el sitio empuja al `dataLayer`, con el contenedor GTM
documentado en `analytics/README.md` y exportado en
`gtm-inspectia-eventos.json`. `src/lib/gtm.ts`, `analytics.ts` y `useViewEvents.ts`
son la implementación.

Al importar el contenedor va **Merge, nunca Overwrite** — Overwrite borra las
etiquetas que ya están. Un evento nuevo se agrega a la expresión regular del
disparador existente, no creando un disparador más.

Si agregás una superficie de conversión, agregá su evento. Un CTA sin medición no
se puede optimizar.

## Conversión

Los dos caminos pesan igual: **agendar demo** (`DEMO_URL`, abre el calendario en
pestaña nueva, sin página intermedia ni formulario propio) y **cuenta gratuita**.
La consecuencia asumida es que la confirmación ocurre en el dominio de Google, así
que GTM mide el clic y la asistencia se concilia después contra la agenda.

No agregues formularios intermedios ni calendarios embebidos: es una decisión
tomada, no un pendiente.

## Decisiones tomadas que no hay que "arreglar"

Las rutas documentan sus decisiones en comentarios. Leelos antes de proponer
cambios estructurales. Ejemplos:

- **No existe `/inversores` y no hay que crearla.** El bloque de inversores va al
  final de `/nosotros`: una página de inversores sin ronda abierta envejece mal y
  le dice al cliente que estamos buscando plata.
- El `noindex` de la 404 va como meta suelta y no por `pageHead`, a propósito.

Varias rutas citan secciones de un documento fuente por número (`§7.9`, `§7.10`).
**Ese documento no está en el repo.** Si vas a tocar contenido y una decisión cita
una sección, pedila antes de contradecirla.

## Cómo se trabaja acá

| Tarea | Skill |
|---|---|
| Escribir o reestructurar contenido de una página, metadatos, keywords | `ux-seo-writer` |
| Diseñar o repensar una página, una sección o la navegación | `web-design` |

Las dos leen los tokens y el contenido antes de proponer nada.

## Antes de dar algo por cerrado

```bash
npm run typecheck && npm run lint && npm run build
```

Y revisá: ningún hex ni clase de color por defecto en el diff; el copy nuevo vive
en `src/content/`; la página declara `pageHead` con canónica; si es una ruta
nueva, entra en el sitemap por el módulo de contenido, no a mano; si es una
superficie de conversión, tiene su evento de GTM.
