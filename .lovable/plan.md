# Plan: Interactive Product Walkthrough (5 módulos de InspectIA OS)

Nueva sección de alto impacto, estética premium estilo Voxel AI, ubicada en la Home **entre `MoatBento` y `AudienceTabs`** en `src/routes/index.tsx`.

## 1) Nuevo componente `src/components/site/ProductWalkthrough.tsx`

Sección self-contained con fondo `bg-[#041A1B]`, tipografía Poppins (ya cargada en `__root.tsx`) forzada vía `font-[Poppins]` en el wrapper para garantizar consistencia.

### Encabezado
- H2: "La Suite de Módulos de InspectIA OS en Acción" (`text-3xl md:text-4xl font-bold text-white`).
- Subtítulo: párrafo `text-slate-400 mt-2 max-w-3xl`.
- Centrado, `max-w-6xl mx-auto px-4 py-16 md:py-24`.

### Layout 40/60 desktop, stack en mobile
Contenedor: `grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8 mt-12`.

### Columna izquierda — Tabs verticales
- Desktop: `hidden lg:flex flex-col space-y-3`.
- Cada tab es un `<button>`:
  - Estado activo: `bg-[#084749] border-l-4 border-[#17ccd3] text-white`.
  - Inactivo: `bg-transparent border-l-4 border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]`.
  - Padding `p-5`, rounded a la derecha `rounded-r-2xl`, transición suave.
  - Contenido: grid de 2 cols `auto 1fr` con número `01`–`05` en `text-[#17ccd3] text-sm font-semibold tracking-wider`, y bloque con título (`text-lg font-bold`) + subtexto (`text-sm text-slate-400 mt-1`).

- Mobile: `flex lg:hidden overflow-x-auto select-none flex-row whitespace-nowrap gap-2 pb-2 -mx-4 px-4`.
  - Cada chip: pill `rounded-full px-4 py-2 text-sm`, activo `bg-[#084749] text-white border border-[#17ccd3]`, inactivo `text-slate-400 border border-white/10`.
  - Solo muestra número + título corto.

### Columna derecha — Showcase Bento dinámico
- Contenedor fijo: `rounded-3xl bg-[#084749]/20 border border-white/10 overflow-hidden p-6 shadow-2xl min-h-[460px] flex flex-col`.
- `AnimatePresence mode="wait"` envolviendo un `motion.div` keyado por el tab activo.
  - `initial={{ opacity: 0, y: 16 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -8 }}`, `transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}`.
- Estructura interna por slide:
  1. **Mockup visual** (área principal `flex-1 rounded-2xl bg-[#041A1B] border border-white/5 p-4 relative overflow-hidden`).
  2. **Texto descriptivo** debajo (`mt-4 text-sm md:text-base text-slate-300 leading-relaxed`).

### Mockups (puro CSS/SVG, sin assets externos)
Cada mockup se construye con Tailwind + SVG inline para mantenerlo liviano y temático:

- **01 Recepción:** grid de 4 "dock lanes" con `<Truck>`/`<Package>` lucide; bounding boxes cyan (`border border-[#17ccd3] rounded-md` con label `SKU-####`); barra inferior verde con dot pulsante: `SKU VERIFIED — WMS API: CONNECTED`.
- **02 TYMEO OEE:** dashboard con (a) gauge circular SVG cyan mostrando "OEE 88.5%", (b) barras horizontales de tiempos de ciclo, (c) lista con dots de estado (Línea A run / Línea B paused) + chip "Bottleneck detected: Estación 3".
- **03 Calidad:** canvas oscuro con producto centrado, líneas de escaneo cyan horizontales animadas (`animate-pulse` o keyframe simple), banner superior verde brillante `PLC SIGNAL: DISCARD EXECUTED — 0% scrap tolerance`.
- **04 Productividad y Seguridad:** mock de feed CCTV (placeholder con gradient + silueta `User` lucide), bounding boxes verdes `EPP: OK` sobre casco/chaleco, overlay de heatmap (gradiente radial rojo→amarillo→transparente), badge rojo parpadeante `Acceso No Autorizado · Zona Restringida`.
- **05 Stock y Despachos:** grid 2x2 con (a) rack 3D iso (CSS perspective) + dron silhouette + códigos base64; (b) wireframe app móvil con lista de SKUs; (c) banner top `Canal Verde · Aprobación WMS`; (d) chip alterno `Canal Rojo · Discrepancia`.

Cada mockup se aísla como subcomponente local (`function Mock01()`, etc.) dentro del mismo archivo para evitar archivos extra.

### Estado
- `const [active, setActive] = useState<TabKey>("recepcion")`.
- Array `MODULES` con `{ key, number, title, sub, body }` y `mockup: ReactNode`. Render condicional por `key`.

## 2) Wire-up en `src/routes/index.tsx`

Insertar `<ProductWalkthrough />` entre `<MoatBento />` y `<AudienceTabs />`:

```text
Hero → TrustBar → MoatBento → ProductWalkthrough → AudienceTabs
```

## 3) Fuera de alcance

- Sin nuevos tokens en `styles.css` (se usan HEX inline igual que en otras secciones).
- Sin assets de imagen externos (todos los mockups son SVG/Tailwind inline).
- Sin lógica de submit ni navegación a páginas de módulo (futuro).
- No se modifican Hero, TrustBar, MoatBento, AudienceTabs.

## Notas técnicas

- Animación con `framer-motion` (ya instalado, usado en `AudienceTabs`).
- Iconos lucide: `Truck`, `Package`, `Activity`, `ScanLine`, `ShieldCheck`, `HardHat`, `Boxes`, `Plane`, etc.
- Poppins ya está en `__root.tsx`; se aplica con `className="font-[Poppins]"` en el wrapper.
- Accesibilidad: tabs como `<button role="tab" aria-selected>` dentro de `role="tablist"`; panel con `role="tabpanel"`.
