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

/** Vista de una página de industria o de caso de uso. Sin umbral de scroll. */
export function useSolutionViewEvent(params: { industry?: string; use_case?: string }) {
  const { industry, use_case: useCase } = params;
  useEffect(() => {
    pushEvent("solution_view", { industry, use_case: useCase });
  }, [industry, useCase]);
}
