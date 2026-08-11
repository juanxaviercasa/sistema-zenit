/**
 * Slider reutilizable para los widgets de Aritmética — mismo lenguaje visual
 * "instrumento fijo" (slate/blue) que FiguraInteractiva, pero sin depender de
 * JSXGraph: estos widgets manipulan números, no construcciones euclidianas.
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

export function mcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}
