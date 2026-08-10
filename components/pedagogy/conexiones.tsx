import Link from "next/link";
import { CornerDownRight, CornerUpRight, ChevronRight } from "lucide-react";

interface Conexion {
  href: string;
  label: string;
}

export function Conexiones({
  requiere,
  seUsaEn,
}: {
  requiere?: Conexion[];
  seUsaEn?: Conexion[];
}) {
  return (
    <div className="my-8 grid gap-6 rounded-2xl border border-border bg-surface-muted p-5 sm:grid-cols-2">
      <div>
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
          <CornerUpRight className="size-3.5" />
          Requiere
        </p>
        <ConexionLista items={requiere} />
      </div>
      <div>
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
          <CornerDownRight className="size-3.5" />
          Se usa en
        </p>
        <ConexionLista items={seUsaEn} />
      </div>
    </div>
  );
}

function ConexionLista({ items }: { items?: Conexion[] }) {
  if (!items || items.length === 0) {
    return <p className="mt-2 text-sm text-foreground/40">—</p>;
  }
  return (
    <ul className="mt-2.5 space-y-1.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex items-center gap-1 text-sm font-medium text-info transition-colors hover:text-navy-900"
          >
            <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
