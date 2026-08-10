import { Target } from "lucide-react";

export function Objetivo({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 flex gap-4 rounded-2xl border border-gold-500/25 bg-gold-500/[0.07] p-5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
        <Target className="size-4" strokeWidth={2.25} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Objetivo de aprendizaje
        </p>
        <div className="mt-1.5 text-foreground/90 [&>p]:my-0">{children}</div>
      </div>
    </div>
  );
}
