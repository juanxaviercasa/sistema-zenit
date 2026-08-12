"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function factorTexto(raiz: number, exp: number): string {
  if (exp === 0) return "";
  const base = raiz === 0 ? "x" : raiz > 0 ? `(x−${raiz})` : `(x+${-raiz})`;
  return exp === 1 ? base : `${base}^${exp}`;
}

function productoTexto(exps: number[], raices: number[]): string {
  const partes = raices.map((r, i) => factorTexto(r, exps[i])).filter((s) => s !== "");
  return partes.length === 0 ? "1" : partes.join("");
}

export function MCDMCMDePolinomios() {
  const raices = [-2, 1];
  const [expA, setExpA] = useState([1, 2]);
  const [expB, setExpB] = useState([3, 1]);

  const expMCD = expA.map((e, i) => Math.min(e, expB[i]));
  const expMCM = expA.map((e, i) => Math.max(e, expB[i]));

  return (
    <FiguraInteractiva
      titulo="MCD y MCM de polinomios factorizados"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            A(x) = {productoTexto(expA, raices)}
          </p>
          <p className="text-center font-mono text-lg text-slate-900">
            B(x) = {productoTexto(expB, raices)}
          </p>

          <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
            <p>MCD(A,B) = {productoTexto(expMCD, raices)}</p>
            <p>MCM(A,B) = {productoTexto(expMCM, raices)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante
              etiqueta="Exp. (x+2) en A"
              valor={expA[0]}
              min={0}
              max={3}
              onChange={(v) => setExpA([v, expA[1]])}
            />
            <ControlDeslizante
              etiqueta="Exp. (x−1) en A"
              valor={expA[1]}
              min={0}
              max={3}
              onChange={(v) => setExpA([expA[0], v])}
            />
            <ControlDeslizante
              etiqueta="Exp. (x+2) en B"
              valor={expB[0]}
              min={0}
              max={3}
              onChange={(v) => setExpB([v, expB[1]])}
            />
            <ControlDeslizante
              etiqueta="Exp. (x−1) en B"
              valor={expB[1]}
              min={0}
              max={3}
              onChange={(v) => setExpB([expB[0], v])}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="A(x)" valor={productoTexto(expA, raices)} />
          <EstadisticaFila label="B(x)" valor={productoTexto(expB, raices)} />
          <EstadisticaFila label="MCD(A,B)" valor={productoTexto(expMCD, raices)} />
          <EstadisticaFila label="MCM(A,B)" valor={productoTexto(expMCM, raices)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Igual que con enteros: el MCD toma el menor exponente de cada factor común; el MCM
            toma el mayor exponente de cada factor presente en cualquiera de los dos.
          </p>
        </div>
      }
      instrucciones="Ajusta los exponentes de cada factor en A y B para ver cómo se calculan su MCD y MCM."
    />
  );
}
