import { FadeInSection } from "./FadeInSection";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { Hero } from "./Hero";
import { IntegrationsBar } from "./IntegrationsBar";
import { ZigZag } from "./ZigZag";
import { PlansAddons } from "./PlansAddons";
import { ModulesTable } from "./ModulesTable";
import { Implementation } from "./Implementation";
import { Faq } from "./Faq";
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
        <PlansAddons />
      </FadeInSection>
      <FadeInSection>
        <ModulesTable />
      </FadeInSection>
      <FadeInSection>
        <Implementation />
      </FadeInSection>
      <FadeInSection>
        <Faq />
      </FadeInSection>
      <FadeInSection>
        <RoiTtv />
      </FadeInSection>
      <FadeInSection>
        <RelatedLinks
          items={[
            { label: "Vertical Manufactura", to: "/manufactura" },
            { label: "Calcular ROI", to: "/roi" },
          ]}
        />
      </FadeInSection>
      <FadeInSection>
        <BottomCta />
      </FadeInSection>
    </div>
  );
}
