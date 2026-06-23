const partners = [
  "Google for Startups",
  "UBA",
  "CONICET",
  "Emprelatam",
  "ARNx",
  "Miebach",
  "Auren",
  "Antea",
  "Balluff",
  "Cygnus",
  "BPS",
  "Tecnología BI",
  "Quantit",
  "Motorola",
  "Sitecno",
  "Springwall",
  "Establecimiento Las Marías",
  "Green Mills",
  "Molens",
];

export function TrustBar() {
  return (
    <section className="px-4 pt-12 pb-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs md:text-sm text-slate-500">
          Infraestructura, validación científica y confianza enterprise:
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10">
          {partners.map((p) => (
            <span
              key={p}
              className="text-sm font-medium tracking-tight text-slate-400/60 grayscale opacity-70 hover:opacity-100 hover:text-foreground transition-all whitespace-nowrap"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
