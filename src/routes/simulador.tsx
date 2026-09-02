import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { OeeSimulator } from "@/components/site/OeeSimulator";
import { breadcrumbJsonLd, faqJsonLd, pageHead } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

const TITLE = "Simulador de OEE: calculá tu eficiencia · InspectIA";
const DESCRIPTION =
  "Calculá el OEE de un turno con tus propios datos: disponibilidad, rendimiento y calidad. Sin registrarte y con la cuenta a la vista.";

/**
 * Simulador de OEE.
 *
 * La URL se conserva de la web anterior, y ése es el motivo de que esta página exista:
 * `/simulador/` era una de las que más tráfico de búsqueda traía, y «simulador OEE» lo
 * busca alguien que ya sabe qué es el indicador y quiere calcularlo. Redirigirla a la
 * calculadora de ROI hubiera perdido el término.
 *
 * **Es distinto de /roi y la diferencia importa.** Acá no hay ningún supuesto de negocio:
 * OEE es una definición estándar y la cuenta da lo que da. En /roi se estima cuánto
 * devuelve una inversión, que es una proyección y se discute.
 *
 * TODO(equipo): el texto explicativo es una adaptación del que tenía la página anterior,
 * pasado al voseo del resto del sitio. Falta la pasada de contenido propio.
 */
export const Route = createFileRoute("/simulador")({
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/simulador",
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([{ name: "Simulador de OEE", path: "/simulador" }]),
          faqJsonLd(FAQ),
        ],
      },
    }),
  component: Page,
});

const FAQ = [
  {
    q: "¿Qué es el OEE?",
    a: "Es la eficiencia general de los equipos, y es el indicador estándar para medir cuánto de la capacidad instalada se está aprovechando de verdad. Sale de multiplicar tres factores: disponibilidad, rendimiento y calidad.",
  },
  {
    q: "¿Qué OEE es un buen OEE?",
    a: "El 85 % es lo que la literatura del indicador llama clase mundial y es poco frecuente. El promedio de la industria está alrededor del 60 %, y por debajo del 40 % suele haber pérdidas grandes para recuperar. El número que importa igual no es el absoluto: es cómo se mueve el tuyo mes a mes.",
  },
  {
    q: "¿Por qué el OEE da más bajo de lo que esperaba?",
    a: "Porque los tres factores se multiplican, no se promedian. Tres factores del 90 % dan un OEE del 72,9 %, no del 90 %. Es lo que hace que el indicador sea exigente y también lo que lo vuelve útil.",
  },
  {
    q: "¿En qué se diferencia esto de medir el OEE con TYMEO?",
    a: "Este simulador toma los datos de un turno que vos cargás a mano, así que sirve para una auditoría puntual o para entender el indicador. TYMEO lo calcula solo y en vivo, con los datos que salen de las máquinas, por turno, línea, puesto y operario. La diferencia práctica es que acá mirás una foto y allá mirás la película.",
  },
];

const SECTION = "px-5 md:px-8 py-[var(--section-pad-md)] min-[1100px]:py-[var(--section-pad)]";
const CONTAINER = "mx-auto max-w-[var(--content-max)]";
const H2 = "text-[28px] leading-tight text-ink md:text-[var(--text-section)]";

function Page() {
  return (
    <SiteLayout module="tymeo">
      <PageHero
        eyebrow="Simulador de OEE"
        title="Calculá el OEE de tu línea"
        lead="Poné los datos de un turno y mirá qué eficiencia real tuvo. Los tres factores se calculan por separado, así que se ve dónde se está yendo la producción: en las paradas, en la velocidad o en el scrap."
        cta={false}
      />

      <section className={`bg-surface ${SECTION}`}>
        <div className={CONTAINER}>
          <OeeSimulator />
        </div>
      </section>

      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className="mx-auto max-w-[var(--read-max)]">
          <p className="eyebrow">Qué mide</p>
          <h2 className={`mt-4 ${H2}`}>Las tres pérdidas que el OEE separa</h2>
          <p className="mt-6 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            El valor del indicador no está en el número final sino en que descompone la pérdida en
            tres causas distintas, y cada una se ataca de una manera.
          </p>

          <dl className="mt-10 space-y-8">
            <Factor
              title="Disponibilidad"
              body="Cuánto del tiempo programado la línea estuvo efectivamente produciendo. Lo que se pierde acá son averías, mantenimiento y cambios de formato. Si este factor es el más bajo, el problema es que la línea está parada."
            />
            <Factor
              title="Rendimiento"
              body="A qué velocidad produjo mientras estuvo andando, comparado con la velocidad teórica de la máquina. Lo que se pierde acá son microparadas y marcha lenta, que casi nunca quedan registradas porque duran menos de lo que alguien anota."
            />
            <Factor
              title="Calidad"
              body="Cuánto de lo producido salió bien a la primera. Lo que se pierde acá es scrap y retrabajo: unidades que consumieron tiempo de máquina y no se pueden vender."
            />
          </dl>
        </div>
      </section>

      <section className={`bg-surface ${SECTION}`}>
        <div className="mx-auto max-w-[var(--read-max)]">
          <p className="eyebrow">Del simulador a la planta</p>
          <h2 className={`mt-4 ${H2}`}>Una foto sirve una vez</h2>
          <p className="mt-6 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            Este simulador toma los datos de un turno que cargás a mano, y para una auditoría
            puntual alcanza. El problema aparece cuando querés seguirlo: calcular el OEE al final
            del turno con una planilla es mirar el problema cuando ya pasó, y las microparadas —que
            suelen ser la pérdida más grande— no llegan nunca a la planilla porque nadie las anota.
          </p>
          <p className="mt-4 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            TYMEO calcula lo mismo, en vivo, con los datos que ya generan tus máquinas, y clasifica
            cada parada por motivo. Tiene un plan gratuito que empieza con carga manual, sin
            hardware y sin instalación, así que se puede probar con una línea antes de decidir nada.
          </p>
          <p className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              to="/plataforma/$modulo"
              params={{ modulo: "tymeo" }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Ver cómo mide TYMEO
              <Icon name="arrow-right" />
            </Link>
            <Link
              to="/roi"
              search={{ modulo: "tymeo" }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
            >
              Calcular cuánto devuelve medir
              <Icon name="arrow-right" />
            </Link>
          </p>
        </div>
      </section>

      <section className={`bg-surface-sunken ${SECTION}`}>
        <div className="mx-auto max-w-[50rem]">
          <p className="eyebrow">Preguntas</p>
          <h2 className={`mt-4 ${H2}`}>Sobre el indicador</h2>
          <dl className="mt-10 space-y-8">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt className="text-[17px] font-medium leading-snug text-ink">{f.q}</dt>
                <dd className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SiteLayout>
  );
}

function Factor({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <dt className="text-[length:var(--text-card)] leading-snug text-ink">{title}</dt>
      <dd className="mt-3 text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
        {body}
      </dd>
    </div>
  );
}
