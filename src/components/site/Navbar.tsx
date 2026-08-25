import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { DEMO_URL } from "@/lib/links";

type NavLink = { label: string; to: string };

const modulos: Record<string, NavLink[]> = {
  Manufactura: [
    { label: "TYMEO OEE", to: "/tymeo" },
    { label: "Control de Calidad", to: "/manufactura" },
  ],
  Logística: [
    { label: "Drones de Inventario", to: "/drones" },
    { label: "App Control de Stock", to: "/stock-picking" },
    { label: "Recepción de Mercadería", to: "/recepcion" },
    { label: "Control de Pedidos", to: "/outbound" },
  ],
  Plataforma: [{ label: "Marketplace", to: "/" }],
};

const soluciones: NavLink[] = [
  { label: "Logística", to: "/logistica" },
  { label: "Manufactura", to: "/manufactura" },
  { label: "Automotriz", to: "/manufactura" },
  { label: "Autopartista", to: "/manufactura" },
  { label: "Alimentos", to: "/manufactura" },
  { label: "Textil", to: "/manufactura" },
];

function MenuLinkItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        to={to}
        className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-white/5 hover:text-foreground transition-colors"
        activeProps={{ className: "text-foreground bg-white/5" }}
      >
        {children}
      </Link>
    </NavigationMenuLink>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-6",
          "rounded-full border border-white/10 bg-white/5 backdrop-blur-md",
          "py-2 pl-6 pr-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 shrink-0">
          <span className="text-lg font-bold tracking-tight text-foreground">
            InspectIA
          </span>
          <span className="text-lg font-bold text-primary leading-none">.</span>
        </Link>

        {/* Center menu (desktop) */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-foreground data-[state=open]:bg-white/5">
                Módulos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[620px] grid-cols-3 gap-6 p-6 bg-card/95 backdrop-blur-md border border-white/10 rounded-2xl">
                  {Object.entries(modulos).map(([cat, items]) => (
                    <div key={cat}>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                        {cat}
                      </p>
                      <ul className="space-y-1">
                        {items.map((it) => (
                          <li key={it.label}>
                            <MenuLinkItem to={it.to}>{it.label}</MenuLinkItem>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-foreground data-[state=open]:bg-white/5">
                Soluciones
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[260px] p-4 bg-card/95 backdrop-blur-md border border-white/10 rounded-2xl">
                  <ul className="space-y-1">
                    {soluciones.map((s) => (
                      <li key={s.label}>
                        <MenuLinkItem to={s.to}>{s.label}</MenuLinkItem>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                <Link to="/" hash="consultores">
                  Programa para Consultores
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                <Link to="/" hash="institucional">
                  Institucional
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Link
            to="/roi"
            className="inline-flex items-center rounded-full border border-[#17ccd3] text-[#17ccd3] hover:bg-[#17ccd3]/10 px-4 py-1.5 text-sm font-semibold transition-colors"
          >
            Calcular ROI
          </Link>
          <Button
            variant="ghost"
            className="rounded-full text-foreground/80 hover:text-foreground hover:bg-white/5"
          >
            Ingresar
          </Button>
          <Button
            asChild
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
              Agendar Demo
            </a>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full text-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-background border-white/10 overflow-y-auto"
          >
            <SheetTitle className="text-foreground">Menú</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              <Link
                to="/roi"
                className="rounded-lg px-3 py-2 font-semibold text-[#17ccd3] border border-[#17ccd3]/40 bg-[#17ccd3]/5"
              >
                Calcular ROI
              </Link>

              <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-primary">
                Módulos
              </p>
              {Object.values(modulos)
                .flat()
                .map((it) => (
                  <Link
                    key={`m-${it.label}`}
                    to={it.to}
                    className="rounded-lg px-3 py-2 text-foreground/80 hover:bg-white/5 hover:text-foreground"
                  >
                    {it.label}
                  </Link>
                ))}

              <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-primary">
                Soluciones
              </p>
              {soluciones.map((s) => (
                <Link
                  key={`s-${s.label}`}
                  to={s.to}
                  className="rounded-lg px-3 py-2 text-foreground/80 hover:bg-white/5 hover:text-foreground"
                >
                  {s.label}
                </Link>
              ))}

              <Link
                to="/"
                hash="consultores"
                className="mt-4 rounded-lg px-3 py-2 text-foreground/80 hover:bg-white/5 hover:text-foreground"
              >
                Programa para Consultores
              </Link>
              <Link
                to="/"
                hash="institucional"
                className="rounded-lg px-3 py-2 text-foreground/80 hover:bg-white/5 hover:text-foreground"
              >
                Institucional
              </Link>

              <div className="mt-4 flex flex-col gap-2">
                <Button variant="ghost" className="rounded-full justify-center">
                  Ingresar
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                    Agendar Demo
                  </a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
