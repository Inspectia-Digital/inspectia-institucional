import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import { CtaPair } from "@/components/site/CtaPair";
import { PlanTiers } from "@/components/site/PlanTiers";
import { RoiCalculator } from "@/components/roi/RoiCalculator";
import { MODULE_BY_KEY, MODULES, type PlatformModule, type ModuleKey } from "@/content/modules";
import { COMBO_MAX_DISCOUNT, COMBO_POINTS_PER_MODULE, priceOf } from "@/content/pricing";
import { MODULE_DETAIL } from "@/content/module-detail";
import { useModuleViewEvent } from "@/lib/useViewEvents";
import { breadcrumbJsonLd, faqJsonLd, moduleJsonLd, pageHead, siteTitle } from "@/lib/seo";
import { roiModelFor } from "@/lib/roi";
import { Icon } from "@/components/icons/Icon";

/**
 * Plantilla única de las ocho páginas de módulo (§7.3).
 *
 * El repo tenía ocho landings con estructuras distintas —cada vertical con su Hero, su
 * bento y su banda—; se consolidan acá. **Las ocho son iguales, sin excepciones**: no hay
 * variante para módulos menos maduros, ni chip de estado, ni lista de espera.
 *
 * Las secciones largas —el problema, qué hace, las preguntas— salen de campos opcionales
 * de `modules.ts`. Donde un módulo no los tenga, la sección no se renderiza y la página
 * sigue funcionando con los bloques básicos.
 */
export const Route = createFileRoute("/plataforma/$modulo")({
  loader: ({ params }) => {
    const module = MODULE_BY_KEY.get(params.modulo as ModuleKey);
    if (!module) throw notFound();
    return { key: module.key };
  },
  head: ({ loaderData }) => {
    const m = loaderData && MODULE_BY_KEY.get(loaderData.key);
    if (!m) return {};

    const breadcrumb = breadcrumbJsonLd([
      { name: "Plataforma", path: "/plataforma" },
      { name: m.name, path: `/plataforma/${m.slug}` },
    ]);

    /* El módulo como producto: es lo que convierte esta página, para un buscador, de un
       artículo a una ficha con precio. Las features salen de los componentes del
       documento de visión; si un módulo todavía no los tiene, se declara sin `featureList`
       en vez de inventar una lista. */
    const detalle = MODULE_DETAIL[m.key];
    const producto = moduleJsonLd({
      name: m.name,
      slug: m.slug,
      description: m.seoDescription ?? m.promise,
      features: detalle?.components.map((c) => c.name) ?? [],
      price: priceOf(m.key),
    });

    return pageHead({
      // El nombre del módulo no siempre es un término de búsqueda. Donde hay
      // un término propio se usa ese, y el nombre queda de respaldo.
      title: siteTitle(m.seoTitle ?? m.name),
      description: m.seoDescription ?? m.promise,
      path: `/plataforma/${m.slug}`,
      // Un solo bloque con todas las entidades, en vez de varios scripts compitiendo por
      // describir la misma página.
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [breadcrumb, producto, ...(m.faq ? [faqJsonLd(m.faq)] : [])],
      },
    });
  },
  component: ModulePage,
});

