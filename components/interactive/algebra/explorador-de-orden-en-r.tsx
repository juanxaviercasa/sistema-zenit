"use client";

import { useState } from "react";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { ControlDeslizante } from "./controles";

function comparar(x: number, y: number): string {
  if (x < y) return "<";
  if (x > y) return ">";
  return "=";
}

export function ExploradorDeOrdenEnR() {
  const [a, setA] = useState(-2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(-1);

  const relAB = comparar(a, b);
  const relBC = comparar(b, c);
  const relAC = comparar(a, c);

  const transitividadAplica = relAB === "<" && relBC === "<";
  const transitividadCumple = !transitividadAplica || relAC === "<";

  const sumaAB = a + c;
  const sumaBB = b + c;
  const relSuma = comparar(sumaAB, sumaBB);
  const compatibleSuma = relAB === relSuma;

  const prodAB = a * c;
  const prodBB = b * c;
  const relProd = comparar(prodAB, prodBB);
  const relProdEsperada = c > 0 ? relAB : c < 0 ? (relAB === "<" ? ">" : relAB === ">" ? "<" : "=") : "=";
  const compatibleProducto = c === 0 || relProd === relProdEsperada;

  return (
    <FiguraInteractiva
      titulo="Propiedades de orden en los números reales"
      board={
        <div className="flex flex-col gap-5 px-2 py-6">
          <div className="grid grid-cols-1 gap-2 rounded-xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
            <p>
              Tricotomía: a {relAB} b (exactamente una de a&lt;b, a=b, a&gt;b es verdadera)
            </p>
            <p className={transitividadCumple ? "text-emerald-600" : "text-red-500"}>
              Transitividad: {transitividadAplica ? `a<b y b<c ⟹ a<c: ${relAC === "<" ? "✓" : "✗"}` : "(no aplica: a<b y b<c no se cumplen ambas)"}
            </p>
            <p className={compatibleSuma ? "text-emerald-600" : "text-red-500"}>
              Suma: a{relAB}b ⟹ a+c {relSuma} b+c: {compatibleSuma ? "✓ se conserva" : "✗"}
            </p>
            <p className={compatibleProducto ? "text-emerald-600" : "text-red-500"}>
              Producto por c: a{relAB}b ⟹ a·c {relProd} b·c ({c > 0 ? "se conserva (c>0)" : c < 0 ? "se invierte (c<0)" : "ambos son 0 (c=0)"})
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
            <ControlDeslizante etiqueta="a" valor={a} min={-10} max={10} onChange={setA} />
            <ControlDeslizante etiqueta="b" valor={b} min={-10} max={10} onChange={setB} />
            <ControlDeslizante etiqueta="c" valor={c} min={-10} max={10} onChange={setC} />
          </div>
        </div>
      }
      panel={
        <div>
          <EstadisticaFila label="a, b, c" valor={`${a}, ${b}, ${c}`} />
          <EstadisticaFila label="a + c vs b + c" valor={`${sumaAB} ${relSuma} ${sumaBB}`} />
          <EstadisticaFila label="a·c vs b·c" valor={`${prodAB} ${relProd} ${prodBB}`} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            Multiplicar una desigualdad por un número negativo invierte el sentido de la
            desigualdad — es la propiedad que más errores causa al resolver inecuaciones.
          </p>
        </div>
      }
      instrucciones="Ajusta a, b y c para verificar las propiedades de orden, especialmente qué pasa al multiplicar por c negativo."
    />
  );
}
