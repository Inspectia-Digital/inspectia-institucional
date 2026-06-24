import { useMemo, useState } from "react";
import { Sparkles, Lock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { LeadForm } from "./LeadForm";

type SliderRowProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  suffix?: string;
  format?: (v: number) => string;
};

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix,
  format,
}: SliderRowProps) {
  const decimals = step < 1 ? Math.max(0, -Math.floor(Math.log10(step))) : 0;
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const inputDisplay = format
    ? format(value).replace(/[^0-9.\-]/g, "")
    : value.toFixed(decimals);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm text-slate-300">{label}</label>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={inputDisplay}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "" || raw === "-") return;
              const n = Number(raw);
              if (!Number.isNaN(n)) onChange(clamp(n));
            }}
            onBlur={(e) => {
              const n = Number(e.target.value);
              if (Number.isNaN(n)) onChange(min);
              else onChange(clamp(n));
            }}
            className="w-24 bg-[#041A1B] border border-white/10 rounded-md px-2 py-1 text-right font-mono text-[#17ccd3] text-sm focus:border-[#17ccd3] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {suffix && (
            <span className="text-xs text-slate-500 w-8">{suffix}</span>
          )}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="[&_[role=slider]]:bg-[#17ccd3] [&_[role=slider]]:border-[#17ccd3] [&_[data-orientation=horizontal]>span]:bg-[#17ccd3] [&>span:first-child]:bg-white/10"
      />
    </div>
  );
}


const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const fmtNum = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

