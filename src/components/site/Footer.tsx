import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LOCKUP } from "@/content/assets";
import { MODULES } from "@/content/modules";
import { INDUSTRIES, USE_CASES } from "@/content/solutions";
import {
  APP_URL,
  CONTACT,
  NEWSLETTER_ENDPOINT,
  OFFICES,
  SHOW_PRICING,
  officeLine,
} from "@/content/site";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";
import type { IconConcept } from "@/components/icons/inspectia-icons";

/**
 * Pie del sitio (§11.12).
 *
 * Recupera la estructura del footer anterior al rediseño, que se leía mejor que una fila
 * de columnas de enlaces: una columna de marca con un párrafo real, las listas agrupadas
 * de a dos, el newsletter con su formulario, y una barra inferior con el legal a un lado
 * y la licencia al otro. El contenido sí es el nuevo.
 *
 * El fondo es --surface-footer y no --surface-brand-deep: la banda de cierre ya usa el
 * teal profundo, y con los dos iguales el cierre y el pie se leen como un solo bloque.
 *
 * **Todo item lleva min-width:0**: sin eso un item de grid no baja de su min-content y
 * empuja el documento. Es literalmente el bug que tenía este footer —la columna del
 * newsletter, sola, pedía 896px dentro de 845 y generaba scroll horizontal— y no se ve
 * en desktop.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer px-5 pb-8 pt-20 md:px-8">
      <div className="mx-auto max-w-[var(--content-max)]">
        {/* Cuatro columnas, o cinco cuando la de novedades tenga destino y vuelva. Sin
            ese condicional el pie queda con una columna vacía o con dos listas apiladas
            en la misma, que es lo que lo hacía medir 850px de alto. */}
        <div
          className={cn(
            "grid grid-cols-1 gap-x-8 gap-y-12 min-[720px]:grid-cols-2",
            NEWSLETTER_ENDPOINT ? "min-[1100px]:grid-cols-5" : "min-[1100px]:grid-cols-4",
          )}
        >
          {/* --- Marca --- */}
          <div className="min-w-0">
            {/* Sobre el teal profundo va la versión en blanco. La marca en su color
                original sobre este fondo no tendría contraste. */}
            <img
              src={LOCKUP.white}
              alt={LOCKUP.alt}
              width={LOCKUP.width}
              height={LOCKUP.height}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-[38ch] text-sm leading-[var(--leading-normal)] text-on-brand-secondary">
              Plataforma modular para medir y controlar la operación de plantas y centros de
              distribución.
            </p>

            {(CONTACT.phone || CONTACT.email || CONTACT.linkedin) && (
              <ul className="mt-6 space-y-3">
                {CONTACT.phone && (
                  <ContactRow name="phone" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                    {CONTACT.phone}
                  </ContactRow>
                )}
                {CONTACT.email && (
                  <ContactRow name="email" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </ContactRow>
                )}
                {/* LinkedIn vuelve al pie porque es el único canal social que la empresa
                    tiene. Se renderiza en cuanto CONTACT.linkedin deje de ser null: un
                    botón a linkedin.com a secas, que es lo que tenía el footer anterior,
                    es peor que no tener botón. */}
                {CONTACT.linkedin && (
                  <ContactRow name="linkedin" href={CONTACT.linkedin} external>
                    LinkedIn
                  </ContactRow>
                )}
              </ul>
            )}

            {/* Las oficinas comerciales, no el domicilio legal: ése es el de los términos
                y condiciones y no se publica como dirección de visita.

                Van como texto y no como enlace a un mapa: sin la ubicación exacta
                confirmada, un enlace a Maps armado con la dirección puede caer en la
                cuadra de al lado, y eso es peor que no tener enlace. */}
            {OFFICES.length > 0 && (
              <address className="mt-6 not-italic">
                <ul className="space-y-3">
                  {OFFICES.map((o) => (
                    <li key={o.postalCode} className="flex min-w-0 gap-2">
                      <Icon name="map-pin" className="mt-0.5 text-on-brand-label" />
                      <span className="min-w-0 text-sm leading-[var(--leading-normal)] text-on-brand-secondary">
                        {officeLine(o)}
                      </span>
                    </li>
                  ))}
                </ul>
              </address>
            )}
          </div>

          {/* --- Plataforma --- */}
          <div className="min-w-0">
            <FooterHeading>Plataforma</FooterHeading>
            <ul className="mt-4 space-y-3">
              {MODULES.map((m) => (
                <li key={m.key} className="min-w-0">
                  <Link
                    to="/plataforma/$modulo"
                    params={{ modulo: m.slug }}
                    className={FOOTER_LINK}
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Soluciones --- */}
          <div className="min-w-0">
            <FooterHeading>Soluciones</FooterHeading>
            <ul className="mt-4 space-y-3">
              {INDUSTRIES.filter((i) => i.published).map((i) => (
                <li key={i.slug} className="min-w-0">
                  <Link
                    to="/soluciones/$industria"
                    params={{ industria: i.slug }}
                    className={FOOTER_LINK}
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
              {USE_CASES.map((u) => (
                <li key={u.slug} className="min-w-0">
                  <Link
                    to="/soluciones/casos-de-uso/$caso"
                    params={{ caso: u.slug }}
                    className={FOOTER_LINK}
                  >
                    {u.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Empresa ---
              Columna propia y no apilada bajo Soluciones: con las dos juntas esta
              columna cargaba quince enlaces mientras las otras tenían ocho, y el alto de
              la más larga es el alto del pie. */}
          <div className="min-w-0">
            <FooterHeading>Empresa</FooterHeading>
            <ul className="mt-4 space-y-3">
              <li className="min-w-0">
                <Link to="/plataforma" className={FOOTER_LINK}>
                  Cómo funciona
                </Link>
              </li>
              <li className="min-w-0">
                <Link to="/plataforma/marketplace" className={FOOTER_LINK}>
                  Marketplace
                </Link>
              </li>
              <li className="min-w-0">
                <Link to="/plataforma/integraciones" className={FOOTER_LINK}>
                  Integraciones
                </Link>
              </li>
              <li className="min-w-0">
                <Link to="/partners" className={FOOTER_LINK}>
                  Partners
                </Link>
              </li>
              <li className="min-w-0">
                <Link to="/nosotros" className={FOOTER_LINK}>
                  Nosotros
                </Link>
              </li>
              <li className="min-w-0">
                <Link to="/contacto" className={FOOTER_LINK}>
                  Contacto
                </Link>
              </li>
              <li className="min-w-0">
                <Link to="/roi" className={FOOTER_LINK}>
                  Calcular ROI
                </Link>
              </li>
              {SHOW_PRICING && (
                <li className="min-w-0">
                  <Link to="/precios" className={FOOTER_LINK}>
                    Precios
                  </Link>
                </li>
              )}
              <li className="min-w-0">
                <a href={APP_URL} rel="nofollow" className={FOOTER_LINK}>
                  Ingresar a la aplicación
                </a>
              </li>
            </ul>
          </div>

          {/* --- Novedades ---
              La columna entera depende de que haya destino: sin él no se publica el
              formulario, y una columna con título y lead pero sin campo no dice nada. */}
          {NEWSLETTER_ENDPOINT && (
            <div className="min-w-0 min-[720px]:col-span-2 min-[1100px]:col-span-1">
              <Newsletter />
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--border-on-brand)] pt-6 min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between">
          <p className="text-xs text-on-brand-label">© {year} InspectIA</p>
          <p className="flex items-center gap-6">
            <Link to="/legales" className="text-xs text-on-brand-label hover:text-on-brand">
              Términos y condiciones
            </Link>
            <Link to="/privacidad" className="text-xs text-on-brand-label hover:text-on-brand">
              Política de privacidad
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

const FOOTER_LINK =
  "text-sm text-on-brand-secondary transition-colors duration-[160ms] hover:text-on-brand";

function FooterHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[var(--tracking-widest)] text-on-brand-label ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * Suscripción al newsletter.
 *
 * Sólo se monta cuando NEWSLETTER_ENDPOINT tiene valor. Hoy es null, así que el pie va
 * sin esta columna: los tres formularios del sitio —informe de ROI, postulación de
 * partners y este— están sin destino, y de los tres éste es el único que se puede sacar
 * sin romper una página entera.
 */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;
    // Sin el correo: la consola del navegador no es un lugar donde dejar datos de nadie.
    console.info("Alta de newsletter enviada");
    pushEvent("newsletter_signup", { source_page: sourcePage() });
    setSent(true);
    setEmail("");
  };

  return (
    <div>
      <FooterHeading>Novedades</FooterHeading>
      <p className="mt-4 max-w-[38ch] text-sm leading-[var(--leading-normal)] text-on-brand-secondary">
        Una vez por mes, qué módulo salió y qué aprendimos en las plantas donde estamos. Sin
        promociones.
      </p>

      {sent ? (
        // Confirmación en el mismo lugar, sin navegar.
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-on-brand">
          {/* Círculo de 24 con la tilde de 16, igual que las otras dos confirmaciones del
              sitio. Antes era un círculo de 20 con una tilde de 12 a trazo 3: a trazo 1,5
              esa combinación se afina y la tilde casi desaparece. La respuesta del sistema
              a una tilde floja es agrandarla, no engrosarla. */}
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--accent-on-brand)]">
            <Icon name="included" className="text-brand-deep" />
          </span>
          Listo, quedaste anotado.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5">
          <label htmlFor="newsletter-email" className="sr-only">
            Tu correo
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@empresa.com"
            className="h-11 w-full rounded-[var(--radius-md)] border border-[var(--border-on-brand)] bg-[var(--surface-on-brand)] px-3.5 text-sm text-on-brand outline-none placeholder:text-on-brand-label focus:border-[var(--accent-on-brand)]"
          />
          <button
            type="submit"
            className="mt-3 h-11 w-full rounded-[var(--radius-md)] bg-white px-5 text-sm font-semibold text-brand-deep transition-colors duration-[160ms] hover:bg-teal-050 active:translate-y-px"
          >
            Suscribirme
          </button>
        </form>
      )}
    </div>
  );
}

function ContactRow({
  name,
  href,
  external = false,
  children,
}: {
  /** Concepto del léxico de iconos, no el componente del glifo. */
  name: IconConcept;
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="min-w-0">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-flex items-center gap-2 text-sm text-on-brand-secondary transition-colors duration-[160ms] hover:text-on-brand"
      >
        <Icon name={name} />
        <span className="truncate">{children}</span>
      </a>
    </li>
  );
}
