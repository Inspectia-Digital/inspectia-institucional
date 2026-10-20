import { createFileRoute, Link } from "@tanstack/react-router";
import { CAMPO } from "@/content/campo";
import { CampoForm } from "@/components/campo/CampoForm";
import { DEMO_URL, WHATSAPP_URL, CONTACT } from "@/content/site";
import { pageHead, siteTitle, breadcrumbJsonLd } from "@/lib/seo";
import { pushEvent, sourcePage } from "@/lib/analytics";
import { Icon } from "@/components/icons/Icon";

/**
 * InspectIA Campo — micrositio de la vertical agropecuaria, en `/campo`.
 *
 * ## No se parece al resto del sitio, y es el punto
 *
 * Campo es otro producto para otro comprador, y el pedido fue que se note. La primera
 * versión de esta página copiaba el formato institucional —encabezado teal a sangre, sin
 * tarjetas, sin menú propio— y lo que pasaba era lo contrario: se leía como una solución
 * más del catálogo. Esta sigue el boceto propio
 * (`docs/InspectIA Campo/Micrositio · inspectia.ai campo.png`), que decide distinto a
 * propósito en cuatro cosas:
 *
 * | | Sitio institucional | Campo |
 * |---|---|---|
 * | Encabezado | Banda teal a sangre | Fondo claro, con captura al lado |
 * | Banda oscura | El encabezado | "Empezás con lo que tenés", al medio |
 * | Tarjetas | Ninguna por defecto | Sí: seis de función y tres de perfil |
 * | Marca | Lockup con hexágono | Sólo el nombre, sin isotipo |
 *
 * Lo del hexágono no es una licencia: el design system de la vertical dice que todavía no
 * hay marca gráfica y que hasta que exista **el nombre se escribe en Poppins 600, sin
 * isotipo**. Usar el lockup de InspectIA sería inventarle una marca.
 *
 * Las tarjetas tampoco contradicen nada: los lineamientos que las sacaron del sitio son
 * los de la web institucional, y la vertical tiene su propio sistema, que las usa
 * ("cards blancas con radius-lg, borde de 1px y sin sombra en reposo").
 *
 * ## Las cuatro restricciones del plan §1
 *
 * Sin precios, sin datos reales de ningún campo, sin nombrar al socio de infraestructura y
 * sin nombres de clientes. Por eso no hay barra de logos ni cifras. Ver `content/campo.ts`.
 */

export const Route = createFileRoute("/campo")({
  head: () =>
    pageHead({
      title: siteTitle(CAMPO.seo.title),
      description: CAMPO.seo.description,
      path: "/campo",
      /* Sólo migas. Nada de `SoftwareApplication` con ofertas, que es lo que emiten las
         páginas de módulo: Campo no publica precios, y un producto declarado sin precio es
         lo que hace que el buscador muestre "precio no disponible". */
      jsonLd: breadcrumbJsonLd([{ name: "InspectIA Campo", path: "/campo" }]),
    }),
  component: CampoPage,
});

const PAD = "px-5 py-[var(--section-pad-md)] md:px-8";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight md:text-[var(--text-section)]";
const CARD = "rounded-[var(--radius-lg)] border border-line bg-surface";

/** Los anclajes del menú propio. Van acá para que el menú y las secciones no se separen. */
const ANCLAS = {
  funciones: "funciones",
  perfiles: "para-tu-campo",
  pasos: "como-empezar",
} as const;

function CampoPage() {
  return (
    /* El atributo enciende la paleta verde y envuelve la página entera, barra y pie
       incluidos: si sólo pintara el contenido, el chrome quedaría teal y la señal de "esto
       es otro producto" se perdería justo en los bordes. */
    <div data-theme="campo" className="flex min-h-screen flex-col bg-surface">
      <CampoHeader />
      <main className="flex-1">
        <Hero />
        <Funciones />
        <Perfiles />
        <Pasos />
        <Cierre />
      </main>
      <CampoFooter />
    </div>
  );
}

/* ---------- Chrome propio ---------- */

/**
 * La barra va en verde profundo y no en blanco como el boceto.
 *
 * El logotipo está especificado en blanco con "Campo" en verde brote (`#41dc38`), y esos
 * dos colores sólo existen sobre oscuro: el blanco sobre blanco no se ve, y el brote sobre
 * claro da 2,1:1 — el propio design system de la vertical dice que el brote "nunca es
 * texto sobre fondo claro". Para cumplir el logotipo al pie de la letra, la superficie que
 * lo sostiene tiene que ser oscura.
 *
 * Si se prefiere la barra blanca del boceto, el logotipo cambia a verde profundo +
 * `brote-800` (#236f1e, 5,5:1), que es el miembro de la rampa que sí pasa sobre claro.
 */
