"use client";

import { useState } from "react";
import type JXG from "jsxgraph";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { createEl } from "@/components/interactive/jsxgraph-utils";

const NAVY = "var(--color-navy-900)";
const GOLD = "var(--color-gold-500)";

function BaseMediaDemo() {
  const [estado, setEstado] = useState({ mn: 2.0, bc: 4.0 });

  return (
    <FiguraInteractiva
      titulo="Teorema de la base media"
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [0, 2], { name: "A", size: 4 });
            const B = board.create("point", [-3, -1.5], { name: "B", size: 4 });
            const C = board.create("point", [3, -1.5], { name: "C", size: 4 });

            const M = createEl<JXG.Point>(board, "midpoint", [A, B], {
              name: "M",
              size: 3,
              fillColor: GOLD,
              strokeColor: "var(--color-gold-600)",
            });
            const N = createEl<JXG.Point>(board, "midpoint", [A, C], {
              name: "N",
              size: 3,
              fillColor: GOLD,
              strokeColor: "var(--color-gold-600)",
            });

            createEl(board, "polygon", [A, B, C], {
              fillColor: NAVY,
              fillOpacity: 0.06,
              borders: { strokeColor: NAVY, strokeWidth: 2 },
            });
            createEl(board, "segment", [B, C], {
              strokeColor: NAVY,
              strokeWidth: 2,
            });
            createEl(board, "segment", [M, N], {
              strokeColor: GOLD,
              strokeWidth: 3,
            });

            const actualizar = () => setEstado({ mn: M.Dist(N), bc: B.Dist(C) });
            A.on("drag", actualizar);
            B.on("drag", actualizar);
            C.on("drag", actualizar);
            actualizar();
          }}
        />
      }
      panel={
        <div>
          <EstadisticaFila label="MN (base media)" valor={estado.mn.toFixed(2)} />
          <EstadisticaFila label="BC (tercer lado)" valor={estado.bc.toFixed(2)} />
          <EstadisticaFila label="BC ÷ 2" valor={(estado.bc / 2).toFixed(2)} />
          <p className="mt-4 border-t border-border pt-3 text-sm text-foreground/70">
            M y N son los puntos medios de AB y AC. MN siempre resulta paralelo a BC y
            mide la mitad de BC — sin importar cómo arrastres los vértices.
          </p>
        </div>
      }
      instrucciones="Arrastra A, B o C."
    />
  );
}

function MedianaHipotenusaDemo() {
  const [estado, setEstado] = useState({ hipotenusa: 4.5, mediana: 2.25 });

  return (
    <FiguraInteractiva
      titulo="Mediana relativa a la hipotenusa"
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -3]}
          onMount={(board) => {
            const R = board.create("point", [-2, -1.5], { name: "R", size: 4 });
            const P = board.create("point", [1.8, -1.5], { name: "P", size: 4 });

            // H solo sirve para fijar, por perpendicularidad, la dirección del
            // segundo cateto — Q desliza sobre esa recta, así el ángulo en R
            // siempre es recto sin importar cómo se arrastren R o P.
            const H = board.create(
              "point",
              [() => R.X() - (P.Y() - R.Y()), () => R.Y() + (P.X() - R.X())],
              { visible: false }
            );
            const eje = createEl<JXG.Line>(board, "line", [R, H], { visible: false });
            const Q = createEl<JXG.Point>(board, "glider", [-2, 1.5, eje], {
              name: "Q",
              size: 4,
            });

            const M = createEl<JXG.Point>(board, "midpoint", [P, Q], {
              name: "M",
              size: 3,
              fillColor: GOLD,
              strokeColor: "var(--color-gold-600)",
            });

            createEl(board, "segment", [R, P], { strokeColor: NAVY, strokeWidth: 2 });
            createEl(board, "segment", [R, Q], { strokeColor: NAVY, strokeWidth: 2 });
            createEl(board, "segment", [P, Q], { strokeColor: NAVY, strokeWidth: 2 });
            createEl(board, "segment", [R, M], {
              strokeColor: GOLD,
              strokeWidth: 3,
              dash: 2,
            });

            const actualizar = () =>
              setEstado({ hipotenusa: P.Dist(Q), mediana: R.Dist(M) });
            R.on("drag", actualizar);
            P.on("drag", actualizar);
            Q.on("drag", actualizar);
            actualizar();
          }}
        />
      }
      panel={
        <div>
          <EstadisticaFila label="Hipotenusa PQ" valor={estado.hipotenusa.toFixed(2)} />
          <EstadisticaFila label="Mediana RM" valor={estado.mediana.toFixed(2)} />
          <EstadisticaFila label="PQ ÷ 2" valor={(estado.hipotenusa / 2).toFixed(2)} />
          <p className="mt-4 border-t border-border pt-3 text-sm text-foreground/70">
            El ángulo en R se mantiene recto por construcción. M es el punto medio de la
            hipotenusa PQ; la mediana RM siempre mide la mitad de PQ.
          </p>
        </div>
      }
      instrucciones="Arrastra R, P o Q (Q desliza manteniendo el ángulo recto en R)."
    />
  );
}

export function AplicacionesCongruencia() {
  return (
    <div>
      <BaseMediaDemo />
      <MedianaHipotenusaDemo />
    </div>
  );
}
