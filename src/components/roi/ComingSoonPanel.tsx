import { Construction } from "lucide-react";

export function ComingSoonPanel({ message }: { message: string }) {
  return (
    <div className="bg-[#084749]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center gap-4 min-h-[400px] justify-center">
      <div className="rounded-full bg-[#17ccd3]/10 border border-[#17ccd3]/30 p-5">
        <Construction className="h-10 w-10 text-[#17ccd3]" />
      </div>
      <h3 className="text-2xl font-bold text-white">Próximamente</h3>
      <p className="text-slate-400 max-w-md">{message}</p>
    </div>
  );
}
