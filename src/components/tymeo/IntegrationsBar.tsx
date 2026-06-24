const PARTNERS = ["SAP", "Cygnus WMS", "Balluff", "Siemens PLC", "Allen Bradley"];

export function IntegrationsBar() {
  return (
    <section className="bg-[#020d0e] py-8 -mx-4">
      <p className="text-center text-sm text-slate-500 px-4">
        Orquestación fluida y nativa con su ecosistema industrial:
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4">
        {PARTNERS.map((p) => (
          <span
            key={p}
            className="text-slate-400/50 font-semibold tracking-wide text-sm md:text-base hover:text-slate-200/80 transition-colors"
          >
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
