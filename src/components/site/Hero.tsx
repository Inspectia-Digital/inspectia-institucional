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
  // El espacio antes del % es duro: sin él, "100" y "%" pueden partirse en dos líneas.
  { value: "100\u00A0%", label: "De la producción analizada, no una muestra" },
  // TODO(equipo): "1 a 10 días" contradice el "5 a 15 días" que sigue publicado en otros
  // ocho lugares del sitio —entre ellos la meta description de esta misma página y el
  // timeline de seis etapas de la sección 05—. Se aplica acá porque es el texto
  // entregado, pero hasta que se unifique, la home se contradice a sí misma.
  { value: "1 a 10 días", label: "De implementación a producción" },
  // TODO(equipo): el dato aprobado para este lugar es el de abajo, pero le falta el
  // denominador: "75\u00A0% más barato" que qué. Hasta que el equipo lo escriba, va el repago,
  // que sí tiene contra qué medirse. Confirmado el denominador, se cambia por:
  //   { value: "75\u00A0%", label: "Más barato que automatizar la línea" },
  // Entregado como "Repagos en menores a un 1 mes"; se publica con la concordancia
  // corregida y nada más. El dato anterior era repago en menos de seis meses sobre el
  // costo del módulo: éste afirma seis veces más rápido y sobre el costo total.
  { value: "Repago en menos de 1 mes", label: "Sobre el costo total" },
];

export function Hero() {
  return (
    <section className="bg-brand-deep px-5 py-16 md:px-8 md:py-24 min-[1100px]:py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--content-max-hero)]">
        {/* TODO(equipo): la segunda columna es una foto real de planta, a 36% y con borde
            al 14% (§11.2). Falta la fotografía propia (§15.9). El render isométrico no
            sirve acá: ya es el protagonista del bloque 03 y repetirlo lo gasta.
            Alt aprobado, a ajustar a lo que muestre la foto real:
            "Línea de producción en planta, con operario controlando el proceso desde una
             terminal" */}
        {/* El 64% reserva el 36% para la foto, y eso sólo tiene sentido cuando las dos
            columnas conviven. Sin el corte, en un teléfono de 375px la columna de texto
            medía 214px: el h1 quedaba clavado en el mínimo del clamp y el lead caía en
            columna angosta, reservando el resto para una foto que en mobile no va. */}
        <div className="hero-col max-w-full min-[900px]:max-w-[64%] min-[1100px]:max-w-[46rem]">
          <p className="text-xs font-semibold uppercase tracking-[var(--tracking-widest)] text-[var(--accent-on-brand)]">
            InspectIA · Una plataforma con soluciones aplicadas a la industria y la logística
          </p>

          <h1
            className="mt-4 text-[length:var(--text-hero)] leading-[var(--leading-hero)] tracking-[var(--tracking-hero)] text-on-brand"
            style={{ textWrap: "balance" }}
          >
            Toda tu operación en una sola plataforma
          </h1>

          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-on-brand-secondary">
            InspectIA mide y controla lo que pasa en tu planta y en tu depósito: eficiencia,
            calidad, recepción, inventario y pedidos. Funciona con las máquinas y sistemas que ya
            tenés. Empezás por un módulo y sumás los que necesites, cuando los necesites.
          </p>

          {/* Entregado como "te contamos como podemos ayudarte": el "cómo" va con tilde,
              que es lo único que se tocó. */}
          <p className="mt-4 max-w-[var(--lead-max)] text-on-brand-secondary">
            Empezá gratis hoy o agendá una llamada y te contamos cómo podemos ayudarte.
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
