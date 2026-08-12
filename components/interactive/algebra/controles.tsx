/**
 * Slider reutilizable para los widgets de Álgebra — mismo lenguaje visual
 * "instrumento fijo" (slate/blue) que en Aritmética, pero en su propia carpeta
 * porque los widgets de Álgebra (lógica, conjuntos) no comparten construcciones
 * numéricas con los de Aritmética.
 */
export function ControlDeslizante({
  etiqueta,
  valor,
  min,
  max,
  step = 1,
  onChange,
  formato,
}: {
  etiqueta: string;
  valor: number;
  min: number;
  max: number;
  step?: number;
  onChange: (valor: number) => void;
  formato?: (valor: number) => string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm">
        <span className="text-slate-500">{etiqueta}</span>
        <span className="font-mono font-semibold tabular-nums text-slate-900">
          {formato ? formato(valor) : valor}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-blue-600"
      />
    </label>
  );
}

export function ControlBooleano({
  etiqueta,
  valor,
  onChange,
}: {
  etiqueta: string;
  valor: boolean;
  onChange: (valor: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!valor)}
      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
        valor
          ? "border-blue-200 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-slate-50 text-slate-500"
      }`}
    >
      <span>{etiqueta}</span>
      <span className="font-mono font-semibold">{valor ? "V" : "F"}</span>
    </button>
  );
}
