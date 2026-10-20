import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaPair } from "@/components/site/CtaPair";
import { RoiMini } from "@/components/roi/RoiMini";
import { produccionModel } from "@/lib/roi/produccion";
import { MODULE_BY_KEY, type ModuleKey } from "@/content/modules";
import { Icon } from "@/components/icons/Icon";
import { MODULE_PRICES } from "@/content/pricing";
import { SHOW_PRICING } from "@/content/site";

/** Bloques propios de la home. Los que se usan en más de una página viven en site/. */

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1000px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
/* La base no lleva color: concatenarle `text-on-brand` dejaba dos utilidades de color en
   el mismo elemento y ganaba la que el CSS generado pusiera última, que resultó ser
   `text-ink` — un título oscuro sobre la banda teal. El color lo pone cada uso. */
const H2_BASE = "text-[28px] leading-tight md:text-[var(--text-section)]";
const H2 = `${H2_BASE} text-ink`;

/* ---------- 04 · El costo de no medir ---------- */

// Sin cifras de pérdida en esta sección, a propósito: el punto es que la planta todavía
// no tiene el número, así que ponerle uno genérico contradice lo que dice el texto.
const COSTS: { title: string; body: string; modulo: ModuleKey }[] = [
  {
    title: "El defecto que se descubre tarde",
    body: "La pieza mala sigue en el proceso hasta que alguien la ve, y a veces la ve el cliente. Cuando el lote ya salió, lo que se discute es la penalización.",
    modulo: "calidad",
  },
  {
    title: "La parada que nadie clasifica",
    body: "La línea se frena varias veces por turno y el motivo queda en la memoria del supervisor. Sin la causa anotada, la misma parada vuelve el mes que viene.",
    modulo: "produccion",
  },
  {
    title: "El inventario que no cuadra",
    body: "El sistema dice que está y en el rack no está. La diferencia se descubre contando, y contar significa parar el depósito un fin de semana.",
    modulo: "stock",
  },
];

