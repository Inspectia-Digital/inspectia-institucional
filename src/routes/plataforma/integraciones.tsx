import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { INTEGRATION_GROUPS } from "@/content/integrations";
import { pageHead } from "@/lib/seo";

const TITLE = "Con qué se conecta la plataforma · InspectIA";
const DESCRIPTION =
  "Qué ERP, WMS, PLC y sensórica soporta InspectIA. Se apoya en lo que la planta ya tiene: no hace falta cambiar el ERP ni las cámaras.";

/**
 * Integraciones (§7.2, punto 4).
 *
 * Sección técnica y aparte del marketplace, a propósito: acá no hay nada que contratar.
 * Un logo de integración no lleva precio ni CTA; si lo llevara, sería un servicio, y el
 * visitante dejaría de entender la diferencia entre "esto lo soportamos" y "esto te lo
 * vendemos" (§11.6).
 */
export const Route = createFileRoute("/plataforma/integraciones")({
  head: () =>
    pageHead({ title: TITLE, description: DESCRIPTION, path: "/plataforma/integraciones" }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Integraciones"
        title="Se apoya en lo que ya tenés"
        lead="El ERP que nadie va a cambiar, el WMS del depósito, el PLC de hace treinta años y las cámaras que ya están puestas. InspectIA los lee y les devuelve lo que la planta produce."
      />

      <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1100px]:py-[var(--section-pad)]">
        <div className="mx-auto max-w-[var(--content-max)]">
          <ul className="grid gap-x-8 gap-y-14 min-[720px]:grid-cols-2">
            {INTEGRATION_GROUPS.map((g) => (
              <li key={g.key} className="min-w-0">
                <h2 className="text-[length:var(--text-card)] leading-snug text-ink">{g.title}</h2>
                <p className="mt-3 max-w-[46ch] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
                  {g.note}
                </p>

                {g.items.length > 0 ? (
                  // Altura óptica homogénea y escala de grises: es una tira de sistemas
                  // soportados, no un muro de sponsors.
                  <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-5">
                    {g.items.map((item) =>
                      item.logo ? (
                        <li key={item.name} className="min-w-0">
                          <img
                            src={item.logo}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="h-7 w-auto opacity-60 grayscale"
                          />
                        </li>
                      ) : (
                        <li
                          key={item.name}
                          // Mientras un logo sea texto y no imagen, va en --grey-600.
                          className="min-w-0 text-[15px] font-medium text-logo"
                        >
                          {item.name}
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  <p className="mt-6 text-[15px] text-ink-muted">
                    Contanos con qué trabajás y lo revisamos con ingeniería.
                  </p>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-16 max-w-[60ch] text-[15px] leading-[var(--leading-normal)] text-ink-secondary">
            ¿No ves el tuyo? La mayoría de las integraciones nuevas salen de un caso concreto.
            Escribinos con qué sistema trabajás.
          </p>

          {/* Un servicio de tercero se contrata con nosotros; una integración no. Por eso
              el enlace al marketplace va acá abajo, separado, y no mezclado arriba. */}
          <Link
            to="/plataforma/marketplace"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
          >
            Ver los servicios del marketplace
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
