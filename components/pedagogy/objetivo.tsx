export function Objetivo({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-xl border border-gold-500/30 bg-gold-500/[0.06] px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        Objetivo de aprendizaje
      </p>
      <div className="mt-1.5 text-foreground/90 [&>p]:my-0">{children}</div>
    </div>
  );
}
