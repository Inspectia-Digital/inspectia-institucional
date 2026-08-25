type Cell = "yes" | "addon" | "no" | string;

const PLAN_COLS = ["Free", "Start", "Pro", "Enterprise"] as const;

const MODULES: { name: string; desc: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  {
    name: "Líneas, estaciones y máquinas",
    desc: "Mapeá tu planta y cada puesto de trabajo.",
    cells: ["yes", "yes", "yes", "yes"],
  },
  {
    name: "Turnos, paradas y alertas",
    desc: "Detectá cortes de producción al instante.",
    cells: ["yes", "yes", "yes", "yes"],
  },
  {
    name: "Dashboard",
    desc: "Cómo viene tu planta, sin abrir una planilla.",
    cells: ["yes", "yes", "yes", "yes"],
  },
  {
    name: "Personas / RRHH",
    desc: "Registro de tu personal: quién trabaja dónde.",
    cells: ["addon", "yes", "yes", "yes"],
  },
  {
    name: "Planificación",
    desc: "Programá qué se fabrica, y tu maestro de productos.",
    cells: ["addon", "yes", "yes", "yes"],
  },
  {
    name: "Pantalla de piso (TV)",
    desc: "El estado de la línea, visible para todo el equipo.",
    cells: ["no", "yes", "yes", "yes"],
  },
  {
    name: "Roles, auditoría y marca propia",
    desc: "Accesos por persona, historial de cambios, tu logo.",
    cells: ["no", "yes", "yes", "yes"],
  },
  {
    name: "Condiciones y energía",
    desc: "Temperatura, humedad y consumo eléctrico.",
    cells: ["no", "addon", "yes", "yes"],
  },
  {
    name: "Mantenimiento predictivo",
    desc: "Sabé qué máquina lo necesita, antes de que falle.",
    cells: ["no", "addon", "yes", "yes"],
  },
  {
    name: "Lotes y caducidades",
    desc: "Trazabilidad: qué salió junto, y cuándo vence.",
    cells: ["no", "addon", "yes", "yes"],
  },
  {
    name: "Recepción de materia prima",
    desc: "Controlá qué insumos entran a planta.",
    cells: ["no", "addon", "yes", "yes"],
  },
  {
    name: "Integraciones con otros sistemas",
    desc: "Conectá TYMEO con lo que ya usás.",
    cells: ["no", "no", "Hasta 3", "A medida"],
  },
];

function CellChip({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#17ccd3]/15 text-[#17ccd3] text-xs font-bold">
        ✓
      </span>
    );
  if (value === "addon")
    return (
      <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200">
        Add-on
      </span>
    );
  if (value === "no") return <span className="text-slate-600">—</span>;
  return (
    <span className="inline-flex items-center rounded-md bg-[#17ccd3]/10 px-2 py-1 text-[11px] font-mono font-semibold text-[#17ccd3]">
      {value}
    </span>
  );
}

export function ModulesTable() {
  return (
    <section id="modulos" className="py-20 md:py-24 scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
          Módulo por módulo
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
          Qué hace cada cosa, en criollo
        </h2>
        <p className="mt-4 text-slate-400">
          Sin jerga de sistema — esto es lo que cada módulo te resuelve en el día a día de la
          planta.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#084749]/30 backdrop-blur-xl">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#020d0e]/60">
              <th className="px-5 py-4 text-left font-semibold text-white">Módulo</th>
              {PLAN_COLS.map((p) => (
                <th key={p} className="px-5 py-4 text-center font-semibold text-white">
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODULES.map((m) => (
              <tr
                key={m.name}
                className="border-t border-white/10 hover:bg-[#17ccd3]/5 transition-colors"
              >
                <td className="px-5 py-4">
                  <span className="font-semibold text-white">{m.name}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{m.desc}</span>
                </td>
                {m.cells.map((c, i) => (
                  <td key={i} className="px-5 py-4 text-center">
                    <CellChip value={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-2">
          <CellChip value="yes" /> Incluido
        </span>
        <span className="inline-flex items-center gap-2">
          <CellChip value="addon" /> Se contrata aparte, sin cambiar de plan
        </span>
        <span className="inline-flex items-center gap-2">
          <CellChip value="no" /> No disponible en este plan
        </span>
      </div>
    </section>
  );
}
