import { Cable, Database, Zap } from "lucide-react";

export function MoatBento() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
          La capa de inteligencia que{" "}
          <span className="bg-gradient-to-r from-white to-[#17ccd3] bg-clip-text text-transparent">
            unifica el control de tus procesos
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card
            className="md:col-span-2"
            icon={<Database className="h-4 w-4" />}
            eyebrow="Inteligencia operativa"
            title="Convertimos la operación en datos"
            body="Basta de planillas impresas y archivos de Excel, InspectIA entiende la realidad. Conectamos cámaras, sensores, lectoras, drones, IoT a nuestros algoritmos y devolvemos la información a los sistemas existentes."
          />
          <Card
            icon={<Cable className="h-4 w-4" />}
            eyebrow="Integración"
            title="Hardware Agnóstico"
            body="No te atamos a productos nuestros. Operamos sobre tu hardware existente o los instalamos nosotros, pero trabajamos con todos. Aprovechá tus activos y dale nuevas funcionalidades."
          />
          <Card
            className="md:col-span-3"
            icon={<Zap className="h-4 w-4" />}
            eyebrow="Velocidad"
            title="Resultados concretos en tiempo récord"
            body="En menos de 15 días se ven los resultados. Despliegues ágiles que entregan retornos de inversión medibles."
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  className = "",
  icon,
  eyebrow,
  title,
  body,
}: {
  className?: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className={`rounded-3xl bg-[#084749] border border-white/10 text-white p-6 md:p-8 hover:border-white/20 transition-colors ${className}`}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wider text-[#17ccd3]">
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h3 className="mt-4 text-xl md:text-2xl font-semibold leading-snug">
        {title}
      </h3>
      <p className="mt-3 text-sm md:text-base text-white/75 leading-relaxed">
        {body}
      </p>
    </div>
  );
}
