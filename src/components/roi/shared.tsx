import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

export type SliderRowProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  suffix?: string;
};

export function SliderRow({ label, value, min, max, step = 1, onChange, suffix }: SliderRowProps) {
  const decimals = step < 1 ? Math.max(0, -Math.floor(Math.log10(step))) : 0;
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const [inputDisplay, setInputDisplay] = useState(value.toFixed(decimals));

  useEffect(() => {
    setInputDisplay(value.toFixed(decimals));
  }, [value, decimals]);

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
              setInputDisplay(raw);
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
          {suffix && <span className="text-xs text-slate-500 w-12">{suffix}</span>}
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

export function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#041A1B] border border-white/10 rounded-2xl p-5">
      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="mt-2 font-mono text-[#17ccd3] text-3xl md:text-4xl font-bold">{value}</p>
    </div>
  );
}

export function BreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-mono text-white">{value}</span>
    </div>
  );
}

export const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtNum = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
