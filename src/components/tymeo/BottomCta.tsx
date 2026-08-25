import { ArrowRight, Play } from "lucide-react";
import { DEMO_URL } from "@/lib/links";

export function BottomCta() {
  return (
    <section className="py-20 md:py-28">
      <div className="relative max-w-5xl mx-auto bg-[#084749] border border-white/10 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 bg-[#17ccd3]/30 blur-3xl rounded-full pointer-events-none" />
        <h2 className="relative text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight">
          Empezá a medir hoy.
        </h2>
        <p className="relative mt-4 text-slate-300 max-w-xl mx-auto">
          Sin tarjeta, sin instalar nada. Subís de plan el día que tu planta lo pida.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
          <a
            href="#planes"
            className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
          >
            Empezar gratis
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-500 text-white font-semibold py-3 px-6 hover:bg-white/5 transition"
          >
            <Play className="h-4 w-4" />
            Hablar con ingeniería
          </a>
        </div>
      </div>
    </section>
  );
}
