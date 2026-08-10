/**
 * El tablero JSXGraph y su panel de datos son, a propósito, un "instrumento"
 * de tema fijo claro (como los applets de GeoGebra o el panel de resultados
 * de Symbolab) — no siguen el modo claro/oscuro del sitio. Los números y la
 * gráfica necesitan el mismo contraste alto siempre; por eso usa una paleta
 * slate/blue fija (no los tokens --color-* del tema) en vez de heredarlo.
 */
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
    <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
      {titulo && (
        <p className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {titulo}
        </p>
      )}
      <div className="grid gap-0 sm:grid-cols-[1.15fr_1fr]">
        <div className="border-b border-slate-200 bg-white p-4 sm:border-b-0 sm:border-r">
          {board}
        </div>
        <div className="bg-white p-5 text-slate-900">{panel}</div>
      </div>
      {instrucciones && (
        <p className="border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-xs text-slate-500">
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
    <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-2 text-sm last:border-b-0">
      <span className="text-slate-500">{label}</span>
      <span className="font-mono font-semibold tabular-nums text-slate-900">{valor}</span>
    </div>
  );
}

export function PanelEtiqueta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
      {children}
    </p>
  );
}

export function PanelValor({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 font-display text-2xl font-semibold text-blue-600">
      {children}
    </p>
  );
}
