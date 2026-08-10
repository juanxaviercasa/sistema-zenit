"use client";

import { useEffect, useId, useRef } from "react";
import JXG from "jsxgraph";
import { cn } from "@/lib/utils";

interface JSXGraphBoardProps {
  boundingBox?: [number, number, number, number];
  axis?: boolean;
  className?: string;
  /** Recibe el board recién creado para dibujar puntos, funciones, etc. */
  onMount: (board: JXG.Board) => void;
}

/**
 * Envoltorio genérico de un tablero JSXGraph. Cada visualización interactiva
 * de un subtema se construye pasando su propio `onMount`.
 */
export function JSXGraphBoard({
  boundingBox = [-5, 5, 5, -5],
  axis = true,
  className,
  onMount,
}: JSXGraphBoardProps) {
  const containerId = useId().replace(/:/g, "");
  const boardRef = useRef<JXG.Board | null>(null);

  useEffect(() => {
    const board = JXG.JSXGraph.initBoard(containerId, {
      boundingbox: boundingBox,
      axis,
      showCopyright: false,
      showNavigation: true,
      keepAspectRatio: true,
    });
    boardRef.current = board;
    onMount(board);

    return () => {
      JXG.JSXGraph.freeBoard(board);
      boardRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId]);

  return (
    <>
      {/* jsxgraph's package.json "exports" map only allows importing ".", so its
          CSS can't be pulled in with a normal deep import — it's vendored into
          public/vendor/jsxgraph.css instead (Next hoists this <link> to <head>). */}
      {/* eslint-disable-next-line @next/next/no-css-tags -- vendored CSS, see comment above */}
      <link rel="stylesheet" href="/vendor/jsxgraph.css" />
      {/* Fondo blanco fijo, como el lienzo de un applet de GeoGebra — el
          tablero no sigue el modo claro/oscuro del sitio (ver figura-interactiva.tsx). */}
      <div
        id={containerId}
        className={cn("rounded-lg bg-white", className)}
        style={{ width: "100%", aspectRatio: "1 / 1" }}
      />
    </>
  );
}
