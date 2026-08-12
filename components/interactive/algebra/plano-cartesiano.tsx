function construirSegmentos(
  fn: (x: number) => number | null,
  xMin: number,
  xMax: number,
  muestras: number,
  saltoMax: number
) {
  const segmentos: { x: number; y: number }[][] = [];
  let actual: { x: number; y: number }[] = [];
  let anterior: number | null = null;
  for (let i = 0; i <= muestras; i++) {
    const x = xMin + (i * (xMax - xMin)) / muestras;
    const y = fn(x);
    if (y === null || !Number.isFinite(y)) {
      if (actual.length > 1) segmentos.push(actual);
      actual = [];
      anterior = null;
      continue;
    }
    if (anterior !== null && Math.abs(y - anterior) > saltoMax) {
      if (actual.length > 1) segmentos.push(actual);
      actual = [{ x, y }];
    } else {
      actual.push({ x, y });
    }
    anterior = y;
  }
  if (actual.length > 1) segmentos.push(actual);
  return segmentos;
}

export function PlanoCartesiano({
  funciones,
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  puntos = [],
  tamano = 380,
}: {
  funciones: { fn: (x: number) => number | null; color: string; discontinua?: boolean }[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  puntos?: { x: number; y: number; color?: string }[];
  tamano?: number;
}) {
  const pad = 20;
  const w = tamano - 2 * pad;
  const X = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * w;
  const Y = (y: number) => pad + ((yMax - y) / (yMax - yMin)) * w;
  const saltoMax = (yMax - yMin) * 0.35;

  return (
    <svg viewBox={`0 0 ${tamano} ${tamano}`} className="w-full">
      <rect x={pad} y={pad} width={w} height={w} fill="white" stroke="#cbd5e1" strokeWidth="1" />
      <line x1={pad} y1={Y(0)} x2={pad + w} y2={Y(0)} stroke="#94a3b8" strokeWidth="1" />
      <line x1={X(0)} y1={pad} x2={X(0)} y2={pad + w} stroke="#94a3b8" strokeWidth="1" />
      {funciones.map((f, i) =>
        construirSegmentos(f.fn, xMin, xMax, f.discontinua ? 600 : 200, saltoMax).map((seg, j) => (
          <polyline
            key={`${i}-${j}`}
            points={seg.map((p) => `${X(p.x)},${Y(p.y)}`).join(" ")}
            fill="none"
            stroke={f.color}
            strokeWidth="2"
          />
        ))
      )}
      {puntos.map((p, i) => (
        <circle key={i} cx={X(p.x)} cy={Y(p.y)} r="4" fill={p.color || "#059669"} />
      ))}
    </svg>
  );
}
