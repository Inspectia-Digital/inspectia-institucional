import { FadeInSection } from "@/components/tymeo/FadeInSection";
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
        <BottomCta />
      </FadeInSection>
    </div>
  );
}
