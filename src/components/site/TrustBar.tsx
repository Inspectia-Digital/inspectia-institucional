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
        <p className="text-center text-xs md:text-sm text-slate-500">
          Confían en nosotros
        </p>

        <div className="mt-8 rounded-3xl bg-white/95 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)] px-4 md:px-8 py-6 md:py-8">
          <div
            className="group relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <div className="flex w-max items-center gap-14 md:gap-20 animate-marquee group-hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((p, i) => (
                <img
                  key={`${p.name}-${i}`}
                  src={p.url}
                  alt={p.name}
                  loading="lazy"
                  className="h-10 md:h-14 w-auto object-contain shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
