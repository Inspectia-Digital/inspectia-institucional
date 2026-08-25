import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

type Item = { label: string; to: string };

export function RelatedLinks({ title = "Ver también", items }: { title?: string; items: Item[] }) {
  return (
    <section className="py-10 border-t border-white/5">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#17ccd3]">
        {title}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((i) => (
          <Link
            key={i.to + i.label}
            to={i.to}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#084749]/40 px-4 py-2 text-sm font-semibold text-slate-200 hover:text-[#17ccd3] hover:border-[#17ccd3]/40 transition"
          >
            {i.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </section>
  );
}