function CampoHeader() {
  return (
    <header className="bg-brand-deep px-5 py-4 md:px-8">
      <div className={`${CONTAINER} flex flex-wrap items-center justify-between gap-4`}>
        {/* Sólo el nombre: el design system de la vertical dice que no hay marca gráfica
            todavía y que no se use el hexágono de InspectIA modificado. */}
        <a
          href="#top"
          className="-my-2 py-2 font-[family-name:var(--font-brand)] text-[19px] font-semibold tracking-[-0.01em]"
          aria-label="InspectIA Campo"
        >
          <span className="text-on-brand">InspectIA</span>{" "}
          <span className="text-[var(--brote-500)]">Campo</span>
        </a>

        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-7 min-[1000px]:flex">
            <Ancla a={ANCLAS.funciones}>Funciones</Ancla>
            <Ancla a={ANCLAS.perfiles}>Para tu campo</Ancla>
            <Ancla a={ANCLAS.pasos}>Cómo empezar</Ancla>
          </nav>
          <BotonDemo lugar="navbar" sobreOscuro />
        </div>
      </div>
    </header>
  );
}

function Ancla({ a, children }: { a: string; children: React.ReactNode }) {
  return (
    <a
      href={`#${a}`}
      className="-my-2.5 py-2.5 text-[15px] font-medium text-on-brand-secondary transition-colors duration-[160ms] hover:text-on-brand"
    >
      {children}
    </a>
  );
}

function BotonDemo({
  lugar,
  ancho,
  sobreOscuro,
}: {
  lugar: string;
  ancho?: boolean;
  sobreOscuro?: boolean;
}) {
  return (
    <a
      href={DEMO_URL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={() =>
        pushEvent("demo_scheduled_click", { source_page: sourcePage(), audience: `campo-${lugar}` })
      }
      className={`inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] px-5 text-[15px] font-semibold transition-colors duration-[160ms] active:translate-y-px ${
        sobreOscuro
          ? "bg-white text-brand-deep hover:bg-[var(--monte-050)]"
          : "bg-action text-white hover:bg-action-hover"
      } ${ancho ? "w-full" : ""}`}
    >
      Pedí una demo
    </a>
  );
}

function CampoFooter() {
  return (
    <footer className="border-t border-line bg-surface-sunken px-5 py-10 md:px-8">
      <div
        className={`${CONTAINER} flex flex-col gap-4 text-[15px] text-ink-secondary min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between`}
      >
        <p className="min-w-0">
          {/* El mismo logotipo, con los miembros de la rampa que sí pasan sobre claro:
              verde profundo y brote-800 (5,5:1). El brote-500 de la barra acá daría 2,1:1. */}
          <span className="font-semibold">
            <span className="text-[var(--monte-900)]">InspectIA</span>{" "}
            <span className="text-[var(--brote-800)]">Campo</span>
          </span>{" "}
          es parte de{" "}
          <a
            href="https://inspectia.ai"
            className="-my-2.5 inline-block py-2.5 font-semibold text-brand underline underline-offset-4"
          >
            InspectIA
          </a>
          .
        </p>
        <nav className="-my-2.5 flex flex-wrap items-center gap-x-6">
          {WHATSAPP_URL && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="py-2.5 underline underline-offset-4 hover:text-brand"
            >
              WhatsApp
            </a>
          )}
          {CONTACT.linkedin && (
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 underline underline-offset-4 hover:text-brand"
            >
              LinkedIn
            </a>
          )}
          <Link to="/privacidad" className="py-2.5 underline underline-offset-4 hover:text-brand">
            Privacidad
          </Link>
        </nav>
      </div>
    </footer>
  );
}

/* ---------- 1 · Encabezado ---------- */

