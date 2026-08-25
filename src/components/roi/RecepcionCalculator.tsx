import { useMemo, useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { SliderRow, KpiCard, BreakdownRow, fmtMoney, fmtNum } from "./shared";
import { LeadForm } from "./LeadForm";

export function RecepcionCalculator() {
  const [volumenDiario, setVolumenDiario] = useState(74000);
  const [valorUnitario, setValorUnitario] = useState(50);
  const [tasaErrorActual, setTasaErrorActual] = useState(2.5);
  const [ftesActuales, setFtesActuales] = useState(24);
  const [costoFte, setCostoFte] = useState(2500);
  const [porcentajeConteo, setPorcentajeConteo] = useState(80);
  const [leadTimeActual, setLeadTimeActual] = useState(48);
  const [lineasInspectia, setLineasInspectia] = useState(4);
  const [ftesInspectia, setFtesInspectia] = useState(15);
  const [inversionInicial, setInversionInicial] = useState(70000);
  const [saasMensual, setSaasMensual] = useState(800);
  const [calculosHabilitados, setCalculosHabilitados] = useState(false);

  // Cross rule: ftesInspectia < ftesActuales
  const handleFtesActuales = (v: number) => {
    setFtesActuales(v);
    if (v <= ftesInspectia) setFtesInspectia(Math.max(1, v - 1));
  };
  const handleFtesInspectia = (v: number) => {
    setFtesInspectia(v);
    if (v >= ftesActuales) setFtesActuales(Math.min(100, v + 1));
  };

  const m = useMemo(() => {
    const volumenAnual = volumenDiario * 360;
    const ahorroLaboralAnual = (ftesActuales - ftesInspectia) * costoFte * 13;
    const ahorroErroresAnual =
      tasaErrorActual > 1 ? volumenAnual * valorUnitario * ((tasaErrorActual - 1) / 100) : 0;
    const ahorroOperativoAnual = ahorroLaboralAnual + ahorroErroresAnual;
    const costoSaasAnual = saasMensual * 12;
    const ahorroNetoAnual = ahorroOperativoAnual - costoSaasAnual;
    const roi =
      inversionInicial > 0 ? ((ahorroNetoAnual - inversionInicial) / inversionInicial) * 100 : 0;
    const paybackMeses =
      ahorroNetoAnual > 0 ? Math.max(1, Math.ceil(inversionInicial / (ahorroNetoAnual / 12))) : 999;
    const leadTimeEsperado = leadTimeActual - leadTimeActual * (porcentajeConteo / 100) * 0.4;
    const wipActual = volumenDiario * valorUnitario * (leadTimeActual / 24);
    const wipProyectado = volumenDiario * valorUnitario * (leadTimeEsperado / 24);
    const capitalLiberado = wipActual - wipProyectado;
    return {
      volumenAnual,
      ahorroLaboralAnual,
      ahorroErroresAnual,
      ahorroOperativoAnual,
      costoSaasAnual,
      ahorroNetoAnual,
      roi,
      paybackMeses,
      leadTimeEsperado,
      wipActual,
      wipProyectado,
      capitalLiberado,
    };
  }, [
    volumenDiario,
    valorUnitario,
    tasaErrorActual,
    ftesActuales,
    ftesInspectia,
    costoFte,
    porcentajeConteo,
    leadTimeActual,
    inversionInicial,
    saasMensual,
  ]);

  const showAlert = calculosHabilitados && m.paybackMeses < 6 && m.roi > 300;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8">
        {/* LEFT: Controls */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-lg font-bold text-white mb-2">
            Parámetros de tu operación logística
          </h3>
          <SliderRow
            label="Volumen Diario de Recepción"
            value={volumenDiario}
            min={1000}
            max={200000}
            step={1000}
            onChange={setVolumenDiario}
            suffix="u/día"
          />
          <SliderRow
            label="Valor Unitario Promedio"
            value={valorUnitario}
            min={1}
            max={1000}
            onChange={setValorUnitario}
            suffix="USD"
          />
          <SliderRow
            label="Tasa de Error Actual en Conteo"
            value={tasaErrorActual}
            min={0.1}
            max={15}
            step={0.1}
            onChange={setTasaErrorActual}
            suffix="%"
          />
          <SliderRow
            label="FTEs Actuales (Personas en muelle)"
            value={ftesActuales}
            min={1}
            max={100}
            onChange={handleFtesActuales}
            suffix="FTE"
          />
          <SliderRow
            label="Costo Mensual por FTE"
            value={costoFte}
            min={500}
            max={5000}
            onChange={setCostoFte}
            suffix="USD"
          />
          <SliderRow
            label="% del Tiempo dedicado a conteo visual"
            value={porcentajeConteo}
            min={10}
            max={100}
            onChange={setPorcentajeConteo}
            suffix="%"
          />
          <SliderRow
            label="Lead Time Actual (Descarga a Stock)"
            value={leadTimeActual}
            min={1}
            max={168}
            onChange={setLeadTimeActual}
            suffix="h"
          />
          <SliderRow
            label="Líneas/Docks con InspectIA"
            value={lineasInspectia}
            min={1}
            max={20}
            onChange={setLineasInspectia}
          />
          <SliderRow
            label="FTEs Operando con InspectIA"
            value={ftesInspectia}
            min={1}
            max={50}
            onChange={handleFtesInspectia}
            suffix="FTE"
          />
          <SliderRow
            label="Inversión Inicial Total (Hardware/Setup)"
            value={inversionInicial}
            min={5000}
            max={250000}
            step={1000}
            onChange={setInversionInicial}
            suffix="USD"
          />
          <SliderRow
            label="Costo Mensual InspectIA OS (SaaS)"
            value={saasMensual}
            min={200}
            max={10000}
            step={100}
            onChange={setSaasMensual}
            suffix="USD"
          />
        </div>

        {/* RIGHT: Results */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative">
          {showAlert && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#17ccd3] bg-gradient-to-r from-[#17ccd3]/20 to-emerald-400/10 p-4">
              <Sparkles className="h-5 w-5 text-[#17ccd3] shrink-0 mt-0.5" />
              <p className="text-sm text-white">
                <strong>¡Impacto Financiero Crítico Detectado!</strong> Su operación logística
                califica para un despliegue prioritario de InspectIA OS por repago acelerado.
              </p>
            </div>
          )}

          <h3 className="text-lg font-bold text-white mb-6">
            Resultados de la simulación logística
          </h3>

          <div className="relative">
            <div
              className={`space-y-5 transition ${
                calculosHabilitados ? "" : "blur-sm opacity-60 select-none"
              }`}
            >
              {/* Trofeo: Capital Liberado */}
              <div className="rounded-2xl border border-[#17ccd3] bg-gradient-to-br from-[#17ccd3]/15 via-[#084749]/40 to-emerald-400/10 p-6 shadow-[0_0_40px_rgba(23,204,211,0.25)]">
                <p className="text-xs uppercase tracking-wider text-[#17ccd3] font-semibold">
                  💰 Capital de Trabajo Liberado (WIP)
                </p>
                <p className="mt-2 font-mono text-[#17ccd3] text-4xl md:text-5xl font-bold">
                  {calculosHabilitados ? fmtMoney(m.capitalLiberado) : "---"}
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  Capital recuperado por la reducción del Lead Time a{" "}
                  <span className="font-mono text-white">
                    {calculosHabilitados ? m.leadTimeEsperado.toFixed(1) : "--"}
                  </span>{" "}
                  horas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <KpiCard
                  label="Ahorro Anual Neto"
                  value={calculosHabilitados ? fmtMoney(m.ahorroNetoAnual) : "---"}
                />
                <KpiCard
                  label="Tiempo de Repago"
                  value={calculosHabilitados ? `${m.paybackMeses} meses` : "---"}
                />
                <KpiCard
                  label="ROI Operativo"
                  value={calculosHabilitados ? `${m.roi.toFixed(0)}%` : "---"}
                />
              </div>
            </div>

            {!calculosHabilitados && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setCalculosHabilitados(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-4 px-8 shadow-[0_0_40px_rgba(23,204,211,0.5)] hover:bg-[#17ccd3]/90 transition"
                >
                  <Lock className="h-4 w-4" />
                  Calcular mi ROI Operativo
                </button>
              </div>
            )}
          </div>

          {calculosHabilitados && (
            <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Desglose
              </h4>
              <BreakdownRow
                label="Volumen anual recepcionado"
                value={`${fmtNum(m.volumenAnual)} u`}
              />
              <BreakdownRow
                label="Ahorro laboral anual (13 meses)"
                value={fmtMoney(m.ahorroLaboralAnual)}
              />
              <BreakdownRow
                label="Ahorro por reducción de errores"
                value={fmtMoney(m.ahorroErroresAnual)}
              />
              <BreakdownRow
                label="Costo SaaS anual (InspectIA OS)"
                value={fmtMoney(m.costoSaasAnual)}
              />
              <BreakdownRow
                label="WIP actual (capital inmovilizado)"
                value={fmtMoney(m.wipActual)}
              />
              <BreakdownRow
                label="WIP proyectado con InspectIA"
                value={fmtMoney(m.wipProyectado)}
              />
              <BreakdownRow
                label="Lead Time esperado"
                value={`${m.leadTimeEsperado.toFixed(1)} h`}
              />
              <BreakdownRow
                label="Inversión inicial del proyecto"
                value={fmtMoney(inversionInicial)}
              />
            </div>
          )}
        </div>
      </div>

      <LeadForm
        title="Descargá tu Reporte Logístico personalizado"
        ctaLabel="Descargar Reporte Logístico en PDF"
      />
    </div>
  );
}
