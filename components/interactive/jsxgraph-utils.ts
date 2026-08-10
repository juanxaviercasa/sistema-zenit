import type JXG from "jsxgraph";

interface LooseBoard {
  create(type: string, parents: unknown[], attributes?: Record<string, unknown>): unknown;
}

/**
 * jsxgraph's bundled community .d.ts only types a subset of element types —
 * board.create() has no overload for "polygon", "segment", "midpoint" or
 * "glider" (and Polygon's declared type omits the runtime `.borders` array).
 * This casts through those gaps once instead of fighting incomplete types
 * at every call site.
 *
 * Important: the cast stays on `board`, and `.create(...)` is still called
 * as a method on it (`board.create(...)`, not a detached reference) —
 * JSXGraph's own create() dispatcher reads `this` internally, so extracting
 * it into a plain function first silently passes `board: undefined` to the
 * element factory for every type beyond "point"/"line".
 */
export function createEl<T = JXG.GeometryElement>(
  board: JXG.Board,
  type: string,
  parents: unknown[],
  attributes?: Record<string, unknown>
): T {
  return (board as unknown as LooseBoard).create(type, parents, attributes) as T;
}

export interface PolygonLike {
  vertices: JXG.Point[];
  borders: JXG.Line[];
  setAttribute(attributes: Record<string, unknown>): unknown;
}

export function angleDeg(vertex: JXG.Point, a: JXG.Point, b: JXG.Point): number {
  const v1x = a.X() - vertex.X();
  const v1y = a.Y() - vertex.Y();
  const v2x = b.X() - vertex.X();
  const v2y = b.Y() - vertex.Y();
  const mag1 = Math.hypot(v1x, v1y);
  const mag2 = Math.hypot(v2x, v2y);
  const cos = (v1x * v2x + v1y * v2y) / (mag1 * mag2);
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
}
