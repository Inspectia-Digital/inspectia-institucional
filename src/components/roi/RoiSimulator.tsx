import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalidadCalculator } from "./CalidadCalculator";
import { RecepcionCalculator } from "./RecepcionCalculator";
import { TymeoCalculator } from "./TymeoCalculator";
import { ComingSoonPanel } from "./ComingSoonPanel";

export function RoiSimulator() {
  return (
    <Tabs defaultValue="calidad" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="bg-[#084749]/40 border border-white/10 rounded-full p-1 h-auto flex-wrap gap-1 overflow-x-auto max-w-full">
          <TabsTrigger
            value="calidad"
            className="rounded-full px-4 md:px-6 py-2 text-sm text-slate-300 data-[state=active]:bg-[#17ccd3] data-[state=active]:text-[#041A1B] data-[state=active]:shadow-none whitespace-nowrap"
          >
            Control de Calidad
          </TabsTrigger>
          <TabsTrigger
            value="tymeo"
            className="rounded-full px-4 md:px-6 py-2 text-sm text-slate-300 data-[state=active]:bg-[#17ccd3] data-[state=active]:text-[#041A1B] data-[state=active]:shadow-none whitespace-nowrap"
          >
            TYMEO OEE
          </TabsTrigger>
          <TabsTrigger
            value="recepcion"
            className="rounded-full px-4 md:px-6 py-2 text-sm text-slate-300 data-[state=active]:bg-[#17ccd3] data-[state=active]:text-[#041A1B] data-[state=active]:shadow-none whitespace-nowrap"
          >
            Recepción y Docks
          </TabsTrigger>
          <TabsTrigger
            value="stock"
            className="rounded-full px-4 md:px-6 py-2 text-sm text-slate-300 data-[state=active]:bg-[#17ccd3] data-[state=active]:text-[#041A1B] data-[state=active]:shadow-none whitespace-nowrap"
          >
            Stock y Despachos
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="calidad" className="mt-0">
        <CalidadCalculator />
      </TabsContent>
      <TabsContent value="tymeo" className="mt-0">
        <TymeoCalculator />
      </TabsContent>
      <TabsContent value="recepcion" className="mt-0">
        <RecepcionCalculator />
      </TabsContent>
      <TabsContent value="stock" className="mt-0">
        <ComingSoonPanel message="Próximamente disponible — Simulador de Drones y App de Stock en desarrollo." />
      </TabsContent>
    </Tabs>
  );
}
