import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import fabricaAsset from "@/assets/fabrica-logistica.png.asset.json";

export function Hero() {
  return (
    <section className="relative px-4 pt-16 pb-12 md:pt-24 md:pb-16">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[600px] max-w-5xl"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(23,204,211,0.18), transparent 60%)",
        }}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card px-4 py-1.5 text-xs md:text-sm text-foreground/90">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
          Fábricas y Empresas logísticas más eficientes con repagos menores a 6 meses.
        </div>

        {/* H1 */}
        <h1 className="mt-8 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-foreground">
          Aplicamos IA Industrial sin cambiar procesos ni sistemas.{" "}
          <span className="bg-gradient-to-r from-white to-[#17ccd3] bg-clip-text text-transparent">
            Resultados en menos de 15 días.
          </span>
        </h1>

        {/* H2 */}
        <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
          Control de calidad automatizado, optimización del OEE, control de
          recepción, stock y pedidos, todo en una sola plataforma con
          integración nativa PLC, WMS, ERP, MES...
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-glow-lg)] font-semibold px-6"
          >
            Agendar Demo <ArrowRight className="ml-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:text-primary px-6"
          >
            <Calculator className="mr-1" /> Calcular mi ROI
          </Button>
        </div>
      </div>

      {/* Computer Vision Visual */}
      <div className="mx-auto mt-16 w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="relative aspect-[16/9]">
            <img
              src={fabricaAsset.url}
              alt="Vista isométrica de una fábrica y centro logístico monitoreados por InspectIA"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark overlay for legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(4,26,27,0.35) 0%, rgba(4,26,27,0.75) 100%)",
              }}
            />

            {/* Bounding box */}
            <div className="absolute left-[34%] top-[32%] h-[42%] w-[28%]">
              <div className="relative h-full w-full rounded-md border border-[#17ccd3] shadow-[0_0_20px_rgba(23,204,211,0.5)]">
                {/* Corner ticks */}
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((c, i) => (
                  <span
                    key={i}
                    className={`absolute h-3 w-3 border-[#17ccd3] ${c}`}
                  />
                ))}
                <div className="absolute -top-9 left-0 inline-flex items-center gap-2 rounded-md bg-[#17ccd3] px-2.5 py-1 text-xs font-semibold text-[#041A1B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#041A1B]" />
                  Pallet Verified: 99.9% Accuracy
                </div>
              </div>
            </div>

            {/* Left glass card */}
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 max-w-[260px] rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-4">
              <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                Módulo Logístico Activo
              </p>
              <p className="mt-1 text-sm text-foreground font-medium">
                API Connected:{" "}
                <span className="text-primary">WMS Cygnus</span>
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-foreground/70">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                Streaming en tiempo real
              </div>
            </div>

            {/* Right glass card */}
            <div className="absolute right-4 top-4 md:right-6 md:top-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-4">
              <p className="text-[10px] uppercase tracking-wider text-foreground/60 font-semibold">
                Línea de Producción 03
              </p>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">0</span>
                <span className="pb-1 text-xs text-foreground/70">defectos</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-foreground/70">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Estado: Óptimo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
