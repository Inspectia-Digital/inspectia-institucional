import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, Phone } from "lucide-react";
import { MODULES } from "@/content/modules";
import { INDUSTRIES, USE_CASES } from "@/content/solutions";
import { APP_URL, CONTACT, SHOW_PRICING } from "@/content/site";

/**
 * Pie del sitio (§11.12).
 *
 * Cinco columnas que colapsan a tres en 1100 y a dos en 720. **Todo item lleva
 * min-width:0**: sin eso un item de grid no baja de su min-content y empuja el documento.
 * Es literalmente el bug que tenía este footer —la columna del newsletter, sola, pedía
 * 896px dentro de 845 y generaba scroll horizontal— y no se ve en desktop.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-deep px-5 pb-8 pt-20 md:px-8">
      <div className="mx-auto max-w-[var(--content-max)]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 xl:grid-cols-5">
          {/* Marca y contacto */}
          <div className="col-span-2 min-w-0 md:col-span-3 xl:col-span-1">
            <p className="text-xl font-bold tracking-tight text-on-brand">
              InspectIA<span className="text-[var(--accent-on-brand)]">.</span>
            </p>
            <p className="mt-3 max-w-[36ch] text-sm text-on-brand-secondary">
              El sistema operativo de la operación industrial.
            </p>

            <ul className="mt-6 space-y-3">
              {CONTACT.phone && (
                <ContactRow icon={Phone} href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  {CONTACT.phone}
                </ContactRow>
              )}
              {CONTACT.email && (
                <ContactRow icon={Mail} href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </ContactRow>
              )}
              {CONTACT.linkedin && (
                <ContactRow icon={Linkedin} href={CONTACT.linkedin} external>
                  LinkedIn
                </ContactRow>
              )}
            </ul>
          </div>

          <FooterColumn title="Plataforma">
            {MODULES.map((m) => (
              <li key={m.key} className="min-w-0">
                <Link to="/plataforma/$modulo" params={{ modulo: m.slug }} className={FOOTER_LINK}>
                  {m.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Soluciones">
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
          </FooterColumn>

          <FooterColumn title="Empresa">
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
          </FooterColumn>

          <FooterColumn title="Empezar">
            <li className="min-w-0">
              <a
                href={APP_URL}
                className="text-sm text-on-brand-secondary transition-colors duration-[160ms] hover:text-on-brand"
              >
                Ingresar a la aplicación
              </a>
            </li>
            <li className="min-w-0">
              <Link to="/legales" className={FOOTER_LINK}>
                Términos
              </Link>
            </li>
            <li className="min-w-0">
              <Link to="/privacidad" className={FOOTER_LINK}>
                Privacidad
              </Link>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-16 border-t border-[var(--border-on-brand)] pt-6">
          <p className="text-xs text-on-brand-label">
            © {year} InspectIA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

const FOOTER_LINK =
  "text-sm text-on-brand-secondary transition-colors duration-[160ms] hover:text-on-brand";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[var(--tracking-widest)] text-on-brand-label">
        {title}
      </p>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  href,
  external,
  children,
}: {
  icon: typeof Phone;
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
        <Icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
        <span className="truncate">{children}</span>
      </a>
    </li>
  );
}
