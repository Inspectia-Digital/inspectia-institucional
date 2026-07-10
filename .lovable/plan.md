# Landing Page: App de Control de Stock y Picking con IA

Nueva ruta independiente `/stock-picking` siguiendo el mismo patrón modular de `/recepcion` y `/tymeo`, con el Design System InspectIA (fondo `#041A1B`, superficies `#084749`, bordes `border-white/10`, acento `#17ccd3`, Poppins) y `framer-motion` vía `FadeInSection`.

## Ruta y estructura

Nueva ruta file-based: `src/routes/stock-picking.tsx` con `head()` propio (title, description, og:title/og:description específicos). Sin `og:image`.

Componentes nuevos bajo `src/components/stock/`:

```text
stock/
  StockLanding.tsx       # compone las secciones con FadeInSection
  Hero.tsx               # sección 1 — mockup mobile
  FeaturesBento.tsx      # sección 2 — 3 tarjetas Bento
  PricingPlans.tsx       # sección 3 — Starter vs Connected
  ImpactBanner.tsx       # sección 4a — banner impacto + CTA ROI
  BottomCta.tsx          # sección 4b — CTA final
```

Se reutiliza: `Navbar`, `Footer`, `FadeInSection` de `tymeo/`.

## Secciones

### 1. Hero (50/50)
- **Izq**: badge cyan translúcido "INVENTARIO & PICKING"; H1 "No escanee códigos. Cuente el **stock real** con una simple foto." con gradiente cyan (`bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent`) sobre "stock real"; párrafo `text-slate-400`; CTAs "Probar App Gratis" (cyan sólido) + "Agendar Demo Integrada" (ghost).
- **Der**: mockup de smartphone construido en puro CSS/SVG:
  - Contenedor con resplandor cyan (`blur-3xl bg-[#17ccd3]/25`) detrás.
  - Frame de phone: `rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-slate-900 to-black shadow-2xl`, notch superior, aspect ratio ~9:19.
  - Pantalla interior: fondo dark con status bar simulado (hora, ícono batería/señal), header app (logo InspectIA + "Depósito · Rack B-04").
  - Zona "cámara en vivo": grid CSS de cajas (SVG con rectángulos apilados en 3 filas de estilo pallet) sobre fondo gris oscuro; 6-8 bounding boxes cyan `border-2 border-[#17ccd3]` con `animate-pulse` y esquinas resaltadas.
  - Pop-up inferior sobre pantalla: card `bg-[#084749]/90 backdrop-blur border border-[#17ccd3]/40 rounded-2xl p-3` con texto "Conteo IA: **42 Unidades** · WMS Esperado: 42" y chip verde "MATCH EXACTO ✅".
  - Mobile: el mockup se centra debajo y reduce a max-width ~280px.

### 2. Features Bento
Título centrado: "Más que un escáner. Un auditor de inventario en su bolsillo."

Grid `md:grid-cols-2` con primera card `md:col-span-2`:
- **Card 1 (full-width)** — "Conteo Oportunístico Inteligente": icono `Scan` + inline SVG a la derecha ilustrando "recorrido de picking → foto → update WMS" con nodos cyan conectados por líneas dashed animadas.
- **Card 2 (½)** — "Validación Física, no solo digital": icono `Eye` cyan + copy comparando láser vs visión.
- **Card 3 (½)** — "Integración Nativa API": icono `Plug` cyan + tres chips pequeños ("Cygnus", "SAP", "Otros WMS") con línea de estado verde "Canal Verde" y roja "Canal Rojo".

Estilo card: `bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8`.

### 3. Pricing Plans (2 niveles)
Título: "Escale la digitalización de su equipo." + subtítulo corto.

Grid `md:grid-cols-2 gap-6 max-w-5xl`:
- **App Starter** (izq): badge "Rápida Adopción" (cyan tenue), descripción, features con `Check` cyan (Conteo por IA desde cámara móvil, Registro digital de posiciones, Exportación CSV/Excel, Soporte estándar), CTA ghost "Descargar y Probar".
- **App Connected** (der, destacada): `border-2 border-[#17ccd3] shadow-[0_0_60px_rgba(23,204,211,0.25)] md:scale-[1.02]`, badge superior "MÁS ELEGIDO", features (Todo lo de Starter + Integración API bidireccional WMS + Alertas Canal Rojo/Verde en tiempo real + Entrenamiento IA SKUs personalizados), CTA cyan sólido "Contactar a Ingeniería".

Sin precios; ambos CTAs a `#demo`.

### 4a. Impact Banner
Banner `bg-[#084749] border border-white/10 rounded-3xl p-10` con:
- Copy grande: "Reasigne a sus operarios a tareas de valor. Multiplique **x2** la velocidad de auditoría de su depósito." (el "x2" en cyan gigante).
- CTA intermedio con `<Link to="/roi">`: icono `Calculator` + "Simular ROI de la App →".

### 4b. Bottom CTA
Card final `bg-[#084749]` con glow cyan superior:
- H2: "¿Listo para erradicar el descuadre de inventario? Implemente la App en su primer turno mañana mismo."
- Botón grande cyan "Crear Cuenta de Empresa" + botón ghost "Agendar Demo".

## Detalles técnicos

- **Routing**: `createFileRoute("/stock-picking")` — el plugin regenera `routeTree.gen.ts` automáticamente.
- **Head metadata**: title "App de Control de Stock y Picking con IA — InspectIA", description enfocada en conteo por visión + integración WMS.
- **Responsive**: mobile-first. Hero apila (`grid-cols-1 lg:grid-cols-2`); el mockup del phone se centra y limita su ancho (~260-280px) en mobile. Bento colapsa a 1 columna en `< md`. Planes stack en mobile.
- **Animaciones**: `FadeInSection` en cada bloque; bounding boxes con `animate-pulse` Tailwind; líneas dashed del SVG con `stroke-dasharray` + animación CSS.
- **Sin imágenes generadas**: mockup del teléfono y todos los visuales son CSS/SVG inline.
- **Sin backend**: puro frontend.

## Archivos a crear
- `src/routes/stock-picking.tsx`
- `src/components/stock/StockLanding.tsx`
- `src/components/stock/Hero.tsx`
- `src/components/stock/FeaturesBento.tsx`
- `src/components/stock/PricingPlans.tsx`
- `src/components/stock/ImpactBanner.tsx`
- `src/components/stock/BottomCta.tsx`

## Archivos NO tocados
- `routeTree.gen.ts` (regenerado automáticamente).
- Home, `/roi`, `/tymeo`, `/recepcion` y componentes existentes permanecen intactos.

## Fuera de scope
- No se agrega link desde Navbar/Footer/Home a la nueva ruta (avisar si se desea).
