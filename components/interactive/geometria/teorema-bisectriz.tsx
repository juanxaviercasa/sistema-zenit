"use client";

import { useState } from "react";
import type JXG from "jsxgraph";
import { JSXGraphBoard } from "@/components/interactive/jsxgraph-board";
import { FiguraInteractiva, EstadisticaFila } from "@/components/interactive/figura-interactiva";
import { createEl } from "@/components/interactive/jsxgraph-utils";

const NAVY = "var(--color-navy-900)";
const GOLD_STROKE = "var(--color-gold-600)";

export function TeoremaBisectriz() {
  const [estado, setEstado] = useState({ pm: 1.3, pn: 1.3 });

  return (
    <FiguraInteractiva
      titulo="Teorema de la bisectriz"
      board={
        <JSXGraphBoard
          boundingBox={[-4.5, 3.5, 4.5, -3]}
          onMount={(board) => {
            const A = board.create("point", [-2, -1.2], { name: "A", size: 4 });
            const B = board.create("point", [2.5, -1.8], { name: "B", size: 4 });
            const C = board.create("point", [1.3, 2.3], { name: "C", size: 4 });

            createEl(board, "segment", [A, B], { strokeColor: NAVY, strokeWidth: 2 });
            createEl(board, "segment", [A, C], { strokeColor: NAVY, strokeWidth: 2 });

            // D fija, por suma de vectores unitarios, la dirección de la
            // bisectriz interior del ángulo A — sin importar cómo se
            // arrastren B o C.
            const D = board.create(
              "point",
              [
                () => {
                  const ux1 = B.X() - A.X();
                  const uy1 = B.Y() - A.Y();
                  const l1 = Math.hypot(ux1, uy1) || 1;
                  const ux2 = C.X() - A.X();
                  const uy2 = C.Y() - A.Y();
                  const l2 = Math.hypot(ux2, uy2) || 1;
                  return A.X() + ux1 / l1 + ux2 / l2;
                },
                () => {
                  const ux1 = B.X() - A.X();
                  const uy1 = B.Y() - A.Y();
                  const l1 = Math.hypot(ux1, uy1) || 1;
                  const ux2 = C.X() - A.X();
                  const uy2 = C.Y() - A.Y();
                  const l2 = Math.hypot(ux2, uy2) || 1;
                  return A.Y() + uy1 / l1 + uy2 / l2;
                },
              ],
              { visible: false }
            );
            const bisectriz = createEl<JXG.Line>(board, "line", [A, D], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 2,
            });
            const P = createEl<JXG.Point>(board, "glider", [1, 0.4, bisectriz], {
              name: "P",
              size: 4,
            });

            const pie = (base: JXG.Point, ref: JXG.Point) => [
              () => {
                const ux = ref.X() - A.X();
                const uy = ref.Y() - A.Y();
                const l = Math.hypot(ux, uy) || 1;
                const uxn = ux / l;
                const uyn = uy / l;
                const t = (base.X() - A.X()) * uxn + (base.Y() - A.Y()) * uyn;
                return A.X() + uxn * t;
              },
              () => {
                const ux = ref.X() - A.X();
                const uy = ref.Y() - A.Y();
                const l = Math.hypot(ux, uy) || 1;
                const uxn = ux / l;
                const uyn = uy / l;
                const t = (base.X() - A.X()) * uxn + (base.Y() - A.Y()) * uyn;
                return A.Y() + uyn * t;
              },
            ];

            const M = board.create("point", pie(P, B), {
              name: "M",
              size: 2,
              fixed: true,
              fillColor: NAVY,
              strokeColor: NAVY,
            });
            const N = board.create("point", pie(P, C), {
              name: "N",
              size: 2,
              fixed: true,
              fillColor: NAVY,
              strokeColor: NAVY,
            });
            createEl(board, "segment", [P, M], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });
            createEl(board, "segment", [P, N], {
              strokeColor: GOLD_STROKE,
              strokeWidth: 1.5,
              dash: 2,
            });

            const actualizar = () => setEstado({ pm: P.Dist(M), pn: P.Dist(N) });
            A.on("drag", actualizar);
            B.on("drag", actualizar);
            C.on("drag", actualizar);
            P.on("drag", actualizar);
            actualizar();
          }}
        />
      }
      panel={
        <div>
          <EstadisticaFila label="Distancia PM (a AB)" valor={estado.pm.toFixed(2)} />
          <EstadisticaFila label="Distancia PN (a AC)" valor={estado.pn.toFixed(2)} />
          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-500">
            P se desliza sobre la bisectriz del ángulo A. Sin importar dónde lo
            arrastres (o cómo muevas B y C), PM y PN siempre resultan iguales.
          </p>
        </div>
      }
      instrucciones="Arrastra A, B, C o el propio punto P sobre la bisectriz."
    />
  );
}
