import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacidad")({
  head: () =>
    pageHead({
      title: "Política de privacidad · InspectIA",
      description: "Política de privacidad de InspectIA.",
      path: "/privacidad",
      // No aportan a la búsqueda y compiten con las páginas que sí.
      noindex: true,
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
