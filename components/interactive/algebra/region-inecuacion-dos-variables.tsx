"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const OPERADORES = ["<", "≤", ">", "≥"] as const;

const DOM = 10;
const X = (x: number) => 20 + ((x + DOM) / (2 * DOM)) * 340;
const Y = (y: number) => 20 + ((DOM - y) / (2 * DOM)) * 340;

export function RegionInecuacionDosVariables() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [c, setC] = useState(4);
  const [opIndice, setOpIndice] = useState(2);
  const op = OPERADORES[opIndice];

  const aReal = a;
  const bReal = b === 0 && a === 0 ? 1 : b;
  const mag = Math.sqrt(aReal * aReal + bReal * bReal) || 1;

  let punto: [number, number];
  if (bReal !== 0) punto = [0, c / bReal];
  else punto = [c / aReal, 0];

  const dir: [number, number] = [-bReal / mag, aReal / mag];
  const LEN = 60;
  const p1: [number, number] = [punto[0] + LEN * dir[0], punto[1] + LEN * dir[1]];
  const p2: [number, number] = [punto[0] - LEN * dir[0], punto[1] - LEN * dir[1]];

  const satisfaceMayor = op === ">" || op === "≥";
  const sentido = satisfaceMayor ? 1 : -1;
  const normal: [number, number] = [aReal / mag, bReal / mag];
  const q1: [number, number] = [p1[0] + sentido * LEN * normal[0], p1[1] + sentido * LEN * normal[1]];
  const q2: [number, number] = [p2[0] + sentido * LEN * normal[0], p2[1] + sentido * LEN * normal[1]];

  const poligono = [p1, p2, q2, q1].map(([x, y]) => `${X(x)},${Y(y)}`).join(" ");
  const esEstricta = op === "<" || op === ">";

  return (
    <FiguraInteractiva
      titulo="Región solución de una inecuación con dos variables"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            {aReal}x {bReal >= 0 ? "+" : "−"} {Math.abs(bReal)}y {op} {c}
          </p>

          <svg viewBox="0 0 380 380" className="w-full">
            <rect x="20" y="20" width="340" height="340" fill="white" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points={poligono} fill="#3b82f6" fillOpacity="0.3" />
            <line x1="20" y1={Y(0)} x2="360" y2={Y(0)} stroke="#94a3b8" strokeWidth="1" />
            <line x1={X(0)} y1="20" x2={X(0)} y2="360" stroke="#94a3b8" strokeWidth="1" />
            <line
              x1={X(p1[0])}
              y1={Y(p1[1])}
              x2={X(p2[0])}
              y2={Y(p2[1])}
              stroke="#1e293b"
              strokeWidth="2"
              strokeDasharray={esEstricta ? "6 4" : undefined}
            />
          </svg>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={-5} max={5} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={-5} max={5} onChange={setB} />
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
          <EstadisticaFila label="Recta frontera" valor={`${aReal}x + ${bReal}y = ${c}`} />
          <EstadisticaFila label="Tipo de frontera" valor={esEstricta ? "Discontinua (no incluida)" : "Continua (incluida)"} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            La recta ax+by=c divide el plano en dos semiplanos; la región sombreada es la que
            cumple la desigualdad.
          </p>
        </div>
      }
      instrucciones="Ajusta a, b, c y la relación para ver cómo cambia el semiplano solución."
    />
  );
}
