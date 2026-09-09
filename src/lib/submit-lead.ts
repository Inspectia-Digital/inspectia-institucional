import { LEAD_ENDPOINT } from "@/lib/lead-intake";
import { mailField, openMailDraft } from "@/lib/mailto";

/**
 * Envío de un formulario, con dos caminos y una sola llamada.
 *
 * Primero intenta el servidor, que manda el correo por Brevo sin que la persona tenga que
 * hacer nada. Si el servidor contesta que no está configurado —o si falla— vuelve al
 * `mailto:`, que abre el programa de correo de la persona.
 *
 * **Los dos caminos existen a propósito y el degradado es el punto.** Mientras
 * `BREVO_API_KEY` no esté en el entorno de Cloud Run, el sitio se comporta exactamente
 * como venía. El día que la clave esté, mejora solo. Nada que desplegar en el medio.
 *
 * Quien llama tiene que saber **por cuál de los dos salió**, porque la confirmación no
 * puede ser la misma: por Brevo el envío ya ocurrió, por `mailto:` todavía falta que la
 * persona apriete enviar. Decir "listo" en el segundo caso es la mentira que este trabajo
 * vino a sacar del sitio.
 */

export type LeadForm = "roi" | "cotizacion" | "proveedor";

export type LeadPayload = {
  form: LeadForm;
  nombre: string;
  email: string;
  telefono: string;
  /** La empresa de quien pide. En los dos formularios es lo mismo. */
  contexto: string;
  /** Lo propio de cada formulario: los parámetros de la calculadora, o la categoría del
   *  marketplace y lo que la persona escribió que necesita. */
  detalle?: string[];
};

export type LeadResult = "enviado" | "correo-abierto";

/** Asunto y cuerpo del `mailto:` de respaldo. */
const RESPALDO = {
  roi: (l: LeadPayload) => ({
    asunto: `Informe de ROI · ${l.contexto}`,
    lineas: datos(l),
  }),
  cotizacion: (l: LeadPayload) => ({
    asunto: `Cotización · ${l.contexto}`,
    lineas: datos(l),
  }),
  proveedor: (l: LeadPayload) => ({
    asunto: `Alta de proveedor · ${l.contexto}`,
    lineas: datos(l),
  }),
} satisfies Record<LeadForm, (l: LeadPayload) => { asunto: string; lineas: string[] }>;

/** El cuerpo es el mismo en los dos: lo que cambia es el asunto y qué trae `detalle`. */
const datos = (l: LeadPayload) => [
  mailField("Nombre", l.nombre),
  mailField("Empresa", l.contexto),
  mailField("Correo", l.email),
  mailField("Teléfono", l.telefono),
  ...(l.detalle?.length ? ["", ...l.detalle] : []),
];

export async function submitLead(lead: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      // `sitio` es el campo trampa: va siempre vacío desde acá. Un robot que complete el
      // formulario a ciegas lo llena, y el servidor descarta el envío.
      body: JSON.stringify({ ...lead, sitio: "" }),
    });
    if (res.ok) return "enviado";
  } catch {
    // Sin red, o el servidor no contestó. Se cae al respaldo igual que con un 501.
  }

  const { asunto, lineas } = RESPALDO[lead.form](lead);
  if (!openMailDraft(asunto, lineas)) throw new Error("no se pudo abrir el correo");
  return "correo-abierto";
}
