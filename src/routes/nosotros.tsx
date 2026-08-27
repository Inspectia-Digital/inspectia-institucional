import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT } from "@/content/site";
import { partnersByFamily } from "@/content/partners";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

const TITLE = "Quiénes somos · InspectIA";
// 153 caracteres. La versión del documento contaba 172; el recorte es el que el propio
// documento indica: sale "y ciencia de datos".
const DESCRIPTION =
  "Un equipo de ingeniería que instala en piso de planta. Hacemos que las fábricas controlen el 100\u00A0% de su producción con la infraestructura que ya tienen.";

/**
 * Nosotros (§7.9). Es la página institucional **y** la única superficie del sitio para
 * inversores.
 *
 * El bloque de inversores va acá, último, y no en una ruta propia: una página de
 * inversores sin ronda abierta envejece mal y le dice al cliente que estamos buscando
 * plata. Como cierre de "Nosotros" funciona para quien la busca y es invisible para
 * quien no. **No existe `/inversores` y no hay que crearla.**
 *
 * `Organization` no se declara acá: ya está en la home y duplicarlo no aporta.
 */
export const Route = createFileRoute("/nosotros")({
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/nosotros",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [breadcrumbJsonLd([{ name: "Quiénes somos", path: "/nosotros" }])],
      },
    }),
  component: Page,
});

// TODO(equipo): **verificar la afirmación sobre el Instituto Balseiro y el CONICET antes
// de publicar.** Es el activo diferencial de la página —un integrador de automatización
// no lo puede decir— y también lo que peor queda si está exagerado.
const TEAM = [
  {
    title: "La parte científica",
    body: "Doctorados formados en el Instituto Balseiro y en el CONICET. Los modelos de visión y de detección que corren en las líneas los desarrolla gente que hizo investigación, no que integró una librería.",
  },
  {
    title: "La parte de planta",
    body: "Ingeniería con experiencia en operaciones industriales, que hace el relevamiento, instala y conecta. Es la mitad que hace que el software funcione con el PLC que ya está.",
  },
];

const THESIS = [
  {
    title: "El foso",
    body: "Producto SaaS más capacidad real de instalar en planta. Un competidor de software no instala; un integrador no escala.",
  },
  {
    title: "El modelo",
    body: "Suscripción mensual por planta y por módulo, con expansión dentro de la misma cuenta.",
  },
  {
    title: "El punto de entrada",
    body: "Un plan gratuito que empieza sin hardware y sin visita: el costo de adquisición no depende de un equipo comercial en planta.",
  },
];

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";
const LEAD =
  "mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary";

function Page() {
  const respaldos = partnersByFamily("respaldo");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Quiénes somos"
        title="Software que se instala en el piso de planta"
        lead="La mayoría de los que hacen software industrial no pisan una fábrica, y la mayoría de los que instalan en fábricas no hacen software. Nosotros hacemos las dos cosas, y eso es lo que permite que un proyecto tarde semanas en lugar de años."
        cta={false}
      />

      {/* Un párrafo y nada más: sin cronología de fundación. */}
      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>El problema que nos trajo acá</h2>
          <p className={LEAD}>
            Una planta mediana sabe que pierde eficiencia y no tiene cómo medirlo. Las dos
            alternativas que le ofrece el mercado son un proyecto de automatización que no cierra
            por costo, o un software que asume que el dato ya existe. En el medio no había nada, y
            ahí está casi toda la industria de la región.
          </p>
        </div>
      </section>

      {/* TODO(equipo): sin fotos ni nombres individuales. Publicar el plantel con nombre,
          foto y rol le daría cara a la empresa, pero requiere que cada persona lo apruebe.
          Fotos de stock o avatares genéricos no son una alternativa: restan. */}
      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>Quiénes lo hacen</h2>
          <p className={LEAD}>
            Un equipo chico, con dos mitades que no suelen convivir: ciencia de datos con formación
            de posgrado, e ingeniería que instala sensores en una planta un sábado a la mañana.
          </p>
          <ul className="mt-12 grid gap-8 min-[720px]:grid-cols-2">
            {TEAM.map((t) => (
              <li key={t.title} className="min-w-0">
                <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{t.title}</h3>
                <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {t.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TODO(equipo): la sección va sin logos hasta que estén aprobados para publicar.
          Springwall, Magna Seating, Green Mills, Las Marías y Tinto Oeste figuran como
          casos y no consta la aprobación. Ponerlos en gris "para que no se noten" no
          cambia nada: publicado es publicado. */}
      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <h2 className={`max-w-[24ch] ${H2}`}>En qué plantas estamos</h2>
          <p className={LEAD}>
            Autopartes, alimentos, molienda, colchones y centros de distribución, en plantas de la
            región.
          </p>
        </div>
      </section>

      {/* Un respaldo se muestra, no se explica: el H2 y los logos, sin texto de
          acompañamiento. Y en su propia sección, lejos de los logos de cliente: mezclados
          se debilitan los dos. */}
      {respaldos.length > 0 && (
        <section className={`bg-surface-sunken ${SECTION}`}>
          <div className={CONTAINER}>
            <h2 className={H2}>Respaldos y programas</h2>
            <ul className="mt-10 flex flex-wrap items-center gap-x-14 gap-y-8">
              {respaldos.map((p) => (
                <li key={p.slug} className="min-w-0">
                  <img
                    src={p.logo}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-auto opacity-60 grayscale md:h-10"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Prensa y premios no existe: una sección con dos notas de medios locales resta.
          Entra cuando haya material confirmado, como lista de medio, año y enlace. */}

      {/* --- Para inversores ---
          Último bloque y sobre --grey-050, para separarlo del mensaje comercial.

          TODO(equipo): **sin cifras de tracción, a propósito.** No hay facturación,
          clientes activos, retención ni crecimiento confirmados, y esos números no se
          estiman: un inversor que detecta una cifra inflada cierra la conversación. El
          bloque está escrito para funcionar sin ellas —explica el modelo, no el tamaño—.
          Cuando el equipo dé las cifras, se agregan tres métricas y nada más. */}
      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className={CONTAINER}>
          <p className="eyebrow">Para inversores</p>
          <h2 className={`mt-4 max-w-[24ch] ${H2}`}>La tesis, en un párrafo</h2>
          <p className={LEAD}>
            La industria de la región no puede pagar automatización y no puede seguir sin medir.
            InspectIA vende el software por suscripción y por módulo, con el hardware provisto por
            terceros del marketplace: eso hace que el ingreso sea recurrente y que el crecimiento no
            dependa de vender fierros. Cada módulo nuevo se apoya en los datos que ya generan los
            anteriores, así que el costo de sumar el segundo producto a un cliente existente es
            cercano a cero.
          </p>

          <ul className="mt-12 grid gap-8 min-[720px]:grid-cols-3">
            {THESIS.map((t) => (
              <li key={t.title} className="min-w-0">
                <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{t.title}</h3>
                <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {t.body}
                </p>
              </li>
            ))}
          </ul>

          {/* Mientras no haya contacto de dirección el cierre no se renderiza: mejor sin
              enlace que con un mail que no existe. */}
          {CONTACT.email && (
            <p className="mt-12 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-semibold text-brand hover:underline hover:underline-offset-4"
              >
                Si querés ver los números, escribinos directamente.
              </a>
            </p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
