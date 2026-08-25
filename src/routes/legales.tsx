import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/legales")({
  head: () =>
    pageHead({
      title: "Términos y condiciones · InspectIA",
      description: "Términos y condiciones de InspectIA.",
      path: "/legales",
      // No aportan a la búsqueda y compiten con las páginas que sí.
      noindex: true,
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
