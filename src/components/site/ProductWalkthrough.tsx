import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Truck,
  Package,
  ScanLine,
  HardHat,
  Boxes,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Plane,
  Smartphone,
} from "lucide-react";

type TabKey = "recepcion" | "tymeo" | "calidad" | "seguridad" | "stock";

type ModuleItem = {
  key: TabKey;
  number: string;
  title: string;
  shortTitle: string;
  sub: string;
  body: string;
  mockup: ReactNode;
};

const MODULES: ModuleItem[] = [
  {
    key: "recepcion",
    number: "01",
    title: "Recepción de Mercadería",
    shortTitle: "Recepción",
    sub: "Auditoría automatizada inbound y sincronización con WMS.",
    body: "Software de Recepción. Auditoría automatizada con cámaras e inteligencia artificial de mercadería entrante. Sincronización directa vía API con WMS. Reduce FTEs, disminuye el lead time de recepción y reduce errores de ingreso.",
    mockup: <MockRecepcion />,
  },
  {
    key: "tymeo",
    number: "02",
    title: "TYMEO OEE",
    shortTitle: "TYMEO OEE",
    sub: "Monitoreo óptico e indicadores de líneas de planta en tiempo real.",
    body: "Monitoreo de Productividad y Eficiencia (Suite TYMEO). Dashboards e información de las líneas en tiempo real. Expone cuellos de botella ocultos y minimiza paradas de producción. Implementación 'Asset-Light' récord en menos de 15 días sobre tus cámaras o sensores existentes.",
    mockup: <MockTymeo />,
  },
  {
    key: "calidad",
    number: "03",
    title: "Control de Calidad",
    shortTitle: "Calidad",
    sub: "Inspección continua en alta velocidad con descarte automático al PLC.",
    body: "Control de calidad Automatizada como Servicio (QCaaS). Modelos de IA de Deep Learning propietarios entrenados para detectar fallas en tiempo real. Integración directa en milisegundos al PLC para derivar piezas si corresponde de forma automática. No se cansa, no se distrae, no falla.",
    mockup: <MockCalidad />,
  },
  {
    key: "seguridad",
    number: "04",
    title: "Productividad y Seguridad",
    shortTitle: "Seguridad",
    sub: "Análisis de movimientos industriales y control de EPP en CCTV.",
    body: "Monitoreo de Productividad y Seguridad. Integración de modelos de IA a las cámaras de seguridad existentes en la planta para el seguimiento de los movimientos de la operación, control estricto de EPP, ingreso a zonas restringidas y prevención proactiva de accidentes laborales.",
    mockup: <MockSeguridad />,
  },
  {
    key: "stock",
    number: "05",
    title: "Gestión de Stock y Despachos",
    shortTitle: "Stock",
    sub: "Auditorías por drones autónomos, app móvil y control de armado.",
    body: "Ecosistema de Control de Stock y Pedidos. Combina drones de navegación autónoma (sin GPS) para el control regular de sobrestock en altura que detectan inconsistencias e informan al WMS vía API para corregir, con una aplicación móvil para simplificar el control de stock en posiciones de picking por parte de los operarios. Cierra el flujo en mesas de despacho validando ópticamente el correcto armado de pedidos por cantidad de unidades (Canal Verde para aprobación automática, Canal Rojo para revisión manual).",
    mockup: <MockStock />,
  },
];

