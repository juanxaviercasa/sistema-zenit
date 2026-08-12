"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const OPERADORES = ["<", "≤", ">", "≥"] as const;

function fmt(x: number): string {
  return Number.isInteger(x) ? x.toString() : x.toFixed(2);
}

export function InecuacionCuadratica() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-1);
  const [c, setC] = useState(-6);
  const [opIndice, setOpIndice] = useState(0);

  const aReal = a === 0 ? 1 : a;
  const op = OPERADORES[opIndice];
  const disc = b * b - 4 * aReal * c;

  let descripcion: string;
  if (disc < 0) {
    const siempre = aReal > 0 ? (op === "<" || op === "≤" ? false : true) : op === "<" || op === "≤" ? true : false;
    descripcion = siempre
      ? "Se cumple para todo x ∈ R (la parábola no cruza el eje x, y su signo coincide con el pedido)"
      : "No tiene solución (la parábola no cruza el eje x, y su signo nunca coincide con el pedido)";
  } else {
    const x1 = Math.min((-b + Math.sqrt(disc)) / (2 * aReal), (-b - Math.sqrt(disc)) / (2 * aReal));
    const x2 = Math.max((-b + Math.sqrt(disc)) / (2 * aReal), (-b - Math.sqrt(disc)) / (2 * aReal));
    const entreLasRaices = aReal > 0 ? op === "<" || op === "≤" : op === ">" || op === "≥";
    const incluyeExtremos = op === "≤" || op === "≥";
    if (disc === 0) {
      descripcion =
        op === "≥" || op === "≤"
          ? `Se cumple para todo x ∈ R${op === "≤" ? ` (con igualdad solo en x=${fmt(x1)})` : ""}`
          : op === ">"
            ? `x ≠ ${fmt(x1)}`
            : "No tiene solución (nunca es estrictamente menor que 0)";
    } else {
      descripcion = entreLasRaices
        ? `${fmt(x1)} ${incluyeExtremos ? "≤" : "<"} x ${incluyeExtremos ? "≤" : "<"} ${fmt(x2)}`
        : `x ${incluyeExtremos ? "≤" : "<"} ${fmt(x1)} o x ${incluyeExtremos ? "≥" : ">"} ${fmt(x2)}`;
    }
  }

  return (
    <FiguraInteractiva
      titulo="Inecuación cuadrática: signo de la parábola"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            {aReal}x² {b >= 0 ? "+" : "−"} {Math.abs(b)}x {c >= 0 ? "+" : "−"} {Math.abs(c)} {op} 0
          </p>

          <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
            Solución: {descripcion}
          </div>

          <div className="flex flex-col gap-1 font-mono text-xs text-slate-500">
            <p>Δ = {fmt(disc)}</p>
            <p>
              La parábola abre hacia {aReal > 0 ? "arriba" : "abajo"} (signo de a).
              {disc > 0 && " Entre las raíces, el signo es opuesto al de a; fuera, coincide con a."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={-5} max={5} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={-10} max={10} onChange={setB} />
            <ControlDeslizante etiqueta="c" valor={c} min={-10} max={10} onChange={setC} />
          </div>
          <ControlDeslizante
            etiqueta="Relación"
            valor={opIndice}
            min={0}
            max={OPERADORES.length - 1}
            onChange={setOpIndice}
            formato={() => op}
          />
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Discriminante" valor={fmt(disc)} />
          <EstadisticaFila label="Solución" valor={descripcion} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El método de los puntos críticos: se ubican las raíces en la recta, y el signo se
            alterna entre las regiones que forman.
          </p>
        </div>
      }
      instrucciones="Ajusta a, b, c y la relación para ver cómo cambia la solución de la inecuación cuadrática."
    />
  );
}
