import { useMemo, useState } from "react";
import { Gauge, Lock, Target } from "lucide-react";
import { SliderRow, KpiCard, fmtMoney, fmtNum } from "./shared";
import { LeadForm } from "./LeadForm";

export function StockCalculator() {
  const [ftesActuales, setFtesActuales] = useState(8);
  const [costoFte, setCostoFte] = useState(1500);
  const [ubicacionesTurno, setUbicacionesTurno] = useState(1200);
  const [precisionActual, setPrecisionActual] = useState(85);
  const [mejoraVelocidad, setMejoraVelocidad] = useState(40);
  const [inversionInicial, setInversionInicial] = useState(3000);
  const [saasMensual, setSaasMensual] = useState(400);
  const [calculosHabilitados, setCalculosHabilitados] = useState(false);

  const m = useMemo(() => {
    const precisionLograda = 99.9;
    const incrementoPrecision = precisionLograda - precisionActual;
    const ubicacionesProyectadas = Math.round(
      ubicacionesTurno * (1 + mejoraVelocidad / 100),
    );
    const ftesAhorrados = ftesActuales * (mejoraVelocidad / 100);
    const ahorroLaboralAnual = ftesAhorrados * costoFte * 13;
    const costoSaasAnual = saasMensual * 12;
    const ahorroNetoAnual = ahorroLaboralAnual - costoSaasAnual;
    const roi =
      inversionInicial > 0
        ? ((ahorroNetoAnual - inversionInicial) / inversionInicial) * 100
        : 0;
    const paybackMeses =
      ahorroNetoAnual > 0
        ? Math.max(1, Math.ceil(inversionInicial / (ahorroNetoAnual / 12)))
        : null;
    return {
      precisionLograda,
      incrementoPrecision,
      ubicacionesProyectadas,
      ftesAhorrados,
      ahorroLaboralAnual,
      costoSaasAnual,
      ahorroNetoAnual,
      roi,
      paybackMeses,
    };
  }, [
    ftesActuales,
    costoFte,
    ubicacionesTurno,
    precisionActual,
    mejoraVelocidad,
    inversionInicial,
    saasMensual,
  ]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8">
        {/* LEFT: Controls */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-lg font-bold text-white mb-2">
            Parámetros de tu operación de picking
          </h3>
          <SliderRow
            label="FTEs actuales en control manual/picking"
            value={ftesActuales}
            min={1}
            max={100}
            onChange={setFtesActuales}
            suffix="FTE"
          />
          <SliderRow
            label="Costo Mensual por FTE"
            value={costoFte}
            min={500}
            max={5000}
            step={50}
            onChange={setCostoFte}
            suffix="USD"
          />
          <SliderRow
            label="Ubicaciones controladas por turno (manual)"
            value={ubicacionesTurno}
            min={100}
            max={10000}
            step={100}
            onChange={setUbicacionesTurno}
            suffix="ubic."
          />
          <SliderRow
            label="Precisión de Stock Actual"
            value={precisionActual}
            min={50}
            max={99}
            onChange={setPrecisionActual}
            suffix="%"
          />
          <SliderRow
            label="Mejora de Velocidad con App InspectIA"
            value={mejoraVelocidad}
            min={10}
            max={100}
            step={5}
            onChange={setMejoraVelocidad}
            suffix="%"
          />
          <SliderRow
            label="Inversión Inicial (Setup e Integración WMS)"
            value={inversionInicial}
            min={500}
            max={20000}
            step={100}
            onChange={setInversionInicial}
            suffix="USD"
          />
          <SliderRow
            label="Costo Mensual SaaS (Licencias App)"
            value={saasMensual}
            min={50}
            max={2000}
            step={50}
            onChange={setSaasMensual}
            suffix="USD"
          />
        </div>

        {/* RIGHT: Results */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative">
          <h3 className="text-lg font-bold text-white mb-6">
            Impacto de la App de Control de Stock
          </h3>

          <div className="relative">
            <div
              className={`space-y-6 transition ${
                calculosHabilitados ? "" : "blur-sm opacity-60 select-none"
              }`}
            >
              {/* Bloque A: Impacto Operativo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#041A1B] border border-[#17ccd3]/30 rounded-2xl p-5">
                  <div className="rounded-xl bg-[#17ccd3]/10 border border-[#17ccd3]/30 p-2 w-fit">
                    <Target className="h-5 w-5 text-[#17ccd3]" />
                  </div>
                  <p className="mt-3 text-base font-bold text-white">
                    Precisión Elevada al 99.9%
                  </p>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Eliminación del descuadre de inventario. Mejora del{" "}
                    <span className="font-mono text-[#17ccd3]">
                      {calculosHabilitados
                        ? `${m.incrementoPrecision.toFixed(1)}%`
                        : "--"}
                    </span>
                    .
                  </p>
                </div>

                <div className="bg-[#041A1B] border border-[#17ccd3]/30 rounded-2xl p-5">
                  <div className="rounded-xl bg-[#17ccd3]/10 border border-[#17ccd3]/30 p-2 w-fit">
                    <Gauge className="h-5 w-5 text-[#17ccd3]" />
                  </div>
                  <p className="mt-3 text-base font-bold text-white">
                    Velocidad de Auditoría
                  </p>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    De{" "}
                    <span className="font-mono text-white">
                      {fmtNum(ubicacionesTurno)}
                    </span>{" "}
                    a{" "}
                    <span className="font-mono text-[#17ccd3]">
                      {calculosHabilitados
                        ? fmtNum(m.ubicacionesProyectadas)
                        : "--"}
                    </span>{" "}
                    ubicaciones por turno.
                  </p>
                </div>
              </div>

              {/* Bloque B: Impacto Financiero */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <KpiCard
                  label="Ahorro Laboral Neto Anual"
                  value={
                    calculosHabilitados ? fmtMoney(m.ahorroNetoAnual) : "---"
                  }
                />
                <KpiCard
                  label="Tiempo de Repago"
                  value={
                    calculosHabilitados
                      ? m.paybackMeses
                        ? `${m.paybackMeses} meses`
                        : "—"
                      : "---"
                  }
                />
                <KpiCard
                  label="ROI Operativo"
                  value={
                    calculosHabilitados ? `${Math.round(m.roi)}%` : "---"
                  }
                />
              </div>

              {/* Insight dinámico */}
              <div className="bg-[#17ccd3]/5 border border-[#17ccd3]/20 rounded-xl p-4 text-sm text-slate-300 leading-relaxed">
                Al aumentar su velocidad un{" "}
                <strong className="text-white">{mejoraVelocidad}%</strong>,
                InspectIA OS le permite reasignar el equivalente a{" "}
                <strong className="text-[#17ccd3]">
                  {calculosHabilitados ? m.ftesAhorrados.toFixed(1) : "--"}{" "}
                  operarios
                </strong>{" "}
                hacia tareas de valor agregado, sin incrementar su nómina.
              </div>
            </div>

            {!calculosHabilitados && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setCalculosHabilitados(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-4 px-8 shadow-[0_0_40px_rgba(23,204,211,0.5)] hover:bg-[#17ccd3]/90 transition"
                >
                  <Lock className="h-4 w-4" />
                  Calcular Impacto de App
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LeadForm
        title="Descargá el Caso de Uso Logístico"
        ctaLabel="Descargar Caso de Uso Logístico en PDF"
      />
    </div>
  );
}
