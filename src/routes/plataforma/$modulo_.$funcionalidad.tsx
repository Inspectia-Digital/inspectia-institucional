import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { BottomCta } from "@/components/site/BottomCta";
import { RichText } from "@/components/site/RichText";
import { MODULE_BY_KEY } from "@/content/modules";
import { FEATURE_BY_SLUG } from "@/content/features";
import { useFeatureViewEvent } from "@/lib/useViewEvents";
import { breadcrumbJsonLd, faqJsonLd, pageHead, serviceJsonLd, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

/**
 * Plantilla de las páginas de funcionalidad: `/plataforma/<módulo>/<búsqueda>`.
 *
 * ## El guion bajo del nombre del archivo no es un error de tipeo
 *
 * El archivo se llama `$modulo_.$funcionalidad.tsx` y no `$modulo/$funcionalidad.tsx`. En
 * el enrutador por archivos de TanStack, crear un directorio `$modulo/` convierte a
 * `$modulo.tsx` en una **ruta de layout**: pasaría a necesitar un `<Outlet/>` y un
 * `index.tsx` propio, y las siete páginas de módulo —que hoy funcionan— tendrían que
 * reescribirse para renderizarse adentro de sí mismas.
 *
 * El guion bajo al final del segmento es la vía de escape: la URL queda igual
 * (`/plataforma/produccion/monitoreo-automatico-de-oee`) y la página de módulo no se
 * entera de que esta ruta existe. Si alguien lo saca "porque sobra", rompe las siete.
 *
 * ## Qué es esta página y qué no
 *
 * Es para quien busca el software de algo concreto —"monitoreo automático de OEE"— y no la
 * categoría ("software de OEE", que es el módulo) ni el cómo ("cómo calcular el OEE", que
 * es la guía). Por eso no repite el catálogo del módulo ni explica el cálculo: nombra la
 * búsqueda, muestra esa capacidad y pasa la posta a las otras dos.
 *
 * **Sin precio propio.** La señal de precio y la grilla de planes viven en la página del
 * módulo, que es la unidad que se compra. Una funcionalidad con su propio precio diría que
 * se vende suelta.
 */
export const Route = createFileRoute("/plataforma/$modulo_/$funcionalidad")({
  loader: ({ params }) => {
    const feature = FEATURE_BY_SLUG.get(params.funcionalidad);
    const module = feature && MODULE_BY_KEY.get(feature.module);
    /* El slug de la funcionalidad es único en todo el sitio, pero tiene que colgar del
       módulo correcto: `/plataforma/calidad/wms-para-fabricas` no es una URL válida, y
       servirla publicaría la misma página bajo dos direcciones —que es contenido
       duplicado generado por nosotros, de los peores de detectar—.

       Se compara contra el `slug` del módulo y no contra su `key`: hoy son iguales en los
       cuatro módulos con funcionalidad, y el catálogo ya renombró slugs sin tocar claves
       tres veces. */
    if (!feature || !module || module.slug !== params.modulo) throw notFound();
    return { slug: feature.slug };
  },
  head: ({ loaderData }) => {
    const f = loaderData && FEATURE_BY_SLUG.get(loaderData.slug);
    if (!f) return {};
    const m = MODULE_BY_KEY.get(f.module);
    if (!m) return {};

    const path = `/plataforma/${m.slug}/${f.slug}`;

    return pageHead({
      title: siteTitle(f.seoTitle),
      description: f.seoDescription,
      path,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([
            { name: "Plataforma", path: "/plataforma" },
            { name: m.name, path: `/plataforma/${m.slug}` },
            { name: f.name, path },
          ]),
          serviceJsonLd({
            name: f.name,
            path,
            description: f.seoDescription,
            features: f.does.map((d) => d.title),
            module: { name: m.name, slug: m.slug },
          }),
          faqJsonLd(f.faq),
        ],
      },
    });
  },
  component: FeaturePage,
});

