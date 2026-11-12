import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FeatureHero } from "@/components/site/FeatureHero";
import { ProductPanel, PanelFrame } from "@/components/site/ProductPanel";
import { RichText } from "@/components/site/RichText";
import {
  ARROW_LINK,
  ARROW_LINK_WRAP,
  Band,
  Close,
  Crumbs,
  Faq,
  GRID_2,
  RelatedBand,
  RequestCta,
  SectionBlock,
  Steps,
  cols,
} from "@/components/site/featureSections";
import { MODULE_BY_KEY } from "@/content/modules";
import { FEATURE_BY_SLUG, type Feature, type FeatureShot } from "@/content/features";
import { INDUSTRIES } from "@/content/solutions";
import { useFeatureViewEvent } from "@/lib/useViewEvents";
import { breadcrumbJsonLd, faqJsonLd, pageHead, serviceJsonLd, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

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
 *
 * ## Una plantilla, once páginas
 *
 * Las secciones viven en `components/site/featureSections.tsx` porque las comparte con la
 * página del conector MCP, que usa el mismo diseño en versión corta. Acá queda lo que es
 * propio de una funcionalidad: el loader que valida el módulo padre, el head con su schema
 * y el orden de las secciones de la guía §3.13.
 *
 * Las secciones opcionales no se renderizan donde el contenido no las trae, así que una
 * funcionalidad nueva se agrega escribiendo contenido y nada más.
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
       cinco módulos con funcionalidad, y el catálogo ya renombró slugs sin tocar claves
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

/**
 * El nombre de la funcionalidad metido en una frase.
 *
 * Era `f.name.toLowerCase()` y producía "Preguntas sobre monitoreo automático de oee": la
 * sigla se comía en los dos títulos que arman la frase con el nombre. Acá sólo baja la
 * primera letra, y ni eso si la primera palabra es una sigla —WMS para fábricas, MRP y
 * escenarios—, que es el caso que rompía al revés.
 */
const enFrase = (name: string) => {
  const [first = ""] = name.split(" ");
  const esSigla = first.length > 1 && first === first.toUpperCase();
  return esSigla ? name : name.charAt(0).toLowerCase() + name.slice(1);
};

function FeaturePage() {
  const { slug } = Route.useLoaderData();
  const f = FEATURE_BY_SLUG.get(slug)!;
  const m = MODULE_BY_KEY.get(f.module)!;
  useFeatureViewEvent(f.slug);

  /* Los chips salen del catálogo de industrias y no del contenido de la funcionalidad: la
     etiqueta la renombra `solutions.ts` y una industria sin publicar no puede recibir un
     enlace, porque su ruta devuelve 404. */
  const industries = (f.industries ?? [])
    .map((s) => INDUSTRIES.find((i) => i.slug === s && i.published))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  const aPedido = f.status === "a-pedido";
  /* Un panel oscuro en el hero ya usa la única superficie de teal profundo que los
     lineamientos permiten por página, así que la banda de relacionadas va clara. Se deduce
     del contenido y no se declara aparte: así no hay forma de que una página nueva quede
     con dos superficies oscuras por olvidarse de un campo. */
  const bandaClara = f.heroPanel?.tone === "dark";

  return (
    /* El cierre del sitio se apaga en todas: estas páginas cierran con el panel tintado de
       `Close`, también donde el copy es el del sitio (guía §3.12). Y las que no se
       contratan solas cierran con su franja, que es su único CTA. */
    <SiteLayout
      module={m.key}
      bottomCta={false}
      requestOrigin={aPedido ? f.requestOrigin : undefined}
    >
      <FeatureHero
        eyebrow={f.eyebrow}
        title={f.h1}
        lead={f.lead}
        note={f.heroNote}
        panel={f.heroPanel}
        module={m.key}
        demoLabel={f.cta?.demoLabel}
        requestOrigin={aPedido ? f.requestOrigin : undefined}
        secondary={aPedido ? { label: "Ver cómo funciona", hash: "como-funciona" } : undefined}
      />

      <Crumbs
        trail={[
          { label: "Plataforma", to: "/plataforma" },
          { label: m.name, to: `/plataforma/${m.slug}` },
        ]}
        name={f.name}
      />

      {/* El problema, a dos columnas. Eran cuatro párrafos a tamaño lead en una columna
          angosta: ocupaban una pantalla entera para decir cuatro cosas de una línea. */}
      <SectionBlock eyebrow="El problema" title="Si algo de esto te suena, es esto">
        <ul className={cn("mt-12 grid gap-x-12 gap-y-7", GRID_2)}>
          {f.problem.map((item) => (
            <li
              key={item}
              className="min-w-0 border-t border-line pt-5 text-base leading-[var(--leading-normal)] text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* Qué incluye. Sólo asistencia: es la única que vende equipo además de software. */}
      {f.includesBlock && (
        <SectionBlock eyebrow="Qué incluye" title={f.includesBlock.title}>
          <ul className={cn("mt-12 grid gap-x-6 gap-y-9", cols(f.includesBlock.items.length))}>
            {f.includesBlock.items.map((item) => (
              <li key={item.title} className="min-w-0 border-t border-line pt-5">
                <Icon name={item.icon} size="brand" className="text-brand" />
                <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-[var(--leading-normal)] text-ink-secondary">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      {/* La franja, en su lugar de §3.13 cuando es una idea más de la página. En las que no
          se contratan solas la franja es el cierre, así que baja al final. */}
      {f.band && !aPedido && f.band.to && (
        <Band
          title={f.band.title}
          body={f.band.body}
          action={
            <Link to={f.band.to} activeOptions={{ exact: true }} className={ARROW_LINK}>
              {f.band.linkLabel}
              <Icon name="arrow-right" />
            </Link>
          }
        />
      )}

      <SectionBlock
        id="como-funciona"
        eyebrow="Cómo funciona"
        title={`Cómo funciona ${enFrase(f.name)}`}
      >
        <Steps items={f.does} render={(body) => <RichText text={body} />} />

        {f.doesNote && (
          <p className="mt-12 max-w-[var(--read-max)] border-l-2 border-line-brand pl-5 text-base leading-[var(--leading-normal)] text-ink">
            <RichText text={f.doesNote} />
          </p>
        )}
      </SectionBlock>

      {/* Qué ves adentro. Es la sección que la versión anterior no tenía, y la que contesta
          lo que una página de software tiene que contestar antes que nada. */}
      {f.see && <See see={f.see} />}

      {/* Cómo entra el dato. Es la objeción número uno —"no tengo sensores"— y la respuesta
          del producto es que se puede empezar sin nada. Tres bloques y no un párrafo: lo
          que importa es que son niveles y que el primero no necesita hardware. */}
      {f.capture && f.capture.length > 0 && (
        <SectionBlock
          eyebrow="Cómo se toma el dato"
          title="Se empieza a mano y se automatiza después"
        >
          <ul className={cn("mt-12 grid gap-x-6 gap-y-9", cols(f.capture.length))}>
            {f.capture.map((c) => (
              <li key={c.level} className="min-w-0 border-t border-line pt-5">
                <p className="text-sm font-semibold text-brand">{c.level}</p>
                <p className="mt-2 text-base leading-[var(--leading-normal)] text-ink-secondary">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      {f.related && f.related.length > 0 && (
        <RelatedBand
          eyebrow={f.relatedTitle ?? "Con qué se combina"}
          title={f.relatedHeading ?? "Lo que se le suma"}
          lead={f.relatedLead}
          items={f.related}
          tone={bandaClara ? "light" : "deep"}
        />
      )}

      {/* Para quién. Chips y no una lista de enlaces: son siete destinos de un renglón y
          una lista vertical de siete los haría parecer el índice de la página. */}
      {industries.length > 0 && (
        <section className="px-5 py-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[var(--content-max)]">
            <h2 className="text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
              Para plantas y centros de distribución
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    to="/soluciones/$industria"
                    params={{ industria: i.slug }}
                    activeOptions={{ exact: true }}
                    className="inline-flex min-h-11 items-center rounded-[var(--radius-pill)] border border-line-strong px-4 text-sm text-ink transition-colors duration-[160ms] hover:border-line-brand hover:text-brand"
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
            {f.industriesNote && (
              <p className="mt-6 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {f.industriesNote}
              </p>
            )}
          </div>
        </section>
      )}

      {f.conditions && f.conditions.length > 0 && (
        <SectionBlock eyebrow="Condiciones" title="Para empezar sin trabas">
          <ul className={cn("mt-12 grid gap-x-6 gap-y-9", cols(f.conditions.length))}>
            {f.conditions.map((c) => (
              <li key={c.title} className="min-w-0 border-t border-line pt-5">
                <p className="text-sm font-semibold text-brand">{c.tag}</p>
                <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)] text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-base leading-[var(--leading-normal)] text-ink-secondary">
                  {c.body}
                </p>
                {c.to && (
                  <Link
                    to={c.to}
                    activeOptions={{ exact: true }}
                    className={cn(ARROW_LINK, "mt-4")}
                  >
                    Ver más
                    <Icon name="arrow-right" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}

      <Faq title={`Preguntas sobre ${enFrase(f.name)}`} items={f.faq} />

      {/* Las salidas obligadas: la guía y el módulo. Es el cruce que convierte tres páginas
          sueltas en un grupo, y el que más se olvida. En bloques y no en lista: así se ve
          que son dos destinos distintos y no dos renglones de lo mismo.

          El título mira los enlaces antes de prometerlos. Cuatro de las once páginas no
          tienen guía todavía —y MRP perdió la suya al sacarle el enlace a un `/blog` que
          no existe—, así que "La guía y el módulo" encabezaba un solo renglón que decía
          "Producción". El lector que baja hasta ahí buscando la guía se encuentra con que
          no está, y eso es peor que no haberla ofrecido. */}
      <SectionBlock
        eyebrow="Seguir leyendo"
        title={
          f.links.some((l) => l.to.startsWith("/guias/"))
            ? "La guía y el módulo"
            : f.links.length > 1
              ? "El módulo y lo que sigue"
              : "El módulo"
        }
      >
        <ul className={cn("mt-12 grid gap-x-6 gap-y-9", cols(f.links.length))}>
          {f.links.map((l) => (
            <li key={l.to} className="min-w-0 border-t border-line pt-5">
              <Link
                to={l.to}
                activeOptions={{ exact: true }}
                className={cn(
                  ARROW_LINK_WRAP,
                  "text-[19px] font-semibold leading-snug tracking-[var(--tracking-tight)]",
                )}
              >
                {l.label} <Icon name="arrow-right" className="inline align-[-0.1em]" />
              </Link>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* El cierre. En una funcionalidad que se contrata, el panel con los dos botones del
          sitio. En una que todavía no, su franja con el botón único: un solo CTA en toda la
          página, que es lo que corresponde cuando lo que se ofrece es una conversación. */}
      {aPedido && f.band ? (
        <section className="px-5 pb-[var(--section-pad-md)] md:px-8">
          <div className="mx-auto max-w-[var(--content-max)]">
            <div className="grid items-center gap-8 rounded-[14px] bg-brand-subtle px-8 py-12 md:px-12 md:py-14 min-[1000px]:grid-cols-2 min-[1000px]:gap-14">
              <h2 className="max-w-[20ch] text-[28px] leading-tight text-brand-deep md:text-[length:var(--text-section)]">
                {f.band.title}
              </h2>
              <div className="min-w-0">
                <p className="text-base leading-[var(--leading-normal)] text-ink-secondary">
                  {f.band.body}
                </p>
                <RequestCta
                  origin={f.band.origin ?? f.requestOrigin ?? "contacto"}
                  label={f.band.linkLabel}
                  className="mt-7"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        !aPedido && (
          <Close
            title={f.cta?.title}
            lead={f.cta?.lead}
            demoLabel={f.cta?.demoLabel}
            module={m.key}
          />
        )
      )}
    </SiteLayout>
  );
}

/* ---------- Piezas propias de esta plantilla ---------- */

/**
 * «Qué ves en InspectIA»: la lista a la izquierda y el producto a la derecha.
 *
 * El producto es la captura real cuando la hay y un panel dibujado cuando la captura
 * muestra otra cosa. Asistencia es el segundo caso: la captura del módulo Tareas muestra
 * la cobertura de un turno —quién está en cada puesto— y esta sección habla de la
 * asistencia del día y del mes, que no es lo mismo.
 */
function See({ see }: { see: NonNullable<Feature["see"]> }) {
  return (
    <section className="px-5 py-[var(--section-pad-md)] md:px-8">
      <div className="mx-auto grid max-w-[var(--content-max)] items-center gap-10 min-[1000px]:grid-cols-2 min-[1000px]:gap-14">
        <div className="min-w-0">
          {/* Sin etiqueta arriba del título. La llevaba, con el nombre del bloque, y
              cuando una página trae su propio título la etiqueta lo contradecía: el andon
              se mira en un televisor de la planta y "Qué ves en InspectIA" encima de "Qué
              ves en la pantalla" decía dos cosas distintas de lo mismo. */}
          <h2 className="max-w-[28ch] text-[28px] leading-tight text-ink md:text-[length:var(--text-section)]">
            {see.title ?? "Qué ves en InspectIA"}
          </h2>

          {see.items && see.items.length > 0 && (
            <ul className="mt-8 space-y-4">
              {see.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-[var(--leading-normal)] text-ink-secondary"
                >
                  <span aria-hidden="true" className="shrink-0 text-brand">
                    &rarr;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {see.panel ? (
          <ProductPanel data={see.panel} className="min-w-0" />
        ) : (
          see.shot && <Shot shot={see.shot} />
        )}
      </div>
    </section>
  );
}

/**
 * Una captura real, con el marco de los lineamientos.
 *
 * `figure` y no un div: la imagen y su epígrafe son una unidad, y así el epígrafe queda
 * asociado a la imagen para un lector de pantalla y para un buscador sin un
 * `aria-describedby`.
 *
 * `sizes` declara media columna y no el ancho entero: estas capturas se dibujan al lado de
 * la lista, así que a 1440px el navegador tiene que bajar la variante de 1120 y no la de
 * 1680.
 */
function Shot({ shot }: { shot: FeatureShot }) {
  return (
    <figure className="min-w-0">
      <PanelFrame>
        <img
          src={shot.src}
          srcSet={`${shot.small} ${shot.smallWidth}w, ${shot.src} ${shot.width}w`}
          sizes="(min-width: 1000px) 520px, 100vw"
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          loading="lazy"
          decoding="async"
          className="w-full rounded-[10px]"
        />
      </PanelFrame>
      {shot.caption && (
        <figcaption className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-muted">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}
