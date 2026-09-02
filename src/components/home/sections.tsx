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
import { tymeoModel } from "@/lib/roi/tymeo";
import { Icon } from "@/components/icons/Icon";

/** Bloques propios de la home. Los que se usan en más de una página viven en site/. */

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

/* ---------- 04 · El costo de no medir ---------- */

// Sin cifras de pérdida en esta sección, a propósito: el punto es que la planta todavía
// no tiene el número, así que ponerle uno genérico contradice lo que dice el texto.
const COSTS = [
  {
    title: "El defecto que se descubre tarde",
    body: "La pieza mala sigue en el proceso hasta que alguien la ve, y a veces la ve el cliente. Cuando el lote ya salió, lo que se discute es la penalización.",
    link: "Lo resuelve: Control de calidad",
    modulo: "control-de-calidad",
  },
  {
    title: "La parada que nadie clasifica",
    body: "La línea se frena varias veces por turno y el motivo queda en la memoria del supervisor. Sin la causa anotada, la misma parada vuelve el mes que viene.",
    link: "Lo resuelve: TYMEO",
    modulo: "tymeo",
  },
  {
    title: "El inventario que no cuadra",
    body: "El sistema dice que está y en el rack no está. La diferencia se descubre contando, y contar significa parar el depósito un fin de semana.",
    link: "Lo resuelve: Control de stock en posiciones",
    modulo: "stock-en-posiciones",
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
                {c.link}
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

const FREE_PLAN = [
  "Una planta y una línea, sin límite de tiempo.",
  "Carga manual por formulario: no hace falta instalar nada.",
  "Sin tarjeta.",
];

export function StartFree() {
  return (
    <section className={`bg-surface-sunken ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">Cómo se empieza</p>
        <h2 className={`mt-4 max-w-[24ch] ${H2}`}>
          Empezá hoy mismo, gratis. La instalación viene después.
        </h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Creás la cuenta y ese mismo día estás cargando producción y viendo tu OEE, sin hardware,
          sin visita y sin cotización. El proyecto de instalación entra recién cuando quieras que el
          dato se capture solo.
        </p>

        <ul className="mt-8 space-y-2.5">
          {FREE_PLAN.map((line) => (
            <li
              key={line}
              className="flex gap-2.5 text-[15px] leading-[var(--leading-normal)] text-ink"
            >
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--action-primary)]"
              />
              <span className="min-w-0">{line}</span>
            </li>
          ))}
        </ul>

        <CtaPair className="mt-9 max-w-md" plan="free" />

        <div className="mt-16 rounded-[var(--radius-lg)] border border-line bg-surface p-8 md:p-10">
          <h3 className="text-[length:var(--text-card)] leading-snug text-ink">
            Cuando llega el hardware: 5 a 15 días
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
    q: "¿Funciona con mis máquinas, aunque no sean nuevas?",
    a: "Sí, y es el caso normal. No hace falta cambiar la maquinaria: el dato se puede tomar de un sensor agregado, de una cámara, del PLC si lo tiene, o cargarse a mano desde una terminal. Con lo que la planta ya tiene alcanza para empezar a medir.",
  },
  {
    q: "¿Tengo que cambiar el ERP o el WMS?",
    a: "No. InspectIA se conecta al sistema que ya usás y le pasa lo que necesita. Tampoco es obligatorio conectarlo: podés arrancar sin integrar nada y sumar la conexión más adelante.",
  },
  {
    q: "¿Cuánto tarda en estar andando?",
    a: "Los planes gratuitos arrancan el mismo día: creás la cuenta y cargás los datos a mano. Cuando entra hardware para que el dato se capture solo, la puesta en marcha lleva entre 5 y 15 días desde la reunión de arranque.",
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
 * Arranca por TYMEO porque es el módulo con el que más gente entra; desde /roi se cambia
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
          <RoiMini model={tymeoModel} />
        </div>

        <p className="mt-8 max-w-[var(--lead-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
          Este es el escenario grueso. En la calculadora completa está el modelo de cada módulo, con
          sus supuestos y el costo de InspectIA a la vista.
        </p>
      </div>
    </section>
  );
}
