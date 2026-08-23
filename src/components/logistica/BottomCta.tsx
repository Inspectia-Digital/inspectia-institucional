import { ArrowRight, Play } from "lucide-react";

export function BottomCta() {
  return (
    <section id="especialista" className="py-20 md:py-28">
      <div className="relative max-w-5xl mx-auto bg-[#084749] border border-white/10 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 bg-[#17ccd3]/30 blur-3xl rounded-full pointer-events-none" />
        <p className="relative text-xs font-semibold uppercase tracking-wider text-[#17ccd3]">
          Supply Chain & Logística
        </p>
        <h2 className="relative mt-3 text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight">
          ¿Listo para transformar su Centro de Distribución? Realicemos un
          relevamiento de su flujo operativo.
        </h2>
        <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3.5 px-7 text-base shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
          >
            Agendar Diagnóstico
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://calendar.google.com/calendar/u/0/appointments/schedules/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white font-semibold py-3.5 px-7 hover:bg-white/5 transition"
          >
            <Play className="h-4 w-4" />
            Ver Demo Integral
          </a>
        </div>
      </div>
    </section>
  );
}
