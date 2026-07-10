import { FadeInSection } from "@/components/tymeo/FadeInSection";
import { Hero } from "./Hero";
import { ProductionColumns } from "./ProductionColumns";
import { DifferentiatorsBento } from "./DifferentiatorsBento";
import { MagnaBanner } from "./MagnaBanner";
import { BottomCta } from "./BottomCta";

export function ManufacturaLanding() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <ProductionColumns />
      </FadeInSection>
      <FadeInSection>
        <DifferentiatorsBento />
      </FadeInSection>
      <FadeInSection>
        <MagnaBanner />
      </FadeInSection>
      <FadeInSection>
        <BottomCta />
      </FadeInSection>
    </div>
  );
}
