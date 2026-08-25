import type { ModuleKey } from "./modules";

/**
 * Soluciones: la industria es la unidad de entrada y el caso de uso el filtro que la
 * cruza. Acá vuelven a existir manufactura y logística, ahora como agrupación de
 * industrias y no como dos productos separados (§7.5).
 *
 * Regla de contenido: ninguna página se publica sin al menos **un problema y un dato
 * propios de esa industria**. Las que no los tienen quedan con `published: false` y no
 * entran ni al menú ni al sitemap. Se lanza con tres.
 */

export type Industry = {
  slug: string;
  name: string;
  /** El dolor propio de esa industria, en una línea. */
  pain: string;
  /** Los módulos que aplican, ordenados por impacto. */
  modules: ModuleKey[];
  published: boolean;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "autopartista",
    name: "Autopartista y metalmecánica",
    pain: "Una pieza que sale mal llega al cliente y vuelve con penalización.",
    modules: ["control-de-calidad", "tymeo", "control-de-pedidos"],
    published: true,
  },
  {
    slug: "alimentos",
    name: "Alimentos y bebidas",
    pain: "La merma y las caducidades se descubren cuando el lote ya salió.",
    modules: ["tymeo", "control-de-calidad", "recepcion"],
    published: true,
  },
  {
    slug: "logistica",
    name: "Logística y centros de distribución",
    pain: "El sistema dice una cosa y el rack dice otra.",
    modules: ["recepcion", "stock-en-posiciones", "sobrestock-drones", "control-de-pedidos"],
    published: true,
  },
  // Las cuatro que siguen entran cuando haya un problema y un número propios.
  {
    slug: "textil",
    name: "Textil y moda",
    pain: "",
    modules: ["control-de-calidad", "tymeo"],
    published: false,
  },
  {
    slug: "farmaceutica",
    name: "Farmacéutica",
    pain: "",
    modules: ["control-de-calidad", "tymeo", "camaras-inteligentes"],
    published: false,
  },
  {
    slug: "cosmetica",
    name: "Cosmética",
    pain: "",
    modules: ["control-de-calidad", "tymeo"],
    published: false,
  },
  {
    slug: "maquinarias",
    name: "Maquinarias e insumos industriales",
    pain: "",
    modules: ["tymeo", "control-de-pedidos"],
    published: false,
  },
];

export type UseCase = {
  slug: string;
  /** El dolor en primera persona, como lo dice el cliente. Es el titular de la card. */
  pain: string;
  name: string;
  modules: ModuleKey[];
};

/**
 * Los cinco casos de uso cruzan industrias y son los que van a rankear: la gente busca
 * el problema, no el producto.
 */
export const USE_CASES: UseCase[] = [
  {
    slug: "scrap",
    name: "Reducir scrap y retrabajo",
    pain: "Me entero del defecto cuando el lote ya salió",
    modules: ["control-de-calidad"],
  },
  {
    slug: "paradas",
    name: "Reducir paradas de máquina",
    pain: "No sé qué máquina me frena",
    modules: ["tymeo"],
  },
  {
    slug: "inventario-descuadrado",
    name: "Inventario que no cuadra",
    pain: "El sistema dice que está y en el rack no está",
    modules: ["stock-en-posiciones", "sobrestock-drones"],
  },
  {
    slug: "recepcion",
    name: "Acelerar la recepción",
    pain: "El camión espera y la planilla se llena a mano",
    modules: ["recepcion"],
  },
  {
    slug: "accidentes",
    name: "Prevenir accidentes",
    pain: "Me entero del incidente por el parte del día siguiente",
    modules: ["camaras-inteligentes"],
  },
];

export const publishedIndustries = () => INDUSTRIES.filter((i) => i.published);