function Hero() {
  return (
    <section id="top" className={`bg-surface-sunken ${PAD}`}>
      <div
        className={`${CONTAINER} grid items-center gap-10 min-[640px]:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] min-[1000px]:gap-12`}
      >
        {/* `hero-col` no es decorativo: `--text-hero` se mide en `cqw` y sin un
            contenedor con `container-type: inline-size` el tamaño se ata al viewport en vez
            de a la columna. Eso hacía que entre 720 y 1000px el titular siguiera grande
            mientras la columna se angostaba, y cayera en cuatro líneas en vez de tres. */}
        <div className="hero-col min-w-0">
          {/* La pill de perfiles, en el verde pasto pálido del sistema. */}
          <p className="inline-block rounded-[var(--radius-pill)] bg-[var(--brote-100)] px-3.5 py-1.5 text-[13px] font-semibold text-[var(--brote-900)]">
            {CAMPO.hero.perfiles.join(" · ")}
          </p>

          <h1 className="mt-6 max-w-[22ch] text-[length:var(--text-hero)] leading-[var(--leading-hero)] tracking-[var(--tracking-hero)]">
            {CAMPO.hero.h1}
          </h1>

          <p className="mt-5 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            {CAMPO.hero.lead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <BotonDemo lugar="hero" />
            {WHATSAPP_URL && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={() => pushEvent("whatsapp_click", { source_page: sourcePage() })}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-line-strong bg-surface px-5 text-[15px] font-semibold text-ink transition-colors duration-[160ms] hover:border-line-brand hover:text-brand active:translate-y-px"
              >
                <Icon name="whatsapp" />
                Escribinos por WhatsApp
              </a>
            )}
          </div>
        </div>

        <Tablero />
      </div>
    </section>
  );
}

/**
 * La foto del campo con la captura del producto encima.
 *
 * **Las dos son marcadores y se nota a propósito.** El plan §6 deja pendientes la foto y
 * la captura de "Ahora en el campo" con datos de ejemplo, y la restricción §1 prohíbe
 * publicar datos reales de cualquier campo, el piloto incluido. Antes que inventar una
 * captura que después hay que reemplazar, el hueco dice qué va a ir ahí.
 *
 * Los datos que se ven son de ejemplo y lo declaran en pantalla —"Datos de ejemplo"— que
 * es lo que exige el sistema de la vertical: toda cifra dice de cuándo es y de dónde sale.
 */
