# InspectIA Core

Quiero construir el cascarón base y la pantalla principal de la web de InspectIA, una plataforma Deep Tech SaaS de visión artificial e inteligencia operativa industrial.

1. SISTEMA DE DISEÑO (Estilo Premium Voxel AI / Scale AI):

- Tipografía: Importa e implementa 'Poppins' (Google Fonts) para todo el sitio.

- Paleta de Colores Dark Mode Premium:

  - Background Base: #041A1B (Negro profundo con matiz teal/azul petróleo).

  - Superficies/Tarjetas Bento: #084749 (Bordes sutiles con border-white/10).

  - Color de Acento/CTAs/Glows: #17ccd3 (Cyan eléctrico brillante).

  - Textos: #FFFFFF para encabezados, #94A3B8 para párrafos descriptivos.

- Estética general: Bordes muy redondeados (rounded-3xl), amplios paddings, efectos de desenfoque de cristal (glassmorphism) y sombras neón sutiles.

2. NAVBAR FLOTANTE INTERACTIVO:

- Contenedor: Fijado al top (sticky), flotando con margen superior. Fondo backdrop-blur-md bg-white/5, esquinas rounded-full, borde fino border-white/10.

- Izquierda: Logo "InspectIA" en Poppins Bold blanco con un punto final en color cyan #17ccd3.

- Centro: Menú horizontal (shadcn Navigation Menu) con links limpios: "Productos" (Dropdown de dos columnas: Manufactura [Control de Calidad, OEE Control, TYMEO] y Logística [Drones de Inventario, App Control de Stock, Recepción de Mercadería, Control de Pedidos]), "Soluciones" (Logística, Automotriz, Autopartista, Alimentos, Textil), "Tecnología" e "Institucional".

- Derecha: Botón ghost "Ingresar" y botón destacado "Agendar Demo" (Fondo cyan #17ccd3, texto oscuro, esquinas rounded-full, shadow-[0_0_15px_rgba(23,204,211,0.2)]).

3. HERO SECTION (El "Aha Moment" de la Visión Artificial):

- Layout: Centrado y expansivo.

- Copys Estratégicos:

  - Badge superior: "Fábricas y Empresas logísticas más eficientes con repagos menores a 6 meses." (bg-#084749, texto blanco, borde sutil).

  - H1 (Poppins Bold, grande, centrado): "Aplicamos Inteligencia Artificial Industrial integrada a los sistemas existentes. Resultados a partir de los 15 días." (Aplica gradiente de texto que transicione al cyan #17ccd3 en la frase "Resultados en menos de 15 días").

  - H2 (Centrado, max-w-3xl, texto grisáceo): "Nuestra plataforma combina visión artificial, drones autónomos y sensores para automatizar el control de calidad, optimizar el OEE y obtener visibilidad y presición en los inventarios. Integración nativa con tu PLC, WMS, ERP, MES, TMS..."

- CTAs de Conversión (Centrados abajo):

  - Primario: "Agendar Demo" (bg-#17ccd3, texto oscuro, flecha Lucide a la derecha).

  - Secundario: "Calcular mi ROI" (Outline cyan, icono Lucide de calculadora).

- Visual Principal del Software (Estilo Computer Vision Real-Time):

  - Contenedor abajo (w-full, max-w-5xl, rounded-3xl, overflow-hidden, border border-white/10). Usa una imagen oscura placeholder de Unsplash de una planta industrial o almacén automatizado.

  - Superpone elementos UI absolutos simulando la IA analizando el entorno:

    - Bounding Box: Un recuadro de línea fina cyan (#17ccd3) enfocando un objeto/pallet con un label flotante que diga "Pallet Verified: 99.9% Accuracy".

    - Tarjeta Glassmorphism Izquierda: "Módulo Logístico Activo — API Connected: WMS Cygnus".

    - Tarjeta Glassmorphism Derecha: Contador dinámico "Defectos en Línea: 0" con un dot parpadeando en verde.

4. FRANJA DE RESPALDO Y AUTORIDAD INDUSTRIAL (Social Proof Monocromático):

- Coloca una sola fila horizontal fluida inmediatamente debajo del visual del software.

- Texto sutil: "Infraestructura, validación científica y confianza enterprise:" (text-slate-500, texto pequeño, Poppins).

- Fila de logotipos unificada (Todos renderizados en escala de grises con opacidad baja, sin clasificar, ordenados uno al lado del otro):

  "Google for Startups", "UBA", "CONICET", "Emprelatam", "ARNx", "Miebach", "Auren", "Antea", "Balluff", "Cygnus", "BPS", "Tecnología BI", "Quantit", "Motorola", "Sitecno", "Springwall", "Establecimiento Las Marías", "Green Mills", "Molens".

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://inspectia-institucional.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1b8ed6b1-59a7-46c0-a4d5-c9c432829915).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
