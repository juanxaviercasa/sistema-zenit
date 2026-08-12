"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function desglose(N: number) {
  const grupos: { digitos: number; desde: number; hasta: number; cantidad: number }[] = [];
  let potencia = 1;
  let digitos = 1;
  while (potencia <= N) {
    const desde = potencia;
    const hasta = Math.min(potencia * 10 - 1, N);
    grupos.push({ digitos, desde, hasta, cantidad: hasta - desde + 1 });
    potencia *= 10;
    digitos += 1;
  }
  const totalCifras = grupos.reduce((s, g) => s + g.cantidad * g.digitos, 0);
  return { grupos, totalCifras };
}

export function ContadorDeCifras() {
  const [n, setN] = useState(500);
  const { grupos, totalCifras } = desglose(n);
  const maxCantidad = Math.max(...grupos.map((g) => g.cantidad), 1);

  return (
    <FiguraInteractiva
      titulo="Cifras usadas al escribir los números de 1 a N"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="space-y-3">
            {grupos.map((g) => (
              <div key={g.digitos} className="space-y-1">
                <p className="text-xs text-slate-500">
                  {g.digitos} cifra{g.digitos > 1 ? "s" : ""} ({g.desde}–{g.hasta}):{" "}
                  <span className="font-mono font-semibold">{g.cantidad} números</span>
                </p>
                <div
                  className="h-4 rounded bg-blue-600"
                  style={{ width: `${(g.cantidad / maxCantidad) * 100}%` }}
                />
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="N (límite superior)" valor={n} min={1} max={5000} onChange={setN} />
          </div>
        </div>
      }
      panel={
        <div>
          {grupos.map((g) => (
            <EstadisticaFila
              key={g.digitos}
              label={`Cifras usadas por los de ${g.digitos} dígito${g.digitos > 1 ? "s" : ""}`}
              valor={g.cantidad * g.digitos}
            />
          ))}
          <EstadisticaFila label="Total de cifras escritas" valor={totalCifras} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Se agrupan los números por cantidad de dígitos, se cuenta cuántos hay en
            cada grupo, y se multiplica por el número de cifras que aporta cada uno.
          </p>
        </div>
      }
      instrucciones="Ajusta N y observa cómo se reparten los números por cantidad de dígitos."
    />
  );
}
