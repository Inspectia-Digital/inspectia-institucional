import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
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
 */
function NotFoundComponent() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Error 404"
        title="No encontramos esa página"
        lead="Puede que el enlace sea viejo: el sitio se reorganizó y las páginas de producto ahora viven bajo /plataforma. Abajo están los ocho módulos."
        cta={false}
      />
      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[var(--content-max)]">
          <ModuleGrid />
        </div>
      </section>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no cargó
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo falló de nuestro lado. Podés reintentar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
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
    links: [{ rel: "stylesheet", href: appCss }],
    // Vacío mientras no haya VITE_GTM_ID. El primero de los dos scripts es el
    // consentimiento por defecto y tiene que ir antes del contenedor.
    scripts: gtmHeadScripts(),
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
