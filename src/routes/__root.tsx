import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { gtmHeadScripts } from "../lib/gtm";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";

/**
 * 404 con la navegación del sitio.
 *
 * Una pantalla suelta con un botón "volver al inicio" deja al visitante con una sola
 * salida. Con la barra puesta, la mayoría de las 404 vienen de un enlace viejo a un
 * módulo, y desde el mega-menú llega al que buscaba sin volver a empezar. Debajo van los
 * ocho módulos, que es a donde apuntaban casi todas las URLs de la web anterior.
 *
 * El `noindex` va como meta suelta y no por `pageHead`: una URL que no existe no
 * corresponde a ninguna ruta, así que no hay `head` de ruta donde declararlo. React 19
 * lo iza al head igual.
 */
function NotFoundComponent() {
  return (
    <SiteLayout>
      <meta name="robots" content="noindex" />
      <PageHero
        title="Esta página no existe"
        lead="Puede que haya cambiado de dirección: la web se reorganizó y ahora los módulos viven dentro de la plataforma."
        cta={false}
      >
        <p className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link to="/plataforma" className={NOT_FOUND_LINK}>
            Ver la plataforma
          </Link>
          <Link to="/" className={NOT_FOUND_LINK}>
            Volver al inicio
          </Link>
        </p>
      </PageHero>
      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <ModuleGrid />
        </div>
      </section>
    </SiteLayout>
  );
}

const NOT_FOUND_LINK =
  "text-[15px] font-semibold text-on-brand underline underline-offset-4 decoration-[var(--accent-on-brand)] hover:decoration-2";

/**
 * Pantalla de error de aplicación.
 *
 * **Sin código de error ni traza.** Un visitante no puede hacer nada con un stack, y
 * verlo sólo confirma que el sitio está roto. La traza va a la consola y al reporte, que
 * es donde sirve.
 *
 * "Algo se rompió de nuestro lado" y no "ocurrió un error inesperado": no culpa al
 * visitante y dice de quién es el problema.
 */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    // Vocabulario del sitio y no el de shadcn. Las clases `bg-background`,
    // `text-foreground` y `bg-primary` resuelven bien porque el puente de theme.css las
    // ata a los mismos tokens, pero ese puente existe para los componentes vendorizados
    // de components/ui, no para el código propio: mientras esta pantalla hable en un
    // vocabulario y el resto del sitio en otro, sacar el puente algún día la rompe.
    <div className="flex min-h-screen items-center justify-center bg-surface px-5">
      <div className="max-w-md text-center">
        <h1 className="text-[length:var(--text-card)] font-semibold leading-snug text-ink">
          Algo se rompió de nuestro lado
        </h1>
        <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
          Ya nos estamos enterando. Probá recargar la página; si sigue pasando, escribinos y lo
          miramos.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            // 52px de alto y radio de 8: el botón primario del sistema.
            className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-action px-6 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-action-hover active:translate-y-px"
          >
            Recargar
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Valores por defecto: cada ruta escribe su título y su descripción a mano. Lo que
      // había acá era el andamiaje del generador —title "Lovable App", author "Lovable",
      // twitter:site "@Lovable" y un og:image apuntando al preview— y salía en el head de
      // toda página que no lo pisara.
      { title: "InspectIA · Inteligencia operativa industrial" },
      {
        name: "description",
        content:
          "Ocho módulos sobre la operación que ya tenés: OEE, calidad, recepción, inventario y pedidos. Funciona con tus máquinas, tus cámaras y tu ERP.",
      },
      { property: "og:site_name", content: "InspectIA" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_AR" },
      { name: "twitter:card", content: "summary_large_image" },
      // TODO(equipo): falta la imagen de compartido propia (1200x630).
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // El ICO va primero y con `sizes: any` porque el navegador lo pide por su cuenta
      // aunque el HTML declare otra cosa; sin el archivo, cada visita deja un 404.
      // Los tres se generan con `npm run images` desde el mismo isotipo.
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      // 96x96 y no 32: Google sólo toma como favicon de resultados un cuadrado de 48px o
      // un múltiplo, y el 32 era el único tamaño declarado explícitamente. Ver la nota
      // larga en scripts/optimize-images.mjs.
      { rel: "icon", type: "image/png", href: "/favicon-96.png", sizes: "96x96" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    /* Acá NO van los scripts de GTM, y es a propósito.
     *
     * Estuvieron en `scripts:` de este `head` y se comprobó en producción el 9 de
     * septiembre de 2026 que **el enrutador los vuelve a ejecutar en cada navegación
     * interna**: dos navegaciones bastaban para que `gtm.js` y el `consent default` se
     * empujaran tres veces al dataLayer y para que quedaran tres etiquetas del contenedor
     * en el DOM. Lo grave no es el desperdicio sino el consentimiento: después de que
     * alguien acepta, cada cambio de página volvía a empujar el estado por omisión
     * —denegado— sobre una elección ya concedida.
     *
     * Ahora se inyectan en el `RootShell`, que se renderiza una sola vez y no participa
     * del ciclo de vida del `head` por ruta. */
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        {/* Los dos scripts de medición, antes que nada y fuera del `head` por ruta.
            El orden es el que importa: primero el consentimiento por omisión, que además
            restaura la elección guardada, y recién después el contenedor. Al revés, las
            etiquetas disparan con el valor por omisión de Google —concedido— antes de que
            nadie haya elegido nada. */}
        {gtmHeadScripts().map((s, i) => (
          <script key={i} dangerouslySetInnerHTML={{ __html: s.children }} />
        ))}
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
