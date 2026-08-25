import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaPair } from "@/components/site/CtaPair";
import { ImplementationTimeline } from "@/components/site/ImplementationTimeline";

/** Bloques propios de la home. Los que se usan en más de una página viven en site/. */

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

/* ---------- 04 · El costo de no medir ---------- */

const COSTS = [
  {
    title: "El defecto se descubre cuando el lote ya salió",
    body: "El retrabajo y el scrap se contabilizan al cierre del mes, cuando ya no se puede hacer nada con esa producción.",
    link: "Ver control de calidad",
    modulo: "control-de-calidad",
  },
  {
    title: "La máquina para y nadie anota por qué",
    body: "Sin las paradas clasificadas, la discusión sobre qué arreglar primero se resuelve por intuición y no por lo que costó cada una.",
    link: "Ver TYMEO",
    modulo: "tymeo",
  },
  {
    title: "El sistema dice que está y en el rack no está",
    body: "El inventario descuadrado se paga dos veces: en la venta que no se pudo despachar y en las horas de recontar.",
    link: "Ver control de stock",
    modulo: "stock-en-posiciones",
  },
];

export function CostOfNotMeasuring() {
  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">El costo de no medir</p>
        <h2 className={`mt-4 max-w-[20ch] ${H2}`}>Lo que no se mide, se paga igual.</h2>

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
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 05 · Plan gratis y, después, la instalación ---------- */

export function StartFree() {
  return (
    <section className={`bg-surface-sunken ${SECTION}`}>
      <div className={CONTAINER}>
        <p className="eyebrow">Cómo se empieza</p>
        <h2 className={`mt-4 max-w-[24ch] ${H2}`}>
          Empezá hoy mismo, gratis. La instalación viene después.
        </h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Arrancá por el plan gratuito: creás la cuenta y ese mismo día estás cargando y midiendo,
          sin hardware, sin visita y sin cotización. Cuando quieras automatizar la captura del dato,
          entra el proyecto de instalación.
        </p>

        <CtaPair className="mt-9 max-w-md" plan="free" />

        <div className="mt-16 rounded-[var(--radius-lg)] border border-line bg-surface p-8 md:p-10">
          <p className="eyebrow">Si sumás hardware</p>
          <ImplementationTimeline />
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 · Marketplace ---------- */

const MARKETPLACE = [
  {
    name: "Hardware y sensórica",
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
          Todo lo que el proyecto necesita, en un solo proveedor.
        </h2>
        <p className="mt-6 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
          Cámaras y sensores, ERP, WMS, bots, financiamiento y analítica. Son servicios de terceros
          que comercializamos nosotros: los contratás con InspectIA y no tenés que coordinar cinco
          proveedores.
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
          Ver el marketplace
          <ArrowRight className="size-4" aria-hidden />
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
        <div className="min-w-0 max-w-[52ch]">
          <p className="eyebrow">Programa para consultores</p>
          <p className="mt-3 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
            Somos el producto que tu cartera de clientes necesita. Vos conocés la planta; nosotros
            ponemos la plataforma, el hardware y la puesta en marcha.
          </p>
        </div>
        <Link
          to="/partners"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          Ver el programa
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

/* ---------- 12 · Preguntas frecuentes ---------- */

/** Escritas como las hace un jefe de planta. Sin preguntas de venta disfrazadas del tipo
 *  "¿por qué elegir InspectIA?". Se exporta para el JSON-LD de la ruta. */
export const HOME_FAQ = [
  {
    q: "¿Sirve con mis máquinas viejas?",
    a: "Sí. La plataforma se apoya en lo que ya tenés: las cámaras de la planta, los sensores y el PLC, tenga los años que tenga. No hace falta cambiar una máquina para empezar a medirla, y con el plan gratuito el dato se carga a mano hasta que quieras automatizar la captura.",
  },
  {
    q: "¿Tengo que cambiar el ERP?",
    a: "No. InspectIA se conecta al ERP y al WMS que ya usás. No los reemplaza: los lee y les devuelve lo que la planta produce.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "De la reunión de arranque a producción, entre 5 y 15 días. La única etapa que no podemos prometer es la conectividad: con terminales de mano es simple, y si hay que instalar PLC o sensores lleva más. El plan gratuito no tiene implementación: se usa el mismo día.",
  },
  {
    // TODO(equipo): revisar con legales antes de publicar. Es una afirmación sobre
    // tratamiento de datos y no se redacta a ojo.
    q: "¿Qué pasa con mis datos?",
    a: "Los datos de tu operación son tuyos. Se usan para darte el servicio y alimentar los tableros que ves, y cada usuario accede solamente a lo que su rol le habilita.",
  },
  {
    q: "¿Puedo empezar por un módulo solo?",
    a: "Sí, y es lo que recomendamos. Los módulos comparten los datos maestros, los usuarios y el mismo tablero, así que sumar el segundo no es un proyecto nuevo: es una casilla que se habilita.",
  },
];

export function Faq() {
  return (
    <section className={`bg-surface ${SECTION}`}>
      <div className="mx-auto max-w-[50rem]">
        <p className="eyebrow">Antes de arrancar</p>
        <h2 className={`mt-4 ${H2}`}>Preguntas frecuentes</h2>

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
