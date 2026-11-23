# Informe — integraciones, fasón y blog

**Fecha del pase:** 23/11/2026 · **Repo:** `inspectia-institucional` · **Para:** dirección
**Entrada:** `integraciones/`, `fason/00_LANDINGS_FASON.md`, `blog/00_PLAN_BLOG.md`
**Verificado contra:** `oee-lite-backend` en `5c2126a` (23/11/2026), sólo lectura.

---

## 1. Lo primero, porque cambia una decisión

**Las dos páginas de fasón se publican «a pedido», con un solo CTA «Quiero conocerlo», y no
con `CtaPair` en la de fábricas como pedía el contenido.**

El motivo está en el §4: de las cuatro afirmaciones marcadas `[VERIFICAR EN REPO]`, **ninguna
existe en el backend**. `ComparticionMarca` es la compartición de canal —venta, stock y
reposiciones— y no tiene tipo de vínculo «fasón»; las cuatro reglas de fasón del catálogo
están en estado borrador; no hay consignación de insumos; y lo que una marca ve hoy son sus
canales, no sus fábricas. El reporte de fasón todavía no está construido.

Publicar la página de la fábrica con «Empezar gratis» ofrecería crear una cuenta para usar
un producto de fasón que no existe. La convención que el sitio ya tiene para ese caso —la que
usan el andon y el costo por unidad (brief §3)— es la banda «Lo estamos habilitando con
nuestros clientes» y el botón único. Es lo que apliqué a las dos.

**Cómo se revierte:** sacar `status` y `requestOrigin` de la entrada en `src/content/fason.ts`
y poner el `CtaPair`. Son dos líneas, el día que el reporte exista.

---

## 2. Qué se publicó y con qué rutas

| Ruta | Qué es | Schema |
|---|---|---|
| `/integraciones` | Hub, con los 56 sistemas en cuatro grupos | SoftwareApplication · ItemList · BreadcrumbList · FAQPage |
| `/integraciones/erp` | Categoría | Service · FAQPage · BreadcrumbList |
| `/integraciones/scada-plc` | Categoría | Service · FAQPage · BreadcrumbList |
| `/integraciones/wms` | Categoría | Service · FAQPage · BreadcrumbList |
| `/integraciones/trazabilidad` | Categoría | Service · FAQPage · BreadcrumbList |
| `/integraciones/odoo` | Sistema · en construcción | Service · FAQPage · BreadcrumbList |
| `/integraciones/ifix` | Sistema · por proyecto | Service · FAQPage · BreadcrumbList |
| `/soluciones/produccion-a-fason` | Fábricas que fasonan · a pedido | Service · FAQPage · BreadcrumbList |
| `/soluciones/control-de-fasoneros` | Marcas que fasonan · a pedido | Service · FAQPage · BreadcrumbList |
| `/blog` | Índice, sin artículos | — (noindex mientras esté vacío) |
| `/blog/<slug>` | Plantilla de artículo | BlogPosting · FAQPage · BreadcrumbList |

**301:** `/plataforma/integraciones` → `/integraciones`, un solo salto, con y sin barra final.
La ruta vieja se borró y la URL salió del mapa del sitio. Los cinco lugares que la enlazaban
—menú, pie, `/plataforma`, marketplace y dos comentarios— apuntan a la nueva.

Las diez páginas responden 200 con un solo H1, su canónica propia y el JSON-LD parseando.

**Migas de pan:** Integraciones › Categoría › Sistema, visibles y en el dato estructurado.

---

## 3. Cómo resolví los segmentos dinámicos

**Integraciones: una sola ruta dinámica** (`/integraciones/$slug`) que busca el slug en un
mapa del catálogo y decide si es categoría o sistema. Si no está, 404.

La alternativa —cuatro rutas estáticas para las categorías, que en TanStack le ganan a la
dinámica— funciona, pero deja la misma plantilla repetida en cinco archivos y hace que
agregar una categoría vuelva a ser escribir código. Con el mapa, una categoría o un sistema
nuevo es una entrada en `integrations.ts`.

