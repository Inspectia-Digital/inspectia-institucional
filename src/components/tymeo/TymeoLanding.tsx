import { FadeInSection } from "./FadeInSection";
import { Hero } from "./Hero";
import { IntegrationsBar } from "./IntegrationsBar";
import { ZigZag } from "./ZigZag";
import { Pricing } from "./Pricing";
import { RoiTtv } from "./RoiTtv";
import { BottomCta } from "./BottomCta";

export function TymeoLanding() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <IntegrationsBar />
      </FadeInSection>
      <ZigZag />
      <FadeInSection>
        <Pricing />
      </FadeInSection>
      <FadeInSection>
        <RoiTtv />
      </FadeInSection>
      <FadeInSection>
        <BottomCta />
      </FadeInSection>
    </div>
  );
}
