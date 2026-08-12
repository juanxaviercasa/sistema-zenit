"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

const POLINOMIOS = [
  { nombre: "x³ − 6x² + 11x − 6", coefs: [1, -6, 11, -6] },
  { nombre: "2x³ − 3x² − 11x + 6", coefs: [2, -3, -11, 6] },
];

function divisoresEnteros(n: number): number[] {
  const abs = Math.abs(n);
  const divs: number[] = [];
  for (let d = 1; d <= abs; d++) {
    if (abs % d === 0) divs.push(d);
  }
  return divs;
}

function evaluarHorner(coefs: number[], r: number): number {
  return coefs.reduce((acc, c) => acc * r + c, 0);
}

function candidatosRacionales(coefs: number[]): string[] {
  const constante = coefs[coefs.length - 1];
  const lider = coefs[0];
  const ps = divisoresEnteros(constante);
  const qs = divisoresEnteros(lider);
  const set = new Set<string>();
  for (const p of ps) {
    for (const q of qs) {
      const val = p / q;
      set.add(`±${val === Math.round(val) ? val : `${p}/${q}`}`);
    }
  }
  return Array.from(set);
}

export function TeoremaDelRestoYFactor() {
  const [indice, setIndice] = useState(1);
  const [r, setR] = useState(3);
  const poli = POLINOMIOS[indice];

  const resto = evaluarHorner(poli.coefs, r);
  const esRaiz = resto === 0;
  const candidatos = candidatosRacionales(poli.coefs);

  return (
    <FiguraInteractiva
      titulo="Teorema del resto y del factor"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">P(x) = {poli.nombre}</p>

          <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
            <p>
              P({r}) = {resto}
            </p>
            <p className={esRaiz ? "text-emerald-600" : "text-slate-500"}>
              {esRaiz
                ? `✓ (x−${r}) SÍ es factor de P(x) (r es raíz)`
                : `✗ (x−${r}) NO es factor de P(x)`}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5">
            {candidatos.map((c) => (
              <span key={c} className="rounded-lg bg-slate-50 px-2 py-1 font-mono text-xs text-slate-600">
                {c}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Polinomio"
              valor={indice}
              min={0}
              max={POLINOMIOS.length - 1}
              onChange={setIndice}
              formato={() => `${indice + 1}/${POLINOMIOS.length}`}
            />
            <ControlDeslizante etiqueta="r" valor={r} min={-5} max={5} onChange={setR} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="P(x)" valor={poli.nombre} />
          <EstadisticaFila label={`P(${r})`} valor={resto} />
          <EstadisticaFila label={`(x−${r}) es factor`} valor={esRaiz ? "Sí" : "No"} />
          <EstadisticaFila label="Candidatos racionales (±p/q)" valor={candidatos.length} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Teorema del resto: P(r) es el residuo de dividir P(x) entre (x−r). Teorema del
            factor: (x−r) divide a P(x) exactamente cuando P(r)=0.
          </p>
        </div>
      }
      instrucciones="Elige un polinomio y un valor r para evaluar P(r) y ver si (x−r) es factor, y explora los candidatos racionales."
    />
  );
}
