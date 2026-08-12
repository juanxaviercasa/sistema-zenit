"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function factor(r: number): string {
  return r >= 0 ? `(x−${r})` : `(x+${-r})`;
}

export function SignoDePolinomio() {
  const [r1, setR1] = useState(-3);
  const [r2, setR2] = useState(0);
  const [r3, setR3] = useState(4);
  const [aPositivo, setAPositivo] = useState(1);
  const [buscarPositivo, setBuscarPositivo] = useState(1);

  const raices = [r1, r2, r3].sort((x, y) => x - y);
  const signoDerecha = aPositivo === 1 ? 1 : -1;
  const signos = [signoDerecha, -signoDerecha, signoDerecha, -signoDerecha].reverse();
  // signos[0] = intervalo más a la izquierda, ..., signos[3] = más a la derecha

  const intervalos = [
    { desde: "−∞", hasta: raices[0], signo: signos[0] },
    { desde: raices[0], hasta: raices[1], signo: signos[1] },
    { desde: raices[1], hasta: raices[2], signo: signos[2] },
    { desde: raices[2], hasta: "+∞", signo: signos[3] },
  ];

  const busca = buscarPositivo === 1 ? 1 : -1;
  const solucion = intervalos
    .filter((iv) => iv.signo === busca)
    .map((iv) => `(${iv.desde}, ${iv.hasta})`)
    .join(" ∪ ");

  return (
    <FiguraInteractiva
      titulo="Signo de un polinomio factorizado (puntos críticos)"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <p className="text-center font-mono text-lg text-slate-900">
            P(x) = {aPositivo === 1 ? "+" : "−"}
            {factor(raices[0])}
            {factor(raices[1])}
            {factor(raices[2])}
          </p>

          <div className="flex flex-col gap-1.5">
            {intervalos.map((iv, i) => (
              <div key={i} className="flex items-center gap-2 font-mono text-xs">
                <span className="w-28 text-slate-500">
                  ({iv.desde}, {iv.hasta})
                </span>
                <span className={iv.signo > 0 ? "text-emerald-600" : "text-red-500"}>
                  {iv.signo > 0 ? "+" : "−"}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-center font-mono text-sm text-slate-700">
            P(x) {busca > 0 ? ">" : "<"} 0: x ∈ {solucion || "∅"}
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="Raíz 1" valor={r1} min={-10} max={10} onChange={setR1} />
            <ControlDeslizante etiqueta="Raíz 2" valor={r2} min={-10} max={10} onChange={setR2} />
            <ControlDeslizante etiqueta="Raíz 3" valor={r3} min={-10} max={10} onChange={setR3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ControlDeslizante
              etiqueta="Coef. líder"
              valor={aPositivo}
              min={0}
              max={1}
              onChange={setAPositivo}
              formato={() => (aPositivo === 1 ? "Positivo" : "Negativo")}
            />
            <ControlDeslizante
              etiqueta="Buscar"
              valor={buscarPositivo}
              min={0}
              max={1}
              onChange={setBuscarPositivo}
              formato={() => (buscarPositivo === 1 ? "P(x) > 0" : "P(x) < 0")}
            />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="Raíces (ordenadas)" valor={raices.join(", ")} />
          <EstadisticaFila label="Signo en el intervalo derecho" valor={signoDerecha > 0 ? "+" : "−"} />
          <EstadisticaFila label="Solución" valor={solucion || "∅"} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            El signo en el intervalo más a la derecha coincide con el del coeficiente líder, y
            se alterna cada vez que se cruza una raíz simple.
          </p>
        </div>
      }
      instrucciones="Ajusta las raíces y el signo del coeficiente líder para ver el cuadro de signos completo."
    />
  );
}
