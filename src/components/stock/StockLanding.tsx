import { FadeInSection } from "@/components/tymeo/FadeInSection";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { Hero } from "./Hero";
import { FeaturesBento } from "./FeaturesBento";
import { PricingPlans } from "./PricingPlans";
import { ImpactBanner } from "./ImpactBanner";
import { BottomCta } from "./BottomCta";

export function StockLanding() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <FeaturesBento />
      </FadeInSection>
      <FadeInSection>
        <PricingPlans />
      </FadeInSection>
      <FadeInSection>
        <ImpactBanner />
      </FadeInSection>
      <FadeInSection>
        <RelatedLinks
          items={[
            { label: "Recepción de Mercadería", to: "/recepcion" },
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
