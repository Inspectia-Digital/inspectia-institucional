import { CalendarCheck, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// TODO: reemplazar con el link real de Google Calendar Appointments
const GCAL_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/";

const COUNTRIES = [
  { code: "+54", label: "🇦🇷 Argentina (+54)" },
  { code: "+55", label: "🇧🇷 Brasil (+55)" },
  { code: "+56", label: "🇨🇱 Chile (+56)" },
  { code: "+57", label: "🇨🇴 Colombia (+57)" },
  { code: "+52", label: "🇲🇽 México (+52)" },
  { code: "+51", label: "🇵🇪 Perú (+51)" },
  { code: "+598", label: "🇺🇾 Uruguay (+598)" },
  { code: "+58", label: "🇻🇪 Venezuela (+58)" },
  { code: "+1", label: "🇺🇸 USA (+1)" },
  { code: "+34", label: "🇪🇸 España (+34)" },
  { code: "+39", label: "🇮🇹 Italia (+39)" },
  { code: "+49", label: "🇩🇪 Alemania (+49)" },
  { code: "+33", label: "🇫🇷 Francia (+33)" },
  { code: "+44", label: "🇬🇧 UK (+44)" },
  { code: "+86", label: "🇨🇳 China (+86)" },
];

const ROLES = ["Director de Planta", "Gerente de Calidad", "Logística", "Inversor", "Otro"];

const schema = z.object({
  nombre: z.string().trim().min(3, "Mínimo 3 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  telefono: z
    .string()
    .trim()
    .regex(/^[0-9\s-]{6,20}$/, "Teléfono inválido"),
  cargo: z.string().min(1, "Seleccioná un cargo"),
});

type FormData = z.infer<typeof schema>;

type LeadFormProps = {
  title?: string;
  ctaLabel?: string;
};

export function LeadForm({
  title = "Descargá el reporte financiero completo",
  ctaLabel = "Descargar Reporte Financiero Completo en PDF",
}: LeadFormProps = {}) {
  const [country, setCountry] = useState("+54");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { cargo: "" },
  });

  const cargo = watch("cargo");

  const onSubmit = async (data: FormData) => {
    const payload = { ...data, telefono: `${country} ${data.telefono}` };
    console.log("Lead submitted", payload);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Reporte enviado — revise su correo en los próximos minutos.");
    reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8"
      >
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-slate-400 mt-1 mb-6">
          Generamos un PDF personalizado con tu simulación, escenarios y un plan de despliegue
          sugerido.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-300 mb-1 block">Nombre completo</label>
            <Input
              {...register("nombre")}
              placeholder="Ej. Juan Pérez"
              className="bg-[#041A1B] border-white/10 text-white placeholder:text-slate-500"
            />
            {errors.nombre && <p className="text-xs text-red-400 mt-1">{errors.nombre.message}</p>}
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">Email corporativo</label>
            <Input
              type="email"
              {...register("email")}
              placeholder="juan@empresa.com"
              className="bg-[#041A1B] border-white/10 text-white placeholder:text-slate-500"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">Teléfono</label>
            <div className="flex gap-2">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-[110px] bg-[#041A1B] border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#084749] border-white/10 text-white max-h-60">
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                {...register("telefono")}
                placeholder="11 2345 6789"
                className="flex-1 bg-[#041A1B] border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            {errors.telefono && (
              <p className="text-xs text-red-400 mt-1">{errors.telefono.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">Cargo</label>
            <Select
              value={cargo}
              onValueChange={(v) => setValue("cargo", v, { shouldValidate: true })}
            >
              <SelectTrigger className="bg-[#041A1B] border-white/10 text-white">
                <SelectValue placeholder="Seleccioná tu cargo" />
              </SelectTrigger>
              <SelectContent className="bg-[#084749] border-white/10 text-white">
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.cargo && <p className="text-xs text-red-400 mt-1">{errors.cargo.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-6 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : ctaLabel}
        </button>
      </form>

      {/* CTA Demo */}
      <aside className="bg-[#084749]/60 backdrop-blur-xl border border-[#17ccd3]/30 rounded-3xl p-6 flex flex-col justify-between gap-6">
        <div>
          <div className="rounded-2xl bg-[#17ccd3]/10 border border-[#17ccd3]/30 p-3 w-fit">
            <CalendarCheck className="h-6 w-6 text-[#17ccd3]" />
          </div>
          <h3 className="text-xl font-bold text-white mt-4">Hablá con un especialista</h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Reservá una demo personalizada de 30 min con nuestro equipo y validá tu caso con un
            experto en automatización industrial.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li className="flex items-start gap-2">
              <span className="text-[#17ccd3]">✓</span> Demo en vivo del módulo
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#17ccd3]">✓</span> Revisión de tu ROI estimado
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#17ccd3]">✓</span> Plan de despliegue sugerido
            </li>
          </ul>
        </div>

        <a
          href={GCAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17ccd3] text-[#041A1B] font-bold py-3 px-5 shadow-[0_0_30px_rgba(23,204,211,0.4)] hover:bg-[#17ccd3]/90 transition"
        >
          Agendar Demo por Calendar
          <ExternalLink className="h-4 w-4" />
        </a>
      </aside>
    </div>
  );
}
