import { Calculator, Sigma, Triangle, Waves, type LucideIcon } from "lucide-react";

export interface AreaStyle {
  icon: LucideIcon;
  color: string;
  tint: string;
}

const AREA_STYLES: Record<string, AreaStyle> = {
  aritmetica: { icon: Calculator, color: "var(--color-aritmetica)", tint: "var(--color-aritmetica-tint)" },
  algebra: { icon: Sigma, color: "var(--color-algebra)", tint: "var(--color-algebra-tint)" },
  geometria: { icon: Triangle, color: "var(--color-geometria)", tint: "var(--color-geometria-tint)" },
  trigonometria: { icon: Waves, color: "var(--color-trigonometria)", tint: "var(--color-trigonometria-tint)" },
};

const FALLBACK: AreaStyle = {
  icon: Calculator,
  color: "var(--color-navy-900)",
  tint: "var(--color-surface-muted)",
};

export function getAreaStyle(areaSlug: string): AreaStyle {
  return AREA_STYLES[areaSlug] ?? FALLBACK;
}
