// Paridad entre el contrato de eventos del código y el disparador de GTM.
//
// **Por qué existe.** Una auditoría del 9 de septiembre de 2026 encontró que el tipo
// `SiteEvents` declaraba un evento —`content_read`— que la expresión del disparador de
// GTM no aceptaba, y que la expresión aceptaba otro —`partner_apply`— que ya nadie
// emitía. El modo de fallar de esa desincronización es el peor posible: el evento entra
// al dataLayer, TypeScript lo da por bueno, GTM no dispara la etiqueta, GA4 nunca lo
// recibe y **no aparece ningún error en ninguna parte**. Se descubre meses después, al
// preguntarse por qué un informe está vacío.
//
// Este chequeo corre en `npm run build` y rompe el build si las dos listas dejan de
// coincidir. Es deliberadamente tonto: compara nombres, no valida parámetros.
//
// Correr suelto con: npm run check:events
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Los nombres del contrato, leídos del fuente.
 *
 * Se extraen por texto y no importando el módulo porque son un **tipo**: no existen en
 * tiempo de ejecución. La alternativa sería declararlos como arreglo y derivar el tipo de
 * ahí, que es más elegante y cambia la forma de la API tipada; mientras eso no pase, esto
 * alcanza y falla ruidosamente si el archivo cambia de forma (ver la comprobación de
 * cantidad mínima más abajo).
 */
function eventosDelContrato() {
  const src = readFileSync(join(ROOT, "src/lib/analytics.ts"), "utf8");
  const bloques = [
    src.match(/type ConversionEvents = \{([\s\S]*?)\n\};/),
    src.match(/type EngagementEvents = \{([\s\S]*?)\n\};/),
  ];
  if (bloques.some((b) => !b)) {
    throw new Error(
      "No encontré los bloques ConversionEvents/EngagementEvents en analytics.ts. " +
        "Si el archivo se reestructuró, hay que actualizar este chequeo.",
    );
  }
  // Sólo las claves en el primer nivel de cada bloque: dos espacios de sangría exactos.
  return bloques.flatMap((b) =>
    [...b[1].matchAll(/^ {2}([a-z][a-z0-9_]*)\??:/gm)].map((m) => m[1]),
  );
}

/** Los nombres que el disparador de GTM deja pasar. */
function eventosDeGtm() {
  const src = readFileSync(join(ROOT, "analytics/gtm-inspectia-eventos.json"), "utf8");
  const regex = src.match(/\^\(([a-z_|]+)\)\$/);
  if (!regex) {
    throw new Error(
      "No encontré la expresión del disparador en el JSON de GTM. " +
        "Si el contenedor se re-exportó con otra forma, hay que actualizar este chequeo.",
    );
  }
  return regex[1].split("|");
}

const contrato = eventosDelContrato();
const gtm = eventosDeGtm();

// Red de seguridad: si la extracción se rompe y devuelve poco, es un fallo del chequeo y
// no una coincidencia feliz. Sin esto, un cambio de formato haría pasar el build siempre.
if (contrato.length < 10) {
  throw new Error(`Sólo extraje ${contrato.length} eventos del contrato. La extracción está rota.`);
}

const soloEnContrato = contrato.filter((e) => !gtm.includes(e));
const soloEnGtm = gtm.filter((e) => !contrato.includes(e));

if (soloEnContrato.length === 0 && soloEnGtm.length === 0) {
  console.log(`  eventos: ${contrato.length}, y GTM acepta los mismos ✓`);
  process.exit(0);
}

console.error("\n  El contrato de eventos y el disparador de GTM no coinciden.\n");
if (soloEnContrato.length) {
  console.error("  Declarados en el código y NO aceptados por GTM:");
  console.error("    " + soloEnContrato.join(", "));
  console.error("    → si se emiten, GA4 no los recibe y nada falla a la vista.\n");
}
if (soloEnGtm.length) {
  console.error("  Aceptados por GTM y NO declarados en el código:");
  console.error("    " + soloEnGtm.join(", "));
  console.error("    → nadie los emite: la métrica queda en cero para siempre.\n");
}
console.error("  Se arregla en src/lib/analytics.ts y en la expresión del disparador de");
console.error("  analytics/gtm-inspectia-eventos.json. Los dos, o vuelve a pasar.\n");
process.exit(1);
