# BRIEF — SEO del sitio: funcionalidades, guías y ajustes

**Fecha:** 11/11/2026 · **Para:** sesión de Claude Code del repo `inspectia-institucional` · **De:** dirección (Estanislao)
**Reemplaza a:** `../2026-11-11_BRIEF_LANDINGS_FUNCIONALIDADES.md` y `../2026-11-11_BRIEF_LANDINGS_LLAVE_EN_MANO.md` (los dos quedan descartados).
**Carpeta:** este brief y los archivos de contenido de esta carpeta son una sola entrega. El copy está final; la forma de cargarlo en `src/content/` la decide Code dentro de las convenciones del repo.

---

## 1. Qué se decidió

1. **Cada tema del sitio se organiza en tres niveles:**
   - **Pilar:** la página del módulo (`/plataforma/<módulo>`), para la búsqueda de categoría («software de OEE»).
   - **Funcionalidad:** `/plataforma/<módulo>/<búsqueda>`, para la búsqueda comercial concreta («monitoreo automático de OEE»). El slug es la búsqueda.
   - **Guía:** `/guias/<tema>`, para la búsqueda informativa («cómo calcular el OEE»). Enlaza a su funcionalidad y a su módulo.
2. **Los casos de uso pasan a ser guías.** Ya rankean como guías (ver datos). Se mudan a `/guias/` con 301 y se les reescribe título y descripción.
3. **Idioma:** las páginas de funcionalidad mantienen la voz del sitio (voseo). Las guías van en **español neutro, sin voseo ni tuteo** (construcciones impersonales), porque la mitad de la demanda que no es argentina viene de España y México.
4. **No se agrega sección al menú.** Cada página de módulo suma un bloque «Funcionalidades» con enlaces a las suyas. El índice `/guias` va en el pie, en Recursos.
5. **Las redirecciones del sitio viejo no se tocan** (`src/lib/http-policy.ts` está bien). Sólo se agregan las de casos de uso → guías.

## 2. Por qué (datos de Search Console, 16 meses al 11/11/2026)

- 269 clics, 10.000 impresiones, CTR 2,7 %, posición media 9,5. El 59 % de los clics es la marca.
- Fuera de la marca, la demanda es OEE: «software para cálculo de oee» 352 impresiones en posición 3,6; «monitoreo automático de oee» 186 en posición 2,8; «sistemas de control y adquisición de datos con oee» 293 en 18,9; «oee software», «software de oee», «software oee» 614 en conjunto entre 16 y 21. **Todas con cero clics.**
- La página que traía esa demanda era `/oee-control/` (3.206 impresiones). Redirige a `/plataforma/produccion`, que todavía no la recuperó (93 impresiones, posición 16,9).
- Los casos de uso son lo que más impresiones tiene fuera de la home: scrap 574 (posición 8,6), inventario descuadrado 386 (6,4), paradas 125 (12,6). Cero o casi cero clics: problema de título y descripción.
- Países: España 2.507 y México 1.373 impresiones, Argentina 758, Perú 370.
- Las búsquedas de trazabilidad alimentaria aparecen en posición 54 a 67: no rankeamos.

## 3. Qué se entrega en esta tanda