**Fasón: dos rutas estáticas**, y acá sí. Fasón no es un rubro —es una relación comercial, y
la misma planta de alimentos puede producir para su marca y para tres ajenas— así que no
entra en `solutions.ts`: habría puesto «Producción a fasón» en la grilla de rubros, al lado
de «Cosmética». Las dos URLs son literales y le ganan a `/soluciones/$industria`;
**verificado**, no supuesto. El cuerpo vive en un componente compartido.

**Probado el criterio de aceptación:** agregué un sistema de prueba al catálogo, reconstruí
y apareció en el hub, en la grilla de su categoría y en el `ItemList` del dato estructurado,
sin tocar una línea de código y sin URL propia hasta que tenga `page`. Después lo saqué.

---

## 4. Qué saqué de fasón, y dónde lo busqué

Todo en `oee-lite-backend`, commit `5c2126a`.

| Qué decía el contenido | Dónde lo busqué | Qué encontré | Qué hice |
|---|---|---|---|
| `ComparticionMarca` con vínculo «fasón» y reporte de fasón (DIR-047) | `app/models/domain.py:6501` | Es la compartición de **canal**: su lista blanca de reportes es `venta_stock` y `ventas_empresa`, sus métricas son reposiciones, facturación y precio, y sus filtros son categoría, modelo, color y canal. Sin tipo de vínculo | La página entera pasa a «a pedido» (§1) |
| El reporte de fasón construido | `app/datos/catalogo_reglas_inicial.md:740` y ss. | Las cuatro reglas (FAS-C01 a C04) están en **estado borrador** y salen del «Prototipo de fasón» | Ídem |
| Menú «Proveedores» en la cuenta de la marca | `app/core/marcas.py:105` (`canales_de_la_marca`) | La marca ve sus **canales**, no sus fábricas | No se nombra «Proveedores» en ninguna página |
| Stock de insumos de la marca en consignación | `app/` entero: `consignacion`, `consignación` | Cero coincidencias | **Saqué** la pregunta «¿Y si la marca me manda el packaging?» de la página de fábricas, el bloque «Tus insumos en la fábrica» de la de marcas, y «sus insumos» de la enumeración del reporte |
| Publicación con aprobación de la fábrica | `app/core/marcas.py` (`comparticion_para_marca`) | La compartición se resuelve en cada consulta; hay `activo` y `suspendido_at`, no hay paso de publicar ni de aprobar | Queda dentro de lo «a pedido», no se afirma como disponible |
| Qué ve la marca con varias fábricas (DIR-048) | `app/core/marcas.py:105` | Lista de canales; la vista de varias fábricas no existe | **Saqué** la pregunta «¿Puedo comparar mis fasoneros?» |

**Lo que sí está construido**, y por eso las dos páginas se publican en vez de descartarse:
pedidos de cliente con fecha de entrega y renglones abiertos (`app/routers/pedidos_cliente.py`),
plan desde pedidos, objetivo por marca en la orden (`ObjetivoMarcaOrden`,
`domain.py:5445`), marca en el producto y en la trazabilidad (`ProductoMarca`,
`MarcaTrazabilidad`), trazabilidad por lote, control de salida teórico contra real
(`app/routers/stock.py:527`) y —lo más cerca de lo que la página promete— el **informe de
trazabilidad del pedido para el cliente**, que por regla no lleva operarios, costos ni
paradas (`app/core/informe_trazabilidad.py`, RN-284).

**Un dato que no coincide con el contenido y conviene mirar:** el pedido tiene `cliente` y
`entrega`, **no `marca`** (`domain.py:5549`). La marca es un eje de la orden y de la
trazabilidad, no del pedido. La frase «cada pedido entra con su marca» describe el modelo
que viene, no el de hoy. No la toqué —el copy no se reescribe— pero es la primera que
conviene revisar cuando se construya el reporte.

**También saqué, de integraciones:** la pregunta «¿Cada cuánto se sincroniza?» de la
categoría ERP y de Odoo. Su respuesta traía un `[DATO A COMPLETAR]` con la frecuencia por
defecto, que es la pregunta abierta 3 del PRD. Vuelve cuando dirección la fije.

