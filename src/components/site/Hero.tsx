import { Link } from "@tanstack/react-router";
import { CtaPair } from "@/components/site/CtaPair";

/**
 * Hero de la home (§11.2).
 *
 * Lo que había antes era otra cosa: el titular, los CTA y el plano isométrico con sus
 * puntos, todo en el mismo bloque. El plano se fue al bloque 03, que es donde se explica
 * la plataforma; acá queda el mensaje y los dos caminos de entrada.
 *
 * El titular se mide en cqw y la columna lleva `hero-col`. La regla es máximo tres
 * líneas, y un tamaño fijo no puede cumplirla en todos los anchos.
 */

/** Cada dato lleva su unidad y su período. Un número suelto no dice nada (§10.1). */
const STATS = [
  { value: "5–15 días", label: "de kickoff a producción" },
  { value: "70 tipos de falla", label: "en menos de 1 minuto · autopartista" },
  { value: "De 48 a 30 h", label: "lead time de recepción · centro de distribución" },
];

export function Hero() {
  return (
    <section className="bg-brand-deep px-5 py-16 md:px-8 md:py-24 min-[1100px]:py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--content-max-hero)]">
        {/* TODO(equipo): la segunda columna es una foto real de planta, a 36% y con borde
            al 14% (§11.2). Falta la fotografía propia (§15.9). El render isométrico no
            sirve acá: ya es el protagonista del bloque 03 y repetirlo lo gasta. */}
        <div className="hero-col max-w-[64%] min-[1100px]:max-w-[46rem]">
          <p className="text-xs font-semibold uppercase tracking-[var(--tracking-widest)] text-[var(--accent-on-brand)]">
            InspectIA OS
          </p>

          <h1
            className="mt-4 text-[length:var(--text-hero)] leading-[var(--leading-hero)] tracking-[var(--tracking-hero)] text-on-brand"
            style={{ textWrap: "balance" }}
          >
            Toda tu operación medida, en una sola plataforma
          </h1>

          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-on-brand-secondary">
            InspectIA OS suma módulos sobre la operación que ya tenés: eficiencia, calidad,
            recepción, inventario, pedidos. Funciona con tus máquinas, tus cámaras y tu ERP. Empezás
            por un módulo y sumás los que necesites, cuando los necesites.
          </p>

          <p className="mt-4 max-w-[var(--lead-max)] text-on-brand-secondary">
            Probalo gratis hoy en tu propia línea, o agendá veinte minutos y te lo mostramos con
            datos de una planta parecida a la tuya.
          </p>

          <CtaPair surface="brand" className="mt-9 max-w-md" />

          {/* Enlaces de texto: los únicos botones de la sección son los dos de arriba. */}
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
            <Link
              to="/roi"
              className="text-on-brand-secondary underline-offset-4 transition-colors duration-[160ms] hover:text-on-brand hover:underline"
            >
              Calcular mi ROI
            </Link>
            <Link
              to="/plataforma"
              className="text-on-brand-secondary underline-offset-4 transition-colors duration-[160ms] hover:text-on-brand hover:underline"
            >
              Ver los ocho módulos
            </Link>
          </p>
        </div>

        {/* Tres líneas apiladas en mobile y una fila en desktop: nunca una grilla de 2+1,
            que deja un dato colgado y se lee como un error de maquetado. */}
        <dl className="mt-14 flex flex-col gap-6 border-t border-[var(--border-on-brand)] pt-8 min-[720px]:flex-row min-[720px]:gap-0">
          {STATS.map((s, i) => (
            <div
              key={s.value}
              className={
                "min-w-0 min-[720px]:flex-1 min-[720px]:px-8 " +
                (i > 0
                  ? "min-[720px]:border-l min-[720px]:border-[var(--border-on-brand)]"
                  : "min-[720px]:pl-0")
              }
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="metric block text-[32px] font-light leading-none text-[var(--accent-on-brand)]">
                  {s.value}
                </span>
                <span className="mt-3 block text-xs uppercase tracking-[var(--tracking-caps)] text-on-brand-label">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
