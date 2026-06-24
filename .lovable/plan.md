# Plan: Footer global de InspectIA

Componente de footer reutilizable acoplado en Home y `/roi`, con grid de 4 columnas en desktop y stack vertical en mobile.

## 1) Nuevo componente `src/components/site/Footer.tsx`

- Wrapper: `<footer className="bg-[#020d0e] border-t border-white/5 font-[Poppins]">` con contenedor interior `max-w-6xl mx-auto px-4 py-16`.
- Grid principal: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10`.

### Col 1 — Marca
- Logo: `<span className="text-xl font-bold text-white">InspectIA<span className="text-[#17ccd3]">.</span></span>`.
- Descripción: copia del brief, `text-xs text-slate-400 max-w-xs mt-3`.
- Social: `<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">` con icono `Linkedin` (lucide), color `text-slate-500 hover:text-[#17ccd3] transition-colors`, padding `p-2 rounded-full border border-white/10`.

### Col 2 — Productos
- Título `text-sm font-semibold uppercase tracking-wider text-white mb-4`.
- Lista `ul space-y-2` con `<a href="#">` por enlace, clase `text-sm text-slate-400 hover:text-[#17ccd3] transition-colors`. Items: Recepción de Mercadería, TYMEO OEE, Control de Calidad, Productividad y Seguridad, Stock y Despachos.

### Col 3 — Recursos
- Misma estructura. "Calcular ROI" usa `<Link to="/roi">` de tanstack-router; el resto `<a href="#">` por ahora. Items: Calcular ROI, Casos de Éxito, Blog Técnico, Documentación API.

### Col 4 — Newsletter
- Título "Newsletter" + subtexto del brief.
- Form local con `useState` para email + estado `"idle" | "loading" | "success"`:
  - Submit: validación email simple (regex), simula request 800ms, setea `success`, muestra "✓ Suscripto" 3s y vuelve a idle.
  - Layout: `flex flex-col gap-2` con `<input type="email">` (`bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-[#17ccd3] outline-none`) y botón `bg-[#17ccd3] text-[#041A1B] rounded-full px-4 py-2 text-sm font-semibold hover:bg-[#17ccd3]/90 disabled:opacity-60`.

### Bottom bar
- `mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3`.
- Izq: "© 2026 InspectIA. Todos los derechos reservados." (`text-xs text-slate-500`).
- Der: dos `<a href="#" className="text-xs text-slate-500 hover:text-[#17ccd3]">` — Términos y Condiciones · Política de Privacidad.

## 2) Wire-up

- `src/routes/index.tsx`: importar `<Footer />` y agregarlo al final del `<main>` (o bajo `<main>` como sibling, dentro del wrapper).
- `src/routes/roi.tsx`: agregar `<Footer />` al final, fuera del `<main>` pero dentro del wrapper, para que pegue con el fondo dark.

## Fuera de alcance

- Páginas reales detrás de los links (Casos de Éxito, Blog, etc.).
- Backend de newsletter (sólo simulación local con toast/estado visual).
- Más redes sociales (sólo LinkedIn como pidió el brief).
