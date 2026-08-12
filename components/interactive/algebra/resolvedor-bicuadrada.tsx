"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function fmt(x: number): string {
  return Number.isInteger(x) ? x.toString() : x.toFixed(3);
}

export function ResolvedorBicuadrada() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(4);

  const aReal = a === 0 ? 1 : a;
  const disc = b * b - 4 * aReal * c;
  const yTieneReales = disc >= 0;
  const y1 = yTieneReales ? (-b + Math.sqrt(disc)) / (2 * aReal) : null;
  const y2 = yTieneReales ? (-b - Math.sqrt(disc)) / (2 * aReal) : null;

  const raicesDeY = (y: number | null): number[] => {
    if (y === null || y < 0) return [];
    if (y === 0) return [0];
    return [Math.sqrt(y), -Math.sqrt(y)];
  };

  const raicesX = [...raicesDeY(y1), ...raicesDeY(y2)].sort((p, q) => p - q);

  return (
    <FiguraInteractiva
      titulo="Ecuación bicuadrada: ax⁴ + bx² + c = 0"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            {aReal}x⁴ {b >= 0 ? "+" : "−"} {Math.abs(b)}x² {c >= 0 ? "+" : "−"} {Math.abs(c)} = 0
          </p>
          <p className="text-center font-mono text-sm text-slate-500">
            Sustituyendo y = x²: {aReal}y² {b >= 0 ? "+" : "−"} {Math.abs(b)}y {c >= 0 ? "+" : "−"}{" "}
            {Math.abs(c)} = 0
          </p>

          <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>Δ (de la ecuación en y) = {fmt(disc)}</p>
            {yTieneReales ? (
              <p>
                y₁ = {fmt(y1!)}, y₂ = {fmt(y2!)}
              </p>
            ) : (
              <p>No hay soluciones reales para y (Δ&lt;0)</p>
            )}
            <p className="mt-2">
              Raíces reales en x:{" "}
              {raicesX.length > 0
                ? raicesX.map((r) => fmt(r)).join(", ")
                : "ninguna (todas las soluciones de y son negativas)"}
            </p>
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
          <EstadisticaFila label="Δ en y" valor={fmt(disc)} />
          <EstadisticaFila label="y₁" valor={y1 !== null ? fmt(y1) : "—"} />
          <EstadisticaFila label="y₂" valor={y2 !== null ? fmt(y2) : "—"} />
          <EstadisticaFila label="Cantidad de raíces reales en x" valor={raicesX.length} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Cada y≥0 aporta dos raíces reales de x (±√y); cada y&lt;0 no aporta ninguna raíz
            real (aporta un par de raíces complejas).
          </p>
        </div>
      }
      instrucciones="Ajusta a, b y c para ver cómo la sustitución y=x² reduce la bicuadrada a una cuadrática."
    />
  );
}
