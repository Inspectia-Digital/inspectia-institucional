# Actualizar /tymeo con la nueva visión del producto

El prototipo trae la visión nueva de TYMEO (plataforma modular de planta, no solo OEE) con una estructura de planes concreta. Se toma su **contenido y estructura**, y se descarta su estética (fondo azul #0B1E33, Space Grotesk / IBM Plex, verde menta): todo se reconstruye con el sistema de diseño actual — Poppins, fondo #041A1B, superficies Bento #084749, acento cyan #17ccd3, tarjetas glassmorphism y animaciones framer-motion, igual que el resto del sitio.

## Nueva estructura de la página

1. **Hero (rehecho)** — nuevo mensaje: "Todo lo que pasa en tu planta, en un solo lugar". Subtítulo sobre OEE en tiempo real, turnos, paradas, personal y producción, sin planillas. CTAs: "Empezar gratis" (a planes) y "Ver qué incluye cada plan". Micro-confianza: sin tarjeta de crédito / implementación en días si hace falta hardware.
   Visual: se reemplaza la tablet actual por una **tarjeta de medidor OEE en vivo** (gauge semicircular 87.4%, meta de planta 78%, badge EN VIVO parpadeante y desglose Disponibilidad / Rendimiento / Calidad), en SVG con los colores del sistema.
2. **Barra de integraciones** — se mantiene la actual.
3. **Sección Zig-Zag** — se mantiene, con copy ajustado a la visión modular (medir hoy por formulario → automatizar con sensores → operar toda la planta).
4. **Planes (reemplaza el Pricing actual)** — 4 planes: Free (gratis, 1 planta / 1 línea / 1 usuario, registro manual), **Start (USD 35/mes, destacado)**, Pro (USD 150/mes, multi-planta) y Enterprise (a medida). Free y Start incluyen **add-ons opcionales de USD 10/mes** con checkboxes; el precio del plan se recalcula en vivo al tildarlos (estado React local, sin backend).
5. **Comparativa módulo por módulo (nueva)** — tabla de 12 módulos × 4 planes con chips Incluido / Add-on / No disponible, scroll horizontal en mobile, con leyenda. Textos "en criollo" del prototipo.
6. **Implementación / hardware (nueva)** — aclaración de que el precio es solo software, con los dos caminos: "Lo hacés vos" y "Lo hacemos nosotros" (se cotiza aparte).
7. **FAQ (nueva)** — acordeón con las preguntas del prototipo (subir de plan, Free sin hardware, instalación no incluida, más plantas/usuarios).
8. **Validación ROI/TTV** y **RelatedLinks** — se mantienen.
9. **CTA final** — copy nuevo: "Empezá a medir hoy. Sin tarjeta, sin instalar nada."

## Enlaces y CTAs

Los CTAs siguen las reglas ya definidas del sitio: "Hablar con ventas" / "Consultar" / demos van a la URL centralizada de agenda (`DEMO_URL` en `src/lib/links.ts`); "Empezar gratis" hace scroll al ancla de planes hasta que exista el registro real.

## Detalle técnico

- Nuevos componentes en `src/components/tymeo/`: `PlansAddons.tsx` (planes + calculadora de add-ons), `ModulesTable.tsx`, `Implementation.tsx`, `Faq.tsx`, y un `OeeGaugeCard.tsx` usado por el Hero.
- Se reescriben `Hero.tsx` y `BottomCta.tsx` de tymeo; `Pricing.tsx` queda reemplazado por `PlansAddons.tsx`.
- `TymeoLanding.tsx` se recompone con el nuevo orden y `FadeInSection`.
- Acordeón FAQ con el `Accordion` de shadcn ya disponible; nada de CSS/JS del prototipo se copia.
- Se actualizan título y descripción SEO de `src/routes/tymeo.tsx` al nuevo posicionamiento y se añade JSON-LD de FAQ.
- Sin cambios de backend ni de datos: precios y módulos viven como constantes tipadas en los componentes.

## Preguntas abiertas (se puede ajustar después)

Los precios USD 35 / 150 / add-ons USD 10 se toman literales del prototipo; si son provisorios, se cambian en un solo archivo.
