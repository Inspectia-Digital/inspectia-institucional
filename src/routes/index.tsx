import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { FloorPlan } from "@/components/site/FloorPlan";
import { ModuleGrid } from "@/components/site/ModuleGrid";
import {
  CostOfNotMeasuring,
  Faq,
  HomeRoi,
  HOME_FAQ,
  CommercialStrip,
  StartFree,
} from "@/components/home/sections";
import { faqJsonLd, organizationJsonLd, pageHead } from "@/lib/seo";
import { Icon } from "@/components/icons/Icon";

// 58 caracteres.
const TITLE = "Medí y controlá la operación de tu planta · InspectIA";
// 155 caracteres.
const DESCRIPTION =
  "Producción, calidad, stock, mantenimiento, tareas y energía en un solo sistema. Ves lo que hoy se pierde, entendés por qué y ajustás. Empezá gratis.";

/**
 * Home (§7.1). Una idea por sección, y cada sección con su página de destino: la home
 * muestra la punta, no el contenido.
 */
export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/",
      // Los dos en un solo grafo: Google acepta un @graph con varias entidades y así no
      // hay dos bloques de JSON-LD compitiendo por describir la misma página.
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [organizationJsonLd(), faqJsonLd(HOME_FAQ)],
      },
    }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Orden del rediseño del 20/10: diez bloques, de lo prioritario a lo accesorio.
          Cada uno con una idea y, como mucho, un botón principal. El detalle por módulo,
          las vistas por rol y el texto largo de consultoras viven en páginas internas.

          Lo que salió de la home: las pestañas por audiencia (AudienceTabs) y el teaser
          del marketplace. La línea de seis etapas salió de StartFree a su propia página.
          Lo que queda pendiente está marcado abajo con su número de bloque. */}

      {/* 01 · Encabezado. Blanco, con la vista del producto al costado. */}
      <Hero />

      {/* 02 · Prueba social.

          **Sigue en desplazamiento, y es deliberado.** El boceto pide "una fila, sin
          carrusel", pero eso supone una lista corta de clientes y acá hay diecisiete
          entradas que mezclan clientes, fabricantes, consultoras y programas. En una fila
          estática se desbordan a tres renglones; en una sola fila sin movimiento habría
          que recortar la lista, que es exactamente el cambio que se evaluó el 19/10 y se
          descartó. Hasta que esa decisión se tome, el desplazamiento es lo que deja la
          lista entera en un renglón. */}
      <TrustBar family="todas" marquee />

      {/* 03 · La plataforma: el plano interactivo y las siete tarjetas de módulo. El plano
              se mantiene interactivo por decisión del 20/10: el boceto lo proponía como
              imagen estática y los puntos son trabajo hecho a mano. */}
      <Platform />

      {/* 04 · El problema, en tres columnas de texto suelto. */}
      <CostOfNotMeasuring />

      {/* 05 · La única superficie teal de la página. */}
      <StartFree />

      {/* 06 · La calculadora. */}
      <HomeRoi />

      {/* 07 · Para tu rubro. Pendiente: los rubros son provisorios y faltan las fotos. */}

      {/* 08 · Precio, consultoras y proveedor único, en una franja de tres columnas.
              Reemplaza a PricingTeaser, PartnersBand y ProjectBand, que eran tres
              secciones de pantalla completa diciendo lo mismo. */}
      <CommercialStrip />

      {/* 09 · Formulario. Pendiente. */}

      {/* 10 */}
      <Faq />
    </SiteLayout>
  );
}

/** Bloque 03: el plano interactivo arriba y la grilla de los siete módulos abajo. */
function Platform() {
  return (
    <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8 min-[1000px]:py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--content-max)]">
        {/* El único encabezado centrado de la home, y tiene motivo: abajo va el plano,
            que es una imagen ancha y centrada. Un título pegado al margen izquierdo sobre
            una imagen que ocupa todo el ancho queda flotando, sin nada que lo sostenga.
            El resto de las secciones siguen alineadas a la izquierda, que es lo que hace
            legible un párrafo. */}
        <div className="mx-auto max-w-[var(--lead-max)] text-center">
          <p className="eyebrow">La plataforma</p>
          <h2 className="mt-4 text-[28px] leading-tight text-ink md:text-[var(--text-section)]">
            Una sola plataforma para toda tu operación
          </h2>
          <p className="mt-6 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Contratás sólo los módulos que usás. Los datos se cargan una sola vez, mismos usuarios,
            mismo tablero.
          </p>
        </div>

        {/* El plano no entra en un teléfono. Mide 640px de ancho mínimo porque abajo de
            eso el render isométrico deja de leerse, así que en 375 quedaba un dibujo
            recortado que hay que arrastrar y donde no se distingue nada. La grilla de
            abajo cuenta lo mismo —los siete módulos— y en mobile lo cuenta mejor. */}
        <div className="mt-12 hidden min-[640px]:block">
          <FloorPlan />
        </div>

        <ModuleGrid className="mt-16" />

        <Link
          to="/plataforma"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline hover:underline-offset-4"
        >
          Ver cómo funciona la plataforma
          <Icon name="arrow-right" />
        </Link>
      </div>
    </section>
  );
}
