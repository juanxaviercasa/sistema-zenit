export function ErroresFrecuentes({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-xl border border-danger/30 bg-danger/[0.05] px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-danger">
        Errores frecuentes
      </p>
      <div className="mt-2 text-sm text-foreground/85 [&>ul]:my-0 [&>ul]:list-none [&>ul]:ml-0 [&>ul>li]:pl-5 [&>ul>li]:relative [&>ul>li]:before:content-['✕'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-danger [&>ul>li]:before:text-xs [&>ul>li]:before:top-1">
        {children}
      </div>
    </div>
  );
}
