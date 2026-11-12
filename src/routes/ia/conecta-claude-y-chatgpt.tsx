import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FeatureHero } from "@/components/site/FeatureHero";
import {
  ARROW_LINK,
  Band,
  Close,
  Crumbs,
  Faq,
  SectionBlock,
  Steps,
} from "@/components/site/featureSections";
import { MCP } from "@/content/mcp";
import { breadcrumbJsonLd, faqJsonLd, pageHead, serviceJsonLd, siteTitle } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";
import { useFeatureViewEvent } from "@/lib/useViewEvents";

/**
 * El conector MCP: InspectIA adentro de Claude y de ChatGPT.
 *
 * **Ruta estática bajo `/ia/`, y es a propósito.** `/ia/$aplicacion` ya sirve ese espacio,
 * pero su plantilla es otra —hero oscuro y el formato problema · cómo funciona · qué
 * necesita la planta · qué se mide— porque las aplicaciones de ese catálogo son proyectos
 * de visión que se cotizan. Esto es una página de producto con el diseño de las
 * funcionalidades en versión corta. Una ruta estática le gana a la dinámica en TanStack, y
 * el contenido no entra en `IA_APPLICATIONS`, así que las dos conviven sin pisarse.
 *
 * **Un solo CTA, «Quiero conocerlo».** El conector todavía se habilita cliente por cliente,
 * así que no lleva «Empezar gratis»: mandar a crear una cuenta para usar algo que hay que
 * activar a mano es la forma más rápida de que esa cuenta se dé de baja el mismo día. El
 * origen viaja en la URL de `/contacto`.
 */
export const Route = createFileRoute("/ia/conecta-claude-y-chatgpt")({
  head: () =>
    pageHead({
      title: siteTitle(MCP.seoTitle),
      description: MCP.seoDescription,
      path: MCP.path,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          breadcrumbJsonLd([
            { name: "IA", path: "/ia" },
            { name: MCP.name, path: MCP.path },
          ]),
          /* Sin `module`: el conector no cuelga de un módulo, es transversal. */
          serviceJsonLd({
            name: "conector para asistentes de IA",
            path: MCP.path,
            description: MCP.seoDescription,
            features: MCP.does.map((d) => d.title),
          }),
          faqJsonLd([...MCP.faq]),
        ],
      },
    }),
  component: McpPage,
});

function McpPage() {
  /* La misma vista que miden las once páginas de funcionalidad. El conector no cuelga de
     un módulo, pero para el informe es una página de funcionalidad más: sin esto era la
     única de las doce que no aparecía en ningún lado. */
  useFeatureViewEvent("conecta-claude-y-chatgpt");

  return (
    <SiteLayout bottomCta={false} requestOrigin={MCP.origin}>
      <FeatureHero
        eyebrow={MCP.eyebrow}
        title={MCP.h1}
        lead={MCP.lead}
        panel={MCP.heroPanel}
        requestOrigin={MCP.origin}
        secondary={{ label: "Ver cómo funciona", hash: "como-funciona" }}
      />

      <Crumbs trail={[{ label: "IA", to: "/ia" }]} name={MCP.name} />

      <SectionBlock
        id="como-funciona"
        eyebrow="Cómo funciona"
        title="Tu planta, en la conversación"
      >
        <Steps items={[...MCP.does]} />
      </SectionBlock>

      <Band
        title={MCP.band.title}
        body={MCP.band.body}
        action={
          <Link
            to="/contacto"
            search={{ origen: MCP.origin }}
            activeOptions={{ exact: true }}
            className={ARROW_LINK}
          >
            {MCP.band.linkLabel}
            <Icon name="arrow-right" />
          </Link>
        }
      />

      <Faq title="Preguntas sobre el conector" items={[...MCP.faq]} />

      <Close title={MCP.cta.title} lead={MCP.cta.lead} requestOrigin={MCP.origin} />
    </SiteLayout>
  );
}