function FeaturePage() {
  const { slug } = Route.useLoaderData();
  const f = FEATURE_BY_SLUG.get(slug)!;
  const m = MODULE_BY_KEY.get(f.module)!;
  useFeatureViewEvent(f.slug);

  return (
    <SiteLayout
      module={m.key}
      // Asistencia cierra con una visita técnica a la planta y no con la banda del sitio:
      // lo que se agenda ahí es distinto, porque hay que ver el ingreso antes de cotizar.
      bottomCta={!f.cta}
    >
      <PageHero eyebrow={f.eyebrow} title={f.h1} lead={f.lead} module={m.key} />

      <Crumbs module={{ name: m.name, slug: m.slug }} name={f.name} />

      {/* 02 */}
      <Block eyebrow="El problema" title="Si algo de esto te suena, es esto">
        <ul className="mt-12 max-w-[var(--read-max)] space-y-6">
          {f.problem.map((item) => (
            <li
              key={item}
              className="text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </Block>

      {/* 03 · Sólo asistencia: qué trae el proyecto. */}
      {f.includesBlock && (
        <Block eyebrow="Qué incluye" title={f.includesBlock.title}>
          <ul className="mt-12 grid gap-x-12 gap-y-9 min-[1000px]:grid-cols-2">
            {f.includesBlock.items.map((item) => (
              <li key={item.title} className="min-w-0 border-t border-line pt-5">
                <h3 className="text-[length:var(--text-card)] leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* 03b · La franja de una idea. Con línea arriba y abajo en vez de fondo propio:
              los lineamientos reservan el cambio de fondo y acá lo que hace falta es
              separar, no destacar. */}
      {f.band && (
        <section className="px-5 md:px-8">
          <div className="mx-auto max-w-[var(--content-max)] border-y border-line py-10">
            <h2 className="text-[length:var(--text-card)] leading-snug text-ink">{f.band.title}</h2>
            <p className="mt-3 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              {f.band.body}
            </p>
          </div>
        </section>
      )}

      {/* 04 */}
      <Block eyebrow="Qué hace" title={`Cómo funciona ${f.name.toLowerCase()}`}>
        <ol className="mt-12 max-w-[var(--read-max)] space-y-10">
          {f.does.map((item, i) => (
            <li key={item.title} className="min-w-0">
              <span className="metric text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[length:var(--text-card)] leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                <RichText text={item.body} />
              </p>
            </li>
          ))}
        </ol>

        {f.doesNote && (
          <p className="mt-10 max-w-[var(--read-max)] border-l-2 border-line-brand pl-5 text-[15px] leading-[var(--leading-normal)] text-ink">
            {f.doesNote}
          </p>
        )}
      </Block>

      {/* 05 · Cómo entra el dato. Es la objeción número uno —"no tengo sensores"— y la
              respuesta del producto es que se puede empezar sin nada. */}
      {f.capture && (
        <Block eyebrow="Cómo se toma el dato" title="Se empieza a mano y se automatiza después">
          <p className="mt-8 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
            {f.capture}
          </p>
        </Block>
      )}

      {/* 06 */}
      {f.related && f.related.length > 0 && (
        <Block eyebrow="Con qué se combina" title={f.relatedTitle ?? "Lo que se le suma"}>
          <ul className="mt-10 max-w-[var(--read-max)] space-y-4">
            {f.related.map((r) => (
              <li key={r.to} className="min-w-0">
                <Link
                  to={r.to}
                  className="inline-flex items-start gap-1.5 text-[15px] leading-[var(--leading-normal)] text-brand hover:underline hover:underline-offset-4"
                >
                  {r.label}
                  <Icon name="arrow-right" />
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* 07 */}
      {f.conditions && f.conditions.length > 0 && (
        <Block eyebrow="Condiciones" title="Cómo se contrata">
          <ul className="mt-10 max-w-[var(--read-max)] space-y-4">
            {f.conditions.map((c) => (
              <li
                key={c.label}
                className="text-[15px] leading-[var(--leading-normal)] text-ink-secondary"
              >
                {c.label}
                {c.to && (
                  <>
                    {" "}
                    <Link to={c.to} className="text-brand hover:underline hover:underline-offset-4">
                      Ver más
                    </Link>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* 08 */}
      <section className="px-5 py-[var(--section-pad-md)] md:px-8">
        <div className="mx-auto max-w-[50rem]">
          <h2 className="text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Preguntas sobre {f.name.toLowerCase()}
          </h2>
          <Accordion
            type="single"
            collapsible
            defaultValue="feat-faq-0"
            className="mt-10 border-t border-line"
          >
            {f.faq.map((item, i) => (
              <AccordionItem key={item.q} value={`feat-faq-${i}`} className="border-line">
                <AccordionTrigger className="py-5 text-left text-[17px] font-medium text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 09 · Las salidas obligadas: la guía y el módulo. Es el cruce que convierte tres
              páginas sueltas en un grupo, y el que más se olvida. */}
      <Block eyebrow="Seguir leyendo" title="La guía y el módulo">
        <ul className="mt-10 max-w-[var(--read-max)] space-y-4">
          {f.links.map((l) => (
            <li key={l.to} className="min-w-0">
              <Link
                to={l.to}
                className="inline-flex items-start gap-1.5 text-[15px] font-semibold leading-[var(--leading-normal)] text-brand hover:underline hover:underline-offset-4"
              >
                {l.label}
                <Icon name="arrow-right" />
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      {/* Cierre propio, sólo donde lo que se agenda no es la demo del sitio. */}
      {f.cta && (
        <BottomCta
          title={f.cta.title}
          lead={f.cta.lead}
          demoLabel={f.cta.demoLabel}
          module={m.key}
        />
      )}
    </SiteLayout>
  );
}

/* ---------- La miga de pan, visible ---------- */

/**
 * La ruta hasta acá, como enlaces.
 *
 * No es decoración ni es sólo para el dato estructurado: una página de tercer nivel sin
 * salida hacia arriba deja al visitante que llegó de una búsqueda sin forma de ver el
 * módulo completo, que es donde está el precio.
 *
 * Va debajo del hero y no adentro: en el hero compite con el H1, que es lo único que tiene
 * que leerse en la primera pantalla.
 *
 * ## `activeOptions={{ exact: true }}` en los dos enlaces, y hace falta
 *
 * Por omisión `Link` marca un enlace como activo cuando la ruta actual **empieza** con su
 * destino, y le pone `aria-current="page"`. En una miga de pan eso significa que estando en
 * `/plataforma/produccion/monitoreo-automatico-de-oee` los tres elementos se declaran la
 * página actual: Plataforma, Producción y la funcionalidad. Un lector de pantalla anuncia
 * tres veces "página actual" en una lista de tres, que es exactamente lo contrario de lo
 * que la miga viene a comunicar. Con `exact` sólo coincide la hoja, y la hoja no es un
 * enlace.
 */
function Crumbs({ module: m, name }: { module: { name: string; slug: string }; name: string }) {
  const link = "text-ink-muted transition-colors duration-[160ms] hover:text-brand";

  return (
    <nav aria-label="Ruta" className="px-5 pt-10 md:px-8">
      <ol className="mx-auto flex max-w-[var(--content-max)] flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
        <li>
          <Link to="/plataforma" activeOptions={{ exact: true }} className={link}>
            Plataforma
          </Link>
        </li>
        <li aria-hidden="true" className="text-line">
          /
        </li>
        <li>
          <Link
            to="/plataforma/$modulo"
            params={{ modulo: m.slug }}
            activeOptions={{ exact: true }}
            className={link}
          >
            {m.name}
          </Link>
        </li>
        <li aria-hidden="true" className="text-line">
          /
        </li>
        {/* El último no es un enlace: es la página donde se está. */}
        <li aria-current="page" className="text-ink-secondary">
          {name}
        </li>
      </ol>
    </nav>
  );
}

/* ---------- Envoltorio de sección ----------
   Las ocho secciones repetían las mismas cuatro clases de contenedor y el mismo par
   eyebrow + h2. Acá es un componente porque son ocho usos en un archivo, no porque
   convenga abstraer un `section` en general. */

function Block({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-[var(--section-pad-md)] md:px-8">
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-[28ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
