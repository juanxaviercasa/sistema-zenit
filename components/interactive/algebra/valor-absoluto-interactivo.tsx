"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const MODOS = ["=", "<", "≤", ">", "≥"] as const;

export function ValorAbsolutoInteractivo() {
  const [a, setA] = useState(1);
  const [r, setR] = useState(3);
  const [modoIndice, setModoIndice] = useState(1);
  const modo = MODOS[modoIndice];

  const izq = a - r;
  const der = a + r;

  const escalaMin = Math.min(izq - 4, -8);
  const escalaMax = Math.max(der + 4, 8);
  const x = (v: number) => 20 + ((v - escalaMin) / (escalaMax - escalaMin)) * 360;

  const esIntervalo = modo === "<" || modo === "≤";
  const esRayos = modo === ">" || modo === "≥";
  const cerrado = modo === "≤" || modo === "≥" || modo === "=";

  const solucionTexto =
    r < 0
      ? "sin solución (r es negativo)"
      : modo === "="
        ? `x = ${izq} ó x = ${der}`
        : modo === "<"
          ? `${izq} < x < ${der}`
          : modo === "≤"
            ? `${izq} ≤ x ≤ ${der}`
            : modo === ">"
              ? `x < ${izq} ó x > ${der}`
              : `x ≤ ${izq} ó x ≥ ${der}`;

  return (
    <FiguraInteractiva
      titulo="Ecuaciones e inecuaciones con valor absoluto"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            |x − {a}| {modo} {r}
          </p>
          <p className="text-center font-mono text-sm text-slate-500">{solucionTexto}</p>

          <svg viewBox="0 0 400 60" className="w-full">
            <line x1="20" y1="30" x2="380" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
            {Array.from({ length: 9 }, (_, i) => Math.round(escalaMin + (i * (escalaMax - escalaMin)) / 8)).map(
              (v) => (
                <g key={v}>
                  <line x1={x(v)} y1="24" x2={x(v)} y2="36" stroke="#cbd5e1" strokeWidth="1" />
                  <text x={x(v)} y="52" textAnchor="middle" className="fill-slate-400 text-[10px]">
                    {v}
                  </text>
                </g>
              )
            )}

            {r >= 0 && esIntervalo && (
              <line x1={x(izq)} y1="30" x2={x(der)} y2="30" stroke="#3b82f6" strokeWidth="4" />
            )}
            {r >= 0 && esRayos && (
              <>
                <line x1={x(escalaMin)} y1="30" x2={x(izq)} y2="30" stroke="#3b82f6" strokeWidth="4" />
                <line x1={x(der)} y1="30" x2={x(escalaMax)} y2="30" stroke="#3b82f6" strokeWidth="4" />
              </>
            )}
            {r >= 0 && (
              <>
                <circle cx={x(izq)} cy="30" r="5" fill={cerrado ? "#3b82f6" : "white"} stroke="#3b82f6" strokeWidth="2" />
                <circle cx={x(der)} cy="30" r="5" fill={cerrado ? "#3b82f6" : "white"} stroke="#3b82f6" strokeWidth="2" />
              </>
            )}
          </svg>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a (centro)" valor={a} min={-5} max={5} onChange={setA} />
            <ControlDeslizante etiqueta="r" valor={r} min={-2} max={8} onChange={setR} />
            <ControlDeslizante
              etiqueta="Relación"
              valor={modoIndice}
              min={0}
              max={MODOS.length - 1}
              onChange={setModoIndice}
              formato={() => modo}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Ecuación / inecuación" valor={`|x − ${a}| ${modo} ${r}`} />
          <EstadisticaFila label="a − r" valor={izq} />
          <EstadisticaFila label="a + r" valor={der} />
          <EstadisticaFila label="Solución" valor={solucionTexto} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            |x−a| mide la distancia entre x y a. &quot;Menor que r&quot; da un intervalo (cerca de a);
            &quot;mayor que r&quot; da dos rayos (lejos de a).
          </p>
        </div>
      }
      instrucciones="Ajusta a, r y la relación para ver cómo cambia la solución de |x−a| según la relación con r."
    />
  );
}
