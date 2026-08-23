import { FadeInSection } from "@/components/tymeo/FadeInSection";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { Hero } from "./Hero";
import { FeaturesBento } from "./FeaturesBento";
import { DeploymentPlans } from "./DeploymentPlans";
import { ExpoyerBanner } from "./ExpoyerBanner";
import { BottomCta } from "./BottomCta";

export function RecepcionLanding() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <FeaturesBento />
      </FadeInSection>
      <FadeInSection>
        <DeploymentPlans />
      </FadeInSection>
      <FadeInSection>
        <ExpoyerBanner />
      </FadeInSection>
      <FadeInSection>
        <RelatedLinks
          items={[
            { label: "App de Control de Stock", to: "/stock-picking" },
            { label: "Drones de Inventario", to: "/drones" },
            { label: "Armado y Despacho", to: "/outbound" },
            { label: "Vertical Logística", to: "/logistica" },
          ]}
        />
      </FadeInSection>
      <FadeInSection>
        <BottomCta />
      </FadeInSection>
    </div>
  );
}
