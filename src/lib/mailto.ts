import { CONTACT } from "@/content/site";

/**
 * Envío de los formularios por correo del propio visitante.
 *
 * **Es una solución puente y hay que saber qué compra y qué cuesta.** Hasta ahora los dos
 * formularios del sitio mostraban la confirmación de "listo" y el dato no salía del
 * navegador: alguien dejaba nombre, empresa, correo y teléfono, veía que había salido bien
 * y no llegaba a ninguna parte. Eso es peor que no tener el formulario, porque quema el
 * contacto y además la confianza de quien lo dejó.
 *
 * Con `mailto:` el dato llega de verdad, sin servidor, sin CRM y sin un tercero
 * procesando datos personales —que además es un capítulo menos en la política de
 * privacidad—. Lo que cuesta: se abre el cliente de correo del visitante y el envío
 * depende de que él apriete enviar. Por eso **la confirmación no puede decir "listo"**:
 * tiene que decir que se abrió el correo y que falta enviarlo, y mostrar la dirección
 * escrita para quien no tenga cliente de correo configurado y prefiera copiarla.
 *
 * Cuando haya CRM, esto se reemplaza por un `fetch` y las confirmaciones vuelven a ser
 * las de un envío automático.
 */

/** Salto de línea de un cuerpo de mailto, según RFC 6068: CRLF codificado. */
const NL = "\r\n";

export const CONTACT_EMAIL = CONTACT.email ?? "contacto@inspectia.ai";

/**
 * Abre el cliente de correo con el asunto y el cuerpo ya escritos.
 *
 * Devuelve false si no hay ventana —renderizado en el servidor—, para que quien llame no
 * muestre una confirmación que habla de algo que no pasó.
 */
export function openMailDraft(subject: string, lines: string[]): boolean {
  if (typeof window === "undefined") return false;

  const url =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(lines.join(NL))}`;

  // `location.href` y no `window.open`: un `mailto:` abierto en pestaña nueva deja una
  // ventana en blanco colgada cuando el sistema sí tiene cliente de correo.
  window.location.href = url;
  return true;
}

/** Las líneas de datos, con la etiqueta alineada para que el correo se lea de un vistazo. */
export const mailField = (label: string, value: string) => `${label}: ${value}`;
