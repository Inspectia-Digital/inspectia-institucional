import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad · InspectIA" },
      // Las páginas legales no aportan a la búsqueda y compiten con las que sí.
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout bottomCta={false}>
      <PageHero title="Política de privacidad" cta={false} />
      {/* TODO(equipo): el texto lo redacta legales, no desarrollo. */}
    </SiteLayout>
  );
}
