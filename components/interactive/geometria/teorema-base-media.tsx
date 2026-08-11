"use client";

import { useState } from "react";
import type JXG from "jsxgraph";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { createEl } from "@/components/interactive/jsxgraph-utils";

const NAVY = "var(--color-navy-900)";
const GOLD = "var(--color-gold-500)";

export function TeoremaBaseMedia() {
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
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            M y N son los puntos medios de AB y AC. MN siempre resulta paralelo a BC y
            mide la mitad de BC — sin importar cómo arrastres los vértices.
          </p>
        </div>
      }
      instrucciones="Arrastra A, B o C."
    />
  );
}
