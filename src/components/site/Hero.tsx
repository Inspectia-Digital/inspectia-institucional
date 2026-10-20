import { Link } from "@tanstack/react-router";
import { MODULE_PRICES } from "@/content/pricing";
import { CtaPair } from "@/components/site/CtaPair";
import { ProductCard } from "@/components/site/ProductCard";

/**
 * Hero de la home (rediseño del 20/10/2026).
 *
 * ## Qué cambió y qué se sostuvo
 *
 * El rediseño lo pasa de **banda teal a sangre** a **fondo blanco con dos columnas**: el
 * texto a la izquierda y una vista del producto a la derecha. La única superficie teal de
 * la página pasa a ser el bloque "Cómo empezar". Es un cambio de criterio, no un ajuste:
 * el teal deja de ser lo primero que se ve y se reserva para el momento de mayor énfasis.
 *
 * Cuatro cosas del encabezado anterior se sostuvieron contra el boceto, por decisión
 * explícita del 20/10:
 *
 * 1. **"Empezar gratis" es el botón destacado**, no "Agendar demo". El boceto proponía lo
 *    inverso. Es la diferencia entre empujar autoservicio o empujar reunión, y el producto
 *    se contrata solo.
 * 2. **"Agendar demo" sigue abriendo el calendario** en pestaña nueva, no bajando a un
 *    formulario. Agregar un paso entre la intención y la reunión cuesta reuniones.
 * 3. **La línea de las máquinas se queda entera**, con "el PLC o un sensor". El boceto la
 *    fundía en el lead y perdía esa parte, que es la concreta y la que el comprador puede
 *    verificar.
 * 4. **El precio sigue a la vista.** Va más liviano que antes —una línea de 14px al pie,
 *    sin filete ni borde superior— para no pelearse con el aire que el rediseño busca,
 *    pero no baja al 80 % de la página.
 *
 * ## Lo que se fue, y por qué
 *
 * El eyebrow de marca y la lista de los siete módulos. Los dos decían lo que el bloque
 * siguiente muestra: la lista de módulos es ahora la grilla de siete tarjetas de "La
 * plataforma", cada una con su nombre y su línea. Repetirlos en el encabezado era el peso
 * que el rediseño viene a sacar.
 */

/**
 * El piso de precio sale de la tabla, no de una constante escrita acá: si mañana baja un
 * módulo, el encabezado lo dice sin que nadie se acuerde de venir a tocarlo.
 */
const DESDE_USD = Math.min(...MODULE_PRICES.map((p) => p.usd));

export function Hero() {
  return (
    <section className="bg-surface px-5 pb-[72px] pt-[96px] md:px-8">
      <div className="mx-auto grid max-w-[var(--content-max)] items-center gap-10 min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] min-[1000px]:gap-14">
        <div className="hero-col min-w-0">
          <h1
            className="text-[length:var(--text-hero)] leading-[var(--leading-hero)] tracking-[var(--tracking-hero)] text-ink"
            style={{ textWrap: "balance" }}
          >
            Medí y controlá toda la operación de tu planta
          </h1>

          <p className="mt-5 max-w-[var(--lead-max)] text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink-secondary">
            Producción, calidad, stock, trazabilidad y tareas en una sola pantalla.
          </p>

          {/* El filete al costado y no un ícono: marca la línea como aparte sin sumar un
              elemento gráfico más a la primera pantalla. */}
          <p className="mt-5 max-w-[var(--lead-max)] border-l-2 border-line-brand pl-4 text-[length:var(--text-lead)] leading-[var(--leading-normal)] text-ink">
            <span className="font-semibold text-brand">Modo manual con formulario</span>, o
            conectamos el PLC o un sensor y obtenemos la información de la línea.
          </p>

          <CtaPair className="mt-8 max-w-md" plan="free" />

          {/* El precio, en cuerpo secundario y sin borde ni filete. Sigue estando en la
              primera pantalla —es ventaja contra quien te hace pedir cotización— pero deja
              de pesar como un bloque propio. */}
          <p className="mt-5 text-[14px] leading-[var(--leading-normal)] text-ink-muted">
            Desde <span className="font-semibold text-ink-secondary">USD {DESDE_USD}</span> por
            módulo, con plan gratuito en cada uno.{" "}
            <Link
              to="/precios"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              Ver precios
            </Link>
          </p>
        </div>

        {/* La vista del producto. En celular no se muestra: a 375px un panel con tres filas
            de datos no se lee, y lo que empuja ahí son el titular y los botones. */}
        <div className="hidden min-[1000px]:block">
          <ProductCard />
        </div>
      </div>
    </section>
  );
}
