# Plan: Arreglar `/roi` y agregar inputs editables a los sliders

## 1) Diagnóstico del error en `/roi`

El error `Invariant failed: Expected to find a match below the root match in SPA mode` viene del hidratado de TanStack Start cuando el HTML inicial difiere del cliente. La causa real más probable es que un compile-error de Vite (overlay visto en el session replay) rompe el módulo de la ruta. Voy a revisar los logs del dev server al entrar a build mode para confirmar el archivo culpable y corregir el import / sintaxis que falla.

Pasos:
- `sqlite3 /tmp/sandbox-state.db ...` para leer los últimos errores de Vite y ubicar el archivo exacto.
- Corregir el archivo (probablemente `CalidadCalculator.tsx` o `LeadForm.tsx`).
- Hacer un hard reload del preview si queda hidratación stale.

## 2) Inputs numéricos editables junto a cada slider

`SliderRow` actual sólo muestra el valor; lo voy a convertir en un control combo:

- Reemplazar el `<span>` derecho por un `<input type="number">` controlado: mismo estado, validación clamp entre `min`/`max`, mismo `step`. Estilo: `w-24 bg-[#041A1B] border border-white/10 rounded-md px-2 py-1 text-right font-mono text-[#17ccd3] text-sm focus:border-[#17ccd3] outline-none`.
- onChange del input: `const n = Number(e.target.value); if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)))`.
- onBlur: re-clamp por si el usuario escribió fuera de rango.
- El sufijo (`%`, `u/h`, `$`) se muestra a la derecha del input como pequeño `text-slate-500`.
- El slider sigue funcionando normal y queda sincronizado bidireccionalmente.

## 3) Regla cruzada rendimiento

Mantener: si `rendimientoActual >= rendimientoEsperado`, el otro se ajusta — funciona tanto por slider como por input gracias al handler centralizado (`handleActual`, `handleEsperado`).

## Fuera de alcance

- No cambia layout ni fórmulas.
- No toca Footer, Navbar ni LeadForm (más allá del fix de error si está ahí).
