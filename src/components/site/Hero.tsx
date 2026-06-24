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
            {[
              { left: "33.5%", top: "44.7%", label: "Recepción de mercadería" },
              { left: "44.9%", top: "23.8%", label: "Línea de producción" },
              { left: "49.3%", top: "36.9%", label: "Línea de producción" },
              { left: "57.6%", top: "13.8%", label: "Almacenamiento" },
              { left: "69.5%", top: "32.7%", label: "Almacenamiento" },
              { left: "76.1%", top: "44.5%", label: "Armado y despacho" },
              { left: "64.7%", top: "45%", label: "Visión global de planta" },
            ].map((p, i) => (
              <div
                key={i}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: p.left, top: p.top }}
              >
                <span className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 block h-5 w-5 rounded-full bg-[#17ccd3] opacity-60 animate-ping" />
                <span className="relative block h-3 w-3 rounded-full bg-[#17ccd3] shadow-[0_0_10px_#17ccd3,0_0_24px_rgba(23,204,211,0.7)] ring-2 ring-white/40" />
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#041A1B]/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#17ccd3] opacity-0 transition-opacity group-hover:opacity-100">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
