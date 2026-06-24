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

const productos = {
  Manufactura: ["Control de Calidad", "OEE Control", "TYMEO"],
  Logística: [
    "Drones de Inventario",
    "App Control de Stock",
    "Recepción de Mercadería",
    "Control de Pedidos",
  ],
};

const soluciones = [
  "Logística",
  "Automotriz",
  "Autopartista",
  "Alimentos",
  "Textil",
];

function MenuLinkItem({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenuLink asChild>
      <a
        href="#"
        className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-white/5 hover:text-foreground transition-colors"
      >
        {children}
      </a>
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
                Productos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[520px] grid-cols-2 gap-6 p-6 bg-card/95 backdrop-blur-md border border-white/10 rounded-2xl">
                  {Object.entries(productos).map(([cat, items]) => (
                    <div key={cat}>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                        {cat}
                      </p>
                      <ul className="space-y-1">
                        {items.map((it) => (
                          <li key={it}>
                            <MenuLinkItem>{it}</MenuLinkItem>
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
                <div className="w-[240px] p-4 bg-card/95 backdrop-blur-md border border-white/10 rounded-2xl">
                  <ul className="space-y-1">
                    {soluciones.map((s) => (
                      <li key={s}>
                        <MenuLinkItem>{s}</MenuLinkItem>
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
                <a href="#tecnologia">Tecnología</a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                <a href="#institucional">Institucional</a>
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
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-glow)] font-semibold"
          >
            Agendar Demo
          </Button>
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full text-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-white/10">
            <SheetTitle className="text-foreground">Menú</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {["Productos", "Soluciones", "Tecnología", "Institucional"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="rounded-lg px-3 py-2 text-foreground/80 hover:bg-white/5 hover:text-foreground"
                >
                  {l}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="ghost" className="rounded-full justify-center">Ingresar</Button>
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-glow)]">
                  Agendar Demo
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
