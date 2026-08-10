export function FiguraInteractiva({
  titulo,
  board,
  panel,
  instrucciones,
}: {
  titulo?: string;
  board: React.ReactNode;
  panel: React.ReactNode;
  instrucciones?: string;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border bg-surface">
      {titulo && (
        <p className="border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          {titulo}
        </p>
      )}
      <div className="grid gap-0 sm:grid-cols-[1.15fr_1fr]">
        <div className="border-b border-border p-4 sm:border-b-0 sm:border-r">
          {board}
        </div>
        <div className="p-5">{panel}</div>
      </div>
      {instrucciones && (
        <p className="border-t border-border bg-surface-muted px-5 py-2.5 text-xs text-foreground/60">
          {instrucciones}
        </p>
      )}
    </div>
  );
}

export function EstadisticaFila({
  label,
  valor,
}: {
  label: string;
  valor: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5 text-sm">
      <span className="text-foreground/60">{label}</span>
      <span className="font-mono font-medium">{valor}</span>
    </div>
  );
}
