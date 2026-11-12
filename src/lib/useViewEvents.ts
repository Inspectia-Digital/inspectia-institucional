import { useEffect } from "react";
import { pushEvent, pushEventOncePerSession } from "@/lib/analytics";

/**
 * `module_view` se dispara al 25% de scroll y no al cargar (§8).
 *
 * El umbral es lo que separa una visita de un rebote: alguien que abre la página de un
 * módulo y se va a los dos segundos no la vio, y contarlo como vista infla el número que
 * después se usa para decidir en qué módulo invertir.
 */
export function useModuleViewEvent(module: string) {
  useEffect(() => {
    let fired = false;

    const check = () => {
      if (fired) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // Una página que entra entera en la pantalla no puede scrollear: ahí la vista
      // cuenta desde el momento en que se abre.
      const depth = scrollable > 0 ? window.scrollY / scrollable : 1;
      if (depth < 0.25) return;
      fired = true;
      pushEventOncePerSession("module_view", { module }, module);
      window.removeEventListener("scroll", check);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [module]);
}

/** Vista de una página de industria. Sin umbral de scroll. */
export function useSolutionViewEvent(params: { industry?: string; use_case?: string }) {
  const { industry, use_case: useCase } = params;
  useEffect(() => {
    pushEvent("solution_view", { industry, use_case: useCase });
  }, [industry, useCase]);
}

/**
 * Vista de una guía, al 25 % de scroll y no al cargar.
 *
 * El umbral es el mismo criterio que la página de módulo y acá pesa más: una guía la abre
 * gente que viene de una búsqueda informativa y rebota a los dos segundos si no era lo que
 * buscaba. Contar esas visitas como lecturas infla el número que después se usa para
 * decidir qué guía escribir.
 */
export function useGuideViewEvent(guide: string) {
  useEffect(() => {
    let fired = false;

    const check = () => {
      if (fired) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? window.scrollY / scrollable : 1;
      if (depth < 0.25) return;
      fired = true;
      pushEventOncePerSession("solution_view", { guide }, `guide:${guide}`);
      window.removeEventListener("scroll", check);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [guide]);
}

/** Vista de una página de funcionalidad. Sin umbral: acá la intención es comercial y
 *  abrirla ya es una señal, al contrario de lo que pasa en una guía. */
export function useFeatureViewEvent(feature: string) {
  useEffect(() => {
    pushEvent("solution_view", { feature });
  }, [feature]);
}
