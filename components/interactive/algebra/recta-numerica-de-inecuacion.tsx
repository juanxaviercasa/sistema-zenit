"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const OPERADORES = ["<", "≤", "=", "≥", ">"] as const;

function invertir(op: (typeof OPERADORES)[number]): (typeof OPERADORES)[number] {
  if (op === "<") return ">";
  if (op === ">") return "<";
  if (op === "≤") return "≥";
  if (op === "≥") return "≤";
  return "=";
}

export function RectaNumericaDeInecuacion() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(-4);
  const [opIndice, setOpIndice] = useState(0);

  const aReal = a === 0 ? 1 : a;
  const op = OPERADORES[opIndice];
  const boundary = -b / aReal;
  const opResuelto = aReal < 0 ? invertir(op) : op;

  const escalaMin = Math.min(boundary - 5, -5);
  const escalaMax = Math.max(boundary + 5, 5);
  const x = (v: number) => 20 + ((v - escalaMin) / (escalaMax - escalaMin)) * 360;

  const cerrado = opResuelto === "≤" || opResuelto === "≥" || opResuelto === "=";
  const haciaLaDerecha = opResuelto === ">" || opResuelto === "≥";

  return (
    <FiguraInteractiva
      titulo="Inecuación de primer grado en la recta numérica"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            {aReal}x {b >= 0 ? "+" : "−"} {Math.abs(b)} {op} 0
          </p>
          <p className="text-center font-mono text-sm text-slate-500">
            x {opResuelto} {boundary.toFixed(2)}
            {aReal < 0 && op !== "=" && " (se invierte el signo: se dividió entre un número negativo)"}
          </p>

          <svg viewBox="0 0 400 60" className="w-full">
            <line x1="20" y1="30" x2="380" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
            {[-10, -5, 0, 5, 10].map((v) => (
              <g key={v}>
                <line x1={x(v)} y1="24" x2={x(v)} y2="36" stroke="#cbd5e1" strokeWidth="1" />
                <text x={x(v)} y="52" textAnchor="middle" className="fill-slate-400 text-[10px]">
                  {v}
                </text>
              </g>
            ))}
            {opResuelto !== "=" && (
              <line
                x1={haciaLaDerecha ? x(boundary) : x(escalaMin)}
                y1="30"
                x2={haciaLaDerecha ? x(escalaMax) : x(boundary)}
                y2="30"
                stroke="#3b82f6"
                strokeWidth="4"
              />
            )}
            <circle
              cx={x(boundary)}
              cy="30"
              r="5"
              fill={cerrado ? "#3b82f6" : "white"}
              stroke="#3b82f6"
              strokeWidth="2"
            />
          </svg>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={-5} max={5} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={-10} max={10} onChange={setB} />
            <ControlDeslizante
              etiqueta="Relación"
              valor={opIndice}
              min={0}
              max={OPERADORES.length - 1}
              onChange={setOpIndice}
              formato={() => op}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Ecuación / inecuación" valor={`${aReal}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)} ${op} 0`} />
          <EstadisticaFila label="Punto frontera" valor={boundary.toFixed(2)} />
          <EstadisticaFila label="Solución" valor={`x ${opResuelto} ${boundary.toFixed(2)}`} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Círculo relleno: el punto frontera pertenece a la solución (≤, ≥ o =). Círculo vacío:
            no pertenece (&lt; o &gt;).
          </p>
        </div>
      }
      instrucciones="Ajusta a, b y la relación para ver cómo se resuelve la ecuación o inecuación y su solución en la recta numérica."
    />
  );
}
