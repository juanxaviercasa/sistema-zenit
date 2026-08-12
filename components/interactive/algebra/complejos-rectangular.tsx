"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";
import { PlanoCartesiano } from "./plano-cartesiano";

const OPERACIONES = ["Suma", "Resta", "Producto", "Cociente"] as const;

function fmt(x: number): string {
  return Number.isInteger(x) ? x.toString() : x.toFixed(3);
}

function complejoTexto(a: number, b: number): string {
  return `${fmt(a)} ${b >= 0 ? "+" : "−"} ${fmt(Math.abs(b))}i`;
}

export function ComplejosRectangular() {
  const [a1, setA1] = useState(3);
  const [b1, setB1] = useState(2);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(-1);
  const [opIndice, setOpIndice] = useState(0);
  const op = OPERACIONES[opIndice];

  let rA: number, rB: number;
  switch (op) {
    case "Suma":
      rA = a1 + a2;
      rB = b1 + b2;
      break;
    case "Resta":
      rA = a1 - a2;
      rB = b1 - b2;
      break;
    case "Producto":
      rA = a1 * a2 - b1 * b2;
      rB = a1 * b2 + a2 * b1;
      break;
    default: {
      const denom = a2 * a2 + b2 * b2;
      rA = denom === 0 ? NaN : (a1 * a2 + b1 * b2) / denom;
      rB = denom === 0 ? NaN : (a2 * b1 - a1 * b2) / denom;
    }
  }

  return (
    <FiguraInteractiva
      titulo="Números complejos: forma rectangular y operaciones"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-sm text-slate-500">
            z₁ = {complejoTexto(a1, b1)}, z₂ = {complejoTexto(a2, b2)}
          </p>
          <p className="text-center font-mono text-lg text-slate-900">
            {op} = {Number.isNaN(rA) ? "no definido" : complejoTexto(rA, rB)}
          </p>

          <PlanoCartesiano
            funciones={[]}
            puntos={[
              { x: a1, y: b1, color: "#3b82f6" },
              { x: a2, y: b2, color: "#f59e0b" },
              { x: rA, y: rB, color: "#059669" },
            ]}
            xMin={-8}
            xMax={8}
            yMin={-8}
            yMax={8}
          />

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a₁ (Re z₁)" valor={a1} min={-6} max={6} onChange={setA1} />
            <ControlDeslizante etiqueta="b₁ (Im z₁)" valor={b1} min={-6} max={6} onChange={setB1} />
            <ControlDeslizante etiqueta="a₂ (Re z₂)" valor={a2} min={-6} max={6} onChange={setA2} />
            <ControlDeslizante etiqueta="b₂ (Im z₂)" valor={b2} min={-6} max={6} onChange={setB2} />
          </div>
          <ControlDeslizante
            etiqueta="Operación"
            valor={opIndice}
            min={0}
            max={OPERACIONES.length - 1}
            onChange={setOpIndice}
            formato={() => op}
          />
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="z₁" valor={complejoTexto(a1, b1)} />
          <EstadisticaFila label="z₂" valor={complejoTexto(a2, b2)} />
          <EstadisticaFila
            label={`z₁ ${op === "Suma" ? "+" : op === "Resta" ? "−" : op === "Producto" ? "×" : "÷"} z₂`}
            valor={Number.isNaN(rA) ? "no definido" : complejoTexto(rA, rB)}
          />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Cada número complejo a+bi se representa como el punto (a,b) en el plano complejo:
            z₁ azul, z₂ naranja, resultado verde.
          </p>
        </div>
      }
      instrucciones="Ajusta z₁, z₂ y la operación para ver el resultado algebraico y su ubicación en el plano complejo."
    />
  );
}
