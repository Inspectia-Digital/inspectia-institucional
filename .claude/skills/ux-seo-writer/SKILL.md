---
name: ux-seo-writer
description: Escribe y optimiza el contenido de la web institucional de InspectIA — landings, páginas de producto y solución, casos, metadatos, microcopy — para que lea natural (nunca como texto de IA), posicione en buscadores y sea usable por motores de respuesta. Usar SIEMPRE que haya que escribir, reescribir o estructurar contenido de una página, definir títulos y descriptions, trabajar jerarquía de encabezados, enlazado interno, datos estructurados o keywords. También para "escribí la página de", "mejorá este copy", "optimizá para SEO", "armá los H1 y metadatos", "que no parezca escrito por IA", "investigá keywords para", "esta página no convierte". Aplica aunque no se diga "SEO" ni "copy".
---

# Contenido y SEO — web institucional

El sitio tiene un solo trabajo: explicar qué hace InspectIA y llevar a **agendar
demo** o **crear cuenta gratuita**. Todo texto se juzga contra eso. Una página
que posiciona y no convierte falló; una que convierte y nadie encuentra también.

## Antes de escribir

1. **Leé el `CLAUDE.md`** de este repo, sobre todo la advertencia del README.
2. **Leé la página que vas a tocar y las vecinas.** El sitio tiene voz propia y
   decisiones tomadas, documentadas en comentarios de las rutas. Contradecirlas
   sin saberlo es el error más caro.
3. **Mirá `src/content/`.** El copy vive ahí, no en el JSX. Si vas a agregar
   texto, va al módulo de contenido que corresponda.
4. **Mirá cómo resuelve el `head` una ruta existente** (`nosotros.tsx` es buen
   ejemplo): `pageHead` con título contado, description con su largo anotado en
   comentario, canónica y JSON-LD.

## La audiencia

Directores industriales, gerentes de planta, jefes de logística y dueños de
pymes industriales en Argentina y la región. No son técnicos de IA. Compran
porque tienen un problema concreto —scrap, paradas, inventario que no cierra— y
un tiempo de repago que justificar ante alguien.

Escribí para esa persona: concreto, con números cuando existen, sin promesas de
transformación digital. La jerga permitida es la de **su** industria (OEE, SKU,
PLC, WMS, ERP, MES, scrap, picking), no la de la nuestra (embeddings, pipeline,
inferencia).

## Que no parezca escrito por IA

Es un requisito, no una preferencia. Los tics que más delatan:

- **La antítesis "no es X, es Y"** y su familia ("no se trata de... sino de...").
  Una o dos en un sitio entero pasan; en cada sección, cantan.
- **Tricolon everywhere**: enumeraciones de tres en cada párrafo.
- **Apertura genérica**: "En el mundo actual de la manufactura...", "La industria
  4.0 llegó para...". Empezá por el problema del lector o por un hecho.
- **Cierre que resume lo que acabás de decir.** Si el párrafo ya lo dijo, cortá.
- **Adjetivos sin referente**: "soluciones robustas", "tecnología de vanguardia",
  "resultados excepcionales". Reemplazá por el número o sacá.
- **Rayas y punto y coma decorativos**, y comillas irónicas.
- **Simetría perfecta**: tres bloques de tres líneas cada uno con la misma
  estructura. La prosa humana es despareja.

El test: leelo en voz alta. Si suena a folleto, reescribilo. Si una frase podría
estar en el sitio de cualquier competidor, no dice nada.

Escribí en **rioplatense**, tratando de usted o de vos según lo que ya use la
página — no mezcles dentro del sitio. Para la versión en inglés, inglés de
negocios neutro, no traducción literal.

## Estructura de página

- **Un solo H1**, con la keyword principal y el beneficio. No el nombre del
  producto solo.
- **H2 por sección**, escritos como lo que el lector busca, no como etiquetas
  internas ("Cómo se instala", no "Implementación").
- **H3 solo si hay jerarquía real.** Un H3 suelto es un H2 mal puesto.
- **Negrita para el término que el lector escanea**, no para enfatizar frases
  enteras. Tres o cuatro por pantalla, no más.
- **Párrafos cortos.** El lector escanea en el celular antes de leer.
- **Enlazado interno con texto descriptivo**: "cómo calculamos el OEE", no "hacé
  clic acá". Toda página de solución enlaza al módulo que la resuelve, y al revés.

## Metadatos

Se declaran con `pageHead` en `src/lib/seo.ts`. Nunca a mano.

- **Título**: `Beneficio o término · InspectIA`, hasta **60 caracteres**. La
  keyword al principio.
- **Description**: ~**155 caracteres**, con el beneficio y una razón para hacer
  clic. Anotá el conteo en un comentario, como las rutas existentes.
- **Canónica**: siempre, derivada de `SITE_URL + path`. La raíz conserva la barra.
- **`noindex`** para legales, privacidad y gracias: compiten con las páginas que
  importan.
- **JSON-LD** donde aporta: `FAQPage` en páginas con preguntas reales, `Article`
  en casos, breadcrumbs en páginas anidadas. **`Organization` ya está en la home;
  no lo dupliques.**

`SITE_URL` tiene un `TODO(equipo)` sin resolver. Canónicas, sitemap y robots
dependen de él: si vas a trabajar SEO en serio, cerralo primero o marcalo.

## Motores de respuesta

Cada vez más tráfico llega vía asistentes que leen la página y responden por
vos. Lo que ayuda:

- **Respuestas directas y autocontenidas.** Una sección que empieza contestando
  la pregunta es citable; una que construye suspenso, no.
- **Datos concretos con su contexto**: "repago menor a 6 meses" vale más citado
  si al lado dice sobre qué se calcula.
- **Preguntas frecuentes escritas como preguntas reales**, con `FAQPage`.
- **Definiciones claras de los términos del rubro.** Ser la explicación de
  referencia de "OEE" para el mercado local es tráfico y autoridad a la vez.

## Keywords

Trabajá por **intención**, no por volumen. En B2B industrial el volumen es bajo y
engañoso: cien búsquedas de "sistema de control de calidad por visión artificial"
valen más que diez mil de "inteligencia artificial".

Tres grupos:
- **Problema** — "reducir scrap", "por qué para mi línea", "control de
  inventario sin conteo manual". Alta intención, poca competencia.
- **Solución** — "software OEE", "visión artificial control de calidad",
  "drones inventario depósito".
- **Categoría** — "industria 4.0", "MES". Volumen alto, intención baja: sirven
  para contenido, no para landings de conversión.

Una keyword principal por página. Si dos páginas compiten por la misma, una de
las dos está de más o hay que fusionarlas — eso es canibalización y hunde a las
dos.

## Antes de cerrar

- El copy nuevo vive en `src/content/`, no en el JSX.
- La página declara `pageHead` con título contado, description contada y canónica.
- Un solo H1. Jerarquía de encabezados sin saltos.
- Sin tics de IA. Leído en voz alta.
- Enlaces internos con texto descriptivo, en las dos direcciones.
- Si es ruta nueva: entra al sitemap por el módulo de contenido, nunca a mano.
- Si suma una superficie de conversión: tiene su evento de GTM
  (`analytics/README.md`).
- `npm run typecheck && npm run lint && npm run build`.

## Voz

Rioplatense, directa, sin relleno. Mostrá el razonamiento detrás de una decisión
de copy cuando no sea obvia: es lo que permite discutirla en vez de aceptarla.
