"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function BotonModo({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${activo ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
    >
      {children}
    </button>
  );
}

export function ReglaDeTres() {
  const [compuesta, setCompuesta] = useState(false);
  const [inversa, setInversa] = useState(false);
  const [a, setA] = useState(6);
  const [b, setB] = useState(30);
  const [c, setC] = useState(9);

  const [m2Directa, setM2Directa] = useState(true);
  const [m2Inicial, setM2Inicial] = useState(4);
  const [m2Final, setM2Final] = useState(6);

  const dSimple = inversa ? (a * b) / c : (b * c) / a;
  const factorM2 = m2Directa ? m2Final / m2Inicial : m2Inicial / m2Final;
  const dCompuesta = dSimple * factorM2;

  return (
    <FiguraInteractiva
      titulo="Regla de tres"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="flex flex-wrap gap-2">
            <BotonModo activo={!compuesta} onClick={() => setCompuesta(false)}>
              Simple
            </BotonModo>
            <BotonModo activo={compuesta} onClick={() => setCompuesta(true)}>
              Compuesta
            </BotonModo>
          </div>

          <div className="rounded-lg bg-slate-50 p-3 text-center font-mono text-sm text-slate-700">
            <p>
              {a} — {b}
            </p>
            <p>
              {c} — <span className="font-semibold text-blue-600">?</span>
            </p>
          </div>

          <div className="flex gap-2 text-xs font-semibold">
            <BotonModo activo={!inversa} onClick={() => setInversa(false)}>
              Magnitud 1: directa
            </BotonModo>
            <BotonModo activo={inversa} onClick={() => setInversa(true)}>
              Magnitud 1: inversa
            </BotonModo>
          </div>

          <div className="space-y-4">
            <ControlDeslizante etiqueta="a" valor={a} min={1} max={30} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={1} max={60} onChange={setB} />
            <ControlDeslizante etiqueta="c" valor={c} min={1} max={30} onChange={setC} />
          </div>

          {compuesta && (
            <div className="space-y-4 border-t border-slate-200 pt-4">
              <div className="flex gap-2 text-xs font-semibold">
                <BotonModo activo={m2Directa} onClick={() => setM2Directa(true)}>
                  Magnitud 2: directa
                </BotonModo>
                <BotonModo activo={!m2Directa} onClick={() => setM2Directa(false)}>
                  Magnitud 2: inversa
                </BotonModo>
              </div>
              <ControlDeslizante
                etiqueta="Magnitud 2 — valor inicial"
                valor={m2Inicial}
                min={1}
                max={20}
                onChange={setM2Inicial}
              />
              <ControlDeslizante
                etiqueta="Magnitud 2 — valor final"
                valor={m2Final}
                min={1}
                max={20}
                onChange={setM2Final}
              />
            </div>
          )}
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Cuarto término (simple)" valor={dSimple.toFixed(2)} />
          {compuesta && (
            <EstadisticaFila label="Resultado ajustado (compuesta)" valor={dCompuesta.toFixed(2)} />
          )}
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            {inversa
              ? "Magnitud 1 inversa: al aumentar a, el cuarto término disminuye."
              : "Magnitud 1 directa: al aumentar a, el cuarto término aumenta."}
            {compuesta &&
              (m2Directa
                ? " Magnitud 2 directa: multiplica por (valor final ÷ valor inicial)."
                : " Magnitud 2 inversa: multiplica por (valor inicial ÷ valor final).")}
          </p>
        </div>
      }
      instrucciones="Ajusta a, b, c y alterna entre simple y compuesta para ver cómo se combinan las magnitudes."
    />
  );
}
