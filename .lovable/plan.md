# Plan: Tarjetas interactivas Glassmorphism en hotspots

## Alcance
Reemplazar los tooltips actuales (texto pequeño cyan en hover) por **tarjetas flotantes Glassmorphism** que se abren al hacer hover o click sobre cada uno de los 7 puntos del mapa de la fábrica, mostrando la regla de negocio exacta provista. Añadir un CTA al pie del mapa.

## Cambios

### 1. `src/components/site/Hero.tsx`
- Reordenar el array de hotspots de **izquierda a derecha** (orden visual en el mapa) y reemplazar el label corto por un objeto `{ left, top, title, body }`:

  | # | Posición visual | Title | Coords actuales a usar |
  |---|---|---|---|
  | 1 | Recepción de Mercadería | "Software de Recepción" | left 33.5%, top 44.7% |
  | 2 | Línea de Producción (TYMEO OEE) | "Monitoreo de Productividad y Eficiencia" | 44.9% / 23.8% |
  | 3 | Estación de Inspección (QCaaS) | "Control de Calidad Automatizado" | 49.3% / 36.9% |
  | 4 | Racks de Altura / Drones | "Control de posiciones autónomo" | 57.6% / 13.8% |
  | 5 | Monitoreo de Productividad y Seguridad | "Cámaras + IA" | 64.7% / 45% |
  | 6 | App de control de stock | "Control de stock en posiciones" | 69.5% / 32.7% |
  | 7 | Zona de Armado de Pedidos | "Control de Armado de Pedidos" | 76.1% / 44.5% |

  (Mantengo las coordenadas ya calibradas en la última iteración; solo cambia el orden lógico/numeración y el contenido de cada tarjeta.)

- Reemplazar el `<span>` tooltip por una **tarjeta Glassmorphism** absolutamente posicionada sobre cada hotspot:
  - Fondo: `bg-[#084749]/70 backdrop-blur-xl` + borde `border-white/15` + sombra `shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]`.
  - Ancho fijo ~`w-72`, padding `p-4`, `rounded-xl`.
  - Contenido: número del nodo + título en cyan (`text-[#17ccd3] text-xs uppercase tracking-wider`) y cuerpo en blanco/muted (`text-sm text-foreground/90 leading-relaxed`).
  - Posicionada por defecto debajo del punto; para nodos cerca del borde derecho (6, 7) o el borde superior (4) se invierte el lado con clases condicionales (`right-0` / `bottom-full`) para que no se salga del contenedor.

### 2. Interactividad (hover + click) con framer-motion
- Estado local `const [activeIndex, setActiveIndex] = useState<number | null>(null)`.
- Cada hotspot:
  - `onMouseEnter` → set index, `onMouseLeave` → clear.
  - `onClick` → toggle (para mobile / persistencia).
- Animación de apertura con `AnimatePresence` + `motion.div`:
  - `initial={{ opacity: 0, y: 8, scale: 0.96 }}`
  - `animate={{ opacity: 1, y: 0, scale: 1 }}`
  - `exit={{ opacity: 0, y: 6, scale: 0.97 }}`
  - `transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}`
- Click fuera (overlay transparente sobre el contenedor del mapa cuando hay tarjeta abierta vía click) cierra la tarjeta.

### 3. CTA al pie del mapa
- Debajo del recuadro del mapa (dentro del mismo `max-w-5xl`), agregar:
  ```
  [ Ver Arquitectura de Integraciones Técnicas (WMS/PLC) → ]
  ```
- Botón `variant="outline"` cyan, redondeado, centrado, `mt-6`. Sin handler por ahora (placeholder, no se pidió destino).

### 4. Dependencia
- Instalar `framer-motion` si aún no está en `package.json` (verificar antes; si ya existe, se reutiliza).

## Fuera de alcance
- No se mueven las coordenadas de los puntos (ya fueron calibradas en la iteración previa).
- No se crea la página "Arquitectura de Integraciones" — solo el botón visual.
- No se tocan otros componentes (Navbar, TrustBar, etc.).
