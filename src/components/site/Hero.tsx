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
          </div>
        </div>
      </div>
    </section>
  );
}
