import antea from "@/assets/partners/Antea_Group.asset.json";
import auren from "@/assets/partners/auren.asset.json";
import balluff from "@/assets/partners/balluff_png.asset.json";
import bps from "@/assets/partners/bps.asset.json";
import cygnus from "@/assets/partners/cygnus.asset.json";
import emprelatam from "@/assets/partners/emprelatam.asset.json";
import lasMarias from "@/assets/partners/establecimiento-las-marias.asset.json";
import google from "@/assets/partners/google-for-startups.asset.json";
import arnx from "@/assets/partners/logo-arnx.asset.json";
import miebach from "@/assets/partners/miebach_logo.asset.json";
import molensGreenmills from "@/assets/partners/molens-greenmills.asset.json";
import motorola from "@/assets/partners/motorola.asset.json";
import quantit from "@/assets/partners/quantitdata_logo.asset.json";
import sitecno from "@/assets/partners/sitecno_sa_logo.asset.json";
import springwall from "@/assets/partners/springwall.asset.json";
import tecnologiaBi from "@/assets/partners/tecnologia-bi.asset.json";

const partners = [
  { name: "Google for Startups", url: google.url },
  { name: "Emprelatam", url: emprelatam.url },
  { name: "ARNx", url: arnx.url },
  { name: "Miebach", url: miebach.url },
  { name: "Auren", url: auren.url },
  { name: "Antea Group", url: antea.url },
  { name: "Balluff", url: balluff.url },
  { name: "Cygnus", url: cygnus.url },
  { name: "BPS", url: bps.url },
  { name: "Tecnología BI", url: tecnologiaBi.url },
  { name: "Quantit", url: quantit.url },
  { name: "Motorola", url: motorola.url },
  { name: "Sitecno", url: sitecno.url },
  { name: "Springwall", url: springwall.url },
  { name: "Establecimiento Las Marías", url: lasMarias.url },
  { name: "Molens · Green Mills", url: molensGreenmills.url },
];

export function TrustBar() {
  return (
    <section
      aria-label="Empresas y organizaciones que confían en InspectIA"
      className="px-4 pt-12 pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm md:text-base text-muted-foreground">
          Confían en nosotros
        </p>

        <div
          className="group relative mt-10 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max items-center gap-12 md:gap-16 animate-marquee group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((p, i) => (
              <img
                key={`${p.name}-${i}`}
                src={p.url}
                alt={p.name}
                loading="lazy"
                className="h-8 md:h-10 w-auto object-contain shrink-0 [filter:brightness(0)_invert(1)] opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
