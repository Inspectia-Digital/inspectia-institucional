import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PLANT_PLAN } from "@/content/assets";

type Hotspot = {
  left: string;
  top: string;
  title: string;
  body: string;
  /** Card placement relative to the dot */
  side?: "bottom" | "top";
  align?: "left" | "center" | "right";
};

// Order: left → right across the plant
const HOTSPOTS: Hotspot[] = [
  {
    left: "33.5%",
    top: "44.7%",
    title: "Software de Recepción",
    body: "Auditoría automatizada con cámaras e inteligencia artificial de mercadería entrante. Sincronización directa vía API con WMS. Reduce FTEs, disminuye el lead time de recepción y reduce errores.",
    side: "bottom",
    align: "center",
  },
  {
    left: "44.9%",
    top: "23.8%",
    title: "Monitoreo de Productividad y Eficiencia (TYMEO OEE)",
    body: "Dashboards e información de las líneas en tiempo real. Expone cuellos de botella ocultos y minimiza paradas de producción. Implementación en menos de 15 días.",
    side: "bottom",
    align: "center",
  },
  {
    left: "49.3%",
    top: "36.9%",
    title: "Control de Calidad Automatizado (QCaaS)",
    body: "Control de calidad como servicio. Modelos de IA que detectan fallas en tiempo real. Integración al PLC para derivar si corresponde. No se cansa, no se distrae, no falla.",
    side: "bottom",
    align: "center",
  },
  {
    left: "57.6%",
    top: "13.8%",
    title: "Drones Autónomos en Racks de Altura",
    body: "Control de posiciones de sobrestock autónomo. Drones con navegación autónoma para control regular de sobrestock. Detecta inconsistencias y estado general, informa al WMS vía API para corregir.",
    side: "bottom",
    align: "center",
  },
  {
    left: "64.7%",
    top: "45%",
    title: "Monitoreo de Productividad y Seguridad",
    body: "Integración de modelos de IA a las cámaras de seguridad existentes para seguimiento de movimientos, control de EPP, ingreso a zonas restringidas y prevención de accidentes.",
    side: "bottom",
    align: "center",
  },
  {
    left: "69.5%",
    top: "32.7%",
    title: "App de Control de Stock en Posiciones",
    body: "Aplicación para simplificar el control del stock en posiciones de picking por parte de los operarios.",
    side: "bottom",
    align: "right",
  },
  {
    left: "76.1%",
    top: "44.5%",
    title: "Control de Armado de Pedidos",
    body: "Validación óptica por cantidad de unidades en mesas de despacho. Sistema de canal verde (aprobación automática al WMS) o canal rojo (revisión manual ante discrepancias).",
    side: "top",
    align: "right",
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  const openIndex = pinnedIndex ?? activeIndex;

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
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
          >
            Agendar Demo <ArrowRight className="ml-1" />
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:text-primary px-6"
          >
            <Link to="/roi">
              <Calculator className="mr-1" /> Calcular mi ROI
            </Link>
          </Button>
        </div>
      </div>

      {/* Computer Vision Visual */}
      <div className="mx-auto mt-16 w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="relative aspect-[16/9]">
            <img
              src={PLANT_PLAN.src}
              srcSet={`${PLANT_PLAN.src960} 960w, ${PLANT_PLAN.src} 1920w`}
              sizes="(max-width: 1024px) 100vw, 1024px"
              width={PLANT_PLAN.width}
              height={PLANT_PLAN.height}
              alt={PLANT_PLAN.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Click-away overlay when a card is pinned */}
            {pinnedIndex !== null && (
              <button
                type="button"
                aria-label="Cerrar tarjeta"
                className="absolute inset-0 z-10 cursor-default"
                onClick={() => setPinnedIndex(null)}
              />
            )}

            {HOTSPOTS.map((p, i) => {
              const isOpen = openIndex === i;
              const sideClass =
                p.side === "top"
                  ? "bottom-full mb-4"
                  : "top-full mt-4";
              const alignClass =
                p.align === "right"
                  ? "right-0"
                  : p.align === "left"
                  ? "left-0"
                  : "left-1/2 -translate-x-1/2";

              return (
                <div
                  key={i}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: p.left, top: p.top }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <button
                    type="button"
                    aria-label={p.title}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPinnedIndex(pinnedIndex === i ? null : i);
                    }}
                    className="relative block cursor-pointer"
                  >
                    <span className="absolute left-1/2 top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#084749] opacity-70 animate-ping" />
                    <span className="relative block h-3 w-3 rounded-full bg-[#084749] shadow-[0_0_12px_#084749,0_0_28px_rgba(8,71,73,0.8)] ring-2 ring-white/70" />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className={`pointer-events-none absolute z-30 w-72 ${sideClass} ${alignClass}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="pointer-events-auto rounded-xl border border-white/15 bg-[#084749]/70 p-4 text-left shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#17ccd3] text-[10px] font-bold text-[#041A1B]">
                              {i + 1}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#17ccd3]">
                              {p.title}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                            {p.body}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
