import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CtaPair } from "@/components/site/CtaPair";
import { MODULES } from "@/content/modules";
import { INDUSTRIES, USE_CASES } from "@/content/solutions";
import { approvedCases } from "@/content/cases";
import { APP_URL, SHOW_PRICING } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Barra y mega-menú (§11.1).
 *
 * La versión anterior era una píldora flotante oscura con backdrop-blur y esquinas
 * redondeadas; acá es una barra blanca de 72px pegada arriba, con borde inferior.
 *
 * Se usan los primitivos de Radix directo y no el wrapper de components/ui: ese wrapper
 * monta siempre un Viewport con `max-w-max`, y el panel de Plataforma tiene que medir el
 * ancho del contenido (1200px), no el del disparador.
 *
 * Para que ese ancho salga hay que desarmar **dos** bloques contenedores, no uno. Los
 * `static` de Root, List e Item son el primero. El segundo es un div sin clases que
 * Radix inyecta entre el `<nav>` y la lista con `style="position:relative"` puesto a
 * mano: como es inline, ninguna clase de Tailwind lo pisa sin `!`, y mientras siga en
 * relative el panel mide lo que mide la lista de disparadores —326px— y los ocho módulos
 * se apilan unos sobre otros. De ahí `[&>div]:static!`.
 *
 * **Plataforma no agrupa por industria.** Los ocho módulos van en una lista plana: quien
 * entra por una vertical tiene que ver que hay una plataforma, que es justamente lo que
 * la navegación anterior escondía.
 */

