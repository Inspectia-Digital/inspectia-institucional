import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaPair } from "@/components/site/CtaPair";
import { ImplementationTimeline } from "@/components/site/ImplementationTimeline";
import { RoiMini } from "@/components/roi/RoiMini";
import { produccionModel } from "@/lib/roi/produccion";
import { MODULE_BY_KEY, type ModuleKey } from "@/content/modules";
import { Icon } from "@/components/icons/Icon";
import { MODULE_PRICES } from "@/content/pricing";
import { SHOW_PRICING } from "@/content/site";

/** Bloques propios de la home. Los que se usan en más de una página viven en site/. */

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

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
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">El costo de no medir</p>
        <h2 className={`mt-4 max-w-[20ch] ${H2}`}>Lo que no se mide, se paga igual</h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          La mayoría de las plantas ya sabe que pierde plata en estos tres frentes. Lo que no tiene
          es el número, y sin el número no hay nada que corregir.
        </p>

        <ul className="mt-12 grid gap-8 min-[720px]:grid-cols-3">
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

export function StartFree() {
  return (
    <section className={`bg-surface-sunken ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">Cómo se empieza</p>
        <h2 className={`mt-4 max-w-[24ch] ${H2}`}>De la planilla a la IA, al ritmo de tu planta</h2>

        <ol className="mt-12 grid gap-8 min-[900px]:grid-cols-3">
          {CAPTURE_LEVELS.map((n, i) => (
            <li key={n.title} className="min-w-0">
              <span className="metric text-sm font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[length:var(--text-card)] leading-snug text-ink">
                {n.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {n.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-[var(--read-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
          Avanzás cuando el dato lo justifica, no antes.
        </p>

        <p className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            to="/precios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver los precios
            <Icon name="arrow-right" />
          </Link>
          <Link
            to="/ia"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver las aplicaciones de IA
            <Icon name="arrow-right" />
          </Link>
        </p>

        <CtaPair className="mt-9 max-w-md" plan="free" />

        <div className="mt-16 rounded-[var(--radius-lg)] border border-line bg-surface p-8 md:p-10">
          <h3 className="text-[length:var(--text-card)] leading-snug text-ink">
            Cuando llega el hardware: 1 a 10 días
          </h3>
          <p className="mt-3 max-w-[var(--lead-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            De la reunión de arranque a los datos corriendo en producción. Estas son las seis
            etapas, con lo que pasa en cada una.
          </p>
          {/* Sin `detailed`: en la home va la versión corta, sin entregables. */}
          <div className="mt-8">
            <ImplementationTimeline />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 06b · IA y Kit 4.0, en una sola banda ---------- */

/**
 * Las dos eran bandas separadas, una abajo de la otra, cada una con un título, un párrafo
 * y un botón.
 *
 * **Medido el 19/10/2026: juntas ocupaban 951px de los que 384 eran padding.** Dos bloques
 * consecutivos con la misma forma y el mismo peso visual no se leen como dos ideas: se
 * leen como relleno, y es el patrón que hace que una página parezca armada por plantilla.
 *
 * Van juntas porque son una sola idea en dos tiempos: la IA es lo que podrías sumar, y el
 * Kit 4.0 es cómo lo pagás. Puestas lado a lado esa relación se ve sin explicarla.
 */
export function IaAndKitBand() {
  return (
    <section className={`bg-brand-deep ${SECTION}`}>
      <div className={`${CONTAINER} grid gap-12 min-[900px]:grid-cols-2 min-[900px]:gap-16`}>
        <div className="min-w-0">
          <h2 className="max-w-[20ch] text-[28px] leading-tight text-on-brand md:text-[var(--text-section)]">
            Sumale IA a tu planta
          </h2>
          <p className="mt-5 text-[15px] leading-[var(--leading-normal)] text-on-brand-secondary">
            Detectamos defectos con cámaras, contamos producción sin tocar la máquina y anticipamos
            fallas antes de que paren la línea. Partimos de un problema que se puede medir.
          </p>
          <p className="mt-7">
            <Link
              to="/ia"
              className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-white px-7 text-[15px] font-semibold text-brand-deep transition-colors duration-[160ms] hover:bg-teal-050 active:translate-y-px"
            >
              Ver aplicaciones de IA
            </Link>
          </p>
        </div>

        <div className="min-w-0 min-[900px]:border-l min-[900px]:border-[var(--border-on-brand)] min-[900px]:pl-16">
          <h2 className="max-w-[22ch] text-[28px] leading-tight text-on-brand md:text-[var(--text-section)]">
            Y hasta un 50 % de descuento con Kit 4.0
          </h2>
          <p className="mt-5 text-[15px] leading-[var(--leading-normal)] text-on-brand-secondary">
            Somos proveedores habilitados para todos los kits del programa. Te decimos cuál te
            corresponde y, mientras sale el trámite, empezás gratis con una línea.
          </p>
          <p className="mt-7">
            <Link
              to="/kit-4-0"
              className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] border border-white/42 bg-white/12 px-7 text-[15px] font-semibold text-white transition-colors duration-[160ms] hover:bg-white/20 active:translate-y-px"
            >
              Ver qué kit te corresponde
            </Link>
          </p>
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
    <section className={`bg-surface-sunken ${SECTION}`}>
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

/* ---------- 08 · Marketplace ---------- */

const MARKETPLACE = [
  {
    name: "Hardware, sensores e IoT",
    body: "Cámaras, sensores, lectoras y la instalación en piso de planta.",
  },
  {
    name: "ERP",
    body: "Implementación del ERP y del enlace con la planta, para no recargar el dato a mano.",
  },
  {
    name: "WMS",
    body: "Gestión de depósito que recibe lo que cuentan los módulos de stock y recepción.",
  },
  {
    name: "Bots y automatización",
    body: "Tareas repetitivas de oficina y de piso, resueltas sin gente.",
  },
  {
    name: "Financiamiento",
    body: "Descuento de cheques y capital de trabajo para financiar el proyecto.",
  },
  {
    name: "Datos y analítica",
    body: "Tableros de gestión y BI sobre los datos que la plataforma genera.",
  },
];

export function MarketplaceTeaser() {
  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">Marketplace</p>
        <h2 className={`mt-4 max-w-[24ch] ${H2}`}>
          Todo lo que el proyecto necesita, en un solo proveedor
        </h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Un proyecto de planta casi nunca es sólo software: hacen falta cámaras, sensores, un ERP
          que hable con la línea, a veces financiamiento. Son servicios de terceros que
          comercializamos nosotros, así que los contratás con InspectIA y no tenés que coordinar
          cinco proveedores.
        </p>

        {/* Sin logos todavía: qué proveedor entra en cada categoría y con qué esquema
            comercial está pendiente (§15.6). Y los logos de integración técnica no van
            acá bajo ningún concepto (§11.6). */}
        <ul className="mt-12 grid gap-6 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-3">
          {MARKETPLACE.map((c) => (
            <li key={c.name} className="min-w-0 rounded-[var(--radius-lg)] border border-line p-6">
              <h3 className="text-lg font-semibold leading-snug text-ink">{c.name}</h3>
              <p className="mt-2 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                {c.body}
              </p>
            </li>
          ))}
        </ul>

        <Link
          to="/plataforma/marketplace"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          Explorar el marketplace
          <Icon name="arrow-right" />
        </Link>
      </div>
    </section>
  );
}

/* ---------- 10 · Programa para consultores ---------- */

export function PartnersBand() {
  return (
    <section className="bg-surface-sunken px-5 py-16 md:px-8">
      <div
        className={`${CONTAINER} flex flex-col gap-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between`}
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
    <section className={`bg-surface-sunken ${SECTION}`}>
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
