import { z } from "zod";
import { CONTACT } from "@/content/site";

/**
 * Recepción de los formularios del sitio, del lado del servidor.
 *
 * **Por qué existe, y por qué no se resuelve desde el navegador.** Los dos formularios
 * —informe de ROI y postulación de partners— se enviaban por `mailto:`, que funciona pero
 * depende de que la persona apriete enviar en su propio programa de correo. Brevo lo
 * resuelve de verdad: el dato sale sí o sí y queda registro de si el correo se entregó.
 *
 * Lo que no se puede es llamar a la API de Brevo desde el navegador. La clave viajaría en
 * el JavaScript servido y cualquiera podría mandar correo firmado como InspectIA. Por eso
 * el envío ocurre acá, en el servidor, y la clave nunca sale de él.
 *
 * **Va en `lib/` y se engancha desde `server.ts`, igual que `http-policy`.** La API de
 * rutas de servidor de TanStack Start cambió de forma entre versiones; el envoltorio de
 * `server.ts` es el mismo en las dos salidas del proyecto —Cloudflare para Lovable y Node
 * para Cloud Run— y ya está probado corriendo en las dos.
 */

export const LEAD_ENDPOINT = "/api/lead";

/**
 * Sin `BREVO_API_KEY` el endpoint responde 501 y el formulario **vuelve solo al
 * `mailto:`**. Es deliberado: el sitio se puede desplegar hoy sin la clave y se comporta
 * exactamente como venía, y el día que la clave exista en el entorno mejora sin tocar una
 * línea de código. No hay día del cambio.
 *
 * En Cloudflare las variables llegan por el `env` de la petición y en Node por
 * `process.env`; se leen las dos porque el repo se despliega a los dos lados.
 */
function readEnv(env: unknown, key: string): string | undefined {
  const fromRequest = (env as Record<string, string | undefined> | undefined)?.[key];
  if (fromRequest) return fromRequest;
  return typeof process !== "undefined" ? process.env?.[key] : undefined;
}

/** Los dos formularios del sitio. El tipo decide el asunto y cómo se arma el cuerpo. */
const schema = z.object({
  form: z.enum(["roi", "partners"]),
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  telefono: z.string().trim().min(6).max(25),
  /** Empresa en el de ROI, especialidad en el de partners. */
  contexto: z.string().trim().min(2).max(120),
  /** Módulo y parámetros de la calculadora. Sólo el de ROI los manda. */
  detalle: z.array(z.string().max(200)).max(40).optional(),
  /**
   * Trampa para robots: un campo que la persona no ve y no completa nunca.
   *
   * Acepta cualquier texto **a propósito**. Si el esquema lo rechazara, el envío moriría
   * acá con un 400 y eso le avisa al robot que hay una trampa. Lo que corresponde es
   * dejarlo pasar la validación y descartarlo más abajo devolviendo un 200, para que el
   * robot crea que funcionó.
   */
  sitio: z.string().max(200).optional(),
});

const ASUNTO = {
  roi: "Pedido de informe de ROI",
  partners: "Postulación al programa de partners",
} as const;

const ETIQUETA_CONTEXTO = {
  roi: "Empresa",
  partners: "Especialidad",
} as const;

export async function handleLeadPost(request: Request, env: unknown): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const apiKey = readEnv(env, "BREVO_API_KEY");
  if (!apiKey) {
    // 501 y no 500: no es que falló, es que esta capacidad no está configurada. El
    // formulario lo distingue y cae al mailto sin mostrar un error.
    return json({ error: "not_configured", fallback: "mailto" }, 501);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: "invalid_payload" }, 400);

  const lead = parsed.data;

  // El campo trampa vino con algo: lo completó un robot. Se responde 200 a propósito, para
  // no darle una señal de que fue detectado, y no se manda nada.
  if (lead.sitio) return json({ ok: true }, 200);

  const destino = CONTACT.email ?? "contacto@inspectia.ai";
  const remitente = readEnv(env, "BREVO_SENDER_EMAIL") ?? destino;

  const lineas = [
    `${ETIQUETA_CONTEXTO[lead.form]}: ${lead.contexto}`,
    `Nombre: ${lead.nombre}`,
    `Correo: ${lead.email}`,
    `Teléfono: ${lead.telefono}`,
    ...(lead.detalle?.length ? ["", ...lead.detalle] : []),
  ];

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Sitio InspectIA", email: remitente },
        to: [{ email: destino }],
        // Contestar el aviso escribe directo a la persona, sin copiar la dirección a mano.
        replyTo: { email: lead.email, name: lead.nombre },
        subject: `${ASUNTO[lead.form]} · ${lead.contexto}`,
        textContent: lineas.join("\n"),
      }),
    });

    if (!res.ok) {
      // El cuerpo de Brevo puede traer datos del lead; se registra sólo el código.
      console.error(`Brevo rechazó el envío del formulario: ${res.status}`);
      return json({ error: "send_failed", fallback: "mailto" }, 502);
    }
  } catch (error) {
    console.error("Brevo no respondió", error);
    return json({ error: "send_failed", fallback: "mailto" }, 502);
  }

  return json({ ok: true }, 200);
}

/* Sin caché en ninguna capa intermedia: es una respuesta por petición. */
const json = (data: unknown, status: number) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
