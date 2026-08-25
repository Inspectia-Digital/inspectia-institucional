import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/legales")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones · InspectIA" },
      // Las páginas legales no aportan a la búsqueda y compiten con las que sí.
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout bottomCta={false}>
      <PageHero title="Términos y condiciones" cta={false} />
      {/* TODO(equipo): el texto lo redacta legales, no desarrollo. */}
    </SiteLayout>
  );
}
