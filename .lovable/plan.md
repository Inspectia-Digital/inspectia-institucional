# Landing Page TYMEO OEE — `/tymeo`

Nueva página de producto en la ruta `/tymeo`, reutilizando `Navbar` y `Footer` existentes, con el mismo Design System Voxel AI usado en `/roi` (fondo `#041A1B`, superficies `#084749/40` glass, acento cyan `#17ccd3`, tipografía Poppins). Animaciones de scroll con `framer-motion` (ya instalado).

## Archivos a crear

### 1. `src/routes/tymeo.tsx`
Route file con `head()` SEO específico:
- title: "TYMEO OEE — Productividad en tiempo real | InspectIA"
- description: "Mide el OEE de tu planta en tiempo real. Empieza gratis con formularios móviles o escala a integración PLC en menos de 15 días."
- og:title / og:description equivalentes.

Renderiza `<Navbar />`, `<TymeoLanding />`, `<Footer />` con `bg-[#041A1B] text-white font-[Poppins]`.

### 2. `src/components/tymeo/TymeoLanding.tsx`
Componente contenedor que importa y ordena las 6 secciones. Cada sección envuelta en `<FadeInSection>`.

### 3. `src/components/tymeo/FadeInSection.tsx`
Wrapper `motion.div` con `initial={{opacity:0, y:24}}`, `whileInView={{opacity:1, y:0}}`, `viewport={{once:true, amount:0.2}}`, `transition={{duration:0.6, ease:"easeOut"}}`. Acepta `className` y `children`.

### 4. Secciones (un archivo por sección, en `src/components/tymeo/`)

#### `Hero.tsx`
- `grid lg:grid-cols-2 gap-12 py-20`.
- Izquierda: badge cyan `bg-[#17ccd3]/10 text-[#17ccd3] border border-[#17ccd3]/30 rounded-full px-3 py-1 text-xs uppercase`, H1 con `max-w-xl` y "tiempo real" envuelto en `<span class="bg-gradient-to-r from-[#17ccd3] to-emerald-300 bg-clip-text text-transparent">`, párrafo `text-slate-400`, dos CTAs (primario cyan sólido con shadow glow → link a `/auth` placeholder `#crear-cuenta`; secundario ghost outline `border-slate-500`).
- Derecha: contenedor con glow (`absolute -inset-10 bg-[#17ccd3]/20 blur-3xl rounded-full`) detrás de una composición mock construida con divs/SVG: tablet rectangular `rounded-3xl bg-[#084749] border border-white/10` con "Worker View" (botones grandes "Iniciar Orden", "Fin de Lote", "Motivo de Parada"); detrás-derecha un dial circular SVG con "OEE 88.5%" y líneas hacia un ícono `Cpu`/sensor IoT. Sin imágenes raster — todo SVG/Tailwind.

#### `IntegrationsBar.tsx`
- `bg-[#020d0e] py-8 -mx-4` full-bleed.
- Texto centrado pequeño `text-slate-500 text-sm`.
- Fila flex justify-center gap-10 con nombres en texto `text-slate-500/50 font-semibold tracking-wide` (SAP, Cygnus WMS, Balluff, Siemens PLC, Allen Bradley). Sin logos raster — solo wordmarks tipográficos.

#### `ZigZag.tsx`
- 3 bloques map. Layout `grid lg:grid-cols-2 gap-12 items-center`, alternando `lg:flex-row-reverse` (impl. con `order-1 lg:order-2` en imagen para steps 1 y 3 vs paso 2).
- Cada bloque: chip "Paso 0X" cyan, H3, párrafo, visual mock (todo Tailwind/SVG):
  - Paso 1: mock tablet con grid 2×2 de botones grandes ("Mantenimiento", "Falta de Material", "Cambio de Formato", "Calidad") en `bg-[#084749] border border-white/10 rounded-2xl p-4`.
  - Paso 2: blueprint oscuro `bg-[#020d0e] border border-[#17ccd3]/20 rounded-3xl p-6` con grid de puntos y nodos `circle` SVG conectados por líneas cyan (Hardware → Edge → Cloud).
  - Paso 3: dashboard mock con barras `<div>` cyan/red de alturas variables + un KPI "OEE 88.5%".

#### `Pricing.tsx`
- Título centrado.
- Grid `md:grid-cols-3 gap-6 items-stretch`. Card central `md:scale-105 border-[#17ccd3] shadow-[0_0_60px_rgba(23,204,211,0.25)]`.
- Cada card: nombre, precio grande, descripción, lista de features con check cyan (`Check` de lucide), botón.
- Datos exactos del prompt. Starter botón ghost outline, Pro botón cyan sólido, Enterprise botón outline blanco.

#### `RoiTtv.tsx`
- `grid md:grid-cols-2 gap-6`.
- Tarjeta izquierda (ROI): glass card con título "El impacto de mover la aguja.", copy del prompt, `<Link to="/roi">` estilizado como botón cyan outline "Calcular el ROI de mi línea".
- Tarjeta derecha (TTV): glass card con título "Resultados en < 15 días.", subtítulo, timeline horizontal de 3 pasos (números cyan en pill + label + línea de conexión `border-t border-dashed border-[#17ccd3]/40`).

#### `BottomCta.tsx`
- Contenedor centrado `bg-[#084749] border border-white/10 rounded-3xl p-12 text-center max-w-5xl mx-auto`, glow cyan opcional.
- H2, dos CTAs.

## Wiring del Navbar
Solo cambio mínimo: el item "TYMEO" del dropdown Productos sigue siendo un `<a href="#">`. **Fuera de alcance** — no se cambia para no tocar el menú existente, salvo que se solicite explícitamente.

## Reglas técnicas

- Importar `motion` desde `framer-motion` (ya en package.json `^12.40.0`).
- Cero imágenes nuevas (raster). Mocks visuales con SVG inline + divs Tailwind.
- Iconos lucide: `Check`, `ArrowRight`, `Cpu`, `BarChart3`, `Wrench`, `LayoutDashboard`.
- Tipografía Poppins ya está cargada vía la página `/` (mismo wrapper `font-[Poppins]`).
- Responsive: todo collapsa a una columna `< md:`. Hero y zig-zag `lg:grid-cols-2`. Pricing `md:grid-cols-3`. Imagen mock del hero se oculta `< lg:` no — se muestra debajo con `min-h` razonable.
- Padding generoso: secciones `py-20 md:py-24`, contenedor `max-w-6xl mx-auto px-4`.
- Botones reutilizan estilo de `LeadForm` (rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)]).

## Fuera de alcance

- Lógica de signup/auth real (CTAs apuntan a `#` o anclas locales salvo el de ROI que va a `/roi`).
- Cambios en `Navbar`, `Footer`, página `/`, o `/roi`.
- Imágenes raster nuevas / generación con imagegen.
- Backend, payments, formularios funcionales.
