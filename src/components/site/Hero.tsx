import { Link } from "@tanstack/react-router";
import { APP_SHOT } from "@/content/assets";
import { MODULES } from "@/content/modules";
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
export function Hero() {
  return (
    <section className="bg-brand-deep px-5 py-16 md:px-8 md:py-24 min-[1100px]:py-[var(--section-pad)]">
      {/* Dos columnas cuando hay captura, una sola cuando no.

          La segunda columna es la aplicación andando, no una foto de planta: el visitante
          ya ve una planta en el bloque del plano, y lo que no ve en ninguna parte es qué
          le queda en la pantalla después de comprar. Para un producto que se contrata
          solo, esa es la objeción que el encabezado puede sacar del medio.

          **En mobile no se muestra.** Un tablero con tablas y gráficos a 375px no se lee:
          ocupa media pantalla y no comunica nada, y lo que empuja ahí son el titular y los
          botones. No es que el móvil se pensó después; es que ese contenido no entra. */}
      <div
        className={
          APP_SHOT
            ? "mx-auto grid max-w-[var(--content-max-hero)] items-center gap-12 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]"
            : "mx-auto max-w-[var(--content-max-hero)]"
        }
      >
        <div className="hero-col max-w-full min-[1100px]:max-w-[46rem]">
          {/* Sin versales, a diferencia del resto de los eyebrow del sitio.
              El texto pasó de 54 a 80 caracteres y en mayúsculas con tracking ancho ocupa
              tres líneas en un teléfono, justo arriba del titular y con el mismo peso
              visual: le compite en vez de presentarlo. En caja baja entra en dos y vuelve
              a leerse como lo que es, una bajada de marca. */}
          <p className="text-[13px] font-medium text-[var(--accent-on-brand)]">
            InspectIA · Una plataforma con soluciones para toda la operación de una fábrica
          </p>

          <h1
            className="mt-4 text-[length:var(--text-hero)] leading-[var(--leading-hero)] tracking-[var(--tracking-hero)] text-on-brand"
            style={{ textWrap: "balance" }}
          >
            Medí y controlá toda la operación de tu planta
          </h1>

          <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-on-brand-secondary">
            Ves lo que hoy se pierde entre planillas, entendés por qué pasa y ajustás antes de que
            te cueste.
          </p>

          {/* Los siete nombres, y no una frase que los resuma: quien busca "software de
              mantenimiento" necesita leer la palabra, no deducirla de "toda la operación". */}
          <p className="mt-6 max-w-[var(--lead-max)] text-[15px] text-on-brand-secondary">
            {MODULES.map((m) => m.name).join(" · ")}
          </p>

          <CtaPair surface="brand" className="mt-9 max-w-md" />

          {/* El gancho de Kit 4.0, debajo de los botones y no como tercer botón. */}
          <p className="mt-6 max-w-[var(--lead-max)] text-[15px] text-on-brand-secondary">
            Somos proveedores de Kit 4.0:{" "}
            <Link
              to="/kit-4-0"
              className="font-semibold text-on-brand underline underline-offset-4 decoration-[var(--accent-on-brand)] hover:decoration-2"
            >
              hasta un 50 % de descuento en tu proyecto
            </Link>
            .
          </p>
        </div>

        {APP_SHOT && (
          <div className="hidden min-[900px]:block">
            <img
              src={APP_SHOT.src}
              width={APP_SHOT.width}
              height={APP_SHOT.height}
              alt={APP_SHOT.alt}
              // El encabezado es lo primero que se pinta: esta imagen no se difiere.
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-[var(--radius-lg)] border border-[var(--border-on-brand)] shadow-[var(--shadow-card)]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