Ninguna página publica un `[DATO A COMPLETAR]`, un `[VERIFICAR]` ni un `[CONFIRMAR]`:
verificado sobre el HTML servido de las diez.

---

## 5. Qué logos faltan

Se usan **nueve glifos** de `simple-icons` (CC0), copiados a `src/content/brand-logos.ts` con
`npm run logos`. El paquete entero no entra al bundle: 11 kB de `path`, nada más.

| Logo | Para qué sistema |
|---|---|
| Odoo | Odoo · Odoo Inventario |
| SAP | SAP Business One |
| Siemens | WinCC · S7 y LOGO! |
| Rockwell Automation | FactoryTalk |
| Schneider Electric | Modicon |
| Inductive Automation | Ignition |
| TOTVS | Protheus |
| MQTT | MQTT |
| Node-RED | Node-RED |

**Verifiqué los doce slugs de la lista.** Tres no se usan:

- **Katana: el slug existe y es de otra empresa.** `simple-icons` tiene `katana`, pero es el
  Katana de **Foundry**, software de iluminación 3D, no el Katana MRP de la lista de ERP.
  Va sin logo. Es la razón por la que el script valida contra el título y la fuente del
  paquete, y quedó anotada en la regla de diseño.
- **Zoho y Sage** tienen icono, pero **no están en las listas de sistemas** del hub. No los
  agregué: agregar un sistema es una decisión de producto, no de maquetado. Si van, es una
  línea en `SYSTEMS` y el logo ya está disponible.

**Sin logo, con el nombre en texto: 45 de los 56** (la regla: un sistema sin SVG va en
`--grey-600`). Once llevan glifo.

- **ERP (19):** Tango Gestión, Finnegans GO, Bejerman, DUX Software, Contabilium, Xubio,
  Colppy, Contagram, BPS Digital, devFactory, La Pyme, Dynamics 365 Business Central,
  CONTPAQi, Bind ERP, Alegra, Siigo, Defontana, Katana, MRPeasy.
- **SCADA y PLC (13):** Proficy iFIX, CIMPLICITY, Historian, AVEVA InTouch, AVEVA Historian,
  AVEVA Plant SCADA, AVEVA Edge, Elipse E3, Movicon.NExT, Weintek, Kepware, OPC UA,
  Modbus TCP.
- **WMS (7):** Cygnus, Mecalux Easy WMS, DigipWMS, Plexor, Aurora WMS, Dettron, Logiwa.
- **Trazabilidad (6):** GS1 / EPCIS 2.0, GS1 TrazAR, TRAZAL, Trazalog, Teramot,
  CrossChex Cloud.

**BPS y Cygnus tienen su logo en el repo y van en texto igual.** Los dos archivos de
`public/img/partners/` son wordmarks en mapa de bits: al lado de nueve glifos monocromos se
leen como un error de maquetado, y repiten el nombre que la grilla ya escribe a su derecha.
Un símbolo acompaña a un nombre; un nombre dibujado, no. Vuelven en cuanto haya un SVG de
símbolo. Lo probé con los dos puestos y por eso lo saqué.

**La regla §11.6 cambió.** Está escrita en `docs/design/web-visual-rules.md`, en la sección
«Prueba social y logos de sistemas», y dice qué reemplaza: las integraciones llevan logo, y
lo que las sigue distinguiendo de un servicio del marketplace es que no tienen precio, ni
ficha, ni botón de contratar. El comentario de `integrations.ts` y el de `partners.ts` la
citan. **Ojo:** el archivo de lineamientos del repo no tiene secciones numeradas —las §11.x
viven en un documento que no está acá— así que la regla quedó por nombre, no por número.

---

## 6. Qué enlaces saqué

**Ninguno.** Los 66 destinos internos distintos de las diez páginas nuevas responden 200.
Todo lo que el contenido pedía enlazar existe: las once funcionalidades, las tres guías
citadas, los módulos y las dos páginas de fasón entre sí.

Enlaces que **agregué** para que la sección no quede colgada:

