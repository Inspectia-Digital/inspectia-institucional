import { PARTNERS, partnersByFamily, type Partner, type PartnerFamily } from "@/content/partners";

type TrustBarProps = {
  /** Qué familia se muestra. `todas` mezcla las cinco en una sola fila; ver la nota de
   *  abajo sobre por qué eso es una decisión y no el comportamiento natural. */
  family?: PartnerFamily | "todas";
  title?: string;
  /** Texto bajo el título. Sin esto no se renderiza ninguno. */
  lead?: string;
  /** Fila en desplazamiento continuo en lugar de una fila estática. */
  marquee?: boolean;
};

/**
 * Prueba social (§11.10).
 *
 * **Dos cosas acá contradicen a §11.10 y las dos son pedido explícito.** El documento
 * pide una fila estática, porque un carrusel obliga a esperar a que el logo pase para
 * leerlo; y pide que las familias nunca compartan fila, porque un cliente, un proveedor
 * del marketplace y un respaldo institucional afirman cosas distintas y mezclarlos las
 * diluye. La home ahora muestra las dieciséis organizaciones juntas y en movimiento. Lo
 * que compensa lo primero es que el desplazamiento se detiene al pasar el puntero o al
 * entrar el foco, y que con `prefers-reduced-motion` no se mueve nada.
 *
 * Los logos van en escala de grises y con **altura óptica homogénea**, no ancho igual:
 * igualar el ancho hace que un logo apaisado se vea el doble de grande que uno compacto.
 */
export function TrustBar({
  family = "cliente",
  title = "Confían en nosotros",
  lead,
  marquee = false,
}: TrustBarProps) {
  const logos = family === "todas" ? PARTNERS : partnersByFamily(family);
  if (logos.length === 0) return null;

  return (
    <section
      aria-label={title}
      className="bg-surface px-5 py-[var(--section-pad-sm)] md:px-8 md:py-[var(--section-pad-md)]"
    >
      {/* El marco del carrusel se sale del ancho de contenido a propósito: los logos
          entran y salen contra el margen de la sección y no contra una línea invisible a
          1200px, que dejaría dos huecos a los costados por donde no pasa nada. El título
          sí queda dentro del ancho de contenido. */}
      <div className={marquee ? "" : "mx-auto max-w-[var(--content-max)]"}>
        <div className={marquee ? "mx-auto max-w-[var(--content-max)] px-0" : ""}>
          {/* h2 con la piel de eyebrow: el título de la sección es literalmente "Confían
              en nosotros" y §11.10 le da ese tratamiento visual, pero en la jerarquía del
              documento es una sección como cualquier otra. */}
          <h2 className="eyebrow text-center">{title}</h2>
          {lead ? (
            <p className="mx-auto mt-4 max-w-[var(--lead-max)] text-center text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              {lead}
            </p>
          ) : null}
        </div>

        {marquee ? (
          <div
            className="logo-marquee mt-10"
            /* Aproximadamente 45 px por segundo: lento como para leer un logo al pasar
               sin tener que seguirlo con la vista. */
            style={{ "--marquee-duration": `${logos.length * 4}s` } as React.CSSProperties}
          >
            <div className="logo-marquee__track">
              <LogoSet logos={logos} />
              {/* La segunda copia es lo que cierra el bucle. No existe para el lector de
                  pantalla: son los mismos dieciséis nombres. */}
              <LogoSet logos={logos} duplicate />
            </div>
          </div>
        ) : (
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {logos.map((p) => (
              <li key={p.slug} className="min-w-0">
                <LogoImg partner={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function LogoSet({ logos, duplicate = false }: { logos: Partner[]; duplicate?: boolean }) {
  return (
    <ul className="logo-marquee__set" aria-hidden={duplicate || undefined}>
      {logos.map((p) => (
        /* La separación va como padding del item y no como gap de la pista: es lo que
           mantiene exacta la mitad del ancho total y hace que la costura del bucle no se
           vea. */
        <li key={p.slug} className="shrink-0 px-7 py-4 md:px-9">
          <LogoImg partner={p} eager />
        </li>
      ))}
    </ul>
  );
}

function LogoImg({ partner, eager = false }: { partner: Partner; eager?: boolean }) {
  return (
    <img
      src={partner.logo}
      alt={partner.name}
      /* En el carrusel se cargan todos de entrada. Con carga diferida, los logos que
         empiezan fuera del marco llegan tarde y cada uno que aparece ensancha la pista
         con la animación ya corriendo: el bucle deja de cerrar y los logos saltan. Son
         dieciséis archivos webp de menos de 100 kB en total. */
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      /* Alto fijo y tope de ancho, las dos cosas.
         El alto solo no alcanza: `npm run images` recorta el margen de cada archivo, así
         que ahora todas las marcas se dibujan a la misma altura, y con eso un logotipo
         largo como el de Balluff mide 373px mientras un isotipo cuadrado como el de
         Motorola mide 48. Ocho veces más superficie para la misma jerarquía. El tope de
         ancho con object-contain baja el logotipo largo hasta que las dos manchas pesan
         parecido, que es lo que quiere decir "altura óptica homogénea". */
      className="h-10 w-auto max-w-32 object-contain opacity-70 grayscale transition-opacity duration-200 hover:opacity-100 md:h-12 md:max-w-38"
    />
  );
}