const PLATFORM_LINKS = [
  { label: "Cómo funciona la plataforma", to: "/plataforma" },
  { label: "Integraciones", to: "/plataforma/integraciones" },
  { label: "Marketplace", to: "/plataforma/marketplace" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-surface",
        scrolled && "[backdrop-filter:var(--blur-panel)] bg-surface/90",
      )}
    >
      <div
        className={cn(
          // relative: es el bloque contenedor de los paneles, para que midan el ancho del
          // contenido y no el del ítem que los abre.
          "relative mx-auto flex h-[var(--navbar-h-sm)] max-w-[var(--content-max)]",
          "items-center justify-between gap-6 px-5 nav:h-[var(--navbar-h)] nav:px-8",
        )}
      >
        <Wordmark />

        {/* ---------- Escritorio ---------- */}
        <NavigationMenu.Root
          // 120ms de retardo de entrada para no abrir el panel al pasar de largo con el
          // mouse; 240ms de gracia al salir para poder cruzar el hueco hacia el panel.
          delayDuration={120}
          skipDelayDuration={240}
          // static en Root/List/Item, y static! en el div que Radix inyecta con
          // position:relative inline. Si alguno queda posicionado, el panel se ancla a él.
          className="static hidden nav:block [&>div]:static!"
        >
          <NavigationMenu.List className="static flex items-center gap-7">
            <NavigationMenu.Item className="static">
              <MenuTrigger>Plataforma</MenuTrigger>
              <Panel>
                <div className="grid grid-cols-4 gap-8">
                  {/* Dos columnas de cuatro y no tres columnas de tres. Con tres, cada
                      módulo tenía 265px y la promesa entraba en 38 caracteres: las ocho
                      salían cortadas con puntos suspensivos, así que la línea ocupaba
                      lugar sin decir nada. A dos columnas hay ~410px y la promesa más
                      larga —la de control de calidad, 105 caracteres— entra en dos
                      líneas. */}
                  <ul className="col-span-3 grid grid-cols-2 gap-x-6 gap-y-1">
                    {MODULES.map((m) => (
                      <li key={m.key} className="min-w-0">
                        <NavigationMenu.Link asChild>
                          <Link
                            to="/plataforma/$modulo"
                            params={{ modulo: m.slug }}
                            className="flex min-h-14 items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 transition-colors duration-[160ms] hover:bg-brand-subtle"
                          >
                            <m.icon
                              className="size-5 shrink-0 text-brand"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                            <span className="min-w-0">
                              <span className="block text-[15px] font-semibold text-ink">
                                {m.name}
                              </span>
                              <span className="block text-[13px] leading-[var(--leading-normal)] text-ink-secondary">
                                {m.promise}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>

                  <ul className="min-w-0 rounded-[var(--radius-md)] bg-surface-sunken p-4">
                    {PLATFORM_LINKS.map((l) => (
                      <li key={l.to}>
                        <NavigationMenu.Link asChild>
                          <Link
                            to={l.to}
                            className="block rounded-[var(--radius-sm)] px-3 py-2.5 text-[15px] font-medium text-ink transition-colors duration-[160ms] hover:text-brand"
                          >
                            {l.label}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="static">
              <MenuTrigger>Soluciones</MenuTrigger>
              <Panel>
                <div className="grid grid-cols-2 gap-10">
                  <MenuColumn title="Por industria">
                    {INDUSTRIES.filter((i) => i.published).map((i) => (
                      <MenuRow key={i.slug} to={`/soluciones/${i.slug}`}>
                        {i.name}
                      </MenuRow>
                    ))}
                  </MenuColumn>
                  <MenuColumn title="Por caso de uso">
                    {USE_CASES.map((u) => (
                      <MenuRow key={u.slug} to={`/soluciones/casos-de-uso/${u.slug}`}>
                        {u.name}
                      </MenuRow>
                    ))}
                  </MenuColumn>
                </div>
                {/* El enlace aparece cuando hay al menos un caso aprobado para publicar.
                    /soluciones/casos devuelve 404 mientras la lista esté vacía, y una
                    entrada del menú que lleva a un 404 es peor que no tenerla. */}
                {approvedCases().length > 0 && (
                  <div className="mt-6 border-t border-line pt-4">
                    <NavigationMenu.Link asChild>
                      <Link
                        to="/soluciones/casos"
                        className="text-[15px] font-medium text-brand hover:underline hover:underline-offset-4"
                      >
                        Ver todos los casos de cliente
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                )}
              </Panel>
            </NavigationMenu.Item>

            {SHOW_PRICING && (
              <NavigationMenu.Item className="static">
                <NavigationMenu.Link asChild>
                  <TopLink to="/precios">Precios</TopLink>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            )}

            <NavigationMenu.Item className="static">
              <NavigationMenu.Link asChild>
                <TopLink to="/partners">Partners</TopLink>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* ---------- Derecha ---------- */}
        <div className="hidden items-center gap-6 nav:flex">
          {/* Enlaces de texto: los únicos botones de la barra son los dos primarios.
              Y por eso son también lo primero que se cae: entre el corte de 900px y los
              1100 la barra completa —lockup, tres entradas, dos enlaces y los dos
              botones— no entra, y lo que hacía era empujar el documento. Los dos botones
              se quedan siempre (§11.1); los dos enlaces vuelven cuando hay lugar, y
              mientras tanto siguen en el pie y en el menú de mobile. */}
          <div className="hidden items-center gap-6 min-[1100px]:flex">
            <TopLink to="/roi">Calcular ROI</TopLink>
            <a
              href={APP_URL}
              className="text-[15px] font-medium text-ink-secondary transition-colors duration-[160ms] hover:text-brand"
            >
              Ingresar
            </a>
          </div>
          <CtaPair size="bar" />
        </div>

        {/* ---------- Mobile ---------- */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="nav:hidden">
            <button
              type="button"
              aria-label="Abrir el menú"
              className="-mr-2 flex size-12 items-center justify-center rounded-[var(--radius-md)] text-ink"
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full max-w-none overflow-y-auto border-none bg-surface p-0 sm:max-w-none"
          >
            <div className="px-5 py-5">
              <SheetTitle className="sr-only">Menú</SheetTitle>

              {/* Un acordeón a la vez, con Plataforma abierto por defecto. */}
              <Accordion type="single" collapsible defaultValue="plataforma">
                <AccordionItem value="plataforma" className="border-line">
                  <AccordionTrigger className="py-4 text-base font-semibold text-ink hover:no-underline">
                    Plataforma
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {MODULES.map((m) => (
                        <li key={m.key}>
                          <Link
                            to="/plataforma/$modulo"
                            params={{ modulo: m.slug }}
                            onClick={() => setMobileOpen(false)}
                            className={MOBILE_ROW}
                          >
                            <m.icon
                              className="size-5 shrink-0 text-brand"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                            {m.name}
                          </Link>
                        </li>
                      ))}
                      {PLATFORM_LINKS.map((l) => (
                        <li key={l.to}>
                          <MobileRow to={l.to} onNavigate={() => setMobileOpen(false)}>
                            {l.label}
                          </MobileRow>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="soluciones" className="border-line">
                  <AccordionTrigger className="py-4 text-base font-semibold text-ink hover:no-underline">
                    Soluciones
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {INDUSTRIES.filter((i) => i.published).map((i) => (
                        <li key={i.slug}>
                          <MobileRow
                            to={`/soluciones/${i.slug}`}
                            onNavigate={() => setMobileOpen(false)}
                          >
                            {i.name}
                          </MobileRow>
                        </li>
                      ))}
                      {USE_CASES.map((u) => (
                        <li key={u.slug}>
                          <MobileRow
                            to={`/soluciones/casos-de-uso/${u.slug}`}
                            onNavigate={() => setMobileOpen(false)}
                          >
                            {u.name}
                          </MobileRow>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <ul className="mt-2">
                {SHOW_PRICING && (
                  <li>
                    <MobileRow to="/precios" onNavigate={() => setMobileOpen(false)} strong>
                      Precios
                    </MobileRow>
                  </li>
                )}
                <li>
                  <MobileRow to="/partners" onNavigate={() => setMobileOpen(false)} strong>
                    Partners
                  </MobileRow>
                </li>
                <li>
                  <MobileRow to="/roi" onNavigate={() => setMobileOpen(false)} strong>
                    Calcular ROI
                  </MobileRow>
                </li>
                <li>
                  <a
                    href={APP_URL}
                    className="flex h-12 items-center text-base font-semibold text-ink"
                  >
                    Ingresar
                  </a>
                </li>
              </ul>

              {/* Los dos primarios no viven acá adentro: viven en la barra fija al pie,
                  que monta SiteLayout. Esconderlos detrás del hamburguesa es perder las
                  dos conversiones del sitio en la mitad del tráfico. */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <Link to="/" className="shrink-0 text-xl font-bold tracking-tight text-ink">
      {/* TODO(equipo): reemplazar por el lockup a 32px de alto cuando exista el vector.
          Hoy los logos son PNG recortados y la marca no escala limpia (§15.10). */}
      InspectIA<span className="text-brand">.</span>
    </Link>
  );
}

function MenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenu.Trigger className="group flex cursor-pointer items-center gap-1.5 text-[15px] font-medium text-ink-secondary outline-none transition-colors duration-[160ms] hover:text-brand data-[state=open]:text-brand">
      {children}
      <ChevronDown
        className="size-3.5 transition-transform duration-[160ms] group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </NavigationMenu.Trigger>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenu.Content
      className={cn(
        "absolute left-0 right-0 top-full z-50",
        // Radio sólo abajo: el panel cuelga de la barra, no flota suelto.
        "rounded-b-[var(--radius-lg)] border border-t-0 border-line bg-surface p-8 shadow-[var(--shadow-md)]",
        "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
      )}
    >
      {children}
    </NavigationMenu.Content>
  );
}

function MenuColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="eyebrow mb-3">{title}</p>
      <ul>{children}</ul>
    </div>
  );
}

function MenuRow({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className="min-w-0">
      <NavigationMenu.Link asChild>
        <Link
          to={to}
          className="block rounded-[var(--radius-sm)] px-3 py-2.5 text-[15px] text-ink transition-colors duration-[160ms] hover:bg-brand-subtle hover:text-brand"
        >
          {children}
        </Link>
      </NavigationMenu.Link>
    </li>
  );
}

function TopLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-[15px] font-medium text-ink-secondary transition-colors duration-[160ms] hover:text-brand"
      activeProps={{ className: "text-brand" }}
    >
      {children}
    </Link>
  );
}

// 48px de alto mínimo: es el objetivo táctil, no una decisión estética.
const MOBILE_ROW = "flex h-12 items-center gap-3 text-[15px] text-ink";

function MobileRow({
  to,
  children,
  onNavigate,
  strong,
}: {
  to: string;
  children: React.ReactNode;
  onNavigate: () => void;
  strong?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(MOBILE_ROW, strong && "text-base font-semibold")}
    >
      {children}
    </Link>
  );
}
