import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Linkedin, Check } from "lucide-react";

const PRODUCTOS: Array<{ label: string; to: string }> = [
  { label: "Recepción de Mercadería", to: "/recepcion" },
  { label: "TYMEO OEE", to: "/tymeo" },
  { label: "App de Stock y Picking", to: "/stock-picking" },
  { label: "Drones de Inventario", to: "/drones" },
  { label: "Armado y Despacho", to: "/outbound" },
];

const VERTICALES: Array<{ label: string; to: string }> = [
  { label: "Manufactura", to: "/manufactura" },
  { label: "Logística", to: "/logistica" },
];

const RECURSOS: Array<{ label: string; to?: string }> = [
  { label: "Calcular ROI", to: "/roi" },
  { label: "Casos de Éxito" },
  { label: "Blog Técnico" },
  { label: "Documentación API" },
];

type Status = "idle" | "loading" | "success";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <footer className="bg-[#020d0e] border-t border-white/5 font-[Poppins]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — Marca */}
          <div>
            <span className="text-xl font-bold text-white">
              InspectIA<span className="text-[#17ccd3]">.</span>
            </span>
            <p className="text-xs text-slate-400 max-w-xs mt-3 leading-relaxed">
              InspectIA OS es el sistema operativo de Inteligencia Artificial
              que unifica el rendimiento de planta con la precisión logística
              absoluta. Deep Tech asset-light desarrollado en LATAM.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center mt-5 p-2 rounded-full border border-white/10 text-slate-500 hover:text-[#17ccd3] hover:border-[#17ccd3]/40 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {/* Col 2 — Módulos */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Módulos
            </h4>
            <ul className="space-y-2">
              {PRODUCTOS.map((p) => (
                <li key={p.label}>
                  <Link
                    to={p.to}
                    className="text-sm text-slate-400 hover:text-[#17ccd3] transition-colors duration-200"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mt-6 mb-3">
              Verticales
            </h4>
            <ul className="space-y-2">
              {VERTICALES.map((v) => (
                <li key={v.label}>
                  <Link
                    to={v.to}
                    className="text-sm text-slate-400 hover:text-[#17ccd3] transition-colors duration-200"
                  >
                    {v.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Recursos */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Recursos
            </h4>
            <ul className="space-y-2">
              {RECURSOS.map((r) => (
                <li key={r.label}>
                  {r.to ? (
                    <Link
                      to={r.to}
                      className="text-sm text-slate-400 hover:text-[#17ccd3] transition-colors duration-200"
                    >
                      {r.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-600 cursor-default">
                      {r.label}{" "}
                      <span className="text-[10px] uppercase tracking-wider">
                        (pronto)
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400 mb-3 max-w-xs leading-relaxed">
              Reciba mensualmente análisis técnicos y métricas de impacto de IA
              aplicada a manufactura y supply chain.
            </p>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email corporativo..."
                disabled={status === "loading"}
                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-[#17ccd3] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={status !== "idle"}
                className="inline-flex items-center justify-center gap-2 bg-[#17ccd3] text-[#041A1B] rounded-full px-4 py-2 text-sm font-semibold hover:bg-[#17ccd3]/90 disabled:opacity-60 transition-colors"
              >
                {status === "loading" && "Enviando..."}
                {status === "success" && (
                  <>
                    <Check className="h-4 w-4" /> Suscripto
                  </>
                )}
                {status === "idle" && "Suscribirse"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2026 InspectIA. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs text-slate-600 cursor-default">
              Términos y Condiciones
            </span>
            <span className="text-xs text-slate-600 cursor-default">
              Política de Privacidad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