export function ProductWalkthrough() {
  const [active, setActive] = useState<TabKey>("recepcion");
  const current = MODULES.find((m) => m.key === active)!;

  return (
    <section className="bg-[#041A1B] font-[Poppins]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Los Productos de InspectIA en Acción
          </h2>
          <p className="mt-3 text-slate-400 text-base md:text-lg">
            Módulos independientes potenciados por Inteligencia Artificial, diseñados para integrarse nativamente a su infraestructura actual sin disrupciones.
          </p>
        </div>

        {/* Mobile tabs */}
        <div
          role="tablist"
          aria-label="Módulos InspectIA OS"
          className="mt-8 flex lg:hidden overflow-x-auto select-none flex-row whitespace-nowrap gap-2 pb-2 -mx-4 px-4"
        >
          {MODULES.map((m) => {
            const isActive = m.key === active;
            return (
              <button
                key={m.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(m.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[#084749] text-white border border-[#17ccd3]"
                    : "text-slate-400 border border-white/10 hover:text-slate-200"
                }`}
              >
                <span className="text-[#17ccd3] font-semibold mr-2">{m.number}</span>
                {m.shortTitle}
              </button>
            );
          })}
        </div>

        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8">
          {/* Desktop vertical tabs */}
          <div
            role="tablist"
            aria-label="Módulos InspectIA OS"
            className="hidden lg:flex flex-col space-y-3"
          >
            {MODULES.map((m) => {
              const isActive = m.key === active;
              return (
                <button
                  key={m.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(m.key)}
                  className={`text-left p-5 rounded-r-2xl border-l-4 transition-all ${
                    isActive
                      ? "bg-[#084749] border-[#17ccd3] text-white"
                      : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
                    <span className="text-[#17ccd3] text-sm font-semibold tracking-wider pt-1">
                      {m.number}
                    </span>
                    <div className="min-w-0">
                      <div
                        className={`text-lg font-bold ${
                          isActive ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {m.title}
                      </div>
                      <div className="text-sm text-slate-400 mt-1 leading-snug">
                        {m.sub}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Showcase */}
          <div
            role="tabpanel"
            className="rounded-3xl bg-[#084749]/20 border border-white/10 overflow-hidden p-6 shadow-2xl min-h-[460px] flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full"
              >
                <div className="flex-1 rounded-2xl bg-[#041A1B] border border-white/5 p-4 relative overflow-hidden min-h-[280px]">
                  {current.mockup}
                </div>
                <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Mockups ---------- */

function MockRecepcion() {
  const lanes = [
    { sku: "SKU-48201", icon: Truck },
    { sku: "SKU-48202", icon: Package },
    { sku: "SKU-48203", icon: Package },
    { sku: "SKU-48204", icon: Truck },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500">
        <span>Dock Control · Inbound</span>
        <span className="text-[#17ccd3]">LIVE</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 flex-1">
        {lanes.map(({ sku, icon: Icon }, i) => (
          <div
            key={sku}
            className="relative rounded-lg bg-white/[0.03] border border-white/5 p-3 flex flex-col items-center justify-center min-h-[90px]"
          >
            <div className="absolute inset-2 rounded-md border border-[#17ccd3]/70" />
            <span className="absolute top-1 left-2 text-[9px] text-[#17ccd3] font-semibold bg-[#041A1B]/80 px-1">
              {sku}
            </span>
            <Icon className="h-8 w-8 text-slate-400" strokeWidth={1.5} />
            <span className="mt-1 text-[10px] text-slate-500">Dock {i + 1}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-md bg-emerald-500/15 border border-emerald-400/30 px-3 py-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-semibold text-emerald-300 tracking-wide">
          SKU VERIFIED — WMS API: CONNECTED
        </span>
      </div>
    </div>
  );
}

function MockTymeo() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500">
        <span>TYMEO · OEE Dashboard</span>
        <span className="text-[#17ccd3]">LIVE</span>
      </div>
      <div className="mt-3 grid grid-cols-[auto_1fr] gap-4 flex-1 items-center">
        {/* Gauge */}
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#17ccd3"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(88.5 / 100) * 264} 264`}
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px #17ccd3)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">88.5%</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">OEE</span>
          </div>
        </div>
        {/* Bars */}
        <div className="space-y-2">
          {[
            { label: "Línea A", val: 92, color: "bg-[#17ccd3]" },
            { label: "Línea B", val: 74, color: "bg-[#17ccd3]/70" },
            { label: "Línea C", val: 61, color: "bg-amber-400/80" },
            { label: "Línea D", val: 88, color: "bg-[#17ccd3]" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 w-12">{b.label}</span>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.val}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 w-8 text-right">{b.val}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-md bg-amber-500/10 border border-amber-400/30 px-3 py-2">
        <Activity className="h-4 w-4 text-amber-300" />
        <span className="text-xs text-amber-200 font-medium">
          Bottleneck detectado · Estación 3 — paradas +12% últimas 2h
        </span>
      </div>
    </div>
  );
}

function MockCalidad() {
  return (
    <div className="h-full flex flex-col">
      <div className="rounded-md bg-emerald-500/15 border border-emerald-400/40 px-3 py-2 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
        <span className="text-xs font-semibold text-emerald-300 tracking-wide">
          PLC SIGNAL: DISCARD EXECUTED — 0% scrap tolerance
        </span>
      </div>
      <div className="mt-3 relative flex-1 rounded-lg bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Scanning lines */}
        <div className="absolute inset-x-0 top-1/4 h-px bg-[#17ccd3]/80" style={{ boxShadow: "0 0 8px #17ccd3" }} />
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#17ccd3]/60" style={{ boxShadow: "0 0 8px #17ccd3" }} />
        <div className="absolute inset-x-0 top-3/4 h-px bg-[#17ccd3]/40" style={{ boxShadow: "0 0 8px #17ccd3" }} />
        {/* Product */}
        <div className="relative">
          <div className="h-24 w-32 rounded-md bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10" />
          <div className="absolute -inset-2 border border-[#17ccd3] rounded-md" />
          <span className="absolute -top-5 left-0 text-[10px] text-[#17ccd3] font-semibold">
            UNIT-#A4821 · scanning…
          </span>
        </div>
        <ScanLine className="absolute bottom-3 right-3 h-5 w-5 text-[#17ccd3]/80" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
        <div className="rounded bg-white/5 border border-white/5 px-2 py-1.5 text-slate-400">
          Speed: <span className="text-white">1240 u/min</span>
        </div>
        <div className="rounded bg-white/5 border border-white/5 px-2 py-1.5 text-slate-400">
          Latency: <span className="text-white">8ms</span>
        </div>
        <div className="rounded bg-white/5 border border-white/5 px-2 py-1.5 text-slate-400">
          Model: <span className="text-white">QC-v4.2</span>
        </div>
      </div>
    </div>
  );
}

function MockSeguridad() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500">
        <span>CCTV · Planta · Cam-07</span>
        <span className="text-[#17ccd3]">LIVE</span>
      </div>
      <div className="mt-3 relative flex-1 rounded-lg bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-white/5 overflow-hidden">
        {/* Heatmap zone */}
        <div
          className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(239,68,68,0.7) 0%, rgba(245,158,11,0.4) 40%, transparent 70%)",
          }}
        />
        {/* Operator */}
        <div className="absolute left-1/3 top-1/4 flex flex-col items-center">
          <HardHat className="h-10 w-10 text-slate-300" strokeWidth={1.5} />
          <div className="absolute -inset-3 border-2 border-emerald-400 rounded-md" />
          <span className="absolute -top-5 left-0 text-[10px] text-emerald-300 font-semibold whitespace-nowrap">
            EPP: OK
          </span>
        </div>
        {/* Restricted zone alert */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 bg-red-500/20 border border-red-400/60 rounded px-2 py-1 animate-pulse">
          <AlertTriangle className="h-3.5 w-3.5 text-red-300" />
          <span className="text-[10px] font-semibold text-red-200">
            Acceso No Autorizado · Zona Restringida
          </span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
        <div className="rounded bg-emerald-500/10 border border-emerald-400/30 px-2 py-1.5 text-emerald-300">
          EPP detectados: 4/4
        </div>
        <div className="rounded bg-white/5 border border-white/5 px-2 py-1.5 text-slate-400">
          Movimientos: <span className="text-white">128/h</span>
        </div>
        <div className="rounded bg-red-500/10 border border-red-400/30 px-2 py-1.5 text-red-300">
          Alertas activas: 1
        </div>
      </div>
    </div>
  );
}

function MockStock() {
  return (
    <div className="h-full flex flex-col">
      <div className="rounded-md bg-emerald-500/15 border border-emerald-400/40 px-3 py-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-emerald-300">
          ● Canal Verde — Aprobación WMS
        </span>
        <span className="text-[10px] text-red-300 flex items-center gap-1">
          ● Canal Rojo · Discrepancia
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 flex-1">
        {/* Drone + racks */}
        <div className="relative rounded-lg bg-white/[0.03] border border-white/5 p-3 overflow-hidden">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
            Dron · Rack A-12
          </span>
          <div className="mt-2 space-y-1.5" style={{ perspective: "200px" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-4 rounded-sm bg-gradient-to-r from-slate-700/60 to-slate-800/60 border border-white/10 flex items-center px-2"
                style={{ transform: `rotateX(15deg) translateZ(${i * 2}px)` }}
              >
                <span className="text-[8px] text-[#17ccd3] font-mono">
                  b64:{["aGVsbG8=", "c3R4PTE=", "cGFsbGV0"][i]}
                </span>
              </div>
            ))}
          </div>
          <Plane className="absolute right-2 top-8 h-5 w-5 text-[#17ccd3] -rotate-12" />
        </div>
        {/* Mobile app */}
        <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
            <Smartphone className="h-3 w-3" /> App Picking
          </div>
          <div className="mt-2 space-y-1.5">
            {[
              { sku: "SKU-1041", qty: "12/12", ok: true },
              { sku: "SKU-1082", qty: "8/8", ok: true },
              { sku: "SKU-1133", qty: "5/6", ok: false },
            ].map((r) => (
              <div
                key={r.sku}
                className="flex items-center justify-between text-[10px] bg-black/30 border border-white/5 rounded px-2 py-1"
              >
                <span className="text-slate-300 font-mono">{r.sku}</span>
                <span className={r.ok ? "text-emerald-300" : "text-red-300"}>{r.qty}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Despacho */}
        <div className="col-span-2 rounded-lg bg-white/[0.03] border border-white/5 p-3 flex items-center gap-3">
          <Boxes className="h-8 w-8 text-[#17ccd3]" strokeWidth={1.5} />
          <div className="flex-1">
            <div className="text-xs text-white font-semibold">Mesa de Despacho · Pedido #88412</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Validación óptica: 24/24 unidades correctas
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2 py-1 rounded">
            APROBADO
          </span>
        </div>
      </div>
    </div>
  );
}
