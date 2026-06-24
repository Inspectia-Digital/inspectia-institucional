# Plan: Bento Box "The Moat" + Tabs por perfil

Agregar dos secciones nuevas justo debajo del mapa interactivo del Hero, antes de `TrustBar`, en `src/routes/index.tsx`.

## 1) Nuevo componente `src/components/site/MoatBento.tsx`

Sección con título centrado y grilla asimétrica tipo Bento.

- Título h2: "La capa de inteligencia que unifica el control de tus procesos" (mismo tratamiento tipográfico del Hero: gradient en remate corto).
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6`.
- Cards: `rounded-3xl bg-[#084749] border border-white/10 text-white p-6 md:p-8`, hover sutil (`hover:border-white/20 transition`).
- Estructura de cada card: eyebrow chip (ícono lucide + label corta), `h3` (título), `p` (texto).

Distribución:

```text
┌───────────────────────────────┬───────────────────┐
│ Convertimos la operación en   │ Hardware          │
│ datos  (md:col-span-2)        │ Agnóstico         │
├───────────────────────────────┴───────────────────┤
│ Resultados concretos en tiempo récord (col-span-3)│
└───────────────────────────────────────────────────┘
```

Iconos lucide: `Database` (grande), `Cable` (agnóstico), `Zap` (resultados). Textos exactos los provistos por el usuario.

## 2) Nuevo componente `src/components/site/AudienceTabs.tsx`

- Título h2: "Soluciones diseñadas para tus objetivos métricos".
- `Tabs` de shadcn (`@/components/ui/tabs`) con dos triggers: "Manufactura y Calidad" / "Logística y Supply Chain". `TabsList` centrado, estilo dark adaptado (`bg-white/5 border border-white/10 rounded-full p-1`, trigger activo `data-[state=active]:bg-[#17ccd3] data-[state=active]:text-[#041A1B]`).
- Cada `TabsContent` envuelto en `motion.div` (framer-motion, `AnimatePresence mode="wait"` por el value activo) con fade + slide suave (mismo easing que las hotspot cards: `[0.22,1,0.36,1]`, ~0.25s).
- Layout del contenido: card `rounded-3xl bg-[#084749] border border-white/10 p-8 md:p-10`, grid `md:grid-cols-[auto_1fr_auto]` con icono grande a la izquierda (lucide `Factory` / `Warehouse`), bloque de texto al centro (subtítulo de audiencia + párrafo con foco en scrap/OEE/24-7 o descuadres/auditorías/capital inmovilizado), y CTA a la derecha.
- CTA: `Button` con clase `bg-[#17ccd3] text-[#041A1B] hover:bg-[#17ccd3]/90 rounded-full font-semibold` y label correspondiente ("Solicitar visita sin cargo a la planta" / "...al CD").

## 3) Wire-up en `src/routes/index.tsx`

Orden dentro de `<main>`: `Hero` → `MoatBento` → `AudienceTabs` → `TrustBar`. Spacing vertical consistente con el resto (`py-16 md:py-24`, `max-w-6xl mx-auto px-4`).

## Fuera de alcance

- No se toca Hero, TrustBar, ni tokens globales.
- Sin lógica de submit en los CTAs (solo botones visuales por ahora).
- Sin colores nuevos en `styles.css`: se usan los HEX pedidos (`#084749`, `#17ccd3`) inline tal como ya hace Hero.
