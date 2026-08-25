import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ_ITEMS = [
  {
    q: "¿Qué pasa si me quedo corto de líneas?",
    a: "Subís de plan cuando lo necesites. Tu configuración y tus datos se mantienen — solo se destraba el límite nuevo, no hay que migrar ni volver a cargar nada.",
  },
  {
    q: "¿Necesito instalar algo para usar el plan Free?",
    a: "No. En Free cargás los datos de producción manualmente desde un formulario — podés empezar a medir tu OEE hoy mismo, sin hardware ni instalación.",
  },
  {
    q: "¿La instalación en planta está incluida en el precio?",
    a: "No — es independiente del plan. La podés autogestionar con tu propio equipo, o contratarla con nosotros, en cuyo caso se cotiza aparte según el hardware que tu planta necesite.",
  },
  {
    q: "¿Puedo tener más plantas o más usuarios?",
    a: "Sí. Start cubre una planta con usuarios ilimitados, Pro llega hasta tres plantas y Enterprise no tiene límites de plantas, líneas ni usuarios.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-24 scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
          Antes de arrancar
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Preguntas frecuentes</h2>
      </div>

      <Accordion
        type="single"
        collapsible
        className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#084749]/40 backdrop-blur-xl px-6"
      >
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`} className="border-white/10">
            <AccordionTrigger className="text-left text-white hover:text-[#17ccd3] hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 leading-relaxed">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
