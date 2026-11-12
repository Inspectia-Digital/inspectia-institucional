import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { BottomCta } from "@/components/site/BottomCta";
import { CtaPair } from "@/components/site/CtaPair";
import { RequestCta } from "@/components/site/featureSections";
import { CookieBanner } from "@/components/site/CookieBanner";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

/**
 * Cáscara común de todas las páginas. Antes cada una de las nueve rutas montaba Navbar,
 * main y Footer a mano, con su propio color de fondo y su propio padding.
 */
export function SiteLayout({
  children,
  /** La banda de cierre se repite al pie de todas las páginas. Sólo se apaga donde el
   *  cierre es otro —el marketplace pide cotización, partners pide postulación. */
  bottomCta = true,
  module,
  industry,
  /**
   * El origen que manda la barra de celular a `/contacto` en vez de los dos primarios.
   *
   * Las páginas de una funcionalidad planificada o parcial no pueden ofrecer «Empezar
   * gratis» en ningún lado, y la barra fija de celular es un lugar: es la mitad del
   * tráfico y está pegada a la pantalla todo el scroll. Con esto muestra el mismo botón
   * único que el resto de la página.
   */
  requestOrigin,
}: {
  children: React.ReactNode;
  bottomCta?: boolean;
  module?: string;
  industry?: string;
  requestOrigin?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className="flex-1">{children}</main>
      {bottomCta && <BottomCta module={module} industry={industry} />}
      <Footer />
      <MobileCtaBar module={module} requestOrigin={requestOrigin} />
      <WhatsAppFab />
      <CookieBanner />
    </div>
  );
}

/**
 * En mobile los dos primarios viven en una barra fija al pie y no dentro del hamburguesa:
 * esconderlos detrás del menú es perder las dos conversiones del sitio en la mitad del
 * tráfico. Mitad izquierda y mitad derecha, 48px de alto (§10.5).
 */
function MobileCtaBar({ module, requestOrigin }: { module?: string; requestOrigin?: string }) {
  return (
    <>
      {/* Reserva el alto de la barra para que no tape el final del footer. */}
      <div aria-hidden className="h-[76px] nav:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface px-4 py-3.5 nav:hidden">
        {requestOrigin ? (
          <RequestCta origin={requestOrigin} className="w-full" />
        ) : (
          <CtaPair size="mobile" module={module} className="!flex-row" />
        )}
      </div>
    </>
  );
}