- menú y pie → `/integraciones` (eran `/plataforma/integraciones`);
- `/plataforma` y `/plataforma/marketplace` → `/integraciones`;
- hub ↔ las cuatro categorías ↔ los dos sistemas, en los dos sentidos;
- categorías y sistemas → las funcionalidades que alimentan (OEE, paradas, andon, plan,
  parte, WMS, trazabilidad) y las guías de OEE y de retiro de lotes;
- `/soluciones` → las dos de fasón, en una sección propia «Por cómo producís», que es la
  única entrada a esas páginas desde el sitio.

---

## 7. SEO transversal

- **Head sólo por `src/lib/seo.ts`**, con el `seoTitle` y el `seoDescription` de cada archivo,
  sin cambios. Canónica propia en las diez.
- **Sitemap: 68 URLs** (eran 60). Entraron las nueve nuevas, salió `/plataforma/integraciones`.
- **`llms.txt` nuevo, 50 páginas.** Se genera del mismo contenido que el sitemap, así que no
  se desincroniza. Tiene la plataforma, las funcionalidades, las integraciones, las
  soluciones con fasón, las guías y las herramientas. Ningún motor documenta hoy que lo lea;
  se publica porque cuesta una línea por URL y porque integraciones y fasón son justo lo que
  un comprador industrial le pregunta a un asistente antes de buscar en Google.
- **H1 en tres líneas:** medido en las diez, a 1440 y a 390 px. **Ninguno pasa de tres**
  (máximo 3; el hub, SCADA y el blog quedan en 2). Sin scroll horizontal en ninguna.
- `npm run build`, `npm run lint` y `npm run typecheck` en verde.

### Lo único amarillo

**`/integraciones/erp` tiene un title de 62 caracteres**, dos más de lo que Google muestra:
«Integración con ERP: el plan entra solo y la producción vuelve». El pase pedía los títulos
«sin cambios», así que lo publiqué como está. Si querés recortarlo, con sacar «la» alcanza:
«Integración con ERP: el plan entra solo y producción vuelve» (59). Las otras nueve entran.

---

## 8. Productos: qué quedó preparado

`src/content/solutions.ts` tiene ahora un campo opcional `kind: "industria" | "producto"` y
un `publishedByKind()`. Por omisión es `"industria"`, así que las diez entradas actuales no
declaran nada y la plantilla no cambió. **No habilita publicar un producto**: eso espera la
medición de volumen. El día que llegue, es agregar una entrada.

---

## 9. Qué queda pendiente

**De dirección:**

1. **La frecuencia de sincronización con el ERP** (pregunta abierta 3 del PRD; la propuesta
   es cada 15 minutos). Sin eso, dos páginas no contestan «¿cada cuánto se sincroniza?».
2. **El title de `/integraciones/erp`**, si se quiere dentro de los 60.
3. **La validación SEO de fasón en Google Trends**, que el archivo marca como PENDIENTE:
   comparar fasón, fasonero, maquila, fabricación por contrato y copacker por país (AR, MX,
   PE, ES). Las dos páginas se anclaron en «fasón» por los resultados de Google, no por
   Trends.
4. **Si Zoho y Sage entran al catálogo de ERP.** Tienen logo disponible.

**De producto, para que fasón deje de ser «a pedido»:** el tipo de vínculo de fasón en
`ComparticionMarca`, el reporte con sus niveles, la consignación de insumos y la vista de la
marca con varias fábricas. Las cuatro reglas del catálogo ya están escritas, en borrador.

**Del blog:** la infraestructura está y no hay artículos. `/blog` no está en el menú, es
`noindex` mientras esté vacío y **no entra al sitemap ni a `llms.txt` hasta que haya un
artículo publicado** —un índice vacío ofrecido al rastreo es una página delgada; es la misma
regla que ya usa `/soluciones/casos`—. Las dos cosas se encienden solas con el primer
`published: true`. Hay un borrador de prueba que devuelve 404, no se lista y no entra al
mapa: es lo que verifica que la regla funciona.

**Del pase anterior, sigue abierto:** importar el contenedor de GTM y crear las dimensiones
`guide` y `feature` antes de publicar; las capturas de las seis funcionalidades nuevas; y el
formulario de `/contacto` con destino, que ahora es también el final del recorrido de estas
diez páginas.