export function CalidadCalculator() {
  const [cantidadLineas, setCantidadLineas] = useState(2);
  const [unidadesXhora, setUnidadesXhora] = useState(50);
  const [horasXdia, setHorasXdia] = useState(16);
  const [costoScrap, setCostoScrap] = useState(5);
  const [rendimientoActual, setRendimientoActual] = useState(90);
  const [rendimientoEsperado, setRendimientoEsperado] = useState(99.5);
  const [personasDedicadas, setPersonasDedicadas] = useState(4);
  const [costoXpersona, setCostoXpersona] = useState(1500);
  const [costoImplementacion, setCostoImplementacion] = useState(15000);
  const [calculosHabilitados, setCalculosHabilitados] = useState(false);

  // Cross rule: esperado siempre > actual
  const handleActual = (v: number) => {
    setRendimientoActual(v);
    if (v >= rendimientoEsperado) {
      setRendimientoEsperado(Math.min(100, v + 0.1));
    }
  };
  const handleEsperado = (v: number) => {
    setRendimientoEsperado(v);
    if (v <= rendimientoActual) {
      setRendimientoActual(Math.max(50, v - 0.1));
    }
  };

  const metrics = useMemo(() => {
    const unidadesAnuales =
      cantidadLineas * unidadesXhora * horasXdia * 360;
    const scrapActual = unidadesAnuales * (1 - rendimientoActual / 100);
    const scrapEsperado = unidadesAnuales * (1 - rendimientoEsperado / 100);
    const ahorroXScrap = (scrapActual - scrapEsperado) * costoScrap;
    const ahorroLaboral = personasDedicadas * costoXpersona * 13;
    const ahorroTotal = ahorroXScrap + ahorroLaboral;
    const costoTotalProyecto = costoImplementacion * cantidadLineas;
    const paybackRaw =
      ahorroTotal > 0 ? costoTotalProyecto / (ahorroTotal / 12) : 999;
    const paybackMeses = Math.max(1, Math.ceil(paybackRaw));
    const roi =
      costoTotalProyecto > 0
        ? ((ahorroTotal - costoTotalProyecto) / costoTotalProyecto) * 100
        : 0;
    return {
      unidadesAnuales,
      scrapActual,
      scrapEsperado,
      ahorroXScrap,
      ahorroLaboral,
      ahorroTotal,
      costoTotalProyecto,
      paybackMeses,
      roi,
    };
  }, [
    cantidadLineas,
    unidadesXhora,
    horasXdia,
    costoScrap,
    rendimientoActual,
    rendimientoEsperado,
    personasDedicadas,
    costoXpersona,
    costoImplementacion,
  ]);

  const showAlert =
    calculosHabilitados && metrics.paybackMeses < 6 && metrics.roi > 300;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8">
        {/* LEFT: Controls */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-lg font-bold text-white mb-2">
            Parámetros de tu operación
          </h3>
          <SliderRow
            label="Cantidad de Líneas"
            value={cantidadLineas}
            min={1}
            max={20}
            onChange={setCantidadLineas}
          />
          <SliderRow
            label="Unidades por Hora"
            value={unidadesXhora}
            min={10}
            max={5000}
            onChange={setUnidadesXhora}
            suffix="u/h"
          />
          <SliderRow
            label="Horas de Operación por Día"
            value={horasXdia}
            min={1}
            max={24}
            onChange={setHorasXdia}
            suffix="h"
          />
          <SliderRow
            label="Costo Unitario de Scrap"
            value={costoScrap}
            min={0.1}
            max={500}
            step={0.1}
            onChange={setCostoScrap}
            suffix="USD"
          />
          <SliderRow
            label="Rendimiento Actual"
            value={rendimientoActual}
            min={50}
            max={99.9}
            step={0.1}
            onChange={handleActual}
            suffix="%"
          />
          <SliderRow
            label="Rendimiento Esperado"
            value={rendimientoEsperado}
            min={50}
            max={100}
            step={0.1}
            onChange={handleEsperado}
            suffix="%"
          />
          <SliderRow
            label="FTE (Personas dedicadas a calidad visual)"
            value={personasDedicadas}
            min={0}
            max={50}
            onChange={setPersonasDedicadas}
          />
          <SliderRow
            label="Costo Mensual por Persona"
            value={costoXpersona}
            min={100}
            max={5000}
            onChange={setCostoXpersona}
            suffix="USD"
          />
          <SliderRow
            label="Costo de Implementación por línea"
            value={costoImplementacion}
            min={1000}
            max={50000}
            step={500}
            onChange={setCostoImplementacion}
            suffix="USD"
          />
        </div>

        {/* RIGHT: Results */}
        <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative">
          {showAlert && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#17ccd3] bg-gradient-to-r from-[#17ccd3]/20 to-emerald-400/10 p-4">
              <Sparkles className="h-5 w-5 text-[#17ccd3] shrink-0 mt-0.5" />
              <p className="text-sm text-white">
                <strong>¡Impacto Financiero Crítico Detectado!</strong> Su
                operación califica para un despliegue prioritario de InspectIA
                OS por repago acelerado.
              </p>
            </div>
          )}

          <h3 className="text-lg font-bold text-white mb-6">
            Resultados de la simulación
          </h3>

          <div className="relative">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition ${
                calculosHabilitados ? "" : "blur-sm opacity-60 select-none"
              }`}
            >
              <KpiCard
                label="Ahorro Anual Proyectado"
                value={
                  calculosHabilitados ? fmtMoney(metrics.ahorroTotal) : "---"
                }
              />
              <KpiCard
                label="Tiempo de Repago"
                value={
                  calculosHabilitados
                    ? `${metrics.paybackMeses} meses`
                    : "---"
                }
              />
              <KpiCard
                label="ROI (1er año)"
                value={
                  calculosHabilitados
                    ? `${metrics.roi.toFixed(0)}%`
                    : "---"
                }
              />
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
                label="Unidades anuales producidas"
                value={fmtNum(metrics.unidadesAnuales)}
              />
              <BreakdownRow
                label="Scrap actual (unidades/año)"
                value={fmtNum(metrics.scrapActual)}
              />
              <BreakdownRow
                label="Scrap esperado (unidades/año)"
                value={fmtNum(metrics.scrapEsperado)}
              />
              <BreakdownRow
                label="Ahorro por reducción de scrap"
                value={fmtMoney(metrics.ahorroXScrap)}
              />
              <BreakdownRow
                label="Ahorro laboral anual (13 meses)"
                value={fmtMoney(metrics.ahorroLaboral)}
              />
              <BreakdownRow
                label="Inversión total del proyecto"
                value={fmtMoney(metrics.costoTotalProyecto)}
              />
            </div>
          )}
        </div>
      </div>

      <LeadForm />
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#041A1B] border border-white/10 rounded-2xl p-5">
      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="mt-2 font-mono text-[#17ccd3] text-3xl md:text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}

function BreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-mono text-white">{value}</span>
    </div>
  );
}
