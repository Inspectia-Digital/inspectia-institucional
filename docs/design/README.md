# Diseño

## `web-visual-rules.md`

Las reglas visuales de la web institucional, copiadas del design system de InspectIA
(paquete `InspectIA Design System`, agosto de 2026). **Es la fuente, no un resumen.**

Está acá porque hasta ahora vivía sólo en el paquete y en comentarios sueltos del código.
Toda decisión visual del sitio —el titular en `cqw`, el `min-width:0` de las grillas, el
padding de 120/72/56, el 64 % de la columna del hero, los contrastes sobre teal— sale de
ese documento.

**No editar acá.** Si una regla cambia, cambia en el design system y se vuelve a copiar.

### Dos cosas que el documento no refleja todavía

1. **«Un solo botón primario por sección» está superado.** Los documentos de copy de
   agosto lo reemplazaron de forma explícita: son dos, empezar gratis y agendar demo,
   porque una demo agendada y una cuenta creada son la misma conversión vista desde dos
   compradores distintos. El sitio está construido con la regla nueva y la impone
   `components/site/CtaPair.tsx`. Falta que alguien actualice el documento de origen.

2. **Los tokens del design system son los de la aplicación, no los de la web.** Radio 8/6
   contra 12/8, `--content-max` 1360 contra 1200, sombras oscuras y `--glow-teal`. La
   diferencia es deliberada y está en la tabla de la primera sección de ese mismo
   documento. `src/tokens/` es la capa web y **no hay que sincronizarla** con la del
   paquete.

## Qué falta del design system

- **El lockup en vector.** Los logos entregados son PNG. Lo confirman el propio
  `brand-logos.html` del paquete y el handoff de iconos, que declara el isotipo hexagonal
  como hueco abierto.
- **El léxico de iconos.** Existe —168 glifos, 20 conceptos cerrados— y el repo importa
  Lucide suelto en 41 archivos. La migración es mecánica y no cambia nada de lo que ve el
  visitante, así que va después de publicar.