function ModulePage() {
  const { key } = Route.useLoaderData();
  const m = MODULE_BY_KEY.get(key)!;
  useModuleViewEvent(m.key);

  // Cuatro de los ocho módulos tienen modelo. Los otros se cotizan por alcance y la
  // sección no aparece, en vez de mostrar una cuenta inventada.
  const roiModel = roiModelFor(m.key);

  // El detalle funcional del documento de visión: pasos, componentes y cruces.
  const detail = MODULE_DETAIL[m.key];

  /* Acá vivía un repartidor de fondos que alternaba blanco y gris según la posición de
     cada sección, para que ninguna quedara pegada a otra del mismo color.

     Se sacó el 19/10/2026, el mismo día que se escribió. Los lineamientos nuevos de la web
     dicen "el fondo es blanco" y, textual, que "alternar bandas oscuras y claras es lo que
     hace que una página se sienta cargada". Lo que separa dos secciones ahora son los
     112px de aire; si alguna vez hace falta más, el documento habla de una línea de 1px en
     --grey-200, no de un cambio de fondo. */

  return (
    <SiteLayout module={m.key}>
      {/* 01 */}
      <PageHero
        eyebrow={`${m.name} · Módulo ${m.number} de InspectIA OS`}
        title={m.h1 ?? m.promise}
        lead={m.lead ?? m.summary}
        module={m.key}
      >
        {/* La señal de precio, arriba y no a mitad de página. Es el módulo que se compra
            solo, y quien evalúa un producto que se vende así busca el precio antes que
            cualquier otra cosa: si no lo encuentra, se va a buscarlo afuera.

            Van los tres datos que definen la decisión de entrar —que hay plan gratuito,
            cuánto sale el primero que se paga, y que no se cobra por puesto— y un ancla
            a la grilla. Sin botón: los dos primarios ya están arriba y no hay un tercero. */}
        <PriceSignal m={m} />

        {m.roiLinkLabel && (
          <p className="mt-6 text-[15px]">
            <Link
              to="/roi"
              // Sin modelo propio no hay pestaña a la que apuntar: va a la calculadora
              // sin parámetro, que abre la primera.
              search={roiModel ? { modulo: m.key } : {}}
              className="text-on-brand-secondary underline-offset-4 transition-colors duration-[160ms] hover:text-on-brand hover:underline"
            >
              {m.roiLinkLabel}
            </Link>
          </p>
        )}
      </PageHero>

      {/* 02 */}
      {m.problem && <Problem items={m.problem} bg={"bg-surface"} />}

      {/* 03 */}
      <section className={`${"bg-surface"} px-5 py-[var(--section-pad-md)] md:px-8`}>
        <div className="mx-auto max-w-[var(--content-max)]">
          <div className="grid gap-12 min-[1000px]:grid-cols-2">
            <div className="min-w-0">
              <h2 className="eyebrow">Qué necesita</h2>
              <p className="mt-4 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
                {m.needs}
              </p>
            </div>

            {m.proof && (
              <div className="min-w-0">
                <h2 className="eyebrow">El número</h2>
                <p className="metric mt-4 text-[length:var(--text-data)] font-light leading-none text-ink">
                  {m.proof.value}
                </p>
                {/* Todo dato lleva su período: sin eso el número no significa nada. */}
                <p className="mt-3 text-sm text-ink-secondary">{m.proof.caption}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 04 */}
      {m.does && <WhatItDoes title={m.doesTitle} items={m.does} bg={"bg-surface"} />}

      {/* 04b y 04c · El detalle funcional, del documento de visión. Los siete módulos lo
          tienen, así que en la práctica estas dos secciones se renderizan siempre; la
          guarda está porque el tipo las declara opcionales y un módulo nuevo podría
          entrar sin detalle antes de que alguien lo escriba. */}
      {detail && (
        <HowItWorks steps={detail.howItWorks} answers={detail.answers} bg={"bg-surface"} />
      )}
      {detail && <Components items={detail.components} moduleName={m.name} bg={"bg-surface"} />}

      {/* 05 */}
      {roiModel && (
        <section className={`${"bg-surface"} px-5 py-[var(--section-pad-md)] md:px-8`}>
          <div className="mx-auto max-w-[var(--content-max)]">
            <p className="eyebrow">Cuánto te rinde</p>
            <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
              {m.roiTitle}
            </h2>
            {m.roiLead && (
              <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
                {m.roiLead}
              </p>
            )}

            <div className="mt-12">
              {/* Sin el formulario del informe: el PDF se pide desde /roi. */}
              <RoiCalculator model={roiModel} showLeadForm={false} />
            </div>

            <Link
              to="/roi"
              search={{ modulo: m.key }}
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Ver el modelo completo y descargar el informe
              <Icon name="arrow-right" />
            </Link>
          </div>
        </section>
      )}

      {/* 06 · Después de la calculadora, no antes: quien ya vio cuánto puede recuperar es
              el que crea la cuenta. Antes de la calculadora, "gratis" se lee como versión
              limitada. */}
      <PriceAndFree m={m} bg={"bg-surface"} />

      {/* 08 */}
      {m.faq && (
        <ModuleFaq
          title={m.faqTitle ?? `Preguntas sobre ${m.name}`}
          items={m.faq}
          bg={"bg-surface"}
        />
      )}

      {/* 09 */}
      <Related module={m} worksWith={detail?.worksWith} bg={"bg-surface"} />
    </SiteLayout>
  );
}

/* ---------- 02 · El problema ---------- */

function Problem({ items, bg }: { items: string[]; bg: string }) {
  return (
    <section className={`${bg} px-5 py-[var(--section-pad-md)] md:px-8`}>
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">El problema</p>
        <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          Si algo de esto te suena, es esto
        </h2>

        {/* Una columna, sin íconos y sin viñetas de color: son síntomas, no prestaciones,
            y una viñeta verde al lado los convierte en una lista de beneficios. */}
        <ul className="mt-12 max-w-[var(--read-max)] space-y-6">
          {items.map((item) => (
            <li
              key={item}
              className="text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 04 · Qué hace ---------- */

function WhatItDoes({
  title,
  items,
  bg,
}: {
  title?: string;
  items: { title: string; body: string }[];
  bg: string;
}) {
  return (
    <section
      className={`${bg} px-5 py-[var(--section-pad-md)] md:px-8 min-[1000px]:py-[var(--section-pad)]`}
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">Qué hace</p>
        <h2 className="mt-4 max-w-[28ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          {title}
        </h2>

        {/* TODO(equipo): faltan las capturas del producto. El patrón de esta sección es
            zigzag —texto y captura alternados—, pero hasta que existan las imágenes va a
            una sola columna al ancho de lectura. Sin mockup de notebook, sin placeholder
            gris y sin ilustración: un hueco vacío es peor que no tener la columna. */}
        <ol className="mt-12 max-w-[var(--read-max)] space-y-10">
          {items.map((item, i) => (
            <li key={item.title} className="min-w-0">
              <span className="metric text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[length:var(--text-card)] leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 04b · Cómo funciona, de punta a punta ---------- */

/**
 * El recorrido del módulo en orden, de la configuración al resultado.
 *
 * **Por qué va acá y no arriba.** "Qué hace" vende capacidades; esto explica el mecanismo,
 * y el mecanismo sólo le interesa a quien ya se convenció de que la capacidad le sirve.
 * Puesto antes, es una lista de pasos de configuración que espanta.
 *
 * El encabezado va a dos columnas con la pregunta que el módulo responde al costado. No es
 * decoración: un título corto solo en un contenedor de 1200px deja media página vacía, y
 * la pregunta es el contenido que mejor acompaña a un titular que anuncia un mecanismo.
 */
function HowItWorks({ steps, answers, bg }: { steps: string[]; answers: string; bg: string }) {
  return (
    <section
      className={`${bg} px-5 py-[var(--section-pad-md)] md:px-8 min-[1000px]:py-[var(--section-pad)]`}
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <div className="grid gap-8 min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[1000px]:gap-16">
          <div className="min-w-0">
            <p className="eyebrow">Cómo funciona</p>
            <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
              De la configuración al resultado
            </h2>
          </div>
          {/* La pregunta, en el cuerpo del lead y con el filete de marca: es la voz del
              cliente, no la nuestra. */}
          <p className="min-w-0 self-end border-l-2 border-line-brand pl-5 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Responde: {answers}
          </p>
        </div>

        {/* Dos columnas de pasos en desktop. En una sola, seis pasos a 60ch dejan media
            página vacía a la derecha; en dos, el ancho se llena y la medida de lectura
            queda más corta todavía. */}
        <ol className="mt-12 grid gap-x-16 gap-y-8 min-[1000px]:grid-cols-2">
          {steps.map((paso, i) => (
            <li key={paso} className="flex min-w-0 gap-4">
              <span className="metric shrink-0 pt-0.5 text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="min-w-0 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {paso}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 04c · De qué está hecho ---------- */

/**
 * La tabla de componentes del módulo: el detalle que pide quien está por contratar.
 *
 * Sale del documento de visión funcional (ver `content/module-detail.ts`) y es el nivel de
 * detalle que hasta ahora faltaba en todo el sitio: la página decía qué resuelve el módulo
 * y no de qué partes está hecho, que es exactamente lo que alguien compara contra otro
 * presupuesto.
 *
 * **Grilla y no tabla.** Una tabla de dos columnas con 14 filas de texto largo —Stock
 * tiene 14— se lee peor que una grilla, y en un teléfono una tabla obliga a arrastrar en
 * horizontal. La grilla colapsa sola.
 *
 * **Y grilla sin tarjetas.** Nacieron con borde y radio el 19/10 y perdieron la caja el
 * mismo día: los lineamientos reservan la tarjeta para lo que se toca como unidad, y esto
 * es texto que se lee. Catorce cajas en pantalla pesaban más que los catorce componentes
 * que describen. Queda una línea fina arriba de cada uno, que ordena igual y no encierra.
 */
function Components({
  items,
  moduleName,
  bg,
}: {
  items: { name: string; does: string }[];
  moduleName: string;
  bg: string;
}) {
  return (
    <section
      className={`${bg} px-5 py-[var(--section-pad-md)] md:px-8 min-[1000px]:py-[var(--section-pad)]`}
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">De qué está hecho</p>
        <h2 className="mt-4 max-w-[28ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          Todo lo que incluye {moduleName}
        </h2>

        <ul className="mt-12 grid gap-x-12 gap-y-9 min-[1000px]:grid-cols-3">
          {items.map((c) => (
            <li key={c.name} className="min-w-0 border-t border-line pt-5">
              <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{c.name}</h3>
              <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {c.does}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 06 · Plan gratuito y precio ----------

   Antes esta sección y la grilla de planes existían sólo para un módulo, porque era el
   único con precio publicado. Con el catálogo de septiembre de 2026 los siete lo tienen,
   así que la sección se arma con el precio del módulo que se está mirando y las dos se
   funden en una: el plan gratuito y el pago en el mismo bloque es lo que pide el doc 06
   §1.3, y lo que convence no es que haya un plan gratis sino verlo al lado del precio. */

function PriceAndFree({ m, bg }: { m: PlatformModule; bg: string }) {
  const price = priceOf(m.key);
  if (!price) return null;

  return (
    <section id="planes" className={`${bg} px-5 py-[var(--section-pad-md)] md:px-8`}>
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">Empezar</p>
        <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          Empezá gratis, hoy, sin instalar nada
        </h2>

        <PlanTiers price={price} subject={m.name} className="mt-10" />

        {/* La frase que más separa a InspectIA del resto, y por eso va acá y no en una
            nota al pie: en el resto del mercado automatizar la captura significa subir
            de plan. */}
        <p className="mt-8 max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink">
          Conectar el PLC o el sensor que ya tenés{" "}
          <strong className="font-semibold">no cambia este precio</strong>. Se cotiza la
          integración, una sola vez.
        </p>

        <p className="mt-4 max-w-[var(--read-max)] text-[13px] leading-[var(--leading-normal)] text-ink-muted">
          Cada módulo adicional descuenta {COMBO_POINTS_PER_MODULE} puntos sobre el total, hasta un{" "}
          {COMBO_MAX_DISCOUNT} %.{" "}
          <Link to="/precios" className="text-brand hover:underline hover:underline-offset-4">
            Ver la grilla completa
          </Link>
          .
        </p>

        <CtaPair className="mt-9 max-w-md" plan="free" />

        <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] leading-[var(--leading-normal)] text-ink">
          <span className="max-w-[48ch]">
            Si el proyecto lleva hardware o IA, Kit 4.0 te puede cubrir hasta un 50 %.
          </span>
          <Link
            to="/kit-4-0"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver qué kit te corresponde
            <Icon name="arrow-right" />
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------- 01b · Señal de precio en el hero ---------- */

function PriceSignal({ m }: { m: PlatformModule }) {
  const price = priceOf(m.key);
  if (!price) return null;

  return (
    <div className="mt-8 border-t border-[var(--border-on-brand)] pt-6">
      <dl className="flex flex-wrap gap-x-10 gap-y-4">
        <Signal value="USD 0" caption="Plan gratuito, sin tarjeta" />
        <Signal value={`USD ${price.usd}`} caption={`Por ${price.unit} y por mes`} />
        <Signal value="Ilimitados" caption="Usuarios, en todos los planes" />
      </dl>
      <p className="mt-5 text-[15px]">
        <a
          href="#planes"
          className="text-on-brand-secondary underline-offset-4 transition-colors duration-[160ms] hover:text-on-brand hover:underline"
        >
          Ver qué incluye el plan gratuito
        </a>
      </p>
    </div>
  );
}

function Signal({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="min-w-0">
      <dd className="metric text-[length:var(--text-lead)] font-light leading-none text-on-brand">
        {value}
      </dd>
      <dt className="mt-2 text-[13px] text-on-brand-secondary">{caption}</dt>
    </div>
  );
}

/* ---------- 08 · Preguntas frecuentes ---------- */

function ModuleFaq({
  title,
  items,
  bg,
}: {
  title: string;
  items: { q: string; a: string }[];
  bg: string;
}) {
  return (
    <section className={`${bg} px-5 py-[var(--section-pad-md)] md:px-8`}>
      <div className="mx-auto max-w-[50rem]">
        <h2 className="text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          {title}
        </h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="mod-faq-0"
          className="mt-10 border-t border-line"
        >
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`mod-faq-${i}`} className="border-line">
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
  );
}

/* ---------- 09 · Módulos relacionados ---------- */

/**
 * Si el módulo se apoya en otros, se muestran esos. Si no —el caso de Producción, que no se
 * apoya en ninguno—, se muestran los que se apoyan en él.
 *
 * Sin la relación inversa, la página con más tráfico orgánico del sitio sería la única sin
 * enlaces salientes a otros módulos. Se calcula sobre el mismo arreglo: no hace falta un
 * campo nuevo.
 */
function Related({
  module: m,
  worksWith,
  bg,
}: {
  module: PlatformModule;
  worksWith?: string[];
  bg: string;
}) {
  // Tres intentos, en orden: en qué se apoya, quién se apoya en él, y con qué se combina.
  // El tercero existe porque hay módulos donde los dos primeros dan vacío, y son
  // justamente los que más necesitan una salida.
  const byKeys = (keys: readonly string[]) => MODULES.filter((o) => keys.includes(o.key));

  const showing =
    (m.buildsOn.length > 0 && byKeys(m.buildsOn)) ||
    (() => {
      const inverse = MODULES.filter((o) => o.buildsOn.includes(m.key));
      return inverse.length > 0 ? inverse : byKeys(m.pairsWith ?? []);
    })();

  // La sección se calla sólo si no hay NI grilla NI cruces que contar. Antes bastaba con
  // que la grilla diera vacía, y al colgar los cruces acá eso se los llevaba puestos:
  // Stock, que no se apoya en nadie y en el que nadie se apoya, perdía sus seis líneas de
  // "con Producción…, con Calidad…" sin que nada avisara.
  const hayCruces = !!worksWith && worksWith.length > 0;
  if (showing.length === 0 && !hayCruces) return null;

  return (
    <section className={`${bg} px-5 py-[var(--section-pad-md)] md:px-8`}>
      <div className="mx-auto max-w-[var(--content-max)]">
        <p className="eyebrow">{m.relatedEyebrow ?? "Se apoya en"}</p>
        <h2 className="mt-4 max-w-[28ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          {m.relatedTitle ?? "Un módulo resuelve un problema. Juntos, gobiernan la operación."}
        </h2>

        {/* Qué se desbloquea con cada combinación, antes de la grilla: el texto da el
            motivo y la grilla da la salida. Sin esto la sección afirma que los módulos se
            potencian y no dice en qué, que es la parte que decide una segunda compra.

            Dos columnas desde 900px. En una sola, seis u ocho líneas cortas dejaban la
            mitad derecha vacía — el mismo problema de medida que el resto del sitio. */}
        {hayCruces && (
          <ul className="mt-10 grid gap-x-16 gap-y-3 min-[1000px]:grid-cols-2">
            {worksWith.map((linea) => (
              <li
                key={linea}
                className="min-w-0 text-[15px] leading-[var(--leading-normal)] text-ink-secondary"
              >
                {linea}
              </li>
            ))}
          </ul>
        )}

        {showing.length > 0 && <ModuleGrid modules={showing} className="mt-12" />}
      </div>
    </section>
  );
}
