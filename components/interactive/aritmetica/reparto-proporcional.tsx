"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

export function RepartoProporcional() {
  const [compuesto, setCompuesto] = useState(false);
  const [total, setTotal] = useState(9000);
  const [capA, setCapA] = useState(2000);
  const [capB, setCapB] = useState(3000);
  const [capC, setCapC] = useState(4000);
  const [tA, setTA] = useState(12);
  const [tB, setTB] = useState(8);
  const [tC, setTC] = useState(6);

  const pesoA = compuesto ? capA * tA : capA;
  const pesoB = compuesto ? capB * tB : capB;
  const pesoC = compuesto ? capC * tC : capC;
  const sumaPesos = pesoA + pesoB + pesoC;

  const parteA = (pesoA / sumaPesos) * total;
  const parteB = (pesoB / sumaPesos) * total;
  const parteC = (pesoC / sumaPesos) * total;

  const maxBarra = Math.max(parteA, parteB, parteC) * 1.1;

  return (
    <FiguraInteractiva
      titulo="Reparto proporcional entre 3 socios"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="flex gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setCompuesto(false)}
              className={`rounded-full px-3 py-1.5 transition-colors ${!compuesto ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Simple (solo capital)
            </button>
            <button
              type="button"
              onClick={() => setCompuesto(true)}
              className={`rounded-full px-3 py-1.5 transition-colors ${compuesto ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Compuesto (capital × tiempo)
            </button>
          </div>

          {[
            { nombre: "Socio A", parte: parteA },
            { nombre: "Socio B", parte: parteB },
            { nombre: "Socio C", parte: parteC },
          ].map((s) => (
            <div key={s.nombre} className="space-y-1">
              <p className="text-xs text-slate-500">
                {s.nombre}: <span className="font-mono font-semibold">S/. {s.parte.toFixed(2)}</span>
              </p>
              <div className="h-6 rounded bg-blue-600" style={{ width: `${(s.parte / maxBarra) * 100}%` }} />
            </div>
          ))}

          <div className="space-y-4 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Utilidad total" valor={total} min={1000} max={20000} step={100} onChange={setTotal} />
            <ControlDeslizante etiqueta="Capital de A" valor={capA} min={500} max={10000} step={100} onChange={setCapA} />
            <ControlDeslizante etiqueta="Capital de B" valor={capB} min={500} max={10000} step={100} onChange={setCapB} />
            <ControlDeslizante etiqueta="Capital de C" valor={capC} min={500} max={10000} step={100} onChange={setCapC} />
            {compuesto && (
              <>
                <ControlDeslizante etiqueta="Meses invertidos — A" valor={tA} min={1} max={24} onChange={setTA} />
                <ControlDeslizante etiqueta="Meses invertidos — B" valor={tB} min={1} max={24} onChange={setTB} />
                <ControlDeslizante etiqueta="Meses invertidos — C" valor={tC} min={1} max={24} onChange={setTC} />
              </>
            )}
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Parte de A" valor={`S/. ${parteA.toFixed(2)}`} />
          <EstadisticaFila label="Parte de B" valor={`S/. ${parteB.toFixed(2)}`} />
          <EstadisticaFila label="Parte de C" valor={`S/. ${parteC.toFixed(2)}`} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            {compuesto
              ? "En el reparto compuesto, cada parte es proporcional al producto capital × tiempo — no solo al capital."
              : "En el reparto simple, cada parte es proporcional únicamente al capital aportado."}
          </p>
        </div>
      }
      instrucciones="Ajusta capitales, tiempos y la utilidad total. Alterna entre reparto simple y compuesto."
    />
  );
}
