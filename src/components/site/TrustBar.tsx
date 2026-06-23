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

        <div
          className="group relative mt-8 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max items-center gap-6 md:gap-8 animate-marquee group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="shrink-0 flex items-center justify-center h-20 w-44 md:h-24 md:w-52 rounded-2xl bg-white/95 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.25)] px-5 py-4 transition hover:bg-white hover:shadow-[var(--shadow-glow)]"
              >
                <img
                  src={p.url}
                  alt={p.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
