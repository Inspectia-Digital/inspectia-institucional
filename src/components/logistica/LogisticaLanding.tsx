import { FadeInSection } from "@/components/tymeo/FadeInSection";
import { Hero } from "./Hero";
import { FlowSpoke } from "./FlowSpoke";
import { DifferentiatorsBento } from "./DifferentiatorsBento";
import { ExpoyerBanner } from "./ExpoyerBanner";
import { BottomCta } from "./BottomCta";

export function LogisticaLanding() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <FlowSpoke />
      </FadeInSection>
      <FadeInSection>
        <DifferentiatorsBento />
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
