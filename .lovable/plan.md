# Landing Page: Software de Recepción Logística

Nueva ruta independiente `/recepcion` reutilizando el Design System InspectIA (fondo `#041A1B`, superficies `#084749`, bordes `border-white/10`, acento `#17ccd3`, Poppins) y el patrón de composición ya usado en `/tymeo` (FadeInSection + secciones modulares).

## Ruta y estructura

Nueva ruta file-based: `src/routes/recepcion.tsx` con `head()` propio (title, description, og:title, og:description específicos de recepción — sin og:image en root/layout).

Componentes nuevos bajo `src/components/recepcion/`:

```text
recepcion/
  RecepcionLanding.tsx   # compone todas las secciones con FadeInSection
  Hero.tsx               # sección 1
  FeaturesBento.tsx      # sección 2
  DeploymentPlans.tsx    # sección 3
  ExpoyerBanner.tsx      # sección 4
  BottomCta.tsx          # sección 5
```

Se reutiliza:
- `Navbar` y `Footer` de `@/components/site/`
- `FadeInSection` de `@/components/tymeo/FadeInSection` (framer-motion, ya instalado)
- Tokens de color inline (`#041A1B`, `#084749`, `#17ccd3`) consistentes con el resto del sitio

## Secciones

### 1. Hero (50/50)
- **Izq**: badge cyan translúcido "INBOUND & RECEPCIÓN"; H1 con span "en segundos" con text-shadow/glow cyan; párrafo; CTAs "Agendar Demo" (cyan sólido) + "Ver Opciones de Despliegue" (ghost border-white/20).
- **Der**: card glassmorphism (`bg-white/5 backdrop-blur-xl border border-white/10`) simulando feed de cámara:
  - Fondo oscuro con "PALLET" central (SVG/CSS simple: rectángulos apilados representando cajas)
  - 3-4 bounding boxes cyan animadas (`border-2 border-[#17ccd3]` con pulse suave) sobre las cajas
  - Overlay HUD: badge "● LIVE", esquinas tipo mira, y en la parte inferior chip verde/cyan: **"MATCH WMS: 120/120 UNIDADES — APROBADO"**
  - Puntos de esquina en `#17ccd3`

### 2. Features Bento
Título centrado: "El fin del conteo manual ciego."

Grid asimétrico (`md:grid-cols-3 md:grid-rows-2`):
- **Card 1** (span 3 col, row 1) — "Conciliación Nativa API": ilustración inline SVG con nodos (Cámara → WMS/SAP) conectados por líneas cyan animadas + copy.
- **Card 2** (col 1-2 row 2) — "Cero Discrepancias": ícono Lucide (`ShieldCheck`) + copy sobre fatiga humana.
- **Card 3** (col 3 row 2) — "Lead Time Reducido": mini bar chart CSS (2 barras: 48h gris, 30h cyan con altura proporcional) + labels.

Todas: `bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8`.

### 3. Deployment Plans (2 tarjetas grandes)
Título: "Opciones de despliegue adaptadas a su volumen."

Grid `md:grid-cols-2 max-w-5xl gap-6`, ambas tarjetas grandes (`p-10`):

- **Izq — "Recepción Mobile"**: badge "Despliegue Inmediato" (cyan tenue), descripción, feature list con `Check` cyan (App móvil, Cero infra, Integración WMS, TTV < 7 días), CTA ghost "Consultar".
- **Der — "Recepción Continua"** (destacada): `border-2 border-[#17ccd3] shadow-[0_0_60px_rgba(23,204,211,0.25)] md:scale-[1.02]`, badge superior "ALTO VOLUMEN", features (Cámaras alta velocidad, Integración cinta, Conteo continuo, Reducción masiva FTEs), CTA cyan sólido.

Sin precios; ambas apuntan a `#demo`.

### 4. Banner Expoyer
Banner horizontal `bg-[#084749] border border-white/10 rounded-3xl p-10` con etiqueta "CASO DE ÉXITO — EXPOYER" y 3 métricas gigantes en grid:

- `24 → 15 FTEs` (Reducción de headcount)
- `−40%` (Lead Time)
- `+$240k USD` (Capital Liberado)

Números en `text-4xl md:text-5xl font-bold text-[#17ccd3]`. CTA secundario ghost con `ArrowRight`: **"Simular ROI para mi operación →"** que enlaza con `<Link to="/roi">` (indica textualmente que lleva al simulador).

### 5. Bottom CTA
Reutiliza el patrón de `tymeo/BottomCta.tsx` adaptado: card `#084749` con glow cyan superior, H2 "¿Listo para auditar su próxima recepción?", CTAs "Agendar Demo Técnica" (cyan) + "Hablar con Ingeniería" (ghost).

## Detalles técnicos

- **Routing**: `createFileRoute("/recepcion")` — la Vite plugin regenera `routeTree.gen.ts` automáticamente. No se edita a mano.
- **Head metadata**: title y description específicos ("Software de Recepción con IA — InspectIA"), og:title/og:description propios. Sin og:image (se omite si no hay imagen específica).
- **Responsive**: mobile-first. Hero apila (`grid-cols-1 lg:grid-cols-2`). Bento colapsa a una columna en `< md`. Planes stack en mobile.
- **Animaciones**: cada sección envuelta en `<FadeInSection>` (fade-in + translateY). Bounding boxes del hero con `animate-pulse` Tailwind. Bar chart con transición `height` CSS.
- **Sin imágenes generadas**: el visual del hero y los gráficos son puro CSS/SVG inline para mantener el build ligero y coherente con el estilo Voxel-like ya presente en el sitio.
- **Sin backend**: es solo frontend/presentación. No se toca Lovable Cloud.

## Enlace desde el resto del sitio
Fuera de scope de este plan (no se pidió). Si querés, después agrego un link en Navbar/Footer o desde `AudienceTabs` de la home.

## Archivos a crear
- `src/routes/recepcion.tsx`
- `src/components/recepcion/RecepcionLanding.tsx`
- `src/components/recepcion/Hero.tsx`
- `src/components/recepcion/FeaturesBento.tsx`
- `src/components/recepcion/DeploymentPlans.tsx`
- `src/components/recepcion/ExpoyerBanner.tsx`
- `src/components/recepcion/BottomCta.tsx`

## Archivos NO tocados
- `routeTree.gen.ts` (regenerado automáticamente)
- Home, ROI, Tymeo y componentes existentes permanecen intactos.
