# Conectar todas las páginas existentes al menú y a los CTAs

Hoy existen 9 rutas (`/`, `/manufactura`, `/logistica`, `/tymeo`, `/recepcion`, `/stock-picking`, `/drones`, `/outbound`, `/roi`), pero el menú, el footer y varios botones siguen apuntando a `#`. El objetivo es que toda la navegación lleve a la página real correspondiente.

## Navbar

- **Productos**
  - Manufactura: TYMEO OEE → `/tymeo`; se elimina "OEE Control" del menú; Control de Calidad → sin página propia (queda apuntando a `/manufactura`).
  - Logística: Drones de Inventario → `/drones`; App Control de Stock → `/stock-picking`; Recepción de Mercadería → `/recepcion`; Control de Pedidos → `/outbound`.
- **Soluciones**: Logística → `/logistica`; Automotriz, Autopartista, Alimentos, Textil → `/manufactura` (aún no tienen landing propia).
- **Programa para Consultores / Institucional**: se reemplaza "Tecnología" por "Programa para Consultores"; ambos quedan visibles en el menú y, hasta que existan sus páginas, apuntan a la sección correspondiente de la home.
- **Menú mobile**: mismos destinos, con secciones colapsables Productos / Soluciones en lugar de los 4 links a `#`.
- "Calcular ROI" ya apunta a `/roi` (se mantiene).

## Footer

- Columna Productos pasa a links reales: Recepción → `/recepcion`, TYMEO OEE → `/tymeo`, App de Stock y Picking → `/stock-picking`, Drones de Inventario → `/drones`, Armado y Despacho → `/outbound`.
- Se agrega una fila de verticales: Manufactura → `/manufactura`, Logística → `/logistica`.
- Recursos: "Calcular ROI" ya va a `/roi`; Casos de Éxito, Blog y Documentación se dejan como pendientes (sin link activo, no `#`).

## Cruces entre páginas

- `/manufactura`: la tarjeta "Inspección de Calidad IA" (hoy `href="#calidad"`) se mantiene en la misma página con scroll al bloque de calidad, ya que no hay landing de calidad.
- `/logistica`: la tarjeta de Storage ya linkea a `/stock-picking` y `/drones`; se agregan links cruzados "Ver también" entre las 4 landings logísticas (recepción ↔ stock ↔ drones ↔ outbound) y un link a la vertical `/logistica`.
- `/tymeo`: se agrega link de retorno a la vertical `/manufactura`.
- CTAs comerciales (`#demo`, `#agendar`, `#contacto`, `#ventas`, `#crear-cuenta`) se unifican: los de "simular/ahorro/ROI" van a `/roi`, y los de demo/contacto apuntan al mismo destino de agenda que ya usa la página de ROI (Google Calendar), en lugar de anclas vacías.

## Detalles técnicos

- Toda navegación interna usa `<Link to="...">` de `@tanstack/react-router` (no `<a href>`), con `activeProps` en la navbar.
- Los ítems sin página se renderizan como texto no clickeable con estilo atenuado, para no dejar links a `#`.
- No se crean rutas nuevas ni se cambia lógica de negocio; solo navegación y presentación.
