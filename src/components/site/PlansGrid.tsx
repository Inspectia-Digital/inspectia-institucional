import { useEffect, useRef, useState } from "react";
import { ADDON_PRICE_USD, TYMEO_PLANS, type Plan } from "@/content/pricing";
import { DEMO_URL, SIGNUP_URL } from "@/content/site";
import { pushEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

/**
 * Grilla de planes y add-ons (§11.9).
 *
 * El material de referencia de la marca está sobre fondo oscuro con verde menta y Space
 * Grotesk. **La estructura se toma tal cual; la piel no**: acá va sobre blanco, en
 * Poppins, con el teal del sistema, y el ámbar reservado para los add-ons.
 *
 * El plan recomendado se marca sólo con un pill sobre el borde superior y el borde en
 * teal. Sin glow, sin degradado y sin card más grande que las otras: agrandar una card
 * rompe la comparación, que es justamente para lo que sirve una tabla de planes.
 */
export function PlansGrid() {
  return (
    <ul className="grid gap-5 min-[720px]:grid-cols-2 min-[1100px]:grid-cols-4">
      {TYMEO_PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </ul>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const [selected, setSelected] = useState<string[]>([]);
  const total = plan.base === null ? null : plan.base + selected.length * ADDON_PRICE_USD;

  const toggle = (addon: string) =>
    setSelected((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon],
    );

  const href = plan.id === "free" ? SIGNUP_URL : DEMO_URL;
  const external = plan.id !== "free";

  return (
    <li
      className={cn(
        "relative flex min-w-0 flex-col rounded-[var(--radius-lg)] border bg-surface p-6",
        plan.highlight ? "border-line-brand" : "border-line",
      )}
    >
      {plan.tag && (
        <span className="absolute -top-3 left-6 inline-flex h-6 items-center rounded-[var(--radius-pill)] bg-action px-3 text-xs font-medium text-white">
          {plan.tag}
        </span>
      )}

      <h3 className="text-[length:var(--text-card)] leading-snug text-ink">{plan.name}</h3>
      <p className="mt-2 text-[13px] leading-snug text-ink-secondary">{plan.desc}</p>

      <div className="mt-6">
        <PriceLabel total={total} />
        <p className="mt-1 text-xs text-ink-secondary">{plan.priceNote}</p>
      </div>

      <ul className="mt-6 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[13px] leading-snug text-ink-secondary">
            {/* Punto verde para lo incluido. El guión de "no disponible" y el pill ámbar de
                add-on son otros dos significados y no se mezclan con este icono. */}
            <span
              aria-hidden
              className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--status-ok)]"
            />
            <span className="min-w-0">{f}</span>
          </li>
        ))}
      </ul>

      {plan.addons.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-[11.5px] text-ink-muted">
            Sumá lo que necesites. Cada uno agrega USD {ADDON_PRICE_USD} por mes.
          </p>
          <ul className="mt-3 space-y-2.5">
            {plan.addons.map((addon) => (
              <li key={addon}>
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selected.includes(addon)}
                    onChange={() => toggle(addon)}
                    className="size-4 shrink-0 rounded-[var(--radius-sm)] accent-[var(--action-primary)]"
                  />
                  <span className="min-w-0 flex-1 text-[13px] text-ink-secondary">{addon}</span>
                  <span className="metric shrink-0 text-[13px] text-[var(--status-warn)]">
                    +USD {ADDON_PRICE_USD}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {plan.addons.length === 0 && plan.id !== "enterprise" && (
        <p className="mt-6 flex items-center gap-2 border-t border-line pt-5 text-[13px] text-ink-muted">
          <Icon name="notIncluded" />
          Sin add-ons: ya vienen todos incluidos.
        </p>
      )}

      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={() =>
          pushEvent("pricing_plan_click", {
            plan: plan.id,
            addons_selected: selected,
            price_shown: total ?? 0,
          })
        }
        className={cn(
          "mt-auto flex h-[52px] items-center justify-center gap-2 rounded-[var(--radius-md)]",
          "px-5 text-[15px] font-semibold transition-colors duration-[160ms] active:translate-y-px",
          plan.highlight
            ? "mt-6 bg-action text-white hover:bg-action-hover"
            : "mt-6 border border-line-brand bg-action-soft text-action-soft-text hover:bg-teal-100",
        )}
      >
        {plan.id === "free" && <Icon name="included" />}
        {plan.cta}
      </a>
    </li>
  );
}

/**
 * El precio cuenta hasta el valor nuevo en vez de saltar (§10.8). Es el único lugar,
 * junto con los contadores, donde el movimiento es expresivo: ver el número subir es lo
 * que hace entender que el add-on tiene un costo.
 */
function PriceLabel({ total }: { total: number | null }) {
  const [shown, setShown] = useState(total ?? 0);
  const from = useRef(total ?? 0);

  useEffect(() => {
    if (total === null) return;
    const start = performance.now();
    const origin = from.current;
    const delta = total - origin;
    if (delta === 0) return;

    let raf = 0;
    const tick = (now: number) => {
      // 600ms es --dur-data, la duración de los valores que cuentan.
      const t = Math.min(1, (now - start) / 600);
      // easeOutCubic: arranca rápido y frena, que es como se lee un número subiendo.
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(origin + delta * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = total;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  if (total === null) {
    return <p className="metric text-[40px] font-light leading-none text-ink">A medida</p>;
  }

  return (
    <p className="metric flex items-baseline gap-1.5 text-[40px] font-light leading-none text-ink">
      {shown === 0 ? (
        "Gratis"
      ) : (
        <>
          <span className="text-[15px] text-ink-secondary">USD</span>
          {shown}
        </>
      )}
    </p>
  );
}
