export function BottomCta() {
  return (
    <section className="py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-[#084749] border border-white/10 p-10 md:p-16 text-center">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[70%] blur-3xl bg-[#17ccd3]/25 rounded-full pointer-events-none" />
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-3xl mx-auto">
            ¿Listo para erradicar el scrap y maximizar su OEE? Despliegue
            InspectIA OS{" "}
            <span className="bg-gradient-to-r from-[#17ccd3] to-[#7ef7fc] bg-clip-text text-transparent">
              sin detener su producción
            </span>
            .
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/"
            target="_blank"
            rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17ccd3] px-7 py-3.5 text-sm font-bold text-[#041A1B] shadow-[0_0_40px_rgba(23,204,211,0.4)] hover:brightness-110 transition"
            >
              Agendar Diagnóstico de Planta
            </a>
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/"
            target="_blank"
            rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Ver Demo Integral
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
