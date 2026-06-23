# Plan: Cascarón base + Landing Hero de InspectIA

Construir el shell visual y la home de una plataforma SaaS de visión artificial industrial, con estética dark premium tipo Voxel/Scale AI.

## 1. Sistema de diseño (src/styles.css + __root.tsx)

- Cargar **Poppins** (400/500/600/700) vía `<link>` a Google Fonts en el `head` del root route (no `@import` en CSS — Tailwind v4 + Lightning CSS no resuelve URLs remotas).
- Tokens semánticos en `@theme inline` + `:root` (oklch), reemplazando los actuales:
  - `--background` → #041A1B
  - `--card` / superficie bento → #084749
  - `--primary` (acento cyan) → #17ccd3, `--primary-foreground` oscuro
  - `--foreground` blanco, `--muted-foreground` ≈ #94A3B8
  - `--border` blanco @ 10%
  - `--font-sans: "Poppins", sans-serif`
  - Extras: `--shadow-glow: 0 0 15px rgba(23,204,211,0.2)`, `--gradient-accent` (blanco → cyan) para texto.
- Aplicar `font-sans` y dark base al `body`. Eliminar la pieza placeholder `#fcfbf8` en `routes/index.tsx`.

## 2. Navbar flotante (src/components/site/Navbar.tsx)

- Sticky top con `mt-4 mx-auto max-w-6xl`, `rounded-full`, `backdrop-blur-md`, `bg-white/5`, `border border-white/10`, padding horizontal generoso.
- Izquierda: wordmark "InspectIA" Poppins bold + punto cyan.
- Centro: `NavigationMenu` (shadcn) con:
  - **Productos** → dropdown 2 columnas: *Manufactura* (Control de Calidad, OEE Control, TYMEO) · *Logística* (Drones de Inventario, App Control de Stock, Recepción de Mercadería, Control de Pedidos).
  - **Soluciones** → lista (Logística, Automotriz, Autopartista, Alimentos, Textil).
  - **Tecnología**, **Institucional** → links simples.
- Derecha: botón ghost "Ingresar" + CTA "Agendar Demo" (`bg-primary text-primary-foreground rounded-full shadow-[var(--shadow-glow)]`).
- Mobile: colapsar centro en `Sheet`/menú hamburguesa (versión simple).

## 3. Hero (src/components/site/Hero.tsx)

- Sección centrada con padding vertical amplio.
- **Badge**: pill `bg-card border border-white/10 text-white text-sm` con el copy de repago < 6 meses.
- **H1** Poppins bold ~text-5xl/6xl, centrado. La frase "Resultados a partir de los 15 días" envuelta en un `<span>` con `bg-gradient-to-r from-white to-[#17ccd3] bg-clip-text text-transparent`.
- **H2** centrado `max-w-3xl text-muted-foreground` con el párrafo de visión artificial/drones/PLC/WMS/ERP/MES/TMS.
- **CTAs** centrados, fila con gap:
  - Primario "Agendar Demo" → cyan + icono `ArrowRight`.
  - Secundario "Calcular mi ROI" → outline cyan + icono `Calculator`.
- **Visual computer-vision** debajo:
  - Contenedor `max-w-5xl rounded-3xl overflow-hidden border border-white/10 relative aspect-[16/9]`.
  - Imagen Unsplash oscura de planta/almacén automatizado (URL directa, sin descarga). Overlay degradado oscuro para legibilidad.
  - Overlays absolutos:
    - Bounding box: `div` con `border border-[#17ccd3] rounded-md` posicionado sobre un pallet, con label flotante "Pallet Verified: 99.9% Accuracy" (chip cyan/oscuro).
    - Tarjeta glass izquierda (`backdrop-blur bg-white/5 border border-white/10 rounded-2xl p-4`): "Módulo Logístico Activo — API Connected: WMS Cygnus" con dot cyan.
    - Tarjeta glass derecha: "Defectos en Línea: 0" + dot verde con animación `animate-pulse`.

## 4. Franja de respaldo (src/components/site/TrustBar.tsx)

- Inmediatamente debajo del visual.
- Texto pequeño centrado `text-slate-500`: "Infraestructura, validación científica y confianza enterprise:".
- Una sola fila horizontal con los 19 nombres como wordmarks de texto (Poppins 500, `text-slate-400/60 grayscale opacity-60 hover:opacity-100 transition`), separados por gap amplio, con `overflow-x-auto` o `flex-wrap justify-center` en mobile. Renderizados como texto (no logos reales) para mantener consistencia y evitar assets faltantes.

## 5. Ensamblaje

- `src/routes/index.tsx`: head SEO con título "InspectIA — Inteligencia Artificial Industrial" y meta description acorde; H1 único; layout `<Navbar /> <main><Hero /><TrustBar /></main>`.
- Sin lógica de negocio, sin backend, sin rutas extra (solo shell + home).

## Detalles técnicos

- Stack: TanStack Start v1 + Tailwind v4 + shadcn ya presentes. No tocar `routeTree.gen.ts`.
- Iconos: `lucide-react` (ArrowRight, Calculator, ChevronDown, Menu).
- Componentes shadcn a usar/instalar si faltan: `navigation-menu`, `button`, `sheet`. Verificar antes de añadir.
- Sin hardcodear colores en clases (`text-white` ok como neutro, pero acentos/superficies vía tokens `bg-primary`, `bg-card`, `border-border`).
- Fuente cargada por `<link>` en `__root.tsx` (preconnect + stylesheet), nunca `@import` URL en `styles.css`.

## Fuera de alcance (siguientes pasos)

- Páginas internas de Productos/Soluciones/Tecnología/Institucional.
- Formulario real de "Agendar Demo" y calculadora de ROI.
- Animaciones avanzadas (Framer Motion) más allá de `animate-pulse`.
