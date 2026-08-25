import { partnersByFamily, type PartnerFamily } from "@/content/partners";

type TrustBarProps = {
  /** Qué familia se muestra. Nunca dos en la misma fila: un cliente, un proveedor del
   *  marketplace y un respaldo institucional dicen cosas distintas, y mezclarlos las anula. */
  family?: PartnerFamily;
  title?: string;
};

/**
 * Prueba social (§11.10). La versión anterior era un marquee automático con los logos
 * invertidos a blanco; el carrusel obliga a esperar para leer, así que va una sola fila
 * estática.
 *
 * Los logos van en escala de grises al 60% de opacidad y con **altura óptica homogénea**,
 * no ancho igual: igualar el ancho hace que un logo apaisado se vea el doble de grande
 * que uno compacto.
 */
export function TrustBar({ family = "cliente", title = "Confían en nosotros" }: TrustBarProps) {
  const logos = partnersByFamily(family);
  if (logos.length === 0) return null;

  return (
    <section
      aria-label={title}
      className="bg-surface px-5 py-[var(--section-pad-sm)] md:px-8 md:py-[var(--section-pad-md)]"
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow text-center">{title}</p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {logos.map((p) => (
            <li key={p.slug} className="min-w-0">
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                decoding="async"
                /* La altura fija es la que iguala ópticamente; el ancho sale de la
                   proporción de cada archivo. */
                className="h-8 w-auto opacity-60 grayscale transition-opacity duration-200 hover:opacity-100 md:h-10"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