| Archivo | Qué es | URL |
|---|---|---|
| `01_ajustes_paginas_existentes.md` | Producción, Stock, casos de uso → guías, autopartista | varias |
| `10_funcionalidad_monitoreo-automatico-de-oee.md` | Funcionalidad nueva | `/plataforma/produccion/monitoreo-automatico-de-oee` |
| `11_funcionalidad_registro-de-paradas-de-maquina.md` | Funcionalidad nueva | `/plataforma/produccion/registro-de-paradas-de-maquina` |
| `12_funcionalidad_trazabilidad-alimentaria.md` | Funcionalidad nueva | `/plataforma/trazabilidad/trazabilidad-alimentaria` |
| `13_funcionalidad_wms-para-fabricas.md` | Funcionalidad nueva | `/plataforma/stock/wms-para-fabricas` |
| `14_funcionalidad_control-de-asistencia.md` | Funcionalidad nueva | `/plataforma/tareas/control-de-asistencia` |
| `16_funcionalidad_mrp-y-escenarios.md` | Funcionalidad nueva | `/plataforma/produccion/mrp-y-escenarios` |
| `17_funcionalidad_plan-de-produccion.md` | Funcionalidad nueva | `/plataforma/produccion/plan-de-produccion` |
| `18_funcionalidad_parte-de-produccion-digital.md` | Funcionalidad nueva | `/plataforma/produccion/parte-de-produccion` |
| `19_funcionalidad_mantenimiento-por-horas-de-uso.md` | Funcionalidad nueva | `/plataforma/mantenimiento/mantenimiento-por-horas-de-uso` |
| `1A_funcionalidad_andon-pantalla-de-planta.md` | Funcionalidad **planificada** (a pedido) | `/plataforma/produccion/andon-digital` |
| `1B_funcionalidad_costo-por-unidad.md` | Funcionalidad **parcial** (a pedido) | `/plataforma/produccion/costo-por-unidad` |
| `20_guia_como-calcular-el-oee.md` | Guía nueva | `/guias/como-calcular-el-oee` |
| `21_guia_motivos-de-parada.md` | Guía nueva | `/guias/motivos-de-parada` |
| `22_guia_retiro-de-lotes.md` | Guía nueva | `/guias/retiro-de-lotes` |
| `../2026-11-11_REFERENCIA_control-de-acceso-facial.html` | Referencia visual de una página de funcionalidad | — |

**Páginas planificadas o parciales (1A, 1B).** Se publican igual, porque posicionan algo que se construye si un cliente lo pide. Llevan la banda «Lo estamos habilitando con nuestros clientes» y un solo CTA, «Quiero conocerlo», al formulario de contacto con su origen (`andon`, `costos`), como la página de MCP. No llevan «Empezar gratis». Cuando la funcionalidad exista, pasan al `CtaPair` estándar.

**Regla de validación SEO (12/11/2026).** Ninguna página nueva se publica sin una línea «Validación SEO» en su archivo: el término principal y los secundarios comparados en Google Trends (5 años, mundo en español y por país cuando cambia), las consultas relacionadas y qué hay en la SERP (informativa o comercial, quién compite). El título se ancla en el término con volumen, no en el nombre interno de la funcionalidad. Ejemplo: «simulación de producción» da 0 y «MRP» tiene volumen, así que la página de escenarios es «MRP y escenarios». Keyword Planner afina los volúmenes absolutos cuando esté.

**Queda para la próxima tanda:** MES para pymes, planificación de la producción y la guía «WMS de distribución contra WMS de planta». Esperan datos de Keyword Planner y una definición de producto.

## 4. Rutas y modelo de contenido

- **Funcionalidades:** ruta dinámica anidada `src/routes/plataforma/$modulo/$funcionalidad.tsx` (o la forma equivalente de TanStack Router que no rompa `plataforma/$modulo.tsx`). Contenido en un módulo nuevo de `src/content/` (por ejemplo `features.ts`), con un campo `module` que apunta a la clave del módulo padre.
- **Guías:** `src/routes/guias/index.tsx` y `src/routes/guias/$guia.tsx`, contenido en `src/content/guides.ts`. Los casos de uso actuales se mueven ahí; `solutions.ts` deja de tenerlos.
- **Sitemap:** se genera importando los módulos de contenido, como ya hace. Verificar que entren las URLs nuevas y salgan las viejas.
- **Redirecciones nuevas** en `http-policy.ts`, un solo salto:

| Desde | Hacia |
|---|---|
| `/soluciones/casos-de-uso/scrap` | `/guias/como-reducir-el-scrap` |
| `/soluciones/casos-de-uso/paradas` | `/guias/como-reducir-las-paradas-de-maquina` |
| `/soluciones/casos-de-uso/inventario-descuadrado` | `/guias/inventario-que-no-cuadra` |
| `/soluciones/casos-de-uso/recepcion` | `/guias/como-acelerar-la-recepcion-de-mercaderia` |
| `/soluciones/casos-de-uso/accidentes` | `/guias/prevenir-accidentes-en-planta-con-camaras` |
| `/soluciones/casos-de-uso` (si existe como índice) | `/guias` |

