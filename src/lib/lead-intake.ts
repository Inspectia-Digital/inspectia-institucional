import { z } from "zod";
import { CONTACT } from "@/content/site";

/**
 * Recepción de los formularios del sitio, del lado del servidor.
 *
 * **Por qué existe, y por qué no se resuelve desde el navegador.** Los dos formularios
 * —el de ROI, y en su momento el de partners— se enviaban por `mailto:`, que funciona pero
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

/**
 * Los formularios del sitio. El tipo decide el asunto y cómo se arma el cuerpo.
 *
 * El de partners se fue cuando el programa pasó a ser de alta libre y un formulario que
 * promete "te escribimos nosotros" dejó de tener sentido. Quedan el de ROI y los dos lados
 * del marketplace: quien pide un presupuesto y quien ofrece un servicio.
 */
const schema = z.object({
  form: z.enum(["roi", "cotizacion", "proveedor"]),
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  telefono: z.string().trim().min(6).max(25),
  /** La empresa de quien pide. En los dos formularios es lo mismo. */
  contexto: z.string().trim().min(2).max(120),
  /** Lo propio de cada formulario: los parámetros de la calculadora, o la categoría del
   *  marketplace y lo que la persona escribió que necesita. */
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

/* El asunto sale del formulario y el `contexto` lo completa: "Pedido de cotización ·
 * Acme SA". La categoría del marketplace no va acá sino en la primera línea del cuerpo:
 * en la bandeja lo que ordena es de qué empresa vino, y la categoría se lee al abrir. */
const ASUNTO = {
  roi: "Pedido de informe de ROI",
  cotizacion: "Pedido de cotización",
  proveedor: "Alta de proveedor en el marketplace",
} as const;

const ETIQUETA_CONTEXTO = {
  roi: "Empresa",
  cotizacion: "Empresa",
  proveedor: "Empresa",
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
      /* Se registra el estado y el `code` que devuelve Brevo, y nada más.
       *
       * El cuerpo completo puede traer datos del lead y no tiene por qué quedar en los
       * registros. Pero el `code` no: es una cadena de catálogo —`unauthorized`,
       * `invalid_parameter`, `not_enough_credits`— y es la diferencia entre saber qué
       * pasó y adivinar. Sin él, un 502 no distingue una clave equivocada de un remitente
       * sin verificar, y las dos se ven igual desde afuera: el formulario cae al mailto.
       *
       * Las dos causas más comunes, para el que lea esto con un 502 en la mano:
       * la clave cargada es la **SMTP** y esta API pide la de **API** (`xkeysib-…`), o
       * la restricción por IP está activa para las claves de API y Cloud Run sale por
       * una dirección que no está en la lista. */
      let codigo = "sin código";
      try {
        const cuerpo = (await res.json()) as { code?: string };
        if (cuerpo?.code) codigo = cuerpo.code;
      } catch {
        // Brevo no siempre contesta JSON en los errores de infraestructura.
      }
      console.error(`Brevo rechazó el envío del formulario: ${res.status} · ${codigo}`);
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
