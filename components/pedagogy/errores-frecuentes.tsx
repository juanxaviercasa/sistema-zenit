import { AlertTriangle } from "lucide-react";

export function ErroresFrecuentes({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 flex gap-4 rounded-2xl border border-danger/25 bg-danger/[0.06] p-5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger/15 text-danger">
        <AlertTriangle className="size-4" strokeWidth={2.25} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-danger">
          Errores frecuentes
        </p>
        <div className="mt-2 text-sm text-foreground/85 [&>ul]:my-0 [&>ul]:list-none [&>ul]:ml-0 [&>ul]:space-y-2 [&>ul>li]:pl-5 [&>ul>li]:relative [&>ul>li]:before:content-['✕'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-danger [&>ul>li]:before:text-xs [&>ul>li]:before:top-1">
          {children}
        </div>
      </div>
    </div>
  );
}