function Tablero() {
  return (
    <div className="relative min-w-0">
      {/* La foto, con el marco del sistema: radio y nada más. Sin sombra y sin
          perspectiva, que es lo que piden los lineamientos.

          16:9 y no 16:11 como el marcador que había acá: la foto es 16:9 y llevarla a un
          formato más alto le sacaba ancho, que a 1088px es justo lo que no sobra. */}
      <img
        src={CAMPO.hero.foto.src}
        srcSet={`${CAMPO.hero.foto.srcChico} ${CAMPO.hero.foto.anchoChico}w, ${CAMPO.hero.foto.src} ${CAMPO.hero.foto.width}w`}
        sizes="(max-width: 720px) 100vw, 45vw"
        width={CAMPO.hero.foto.width}
        height={CAMPO.hero.foto.height}
        alt={CAMPO.hero.foto.alt}
        // Está en la primera pantalla: no se difiere.
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="aspect-[16/9] w-full rounded-[var(--radius-lg)] object-cover"
      />

      {/* La captura, montada sobre la foto y desbordando por abajo a la izquierda. */}
      <div
        /* A la derecha y no a la izquierda como el boceto.

           El boceto la ponía abajo a la izquierda, pero ahí tenía un marcador gris: daba
           igual qué tapaba. Con la foto real, la izquierda es el molino y su aguada —el
           sujeto, y lo único que muestra una aguada instrumentada—, y la derecha es campo
           abierto. La tarjeta va donde no tapa nada. */
        className={`${CARD} mt-4 w-full p-4 min-[1000px]:absolute min-[1000px]:-bottom-5 min-[1000px]:-right-6 min-[1000px]:mt-0 min-[1000px]:w-[18rem] min-[1000px]:shadow-[var(--shadow-md)]`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-semibold">Ahora en el campo</h2>
          <span className="text-[12px] text-ink-muted">Datos de ejemplo</span>
        </div>

        <dl className="mt-4 space-y-2 text-[13px]">
          <div className="flex items-center justify-between gap-3 rounded-[var(--radius-sm)] bg-surface-sunken px-3 py-2">
            <dt className="text-ink">Aguada 4</dt>
            <dd className="flex items-baseline gap-2">
              <span className="metric font-semibold text-brand">78 %</span>
              <span className="text-ink-muted">6 días</span>
            </dd>
          </div>

          {/* El único uso de color de estado en la página, y lleva la palabra además del
              color, como pide el sistema de la vertical. */}
          <div className="rounded-[var(--radius-sm)] bg-status-stop-bg px-3 py-2 text-status-stop">
            Cerco norte apagado desde las 05:42
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[var(--radius-sm)] bg-surface-sunken px-3 py-2">
            <dt className="text-ink">Días sin lluvia</dt>
            <dd className="metric font-semibold text-ink">11</dd>
          </div>
        </dl>

        <p className="mt-4 text-[12px] text-brand">
          Aviso enviado al encargado por WhatsApp · hace 4 min
        </p>
      </div>

      {/* El alto que la captura ocupa fuera de la foto, para que no se monte sobre la
          sección siguiente. */}
      <div className="min-[1000px]:h-5" aria-hidden="true" />
    </div>
  );
}

/* ---------- 2 · Todo el campo, en una pantalla ---------- */

function Funciones() {
  return (
    <section id={ANCLAS.funciones} className={`bg-surface ${PAD}`}>
      <div className={CONTAINER}>
        <h2 className={`max-w-[24ch] ${H2}`}>Todo el campo, en una pantalla</h2>

        <ul className="mt-12 grid gap-6 min-[1000px]:grid-cols-2 min-[1000px]:grid-cols-3">
          {CAMPO.capacidades.map((c) => (
            <li key={c.name} className={`min-w-0 ${CARD} p-6`}>
              <Icon name={c.icon} className="text-brand" />
              <h3 className="mt-4 text-[17px] font-semibold leading-snug">{c.name}</h3>
              <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 3 · Armado para tu tipo de campo ---------- */

/** El tinte del marcador de foto de cada perfil, como en el boceto. */
const TINTE = [
  "bg-[var(--campo-tinte-agricultura)]",
  "bg-[var(--campo-tinte-ganaderia)]",
  "bg-[var(--campo-tinte-feedlot)]",
];

function Perfiles() {
  return (
    <section id={ANCLAS.perfiles} className={`bg-surface-sunken ${PAD}`}>
      <div className={CONTAINER}>
        <h2 className={`max-w-[24ch] ${H2}`}>Armado para tu tipo de campo</h2>

        <ul className="mt-12 grid gap-6 min-[1000px]:grid-cols-3">
          {CAMPO.perfiles.map((p, i) => (
            <li key={p.name} className={`flex min-w-0 flex-col overflow-hidden ${CARD}`}>
              {/* Marcador de foto. Plan §6: faltan las fotos de campo. */}
              <div
                className={`flex aspect-[16/10] max-h-[11rem] items-center justify-center ${TINTE[i]} text-[12px] text-ink-muted`}
              >
                [Foto · {p.foto}]
              </div>
              <div className="min-w-0 p-6">
                <h3 className="text-[17px] font-semibold leading-snug">{p.name}</h3>
                <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 4 · Empezás con lo que tenés ---------- */

function Pasos() {
  return (
    <section id={ANCLAS.pasos} className={`bg-brand-deep ${PAD}`}>
      <div className={CONTAINER}>
        <h2 className={`max-w-[24ch] ${H2}`}>Empezás con lo que tenés</h2>

        <ol className="mt-12 grid gap-x-12 gap-y-8 min-[1000px]:grid-cols-3">
          {CAMPO.pasos.map((paso, i) => (
            <li key={paso} className="min-w-0">
              <span className="metric text-[13px] font-semibold text-[var(--accent-on-brand)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-on-brand-secondary">
                {paso}
              </p>
            </li>
          ))}
        </ol>

        {/* El gancho de Kit 4.0 va con su reparo a la vista, no escondido.

            El plan §5 dice que el catálogo no tiene kits agro y que la mayor parte del
            ticket probablemente no encuadre. El boceto lo muestra igual, con "[a confirmar]"
            adentro de la pill: es más honesto que apagarlo —el gancho existe— y que
            publicarlo liso, que sería prometer una plata que después hay que desdecir.
            Cuando se confirmen los kits, se saca el reparo y queda la frase. */}
        <p className="mt-12 inline-flex flex-wrap items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-on-brand)] px-5 py-2.5 text-[14px] text-on-brand">
          Hasta un 50 % de descuento en tu proyecto con Kit 4.0
          <span className="text-on-brand-secondary">[a confirmar]</span>
        </p>
      </div>
    </section>
  );
}

/* ---------- 5 · Hablemos ---------- */

function Cierre() {
  return (
    <section className={`bg-surface-sunken ${PAD}`}>
      <div
        className={`${CONTAINER} grid gap-12 min-[1000px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] min-[1000px]:gap-16`}
      >
        <div className="min-w-0">
          <h2 className={H2}>{CAMPO.cierre.h2}</h2>
          <p className="mt-6 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            {CAMPO.cierre.lead}
          </p>
          <p className="mt-5 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            {CAMPO.cierre.canales}
          </p>
          {WHATSAPP_URL && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              onClick={() => pushEvent("whatsapp_click", { source_page: sourcePage() })}
              className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand underline underline-offset-4"
            >
              Escribinos por WhatsApp
              <Icon name="arrow-right" />
            </a>
          )}
        </div>

        <div className={`min-w-0 ${CARD} p-6 md:p-8`}>
          <CampoForm />
        </div>
      </div>
    </section>
  );
}
