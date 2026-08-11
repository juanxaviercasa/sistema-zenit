"use client";

import { useState } from "react";
import type JXG from "jsxgraph";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { createEl } from "@/components/interactive/jsxgraph-utils";

const NAVY = "var(--color-navy-900)";
const GOLD = "var(--color-gold-500)";
const GOLD_STROKE = "var(--color-gold-600)";

export function TeoremaMediatriz() {
  const [estado, setEstado] = useState({ pa: 2.1, pb: 2.1 });

  return (
    <FiguraInteractiva
      titulo="Teorema de la mediatriz"
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [-2.5, -1], { name: "A", size: 4 });
            const B = board.create("point", [2, -1], { name: "B", size: 4 });
            createEl(board, "segment", [A, B], { strokeColor: NAVY, strokeWidth: 2 });

            const M = createEl<JXG.Point>(board, "midpoint", [A, B], {
              name: "M",
              size: 2,
              fillColor: NAVY,
              strokeColor: NAVY,
            });

            // Dm fija, girando (B−A) 90°, la dirección perpendicular a AB.
            const Dm = board.create(
              "point",
              [() => M.X() - (B.Y() - A.Y()), () => M.Y() + (B.X() - A.X())],
              { visible: false }
            );
            const mediatriz = createEl<JXG.Line>(board, "line", [M, Dm], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 2,
            });
            const P = createEl<JXG.Point>(board, "glider", [0, 2, mediatriz], {
              name: "P",
              size: 4,
              fillColor: GOLD,
              strokeColor: GOLD_STROKE,
            });

            createEl(board, "segment", [P, A], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });
            createEl(board, "segment", [P, B], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });

            const actualizar = () => setEstado({ pa: P.Dist(A), pb: P.Dist(B) });
            A.on("drag", actualizar);
            B.on("drag", actualizar);
            P.on("drag", actualizar);
            actualizar();
          }}
        />
      }
      panel={
        <div>
          <EstadisticaFila label="Distancia PA" valor={estado.pa.toFixed(2)} />
          <EstadisticaFila label="Distancia PB" valor={estado.pb.toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            P se desliza sobre la mediatriz de AB. Sin importar dónde lo arrastres (o
            cómo muevas A y B), PA y PB siempre resultan iguales.
          </p>
        </div>
      }
      instrucciones="Arrastra A, B o el propio punto P sobre la mediatriz."
    />
  );
}
