"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function fmt(x: number): string {
  return Number.isInteger(x) ? x.toString() : x.toFixed(3);
}

export function ResolvedorCuadratica() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);

  const aReal = a === 0 ? 1 : a;
  const disc = b * b - 4 * aReal * c;
  const tieneReales = disc >= 0;
  const x1 = tieneReales ? (-b + Math.sqrt(disc)) / (2 * aReal) : null;
  const x2 = tieneReales ? (-b - Math.sqrt(disc)) / (2 * aReal) : null;
  const reParte = -b / (2 * aReal);
  const imParte = tieneReales ? 0 : Math.sqrt(-disc) / (2 * aReal);

  const escalaMin = -10;
  const escalaMax = 10;
  const px = (v: number) => 20 + ((v - escalaMin) / (escalaMax - escalaMin)) * 360;
  const py = (v: number) => {
    const yMin = -20;
    const yMax = 20;
    const clamped = Math.max(yMin, Math.min(yMax, v));
    return 160 - ((clamped - yMin) / (yMax - yMin)) * 140;
  };
  const puntos = Array.from({ length: 41 }, (_, i) => {
    const x = escalaMin + (i * (escalaMax - escalaMin)) / 40;
    const y = aReal * x * x + b * x + c;
    return `${px(x)},${py(y)}`;
  }).join(" ");

  return (
    <FiguraInteractiva
      titulo="Resolvedor de ecuaciones de segundo grado"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            {aReal}x² {b >= 0 ? "+" : "−"} {Math.abs(b)}x {c >= 0 ? "+" : "−"} {Math.abs(c)} = 0
          </p>

          <svg viewBox="0 0 400 170" className="w-full">
            <line x1="20" y1="160" x2="380" y2="160" stroke="#cbd5e1" strokeWidth="1" />
            <line x1={px(0)} y1="10" x2={px(0)} y2="160" stroke="#cbd5e1" strokeWidth="1" />
            <polyline points={puntos} fill="none" stroke="#3b82f6" strokeWidth="2" />
            {tieneReales && x1 !== null && (
              <circle cx={px(x1)} cy={py(0)} r="4" fill="#059669" />
            )}
            {tieneReales && x2 !== null && x2 !== x1 && (
              <circle cx={px(x2)} cy={py(0)} r="4" fill="#059669" />
            )}
          </svg>

          <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>Δ = b² − 4ac = {fmt(disc)}</p>
            {tieneReales ? (
              <p>
                x₁ = {fmt(x1!)}, x₂ = {fmt(x2!)}
              </p>
            ) : (
              <p>
                x = {fmt(reParte)} ± {fmt(imParte)}i (raíces complejas, Δ&lt;0)
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={-5} max={5} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={-10} max={10} onChange={setB} />
            <ControlDeslizante etiqueta="c" valor={c} min={-10} max={10} onChange={setC} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Discriminante Δ" valor={fmt(disc)} />
          <EstadisticaFila label="Suma x₁+x₂ (−b/a)" valor={fmt(-b / aReal)} />
          <EstadisticaFila label="Producto x₁·x₂ (c/a)" valor={fmt(c / aReal)} />
          {tieneReales && x1 !== null && x2 !== null && (
            <>
              <EstadisticaFila label="Suma real de las raíces" valor={fmt(x1 + x2)} />
              <EstadisticaFila label="Producto real de las raíces" valor={fmt(x1 * x2)} />
            </>
          )}
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El signo de Δ determina cuántas veces la parábola cruza el eje x: dos veces
            (Δ&gt;0), una vez tangente (Δ=0), o ninguna (Δ&lt;0).
          </p>
        </div>
      }
      instrucciones="Ajusta a, b y c para ver las raíces, el discriminante y la gráfica de la parábola."
    />
  );
}