- **Enlaces que no pueden faltar:**
  - cada página de módulo → sus funcionalidades (bloque «Funcionalidades»);
  - cada funcionalidad → su módulo (miga de pan y enlace en el cuerpo), su guía y las industrias que nombra;
  - cada guía → su funcionalidad y su módulo, con el texto del enlace descriptivo (no «ver más»);
  - las industrias que se nombran en una funcionalidad → la funcionalidad.
- **Menú Soluciones:** donde hoy dice «Casos de uso», pasa a «Guías» con los mismos cinco enlaces a las URLs nuevas.

## 5. Plantilla de una página de funcionalidad

Los archivos `1x_` vienen con estos campos, en este orden. Son los mismos que usa `modules.ts`, así que la vista puede reutilizar componentes.

| Campo | Uso |
|---|---|
| `seoTitle` · `seoDescription` | Con `src/lib/seo.ts`. Title ≤ 60 caracteres, descripción ≤ 155 |
| `eyebrow` | Módulo · funcionalidad |
| `h1` · `lead` | El H1 lleva la búsqueda principal |
| `problem` | Lista de lo que pasa hoy |
| `does` | Cuatro bloques título + cuerpo; los títulos de los H2 se escriben como la pregunta del lector cuando corresponde |
| `capture` | Cómo se toma el dato: manual, automático, IA (cuando aplica) |
| `related` | Módulos o funcionalidades que se suman |
| `faq` | Preguntas frecuentes, también como `FAQPage` |
| `cta` | `CtaPair`, como el resto del sitio |
| `links` | Guía y módulo de destino |

**Schema:** `Service` + `FAQPage` + `BreadcrumbList`.
**Panel de producto:** captura real si existe (`docs/design/2026-11-03-capturas-que-necesita-el-sitio.md`); si no, panel rotulado «Datos de ejemplo», como en la referencia HTML.

## 6. Plantilla de una guía

| Elemento | Regla |
|---|---|
| H1 | La pregunta o el tema tal como se busca |
| Respuesta corta | Primer párrafo de 2 a 3 oraciones que responde la pregunta entera. Es lo que citan Google y los buscadores con IA |
| Cuerpo | H2 escritos como preguntas; tablas y ejemplos numéricos cuando sirven |
| Cierre | Un bloque «Cómo lo resuelve InspectIA» de 2 a 4 líneas con enlace a la funcionalidad |
| Fecha | «Actualizado el …» visible |
| Schema | `Article` + `BreadcrumbList`; `FAQPage` si la guía tiene preguntas frecuentes |

Las fórmulas van en texto plano o en un bloque propio, nunca como imagen.

## 7. Qué no se toca

- `CtaPair`, tokens de `src/tokens/`, el patrón de contenido en `src/content/` y `src/lib/seo.ts` como única forma de declarar el head.
- `AGENTS.md`: nada de reescribir historia publicada; la rama queda siempre funcional.
- Las páginas de industria y de IA, salvo el título de autopartista (archivo `01`).

## 8. Datos confirmados por dirección (11/11/2026)

1. Las paradas programadas se cargan en el calendario, como únicas o recurrentes, y no cuentan contra la disponibilidad (archivo `11`).
2. El dato de la línea se toma de donde esté: PLC, SCADA, otro sistema o un sensor que se suma (archivo `10`).
3. La promoción de tres meses sin cargo para clientes nuevos sigue vigente (archivo `14`).

No queda ninguna frase marcada [CONFIRMAR].

## 9. Cómo se sabe que salió bien

- Las 5 funcionalidades y las 8 guías responden, tienen miga de pan y están en `sitemap.xml`.
- Las 5 URLs de casos de uso devuelven 301 en un solo salto a su guía.
- Cada módulo con funcionalidades muestra el bloque «Funcionalidades».
- Title y descripción de cada página coinciden con los archivos, sin pasarse de largo.
- El schema valida en la prueba de resultados enriquecidos de Google.
- Se ve bien a 390 px de ancho.
- `npm run typecheck && npm run lint && npm run build` pasan y las páginas se abrieron.

Al terminar, dejar en la respuesta: qué rutas quedaron, qué redirecciones se agregaron, y cualquier desvío de este brief.
