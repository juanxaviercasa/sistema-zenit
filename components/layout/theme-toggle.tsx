"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const subscribeNoop = () => () => {};

/** true solo tras la primera pintura en el navegador — evita leer el tema
 *  resuelto (que depende de localStorage) durante el render de servidor. */
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

/**
 * Alterna entre claro y oscuro (no "system") — un click, sin menú. El tema
 * inicial real lo decide next-themes (system) hasta que el usuario lo toca.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-surface-muted hover:text-foreground"
      )}
    >
      {mounted && (
        <>
          <Sun className={cn("size-4 transition-all", isDark && "scale-0 opacity-0")} />
          <Moon
            className={cn(
              "absolute size-4 transition-all",
              !isDark && "scale-0 opacity-0"
            )}
          />
        </>
      )}
    </button>
  );
}
