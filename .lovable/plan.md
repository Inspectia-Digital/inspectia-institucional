# Plan: Página `/roi` — Central de Simulación Financiera

Nueva ruta independiente `/roi` con el Simulador de ROI de Control de Calidad totalmente funcional, más tabs placeholder para los otros 3 módulos, CTA visible "Calcular ROI" en el Navbar, y un CTA paralelo de "Solicitar Demo" vinculado a Google Calendar.

## 1) Navbar — agregar CTA "Calcular ROI"

`src/components/site/Navbar.tsx`:
- A la derecha, antes de "Ingresar", insertar `<Link to="/roi">` estilo botón outline cyan (`border-[#17ccd3] text-[#17ccd3] hover:bg-[#17ccd3]/10 rounded-full`), copia **"Calcular ROI"**. Visible desktop (`hidden md:inline-flex`).
- En `Sheet` mobile, agregar item destacado "Calcular ROI" → `/roi`.

## 2) Nueva ruta `src/routes/roi.tsx`

- `createFileRoute("/roi")` con `head()` propio.
- `<Navbar />` reutilizado + `<main className="bg-[#041A1B] font-[Poppins] min-h-screen text-white">`.
- Hero centrado: H1 "Simulador de Impacto Financiero y ROI" + subtítulo del brief.

## 3) Componentes nuevos

### `src/components/roi/RoiSimulator.tsx`
- shadcn `Tabs` horizontal centrado, 4 triggers:
  1. **Control de Calidad** (funcional).
  2. **TYMEO OEE** → `<ComingSoonPanel />` "Próximamente disponible — Módulo en fase de calibración de downtime".
  3. **Recepción y Docks** → placeholder.
  4. **Stock y Despachos (Drones/App)** → placeholder.
- Tabs: pista `bg-[#084749]/40 border border-white/10 rounded-full p-1`, activo `data-[state=active]:bg-[#17ccd3] data-[state=active]:text-[#041A1B]`.

### `src/components/roi/ComingSoonPanel.tsx`
- Bento glass con icono lucide `Construction` cyan + copia por prop.

### `src/components/roi/CalidadCalculator.tsx`
- Grid `lg:grid-cols-[40%_60%] gap-8`.
- **Izquierda — Sliders** (shadcn `Slider` con track cyan custom). Estados con defaults del brief: `cantidadLineas=2`, `unidadesXhora=50`, `horasXdia=16`, `costoScrap=5`, `rendimientoActual=90`, `rendimientoEsperado=99.5`, `personasDedicadas=4`, `costoXpersona=1500`, `costoImplementacion=15000`. Handler cruzado: si `actual >= esperado`, ajusta el contrario (clamp en límites).
- **Derecha — Resultados** (panel glass `bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8`):
  - `useState calculosHabilitados=false`.
  - `useMemo` con todas las fórmulas (Unidades anuales, scrapActual/Esperado, ahorroXScrap, ahorroLaboral, ahorroTotal, costoTotalProyecto, payback `Math.max(1, Math.ceil(...))`, ROI %).
  - Estado inicial: 3 KPI con "---" `blur-sm`, overlay con botón cyan "Calcular mi ROI Operativo".
  - Estado calculado: 3 KPI en `text-[#17ccd3] font-mono text-4xl` (Ahorro Anual USD, Payback meses, ROI %), + desglose secundario.
  - **Alerta**: si `payback < 6 && roi > 300`, banner cyan/esmeralda con `Sparkles`: *"¡Impacto Financiero Crítico Detectado! Su operación califica para un despliegue prioritario de InspectIA OS por repago acelerado."*

### `src/components/roi/LeadForm.tsx` + CTA Demo lateral
Sección bajo las métricas en grid `lg:grid-cols-[1fr_360px] gap-6`:

- **Izquierda — Formulario** (`react-hook-form` + `zod`): Nombre, Email corporativo, Teléfono (input `tel` + `Select` país con ~15 opciones de prefijo +XX), Cargo (`Select`: Director de Planta, Gerente de Calidad, Logística, Inversor, Otro). Submit → `toast.success` "Reporte enviado". Botón: **"Descargar Reporte Financiero Completo en PDF"** estilo cyan glow.

- **Derecha — CTA "Solicitar Demo"** (`<aside>` glass `bg-[#084749]/60 border border-[#17ccd3]/30 rounded-3xl p-6 flex flex-col justify-between`):
  - Icono `CalendarCheck` cyan + titular "Hablá con un especialista".
  - Copia: "Reservá una demo personalizada de 30 min con nuestro equipo y validá tu caso con un experto en automatización industrial."
  - Mini-bullets: "✓ Demo en vivo del módulo", "✓ Revisión de tu ROI estimado", "✓ Plan de despliegue sugerido".
  - Botón principal `<a href={GCAL_URL} target="_blank" rel="noopener noreferrer">` con clase cyan sólido + icono `ExternalLink`, copia **"Agendar Demo por Calendar"**.
  - Constante `GCAL_URL` placeholder editable en el archivo (`https://calendar.google.com/calendar/u/0/appointments/...` — el usuario reemplaza con su link real más tarde).
  - Mobile: stack vertical bajo el formulario.

## 4) Responsive

- `lg:grid-cols-[40%_60%]` colapsa a 1 col; tabs con `overflow-x-auto`; form+CTA Demo apilados en mobile.

## 5) Fuera de alcance

- Generación real de PDF.
- Backend de leads.
- Calculadoras de los 3 tabs restantes.
- Integración nativa con Google Calendar API (sólo link externo a la página pública del calendar).

## Notas técnicas

- TanStack Start: `src/routes/roi.tsx` con `createFileRoute("/roi")`.
- Poppins ya cargado en `__root.tsx`.
- HEX inline (sin nuevos tokens), alineado con `ProductWalkthrough`.
- shadcn `Tabs`, `Slider`, `Select`, `Input`, `Form`, `Button` y sonner ya disponibles.
- `GCAL_URL` queda como constante editable en `LeadForm.tsx` — el usuario debe pegar su URL real de Google Calendar Appointments.
