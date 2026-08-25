import { useMemo, useState } from "react";
import { Lock } from "lucide-react";
import { SliderRow, BreakdownRow, fmtMoney, fmtNum } from "./shared";
import { LeadForm } from "./LeadForm";

const fmtPct = (n: number) => {
  const decimals = n < 0.1 ? 3 : n < 1 ? 2 : n < 10 ? 1 : 0;
  return `${n.toFixed(decimals)}%`;
};

export function TymeoCalculator() {
  const [volumenMensual, setVolumenMensual] = useState(9000);
  const [costoUnitario, setCostoUnitario] = useState(50);
  const [mejoraEsperada, setMejoraEsperada] = useState(0.2);
  const saasMensual = 250;
  const [calculosHabilitados, setCalculosHabilitados] = useState(false);

  const { porcentajesMejora, escenariosVolumen, matriz, costoAnualInspectIA } = useMemo(() => {
    const costoAnualInspectIA = saasMensual * 12;
    const porcentajesMejora = [
      mejoraEsperada * 0.25,
      mejoraEsperada * 0.5,
      mejoraEsperada,
      mejoraEsperada * 2,
      mejoraEsperada * 4,
    ];
    const escenariosVolumen = [0.8, 0.9, 1.0, 1.1, 1.2].map((f) => Math.round(volumenMensual * f));
    const matriz = escenariosVolumen.map((vol) =>
      porcentajesMejora.map((mejora) => {
        const ahorroAnual = vol * 12 * costoUnitario * (mejora / 100);
        return ((ahorroAnual - costoAnualInspectIA) / costoAnualInspectIA) * 100;
      }),
    );
    return {
      porcentajesMejora,
      escenariosVolumen,
      matriz,
      costoAnualInspectIA,
    };
  }, [volumenMensual, costoUnitario, mejoraEsperada, saasMensual]);

  const roiColor = (roi: number) => {
    if (roi < 0) return "text-red-400";
    if (roi < 100) return "text-yellow-400";
    return "text-[#17ccd3] font-bold";
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8">
        {/* LEFT: Controls */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-5">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-white">Parámetros de tu línea de producción</h3>
            <p className="text-xs text-slate-400 mt-1">
              Cálculo unitario por 1 línea de producción.
            </p>
          </div>
          <SliderRow
            label="Volumen de Producción Mensual"
            value={volumenMensual}
            min={1000}
            max={200000}
            step={1000}
            onChange={setVolumenMensual}
            suffix="u/mes"
          />
          <SliderRow
            label="Costo de Producción por Unidad"
            value={costoUnitario}
            min={1}
            max={1000}
            onChange={setCostoUnitario}
            suffix="USD"
          />
          <SliderRow
            label="Mejora de OEE Esperada"
            value={mejoraEsperada}
            min={0.05}
            max={5}
            step={0.05}
            onChange={setMejoraEsperada}
            suffix="%"
          />
          <div className="rounded-2xl border border-white/10 bg-[#041A1B]/60 p-4 text-xs text-slate-400">
            Costo fijo de InspectIA OS: <span className="font-mono text-[#17ccd3]">USD 250</span>{" "}
            por línea / mes.
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative">
          <h3 className="text-lg font-bold text-white">
            Matriz de Retorno de Inversión (1er Año, por línea)
          </h3>
          <p className="text-sm text-slate-400 mt-1 mb-6">
            Proyección del % de ROI según la mejora de OEE y el volumen mensual de la línea.
          </p>

          <div className="relative">
            <div
              className={`transition ${
                calculosHabilitados ? "" : "blur-sm opacity-60 select-none"
              }`}
            >
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 text-xs uppercase tracking-wider">
                      <th className="text-left font-medium px-3 py-3 border-b border-white/10">
                        Volumen / Mejora
                      </th>
                      {porcentajesMejora.map((p, i) => (
                        <th
                          key={i}
                          className={`text-right font-medium px-3 py-3 border-b border-white/10 ${
                            i === 2 ? "bg-white/5 border-b-2 border-[#17ccd3] text-[#17ccd3]" : ""
                          }`}
                        >
                          {fmtPct(p)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {escenariosVolumen.map((vol, rowIdx) => {
                      const isCenterRow = rowIdx === 2;
                      return (
                        <tr
                          key={rowIdx}
                          className={isCenterRow ? "bg-white/5 border-l-2 border-[#17ccd3]" : ""}
                        >
                          <td className="px-3 py-3 text-slate-300 whitespace-nowrap border-b border-white/5">
                            <span className="font-mono text-white">{fmtNum(vol)}</span> u/mes
                          </td>
                          {matriz[rowIdx].map((roi, colIdx) => {
                            const isCenterCol = colIdx === 2;
                            const highlight =
                              isCenterRow && isCenterCol
                                ? "ring-1 ring-inset ring-[#17ccd3]/50"
                                : isCenterCol
                                  ? "bg-white/5"
                                  : "";
                            return (
                              <td
                                key={colIdx}
                                className={`px-3 py-3 text-right font-mono border-b border-white/5 ${roiColor(roi)} ${highlight}`}
                              >
                                {Math.round(roi)}%
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {!calculosHabilitados && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setCalculosHabilitados(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-4 px-8 shadow-[0_0_40px_rgba(23,204,211,0.5)] hover:bg-[#17ccd3]/90 transition"
                >
                  <Lock className="h-4 w-4" />
                  Calcular Matriz de ROI
                </button>
              </div>
            )}
          </div>

          {calculosHabilitados && (
            <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Bases del cálculo
              </h4>
              <BreakdownRow
                label="Costo anual InspectIA por línea"
                value={fmtMoney(costoAnualInspectIA)}
              />
              <BreakdownRow
                label="Volumen anual base por línea"
                value={`${fmtNum(volumenMensual * 12)} u/año`}
              />
              <BreakdownRow label="Mejora de OEE ingresada" value={fmtPct(mejoraEsperada)} />
            </div>
          )}
        </div>
      </div>

      <LeadForm
        title="Descargá tu Matriz de Sensibilidad OEE"
        ctaLabel="Descargar Matriz y Reporte de OEE en PDF"
      />
    </div>
  );
}