export function CostOfNotMeasuring() {
  return (
    // Hundido y no blanco. Al subir este bloque por encima del catálogo quedaron tres
    // secciones blancas seguidas —logos, problema, plataforma— separadas sólo por
    // padding: el ojo las lee como un único bloque larguísimo y el aire entre ellas pasa
    // a leerse como hueco en vez de como respiro. (Las tres ya eran blancas antes; el
    // reordenamiento no lo causó, lo puso a la vista.)
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">El costo de no medir</p>
        <h2 className={`mt-4 max-w-[20ch] ${H2}`}>Lo que no se mide, se paga igual</h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          La mayoría de las plantas ya sabe que pierde plata en estos tres frentes. Lo que no tiene
          es el número, y sin el número no hay nada que corregir.
        </p>

        <ul className="mt-12 grid gap-8 min-[1000px]:grid-cols-3">
          {COSTS.map((c) => (
            <li key={c.modulo} className="min-w-0">
              <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {c.body}
              </p>
              <Link
                to="/plataforma/$modulo"
                params={{ modulo: c.modulo }}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
              >
                {`Lo resuelve: ${MODULE_BY_KEY.get(c.modulo)?.name ?? c.modulo}`}
                <Icon name="arrow-right" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 05 · Plan gratis y, después, la instalación ---------- */

/**
 * Los tres niveles de captura (doc 06 §4).
 *
 * **Es la sección que explica el modelo de precios sin hablar de precios.** Los tres
 * niveles en este orden —lo cargás vos, lo carga la máquina, lo detecta un modelo— son lo
 * que hace entendible que haya una parte publicada y una parte que se cotiza. El punto que
 * no puede faltar es el del medio: conectar la máquina **no cambia el precio**, y en el
 * resto del mercado automatizar la captura siempre significa subir de plan.
 */
const CAPTURE_LEVELS = [
  {
    title: "Lo cargás vos",
    body: "Un formulario en la tablet, el celular o la compu. Sin instalar nada. Es el plan gratuito.",
  },
  {
    title: "Lo carga la máquina",
    body: "Conectamos el PLC o el sensor que ya tenés, o uno nuevo y barato. Cuesta lo mismo que la carga manual: sólo se cotiza la integración, una vez.",
  },
  {
    title: "Sumale IA",
    body: "Visión artificial, modelos y agentes que detectan, cuentan y avisan solos. Se cotiza como proyecto, con hasta un 50 % de descuento con Kit 4.0.",
  },
];

/**
 * El único bloque con superficie de marca de la home (rediseño del 20/10).
 *
 * Antes el teal era el encabezado. Ahora el encabezado es blanco y el oscuro se reserva
 * para este momento, que es donde el lector decide si puede empezar: los tres niveles de
 * captura son la respuesta a "¿esto me sirve si no tengo nada instalado?".
 *
 * **La línea de seis etapas se fue de acá** a la página "Cómo empezar". Era el bloque más
 * largo de la home y contaba un proceso que sólo le interesa a quien ya se convenció.
 */
export function StartFree() {
  return (
    <section id="como" className={`bg-brand-deep ${SECTION}`}>
      <div className={CONTAINER}>
        <h2 className={`max-w-[24ch] ${H2_BASE} text-on-brand`}>
          De la planilla a la IA, al ritmo de tu planta
        </h2>

        <ol className="mt-12 grid gap-8 min-[1000px]:grid-cols-3">
          {CAPTURE_LEVELS.map((n, i) => (
            <li key={n.title} className="min-w-0">
              {/* El número en Mono: se evaluó pasarlo a Poppins tabular y se decidió
                  dejar la versión que estaba. */}
              <span className="metric text-sm font-semibold text-[var(--accent-on-brand)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[length:var(--text-card)] leading-snug text-on-brand">
                {n.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-on-brand-secondary">
                {n.body}
              </p>
            </li>
          ))}
        </ol>

        {/* El pie, separado por una línea blanca tenue: el dato que más tranquiliza y
            una sola acción. El boceto pone acá el botón "sobre teal", que es blanco con
            texto verde profundo. */}
        <div className="mt-12 flex flex-col gap-6 border-t border-[var(--border-on-brand)] pt-8 min-[1000px]:flex-row min-[1000px]:items-center min-[1000px]:justify-between">
          <p className="min-w-0 max-w-[var(--lead-max)] text-[15px] leading-[var(--leading-normal)] text-on-brand-secondary">
            Cuando hay que sumar hardware, la línea queda medida en{" "}
            <span className="font-semibold text-on-brand">1 a 10 días</span>.
          </p>
          <CtaPair surface="brand" className="shrink-0 max-w-md" plan="free" />
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 · El proyecto completo: IA, Kit 4.0 y marketplace ---------- */

/**
 * Esto eran **dos secciones y tres encabezados seguidos**: "Sumale IA", "Y hasta un 50 %
 * con Kit 4.0" y "Todo lo que el proyecto necesita, en un solo proveedor".
 *
 * Medido sobre producción el 19/10/2026: 711px + 1.601px = 2.312px, entre el 46 % y el
 * 57 % de la home. Y los tres decían variantes de lo mismo —*además hacemos más cosas*—
 * uno atrás del otro, justo después de que el lector venía siguiendo un argumento sobre
 * medir su línea. Tres ofertas laterales en fila no suman: diluyen, y es el patrón que
 * hace que una página se lea como armada por plantilla.
 *
 * Como un solo bloque con tres puertas, la misma información se lee como lo que es: lo
 * que hace falta para que el proyecto exista, de punta a punta. Una introducción en vez
 * de tres, y las tres puertas en paralelo porque son alternativas, no pasos.
 *
 * **Qué se perdió.** Las seis categorías del marketplace venían con una línea de
 * descripción cada una, en tarjetas. Acá quedan los nombres y las descripciones viven en
 * `/plataforma/marketplace`, que es la página que existe para eso. Era el contenido que
 * más espacio ocupaba y menos decidía.
 */

/** Las seis categorías del marketplace. El detalle está en `/plataforma/marketplace`. */
const MARKETPLACE_CATEGORIAS = [
  "Hardware, sensores e IoT",
  "ERP",
  "WMS",
  "Bots y automatización",
  "Financiamiento",
  "Datos y analítica",
];

export function ProjectBand() {
  return (
    <section className={`border-t border-line bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">El proyecto completo</p>
        <h2 className="mt-4 max-w-[24ch] text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
          Todo lo que el proyecto necesita, en un solo proveedor
        </h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Un proyecto de planta casi nunca es sólo software: hacen falta cámaras, sensores, un ERP
          que hable con la línea, a veces financiamiento. Las tres puertas salen del mismo lugar,
          así que no tenés que coordinar cinco proveedores.
        </p>

        {/* Tres columnas en desktop, apiladas en mobile. Los separadores son del lado
            izquierdo de cada columna menos la primera, que es lo que evita el filete
            colgando al final de la fila. */}
        <div className="mt-12 grid gap-10 border-t border-line pt-10 min-[1000px]:grid-cols-3 min-[1000px]:gap-0">
          <div className="min-w-0 min-[1000px]:pr-10">
            <h3 className="text-lg font-semibold leading-snug text-ink">Sumale IA</h3>
            <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              Detectamos defectos con cámaras, contamos producción sin tocar la máquina y
              anticipamos fallas antes de que paren la línea.
            </p>
            <Link
              to="/ia"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Ver aplicaciones de IA
              <Icon name="arrow-right" />
            </Link>
          </div>

          <div className="min-w-0 min-[1000px]:border-l min-[1000px]:border-line min-[1000px]:px-10">
            <h3 className="text-lg font-semibold leading-snug text-ink">
              Hasta un 50 % con Kit 4.0
            </h3>
            <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              Somos proveedores habilitados para todos los kits. Te decimos cuál te corresponde y,
              mientras sale el trámite, empezás gratis con una línea.
            </p>
            <Link
              to="/kit-4-0"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Ver qué kit te corresponde
              <Icon name="arrow-right" />
            </Link>
          </div>

          <div className="min-w-0 min-[1000px]:border-l min-[1000px]:border-line min-[1000px]:pl-10">
            <h3 className="text-lg font-semibold leading-snug text-ink">Hardware e integración</h3>
            {/* Los nombres en una lista y no en prosa: quien busca "WMS" o "ERP" tiene que
                encontrar la palabra, igual que con los módulos en el encabezado. */}
            <ul className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
              {MARKETPLACE_CATEGORIAS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <Link
              to="/plataforma/marketplace"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Explorar el marketplace
              <Icon name="arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 11 · Precios, el resumen ---------- */

export function PricingTeaser() {
  if (!SHOW_PRICING) return null;
  const desde = Math.min(...MODULE_PRICES.map((p) => p.usd));

  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">Precios</p>
        <h2 className={`mt-4 max-w-[24ch] ${H2}`}>El precio está publicado, módulo por módulo</h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Cada módulo arranca con un plan gratuito, sin tarjeta y sin vencimiento, y el pago va
          desde USD {desde} por mes. Los usuarios son ilimitados y conectar las máquinas que ya
          tenés no te sube de plan.
        </p>
        <p className="mt-9">
          <Link
            to="/precios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver la grilla completa
            <Icon name="arrow-right" />
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------- 10 · Programa para consultores ---------- */

export function PartnersBand() {
  return (
    // Blanco entre dos hundidas (ROI y precios), por el mismo motivo que el bloque del
    // costo de no medir: tres hundidas seguidas se leen como una sola.
    <section className={`bg-surface ${SECTION}`}>
      <div
        className={`${CONTAINER} flex flex-col gap-6 min-[1000px]:flex-row min-[1000px]:items-center min-[1000px]:justify-between`}
      >
        {/* Sin foto y sin números: una sola idea. */}
        <div className="min-w-0 max-w-[52ch]">
          <p className="eyebrow">Programa para consultores</p>
          <h2 className={`mt-3 ${H2}`}>Vos conocés la planta. Nosotros ponemos la plataforma.</h2>
          <p className="mt-4 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Si asesorás a fábricas o a centros de distribución, InspectIA OS es la parte de tu
            recomendación que se ejecuta. Y cuando un cliente nuestro necesita un consultor, te lo
            derivamos.
          </p>
        </div>
        <Link
          to="/partners"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          Conocer el programa de partners
          <Icon name="arrow-right" />
        </Link>
      </div>
    </section>
  );
}

/* ---------- 12 · Preguntas frecuentes ---------- */

/**
 * Escritas como las hace un jefe de planta. Cada respuesta **arranca por el sí o el no** y
 * después explica: es lo que permite que un motor de respuestas cite el primer renglón sin
 * tener que resumir.
 *
 * Se exporta para alimentar el FAQPage del @graph de la ruta, con la respuesta completa y
 * no un recorte.
 */
export const HOME_FAQ = [
  {
    q: "¿Qué es Kit 4.0 y cómo lo uso con InspectIA?",
    a: "Es un programa nacional que te da hasta un 50 % de descuento en proyectos de tecnología para planta. Somos proveedores habilitados para todos los kits: te ayudamos a elegir el que corresponde y armamos el proyecto.",
  },
  {
    q: "¿Necesito IA para empezar?",
    a: "No. Empezás cargando a mano, gratis. La IA se suma cuando hay un problema concreto que la justifica, como detectar defectos o anticipar fallas.",
  },
  {
    q: "¿Funciona con mis máquinas, aunque no sean nuevas?",
    a: "Sí, y es el caso normal. No hace falta cambiar la maquinaria: el dato se puede tomar de un sensor agregado, de una cámara, del PLC si lo tiene, o cargarse a mano desde una terminal. Con lo que la planta ya tiene alcanza para empezar a medir.",
  },
  {
    q: "¿Tengo que cambiar el ERP o el WMS?",
    a: "No. InspectIA se conecta al sistema que ya usás y le pasa lo que necesita. Tampoco es obligatorio conectarlo: podés arrancar sin integrar nada y sumar la conexión más adelante.",
  },
  {
    q: "¿Cuánto tarda en estar andando?",
    a: "Los planes gratuitos arrancan el mismo día: creás la cuenta y cargás los datos a mano. Cuando entra hardware para que el dato se capture solo, la puesta en marcha lleva entre 1 y 10 días desde la reunión de arranque.",
  },
  {
    q: "¿Puedo empezar con un solo módulo?",
    a: "Sí, y es lo que recomendamos. Se contrata por módulo y se suma cuando hace falta. Como todos corren sobre la misma plataforma, el segundo no es un proyecto nuevo: se habilita sobre los datos y los usuarios que ya tenés.",
  },
  {
    // Redactada a propósito sin afirmar dónde viven los datos ni nombrar ninguna
    // certificación: dice sólo lo que el producto ya hace. No ampliar con "servidores en
    // la nube", "cifrado de punta a punta" ni ISO/SOC hasta que infraestructura confirme.
    q: "¿Qué pasa con los datos de mi planta?",
    a: "Son tuyos. Cada empresa ve sólo su información, con roles y permisos por planta y por usuario, y queda registro de quién accede a qué.",
  },
];

export function Faq() {
  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className="mx-auto max-w-[50rem]">
        <p className="eyebrow">Antes de arrancar</p>
        <h2 className={`mt-4 ${H2}`}>Preguntas que nos hacen siempre</h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="mt-10 border-t border-line"
        >
          {HOME_FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="border-line">
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

/* ---------- 09 · ROI en la home ---------- */

/**
 * Tres controles, un número grande y el enlace al cálculo completo. Sin formulario: acá
 * no se pide nada, y el resultado nunca aparece detrás de un velo.
 *
 * Arranca por Producción porque es el módulo con el que más gente entra; desde /roi se cambia
 * a cualquier otro.
 */
export function HomeRoi() {
  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">Cuánto te rinde</p>
        <h2 className={`mt-4 max-w-[24ch] ${H2}`}>
          Poné tres números de tu línea y mirá el retorno
        </h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Sin registrarte y sin dejar el mail. Movés los valores y el resultado se actualiza
          mientras lo hacés.
        </p>

        <div className="mt-12">
          <RoiMini model={produccionModel} />
        </div>

        <p className="mt-8 max-w-[var(--lead-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
          Este es el escenario grueso. En la calculadora completa está el modelo de cada módulo, con
          sus supuestos y el costo de InspectIA a la vista.
        </p>
      </div>
    </section>
  );
}

/* ---------- 08 · Precio, consultoras y un solo proveedor ---------- */

/**
 * La franja de tres columnas que reemplaza a tres secciones sueltas.
 *
 * Antes esto eran `PricingTeaser`, `PartnersBand` y el bloque del marketplace: tres
 * secciones de pantalla completa, cada una con su título, su párrafo y su enlace, una
 * atrás de la otra. Son condiciones comerciales, no argumentos: quien llegó hasta acá ya
 * decidió si le interesa el producto y lo que busca es saber cómo se contrata.
 *
 * Como franja ocupan un bloque en vez de tres y dicen lo mismo. El detalle de cada una
 * vive en su página, que es la regla del rediseño: la home nombra, la interna explica.
 */
const FRANJA = [
  {
    title: "El precio está publicado",
    body: "Módulo por módulo, con plan gratuito en cada uno. Sin pedir cotización.",
    to: "/precios" as const,
    cta: "Ver precios",
  },
  {
    title: "Programa para consultoras",
    body: "Si asesorás plantas, InspectIA es la parte de software de tu propuesta.",
    to: "/partners" as const,
    cta: "Conocer el programa",
  },
  {
    title: "Todo en un solo proveedor",
    body: "Hardware, integración con tu ERP, proyectos de IA y financiamiento.",
    to: "/plataforma/marketplace" as const,
    cta: "Ver qué incluye",
  },
];

export function CommercialStrip() {
  return (
    <section id="precios" className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <ul className="grid gap-x-12 gap-y-9 border-t border-line pt-10 min-[1000px]:grid-cols-3">
          {FRANJA.map((f) => (
            <li key={f.title} className="min-w-0">
              <h2 className="text-[19px] font-semibold leading-snug text-ink">{f.title}</h2>
              <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {f.body}
              </p>
              <Link
                to={f.to}
                className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand hover:underline hover:underline-offset-4"
              >
                {f.cta}
                <Icon name="arrow-right" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
