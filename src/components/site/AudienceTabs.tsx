import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Factory, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type AudienceKey = "manufactura" | "logistica";

type Audience = {
  key: AudienceKey;
  tabLabel: string;
  audience: string;
  icon: React.ReactNode;
  body: string;
  cta: string;
};

const AUDIENCES: Audience[] = [
  {
    key: "manufactura",
    tabLabel: "Manufactura y Calidad",
    audience: "Para Directores de Planta y Gerentes de Calidad",
    icon: <Factory className="h-12 w-12 md:h-16 md:w-16 text-[#17ccd3]" strokeWidth={1.5} />,
    body: "Erradicá el scrap antes de que llegue al cliente, optimizá el OEE con visibilidad real de paradas y cuellos de botella, y sostené un control de calidad 24/7 que no se cansa, no se distrae y no falla. Modelos de IA integrados a tu PLC para decidir en tiempo real.",
    cta: "Solicitar visita sin cargo a la planta",
  },
  {
    key: "logistica",
    tabLabel: "Logística y Supply Chain",
    audience: "Para Directores de Logística y Operadores 3PL",
    icon: <Warehouse className="h-12 w-12 md:h-16 md:w-16 text-[#17ccd3]" strokeWidth={1.5} />,
    body: "Eliminá los descuadres de stock entre WMS y posición física, auditá inventarios con drones autónomos sin detener la operación, y liberá capital inmovilizado por sobrestock o faltantes invisibles. Recepción y despacho validados ópticamente con sincronización directa al WMS.",
    cta: "Solicitar visita sin cargo al CD",
  },
];

export function AudienceTabs() {
  const [value, setValue] = useState<AudienceKey>("manufactura");

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
          Soluciones diseñadas para mejorar tus{" "}
          <span className="bg-gradient-to-r from-white to-[#17ccd3] bg-clip-text text-transparent">
            KPIs
          </span>
        </h2>

        <Tabs value={value} onValueChange={(v) => setValue(v as AudienceKey)} className="mt-10">
          <div className="flex justify-center">
            <TabsList className="h-auto rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
              {AUDIENCES.map((a) => (
                <TabsTrigger
                  key={a.key}
                  value={a.key}
                  className="rounded-full px-5 py-2 text-sm font-medium text-white/70 transition-colors data-[state=active]:bg-[#17ccd3] data-[state=active]:text-[#041A1B] data-[state=active]:shadow-none"
                >
                  {a.tabLabel}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="relative mt-8">
            <AnimatePresence mode="wait">
              {AUDIENCES.filter((a) => a.key === value).map((a) => (
                <TabsContent key={a.key} value={a.key} forceMount asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl border border-white/10 bg-[#084749] p-6 md:p-10"
                  >
                    <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto] md:gap-8">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                        {a.icon}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#17ccd3]">
                          {a.audience}
                        </p>
                        <p className="mt-3 text-base md:text-lg text-white/85 leading-relaxed">
                          {a.body}
                        </p>
                      </div>
                      <div className="md:justify-self-end">
                        <Button
                          size="lg"
                          className="rounded-full bg-[#17ccd3] text-[#041A1B] hover:bg-[#17ccd3]/90 font-semibold px-6"
                        >
                          {a.cta} <ArrowRight className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
